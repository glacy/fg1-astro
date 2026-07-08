import { useState } from 'react';
import type { Exam } from '../types';
import plannerData from '../data/fg1-I_2026.json';

const getTodayISO = () => {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const useExams = () => {
  const [exams] = useState<Exam[]>(() => {
    if (typeof window !== 'undefined' && (window as any).PLANNER_DATA) {
      return (window as any).PLANNER_DATA;
    }

    const savedExams = localStorage.getItem('exams');
    if (savedExams) {
      try {
        return JSON.parse(savedExams);
      } catch (e) {
        console.error('Error parsing saved exams:', e);
      }
    }

    return [...(plannerData.exams as Exam[])].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  });



  const getStats = () => {
    const todayStr = getTodayISO();
    const isNotExtraordinario = (e: Exam) => !e.subject.includes('Extraordinario');
    
    return {
      total: exams.filter(isNotExtraordinario).length,
      upcoming: exams.filter(e => e.date > todayStr && isNotExtraordinario(e)).length,
      today: exams.filter(e => e.date === todayStr && isNotExtraordinario(e)).length
    };
  };

  return {
    exams,
    stats: getStats()
  };
};
