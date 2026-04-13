import { Users, CalendarCheck, TrendingUp, AlertCircle, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { useVenueStore } from '../../store/venueStore';

export function Dashboard() {
  const { getSelectedVenue } = useVenueStore();
  const venue = getSelectedVenue();

  const kpis = [
    { label: 'Ocupação Hoje', value: '78%', trend: '+5%', positive: true, icon: Users },
    { label: 'Receita do Mês', value: 'R$ 50.000', // test trend: '+12%', positive: true, icon: TrendingUp },
    { label: 'Reservas do Mês', value: '342', trend: '+8%', positive: true, icon: CalendarCheck },
    { label: 'No-shows', value: '12', trend: '-2%', positive: true, icon: AlertCircle },
  ];

  const upcomingBookings = [
    { id: '1', client: 'Lucas Mendes', court: 'Quadra 1 (Areia)', sport: 'Beach Tennis', time: '14:00 - 15:30', status: 'Confirmada' },
    { id: '2', client: 'Marina Costa', court: 'Quadra 2 (Areia)', sport: 'Futevôlei', time: '14:30 - 16:00', status: 'Pendente' },
    { id: '3', client: 'Pedro Alves', court: 'Quadra 3 (Areia)', sport: 'Beach Tennis', time: '15:00 - 16:30', status: 'Confirmada' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-vello-text">Dashboard</h1>
          <p className="text-vello-muted text-sm mt-1">
            Visão geral de {venue ? venue.name : 'todas as unidades'}
          </p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-vello-card border border-vello-border text-vello-text text-sm font-medium rounded-md hover:bg-vello-border/50 transition-colors">
            Nova Reserva
          </button>
          <button className="px-4 py-2 bg-vello-accent text-vello-bg text-sm font-medium rounded-md hover:bg-vello-accent-hover transition-colors">
            Escanear Check-in
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
              <div className={`flex items-center text-sm font-medium ${kpi.positive ? 'text-vello-success' : 'text-vello-error'}`}>
                {kpi.positive ? <ArrowUpRight size={16} className="mr-1" /> : <ArrowDownRight size={16} className="mr-1" />}
                {kpi.trend}
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-3xl font-bold text-vello-text">{kpi.value}</h3>
              <p className="text-sm text-vello-muted mt-1">{kpi.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* AI Insight */}
      <div className="bg-vello-card border border-vello-accent/30 rounded-xl p-5 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-vello-accent"></div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-vello-accent bg-vello-accent/10 px-2 py-0.5 rounded">Vello AI Insight</span>
            </div>
            <p className="text-vello-text text-sm">
              Identificamos <strong>30% de ociosidade</strong> amanhã entre 14h e 16h na Quadra 2. Sugerimos lançar uma promoção Last Minute com 20% de desconto.
            </p>
          </div>
          <button className="whitespace-nowrap px-4 py-2 bg-vello-accent/10 text-vello-accent border border-vello-accent/20 text-sm font-medium rounded-md hover:bg-vello-accent/20 transition-colors">
            Criar Promoção
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming Bookings */}
        <div className="lg:col-span-2 bg-vello-card border border-vello-border rounded-xl flex flex-col">
          <div className="p-5 border-b border-vello-border flex items-center justify-between">
            <h2 className="text-lg font-semibold text-vello-text">Próximas Reservas</h2>
            <button className="text-sm text-vello-accent hover:underline">Ver todas</button>
          </div>
          <div className="flex-1 p-0">
            <ul className="divide-y divide-vello-border">
              {upcomingBookings.map((booking) => (
                <li key={booking.id} className="p-5 hover:bg-vello-bg/50 transition-colors flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-vello-bg flex items-center justify-center text-vello-accent font-bold">
                      {booking.client.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-vello-text">{booking.client}</p>
                      <p className="text-xs text-vello-muted">{booking.court} • {booking.sport}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-vello-text">{booking.time}</p>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium mt-1 ${
                      booking.status === 'Confirmada' ? 'bg-vello-success/10 text-vello-success' : 'bg-vello-warning/10 text-vello-warning'
                    }`}>
                      {booking.status}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Occupancy Heatmap (Simplified) */}
        <div className="bg-vello-card border border-vello-border rounded-xl flex flex-col">
          <div className="p-5 border-b border-vello-border">
            <h2 className="text-lg font-semibold text-vello-text">Ocupação (Semana)</h2>
          </div>
          <div className="p-5 flex-1 flex flex-col justify-center">
            <div className="grid grid-cols-7 gap-1">
              {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map((d, i) => (
                <div key={i} className="text-center text-xs text-vello-muted mb-2">{d}</div>
              ))}
              {Array.from({ length: 28 }).map((_, i) => {
                const intensity = Math.random();
                return (
                  <div 
                    key={i} 
                    className="aspect-square rounded-sm"
                    style={{ 
                      backgroundColor: intensity > 0.7 ? '#C8E946' : intensity > 0.4 ? 'rgba(200, 233, 70, 0.5)' : intensity > 0.1 ? 'rgba(200, 233, 70, 0.2)' : '#2D333B'
                    }}
                    title={`Ocupação: ${Math.round(intensity * 100)}%`}
                  />
                );
              })}
            </div>
            <div className="mt-4 flex items-center justify-between text-xs text-vello-muted">
              <span>Baixa</span>
              <div className="flex gap-1">
                <div className="w-3 h-3 rounded-sm bg-[#2D333B]"></div>
                <div className="w-3 h-3 rounded-sm bg-vello-accent/20"></div>
                <div className="w-3 h-3 rounded-sm bg-vello-accent/50"></div>
                <div className="w-3 h-3 rounded-sm bg-vello-accent"></div>
              </div>
              <span>Alta</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
