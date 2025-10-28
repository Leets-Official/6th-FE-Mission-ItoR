// src/pages/KakaoRedirect.tsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/api/axiosInstance";

/**
 * 카카오 인증 완료 후 리다이렉트되는 페이지
 * URL 예: /auth/kakao/callback?code=AbCdEf...
 *  - code를 추출해 백엔드에 전달
 *  - 200: 로그인 성공 → 토큰 저장 후 홈으로
 *  - 401: 신규 유저 → 회원가입 페이지로 이동
 */
const KakaoRedirect: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const url = new URL(window.location.href);

  if (window.location.origin.includes("localhost:3000")) {
    window.location.replace(
      `http://localhost:5173/auth/kakao/callback${window.location.search}`
    );
    return;
  }

    const code = url.searchParams.get("code");

    if (!code) {
      alert("카카오 인증 코드가 없습니다.");
      navigate("/login");
      return;
    }

    

    const run = async () => {
      try {
        // 백엔드에 인가코드 전달
        const res = await api.get(`/auth/kakao/redirect?code=${encodeURIComponent(code)}`);

        // 성공(200) → 로그인 완료 처리 (응답 구조에 맞게 조정)
        const accessToken =
          res.data?.data?.accessToken ||
          res.data?.accessToken;
        const refreshToken =
          res.data?.data?.refreshToken ||
          res.data?.refreshToken;

        if (accessToken) localStorage.setItem("accessToken", accessToken);
        if (refreshToken) localStorage.setItem("refreshToken", refreshToken);

        alert("로그인 성공!");
        navigate("/");
      } catch (err: any) {
        const status = err?.response?.status;

        if (status === 401) {
          // 가입 필요 → 회원가입 페이지로 이동
          alert("카카오 회원가입이 필요합니다.");
          navigate("/signup/kakao");
        } else {
          // 기타 에러
          console.error("Kakao redirect error:", err?.response || err);
          alert("카카오 로그인 중 오류가 발생했습니다.");
          navigate("/login");
        }
      }
    };

    run();
  }, [navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <p className="text-gray-600">카카오 로그인 처리 중입니다...</p>
    </div>
  );
};

export default KakaoRedirect;
