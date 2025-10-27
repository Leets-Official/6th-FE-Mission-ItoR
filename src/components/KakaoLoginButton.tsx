// src/components/KakaoLoginButton.tsx
import React from "react";
import Button from "@ui/Button/Button";
import kakaoIcon from "@icons/kakao.svg";
import { useKakaoStart } from "@src/hooks/useAuth";

type KakaoLoginButtonProps = {
  disabled?: boolean;
  className?: string;
};

export default function KakaoLoginButton({
  disabled,
  className,
}: KakaoLoginButtonProps) {
  const { mutate: startKakaoLogin } = useKakaoStart();

  return (
    <Button
      type="button"
      variant="kakao"
      className={className}
      onClick={() => {
        if (!disabled) {
          startKakaoLogin();
        }
      }}
      disabled={disabled}
    >
      <>
        <img src={kakaoIcon} alt="" className="h-4 w-4" />
        카카오로 로그인
      </>
    </Button>
  );
}
