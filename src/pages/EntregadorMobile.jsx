import React, { useEffect, useState, useRef } from 'react';
import { db, auth } from '../services/firebase'; 
import { doc, getDoc, setDoc, updateDoc, onSnapshot, collection, query, where, orderBy, limit, serverTimestamp, addDoc, increment } from "firebase/firestore";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import * as Lucide from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// --- CAPACITOR (HARDWARE REAL) ---
import { Geolocation } from '@capacitor/geolocation';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { App } from '@capacitor/app';

// --- CONFIGURAÇÕES E ASSETS ---
const IMG_WELCOME = "https://res.cloudinary.com/dbd9x1o02/image/upload/v1775159380/rodrigues_geral/fjm4ioufyglqbmmy2gn5.png";
const LOJA_COORDS = [-20.4697, -54.6201]; 
const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dbd9x1o02/image/upload";
const UPLOAD_PRESET = "fc3i8urq";
const SOUND_ALARM = 'https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3';

const iconLoja = L.divIcon({ className: 's-icon', html: `<div class="w-8 h-8 bg-[#4B0082] rounded-lg border-2 border-white flex items-center justify-center shadow-md"><div class="w-2 h-2 bg-[#82C91E] rounded-full"></div></div>`, iconSize: [32, 32] });
const iconEntrega = L.divIcon({ className: 'e-icon', html: `<div class="w-8 h-8 bg-[#EA1D2C] rounded-lg border-2 border-white flex items-center justify-center shadow-md"><div class="w-2 h-2 bg-white rounded-full"></div></div>`, iconSize: [32, 32] });

