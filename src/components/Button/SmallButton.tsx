import React from "react";
import CreateIcon from "@/assets/create.svg?react";

type SmallVariant =
    | "secondaryOutline"   // 회색 라인 + 흰 배경
    | "disabled";          // 흐린 텍스트 + 연한 회색 배경

interface SmallButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    label: string;
    variant?: SmallVariant;
    leftIcon?: React.ReactNode;
    fullWidth?: boolean;
}

const base =
    "inline-flex items-center gap-2 rounded-md px-2 py-1 text-[12px] font-medium transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

const variants: Record<SmallVariant, string> = {
    secondaryOutline:
        "border border-transparent text-[#909090] bg-transparent",
    disabled:
        "border border-transparent text-[#909090] bg-[#E6E6E6]",
};

export const SmallButton: React.FC<SmallButtonProps> = ({
                                                            label,
                                                            variant = "secondaryOutline",
                                                            leftIcon,
                                                            className = "",
                                                            disabled,
                                                            fullWidth,
                                                            ...props
                                                        }) => {
    const cls = [
        base,
        variants[variant],
        fullWidth ? "w-full justify-center" : "",
        className,
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <button className={cls} disabled={disabled} {...props}>
            {leftIcon ?? <CreateIcon className="w-3 h-3 shrink-0" />}
            <span>{label}</span>
        </button>
    );
};

export default SmallButton;
