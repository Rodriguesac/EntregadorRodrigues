/**
 * ============================================================================
 * UP! ENTREGAS - MOBILE V4.0 (ULTIMATE PRO + BACKGROUND GPS + LEAFLET + HOWLER)
 * ============================================================================
 */

import React, { useEffect, useState, useRef } from 'react';
import { db } from '../services/firebase'; 
import { collection, query, orderBy, onSnapshot, doc, updateDoc, setDoc, serverTimestamp, getDoc, where, increment, limit } from "firebase/firestore";
import * as Lucide from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Device } from '@capacitor/device';
import { Network } from '@capacitor/network';
import { MapContainer, TileLayer, Marker, useMap, Circle } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Howl } from 'howler';
import { registerPlugin } from '@capacitor/core';

// Registro do Plugin de Geolocation em Segundo Plano
const BackgroundGeolocation = registerPlugin('BackgroundGeolocation');

// ============================================================================
// 1. CONFIGURAÇÕES, ÍCONES E SOM
// ============================================================================
const LOGO_UP = "https://res.cloudinary.com/dbd9x1o02/image/upload/v1775028310/rodrigues_geral/cffexfjiihcqhpoxanyo.png";
const CLOUDINARY_CLOUD_NAME = 'dbd9x1o02'; 
const CLOUDINARY_UPLOAD_PRESET = 'fc3i8urq'; 

// Som Profissional de Alerta (Howler)
const somAlertaRota = new Howl({
  src: ['https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3'],
  loop: true,
  volume: 1.0
});

// Configuração do Ícone do Entregador no Mapa
const driverMapIcon = L.divIcon({
    className: 'd-map-icon',
    html: `<div class="w-10 h-10 bg-[#EA1D2C] rounded-full border-4 border-white shadow-2xl flex items-center justify-center animate-pulse">🛵</div>`,
    iconSize: [40, 40],
    iconAnchor: [20, 20]
});

// Utilitários de Formatação
const formatarMoeda = (v) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v || 0);
const apenasNumeros = (str) => str.replace(/\D/g, '');
const mascaraCPF = (v) => { v = apenasNumeros(v); return v.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "$1.$2.$3-$4").slice(0, 14); };
const mascaraTelefone = (v) => { v = apenasNumeros(v); return v.replace(/^(\d{2})(\d)/g, "($1) $2").replace(/(\d{5})(\d)/, "$1-$2").slice(0, 15); };

const uploadToCloudinary = async (fileBase64) => {
    const res = await fetch(fileBase64); const blob = await res.blob();
    const fd = new FormData(); fd.append('file', new File([blob], "comprovante.jpg", { type: "image/jpeg" }));
    fd.append('upload_preset', CLOUDINARY_UPLOAD_PRESET); fd.append('folder', `up_entregas/provas`);
    return (await (await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, { method: 'POST', body: fd })).json()).secure_url;
};

// Componente para atualizar o centro do mapa automaticamente
function MapAutoCenter({ coords }) {
    const map = useMap();
    useEffect(() => { if (coords) map.flyTo([coords.lat, coords.lng], 16); }, [coords, map]);
    return null;
}

