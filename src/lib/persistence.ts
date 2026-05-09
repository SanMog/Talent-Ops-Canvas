import type { PersistedSlice } from '../types';

const STORAGE_KEY = 'recruiting-dashboard:v1';

// DEMO MODE: данные хранятся в localStorage.
// При подключении Supabase замените реализации load/save вызовами API из src/lib/supabase.ts.
export const recruitingStorage = {
  load(): PersistedSlice | null {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      return JSON.parse(raw) as PersistedSlice;
    } catch {
      return null;
    }
  },
  save(slice: PersistedSlice) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(slice));
  },
};

// Stub для удалённой синхронизации (no-op в Demo Mode).
// При включении Supabase реализуйте здесь upsert через supabase.from('candidates').
export async function persistToRemote(_slice: PersistedSlice): Promise<void> {
  // TODO: реализовать при подключении Supabase
}
