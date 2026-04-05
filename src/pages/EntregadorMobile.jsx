import React, { useState, useEffect, useRef } from 'react';
import * as Lucide from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- CAPACITOR (HARDWARE REAL) ---
import { Geolocation } from '@capacitor/geolocation';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { App } from '@capacitor/app';
import { Network } from '@capacitor/network';
import { PushNotifications } from '@capacitor/push-notifications';
import { registerPlugin } from '@capacitor/core';
import { Howl } from 'howler';

const BackgroundGeolocation = registerPlugin('BackgroundGeolocation');

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

// Cores Oficiais App Fluido
const BRAND_RED = "#EA1D2C";
const TEXT_DARK = "#3E3E3E";
const TEXT_MUTED = "#717171";
const BG_APP = "#F7F7F7";
const BG_INPUT = "#F2F2F2";

const UTILS = {
  formatarDinheiro: (v) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v || 0),
  mascararCPF: (v) => v.replace(/\D/g, '').slice(0, 11).replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "$1.$2.$3-$4"),
  limparDados: (v) => v.replace(/\D/g, ''),
  abrirMaps: (l) => window.open(`http://googleusercontent.com/maps.google.com/maps?q=${encodeURIComponent(`${l.rua}, ${l.numero} - ${l.bairro}`)}`, '_system'),
  abrirZap: (tel, nome) => window.open(`https://wa.me/55${tel?.replace(/\D/g, '')}?text=${encodeURIComponent(`Olá ${nome}, aqui é o entregador! Estou a caminho.`)}`, '_blank'),
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
// 2. COMPONENTE DE LOADING FLUIDO
// ==========================================
const Loader = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[9999] bg-black/20 backdrop-blur-[2px] flex flex-col items-center justify-center">
    <div className="bg-white p-6 rounded-2xl shadow-lg flex flex-col items-center">
        <div className="w-8 h-8 border-4 border-gray-200 border-t-[#EA1D2C] rounded-full animate-spin mb-3" />
        <p className="text-[#717171] font-medium text-xs">Aguarde...</p>
    </div>
  </motion.div>
);

