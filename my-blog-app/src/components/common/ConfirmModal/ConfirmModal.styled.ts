export const confirmButtonVariants: Record<'danger' | 'primary', string> = {
  danger: 'bg-negative hover:bg-[#e83535]', // hover 색상 임시 유지
  primary: 'bg-primary hover:bg-[#0066cc]',
}

export const modalContainer = 'fixed inset-0 flex items-center justify-center bg-black/40'

export const modalBox =
  'flex flex-col items-start gap-6 w-[326px] p-6 pb-4 rounded bg-white shadow-md'

export const titleStyle =
  'w-full text-black text-[14px] font-sans leading-[160%] tracking-[-0.07px] whitespace-pre-line'

export const descriptionStyle =
  'w-full text-gray-300 text-[12px] font-sans leading-[160%] whitespace-pre-line'

export const cancelButtonStyle =
  'flex-1 flex justify-center items-center gap-2 px-3 py-2 rounded-[2px] border border-gray-100 text-black text-[14px] leading-[160%] tracking-[-0.07px]' // ✅ #F5F5F5 → gray-100

export const confirmButtonBase =
  'flex-1 flex justify-center items-center gap-2 px-3 py-2 rounded-[2px] text-white text-[14px] leading-[160%] tracking-[-0.07px] transition-colors duration-150'
