import ArrowRight from '@/assets/icons/ArrowRight.svg?react'

interface PaginationNextProps {
  disabled?: boolean
  onClick?: () => void
}

export default function PaginationNext({ disabled, onClick }: PaginationNextProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex justify-center items-center 
                  w-[30px] h-[30px] rounded-[2px] border border-[#D9D9D9] bg-white
                  ${disabled ? 'opacity-40 cursor-not-allowed' : 'hover:opacity-70'}`}
    >
      <ArrowRight className='w-[7px] h-[12px] text-black' />
    </button>
  )
}
