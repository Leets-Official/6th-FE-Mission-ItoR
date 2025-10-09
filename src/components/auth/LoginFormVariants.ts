import { tv } from 'tailwind-variants';

// 공통 베이스 클래스
const sectionBase = 'flex min-w-login-section-min max-w-login-form-max px-4 py-1 flex-col self-stretch';
const fieldBase =
  'flex-1 h-full px-0 py-0 border-0 outline-0 bg-transparent text-sm font-light leading-[160%] tracking-[-0.07px]';

// 로그인 폼 컨테이너 variants
export const loginFormVariants = tv({
  base: 'flex min-w-login-form-min-wide px-login-form-px py-0 flex-col items-center gap-login-form-gap flex-1',
});

// 로그인 섹션 컨테이너 variants (인풋, 버튼 등을 감싸는 공통 컨테이너)
export const loginSectionContainerVariants = tv({
  base: sectionBase,
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
export const snsDividerContainerVariants = tv({
  base: 'flex w-sns-divider min-h-sns-divider justify-center items-center gap-0.5',
});

// SNS 구분선 variants
export const snsDividerLineVariants = tv({
  base: 'w-sns-divider-line h-px bg-gray-20',
});

// SNS 구분선 텍스트 variants
export const snsDividerTextVariants = tv({
  base: 'text-gray-56 font-regular text-xs',
});

// 인풋 컨테이너 variants
export const inputContainerVariants = tv({
  base: 'flex h-login-input px-4 py-3 items-center gap-2.5 self-stretch w-full rounded border bg-white',
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
export const inputFieldVariants = tv({
  base: `${baseFieldStyle} placeholder:text-gray-56`,
});

// 버튼 필드 variants (button 전용)
export const buttonFieldVariants = tv({
  base: `${baseFieldStyle} cursor-pointer text-left text-gray-56 hover:text-gray-dark transition-colors`,
});

// 로그인 버튼 variants
export const loginButtonVariants = tv({
  base: 'flex h-login-button px-login-button-px justify-center items-center self-stretch w-full rounded-md font-normal text-sm leading-[160%] tracking-[-0.07px] cursor-pointer transition-colors',
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
export const snsButtonContentVariants = tv({
  base: 'flex px-[72px] justify-center items-center gap-2 flex-1',
});

// SNS 버튼 텍스트 variants
export const snsButtonTextVariants = tv({
  base: 'font-semibold leading-[150%]',
  variants: {
    provider: {
      kakao: 'text-character-title-85 text-[15px]',
    },
  },
  defaultVariants: {
    provider: 'kakao',
  },
});

// 회원가입 버튼 컨테이너 variants
export const signupButtonVariants = tv({
  base: 'flex px-2 py-[2px] pb-1 justify-center items-center gap-1',
});

// 회원가입 텍스트 variants
export const signupTextVariants = tv({
  base: 'text-gray-56 text-sm font-light leading-[160%] tracking-[-0.07px]',
});
