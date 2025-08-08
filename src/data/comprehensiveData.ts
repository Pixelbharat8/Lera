// Comprehensive LERA Academy Educational Data
// This file contains all the detailed course, instructor, and academy data

export interface ComprehensiveInstructor {
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
  yearsOfExperience: number;
  hourlyRate: number;
  successRate: number;
  backgroundStory: string;
  achievements: string[];
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    website?: string;
  };
}

export interface ComprehensiveCourse {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  instructor: ComprehensiveInstructor;
  thumbnail: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
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
  difficulty: number;
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
  curriculum: {
    modules: {
      title: string;
      lessons: number;
      duration: string;
      objectives: string[];
    }[];
  };
  practiceTests: number;
  liveSessionsIncluded: boolean;
  guaranteedResults: boolean;
}

export interface StudentSuccessStory {
  studentName: string;
  achievement: string;
  course: string;
  story: string;
  beforeScore?: string;
  afterScore?: string;
  timeToComplete: string;
  image: string;
  universityAdmission?: string;
  careerAdvancement?: string;
  testimonialQuote: string;
  location: string;
  currentPosition?: string;
}

export interface AcademyStatistics {
  totalStudents: number;
  graduatedStudents: number;
  yearsOfExcellence: number;
  successRate: number;
  averageIELTSIncrease: string;
  countriesRepresented: number;
  totalTeachingHours: number;
  universityAdmissions: number;
  corporatePartnerships: number;
  averageRating: number;
  returnStudentRate: number;
  courseCompletionRate: number;
}

// Expert Instructor Profiles
export const comprehensiveInstructors: ComprehensiveInstructor[] = [
  {
    id: '101',
    name: 'Ms. Ledia Balliu',
    avatar: '/ceo.jpg',
    bio: 'IELTS Master Trainer and CEO of LERA Academy with 7+ years pioneering English education in Hai Phong. Achieved 95% success rate for students targeting Band 7.0+ with innovative teaching methodologies.',
    specializations: ['IELTS Academic', 'Test Strategy', 'Academic Writing', 'Speaking Confidence', 'Band Score Improvement', 'University Preparation'],
    rating: 4.9,
    totalStudents: 1250,
    totalCourses: 15,
    experience: '7+ years in Vietnam',
    education: ['MA in Applied Linguistics - University of Tirana', 'IELTS Examiner Certification', 'Cambridge CELTA with Distinction'],
    certifications: ['IELTS Official Examiner', 'Cambridge Assessment Specialist', 'TESOL Advanced Practitioner', 'Academic Writing Expert'],
    languages: ['English (C2)', 'Italian (Native)', 'Albanian (Native)', 'Vietnamese (Advanced)'],
    teachingStyle: 'Results-focused methodology with personalized attention to individual learning styles and systematic skill development',
    expertise: ['IELTS Band 7-9 Strategies', 'Academic Writing Mastery', 'Speaking Confidence Building', 'Test Psychology', 'University Application Support'],
    yearsOfExperience: 7,
    hourlyRate: 75,
    successRate: 95,
    backgroundStory: 'Started teaching English in Hai Phong in 2017, transforming local English education with international standards and innovative teaching methods.',
    achievements: [
      'Founded LERA Academy in 2017',
      '95% student success rate for IELTS Band 7+',
      'Trained over 1,250 students',
      'Pioneered blended learning in Northern Vietnam',
      'Published IELTS preparation methodology'
    ],
    socialLinks: {
      linkedin: 'https://linkedin.com/in/ledia-balliu',
      website: 'https://lera-academy.com'
    }
  },
  {
    id: '102',
    name: 'Mr. Mo Tran',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
    bio: 'Business English Expert and Operations Director with MBA from Vietnam National University. Specializes in corporate communication training for multinational companies and professional development.',
    specializations: ['Corporate Communication', 'Presentation Skills', 'Business Writing', 'Cross-cultural Communication', 'Leadership English', 'Negotiation Skills'],
    rating: 4.8,
    totalStudents: 890,
    totalCourses: 12,
    experience: '8+ years corporate training',
    education: ['MBA Business Administration - VNU', 'BA International Business - Foreign Trade University', 'Business English Teaching Certificate'],
    certifications: ['Business English Specialist', 'Corporate Training Expert', 'International Communication Coach', 'Professional Development Trainer'],
    languages: ['Vietnamese (Native)', 'English (C1)', 'Mandarin (B2)', 'Japanese (A2)'],
    teachingStyle: 'Practical, real-world application with interactive business scenarios and hands-on practice',
    expertise: ['Executive Communication', 'International Business English', 'Presentation Mastery', 'Email Proficiency', 'Meeting Management'],
    yearsOfExperience: 8,
    hourlyRate: 65,
    successRate: 92,
    backgroundStory: 'Former corporate executive who transitioned to education to help professionals excel in global business environments.',
    achievements: [
      'Trained executives from Samsung, Intel, and LG',
      'Developed LERA\'s business English curriculum',
      '89% promotion rate among business students',
      'Corporate partnership coordinator',
      'International business communication expert'
    ]
  },
  {
    id: '103',
    name: 'Ms. Sarah Thompson',
    avatar: 'https://images.pexels.com/photos/5212324/pexels-photo-5212324.jpeg?auto=compress&cs=tinysrgb&w=150',
    bio: 'Native English speaker from London with Cambridge CELTA certification. Specializes in confidence building and interactive teaching methods for Vietnamese learners.',
    specializations: ['Foundation English', 'Confidence Building', 'Interactive Learning', 'Pronunciation Training', 'Conversation Skills', 'Cultural Communication'],
    rating: 4.7,
    totalStudents: 680,
    totalCourses: 10,
    experience: '6+ years in Asia',
    education: ['BA English Literature - King\'s College London', 'Cambridge CELTA', 'TESOL Certification', 'Cross-Cultural Communication Diploma'],
    certifications: ['Cambridge CELTA', 'TESOL Advanced', 'Pronunciation Specialist', 'Interactive Teaching Methods'],
    languages: ['English (Native)', 'Vietnamese (Intermediate)', 'French (B2)', 'Spanish (A2)'],
    teachingStyle: 'Encouraging and patient approach focused on building student confidence through interactive activities',
    expertise: ['Beginner English Foundation', 'Pronunciation Coaching', 'Conversation Practice', 'Cultural Communication', 'Confidence Building'],
    yearsOfExperience: 6,
    hourlyRate: 60,
    successRate: 89,
    backgroundStory: 'Moved to Vietnam in 2018 to bring authentic British English education to Southeast Asian learners.',
    achievements: [
      'Specialized in zero-beginner success',
      'Developed confidence-building curriculum',
      'Cultural adaptation expert',
      'Student motivation specialist',
      'Interactive learning innovator'
    ]
  },
  {
    id: '104',
    name: 'Mr. Michael Anderson',
    avatar: 'https://images.pexels.com/photos/5212317/pexels-photo-5212317.jpeg?auto=compress&cs=tinysrgb&w=150',
    bio: 'American TOEFL Expert with MBA from Stanford and 8+ years of test preparation experience. Proven track record of helping students achieve 100+ TOEFL scores for top university admissions.',
    specializations: ['TOEFL iBT', 'Academic English', 'Test Strategy', 'University Preparation', 'Academic Writing', 'Critical Thinking'],
    rating: 4.8,
    totalStudents: 540,
    totalCourses: 14,
    experience: '8+ years test prep',
    education: ['MBA - Stanford Graduate School', 'MA TESOL - UC Berkeley', 'TOEFL Specialist Certification', 'Academic Writing Certificate'],
    certifications: ['TOEFL iBT Specialist', 'Academic English Expert', 'University Prep Coach', 'Critical Thinking Trainer'],
    languages: ['English (Native)', 'Spanish (C1)', 'Vietnamese (Intermediate)', 'Portuguese (B1)'],
    teachingStyle: 'Strategic and analytical approach to test preparation with focus on score optimization and academic skills',
    expertise: ['TOEFL 100+ Strategies', 'Academic Vocabulary Mastery', 'Test Psychology', 'University Application Support', 'Academic Research Skills'],
    yearsOfExperience: 8,
    hourlyRate: 80,
    successRate: 93,
    backgroundStory: 'Former Stanford MBA who specializes in helping international students achieve their American university dreams.',
    achievements: [
      'Average student score increase: 25+ points',
      'Harvard, MIT, Stanford admissions coach',
      'Published TOEFL strategy guide',
      '93% success rate for 100+ scores',
      'Academic writing specialist'
    ]
  },
  {
    id: '105',
    name: 'Ms. Emma Wilson',
    avatar: 'https://images.pexels.com/photos/5212339/pexels-photo-5212339.jpeg?auto=compress&cs=tinysrgb&w=150',
    bio: 'Australian Grammar Specialist with MA in Applied Linguistics from University of Sydney. Expert in making complex grammar concepts accessible and engaging for all learning levels.',
    specializations: ['English Grammar', 'Syntax Analysis', 'Error Correction', 'Academic Writing', 'Language Structure', 'Writing Mechanics'],
    rating: 4.7,
    totalStudents: 720,
    totalCourses: 9,
    experience: '7+ years grammar instruction',
    education: ['MA Applied Linguistics - University of Sydney', 'BA English Language - University of Melbourne', 'Grammar Teaching Certification'],
    certifications: ['Grammar Specialist', 'Academic Writing Coach', 'Language Analysis Expert', 'Writing Mechanics Trainer'],
    languages: ['English (Native)', 'Vietnamese (Upper-Intermediate)', 'Japanese (Intermediate)', 'Mandarin (Basic)'],
    teachingStyle: 'Systematic and clear explanations with practical examples and step-by-step grammar building',
    expertise: ['Advanced Grammar Structures', 'Writing Mechanics', 'Error Analysis', 'Language Patterns', 'Grammar for Academic Writing'],
    yearsOfExperience: 7,
    hourlyRate: 55,
    successRate: 91,
    backgroundStory: 'Dedicated to making grammar learning enjoyable and accessible, helping students build strong language foundations.',
    achievements: [
      'Developed systematic grammar curriculum',
      'Authored grammar workbook series',
      'Error correction methodology expert',
      'Academic writing improvement specialist',
      'Grammar confidence building pioneer'
    ]
  },
  {
    id: '106',
    name: 'Dr. James Mitchell',
    avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150',
    bio: 'PhD in Applied Linguistics from Oxford University with 12+ years of academic and research experience. Specializes in advanced English literature, critical analysis, and research methodology.',
    specializations: ['English Literature', 'Critical Analysis', 'Research Methodology', 'Academic Publishing', 'Advanced Writing', 'Literary Theory'],
    rating: 4.9,
    totalStudents: 320,
    totalCourses: 8,
    experience: '12+ years academic research',
    education: ['PhD Applied Linguistics - Oxford University', 'MA English Literature - Cambridge University', 'PGCE Teaching Qualification'],
    certifications: ['Oxford PhD Supervisor', 'Academic Publishing Expert', 'Literary Analysis Specialist', 'Research Methodology Trainer'],
    languages: ['English (Native)', 'French (C2)', 'German (C1)', 'Vietnamese (Intermediate)'],
    teachingStyle: 'Scholarly approach combining rigorous academic standards with accessible explanations for complex concepts',
    expertise: ['PhD-level Writing', 'Literary Criticism', 'Research Publication', 'Academic Discourse', 'Critical Thinking'],
    yearsOfExperience: 12,
    hourlyRate: 120,
    successRate: 96,
    backgroundStory: 'Former Oxford researcher bringing world-class academic English instruction to Vietnam\'s top students.',
    achievements: [
      'Published 15+ academic papers',
      'Oxford University PhD supervisor',
      'Academic writing methodology creator',
      'International conference speaker',
      'Research excellence award recipient'
    ]
  },
  {
    id: '107',
    name: 'Ms. Lisa Chen',
    avatar: 'https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=150',
    bio: 'AI Learning Technology Expert with Computer Science background and TESOL certification. Pioneering the integration of artificial intelligence with English language education.',
    specializations: ['AI-Enhanced Learning', 'Educational Technology', 'Personalized Learning', 'Digital Pedagogy', 'Learning Analytics', 'Adaptive Testing'],
    rating: 4.8,
    totalStudents: 450,
    totalCourses: 6,
    experience: '5+ years EdTech innovation',
    education: ['MS Computer Science - Stanford University', 'TESOL Certification', 'AI in Education Specialization'],
    certifications: ['AI Learning Specialist', 'EdTech Innovation Expert', 'Learning Analytics Professional', 'Digital Pedagogy Trainer'],
    languages: ['English (Native)', 'Mandarin (Native)', 'Vietnamese (Intermediate)', 'Korean (Basic)'],
    teachingStyle: 'Technology-enhanced personalized learning with data-driven insights and adaptive methodology',
    expertise: ['AI-Powered Learning Systems', 'Personalized Curriculum Design', 'Learning Analytics', 'Adaptive Assessment', 'Digital Learning Tools'],
    yearsOfExperience: 5,
    hourlyRate: 85,
    successRate: 94,
    backgroundStory: 'Silicon Valley tech expert who revolutionized language learning by combining AI technology with proven teaching methods.',
    achievements: [
      'Developed LERA\'s AI learning system',
      'Created adaptive assessment algorithms',
      'Personalized learning pioneer',
      'EdTech innovation leader',
      'Learning analytics expert'
    ]
  },
  {
    id: '108',
    name: 'Prof. Robert Davis',
    avatar: 'https://images.pexels.com/photos/2182971/pexels-photo-2182971.jpeg?auto=compress&cs=tinysrgb&w=150',
    bio: 'Former Cambridge University Professor with 15+ years of academic excellence. Specialist in advanced English linguistics, phonetics, and language acquisition theory.',
    specializations: ['Advanced Linguistics', 'Phonetics & Phonology', 'Language Acquisition', 'Academic Research', 'Advanced Grammar', 'Sociolinguistics'],
    rating: 4.9,
    totalStudents: 280,
    totalCourses: 6,
    experience: '15+ years university teaching',
    education: ['PhD Linguistics - Cambridge University', 'MA English Language - Oxford University', 'Postdoc Research Fellowship'],
    certifications: ['Cambridge University Professor', 'Linguistics Research Expert', 'Phonetics Specialist', 'Language Acquisition Authority'],
    languages: ['English (Native)', 'Latin (Advanced)', 'French (C2)', 'German (C1)', 'Vietnamese (Basic)'],
    teachingStyle: 'Rigorous academic approach with deep theoretical understanding combined with practical application',
    expertise: ['Advanced Phonetics', 'Historical Linguistics', 'Sociolinguistic Variation', 'Language Change', 'Computational Linguistics'],
    yearsOfExperience: 15,
    hourlyRate: 150,
    successRate: 97,
    backgroundStory: 'Distinguished Cambridge professor bringing world-class linguistic expertise to advanced English learners in Vietnam.',
    achievements: [
      '25+ published research papers',
      'Cambridge University tenure',
      'Linguistic excellence awards',
      'International phonetics authority',
      'Language acquisition researcher'
    ]
  }
];