// ============================================================================
// 2. COMPONENTE PRINCIPAL
// ============================================================================
export default function EntregadorMobileV4() {
    // --- ESTADOS DE SISTEMA ---
    const [tema, setTema] = useState(() => localStorage.getItem('@UP:tema') || 'dark');
    useEffect(() => { const r = window.document.documentElement; tema === 'dark' ? r.classList.add('dark') : r.classList.remove('dark'); localStorage.setItem('@UP:tema', tema); }, [tema]);
    
    const [loading, setLoading] = useState(true); 
    const [processando, setProcessando] = useState(false);
    const [entregador, setEntregador] = useState(null); 
    const [minhasCoords, setMinhasCoords] = useState(null);
    
    // --- FLUXO DE ACESSO ---
    const [modoAuth, setModoAuth] = useState('CPF'); 
    const [formLogin, setFormLogin] = useState({ cpf: '', senha: '' });
    const [formCadastro, setFormCadastro] = useState({ nome: '', telefone: '', modalidade: 'MOTO', placa: '', senha: '' });

    // --- OPERAÇÃO EM TEMPO REAL ---
    const [aba, setAba] = useState('RADAR'); 
    const [subTela, setSubTela] = useState(null); 
    const [isOnline, setIsOnline] = useState(false);
    const [oferta, setOferta] = useState(null); 
    const [mochila, setMochila] = useState([]);
    const [hist, setHist] = useState([]);
    const [pedidoFinalizando, setPedidoFinalizando] = useState(null);
    const [pinInput, setPinInput] = useState('');

    // --- SENSORES ---
    const [semInternet, setSemInternet] = useState(false);

    // ========================================================================
    // MOTOR DE SINCRONIZAÇÃO (FIREBASE + BACKGROUND GPS)
    // ========================================================================
    useEffect(() => { 
        const cpfSalvo = localStorage.getItem('@UP:cpf'); 
        if (cpfSalvo) {
            const unsub = onSnapshot(doc(db, "entregadores", cpfSalvo), (s) => {
                if (s.exists()) {
                    const dados = s.data();
                    setEntregador({id: s.id, ...dados});
                    if (dados.statusAprovacao !== 'APROVADO') setModoAuth('AGUARDANDO_APROVACAO');
                } else {
                    localStorage.removeItem('@UP:cpf');
                    setEntregador(null);
                }
                setLoading(false);
            });
            return () => unsub();
        } else { setLoading(false); }

        Network.addListener('networkStatusChange', s => setSemInternet(!s.connected));
        return () => { Network.removeAllListeners(); };
    }, []);

    // Monitor de Ofertas e Mochila
    useEffect(() => {
        if(!entregador || entregador.statusAprovacao !== 'APROVADO' || !isOnline) return;
        
        const uOf = onSnapshot(query(collection(db, "pedidos"), where("statusDespacho", "==", "OFERTA_INDIVIDUAL"), where("entregadorAtualOferta", "==", entregador.id)), (s) => { 
            if(!s.empty){ 
                setOferta({id: s.docs[0].id, ...s.docs[0].data()}); 
                somAlertaRota.play(); 
                Haptics.vibrate(); 
            } else { 
                setOferta(null); 
                somAlertaRota.stop(); 
            } 
        });

        const uMoc = onSnapshot(query(collection(db, "pedidos"), where("entregadorId", "==", entregador.id), where("status", "in", ["A_CAMINHO_LOJA", "NA_LOJA", "SAIU_ENTREGA"])), s => setMochila(s.docs.map(d => ({id: d.id, ...d.data()}))));
        
        return () => { uOf(); uMoc(); };
    }, [isOnline, entregador]);

    // INTEGRAÇÃO: BACKGROUND GEOLOCATION (RASTREIO DE FUNDO)
    useEffect(() => {
        if(isOnline && entregador) {
            BackgroundGeolocation.addWatcher({
                backgroundMessage: "A UP! Entregas está rastreando sua posição para novas rotas.",
                backgroundTitle: "Você está Online",
                requestImmediateLocation: true,
                distanceFilter: 10 // Atualiza a cada 10 metros
            }, (location, error) => {
                if (location) {
                    const coords = { lat: location.latitude, lng: location.longitude };
                    setMinhasCoords(coords);
                    updateDoc(doc(db, "entregadores", entregador.id), { 
                        coords: coords, 
                        ultimaAtualizacao: serverTimestamp(),
                        telemetria: { bateria: Math.floor(Math.random() * 100), critica: false } // Simulação
                    });
                }
            });
        }
        return () => { BackgroundGeolocation.removeWatcher(); };
    }, [isOnline, entregador]);

    // ========================================================================
    // LÓGICA DE NEGÓCIO (CADASTRO, LOGIN E FINANCEIRO)
    // ========================================================================
    const checarCpf = async (e) => { 
        e.preventDefault(); 
        const c = apenasNumeros(formLogin.cpf);
        if(c.length !== 11) return alert("CPF Inválido"); 
        setProcessando(true);
        const s = await getDoc(doc(db, "entregadores", c)); 
        setModoAuth(s.exists() ? 'SENHA' : 'CADASTRO');
        setProcessando(false); 
    };

    const realizarCadastro = async (e) => {
        e.preventDefault();
        const c = apenasNumeros(formLogin.cpf);
        setProcessando(true);
        try {
            await setDoc(doc(db, "entregadores", c), {
                cpf: c, 
                nome: formCadastro.nome,
                telefone: formCadastro.telefone,
                senha: formCadastro.senha,
                modalidade: formCadastro.modalidade,
                placa: formCadastro.placa?.toUpperCase() || "",
                status: 'Offline',
                statusAprovacao: 'PENDENTE', 
                dataCadastro: serverTimestamp(), // 🔥 Casamento com PainelEntregadores.jsx
                ganhosTaxas: 0,
                saldoLiquido: 0,
                debitosLoja: 0,
                entregasRealizadas: 0,
                frequenciaRepasse: 'SEMANAL',
                aceitaDinheiro: true,
                temMaquininha: true
            });
            localStorage.setItem('@UP:cpf', c);
            setModoAuth('AGUARDANDO_APROVACAO');
        } catch(err) { alert("Erro ao criar conta."); }
        setProcessando(false);
    };

    const logar = async (e) => {
        e.preventDefault();
        setProcessando(true);
        const c = apenasNumeros(formLogin.cpf);
        const s = await getDoc(doc(db, "entregadores", c));
        if(s.exists() && s.data().senha === formLogin.senha) {
            localStorage.setItem('@UP:cpf', c);
            setEntregador({id: s.id, ...s.data()});
            if(s.data().statusAprovacao !== 'APROVADO') setModoAuth('AGUARDANDO_APROVACAO');
        } else { alert("Senha incorreta."); }
        setProcessando(false);
    };

    const aceitarRota = async () => { 
        Haptics.impact({style: ImpactStyle.Heavy}); 
        await updateDoc(doc(db, "pedidos", oferta.id), { 
            status: 'A_CAMINHO_LOJA', 
            statusDespacho: 'Atribuído', 
            entregadorId: entregador.id, 
            horarioAceitePiloto: serverTimestamp() 
        }); 
        setOferta(null); 
    };

    const finalizarEntrega = async (e) => {
        e.preventDefault();
        if(pedidoFinalizando.codigoEntrega && pinInput !== pedidoFinalizando.codigoEntrega) return alert("PIN Inválido!");
        
        setProcessando(true);
        try {
            const image = await Camera.getPhoto({ quality: 60, resultType: CameraResultType.Uri, source: CameraSource.Camera });
            const urlFoto = await uploadToCloudinary(image.webPath);
            const p = pedidoFinalizando;
            
            await updateDoc(doc(db, "pedidos", p.id), { 
                status: 'CONCLUIDO', 
                horarioConcluido: serverTimestamp(), 
                comprovanteEntrega: urlFoto 
            });
            
            const taxa = p.valores?.taxaEntrega || 0;
            const isDinheiro = p.pagamento?.metodo?.includes('Dinheiro');
            
            let financeiro = { ganhosTaxas: increment(taxa), entregasRealizadas: increment(1), status: 'Livre' };
            if (isDinheiro) { 
                financeiro.saldoLiquido = increment(-( (p.valores?.total || 0) - taxa )); 
                financeiro.debitosLoja = increment( (p.valores?.total || 0) - taxa );
            } else { financeiro.saldoLiquido = increment(taxa); }

            await updateDoc(doc(db, "entregadores", entregador.id), financeiro);
            setPedidoFinalizando(null);
            Haptics.notification({ style: ImpactStyle.Success });
        } catch (err) { alert("Erro ao finalizar."); }
        setProcessando(false);
    };

    // ========================================================================
    // RENDERIZAÇÃO: LOGIN / CADASTRO
    // ========================================================================
    if(loading) return (
        <div className="h-[100dvh] bg-zinc-950 flex flex-col items-center justify-center">
            <img src={LOGO_UP} className="w-40 animate-pulse mb-8" />
            <div className="w-8 h-8 border-4 border-[#82C91E] border-t-transparent rounded-full animate-spin"/>
        </div>
    );

    if(!entregador || modoAuth === 'AGUARDANDO_APROVACAO') {
        return (
            <div className="min-h-[100dvh] bg-[#4B0082] dark:bg-zinc-950 flex flex-col p-6 relative overflow-hidden">
                <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full py-10">
                    <motion.img layout src={LOGO_UP} className="w-32 mb-10 mx-auto drop-shadow-2xl" />
                    <AnimatePresence mode="wait">
                        {modoAuth === 'CPF' && (
                            <motion.form key="cpf" initial={{opacity:0, x:-20}} animate={{opacity:1, x:0}} onSubmit={checarCpf} className="bg-white dark:bg-zinc-900 p-8 rounded-[2.5rem] shadow-2xl">
                                <h2 className="text-2xl font-[1000] italic text-[#4B0082] dark:text-white mb-6 uppercase">Painel do Piloto</h2>
                                <div className="relative mb-6">
                                    <span className="absolute -top-2 left-4 bg-white dark:bg-zinc-900 px-1 text-[9px] font-black text-slate-400 uppercase">Seu CPF</span>
                                    <input type="tel" value={formLogin.cpf} onChange={e=>setFormLogin({...formLogin, cpf: mascaraCPF(e.target.value)})} className="w-full h-16 bg-transparent border-2 border-slate-200 dark:border-zinc-800 rounded-2xl px-5 text-lg font-black text-[#4B0082] dark:text-white outline-none focus:border-[#EA1D2C]" placeholder="000.000.000-00"/>
                                </div>
                                <button type="submit" disabled={processando} className="w-full py-5 bg-[#EA1D2C] text-white rounded-[2rem] font-black uppercase text-sm shadow-xl active:scale-95 transition-all flex justify-center items-center gap-2">
                                    {processando ? <Lucide.Loader2 className="animate-spin"/> : 'Continuar'}
                                </button>
                            </motion.form>
                        )}

                        {modoAuth === 'CADASTRO' && (
                            <motion.form key="cad" initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} onSubmit={realizarCadastro} className="bg-white dark:bg-zinc-900 p-8 rounded-[3rem] shadow-2xl space-y-4">
                                <div className="flex justify-between items-center mb-2">
                                    <h2 className="text-xl font-black text-[#4B0082] dark:text-white uppercase italic">Novo Cadastro</h2>
                                    <button type="button" onClick={()=>setModoAuth('CPF')} className="p-2 text-slate-400"><Lucide.X/></button>
                                </div>
                                <input placeholder="Nome Completo" required className="w-full h-14 bg-slate-50 dark:bg-zinc-800 rounded-xl px-4 text-sm font-bold border-none outline-none dark:text-white" onChange={e=>setFormCadastro({...formCadastro, nome: e.target.value})} />
                                <input placeholder="WhatsApp" type="tel" required className="w-full h-14 bg-slate-50 dark:bg-zinc-800 rounded-xl px-4 text-sm font-bold border-none outline-none dark:text-white" value={formCadastro.telefone} onChange={e=>setFormCadastro({...formCadastro, telefone: mascaraTelefone(e.target.value)})} />
                                <div className="flex gap-2">
                                    <select className="flex-1 h-14 bg-slate-50 dark:bg-zinc-800 rounded-xl px-4 text-xs font-black uppercase dark:text-white" onChange={e=>setFormCadastro({...formCadastro, modalidade: e.target.value})}>
                                        <option value="MOTO">Moto</option><option value="CARRO">Carro</option><option value="BIKE">Bike</option>
                                    </select>
                                    <input placeholder="Placa" className="flex-1 h-14 bg-slate-50 dark:bg-zinc-800 rounded-xl px-4 text-sm font-bold border-none outline-none dark:text-white uppercase" onChange={e=>setFormCadastro({...formCadastro, placa: e.target.value})} />
                                </div>
                                <input placeholder="Crie uma Senha" type="password" required className="w-full h-14 bg-slate-50 dark:bg-zinc-800 rounded-xl px-4 text-sm font-bold border-none outline-none dark:text-white" onChange={e=>setFormCadastro({...formCadastro, senha: e.target.value})} />
                                <button type="submit" disabled={processando} className="w-full py-5 bg-[#82C91E] text-[#4B0082] rounded-[2rem] font-black uppercase text-sm shadow-lg active:scale-95">{processando ? 'Gravando...' : 'Pedir Aprovação'}</button>
                            </motion.form>
                        )}

                        {modoAuth === 'AGUARDANDO_APROVACAO' && (
                            <motion.div initial={{opacity:0}} animate={{opacity:1}} className="bg-white dark:bg-zinc-900 p-10 rounded-[3rem] text-center shadow-2xl">
                                <Lucide.Clock size={50} className="text-amber-500 mx-auto mb-6 animate-spin-slow"/>
                                <h2 className="text-2xl font-black text-[#4B0082] dark:text-white mb-2 uppercase italic">Aguardando Loja</h2>
                                <p className="text-xs font-bold text-slate-400 mb-8">Seu perfil está em análise pela Torre Rodrigues. Você será avisado assim que for liberado.</p>
                                <button onClick={()=>{localStorage.removeItem('@UP:cpf'); setEntregador(null); setModoAuth('CPF');}} className="text-[10px] font-black uppercase text-red-500 underline">Desconectar</button>
                            </motion.div>
                        )}
                        
                        {modoAuth === 'SENHA' && (
                            <motion.form key="pass" initial={{opacity:0, x:20}} animate={{opacity:1, x:0}} onSubmit={logar} className="bg-white dark:bg-zinc-900 p-8 rounded-[2.5rem] shadow-2xl relative">
                                <button type="button" onClick={()=>setModoAuth('CPF')} className="absolute top-6 right-6 text-slate-300"><Lucide.X/></button>
                                <h2 className="text-2xl font-black text-[#4B0082] dark:text-white mb-6 uppercase">Olá, Parceiro!</h2>
                                <input type="password" autoFocus required placeholder="Sua senha secreta" value={formLogin.senha} onChange={e=>setFormLogin({...formLogin, senha: e.target.value})} className="w-full h-16 bg-slate-50 dark:bg-zinc-800 rounded-2xl px-5 text-lg font-black border-none outline-none dark:text-white mb-6" />
                                <button type="submit" disabled={processando} className="w-full py-5 bg-[#EA1D2C] text-white rounded-[2rem] font-black uppercase text-sm shadow-xl active:scale-95">{processando ? 'Entrando...' : 'Acessar Radar'}</button>
                            </motion.form>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        );
    }

    // ========================================================================
    // RENDERIZAÇÃO: ÁREA LOGADA (MAPA + OPERAÇÃO)
    // ========================================================================
    return (
        <div className="flex-1 flex flex-col h-[100dvh] w-full bg-slate-100 dark:bg-black overflow-hidden relative">
            
            {/* MAPA OPERACIONAL LEAFLET */}
            <div className="absolute inset-0 z-0">
                <MapContainer center={[-20.4313, -54.5541]} zoom={15} zoomControl={false} style={{ height: '100%', width: '100%' }}>
                    <TileLayer url={tema === 'dark' ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" : "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"} />
                    {minhasCoords && (
                        <>
                            <Marker position={[minhasCoords.lat, minhasCoords.lng]} icon={driverMapIcon} />
                            <Circle center={[minhasCoords.lat, minhasCoords.lng]} radius={100} pathOptions={{ color: '#EA1D2C', fillColor: '#EA1D2C', fillOpacity: 0.1 }} />
                            <MapAutoCenter coords={minhasCoords} />
                        </>
                    )}
                </MapContainer>
            </div>

            {/* HEADER FLUTUANTE */}
            <header className="p-4 flex justify-between items-center z-50 absolute top-0 w-full pointer-events-none mt-[env(safe-area-inset-top)]">
                <div className="flex items-center gap-3 bg-zinc-900/90 backdrop-blur-md text-white p-2 pr-5 rounded-full shadow-2xl pointer-events-auto border border-zinc-800">
                    <img src={entregador.urlPerfil||LOGO_UP} className="w-10 h-10 rounded-full object-cover border-2 border-[#82C91E]" alt="Perfil"/>
                    <div>
                        <p className={`text-[9px] font-black uppercase tracking-widest ${isOnline ? 'text-[#82C91E]' : 'text-zinc-500'}`}>{isOnline ? 'Disponível' : 'Offline'}</p>
                        <p className="text-xs font-black uppercase italic">{entregador.nome.split(' ')[0]}</p>
                    </div>
                </div>
                <button onClick={() => { setIsOnline(!isOnline); updateDoc(doc(db, "entregadores", entregador.id), { status: !isOnline ? 'Livre' : 'Offline' }); Haptics.impact({style: ImpactStyle.Medium}); }} 
                    className={`w-14 h-14 rounded-full shadow-2xl border-4 pointer-events-auto transition-all flex items-center justify-center ${isOnline ? 'bg-[#EA1D2C] border-white text-white' : 'bg-zinc-800 border-zinc-700 text-zinc-500'}`}>
                    <Lucide.Power size={24} strokeWidth={3}/>
                </button>
            </header>

            {/* ÁREA DE CONTEÚDO (OFFER CARDS) */}
            <main className="flex-1 relative z-10 p-4 pb-28 flex flex-col justify-end pointer-events-none">
                <AnimatePresence>
                    {oferta && (
                        <motion.div initial={{y: 100, opacity: 0}} animate={{y: 0, opacity: 1}} exit={{y: 100}} className="bg-zinc-900/95 backdrop-blur-lg p-6 rounded-[2.5rem] shadow-2xl pointer-events-auto border border-zinc-800 mb-4 max-w-md mx-auto w-full">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <span className="bg-[#EA1D2C] text-white px-3 py-1 rounded-lg font-black text-[9px] uppercase animate-pulse">Nova Chamada</span>
                                    <h2 className="text-2xl font-black text-white uppercase italic mt-2">{oferta.endereco?.bairro || 'Localidade Próxima'}</h2>
                                </div>
                                <div className="text-right">
                                    <p className="text-zinc-500 text-[9px] font-black uppercase">Ganhos</p>
                                    <p className="text-3xl font-black text-[#82C91E] italic leading-none">{formatarMoeda(oferta.valores?.taxaEntrega)}</p>
                                </div>
                            </div>
                            <button onClick={aceitarRota} className="w-full py-5 bg-[#EA1D2C] text-white rounded-[2rem] font-black uppercase italic shadow-xl active:scale-95 flex items-center justify-center gap-3">
                                Aceitar Rota <Lucide.ChevronRight size={20} strokeWidth={4}/>
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>

                {mochila.map(p => (
                    <div key={p.id} className="bg-white dark:bg-zinc-900 p-5 rounded-[2.5rem] shadow-2xl pointer-events-auto border-l-[10px] border-[#EA1D2C] mb-4 max-w-md mx-auto w-full">
                        <div className="flex justify-between items-start mb-4">
                            <div><p className="text-[9px] font-black text-slate-400 uppercase">Carga #{p.id.slice(-4)}</p><p className="text-lg font-black text-[#4B0082] dark:text-white uppercase italic truncate max-w-[150px]">{p.cliente?.nome}</p></div>
                            <div className="text-right">
                                <p className="text-[9px] font-black text-slate-400 uppercase">Total a Cobrar</p>
                                <p className="text-xl font-black text-[#EA1D2C] italic leading-none mt-1">{formatarMoeda(p.valores?.total)}</p>
                            </div>
                        </div>
                        <div className="bg-slate-100 dark:bg-zinc-800 p-4 rounded-3xl flex justify-between items-center mb-6">
                            <div className="min-w-0">
                                <p className="text-xs font-black text-slate-800 dark:text-white uppercase truncate">{p.endereco?.rua}, {p.endereco?.numero}</p>
                                <p className="text-[10px] font-bold text-slate-400 uppercase">{p.endereco?.bairro}</p>
                            </div>
                            <button onClick={() => window.open(`http://googleusercontent.com/maps.google.com/2{encodeURIComponent(p.endereco?.rua)}&travelmode=driving`, '_system')} className="w-12 h-12 bg-[#4B0082] text-[#82C91E] rounded-2xl flex items-center justify-center shrink-0 active:scale-90 transition-transform shadow-lg"><Lucide.Navigation size={20} strokeWidth={3}/></button>
                        </div>
                        <button onClick={() => { if(p.status === 'SAIU_ENTREGA') setPedidoFinalizando(p); else updateDoc(doc(db, "pedidos", p.id), { status: p.status === 'NA_LOJA' ? 'SAIU_ENTREGA' : 'NA_LOJA' }); }} className="w-full py-4 bg-[#EA1D2C] text-white rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl flex items-center justify-center gap-2">
                            {p.status === 'A_CAMINHO_LOJA' ? 'Cheguei na Loja' : p.status === 'NA_LOJA' ? 'Coletar Carga' : 'Finalizar Entrega'}
                        </button>
                    </div>
                ))}
            </main>

            {/* BARRA DE NAVEGAÇÃO INFERIOR */}
            <nav className="absolute bottom-0 left-0 right-0 bg-white dark:bg-zinc-950 border-t border-slate-200 dark:border-zinc-900 px-8 py-4 flex justify-between items-center z-[100] pb-[calc(1rem+env(safe-area-inset-bottom))]">
                {[{id:'RADAR',icon:Lucide.Radar,l:'Radar'}, {id:'HISTORICO',icon:Lucide.ReceiptText,l:'Ganhos'}, {id:'MAIS',icon:Lucide.User,l:'Perfil'}].map(i => (
                    <button key={i.id} onClick={()=>setAba(i.id)} className={`flex flex-col items-center gap-1 transition-all ${aba === i.id ? 'text-[#EA1D2C] scale-110' : 'text-slate-400 dark:text-zinc-600'}`}>
                        <i.icon size={22} strokeWidth={aba === i.id ? 3 : 2} /><span className="text-[8px] font-black uppercase tracking-widest">{i.l}</span>
                    </button>
                ))}
            </nav>

            {/* MODAL DE FINALIZAÇÃO (PIN + CÂMERA) */}
            <AnimatePresence>
                {pedidoFinalizando && (
                    <motion.div initial={{opacity:0, y:50}} animate={{opacity:1, y:0}} exit={{opacity:0, y:50}} className="fixed inset-0 z-[5000] bg-black/80 backdrop-blur-md flex items-end justify-center p-4">
                        <div className="bg-white dark:bg-zinc-900 w-full max-w-md p-8 rounded-t-[3rem] shadow-2xl pb-[calc(2rem+env(safe-area-inset-bottom))] relative">
                            <button onClick={()=>setPedidoFinalizando(null)} className="absolute top-6 right-6 text-slate-400"><Lucide.X size={28}/></button>
                            <Lucide.ShieldCheck size={40} className="text-[#EA1D2C] mb-4"/>
                            <h2 className="text-2xl font-black text-[#4B0082] dark:text-white uppercase italic leading-none mb-2">Finalizar Rota</h2>
                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-6">Confirme o PIN do cliente para abrir a câmera.</p>
                            <form onSubmit={finalizarEntrega} className="space-y-6">
                                <input type="tel" maxLength={4} required value={pinInput} onChange={e=>setPinInput(e.target.value.replace(/\D/g, ''))} className="w-full h-20 bg-slate-50 dark:bg-zinc-800 rounded-[2rem] text-center text-4xl font-black tracking-[0.5em] outline-none dark:text-white border-2 border-slate-100 dark:border-zinc-700" placeholder="0000" />
                                <button type="submit" disabled={processando || pinInput.length < 4} className="w-full py-5 bg-[#EA1D2C] text-white rounded-[2rem] font-black uppercase text-sm shadow-xl active:scale-95 flex items-center justify-center gap-3">
                                    <Lucide.Camera size={20}/> {processando ? 'Processando...' : 'Validar e Fotografar'}
                                </button>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
}