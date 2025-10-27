// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // 🎨 Figma & 코드 기반 사용자 정의 팔레트
        gray: {
          50: "#F5F5F5",
          100: "#B0B0B0",
          200: "#909090",
          300: "#606060",
          800: "#333333",
        },
        blue: {
          400: "#00A1FF",
          500: "#3B82F6",
          600: "#2563EB",
        },
        red: {
          400: "#FF3F3F",
        },
        green: {
          400: "#15DC5E",
        },
        yellow: {
          400: "#FEE500",
          500: "#FDDD00",
        },
        black: "#000000",
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
