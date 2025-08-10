import { Course, Lesson, Instructor } from '../types/index';
import { 
  comprehensiveInstructors, 
  comprehensiveCourses, 
  comprehensiveLessons,
  extendedCourseCategories,
  comprehensiveLearningPaths,
  sampleStudents,
  studentSuccessStories,
  academyStatistics
} from './comprehensiveData';

// Comprehensive instructor profiles (fallback data)
export const mockInstructors: Instructor[] = [
  {
    id: '101',
    name: 'Ms. Ledia Balliu',
    avatar: '/ceo.jpg',
    bio: 'IELTS Master Trainer and CEO of LERA Academy with 7+ years of experience in Hai Phong. Specialized in Academic IELTS preparation with 95% success rate for Band 7.0+ achievement.',
    specializations: ['IELTS Academic', 'Test Strategy', 'Academic Writing', 'Speaking Confidence', 'Band Score Improvement'],
    rating: 4.9,
    totalStudents: 850,
    totalCourses: 15,
    experience: '7+ years',
    education: ['MA in Applied Linguistics', 'IELTS Examiner Certification', 'Cambridge CELTA'],
    certifications: ['IELTS Official Examiner', 'Cambridge Assessment Specialist', 'TESOL Advanced'],
    languages: ['English (Native)', 'Vietnamese (Fluent)', 'Italian (Advanced)'],
    teachingStyle: 'Results-focused with personalized attention to each student\'s needs',
    expertise: ['IELTS Band 7+ Strategies', 'Academic Writing Mastery', 'Speaking Confidence Building', 'Test Psychology']
  },
  {
    id: '102',
    name: 'Mr. Mo Tran',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
    bio: 'Business English Expert and Operations Director with MBA and extensive corporate training experience across multinational companies.',
    specializations: ['Corporate Communication', 'Presentation Skills', 'Business Writing', 'Cross-cultural Communication', 'Leadership English'],
    rating: 4.8,
    totalStudents: 650,
    totalCourses: 12,
    experience: '8+ years',
    education: ['MBA Business Administration', 'BA International Business', 'Advanced Business English Certification'],
    certifications: ['Business English Specialist', 'Corporate Training Expert', 'International Communication Coach'],
    languages: ['Vietnamese (Native)', 'English (Fluent)', 'Mandarin (Intermediate)'],
    teachingStyle: 'Practical, real-world application with interactive business scenarios',
    expertise: ['Executive Communication', 'Negotiation Skills', 'Presentation Mastery', 'Email Proficiency']
  },
  {
    id: '103',
    name: 'Ms. Sarah Thompson',
    avatar: 'https://images.pexels.com/photos/5212324/pexels-photo-5212324.jpeg?auto=compress&cs=tinysrgb&w=150',
    bio: 'Native English speaker from the UK with CELTA certification. Specializes in beginner-friendly teaching methods and confidence building.',
    specializations: ['Foundation English', 'Confidence Building', 'Interactive Learning', 'Pronunciation Training', 'Conversation Skills'],
    rating: 4.7,
    totalStudents: 480,
    totalCourses: 10,
    experience: '6+ years',
    education: ['BA English Literature', 'Cambridge CELTA', 'TESOL Certification'],
    certifications: ['Cambridge CELTA', 'TESOL Advanced', 'Pronunciation Specialist'],
    languages: ['English (Native)', 'Vietnamese (Intermediate)', 'French (Conversational)'],
    teachingStyle: 'Encouraging and patient with focus on building student confidence',
    expertise: ['Beginner English', 'Pronunciation Coaching', 'Conversation Practice', 'Cultural Communication']
  },
  {
    id: '104',
    name: 'Mr. Michael Anderson',
    avatar: 'https://images.pexels.com/photos/5212317/pexels-photo-5212317.jpeg?auto=compress&cs=tinysrgb&w=150',
    bio: 'American TOEFL Expert with MBA and 8+ years of test preparation experience. Proven track record of helping students achieve 100+ TOEFL scores.',
    specializations: ['TOEFL iBT', 'Academic English', 'Test Strategy', 'University Preparation', 'Academic Writing'],
    rating: 4.8,
    totalStudents: 420,
    totalCourses: 14,
    experience: '8+ years',
    education: ['MBA International Business', 'MA TESOL', 'TOEFL Specialist Certification'],
    certifications: ['TOEFL iBT Specialist', 'Academic English Expert', 'University Prep Coach'],
    languages: ['English (Native)', 'Spanish (Fluent)', 'Vietnamese (Basic)'],
    teachingStyle: 'Strategic and analytical approach to test preparation',
    expertise: ['TOEFL 100+ Strategies', 'Academic Vocabulary', 'Test Psychology', 'University Applications']
  },
  {
    id: '105',
    name: 'Ms. Emma Wilson',
    avatar: 'https://images.pexels.com/photos/5212339/pexels-photo-5212339.jpeg?auto=compress&cs=tinysrgb&w=150',
    bio: 'Australian Grammar Specialist with MA in Applied Linguistics. Expert in making complex grammar concepts easy to understand and apply.',
    specializations: ['English Grammar', 'Syntax Analysis', 'Error Correction', 'Academic Writing', 'Language Structure'],
    rating: 4.7,
    totalStudents: 390,
    totalCourses: 9,
    experience: '7+ years',
    education: ['MA Applied Linguistics', 'BA English Language', 'Grammar Teaching Certification'],
    certifications: ['Grammar Specialist', 'Academic Writing Coach', 'Language Analysis Expert'],
    languages: ['English (Native)', 'Vietnamese (Intermediate)', 'Japanese (Basic)'],
    teachingStyle: 'Systematic and clear explanations with practical examples',
    expertise: ['Advanced Grammar', 'Writing Mechanics', 'Error Analysis', 'Language Patterns']
  }
];

