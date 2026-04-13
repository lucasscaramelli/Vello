import { DollarSign, TrendingUp, TrendingDown, Download, CreditCard, Wallet } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

export function Financeiro() {
  const { user } = useAuthStore();

  if (user?.role !== 'partner_owner' && user?.role !== 'admin') {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center">
        <div className="w-16 h-16 bg-vello-error/10 text-vello-error rounded-full flex items-center justify-center mb-4">
          <ShieldAlert size={32} />
        </div>
        <h2 className="text-xl font-bold text-vello-text mb-2">Acesso Restrito</h2>
        <p className="text-vello-muted max-w-md">
          Você não tem permissão para acessar o módulo financeiro. Apenas proprietários e administradores podem visualizar estas informações.
        </p>
      </div>
    );
  }

  const kpis = [
    { label: 'Receita Bruta (Mês)', value: 'R$ 45.230,00', trend: '+12%', positive: true, icon: DollarSign },
    { label: 'Taxas e Comissões', value: 'R$ 4.523,00', trend: '+12%', positive: false, icon: TrendingDown },
    { label: 'Receita Líquida', value: 'R$ 40.707,00', trend: '+12%', positive: true, icon: Wallet },
    { label: 'A Receber (Próx. 7 dias)', value: 'R$ 8.450,00', trend: '', positive: true, icon: CreditCard },
  ];

  const payouts = [
    { id: 'PAY-001', date: '15/03/2026', amount: 'R$ 12.450,00', status: 'Agendado', account: 'Banco Itaú ...4567' },
    { id: 'PAY-002', date: '08/03/2026', amount: 'R$ 14.200,00', status: 'Pago', account: 'Banco Itaú ...4567' },
    { id: 'PAY-003', date: '01/03/2026', amount: 'R$ 13.800,00', status: 'Pago', account: 'Banco Itaú ...4567' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-vello-text">Financeiro</h1>
          <p className="text-vello-muted text-sm mt-1">Gestão de recebíveis, repasses e fluxo de caixa</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-vello-card border border-vello-border text-vello-text text-sm font-medium rounded-md hover:bg-vello-border/50 transition-colors flex items-center gap-2">
            <Download size={16} />
            Exportar DRE
          </button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, i) => (
          <div key={i} className="bg-vello-card border border-vello-border rounded-xl p-5">
            <div className="flex items-center justify-between">
              <div className="p-2 bg-vello-bg rounded-lg">
                <kpi.icon size={20} className="text-vello-accent" />
              </div>
              {kpi.trend && (
                <div className={`flex items-center text-sm font-medium ${kpi.positive ? 'text-vello-success' : 'text-vello-error'}`}>
                  {kpi.trend}
                </div>
              )}
            </div>
            <div className="mt-4">
              <h3 className="text-2xl font-bold text-vello-text">{kpi.value}</h3>
              <p className="text-sm text-vello-muted mt-1">{kpi.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Payouts */}
        <div className="bg-vello-card border border-vello-border rounded-xl flex flex-col">
          <div className="p-5 border-b border-vello-border flex items-center justify-between">
            <h2 className="text-lg font-semibold text-vello-text">Próximos Repasses</h2>
            <button className="text-sm text-vello-accent hover:underline">Ver histórico</button>
          </div>
          <div className="flex-1 p-0">
            <ul className="divide-y divide-vello-border">
              {payouts.map((payout) => (
                <li key={payout.id} className="p-5 hover:bg-vello-bg/50 transition-colors flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-vello-text">{payout.date}</p>
                    <p className="text-xs text-vello-muted mt-0.5">{payout.account}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-vello-text">{payout.amount}</p>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium mt-1 uppercase tracking-wider ${
                      payout.status === 'Pago' ? 'bg-vello-success/10 text-vello-success' : 'bg-vello-warning/10 text-vello-warning'
                    }`}>
                      {payout.status}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Simplified DRE */}
        <div className="bg-vello-card border border-vello-border rounded-xl flex flex-col">
          <div className="p-5 border-b border-vello-border">
            <h2 className="text-lg font-semibold text-vello-text">Resumo DRE (Março)</h2>
          </div>
          <div className="p-5 flex-1">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-vello-muted">Receita Bruta (Reservas)</span>
                <span className="text-sm font-medium text-vello-text">R$ 42.000,00</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-vello-muted">Receita Bruta (Eventos)</span>
                <span className="text-sm font-medium text-vello-text">R$ 3.230,00</span>
              </div>
              <div className="border-t border-vello-border pt-4 flex justify-between items-center">
                <span className="text-sm font-medium text-vello-text">Total Receitas</span>
                <span className="text-sm font-bold text-vello-text">R$ 45.230,00</span>
              </div>
              <div className="flex justify-between items-center text-vello-error">
                <span className="text-sm">- Taxa Vello (8%)</span>
                <span className="text-sm font-medium">- R$ 3.618,40</span>
              </div>
              <div className="flex justify-between items-center text-vello-error">
                <span className="text-sm">- Taxa Processamento (2%)</span>
                <span className="text-sm font-medium">- R$ 904,60</span>
              </div>
              <div className="flex justify-between items-center text-vello-error">
                <span className="text-sm">- Reembolsos</span>
                <span className="text-sm font-medium">- R$ 0,00</span>
              </div>
              <div className="border-t border-vello-border pt-4 flex justify-between items-center">
                <span className="text-base font-bold text-vello-text">Receita Líquida</span>
                <span className="text-base font-bold text-vello-success">R$ 40.707,00</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Need to import ShieldAlert for the restricted view
import { ShieldAlert } from 'lucide-react';
