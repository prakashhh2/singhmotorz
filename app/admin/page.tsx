import { redirect } from 'next/navigation';
import { supabaseConfigured } from '@/lib/supabase/config';

export default function AdminPage() {
  redirect(supabaseConfigured ? '/admin/login' : '/admin/vehicles');
}
