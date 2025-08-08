import { useState, useEffect } from 'react';
import { Analytics } from '../types';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../lib/supabase';

export const useAnalytics = () => {
  const { user } = useAuth();
  const [analytics, setAnalytics] = useState<Analytics[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const trackEvent = async (event: string, data: Record<string, any>, courseId?: string) => {
    if (!user) return;

    try {
      const analyticsData: Omit<Analytics, 'id'> = {
        userId: user.id,
        courseId,
        event,
        data,
        timestamp: new Date().toISOString()
      };

      const { error } = await supabase
        .from('analytics')
        .insert(analyticsData);

      if (error) throw error;

      setAnalytics(prev => [...prev, { ...analyticsData, id: Date.now().toString() }]);
    } catch (error) {
      console.error('Error tracking event:', error);
    }
  };

  const getAnalytics = async (filters?: {
    userId?: string;
    courseId?: string;
    event?: string;
    startDate?: string;
    endDate?: string;
  }) => {
    setIsLoading(true);
    try {
      let query = supabase.from('analytics').select('*');

      if (filters?.userId) query = query.eq('user_id', filters.userId);
      if (filters?.courseId) query = query.eq('course_id', filters.courseId);
      if (filters?.event) query = query.eq('event', filters.event);
      if (filters?.startDate) query = query.gte('timestamp', filters.startDate);
      if (filters?.endDate) query = query.lte('timestamp', filters.endDate);

      const { data, error } = await query.order('timestamp', { ascending: false });

      if (error) throw error;
      setAnalytics(data || []);
      return data || [];
    } catch (error) {
      console.error('Error fetching analytics:', error);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  const getEngagementMetrics = async (courseId?: string) => {
    try {
      const filters = courseId ? { courseId } : {};
      const data = await getAnalytics(filters);

      const metrics = {
        totalEvents: data.length,
        uniqueUsers: new Set(data.map(d => d.userId)).size,
        averageSessionTime: 0,
        completionRate: 0,
        popularContent: {} as Record<string, number>
      };

      // Calculate popular content
      data.forEach(event => {
        if (event.event === 'lesson_viewed' && event.data.lessonId) {
          metrics.popularContent[event.data.lessonId] = 
            (metrics.popularContent[event.data.lessonId] || 0) + 1;
        }
      });

      return metrics;
    } catch (error) {
      console.error('Error calculating engagement metrics:', error);
      return null;
    }
  };

  // Common tracking functions
  const trackLessonView = (lessonId: string, courseId: string) => {
    trackEvent('lesson_viewed', { lessonId }, courseId);
  };

  const trackQuizAttempt = (quizId: string, score: number, courseId: string) => {
    trackEvent('quiz_attempted', { quizId, score }, courseId);
  };

  const trackCourseEnrollment = (courseId: string) => {
    trackEvent('course_enrolled', {}, courseId);
  };

  const trackCourseCompletion = (courseId: string, completionTime: number) => {
    trackEvent('course_completed', { completionTime }, courseId);
  };

  const trackLogin = () => {
    trackEvent('user_login', { timestamp: new Date().toISOString() });
  };

  return {
    analytics,
    isLoading,
    trackEvent,
    getAnalytics,
    getEngagementMetrics,
    trackLessonView,
    trackQuizAttempt,
    trackCourseEnrollment,
    trackCourseCompletion,
    trackLogin
  };
};