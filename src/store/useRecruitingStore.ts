import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { PIPELINE_STAGES } from '../constants/stages';
import { bootstrapActivities, seedCandidates } from '../data/seed';
import type { ActivityEntry, ActivityKind, Candidate, StageId } from '../types';

const DEMO = (() => {
  const candidates = seedCandidates();
  return { candidates, activities: bootstrapActivities(candidates) };
})();

function nowIso() {
  return new Date().toISOString();
}

function clampActivities(list: ActivityEntry[]) {
  const max = 300;
  if (list.length <= max) return list;
  return list.slice(list.length - max);
}

export interface RecruitingState {
  candidates: Candidate[];
  activities: ActivityEntry[];
  search: string;
  stageFilter: StageId | 'all';
  drawerCandidateId: string | null;
  addActivity: (kind: ActivityKind, message: string, candidateId?: string) => void;
  moveCandidateToStage: (candidateId: string, targetStageId: StageId) => void;
  createCandidate: (payload: Omit<Candidate, 'id' | 'createdAt' | 'enteredStageAt' | 'spellTotals'>) => Candidate;
  updateCandidate: (
    candidateId: string,
    payload: Partial<Pick<Candidate, 'name' | 'email' | 'position' | 'notes' | 'tags'>>,
  ) => void;
  deleteCandidate: (candidateId: string) => void;
  setSearch: (value: string) => void;
  setStageFilter: (value: StageId | 'all') => void;
  openDrawer: (candidateId: string | null) => void;
}

export const useRecruitingStore = create<RecruitingState>()(
  persist(
    (set, get) => ({
      ...DEMO,
      search: '',
      stageFilter: 'all',
      drawerCandidateId: null,

      addActivity(kind, message, candidateId) {
        set((state) => ({
          activities: clampActivities([
            ...state.activities,
            { id: `act-${crypto.randomUUID()}`, at: nowIso(), kind, message, candidateId },
          ]),
        }));
      },

      moveCandidateToStage(candidateId, targetStageId) {
        const cand = get().candidates.find((c) => c.id === candidateId);
        if (!cand || cand.stageId === targetStageId) return;

        const fromStage = PIPELINE_STAGES.find((s) => s.id === cand.stageId);
        const toStage = PIPELINE_STAGES.find((s) => s.id === targetStageId);

        const prevEntered = Date.parse(cand.enteredStageAt);
        const elapsed = Number.isFinite(prevEntered) ? Date.now() - prevEntered : 0;
        const fromId = cand.stageId;

        set((state) => {
          let moved: Candidate | null = null;
          const rest: Candidate[] = [];
          for (const c of state.candidates) {
            if (c.id !== candidateId) { rest.push(c); continue; }
            const prevTotals = { ...(c.spellTotals[fromId] ?? { completedMs: 0, completedSpells: 0 }) };
            prevTotals.completedMs += elapsed;
            prevTotals.completedSpells += 1;
            moved = { ...c, stageId: targetStageId, enteredStageAt: nowIso(), spellTotals: { ...c.spellTotals, [fromId]: prevTotals } };
          }
          return { candidates: moved ? [moved, ...rest] : rest };
        });

        const msg =
          `[${fromStage?.label}] → [${toStage?.label}] — ${cand.name}` +
          (elapsed > 0 ? ` (${(elapsed / 86400000).toFixed(1)} d at previous stage)` : '');
        get().addActivity('move', msg, candidateId);
      },

      createCandidate(payload) {
        const createdAt = nowIso();
        const candidate: Candidate = {
          id: `c-${crypto.randomUUID()}`,
          createdAt,
          enteredStageAt: createdAt,
          spellTotals: {},
          ...payload,
        };
        set((state) => ({
          candidates: [candidate, ...state.candidates],
        }));
        get().addActivity('create', `Created profile: ${candidate.name} (${candidate.position})`, candidate.id);
        return candidate;
      },

      updateCandidate(candidateId, payload) {
        const beforeName =
          get().candidates.find((c) => c.id === candidateId)?.name ?? 'Candidate';
        set((state) => ({
          candidates: state.candidates.map((c) =>
            c.id === candidateId
              ? {
                  ...c,
                  ...payload,
                  tags: payload.tags ?? c.tags,
                }
              : c,
          ),
        }));
        get().addActivity('update', `Profile updated (${beforeName})`, candidateId);
      },

      deleteCandidate(candidateId) {
        const cand = get().candidates.find((c) => c.id === candidateId);
        set((state) => ({
          candidates: state.candidates.filter((c) => c.id !== candidateId),
          drawerCandidateId: state.drawerCandidateId === candidateId ? null : state.drawerCandidateId,
        }));
        if (cand) {
          get().addActivity('delete', `Removed ${cand.name}`, candidateId);
        }
      },

      setSearch: (search) => set({ search }),
      setStageFilter: (stageFilter) => set({ stageFilter }),
      openDrawer: (drawerCandidateId) => set({ drawerCandidateId }),
    }),
    {
      name: 'recruiting-dashboard:v1',
      partialize: (state) => ({ candidates: state.candidates, activities: state.activities }),
      merge: (persisted, current) => {
        const patch = persisted as Partial<Pick<RecruitingState, 'candidates' | 'activities'>>;
        return {
          ...current,
          candidates: Array.isArray(patch?.candidates) ? patch.candidates : current.candidates,
          activities: Array.isArray(patch?.activities) ? patch.activities : current.activities,
        };
      },
    },
  ),
);
