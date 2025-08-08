import React, { useState } from 'react';
import { Calendar, Clock, CheckCircle, XCircle, Eye, Plus } from 'lucide-react';
import { Leave, Employee } from '../../types';

const HRLeaves = () => {
  const [leaves, setLeaves] = useState<Leave[]>([
    {
      id: '1',
      employeeId: 'LERA-EMP-2025-0002',
      type: 'vacation',
      startDate: '2024-02-01',
      endDate: '2024-02-03',
      days: 3,
      reason: 'Family vacation',
      status: 'pending'
    },
    {
      id: '2',
      employeeId: 'LERA-EMP-2025-0001',
      type: 'sick',
      startDate: '2024-01-15',
      endDate: '2024-01-16',
      days: 2,
      reason: 'Medical appointment',
      status: 'approved',
      approvedBy: 'LERA-EMP-2025-0001',
      approvedAt: '2024-01-14'
    }
  ]);

  const [filterStatus, setFilterStatus] = useState('');
  const [filterType, setFilterType] = useState('');

  const handleApproveLeave = (leaveId: string) => {
    setLeaves(leaves.map(leave => 
      leave.id === leaveId 
        ? { ...leave, status: 'approved', approvedAt: new Date().toISOString() }
        : leave
    ));
  };

  const handleRejectLeave = (leaveId: string) => {
    setLeaves(leaves.map(leave => 
      leave.id === leaveId 
        ? { ...leave, status: 'rejected', approvedAt: new Date().toISOString() }
        : leave
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'vacation': return 'bg-blue-100 text-blue-800';
      case 'sick': return 'bg-red-100 text-red-800';
      case 'personal': return 'bg-purple-100 text-purple-800';
      case 'maternity': return 'bg-pink-100 text-pink-800';
      case 'emergency': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredLeaves = leaves.filter(leave => {
    const matchesStatus = !filterStatus || leave.status === filterStatus;
    const matchesType = !filterType || leave.type === filterType;
    return matchesStatus && matchesType;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold gradient-text">Leave Management</h1>
        <button className="btn-primary flex items-center">
          <Plus className="h-4 w-4 mr-2" />
          Add Leave Record
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card-3d bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Pending Requests</p>
              <p className="text-2xl font-bold text-gray-900">{leaves.filter(l => l.status === 'pending').length}</p>
            </div>
          </div>
        </div>

        <div className="card-3d bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Approved</p>
              <p className="text-2xl font-bold text-gray-900">{leaves.filter(l => l.status === 'approved').length}</p>
            </div>
          </div>
        </div>

        <div className="card-3d bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center">
            <div className="p-3 bg-red-100 rounded-lg">
              <XCircle className="h-6 w-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Rejected</p>
              <p className="text-2xl font-bold text-gray-900">{leaves.filter(l => l.status === 'rejected').length}</p>
            </div>
          </div>
        </div>

        <div className="card-3d bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Calendar className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Days</p>
              <p className="text-2xl font-bold text-gray-900">{leaves.reduce((sum, l) => sum + l.days, 0)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex gap-4">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">All Types</option>
            <option value="vacation">Vacation</option>
            <option value="sick">Sick Leave</option>
            <option value="personal">Personal</option>
            <option value="maternity">Maternity</option>
            <option value="emergency">Emergency</option>
          </select>
        </div>
      </div>

      {/* Leave Requests */}
      <div className="space-y-4">
        {filteredLeaves.map((leave) => (
          <div key={leave.id} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <h3 className="text-lg font-medium text-gray-900">{leave.employeeId}</h3>
                  <span className={`ml-3 px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(leave.type)}`}>
                    {leave.type}
                  </span>
                  <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(leave.status)}`}>
                    {leave.status}
                  </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 mb-3">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>{new Date(leave.startDate).toLocaleDateString()} - {new Date(leave.endDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>{leave.days} day{leave.days !== 1 ? 's' : ''}</span>
                  </div>
                  {leave.approvedAt && (
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      <span>Processed: {new Date(leave.approvedAt).toLocaleDateString()}</span>
                    </div>
                  )}
                </div>
                
                <p className="text-gray-700">{leave.reason}</p>
                {leave.comments && (
                  <p className="text-sm text-gray-500 mt-2 italic">Comments: {leave.comments}</p>
                )}
              </div>
              
              <div className="flex items-center space-x-2">
                {leave.status === 'pending' && (
                  <>
                    <button
                      onClick={() => handleApproveLeave(leave.id)}
                      className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition-colors"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleRejectLeave(leave.id)}
                      className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700 transition-colors"
                    >
                      Reject
                    </button>
                  </>
                )}
                <button className="p-2 text-gray-400 hover:text-gray-600">
                  <Eye className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredLeaves.length === 0 && (
        <div className="bg-white rounded-lg shadow-sm border p-12 text-center">
          <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No Leave Requests</h3>
          <p className="text-gray-600">
            {filterStatus || filterType 
              ? "No leave requests match your current filters"
              : "No leave requests have been submitted yet"
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default HRLeaves;