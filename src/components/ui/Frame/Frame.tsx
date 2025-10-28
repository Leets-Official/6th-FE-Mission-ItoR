import React from "react";
import clsx from "clsx";
import TextBox from "../TextBox/TextBox";
import Button from "../Button/Button";

type FrameVariant = "guest" | "member";

export interface FrameProps {
  variant: FrameVariant;
  name: string;
  intro: string;
  avatarSrc?: string;
  initial?: string;

  onStart?: () => void;
  onMyGitlog?: () => void;
  onWrite?: () => void;
  onSettings?: () => void;
  onLogout?: () => void;

  className?: string;
}

export default function Frame({
  variant,
  name,
  intro,
  avatarSrc,
  initial = "G",
  onStart,
  onMyGitlog,
  onWrite,
  onSettings,
  onLogout,
  className,
}: FrameProps) {
  const isGuest = variant === "guest";

  return (
    <aside
      className={clsx(
        "fixed left-0 top-0 flex h-screen w-[240px] shrink-0 flex-col border-r border-[var(--Gray90,#E6E6E6)] bg-[var(--Gray96,#F5F5F5)]",
        isGuest ? "items-start gap-[10px]" : "items-start justify-between",
        className
      )}
    >
      {/* 상단 영역 */}
      <div className="flex w-full min-w-0 flex-col items-start gap-4 px-5 pt-6">
        {/* 아바타 */}
        <div className="flex items-center justify-center">
          {avatarSrc ? (
            <img
              src={avatarSrc}
              alt=""
              className={clsx(
                "h-[64px] w-[64px] rounded-full object-cover bg-[var(--Gray7,#111112)]",
                "text-[36px] leading-[28px] font-[400] text-[var(--White)] font-[Smooch]"
              )}
            />
          ) : (
            <div
              className={clsx(
                "flex h-[64px] w-[64px] items-center justify-center rounded-full bg-[var(--Gray7,#111112)]",
                "text-[36px] leading-[28px] font-[400] text-[var(--White)] font-[Smooch]"
              )}
            >
              {initial}
            </div>
          )}
        </div>

        {/* 닉네임 / 한 줄 소개 */}
        <TextBox
          tbStyle="primary"
          title={name}
          description={intro}
          className={clsx(
            "w-full max-w-full",
            "!bg-transparent !shadow-none !border-none"
          )}
        />

        {/* CTA 버튼들 */}
<div className="flex w-full gap-3">
  {isGuest ? (
    <Button
      variant="outlinePointWhite"
      className="h-[38px] flex-none whitespace-nowrap rounded-[25px] text-[14px] leading-[22.4px]"
      onClick={onStart}
    >
      깃로그 시작하기
    </Button>
  ) : (
    <>
      <Button
        variant="outlinePointWhite"
        className={clsx(
          "h-[38px] flex-1 rounded-[25px] text-[14px] leading-[22.4px]",
          "whitespace-nowrap min-w-0"
        )}
        onClick={onMyGitlog}
      >
        나의 깃로그
      </Button>

      <Button
        variant="outlinePointWhite"
        className={clsx(
          "h-[38px] flex-1 rounded-[25px] text-[14px] leading-[22.4px]",
          "whitespace-nowrap min-w-0"
        )}
        onClick={onWrite}
      >
        깃로그 쓰기
      </Button>
    </>
  )}
</div>
      </div>

      {/* 하단 영역 (member 전용) */}
      {!isGuest && (
        <div className="flex w-full justify-between gap-3 px-5 pb-5">
          <Button
            variant="outlineGrayWhite"
            className="h-[38px] w-[99px] rounded-[25px] text-[14px] leading-[22.4px]"
            onClick={onSettings}
          >
            설정
          </Button>
          <Button
            variant="outlineGrayWhite"
            className="h-[38px] w-[99px] rounded-[25px] text-[14px] leading-[22.4px]"
            onClick={onLogout}
          >
            로그아웃
          </Button>
        </div>
      )}
    </aside>
  );
}
