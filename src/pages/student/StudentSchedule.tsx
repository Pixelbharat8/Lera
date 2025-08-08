import React from 'react';
import { Calendar, Clock, Video, Users } from 'lucide-react';

const StudentSchedule = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">My Schedule</h1>

      {/* Upcoming Classes */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center">
          <Calendar className="h-5 w-5 mr-2 text-blue-600" />
          Upcoming Classes
        </h2>
        <div className="space-y-4">
          {[
            {
              time: 'Today, 2:00 PM',
              class: 'IELTS Speaking Practice',
              teacher: 'Ms. Ledia Balliu',
              type: 'live',
              duration: '90 min'
            },
            {
              time: 'Tomorrow, 10:00 AM',
              class: 'Grammar Workshop',
              teacher: 'Mr. Mo Tran',
              type: 'online',
              duration: '60 min'
            },
            {
              time: 'Friday, 4:00 PM',
              class: 'Conversation Club',
              teacher: 'Ms. Sarah Thompson',
              type: 'live',
              duration: '120 min'
            },
            {
              time: 'Monday, 9:00 AM',
              class: 'Business English',
              teacher: 'Mr. Michael Anderson',
              type: 'online',
              duration: '90 min'
            }
          ].map((session, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg mr-4">
                  {session.type === 'online' ? (
                    <Video className="h-5 w-5 text-blue-600" />
                  ) : (
                    <Users className="h-5 w-5 text-blue-600" />
                  )}
                </div>
                <div>
                  <div className="font-medium text-gray-900">{session.class}</div>
                  <div className="text-sm text-gray-500 flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {session.time} • {session.duration} • {session.teacher}
                  </div>
                </div>
              </div>
              <button className="px-4 py-2 bg-green-600 text-white rounded-md text-sm hover:bg-green-700">
                {session.type === 'online' ? 'Join Online' : 'Join Class'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Weekly Calendar View */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold">This Week</h2>
          <div className="flex space-x-2">
            <button className="px-4 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50">
              Previous
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50">
              Next
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-4 mb-4">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
            <div key={day} className="text-center font-medium text-gray-700 py-2">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-4">
          {Array.from({ length: 7 }, (_, dayIndex) => (
            <div key={dayIndex} className="min-h-32 border border-gray-200 rounded-lg p-2">
              {dayIndex === 0 && (
                <div className="bg-blue-100 p-2 rounded text-xs">
                  <div className="font-medium">9:00 AM</div>
                  <div>Business English</div>
                </div>
              )}
              {dayIndex === 1 && (
                <div className="bg-green-100 p-2 rounded text-xs">
                  <div className="font-medium">10:00 AM</div>
                  <div>Grammar Workshop</div>
                </div>
              )}
              {dayIndex === 2 && (
                <div className="bg-purple-100 p-2 rounded text-xs">
                  <div className="font-medium">2:00 PM</div>
                  <div>IELTS Speaking</div>
                </div>
              )}
              {dayIndex === 4 && (
                <div className="bg-orange-100 p-2 rounded text-xs">
                  <div className="font-medium">4:00 PM</div>
                  <div>Conversation Club</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Study Goals */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-lg font-semibold mb-4">Weekly Study Goals</h2>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600">Study Hours</span>
              <span className="font-medium text-gray-900">8 / 10 hours</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: '80%' }}></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600">Assignments Completed</span>
              <span className="font-medium text-gray-900">3 / 4</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-600 h-2 rounded-full" style={{ width: '75%' }}></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600">Classes Attended</span>
              <span className="font-medium text-gray-900">5 / 5</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-purple-600 h-2 rounded-full" style={{ width: '100%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentSchedule;