import React from 'react';
import ExamCard from './components/ExamCard';
import ExamStats from './components/ExamStats';
import Filters from './components/Filters';
import { CalendarX } from 'lucide-react';

import { useExams } from './hooks/useExams';
import './index.css';

const App: React.FC = () => {
  const { exams, stats } = useExams();
  const [filter, setFilter] = React.useState<'all' | 'upcoming' | 'today'>('all');

  const filteredExams = exams.filter(exam => {
    if (filter === 'all') return true;
    const today = new Date().toLocaleDateString('en-CA');
    if (filter === 'today') return exam.date === today;
    if (filter === 'upcoming') return exam.date > today;
    return true;
  });

  return (
    <div className="w-full h-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50 transition-colors duration-300 flex flex-col">
      <main className="w-full px-4 sm:px-6 lg:px-8 pt-4 pb-4 flex-1 overflow-auto min-w-0">
        <div className="space-y-8 max-w-7xl mx-auto">
          <ExamStats
            upcoming={stats.upcoming}
            today={stats.today}
          />

          <Filters
            currentFilter={filter}
            onFilterChange={setFilter}
          />

          {filteredExams.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredExams.map(exam => (
                <ExamCard
                  key={exam.id}
                  exam={exam}
                />
              ))}
            </div>
          ) : (
            <div className="w-full min-h-96 py-20 text-center bg-white dark:bg-slate-900 rounded-3xl border border-dashed border-slate-300 dark:border-slate-700 flex flex-col items-center justify-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-50 dark:bg-slate-800 text-slate-300 dark:text-slate-600 mb-4">
                <CalendarX size={32} aria-hidden="true" />
              </div>
              <h3 className="text-lg font-bold text-slate-600 dark:text-slate-400">No hay evaluaciones para mostrar</h3>
              <p className="text-sm text-slate-400 dark:text-slate-500 max-w-xs mx-auto mt-2">
                No hay evaluaciones programadas para el día de hoy.
              </p>
              <p className="text-sm text-slate-400 dark:text-slate-500 max-w-xs mx-auto mt-2">
                Consulta con tu docente para más detalles.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
