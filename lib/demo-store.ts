import { Vehicle, vehicles } from './data';

const key = 'singh-motorz-demo-vehicles';

export function readVehicles(): Vehicle[] {
  if (typeof window === 'undefined') return vehicles;
  const saved = window.localStorage.getItem(key);
  return saved ? JSON.parse(saved) : vehicles;
}

export function saveVehicles(next: Vehicle[]) {
  window.localStorage.setItem(key, JSON.stringify(next));
  window.dispatchEvent(new Event('singh-vehicles-updated'));
}

export function saveInquiry(inquiry: { name: string; email: string; phone: string; message: string; vehicleId?: string }) {
  const saved = JSON.parse(window.localStorage.getItem('singh-motorz-demo-leads') || '[]');
  window.localStorage.setItem('singh-motorz-demo-leads', JSON.stringify([{ ...inquiry, id: Date.now(), createdAt: new Date().toISOString(), status: 'New' }, ...saved]));
}