// Comprehensive Course Catalog
export const comprehensiveCourses: ComprehensiveCourse[] = [
  {
    id: 'ielts-band7-guarantee',
    title: 'IELTS Band 7+ Guarantee Program',
    description: 'Our flagship IELTS preparation program with a guaranteed Band 7.0+ achievement or full money-back guarantee. Features intensive practice, personalized feedback, expert strategies, and comprehensive skill development across all four test areas with proven methodologies.',
    shortDescription: 'Guaranteed Band 7.0+ achievement with comprehensive IELTS preparation and expert guidance.',
    instructor: comprehensiveInstructors[0],
    thumbnail: 'https://images.pexels.com/photos/4778621/pexels-photo-4778621.jpeg?auto=compress&cs=tinysrgb&w=600',
    level: 'advanced',
    category: 'IELTS Preparation',
    subcategory: 'Academic IELTS',
    rating: 4.9,
    totalLessons: 60,
    totalDuration: '90 hours',
    price: 449.99,
    originalPrice: 599.99,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-20',
    features: [
      'Band 7+ Money-Back Guarantee',
      'Live Speaking Practice Sessions',
      'Personalized Writing Feedback',
      'Official Practice Tests',
      'Expert Examiner Tips',
      'Individual Progress Tracking',
      'Mobile Learning App',
      'University Application Support'
    ],
    learningOutcomes: [
      'Achieve IELTS Band 7.0+ in all four skills',
      'Master advanced academic writing techniques',
      'Develop confident speaking with native-like fluency',
      'Excel in reading comprehension with time management',
      'Master listening skills with various accents',
      'Understand test psychology and strategy',
      'Build vocabulary for academic contexts'
    ],
    prerequisites: ['Intermediate English level (B2)', 'Basic computer skills', 'Commitment to intensive study'],
    targetAudience: ['University applicants', 'Immigration candidates', 'Professional development seekers', 'Academic career pursuers'],
    difficulty: 4,
    language: 'English',
    subtitles: ['Vietnamese', 'English'],
    certificate: true,
    downloadableResources: true,
    mobileAccess: true,
    lifetimeAccess: true,
    tags: ['IELTS', 'Academic', 'Band 7+', 'University', 'Guarantee', 'Intensive'],
    status: 'published',
    enrollmentCount: 1850,
    completionRate: 95,
    lastUpdated: '2024-01-20',
    estimatedHours: 90,
    skillLevel: 'Upper-Intermediate to Advanced',
    courseFormat: 'blended',
    assessmentType: ['Mock Tests', 'Speaking Evaluations', 'Writing Assessments', 'Progress Tracking'],
    curriculum: {
      modules: [
        { title: 'Test Overview & Strategy', lessons: 8, duration: '12 hours', objectives: ['Understand test format', 'Learn scoring criteria', 'Develop test strategy'] },
        { title: 'Reading Mastery', lessons: 12, duration: '18 hours', objectives: ['Speed reading techniques', 'Question type mastery', 'Time management'] },
        { title: 'Writing Excellence', lessons: 15, duration: '25 hours', objectives: ['Task 1 & 2 mastery', 'Academic vocabulary', 'Structure and coherence'] },
        { title: 'Listening Comprehension', lessons: 10, duration: '15 hours', objectives: ['Accent recognition', 'Note-taking skills', 'Question prediction'] },
        { title: 'Speaking Confidence', lessons: 15, duration: '20 hours', objectives: ['Fluency development', 'Pronunciation training', 'Part 1-3 strategies'] }
      ]
    },
    practiceTests: 12,
    liveSessionsIncluded: true,
    guaranteedResults: true
  },
  {
    id: 'business-english-executive',
    title: 'Business English for Executives',
    description: 'Advanced business communication course designed for executives and senior professionals. Master presentation skills, negotiation techniques, cross-cultural communication, and leadership English for international business success.',
    shortDescription: 'Master executive-level business communication for international success.',
    instructor: comprehensiveInstructors[1],
    thumbnail: 'https://images.pexels.com/photos/3183183/pexels-photo-3183183.jpeg?auto=compress&cs=tinysrgb&w=600',
    level: 'advanced',
    category: 'Business English',
    subcategory: 'Executive Communication',
    rating: 4.8,
    totalLessons: 42,
    totalDuration: '65 hours',
    price: 389.99,
    originalPrice: 489.99,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-18',
    features: [
      'Executive-Level Content',
      'Real Business Case Studies',
      'Presentation Skills Mastery',
      'Negotiation Practice',
      'Cultural Intelligence Training',
      'Leadership Communication',
      'Email Template Library',
      'Industry-Specific Modules'
    ],
    learningOutcomes: [
      'Lead international meetings confidently',
      'Deliver compelling business presentations',
      'Negotiate deals effectively in English',
      'Write professional reports and proposals',
      'Build global business relationships',
      'Manage cross-cultural teams',
      'Communicate strategic vision clearly'
    ],
    prerequisites: ['Upper-intermediate English', 'Management or leadership experience', 'Business background'],
    targetAudience: ['C-level executives', 'Senior managers', 'Team leaders', 'International business professionals'],
    difficulty: 4,
    language: 'English',
    subtitles: ['Vietnamese', 'English'],
    certificate: true,
    downloadableResources: true,
    mobileAccess: true,
    lifetimeAccess: true,
    tags: ['Business', 'Executive', 'Leadership', 'International', 'Professional', 'Advanced'],
    status: 'published',
    enrollmentCount: 680,
    completionRate: 88,
    lastUpdated: '2024-01-18',
    estimatedHours: 65,
    skillLevel: 'Advanced',
    courseFormat: 'instructor-led',
    assessmentType: ['Business Simulations', 'Presentation Evaluations', 'Case Study Analysis'],
    curriculum: {
      modules: [
        { title: 'Executive Communication Foundations', lessons: 8, duration: '12 hours', objectives: ['Leadership communication', 'Executive presence', 'Strategic messaging'] },
        { title: 'International Business Context', lessons: 10, duration: '15 hours', objectives: ['Cross-cultural awareness', 'Global business etiquette', 'Cultural intelligence'] },
        { title: 'Presentation & Public Speaking', lessons: 12, duration: '20 hours', objectives: ['Executive presentations', 'Audience engagement', 'Visual communication'] },
        { title: 'Negotiation & Deal Making', lessons: 12, duration: '18 hours', objectives: ['Negotiation strategies', 'Deal structuring language', 'Conflict resolution'] }
      ]
    },
    practiceTests: 0,
    liveSessionsIncluded: true,
    guaranteedResults: false
  },
  {
    id: 'foundation-english-complete',
    title: 'Complete English Foundation Program',
    description: 'Comprehensive beginner program taking students from zero English knowledge to confident intermediate level. Features interactive lessons, cultural insights, practical conversations, and systematic skill building with native speaker support.',
    shortDescription: 'Complete beginner to intermediate English program with native speaker support.',
    instructor: comprehensiveInstructors[2],
    thumbnail: 'https://images.pexels.com/photos/7516363/pexels-photo-7516363.jpeg?auto=compress&cs=tinysrgb&w=600',
    level: 'beginner',
    category: 'General English',
    subcategory: 'Foundation Course',
    rating: 4.8,
    totalLessons: 48,
    totalDuration: '75 hours',
    price: 249.99,
    originalPrice: 329.99,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-19',
    features: [
      'Zero to Intermediate Journey',
      'Native Speaker Instruction',
      'Interactive Learning Activities',
      'Cultural Context Training',
      'Daily Conversation Practice',
      'Systematic Grammar Building',
      'Pronunciation Training',
      'Confidence Building Focus'
    ],
    learningOutcomes: [
      'Communicate confidently in daily situations',
      'Understand and use 2000+ essential words',
      'Master fundamental grammar structures',
      'Engage in basic to intermediate conversations',
      'Read and understand everyday texts',
      'Write emails and simple reports',
      'Understand cultural communication patterns'
    ],
    prerequisites: ['No prior English knowledge required', 'Motivation to learn', 'Basic literacy skills'],
    targetAudience: ['Complete beginners', 'False beginners', 'Adult learners', 'Career preparation students'],
    difficulty: 1,
    language: 'English',
    subtitles: ['Vietnamese', 'English'],
    certificate: true,
    downloadableResources: true,
    mobileAccess: true,
    lifetimeAccess: true,
    tags: ['Beginner', 'Foundation', 'Complete Program', 'Native Speaker', 'Interactive'],
    status: 'published',
    enrollmentCount: 2150,
    completionRate: 93,
    lastUpdated: '2024-01-19',
    estimatedHours: 75,
    skillLevel: 'Beginner to Intermediate',
    courseFormat: 'blended',
    assessmentType: ['Progress Quizzes', 'Speaking Assessments', 'Vocabulary Tests', 'Cultural Understanding'],
    curriculum: {
      modules: [
        { title: 'English Basics & Phonetics', lessons: 12, duration: '18 hours', objectives: ['Alphabet mastery', 'Basic sounds', 'Simple greetings'] },
        { title: 'Essential Vocabulary & Grammar', lessons: 12, duration: '20 hours', objectives: ['Core vocabulary', 'Present tense', 'Basic sentences'] },
        { title: 'Conversation & Daily English', lessons: 12, duration: '18 hours', objectives: ['Daily conversations', 'Practical situations', 'Social interactions'] },
        { title: 'Intermediate Skills Development', lessons: 12, duration: '19 hours', objectives: ['Complex grammar', 'Extended conversations', 'Reading comprehension'] }
      ]
    },
    practiceTests: 8,
    liveSessionsIncluded: true,
    guaranteedResults: false
  },
  {
    id: 'toefl-100-plus-success',
    title: 'TOEFL iBT 100+ Success Program',
    description: 'Intensive TOEFL preparation program targeting scores of 100+ for top university admissions. Features authentic materials, strategic test approaches, academic skill development, and university application support.',
    shortDescription: 'Achieve TOEFL 100+ scores for top university admissions with expert preparation.',
    instructor: comprehensiveInstructors[3],
    thumbnail: 'https://images.pexels.com/photos/4778669/pexels-photo-4778669.jpeg?auto=compress&cs=tinysrgb&w=600',
    level: 'advanced',
    category: 'Test Preparation',
    subcategory: 'TOEFL iBT',
    rating: 4.9,
    totalLessons: 55,
    totalDuration: '85 hours',
    price: 449.99,
    originalPrice: 599.99,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-17',
    features: [
      'Target Score: 100+ Points',
      'Stanford MBA Instructor',
      'Official ETS Materials',
      'Academic Skills Training',
      'University Application Guidance',
      'Score Improvement Tracking',
      'Computer-Based Practice',
      'Scholarship Application Support'
    ],
    learningOutcomes: [
      'Achieve TOEFL iBT score of 100+',
      'Master all four academic skills',
      'Excel in integrated speaking and writing tasks',
      'Develop advanced academic vocabulary',
      'Perfect test-taking strategies',
      'Prepare for American university culture',
      'Build confidence for academic success'
    ],
    prerequisites: ['Upper-intermediate English (B2+)', 'Academic background', 'University admission goals'],
    targetAudience: ['Graduate school applicants', 'PhD candidates', 'Academic professionals', 'Research scholars'],
    difficulty: 5,
    language: 'English',
    subtitles: ['Vietnamese', 'English'],
    certificate: true,
    downloadableResources: true,
    mobileAccess: true,
    lifetimeAccess: true,
    tags: ['TOEFL', 'University', 'Graduate School', '100+', 'Academic', 'Intensive'],
    status: 'published',
    enrollmentCount: 560,
    completionRate: 89,
    lastUpdated: '2024-01-17',
    estimatedHours: 85,
    skillLevel: 'Advanced',
    courseFormat: 'instructor-led',
    assessmentType: ['Official Practice Tests', 'Integrated Skills Assessment', 'Academic Writing Evaluation'],
    curriculum: {
      modules: [
        { title: 'TOEFL Test Mastery', lessons: 12, duration: '20 hours', objectives: ['Test format expertise', 'Scoring understanding', 'Strategic planning'] },
        { title: 'Academic Reading & Listening', lessons: 15, duration: '25 hours', objectives: ['Academic text comprehension', 'Lecture understanding', 'Note-taking mastery'] },
        { title: 'Academic Speaking & Writing', lessons: 15, duration: '25 hours', objectives: ['Integrated responses', 'Academic essay writing', 'Coherent communication'] },
        { title: 'Score Optimization', lessons: 13, duration: '15 hours', objectives: ['Final preparation', 'Score prediction', 'Test day strategies'] }
      ]
    },
    practiceTests: 15,
    liveSessionsIncluded: true,
    guaranteedResults: false
  },
  {
    id: 'grammar-mastery-complete',
    title: 'Complete Grammar Mastery Course',
    description: 'Comprehensive grammar course covering all English structures from basic to advanced. Perfect for students who want to eliminate grammar errors and build strong foundations for academic and professional writing.',
    shortDescription: 'Master all English grammar structures from basic to advanced with practical applications.',
    instructor: comprehensiveInstructors[4],
    thumbnail: 'https://images.pexels.com/photos/4778413/pexels-photo-4778413.jpeg?auto=compress&cs=tinysrgb&w=600',
    level: 'intermediate',
    category: 'Grammar & Structure',
    subcategory: 'Complete Grammar',
    rating: 4.7,
    totalLessons: 35,
    totalDuration: '55 hours',
    price: 199.99,
    originalPrice: 269.99,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-16',
    features: [
      'Progressive Grammar System',
      'Interactive Practice Exercises',
      'Error Correction Training',
      'Grammar Reference Guide',
      'Real-world Applications',
      'Writing Improvement Focus',
      'Practice Worksheets',
      'Grammar Confidence Building'
    ],
    learningOutcomes: [
      'Master all English tenses and aspects',
      'Use complex sentence structures correctly',
      'Eliminate common grammar errors',
      'Improve writing accuracy significantly',
      'Develop grammatical intuition',
      'Understand advanced grammar concepts',
      'Apply grammar in real contexts'
    ],
    prerequisites: ['Basic English vocabulary', 'Elementary sentence structure knowledge'],
    targetAudience: ['Grammar improvement seekers', 'Writing accuracy builders', 'Test preparation students', 'Academic writers'],
    difficulty: 3,
    language: 'English',
    subtitles: ['Vietnamese', 'English'],
    certificate: true,
    downloadableResources: true,
    mobileAccess: true,
    lifetimeAccess: true,
    tags: ['Grammar', 'Structure', 'Writing', 'Accuracy', 'Foundation', 'Complete'],
    status: 'published',
    enrollmentCount: 1320,
    completionRate: 91,
    lastUpdated: '2024-01-16',
    estimatedHours: 55,
    skillLevel: 'Elementary to Upper-Intermediate',
    courseFormat: 'self-paced',
    assessmentType: ['Grammar Tests', 'Error Correction Exercises', 'Writing Assessments', 'Progress Tracking'],
    curriculum: {
      modules: [
        { title: 'Basic Grammar Foundations', lessons: 8, duration: '12 hours', objectives: ['Sentence structure', 'Basic tenses', 'Parts of speech'] },
        { title: 'Intermediate Grammar Skills', lessons: 12, duration: '20 hours', objectives: ['Complex tenses', 'Conditionals', 'Passive voice'] },
        { title: 'Advanced Grammar Concepts', lessons: 10, duration: '15 hours', objectives: ['Subjunctive mood', 'Advanced structures', 'Formal writing'] },
        { title: 'Grammar in Context', lessons: 5, duration: '8 hours', objectives: ['Real-world application', 'Error avoidance', 'Style improvement'] }
      ]
    },
    practiceTests: 6,
    liveSessionsIncluded: false,
    guaranteedResults: false
  },
  {
    id: 'academic-writing-masters',
    title: 'Academic Writing for Graduate Studies',
    description: 'Advanced academic writing course for graduate students and researchers. Master thesis writing, research papers, scholarly communication, and publication-ready academic prose with expert guidance.',
    shortDescription: 'Master graduate-level academic writing and scholarly communication.',
    instructor: comprehensiveInstructors[5],
    thumbnail: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=600',
    level: 'expert',
    category: 'Academic Skills',
    subcategory: 'Graduate Writing',
    rating: 4.9,
    totalLessons: 30,
    totalDuration: '50 hours',
    price: 399.99,
    originalPrice: 529.99,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-21',
    features: [
      'PhD-Level Instruction',
      'Thesis Writing Guidance',
      'Research Paper Mastery',
      'Publication Preparation',
      'Academic Style Training',
      'Citation Mastery',
      'Peer Review Process',
      'Conference Presentation Skills'
    ],
    learningOutcomes: [
      'Write publication-quality research papers',
      'Master thesis and dissertation writing',
      'Develop compelling academic arguments',
      'Use advanced academic vocabulary',
      'Perfect citation and referencing',
      'Understand peer review process',
      'Prepare conference presentations'
    ],
    prerequisites: ['Advanced English proficiency', 'Graduate study enrollment', 'Research experience'],
    targetAudience: ['PhD students', 'Graduate researchers', 'Academic professionals', 'Publication seekers'],
    difficulty: 5,
    language: 'English',
    subtitles: ['Vietnamese', 'English'],
    certificate: true,
    downloadableResources: true,
    mobileAccess: true,
    lifetimeAccess: true,
    tags: ['Academic', 'PhD', 'Research', 'Publication', 'Thesis', 'Graduate'],
    status: 'published',
    enrollmentCount: 280,
    completionRate: 86,
    lastUpdated: '2024-01-21',
    estimatedHours: 50,
    skillLevel: 'Advanced to Expert',
    courseFormat: 'instructor-led',
    assessmentType: ['Research Paper Writing', 'Thesis Chapters', 'Academic Presentations', 'Peer Review'],
    curriculum: {
      modules: [
        { title: 'Academic Writing Foundations', lessons: 6, duration: '10 hours', objectives: ['Academic style', 'Structure mastery', 'Voice development'] },
        { title: 'Research & Documentation', lessons: 8, duration: '15 hours', objectives: ['Research methods', 'Source evaluation', 'Citation systems'] },
        { title: 'Thesis & Dissertation Writing', lessons: 10, duration: '18 hours', objectives: ['Thesis structure', 'Chapter development', 'Argument construction'] },
        { title: 'Publication & Presentation', lessons: 6, duration: '7 hours', objectives: ['Journal submission', 'Conference presentations', 'Academic networking'] }
      ]
    },
    practiceTests: 0,
    liveSessionsIncluded: true,
    guaranteedResults: false
  },
  {
    id: 'conversation-fluency-advanced',
    title: 'Advanced Conversation Fluency Program',
    description: 'Develop natural, confident speaking skills through advanced conversation techniques, cultural communication, debate skills, and fluency-building exercises with native speaker instructors.',
    shortDescription: 'Achieve natural conversation fluency with advanced speaking techniques.',
    instructor: comprehensiveInstructors[2],
    thumbnail: 'https://images.pexels.com/photos/5212317/pexels-photo-5212317.jpeg?auto=compress&cs=tinysrgb&w=600',
    level: 'intermediate',
    category: 'Speaking & Conversation',
    subcategory: 'Advanced Conversation',
    rating: 4.8,
    totalLessons: 40,
    totalDuration: '60 hours',
    price: 279.99,
    originalPrice: 359.99,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-15',
    features: [
      'Native Speaker Conversations',
      'Real-life Scenario Practice',
      'Advanced Vocabulary Development',
      'Cultural Communication Training',
      'Debate & Discussion Skills',
      'Fluency Building Techniques',
      'Confidence Coaching',
      'Accent Improvement'
    ],
    learningOutcomes: [
      'Speak English naturally and confidently',
      'Handle complex conversation topics',
      'Engage in debates and discussions',
      'Understand cultural communication styles',
      'Improve pronunciation and intonation',
      'Build advanced conversational vocabulary',
      'Develop quick thinking in English'
    ],
    prerequisites: ['Intermediate English level', 'Basic conversation ability', 'Willingness to speak'],
    targetAudience: ['Fluency improvers', 'Confidence builders', 'Social English learners', 'Professional communicators'],
    difficulty: 3,
    language: 'English',
    subtitles: ['Vietnamese', 'English'],
    certificate: true,
    downloadableResources: true,
    mobileAccess: true,
    lifetimeAccess: true,
    tags: ['Speaking', 'Conversation', 'Fluency', 'Advanced', 'Native Speaker', 'Confidence'],
    status: 'published',
    enrollmentCount: 890,
    completionRate: 87,
    lastUpdated: '2024-01-15',
    estimatedHours: 60,
    skillLevel: 'Intermediate to Upper-Intermediate',
    courseFormat: 'instructor-led',
    assessmentType: ['Speaking Evaluations', 'Conversation Practice', 'Fluency Assessment', 'Confidence Measurement'],
    curriculum: {
      modules: [
        { title: 'Conversation Foundations', lessons: 10, duration: '15 hours', objectives: ['Basic fluency', 'Natural rhythm', 'Common expressions'] },
        { title: 'Advanced Discussion Skills', lessons: 12, duration: '18 hours', objectives: ['Complex topics', 'Opinion expression', 'Argument development'] },
        { title: 'Cultural Communication', lessons: 10, duration: '15 hours', objectives: ['Cross-cultural awareness', 'Social contexts', 'Appropriate registers'] },
        { title: 'Fluency Mastery', lessons: 8, duration: '12 hours', objectives: ['Natural flow', 'Spontaneous speaking', 'Confidence building'] }
      ]
    },
    practiceTests: 0,
    liveSessionsIncluded: true,
    guaranteedResults: false
  },
  {
    id: 'young-learners-interactive',
    title: 'Interactive English for Young Learners',
    description: 'Engaging English program designed for children aged 6-14. Features games, songs, interactive activities, storytelling, and age-appropriate content that makes learning fun and effective.',
    shortDescription: 'Fun and engaging English program for children aged 6-14 with interactive learning.',
    instructor: comprehensiveInstructors[2],
    thumbnail: 'https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg?auto=compress&cs=tinysrgb&w=600',
    level: 'beginner',
    category: 'Young Learners',
    subcategory: 'Children English',
    rating: 4.9,
    totalLessons: 45,
    totalDuration: '70 hours',
    price: 199.99,
    originalPrice: 259.99,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-14',
    features: [
      'Age-Appropriate Content',
      'Interactive Games & Activities',
      'Educational Songs & Rhymes',
      'Animated Video Stories',
      'Art & Craft Integration',
      'Parent Progress Reports',
      'Native Speaker Instruction',
      'Fun Assessment Methods'
    ],
    learningOutcomes: [
      'Develop foundational English vocabulary',
      'Learn through play and interaction',
      'Build confidence in speaking English',
      'Understand simple instructions and stories',
      'Enjoy the English learning process',
      'Develop listening and comprehension skills',
      'Build social communication skills'
    ],
    prerequisites: ['Age 6-14 years', 'No prior English knowledge required', 'Enthusiasm for learning'],
    targetAudience: ['Children aged 6-14', 'Parents seeking quality English education', 'Young language learners'],
    difficulty: 1,
    language: 'English',
    subtitles: ['Vietnamese'],
    certificate: true,
    downloadableResources: true,
    mobileAccess: true,
    lifetimeAccess: true,
    tags: ['Kids', 'Children', 'Interactive', 'Games', 'Fun Learning', 'Young Learners'],
    status: 'published',
    enrollmentCount: 1650,
    completionRate: 96,
    lastUpdated: '2024-01-14',
    estimatedHours: 70,
    skillLevel: 'Beginner',
    courseFormat: 'blended',
    assessmentType: ['Fun Games', 'Creative Projects', 'Speaking Activities', 'Interactive Assessments'],
    curriculum: {
      modules: [
        { title: 'English Through Play', lessons: 12, duration: '18 hours', objectives: ['Basic vocabulary', 'Simple phrases', 'Interactive games'] },
        { title: 'Stories & Adventures', lessons: 15, duration: '22 hours', objectives: ['Story comprehension', 'Character dialogue', 'Creative expression'] },
        { title: 'Songs & Creativity', lessons: 10, duration: '15 hours', objectives: ['Musical learning', 'Rhythm & pronunciation', 'Creative arts'] },
        { title: 'Communication Skills', lessons: 8, duration: '15 hours', objectives: ['Social interaction', 'Presentation skills', 'Confidence building'] }
      ]
    },
    practiceTests: 0,
    liveSessionsIncluded: true,
    guaranteedResults: false
  },
  {
    id: 'pronunciation-accent-mastery',
    title: 'Pronunciation & Accent Mastery Program',
    description: 'Master English pronunciation with advanced phonetics training, accent reduction techniques, speech clarity improvement, and confidence building for professional and academic communication.',
    shortDescription: 'Perfect your English pronunciation with expert phonetics and accent training.',
    instructor: comprehensiveInstructors[2],
    thumbnail: 'https://images.pexels.com/photos/3771115/pexels-photo-3771115.jpeg?auto=compress&cs=tinysrgb&w=600',
    level: 'intermediate',
    category: 'Pronunciation',
    subcategory: 'Accent Training',
    rating: 4.8,
    totalLessons: 25,
    totalDuration: '40 hours',
    price: 229.99,
    originalPrice: 299.99,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-13',
    features: [
      'Advanced Phonetics Training',
      'Accent Reduction Techniques',
      'Speech Analysis Technology',
      'Individual Recording Practice',
      'Native Speaker Feedback',
      'Pronunciation Drills',
      'Confidence Building',
      'Professional Speech Training'
    ],
    learningOutcomes: [
      'Achieve clear, professional pronunciation',
      'Reduce accent interference effectively',
      'Master all English sounds and phonemes',
      'Develop natural speech rhythm',
      'Build speaking confidence',
      'Improve professional communication',
      'Sound more native-like'
    ],
    prerequisites: ['Basic to intermediate English', 'Speaking practice willingness', 'Recording capability'],
    targetAudience: ['Accent improvement seekers', 'Professional speakers', 'Confidence builders', 'Public speakers'],
    difficulty: 3,
    language: 'English',
    subtitles: ['Vietnamese', 'English'],
    certificate: true,
    downloadableResources: true,
    mobileAccess: true,
    lifetimeAccess: true,
    tags: ['Pronunciation', 'Accent', 'Phonetics', 'Speech', 'Clarity', 'Professional'],
    status: 'published',
    enrollmentCount: 520,
    completionRate: 89,
    lastUpdated: '2024-01-13',
    estimatedHours: 40,
    skillLevel: 'Intermediate',
    courseFormat: 'instructor-led',
    assessmentType: ['Pronunciation Tests', 'Speech Recording Analysis', 'Progress Tracking', 'Clarity Assessment'],
    curriculum: {
      modules: [
        { title: 'English Phonetics Fundamentals', lessons: 6, duration: '10 hours', objectives: ['Sound system', 'IPA symbols', 'Phonetic awareness'] },
        { title: 'Vowel & Consonant Mastery', lessons: 8, duration: '14 hours', objectives: ['Precise articulation', 'Minimal pairs', 'Sound discrimination'] },
        { title: 'Rhythm & Intonation', lessons: 6, duration: '10 hours', objectives: ['Natural rhythm', 'Stress patterns', 'Intonation variety'] },
        { title: 'Professional Speech', lessons: 5, duration: '6 hours', objectives: ['Presentation skills', 'Professional tone', 'Confidence building'] }
      ]
    },
    practiceTests: 0,
    liveSessionsIncluded: true,
    guaranteedResults: false
  },
  {
    id: 'literature-critical-analysis',
    title: 'English Literature & Critical Analysis',
    description: 'Explore masterpieces of English literature with advanced critical analysis, literary theory application, cultural context understanding, and sophisticated academic discussion skills.',
    shortDescription: 'Explore English literature with advanced critical analysis and academic discussion.',
    instructor: comprehensiveInstructors[5],
    thumbnail: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=600',
    level: 'advanced',
    category: 'Literature & Culture',
    subcategory: 'Literary Analysis',
    rating: 4.9,
    totalLessons: 35,
    totalDuration: '60 hours',
    price: 349.99,
    originalPrice: 449.99,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-12',
    features: [
      'Classical & Contemporary Literature',
      'Critical Theory Application',
      'Cultural Context Analysis',
      'Academic Discussion Forums',
      'Essay Writing Mastery',
      'Literary Research Methods',
      'Oxford-Level Instruction',
      'Intellectual Development'
    ],
    learningOutcomes: [
      'Analyze literary works with sophistication',
      'Apply critical theory frameworks',
      'Understand historical and cultural contexts',
      'Write compelling literary essays',
      'Engage in academic discussions',
      'Develop advanced analytical thinking',
      'Appreciate literary artistry'
    ],
    prerequisites: ['Advanced English proficiency', 'Interest in literature', 'Academic writing skills'],
    targetAudience: ['Literature enthusiasts', 'Advanced learners', 'Academic students', 'Cultural learners'],
    difficulty: 5,
    language: 'English',
    subtitles: ['Vietnamese', 'English'],
    certificate: true,
    downloadableResources: true,
    mobileAccess: true,
    lifetimeAccess: true,
    tags: ['Literature', 'Critical Analysis', 'Culture', 'Advanced', 'Academic', 'Oxford'],
    status: 'published',
    enrollmentCount: 240,
    completionRate: 82,
    lastUpdated: '2024-01-12',
    estimatedHours: 60,
    skillLevel: 'Advanced',
    courseFormat: 'instructor-led',
    assessmentType: ['Literary Essays', 'Critical Analysis Papers', 'Discussion Participation', 'Research Projects'],
    curriculum: {
      modules: [
        { title: 'Literary Analysis Foundations', lessons: 8, duration: '14 hours', objectives: ['Critical reading', 'Analysis techniques', 'Literary elements'] },
        { title: 'Classical Literature Studies', lessons: 12, duration: '20 hours', objectives: ['Shakespeare analysis', 'Victorian literature', 'Romantic poetry'] },
        { title: 'Contemporary Literature', lessons: 10, duration: '18 hours', objectives: ['Modern fiction', 'Postmodern techniques', 'Global perspectives'] },
        { title: 'Critical Theory & Research', lessons: 5, duration: '8 hours', objectives: ['Theory application', 'Research methods', 'Academic writing'] }
      ]
    },
    practiceTests: 0,
    liveSessionsIncluded: true,
    guaranteedResults: false
  },
  {
    id: 'cambridge-certification-complete',
    title: 'Cambridge English Certification Program',
    description: 'Comprehensive preparation for Cambridge English examinations including FCE, CAE, and CPE. Master exam techniques, practice with authentic materials, and achieve your certification goals.',
    shortDescription: 'Master Cambridge English certifications with comprehensive exam preparation.',
    instructor: comprehensiveInstructors[0],
    thumbnail: 'https://images.pexels.com/photos/159844/cellular-education-classroom-159844.jpeg?auto=compress&cs=tinysrgb&w=600',
    level: 'advanced',
    category: 'Cambridge Preparation',
    subcategory: 'Cambridge Exams',
    rating: 4.8,
    totalLessons: 50,
    totalDuration: '75 hours',
    price: 399.99,
    originalPrice: 519.99,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-11',
    features: [
      'FCE, CAE, CPE Preparation',
      'Authentic Cambridge Materials',
      'Expert Exam Strategies',
      'Speaking Practice Sessions',
      'Writing Feedback & Improvement',
      'Mock Examination Practice',
      'Certification Guidance',
      'University Pathway Support'
    ],
    learningOutcomes: [
      'Pass Cambridge English examinations',
      'Master advanced exam techniques',
      'Improve all four language skills',
      'Build examination confidence',
      'Achieve target certification grades',
      'Develop academic English proficiency',
      'Prepare for university studies'
    ],
    prerequisites: ['Upper-intermediate to advanced English', 'Examination goals', 'Study commitment'],
    targetAudience: ['Certification seekers', 'University applicants', 'Professional development', 'Academic advancement'],
    difficulty: 4,
    language: 'English',
    subtitles: ['Vietnamese', 'English'],
    certificate: true,
    downloadableResources: true,
    mobileAccess: true,
    lifetimeAccess: true,
    tags: ['Cambridge', 'FCE', 'CAE', 'CPE', 'Certification', 'University'],
    status: 'published',
    enrollmentCount: 430,
    completionRate: 86,
    lastUpdated: '2024-01-11',
    estimatedHours: 75,
    skillLevel: 'Upper-Intermediate to Advanced',
    courseFormat: 'instructor-led',
    assessmentType: ['Mock Examinations', 'Skill Tests', 'Speaking Assessments', 'Writing Evaluations'],
    curriculum: {
      modules: [
        { title: 'Cambridge Exam Overview', lessons: 10, duration: '15 hours', objectives: ['Exam formats', 'Scoring systems', 'Strategic planning'] },
        { title: 'Reading & Use of English', lessons: 15, duration: '25 hours', objectives: ['Reading strategies', 'Language accuracy', 'Time management'] },
        { title: 'Writing Skills Development', lessons: 12, duration: '20 hours', objectives: ['Essay writing', 'Report writing', 'Review techniques'] },
        { title: 'Listening & Speaking', lessons: 13, duration: '15 hours', objectives: ['Listening strategies', 'Speaking confidence', 'Interaction skills'] }
      ]
    },
    practiceTests: 10,
    liveSessionsIncluded: true,
    guaranteedResults: false
  },
  {
    id: 'english-specific-purposes',
    title: 'English for Specific Purposes (ESP)',
    description: 'Specialized English courses for specific industries including Medical English, Legal English, Engineering English, and Tourism English with professional terminology and workplace contexts.',
    shortDescription: 'Master English for your specific professional field with industry-focused training.',
    instructor: comprehensiveInstructors[1],
    thumbnail: 'https://images.pexels.com/photos/48604/pexels-photo-48604.jpeg?auto=compress&cs=tinysrgb&w=600',
    level: 'intermediate',
    category: 'Professional English',
    subcategory: 'Industry-Specific',
    rating: 4.7,
    totalLessons: 36,
    totalDuration: '55 hours',
    price: 329.99,
    originalPrice: 429.99,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-10',
    features: [
      'Industry-Specific Modules',
      'Professional Terminology',
      'Workplace Scenario Training',
      'Technical Communication',
      'Case Study Analysis',
      'Expert Guest Instructors',
      'Certification Pathways',
      'Career Advancement Focus'
    ],
    learningOutcomes: [
      'Master professional industry vocabulary',
      'Communicate effectively in work contexts',
      'Handle industry-specific documentation',
      'Build professional networks in English',
      'Advance career prospects internationally',
      'Understand technical communication',
      'Excel in specialized environments'
    ],
    prerequisites: ['Intermediate English level', 'Professional background', 'Industry experience'],
    targetAudience: ['Healthcare professionals', 'Legal professionals', 'Engineers', 'Tourism workers', 'Technical specialists'],
    difficulty: 3,
    language: 'English',
    subtitles: ['Vietnamese', 'English'],
    certificate: true,
    downloadableResources: true,
    mobileAccess: true,
    lifetimeAccess: true,
    tags: ['Professional', 'Industry', 'Medical', 'Legal', 'Technical', 'Specialized'],
    status: 'published',
    enrollmentCount: 380,
    completionRate: 84,
    lastUpdated: '2024-01-10',
    estimatedHours: 55,
    skillLevel: 'Intermediate to Advanced',
    courseFormat: 'blended',
    assessmentType: ['Professional Simulations', 'Case Study Analysis', 'Technical Presentations', 'Industry Projects'],
    curriculum: {
      modules: [
        { title: 'Professional Communication Basics', lessons: 8, duration: '12 hours', objectives: ['Workplace English', 'Professional etiquette', 'Communication styles'] },
        { title: 'Industry-Specific Vocabulary', lessons: 12, duration: '20 hours', objectives: ['Technical terms', 'Industry jargon', 'Specialized contexts'] },
        { title: 'Workplace Scenarios', lessons: 10, duration: '15 hours', objectives: ['Real situations', 'Problem solving', 'Professional interactions'] },
        { title: 'Career Development', lessons: 6, duration: '8 hours', objectives: ['Networking skills', 'Career advancement', 'Professional presentation'] }
      ]
    },
    practiceTests: 0,
    liveSessionsIncluded: true,
    guaranteedResults: false
  },
  {
    id: 'ai-enhanced-learning',
    title: 'AI-Enhanced English Learning System',
    description: 'Revolutionary English learning experience powered by artificial intelligence. Features personalized learning paths, adaptive assessments, intelligent feedback, and data-driven progress optimization.',
    shortDescription: 'Experience revolutionary AI-powered English learning with personalized optimization.',
    instructor: comprehensiveInstructors[6],
    thumbnail: 'https://images.pexels.com/photos/8867482/pexels-photo-8867482.jpeg?auto=compress&cs=tinysrgb&w=600',
    level: 'intermediate',
    category: 'AI-Powered Learning',
    subcategory: 'Adaptive Learning',
    rating: 4.8,
    totalLessons: 40,
    totalDuration: '50 hours',
    price: 279.99,
    originalPrice: 369.99,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-09',
    features: [
      'AI-Powered Personalization',
      'Adaptive Learning Algorithms',
      'Intelligent Progress Tracking',
      'Personalized Feedback Systems',
      'Data-Driven Optimization',
      'Smart Content Recommendation',
      'Predictive Assessment',
      'Machine Learning Integration'
    ],
    learningOutcomes: [
      'Experience personalized learning journey',
      'Optimize study time with AI insights',
      'Receive intelligent feedback and recommendations',
      'Track detailed progress analytics',
      'Adapt learning to personal style',
      'Achieve faster skill development',
      'Master technology-enhanced education'
    ],
    prerequisites: ['Basic to intermediate English', 'Comfort with technology', 'Open mindset for innovation'],
    targetAudience: ['Tech-savvy learners', 'Efficiency seekers', 'Data-driven students', 'Innovation enthusiasts'],
    difficulty: 3,
    language: 'English',
    subtitles: ['Vietnamese', 'English'],
    certificate: true,
    downloadableResources: true,
    mobileAccess: true,
    lifetimeAccess: true,
    tags: ['AI', 'Technology', 'Personalized', 'Adaptive', 'Innovation', 'Data-Driven'],
    status: 'published',
    enrollmentCount: 620,
    completionRate: 91,
    lastUpdated: '2024-01-09',
    estimatedHours: 50,
    skillLevel: 'Intermediate',
    courseFormat: 'self-paced',
    assessmentType: ['Adaptive Tests', 'AI Evaluations', 'Progress Analytics', 'Personalized Assessments'],
    curriculum: {
      modules: [
        { title: 'AI Learning Introduction', lessons: 8, duration: '10 hours', objectives: ['AI learning concepts', 'Personalization setup', 'Goal setting'] },
        { title: 'Adaptive Skill Building', lessons: 15, duration: '20 hours', objectives: ['Personalized practice', 'Skill gap analysis', 'Targeted improvement'] },
        { title: 'Intelligent Feedback Systems', lessons: 10, duration: '12 hours', objectives: ['Real-time feedback', 'Error pattern analysis', 'Improvement recommendations'] },
        { title: 'Data-Driven Optimization', lessons: 7, duration: '8 hours', objectives: ['Progress analytics', 'Learning optimization', 'Performance prediction'] }
      ]
    },
    practiceTests: 0,
    liveSessionsIncluded: false,
    guaranteedResults: false
  },
  {
    id: 'research-writing-publishing',
    title: 'Research Writing & Academic Publishing',
    description: 'Advanced course for researchers and academics focusing on scholarly writing, research methodology, academic publishing, and international conference presentation skills.',
    shortDescription: 'Master research writing and academic publishing for international scholarly success.',
    instructor: comprehensiveInstructors[5],
    thumbnail: 'https://images.pexels.com/photos/159844/cellular-education-classroom-159844.jpeg?auto=compress&cs=tinysrgb&w=600',
    level: 'expert',
    category: 'Academic Skills',
    subcategory: 'Research & Publishing',
    rating: 4.9,
    totalLessons: 28,
    totalDuration: '45 hours',
    price: 449.99,
    originalPrice: 599.99,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-08',
    features: [
      'PhD-Level Research Training',
      'Academic Publishing Guidance',
      'Journal Submission Support',
      'Conference Presentation Skills',
      'Research Methodology Training',
      'Peer Review Process',
      'International Collaboration',
      'Scholar Network Access'
    ],
    learningOutcomes: [
      'Publish in international journals',
      'Master research paper structure',
      'Develop compelling research proposals',
      'Excel in peer review process',
      'Present at international conferences',
      'Build academic reputation',
      'Collaborate with global researchers'
    ],
    prerequisites: ['Advanced English proficiency', 'Research experience', 'Academic background', 'Publication goals'],
    targetAudience: ['PhD researchers', 'Academic faculty', 'Research scientists', 'Publication seekers'],
    difficulty: 5,
    language: 'English',
    subtitles: ['Vietnamese', 'English'],
    certificate: true,
    downloadableResources: true,
    mobileAccess: true,
    lifetimeAccess: true,
    tags: ['Research', 'Academic', 'Publishing', 'PhD', 'Scholarly', 'International'],
    status: 'published',
    enrollmentCount: 150,
    completionRate: 78,
    lastUpdated: '2024-01-08',
    estimatedHours: 45,
    skillLevel: 'Expert',
    courseFormat: 'instructor-led',
    assessmentType: ['Research Papers', 'Journal Article Writing', 'Conference Presentations', 'Peer Review Practice'],
    curriculum: {
      modules: [
        { title: 'Research Writing Foundations', lessons: 6, duration: '10 hours', objectives: ['Academic style', 'Research structure', 'Scholarly voice'] },
        { title: 'Methodology & Documentation', lessons: 8, duration: '15 hours', objectives: ['Research methods', 'Citation mastery', 'Literature review'] },
        { title: 'Publication Process', lessons: 8, duration: '12 hours', objectives: ['Journal selection', 'Submission process', 'Revision techniques'] },
        { title: 'Conference & Collaboration', lessons: 6, duration: '8 hours', objectives: ['Presentation skills', 'Academic networking', 'International collaboration'] }
      ]
    },
    practiceTests: 0,
    liveSessionsIncluded: true,
    guaranteedResults: false
  },
  {
    id: 'business-writing-professional',
    title: 'Professional Business Writing Mastery',
    description: 'Master all forms of business writing including reports, proposals, presentations, email communication, and strategic documentation for corporate success.',
    shortDescription: 'Master professional business writing for corporate communication excellence.',
    instructor: comprehensiveInstructors[1],
    thumbnail: 'https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=600',
    level: 'intermediate',
    category: 'Business English',
    subcategory: 'Business Writing',
    rating: 4.7,
    totalLessons: 30,
    totalDuration: '45 hours',
    price: 189.99,
    originalPrice: 249.99,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-07',
    features: [
      'Professional Writing Templates',
      'Corporate Communication Style',
      'Report & Proposal Writing',
      'Email Mastery Training',
      'Strategic Documentation',
      'Business Presentation Writing',
      'Executive Summary Skills',
      'Client Communication'
    ],
    learningOutcomes: [
      'Write compelling business reports',
      'Create persuasive proposals',
      'Master professional email communication',
      'Develop strategic documentation skills',
      'Improve corporate writing style',
      'Build professional credibility',
      'Enhance career prospects'
    ],
    prerequisites: ['Intermediate English', 'Basic business knowledge', 'Professional goals'],
    targetAudience: ['Business professionals', 'Corporate employees', 'Entrepreneurs', 'Career developers'],
    difficulty: 3,
    language: 'English',
    subtitles: ['Vietnamese', 'English'],
    certificate: true,
    downloadableResources: true,
    mobileAccess: true,
    lifetimeAccess: true,
    tags: ['Business Writing', 'Professional', 'Corporate', 'Reports', 'Proposals', 'Communication'],
    status: 'published',
    enrollmentCount: 750,
    completionRate: 89,
    lastUpdated: '2024-01-07',
    estimatedHours: 45,
    skillLevel: 'Intermediate to Advanced',
    courseFormat: 'blended',
    assessmentType: ['Writing Projects', 'Business Simulations', 'Professional Portfolio', 'Peer Review'],
    curriculum: {
      modules: [
        { title: 'Business Writing Fundamentals', lessons: 8, duration: '12 hours', objectives: ['Professional style', 'Business tone', 'Structure basics'] },
        { title: 'Reports & Documentation', lessons: 10, duration: '16 hours', objectives: ['Report writing', 'Data presentation', 'Executive summaries'] },
        { title: 'Proposals & Presentations', lessons: 8, duration: '12 hours', objectives: ['Persuasive writing', 'Proposal structure', 'Presentation scripts'] },
        { title: 'Strategic Communication', lessons: 4, duration: '5 hours', objectives: ['Strategic messaging', 'Stakeholder communication', 'Leadership writing'] }
      ]
    },
    practiceTests: 0,
    liveSessionsIncluded: true,
    guaranteedResults: false
  }
];

