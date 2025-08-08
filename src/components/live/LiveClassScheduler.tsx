import { useEffect } from 'react';
import React, { useState } from 'react';
import { Calendar, Clock, Users, Video, Plus, Edit, Trash2 } from 'lucide-react';

interface LiveClass {
  id: string;
  title: string;
  instructor: string;
  date: string;
  time: string;
  duration: number;
  maxStudents: number;
  enrolledStudents: number;
  status: 'scheduled' | 'live' | 'ended' | 'cancelled';
  meetingLink?: string;
}

const LiveClassScheduler = () => {
  const [classes, setClasses] = useState<LiveClass[]>([
    {
      id: '1',
      title: 'IELTS Speaking Practice',
      instructor: 'Ms. Ledia Balliu',
      date: '2025-01-25',
      time: '14:00',
      duration: 90,
      maxStudents: 15,
      enrolledStudents: 12,
      status: 'scheduled'
    },
    {
      id: '2',
      title: 'Business English Workshop',
      instructor: 'Mr. Mo Tran',
      date: '2025-01-26',
      time: '16:00',
      duration: 120,
      maxStudents: 20,
      enrolledStudents: 18,
      status: 'scheduled'
    }
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newClass, setNewClass] = useState({
    title: '',
    instructor: '',
    date: '',
    time: '',
    duration: 60,
    maxStudents: 15
  });

  const handleCreateClass = () => {
    const classData: LiveClass = {
      id: Date.now().toString(),
      ...newClass,
      enrolledStudents: 0,
      status: 'scheduled'
    };
    setClasses([...classes, classData]);
    setShowCreateModal(false);
    setNewClass({
      title: '',
      instructor: '',
      date: '',
      time: '',
      duration: 60,
      maxStudents: 15
    });
  };

  const getStatusColor = (status: LiveClass['status']) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'live': return 'bg-green-100 text-green-800';
      case 'ended': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Live Classes</h2>
        <button
          onClick={() => setShowCreateModal(true)}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Schedule Class
        </button>
      </div>

      {/* Classes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classes.map((liveClass) => (
          <div key={liveClass.id} className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold text-gray-900">{liveClass.title}</h3>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(liveClass.status)}`}>
                {liveClass.status}
              </span>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center text-sm text-gray-600">
                <Users className="h-4 w-4 mr-2" />
                <span>{liveClass.instructor}</span>
              </div>
              
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="h-4 w-4 mr-2" />
                <span>{new Date(liveClass.date).toLocaleDateString()}</span>
              </div>
              
              <div className="flex items-center text-sm text-gray-600">
                <Clock className="h-4 w-4 mr-2" />
                <span>{liveClass.time} ({liveClass.duration} min)</span>
              </div>
              
              <div className="flex items-center text-sm text-gray-600">
                <Users className="h-4 w-4 mr-2" />
                <span>{liveClass.enrolledStudents}/{liveClass.maxStudents} students</span>
              </div>
            </div>

            <div className="flex space-x-2">
              {liveClass.status === 'scheduled' && (
                <button className="flex-1 bg-green-600 text-white px-3 py-2 rounded-md text-sm hover:bg-green-700">
                  <Video className="h-4 w-4 inline mr-1" />
                  Start Class
                </button>
              )}
              
              {liveClass.status === 'live' && (
                <button className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-md text-sm hover:bg-blue-700">
                  <Video className="h-4 w-4 inline mr-1" />
                  Join Class
                </button>
              )}
              
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Edit className="h-4 w-4" />
              </button>
              
              <button className="p-2 text-red-400 hover:text-red-600">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Create Class Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Schedule New Live Class</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Class Title</label>
                <input
                  type="text"
                  value={newClass.title}
                  onChange={(e) => setNewClass({...newClass, title: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Instructor</label>
                <select
                  value={newClass.instructor}
                  onChange={(e) => setNewClass({...newClass, instructor: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="">Select Instructor</option>
                  <option value="Ms. Ledia Balliu">Ms. Ledia Balliu</option>
                  <option value="Mr. Mo Tran">Mr. Mo Tran</option>
                  <option value="Ms. Sarah Thompson">Ms. Sarah Thompson</option>
                </select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Date</label>
                  <input
                    type="date"
                    value={newClass.date}
                    onChange={(e) => setNewClass({...newClass, date: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Time</label>
                  <input
                    type="time"
                    value={newClass.time}
                    onChange={(e) => setNewClass({...newClass, time: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Duration (min)</label>
                  <input
                    type="number"
                    value={newClass.duration}
                    onChange={(e) => setNewClass({...newClass, duration: parseInt(e.target.value)})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Max Students</label>
                  <input
                    type="number"
                    value={newClass.maxStudents}
                    onChange={(e) => setNewClass({...newClass, maxStudents: parseInt(e.target.value)})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateClass}
                className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700"
              >
                Schedule Class
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LiveClassScheduler;