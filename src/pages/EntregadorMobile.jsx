/**
 * ============================================================================
 * UP! ENTREGAS - MOBILE V2.1 (ULTIMATE PRO + GPS FIX)
 * ============================================================================
 */

import React, { useEffect, useState, useRef } from 'react';
import { db } from '../services/firebase'; 
import { collection, query, orderBy, onSnapshot, doc, updateDoc, setDoc, serverTimestamp, getDoc, where, increment, limit } from "firebase/firestore";
import * as Lucide from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Geolocation } from '@capacitor/geolocation';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Device } from '@capacitor/device';
import { Network } from '@capacitor/network';

// ============================================================================
// 1. CONSTANTES E UTILITÁRIOS GERAIS
// ============================================================================
const LOGO_UP = "https://res.cloudinary.com/dbd9x1o02/image/upload/v1775028310/rodrigues_geral/cffexfjiihcqhpoxanyo.png";
const CLOUDINARY_CLOUD_NAME = 'dbd9x1o02'; const CLOUDINARY_UPLOAD_PRESET = 'fc3i8urq'; const WHATSAPP_BASE = '5567999999999';

const formatarMoeda = (v) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v || 0);
const apenasNumeros = (str) => str.replace(/\D/g, '');
const mascaraCPF = (v) => { v = apenasNumeros(v); return v.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "$1.$2.$3-$4").slice(0, 14); };

const uploadToCloudinary = async (fileBase64) => {
    const res = await fetch(fileBase64); const blob = await res.blob();
    const fd = new FormData(); fd.append('file', new File([blob], "comprovante.jpg", { type: "image/jpeg" }));
    fd.append('upload_preset', CLOUDINARY_UPLOAD_PRESET); fd.append('folder', `up_entregas/fotos_fachada`);
    return (await (await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, { method: 'POST', body: fd })).json()).secure_url;
};

// ============================================================================
// 2. COMPONENTES DE UI REUTILIZÁVEIS
// ============================================================================
const CabecalhoTela = ({ titulo, onBack }) => (
    <header className="p-4 flex items-center gap-4 bg-white dark:bg-zinc-900 border-b border-slate-200 dark:border-zinc-800 sticky top-0 z-50">
        <button onClick={onBack} className="p-2 bg-slate-100 dark:bg-zinc-800 rounded-full text-[#4B0082] dark:text-white active:scale-90 transition-transform"><Lucide.ChevronLeft size={24}/></button>
        <h2 className="text-sm font-[1000] uppercase tracking-widest text-[#4B0082] dark:text-white truncate">{titulo}</h2>
    </header>
);

const MenuItem = ({ icone: Icon, titulo, subtitulo, onClick, chevron = true, perigo = false, badge = null }) => (
    <button onClick={onClick} className={`w-full p-5 border-b border-slate-100 dark:border-zinc-800 flex items-center gap-4 active:bg-slate-50 dark:active:bg-zinc-800/50 transition-colors text-left ${perigo ? 'text-red-500' : 'text-slate-800 dark:text-white'}`}>
        {Icon && <Icon size={22} className={perigo ? 'text-red-500' : 'text-slate-400 dark:text-zinc-500'} strokeWidth={2.5}/>}
        <div className="flex-1">
            <p className={`font-black text-xs uppercase flex items-center gap-2 ${perigo ? 'text-red-500' : 'text-slate-800 dark:text-white'}`}>
                {titulo} {badge && <span className="bg-[#82C91E] text-[#4B0082] px-2 py-0.5 rounded-full text-[8px] font-black animate-pulse">{badge}</span>}
            </p>
            {subtitulo && <p className="text-[10px] text-slate-500 dark:text-zinc-400 font-bold mt-0.5">{subtitulo}</p>}
        </div>
        {chevron && <Lucide.ChevronRight size={18} className={perigo ? 'text-red-300' : 'text-slate-300 dark:text-zinc-600'}/>}
    </button>
);

// ============================================================================
// 3. TELAS PROFUNDAS (SUB-TELAS DO MENU "MAIS")
// ============================================================================
const TelaSaudeConta = ({ onBack }) => (
    <motion.div initial={{x: "100%"}} animate={{x: 0}} exit={{x: "100%"}} transition={{type:'tween', duration:0.2}} className="fixed inset-0 z-[200] bg-slate-50 dark:bg-zinc-950 flex flex-col">
        <CabecalhoTela titulo="Saúde da Conta" onBack={onBack} />
        <div className="flex-1 overflow-y-auto p-6">
            <h3 className="text-3xl font-[1000] italic text-center text-[#4B0082] dark:text-white leading-tight mb-3">Sua conta está<br/>muito bem!</h3>
            <p className="text-[11px] text-center text-slate-500 dark:text-zinc-400 font-bold px-4 mb-10">A barra abaixo é atualizada todo dia de acordo com suas ocorrências dos últimos 90 dias.</p>
            <div className="mb-10">
                <div className="w-full h-5 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden relative shadow-inner">
                    <div className="absolute top-0 left-0 h-full w-[95%] bg-gradient-to-r from-green-400 to-[#82C91E] rounded-full"></div>
                    <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full flex items-center justify-center shadow-sm"><Lucide.Check size={8} className="text-green-600"/></div>
                </div>
                <div className="flex justify-between text-[9px] font-black uppercase text-slate-400 mt-3"><span>Desativação</span><span className="text-[#82C91E]">Saudável</span></div>
            </div>
        </div>
    </motion.div>
);

