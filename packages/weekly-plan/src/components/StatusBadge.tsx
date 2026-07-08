import React from 'react';
import { useTheme } from '@course-dashboard/shared';

interface StatusBadgeProps {
  status: 'completed' | 'in-progress' | 'locked';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const { isDarkMode } = useTheme();

  const statusConfig = {
    completed: {
      label: 'Semana completada',
      color: isDarkMode ? 'bg-green-500/10 text-green-300 border border-green-500/20' : 'bg-green-50 text-green-600 border border-green-100',
      dot: 'bg-green-500'
    },
    'in-progress': {
      label: 'Sesión semanal activa',
      color: isDarkMode ? 'bg-blue-500/10 text-blue-300 border border-blue-500/20' : 'bg-blue-50 text-blue-600 border border-blue-100',
      dot: 'bg-blue-500'
    },
    locked: {
      label: 'Semana bloqueada',
      color: isDarkMode ? 'bg-slate-500/10 text-slate-300 border border-slate-500/20' : 'bg-slate-50 text-slate-600 border border-slate-200',
      dot: 'bg-slate-500'
    }
  };

  const config = statusConfig[status];

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${config.color}`} aria-label={`Estado de la unidad: ${config.label}`}>
      <div className={`w-1.5 h-1.5 rounded-full ${config.dot} ${status === 'in-progress' ? 'animate-pulse' : ''}`} aria-hidden="true"></div>
      <span className="text-[10px] font-bold uppercase tracking-widest italic">{config.label}</span>
    </div>
  );
};
