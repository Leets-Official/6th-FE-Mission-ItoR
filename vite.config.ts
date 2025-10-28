

import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import path from 'path';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    svgr(),
    NodeGlobalsPolyfillPlugin(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), 
    },
  },
  esbuild:{
    define:{
      this: "window",
    },
  },
  server: {
    port: 5173,
    proxy: {
      "/auth": {
        target: "https://blog.leets.land", // 백엔드 주소
        changeOrigin: true,
        secure: true,
      },
    },
  },
});
