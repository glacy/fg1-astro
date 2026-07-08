import React from 'react';
import type { WeekData } from '../data/weeks';
import { StatusBadge } from './StatusBadge';
import { useTheme } from '@course-dashboard/shared';

interface WeekHeaderProps {
  week: WeekData;
  totalWeeks: number;
  maxCurrentWeek: number;
}

export const WeekHeader: React.FC<WeekHeaderProps> = ({ week, totalWeeks, maxCurrentWeek }) => {
  const { isDarkMode } = useTheme();
  const weekStatus = week.id < maxCurrentWeek ? 'completed' : week.id === maxCurrentWeek ? 'in-progress' : 'locked';

  return (
    <div className="mb-10 pt-4 flex flex-col md:flex-row gap-8 items-center md:items-start">
      <div className="w-full md:w-48 h-32 rounded-2xl overflow-hidden shadow-2xl relative group flex-shrink-0">
        <img
          src={week.image}
          alt={`Ilustración de la unidad ${week.id}: ${week.title}`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <div className="flex-1 text-center md:text-left">
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-3">
          <StatusBadge status={weekStatus} />
          <span className={`inline-block text-sm font-bold px-3 py-1 rounded-full ${isDarkMode ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-50 text-blue-600'}`}>
            Semana {week.id} de {totalWeeks}
          </span>
        </div>
        <h2 className={`text-2xl sm:text-3xl font-extrabold tracking-tight uppercase leading-tight mb-4 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
          {week.title}
        </h2>
        <div className={`w-24 h-1 rounded-full mb-4 ${isDarkMode ? 'bg-blue-600' : 'bg-blue-500'} mx-auto md:mx-0`} aria-hidden="true"></div>
      </div>
    </div>
  );
};
