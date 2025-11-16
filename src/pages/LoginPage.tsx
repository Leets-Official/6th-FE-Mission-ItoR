// src/pages/LoginPage.tsx
import React from "react";
import { useNavigate } from "react-router-dom";

import { useForm } from "@src/hooks/useForm";
import Button from "@ui/Button/Button";
import AuthInput from "@ui/AuthInput";
import clearIcon from "@icons/clear.svg";
import "@src/styles/auth.css";
import { useLogin } from "@src/hooks/useAuth";
import KakaoLoginButton from "@src/components/KakaoLoginButton";

export default function LoginPage() {
  const nav = useNavigate();
  const close = () => nav(-1);

  const { values, handleChange, runValidation } = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: (v) => {
      const err: { [key: string]: string } = {};
      if (!v.email.trim()) {
        err.email = "이메일을 입력해주세요.";
      }
      if (!v.password.trim()) {
        err.password = "비밀번호를 입력해주세요.";
      }
      return err;
    },
  });

  // 실제로 사용하는 값만 구조분해 (unused 경고 방지)
  const { mutate: login, isPending, isError, error } = useLogin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = runValidation();
    if (!ok) return;

    login(
      {
        email: values.email,
        password: values.password,
      },
      {
        onSuccess: (res) => {
          const { accessToken, refreshToken } = res.data;

          if (accessToken) localStorage.setItem("accessToken", accessToken);
          if (refreshToken) localStorage.setItem("refreshToken", refreshToken);

          nav("/");
        },
      }
    );
  };

  const goSignUp = () => {
    nav("/join");
  };

  return (
    <div className="auth-overlay" onClick={close}>
      <section
        className="auth-card relative"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <button
          type="button"
          className="auth-card__close absolute right-4 top-4"
          onClick={close}
          aria-label="닫기"
        >
          <img src={clearIcon} alt="" />
        </button>

        <div className="flex flex-col gap-8 text-[var(--White)] sm:flex-row sm:gap-12">
          <div className="flex min-w-[200px] flex-1 flex-col justify-center">
            <div className="logo-text text-[48px] leading-[1.2] text-[var(--White)]">
              GITLOG
            </div>
            <p className="mt-8 text-[14px] font-light leading-[22.4px] text-[var(--Gray56)]">
              You can make anything by writing
            </p>
          </div>

          <form
            className="flex min-w-[260px] max-w-[320px] flex-1 flex-col text-[var(--White)]"
            onSubmit={handleSubmit}
          >
            <AuthInput
              name="email"
              type="email"
              placeholder="이메일"
              value={values.email}
              onChange={handleChange}
              className="mb-2"
              disabled={isPending}
            />

            <AuthInput
              name="password"
              type="password"
              placeholder="비밀번호"
              value={values.password}
              onChange={handleChange}
              className="mb-3"
              disabled={isPending}
            />

            <Button
              type="submit"
              variant="primaryBlue"
              className="mb-2"
              disabled={isPending}
            >
              {isPending ? "로그인 중..." : "이메일로 로그인"}
            </Button>

            {isError && (
              <p className="mb-4 text-[12px] leading-[18px] text-[var(--Negative)]">
                로그인에 실패했습니다
                {error instanceof Error && error.message
                  ? `: ${error.message}`
                  : " . 다시 시도해주세요."}
              </p>
            )}

            <div className="mb-4 flex flex-col items-center text-[12px] leading-[18px] text-[var(--Gray56)]">
              <div className="flex w-full items-center gap-2">
                <div className="h-[1px] flex-1 bg-[var(--Gray56)] opacity-30" />
                <span className="text-[12px] leading-[18px] text-[var(--Gray56)]">
                  SNS
                </span>
                <div className="h-[1px] flex-1 bg-[var(--Gray56)] opacity-30" />
              </div>
            </div>

            <KakaoLoginButton className="mb-4" disabled={isPending} />

            <div className="flex w-full flex-col items-center">
              <button
                type="button"
                className="text-[12px] font-light leading-[18px] text-[var(--Gray56)]"
                onClick={goSignUp}
                disabled={isPending}
              >
                또는 회원가입
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
