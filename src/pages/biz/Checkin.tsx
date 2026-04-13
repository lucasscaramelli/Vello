import { useState } from 'react';
import { QrCode, Search, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

export function Checkin() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showScanner, setShowScanner] = useState(false);

  const todayBookings = [
    { id: '1', client: 'Lucas Mendes', court: 'Quadra 1', time: '14:00', status: 'checked-in', payment: 'Pago' },
    { id: '2', client: 'Marina Costa', court: 'Quadra 2', time: '14:30', status: 'pending', payment: 'Pendente' },
    { id: '3', client: 'Pedro Alves', court: 'Quadra 3', time: '15:00', status: 'pending', payment: 'Pago' },
    { id: '4', client: 'João Lima', court: 'Quadra 1', time: '10:00', status: 'no-show', payment: 'Pago' },
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-vello-text">Check-in</h1>
          <p className="text-vello-muted text-sm mt-1">Controle de acesso e presença</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Scanner Area */}
        <div className="bg-vello-card border border-vello-border rounded-xl p-6 flex flex-col items-center justify-center text-center min-h-[300px]">
          {showScanner ? (
            <div className="w-full flex flex-col items-center">
              <div className="w-64 h-64 bg-vello-bg border-2 border-vello-accent border-dashed rounded-lg flex items-center justify-center mb-4 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-vello-accent animate-[scan_2s_ease-in-out_infinite]"></div>
                <p className="text-vello-muted text-sm">Câmera ativa...</p>
              </div>
              <button 
                onClick={() => setShowScanner(false)}
                className="px-4 py-2 bg-vello-bg border border-vello-border text-vello-text text-sm font-medium rounded-md hover:bg-vello-border/50 transition-colors"
              >
                Cancelar
              </button>
            </div>
          ) : (
            <>
              <div className="w-20 h-20 bg-vello-accent/10 text-vello-accent rounded-full flex items-center justify-center mb-4">
                <QrCode size={40} />
              </div>
              <h2 className="text-lg font-semibold text-vello-text mb-2">Escanear QR Code</h2>
              <p className="text-vello-muted text-sm mb-6 max-w-xs">
                Peça para o cliente abrir o app Vello e mostrar o QR Code da reserva.
              </p>
              <button 
                onClick={() => setShowScanner(true)}
                className="px-6 py-3 bg-vello-accent text-vello-bg text-base font-bold rounded-lg hover:bg-vello-accent-hover transition-colors w-full max-w-xs"
              >
                Abrir Câmera
              </button>
            </>
          )}
        </div>

        {/* Manual Check-in & List */}
        <div className="bg-vello-card border border-vello-border rounded-xl flex flex-col">
          <div className="p-4 border-b border-vello-border">
            <h2 className="text-lg font-semibold text-vello-text mb-4">Check-in Manual (Hoje)</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-vello-muted" size={18} />
              <input 
                type="text" 
                placeholder="Buscar por nome do cliente..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-vello-bg border border-vello-border rounded-lg text-sm text-vello-text focus:outline-none focus:border-vello-accent focus:ring-1 focus:ring-vello-accent"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-0 max-h-[400px]">
            <ul className="divide-y divide-vello-border">
              {todayBookings.map((booking) => (
                <li key={booking.id} className="p-4 hover:bg-vello-bg/50 transition-colors flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-vello-text">{booking.client}</p>
                    <p className="text-xs text-vello-muted">{booking.time} • {booking.court}</p>
                    {booking.payment === 'Pendente' && (
                      <span className="inline-flex items-center gap-1 text-[10px] text-vello-warning mt-1 font-medium uppercase">
                        <AlertCircle size={10} /> Pagamento Pendente
                      </span>
                    )}
                  </div>
                  <div>
                    {booking.status === 'checked-in' ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-vello-success/10 text-vello-success border border-vello-success/20">
                        <CheckCircle size={14} /> Realizado
                      </span>
                    ) : booking.status === 'no-show' ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-vello-error/10 text-vello-error border border-vello-error/20">
                        <XCircle size={14} /> No-show
                      </span>
                    ) : (
                      <button className="px-3 py-1.5 bg-vello-bg border border-vello-border text-vello-text text-xs font-medium rounded-md hover:bg-vello-accent hover:text-vello-bg hover:border-vello-accent transition-colors">
                        Fazer Check-in
                      </button>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
