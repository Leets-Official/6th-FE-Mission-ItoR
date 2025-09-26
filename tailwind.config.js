/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      // 폰트 패밀리
      fontFamily: {
        sans: ['Noto Sans KR', 'sans-serif'],
      },
      // 색상 토큰
      colors: {
        // 배경색
        background: '#ffffff',

        // 텍스트 색상
        'text-primary': '#00a1ff',
        'text-secondary': '#909090',
        'character-title-85': 'rgba(0, 0, 0, 0.85)',
        'character-disabled-25': 'rgba(0, 0, 0, 0.25)',

        // 주요 색상
        primary: {
          DEFAULT: '#00a1ff',
          hover: '#0088e6',
          active: '#0070cc',
        },

        // 중성 색상
        white: '#ffffff',
        'gray-96': '#F5F5F5', // Gray-96 (사이드바 배경)
        'gray-90': '#E6E6E6', // Gray-90 (테두리, 기존 gray-light와 동일)
        'gray-light': '#e6e6e6', // 기존 호환성 유지
        'gray-78': '#C8C8C8', // Gray-78
        'gray-56': '#909090', // Gray-56
        'gray-33': '#555555', // Gray-33
        'gray-20': '#333333', // Gray-20
        gray: '#909090',
        'gray-dark': '#666666',
        black: '#000000',
        dark: '#111112',

        // 상태 색상
        positive: '#15dc5e',
        warning: '#ff3f3f',
        error: '#ef4444',
        disabled: 'rgba(144, 144, 144, 0.5)',
      },

      // 폰트 가중치 토큰
      fontWeight: {
        thin: '100',
        light: '300',
        regular: '400',
        medium: '500',
        'semi-bold': '600',
        bold: '700',
        'extra-bold': '800',
      },

      // 간격 토큰
      spacing: {
        0.5: '2px',
        1: '4px',
        1.5: '6px',
        2: '8px',
        2.5: '10px',
        3: '12px',
        3.5: '14px',
        4: '16px',
        5: '20px',
        6: '24px',
        8: '32px',
        10: '40px',
        12: '48px',
        16: '64px',
        20: '80px',
        24: '96px',
        // 페이지 헤더 패딩
        'page-header': '16px 12px 16px 12px', // px-4 py-4 pl-3
      },

      // 최대 너비 토큰
      maxWidth: {
        content: '688px', // 컨텐츠 최대 너비
        sidebar: '240px', // 사이드바 너비
        'page-header': '1366px',
        modal: '326px',
      },

      // 보더 반지름 토큰
      borderRadius: {
        sm: '2px',
        md: '4px',
        lg: '8px',
        xl: '12px',
        '2xl': '16px',
        '3xl': '24px',
        full: '9999px',
      },

      // 그림자 토큰
      boxShadow: {
        sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        md: '0 2px 4px 0 rgba(0, 0, 0, 0.1)',
        lg: '0 4px 8px 0 rgba(0, 0, 0, 0.1)',
        xl: '0 8px 16px 0 rgba(0, 0, 0, 0.1)',
        modal: '0 2px 8px 0 rgba(0, 0, 0, 0.1)',
        'page-header': '0 4px 4px 0 rgba(0, 0, 0, 0.01)',
      },

      // 폰트 크기 토큰
      fontSize: {
        xs: ['12px', { lineHeight: '160%', letterSpacing: '-0.06px' }],
        sm: ['14px', { lineHeight: '160%', letterSpacing: '-0.07px' }],
        base: ['16px', { lineHeight: '160%', letterSpacing: '-0.08px' }],
        lg: ['18px', { lineHeight: '160%', letterSpacing: '-0.09px' }],
        xl: ['20px', { lineHeight: '160%', letterSpacing: '-0.1px' }],
        '2xl': ['24px', { lineHeight: '160%', letterSpacing: '-0.12px' }],
        '3xl': ['30px', { lineHeight: '160%', letterSpacing: '-0.15px' }],
      },

      // 레이아웃 토큰
      gap: {
        'center-layout': '8px',
        'button-group': '4px',
      },

      // 아이콘 사이즈 토큰
      iconSize: {
        sm: '14px', // 작은 아이콘 (TextBox 등)
        md: '20px', // 중간 아이콘 (일반적인 버튼 아이콘)
        lg: '40px', // 큰 아이콘 (주요 액션 아이콘)
      },

      // 아이콘 상태 토큰
      iconState: {
        hover: {
          background: '#E6E6E6', // Gray90
          borderRadius: '4px',
        },
      },
    },
  },
  plugins: [],
};
