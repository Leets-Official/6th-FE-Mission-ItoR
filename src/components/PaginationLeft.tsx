import React from "react";
import clsx from "clsx";

type PaginationLeftVariant = "grayBlack" | "blueBlue" | "grayGray";

interface PaginationLeftProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: PaginationLeftVariant;
}

const PaginationLeft: React.FC<PaginationLeftProps> = ({
  variant = "grayBlack",
  ...props
}) => {
  const baseStyles =
    "flex items-center justify-center w-8 h-8 p-2 rounded-[2px] text-[16px] font-medium";

  const variantStyles: Record<PaginationLeftVariant, string> = {
    grayBlack: "bg-white border border-gray-300 text-black",
    blueBlue: "bg-white border border-blue-500 text-blue-500",
    grayGray: "bg-white border border-gray-300 text-gray-500",
  };

  return (
    <button className={clsx(baseStyles, variantStyles[variant])} {...props}>
      &lt;
    </button>
  );
};

export default PaginationLeft;