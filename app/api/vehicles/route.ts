import { NextResponse } from 'next/server';
import { vehicles } from '@/lib/data';
import { mapDbVehicle } from '@/lib/vehicle-mapper';
import { supabaseConfigured } from '@/lib/supabase/config';
import { createSupabaseServerClient } from '@/lib/supabase/server';

export async function GET() {
  if (!supabaseConfigured) return NextResponse.json(vehicles);
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase.from('vehicles').select('*, vehicle_photos(*)').neq('status', 'Draft').order('created_at', { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json((data || []).map(mapDbVehicle));
}
