import React from 'react';
import { BookOpen, Clock, Trophy, Target, PlayCircle, Calendar } from 'lucide-react';
import GamificationPanel from '../../components/gamification/GamificationPanel';

const StudentDashboard = () => {
  // Mock gamification data
  const gamificationData = {
    points: 2450,
    level: 8,
    badges: ['Quick Learner', 'Quiz Master', 'Streak Champion', 'Course Completer'],
    streak: 15,
    nextLevelPoints: 550
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">My Learning Dashboard</h1>
        <div className="text-sm text-gray-500">
          Welcome back! Keep up the great work.
        </div>
      </div>

      {/* Gamification Panel */}
      <GamificationPanel {...gamificationData} />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl shadow-lg">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Enrolled Courses</p>
              <p className="text-3xl font-bold text-gray-900">3</p>
            </div>
          </div>
          <div className="mt-4">
            <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full"></div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center">
            <div className="p-3 bg-gradient-to-r from-emerald-500 to-green-600 rounded-xl shadow-lg">
              <Clock className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Study Hours</p>
              <p className="text-3xl font-bold text-gray-900">42</p>
            </div>
          </div>
          <div className="mt-4">
            <div className="w-12 h-1 bg-gradient-to-r from-emerald-500 to-green-600 rounded-full"></div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center">
            <div className="p-3 bg-gradient-to-r from-purple-500 to-violet-600 rounded-xl shadow-lg">
              <Trophy className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Certificates</p>
              <p className="text-3xl font-bold text-gray-900">2</p>
            </div>
          </div>
          <div className="mt-4">
            <div className="w-12 h-1 bg-gradient-to-r from-purple-500 to-violet-600 rounded-full"></div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center">
            <div className="p-3 bg-gradient-to-r from-orange-500 to-amber-600 rounded-xl shadow-lg">
              <Target className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Average Score</p>
              <p className="text-3xl font-bold text-gray-900">87%</p>
            </div>
          </div>
          <div className="mt-4">
            <div className="w-12 h-1 bg-gradient-to-r from-orange-500 to-amber-600 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Continue Learning */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
        <h2 className="text-xl font-semibold mb-6 flex items-center">
          <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-cyan-600 rounded-full mr-3"></div>
          Continue Learning
        </h2>
        <div className="space-y-4">
          {[
            {
              course: 'IELTS Academic Preparation',
              lesson: 'Writing Task 2: Essay Structure',
              progress: 65,
              duration: '45 min',
              thumbnail: 'https://images.pexels.com/photos/4778621/pexels-photo-4778621.jpeg?auto=compress&cs=tinysrgb&w=150'
            },
            {
              course: 'Business English Communication',
              lesson: 'Email Writing Fundamentals',
              progress: 30,
              duration: '30 min',
              thumbnail: 'https://images.pexels.com/photos/3183183/pexels-photo-3183183.jpeg?auto=compress&cs=tinysrgb&w=150'
            }
          ].map((item, index) => (
            <div key={index} className="flex items-center p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl hover:from-blue-50 hover:to-cyan-50 transition-all duration-300 border border-gray-200 hover:border-blue-200">
              <img
                src={item.thumbnail}
                alt={item.course}
                className="w-16 h-16 rounded-xl object-cover shadow-md border-2 border-white"
              />
              <div className="ml-4 flex-1">
                <div className="font-semibold text-gray-900">{item.course}</div>
                <div className="text-sm text-gray-600">{item.lesson}</div>
                <div className="mt-2 flex items-center">
                  <div className="flex-1 bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-cyan-600 h-2.5 rounded-full shadow-sm"
                      style={{ width: `${item.progress}%` }}
                    ></div>
                  </div>
                  <span className="ml-2 text-sm font-medium text-gray-600">{item.progress}%</span>
                </div>
              </div>
              <div className="ml-4 text-right">
                <div className="text-sm text-gray-500">{item.duration}</div>
                <button className="mt-2 flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-lg text-sm font-medium hover:from-blue-600 hover:to-cyan-700 transform hover:scale-105 transition-all duration-200 shadow-lg">
                  <PlayCircle className="h-4 w-4 mr-1" />
                  Continue
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Schedule */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center">
          <Calendar className="h-5 w-5 mr-2 text-blue-600" />
          Upcoming Classes
        </h2>
        <div className="space-y-4">
          {[
            { time: 'Today, 2:00 PM', class: 'IELTS Speaking Practice', teacher: 'Ms. Ledia Balliu' },
            { time: 'Tomorrow, 10:00 AM', class: 'Grammar Workshop', teacher: 'Mr. Mo Tran' },
            { time: 'Friday, 4:00 PM', class: 'Conversation Club', teacher: 'Ms. Sarah Thompson' },
          ].map((session, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <div className="font-medium text-gray-900">{session.class}</div>
                <div className="text-sm text-gray-500">{session.time} • {session.teacher}</div>
              </div>
              <button className="px-4 py-2 bg-green-600 text-white rounded-md text-sm hover:bg-green-700">
                Join Class
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;