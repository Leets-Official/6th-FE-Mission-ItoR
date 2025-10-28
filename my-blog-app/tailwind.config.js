/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        smooch: ['"Smooch"', 'cursive'],
        sans: ['"Noto Sans KR"', 'sans-serif'],
      },
      colors: {
        primary: '#00A1FF', // 버튼 파란색
        gray: {
          100: '#E6E6E6', // 밝은 회색
          200: '#D9D9D9',
          300: '#909090', // 텍스트/테두리에 쓰는 중간 회색
          800: '#333333', // text-[#333] 대신 사용
        },
        black: '#000000',
        negative: '#FF3F3F',
        positive: '#15DC5E',
        'fake-white': '#F5F5F5', // 피그마의 var(--fake-white, #FFF)에 대응
      },
      width: {
        'check-icon': '17.6px',
        content: '688px', // 공통 콘텐츠 폭
      },
      maxWidth: {
        content: '688px', // 최대 폭 토큰
      },
      height: {
        'check-icon': '13.4px',
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
}
