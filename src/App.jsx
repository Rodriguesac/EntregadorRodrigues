import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import EntregadorMobile from './pages/EntregadorMobile';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EntregadorMobile />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}