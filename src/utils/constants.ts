// Application constants
export const APP_CONFIG = {
  name: 'LERA Academy',
  slogan: 'Where Excellence is the Standard',
  version: '1.0.0',
  supportEmail: 'support@lera-academy.com',
  contactPhone: '+84 123 456 789',
  currency: 'VND',
  locale: 'vi-VN'
};

export const ROUTES = {
  HOME: '/',
  COURSES: '/courses',
  COURSE_DETAIL: '/courses/:courseId',
  LESSON: '/lesson/:lessonId',
  DASHBOARD: '/dashboard',
  TASKS: '/tasks',
  ABOUT: '/about',
  CONTACT: '/contact',
  AUTH: '/auth',
  PRIVACY: '/privacy',
  ADMIN: '/admin'
} as const;

export const USER_ROLES = {
  STUDENT: 'student',
  INSTRUCTOR: 'instructor',
  ADMIN: 'admin'
} as const;

export const COURSE_LEVELS = {
  BEGINNER: 'beginner',
  INTERMEDIATE: 'intermediate',
  ADVANCED: 'advanced'
} as const;

export const COURSE_CATEGORIES = [
  'IELTS Preparation',
  'Business English',
  'General English',
  'Test Preparation',
  'Grammar & Structure',
  'Academic Skills',
  'Speaking & Conversation',
  'Young Learners',
  'Pronunciation',
  'Literature & Culture',
  'Professional English',
  'Cambridge Preparation'
] as const;

export const COURSE_FEATURES = [
  'Live Classes',
  'AI-Powered Learning',
  'Personalized Feedback',
  'Mobile Access',
  'Downloadable Resources',
  'Certificate',
  'Lifetime Access',
  'Expert Instructors',
  'Interactive Content',
  'Progress Tracking',
  'Community Support',
  'Practice Tests'
] as const;

export const DIFFICULTY_LEVELS = {
  1: 'Very Easy',
  2: 'Easy', 
  3: 'Moderate',
  4: 'Challenging',
  5: 'Very Challenging'
} as const;

export const PAYMENT_STATUS = {
  PENDING: 'pending',
  COMPLETED: 'completed',
  FAILED: 'failed',
  REFUNDED: 'refunded'
} as const;

export const LIVE_SESSION_STATUS = {
  SCHEDULED: 'scheduled',
  LIVE: 'live',
  ENDED: 'ended',
  CANCELLED: 'cancelled'
} as const;

export const NOTIFICATION_TYPES = {
  INFO: 'info',
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error'
} as const;

export const GAMIFICATION_CONFIG = {
  POINTS_PER_LESSON: 10,
  POINTS_PER_QUIZ: 20,
  POINTS_PER_COURSE_COMPLETION: 100,
  POINTS_PER_LEVEL: 1000,
  STREAK_BONUS_MULTIPLIER: 1.5
};

export const ANALYTICS_EVENTS = {
  LESSON_VIEWED: 'lesson_viewed',
  QUIZ_ATTEMPTED: 'quiz_attempted',
  COURSE_ENROLLED: 'course_enrolled',
  COURSE_COMPLETED: 'course_completed',
  USER_LOGIN: 'user_login',
  USER_LOGOUT: 'user_logout',
  LIVE_SESSION_JOINED: 'live_session_joined',
  PAYMENT_COMPLETED: 'payment_completed'
} as const;

export const API_ENDPOINTS = {
  COURSES: '/api/courses',
  LESSONS: '/api/lessons',
  USERS: '/api/users',
  PAYMENTS: '/api/payments',
  ANALYTICS: '/api/analytics',
  LIVE_SESSIONS: '/api/live-sessions'
} as const;

export const STORAGE_KEYS = {
  AUTH_TOKEN: 'lera_auth_token',
  USER_PREFERENCES: 'lera_user_preferences',
  THEME: 'lera_theme',
  LANGUAGE: 'lera_language'
} as const;