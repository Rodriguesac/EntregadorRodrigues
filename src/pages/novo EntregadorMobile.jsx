import React, { useEffect, useState, useRef, useCallback, createContext, useContext } from 'react';
import { db, auth } from '../services/firebase'; 
import { collection, query, orderBy, onSnapshot, doc, updateDoc, serverTimestamp, setDoc, getDoc, where, increment } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import * as Lucide from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- PLUGINS NATIVOS CAPACITOR ---
import { Geolocation } from '@capacitor/geolocation';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Network } from '@capacitor/network';
import { Device } from '@capacitor/device';

// ============================================================================
// 1. CONFIGURAÇÕES GLOBAIS, GEOFENCING E UTILITÁRIOS
// ============================================================================
const CLOUDINARY_CLOUD_NAME = 'dbd9x1o02'; 
const CLOUDINARY_UPLOAD_PRESET = 'fc3i8urq'; 
const LOGO_APP = 'https://res.cloudinary.com/dbd9x1o02/image/upload/v1774934438/rodrigues_geral/vvrauvi5vxs3ukdqd1qn.png';
const WHATSAPP_SUPORTE = '5567999999999';

// COORDENADAS DA LOJA RODRIGUES (Centro da "Pizza")
const LOJA_COORDS = { lat: -20.4697, lng: -54.6201 }; 

const calcularSetorPizza = (lat, lng) => {
    if (!lat || !lng) return 'CENTRO';
    const dy = lat - LOJA_COORDS.lat;
    const dx = lng - LOJA_COORDS.lng;
    let theta = Math.atan2(dy, dx) * (180 / Math.PI); 
    if (theta < 0) theta += 360;

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
    
    const setor = setores.find(s => (theta >= s.min && theta < s.max) || (s.nome === 'LESTE' && (theta >= 337.5 || theta < 22.5)));
    return setor ? setor.nome : 'CENTRO';
};

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
    
    const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, { method: 'POST', body: formData });
    const data = await res.json();
    if (!data.secure_url) throw new Error("Erro no upload para a nuvem");
    return data.secure_url;
};

const formatarMoeda = (valor) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor || 0);
const formatarCPF = (v) => v.replace(/\D/g, '').replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
const desformatarCPF = (v) => v.replace(/\D/g, '');

// ============================================================================
// 2. CONTEXTOS E HOOKS NATIVOS CAPACITOR
// ============================================================================

const ToastContext = createContext(null);
export const useToast = () => useContext(ToastContext);

const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);
    const addToast = useCallback((msg, type = 'info') => {
        Haptics.impact({ style: type === 'error' ? ImpactStyle.Heavy : ImpactStyle.Light }).catch(()=>{});
        const id = Math.random().toString(36).substr(2, 9);
        setToasts(prev => [...prev, { id, msg, type }]);
        setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 4000);
    }, []);

    return (
        <ToastContext.Provider value={addToast}>
            {children}
            <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[9999] flex flex-col gap-2 w-[90%] max-w-sm pointer-events-none">
                <AnimatePresence>
                    {toasts.map(t => (
                        <motion.div key={t.id} initial={{ opacity: 0, y: -20, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -20, scale: 0.9 }}
                            className={`p-4 rounded-2xl shadow-2xl flex items-center gap-3 text-sm font-black uppercase tracking-wide text-white 
                            ${t.type === 'error' ? 'bg-[#EA1D2C]' : t.type === 'success' ? 'bg-[#82C91E] text-[#4B0082]' : 'bg-slate-800'}`}>
                            {t.type === 'error' && <Lucide.AlertCircle size={24} className="shrink-0" />}
                            {t.type === 'success' && <Lucide.CheckCircle size={24} className="shrink-0" />}
                            {t.type === 'info' && <Lucide.Info size={24} className="shrink-0" />}
                            {t.msg}
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </ToastContext.Provider>
    );
};

// --- HOOK DE BATERIA E REDE NATIVOS ---
const useBatteryLevel = () => {
    const [battery, setBattery] = useState({ level: 100, isCritical: false });
    useEffect(() => {
        const checkBattery = async () => {
            try {
                const info = await Device.getBatteryInfo();
                const lvl = Math.round((info.batteryLevel || 1) * 100);
                setBattery({ level: lvl, isCritical: lvl <= 15 });
            } catch(e){}
        };
        checkBattery();
        const interval = setInterval(checkBattery, 60000);
        return () => clearInterval(interval);
    }, []);
    return battery;
};

const useNetworkStatus = () => {
    const [isOnline, setIsOnline] = useState(true);
    useEffect(() => {
        Network.getStatus().then(s => setIsOnline(s.connected));
        let listener;
        Network.addListener('networkStatusChange', status => { setIsOnline(status.connected); }).then(l => listener = l);
        return () => { if(listener) listener.remove(); };
    }, []);
    return isOnline;
};

// ============================================================================
// 3. COMPONENTES VISUAIS MODULARES
// ============================================================================

const AssinaturaPad = ({ onSave, onCancel }) => {
    const canvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        ctx.strokeStyle = "#4B0082"; ctx.lineWidth = 4; ctx.lineJoin = "round"; ctx.lineCap = "round";
        ctx.fillStyle = "#ffffff"; ctx.fillRect(0, 0, canvas.width, canvas.height);
    }, []);

    const startDrawing = (e) => {
        const { offsetX, offsetY } = getCoordinates(e);
        const ctx = canvasRef.current.getContext("2d");
        ctx.beginPath(); ctx.moveTo(offsetX, offsetY); setIsDrawing(true);
    };

    const draw = (e) => {
        if (!isDrawing) return;
        const { offsetX, offsetY } = getCoordinates(e);
        const ctx = canvasRef.current.getContext("2d");
        ctx.lineTo(offsetX, offsetY); ctx.stroke();
    };

    const stopDrawing = () => setIsDrawing(false);

    const getCoordinates = (e) => {
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        return { offsetX: clientX - rect.left, offsetY: clientY - rect.top };
    };

    const handleClear = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#ffffff"; ctx.fillRect(0, 0, canvas.width, canvas.height);
        Haptics.impact({ style: ImpactStyle.Light });
    };

    return (
        <div className="bg-white p-6 rounded-[2.5rem] shadow-2xl w-full max-w-sm border border-slate-200">
            <div className="flex justify-between items-center mb-4 mt-2"><h3 className="text-base font-black text-[#4B0082] uppercase flex items-center gap-2"><Lucide.PenTool className="text-[#EA1D2C]"/> Assinatura do Cliente</h3></div>
            <div className="w-full border-2 border-dashed border-slate-300 rounded-2xl bg-white overflow-hidden mb-5 touch-none relative shadow-inner">
                <canvas ref={canvasRef} width={300} height={200} className="w-full cursor-crosshair" 
                    onMouseDown={startDrawing} onMouseMove={draw} onMouseUp={stopDrawing} onMouseLeave={stopDrawing} 
                    onTouchStart={startDrawing} onTouchMove={draw} onTouchEnd={stopDrawing}
                />
            </div>
            <div className="flex gap-2 mb-2">
                <button onClick={handleClear} className="flex-1 py-4 bg-slate-100 text-slate-600 rounded-2xl font-black uppercase text-xs hover:bg-slate-200 transition-colors">Limpar</button>
                <button onClick={() => { Haptics.impact({ style: ImpactStyle.Light }); onCancel(); }} className="flex-1 py-4 bg-red-50 text-red-500 rounded-2xl font-black uppercase text-xs hover:bg-red-100 transition-colors">Cancelar</button>
            </div>
            <button onClick={() => { Haptics.impact({ style: ImpactStyle.Heavy }); onSave(canvasRef.current.toDataURL("image/jpeg", 0.8)); }} className="w-full py-4 bg-[#82C91E] text-[#4B0082] rounded-2xl font-black uppercase text-sm shadow-lg hover:brightness-110 active:scale-95 transition-all">Confirmar Assinatura</button>
        </div>
    );
};

