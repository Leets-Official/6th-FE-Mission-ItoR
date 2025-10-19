import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import clearIcon from '../assets/icons/clear.svg';
import kakaoIcon from '../assets/icons/kakao.svg';
// src/pages/LoginPage.tsx
import '../styles/auth.css';


export default function LoginPage() {
  const nav = useNavigate();
  const close = () => nav(-1);
  const [mode, setMode] = useState<'login' | 'signup'>('login');

  return (
    <div className="auth-overlay" onClick={close}>
      <section className="auth-card" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="auth-card__close" onClick={close} aria-label="닫기">
          <img src={clearIcon} alt="" />
        </button>

        <div className="auth-hero">
          <div className="logo-text">GITLOG</div>
          <p className="auth-hero__caption">You can make anything by writing</p>
        </div>

        <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
          <div className="auth-fields">
            <input className="auth-input" type="email" placeholder="이메일" />
            <input className="auth-input" type="password" placeholder="비밀번호" />
          </div>

          <button type="submit" className="auth-btn auth-btn--primary" style={{ marginTop: 8 }}>
            {mode === 'login' ? '로그인' : '회원가입'}
          </button>

          <div className="auth-sns-sep">또는</div>

          <button type="button" className="auth-btn auth-btn--kakao">
            <img src={kakaoIcon} alt="" />
            카카오로 계속하기
          </button>

          <div className="auth-switch">
            {mode === 'login' ? (
              <button type="button" className="auth-switch__btn" onClick={() => setMode('signup')}>
                아직 계정이 없나요? 회원가입
              </button>
            ) : (
              <button type="button" className="auth-switch__btn" onClick={() => setMode('login')}>
                이미 계정이 있나요? 로그인
              </button>
            )}
          </div>
        </form>
      </section>
    </div>
  );
}
