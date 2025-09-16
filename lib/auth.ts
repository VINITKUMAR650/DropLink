'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from './supabaseClient'
import { createLoginUrl, redirectToReturnUrl } from './redirectUtils'

export function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getUser();
      if (data?.user) {
        setIsLoggedIn(true);
        setUser(data.user);
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
      setLoading(false);
    };
    getSession();
    // Listen for auth state changes
    const { data: listener } = supabase.auth.onAuthStateChange(() => {
      getSession();
    });
    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
    setIsLoggedIn(false);
    setUser(null);
    router.push('/');
  };

  const requireAuth = (redirectUrl?: string) => {
    if (!isLoggedIn && !loading) {
      const loginUrl = createLoginUrl(redirectUrl);
      router.push(loginUrl);
      return false;
    }
    return isLoggedIn;
  };

  return { isLoggedIn, user, loading, logout, requireAuth };
}

export async function redirectIfAuthenticated() {
  if (typeof window !== 'undefined') {
    const { data } = await supabase.auth.getUser();
    if (data?.user) {
      return true;
    }
  }
  return false;
}
