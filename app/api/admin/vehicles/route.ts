import { NextResponse } from 'next/server';
import { getStaffContext } from '@/lib/api-auth';
import { mapDbVehicle } from '@/lib/vehicle-mapper';

function slugify(value: string) { return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); }
function text(value: FormDataEntryValue | null) { return typeof value === 'string' ? value.trim() : ''; }
function number(value: FormDataEntryValue | null) { const parsed = Number(value); return Number.isFinite(parsed) ? parsed : 0; }

export async function GET() {
  const context = await getStaffContext();
  if (!context) return NextResponse.json({ error: 'Staff authentication required.' }, { status: 401 });
  const { data, error } = await context.supabase.from('vehicles').select('*, vehicle_photos(*)').order('created_at', { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json((data || []).map(mapDbVehicle));
}

export async function POST(request: Request) {
  const context = await getStaffContext();
  if (!context) return NextResponse.json({ error: 'Staff authentication required.' }, { status: 401 });
  const form = await request.formData();
  const make = text(form.get('make')); const model = text(form.get('model')); const year = number(form.get('year')); const stock = text(form.get('stock_number')); const vin = text(form.get('vin'));
  const status = text(form.get('status')) || 'Draft';
  if (!make || !model || !year || !stock || !vin || number(form.get('price')) < 0 || number(form.get('mileage')) < 0) return NextResponse.json({ error: 'Year, make, model, stock number, VIN, price, and mileage are required.' }, { status: 400 });
  const imageUrl = text(form.get('image_url'));
  const files = form.getAll('photos').filter((entry): entry is File => entry instanceof File && entry.size > 0);
  if (status !== 'Draft' && !imageUrl && files.length === 0) return NextResponse.json({ error: 'A cover photo is required before publishing.' }, { status: 400 });
  const slug = `${slugify(`${year}-${make}-${model}-${stock}`)}`;
  const payload = {
    slug, year, make, model, trim: text(form.get('trim')), price: number(form.get('price')), mileage: number(form.get('mileage')), body_style: text(form.get('body_style')),
    status, stock_number: stock, vin, color: text(form.get('color')), engine: text(form.get('engine')), transmission: text(form.get('transmission')),
    drivetrain: text(form.get('drivetrain')), fuel_type: text(form.get('fuel_type')), description: text(form.get('description')), features: text(form.get('features')).split(',').map((item) => item.trim()).filter(Boolean),
    down_payment: form.get('down_payment') ? number(form.get('down_payment')) : null, featured: form.get('featured') === 'true', cover_image_url: imageUrl || null, created_by: context.user.id, sold_at: status === 'Sold' ? new Date().toISOString() : null,
  };
  const { data: inserted, error } = await context.supabase.from('vehicles').insert(payload).select().single();
  if (error || !inserted) return NextResponse.json({ error: error?.message || 'Unable to create vehicle.' }, { status: 400 });
  const uploaded: string[] = [];
  for (let index = 0; index < files.length; index += 1) {
    const file = files[index];
    const path = `${inserted.id}/${crypto.randomUUID()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, '-')}`;
    const upload = await context.supabase.storage.from('vehicle-photos').upload(path, file, { contentType: file.type || 'image/jpeg', upsert: false });
    if (upload.error) { await context.supabase.from('vehicles').delete().eq('id', inserted.id); return NextResponse.json({ error: upload.error.message }, { status: 400 }); }
    uploaded.push(path);
    const publicUrl = context.supabase.storage.from('vehicle-photos').getPublicUrl(path).data.publicUrl;
    const photo = await context.supabase.from('vehicle_photos').insert({ vehicle_id: inserted.id, storage_path: path, public_url: publicUrl, sort_order: index, is_cover: index === 0 && !imageUrl }).select().single();
    if (photo.error) return NextResponse.json({ error: photo.error.message }, { status: 400 });
    if (index === 0 && !imageUrl) await context.supabase.from('vehicles').update({ cover_image_url: publicUrl }).eq('id', inserted.id);
  }
  const { data: complete } = await context.supabase.from('vehicles').select('*, vehicle_photos(*)').eq('id', inserted.id).single();
  return NextResponse.json(complete ? mapDbVehicle(complete) : mapDbVehicle(inserted), { status: 201 });
}
