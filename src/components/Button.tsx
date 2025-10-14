import React from "react";
import clsx from "clsx";

// 7가지 버튼 variant 타입 정의
type ButtonVariant =
  | "blueBorder"    // 1. 파랑 테두리 + 글씨 + 아이콘
  | "grayBorder"    // 2. 회색 테두리 + 글씨 + 아이콘
  | "whiteGrayIcon" // 3. 배경 흰색, 글씨+아이콘 회색
  | "lightGray"     // 4. 연한 회색 배경, 글씨+아이콘 회색
  | "grayBorderLightBg" // 5. 회색 테두리, 연한 회색 배경, 글씨+아이콘 회색
  | "blackWhite"    // 6. 검은 배경, 글씨+아이콘 흰색
  | "blackGray";    // 7. 검은 배경, 글씨+아이콘 회색

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  icon?: React.ReactElement<React.SVGProps<SVGSVGElement>>;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = "blueBorder",
  icon,
  children,
  className,
  ...props
}) => {
  const baseStyles =
    "flex items-center justify-center gap-2 rounded-full font-medium " +
    "h-[40px] w-[145px] disabled:opacity-50 disabled:cursor-not-allowed";

  // 7가지 variant 스타일 정의
  const variantStyles: Record<ButtonVariant, string> = {
    blueBorder: "bg-white text-blue-500 border border-blue-500",
    grayBorder: "bg-white text-gray-500 border border-gray-400",
    whiteGrayIcon: "bg-white text-gray-500 border-none",
    lightGray: "bg-gray-100 text-gray-500 border-none",
    grayBorderLightBg: "bg-gray-100 text-gray-500 border border-gray-400",
    blackWhite: "bg-black text-white border-none",
    blackGray: "bg-black text-gray-500 border-none",
  } as const;

  // 아이콘 색상도 variant에 맞게 적용
  const iconColorStyles: Record<ButtonVariant, string> = {
    blueBorder: "text-blue-500",
    grayBorder: "text-gray-500",
    whiteGrayIcon: "text-gray-500",
    lightGray: "text-gray-500",
    grayBorderLightBg: "text-gray-500",
    blackWhite: "text-white",
    blackGray: "text-gray-500",
  } as const;

  return (
    <button
      className={clsx(baseStyles, variantStyles[variant], className)}
      disabled={props.disabled}
      {...props}
    >
      {icon && React.cloneElement(icon, {className : clsx(icon.props.className, iconColorStyles[variant], "w-5 h-5")})}
      <span className="flex items-center justify-center w-[93px] h-[22px] text-[14px]">
        {children}
      </span>
    </button>
  );
};

export default Button;
