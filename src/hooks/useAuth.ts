import { useState, useEffect, useCallback } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

interface AuthContextType extends AuthState {
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

export const useAuth = (): AuthContextType => {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null
  });

  useEffect(() => {
    const initAuth = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) throw error;

        setState(prev => ({
          ...prev,
          user: session?.user || null,
          isAuthenticated: !!session?.user,
          isLoading: false
        }));
      } catch (err) {
        console.error('Auth init error:', err);
        setState(prev => ({
          ...prev,
          isLoading: false,
          error: err instanceof Error ? err.message : 'Auth error'
        }));
      }
    };

    initAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setState(prev => ({
        ...prev,
        user: session?.user || null,
        isAuthenticated: !!session?.user
      }));
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const signUp = useCallback(async (email: string, password: string) => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Sign up failed';
      setState(prev => ({ ...prev, error: message, isLoading: false }));
      throw err;
    }
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Sign in failed';
      setState(prev => ({ ...prev, error: message, isLoading: false }));
      throw err;
    }
  }, []);

  const signOut = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setState(prev => ({
        ...prev,
        user: null,
        isAuthenticated: false,
        isLoading: false
      }));
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Sign out failed';
      setState(prev => ({ ...prev, error: message, isLoading: false }));
      throw err;
    }
  }, []);

  const resetPassword = useCallback(async (email: string) => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      if (error) throw error;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Password reset failed';
      setState(prev => ({ ...prev, error: message, isLoading: false }));
      throw err;
    }
  }, []);

  return {
    ...state,
    signUp,
    signIn,
    signOut,
    resetPassword
  };
};
