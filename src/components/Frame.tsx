import React from "react";
import Button from "./Button";
import ProfileIcon from "@/assets/svgs/Profile.svg?react";
import ClearIcon from "@/assets/svgs/clear.svg?react"; // Import ClearIcon

// 공통 스타일 상수 정의
const FRAME_WIDTH = "w-[240px]";
const FRAME_SECTION = "flex items-center gap-[10px] px-[16px]";
const SECTION_HEIGHT = {
  header: "h-[64px] mt-[20px]",
  username: "h-[64px]",
  button: "h-[38px]",
};
const USERNAME_TEXT =
  "font-[Noto Sans KR] font-light text-[14px] leading-[160%] tracking-[-0.5%] text-gray-800 w-[200px] h-[44px] flex items-center";

interface FrameProps {
  username: string;
  onButtonClick?: () => void;
  onClose?: () => void; // Add onClose prop
}

const Frame: React.FC<FrameProps> = ({ username, onButtonClick, onClose }) => {
  return (
    <div className={`${FRAME_WIDTH} h-screen bg-gray-50 border-r border-gray-300 flex flex-col gap-[10px] relative`}>
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-[20px] right-[16px] w-6 h-6 flex items-center justify-center text-gray-500 hover:text-gray-800"
        aria-label="Close menu"
      >
        <ClearIcon className="w-6 h-6" />
      </button>

      <div className={`${FRAME_WIDTH} ${SECTION_HEIGHT.header} ${FRAME_SECTION}`}>
        <ProfileIcon className="w-[64px] h-[64px]" />
      </div>

      <div className={`${FRAME_WIDTH} ${SECTION_HEIGHT.username} ${FRAME_SECTION}`}>
        <span className={USERNAME_TEXT}>{username}</span>
      </div>

      <div className={`${FRAME_WIDTH} ${SECTION_HEIGHT.button} ${FRAME_SECTION}`}>
        <Button variant="blueBorder" onClick={onButtonClick}>
          깃로그 시작하기
        </Button>
      </div>
    </div>
  );
};

export default Frame;
