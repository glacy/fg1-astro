import React from 'react';
import { Building2, Monitor } from 'lucide-react';
import { ScheduleFilters } from './components/ScheduleFilters';
import { ScheduleTable } from './components/ScheduleTable';
import { useSchedule } from './hooks/useSchedule';
import { useTheme } from '@course-dashboard/shared';
import './index.css';

const App: React.FC = () => {
  const { isDarkMode } = useTheme();
  const {
    searchTerm,
    setSearchTerm,
    modalityFilter,
    setModalityFilter,
    dayFilter,
    setDayFilter,
    filteredInstructors,
    instructorsList,
    days,
  } = useSchedule();

  return (
    <div
      id="schedule-root"
      className={`w-full h-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50 transition-colors duration-300 flex flex-col ${isDarkMode ? 'dark' : ''
        }`}
    >
      <main className="w-full px-4 sm:px-6 lg:px-8 pt-4 pb-4 flex-1 overflow-auto min-w-0">
        <div className="space-y-8 max-w-7xl mx-auto">
          <div className="text-center sm:text-left">
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-50 mb-2">
              Horarios de Atención Estudiantil
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400">I Semestre 2026</p>
          </div>

          <div className="flex flex-wrap gap-4 text-sm text-slate-600 dark:text-slate-400">
            <div className="flex items-center gap-2 bg-white dark:bg-slate-900 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800">
              <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                <Building2 size={16} aria-hidden="true" />
              </div>
              <span>Presencial</span>
            </div>
            <div className="flex items-center gap-2 bg-white dark:bg-slate-900 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800">
              <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                <Monitor size={16} aria-hidden="true" />
              </div>
              <span>Virtual</span>
            </div>
          </div>

          <ScheduleFilters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            modalityFilter={modalityFilter}
            onModalityChange={setModalityFilter}
            dayFilter={dayFilter}
            onDayChange={setDayFilter}
            instructors={instructorsList}
            days={days}
          />

          <ScheduleTable instructors={filteredInstructors} />
        </div>
      </main>
    </div>
  );
};

export default App;
