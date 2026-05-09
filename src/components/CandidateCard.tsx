import type { CSSProperties } from 'react';
import { memo } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import type { Candidate } from '../types';

type Props = {
  candidate: Candidate;
  onOpen: (id: string) => void;
  onDelete: (id: string) => void;
};

export const CandidateCard = memo(function CandidateCard({ candidate, onOpen, onDelete }: Props) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: candidate.id,
    data: { stageId: candidate.stageId },
  });

  // While dragging, keep the source card as an invisible in-place placeholder.
  // DragOverlay renders the floating ghost above all overflow containers.
  const style: CSSProperties = isDragging
    ? { opacity: 0, pointerEvents: 'none' }
    : { transform: CSS.Translate.toString(transform) };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="shadow-card group relative flex cursor-grab touch-none select-none gap-2 rounded-lg border border-white/10 bg-white/5 active:cursor-grabbing"
      {...listeners}
      {...attributes}
    >
      <div className="flex shrink-0 items-center rounded-l-lg border-r border-white/10 px-2 text-neutral-600">
        ∷
      </div>
      <button
        type="button"
        onClick={() => onOpen(candidate.id)}
        className="flex min-w-0 flex-1 flex-col py-3 pr-8 text-left transition hover:text-emerald-200"
      >
        <div className="truncate font-medium text-neutral-50">{candidate.name}</div>
        <div className="mt-1 text-[11px] uppercase tracking-[0.12em] text-neutral-400">
          {candidate.position}
        </div>
        <div className="mt-1 truncate text-[12px] text-neutral-500">{candidate.email}</div>
        {candidate.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {candidate.tags.map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/10 bg-black/35 px-2 py-0.5 text-[11px] text-neutral-400"
              >
                {t}
              </span>
            ))}
          </div>
        )}
      </button>
      <button
        type="button"
        onClick={() => {
          if (window.confirm(`Remove "${candidate.name}"?`)) onDelete(candidate.id);
        }}
        onPointerDown={(e) => e.stopPropagation()}
        className="absolute right-2 top-2 rounded p-1 text-neutral-500 transition hover:bg-rose-500/20 hover:text-rose-300"
        aria-label="Remove candidate"
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="3 6 5 6 21 6" />
          <path d="M19 6l-1 14H6L5 6" />
          <path d="M10 11v6M14 11v6" />
          <path d="M9 6V4h6v2" />
        </svg>
      </button>
    </div>
  );
});
