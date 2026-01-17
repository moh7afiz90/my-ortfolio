import { defineConfig } from 'vite';

export default defineConfig({
  root: 'dist',
  publicDir: false,
  server: {
    port: 3000,
    open: true,
  },
});
