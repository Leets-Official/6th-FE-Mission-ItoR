import type { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  icon?: ReactNode;
  iconSize?: number;
  onClick?: () => void;
  variant?:
    | "primary"
    | "secondary"
    | "flat"
    | "tertiary"
    | "ghost"
    | "black"
    | "blackMuted"
    | "tag"
    | "tagFilled";
  disabled?: boolean;
};

export function Button({
  children,
  icon,
  iconSize,
  onClick,
  variant = "primary",
  disabled = false,
}: ButtonProps) {
  // 피그마에서 제공한 아이콘 크기 (tag 계열은 10.5px, 나머지는 18px)
  const defaultIconSize =
    iconSize ?? (variant === "tag" || variant === "tagFilled" ? 10.5 : 18);

  const base =
    "inline-flex justify-center items-center gap-1 rounded-[25px] transition-colors duration-200 font-noto text-sm font-normal leading-[160%] tracking-[-0.07px] h-10 px-3 py-2";

  // disabled 스타일을 한 곳에서 관리 (색상 + 커서 + 투명도)
  const commonDisabled =
    "disabled:border-gray-300 disabled:text-gray-300 disabled:cursor-not-allowed disabled:opacity-60";

  const variants = {
    primary:
      `border border-[#00A1FF] text-[#00A1FF] bg-white hover:bg-[#E6F7FF] ${commonDisabled}`,
    secondary:
      `border border-[#909090] text-[#909090] bg-white hover:bg-gray-100 ${commonDisabled}`,
    flat:
      `bg-white text-[#909090] hover:bg-gray-50 ${commonDisabled}`,
    tertiary:
      `border border-[#909090] bg-[#E6E6E6] text-[#909090] hover:bg-[#D9D9D9] ${commonDisabled}`,
    ghost:
      `bg-[#E6E6E6] text-[#909090] hover:bg-[#D9D9D9] ${commonDisabled}`,
    black:
      `bg-[#111112] text-white hover:bg-[#1a1a1a] ${commonDisabled}`,
    blackMuted:
      `bg-[#111112] text-[#909090] hover:bg-[#1a1a1a] ${commonDisabled}`,
    tag:
      "inline-flex px-2 pt-[2px] pb-[4px] justify-center items-center gap-1 rounded-[2px] text-[#909090] text-[12px] font-normal leading-[160%]",
    tagFilled:
      "inline-flex px-2 pt-[2px] pb-[4px] justify-center items-center gap-1 rounded-[2px] bg-[#E6E6E6] text-[#909090] text-[12px] font-normal leading-[160%]",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]}`}
    >
      {icon && (
        <span
          style={{
            width: `${defaultIconSize}px`,
            height: `${defaultIconSize}px`,
            display: "inline-flex",
            alignItems: "center",
          }}
        >
          {icon}
        </span>
      )}
      {children}
    </button>
  );
}
