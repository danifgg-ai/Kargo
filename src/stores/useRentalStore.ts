import { create } from 'zustand'

interface RentalDraft {
  machineryId: string | null
  machineryName: string | null
  machineryImage: string | null
  startDate: string | null
  endDate: string | null
  rateType: 'hour' | 'day' | 'week' | 'month'
  rateAmount: number
  subtotal: number
  iva: number
  deposit: number
  total: number
  deliveryType: 'pickup' | 'delivery'
  deliveryAddress: string
  deliveryNotes: string
}

interface RentalState {
  draft: RentalDraft
  setDraft: (updates: Partial<RentalDraft>) => void
  clearDraft: () => void
}

const initialDraft: RentalDraft = {
  machineryId: null,
  machineryName: null,
  machineryImage: null,
  startDate: null,
  endDate: null,
  rateType: 'day',
  rateAmount: 0,
  subtotal: 0,
  iva: 0,
  deposit: 0,
  total: 0,
  deliveryType: 'pickup',
  deliveryAddress: '',
  deliveryNotes: '',
}

export const useRentalStore = create<RentalState>((set) => ({
  draft: initialDraft,
  setDraft: (updates) =>
    set((state) => ({ draft: { ...state.draft, ...updates } })),
  clearDraft: () => set({ draft: initialDraft }),
}))
