// src/components/ui/Button.tsx
import React from "react";
import PencilIconSvg from "../../assets/icons/pencil.svg?react";

export type ButtonVariant =
  | "outlinePointWhite"
  | "outlineGrayWhite"
  | "outlineGrayGray90"
  | "solidWhite"
  | "solidGray90"
  | "solidDark";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
  /** 왼쪽 아이콘 표시 여부 (연필 아이콘) */
  leftIcon?: boolean;
  /** 스타일 변형 */
  variant?: ButtonVariant;
  /** 비활성화 */
  disabled?: boolean;
  /** 커스텀 클래스 추가 */
  className?: string;
};

const byVariant: Record<ButtonVariant, string> = {
  outlinePointWhite: `
    border border-[var(--Point)]
    bg-[var(--White)]
    text-[var(--Point)]
  `,
  outlineGrayWhite: `
    border border-[var(--Gray56)]
    bg-[var(--White)]
    text-[var(--Gray20)]
  `,
  outlineGrayGray90: `
    border border-[var(--Gray56)]
    bg-[var(--Gray90)]
    text-[var(--Gray20)]
  `,
  solidWhite: `
    border-0
    bg-[var(--White)]
    text-[var(--Gray20)]
  `,
  solidGray90: `
    border-0
    bg-[var(--Gray90)]
    text-[var(--Gray20)]
  `,
  solidDark: `
    border-0
    bg-[var(--Gray-7)]
    text-[var(--White)]
  `,
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
      className={`btn-reset
        inline-flex h-10 px-3 py-2
        justify-center items-center
        gap-1 shrink-0
        rounded-[25px]
        font-['Noto_Sans_KR'] text-[14px] font-normal leading-[160%] tracking-[-0.07px]
        transition-colors
        ${byVariant[variant]}
        ${disabled ? "opacity-50 cursor-not-allowed" : "hover:brightness-95"}
        ${className}
      `}
    >
      {leftIcon && (
        <PencilIconSvg
          className="w-5 h-5 shrink-0 fill-current stroke-current"
          aria-hidden
        />
      )}
      <span>{children}</span>
    </button>
  );
};

export default Button;
