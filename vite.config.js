import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  build: {
    target: 'es2020',
    sourcemap: false,
  },
  server: {
    port: 5173,
    open: !process.env.DOCKER,
  },
});
