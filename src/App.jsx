import React from 'react';
import EntregadorMobile from './pages/EntregadorMobile';

export default function App() {
  return (
    // O App simplesmente carrega o Motor do Entregador.
    // Toda a navegação (Radar, Histórico, Mais) agora é feita lá dentro!
    <EntregadorMobile />
  );
}