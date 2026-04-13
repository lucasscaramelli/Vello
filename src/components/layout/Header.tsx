import { Menu, Bell, ChevronDown, LogOut } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useVenueStore } from '../../store/venueStore';
import { useState } from 'react';

export function Header({ onMenuClick }: { onMenuClick: () => void }) {
  const { user, logout } = useAuthStore();
  const { venues, selectedVenueId, setSelectedVenueId } = useVenueStore();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const roleLabels: Record<string, string> = {
    partner_owner: 'Proprietário',
    partner_manager: 'Gerente',
    partner_staff: 'Staff',
    admin: 'Admin'
  };

  return (
    <header className="h-16 bg-vello-card border-b border-vello-border flex items-center justify-between px-4 lg:px-8 z-30 sticky top-0">
      <div className="flex items-center gap-4">
        <button 
          className="lg:hidden text-vello-muted hover:text-vello-text"
          onClick={onMenuClick}
        >
          <Menu size={24} />
        </button>

        <div className="relative">
          <select 
            className="appearance-none bg-vello-bg border border-vello-border text-vello-text text-sm rounded-md pl-3 pr-8 py-1.5 focus:outline-none focus:ring-1 focus:ring-vello-accent cursor-pointer"
            value={selectedVenueId}
            onChange={(e) => setSelectedVenueId(e.target.value)}
          >
            {venues.map(v => (
              <option key={v.id} value={v.id}>{v.name}</option>
            ))}
            {user?.role === 'partner_owner' && (
              <option value="all">Visão Consolidada (Todas)</option>
            )}
          </select>
          <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-vello-muted pointer-events-none" />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="text-vello-muted hover:text-vello-text relative">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-vello-accent rounded-full"></span>
        </button>

        <div className="relative">
          <button 
            className="flex items-center gap-2 focus:outline-none"
            onClick={() => setShowProfileMenu(!showProfileMenu)}
          >
            <div className="text-right hidden sm:block">
              <div className="text-sm font-medium text-vello-text">{user?.name}</div>
              <div className="text-xs text-vello-muted">{user ? roleLabels[user.role] : ''}</div>
            </div>
            <img 
              src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.name}&background=1C2128&color=C8E946`} 
              alt="Avatar" 
              className="w-8 h-8 rounded-full border border-vello-border"
            />
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-vello-card border border-vello-border rounded-md shadow-lg py-1 z-50">
              <button 
                onClick={() => {
                  logout();
                  setShowProfileMenu(false);
                }}
                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-vello-error hover:bg-vello-bg transition-colors"
              >
                <LogOut size={16} />
                Sair
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
