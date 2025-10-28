import React from 'react'
import { twMerge } from 'tailwind-merge'

type ClearIconProps = {
  variant?: 'default' | 'modal'
  size?: number
  className?: string
}

export function ClearIcon({ variant = 'default', size = 14, className = '' }: ClearIconProps) {
  const isModal = variant === 'modal'

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={size}
      height={size}
      viewBox='0 0 14 14'
      fill='none'
      className={twMerge('shrink-0', className)}
    >
      <path
        d={
          isModal
            ? 'M14 1.91L12.59 0.5L7 6.09L1.41 0.5L0 1.91L5.59 7.5L0 13.09L1.41 14.5L7 8.91L12.59 14.5L14 13.09L8.41 7.5L14 1.91Z'
            : 'M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z'
        }
        className={isModal ? 'fill-fake-white' : 'fill-gray-800'}
      />
    </svg>
  )
}
