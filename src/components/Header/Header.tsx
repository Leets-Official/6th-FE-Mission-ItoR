import React from "react";
import { ReorderIcon, ChatIcon, MoreVertIcon } from "@/assets/icons/index";
import { cn } from "@/utils/cn";
import { HeaderProps } from "./Header.types";
import {
  baseHeader,
  leftGroup,
  titleStyle,
  chatMenuWrapper,
  chatMenuButton,
  actionWrapper,
  deleteButton,
  publishButton,
} from "./Header.styled";
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
    <header className={baseHeader}>
      <div className={leftGroup}>
        <ReorderIcon />
        <span className={titleStyle}>{title}</span>
      </div>

      {variant === "write" && (
        <Button label="깃로그 쓰기" variant="secondaryOutline" onClick={onWriteClick} />
      )}

      {variant === "chatMenu" && (
        <div className={chatMenuWrapper}>
          <button onClick={onChatClick} className={chatMenuButton}>
            <ChatIcon />
          </button>
          <button onClick={onMenuClick} className={chatMenuButton}>
            <MoreVertIcon />
          </button>
        </div>
      )}

      {variant === "action" && (
        <div className={actionWrapper}>
          <button className={deleteButton} onClick={onDeleteClick}>
            삭제하기
          </button>
          <button className={publishButton} onClick={onPublishClick}>
            게시하기
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
