/**
 * ============================================================================
 * UP! ENTREGAS - MOBILE V.1.0 (PRODUÇÃO)
 * ============================================================================
 */

import React, { useEffect, useState, useRef, useMemo, memo } from 'react';
import { db } from '../services/firebase'; 
import { collection, query, onSnapshot, doc, updateDoc, setDoc, serverTimestamp, getDoc, where, limit, orderBy } from "firebase/firestore";
import * as Lucide from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Capacitor, registerPlugin } from '@capacitor/core';
import { MapContainer, TileLayer, Marker, Circle, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Howl } from 'howler';

const BackgroundGeolocation = registerPlugin('BackgroundGeolocation');

// ============================================================================
// CONFIGURAÇÕES E UTILITÁRIOS
// ============================================================================
const LOGO_UP = "https://res.cloudinary.com/dbd9x1o02/image/upload/v1775028310/rodrigues_geral/cffexfjiihcqhpoxanyo.png";
const CLOUDINARY_CLOUD_NAME = 'dbd9x1o02'; 
const CLOUDINARY_UPLOAD_PRESET = 'fc3i8urq'; 

let instanceSomAlerta = null;
const getSomAlerta = () => {
    if (!instanceSomAlerta) {
        instanceSomAlerta = new Howl({
            src: ['https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3'],
            loop: true, volume: 1.0, html5: true, pool: 1
        });
    }
    return instanceSomAlerta;
};

const driverIcon = new L.DivIcon({
    className: 'd-map-icon',
    html: `<div style="background-color:#EA1D2C; width:36px; height:36px; border-radius:50%; border:3px solid white; box-shadow:0 0 15px rgba(234,29,44,0.5); display:flex; align-items:center; justify-content:center; color:white;">🛵</div>`,
    iconSize: [36, 36], iconAnchor: [18, 18]
});

const formatarMoeda = (v) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v || 0);
const apenasNumeros = (str) => str.replace(/\D/g, '');
const mascaraCPF = (v) => { v = apenasNumeros(v); return v.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "$1.$2.$3-$4").slice(0, 14); };
const mascaraTelefone = (v) => { v = apenasNumeros(v); return v.replace(/^(\d{2})(\d)/g, "($1) $2").replace(/(\d{5})(\d)/, "$1-$2").slice(0, 15); };

const uploadToCloudinary = async (fileUri, pasta) => {
    const res = await fetch(fileUri); const blob = await res.blob();
    const fd = new FormData(); fd.append('file', new File([blob], "foto.jpg", { type: "image/jpeg" }));
    fd.append('upload_preset', CLOUDINARY_UPLOAD_PRESET); fd.append('folder', `up_entregas/${pasta}`);
    const uploadRes = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, { method: 'POST', body: fd });
    return (await uploadRes.json()).secure_url;
};