// Comprehensive course catalog
export const mockCourses: Course[] = [
  {
    id: '1',
    title: 'IELTS Academic Mastery Program',
    description: 'Comprehensive IELTS preparation program designed to achieve Band 7.0+ scores. Features intensive practice, personalized feedback, and proven test strategies with expert instructors. Master all four skills with our systematic approach.',
    shortDescription: 'Achieve IELTS Band 7.0+ with comprehensive preparation and expert guidance.',
    instructor: mockInstructors[0],
    thumbnail: 'https://images.pexels.com/photos/4778621/pexels-photo-4778621.jpeg?auto=compress&cs=tinysrgb&w=600',
    level: 'advanced',
    category: 'IELTS Preparation',
    subcategory: 'Academic IELTS',
    rating: 4.9,
    totalLessons: 48,
    totalDuration: '72 hours',
    price: 9600000,
    originalPrice: 12000000,
    enrolled: true,
    progress: 35,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-15',
    features: [
      'Live Speaking Practice Sessions',
      'Personalized Writing Feedback',
      'Official Practice Tests',
      'Band Score Prediction',
      'Expert Examiner Tips',
      'Mobile App Access'
    ],
    learningOutcomes: [
      'Achieve IELTS Band 7.0+ in all four skills',
      'Master academic writing techniques',
      'Develop confident speaking abilities',
      'Improve reading speed and comprehension',
      'Excel in listening with various accents'
    ],
    prerequisites: ['Intermediate English level (B2)', 'Basic computer skills'],
    targetAudience: ['University applicants', 'Immigration candidates', 'Professional development seekers'],
    difficulty: 4,
    language: 'English',
    subtitles: ['Vietnamese', 'English'],
    certificate: true,
    downloadableResources: true,
    mobileAccess: true,
    lifetimeAccess: true,
    tags: ['IELTS', 'Academic', 'Test Prep', 'Band 7+', 'University'],
    status: 'published',
    enrollmentCount: 1250,
    completionRate: 87,
    lastUpdated: '2024-01-15',
    estimatedHours: 72,
    skillLevel: 'Upper-Intermediate to Advanced',
    courseFormat: 'blended',
    assessmentType: ['Practice Tests', 'Speaking Evaluations', 'Writing Assessments', 'Progress Tracking']
  },
  {
    id: '2',
    title: 'Business English Excellence',
    description: 'Master professional communication skills for the global workplace. Covers presentations, negotiations, email writing, cross-cultural business communication, and leadership English for career advancement.',
    shortDescription: 'Master professional communication for global business success.',
    instructor: mockInstructors[1],
    thumbnail: 'https://images.pexels.com/photos/3183183/pexels-photo-3183183.jpeg?auto=compress&cs=tinysrgb&w=600',
    level: 'intermediate',
    category: 'Business English',
    subcategory: 'Professional Communication',
    rating: 4.8,
    totalLessons: 36,
    totalDuration: '54 hours',
    price: 7200000,
    originalPrice: 9600000,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-15',
    features: [
      'Real Business Scenarios',
      'Presentation Skills Training',
      'Email Templates Library',
      'Negotiation Practice',
      'Cultural Communication',
      'Industry-Specific Vocabulary'
    ],
    learningOutcomes: [
      'Deliver confident business presentations',
      'Write professional emails and reports',
      'Negotiate effectively in English',
      'Lead international meetings',
      'Build professional relationships'
    ],
    prerequisites: ['Intermediate English level', 'Basic business knowledge'],
    targetAudience: ['Business professionals', 'Entrepreneurs', 'Corporate employees', 'MBA students'],
    difficulty: 3,
    language: 'English',
    subtitles: ['Vietnamese', 'English'],
    certificate: true,
    downloadableResources: true,
    mobileAccess: true,
    lifetimeAccess: true,
    tags: ['Business', 'Professional', 'Communication', 'Workplace', 'Career'],
    status: 'published',
    enrollmentCount: 890,
    completionRate: 82,
    lastUpdated: '2024-01-15',
    estimatedHours: 54,
    skillLevel: 'Intermediate to Advanced',
    courseFormat: 'blended',
    assessmentType: ['Business Simulations', 'Presentation Evaluations', 'Writing Assessments']
  },
  {
    id: '3',
    title: 'English Foundation Builder',
    description: 'Perfect starting point for English learners. Build confidence through interactive lessons, practical conversations, systematic skill development, and cultural understanding for everyday communication.',
    shortDescription: 'Build strong English foundations with confidence and practical skills.',
    instructor: mockInstructors[2],
    thumbnail: 'https://images.pexels.com/photos/7516363/pexels-photo-7516363.jpeg?auto=compress&cs=tinysrgb&w=600',
    level: 'beginner',
    category: 'General English',
    subcategory: 'Foundation Course',
    rating: 4.7,
    totalLessons: 32,
    totalDuration: '48 hours',
    price: 4800000,
    originalPrice: 6000000,
    enrolled: true,
    progress: 80,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-15',
    features: [
      'Interactive Lessons',
      'Pronunciation Training',
      'Cultural Context',
      'Daily Conversation Practice',
      'Grammar Foundations',
      'Vocabulary Building'
    ],
    learningOutcomes: [
      'Communicate confidently in daily situations',
      'Understand basic grammar structures',
      'Build essential vocabulary (1000+ words)',
      'Improve pronunciation and listening',
      'Develop reading and writing skills'
    ],
    prerequisites: ['No prior English knowledge required'],
    targetAudience: ['Complete beginners', 'False beginners', 'Adult learners', 'Career changers'],
    difficulty: 1,
    language: 'English',
    subtitles: ['Vietnamese', 'English'],
    certificate: true,
    downloadableResources: true,
    mobileAccess: true,
    lifetimeAccess: true,
    tags: ['Beginner', 'Foundation', 'Conversation', 'Grammar', 'Vocabulary'],
    status: 'published',
    enrollmentCount: 1450,
    completionRate: 91,
    lastUpdated: '2024-01-15',
    estimatedHours: 48,
    skillLevel: 'Beginner to Elementary',
    courseFormat: 'self-paced',
    assessmentType: ['Progress Quizzes', 'Speaking Assessments', 'Vocabulary Tests']
  },
  {
    id: '4',
    title: 'TOEFL iBT Success Program',
    description: 'Complete TOEFL iBT preparation with authentic materials, practice tests, strategic approaches to achieve your target score for university admission and academic success.',
    shortDescription: 'Master TOEFL iBT with comprehensive preparation and proven strategies.',
    instructor: mockInstructors[3],
    thumbnail: 'https://images.pexels.com/photos/4778669/pexels-photo-4778669.jpeg?auto=compress&cs=tinysrgb&w=600',
    level: 'advanced',
    category: 'Test Preparation',
    subcategory: 'TOEFL iBT',
    rating: 4.8,
    totalLessons: 40,
    totalDuration: '60 hours',
    price: 8400000,
    originalPrice: 10800000,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-15',
    features: [
      'Official Practice Tests',
      'Academic Skills Training',
      'Score Improvement Guarantee',
      'University Application Guidance',
      'Time Management Strategies',
      'Computer-Based Practice'
    ],
    learningOutcomes: [
      'Achieve TOEFL score of 100+',
      'Master academic English skills',
      'Excel in integrated tasks',
      'Develop test-taking strategies',
      'Prepare for university success'
    ],
    prerequisites: ['Upper-intermediate English level', 'Academic background'],
    targetAudience: ['University applicants', 'Graduate students', 'Academic professionals'],
    difficulty: 4,
    language: 'English',
    subtitles: ['Vietnamese', 'English'],
    certificate: true,
    downloadableResources: true,
    mobileAccess: true,
    lifetimeAccess: true,
    tags: ['TOEFL', 'University', 'Academic', 'Test Prep', 'Higher Education'],
    status: 'published',
    enrollmentCount: 680,
    completionRate: 85,
    lastUpdated: '2024-01-15',
    estimatedHours: 60,
    skillLevel: 'Upper-Intermediate to Advanced',
    courseFormat: 'instructor-led',
    assessmentType: ['Mock Tests', 'Skill Assessments', 'Progress Tracking']
  },
  {
    id: '5',
    title: 'English Grammar Mastery',
    description: 'Comprehensive grammar course covering all essential structures from basic to advanced. Perfect for building a solid foundation in English grammar with practical applications.',
    shortDescription: 'Master English grammar from basic to advanced with practical applications.',
    instructor: mockInstructors[4],
    thumbnail: 'https://images.pexels.com/photos/4778413/pexels-photo-4778413.jpeg?auto=compress&cs=tinysrgb&w=600',
    level: 'intermediate',
    category: 'Grammar & Structure',
    subcategory: 'Complete Grammar',
    rating: 4.7,
    totalLessons: 28,
    totalDuration: '42 hours',
    price: 4320000,
    originalPrice: 5520000,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-15',
    features: [
      'Progressive Grammar System',
      'Interactive Exercises',
      'Error Correction Training',
      'Real-world Applications',
      'Grammar Reference Guide',
      'Practice Worksheets'
    ],
    learningOutcomes: [
      'Master all English tenses',
      'Use complex sentence structures',
      'Eliminate common grammar errors',
      'Improve writing accuracy',
      'Develop grammatical intuition'
    ],
    prerequisites: ['Basic English knowledge'],
    targetAudience: ['Intermediate learners', 'Writing improvement seekers', 'Test preparation students'],
    difficulty: 3,
    language: 'English',
    subtitles: ['Vietnamese', 'English'],
    certificate: true,
    downloadableResources: true,
    mobileAccess: true,
    lifetimeAccess: true,
    tags: ['Grammar', 'Structure', 'Writing', 'Accuracy', 'Foundation'],
    status: 'published',
    enrollmentCount: 920,
    completionRate: 88,
    lastUpdated: '2024-01-15',
    estimatedHours: 42,
    skillLevel: 'Elementary to Upper-Intermediate',
    courseFormat: 'self-paced',
    assessmentType: ['Grammar Tests', 'Error Correction', 'Writing Assessments']
  },
  {
    id: '6',
    title: 'Academic Writing Excellence',
    description: 'Master academic writing skills for essays, research papers, dissertations, and scholarly communication. Learn proper citation, argumentation, and academic style for university success.',
    shortDescription: 'Excel in academic writing with scholarly communication skills.',
    instructor: mockInstructors[4],
    thumbnail: 'https://images.pexels.com/photos/4778621/pexels-photo-4778621.jpeg?auto=compress&cs=tinysrgb&w=600',
    level: 'advanced',
    category: 'Academic Skills',
    subcategory: 'Academic Writing',
    rating: 4.9,
    totalLessons: 24,
    totalDuration: '36 hours',
    price: 6000000,
    originalPrice: 7680000,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-15',
    features: [
      'Essay Structure Mastery',
      'Research Paper Writing',
      'Citation Style Training',
      'Thesis Development',
      'Peer Review Process',
      'Academic Vocabulary'
    ],
    learningOutcomes: [
      'Write compelling academic essays',
      'Master research paper structure',
      'Use proper citation formats',
      'Develop strong arguments',
      'Improve academic vocabulary'
    ],
    prerequisites: ['Upper-intermediate English', 'Basic research skills'],
    targetAudience: ['University students', 'Graduate students', 'Academic professionals', 'Researchers'],
    difficulty: 4,
    language: 'English',
    subtitles: ['Vietnamese', 'English'],
    certificate: true,
    downloadableResources: true,
    mobileAccess: true,
    lifetimeAccess: true,
    tags: ['Academic', 'Writing', 'Research', 'University', 'Essays'],
    status: 'published',
    enrollmentCount: 560,
    completionRate: 83,
    lastUpdated: '2024-01-15',
    estimatedHours: 36,
    skillLevel: 'Upper-Intermediate to Advanced',
    courseFormat: 'instructor-led',
    assessmentType: ['Essay Evaluations', 'Research Projects', 'Peer Reviews']
  },
  {
    id: '7',
    title: 'Conversational English Fluency',
    description: 'Develop natural speaking skills through real-life scenarios, role-plays, interactive discussions, and cultural communication. Build confidence in everyday conversations.',
    shortDescription: 'Develop natural speaking skills and conversation confidence.',
    instructor: mockInstructors[2],
    thumbnail: 'https://images.pexels.com/photos/7516363/pexels-photo-7516363.jpeg?auto=compress&cs=tinysrgb&w=600',
    level: 'intermediate',
    category: 'Speaking & Conversation',
    subcategory: 'Conversation Skills',
    rating: 4.8,
    totalLessons: 30,
    totalDuration: '45 hours',
    price: 5280000,
    originalPrice: 6720000,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-15',
    features: [
      'Live Conversation Practice',
      'Real-life Scenarios',
      'Pronunciation Training',
      'Cultural Communication',
      'Confidence Building',
      'Fluency Development'
    ],
    learningOutcomes: [
      'Speak English naturally and fluently',
      'Handle various conversation topics',
      'Improve pronunciation and intonation',
      'Build speaking confidence',
      'Understand cultural nuances'
    ],
    prerequisites: ['Basic to intermediate English'],
    targetAudience: ['Conversation improvers', 'Confidence builders', 'Social English learners'],
    difficulty: 3,
    language: 'English',
    subtitles: ['Vietnamese', 'English'],
    certificate: true,
    downloadableResources: true,
    mobileAccess: true,
    lifetimeAccess: true,
    tags: ['Speaking', 'Conversation', 'Fluency', 'Confidence', 'Pronunciation'],
    status: 'published',
    enrollmentCount: 780,
    completionRate: 89,
    lastUpdated: '2024-01-15',
    estimatedHours: 45,
    skillLevel: 'Intermediate',
    courseFormat: 'blended',
    assessmentType: ['Speaking Evaluations', 'Conversation Practice', 'Fluency Tests']
  },
  {
    id: '8',
    title: 'English for Young Learners',
    description: 'Fun and engaging English program designed specifically for children aged 6-12. Interactive games, songs, activities, and age-appropriate content make learning enjoyable and effective.',
    shortDescription: 'Fun English learning program designed for children aged 6-12.',
    instructor: mockInstructors[2],
    thumbnail: 'https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg?auto=compress&cs=tinysrgb&w=600',
    level: 'beginner',
    category: 'Young Learners',
    subcategory: 'Children English',
    rating: 4.9,
    totalLessons: 36,
    totalDuration: '54 hours',
    price: 3840000,
    originalPrice: 4800000,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-15',
    features: [
      'Interactive Games',
      'Educational Songs',
      'Animated Stories',
      'Art & Craft Activities',
      'Parent Progress Reports',
      'Age-Appropriate Content'
    ],
    learningOutcomes: [
      'Develop basic English vocabulary',
      'Learn through play and interaction',
      'Build confidence in speaking',
      'Understand simple instructions',
      'Enjoy learning English'
    ],
    prerequisites: ['No prior English knowledge required'],
    targetAudience: ['Children aged 6-12', 'Parents seeking quality English education'],
    difficulty: 1,
    language: 'English',
    subtitles: ['Vietnamese'],
    certificate: true,
    downloadableResources: true,
    mobileAccess: true,
    lifetimeAccess: true,
    tags: ['Kids', 'Children', 'Young Learners', 'Interactive', 'Fun'],
    status: 'published',
    enrollmentCount: 1200,
    completionRate: 94,
    lastUpdated: '2024-01-15',
    estimatedHours: 54,
    skillLevel: 'Beginner',
    courseFormat: 'blended',
    assessmentType: ['Fun Assessments', 'Progress Games', 'Speaking Activities']
  },
  {
    id: '9',
    title: 'English Pronunciation Perfection',
    description: 'Master English pronunciation with phonetics training, accent reduction techniques, speech clarity improvement, and confidence building for clear communication.',
    shortDescription: 'Perfect your English pronunciation with expert phonetics training.',
    instructor: mockInstructors[2],
    thumbnail: 'https://images.pexels.com/photos/7516363/pexels-photo-7516363.jpeg?auto=compress&cs=tinysrgb&w=600',
    level: 'intermediate',
    category: 'Pronunciation',
    subcategory: 'Accent Training',
    rating: 4.8,
    totalLessons: 20,
    totalDuration: '30 hours',
    price: 4560000,
    originalPrice: 5760000,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-15',
    features: [
      'Phonetics Training',
      'Accent Reduction',
      'Speech Analysis',
      'Recording Practice',
      'Individual Feedback',
      'Pronunciation Drills'
    ],
    learningOutcomes: [
      'Improve pronunciation clarity',
      'Reduce accent interference',
      'Master English sounds',
      'Develop natural rhythm',
      'Build speaking confidence'
    ],
    prerequisites: ['Basic English speaking ability'],
    targetAudience: ['Accent improvement seekers', 'Professional speakers', 'Confidence builders'],
    difficulty: 3,
    language: 'English',
    subtitles: ['Vietnamese', 'English'],
    certificate: true,
    downloadableResources: true,
    mobileAccess: true,
    lifetimeAccess: true,
    tags: ['Pronunciation', 'Accent', 'Speaking', 'Phonetics', 'Clarity'],
    status: 'published',
    enrollmentCount: 450,
    completionRate: 86,
    lastUpdated: '2024-01-15',
    estimatedHours: 30,
    skillLevel: 'Intermediate',
    courseFormat: 'instructor-led',
    assessmentType: ['Pronunciation Tests', 'Speech Analysis', 'Progress Recording']
  },
  {
    id: '10',
    title: 'Advanced English Literature',
    description: 'Explore classic and contemporary English literature. Develop critical analysis skills, literary appreciation, advanced vocabulary, and cultural understanding through great works.',
    shortDescription: 'Explore English literature with critical analysis and cultural insights.',
    instructor: mockInstructors[4],
    thumbnail: 'https://images.pexels.com/photos/4778413/pexels-photo-4778413.jpeg?auto=compress&cs=tinysrgb&w=600',
    level: 'advanced',
    category: 'Literature & Culture',
    subcategory: 'Literary Analysis',
    rating: 4.9,
    totalLessons: 32,
    totalDuration: '48 hours',
    price: 6720000,
    originalPrice: 8400000,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-15',
    features: [
      'Classic Literature Study',
      'Critical Analysis Training',
      'Cultural Context',
      'Discussion Forums',
      'Essay Writing',
      'Literary Techniques'
    ],
    learningOutcomes: [
      'Analyze literary works critically',
      'Understand cultural contexts',
      'Develop advanced vocabulary',
      'Write literary essays',
      'Appreciate English literature'
    ],
    prerequisites: ['Advanced English level', 'Interest in literature'],
    targetAudience: ['Literature enthusiasts', 'Advanced learners', 'Academic students'],
    difficulty: 5,
    language: 'English',
    subtitles: ['Vietnamese', 'English'],
    certificate: true,
    downloadableResources: true,
    mobileAccess: true,
    lifetimeAccess: true,
    tags: ['Literature', 'Culture', 'Analysis', 'Advanced', 'Academic'],
    status: 'published',
    enrollmentCount: 320,
    completionRate: 78,
    lastUpdated: '2024-01-15',
    estimatedHours: 48,
    skillLevel: 'Advanced',
    courseFormat: 'instructor-led',
    assessmentType: ['Literary Essays', 'Critical Analysis', 'Discussion Participation']
  },
  {
    id: '11',
    title: 'Cambridge English Preparation',
    description: 'Comprehensive preparation for Cambridge English exams including FCE, CAE, and CPE. Master exam techniques, practice with authentic materials, and achieve your target grade.',
    shortDescription: 'Master Cambridge English exams with comprehensive preparation.',
    instructor: mockInstructors[0],
    thumbnail: 'https://images.pexels.com/photos/4778669/pexels-photo-4778669.jpeg?auto=compress&cs=tinysrgb&w=600',
    level: 'advanced',
    category: 'Test Preparation',
    subcategory: 'Cambridge Exams',
    rating: 4.8,
    totalLessons: 42,
    totalDuration: '63 hours',
    price: 7920000,
    originalPrice: 10320000,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-15',
    features: [
      'FCE/CAE/CPE Preparation',
      'Authentic Exam Materials',
      'Speaking Practice Sessions',
      'Writing Feedback',
      'Exam Strategies',
      'Progress Tracking'
    ],
    learningOutcomes: [
      'Pass Cambridge English exams',
      'Master exam techniques',
      'Improve all language skills',
      'Build exam confidence',
      'Achieve target grades'
    ],
    prerequisites: ['Upper-intermediate to advanced English'],
    targetAudience: ['Cambridge exam candidates', 'University applicants', 'Professional certification seekers'],
    difficulty: 4,
    language: 'English',
    subtitles: ['Vietnamese', 'English'],
    certificate: true,
    downloadableResources: true,
    mobileAccess: true,
    lifetimeAccess: true,
    tags: ['Cambridge', 'FCE', 'CAE', 'CPE', 'Certification'],
    status: 'published',
    enrollmentCount: 380,
    completionRate: 84,
    lastUpdated: '2024-01-15',
    estimatedHours: 63,
    skillLevel: 'Upper-Intermediate to Advanced',
    courseFormat: 'instructor-led',
    assessmentType: ['Mock Exams', 'Skill Tests', 'Speaking Assessments']
  },
  {
    id: '12',
    title: 'English for Specific Purposes',
    description: 'Specialized English courses for specific industries including Medical English, Legal English, Engineering English, and Tourism English with professional terminology and contexts.',
    shortDescription: 'Master English for your specific professional field and industry.',
    instructor: mockInstructors[1],
    thumbnail: 'https://images.pexels.com/photos/3183183/pexels-photo-3183183.jpeg?auto=compress&cs=tinysrgb&w=600',
    level: 'intermediate',
    category: 'Professional English',
    subcategory: 'Industry-Specific',
    rating: 4.7,
    totalLessons: 30,
    totalDuration: '45 hours',
    price: 6240000,
    originalPrice: 7920000,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-15',
    features: [
      'Industry-Specific Vocabulary',
      'Professional Scenarios',
      'Technical Communication',
      'Case Studies',
      'Expert Guest Speakers',
      'Certification Preparation'
    ],
    learningOutcomes: [
      'Master professional terminology',
      'Communicate in work contexts',
      'Handle industry-specific situations',
      'Build professional networks',
      'Advance career prospects'
    ],
    prerequisites: ['Intermediate English level', 'Professional background'],
    targetAudience: ['Healthcare professionals', 'Legal professionals', 'Engineers', 'Tourism workers'],
    difficulty: 3,
    language: 'English',
    subtitles: ['Vietnamese', 'English'],
    certificate: true,
    downloadableResources: true,
    mobileAccess: true,
    lifetimeAccess: true,
    tags: ['Professional', 'Industry', 'Medical', 'Legal', 'Technical'],
    status: 'published',
    enrollmentCount: 290,
    completionRate: 81,
    lastUpdated: '2024-01-15',
    estimatedHours: 45,
    skillLevel: 'Intermediate to Advanced',
    courseFormat: 'blended',
    assessmentType: ['Professional Simulations', 'Case Study Analysis', 'Technical Presentations']
  }
];

