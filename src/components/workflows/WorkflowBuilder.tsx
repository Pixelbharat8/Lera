import { useEffect } from 'react';
import React, { useState } from 'react';
import { useWorkflows, WorkflowTemplate, WorkflowAction } from '../../hooks/useWorkflows';
import { 
  Plus, 
  Play, 
  Settings, 
  Trash2, 
  Save, 
  Mail, 
  MessageSquare, 
  Bell, 
  Database, 
  Webhook,
  Calendar,
  Zap,
  ChevronDown,
  ChevronRight,
  Edit,
  Copy
} from 'lucide-react';

const WorkflowBuilder = () => {
  const { 
    workflows, 
    executions, 
    createWorkflow, 
    updateWorkflow, 
    deleteWorkflow, 
    executeWorkflow,
    getWorkflowTemplates,
    getIntegrationOptions
  } = useWorkflows();

  const [selectedWorkflow, setSelectedWorkflow] = useState<WorkflowTemplate | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const [expandedWorkflow, setExpandedWorkflow] = useState<string | null>(null);

  const [newWorkflow, setNewWorkflow] = useState<Partial<WorkflowTemplate>>({
    name: '',
    description: '',
    trigger: { type: 'event' },
    actions: [],
    isActive: true,
    category: 'General',
    icon: '⚡'
  });

  const actionIcons = {
    email: Mail,
    sms: MessageSquare,
    notification: Bell,
    webhook: Webhook,
    database: Database,
    integration: Zap
  };

  const triggerTypes = [
    { value: 'event', label: 'Event Trigger', description: 'Triggered by system events' },
    { value: 'schedule', label: 'Scheduled', description: 'Runs on a schedule' },
    { value: 'manual', label: 'Manual', description: 'Triggered manually' }
  ];

  const eventTypes = [
    'student_enrolled',
    'payment_received',
    'assignment_submitted',
    'course_completed',
    'student_absent',
    'low_performance',
    'certificate_issued',
    'teacher_evaluation',
    'live_class_starting'
  ];

  const handleCreateWorkflow = async () => {
    try {
      await createWorkflow(newWorkflow as Omit<WorkflowTemplate, 'id'>);
      setNewWorkflow({
        name: '',
        description: '',
        trigger: { type: 'event' },
        actions: [],
        isActive: true,
        category: 'General',
        icon: '⚡'
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Error creating workflow:', error);
    }
  };

  const handleExecuteWorkflow = async (workflowId: string) => {
    try {
      await executeWorkflow(workflowId, { manual: true });
    } catch (error) {
      console.error('Error executing workflow:', error);
    }
  };

  const addAction = () => {
    const newAction: WorkflowAction = {
      id: Date.now().toString(),
      type: 'email',
      name: 'New Action',
      config: {},
      order: (newWorkflow.actions?.length || 0) + 1
    };

    setNewWorkflow(prev => ({
      ...prev,
      actions: [...(prev.actions || []), newAction]
    }));
  };

  const updateAction = (actionId: string, updates: Partial<WorkflowAction>) => {
    setNewWorkflow(prev => ({
      ...prev,
      actions: prev.actions?.map(action => 
        action.id === actionId ? { ...action, ...updates } : action
      )
    }));
  };

  const removeAction = (actionId: string) => {
    setNewWorkflow(prev => ({
      ...prev,
      actions: prev.actions?.filter(action => action.id !== actionId)
    }));
  };

  const loadTemplate = (template: any) => {
    setNewWorkflow({
      ...template,
      actions: template.actions.map((action: any) => ({
        ...action,
        id: Date.now().toString() + Math.random()
      }))
    });
    setIsEditing(true);
    setShowTemplates(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold gradient-text">Workflow Automation</h1>
        <div className="flex space-x-3">
          <button
            onClick={() => setShowTemplates(true)}
            className="btn-secondary flex items-center"
          >
            <Copy className="h-4 w-4 mr-2" />
            Templates
          </button>
          <button
            onClick={() => setIsEditing(true)}
            className="btn-primary flex items-center"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Workflow
          </button>
        </div>
      </div>

      {/* Workflow Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card-3d bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Zap className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Active Workflows</p>
              <p className="text-2xl font-bold text-gray-900">{workflows.filter(w => w.isActive).length}</p>
            </div>
          </div>
        </div>

        <div className="card-3d bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <Play className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Executions Today</p>
              <p className="text-2xl font-bold text-gray-900">
                {executions.filter(e => 
                  new Date(e.startedAt).toDateString() === new Date().toDateString()
                ).length}
              </p>
            </div>
          </div>
        </div>

        <div className="card-3d bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Settings className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Success Rate</p>
              <p className="text-2xl font-bold text-gray-900">
                {executions.length > 0 
                  ? Math.round((executions.filter(e => e.status === 'completed').length / executions.length) * 100)
                  : 0}%
              </p>
            </div>
          </div>
        </div>

        <div className="card-3d bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center">
            <div className="p-3 bg-orange-100 rounded-lg">
              <Calendar className="h-6 w-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Scheduled</p>
              <p className="text-2xl font-bold text-gray-900">
                {workflows.filter(w => w.trigger.type === 'schedule').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Workflow List */}
      <div className="bg-white rounded-xl shadow-lg border">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Workflows</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {workflows.map((workflow) => {
            const ActionIcon = actionIcons[workflow.actions[0]?.type] || Zap;
            return (
              <div key={workflow.id} className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center flex-1">
                    <button
                      onClick={() => setExpandedWorkflow(
                        expandedWorkflow === workflow.id ? null : workflow.id
                      )}
                      className="mr-4 p-1 hover:bg-gray-100 rounded"
                    >
                      {expandedWorkflow === workflow.id ? (
                        <ChevronDown className="h-5 w-5 text-gray-500" />
                      ) : (
                        <ChevronRight className="h-5 w-5 text-gray-500" />
                      )}
                    </button>
                    
                    <div className="text-2xl mr-4">{workflow.icon}</div>
                    
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-gray-900">{workflow.name}</h3>
                      <p className="text-sm text-gray-600">{workflow.description}</p>
                      <div className="flex items-center mt-2 space-x-4">
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                          {workflow.trigger.type}
                        </span>
                        <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full">
                          {workflow.actions.length} actions
                        </span>
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                          {workflow.category}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      <div className={`w-3 h-3 rounded-full ${workflow.isActive ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                      <span className="ml-2 text-sm text-gray-600">
                        {workflow.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    
                    <button
                      onClick={() => handleExecuteWorkflow(workflow.id)}
                      className="p-2 text-blue-600 hover:text-blue-800"
                    >
                      <Play className="h-4 w-4" />
                    </button>
                    
                    <button
                      onClick={() => {
                        setSelectedWorkflow(workflow);
                        setNewWorkflow(workflow);
                        setIsEditing(true);
                      }}
                      className="p-2 text-gray-600 hover:text-gray-800"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    
                    <button
                      onClick={() => deleteWorkflow(workflow.id)}
                      className="p-2 text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Expanded Details */}
                {expandedWorkflow === workflow.id && (
                  <div className="mt-6 pl-12 space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Trigger</h4>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="text-sm">
                          <span className="font-medium">Type:</span> {workflow.trigger.type}
                          {workflow.trigger.event && (
                            <>
                              <span className="mx-2">•</span>
                              <span className="font-medium">Event:</span> {workflow.trigger.event}
                            </>
                          )}
                          {workflow.trigger.schedule && (
                            <>
                              <span className="mx-2">•</span>
                              <span className="font-medium">Schedule:</span> {workflow.trigger.schedule}
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Actions</h4>
                      <div className="space-y-2">
                        {workflow.actions.map((action, index) => {
                          const Icon = actionIcons[action.type];
                          return (
                            <div key={action.id} className="flex items-center p-3 bg-gray-50 rounded-lg">
                              <div className="text-lg mr-3">{index + 1}.</div>
                              <Icon className="h-5 w-5 text-gray-600 mr-3" />
                              <div className="flex-1">
                                <div className="font-medium text-gray-900">{action.name}</div>
                                <div className="text-sm text-gray-600">Type: {action.type}</div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Recent Executions */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Recent Executions</h4>
                      <div className="space-y-2">
                        {executions
                          .filter(e => e.workflowId === workflow.id)
                          .slice(0, 3)
                          .map((execution) => (
                            <div key={execution.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                              <div>
                                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                  execution.status === 'completed' ? 'bg-green-100 text-green-800' :
                                  execution.status === 'failed' ? 'bg-red-100 text-red-800' :
                                  'bg-yellow-100 text-yellow-800'
                                }`}>
                                  {execution.status}
                                </span>
                              </div>
                              <div className="text-sm text-gray-500">
                                {new Date(execution.startedAt).toLocaleString()}
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Workflow Editor Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">
                {selectedWorkflow ? 'Edit Workflow' : 'Create New Workflow'}
              </h3>
            </div>

            <div className="p-6 space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    value={newWorkflow.name}
                    onChange={(e) => setNewWorkflow({...newWorkflow, name: e.target.value})}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    value={newWorkflow.category}
                    onChange={(e) => setNewWorkflow({...newWorkflow, category: e.target.value})}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option>General</option>
                    <option>Student Management</option>
                    <option>Finance</option>
                    <option>Academic</option>
                    <option>Monitoring</option>
                    <option>Reporting</option>
                    <option>Classes</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={newWorkflow.description}
                  onChange={(e) => setNewWorkflow({...newWorkflow, description: e.target.value})}
                  rows={3}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              {/* Trigger Configuration */}
              <div>
                <h4 className="text-md font-medium text-gray-900 mb-3">Trigger</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Trigger Type</label>
                    <select
                      value={newWorkflow.trigger?.type}
                      onChange={(e) => setNewWorkflow({
                        ...newWorkflow, 
                        trigger: { ...newWorkflow.trigger, type: e.target.value as any }
                      })}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                      {triggerTypes.map(type => (
                        <option key={type.value} value={type.value}>{type.label}</option>
                      ))}
                    </select>
                  </div>

                  {newWorkflow.trigger?.type === 'event' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Event</label>
                      <select
                        value={newWorkflow.trigger?.event || ''}
                        onChange={(e) => setNewWorkflow({
                          ...newWorkflow,
                          trigger: { ...newWorkflow.trigger, event: e.target.value }
                        })}
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      >
                        <option value="">Select event</option>
                        {eventTypes.map(event => (
                          <option key={event} value={event}>{event}</option>
                        ))}
                      </select>
                    </div>
                  )}

                  {newWorkflow.trigger?.type === 'schedule' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Cron Schedule</label>
                      <input
                        type="text"
                        value={newWorkflow.trigger?.schedule || ''}
                        onChange={(e) => setNewWorkflow({
                          ...newWorkflow,
                          trigger: { ...newWorkflow.trigger, schedule: e.target.value }
                        })}
                        placeholder="0 9 * * * (Daily at 9 AM)"
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Actions Configuration */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h4 className="text-md font-medium text-gray-900">Actions</h4>
                  <button
                    onClick={addAction}
                    className="flex items-center px-3 py-1 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Action
                  </button>
                </div>

                <div className="space-y-4">
                  {newWorkflow.actions?.map((action, index) => {
                    const Icon = actionIcons[action.type];
                    return (
                      <div key={action.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center">
                            <div className="text-sm font-medium text-gray-500 mr-3">{index + 1}.</div>
                            <Icon className="h-5 w-5 text-gray-600 mr-3" />
                            <input
                              type="text"
                              value={action.name}
                              onChange={(e) => updateAction(action.id, { name: e.target.value })}
                              className="font-medium text-gray-900 border-none bg-transparent focus:outline-none"
                            />
                          </div>
                          <button
                            onClick={() => removeAction(action.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                            <select
                              value={action.type}
                              onChange={(e) => updateAction(action.id, { type: e.target.value as any })}
                              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            >
                              <option value="email">Email</option>
                              <option value="sms">SMS</option>
                              <option value="notification">Notification</option>
                              <option value="webhook">Webhook</option>
                              <option value="database">Database</option>
                              <option value="integration">Integration</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Configuration</label>
                            <input
                              type="text"
                              value={JSON.stringify(action.config)}
                              onChange={(e) => {
                                try {
                                  const config = JSON.parse(e.target.value);
                                  updateAction(action.id, { config });
                                } catch (error) {
                                  // Invalid JSON, ignore
                                }
                              }}
                              placeholder='{"template": "welcome"}'
                              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => {
                  setIsEditing(false);
                  setSelectedWorkflow(null);
                  setNewWorkflow({
                    name: '',
                    description: '',
                    trigger: { type: 'event' },
                    actions: [],
                    isActive: true,
                    category: 'General',
                    icon: '⚡'
                  });
                }}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateWorkflow}
                className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 flex items-center"
              >
                <Save className="h-4 w-4 mr-2" />
                {selectedWorkflow ? 'Update' : 'Create'} Workflow
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Templates Modal */}
      {showTemplates && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">Workflow Templates</h3>
                <button
                  onClick={() => setShowTemplates(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {getWorkflowTemplates().map((template, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center">
                        <div className="text-2xl mr-3">{template.icon}</div>
                        <div>
                          <h4 className="font-medium text-gray-900">{template.name}</h4>
                          <p className="text-sm text-gray-600">{template.description}</p>
                        </div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="text-xs text-gray-500 mb-2">Actions:</div>
                      <div className="space-y-1">
                        {template.actions.slice(0, 2).map((action, actionIndex) => (
                          <div key={actionIndex} className="text-xs text-gray-600 flex items-center">
                            <div className="w-1 h-1 bg-gray-400 rounded-full mr-2"></div>
                            {action.name}
                          </div>
                        ))}
                        {template.actions.length > 2 && (
                          <div className="text-xs text-gray-500">
                            +{template.actions.length - 2} more actions
                          </div>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={() => loadTemplate(template)}
                      className="w-full px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
                    >
                      Use Template
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkflowBuilder;