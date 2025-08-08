import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { User, Mail, Phone, Calendar, MapPin, Edit, Save, X, Camera, Award, BookOpen, Clock, TrendingUp, Users } from 'lucide-react';

const ProfilePage = () => {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    full_name: user?.name || '',
    email: user?.email || '',
    phone: '+84 123 456 789',
    date_of_birth: '1995-06-15',
    nationality: 'Vietnamese',
    address: 'Hai Phong, Vietnam',
    bio: 'Passionate English learner focused on achieving IELTS Band 8.0 for university admission.',
    learning_goals: ['IELTS Band 8.0', 'Academic Writing Mastery', 'Business Communication'],
    interests: ['Travel', 'Technology', 'International Business']
  });

  const handleSave = async () => {
    try {
      await updateProfile({
        name: profileData.full_name,
        email: profileData.email,
        bio: profileData.bio
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleCancel = () => {
    setProfileData({
      full_name: user?.name || '',
      email: user?.email || '',
      phone: '+84 123 456 789',
      date_of_birth: '1995-06-15',
      nationality: 'Vietnamese',
      address: 'Hai Phong, Vietnam',
      bio: 'Passionate English learner focused on achieving IELTS Band 8.0 for university admission.',
      learning_goals: ['IELTS Band 8.0', 'Academic Writing Mastery', 'Business Communication'],
      interests: ['Travel', 'Technology', 'International Business']
    });
    setIsEditing(false);
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Please sign in</h2>
          <p className="mt-2 text-gray-600">You need to be logged in to view your profile.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-lg border overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-12">
            <div className="flex items-center">
              <div className="relative">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                />
                <button className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full shadow-lg hover:bg-blue-700">
                  <Camera className="h-4 w-4" />
                </button>
              </div>
              <div className="ml-6 text-white">
                <h1 className="text-3xl font-bold">{user.name}</h1>
                <p className="text-blue-100 text-lg">{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</p>
                <p className="text-blue-200 mt-2">Member since {new Date(user.createdAt).getFullYear()}</p>
              </div>
            </div>
          </div>

          <div className="p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Personal Information</h2>
              {isEditing ? (
                <div className="flex space-x-3">
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
                </div>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profileData.full_name}
                      onChange={(e) => setProfileData({...profileData, full_name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <div className="flex items-center">
                      <User className="h-5 w-5 text-gray-400 mr-3" />
                      <span className="text-gray-900">{profileData.full_name}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-gray-400 mr-3" />
                    <span className="text-gray-900">{profileData.email}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <div className="flex items-center">
                      <Phone className="h-5 w-5 text-gray-400 mr-3" />
                      <span className="text-gray-900">{profileData.phone}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-gray-400 mr-3" />
                    <span className="text-gray-900">{new Date(profileData.date_of_birth).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nationality</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profileData.nationality}
                      onChange={(e) => setProfileData({...profileData, nationality: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <div className="flex items-center">
                      <MapPin className="h-5 w-5 text-gray-400 mr-3" />
                      <span className="text-gray-900">{profileData.nationality}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profileData.address}
                      onChange={(e) => setProfileData({...profileData, address: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <div className="flex items-center">
                      <MapPin className="h-5 w-5 text-gray-400 mr-3" />
                      <span className="text-gray-900">{profileData.address}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                  {isEditing ? (
                    <textarea
                      value={profileData.bio}
                      onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="text-gray-900">{profileData.bio}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Learning Goals */}
        <div className="bg-white rounded-xl shadow-lg border p-8 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Learning Goals</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {profileData.learning_goals.map((goal, index) => (
              <div key={index} className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <div className="flex items-center">
                  <Award className="h-5 w-5 text-blue-600 mr-3" />
                  <span className="font-medium text-blue-900">{goal}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Learning Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
            <div className="p-3 bg-blue-100 rounded-lg w-fit mx-auto mb-4">
              <BookOpen className="h-6 w-6 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">3</div>
            <div className="text-sm text-gray-600">Enrolled Courses</div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
            <div className="p-3 bg-green-100 rounded-lg w-fit mx-auto mb-4">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">85%</div>
            <div className="text-sm text-gray-600">Average Progress</div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
            <div className="p-3 bg-purple-100 rounded-lg w-fit mx-auto mb-4">
              <Clock className="h-6 w-6 text-purple-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">124h</div>
            <div className="text-sm text-gray-600">Study Time</div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
            <div className="p-3 bg-orange-100 rounded-lg w-fit mx-auto mb-4">
              <Award className="h-6 w-6 text-orange-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">7</div>
            <div className="text-sm text-gray-600">Badges Earned</div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-lg border p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Activity</h2>
          <div className="space-y-4">
            {[
              { date: '2024-01-23', activity: 'Completed IELTS Writing Task 2', type: 'assignment', score: '85%' },
              { date: '2024-01-22', activity: 'Attended Speaking Practice Session', type: 'class', duration: '90 min' },
              { date: '2024-01-21', activity: 'Submitted Grammar Assignment', type: 'homework', score: '92%' },
              { date: '2024-01-20', activity: 'Participated in Conversation Club', type: 'activity', duration: '60 min' },
              { date: '2024-01-19', activity: 'Completed Listening Module 3', type: 'lesson', progress: '100%' }
            ].map((item, index) => (
              <div key={index} className="flex items-start p-4 bg-gray-50 rounded-lg">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  {item.type === 'assignment' && <Edit className="h-5 w-5 text-blue-600" />}
                  {item.type === 'class' && <BookOpen className="h-5 w-5 text-green-600" />}
                  {item.type === 'homework' && <Award className="h-5 w-5 text-purple-600" />}
                  {item.type === 'activity' && <Users className="h-5 w-5 text-orange-600" />}
                  {item.type === 'lesson' && <TrendingUp className="h-5 w-5 text-pink-600" />}
                </div>
                <div className="ml-4 flex-1">
                  <div className="font-medium text-gray-900">{item.activity}</div>
                  <div className="text-sm text-gray-500 flex justify-between">
                    <span>{new Date(item.date).toLocaleDateString()}</span>
                    {item.score && <span className="font-medium text-green-600">{item.score}</span>}
                    {item.duration && <span className="text-blue-600">{item.duration}</span>}
                    {item.progress && <span className="text-purple-600">{item.progress}</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;