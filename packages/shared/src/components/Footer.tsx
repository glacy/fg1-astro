import React from 'react';
import { Github, Mail } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { clsx } from 'clsx';

export interface FooterProps {
  courseName?: string;
  institution?: string;
  footerText?: string;
  githubRepository?: string;
  contactEmail?: string;
  showCreditsDialog?: React.ReactNode;
  showAnalytics?: React.ReactNode;
  className?: string;
  variant?: 'minimal' | 'full';
}

export const Footer: React.FC<FooterProps> = ({
  courseName,
  institution,
  footerText,
  githubRepository,
  contactEmail,
  showCreditsDialog,
  showAnalytics,
  className,
  variant = 'full',
}) => {
  const { isDarkMode } = useTheme();

  const baseStyles = clsx(
    'transition-colors duration-300',
    variant === 'full'
      ? 'py-6 border-t text-center text-sm'
      : 'mt-20 py-10 border-t bg-white dark:bg-slate-900'
  );

  const textStyles = clsx(
    variant === 'full'
      ? isDarkMode
        ? 'border-white/5 text-slate-500'
        : 'border-gray-200 text-slate-400'
      : 'border-slate-200 dark:border-slate-800'
  );

  const copyrightText = courseName
    ? `© 2026 Cátedra de ${courseName}${institution ? ` - ${institution}` : ''}`
    : footerText || '';

  return (
    <footer className={clsx(baseStyles, textStyles, className)}>
      {variant === 'full' ? (
        <>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <p>{copyrightText}</p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-2">
            {githubRepository && (
              <a
                href={githubRepository}
                target="_blank"
                rel="noopener noreferrer"
                className={clsx(
                  'inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors',
                  isDarkMode
                    ? 'hover:bg-white/5 text-slate-400 hover:text-slate-200'
                    : 'hover:bg-gray-100 text-slate-500 hover:text-slate-700'
                )}
                aria-label="Ver código fuente en GitHub"
              >
                <Github className="w-4 h-4" aria-hidden="true" />
                <span>Repositorio</span>
              </a>
            )}
            {contactEmail && (
              <a
                href={`mailto:${contactEmail}`}
                className={clsx(
                  'inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors',
                  isDarkMode
                    ? 'hover:bg-white/5 text-slate-400 hover:text-slate-200'
                    : 'hover:bg-gray-100 text-slate-500 hover:text-slate-700'
                )}
                aria-label="Enviar correo al desarrollador"
              >
                <Mail className="w-4 h-4" aria-hidden="true" />
                <span>Contacto</span>
              </a>
            )}
            {showCreditsDialog}
          </div>
        </>
      ) : (
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center gap-2 mt-2">
          <p className="text-sm text-slate-400 dark:text-slate-500 font-medium">
            {copyrightText}
          </p>
          <div className="flex items-center gap-2">
            {githubRepository && (
              <a
                href={githubRepository}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
                aria-label="Ver repositorio en GitHub"
              >
                <Github size={20} />
              </a>
            )}
            {contactEmail && (
              <a
                href={`mailto:${contactEmail}`}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
                aria-label="Enviar correo al desarrollador"
              >
                <Mail size={20} />
              </a>
            )}
          </div>
        </div>
      )}
      {showAnalytics}
    </footer>
  );
};

export default Footer;
