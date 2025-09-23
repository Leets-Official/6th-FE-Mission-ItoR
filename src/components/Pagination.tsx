import React from "react";

interface PaginationProps {
  variant?: "grayBlack" | "blueBlue" | "grayGray";
}

const Pagination: React.FC<PaginationProps> = ({ variant = "grayBlack" }) => {
  const variantStyles: Record<string, string> = {
    grayBlack: "bg-white border border-gray-300 text-black",
    blueBlue: "bg-white border border-blue-500 text-blue-500",
    grayGray: "bg-white border border-gray-300 text-gray-300",
  };

  const pages = [1, 2, 3, 4, 5]; // 하드코딩 페이지 숫자 => 수정필요

  return (
    <div className="flex items-center gap-2">
      {pages.map((page) => (
        <button key={page} className={`w-8 h-8 flex items-center justify-center rounded-[2px] ${variantStyles[variant]}`}>
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
