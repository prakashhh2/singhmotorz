'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CarFront, ClipboardList, ExternalLink, Settings } from 'lucide-react';

const links = [
  { href: '/admin/vehicles', label: 'Vehicles', hint: 'Inventory', icon: CarFront },
  { href: '/admin/leads', label: 'Leads', hint: 'Customer inquiries', icon: ClipboardList },
  { href: '/admin/settings', label: 'Settings', hint: 'Dealership details', icon: Settings },
];

export default function AdminNav() {
  const pathname = usePathname();
  return <><div className="admin-sidebar-brand"><span className="brand-mark">SM</span><div><strong>Singh Motors</strong><small>Staff portal</small></div></div><nav className="admin-nav">{links.map(({ href, label, hint, icon: Icon }) => { const active = pathname === href || pathname.startsWith(`${href}/`); return <Link className={active ? 'active' : ''} href={href} key={href}><Icon size={17}/><span><strong>{label}</strong><small>{hint}</small></span></Link>; })}</nav><div className="admin-sidebar-bottom"><Link href="/"><ExternalLink size={15}/> View public site</Link><p>Demo mode · Supabase auth ready</p></div></>;
}
