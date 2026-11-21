'use client';

import { useState } from 'react';
import { Save } from 'lucide-react';

export default function SettingsPage() {
  const [phone, setPhone] = useState('(985) 555-0142');
  const [address, setAddress] = useState('123 Highway 1045, Tickfaw, LA 70466');
  const [hours, setHours] = useState('Mon–Fri 9am–6pm\nSat 9am–3pm · Sun closed');
  const [financing, setFinancing] = useState('We work with a range of lending partners to help qualified shoppers find an option that fits their budget.');
  const [saved, setSaved] = useState(false);
  function save() { localStorage.setItem('singh-motorz-demo-settings', JSON.stringify({ phone, address, hours, financing })); setSaved(true); }
  return <><header className="admin-top"><span className="eyebrow" style={{margin:0}}>Staff dashboard / Settings</span><span style={{fontSize:12,color:'var(--muted)'}}>Site settings</span></header><main className="admin-content"><div className="admin-heading"><div><h1>Settings</h1><p>Keep public dealership details accurate before launch.</p></div></div><div className="settings-card"><h2>Dealership details</h2><label>Phone<input value={phone} onChange={(e) => setPhone(e.target.value)} /></label><label>Address<input value={address} onChange={(e) => setAddress(e.target.value)} /></label><label>Hours<textarea value={hours} onChange={(e) => setHours(e.target.value)} /></label><label>Approved financing copy<textarea value={financing} onChange={(e) => setFinancing(e.target.value)} /></label><button className="button button-green" onClick={save}><Save size={16}/> {saved ? 'Saved' : 'Save settings'}</button></div></main></>;
}
