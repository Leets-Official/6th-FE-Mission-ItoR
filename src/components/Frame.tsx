import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './Button';
import ProfileIcon from '@/assets/svgs/Profile.svg?react';
import ClearIcon from '@/assets/svgs/clear.svg?react';
import { useUserStore } from '@/store/userStore';

// 공통 스타일 상수 정의
const FRAME_WIDTH = 'w-[240px]';
const FRAME_SECTION = 'flex items-center gap-[10px] px-[16px]';
const SECTION_HEIGHT = {
  header: 'h-[64px] mt-[20px]',
  content: 'h-auto', // Adjusted for dynamic content
  button: 'h-auto', // Adjusted for dynamic content
};
const USERNAME_TEXT =
  'font-[Noto Sans KR] font-bold text-[16px] leading-[160%] tracking-[-0.5%] text-gray-800';
const INTRO_TEXT =
  'font-[Noto Sans KR] font-light text-[12px] leading-[160%] tracking-[-0.5%] text-gray-600';
const LOGOUT_TEXT =
  'font-[Noto Sans KR] font-light text-sm leading-[160%] tracking-[-0.5%] text-[#333333] w-[200px] h-[44px] flex items-center';

interface FrameProps {
  onClose?: () => void;
}

const Frame: React.FC<FrameProps> = ({ onClose }) => {
  const navigate = useNavigate();
  const { isLoggedIn, user, logout } = useUserStore();

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
    onClose?.();
  };

  return (
    <div
      className={`${FRAME_WIDTH} h-screen bg-[#F5F5F5] border-r border-gray-300 flex flex-col gap-[10px] fixed top-0 left-0`}
    >
      <button
        onClick={onClose}
        className="absolute top-[20px] right-[16px] w-6 h-6 flex items-center justify-center text-gray-500 hover:text-gray-800"
        aria-label="Close menu"
      >
        <ClearIcon className="w-6 h-6" />
      </button>

      <div className={`${FRAME_WIDTH} ${SECTION_HEIGHT.header} ${FRAME_SECTION}`}>
        {isLoggedIn && user?.profilePicture ? (
          <img
            src={user.profilePicture}
            alt="profile"
            className="w-[64px] h-[64px] rounded-full object-cover"
          />
        ) : (
          <ProfileIcon className="w-[64px] h-[64px]" />
        )}
      </div>

      <div
        className={`${FRAME_WIDTH} ${SECTION_HEIGHT.content} ${FRAME_SECTION} flex-col items-start`}
      >
        {isLoggedIn && user ? (
          <>
            <span className={USERNAME_TEXT}>{user.nickname}</span>
            <span className={INTRO_TEXT}>{user.introduction}</span>
          </>
        ) : (
          <span className={LOGOUT_TEXT}>You can make anything by writing</span>
        )}
      </div>

      <div
        className={`${FRAME_WIDTH} ${SECTION_HEIGHT.button} ${FRAME_SECTION} ${
          isLoggedIn ? 'grid grid-cols-2 gap-2' : 'flex justify-start'
        }`}
      >
        {isLoggedIn ? (
          <>
            <Button variant="blueBorder" onClick={() => navigate('/profiledetail')}>
              나의 깃로그
            </Button>
            <Button variant="blueBorder" onClick={() => navigate('/write')}>
              깃로그 쓰기
            </Button>
          </>
        ) : (
          <Button variant="blueBorder" onClick={() => navigate('/login')}>
            깃로그 시작하기
          </Button>
        )}
      </div>

      {isLoggedIn && (
        <div className={`${FRAME_WIDTH} ${FRAME_SECTION} flex-row gap-2 mt-auto mb-4`}>
          <Button variant="grayBorder" onClick={() => navigate('/profilefind')} className="flex-1">
            설정
          </Button>
          <Button variant="grayBorder" onClick={handleLogout} className="flex-1">
            로그아웃
          </Button>
        </div>
      )}
    </div>
  );
};

export default Frame;