// Extended Course Categories
export const extendedCourseCategories = [
  {
    id: 'ielts-prep-advanced',
    name: 'IELTS Preparation',
    description: 'Comprehensive IELTS preparation with guaranteed results and expert instruction',
    icon: '🎯',
    color: '#3B82F6',
    courseCount: 5,
    averageRating: 4.8,
    difficulty: 'Advanced',
    estimatedTime: '60-90 hours',
    features: ['Band Score Guarantee', 'Expert Examiners', 'Live Practice', 'Personalized Feedback']
  },
  {
    id: 'business-professional',
    name: 'Business English',
    description: 'Professional communication skills for global business success',
    icon: '💼',
    color: '#10B981',
    courseCount: 6,
    averageRating: 4.7,
    difficulty: 'Intermediate-Advanced',
    estimatedTime: '40-65 hours',
    features: ['Real Business Cases', 'Executive Training', 'Industry Focus', 'Career Development']
  },
  {
    id: 'general-foundation',
    name: 'General English',
    description: 'Foundation and conversational English for confident communication',
    icon: '🗣️',
    color: '#8B5CF6',
    courseCount: 8,
    averageRating: 4.8,
    difficulty: 'Beginner-Intermediate',
    estimatedTime: '30-75 hours',
    features: ['Native Speakers', 'Interactive Learning', 'Confidence Building', 'Cultural Context']
  },
  {
    id: 'test-preparation-expert',
    name: 'Test Preparation',
    description: 'Expert preparation for all major English proficiency tests',
    icon: '📝',
    color: '#F59E0B',
    courseCount: 4,
    averageRating: 4.9,
    difficulty: 'Advanced',
    estimatedTime: '50-85 hours',
    features: ['Score Guarantees', 'Official Materials', 'Expert Strategies', 'University Support']
  },
  {
    id: 'academic-excellence',
    name: 'Academic Skills',
    description: 'Advanced academic writing and research skills for university success',
    icon: '🎓',
    color: '#EF4444',
    courseCount: 3,
    averageRating: 4.9,
    difficulty: 'Advanced-Expert',
    estimatedTime: '40-60 hours',
    features: ['PhD-Level Training', 'Publication Support', 'Research Methods', 'Academic Excellence']
  },
  {
    id: 'young-learners-fun',
    name: 'Young Learners',
    description: 'Engaging English programs designed specifically for children',
    icon: '👶',
    color: '#EC4899',
    courseCount: 3,
    averageRating: 4.9,
    difficulty: 'Age-Appropriate',
    estimatedTime: '50-70 hours',
    features: ['Interactive Games', 'Native Speakers', 'Age-Appropriate', 'Parent Reports']
  },
  {
    id: 'pronunciation-phonetics',
    name: 'Pronunciation',
    description: 'Master English pronunciation with phonetics and accent training',
    icon: '🎵',
    color: '#14B8A6',
    courseCount: 2,
    averageRating: 4.8,
    difficulty: 'Intermediate',
    estimatedTime: '30-40 hours',
    features: ['Phonetics Training', 'Accent Reduction', 'Speech Analysis', 'Native Feedback']
  },
  {
    id: 'literature-culture',
    name: 'Literature & Culture',
    description: 'Explore English literature with advanced critical analysis',
    icon: '📚',
    color: '#7C3AED',
    courseCount: 2,
    averageRating: 4.9,
    difficulty: 'Advanced',
    estimatedTime: '50-60 hours',
    features: ['Oxford Instruction', 'Critical Analysis', 'Cultural Context', 'Literary Theory']
  },
  {
    id: 'professional-industry',
    name: 'Professional English',
    description: 'Industry-specific English for professional advancement',
    icon: '🏭',
    color: '#059669',
    courseCount: 3,
    averageRating: 4.7,
    difficulty: 'Intermediate-Advanced',
    estimatedTime: '45-55 hours',
    features: ['Industry Focus', 'Professional Terms', 'Career Development', 'Certification']
  },
  {
    id: 'cambridge-certification',
    name: 'Cambridge Preparation',
    description: 'Comprehensive Cambridge English certification preparation',
    icon: '🏆',
    color: '#DC2626',
    courseCount: 2,
    averageRating: 4.8,
    difficulty: 'Advanced',
    estimatedTime: '60-75 hours',
    features: ['Official Materials', 'Expert Instruction', 'Mock Exams', 'Certification Support']
  }
];

