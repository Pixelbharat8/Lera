export const instructors = [
  {
    id: 'instructor-ledia',
    name: 'Ms. Ledia Balliu',
    title: 'IELTS Master Trainer',
    bio: 'Founder of LERA Academy with a 95% success rate for IELTS Band 7.0+ candidates.',
    avatar: '/images/instructors/ledia.jpg',
    expertise: ['IELTS Academic', 'Speaking Coaching', 'Writing Feedback'],
    rating: 4.9,
    totalStudents: 850,
    totalCourses: 15
  },
  {
    id: 'instructor-mo',
    name: 'Mr. Mo Tran',
    title: 'Business English Specialist',
    bio: 'Corporate trainer focusing on executive communication and leadership English.',
    avatar: '/images/instructors/mo.jpg',
    expertise: ['Business Presentations', 'Negotiation', 'Email Etiquette'],
    rating: 4.8,
    totalStudents: 650,
    totalCourses: 12
  },
  {
    id: 'instructor-sarah',
    name: 'Ms. Sarah Thompson',
    title: 'Confidence Coach',
    bio: 'Native English teacher helping beginners build strong communication foundations.',
    avatar: '/images/instructors/sarah.jpg',
    expertise: ['Conversation Practice', 'Pronunciation', 'Confidence Building'],
    rating: 4.7,
    totalStudents: 480,
    totalCourses: 10
  }
];

export const courses = [
  {
    id: 'course-ielts-mastery',
    title: 'IELTS Academic Mastery Program',
    shortDescription: 'Band 7.0+ focused preparation with examiner insights.',
    description:
      'A comprehensive IELTS program covering all four skills with live speaking labs, academic writing bootcamps, and official practice tests.',
    level: 'advanced',
    category: 'IELTS Preparation',
    tags: ['IELTS', 'Academic', 'Band 7+'],
    price: 9600000,
    originalPrice: 12000000,
    rating: 4.9,
    instructorId: 'instructor-ledia',
    totalLessons: 48,
    estimatedHours: 72,
    enrollmentCount: 1250,
    completionRate: 0.87,
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-02-10T00:00:00.000Z',
    syllabus: [
      {
        id: 'ielts-module-1',
        title: 'Diagnostic Assessment & Goal Setting',
        durationMinutes: 90
      },
      {
        id: 'ielts-module-2',
        title: 'Listening Strategies & Accent Training',
        durationMinutes: 180
      },
      {
        id: 'ielts-module-3',
        title: 'Writing Task 1 Mastery',
        durationMinutes: 240
      }
    ]
  },
  {
    id: 'course-business-excellence',
    title: 'Business English Excellence',
    shortDescription: 'Professional communication skills for the global workplace.',
    description:
      'Interactive program covering presentations, negotiations, leadership communication, and email mastery for international teams.',
    level: 'intermediate',
    category: 'Business English',
    tags: ['Business', 'Communication', 'Leadership'],
    price: 7200000,
    originalPrice: 9600000,
    rating: 4.8,
    instructorId: 'instructor-mo',
    totalLessons: 36,
    estimatedHours: 54,
    enrollmentCount: 890,
    completionRate: 0.82,
    createdAt: '2024-01-05T00:00:00.000Z',
    updatedAt: '2024-02-15T00:00:00.000Z',
    syllabus: [
      {
        id: 'business-module-1',
        title: 'Executive Presentation Skills',
        durationMinutes: 150
      },
      {
        id: 'business-module-2',
        title: 'Negotiation Simulations',
        durationMinutes: 180
      },
      {
        id: 'business-module-3',
        title: 'Leadership Communication Labs',
        durationMinutes: 210
      }
    ]
  },
  {
    id: 'course-foundations',
    title: 'English Foundations Accelerator',
    shortDescription: 'Confidence-building essentials for new learners.',
    description:
      'Build grammar, pronunciation, and conversational fluency with supportive coaching and weekly speaking clubs.',
    level: 'beginner',
    category: 'General English',
    tags: ['Beginner', 'Pronunciation', 'Confidence'],
    price: 3800000,
    originalPrice: 4200000,
    rating: 4.7,
    instructorId: 'instructor-sarah',
    totalLessons: 24,
    estimatedHours: 36,
    enrollmentCount: 620,
    completionRate: 0.78,
    createdAt: '2024-01-10T00:00:00.000Z',
    updatedAt: '2024-02-12T00:00:00.000Z',
    syllabus: [
      {
        id: 'foundations-module-1',
        title: 'Grammar Bootcamp',
        durationMinutes: 120
      },
      {
        id: 'foundations-module-2',
        title: 'Pronunciation Workshops',
        durationMinutes: 165
      },
      {
        id: 'foundations-module-3',
        title: 'Confidence Conversations',
        durationMinutes: 150
      }
    ]
  }
];

