import React, { useState } from 'react';
import { Database, Download, Upload, RefreshCw, AlertCircle, CheckCircle, BarChart3, Users, BookOpen } from 'lucide-react';

const SuperAdminSystemData = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'backup' | 'import' | 'export'>('overview');
  const [isBackingUp, setIsBackingUp] = useState(false);

  const systemStats = {
    totalUsers: 1247,
    totalCourses: 24,
    totalStudents: 1156,
    totalTeachers: 15,
    totalEnrollments: 3456,
    storageUsed: '2.4 GB',
    lastBackup: '2024-01-23T10:30:00Z'
  };

  const handleBackup = () => {
    setIsBackingUp(true);
    setTimeout(() => {
      setIsBackingUp(false);
      alert('System backup completed successfully!');
    }, 3000);
  };

  const handleExport = (dataType: string) => {
    // Simulate export
    const data = {
      timestamp: new Date().toISOString(),
      type: dataType,
      records: Math.floor(Math.random() * 1000) + 100
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${dataType}_export_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold gradient-text">System Data Management</h1>
        <div className="flex space-x-3">
          <button
            onClick={handleBackup}
            disabled={isBackingUp}
            className="btn-primary flex items-center"
          >
            <RefreshCw className={`h-5 w-5 mr-2 ${isBackingUp ? 'animate-spin' : ''}`} />
            {isBackingUp ? 'Backing Up...' : 'Create Backup'}
          </button>
        </div>
      </div>

      {/* System Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card-3d bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Users</p>
              <p className="text-2xl font-bold text-gray-900">{systemStats.totalUsers.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="card-3d bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <BookOpen className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Courses</p>
              <p className="text-2xl font-bold text-gray-900">{systemStats.totalCourses}</p>
            </div>
          </div>
        </div>

        <div className="card-3d bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-lg">
              <BarChart3 className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Enrollments</p>
              <p className="text-2xl font-bold text-gray-900">{systemStats.totalEnrollments.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="card-3d bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center">
            <div className="p-3 bg-orange-100 rounded-lg">
              <Database className="h-6 w-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Storage Used</p>
              <p className="text-2xl font-bold text-gray-900">{systemStats.storageUsed}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { key: 'overview', label: 'Data Overview', icon: Database },
            { key: 'backup', label: 'Backup System', icon: RefreshCw },
            { key: 'export', label: 'Export Data', icon: Download },
            { key: 'import', label: 'Import Data', icon: Upload }
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

      {/* Tab Content */}
      <div className="bg-white rounded-xl shadow-lg border p-6">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">System Data Overview</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-4">Student Data</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-blue-800">Online Students:</span>
                    <span className="font-medium text-blue-900">911</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-800">Offline Students:</span>
                    <span className="font-medium text-blue-900">245</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-800">Active Enrollments:</span>
                    <span className="font-medium text-blue-900">892</span>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-green-50 rounded-lg">
                <h3 className="font-semibold text-green-900 mb-4">Teacher Data</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-green-800">Full-time Teachers:</span>
                    <span className="font-medium text-green-900">8</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-800">Part-time Teachers:</span>
                    <span className="font-medium text-green-900">5</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-800">Freelance Teachers:</span>
                    <span className="font-medium text-green-900">2</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-center">
                <AlertCircle className="h-5 w-5 text-yellow-600 mr-3" />
                <div>
                  <div className="font-medium text-yellow-800">Last System Backup</div>
                  <div className="text-sm text-yellow-600">
                    {new Date(systemStats.lastBackup).toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'export' && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Export System Data</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { type: 'students', label: 'Student Data', description: 'All student records and profiles', icon: Users },
                { type: 'teachers', label: 'Teacher Data', description: 'Teacher profiles and qualifications', icon: Users },
                { type: 'courses', label: 'Course Data', description: 'Course content and structure', icon: BookOpen },
                { type: 'enrollments', label: 'Enrollment Data', description: 'Student course enrollments', icon: BarChart3 },
                { type: 'assessments', label: 'Assessment Data', description: 'Student assessments and grades', icon: CheckCircle },
                { type: 'analytics', label: 'Analytics Data', description: 'Usage analytics and metrics', icon: BarChart3 }
              ].map((exportType) => (
                <div key={exportType.type} className="border border-gray-200 rounded-lg p-6 hover:border-blue-300 transition-colors">
                  <div className="flex items-center mb-4">
                    <div className="p-2 bg-gray-100 rounded-lg mr-3">
                      <exportType.icon className="h-5 w-5 text-gray-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{exportType.label}</h3>
                      <p className="text-sm text-gray-500">{exportType.description}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleExport(exportType.type)}
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'backup' && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">System Backup</h2>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <CheckCircle className="h-6 w-6 text-green-600 mr-3" />
                <div>
                  <div className="font-medium text-green-800">Last Successful Backup</div>
                  <div className="text-sm text-green-600">
                    {new Date(systemStats.lastBackup).toLocaleString()}
                  </div>
                </div>
              </div>
              
              <button
                onClick={handleBackup}
                disabled={isBackingUp}
                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 disabled:opacity-50 flex items-center"
              >
                <RefreshCw className={`h-5 w-5 mr-2 ${isBackingUp ? 'animate-spin' : ''}`} />
                {isBackingUp ? 'Creating Backup...' : 'Create Full System Backup'}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-900">Daily</div>
                <div className="text-sm text-gray-600">Automatic Backups</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-900">30 Days</div>
                <div className="text-sm text-gray-600">Retention Period</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-900">99.9%</div>
                <div className="text-sm text-gray-600">Backup Success Rate</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SuperAdminSystemData;