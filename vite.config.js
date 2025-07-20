import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/absolute-pitch-webapp/', // GitHub Pages用
  plugins: [react()],
});
