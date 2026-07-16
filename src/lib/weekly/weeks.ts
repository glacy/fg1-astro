import { getCollection } from 'astro:content';

export interface LinkItem {
  text: string;
  url: string;
  icon: string;
}

export interface WeekData {
  id: number;
  title: string;
  image: string;
  objetivos: string[];
  contenidos: string[];
  consignas: LinkItem[];
  evaluaciones: LinkItem[];
  recursos?: LinkItem[];
}

export async function loadWeeksData(): Promise<Record<number, WeekData>> {
  const entries = await getCollection('weeks');
  const data: Record<number, WeekData> = {};
  for (const entry of entries) {
    data[entry.data.id] = entry.data as unknown as WeekData;
  }
  return data;
}

export { COURSE_CONFIG } from '../shared';
