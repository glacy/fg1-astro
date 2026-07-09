import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import icon from 'astro-icon';

export default defineConfig({
  integrations: [
    react(),
    tailwind(),
    icon()
  ],
  output: 'static',
  site: 'https://fg1-astro.vercel.app',
  image: {
    domains: ['images.unsplash.com'],
  },
  vite: {
    build: {
      outDir: 'dist'
    }
  }
});
