create table if not exists carts (
    id bigserial primary key,
    user_id bigint not null,
    status varchar(20) not null,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    constraint fk_carts_user foreign key (user_id) references users(id)
);

create table if not exists cart_items (
    id bigserial primary key,
    cart_id bigint not null,
    plant_id bigint not null,
    qty int not null check (qty > 0),
    unit_price_cents int not null check (unit_price_cents >= 0),
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    constraint fk_cart_items_cart foreign key (cart_id) references carts(id) on delete cascade,
    constraint fk_cart_items_plant foreign key (plant_id) references plants(id),
    constraint uq_cart_plant unique (cart_id, plant_id)
);

create index if not exists idx_carts_user_status on carts(user_id, status);
create index if not exists idx_cart_items_cart on cart_items(cart_id);
