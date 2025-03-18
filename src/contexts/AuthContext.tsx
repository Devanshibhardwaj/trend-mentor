
import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Session, User } from '@supabase/supabase-js';
import { toast } from 'sonner';

type AuthContextType = {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  deleteAccount: () => Promise<{ error: any | null }>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      // Set session expiration - we'll handle this differently
      if (session) {
        // We can't directly set expires_in, but we can refresh the session
        // which will extend its lifetime
        supabase.auth.refreshSession();
      }
      
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
      options: {
        // Set session to expire in 2 days (in seconds)
        expiresIn: 172800
      }
    });
    return { error };
  };

  const signUp = async (email: string, password: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        // Set session to expire in 2 days (in seconds)
        expiresIn: 172800
      }
    });
    return { error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    toast.info('You have been signed out');
  };

  const deleteAccount = async () => {
    if (!user) {
      return { error: new Error('No user is currently logged in') };
    }

    try {
      // First delete all user data from the wardrobe_items table
      const { error: deleteWardrobeError } = await supabase
        .from('wardrobe_items')
        .delete()
        .eq('user_id', user.id);
        
      if (deleteWardrobeError) {
        console.error('Error deleting wardrobe items:', deleteWardrobeError);
        return { error: deleteWardrobeError };
      }
      
      // Delete the user's account
      const { error: deleteUserError } = await supabase.auth.admin.deleteUser(
        user.id
      );
      
      if (deleteUserError) {
        return { error: deleteUserError };
      }
      
      // Sign out after successful deletion
      await signOut();
      return { error: null };
    } catch (error) {
      console.error('Error deleting account:', error);
      return { error };
    }
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, signIn, signUp, signOut, deleteAccount }}>
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
