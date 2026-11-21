'use client';

import Link from 'next/link';
import { Menu, Phone } from 'lucide-react';
import { useState } from 'react';

export default function Header({ admin = false }: { admin?: boolean }) {
  const [open, setOpen] = useState(false);
  if (admin) return <header className="admin-top"><Link href="/" className="brand"><span className="brand-mark">SM</span><span>Singh <em>Motors</em></span></Link><Link className="back-link" href="/">View public site ↗</Link></header>;
  return <header className="site-header"><div className="shell nav-wrap"><Link href="/" className="brand"><span className="brand-mark">SM</span><span>Singh <em>Motors</em></span></Link><button className="menu-button" onClick={() => setOpen(!open)} aria-label="Toggle menu"><Menu size={22} /></button><nav className={open ? 'nav open' : 'nav'}><Link href="/inventory">Inventory</Link><Link href="/financing">Financing</Link><Link href="/about">About</Link><Link href="/contact">Contact</Link><a className="phone-link" href="tel:9855550142"><Phone size={15} /> (985) 555-0142</a></nav></div></header>;
}
