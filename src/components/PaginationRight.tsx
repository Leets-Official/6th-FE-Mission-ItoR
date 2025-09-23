import React from "react";

type PaginationRightVariant = "grayBlack" | "blueBlue" | "grayGray";

interface PaginationRightProps {
  variant?: PaginationRightVariant;
}

const PaginationRight: React.FC<PaginationRightProps> = ({ variant = "grayBlack" }) => {
  const variantStyles: Record<PaginationRightVariant, string> = {
    grayBlack: "bg-white border border-gray-300 text-black",
    blueBlue: "bg-white border border-blue-500 text-blue-500",
    grayGray: "bg-white border border-gray-300 text-gray-300",
  };

  return (
    <button className={`flex items-center justify-center w-8 h-8 rounded-[2px] ${variantStyles[variant]}`}>
      &gt;
    </button>
  );
};

export default PaginationRight;