export default function EntregadorMobile() {
    // --- ESTADOS DO SISTEMA E UI ---
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [secao, setSecao] = useState('LOADING'); 
    const [aba, setAba] = useState('RADAR'); 
    const [menu, setMenu] = useState(false);
    const [loadingMsg, setLoadingMsg] = useState('');
    
    // --- DADOS DO USUÁRIO E FORMULÁRIO ---
    const [userDoc, setUserDoc] = useState(null);
    const [form, setForm] = useState({ cpf: '', nome: '', telefone: '', modalidade: 'MOTO', placa: '', urlPerfil: '', urlCNH: '', senha: '' });
    const [etapaCad, setEtapaCad] = useState(1); 
    
    // --- OPERACIONAL E LOGÍSTICA ---
    const [radar, setRadar] = useState([]);
    const [rota, setRota] = useState([]);
    const [historico, setHistorico] = useState([]);
    const [oferta, setOferta] = useState(null);
    const [timer, setTimer] = useState(30);
    const [chatMsgs, setChatMsgs] = useState([]);
    const [novaMsg, setNovaMsg] = useState('');

    const wakeLockRef = useRef(null);
    const audioAlarmeRef = useRef(null);
    const watchGpsRef = useRef(null);

    const themeBg = isDarkMode ? 'bg-slate-950' : 'bg-slate-50';
    const themeCard = isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200';
    const themeText = isDarkMode ? 'text-white' : 'text-slate-900';

    // ========================================================================
    // 1. MOTOR DE AUTENTICAÇÃO, HARDWARE E SESSÃO
    // ========================================================================
    useEffect(() => {
        audioAlarmeRef.current = new Audio(SOUND_ALARM);
        audioAlarmeRef.current.loop = true;

        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) setIsDarkMode(true);

        let unsubUser = null;
        const requestWakeLock = async () => { try { if ('wakeLock' in navigator) wakeLockRef.current = await navigator.wakeLock.request('screen'); } catch (err) {} };

        const authListener = auth.onAuthStateChanged(user => {
            if (!user) {
                if (unsubUser) unsubUser();
                setUserDoc(null); setSecao('INTRO'); return;
            }
            const cpfLogado = user.email.split('@')[0];
            unsubUser = onSnapshot(doc(db, "entregadores", cpfLogado), snap => {
                if (snap.exists()) {
                    const data = snap.data();
                    setUserDoc({ cpfDoc: cpfLogado, ...data });
                    if (data.statusAprovacao === 'APROVADO') { setSecao('OPERACIONAL'); requestWakeLock(); } 
                    else { setSecao('AGUARDANDO'); }
                } else { setSecao('CADASTRO'); }
            });
        });

        App.addListener('backButton', () => {
            if (rota.length > 0) alert("Finalize a corrida atual antes de sair!");
            else App.exitApp();
        });

        return () => { authListener(); if (unsubUser) unsubUser(); if (wakeLockRef.current) wakeLockRef.current.release(); };
    }, [rota.length]);

    // ========================================================================
    // 2. ESCUTAS DE DADOS OPERACIONAIS E LEILÃO
    // ========================================================================
    useEffect(() => {
        if (secao !== 'OPERACIONAL' || !userDoc) return;

        // Escuta Pedidos do Leilão e Rota Ativa
        const qPedidos = query(collection(db, "pedidos"), where("status", "in", ["BUSCANDO_ENTREGADOR", "A_CAMINHO_LOJA", "AGUARDANDO_COLETA", "SAIU_ENTREGA", "ENTREGADOR_NO_LOCAL"]));
        const unsubPedidos = onSnapshot(qPedidos, snap => {
            const docs = snap.docs.map(d => ({ id: d.id, ...d.data() }));
            
            // Filtra Leilão
            const leilao = docs.filter(p => p.status === 'BUSCANDO_ENTREGADOR' && !p.entregadoresRecusaram?.includes(userDoc.uid));
            if (leilao.length > 0 && userDoc.status === 'Livre' && rota.length === 0) {
                if (!oferta || oferta.id !== leilao[0].id) {
                    setOferta(leilao[0]); setTimer(30);
                    audioAlarmeRef.current?.play().catch(()=>{}); Haptics.vibrate();
                }
            } else if (leilao.length === 0) {
                setOferta(null); audioAlarmeRef.current?.pause();
            }
            
            // Filtra Minha Rota
            setRota(docs.filter(p => p.entregadorId === userDoc.uid));
        });

        // Escuta Chat
        const unsubChat = onSnapshot(query(collection(db, `entregadores/${userDoc.cpfDoc}/mensagens`), orderBy("timestamp", "asc")), snap => {
            setChatMsgs(snap.docs.map(d => ({ id: d.id, ...d.data() })));
        });

        return () => { unsubPedidos(); unsubChat(); };
    }, [secao, userDoc, rota.length, oferta]);

    useEffect(() => {
        if (aba !== 'HISTORICO' || !userDoc) return;
        const qHist = query(collection(db, "pedidos"), where("entregadorId", "==", userDoc.uid), where("status", "==", "CONCLUIDO"), orderBy("horarioConclusao", "desc"), limit(20));
        const unsubHist = onSnapshot(qHist, snap => setHistorico(snap.docs.map(d => ({ id: d.id, ...d.data() }))));
        return () => unsubHist();
    }, [aba, userDoc]);

    useEffect(() => {
        let int;
        if (oferta && timer > 0) int = setInterval(() => setTimer(t => t - 1), 1000);
        else if (timer === 0) { setOferta(null); audioAlarmeRef.current?.pause(); }
        return () => clearInterval(int);
    }, [oferta, timer]);

    // ========================================================================
    // 3. FLUXO INTELIGENTE DE LOGIN E CADASTRO
    // ========================================================================
    const handleCpfChange = async (e) => {
        const cpfDigitado = e.target.value.replace(/\D/g, '');
        setForm({ ...form, cpf: cpfDigitado });
        if (cpfDigitado.length === 11) {
            setLoadingMsg('Verificando credencial...');
            try {
                const docSnap = await getDoc(doc(db, "entregadores", cpfDigitado));
                setSecao(docSnap.exists() ? 'LOGIN' : 'CADASTRO');
            } catch (error) { alert("Erro ao verificar conectividade. Tente novamente."); } 
            finally { setLoadingMsg(''); }
        }
    };

    const processarLogin = async (e) => {
        e.preventDefault(); setLoadingMsg('Verificando credenciais...');
        const cpfL = form.cpf.replace(/\D/g, ''); const email = `${cpfL}@rodrigues.com`;
        try { 
            const docSnap = await getDoc(doc(db, "entregadores", cpfL));
            if (!docSnap.exists()) return alert("Perfil não encontrado.");
            if (docSnap.data().senha !== form.senha) return alert("Senha incorreta!");
            try { await signInWithEmailAndPassword(auth, email, form.senha); } 
            catch (err) {
                if (err.code === 'auth/user-not-found' || err.code === 'auth/invalid-credential') {
                    const cred = await createUserWithEmailAndPassword(auth, email, form.senha);
                    await updateDoc(doc(db, "entregadores", cpfL), { uid: cred.user.uid });
                } else { alert(`Erro na autenticação: ${err.message}`); }
            }
        } catch (error) { alert("Sinal fraco com a central."); } 
        finally { setLoadingMsg(''); }
    };

    const enviarCadastroFinal = async () => {
        setLoadingMsg('Enviando perfil para a Torre...');
        const cpfL = form.cpf.replace(/\D/g, ''); const email = `${cpfL}@rodrigues.com`;
        try {
            await setDoc(doc(db, "entregadores", cpfL), { 
                ...form, email: email, cpf: cpfL, statusAprovacao: 'PENDENTE', 
                status: 'Offline', saldoLiquido: 0, ganhosTaxas: 0, debitosLoja: 0, dataCadastro: serverTimestamp()
            });
            const cred = await createUserWithEmailAndPassword(auth, email, form.senha);
            await updateDoc(doc(db, "entregadores", cpfL), { uid: cred.user.uid });
        } catch (err) { alert(`Falha ao registrar: ${err.message}`); } 
        finally { setLoadingMsg(''); }
    };

    const handleFotoUpload = async (e, campo) => {
        const file = e.target.files[0]; if (!file) return;
        setLoadingMsg('Subindo imagem...');
        const d = new FormData(); d.append("file", file); d.append("upload_preset", UPLOAD_PRESET);
        try {
            const res = await fetch(CLOUDINARY_URL, { method: "POST", body: d });
            const json = await res.json();
            setForm(f => ({ ...f, [campo]: json.secure_url }));
        } catch(err) { alert("Falha ao subir imagem."); } 
        finally { setLoadingMsg(''); }
    };

    // ========================================================================
    // 4. AÇÕES DA OPERAÇÃO (LEILÃO, GPS E FOTO)
    // ========================================================================
    const alternarStatusOperacional = async () => {
        if (!userDoc) return;
        const novoStatus = userDoc.status === 'Offline' ? 'Livre' : 'Offline';
        setLoadingMsg(novoStatus === 'Livre' ? 'Conectando ao Radar...' : 'Saindo do Radar...');
        try {
            if (novoStatus === 'Livre') {
                await Geolocation.requestPermissions();
                const pos = await Geolocation.getCurrentPosition({ enableHighAccuracy: true });
                await updateDoc(doc(db, "entregadores", userDoc.cpfDoc), { status: novoStatus, coords: { lat: pos.coords.latitude, lng: pos.coords.longitude } });
                watchGpsRef.current = await Geolocation.watchPosition({ enableHighAccuracy: true }, (p) => {
                    if (p) updateDoc(doc(db, "entregadores", userDoc.cpfDoc), { coords: { lat: p.coords.latitude, lng: p.coords.longitude } }).catch(()=>{});
                });
                Haptics.impact({ style: ImpactStyle.Heavy });
            } else {
                if (watchGpsRef.current) Geolocation.clearWatch({ id: watchGpsRef.current });
                await updateDoc(doc(db, "entregadores", userDoc.cpfDoc), { status: novoStatus });
                Haptics.impact({ style: ImpactStyle.Light });
            }
        } catch (error) { alert("Falha ao acessar GPS."); } 
        finally { setLoadingMsg(''); }
    };

    const aceitarLeilao = async () => {
        if (!oferta || !userDoc) return;
        setLoadingMsg('Garantindo pacote...');
        try {
            audioAlarmeRef.current?.pause();
            await updateDoc(doc(db, "pedidos", oferta.id), { 
                status: 'A_CAMINHO_LOJA',
                entregadorId: userDoc.uid, 
                nomeEntregador: userDoc.nome.split(' ')[0],
                veiculoEntregador: userDoc.modalidade,
                telefoneEntregador: userDoc.telefone,
                horarioAceite: serverTimestamp() 
            });
            await updateDoc(doc(db, "entregadores", userDoc.cpfDoc), { status: 'Em Rota' });
            setOferta(null); setAba('MINHA_ROTA');
            Haptics.notification({ type: 'SUCCESS' });
        } catch(e) {
            alert('Alguém foi mais rápido e pegou esta corrida!');
            setOferta(null);
        } finally { setLoadingMsg(''); }
    };

    const rejeitarLeilao = async () => {
        if (!oferta) return;
        audioAlarmeRef.current?.pause(); Haptics.impact({ style: ImpactStyle.Light });
        await updateDoc(doc(db, "pedidos", oferta.id), { entregadoresRecusaram: increment(userDoc.uid) }).catch(()=>{});
        setOferta(null);
    };

    const atualizarStatusRota = async (pedido, novoStatus) => {
        setLoadingMsg('Atualizando...');
        try {
            await updateDoc(doc(db, "pedidos", pedido.id), { status: novoStatus });
            Haptics.impact({ style: ImpactStyle.Heavy });
        } catch (e) { alert("Erro de conexão."); } 
        finally { setLoadingMsg(''); }
    };

    const finalizarEntregaComFoto = async (pedido) => {
        setLoadingMsg('Abrindo câmera...');
        try {
            const f = await Camera.getPhoto({ quality: 60, resultType: CameraResultType.DataUrl, source: CameraSource.Camera });
            setLoadingMsg('Finalizando entrega e calculando ganhos...');
            
            // Upload Foto
            const d = new FormData(); d.append("file", f.dataUrl); d.append("upload_preset", UPLOAD_PRESET); d.append("folder", "rodrigues_acai/provas");
            const res = await fetch(CLOUDINARY_URL, { method: "POST", body: d });
            const json = await res.json();
            const urlProva = json.secure_url;

            const taxa = pedido.valores?.taxaEntrega || 0;
            const total = pedido.valores?.total || 0;
            const debito = (pedido.pagamento?.metodo === 'DINHEIRO' || pedido.pagamento?.metodo === 'MAQUININHA') ? total : 0;

            await updateDoc(doc(db, "pedidos", pedido.id), { status: 'CONCLUIDO', provaEntregaUrl: urlProva, horarioConclusao: serverTimestamp() });
            await updateDoc(doc(db, "entregadores", userDoc.cpfDoc), { 
                status: 'Livre', ganhosTaxas: increment(taxa), debitosLoja: increment(debito), saldoLiquido: increment(taxa - debito), totalEntregas: increment(1) 
            });
            
            Haptics.notification({ type: 'SUCCESS' });
        } catch (error) { alert('Falha ao concluir pedido (Câmera ou Upload).'); } 
        finally { setLoadingMsg(''); }
    };

    const enviarMsgChat = async (e) => {
        e.preventDefault(); if (!novaMsg.trim()) return;
        await addDoc(collection(db, `entregadores/${userDoc.cpfDoc}/mensagens`), { texto: novaMsg, remetente: 'PILOTO', timestamp: serverTimestamp() });
        setNovaMsg('');
    };

    // ========================================================================
    // 5. RENDERIZAÇÃO
    // ========================================================================
    const needsCNH = ['MOTO', 'CARRO'].includes(form.modalidade);
    const OverlayDeCarregamento = () => loadingMsg ? (
        <div className="absolute inset-0 z-[9999] bg-black/80 backdrop-blur-md flex flex-col items-center justify-center text-white">
            <Lucide.Loader2 size={40} className="animate-spin text-[#82C91E] mb-4" />
            <p className="font-[1000] uppercase italic tracking-widest text-xs text-center px-6">{loadingMsg}</p>
        </div>
    ) : null;

    return (
        <div className={`h-[100dvh] w-full flex justify-center items-center overflow-hidden font-sans transition-colors ${themeBg}`}>
            
            <div className={`w-full max-w-[450px] h-full flex flex-col relative shadow-2xl overflow-hidden ${isDarkMode ? 'bg-[#1F0137]' : 'bg-white'}`}>
                <OverlayDeCarregamento />

                {/* --- LOADING INICIAL --- */}
                {secao === 'LOADING' && (
                    <div className="flex-1 flex flex-col items-center justify-center text-[#82C91E] gap-4">
                        <div className="w-16 h-16 border-4 border-[#4B0082] border-t-[#82C91E] rounded-full animate-spin"/>
                        <p className="text-[10px] font-black tracking-widest uppercase animate-pulse text-slate-500">Sincronizando Torre...</p>
                    </div>
                )}

                {/* --- TELAS DE AUTH E CADASTRO (MANTIDAS COMO PEDIDO) --- */}
                {['INTRO', 'CHECK_CPF', 'LOGIN', 'AGUARDANDO'].includes(secao) && (
                    <>
                        <img src={IMG_WELCOME} className="absolute inset-0 w-full h-full object-cover object-top opacity-70" alt="bg" />
                        <div className={`absolute bottom-0 w-full h-[60%] bg-gradient-to-t ${isDarkMode ? 'from-[#1F0137] via-[#1F0137]/95' : 'from-white via-white/95'} to-transparent`} />

                        <div className="relative z-10 w-full h-full flex flex-col justify-end p-8 pb-10">
                            <AnimatePresence mode="wait">
                                {secao === 'INTRO' && (
                                    <motion.div key="intro" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="text-center">
                                        <h1 className={`text-5xl font-[1000] italic uppercase tracking-tighter mb-2 drop-shadow-lg ${themeText}`}>PILOTO <span className="text-[#82C91E]">FLASH</span></h1>
                                        <p className="text-[#82C91E] font-bold text-[10px] uppercase tracking-[0.3em] mb-10">Logística Enterprise Rodrigues</p>
                                        <button onClick={() => setSecao('CHECK_CPF')} className="w-full bg-[#82C91E] text-[#4B0082] py-5 rounded-2xl font-[1000] uppercase text-sm tracking-widest shadow-2xl active:scale-95 transition-all flex items-center justify-center gap-2">Iniciar Turno <Lucide.ArrowRight size={18}/></button>
                                    </motion.div>
                                )}

                                {secao === 'CHECK_CPF' && (
                                    <motion.div key="cpf" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                                        <button onClick={() => setSecao('INTRO')} className="absolute -top-12 left-0 text-slate-400 hover:text-[#82C91E]"><Lucide.ArrowLeft size={24}/></button>
                                        <h2 className={`text-3xl font-[1000] uppercase italic mb-2 tracking-tighter ${themeText}`}>Identificação</h2>
                                        <p className="text-xs font-bold text-slate-400 mb-8 uppercase tracking-widest">Digite seu CPF para continuar</p>
                                        <input type="tel" placeholder="SÓ NÚMEROS" maxLength={14} value={form.cpf} onChange={handleCpfChange} className={`w-full p-5 rounded-2xl font-black text-2xl tracking-widest text-center outline-none focus:border-[#82C91E] transition-colors ${isDarkMode ? 'bg-white/10 border-2 border-white/20 text-white placeholder:text-white/30' : 'bg-slate-100 border-2 border-slate-200 text-slate-900 placeholder:text-slate-400'}`} />
                                    </motion.div>
                                )}

                                {secao === 'LOGIN' && (
                                    <motion.div key="login" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                                        <button onClick={() => setSecao('CHECK_CPF')} className="absolute -top-12 left-0 text-slate-400 hover:text-[#82C91E]"><Lucide.ArrowLeft size={24}/></button>
                                        <div className="bg-[#82C91E]/20 border border-[#82C91E]/30 p-4 rounded-2xl mb-6 flex items-center gap-3">
                                            <Lucide.UserCheck className="text-[#82C91E]" size={24}/>
                                            <div>
                                                <p className={`text-[9px] font-black uppercase tracking-widest leading-none ${isDarkMode ? 'text-white/60' : 'text-slate-500'}`}>Perfil Encontrado</p>
                                                <p className={`text-sm font-bold uppercase mt-1 ${themeText}`}>CPF: {form.cpf}</p>
                                            </div>
                                        </div>
                                        <h2 className={`text-3xl font-[1000] uppercase italic mb-6 tracking-tighter ${themeText}`}>Sua Senha</h2>
                                        <form onSubmit={processarLogin} className="space-y-4">
                                            <input type="password" required placeholder="DIGITE SUA SENHA" onChange={e => setForm({...form, senha: e.target.value})} className={`w-full p-5 rounded-2xl font-black text-lg text-center outline-none focus:border-[#82C91E] ${isDarkMode ? 'bg-white/10 border-2 border-white/20 text-white placeholder:text-white/30' : 'bg-slate-100 border-2 border-slate-200 text-slate-900 placeholder:text-slate-400'}`} />
                                            <button type="submit" className="w-full bg-[#82C91E] text-[#4B0082] py-5 rounded-2xl font-[1000] uppercase text-sm tracking-widest shadow-lg active:scale-95 transition-all">Destravar Painel</button>
                                        </form>
                                    </motion.div>
                                )}

                                {secao === 'AGUARDANDO' && (
                                    <motion.div key="aguardando" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className={`text-center border p-8 rounded-3xl backdrop-blur-md shadow-2xl ${isDarkMode ? 'bg-white/10 border-white/20' : 'bg-white border-slate-200'}`}>
                                        <Lucide.ShieldAlert size={60} className="text-[#82C91E] mx-auto mb-6 animate-pulse" />
                                        <h2 className={`text-2xl font-[1000] uppercase italic tracking-tighter ${themeText}`}>Perfil em Análise</h2>
                                        <p className="text-[10px] font-bold text-slate-500 mt-4 uppercase tracking-widest leading-relaxed">Seus dados estão sendo analisados pela Torre de Comando.</p>
                                        <button onClick={() => { auth.signOut(); setSecao('INTRO'); }} className="mt-8 text-[#82C91E] font-black text-[10px] uppercase underline">Sair da Conta</button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </>
                )}

                {/* --- CADASTRO COMPLETO (MANTIDO) --- */}
                {secao === 'CADASTRO' && (
                    <div className={`flex-1 flex flex-col p-6 overflow-y-auto relative z-10 custom-scrollbar ${isDarkMode ? 'bg-[#1F0137]' : 'bg-slate-50'}`}>
                        <div className="relative z-10 w-full my-auto">
                            <button onClick={() => setSecao('CHECK_CPF')} className="text-slate-400 hover:text-[#82C91E] mb-6 flex items-center gap-2 text-xs font-black uppercase tracking-widest"><Lucide.ArrowLeft size={18}/> Cancelar Cadastro</button>
                            <div className="flex gap-2 mb-6">{[1, 2, 3, 4].map(i => <div key={i} className={`h-1.5 flex-1 rounded-full transition-all ${etapaCad >= i ? 'bg-[#82C91E]' : 'bg-slate-300 dark:bg-white/20'}`} />)}</div>

                            <div className={`backdrop-blur-md border p-8 rounded-[2.5rem] shadow-2xl ${isDarkMode ? 'bg-white/10 border-white/20' : 'bg-white border-slate-200'}`}>
                                <h2 className={`text-3xl font-[1000] uppercase italic tracking-tighter mb-1 ${themeText}`}>Passo {etapaCad}</h2>
                                <AnimatePresence mode="wait">
                                    {etapaCad === 1 && (
                                        <motion.div key="e1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4 mt-6">
                                            <p className="text-[10px] font-black text-[#82C91E] uppercase tracking-widest mb-4">Dados Pessoais</p>
                                            <input placeholder="NOME COMPLETO" value={form.nome} onChange={e => setForm({...form, nome: e.target.value.toUpperCase()})} className={`w-full border-2 p-4 rounded-xl font-bold outline-none focus:border-[#82C91E] ${isDarkMode ? 'bg-[#1F0137]/50 border-white/10 text-white placeholder:text-white/40' : 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400'}`} />
                                            <input type="tel" placeholder="WHATSAPP (COM DDD)" value={form.telefone} onChange={e => setForm({...form, telefone: e.target.value})} className={`w-full border-2 p-4 rounded-xl font-bold outline-none focus:border-[#82C91E] ${isDarkMode ? 'bg-[#1F0137]/50 border-white/10 text-white placeholder:text-white/40' : 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400'}`} />
                                            <button disabled={!form.nome || form.telefone.length < 10} onClick={() => setEtapaCad(2)} className="w-full bg-[#82C91E] disabled:opacity-50 text-[#4B0082] py-4 rounded-xl font-black uppercase text-xs tracking-widest mt-4">Próximo Passo</button>
                                        </motion.div>
                                    )}
                                    {etapaCad === 2 && (
                                        <motion.div key="e2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4 mt-6">
                                            <p className="text-[10px] font-black text-[#82C91E] uppercase tracking-widest mb-4">Seu Veículo</p>
                                            <select value={form.modalidade} onChange={e => setForm({...form, modalidade: e.target.value})} className={`w-full border-2 p-4 rounded-xl font-bold outline-none focus:border-[#82C91E] uppercase ${isDarkMode ? 'bg-[#1F0137] border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'}`}>
                                                <option value="MOTO">Moto de Entrega</option><option value="CARRO">Carro</option><option value="BIKE">Bicicleta</option>
                                            </select>
                                            {needsCNH && <input placeholder="PLACA DO VEÍCULO" value={form.placa} onChange={e => setForm({...form, placa: e.target.value.toUpperCase()})} maxLength={8} className={`w-full border-2 p-4 rounded-xl font-bold uppercase outline-none focus:border-[#82C91E] ${isDarkMode ? 'bg-[#1F0137]/50 border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'}`} />}
                                            <div className="flex gap-3 mt-4">
                                                <button onClick={() => setEtapaCad(1)} className="flex-1 bg-slate-300 dark:bg-white/10 text-slate-700 dark:text-white py-4 rounded-xl font-black uppercase text-xs tracking-widest">Voltar</button>
                                                <button disabled={needsCNH && !form.placa} onClick={() => setEtapaCad(3)} className="flex-[2] bg-[#82C91E] disabled:opacity-50 text-[#4B0082] py-4 rounded-xl font-black uppercase text-xs tracking-widest">Avançar</button>
                                            </div>
                                        </motion.div>
                                    )}
                                    {etapaCad === 3 && (
                                        <motion.div key="e3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4 mt-6">
                                            <p className="text-[10px] font-black text-[#82C91E] uppercase tracking-widest mb-4">Envio de Documentos</p>
                                            <div className={`p-5 rounded-2xl border-2 text-center relative overflow-hidden focus-within:border-[#82C91E] ${isDarkMode ? 'bg-[#1F0137]/50 border-white/10' : 'bg-slate-50 border-slate-200'}`}>
                                                <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-3">Foto de Perfil</p>
                                                <input type="file" onChange={e => handleFotoUpload(e, 'urlPerfil')} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                                                {form.urlPerfil ? <img src={form.urlPerfil} className="w-16 h-16 mx-auto rounded-full object-cover border-2 border-[#82C91E]"/> : <div className="w-16 h-16 mx-auto bg-slate-200 dark:bg-white/10 rounded-full flex items-center justify-center text-slate-400"><Lucide.Camera size={24}/></div>}
                                            </div>
                                            {needsCNH && (
                                                <div className={`p-5 rounded-2xl border-2 text-center relative overflow-hidden focus-within:border-[#82C91E] ${isDarkMode ? 'bg-[#1F0137]/50 border-white/10' : 'bg-slate-50 border-slate-200'}`}>
                                                    <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-3">CNH (Motoristas)</p>
                                                    <input type="file" onChange={e => handleFotoUpload(e, 'urlCNH')} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                                                    {form.urlCNH ? <div className="w-16 h-16 mx-auto bg-[#82C91E]/20 rounded-2xl flex items-center justify-center border border-[#82C91E]"><Lucide.CheckCircle size={32} className="text-[#82C91E]"/></div> : <div className="w-16 h-16 mx-auto bg-slate-200 dark:bg-white/10 rounded-2xl flex items-center justify-center text-slate-400"><Lucide.IdCard size={32}/></div>}
                                                </div>
                                            )}
                                            <div className="flex gap-3 mt-4">
                                                <button onClick={() => setEtapaCad(2)} className="flex-1 bg-slate-300 dark:bg-white/10 text-slate-700 dark:text-white py-4 rounded-xl font-black uppercase text-xs tracking-widest">Voltar</button>
                                                <button disabled={!form.urlPerfil || (needsCNH && !form.urlCNH)} onClick={() => setEtapaCad(4)} className="flex-[2] bg-[#82C91E] disabled:opacity-50 text-[#4B0082] py-4 rounded-xl font-black uppercase text-xs tracking-widest">Avançar</button>
                                            </div>
                                        </motion.div>
                                    )}
                                    {etapaCad === 4 && (
                                        <motion.div key="e4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4 mt-6">
                                            <p className="text-[10px] font-black text-[#82C91E] uppercase tracking-widest mb-4">Segurança Final</p>
                                            <input type="password" placeholder="CRIE SUA SENHA DE ACESSO" value={form.senha} onChange={e => setForm({...form, senha: e.target.value})} className={`w-full border-2 p-5 rounded-xl font-bold text-center text-xl outline-none focus:border-[#82C91E] ${isDarkMode ? 'bg-[#1F0137]/50 border-white/10 text-white placeholder:text-white/40' : 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400'}`} />
                                            <p className="text-[9px] text-slate-500 text-center uppercase font-black tracking-widest">Mínimo de 6 caracteres.</p>
                                            <div className="flex gap-3 mt-6">
                                                <button onClick={() => setEtapaCad(3)} className="w-16 bg-slate-300 dark:bg-white/10 text-slate-700 dark:text-white rounded-xl flex items-center justify-center"><Lucide.ChevronLeft size={20}/></button>
                                                <button disabled={form.senha.length < 6} onClick={enviarCadastroFinal} className="flex-1 bg-[#4B0082] disabled:opacity-50 text-[#82C91E] py-5 rounded-xl font-black uppercase text-xs tracking-widest shadow-lg">Enviar Perfil</button>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                )}

                {/* -------------------------------------------------------------
                    TELA OPERACIONAL (DASHBOARD) - COMPATÍVEL COM MODO CLARO/ESCURO
                -------------------------------------------------------------- */}
                {secao === 'OPERACIONAL' && userDoc && (
                    <div className={`flex-1 flex flex-col relative overflow-hidden ${themeText} ${themeBg}`}>
                        
                        {/* WAKE LOCK: LEILÃO (COBRE TUDO) */}
                        <AnimatePresence>
                            {oferta && (
                                <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ type: "spring", damping: 25 }} className="absolute inset-0 z-[6000] bg-slate-950 flex flex-col">
                                    <div className="h-[45%] w-full relative border-b-4 border-[#82C91E] bg-slate-800">
                                        <MapContainer center={LOJA_COORDS} zoom={14} className="h-full w-full z-0" zoomControl={false}>
                                            <TileLayer url={isDarkMode ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"} />
                                            <Marker position={LOJA_COORDS} icon={iconLoja} />
                                            {oferta.endereco?.lat && <Marker position={[oferta.endereco.lat, oferta.endereco.lng]} icon={iconEntrega} />}
                                            {oferta.endereco?.lat && <Polyline positions={[LOJA_COORDS, [oferta.endereco.lat, oferta.endereco.lng]]} color="#82C91E" dashArray="5, 10" />}
                                        </MapContainer>
                                    </div>
                                    <div className="flex-1 p-8 flex flex-col justify-between bg-slate-900">
                                        <div>
                                            <div className="flex justify-between items-end mb-6 border-b border-slate-800 pb-6">
                                                <div>
                                                    <p className="text-[10px] font-black text-[#82C91E] uppercase tracking-widest mb-1 flex items-center gap-1.5 animate-pulse"><Lucide.BellRing size={14}/> Nova Missão</p>
                                                    <h2 className="text-5xl font-[1000] text-white italic tracking-tighter drop-shadow-sm">R$ {oferta.valores?.taxaEntrega?.toFixed(2)}</h2>
                                                </div>
                                                <div className="w-16 h-16 bg-transparent border-2 border-[#82C91E] rounded-2xl flex flex-col items-center justify-center text-[#82C91E]">
                                                    <span className="text-[8px] font-black">TEMPO</span>
                                                    <span className="text-2xl font-[1000] leading-none">{timer}</span>
                                                </div>
                                            </div>
                                            <div className="bg-slate-800 p-5 rounded-2xl border border-slate-700 shadow-sm flex items-start gap-4">
                                                <div className="w-10 h-10 bg-[#82C91E]/10 rounded-xl flex items-center justify-center shrink-0 mt-1"><Lucide.MapPin size={20} className="text-[#82C91E]"/></div>
                                                <div className="min-w-0">
                                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Destino</p>
                                                    <p className="text-base font-[1000] text-white uppercase leading-tight">{oferta.endereco?.rua}</p>
                                                    <p className="text-xs font-bold text-slate-500 uppercase mt-1">{oferta.endereco?.bairro}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex gap-4 mt-6">
                                            <button onClick={rejeitarLeilao} className="w-1/3 py-5 bg-slate-800 text-slate-400 rounded-2xl font-[1000] uppercase text-xs tracking-widest active:scale-95">Rejeitar</button>
                                            <button onClick={aceitarLeilao} className="w-2/3 bg-[#82C91E] text-slate-900 py-5 rounded-2xl font-[1000] uppercase text-sm tracking-widest shadow-xl active:scale-95 flex items-center justify-center gap-2"><Lucide.Zap size={18}/> Aceitar</button>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* MENU LATERAL SLIDE */}
                        <AnimatePresence>
                            {menu && (
                                <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className={`absolute inset-0 z-[5000] flex flex-col ${themeBg}`}>
                                    <header className={`p-6 pt-12 flex justify-between items-center border-b ${themeCard}`}>
                                        <div className="flex items-center gap-4">
                                            <button onClick={() => setMenu(false)} className={`w-10 h-10 rounded-lg flex items-center justify-center ${isDarkMode ? 'bg-slate-800 text-white' : 'bg-slate-200 text-slate-900'}`}><Lucide.ArrowLeft size={20}/></button>
                                            <h2 className="text-lg font-black uppercase italic">Menu <span className="text-[#82C91E]">PRO</span></h2>
                                        </div>
                                        <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2 text-slate-400">{isDarkMode ? <Lucide.Sun size={24}/> : <Lucide.Moon size={24}/>}</button>
                                    </header>
                                    <div className="flex-1 p-6 space-y-3">
                                        {[ 
                                            { id: 'RADAR', l: 'Radar de Cargas', i: Lucide.Radar, c: 'text-blue-500' }, 
                                            { id: 'MINHA_ROTA', l: 'Minha Rota', i: Lucide.Navigation, c: 'text-purple-500' }, 
                                            { id: 'HISTORICO', l: 'Auditoria Diária', i: Lucide.History, c: 'text-amber-500' },
                                            { id: 'CHAT', l: 'Chat com a Base', i: Lucide.MessageSquare, c: 'text-[#82C91E]' }
                                        ].map(item => (
                                            <button key={item.id} onClick={() => { setAba(item.id); setMenu(false); }} className={`w-full flex items-center justify-between p-5 border rounded-xl shadow-sm transition-all ${aba === item.id ? 'border-[#82C91E]' : themeCard}`}>
                                                <div className="flex items-center gap-4"><item.i size={20} className={item.c}/><span className={`text-[11px] font-black uppercase tracking-widest ${themeText}`}>{item.l}</span></div>
                                                <Lucide.ChevronRight size={16} className="text-slate-400"/>
                                            </button>
                                        ))}
                                    </div>
                                    <div className={`p-6 border-t ${themeCard}`}>
                                        <button onClick={() => { auth.signOut(); }} className="w-full py-5 bg-red-500/10 text-red-500 border border-red-500/20 rounded-xl font-black uppercase text-[10px] tracking-widest flex justify-center gap-2"><Lucide.LogOut size={16}/> Encerrar Sessão</button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* HEADER PRINCIPAL */}
                        <header className={`p-6 pt-12 flex justify-between items-center border-b shrink-0 z-10 shadow-sm ${themeCard} ${themeBg}`}>
                            <div className="flex items-center gap-4">
                                <button onClick={() => setMenu(true)} className={`w-10 h-10 rounded-lg flex items-center justify-center active:scale-95 ${isDarkMode ? 'bg-slate-800 text-white' : 'bg-slate-200 text-slate-900'}`}><Lucide.Menu size={20}/></button>
                                <h1 className="text-lg font-black uppercase italic">Piloto <span className="text-[#82C91E]">{userDoc.nome.split(' ')[0]}</span></h1>
                            </div>
                            <div className={`text-[9px] font-black text-[#82C91E] uppercase bg-[#82C91E]/10 px-3 py-1.5 rounded-lg border border-[#82C91E]/30 flex items-center gap-1.5`}>
                                <div className={`w-2 h-2 rounded-full ${userDoc.status === 'Livre' ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} /> Estação {aba === 'MINHA_ROTA' ? 'ROTA' : aba}
                            </div>
                        </header>

                        {/* BOTÃO DE ONLINE/OFFLINE GLOBAL */}
                        <div className={`p-5 shrink-0 border-b flex items-center justify-between shadow-sm relative z-10 ${themeCard} ${themeBg}`}>
                            <div>
                                <p className="text-[9px] font-black uppercase text-slate-500 tracking-widest mb-1">Status do Motor:</p>
                                <p className={`text-xl font-[1000] uppercase italic leading-none ${userDoc.status === 'Offline' ? 'text-red-500' : 'text-[#82C91E]'}`}>{userDoc.status}</p>
                            </div>
                            <button onClick={alternarStatusOperacional} className={`px-6 py-4 rounded-xl font-[1000] uppercase text-[10px] tracking-widest flex items-center gap-2 transition-all active:scale-95 shadow-md ${userDoc.status === 'Offline' ? 'bg-[#82C91E] text-slate-900' : 'bg-red-500 text-white'}`}>
                                <Lucide.Power size={16}/> {userDoc.status === 'Offline' ? 'Ficar Online' : 'Desligar'}
                            </button>
                        </div>

                        {/* CONTEÚDO DAS ABAS */}
                        <main className="flex-1 overflow-y-auto p-5 relative">
                            <AnimatePresence mode="wait">
                                
                                {aba === 'RADAR' && (
                                    <motion.div key="radar" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="space-y-4">
                                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-2">Monitoramento da Doca</p>
                                        
                                        {userDoc.status === 'Offline' && (
                                            <div className="bg-red-500/10 border-2 border-red-500/20 p-6 rounded-2xl text-center">
                                                <Lucide.WifiOff size={40} className="mx-auto text-red-500 mb-3" />
                                                <p className="text-red-500 font-bold text-xs uppercase">Você está invisível para a Torre. Ligue o motor.</p>
                                            </div>
                                        )}

                                        {radar.length === 0 && userDoc.status !== 'Offline' && (
                                            <div className="text-center py-20 opacity-40 flex flex-col items-center justify-center">
                                                <Lucide.Radar size={50} className={`mb-4 ${isDarkMode ? 'text-slate-600' : 'text-slate-400'}`}/>
                                                <p className={`text-xs font-black uppercase tracking-widest ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>Radar Ativo.</p>
                                                <p className="text-[10px] font-bold text-slate-500 uppercase mt-2">Aguardando despachos...</p>
                                            </div>
                                        )}
                                    </motion.div>
                                )}

                                {aba === 'MINHA_ROTA' && (
                                    <motion.div key="rota" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="space-y-4">
                                        {rota.length === 0 && (
                                            <div className="text-center py-20 opacity-40 flex flex-col items-center">
                                                <Lucide.Briefcase size={50} className="mb-4 text-slate-500" />
                                                <p className="text-xs font-black uppercase tracking-widest text-slate-500">Sua Mochila está vazia.</p>
                                            </div>
                                        )}

                                        {rota.map(p => {
                                            const cobrar = p.pagamento?.metodo === 'DINHEIRO' || p.pagamento?.metodo === 'MAQUININHA';
                                            return (
                                                <div key={p.id} className={`p-6 rounded-[2.5rem] border-2 border-[#4B0082]/50 shadow-xl space-y-4 relative overflow-hidden ${themeCard}`}>
                                                    <div className="flex justify-between items-start">
                                                        <div>
                                                            <p className="text-[10px] font-black text-slate-500 uppercase flex items-center gap-1"><Lucide.Hash size={12}/>{p.id.slice(-4)}</p>
                                                            <h4 className={`text-2xl font-[1000] uppercase italic leading-none mt-1 ${themeText}`}>{p.cliente?.nome}</h4>
                                                        </div>
                                                        <div className="w-12 h-12 bg-[#4B0082]/10 text-[#4B0082] dark:bg-purple-500/20 dark:text-purple-400 rounded-xl flex items-center justify-center shrink-0 border border-[#4B0082]/30">
                                                            <Lucide.Navigation size={20}/>
                                                        </div>
                                                    </div>

                                                    <div className={`p-4 rounded-2xl border flex items-start gap-3 ${isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                                                        <Lucide.MapPin size={18} className="text-[#82C91E] shrink-0 mt-0.5" />
                                                        <div>
                                                            <p className={`text-sm font-[1000] uppercase leading-tight ${themeText}`}>{p.endereco?.rua}, {p.endereco?.numero}</p>
                                                            <p className="text-xs font-bold text-slate-500 uppercase mt-1">{p.endereco?.bairro}</p>
                                                        </div>
                                                    </div>

                                                    {cobrar && (
                                                        <div className="p-5 rounded-2xl border-2 bg-[#82C91E]/10 border-[#82C91E]/50">
                                                            <p className="text-[10px] font-black uppercase tracking-widest text-[#82C91E] mb-1">Cobrar ({p.pagamento.metodo}):</p>
                                                            <p className="text-4xl font-[1000] italic tracking-tighter text-[#82C91E]">R$ {p.valores?.total?.toFixed(2)}</p>
                                                        </div>
                                                    )}

                                                    <div className="grid grid-cols-2 gap-3 pt-2">
                                                        <button onClick={() => TITAN_UTILS.navegarGoogleMaps(p.endereco)} className={`py-4 rounded-xl font-[1000] uppercase text-[10px] tracking-widest transition-colors flex items-center justify-center gap-2 ${isDarkMode ? 'bg-slate-700 text-white' : 'bg-slate-200 text-slate-900'}`}>
                                                            <Lucide.Map size={16}/> Navegar
                                                        </button>
                                                        <button onClick={() => finalizarEntregaComFoto(p)} className="bg-[#82C91E] text-slate-900 py-4 rounded-xl font-[1000] uppercase text-[10px] tracking-widest shadow-lg flex items-center justify-center gap-2 active:scale-95">
                                                            <Lucide.Camera size={16}/> Entregar
                                                        </button>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </motion.div>
                                )}

                                {aba === 'HISTORICO' && (
                                    <motion.div key="hist" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="space-y-3">
                                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-2">Auditoria Diária</p>
                                        {historico.length === 0 && <p className="text-xs font-black uppercase tracking-widest text-slate-500 text-center mt-10">Nenhuma corrida hoje.</p>}
                                        {historico.map(h => (
                                            <div key={h.id} className={`p-5 rounded-2xl border shadow-sm flex items-center justify-between ${themeCard}`}>
                                                <div className="flex gap-4 items-center">
                                                    <div className="w-10 h-10 bg-[#82C91E]/10 text-[#82C91E] rounded-xl flex items-center justify-center shrink-0"><Lucide.CheckCircle2 size={20}/></div>
                                                    <div>
                                                        <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{new Date(h.horarioConcluido?.toDate()).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                                                        <h4 className={`text-sm font-[1000] uppercase italic leading-tight truncate w-32 ${themeText}`}>{h.cliente?.nome}</h4>
                                                    </div>
                                                </div>
                                                <div className={`px-3 py-2 rounded-xl border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                                                    <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest text-right">Taxa</p>
                                                    <p className="text-sm font-[1000] text-[#82C91E] italic">+ R$ {h.valores?.taxaEntrega?.toFixed(2)}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </motion.div>
                                )}

                                {aba === 'CHAT' && (
                                    <motion.div key="chat" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="flex flex-col h-full">
                                        <div className={`flex-1 rounded-[2rem] border overflow-hidden flex flex-col ${themeCard}`}>
                                            <div className="flex-1 p-4 overflow-y-auto space-y-4">
                                                {chatMsgs.length === 0 && <p className="text-center text-xs font-bold text-slate-400 mt-10 uppercase">Sem mensagens.</p>}
                                                {chatMsgs.map(m => (
                                                    <div key={m.id} className={`flex flex-col max-w-[80%] ${m.remetente === 'PILOTO' ? 'self-end items-end' : 'self-start items-start'}`}>
                                                        <div className={`p-4 rounded-2xl text-sm font-bold ${m.remetente === 'PILOTO' ? 'bg-[#82C91E] text-slate-900 rounded-br-none' : `rounded-bl-none ${isDarkMode ? 'bg-slate-800 text-white' : 'bg-slate-200 text-slate-900'}`}`}>{m.texto}</div>
                                                    </div>
                                                ))}
                                            </div>
                                            <form onSubmit={enviarMsgChat} className={`p-4 border-t flex gap-2 ${isDarkMode ? 'border-slate-800 bg-slate-900' : 'border-slate-200 bg-slate-50'}`}>
                                                <input type="text" value={novaMsg} onChange={e=>setNovaMsg(e.target.value)} placeholder="Falar com a Base..." className={`flex-1 h-14 rounded-full px-6 font-bold outline-none border focus:border-[#82C91E] ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'}`} />
                                                <button type="submit" className="w-14 h-14 bg-[#82C91E] rounded-full flex items-center justify-center text-slate-900 active:scale-95"><Lucide.Send size={20}/></button>
                                            </form>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </main>
                    </div>
                )}
            </div>
        </div>
    );
}