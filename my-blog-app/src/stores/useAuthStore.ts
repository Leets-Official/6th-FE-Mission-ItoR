import { create } from 'zustand'

export interface AuthState {
  isLoggedIn: boolean
  token: string | null
  login: (token: string) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: !!localStorage.getItem('token'),
  token: localStorage.getItem('token'),
  login: (token) => {
    localStorage.setItem('token', token)
    set({ isLoggedIn: true, token })
  },
  logout: () => {
    localStorage.removeItem('token')
    set({ isLoggedIn: false, token: null })
  },
}))
