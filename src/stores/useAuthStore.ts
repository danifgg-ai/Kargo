import { create } from 'zustand'

interface UserProfile {
  id: string
  email: string
  fullName: string
  company: string | null
  ruc: string | null
  phone: string | null
  avatarUrl: string | null
  role: 'client' | 'admin' | 'super_admin'
}

interface AuthState {
  user: UserProfile | null
  isLoading: boolean
  setUser: (user: UserProfile | null) => void
  setLoading: (loading: boolean) => void
  clear: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,
  setUser: (user) => set({ user, isLoading: false }),
  setLoading: (isLoading) => set({ isLoading }),
  clear: () => set({ user: null, isLoading: false }),
}))
