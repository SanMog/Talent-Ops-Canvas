import { useDroppable } from '@dnd-kit/core';
import { memo } from 'react';
import type { Candidate, StageId } from '../types';
import { CandidateCard } from './CandidateCard';

type Props = {
  stageId: StageId;
  label: string;
  subtitle: string;
  candidates: Candidate[];
  totalInSystem: number;
  onOpen: (id: string) => void;
  onDelete: (id: string) => void;
};

export const StageColumn = memo(function StageColumn({ stageId, label, subtitle, candidates, totalInSystem, onOpen, onDelete }: Props) {
  const { setNodeRef, isOver } = useDroppable({ id: stageId });

  return (
    <div className="flex min-w-0 flex-col">
      <div className={`mb-2 flex flex-col rounded-lg border px-3 py-2 transition-colors duration-150 ${
        isOver ? 'border-emerald-400/40 bg-emerald-500/8' : 'border-white/10 bg-white/5'
      }`}>
        <div className={`text-[13px] font-semibold tracking-tight transition-colors duration-150 ${
          isOver ? 'text-emerald-200' : ''
        }`}>{label}</div>
        <div className="text-[11px] text-neutral-500">{subtitle}</div>
      </div>
      <div
        ref={setNodeRef}
        className={`column-scroll flex flex-1 flex-col gap-2 rounded-xl border px-3 py-3 transition-colors duration-150 ${
          isOver ? 'border-emerald-400/60 bg-emerald-500/10' : 'border-white/10 bg-black/35'
        }`}
      >
        {candidates.length === 0 && (
          <div className="select-none px-2 py-6 text-center text-[12px] text-neutral-500">
            Drop a card here
          </div>
        )}
        {candidates.map((c) => (
          <CandidateCard key={c.id} candidate={c} onOpen={onOpen} onDelete={onDelete} />
        ))}
      </div>
      <div className="mt-3 text-[11px] text-neutral-500">
        {candidates.length} in stage · {Math.round((candidates.length / Math.max(totalInSystem, 1)) * 100)}% of funnel
      </div>
    </div>
  );
});