export const lessons = [
  {
    id: 'lesson-1',
    courseId: 'course-ielts-mastery',
    title: 'IELTS Speaking Diagnostic',
    durationMinutes: 60,
    sequence: 1,
    resources: ['Speaking Band Descriptors PDF', 'Mock Interview Recording'],
    status: 'published'
  },
  {
    id: 'lesson-2',
    courseId: 'course-ielts-mastery',
    title: 'Academic Writing Task 2 Structure',
    durationMinutes: 90,
    sequence: 2,
    resources: ['Essay Planner Template', 'Model Answers Library'],
    status: 'published'
  },
  {
    id: 'lesson-3',
    courseId: 'course-business-excellence',
    title: 'Executive Pitch Frameworks',
    durationMinutes: 75,
    sequence: 1,
    resources: ['Pitch Deck Checklist', 'Presentation Toolkit'],
    status: 'published'
  },
  {
    id: 'lesson-4',
    courseId: 'course-business-excellence',
    title: 'Negotiation Role Play',
    durationMinutes: 80,
    sequence: 2,
    resources: ['Negotiation Scripts', 'Scenario Cards'],
    status: 'draft'
  },
  {
    id: 'lesson-5',
    courseId: 'course-foundations',
    title: 'Grammar Fundamentals',
    durationMinutes: 60,
    sequence: 1,
    resources: ['Grammar Workbook', 'Practice Exercises'],
    status: 'published'
  }
];

export const learners = [
  {
    id: 'student-anna',
    role: 'student',
    name: 'Anna Nguyen',
    email: 'anna.nguyen@example.com',
    enrolledCourses: ['course-ielts-mastery', 'course-business-excellence'],
    progress: {
      'course-ielts-mastery': 0.42,
      'course-business-excellence': 0.18
    },
    lastActiveAt: '2024-02-14T09:30:00.000Z'
  },
  {
    id: 'student-minh',
    role: 'student',
    name: 'Minh Pham',
    email: 'minh.pham@example.com',
    enrolledCourses: ['course-foundations'],
    progress: {
      'course-foundations': 0.64
    },
    lastActiveAt: '2024-02-13T19:15:00.000Z'
  },
  {
    id: 'instructor-ledia',
    role: 'instructor',
    name: 'Ms. Ledia Balliu',
    email: 'ledia.balliu@example.com',
    instructorProfile: {
      specialties: ['IELTS Speaking', 'Academic Writing'],
      officeHours: 'Tue & Thu 17:00-19:00 ICT'
    },
    lastActiveAt: '2024-02-14T12:05:00.000Z'
  }
];

