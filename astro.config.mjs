import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [
    react(),
    tailwind()
  ],
  output: 'static',
  site: 'https://fg1-astro.vercel.app',
  vite: {
    build: {
      outDir: 'dist'
    }
  }
});
