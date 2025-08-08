import React from 'react';
import { Trophy, Star, Target, Zap, Award, TrendingUp } from 'lucide-react';

interface GamificationPanelProps {
  points: number;
  level: number;
  badges: string[];
  streak: number;
  nextLevelPoints: number;
}

const GamificationPanel: React.FC<GamificationPanelProps> = ({
  points,
  level,
  badges,
  streak,
  nextLevelPoints
}) => {
  const progressToNextLevel = (points % 1000) / 10; // Assuming 1000 points per level

  return (
    <div className="gradient-morph rounded-3xl p-10 text-white shadow-2xl border border-white/30 backdrop-blur-xl relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-4 right-4 w-32 h-32 bg-white/10 rounded-full blur-2xl float-animation"></div>
        <div className="absolute bottom-4 left-4 w-24 h-24 bg-yellow-400/20 rounded-full blur-xl float-animation" style={{animationDelay: '2s'}}></div>
      </div>
      
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-3xl font-bold neon-glow">Your Progress</h3>
        <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm border border-white/30 pulse-glow">
          <Trophy className="h-8 w-8 text-yellow-300" />
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8 stagger-animation">
        <div className="text-center">
          <div className="bg-white/20 rounded-2xl p-6 mb-4 backdrop-blur-sm border border-white/40 tilt-effect glow-effect">
            <Star className="h-10 w-10 mx-auto text-yellow-300 pulse-glow" />
          </div>
          <p className="text-sm opacity-90 font-bold uppercase tracking-wider">Points</p>
          <p className="text-3xl font-bold holographic">{points.toLocaleString()}</p>
        </div>
        
        <div className="text-center">
          <div className="bg-white/20 rounded-2xl p-6 mb-4 backdrop-blur-sm border border-white/40 tilt-effect glow-effect">
            <Target className="h-10 w-10 mx-auto text-emerald-300 pulse-glow" />
          </div>
          <p className="text-sm opacity-90 font-bold uppercase tracking-wider">Level</p>
          <p className="text-3xl font-bold holographic">{level}</p>
        </div>
        
        <div className="text-center">
          <div className="bg-white/20 rounded-2xl p-6 mb-4 backdrop-blur-sm border border-white/40 tilt-effect glow-effect">
            <Zap className="h-10 w-10 mx-auto text-orange-300 pulse-glow" />
          </div>
          <p className="text-sm opacity-90 font-bold uppercase tracking-wider">Streak</p>
          <p className="text-3xl font-bold holographic">{streak} days</p>
        </div>
        
        <div className="text-center">
          <div className="bg-white/20 rounded-2xl p-6 mb-4 backdrop-blur-sm border border-white/40 tilt-effect glow-effect">
            <Award className="h-10 w-10 mx-auto text-pink-300 pulse-glow" />
          </div>
          <p className="text-sm opacity-90 font-bold uppercase tracking-wider">Badges</p>
          <p className="text-3xl font-bold holographic">{badges.length}</p>
        </div>
      </div>
      
      <div className="mb-6">
        <div className="flex justify-between text-base mb-4">
          <span className="font-bold neon-glow">Progress to Level {level + 1}</span>
          <span className="font-bold text-xl holographic">{progressToNextLevel.toFixed(0)}%</span>
        </div>
        <div className="w-full h-4 progress-3d bg-white/20 backdrop-blur-sm">
          <div 
            className="progress-fill bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 transition-all duration-1000"
            style={{ width: `${progressToNextLevel}%` }}
          ></div>
        </div>
        <p className="text-sm opacity-90 mt-3 font-bold">
          {nextLevelPoints - (points % 1000)} points to next level
        </p>
      </div>
      
      {badges.length > 0 && (
        <div>
          <h4 className="text-base font-bold mb-4 uppercase tracking-wider neon-glow">Recent Badges</h4>
          <div className="flex flex-wrap gap-3">
            {badges.slice(0, 3).map((badge, index) => (
              <span 
                key={index}
                className="bg-white/25 text-sm px-4 py-2 rounded-2xl backdrop-blur-sm border border-white/40 font-bold tilt-effect glow-effect"
              >
                🏆 {badge}
              </span>
            ))}
            {badges.length > 3 && (
              <span className="bg-white/25 text-sm px-4 py-2 rounded-2xl backdrop-blur-sm border border-white/40 font-bold tilt-effect glow-effect">
                +{badges.length - 3} more
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default GamificationPanel;