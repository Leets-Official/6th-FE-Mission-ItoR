import React from 'react';
import PaginationButton from './PaginationButton';
import LeftIcon from '@/assets/svgs/Left.svg?react';
import RightIcon from '@/assets/svgs/right.svg?react';

type PaginationVariant = 'grayBlack' | 'blueBlue' | 'grayGray';

type PaginationProps = {
  variant?: PaginationVariant;
  totalPages?: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({
  variant = 'grayBlack',
  totalPages = 5,
  currentPage = 1,
  onPageChange,
}) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handlePrev = () => {
    if (currentPage && currentPage > 1) onPageChange?.(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage && currentPage < totalPages) onPageChange?.(currentPage + 1);
  };

  return (
    <div className="flex items-center gap-2">
      <PaginationButton onClick={handlePrev} variant={variant}>
        <LeftIcon className="w-4 h-4" />
      </PaginationButton>

      {pages.map((page) => (
        <PaginationButton
          key={page}
          variant={page === currentPage ? 'blueBlue' : variant}
          onClick={() => onPageChange?.(page)}
        >
          {page}
        </PaginationButton>
      ))}

      <PaginationButton onClick={handleNext} variant={variant}>
        <RightIcon className="w-4 h-4" />
      </PaginationButton>
    </div>
  );
};

export default Pagination;
