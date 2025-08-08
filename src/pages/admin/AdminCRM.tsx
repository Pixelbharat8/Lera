import React, { useState, useEffect } from 'react';
import { useSupabaseApi } from '../../hooks/useSupabaseApi';
import { 
  Users, 
  GraduationCap, 
  Search, 
  Filter,
  Plus,
  Mail,
  Phone,
  Calendar,
  TrendingUp,
  Award,
  Clock,
  BookOpen,
  Star,
  Edit,
  Eye,
  MoreVertical,
  ChevronRight,
  AlertCircle,
  CheckCircle,
  XCircle,
  Target,
  BarChart3,
  MessageSquare
} from 'lucide-react';

interface Student {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  date_of_birth: string;
  nationality: string;
  current_level: string;
  enrollment_date: string;
  avatar_url?: string;
  guardian_name?: string;
  emergency_contact?: string;
  learning_goals?: string[];
  special_notes?: string;
  is_active: boolean;
  enrollments: CourseEnrollment[];
  assessments: Assessment[];
  attendance_rate: number;
  completion_rate: number;
  average_score: number;
  total_study_hours: number;
  last_activity: string;
  payment_status: 'current' | 'overdue' | 'pending';
  communication_preferences: {
    email: boolean;
    sms: boolean;
    whatsapp: boolean;
  };
}

interface Teacher {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  specializations: string[];
  qualifications: string[];
  work_experience_years: number;
  employment_type: 'full_time' | 'part_time' | 'freelance';
  hourly_rate: number;
  avatar_url?: string;
  is_active: boolean;
  total_students: number;
  total_courses: number;
  average_rating: number;
  total_teaching_hours: number;
  this_month_hours: number;
  attendance_rate: number;
  student_satisfaction: number;
  performance_trend: 'improving' | 'stable' | 'declining';
  current_classes: ClassInfo[];
  recent_activity: ActivityRecord[];
  contracts: Contract[];
}

interface CourseEnrollment {
  course_name: string;
  enrollment_date: string;
  progress: number;
  status: 'active' | 'completed' | 'dropped';
  payment_status: 'paid' | 'pending' | 'overdue';
}

interface Assessment {
  date: string;
  type: string;
  score: number;
  course: string;
  feedback?: string;
}

interface ClassInfo {
  name: string;
  schedule: string;
  students: number;
  next_session: string;
}

interface ActivityRecord {
  date: string;
  type: string;
  description: string;
}

interface Contract {
  start_date: string;
  end_date: string;
  type: string;
  salary: number;
  status: 'active' | 'expired' | 'pending';
}

