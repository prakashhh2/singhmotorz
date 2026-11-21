'use client';

import { useState } from 'react';
import { Vehicle, vehicles as seed } from '@/lib/data';
import AdminVehicleManager from '@/components/AdminVehicleManager';

export default function AdminVehiclesPage() {
  const [list] = useState<Vehicle[]>(seed);
  return <><header className="admin-top"><span className="eyebrow" style={{margin:0}}>Staff dashboard / Inventory</span><span style={{fontSize:12,color:'var(--muted)'}}>Manage inventory</span></header><main className="admin-content"><AdminVehicleManager initialVehicles={list} /></main></>;
}
