import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Blogfind from "./Blogfind";
import Frame7 from "@/assets/svgs/Frame7.svg?react";
import ClearIcon from "@/assets/svgs/clear.svg?react";
import KakaoIcon from "@/assets/svgs/kakao.svg?react";
import { useKakaoStart } from "@src/hooks/auth/useAuth";
import { loginRequest } from "@/api/auth";
import { AxiosError } from "axios";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { mutate: startKakao } = useKakaoStart();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  /** 로그인 요청 */
  const handleEmailLogin = async () => {
    if (!form.email.trim() || !form.password.trim()) {
      alert("이메일과 비밀번호를 모두 입력해주세요.");
      return;
    }

    setIsLoading(true);
    try {
      const data = await loginRequest({
        email: form.email.trim(),
        password: form.password,
      });

      // 토큰 저장
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);

      // 선택적으로 유저 정보도 저장 가능
      localStorage.setItem("nickname", data.nickname || "");
      localStorage.setItem("profilePicture", data.profilePicture || "");
      localStorage.setItem("introduction", data.introduction || "");

      alert("로그인 성공!");
      navigate("/", { replace: true });
    } catch (error: unknown) {
      console.error("로그인 실패:", error);
      if (error instanceof AxiosError) {
        alert(error.response?.data?.message || "로그인 중 오류가 발생했습니다.");
      } else {
        alert("로그인 중 알 수 없는 오류가 발생했습니다.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  

  /** 카카오 로그인 요청 */
  const handleKakaoLogin = () => startKakao();

  return (
    <div className="w-full min-h-screen">
      {/* 배경으로 Blogfind 표시 */}
      <Blogfind />

      {/* 블러 오버레이 */}
      <div className="fixed inset-0 backdrop-blur-[4px] bg-black/10 z-40"></div>

      {/* 로그인 팝업 */}
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div
          className="max-w-[800px] w-full max-h-[90vh] overflow-y-auto bg-black rounded-[9px] 
                     flex flex-col md:flex-row items-center justify-center md:justify-between gap-8 px-8 py-12 md:px-[60px] md:py-[80px] relative text-white"
        >
          {/* 오른쪽 상단 닫기 버튼 */}
          <button
            onClick={() => navigate("/")}
            className="absolute top-[20px] right-[20px] w-[40px] h-[40px] flex items-center justify-center"
          >
            <ClearIcon className="w-[24px] h-[24px] text-white" />
          </button>

          {/* 왼쪽 영역 */}
          <div className="items-start justify-center flex-1 min-w-0">
            <Frame7 className="w-[344px] h-[160px] -ml-[40px] text-white fill-white" />
            <p className="text-[#909090] text-[14px] font-light px-4 leading-[160%]">
              You can make anything by writing
            </p>
          </div>

          {/* 오른쪽 로그인 폼 */}
          <div className="flex flex-col items-center justify-center flex-1 min-w-0 w-full">
            {/* 이메일 입력 */}
            <input
              type="email"
              placeholder="이메일"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full h-[46px] rounded-md px-[16px] py-[12px] mb-3 
                         bg-white text-black text-[14px] placeholder-[#B0B0B0] focus:outline-none"
            />

            {/* 비밀번호 입력 */}
            <input
              type="password"
              placeholder="비밀번호"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full h-[46px] rounded-md px-[16px] py-[12px] mb-4 
                         bg-white text-black text-[14px] placeholder-[#B0B0B0] focus:outline-none"
            />

            {/* 이메일 로그인 버튼 */}
            <button
              onClick={handleEmailLogin}
              disabled={isLoading}
              className="w-full h-[46px] rounded-md bg-[#3B82F6] text-white font-medium mb-4 hover:bg-[#2563EB] transition-colors disabled:opacity-50"
            >
              {isLoading ? "로그인 중..." : "이메일로 로그인"}
            </button>

            {/* SNS 구분선 */}
            <div className="flex items-center w-full gap-2 mb-4">
              <div className="flex-1 h-[1px] bg-[#4B4B4B]" />
              <span className="text-[12px] text-[#B0B0B0]">SNS</span>
              <div className="flex-1 h-[1px] bg-[#4B4B4B]" />
            </div>

            {/* 카카오 로그인 */}
            <button
              onClick={handleKakaoLogin}
              className="w-full h-[46px] rounded-md bg-[#FEE500] text-black font-medium flex items-center justify-center gap-2 mb-4 hover:bg-[#FDDD00] transition-colors"
            >
              <KakaoIcon className="w-[18px] h-[18px]" />
              카카오로 로그인
            </button>

            {/* 회원가입 안내 */}
            <p
              onClick={() => navigate("/signup")}
              className="text-[#B0B0B0] text-[12px] cursor-pointer hover:underline"
            >
              또는 회원가입
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
