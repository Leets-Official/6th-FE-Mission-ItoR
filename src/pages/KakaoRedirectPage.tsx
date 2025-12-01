// src/pages/KakaoRedirectPage.tsx
import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useKakaoRedirectLogin } from "@src/hooks/useAuth";
import { saveTokens } from "@src/lib/authStorage";

export default function KakaoRedirectPage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const code = params.get("code");

  const { mutate, isPending, isError } = useKakaoRedirectLogin();

  useEffect(() => {
    if (!code) {
      navigate("/?login=1", { replace: true });
      return;
    }

    mutate(code, {
      onSuccess: (payload) => {
        const { accessToken, refreshToken, ...rest } = payload;

        if (accessToken) {
          saveTokens(accessToken, refreshToken);
          navigate("/", { replace: true });
        } else {
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
