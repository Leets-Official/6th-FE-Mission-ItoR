interface PaginationNumberProps {
  number: number
  active?: boolean
  onClick?: () => void
}

export default function PaginationNumber({ number, active, onClick }: PaginationNumberProps) {
  return (
    <button
      onClick={onClick}
      className={`flex justify-center items-center 
                  w-[30px] h-[30px] rounded-[2px] border bg-white
                  ${
                    active
                      ? 'border-[#00A1FF] text-[#00A1FF]'
                      : 'border-[#D9D9D9] text-black hover:opacity-70'
                  }`}
    >
      {number}
    </button>
  )
}
