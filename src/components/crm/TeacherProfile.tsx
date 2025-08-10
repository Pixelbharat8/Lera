import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  TrendingUp, 
  Clock,
  Edit,
  Save,
  X,
  Star,
  Users,
  GraduationCap,
  DollarSign,
  CheckCircle,
  BarChart3,
  FileText
} from 'lucide-react';

interface TeacherProfileProps {
  teacher: {
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
    current_classes?: any[];
    recent_activity?: any[];
    contracts?: any[];
  };
  onUpdate?: (updatedTeacher: any) => void;
  onClose?: () => void;
}

const TeacherProfile: React.FC<TeacherProfileProps> = ({ teacher, onUpdate, onClose }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTeacher, setEditedTeacher] = useState(teacher);
  const [activeTab, setActiveTab] = useState<'overview' | 'performance' | 'schedule' | 'students' | 'notes'>('overview');

  const handleSave = () => {
    onUpdate?.(editedTeacher);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedTeacher(teacher);
    setIsEditing(false);
  };

  const getPerformanceColor = (trend: string) => {
    switch (trend) {
      case 'improving': return 'text-green-600';
      case 'declining': return 'text-red-600';
      default: return 'text-blue-600';
    }
  };

  const getEmploymentTypeColor = (type: string) => {
    switch (type) {
      case 'full_time': return 'bg-green-100 text-green-800';
      case 'part_time': return 'bg-blue-100 text-blue-800';
      case 'freelance': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border max-w-6xl mx-auto">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="relative">
              <img
                src={editedTeacher.avatar_url}
                alt={editedTeacher.full_name}
                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
              />
              <div className={`absolute -bottom-2 -right-2 w-8 h-8 rounded-full border-3 border-white ${
                editedTeacher.is_active ? 'bg-green-500' : 'bg-gray-400'
              } flex items-center justify-center`}>
                {editedTeacher.is_active ? 
                  <CheckCircle className="h-4 w-4 text-white" /> : 
                  <X className="h-4 w-4 text-white" />
                }
              </div>
            </div>
            <div className="ml-6">
              {isEditing ? (
                <input
                  type="text"
                  value={editedTeacher.full_name}
                  onChange={(e) => setEditedTeacher({...editedTeacher, full_name: e.target.value})}
                  className="text-3xl font-bold text-gray-900 border-b-2 border-gray-300 focus:border-blue-500 bg-transparent"
                />
              ) : (
                <h1 className="text-3xl font-bold text-gray-900">{editedTeacher.full_name}</h1>
              )}
              <p className="text-lg text-gray-600 mt-1">{editedTeacher.specializations.join(' • ')}</p>
              <div className="flex items-center mt-3 space-x-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getEmploymentTypeColor(editedTeacher.employment_type)}`}>
                  {editedTeacher.employment_type.replace('_', ' ').toUpperCase()}
                </span>
                <div className="flex items-center text-sm text-gray-600">
                  <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                  <span className="font-medium">{editedTeacher.average_rating}/5.0</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{editedTeacher.work_experience_years} years experience</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                >
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </button>
            )}
            {onClose && (
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8 px-6">
          {[
            { key: 'overview', label: 'Overview', icon: User },
            { key: 'performance', label: 'Performance', icon: BarChart3 },
            { key: 'schedule', label: 'Schedule', icon: Calendar },
            { key: 'students', label: 'Students', icon: Users },
            { key: 'notes', label: 'Notes', icon: FileText }
          ].map(({ key, label, icon: Icon }) => (
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
            </button>
          ))}
        </nav>
      </div>

      <div className="p-6">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Performance Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium text-blue-900">Total Students</h4>
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-blue-900">{editedTeacher.total_students}</div>
                <div className="text-sm text-blue-700 mt-1">Across {editedTeacher.total_courses} courses</div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium text-green-900">Teaching Hours</h4>
                  <Clock className="h-6 w-6 text-green-600" />
                </div>
                <div className="text-3xl font-bold text-green-900">{editedTeacher.total_teaching_hours}h</div>
                <div className="text-sm text-green-700 mt-1">{editedTeacher.this_month_hours}h this month</div>
              </div>

              <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 rounded-xl">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium text-yellow-900">Student Rating</h4>
                  <Star className="h-6 w-6 text-yellow-600" />
                </div>
                <div className="text-3xl font-bold text-yellow-900">{editedTeacher.average_rating}/5</div>
                <div className="text-sm text-yellow-700 mt-1">{editedTeacher.student_satisfaction}% satisfaction</div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium text-purple-900">Hourly Rate</h4>
                  <DollarSign className="h-6 w-6 text-purple-600" />
                </div>
                <div className="text-3xl font-bold text-purple-900">${editedTeacher.hourly_rate}</div>
                <div className="text-sm text-purple-700 mt-1">{editedTeacher.employment_type.replace('_', ' ')}</div>
              </div>
            </div>

            {/* Teacher Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Contact Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-gray-400 mr-3" />
                    {isEditing ? (
                      <input
                        type="email"
                        value={editedTeacher.email}
                        onChange={(e) => setEditedTeacher({...editedTeacher, email: e.target.value})}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500"
                      />
                    ) : (
                      <span className="text-gray-700">{editedTeacher.email}</span>
                    )}
                  </div>
                  
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-gray-400 mr-3" />
                    {isEditing ? (
                      <input
                        type="tel"
                        value={editedTeacher.phone}
                        onChange={(e) => setEditedTeacher({...editedTeacher, phone: e.target.value})}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500"
                      />
                    ) : (
                      <span className="text-gray-700">{editedTeacher.phone}</span>
                    )}
                  </div>
                  
                  <div className="flex items-center">
                    <DollarSign className="h-5 w-5 text-gray-400 mr-3" />
                    {isEditing ? (
                      <input
                        type="number"
                        value={editedTeacher.hourly_rate}
                        onChange={(e) => setEditedTeacher({...editedTeacher, hourly_rate: parseFloat(e.target.value)})}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500"
                      />
                    ) : (
                      <span className="text-gray-700">${editedTeacher.hourly_rate}/hour</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Professional Details</h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm font-medium text-gray-500">Employment Type:</span>
                    <div className="mt-1">
                      {isEditing ? (
                        <select
                          value={editedTeacher.employment_type}
                          onChange={(e) => setEditedTeacher({...editedTeacher, employment_type: e.target.value as any})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500"
                        >
                          <option value="full_time">Full Time</option>
                          <option value="part_time">Part Time</option>
                          <option value="freelance">Freelance</option>
                        </select>
                      ) : (
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getEmploymentTypeColor(editedTeacher.employment_type)}`}>
                          {editedTeacher.employment_type.replace('_', ' ').toUpperCase()}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <span className="text-sm font-medium text-gray-500">Work Experience:</span>
                    <div className="mt-1 text-gray-900 font-medium">{editedTeacher.work_experience_years} years</div>
                  </div>
                  
                  <div>
                    <span className="text-sm font-medium text-gray-500">Performance Trend:</span>
                    <div className={`mt-1 flex items-center ${getPerformanceColor(editedTeacher.performance_trend)}`}>
                      <TrendingUp className={`h-4 w-4 mr-1 ${editedTeacher.performance_trend === 'declining' ? 'transform rotate-180' : ''}`} />
                      <span className="font-medium capitalize">{editedTeacher.performance_trend}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Qualifications and Specializations */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Qualifications</h3>
                <div className="space-y-2">
                  {editedTeacher.qualifications.map((qual, index) => (
                    <div key={index} className="flex items-center p-3 bg-green-50 rounded-lg">
                      <GraduationCap className="h-5 w-5 text-green-600 mr-3" />
                      <span className="text-green-800 font-medium">{qual}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Specializations</h3>
                <div className="flex flex-wrap gap-2">
                  {editedTeacher.specializations.map((spec, index) => (
                    <span key={index} className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Performance Tab */}
        {activeTab === 'performance' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Performance Analytics</h3>
            
            {/* KPI Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white border border-gray-200 p-6 rounded-xl">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium text-gray-900">Attendance Rate</h4>
                  <CheckCircle className="h-5 w-5 text-green-500" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{editedTeacher.attendance_rate}%</div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${editedTeacher.attendance_rate}%` }}
                  ></div>
                </div>
                <div className="text-sm text-gray-500 mt-2">Above 90% target</div>
              </div>

              <div className="bg-white border border-gray-200 p-6 rounded-xl">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium text-gray-900">Student Satisfaction</h4>
                  <Star className="h-5 w-5 text-yellow-500" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{editedTeacher.student_satisfaction}%</div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-yellow-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${editedTeacher.student_satisfaction}%` }}
                  ></div>
                </div>
                <div className="text-sm text-gray-500 mt-2">Excellent performance</div>
              </div>

              <div className="bg-white border border-gray-200 p-6 rounded-xl">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium text-gray-900">Monthly Hours</h4>
                  <Clock className="h-5 w-5 text-purple-500" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{editedTeacher.this_month_hours}h</div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-purple-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${(editedTeacher.this_month_hours / 160) * 100}%` }}
                  ></div>
                </div>
                <div className="text-sm text-gray-500 mt-2">Target: 160h/month</div>
              </div>
            </div>
          </div>
        )}

        {/* Other tabs would be implemented similarly */}
      </div>
    </div>
  );
};

export default TeacherProfile;