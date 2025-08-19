import React, { useState, useEffect } from 'react';
import { Workflow, WorkflowExecution, WorkflowTemplate } from '../../types/workflows';
import WorkflowBuilder from './WorkflowBuilder';
import { 
  Plus, 
  Play, 
  Pause, 
  Trash2, 
  Copy, 
  Edit, 
  Eye,
  BarChart3,
  Calendar,
  Zap,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  Search,
  Filter
} from 'lucide-react';

const AutomationDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'workflows' | 'executions' | 'templates' | 'builder'>('workflows');
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [executions, setExecutions] = useState<WorkflowExecution[]>([]);
  const [templates, setTemplates] = useState<WorkflowTemplate[]>([]);
  const [selectedWorkflow, setSelectedWorkflow] = useState<Workflow | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');

  // Mock data
  useEffect(() => {
    const mockWorkflows: Workflow[] = [
      {
        id: 'wf_1',
        name: 'Student Welcome Automation',
        description: 'Automatically welcome new students with email and setup',
        category: 'Student Management',
        tags: ['email', 'welcome', 'automation'],
        isActive: true,
        nodes: [],
        edges: [],
        settings: { timeout: 300, retryAttempts: 3, errorHandling: 'stop' },
        createdBy: 'admin',
        createdAt: '2024-01-15T10:00:00Z',
        updatedAt: '2024-01-20T14:30:00Z',
        lastExecuted: '2024-01-23T09:15:00Z',
        executionCount: 45
      },
      {
        id: 'wf_2',
        name: 'Weekly Report Generation',
        description: 'Generate and distribute weekly performance reports',
        category: 'Reporting',
        tags: ['reports', 'weekly', 'pdf'],
        isActive: true,
        nodes: [],
        edges: [],
        settings: { timeout: 600, retryAttempts: 2, errorHandling: 'retry' },
        createdBy: 'admin',
        createdAt: '2024-01-10T08:00:00Z',
        updatedAt: '2024-01-22T16:45:00Z',
        lastExecuted: '2024-01-22T09:00:00Z',
        executionCount: 12
      },
      {
        id: 'wf_3',
        name: 'AI Homework Grading',
        description: 'Automatically grade homework assignments using AI',
        category: 'Academic',
        tags: ['ai', 'grading', 'homework'],
        isActive: false,
        nodes: [],
        edges: [],
        settings: { timeout: 180, retryAttempts: 1, errorHandling: 'stop' },
        createdBy: 'teacher',
        createdAt: '2024-01-12T11:30:00Z',
        updatedAt: '2024-01-18T13:20:00Z',
        executionCount: 8
      }
    ];

    const mockTemplates: WorkflowTemplate[] = [
      {
        id: 'tpl_1',
        name: 'Student Enrollment Flow',
        description: 'Complete student enrollment automation with welcome email, class assignment, and payment processing',
        category: 'Education',
        useCase: 'When a new student enrolls, send welcome email, assign to appropriate class, and process payment',
        difficulty: 'beginner',
        estimatedSetupTime: '5 minutes',
        workflow: { nodes: [], edges: [], settings: { timeout: 300, retryAttempts: 3, errorHandling: 'stop' } },
        requiredIntegrations: ['email', 'payment'],
        benefits: [
          'Automate repetitive enrollment tasks',
          'Ensure consistent welcome experience',
          'Reduce manual errors in class assignment'
        ]
      },
      {
        id: 'tpl_2',
        name: 'Teacher Performance Review',
        description: 'Monthly teacher performance evaluation with AI analysis and report generation',
        category: 'HR',
        useCase: 'Monthly review of teacher performance with automated analysis and report distribution',
        difficulty: 'intermediate',
        estimatedSetupTime: '15 minutes',
        workflow: { nodes: [], edges: [], settings: { timeout: 600, retryAttempts: 2, errorHandling: 'continue' } },
        requiredIntegrations: ['ai', 'email', 'database'],
        benefits: [
          'Consistent performance evaluation',
          'AI-powered insights',
          'Automated report distribution'
        ]
      }
    ];

    setWorkflows(mockWorkflows);
    setTemplates(mockTemplates);
  }, []);

  const handleCreateWorkflow = () => {
    setSelectedWorkflow(null);
    setActiveTab('builder');
  };

  const handleEditWorkflow = (workflow: Workflow) => {
    setSelectedWorkflow(workflow);
    setActiveTab('builder');
  };

  const handleSaveWorkflow = (workflowData: any) => {
    if (selectedWorkflow) {
      // Update existing workflow
      setWorkflows(prev => prev.map(wf => 
        wf.id === selectedWorkflow.id 
          ? { ...wf, ...workflowData, updatedAt: new Date().toISOString() }
          : wf
      ));
    } else {
      // Create new workflow
      const newWorkflow: Workflow = {
        ...workflowData,
        id: `wf_${Date.now()}`,
        createdBy: 'current_user',
        createdAt: new Date().toISOString(),
        executionCount: 0,
        category: 'General',
        tags: []
      };
      setWorkflows(prev => [...prev, newWorkflow]);
    }
    setActiveTab('workflows');
  };

  const handleExecuteWorkflow = (workflowData: any) => {
    console.log('Executing workflow:', workflowData);
    // Here you would integrate with your execution engine
  };

  const handleDeleteWorkflow = (workflowId: string) => {
    if (confirm('Are you sure you want to delete this workflow?')) {
      setWorkflows(prev => prev.filter(wf => wf.id !== workflowId));
    }
  };

  const handleToggleWorkflow = (workflowId: string) => {
    setWorkflows(prev => prev.map(wf => 
      wf.id === workflowId 
        ? { ...wf, isActive: !wf.isActive }
        : wf
    ));
  };

  const filteredWorkflows = workflows.filter(workflow => {
    const matchesSearch = workflow.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         workflow.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !filterCategory || workflow.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = [...new Set(workflows.map(w => w.category))];

  return (
    <div className="h-screen bg-gray-50">
      {activeTab === 'builder' ? (
        <WorkflowBuilder
          workflowId={selectedWorkflow?.id}
          onSave={handleSaveWorkflow}
          onExecute={handleExecuteWorkflow}
        />
      ) : (
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="bg-white border-b border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold gradient-text">AI Automation Platform</h1>
                <p className="text-gray-600">Build, manage, and execute intelligent workflows</p>
              </div>
              <button
                onClick={handleCreateWorkflow}
                className="btn-primary flex items-center"
              >
                <Plus className="h-5 w-5 mr-2" />
                Create Workflow
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="card-3d bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-white/50 p-4 glow-effect">
                <div className="flex items-center">
                  <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl">
                    <Zap className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Total Workflows</p>
                    <p className="text-2xl font-bold text-gray-900">{workflows.length}</p>
                  </div>
                </div>
              </div>

              <div className="card-3d bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-white/50 p-4 glow-effect">
                <div className="flex items-center">
                  <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl">
                    <Play className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Active Workflows</p>
                    <p className="text-2xl font-bold text-gray-900">{workflows.filter(w => w.isActive).length}</p>
                  </div>
                </div>
              </div>

              <div className="card-3d bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-white/50 p-4 glow-effect">
                <div className="flex items-center">
                  <div className="p-3 bg-gradient-to-r from-purple-500 to-violet-600 rounded-xl">
                    <TrendingUp className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Total Executions</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {workflows.reduce((sum, w) => sum + w.executionCount, 0)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="card-3d bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-white/50 p-4 glow-effect">
                <div className="flex items-center">
                  <div className="p-3 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl">
                    <Clock className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Avg Duration</p>
                    <p className="text-2xl font-bold text-gray-900">2.3s</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="bg-white border-b border-gray-200">
            <div className="px-6">
              <nav className="-mb-px flex space-x-8">
                {[
                  { key: 'workflows', label: 'Workflows', icon: Zap, count: workflows.length },
                  { key: 'executions', label: 'Executions', icon: Play, count: null },
                  { key: 'templates', label: 'Templates', icon: Copy, count: templates.length }
                ].map(({ key, label, icon: Icon, count }) => (
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
                    {count !== null && (
                      <span className="ml-2 bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                        {count}
                      </span>
                    )}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {/* Workflows Tab */}
            {activeTab === 'workflows' && (
              <div className="space-y-6">
                {/* Search and Filter */}
                <div className="bg-white rounded-lg shadow-sm p-4">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Search workflows..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <select
                        value={filterCategory}
                        onChange={(e) => setFilterCategory(e.target.value)}
                        className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      >
                        <option value="">All Categories</option>
                        {categories.map(category => (
                          <option key={category} value={category}>{category}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Workflows Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredWorkflows.map(workflow => (
                    <div key={workflow.id} className="card-3d bg-white rounded-xl shadow-lg border p-6 glow-effect">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-gray-900 mb-2">{workflow.name}</h3>
                          <p className="text-sm text-gray-600 mb-3">{workflow.description}</p>
                          <div className="flex items-center space-x-2">
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                              {workflow.category}
                            </span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              workflow.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                            }`}>
                              {workflow.isActive ? 'Active' : 'Inactive'}
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleToggleWorkflow(workflow.id)}
                            className={`p-2 rounded ${
                              workflow.isActive 
                                ? 'text-green-600 hover:text-green-800 bg-green-50' 
                                : 'text-gray-400 hover:text-gray-600 bg-gray-50'
                            }`}
                            title={workflow.isActive ? 'Pause workflow' : 'Activate workflow'}
                          >
                            {workflow.isActive ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                          </button>
                          
                          <button
                            onClick={() => handleEditWorkflow(workflow)}
                            className="p-2 text-blue-600 hover:text-blue-800 bg-blue-50 rounded"
                            title="Edit workflow"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          
                          <button
                            onClick={() => handleDeleteWorkflow(workflow.id)}
                            className="p-2 text-red-600 hover:text-red-800 bg-red-50 rounded"
                            title="Delete workflow"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <span>Executions: {workflow.executionCount}</span>
                          {workflow.lastExecuted && (
                            <span>Last run: {new Date(workflow.lastExecuted).toLocaleDateString()}</span>
                          )}
                        </div>
                        
                        <div className="flex flex-wrap gap-1">
                          {workflow.tags.map(tag => (
                            <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                              {tag}
                            </span>
                          ))}
                        </div>
                        
                        <div className="flex space-x-2 pt-2 border-t border-gray-100">
                          <button className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors">
                            <Play className="h-4 w-4 inline mr-1" />
                            Run Now
                          </button>
                          <button className="flex-1 bg-gray-100 text-gray-700 px-3 py-2 rounded-lg text-sm hover:bg-gray-200 transition-colors">
                            <Eye className="h-4 w-4 inline mr-1" />
                            View
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {filteredWorkflows.length === 0 && (
                  <div className="bg-white rounded-lg shadow-sm border p-12 text-center">
                    <Zap className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No Workflows Found</h3>
                    <p className="text-gray-600 mb-6">
                      {searchTerm || filterCategory 
                        ? "No workflows match your current filters"
                        : "Get started by creating your first automation workflow"
                      }
                    </p>
                    <button
                      onClick={handleCreateWorkflow}
                      className="btn-primary"
                    >
                      Create First Workflow
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Templates Tab */}
            {activeTab === 'templates' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {templates.map(template => (
                    <div key={template.id} className="card-3d bg-white rounded-xl shadow-lg border p-6 glow-effect">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-bold text-gray-900 mb-2">{template.name}</h3>
                          <p className="text-sm text-gray-600 mb-3">{template.description}</p>
                          
                          <div className="flex items-center space-x-3 mb-3">
                            <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">
                              {template.category}
                            </span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              template.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
                              template.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {template.difficulty}
                            </span>
                            <span className="text-xs text-gray-500">
                              {template.estimatedSetupTime}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <h4 className="text-sm font-medium text-gray-700 mb-2">Use Case:</h4>
                          <p className="text-sm text-gray-600">{template.useCase}</p>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium text-gray-700 mb-2">Benefits:</h4>
                          <ul className="text-sm text-gray-600 space-y-1">
                            {template.benefits.slice(0, 2).map((benefit, index) => (
                              <li key={index} className="flex items-center">
                                <CheckCircle className="h-3 w-3 text-green-500 mr-2" />
                                {benefit}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="pt-3 border-t border-gray-100">
                          <button 
                            onClick={() => {
                              // Load template into builder
                              setSelectedWorkflow(null);
                              setActiveTab('builder');
                            }}
                            className="w-full bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                          >
                            Use Template
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Executions Tab */}
            {activeTab === 'executions' && (
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Executions</h3>
                <div className="text-center py-12">
                  <BarChart3 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">Execution History</h4>
                  <p className="text-gray-600">Detailed execution logs and analytics will appear here</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AutomationDashboard;