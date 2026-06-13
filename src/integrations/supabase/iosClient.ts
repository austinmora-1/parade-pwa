// Read-only client for the iOS Supabase project.
//
// The deployed PWA (helloparade.app) talks to the web Supabase project, but
// the native iOS app stores its data in a SEPARATE project. iOS share links
// arrive as `/share/{code}?src=ios`, so the public Share page needs to read
// availability/profile/plans from the iOS project for those links.
//
// This client is anonymous and session-less — it only ever calls the public
// `*_by_share_code` security-definer RPCs. The anon key is public by design
// (it's the same key shipped in the iOS app bundle).
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const IOS_SUPABASE_URL =
  import.meta.env.VITE_IOS_SUPABASE_URL || 'https://elpdnxvtulbqgnsrbstx.supabase.co';
const IOS_SUPABASE_ANON_KEY =
  import.meta.env.VITE_IOS_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVscGRueHZ0dWxicWduc3Jic3R4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY3NDI0MjIsImV4cCI6MjA3MjMxODQyMn0.I8hi6fhzpj2XStSLmnknx2iTajWqtbizFhJGzctTX0g';

export const iosSupabase = createClient<Database>(IOS_SUPABASE_URL, IOS_SUPABASE_ANON_KEY, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});
