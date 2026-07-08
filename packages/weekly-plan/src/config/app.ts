/**
 * Application Configuration
 * Centralized constants and settings for course management system
 * Imports from @course-dashboard/shared for global configuration
 */

import { COURSE_CONFIG as SHARED_COURSE_CONFIG, UI_CONFIG, THEME_CONFIG } from '@course-dashboard/shared';

export const CONFIG = {
  course: {
    name: SHARED_COURSE_CONFIG.name,
    institution: SHARED_COURSE_CONFIG.institution,
    totalWeeks: SHARED_COURSE_CONFIG.totalWeeks,
    maxCurrentWeek: SHARED_COURSE_CONFIG.apps.weekly.maxCurrentWeek,
  },

  ui: UI_CONFIG,

  theme: THEME_CONFIG,

  github: {
    repository: SHARED_COURSE_CONFIG.apps.weekly.githubRepository,
  },

  external: {
    analytics: true,
  },
};

export const COURSE_CONFIG = {
  totalWeeks: CONFIG.course.totalWeeks,
  maxCurrentWeek: CONFIG.course.maxCurrentWeek,
  courseName: CONFIG.course.name,
  institution: CONFIG.course.institution,
};

export default CONFIG;
