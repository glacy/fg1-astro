import React, { createContext, useContext, useState, useEffect } from 'react';
import { weeksData } from '../data/weeks';
import { COURSE_CONFIG } from '../config/app';

interface CourseContextType {
  currentWeekId: number;
  setCurrentWeekId: (id: number) => void;
  maxCurrentWeek: number;
  totalWeeks: number;
  currentWeek: typeof weeksData[number];
}

const CourseContext = createContext<CourseContextType | undefined>(undefined);

export const CourseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentWeekId, setCurrentWeekId] = useState(1);

  // Scroll to top when week changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentWeekId]);

  const currentWeek = weeksData[currentWeekId];

  return (
    <CourseContext.Provider
      value={{
        currentWeekId,
        setCurrentWeekId,
        maxCurrentWeek: COURSE_CONFIG.maxCurrentWeek,
        totalWeeks: COURSE_CONFIG.totalWeeks,
        currentWeek,
      }}
    >
      {children}
    </CourseContext.Provider>
  );
};

export const useCourse = () => {
  const context = useContext(CourseContext);
  if (!context) {
    throw new Error('useCourse must be used within a CourseProvider');
  }
  return context;
};
