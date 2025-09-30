import { cva } from 'class-variance-authority';

// 공통 베이스 클래스
const sectionBase = 'flex min-w-login-section-min max-w-login-form-max px-4 py-1 flex-col self-stretch';
const fieldBase = 'flex-1 h-full px-0 py-0 border-0 outline-0 bg-transparent text-sm font-light leading-[160%] tracking-[-0.07px]';

// 로그인 폼 컨테이너 variants
export const loginFormVariants = cva('flex min-w-login-form-min-wide px-login-form-px py-0 flex-col items-center gap-login-form-gap flex-1');

// 로그인 섹션 컨테이너 variants (인풋, 버튼 등을 감싸는 공통 컨테이너)
export const loginSectionContainerVariants = cva(sectionBase, {
  variants: {
    align: {
      start: 'items-start',
      center: 'items-center',
    },
    gap: {
      small: 'gap-2', // 8px - 인풋 필드용
      medium: 'gap-2.5', // 10px - 버튼용
    },
  },
  defaultVariants: {
    align: 'center',
    gap: 'medium',
  },
});

// SNS 구분선 컨테이너 variants
export const snsDividerContainerVariants = cva('flex w-sns-divider min-h-sns-divider justify-center items-center gap-0.5');

// SNS 구분선 variants
export const snsDividerLineVariants = cva('w-sns-divider-line h-px bg-gray-20');

// SNS 구분선 텍스트 variants
export const snsDividerTextVariants = cva(
  'text-gray-56 font-regular text-xs'
);

// 사용 중단: 로그인 인풋 래퍼 (loginSectionContainerVariants로 대체)
// export const loginInputsWrapperVariants = cva('flex min-w-login-form-min max-w-login-form-max px-login-inputs-px py-login-inputs-py flex-col items-start gap-login-inputs-gap self-stretch');

// 인풋 컨테이너 variants
export const inputContainerVariants = cva('flex h-login-input px-4 py-3 items-center gap-2.5 self-stretch w-full rounded border bg-white', {
  variants: {
    variant: {
      default: 'border-gray-90',
      error: 'border-red-500',
      focused: 'border-primary',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

// 인풋/버튼 공통 기본 스타일
const baseFieldStyle = fieldBase;

// 인풋 필드 variants (input 전용)
export const inputFieldVariants = cva(
  `${baseFieldStyle} placeholder:text-gray-56`
);

// 버튼 필드 variants (button 전용)  
export const buttonFieldVariants = cva(`${baseFieldStyle} cursor-pointer text-left text-gray-56 hover:text-gray-dark transition-colors`);

// 로그인 버튼 variants
export const loginButtonVariants = cva('flex h-login-button px-login-button-px justify-center items-center self-stretch w-full rounded-md font-medium text-sm cursor-pointer transition-colors', {
  variants: {
    variant: {
      default: 'bg-primary text-white hover:bg-primary-hover active:bg-primary-active',
      disabled: 'bg-gray-400 text-white cursor-not-allowed',
      kakao: 'bg-brand-kakao hover:bg-brand-kakao-hover',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

// SNS 버튼 내부 컨텐츠 wrapper variants
export const snsButtonContentVariants = cva('flex px-[72px] justify-center items-center gap-2 flex-1');

// SNS 버튼 텍스트 variants
export const snsButtonTextVariants = cva(
  'font-semi-bold leading-[150%]',
  {
    variants: {
      provider: {
        kakao: 'text-character-title-85 text-sm-plus',
      },
    },
    defaultVariants: {
      provider: 'kakao',
    },
  }
);

// 회원가입 버튼 컨테이너 variants
export const signupButtonVariants = cva(
  'flex px-2 py-[2px] pb-1 justify-center items-center gap-1'
);

// 회원가입 텍스트 variants
export const signupTextVariants = cva(
  'text-gray-56 text-sm font-light leading-[160%] tracking-[-0.07px]'
);