// Comprehensive lesson structure
export const mockLessons: Lesson[] = [
  // IELTS Academic Mastery Program Lessons (Course ID: 1)
  {
    id: '101',
    title: 'IELTS Overview & Test Format',
    description: 'Complete introduction to IELTS Academic test format, scoring system, and strategic approach to each section.',
    duration: '90 min',
    videoUrl: 'https://example.com/video/101',
    courseId: '1',
    order: 1,
    completed: true,
    type: 'video',
    isPreview: true,
    objectives: [
      'Understand IELTS test format and structure',
      'Learn about scoring criteria',
      'Develop test-taking strategies',
      'Set realistic score targets'
    ],
    keyPoints: [
      'Four skills assessment: Reading, Writing, Listening, Speaking',
      'Band score system (0-9)',
      'Test duration and timing',
      'Academic vs General Training differences'
    ],
    vocabulary: [
      {
        word: 'Assessment',
        definition: 'The process of evaluating or judging something',
        pronunciation: '/əˈsesmənt/',
        example: 'The IELTS assessment measures your English proficiency.',
        partOfSpeech: 'noun'
      }
    ],
    resources: [
      {
        id: 'r101',
        title: 'IELTS Test Format Guide',
        type: 'pdf',
        url: 'https://example.com/resources/ielts-format.pdf',
        size: '2.5 MB',
        description: 'Comprehensive guide to IELTS test format',
        downloadable: true
      },
      {
        id: 'r102',
        title: 'Band Score Descriptors',
        type: 'pdf',
        url: 'https://example.com/resources/band-descriptors.pdf',
        size: '1.8 MB',
        description: 'Official IELTS band score criteria',
        downloadable: true
      }
    ],
    exercises: [
      {
        id: 'ex101',
        type: 'multiple-choice',
        question: 'How many sections are there in the IELTS Academic test?',
        options: ['3', '4', '5', '6'],
        correctAnswer: '4',
        explanation: 'IELTS has four sections: Reading, Writing, Listening, and Speaking.',
        points: 10
      }
    ]
  },
  {
    id: '102',
    title: 'Reading Skills & Strategies',
    description: 'Master IELTS Reading techniques including skimming, scanning, time management, and question type strategies for Academic texts.',
    duration: '90 min',
    videoUrl: 'https://example.com/video/102',
    courseId: '1',
    order: 2,
    completed: true,
    type: 'video',
    isPreview: false,
    objectives: [
      'Master reading strategies for IELTS',
      'Improve reading speed and comprehension',
      'Learn question type approaches',
      'Develop time management skills'
    ],
    keyPoints: [
      'Skimming and scanning techniques',
      'Academic text structures',
      'Question type strategies',
      'Time allocation methods'
    ],
    vocabulary: [
      {
        word: 'Skimming',
        definition: 'Reading quickly to get the general idea',
        pronunciation: '/ˈskɪmɪŋ/',
        example: 'Skimming helps you understand the main topic quickly.',
        partOfSpeech: 'noun'
      }
    ],
    resources: [
      {
        id: 'r103',
        title: 'Reading Practice Tests',
        type: 'pdf',
        url: 'https://example.com/resources/reading-practice.pdf',
        size: '3.2 MB',
        description: 'Authentic IELTS reading practice materials',
        downloadable: true
      }
    ]
  },
  {
    id: '103',
    title: 'Writing Task 1: Academic Reports',
    description: 'Learn to describe graphs, charts, diagrams, and processes with precise academic language and proper structure for IELTS Writing Task 1.',
    duration: '90 min',
    videoUrl: 'https://example.com/video/103',
    courseId: '1',
    order: 3,
    completed: true,
    type: 'video',
    isPreview: false,
    objectives: [
      'Master Task 1 structure and format',
      'Learn graph and chart description',
      'Develop academic vocabulary',
      'Practice time management'
    ],
    keyPoints: [
      'Task 1 structure: Introduction, Overview, Details',
      'Graph types and description methods',
      'Academic vocabulary for data',
      'Common mistakes to avoid'
    ],
    resources: [
      {
        id: 'r104',
        title: 'Task 1 Templates',
        type: 'document',
        url: 'https://example.com/resources/task1-templates.docx',
        size: '1.8 MB',
        description: 'Ready-to-use templates for all Task 1 types',
        downloadable: true
      }
    ]
  },
  {
    id: '104',
    title: 'Writing Task 2: Essay Mastery',
    description: 'Develop strong argumentative essays with clear thesis statements, supporting evidence, logical conclusions, and advanced vocabulary for IELTS Writing Task 2.',
    duration: '90 min',
    videoUrl: 'https://example.com/video/104',
    courseId: '1',
    order: 4,
    completed: false,
    type: 'video',
    isPreview: false,
    objectives: [
      'Master essay structure and organization',
      'Develop strong arguments',
      'Learn advanced vocabulary',
      'Practice different essay types'
    ],
    keyPoints: [
      'Essay types: Opinion, Discussion, Problem-Solution',
      'Thesis statement development',
      'Paragraph structure and coherence',
      'Conclusion techniques'
    ],
    resources: [
      {
        id: 'r105',
        title: 'Essay Structure Guide',
        type: 'pdf',
        url: 'https://example.com/resources/essay-structure.pdf',
        size: '2.1 MB',
        description: 'Complete guide to IELTS essay writing',
        downloadable: true
      }
    ]
  },
  {
    id: '105',
    title: 'Listening Skills Development',
    description: 'Improve listening comprehension with various accents, note-taking techniques, prediction strategies, and question type mastery for IELTS Listening.',
    duration: '90 min',
    videoUrl: 'https://example.com/video/105',
    courseId: '1',
    order: 5,
    completed: false,
    type: 'video',
    isPreview: false,
    objectives: [
      'Develop listening strategies',
      'Master note-taking techniques',
      'Understand various accents',
      'Practice prediction skills'
    ],
    keyPoints: [
      'Listening test format and sections',
      'Note-taking strategies',
      'Accent recognition',
      'Question type approaches'
    ],
    resources: [
      {
        id: 'r106',
        title: 'Listening Audio Files',
        type: 'audio',
        url: 'https://example.com/audio/listening-practice',
        size: '45 MB',
        description: 'Authentic listening practice materials',
        downloadable: true
      }
    ]
  },

  // Business English Excellence Lessons (Course ID: 2)
  {
    id: '201',
    title: 'Professional Email Communication',
    description: 'Master formal and informal business email writing with proper tone, structure, etiquette, and professional language for effective workplace communication.',
    duration: '75 min',
    videoUrl: 'https://example.com/video/201',
    courseId: '2',
    order: 1,
    completed: false,
    type: 'video',
    isPreview: true,
    objectives: [
      'Write professional emails effectively',
      'Master email structure and format',
      'Learn appropriate tone and style',
      'Understand email etiquette'
    ],
    keyPoints: [
      'Email structure: Subject, greeting, body, closing',
      'Formal vs informal tone',
      'Professional language patterns',
      'Email etiquette rules'
    ],
    vocabulary: [
      {
        word: 'Etiquette',
        definition: 'The customary code of polite behavior',
        pronunciation: '/ˈetɪket/',
        example: 'Email etiquette is important in business communication.',
        partOfSpeech: 'noun'
      }
    ],
    resources: [
      {
        id: 'r201',
        title: 'Email Templates Collection',
        type: 'document',
        url: 'https://example.com/resources/email-templates.docx',
        size: '1.5 MB',
        description: 'Professional email templates for various situations',
        downloadable: true
      }
    ]
  },
  {
    id: '202',
    title: 'Presentation Skills & Public Speaking',
    description: 'Develop confident presentation skills with clear structure, engaging delivery, effective visual aids, and audience interaction for business success.',
    duration: '75 min',
    videoUrl: 'https://example.com/video/202',
    courseId: '2',
    order: 2,
    completed: false,
    type: 'video',
    isPreview: false,
    objectives: [
      'Structure effective presentations',
      'Develop confident delivery',
      'Create engaging visual aids',
      'Handle audience questions'
    ],
    keyPoints: [
      'Presentation structure: Opening, body, conclusion',
      'Visual aid design principles',
      'Voice and body language',
      'Audience engagement techniques'
    ]
  },

  // English Foundation Builder Lessons (Course ID: 3)
  {
    id: '301',
    title: 'Basic Greetings & Introductions',
    description: 'Learn essential greeting phrases and how to introduce yourself confidently in various social and professional situations.',
    duration: '60 min',
    videoUrl: 'https://example.com/video/301',
    courseId: '3',
    order: 1,
    completed: true,
    type: 'video',
    isPreview: true,
    objectives: [
      'Master basic greetings',
      'Learn self-introduction',
      'Practice common phrases',
      'Build confidence in speaking'
    ],
    keyPoints: [
      'Formal and informal greetings',
      'Self-introduction structure',
      'Common conversation starters',
      'Cultural considerations'
    ],
    vocabulary: [
      {
        word: 'Introduction',
        definition: 'The action of introducing someone or something',
        pronunciation: '/ˌɪntrəˈdʌkʃən/',
        example: 'Let me make an introduction between you two.',
        partOfSpeech: 'noun'
      }
    ],
    resources: [
      {
        id: 'r301',
        title: 'Common Phrases Handbook',
        type: 'pdf',
        url: 'https://example.com/resources/phrases.pdf',
        size: '1.2 MB',
        description: 'Essential phrases for daily communication',
        downloadable: true
      }
    ]
  }
];

