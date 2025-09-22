import { cva, type VariantProps } from 'class-variance-authority';

export const buttonVariants = cva(
  // 기본 btn-container 스타일을 그대로 유지
  'inline-flex h-10 px-3 py-2 justify-center items-center gap-1 flex-shrink-0 rounded-[25px] border transition-all duration-200 cursor-pointer',
  {
    variants: {
      intent: {
        primary: 'text-primary border-primary hover:text-white hover:bg-primary hover:border-primary',
        secondary: 'text-gray border-gray hover:text-gray hover:bg-gray-96',
        gray: 'text-gray border-gray hover:text-gray hover:bg-gray-96',
        danger: 'text-white bg-error border-error hover:bg-error/90',
      },
      size: {
        sm: 'h-8 px-2 text-sm',
        md: 'h-10 px-3 text-sm', // 기본 크기
        lg: 'h-12 px-4 text-base',
      },
      variant: {
        solid: '',
        outline: 'bg-transparent',
        ghost: 'bg-transparent border-transparent',
      },
      fullWidth: {
        true: 'w-full',
        false: '',
      },
    },
    compoundVariants: [
      { intent: 'gray', variant: 'outline', class: 'text-gray border-gray bg-transparent hover:bg-gray-96' },
      {
        intent: 'primary',
        variant: 'outline',
        class: 'text-primary border-primary bg-transparent hover:bg-primary/10',
      },
      { intent: 'danger', variant: 'outline', class: 'text-error border-error bg-transparent hover:bg-error/10' },
    ],
    defaultVariants: {
      intent: 'primary',
      size: 'md',
      variant: 'solid',
      fullWidth: false,
    },
  }
);

// 버튼 텍스트 스타일
export const buttonTextVariants = cva('text-sm font-normal leading-[160%] tracking-[-0.07px]');

// 버튼 아이콘 스타일
export const buttonIconVariants = cva('flex items-center justify-center');

export type ButtonVariantProps = VariantProps<typeof buttonVariants>;
