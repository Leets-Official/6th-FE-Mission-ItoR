import { useState } from 'react'

interface DropdownMenuProps {
  items: { label: string; onClick?: () => void }[]
}

export function MaterialDropdownMenu({ items }: DropdownMenuProps) {
  const [open, setOpen] = useState(false)

  return (
    <div className='relative inline-flex flex-col items-start'>
      {/* 버튼 */}
      <button onClick={() => setOpen(!open)} className='px-4 py-2 bg-green-500 text-white rounded'>
        메뉴 열기
      </button>

      {/* 드롭다운 영역 */}
      {open && (
        <div className='mt-2 flex flex-col rounded-md shadow-[0_2px_8px_rgba(0,0,0,0.10)] bg-white'>
          {items.map((item, idx) => (
            <div
              key={idx}
              onClick={item.onClick}
              className='flex w-[160px] px-3 pt-2 pb-3 items-center gap-[10px]
                         text-black font-sans text-[14px] leading-[160%] tracking-[-0.07px]
                         cursor-pointer hover:bg-[#E6E6E6]'
            >
              {item.label}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
