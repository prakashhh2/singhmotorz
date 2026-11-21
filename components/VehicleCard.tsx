import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Gauge, MapPin } from 'lucide-react';
import { Vehicle, miles, money } from '@/lib/data';

export default function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  return <Link href={`/inventory/${vehicle.slug}`} className="vehicle-card"><div className="vehicle-image"><Image fill sizes="(max-width: 760px) 100vw, 33vw" src={vehicle.image} alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`} /><span className={`status ${vehicle.status.toLowerCase()}`}>{vehicle.status}</span><span className="image-count">{vehicle.images.length} photos</span></div><div className="vehicle-card-body"><div className="card-title"><div><p className="eyebrow">{vehicle.year} {vehicle.make}</p><h3>{vehicle.model} <span>{vehicle.trim}</span></h3></div><ArrowUpRight size={20} /></div><div className="card-meta"><span><Gauge size={15} /> {miles(vehicle.mileage)}</span><span><MapPin size={15} /> {vehicle.body}</span></div><div className="card-price"><strong>{money(vehicle.price)}</strong>{vehicle.downPayment && <small>from {money(vehicle.downPayment)} down</small>}</div></div></Link>;
}
