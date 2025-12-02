import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useKakaoStart } from '@src/hooks/auth/useAuth';
import { loginRequest } from '@/api/auth';
import { AxiosError } from 'axios';
import { useUserStore } from '@/store/userStore';

export const useLogin = () => {
  const navigate = useNavigate();
  const { mutate: startKakao } = useKakaoStart();
  const { login } = useUserStore();

  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailLogin = async () => {
    if (!form.email.trim() || !form.password.trim()) {
      alert('이메일과 비밀번호를 모두 입력해주세요.');
      return;
    }

    setIsLoading(true);
    try {
      const data = await loginRequest({
        email: form.email.trim(),
        password: form.password,
      });

      login({
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
        nickname: data.nickname || '',
        profilePicture: data.profilePicture || '',
        introduction: data.introduction || '',
      });

      alert('로그인 성공!');
      navigate('/', { replace: true });
    } catch (error: unknown) {
      console.error('로그인 실패:', error);
      if (error instanceof AxiosError) {
        alert(error.response?.data?.message || '로그인 중 오류가 발생했습니다.');
      } else {
        alert('로그인 중 알 수 없는 오류가 발생했습니다.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleKakaoLogin = () => startKakao();

  const handleNavigate = (path: string) => navigate(path);

  return {
    form,
    setForm,
    isLoading,
    handleEmailLogin,
    handleKakaoLogin,
    handleNavigate,
  };
};
