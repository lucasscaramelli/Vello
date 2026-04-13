import { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Plus } from 'lucide-react';
import { format, addDays, subDays } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function Agenda() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const courts = [
    { id: 'c1', name: 'Quadra 1 (Areia)' },
    { id: 'c2', name: 'Quadra 2 (Areia)' },
    { id: 'c3', name: 'Quadra 3 (Areia)' },
    { id: 'c4', name: 'Campo Society' },
  ];

  const hours = Array.from({ length: 15 }, (_, i) => i + 8); // 08:00 to 22:00

  // Mock bookings
  const bookings = [
    { id: 'b1', courtId: 'c1', hour: 10, duration: 1.5, client: 'Lucas Mendes', type: 'Beach Tennis', status: 'confirmed' },
    { id: 'b2', courtId: 'c2', hour: 14, duration: 1, client: 'Marina Costa', type: 'Futevôlei', status: 'pending' },
    { id: 'b3', courtId: 'c4', hour: 19, duration: 2, client: 'Racha do Pedro', type: 'Futebol Society', status: 'confirmed' },
    { id: 'b4', courtId: 'c3', hour: 8, duration: 2, client: 'Manutenção', type: 'Bloqueio', status: 'blocked' },
  ];

  const getBooking = (courtId: string, hour: number) => {
    return bookings.find(b => b.courtId === courtId && b.hour === hour);
  };

  return (
    <div className="h-full flex flex-col bg-vello-bg">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-vello-text">Agenda</h1>
          <p className="text-vello-muted text-sm mt-1">Gerencie os horários e quadras</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center bg-vello-card border border-vello-border rounded-lg p-1">
            <button 
              onClick={() => setCurrentDate(subDays(currentDate, 1))}
              className="p-1.5 text-vello-muted hover:text-vello-text hover:bg-vello-bg rounded"
            >
              <ChevronLeft size={18} />
            </button>
            <div className="px-4 py-1.5 text-sm font-medium text-vello-text flex items-center gap-2 min-w-[140px] justify-center">
              <CalendarIcon size={16} className="text-vello-accent" />
              {format(currentDate, "dd 'de' MMM", { locale: ptBR })}
            </div>
            <button 
              onClick={() => setCurrentDate(addDays(currentDate, 1))}
              className="p-1.5 text-vello-muted hover:text-vello-text hover:bg-vello-bg rounded"
            >
              <ChevronRight size={18} />
            </button>
          </div>
          
          <button className="flex items-center gap-2 px-4 py-2 bg-vello-accent text-vello-bg text-sm font-medium rounded-md hover:bg-vello-accent-hover transition-colors">
            <Plus size={16} />
            Nova Reserva
          </button>
        </div>
      </div>

      {/* Grid Container */}
      <div className="flex-1 overflow-auto bg-vello-card border border-vello-border rounded-xl relative">
        <div className="min-w-[800px]">
          {/* Grid Header (Courts) */}
          <div className="flex border-b border-vello-border sticky top-0 bg-vello-card z-10">
            <div className="w-20 shrink-0 border-r border-vello-border bg-vello-card"></div>
            {courts.map(court => (
              <div key={court.id} className="flex-1 p-3 text-center border-r border-vello-border last:border-r-0 font-medium text-sm text-vello-text">
                {court.name}
              </div>
            ))}
          </div>

          {/* Grid Body */}
          <div className="relative">
            {hours.map(hour => (
              <div key={hour} className="flex border-b border-vello-border/50 group">
                {/* Time Column */}
                <div className="w-20 shrink-0 border-r border-vello-border p-2 text-xs text-vello-muted text-right sticky left-0 bg-vello-card z-10">
                  {`${hour.toString().padStart(2, '0')}:00`}
                </div>
                
                {/* Cells */}
                {courts.map(court => {
                  const booking = getBooking(court.id, hour);
                  
                  return (
                    <div 
                      key={`${court.id}-${hour}`} 
                      className="flex-1 border-r border-vello-border/50 last:border-r-0 relative h-16 hover:bg-vello-bg/50 transition-colors cursor-pointer"
                    >
                      {booking && (
                        <div 
                          className={`absolute inset-x-1 top-1 rounded p-2 overflow-hidden z-0 ${
                            booking.status === 'blocked' ? 'bg-vello-border/50 border border-vello-border border-dashed' :
                            booking.status === 'pending' ? 'bg-vello-warning/10 border border-vello-warning/30' :
                            'bg-vello-accent/10 border border-vello-accent/30'
                          }`}
                          style={{ height: `calc(${booking.duration * 100}% - 8px)` }}
                        >
                          <div className={`text-xs font-semibold truncate ${
                            booking.status === 'blocked' ? 'text-vello-muted' :
                            booking.status === 'pending' ? 'text-vello-warning' :
                            'text-vello-accent'
                          }`}>
                            {booking.client}
                          </div>
                          <div className="text-[10px] text-vello-muted truncate mt-0.5">
                            {booking.type}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
