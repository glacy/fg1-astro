import { useState, useMemo } from 'react';
import { INSTRUCTORS_DATA, DIAS } from '../data/instructors';
import type { Instructor } from '../types';

export const useSchedule = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [modalityFilter, setModalityFilter] = useState<string>('');
  const [dayFilter, setDayFilter] = useState<string>('');

  const filteredInstructors = useMemo(() => {
    return INSTRUCTORS_DATA
      .map(instructor => {
        const matchesName = instructor.docente
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        
        if (!matchesName) return null;

        const filteredAttentions = instructor.atenciones.filter(attention => {
          const matchesModality = modalityFilter
            ? attention.modalidad === modalityFilter
            : true;
          const matchesDay = dayFilter ? attention.dia === dayFilter : true;
          return matchesModality && matchesDay;
        });

        return filteredAttentions.length > 0
          ? { docente: instructor.docente, atenciones: filteredAttentions }
          : null;
      })
      .filter((instructor): instructor is Instructor => instructor !== null);
  }, [searchTerm, modalityFilter, dayFilter]);

  const instructorsList = useMemo(() => {
    return [...new Set(INSTRUCTORS_DATA.map(i => i.docente))];
  }, []);

  return {
    searchTerm,
    setSearchTerm,
    modalityFilter,
    setModalityFilter,
    dayFilter,
    setDayFilter,
    filteredInstructors,
    instructorsList,
    days: DIAS,
  };
};
