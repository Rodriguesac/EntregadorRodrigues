import React, { useState, useEffect, useRef } from 'react';
import * as Lucide from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- CAPACITOR (HARDWARE REAL) ---
import { Geolocation } from '@capacitor/geolocation';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { App } from '@capacitor/app';

// --- FIREBASE (REAL) ---
import { db, auth } from '../services/firebase'; 
import { collection, query, onSnapshot, doc, updateDoc, setDoc, serverTimestamp, getDoc, where, increment, addDoc, orderBy } from "firebase/firestore";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

// ==========================================
// 1. CONFIGURAÇÕES E UTILS
// ==========================================
const IMG_WELCOME = "https://res.cloudinary.com/dbd9x1o02/image/upload/v1775159380/rodrigues_geral/fjm4ioufyglqbmmy2gn5.png";
const SOUND_ALARM = 'https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3'; 
const CLOUDINARY_CLOUD_NAME = 'dbd9x1o02'; 
const CLOUDINARY_UPLOAD_PRESET = 'fc3i8urq'; 

const UTILS = {
  formatarDinheiro: (v) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v || 0),
  mascararCPF: (v) => v.replace(/\D/g, '').slice(0, 11).replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "$1.$2.$3-$4"),
  limparDados: (v) => v.replace(/\D/g, ''),
  abrirMaps: (l) => window.open(`http://googleusercontent.com/maps.google.com/maps?q=${encodeURIComponent(`${l.rua}, ${l.numero} - ${l.bairro}`)}`, '_system'),
  abrirZap: (tel, nome) => window.open(`https://wa.me/55${tel?.replace(/\D/g, '')}?text=${encodeURIComponent(`Olá ${nome}, aqui é o piloto! Estou chegando.`)}`, '_blank'),
  calcularDistancia: (lat1, lon1, lat2, lon2) => {
    if (!lat1 || !lon1 || !lat2 || !lon2) return 0;
    const R = 6371; const dLat = (lat2 - lat1) * (Math.PI / 180); const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    return parseFloat((R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)))).toFixed(2));
  },
  uploadCloudinary: async (b64) => {
    try {
      const res = await fetch(b64); const blob = await res.blob(); const fd = new FormData();
      fd.append('file', new File([blob], `prova_${Date.now()}.jpg`, { type: "image/jpeg" }));
      fd.append('upload_preset', CLOUDINARY_UPLOAD_PRESET); fd.append('folder', `rodrigues_acai/provas`);
      const out = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, { method: 'POST', body: fd });
      const r = await out.json(); return r.secure_url;
    } catch (e) { console.error(e); return null; }
  }
};

// ==========================================
// 2. COMPONENTES DE UI
// ==========================================
const Loader = () => (
  <div className="fixed inset-0 z-[9999] bg-white/80 backdrop-blur-md flex flex-col items-center justify-center">
    <div className="w-16 h-16 border-4 border-[#F1F3F5] border-t-[#82C91E] rounded-full animate-spin mb-4" />
    <p className="text-[#212529] font-black uppercase tracking-widest text-[11px] animate-pulse">Sincronizando...</p>
  </div>
);

