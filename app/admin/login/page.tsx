'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createSupabaseBrowserClient } from '@/lib/supabase/browser';
import { supabaseConfigured } from '@/lib/supabase/config';

export default function AdminLoginPage() {
  const router = useRouter(); const [email, setEmail] = useState(''); const [password, setPassword] = useState(''); const [error, setError] = useState(''); const [loading, setLoading] = useState(false);
  async function submit(event: FormEvent) { event.preventDefault(); setLoading(true); setError(''); if (!supabaseConfigured) { setError('Add Supabase environment variables before signing in.'); setLoading(false); return; } const { error: signInError } = await createSupabaseBrowserClient().auth.signInWithPassword({ email, password }); if (signInError) setError(signInError.message); else router.push('/admin/vehicles'); setLoading(false); }
  return <main className="content-narrow"><p className="eyebrow">Staff access</p><h1>Sign in to Singh Motors.</h1><p>Use the staff account created in Supabase Auth.</p><form className="inquiry-form" onSubmit={submit}><label>Email<input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} /></label><label>Password<input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} /></label>{error && <p style={{color:'#a03636',fontSize:13}}>{error}</p>}<button className="button button-green" disabled={loading}>{loading ? 'Signing in…' : 'Sign in'}</button><Link className="text-link" href="/">← Back to public site</Link></form></main>;
}
