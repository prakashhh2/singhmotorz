# Singh Motors

A Next.js dealership site and demo staff dashboard for Singh Motors in Tickfaw, Louisiana.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. Public routes are `/`, `/inventory`, `/inventory/[slug]`, `/financing`, `/about`, and `/contact`. Staff views are `/admin/vehicles`, `/admin/leads`, and `/admin/settings`.

The current build uses clearly marked demo inventory and browser storage so the shopper → inquiry → staff workflow can be exercised without production services. Vehicle price and status changes made in the dashboard update the public inventory in the same browser. Reset browser site data to restore the seed inventory.

## Production work still required

Supabase Auth, Postgres migrations/RLS, private Storage uploads, rate-limited server inquiry handling, and optional Resend notifications are not connected because no project credentials or existing inventory integration were present. Add the values from `.env.example` before implementing those integrations. Verify the address, phone, hours, financing language, privacy/consent copy, and inventory source with the dealership before launch.