// Comprehensive Learning Paths
export const comprehensiveLearningPaths = [
  {
    id: 'complete-beginner-journey',
    title: 'Complete Beginner to Advanced Journey',
    description: 'Comprehensive pathway from zero English to advanced proficiency with structured progression',
    level: 'Beginner to Advanced',
    estimatedDuration: '12-18 months',
    courses: comprehensiveCourses.filter(c => ['foundation-english-complete', 'grammar-mastery-complete', 'conversation-fluency-advanced'].includes(c.id)),
    prerequisites: ['No prior English knowledge required'],
    outcomes: ['Advanced English proficiency', 'Confident communication', 'Academic readiness'],
    difficulty: 3,
    popularity: 96,
    category: 'Complete Program',
    tags: ['Comprehensive', 'Structured', 'Progressive', 'Complete']
  },
  {
    id: 'university-admission-track',
    title: 'University Admission Success Track',
    description: 'Complete preparation for international university admissions with IELTS/TOEFL mastery',
    level: 'Intermediate to Expert',
    estimatedDuration: '8-12 months',
    courses: comprehensiveCourses.filter(c => ['ielts-band7-guarantee', 'toefl-100-plus-success', 'academic-writing-masters'].includes(c.id)),
    prerequisites: ['Intermediate English level', 'University admission goals'],
    outcomes: ['University admission', 'Academic excellence', 'Scholarship eligibility'],
    difficulty: 4,
    popularity: 89,
    category: 'University Preparation',
    tags: ['University', 'Admission', 'Scholarship', 'Academic']
  },
  {
    id: 'business-executive-mastery',
    title: 'Business Executive Mastery Path',
    description: 'Complete business English mastery for executive-level professional success',
    level: 'Intermediate to Expert',
    estimatedDuration: '6-10 months',
    courses: comprehensiveCourses.filter(c => ['business-english-executive', 'business-writing-professional', 'english-specific-purposes'].includes(c.id)),
    prerequisites: ['Business experience', 'Intermediate English', 'Leadership goals'],
    outcomes: ['Executive communication', 'International leadership', 'Career advancement'],
    difficulty: 4,
    popularity: 85,
    category: 'Executive Development',
    tags: ['Executive', 'Leadership', 'Professional', 'Career']
  },
  {
    id: 'academic-research-excellence',
    title: 'Academic Research Excellence Path',
    description: 'Advanced pathway for researchers and academics pursuing scholarly excellence',
    level: 'Advanced to Expert',
    estimatedDuration: '6-8 months',
    courses: comprehensiveCourses.filter(c => ['research-writing-publishing', 'literature-critical-analysis', 'academic-writing-masters'].includes(c.id)),
    prerequisites: ['Advanced English', 'Research background', 'Academic goals'],
    outcomes: ['Publication success', 'Academic recognition', 'Research excellence'],
    difficulty: 5,
    popularity: 78,
    category: 'Academic Research',
    tags: ['Research', 'Academic', 'Publication', 'Excellence']
  }
];

