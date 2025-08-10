import React, { useState } from 'react';
import { 
  Mail, 
  MessageSquare, 
  Send, 
  Search,
  Calendar,
  Paperclip,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

interface Message {
  id: string;
  from: string;
  to: string;
  subject: string;
  content: string;
  timestamp: string;
  type: 'email' | 'sms' | 'internal';
  status: 'sent' | 'delivered' | 'read' | 'replied';
  priority: 'low' | 'medium' | 'high';
  attachments?: string[];
}

interface CommunicationCenterProps {
  userType: 'admin' | 'teacher' | 'student';
  userId: string;
}

const CommunicationCenter: React.FC<CommunicationCenterProps> = ({ userType: _userType, userId: _userId }) => {
  const [activeTab, setActiveTab] = useState<'inbox' | 'sent' | 'compose'>('inbox');
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [composeData, setComposeData] = useState({
    to: '',
    subject: '',
    content: '',
    type: 'email' as 'email' | 'sms' | 'internal',
    priority: 'medium' as 'low' | 'medium' | 'high'
  });

  // Mock messages data
  const mockMessages: Message[] = [
    {
      id: '1',
      from: 'Ms. Ledia Balliu',
      to: 'Nguyen Minh Duc',
      subject: 'IELTS Progress Update',
      content: 'Great improvement in your speaking skills this week. Keep up the excellent work!',
      timestamp: '2024-01-23T14:30:00Z',
      type: 'email',
      status: 'read',
      priority: 'medium'
    },
    {
      id: '2',
      from: 'System',
      to: 'All Students',
      subject: 'New Course Available: Advanced Grammar',
      content: 'We are excited to announce our new Advanced Grammar course is now available for enrollment.',
      timestamp: '2024-01-22T10:15:00Z',
      type: 'email',
      status: 'sent',
      priority: 'low'
    },
    {
      id: '3',
      from: 'Mr. Mo Tran',
      to: 'Tran Thi Mai',
      subject: 'Business Presentation Feedback',
      content: 'Your presentation was excellent! You showed great confidence and clear communication skills.',
      timestamp: '2024-01-21T16:45:00Z',
      type: 'email',
      status: 'replied',
      priority: 'medium'
    },
    {
      id: '4',
      from: 'Admin',
      to: 'All Teachers',
      subject: 'Monthly Staff Meeting',
      content: 'Monthly staff meeting scheduled for January 30th at 3:00 PM in Conference Room A.',
      timestamp: '2024-01-20T09:00:00Z',
      type: 'internal',
      status: 'delivered',
      priority: 'high'
    }
  ];

  const getStatusIcon = (status: Message['status']) => {
    switch (status) {
      case 'sent':
        return <Send className="h-4 w-4 text-blue-500" />;
      case 'delivered':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'read':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'replied':
        return <MessageSquare className="h-4 w-4 text-purple-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const getPriorityColor = (priority: Message['priority']) => {
    switch (priority) {
      case 'high':
        return 'text-red-600';
      case 'medium':
        return 'text-yellow-600';
      case 'low':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  const handleSendMessage = () => {
    // Handle sending message
    console.log('Sending message:', composeData);
    // Reset form
    setComposeData({
      to: '',
      subject: '',
      content: '',
      type: 'email',
      priority: 'medium'
    });
    setActiveTab('sent');
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border h-full flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-900">Communication Center</h2>
        <p className="text-sm text-gray-600">Manage all student and teacher communications</p>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8 px-6">
          {[
            { key: 'inbox', label: 'Inbox', icon: Mail, count: 12 },
            { key: 'sent', label: 'Sent', icon: Send, count: 45 },
            { key: 'compose', label: 'Compose', icon: MessageSquare, count: null }
          ].map(({ key, label, icon: Icon, count }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key as 'inbox' | 'sent' | 'compose')}
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

      <div className="flex-1 overflow-hidden">
        {/* Inbox Tab */}
        {activeTab === 'inbox' && (
          <div className="h-full flex flex-col">
            {/* Search and Filter */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search messages..."
                    className="pl-10 w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <select className="rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                  <option>All Types</option>
                  <option>Email</option>
                  <option>SMS</option>
                  <option>Internal</option>
                </select>
              </div>
            </div>

            {/* Messages List */}
            <div className="flex-1 overflow-y-auto">
              <div className="divide-y divide-gray-200">
                {mockMessages.map((message) => (
                  <div 
                    key={message.id} 
                    className={`p-4 hover:bg-gray-50 cursor-pointer ${
                      selectedMessage?.id === message.id ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                    }`}
                    onClick={() => setSelectedMessage(message)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center mb-1">
                          <div className="font-medium text-gray-900">{message.from}</div>
                          <div className="ml-2 flex items-center">
                            {getStatusIcon(message.status)}
                          </div>
                          <div className={`ml-2 ${getPriorityColor(message.priority)}`}>
                            <AlertCircle className="h-3 w-3" />
                          </div>
                        </div>
                        <div className="text-sm font-medium text-gray-800">{message.subject}</div>
                        <div className="text-sm text-gray-600 mt-1 line-clamp-2">{message.content}</div>
                        <div className="text-xs text-gray-500 mt-2">
                          {new Date(message.timestamp).toLocaleString()}
                        </div>
                      </div>
                      <div className="ml-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          message.type === 'email' ? 'bg-blue-100 text-blue-800' :
                          message.type === 'sms' ? 'bg-green-100 text-green-800' :
                          'bg-purple-100 text-purple-800'
                        }`}>
                          {message.type.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Compose Tab */}
        {activeTab === 'compose' && (
          <div className="p-6 h-full flex flex-col">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Compose New Message</h3>
            
            <div className="space-y-4 flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
                  <input
                    type="text"
                    value={composeData.to}
                    onChange={(e) => setComposeData({...composeData, to: e.target.value})}
                    placeholder="Enter recipient email or select from contacts"
                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                  <select
                    value={composeData.type}
                    onChange={(e) => setComposeData({...composeData, type: e.target.value as 'email' | 'sms' | 'internal'})}
                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="email">Email</option>
                    <option value="sms">SMS</option>
                    <option value="internal">Internal Message</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                  <input
                    type="text"
                    value={composeData.subject}
                    onChange={(e) => setComposeData({...composeData, subject: e.target.value})}
                    placeholder="Message subject"
                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                  <select
                    value={composeData.priority}
                    onChange={(e) => setComposeData({...composeData, priority: e.target.value as 'low' | 'medium' | 'high'})}
                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>

              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea
                  value={composeData.content}
                  onChange={(e) => setComposeData({...composeData, content: e.target.value})}
                  placeholder="Type your message here..."
                  rows={10}
                  className="w-full h-full min-h-48 rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="flex items-center space-x-4">
                  <button className="flex items-center text-sm text-gray-500 hover:text-gray-700">
                    <Paperclip className="h-4 w-4 mr-1" />
                    Attach File
                  </button>
                  <button className="flex items-center text-sm text-gray-500 hover:text-gray-700">
                    <Calendar className="h-4 w-4 mr-1" />
                    Schedule Send
                  </button>
                </div>
                
                <div className="flex space-x-3">
                  <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                    Save Draft
                  </button>
                  <button
                    onClick={handleSendMessage}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Sent Tab */}
        {activeTab === 'sent' && (
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Sent Messages</h3>
            <div className="space-y-4">
              {mockMessages.filter(m => m.status === 'sent' || m.status === 'delivered').map((message) => (
                <div key={message.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <div className="font-medium text-gray-900">To: {message.to}</div>
                        <div className="ml-3 flex items-center">
                          {getStatusIcon(message.status)}
                          <span className="ml-1 text-sm text-gray-600 capitalize">{message.status}</span>
                        </div>
                      </div>
                      <div className="text-sm font-medium text-gray-800">{message.subject}</div>
                      <div className="text-sm text-gray-600 mt-1">{message.content}</div>
                      <div className="text-xs text-gray-500 mt-2">
                        Sent: {new Date(message.timestamp).toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Message Detail Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Message Details</h3>
              <button
                onClick={() => setSelectedMessage(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-700">From:</span>
                  <span className="ml-2 text-gray-900">{selectedMessage.from}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">To:</span>
                  <span className="ml-2 text-gray-900">{selectedMessage.to}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Type:</span>
                  <span className="ml-2 text-gray-900 capitalize">{selectedMessage.type}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Priority:</span>
                  <span className={`ml-2 capitalize ${getPriorityColor(selectedMessage.priority)}`}>
                    {selectedMessage.priority}
                  </span>
                </div>
              </div>
              
              <div>
                <div className="font-medium text-gray-700 mb-2">Subject:</div>
                <div className="text-gray-900">{selectedMessage.subject}</div>
              </div>
              
              <div>
                <div className="font-medium text-gray-700 mb-2">Message:</div>
                <div className="text-gray-900 bg-gray-50 p-4 rounded-lg">{selectedMessage.content}</div>
              </div>
              
              <div className="text-sm text-gray-500">
                Sent: {new Date(selectedMessage.timestamp).toLocaleString()}
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                Reply
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                Forward
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunicationCenter;