export type StageId =
  | 'sourced'
  | 'screened'
  | 'phone'
  | 'onsite'
  | 'offer'
  | 'hired';

export type ActivityKind = 'move' | 'create' | 'update' | 'delete';

export interface StageSpellTotals {
  completedMs: number;
  completedSpells: number;
}

export interface Candidate {
  id: string;
  name: string;
  email: string;
  position: string;
  stageId: StageId;
  createdAt: string;
  enteredStageAt: string;
  tags: string[];
  notes: string;
  spellTotals: Partial<Record<StageId, StageSpellTotals>>;
}

export interface ActivityEntry {
  id: string;
  at: string;
  kind: ActivityKind;
  message: string;
  candidateId?: string;
}

export interface PersistedSlice {
  candidates: Candidate[];
  activities: ActivityEntry[];
}
