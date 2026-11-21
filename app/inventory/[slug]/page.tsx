import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import VehicleDetail from '@/components/VehicleDetail';
import { vehicles } from '@/lib/data';

export function generateStaticParams() { return vehicles.map((vehicle) => ({ slug: vehicle.slug })); }

export default function VehiclePage({ params }: { params: { slug: string } }) {
  const vehicle = vehicles.find((item) => item.slug === params.slug);
  if (!vehicle) notFound();
  return <><Header /><VehicleDetail initialVehicle={vehicle} /></>;
}
