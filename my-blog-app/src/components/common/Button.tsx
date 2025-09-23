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
    "inline-flex justify-center items-center gap-1 rounded-[25px] transition-colors duration-200 font-noto text-sm font-normal leading-[160%] tracking-[-0.07px]";

  const variants = {
    primary:
      "h-10 px-3 py-2 border border-[#00A1FF] text-[#00A1FF] bg-white hover:bg-[#E6F7FF] disabled:border-gray-300 disabled:text-gray-300",
    secondary:
      "h-10 px-3 py-2 border border-[#909090] text-[#909090] bg-white hover:bg-gray-100 disabled:text-gray-300",
    flat:
      "h-10 px-3 py-2 bg-white text-[#909090] hover:bg-gray-50 disabled:text-gray-300",
    tertiary:
      "h-10 px-3 py-2 border border-[#909090] bg-[#E6E6E6] text-[#909090] hover:bg-[#D9D9D9] disabled:text-gray-400",
    ghost:
      "h-10 px-3 py-2 bg-[#E6E6E6] text-[#909090] hover:bg-[#D9D9D9] disabled:text-gray-300",
    black:
      "h-10 px-3 py-2 bg-[#111112] text-white hover:bg-[#1a1a1a] disabled:bg-gray-300 disabled:text-gray-100",
    blackMuted:
      "h-10 px-3 py-2 bg-[#111112] text-[#909090] hover:bg-[#1a1a1a] disabled:bg-gray-300 disabled:text-gray-100",
    tag:
      "inline-flex px-2 pt-[2px] pb-[4px] justify-center items-center gap-1 rounded-[2px] text-[#909090] text-[12px] font-normal leading-[160%]",
    tagFilled:
      "inline-flex px-2 pt-[2px] pb-[4px] justify-center items-center gap-1 rounded-[2px] bg-[#E6E6E6] text-[#909090] text-[12px] font-normal leading-[160%]",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${
        disabled ? "cursor-not-allowed opacity-60" : ""
      }`}
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