const MapLogic = ({ center }) => {
    const map = useMap();
    useEffect(() => { if (center) map.setView([center.lat, center.lng], 16, { animate: true }); }, [center, map]);
    return null;
};

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================
export default function EntregadorMobileV1() {
    const [tema, setTema] = useState(() => localStorage.getItem('@UP:tema') || 'dark');
    const [entregador, setEntregador] = useState(null); 
    const [minhasCoords, setMinhasCoords] = useState(null);
    const [aba, setAba] = useState('RADAR'); 
    const [isOnline, setIsOnline] = useState(false);
    const [oferta, setOferta] = useState(null); 
    const [hist, setHist] = useState([]);
    
    // Estados de Login/Cadastro
    const [loading, setLoading] = useState(true);
    const [modoAuth, setModoAuth] = useState('CPF'); 
    const [processando, setProcessando] = useState(false);
    const [formLogin, setFormLogin] = useState({ cpf: '', senha: '' });
    const [formCadastro, setFormCadastro] = useState({ 
        nome: '', telefone: '', senha: '', modalidade: 'MOTO', placa: '', urlPerfil: '', urlCNH: '' 
    });

    // 1. SINCRONIZAÇÃO DE SESSÃO
    useEffect(() => {
        const r = window.document.documentElement;
        tema === 'dark' ? r.classList.add('dark') : r.classList.remove('dark');
        localStorage.setItem('@UP:tema', tema);

        const cpfSalvo = localStorage.getItem('@UP:cpf'); 
        if (cpfSalvo) {
            return onSnapshot(doc(db, "entregadores", cpfSalvo), (s) => {
                if (s.exists()) {
                    setEntregador({id: s.id, ...s.data()});
                    setIsOnline(s.data().status !== 'Offline');
                    if (s.data().statusAprovacao !== 'APROVADO') setModoAuth('AGUARDANDO_APROVACAO');
                } else {
                    localStorage.removeItem('@UP:cpf');
                    setEntregador(null);
                }
                setLoading(false);
            });
        } else { setLoading(false); }
    }, [tema]);

    // 2. MOTOR DE OFERTAS
    useEffect(() => {
        if(!entregador || !isOnline) { getSomAlerta().stop(); return; }
        const qOf = query(collection(db, "pedidos"), where("statusDespacho", "==", "OFERTA_INDIVIDUAL"), where("entregadorAtualOferta", "==", entregador.id));
        return onSnapshot(qOf, (s) => {
            if(!s.empty) {
                setOferta({id: s.docs[0].id, ...s.docs[0].data()});
                if (!getSomAlerta().playing()) getSomAlerta().play();
                Haptics.vibrate().catch(() => {});
            } else {
                setOferta(null);
                getSomAlerta().stop();
            }
        });
    }, [isOnline, entregador]);

    // 3. MOTOR FINANCEIRO
    useEffect(() => {
        if(!entregador || aba !== 'GANHOS') return;
        const qH = query(collection(db, "pedidos"), where("entregadorId", "==", entregador.id), where("status", "==", "CONCLUIDO"), orderBy("horarioConcluido", "desc"), limit(20));
        return onSnapshot(qH, s => setHist(s.docs.map(d => ({id: d.id, ...d.data()}))));
    }, [entregador, aba]);

    // 4. GPS RESILIENTE
    useEffect(() => {
        if(isOnline && entregador) {
            if (Capacitor.getPlatform() === 'web') {
                const id = navigator.geolocation.watchPosition(p => setMinhasCoords({lat: p.coords.latitude, lng: p.coords.longitude}), null, {enableHighAccuracy: true});
                return () => navigator.geolocation.clearWatch(id);
            } else {
                BackgroundGeolocation.addWatcher({
                    backgroundMessage: "Acompanhando sua rota.",
                    backgroundTitle: "UP! Entregas",
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

    // 5. AÇÕES DE AUTENTICAÇÃO E FOTOS
    const tirarFoto = async (tipo) => {
        try {
            const image = await Camera.getPhoto({ quality: 60, resultType: CameraResultType.Uri, source: CameraSource.Camera });
            setProcessando(true);
            const url = await uploadToCloudinary(image.webPath, tipo === 'perfil' ? 'pilotos' : 'documentos');
            setFormCadastro(prev => ({ ...prev, [tipo === 'perfil' ? 'urlPerfil' : 'urlCNH']: url }));
            setProcessando(false);
        } catch (e) { alert("Erro ao capturar imagem."); setProcessando(false); }
    };

    const solicitarResetSenha = async () => {
        const cpf = formLogin.cpf.replace(/\D/g, '');
        if(cpf.length !== 11) return alert("Digite seu CPF primeiro.");
        try {
            await updateDoc(doc(db, "entregadores", cpf), { solicitouResetSenha: true });
            alert("Solicitação enviada! A Torre de Comando vai te enviar a nova senha via WhatsApp.");
        } catch (e) { alert("Erro ao solicitar. Verifique seu CPF."); }
    };

    const handleAuth = async (e) => {
        e.preventDefault();
        setProcessando(true);
        const cpf = formLogin.cpf.replace(/\D/g, '');
        
        if(modoAuth === 'CPF') {
            if(cpf.length !== 11) { alert("CPF Inválido"); setProcessando(false); return; }
            const s = await getDoc(doc(db, "entregadores", cpf));
            setModoAuth(s.exists() ? 'SENHA' : 'CADASTRO');
        
        } else if (modoAuth === 'SENHA') {
            const s = await getDoc(doc(db, "entregadores", cpf));
            if(s.data().senha === formLogin.senha) {
                localStorage.setItem('@UP:cpf', cpf);
                setEntregador({id: s.id, ...s.data()});
                if (s.data().statusAprovacao !== 'APROVADO') setModoAuth('AGUARDANDO_APROVACAO');
            } else { alert("Senha incorreta"); }
        
        } else if (modoAuth === 'CADASTRO') {
            if(!formCadastro.urlPerfil || !formCadastro.urlCNH) {
                alert("É obrigatório tirar a foto do perfil e da CNH.");
                setProcessando(false); return;
            }
            await setDoc(doc(db, "entregadores", cpf), {
                cpf, nome: formCadastro.nome, telefone: formCadastro.telefone, senha: formCadastro.senha,
                modalidade: formCadastro.modalidade, placa: formCadastro.placa, 
                urlPerfil: formCadastro.urlPerfil, urlCNH: formCadastro.urlCNH,
                status: 'Offline', statusAprovacao: 'PENDENTE', dataCadastro: serverTimestamp(),
                ganhosTaxas: 0, saldoLiquido: 0, entregasRealizadas: 0, frequenciaRepasse: 'SEMANAL',
                aceitaDinheiro: true, temMaquininha: true
            });
            localStorage.setItem('@UP:cpf', cpf);
            setModoAuth('AGUARDANDO_APROVACAO');
        }
        setProcessando(false);
    };

    // ========================================================================
    // RENDERIZAÇÃO: TELAS DESLOGADAS
    // ========================================================================
    if (loading) return <div className="h-[100dvh] bg-zinc-950 flex flex-col items-center justify-center"><div className="w-8 h-8 border-4 border-[#82C91E] border-t-transparent rounded-full animate-spin"/></div>;

    if (!entregador || modoAuth === 'AGUARDANDO_APROVACAO') {
        return (
            <div className="min-h-[100dvh] bg-[#4B0082] dark:bg-zinc-950 flex flex-col p-6 items-center justify-center font-['Montserrat'] overflow-y-auto">
                <img src={LOGO_UP} className="w-32 mb-8 drop-shadow-2xl" alt="Logo" />
                <AnimatePresence mode="wait">
                    
                    {modoAuth === 'AGUARDANDO_APROVACAO' ? (
                        <motion.div key="wait" initial={{opacity:0}} animate={{opacity:1}} className="bg-white dark:bg-zinc-900 p-10 rounded-[2.5rem] text-center shadow-2xl w-full max-w-sm">
                            <Lucide.Clock size={60} className="text-amber-500 mx-auto mb-6 animate-pulse" />
                            <h2 className="text-xl font-black text-[#4B0082] dark:text-white uppercase mb-2 italic">Em Análise</h2>
                            <p className="text-xs text-slate-400 font-bold mb-8 leading-relaxed">Sua conta está sendo validada pela Torre Rodrigues. Aguarde a ativação no sistema.</p>
                            <button onClick={() => {localStorage.removeItem('@UP:cpf'); window.location.reload();}} className="text-[10px] font-black text-red-500 uppercase underline tracking-widest">Sair da Conta</button>
                        </motion.div>
                    ) : (
                        <motion.form key="auth" initial={{y:20, opacity:0}} animate={{y:0, opacity:1}} onSubmit={handleAuth} className="bg-white dark:bg-zinc-900 p-8 rounded-[2.5rem] shadow-2xl w-full max-w-md space-y-5">
                            <h2 className="text-2xl font-black text-[#4B0082] dark:text-white uppercase italic text-center mb-2">
                                {modoAuth === 'CPF' ? 'Área do Piloto' : modoAuth === 'SENHA' ? 'Acesso Seguro' : 'Novo Recruta'}
                            </h2>
                            
                            {/* LOGIN - PASSO 1 */}
                            {modoAuth === 'CPF' && (
                                <input type="tel" value={formLogin.cpf} onChange={e => setFormLogin({...formLogin, cpf: mascaraCPF(e.target.value)})} className="w-full h-16 bg-slate-100 dark:bg-zinc-800 rounded-2xl px-6 font-black text-lg outline-none focus:border-[#EA1D2C] border-2 border-transparent dark:text-white transition-all" placeholder="Digite seu CPF" />
                            )}

                            {/* LOGIN - PASSO 2 */}
                            {modoAuth === 'SENHA' && (
                                <>
                                    <input type="password" autoFocus value={formLogin.senha} onChange={e => setFormLogin({...formLogin, senha: e.target.value})} className="w-full h-16 bg-slate-100 dark:bg-zinc-800 rounded-2xl px-6 font-black text-lg outline-none focus:border-[#EA1D2C] border-2 border-transparent dark:text-white" placeholder="Sua Senha" />
                                    <button type="button" onClick={solicitarResetSenha} className="w-full text-right text-[10px] font-black text-[#EA1D2C] uppercase tracking-widest underline">Esqueci a Senha</button>
                                </>
                            )}

                            {/* CADASTRO - PASSO ÚNICO */}
                            {modoAuth === 'CADASTRO' && (
                                <div className="space-y-4 max-h-[50vh] overflow-y-auto custom-scrollbar pr-2 pb-4">
                                    <p className="text-[10px] font-black uppercase text-center text-slate-400 tracking-widest mb-4">Complete seu perfil para rodar</p>
                                    <input placeholder="Nome Completo" required value={formCadastro.nome} onChange={e => setFormCadastro({...formCadastro, nome: e.target.value})} className="w-full h-14 bg-slate-100 dark:bg-zinc-800 rounded-xl px-4 font-bold text-sm dark:text-white outline-none" />
                                    <input placeholder="WhatsApp" type="tel" required value={formCadastro.telefone} onChange={e => setFormCadastro({...formCadastro, telefone: mascaraTelefone(e.target.value)})} className="w-full h-14 bg-slate-100 dark:bg-zinc-800 rounded-xl px-4 font-bold text-sm dark:text-white outline-none" />
                                    
                                    <div className="flex gap-2">
                                        <select value={formCadastro.modalidade} onChange={e => setFormCadastro({...formCadastro, modalidade: e.target.value})} className="flex-1 h-14 bg-slate-100 dark:bg-zinc-800 rounded-xl px-4 font-black text-[10px] uppercase dark:text-white outline-none">
                                            <option value="MOTO">Moto</option><option value="BIKE">Bike</option><option value="CARRO">Carro</option>
                                        </select>
                                        <input placeholder="Placa" value={formCadastro.placa} onChange={e => setFormCadastro({...formCadastro, placa: e.target.value.toUpperCase()})} maxLength={8} className="flex-1 h-14 bg-slate-100 dark:bg-zinc-800 rounded-xl px-4 font-bold text-sm dark:text-white uppercase outline-none" />
                                    </div>

                                    <input placeholder="Crie uma Senha" type="password" required value={formCadastro.senha} onChange={e => setFormCadastro({...formCadastro, senha: e.target.value})} className="w-full h-14 bg-slate-100 dark:bg-zinc-800 rounded-xl px-4 font-bold text-sm dark:text-white outline-none" />
                                    
                                    <div className="grid grid-cols-2 gap-4 mt-4">
                                        <button type="button" onClick={() => tirarFoto('perfil')} className={`h-24 rounded-2xl flex flex-col items-center justify-center gap-2 border-2 transition-all ${formCadastro.urlPerfil ? 'bg-[#82C91E]/10 border-[#82C91E] text-[#82C91E]' : 'bg-slate-50 dark:bg-zinc-800 border-dashed border-slate-300 dark:border-zinc-700 text-slate-500'}`}>
                                            {formCadastro.urlPerfil ? <Lucide.CheckCircle size={24}/> : <Lucide.Camera size={24}/>}
                                            <span className="text-[9px] font-black uppercase tracking-widest text-center px-2">Foto de Rosto</span>
                                        </button>
                                        <button type="button" onClick={() => tirarFoto('cnh')} className={`h-24 rounded-2xl flex flex-col items-center justify-center gap-2 border-2 transition-all ${formCadastro.urlCNH ? 'bg-[#82C91E]/10 border-[#82C91E] text-[#82C91E]' : 'bg-slate-50 dark:bg-zinc-800 border-dashed border-slate-300 dark:border-zinc-700 text-slate-500'}`}>
                                            {formCadastro.urlCNH ? <Lucide.CheckCircle size={24}/> : <Lucide.IdCard size={24}/>}
                                            <span className="text-[9px] font-black uppercase tracking-widest text-center px-2">Foto da CNH</span>
                                        </button>
                                    </div>
                                </div>
                            )}

                            <button type="submit" disabled={processando} className="w-full py-5 bg-[#EA1D2C] text-white rounded-[2rem] font-[1000] uppercase italic tracking-widest text-sm shadow-xl active:scale-95 transition-transform flex justify-center items-center gap-2">
                                {processando ? <Lucide.Loader2 className="animate-spin" size={20}/> : 'Continuar'}
                            </button>
                            {modoAuth !== 'CPF' && <button type="button" onClick={() => setModoAuth('CPF')} className="w-full text-center text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2 hover:text-[#4B0082] transition-colors">Voltar ao Início</button>}
                        </motion.form>
                    )}
                </AnimatePresence>
            </div>
        );
    }

    // ========================================================================
    // RENDERIZAÇÃO: APP OPERACIONAL
    // ========================================================================
    return (
        <div className="h-[100dvh] w-full bg-slate-100 dark:bg-black flex flex-col overflow-hidden relative font-['Montserrat']">
            
            {/* MAPA OPERACIONAL */}
            <div className="absolute inset-0 z-0">
                <MapContainer center={minhasCoords ? [minhasCoords.lat, minhasCoords.lng] : [-20.4313, -54.5541]} zoom={15} zoomControl={false} style={{ height: '100%', width: '100%' }}>
                    <TileLayer url={tema === 'dark' ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" : "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"} />
                    {minhasCoords && (
                        <>
                            <Marker position={[minhasCoords.lat, minhasCoords.lng]} icon={driverIcon} />
                            <Circle center={[minhasCoords.lat, minhasCoords.lng]} radius={80} pathOptions={{ color: '#EA1D2C', fillOpacity: 0.1, weight: 1 }} />
                            <MapLogic center={minhasCoords} />
                        </>
                    )}
                </MapContainer>
            </div>

            {/* HEADER TÁTICO */}
            <header className="p-4 flex justify-between items-center z-[1000] absolute top-0 w-full pointer-events-none mt-[env(safe-area-inset-top)]">
                <div className="flex items-center gap-3 bg-zinc-900/90 backdrop-blur-md text-white p-2 pr-6 rounded-full shadow-2xl pointer-events-auto border border-zinc-800">
                    <img src={entregador.urlPerfil || LOGO_UP} className="w-11 h-11 rounded-full object-cover border-2 border-[#82C91E] bg-white" alt="Perfil"/>
                    <div>
                        <p className={`text-[9px] font-black uppercase tracking-widest ${isOnline ? 'text-[#82C91E]' : 'text-zinc-500'}`}>{isOnline ? 'On-line' : 'Off-line'}</p>
                        <p className="text-xs font-[1000] uppercase italic truncate max-w-[100px]">{entregador.nome.split(' ')[0]}</p>
                    </div>
                </div>
                <button 
                    onClick={() => { setIsOnline(!isOnline); updateDoc(doc(db, "entregadores", entregador.id), { status: !isOnline ? 'Livre' : 'Offline' }); }}
                    className={`w-14 h-14 rounded-full shadow-2xl border-4 flex items-center justify-center transition-all pointer-events-auto active:scale-90 ${isOnline ? 'bg-[#EA1D2C] border-white text-white' : 'bg-zinc-800 border-zinc-700 text-zinc-500'}`}
                >
                    <Lucide.Power size={24} strokeWidth={4}/>
                </button>
            </header>

            {/* CONTEÚDO PRINCIPAL (RADAR / GANHOS / PERFIL) */}
            <main className="flex-1 relative z-[1000] p-4 pb-28 flex flex-col justify-end pointer-events-none">
                
                {/* ABA 1: RADAR */}
                {aba === 'RADAR' && (
                    <AnimatePresence>
                        {oferta ? (
                            <motion.div initial={{y:100, opacity:0}} animate={{y:0, opacity:1}} exit={{y:100}} className="bg-zinc-900/95 backdrop-blur-lg p-6 rounded-[2.5rem] shadow-2xl border border-zinc-800 w-full max-w-md mx-auto pointer-events-auto mb-4">
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <span className="bg-[#EA1D2C] text-white px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest animate-pulse shadow-lg">Nova Missão</span>
                                        <h2 className="text-2xl font-black text-white uppercase mt-3 italic leading-none">{oferta.endereco?.bairro || 'Rota Próxima'}</h2>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[10px] text-zinc-400 font-black uppercase tracking-widest">Sua Taxa</p>
                                        <p className="text-4xl font-black text-[#82C91E] italic tracking-tighter leading-none mt-1">R$ {oferta.valores?.taxaEntrega?.toFixed(2)}</p>
                                    </div>
                                </div>
                                <button onClick={() => { updateDoc(doc(db, "pedidos", oferta.id), { status: 'A_CAMINHO_LOJA', entregadorId: entregador.id }); setOferta(null); }} className="w-full py-5 bg-[#EA1D2C] text-white rounded-[2rem] font-[1000] uppercase italic tracking-widest text-sm shadow-[0_10px_30px_rgba(234,29,44,0.3)] active:scale-95 transition-transform flex justify-center items-center gap-3">
                                    Aceitar Chamado <Lucide.ArrowRight size={20} strokeWidth={4}/>
                                </button>
                            </motion.div>
                        ) : isOnline && (
                            <motion.div initial={{opacity:0}} animate={{opacity:1}} className="bg-zinc-900/80 backdrop-blur-md p-6 rounded-[2.5rem] text-center border border-zinc-800 shadow-xl mb-4 max-w-md mx-auto pointer-events-auto">
                                <div className="w-16 h-16 bg-[#82C91E]/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-[#82C91E]/20 relative">
                                    <Lucide.Radar size={30} className="text-[#82C91E] relative z-10" />
                                    <div className="absolute inset-0 bg-[#82C91E]/20 rounded-full animate-ping" />
                                </div>
                                <h3 className="text-white font-[1000] uppercase text-sm italic tracking-widest">Procurando Rotas...</h3>
                                <p className="text-zinc-400 text-[10px] font-bold mt-1 uppercase tracking-widest">Aguarde o alerta na tela</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                )}

                {/* ABA 2: GANHOS */}
                {aba === 'GANHOS' && (
                    <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} className="bg-white dark:bg-zinc-900 rounded-[2.5rem] p-8 pointer-events-auto shadow-2xl h-[70vh] overflow-y-auto custom-scrollbar w-full max-w-md mx-auto flex flex-col">
                        <h2 className="text-3xl font-[1000] text-[#4B0082] dark:text-white uppercase italic mb-6 tracking-tighter">Financeiro</h2>
                        
                        <div className={`p-6 rounded-[2rem] text-white mb-8 shadow-xl relative overflow-hidden shrink-0 ${entregador.saldoLiquido < 0 ? 'bg-gradient-to-br from-red-600 to-red-900' : 'bg-gradient-to-br from-[#4B0082] to-[#1F0137]'}`}>
                            <Lucide.Wallet size={100} className="absolute -right-4 -bottom-4 opacity-10 rotate-[-15deg]"/>
                            <p className="text-[10px] font-black uppercase text-white/80 tracking-widest mb-1">{entregador.saldoLiquido < 0 ? 'Você deve à loja' : 'Seu Dinheiro Protegido'}</p>
                            <p className="text-5xl font-[1000] italic tracking-tighter leading-none mb-4">R$ {Math.abs(entregador.saldoLiquido || 0).toFixed(2)}</p>
                            <div className="flex gap-4 border-t border-white/20 pt-4 mt-2">
                                <div><p className="text-[8px] font-black uppercase text-white/60 tracking-widest">Total Ganhos</p><p className="font-bold">R$ {(entregador.ganhosTaxas || 0).toFixed(2)}</p></div>
                                <div><p className="text-[8px] font-black uppercase text-white/60 tracking-widest">Rotas Feitas</p><p className="font-bold">{entregador.entregasRealizadas || 0}</p></div>
                            </div>
                        </div>

                        <div className="flex-1 space-y-3">
                            <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2">Últimas Rotas Concluídas</p>
                            {hist.length === 0 && <p className="text-xs text-slate-400 text-center mt-10 font-bold uppercase">Nenhum ganho registrado ainda.</p>}
                            {hist.map(h => (
                                <div key={h.id} className="flex justify-between items-center p-4 bg-slate-50 dark:bg-zinc-800 rounded-2xl border border-slate-100 dark:border-zinc-700">
                                    <div>
                                        <p className="text-[11px] font-[1000] text-[#4B0082] dark:text-white uppercase truncate max-w-[150px]">#{h.id.slice(-4)} • {h.endereco?.bairro}</p>
                                        <p className="text-[9px] font-bold text-slate-400 uppercase mt-1 tracking-widest">{new Date(h.horarioConcluido?.toMillis()).toLocaleTimeString()}</p>
                                    </div>
                                    <p className="text-xl font-[1000] text-[#82C91E] italic">+{h.valores?.taxaEntrega?.toFixed(2)}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* ABA 3: PERFIL (TOGGLES DE PREFERÊNCIA) */}
                {aba === 'PERFIL' && (
                    <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} className="bg-white dark:bg-zinc-900 rounded-[2.5rem] p-8 pointer-events-auto shadow-2xl h-[70vh] w-full max-w-md mx-auto">
                        <div className="flex items-center gap-6 mb-8 border-b border-slate-100 dark:border-zinc-800 pb-8">
                            <img src={entregador.urlPerfil || LOGO_UP} className="w-20 h-20 rounded-[1.5rem] object-cover shadow-lg border-2 border-slate-100 dark:border-zinc-700" alt="Avatar"/>
                            <div>
                                <h2 className="text-2xl font-[1000] text-[#4B0082] dark:text-white uppercase italic tracking-tighter leading-none">{entregador.nome}</h2>
                                <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mt-2">{entregador.modalidade} • {entregador.placa || 'Sem Placa'}</p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Ferramentas de Trabalho</h3>
                            
                            <div className="flex justify-between items-center bg-slate-50 dark:bg-zinc-800 p-5 rounded-2xl border border-slate-100 dark:border-zinc-700">
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white ${entregador.aceitaDinheiro ? 'bg-[#82C91E]' : 'bg-slate-300 dark:bg-zinc-600'}`}><Lucide.Banknote size={20}/></div>
                                    <div><p className="font-[1000] uppercase text-sm dark:text-white">Tenho Troco</p><p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Aceitar rotas em dinheiro</p></div>
                                </div>
                                <button onClick={() => updateDoc(doc(db, "entregadores", entregador.id), { aceitaDinheiro: !entregador.aceitaDinheiro })} className={`w-14 h-8 rounded-full transition-colors relative ${entregador.aceitaDinheiro ? 'bg-[#82C91E]' : 'bg-slate-300 dark:bg-zinc-600'}`}>
                                    <div className={`w-6 h-6 bg-white rounded-full absolute top-1 transition-all ${entregador.aceitaDinheiro ? 'right-1' : 'left-1'}`} />
                                </button>
                            </div>

                            <div className="flex justify-between items-center bg-slate-50 dark:bg-zinc-800 p-5 rounded-2xl border border-slate-100 dark:border-zinc-700">
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white ${entregador.temMaquininha ? 'bg-[#4B0082]' : 'bg-slate-300 dark:bg-zinc-600'}`}><Lucide.CreditCard size={20}/></div>
                                    <div><p className="font-[1000] uppercase text-sm dark:text-white">Maquininha</p><p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Possui máquina de cartão</p></div>
                                </div>
                                <button onClick={() => updateDoc(doc(db, "entregadores", entregador.id), { temMaquininha: !entregador.temMaquininha })} className={`w-14 h-8 rounded-full transition-colors relative ${entregador.temMaquininha ? 'bg-[#4B0082]' : 'bg-slate-300 dark:bg-zinc-600'}`}>
                                    <div className={`w-6 h-6 bg-white rounded-full absolute top-1 transition-all ${entregador.temMaquininha ? 'right-1' : 'left-1'}`} />
                                </button>
                            </div>
                        </div>

                        <button onClick={() => { localStorage.removeItem('@UP:cpf'); window.location.reload(); }} className="w-full mt-8 py-5 border-2 border-red-100 text-red-500 rounded-2xl font-[1000] uppercase text-xs tracking-widest hover:bg-red-50 dark:border-red-900/30 dark:hover:bg-red-900/10 transition-colors">
                            Desconectar App
                        </button>
                    </motion.div>
                )}
            </main>

            {/* BARRA DE NAVEGAÇÃO INFERIOR */}
            <nav className="absolute bottom-0 w-full bg-white dark:bg-zinc-950 border-t border-slate-200 dark:border-zinc-900 px-10 py-5 flex justify-between items-center z-[2000] pb-[calc(1rem+env(safe-area-inset-bottom))] pointer-events-auto shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
                <button onClick={()=>setAba('RADAR')} className={`flex flex-col items-center gap-1.5 transition-all ${aba === 'RADAR' ? 'text-[#EA1D2C] scale-110' : 'text-slate-400 dark:text-zinc-600 hover:text-slate-600'}`}>
                    <Lucide.Radar size={26} strokeWidth={aba === 'RADAR' ? 3 : 2}/><span className="text-[9px] font-black uppercase tracking-widest">Radar</span>
                </button>
                <button onClick={()=>setAba('GANHOS')} className={`flex flex-col items-center gap-1.5 transition-all ${aba === 'GANHOS' ? 'text-[#4B0082] dark:text-white scale-110' : 'text-slate-400 dark:text-zinc-600 hover:text-slate-600'}`}>
                    <Lucide.Wallet size={26} strokeWidth={aba === 'GANHOS' ? 3 : 2}/><span className="text-[9px] font-black uppercase tracking-widest">Ganhos</span>
                </button>
                <button onClick={()=>setAba('PERFIL')} className={`flex flex-col items-center gap-1.5 transition-all ${aba === 'PERFIL' ? 'text-[#82C91E] scale-110' : 'text-slate-400 dark:text-zinc-600 hover:text-slate-600'}`}>
                    <Lucide.User size={26} strokeWidth={aba === 'PERFIL' ? 3 : 2}/><span className="text-[9px] font-black uppercase tracking-widest">Perfil</span>
                </button>
            </nav>

        </div>
    );
}