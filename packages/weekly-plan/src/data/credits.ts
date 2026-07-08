/**
 * Credits and Attributions Data
 * Lists all open-source projects and resources used in this application
 */

export interface CreditItem {
  name: string;
  license: string;
  url: string;
  description: string;
}

export interface CreditCategory {
  category: string;
  items: CreditItem[];
}

export const creditsData: CreditCategory[] = [
  {
    category: 'UI Framework',
    items: [
      {
        name: 'shadcn/ui',
        license: 'MIT',
        url: 'https://ui.shadcn.com/',
        description: 'Componentes de UI reutilizables construidos con Radix UI y Tailwind CSS',
      },
    ],
  },
  {
    category: 'Componentes UI',
    items: [
      {
        name: 'Radix UI',
        license: 'MIT',
        url: 'https://www.radix-ui.com/primitives/docs/overview/introduction',
        description: 'Componentes primitives accesibles (accordion, dialog, dropdown, tabs, tooltip, avatar, checkbox, popover, scroll-area, alert-dialog)',
      },
    ],
  },
  {
    category: 'Iconos',
    items: [
      {
        name: 'Lucide React',
        license: 'ISC',
        url: 'https://lucide.dev',
        description: 'Biblioteca de iconos',
      },
    ],
  },
  {
    category: 'Estilos y Utilidades',
    items: [
      {
        name: 'Tailwind CSS',
        license: 'MIT',
        url: 'https://tailwindcss.com',
        description: 'Framework de utilidades CSS',
      },
      {
        name: 'Motion (Framer Motion)',
        license: 'MIT',
        url: 'https://motion.dev',
        description: 'Biblioteca de animaciones',
      },
    ],
  },
  {
    category: 'Recursos',
    items: [
      {
        name: 'Unsplash',
        license: 'Unsplash License',
        url: 'https://unsplash.com/license',
        description: 'Imágenes',
      },
    ],
  },
  {
    category: 'Core',
    items: [
      {
        name: 'React',
        license: 'MIT',
        url: 'https://react.dev',
        description: 'Framework UI',
      },
      {
        name: 'Vite',
        license: 'MIT',
        url: 'https://vitejs.dev',
        description: 'Build tool',
      },
    ],
  },
];
