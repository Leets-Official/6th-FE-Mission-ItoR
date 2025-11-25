// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3B82F6',
          dark: '#2563EB',
        },
        success: '#15DC5E',
        danger: '#FF3F3F',
        info: '#00A1FF',
        kakao: {
          DEFAULT: '#FEE500',
          dark: '#FDDD00',
        },
        gray: {
          900: '#333333',
          800: '#4B4B4B',
          700: '#606060',
          600: '#909090',
          500: '#B0B0B0',
          400: '#C8C8C8',
          300: '#E6E6E6',
          200: '#F5F5F5',
          100: '#FAFAFA',
        },
        black: '#000000',
        white: '#FFFFFF',
      },
      fontSize: {
        xs: "12px",
        sm: "14px",
        base: "16px",
        lg: "20px",
        xl: "24px",
        "2xl": "32px",
      },
    },
  },
  plugins: [],
};
