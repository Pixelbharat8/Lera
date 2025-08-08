import { useEffect } from 'react';
import React, { useState } from 'react';
import { Trophy, Star, Target, Award, Plus, Edit, Trash2, TrendingUp, Users } from 'lucide-react';

const AdminGamification = () => {
  const [activeTab, setActiveTab] = useState<'badges' | 'achievements' | 'leaderboard' | 'rewards'>('badges');

  const mockBadges = [
    { id: '1', name: 'Quick Learner', description: 'Complete 5 lessons in a day', icon: '🚀', rarity: 'common', earned_count: 245 },
    { id: '2', name: 'Quiz Master', description: 'Score 100% on 10 quizzes', icon: '🎯', rarity: 'rare', earned_count: 89 },
    { id: '3', name: 'Streak Champion', description: 'Maintain 30-day learning streak', icon: '🔥', rarity: 'epic', earned_count: 34 },
    { id: '4', name: 'Course Completer', description: 'Complete an entire course', icon: '🏆', rarity: 'common', earned_count: 156 },
    { id: '5', name: 'Perfect Score', description: 'Score 100% on final exam', icon: '⭐', rarity: 'legendary', earned_count: 12 }
  ];

  const mockLeaderboard = [
    { rank: 1, name: 'Nguyen Minh Duc', points: 4250, level: 12, badges: 8, avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150' },
    { rank: 2, name: 'Tran Thi Mai', points: 3890, level: 11, badges: 6, avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150' },
    { rank: 3, name: 'Le Van Hung', points: 3450, level: 10, badges: 5, avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150' },
    { rank: 4, name: 'Pham Thi Lan', points: 3120, level: 9, badges: 4, avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150' },
    { rank: 5, name: 'Hoang Van Nam', points: 2980, level: 9, badges: 7, avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=150' }
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'bg-gray-100 text-gray-800';
      case 'rare': return 'bg-blue-100 text-blue-800';
      case 'epic': return 'bg-purple-100 text-purple-800';
      case 'legendary': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold gradient-text">Gamification Management</h1>
        <button className="btn-primary flex items-center">
          <Plus className="h-5 w-5 mr-2" />
          Create Badge
        </button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card-3d bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Trophy className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Points Awarded</p>
              <p className="text-2xl font-bold text-gray-900">485,230</p>
            </div>
          </div>
        </div>

        <div className="card-3d bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Award className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Badges Earned</p>
              <p className="text-2xl font-bold text-gray-900">1,247</p>
            </div>
          </div>
        </div>

        <div className="card-3d bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <Target className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Active Challenges</p>
              <p className="text-2xl font-bold text-gray-900">12</p>
            </div>
          </div>
        </div>

        <div className="card-3d bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center">
            <div className="p-3 bg-orange-100 rounded-lg">
              <Users className="h-6 w-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Participation Rate</p>
              <p className="text-2xl font-bold text-gray-900">89%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { key: 'badges', label: 'Badges', icon: Award },
            { key: 'achievements', label: 'Achievements', icon: Trophy },
            { key: 'leaderboard', label: 'Leaderboard', icon: Star },
            { key: 'rewards', label: 'Rewards', icon: Target }
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

      {/* Badges Tab */}
      {activeTab === 'badges' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockBadges.map((badge) => (
              <div key={badge.id} className="card-3d bg-white rounded-xl shadow-lg border p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <div className="text-4xl mr-4">{badge.icon}</div>
                    <div>
                      <h3 className="font-bold text-gray-900">{badge.name}</h3>
                      <p className="text-sm text-gray-600">{badge.description}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRarityColor(badge.rarity)}`}>
                    {badge.rarity}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="text-sm text-gray-500">
                    {badge.earned_count} students earned
                  </div>
                  <div className="flex space-x-2">
                    <button className="p-2 text-blue-600 hover:text-blue-800">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button className="p-2 text-red-600 hover:text-red-800">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Leaderboard Tab */}
      {activeTab === 'leaderboard' && (
        <div className="bg-white rounded-xl shadow-lg border overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Student Leaderboard</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {mockLeaderboard.map((student) => (
                <div key={student.rank} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${
                      student.rank === 1 ? 'bg-yellow-500' :
                      student.rank === 2 ? 'bg-gray-400' :
                      student.rank === 3 ? 'bg-orange-600' : 'bg-blue-500'
                    }`}>
                      {student.rank}
                    </div>
                    <img
                      src={student.avatar}
                      alt={student.name}
                      className="w-10 h-10 rounded-full object-cover ml-4 border-2 border-white"
                    />
                    <div className="ml-4">
                      <div className="font-medium text-gray-900">{student.name}</div>
                      <div className="text-sm text-gray-500">Level {student.level} • {student.badges} badges</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-gray-900">{student.points.toLocaleString()}</div>
                    <div className="text-sm text-gray-500">points</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Achievements Tab */}
      {activeTab === 'achievements' && (
        <div className="bg-white rounded-xl shadow-lg border p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-6">Achievement System</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
              <h3 className="font-semibold text-blue-900 mb-4">Learning Achievements</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-blue-800">First Lesson Complete</span>
                  <span className="text-blue-600 font-medium">+10 points</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-blue-800">Course Milestone (25%)</span>
                  <span className="text-blue-600 font-medium">+50 points</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-blue-800">Course Completion</span>
                  <span className="text-blue-600 font-medium">+200 points</span>
                </div>
              </div>
            </div>

            <div className="p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
              <h3 className="font-semibold text-green-900 mb-4">Performance Achievements</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-green-800">Perfect Quiz Score</span>
                  <span className="text-green-600 font-medium">+25 points</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-green-800">Excellent Assignment</span>
                  <span className="text-green-600 font-medium">+30 points</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-green-800">Speaking Confidence</span>
                  <span className="text-green-600 font-medium">+40 points</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Rewards Tab */}
      {activeTab === 'rewards' && (
        <div className="bg-white rounded-xl shadow-lg border p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-6">Reward System</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Free Live Class', cost: 500, description: 'Access to premium live class', available: 25 },
              { title: 'Course Discount', cost: 1000, description: '20% off next course enrollment', available: 15 },
              { title: 'One-on-One Session', cost: 1500, description: '30-minute private tutoring', available: 8 },
              { title: 'Certificate Frame', cost: 800, description: 'Premium certificate frame', available: 12 },
              { title: 'Study Materials', cost: 300, description: 'Downloadable study pack', available: 50 },
              { title: 'IELTS Mock Test', cost: 600, description: 'Full IELTS practice test', available: 20 }
            ].map((reward, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-2">{reward.title}</h3>
                <p className="text-sm text-gray-600 mb-3">{reward.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-blue-600">{reward.cost} pts</span>
                  <span className="text-sm text-gray-500">{reward.available} available</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminGamification;