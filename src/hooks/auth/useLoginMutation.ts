import { useMutation } from '@tanstack/react-query';
import { loginRequest, LoginResponse } from '@/api/auth';
import { AxiosError } from 'axios';

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: loginRequest,
    onSuccess: (data: LoginResponse) => {
      localStorage.setItem('accessToken', data.accessToken);
      window.location.href = '/'; // 로그인 성공 후 메인으로 이동
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      alert('로그인 실패: ' + (error.response?.data?.message || '알 수 없는 오류'));
    },
  });
};
