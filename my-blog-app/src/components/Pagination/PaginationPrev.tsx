import ArrowLeft from '@/assets/icons/ArrowLeft.svg?react'

interface PaginationPrevProps {
  disabled?: boolean
  onClick?: () => void
}

export default function PaginationPrev({ disabled, onClick }: PaginationPrevProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex justify-center items-center 
                  w-[30px] h-[30px] rounded-[2px] border border-[#D9D9D9] bg-white
                  ${disabled ? 'opacity-40 cursor-not-allowed' : 'hover:opacity-70'}`}
    >
      <ArrowLeft className='w-[7px] h-[12px] text-black' />
    </button>
  )
}
