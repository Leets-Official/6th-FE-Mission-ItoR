import React from "react";
import PaginationButton from "./PaginationButton";
import LeftIcon from "@/assets/svgs/left.svg?react";
import RightIcon from "@/assets/svgs/right.svg?react";


type PaginationVariant = "grayBlack" | "blueBlue" | "grayGray";

type PaginationProps = {
  variant?: PaginationVariant;
  totalPages?: number;
  currentPage?: number;
};

const Pagination: React.FC<PaginationProps> = ({
  variant = "grayBlack",
  totalPages = 5,
  currentPage = 1,
}) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center gap-2">
      <PaginationButton
        children={<LeftIcon className="w-4 h-4" />}
        variant={variant}
      />
      {pages.map((page) => (
        <PaginationButton key={page} children={page} variant={variant} />
      ))}

      <PaginationButton
        children={<RightIcon className="w-4 h-4" />}
        variant={variant}
      />
    </div>
  );
};

export default Pagination;
