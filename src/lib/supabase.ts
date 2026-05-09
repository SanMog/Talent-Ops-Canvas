/**
 * supabase.ts — точка подключения к Supabase.
 *
 * DEMO MODE (текущее состояние):
 *   SUPABASE_ENABLED = false — все данные живут в localStorage.
 *   Данные из seed.ts отображаются как «демонстрационный снимок».
 *
 * Чтобы включить Supabase:
 *   1. npm install @supabase/supabase-js
 *   2. Создайте .env.local с VITE_SUPABASE_URL и VITE_SUPABASE_ANON_KEY
 *   3. Установите SUPABASE_ENABLED = true и раскомментируйте createClient
 */

// import { createClient, SupabaseClient } from '@supabase/supabase-js'

// const supabaseUrl  = import.meta.env.VITE_SUPABASE_URL  as string
// const supabaseKey  = import.meta.env.VITE_SUPABASE_ANON_KEY as string

// export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey)

export const SUPABASE_ENABLED = false as const

/**
 * Заглушка — заменяется настоящим клиентом при включении Supabase.
 * Использование: `if (SUPABASE_ENABLED) { await supabase!.from('candidates')... }`
 */
export const supabase = null

// ---------------------------------------------------------------------------
// Схема таблиц (Supabase SQL — запустите в SQL Editor вашего проекта)
// ---------------------------------------------------------------------------
//
// create table candidates (
//   id             text primary key,
//   name           text not null,
//   email          text,
//   position       text,
//   stage_id       text not null,
//   created_at     timestamptz default now(),
//   entered_stage_at timestamptz default now(),
//   tags           text[]  default '{}',
//   notes          text    default '',
//   spell_totals   jsonb   default '{}'
// );
//
// create table activities (
//   id           text primary key,
//   at           timestamptz not null,
//   kind         text not null,
//   message      text not null,
//   candidate_id text references candidates(id) on delete set null
// );
//
// -- Row-Level Security (включите после проверки):
// alter table candidates enable row level security;
// alter table activities  enable row level security;
