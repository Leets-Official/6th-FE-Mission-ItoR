import { useState } from 'react'

interface DropdownMenuProps {
  items: { label: string; onClick?: () => void }[]
}

export function ArrowDropdownMenu({ items }: DropdownMenuProps) {
  const [open, setOpen] = useState(false)

  return (
    <div className='relative inline-flex flex-col items-end'>
      {/* 버튼 */}
      <button onClick={() => setOpen(!open)} className='px-4 py-2 bg-blue-500 text-white rounded'>
        메뉴 열기
      </button>

      {/* 드롭다운 영역 */}
      {open && (
        <div className='mt-2 inline-flex flex-col items-end shadow-[0_2px_8px_rgba(0,0,0,0.10)]'>
          {/* 화살표 */}
          <svg
            className='w-4 h-2 flex-shrink-0'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 16 8'
            fill='white'
          >
            <path d='M8 0L16 8H0L8 0Z' />
          </svg>

          {/* 메뉴 아이템 리스트 */}
          <div className='flex flex-col bg-white rounded-md'>
            {items.map((item, idx) => (
              <div
                key={idx}
                onClick={item.onClick}
                className='flex w-[160px] px-3 pt-2 pb-3 items-center gap-[10px] 
                           bg-white text-black font-sans text-[14px] 
                           leading-[160%] tracking-[-0.07px] cursor-pointer 
                           hover:bg-gray-100'
              >
                {item.label}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
