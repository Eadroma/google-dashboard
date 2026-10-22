import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@app':        resolve(__dirname, 'src/app'),
      '@features':   resolve(__dirname, 'src/features'),
      '@components': resolve(__dirname, 'src/components'),
      '@hooks':      resolve(__dirname, 'src/hooks'),
      '@stores':     resolve(__dirname, 'src/stores'),
      '@app-types':  resolve(__dirname, 'src/types'),
      '@utils':      resolve(__dirname, 'src/utils'),
      '@widgets':    resolve(__dirname, 'src/widgets'),
      '@locales':    resolve(__dirname, 'src/locales'),
    },
  },
  base: './',
  build: {
    rollupOptions: {
      input: {
        newtab: resolve(__dirname, 'index.html'),
      },
    },
    outDir: 'dist',
  },
});
