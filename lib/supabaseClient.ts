import { createClient } from '@supabase/supabase-js';

let supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
let supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Fallback to hardcoded values for testing if env vars aren't loading
if (!supabaseUrl) {
  supabaseUrl = 'https://lioqivtmcgsadzuyxlrf.supabase.co';
  console.warn('Using fallback Supabase URL');
}

if (!supabaseAnonKey) {
  supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxpb3FpdnRtY2dzYWR6dXl4bHJmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY0MDYwMjgsImV4cCI6MjA3MTk4MjAyOH0.f5j0_Zhc_KkAupw0jfizeeaBNMyZtaYyQT_nhiF95MQ';
  console.warn('Using fallback Supabase Anon Key');
}

// Debug: Check if environment variables are loaded
console.log('Supabase URL:', supabaseUrl ? 'Loaded' : 'Missing');
console.log('Supabase Anon Key:', supabaseAnonKey ? 'Loaded' : 'Missing');

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);
export { supabase };