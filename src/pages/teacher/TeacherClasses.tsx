import React from 'react';
import { Users, Clock, Calendar, Video } from 'lucide-react';

const TeacherClasses = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">My Classes</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          {
            name: 'IELTS Speaking Practice',
            students: 12,
            schedule: 'Mon, Wed, Fri - 9:00 AM',
            nextClass: 'Today, 9:00 AM',
            status: 'active'
          },
          {
            name: 'Business English',
            students: 8,
            schedule: 'Tue, Thu - 11:00 AM',
            nextClass: 'Tomorrow, 11:00 AM',
            status: 'active'
          },
          {
            name: 'Grammar Fundamentals',
            students: 15,
            schedule: 'Daily - 2:00 PM',
            nextClass: 'Today, 2:00 PM',
            status: 'active'
          }
        ].map((classItem, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{classItem.name}</h3>
            
            <div className="space-y-3 mb-4">
              <div className="flex items-center text-sm text-gray-600">
                <Users className="h-4 w-4 mr-2" />
                {classItem.students} students
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Clock className="h-4 w-4 mr-2" />
                {classItem.schedule}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="h-4 w-4 mr-2" />
                Next: {classItem.nextClass}
              </div>
            </div>

            <div className="flex space-x-2">
              <button className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-md text-sm hover:bg-blue-700 flex items-center justify-center">
                <Video className="h-4 w-4 mr-1" />
                Start Class
              </button>
              <button className="px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50">
                Manage
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeacherClasses;