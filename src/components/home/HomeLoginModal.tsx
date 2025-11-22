// src/components/home/HomeLoginModal.tsx
import React from "react";
import { Link } from "react-router-dom";

import clearIcon from "@icons/clear.svg";
import kakaoIcon from "@icons/kakao.svg";
import "@src/styles/auth.css";

type Props = {
  open: boolean;
  onClose: () => void;
  onKakaoLogin: () => void;
  isKakaoStarting: boolean;
};

export default function HomeLoginModal({
  open,
  onClose,
  onKakaoLogin,
  isKakaoStarting,
}: Props) {
  if (!open) return null;

  return (
    <div
      className="auth-dim"
      onClick={onClose}
      role="presentation"
    >
      <section
        className="auth-card"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="로그인"
      >
        <button
          type="button"
          className="auth-close"
          onClick={onClose}
          aria-label="닫기"
        >
          <img src={clearIcon} alt="" />
        </button>

        <div className="auth-hero">
          <div className="logo-text">GITLOG</div>
          <p className="auth-hero__caption">
            나의 성장 기록, 지금 시작하세요
          </p>
        </div>

        <form
          className="auth-form"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="auth-fields">
            <input
              className="auth-input"
              type="email"
              placeholder="이메일"
            />
            <input
              className="auth-input"
              type="password"
              placeholder="비밀번호"
            />
          </div>

          <button
            type="submit"
            className="auth-btn auth-btn--primary"
          >
            로그인
          </button>

          <div className="auth-sns-sep">또는</div>

          <button
            type="button"
            className="auth-btn auth-btn--kakao"
            onClick={onKakaoLogin}
            disabled={isKakaoStarting}
          >
            <img
              src={kakaoIcon}
              alt=""
              width={18}
              height={18}
              style={{ display: "block" }}
            />
            {isKakaoStarting
              ? "카카오로 이동 중..."
              : "카카오로 계속하기"}
          </button>

          <div className="auth-switch">
            <Link to="/join" className="auth-switch__btn">
              아직 회원이 아니신가요? 회원가입
            </Link>
          </div>
        </form>
      </section>
    </div>
  );
}
