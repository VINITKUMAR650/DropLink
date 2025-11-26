'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function TestVercelAuthPage() {
  const [authStatus, setAuthStatus] = useState<string>('Checking...');
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [envVars, setEnvVars] = useState<any>({});

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check environment variables
        const envInfo = {
          NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'Set' : 'Missing',
          NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'Set' : 'Missing',
          SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY ? 'Set (Server only)' : 'Missing',
        };
        setEnvVars(envInfo);
        
        console.log('Environment variables check:', envInfo);
        
        // Test Supabase client configuration
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
        
        if (!supabaseUrl || !supabaseAnonKey) {
          setError('Missing Supabase environment variables');
          setAuthStatus('Configuration Error');
          return;
        }
        
        // Test 1: Get current user
        const { data: userData, error: userError } = await supabase.auth.getUser();
        console.log('getUser result:', { userData, userError });
        
        // Test 2: Get current session
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
        console.log('getSession result:', { sessionData, sessionError });
        
        if (userError) {
          setError(`User Error: ${userError.message}`);
          setAuthStatus('User Error');
        } else if (sessionError) {
          setError(`Session Error: ${sessionError.message}`);
          setAuthStatus('Session Error');
        } else if (userData?.user) {
          setUser(userData.user);
          setAuthStatus('Authenticated');
        } else {
          setAuthStatus('Not Authenticated');
        }
      } catch (err) {
        console.error('Auth Exception:', err);
        setError(`Exception: ${err instanceof Error ? err.message : 'Unknown error'}`);
        setAuthStatus('Error');
      }
    };

    checkAuth();
  }, []);

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-6">Vercel Authentication Test</h1>
      
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Environment Variables Status</h2>
        <div className="space-y-2">
          {Object.entries(envVars).map(([key, value]) => (
            <div key={key} className="flex justify-between">
              <span className="font-medium">{key}:</span>
              <span className={`px-2 py-1 rounded ${value === 'Set' || value === 'Set (Server only)' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {value as string}
              </span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Authentication Status</h2>
        <div className="space-y-4">
          <div>
            <span className="font-medium">Status:</span> 
            <span className="ml-2 px-2 py-1 rounded bg-blue-100 text-blue-800">
              {authStatus}
            </span>
          </div>
          
          {error && (
            <div className="mt-4 p-3 bg-red-100 text-red-700 rounded">
              <span className="font-medium">Error:</span> {error}
            </div>
          )}
          
          {user && (
            <div className="mt-4 p-3 bg-green-100 text-green-700 rounded">
              <h3 className="font-medium">User Info:</h3>
              <p>ID: {user.id}</p>
              <p>Email: {user.email}</p>
              <p>Email Confirmed: {user.email_confirmed_at ? 'Yes' : 'No'}</p>
            </div>
          )}
        </div>
      </div>
      
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h3 className="font-bold text-yellow-800 mb-2">Vercel Deployment Fix</h3>
        <p className="mb-3">If you're seeing "Missing" for environment variables, you need to add them to your Vercel project:</p>
        <ol className="list-decimal pl-5 space-y-2 text-yellow-700">
          <li>Go to your Vercel Dashboard</li>
          <li>Select your project</li>
          <li>Go to Settings → Environment Variables</li>
          <li>Add these variables:
            <ul className="list-disc pl-5 mt-1">
              <li><code>NEXT_PUBLIC_SUPABASE_URL</code> = Your Supabase project URL</li>
              <li><code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> = Your Supabase anon key</li>
            </ul>
          </li>
          <li>Redeploy your project</li>
        </ol>
      </div>
    </div>
  );
}