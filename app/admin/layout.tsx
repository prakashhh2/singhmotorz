import Header from '@/components/Header';
import Link from 'next/link';
import { CarFront, ClipboardList, Settings } from 'lucide-react';
export const metadata = { robots: { index: false, follow: false } };
export default function AdminLayout({ children }: { children: React.ReactNode }) { return <div className="admin-shell"><aside className="admin-sidebar"><Header admin /><nav><Link className="active" href="/admin/vehicles"><CarFront size={16}/> Vehicles</Link><Link href="/admin/leads"><ClipboardList size={16}/> Leads</Link><Link href="/admin/settings"><Settings size={16}/> Settings</Link></nav><p style={{color:'#81958a',fontSize:11,lineHeight:1.5,margin:'45px 10px 0'}}>Demo dashboard<br/>Supabase auth pending</p></aside><div className="admin-main">{children}</div></div> }
