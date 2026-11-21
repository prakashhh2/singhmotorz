'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Clock3, MapPin, Phone } from 'lucide-react';
import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import VehicleCard from '@/components/VehicleCard';
import { Vehicle, vehicles } from '@/lib/data';
import { readVehicles } from '@/lib/demo-store';

export default function Home() {
  const [all, setAll] = useState<Vehicle[]>(vehicles);
  useEffect(() => { const update = () => setAll(readVehicles()); window.addEventListener('singh-vehicles-updated', update); return () => window.removeEventListener('singh-vehicles-updated', update); }, []);
  const featured = all.filter((v) => v.featured && v.status !== 'Sold');
  return <><Header /><main><section className="hero"><div className="shell hero-inner"><div><p className="eyebrow">Independent dealership · Tickfaw, Louisiana</p><h1>Shop used cars in Tickfaw, LA.</h1><p className="hero-copy">Good cars, straightforward prices, and a team that treats your time like it matters. Find your next ride without the runaround.</p><div className="hero-actions"><Link className="button button-green" href="/inventory">Browse inventory <ArrowRight size={17} /></Link><a className="button button-light" href="tel:9855550142"><Phone size={16} /> Call dealership</a></div></div><div className="hero-photo"><Image fill priority sizes="(max-width: 760px) 100vw, 45vw" src="https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=1200&q=85" alt="Black car parked outside a dealership" /><div className="hero-tag">Serving Tangipahoa Parish<span>Trusted locally since 2012</span></div></div></div></section><section className="section"><div className="shell"><div className="section-head"><div><p className="eyebrow">Fresh on the lot</p><h2>Featured vehicles</h2></div><Link className="text-link" href="/inventory">View all inventory →</Link></div><div className="vehicle-grid">{featured.map((vehicle) => <VehicleCard key={vehicle.id} vehicle={vehicle} />)}</div></div></section><section className="visit"><div className="shell visit-grid"><div><p className="eyebrow" style={{color:'#8bd5ab'}}>Come see us</p><h2>Take the stress out of your next car search.</h2><p>Every vehicle is hand-picked, priced clearly, and ready for a closer look. Stop by the lot or give us a call — we’re happy to help you find the right fit.</p><Link className="button button-light" href="/contact">Get directions <ArrowRight size={16} /></Link></div><div className="visit-details"><div className="visit-detail"><MapPin size={19} /><div><strong>Our lot</strong><span>123 Highway 1045<br />Tickfaw, LA 70466</span></div></div><div className="visit-detail"><Clock3 size={19} /><div><strong>Hours</strong><span>Mon–Fri 9am–6pm<br />Sat 9am–3pm · Sun closed</span></div></div><div className="visit-detail"><Phone size={19} /><div><strong>Call us</strong><span>(985) 555-0142</span></div></div></div></div></section></main><footer className="footer"><div className="shell footer-inner"><span>© 2024 Singh Motors. Demo site.</span><span>Quality cars. Clear answers.</span></div></footer></>;
}
