import React, { useState, useEffect } from 'react';
import InteractiveGame from '../games/InteractiveGame';
import { 
  Star, 
  Heart, 
  Sparkles, 
  Music, 
  Gamepad2, 
  Gift,
  Volume2,
  Mic,
  Play,
  Pause,
  RotateCcw,
  Trophy,
  Crown,
  Rainbow,
  Sun,
  Moon
} from 'lucide-react';

const KidsAIPlayground = () => {
  const [kidsMood, setKidsMood] = useState<'happy' | 'excited' | 'thinking' | 'sleepy'>('happy');
  const [currentActivity, setCurrentActivity] = useState<string | null>(null);
  const [kidsPoints, setKidsPoints] = useState(150);
  const [showCelebration, setShowCelebration] = useState(false);
  const [conversation, setConversation] = useState<any[]>([]);
  const [isListening, setIsListening] = useState(false);

  const magicalActivities = [
    {
      id: 'rainbow_words',
      title: '🌈 Rainbow Word Magic!',
      description: 'Paint words with rainbow colors!',
      emoji: '🌈🎨✨',
      points: 50,
      color: 'from-pink-400 to-purple-500'
    },
    {
      id: 'animal_friends',
      title: '🦁 Animal Friend Adventure!',
      description: 'Meet magical talking animals!',
      emoji: '🦁🐸🦋🐾',
      points: 60,
      color: 'from-green-400 to-blue-500'
    },
    {
      id: 'number_castle',
      title: '🏰 Number Castle Quest!',
      description: 'Build a castle with numbers!',
      emoji: '🏰1️⃣2️⃣3️⃣',
      points: 45,
      color: 'from-yellow-400 to-orange-500'
    },
    {
      id: 'story_magic',
      title: '📚 Magic Story Creator!',
      description: 'Create stories with flying words!',
      emoji: '📚✨🧚‍♀️🌟',
      points: 80,
      color: 'from-purple-400 to-pink-500'
    },
    {
      id: 'sound_symphony',
      title: '🎵 Sound Symphony!',
      description: 'Make music with letter sounds!',
      emoji: '🎵🎶🎼🎺',
      points: 55,
      color: 'from-teal-400 to-cyan-500'
    },
    {
      id: 'treasure_hunt',
      title: '🗺️ Word Treasure Hunt!',
      description: 'Find hidden word treasures!',
      emoji: '🗺️💎🏴‍☠️⭐',
      points: 70,
      color: 'from-red-400 to-pink-500'
    }
  ];

  const kidsGames = [
    {
      id: 'color_match',
      title: '🌈 Color Matching Magic!',
      description: 'Match colors with their names!',
      type: 'vocabulary',
      level: 'beginner',
      points: 50
    },
    {
      id: 'animal_sounds',
      title: '🐾 Animal Sound Adventure!',
      description: 'Learn animal names and sounds!',
      type: 'vocabulary', 
      level: 'beginner',
      points: 60
    },
    {
      id: 'number_fun',
      title: '🔢 Number Fun Time!',
      description: 'Count and learn numbers!',
      type: 'vocabulary',
      level: 'beginner', 
      points: 40
    }
  ];

  const moodEmojis = {
    happy: '😊',
    excited: '🤩',
    thinking: '🤔',
    sleepy: '😴'
  };

  const celebrateActivity = (activity: any) => {
    setKidsPoints(prev => prev + activity.points);
    setShowCelebration(true);
    
    // Celebration sound
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(`Amazing job! You earned ${activity.points} magic points! You're so smart and wonderful!`);
      utterance.pitch = 1.2;
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
    
    setTimeout(() => setShowCelebration(false), 3000);
  };

  const startActivity = (activity: any) => {
    setCurrentActivity(activity.id);
    
    const welcomeMessage = { 
      content: `🌟 Welcome to ${activity.title}! ${activity.description} Let's have the most amazing time learning together! Are you ready? 🎉`,
      isUser: false,
      timestamp: new Date().toISOString()
    };
    setConversation(prev => [...prev, welcomeMessage]);
    
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(welcomeMessage.content);
      utterance.pitch = 1.2;
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  const playMoodSound = (mood: typeof kidsMood) => {
    const moodSounds = {
      happy: "I'm so happy to see you! Let's learn and play! 😊",
      excited: "WOW! I'm SO excited! This is going to be AMAZING! 🤩",
      thinking: "Hmm... let me think about something fun for us! 🤔",
      sleepy: "I'm a little sleepy... maybe we can do something gentle? 😴"
    };
    
    setKidsMood(mood);
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(moodSounds[mood]);
      utterance.pitch = 1.2;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 p-6">
      {/* Celebration Animation */}
      {showCelebration && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-8 rounded-3xl shadow-2xl animate-bounce">
            <div className="text-6xl text-center mb-4">🎉🏆🎉</div>
            <div className="text-2xl font-bold text-center">AMAZING JOB!</div>
            <div className="text-lg text-center">You earned magic points!</div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white rounded-3xl p-8 mb-8 shadow-2xl">
        <div className="text-center">
          <div className="text-8xl mb-4">🧸✨🌟</div>
          <h1 className="text-4xl font-bold mb-2">Kids Learning Playground!</h1>
          <p className="text-xl text-white/90">Where every lesson is a magical adventure!</p>
          
          {/* Points Display */}
          <div className="mt-6 bg-white/20 rounded-2xl p-4 backdrop-blur-sm">
            <div className="flex items-center justify-center space-x-4">
              <Trophy className="h-8 w-8 text-yellow-300" />
              <div>
                <div className="text-2xl font-bold">{kidsPoints}</div>
                <div className="text-sm text-white/80">Magic Points</div>
              </div>
              <Star className="h-8 w-8 text-yellow-300 animate-spin" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Activities Panel */}
        <div className="lg:col-span-2">
          {/* Current Game Display */}
          {currentActivity && (
            <div className="mb-6">
              <div className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white rounded-2xl p-6 shadow-2xl">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-2xl font-bold">🎮 Game Time!</h3>
                  <button
                    onClick={() => setCurrentActivity(null)}
                    className="bg-white/20 hover:bg-white/30 p-2 rounded-lg transition-all"
                  >
                    <Pause className="h-5 w-5" />
                  </button>
                </div>
                <InteractiveGame
                  type="vocabulary"
                  level="beginner"
                  onComplete={(score) => {
                    celebrateActivity({ points: score });
                    setCurrentActivity(null);
                  }}
                />
              </div>
            </div>
          )}

          {/* Mood Selector */}
          <div className="bg-white rounded-2xl shadow-xl border-4 border-pink-200 p-6 mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
              🌈 How are you feeling today?
            </h3>
            <div className="grid grid-cols-4 gap-3">
              {Object.entries(moodEmojis).map(([mood, emoji]) => (
                <button
                  key={mood}
                  onClick={() => playMoodSound(mood as any)}
                  className={`p-4 rounded-2xl border-4 transition-all transform hover:scale-110 ${
                    kidsMood === mood
                      ? 'border-pink-500 bg-pink-100 shadow-lg'
                      : 'border-gray-200 hover:border-pink-300 bg-white'
                  }`}
                >
                  <div className="text-4xl mb-2">{emoji}</div>
                  <div className="text-sm font-bold capitalize text-gray-700">{mood}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Activities Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {kidsGames.map((activity) => (
              <div 
                key={activity.id}
                className="bg-white rounded-2xl shadow-xl border-4 border-pink-200 p-6 hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                <div className="text-center mb-4">
                  <div className="text-5xl mb-3">🎮</div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{activity.title}</h3>
                  <p className="text-gray-600 text-sm">{activity.description}</p>
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-bold">
                    ⭐ +{activity.points} points
                  </span>
                </div>
                
                <button
                  onClick={() => startActivity(activity)}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white font-bold py-3 px-4 rounded-2xl hover:shadow-lg transform hover:scale-105 transition-all duration-200 text-lg"
                >
                  <Play className="h-6 w-6 inline mr-2" />
                  Let's Play! 🎉
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Interface */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-xl border-4 border-blue-200 overflow-hidden sticky top-4">
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4">
              <div className="flex items-center">
                <div className="text-3xl mr-3">🧸</div>
                <div>
                  <h3 className="text-lg font-bold">Kiddy Bear</h3>
                  <p className="text-blue-100 text-sm">Your magical learning friend!</p>
                </div>
                <div className="ml-auto">
                  <div className="text-2xl animate-bounce">{moodEmojis[kidsMood]}</div>
                </div>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="h-80 overflow-y-auto p-4 space-y-3 bg-gradient-to-b from-blue-50 to-purple-50">
              {conversation.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-6xl mb-4">🧸</div>
                  <p className="text-purple-700 font-bold text-lg">
                    Hi there, superstar! 🌟<br/>
                    I'm Kiddy Bear and I LOVE to learn and play!<br/>
                    What magical adventure should we go on today? ✨
                  </p>
                </div>
              ) : (
                conversation.map((msg, index) => (
                  <div key={index} className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs px-4 py-3 rounded-2xl shadow-lg ${
                      msg.isUser
                        ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white border-2 border-white/50'
                        : 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-2 border-white/50'
                    }`}>
                      <p className="text-sm font-bold">{msg.content}</p>
                      {!msg.isUser && (
                        <button
                          onClick={() => {}}
                          className="mt-2 p-1 bg-white/20 rounded-full hover:bg-white/30"
                        >
                          <Volume2 className="h-3 w-3" />
                        </button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Voice Input (Kids-friendly) */}
            <div className="p-4 bg-gradient-to-r from-pink-100 to-purple-100 border-t-4 border-pink-300">
              <div className="text-center mb-3">
                <button
                  onClick={() => {
                    setIsListening(true);
                    setTimeout(() => {
                      setIsListening(false);
                      const responses = [
                        "🌟 I heard you! That's so exciting!",
                        "🎉 Wow! You're so smart!",
                        "✨ I love talking with you!",
                        "🦋 That's a wonderful idea!"
                      ];
                      const response = responses[Math.floor(Math.random() * responses.length)];
                      setConversation(prev => [...prev, { content: response, isUser: false, timestamp: new Date().toISOString() }]);
                    }, 2000);
                  }}
                  disabled={isListening}
                  className={`w-20 h-20 rounded-full border-4 transition-all transform ${
                    isListening 
                      ? 'bg-red-500 border-red-300 animate-pulse scale-110' 
                      : 'bg-gradient-to-r from-pink-500 to-purple-600 border-pink-300 hover:scale-110'
                  } text-white shadow-2xl`}
                >
                  <Mic className="h-8 w-8 mx-auto" />
                </button>
                <p className="text-sm font-bold text-purple-700 mt-2">
                  {isListening ? '🎤 I\'m listening! Talk to me!' : '🗣️ Press to talk!'}
                </p>
              </div>

              {/* Quick Response Buttons */}
              <div className="grid grid-cols-2 gap-2">
                {[
                  { text: 'I want to play! 🎮', emoji: '🎮' },
                  { text: 'Tell me a story! 📚', emoji: '📚' },
                  { text: 'Let\'s sing! 🎵', emoji: '🎵' },
                  { text: 'I did great! 🌟', emoji: '🌟' }
                ].map((button, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      const userMessage = { content: button.text, isUser: true, timestamp: new Date().toISOString() };
                      const aiResponse = { content: `🌟 ${button.text} That's wonderful! Let's do it together!`, isUser: false, timestamp: new Date().toISOString() };
                      setConversation(prev => [...prev, userMessage, aiResponse]);
                      
                      if ('speechSynthesis' in window) {
                        const utterance = new SpeechSynthesisUtterance(aiResponse.content);
                        utterance.pitch = 1.2;
                        window.speechSynthesis.speak(utterance);
                      }
                    }}
                    className="p-2 bg-white border-2 border-purple-300 rounded-xl hover:border-purple-500 hover:bg-purple-50 transition-all transform hover:scale-105"
                  >
                    <div className="text-2xl">{button.emoji}</div>
                    <div className="text-xs font-bold text-purple-700">{button.text.split('!')[0]}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Current Activity Display */}
      {currentActivity && (
        <div className="fixed bottom-4 left-4 right-4 bg-white rounded-2xl p-4 shadow-2xl border-4 border-pink-300 z-40">
          <div className="text-center">
            <h3 className="text-lg font-bold text-gray-900 mb-2">🎮 Playing: {currentActivity}</h3>
            <button
              onClick={() => setCurrentActivity(null)}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all"
            >
              Stop Game
            </button>
          </div>
        </div>
      )}

      {/* Floating Elements */}
      <div className="fixed top-20 right-4 space-y-4 z-30">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-xl border-2 border-pink-300">
          <div className="text-center">
            <Crown className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
            <div className="text-lg font-bold text-purple-700">{kidsPoints}</div>
            <div className="text-xs text-purple-600">Magic Points</div>
          </div>
        </div>

        {/* Time of Day Indicator */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-xl border-2 border-blue-300">
          <div className="text-center">
            {new Date().getHours() < 18 ? (
              <Sun className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
            ) : (
              <Moon className="h-8 w-8 text-purple-500 mx-auto mb-2" />
            )}
            <div className="text-xs text-blue-600 font-bold">
              {new Date().getHours() < 12 ? 'Good Morning!' : 
               new Date().getHours() < 18 ? 'Good Afternoon!' : 'Good Evening!'}
            </div>
          </div>
        </div>
      </div>

      {/* Floating Animation Elements */}
      <div className="fixed inset-0 pointer-events-none z-10">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute text-4xl animate-bounce"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          >
            {['⭐', '🌟', '✨', '💫', '🎈', '🎭', '🎪', '🎠'][Math.floor(Math.random() * 8)]}
          </div>
        ))}
      </div>
    </div>
  );
};

export default KidsAIPlayground;