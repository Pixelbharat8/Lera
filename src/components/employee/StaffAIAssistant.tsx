import React, { useState } from 'react';
import { useAIAssistant } from '../../hooks/useAIAssistant';
import { 
  Bot, 
  Mic, 
  Send, 
  ClipboardCheck, 
  Users, 
  BarChart3,
  Calendar,
  MessageSquare,
  Lightbulb,
  Zap,
  Star,
  Target,
  Award,
  Volume2,
  FileText,
  Phone,
  Mail
} from 'lucide-react';

const StaffAIAssistant = () => {
  const { 
    staffPersonalities,
    conversation,
    isLoading,
    isListening,
    staffMode,
    setStaffMode,
    sendMessage,
    startVoiceRecognition,
    speakMessage,
    generateStaffTask,
    clearConversation
  } = useAIAssistant();
  
  const [inputMessage, setInputMessage] = useState('');
  const [selectedPersonality, setSelectedPersonality] = useState<'organizer' | 'communicator' | 'analyst'>('organizer');

  const quickActions = {
    organizer: [
      'Create weekly task schedule for administrative team',
      'Organize student enrollment process workflow',
      'Plan facility maintenance and resource allocation',
      'Generate staff meeting agenda and action items'
    ],
    communicator: [
      'Draft parent newsletter about academy updates',
      'Create welcome email template for new students',
      'Prepare social media content for course promotion',
      'Design parent-teacher conference invitation'
    ],
    analyst: [
      'Generate monthly enrollment analytics report',
      'Analyze student satisfaction survey results',
      'Create teacher performance dashboard',
      'Compile financial summary for board meeting'
    ]
  };

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      sendMessage(`[Staff Mode: ${staffMode}] ${inputMessage}`);
      setInputMessage('');
    }
  };

  const handleQuickAction = (action: string) => {
    sendMessage(`[Staff Assistant] ${action}`);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border h-full">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6 rounded-t-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="p-3 bg-white/20 rounded-xl mr-4">
              <Bot className="h-8 w-8" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Staff AI Assistant</h2>
              <p className="text-indigo-100">Your intelligent administrative companion</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Target className="h-5 w-5 text-yellow-300 animate-pulse" />
            <Award className="h-5 w-5 text-pink-300 animate-bounce" />
          </div>
        </div>
      </div>

      {/* Mode Selector */}
      <div className="p-4 border-b border-gray-200">
        <div className="grid grid-cols-4 gap-2">
          {[
            { mode: 'tasks', label: 'Tasks', icon: ClipboardCheck },
            { mode: 'scheduling', label: 'Schedule', icon: Calendar },
            { mode: 'communication', label: 'Communication', icon: MessageSquare },
            { mode: 'reports', label: 'Reports', icon: BarChart3 }
          ].map(({ mode, label, icon: Icon }) => (
            <button
              key={mode}
              onClick={() => setStaffMode(mode as any)}
              className={`p-3 rounded-lg text-center transition-all ${
                staffMode === mode
                  ? 'bg-indigo-100 text-indigo-700 border-2 border-indigo-300'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Icon className="h-5 w-5 mx-auto mb-1" />
              <div className="text-xs font-medium">{label}</div>
            </button>
          ))}
        </div>
      </div>

      {/* AI Personality Cards */}
      <div className="p-4 border-b border-gray-200">
        <div className="grid grid-cols-3 gap-3">
          {Object.entries(staffPersonalities).map(([key, personality]) => (
            <button
              key={key}
              onClick={() => setSelectedPersonality(key as any)}
              className={`p-3 rounded-lg border-2 transition-all ${
                selectedPersonality === key
                  ? 'border-indigo-500 bg-indigo-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-2xl mb-1">{personality.avatar}</div>
              <div className="text-sm font-medium text-gray-900">{personality.name}</div>
              <div className="text-xs text-gray-600">{personality.specialty.split(',')[0]}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="p-4 border-b border-gray-200">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Quick Administrative Tasks:</h4>
        <div className="grid grid-cols-1 gap-2">
          {quickActions[selectedPersonality].slice(0, 2).map((action, index) => (
            <button
              key={index}
              onClick={() => handleQuickAction(action)}
              className="text-left p-2 bg-indigo-50 hover:bg-indigo-100 rounded-lg text-sm text-indigo-700 border border-indigo-200"
            >
              <Lightbulb className="h-4 w-4 inline mr-2" />
              {action}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages */}
      <div className="h-64 overflow-y-auto p-4 space-y-3">
        {conversation.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-4xl mb-3">{staffPersonalities[selectedPersonality].avatar}</div>
            <p className="text-gray-600">
              Hello! I'm {staffPersonalities[selectedPersonality].name}. 
              Ready to help you with administrative tasks!
            </p>
          </div>
        ) : (
          conversation.map((msg, index) => (
            <div key={index} className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs px-3 py-2 rounded-lg ${
                msg.isUser
                  ? 'bg-indigo-500 text-white'
                  : 'bg-gray-200 text-gray-900'
              }`}>
                <p className="text-sm">{msg.content}</p>
                {!msg.isUser && (
                  <button
                    onClick={() => speakMessage(msg.content)}
                    className="mt-1 p-1 bg-indigo-100 rounded-full hover:bg-indigo-200"
                  >
                    <Volume2 className="h-3 w-3 text-indigo-600" />
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ask your administrative assistant..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            onClick={startVoiceRecognition}
            disabled={isListening}
            className={`p-2 rounded-lg ${
              isListening 
                ? 'bg-red-100 text-red-600 animate-pulse' 
                : 'bg-indigo-100 text-indigo-600 hover:bg-indigo-200'
            }`}
          >
            <Mic className="h-5 w-5" />
          </button>
          <button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isLoading}
            className="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>

        {/* Generate Task Button */}
        <button
          onClick={() => {
            const task = generateStaffTask(staffMode);
            sendMessage(`Help me with this task: ${task}`);
          }}
          className="w-full mt-3 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:from-indigo-600 hover:to-purple-700 font-medium flex items-center justify-center"
        >
          <Zap className="h-4 w-4 mr-2" />
          Generate Smart Task
        </button>
      </div>
    </div>
  );
};

export default StaffAIAssistant;