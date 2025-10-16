import React, { useState } from 'react'
import Pagination from '@/components/Pagination/Pagination'

export default function PaginationTestPage() {
  const [page, setPage] = useState(1)

  return (
    <div className='flex flex-col items-center justify-center min-h-screen gap-6 bg-gray-100'>
      <Pagination totalPages={5} currentPage={page} onPageChange={setPage} />
      <p className='text-gray-800 text-sm'>
        현재 페이지: <span className='font-medium'>{page}</span>
      </p>
    </div>
  )
}