const AdminCRM = () => {
  const [activeTab, setActiveTab] = useState<'students' | 'teachers' | 'analytics'>('students');
  const [students, setStudents] = useState<Student[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [showTeacherModal, setShowTeacherModal] = useState(false);
  const [filterLevel, setFilterLevel] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  const { callEdgeFunction } = useSupabaseApi();

  // Mock data for comprehensive CRM
  const mockStudents: Student[] = [
    {
      id: '1',
      full_name: 'Nguyen Minh Duc',
      email: 'duc.nguyen@example.com',
      phone: '+84 123 456 789',
      date_of_birth: '2002-05-15',
      nationality: 'Vietnamese',
      current_level: 'IELTS_Advanced',
      enrollment_date: '2024-01-15',
      avatar_url: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150',
      guardian_name: 'Nguyen Van Minh',
      emergency_contact: '+84 987 654 321',
      learning_goals: ['IELTS Band 8.0', 'University Admission', 'Academic Writing'],
      special_notes: 'Excellent progress in speaking, needs improvement in writing',
      is_active: true,
      enrollments: [
        { course_name: 'IELTS Academic Mastery', enrollment_date: '2024-01-15', progress: 75, status: 'active', payment_status: 'paid' },
        { course_name: 'Academic Writing Excellence', enrollment_date: '2024-02-01', progress: 60, status: 'active', payment_status: 'paid' }
      ],
      assessments: [
        { date: '2024-01-20', type: 'Speaking Test', score: 85, course: 'IELTS Academic', feedback: 'Excellent pronunciation' },
        { date: '2024-01-25', type: 'Writing Task 1', score: 72, course: 'IELTS Academic', feedback: 'Good structure, improve vocabulary' }
      ],
      attendance_rate: 95,
      completion_rate: 88,
      average_score: 82,
      total_study_hours: 156,
      last_activity: '2024-01-22T14:30:00Z',
      payment_status: 'current',
      communication_preferences: { email: true, sms: false, whatsapp: true }
    },
    {
      id: '2',
      full_name: 'Tran Thi Mai',
      email: 'mai.tran@example.com',
      phone: '+84 234 567 890',
      date_of_birth: '1995-08-22',
      nationality: 'Vietnamese',
      current_level: 'Business_Advanced',
      enrollment_date: '2024-01-10',
      avatar_url: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150',
      learning_goals: ['Business Communication', 'Presentation Skills', 'International Meetings'],
      is_active: true,
      enrollments: [
        { course_name: 'Business English Excellence', enrollment_date: '2024-01-10', progress: 85, status: 'active', payment_status: 'paid' },
        { course_name: 'English for Specific Purposes', enrollment_date: '2024-01-20', progress: 40, status: 'active', payment_status: 'pending' }
      ],
      assessments: [
        { date: '2024-01-18', type: 'Business Presentation', score: 88, course: 'Business English', feedback: 'Confident delivery' },
        { date: '2024-01-23', type: 'Email Writing', score: 92, course: 'Business English', feedback: 'Professional tone' }
      ],
      attendance_rate: 100,
      completion_rate: 95,
      average_score: 90,
      total_study_hours: 142,
      last_activity: '2024-01-23T16:15:00Z',
      payment_status: 'overdue',
      communication_preferences: { email: true, sms: true, whatsapp: false }
    },
    {
      id: '3',
      full_name: 'Le Van Hung',
      email: 'hung.le@example.com',
      phone: '+84 345 678 901',
      date_of_birth: '1998-12-03',
      nationality: 'Vietnamese',
      current_level: 'CEFR_B1',
      enrollment_date: '2024-01-05',
      avatar_url: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
      learning_goals: ['General Fluency', 'Conversation Skills', 'Travel English'],
      is_active: true,
      enrollments: [
        { course_name: 'English Foundation Builder', enrollment_date: '2024-01-05', progress: 100, status: 'completed', payment_status: 'paid' },
        { course_name: 'Conversational English Fluency', enrollment_date: '2024-02-01', progress: 35, status: 'active', payment_status: 'paid' }
      ],
      assessments: [
        { date: '2024-01-30', type: 'Final Assessment', score: 78, course: 'Foundation Builder', feedback: 'Great improvement' },
        { date: '2024-02-05', type: 'Speaking Test', score: 75, course: 'Conversation Fluency', feedback: 'Good progress' }
      ],
      attendance_rate: 92,
      completion_rate: 85,
      average_score: 76,
      total_study_hours: 98,
      last_activity: '2024-01-22T10:45:00Z',
      payment_status: 'current',
      communication_preferences: { email: true, sms: false, whatsapp: true }
    }
  ];

  const mockTeachers: Teacher[] = [
    {
      id: '1',
      full_name: 'Ms. Ledia Balliu',
      email: 'ledia@lera-academy.com',
      phone: '+84 123 456 789',
      specializations: ['IELTS Academic', 'Test Strategy', 'Academic Writing', 'Speaking Confidence'],
      qualifications: ['MA Applied Linguistics', 'IELTS Examiner Certification', 'Cambridge CELTA'],
      work_experience_years: 7,
      employment_type: 'full_time',
      hourly_rate: 50,
      avatar_url: '/ceo.jpg',
      is_active: true,
      total_students: 45,
      total_courses: 6,
      average_rating: 4.9,
      total_teaching_hours: 1250,
      this_month_hours: 85,
      attendance_rate: 98,
      student_satisfaction: 96,
      performance_trend: 'improving',
      current_classes: [
        { name: 'IELTS Speaking Practice', schedule: 'Mon, Wed, Fri - 9:00 AM', students: 12, next_session: '2024-01-25T09:00:00Z' },
        { name: 'Academic Writing Workshop', schedule: 'Tue, Thu - 2:00 PM', students: 8, next_session: '2024-01-25T14:00:00Z' }
      ],
      recent_activity: [
        { date: '2024-01-23', type: 'Class Conducted', description: 'IELTS Speaking Practice Session' },
        { date: '2024-01-22', type: 'Assessment Graded', description: 'Writing Task 2 - 15 submissions' },
        { date: '2024-01-21', type: 'Student Meeting', description: 'Progress discussion with Nguyen Minh Duc' }
      ],
      contracts: [
        { start_date: '2024-01-01', end_date: '2024-12-31', type: 'Full-time Employment', salary: 25000, status: 'active' }
      ]
    },
    {
      id: '2',
      full_name: 'Mr. Mo Tran',
      email: 'mo@lera-academy.com',
      phone: '+84 234 567 890',
      specializations: ['Business English', 'Corporate Communication', 'Presentation Skills', 'Cross-cultural Communication'],
      qualifications: ['MBA Business Administration', 'Business English Specialist', 'Corporate Training Expert'],
      work_experience_years: 8,
      employment_type: 'full_time',
      hourly_rate: 45,
      avatar_url: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
      is_active: true,
      total_students: 32,
      total_courses: 4,
      average_rating: 4.8,
      total_teaching_hours: 980,
      this_month_hours: 72,
      attendance_rate: 95,
      student_satisfaction: 94,
      performance_trend: 'stable',
      current_classes: [
        { name: 'Business English Excellence', schedule: 'Tue, Thu - 11:00 AM', students: 15, next_session: '2024-01-25T11:00:00Z' },
        { name: 'Corporate Communication', schedule: 'Wed - 4:00 PM', students: 10, next_session: '2024-01-24T16:00:00Z' }
      ],
      recent_activity: [
        { date: '2024-01-23', type: 'Class Conducted', description: 'Business Email Writing Workshop' },
        { date: '2024-01-22', type: 'Curriculum Development', description: 'Updated Business English materials' },
        { date: '2024-01-20', type: 'Parent Meeting', description: 'Progress discussion with student family' }
      ],
      contracts: [
        { start_date: '2024-01-01', end_date: '2024-12-31', type: 'Full-time Employment', salary: 22000, status: 'active' }
      ]
    },
    {
      id: '3',
      full_name: 'Ms. Sarah Thompson',
      email: 'sarah@lera-academy.com',
      phone: '+84 345 678 901',
      specializations: ['Foundation English', 'Confidence Building', 'Pronunciation Training', 'Young Learners'],
      qualifications: ['BA English Literature', 'Cambridge CELTA', 'TESOL Certification'],
      work_experience_years: 6,
      employment_type: 'part_time',
      hourly_rate: 40,
      avatar_url: 'https://images.pexels.com/photos/5212324/pexels-photo-5212324.jpeg?auto=compress&cs=tinysrgb&w=150',
      is_active: true,
      total_students: 28,
      total_courses: 3,
      average_rating: 4.7,
      total_teaching_hours: 650,
      this_month_hours: 45,
      attendance_rate: 92,
      student_satisfaction: 91,
      performance_trend: 'improving',
      current_classes: [
        { name: 'English Foundation Builder', schedule: 'Mon, Wed, Fri - 3:00 PM', students: 18, next_session: '2024-01-25T15:00:00Z' },
        { name: 'Young Learners Program', schedule: 'Sat - 10:00 AM', students: 10, next_session: '2024-01-27T10:00:00Z' }
      ],
      recent_activity: [
        { date: '2024-01-23', type: 'Class Conducted', description: 'Foundation English - Grammar Focus' },
        { date: '2024-01-21', type: 'Assessment Created', description: 'Weekly vocabulary quiz' },
        { date: '2024-01-20', type: 'Professional Development', description: 'Attended pronunciation workshop' }
      ],
      contracts: [
        { start_date: '2024-01-01', end_date: '2024-06-30', type: 'Part-time Contract', salary: 15000, status: 'active' }
      ]
    }
  ];

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setStudents(mockStudents);
      setTeachers(mockTeachers);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = !filterLevel || student.current_level === filterLevel;
    const matchesStatus = !filterStatus || 
      (filterStatus === 'active' && student.is_active) ||
      (filterStatus === 'inactive' && !student.is_active) ||
      (filterStatus === 'overdue' && student.payment_status === 'overdue');
    return matchesSearch && matchesLevel && matchesStatus;
  });

  const filteredTeachers = teachers.filter(teacher => {
    const matchesSearch = teacher.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         teacher.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
      case 'current':
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'overdue':
      case 'inactive':
        return 'bg-red-100 text-red-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPerformanceIcon = (trend: string) => {
    switch (trend) {
      case 'improving':
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'declining':
        return <TrendingUp className="h-4 w-4 text-red-500 transform rotate-180" />;
      default:
        return <Target className="h-4 w-4 text-blue-500" />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold gradient-text">CRM Dashboard</h1>
        <div className="flex space-x-3">
          <button
            onClick={() => setShowStudentModal(true)}
            className="btn-primary flex items-center"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Student
          </button>
          <button
            onClick={() => setShowTeacherModal(true)}
            className="btn-secondary flex items-center"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Teacher
          </button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card-3d bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Students</p>
              <p className="text-2xl font-bold text-gray-900">{students.length}</p>
              <p className="text-sm text-green-600 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                +12% this month
              </p>
            </div>
          </div>
        </div>

        <div className="card-3d bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <GraduationCap className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Active Teachers</p>
              <p className="text-2xl font-bold text-gray-900">{teachers.filter(t => t.is_active).length}</p>
              <p className="text-sm text-blue-600">15 total staff</p>
            </div>
          </div>
        </div>

        <div className="card-3d bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Award className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Avg. Student Score</p>
              <p className="text-2xl font-bold text-gray-900">
                {Math.round(students.reduce((sum, s) => sum + s.average_score, 0) / students.length)}%
              </p>
              <p className="text-sm text-green-600">Above target</p>
            </div>
          </div>
        </div>

        <div className="card-3d bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center">
            <div className="p-3 bg-orange-100 rounded-lg">
              <Clock className="h-6 w-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Study Hours</p>
              <p className="text-2xl font-bold text-gray-900">
                {students.reduce((sum, s) => sum + s.total_study_hours, 0).toLocaleString()}h
              </p>
              <p className="text-sm text-blue-600">This year</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { key: 'students', label: 'Student Management', icon: Users, count: students.length },
            { key: 'teachers', label: 'Teacher Management', icon: GraduationCap, count: teachers.length },
            { key: 'analytics', label: 'CRM Analytics', icon: BarChart3, count: null }
          ].map(({ key, label, icon: Icon, count }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key as any)}
              className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
                activeTab === key
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Icon className="h-4 w-4 mr-2" />
              {label}
              {count !== null && (
                <span className="ml-2 bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                  {count}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder={`Search ${activeTab}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
          
          {activeTab === 'students' && (
            <div className="flex gap-4">
              <select
                value={filterLevel}
                onChange={(e) => setFilterLevel(e.target.value)}
                className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="">All Levels</option>
                <option value="IELTS_Foundation">IELTS Foundation</option>
                <option value="IELTS_Intermediate">IELTS Intermediate</option>
                <option value="IELTS_Advanced">IELTS Advanced</option>
                <option value="Business_Beginner">Business Beginner</option>
                <option value="Business_Advanced">Business Advanced</option>
                <option value="CEFR_A1">CEFR A1</option>
                <option value="CEFR_B1">CEFR B1</option>
                <option value="CEFR_B2">CEFR B2</option>
              </select>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="overdue">Payment Overdue</option>
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Students Tab */}
      {activeTab === 'students' && (
        <div className="space-y-6">
          {/* Students Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredStudents.map((student) => (
              <div key={student.id} className="card-3d bg-white rounded-xl shadow-lg border p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <img
                      src={student.avatar_url}
                      alt={student.full_name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
                    />
                    <div className="ml-3">
                      <h3 className="font-semibold text-gray-900">{student.full_name}</h3>
                      <p className="text-sm text-gray-500">{student.current_level.replace('_', ' ')}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(student.payment_status)}`}>
                      {student.payment_status}
                    </span>
                    <button
                      onClick={() => setSelectedStudent(student)}
                      className="p-1 text-gray-400 hover:text-gray-600"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-gray-600 truncate">{student.email}</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-gray-600">{student.phone}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Attendance:</span>
                      <span className="ml-1 font-medium text-gray-900">{student.attendance_rate}%</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Avg Score:</span>
                      <span className="ml-1 font-medium text-gray-900">{student.average_score}%</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-500">Course Progress</span>
                      <span className="font-medium text-gray-700">{student.completion_rate}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-cyan-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${student.completion_rate}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="text-xs text-gray-500">
                    Enrolled: {new Date(student.enrollment_date).toLocaleDateString()}
                  </div>
                  <div className="flex space-x-1">
                    <button className="p-1 text-blue-600 hover:text-blue-800">
                      <Mail className="h-4 w-4" />
                    </button>
                    <button className="p-1 text-green-600 hover:text-green-800">
                      <MessageSquare className="h-4 w-4" />
                    </button>
                    <button className="p-1 text-gray-400 hover:text-gray-600">
                      <Edit className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Teachers Tab */}
      {activeTab === 'teachers' && (
        <div className="space-y-6">
          {/* Teachers Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredTeachers.map((teacher) => (
              <div key={teacher.id} className="card-3d bg-white rounded-xl shadow-lg border p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <img
                      src={teacher.avatar_url}
                      alt={teacher.full_name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
                    />
                    <div className="ml-3">
                      <h3 className="font-semibold text-gray-900">{teacher.full_name}</h3>
                      <p className="text-sm text-gray-500">{teacher.specializations[0]}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getPerformanceIcon(teacher.performance_trend)}
                    <button
                      onClick={() => setSelectedTeacher(teacher)}
                      className="p-1 text-gray-400 hover:text-gray-600"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Students:</span>
                      <span className="ml-1 font-medium text-gray-900">{teacher.total_students}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Rating:</span>
                      <div className="flex items-center ml-1">
                        <Star className="h-3 w-3 text-yellow-400 fill-current mr-1" />
                        <span className="font-medium text-gray-900">{teacher.average_rating}</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">This Month:</span>
                      <span className="ml-1 font-medium text-gray-900">{teacher.this_month_hours}h</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Type:</span>
                      <span className="ml-1 font-medium text-gray-900 capitalize">{teacher.employment_type.replace('_', ' ')}</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-500">Student Satisfaction</span>
                      <span className="font-medium text-gray-700">{teacher.student_satisfaction}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-green-500 to-emerald-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${teacher.student_satisfaction}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-xs font-medium text-gray-700">Current Classes:</div>
                  {teacher.current_classes.slice(0, 2).map((cls, index) => (
                    <div key={index} className="text-xs text-gray-600 bg-gray-50 p-2 rounded">
                      <div className="font-medium">{cls.name}</div>
                      <div className="flex justify-between">
                        <span>{cls.schedule}</span>
                        <span>{cls.students} students</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="text-xs text-gray-500">
                    {teacher.work_experience_years} years exp.
                  </div>
                  <div className="flex space-x-1">
                    <button className="p-1 text-blue-600 hover:text-blue-800">
                      <Mail className="h-4 w-4" />
                    </button>
                    <button className="p-1 text-green-600 hover:text-green-800">
                      <Calendar className="h-4 w-4" />
                    </button>
                    <button className="p-1 text-gray-400 hover:text-gray-600">
                      <Edit className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Analytics Tab */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          {/* Performance Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-gray-900">Student Retention</h3>
                <TrendingUp className="h-5 w-5 text-green-500" />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">94%</div>
              <div className="text-sm text-green-600">+3% from last month</div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-gray-900">Course Completion</h3>
                <Award className="h-5 w-5 text-blue-500" />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">87%</div>
              <div className="text-sm text-blue-600">Above industry avg</div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-gray-900">Teacher Satisfaction</h3>
                <Star className="h-5 w-5 text-yellow-500" />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">4.8/5</div>
              <div className="text-sm text-green-600">Excellent rating</div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-gray-900">Revenue Growth</h3>
                <TrendingUp className="h-5 w-5 text-purple-500" />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">+18%</div>
              <div className="text-sm text-purple-600">Monthly growth</div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors">
                <Users className="h-6 w-6 text-gray-400 mx-auto mb-2" />
                <div className="text-sm font-medium text-gray-700">Bulk Email Students</div>
              </button>
              <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors">
                <Calendar className="h-6 w-6 text-gray-400 mx-auto mb-2" />
                <div className="text-sm font-medium text-gray-700">Schedule Classes</div>
              </button>
              <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors">
                <BarChart3 className="h-6 w-6 text-gray-400 mx-auto mb-2" />
                <div className="text-sm font-medium text-gray-700">Generate Reports</div>
              </button>
              <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition-colors">
                <MessageSquare className="h-6 w-6 text-gray-400 mx-auto mb-2" />
                <div className="text-sm font-medium text-gray-700">Send Notifications</div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Student Detail Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <img
                    src={selectedStudent.avatar_url}
                    alt={selectedStudent.full_name}
                    className="w-16 h-16 rounded-full object-cover border-4 border-gray-200"
                  />
                  <div className="ml-4">
                    <h2 className="text-2xl font-bold text-gray-900">{selectedStudent.full_name}</h2>
                    <p className="text-lg text-gray-600">{selectedStudent.current_level.replace('_', ' ')}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedStudent(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircle className="h-6 w-6" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Student Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900">Personal Information</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Email:</span>
                      <span className="text-gray-900">{selectedStudent.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Phone:</span>
                      <span className="text-gray-900">{selectedStudent.phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Date of Birth:</span>
                      <span className="text-gray-900">{new Date(selectedStudent.date_of_birth).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Nationality:</span>
                      <span className="text-gray-900">{selectedStudent.nationality}</span>
                    </div>
                    {selectedStudent.guardian_name && (
                      <div className="flex justify-between">
                        <span className="text-gray-500">Guardian:</span>
                        <span className="text-gray-900">{selectedStudent.guardian_name}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900">Learning Progress</h3>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-500">Attendance Rate</span>
                        <span className="font-medium text-gray-900">{selectedStudent.attendance_rate}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: `${selectedStudent.attendance_rate}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-500">Course Completion</span>
                        <span className="font-medium text-gray-900">{selectedStudent.completion_rate}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: `${selectedStudent.completion_rate}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-500">Average Score</span>
                        <span className="font-medium text-gray-900">{selectedStudent.average_score}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-purple-500 h-2 rounded-full"
                          style={{ width: `${selectedStudent.average_score}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enrollments */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Course Enrollments</h3>
                <div className="space-y-3">
                  {selectedStudent.enrollments.map((enrollment, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium text-gray-900">{enrollment.course_name}</div>
                        <div className="text-sm text-gray-500">
                          Enrolled: {new Date(enrollment.enrollment_date).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(enrollment.status)}`}>
                            {enrollment.status}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(enrollment.payment_status)}`}>
                            {enrollment.payment_status}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">{enrollment.progress}% complete</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Assessments */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Recent Assessments</h3>
                <div className="space-y-3">
                  {selectedStudent.assessments.map((assessment, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium text-gray-900">{assessment.type}</div>
                        <div className="text-sm text-gray-500">{assessment.course}</div>
                        <div className="text-sm text-gray-500">{new Date(assessment.date).toLocaleDateString()}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-gray-900 mb-1">{assessment.score}%</div>
                        {assessment.feedback && (
                          <div className="text-xs text-gray-600 max-w-32">{assessment.feedback}</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Teacher Detail Modal */}
      {selectedTeacher && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <img
                    src={selectedTeacher.avatar_url}
                    alt={selectedTeacher.full_name}
                    className="w-16 h-16 rounded-full object-cover border-4 border-gray-200"
                  />
                  <div className="ml-4">
                    <h2 className="text-2xl font-bold text-gray-900">{selectedTeacher.full_name}</h2>
                    <p className="text-lg text-gray-600">{selectedTeacher.specializations.join(', ')}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedTeacher(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircle className="h-6 w-6" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Teacher Performance Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600 mb-1">{selectedTeacher.total_students}</div>
                  <div className="text-sm text-gray-600">Total Students</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600 mb-1">{selectedTeacher.average_rating}</div>
                  <div className="text-sm text-gray-600">Average Rating</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600 mb-1">{selectedTeacher.total_teaching_hours}h</div>
                  <div className="text-sm text-gray-600">Total Teaching Hours</div>
                </div>
              </div>

              {/* Current Classes */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Current Classes</h3>
                <div className="space-y-3">
                  {selectedTeacher.current_classes.map((cls, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium text-gray-900">{cls.name}</div>
                        <div className="text-sm text-gray-500">{cls.schedule}</div>
                        <div className="text-sm text-gray-500">Next: {new Date(cls.next_session).toLocaleString()}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-gray-900">{cls.students}</div>
                        <div className="text-sm text-gray-600">students</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Activity */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  {selectedTeacher.recent_activity.map((activity, index) => (
                    <div key={index} className="flex items-start p-4 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">{activity.type}</div>
                        <div className="text-sm text-gray-600">{activity.description}</div>
                        <div className="text-xs text-gray-500">{new Date(activity.date).toLocaleDateString()}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Qualifications */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Qualifications & Specializations</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">Qualifications:</h4>
                    <div className="space-y-1">
                      {selectedTeacher.qualifications.map((qual, index) => (
                        <div key={index} className="text-sm text-gray-600 flex items-center">
                          <CheckCircle className="h-3 w-3 text-green-500 mr-2" />
                          {qual}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">Specializations:</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedTeacher.specializations.map((spec, index) => (
                        <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCRM;