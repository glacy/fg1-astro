import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import icon from 'astro-icon';
import AstroPWA from '@vite-pwa/astro';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import starlight from '@astrojs/starlight';

export default defineConfig({
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
  },
  integrations: [
    starlight({
      title: 'Mi encantador sitio de documentos',}),
    tailwind(),
    icon(),
    AstroPWA({
      registerType: 'autoUpdate',
      manifest: false,
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,ico,jpg,webp,woff2,json,pdf}'],
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
        navigateFallback: null,
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/images\.unsplash\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'unsplash-images',
              expiration: { maxEntries: 50, maxAgeSeconds: 30 * 24 * 60 * 60 },
            },
          },
        ],
      },
    }),
  ],
  output: 'static',
  site: 'https://fg1-astro.vercel.app',
  image: {
    domains: ['images.unsplash.com'],
  },
  vite: {
    define: {
      __BUILD_TIME__: JSON.stringify(new Date().toISOString().replace(/T.*/, '')),
      __BUILD_VERSION__: JSON.stringify('2.0.0'),
    },
    build: {
      outDir: 'dist'
    }
  }
});
