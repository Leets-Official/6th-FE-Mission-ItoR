// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      "@icons": "/src/assets/icons",
      "@ui": "/src/components/ui",
      "@src": "/src",
    },
  },
  server: {
    port: 5173,
    // proxy 제거: API는 env 기반 절대경로로 직접 호출
  },
});