export const payments = [
  {
    id: 'payment-1',
    userId: 'student-anna',
    courseId: 'course-ielts-mastery',
    amount: 9600000,
    currency: 'VND',
    status: 'completed',
    paidAt: '2024-01-12T08:15:00.000Z',
    method: 'credit_card'
  },
  {
    id: 'payment-2',
    userId: 'student-anna',
    courseId: 'course-business-excellence',
    amount: 7200000,
    currency: 'VND',
    status: 'pending',
    paidAt: '2024-02-12T10:45:00.000Z',
    method: 'bank_transfer'
  },
  {
    id: 'payment-3',
    userId: 'student-minh',
    courseId: 'course-foundations',
    amount: 3800000,
    currency: 'VND',
    status: 'completed',
    paidAt: '2024-01-20T07:30:00.000Z',
    method: 'cash'
  }
];

export const liveSessions = [
  {
    id: 'session-1',
    courseId: 'course-ielts-mastery',
    title: 'Speaking Masterclass - Part 2 Performance',
    scheduledAt: '2024-02-20T13:00:00.000Z',
    durationMinutes: 90,
    hostId: 'instructor-ledia',
    meetingLink: 'https://meet.lera-academy.com/ielts-speaking',
    status: 'scheduled'
  },
  {
    id: 'session-2',
    courseId: 'course-business-excellence',
    title: 'Live Negotiation Lab',
    scheduledAt: '2024-02-18T11:00:00.000Z',
    durationMinutes: 75,
    hostId: 'instructor-mo',
    meetingLink: 'https://meet.lera-academy.com/business-negotiation',
    status: 'live'
  },
  {
    id: 'session-3',
    courseId: 'course-foundations',
    title: 'Beginner Speaking Club',
    scheduledAt: '2024-02-15T15:30:00.000Z',
    durationMinutes: 60,
    hostId: 'instructor-sarah',
    meetingLink: 'https://meet.lera-academy.com/foundations-speaking',
    status: 'ended'
  }
];

export const initialWorkflows = [
  {
    id: 'workflow-onboarding',
    name: 'Learner Onboarding',
    description: 'Automated welcome sequence guiding new students through orientation content.',
    status: 'active',
    steps: [
      {
        id: 'step-1',
        title: 'Send welcome email',
        type: 'communication',
        dueAfterHours: 0
      },
      {
        id: 'step-2',
        title: 'Schedule placement interview',
        type: 'task',
        dueAfterHours: 12
      },
      {
        id: 'step-3',
        title: 'Assign starter lessons',
        type: 'automation',
        dueAfterHours: 24
      }
    ]
  },
  {
    id: 'workflow-retention',
    name: 'At-Risk Student Support',
    description: 'Intervene when engagement drops below weekly targets.',
    status: 'active',
    steps: [
      {
        id: 'step-1',
        title: 'Notify instructor of risk signal',
        type: 'notification',
        dueAfterHours: 0
      },
      {
        id: 'step-2',
        title: 'Send encouragement message',
        type: 'communication',
        dueAfterHours: 2
      },
      {
        id: 'step-3',
        title: 'Offer coaching session',
        type: 'task',
        dueAfterHours: 24
      }
    ]
  }
];

export const analytics = {
  revenue: {
    trailing30Days: 20500000,
    monthOverMonthGrowth: 0.18,
    currency: 'VND'
  },
  coursePerformance: courses.map((course) => ({
    courseId: course.id,
    title: course.title,
    enrollmentCount: course.enrollmentCount,
    completionRate: course.completionRate,
    averageRating: course.rating
  })),
  learnerEngagement: {
    activeLearners: learners.filter((learner) => learner.role === 'student').length,
    averageProgress:
      Object.values(
        learners
          .filter((learner) => learner.role === 'student')
          .reduce((totals, learner) => {
            Object.entries(learner.progress).forEach(([courseId, value]) => {
              if (!totals[courseId]) {
                totals[courseId] = { total: 0, count: 0 };
              }
              totals[courseId].total += value;
              totals[courseId].count += 1;
            });
            return totals;
          }, {})
      ).map((entry) => entry.total / entry.count)
        .reduce((sum, value, _, arr) => sum + value / arr.length, 0),
    weeklyStreaks: {
      'student-anna': 3,
      'student-minh': 4
    }
  }
};
