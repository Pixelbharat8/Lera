import React, { useState } from 'react';
import { 
  Bot, 
  Mic, 
  Send, 
  Sparkles, 
  Heart,
  Star,
  Zap,
  Wand2,
  Gift,
  Music,
  Gamepad2,
  BookOpen,
  Users,
  ClipboardCheck,
  BarChart3,
  Settings,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  MicOff
} from 'lucide-react';

const AdminAI = () => {
  const [activeTab, setActiveTab] = useState<'chat' | 'playground' | 'teacher' | 'staff'>('chat');
  const [inputMessage, setInputMessage] = useState('');
  const [isKidsMode, setIsKidsMode] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<any>(null);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [conversation, setConversation] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [currentPersonality, setCurrentPersonality] = useState('kiddy');
  const [kidsMood, setKidsMood] = useState<'happy' | 'excited' | 'thinking' | 'sleepy'>('happy');
  const [teacherMode, setTeacherMode] = useState<'planning' | 'grading' | 'assessment' | 'general'>('general');
  const [staffMode, setStaffMode] = useState<'tasks' | 'scheduling' | 'communication' | 'reports'>('tasks');

  const personalities = {
    kiddy: {
      name: 'Kiddy Bear 🧸',
      avatar: '🧸',
      description: 'Your magical learning friend!',
      ageGroup: '3-12 years'
    },
    stella: {
      name: 'Stella Star ⭐',
      avatar: '🌟',
      description: 'Your smart study companion!',
      ageGroup: '13-18 years'
    },
    professor: {
      name: 'Professor Alex 🎓',
      avatar: '👨‍🎓',
      description: 'Your professional mentor',
      ageGroup: '18+ years'
    }
  };

  const teacherPersonalities = {
    classroom: {
      name: 'Ms. TeachBot 👩‍🏫',
      avatar: '🍎',
      description: 'Classroom management assistant',
      specialty: 'lesson planning, student engagement'
    },
    grader: {
      name: 'Professor GradeWise 📝',
      avatar: '📊',
      description: 'Grading and assessment helper',
      specialty: 'assessment creation, feedback'
    },
    mentor: {
      name: 'Coach Inspire 🌟',
      avatar: '💪',
      description: 'Student mentoring specialist',
      specialty: 'student counseling, motivation'
    }
  };

  const staffPersonalities = {
    organizer: {
      name: 'Admin Alice 📋',
      avatar: '🗂️',
      description: 'Administrative task manager',
      specialty: 'task management, scheduling'
    },
    communicator: {
      name: 'Connect Carl 📞',
      avatar: '💬',
      description: 'Communication specialist',
      specialty: 'parent communication, outreach'
    },
    analyst: {
      name: 'Data Diana 📈',
      avatar: '📊',
      description: 'Data analysis expert',
      specialty: 'analytics, reporting'
    }
  };

  const sendMessage = (message: string) => {
    const userMessage = { content: message, isUser: true, timestamp: new Date().toISOString() };
    setConversation(prev => [...prev, userMessage]);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "That's a great question! Let me help you with that.",
        "I understand what you're looking for. Here's what I suggest...",
        "Excellent! Let's work on this together.",
        "That's a wonderful idea! Here's how we can approach it..."
      ];
      const aiResponse = responses[Math.floor(Math.random() * responses.length)];
      const assistantMessage = { content: aiResponse, isUser: false, timestamp: new Date().toISOString() };
      setConversation(prev => [...prev, assistantMessage]);
    }, 1000);
  };

  const startVoiceRecognition = () => {
    setIsListening(true);
    setTimeout(() => setIsListening(false), 3000);
  };

  const speakMessage = (text: string) => {
    if ('speechSynthesis' in window && soundEnabled) {
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
    }
  };

  const clearConversation = () => {
    setConversation([]);
  };

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      sendMessage(inputMessage);
      setInputMessage('');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold gradient-text">AI Assistant & Automation</h1>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`p-2 rounded-lg ${soundEnabled ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'}`}
          >
            {soundEnabled ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
          </button>
          <button
            onClick={() => setIsKidsMode(!isKidsMode)}
            className={`px-4 py-2 rounded-lg font-medium ${
              isKidsMode 
                ? 'bg-pink-100 text-pink-700 border-2 border-pink-300' 
                : 'bg-blue-100 text-blue-700 border-2 border-blue-300'
            }`}
          >
            {isKidsMode ? '🧸 Kids Mode' : '🎓 Adult Mode'}
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { key: 'chat', label: 'AI Chat', icon: Bot },
            { key: 'playground', label: 'Kids Playground', icon: Gamepad2 },
            { key: 'teacher', label: 'Teacher AI', icon: Users },
            { key: 'staff', label: 'Staff AI', icon: ClipboardCheck }
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

      {/* Content based on active tab */}
      <div className="bg-white rounded-xl shadow-lg border overflow-hidden">
        {activeTab === 'chat' && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 p-6">
            {/* Personality Selector */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-xl p-6 sticky top-4">
                <h3 className="text-lg font-semibold mb-4">Choose Your AI Assistant</h3>
                <div className="space-y-3">
                  {Object.entries(personalities).map(([key, personality]) => (
                    <button
                      key={key}
                      onClick={() => setCurrentPersonality(key)}
                      className={`w-full p-4 rounded-lg border-2 transition-all hover:scale-105 ${
                        currentPersonality === key
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="text-2xl mb-2">{personality.avatar}</div>
                      <div className="font-medium text-gray-900">{personality.name}</div>
                      <div className="text-sm text-gray-600">{personality.description}</div>
                      <div className="text-xs text-gray-500 mt-1">{personality.ageGroup}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Chat Interface */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-xl border overflow-hidden">
                {/* Chat Header */}
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="text-3xl mr-3">{personalities[currentPersonality as keyof typeof personalities].avatar}</div>
                      <div>
                        <h3 className="text-lg font-bold">
                          {personalities[currentPersonality as keyof typeof personalities].name}
                        </h3>
                        <p className="text-blue-100">
                          {personalities[currentPersonality as keyof typeof personalities].description}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={clearConversation}
                      className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-all"
                    >
                      <RotateCcw className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Chat Messages */}
                <div className="h-96 overflow-y-auto p-4 space-y-4 bg-gradient-to-br from-blue-50/30 to-purple-50/30">
                  {conversation.length === 0 ? (
                    <div className="text-center py-8">
                      <div className="text-6xl mb-4">{personalities[currentPersonality as keyof typeof personalities].avatar}</div>
                      <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl border border-white/50">
                        <p className="text-gray-700 text-lg font-medium">
                          Hello! I'm {personalities[currentPersonality as keyof typeof personalities].name}. 
                        </p>
                        <p className="text-gray-600 mt-2">
                          I'm here to help you learn and have fun! Ask me anything or try these:
                        </p>
                        <div className="mt-4 space-y-2">
                          <button
                            onClick={() => handleSendMessage("Tell me a fun learning activity")}
                            className="block w-full bg-blue-100 hover:bg-blue-200 text-blue-800 px-4 py-2 rounded-lg transition-all"
                          >
                            🎮 Suggest a learning game
                          </button>
                          <button
                            onClick={() => handleSendMessage("Help me practice English")}
                            className="block w-full bg-green-100 hover:bg-green-200 text-green-800 px-4 py-2 rounded-lg transition-all"
                          >
                            📚 Practice English with me
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    conversation.map((msg, index) => (
                      <div key={index} className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl shadow-lg ${
                          msg.isUser
                            ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
                            : 'bg-white text-gray-900 border border-gray-200'
                        }`}>
                          <p className="text-sm">{msg.content}</p>
                          {!msg.isUser && (
                            <button
                              onClick={() => speakMessage(msg.content)}
                              className="mt-2 p-1 bg-blue-100 rounded-full hover:bg-blue-200 transition-all"
                            >
                              <Volume2 className="h-3 w-3 text-blue-600" />
                            </button>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Chat Input */}
                <div className="p-4 border-t border-gray-200 bg-gradient-to-r from-gray-50 to-blue-50">
                  <div className="flex items-center space-x-3">
                    <input
                      type="text"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Type your message here..."
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    />
                    <button
                      onClick={startVoiceRecognition}
                      disabled={isListening}
                      className={`p-3 rounded-2xl transition-all hover:scale-110 ${
                        isListening 
                          ? 'bg-red-100 text-red-600 animate-pulse' 
                          : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                      }`}
                    >
                      {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                    </button>
                    <button
                      onClick={handleSendMessage}
                      disabled={!inputMessage.trim() || isLoading}
                      className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 transition-all hover:scale-110"
                    >
                      <Send className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Kids Playground Tab */}
        {activeTab === 'playground' && (
          <div className="p-6">
            <div className="bg-gradient-to-br from-pink-400 via-purple-500 to-blue-500 text-white p-8 rounded-2xl">
              <div className="text-center mb-8">
                <div className="text-8xl mb-4">🎮</div>
                <h2 className="text-3xl font-bold mb-4">Kids Learning Playground!</h2>
                <p className="text-white/90 text-lg">Where every lesson is a magical adventure!</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    title: '🌈 Rainbow Words',
                    description: 'Paint words with colors!',
                    color: 'from-pink-400 to-purple-500',
                    points: 50
                  },
                  {
                    title: '🦁 Animal Friends',
                    description: 'Meet talking animals!',
                    color: 'from-green-400 to-blue-500',
                    points: 60
                  },
                  {
                    title: '🏰 Number Castle',
                    description: 'Build with numbers!',
                    color: 'from-yellow-400 to-orange-500',
                    points: 45
                  },
                  {
                    title: '📚 Story Magic',
                    description: 'Create magical stories!',
                    color: 'from-purple-400 to-pink-500',
                    points: 80
                  },
                  {
                    title: '🎵 Sound Symphony',
                    description: 'Make music with sounds!',
                    color: 'from-teal-400 to-cyan-500',
                    points: 55
                  },
                  {
                    title: '🗺️ Word Treasure',
                    description: 'Find hidden treasures!',
                    color: 'from-red-400 to-pink-500',
                    points: 70
                  }
                ].map((game, index) => (
                  <div key={index} className="bg-white/20 backdrop-blur-sm rounded-xl p-6 hover:bg-white/30 transition-all duration-300 hover:scale-105 border border-white/30">
                    <div className="text-center">
                      <h3 className="text-lg font-bold mb-2">{game.title}</h3>
                      <p className="text-white/80 text-sm mb-4">{game.description}</p>
                      <div className="bg-yellow-300 text-yellow-800 px-3 py-1 rounded-full text-sm font-bold mb-4">
                        ⭐ +{game.points} points
                      </div>
                      <button className={`w-full bg-gradient-to-r ${game.color} text-white py-3 rounded-xl font-bold hover:shadow-lg transition-all hover:scale-105`}>
                        <Play className="h-5 w-5 inline mr-2" />
                        Let's Play!
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Teacher AI Tab */}
        {activeTab === 'teacher' && (
          <div className="p-6">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white p-8 rounded-2xl">
              <div className="text-center mb-8">
                <div className="text-6xl mb-4">👩‍🏫</div>
                <h2 className="text-3xl font-bold mb-4">Teaching AI Assistant</h2>
                <p className="text-emerald-100 text-lg">Your intelligent classroom companion</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    title: '📋 Lesson Planning',
                    description: 'Create engaging lesson plans',
                    icon: '📝',
                    tasks: ['Create interactive activities', 'Plan assessment criteria', 'Design group work']
                  },
                  {
                    title: '✅ Grading Assistant',
                    description: 'Intelligent grading support',
                    icon: '📊',
                    tasks: ['Generate rubrics', 'Provide feedback', 'Track progress']
                  },
                  {
                    title: '🌟 Student Mentoring',
                    description: 'Support student development',
                    icon: '💪',
                    tasks: ['Motivation strategies', 'Goal setting', 'Progress tracking']
                  },
                  {
                    title: '📈 Analytics Helper',
                    description: 'Analyze teaching effectiveness',
                    icon: '📊',
                    tasks: ['Performance insights', 'Improvement suggestions', 'Success metrics']
                  }
                ].map((tool, index) => (
                  <div key={index} className="bg-white/20 backdrop-blur-sm rounded-xl p-6 hover:bg-white/30 transition-all duration-300 hover:scale-105 border border-white/30">
                    <div className="text-4xl mb-3">{tool.icon}</div>
                    <h3 className="text-xl font-bold mb-2">{tool.title}</h3>
                    <p className="text-emerald-100 text-sm mb-4">{tool.description}</p>
                    <div className="space-y-2">
                      {tool.tasks.map((task, taskIndex) => (
                        <div key={taskIndex} className="text-xs bg-emerald-600/30 px-2 py-1 rounded-full">
                          • {task}
                        </div>
                      ))}
                    </div>
                    <button className="w-full mt-4 bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700 transition-all hover:scale-105">
                      Get Started
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Staff AI Tab */}
        {activeTab === 'staff' && (
          <div className="p-6">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-8 rounded-2xl">
              <div className="text-center mb-8">
                <div className="text-6xl mb-4">👥</div>
                <h2 className="text-3xl font-bold mb-4">Staff AI Assistant</h2>
                <p className="text-indigo-100 text-lg">Your intelligent administrative companion</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(staffPersonalities).map(([key, personality]) => (
                  <div key={key} className="bg-white/20 backdrop-blur-sm rounded-xl p-6 hover:bg-white/30 transition-all duration-300 hover:scale-105 border border-white/30">
                    <div className="text-4xl mb-3">{personality.avatar}</div>
                    <h3 className="text-xl font-bold mb-2">{personality.name}</h3>
                    <p className="text-indigo-100 text-sm mb-4">{personality.description}</p>
                    <p className="text-xs text-indigo-200 mb-4">{personality.specialty}</p>
                    <button className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-all hover:scale-105 font-bold">
                      Chat with {personality.name.split(' ')[0]}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminAI;