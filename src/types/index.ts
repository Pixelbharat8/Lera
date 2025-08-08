// Core types for the application
export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'student' | 'instructor' | 'admin' | 'super_admin' | 'hr_staff';
  createdAt: string;
  updatedAt: string;
  bio?: string;
  phone?: string;
  dateOfBirth?: string;
  nationality?: string;
  preferences?: UserPreferences;
  employeeId?: string;
}

export interface UserPreferences {
  language: string;
  timezone: string;
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
  learningGoals: string[];
  studyReminders: boolean;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  instructor: Instructor;
  thumbnail: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  subcategory?: string;
  rating: number;
  totalLessons: number;
  totalDuration: string;
  price: number;
  originalPrice?: number;
  enrolled?: boolean;
  progress?: number;
  createdAt: string;
  updatedAt: string;
  features: string[];
  learningOutcomes: string[];
  prerequisites: string[];
  targetAudience: string[];
  difficulty: number; // 1-5 scale
  language: string;
  subtitles: string[];
  certificate: boolean;
  downloadableResources: boolean;
  mobileAccess: boolean;
  lifetimeAccess: boolean;
  tags: string[];
  status: 'draft' | 'published' | 'archived';
  enrollmentCount: number;
  completionRate: number;
  lastUpdated: string;
  estimatedHours: number;
  skillLevel: string;
  courseFormat: 'self-paced' | 'instructor-led' | 'blended';
  assessmentType: string[];
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  duration: string;
  videoUrl: string;
  courseId: string;
  order: number;
  completed?: boolean;
  resources?: LessonResource[];
  type: 'video' | 'reading' | 'quiz' | 'assignment' | 'live';
  isPreview: boolean;
  transcript?: string;
  notes?: string;
  objectives: string[];
  keyPoints: string[];
  vocabulary?: VocabularyItem[];
  exercises?: Exercise[];
  downloadableContent?: DownloadableContent[];
}

export interface LessonResource {
  id: string;
  title: string;
  type: 'pdf' | 'video' | 'link' | 'document' | 'audio' | 'image';
  url: string;
  size?: string;
  description?: string;
  downloadable: boolean;
}

export interface VocabularyItem {
  word: string;
  definition: string;
  pronunciation: string;
  example: string;
  partOfSpeech: string;
}

export interface Exercise {
  id: string;
  type: 'multiple-choice' | 'fill-blank' | 'matching' | 'ordering' | 'speaking' | 'writing';
  question: string;
  options?: string[];
  correctAnswer: string | string[];
  explanation: string;
  points: number;
}

export interface DownloadableContent {
  id: string;
  title: string;
  type: string;
  url: string;
  size: string;
}

export interface Instructor {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  specializations: string[];
  rating: number;
  totalStudents: number;
  totalCourses: number;
  experience: string;
  education: string[];
  certifications: string[];
  languages: string[];
  teachingStyle: string;
  expertise: string[];
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    website?: string;
  };
}

export interface Assessment {
  id: string;
  title: string;
  description: string;
  courseId: string;
  lessonId?: string;
  type: 'quiz' | 'assignment' | 'exam' | 'project' | 'presentation';
  questions: Question[];
  timeLimit?: number;
  attempts: number;
  passingScore: number;
  dueDate?: string;
  instructions: string;
  rubric?: AssessmentRubric;
  weight: number; // percentage of final grade
}

export interface Question {
  id: string;
  type: 'multiple-choice' | 'true-false' | 'short-answer' | 'essay' | 'matching' | 'ordering';
  question: string;
  options?: string[];
  correctAnswer: string | string[];
  points: number;
  explanation?: string;
  difficulty: 'easy' | 'medium' | 'hard';
  tags: string[];
}

export interface AssessmentRubric {
  criteria: RubricCriterion[];
  totalPoints: number;
}

export interface RubricCriterion {
  name: string;
  description: string;
  levels: RubricLevel[];
  weight: number;
}

export interface RubricLevel {
  name: string;
  description: string;
  points: number;
}

export interface LiveSession {
  id: string;
  title: string;
  description: string;
  instructorId: string;
  courseId?: string;
  scheduledStart: string;
  scheduledEnd: string;
  actualStart?: string;
  actualEnd?: string;
  status: 'scheduled' | 'live' | 'ended' | 'cancelled';
  maxParticipants: number;
  currentParticipants: number;
  meetingUrl?: string;
  recordingUrl?: string;
  agenda: string[];
  materials: LessonResource[];
  attendees: SessionAttendee[];
  chatEnabled: boolean;
  recordingEnabled: boolean;
  breakoutRooms: boolean;
}

export interface SessionAttendee {
  userId: string;
  joinedAt: string;
  leftAt?: string;
  duration: number;
  participation: number; // 1-5 scale
}

export interface Payment {
  id: string;
  userId: string;
  courseId?: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded' | 'cancelled';
  paymentMethod: string;
  transactionId: string;
  createdAt: string;
  description: string;
  invoice?: Invoice;
  refundReason?: string;
  refundAmount?: number;
}

export interface Invoice {
  id: string;
  number: string;
  date: string;
  dueDate: string;
  items: InvoiceItem[];
  subtotal: number;
  tax: number;
  total: number;
  notes?: string;
}

export interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Gamification {
  userId: string;
  points: number;
  level: number;
  badges: Badge[];
  streak: number;
  achievements: Achievement[];
  rank: number;
  experience: number;
  nextLevelPoints: number;
  weeklyGoal: number;
  monthlyGoal: number;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedAt: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  category: string;
}

export interface Employee {
  id: string;
  employeeId: string; // LERA-EMP-YYYY-NNNN format
  userId: string;
  fullName: string;
  email: string;
  phone: string;
  position: string;
  department: string;
  hireDate: string;
  salary: number;
  contractType: 'full_time' | 'part_time' | 'contract' | 'freelance';
  status: 'active' | 'inactive' | 'terminated';
  managerId?: string;
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
  bankDetails?: {
    accountNumber: string;
    bankName: string;
    routingNumber?: string;
  };
  documents: EmployeeDocument[];
  createdAt: string;
  updatedAt: string;
}

export interface EmployeeDocument {
  id: string;
  type: 'contract' | 'id_card' | 'certificate' | 'resume' | 'other';
  name: string;
  url: string;
  uploadedAt: string;
}

export interface Payroll {
  id: string;
  employeeId: string;
  period: string; // YYYY-MM format
  baseSalary: number;
  overtime: number;
  bonuses: number;
  deductions: number;
  netPay: number;
  payDate: string;
  status: 'pending' | 'paid' | 'cancelled';
  payslipUrl?: string;
}

export interface Leave {
  id: string;
  employeeId: string;
  type: 'sick' | 'vacation' | 'personal' | 'maternity' | 'emergency';
  startDate: string;
  endDate: string;
  days: number;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  approvedBy?: string;
  approvedAt?: string;
  comments?: string;
}

export interface Classroom {
  id: string;
  name: string;
  capacity: number;
  location: string;
  equipment: string[];
  availability: ClassroomAvailability[];
  isActive: boolean;
}

export interface ClassroomAvailability {
  dayOfWeek: number; // 0-6
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}

export interface ClassSchedule {
  id: string;
  className: string;
  teacherId: string;
  classroomId: string;
  studentIds: string[];
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  level: string;
  subject: string;
  maxStudents: number;
  isActive: boolean;
}

export interface PhysicalAttendance {
  id: string;
  employeeId?: string;
  studentId?: string;
  date: string;
  checkIn?: string;
  checkOut?: string;
  status: 'present' | 'absent' | 'late' | 'sick' | 'excused';
  location: string;
  notes?: string;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  type: 'course_completion' | 'streak' | 'quiz_master' | 'early_bird' | 'social' | 'milestone';
  requirements: Record<string, any>;
  reward: {
    points: number;
    badge?: string;
    title?: string;
  };
  progress: number;
  completed: boolean;
  completedAt?: string;
}

export interface Analytics {
  userId: string;
  courseId?: string;
  lessonId?: string;
  event: string;
  data: Record<string, any>;
  timestamp: string;
  sessionId: string;
  deviceInfo: DeviceInfo;
}

export interface DeviceInfo {
  type: 'desktop' | 'mobile' | 'tablet';
  os: string;
  browser: string;
  screenResolution: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error' | 'reminder';
  read: boolean;
  createdAt: string;
  actionUrl?: string;
  actionText?: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: string;
  expiresAt?: string;
}

export interface StudyPlan {
  id: string;
  userId: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  goals: StudyGoal[];
  schedule: StudySchedule[];
  progress: number;
  status: 'active' | 'completed' | 'paused' | 'cancelled';
}

