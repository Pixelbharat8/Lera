import React, { useState } from 'react';
import { Plus, Search, Edit, Eye, Mail, Phone, Save, X } from 'lucide-react';

interface Teacher {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  specializations: string[];
  qualifications: string[];
  employment_type: 'full_time' | 'part_time' | 'freelance';
  hourly_rate: number;
  is_active: boolean;
}

const SuperAdminTeachers = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([
    {
      id: '1',
      full_name: 'Ms. Ledia Balliu',
      email: 'ledia@lera-academy.com',
      phone: '+84 123 456 789',
      specializations: ['IELTS Academic', 'Test Strategy', 'Academic Writing'],
      qualifications: ['MA Applied Linguistics', 'IELTS Examiner Certification'],
      employment_type: 'full_time',
      hourly_rate: 50,
      is_active: true
    },
    {
      id: '2',
      full_name: 'Mr. Mo Tran',
      email: 'mo@lera-academy.com',
      phone: '+84 234 567 890',
      specializations: ['Business English', 'Corporate Communication'],
      qualifications: ['MBA Business Administration', 'Business English Specialist'],
      employment_type: 'full_time',
      hourly_rate: 45,
      is_active: true
    }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [newTeacher, setNewTeacher] = useState({
    full_name: '',
    email: '',
    phone: '',
    specializations: '',
    qualifications: '',
    employment_type: 'full_time' as const,
    hourly_rate: 40,
    password: ''
  });

  const handleCreateTeacher = () => {
    const teacher: Teacher = {
      id: Date.now().toString(),
      full_name: newTeacher.full_name,
      email: newTeacher.email,
      phone: newTeacher.phone,
      specializations: newTeacher.specializations.split(',').map(s => s.trim()),
      qualifications: newTeacher.qualifications.split(',').map(q => q.trim()),
      employment_type: newTeacher.employment_type,
      hourly_rate: newTeacher.hourly_rate,
      is_active: true
    };

    setTeachers([...teachers, teacher]);
    setShowAddModal(false);
    setNewTeacher({
      full_name: '',
      email: '',
      phone: '',
      specializations: '',
      qualifications: '',
      employment_type: 'full_time',
      hourly_rate: 40,
      password: ''
    });
  };

  const handleUpdateTeacher = () => {
    if (!editingTeacher) return;
    
    setTeachers(teachers.map(t => t.id === editingTeacher.id ? editingTeacher : t));
    setEditingTeacher(null);
  };

  const handleDeleteTeacher = (id: string) => {
    if (confirm('Are you sure you want to remove this teacher?')) {
      setTeachers(teachers.filter(t => t.id !== id));
    }
  };

  const filteredTeachers = teachers.filter(teacher =>
    teacher.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold gradient-text">Teacher Management</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="btn-primary flex items-center"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add New Teacher
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search teachers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Teachers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTeachers.map((teacher) => (
          <div key={teacher.id} className="card-3d bg-white rounded-xl shadow-lg border p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900">{teacher.full_name}</h3>
                <p className="text-sm text-gray-600">{teacher.specializations[0]}</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                teacher.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {teacher.is_active ? 'Active' : 'Inactive'}
              </span>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center text-sm text-gray-600">
                <Mail className="h-4 w-4 mr-2" />
                <span>{teacher.email}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Phone className="h-4 w-4 mr-2" />
                <span>{teacher.phone}</span>
              </div>
              <div className="text-sm text-gray-600">
                <span className="font-medium">Rate:</span> ${teacher.hourly_rate}/hour
              </div>
              <div className="text-sm text-gray-600">
                <span className="font-medium">Type:</span> {teacher.employment_type.replace('_', ' ')}
              </div>
            </div>

            <div className="mb-4">
              <div className="text-sm font-medium text-gray-700 mb-2">Specializations:</div>
              <div className="flex flex-wrap gap-1">
                {teacher.specializations.slice(0, 2).map((spec, index) => (
                  <span key={index} className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded">
                    {spec}
                  </span>
                ))}
                {teacher.specializations.length > 2 && (
                  <span className="text-xs text-gray-500">+{teacher.specializations.length - 2}</span>
                )}
              </div>
            </div>

            <div className="flex space-x-2">
              <button
                onClick={() => setEditingTeacher(teacher)}
                className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors"
              >
                <Edit className="h-4 w-4 inline mr-1" />
                Edit
              </button>
              <button
                onClick={() => handleDeleteTeacher(teacher.id)}
                className="px-3 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 transition-colors"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Teacher Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Teacher</h3>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Full Name</label>
                  <input
                    type="text"
                    value={newTeacher.full_name}
                    onChange={(e) => setNewTeacher({...newTeacher, full_name: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    value={newTeacher.email}
                    onChange={(e) => setNewTeacher({...newTeacher, email: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone</label>
                  <input
                    type="tel"
                    value={newTeacher.phone}
                    onChange={(e) => setNewTeacher({...newTeacher, phone: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Password</label>
                  <input
                    type="password"
                    value={newTeacher.password}
                    onChange={(e) => setNewTeacher({...newTeacher, password: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Temporary password"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Specializations (comma separated)</label>
                <input
                  type="text"
                  value={newTeacher.specializations}
                  onChange={(e) => setNewTeacher({...newTeacher, specializations: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="IELTS, Business English, Grammar"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Qualifications (comma separated)</label>
                <input
                  type="text"
                  value={newTeacher.qualifications}
                  onChange={(e) => setNewTeacher({...newTeacher, qualifications: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="MA Applied Linguistics, CELTA, TESOL"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Employment Type</label>
                  <select
                    value={newTeacher.employment_type}
                    onChange={(e) => setNewTeacher({...newTeacher, employment_type: e.target.value as any})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="full_time">Full Time</option>
                    <option value="part_time">Part Time</option>
                    <option value="freelance">Freelance</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Hourly Rate ($)</label>
                  <input
                    type="number"
                    value={newTeacher.hourly_rate}
                    onChange={(e) => setNewTeacher({...newTeacher, hourly_rate: parseFloat(e.target.value)})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateTeacher}
                className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700"
              >
                Create Teacher Account
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Teacher Modal */}
      {editingTeacher && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Edit Teacher</h3>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Full Name</label>
                  <input
                    type="text"
                    value={editingTeacher.full_name}
                    onChange={(e) => setEditingTeacher({...editingTeacher, full_name: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    value={editingTeacher.email}
                    onChange={(e) => setEditingTeacher({...editingTeacher, email: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone</label>
                  <input
                    type="tel"
                    value={editingTeacher.phone}
                    onChange={(e) => setEditingTeacher({...editingTeacher, phone: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Hourly Rate ($)</label>
                  <input
                    type="number"
                    value={editingTeacher.hourly_rate}
                    onChange={(e) => setEditingTeacher({...editingTeacher, hourly_rate: parseFloat(e.target.value)})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Employment Type</label>
                <select
                  value={editingTeacher.employment_type}
                  onChange={(e) => setEditingTeacher({...editingTeacher, employment_type: e.target.value as any})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="full_time">Full Time</option>
                  <option value="part_time">Part Time</option>
                  <option value="freelance">Freelance</option>
                </select>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={editingTeacher.is_active}
                  onChange={(e) => setEditingTeacher({...editingTeacher, is_active: e.target.checked})}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-900">
                  Active Teacher
                </label>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setEditingTeacher(null)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateTeacher}
                className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700"
              >
                Update Teacher
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SuperAdminTeachers;