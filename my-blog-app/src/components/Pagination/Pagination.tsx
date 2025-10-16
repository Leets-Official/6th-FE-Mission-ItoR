import React from 'react'
import PaginationPrev from './PaginationPrev'
import PaginationNext from './PaginationNext'
import PaginationNumber from './PaginationNumber'

type PaginationProps = {
  totalPages: number
  currentPage: number
  onPageChange?: (page: number) => void
}

export default function Pagination({ totalPages, currentPage, onPageChange }: PaginationProps) {
  const handlePrev = () => {
    if (currentPage > 1 && onPageChange) onPageChange(currentPage - 1)
  }

  const handleNext = () => {
    if (currentPage < totalPages && onPageChange) onPageChange(currentPage + 1)
  }

  const renderPages = () => {
    return Array.from({ length: totalPages }, (_, i) => {
      const page = i + 1
      return (
        <PaginationNumber
          key={page}
          number={page}
          active={page === currentPage}
          onClick={() => onPageChange && onPageChange(page)}
        />
      )
    })
  }

  return (
    <div className='inline-flex items-center gap-[8px]'>
      <PaginationPrev disabled={currentPage === 1} onClick={handlePrev} />
      {renderPages()}
      <PaginationNext disabled={currentPage === totalPages} onClick={handleNext} />
    </div>
  )
}