const TelaScore = ({ onBack }) => (
    <motion.div initial={{x: "100%"}} animate={{x: 0}} exit={{x: "100%"}} transition={{type:'tween', duration:0.2}} className="fixed inset-0 z-[200] bg-[#4B0082] dark:bg-zinc-950 flex flex-col">
        <header className="p-4 flex items-center gap-4 text-white sticky top-0 z-50">
            <button onClick={onBack} className="p-2 bg-white/10 rounded-full active:scale-90 transition-transform"><Lucide.ChevronLeft size={24}/></button>
            <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-600 rounded-xl flex items-center justify-center font-[1000] text-xl border-2 border-white/20 shadow-lg">1</div>
            <div><h2 className="text-sm font-[1000] uppercase tracking-widest">Score 1</h2><p className="text-[10px] font-black text-amber-400">|| Pausado</p></div>
        </header>
        <div className="flex-1 overflow-y-auto p-6 bg-slate-50 dark:bg-zinc-950 mt-4 rounded-t-[2.5rem] shadow-[0_-10px_40px_rgba(0,0,0,0.2)]">
            <h3 className="text-xl font-[1000] uppercase italic text-[#4B0082] dark:text-white mb-2 mt-4">Sua performance</h3>
            <div className="bg-white dark:bg-zinc-900 p-5 rounded-3xl border border-slate-200 dark:border-zinc-800 shadow-sm mb-8">
                <div className="flex items-start gap-3">
                    <Lucide.Zap size={20} className="text-[#EA1D2C] shrink-0 mt-0.5"/>
                    <p className="text-xs font-bold text-slate-700 dark:text-zinc-300 leading-relaxed"><span className="font-black text-[#EA1D2C]">Pra subir de Score</span> alcance as metas de todos os indicadores mantendo sua assiduidade.</p>
                </div>
            </div>
        </div>
    </motion.div>
);

const TelaPerfil = ({ onBack, entregador }) => {
    return (
        <motion.div initial={{x: "100%"}} animate={{x: 0}} exit={{x: "100%"}} transition={{type:'tween', duration:0.2}} className="fixed inset-0 z-[200] bg-[#EA1D2C] flex flex-col">
            <header className="p-4 flex items-center justify-between text-white sticky top-0 z-50">
                <button onClick={onBack} className="p-2 bg-white/10 rounded-full active:scale-90 transition-transform"><Lucide.ChevronLeft size={24}/></button>
                <h2 className="text-sm font-[1000] uppercase tracking-widest">Perfil</h2>
                <div className="w-10"></div>
            </header>
            <div className="flex flex-col items-center -mt-4 z-10">
                <img src={entregador.urlPerfil || LOGO_UP} className="w-24 h-24 rounded-full border-4 border-[#EA1D2C] object-cover bg-white shadow-xl z-10" />
            </div>
            <div className="flex-1 bg-slate-50 dark:bg-zinc-950 -mt-12 pt-16 px-5 rounded-t-[3rem] shadow-[0_-10px_40px_rgba(0,0,0,0.2)] overflow-y-auto pb-10">
                <h3 className="text-2xl font-[1000] italic text-center text-[#4B0082] dark:text-white uppercase">{entregador.nome}</h3>
                <p className="text-[10px] font-black text-center text-slate-500 uppercase mt-1 mb-8">Nuvem • Score 1</p>
                <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-slate-200 dark:border-zinc-800 overflow-hidden shadow-sm">
                    <MenuItem titulo="Dados pessoais" subtitulo="Gerencie suas informações pessoais" />
                    <MenuItem titulo="Dados de entrega" subtitulo="Altere a forma de entrega" />
                </div>
            </div>
        </motion.div>
    );
};

