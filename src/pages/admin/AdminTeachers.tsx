import { useEffect } from 'react';
import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, MoreVertical, Mail, Phone, Eye, Star, TrendingUp, Users, Clock } from 'lucide-react';
import TeacherProfile from '../../components/crm/TeacherProfile';

const AdminTeachers = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<any>(null);
  const [showTeacherProfile, setShowTeacherProfile] = useState(false);

  // Mock teacher data for enhanced view
  const teachers = [
    {
      id: '1',
      full_name: 'Ms. Ledia Balliu',
      email: 'ledia@lera-academy.com',
      phone: '+84 123 456 789',
      specializations: ['IELTS Academic', 'Test Strategy', 'Academic Writing'],
      qualifications: ['MA Applied Linguistics', 'IELTS Examiner Certification'],
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
      performance_trend: 'improving'
    },
    {
      id: '2',
      full_name: 'Mr. Mo Tran',
      email: 'mo@lera-academy.com',
      phone: '+84 234 567 890',
      specializations: ['Business English', 'Corporate Communication'],
      qualifications: ['MBA Business Administration', 'Business English Specialist'],
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
      performance_trend: 'stable'
    },
    {
      id: '3',
      full_name: 'Ms. Sarah Thompson',
      email: 'sarah@lera-academy.com',
      phone: '+84 345 678 901',
      specializations: ['Foundation English', 'Confidence Building', 'Young Learners'],
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
      performance_trend: 'improving'
    }
  ];

  const getStatusColor = (type: string) => {
    switch (type) {
      case 'full_time': return 'bg-green-100 text-green-800';
      case 'part_time': return 'bg-blue-100 text-blue-800';
      case 'freelance': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPerformanceIcon = (trend: string) => {
    switch (trend) {
      case 'improving':
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'declining':
        return <TrendingUp className="h-4 w-4 text-red-500 transform rotate-180" />;
      default:
        return <TrendingUp className="h-4 w-4 text-blue-500" />;
    }
  };

  const handleViewTeacher = (teacher: any) => {
    setSelectedTeacher(teacher);
    setShowTeacherProfile(true);
  };

  return (
    <>
      <div>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Teacher Management</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Teacher
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-500">Total Teachers</p>
                <p className="text-xl font-bold text-gray-900">{teachers.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <Star className="h-5 w-5 text-green-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-500">Avg Rating</p>
                <p className="text-xl font-bold text-gray-900">
                  {(teachers.reduce((sum, t) => sum + t.average_rating, 0) / teachers.length).toFixed(1)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Clock className="h-5 w-5 text-purple-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-500">This Month</p>
                <p className="text-xl font-bold text-gray-900">
                  {teachers.reduce((sum, t) => sum + t.this_month_hours, 0)}h
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <TrendingUp className="h-5 w-5 text-orange-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-500">Performance</p>
                <p className="text-xl font-bold text-gray-900">Excellent</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search teachers..."
                  className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <select className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                <option>All Employment Types</option>
                <option>Full Time</option>
                <option>Part Time</option>
                <option>Freelance</option>
              </select>
              <select className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                <option>All Specializations</option>
                <option>IELTS</option>
                <option>Business English</option>
                <option>General English</option>
                <option>Young Learners</option>
              </select>
            </div>
          </div>
        </div>

        {/* Teachers Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-900">Teaching Staff Directory</h2>
              <div className="text-sm text-gray-500">{teachers.filter(t => t.is_active).length} active teachers</div>
            </div>
          </div>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Teacher Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact & Employment
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Teaching Load
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Performance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {teachers.map((teacher) => (
                <tr key={teacher.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-12 w-12 flex-shrink-0">
                        <img
                          className="h-12 w-12 rounded-full object-cover border-2 border-gray-200"
                          src={teacher.avatar_url}
                          alt={teacher.full_name}
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{teacher.full_name}</div>
                        <div className="text-sm text-gray-500">{teacher.specializations[0]}</div>
                        <div className="text-xs text-gray-400">{teacher.work_experience_years} years exp.</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 flex items-center mb-1">
                      <Mail className="h-3 w-3 mr-1" />
                      {teacher.email}
                    </div>
                    <div className="text-sm text-gray-500 flex items-center mb-1">
                      <Phone className="h-3 w-3 mr-1" />
                      {teacher.phone}
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(teacher.employment_type)}`}>
                      {teacher.employment_type.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{teacher.total_students} students</div>
                    <div className="text-sm text-gray-500">{teacher.total_courses} courses</div>
                    <div className="text-sm text-gray-500">{teacher.this_month_hours}h this month</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center mb-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                      <span className="text-sm font-medium text-gray-900">{teacher.average_rating}</span>
                    </div>
                    <div className="text-sm text-gray-500">{teacher.student_satisfaction}% satisfaction</div>
                    <div className="flex items-center text-sm text-gray-500">
                      {getPerformanceIcon(teacher.performance_trend)}
                      <span className="ml-1 capitalize">{teacher.performance_trend}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      teacher.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {teacher.is_active ? 'Active' : 'Inactive'}
                    </span>
                    <div className="text-xs text-gray-500 mt-1">
                      ${teacher.hourly_rate}/hour
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button 
                        onClick={() => handleViewTeacher(teacher)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="text-blue-600 hover:text-blue-900">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <Trash2 className="h-4 w-4" />
                      </button>
                      <button className="text-gray-400 hover:text-gray-600">
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Teacher Profile Modal */}
      {showTeacherProfile && selectedTeacher && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="max-w-6xl w-full max-h-[95vh] overflow-y-auto">
            <TeacherProfile
              teacher={selectedTeacher}
              onUpdate={(updatedTeacher) => {
                // Handle teacher update
                console.log('Teacher updated:', updatedTeacher);
                setShowTeacherProfile(false);
              }}
              onClose={() => setShowTeacherProfile(false)}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default AdminTeachers;