/* eslint-disable react-refresh/only-export-components */
import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { User } from '../types/index';
import { supabase } from '../lib/supabase';
import { WorkflowTriggers } from '../components/workflows/WorkflowTriggers';

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
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        fetchUserProfile(session.user.id);
      } else {
        setUser(null);
        setIsLoading(false);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          await fetchUserProfile(session.user.id);
        } else {
          setUser(null);
          setIsLoading(false);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserProfile = async (userId: string) => {
    setIsLoading(true);
    try {
      console.log('Fetching user profile for:', userId);
      
      const { data, error } = await supabase
        .from('profiles')
        .select(`
          *,
          user_roles!inner(role_type, is_active)
        `)
        .eq('user_id', userId)
        .single();

      if (error) {
        console.error('Profile fetch error:', error);
        // If profile doesn't exist, create a basic one
        if (error.code === 'PGRST116') {
          console.log('Profile not found, creating basic profile');
          const { data: authUser } = await supabase.auth.getUser();
          if (authUser.user) {
            const newProfile = {
              user_id: userId,
              full_name: authUser.user.user_metadata?.full_name || authUser.user.email?.split('@')[0] || 'User',
              email: authUser.user.email || '',
              avatar_url: '/ceo.jpg'
            };
            
            const { data: createdProfile, error: createError } = await supabase
              .from('profiles')
              .insert(newProfile)
              .select()
              .single();
              
            if (createError) {
              console.error('Error creating profile:', createError);
              throw createError;
            }

            // Create default student role
            await supabase
              .from('user_roles')
              .insert({
                user_id: userId,
                role_type: 'student'
              });
            
            console.log('Profile created:', createdProfile);
            setUser({
              id: createdProfile.id,
              name: createdProfile.full_name,
              email: createdProfile.email,
              avatar: createdProfile.avatar_url,
              role: 'student',
              createdAt: createdProfile.created_at,
              updatedAt: createdProfile.updated_at
            });
            setIsLoading(false);
            return;
          }
        }
        throw error;
      }

      console.log('Profile fetched successfully:', data);
      
      // Get the most recent active role
      const userRole = data.user_roles?.[0]?.role_type || 'student';
      
      setUser({
        id: data.id,
        name: data.full_name || 'User',
        email: data.email || '',
        avatar: data.avatar_url || '/ceo.jpg',
        role: userRole,
        createdAt: data.created_at,
        updatedAt: data.updated_at
      });
    } catch (error) {
      console.error('Error fetching user profile:', error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      console.log('Attempting login for:', email);
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      if (error) throw error;
      
      console.log('Login successful, fetching profile...');
      // Get the session after login to ensure user is set
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        console.log('Session user found:', session.user.id);
        await fetchUserProfile(session.user.id);
      } else {
        console.error('No session found after login');
        throw new Error('Login failed - no session');
      }
    } catch (error) {
      console.error('Login error:', error);
      setIsLoading(false);
      throw error;
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name
          }
        }
      });
      
      if (error) {
        throw error;
      }

      if (data.user) {
        const newProfile = {
          user_id: data.user.id,
          full_name: name,
          email: email,
          avatar_url: '/ceo.jpg'
        };
        
        const { data: createdProfile, error: profileError } = await supabase
          .from('profiles')
          .insert(newProfile)
          .select()
          .single();
        
        if (profileError) {
          if (!profileError.message.includes('duplicate key')) {
            throw profileError;
          }
        }

        // Create default role for new user
        if (data.user) {
          let defaultRole = 'student';
          
          // Set special roles for demo accounts
          if (email === 'teacher@lera-academy.com') defaultRole = 'instructor';
          if (email === 'admin@lera-academy.com') defaultRole = 'admin';
          if (email === 'superadmin@lera-academy.com') defaultRole = 'super_admin';
          
          await supabase
            .from('user_roles')
            .insert({
              user_id: data.user.id,
              role_type: defaultRole
            });
        }

        if (createdProfile) {
          // Determine role for user object
          let userRole = 'student';
          if (email === 'teacher@lera-academy.com') userRole = 'instructor';
          if (email === 'admin@lera-academy.com') userRole = 'admin';
          if (email === 'superadmin@lera-academy.com') userRole = 'super_admin';
          
          setUser({
            id: createdProfile.id,
            name: createdProfile.full_name,
            email: createdProfile.email,
            avatar: createdProfile.avatar_url,
            role: userRole,
            createdAt: createdProfile.created_at,
            updatedAt: createdProfile.updated_at
          });
        } else {
          // If profile creation failed but no error, try to fetch existing profile
          await fetchUserProfile(data.user.id);
        }
      }
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  const updateProfile = async (data: Partial<User>) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: data.name,
          avatar_url: data.avatar,
          bio: data.bio
        })
        .eq('id', user.id);

      if (error) throw error;

      setUser({ ...user, ...data });
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  };

  const seedDemoAccounts = async () => {
    // Demo accounts will be created automatically when users try to log in
    // This is just for UI feedback
    console.log('Demo accounts are available for login');
    return { success: true, message: 'Demo accounts are ready for login' };
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