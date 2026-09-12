-- ====================================================================
-- TalentIQ Connect (SIH26044) - Supabase PostgreSQL Database Schema
-- National Autonomous Academia-Industry Collaboration & Skill Mapping OS
-- ====================================================================

-- Enable UUID Extension
create extension if not exists "uuid-ossp";

-- 1. USERS TABLE
create table if not exists public.users (
  id text primary key,
  email text unique not null,
  name text not null,
  role text not null check (role in ('STUDENT', 'INDUSTRY', 'TPO', 'FACULTY', 'GOVERNMENT', 'MENTOR')),
  avatar text,
  institution text,
  department text,
  state text default 'Delhi',
  apaar_id text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. STUDENT DIGITAL TWINS (Living Multidimensional Competency Vectors)
create table if not exists public.student_twins (
  id uuid default uuid_generate_v4() primary key,
  user_id text references public.users(id) on delete cascade,
  apaar_id text not null,
  digilocker_verified boolean default true,
  readiness_score integer default 78,
  clinical_rotations integer default 45,
  verified_credits integer default 8,
  competency_radar jsonb default '{
    "clinical_diagnostics": 4,
    "dravyaguna_pharmacology": 4,
    "ich_gcp_trials": 3,
    "biostatistics": 2,
    "botanical_extraction": 4,
    "roga_nidana": 4,
    "medical_sanskrit": 5,
    "patient_observation": 4
  }'::jsonb,
  active_gaps jsonb default '["ICH-GCP Protocol Level 3", "Biostatistical Reporting"]'::jsonb,
  bridge_courses jsonb default '["NPTEL 4-Week GCP Bridge", "SWAYAM Biostatistics"]'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. INDUSTRY JOB & INTERNSHIP POSTINGS
create table if not exists public.jobs (
  id uuid default uuid_generate_v4() primary key,
  company_name text not null,
  title text not null,
  department text not null,
  location text not null,
  type text not null default 'Internship',
  duration text default '6 Months',
  stipend text default '₹25,000 / month',
  dbt_eligible boolean default true,
  required_skills jsonb default '["Ayurvedic Diagnostics", "ICH-GCP Trials"]'::jsonb,
  description text not null,
  posted_by text references public.users(id),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. EXPLAINABLE MATCH APPLICATIONS
create table if not exists public.applications (
  id uuid default uuid_generate_v4() primary key,
  job_id uuid references public.jobs(id) on delete cascade,
  student_id text references public.users(id) on delete cascade,
  match_score integer not null,
  explainable_breakdown jsonb not null default '{
    "skill_fit": 56.4,
    "proficiency_fit": 18.2,
    "eligibility_fit": 10.0,
    "preference_fit": 8.0
  }'::jsonb,
  status text not null default 'Applied' check (status in ('Applied', 'Shortlisted', 'Interviewing', 'Offered', 'Placed', 'Completed')),
  abc_credits_deposited integer default 0,
  mentor_rating numeric(3, 2),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 5. FACULTY CURRICULUM SYLLABI & BRIDGE MODULES
create table if not exists public.curricula (
  id uuid default uuid_generate_v4() primary key,
  course_code text not null,
  course_name text not null,
  department text not null,
  aicte_ncism_aligned boolean default true,
  industry_gap_index numeric(4, 1) default 18.5,
  recommended_bridge text,
  last_analyzed timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 6. DIRECT BENEFIT TRANSFER (DBT) & STIPEND DISBURSEMENTS
create table if not exists public.dbt_disbursements (
  id uuid default uuid_generate_v4() primary key,
  transaction_ref text unique not null,
  student_id text references public.users(id),
  amount integer not null,
  month text not null,
  status text not null default 'SUCCESS',
  bank_reference text not null,
  disbursed_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table public.users enable row level security;
alter table public.student_twins enable row level security;
alter table public.jobs enable row level security;
alter table public.applications enable row level security;
alter table public.curricula enable row level security;
alter table public.dbt_disbursements enable row level security;

-- Public read policies for demo evaluation
create policy "Allow public read users" on public.users for select using (true);
create policy "Allow public read student_twins" on public.student_twins for select using (true);
create policy "Allow public read jobs" on public.jobs for select using (true);
create policy "Allow public read applications" on public.applications for select using (true);
create policy "Allow public read curricula" on public.curricula for select using (true);
create policy "Allow public read dbt_disbursements" on public.dbt_disbursements for select using (true);
