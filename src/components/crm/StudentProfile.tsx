import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  BookOpen, 
  TrendingUp, 
  Award, 
  Clock,
  Edit,
  Save,
  X,
  AlertCircle,
  CheckCircle,
  Star,
  MessageSquare,
  Target,
  Globe,
  ClipboardCheck
} from 'lucide-react';

interface StudentProfileProps {
  student: {
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
    attendance_rate: number;
    completion_rate: number;
    average_score: number;
    total_study_hours: number;
    payment_status: 'current' | 'overdue' | 'pending';
  };
  onUpdate?: (updatedStudent: StudentProfileProps['student']) => void;
  onClose?: () => void;
}

const StudentProfile: React.FC<StudentProfileProps> = ({ student, onUpdate, onClose }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedStudent, setEditedStudent] = useState(student);
  const [activeTab, setActiveTab] = useState<'overview' | 'progress' | 'communication' | 'notes'>('overview');

  const handleSave = () => {
    onUpdate?.(editedStudent);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedStudent(student);
    setIsEditing(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'current':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border max-w-4xl mx-auto">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="relative">
              <img
                src={editedStudent.avatar_url}
                alt={editedStudent.full_name}
                className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
              />
              <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-white ${
                editedStudent.is_active ? 'bg-green-500' : 'bg-gray-400'
              }`}></div>
            </div>
            <div className="ml-6">
              {isEditing ? (
                <input
                  type="text"
                  value={editedStudent.full_name}
                  onChange={(e) => setEditedStudent({...editedStudent, full_name: e.target.value})}
                  className="text-2xl font-bold text-gray-900 border-b border-gray-300 focus:border-blue-500 bg-transparent"
                />
              ) : (
                <h1 className="text-2xl font-bold text-gray-900">{editedStudent.full_name}</h1>
              )}
              <p className="text-lg text-gray-600">{editedStudent.current_level.replace('_', ' ')}</p>
              <div className="flex items-center mt-2">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(editedStudent.payment_status)}`}>
                  Payment: {editedStudent.payment_status}
                </span>
                <span className="ml-3 text-sm text-gray-500">
                  Student since {new Date(editedStudent.enrollment_date).toLocaleDateString()}
                </span>
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
                <X className="h-5 w-5" />
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
            { key: 'progress', label: 'Progress', icon: TrendingUp },
            { key: 'communication', label: 'Communication', icon: MessageSquare },
            { key: 'notes', label: 'Notes', icon: BookOpen }
          ].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key as 'overview' | 'progress' | 'communication' | 'notes')}
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
            {/* Performance Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center justify-center mb-2">
                  <Target className="h-6 w-6 text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-blue-600">{editedStudent.attendance_rate}%</div>
                <div className="text-sm text-gray-600">Attendance Rate</div>
              </div>
              
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="flex items-center justify-center mb-2">
                  <Award className="h-6 w-6 text-green-600" />
                </div>
                <div className="text-2xl font-bold text-green-600">{editedStudent.average_score}%</div>
                <div className="text-sm text-gray-600">Average Score</div>
              </div>
              
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="flex items-center justify-center mb-2">
                  <BookOpen className="h-6 w-6 text-purple-600" />
                </div>
                <div className="text-2xl font-bold text-purple-600">{editedStudent.completion_rate}%</div>
                <div className="text-sm text-gray-600">Completion Rate</div>
              </div>
              
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="flex items-center justify-center mb-2">
                  <Clock className="h-6 w-6 text-orange-600" />
                </div>
                <div className="text-2xl font-bold text-orange-600">{editedStudent.total_study_hours}h</div>
                <div className="text-sm text-gray-600">Study Hours</div>
              </div>
            </div>

            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-gray-400 mr-3" />
                    {isEditing ? (
                      <input
                        type="email"
                        value={editedStudent.email}
                        onChange={(e) => setEditedStudent({...editedStudent, email: e.target.value})}
                        className="flex-1 px-3 py-1 border border-gray-300 rounded focus:border-blue-500"
                      />
                    ) : (
                      <span className="text-gray-700">{editedStudent.email}</span>
                    )}
                  </div>
                  
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-gray-400 mr-3" />
                    {isEditing ? (
                      <input
                        type="tel"
                        value={editedStudent.phone}
                        onChange={(e) => setEditedStudent({...editedStudent, phone: e.target.value})}
                        className="flex-1 px-3 py-1 border border-gray-300 rounded focus:border-blue-500"
                      />
                    ) : (
                      <span className="text-gray-700">{editedStudent.phone}</span>
                    )}
                  </div>
                  
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-gray-400 mr-3" />
                    <span className="text-gray-700">{new Date(editedStudent.date_of_birth).toLocaleDateString()}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <Globe className="h-5 w-5 text-gray-400 mr-3" />
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedStudent.nationality}
                        onChange={(e) => setEditedStudent({...editedStudent, nationality: e.target.value})}
                        className="flex-1 px-3 py-1 border border-gray-300 rounded focus:border-blue-500"
                      />
                    ) : (
                      <span className="text-gray-700">{editedStudent.nationality}</span>
                    )}
                  </div>
                  
                  {editedStudent.guardian_name && (
                    <div className="flex items-center">
                      <User className="h-5 w-5 text-gray-400 mr-3" />
                      <span className="text-gray-700">Guardian: {editedStudent.guardian_name}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Learning Goals</h3>
                {editedStudent.learning_goals && (
                  <div className="space-y-2">
                    {editedStudent.learning_goals.map((goal, index) => (
                      <div key={index} className="flex items-center p-3 bg-blue-50 rounded-lg">
                        <Target className="h-4 w-4 text-blue-600 mr-3" />
                        <span className="text-blue-800 font-medium">{goal}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Progress Tab */}
        {activeTab === 'progress' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Learning Progress Overview</h3>
            
            {/* Progress Charts */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium text-blue-900">Attendance</h4>
                  <CheckCircle className="h-5 w-5 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-blue-900 mb-2">{editedStudent.attendance_rate}%</div>
                <div className="w-full bg-blue-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${editedStudent.attendance_rate}%` }}
                  ></div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium text-green-900">Course Progress</h4>
                  <BookOpen className="h-5 w-5 text-green-600" />
                </div>
                <div className="text-3xl font-bold text-green-900 mb-2">{editedStudent.completion_rate}%</div>
                <div className="w-full bg-green-200 rounded-full h-2">
                  <div 
                    className="bg-green-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${editedStudent.completion_rate}%` }}
                  ></div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium text-purple-900">Performance</h4>
                  <Star className="h-5 w-5 text-purple-600" />
                </div>
                <div className="text-3xl font-bold text-purple-900 mb-2">{editedStudent.average_score}%</div>
                <div className="w-full bg-purple-200 rounded-full h-2">
                  <div 
                    className="bg-purple-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${editedStudent.average_score}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Recent Activity Timeline */}
            <div className="bg-gray-50 p-6 rounded-xl">
              <h4 className="font-medium text-gray-900 mb-4">Recent Learning Activity</h4>
              <div className="space-y-4">
                {[
                  { date: '2024-01-23', activity: 'Completed IELTS Writing Task 2', score: '85%', type: 'assessment' },
                  { date: '2024-01-22', activity: 'Attended Speaking Practice Session', duration: '90 min', type: 'class' },
                  { date: '2024-01-21', activity: 'Submitted Grammar Assignment', score: '92%', type: 'homework' },
                  { date: '2024-01-20', activity: 'Participated in Conversation Club', duration: '60 min', type: 'activity' }
                ].map((item, index) => (
                  <div key={index} className="flex items-start">
                    <div className="flex-shrink-0 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                      {item.type === 'assessment' && <Award className="h-5 w-5 text-purple-600" />}
                      {item.type === 'class' && <BookOpen className="h-5 w-5 text-blue-600" />}
                      {item.type === 'homework' && <ClipboardCheck className="h-5 w-5 text-green-600" />}
                      {item.type === 'activity' && <MessageSquare className="h-5 w-5 text-orange-600" />}
                    </div>
                    <div className="ml-4 flex-1">
                      <div className="font-medium text-gray-900">{item.activity}</div>
                      <div className="text-sm text-gray-500 flex justify-between">
                        <span>{new Date(item.date).toLocaleDateString()}</span>
                        {item.score && <span className="font-medium text-green-600">{item.score}</span>}
                        {item.duration && <span className="text-blue-600">{item.duration}</span>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Communication Tab */}
        {activeTab === 'communication' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Communication History</h3>
            
            {/* Quick Actions */}
            <div className="flex space-x-4">
              <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                <Mail className="h-4 w-4 mr-2" />
                Send Email
              </button>
              <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                <MessageSquare className="h-4 w-4 mr-2" />
                Send Message
              </button>
              <button className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                <Phone className="h-4 w-4 mr-2" />
                Schedule Call
              </button>
            </div>

            {/* Communication Timeline */}
            <div className="space-y-4">
              {[
                { date: '2024-01-22', type: 'email', subject: 'Progress Update', from: 'Teacher', content: 'Great improvement in speaking skills this week...' },
                { date: '2024-01-20', type: 'message', subject: 'Homework Reminder', from: 'System', content: 'Don\'t forget your writing assignment due tomorrow.' },
                { date: '2024-01-18', type: 'call', subject: 'Parent Meeting', from: 'Admin', content: '30-minute discussion about learning progress' },
                { date: '2024-01-15', type: 'email', subject: 'Welcome Message', from: 'Teacher', content: 'Welcome to IELTS Academic Mastery program...' }
              ].map((comm, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        comm.type === 'email' ? 'bg-blue-100' :
                        comm.type === 'message' ? 'bg-green-100' : 'bg-purple-100'
                      }`}>
                        {comm.type === 'email' && <Mail className="h-5 w-5 text-blue-600" />}
                        {comm.type === 'message' && <MessageSquare className="h-5 w-5 text-green-600" />}
                        {comm.type === 'call' && <Phone className="h-5 w-5 text-purple-600" />}
                      </div>
                      <div className="ml-4 flex-1">
                        <div className="font-medium text-gray-900">{comm.subject}</div>
                        <div className="text-sm text-gray-500 mb-2">From: {comm.from} • {new Date(comm.date).toLocaleDateString()}</div>
                        <div className="text-sm text-gray-700">{comm.content}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Notes Tab */}
        {activeTab === 'notes' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Student Notes</h3>
              <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                <Edit className="h-4 w-4 mr-2" />
                Add Note
              </button>
            </div>

            {/* Special Notes */}
            {editedStudent.special_notes && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start">
                  <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 mr-3" />
                  <div>
                    <div className="font-medium text-yellow-800">Special Notes</div>
                    <div className="text-yellow-700 mt-1">{editedStudent.special_notes}</div>
                  </div>
                </div>
              </div>
            )}

            {/* Notes History */}
            <div className="space-y-4">
              {[
                { date: '2024-01-22', author: 'Ms. Ledia Balliu', type: 'Academic', content: 'Student shows excellent progress in IELTS speaking. Recommend moving to advanced writing module.' },
                { date: '2024-01-18', author: 'Mr. Mo Tran', type: 'Behavioral', content: 'Very engaged in class discussions. Natural leadership qualities.' },
                { date: '2024-01-15', author: 'Admin', type: 'Administrative', content: 'Payment received for Q1. Student eligible for premium features.' },
                { date: '2024-01-10', author: 'Ms. Sarah Thompson', type: 'Academic', content: 'Initial assessment completed. Strong foundation, ready for intermediate level.' }
              ].map((note, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                        <User className="h-4 w-4 text-gray-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{note.author}</div>
                        <div className="text-sm text-gray-500">{new Date(note.date).toLocaleDateString()}</div>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      note.type === 'Academic' ? 'bg-blue-100 text-blue-800' :
                      note.type === 'Behavioral' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {note.type}
                    </span>
                  </div>
                  <div className="text-gray-700">{note.content}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentProfile;