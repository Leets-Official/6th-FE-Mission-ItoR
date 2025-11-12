import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      "@src": "/src",
      "@ui": "/src/components/ui",
      "@icons": "/src/assets/icons",
    },
  },
  server: {
    port: 5173,
    proxy: {
      "/api": {
        target: "https://blog.leets.land",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
