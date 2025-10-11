export const MYPAGE_TEXTS = {
  BUTTONS: {
    EMAIL_SIGNUP: '이메일로 회원가입',
    KAKAO_SIGNUP: '카카오로 회원가입',
    SIGNUP_SUBMIT: '회원가입 완료',
    ADD_PROFILE_PHOTO: '프로필 사진 추가',
  },
  DIVIDER: {
    OR: '또는',
  },
  LABELS: {
    PROFILE_PHOTO: '프로필 사진',
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

export const SIGNUP_FORM_FIELDS = [
  { title: '이메일', type: 'email' as const, placeholder: '이메일', hintText: undefined },
  { title: '비밀번호', type: 'password' as const, placeholder: '비밀번호', hintText: undefined },
  { title: '비밀번호 확인', type: 'password' as const, placeholder: '비밀번호를 다시 입력하세요', hintText: undefined },
  { title: '이름', type: undefined, placeholder: '이름', hintText: undefined },
  { title: '생년월일', type: undefined, placeholder: 'YYYY-MM-DD', hintText: undefined },
  { title: '닉네임', type: undefined, placeholder: '닉네임', hintText: '20글자 이내' },
  { title: '한 줄 소개', type: undefined, placeholder: '한 줄 소개', hintText: undefined },
] as const;