// Comprehensive Sample Students
export const sampleStudents = [
  {
    id: 'student-001',
    name: 'Nguyen Minh Duc',
    email: 'duc.nguyen@example.com',
    age: 22,
    level: 'Advanced',
    course: 'IELTS Band 7+ Guarantee Program',
    progress: 85,
    joinDate: '2023-09-15',
    targetScore: 'IELTS 8.0',
    background: 'Engineering student at Hanoi University of Science and Technology',
    goals: ['MIT Graduate School admission', 'Research career in AI'],
    achievements: ['IELTS 7.5 achieved', 'MIT interview secured', 'Scholarship finalist'],
    image: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150'
  },
  {
    id: 'student-002',
    name: 'Tran Thi Mai',
    email: 'mai.tran@example.com',
    age: 28,
    level: 'Intermediate',
    course: 'Business English for Executives',
    progress: 92,
    joinDate: '2023-08-20',
    targetScore: 'Business Fluency',
    background: 'Marketing Manager at Samsung Vietnam',
    goals: ['Regional Director promotion', 'International team leadership'],
    achievements: ['Promoted to Senior Manager', 'Led international project', 'Fluency certified'],
    image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150'
  },
  {
    id: 'student-003',
    name: 'Le Van Hung',
    email: 'hung.le@example.com',
    age: 25,
    level: 'Beginner',
    course: 'Complete English Foundation Program',
    progress: 78,
    joinDate: '2023-10-01',
    targetScore: 'Conversational Fluency',
    background: 'Software Developer transitioning to international work',
    goals: ['Work for international tech company', 'Remote collaboration skills'],
    achievements: ['Zero to conversational in 4 months', 'First English job interview', 'Confidence breakthrough'],
    image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150'
  }
];

