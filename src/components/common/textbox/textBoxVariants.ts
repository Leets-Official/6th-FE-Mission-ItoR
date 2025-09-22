import { cva } from 'class-variance-authority';

export const textBoxVariants = cva(
  'inline-flex py-0.5 px-2 justify-center items-center gap-1 flex-shrink-0 rounded border transition-all duration-200',
  {
    variants: {
      color: {
        default: '',
        primary: 'text-primary',
        positive: 'text-positive',
        gray: 'text-gray',
      },
      borderColor: {
        default: 'border-transparent',
        primary: 'border-primary',
        positive: 'border-positive',
        gray: 'border-gray',
        transparent: 'border-transparent',
      },
    },
    defaultVariants: {
      color: 'default',
      borderColor: 'default',
    },
  }
);

export const textBoxTextVariants = cva('text-xs font-normal', {
  variants: {
    color: {
      default: '',
      primary: 'text-primary',
      positive: 'text-positive',
      gray: 'text-gray',
    },
  },
  defaultVariants: {
    color: 'default',
  },
});