const TelaConfiguracoes = ({ onBack, onSair, tema, toggleTema }) => {
    const [abaInterna, setAbaInterna] = useState(null);

    if(abaInterna === 'CANCELAMENTO') {
        return (
            <motion.div initial={{x: "100%"}} animate={{x: 0}} exit={{x: "100%"}} className="fixed inset-0 z-[210] bg-slate-50 dark:bg-zinc-950 flex flex-col">
                <CabecalhoTela titulo="Cancelamento de Conta" onBack={()=>setAbaInterna(null)} />
                <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
                    <div className="w-48 h-48 bg-red-50 dark:bg-red-900/10 rounded-full flex flex-col items-center justify-center mb-8 relative border-8 border-white dark:border-zinc-900 shadow-xl">
                        <Lucide.UserMinus size={80} className="text-red-400 dark:text-red-500 mb-2"/>
                    </div>
                    <h3 className="text-2xl font-[1000] italic text-slate-800 dark:text-white mb-4">Quer mesmo excluir sua conta e seus dados?</h3>
                    <p className="text-xs font-bold text-slate-500 dark:text-zinc-400 px-4 mb-auto">Ao continuar, sua conta será excluída permanentemente.</p>
                    <button onClick={onSair} className="w-full py-5 bg-[#EA1D2C] text-white rounded-[2rem] font-[1000] uppercase text-xs active:scale-95 shadow-lg mt-10">Sim, excluir minha conta e meus dados</button>
                </div>
            </motion.div>
        )
    }

    return (
        <motion.div initial={{x: "100%"}} animate={{x: 0}} exit={{x: "100%"}} transition={{type:'tween', duration:0.2}} className="fixed inset-0 z-[200] bg-slate-50 dark:bg-zinc-950 flex flex-col">
            <CabecalhoTela titulo="Configurações" onBack={onBack} />
            <div className="flex-1 overflow-y-auto p-6">
                <h3 className="text-2xl font-[1000] italic text-[#4B0082] dark:text-white mb-2">Configurações da conta</h3>
                <p className="text-xs font-bold text-slate-500 dark:text-zinc-400 mb-8">Opções pra deixar o app mais seguro e do seu jeito</p>
                <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-slate-200 dark:border-zinc-800 overflow-hidden shadow-sm mb-6">
                    <MenuItem icone={tema === 'dark' ? Lucide.Moon : Lucide.Sun} titulo="Aparência" subtitulo="Escolha entre claro ou escuro" badge="Novo" onClick={toggleTema} chevron={false} />
                    <MenuItem icone={Lucide.LogOut} titulo="Cancelamento de conta" subtitulo="Pra deixar de entregar com a UP!" onClick={()=>setAbaInterna('CANCELAMENTO')} />
                </div>
                <button onClick={onSair} className="w-full py-5 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 text-[#EA1D2C] rounded-[2rem] font-[1000] uppercase text-xs active:scale-95 flex justify-center items-center gap-2"><Lucide.Power size={18}/> Desconectar App</button>
            </div>
        </motion.div>
    );
};

