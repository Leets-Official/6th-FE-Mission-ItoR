import clsx from 'clsx';
import { FC } from 'react';

import PaginationButton from './PaginationButton';

interface PaginationProps {
  className?: string;
}

const Pagination: FC<PaginationProps> = ({ className = '' }) => {
  return (
    <div className={clsx('inline-flex items-start gap-2', className)}>
      <PaginationButton variant="navigation" direction="prev" />

      <PaginationButton variant="page">1</PaginationButton>

      <PaginationButton variant="navigation" direction="next" />
    </div>
  );
};

export default Pagination;
