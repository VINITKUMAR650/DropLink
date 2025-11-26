'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function TestAuthPage() {
  const [authStatus, setAuthStatus] = useState<string>('Checking...');
  const [user, setUser] = useState<any>(null);
  const [session, setSession] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [testResult, setTestResult] = useState<string>('');

  useEffect(() => {
    const checkAuth = async () => {
      try {
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
          setSession(sessionData?.session);
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

  const testLogin = async () => {
    setTestResult('Testing login...');
    try {
      // This is just a test - we won't actually log in with real credentials here
      // This will help us see what's happening with the auth system
      const { data, error } = await supabase.auth.signInWithPassword({
        email: 'test@example.com',
        password: 'testpassword'
      });
      
      if (error) {
        setTestResult(`Login Test Error: ${error.message}`);
      } else {
        setTestResult('Login test completed (not a real login)');
      }
    } catch (err) {
      setTestResult(`Login Test Exception: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  };

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-6">Authentication Test</h1>
      
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Current Status</h2>
        <div className="space-y-4">
          <div>
            <span className="font-medium">Authentication Status:</span> 
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
          
          {session && (
            <div className="mt-4 p-3 bg-yellow-100 text-yellow-700 rounded">
              <h3 className="font-medium">Session Info:</h3>
              <p>User ID: {session.user?.id}</p>
              <p>Expires At: {new Date(session.expires_at * 1000).toLocaleString()}</p>
            </div>
          )}
        </div>
      </div>
      
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Debug Actions</h2>
        <button 
          onClick={testLogin}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Test Login Functionality
        </button>
        <p className="mt-2 text-sm text-gray-600">{testResult}</p>
      </div>
      
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-bold text-blue-800 mb-2">Troubleshooting</h3>
        <ul className="list-disc pl-5 space-y-1 text-blue-700">
          <li>"Auth session missing" usually means the session cookie isn't being set or read properly</li>
          <li>Check that your Supabase credentials in <code>.env.local</code> are correct</li>
          <li>Make sure you've confirmed your email address if you registered</li>
          <li>Try clearing your browser cookies for localhost</li>
          <li>Check the browser console for JavaScript errors</li>
          <li>Verify that your Supabase project URL matches the one in your config</li>
        </ul>
      </div>
    </div>
  );
}