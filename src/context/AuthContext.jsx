'use client';

import { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { createClient } from '@/lib/supabase/client';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const supabase = useMemo(() => createClient(), []);

  useEffect(() => {
    if (!supabase) {
      console.warn('Supabase client could not be initialized. Check your environment variables.');
      setLoading(false);
      return;
    }

    const getUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);
        if (user) {
          const { data } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single();
          setProfile(data);
        }
      } catch (error) {
        console.error('Auth error:', error);
      } finally {
        setLoading(false);
      }
    };

    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      try {
        const currentUser = session?.user ?? null;
        setUser(currentUser);
        
        if (currentUser) {
          const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', currentUser.id)
            .single();
          
          if (!error) setProfile(data);
        } else {
          setProfile(null);
        }
      } catch (err) {
        console.error('onAuthStateChange error:', err);
      } finally {
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  const signUp = async (email, password, metadata = {}) => {
    if (!supabase) return { data: null, error: new Error('Supabase not initialized') };
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: metadata },
    });
    return { data, error };
  };

  const signIn = async (email, password) => {
    if (!supabase) return { data: null, error: new Error('Supabase not initialized') };
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    return { data, error };
  };

  const signOut = async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
  };

  return (
    <AuthContext.Provider value={{ user, profile, loading, signUp, signIn, signOut, supabase }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
