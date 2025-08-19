import React, { useState } from 'react';
import { NodeType } from '../../types/workflows';
import { 
  Zap, 
  Mail, 
  MessageSquare, 
  Clock, 
  Calendar,
  Database,
  Webhook,
  Bot,
  Brain,
  GitBranch,
  RotateCcw,
  Filter,
  FileText,
  Users,
  Bell,
  Phone,
  Upload,
  Download,
  Search,
  Plus
} from 'lucide-react';

interface NodePaletteProps {
  onAddNode: (nodeType: NodeType) => void;
}

const NodePalette: React.FC<NodePaletteProps> = ({ onAddNode }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const nodeTypes: NodeType[] = [
    // Trigger Nodes
    {
      type: 'webhook_trigger',
      category: 'trigger',
      name: 'Webhook Trigger',
      description: 'Triggered by HTTP requests',
      icon: '🔗',
      color: '#3b82f6',
      inputs: [],
      outputs: [
        { key: 'body', label: 'Request Body', type: 'object', description: 'HTTP request body data' },
        { key: 'headers', label: 'Headers', type: 'object', description: 'HTTP request headers' },
        { key: 'query', label: 'Query Parameters', type: 'object', description: 'URL query parameters' }
      ],
      configurable: true
    },
    {
      type: 'schedule_trigger',
      category: 'trigger',
      name: 'Schedule Trigger',
      description: 'Runs on a schedule (cron)',
      icon: '⏰',
      color: '#10b981',
      inputs: [],
      outputs: [
        { key: 'timestamp', label: 'Execution Time', type: 'string', description: 'When the workflow was triggered' }
      ],
      configurable: true
    },
    {
      type: 'event_trigger',
      category: 'trigger',
      name: 'Event Trigger',
      description: 'Triggered by system events',
      icon: '⚡',
      color: '#f59e0b',
      inputs: [],
      outputs: [
        { key: 'eventData', label: 'Event Data', type: 'object', description: 'Data from the triggering event' },
        { key: 'eventType', label: 'Event Type', type: 'string', description: 'Type of event that triggered' }
      ],
      configurable: true
    },

    // Action Nodes
    {
      type: 'send_email',
      category: 'action',
      name: 'Send Email',
      description: 'Send email messages',
      icon: '📧',
      color: '#3b82f6',
      inputs: [
        { key: 'to', label: 'To', type: 'text', required: true, placeholder: 'recipient@example.com' },
        { key: 'subject', label: 'Subject', type: 'text', required: true, placeholder: 'Email subject' },
        { key: 'body', label: 'Body', type: 'textarea', required: true, placeholder: 'Email content' },
        { key: 'cc', label: 'CC', type: 'text', required: false, placeholder: 'cc@example.com' },
        { key: 'bcc', label: 'BCC', type: 'text', required: false, placeholder: 'bcc@example.com' }
      ],
      outputs: [
        { key: 'messageId', label: 'Message ID', type: 'string', description: 'Unique message identifier' },
        { key: 'success', label: 'Success', type: 'boolean', description: 'Whether email was sent successfully' }
      ],
      configurable: true
    },
    {
      type: 'send_sms',
      category: 'action',
      name: 'Send SMS',
      description: 'Send text messages',
      icon: '📱',
      color: '#10b981',
      inputs: [
        { key: 'phone', label: 'Phone Number', type: 'text', required: true, placeholder: '+1234567890' },
        { key: 'message', label: 'Message', type: 'textarea', required: true, placeholder: 'SMS content' }
      ],
      outputs: [
        { key: 'messageId', label: 'Message ID', type: 'string', description: 'SMS message identifier' },
        { key: 'success', label: 'Success', type: 'boolean', description: 'Whether SMS was sent successfully' }
      ],
      configurable: true
    },
    {
      type: 'create_notification',
      category: 'action',
      name: 'Create Notification',
      description: 'Create in-app notifications',
      icon: '🔔',
      color: '#8b5cf6',
      inputs: [
        { key: 'userId', label: 'User ID', type: 'text', required: true, placeholder: 'target-user-id' },
        { key: 'title', label: 'Title', type: 'text', required: true, placeholder: 'Notification title' },
        { key: 'message', label: 'Message', type: 'textarea', required: true, placeholder: 'Notification content' },
        { key: 'type', label: 'Type', type: 'select', required: true, options: [
          { label: 'Info', value: 'info' },
          { label: 'Success', value: 'success' },
          { label: 'Warning', value: 'warning' },
          { label: 'Error', value: 'error' }
        ]}
      ],
      outputs: [
        { key: 'notificationId', label: 'Notification ID', type: 'string', description: 'Created notification ID' }
      ],
      configurable: true
    },
    {
      type: 'http_request',
      category: 'action',
      name: 'HTTP Request',
      description: 'Make HTTP API calls',
      icon: '🌐',
      color: '#ef4444',
      inputs: [
        { key: 'url', label: 'URL', type: 'text', required: true, placeholder: 'https://api.example.com/endpoint' },
        { key: 'method', label: 'Method', type: 'select', required: true, options: [
          { label: 'GET', value: 'GET' },
          { label: 'POST', value: 'POST' },
          { label: 'PUT', value: 'PUT' },
          { label: 'DELETE', value: 'DELETE' }
        ]},
        { key: 'headers', label: 'Headers', type: 'json', required: false, placeholder: '{"Authorization": "Bearer token"}' },
        { key: 'body', label: 'Body', type: 'json', required: false, placeholder: '{"key": "value"}' }
      ],
      outputs: [
        { key: 'response', label: 'Response', type: 'object', description: 'HTTP response data' },
        { key: 'status', label: 'Status Code', type: 'number', description: 'HTTP status code' }
      ],
      configurable: true
    },

    // AI Nodes
    {
      type: 'ai_text_generation',
      category: 'ai',
      name: 'AI Text Generation',
      description: 'Generate text using AI',
      icon: '🤖',
      color: '#8b5cf6',
      inputs: [
        { key: 'prompt', label: 'Prompt', type: 'textarea', required: true, placeholder: 'Enter your prompt here...' },
        { key: 'maxTokens', label: 'Max Tokens', type: 'number', required: false, value: 500 },
        { key: 'temperature', label: 'Temperature', type: 'number', required: false, value: 0.7 },
        { key: 'model', label: 'Model', type: 'select', required: true, options: [
          { label: 'GPT-4', value: 'gpt-4' },
          { label: 'GPT-3.5 Turbo', value: 'gpt-3.5-turbo' },
          { label: 'Claude-3', value: 'claude-3-sonnet' }
        ]}
      ],
      outputs: [
        { key: 'text', label: 'Generated Text', type: 'string', description: 'AI-generated text content' },
        { key: 'tokens', label: 'Token Count', type: 'number', description: 'Number of tokens used' }
      ],
      configurable: true
    },
    {
      type: 'ai_grade_assignment',
      category: 'ai',
      name: 'AI Grade Assignment',
      description: 'Automatically grade student work',
      icon: '📝',
      color: '#ec4899',
      inputs: [
        { key: 'assignment', label: 'Assignment Text', type: 'textarea', required: true, placeholder: 'Student assignment content' },
        { key: 'rubric', label: 'Grading Rubric', type: 'textarea', required: true, placeholder: 'Grading criteria...' },
        { key: 'maxScore', label: 'Max Score', type: 'number', required: true, value: 100 }
      ],
      outputs: [
        { key: 'score', label: 'Score', type: 'number', description: 'Calculated score' },
        { key: 'feedback', label: 'Feedback', type: 'string', description: 'AI-generated feedback' },
        { key: 'grade', label: 'Letter Grade', type: 'string', description: 'Letter grade (A, B, C, etc.)' }
      ],
      configurable: true
    },
    {
      type: 'ai_translate',
      category: 'ai',
      name: 'AI Translate',
      description: 'Translate text between languages',
      icon: '🌍',
      color: '#06b6d4',
      inputs: [
        { key: 'text', label: 'Text to Translate', type: 'textarea', required: true, placeholder: 'Enter text to translate' },
        { key: 'fromLang', label: 'From Language', type: 'select', required: true, options: [
          { label: 'English', value: 'en' },
          { label: 'Vietnamese', value: 'vi' },
          { label: 'Chinese', value: 'zh' },
          { label: 'Spanish', value: 'es' },
          { label: 'French', value: 'fr' }
        ]},
        { key: 'toLang', label: 'To Language', type: 'select', required: true, options: [
          { label: 'English', value: 'en' },
          { label: 'Vietnamese', value: 'vi' },
          { label: 'Chinese', value: 'zh' },
          { label: 'Spanish', value: 'es' },
          { label: 'French', value: 'fr' }
        ]}
      ],
      outputs: [
        { key: 'translatedText', label: 'Translated Text', type: 'string', description: 'Translated content' },
        { key: 'confidence', label: 'Confidence', type: 'number', description: 'Translation confidence score' }
      ],
      configurable: true
    },
    {
      type: 'ai_summarize',
      category: 'ai',
      name: 'AI Summarize',
      description: 'Summarize long text content',
      icon: '📄',
      color: '#f97316',
      inputs: [
        { key: 'text', label: 'Text to Summarize', type: 'textarea', required: true, placeholder: 'Enter long text content' },
        { key: 'maxLength', label: 'Max Summary Length', type: 'number', required: false, value: 200 },
        { key: 'style', label: 'Summary Style', type: 'select', required: false, options: [
          { label: 'Bullet Points', value: 'bullets' },
          { label: 'Paragraph', value: 'paragraph' },
          { label: 'Key Points', value: 'keypoints' }
        ]}
      ],
      outputs: [
        { key: 'summary', label: 'Summary', type: 'string', description: 'Summarized content' },
        { key: 'keyPoints', label: 'Key Points', type: 'array', description: 'Extract key points' }
      ],
      configurable: true
    },

    // Logic Nodes
    {
      type: 'if_condition',
      category: 'logic',
      name: 'If Condition',
      description: 'Conditional branching logic',
      icon: '🔀',
      color: '#f59e0b',
      inputs: [
        { key: 'condition', label: 'Condition', type: 'text', required: true, placeholder: 'value > 10' },
        { key: 'value', label: 'Value to Check', type: 'text', required: true, placeholder: 'Input value' }
      ],
      outputs: [
        { key: 'true', label: 'True', type: 'boolean', description: 'Condition is true' },
        { key: 'false', label: 'False', type: 'boolean', description: 'Condition is false' }
      ],
      configurable: true
    },
    {
      type: 'loop',
      category: 'logic',
      name: 'Loop',
      description: 'Iterate over arrays or repeat actions',
      icon: '🔄',
      color: '#8b5cf6',
      inputs: [
        { key: 'items', label: 'Items to Loop', type: 'json', required: true, placeholder: '["item1", "item2", "item3"]' },
        { key: 'maxIterations', label: 'Max Iterations', type: 'number', required: false, value: 100 }
      ],
      outputs: [
        { key: 'item', label: 'Current Item', type: 'any', description: 'Current loop item' },
        { key: 'index', label: 'Index', type: 'number', description: 'Current loop index' }
      ],
      configurable: true
    },
    {
      type: 'error_handler',
      category: 'logic',
      name: 'Error Handler',
      description: 'Handle workflow errors',
      icon: '🚨',
      color: '#ef4444',
      inputs: [
        { key: 'input', label: 'Input', type: 'any', required: true, placeholder: 'Data to process' }
      ],
      outputs: [
        { key: 'success', label: 'Success', type: 'any', description: 'Output if successful' },
        { key: 'error', label: 'Error', type: 'object', description: 'Error information if failed' }
      ],
      configurable: true
    },

    // Utility Nodes
    {
      type: 'delay',
      category: 'utility',
      name: 'Delay',
      description: 'Wait for specified time',
      icon: '⏱️',
      color: '#6b7280',
      inputs: [
        { key: 'duration', label: 'Duration (seconds)', type: 'number', required: true, value: 5 }
      ],
      outputs: [
        { key: 'delayed', label: 'Delayed Output', type: 'any', description: 'Data after delay' }
      ],
      configurable: true
    },
    {
      type: 'data_transformer',
      category: 'utility',
      name: 'Data Transformer',
      description: 'Transform and manipulate data',
      icon: '🔧',
      color: '#059669',
      inputs: [
        { key: 'input', label: 'Input Data', type: 'json', required: true, placeholder: '{"key": "value"}' },
        { key: 'transformation', label: 'Transformation', type: 'text', required: true, placeholder: 'input.key.toUpperCase()' }
      ],
      outputs: [
        { key: 'output', label: 'Transformed Data', type: 'any', description: 'Transformed result' }
      ],
      configurable: true
    },
    {
      type: 'database_query',
      category: 'utility',
      name: 'Database Query',
      description: 'Query database records',
      icon: '🗄️',
      color: '#7c3aed',
      inputs: [
        { key: 'table', label: 'Table', type: 'text', required: true, placeholder: 'table_name' },
        { key: 'operation', label: 'Operation', type: 'select', required: true, options: [
          { label: 'Select', value: 'select' },
          { label: 'Insert', value: 'insert' },
          { label: 'Update', value: 'update' },
          { label: 'Delete', value: 'delete' }
        ]},
        { key: 'conditions', label: 'Conditions', type: 'json', required: false, placeholder: '{"id": 1}' },
        { key: 'data', label: 'Data', type: 'json', required: false, placeholder: '{"name": "value"}' }
      ],
      outputs: [
        { key: 'result', label: 'Query Result', type: 'object', description: 'Database query result' },
        { key: 'count', label: 'Affected Rows', type: 'number', description: 'Number of affected rows' }
      ],
      configurable: true
    },

    // Education-Specific Nodes
    {
      type: 'student_enrollment',
      category: 'action',
      name: 'Student Enrollment',
      description: 'Enroll student in course',
      icon: '🎓',
      color: '#0ea5e9',
      inputs: [
        { key: 'studentId', label: 'Student ID', type: 'text', required: true, placeholder: 'student-id' },
        { key: 'courseId', label: 'Course ID', type: 'text', required: true, placeholder: 'course-id' },
        { key: 'enrollmentDate', label: 'Enrollment Date', type: 'text', required: false }
      ],
      outputs: [
        { key: 'enrollmentId', label: 'Enrollment ID', type: 'string', description: 'Created enrollment ID' },
        { key: 'success', label: 'Success', type: 'boolean', description: 'Enrollment success status' }
      ],
      configurable: true
    },
    {
      type: 'grade_calculator',
      category: 'utility',
      name: 'Grade Calculator',
      description: 'Calculate final grades',
      icon: '🧮',
      color: '#dc2626',
      inputs: [
        { key: 'scores', label: 'Scores Array', type: 'json', required: true, placeholder: '[85, 92, 78, 90]' },
        { key: 'weights', label: 'Weights Array', type: 'json', required: false, placeholder: '[0.25, 0.25, 0.25, 0.25]' }
      ],
      outputs: [
        { key: 'finalGrade', label: 'Final Grade', type: 'number', description: 'Calculated final grade' },
        { key: 'letterGrade', label: 'Letter Grade', type: 'string', description: 'Letter grade (A, B, C, etc.)' }
      ],
      configurable: true
    },
    {
      type: 'attendance_check',
      category: 'trigger',
      name: 'Attendance Check',
      description: 'Monitor attendance patterns',
      icon: '📊',
      color: '#059669',
      inputs: [],
      outputs: [
        { key: 'studentsAbsent', label: 'Absent Students', type: 'array', description: 'List of absent students' },
        { key: 'attendanceRate', label: 'Attendance Rate', type: 'number', description: 'Overall attendance percentage' }
      ],
      configurable: true
    }
  ];

  const categories = [
    { id: 'all', name: 'All Nodes', icon: Zap },
    { id: 'trigger', name: 'Triggers', icon: Zap },
    { id: 'action', name: 'Actions', icon: Mail },
    { id: 'ai', name: 'AI Nodes', icon: Bot },
    { id: 'logic', name: 'Logic', icon: GitBranch },
    { id: 'utility', name: 'Utilities', icon: FileText }
  ];

  const filteredNodes = nodeTypes.filter(node => {
    const matchesSearch = node.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         node.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || node.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 bg-white">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Node Library</h2>
        
        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search nodes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
          />
        </div>

        {/* Category Filter */}
        <div className="space-y-2">
          {categories.map(category => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`w-full flex items-center px-3 py-2 text-sm rounded-lg transition-all ${
                  selectedCategory === category.id
                    ? 'bg-blue-100 text-blue-700 border border-blue-300'
                    : 'text-gray-600 hover:bg-gray-100 border border-transparent'
                }`}
              >
                <Icon className="h-4 w-4 mr-2" />
                {category.name}
                <span className="ml-auto text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full">
                  {nodeTypes.filter(n => category.id === 'all' || n.category === category.id).length}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Nodes List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {filteredNodes.map(node => (
          <div
            key={node.type}
            className="bg-white border border-gray-200 rounded-lg p-4 hover:border-gray-300 hover:shadow-md transition-all cursor-pointer group"
            onClick={() => onAddNode(node)}
          >
            <div className="flex items-start">
              <div 
                className="w-10 h-10 rounded-lg flex items-center justify-center text-white mr-3 group-hover:scale-110 transition-transform"
                style={{ backgroundColor: node.color }}
              >
                <span className="text-lg">{node.icon}</span>
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                  {node.name}
                </h3>
                <p className="text-sm text-gray-600 mt-1">{node.description}</p>
                <div className="flex items-center mt-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${
                    node.category === 'trigger' ? 'bg-blue-100 text-blue-800' :
                    node.category === 'action' ? 'bg-green-100 text-green-800' :
                    node.category === 'ai' ? 'bg-purple-100 text-purple-800' :
                    node.category === 'logic' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {node.category}
                  </span>
                  {node.premium && (
                    <span className="ml-2 px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
                      Pro
                    </span>
                  )}
                </div>
              </div>
              <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                <Plus className="h-5 w-5 text-blue-500" />
              </div>
            </div>
          </div>
        ))}

        {filteredNodes.length === 0 && (
          <div className="text-center py-8">
            <div className="text-gray-400 mb-2">
              <Search className="h-8 w-8 mx-auto" />
            </div>
            <p className="text-gray-500">No nodes found matching your search</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NodePalette;