import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { handleKakaoCallback } from "@/api/auth";
import { useUserStore } from "@/store/useUserStore";
import { AxiosError } from "axios";

export default function OAuthCallback() {
  const navigate = useNavigate();
  const { setUser } = useUserStore();

  useEffect(() => {
    const runAuthFlow = async () => {
      const code = new URLSearchParams(window.location.search).get("code");

      if (!code) {
        alert("인증 코드가 없습니다.");
        navigate("/", { replace: true });
        return;
      }

      try {
        const user = await handleKakaoCallback(code);
        setUser(user);
        navigate("/", { replace: true });
      } catch (error) {
        if (error instanceof AxiosError && error.response?.status === 401) {
          const kakaoUser = error.response.data?.data;
          navigate("/signup", {
            replace: true,
            state: { kakaoUser },
          });
        } else {
          alert("로그인 중 오류가 발생했습니다.");
          navigate("/", { replace: true });
        }
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
