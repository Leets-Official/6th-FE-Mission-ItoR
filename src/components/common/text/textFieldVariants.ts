import { cva, type VariantProps } from 'class-variance-authority';

export const textFieldVariants = cva(
  // 기본 TextField 컨테이너 스타일 (656px 고정)
  'flex w-[656px] px-4 py-3 items-center gap-2.5 rounded border transition-colors',
  {
    variants: {
      variant: {
        default: 'border-gray-90', // Gray90 토큰
        dark: 'border-gray-33', // Gray33 토큰
        light: 'border-gray-90', // Gray90 토큰
      },
      backgroundColor: {
        transparent: 'bg-transparent',
        filled: 'bg-gray-90', // Gray90 토큰
      },
      disabled: {
        true: 'opacity-50 cursor-not-allowed',
        false: '',
      },
      fullWidth: {
        true: 'w-full',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      backgroundColor: 'transparent',
      disabled: false,
      fullWidth: false,
    },
  }
);

export const inputVariants = cva(
  // 기본 input 스타일
  'w-full border-0 outline-none bg-transparent',
  {
    variants: {
      textColor: {
        black: 'text-black placeholder:text-black', // Black 토큰
        gray56: 'text-gray-56 placeholder:text-gray-56', // Gray56 토큰
        gray78: 'text-gray-78 placeholder:text-gray-78', // Gray78 토큰
      },
      fontSize: {
        light: 'text-sm font-light leading-[160%] tracking-[-0.07px]', // 14px light 토큰
        medium: 'text-2xl font-medium leading-[160%]', // 24px medium 토큰
      },
    },
    defaultVariants: {
      textColor: 'gray56', // 기본: Gray56 토큰
      fontSize: 'light', // 기본: 14px light 토큰
    },
  }
);

export type TextFieldVariantProps = VariantProps<typeof textFieldVariants>;
export type InputVariantProps = VariantProps<typeof inputVariants>;
