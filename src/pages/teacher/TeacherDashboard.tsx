import React from 'react';
import { Users, BookOpen, Clock, CheckCircle, Calendar, MessageSquare } from 'lucide-react';

const TeacherDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Teacher Dashboard</h1>
        <div className="text-sm text-gray-500">
          Today: {new Date().toLocaleDateString()}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center">
            <div className="p-3 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl shadow-lg">
              <Users className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">My Students</p>
              <p className="text-3xl font-bold text-gray-900">45</p>
            </div>
          </div>
          <div className="mt-4">
            <div className="w-12 h-1 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full"></div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl shadow-lg">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Active Courses</p>
              <p className="text-3xl font-bold text-gray-900">6</p>
            </div>
          </div>
          <div className="mt-4">
            <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"></div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center">
            <div className="p-3 bg-gradient-to-r from-purple-500 to-violet-600 rounded-xl shadow-lg">
              <Clock className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Hours This Week</p>
              <p className="text-3xl font-bold text-gray-900">32</p>
            </div>
          </div>
          <div className="mt-4">
            <div className="w-12 h-1 bg-gradient-to-r from-purple-500 to-violet-600 rounded-full"></div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center">
            <div className="p-3 bg-gradient-to-r from-orange-500 to-amber-600 rounded-xl shadow-lg">
              <CheckCircle className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Pending Grades</p>
              <p className="text-3xl font-bold text-gray-900">12</p>
            </div>
          </div>
          <div className="mt-4">
            <div className="w-12 h-1 bg-gradient-to-r from-orange-500 to-amber-600 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Today's Schedule */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
        <h2 className="text-xl font-semibold mb-6 flex items-center">
          <div className="w-1 h-6 bg-gradient-to-b from-emerald-500 to-teal-600 rounded-full mr-3"></div>
          <Calendar className="h-5 w-5 mr-2 text-emerald-600" />
          Today's Schedule
        </h2>
        <div className="space-y-4">
          {[
            { time: '09:00 AM', class: 'IELTS Speaking Practice', students: 12, room: 'Room A' },
            { time: '11:00 AM', class: 'Business English', students: 8, room: 'Room B' },
            { time: '02:00 PM', class: 'Grammar Fundamentals', students: 15, room: 'Room A' },
            { time: '04:00 PM', class: 'Conversation Club', students: 10, room: 'Online' },
          ].map((session, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl hover:from-emerald-50 hover:to-teal-50 transition-all duration-300 border border-gray-200 hover:border-emerald-200">
              <div className="flex items-center">
                <div className="text-sm font-semibold text-emerald-700 w-20 bg-emerald-100 px-2 py-1 rounded-lg">{session.time}</div>
                <div className="ml-4">
                  <div className="font-semibold text-gray-900">{session.class}</div>
                  <div className="text-sm text-gray-500">{session.students} students • {session.room}</div>
                </div>
              </div>
              <button className="px-6 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg text-sm font-medium hover:from-emerald-600 hover:to-teal-700 transform hover:scale-105 transition-all duration-200 shadow-lg">
                Start Class
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Submissions</h2>
          <div className="space-y-4">
            {[
              { student: 'John Doe', assignment: 'Essay Writing Task', time: '2 hours ago' },
              { student: 'Jane Smith', assignment: 'Speaking Recording', time: '4 hours ago' },
              { student: 'Mike Johnson', assignment: 'Grammar Quiz', time: '1 day ago' },
            ].map((submission, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-gray-900">{submission.student}</div>
                  <div className="text-sm text-gray-500">{submission.assignment}</div>
                </div>
                <div className="text-sm text-gray-500">{submission.time}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <MessageSquare className="h-5 w-5 mr-2 text-green-600" />
            Messages
          </h2>
          <div className="space-y-4">
            {[
              { from: 'Parent - Sarah Wilson', message: 'Question about homework schedule', time: '1 hour ago' },
              { from: 'Student - Alex Chen', message: 'Request for extra practice materials', time: '3 hours ago' },
              { from: 'Admin', message: 'Monthly performance review scheduled', time: '1 day ago' },
            ].map((message, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-start mb-1">
                  <div className="font-medium text-gray-900 text-sm">{message.from}</div>
                  <div className="text-xs text-gray-500">{message.time}</div>
                </div>
                <div className="text-sm text-gray-600">{message.message}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;