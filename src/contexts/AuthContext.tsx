
import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Session, User } from '@supabase/supabase-js';
import { toast } from 'sonner';

type AuthContextType = {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string) => Promise<{ error: any; isNewUser?: boolean }>;
  signOut: () => Promise<void>;
  deleteAccount: () => Promise<{ error: any | null }>;
  resendVerificationEmail: (email: string) => Promise<{ error: any | null }>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('Setting up auth state change listener');
    
    // First set up the auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, newSession) => {
      console.log('Auth state changed:', event, newSession?.user?.email);
      
      if (newSession) {
        setSession(newSession);
        setUser(newSession.user);
      } else {
        setSession(null);
        setUser(null);
      }
      
      setLoading(false);
    });

    // Then check for existing session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      console.log('Initial session check:', currentSession?.user?.email);
      
      if (currentSession) {
        setSession(currentSession);
        setUser(currentSession.user);
        
        // Ensures session refresh to maintain authentication
        supabase.auth.refreshSession();
      }
      
      setLoading(false);
    });

    return () => {
      console.log('Cleaning up auth state change listener');
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    
    if (!error) {
      toast.success('Successfully signed in!');
      
      // Profile data will be automatically updated via the trigger
      // we created in the database for sign-ins
    }
    
    return { error };
  };

  const signUp = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: window.location.origin + '/auth'
      }
    });
    
    if (!error && data?.user) {
      toast.success('Account created successfully!');
      
      // New user profile will be automatically created via the trigger
      // we created in the database for new user signups
      
      if (data.session) {
        toast.success('You are now signed in!');
      } else {
        toast.info('Please check your email to verify your account.');
      }
    }
    
    return { 
      error, 
      isNewUser: data?.user && !data.user.identities?.[0]?.identity_data?.email_verified 
    };
  };

  const resendVerificationEmail = async (email: string) => {
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email: email
    });
    
    if (!error) {
      toast.success('Verification email sent! Please check your inbox.');
    }
    
    return { error };
  };

  const signOut = async () => {
    // The last_sign_in field in profiles won't be updated on signout
    // It represents the last time the user signed in
    await supabase.auth.signOut();
    toast.info('You have been signed out');
  };

  const deleteAccount = async () => {
    if (!user) {
      return { error: new Error('No user is currently logged in') };
    }

    try {
      // Delete wardrobe items first to avoid foreign key constraints
      const { error: deleteWardrobeError } = await supabase
        .from('wardrobe_items')
        .delete()
        .eq('user_id', user.id);
        
      if (deleteWardrobeError) {
        console.error('Error deleting wardrobe items:', deleteWardrobeError);
        return { error: deleteWardrobeError };
      }
      
      // Delete the user - this will cascade to the profiles table
      // due to the ON DELETE CASCADE constraint we set up
      const { error: deleteUserError } = await supabase.auth.admin.deleteUser(
        user.id
      );
      
      if (deleteUserError) {
        return { error: deleteUserError };
      }
      
      await signOut();
      return { error: null };
    } catch (error) {
      console.error('Error deleting account:', error);
      return { error };
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      session, 
      loading, 
      signIn, 
      signUp, 
      signOut, 
      deleteAccount,
      resendVerificationEmail 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
