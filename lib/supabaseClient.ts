import { createClient } from '@supabase/supabase-js';

let supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
let supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Fallback to hardcoded values for testing if env vars aren't loading
if (!supabaseUrl) {
  supabaseUrl = 'https://your-project-ref.supabase.co';
  console.warn('Using fallback Supabase URL - please update .env.local with your actual Supabase URL');
}

if (!supabaseAnonKey) {
  supabaseAnonKey = 'your-anon-key-here';
  console.warn('Using fallback Supabase Anon Key - please update .env.local with your actual Supabase Anon Key');
}

// Debug: Check if environment variables are loaded
console.log('Supabase URL:', supabaseUrl ? 'Loaded' : 'Missing');
console.log('Supabase Anon Key:', supabaseAnonKey ? 'Loaded' : 'Missing');

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables - please check your .env.local file');
}

// Create Supabase client with proper auth configuration
const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    // Enable automatic token refreshing
    autoRefreshToken: true,
    // Persist session in localStorage
    persistSession: true,
    // Detect session changes
    detectSessionInUrl: true
  }
});

export { supabase };