import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { handleKakaoCallback } from "@/api/auth";
import { useUserStore } from "@/store/useUserStore";

export default function OAuthCallback() {
  const navigate = useNavigate();
  const { setUser } = useUserStore();
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const runAuthFlow = async () => {
      const code = new URLSearchParams(window.location.search).get("code");

      if (!code) {
        alert("인증 코드가 없습니다.");
        navigate("/", { replace: true });
        return;
      }

      try {
        const response = await handleKakaoCallback(code);

        // 응답 본문의 code가 401인지 확인
        if (response?.code === 401) {
          const kakaoUser = response.data;
          navigate("/signup", {
            replace: true,
            state: { kakaoUser },
          });
          return;
        }

        setUser(response);
        navigate("/", { replace: true });
      } catch (error) {
        console.error("카카오 로그인 오류:", error);
        alert("로그인 중 오류가 발생했습니다. 다시 시도해주세요.");
        navigate("/", { replace: true });
      }
    };

    runAuthFlow();
  }, [navigate, setUser]);

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-500" />
        <p>로그인 처리 중...</p>
      </div>
    </div>
  );
}
