import type { ColorTheme } from './types';

export const themes: Record<string, ColorTheme> = {
  light: {
    background: 'white',
    grid: '#E5E7EB',
    axis: '#374151',
    text: '#111827',
    primary: '#EF4444',
    secondary: '#3B82F6',
    guide: '#9CA3AF',
    tooltip: 'rgba(134, 175, 187, 0.44)',
    tooltipText: 'rgba(8, 8, 8, 0.99)',
    warning: '#EF4444',
  },
  dark: {
    background: '#1F2937',
    grid: '#374151',
    axis: '#E5E7EB',
    text: '#F9FAFB',
    primary: '#F87171',
    secondary: '#60A5FA',
    guide: '#6B7280',
    tooltip: 'rgba(255, 255, 255, 0.9)',
    tooltipText: '#111827',
    warning: '#F87171',
  },
};

export function getTheme(theme: 'light' | 'dark' | 'auto' = 'auto'): ColorTheme {
  if (theme === 'auto') {
    if (typeof window !== 'undefined') {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      return themes[isDark ? 'dark' : 'light'];
    }
    return themes.light;
  }
  return themes[theme];
}

export function mergeThemes(base: ColorTheme, custom: Partial<ColorTheme>): ColorTheme {
  return { ...base, ...custom };
}
