import type { ReactNode } from 'react'
import { MenuIcon } from '@/assets/icons/MenuIcon'

type PageHeaderProps = {
  title: string
  rightContent?: ReactNode
  subContent?: ReactNode
  hideMenu?: boolean
}

export default function PageHeader({
  title,
  rightContent,
  subContent,
  hideMenu = false,
}: PageHeaderProps) {
  return (
    <header className='flex flex-col w-full bg-white/90 shadow-[0_4px_4px_rgba(0,0,0,0.01)] backdrop-blur-[2px]'>
      {/* 상단 헤더 */}
      <div className='flex justify-between items-center w-full px-3 py-4'>
        <div className='flex items-center gap-2'>
          {!hideMenu && <MenuIcon />}
          <h1 className='text-[20px] leading-[28px] font-normal font-smooch text-black'>{title}</h1>
        </div>
        {rightContent && <div className='flex items-center gap-2'>{rightContent}</div>}
      </div>

      {/* 하단 보조 subContent */}
      {subContent && (
        <div
          className='
            flex justify-center items-center
            gap-1 px-2 pt-[2px] pb-1 rounded-[2px]
          '
        >
          {subContent}
        </div>
      )}
    </header>
  )
}
