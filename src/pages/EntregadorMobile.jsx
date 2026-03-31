/**
 * ============================================================================
 * SISTEMA NATIVO DE ENTREGADORES - RODRIGUES AÇAÍ (VERSÃO ENTERPRISE)
 * ============================================================================
 * Arquivo: EntregadorMobile.jsx
 * Descrição: Controlador principal do aplicativo mobile dos entregadores.
 * Inclui geolocalização nativa, controle de bateria, câmera, haptics,
 * persistência de áudio, inteligência de despacho de pedidos e onboarding.
 * ============================================================================
 */

import React, { 
    useEffect, 
    useState, 
    useRef, 
    useCallback, 
    createContext, 
    useContext 
} from 'react';

// --- FIREBASE ---
import { db, auth } from '../services/firebase'; 
import { 
    collection, 
    query, 
    orderBy, 
    onSnapshot, 
    doc, 
    updateDoc, 
    serverTimestamp, 
    setDoc, 
    getDoc, 
    where, 
    increment, 
    limit 
} from "firebase/firestore";

// --- ROTAS E UI ---
import { useNavigate } from 'react-router-dom';
import * as Lucide from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- PLUGINS NATIVOS CAPACITOR ---
import { Geolocation } from '@capacitor/geolocation';
import { Haptics, ImpactStyle, NotificationType } from '@capacitor/haptics';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Network } from '@capacitor/network';
import { Device } from '@capacitor/device';

/**
 * ============================================================================
 * 1. CONFIGURAÇÕES GLOBAIS E CONSTANTES DO SISTEMA
 * ============================================================================
 */

/** @const {string} CLOUDINARY_CLOUD_NAME - Nome da nuvem de armazenamento de imagens */
const CLOUDINARY_CLOUD_NAME = 'dbd9x1o02'; 

/** @const {string} CLOUDINARY_UPLOAD_PRESET - Preset de upload sem autenticação estrita */
const CLOUDINARY_UPLOAD_PRESET = 'fc3i8urq'; 

/** @const {string} LOGO_APP - URL oficial da logo da Rodrigues Açaí */
const LOGO_APP = 'https://res.cloudinary.com/dbd9x1o02/image/upload/v1774934438/rodrigues_geral/vvrauvi5vxs3ukdqd1qn.png';

/** @const {string} WHATSAPP_SUPORTE - Número de telefone da central de suporte */
const WHATSAPP_SUPORTE = '5567999999999';

/** * @const {Object} LOJA_COORDS - Coordenadas centrais da loja base para cálculo de raio 
 * @property {number} lat - Latitude da loja
 * @property {number} lng - Longitude da loja
 */
const LOJA_COORDS = { 
    lat: -20.4697, 
    lng: -54.6201 
}; 

/**
 * ============================================================================
 * 2. FUNÇÕES UTILITÁRIAS E INTELIGÊNCIA LOGÍSTICA
 * ============================================================================
 */

/**
 * Calcula o setor magnético (Norte, Sul, Leste, Oeste, etc) baseado nas 
 * coordenadas do pedido em relação à loja central. Usado para o filtro de volta pra casa.
 * * @param {number} lat - Latitude do destino
 * @param {number} lng - Longitude do destino
 * @returns {string} - Nome do setor em caixa alta (ex: 'NORDESTE')
 */
const calcularSetorPizza = (lat, lng) => {
    if (!lat || !lng) {
        return 'CENTRO';
    }
    
    const dy = lat - LOJA_COORDS.lat;
    const dx = lng - LOJA_COORDS.lng;
    
    // Converte radianos para graus
    let theta = Math.atan2(dy, dx) * (180 / Math.PI); 
    
    if (theta < 0) {
        theta += 360;
    }

    const setores = [
        { nome: 'LESTE', min: 337.5, max: 22.5 },   
        { nome: 'NORDESTE', min: 22.5, max: 67.5 },
        { nome: 'NORTE', min: 67.5, max: 112.5 },   
        { nome: 'NOROESTE', min: 112.5, max: 157.5 },
        { nome: 'OESTE', min: 157.5, max: 202.5 },  
        { nome: 'SUDOESTE', min: 202.5, max: 247.5 },
        { nome: 'SUL', min: 247.5, max: 292.5 },    
        { nome: 'SUDESTE', min: 292.5, max: 337.5 }
    ];
    
    const setor = setores.find(s => 
        (theta >= s.min && theta < s.max) || 
        (s.nome === 'LESTE' && (theta >= 337.5 || theta < 22.5))
    );
    
    return setor ? setor.nome : 'CENTRO';
};

/**
 * Faz o upload de um arquivo ou string base64 para os servidores do Cloudinary.
 * * @param {File|string} fileBase64OrFile - Arquivo ou Base64 capturado da câmera
 * @param {string} pastaDestino - Caminho no bucket do Cloudinary
 * @returns {Promise<string>} - URL segura da imagem hospedada
 */
const uploadToCloudinary = async (fileBase64OrFile, pastaDestino) => {
    const formData = new FormData();
    
    if (typeof fileBase64OrFile === 'string' && fileBase64OrFile.startsWith('data:image')) {
        const res = await fetch(fileBase64OrFile);
        const blob = await res.blob();
        formData.append('file', new File([blob], "imagem_nativa.jpg", { type: "image/jpeg" }));
    } else {
        formData.append('file', fileBase64OrFile);
    }
    
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    formData.append('folder', `rodrigues_acai/${pastaDestino}`);
    
    try {
        const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, { 
            method: 'POST', 
            body: formData 
        });
        
        const data = await res.json();
        
        if (!data.secure_url) {
            throw new Error("Falha na validação da URL segura retornada pelo servidor de imagens.");
        }
        
        return data.secure_url;
    } catch (error) {
        console.error("Erro critico no upload de midia: ", error);
        throw error;
    }
};

/**
 * Formata um número de ponto flutuante para a moeda local Brasileira (BRL).
 * * @param {number} valor - Valor nominal da transação
 * @returns {string} - String formatada (ex: R$ 10,00)
 */
const formatarMoeda = (valor) => {
    return new Intl.NumberFormat('pt-BR', { 
        style: 'currency', 
        currency: 'BRL' 
    }).format(valor || 0);
};

/**
 * Aplica máscara de formatação em tempo real para inputs de CPF.
 * * @param {string} v - String bruta recebida do input
 * @returns {string} - CPF formatado (ex: 123.456.789-00)
 */
const formatarCPF = (v) => {
    v = v.replace(/\D/g, ''); // Remove tudo que não for número
    v = v.replace(/(\d{3})(\d)/, "$1.$2"); // Coloca o primeiro ponto
    v = v.replace(/(\d{3})(\d)/, "$1.$2"); // Coloca o segundo ponto
    v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2"); // Coloca o traço
    return v;
};

/**
 * Remove toda a pontuação de um CPF para salvar no banco de dados.
 * * @param {string} v - CPF formatado
 * @returns {string} - Apenas números do CPF
 */
const desformatarCPF = (v) => {
    return v.replace(/\D/g, '');
};

/**
 * ============================================================================
 * 3. CONTEXTOS E HOOKS CUSTOMIZADOS (NATIVOS)
 * ============================================================================
 */

// Criação do contexto de notificações Toast globais
const ToastContext = createContext(null);

/**
 * Hook customizado para disparar notificações visuais e hápticas (vibração).
 * @returns {Function} - Função addToast(mensagem, tipo)
 */
export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error("useToast deve ser usado dentro de um ToastProvider");
    }
    return context;
};

/**
 * Provedor de estado global para notificações Toast flutuantes.
 */
