create table users (
  id bigserial primary key,
  name varchar(120) not null,
  email varchar(190) not null unique,
  password_hash varchar(255) not null,
  role varchar(20) not null,
  phone varchar(30),
  created_at timestamp not null default now()
);

create table plants (
  id bigserial primary key,
  name varchar(180) not null,
  description text,
  category varchar(80),
  price_cents integer not null,
  stock_qty integer not null default 0,
  is_active boolean not null default true,
  created_at timestamp not null default now()
);

create table plant_images (
  id bigserial primary key,
  plant_id bigint not null references plants(id) on delete cascade,
  url text not null
);

create table orders (
  id bigserial primary key,
  user_id bigint not null references users(id),
  order_status varchar(30) not null,
  payment_method varchar(20) not null,
  payment_status varchar(20) not null,
  fulfillment_method varchar(20) not null, -- DELIVERY or PICKUP
  delivery_address text,
  total_cents integer not null,
  created_at timestamp not null default now()
);

create table order_items (
  id bigserial primary key,
  order_id bigint not null references orders(id) on delete cascade,
  plant_id bigint not null references plants(id),
  qty integer not null,
  price_cents integer not null
);

create table payments (
  id bigserial primary key,
  order_id bigint not null references orders(id) on delete cascade,
  provider varchar(30) not null,          -- e.g., PAYHERE
  provider_ref varchar(120),
  status varchar(20) not null,            -- PENDING/PAID/FAILED
  amount_cents integer not null,
  created_at timestamp not null default now()
);

create index idx_plants_active on plants(is_active);
create index idx_orders_user on orders(user_id);
