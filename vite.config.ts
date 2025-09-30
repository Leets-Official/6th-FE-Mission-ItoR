import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    svgr(), // 옵션 없이 사용, 최신 버전에서는 exportAsDefault 불필요
  ],
});
