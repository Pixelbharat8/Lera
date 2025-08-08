import React, { useState } from 'react';
import { Shield, Users, UserCheck, Settings, Plus, Edit, Trash2, Eye } from 'lucide-react';

interface UserRole {
  id: string;
  userId: string;
  userName: string;
  email: string;
  currentRole: string;
  department?: string;
  assignedBy: string;
  assignedAt: string;
  isActive: boolean;
  permissions: string[];
}

const AdminRoles = () => {
  const [userRoles, setUserRoles] = useState<UserRole[]>([
    {
      id: '1',
      userId: 'user1',
      userName: 'Ms. Ledia Balliu',
      email: 'ledia@lera-academy.com',
      currentRole: 'super_admin',
      department: 'Management',
      assignedBy: 'System',
      assignedAt: '2024-01-01',
      isActive: true,
      permissions: ['all']
    },
    {
      id: '2',
      userId: 'user2',
      userName: 'Mr. Mo Tran',
      email: 'mo@lera-academy.com',
      currentRole: 'admin',
      department: 'Operations',
      assignedBy: 'super_admin',
      assignedAt: '2024-01-15',
      isActive: true,
      permissions: ['manage_users', 'view_reports', 'manage_courses']
    }
  ]);

  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserRole | null>(null);
  const [newRoleAssignment, setNewRoleAssignment] = useState({
    userId: '',
    roleType: 'student',
    department: '',
    permissions: [] as string[]
  });

  const availableRoles = [
    { value: 'super_admin', label: 'Super Administrator', description: 'Full system access' },
    { value: 'admin', label: 'Administrator', description: 'Manage users and content' },
    { value: 'instructor', label: 'Teacher', description: 'Teach classes and grade students' },
    { value: 'hr_staff', label: 'HR Staff', description: 'Manage employees and payroll' },
    { value: 'employee', label: 'Employee', description: 'General staff member' },
    { value: 'student', label: 'Student', description: 'Learn and access courses' }
  ];

  const availablePermissions = [
    'manage_users',
    'manage_courses',
    'manage_payments',
    'view_reports',
    'manage_settings',
    'assign_roles',
    'manage_employees',
    'process_payroll',
    'approve_leaves',
    'view_analytics'
  ];

  const departments = ['Management', 'Teaching', 'Operations', 'Administration', 'HR', 'IT', 'Marketing'];

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'super_admin': return 'bg-red-100 text-red-800';
      case 'admin': return 'bg-purple-100 text-purple-800';
      case 'instructor': return 'bg-blue-100 text-blue-800';
      case 'hr_staff': return 'bg-green-100 text-green-800';
      case 'employee': return 'bg-yellow-100 text-yellow-800';
      case 'student': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleAssignRole = () => {
    const newRole: UserRole = {
      id: Date.now().toString(),
      userId: newRoleAssignment.userId,
      userName: 'New User', // Would be fetched from user data
      email: 'user@example.com', // Would be fetched from user data
      currentRole: newRoleAssignment.roleType,
      department: newRoleAssignment.department,
      assignedBy: 'current_admin',
      assignedAt: new Date().toISOString(),
      isActive: true,
      permissions: newRoleAssignment.permissions
    };

    setUserRoles([...userRoles, newRole]);
    setShowAssignModal(false);
    setNewRoleAssignment({
      userId: '',
      roleType: 'student',
      department: '',
      permissions: []
    });
  };

  const handleToggleUserStatus = (userId: string) => {
    setUserRoles(userRoles.map(role => 
      role.id === userId 
        ? { ...role, isActive: !role.isActive }
        : role
    ));
  };

  const handleDeleteRole = (userId: string) => {
    if (confirm('Are you sure you want to remove this user role?')) {
      setUserRoles(userRoles.filter(role => role.id !== userId));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Role Management</h1>
          <p className="text-gray-600">Manage user roles and permissions across the platform</p>
        </div>
        <button
          onClick={() => setShowAssignModal(true)}
          className="btn-primary flex items-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          Assign Role
        </button>
      </div>

      {/* Role Overview */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        {availableRoles.map((role) => {
          const count = userRoles.filter(ur => ur.currentRole === role.value && ur.isActive).length;
          return (
            <div key={role.value} className="bg-white rounded-lg shadow-sm border p-4 text-center">
              <div className="text-2xl font-bold text-gray-900">{count}</div>
              <div className="text-sm text-gray-600 font-medium">{role.label}</div>
              <div className="text-xs text-gray-500 mt-1">{role.description}</div>
            </div>
          );
        })}
      </div>

      {/* Security Notice */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-center">
          <Shield className="h-5 w-5 text-yellow-600 mr-3" />
          <div>
            <div className="font-medium text-yellow-800">Role Assignment Guidelines</div>
            <div className="text-sm text-yellow-600 mt-1">
              • Super Admin: Full system control (assign carefully)
              • Admin: Can manage users, courses, and view reports
              • Teacher: Can manage assigned classes and students
              • HR Staff: Can manage employees and payroll
              • Employee: Basic staff access
              • Student: Learning platform access only
            </div>
          </div>
        </div>
      </div>

      {/* User Roles Table */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">User Role Assignments</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Current Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Department
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Assigned By
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date Assigned
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
              {userRoles.map((userRole) => (
                <tr key={userRole.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{userRole.userName}</div>
                      <div className="text-sm text-gray-500">{userRole.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getRoleColor(userRole.currentRole)}`}>
                      {availableRoles.find(r => r.value === userRole.currentRole)?.label || userRole.currentRole}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{userRole.department || '-'}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{userRole.assignedBy}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{new Date(userRole.assignedAt).toLocaleDateString()}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleToggleUserStatus(userRole.id)}
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        userRole.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {userRole.isActive ? 'Active' : 'Inactive'}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => setSelectedUser(userRole)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="text-blue-600 hover:text-blue-900">
                        <Edit className="h-4 w-4" />
                      </button>
                      {userRole.currentRole !== 'super_admin' && (
                        <button
                          onClick={() => handleDeleteRole(userRole.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Assign Role Modal */}
      {showAssignModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-lg w-full p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Assign User Role</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Select User</label>
                <input
                  type="email"
                  placeholder="Enter user email"
                  value={newRoleAssignment.userId}
                  onChange={(e) => setNewRoleAssignment({...newRoleAssignment, userId: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Role</label>
                <select
                  value={newRoleAssignment.roleType}
                  onChange={(e) => setNewRoleAssignment({...newRoleAssignment, roleType: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  {availableRoles.map(role => (
                    <option key={role.value} value={role.value}>
                      {role.label} - {role.description}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Department (Optional)</label>
                <select
                  value={newRoleAssignment.department}
                  onChange={(e) => setNewRoleAssignment({...newRoleAssignment, department: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="">Select Department</option>
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Permissions</label>
                <div className="space-y-2 max-h-40 overflow-y-auto border border-gray-200 rounded-md p-3">
                  {availablePermissions.map(permission => (
                    <label key={permission} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={newRoleAssignment.permissions.includes(permission)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setNewRoleAssignment({
                              ...newRoleAssignment,
                              permissions: [...newRoleAssignment.permissions, permission]
                            });
                          } else {
                            setNewRoleAssignment({
                              ...newRoleAssignment,
                              permissions: newRoleAssignment.permissions.filter(p => p !== permission)
                            });
                          }
                        }}
                        className="mr-2"
                      />
                      <span className="text-sm text-gray-700">{permission.replace('_', ' ')}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowAssignModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleAssignRole}
                disabled={!newRoleAssignment.userId || !newRoleAssignment.roleType}
                className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                Assign Role
              </button>
            </div>
          </div>
        </div>
      )}

      {/* User Details Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900">User Role Details</h3>
              <button
                onClick={() => setSelectedUser(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">User Information</h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-gray-500">Name:</span>
                      <span className="ml-2 font-medium">{selectedUser.userName}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Email:</span>
                      <span className="ml-2 font-medium">{selectedUser.email}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Department:</span>
                      <span className="ml-2 font-medium">{selectedUser.department || 'Not assigned'}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Role Information</h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-gray-500">Current Role:</span>
                      <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(selectedUser.currentRole)}`}>
                        {availableRoles.find(r => r.value === selectedUser.currentRole)?.label}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500">Assigned By:</span>
                      <span className="ml-2 font-medium">{selectedUser.assignedBy}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Date Assigned:</span>
                      <span className="ml-2 font-medium">{new Date(selectedUser.assignedAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-3">Permissions</h4>
                <div className="grid grid-cols-2 gap-2">
                  {selectedUser.permissions.map(permission => (
                    <div key={permission} className="flex items-center p-2 bg-blue-50 rounded">
                      <UserCheck className="h-4 w-4 text-blue-600 mr-2" />
                      <span className="text-sm text-blue-800">{permission.replace('_', ' ')}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminRoles;