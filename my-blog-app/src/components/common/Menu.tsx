import type { ReactNode } from 'react'

type MenuProps = {
  children?: ReactNode
}

export default function Menu({ children }: MenuProps) {
  return (
    <div className='relative inline-flex flex-col items-center'>
      {/* 사각형 영역 */}
      <div className='flex items-center gap-[10px] px-4 py-1 rounded bg-white shadow-md'>
        {children}
      </div>

      {/* 삼각형 (SVG 그대로 사용 가능) */}
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='16'
        height='8'
        viewBox='0 0 16 8'
        className='absolute -bottom-2 fill-white'
      >
        <path d='M8 8L0 0L16 0L8 8Z' />
      </svg>
    </div>
  )
}
