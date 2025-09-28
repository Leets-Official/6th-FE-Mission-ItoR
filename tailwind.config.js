/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: "#00A1FF",
          gray: "#909090",
          lightGray: "#E6E6E6",
          borderGray: "#e0e0e0",
          bgGray: "#f0f0f0",
          black: "#111112",
        },
      },
      borderRadius: {
        full: "9999px",
        sm: "0.125rem",
        md: "0.375rem",
      },
      fontSize: {
        xs: "0.75rem",
        sm: "0.875rem",
        base: "1rem",
        lg: "1.125rem",
      },
      spacing: {
        3: "0.75rem", // py-3 px-4 같은 값 일관성
        4: "1rem",
        6: "1.5rem",
      },
    },
  },
  plugins: [],
};
