import { create } from 'zustand';

export type Role = 'consumer' | 'partner_owner' | 'partner_manager' | 'partner_staff' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: Role;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, role?: Role) => void;
  logout: () => void;
}

// Mock users for testing different roles
export const MOCK_USERS: Record<string, User> = {
  'owner@vello.biz': { id: 'u1', name: 'Pedro Almeida', email: 'owner@vello.biz', role: 'partner_owner', avatar: 'https://i.pravatar.cc/150?u=u1' },
  'manager@vello.biz': { id: 'u2', name: 'Mariana Costa', email: 'manager@vello.biz', role: 'partner_manager', avatar: 'https://i.pravatar.cc/150?u=u2' },
  'staff@vello.biz': { id: 'u3', name: 'João Lima', email: 'staff@vello.biz', role: 'partner_staff', avatar: 'https://i.pravatar.cc/150?u=u3' },
  'admin@vello.biz': { id: 'u4', name: 'Vello Admin', email: 'admin@vello.biz', role: 'admin', avatar: 'https://i.pravatar.cc/150?u=u4' },
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null, // Start logged out
  isAuthenticated: false,
  login: (email, role) => {
    const user = MOCK_USERS[email] || { 
      id: Math.random().toString(), 
      name: email.split('@')[0], 
      email, 
      role: role || 'partner_owner' 
    };
    set({ user, isAuthenticated: true });
  },
  logout: () => set({ user: null, isAuthenticated: false }),
}));
