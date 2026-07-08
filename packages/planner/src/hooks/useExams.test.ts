import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useExams } from './useExams';

import { Exam } from '../types';

describe('useExams Hook', () => {
    const mockExam: Exam = {
        id: '1',
        title: 'Test Exam',
        subject: 'Testing',
        date: '2026-01-01',
        time: '12:00',
        location: 'Room 1',
        topics: [],
        notes: ''
    };

    const originalWindow = globalThis.window;

    beforeEach(() => {
        vi.stubGlobal('window', { ...originalWindow, PLANNER_DATA: undefined });
        localStorage.clear();
    });

    afterEach(() => {
        vi.unstubAllGlobals();
    });

    it('should load exams from PLANNER_DATA when present', () => {
        vi.stubGlobal('window', {
            ...originalWindow,
            PLANNER_DATA: [mockExam]
        });

        const { result } = renderHook(() => useExams());

        expect(result.current.exams).toHaveLength(1);
        expect(result.current.exams[0].title).toBe('Test Exam');
    });

    it('should load exams from LocalStorage when PLANNER_DATA is not present', () => {
        localStorage.setItem('exams', JSON.stringify([mockExam]));

        const { result } = renderHook(() => useExams());

        expect(result.current.exams).toHaveLength(1);
        expect(result.current.exams[0].title).toBe('Test Exam');
    });

    it('should prioritize PLANNER_DATA over LocalStorage', () => {
        const oldExam = { ...mockExam, title: 'Old Local Data' };
        localStorage.setItem('exams', JSON.stringify([oldExam]));

        const newExam = { ...mockExam, title: 'New Injected Data' };
        vi.stubGlobal('window', {
            ...originalWindow,
            PLANNER_DATA: [newExam]
        });

        const { result } = renderHook(() => useExams());

        expect(result.current.exams[0].title).toBe('New Injected Data');
    });

    it('should calculate stats correctly', () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        const todayStr = `${year}-${month}-${day}`;

        const futureDate = new Date(today);
        futureDate.setDate(today.getDate() + 7);
        const futureYear = futureDate.getFullYear();
        const futureMonth = String(futureDate.getMonth() + 1).padStart(2, '0');
        const futureDay = String(futureDate.getDate()).padStart(2, '0');
        const futureStr = `${futureYear}-${futureMonth}-${futureDay}`;

        const exams: Exam[] = [
            mockExam,
            { ...mockExam, id: '2', title: 'Today Exam', date: todayStr },
            { ...mockExam, id: '3', title: 'Future Exam', date: futureStr }
        ];

        localStorage.setItem('exams', JSON.stringify(exams));

        const { result } = renderHook(() => useExams());

        expect(result.current.stats.total).toBe(3);
        expect(result.current.stats.today).toBe(1);
        expect(result.current.stats.upcoming).toBe(1);
    });

    it('should load default exams when no data is available', () => {
        const { result } = renderHook(() => useExams());

        expect(result.current.exams.length).toBeGreaterThan(0);
        expect(result.current.exams[0]).toHaveProperty('id');
        expect(result.current.exams[0]).toHaveProperty('title');
        expect(result.current.exams[0]).toHaveProperty('subject');
    });
});
