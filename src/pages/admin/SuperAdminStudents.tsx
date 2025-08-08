import React, { useState } from 'react';
import { Plus, Search, Edit, Eye, Mail, Phone, Save, X, UserPlus } from 'lucide-react';

interface OfflineStudent {
  id: string;
  full_name: string;
  email?: string;
  phone: string;
  date_of_birth: string;
  guardian_name: string;
  guardian_phone: string;
  address: string;
  current_level: string;
  learning_goals: string[];
  enrollment_type: 'offline';
  is_active: boolean;
  created_at: string;
}

const SuperAdminStudents = () => {
  const [offlineStudents, setOfflineStudents] = useState<OfflineStudent[]>([
    {
      id: '1',
      full_name: 'Nguyen Van An',
      email: 'an.nguyen@example.com',
      phone: '+84 123 456 789',
      date_of_birth: '2010-05-15',
      guardian_name: 'Nguyen Van Minh',
      guardian_phone: '+84 987 654 321',
      address: 'Hai Phong, Vietnam',
      current_level: 'Primary_3',
      learning_goals: ['Cambridge YLE Starters', 'Basic Conversation'],
      enrollment_type: 'offline',
      is_active: true,
      created_at: '2024-01-15'
    },
    {
      id: '2',
      full_name: 'Tran Thi Mai',
      phone: '+84 234 567 890',
      date_of_birth: '2008-08-22',
      guardian_name: 'Tran Van Duc',
      guardian_phone: '+84 876 543 210',
      address: 'Hai Phong, Vietnam',
      current_level: 'Primary_5',
      learning_goals: ['Cambridge YLE Flyers', 'Reading Fluency'],
      enrollment_type: 'offline',
      is_active: true,
      created_at: '2024-01-10'
    }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState<OfflineStudent | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [newStudent, setNewStudent] = useState({
    full_name: '',
    email: '',
    phone: '',
    date_of_birth: '',
    guardian_name: '',
    guardian_phone: '',
    address: '',
    current_level: 'Primary_1',
    learning_goals: '',
    notes: ''
  });

  const levels = [
    'KG1', 'KG2', 'KG3',
    'Primary_1', 'Primary_2', 'Primary_3', 'Primary_4', 'Primary_5', 'Primary_6',
    'Secondary_1', 'Secondary_2', 'Secondary_3', 'Secondary_4',
    'CEFR_A1', 'CEFR_A2', 'CEFR_B1', 'CEFR_B2', 'CEFR_C1', 'CEFR_C2',
    'IELTS_Foundation', 'IELTS_Intermediate', 'IELTS_Advanced',
    'Business_Beginner', 'Business_Intermediate', 'Business_Advanced'
  ];

  const handleCreateStudent = () => {
    const student: OfflineStudent = {
      id: Date.now().toString(),
      full_name: newStudent.full_name,
      email: newStudent.email || undefined,
      phone: newStudent.phone,
      date_of_birth: newStudent.date_of_birth,
      guardian_name: newStudent.guardian_name,
      guardian_phone: newStudent.guardian_phone,
      address: newStudent.address,
      current_level: newStudent.current_level,
      learning_goals: newStudent.learning_goals.split(',').map(g => g.trim()).filter(g => g),
      enrollment_type: 'offline',
      is_active: true,
      created_at: new Date().toISOString()
    };

    setOfflineStudents([...offlineStudents, student]);
    setShowAddModal(false);
    setNewStudent({
      full_name: '',
      email: '',
      phone: '',
      date_of_birth: '',
      guardian_name: '',
      guardian_phone: '',
      address: '',
      current_level: 'Primary_1',
      learning_goals: '',
      notes: ''
    });
  };

  const handleUpdateStudent = () => {
    if (!editingStudent) return;
    
    setOfflineStudents(offlineStudents.map(s => s.id === editingStudent.id ? editingStudent : s));
    setEditingStudent(null);
  };

  const handleDeleteStudent = (id: string) => {
    if (confirm('Are you sure you want to remove this student?')) {
      setOfflineStudents(offlineStudents.filter(s => s.id !== id));
    }
  };

  const filteredStudents = offlineStudents.filter(student =>
    student.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.guardian_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getAge = (dateOfBirth: string) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Offline Student Management</h1>
          <p className="text-gray-600">Manually register students for in-person classes</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="btn-primary flex items-center"
        >
          <UserPlus className="h-5 w-5 mr-2" />
          Add Offline Student
        </button>
      </div>

      {/* Info Banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center">
          <div className="text-blue-600 mr-3">ℹ️</div>
          <div>
            <div className="font-medium text-blue-800">Student Registration Types</div>
            <div className="text-sm text-blue-600 mt-1">
              • <strong>Online Students:</strong> Can register themselves at /auth signup
              • <strong>Offline Students:</strong> Manually registered here for in-person classes
            </div>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="text-2xl font-bold text-green-600">{offlineStudents.length}</div>
          <div className="text-sm text-gray-600">Offline Students</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="text-2xl font-bold text-blue-600">{offlineStudents.filter(s => s.is_active).length}</div>
          <div className="text-sm text-gray-600">Active Students</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="text-2xl font-bold text-purple-600">
            {offlineStudents.filter(s => s.current_level.includes('Primary')).length}
          </div>
          <div className="text-sm text-gray-600">Primary Level</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="text-2xl font-bold text-orange-600">
            {offlineStudents.filter(s => s.current_level.includes('KG')).length}
          </div>
          <div className="text-sm text-gray-600">Kindergarten</div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search students or guardians..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Students Table */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Offline Students Database</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Student Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Guardian Info
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Level & Goals
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
              {filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{student.full_name}</div>
                      <div className="text-sm text-gray-500">Age: {getAge(student.date_of_birth)} years</div>
                      {student.email && (
                        <div className="text-sm text-gray-500 flex items-center">
                          <Mail className="h-3 w-3 mr-1" />
                          {student.email}
                        </div>
                      )}
                      <div className="text-sm text-gray-500 flex items-center">
                        <Phone className="h-3 w-3 mr-1" />
                        {student.phone}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{student.guardian_name}</div>
                      <div className="text-sm text-gray-500 flex items-center">
                        <Phone className="h-3 w-3 mr-1" />
                        {student.guardian_phone}
                      </div>
                      <div className="text-sm text-gray-500">{student.address}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                        {student.current_level.replace('_', ' ')}
                      </span>
                      <div className="text-sm text-gray-500 mt-1">
                        Goals: {student.learning_goals.slice(0, 2).join(', ')}
                        {student.learning_goals.length > 2 && '...'}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      student.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {student.is_active ? 'Active' : 'Inactive'}
                    </span>
                    <div className="text-xs text-gray-500 mt-1">
                      Enrolled: {new Date(student.created_at).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => setEditingStudent(student)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteStudent(student.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Student Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Add Offline Student</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Student Information */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Student Information</h4>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Full Name *</label>
                  <input
                    type="text"
                    value={newStudent.full_name}
                    onChange={(e) => setNewStudent({...newStudent, full_name: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Student's full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Date of Birth *</label>
                  <input
                    type="date"
                    value={newStudent.date_of_birth}
                    onChange={(e) => setNewStudent({...newStudent, date_of_birth: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Student Phone</label>
                  <input
                    type="tel"
                    value={newStudent.phone}
                    onChange={(e) => setNewStudent({...newStudent, phone: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="+84 123 456 789"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Email (Optional)</label>
                  <input
                    type="email"
                    value={newStudent.email}
                    onChange={(e) => setNewStudent({...newStudent, email: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="student@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Current Level *</label>
                  <select
                    value={newStudent.current_level}
                    onChange={(e) => setNewStudent({...newStudent, current_level: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    {levels.map(level => (
                      <option key={level} value={level}>{level.replace('_', ' ')}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Guardian Information */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Guardian/Parent Information</h4>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Guardian Name *</label>
                  <input
                    type="text"
                    value={newStudent.guardian_name}
                    onChange={(e) => setNewStudent({...newStudent, guardian_name: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Parent/Guardian full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Guardian Phone *</label>
                  <input
                    type="tel"
                    value={newStudent.guardian_phone}
                    onChange={(e) => setNewStudent({...newStudent, guardian_phone: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="+84 987 654 321"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Address *</label>
                  <textarea
                    value={newStudent.address}
                    onChange={(e) => setNewStudent({...newStudent, address: e.target.value})}
                    rows={3}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Full address"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Learning Goals (comma separated)</label>
                  <input
                    type="text"
                    value={newStudent.learning_goals}
                    onChange={(e) => setNewStudent({...newStudent, learning_goals: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Cambridge YLE, Basic Conversation, Reading"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Additional Notes</label>
                  <textarea
                    value={newStudent.notes}
                    onChange={(e) => setNewStudent({...newStudent, notes: e.target.value})}
                    rows={3}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Any special notes or requirements"
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
                onClick={handleCreateStudent}
                disabled={!newStudent.full_name || !newStudent.date_of_birth || !newStudent.guardian_name || !newStudent.guardian_phone}
                className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700 disabled:opacity-50"
              >
                Register Offline Student
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Student Modal */}
      {editingStudent && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Edit Student: {editingStudent.full_name}</h3>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Full Name</label>
                  <input
                    type="text"
                    value={editingStudent.full_name}
                    onChange={(e) => setEditingStudent({...editingStudent, full_name: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Current Level</label>
                  <select
                    value={editingStudent.current_level}
                    onChange={(e) => setEditingStudent({...editingStudent, current_level: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    {levels.map(level => (
                      <option key={level} value={level}>{level.replace('_', ' ')}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Guardian Name</label>
                  <input
                    type="text"
                    value={editingStudent.guardian_name}
                    onChange={(e) => setEditingStudent({...editingStudent, guardian_name: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Guardian Phone</label>
                  <input
                    type="tel"
                    value={editingStudent.guardian_phone}
                    onChange={(e) => setEditingStudent({...editingStudent, guardian_phone: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={editingStudent.is_active}
                  onChange={(e) => setEditingStudent({...editingStudent, is_active: e.target.checked})}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-900">
                  Active Student
                </label>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setEditingStudent(null)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateStudent}
                className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700"
              >
                Update Student
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SuperAdminStudents;