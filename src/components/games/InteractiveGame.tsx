import React, { useState, useEffect, useCallback } from 'react';
import { Trophy, Target, Zap, Star, Heart, Gift, RotateCcw, ArrowRight } from 'lucide-react';

interface GameProps {
  type: 'vocabulary' | 'grammar' | 'pronunciation' | 'listening';
  level: 'beginner' | 'intermediate' | 'advanced';
  onComplete?: (score: number) => void;
}

const InteractiveGame: React.FC<GameProps> = ({ type, level, onComplete }) => {
  const [currentGame, setCurrentGame] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isGameActive, setIsGameActive] = useState(false);
  const [gameData, setGameData] = useState<any>(null);

  // Game data based on type and level
  const gameContent = {
    vocabulary: {
      beginner: {
        title: "🌟 Word Matching Adventure!",
        description: "Match words with their pictures!",
        games: [
          {
            question: "Which picture shows an APPLE?",
            options: ["🍎", "🍊", "🍌", "🍇"],
            correct: 0,
            points: 10
          },
          {
            question: "What do you call this animal? 🐱",
            options: ["Dog", "Cat", "Bird", "Fish"],
            correct: 1,
            points: 10
          },
          {
            question: "Choose the correct color: 🔴",
            options: ["Blue", "Green", "Red", "Yellow"],
            correct: 2,
            points: 10
          }
        ]
      },
      intermediate: {
        title: "🎯 Advanced Vocabulary Challenge!",
        description: "Complete the sentences with correct words",
        games: [
          {
            question: "The weather is _____ today, so I need an umbrella.",
            options: ["sunny", "rainy", "cloudy", "windy"],
            correct: 1,
            points: 15
          },
          {
            question: "She is very _____ and always helps others.",
            options: ["selfish", "kind", "angry", "lazy"],
            correct: 1,
            points: 15
          }
        ]
      }
    },
    grammar: {
      beginner: {
        title: "📚 Grammar Detective Game!",
        description: "Find the correct grammar!",
        games: [
          {
            question: "Which sentence is correct?",
            options: [
              "I am going to school",
              "I going to school", 
              "I are going to school",
              "I go to school yesterday"
            ],
            correct: 0,
            points: 15
          },
          {
            question: "Choose the correct form: She _____ a teacher.",
            options: ["am", "is", "are", "be"],
            correct: 1,
            points: 15
          }
        ]
      }
    },
    pronunciation: {
      beginner: {
        title: "🎵 Pronunciation Practice!",
        description: "Listen and repeat the sounds!",
        games: [
          {
            question: "Click on the word that sounds like 'CAT':",
            options: ["🐱 cat", "🎩 hat", "🦇 bat", "🐀 rat"],
            correct: 0,
            points: 20,
            audio: true
          }
        ]
      }
    }
  };

  const startGame = (gameType: string) => {
    setCurrentGame(gameType);
    setIsGameActive(true);
    setScore(0);
    setLives(3);
    setTimeLeft(60);
    
    const content = gameContent[type as keyof typeof gameContent]?.[level];
    setGameData(content);
  };

  const handleAnswer = (selectedIndex: number, correctIndex: number, points: number) => {
    if (selectedIndex === correctIndex) {
      setScore(prev => prev + points);
      // Correct answer celebration
      showCelebration("🎉 Correct! Great job!");
    } else {
      setLives(prev => prev - 1);
      showCelebration("💔 Try again! You can do it!");
    }
  };

  const showCelebration = (message: string) => {
    // You could integrate with toast system here
    console.log(message);
  };

  const resetGame = () => {
    setCurrentGame(null);
    setIsGameActive(false);
    setScore(0);
    setLives(3);
    setTimeLeft(60);
  };

  const completeGame = useCallback(() => {
    setIsGameActive(false);
    onComplete?.(score);
    showCelebration(`🏆 Game Complete! Final Score: ${score} points!`);
  }, [onComplete, score]);

  useEffect(() => {
    if (isGameActive && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && isGameActive) {
      completeGame();
    }
  }, [timeLeft, isGameActive, completeGame]);

  if (!currentGame) {
    return (
      <div className="bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 text-white p-8 rounded-2xl shadow-2xl">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🎮</div>
          <h2 className="text-3xl font-bold mb-4">Interactive Learning Games!</h2>
          <p className="text-white/90">Choose a game to start your fun learning adventure!</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <button
            onClick={() => startGame('vocabulary')}
            className="bg-white/20 backdrop-blur-sm p-6 rounded-xl hover:bg-white/30 transition-all duration-300 hover:scale-105 border border-white/30"
          >
            <div className="text-4xl mb-3">📝</div>
            <h3 className="text-xl font-bold mb-2">Vocabulary Quest</h3>
            <p className="text-white/80 text-sm">Learn new words through exciting challenges!</p>
            <div className="mt-4 flex justify-between text-sm">
              <span>⭐ +50 points</span>
              <span>⏱️ 5 minutes</span>
            </div>
          </button>

          <button
            onClick={() => startGame('grammar')}
            className="bg-white/20 backdrop-blur-sm p-6 rounded-xl hover:bg-white/30 transition-all duration-300 hover:scale-105 border border-white/30"
          >
            <div className="text-4xl mb-3">🎯</div>
            <h3 className="text-xl font-bold mb-2">Grammar Detective</h3>
            <p className="text-white/80 text-sm">Solve grammar mysteries and become an expert!</p>
            <div className="mt-4 flex justify-between text-sm">
              <span>⭐ +75 points</span>
              <span>⏱️ 10 minutes</span>
            </div>
          </button>

          <button
            onClick={() => startGame('pronunciation')}
            className="bg-white/20 backdrop-blur-sm p-6 rounded-xl hover:bg-white/30 transition-all duration-300 hover:scale-105 border border-white/30"
          >
            <div className="text-4xl mb-3">🎵</div>
            <h3 className="text-xl font-bold mb-2">Sound Master</h3>
            <p className="text-white/80 text-sm">Perfect your pronunciation with fun activities!</p>
            <div className="mt-4 flex justify-between text-sm">
              <span>⭐ +100 points</span>
              <span>⏱️ 8 minutes</span>
            </div>
          </button>

          <button
            onClick={() => startGame('listening')}
            className="bg-white/20 backdrop-blur-sm p-6 rounded-xl hover:bg-white/30 transition-all duration-300 hover:scale-105 border border-white/30"
          >
            <div className="text-4xl mb-3">👂</div>
            <h3 className="text-xl font-bold mb-2">Listening Hero</h3>
            <p className="text-white/80 text-sm">Train your ears with audio adventures!</p>
            <div className="mt-4 flex justify-between text-sm">
              <span>⭐ +80 points</span>
              <span>⏱️ 12 minutes</span>
            </div>
          </button>
        </div>
      </div>
    );
  }

  if (!gameData) {
    return (
      <div className="text-center p-8">
        <div className="text-4xl mb-4">🚧</div>
        <h3 className="text-xl font-bold mb-2">Game Coming Soon!</h3>
        <p className="text-gray-600 mb-4">This game is being prepared for you!</p>
        <button
          onClick={resetGame}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Choose Another Game
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 text-white p-8 rounded-2xl shadow-2xl">
      {/* Game Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">{gameData.title}</h2>
          <p className="text-white/80">{gameData.description}</p>
        </div>
        <button
          onClick={resetGame}
          className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-all"
        >
          <RotateCcw className="h-5 w-5" />
        </button>
      </div>

      {/* Game Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white/20 p-4 rounded-lg text-center">
          <Trophy className="h-6 w-6 mx-auto mb-2 text-yellow-300" />
          <div className="font-bold">{score}</div>
          <div className="text-xs text-white/80">Points</div>
        </div>
        <div className="bg-white/20 p-4 rounded-lg text-center">
          <Heart className="h-6 w-6 mx-auto mb-2 text-red-300" />
          <div className="font-bold">{lives}</div>
          <div className="text-xs text-white/80">Lives</div>
        </div>
        <div className="bg-white/20 p-4 rounded-lg text-center">
          <Zap className="h-6 w-6 mx-auto mb-2 text-blue-300" />
          <div className="font-bold">{timeLeft}</div>
          <div className="text-xs text-white/80">Seconds</div>
        </div>
      </div>

      {/* Game Content */}
      <div className="space-y-6">
        {gameData.games.map((game: any, gameIndex: number) => (
          <div key={gameIndex} className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/30">
            <h3 className="text-xl font-bold mb-4">{game.question}</h3>
            <div className="grid grid-cols-2 gap-4">
              {game.options.map((option: string, optionIndex: number) => (
                <button
                  key={optionIndex}
                  onClick={() => handleAnswer(optionIndex, game.correct, game.points)}
                  className="p-4 bg-white/20 rounded-lg hover:bg-white/30 transition-all duration-300 hover:scale-105 text-left border border-white/20 hover:border-white/40"
                >
                  <div className="text-lg font-medium">{option}</div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Game Controls */}
      <div className="mt-6 flex justify-between items-center">
        <div className="text-sm text-white/80">
          Game: {currentGame} • Level: {level}
        </div>
        <button
          onClick={completeGame}
          className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all duration-300 hover:scale-105 flex items-center"
        >
          Complete Game <ArrowRight className="ml-2 h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default InteractiveGame;