// Student Success Stories
export const studentSuccessStories: StudentSuccessStory[] = [
  {
    studentName: 'Nguyen Minh Duc',
    achievement: 'IELTS 8.5 → MIT Graduate School Admission',
    course: 'IELTS Band 7+ Guarantee Program',
    story: 'Achieved IELTS 8.5 and secured admission to MIT for Master\'s in Artificial Intelligence. Ms. Ledia\'s intensive preparation and strategic approach made the impossible possible.',
    beforeScore: 'IELTS 6.0',
    afterScore: 'IELTS 8.5',
    timeToComplete: '6 months',
    image: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150',
    universityAdmission: 'MIT - Master of Science in Artificial Intelligence',
    testimonialQuote: 'LERA Academy transformed my English from good to exceptional. The systematic approach and expert guidance helped me achieve my dream of studying at MIT.',
    location: 'Hanoi, Vietnam',
    currentPosition: 'MIT Graduate Student & Research Assistant'
  },
  {
    studentName: 'Tran Thi Mai',
    achievement: 'Business English Mastery → Regional Manager Promotion',
    course: 'Business English for Executives',
    story: 'Mastered business communication and got promoted to Regional Manager at Samsung. Now leading international teams across Southeast Asia with confidence.',
    timeToComplete: '8 months',
    image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150',
    careerAdvancement: 'Promoted from Manager to Regional Director at Samsung Vietnam',
    testimonialQuote: 'Mr. Mo\'s business English program gave me the confidence to lead international teams. My career transformation has been incredible.',
    location: 'Ho Chi Minh City, Vietnam',
    currentPosition: 'Regional Director, Samsung Electronics Vietnam'
  },
  {
    studentName: 'Le Van Hung',
    achievement: 'Zero English → Fluent in 6 Months',
    course: 'Complete English Foundation Program',
    story: 'Started with zero English knowledge and achieved conversational fluency in just 6 months. Now working for an international tech company remotely.',
    beforeScore: 'No English knowledge',
    afterScore: 'Conversational Fluency (B2)',
    timeToComplete: '6 months',
    image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
    careerAdvancement: 'Software Developer at International Tech Company',
    testimonialQuote: 'Ms. Sarah made learning English enjoyable and effective. I never thought I could become fluent so quickly!',
    location: 'Da Nang, Vietnam',
    currentPosition: 'Senior Software Developer, Remote International Team'
  },
  {
    studentName: 'Dr. Pham Minh Quan',
    achievement: 'Academic Publication → Nature Communications',
    course: 'Research Writing & Academic Publishing',
    story: 'Successfully published research in Nature Communications after mastering academic writing. Dr. Mitchell\'s guidance was instrumental in achieving publication success.',
    timeToComplete: '4 months',
    image: 'https://images.pexels.com/photos/5212324/pexels-photo-5212324.jpeg?auto=compress&cs=tinysrgb&w=150',
    universityAdmission: 'Postdoc Position at Oxford University',
    testimonialQuote: 'Dr. Mitchell\'s expertise in academic writing elevated my research to international publication standards. My career has reached new heights.',
    location: 'Hanoi, Vietnam',
    currentPosition: 'Postdoctoral Researcher, Oxford University'
  },
  {
    studentName: 'Hoang Thi Lan',
    achievement: 'TOEFL 105 → Harvard Medical School',
    course: 'TOEFL iBT 100+ Success Program',
    story: 'Achieved TOEFL 105 and gained admission to Harvard Medical School. Mr. Anderson\'s strategic approach and test expertise made the difference.',
    beforeScore: 'TOEFL 78',
    afterScore: 'TOEFL 105',
    timeToComplete: '5 months',
    image: 'https://images.pexels.com/photos/5212339/pexels-photo-5212339.jpeg?auto=compress&cs=tinysrgb&w=150',
    universityAdmission: 'Harvard Medical School - Doctor of Medicine',
    testimonialQuote: 'The TOEFL program at LERA Academy was incredibly comprehensive. Mr. Anderson\'s expertise helped me achieve my Harvard dream.',
    location: 'Hai Phong, Vietnam',
    currentPosition: 'Medical Student, Harvard University'
  },
  {
    studentName: 'Vu Van Nam',
    achievement: 'Cambridge CAE Grade A → Oxford Scholarship',
    course: 'Cambridge English Certification Program',
    story: 'Achieved Cambridge CAE with Grade A and received full scholarship to Oxford University for Master\'s in International Relations.',
    beforeScore: 'Cambridge B2 First',
    afterScore: 'Cambridge CAE Grade A',
    timeToComplete: '7 months',
    image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150',
    universityAdmission: 'Oxford University - Master\'s in International Relations (Full Scholarship)',
    testimonialQuote: 'The Cambridge preparation at LERA Academy was exceptional. The systematic approach and expert instruction led to my Oxford scholarship.',
    location: 'Hanoi, Vietnam',
    currentPosition: 'Oxford University Graduate Student'
  }
];

