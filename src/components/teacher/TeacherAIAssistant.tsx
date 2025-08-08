import React, { useState } from 'react';
import { useAIAssistant } from '../../hooks/useAIAssistant';
import { 
  Bot, 
  Mic, 
  Send, 
  BookOpen, 
  ClipboardCheck, 
  Users, 
  BarChart3,
  Lightbulb,
  Zap,
  Star,
  Heart,
  Target,
  Award,
  Volume2
} from 'lucide-react';

const TeacherAIAssistant = () => {
  const { 
    teacherPersonalities,
    conversation,
    isLoading,
    isListening,
    teacherMode,
    setTeacherMode,
    sendMessage,
    startVoiceRecognition,
    speakMessage,
    generateTeacherTask,
    clearConversation
  } = useAIAssistant();
  
  const [inputMessage, setInputMessage] = useState('');
  const [selectedPersonality, setSelectedPersonality] = useState<'classroom' | 'grader' | 'mentor'>('classroom');

  const quickActions = {
    classroom: [
      'Create a fun icebreaker activity for new students',
      'Design group work for IELTS speaking practice',
      'Plan interactive grammar lesson with games',
      'Generate classroom management strategies'
    ],
    grader: [
      'Create rubric for essay assessment',
      'Generate feedback for speaking performance',
      'Design quiz questions for grammar review',
      'Suggest improvement areas for student writing'
    ],
    mentor: [
      'Help student set realistic learning goals',
      'Provide motivation for struggling learner',
      'Create confidence-building activities',
      'Design study plan for IELTS preparation'
    ]
  };

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      sendMessage(`[Teacher Mode: ${teacherMode}] ${inputMessage}`);
      setInputMessage('');
    }
  };

  const handleQuickAction = (action: string) => {
    sendMessage(`[Teacher Assistant] ${action}`);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border h-full">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white p-6 rounded-t-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="p-3 bg-white/20 rounded-xl mr-4">
              <Bot className="h-8 w-8" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Teaching AI Assistant</h2>
              <p className="text-emerald-100">Your intelligent classroom companion</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Star className="h-5 w-5 text-yellow-300 animate-pulse" />
            <Heart className="h-5 w-5 text-pink-300 animate-bounce" />
          </div>
        </div>
      </div>

      {/* Mode Selector */}
      <div className="p-4 border-b border-gray-200">
        <div className="grid grid-cols-4 gap-2">
          {[
            { mode: 'planning', label: 'Planning', icon: BookOpen },
            { mode: 'grading', label: 'Grading', icon: ClipboardCheck },
            { mode: 'assessment', label: 'Assessment', icon: BarChart3 },
            { mode: 'general', label: 'General', icon: Users }
          ].map(({ mode, label, icon: Icon }) => (
            <button
              key={mode}
              onClick={() => setTeacherMode(mode as any)}
              className={`p-3 rounded-lg text-center transition-all ${
                teacherMode === mode
                  ? 'bg-emerald-100 text-emerald-700 border-2 border-emerald-300'
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
          {Object.entries(teacherPersonalities).map(([key, personality]) => (
            <button
              key={key}
              onClick={() => setSelectedPersonality(key as any)}
              className={`p-3 rounded-lg border-2 transition-all ${
                selectedPersonality === key
                  ? 'border-emerald-500 bg-emerald-50'
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
        <h4 className="text-sm font-medium text-gray-700 mb-3">Quick Teaching Tasks:</h4>
        <div className="grid grid-cols-1 gap-2">
          {quickActions[selectedPersonality].slice(0, 2).map((action, index) => (
            <button
              key={index}
              onClick={() => handleQuickAction(action)}
              className="text-left p-2 bg-emerald-50 hover:bg-emerald-100 rounded-lg text-sm text-emerald-700 border border-emerald-200"
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
            <div className="text-4xl mb-3">{teacherPersonalities[selectedPersonality].avatar}</div>
            <p className="text-gray-600">
              Hello! I'm {teacherPersonalities[selectedPersonality].name}. 
              How can I assist you with your teaching today?
            </p>
          </div>
        ) : (
          conversation.map((msg, index) => (
            <div key={index} className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs px-3 py-2 rounded-lg ${
                msg.isUser
                  ? 'bg-emerald-500 text-white'
                  : 'bg-gray-200 text-gray-900'
              }`}>
                <p className="text-sm">{msg.content}</p>
                {!msg.isUser && (
                  <button
                    onClick={() => speakMessage(msg.content)}
                    className="mt-1 p-1 bg-emerald-100 rounded-full hover:bg-emerald-200"
                  >
                    <Volume2 className="h-3 w-3 text-emerald-600" />
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
            placeholder="Ask your teaching assistant..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <button
            onClick={startVoiceRecognition}
            disabled={isListening}
            className={`p-2 rounded-lg ${
              isListening 
                ? 'bg-red-100 text-red-600 animate-pulse' 
                : 'bg-emerald-100 text-emerald-600 hover:bg-emerald-200'
            }`}
          >
            <Mic className="h-5 w-5" />
          </button>
          <button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isLoading}
            className="p-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeacherAIAssistant;