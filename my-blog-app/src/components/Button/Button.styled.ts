export const base =
  'inline-flex justify-center items-center gap-1 rounded-[25px] transition-colors duration-200 font-noto text-sm font-sans leading-[160%] tracking-[-0.07px] h-10 px-3 py-2'

export const commonDisabled =
  'disabled:border-gray-300 disabled:text-gray-300 disabled:cursor-not-allowed disabled:opacity-60'

export const variants = {
  primary: `border border-primary text-primary bg-white hover:bg-primary/10 ${commonDisabled}`,
  secondary: `border border-gray-300 text-gray-300 bg-white hover:bg-gray-100 ${commonDisabled}`,
  flat: `bg-white text-gray-300 hover:bg-gray-50 ${commonDisabled}`,
  tertiary: `border border-gray-300 bg-gray-100 text-gray-300 hover:bg-gray-200 ${commonDisabled}`,
  ghost: `bg-gray-100 text-gray-300 hover:bg-gray-200 ${commonDisabled}`,
  black: `bg-black text-white hover:bg-gray-900 ${commonDisabled}`,
  blackMuted: `bg-black text-gray-300 hover:bg-gray-900 ${commonDisabled}`,
  tag: 'inline-flex px-2 pt-[2px] pb-[4px] justify-center items-center gap-1 rounded-[2px] text-gray-300 text-[12px] font-normal leading-[160%]',
  tagFilled:
    'inline-flex px-2 pt-[2px] pb-[4px] justify-center items-center gap-1 rounded-[2px] bg-gray-100 text-gray-300 text-[12px] font-normal leading-[160%]',
}
