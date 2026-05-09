import { PIPELINE_STAGES } from '../constants/stages';
import type { Candidate, StageId } from '../types';

export function countsByStage(candidates: Candidate[]) {
  const map = new Map<StageId, number>();
  PIPELINE_STAGES.forEach((s) => map.set(s.id, 0));
  for (const c of candidates) {
    map.set(c.stageId, (map.get(c.stageId) ?? 0) + 1);
  }
  return map;
}

/** Последовательная конверсия: текущее количество на этапе k / количество на этапе k-1. */
export function stageConversionRates(candidates: Candidate[]) {
  const counts = PIPELINE_STAGES.map((s) => countsByStage(candidates).get(s.id) ?? 0);
  return PIPELINE_STAGES.map((stage, idx) => {
    if (idx === 0) return { stageId: stage.id, rate: counts[0] > 0 ? 1 : null };
    const prev = counts[idx - 1] ?? 0;
    const cur = counts[idx] ?? 0;
    const rate = prev > 0 ? cur / prev : null;
    return { stageId: stage.id, rate };
  });
}

/** Среднее время (дни), проведённые кандидатами на этапе по завершённым «заходам». */
export function avgDaysCompletedSpellByStage(candidates: Candidate[]): Map<StageId, number | null> {
  const result = new Map<StageId, number | null>();
  for (const s of PIPELINE_STAGES) {
    let totalMs = 0;
    let spells = 0;
    for (const c of candidates) {
      const t = c.spellTotals[s.id];
      if (!t || t.completedSpells === 0) continue;
      totalMs += t.completedMs;
      spells += t.completedSpells;
    }
    result.set(s.id, spells > 0 ? totalMs / spells / (1000 * 60 * 60 * 24) : null);
  }
  return result;
}
