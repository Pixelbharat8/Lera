import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../lib/supabase';
import VideoRoom from '../components/live/VideoRoom';

interface LiveSession {
  id: string;
  title: string;
  description: string;
  instructor_id: string;
  status: 'scheduled' | 'live' | 'ended' | 'cancelled';
}

const LiveSessionPage = () => {
  const { sessionId } = useParams<{ sessionId: string }>();
  const { user } = useAuth();
  const [session, setSession] = useState<LiveSession | null>(null);
  const [isInstructor, setIsInstructor] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const { data: sessionData, error: sessionError } = await supabase
          .from('live_sessions')
          .select(`
            *,
            instructor:profiles!instructor_id(user_id)
          `)
          .eq('id', sessionId)
          .single();

        if (sessionError) throw sessionError;
        if (!sessionData) throw new Error('Session not found');

        setSession(sessionData);
        setIsInstructor(sessionData.instructor.user_id === user?.id);

        // Record attendance if student
        if (!isInstructor) {
          await supabase.from('session_attendees').upsert({
            session_id: sessionId,
            user_id: user?.id,
            joined_at: new Date().toISOString()
          });
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load session');
      }
    };

    if (sessionId) {
      fetchSession();
    }

    return () => {
      // Record leave time if student
      if (!isInstructor && sessionId && user) {
        supabase.from('session_attendees').update({
          left_at: new Date().toISOString()
        }).match({
          session_id: sessionId,
          user_id: user.id,
          left_at: null
        });
      }
    };
  }, [sessionId, user?.id]);

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center text-white">
          <h2 className="text-2xl font-bold mb-2">Error</h2>
          <p className="text-gray-400">{error}</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
          <p className="mt-4">Loading session...</p>
        </div>
      </div>
    );
  }

  return (
    <VideoRoom
      sessionId={session.id}
      isInstructor={isInstructor}
    />
  );
};

export default LiveSessionPage;