'use client';

import { createBrowserClient } from '@supabase/ssr';
import { supabaseKey, supabaseUrl } from './config';

export function createSupabaseBrowserClient() {
  return createBrowserClient(supabaseUrl, supabaseKey);
}
