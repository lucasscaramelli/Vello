import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { B2CLanding } from './pages/B2CLanding';
import { Login } from './pages/auth/Login';
import { BizLayout } from './components/layout/BizLayout';
import { Dashboard } from './pages/biz/Dashboard';
import { Agenda } from './pages/biz/Agenda';
import { Reservas } from './pages/biz/Reservas';
import { Financeiro } from './pages/biz/Financeiro';
import { Checkin } from './pages/biz/Checkin';
import { Clientes } from './pages/biz/Clientes';

// Placeholder for other pages
const Placeholder = ({ title }: { title: string }) => (
  <div className="flex flex-col items-center justify-center h-full text-center">
    <h1 className="text-2xl font-bold text-vello-text mb-2">{title}</h1>
    <p className="text-vello-muted">Módulo em desenvolvimento.</p>
  </div>
);

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* B2C Bridge */}
        <Route path="/" element={<B2CLanding />} />
        
        {/* B2B Auth */}
        <Route path="/biz/login" element={<Login />} />
        
        {/* B2B App */}
        <Route path="/biz" element={<BizLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="agenda" element={<Agenda />} />
          <Route path="reservas" element={<Reservas />} />
          <Route path="checkin" element={<Checkin />} />
          <Route path="clientes" element={<Clientes />} />
          <Route path="precos" element={<Placeholder title="Preços" />} />
          <Route path="promocoes" element={<Placeholder title="Promoções" />} />
          <Route path="financeiro" element={<Financeiro />} />
          <Route path="relatorios" element={<Placeholder title="Relatórios" />} />
          <Route path="estoque" element={<Placeholder title="Estoque" />} />
          <Route path="configuracoes" element={<Placeholder title="Configurações" />} />
          <Route path="equipe" element={<Placeholder title="Equipe" />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
