import React from "react";
import Blogfind from "./Blogfind";
import Frame7 from "@/assets/svgs/Frame7.svg?react";
import ClearIcon from "@/assets/svgs/clear.svg?react"; // 닫기 버튼 svg
import KakaoIcon from "@/assets/svgs/kakao.svg?react"; // 카카오 아이콘이 있다면 사용
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="relative w-full min-h-screen">
      {/* 배경으로 Blogfind 표시 */}
      <Blogfind />

      {/* 블러 오버레이 */}
      <div className="absolute inset-0 backdrop-blur-[4px] bg-black/10 z-40"></div>

      {/* 로그인 팝업 */}
      <div className="absolute inset-0 flex items-center justify-center z-50">
        <div
          className="w-[782px] h-[469px] bg-black rounded-[9px] 
                     flex flex-row items-center justify-between px-[60px] py-[80px] relative text-white"
        >
          {/* 오른쪽 상단 닫기 버튼 */}
          <button className="absolute top-[20px] right-[20px] w-[40px] h-[40px] flex items-center justify-center">
            <ClearIcon className="w-[24px] h-[24px] text-white" />
          </button>

          {/* 왼쪽 영역 */}
          <div className="items-start justify-center w-[344px] max-w-[344px]">
            <Frame7 className="w-[344px] h-[160px] -ml-[40px] text-white fill-white" />
            <p className="text-[#909090] text-[14px] font-light px-4 leading-[160%]">
              You can make anything by writing
            </p>

          </div>

          {/* 오른쪽 로그인 폼 */}
          <div className="flex flex-col items-center justify-center w-[344px] max-w-[344px]">
            {/* 이메일 입력 */}
            <input
              type="email"
              placeholder="이메일"
              className="w-full h-[46px] rounded-md px-[16px] py-[12px] mb-3 
                         bg-white text-black text-[14px] placeholder-[#B0B0B0] focus:outline-none"
            />

            {/* 비밀번호 입력 */}
            <input
              type="password"
              placeholder="비밀번호"
              className="w-full h-[46px] rounded-md px-[16px] py-[12px] mb-4 
                         bg-white text-black text-[14px] placeholder-[#B0B0B0] focus:outline-none"
            />

            {/* 이메일로 로그인 */}
            <button
              className="w-full h-[46px] rounded-md bg-[#3B82F6] text-white font-medium mb-4 hover:bg-[#2563EB] transition-colors"
            >
              이메일로 로그인
            </button>

            {/* SNS 구분선 */}
            <div className="flex items-center w-full gap-2 mb-4">
              <div className="flex-1 h-[1px] bg-[#4B4B4B]" />
              <span className="text-[12px] text-[#B0B0B0]">SNS</span>
              <div className="flex-1 h-[1px] bg-[#4B4B4B]" />
            </div>

            {/* 카카오 로그인 */}
            <button
              className="w-full h-[46px] rounded-md bg-[#FEE500] text-black font-medium flex items-center justify-center gap-2 mb-4 hover:bg-[#FDDD00] transition-colors"
            >
              <KakaoIcon className="w-[18px] h-[18px]" />
              카카오로 로그인
            </button>

            {/* 회원가입 안내 */}
            <p 
              onClick={() => navigate("/signup")}
              className="text-[#B0B0B0] text-[12px] cursor-pointer hover:underline">
              또는 회원가입
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
