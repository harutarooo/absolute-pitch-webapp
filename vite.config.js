
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  base: '/absolute-pitch-webapp/', // GitHub Pages用
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: '絶対音感トレーニング',
        short_name: '絶対音感',
        start_url: '.',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#1976d2',
        description: '絶対音感トレーニングWebアプリ',
        icons: [
          {
            src: '/absolute-pitch-webapp/icon-1024.png',
            sizes: '192x192 512x512 1024x1024',
            type: 'image/png',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,png,svg,ico,webmanifest}'],
      },
    }),
  ],
});
