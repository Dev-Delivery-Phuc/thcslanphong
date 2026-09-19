import { fileURLToPath, URL } from 'node:url';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { apiPlugin } from './server/vite-api-plugin.js';

export default defineConfig(({ mode }) => {
  // Prefix '' => đọc được GEMINI_API_KEY (không có VITE_), nhưng chỉ dùng ở middleware server, không vào bundle.
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react(), apiPlugin(env)],
    resolve: {
      alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
    },
  };
});
