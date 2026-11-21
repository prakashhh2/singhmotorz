import { Vehicle } from './data';
import { readVehicles } from './demo-store';
import { supabaseConfigured } from './supabase/config';

export async function fetchPublicVehicles(): Promise<Vehicle[]> {
  if (!supabaseConfigured) return readVehicles();
  try {
    const response = await fetch('/api/vehicles', { cache: 'no-store' });
    if (!response.ok) throw new Error('Unable to load inventory');
    return await response.json();
  } catch { return readVehicles(); }
}
