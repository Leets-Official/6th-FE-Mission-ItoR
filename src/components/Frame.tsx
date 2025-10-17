import React from "react";
import Button from "./Button"; 
import ProfileIcon from "@/assets/svgs/Profile.svg?react";

interface FrameProps {
  username: string; // 간단한 텍스트
  onButtonClick?: () => void;
}

const Frame: React.FC<FrameProps> = ({ username, onButtonClick }) => {
  return (
    <div className="w-[240px] h-[768px] bg-[#F5F5F5] border-r border-gray-300 flex flex-col gap-[10px] ">
      <div className="w-[240px] h-[64px] max-w-[688px] px-[16px] flex items-center gap-[10px] mt-[20px]">
        <ProfileIcon className="w-[64px] h-[64px]" /> 
      </div>
      <div className="w-[240px] h-[64px] max-w-[688px] px-[16px] flex items-center gap-[10px]">
        <span className="font-[Noto Sans KR] font-light text-[14px] leading-[160%] tracking-[-0.5%] text-gray-800 w-[200px] h-[44px] flex items-center">
          {username}
        </span>
      </div>

      <div className="w-[240px] h-[38px] px-[16px] flex items-center gap-[10px]">
        <Button variant="blueBorder"onClick={onButtonClick}>
          깃로그 시작하기
        </Button>
      </div>
    </div>
  );
};

export default Frame;