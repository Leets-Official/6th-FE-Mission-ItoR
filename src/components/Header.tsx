import React from "react";
import Button from "./Button";
import CreateIcon from "@/assets/svgs/create.svg?react";
import ChatIcon from "@/assets/svgs/chat.svg?react";
import MoreVertIcon from "@/assets/svgs/more_vert.svg?react";
import ReorderIcon from "@/assets/svgs/reorder.svg?react";


type HeaderVariant = "write" | "detail" | "edit";

interface HeaderProps {
  variant: HeaderVariant;
}

const Header: React.FC<HeaderProps> = ({ variant }) => {
  return (
    <header className="relative w-[1366px] h-[72px] bg-white/90 backdrop-blur-sm">
      <div className="absolute inset-0 flex items-center justify-between pl-[12px] pr-[16px]">
        <div className="flex items-center gap-4">
          <button type="button" aria-label="menu" className="w-6 h-6">
            <ReorderIcon className="w-6 h-6 text-gray-700" />
          </button>
          <div className="font-normal" style={{ fontFamily: "Smooch, sans-serif", fontSize: "20px" }}>
            GITLOG
          </div>
        </div>

        <div className="flex items-center gap-4">
          {variant === "write" && (
            <Button
              variant="whiteGrayIcon"
              icon={<CreateIcon className="w-6 h-6 text-gray-700" />}
            >
              깃로그 쓰기
            </Button>
          )}

          {variant === "detail" && (
            <div className="flex items-center gap-4">
              <ChatIcon className="w-6 h-6 text-gray-700" />
              <MoreVertIcon className="w-6 h-6 text-gray-700" />
            </div>
          )}

          {variant === "edit" && (
            <div className="flex items-center gap-6">
              <button type="button" className="text-[14px] text-[#FF3F3F]">
                삭제하기
              </button>
              <button type="button" className="text-[14px] text-black">
                게시하기
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
