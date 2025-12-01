// src/components/post/PostDetailHeader.tsx
import React from "react";
import PageHeader from "@ui/PageHeader";
import Dropdown from "@ui/Dropdown";
import ChatIcon from "@icons/chat.svg?react";
import MoreVertIcon from "@icons/more_vert.svg?react";

type Props = {
  isMine: boolean;
  onEdit: () => void;
  onDelete: () => void;
};

export default function PostDetailHeader({ isMine, onEdit, onDelete }: Props) {
  return (
    <header className="relative w-full bg-white/90 backdrop-blur-[2px]">
      <div className="relative mx-auto flex w-full max-w-[1366px] px-4 sm:px-6 md:px-8">
        <PageHeader
          variant="comment"
          rightSlot={
            <div className="flex items-center gap-3">
              <button
                type="button"
                aria-label="댓글 보기"
                className="btn-reset inline-flex h-6 w-6 items-center justify-center"
              >
                <ChatIcon className="h-6 w-6" />
              </button>

              {isMine ? (
                <Dropdown
                  position="right"
                  trigger={
                    <button
                      type="button"
                      aria-label="더보기"
                      className="btn-reset inline-flex h-6 w-6 items-center justify-center"
                    >
                      <MoreVertIcon className="h-6 w-6" />
                    </button>
                  }
                  items={[
                    {
                      id: "edit",
                      label: (
                        <span className="text-[14px] text-[var(--Black)]">
                          수정하기
                        </span>
                      ),
                      onSelect: onEdit,
                    },
                    {
                      id: "delete",
                      label: (
                        <span className="text-[14px] text-[var(--Negative)]">
                          삭제하기
                        </span>
                      ),
                      onSelect: onDelete,
                    },
                  ]}
                  caretOffset="md"
                />
              ) : (
                <button
                  type="button"
                  aria-label="더보기"
                  className="btn-reset inline-flex h-6 w-6 items-center justify-center"
                >
                  <MoreVertIcon className="h-6 w-6" />
                </button>
              )}
            </div>
          }
        />
      </div>
    </header>
  );
}
