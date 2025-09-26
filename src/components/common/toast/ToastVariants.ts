import { cva, type VariantProps } from 'class-variance-authority';

export const toastVariants = cva('toast-container backdrop-blur-sm bg-white/90', {
  variants: {
    type: {
      positive: 'border-positive text-positive',
      warning: 'border-warning text-warning',
    },
  },
  defaultVariants: {
    type: 'positive',
  },
});

export const toastIconVariants = cva('btn-icon', {
  variants: {
    type: {
      positive: 'text-positive',
      warning: 'text-warning',
    },
  },
  defaultVariants: {
    type: 'positive',
  },
});

export const toastTextVariants = cva('btn-text', {
  variants: {
    type: {
      positive: 'text-positive',
      warning: 'text-warning',
    },
  },
  defaultVariants: {
    type: 'positive',
  },
});

export type ToastVariants = VariantProps<typeof toastVariants>;
