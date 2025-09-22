import { cva } from 'class-variance-authority';

// 모달 컨테이너 스타일
export const modalContainerVariants = cva(
  'flex w-[326px] flex-col items-start gap-6 rounded border-0 p-6 pb-4 bg-white shadow-modal'
);

// 모달 콘텐츠 컨테이너 스타일
export const modalContentVariants = cva('flex flex-col items-start gap-2 self-stretch rounded-xl', {
  variants: {
    padding: {
      default: 'p-1',
      none: 'p-0',
    },
  },
  defaultVariants: {
    padding: 'default',
  },
});

// 모달 버튼 컨테이너 스타일
export const modalButtonsVariants = cva('flex items-center gap-3 self-stretch');

// 모달 취소 버튼 스타일
export const modalCancelButtonVariants = cva(
  'flex px-3 py-2 justify-center items-center gap-2 flex-1 text-sm font-normal text-black text-right'
);

// 모달 삭제 버튼 스타일
export const modalDeleteButtonVariants = cva(
  'flex px-3 py-2 justify-center items-center gap-2 flex-1 rounded-sm text-sm font-normal border-0 cursor-pointer text-white bg-warning hover:bg-warning/90'
);
