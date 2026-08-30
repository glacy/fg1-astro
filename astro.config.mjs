import sitemap from '@astrojs/sitemap';
import starlight from '@astrojs/starlight';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import AstroPWA from '@vite-pwa/astro'; 
import icon from 'astro-icon';
import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { offlineBanner } from './src/integrations/offline-banner';
import starlightFullViewMode from 'starlight-fullview-mode'

export default defineConfig({
  prefetch: true,
  markdown: {
    processor: unified({
      remarkPlugins: [
        [remarkMath, { singleDollarTextMath: true }]
      ],
      rehypePlugins: [
        [rehypeKatex, { strict: false, throwOnError: false }]
      ],
    }),
  },
  site: 'https://fg1-astro.vercel.app',
  base: '/',
  integrations: [
    sitemap(),
    starlight({
      plugins: [
        starlightFullViewMode({leftSidebarEnabled: true, rightSidebarEnabled: true}), 
      ],
      title: 'Documentos FG1 - II semestre 2026',
      description: 'Documentación para el curso de Física General I - II semestre 2026',
      disable404Route: true,
      customCss: ['src/styles/katex-import.css', 'src/styles/starlight-overrides.css'],
      lastUpdated: true,
      locales: {
        root: {
          label: 'Documentación',
          lang: 'es',
          dir: 'ltr',
        },
      },
      defaultLocale: 'root',
      logo: {
        light: './src/assets/site_logo.svg',
        dark: './src/assets/site_logo_dark.svg',
        replacesTitle: true,
      },
      sidebar: [
        {
          label: 'Semana 1',
          collapsed: true,
          items: [{ autogenerate: { "directory": "semana01" } }]
        },
        {
          label: 'Semana 2',
          collapsed: true,
          items: [{ autogenerate: { "directory": "semana02" } }]
        },
        {
        label: 'Semana 3',
        collapsed: true,
        items: [{ autogenerate: { "directory": "semana03" } }]
      },
      {
        label: 'Semana 4',
        collapsed: true,
        items: [{ autogenerate: { "directory": "semana04" } }]
      },
      {
        label: 'Semana 5',
        badge: 'Nuevo',
        collapsed: true,
        items: [{ autogenerate: { "directory": "semana05" } }]
      },
      ],
    }),
    mdx(),
    tailwind({ applyBaseStyles: false }),
    icon(),
    AstroPWA({
      registerType: 'autoUpdate',
      strategies: 'injectManifest',
      srcDir: 'src',
      filename: 'sw.ts',
      manifest: false,
      workbox: {
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
      },
    }),
    offlineBanner(),
  ],
  output: 'static',
  image: {
    domains: ['images.unsplash.com'],
    responsiveStyles: true,
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
