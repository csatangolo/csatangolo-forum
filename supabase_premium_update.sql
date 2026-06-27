-- Supabase kiegészítés a prémium főoldalhoz és jogosultságokhoz
-- Supabase → SQL Editor → New query → Run

alter table if exists registrations enable row level security;
alter table if exists participants enable row level security;

drop policy if exists "allow registration insert" on registrations;
drop policy if exists "allow participant insert" on participants;
drop policy if exists "allow public registration insert" on registrations;
drop policy if exists "allow public participant insert" on participants;

create policy "allow registration insert"
on registrations for insert
to anon
with check (true);

create policy "allow participant insert"
on participants for insert
to anon
with check (true);

create or replace function public_participant_count()
returns integer
language sql
security definer
set search_path = public
as $$
  select count(*)::integer from participants;
$$;

grant execute on function public_participant_count() to anon;
