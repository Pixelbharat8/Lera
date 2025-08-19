import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { User as SupabaseUser } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'student' | 'instructor' | 'admin' | 'super_admin' | 'hr_staff' | 'employee';
  createdAt: string;
  updatedAt: string;
}

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

  // Determine user role based on email
  const determineUserRole = (email: string): User['role'] => {
    const emailLower = email.toLowerCase();
    
    if (emailLower === 'superadmin@lera-academy.com') return 'super_admin';
    if (emailLower === 'admin@lera-academy.com') return 'admin';
    if (emailLower === 'teacher@lera-academy.com') return 'instructor';
    if (emailLower === 'hr@lera-academy.com') return 'hr_staff';
    if (emailLower === 'employee@lera-academy.com') return 'employee';
    
    // Check for instructor emails
    if (emailLower.includes('teacher') || emailLower.includes('instructor')) return 'instructor';
    if (emailLower.includes('admin')) return 'admin';
    if (emailLower.includes('hr')) return 'hr_staff';
    
    return 'student'; // Default role
  };

  const createOrUpdateProfile = async (authUser: SupabaseUser): Promise<User> => {
    try {
      const role = determineUserRole(authUser.email || '');
      
      // Check if profile exists
      const { data: existingProfile } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', authUser.id)
        .single();

      let profile;
      
      if (existingProfile) {
        // Update existing profile
        const { data: updatedProfile, error } = await supabase
          .from('profiles')
          .update({
            email: authUser.email,
            updated_at: new Date().toISOString()
          })
          .eq('user_id', authUser.id)
          .select()
          .single();

        if (error) throw error;
        profile = updatedProfile;
      } else {
        // Create new profile
        const { data: newProfile, error } = await supabase
          .from('profiles')
          .insert({
            user_id: authUser.id,
            full_name: authUser.user_metadata?.full_name || authUser.email?.split('@')[0] || 'User',
            email: authUser.email || '',
            avatar_url: authUser.user_metadata?.avatar_url || '/ceo.jpg',
            role: role
          })
          .select()
          .single();

        if (error) throw error;
        profile = newProfile;
      }

      return {
        id: profile.id,
        name: profile.full_name || 'User',
        email: profile.email || authUser.email || '',
        avatar: profile.avatar_url || '/ceo.jpg',
        role: role,
        createdAt: profile.created_at || new Date().toISOString(),
        updatedAt: profile.updated_at || new Date().toISOString()
      };
    } catch (error) {
      console.error('Error creating/updating profile:', error);
      throw error;
    }
  };

  useEffect(() => {
    let mounted = true;

    const initializeAuth = async () => {
      try {
        // Get initial session
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Session error:', error);
          if (mounted) {
            setUser(null);
            setIsLoading(false);
          }
          return;
        }

        if (session?.user && mounted) {
          console.log('Initial session found, creating profile...');
          const userProfile = await createOrUpdateProfile(session.user);
          setUser(userProfile);
        } else if (mounted) {
          setUser(null);
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        if (mounted) {
          setUser(null);
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    initializeAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event);
        
        if (!mounted) return;

        if (event === 'SIGNED_IN' && session?.user) {
          try {
            setIsLoading(true);
            const userProfile = await createOrUpdateProfile(session.user);
            setUser(userProfile);
          } catch (error) {
            console.error('Error handling sign in:', error);
            setUser(null);
          } finally {
            setIsLoading(false);
          }
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
          setIsLoading(false);
        }
      }
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

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
        console.log('Login successful, creating profile...');
        const userProfile = await createOrUpdateProfile(data.user);
        setUser(userProfile);
        console.log('User profile set:', userProfile);
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
        console.log('Registration successful, creating profile...');
        const userProfile = await createOrUpdateProfile(data.user);
        setUser(userProfile);
        console.log('User profile set:', userProfile);
      }
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  };

  const logout = async () => {
    try {
      console.log('Logging out...');
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Logout error:', error);
        throw error;
      }
      setUser(null);
      console.log('Logout successful');
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

      const { error } = await supabase
        .from('profiles')
        .update(updateData)
        .eq('id', user.id);

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