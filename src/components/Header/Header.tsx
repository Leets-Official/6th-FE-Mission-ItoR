import React from "react";
import { ReorderIcon, ChatIcon, MoreVertIcon } from "@/assets/icons/index";
import { cn } from "@/utils/cn";
import { HeaderProps } from "./Header.types";
import { baseHeader, leftGroup, titleStyle } from "./Header.styled";
import Button from "@/components/SmallButton/SmallButton";

const Header: React.FC<HeaderProps> = ({
  title = "GITLOG",
  variant = "write",
  onWriteClick,
  onChatClick,
  onMenuClick,
  onDeleteClick,
  onPublishClick,
}) => {
  return (
    <header className={cn(baseHeader)}>
      <div className={cn(leftGroup)}>
        <ReorderIcon />
        <span className={cn(titleStyle)}>{title}</span>
      </div>

      {variant === "write" && (
        <Button label="깃로그 쓰기" variant="secondaryOutline" onClick={onWriteClick} />
      )}

      {variant === "chatMenu" && (
        <div className="flex items-center gap-4 text-gray-600">
          <button onClick={onChatClick}>
            <ChatIcon />
          </button>
          <button onClick={onMenuClick}>
            <MoreVertIcon />
          </button>
        </div>
      )}

      {variant === "action" && (
        <div className="flex items-center gap-4 text-sm">
          <button className="text-brand-red hover:underline" onClick={onDeleteClick}>
            삭제하기
          </button>
          <button className="text-brand-black hover:underline" onClick={onPublishClick}>
            게시하기
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
