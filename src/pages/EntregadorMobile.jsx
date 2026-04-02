/**
 * ============================================================================
 * UP! ENTREGAS - MOBILE V1.0 "PRO EDITION"
 * Lotes Inteligentes, DRE Transparente e UX Nativa
 * ============================================================================
 */

import React, { useEffect, useState, memo } from 'react';
import { db } from '../services/firebase'; 
import { collection, query, onSnapshot, doc, updateDoc, serverTimestamp, getDoc, where, orderBy, limit } from "firebase/firestore";
import * as Lucide from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Haptics, ImpactStyle, NotificationType } from '@capacitor/haptics';
import { Capacitor, registerPlugin } from '@capacitor/core';
import { MapContainer, TileLayer, Marker, Circle, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Howl } from 'howler';

const BackgroundGeolocation = registerPlugin('BackgroundGeolocation');

// ============================================================================
// ASSETS E SINGLETONS DE ALTA PERFORMANCE
// ============================================================================
const LOGO_UP = "https://res.cloudinary.com/dbd9x1o02/image/upload/v1775028310/rodrigues_geral/cffexfjiihcqhpoxanyo.png";

const somAlertaPro = new Howl({
    src: ['/notification_sound.mp3'], 
    loop: true,
    volume: 1.0,
    html5: true,
    pool: 1
});

const driverIcon = new L.DivIcon({
    className: 'driver-icon-pulse',
    html: `<div class="bg-[#EA1D2C] w-10 h-10 rounded-full border-4 border-white shadow-[0_0_20px_rgba(234,29,44,0.8)] flex items-center justify-center text-white text-xl animate-bounce">🛵</div>`,
    iconSize: [40, 40],
    iconAnchor: [20, 20]
});

const formatarMoeda = (v) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v || 0);

