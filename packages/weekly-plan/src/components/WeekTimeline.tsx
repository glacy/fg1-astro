import React from 'react';
import { Calendar, ChevronDown, X } from 'lucide-react';
import { WeekItem } from './WeekItem';
import { motion } from 'motion/react';
import { useTheme } from '@course-dashboard/shared';

interface WeekTimelineProps {
  currentWeek: number;
  totalWeeks: number;
  maxCurrentWeek: number;
  isOpen: boolean;
  isDesktop: boolean;
  weeksData: any;
  onSelect: (week: number) => void;
  onToggle: () => void;
}

export const WeekTimeline: React.FC<WeekTimelineProps> = ({
  currentWeek,
  totalWeeks,
  maxCurrentWeek,
  isOpen,
  isDesktop,
  weeksData,
  onSelect,
  onToggle
}) => {
  const { isDarkMode } = useTheme();
  const weeks = Array.from({ length: totalWeeks }, (_, i) => i + 1);
  const activeWeekData = weeksData[currentWeek];

  return (
    <nav className="w-full space-y-4" aria-label="Navegación por semanas del curso">
      {!isDesktop && (
        <div className="lg:hidden">
          <button
            onClick={onToggle}
            className={`w-full flex items-center justify-between p-4 rounded-xl border shadow-sm transition-all duration-300 ${isDarkMode
              ? 'bg-[#161d2a] border-white/5 text-white'
              : 'bg-white border-gray-200 text-slate-800'
              }`}
          >
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex-shrink-0 flex items-center justify-center">
                <Calendar className="w-4 h-4 text-blue-500" />
              </div>
              <div className="text-left min-w-0 flex-1">
                <p className="text-sm font-bold truncate">{activeWeekData?.title}</p>
              </div>
            </div>
            <div className="flex-shrink-0 ml-2">
              {isOpen ? <X className="w-5 h-5 text-slate-500 dark:text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-500 dark:text-slate-400" />}
            </div>
          </button>
        </div>
      )}

      <motion.div
        initial={false}
        animate={isOpen || isDesktop ? { opacity: 1, height: 'auto' } : { opacity: 0, height: 0 }}
        exit={{ opacity: 0, height: 0 }}
        className={`rounded-xl border shadow-sm transition-colors duration-300 max-h-96 lg:max-h-[60vh] flex flex-col overflow-hidden ${isDarkMode
          ? 'bg-[#161d2a] border-white/5 shadow-2xl'
          : 'bg-white border-gray-200 shadow-xl'
          } ${isOpen ? 'mt-2' : ''}`}
      >
        <div className="flex-shrink-0 flex items-center justify-between px-5 py-5 border-b border-white/5">
          <h2
            id="sidebar-title"
            className={`font-bold flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}
          >
            <Calendar className="w-4 h-4 text-blue-500" aria-hidden="true" />
            Cronograma
          </h2>
          <span
            className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${isDarkMode ? 'bg-blue-500/20 text-blue-300' : 'bg-blue-50 text-blue-600'
              }`}
          >
            {totalWeeks} SEMANAS
          </span>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-2">
          <ul className="space-y-1 pb-2">
            {weeks.map((week) => {
              const data = weeksData[week];
              const isActive = currentWeek === week;
              const isPast = week < maxCurrentWeek;
              const isInProgress = week === maxCurrentWeek;
              const isLocked = week > maxCurrentWeek;

              return (
                <li key={week}>
                  <WeekItem
                    week={week}
                    data={data}
                    isActive={isActive}
                    isPast={isPast}
                    isInProgress={isInProgress}
                    isLocked={isLocked}

                    totalWeeks={totalWeeks}
                    maxCurrentWeek={maxCurrentWeek}
                    onSelect={onSelect}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      </motion.div>
    </nav>
  );
};