const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const addToast = useCallback((msg, type = 'info') => {
        // Aciona o motor vibratório nativo do celular baseado na gravidade do aviso
        try {
            if (type === 'error') {
                Haptics.impact({ style: ImpactStyle.Heavy });
            } else if (type === 'success') {
                Haptics.notification({ type: NotificationType.Success });
            } else {
                Haptics.impact({ style: ImpactStyle.Light });
            }
        } catch (e) {
            console.warn("Haptics não suportado no ambiente atual", e);
        }

        const id = Math.random().toString(36).substring(2, 9);
        
        setToasts(prev => [...prev, { id, msg, type }]);
        
        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id));
        }, 4000);
    }, []);

    return (
        <ToastContext.Provider value={addToast}>
            {children}
            <div 
                className="
                    fixed 
                    top-4 
                    left-1/2 
                    -translate-x-1/2 
                    z-[9999] 
                    flex 
                    flex-col 
                    gap-2 
                    w-[90%] 
                    max-w-sm 
                    pointer-events-none
                "
            >
                <AnimatePresence>
                    {toasts.map(t => (
                        <motion.div 
                            key={t.id} 
                            initial={{ opacity: 0, y: -20, scale: 0.9 }} 
                            animate={{ opacity: 1, y: 0, scale: 1 }} 
                            exit={{ opacity: 0, y: -20, scale: 0.9 }}
                            className={`
                                p-4 
                                rounded-2xl 
                                shadow-2xl 
                                flex 
                                items-center 
                                gap-3 
                                text-sm 
                                font-black 
                                uppercase 
                                tracking-wide 
                                text-white 
                                ${t.type === 'error' ? 'bg-[#EA1D2C]' : ''}
                                ${t.type === 'success' ? 'bg-[#82C91E] text-[#4B0082]' : ''}
                                ${t.type === 'info' ? 'bg-slate-800' : ''}
                            `}
                        >
                            {t.type === 'error' && <Lucide.AlertCircle size={24} className="shrink-0" />}
                            {t.type === 'success' && <Lucide.CheckCircle size={24} className="shrink-0" />}
                            {t.type === 'info' && <Lucide.Info size={24} className="shrink-0" />}
                            <span className="flex-1 text-left">{t.msg}</span>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </ToastContext.Provider>
    );
};

/**
 * Hook nativo do Capacitor para monitorar em tempo real o nível de bateria 
 * do dispositivo do entregador, alterando o intervalo de GPS se estiver acabando.
 */
const useBatteryLevel = () => {
    const [battery, setBattery] = useState({ 
        level: 100, 
        isCritical: false 
    });

    useEffect(() => {
        let isMounted = true;

        const checkBattery = async () => {
            try {
                const info = await Device.getBatteryInfo();
                if (!isMounted) return;
                
                const lvl = Math.round((info.batteryLevel || 1) * 100);
                
                setBattery({ 
                    level: lvl, 
                    isCritical: lvl <= 15 
                });
            } catch(e) {
                console.warn("API de bateria não disponível no ambiente atual", e);
            }
        };

        // Checa imediatamente e depois em intervalos de 60 segundos
        checkBattery();
        const interval = setInterval(checkBattery, 60000);
        
        return () => {
            isMounted = false;
            clearInterval(interval);
        };
    }, []);

    return battery;
};

/**
 * Hook nativo do Capacitor para monitorar queda de conexão com a internet,
 * bloqueando ações críticas (como finalizar pedido) se estiver offline.
 */
const useNetworkStatus = () => {
    const [isOnline, setIsOnline] = useState(true);

    useEffect(() => {
        let listenerHandle = null;

        const initializeNetwork = async () => {
            try {
                const status = await Network.getStatus();
                setIsOnline(status.connected);
                
                listenerHandle = await Network.addListener('networkStatusChange', (newStatus) => { 
                    setIsOnline(newStatus.connected); 
                });
            } catch (error) {
                console.error("Erro ao inicializar listener de rede", error);
            }
        };

        initializeNetwork();

        return () => { 
            if (listenerHandle) {
                listenerHandle.remove(); 
            }
        };
    }, []);

    return isOnline;
};

/**
 * ============================================================================
 * 4. COMPONENTES VISUAIS MODULARES E TELAS AUXILIARES
 * ============================================================================
 */

/**
 * Tela de carregamento infinita exibida durante processos críticos ou abertura.
 */
const TelaSplash = ({ mensagem }) => {
    return (
        <div 
            className="
                h-[100dvh] 
                bg-[#1F0137] 
                flex 
                flex-col 
                items-center 
                justify-center 
                relative 
                overflow-hidden
            "
        >
            <div 
                className="
                    absolute 
                    inset-0 
                    opacity-5 
                    bg-[url('https://res.cloudinary.com/dbd9x1o02/image/upload/v1774934438/rodrigues_geral/vvrauvi5vxs3ukdqd1qn.png')] 
                    bg-repeat 
                    bg-[length:150px_150px]
                " 
            />
            
            <motion.img 
                initial={{ scale: 0.8, opacity: 0 }} 
                animate={{ scale: 1, opacity: 1 }} 
                transition={{ duration: 0.8, ease: "easeOut" }} 
                src={LOGO_APP} 
                className="
                    w-56 
                    h-56 
                    object-contain 
                    z-10 
                    drop-shadow-[0_0_30px_rgba(130,201,30,0.4)]
                " 
                alt="Rodrigues Logo Oficial"
            />
            
            <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={{ delay: 0.5 }} 
                className="
                    mt-12 
                    z-10 
                    flex 
                    flex-col 
                    items-center
                "
            >
                <div 
                    className="
                        w-10 
                        h-10 
                        border-4 
                        border-[#4B0082] 
                        border-t-[#82C91E] 
                        rounded-full 
                        animate-spin 
                        mb-4
                    " 
                />
                <p 
                    className="
                        text-[#82C91E] 
                        font-black 
                        uppercase 
                        tracking-widest 
                        text-[10px] 
                        animate-pulse
                    "
                >
                    {mensagem || 'Iniciando Motor NATIVO e sincronizando...'}
                </p>
            </motion.div>
        </div>
    );
};

/**
 * Tela exibida quando o cadastro do entregador foi concluído, mas 
 * a administração ainda não alterou o status para 'APROVADO'.
 */
const TelaAnalise = ({ onVoltar }) => {
    return (
        <div 
            className="
                min-h-screen 
                bg-[#F8FAFC] 
                flex 
                flex-col 
                items-center 
                justify-center 
                p-8 
                text-center 
                relative 
                overflow-hidden
            "
        >
            <div 
                className="
                    w-32 
                    h-32 
                    bg-yellow-100 
                    rounded-full 
                    flex 
                    items-center 
                    justify-center 
                    mb-8 
                    relative
                "
            >
                <Lucide.Clock 
                    size={64} 
                    className="
                        text-yellow-600 
                        relative 
                        z-10
                    " 
                />
                <div 
                    className="
                        absolute 
                        inset-0 
                        border-4 
                        border-yellow-400 
                        border-t-transparent 
                        rounded-full 
                        animate-spin
                    " 
                />
            </div>
            
            <h1 
                className="
                    text-3xl 
                    font-[1000] 
                    uppercase 
                    italic 
                    tracking-tighter 
                    text-[#4B0082] 
                    mb-4
                "
            >
                Conta em Análise
            </h1>
            
            <p 
                className="
                    text-sm 
                    font-bold 
                    text-slate-500 
                    uppercase 
                    tracking-widest 
                    leading-relaxed 
                    mb-8 
                    max-w-xs
                "
            >
                Seus documentos e placa do veículo estão sendo validados 
                pela nossa equipe de logística. Em breve você receberá a 
                liberação para ligar o seu radar.
            </p>
            
            <button 
                onClick={onVoltar} 
                className="
                    w-full 
                    max-w-xs 
                    py-5 
                    bg-[#4B0082] 
                    text-white 
                    rounded-[2rem] 
                    font-[1000] 
                    uppercase 
                    text-xs 
                    tracking-widest 
                    shadow-xl 
                    active:scale-95 
                    transition-all
                "
            >
                Voltar à Tela de Início
            </button>
        </div>
    );
};

/**
 * Fluxo de Onboarding de múltiplos passos para registro de novos pilotos
 * com integração nativa da câmera para captura de CNH e Selfie.
 */
const TelaCadastro = ({ onVoltar, onSucesso }) => {
    const toast = useToast();
    
    // Controle de estado de progresso
    const [etapa, setEtapa] = useState(1);
    const [loading, setLoading] = useState(false);
    
    // Estrutura de dados do formulário
    const [form, setForm] = useState({ 
        nome: '', 
        cpf: '', 
        telefone: '', 
        veiculo: 'MOTO', 
        placa: '', 
        senha: '' 
    });
    
    // Imagens codificadas em base64
    const [fotos, setFotos] = useState({ 
        perfil: null, 
        cnh: null 
    });

    /**
     * Aciona o plugin nativo de Câmera do Capacitor.
     * @param {string} tipo - 'perfil' ou 'cnh'
     */
    const capturarFoto = async (tipo) => {
        try {
            const image = await Camera.getPhoto({ 
                quality: 80, 
                allowEditing: false, 
                resultType: CameraResultType.DataUrl, 
                source: CameraSource.Camera 
            });
            
            setFotos(prev => ({ 
                ...prev, 
                [tipo]: image.dataUrl 
            }));
            
            toast(`Imagem de ${tipo} capturada com sucesso!`, "success");
        } catch (e) { 
            console.warn("Captura cancelada pelo usuario.", e);
            toast("Captura de imagem cancelada.", "error"); 
        }
    };

    /**
     * Processa todas as informações, faz o upload das imagens para 
     * o Cloudinary e salva o documento no Firebase Firestore.
     */
    const finalizarCadastro = async () => {
        if (!fotos.perfil || !fotos.cnh) {
            return toast("É obrigatório tirar todas as fotos listadas!", "error");
        }
        
        setLoading(true);
        
        try {
            toast("Processando cadastro, não feche o app...", "info");
            
            const cpfLimpo = desformatarCPF(form.cpf);
            
            // Upload paralelo de imagens
            const [urlPerfil, urlCNH] = await Promise.all([
                uploadToCloudinary(fotos.perfil, 'entregadores/perfil'),
                uploadToCloudinary(fotos.cnh, 'entregadores/cnh')
            ]);

            // Estrutura padrão de um novo piloto
            const dadosNovoPiloto = {
                nome: form.nome.toUpperCase(),
                telefone: form.telefone,
                modalidade: form.veiculo,
                placa: form.placa.toUpperCase(),
                senha: form.senha,
                urlPerfil: urlPerfil,
                urlCNH: urlCNH,
                statusAprovacao: 'PENDENTE',
                status: 'Offline',
                ganhosTaxas: 0,
                debitosLoja: 0,
                saldoLiquido: 0,
                dataCadastro: serverTimestamp()
            };

            await setDoc(doc(db, "entregadores", cpfLimpo), dadosNovoPiloto);
            
            toast("Seu cadastro foi enviado para análise!", "success");
            onSucesso();
            
        } catch (error) {
            console.error("Erro fatal no cadastro", error);
            toast("Ocorreu um erro ao gravar seus dados. Tente novamente.", "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div 
            className="
                min-h-screen 
                bg-[#F8FAFC] 
                flex 
                flex-col 
                p-6 
                relative
                overflow-y-auto
            "
        >
            {/* Header do Cadastro */}
            <div 
                className="
                    flex 
                    justify-between 
                    items-center 
                    mb-8 
                    mt-4
                "
            >
                <button 
                    onClick={etapa === 1 ? onVoltar : () => setEtapa(1)} 
                    className="
                        p-3 
                        bg-white 
                        text-[#4B0082] 
                        rounded-2xl 
                        shadow-sm 
                        active:scale-95 
                        transition-transform
                    "
                >
                    <Lucide.ArrowLeft size={24}/>
                </button>
                <span 
                    className="
                        text-[10px] 
                        font-black 
                        uppercase 
                        tracking-widest 
                        text-slate-400
                    "
                >
                    Progresso: Passo {etapa} de 2
                </span>
            </div>

            <h1 
                className="
                    text-4xl 
                    font-[1000] 
                    uppercase 
                    italic 
                    tracking-tighter 
                    text-[#4B0082] 
                    mb-8
                "
            >
                Novo Piloto
            </h1>

            {/* Renderização Condicional das Etapas */}
            {etapa === 1 ? (
                <div className="space-y-4">
                    <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Identificação</label>
                        <input 
                            type="text" 
                            placeholder="NOME COMPLETO" 
                            value={form.nome} 
                            onChange={e => setForm({...form, nome: e.target.value})} 
                            className="
                                w-full 
                                h-16 
                                bg-white 
                                border 
                                border-slate-200 
                                rounded-2xl 
                                px-6 
                                font-black 
                                text-[#4B0082] 
                                text-sm 
                                uppercase 
                                outline-none 
                                focus:border-[#82C91E] 
                                transition-colors
                            "
                        />
                    </div>
                    
                    <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Documento</label>
                        <input 
                            type="tel" 
                            placeholder="CPF (APENAS NÚMEROS)" 
                            value={formatarCPF(form.cpf)} 
                            onChange={e => setForm({...form, cpf: e.target.value})} 
                            maxLength={14} 
                            className="
                                w-full 
                                h-16 
                                bg-white 
                                border 
                                border-slate-200 
                                rounded-2xl 
                                px-6 
                                font-black 
                                text-[#4B0082] 
                                text-sm 
                                outline-none 
                                focus:border-[#82C91E] 
                                transition-colors
                            "
                        />
                    </div>
                    
                    <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Contato</label>
                        <input 
                            type="tel" 
                            placeholder="WHATSAPP COM DDD" 
                            value={form.telefone} 
                            onChange={e => setForm({...form, telefone: e.target.value})} 
                            className="
                                w-full 
                                h-16 
                                bg-white 
                                border 
                                border-slate-200 
                                rounded-2xl 
                                px-6 
                                font-black 
                                text-[#4B0082] 
                                text-sm 
                                outline-none 
                                focus:border-[#82C91E] 
                                transition-colors
                            "
                        />
                    </div>
                    
                    <div className="flex flex-col gap-1 mt-4">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Ferramenta de Trabalho</label>
                        <div className="flex gap-2">
                            <button 
                                onClick={() => setForm({...form, veiculo: 'MOTO'})} 
                                className={`
                                    flex-1 
                                    py-4 
                                    rounded-2xl 
                                    font-black 
                                    uppercase 
                                    text-xs 
                                    border-2 
                                    transition-all 
                                    ${form.veiculo === 'MOTO' ? 'bg-[#4B0082] text-[#82C91E] border-[#4B0082]' : 'bg-white text-slate-400 border-slate-200'}
                                `}
                            >
                                <Lucide.Bike className="mx-auto mb-1"/> 
                                Motocicleta
                            </button>
                            <button 
                                onClick={() => setForm({...form, veiculo: 'CARRO'})} 
                                className={`
                                    flex-1 
                                    py-4 
                                    rounded-2xl 
                                    font-black 
                                    uppercase 
                                    text-xs 
                                    border-2 
                                    transition-all 
                                    ${form.veiculo === 'CARRO' ? 'bg-[#4B0082] text-[#82C91E] border-[#4B0082]' : 'bg-white text-slate-400 border-slate-200'}
                                `}
                            >
                                <Lucide.Car className="mx-auto mb-1"/> 
                                Automóvel
                            </button>
                        </div>
                    </div>
                    
                    <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Placa Oficial</label>
                        <input 
                            type="text" 
                            placeholder="EX: ABC-1234 OU MERCOSUL" 
                            value={form.placa} 
                            onChange={e => setForm({...form, placa: e.target.value})} 
                            className="
                                w-full 
                                h-16 
                                bg-white 
                                border 
                                border-slate-200 
                                rounded-2xl 
                                px-6 
                                font-black 
                                text-[#4B0082] 
                                text-sm 
                                uppercase 
                                outline-none 
                                focus:border-[#82C91E] 
                                transition-colors
                            "
                        />
                    </div>
                    
                    <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Segurança de Acesso</label>
                        <input 
                            type="password" 
                            placeholder="CRIE UMA SENHA NUMÉRICA" 
                            value={form.senha} 
                            onChange={e => setForm({...form, senha: e.target.value})} 
                            className="
                                w-full 
                                h-16 
                                bg-white 
                                border 
                                border-slate-200 
                                rounded-2xl 
                                px-6 
                                font-black 
                                text-[#4B0082] 
                                text-sm 
                                outline-none 
                                focus:border-[#82C91E] 
                                transition-colors
                            "
                        />
                    </div>
                    
                    <button 
                        onClick={() => { 
                            if(form.nome && form.cpf.length >= 11 && form.senha && form.placa) {
                                setEtapa(2); 
                            } else {
                                toast("Por favor, preencha todos os campos corretamente para avançar.", "error"); 
                            }
                        }} 
                        className="
                            w-full 
                            py-5 
                            mt-6 
                            bg-[#82C91E] 
                            text-[#4B0082] 
                            rounded-[2rem] 
                            font-[1000] 
                            uppercase 
                            text-sm 
                            shadow-xl 
                            active:scale-95 
                            transition-transform
                        "
                    >
                        Prosseguir para Fotos
                    </button>
                </div>
            ) : (
                <div className="space-y-6">
                    <h3 className="text-sm font-black text-slate-500 uppercase tracking-widest mb-4">
                        Validação Biográfica
                    </h3>
                    
                    <div 
                        onClick={() => capturarFoto('perfil')} 
                        className={`
                            w-full 
                            h-40 
                            rounded-3xl 
                            border-2 
                            border-dashed 
                            flex 
                            flex-col 
                            items-center 
                            justify-center 
                            gap-3 
                            relative 
                            overflow-hidden 
                            transition-colors 
                            ${fotos.perfil ? 'border-[#82C91E] bg-green-50' : 'border-[#4B0082] bg-white cursor-pointer'}
                        `}
                    >
                        {fotos.perfil ? (
                            <img src={fotos.perfil} className="absolute inset-0 w-full h-full object-cover opacity-50" alt="Selfie" />
                        ) : (
                            <Lucide.User size={40} className="text-[#4B0082]" />
                        )}
                        <span className="font-black text-sm uppercase z-10 text-center px-4">
                            {fotos.perfil ? 'Selfie Confirmada (Toque para Refazer)' : 'Tirar Foto Limpa do Seu Rosto'}
                        </span>
                    </div>
                    
                    <div 
                        onClick={() => capturarFoto('cnh')} 
                        className={`
                            w-full 
                            h-40 
                            rounded-3xl 
                            border-2 
                            border-dashed 
                            flex 
                            flex-col 
                            items-center 
                            justify-center 
                            gap-3 
                            relative 
                            overflow-hidden 
                            transition-colors 
                            ${fotos.cnh ? 'border-[#82C91E] bg-green-50' : 'border-[#4B0082] bg-white cursor-pointer'}
                        `}
                    >
                        {fotos.cnh ? (
                            <img src={fotos.cnh} className="absolute inset-0 w-full h-full object-cover opacity-50" alt="CNH" />
                        ) : (
                            <Lucide.CreditCard size={40} className="text-[#4B0082]" />
                        )}
                        <span className="font-black text-sm uppercase z-10 text-center px-4">
                            {fotos.cnh ? 'CNH Confirmada (Toque para Refazer)' : 'Tirar Foto da Frente da CNH'}
                        </span>
                    </div>
                    
                    <button 
                        disabled={loading} 
                        onClick={finalizarCadastro} 
                        className={`
                            w-full 
                            py-6 
                            mt-8 
                            rounded-[2rem] 
                            font-[1000] 
                            uppercase 
                            text-sm 
                            shadow-xl 
                            transition-all 
                            ${loading ? 'bg-slate-300 text-slate-500 cursor-not-allowed' : 'bg-[#4B0082] text-[#82C91E] active:scale-95'}
                        `}
                    >
                        {loading ? 'Processando Documentos na Nuvem...' : 'Finalizar e Enviar Cadastro'}
                    </button>
                </div>
            )}
        </div>
    );
};

/**
 * Modal sobreposto para acionamento rápido de emergência durante a rota.
 * Desfoca o fundo para dar destaque aos botões de ação imediata.
 */
const ModalSOS = ({ onClose }) => {
    return (
        <div 
            className="
                fixed 
                inset-0 
                z-[5000] 
                bg-[#1F0137]/95 
                backdrop-blur-xl 
                flex 
                flex-col 
                items-center 
                justify-center 
                p-6 
                text-center
            "
        >
            <Lucide.Siren 
                size={90} 
                className="
                    text-red-500 
                    mb-6 
                    animate-pulse 
                    drop-shadow-[0_0_20px_rgba(239,68,68,0.6)]
                " 
            />
            
            <h2 
                className="
                    text-5xl 
                    font-[1000] 
                    uppercase 
                    italic 
                    tracking-tighter 
                    text-white 
                    mb-4
                "
            >
                EMERGÊNCIA
            </h2>
            
            <p 
                className="
                    text-slate-300 
                    font-bold 
                    uppercase 
                    tracking-widest 
                    text-xs 
                    mb-10 
                    max-w-xs 
                    leading-relaxed
                "
            >
                Acione o suporte imediatamente se você sofreu um acidente, 
                foi vítima de roubo ou teve problemas críticos com o pacote.
            </p>
            
            <button 
                onClick={() => {
                    Haptics.impact({ style: ImpactStyle.Medium });
                    window.open(`https://wa.me/${WHATSAPP_SUPORTE}`);
                }} 
                className="
                    w-full 
                    max-w-sm 
                    py-6 
                    mb-4 
                    bg-green-500 
                    text-white 
                    rounded-[2rem] 
                    font-[1000] 
                    uppercase 
                    tracking-widest 
                    text-sm 
                    flex 
                    items-center 
                    justify-center 
                    gap-4 
                    shadow-xl 
                    active:scale-95 
                    transition-transform
                "
            >
                <Lucide.MessageCircle size={24}/> 
                Contato com a Base
            </button>
            
            <button 
                onClick={() => {
                    Haptics.impact({ style: ImpactStyle.Heavy });
                    window.open(`tel:190`);
                }} 
                className="
                    w-full 
                    max-w-sm 
                    py-6 
                    mb-10 
                    bg-red-600 
                    text-white 
                    rounded-[2rem] 
                    font-[1000] 
                    uppercase 
                    tracking-widest 
                    text-sm 
                    flex 
                    items-center 
                    justify-center 
                    gap-4 
                    shadow-xl 
                    active:scale-95 
                    transition-transform
                "
            >
                <Lucide.PhoneCall size={24}/> 
                Ligar 190 (Polícia)
            </button>
            
            <button 
                onClick={onClose} 
                className="
                    text-white/50 
                    font-black 
                    uppercase 
                    text-xs 
                    tracking-widest 
                    border-b 
                    border-white/30 
                    pb-1 
                    hover:text-white 
                    transition-colors
                "
            >
                Cancelar e Fechar Menu
            </button>
        </div>
    );
};

/**
 * Componente de Canvas HTML5 embutido para coleta de assinatura digital
 * do cliente direto na tela do celular do entregador.
 */
const AssinaturaPad = ({ onSave, onCancel }) => {
    const canvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);

    // Inicialização e configuração do pincel no canvas
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        
        // Define o estilo da "caneta"
        ctx.strokeStyle = "#4B0082"; 
        ctx.lineWidth = 5; 
        ctx.lineJoin = "round"; 
        ctx.lineCap = "round";
        
        // Preenche o fundo de branco para o JPEG não ficar preto no upload
        ctx.fillStyle = "#ffffff"; 
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }, []);

    // Calcula a posição do dedo compensando margens da tela mobile
    const getCoordinates = (e) => {
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        
        // Suporta tanto Touch de celular quanto Mouse de PC
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        
        return { 
            offsetX: clientX - rect.left, 
            offsetY: clientY - rect.top 
        };
    };

    const startDrawing = (e) => {
        const { offsetX, offsetY } = getCoordinates(e);
        const ctx = canvasRef.current.getContext("2d");
        ctx.beginPath(); 
        ctx.moveTo(offsetX, offsetY); 
        setIsDrawing(true);
    };

    const draw = (e) => {
        if (!isDrawing) return;
        
        // Previne o "scroll" da tela enquanto estiver desenhando
        if (e.cancelable) {
            e.preventDefault();
        }

        const { offsetX, offsetY } = getCoordinates(e);
        const ctx = canvasRef.current.getContext("2d");
        ctx.lineTo(offsetX, offsetY); 
        ctx.stroke();
    };

    const stopDrawing = () => {
        setIsDrawing(false);
    };

    const handleClear = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#ffffff"; 
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        Haptics.impact({ style: ImpactStyle.Light });
    };

    return (
        <div 
            className="
                bg-white 
                p-6 
                rounded-[2.5rem] 
                shadow-2xl 
                w-full 
                max-w-sm 
                border 
                border-slate-200 
                flex 
                flex-col 
                gap-4
            "
        >
            <div className="flex justify-between items-center mt-2">
                <h3 
                    className="
                        text-base 
                        font-black 
                        text-[#4B0082] 
                        uppercase 
                        flex 
                        items-center 
                        gap-2
                    "
                >
                    <Lucide.PenTool className="text-[#EA1D2C]"/> 
                    Coletar Assinatura
                </h3>
            </div>
            
            <div 
                className="
                    w-full 
                    border-2 
                    border-dashed 
                    border-slate-300 
                    rounded-2xl 
                    bg-white 
                    overflow-hidden 
                    touch-none 
                    relative 
                    shadow-inner
                "
            >
                <canvas 
                    ref={canvasRef} 
                    width={320} 
                    height={220} 
                    className="w-full h-full cursor-crosshair bg-slate-50" 
                    onMouseDown={startDrawing} 
                    onMouseMove={draw} 
                    onMouseUp={stopDrawing} 
                    onMouseLeave={stopDrawing} 
                    onTouchStart={startDrawing} 
                    onTouchMove={draw} 
                    onTouchEnd={stopDrawing}
                />
            </div>
            
            <div className="flex gap-2">
                <button 
                    onClick={handleClear} 
                    className="
                        flex-1 
                        py-4 
                        bg-slate-100 
                        text-slate-600 
                        rounded-2xl 
                        font-black 
                        uppercase 
                        text-xs 
                        hover:bg-slate-200 
                        transition-colors 
                        shadow-sm
                    "
                >
                    Limpar
                </button>
                <button 
                    onClick={() => { 
                        Haptics.impact({ style: ImpactStyle.Light }); 
                        onCancel(); 
                    }} 
                    className="
                        flex-1 
                        py-4 
                        bg-red-50 
                        text-red-500 
                        rounded-2xl 
                        font-black 
                        uppercase 
                        text-xs 
                        hover:bg-red-100 
                        transition-colors 
                        shadow-sm
                    "
                >
                    Cancelar
                </button>
            </div>
            
            <button 
                onClick={() => { 
                    Haptics.impact({ style: ImpactStyle.Heavy }); 
                    // Exporta qualidade média para não estourar o banco ou nuvem
                    onSave(canvasRef.current.toDataURL("image/jpeg", 0.7)); 
                }} 
                className="
                    w-full 
                    py-5 
                    mt-2 
                    bg-[#82C91E] 
                    text-[#4B0082] 
                    rounded-2xl 
                    font-black 
                    uppercase 
                    text-sm 
                    shadow-lg 
                    hover:brightness-110 
                    active:scale-95 
                    transition-transform
                "
            >
                Confirmar Traço
            </button>
        </div>
    );
};

/**
 * ============================================================================
 * 5. COMPONENTE PRINCIPAL DE APLICAÇÃO (STATE CONTROLLER)
 * ============================================================================
 */
const MainApp = () => {
    // Hooks Injetados
    const toast = useToast();
    const isNetworkOnline = useNetworkStatus();
    const batteryInfo = useBatteryLevel();
    
    // Estados Base de Autenticação e Carregamento
    const [entregador, setEntregador] = useState(null);
    const [authModo, setAuthModo] = useState('WELCOME'); // SPLASH | WELCOME | LOGIN | CADASTRO
    const [isCarregandoGlobal, setIsCarregandoGlobal] = useState(false);
    
    // Estados de Navegação e Menu Lateral
    const [menuAberto, setMenuAberto] = useState(false);
    const [telaAtual, setTelaAtual] = useState('RADAR'); // RADAR | HISTORICO | CARTEIRA | PERFIL
    
    // Estados de Operação Logística
    const [isOnlineApp, setIsOnlineApp] = useState(false);
    const [ofertaAtiva, setOfertaAtiva] = useState(null);
    const [tempoAceite, setTempoAceite] = useState(60);
    const [pedidosAtivos, setPedidosAtivos] = useState([]);
    const [historicoPedidos, setHistoricoPedidos] = useState([]);
    const [setorDesejado, setSetorDesejado] = useState('TODOS');
    
    // Estados Auxiliares de Modais e Fluxos
    const [modalSOS, setModalSOS] = useState(false);
    const [detalhesPedido, setDetalhesPedido] = useState(null);
    const [inputCodigo, setInputCodigo] = useState("");
    
    // Referências Persistentes na Memória RAM
    const audioRadarRef = useRef(null);
    const watchPosRef = useRef(null);
    const lastPosUpdateRef = useRef({ time: 0 });

    // Formulário Simplificado de Login
    const [loginCpf, setLoginCpf] = useState('');
    const [loginSenha, setLoginSenha] = useState('');

    /**
     * EFEITO: Inicialização e Persistência do Áudio do Radar.
     * Busca as preferências do usuário salvas no celular.
     */
    const [configSom, setConfigSom] = useState(() => {
        try {
            const saved = localStorage.getItem('config_som_radar_v2');
            return saved ? JSON.parse(saved) : { 
                src: 'https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3', 
                volume: 1.0 
            };
        } catch (error) {
            return { 
                src: 'https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3', 
                volume: 1.0 
            };
        }
    });

    useEffect(() => {
        if (!audioRadarRef.current) { 
            // Instancia novo objeto se não existir
            audioRadarRef.current = new Audio(configSom.src); 
            audioRadarRef.current.loop = true; 
        } else if (audioRadarRef.current.src !== configSom.src) { 
            // Atualiza a fonte se o usuário trocar nas configurações
            audioRadarRef.current.src = configSom.src; 
        }
        
        // Mantém o volume em sincronia com o state
        audioRadarRef.current.volume = configSom.volume;
    }, [configSom]);

    /**
     * EFEITO: Transição inicial Splash -> Welcome
     */
    useEffect(() => {
        if (authModo === 'SPLASH') {
            const timeout = setTimeout(() => {
                setAuthModo('WELCOME');
            }, 3000);
            return () => clearTimeout(timeout);
        }
    }, [authModo]);

    /**
     * Fluxo Lógico: Validar Login no Firebase.
     */
    const handleLogin = async (e) => {
        e.preventDefault(); 
        
        if (!isNetworkOnline) {
            return toast("Sem conexão com a internet. Verifique o sinal da sua operadora.", "error");
        }

        const cpfLimpo = desformatarCPF(loginCpf);
        
        if (cpfLimpo.length !== 11) {
            return toast("Formato de CPF inválido. Digite 11 números.", "error");
        }

        setIsCarregandoGlobal(true);
        
        try {
            toast("Autenticando na base central...", "info");
            
            // Busca o documento correspondente ao ID (CPF)
            const snap = await getDoc(doc(db, "entregadores", cpfLimpo));
            
            if (snap.exists() && snap.data().senha === loginSenha) {
                const dadosExtraidos = snap.data();
                setEntregador({ id: snap.id, ...dadosExtraidos });
                
                Haptics.impact({ style: ImpactStyle.Heavy });
                
                // Hack para dispositivos móveis: Inicializa o contexto de áudio logo
                // após uma interação humana (clique no botão) para o iOS e Android não bloquearem
                if(audioRadarRef.current) { 
                    audioRadarRef.current.play().then(() => {
                        audioRadarRef.current.pause();
                    }).catch(e => console.log("Bloqueio silencioso de áudio ignorado.", e)); 
                }
                
                toast(`Bem-vindo, ${dadosExtraidos.nome.split(' ')[0]}!`, 'success');
            } else { 
                toast("Credenciais inválidas. CPF não encontrado ou senha errada.", "error"); 
            }
        } catch (error) { 
            console.error(error);
            toast("Erro na resposta do servidor. Contate o suporte.", "error"); 
        } finally { 
            setIsCarregandoGlobal(false); 
        }
    };

    /**
     * Fluxo Lógico: Desconectar do aplicativo
     */
    const handleLogoff = () => {
        if(window.confirm("Deseja desconectar sua conta deste aparelho? Seu turno será pausado.")) {
            // Limpa o estado local
            setEntregador(null); 
            setAuthModo('WELCOME'); 
            setMenuAberto(false);
            
            // Destrói qualquer listener de GPS ativo para poupar bateria
            if (watchPosRef.current) {
                Geolocation.clearWatch({ id: watchPosRef.current });
            }
            
            toast("Conta desconectada em segurança.", "info");
        }
    };

    /**
     * MOTOR DE DESPACHO E ONDAS DE PEDIDO (Efeito Mestre)
     * Monitora constantemente o Firebase procurando missões onde
     * o `entregadorAtualOferta` bate com o ID logado.
     */
    useEffect(() => {
        if (!entregador || !isOnlineApp || entregador.statusAprovacao !== 'APROVADO') {
            return;
        }

        // Query 1: Procurando ofertas pendentes de aceite
        const queryOfertas = query(
            collection(db, "pedidos"), 
            where("statusDespacho", "==", "OFERTA_INDIVIDUAL"), 
            where("entregadorAtualOferta", "==", entregador.id)
        );

        const unsubscribeOfertas = onSnapshot(queryOfertas, (snapshot) => {
            if (!snapshot.empty) {
                const pedidoSorteado = { 
                    id: snapshot.docs[0].id, 
                    ...snapshot.docs[0].data() 
                };
                
                // Validação Logística: Filtro Direcional
                const setorDestino = calcularSetorPizza(pedidoSorteado.endereco?.lat, pedidoSorteado.endereco?.lng);
                
                if (setorDesejado !== 'TODOS' && setorDestino !== setorDesejado) { 
                    // Se o piloto configurou "SUL" e o pedido for para o "NORTE",
                    // ele rejeita a oferta de forma invisível para não incomodar o piloto.
                    rejeitarOfertaInterna(pedidoSorteado.id); 
                    return; 
                }

                // Renderiza a notificação no painel
                setOfertaAtiva(pedidoSorteado); 
                
                // Reinicia o cronômetro visual
                setTempoAceite(60); 
                
                // Dispara Alarmes Nativos
                if (audioRadarRef.current && audioRadarRef.current.paused) { 
                    audioRadarRef.current.play().catch(()=>{}); 
                    Haptics.vibrate(); 
                }
            } else {
                // Remove tela de oferta
                setOfertaAtiva(null);
                
                // Pausa Alarme
                if (audioRadarRef.current && !audioRadarRef.current.paused) { 
                    audioRadarRef.current.pause(); 
                    audioRadarRef.current.currentTime = 0; 
                }
            }
        });

        // Query 2: Mantendo controle dos pedidos ativos que já estão na mochila
        const queryMochila = query(
            collection(db, "pedidos"), 
            where("entregadorId", "==", entregador.id), 
            where("status", "in", ['A_CAMINHO_LOJA', 'SAIU_ENTREGA'])
        );

        const unsubscribeMochila = onSnapshot(queryMochila, (snapshot) => {
            const pacotesEmPosse = snapshot.docs.map(docData => ({ 
                id: docData.id, 
                ...docData.data() 
            }));
            
            setPedidosAtivos(pacotesEmPosse);
            
            // Reajuste de Inteligência: Se o piloto constar como ocupado no banco, 
            // mas a mochila estiver vazia (entregou tudo), devolve ele para a fila.
            if (pacotesEmPosse.length === 0 && (entregador.status === 'Coletando' || entregador.status === 'Em Rota')) {
                updateDoc(doc(db, "entregadores", entregador.id), { 
                    status: 'Livre' 
                });
                setEntregador(estadoAnterior => ({ 
                    ...estadoAnterior, 
                    status: 'Livre' 
                }));
            }
        });

        // Limpeza de memória dos listeners
        return () => { 
            unsubscribeOfertas(); 
            unsubscribeMochila(); 
        };
    }, [entregador?.id, isOnlineApp, setorDesejado, entregador?.status, entregador?.statusAprovacao]);

    /**
     * EFEITO: Alimentação da página "Histórico" (Lazy Load).
     */
    useEffect(() => {
        // Não puxar do banco se a tela não estiver ativa, pra economizar requisições pagas
        if (!entregador || telaAtual !== 'HISTORICO') return;
        
        const queryHistórico = query(
            collection(db, "pedidos"), 
            where("entregadorId", "==", entregador.id), 
            where("status", "==", "CONCLUIDO"), 
            orderBy("horarioConcluido", "desc"), 
            limit(20) // Limite rígido para performance
        );
        
        const unsubscribe = onSnapshot(queryHistórico, (snapshot) => {
            const relatorios = snapshot.docs.map(docRegistro => ({ 
                id: docRegistro.id, 
                ...docRegistro.data() 
            }));
            setHistoricoPedidos(relatorios);
        });
        
        return () => unsubscribe();
    }, [entregador?.id, telaAtual]);

    /**
     * EFEITO: Cronômetro decrescente para limite de tempo no radar.
     */
    useEffect(() => {
        if (!ofertaAtiva) return;
        
        const timer = setInterval(() => {
            setTempoAceite(tempoAnterior => {
                // Bateu zero, expulsa a oferta e passa pro próximo
                if (tempoAnterior <= 1) { 
                    rejeitarOfertaInterna(ofertaAtiva.id); 
                    clearInterval(timer); 
                    return 0; 
                }
                return tempoAnterior - 1;
            });
        }, 1000); // 1 segundo exato
        
        return () => clearInterval(timer);
    }, [ofertaAtiva]);

    /**
     * Fluxo Lógico: Rejeitar ou perder missão do Radar
     */
    const rejeitarOfertaInterna = async (pedidoId) => {
        try { 
            // Comando "PROXIMO_FILA" engatilha a Cloud Function do servidor
            // para buscar outro piloto online
            await updateDoc(doc(db, "pedidos", pedidoId), { 
                entregadorAtualOferta: "PROXIMO_FILA", 
                tentativas: increment(1) 
            }); 
            setOfertaAtiva(null); 
        } catch (error) {
            console.error("Falha ao passar bastão de oferta", error);
        }
    };

    /**
     * Fluxo Lógico: Dar o "aceite" cravado na missão ofertada.
     */
    const aceitarOferta = async () => {
        setIsCarregandoGlobal(true);
        
        try {
            // Documento Pedido
            await updateDoc(doc(db, "pedidos", ofertaAtiva.id), { 
                status: 'A_CAMINHO_LOJA', 
                statusDespacho: 'Atribuído', 
                statusLogistica: 'AGUARDANDO_COLETA', 
                entregadorId: entregador.id, 
                entregadorAtualOferta: null, 
                horarioAceitePiloto: serverTimestamp() 
            });
            
            // Documento Entregador
            if (entregador.status === 'Livre') { 
                await updateDoc(doc(db, "entregadores", entregador.id), { 
                    status: 'Coletando' 
                }); 
                setEntregador(estadoAnterior => ({ 
                    ...estadoAnterior, 
                    status: 'Coletando' 
                })); 
            }
            
            Haptics.impact({ style: ImpactStyle.Heavy }); 
            setOfertaAtiva(null); 
            toast("Missão aceita com sucesso! Direcione-se para a base.", "success");
            
            if (audioRadarRef.current && !audioRadarRef.current.paused) { 
                audioRadarRef.current.pause(); 
                audioRadarRef.current.currentTime = 0; 
            }
        } catch (error) { 
            // Cenário comum: concorrência de banco de dados onde outro piloto 
            // apertou um milésimo antes ou admin cancelou
            toast("Falha critica: A missão expirou ou foi retirada da sua tela.", "error"); 
        } finally { 
            setIsCarregandoGlobal(false); 
        }
    };

    /**
     * Ação: O piloto declara que a sacola saiu das mãos do atendente e está na mochila.
     */
    const marcarPacoteComoColetado = async (pedidoId) => { 
        Haptics.impact({ style: ImpactStyle.Light }); 
        await updateDoc(doc(db, "pedidos", pedidoId), { 
            statusLogistica: 'COLETADO_NA_LOJA' 
        }); 
    };

    /**
     * Ação Master: O piloto sai da base com 1 ou mais pedidos e entra no modo de navegação.
     */
    const iniciarRotaCompleta = async () => {
        Haptics.vibrate(); 
        setIsCarregandoGlobal(true);
        
        try {
            // Batelada: Atualiza o status de múltiplos pedidos simultaneamente
            const processamentoEmMassa = pedidosAtivos.map(p => 
                updateDoc(doc(db, "pedidos", p.id), { 
                    status: 'SAIU_ENTREGA', 
                    statusLogistica: 'EM_TRANSITO' 
                })
            );
            
            await Promise.all(processamentoEmMassa);
            
            // Trava o piloto para não receber novas ofertas enquanto não terminar
            await updateDoc(doc(db, "entregadores", entregador.id), { 
                status: 'Em Rota' 
            });
            
            setEntregador(estadoAnterior => ({ 
                ...estadoAnterior, 
                status: 'Em Rota' 
            }));
            
            toast("Rota de despachos Iniciada. Pilote com atenção!", "success");
        } catch (error) { 
            toast("Erro fatal na transação de rota.", "error"); 
        } finally { 
            setIsCarregandoGlobal(false); 
        }
    };

    /**
     * Ação: O piloto chegou no endereço e o app libera o painel de código.
     */
    const marcarChegada = async (pedidoId) => { 
        Haptics.impact({ style: ImpactStyle.Heavy }); 
        
        await updateDoc(doc(db, "pedidos", pedidoId), { 
            statusLogistica: 'CHEGOU_NO_LOCAL', 
            horarioChegadaCliente: serverTimestamp() 
        }); 
        
        toast("Cliente está sendo notificado por SMS/Push!", "success"); 
    };

    /**
     * Aciona ou desativa o expediente do piloto. Controla o botão principal de Energia.
     */
    const alternarStatusOperacao = async (ficarOnline) => {
        if (!isNetworkOnline) {
            return toast("Requerimento não cumprido: Você está sem conexão com a internet.", "error");
        }
        
        Haptics.impact({ style: ImpactStyle.Medium });
        
        if (ficarOnline) {
            try {
                // Camada de segurança rigorosa para plugins nativos
                const permissionsInfo = await Geolocation.checkPermissions();
                if (permissionsInfo.location !== 'granted') {
                    const reqResult = await Geolocation.requestPermissions();
                    if(reqResult.location !== 'granted') {
                        throw new Error("Permissão Negada.");
                    }
                }
                
                toast("Buscando satélite. Mantendo conexão aberta...", "info");
                
                // Obtém leitura de alta precisão inicial
                const initialPosition = await Geolocation.getCurrentPosition({ 
                    enableHighAccuracy: true 
                });
                
                setIsOnlineApp(true); 
                
                await updateDoc(doc(db, "entregadores", entregador.id), { 
                    status: 'Livre', 
                    coords: { 
                        lat: initialPosition.coords.latitude, 
                        lng: initialPosition.coords.longitude 
                    }
                }); 
                
                setEntregador(estadoAnterior => ({ 
                    ...estadoAnterior, 
                    status: 'Livre' 
                })); 
                
                toast("Radar Central Ativado com sucesso!", "success");
            } catch (error) { 
                console.error("Log de Erro GPS", error);
                toast("Falha Sistêmica: Ative o GPS nas configurações do seu celular.", "error"); 
                setIsOnlineApp(false); 
            }
        } else {
            setIsOnlineApp(false);
            
            // Remove gancho de escuta para não drenar a bateria rodando fundo
            if (watchPosRef.current != null) {
                Geolocation.clearWatch({ id: watchPosRef.current });
            }
            
            await updateDoc(doc(db, "entregadores", entregador.id), { 
                status: 'Offline' 
            });
            
            setEntregador(estadoAnterior => ({ 
                ...estadoAnterior, 
                status: 'Offline' 
            })); 
            
            toast("Expediente finalizado. Radar offline.", "info");
        }
    };

    /**
     * EFEITO: Background Task - Observador de Posição Geográfica Constante.
     * Somente funciona se o App e a Internet estiverem ativados.
     */
    useEffect(() => {
        if (!entregador || !isOnlineApp || !isNetworkOnline) return;
        
        const instanciarObservador = async () => {
            watchPosRef.current = await Geolocation.watchPosition({ 
                enableHighAccuracy: true, 
                timeout: 5000 
            }, async (positionUpdate) => {
                if (!positionUpdate) return;
                
                const currentTimestamp = Date.now();
                
                // Inteligência Nativa: Reduz o ping no servidor se a bateria 
                // estiver acabando (de 15 em 15 segundos para 40 em 40 segundos)
                const frequenciaMinima = batteryInfo.isCritical ? 40000 : 15000;
                
                if (currentTimestamp - lastPosUpdateRef.current.time >= frequenciaMinima) {
                    lastPosUpdateRef.current = { time: currentTimestamp };
                    
                    try { 
                        // Envio silencioso pro Admin Panel conseguir ver no mapa
                        await updateDoc(doc(db, "entregadores", entregador.id), { 
                            coords: { 
                                lat: positionUpdate.coords.latitude, 
                                lng: positionUpdate.coords.longitude 
                            }, 
                            ultimaAtualizacao: serverTimestamp()
                        }); 
                    } catch (e) { 
                        console.warn("Falha silenciosa ao atualizar posição no servidor", e);
                    }
                }
            });
        };
        
        instanciarObservador();
        
        return () => { 
            if (watchPosRef.current != null) {
                Geolocation.clearWatch({ id: watchPosRef.current }); 
            }
        };
    }, [isOnlineApp, batteryInfo, isNetworkOnline, entregador]);

    /**
     * Fluxo Lógico: Validação final do cliente no momento da entrega do pacote.
     */
    const finalizarComCodigo = (pedidoTratado) => {
        if (!inputCodigo || inputCodigo.trim() === "") {
            return toast("Obrigatoriedade: Digite o código pin informado.", "error");
        }
        
        if (inputCodigo !== pedidoTratado.codigoEntrega) {
            return toast("Auditoria falhou: Código numérico incorreto!", "error");
        }
        
        // Direcionamento dinâmico baseado na regra do pedido
        if (!pedidoTratado.requerAssinatura) { 
            // Aciona câmera do dispositivo com compressão embutida
            Camera.getPhoto({ 
                quality: 70, 
                resultType: CameraResultType.DataUrl, 
                source: CameraSource.Camera 
            }).then(imgCaptured => { 
                setDetalhesPedido(pedidoTratado); 
                processarConclusaoEntrega(imgCaptured.dataUrl, false); 
            }).catch(() => {
                toast("Captura de prova documental cancelada.", "info");
            }); 
        } else { 
            // Abre o modal na tela de Assinatura Eletrônica embutido no HTML Canvas
            setDetalhesPedido(pedidoTratado); 
        }
    };

    /**
     * Transação Final de Contabilidade e Finalização de Pedido.
     * Ponto de atenção máximo a erros na rede ou falha de nuvem.
     */
    const processarConclusaoEntrega = async (provaEmBase64DataURL, isAssinaturaContext = false) => {
        setIsCarregandoGlobal(true);
        
        try {
            toast("Transacionando informações... enviando prova remota.", "info");
            
            // Seleção de trilha de armazenamento
            const endpointDestino = isAssinaturaContext 
                ? `entregas/${detalhesPedido.id}/assinaturas` 
                : `entregas/${detalhesPedido.id}/fotos`;
                
            const linkDaProva = await uploadToCloudinary(provaEmBase64DataURL, endpointDestino);
            
            // Calculo Matemático para o Livro Caixa e Ledger ("CARTEIRA") do Piloto
            const valorTaxaOperacao = detalhesPedido.valores?.taxaEntrega || 6.00;
            const valorAcertoLoja = ['DINHEIRO', 'MAQUININHA'].includes(detalhesPedido.pagamento?.metodo) 
                ? (detalhesPedido.valores?.total || 0) 
                : 0;
                
            const totalGanhosSomados = (entregador.ganhosTaxas || 0) + valorTaxaOperacao;
            const totalDebitosSomados = (entregador.debitosLoja || 0) + valorAcertoLoja;
            const saldoGeralLiquido = totalGanhosSomados - totalDebitosSomados;
            
            // Commit Fase 1: Encerramento do Pedido
            await updateDoc(doc(db, "pedidos", detalhesPedido.id), { 
                status: 'CONCLUIDO', 
                provaEntregaUrl: linkDaProva, 
                horarioConcluido: serverTimestamp() 
            });
            
            // Condicional: Se ainda tem pacote de outra entrega (Múltiplas Rotas),
            // mantém "Em Rota", senão devolve pra "Livre" na fila de despacho.
            const proximoStatusDoMotorista = pedidosAtivos.length > 1 ? 'Em Rota' : 'Livre';
            
            // Commit Fase 2: Atualização do Ledger do Piloto
            await updateDoc(doc(db, "entregadores", entregador.id), { 
                ganhosTaxas: totalGanhosSomados, 
                debitosLoja: totalDebitosSomados, 
                saldoLiquido: saldoGeralLiquido, 
                status: proximoStatusDoMotorista 
            });
            
            // Reflete as atualizações na tela principal
            setEntregador(estadoAnterior => ({ 
                ...estadoAnterior, 
                ganhosTaxas: totalGanhosSomados, 
                debitosLoja: totalDebitosSomados, 
                saldoLiquido: saldoGeralLiquido, 
                status: proximoStatusDoMotorista 
            }));
            
            // Limpa o formulário virtual
            setDetalhesPedido(null); 
            setInputCodigo(""); 
            
            toast("Missão executada com brilhantismo e registrada no livro caixa!", "success");
            
        } catch (error) { 
            console.error("Transacao Critica Abortada", error);
            toast("Erro fatal no processo final. Retenha os dados offline.", "error"); 
        } finally { 
            setIsCarregandoGlobal(false); 
        }
    };

    /**
     * ========================================================================
     * RENDERS DE TELA CHEIA E ROTEAMENTO INTERNO (Fora da Autenticação)
     * ========================================================================
     */
    
    // Switch de segurança 1: Usuário não identificado
    if (!entregador) {
        if (authModo === 'SPLASH' || isCarregandoGlobal) {
            return <TelaSplash mensagem={isCarregandoGlobal ? 'Sincronizando Banco de Dados...' : 'Iniciando Motor Primário...'} />;
        }
        
        if (authModo === 'CADASTRO') {
            return (
                <TelaCadastro 
                    onVoltar={() => setAuthModo('WELCOME')} 
                    onSucesso={() => setAuthModo('LOGIN')} 
                />
            );
        }
        
        if (authModo === 'WELCOME') {
            return (
                <div 
                    className="
                        h-[100dvh] 
                        bg-[#1F0137] 
                        flex 
                        flex-col 
                        items-center 
                        justify-end 
                        p-8 
                        relative 
                        overflow-hidden
                    "
                >
                    <div 
                        className="
                            absolute 
                            inset-0 
                            opacity-[0.03] 
                            bg-[url('https://res.cloudinary.com/dbd9x1o02/image/upload/v1774934438/rodrigues_geral/vvrauvi5vxs3ukdqd1qn.png')] 
                            bg-repeat 
                            bg-[length:120px_120px]
                        " 
                    />
                    
                    <motion.img 
                        initial={{ y: -50, opacity: 0 }} 
                        animate={{ y: 0, opacity: 1 }} 
                        transition={{ type: "spring", stiffness: 100 }} 
                        src={LOGO_APP} 
                        className="
                            w-44 
                            mb-auto 
                            mt-20 
                            z-10 
                            drop-shadow-2xl
                        " 
                        alt="Logo Rodrigues Base"
                    />
                    
                    <motion.div 
                        initial={{ y: 100, opacity: 0 }} 
                        animate={{ y: 0, opacity: 1 }} 
                        className="
                            w-full 
                            bg-white/10 
                            backdrop-blur-xl 
                            p-8 
                            rounded-[3rem] 
                            border 
                            border-white/10 
                            text-center 
                            z-10 
                            shadow-[0_0_50px_rgba(0,0,0,0.5)]
                        "
                    >
                        <h1 
                            className="
                                text-4xl 
                                font-[1000] 
                                text-white 
                                uppercase 
                                italic 
                                tracking-tighter 
                                mb-2
                            "
                        >
                            Rodrigues <span className="text-[#82C91E]">Pilotos</span>
                        </h1>
                        
                        <div className="space-y-4 mt-8">
                            <button 
                                onClick={() => setAuthModo('LOGIN')} 
                                className="
                                    w-full 
                                    h-16 
                                    bg-[#82C91E] 
                                    text-[#4B0082] 
                                    rounded-3xl 
                                    font-[1000] 
                                    uppercase 
                                    text-sm 
                                    shadow-lg 
                                    active:scale-95 
                                    transition-transform
                                "
                            >
                                Acessar Minha Conta
                            </button>
                            
                            <button 
                                onClick={() => setAuthModo('CADASTRO')} 
                                className="
                                    w-full 
                                    h-16 
                                    bg-transparent 
                                    text-white 
                                    border-2 
                                    border-white/20 
                                    rounded-3xl 
                                    font-[1000] 
                                    uppercase 
                                    text-sm 
                                    active:scale-95 
                                    transition-transform
                                "
                            >
                                Quero ser um Piloto
                            </button>
                        </div>
                    </motion.div>
                </div>
            );
        }
        
        if (authModo === 'LOGIN') {
            return (
                <div 
                    className="
                        min-h-screen 
                        bg-[#F8FAFC] 
                        flex 
                        flex-col 
                        p-6
                    "
                >
                    <div 
                        className="
                            flex-1 
                            flex 
                            flex-col 
                            justify-center 
                            max-w-sm 
                            mx-auto 
                            w-full
                        "
                    >
                        <button 
                            onClick={() => setAuthModo('WELCOME')} 
                            className="
                                mb-8 
                                p-3 
                                bg-white 
                                w-12 
                                h-12 
                                rounded-2xl 
                                shadow-sm 
                                text-[#4B0082] 
                                flex 
                                items-center 
                                justify-center
                            "
                        >
                            <Lucide.ArrowLeft/>
                        </button>
                        
                        <h1 
                            className="
                                text-4xl 
                                font-[1000] 
                                uppercase 
                                italic 
                                tracking-tighter 
                                text-[#4B0082] 
                                mb-8 
                                text-center
                            "
                        >
                            Login Operacional
                        </h1>
                        
                        <form 
                            onSubmit={handleLogin} 
                            className="
                                space-y-5 
                                bg-white 
                                p-8 
                                rounded-[3rem] 
                                shadow-2xl 
                                border 
                                border-slate-100
                            "
                        >
                            <input 
                                type="tel" 
                                placeholder="CPF DO ENTREGADOR" 
                                value={formatarCPF(loginCpf)} 
                                onChange={e => setLoginCpf(e.target.value)} 
                                maxLength={14} 
                                className="
                                    w-full 
                                    h-16 
                                    bg-slate-50 
                                    border-2 
                                    border-slate-100 
                                    rounded-2xl 
                                    px-6 
                                    text-xl 
                                    font-black 
                                    text-center 
                                    outline-none 
                                    focus:border-[#82C91E] 
                                    text-[#4B0082]
                                "
                            />
                            
                            <input 
                                type="password" 
                                placeholder="SENHA ALFANUMÉRICA" 
                                value={loginSenha} 
                                onChange={e => setLoginSenha(e.target.value)} 
                                className="
                                    w-full 
                                    h-16 
                                    bg-slate-50 
                                    border-2 
                                    border-slate-100 
                                    rounded-2xl 
                                    px-6 
                                    text-xl 
                                    font-black 
                                    text-center 
                                    outline-none 
                                    focus:border-[#82C91E] 
                                    text-[#4B0082]
                                "
                            />
                            
                            <button 
                                type="submit" 
                                disabled={isCarregandoGlobal} 
                                className="
                                    w-full 
                                    h-16 
                                    mt-4 
                                    bg-[#4B0082] 
                                    text-[#82C91E] 
                                    rounded-3xl 
                                    font-[1000] 
                                    uppercase 
                                    shadow-xl 
                                    active:scale-95 
                                    transition-all 
                                    disabled:opacity-50
                                "
                            >
                                Autorizar Acesso
                            </button>
                        </form>
                    </div>
                </div>
            );
        }
    }

    // Switch de segurança 2: Logado mas não aprovado pelo admin local
    if (entregador.statusAprovacao === 'PENDENTE') {
        return (
            <TelaAnalise 
                onVoltar={() => { 
                    setEntregador(null); 
                    setAuthModo('WELCOME'); 
                }} 
            />
        );
    }

    /**
     * ========================================================================
     * INTERFACE PRINCIPAL DO APLICATIVO (LOGADO E APROVADO)
     * ========================================================================
     */
    return (
        <div 
            className="
                min-h-screen 
                bg-[#3A0066] 
                pb-32 
                relative 
                overflow-x-hidden 
                pt-[env(safe-area-inset-top)]
            "
        >
            {/* COMPONENTE: HEADER SUPERIOR CENTRAL */}
            <header 
                className="
                    bg-white 
                    px-5 
                    py-3 
                    sticky 
                    top-0 
                    z-[100] 
                    shadow 
                    flex 
                    justify-between 
                    items-center 
                    rounded-b-[2.5rem]
                "
            >
                <div className="flex items-center gap-4">
                    <button 
                        onClick={() => setMenuAberto(true)} 
                        className="
                            w-12 
                            h-12 
                            bg-slate-50 
                            rounded-[1.2rem] 
                            flex 
                            items-center 
                            justify-center 
                            text-[#4B0082] 
                            shadow-inner 
                            active:scale-95 
                            transition-transform
                        "
                    >
                        <Lucide.Menu size={24}/>
                    </button>
                    <div>
                        <h1 
                            className="
                                font-[1000] 
                                italic 
                                text-sm 
                                uppercase 
                                text-[#4B0082] 
                                leading-none
                            "
                        >
                            Pilotos App
                        </h1>
                        <p 
                            className="
                                text-[8px] 
                                font-black 
                                text-slate-400 
                                uppercase 
                                tracking-[0.2em] 
                                mt-1.5 
                                flex 
                                items-center 
                                gap-1
                            "
                        >
                            Métrica Bateria: 
                            <span 
                                className={batteryInfo.isCritical ? 'text-red-500' : 'text-green-500'}
                            >
                                {batteryInfo.level}%
                            </span>
                        </p>
                    </div>
                </div>
                
                {/* O Botão Mestre de Operação */}
                <button 
                    onClick={() => alternarStatusOperacao(!isOnlineApp)} 
                    className={`
                        w-14 
                        h-14 
                        rounded-2xl 
                        flex 
                        flex-col 
                        items-center 
                        justify-center 
                        gap-0.5 
                        border-2 
                        transition-colors 
                        ${isOnlineApp ? 'bg-[#82C91E] text-[#4B0082] border-[#82C91E]' : 'bg-white text-slate-400 border-slate-200'}
                    `}
                >
                    <Lucide.Power size={20} strokeWidth={isOnlineApp ? 3 : 2}/>
                    <span className="text-[8px] font-black uppercase">
                        {isOnlineApp ? 'ON' : 'OFF'}
                    </span>
                </button>
            </header>

            {/* COMPONENTE: MENU LATERAL DINÂMICO (SIDEBAR/DRAWER) */}
            <AnimatePresence>
                {menuAberto && (
                    <div className="fixed inset-0 z-[1000] flex">
                        <motion.div 
                            initial={{ opacity: 0 }} 
                            animate={{ opacity: 1 }} 
                            exit={{ opacity: 0 }} 
                            className="
                                absolute 
                                inset-0 
                                bg-[#4B0082]/80 
                                backdrop-blur-md
                            " 
                            onClick={() => setMenuAberto(false)} 
                        />
                        
                        <motion.div 
                            initial={{ x: "-100%" }} 
                            animate={{ x: 0 }} 
                            exit={{ x: "-100%" }} 
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }} 
                            className="
                                w-[85%] 
                                max-w-[340px] 
                                bg-white 
                                h-full 
                                shadow-2xl 
                                flex 
                                flex-col 
                                rounded-r-[3rem] 
                                overflow-hidden 
                                relative 
                                z-20
                            "
                        >
                            <div 
                                className="
                                    p-8 
                                    bg-gradient-to-br 
                                    from-[#1F0137] 
                                    to-[#4B0082] 
                                    text-white
                                "
                            >
                                <div 
                                    className="
                                        w-20 
                                        h-20 
                                        bg-white/10 
                                        rounded-[2rem] 
                                        mb-5 
                                        border-2 
                                        border-[#82C91E]/50 
                                        overflow-hidden 
                                        shadow-inner
                                    "
                                >
                                    <img 
                                        src={entregador.urlPerfil} 
                                        className="w-full h-full object-cover" 
                                        alt="Perfil Motorista" 
                                    />
                                </div>
                                <h2 
                                    className="
                                        text-2xl 
                                        font-[1000] 
                                        uppercase 
                                        truncate 
                                        italic 
                                        tracking-tighter
                                    "
                                >
                                    {entregador.nome}
                                </h2>
                                <p 
                                    className="
                                        text-[10px] 
                                        font-black 
                                        text-[#82C91E] 
                                        mt-2 
                                        flex 
                                        items-center 
                                        gap-1.5 
                                        uppercase 
                                        tracking-widest
                                    "
                                >
                                    <div 
                                        className={`
                                            w-2 
                                            h-2 
                                            rounded-full 
                                            ${isOnlineApp ? 'bg-[#82C91E] animate-pulse' : 'bg-red-500'}
                                        `} 
                                    />
                                    CPF: {formatarCPF(entregador.id)}
                                </p>
                            </div>
                            
                            <nav 
                                className="
                                    p-6 
                                    flex-1 
                                    space-y-3 
                                    bg-[#F8FAFC] 
                                    overflow-y-auto
                                "
                            >
                                {[
                                    { id: 'RADAR', icon: Lucide.Radar, label: 'Radar Central' }, 
                                    { id: 'CARTEIRA', icon: Lucide.Wallet, label: 'Livro Caixa' }, 
                                    { id: 'HISTORICO', icon: Lucide.History, label: 'Histórico' }, 
                                    { id: 'PERFIL', icon: Lucide.Settings, label: 'Ajustes App' }
                                ].map(item => (
                                    <button 
                                        key={item.id} 
                                        onClick={() => {
                                            setTelaAtual(item.id); 
                                            setMenuAberto(false);
                                        }} 
                                        className={`
                                            w-full 
                                            p-5 
                                            flex 
                                            items-center 
                                            gap-4 
                                            rounded-[2rem] 
                                            font-[1000] 
                                            text-xs 
                                            uppercase 
                                            transition-colors 
                                            ${telaAtual === item.id ? 'bg-white border-2 border-[#4B0082] text-[#4B0082] shadow-xl' : 'text-slate-500 bg-white border border-transparent'}
                                        `}
                                    >
                                        <div 
                                            className={`
                                                p-2 
                                                rounded-xl 
                                                bg-slate-50 
                                                ${telaAtual === item.id ? 'text-[#4B0082]' : 'text-slate-400'}
                                            `}
                                        >
                                            <item.icon size={20}/>
                                        </div>
                                        {item.label}
                                    </button>
                                ))}
                            </nav>
                            
                            <div 
                                className="
                                    p-6 
                                    bg-white 
                                    border-t 
                                    border-slate-100 
                                    flex 
                                    gap-2
                                "
                            >
                                <button 
                                    onClick={() => setModalSOS(true)} 
                                    className="
                                        flex-1 
                                        p-4 
                                        bg-red-100 
                                        text-red-600 
                                        rounded-2xl 
                                        font-black 
                                        text-xs 
                                        uppercase 
                                        shadow-sm 
                                        active:scale-95
                                    "
                                >
                                    <Lucide.Siren className="mx-auto mb-1"/> SOS
                                </button>
                                
                                <button 
                                    onClick={handleLogoff} 
                                    className="
                                        flex-1 
                                        p-4 
                                        bg-slate-100 
                                        text-slate-600 
                                        rounded-2xl 
                                        font-black 
                                        text-xs 
                                        uppercase 
                                        shadow-sm 
                                        active:scale-95
                                    "
                                >
                                    <Lucide.LogOut className="mx-auto mb-1"/> Sair
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* SEÇÃO PRINCIPAL DE CONTEÚDO */}
            <main className="p-6">
                
                {/* ------------------------------------------------------------- */}
                {/* TELA A: RADAR DE OPERAÇÃO E ENTREGAS ATIVAS                   */}
                {/* ------------------------------------------------------------- */}
                {telaAtual === 'RADAR' && (
                    <div className="space-y-6">
                        
                        {!isOnlineApp ? ( 
                            <div className="text-center pt-32 opacity-30">
                                <Lucide.Moon 
                                    size={100} 
                                    className="mx-auto mb-6 text-white drop-shadow-lg"
                                />
                                <h2 
                                    className="
                                        text-3xl 
                                        font-[1000] 
                                        uppercase 
                                        italic 
                                        tracking-tighter 
                                        text-white
                                    "
                                >
                                    Radar Adormecido
                                </h2>
                            </div> 
                        ) : (
                            <AnimatePresence mode="popLayout">
                                
                                {/* ALERTA VISUAL: Oferta Recebida do Backend */}
                                {ofertaAtiva && entregador.status !== 'Em Rota' && (
                                    <motion.div 
                                        initial={{ scale: 0.9, opacity: 0 }} 
                                        animate={{ scale: 1, opacity: 1 }} 
                                        exit={{ scale: 0.9, opacity: 0 }} 
                                        className="
                                            bg-gradient-to-br 
                                            from-[#EA1D2C] 
                                            to-red-900 
                                            rounded-[3rem] 
                                            p-8 
                                            shadow-2xl 
                                            ring-4 
                                            ring-red-500/30 
                                            mb-6 
                                            relative
                                        "
                                    >
                                        <div className="flex justify-between items-start mb-6">
                                            <span 
                                                className="
                                                    bg-white 
                                                    text-red-600 
                                                    px-4 
                                                    py-2 
                                                    rounded-full 
                                                    font-[1000] 
                                                    text-[10px] 
                                                    uppercase
                                                "
                                            >
                                                {tempoAceite}s RESTANTES
                                            </span>
                                            
                                            <div className="text-right">
                                                <p className="text-[9px] font-black text-white/60 uppercase">
                                                    Ganho Estimado
                                                </p>
                                                <span className="font-[1000] text-[#82C91E] text-3xl italic">
                                                    R$ {ofertaAtiva.valores?.taxaEntrega?.toFixed(2)}
                                                </span>
                                            </div>
                                        </div>
                                        
                                        <div className="bg-black/20 p-5 rounded-3xl mb-8">
                                            <p className="text-[9px] font-black text-white/50 uppercase">
                                                <Lucide.MapPin size={12} className="inline"/> Bairro de Destino
                                            </p>
                                            <h3 className="font-[1000] text-2xl text-white uppercase italic truncate">
                                                {ofertaAtiva.endereco?.bairro}
                                            </h3>
                                        </div>
                                        
                                        <div className="flex gap-3">
                                            <button 
                                                onClick={() => rejeitarOfertaInterna(ofertaAtiva.id)} 
                                                className="
                                                    w-20 
                                                    py-5 
                                                    bg-white/10 
                                                    text-white 
                                                    rounded-[2rem] 
                                                    flex 
                                                    items-center 
                                                    justify-center 
                                                    font-black 
                                                    active:scale-95
                                                "
                                            >
                                                <Lucide.X size={24}/>
                                            </button>
                                            <button 
                                                onClick={aceitarOferta} 
                                                className="
                                                    flex-1 
                                                    py-5 
                                                    bg-white 
                                                    text-[#EA1D2C] 
                                                    rounded-[2rem] 
                                                    font-[1000] 
                                                    uppercase 
                                                    italic 
                                                    text-sm 
                                                    active:scale-95 
                                                    shadow-lg
                                                "
                                            >
                                                ACEITAR AGORA
                                            </button>
                                        </div>
                                    </motion.div>
                                )}

                                {/* RENDER LOOP: Pacotes ativos associados ao ID */}
                                {pedidosAtivos.map(pedidoInstance => {
                                    const isColetadoLogicamente = pedidoInstance.statusLogistica === 'COLETADO_NA_LOJA';
                                    
                                    if (entregador.status !== 'Em Rota') {
                                        // Visualização na Base Operacional
                                        return ( 
                                            <motion.div 
                                                key={pedidoInstance.id} 
                                                className={`
                                                    bg-white 
                                                    rounded-[3rem] 
                                                    shadow-xl 
                                                    p-8 
                                                    border 
                                                    mb-6 
                                                    ${isColetadoLogicamente ? 'border-[#82C91E]' : 'border-slate-100'}
                                                `}
                                            >
                                                <div className="flex justify-between items-center mb-6">
                                                    <div>
                                                        <p className="text-[10px] font-black uppercase text-slate-400">
                                                            REGISTRO #{pedidoInstance.id.slice(-4)}
                                                        </p>
                                                        <h3 className="text-xl font-[1000] text-[#4B0082] uppercase italic mt-1">
                                                            {pedidoInstance.endereco?.bairro}
                                                        </h3>
                                                    </div>
                                                    <p className="text-xl font-[1000] text-red-600 italic">
                                                        R$ {pedidoInstance.valores?.total?.toFixed(2)}
                                                    </p>
                                                </div>
                                                
                                                {!isColetadoLogicamente ? (
                                                    <button 
                                                        onClick={() => marcarPacoteComoColetado(pedidoInstance.id)} 
                                                        className="
                                                            w-full 
                                                            py-5 
                                                            bg-[#4B0082] 
                                                            text-[#82C91E] 
                                                            rounded-[2rem] 
                                                            font-[1000] 
                                                            uppercase 
                                                            text-xs 
                                                            shadow-xl 
                                                            active:scale-95
                                                        "
                                                    >
                                                        SINALIZAR COLETA
                                                    </button> 
                                                ) : (
                                                    <div 
                                                        className="
                                                            w-full 
                                                            py-5 
                                                            bg-[#82C91E]/20 
                                                            text-[#4B0082] 
                                                            rounded-[2rem] 
                                                            font-[1000] 
                                                            uppercase 
                                                            text-xs 
                                                            text-center 
                                                            border-2 
                                                            border-[#82C91E]
                                                        "
                                                    >
                                                        NA MOCHILA
                                                    </div>
                                                )}
                                            </motion.div> 
                                        );
                                    } else {
                                        // Visualização no Mapa/Em Transito
                                        return (
                                            <motion.div 
                                                key={pedidoInstance.id} 
                                                className="
                                                    bg-white 
                                                    rounded-[3.5rem] 
                                                    shadow-2xl 
                                                    p-8 
                                                    mb-6
                                                "
                                            >
                                                <div className="flex justify-between items-start mb-6">
                                                    <span className="text-[10px] font-[1000] text-slate-500 uppercase tracking-widest">
                                                        PACOTE #{pedidoInstance.id.slice(-4)}
                                                    </span>
                                                    
                                                    <div className="text-right">
                                                        <p className="text-[8px] font-black text-slate-400 uppercase">
                                                            PAGAR AO MOTORISTA
                                                        </p>
                                                        <p className="text-2xl font-[1000] text-[#EA1D2C] italic leading-none my-1.5">
                                                            R$ {pedidoInstance.valores?.total?.toFixed(2)}
                                                        </p>
                                                        <span className="text-[8px] font-[1000] uppercase px-2 py-0.5 rounded bg-purple-50 text-[#4B0082]">
                                                            {pedidoInstance.pagamento?.metodo}
                                                        </span>
                                                    </div>
                                                </div>
                                                
                                                <h3 className="text-4xl font-[1000] text-[#4B0082] uppercase tracking-tighter leading-none mb-8">
                                                    {pedidoInstance.cliente?.nome}
                                                </h3>
                                                
                                                <div className="bg-slate-50 rounded-[2rem] p-6 mb-6 flex items-center gap-4">
                                                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border shrink-0">
                                                        <Lucide.MapPin size={20} className="text-[#4B0082]"/>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-[1000] text-[#4B0082] uppercase italic">
                                                            {pedidoInstance.endereco?.rua}, {pedidoInstance.endereco?.numero}
                                                        </p>
                                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                                                            {pedidoInstance.endereco?.bairro}
                                                        </p>
                                                    </div>
                                                </div>
                                                
                                                <div className="grid grid-cols-2 gap-3 mb-8">
                                                    <button 
                                                        onClick={() => window.open(`https://maps.google.com/?q=$$${pedidoInstance.endereco.rua}`)} 
                                                        className="
                                                            bg-white 
                                                            py-4 
                                                            rounded-[1.5rem] 
                                                            border 
                                                            border-slate-200 
                                                            font-[1000] 
                                                            text-[8px] 
                                                            text-slate-500 
                                                            uppercase 
                                                            active:scale-95 
                                                            transition-transform 
                                                            flex 
                                                            flex-col 
                                                            items-center 
                                                            gap-2
                                                        "
                                                    >
                                                        <img src="https://www.gstatic.com/images/branding/product/2x/maps_96dp.png" className="w-6" alt="Maps"/>
                                                        MAPS GERAL
                                                    </button>
                                                    
                                                    <button 
                                                        onClick={() => window.open(`https://waze.com/ul?q=${pedidoInstance.endereco.rua}`)} 
                                                        className="
                                                            bg-white 
                                                            py-4 
                                                            rounded-[1.5rem] 
                                                            border 
                                                            border-slate-200 
                                                            font-[1000] 
                                                            text-[8px] 
                                                            text-slate-500 
                                                            uppercase 
                                                            active:scale-95 
                                                            transition-transform 
                                                            flex 
                                                            flex-col 
                                                            items-center 
                                                            gap-2
                                                        "
                                                    >
                                                        <img src="https://upload.wikimedia.org/wikipedia/commons/6/66/Waze_icon.svg" className="w-6" alt="Waze"/>
                                                        WAZE ROTAS
                                                    </button>
                                                </div>
                                                
                                                {pedidoInstance.statusLogistica !== 'CHEGOU_NO_LOCAL' ? (
                                                    <button 
                                                        onClick={() => marcarChegada(pedidoInstance.id)} 
                                                        className="
                                                            w-full 
                                                            py-5 
                                                            bg-blue-500 
                                                            text-white 
                                                            rounded-[2rem] 
                                                            font-[1000] 
                                                            uppercase 
                                                            text-xs 
                                                            shadow-lg 
                                                            active:scale-95
                                                        "
                                                    >
                                                        MARCAR CHEGADA NA PORTA
                                                    </button> 
                                                ) : (
                                                    <div className="bg-slate-50 p-6 rounded-[2.5rem] border border-slate-200 shadow-inner">
                                                        <input 
                                                            type="number" 
                                                            placeholder="DIGITE O PIN (4)" 
                                                            value={inputCodigo} 
                                                            onChange={e => setInputCodigo(e.target.value)} 
                                                            className="
                                                                w-full 
                                                                h-16 
                                                                bg-white 
                                                                border-2 
                                                                border-[#82C91E] 
                                                                rounded-2xl 
                                                                text-center 
                                                                text-2xl 
                                                                font-[1000] 
                                                                text-[#4B0082] 
                                                                outline-none 
                                                                mb-4 
                                                                tracking-widest
                                                            " 
                                                        />
                                                        <button 
                                                            onClick={() => finalizarComCodigo(pedidoInstance)} 
                                                            className="
                                                                w-full 
                                                                py-5 
                                                                bg-[#82C91E] 
                                                                text-[#4B0082] 
                                                                rounded-2xl 
                                                                font-[1000] 
                                                                uppercase 
                                                                text-xs 
                                                                shadow-xl 
                                                                active:scale-95
                                                            "
                                                        >
                                                            VALIDAR E FINALIZAR
                                                        </button>
                                                    </div>
                                                )}
                                            </motion.div>
                                        );
                                    }
                                })}
                            </AnimatePresence>
                        )}
                    </div>
                )}
                
                {/* ------------------------------------------------------------- */}
                {/* TELA B: HISTÓRICO GERAL DE TRABALHO E CONCLUIDOS              */}
                {/* ------------------------------------------------------------- */}
                {telaAtual === 'HISTORICO' && (
                    <div className="space-y-4">
                        <h2 className="text-2xl font-[1000] text-white uppercase italic tracking-tighter mb-6">
                            Repositório de Missões
                        </h2>
                        
                        {historicoPedidos.length === 0 ? (
                            <p className="text-white/50 text-center text-sm font-bold mt-10 uppercase tracking-widest">
                                O histórico em memória não possui registros.
                            </p> 
                        ) : (
                            historicoPedidos.map(historicoItem => (
                                <div 
                                    key={historicoItem.id} 
                                    className="
                                        bg-white/10 
                                        p-5 
                                        rounded-3xl 
                                        border 
                                        border-white/10 
                                        flex 
                                        justify-between 
                                        items-center 
                                        backdrop-blur-md 
                                        shadow-lg
                                    "
                                >
                                    <div>
                                        <p className="text-[10px] text-[#82C91E] font-black uppercase tracking-widest">
                                            LOTE #{historicoItem.id.slice(-4)} • 
                                            {new Date(historicoItem.horarioConcluido?.toDate()).toLocaleDateString()}
                                        </p>
                                        <p className="text-white font-[1000] uppercase mt-1 text-sm truncate max-w-[150px]">
                                            {historicoItem.endereco?.bairro}
                                        </p>
                                    </div>
                                    <p className="text-[#82C91E] font-[1000] text-xl italic">
                                        +{formatarMoeda(historicoItem.valores?.taxaEntrega || 6)}
                                    </p>
                                </div>
                            ))
                        )}
                    </div>
                )}

                {/* ------------------------------------------------------------- */}
                {/* TELA C: PERFIL E CONFIGURAÇÕES AVANÇADAS DO APLICATIVO        */}
                {/* ------------------------------------------------------------- */}
                {telaAtual === 'PERFIL' && (
                    <div className="space-y-6">
                        
                        {/* Bloco de Perfil Header */}
                        <div 
                            className="
                                bg-white 
                                p-10 
                                rounded-[3rem] 
                                text-center 
                                border 
                                border-slate-100 
                                relative 
                                overflow-hidden 
                                shadow-sm
                            "
                        >
                            <div 
                                className="
                                    w-28 
                                    h-28 
                                    mx-auto 
                                    bg-slate-50 
                                    rounded-[2.5rem] 
                                    border-4 
                                    border-white 
                                    shadow-lg 
                                    overflow-hidden 
                                    mb-6
                                "
                            >
                                <img 
                                    src={entregador.urlPerfil} 
                                    className="w-full h-full object-cover" 
                                    alt="Foto de Identidade"
                                />
                            </div>
                            
                            <h2 className="text-2xl font-[1000] italic uppercase tracking-tighter text-[#4B0082]">
                                {entregador.nome}
                            </h2>
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-2">
                                {entregador.modalidade} Registrada • {entregador.placa}
                            </p>
                        </div>
                        
                        {/* Bloco de Som do App */}
                        <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm">
                            <h2 className="text-lg font-[1000] uppercase text-[#4B0082] italic mb-4">
                                Mixer de Áudio
                            </h2>
                            
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">
                                Seletor de Frequência
                            </p>
                            
                            <select 
                                value={configSom.src} 
                                onChange={e => {
                                    const updateObj = {...configSom, src: e.target.value};
                                    setConfigSom(updateObj);
                                    localStorage.setItem('config_som_radar_v2', JSON.stringify(updateObj));
                                }} 
                                className="
                                    w-full 
                                    bg-slate-50 
                                    p-4 
                                    rounded-2xl 
                                    border 
                                    border-slate-200 
                                    mb-4 
                                    font-bold 
                                    text-[#4B0082] 
                                    outline-none
                                "
                            >
                                <option value="https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3">
                                    Padrão - Radar Clássico
                                </option>
                                <option value="https://assets.mixkit.co/active_storage/sfx/2870/2870-preview.mp3">
                                    Alternativo - Alarme Suave
                                </option>
                                <option value="https://assets.mixkit.co/active_storage/sfx/1003/1003-preview.mp3">
                                    Alternativo - Sino Digital
                                </option>
                            </select>
                            
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">
                                Potência do Som
                            </p>
                            
                            <input 
                                type="range" 
                                min="0.1" 
                                max="1" 
                                step="0.1" 
                                value={configSom.volume} 
                                onChange={e => {
                                    const updateObj = {...configSom, volume: parseFloat(e.target.value)};
                                    setConfigSom(updateObj);
                                    localStorage.setItem('config_som_radar_v2', JSON.stringify(updateObj));
                                }} 
                                className="
                                    w-full 
                                    accent-[#82C91E] 
                                    h-2 
                                    bg-slate-200 
                                    rounded-lg 
                                    mb-6
                                "
                            />
                            
                            <button 
                                onClick={() => {
                                    Haptics.impact({ style: ImpactStyle.Light });
                                    const audioTeste = new Audio(configSom.src);
                                    audioTeste.volume = configSom.volume;
                                    audioTeste.play(); 
                                    setTimeout(() => audioTeste.pause(), 3000);
                                }} 
                                className="
                                    w-full 
                                    py-4 
                                    bg-[#82C91E]/10 
                                    text-[#4B0082] 
                                    rounded-2xl 
                                    font-[1000] 
                                    uppercase 
                                    text-xs 
                                    shadow-sm 
                                    active:scale-95
                                "
                            >
                                Diagnóstico de Áudio
                            </button>
                        </div>
                        
                        {/* Bloco de Configuração Logística Direcional */}
                        <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm">
                            <h2 className="text-lg font-[1000] uppercase text-[#4B0082] italic mb-4">
                                Configuração Setorial
                            </h2>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">
                                Force o algoritmo a filtrar pedidos apenas para a direção configurada.
                            </p>
                            <div className="grid grid-cols-2 gap-3">
                                {['TODOS', 'NORTE', 'SUL', 'LESTE', 'OESTE', 'NORDESTE', 'SUDOESTE', 'NOROESTE', 'SUDESTE'].map(direcaoMap => (
                                    <button 
                                        key={direcaoMap} 
                                        onClick={() => {
                                            setSetorDesejado(direcaoMap);
                                            toast(`Diretriz logística alterada para ${direcaoMap}`, "info");
                                        }} 
                                        className={`
                                            py-4 
                                            rounded-2xl 
                                            font-black 
                                            text-[10px] 
                                            uppercase 
                                            border-2 
                                            transition-colors
                                            ${setorDesejado === direcaoMap ? 'bg-[#4B0082] text-[#82C91E] border-[#4B0082]' : 'bg-slate-50 text-slate-500 border-slate-100'}
                                        `}
                                    >
                                        {direcaoMap}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
                
                {/* ------------------------------------------------------------- */}
                {/* TELA D: CONTABILIDADE FINANCEIRA (CARTEIRA)                   */}
                {/* ------------------------------------------------------------- */}
                {telaAtual === 'CARTEIRA' && ( 
                    <div className="space-y-6">
                        <div className="bg-white p-10 rounded-[3rem] text-center border shadow-sm">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">
                                Saldo Global do Turno
                            </p>
                            <p 
                                className={`
                                    text-5xl 
                                    font-[1000] 
                                    italic 
                                    tracking-tighter 
                                    ${(entregador.saldoLiquido||0) < 0 ? 'text-[#EA1D2C]' : 'text-[#82C91E]'}
                                `}
                            >
                                {formatarMoeda(Math.abs(entregador.saldoLiquido || 0))}
                            </p>
                            <p className="text-xs font-bold text-slate-400 uppercase mt-4">
                                Valores devidos ao restaurante: {formatarMoeda(entregador.debitosLoja || 0)}
                            </p>
                            <p className="text-xs font-bold text-slate-400 uppercase mt-1">
                                Total taxas geradas: {formatarMoeda(entregador.ganhosTaxas || 0)}
                            </p>
                        </div>
                    </div> 
                )}
            </main>

            {/* OVERLAY DE AÇÃO GLOBAL: INICIAR ONDA DE ENTREGAS */}
            {telaAtual === 'RADAR' && entregador.status !== 'Em Rota' && pedidosAtivos.length > 0 && pedidosAtivos.every(p => p.statusLogistica === 'COLETADO_NA_LOJA') && (
                <div 
                    className="
                        fixed 
                        bottom-0 
                        left-0 
                        right-0 
                        p-6 
                        bg-[#3A0066] 
                        pb-[calc(20px+env(safe-area-inset-bottom))] 
                        z-[500] 
                        shadow-[0_-20px_40px_rgba(0,0,0,0.3)]
                    "
                >
                    <button 
                        onClick={iniciarRotaCompleta} 
                        disabled={isCarregandoGlobal}
                        className={`
                            w-full 
                            py-6 
                            rounded-[3rem] 
                            font-[1000] 
                            uppercase 
                            italic 
                            tracking-widest 
                            text-sm 
                            shadow-xl 
                            transition-transform
                            ${isCarregandoGlobal ? 'bg-slate-400 text-slate-700' : 'bg-[#82C91E] text-[#4B0082] active:scale-95'}
                        `}
                    >
                        {isCarregandoGlobal ? 'AGUARDE...' : `INICIAR EXPEDIÇÃO COMPLETA (${pedidosAtivos.length})`}
                    </button>
                </div>
            )}
            
            {/* INJEÇÃO DE MODAIS DE PRIORIDADE ABSOLUTA Z-INDEX */}
            {modalSOS && <ModalSOS onClose={() => setModalSOS(false)} />}
            
            {detalhesPedido && detalhesPedido.requerAssinatura && (
                <div 
                    className="
                        fixed 
                        inset-0 
                        z-[3000] 
                        bg-[#4B0082]/90 
                        backdrop-blur-md 
                        flex 
                        items-center 
                        justify-center 
                        p-6
                    "
                >
                    <AssinaturaPad 
                        onCancel={() => setDetalhesPedido(null)} 
                        onSave={(conteudoBase64) => processarConclusaoEntrega(conteudoBase64, true)} 
                    />
                </div>
            )}
        </div>
    );
};

/**
 * ============================================================================
 * EXPORTAÇÃO PRINCIPAL WRAPPER 
 * Instancia os provedores de Contexto Globais ao redor da aplicação principal.
 * ============================================================================
 */
export default function EntregadorMobileProWrapper() { 
    return (
        <ToastProvider>
            <MainApp />
        </ToastProvider>
    ); 
}