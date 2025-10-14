import { tv } from 'tailwind-variants';

// 공통 프로필 관련 스타일
export const profileStyles = tv({
  slots: {
    profileSection: 'flex items-start gap-1.5',
    profileImageWrapper: 'flex aspect-square h-5 w-5 items-center gap-2.5 overflow-hidden rounded-full',
    profileImage: 'h-full w-full object-cover',
    userInfo: 'flex flex-col items-start justify-center',
    nickName: 'text-sm font-regular text-gray-20',
  },
});

// CommentItem 전용 스타일
export const commentItemStyles = tv({
  slots: {
    container: 'flex w-[688px] max-w-[688px] flex-col items-start',
    header: 'flex items-center self-stretch',
    headerContent: 'flex w-full flex-col items-start gap-10 px-4 py-3',
    headerLayout: 'flex items-center self-stretch gap-2.5',
    date: 'text-xs font-light text-gray-56',
    contentWrapper: 'flex flex-col items-start self-stretch pl-[26px]',
  },
});

// CommentInput 전용 스타일
export const commentInputStyles = tv({
  slots: {
    container: 'flex w-full max-w-content flex-col items-end justify-center gap-2.5 px-4 py-3',
    inputWrapper: 'flex flex-col items-center self-stretch rounded-md border border-gray-90 py-2',
    contentLayout: 'flex flex-col items-start gap-10 self-stretch px-4 py-3',
    buttonWrapper: 'flex flex-col items-end gap-2.5 self-stretch px-4 py-2',
  },
});
