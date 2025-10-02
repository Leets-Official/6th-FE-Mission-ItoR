import { MenuIcon } from '../../assets/icons/MenuIcon'
type PageHeaderProps = {
  title: string
  rightContent?: React.ReactNode
}

export default function PageHeader({ title, rightContent }: PageHeaderProps) {
  return (
    <header
      className='
        flex items-center justify-between
        w-full px-3 py-4
        bg-white/90 backdrop-blur-sm
      '
    >
      <div className='flex items-center justify-center gap-2'>
        <MenuIcon />
        <h1 className='text-[20px] leading-[28px] font-normal font-smooch text-black'>{title}</h1>
      </div>

      <div className='flex items-center gap-2'>{rightContent}</div>
    </header>
  )
}
