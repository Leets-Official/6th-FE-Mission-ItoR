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
    // code 없으면 로그인 페이지로 돌려보내기
    if (!code) {
      navigate("/login", { replace: true });
      return;
    }

    // 백엔드로 code 전달해서 로그인 처리 시도
    mutate(code, {
      onSuccess: () => {
        // 로그인 성공했다고 가정하고 홈으로 이동
        navigate("/", { replace: true });
      },
      onError: () => {
        // 실패하면 로그인 페이지로 이동
        navigate("/login", { replace: true });
      },
    });
  }, [code, mutate, navigate]);

  // 상태 화면 (tailwind만 사용)
  return (
    <div className="flex min-h-dvh flex-col items-center justify-start bg-black pt-20 text-center text-sm text-white">
      {isPending && "카카오 로그인 처리 중입니다..."}
      {isError && "로그인에 실패했습니다. 다시 시도해주세요."}
      {!isPending && !isError && "처리 중..."}
    </div>
  );
}
