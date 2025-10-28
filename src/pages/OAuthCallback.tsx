import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { kakaoLoginRedirect } from "@/api/auth";
import { useUserStore } from "@/store/useUserStore";

export default function OAuthCallback() {
  const navigate = useNavigate();
  const { setUser } = useUserStore();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    if (code) {
      kakaoLoginRedirect(code)
        .then((user) => {
          setUser(user);
          navigate("/", { replace: true });
        })
        .catch((err) => {
          console.error("카카오 로그인 실패:", err);
          navigate("/");
        });
    }
  }, [navigate, setUser]);

  return (
    <div className="text-brand-darkGray flex h-screen items-center justify-center">
      카카오 로그인 중입니다...
    </div>
  );
}