// ==========================================
// 3. APLICATIVO PRINCIPAL (MODO CLARO)
// ==========================================
export default function AppEntregadorNovoVisual() {
  const [isProcessando, setIsProcessando] = useState(true);
  const [etapa, setEtapa] = useState('AUTH'); // AUTH, APP
  const [abaAtiva, setAbaNavegacao] = useState('RADAR'); 
  const [menu, setMenu] = useState(false);
  
  // --- Estados de Auth & Perfil ---
  const [isLoginModo, setIsLoginModo] = useState(true);
  const [piloto, setPiloto] = useState(null);
  const [form, setForm] = useState({ cpf: '', senha: '', nome: '', veiculo: 'MOTO', placa: '', telefone: '' });
  
  // --- Estados Logísticos ---
  const [isOnline, setIsOnline] = useState(false);
  const [ofertaLeilao, setOfertaLeilao] = useState(null);
  const [pedidoAtivo, setPedidoAtivo] = useState(null);
  const [chatMsgs, setChatMsgs] = useState([]);
  const [novaMsg, setNovaMsg] = useState('');

  // --- Refs ---
  const watchGpsRef = useRef(null);
  const audioAlarmeRef = useRef(null);
  const locRef = useRef({ lat: 0, lng: 0 });

  const vibrar = (padrao = 50) => { if (navigator.vibrate) navigator.vibrate(padrao); };

  // ==========================================
  // INICIALIZAÇÃO
  // ==========================================
  useEffect(() => {
    audioAlarmeRef.current = new Audio(SOUND_ALARM);
    audioAlarmeRef.current.loop = true;

    const cpfSalvo = localStorage.getItem('@UP:cpf');
    if (cpfSalvo) {
      getDoc(doc(db, "entregadores", cpfSalvo)).then(s => {
        if (s.exists()) { setPiloto({ id: s.id, ...s.data() }); setEtapa('APP'); }
        setIsProcessando(false);
      });
    } else { setIsProcessando(false); }

    App.addListener('backButton', () => {
      if (pedidoAtivo) alert("Finalize a corrida atual antes de sair!");
      else App.exitApp();
    });
  }, [pedidoAtivo]);

  // ==========================================
  // AUTENTICAÇÃO E CADASTRO
  // ==========================================
  const handleAuth = async (e) => {
    e.preventDefault(); setIsProcessando(true);
    const cpfLimpo = UTILS.limparDados(form.cpf);
    const emailStr = `${cpfLimpo}@rodrigues.com`;
    
    try {
      const docRef = doc(db, "entregadores", cpfLimpo);
      const snap = await getDoc(docRef);

      if (isLoginModo) {
        if (snap.exists() && snap.data().senha === form.senha) {
          localStorage.setItem('@UP:cpf', cpfLimpo);
          setPiloto({ id: snap.id, ...snap.data() }); setEtapa('APP');
        } else { alert("CPF ou Senha incorretos."); }
      } else {
        if (snap.exists()) { alert("CPF já cadastrado! Faça login."); }
        else {
          await setDoc(docRef, {
            nome: form.nome, telefone: UTILS.limparDados(form.telefone), senha: form.senha, 
            veiculo: form.veiculo, placa: form.placa, statusAprovacao: 'PENDENTE',
            ganhosTaxas: 0, debitosLoja: 0, saldoLiquido: 0, createdAt: serverTimestamp(), cpf: cpfLimpo, email: emailStr
          });
          const cred = await createUserWithEmailAndPassword(auth, emailStr, form.senha);
          await updateDoc(docRef, { uid: cred.user.uid });
          alert("Cadastro realizado! Aguarde a aprovação da loja.");
          setIsLoginModo(true);
        }
      }
    } catch (err) { alert("Erro de conexão ou credencial inválida."); } finally { setIsProcessando(false); }
  };

  // ==========================================
  // SINCRONIZAÇÃO EM TEMPO REAL
  // ==========================================
  useEffect(() => {
    if (!piloto || etapa !== 'APP') return;

    const unsubPerfil = onSnapshot(doc(db, "entregadores", piloto.id), (d) => {
      if (d.exists()) setPiloto(prev => ({ ...prev, ...d.data() }));
    });

    const unsubLeilao = onSnapshot(query(collection(db, "pedidos"), where("status", "==", "BUSCANDO_ENTREGADOR")), (snap) => {
      if (!snap.empty && isOnline && !pedidoAtivo) {
        const p = { id: snap.docs[0].id, ...snap.docs[0].data() };
        if (!p.entregadoresRecusaram?.includes(piloto.id)) {
          setOfertaLeilao(p); audioAlarmeRef.current?.play().catch(()=>{}); vibrar([200, 100, 200]);
        }
      } else { setOfertaLeilao(null); audioAlarmeRef.current?.pause(); }
    });

    const unsubAtivo = onSnapshot(query(collection(db, "pedidos"), where("entregadorId", "==", piloto.id), where("status", "in", ["A_CAMINHO_LOJA", "AGUARDANDO_COLETA", "SAIU_ENTREGA", "ENTREGADOR_NO_LOCAL"])), (snap) => {
      if (!snap.empty) setPedidoAtivo({ id: snap.docs[0].id, ...snap.docs[0].data() });
      else setPedidoAtivo(null);
    });

    const unsubChat = onSnapshot(query(collection(db, `entregadores/${piloto.id}/mensagens`), orderBy("timestamp", "asc")), (snap) => {
      setChatMsgs(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });

    return () => { unsubPerfil(); unsubLeilao(); unsubAtivo(); unsubChat(); };
  }, [piloto, isOnline, pedidoAtivo, etapa]);

  // ==========================================
  // FUNÇÕES DE AÇÃO E GPS
  // ==========================================
  const toggleStatus = async () => {
    setIsProcessando(true);
    try {
      if (!isOnline) {
        if (piloto.statusAprovacao !== 'APROVADO') { alert("Sua conta está em análise pela base."); setIsProcessando(false); return; }
        await Geolocation.requestPermissions();
        const pos = await Geolocation.getCurrentPosition({ enableHighAccuracy: true });
        setIsOnline(true);
        await updateDoc(doc(db, "entregadores", piloto.id), { status: 'Livre', coords: { lat: pos.coords.latitude, lng: pos.coords.longitude } });
        
        watchGpsRef.current = await Geolocation.watchPosition({ enableHighAccuracy: true }, (p) => {
          if (p) { locRef.current = { lat: p.coords.latitude, lng: p.coords.longitude }; updateDoc(doc(db, "entregadores", piloto.id), { coords: locRef.current }).catch(()=>{}); }
        });
      } else {
        setIsOnline(false); setOfertaLeilao(null); audioAlarmeRef.current?.pause();
        if (watchGpsRef.current) Geolocation.clearWatch({ id: watchGpsRef.current });
        await updateDoc(doc(db, "entregadores", piloto.id), { status: 'Offline' });
      }
    } catch(e) { alert("Ative o GPS do aparelho."); } finally { setIsProcessando(false); }
  };

  const aceitarLeilao = async () => {
    if (!ofertaLeilao) return; setIsProcessando(true);
    try {
      audioAlarmeRef.current?.pause();
      await updateDoc(doc(db, "pedidos", ofertaLeilao.id), { 
        status: 'A_CAMINHO_LOJA', 
        entregadorId: piloto.id,
        nomeEntregador: piloto.nome.split(' ')[0], 
        veiculoEntregador: piloto.veiculo || 'Moto',
        telefoneEntregador: piloto.telefone,
        horarioAceite: serverTimestamp() 
      });
      setOfertaLeilao(null); vibrar();
    } catch(e) { alert("Outro piloto foi mais rápido!"); setOfertaLeilao(null); } finally { setIsProcessando(false); }
  };

  const recusarLeilao = async () => {
    audioAlarmeRef.current?.pause(); vibrar();
    if (ofertaLeilao) await updateDoc(doc(db, "pedidos", ofertaLeilao.id), { entregadoresRecusaram: increment(piloto.id) }).catch(()=>{});
    setOfertaLeilao(null);
  };

  const mudarStatusRota = async (novoStatus) => {
    setIsProcessando(true); vibrar();
    try { await updateDoc(doc(db, "pedidos", pedidoAtivo.id), { status: novoStatus }); } 
    catch(e) { alert("Erro de rede."); } finally { setIsProcessando(false); }
  };

  const finalizarCorrida = async () => {
    setIsProcessando(true); vibrar();
    try {
      const f = await Camera.getPhoto({ quality: 60, resultType: CameraResultType.DataUrl, source: CameraSource.Camera });
      const url = await UTILS.uploadCloudinary(f.dataUrl);
      
      const taxa = pedidoAtivo.valores?.taxaEntrega || 0;
      const total = pedidoAtivo.valores?.total || 0;
      const metodo = pedidoAtivo.pagamento?.metodo?.toUpperCase();
      const debito = (metodo === 'DINHEIRO' || metodo === 'MAQUININHA') ? total : 0;

      await updateDoc(doc(db, "pedidos", pedidoAtivo.id), { status: 'CONCLUIDO', provaEntregaUrl: url, horarioConclusao: serverTimestamp() });
      await updateDoc(doc(db, "entregadores", piloto.id), { ganhosTaxas: increment(taxa), debitosLoja: increment(debito), saldoLiquido: increment(taxa - debito), totalEntregas: increment(1) });
      
    } catch (e) { alert("Erro ao enviar foto."); } finally { setIsProcessando(false); }
  };

  const enviarMsgChat = async (e) => {
    e.preventDefault(); if (!novaMsg.trim()) return;
    await addDoc(collection(db, `entregadores/${piloto.id}/mensagens`), { texto: novaMsg, remetente: 'PILOTO', timestamp: serverTimestamp() });
    setNovaMsg('');
  };

  // ==========================================
  // RENDER: TELA DE AUTENTICAÇÃO (MODO CLARO)
  // ==========================================
  if (etapa === 'AUTH') {
    return (
      <div className="min-h-[100dvh] flex flex-col justify-end p-6 relative font-['Montserrat'] overflow-hidden">
        {isProcessando && <Loader />}
        
        {/* IMAGEM DE BOAS VINDAS COMO FUNDO (MANTIDA CONFORME PEDIDO) */}
        <img src={IMG_WELCOME} alt="Fundo" className="absolute inset-0 w-full h-full object-cover object-top z-0" />
        
        {/* OVERLAY DE DEGRADÊ PARA MELHORAR A LEITURA (ESTILO CLARO) */}
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-white via-white/80 to-transparent" />

        <div className="relative z-20 w-full max-w-sm mx-auto bg-white border border-[#E2E8F0] p-10 rounded-[32px] shadow-[0_16px_32px_rgba(0,0,0,0.04)] mb-10">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-[1000] italic uppercase tracking-tighter text-[#212529]">
              Rodrigues <span className="text-[#82C91E]">Piloto</span>
            </h1>
            <p className="font-bold text-[#495057] uppercase text-[10px] mt-2 tracking-[0.2em]">{isLoginModo ? 'Acesso ao Painel' : 'Novo Cadastro'}</p>
          </div>

          <form onSubmit={handleAuth} className="space-y-4">
            {!isLoginModo && <input type="text" placeholder="NOME COMPLETO" value={form.nome} onChange={e=>setForm({...form, nome: e.target.value.toUpperCase()})} className="w-full h-16 rounded-[20px] bg-white border border-[#E2E8F0] px-6 text-[#212529] font-bold outline-none focus:border-[#82C91E] placeholder:text-[#ADB5BD] text-sm shadow-inner transition-colors" required />}
            <input type="tel" placeholder="SEU CPF" value={UTILS.mascararCPF(form.cpf)} onChange={e=>setForm({...form, cpf: e.target.value})} maxLength={14} className="w-full h-16 rounded-[20px] bg-white border border-[#E2E8F0] px-6 text-[#212529] font-[1000] text-center tracking-widest text-lg outline-none focus:border-[#82C91E] placeholder:text-[#ADB5BD] shadow-inner" required />
            {!isLoginModo && <input type="tel" placeholder="WHATSAPP" value={form.telefone} onChange={e=>setForm({...form, telefone: e.target.value})} className="w-full h-16 rounded-[20px] bg-white border border-[#E2E8F0] px-6 text-[#212529] font-bold outline-none focus:border-[#82C91E] placeholder:text-[#ADB5BD] text-sm shadow-inner transition-colors" required />}
            <input type="password" placeholder="SENHA" value={form.senha} onChange={e=>setForm({...form, senha: e.target.value})} className="w-full h-16 rounded-[20px] bg-white border border-[#E2E8F0] px-6 text-[#212529] font-bold text-center tracking-[0.3em] outline-none focus:border-[#82C91E] placeholder:text-[#ADB5BD] shadow-inner" required />
            {!isLoginModo && <input type="text" placeholder="PLACA DA MOTO" value={form.placa} onChange={e=>setForm({...form, placa: e.target.value.toUpperCase()})} className="w-full h-16 rounded-[20px] bg-white border border-[#E2E8F0] px-6 text-[#212529] font-bold outline-none uppercase focus:border-[#82C91E] placeholder:text-[#ADB5BD] text-sm shadow-inner transition-colors" required />}
            
            <button type="submit" className="w-full h-16 bg-[#82C91E] text-[#212529] rounded-[24px] font-[1000] uppercase shadow-[0_8px_16px_rgba(130,201,30,0.2)] active:scale-95 transition-transform mt-8 tracking-widest text-sm">
              {isLoginModo ? 'Iniciar Turno' : 'Solicitar Aprovação'}
            </button>
          </form>

          <button onClick={() => setIsLoginModo(!isLoginModo)} className="w-full mt-6 text-[#495057] hover:text-[#212529] transition-colors font-black uppercase text-[10px] tracking-widest">
            {isLoginModo ? 'Quero me cadastrar' : 'Já tenho cadastro'}
          </button>
        </div>
      </div>
    );
  }

  // ==========================================
  // RENDER: APP PRINCIPAL (MODO CLARO)
  // ==========================================
  return (
    <div className="flex flex-col h-[100dvh] w-full font-['Montserrat'] relative bg-[#F8F9FA] text-[#212529]">
      {isProcessando && <Loader />}

      {/* WAKE LOCK: LEILÃO (MODO CLARO) */}
      <AnimatePresence>
        {ofertaLeilao && !pedidoAtivo && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="fixed inset-0 z-[9999] bg-white/90 backdrop-blur-xl flex flex-col p-6 justify-center">
            <div className="bg-white p-10 rounded-[40px] border border-[#E2E8F0] shadow-[0_24px_48px_rgba(0,0,0,0.06)] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#82C91E]/20 rounded-full blur-3xl pointer-events-none" />
              
              <div className="flex justify-between items-center mb-10 relative z-10">
                <div className="w-16 h-16 bg-[#82C91E] rounded-full flex items-center justify-center animate-bounce shadow-[0_0_20px_rgba(130,201,30,0.4)]"><Lucide.Zap size={32} className="text-white" fill="currentColor" /></div>
                <span className="bg-[#FA5252] text-white px-5 py-2.5 rounded-full font-[1000] text-[11px] uppercase tracking-widest animate-pulse">NOVA ROTA</span>
              </div>
              
              <p className="text-[#495057] font-bold uppercase text-[10px] tracking-[0.3em] mb-2 relative z-10">Remuneração</p>
              <p className="text-6xl font-[1000] text-[#212529] italic tracking-tighter mb-10 drop-shadow-sm relative z-10"><span className="text-[#82C91E]">R$</span> {ofertaLeilao.valores?.taxaEntrega?.toFixed(2)}</p>
              
              <div className="space-y-6 relative z-10 bg-[#F1F3F5] p-8 rounded-[24px] border border-[#E2E8F0]">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#EBF0FD] flex items-center justify-center shrink-0 border border-[#DFE5FC]"><Lucide.Store size={18} className="text-[#4B0082]"/></div>
                  <div><p className="text-[#495057] font-bold uppercase text-[9px] tracking-widest">Coleta na Loja</p><p className="text-[#212529] font-bold text-sm mt-1">Matriz Rodrigues</p></div>
                </div>
                <div className="w-0.5 h-6 bg-[#E2E8F0] ml-5" />
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#EBF0FD] flex items-center justify-center shrink-0 border border-[#DFE5FC]"><Lucide.MapPin size={18} className="text-[#4B0082]"/></div>
                  <div><p className="text-[#495057] font-bold uppercase text-[9px] tracking-widest">Destino</p><p className="text-[#212529] font-bold text-sm mt-1">{ofertaLeilao.endereco?.bairro}</p></div>
                </div>
              </div>

              <div className="mt-10 space-y-4 relative z-10">
                <button onClick={aceitarLeilao} className="w-full h-16 bg-[#82C91E] text-white rounded-[24px] font-[1000] uppercase tracking-[0.2em] text-sm flex items-center justify-center gap-3 shadow-[0_8px_16px_rgba(130,201,30,0.2)] active:scale-95 transition-transform"><Lucide.CheckCircle2 size={20}/> Aceitar Corrida</button>
                <button onClick={recusarLeilao} className="w-full h-14 bg-[#EDF2F7] text-[#495057] rounded-[24px] font-bold uppercase text-xs tracking-widest hover:bg-[#E2E8F0] active:scale-95 transition-colors">Rejeitar</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HEADER SUPERIOR CLEAN */}
      <header className="p-8 pt-16 flex justify-between items-center shrink-0">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-[#F1F3F5] rounded-[20px] flex items-center justify-center border border-[#E2E8F0] shadow-inner">
            <Lucide.User size={28} className="text-[#ADB5BD]" />
          </div>
          <div>
            <h1 className="font-[1000] uppercase text-xl leading-none tracking-tighter text-[#212529]">{piloto.nome.split(' ')[0]}</h1>
            <p className="text-[9px] font-black uppercase tracking-[0.2em] mt-1 text-[#495057] flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${isOnline ? 'bg-[#82C91E] shadow-[0_0_10px_#82C91E]' : 'bg-[#FA5252]'}`} /> {isOnline ? 'CONECTADO' : 'OFFLINE'}
            </p>
          </div>
        </div>
        <button onClick={() => setMenu(true)} className="w-16 h-16 bg-[#F1F3F5] rounded-[20px] border border-[#E2E8F0] flex items-center justify-center active:scale-95 transition-transform text-[#4B0082]">
          <Lucide.Menu size={28} />
        </button>
      </header>

      {/* CONTEÚDO PRINCIPAL COM PADDING INFERIOR PARA NÃO SOBREPOR A NAV */}
      <main className="flex-1 overflow-y-auto pb-[136px] px-8">
        
        {/* ABA: RADAR & PEDIDO ATIVO */}
        {abaAtiva === 'RADAR' && (
          <div className="h-full flex flex-col">
            {!pedidoAtivo ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center">
                <div className="relative mb-10">
                  {isOnline && (
                    <>
                      <motion.div animate={{ scale: [1, 1.5], opacity: [0.5, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute inset-0 bg-[#82C91E] rounded-full" />
                      <motion.div animate={{ scale: [1, 1.2], opacity: [0.8, 0] }} transition={{ repeat: Infinity, duration: 2, delay: 0.5 }} className="absolute inset-0 bg-[#82C91E] rounded-full" />
                    </>
                  )}
                  <button onClick={toggleStatus} className={`relative z-10 w-36 h-36 rounded-full flex items-center justify-center border-0 shadow-2xl transition-colors ${isOnline ? 'bg-[#82C91E] text-white pulse-green' : 'bg-[#FA5252] text-white hover:bg-[#F03E3E]'}`}>
                    <Lucide.Power size={48} strokeWidth={isOnline ? 2.5 : 2} />
                  </button>
                </div>
                <h2 className="text-3xl font-[1000] italic uppercase tracking-tighter mb-2 text-[#212529]">{isOnline ? 'Rastreio Ativo' : 'Motor Frio'}</h2>
                <p className="text-[10px] font-black uppercase text-[#495057] tracking-widest">{isOnline ? 'Aguardando chamados da base.' : 'Toque no botão para conectar.'}</p>
              </div>
            ) : (
              <div className="space-y-6 pt-4">
                <div className="p-10 rounded-[32px] bg-white border border-[#E2E8F0] shadow-[0_16px_32px_rgba(0,0,0,0.04)] relative overflow-hidden">
                  {/* Detalhe Visual do Status */}
                  <div className={`absolute top-0 left-0 w-full h-1 ${pedidoAtivo.status === 'SAIU_ENTREGA' || pedidoAtivo.status === 'ENTREGADOR_NO_LOCAL' ? 'bg-[#82C91E]' : 'bg-[#4B0082]'}`} />

                  <div className="flex justify-between items-center mb-8 pb-6 border-b border-[#E2E8F0]">
                    <div>
                      <p className="text-[9px] font-black uppercase text-[#495057] tracking-[0.2em] mb-1">Status da Rota</p>
                      <span className="text-[11px] font-[1000] text-[#212529] uppercase tracking-widest px-3 py-1 bg-[#F1F3F5] rounded-lg">{pedidoAtivo.status.replace(/_/g, ' ')}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-[9px] font-black uppercase text-[#495057] tracking-[0.2em] mb-1">A Receber</p>
                      <p className="text-2xl font-[1000] italic text-[#82C91E]">{UTILS.formatarDinheiro(pedidoAtivo.valores?.total)}</p>
                    </div>
                  </div>
                  
                  <div className="mb-8">
                    <p className="text-[9px] font-black uppercase text-[#495057] tracking-[0.2em] mb-2">Destino</p>
                    <h3 className="font-[1000] text-2xl uppercase leading-tight mb-2 text-[#212529]">{pedidoAtivo.endereco?.rua}, {pedidoAtivo.endereco?.numero}</h3>
                    <p className="text-[11px] font-bold text-[#495057] uppercase tracking-widest">{pedidoAtivo.endereco?.bairro} • Cliente: {pedidoAtivo.cliente?.nome}</p>
                  </div>
                  
                  <div className="flex gap-4 mb-8">
                    <button onClick={() => UTILS.abrirMaps(pedidoAtivo.endereco)} className="flex-1 py-4 bg-[#F1F3F5] text-[#4B0082] rounded-[18px] p-4 flex items-center justify-center border border-[#E2E8F0] shadow-none hover:bg-[#E2E8F0] transition-colors gap-2"><Lucide.Navigation size={16}/> Navegar</button>
                    <button onClick={() => UTILS.abrirZap(pedidoAtivo.cliente?.telefone, pedidoAtivo.cliente?.nome)} className="w-14 h-14 bg-[#EAFDF1] text-[#25D366] rounded-[18px] p-4 border border-[#DCFCE7] shadow-none hover:bg-[#DCFCE7] transition-colors flex items-center justify-center"><Lucide.MessageCircle size={20}/></button>
                  </div>

                  {pedidoAtivo.status === 'A_CAMINHO_LOJA' && <button onClick={() => mudarStatusRota('AGUARDANDO_COLETA')} className="w-full py-5 bg-[#EEF1FD] text-[#4B0082] rounded-[20px] font-[1000] uppercase text-sm tracking-widest border border-[#DFE5FC] shadow-none hover:bg-[#DFE5FC] transition-colors">Cheguei na Loja</button>}
                  {pedidoAtivo.status === 'AGUARDANDO_COLETA' && <button onClick={() => mudarStatusRota('SAIU_ENTREGA')} className="w-full py-5 bg-[#F1F3F5] text-[#212529] rounded-[20px] font-[1000] uppercase text-sm tracking-widest border border-[#E2E8F0] shadow-none hover:bg-[#E2E8F0] transition-colors">Peguei o Pacote</button>}
                  {pedidoAtivo.status === 'SAIU_ENTREGA' && <button onClick={() => mudarStatusRota('ENTREGADOR_NO_LOCAL')} className="w-full py-5 bg-[#FFF9DB] text-[#F08C00] rounded-[20px] font-[1000] uppercase text-sm tracking-widest border border-[#FFF3BF] shadow-none hover:bg-[#FFF3BF] transition-colors">Cheguei no Cliente</button>}
                  {pedidoAtivo.status === 'ENTREGADOR_NO_LOCAL' && <button onClick={finalizarCorrida} className="w-full h-16 bg-[#82C91E] text-white rounded-[24px] font-[1000] uppercase tracking-[0.2em] text-sm flex items-center justify-center gap-3 shadow-[0_8px_16px_rgba(130,201,30,0.2)] active:scale-95 transition-transform"><Lucide.Camera size={18}/> Tirar Foto e Finalizar</button>}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ABA: CARTEIRA */}
        {abaAtiva === 'CARTEIRA' && (
          <div className="pt-4 h-full flex flex-col">
            <h2 className="text-3xl font-[1000] italic uppercase mb-8 tracking-tighter text-[#212529]">Financeiro</h2>
            <div className="p-10 rounded-[40px] mb-8 bg-white border border-[#E2E8F0] shadow-[0_16px_32px_rgba(0,0,0,0.04)] text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 p-6 opacity-5"><Lucide.DollarSign size={100} className="text-[#ADB5BD]"/></div>
              <p className="text-[10px] font-black text-[#495057] uppercase tracking-[0.4em] mb-4 relative z-10">Seu Saldo Líquido</p>
              <p className="text-6xl font-[1000] italic text-[#82C91E] tracking-tighter mb-8 drop-shadow-sm relative z-10">{UTILS.formatarDinheiro(piloto.saldoLiquido)}</p>
              
              <div className="flex justify-between px-2 pt-6 border-t border-[#E2E8F0] relative z-10">
                <div className="text-left"><p className="text-[8px] font-black uppercase text-[#495057] tracking-widest mb-1">Ganhos em Taxas</p><p className="font-[1000] text-xl text-[#212529]">{UTILS.formatarDinheiro(piloto.ganhosTaxas)}</p></div>
                <div className="text-right"><p className="text-[8px] font-black uppercase text-[#495057] tracking-widest mb-1">Repasse à Loja</p><p className="font-[1000] text-xl text-[#FA5252]">{UTILS.formatarDinheiro(piloto.debitosLoja)}</p></div>
              </div>
            </div>
            
            <div className="flex-1 bg-[#F1F3F5] rounded-[32px] border border-[#E2E8F0] p-8 mt-2">
               <p className="text-[10px] font-black text-[#495057] uppercase tracking-[0.3em] mb-6 text-center">Estatísticas do Perfil</p>
               <div className="flex justify-around">
                  <div className="text-center"><p className="text-3xl font-[1000] italic text-[#212529]">{piloto.totalEntregas || 0}</p><p className="text-[9px] font-bold text-[#495057] uppercase tracking-widest mt-1">Entregas</p></div>
                  <div className="w-px bg-[#E2E8F0]" />
                  <div className="text-center"><p className="text-3xl font-[1000] italic text-[#82C91E]">{piloto.statusAprovacao === 'APROVADO' ? '100' : '0'}%</p><p className="text-[9px] font-bold text-[#495057] uppercase tracking-widest mt-1">Aprovação</p></div>
               </div>
            </div>
          </div>
        )}

        {/* ABA: CHAT */}
        {abaAtiva === 'CHAT' && (
          <div className="flex flex-col h-full pt-4">
            <h2 className="text-3xl font-[1000] italic uppercase mb-6 tracking-tighter text-[#212529]">Central</h2>
            <div className="flex-1 rounded-[32px] border border-[#E2E8F0] bg-white overflow-hidden flex flex-col shadow-[0_12px_24px_rgba(0,0,0,0.06)] relative">
              <div className="flex-1 p-5 overflow-y-auto space-y-4 custom-scrollbar">
                {chatMsgs.length === 0 && <div className="h-full flex flex-col justify-center items-center opacity-30"><Lucide.MessageSquare size={40} className="mb-4 text-[#ADB5BD]"/><p className="text-[10px] font-black uppercase tracking-widest text-[#495057]">Nenhuma mensagem.</p></div>}
                {chatMsgs.map(m => (
                  <div key={m.id} className={`flex flex-col max-w-[85%] ${m.remetente === 'PILOTO' ? 'self-end items-end' : 'self-start items-start'}`}>
                    <div className={`p-4 text-[11px] font-bold tracking-wide ${m.remetente === 'PILOTO' ? 'bg-[#EAFDF1] text-[#212529] rounded-2xl rounded-br-sm border border-[#DCFCE7]' : 'bg-[#F1F3F5] text-[#212529] rounded-2xl rounded-bl-sm border border-[#E2E8F0]'}`}>{m.texto}</div>
                  </div>
                ))}
              </div>
              <form onSubmit={enviarMsgChat} className="p-6 bg-white border-t border-[#E2E8F0] flex gap-3">
                <input type="text" value={novaMsg} onChange={e=>setNovaMsg(e.target.value)} placeholder="Falar com a base..." className="flex-1 h-16 rounded-[20px] bg-white border border-[#E2E8F0] px-6 text-[#212529] font-bold outline-none focus:border-[#82C91E] placeholder:text-[#ADB5BD] text-sm shadow-inner transition-colors" />
                <button type="submit" className="w-16 h-16 bg-[#82C91E] text-white rounded-[24px] font-[1000] uppercase tracking-[0.2em] text-sm flex items-center justify-center shadow-[0_8px_16px_rgba(130,201,30,0.2)] active:scale-95 transition-transform"><Lucide.Send size={20}/></button>
              </form>
            </div>
          </div>
        )}
      </main>

      {/* MENU LATERAL SLIDE IN (TOTALMENTE ALINHADO AO MOCKUP QUE VOCÊ ENVIOU, MODO CLARO) */}
      <AnimatePresence>
        {menu && (
            <motion.div initial={{ opacity: 0, x: '-100%' }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: '-100%' }} transition={{ type: "spring", damping: 25, stiffness: 200 }} className="absolute inset-0 z-[9999] flex flex-col bg-white">
                <header className="p-8 pt-16 flex items-center gap-4 border-b border-[#E2E8F0] bg-white">
                    <button onClick={() => setMenu(false)} className="p-2 -ml-2 active:scale-95 transition-transform text-[#ADB5BD]"><Lucide.ArrowLeft size={24}/></button>
                    <h2 className="text-xl font-[1000] uppercase italic tracking-tighter text-[#212529]">Menu <span className="text-[#82C91E]">PRO</span></h2>
                </header>

                <div className="flex-1 p-6">
                    <div className="rounded-[32px] overflow-hidden border border-[#E2E8F0] bg-white shadow-[0_12px_24px_rgba(0,0,0,0.06)]">
                        {[ 
                            { id: 'RADAR', l: 'Radar de Cargas', i: Lucide.Radar, c: 'text-[#4B0082]' }, 
                            { id: 'MINHA_ROTA', l: 'Minha Rota', i: Lucide.Navigation, c: 'text-[#4B0082]' }, 
                            { id: 'CARTEIRA', l: 'Financeiro', i: Lucide.Wallet, c: 'text-[#4B0082]' },
                            { id: 'CHAT', l: 'Chat com a Base', i: Lucide.MessageSquare, c: 'text-[#82C91E]' }
                        ].map((item, index) => (
                            <button 
                                key={item.id} 
                                onClick={() => { setAbaNavegacao(item.id); setMenu(false); }} 
                                className={`w-full flex items-center justify-between transition-colors active:bg-[#F1F3F5] p-5
                                ${index !== 3 ? 'border-b border-[#E2E8F0]' : ''}
                                ${abaAtiva === item.id ? 'bg-[#EAFDF1] text-[#212529] font-[1000] shadow-[inset_4px_0_0_0_#82C91E] border border-[#DCFCE7] rounded-none' : 'text-[#495057]'}`}
                            >
                                <div className="flex items-center gap-4">
                                    <item.i size={20} className={abaAtiva === item.id ? 'text-[#82C91E]' : 'text-[#ADB5BD]'} strokeWidth={2.5}/>
                                    <span className="text-[11px] font-[1000] uppercase tracking-widest">{item.l}</span>
                                </div>
                                <Lucide.ChevronRight size={18} className={abaAtiva === item.id ? 'text-[#82C91E]' : 'text-[#ADB5BD]'}/>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="p-6 pb-12">
                    <button onClick={() => auth.signOut()} className="w-full h-14 bg-[#FA5252] text-white rounded-[24px] font-bold uppercase text-xs tracking-widest hover:bg-[#F03E3E] active:scale-95 transition-colors flex justify-center items-center gap-3"><Lucide.LogOut size={18} strokeWidth={2.5}/> Encerrar Sessão</button>
                </div>
            </motion.div>
        )}
      </AnimatePresence>

      {/* NAVEGAÇÃO INFERIOR FLOATING GLASS (MODO CLARO) */}
      <div className="fixed bottom-6 left-6 right-6 z-[9000]">
        <nav className="h-24 bg-white border border-[#E2E8F0] flex justify-around items-center px-4 rounded-[40px] shadow-[0_16px_32px_rgba(0,0,0,0.06)]">
          {[ { id: 'RADAR', icon: Lucide.Map }, { id: 'CARTEIRA', icon: Lucide.Wallet }, { id: 'CHAT', icon: Lucide.MessageSquare } ].map(i => (
            <button key={i.id} onClick={() => { setAbaNavegacao(i.id); vibrar(20); }} className={`flex flex-col items-center justify-center gap-1.5 w-[72px] h-[72px] rounded-full transition-all ${abaAtiva === i.id ? 'bg-[#82C91E] text-white shadow-lg scale-105 border-0' : 'bg-[#F1F3F5] text-[#ADB5BD] border border-[#E2E8F0]'}`}>
              <i.icon size={22} strokeWidth={abaAtiva === i.id ? 2.5 : 2} />
            </button>
          ))}
        </nav>
      </div>

    </div>
  );
}