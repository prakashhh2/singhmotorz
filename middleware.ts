import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { supabaseConfigured, supabaseKey, supabaseUrl } from '@/lib/supabase/config';

export async function middleware(request: Request & { cookies: { getAll: () => { name: string; value: string }[]; set: (name: string, value: string, options?: Record<string, unknown>) => void } }) {
  const url = new URL(request.url);
  if (!supabaseConfigured || !url.pathname.startsWith('/admin') || url.pathname.startsWith('/admin/login')) return NextResponse.next();
  const response = NextResponse.next();
  const supabase = createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll(cookiesToSet) { cookiesToSet.forEach(({ name, value, options }) => { request.cookies.set(name, value, options); response.cookies.set(name, value, options); }); },
    },
  });
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.redirect(new URL('/admin/login', request.url));
  return response;
}

export const config = { matcher: ['/admin/:path*'] };
