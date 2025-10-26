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
  // 사이드바 전체 박스 (fixed, 왼쪽)
  const frameRootClass = clsx(
    "fixed top-0 left-0 flex h-screen w-[240px] flex-col shrink-0",
    "border-r border-[var(--Gray90,#E6E6E6)] bg-[var(--gray96,#F5F5F5)]",
    variant === "guest" ? "items-start gap-[10px]" : "justify-between items-start",
    className
  );

  // 상단 영역
  const topWrapClass =
    "w-full px-5 pt-6 flex flex-col items-start gap-4 min-w-0";

  // CTA 버튼 row
  const actionsRowClass = "w-full flex gap-3";

  // 하단
  const bottomWrapClass =
    "w-full px-5 pb-5 flex justify-between gap-3";

  // 프로필 
  const avatarBoxClass = clsx(
    "w-[64px] h-[64px] rounded-full bg-[var(--Gray7,#111112)]",
    "flex items-center justify-center",
    "text-[36px] leading-[28px] font-[400] text-[var(--White)]",
    "font-[Smooch]" 
  );

  // 공통 CTA 버튼 유틸
  const ctaBase =
    "h-[38px] rounded-[25px] whitespace-nowrap text-[14px] leading-[22.4px]";
  const ctaFlexNone = clsx(ctaBase, "flex-none");
  const ctaFlex1 = clsx(ctaBase, "flex-1");
  const ctaFixed = clsx(ctaBase, "w-[99px]");

  return (
    <aside className={frameRootClass}>
      <div className={topWrapClass}>
        {/* 아바타 */}
        <div className="flex items-center justify-center">
          {avatarSrc ? (
            <img
              src={avatarSrc}
              alt=""
              className={clsx(
                "w-[64px] h-[64px] rounded-full object-cover bg-[var(--Gray7,#111112)]",
                "text-[36px] leading-[28px] font-[400] text-[var(--White)]",
                "font-[Smooch]"
              )}
            />
          ) : (
            <div className={avatarBoxClass}>{initial}</div>
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
        <div className={actionsRowClass}>
          {variant === "guest" ? (
            <Button
              variant="outlinePointWhite"
              className={ctaFlexNone}
              onClick={onStart}
            >
              깃로그 시작하기
            </Button>
          ) : (
            <>
              <Button
                variant="outlinePointWhite"
                className={ctaFlex1}
                onClick={onMyGitlog}
              >
                나의 깃로그
              </Button>
              <Button
                variant="outlinePointWhite"
                className={ctaFlex1}
                onClick={onWrite}
              >
                깃로그 쓰기
              </Button>
            </>
          )}
        </div>
      </div>

      {variant === "member" && (
        <div className={bottomWrapClass}>
          <Button
            variant="outlineGrayWhite"
            className={ctaFixed}
            onClick={onSettings}
          >
            설정
          </Button>
          <Button
            variant="outlineGrayWhite"
            className={ctaFixed}
            onClick={onLogout}
          >
            로그아웃
          </Button>
        </div>
      )}
    </aside>
  );
}
