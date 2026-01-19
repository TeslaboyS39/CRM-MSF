// Supabase Configuration Template
// Copy this file to supabase-config.js and fill in your credentials
// DO NOT commit supabase-config.js to the repository

const SUPABASE_URL = 'your-supabase-url-here';
const SUPABASE_ANON_KEY = 'your-supabase-anon-key-here';

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
