import { useState, useEffect } from 'react';
import { Gamification, Badge, Achievement } from '../types';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../lib/supabase';

export const useGamification = () => {
  const { user } = useAuth();
  const [gamification, setGamification] = useState<Gamification | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchGamificationData();
    }
  }, [user]);

  const fetchGamificationData = async () => {
    if (!user) return;

    try {
      // This would fetch from your gamification tables
      // For now, using mock data
      const mockData: Gamification = {
        userId: user.id,
        points: 2450,
        level: 8,
        badges: [
          {
            id: '1',
            name: 'Quick Learner',
            description: 'Complete 5 lessons in a day',
            icon: '🚀',
            earnedAt: '2024-01-15'
          },
          {
            id: '2',
            name: 'Quiz Master',
            description: 'Score 100% on 10 quizzes',
            icon: '🎯',
            earnedAt: '2024-01-20'
          }
        ],
        streak: 15,
        achievements: []
      };

      setGamification(mockData);
    } catch (error) {
      console.error('Error fetching gamification data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const awardPoints = async (points: number, reason: string) => {
    if (!user || !gamification) return;

    try {
      const newPoints = gamification.points + points;
      const newLevel = Math.floor(newPoints / 1000) + 1;

      // Update database
      const { error } = await supabase
        .from('user_gamification')
        .upsert({
          user_id: user.id,
          points: newPoints,
          level: newLevel
        });

      if (error) throw error;

      // Update local state
      setGamification(prev => prev ? {
        ...prev,
        points: newPoints,
        level: newLevel
      } : null);

      // Check for new achievements
      await checkAchievements(newPoints, newLevel);
    } catch (error) {
      console.error('Error awarding points:', error);
    }
  };

  const awardBadge = async (badge: Badge) => {
    if (!user || !gamification) return;

    try {
      // Add badge to database
      const { error } = await supabase
        .from('user_badges')
        .insert({
          user_id: user.id,
          badge_id: badge.id,
          earned_at: new Date().toISOString()
        });

      if (error) throw error;

      // Update local state
      setGamification(prev => prev ? {
        ...prev,
        badges: [...prev.badges, badge]
      } : null);
    } catch (error) {
      console.error('Error awarding badge:', error);
    }
  };

  const updateStreak = async (increment: boolean = true) => {
    if (!user || !gamification) return;

    try {
      const newStreak = increment ? gamification.streak + 1 : 0;

      const { error } = await supabase
        .from('user_gamification')
        .update({ streak: newStreak })
        .eq('user_id', user.id);

      if (error) throw error;

      setGamification(prev => prev ? {
        ...prev,
        streak: newStreak
      } : null);
    } catch (error) {
      console.error('Error updating streak:', error);
    }
  };

  const checkAchievements = async (points: number, level: number) => {
    // Check for level-based achievements
    if (level === 10 && !gamification?.badges.find(b => b.name === 'Level Master')) {
      await awardBadge({
        id: 'level-master',
        name: 'Level Master',
        description: 'Reach level 10',
        icon: '👑',
        earnedAt: new Date().toISOString()
      });
    }

    // Check for point-based achievements
    if (points >= 5000 && !gamification?.badges.find(b => b.name === 'Point Collector')) {
      await awardBadge({
        id: 'point-collector',
        name: 'Point Collector',
        description: 'Earn 5000 points',
        icon: '💎',
        earnedAt: new Date().toISOString()
      });
    }
  };

  return {
    gamification,
    isLoading,
    awardPoints,
    awardBadge,
    updateStreak,
    checkAchievements
  };
};