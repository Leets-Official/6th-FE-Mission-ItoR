import React from 'react';
import Header from '@/components/Header';
import Frame7 from '@/assets/svgs/Frame7.svg?react';
import KakaoIcon from '@/assets/svgs/kakao.svg?react';
import { useNavigate } from 'react-router-dom';
import { useKakaoStart } from '@src/hooks/auth/useAuth';

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const { mutate: startKakao } = useKakaoStart();

  // 이메일 회원가입 클릭 핸들러
  const handleEmailSignup = () => {
    navigate('/signup/email');
  };

  // 카카오 회원가입 클릭 핸들러 — 백엔드가 전부 처리
  const handleKakaoSignup = () => startKakao();

  return (
    <div className="flex flex-col w-full min-h-screen bg-white">
      {/* 상단 헤더 */}
      <Header variant="none" />

      {/* 회원가입 타이틀 영역 */}
      <div className="w-full h-[114px] flex items-center justify-start border-b border-gray-300 bg-gray-50 px-4 md:px-[430px]">
        <h1 className="text-2xl font-medium text-gray-800">회원가입</h1>
      </div>

      {/* 메인 컨텐츠 */}
      <div className="flex justify-center items-center flex-1 mt-[60px] px-4">
        <div className="max-w-[800px] w-full flex flex-col md:flex-row items-center justify-center md:justify-between gap-8">
          {/* 왼쪽 영역 */}
          <div className="flex flex-col items-center justify-center">
            <Frame7 className="w-[344px] h-[160px] text-black fill-black md:-ml-[60px]" />
            <p className="text-gray-400 text-sm font-light leading-relaxed mt-2">
              You can make anything by writing
            </p>
          </div>

          {/* 오른쪽 회원가입 영역 */}
          <div className="flex flex-col items-center justify-center w-full">
            {/* 이메일 회원가입 */}
            <button
              onClick={handleEmailSignup}
              className="w-full h-[46px] rounded-md bg-blue-500 text-white font-medium mb-3 hover:bg-blue-600 transition-colors"
            >
              이메일로 회원가입
            </button>

            {/* 또는 구분 */}
            <p className="text-gray-400 text-xs mb-3">또는</p>

            {/* 카카오 회원가입 */}
            <button
              onClick={handleKakaoSignup}
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
