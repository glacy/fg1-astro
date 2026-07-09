import { INSTRUCTORS_DATA, DIAS } from './instructors';
import type { Attention, Instructor } from './instructors';

export type { Attention, Instructor };

export function formatLocation(detalle: string): { text: string; url?: string } {
  const match = detalle.match(/(https?:\/\/[^\s]+)/);
  if (match) {
    const [_, url] = match;
    const text = detalle.split(':')[0];
    return { text, url };
  }
  return { text: detalle };
}

export function filterInstructors(
  searchTerm: string,
  modalityFilter: string,
  dayFilter: string
): Instructor[] {
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
}

export function getInstructorsList(): string[] {
  return [...new Set(INSTRUCTORS_DATA.map(i => i.docente))];
}

export { INSTRUCTORS_DATA as instructorsData, DIAS as days };