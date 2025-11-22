// src/components/post/PostDetailHeader.tsx
import React from "react";
import PageHeader from "@ui/PageHeader";
import Dropdown from "@ui/Dropdown";

type Props = {
  isMine: boolean;
  onEdit: () => void;
  onDelete: () => void;
};

export default function PostDetailHeader({
  isMine,
  onEdit,
  onDelete,
}: Props) {
  return (
    <header className="w-full bg-white/90 backdrop-blur-[2px] relative">
      <div className="max-w-[1366px] w-full px-4 sm:px-6 md:px-8 mx-auto relative">
        <PageHeader variant="comment" onClickMore={() => {}} />
        {isMine && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 z-50">
            <Dropdown
              position="right"
              trigger={
                <span
                  className="block w-6 h-6"
                  aria-label="더보기"
                />
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
          </div>
        )}
      </div>
    </header>
  );
}
