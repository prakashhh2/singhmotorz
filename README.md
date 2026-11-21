# Singh Motors

A Next.js dealership site and demo staff dashboard for Singh Motors in Tickfaw, Louisiana.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. Public routes are `/`, `/inventory`, `/inventory/[slug]`, `/financing`, `/about`, and `/contact`. Staff views are `/admin/vehicles`, `/admin/leads`, and `/admin/settings`.

The current build uses clearly marked demo inventory and browser storage so the shopper → inquiry → staff workflow can be exercised without production services. Vehicle price and status changes made in the dashboard update the public inventory in the same browser. Reset browser site data to restore the seed inventory.

## Supabase setup

The app now has a dual-mode data layer:

- Without Supabase environment variables it keeps using demo inventory in browser storage.
- With Supabase configured it uses Postgres for vehicles, Auth for staff access, and the `vehicle-photos` Storage bucket for uploads.

1. Create a Supabase project and copy its URL and publishable key into a local `.env.local` file:

```bash
cp .env.example .env.local
```

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
SUPABASE_SERVICE_ROLE_KEY=server-only-value
```

Do not expose or commit `SUPABASE_SERVICE_ROLE_KEY`.

2. Install and authenticate the Supabase CLI, then link and apply the migration:

```bash
supabase login
supabase link --project-ref your-project-ref
supabase db push
```

The migration at `supabase/migrations/202611210001_inventory.sql` creates vehicle records, photo records, staff profiles, indexes, Row Level Security policies, and the `vehicle-photos` Storage bucket.

3. In Supabase Dashboard → Authentication, create the first staff user. Copy that user’s UUID, then run this in the SQL Editor:

```sql
insert into public.staff_profiles (user_id, role)
values ('AUTH_USER_UUID_HERE', 'manager');
```

4. Open `/admin/login` and sign in. The staff inventory screen supports:

- Creating Draft, Available, Pending, or Sold vehicles
- Uploading multiple photos to Supabase Storage
- Selecting several vehicles and changing their status together
- Publishing only when required vehicle fields and a cover photo exist
- Deleting vehicles and their stored photos
- Updating price and featured status

The public inventory routes automatically read published Supabase vehicles. Drafts remain staff-only through RLS and the admin middleware.

## Inventory source

The current data-entry workflow is manual and includes common CarMax-style fields: VIN, stock number, year, make, model, trim, price, mileage, body style, color, engine, transmission, drivetrain, fuel type, MPG, features, description, featured flag, and photos.

There is no CarMax feed/API integration in this project. Before launch, confirm whether Singh Motors has a DMS, dealer website feed, CSV export, or approved inventory provider. Build an importer only after that source and its API/export permissions are known.

## Production checklist

Supabase is now wired for inventory, photos, and staff access. Rate-limited inquiry submission, Resend notifications, audit history for price/status changes, and dealership-approved privacy/consent copy still need to be completed before launch. Verify the address, phone, hours, financing language, and inventory source with the dealership.
