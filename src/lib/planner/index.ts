import plannerData from './exams.json';

export interface Exam {
  id: string;
  title: string;
  subject: string;
  date: string;
  time: string;
  location: string;
  topics: string[];
  notes?: string;
  formUrl?: string;
  distributionUrl?: string;
  instructionsUrl?: string;
  instructionsUrl2?: string;
  instructionsUrl3?: string;
  instructionsUrlSol?: string;
}

export interface PlannerData {
  version: number;
  config: {
    titleName: string;
    subtitleName: string;
    semester: string;
    footerText: string;
  };
  exams: Exam[];
}

export const getExams = (): Exam[] => {
  // Intentar obtener datos de localStorage o usar datos por defecto
  if (typeof window !== 'undefined') {
    const savedExams = localStorage.getItem('exams');
    if (savedExams) {
      try {
        return JSON.parse(savedExams);
      } catch (e) {
        console.error('Error parsing saved exams:', e);
      }
    }
  }
  
  // Ordenar por fecha
  return [...(plannerData as any).exams].sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );
};

export const getTodayISO = (): string => {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const getStats = (exams: Exam[]) => {
  const todayStr = getTodayISO();
  const isNotExtraordinario = (e: Exam) => !e.subject.includes('Extraordinario');
  
  return {
    total: exams.filter(isNotExtraordinario).length,
    upcoming: exams.filter(e => e.date > todayStr && isNotExtraordinario(e)).length,
    today: exams.filter(e => e.date === todayStr && isNotExtraordinario(e)).length
  };
};

export const filterExams = (exams: Exam[], filter: 'all' | 'upcoming' | 'today'): Exam[] => {
  const today = new Date().toLocaleDateString('en-CA');
  
  return exams.filter(exam => {
    if (filter === 'all') return true;
    if (filter === 'today') return exam.date === today;
    if (filter === 'upcoming') return exam.date > today;
    return true;
  });
};