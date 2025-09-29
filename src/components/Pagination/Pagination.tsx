import React from "react";
import { PaginationProps } from "./Pagination.types";
import { basePagination, pageButtonBase, pageButtonStyles } from "./Pagination.styled";
import { cn } from "@/utils/cn";

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className = "",
}) => {
  if (totalPages <= 0) return null;

  const handleClick = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  return (
    <div className={cn(basePagination, className)}>
      {/* 이전 화살표 */}
      <button
        className={cn(
          pageButtonBase,
          currentPage === 1 ? pageButtonStyles.disabled : pageButtonStyles.default,
        )}
        onClick={() => handleClick(currentPage - 1)}
        disabled={currentPage === 1}
      >
        {"<"}
      </button>

      {/* 페이지 숫자 */}
      {Array.from({ length: totalPages }, (_, idx) => {
        const page = idx + 1;
        const isActive = page === currentPage;
        return (
          <button
            key={page}
            className={cn(
              pageButtonBase,
              isActive ? pageButtonStyles.active : pageButtonStyles.default,
            )}
            onClick={() => handleClick(page)}
            disabled={isActive}
          >
            {page}
          </button>
        );
      })}

      {/* 다음 화살표 */}
      <button
        className={cn(
          pageButtonBase,
          currentPage === totalPages ? pageButtonStyles.disabled : pageButtonStyles.default,
        )}
        onClick={() => handleClick(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        {">"}
      </button>
    </div>
  );
};

export default Pagination;
