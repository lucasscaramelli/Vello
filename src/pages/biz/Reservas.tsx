import { useState } from 'react';
import { Search, Filter, Download, MoreVertical, CheckCircle, XCircle, Clock } from 'lucide-react';

export function Reservas() {
  const [searchTerm, setSearchTerm] = useState('');

  const mockReservas = [
    { id: 'RES-1029', client: 'Lucas Mendes', court: 'Quadra 1 (Areia)', sport: 'Beach Tennis', date: '14/03/2026', time: '14:00', status: 'Confirmada', payment: 'Pago', method: 'Pix', value: 'R$ 80,00' },
    { id: 'RES-1030', client: 'Marina Costa', court: 'Quadra 2 (Areia)', sport: 'Futevôlei', date: '14/03/2026', time: '14:30', status: 'Pendente', payment: 'Pendente', method: 'Cartão', value: 'R$ 90,00' },
    { id: 'RES-1031', client: 'Pedro Alves', court: 'Quadra 3 (Areia)', sport: 'Beach Tennis', date: '14/03/2026', time: '15:00', status: 'Cancelada', payment: 'Reembolsado', method: 'Pix', value: 'R$ 80,00' },
    { id: 'RES-1032', client: 'Racha do João', court: 'Campo Society', sport: 'Futebol', date: '14/03/2026', time: '19:00', status: 'Confirmada', payment: 'Pago', method: 'Pix', value: 'R$ 250,00' },
    { id: 'RES-1033', client: 'Ana Clara', court: 'Quadra 1 (Areia)', sport: 'Vôlei de Praia', date: '15/03/2026', time: '08:00', status: 'Confirmada', payment: 'Pago', method: 'Cartão', value: 'R$ 70,00' },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Confirmada': return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-vello-success/10 text-vello-success"><CheckCircle size={12} /> Confirmada</span>;
      case 'Pendente': return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-vello-warning/10 text-vello-warning"><Clock size={12} /> Pendente</span>;
      case 'Cancelada': return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-vello-error/10 text-vello-error"><XCircle size={12} /> Cancelada</span>;
      default: return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-vello-border text-vello-muted">{status}</span>;
    }
  };

  const getPaymentBadge = (status: string) => {
    switch (status) {
      case 'Pago': return <span className="text-vello-success text-xs font-medium">{status}</span>;
      case 'Pendente': return <span className="text-vello-warning text-xs font-medium">{status}</span>;
      case 'Reembolsado': return <span className="text-vello-muted text-xs font-medium">{status}</span>;
      default: return <span className="text-vello-muted text-xs font-medium">{status}</span>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-vello-text">Reservas</h1>
          <p className="text-vello-muted text-sm mt-1">Gerencie todas as reservas da sua arena</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-vello-card border border-vello-border text-vello-text text-sm font-medium rounded-md hover:bg-vello-border/50 transition-colors flex items-center gap-2">
            <Download size={16} />
            Exportar
          </button>
          <button className="px-4 py-2 bg-vello-accent text-vello-bg text-sm font-medium rounded-md hover:bg-vello-accent-hover transition-colors">
            Nova Reserva Manual
          </button>
        </div>
      </div>

      <div className="bg-vello-card border border-vello-border rounded-xl overflow-hidden flex flex-col">
        {/* Toolbar */}
        <div className="p-4 border-b border-vello-border flex flex-col sm:flex-row gap-4 justify-between">
          <div className="relative max-w-md w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-vello-muted" size={18} />
            <input 
              type="text" 
              placeholder="Buscar por cliente, ID ou quadra..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-vello-bg border border-vello-border rounded-lg text-sm text-vello-text focus:outline-none focus:border-vello-accent focus:ring-1 focus:ring-vello-accent"
            />
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-2 bg-vello-bg border border-vello-border text-vello-text text-sm font-medium rounded-lg hover:bg-vello-border/50 transition-colors flex items-center gap-2">
              <Filter size={16} />
              Filtros
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-vello-bg/50 border-b border-vello-border text-xs uppercase tracking-wider text-vello-muted">
                <th className="p-4 font-medium">ID / Cliente</th>
                <th className="p-4 font-medium">Data e Hora</th>
                <th className="p-4 font-medium">Quadra / Esporte</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium">Pagamento</th>
                <th className="p-4 font-medium text-right">Valor</th>
                <th className="p-4 font-medium"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-vello-border">
              {mockReservas.map((reserva) => (
                <tr key={reserva.id} className="hover:bg-vello-bg/30 transition-colors group">
                  <td className="p-4">
                    <div className="text-sm font-medium text-vello-text">{reserva.client}</div>
                    <div className="text-xs text-vello-muted">{reserva.id}</div>
                  </td>
                  <td className="p-4">
                    <div className="text-sm text-vello-text">{reserva.date}</div>
                    <div className="text-xs text-vello-muted">{reserva.time}</div>
                  </td>
                  <td className="p-4">
                    <div className="text-sm text-vello-text">{reserva.court}</div>
                    <div className="text-xs text-vello-muted">{reserva.sport}</div>
                  </td>
                  <td className="p-4">
                    {getStatusBadge(reserva.status)}
                  </td>
                  <td className="p-4">
                    <div className="flex flex-col">
                      {getPaymentBadge(reserva.payment)}
                      <span className="text-[10px] text-vello-muted uppercase mt-0.5">{reserva.method}</span>
                    </div>
                  </td>
                  <td className="p-4 text-right text-sm font-medium text-vello-text">
                    {reserva.value}
                  </td>
                  <td className="p-4 text-right">
                    <button className="p-1 text-vello-muted hover:text-vello-accent rounded opacity-0 group-hover:opacity-100 transition-opacity">
                      <MoreVertical size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="p-4 border-t border-vello-border flex items-center justify-between text-sm text-vello-muted">
          <div>Mostrando 1 a 5 de 42 reservas</div>
          <div className="flex gap-1">
            <button className="px-3 py-1 border border-vello-border rounded hover:bg-vello-bg disabled:opacity-50" disabled>Anterior</button>
            <button className="px-3 py-1 bg-vello-accent/10 text-vello-accent border border-vello-accent/20 rounded">1</button>
            <button className="px-3 py-1 border border-vello-border rounded hover:bg-vello-bg">2</button>
            <button className="px-3 py-1 border border-vello-border rounded hover:bg-vello-bg">3</button>
            <button className="px-3 py-1 border border-vello-border rounded hover:bg-vello-bg">Próxima</button>
          </div>
        </div>
      </div>
    </div>
  );
}
