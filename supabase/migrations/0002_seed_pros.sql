-- ClearTrack — seed the PRO reference list.
-- Admins can add more later (labels/PROs are still editable reference data),
-- but these cover the vast majority of US clearance work on day one.

insert into public.pros (name) values
  ('ASCAP'),
  ('BMI'),
  ('SESAC'),
  ('GMR'),
  ('SOCAN'),
  ('PRS for Music')
on conflict (name) do nothing;
