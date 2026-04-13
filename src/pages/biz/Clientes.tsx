import { useState } from 'react';
import { Search, Filter, Download, Star, MessageCircle, MoreVertical } from 'lucide-react';

export function Clientes() {
  const [searchTerm, setSearchTerm] = useState('');

  const mockClientes = [
    { id: 'C-001', name: 'Lucas Mendes', email: 'lucas@email.com', phone: '(11) 98765-4321', visits: 24, spent: 'R$ 1.920,00', lastVisit: '12/03/2026', segment: 'Frequente', rating: 5 },
    { id: 'C-002', name: 'Marina Costa', email: 'marina@email.com', phone: '(11) 91234-5678', visits: 12, spent: 'R$ 1.080,00', lastVisit: '10/03/2026', segment: 'Regular', rating: 4 },
    { id: 'C-003', name: 'Pedro Alves', email: 'pedro@email.com', phone: '(11) 99988-7766', visits: 3, spent: 'R$ 240,00', lastVisit: '01/03/2026', segment: 'Ocasional', rating: 4 },
    { id: 'C-004', name: 'Ana Clara', email: 'ana@email.com', phone: '(11) 97766-5544', visits: 1, spent: 'R$ 70,00', lastVisit: '15/03/2026', segment: 'Novo', rating: 5 },
    { id: 'C-005', name: 'João Lima', email: 'joao@email.com', phone: '(11) 95544-3322', visits: 8, spent: 'R$ 640,00', lastVisit: '15/01/2026', segment: 'Inativo', rating: 3 },
  ];

  const getSegmentBadge = (segment: string) => {
    switch (segment) {
      case 'Frequente': return <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-vello-success/10 text-vello-success uppercase tracking-wider">{segment}</span>;
      case 'Regular': return <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-vello-accent/10 text-vello-accent uppercase tracking-wider">{segment}</span>;
      case 'Ocasional': return <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-vello-warning/10 text-vello-warning uppercase tracking-wider">{segment}</span>;
      case 'Novo': return <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-blue-500/10 text-blue-400 uppercase tracking-wider">{segment}</span>;
      case 'Inativo': return <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-vello-error/10 text-vello-error uppercase tracking-wider">{segment}</span>;
      default: return <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-vello-border text-vello-muted uppercase tracking-wider">{segment}</span>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-vello-text">Clientes</h1>
          <p className="text-vello-muted text-sm mt-1">CRM e base de usuários da sua arena</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-vello-card border border-vello-border text-vello-text text-sm font-medium rounded-md hover:bg-vello-border/50 transition-colors flex items-center gap-2">
            <Download size={16} />
            Exportar CSV
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-vello-card border border-vello-border rounded-xl p-5">
          <h3 className="text-sm text-vello-muted mb-1">Total de Clientes</h3>
          <p className="text-2xl font-bold text-vello-text">1.248</p>
          <p className="text-xs text-vello-success mt-1">+45 este mês</p>
        </div>
        <div className="bg-vello-card border border-vello-border rounded-xl p-5">
          <h3 className="text-sm text-vello-muted mb-1">Clientes Frequentes</h3>
          <p className="text-2xl font-bold text-vello-text">312</p>
          <p className="text-xs text-vello-muted mt-1">25% da base</p>
        </div>
        <div className="bg-vello-card border border-vello-border rounded-xl p-5">
          <h3 className="text-sm text-vello-muted mb-1">Risco de Churn (Inativos)</h3>
          <p className="text-2xl font-bold text-vello-error">84</p>
          <p className="text-xs text-vello-muted mt-1">Sem visitas há &gt; 30 dias</p>
        </div>
      </div>

      <div className="bg-vello-card border border-vello-border rounded-xl overflow-hidden flex flex-col">
        {/* Toolbar */}
        <div className="p-4 border-b border-vello-border flex flex-col sm:flex-row gap-4 justify-between">
          <div className="relative max-w-md w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-vello-muted" size={18} />
            <input 
              type="text" 
              placeholder="Buscar por nome, email ou telefone..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-vello-bg border border-vello-border rounded-lg text-sm text-vello-text focus:outline-none focus:border-vello-accent focus:ring-1 focus:ring-vello-accent"
            />
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-2 bg-vello-bg border border-vello-border text-vello-text text-sm font-medium rounded-lg hover:bg-vello-border/50 transition-colors flex items-center gap-2">
              <Filter size={16} />
              Segmentos
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-vello-bg/50 border-b border-vello-border text-xs uppercase tracking-wider text-vello-muted">
                <th className="p-4 font-medium">Cliente</th>
                <th className="p-4 font-medium">Contato</th>
                <th className="p-4 font-medium">Segmento</th>
                <th className="p-4 font-medium text-right">Visitas</th>
                <th className="p-4 font-medium text-right">Gasto Total</th>
                <th className="p-4 font-medium">Última Visita</th>
                <th className="p-4 font-medium"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-vello-border">
              {mockClientes.map((cliente) => (
                <tr key={cliente.id} className="hover:bg-vello-bg/30 transition-colors group">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-vello-bg flex items-center justify-center text-vello-accent font-bold text-xs">
                        {cliente.name.charAt(0)}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-vello-text">{cliente.name}</div>
                        <div className="flex items-center gap-0.5 mt-0.5">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} size={10} className={i < cliente.rating ? "text-vello-accent fill-vello-accent" : "text-vello-border"} />
                          ))}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="text-sm text-vello-text">{cliente.phone}</div>
                    <div className="text-xs text-vello-muted">{cliente.email}</div>
                  </td>
                  <td className="p-4">
                    {getSegmentBadge(cliente.segment)}
                  </td>
                  <td className="p-4 text-right text-sm font-medium text-vello-text">
                    {cliente.visits}
                  </td>
                  <td className="p-4 text-right text-sm font-medium text-vello-text">
                    {cliente.spent}
                  </td>
                  <td className="p-4 text-sm text-vello-text">
                    {cliente.lastVisit}
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 bg-vello-bg border border-vello-border text-vello-muted hover:text-vello-accent rounded" title="Enviar Mensagem">
                        <MessageCircle size={16} />
                      </button>
                      <button className="p-1.5 text-vello-muted hover:text-vello-accent rounded">
                        <MoreVertical size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
