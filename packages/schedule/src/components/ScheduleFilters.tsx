import { SlidersHorizontal } from 'lucide-react';

interface ScheduleFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  modalityFilter: string;
  onModalityChange: (value: string) => void;
  dayFilter: string;
  onDayChange: (value: string) => void;
  instructors: string[];
  days: string[];
}

export const ScheduleFilters = ({
  searchTerm,
  onSearchChange,
  modalityFilter,
  onModalityChange,
  dayFilter,
  onDayChange,
  instructors,
  days,
}: ScheduleFiltersProps) => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-4 flex items-center gap-2">
        <SlidersHorizontal size={20} className="text-blue-600 dark:text-blue-400" aria-hidden="true" />
        Filtros de búsqueda
      </h2>
      <div className="flex flex-wrap gap-4">
        <div className="flex-1 min-w-[280px]">
          <label htmlFor="docente-select" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Docente
          </label>
          <select
            id="docente-select"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          >
            <option value="">Todos</option>
            {instructors.map((instructor) => (
              <option key={instructor} value={instructor}>
                {instructor}
              </option>
            ))}
          </select>
        </div>

        <div className="w-48">
          <label htmlFor="modalidad-select" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Modalidad
          </label>
          <select
            id="modalidad-select"
            value={modalityFilter}
            onChange={(e) => onModalityChange(e.target.value)}
            className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          >
            <option value="">Todas</option>
            <option value="presencial">Presencial</option>
            <option value="virtual">Virtual</option>
          </select>
        </div>

        <div className="w-48">
          <label htmlFor="dia-select" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Día
          </label>
          <select
            id="dia-select"
            value={dayFilter}
            onChange={(e) => onDayChange(e.target.value)}
            className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          >
            <option value="">Todos</option>
            {days.map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};
