export const backdrop = `
  fixed inset-0 z-50 flex items-center justify-center
  bg-black/60 backdrop-blur-sm
`;

export const wrapper = `
  relative grid grid-cols-[1fr_1.1fr]
  w-[782px] h-[469px] box-border
  rounded-[9px] overflow-hidden overflow-x-hidden
  bg-brand-black text-white
`;

export const closeButton = `
  absolute top-4 right-4 text-white hover:text-brand-gray transition
`;

/* 왼쪽 (로고 섹션) */
export const leftSection = `
  flex flex-col justify-center items-center px-[60px] min-w-0
`;

/* 오른쪽 (로그인 섹션) — 핵심: min-w-0 추가 */
export const rightSection = `
  flex flex-col justify-center items-center px-[40px] min-w-0
`;

/* GITLOG 타이틀 */
export const title = `
  font-smooch text-[72px] leading-[88px] mb-2 text-white
`;

/* 서브텍스트 */
export const subtitle = `
  text-brand-gray text-sm
`;

/* 입력창 — 고정폭 대신 max-w + w-full */
export const inputGroup = `
  flex flex-col gap-2 w-full max-w-[340px] mb-2
`;

/* 이메일 로그인 버튼 */
export const loginButton = `
  w-full max-w-[340px] h-[45px] bg-brand-blue text-white font-medium rounded-md
  hover:opacity-90 transition
`;

/* SNS 구분선 */
export const snsDivider = `
  flex items-center w-full max-w-[300px] mt-2 mb-2 text-center text-brand-gray text-sm
  before:content-[''] before:flex-1 before:h-[1px] before:bg-brand-midGray
  after:content-[''] after:flex-1 after:h-[1px] after:bg-brand-midGray
  before:mr-3 after:ml-3
`;

/* 카카오 로그인 버튼 */
export const kakaoButton = `
  w-full max-w-[340px] h-[45px] bg-brand-yellow text-brand-black font-medium rounded-md
  flex items-center justify-center gap-2 hover:opacity-90 transition
`;

/* 하단 회원가입 */
export const footer = `
  text-sm text-brand-gray mt-4 cursor-pointer hover:text-white
`;
