import React from 'react';
import { ExternalLink, type LucideIcon } from 'lucide-react';
import { useTheme } from '@course-dashboard/shared';

interface LinkCardProps {
  text: string;
  url: string;
  icon: LucideIcon;
  variant?: 'default' | 'evaluation';
}

export const LinkCard: React.FC<LinkCardProps> = ({ text, url, icon: Icon, variant = 'default' }) => {
  const { isDarkMode } = useTheme();

  const getStyles = () => {
    if (variant === 'evaluation') {
      return {
        container: isDarkMode
          ? 'bg-white/5 border-white/5 hover:bg-white/10 text-orange-400'
          : 'bg-gray-50 border-gray-100 hover:bg-orange-50/50 text-orange-700 shadow-sm',
        icon: isDarkMode ? 'bg-orange-500/10' : 'bg-orange-100/50',
        iconColor: isDarkMode ? 'text-orange-400' : 'text-orange-600'
      };
    }
    return {
      container: isDarkMode
        ? 'bg-white/5 border-white/5 hover:bg-white/10 text-blue-400'
        : 'bg-gray-50 border-gray-100 hover:bg-blue-50 text-blue-600 shadow-sm',
      icon: isDarkMode ? 'bg-blue-500/10' : 'bg-blue-100/50',
      iconColor: ''
    };
  };

  const styles = getStyles();

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${variant === 'evaluation' ? 'Actividad' : 'Recurso'}: ${text} (abre enlace externo en nueva pestaña)`}
      className={`flex items-center gap-3 p-4 rounded-xl transition-all border group overflow-hidden ${styles.container}`}
    >
      <div className={`p-2 rounded-lg ${styles.icon}`} aria-hidden="true">
        <Icon className={`w-4 h-4 ${styles.iconColor}`} />
      </div>
      <span className="text-sm font-bold leading-snug flex-1 min-w-0 break-words">
        {text}
      </span>
      <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
    </a>
  );
};
