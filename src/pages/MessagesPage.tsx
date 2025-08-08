import React, { useState } from 'react';
import { MessageSquare, Send, Search, Phone, Video, MoreVertical, Paperclip, Smile } from 'lucide-react';

interface Message {
  id: string;
  from: string;
  content: string;
  timestamp: string;
  isFromMe: boolean;
}

interface Conversation {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  isOnline: boolean;
  role: string;
}

const MessagesPage = () => {
  const [selectedConversation, setSelectedConversation] = useState<string | null>('1');
  const [messageText, setMessageText] = useState('');

  const conversations: Conversation[] = [
    {
      id: '1',
      name: 'Ms. Ledia Balliu',
      avatar: '/ceo.jpg',
      lastMessage: 'Great progress on your IELTS speaking!',
      lastMessageTime: '2024-01-23T14:30:00Z',
      unreadCount: 2,
      isOnline: true,
      role: 'IELTS Instructor'
    },
    {
      id: '2',
      name: 'Mr. Mo Tran',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
      lastMessage: 'Your business presentation was excellent',
      lastMessageTime: '2024-01-23T11:15:00Z',
      unreadCount: 0,
      isOnline: false,
      role: 'Business English Expert'
    },
    {
      id: '3',
      name: 'Admin Support',
      avatar: 'https://images.pexels.com/photos/5212324/pexels-photo-5212324.jpeg?auto=compress&cs=tinysrgb&w=150',
      lastMessage: 'How can we help you today?',
      lastMessageTime: '2024-01-22T16:45:00Z',
      unreadCount: 0,
      isOnline: true,
      role: 'Support Team'
    },
    {
      id: '4',
      name: 'Study Group - IELTS Advanced',
      avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150',
      lastMessage: 'Anyone want to practice speaking together?',
      lastMessageTime: '2024-01-22T09:30:00Z',
      unreadCount: 5,
      isOnline: true,
      role: 'Group Chat'
    }
  ];

  const messages: Record<string, Message[]> = {
    '1': [
      {
        id: '1',
        from: 'Ms. Ledia Balliu',
        content: 'Hello! I reviewed your latest speaking assignment. You\'ve shown great improvement in pronunciation and fluency.',
        timestamp: '2024-01-23T14:00:00Z',
        isFromMe: false
      },
      {
        id: '2',
        from: 'You',
        content: 'Thank you so much! I\'ve been practicing every day. What should I focus on next?',
        timestamp: '2024-01-23T14:15:00Z',
        isFromMe: true
      },
      {
        id: '3',
        from: 'Ms. Ledia Balliu',
        content: 'Great progress on your IELTS speaking! I recommend focusing on Part 3 discussions and using more advanced vocabulary.',
        timestamp: '2024-01-23T14:30:00Z',
        isFromMe: false
      },
      {
        id: '4',
        from: 'Ms. Ledia Balliu',
        content: 'Also, don\'t forget about our live practice session tomorrow at 2 PM.',
        timestamp: '2024-01-23T14:31:00Z',
        isFromMe: false
      }
    ],
    '2': [
      {
        id: '1',
        from: 'Mr. Mo Tran',
        content: 'Your business presentation was excellent! You demonstrated strong communication skills and professional confidence.',
        timestamp: '2024-01-23T11:15:00Z',
        isFromMe: false
      }
    ],
    '3': [
      {
        id: '1',
        from: 'Admin Support',
        content: 'Welcome to LERA Academy! How can we help you today?',
        timestamp: '2024-01-22T16:45:00Z',
        isFromMe: false
      }
    ],
    '4': [
      {
        id: '1',
        from: 'Nguyen Minh Duc',
        content: 'Anyone want to practice speaking together?',
        timestamp: '2024-01-22T09:30:00Z',
        isFromMe: false
      },
      {
        id: '2',
        from: 'Tran Thi Mai',
        content: 'I\'m interested! What time works for everyone?',
        timestamp: '2024-01-22T09:45:00Z',
        isFromMe: false
      },
      {
        id: '3',
        from: 'You',
        content: 'Count me in! How about this evening around 7 PM?',
        timestamp: '2024-01-22T10:00:00Z',
        isFromMe: true
      }
    ]
  };

  const selectedMessages = selectedConversation ? messages[selectedConversation] || [] : [];
  const selectedConv = conversations.find(c => c.id === selectedConversation);

  const handleSendMessage = () => {
    if (messageText.trim() && selectedConversation) {
      const newMessage: Message = {
        id: Date.now().toString(),
        from: 'You',
        content: messageText.trim(),
        timestamp: new Date().toISOString(),
        isFromMe: true
      };
      
      // In a real app, this would send to the server
      setMessageText('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg border overflow-hidden" style={{ height: '80vh' }}>
          <div className="flex h-full">
            {/* Conversations List */}
            <div className="w-1/3 border-r border-gray-200 flex flex-col">
              {/* Header */}
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900 mb-3">Messages</h2>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search conversations..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Conversations */}
              <div className="flex-1 overflow-y-auto">
                {conversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    onClick={() => setSelectedConversation(conversation.id)}
                    className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
                      selectedConversation === conversation.id ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                    }`}
                  >
                    <div className="flex items-center">
                      <div className="relative">
                        <img
                          src={conversation.avatar}
                          alt={conversation.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        {conversation.isOnline && (
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                        )}
                      </div>
                      <div className="ml-3 flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-medium text-gray-900">{conversation.name}</h4>
                          <span className="text-xs text-gray-500">
                            {new Date(conversation.lastMessageTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                        <p className="text-xs text-gray-600 mb-1">{conversation.role}</p>
                        <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                      </div>
                      {conversation.unreadCount > 0 && (
                        <div className="bg-blue-500 text-white text-xs rounded-full px-2 py-1 ml-2">
                          {conversation.unreadCount}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col">
              {selectedConv ? (
                <>
                  {/* Chat Header */}
                  <div className="p-4 border-b border-gray-200 bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="relative">
                          <img
                            src={selectedConv.avatar}
                            alt={selectedConv.name}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          {selectedConv.isOnline && (
                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                          )}
                        </div>
                        <div className="ml-3">
                          <h3 className="text-lg font-medium text-gray-900">{selectedConv.name}</h3>
                          <p className="text-sm text-gray-600">{selectedConv.role}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <button className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100">
                          <Phone className="h-5 w-5" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100">
                          <Video className="h-5 w-5" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100">
                          <MoreVertical className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {selectedMessages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.isFromMe ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                            message.isFromMe
                              ? 'bg-blue-500 text-white'
                              : 'bg-gray-200 text-gray-900'
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                          <p className={`text-xs mt-1 ${
                            message.isFromMe ? 'text-blue-100' : 'text-gray-500'
                          }`}>
                            {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Message Input */}
                  <div className="p-4 border-t border-gray-200">
                    <div className="flex items-center space-x-3">
                      <button className="p-2 text-gray-400 hover:text-gray-600">
                        <Paperclip className="h-5 w-5" />
                      </button>
                      <div className="flex-1 relative">
                        <input
                          type="text"
                          value={messageText}
                          onChange={(e) => setMessageText(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                          placeholder="Type a message..."
                          className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <button className="p-2 text-gray-400 hover:text-gray-600">
                        <Smile className="h-5 w-5" />
                      </button>
                      <button
                        onClick={handleSendMessage}
                        disabled={!messageText.trim()}
                        className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Send className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <MessageSquare className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Select a conversation</h3>
                    <p className="text-gray-600">Choose a conversation from the left to start messaging</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;