import { useEffect } from 'react';
import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, MoreVertical, Mail, Phone, Eye, TrendingUp, Award, Clock } from 'lucide-react';
import StudentProfile from '../../components/crm/StudentProfile';

const AdminStudents = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showStudentProfile, setShowStudentProfile] = useState(false);

  // Mock student data for enhanced view
  const students = [
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
      learning_goals: ['IELTS Band 8.0', 'University Admission'],
      special_notes: 'Excellent progress in speaking',
      is_active: true,
      attendance_rate: 95,
      completion_rate: 88,
      average_score: 82,
      total_study_hours: 156,
      payment_status: 'current',
      courses: ['IELTS Academic Mastery', 'Academic Writing Excellence']
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
      learning_goals: ['Business Communication', 'Presentation Skills'],
      is_active: true,
      attendance_rate: 100,
      completion_rate: 95,
      average_score: 90,
      total_study_hours: 142,
      payment_status: 'overdue',
      courses: ['Business English Excellence', 'English for Specific Purposes']
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
      learning_goals: ['General Fluency', 'Conversation Skills'],
      is_active: true,
      attendance_rate: 92,
      completion_rate: 85,
      average_score: 76,
      total_study_hours: 98,
      payment_status: 'current',
      courses: ['English Foundation Builder', 'Conversational English Fluency']
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'current': return 'bg-green-100 text-green-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleViewStudent = (student) => {
    setSelectedStudent(student);
    setShowStudentProfile(true);
  };

  return (
    <>
      <div>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Students</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Student
          </button>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search students..."
                  className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <select className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                <option>All Courses</option>
                <option>IELTS</option>
                <option>Business English</option>
                <option>General English</option>
              </select>
              <select className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                <option>All Status</option>
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>
          </div>
        </div>

        {/* Students Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-900">Student Database</h2>
              <div className="text-sm text-gray-500">{students.length} total students</div>
            </div>
          </div>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Student Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Enrolled Courses
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Academic Progress
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {students.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                        <img
                          className="h-10 w-10 rounded-full object-cover"
                          src={student.avatar_url}
                          alt={student.full_name}
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {student.full_name}
                        </div>
                        <div className="text-sm text-gray-500">{student.current_level.replace('_', ' ')}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 flex items-center">
                      <Mail className="h-4 w-4 mr-1" />
                      {student.email}
                    </div>
                    <div className="text-sm text-gray-500 flex items-center">
                      <Phone className="h-4 w-4 mr-1" />
                      {student.phone}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {student.courses.map((course, index) => (
                      <div key={index} className="text-sm text-gray-900">{course}</div>
                    ))}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <div className="flex-1 h-2 bg-gray-200 rounded-full mr-2">
                          <div
                            className="h-2 bg-blue-500 rounded-full transition-all duration-300"
                            style={{ width: `${student.completion_rate}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-500">{student.completion_rate}%</span>
                      </div>
                      <div className="text-xs text-gray-500">Avg Score: {student.average_score}%</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(student.payment_status)}`}>
                      {student.payment_status}
                    </span>
                    <div className="text-xs text-gray-500 mt-1">
                      Since {new Date(student.enrollment_date).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button 
                        onClick={() => handleViewStudent(student)}
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

      {/* Student Profile Modal */}
      {showStudentProfile && selectedStudent && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="max-w-6xl w-full max-h-[95vh] overflow-y-auto">
            <StudentProfile
              student={selectedStudent}
              onUpdate={(updatedStudent) => {
                // Handle student update
                console.log('Student updated:', updatedStudent);
                setShowStudentProfile(false);
              }}
              onClose={() => setShowStudentProfile(false)}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default AdminStudents;