import React from 'react';
import { useTheme } from '@course-dashboard/shared';

interface ContentListProps {
  contents: string[];
}

export const ContentList: React.FC<ContentListProps> = ({ contents }) => {
  const { isDarkMode } = useTheme();

  return (
    <div className="space-y-4">
      {contents.map((cont, i) => (
        <div key={i} className="flex gap-3 group items-center">
          <div
            className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold transition-transform group-hover:scale-110 ${isDarkMode ? 'bg-blue-500/10 text-blue-300 border border-blue-500/20' : 'bg-blue-50 text-blue-600 border border-blue-100'}`}
            aria-hidden="true"
          >
            {String(i + 1).padStart(2, '0')}
          </div>
          <p className={`text-sm font-medium transition-colors ${isDarkMode ? 'text-slate-300 group-hover:text-white' : 'text-slate-600 group-hover:text-slate-900'}`}>{cont}</p>
        </div>
      ))}
    </div>
  );
};
