import { z } from 'zod';

export const ExamSchema = z.object({
    id: z.string(),
    title: z.string().min(1, 'El título es obligatorio'),
    subject: z.string().min(1, 'La materia es obligatoria'),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Formato de fecha inválido (YYYY-MM-DD)'),
    time: z.string(),
    location: z.string(),
    topics: z.array(z.string()),
    notes: z.string().optional(),
    // status removed - calculated dynamically
    formUrl: z.string().url('Debe ser una URL válida').optional().or(z.literal('')),
    distributionUrl: z.string().url('Debe ser una URL válida').optional().or(z.literal('')),
    instructionsUrl: z.string().url('Debe ser una URL válida').optional().or(z.literal('')),
    instructionsUrl2: z.string().url('Debe ser una URL válida').optional().or(z.literal('')),
    instructionsUrl3: z.string().url('Debe ser una URL válida').optional().or(z.literal('')),
    instructionsUrlSol: z.string().url('Debe ser una URL válida').optional().or(z.literal('')),
});

export const ExamListSchema = z.array(ExamSchema);

export const AppConfigSchema = z.object({
    titleName: z.string(),
    subtitleName: z.string(),
    semester: z.string(),
    footerText: z.string(),
});

export const PlannerDataSchema = z.object({
    version: z.number(),
    config: AppConfigSchema,
    exams: ExamListSchema,
});

export type Exam = z.infer<typeof ExamSchema>;
export type AppConfig = z.infer<typeof AppConfigSchema>;
export type PlannerData = z.infer<typeof PlannerDataSchema>;
