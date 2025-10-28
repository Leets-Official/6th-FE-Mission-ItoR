import { useState, KeyboardEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockUser } from '@/_mocks_/mockUser';
import { useAuthStore } from '@/stores/useAuthStore';

export const useLoginForm = (onClose?: () => void) => {
  const navigate = useNavigate();
  const setUser = useAuthStore(state => state.setUser);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = () => {
    if (email === mockUser.email && password === mockUser.password) {
      setErrorMessage('');
      // 로그인 상태 및 사용자 정보 업데이트
      setUser({
        id: mockUser.id,
        email: mockUser.email,
        name: mockUser.name,
        birthDate: mockUser.birthDate,
        nickName: mockUser.nickName,
        bio: mockUser.bio,
        profileImage: mockUser.profileImage,
      });
      onClose?.();
      navigate('/');
    } else {
      setErrorMessage('이메일 또는 비밀번호가 일치하지 않습니다.');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  const handleKakaoLogin = () => {
    // TODO: 카카오 로그인 구현
  };

  const handleSignup = () => {
    onClose?.();
    navigate('/mypage');
  };

  return {
    email,
    password,
    errorMessage,
    setEmail,
    setPassword,
    handleLogin,
    handleKeyDown,
    handleKakaoLogin,
    handleSignup,
  };
};
