-- BIZTOS JAVÍTÓ SQL – ezt Supabase SQL Editorban lehet lefuttatni.
-- Ha már létrejöttek a táblák, nem baj, ez csak a jogosultságokat rendezi.

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
