import { create } from 'zustand'

export interface AuthState {
  isLoggedIn: boolean
  token: string | null
  login: (token: string) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: !!localStorage.getItem('accessToken'),
  token: localStorage.getItem('accessToken'),
  login: (token) => {
    localStorage.setItem('accessToken', token)
    set({ isLoggedIn: true, token })
  },
  logout: () => {
    localStorage.removeItem('accessToken')
    set({ isLoggedIn: false, token: null })
  },
}))
