export const COURSE_CONFIG = {
  name: 'Física General I',
  institution: 'Tecnológico de Costa Rica',
  semester: 'II semestre 2026',
  totalWeeks: 16,
  maxCurrentWeek: 15,
  contactEmail: 'glacy@tec.ac.cr',
  githubRepository: 'https://github.com/glacy/fg1-astro',
};

export const BUILD_INFO = {
  date: 'dev',
  version: '0.0.0',
};

export const UI_CONFIG = {
  animations: {
    transition: 0.3,
    sectionEntrance: 0.4,
    sectionDelay: 0.1,
  },
  breakpoints: {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
  },
};

export const THEME_CONFIG = {
  defaultDarkMode: true,
  colors: {
    dark: {
      bg: '#0b0f19',
      surface: '#161d2a',
      border: 'white/5',
      text: {
        primary: 'slate-200',
        secondary: 'slate-400',
        tertiary: 'slate-600',
      },
    },
    light: {
      bg: 'gray-50',
      surface: 'white',
      border: 'gray-200',
      text: {
        primary: 'slate-800',
        secondary: 'slate-600',
        tertiary: 'slate-500',
      },
    },
  },
};