const MapLogic = ({ center }) => {
    const map = useMap();
    useEffect(() => { if (center) map.flyTo([center.lat, center.lng], 16, { duration: 1.5 }); }, [center, map]);
    return null;
};

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================
export default function AppEntregadorPro() {
    const [tema, setTema] = useState(() => localStorage.getItem('@UP:tema') || 'dark');
    const [entregador, setEntregador] = useState(null); 
    const [minhasCoords, setMinhasCoords] = useState(null);
    const [aba, setAba] = useState('RADAR'); 
    const [isOnline, setIsOnline] = useState(false);
    
    // Gestão de Pedidos (Lotes e Mochila)
    const [ofertaLote, setOfertaLote] = useState([]); 
    const [mochila, setMochila] = useState([]);
    const [hist, setHist] = useState([]);
    
    const [loading, setLoading] = useState(true);
    const [modoAuth, setModoAuth] = useState('CPF'); 
    const [processando, setProcessando] = useState(false);
    const [formLogin, setFormLogin] = useState({ cpf: '', senha: '' });

    // --- SETUP: TEMA E FONTE BLINDADA ---
    useEffect(() => {
        const root = window.document.documentElement;
        tema === 'dark' ? root.classList.add('dark') : root.classList.remove('dark');
        root.style.fontSize = '16px'; 
        localStorage.setItem('@UP:tema', tema);
    }, [tema]);

    // --- SETUP: SINCRONIZAÇÃO DE SESSÃO ---
    useEffect(() => {
        const cpf = localStorage.getItem('@UP:cpf');
        if (!cpf) { setLoading(false); return; }

        return onSnapshot(doc(db, "entregadores", cpf), (s) => {
            if (s.exists()) {
                const d = s.data();
                setEntregador({id: s.id, ...d});
                setIsOnline(d.status !== 'Offline');
                if (d.statusAprovacao !== 'APROVADO') setModoAuth('AGUARDANDO_APROVACAO');
            } else { 
                localStorage.removeItem('@UP:cpf');
                setLoading(false); 
            }
            setLoading(false);
        });
    }, []);

    // --- MOTOR LOGÍSTICO: OFERTAS EM LOTE E MOCHILA ---
    useEffect(() => {
        if(!entregador || !isOnline) return;
        
        // Escuta ofertas direcionadas a este piloto (pode ser 1 ou várias agrupadas)
        const qOfertas = query(collection(db, "pedidos"), where("statusDespacho", "==", "OFERTA_INDIVIDUAL"), where("entregadorAtualOferta", "==", entregador.id));
        const unsubOfertas = onSnapshot(qOfertas, (s) => {
            if(!s.empty) {
                const lotes = s.docs.map(d => ({id: d.id, ...d.data()}));
                setOfertaLote(lotes);
                if (!somAlertaPro.playing()) somAlertaPro.play();
                Haptics.notification({ type: NotificationType.Warning });
            } else {
                setOfertaLote([]);
                somAlertaPro.stop();
            }
        });

        // Escuta os pedidos que já estão com o piloto (Mochila)
        const qMochila = query(collection(db, "pedidos"), where("entregadorId", "==", entregador.id), where("status", "in", ["A_CAMINHO_LOJA", "NA_LOJA", "SAIU_ENTREGA"]));
        const unsubMochila = onSnapshot(qMochila, s => setMochila(s.docs.map(d => ({id: d.id, ...d.data()}))));

        return () => { unsubOfertas(); unsubMochila(); somAlertaPro.stop(); };
    }, [isOnline, entregador]);

    // --- MOTOR FINANCEIRO: HISTÓRICO ---
    useEffect(() => {
        if(!entregador || aba !== 'GANHOS') return;
        const qH = query(collection(db, "pedidos"), where("entregadorId", "==", entregador.id), where("status", "==", "CONCLUIDO"), orderBy("horarioConcluido", "desc"), limit(30));
        return onSnapshot(qH, s => setHist(s.docs.map(d => ({id: d.id, ...d.data()}))));
    }, [entregador, aba]);

    // --- MOTOR DE GPS SEGUNDO PLANO ---
    useEffect(() => {
        if(isOnline && entregador) {
            if (Capacitor.getPlatform() === 'web') {
                const id = navigator.geolocation.watchPosition(p => setMinhasCoords({lat: p.coords.latitude, lng: p.coords.longitude}), null, {enableHighAccuracy: true});
                return () => navigator.geolocation.clearWatch(id);
            } else {
                BackgroundGeolocation.addWatcher({
                    backgroundMessage: "Conectado à Torre Rodrigues.",
                    backgroundTitle: "UP! Entregas Ativo",
                    requestImmediateLocation: true, distanceFilter: 10
                }, (loc) => {
                    if (loc) {
                        const coords = {lat: loc.latitude, lng: loc.longitude};
                        setMinhasCoords(coords);
                        updateDoc(doc(db, "entregadores", entregador.id), { coords, ultimaAtualizacao: serverTimestamp() }).catch(()=>{});
                    }
                });
                return () => BackgroundGeolocation.removeWatcher();
            }
        }
    }, [isOnline, entregador]);

    // --- AÇÕES TÁTICAS ---
    const handleLogin = async (e) => {
        e.preventDefault();
        setProcessando(true);
        const cpf = formLogin.cpf.replace(/\D/g, '');
        const snap = await getDoc(doc(db, "entregadores", cpf));

        if (snap.exists() && snap.data().senha === formLogin.senha) {
            localStorage.setItem('@UP:cpf', cpf);
            window.location.reload();
        } else {
            Haptics.notification({ type: NotificationType.Error });
            alert("Acesso Negado. Verifique as credenciais.");
        }
        setProcessando(false);
    };

    const aceitarLote = async () => {
        Haptics.impact({ style: ImpactStyle.Heavy });
        // Aceita todos os pedidos do lote de uma vez
        const promessas = ofertaLote.map(pedido => 
            updateDoc(doc(db, "pedidos", pedido.id), { status: 'A_CAMINHO_LOJA', entregadorId: entregador.id, statusDespacho: 'Em Rota' })
        );
        await Promise.all(promessas);
        setOfertaLote([]);
        somAlertaPro.stop();
    };

    // ========================================================================
    // RENDERIZAÇÃO DE UI
    // ========================================================================
    if (loading) return <div className="h-screen bg-zinc-950 flex items-center justify-center"><div className="w-12 h-12 border-4 border-[#82C91E] border-t-transparent rounded-full animate-spin"/></div>;

    if (!entregador || modoAuth === 'AGUARDANDO_APROVACAO') {
        return (
            <div className="h-screen bg-[#4B0082] flex flex-col font-['Montserrat'] overflow-hidden">
                <div className="p-12 flex justify-center">
                    <img src={LOGO_UP} className="w-32 drop-shadow-2xl" alt="UP Entregas" />
                </div>
                <motion.div initial={{ y: 500 }} animate={{ y: 0 }} className="flex-1 bg-white dark:bg-zinc-900 rounded-t-[4rem] p-10 shadow-2xl flex flex-col justify-center">
                    <h1 className="text-3xl font-[1000] text-[#4B0082] dark:text-white uppercase italic tracking-tighter mb-2">Login do <span className="text-[#82C91E]">Piloto</span></h1>
                    <form onSubmit={handleLogin} className="space-y-6 mt-8">
                        <input type="tel" value={formLogin.cpf} onChange={e => setFormLogin({...formLogin, cpf: e.target.value})} className="w-full h-16 bg-slate-100 dark:bg-zinc-800 rounded-3xl px-8 font-black text-lg outline-none focus:border-[#4B0082] dark:text-white transition-all border-4 border-transparent" placeholder="CPF" />
                        <input type="password" value={formLogin.senha} onChange={e => setFormLogin({...formLogin, senha: e.target.value})} className="w-full h-16 bg-slate-100 dark:bg-zinc-800 rounded-3xl px-8 font-black text-lg outline-none focus:border-[#4B0082] dark:text-white transition-all border-4 border-transparent" placeholder="Senha" />
                        <button type="submit" disabled={processando} className="w-full py-6 bg-[#EA1D2C] text-white rounded-[2.5rem] font-[1000] uppercase italic text-sm shadow-xl active:scale-95 transition-all">Acessar Sistema</button>
                    </form>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="h-screen w-full flex flex-col font-['Montserrat'] overflow-hidden relative bg-slate-100 dark:bg-black">
            
            {/* MAPA DE FUNDO */}
            <div className="absolute inset-0 z-0">
                <MapContainer center={[-20.4697, -54.6201]} zoom={15} zoomControl={false} style={{ height: '100%' }}>
                    <TileLayer url={tema === 'dark' ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" : "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"} />
                    {minhasCoords && (
                        <>
                            <Marker position={[minhasCoords.lat, minhasCoords.lng]} icon={driverIcon} />
                            <Circle center={[minhasCoords.lat, minhasCoords.lng]} radius={150} pathOptions={{ color: '#EA1D2C', fillOpacity: 0.1, weight: 1 }} />
                            <MapLogic center={minhasCoords} />
                        </>
                    )}
                </MapContainer>
            </div>

            {/* HEADER NATIVO */}
            <header className="absolute top-0 w-full p-6 flex justify-between items-start z-[1000] pointer-events-none mt-[env(safe-area-inset-top)]">
                <div className="bg-zinc-900/90 backdrop-blur-xl p-2 pr-6 rounded-full shadow-2xl flex items-center gap-3 pointer-events-auto border border-zinc-800">
                    <div className="w-12 h-12 rounded-full border-2 border-[#82C91E] overflow-hidden bg-white">
                        <img src={entregador.urlPerfil || LOGO_UP} className="w-full h-full object-cover" />
                    </div>
                    <div>
                        <p className={`text-[8px] font-black uppercase tracking-widest ${isOnline ? 'text-[#82C91E]' : 'text-slate-500'}`}>{isOnline ? 'Online' : 'Offline'}</p>
                        <p className="text-white text-xs font-[1000] uppercase italic">{entregador.nome.split(' ')[0]}</p>
                    </div>
                </div>
                <button 
                    onClick={() => { setIsOnline(!isOnline); updateDoc(doc(db, "entregadores", entregador.id), { status: !isOnline ? 'Livre' : 'Offline' }); Haptics.impact({ style: ImpactStyle.Heavy }); }}
                    className={`w-16 h-16 rounded-full border-4 shadow-2xl flex items-center justify-center transition-all active:scale-90 pointer-events-auto ${isOnline ? 'bg-[#EA1D2C] border-white text-white' : 'bg-zinc-800 border-zinc-700 text-zinc-500'}`}
                >
                    <Lucide.Power size={28} strokeWidth={4} />
                </button>
            </header>

            {/* FULL-SCREEN TAKEOVER: LOTE DE PEDIDOS */}
            <AnimatePresence>
                {ofertaLote.length > 0 && (
                    <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, y: 1000 }} className="fixed inset-0 z-[5000] bg-[#4B0082] flex flex-col p-8 font-['Montserrat']">
                        <div className="flex-1 flex flex-col items-center justify-center text-center">
                            <div className="relative w-32 h-32 bg-[#82C91E] rounded-full flex items-center justify-center text-[#4B0082] shadow-[0_0_50px_rgba(130,201,30,0.5)] mb-8">
                                <Lucide.PackageOpen size={60} strokeWidth={3} className="relative z-10" />
                                <div className="absolute inset-0 bg-[#82C91E] rounded-full animate-ping opacity-30" />
                            </div>
                            
                            <h2 className="text-white text-4xl font-[1000] uppercase italic tracking-tighter mb-2">
                                {ofertaLote.length > 1 ? `Lote com ${ofertaLote.length} Entregas` : 'Nova Rota'}
                            </h2>
                            <div className="bg-white/10 backdrop-blur-md px-6 py-2 rounded-2xl border border-white/20 mb-8">
                                <p className="text-[#82C91E] text-[10px] font-black uppercase tracking-[0.3em]">
                                    {ofertaLote.length > 1 ? 'Rota Agrupada Otimizada' : ofertaLote[0]?.endereco?.bairro}
                                </p>
                            </div>
                            
                            <div className="space-y-2">
                                <p className="text-white/60 text-[10px] font-black uppercase tracking-widest">Valor Total da Rota</p>
                                <p className="text-white text-7xl font-[1000] italic leading-none">
                                    R$ {ofertaLote.reduce((acc, curr) => acc + (curr.valores?.taxaEntrega || 0), 0).toFixed(2)}
                                </p>
                            </div>
                        </div>

                        <div className="space-y-4 pb-[env(safe-area-inset-bottom)]">
                            <button onClick={aceitarLote} className="w-full py-8 bg-[#82C91E] text-[#4B0082] rounded-[3rem] font-[1000] uppercase italic text-xl shadow-2xl active:scale-95 transition-all">
                                Aceitar Rota Completa
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ÁREAS DE CONTEÚDO (MOCHILA / GANHOS / PERFIL) */}
            <main className="flex-1 relative z-[1000] p-6 pb-32 flex flex-col justify-end pointer-events-none">
                
                {aba === 'RADAR' && mochila.length > 0 && (
                    <div className="pointer-events-auto w-full max-w-md mx-auto space-y-4 max-h-[60vh] overflow-y-auto custom-scrollbar pr-2">
                        <div className="bg-zinc-900/90 backdrop-blur-md px-4 py-2 rounded-xl inline-block border border-zinc-800 shadow-xl mb-2">
                            <span className="text-[10px] font-black text-[#82C91E] uppercase tracking-widest">Sua Mochila ({mochila.length})</span>
                        </div>
                        {mochila.map((p, index) => (
                            <div key={p.id} className="bg-white dark:bg-zinc-900 p-6 rounded-[2rem] shadow-2xl border-l-[8px] border-[#EA1D2C]">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Parada {index + 1}</p>
                                        <h3 className="text-lg font-[1000] text-[#4B0082] dark:text-white uppercase italic leading-tight mt-1">{p.endereco?.rua}, {p.endereco?.numero}</h3>
                                        <p className="text-[10px] font-bold text-slate-500 uppercase mt-1">{p.endereco?.bairro}</p>
                                    </div>
                                    <button onClick={() => window.open(`http://maps.google.com/maps?q=${p.endereco?.lat},${p.endereco?.lng}`)} className="w-12 h-12 bg-slate-100 dark:bg-zinc-800 rounded-2xl flex items-center justify-center text-[#4B0082] dark:text-white shadow-sm active:scale-90">
                                        <Lucide.Navigation size={20} strokeWidth={3}/>
                                    </button>
                                </div>
                                <button className="w-full py-4 bg-[#EA1D2C] text-white rounded-2xl font-[1000] uppercase italic text-xs tracking-widest shadow-lg active:scale-95">
                                    {p.status === 'A_CAMINHO_LOJA' ? 'Cheguei na Loja' : p.status === 'NA_LOJA' ? 'Iniciar Rota' : 'Finalizar Parada'}
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                {aba === 'GANHOS' && (
                    <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} className="bg-white dark:bg-zinc-900 rounded-[3rem] p-8 pointer-events-auto shadow-2xl h-[75vh] w-full max-w-md mx-auto flex flex-col border border-slate-100 dark:border-zinc-800">
                        <h2 className="text-3xl font-[1000] text-[#4B0082] dark:text-white uppercase italic tracking-tighter mb-6">Extrato</h2>
                        
                        {/* PAINEL FINANCEIRO ESTILO NUBANK */}
                        <div className="bg-gradient-to-br from-zinc-900 to-black p-8 rounded-[2.5rem] text-white mb-8 shadow-2xl border border-zinc-800 shrink-0">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <p className="text-[10px] font-black uppercase text-zinc-400 tracking-widest mb-1">Saldo a Receber</p>
                                    <p className="text-5xl font-[1000] italic tracking-tighter text-[#82C91E]">R$ {Math.max(entregador.saldoLiquido || 0, 0).toFixed(2)}</p>
                                </div>
                                <Lucide.TrendingUp size={30} className="text-[#82C91E] opacity-50" />
                            </div>
                            
                            <div className="bg-zinc-800/50 p-4 rounded-2xl border border-zinc-700/50">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-[9px] font-black uppercase text-red-400 tracking-widest">Caixa da Loja Retido</span>
                                    <span className="text-sm font-bold text-red-400">- R$ {Math.abs(Math.min(entregador.saldoLiquido || 0, 0)).toFixed(2)}</span>
                                </div>
                                <div className="w-full bg-zinc-700 h-1.5 rounded-full overflow-hidden">
                                    <div className="bg-red-500 h-full" style={{ width: `${Math.min((Math.abs(entregador.saldoLiquido) / 500) * 100, 100)}%` }} />
                                </div>
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 space-y-4">
                            <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest sticky top-0 bg-white dark:bg-zinc-900 py-2">Últimas Transações</p>
                            {hist.map(h => (
                                <div key={h.id} className="flex justify-between items-center py-4 border-b border-slate-100 dark:border-zinc-800">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-slate-100 dark:bg-zinc-800 rounded-full flex items-center justify-center text-[#4B0082] dark:text-white shrink-0">
                                            <Lucide.MapPin size={18}/>
                                        </div>
                                        <div>
                                            <p className="text-[11px] font-[1000] text-[#4B0082] dark:text-white uppercase truncate max-w-[140px]">{h.endereco?.bairro}</p>
                                            <p className="text-[9px] font-bold text-slate-400 uppercase mt-0.5">{new Date(h.horarioConcluido?.toMillis()).toLocaleTimeString()}</p>
                                        </div>
                                    </div>
                                    <p className="text-lg font-[1000] text-[#82C91E] italic">+{h.valores?.taxaEntrega?.toFixed(2)}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
                
                {aba === 'PERFIL' && (
                    <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} className="bg-white dark:bg-zinc-900 rounded-[3rem] p-8 pointer-events-auto shadow-2xl w-full max-w-md mx-auto border border-slate-100 dark:border-zinc-800">
                        {/* Seção de Perfil rápida com opção de logout */}
                        <div className="flex items-center gap-6 mb-8">
                            <img src={entregador.urlPerfil || LOGO_UP} className="w-20 h-20 rounded-[1.5rem] object-cover shadow-lg border-2 border-slate-100 dark:border-zinc-700" alt="Avatar"/>
                            <div>
                                <h2 className="text-2xl font-[1000] text-[#4B0082] dark:text-white uppercase italic tracking-tighter leading-none">{entregador.nome}</h2>
                                <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mt-2">{entregador.modalidade} • {entregador.placa || 'Ativo'}</p>
                            </div>
                        </div>
                        <button onClick={() => { localStorage.removeItem('@UP:cpf'); window.location.reload(); }} className="w-full py-5 border-2 border-red-100 text-red-500 rounded-[2rem] font-[1000] uppercase text-xs tracking-widest hover:bg-red-50 dark:border-red-900/30 dark:hover:bg-red-900/10 transition-colors active:scale-95">
                            Encerrar Sessão
                        </button>
                    </motion.div>
                )}
            </main>

            {/* BARRA DE NAVEGAÇÃO NATIVA */}
            <nav className="absolute bottom-0 w-full bg-white/90 dark:bg-zinc-900/90 backdrop-blur-2xl border-t border-slate-200 dark:border-zinc-800 px-12 py-5 flex justify-between items-center z-[2000] pb-[calc(1rem+env(safe-area-inset-bottom))] shadow-[0_-20px_50px_rgba(0,0,0,0.05)] pointer-events-auto">
                <button onClick={() => setAba('RADAR')} className={`flex flex-col items-center gap-1.5 transition-all ${aba === 'RADAR' ? 'text-[#EA1D2C] scale-110' : 'text-slate-400 dark:text-zinc-600'}`}>
                    <Lucide.Radar size={26} strokeWidth={aba === 'RADAR' ? 3 : 2}/><span className="text-[9px] font-[1000] uppercase tracking-widest">Radar</span>
                </button>
                <button onClick={() => setAba('GANHOS')} className={`flex flex-col items-center gap-1.5 transition-all ${aba === 'GANHOS' ? 'text-[#82C91E] scale-110' : 'text-slate-400 dark:text-zinc-600'}`}>
                    <Lucide.Wallet size={26} strokeWidth={aba === 'GANHOS' ? 3 : 2}/><span className="text-[9px] font-[1000] uppercase tracking-widest">Extrato</span>
                </button>
                <button onClick={() => setAba('PERFIL')} className={`flex flex-col items-center gap-1.5 transition-all ${aba === 'PERFIL' ? 'text-[#4B0082] dark:text-white scale-110' : 'text-slate-400 dark:text-zinc-600'}`}>
                    <Lucide.User size={26} strokeWidth={aba === 'PERFIL' ? 3 : 2}/><span className="text-[9px] font-[1000] uppercase tracking-widest">Perfil</span>
                </button>
            </nav>

        </div>
    );
}