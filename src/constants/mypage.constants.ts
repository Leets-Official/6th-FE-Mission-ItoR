export const MYPAGE_TEXTS = {
  BUTTONS: {
    EMAIL_SIGNUP: '이메일로 회원가입',
    KAKAO_SIGNUP: '카카오로 회원가입',
  },
  DIVIDER: {
    OR: '또는',
  },
} as const;

export const MYPAGE_HEADER_CONTENT = {
  '/mypage': {
    title: '회원가입',
    subtitle: undefined,
  },
  '/mypage/signup': {
    title: '회원가입',
    subtitle: '가입을 위해 회원님의 정보를 입력해주세요.',
  },
} as const;
