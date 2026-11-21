import Header from '@/components/Header';
import InventoryBrowser from '@/components/InventoryBrowser';
import { vehicles } from '@/lib/data';

export default function InventoryPage() { return <><Header /><main className="shell"><section className="page-intro"><p className="eyebrow">Our current lot</p><h1>Find your next vehicle.</h1><p>Browse our available pre-owned inventory. Every listing has clear pricing and the details you need to make a confident decision.</p><p style={{color:'var(--green)',fontSize:12,fontWeight:700}}>Demo inventory for review · replace with verified dealership vehicles before launch.</p></section><InventoryBrowser initialVehicles={vehicles} /></main><div style={{height:90}} /></> }
