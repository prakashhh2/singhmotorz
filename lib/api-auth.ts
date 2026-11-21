import { supabaseConfigured } from './supabase/config';
import { createSupabaseServerClient } from './supabase/server';

export async function getStaffContext() {
  if (!supabaseConfigured) return null;
  const supabase = createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  const { data: profile } = await supabase.from('staff_profiles').select('role').eq('user_id', user.id).maybeSingle();
  return profile ? { supabase, user, role: profile.role as string } : null;
}
