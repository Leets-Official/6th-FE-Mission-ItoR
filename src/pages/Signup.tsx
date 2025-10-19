import React from "react";
import Header from "@/components/Header";
import Frame7 from "@/assets/svgs/Frame7.svg?react";
import KakaoIcon from "@/assets/svgs/kakao.svg?react";
import { useNavigate } from "react-router-dom";

const Signup: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col w-full min-h-screen bg-white">
      {/* 상단 헤더 */}
      <Header variant="write" />

      {/* 회원가입 타이틀 영역 */}
      <div className="w-full h-[114px] flex items-center justify-start border-b border-gray-300 bg-[#F5F5F5] px-[430px]">
        <h1 className="text-[32px] font-medium text-gray-900">회원가입</h1>
      </div>

      {/* 메인 컨텐츠 */}
      <div className="flex justify-center items-center flex-1 mt-[60px]">
        <div className="flex flex-row justify-between items-center w-[782px]">
          {/* 왼쪽 영역 */}
          <div className="flex flex-col items-start justify-center w-[344px]">
            <Frame7 className="w-[344px] h-[160px] text-black fill-black -ml-[60px]" />
            <p className="text-[#909090] text-[14px] font-light leading-[160%] mt-2">
              You can make anything by writing
            </p>
          </div>

          {/* 오른쪽 회원가입 영역 */}
          <div className="flex flex-col items-center justify-center w-[344px]">
            {/* 이메일 회원가입 */}
            <button
              className="w-full h-[46px] rounded-md bg-[#3B82F6] text-white font-medium mb-3 hover:bg-[#2563EB] transition-colors"
              onClick={() => navigate("/signup/email")}
            >
              이메일로 회원가입
            </button>

            {/* 또는 구분 */}
            <p className="text-[#B0B0B0] text-[12px] mb-3">또는</p>

            {/* 카카오 회원가입 */}
            <button
              className="w-full h-[46px] rounded-md bg-[#FEE500] text-black font-medium flex items-center justify-center gap-2 hover:bg-[#FDDD00] transition-colors"
            >
              <KakaoIcon className="w-[18px] h-[18px]" />
              카카오로 회원가입
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
