import React from "react";
import CreateIcon from "@/assets/create.svg?react";

type Variant =
    | "primaryOutline"    // 파란 라인 + 흰 배경
    | "secondaryOutline"  // 회색 라인 + 흰 배경
    | "tertiary"          // 흰 배경 + 회색 텍스트
    | "neutral"           // 옅은 회색 배경 + 회색 텍스트
    | "disabled"          // 흐린 텍스트 + 연한 회색 배경
    | "inverse"           // 검정 배경 + 흰 글자
    | "inverseMuted";     // 검정 배경 + 회색 글자

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    label: string;
    variant?: Variant;
    leftIcon?: React.ReactNode;
    fullWidth?: boolean;
}

const base =
    "inline-flex items-center gap-3 rounded-full px-6 py-3 text-lg font-semibold transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

const variants: Record<Variant, string> = {
    primaryOutline: "border border-[#00A1FF] text-[#00A1FF] bg-[#FFFFFF]",
    secondaryOutline:"border border-[#909090] text-[#909090] bg-[#FFFFFF]",
    tertiary:"border border-transparent text-[#909090] bg-[#FFFFFF]",
    neutral:"border border-[#909090] text-[#909090] bg-[#E6E6E6]",
    disabled:"border border-transparent text-[#909090] bg-[#E6E6E6]",
    inverse:"border border-transparent text-[#FFFFFF] bg-[#111112]",
    inverseMuted:"border border-transparent text-[#909090] bg-[#111112]",
};

export const Button: React.FC<ButtonProps> = ({
                                                  label,
                                                  variant = "primaryOutline", // 기본값
                                                  leftIcon,
                                                  className = "",
                                                  disabled,
                                                  fullWidth,
                                                  ...props
                                              }) => {
    const disabledStyle = "cursor-not-allowed";

    const cls = [
        base,
        variants[variant],
        fullWidth ? "w-full justify-center" : "",
        disabled ? disabledStyle : "",
        className,
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <button className={cls} disabled={disabled} {...props}>
            {leftIcon ?? <CreateIcon className="w-6 h-6 shrink-0" />}
            <span>{label}</span>
        </button>
    );
};

export default Button;
