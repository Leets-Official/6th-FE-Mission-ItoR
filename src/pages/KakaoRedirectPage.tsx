// src/pages/KakaoRedirectPage.tsx
import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useKakaoRedirectLogin } from "@src/hooks/useAuth";

export default function KakaoRedirectPage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const code = params.get("code");

  const { mutate, isPending, isError } = useKakaoRedirectLogin();

  useEffect(() => {
    if (!code) {
      // code 없으면 홈 + 로그인 모달
      navigate("/?login=1", { replace: true });
      return;
    }

    mutate(code, {
      onSuccess: (payload) => {
        const { accessToken, refreshToken, ...rest } = payload;

        if (accessToken) {
          // 기존 가입자: 토큰 저장 후 홈으로 이동
          localStorage.setItem("accessToken", accessToken);
          if (refreshToken) {
            localStorage.setItem("refreshToken", refreshToken);
          }
          navigate("/", { replace: true });
        } else {
          // 신규 가입자: OAuth 회원가입 페이지로 state 넘기기
          navigate("/join/oauth", { state: rest, replace: true });
        }
      },
      onError: () => {
        navigate("/?login=1", { replace: true });
      },
    });
  }, [code, mutate, navigate]);

  return (
    <div className="flex min-h-dvh items-center justify-center bg-black text-white">
      {isPending && "카카오 로그인 처리 중입니다..."}
      {isError && "로그인에 실패했습니다. 다시 시도해주세요."}
      {!isPending && !isError && "처리 중입니다..."}
    </div>
  );
}
