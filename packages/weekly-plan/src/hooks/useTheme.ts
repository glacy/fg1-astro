import { useMemo } from 'react';

export const useTheme = (isDarkMode: boolean) => {
  return useMemo(() => ({
    bg: isDarkMode ? 'bg-[#0b0f19]' : 'bg-gray-50',
    text: isDarkMode ? 'text-slate-200' : 'text-slate-800',
    card: {
      container: isDarkMode ? 'bg-[#161d2a] border-white/5' : 'bg-white border-gray-200',
      text: isDarkMode ? 'text-white' : 'text-slate-800'
    },
    section: {
      container: isDarkMode
        ? 'bg-[#161d2a] border-white/5 shadow-xl shadow-black/10'
        : 'bg-white border-gray-100 shadow-md shadow-gray-200/50'
    },
    button: {
      default: isDarkMode
        ? 'hover:bg-white/5 text-slate-300 hover:text-white'
        : 'hover:bg-gray-100 text-slate-700 hover:text-slate-900'
    }
  }), [isDarkMode]);
};
