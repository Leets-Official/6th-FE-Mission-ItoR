import type { ReactNode } from 'react'
import { cn } from '@/utils/cn'

type TextCardProps = {
  variant?: 'primary' | 'secondary' | 'body'
  title?: string
  subtitle?: string
  children?: ReactNode
}

export default function TextCard({ variant = 'body', title, subtitle, children }: TextCardProps) {
  const baseStyle = 'w-[688px] max-w-[688px] px-4 py-3 bg-[#F5F5F5] font-sans'

  const variants: Record<typeof variant, string> = {
    primary: 'flex flex-col justify-center items-start gap-3 w-full max-w-full',
    secondary: 'flex flex-col justify-center items-start gap-2',
    body: 'flex items-start gap-[10px] w-full max-w-full',
  }

  return (
    <div className={`${baseStyle} ${variants[variant]}`}>
      {/* Title */}
      {title && (
        <h2
          className={cn(
            'leading-[160%] text-black',
            variant === 'primary' && 'text-[24px] font-medium',
            variant === 'secondary' && 'text-[16px] font-medium truncate',
          )}
        >
          {title}
        </h2>
      )}

      {/* Subtitle */}
      {subtitle && (
        <p className='text-[14px] font-light leading-[160%] tracking-[-0.07px] text-gray-800'>
          {subtitle}
        </p>
      )}

      {/* Children */}
      {children && (
        <p className='flex-1 text-[14px] font-light leading-[160%] tracking-[-0.07px] text-gray-800'>
          {children}
        </p>
      )}
    </div>
  )
}
