import React, { useState } from 'react';
import { MapPin, Users, Plus, Edit, Trash2, Clock, CheckCircle, Settings } from 'lucide-react';
import { Classroom, ClassSchedule } from '../../types';

const AdminClassrooms = () => {
  const [classrooms, setClassrooms] = useState<Classroom[]>([
    {
      id: '1',
      name: 'Classroom A',
      capacity: 20,
      location: 'Main Building - 1st Floor',
      equipment: ['Projector', 'Whiteboard', 'Audio System', 'Air Conditioning'],
      availability: [
        { dayOfWeek: 1, startTime: '08:00', endTime: '17:00', isAvailable: true },
        { dayOfWeek: 2, startTime: '08:00', endTime: '17:00', isAvailable: true },
        { dayOfWeek: 3, startTime: '08:00', endTime: '17:00', isAvailable: true },
        { dayOfWeek: 4, startTime: '08:00', endTime: '17:00', isAvailable: true },
        { dayOfWeek: 5, startTime: '08:00', endTime: '17:00', isAvailable: true },
        { dayOfWeek: 6, startTime: '08:00', endTime: '12:00', isAvailable: true },
      ],
      isActive: true
    },
    {
      id: '2',
      name: 'Classroom B',
      capacity: 15,
      location: 'Main Building - 2nd Floor',
      equipment: ['Interactive TV', 'Whiteboard', 'Audio System', 'Wi-Fi'],
      availability: [
        { dayOfWeek: 1, startTime: '08:00', endTime: '17:00', isAvailable: true },
        { dayOfWeek: 2, startTime: '08:00', endTime: '17:00', isAvailable: true },
        { dayOfWeek: 3, startTime: '08:00', endTime: '17:00', isAvailable: true },
        { dayOfWeek: 4, startTime: '08:00', endTime: '17:00', isAvailable: true },
        { dayOfWeek: 5, startTime: '08:00', endTime: '17:00', isAvailable: true },
      ],
      isActive: true
    }
  ]);

  const [schedules, setSchedules] = useState<ClassSchedule[]>([
    {
      id: '1',
      className: 'IELTS Advanced Speaking',
      teacherId: 'LERA-EMP-2025-0001',
      classroomId: '1',
      studentIds: ['student1', 'student2', 'student3'],
      dayOfWeek: 1, // Monday
      startTime: '09:00',
      endTime: '10:30',
      level: 'Advanced',
      subject: 'IELTS Speaking',
      maxStudents: 12,
      isActive: true
    },
    {
      id: '2',
      className: 'Business English Communication',
      teacherId: 'LERA-EMP-2025-0002',
      classroomId: '2',
      studentIds: ['student4', 'student5'],
      dayOfWeek: 2, // Tuesday
      startTime: '14:00',
      endTime: '15:30',
      level: 'Intermediate',
      subject: 'Business English',
      maxStudents: 8,
      isActive: true
    }
  ]);

  const [showAddClassroom, setShowAddClassroom] = useState(false);
  const [showAddSchedule, setShowAddSchedule] = useState(false);
  const [activeTab, setActiveTab] = useState<'classrooms' | 'schedules'>('classrooms');

  const [newClassroom, setNewClassroom] = useState({
    name: '',
    capacity: 0,
    location: '',
    equipment: [] as string[]
  });

  const [newSchedule, setNewSchedule] = useState({
    className: '',
    teacherId: '',
    classroomId: '',
    dayOfWeek: 1,
    startTime: '',
    endTime: '',
    level: '',
    subject: '',
    maxStudents: 0
  });

  const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const availableEquipment = [
    'Projector', 'Interactive TV', 'Whiteboard', 'Audio System', 'Air Conditioning', 
    'Wi-Fi', 'Microphone', 'Speakers', 'Computer', 'Tablets'
  ];

  const handleCreateClassroom = () => {
    const classroom: Classroom = {
      id: Date.now().toString(),
      name: newClassroom.name,
      capacity: newClassroom.capacity,
      location: newClassroom.location,
      equipment: newClassroom.equipment,
      availability: weekDays.slice(1, 6).map((_, index) => ({
        dayOfWeek: index + 1,
        startTime: '08:00',
        endTime: '17:00',
        isAvailable: true
      })),
      isActive: true
    };

    setClassrooms([...classrooms, classroom]);
    setShowAddClassroom(false);
    setNewClassroom({ name: '', capacity: 0, location: '', equipment: [] });
  };

  const handleCreateSchedule = () => {
    const schedule: ClassSchedule = {
      id: Date.now().toString(),
      className: newSchedule.className,
      teacherId: newSchedule.teacherId,
      classroomId: newSchedule.classroomId,
      studentIds: [],
      dayOfWeek: newSchedule.dayOfWeek,
      startTime: newSchedule.startTime,
      endTime: newSchedule.endTime,
      level: newSchedule.level,
      subject: newSchedule.subject,
      maxStudents: newSchedule.maxStudents,
      isActive: true
    };

    setSchedules([...schedules, schedule]);
    setShowAddSchedule(false);
    setNewSchedule({
      className: '',
      teacherId: '',
      classroomId: '',
      dayOfWeek: 1,
      startTime: '',
      endTime: '',
      level: '',
      subject: '',
      maxStudents: 0
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold gradient-text">Classroom Management</h1>
        <div className="flex space-x-3">
          <button
            onClick={() => setShowAddSchedule(true)}
            className="btn-secondary flex items-center"
          >
            <Clock className="h-4 w-4 mr-2" />
            Schedule Class
          </button>
          <button
            onClick={() => setShowAddClassroom(true)}
            className="btn-primary flex items-center"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Classroom
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card-3d bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <MapPin className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Classrooms</p>
              <p className="text-2xl font-bold text-gray-900">{classrooms.length}</p>
            </div>
          </div>
        </div>

        <div className="card-3d bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Active Classes</p>
              <p className="text-2xl font-bold text-gray-900">{schedules.filter(s => s.isActive).length}</p>
            </div>
          </div>
        </div>

        <div className="card-3d bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Capacity</p>
              <p className="text-2xl font-bold text-gray-900">{classrooms.reduce((sum, c) => sum + c.capacity, 0)}</p>
            </div>
          </div>
        </div>

        <div className="card-3d bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center">
            <div className="p-3 bg-orange-100 rounded-lg">
              <Clock className="h-6 w-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Utilization</p>
              <p className="text-2xl font-bold text-gray-900">75%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { key: 'classrooms', label: 'Classrooms', icon: MapPin },
            { key: 'schedules', label: 'Class Schedules', icon: Clock }
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

      {/* Classrooms Tab */}
      {activeTab === 'classrooms' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {classrooms.map((classroom) => (
            <div key={classroom.id} className="card-3d bg-white rounded-xl shadow-lg border p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{classroom.name}</h3>
                  <p className="text-sm text-gray-600">{classroom.location}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  classroom.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {classroom.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <Users className="h-4 w-4 mr-2" />
                  <span>Capacity: {classroom.capacity} students</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>{classroom.location}</span>
                </div>
              </div>

              <div className="mb-4">
                <div className="text-sm font-medium text-gray-700 mb-2">Equipment:</div>
                <div className="flex flex-wrap gap-1">
                  {classroom.equipment.slice(0, 3).map((item, index) => (
                    <span key={index} className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded">
                      {item}
                    </span>
                  ))}
                  {classroom.equipment.length > 3 && (
                    <span className="text-xs text-gray-500">+{classroom.equipment.length - 3} more</span>
                  )}
                </div>
              </div>

              <div className="flex space-x-2">
                <button className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors">
                  <Settings className="h-4 w-4 inline mr-1" />
                  Manage
                </button>
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
      )}

      {/* Schedules Tab */}
      {activeTab === 'schedules' && (
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Class Schedules</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Class
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Teacher
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Classroom
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Schedule
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Students
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {schedules.map((schedule) => {
                  const classroom = classrooms.find(c => c.id === schedule.classroomId);
                  return (
                    <tr key={schedule.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{schedule.className}</div>
                          <div className="text-sm text-gray-500">{schedule.subject} - {schedule.level}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{schedule.teacherId}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{classroom?.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {weekDays[schedule.dayOfWeek]}
                        </div>
                        <div className="text-sm text-gray-500">
                          {schedule.startTime} - {schedule.endTime}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {schedule.studentIds.length}/{schedule.maxStudents}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          schedule.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {schedule.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <button className="text-blue-600 hover:text-blue-900">
                            <Edit className="h-4 w-4" />
                          </button>
                          <button className="text-red-600 hover:text-red-900">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add Classroom Modal */}
      {showAddClassroom && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-lg w-full p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Classroom</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Classroom Name</label>
                <input
                  type="text"
                  value={newClassroom.name}
                  onChange={(e) => setNewClassroom({...newClassroom, name: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Classroom A"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Capacity</label>
                  <input
                    type="number"
                    value={newClassroom.capacity}
                    onChange={(e) => setNewClassroom({...newClassroom, capacity: parseInt(e.target.value)})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Location</label>
                  <input
                    type="text"
                    value={newClassroom.location}
                    onChange={(e) => setNewClassroom({...newClassroom, location: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Main Building - 1st Floor"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Equipment</label>
                <div className="space-y-2 max-h-32 overflow-y-auto border border-gray-200 rounded-md p-2">
                  {availableEquipment.map(equipment => (
                    <label key={equipment} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={newClassroom.equipment.includes(equipment)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setNewClassroom({
                              ...newClassroom,
                              equipment: [...newClassroom.equipment, equipment]
                            });
                          } else {
                            setNewClassroom({
                              ...newClassroom,
                              equipment: newClassroom.equipment.filter(eq => eq !== equipment)
                            });
                          }
                        }}
                        className="mr-2"
                      />
                      <span className="text-sm text-gray-700">{equipment}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowAddClassroom(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateClassroom}
                disabled={!newClassroom.name || !newClassroom.capacity}
                className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                Create Classroom
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Schedule Modal */}
      {showAddSchedule && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-lg w-full p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Schedule New Class</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Class Name</label>
                <input
                  type="text"
                  value={newSchedule.className}
                  onChange={(e) => setNewSchedule({...newSchedule, className: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="IELTS Advanced Speaking"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Subject</label>
                  <input
                    type="text"
                    value={newSchedule.subject}
                    onChange={(e) => setNewSchedule({...newSchedule, subject: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="IELTS Speaking"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Level</label>
                  <select
                    value={newSchedule.level}
                    onChange={(e) => setNewSchedule({...newSchedule, level: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="">Select Level</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Classroom</label>
                <select
                  value={newSchedule.classroomId}
                  onChange={(e) => setNewSchedule({...newSchedule, classroomId: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="">Select Classroom</option>
                  {classrooms.map(classroom => (
                    <option key={classroom.id} value={classroom.id}>
                      {classroom.name} - {classroom.location} (Capacity: {classroom.capacity})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Day</label>
                  <select
                    value={newSchedule.dayOfWeek}
                    onChange={(e) => setNewSchedule({...newSchedule, dayOfWeek: parseInt(e.target.value)})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    {weekDays.slice(1).map((day, index) => (
                      <option key={index} value={index + 1}>{day}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Start Time</label>
                  <input
                    type="time"
                    value={newSchedule.startTime}
                    onChange={(e) => setNewSchedule({...newSchedule, startTime: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">End Time</label>
                  <input
                    type="time"
                    value={newSchedule.endTime}
                    onChange={(e) => setNewSchedule({...newSchedule, endTime: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Max Students</label>
                <input
                  type="number"
                  value={newSchedule.maxStudents}
                  onChange={(e) => setNewSchedule({...newSchedule, maxStudents: parseInt(e.target.value)})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="12"
                />
              </div>
            </div>
            
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowAddSchedule(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateSchedule}
                disabled={!newSchedule.className || !newSchedule.classroomId}
                className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 disabled:opacity-50"
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

export default AdminClassrooms;