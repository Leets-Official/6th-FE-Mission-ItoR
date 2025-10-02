import { cva } from 'class-variance-authority';

export const postCardVariants = cva(
  // 기본 스타일
  'flex px-4 sm:px-2 py-3 flex-col justify-center items-start gap-2 self-stretch',
  {
    variants: {
      hasImage: {
        true: 'max-w-post-card-mobile md:max-w-post-card',
        false: 'max-w-post-card-mobile-full md:max-w-content',
      },
    },
    defaultVariants: {
      hasImage: false,
    },
  }
);

export const postTitleVariants = cva(
  'self-stretch text-base sm:text-lg font-medium leading-[160%] tracking-[-0.08px] text-black overflow-hidden text-ellipsis whitespace-nowrap'
);

export const postContentVariants = cva(
  'h-12 sm:h-auto self-stretch overflow-hidden text-ellipsis text-sm font-light leading-[160%] tracking-[-0.07px] text-gray-dark line-clamp-2 sm:line-clamp-3'
);