// Course categories with detailed information
export const courseCategories = [
  {
    id: 'ielts-preparation',
    name: 'IELTS Preparation',
    description: 'Comprehensive IELTS preparation courses for Academic and General Training',
    icon: '🎯',
    color: '#3B82F6',
    courseCount: 3,
    averageRating: 4.8,
    difficulty: 'Advanced',
    estimatedTime: '60-80 hours',
    features: ['Band Score Prediction', 'Speaking Practice', 'Writing Feedback', 'Mock Tests']
  },
  {
    id: 'business-english',
    name: 'Business English',
    description: 'Professional communication skills for workplace success',
    icon: '💼',
    color: '#10B981',
    courseCount: 4,
    averageRating: 4.7,
    difficulty: 'Intermediate-Advanced',
    estimatedTime: '40-60 hours',
    features: ['Real Business Scenarios', 'Presentation Skills', 'Email Writing', 'Negotiation']
  },
  {
    id: 'general-english',
    name: 'General English',
    description: 'Foundation and conversational English for everyday communication',
    icon: '🗣️',
    color: '#8B5CF6',
    courseCount: 5,
    averageRating: 4.8,
    difficulty: 'Beginner-Intermediate',
    estimatedTime: '30-50 hours',
    features: ['Interactive Lessons', 'Conversation Practice', 'Grammar Foundation', 'Vocabulary Building']
  },
  {
    id: 'test-preparation',
    name: 'Test Preparation',
    description: 'Preparation for major English proficiency tests',
    icon: '📝',
    color: '#F59E0B',
    courseCount: 3,
    averageRating: 4.8,
    difficulty: 'Advanced',
    estimatedTime: '50-70 hours',
    features: ['Official Practice Tests', 'Score Improvement', 'Test Strategies', 'Time Management']
  },
  {
    id: 'academic-skills',
    name: 'Academic Skills',
    description: 'Academic writing and research skills for university success',
    icon: '🎓',
    color: '#EF4444',
    courseCount: 2,
    averageRating: 4.9,
    difficulty: 'Advanced',
    estimatedTime: '30-40 hours',
    features: ['Essay Writing', 'Research Skills', 'Citation Formats', 'Academic Vocabulary']
  },
  {
    id: 'young-learners',
    name: 'Young Learners',
    description: 'Fun and engaging English programs for children',
    icon: '👶',
    color: '#EC4899',
    courseCount: 2,
    averageRating: 4.9,
    difficulty: 'Beginner',
    estimatedTime: '40-60 hours',
    features: ['Interactive Games', 'Songs & Stories', 'Age-Appropriate Content', 'Progress Reports']
  }
];

