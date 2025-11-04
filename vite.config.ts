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
    proxy: {
      "/api": {
        target: "https://blog.leets.land",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});