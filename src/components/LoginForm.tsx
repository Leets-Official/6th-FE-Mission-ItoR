import React from 'react';
import KakaoIcon from '@/assets/svgs/kakao.svg?react';
import { S } from '@/styles/Login.styles';

interface LoginFormProps {
  form: { email: string; password: string };
  setForm: (form: { email: string; password: string }) => void;
  isLoading: boolean;
  onEmailLogin: () => void;
  onKakaoLogin: () => void;
  onNavigateToSignup: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
  form,
  setForm,
  isLoading,
  onEmailLogin,
  onKakaoLogin,
  onNavigateToSignup,
}) => {
  return (
    <div className={S.formContainer}>
      <input
        type="email"
        placeholder="이메일"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        className={`${S.input} ${S.emailInput}`}
      />

      <input
        type="password"
        placeholder="비밀번호"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        className={`${S.input} ${S.passwordInput}`}
      />

      <button onClick={onEmailLogin} disabled={isLoading} className={`${S.emailLoginButton} bg-blue-500`}>
        {isLoading ? '로그인 중...' : '이메일로 로그인'}
      </button>

      <div className={S.dividerContainer}>
        <div className={S.dividerLine} />
        <span className={S.dividerText}>SNS</span>
        <div className={S.dividerLine} />
      </div>

      <button onClick={onKakaoLogin} className={`${S.kakaoLoginButton} bg-yellow-400`}>
        <KakaoIcon className={S.kakaoIcon} />
        카카오로 로그인
      </button>

      <p onClick={onNavigateToSignup} className={S.signupLink}>
        또는 회원가입
      </p>
    </div>
  );
};

export default LoginForm;
