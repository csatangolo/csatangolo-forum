-- Csatangoló Fórum adatbázis táblák
-- Supabase → SQL Editor → New query → illeszd be → Run

create extension if not exists "pgcrypto";

create table if not exists registrations (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  event_name text,
  event_date date,
  main_name text not null,
  email text not null,
  phone text not null,
  city text,
  companions jsonb default '[]'::jsonb,
  has_children text,
  children_details text,
  child_programs jsonb default '[]'::jsonb,
  accommodation text,
  demo_interest text,
  demo_details text,
  speaker_question text,
  question_for text,
  topics jsonb default '[]'::jsonb,
  roles jsonb default '[]'::jsonb,
  intro text,
  source text,
  privacy_accepted boolean default false,
  media_accepted boolean default false
);

create table if not exists participants (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  registration_id uuid references registrations(id) on delete cascade,
  participant_code text unique not null,
  name text not null,
  type text,
  email_contact text,
  phone_contact text,
  city text,
  checked_in boolean default false,
  checked_in_at timestamptz,
  contribution_paid boolean default false,
  note text
);

alter table registrations enable row level security;
alter table participants enable row level security;

drop policy if exists "allow public registration insert" on registrations;
drop policy if exists "allow public participant insert" on participants;

create policy "allow public registration insert"
on registrations for insert
to anon
with check (true);

create policy "allow public participant insert"
on participants for insert
to anon
with check (true);

-- Ellenőrzéshez a Supabase felületén:
-- Table Editor → registrations
-- Table Editor → participants
