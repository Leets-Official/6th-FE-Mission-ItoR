import React from "react";
import clsx from "clsx";

type PaginationVariant = "grayBlack" | "blueBlue" | "grayGray";

interface PaginationButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: PaginationVariant;
}

const PaginationButton: React.FC<PaginationButtonProps> = ({
  variant = "grayBlack",
  children,
  ...props
}) => {
  const baseStyles = "flex items-center justify-center w-8 h-8 p-2 rounded-[2px] text-[16px] font-medium";

  const variantStyles: Record<PaginationVariant, string> = {
    grayBlack: "bg-white border border-gray-300 text-black",
    blueBlue: "bg-white border border-blue-500 text-blue-500",
    grayGray: "bg-white border border-gray-300 text-gray-500",
  };

  return (
    <button className={clsx(baseStyles, variantStyles[variant])} {...props}>
      {children}
    </button>
  );
};

export default PaginationButton;