const TelaSplash = ({ mensagem }) => (
    <div className="h-screen bg-[#1F0137] flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-[url('https://res.cloudinary.com/dbd9x1o02/image/upload/v1774934438/rodrigues_geral/vvrauvi5vxs3ukdqd1qn.png')] bg-repeat bg-[length:150px_150px]" />
        <motion.img initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.8 }} src={LOGO_APP} className="w-56 h-56 object-contain z-10 drop-shadow-[0_0_30px_rgba(130,201,30,0.4)]" alt="Rodrigues Logo"/>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-12 z-10 flex flex-col items-center">
            <div className="w-10 h-10 border-4 border-[#4B0082] border-t-[#82C91E] rounded-full animate-spin mb-4" />
            <p className="text-[#82C91E] font-black uppercase tracking-widest text-[10px] animate-pulse">{mensagem || 'Iniciando Motor NATIVO...'}</p>
        </motion.div>
    </div>
);

// ============================================================================
// 4. COMPONENTE PRINCIPAL (CONTROLADOR DE ESTADO)
// ============================================================================
const MainApp = () => {
    const toast = useToast();
    const navigate = useNavigate();
    const isNetworkOnline = useNetworkStatus();
    const batteryInfo = useBatteryLevel();
    
    const [entregador, setEntregador] = useState(null);
    const [authModo, setAuthModo] = useState('SPLASH'); 
    const [isCarregandoGlobal, setIsCarregandoGlobal] = useState(false);
    
    const [menuAberto, setMenuAberto] = useState(false);
    const [telaAtual, setTelaAtual] = useState('RADAR'); 
    const [isOnlineApp, setIsOnlineApp] = useState(false);
    
    const [ofertaAtiva, setOfertaAtiva] = useState(null);
    const [tempoAceite, setTempoAceite] = useState(60);
    const [pedidosAtivos, setPedidosAtivos] = useState([]);
    const [setorDesejado, setSetorDesejado] = useState('TODOS');
    
    const [modalSOS, setModalSOS] = useState(null);
    const [detalhesPedido, setDetalhesPedido] = useState(null);
    const [inputCodigo, setInputCodigo] = useState("");
    
    const audioRadarRef = useRef(null);
    const watchPosRef = useRef(null);
    const lastPosUpdateRef = useRef({ time: 0 });

    const [loginCpf, setLoginCpf] = useState('');
    const [loginSenha, setLoginSenha] = useState('');

    // ========================================================================
    // GESTÃO DE ÁUDIO E VOLUME (PERSISTENTE)
    // ========================================================================
    const [configSom, setConfigSom] = useState(() => {
        const saved = localStorage.getItem('config_som_radar');
        return saved ? JSON.parse(saved) : { 
            src: 'https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3', // Som Padrão Clássico
            volume: 1.0 
        };
    });

    useEffect(() => {
        if (!audioRadarRef.current) {
            audioRadarRef.current = new Audio(configSom.src);
            audioRadarRef.current.loop = true;
        } else {
            if (audioRadarRef.current.src !== configSom.src) {
                audioRadarRef.current.src = configSom.src;
            }
        }
        audioRadarRef.current.volume = configSom.volume;
    }, [configSom]);

    useEffect(() => {
        if (authModo === 'SPLASH') setTimeout(() => setAuthModo('WELCOME'), 2500);
    }, [authModo]);

    const testarSomRadar = () => {
        const tempAudio = new Audio(configSom.src);
        tempAudio.volume = configSom.volume;
        tempAudio.play().catch(e => console.log("Bloqueado pelo SO", e));
        setTimeout(() => tempAudio.pause(), 4000);
        Haptics.impact({ style: ImpactStyle.Medium });
    };

    // ========================================================================
    // LÓGICA DE AUTENTICAÇÃO E CADASTRO
    // ========================================================================
    const handleLogin = async (e) => {
        e.preventDefault(); 
        if (!isNetworkOnline) return toast("Sem conexão com a internet.", "error");
        
        const cpfLimpo = desformatarCPF(loginCpf);
        if (cpfLimpo.length !== 11) return toast("CPF inválido.", "error");

        setIsCarregandoGlobal(true);
        try {
            const snap = await getDoc(doc(db, "entregadores", cpfLimpo));
            if (snap.exists() && snap.data().senha === loginSenha) {
                const dados = snap.data();
                setEntregador({ id: snap.id, ...dados });
                Haptics.impact({ style: ImpactStyle.Heavy });
                // Pré-inicializar áudio após gesto do utilizador para evitar bloqueios do OS
                if(audioRadarRef.current) { audioRadarRef.current.play().then(()=> audioRadarRef.current.pause()).catch(e=>e); }
                toast(`Bem-vindo de volta, ${dados.nome.split(' ')[0]}!`, 'success');
            } else { 
                toast("CPF ou senha incorretos.", "error"); 
            }
        } catch (e) { 
            toast("Falha na conexão com os servidores.", "error"); 
        } finally { 
            setIsCarregandoGlobal(false); 
        }
    };

    const handleLogoff = () => {
        if(window.confirm("Deseja realmente sair do aplicativo?")) {
            setEntregador(null); setAuthModo('WELCOME'); setMenuAberto(false);
            if (watchPosRef.current) Geolocation.clearWatch({ id: watchPosRef.current });
        }
    };

    // ========================================================================
    // INTELIGÊNCIA LOGÍSTICA: BATCHING E ONDAS DE DESPACHO
    // ========================================================================
    useEffect(() => {
        if (!entregador || !isOnlineApp || entregador.statusAprovacao !== 'APROVADO') return;

        const qOfertas = query(collection(db, "pedidos"), 
            where("statusDespacho", "==", "OFERTA_INDIVIDUAL"),
            where("entregadorAtualOferta", "==", entregador.id)
        );

        const unsubOfertas = onSnapshot(qOfertas, (snap) => {
            if (!snap.empty) {
                const pedidoEncontrado = { id: snap.docs[0].id, ...snap.docs[0].data() };
                const setorDestino = calcularSetorPizza(pedidoEncontrado.endereco?.lat, pedidoEncontrado.endereco?.lng);
                
                if (setorDesejado !== 'TODOS' && setorDestino !== setorDesejado) {
                    rejeitarOfertaInterna(pedidoEncontrado.id); return;
                }

                setOfertaAtiva(pedidoEncontrado); setTempoAceite(60); 
                
                if (audioRadarRef.current && audioRadarRef.current.paused) {
                    audioRadarRef.current.play().catch(() => {});
                    Haptics.vibrate();
                }
            } else {
                setOfertaAtiva(null);
                if (audioRadarRef.current && !audioRadarRef.current.paused) {
                    audioRadarRef.current.pause(); 
                    audioRadarRef.current.currentTime = 0;
                }
            }
        });

        const qAtivos = query(collection(db, "pedidos"), where("entregadorId", "==", entregador.id), where("status", "in", ['A_CAMINHO_LOJA', 'SAIU_ENTREGA']));

        const unsubAtivos = onSnapshot(qAtivos, (snap) => {
            const pedidosMochila = snap.docs.map(d => ({ id: d.id, ...d.data() }));
            setPedidosAtivos(pedidosMochila);

            if (pedidosMochila.length === 0 && (entregador.status === 'Coletando' || entregador.status === 'Em Rota')) {
                updateDoc(doc(db, "entregadores", entregador.id), { status: 'Livre' });
                setEntregador(prev => ({ ...prev, status: 'Livre' }));
            }
        });

        return () => { unsubOfertas(); unsubAtivos(); };
    }, [entregador?.id, isOnlineApp, setorDesejado, entregador?.status, entregador?.statusAprovacao]);

    useEffect(() => {
        if (!ofertaAtiva) return;
        const timer = setInterval(() => {
            setTempoAceite(prev => {
                if (prev <= 1) { rejeitarOfertaInterna(ofertaAtiva.id); clearInterval(timer); return 0; }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, [ofertaAtiva]);

    const rejeitarOfertaInterna = async (pedidoId) => {
        try {
            await updateDoc(doc(db, "pedidos", pedidoId), { entregadorAtualOferta: "PROXIMO_FILA", tentativas: increment(1) });
            setOfertaAtiva(null);
        } catch (e) {}
    };

    const aceitarOferta = async () => {
        setIsCarregandoGlobal(true);
        try {
            await updateDoc(doc(db, "pedidos", ofertaAtiva.id), { 
                status: 'A_CAMINHO_LOJA', statusDespacho: 'Atribuído', statusLogistica: 'AGUARDANDO_COLETA', 
                entregadorId: entregador.id, entregadorAtualOferta: null, horarioAceitePiloto: serverTimestamp()
            });
            if (entregador.status === 'Livre') {
                await updateDoc(doc(db, "entregadores", entregador.id), { status: 'Coletando' });
                setEntregador(prev => ({ ...prev, status: 'Coletando' }));
            }
            Haptics.impact({ style: ImpactStyle.Heavy });
            setOfertaAtiva(null); 
            toast("Missão aceita! Dirija-se ao balcão para Coleta.", "success");
            if (audioRadarRef.current && !audioRadarRef.current.paused) { audioRadarRef.current.pause(); audioRadarRef.current.currentTime = 0; }
        } catch (e) { 
            toast("Erro: Outro piloto aceitou mais rápido.", "error"); 
        } finally { setIsCarregandoGlobal(false); }
    };

    const marcarPacoteComoColetado = async (pedidoId) => {
        Haptics.impact({ style: ImpactStyle.Light });
        await updateDoc(doc(db, "pedidos", pedidoId), { statusLogistica: 'COLETADO_NA_LOJA' });
    };

    const iniciarRotaCompleta = async () => {
        Haptics.vibrate(); setIsCarregandoGlobal(true);
        try {
            const promessas = pedidosAtivos.map(p => updateDoc(doc(db, "pedidos", p.id), { status: 'SAIU_ENTREGA', statusLogistica: 'EM_TRANSITO' }));
            await Promise.all(promessas);
            await updateDoc(doc(db, "entregadores", entregador.id), { status: 'Em Rota' });
            setEntregador(prev => ({ ...prev, status: 'Em Rota' }));
            toast("Rota Iniciada! Dirija com segurança.", "success");
        } catch (e) { toast("Erro ao iniciar rota.", "error"); } finally { setIsCarregandoGlobal(false); }
    };

    const marcarChegada = async (pedidoId) => {
        Haptics.impact({ style: ImpactStyle.Heavy });
        await updateDoc(doc(db, "pedidos", pedidoId), { statusLogistica: 'CHEGOU_NO_LOCAL', horarioChegadaCliente: serverTimestamp() });
        toast("Cliente notificado da sua chegada!", "success");
    };

    const alternarStatusOperacao = async (ficarOnline) => {
        if (!isNetworkOnline) return toast("Você precisa de internet para ligar o radar.", "error");
        Haptics.impact({ style: ImpactStyle.Medium });

        if (ficarOnline) {
            try {
                const perm = await Geolocation.checkPermissions();
                if (perm.location !== 'granted') await Geolocation.requestPermissions();

                const pos = await Geolocation.getCurrentPosition({ enableHighAccuracy: true });
                setIsOnlineApp(true); 
                await updateDoc(doc(db, "entregadores", entregador.id), { 
                    status: 'Livre', coords: { lat: pos.coords.latitude, lng: pos.coords.longitude }
                }); 
                setEntregador(prev => ({ ...prev, status: 'Livre' }));
                toast("Radar Ativado com sucesso!", "success");
            } catch (err) {
                toast("Ative o GPS do celular para trabalhar.", "error"); 
                setIsOnlineApp(false); 
            }
        } else {
            setIsOnlineApp(false);
            if (watchPosRef.current != null) Geolocation.clearWatch({ id: watchPosRef.current });
            await updateDoc(doc(db, "entregadores", entregador.id), { status: 'Offline' });
            setEntregador(prev => ({ ...prev, status: 'Offline' }));
            toast("Turno encerrado. Radar Desligado.", "info");
        }
    };

    useEffect(() => {
        if (!entregador || !isOnlineApp || !isNetworkOnline) return;
        const startNativeWatch = async () => {
            watchPosRef.current = await Geolocation.watchPosition(
                { enableHighAccuracy: true, timeout: 5000, maximumAge: 10000 },
                async (pos, err) => {
                    if (!pos) return;
                    const now = Date.now();
                    const freq = batteryInfo.isCritical ? 40000 : 15000; 
                    if (now - lastPosUpdateRef.current.time >= freq) {
                        lastPosUpdateRef.current = { time: now };
                        try {
                            await updateDoc(doc(db, "entregadores", entregador.id), {
                                coords: { lat: pos.coords.latitude, lng: pos.coords.longitude },
                                ultimaAtualizacao: serverTimestamp()
                            });
                        } catch (e) { }
                    }
                }
            );
        };
        startNativeWatch();
        return () => { if (watchPosRef.current != null) Geolocation.clearWatch({ id: watchPosRef.current }); };
    }, [isOnlineApp, batteryInfo.isCritical, isNetworkOnline, entregador?.id]);

    const tirarFotoComprovante = async (pedido) => {
        try {
            const image = await Camera.getPhoto({ quality: 70, allowEditing: false, resultType: CameraResultType.DataUrl, source: CameraSource.Camera });
            setDetalhesPedido(pedido); processarConclusaoEntrega(image.dataUrl, false);
        } catch (e) { console.log("Câmera cancelada"); }
    };

    const finalizarComCodigo = (pedido) => {
        if (!inputCodigo || inputCodigo.trim() === "") return toast("Digite o código de 4 dígitos.", "error");
        if (inputCodigo !== pedido.codigoEntrega) return toast("Código incorreto!", "error");
        if (!pedido.requerAssinatura) { tirarFotoComprovante(pedido); } else { setDetalhesPedido(pedido); }
    };

    const processarConclusaoEntrega = async (provaBase64, isAssinatura = false) => {
        setIsCarregandoGlobal(true);
        try {
            toast("Enviando prova para a nuvem...", "info");
            const pastaDestino = isAssinatura ? `entregas/${detalhesPedido.id}/assinaturas` : `entregas/${detalhesPedido.id}/fotos`;
            const urlComprovante = await uploadToCloudinary(provaBase64, pastaDestino);

            const taxa = detalhesPedido.valores?.taxaEntrega || 6.00;
            const valorTotalPedido = detalhesPedido.valores?.total || 0;
            const debitarLoja = ['DINHEIRO', 'MAQUININHA'].includes(detalhesPedido.pagamento?.metodo) ? valorTotalPedido : 0;
            
            const novosGanhos = (entregador.ganhosTaxas || 0) + taxa;
            const novosDebitos = (entregador.debitosLoja || 0) + debitarLoja;
            const novoSaldoLiquido = novosGanhos - novosDebitos;

            await updateDoc(doc(db, "pedidos", detalhesPedido.id), { status: 'CONCLUIDO', provaEntregaUrl: urlComprovante, horarioConcluido: serverTimestamp() });
            
            const proxStatus = pedidosAtivos.length > 1 ? 'Em Rota' : 'Livre';
            await updateDoc(doc(db, "entregadores", entregador.id), { ganhosTaxas: novosGanhos, debitosLoja: novosDebitos, saldoLiquido: novoSaldoLiquido, status: proxStatus });
            
            setEntregador(prev => ({ ...prev, ganhosTaxas: novosGanhos, debitosLoja: novosDebitos, saldoLiquido: novoSaldoLiquido, status: proxStatus }));
            setDetalhesPedido(null); setInputCodigo("");
            Haptics.notification({ type: 'SUCCESS' });
            toast("Entrega Finalizada!", "success");
        } catch (e) { toast("Erro no processamento.", "error"); } finally { setIsCarregandoGlobal(false); }
    };

    if (!entregador) {
        if (authModo === 'SPLASH' || isCarregandoGlobal) return <TelaSplash mensagem={isCarregandoGlobal ? 'Sincronizando com a Nuvem...' : 'Iniciando Motor NATIVO...'} />;
        if (authModo === 'WELCOME') {
            return (
                <div className="h-[100dvh] bg-[#1F0137] flex flex-col items-center justify-end p-8 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-[0.03] bg-[url('https://res.cloudinary.com/dbd9x1o02/image/upload/v1774934438/rodrigues_geral/vvrauvi5vxs3ukdqd1qn.png')] bg-repeat bg-[length:120px_120px]" />
                    <motion.img initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ type: "spring", stiffness: 100 }} src={LOGO_APP} className="w-44 mb-auto mt-20 z-10 drop-shadow-2xl" alt="Logo"/>
                    <motion.div initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="w-full bg-white/10 backdrop-blur-xl p-8 rounded-[3rem] border border-white/10 text-center z-10 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                        <h1 className="text-4xl font-[1000] text-white uppercase italic tracking-tighter mb-2">Rodrigues <span className="text-[#82C91E]">Pilotos</span></h1>
                        <div className="space-y-4 mt-8">
                            <button onClick={() => { Haptics.impact({ style: ImpactStyle.Light }); setAuthModo('LOGIN'); }} className="w-full h-16 bg-[#82C91E] text-[#4B0082] rounded-3xl font-[1000] uppercase text-sm active:scale-95 transition-all shadow-lg hover:brightness-110">Acessar App Nativo</button>
                        </div>
                    </motion.div>
                </div>
            );
        }
        if (authModo === 'LOGIN') {
            return (
                <div className="min-h-screen bg-[#F8FAFC] flex flex-col p-6 relative">
                    <div className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full">
                        <div className="text-center mb-10">
                            <img src={LOGO_APP} className="w-28 mx-auto mb-6 drop-shadow-xl opacity-80" alt="Logo" />
                            <h1 className="text-4xl font-[1000] uppercase italic tracking-tighter text-[#4B0082] mb-2">Acesso Piloto</h1>
                        </div>
                        <form onSubmit={handleLogin} className="space-y-5 bg-white p-8 rounded-[3rem] shadow-2xl border border-slate-100">
                            <div>
                                <label className="text-[10px] font-black uppercase text-slate-400 ml-2 block mb-1">Seu CPF</label>
                                <input type="tel" value={formatarCPF(loginCpf)} onChange={e=>setLoginCpf(e.target.value)} maxLength={14} className="w-full h-16 bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 text-xl font-black text-[#4B0082] outline-none focus:border-[#82C91E] transition-colors text-center tracking-widest"/>
                            </div>
                            <div>
                                <label className="text-[10px] font-black uppercase text-slate-400 ml-2 block mb-1">Senha Nativa</label>
                                <input type="password" value={loginSenha} onChange={e=>setLoginSenha(e.target.value)} className="w-full h-16 bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 text-xl font-black text-[#4B0082] outline-none focus:border-[#82C91E] transition-colors text-center tracking-widest"/>
                            </div>
                            <button type="submit" disabled={isCarregandoGlobal} className="w-full h-16 mt-4 bg-[#4B0082] text-[#82C91E] rounded-3xl font-[1000] uppercase text-sm active:scale-95 transition-all shadow-xl">Ligar Motores Nativos</button>
                        </form>
                    </div>
                </div>
            );
        }
    }

    if (entregador.statusAprovacao === 'PENDENTE') return <TelaAnalise onVoltar={() => { setEntregador(null); setAuthModo('WELCOME'); }} />;

    const todosColetados = pedidosAtivos.length > 0 && pedidosAtivos.every(p => p.statusLogistica === 'COLETADO_NA_LOJA' || p.status === 'SAIU_ENTREGA');
    const isEmRota = entregador.status === 'Em Rota';

    return (
        <div className="min-h-screen bg-[#3A0066] font-sans pb-32 relative overflow-x-hidden pt-[env(safe-area-inset-top)]">

            {/* HEADER SUPERIOR */}
            <header className="bg-white px-5 py-3 sticky top-0 z-[100] shadow-[0_10px_30px_rgba(0,0,0,0.03)] flex justify-between items-center rounded-b-[2.5rem]">
                <div className="flex items-center gap-4">
                    <button onClick={() => setMenuAberto(true)} className="w-12 h-12 bg-slate-50 rounded-[1.2rem] flex items-center justify-center text-[#4B0082] shadow-inner active:scale-95"><Lucide.Menu size={24}/></button>
                    <div>
                        <h1 className="font-[1000] italic text-sm uppercase text-[#4B0082] leading-none">Pilotos App</h1>
                        <p className="text-[8px] font-black text-slate-400 uppercase tracking-[0.2em] mt-1.5 flex items-center gap-1">Bateria: <span className={batteryInfo.isCritical ? 'text-red-500' : 'text-green-500'}>{batteryInfo.level}%</span></p>
                    </div>
                </div>
                <button onClick={() => alternarStatusOperacao(!isOnlineApp)} className={`w-14 h-14 rounded-2xl flex flex-col items-center justify-center gap-0.5 transition-all shadow-md border-2 ${isOnlineApp ? 'bg-[#82C91E] text-[#4B0082] border-[#82C91E]' : 'bg-white text-slate-400 border-slate-200'}`}>
                    <Lucide.Power size={20} strokeWidth={isOnlineApp ? 3 : 2}/><span className="text-[8px] font-black uppercase">{isOnlineApp ? 'ON' : 'OFF'}</span>
                </button>
            </header>

            {/* SIDEBAR (MENU) */}
            <AnimatePresence>
                {menuAberto && (
                    <div className="fixed inset-0 z-[1000] flex">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-[#4B0082]/80 backdrop-blur-md" onClick={() => setMenuAberto(false)} />
                        <motion.div initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }} transition={{ type: 'spring', damping: 25, stiffness: 200 }} className="w-[85%] max-w-[340px] bg-white h-full shadow-2xl flex flex-col rounded-r-[3rem] overflow-hidden relative z-20">
                            <div className="p-8 bg-gradient-to-br from-[#1F0137] to-[#4B0082] text-white relative">
                                <div className="absolute top-4 right-4 opacity-10"><img src={LOGO_APP} className="w-24" alt="Logo"/></div>
                                <div className="w-20 h-20 bg-white/10 rounded-[2rem] mb-5 border-2 border-[#82C91E]/50 overflow-hidden backdrop-blur-sm shadow-inner"><img src={entregador.urlPerfil} className="w-full h-full object-cover" alt="Perfil"/></div>
                                <h2 className="text-2xl font-[1000] uppercase truncate italic tracking-tighter">{entregador.nome}</h2>
                                <p className="text-[10px] font-black uppercase tracking-widest text-[#82C91E] mt-2 flex items-center gap-1.5"><div className={`w-2 h-2 rounded-full ${isOnlineApp ? 'bg-[#82C91E] animate-pulse' : 'bg-red-500'}`} />CPF: {formatarCPF(entregador.id)}</p>
                            </div>
                            <nav className="p-6 flex-1 space-y-3 bg-[#F8FAFC] overflow-y-auto">
                                {[{ id: 'RADAR', icon: Lucide.Radar, label: 'Radar de Operação', color: 'text-blue-500' }, { id: 'CARTEIRA', icon: Lucide.Wallet, label: 'Ledger Financeiro', color: 'text-green-500' }, { id: 'PERFIL', icon: Lucide.Settings, label: 'Logística / Casa', color: 'text-purple-500' }].map(item => (
                                    <button key={item.id} onClick={() => {setTelaAtual(item.id); setMenuAberto(false);}} className={`w-full p-5 flex items-center gap-4 rounded-[2rem] font-[1000] text-xs uppercase tracking-widest transition-all ${telaAtual === item.id ? 'bg-white border-2 border-[#4B0082] text-[#4B0082] shadow-xl' : 'text-slate-500 bg-white border border-transparent hover:bg-slate-50'}`}>
                                        <div className={`p-2 rounded-xl bg-slate-50 ${telaAtual === item.id ? 'text-[#4B0082]' : item.color}`}><item.icon size={20}/></div>{item.label}
                                    </button>
                                ))}
                            </nav>
                            <div className="p-6 bg-white border-t border-slate-100">
                                <button onClick={handleLogoff} className="w-full p-4 flex items-center justify-center gap-3 rounded-2xl font-black text-xs uppercase text-red-500 bg-red-50 hover:bg-red-600 hover:text-white transition-colors shadow-sm"><Lucide.LogOut size={18}/> Encerrar Sessão</button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* MAIN CONTENT */}
            <main className="p-6">
                {telaAtual === 'RADAR' && (
                    <div className="space-y-6">
                        {!isOnlineApp ? (
                            <div className="text-center pt-32 opacity-30">
                                <Lucide.Moon size={100} strokeWidth={1} className="mx-auto mb-6 text-white drop-shadow-lg"/>
                                <h2 className="text-3xl font-[1000] uppercase italic tracking-tighter text-white">Radar Offline</h2>
                            </div>
                        ) : (
                            <AnimatePresence mode="popLayout">
                                {/* OFERTA DO RADAR */}
                                {ofertaAtiva && !isEmRota && (
                                    <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-gradient-to-br from-[#EA1D2C] to-red-900 rounded-[3rem] p-8 shadow-2xl relative overflow-hidden ring-4 ring-red-500/30 mb-6">
                                        <div className="flex justify-between items-start mb-6 relative z-10">
                                            <span className="bg-white text-red-600 px-4 py-2 rounded-full font-[1000] text-[10px] uppercase tracking-widest flex items-center gap-2 shadow-inner"><div className="w-2 h-2 rounded-full bg-red-500 animate-ping" />{tempoAceite}s PARA ACEITAR</span>
                                            <div className="text-right"><p className="text-[9px] font-black text-white/60 uppercase tracking-widest mb-1">Taxa Nativa</p><span className="font-[1000] text-[#82C91E] text-3xl italic tracking-tighter">R$ {ofertaAtiva.valores?.taxaEntrega?.toFixed(2)}</span></div>
                                        </div>
                                        <div className="relative z-10 mb-8 bg-black/20 p-5 rounded-3xl border border-white/10 backdrop-blur-sm">
                                            <p className="text-[9px] font-black text-white/50 uppercase tracking-widest mb-1 flex items-center gap-1.5"><Lucide.MapPin size={12}/> Destino Oculto (Privacidade)</p>
                                            <h3 className="font-[1000] text-2xl text-white uppercase italic tracking-tighter leading-none mb-2">{ofertaAtiva.endereco?.bairro}</h3>
                                        </div>
                                        <div className="flex gap-3 relative z-10">
                                            <button onClick={() => rejeitarOfertaInterna(ofertaAtiva.id)} className="w-20 py-5 bg-white/10 text-white rounded-[2rem] flex items-center justify-center font-black active:scale-95"><Lucide.X size={24}/></button>
                                            <button onClick={aceitarOferta} className="flex-1 py-5 bg-white text-[#EA1D2C] rounded-[2rem] font-[1000] uppercase italic text-sm active:scale-95">ACEITAR MISSÃO</button>
                                        </div>
                                    </motion.div>
                                )}

                                {/* LISTAGEM DE PEDIDOS */}
                                {pedidosAtivos.map(pedido => {
                                    const isColetado = pedido.statusLogistica === 'COLETADO_NA_LOJA';
                                    
                                    if (!isEmRota) {
                                        return (
                                            <motion.div key={pedido.id} initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className={`bg-white rounded-[3rem] shadow-xl p-8 border mb-6 ${isColetado ? 'border-[#82C91E]' : 'border-slate-100'}`}>
                                                <div className="flex justify-between items-center mb-6">
                                                    <div><p className="text-[10px] font-black uppercase text-slate-400 flex items-center gap-1.5"><Lucide.Box size={14}/> PACOTE #{pedido.id.slice(-4).toUpperCase()}</p><h3 className="text-xl font-[1000] text-[#4B0082] uppercase italic mt-1">{pedido.endereco?.bairro}</h3></div>
                                                    <div className="text-right"><p className="text-xl font-[1000] text-red-600 italic">R$ {pedido.valores?.total?.toFixed(2)}</p></div>
                                                </div>
                                                {!isColetado ? (
                                                    <button onClick={() => marcarPacoteComoColetado(pedido.id)} className="w-full py-5 bg-[#4B0082] text-[#82C91E] rounded-[2rem] font-[1000] uppercase text-xs tracking-widest active:scale-95 flex items-center justify-center gap-2">COLETAR NO BALCÃO <Lucide.CheckSquare size={18}/></button>
                                                ) : (
                                                    <div className="w-full py-5 bg-[#82C91E]/20 text-[#4B0082] rounded-[2rem] font-[1000] uppercase text-xs text-center border-2 border-[#82C91E] flex items-center justify-center gap-2"><Lucide.CheckCircle size={18}/> NA MOCHILA</div>
                                                )}
                                            </motion.div>
                                        )
                                    } else {
                                        return (
                                            <motion.div key={pedido.id} initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-[3.5rem] shadow-2xl p-8 mb-6 relative overflow-hidden">
                                                <div className="flex justify-between items-start mb-6">
                                                    <span className="text-[10px] font-[1000] text-slate-500 uppercase tracking-widest flex items-center gap-1"><Lucide.Box size={12}/> PACOTE #{pedido.id.slice(-4).toUpperCase()}</span>
                                                    <div className="text-right">
                                                        <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-0.5">PAGAR AO MOTORISTA</p>
                                                        <p className="text-2xl font-[1000] text-[#EA1D2C] italic leading-none mb-1.5">R$ {pedido.valores?.total?.toFixed(2)}</p>
                                                        <span className="text-[8px] font-[1000] uppercase px-2 py-0.5 rounded-md bg-purple-50 text-[#4B0082] border border-purple-100">{pedido.pagamento?.metodo}</span>
                                                    </div>
                                                </div>
                                                
                                                <h3 className="text-4xl font-[1000] text-[#4B0082] uppercase tracking-tighter leading-none mb-8">{pedido.cliente?.nome}</h3>
                                                
                                                <div className="bg-slate-50 rounded-[2rem] p-6 mb-6 border border-slate-100 flex items-center gap-4">
                                                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border border-slate-200 shrink-0 text-slate-400"><Lucide.MapPin size={20}/></div>
                                                    <div>
                                                        <p className="text-sm font-[1000] text-[#4B0082] uppercase italic leading-tight">{pedido.endereco?.rua}, {pedido.endereco?.numero}</p>
                                                        <p className="text-[10px] font-bold text-slate-400 uppercase mt-1 tracking-widest">{pedido.endereco?.bairro}</p>
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-2 gap-3 mb-8">
                                                    <button onClick={() => window.open(`https://maps.google.com/?q=$$${pedido.endereco.rua}`)} className="bg-white py-4 rounded-[1.5rem] flex flex-col items-center justify-center gap-2 border border-slate-200 active:scale-95 transition-all">
                                                        <img src="https://www.gstatic.com/images/branding/product/2x/maps_96dp.png" className="w-6 h-6" alt="Maps"/>
                                                        <span className="text-[8px] font-[1000] uppercase text-slate-500 tracking-widest">MAPS</span>
                                                    </button>
                                                    <button onClick={() => window.open(`https://waze.com/ul?q=${pedido.endereco.rua}`)} className="bg-white py-4 rounded-[1.5rem] flex flex-col items-center justify-center gap-2 border border-slate-200 active:scale-95 transition-all">
                                                        <img src="https://upload.wikimedia.org/wikipedia/commons/6/66/Waze_icon.svg" className="w-6 h-6" alt="Waze"/>
                                                        <span className="text-[8px] font-[1000] uppercase text-slate-500 tracking-widest">WAZE</span>
                                                    </button>
                                                </div>

                                                {pedido.statusLogistica !== 'CHEGOU_NO_LOCAL' ? (
                                                    <button onClick={() => marcarChegada(pedido.id)} className="w-full py-5 bg-[#3b82f6] text-white rounded-[2rem] font-[1000] uppercase text-xs tracking-widest active:scale-95 flex items-center justify-center gap-2">
                                                        CHEGUEI NO DESTINO <Lucide.MapPin size={16}/>
                                                    </button>
                                                ) : (
                                                    <div className="bg-slate-50 p-6 rounded-[2.5rem] border border-slate-200">
                                                        <div className="flex items-center justify-center gap-2 mb-4"><Lucide.ShieldCheck size={16} className="text-[#82C91E]"/><p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Validação PIN NATIVA</p></div>
                                                        <input type="number" placeholder="PIN" value={inputCodigo} onChange={e => setInputCodigo(e.target.value)} className="w-full h-16 bg-white border-2 border-[#82C91E] rounded-2xl text-center text-2xl font-[1000] text-[#4B0082] outline-none mb-4 tracking-[0.3em] shadow-inner" />
                                                        <button disabled={isCarregandoGlobal} onClick={() => finalizarComCodigo(pedido)} className="w-full py-5 bg-[#82C91E] text-[#4B0082] rounded-2xl font-[1000] uppercase italic text-xs shadow-lg active:scale-95 transition-all mb-4">{isCarregandoGlobal ? 'Câmera Iniciando...' : 'Abrir Câmera e Finalizar'}</button>
                                                    </div>
                                                )}
                                            </motion.div>
                                        )
                                    }
                                })}
                            </AnimatePresence>
                        )}
                    </div>
                )}

                {/* TELA DE PERFIL / CONFIGURAÇÕES GERAIS */}
                {telaAtual === 'PERFIL' && (
                    <div className="space-y-6">
                        <div className="bg-white p-10 rounded-[3rem] text-center border border-slate-100 shadow-sm relative overflow-hidden">
                            <div className="w-28 h-28 mx-auto bg-slate-50 rounded-[2.5rem] border-4 border-white shadow-lg overflow-hidden mb-6 relative z-10"><img src={entregador.urlPerfil} className="w-full h-full object-cover" alt="Avatar"/></div>
                            <h2 className="text-2xl font-[1000] italic uppercase tracking-tighter text-[#4B0082]">{entregador.nome}</h2>
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-2">{entregador.modalidade} • {entregador.placa || 'Sem Placa Registrada'}</p>
                        </div>

                        {/* CONFIGURAÇÃO DE ÁUDIO DO RADAR */}
                        <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm">
                            <h2 className="text-lg font-[1000] uppercase text-[#4B0082] italic mb-4 flex items-center gap-2"><Lucide.Volume2 size={20}/> Configuração de Som</h2>
                            
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Som do Alarme (Radar)</label>
                            <div className="relative mb-6">
                                <select 
                                    value={configSom.src} 
                                    onChange={e => {
                                        const novaConf = { ...configSom, src: e.target.value };
                                        setConfigSom(novaConf);
                                        localStorage.setItem('config_som_radar', JSON.stringify(novaConf));
                                    }} 
                                    className="w-full bg-slate-50 p-4 rounded-2xl border border-slate-100 outline-none focus:border-[#82C91E] font-bold text-[#4B0082] text-sm appearance-none"
                                >
                                    <option value="https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3">Radar Clássico (Padrão)</option>
                                    <option value="https://assets.mixkit.co/active_storage/sfx/2870/2870-preview.mp3">Alarme Suave</option>
                                    <option value="https://assets.mixkit.co/active_storage/sfx/1003/1003-preview.mp3">Sino Digital</option>
                                </select>
                                <Lucide.ChevronDown size={18} className="absolute right-4 top-4 text-slate-400 pointer-events-none" />
                            </div>

                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Volume do Radar ({Math.round(configSom.volume * 100)}%)</label>
                            <input 
                                type="range" min="0.1" max="1" step="0.1" 
                                value={configSom.volume} 
                                onChange={e => {
                                    const novaConf = { ...configSom, volume: parseFloat(e.target.value) };
                                    setConfigSom(novaConf);
                                    localStorage.setItem('config_som_radar', JSON.stringify(novaConf));
                                }} 
                                className="w-full accent-[#82C91E] h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer mb-6"
                            />

                            <button onClick={testarSomRadar} className="w-full py-4 bg-[#82C91E]/10 text-[#4B0082] rounded-2xl font-[1000] uppercase text-xs hover:bg-[#82C91E]/20 transition-colors flex items-center justify-center gap-2">
                                <Lucide.Play size={16}/> Testar Som
                            </button>
                        </div>

                        {/* CONFIGURAÇÃO DE DIREÇÃO */}
                        <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm">
                            <h2 className="text-lg font-[1000] uppercase text-[#4B0082] italic mb-2 flex items-center gap-2"><Lucide.Map size={20}/> Direção pra Casa</h2>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-8 leading-relaxed">Filtre o radar para receber missões para o seu lado.</p>
                            <div className="grid grid-cols-2 gap-3">
                                {['TODOS', 'NORTE', 'SUL', 'LESTE', 'OESTE', 'NORDESTE', 'SUDOESTE', 'NOROESTE', 'SUDESTE'].map(setor => (
                                    <button key={setor} onClick={() => { setSetorDesejado(setor); toast(`Setor ${setor}`, 'info'); }} className={`py-4 rounded-2xl font-black text-[10px] uppercase border-2 transition-all shadow-sm ${setorDesejado === setor ? 'bg-[#4B0082] text-[#82C91E] border-[#4B0082]' : 'bg-slate-50 text-slate-500 border-slate-100'}`}>{setor}</button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
                
                {/* TELA CARTEIRA */}
                {telaAtual === 'CARTEIRA' && (
                    <div className="space-y-6">
                        <div className="bg-white p-10 rounded-[3rem] text-center border border-slate-100 shadow-sm">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Balanço do Turno</p>
                            <p className={`text-5xl font-[1000] italic tracking-tighter ${(entregador.saldoLiquido||0) < 0 ? 'text-[#EA1D2C]' : 'text-[#82C91E]'}`}>{formatarMoeda(Math.abs(entregador.saldoLiquido || 0))}</p>
                        </div>
                    </div>
                )}
            </main>

            {/* BOTÃO GLOBAL INICIAR ROTA */}
            <AnimatePresence>
                {telaAtual === 'RADAR' && !isEmRota && todosColetados && pedidosAtivos.length > 0 && (
                    <motion.div initial={{ y: 100 }} animate={{ y: 0 }} exit={{ y: 100 }} className="fixed bottom-0 left-0 right-0 p-6 bg-[#3A0066] pb-[calc(20px+env(safe-area-inset-bottom))] z-[500] pt-6">
                        <button onClick={iniciarRotaCompleta} disabled={isCarregandoGlobal} className="w-full py-6 bg-[#82C91E] text-[#4B0082] rounded-[3rem] font-[1000] uppercase italic tracking-widest text-sm active:scale-95 flex items-center justify-center gap-3">
                            <Lucide.Rocket size={24}/> INICIAR ROTA
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* MODAL DE ASSINATURA */}
            <AnimatePresence>
                {detalhesPedido && detalhesPedido.requerAssinatura && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[3000] bg-[#4B0082]/90 backdrop-blur-md flex items-center justify-center p-6">
                        <AssinaturaPad onCancel={() => setDetalhesPedido(null)} onSave={(b64) => processarConclusaoEntrega(b64, true)} />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default function EntregadorMobileProWrapper() {
    return <ToastProvider><MainApp /></ToastProvider>;
}