// Learning paths for structured progression
export const learningPaths = [
  {
    id: 'beginner-to-intermediate',
    title: 'Beginner to Intermediate Journey',
    description: 'Complete pathway from basic English to confident intermediate level',
    level: 'Beginner to Intermediate',
    estimatedDuration: '6-8 months',
    courses: ['3', '5', '7'], // Foundation, Grammar, Conversation
    difficulty: 2,
    popularity: 95,
    category: 'General English'
  },
  {
    id: 'ielts-mastery-path',
    title: 'IELTS Band 7+ Mastery',
    description: 'Systematic preparation for IELTS Academic Band 7.0 and above',
    level: 'Intermediate to Advanced',
    estimatedDuration: '4-6 months',
    courses: ['1', '6'], // IELTS Preparation, Academic Writing
    difficulty: 4,
    popularity: 88,
    category: 'Test Preparation'
  },
  {
    id: 'business-professional',
    title: 'Business Professional Track',
    description: 'Complete business English mastery for career advancement',
    level: 'Intermediate to Advanced',
    estimatedDuration: '3-5 months',
    courses: ['2', '12'], // Business English, ESP
    difficulty: 3,
    popularity: 82,
    category: 'Business English'
  }
];

// Combined exports with ALL comprehensive data
export const allInstructors = mockInstructors;
export const allCourses = mockCourses;
export const allLessons = mockLessons;
export const allCategories = courseCategories;
export const allLearningPaths = learningPaths;