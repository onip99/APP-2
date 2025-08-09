create table products (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  description text,
  image_url text
);

create table offers (
  id uuid primary key default uuid_generate_v4(),
  product_id uuid references products(id) on delete cascade,
  store_name text not null,
  price numeric not null,
  url text not null
);

create table clicks (
  id uuid primary key default uuid_generate_v4(),
  offer_id uuid references offers(id) on delete cascade,
  created_at timestamp default now()
);
