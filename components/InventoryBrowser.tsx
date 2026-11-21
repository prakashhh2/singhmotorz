'use client';

import { useEffect, useMemo, useState } from 'react';
import { Filter, Search, SlidersHorizontal, X } from 'lucide-react';
import { Vehicle } from '@/lib/data';
import { readVehicles } from '@/lib/demo-store';
import VehicleCard from './VehicleCard';

export default function InventoryBrowser({ initialVehicles }: { initialVehicles: Vehicle[] }) {
  const [all, setAll] = useState(initialVehicles);
  const [query, setQuery] = useState('');
  const [make, setMake] = useState('All makes');
  const [body, setBody] = useState('All body styles');
  const [budget, setBudget] = useState('Any budget');
  const [sort, setSort] = useState('Newest first');
  useEffect(() => { const update = () => setAll(readVehicles()); window.addEventListener('singh-vehicles-updated', update); return () => window.removeEventListener('singh-vehicles-updated', update); }, []);
  const makes = ['All makes', ...Array.from(new Set(all.map((v) => v.make)))];
  const results = useMemo(() => all.filter((v) => v.status !== 'Sold' && v.status !== 'Draft').filter((v) => `${v.make} ${v.model}`.toLowerCase().includes(query.toLowerCase())).filter((v) => make === 'All makes' || v.make === make).filter((v) => body === 'All body styles' || v.body === body).filter((v) => budget === 'Any budget' || v.price <= Number(budget)).sort((a, b) => sort === 'Lowest price' ? a.price - b.price : sort === 'Highest price' ? b.price - a.price : b.year - a.year), [all, query, make, body, budget, sort]);
  const clear = () => { setQuery(''); setMake('All makes'); setBody('All body styles'); setBudget('Any budget'); };
  return <><div className="filter-bar"><div className="search-field"><Search size={18} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search make or model" /></div><select value={make} onChange={(e) => setMake(e.target.value)}>{makes.map((item) => <option key={item}>{item}</option>)}</select><select value={body} onChange={(e) => setBody(e.target.value)}><option>All body styles</option><option>Sedan</option><option>SUV</option><option>Truck</option></select><select value={budget} onChange={(e) => setBudget(e.target.value)}><option>Any budget</option><option value="20000">Under $20,000</option><option value="25000">Under $25,000</option><option value="30000">Under $30,000</option></select><select value={sort} onChange={(e) => setSort(e.target.value)}><option>Newest first</option><option>Lowest price</option><option>Highest price</option></select><button className="filter-mobile"><SlidersHorizontal size={17} /> Filters</button></div><div className="results-row"><p>{results.length} vehicles available</p>{(query || make !== 'All makes' || body !== 'All body styles' || budget !== 'Any budget') && <button className="clear-button" onClick={clear}><X size={14} /> Clear filters</button>}</div>{results.length ? <div className="vehicle-grid">{results.map((vehicle) => <VehicleCard key={vehicle.id} vehicle={vehicle} />)}</div> : <div className="empty-state"><Filter size={27} /><h3>No vehicles match those filters</h3><p>Try widening your budget or clearing a filter to see more of our current inventory.</p><button className="button button-dark" onClick={clear}>Reset filters</button></div>}</>;
}
