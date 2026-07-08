import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { useTheme } from '@course-dashboard/shared';

interface ObjectivesListProps {
  objectives: string[];
}

export const ObjectivesList: React.FC<ObjectivesListProps> = ({ objectives }) => {
  const { isDarkMode } = useTheme();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
      {objectives.map((obj, i) => (
        <div key={i} className="flex gap-3 group items-start">
          <CheckCircle2 className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
          <p className={`text-sm leading-relaxed transition-colors ${isDarkMode ? 'text-slate-300 group-hover:text-white' : 'text-slate-600 group-hover:text-slate-900'}`}>{obj}</p>
        </div>
      ))}
    </div>
  );
};
