import { create } from 'zustand';

export interface Venue {
  id: string;
  name: string;
  address: string;
  neighborhood: string;
}

interface VenueState {
  venues: Venue[];
  selectedVenueId: string | 'all';
  setSelectedVenueId: (id: string | 'all') => void;
  getSelectedVenue: () => Venue | null;
}

export const MOCK_VENUES: Venue[] = [
  { id: 'v1', name: 'Arena Beach Moema', address: 'Av. Ibirapuera, 1000', neighborhood: 'Moema' },
  { id: 'v2', name: 'Tennis Club Ibirapuera', address: 'Rua Curitiba, 200', neighborhood: 'Ibirapuera' },
  { id: 'v3', name: 'Society Park Vila Olímpia', address: 'Rua Funchal, 500', neighborhood: 'Vila Olímpia' },
];

export const useVenueStore = create<VenueState>((set, get) => ({
  venues: MOCK_VENUES,
  selectedVenueId: MOCK_VENUES[0].id,
  setSelectedVenueId: (id) => set({ selectedVenueId: id }),
  getSelectedVenue: () => {
    const { venues, selectedVenueId } = get();
    if (selectedVenueId === 'all') return null;
    return venues.find(v => v.id === selectedVenueId) || null;
  }
}));
