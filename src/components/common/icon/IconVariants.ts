import { cva } from 'class-variance-authority';

export const iconVariants = cva(['flex justify-center items-center aspect-square'], {
  variants: {
    size: {
      sm: 'w-3.5 h-3.5',
      md: 'w-6 h-6',
      lg: 'w-10 h-10',
    },
    clickable: {
      true: 'cursor-pointer hover:bg-gray-90 hover:rounded-md transition-all duration-200',
      false: '',
    },
    padding: {
      true: 'p-2',
      false: '',
    },
  },
  defaultVariants: {
    size: 'md',
    clickable: false,
    padding: false,
  },
  compoundVariants: [
    {
      size: 'lg',
      padding: true,
      class: 'flex-shrink-0',
    },
  ],
});

export const iconInnerVariants = cva(['fill-current'], {
  variants: {
    size: {
      sm: 'w-3.5 h-3.5',
      md: 'w-6 h-6',
      lg: 'w-6 h-6',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});
