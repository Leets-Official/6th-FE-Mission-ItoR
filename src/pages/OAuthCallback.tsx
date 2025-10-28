import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { kakaoLoginRedirect } from "@/api/auth";
import { useUserStore } from "@/store/useUserStore";

export default function OAuthCallback() {
  const navigate = useNavigate();
  const { setUser } = useUserStore();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    if (!code) {
      console.error("카카오 인증 코드가 없습니다");
      setError("카카오 인증에 실패했습니다.");
      setTimeout(() => navigate("/", { replace: true }), 2000);
      return;
    }

    console.log("카카오 인증 코드:", code);

    kakaoLoginRedirect(code)
      .then((result) => {
        console.log("카카오 로그인 결과:", result);

        if (result.isNewUser) {
          if (!result.kakaoUser) {
            console.error("카카오 사용자 정보가 없습니다");
            setError("카카오 사용자 정보를 가져올 수 없습니다.");
            setTimeout(() => navigate("/", { replace: true }), 2000);
            return;
          }

          console.log("신규 회원 - 회원가입 페이지로 이동");
          navigate("/signup", {
            replace: true,
            state: {
              type: "kakao",
              kakaoUser: result.kakaoUser,
            },
          });
        } else {
          console.log("기존 회원 - 로그인 완료");
          setUser(result.user);
          navigate("/", { replace: true });
        }
      })
      .catch((err) => {
        console.error("카카오 로그인 실패:", err);
        console.error("에러 상태:", err.response?.status);
        console.error("에러 데이터:", err.response?.data);

        const errorMessage = err.response?.data?.message || "카카오 로그인 중 오류가 발생했습니다.";
        setError(errorMessage);
        setTimeout(() => navigate("/", { replace: true }), 3000);
      });
  }, [navigate, setUser]);

  return (
    <div className="text-brand-darkGray flex h-screen flex-col items-center justify-center gap-4">
      {error ? (
        <>
          <p className="text-red-500">{error}</p>
          <p className="text-sm text-gray-500">잠시 후 메인 페이지로 이동합니다...</p>
        </>
      ) : (
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-500" />
          <p>카카오 로그인 중입니다...</p>
        </div>
      )}
    </div>
  );
}
