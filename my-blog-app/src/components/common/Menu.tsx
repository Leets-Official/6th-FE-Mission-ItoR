import type { ReactNode } from 'react'
import { TriangleIcon } from '@/assets/icons/TriangleIcon'

type MenuProps = {
  children?: ReactNode
}

export default function Menu({ children }: MenuProps) {
  return (
    <div className='relative inline-flex flex-col items-center'>
      <div className='flex items-center gap-[10px] px-4 py-1 rounded bg-white shadow-md'>
        {children}
      </div>

      <TriangleIcon className='absolute -bottom-2 fill-white' />
    </div>
  )
}
