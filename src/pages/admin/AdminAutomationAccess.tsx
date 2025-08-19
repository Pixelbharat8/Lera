import React, { useState } from 'react';
import { Shield, Users, Bot, CheckCircle, XCircle, Plus, Search, Edit, Trash2 } from 'lucide-react';

interface AutomationAccess {
  id: string;
  userId: string;
  userName: string;
  email: string;
  role: string;
  permissions: {
    viewWorkflows: boolean;
    createWorkflows: boolean;
    editWorkflows: boolean;
    executeWorkflows: boolean;
    manageTemplates: boolean;
    viewLogs: boolean;
  };
  grantedBy: string;
  grantedAt: string;
  isActive: boolean;
}

const AdminAutomationAccess = () => {
  const [automationAccess, setAutomationAccess] = useState<AutomationAccess[]>([
    {
      id: '1',
      userId: 'user1',
      userName: 'Mr. Mo Tran',
      email: 'mo@lera-academy.com',
      role: 'admin',
      permissions: {
        viewWorkflows: true,
        createWorkflows: true,
        editWorkflows: true,
        executeWorkflows: true,
        manageTemplates: false,
        viewLogs: true
      },
      grantedBy: 'Super Admin',
      grantedAt: '2024-01-15',
      isActive: true
    },
    {
      id: '2',
      userId: 'user2',
      userName: 'Ms. Sarah Thompson',
      email: 'sarah@lera-academy.com',
      role: 'instructor',
      permissions: {
        viewWorkflows: true,
        createWorkflows: false,
        editWorkflows: false,
        executeWorkflows: true,
        manageTemplates: false,
        viewLogs: false
      },
      grantedBy: 'Super Admin',
      grantedAt: '2024-01-20',
      isActive: true
    }
  ]);

  const [showGrantModal, setShowGrantModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<AutomationAccess | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const [newAccess, setNewAccess] = useState({
    userId: '',
    userEmail: '',
    permissions: {
      viewWorkflows: false,
      createWorkflows: false,
      editWorkflows: false,
      executeWorkflows: false,
      manageTemplates: false,
      viewLogs: false
    }
  });

  const availableUsers = [
    { id: 'user3', name: 'Ms. Emma Wilson', email: 'emma@lera-academy.com', role: 'instructor' },
    { id: 'user4', name: 'Mr. Michael Anderson', email: 'michael@lera-academy.com', role: 'instructor' },
    { id: 'user5', name: 'Admin User', email: 'admin@lera-academy.com', role: 'admin' },
    { id: 'user6', name: 'HR Manager', email: 'hr@lera-academy.com', role: 'hr_staff' }
  ];

  const permissionLabels = {
    viewWorkflows: 'View Workflows',
    createWorkflows: 'Create Workflows',
    editWorkflows: 'Edit Workflows',
    executeWorkflows: 'Execute Workflows',
    manageTemplates: 'Manage Templates',
    viewLogs: 'View Execution Logs'
  };

  const handleGrantAccess = () => {
    const selectedUserData = availableUsers.find(u => u.id === newAccess.userId);
    if (!selectedUserData) return;

    const access: AutomationAccess = {
      id: Date.now().toString(),
      userId: newAccess.userId,
      userName: selectedUserData.name,
      email: selectedUserData.email,
      role: selectedUserData.role,
      permissions: newAccess.permissions,
      grantedBy: 'Super Admin',
      grantedAt: new Date().toISOString(),
      isActive: true
    };

    setAutomationAccess([...automationAccess, access]);
    setShowGrantModal(false);
    setNewAccess({
      userId: '',
      userEmail: '',
      permissions: {
        viewWorkflows: false,
        createWorkflows: false,
        editWorkflows: false,
        executeWorkflows: false,
        manageTemplates: false,
        viewLogs: false
      }
    });
  };

  const handleRevokeAccess = (accessId: string) => {
    setAutomationAccess(automationAccess.map(access => 
      access.id === accessId 
        ? { ...access, isActive: false }
        : access
    ));
  };

  const handleDeleteAccess = (accessId: string) => {
    if (confirm('Are you sure you want to permanently remove this user\'s automation access?')) {
      setAutomationAccess(automationAccess.filter(access => access.id !== accessId));
    }
  };

  const filteredAccess = automationAccess.filter(access =>
    access.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    access.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold gradient-text">AI Automation Access Control</h1>
          <p className="text-gray-600">Manage who can access the AI automation platform</p>
        </div>
        <button
          onClick={() => setShowGrantModal(true)}
          className="btn-primary flex items-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          Grant Access
        </button>
      </div>

      {/* Security Notice */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-center">
          <Shield className="h-5 w-5 text-yellow-600 mr-3" />
          <div>
            <div className="font-medium text-yellow-800">AI Automation Security</div>
            <div className="text-sm text-yellow-600 mt-1">
              • Only grant automation access to trusted users
              • AI workflows can send emails, modify data, and access external systems
              • Monitor execution logs regularly for security
              • Revoke access immediately if suspicious activity is detected
            </div>
          </div>
        </div>
      </div>

      {/* Access Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card-3d bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Users</p>
              <p className="text-2xl font-bold text-gray-900">{automationAccess.length}</p>
            </div>
          </div>
        </div>

        <div className="card-3d bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Active Access</p>
              <p className="text-2xl font-bold text-gray-900">{automationAccess.filter(a => a.isActive).length}</p>
            </div>
          </div>
        </div>

        <div className="card-3d bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Bot className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">AI Permissions</p>
              <p className="text-2xl font-bold text-gray-900">{automationAccess.filter(a => a.permissions.createWorkflows).length}</p>
            </div>
          </div>
        </div>

        <div className="card-3d bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center">
            <div className="p-3 bg-red-100 rounded-lg">
              <XCircle className="h-6 w-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Revoked</p>
              <p className="text-2xl font-bold text-gray-900">{automationAccess.filter(a => !a.isActive).length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Access Control Table */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">AI Automation Access Permissions</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Permissions
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Granted By
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
              {filteredAccess.map((access) => (
                <tr key={access.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{access.userName}</div>
                      <div className="text-sm text-gray-500">{access.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                      {access.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-wrap gap-1">
                      {Object.entries(access.permissions)
                        .filter(([_, hasPermission]) => hasPermission)
                        .slice(0, 3)
                        .map(([permission]) => (
                          <span key={permission} className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">
                            {permissionLabels[permission as keyof typeof permissionLabels]}
                          </span>
                        ))}
                      {Object.values(access.permissions).filter(p => p).length > 3 && (
                        <span className="text-xs text-gray-500">
                          +{Object.values(access.permissions).filter(p => p).length - 3} more
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{access.grantedBy}</div>
                    <div className="text-sm text-gray-500">{new Date(access.grantedAt).toLocaleDateString()}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => access.isActive ? handleRevokeAccess(access.id) : setAutomationAccess(automationAccess.map(a => a.id === access.id ? {...a, isActive: true} : a))}
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        access.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {access.isActive ? 'Active' : 'Revoked'}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => setSelectedUser(access)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteAccess(access.id)}
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

      {/* Grant Access Modal */}
      {showGrantModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-lg w-full p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Grant AI Automation Access</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Select User</label>
                <select
                  value={newAccess.userId}
                  onChange={(e) => {
                    const selectedUser = availableUsers.find(u => u.id === e.target.value);
                    setNewAccess({
                      ...newAccess,
                      userId: e.target.value,
                      userEmail: selectedUser?.email || ''
                    });
                  }}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="">Select a user</option>
                  {availableUsers
                    .filter(user => !automationAccess.find(access => access.userId === user.id))
                    .map(user => (
                    <option key={user.id} value={user.id}>
                      {user.name} ({user.email}) - {user.role}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Permissions</label>
                <div className="space-y-3">
                  {Object.entries(permissionLabels).map(([permission, label]) => (
                    <label key={permission} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={newAccess.permissions[permission as keyof typeof newAccess.permissions]}
                        onChange={(e) => setNewAccess({
                          ...newAccess,
                          permissions: {
                            ...newAccess.permissions,
                            [permission]: e.target.checked
                          }
                        })}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">{label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <div className="flex items-center">
                  <Shield className="h-5 w-5 text-blue-600 mr-2" />
                  <div className="text-sm">
                    <div className="font-medium text-blue-800">Security Recommendations:</div>
                    <div className="text-blue-600 mt-1">
                      • Start with minimal permissions (View + Execute only)
                      • Grant Create/Edit permissions only to trusted users
                      • Template management should be restricted to senior staff
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowGrantModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleGrantAccess}
                disabled={!newAccess.userId || Object.values(newAccess.permissions).every(p => !p)}
                className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                Grant Access
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Access Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-lg w-full p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Edit Access: {selectedUser.userName}
            </h3>
            
            <div className="space-y-4">
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-sm">
                  <div className="font-medium text-gray-900">{selectedUser.userName}</div>
                  <div className="text-gray-600">{selectedUser.email}</div>
                  <div className="text-gray-500">Role: {selectedUser.role}</div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Permissions</label>
                <div className="space-y-3">
                  {Object.entries(permissionLabels).map(([permission, label]) => (
                    <label key={permission} className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">{label}</span>
                      <input
                        type="checkbox"
                        checked={selectedUser.permissions[permission as keyof typeof selectedUser.permissions]}
                        onChange={(e) => setSelectedUser({
                          ...selectedUser,
                          permissions: {
                            ...selectedUser.permissions,
                            [permission]: e.target.checked
                          }
                        })}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                    </label>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setSelectedUser(null)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setAutomationAccess(automationAccess.map(access => 
                    access.id === selectedUser.id ? selectedUser : access
                  ));
                  setSelectedUser(null);
                }}
                className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700"
              >
                Update Access
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-lg border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => {
              // Grant all admins basic access
              const adminUsers = availableUsers.filter(u => u.role === 'admin');
              const newAccesses = adminUsers.map(user => ({
                id: Date.now().toString() + Math.random(),
                userId: user.id,
                userName: user.name,
                email: user.email,
                role: user.role,
                permissions: {
                  viewWorkflows: true,
                  createWorkflows: true,
                  editWorkflows: true,
                  executeWorkflows: true,
                  manageTemplates: false,
                  viewLogs: true
                },
                grantedBy: 'Super Admin',
                grantedAt: new Date().toISOString(),
                isActive: true
              }));
              setAutomationAccess([...automationAccess, ...newAccesses]);
            }}
            className="p-4 border-2 border-dashed border-blue-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
          >
            <Users className="h-6 w-6 text-blue-600 mx-auto mb-2" />
            <div className="text-sm font-medium text-blue-700">Grant All Admins Access</div>
          </button>

          <button
            onClick={() => {
              // Grant all teachers view access only
              const teacherUsers = availableUsers.filter(u => u.role === 'instructor');
              const newAccesses = teacherUsers.map(user => ({
                id: Date.now().toString() + Math.random(),
                userId: user.id,
                userName: user.name,
                email: user.email,
                role: user.role,
                permissions: {
                  viewWorkflows: true,
                  createWorkflows: false,
                  editWorkflows: false,
                  executeWorkflows: true,
                  manageTemplates: false,
                  viewLogs: false
                },
                grantedBy: 'Super Admin',
                grantedAt: new Date().toISOString(),
                isActive: true
              }));
              setAutomationAccess([...automationAccess, ...newAccesses]);
            }}
            className="p-4 border-2 border-dashed border-green-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors"
          >
            <Bot className="h-6 w-6 text-green-600 mx-auto mb-2" />
            <div className="text-sm font-medium text-green-700">Grant Teachers View Access</div>
          </button>

          <button
            onClick={() => {
              if (confirm('Are you sure you want to revoke ALL automation access? This cannot be undone.')) {
                setAutomationAccess(automationAccess.map(access => ({ ...access, isActive: false })));
              }
            }}
            className="p-4 border-2 border-dashed border-red-300 rounded-lg hover:border-red-500 hover:bg-red-50 transition-colors"
          >
            <XCircle className="h-6 w-6 text-red-600 mx-auto mb-2" />
            <div className="text-sm font-medium text-red-700">Revoke All Access</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminAutomationAccess;