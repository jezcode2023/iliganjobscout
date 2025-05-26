import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://nkbsqufomavihbvyhocy.supabase.co'; // <-- your Supabase project URL
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5rYnNxdWZvbWF2aWhidnlob2N5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgyNzExMDYsImV4cCI6MjA2Mzg0NzEwNn0.Yr-LFIViNVGSAy-HWCWNd0wexvsFttWQ0rm4TjB8Ynw'; // <-- your Supabase anon/public key

export const supabase = createClient(supabaseUrl, supabaseAnonKey);