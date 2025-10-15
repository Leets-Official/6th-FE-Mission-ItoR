import PaginationButton from '../PaginationButton'
import LeftIcon from '@/assets/svgs/navigate_before.svg?react';
import RightIcon from '@/assets/svgs/Right.svg?react';
import React from "react";

const TestPagination = () => {
  return (
    <>
      <p>Pagination Component</p>
      <div className="flex gap-2">
        <PaginationButton children={<LeftIcon className="w-4 h-4" />} variant="grayBlack" />
        <PaginationButton children={1} variant="grayBlack" />
        <PaginationButton children={2} variant="grayBlack" />
        <PaginationButton children={3} variant="grayBlack" />
        <PaginationButton children={4} variant="grayBlack" />
        <PaginationButton children={5} variant="grayBlack" />
        <PaginationButton children={<RightIcon className="w-4 h-4" />} variant="grayGray" />
      </div>
    </>
  )
}

export default TestPagination;