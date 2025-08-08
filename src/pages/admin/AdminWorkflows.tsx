import { useEffect } from 'react';
import React, { useState } from 'react';
import { useWorkflows } from '../../hooks/useWorkflows';
import WorkflowBuilder from '../../components/workflows/WorkflowBuilder';
import WorkflowExecutions from '../../components/workflows/WorkflowExecutions';
import WorkflowIntegrations from '../../components/workflows/WorkflowIntegrations';
import { Zap, Play, Settings, BarChart3 } from 'lucide-react';

const AdminWorkflows = () => {
  const [activeTab, setActiveTab] = useState<'builder' | 'executions' | 'integrations' | 'analytics'>('builder');
  const { workflows, executions, isLoading } = useWorkflows();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold gradient-text">n8n Workflow Automation</h1>
          <p className="text-gray-600">Automate your academy operations with powerful workflows</p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card-3d bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Workflows</p>
              <p className="text-2xl font-bold text-gray-900">{workflows.length}</p>
              <p className="text-sm text-blue-600">{workflows.filter(w => w.isActive).length} active</p>
            </div>
          </div>
        </div>

        <div className="card-3d bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center">
            <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl">
              <Play className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Executions Today</p>
              <p className="text-2xl font-bold text-gray-900">
                {executions.filter(e => 
                  new Date(e.startedAt).toDateString() === new Date().toDateString()
                ).length}
              </p>
              <p className="text-sm text-green-600">Automated tasks</p>
            </div>
          </div>
        </div>

        <div className="card-3d bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center">
            <div className="p-3 bg-gradient-to-r from-purple-500 to-violet-600 rounded-xl">
              <BarChart3 className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Success Rate</p>
              <p className="text-2xl font-bold text-gray-900">
                {executions.length > 0 
                  ? Math.round((executions.filter(e => e.status === 'completed').length / executions.length) * 100)
                  : 0}%
              </p>
              <p className="text-sm text-purple-600">Last 30 days</p>
            </div>
          </div>
        </div>

        <div className="card-3d bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center">
            <div className="p-3 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl">
              <Settings className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Time Saved</p>
              <p className="text-2xl font-bold text-gray-900">142h</p>
              <p className="text-sm text-orange-600">This month</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { key: 'builder', label: 'Workflow Builder', icon: Zap },
            { key: 'executions', label: 'Execution History', icon: Play },
            { key: 'integrations', label: 'Integrations', icon: Settings },
            { key: 'analytics', label: 'Analytics', icon: BarChart3 }
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
      <div>
        {activeTab === 'builder' && <WorkflowBuilder />}
        {activeTab === 'executions' && <WorkflowExecutions />}
        {activeTab === 'integrations' && <WorkflowIntegrations />}
        {activeTab === 'analytics' && (
          <div className="bg-white rounded-xl shadow-lg border p-8 text-center">
            <BarChart3 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Workflow Analytics</h3>
            <p className="text-gray-600">Detailed analytics and performance metrics coming soon!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminWorkflows;