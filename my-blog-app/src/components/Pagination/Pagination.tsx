import PaginationPrev from './PaginationPrev'
import PaginationNext from './PaginationNext'

type PaginationProps = {
  totalPages: number
  currentPage: number
  onPageChange?: (page: number) => void
}

export default function Pagination({ totalPages, currentPage, onPageChange }: PaginationProps) {
  // 엣지 케이스 1: totalPages가 0 이하일 때 → 아무것도 렌더링하지 않음
  if (totalPages <= 0) return null

  // 엣지 케이스 2: currentPage가 범위를 벗어나면 보정
  const safeCurrentPage = Math.min(Math.max(currentPage, 1), totalPages)

  const handlePrev = () => {
    if (safeCurrentPage > 1 && onPageChange) onPageChange(safeCurrentPage - 1)
  }

  const handleNext = () => {
    if (safeCurrentPage < totalPages && onPageChange) onPageChange(safeCurrentPage + 1)
  }

  const renderPages = () => {
    const pages: (number | string)[] = []
    const maxVisible = 5
    const showEllipsis = totalPages > maxVisible + 2

    if (!showEllipsis) {
      for (let i = 1; i <= totalPages; i++) pages.push(i)
    } else {
      pages.push(1)
      const start = Math.max(2, safeCurrentPage - 2)
      const end = Math.min(totalPages - 1, safeCurrentPage + 2)

      if (start > 2) pages.push('...')
      for (let i = start; i <= end; i++) pages.push(i)
      if (end < totalPages - 1) pages.push('...')
      pages.push(totalPages)
    }

    return pages.map((page, i) =>
      page === '...' ? (
        <span key={`ellipsis-${i}`} className='px-2 text-gray-400 select-none'>
          ...
        </span>
      ) : (
        <button
          key={page}
          onClick={() => onPageChange && onPageChange(page as number)}
          className={`flex items-center justify-center w-8 h-8 border border-gray-300 rounded-[2px] text-sm transition
            ${
              page === safeCurrentPage
                ? 'bg-primary text-white border-primary'
                : 'bg-white text-gray-800 hover:bg-gray-100 hover:border-gray-400'
            }`}
        >
          {page}
        </button>
      ),
    )
  }

  return (
    <div className='inline-flex items-center gap-[8px]'>
      <PaginationPrev
        disabled={safeCurrentPage === 1}
        onClick={handlePrev}
        className='hover:opacity-70 transition'
      />
      {renderPages()}
      <PaginationNext
        disabled={safeCurrentPage === totalPages}
        onClick={handleNext}
        className='hover:opacity-70 transition'
      />
    </div>
  )
}
