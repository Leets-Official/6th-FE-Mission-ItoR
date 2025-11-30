// src/components/write/WriteHeader.tsx
import React from "react";

type Props = {
  canPublish: boolean;
  isPublishing: boolean;
  isUploadingImage: boolean;
  onReset: () => void;
  onPublish: () => void;
};

export default function WriteHeader({
  canPublish,
  isPublishing,
  isUploadingImage,
  onReset,
  onPublish,
}: Props) {
  const isDisabled = !canPublish || isPublishing || isUploadingImage;

  return (
    <header className="w-full border-b border-[var(--Gray96)] bg-white/90 backdrop-blur-[2px]">
      <div className="page-header-inner h-12 sm:h-14">
        <div className="logo-text text-[24px] leading-[1.2] text-[var(--Black)]">
          GITLOG
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onReset}
            className="rounded-[25px] border border-[var(--Gray90)] px-4 py-[6px] text-[14px] font-light leading-[22.4px] text-[var(--Negative)]"
          >
            삭제하기
          </button>
          <button
            type="button"
            onClick={onPublish}
            disabled={isDisabled}
            className={`rounded-[25px] border px-4 py-[6px] text-[14px] font-light leading-[22.4px] ${
              !isDisabled
                ? "border-[var(--Point,#00A1FF)] text-[var(--Point,#00A1FF)]"
                : "cursor-not-allowed border-[var(--Gray90)] text-[var(--Gray56)] opacity-40"
            }`}
          >
            {isUploadingImage ? "이미지 업로드 중..." : "게시하기"}
          </button>
        </div>
      </div>
    </header>
  );
}
