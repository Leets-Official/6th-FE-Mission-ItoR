import React from "react";
import Button from "./Button";
import ProfileIcon from "@/assets/svgs/Profile.svg?react";

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
}

const Frame: React.FC<FrameProps> = ({ username, onButtonClick }) => {
  return (
    <div className={`${FRAME_WIDTH} h-[768px] bg-gray-50 border-r border-gray-300 flex flex-col gap-[10px]`}>
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
