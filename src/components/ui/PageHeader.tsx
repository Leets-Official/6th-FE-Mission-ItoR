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
  title?: React.ReactNode;
  className?: string;

  onClickMenu?: () => void;
  onClickWrite?: () => void;
  onClickComment?: () => void;
  onClickMore?: () => void;
  onClickDelete?: () => void;
  onClickPublish?: () => void;

  withBorder?: boolean;
  sticky?: boolean;

  /** 우측 영역 전체를 커스터마이징하고 싶을 때 사용 */
  rightSlot?: React.ReactNode;
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
  withBorder = false,
  sticky = false,
  rightSlot,
}: PageHeaderProps) {
  return (
    <header
      className={clsx(
        "flex h-[56px] w-full items-center justify-between",
        "bg-[rgba(255,255,255,0.90)] backdrop-blur-[2px]",
        withBorder && "border-b border-[var(--Gray96)]",
        sticky && "sticky top-0 z-40",
        className
      )}
    >
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onClickMenu}
          aria-label="메뉴 열기"
          className="btn-reset inline-flex h-6 w-6 items-center justify-center"
        >
          <ReorderIcon className="h-6 w-6" />
        </button>

        <div className="logo-text select-none">{title}</div>
      </div>

      <div className="flex items-center gap-3">
        {rightSlot ? (
          rightSlot
        ) : (
          <>
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
                  className="btn-reset inline-flex h-6 w-6 items-center justify-center"
                >
                  <ChatIcon className="h-6 w-6" />
                </button>
                <button
                  type="button"
                  onClick={onClickMore}
                  aria-label="더보기"
                  className="btn-reset inline-flex h-6 w-6 items-center justify-center"
                >
                  <MoreVertIcon className="h-6 w-6" />
                </button>
              </>
            )}

            {variant === "publish" && (
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={onClickDelete}
                  className="btn-reset flex h-10 w-[76px] shrink-0 items-center justify-center gap-1 rounded-[25px] px-3 btn-text-14 text-[var(--Negative)]"
                >
                  삭제하기
                </button>
                <button
                  type="button"
                  onClick={onClickPublish}
                  className="btn-reset flex h-10 w-[76px] shrink-0 items-center justify-center gap-1 rounded-[25px] px-3 btn-text-14 text-[var(--Gray20)]"
                >
                  게시하기
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </header>
  );
}
