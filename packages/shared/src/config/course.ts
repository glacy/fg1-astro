export const COURSE_CONFIG = {
  name: 'Física General I',
  institution: 'Tecnológico de Costa Rica',
  semester: 'I semestre 2026',
  totalWeeks: 16,
  contactEmail: 'glacy@tec.ac.cr',
  apps: {
    weekly: {
      maxCurrentWeek: 16,
      githubRepository: 'https://github.com/glacy/plan-semanal-fg1',
    },
    planner: {
      titleName: 'Física General I',
      subtitleName: 'Calendario de evaluaciones',
      footerText: 'Tecnológico de Costa Rica',
    },
  },
};

export const FOOTER_CONFIG = {
  text: COURSE_CONFIG.apps.planner.footerText,
};