export interface StudyGoal {
  id: string;
  title: string;
  description: string;
  targetDate: string;
  completed: boolean;
  progress: number;
  milestones: Milestone[];
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  completed: boolean;
  completedAt?: string;
}

export interface StudySchedule {
  id: string;
  dayOfWeek: number; // 0-6 (Sunday-Saturday)
  startTime: string;
  endTime: string;
  courseId?: string;
  lessonId?: string;
  type: 'study' | 'practice' | 'review' | 'assessment';
  recurring: boolean;
}

export interface Progress {
  userId: string;
  courseId: string;
  lessonId?: string;
  completionPercentage: number;
  timeSpent: number; // in minutes
  lastAccessed: string;
  currentLesson: string;
  completedLessons: string[];
  quizScores: QuizScore[];
  assignmentGrades: AssignmentGrade[];
  overallGrade: number;
  certificateEarned: boolean;
  certificateUrl?: string;
}

export interface QuizScore {
  quizId: string;
  score: number;
  maxScore: number;
  attempts: number;
  completedAt: string;
  timeSpent: number;
}

export interface AssignmentGrade {
  assignmentId: string;
  grade: number;
  maxGrade: number;
  submittedAt: string;
  gradedAt?: string;
  feedback?: string;
  rubricScores?: RubricScore[];
}

export interface RubricScore {
  criterionId: string;
  score: number;
  feedback: string;
}

export interface Certificate {
  id: string;
  userId: string;
  courseId: string;
  templateId: string;
  issuedAt: string;
  certificateUrl: string;
  verificationCode: string;
  grade: number;
  completionDate: string;
  validUntil?: string;
  skills: string[];
  credentialId: string;
}

export interface Discussion {
  id: string;
  courseId: string;
  lessonId?: string;
  userId: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  replies: DiscussionReply[];
  likes: number;
  views: number;
  tags: string[];
  pinned: boolean;
  resolved: boolean;
}

export interface DiscussionReply {
  id: string;
  userId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  likes: number;
  parentReplyId?: string;
  replies?: DiscussionReply[];
}

export interface CourseReview {
  id: string;
  courseId: string;
  userId: string;
  rating: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  helpful: number;
  verified: boolean;
  pros: string[];
  cons: string[];
  wouldRecommend: boolean;
}

export interface LearningPath {
  id: string;
  title: string;
  description: string;
  level: string;
  estimatedDuration: string;
  courses: Course[];
  prerequisites: string[];
  outcomes: string[];
  difficulty: number;
  popularity: number;
  category: string;
  tags: string[];
}

export interface Subscription {
  id: string;
  userId: string;
  planId: string;
  status: 'active' | 'cancelled' | 'expired' | 'paused';
  startDate: string;
  endDate: string;
  autoRenew: boolean;
  paymentMethod: string;
  amount: number;
  currency: string;
  features: string[];
  usageStats: SubscriptionUsage;
}

export interface SubscriptionUsage {
  coursesAccessed: number;
  hoursWatched: number;
  downloadsUsed: number;
  liveSessionsAttended: number;
  certificatesEarned: number;
}

export interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface SearchFilters {
  query?: string;
  category?: string;
  level?: string;
  priceRange?: [number, number];
  rating?: number;
  duration?: string;
  language?: string;
  features?: string[];
  instructor?: string;
  sortBy?: 'popularity' | 'rating' | 'price' | 'newest' | 'alphabetical';
  sortOrder?: 'asc' | 'desc';
}

export interface CourseStats {
  totalEnrollments: number;
  averageRating: number;
  completionRate: number;
  averageTimeToComplete: number;
  studentSatisfaction: number;
  certificatesIssued: number;
  revenueGenerated: number;
  refundRate: number;
}

export interface InstructorStats {
  totalStudents: number;
  totalCourses: number;
  averageRating: number;
  totalRevenue: number;
  hoursTeaching: number;
  responseTime: number;
  studentSatisfaction: number;
  coursesCompleted: number;
}

export interface PlatformStats {
  totalUsers: number;
  totalCourses: number;
  totalInstructors: number;
  totalHoursWatched: number;
  totalCertificatesIssued: number;
  averageSessionDuration: number;
  userRetentionRate: number;
  courseCompletionRate: number;
}