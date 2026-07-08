import React, { type ReactNode } from 'react';
import { motion } from 'motion/react';
import { useTheme } from '@course-dashboard/shared';

interface SectionProps {
  title: string;
  icon: React.ElementType;
  children: ReactNode;
  delay?: number;
}

export const Section: React.FC<SectionProps> = ({ title, icon: Icon, children, delay = 0 }) => {
  const { isDarkMode } = useTheme();
  const sectionId = title.toLowerCase().replace(/\s+/g, '-');

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      aria-labelledby={sectionId}
      className={`rounded-xl border p-4 sm:p-5 md:p-6 mb-6 transition-all duration-300 ${isDarkMode
        ? 'bg-[#161d2a] border-white/5 shadow-xl shadow-black/10'
        : 'bg-white border-gray-100 shadow-md shadow-gray-200/50'
        }`}
    >
      <div className="flex items-center gap-3 mb-5">
        <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-blue-500/10' : 'bg-blue-50'}`} aria-hidden="true">
          <Icon className={`w-6 h-6 ${isDarkMode ? 'text-blue-500' : 'text-blue-600'}`} />
        </div>
        <h3
          id={sectionId}
          className={`text-lg font-bold tracking-wide ${isDarkMode ? 'text-white' : 'text-slate-800'}`}
        >
          {title}
        </h3>
      </div>
      <div className="space-y-3">
        {children}
      </div>
    </motion.section>
  );
};
