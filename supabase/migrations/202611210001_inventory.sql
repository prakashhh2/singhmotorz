create extension if not exists "pgcrypto";

create table if not exists public.staff_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'staff' check (role in ('staff', 'manager')),
  created_at timestamptz not null default now()
);

create or replace function public.is_staff()
returns boolean language sql security definer set search_path = public
as $$ select exists (select 1 from public.staff_profiles where user_id = auth.uid()); $$;

create table if not exists public.vehicles (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  year integer not null check (year between 1886 and 2100),
  make text not null,
  model text not null,
  trim text not null default '',
  price numeric(12,2) not null check (price >= 0),
  mileage integer not null default 0 check (mileage >= 0),
  body_style text not null default '',
  status text not null default 'Draft' check (status in ('Draft', 'Available', 'Pending', 'Sold')),
  stock_number text not null unique,
  vin text not null unique,
  color text not null default '',
  engine text not null default '',
  transmission text not null default '',
  drivetrain text not null default '',
  fuel_type text not null default '',
  mpg_city integer,
  mpg_highway integer,
  description text not null default '',
  features jsonb not null default '[]'::jsonb,
  down_payment numeric(12,2),
  featured boolean not null default false,
  cover_image_url text,
  created_by uuid references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  sold_at timestamptz
);

create table if not exists public.vehicle_photos (
  id uuid primary key default gen_random_uuid(),
  vehicle_id uuid not null references public.vehicles(id) on delete cascade,
  storage_path text not null unique,
  public_url text not null,
  sort_order integer not null default 0,
  is_cover boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists vehicles_status_idx on public.vehicles(status);
create index if not exists vehicles_make_idx on public.vehicles(make);
create index if not exists vehicle_photos_vehicle_idx on public.vehicle_photos(vehicle_id, sort_order);

alter table public.staff_profiles enable row level security;
alter table public.vehicles enable row level security;
alter table public.vehicle_photos enable row level security;

drop policy if exists "public can read published vehicles" on public.vehicles;
create policy "public can read published vehicles" on public.vehicles for select using (status <> 'Draft' or public.is_staff());
drop policy if exists "staff manage vehicles" on public.vehicles;
create policy "staff manage vehicles" on public.vehicles for all using (public.is_staff()) with check (public.is_staff());

drop policy if exists "public can read published vehicle photos" on public.vehicle_photos;
create policy "public can read published vehicle photos" on public.vehicle_photos for select using (exists (select 1 from public.vehicles where id = vehicle_id and (status <> 'Draft' or public.is_staff())));
drop policy if exists "staff manage vehicle photos" on public.vehicle_photos;
create policy "staff manage vehicle photos" on public.vehicle_photos for all using (public.is_staff()) with check (public.is_staff());

insert into storage.buckets (id, name, public) values ('vehicle-photos', 'vehicle-photos', true) on conflict (id) do nothing;
drop policy if exists "public read vehicle photos" on storage.objects;
create policy "public read vehicle photos" on storage.objects for select using (bucket_id = 'vehicle-photos');
drop policy if exists "staff upload vehicle photos" on storage.objects;
create policy "staff upload vehicle photos" on storage.objects for insert with check (bucket_id = 'vehicle-photos' and public.is_staff());
drop policy if exists "staff update vehicle photos" on storage.objects;
create policy "staff update vehicle photos" on storage.objects for update using (bucket_id = 'vehicle-photos' and public.is_staff());
drop policy if exists "staff delete vehicle photos" on storage.objects;
create policy "staff delete vehicle photos" on storage.objects for delete using (bucket_id = 'vehicle-photos' and public.is_staff());

create or replace function public.touch_vehicle_updated_at()
returns trigger language plpgsql as $$ begin new.updated_at = now(); return new; end; $$;
drop trigger if exists vehicles_touch_updated_at on public.vehicles;
create trigger vehicles_touch_updated_at before update on public.vehicles for each row execute function public.touch_vehicle_updated_at();
