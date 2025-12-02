import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import svgr from 'vite-plugin-svgr';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [svgr(), react(), tailwindcss()],

    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@src': path.resolve(__dirname, './src'),
        '@api': path.resolve(__dirname, './src/api'),
        '@hooks': path.resolve(__dirname, './src/hooks'),
        '@components': path.resolve(__dirname, './src/components'),
        '@assets': path.resolve(__dirname, './src/assets'),
      },
    },

    server: {
      port: 3000,
      proxy: {
        '/auth': {
          target: env.VITE_API_URL,
          changeOrigin: true,
          secure: true,
        },
        '/posts': {
          target: env.VITE_API_URL,
          changeOrigin: true,
          secure: true,
        },
        '/users': {
          target: env.VITE_API_URL,
          changeOrigin: true,
          secure: true,
        },
        '/images': {
          target: env.VITE_API_URL,
          changeOrigin: true,
          secure: true,
        },
        '/comments': {
          target: env.VITE_API_URL,
          changeOrigin: true,
          secure: true,
        },
      },
    },
  };
});
