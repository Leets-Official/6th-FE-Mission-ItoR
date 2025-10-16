import React from 'react'

type PaginationNumberProps = {
  number: number
  active?: boolean
  disabled?: boolean
  onClick?: () => void
}

export default function PaginationNumber({
  number,
  active = false,
  disabled = false,
  onClick,
}: PaginationNumberProps) {
  const borderColor = active ? 'border-primary' : 'border-gray-200'
  const bgColor = disabled ? 'bg-fake-white' : 'bg-white'
  const textColor = disabled
    ? 'text-[rgba(0,0,0,0.25)]'
    : active
      ? 'text-primary'
      : 'text-[rgba(0,0,0,0.85)]'
  const fontWeight = active ? 'font-medium' : 'font-normal'

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex flex-col items-center justify-center gap-[10px] rounded-[2px]
        px-[7px] py-[1px] min-w-[30px] h-[30px] border ${borderColor} ${bgColor}
        text-[14px] leading-[22px] ${textColor} ${fontWeight} font-['Roboto'] text-center
        ${disabled ? 'cursor-not-allowed opacity-70' : 'hover:border-primary'}`}
    >
      {number}
    </button>
  )
}
