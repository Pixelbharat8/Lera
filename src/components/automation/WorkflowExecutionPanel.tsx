import React, { useState, useEffect } from 'react';
import { WorkflowExecution, WorkflowExecutionLog } from '../../types/workflows';
import { 
  X, 
  Play, 
  CheckCircle, 
  XCircle, 
  Clock, 
  AlertTriangle,
  ChevronDown,
  ChevronRight,
  RefreshCw,
  Download,
  Filter
} from 'lucide-react';

interface WorkflowExecutionPanelProps {
  workflowId?: string;
  onClose: () => void;
}

const WorkflowExecutionPanel: React.FC<WorkflowExecutionPanelProps> = ({
  workflowId,
  onClose
}) => {
  const [executions, setExecutions] = useState<WorkflowExecution[]>([]);
  const [selectedExecution, setSelectedExecution] = useState<WorkflowExecution | null>(null);
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());
  const [logFilter, setLogFilter] = useState<'all' | 'info' | 'warning' | 'error'>('all');
  const [loading, setLoading] = useState(true);

  // Mock execution data
  useEffect(() => {
    // Simulate loading executions
    const mockExecutions: WorkflowExecution[] = [
      {
        id: 'exec_1',
        workflowId: workflowId || 'workflow_1',
        status: 'completed',
        startedAt: new Date(Date.now() - 300000).toISOString(),
        completedAt: new Date(Date.now() - 250000).toISOString(),
        duration: 50000,
        triggerData: { studentId: 'student_123', courseId: 'course_456' },
        logs: [
          {
            id: 'log_1',
            timestamp: new Date(Date.now() - 300000).toISOString(),
            level: 'info',
            message: 'Workflow execution started',
            data: { executionId: 'exec_1' }
          },
          {
            id: 'log_2',
            timestamp: new Date(Date.now() - 280000).toISOString(),
            level: 'info',
            message: 'Processing trigger data',
            nodeId: 'trigger_1',
            data: { studentId: 'student_123' }
          },
          {
            id: 'log_3',
            timestamp: new Date(Date.now() - 260000).toISOString(),
            level: 'info',
            message: 'Sending welcome email',
            nodeId: 'email_1',
            data: { to: 'student@example.com', subject: 'Welcome to LERA Academy' }
          },
          {
            id: 'log_4',
            timestamp: new Date(Date.now() - 250000).toISOString(),
            level: 'info',
            message: 'Workflow execution completed successfully',
            data: { totalSteps: 3, duration: '50s' }
          }
        ],
        nodeExecutions: [
          {
            nodeId: 'trigger_1',
            startedAt: new Date(Date.now() - 300000).toISOString(),
            completedAt: new Date(Date.now() - 280000).toISOString(),
            status: 'completed',
            input: {},
            output: { studentId: 'student_123', courseId: 'course_456' },
            executionTime: 20000
          },
          {
            nodeId: 'email_1',
            startedAt: new Date(Date.now() - 280000).toISOString(),
            completedAt: new Date(Date.now() - 250000).toISOString(),
            status: 'completed',
            input: { studentId: 'student_123', courseId: 'course_456' },
            output: { messageId: 'msg_789', success: true },
            executionTime: 30000
          }
        ]
      },
      {
        id: 'exec_2',
        workflowId: workflowId || 'workflow_1',
        status: 'failed',
        startedAt: new Date(Date.now() - 600000).toISOString(),
        completedAt: new Date(Date.now() - 580000).toISOString(),
        duration: 20000,
        error: 'Failed to send email: SMTP connection timeout',
        logs: [
          {
            id: 'log_5',
            timestamp: new Date(Date.now() - 600000).toISOString(),
            level: 'info',
            message: 'Workflow execution started',
            data: { executionId: 'exec_2' }
          },
          {
            id: 'log_6',
            timestamp: new Date(Date.now() - 580000).toISOString(),
            level: 'error',
            message: 'Email sending failed: SMTP connection timeout',
            nodeId: 'email_1',
            data: { error: 'Connection timeout after 30s' }
          }
        ],
        nodeExecutions: [
          {
            nodeId: 'trigger_1',
            startedAt: new Date(Date.now() - 600000).toISOString(),
            completedAt: new Date(Date.now() - 590000).toISOString(),
            status: 'completed',
            input: {},
            output: { studentId: 'student_456' },
            executionTime: 10000
          },
          {
            nodeId: 'email_1',
            startedAt: new Date(Date.now() - 590000).toISOString(),
            completedAt: new Date(Date.now() - 580000).toISOString(),
            status: 'failed',
            input: { studentId: 'student_456' },
            error: 'SMTP connection timeout',
            executionTime: 10000
          }
        ]
      },
      {
        id: 'exec_3',
        workflowId: workflowId || 'workflow_1',
        status: 'running',
        startedAt: new Date(Date.now() - 30000).toISOString(),
        logs: [
          {
            id: 'log_7',
            timestamp: new Date(Date.now() - 30000).toISOString(),
            level: 'info',
            message: 'Workflow execution started',
            data: { executionId: 'exec_3' }
          },
          {
            id: 'log_8',
            timestamp: new Date(Date.now() - 20000).toISOString(),
            level: 'info',
            message: 'Processing AI text generation',
            nodeId: 'ai_1',
            data: { prompt: 'Generate welcome message' }
          }
        ],
        nodeExecutions: [
          {
            nodeId: 'trigger_1',
            startedAt: new Date(Date.now() - 30000).toISOString(),
            completedAt: new Date(Date.now() - 25000).toISOString(),
            status: 'completed',
            input: {},
            output: { eventType: 'student_enrolled' },
            executionTime: 5000
          },
          {
            nodeId: 'ai_1',
            startedAt: new Date(Date.now() - 25000).toISOString(),
            status: 'running',
            input: { eventType: 'student_enrolled' }
          }
        ]
      }
    ];

    setExecutions(mockExecutions);
    setSelectedExecution(mockExecutions[0]);
    setLoading(false);
  }, [workflowId]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'failed':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'running':
        return <Clock className="h-5 w-5 text-blue-500 animate-spin" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const getLogIcon = (level: string) => {
    switch (level) {
      case 'error':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'info':
        return <CheckCircle className="h-4 w-4 text-blue-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const formatDuration = (ms: number) => {
    if (ms < 1000) return `${ms}ms`;
    if (ms < 60000) return `${(ms / 1000).toFixed(1)}s`;
    return `${(ms / 60000).toFixed(1)}m`;
  };

  const filteredLogs = selectedExecution?.logs.filter(log => 
    logFilter === 'all' || log.level === logFilter
  ) || [];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Workflow Executions</h2>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => window.location.reload()}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded"
              title="Refresh executions"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 flex">
        {/* Executions List */}
        <div className="w-1/3 border-r border-gray-200 overflow-y-auto">
          <div className="p-4">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Recent Executions</h3>
            <div className="space-y-3">
              {executions.map(execution => (
                <div
                  key={execution.id}
                  onClick={() => setSelectedExecution(execution)}
                  className={`p-3 rounded-lg border cursor-pointer transition-all ${
                    selectedExecution?.id === execution.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      {getStatusIcon(execution.status)}
                      <span className="ml-2 text-sm font-medium text-gray-900">
                        Execution #{execution.id.slice(-4)}
                      </span>
                    </div>
                    {execution.duration && (
                      <span className="text-xs text-gray-500">
                        {formatDuration(execution.duration)}
                      </span>
                    )}
                  </div>
                  
                  <div className="text-xs text-gray-500">
                    {new Date(execution.startedAt).toLocaleString()}
                  </div>
                  
                  {execution.error && (
                    <div className="text-xs text-red-600 mt-1 truncate">
                      Error: {execution.error}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Execution Details */}
        <div className="flex-1 flex flex-col">
          {selectedExecution ? (
            <>
              {/* Execution Info */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    {getStatusIcon(selectedExecution.status)}
                    <div className="ml-3">
                      <h3 className="text-lg font-medium text-gray-900">
                        Execution #{selectedExecution.id.slice(-8)}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {new Date(selectedExecution.startedAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">
                      Status: <span className={
                        selectedExecution.status === 'completed' ? 'text-green-600' :
                        selectedExecution.status === 'failed' ? 'text-red-600' :
                        'text-blue-600'
                      }>
                        {selectedExecution.status}
                      </span>
                    </div>
                    {selectedExecution.duration && (
                      <div className="text-sm text-gray-500">
                        Duration: {formatDuration(selectedExecution.duration)}
                      </div>
                    )}
                  </div>
                </div>

                {/* Trigger Data */}
                {selectedExecution.triggerData && (
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Trigger Data</h4>
                    <pre className="text-xs text-gray-600 bg-white p-2 rounded border overflow-x-auto">
                      {JSON.stringify(selectedExecution.triggerData, null, 2)}
                    </pre>
                  </div>
                )}

                {/* Error Details */}
                {selectedExecution.error && (
                  <div className="bg-red-50 border border-red-200 p-3 rounded-lg mt-3">
                    <h4 className="text-sm font-medium text-red-800 mb-2">Error Details</h4>
                    <p className="text-sm text-red-700">{selectedExecution.error}</p>
                  </div>
                )}
              </div>

              {/* Tabs */}
              <div className="border-b border-gray-200">
                <div className="flex space-x-8 px-6">
                  <button className="py-4 border-b-2 border-blue-500 text-blue-600 font-medium text-sm">
                    Execution Logs
                  </button>
                  <button className="py-4 border-b-2 border-transparent text-gray-500 hover:text-gray-700 font-medium text-sm">
                    Node Details
                  </button>
                </div>
              </div>

              {/* Logs */}
              <div className="flex-1 overflow-y-auto">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-sm font-medium text-gray-900">Execution Logs</h4>
                    <div className="flex items-center space-x-3">
                      <select
                        value={logFilter}
                        onChange={(e) => setLogFilter(e.target.value as any)}
                        className="text-sm border-gray-300 rounded-md"
                      >
                        <option value="all">All Logs</option>
                        <option value="info">Info</option>
                        <option value="warning">Warning</option>
                        <option value="error">Error</option>
                      </select>
                      <button
                        className="p-2 text-gray-500 hover:text-gray-700"
                        title="Download logs"
                      >
                        <Download className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {filteredLogs.map(log => (
                      <div 
                        key={log.id}
                        className={`p-3 rounded-lg border ${
                          log.level === 'error' ? 'bg-red-50 border-red-200' :
                          log.level === 'warning' ? 'bg-yellow-50 border-yellow-200' :
                          'bg-gray-50 border-gray-200'
                        }`}
                      >
                        <div className="flex items-start">
                          {getLogIcon(log.level)}
                          <div className="ml-3 flex-1">
                            <div className="flex items-center justify-between">
                              <p className={`text-sm font-medium ${
                                log.level === 'error' ? 'text-red-800' :
                                log.level === 'warning' ? 'text-yellow-800' :
                                'text-gray-800'
                              }`}>
                                {log.message}
                              </p>
                              <span className="text-xs text-gray-500">
                                {new Date(log.timestamp).toLocaleTimeString()}
                              </span>
                            </div>
                            
                            {log.nodeId && (
                              <p className="text-xs text-gray-600 mt-1">
                                Node: {log.nodeId}
                              </p>
                            )}
                            
                            {log.data && (
                              <details className="mt-2">
                                <summary className="text-xs text-gray-500 cursor-pointer hover:text-gray-700">
                                  View data
                                </summary>
                                <pre className="text-xs text-gray-600 bg-white p-2 rounded border mt-1 overflow-x-auto">
                                  {JSON.stringify(log.data, null, 2)}
                                </pre>
                              </details>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <Play className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Select an Execution</h3>
                <p className="text-gray-500">Choose an execution from the list to view details and logs</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkflowExecutionPanel;