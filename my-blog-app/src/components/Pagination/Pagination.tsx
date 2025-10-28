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
    const pages: (number | string)[] = []
    const maxVisible = 5 // 한 번에 표시할 페이지 개수
    const showEllipsis = totalPages > maxVisible + 2

    if (!showEllipsis) {
      for (let i = 1; i <= totalPages; i++) pages.push(i)
    } else {
      pages.push(1)
      const start = Math.max(2, currentPage - 2)
      const end = Math.min(totalPages - 1, currentPage + 2)

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
              page === currentPage
                ? 'bg-primary text-white border-primary'
                : 'bg-white text-gray-800 hover:bg-gray-100 hover:border-gray-400'
            }
          `}
        >
          {page}
        </button>
      ),
    )
  }

  return (
    <div className='inline-flex items-center gap-[8px]'>
      <PaginationPrev
        disabled={currentPage === 1}
        onClick={handlePrev}
        className='hover:opacity-70 transition'
      />
      {renderPages()}
      <PaginationNext
        disabled={currentPage === totalPages}
        onClick={handleNext}
        className='hover:opacity-70 transition'
      />
    </div>
  )
}
