import { create } from 'zustand';
import { setAccessToken, setRefreshToken } from '@/api/apiInstance';
import { queryClient } from '@/App';

interface AuthState {
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(() => ({
  logout: () => {
    setAccessToken(null);
    setRefreshToken(null);
    sessionStorage.removeItem('isKakaoSignup');
    sessionStorage.removeItem('kakaoId');
    queryClient.removeQueries({ queryKey: ['userInfo'] });
    window.location.href = '/';
  },
}));
