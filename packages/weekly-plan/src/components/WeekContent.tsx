import React from 'react';
import { Target, List, ClipboardCheck, PencilRuler, ExternalLink } from 'lucide-react';
import type { WeekData } from '../data/weeks';
import { Section } from './Section';
import { motion } from 'motion/react';
import { WeekHeader } from './WeekHeader';
import { ObjectivesList } from './ObjectivesList';
import { ContentList } from './ContentList';
import { LinkCard } from './LinkCard';
import { WeekNavigation } from './WeekNavigation';

interface WeekContentProps {
  week: WeekData;
  totalWeeks: number;
  onNavigate: (week: number) => void;
  maxCurrentWeek: number;
}

export const WeekContent: React.FC<WeekContentProps> = ({ week, totalWeeks, onNavigate, maxCurrentWeek }) => {
  return (
    <div className="flex-1 w-auto mx-auto pb-20" role="main">
      <motion.div
        key={week.id}
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
      >
        <WeekHeader week={week} totalWeeks={totalWeeks} maxCurrentWeek={maxCurrentWeek} />

        <Section title="Objetivos de aprendizaje" icon={Target} delay={0.1}>
          <ObjectivesList objectives={week.objetivos} />
        </Section>

        <Section title="Contenidos" icon={List} delay={0.2}>
          <ContentList contents={week.contenidos} />
        </Section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
          <Section title="Materiales" icon={ClipboardCheck} delay={0.3}>
            <div className="grid gap-3">
              {week.consignas.length > 0 ? (
                week.consignas.map((item, i) => (
                  <LinkCard key={i} text={item.text} url={item.url} icon={item.icon} />
                ))
              ) : (
                <p className="text-slate-600 dark:text-slate-400 italic text-sm text-center py-4">Sin materiales asignados</p>
              )}
            </div>
          </Section>

          <Section title="Actividades" icon={PencilRuler} delay={0.4}>
            <div className="grid gap-3">
              {week.evaluaciones.length > 0 ? (
                week.evaluaciones.map((item, i) => (
                  <LinkCard key={i} text={item.text} url={item.url} icon={item.icon} variant="evaluation" />
                ))
              ) : (
                <p className="text-slate-600 dark:text-slate-400 italic text-sm text-center py-4">Sin evaluaciones pendientes</p>
              )}
            </div>
          </Section>
        </div>

        {week.recursos && week.recursos.length > 0 && (
          <Section title="Recursos complementarios" icon={ExternalLink} delay={0.5}>
            <div className="grid gap-3 sm:grid-cols-2">
              {week.recursos.map((item, i) => (
                <LinkCard key={i} text={item.text} url={item.url} icon={item.icon} />
              ))}
            </div>
          </Section>
        )}

        <WeekNavigation
          currentWeek={week.id}
          totalWeeks={totalWeeks}
          maxCurrentWeek={maxCurrentWeek}
          onNavigate={onNavigate}
        />
      </motion.div>
    </div>
  );
};