// Academy Statistics
export const academyStatistics: AcademyStatistics = {
  totalStudents: 12500,
  graduatedStudents: 8900,
  yearsOfExcellence: 7,
  successRate: 95,
  averageIELTSIncrease: '2.5 bands',
  countriesRepresented: 25,
  totalTeachingHours: 125000,
  universityAdmissions: 450,
  corporatePartnerships: 35,
  averageRating: 4.8,
  returnStudentRate: 89,
  courseCompletionRate: 91
};

// Comprehensive Lessons for all courses
export const comprehensiveLessons = [
  // IELTS Band 7+ Guarantee Program Lessons
  {
    id: 'ielts-lesson-001',
    title: 'IELTS Test Overview & Band Score System',
    description: 'Complete introduction to IELTS Academic test format, band score criteria, and strategic approach to achieving Band 7+.',
    duration: '90 min',
    videoUrl: 'https://example.com/video/ielts-001',
    courseId: 'ielts-band7-guarantee',
    order: 1,
    completed: false,
    type: 'video' as const,
    isPreview: true,
    objectives: [
      'Understand IELTS test format completely',
      'Learn band score criteria and requirements',
      'Develop personalized test strategy',
      'Set realistic Band 7+ targets'
    ],
    keyPoints: [
      'Four skills assessment structure',
      'Band score descriptors 0-9',
      'Test timing and time management',
      'Academic vs General Training differences',
      'Examiner expectations and criteria'
    ],
    vocabulary: [
      {
        word: 'Proficiency',
        definition: 'A high degree of competence or skill',
        pronunciation: '/prəˈfɪʃənsi/',
        example: 'IELTS measures your English proficiency level.',
        partOfSpeech: 'noun'
      },
      {
        word: 'Assessment',
        definition: 'The evaluation or estimation of something',
        pronunciation: '/əˈsesmənt/',
        example: 'The IELTS assessment covers four language skills.',
        partOfSpeech: 'noun'
      }
    ],
    exercises: [
      {
        id: 'ex-ielts-001',
        type: 'multiple-choice',
        question: 'What is the highest band score in IELTS?',
        options: ['8', '9', '10', '12'],
        correctAnswer: '9',
        explanation: 'IELTS uses a 9-band scoring system, with 9 being the highest score.',
        points: 10
      }
    ],
    resources: [
      {
        id: 'res-ielts-001',
        title: 'IELTS Band Score Descriptors',
        type: 'pdf',
        url: 'https://example.com/resources/ielts-band-descriptors.pdf',
        size: '2.1 MB',
        description: 'Official IELTS band score criteria for all skills',
        downloadable: true
      }
    ]
  },
  {
    id: 'ielts-lesson-002',
    title: 'IELTS Reading: Academic Text Strategies',
    description: 'Master advanced reading strategies for IELTS Academic including skimming, scanning, and complex question types.',
    duration: '90 min',
    videoUrl: 'https://example.com/video/ielts-002',
    courseId: 'ielts-band7-guarantee',
    order: 2,
    completed: false,
    type: 'video' as const,
    isPreview: false,
    objectives: [
      'Master skimming and scanning techniques',
      'Understand academic text structures',
      'Learn all IELTS reading question types',
      'Develop time management strategies'
    ],
    keyPoints: [
      'Academic text organization patterns',
      'Speed reading without comprehension loss',
      'Question type specific strategies',
      'Effective time allocation methods'
    ]
  },
  // Business English Executive Lessons
  {
    id: 'business-lesson-001',
    title: 'Executive Communication Foundations',
    description: 'Build foundation skills for executive-level business communication including leadership presence and strategic messaging.',
    duration: '75 min',
    videoUrl: 'https://example.com/video/business-001',
    courseId: 'business-english-executive',
    order: 1,
    completed: false,
    type: 'video' as const,
    isPreview: true,
    objectives: [
      'Develop executive communication presence',
      'Master strategic messaging techniques',
      'Build leadership communication skills',
      'Understand corporate communication culture'
    ],
    keyPoints: [
      'Executive presence and authority',
      'Strategic message development',
      'Leadership communication styles',
      'Corporate hierarchy communication'
    ]
  },
  // Foundation English Lessons  
  {
    id: 'foundation-lesson-001',
    title: 'English Alphabet & Basic Sounds',
    description: 'Master the English alphabet, basic pronunciation, and fundamental sounds for building strong language foundations.',
    duration: '60 min',
    videoUrl: 'https://example.com/video/foundation-001',
    courseId: 'foundation-english-complete',
    order: 1,
    completed: false,
    type: 'video' as const,
    isPreview: true,
    objectives: [
      'Master English alphabet completely',
      'Learn basic English sounds',
      'Practice simple pronunciation',
      'Build confidence with basics'
    ],
    keyPoints: [
      'Alphabet recognition and pronunciation',
      'Basic vowel and consonant sounds',
      'Simple pronunciation rules',
      'Foundation building approach'
    ]
  }
];
