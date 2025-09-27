// src/components/ui/Button.tsx
import React from "react";
import PencilIconSvg from "@icons/pencil.svg?react";

export type ButtonVariant =
  | "outlinePointWhite"   // 1) 테두리 Point + 배경 White + 텍스트 Point
  | "outlineGrayWhite"    // 2) 테두리 Gray56 + 배경 White + 텍스트 Gray56
  | "solidWhite"          // 3) 배경 White + 텍스트 Gray56 (테두리 없음)
  | "outlineGrayGray90"   // 4) 테두리 Gray56 + 배경 Gray90 + 텍스트 Gray56
  | "solidGray90"         // 5) 배경 Gray90 + 텍스트 Gray56 (테두리 없음)
  | "solidDark"           // 6) 배경 Gray7 + 텍스트 White
  | "solidDarkAlt";       // 7) 배경 Gray7 + 텍스트 Gray56

type ButtonProps = {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
  leftIcon?: boolean;
  variant?: ButtonVariant;
  disabled?: boolean;
  className?: string;
};

const base =
  // 공통 레이아웃 & 14 Regular 타이포 (line-height 160%, letter-spacing -0.07px)
  "inline-flex h-10 px-3 py-2 items-center justify-center gap-1 shrink-0 " +
  "rounded-[25px] " +
  "text-[14px] leading-[22.4px] font-normal tracking-[-0.07px] " +
  "transition-colors font-['Noto_Sans_KR']";

const byVariant: Record<ButtonVariant, string> = {
  // 1)
  outlinePointWhite:
    "border border-[var(--Point)] bg-[var(--White)] text-[var(--Point)]",
  // 2)
  outlineGrayWhite:
    "border border-[var(--Gray56)] bg-[var(--White)] text-[var(--Gray56)]",
  // 3) (테두리 없음)
  solidWhite:
    "border-0 bg-[var(--White)] text-[var(--Gray56)]",
  // 4)
  outlineGrayGray90:
    "border border-[var(--Gray56)] bg-[var(--Gray90)] text-[var(--Gray56)]",
  // 5) (테두리 없음)
  solidGray90:
    "border-0 bg-[var(--Gray90)] text-[var(--Gray56)]",
  // 6)
  solidDark:
    "border-0 bg-[var(--Gray7)] text-[var(--White)]",
  // 7)
  solidDarkAlt:
    "border-0 bg-[var(--Gray7)] text-[var(--Gray56)]",
};

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = "button",
  leftIcon = false,
  variant = "outlinePointWhite",
  disabled = false,
  className = "",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={[
        base,
        byVariant[variant],
        disabled ? "opacity-50 cursor-not-allowed" : "hover:brightness-95",
        className,
      ].join(" ")}
    >
      {leftIcon && (
        <PencilIconSvg
          className="w-5 h-5 mr-1 shrink-0 fill-current stroke-current"
          aria-hidden
        />
      )}
      <span>{children}</span>
    </button>
  );
};

export default Button;
