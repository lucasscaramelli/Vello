import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, CalendarDays, BookOpen, QrCode, 
  Users, DollarSign, Tag, PieChart, Package, 
  Settings, Shield, LogOut, Menu, X, ArrowLeft
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { useAuthStore } from '../../store/authStore';

const NAV_ITEMS = [
  { path: '/biz', label: 'Dashboard', icon: LayoutDashboard, roles: ['partner_owner', 'partner_manager', 'partner_staff', 'admin'] },
  { path: '/biz/agenda', label: 'Agenda', icon: CalendarDays, roles: ['partner_owner', 'partner_manager', 'partner_staff', 'admin'] },
  { path: '/biz/reservas', label: 'Reservas', icon: BookOpen, roles: ['partner_owner', 'partner_manager', 'partner_staff', 'admin'] },
  { path: '/biz/checkin', label: 'Check-in', icon: QrCode, roles: ['partner_owner', 'partner_manager', 'partner_staff', 'admin'] },
  { path: '/biz/clientes', label: 'Clientes', icon: Users, roles: ['partner_owner', 'partner_manager', 'admin'] },
  { path: '/biz/precos', label: 'Preços', icon: DollarSign, roles: ['partner_owner', 'partner_manager', 'admin'] },
  { path: '/biz/promocoes', label: 'Promoções', icon: Tag, roles: ['partner_owner', 'partner_manager', 'admin'] },
  { path: '/biz/financeiro', label: 'Financeiro', icon: PieChart, roles: ['partner_owner', 'admin'] },
  { path: '/biz/relatorios', label: 'Relatórios', icon: PieChart, roles: ['partner_owner', 'partner_manager', 'admin'] },
  { path: '/biz/estoque', label: 'Estoque', icon: Package, roles: ['partner_owner', 'partner_manager', 'admin'] },
  { path: '/biz/configuracoes', label: 'Configurações', icon: Settings, roles: ['partner_owner', 'admin'] },
  { path: '/biz/equipe', label: 'Equipe', icon: Shield, roles: ['partner_owner', 'admin'] },
];

export function Sidebar({ mobileOpen, setMobileOpen }: { mobileOpen: boolean, setMobileOpen: (v: boolean) => void }) {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const filteredNav = NAV_ITEMS.filter(item => user && item.roles.includes(user.role));

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden" 
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-vello-card border-r border-vello-border flex flex-col transition-transform duration-300 lg:translate-x-0 lg:static",
        mobileOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="h-16 flex items-center px-6 border-b border-vello-border justify-between">
          <div className="flex items-center gap-2 text-vello-accent font-bold text-xl tracking-tight">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M8 12L11 15L16 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Vello.biz
          </div>
          <button className="lg:hidden text-vello-muted" onClick={() => setMobileOpen(false)}>
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {filteredNav.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/biz'}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) => cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors",
                isActive 
                  ? "bg-vello-accent/10 text-vello-accent" 
                  : "text-vello-muted hover:bg-vello-border/50 hover:text-vello-text"
              )}
            >
              <item.icon size={18} />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-vello-border">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-sm text-vello-muted hover:text-vello-text transition-colors w-full px-2 py-2"
          >
            <ArrowLeft size={16} />
            Voltar ao app (B2C)
          </button>
        </div>
      </aside>
    </>
  );
}
