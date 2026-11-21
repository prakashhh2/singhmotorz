import { Vehicle, VehicleStatus } from './data';

type DbVehicle = Record<string, unknown> & { vehicle_photos?: Array<Record<string, unknown>> };

export function mapDbVehicle(row: DbVehicle): Vehicle {
  const photos = (row.vehicle_photos || []).sort((a, b) => Number(a.sort_order || 0) - Number(b.sort_order || 0));
  const images = photos.map((photo) => String(photo.public_url || '')).filter(Boolean);
  const image = String(row.cover_image_url || images[0] || '');
  return {
    id: String(row.id), slug: String(row.slug), year: Number(row.year), make: String(row.make), model: String(row.model), trim: String(row.trim || ''),
    price: Number(row.price), mileage: Number(row.mileage), body: String(row.body_style || ''), status: row.status as VehicleStatus,
    stock: String(row.stock_number || ''), vin: String(row.vin || ''), color: String(row.color || ''), image, images: images.length ? images : image ? [image] : [],
    featured: Boolean(row.featured), downPayment: row.down_payment == null ? undefined : Number(row.down_payment),
    description: String(row.description || ''), features: Array.isArray(row.features) ? row.features as string[] : [],
    engine: String(row.engine || ''), transmission: String(row.transmission || ''), drivetrain: String(row.drivetrain || ''), fuelType: String(row.fuel_type || ''),
    mpgCity: row.mpg_city == null ? undefined : Number(row.mpg_city), mpgHighway: row.mpg_highway == null ? undefined : Number(row.mpg_highway),
  };
}
