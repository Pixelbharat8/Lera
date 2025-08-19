/* eslint-disable react-refresh/only-export-components */
import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { User } from '../types/index';
import { supabase } from '../lib/supabase';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) {
          console.error('Session error:', error);
          setIsLoading(false);
          return;
        }
        
        if (session?.user) {
          console.log('Initial session found for user:', session.user.id);
          await fetchUserProfile(session.user.id);
        } else {
          console.log('No initial session found');
          setUser(null);
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error getting initial session:', error);
        setIsLoading(false);
      }
    };

    getInitialSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.id);
        
        if (event === 'SIGNED_IN' && session?.user) {
          await fetchUserProfile(session.user.id);
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
          setIsLoading(false);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserProfile = async (userId: string) => {
    try {
      setIsLoading(true);
      console.log('Fetching profile for user:', userId);
      
      // Get user from auth
      const { data: { user: authUser }, error: authError } = await supabase.auth.getUser();
      if (authError) {
        console.error('Auth user error:', authError);
        throw authError;
      }

      // Try to get existing profile
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', userId)
        .maybeSingle();

      let profile = profileData;

      // If no profile exists, create one
      if (!profile && authUser) {
        console.log('Creating new profile for user:', userId);
        
        const newProfileData = {
          user_id: userId,
          full_name: authUser.user_metadata?.full_name || authUser.email?.split('@')[0] || 'User',
          email: authUser.email || '',
          avatar_url: '/ceo.jpg'
        };

        const { data: createdProfile, error: createError } = await supabase
          .from('profiles')
          .insert(newProfileData)
          .select()
          .single();

        if (createError) {
          console.error('Error creating profile:', createError);
          throw createError;
        }

        profile = createdProfile;
        console.log('Profile created successfully:', profile);
      }

      if (!profile) {
        throw new Error('Could not create or fetch user profile');
      }

      // Determine user role based on email for demo accounts
      let userRole = 'student'; // default role
      
      if (authUser?.email) {
        const email = authUser.email.toLowerCase();
        if (email === 'superadmin@lera-academy.com') {
          userRole = 'super_admin';
        } else if (email === 'admin@lera-academy.com') {
          userRole = 'admin';
        } else if (email === 'teacher@lera-academy.com') {
          userRole = 'instructor';
        } else if (email === 'hr@lera-academy.com') {
          userRole = 'hr_staff';
        } else if (email === 'employee@lera-academy.com') {
          userRole = 'employee';
        }
      }

      console.log('User role determined:', userRole);

      // Set user state
      setUser({
        id: profile.id,
        name: profile.full_name || 'User',
        email: profile.email || authUser?.email || '',
        avatar: profile.avatar_url || '/ceo.jpg',
        role: userRole,
        createdAt: profile.created_at || new Date().toISOString(),
        updatedAt: profile.updated_at || new Date().toISOString()
      });

    } catch (error) {
      console.error('Error in fetchUserProfile:', error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      console.log('Attempting login for:', email);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password
      });

      if (error) {
        console.error('Login error:', error);
        throw error;
      }

      if (data.user) {
        console.log('Login successful for user:', data.user.id);
        await fetchUserProfile(data.user.id);
      }
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      setIsLoading(true);
      console.log('Attempting registration for:', email);
      
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: {
            full_name: name.trim()
          }
        }
      });

      if (error) {
        console.error('Registration error:', error);
        throw error;
      }

      if (data.user) {
        console.log('Registration successful for user:', data.user.id);
        await fetchUserProfile(data.user.id);
      }
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  };

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Logout error:', error);
        throw error;
      }
      setUser(null);
    } catch (error) {
      console.error('Error during logout:', error);
      throw error;
    }
  };

  const updateProfile = async (data: Partial<User>) => {
    if (!user) {
      throw new Error('No user logged in');
    }

    try {
      const updateData: any = {};
      if (data.name) updateData.full_name = data.name;
      if (data.avatar) updateData.avatar_url = data.avatar;
      if (data.bio) updateData.bio = data.bio;

      const { error } = await supabase
        .from('profiles')
        .update(updateData)
        .eq('user_id', user.id);

      if (error) {
        console.error('Profile update error:', error);
        throw error;
      }

      // Update local user state
      setUser(prevUser => prevUser ? { ...prevUser, ...data } : null);
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      isLoading,
      login,
      register,
      logout,
      updateProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
};