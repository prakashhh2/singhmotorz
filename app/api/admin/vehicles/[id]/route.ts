import { NextResponse } from 'next/server';
import { getStaffContext } from '@/lib/api-auth';

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const context = await getStaffContext();
  if (!context) return NextResponse.json({ error: 'Staff authentication required.' }, { status: 401 });
  const patch = await request.json();
  const allowed = ['price', 'status', 'featured', 'description', 'down_payment', 'cover_image_url'];
  const update: Record<string, unknown> = {};
  for (const key of allowed) if (patch[key] !== undefined) update[key] = patch[key];
  if (update.status === 'Sold') update.sold_at = new Date().toISOString();
  if (update.status && update.status !== 'Sold') update.sold_at = null;
  if (update.price !== undefined && (typeof update.price !== 'number' || update.price < 0)) return NextResponse.json({ error: 'Price must be a positive number.' }, { status: 400 });
  const { data, error } = await context.supabase.from('vehicles').update(update).eq('id', params.id).select('*, vehicle_photos(*)').single();
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json(data);
}

export async function DELETE(_request: Request, { params }: { params: { id: string } }) {
  const context = await getStaffContext();
  if (!context) return NextResponse.json({ error: 'Staff authentication required.' }, { status: 401 });
  const { data: photos } = await context.supabase.from('vehicle_photos').select('storage_path').eq('vehicle_id', params.id);
  if (photos?.length) await context.supabase.storage.from('vehicle-photos').remove(photos.map((photo) => photo.storage_path));
  const { error } = await context.supabase.from('vehicles').delete().eq('id', params.id);
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ ok: true });
}
