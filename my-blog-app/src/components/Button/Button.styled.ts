import { cva } from 'class-variance-authority'

export const button = cva(
  // base: 모든 버튼 공통 스타일
  'inline-flex justify-center items-center gap-1 rounded-[25px] transition-colors duration-200 font-noto text-sm font-sans leading-[160%] tracking-[-0.07px] h-10 px-3 py-2',

  {
    variants: {
      // intent(=variant)별 스타일
      intent: {
        primary:
          'border border-primary text-primary bg-white hover:bg-primary/10 disabled:border-gray-300 disabled:text-gray-300 disabled:cursor-not-allowed disabled:opacity-60',
        secondary:
          'border border-gray-300 text-gray-300 bg-white hover:bg-gray-100 disabled:border-gray-300 disabled:text-gray-300 disabled:cursor-not-allowed disabled:opacity-60',
        flat: 'bg-white text-gray-300 hover:bg-gray-50 disabled:border-gray-300 disabled:text-gray-300 disabled:cursor-not-allowed disabled:opacity-60',
        tertiary:
          'border border-gray-300 bg-gray-100 text-gray-300 hover:bg-gray-200 disabled:border-gray-300 disabled:text-gray-300 disabled:cursor-not-allowed disabled:opacity-60',
        ghost:
          'bg-gray-100 text-gray-300 hover:bg-gray-200 disabled:border-gray-300 disabled:text-gray-300 disabled:cursor-not-allowed disabled:opacity-60',
        black:
          'bg-black text-white hover:bg-gray-900 disabled:border-gray-300 disabled:text-gray-300 disabled:cursor-not-allowed disabled:opacity-60',
        blackMuted:
          'bg-black text-gray-300 hover:bg-gray-900 disabled:border-gray-300 disabled:text-gray-300 disabled:cursor-not-allowed disabled:opacity-60',
        tag: 'inline-flex px-2 pt-[2px] pb-[4px] justify-center items-center gap-1 rounded-[2px] text-gray-300 text-[12px] font-normal leading-[160%]',
        tagFilled:
          'inline-flex px-2 pt-[2px] pb-[4px] justify-center items-center gap-1 rounded-[2px] bg-gray-100 text-gray-300 text-[12px] font-normal leading-[160%]',
      },

      // 크기별 스타일
      size: {
        sm: 'h-8 px-2 text-xs',
        md: 'h-10 px-3 text-sm',
        lg: 'h-12 px-4 text-base',
      },
    },

    // 기본값
    defaultVariants: {
      intent: 'primary',
      size: 'md',
    },
  },
)
