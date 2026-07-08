import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTheme } from '@course-dashboard/shared';

interface WeekNavigationProps {
  currentWeek: number;
  totalWeeks: number;
  maxCurrentWeek: number;
  onNavigate: (week: number) => void;
}

export const WeekNavigation: React.FC<WeekNavigationProps> = ({ currentWeek, totalWeeks, maxCurrentWeek, onNavigate }) => {
  const { isDarkMode } = useTheme();

  return (
    <nav className="mt-12 flex justify-between items-center gap-4" aria-label="Navegación entre semanas">
      <button
        onClick={() => onNavigate(Math.max(1, currentWeek - 1))}
        disabled={currentWeek === 1}
        aria-label="Ir a la semana anterior"
        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${currentWeek === 1
          ? 'opacity-20 cursor-not-allowed'
          : isDarkMode ? 'hover:bg-white/5 text-slate-300' : 'hover:bg-gray-100 text-slate-700'
          }`}
      >
        <ChevronLeft className="w-4 h-4" aria-hidden="true" />
        Semana anterior
      </button>

      <div
        className={`hidden sm:flex items-center gap-1 text-[10px] font-bold tracking-widest uppercase ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}
        aria-label={`Semana ${currentWeek} de ${totalWeeks}`}
      >
        <span aria-hidden="true">{String(currentWeek).padStart(2, '0')}</span>
        <div className={`w-8 h-px ${isDarkMode ? 'bg-slate-800' : 'bg-gray-200'}`} aria-hidden="true"></div>
        <span aria-hidden="true">{totalWeeks}</span>
      </div>

      <button
        onClick={() => onNavigate(Math.min(totalWeeks, currentWeek + 1))}
        disabled={currentWeek >= maxCurrentWeek}
        aria-label="Ir a la siguiente semana"
        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${currentWeek >= maxCurrentWeek
          ? 'opacity-20 cursor-not-allowed'
          : 'text-blue-600 hover:text-blue-500'
          }`}
      >
        Siguiente semana
        <ChevronRight className="w-4 h-4" aria-hidden="true" />
      </button>
    </nav>
  );
};
