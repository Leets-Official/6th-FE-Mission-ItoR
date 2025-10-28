import { cn } from '@/utils/cn';

const baseFlexCenterStyle = 'flex justify-center items-center self-stretch';

// 로고 영역 최상위 래퍼
export const logoWrapperStyle =
  'flex min-w-login-form-min-wide px-8 flex-col items-center gap-0.5 flex-1 max-[813px]:max-w-login-form-min';

// 로고 컨테이너
export const logoContainerStyle = cn(
  baseFlexCenterStyle,
  'h-logo-container min-w-logo-container-min max-w-logo-container px-login-logo-px'
);

// 텍스트 박스 컨테이너
export const textboxContainerStyle = cn(
  baseFlexCenterStyle,
  'h-login-textbox-container min-w-login-textbox-container-min max-w-login-textbox-container',
  'px-4 py-3 gap-2.5'
);

// 텍스트 스타일
export const textboxTextStyle = 'flex-1 text-center text-gray-56 text-sm font-light';