// ==========================================
// 3. APLICATIVO PRINCIPAL (MODERNO E FLUIDO)
// ==========================================
export default function AppEntregadorFluido() {
  const [isProcessando, setIsProcessando] = useState(true);
  const [etapa, setEtapa] = useState('AUTH'); 
  const [abaAtiva, setAbaNavegacao] = useState('RADAR'); 
  const [temInternet, setTemInternet] = useState(true);
  
  const [isLoginModo, setIsLoginModo] = useState(true);
  const [piloto, setPiloto] = useState(null);
  const [form, setForm] = useState({ cpf: '', senha: '', nome: '', veiculo: 'MOTO', placa: '', telefone: '' });
  
  const [isOnline, setIsOnline] = useState(false);
  const [ofertaLeilao, setOfertaLeilao] = useState(null);
  const [pedidoAtivo, setPedidoAtivo] = useState(null);

  const watchGpsRef = useRef(null);
  const audioAlarmeRef = useRef(null);

  const vibrar = (padrao = 50) => { if (navigator.vibrate) navigator.vibrate(padrao); };

  // ==========================================
  // INICIALIZAÇÃO DE HARDWARE E SESSÃO
  // ==========================================
  useEffect(() => {
    audioAlarmeRef.current = new Howl({ src: [SOUND_ALARM], loop: true, volume: 1.0 });

    Network.getStatus().then(status => setTemInternet(status.connected));
    Network.addListener('networkStatusChange', status => setTemInternet(status.connected));

    const registarPush = async () => {
      let permStatus = await PushNotifications.checkPermissions();
      if (permStatus.receive === 'prompt') permStatus = await PushNotifications.requestPermissions();
      if (permStatus.receive === 'granted') await PushNotifications.register();
    };
    registarPush().catch(() => {});

    PushNotifications.addListener('registration', (token) => {
      if (piloto?.id) updateDoc(doc(db, "entregadores", piloto.id), { fcmToken: token.value }).catch(()=>{});
    });

    const cpfSalvo = localStorage.getItem('@UP:cpf');
    if (cpfSalvo) {
      getDoc(doc(db, "entregadores", cpfSalvo)).then(s => {
        if (s.exists()) { setPiloto({ id: s.id, ...s.data() }); setEtapa('APP'); }
        setIsProcessando(false);
      });
    } else { setIsProcessando(false); }

    App.addListener('backButton', () => {
      if (pedidoAtivo) alert("Finalize a corrida atual antes de sair.");
      else App.exitApp();
    });

    return () => { Network.removeAllListeners(); };
  }, [pedidoAtivo, piloto?.id]);

  // ==========================================
  // AUTENTICAÇÃO
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
        } else { alert("Dados incorretos."); }
      } else {
        if (snap.exists()) { alert("CPF já cadastrado."); }
        else {
          await setDoc(docRef, {
            nome: form.nome, telefone: UTILS.limparDados(form.telefone), senha: form.senha, 
            veiculo: form.veiculo, placa: form.placa, statusAprovacao: 'PENDENTE',
            ganhosTaxas: 0, debitosLoja: 0, saldoLiquido: 0, createdAt: serverTimestamp(), cpf: cpfLimpo, email: emailStr
          });
          const cred = await createUserWithEmailAndPassword(auth, emailStr, form.senha);
          await updateDoc(docRef, { uid: cred.user.uid });
          alert("Cadastro enviado. Aguarde liberação.");
          setIsLoginModo(true);
        }
      }
    } catch (err) { alert("Erro de rede."); } finally { setIsProcessando(false); }
  };

  // ==========================================
  // ESCUTA ATIVA DO FIREBASE
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
          setOfertaLeilao(p); audioAlarmeRef.current?.play(); vibrar([200, 100, 200]);
        }
      } else { setOfertaLeilao(null); audioAlarmeRef.current?.stop(); }
    });

    const unsubAtivo = onSnapshot(query(collection(db, "pedidos"), where("entregadorId", "==", piloto.id), where("status", "in", ["A_CAMINHO_LOJA", "AGUARDANDO_COLETA", "SAIU_ENTREGA", "ENTREGADOR_NO_LOCAL"])), (snap) => {
      if (!snap.empty) setPedidoAtivo({ id: snap.docs[0].id, ...snap.docs[0].data() });
      else setPedidoAtivo(null);
    });

    return () => { unsubPerfil(); unsubLeilao(); unsubAtivo(); };
  }, [piloto, isOnline, pedidoAtivo, etapa]);

  // ==========================================
  // OPERACIONAL
  // ==========================================
  const toggleStatus = async () => {
    setIsProcessando(true);
    try {
      if (!isOnline) {
        if (piloto.statusAprovacao !== 'APROVADO') { alert("Seu perfil está em análise."); setIsProcessando(false); return; }
        await Geolocation.requestPermissions();
        
        BackgroundGeolocation.addWatcher(
            { backgroundMessage: "App rodando", backgroundTitle: "Buscando Entregas", requestPermissions: true, stale: false, distanceFilter: 10 },
            (location, error) => { if (!error) updateDoc(doc(db, "entregadores", piloto.id), { coords: { lat: location.latitude, lng: location.longitude } }).catch(()=>{}); }
        ).then(id => { watchGpsRef.current = id; });

        setIsOnline(true);
        await updateDoc(doc(db, "entregadores", piloto.id), { status: 'Livre' });
        Haptics.impact({ style: ImpactStyle.Heavy });
      } else {
        setIsOnline(false); setOfertaLeilao(null); audioAlarmeRef.current?.stop();
        if (watchGpsRef.current) BackgroundGeolocation.removeWatcher({ id: watchGpsRef.current });
        await updateDoc(doc(db, "entregadores", piloto.id), { status: 'Offline' });
        Haptics.impact({ style: ImpactStyle.Light });
      }
    } catch(e) { alert("Libere o GPS para ficar online."); } finally { setIsProcessando(false); }
  };

  const aceitarLeilao = async () => {
    if (!ofertaLeilao) return; setIsProcessando(true);
    try {
      audioAlarmeRef.current?.stop();
      await updateDoc(doc(db, "pedidos", ofertaLeilao.id), { 
        status: 'A_CAMINHO_LOJA', entregadorId: piloto.id,
        nomeEntregador: (piloto?.nome || 'Entregador').split(' ')[0], 
        veiculoEntregador: piloto?.veiculo || 'Moto', telefoneEntregador: piloto?.telefone || '',
        horarioAceite: serverTimestamp() 
      });
      setOfertaLeilao(null); vibrar();
    } catch(e) { alert("Outro entregador pegou essa rota."); setOfertaLeilao(null); } finally { setIsProcessando(false); }
  };

  const recusarLeilao = async () => {
    audioAlarmeRef.current?.stop(); vibrar();
    if (ofertaLeilao) await updateDoc(doc(db, "pedidos", ofertaLeilao.id), { entregadoresRecusaram: increment(piloto.id) }).catch(()=>{});
    setOfertaLeilao(null);
  };

  const mudarStatusRota = async (novoStatus) => {
    setIsProcessando(true); vibrar();
    try { await updateDoc(doc(db, "pedidos", pedidoAtivo.id), { status: novoStatus }); } 
    catch(e) { alert("Sem conexão."); } finally { setIsProcessando(false); }
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
    } catch (e) { alert("Erro ao concluir pedido."); } finally { setIsProcessando(false); }
  };

  // ==========================================
  // ESTILOS NATIVOS E FLUIDOS
  // ==========================================
  const inputModerno = "w-full h-14 rounded-xl bg-[#F2F2F2] px-4 text-[#3E3E3E] font-medium outline-none focus:bg-white focus:ring-1 focus:ring-[#EA1D2C] transition-all placeholder:text-[#717171]";
  const btnPrimario = "w-full h-14 bg-[#EA1D2C] text-white rounded-xl font-bold text-[15px] flex items-center justify-center gap-2";
  const btnSecundario = "w-full h-14 bg-[#F2F2F2] text-[#3E3E3E] rounded-xl font-bold text-[15px] flex items-center justify-center gap-2";

  // ==========================================
  // RENDER: TELA DE AUTH (LIMPA E MODERNA)
  // ==========================================
  if (etapa === 'AUTH') {
    return (
      <div className="min-h-[100dvh] flex flex-col font-sans bg-white relative">
        <AnimatePresence>{isProcessando && <Loader />}</AnimatePresence>
        
        <div className="h-[40vh] w-full relative">
          <img src={IMG_WELCOME} alt="Header" className="w-full h-full object-cover object-top" />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
        </div>

        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="flex-1 bg-white px-6 pb-8 relative z-10 -mt-10 rounded-t-[24px] pt-8 flex flex-col">
          <div className="text-left mb-6">
            <h1 className="text-2xl font-bold text-[#3E3E3E] mb-1">Para Entregadores</h1>
            <p className="text-[#717171] text-sm">{isLoginModo ? 'Faça login para começar a rodar' : 'Cadastre-se e ganhe dinheiro'}</p>
          </div>

          <form onSubmit={handleAuth} className="space-y-4 flex-1">
            {!isLoginModo && <input type="text" placeholder="Nome completo" value={form.nome} onChange={e=>setForm({...form, nome: e.target.value})} className={inputModerno} required />}
            <input type="tel" placeholder="Seu CPF" value={UTILS.mascararCPF(form.cpf)} onChange={e=>setForm({...form, cpf: e.target.value})} maxLength={14} className={inputModerno} required />
            {!isLoginModo && <input type="tel" placeholder="Celular / WhatsApp" value={form.telefone} onChange={e=>setForm({...form, telefone: e.target.value})} className={inputModerno} required />}
            <input type="password" placeholder="Senha" value={form.senha} onChange={e=>setForm({...form, senha: e.target.value})} className={inputModerno} required />
            {!isLoginModo && <input type="text" placeholder="Placa da Moto (ex: ABC1D23)" value={form.placa} onChange={e=>setForm({...form, placa: e.target.value.toUpperCase()})} className={`${inputModerno} uppercase`} required />}
            
            <div className="pt-2">
              <motion.button whileTap={{ scale: 0.97 }} type="submit" className={btnPrimario}>{isLoginModo ? 'Entrar' : 'Finalizar Cadastro'}</motion.button>
            </div>
          </form>

          <button onClick={() => setIsLoginModo(!isLoginModo)} className="w-full mt-6 text-[#EA1D2C] font-semibold text-sm">
            {isLoginModo ? 'Não tem conta? Cadastre-se aqui' : 'Já possuo conta. Fazer login'}
          </button>
        </motion.div>
      </div>
    );
  }

  // ==========================================
  // RENDER: APP PRINCIPAL (FLUIDO & ESTILO iFOOD)
  // ==========================================
  return (
    <div className="flex flex-col h-[100dvh] w-full font-sans relative bg-[#F7F7F7] text-[#3E3E3E] overflow-hidden">
      {!temInternet && (
          <motion.div initial={{ y: -50 }} animate={{ y: 0 }} className="absolute top-0 z-[10000] w-full bg-[#EA1D2C] text-white text-center py-2 font-semibold text-[11px] shadow-sm">
              Sem conexão de internet
          </motion.div>
      )}
      
      <AnimatePresence>{isProcessando && <Loader />}</AnimatePresence>

      {/* MODAL DE NOVA CORRIDA (BOTTOM SHEET FLUIDO) */}
      <AnimatePresence>
        {ofertaLeilao && !pedidoAtivo && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[9998] bg-black/40" onClick={recusarLeilao} />
            <motion.div 
              initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed bottom-0 left-0 right-0 z-[9999] bg-white rounded-t-[24px] p-6 pb-safe shadow-2xl flex flex-col"
            >
              <div className="w-12 h-1.5 bg-[#F2F2F2] rounded-full mx-auto mb-6" />
              
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-xl text-[#3E3E3E]">Nova Entrega</h3>
                <div className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center animate-pulse"><Lucide.BellRing size={20} className="text-[#EA1D2C]" /></div>
              </div>
              
              <div className="bg-[#F7F7F7] p-5 rounded-2xl mb-6 flex justify-between items-center">
                <div>
                  <p className="text-[#717171] text-xs font-medium mb-1">Valor estimado</p>
                  <p className="text-3xl font-bold text-[#3E3E3E]">R$ {ofertaLeilao.valores?.taxaEntrega?.toFixed(2)}</p>
                </div>
              </div>

              <div className="space-y-5 mb-8 relative">
                <div className="flex items-start gap-4">
                  <div className="mt-0.5"><Lucide.Store size={20} className="text-[#EA1D2C]"/></div>
                  <div><p className="font-bold text-[15px] text-[#3E3E3E]">Rodrigues Matriz</p><p className="text-[#717171] text-xs mt-0.5">Retirada</p></div>
                </div>
                
                <div className="absolute left-[9px] top-6 bottom-6 w-0.5 bg-[#F2F2F2]" />
                
                <div className="flex items-start gap-4">
                  <div className="mt-0.5 bg-white"><Lucide.MapPin size={20} className="text-[#717171]"/></div>
                  <div><p className="font-bold text-[15px] text-[#3E3E3E]">{ofertaLeilao.endereco?.bairro}</p><p className="text-[#717171] text-xs mt-0.5">Entrega</p></div>
                </div>
              </div>

              <div className="flex gap-4">
                <motion.button whileTap={{ scale: 0.95 }} onClick={recusarLeilao} className="w-[30%] h-14 bg-[#F2F2F2] text-[#717171] rounded-xl font-bold text-sm">Passar</motion.button>
                <motion.button whileTap={{ scale: 0.95 }} onClick={aceitarLeilao} className="w-[70%] h-14 bg-[#EA1D2C] text-white rounded-xl font-bold text-base shadow-lg shadow-red-500/20">Aceitar Pedido</motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* HEADER LIMPO E FUNCIONAL */}
      <header className="px-5 pt-12 pb-4 bg-white border-b border-[#F2F2F2] flex justify-between items-center z-50">
        <div>
          <p className="text-[#717171] text-[11px] font-medium uppercase tracking-wide">Bem-vindo(a),</p>
          <h1 className="font-bold text-[19px] text-[#3E3E3E] leading-tight">{(piloto?.nome || 'Entregador').split(' ')[0]}</h1>
        </div>
        <button onClick={toggleStatus} className={`px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2 transition-all ${isOnline ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
          <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-500' : 'bg-gray-400'}`} />
          {isOnline ? 'Online' : 'Ficar Online'}
        </button>
      </header>

      {/* ÁREA PRINCIPAL COM TRANSIÇÕES SUAVES */}
      <main className="flex-1 overflow-y-auto pb-[90px] relative">
        <AnimatePresence mode="wait">
          
          {abaAtiva === 'RADAR' && (
            <motion.div key="radar" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }} className="h-full p-4 flex flex-col">
              {!pedidoAtivo ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
                  <div className="mb-6 relative">
                    {isOnline ? (
                      <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center relative">
                          <motion.div animate={{ scale: [1, 1.5], opacity: [0.3, 0] }} transition={{ repeat: Infinity, duration: 1.5 }} className="absolute inset-0 bg-[#EA1D2C] rounded-full" />
                          <Lucide.MapPin size={36} className="text-[#EA1D2C] relative z-10" />
                      </div>
                    ) : (
                      <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center">
                          <Lucide.Moon size={36} className="text-[#717171]" />
                      </div>
                    )}
                  </div>
                  <h2 className="text-[22px] font-bold text-[#3E3E3E] mb-2">{isOnline ? 'Buscando entregas' : 'Você está offline'}</h2>
                  <p className="text-[15px] text-[#717171] mb-8">{isOnline ? 'Deixe o app aberto ou em segundo plano.' : 'Fique online para receber novos pedidos.'}</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="bg-white rounded-2xl p-5 border border-[#F2F2F2] shadow-sm">
                    <div className="flex justify-between items-start mb-5 pb-5 border-b border-[#F2F2F2]">
                      <div>
                        <p className="text-[#717171] text-xs font-medium">Pedido #{pedidoAtivo.id.slice(-4)}</p>
                        <p className="font-bold text-[#EA1D2C] text-sm mt-0.5">{pedidoAtivo.status.replace(/_/g, ' ')}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[#717171] text-xs font-medium">Valor</p>
                        <p className="font-bold text-[#3E3E3E] text-lg">R$ {pedidoAtivo.valores?.total?.toFixed(2)}</p>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <div className="flex items-start gap-3 mb-4">
                        <Lucide.User size={18} className="text-[#717171] mt-0.5" />
                        <div><p className="font-bold text-[#3E3E3E]">{pedidoAtivo.cliente?.nome}</p><p className="text-xs text-[#717171] mt-0.5">Cliente</p></div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Lucide.MapPin size={18} className="text-[#717171] mt-0.5" />
                        <div><p className="font-bold text-[#3E3E3E]">{pedidoAtivo.endereco?.rua}, {pedidoAtivo.endereco?.numero}</p><p className="text-xs text-[#717171] mt-0.5">{pedidoAtivo.endereco?.bairro}</p></div>
                      </div>
                    </div>
                    
                    <div className="flex gap-3 mb-5">
                      <motion.button whileTap={{ scale: 0.95 }} onClick={() => UTILS.abrirMaps(pedidoAtivo.endereco)} className="flex-1 h-12 bg-[#F2F2F2] text-[#3E3E3E] rounded-xl font-bold text-[13px] flex items-center justify-center gap-2"><Lucide.Navigation size={16}/> Navegar</motion.button>
                      <motion.button whileTap={{ scale: 0.95 }} onClick={() => UTILS.abrirZap(pedidoAtivo.cliente?.telefone, pedidoAtivo.cliente?.nome)} className="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center"><Lucide.MessageCircle size={20}/></motion.button>
                    </div>

                    {pedidoAtivo.status === 'A_CAMINHO_LOJA' && <motion.button whileTap={{ scale: 0.97 }} onClick={() => mudarStatusRota('AGUARDANDO_COLETA')} className={btnPrimario}>Cheguei no local de coleta</motion.button>}
                    {pedidoAtivo.status === 'AGUARDANDO_COLETA' && <motion.button whileTap={{ scale: 0.97 }} onClick={() => mudarStatusRota('SAIU_ENTREGA')} className={btnPrimario}>Retirei o pedido</motion.button>}
                    {pedidoAtivo.status === 'SAIU_ENTREGA' && <motion.button whileTap={{ scale: 0.97 }} onClick={() => mudarStatusRota('ENTREGADOR_NO_LOCAL')} className={btnPrimario}>Cheguei no cliente</motion.button>}
                    {pedidoAtivo.status === 'ENTREGADOR_NO_LOCAL' && <motion.button whileTap={{ scale: 0.97 }} onClick={finalizarCorrida} className={btnPrimario}><Lucide.Camera size={18}/> Tirar foto e finalizar</motion.button>}
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {abaAtiva === 'CARTEIRA' && (
            <motion.div key="carteira" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }} className="h-full p-4 flex flex-col">
              <h2 className="text-[22px] font-bold text-[#3E3E3E] mb-4">Repasses e Ganhos</h2>
              
              <div className="bg-white rounded-2xl p-6 mb-4 border border-[#F2F2F2] shadow-sm">
                <p className="text-[#717171] text-[13px] font-medium mb-1">Ganho Líquido</p>
                <p className="text-4xl font-bold text-[#3E3E3E] mb-6">{UTILS.formatarDinheiro(piloto?.saldoLiquido)}</p>
                
                <div className="bg-[#F7F7F7] p-4 rounded-xl flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-green-500"/><span className="text-sm font-medium text-[#717171]">Taxas (Seu lucro)</span></div>
                  <span className="font-bold text-[#3E3E3E]">{UTILS.formatarDinheiro(piloto?.ganhosTaxas)}</span>
                </div>
                
                <div className="bg-red-50 p-4 rounded-xl flex justify-between items-center">
                  <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#EA1D2C]"/><span className="text-sm font-medium text-[#717171]">Débitos (Pagar loja)</span></div>
                  <span className="font-bold text-[#EA1D2C]">{UTILS.formatarDinheiro(piloto?.debitosLoja)}</span>
                </div>
              </div>
              
              <div className="bg-white rounded-2xl border border-[#F2F2F2] p-5 shadow-sm flex items-center justify-between">
                <div><p className="text-[22px] font-bold text-[#3E3E3E]">{piloto?.totalEntregas || 0}</p><p className="text-[#717171] text-xs font-medium">Entregas concluídas</p></div>
                <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center"><Lucide.CheckCircle size={24} className="text-green-500" /></div>
              </div>
            </motion.div>
          )}

          {abaAtiva === 'PERFIL' && (
            <motion.div key="perfil" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }} className="h-full p-4 flex flex-col">
              <h2 className="text-[22px] font-bold text-[#3E3E3E] mb-4">Minha Conta</h2>
              
              <div className="bg-white rounded-2xl border border-[#F2F2F2] overflow-hidden shadow-sm">
                <div className="p-5 border-b border-[#F2F2F2] flex items-center gap-4">
                  <div className="w-14 h-14 bg-[#F2F2F2] rounded-full flex items-center justify-center"><Lucide.User size={24} className="text-[#717171]" /></div>
                  <div><p className="font-bold text-[#3E3E3E] text-lg">{piloto?.nome}</p><p className="text-[13px] text-[#717171]">CPF: {UTILS.mascararCPF(piloto?.cpf || '')}</p></div>
                </div>
                <div className="p-2">
                  <button className="w-full flex items-center justify-between p-4 text-left active:bg-[#F7F7F7] transition-colors rounded-xl">
                    <div className="flex items-center gap-3"><Lucide.MessageSquare size={20} className="text-[#717171]"/> <span className="font-medium text-[#3E3E3E]">Ajuda e Suporte</span></div>
                    <Lucide.ChevronRight size={18} className="text-[#717171]"/>
                  </button>
                  <button onClick={() => { auth.signOut(); localStorage.removeItem('@UP:cpf'); setEtapa('AUTH'); }} className="w-full flex items-center justify-between p-4 text-left active:bg-red-50 transition-colors rounded-xl">
                    <div className="flex items-center gap-3"><Lucide.LogOut size={20} className="text-[#EA1D2C]"/> <span className="font-medium text-[#EA1D2C]">Sair do aplicativo</span></div>
                  </button>
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* BARRA DE NAVEGAÇÃO INFERIOR FIXA E LIMPA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#E5E5E5] px-6 pb-safe z-[9000]">
        <nav className="flex justify-between items-center h-[72px]">
          {[ 
            { id: 'RADAR', label: 'Início', icon: Lucide.Home }, 
            { id: 'CARTEIRA', label: 'Ganhos', icon: Lucide.Wallet }, 
            { id: 'PERFIL', label: 'Perfil', icon: Lucide.User } 
          ].map(i => (
            <motion.button whileTap={{ scale: 0.9 }} key={i.id} onClick={() => { setAbaNavegacao(i.id); vibrar(15); }} className="flex flex-col items-center justify-center gap-1 w-20 h-full transition-colors">
              <i.icon size={24} className={abaAtiva === i.id ? 'text-[#3E3E3E]' : 'text-[#A6A6A6]'} strokeWidth={abaAtiva === i.id ? 2.5 : 2} />
              <span className={`text-[11px] font-medium ${abaAtiva === i.id ? 'text-[#3E3E3E]' : 'text-[#A6A6A6]'}`}>{i.label}</span>
            </motion.button>
          ))}
        </nav>
      </div>

    </div>
  );
}