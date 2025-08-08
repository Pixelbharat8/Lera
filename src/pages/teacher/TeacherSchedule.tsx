import React from 'react';
import { Calendar, Clock, Users, Video } from 'lucide-react';

const TeacherSchedule = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">My Schedule</h1>

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
            <div key={dayIndex} className="min-h-96 border border-gray-200 rounded-lg p-2">
              {dayIndex < 5 && ( // Only show classes on weekdays
                <div className="space-y-2">
                  {dayIndex === 0 && (
                    <>
                      <div className="bg-blue-100 p-2 rounded text-xs">
                        <div className="font-medium">9:00 AM</div>
                        <div>IELTS Speaking</div>
                        <div className="text-gray-600">12 students</div>
                      </div>
                      <div className="bg-green-100 p-2 rounded text-xs">
                        <div className="font-medium">2:00 PM</div>
                        <div>Grammar Class</div>
                        <div className="text-gray-600">15 students</div>
                      </div>
                    </>
                  )}
                  {dayIndex === 1 && (
                    <div className="bg-purple-100 p-2 rounded text-xs">
                      <div className="font-medium">11:00 AM</div>
                      <div>Business English</div>
                      <div className="text-gray-600">8 students</div>
                    </div>
                  )}
                  {dayIndex === 2 && (
                    <div className="bg-blue-100 p-2 rounded text-xs">
                      <div className="font-medium">9:00 AM</div>
                      <div>IELTS Speaking</div>
                      <div className="text-gray-600">12 students</div>
                    </div>
                  )}
                  {dayIndex === 3 && (
                    <div className="bg-purple-100 p-2 rounded text-xs">
                      <div className="font-medium">11:00 AM</div>
                      <div>Business English</div>
                      <div className="text-gray-600">8 students</div>
                    </div>
                  )}
                  {dayIndex === 4 && (
                    <>
                      <div className="bg-blue-100 p-2 rounded text-xs">
                        <div className="font-medium">9:00 AM</div>
                        <div>IELTS Speaking</div>
                        <div className="text-gray-600">12 students</div>
                      </div>
                      <div className="bg-orange-100 p-2 rounded text-xs">
                        <div className="font-medium">4:00 PM</div>
                        <div>Conversation Club</div>
                        <div className="text-gray-600">10 students</div>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-lg font-semibold mb-4">Upcoming Classes</h2>
        <div className="space-y-4">
          {[
            {
              time: 'Today, 2:00 PM',
              class: 'Grammar Fundamentals',
              students: 15,
              room: 'Room A',
              type: 'in-person'
            },
            {
              time: 'Tomorrow, 9:00 AM',
              class: 'IELTS Speaking Practice',
              students: 12,
              room: 'Online',
              type: 'online'
            },
            {
              time: 'Tomorrow, 11:00 AM',
              class: 'Business English',
              students: 8,
              room: 'Room B',
              type: 'in-person'
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
                    {session.time} • {session.students} students • {session.room}
                  </div>
                </div>
              </div>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700">
                {session.type === 'online' ? 'Start Online' : 'Enter Room'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeacherSchedule;