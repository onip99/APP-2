-- Schema per MVP Confronta Prezzi (Supabase)

create table if not exists retailers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  url text not null,
  logo_url text
);

create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  brand text not null,
  model text not null,
  category text not null,
  image_url text
);

create table if not exists offers (
  id uuid primary key default gen_random_uuid(),
  product_id uuid references products(id) on delete cascade not null,
  retailer_id uuid references retailers(id) on delete cascade not null,
  price numeric not null,
  currency text default '€',
  availability text,
  url text not null,
  updated_at timestamptz default now()
);

create table if not exists terms (
  id uuid primary key default gen_random_uuid(),
  retailer_id uuid references retailers(id) on delete cascade unique not null,
  warranty_months int,
  return_days int,
  shipping_days int,
  notes text
);

create table if not exists clicks (
  id uuid primary key default gen_random_uuid(),
  offer_id uuid references offers(id) on delete set null,
  ts timestamptz default now()
);

-- RLS
alter table retailers enable row level security;
alter table products enable row level security;
alter table offers enable row level security;
alter table terms enable row level security;
alter table clicks enable row level security;

-- Politiche: lettura pubblica su tutto tranne INSERT consentito solo su clicks
create policy "Public read retailers" on retailers for select using (true);
create policy "Public read products" on products for select using (true);
create policy "Public read offers" on offers for select using (true);
create policy "Public read terms" on terms for select using (true);

create policy "Public insert clicks" on clicks for insert with check (true);
create policy "Public read clicks" on clicks for select using (true);

-- Vista helper: prezzo minimo per prodotto
create or replace view v_products_min_price as
select
  p.*,
  (select o.price from offers o where o.product_id = p.id order by o.price asc limit 1) as min_price,
  (select o.currency from offers o where o.product_id = p.id order by o.price asc limit 1) as currency,
  (select r.name from offers o join retailers r on r.id = o.retailer_id where o.product_id = p.id order by o.price asc limit 1) as min_retailer
from products p;

-- Funzione RPC per Next.js
create or replace function products_with_min_price()
returns setof v_products_min_price
language sql
stable
as $$
  select * from v_products_min_price order by brand, model;
$$;
