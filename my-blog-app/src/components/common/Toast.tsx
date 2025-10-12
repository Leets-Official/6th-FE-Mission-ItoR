import type { ReactNode } from 'react'

type ToastProps = {
  type?: 'negative' | 'positive'
  message: string
  icon?: ReactNode
}

export default function Toast({ type = 'negative', message, icon }: ToastProps) {
  const baseStyle =
    'inline-flex h-10 px-3 justify-center items-center gap-1 shrink-0 rounded-[25px] border backdrop-blur-[2px] bg-white/90 text-[14px] leading-[160%] tracking-[-0.07px] font-sans'

  const variants: Record<'negative' | 'positive', string> = {
    negative: 'border-negative text-negative',
    positive: 'border-positive text-positive',
  }

  return (
    <div className={`${baseStyle} ${variants[type]}`}>
      {icon && <span>{icon}</span>}
      <span>{message}</span>
    </div>
  )
}
