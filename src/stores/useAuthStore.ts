import { create } from 'zustand';

interface User {
  id: number;
  email: string;
  nickName: string;
  bio: string;
  profileImage: string;
}

interface AuthState {
  isLoggedIn: boolean;
  isLoading: boolean;
  hasChecked: boolean;
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
  checkLoginStatus: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  isLoggedIn: false,
  isLoading: true,
  hasChecked: false,
  user: null,

  setUser: (user) => set({ user, isLoggedIn: !!user }),

  logout: () => set({ user: null, isLoggedIn: false }),

  checkLoginStatus: async () => {
    if (get().hasChecked) return;

    set({ isLoading: true });

    try {
      // TODO: API 연결 후 토큰 확인 로직 구현
      // const token = sessionStorage.getItem('accessToken');
      // if (token) {
      //   set({ isLoggedIn: true, hasChecked: true, isLoading: false });
      // } else {
      //   set({
      //     isLoggedIn: false,
      //     isLoading: false,
      //     hasChecked: true,
      //   });
      // }

      // 임시: 기본값으로 설정
      set({
        isLoggedIn: false,
        isLoading: false,
        hasChecked: true,
      });
    } catch {
      set({
        isLoggedIn: false,
        isLoading: false,
        hasChecked: true,
      });
    }
  },
}));
