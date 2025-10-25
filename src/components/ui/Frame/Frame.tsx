import React from "react";
import TextBox from "../TextBox/TextBox";
import Button from "../Button/Button";

type FrameVariant = "guest" | "user";

interface FrameProps {
  variant: FrameVariant;
  name: string;
  intro: string;
  onStart?: () => void;
  onMyGitlog?: () => void;
  onWriteGitlog?: () => void;
  className?: string;
}

export default function Frame({
  variant,
  name,
  intro,
  onStart,
  onMyGitlog,
  onWriteGitlog,
  className,
}: FrameProps) {
  const frameRootClass =
    "fixed top-0 left-0 flex w-[240px] h-screen flex-col flex-shrink-0 border-r border-[var(--Gray90,#E6E6E6)] bg-[var(--gray96,#F5F5F5)]" +
    (className ? ` ${className}` : "");
  const topWrapClass = "flex w-full flex-col p-4 gap-4";
  const actionsRowClass = "flex w-full gap-2";
  const ctaBase = "h-[38px] rounded-[25px] whitespace-nowrap text-[14px] leading-[22.4px]";
  const ctaFlexNone = `${ctaBase} flex-none`;
  const ctaFlex1 = `${ctaBase} flex-1`;

  return (
    <aside className={frameRootClass}>
      <div className={topWrapClass}>
        <TextBox
          tbStyle="primary"
          title={name}
          description={intro}
          className="w-full max-w-full bg-transparent"
        />

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
                onClick={onWriteGitlog}
              >
                깃로그 쓰기
              </Button>
            </>
          )}
        </div>
      </div>
    </aside>
  );
}
