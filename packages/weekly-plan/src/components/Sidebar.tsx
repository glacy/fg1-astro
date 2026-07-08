import React, { useState, useEffect } from 'react';
import { weeksData } from '../data/weeks';
import { WeekTimeline } from './WeekTimeline';
import { AnimatePresence } from 'motion/react';
import { useIsMobile } from '@course-dashboard/shared';

interface SidebarProps {
  currentWeek: number;
  onSelectWeek: (week: number) => void;
  totalWeeks: number;
  maxCurrentWeek: number;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentWeek, onSelectWeek, totalWeeks, maxCurrentWeek }) => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isMobile) {
      setIsOpen(false);
    }
  }, [isMobile]);

  const handleSelect = (week: number) => {
    if (week <= maxCurrentWeek) {
      onSelectWeek(week);
    }
    setIsOpen(false);
  };

  return (
    <div className="w-full">
      <AnimatePresence>
        <WeekTimeline
          currentWeek={currentWeek}
          totalWeeks={totalWeeks}
          maxCurrentWeek={maxCurrentWeek}
          isOpen={isOpen}
          isDesktop={!isMobile}
          weeksData={weeksData}
          onSelect={handleSelect}
          onToggle={() => setIsOpen(!isOpen)}
        />
      </AnimatePresence>
    </div>
  );
};
