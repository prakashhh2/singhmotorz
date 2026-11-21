import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import VehicleDetail from '@/components/VehicleDetail';
import { vehicles } from '@/lib/data';
import { mapDbVehicle } from '@/lib/vehicle-mapper';
import { supabaseConfigured } from '@/lib/supabase/config';
import { createSupabaseServerClient } from '@/lib/supabase/server';

export function generateStaticParams() { return vehicles.map((vehicle) => ({ slug: vehicle.slug })); }

export default async function VehiclePage({ params }: { params: { slug: string } }) {
  let vehicle = vehicles.find((item) => item.slug === params.slug);
  if (supabaseConfigured) {
    const { data } = await createSupabaseServerClient().from('vehicles').select('*, vehicle_photos(*)').eq('slug', params.slug).neq('status', 'Draft').maybeSingle();
    if (data) vehicle = mapDbVehicle(data);
  }
  if (!vehicle) notFound();
  return <><Header /><VehicleDetail initialVehicle={vehicle} /></>;
}
