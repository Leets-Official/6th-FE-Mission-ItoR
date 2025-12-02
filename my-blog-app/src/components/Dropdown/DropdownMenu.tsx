import { useState } from 'react'
import { TriangleIcon } from '@/assets/icons/TriangleIcon'

interface DropdownItem {
  label: string
  onClick?: () => void
}

interface DropdownMenuProps {
  items: DropdownItem[]
  variant?: 'arrow' | 'material'
}

export default function DropdownMenu({ items, variant = 'material' }: DropdownMenuProps) {
  const [open] = useState(true) // 외부에서 제어하지 않는 한 항상 보이게(테스트용)
  const isArrow = variant === 'arrow'

  return (
    <div className={`relative inline-flex flex-col ${isArrow ? 'items-end' : 'items-start'}`}>
      {/* ▼ 드롭다운 영역 */}
      {open && (
        <div
          className={`mt-2 flex flex-col rounded-md shadow-[0_2px_8px_rgba(0,0,0,0.10)] bg-transparent ${
            isArrow ? 'inline-flex items-end' : 'items-start'
          }`}
        >
          {/* 삼각형 (arrow 전용) */}
          {isArrow && (
            <div className='w-[29px] h-[8px] inline-flex flex-col items-end shadow-[0_2px_8px_rgba(0,0,0,0.10)] rotate-180'>
              <TriangleIcon className='w-[29px] h-[8px] fill-white' />
            </div>
          )}

          {/* ▼ 메뉴 본체 */}
          <div className='flex flex-col bg-transparent rounded-md'>
            {items.map((item, idx) => (
              <div
                key={idx}
                onClick={item.onClick}
                className={`flex w-[160px] px-3 pt-2 pb-3 items-center gap-[10px]
                  bg-white font-sans text-[14px]
                  leading-[160%] tracking-[-0.07px] cursor-pointer select-none
                  ${
                    item.label === '삭제하기'
                      ? 'text-[#FF3F3F] hover:bg-gray-50'
                      : 'text-black hover:bg-gray-50'
                  }`}
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
