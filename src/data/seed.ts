import { PIPELINE_STAGES } from '../constants/stages';
import type { ActivityEntry, Candidate, StageId } from '../types';

function iso(daysAgo: number) {
  return new Date(Date.now() - daysAgo * 86400000).toISOString();
}

export function seedCandidates(): Candidate[] {
  const staged: Pick<Candidate, 'name' | 'email' | 'position' | 'stageId'>[] = [
    { name: 'James Hartley', email: 'j.hartley@example.com', position: 'Backend', stageId: 'sourced' },
    { name: 'Megan Torres', email: 'm.torres@example.com', position: 'Frontend', stageId: 'sourced' },
    { name: 'Daniel Kovacs', email: 'd.kovacs@example.com', position: 'QA', stageId: 'screened' },
    { name: 'Elena Marsh', email: 'e.marsh@example.com', position: 'Product', stageId: 'screened' },
    { name: 'Ian Nicholson', email: 'i.nicholson@example.com', position: 'Backend', stageId: 'screened' },
    { name: 'Sophia Lee', email: 'sophia.lee@example.com', position: 'Data', stageId: 'phone' },
    { name: 'Aaron Brown', email: 'a.brown@example.com', position: 'DevOps', stageId: 'phone' },
    { name: 'Camila Reyes', email: 'c.reyes@example.com', position: 'UX', stageId: 'phone' },
    { name: 'Nathan Oliver', email: 'n.oliver@example.com', position: 'Backend', stageId: 'onsite' },
    { name: 'Paige Mitchell', email: 'p.mitchell@example.com', position: 'Marketing', stageId: 'offer' },
    { name: 'Owen Kane', email: 'o.kane@example.com', position: 'Finance', stageId: 'offer' },
    { name: 'Julie Kim', email: 'j.kim@example.com', position: 'Frontend', stageId: 'hired' },
    { name: 'Victor Almeida', email: 'v.almeida@example.com', position: 'Mobile', stageId: 'onsite' },
    { name: 'Rachel Hassan', email: 'r.hassan@example.com', position: 'HR BP', stageId: 'screened' },
    { name: 'Tyler Davidson', email: 't.davidson@example.com', position: 'Analytics', stageId: 'sourced' },
  ];

  let i = 0;
  const stageIndex: Record<StageId, number> = {
    sourced: 0, screened: 0, phone: 0, onsite: 0, offer: 0, hired: 0,
  };

  return staged.map((row, idx) => {
    const daysInStage =
      PIPELINE_STAGES.some((s) => s.id === row.stageId)
        ? 4 + (((i++) * 17) % 9) / (stageIndex[row.stageId]++ + 1)
        : 2;
    return {
      id: `cand-demo-${5400 + idx}`,
      ...row,
      createdAt: iso(18 + ((idx * 7) % 31)),
      enteredStageAt: iso(daysInStage),
      tags: [],
      notes: '',
      spellTotals: {},
    };
  });
}

export function bootstrapActivities(candidates: Candidate[]): ActivityEntry[] {
  return [
    {
      id: 'act-intro',
      at: iso(0),
      kind: 'create',
      message: `Loaded ${candidates.length} candidates from demo snapshot.`,
    },
  ];
}
