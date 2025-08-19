import React, { useState } from 'react';
import { Users, GraduationCap, Settings, BarChart3, Plus, Search, Edit, Trash2, Eye } from 'lucide-react';

const SuperAdminDashboard = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Super Admin Control Center</h1>
          <p className="text-gray-600">Manage core system data and design settings</p>
        </div>
        <div className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-4 py-2 rounded-lg font-bold">
          🔐 SUPER ADMIN ACCESS
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card-3d bg-white p-6 rounded-xl shadow-lg border">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Users className="h-8 w-8 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Manage Teachers</p>
              <p className="text-2xl font-bold text-gray-900">15</p>
              <p className="text-sm text-green-600">Active Staff</p>
            </div>
          </div>
          <div className="mt-4">
            <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Add New Teacher
            </button>
          </div>
        </div>

        <div className="card-3d bg-white p-6 rounded-xl shadow-lg border">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <GraduationCap className="h-8 w-8 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Offline Students</p>
              <p className="text-2xl font-bold text-gray-900">245</p>
              <p className="text-sm text-blue-600">Manual Registration</p>
            </div>
          </div>
          <div className="mt-4">
            <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors">
              Add Offline Student
            </button>
          </div>
        </div>

        <div className="card-3d bg-white p-6 rounded-xl shadow-lg border">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-lg">
              <BarChart3 className="h-8 w-8 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">System Data</p>
              <p className="text-2xl font-bold text-gray-900">All</p>
              <p className="text-sm text-purple-600">Full Access</p>
            </div>
          </div>
          <div className="mt-4">
            <button className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors">
              Manage Data
            </button>
          </div>
        </div>

        <div className="card-3d bg-white p-6 rounded-xl shadow-lg border">
          <div className="flex items-center">
            <div className="p-3 bg-orange-100 rounded-lg">
              <Settings className="h-8 w-8 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Design System</p>
              <p className="text-2xl font-bold text-gray-900">UI</p>
              <p className="text-sm text-orange-600">Customization</p>
            </div>
          </div>
          <div className="mt-4">
            <button className="w-full bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700 transition-colors">
              Edit Design
            </button>
          </div>
        </div>
      </div>

      {/* Super Admin Permissions Overview */}
      <div className="bg-white rounded-xl shadow-lg border p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Super Admin Permissions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-green-700">✅ Allowed Actions</h3>
            <div className="space-y-2">
              <div className="flex items-center p-3 bg-green-50 rounded-lg">
                <Users className="h-5 w-5 text-green-600 mr-3" />
                <span className="text-green-800 font-medium">Add/Edit/Remove Teachers</span>
              </div>
              <div className="flex items-center p-3 bg-green-50 rounded-lg">
                <GraduationCap className="h-5 w-5 text-green-600 mr-3" />
                <span className="text-green-800 font-medium">Add Offline Students (Manual Registration)</span>
              </div>
              <div className="flex items-center p-3 bg-green-50 rounded-lg">
                <BarChart3 className="h-5 w-5 text-green-600 mr-3" />
                <span className="text-green-800 font-medium">View/Edit All System Data</span>
              </div>
              <div className="flex items-center p-3 bg-green-50 rounded-lg">
                <Settings className="h-5 w-5 text-green-600 mr-3" />
                <span className="text-green-800 font-medium">Customize Platform Design</span>
              </div>
              <div className="flex items-center p-3 bg-green-50 rounded-lg">
                <Zap className="h-5 w-5 text-green-600 mr-3" />
                <span className="text-green-800 font-medium">Full AI Automation Platform Control</span>
              </div>
              <div className="flex items-center p-3 bg-green-50 rounded-lg">
                <Shield className="h-5 w-5 text-green-600 mr-3" />
                <span className="text-green-800 font-medium">Grant/Revoke Automation Access to Users</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-blue-700">ℹ️ System Notes</h3>
            <div className="space-y-2">
              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="font-medium text-blue-800">Online Student Registration</div>
                <div className="text-sm text-blue-600">Students can register themselves through /auth signup</div>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="font-medium text-blue-800">Offline Student Management</div>
                <div className="text-sm text-blue-600">Super Admin can manually add students for in-person classes</div>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="font-medium text-blue-800">Teacher Management</div>
                <div className="text-sm text-blue-600">Full control over instructor accounts and credentials</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent System Activity */}
      <div className="bg-white rounded-xl shadow-lg border p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent System Activity</h2>
        <div className="space-y-4">
          {[
            { time: '2 min ago', action: 'New online student registered', user: 'system', type: 'info' },
            { time: '15 min ago', action: 'Teacher profile updated', user: 'Ms. Sarah Thompson', type: 'update' },
            { time: '1 hour ago', action: 'Offline student added', user: 'Super Admin', type: 'create' },
            { time: '2 hours ago', action: 'Design settings modified', user: 'Super Admin', type: 'design' },
            { time: '3 hours ago', action: 'New teacher account created', user: 'Super Admin', type: 'create' }
          ].map((activity, index) => (
            <div key={index} className="flex items-center p-4 bg-gray-50 rounded-lg">
              <div className={`w-3 h-3 rounded-full mr-4 ${
                activity.type === 'info' ? 'bg-blue-500' :
                activity.type === 'update' ? 'bg-yellow-500' :
                activity.type === 'create' ? 'bg-green-500' :
                activity.type === 'design' ? 'bg-purple-500' : 'bg-gray-500'
              }`}></div>
              <div className="flex-1">
                <div className="font-medium text-gray-900">{activity.action}</div>
                <div className="text-sm text-gray-500">by {activity.user} • {activity.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;