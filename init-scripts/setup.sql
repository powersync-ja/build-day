-- TODO change this if changing the DB connection name
\connect postgres;

-- Create tables
  create table public.messages (
    id uuid not null default gen_random_uuid (),
    created_at timestamp with time zone not null default now(),
    message text not null,
    name text not null,
    "group" int not null default 1,
    constraint messages_pkey primary key (id)
  );

-- Create publication for PowerSync
create publication powersync for table messages;
