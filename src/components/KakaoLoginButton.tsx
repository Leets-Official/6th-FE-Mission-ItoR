// src/components/KakaoLoginButton.tsx
import React, { useCallback } from "react";
import Button from "@ui/Button/Button";
import KakaoIcon from "@icons/kakao.svg?react";

type KakaoLoginButtonProps = {
  disabled?: boolean;
  className?: string;
};

export default function KakaoLoginButton({ disabled, className }: KakaoLoginButtonProps) {
  const handleKakaoLogin = useCallback(() => {
    if (disabled) return;
    import("@src/api/client").then(({ default: api }) => {
      const baseURL = api.defaults.baseURL || "";
      window.location.href = `${baseURL}/auth/kakao`;
    });
  }, [disabled]);

  return (
    <Button
      type="button"
      variant="kakao"
      className={className}
      onClick={handleKakaoLogin}
      disabled={disabled}
    >
      <>
        <KakaoIcon className="h-4 w-4" />
        카카오로 로그인
      </>
    </Button>
  );
}
