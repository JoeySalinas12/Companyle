import { createClient } from '@supabase/supabase-js';

// Replace with your Supabase project credentials
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Create a Supabase client
export const supabase = createClient(supabaseUrl!, supabaseAnonKey!);