// ============================================================================
// 4. COMPONENTE PRINCIPAL (O MOTOR)
// ============================================================================
export default function EntregadorMobileV21() {
    // --- ESTADOS GLOBAIS ---
    const [tema, setTema] = useState(() => localStorage.getItem('@UP:tema') || 'dark');
    useEffect(() => { const r = window.document.documentElement; tema === 'dark' ? r.classList.add('dark') : r.classList.remove('dark'); localStorage.setItem('@UP:tema', tema); }, [tema]);
    const toggleTema = () => { setTema(p => p === 'dark' ? 'light' : 'dark'); Haptics.impact({ style: ImpactStyle.Light }); };

    const [loading, setLoading] = useState(true); 
    const [processando, setProcessando] = useState(false);
    const [entregador, setEntregador] = useState(null); 
    
    // --- FLUXO DE LOGIN/ONBOARDING ---
    const [modoAuth, setModoAuth] = useState('CPF'); 
    const [formLogin, setFormLogin] = useState({ cpf: '', senha: '' });
    const [onboardingPasso, setOnboardingPasso] = useState(() => localStorage.getItem('@UP:onboarding') ? 2 : 0);

    // --- OPERAÇÃO ---
    const [aba, setAba] = useState('RADAR'); 
    const [subTela, setSubTela] = useState(null); 
    const [isOnline, setIsOnline] = useState(false);
    const [oferta, setOferta] = useState(null); 
    const [mochila, setMochila] = useState([]);
    const [hist, setHist] = useState([]);
    
    // --- SENSORES ---
    const [bateriaBaixa, setBateriaBaixa] = useState(false);
    const [semInternet, setSemInternet] = useState(false);
    const watchRef = useRef(null);
    const audio = useRef(new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3')); 

    // --- CICLO DE VIDA (EFEITOS) ---
    useEffect(() => { 
        const c = localStorage.getItem('@UP:cpf'); 
        if(c) getDoc(doc(db, "entregadores", c)).then(s => { if(s.exists()) setEntregador({id: s.id, ...s.data()}); setLoading(false); }).catch(()=>setLoading(false)); 
        else setLoading(false); 
        
        const checkBat = async () => { const info = await Device.getBatteryInfo(); setBateriaBaixa((info.batteryLevel||1) < 0.15 && !info.isCharging); };
        checkBat(); const intBat = setInterval(checkBat, 60000);
        Network.addListener('networkStatusChange', s => setSemInternet(!s.connected));
        Network.getStatus().then(s => setSemInternet(!s.connected));
        return () => { clearInterval(intBat); Network.removeAllListeners(); };
    }, []);

    useEffect(() => {
        if(!entregador || !isOnline) return;
        const uOf = onSnapshot(query(collection(db, "pedidos"), where("statusDespacho", "==", "OFERTA_INDIVIDUAL"), where("entregadorAtualOferta", "==", entregador.id)), (s) => { 
            if(!s.empty){ setOferta({id: s.docs[0].id, ...s.docs[0].data()}); audio.current.play().catch(()=>{}); Haptics.vibrate(); } else { setOferta(null); audio.current.pause(); audio.current.currentTime=0; } 
        });
        const uMoc = onSnapshot(query(collection(db, "pedidos"), where("entregadorId", "==", entregador.id), where("status", "in", ["A_CAMINHO_LOJA", "SAIU_ENTREGA"])), s => setMochila(s.docs.map(d => ({id: d.id, ...d.data()}))));
        return () => { uOf(); uMoc(); };
    }, [isOnline, entregador]);

    useEffect(() => { if(entregador && aba === 'HISTORICO') return onSnapshot(query(collection(db, "pedidos"), where("entregadorId", "==", entregador.id), where("status", "==", "CONCLUIDO"), orderBy("horarioConcluido", "desc"), limit(30)), s => setHist(s.docs.map(d => ({id: d.id, ...d.data()})))); }, [entregador, aba]);

    useEffect(() => {
        if(isOnline && entregador) Geolocation.requestPermissions().then(() => Geolocation.watchPosition({enableHighAccuracy: true}, p => { if(p) updateDoc(doc(db, "entregadores", entregador.id), { coords: {lat: p.coords.latitude, lng: p.coords.longitude}, ultimaAtualizacao: serverTimestamp() }).catch(()=>{}); }).then(i => watchRef.current = i));
        else if(watchRef.current) Geolocation.clearWatch({id: watchRef.current});
        return () => { if(watchRef.current) Geolocation.clearWatch({id: watchRef.current}); };
    }, [isOnline, entregador]);

    // --- FUNÇÕES DE AÇÃO GLOBAIS ---
    const continuarLogin = (e) => { e.preventDefault(); if(formLogin.cpf.length >= 14) setModoAuth('SENHA'); else alert("CPF incompleto"); };
    
    const logar = async (e) => { 
        e.preventDefault(); setProcessando(true); const c = apenasNumeros(formLogin.cpf); 
        try{ const s = await getDoc(doc(db, "entregadores", c)); 
            if(s.exists() && s.data().senha === formLogin.senha){ setEntregador({id: s.id, ...s.data()}); localStorage.setItem('@UP:cpf', c); setModoAuth('CPF'); setFormLogin({cpf:'',senha:''}); } 
            else { alert("Credenciais erradas."); setModoAuth('CPF'); } 
        } catch(err){} setProcessando(false); 
    };
    
    const sair = () => { localStorage.removeItem('@UP:cpf'); setEntregador(null); setIsOnline(false); setSubTela(null); setAba('RADAR'); };
    const aceitar = async () => { if(!oferta) return; Haptics.impact({style: ImpactStyle.Heavy}); await updateDoc(doc(db, "pedidos", oferta.id), {status: 'A_CAMINHO_LOJA', statusDespacho: 'Atribuído', entregadorId: entregador.id, horarioAceitePiloto: serverTimestamp()}); setOferta(null); };
    const rejeitar = async () => { if(!oferta) return; Haptics.impact({style: ImpactStyle.Light}); await updateDoc(doc(db, "pedidos", oferta.id), {entregadorAtualOferta: "PROXIMO_FILA", tentativas: increment(1)}); setOferta(null); };

    // FUNÇÕES DE PERMISSÕES E NAVEGAÇÃO CORRIGIDAS
    const solicitarLocalizacao = async () => {
        try {
            await Geolocation.requestPermissions();
            setOnboardingPasso(1);
        } catch (e) {
            alert("Você precisa permitir o uso do GPS para receber rotas!");
        }
    };

    const solicitarSobreposicaoEBateria = () => {
        alert("⚠️ Atenção: Para o app funcionar perfeitamente com a tela bloqueada, vá nas configurações do seu celular e autorize 'Sobrepor a outros apps' e remova a 'Otimização de Bateria' para o UP! Entregas.");
        localStorage.setItem('@UP:onboarding', 'true');
        setOnboardingPasso(2);
    };

    const abrirNavegacaoGPS = (endereco) => {
        // CORREÇÃO: Força a abertura do Google Maps via URL Universal com a rota cravada
        const destino = encodeURIComponent(`${endereco.rua}, ${endereco.numero}, ${endereco.bairro}, Campo Grande, MS`);
        const urlMaps = `https://www.google.com/maps/dir/?api=1&destination=${destino}&travelmode=driving`;
        window.open(urlMaps, '_system');
    };

    // ========================================================================
    // RENDER: LOADING & SENSORES GLOBAIS
    // ========================================================================
    if(loading) return <div className={`h-screen ${tema==='dark'?'bg-zinc-950':'bg-slate-50'} flex flex-col items-center justify-center`}><img src={LOGO_UP} className="w-48 mb-8 animate-pulse" /><div className="w-10 h-10 border-4 border-[#82C91E] border-t-transparent rounded-full animate-spin"/></div>;

    return (
        <div className={`${tema} font-['Montserrat']`}>
            <style>{`@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap'); .scrollbar-hide::-webkit-scrollbar { display: none; } .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }`}</style>
            
            <div className="fixed top-0 left-0 right-0 z-[6000]">
                {semInternet && <div className="bg-red-600 text-white text-[10px] font-black uppercase text-center py-1 shadow-md">Sem conexão com a internet</div>}
                {bateriaBaixa && <div className="bg-amber-500 text-white text-[10px] font-black uppercase text-center py-1 shadow-md">Bateria abaixo de 15% - Risco de perda de GPS</div>}
            </div>

            {!entregador ? (
                onboardingPasso < 2 ? (
                    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 text-slate-800 dark:text-white p-6 flex flex-col justify-between transition-colors">
                        <div className="flex-1 flex flex-col items-center justify-center text-center mt-10">
                            <div className="w-48 h-48 bg-white dark:bg-zinc-900 rounded-full flex flex-col items-center justify-center border-8 border-slate-100 dark:border-zinc-800 mb-8 shadow-xl relative">
                                {onboardingPasso === 0 ? <Lucide.MapPin size={70} className="text-blue-500"/> : <Lucide.Copy size={70} className="text-[#EA1D2C]"/>}
                            </div>
                            <h1 className="text-3xl font-[1000] italic mb-4 text-[#4B0082] dark:text-white">{onboardingPasso === 0 ? 'Permita acesso à sua localização exata' : 'Permissões do Sistema'}</h1>
                            <p className="text-xs font-bold text-slate-500 dark:text-zinc-400 mb-4 px-2">
                                {onboardingPasso === 0 ? 'Precisamos do seu GPS exato para traçar rotas e calcular ganhos.' : 'Precisamos que você libere a Sobreposição de Tela e remova a Restrição de Bateria para o mapa funcionar em 2º plano.'}
                            </p>
                        </div>
                        <button onClick={onboardingPasso === 0 ? solicitarLocalizacao : solicitarSobreposicaoEBateria} className="w-full py-5 bg-[#EA1D2C] text-white rounded-[2rem] font-[1000] uppercase text-sm active:scale-95 shadow-lg shadow-red-500/20">
                            {onboardingPasso === 0 ? 'Permitir GPS' : 'Entendi, liberar no Sistema'}
                        </button>
                    </div>
                ) : (
                    <div className="min-h-screen bg-[#4B0082] dark:bg-zinc-950 p-6 flex flex-col justify-between transition-colors relative overflow-hidden">
                        <button onClick={toggleTema} className="absolute top-8 right-8 p-3 rounded-full bg-white/10 text-white z-10"><Lucide.Sun size={20}/></button>
                        
                        <div className="flex-1 flex flex-col justify-center mt-20 z-10">
                            <motion.img layout src={LOGO_UP} className="w-40 mb-12 drop-shadow-2xl" />
                            
                            <AnimatePresence mode="wait">
                                {modoAuth === 'CPF' ? (
                                    <motion.form key="cpf" initial={{opacity:0, x:-50}} animate={{opacity:1, x:0}} exit={{opacity:0, x:50}} onSubmit={continuarLogin} className="w-full bg-white dark:bg-zinc-900 p-8 rounded-[3rem] shadow-2xl">
                                        <h2 className="text-2xl font-[1000] italic text-slate-800 dark:text-white mb-2">Entre na sua conta</h2>
                                        <div className="relative mb-6 mt-6">
                                            <span className="absolute -top-2 left-4 bg-white dark:bg-zinc-900 px-1 text-[9px] font-black uppercase text-slate-400">CPF</span>
                                            <input type="tel" value={formLogin.cpf} onChange={e=>setFormLogin({...formLogin, cpf: mascaraCPF(e.target.value)})} className="w-full h-16 bg-transparent border-2 border-slate-200 dark:border-zinc-800 rounded-2xl px-5 text-xl font-[1000] text-[#4B0082] dark:text-white outline-none focus:border-[#EA1D2C]" placeholder="000.000.000-00"/>
                                        </div>
                                        <button type="submit" className="w-full py-5 bg-[#EA1D2C] text-white rounded-[2rem] font-[1000] uppercase text-sm shadow-xl active:scale-95 transition-all hover:bg-red-700">Continuar</button>
                                    </motion.form>
                                ) : (
                                    <motion.form key="senha" initial={{opacity:0, x:50}} animate={{opacity:1, x:0}} exit={{opacity:0, x:-50}} onSubmit={logar} className="w-full bg-white dark:bg-zinc-900 p-8 rounded-[3rem] shadow-2xl relative">
                                        <button type="button" onClick={()=>setModoAuth('CPF')} className="absolute top-6 right-6 p-2 bg-slate-100 dark:bg-zinc-800 rounded-full text-slate-600 dark:text-zinc-300"><Lucide.X size={18}/></button>
                                        <h2 className="text-2xl font-[1000] italic text-slate-800 dark:text-white mb-2">Digite sua senha</h2>
                                        <div className="relative mb-4 mt-6">
                                            <span className="absolute -top-2 left-4 bg-white dark:bg-zinc-900 px-1 text-[9px] font-black uppercase text-slate-400">Senha</span>
                                            <input type="password" value={formLogin.senha} onChange={e=>setFormLogin({...formLogin, senha: e.target.value})} className="w-full h-16 bg-transparent border-2 border-slate-200 dark:border-zinc-800 rounded-2xl px-5 text-xl font-[1000] text-[#4B0082] dark:text-white outline-none focus:border-[#EA1D2C]" placeholder="••••••••"/>
                                        </div>
                                        <button type="submit" disabled={processando} className="w-full py-5 bg-[#EA1D2C] text-white rounded-[2rem] font-[1000] uppercase text-sm shadow-xl active:scale-95 transition-all flex justify-center items-center gap-2 mt-6">{processando ? <Lucide.Loader2 className="animate-spin"/> : 'Continuar'}</button>
                                    </motion.form>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                )
            ) : (
                <div className="min-h-screen bg-slate-100 dark:bg-[#121212] text-slate-900 dark:text-white transition-colors relative overflow-hidden flex flex-col">
                    
                    {aba === 'RADAR' && (
                        <div className="absolute inset-0 z-0 bg-slate-800 dark:bg-black overflow-hidden opacity-90">
                            <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                                <div className="w-24 h-24 bg-[#EA1D2C]/20 rounded-full animate-ping absolute"></div>
                                <div className="w-8 h-8 bg-[#EA1D2C] rounded-full border-4 border-white z-10 shadow-2xl flex items-center justify-center"><div className="w-2 h-2 bg-white rounded-full"></div></div>
                            </div>
                        </div>
                    )}

                    <header className="p-4 flex justify-between items-center z-50 mt-4 absolute top-0 w-full pointer-events-none">
                        <div className="flex items-center gap-3 bg-zinc-900 text-white p-2 pr-5 rounded-full shadow-2xl pointer-events-auto border border-zinc-800">
                            <img src={entregador.urlPerfil||LOGO_UP} className="w-10 h-10 rounded-full object-cover border-2 border-zinc-700" />
                            <div><p className="text-[10px] font-bold text-zinc-400 leading-none">UP! Entregas</p><p className={`text-xs font-[1000] uppercase italic tracking-widest mt-0.5 ${isOnline?'text-[#82C91E]':'text-white'}`}>{isOnline?'Disponível':'Indisponível'}</p></div>
                        </div>
                        <div className="pointer-events-auto bg-zinc-900 p-1.5 rounded-full shadow-2xl border border-zinc-800">
                            <button onClick={()=>setIsOnline(!isOnline)} className={`w-12 h-12 rounded-full flex flex-col justify-center items-center transition-all ${isOnline?'bg-[#EA1D2C] text-white':'bg-zinc-800 text-zinc-500'}`}><Lucide.Power size={22} strokeWidth={isOnline?3:2}/></button>
                        </div>
                    </header>
                    
                    <main className="flex-1 relative z-10 overflow-y-auto pb-[90px] pt-24 px-4 pointer-events-none">
                        {aba === 'RADAR' && (
                            <div className="h-full flex flex-col justify-end pointer-events-none pb-4">
                                {isOnline && !oferta && mochila.length === 0 && (
                                    <div className="absolute bottom-24 right-0 flex flex-col gap-3 pointer-events-auto items-end">
                                        <button className="px-4 py-3 bg-zinc-900/80 text-red-400 rounded-full flex items-center gap-2 shadow-lg border border-red-900/30 backdrop-blur-md"><Lucide.AlertTriangle size={16}/> <span className="font-black text-[10px] uppercase">SOS</span></button>
                                    </div>
                                )}

                                {isOnline && !oferta && mochila.length === 0 && (
                                    <div className="w-full bg-zinc-900 text-white p-4 rounded-[2rem] shadow-2xl border border-zinc-800 pointer-events-auto flex items-center justify-between mt-auto">
                                        <div className="w-10 h-10 bg-zinc-800 rounded-full flex items-center justify-center"><Lucide.DollarSign size={18} className="text-zinc-400"/></div>
                                        <p className="text-3xl font-[1000] tracking-tighter">R$ {entregador.ganhosTaxas?.toFixed(2).replace('.', ',')}</p>
                                        <button className="w-10 h-10 bg-zinc-800 rounded-full flex items-center justify-center"><Lucide.Eye size={18} className="text-zinc-400"/></button>
                                    </div>
                                )}

                                <AnimatePresence>
                                    {oferta && (
                                        <motion.div initial={{ y: "100%", opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: "100%", opacity: 0 }} transition={{ type: "spring", damping: 25, stiffness: 200 }} 
                                            className="bg-zinc-900 p-6 pb-10 rounded-t-[2.5rem] shadow-[0_-20px_50px_rgba(0,0,0,0.8)] pointer-events-auto absolute bottom-0 left-0 right-0 border-t border-zinc-800 -mx-4 -mb-[90px]">
                                            <div className="flex justify-between items-start mb-6">
                                                <div>
                                                    <span className="bg-[#EA1D2C] text-white px-3 py-1 rounded-full font-black text-[9px] uppercase animate-pulse">Nova Rota</span>
                                                    <h2 className="text-3xl font-[1000] italic text-white uppercase leading-none mt-3">{oferta.endereco?.bairro}</h2>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-1">Ganhos</p>
                                                    <p className="text-3xl font-[1000] text-[#82C91E] italic leading-none">R$ {oferta.valores?.taxaEntrega?.toFixed(2)}</p>
                                                </div>
                                            </div>
                                            
                                            <div className="relative h-[72px] bg-zinc-950 rounded-full p-2 flex items-center mb-4 border border-zinc-800 shadow-inner overflow-hidden">
                                                <motion.div drag="x" dragConstraints={{left:0,right:window.innerWidth - 110}} onDragEnd={(e,i)=>{if(i.point.x > (window.innerWidth / 2)) aceitar();}} className="w-14 h-14 bg-[#EA1D2C] rounded-full flex items-center justify-center text-white z-10 shadow-xl cursor-grab"><Lucide.ArrowRight size={28} strokeWidth={3}/></motion.div>
                                                <p className="absolute w-full text-center text-xs font-[1000] text-zinc-500 uppercase tracking-widest pointer-events-none">Deslize para aceitar</p>
                                            </div>
                                            <button onClick={rejeitar} className="w-full py-4 text-zinc-500 hover:text-zinc-300 transition-colors rounded-full font-black uppercase text-[10px] active:scale-95">Rejeitar Rota</button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                                
                                {mochila.map(p => (
                                    <div key={p.id} className="bg-white dark:bg-zinc-900 rounded-[2.5rem] p-6 shadow-2xl pointer-events-auto mt-4 border border-slate-200 dark:border-zinc-800 relative overflow-hidden">
                                        <div className="absolute top-0 left-0 w-2 h-full bg-[#EA1D2C]"></div>
                                        <div className="flex justify-between items-start mb-6">
                                            <div><p className="text-[10px] font-black text-slate-400 dark:text-zinc-500 uppercase">Pedido</p><p className="text-lg font-[1000] text-slate-800 dark:text-white uppercase">#{p.id.slice(-4)}</p></div>
                                            <div className="text-right"><p className="text-[10px] font-black text-slate-400 dark:text-zinc-500 uppercase">A Pagar</p><p className="text-2xl font-[1000] text-[#EA1D2C] italic">R$ {p.valores?.total?.toFixed(2)}</p></div>
                                        </div>
                                        
                                        <div className="bg-slate-50 dark:bg-zinc-950 p-4 rounded-3xl mb-6 flex justify-between items-center border border-slate-100 dark:border-zinc-800">
                                            <div className="flex gap-4 items-center"><div className="w-12 h-12 rounded-full bg-red-50 dark:bg-red-900/20 flex justify-center items-center shrink-0"><Lucide.MapPin size={20} className="text-[#EA1D2C]" /></div><div><p className="text-sm font-[1000] text-slate-800 dark:text-white truncate max-w-[150px] uppercase">{p.endereco?.rua}, {p.endereco?.numero}</p><p className="text-[10px] font-bold text-slate-500 dark:text-zinc-400 mt-0.5 uppercase">{p.cliente?.nome} • {p.endereco?.bairro}</p></div></div>
                                            {/* CORREÇÃO DO GPS: Abre o Google Maps ou Waze diretamente cravando a rota */}
                                            <button onClick={() => abrirNavegacaoGPS(p.endereco)} className="w-14 h-14 bg-slate-200 dark:bg-zinc-800 text-slate-700 dark:text-white rounded-full flex items-center justify-center active:scale-95 transition-transform"><Lucide.Navigation size={24}/></button>
                                        </div>
                                        
                                        <button className="w-full py-5 bg-[#EA1D2C] text-white rounded-[2rem] font-[1000] uppercase text-sm shadow-xl shadow-red-500/20 active:scale-95 transition-transform">Cheguei no local</button>
                                    </div>
                                ))}
                            </div>
                        )}

                        {aba === 'HISTORICO' && (
                            <div className="space-y-6 pointer-events-auto bg-slate-50 dark:bg-[#121212] p-5 -mx-4 -my-24 pt-32 min-h-screen">
                                <h2 className="text-3xl font-[1000] italic text-[#4B0082] dark:text-white uppercase">Financeiro</h2>
                                {hist.length === 0 ? <p className="text-center text-slate-400 font-bold mt-10">Nenhum ganho registrado.</p> : hist.map(h=>( <div key={h.id} className="bg-white dark:bg-zinc-900 p-5 rounded-3xl border border-slate-200 dark:border-zinc-800 flex justify-between items-center shadow-sm mb-3"><div><p className="text-[10px] font-black text-slate-400 uppercase mb-1">#{h.id.slice(-4)}</p><p className="text-sm font-[1000] text-slate-800 dark:text-white uppercase">{h.endereco?.bairro}</p></div><p className="font-[1000] text-[#82C91E] text-xl italic">+ R$ {h.valores?.taxaEntrega?.toFixed(2)}</p></div>))}
                            </div>
                        )}

                        {aba === 'MAIS' && (
                            <div className="animate-in fade-in pointer-events-auto bg-slate-50 dark:bg-[#121212] p-5 -mx-4 -my-24 pt-32 min-h-screen">
                                <section className="mb-8">
                                    <h3 className="text-xl font-[1000] text-slate-800 dark:text-white mb-1">Acessos rápidos</h3>
                                    <div className="bg-white dark:bg-zinc-900 rounded-[2rem] border border-slate-200 dark:border-zinc-800 overflow-hidden shadow-sm mb-6 mt-4">
                                        <MenuItem icone={Lucide.TrendingUp} titulo="Score" onClick={()=>setSubTela('SCORE')} c="text-purple-500"/>
                                        <MenuItem icone={Lucide.Activity} titulo="Saúde da Conta" onClick={()=>setSubTela('SAUDE_DA_CONTA')} c="text-green-500" chevron={true}/>
                                    </div>
                                    <h4 className="font-[1000] uppercase text-xs mb-3 text-slate-800 dark:text-white flex justify-between items-center">Pra atualizar dados</h4>
                                    <div className="bg-white dark:bg-zinc-900 rounded-[2rem] border border-slate-200 dark:border-zinc-800 overflow-hidden shadow-sm">
                                        <MenuItem icone={Lucide.User} titulo="Perfil" onClick={()=>setSubTela('PERFIL')} />
                                        <MenuItem icone={Lucide.Settings} titulo="Configurações" onClick={()=>setSubTela('CONFIGURACOES')} chevron={true}/>
                                    </div>
                                </section>
                            </div>
                        )}
                    </main>
                    
                    <nav className="absolute bottom-0 left-0 right-0 bg-white dark:bg-zinc-950 border-t border-slate-200 dark:border-zinc-800 px-8 py-3 flex justify-between items-center pb-[calc(0.75rem+env(safe-area-inset-bottom))] z-[100] pointer-events-auto">
                        {[{id:'RADAR',icon:Lucide.Home,l:'Início'}, {id:'HISTORICO',icon:Lucide.ReceiptText,l:'Financeiro'}, {id:'MAIS',icon:Lucide.Menu,l:'Mais'}].map(i => (
                            <button key={i.id} onClick={()=>setAba(i.id)} className="flex flex-col items-center gap-1.5 active:scale-90 transition-transform w-16">
                                <i.icon size={22} className={aba===i.id?'text-slate-800 dark:text-white':'text-slate-400 dark:text-zinc-600'} strokeWidth={aba===i.id?2.5:2}/>
                                <span className={`text-[9px] font-black ${aba===i.id?'text-slate-800 dark:text-white':'text-slate-400 dark:text-zinc-600'}`}>{i.l}</span>
                            </button>
                        ))}
                    </nav>
                    
                    <AnimatePresence>
                        {subTela === 'SAUDE_DA_CONTA' && <TelaSaudeConta onBack={()=>setSubTela(null)} />}
                        {subTela === 'SCORE' && <TelaScore onBack={()=>setSubTela(null)} />}
                        {subTela === 'PERFIL' && <TelaPerfil onBack={()=>setSubTela(null)} entregador={entregador} />}
                        {subTela === 'CONFIGURACOES' && <TelaConfiguracoes onBack={()=>setSubTela(null)} onSair={sair} tema={tema} toggleTema={toggleTema} />}
                    </AnimatePresence>
                </div>
            )}
        </div>
    );
}