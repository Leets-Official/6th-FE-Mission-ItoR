// src/components/ui/PageHeader.tsx
import React from "react";
import clsx from "clsx";
import SmallButton from "./SmallButton";

import ReorderIcon from "@icons/reorder.svg?react";
import ChatIcon from "@icons/chat.svg?react";
import MoreVertIcon from "@icons/more_vert.svg?react";

type HeaderVariant = "write" | "comment" | "publish";

interface PageHeaderProps {
  variant?: HeaderVariant;
  title?: React.ReactNode; // 기본: "GITLOG"
  className?: string;
  onClickMenu?: () => void;
  onClickWrite?: () => void;
  onClickComment?: () => void;
  onClickMore?: () => void;
  onClickDelete?: () => void;
  onClickPublish?: () => void;
}

export default function PageHeader({
  variant = "write",
  title = "GITLOG",
  className,
  onClickMenu,
  onClickWrite,
  onClickComment,
  onClickMore,
  onClickDelete,
  onClickPublish,
}: PageHeaderProps) {
  return (
    <header
      className={clsx(
        // 레이아웃: width 1366, padding: 16 16 16 12
        // 높이 고정 56px로 세 variant 동일하게
        "flex w-[1366px] h-[56px] pl-3 pr-4 justify-between items-center",
        // 스타일
        "bg-[rgba(255,255,255,0.90)] backdrop-blur-[2px]",
        className
      )}
    >
      {/* Left: 메뉴 + 타이틀 */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onClickMenu}
          aria-label="메뉴 열기"
          className="btn-reset w-6 h-6 flex items-center justify-center"
        >
          <ReorderIcon className="w-6 h-6" />
        </button>

        <div className="logo-text select-none">
          {title}
        </div>
      </div>

      {/* Right: variant별 액션 */}
      <div className="flex items-center gap-3">
        {variant === "write" && (
          <SmallButton
            leftIcon
            variant="ghost"
            onClick={onClickWrite}
            className="min-w-[108px]"
          >
            깃로그 쓰기
          </SmallButton>
        )}

        {variant === "comment" && (
          <>
            <button
              type="button"
              onClick={onClickComment}
              aria-label="댓글 보기"
              className="btn-reset w-6 h-6 flex items-center justify-center"
            >
              <ChatIcon className="w-6 h-6" />
            </button>
            <button
              type="button"
              onClick={onClickMore}
              aria-label="더보기"
              className="btn-reset w-6 h-6 flex items-center justify-center"
            >
              <MoreVertIcon className="w-6 h-6" />
            </button>
          </>
        )}

        {variant === "publish" && (
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={onClickDelete}
              className="btn-reset h-10 w-[76px] px-3 flex justify-center items-center gap-1 shrink-0 rounded-[25px]
                         btn-text-14 text-[var(--Negative)]"
            >
              삭제하기
            </button>
            <button
              type="button"
              onClick={onClickPublish}
              className="btn-reset h-10 w-[76px] px-3 flex justify-center items-center gap-1 shrink-0 rounded-[25px]
                         btn-text-14 text-[var(--Gray20)]"
            >
              게시하기
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
