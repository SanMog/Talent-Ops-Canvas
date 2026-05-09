import {
  DndContext,
  DragOverlay as DragOverlayCmp,
  PointerSensor,
  closestCorners,
  type DragEndEvent,
  type Modifier,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { useMemo, useState } from 'react';
import { PIPELINE_STAGES } from '../constants/stages';
import { useRecruitingStore } from '../store/useRecruitingStore';
import type { Candidate, StageId } from '../types';
import { StageColumn } from './StageColumn';

// Centers the DragOverlay on the cursor regardless of where the grab initiated.
// Must be defined after imports to satisfy ES module style.
const snapCenterToCursor: Modifier = ({ activatorEvent, draggingNodeRect, transform }) => {
  if (!draggingNodeRect || !activatorEvent) return transform;
  const x =
    activatorEvent instanceof MouseEvent
      ? activatorEvent.clientX
      : activatorEvent instanceof TouchEvent
        ? activatorEvent.touches[0].clientX
        : null;
  const y =
    activatorEvent instanceof MouseEvent
      ? activatorEvent.clientY
      : activatorEvent instanceof TouchEvent
        ? activatorEvent.touches[0].clientY
        : null;
  if (x == null || y == null) return transform;
  return {
    ...transform,
    x: transform.x + x - draggingNodeRect.left - draggingNodeRect.width / 2,
    y: transform.y + y - draggingNodeRect.top - draggingNodeRect.height / 2,
  };
};

function resolveTargetStage(candidates: Candidate[], overId: string | undefined): StageId | null {
  if (!overId) return null;
  if (PIPELINE_STAGES.some((s) => s.id === overId)) return overId as StageId;
  const hovered = candidates.find((c) => c.id === overId);
  return hovered?.stageId ?? null;
}

export function PipelineBoard() {
  const candidates = useRecruitingStore((s) => s.candidates);
  const search = useRecruitingStore((s) => s.search);
  const stageFilter = useRecruitingStore((s) => s.stageFilter);
  const moveCandidateToStage = useRecruitingStore((s) => s.moveCandidateToStage);
  const deleteCandidate = useRecruitingStore((s) => s.deleteCandidate);
  const openDrawer = useRecruitingStore((s) => s.openDrawer);
  const setSearch = useRecruitingStore((s) => s.setSearch);
  const setStageFilter = useRecruitingStore((s) => s.setStageFilter);

  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 6 },
    }),
  );

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return candidates.filter((c) => {
      if (stageFilter !== 'all' && c.stageId !== stageFilter) return false;
      if (!q) return true;
      const blob = `${c.name} ${c.email} ${c.position} ${c.tags.join(' ')}`.toLowerCase();
      return blob.includes(q);
    });
  }, [candidates, search, stageFilter]);

  const byStage = useMemo(() => {
    const map = new Map<StageId, Candidate[]>();
    PIPELINE_STAGES.forEach((s) => map.set(s.id, []));
    for (const c of filtered) {
      map.get(c.stageId)!.push(c);
    }
    return map;
  }, [filtered]);

  const activeCandidate = useMemo(
    () => (activeId ? candidates.find((c) => c.id === activeId) : undefined),
    [activeId, candidates],
  );

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveId(null);
    const { active, over } = event;
    if (!over) return;
    const candidateId = String(active.id);
    const target = resolveTargetStage(candidates, String(over.id));
    if (!target) return;
    moveCandidateToStage(candidateId, target);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={({ active }) => setActiveId(String(active.id))}
      onDragCancel={() => setActiveId(null)}
      onDragEnd={handleDragEnd}
    >
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, role, or email..."
          className="min-w-[200px] flex-1 rounded-lg border border-white/10 bg-black/35 px-3 py-2 text-sm text-neutral-100 outline-none placeholder:text-neutral-600 focus:border-emerald-400/55"
        />
        <select
          value={stageFilter}
          onChange={(e) => setStageFilter(e.target.value as StageId | 'all')}
          className="rounded-lg border border-white/10 bg-black/35 px-3 py-2 text-sm text-neutral-100 outline-none focus:border-emerald-400/55"
        >
          <option value="all">All stages</option>
          {PIPELINE_STAGES.map((s) => (
            <option key={s.id} value={s.id}>{s.label}</option>
          ))}
        </select>
        {(search || stageFilter !== 'all') && (
          <button
            type="button"
            onClick={() => { setSearch(''); setStageFilter('all'); }}
            className="rounded-lg border border-white/10 bg-black/35 px-3 py-2 text-sm text-neutral-400 transition hover:border-white/30 hover:text-neutral-200"
          >
            ✕ Clear
          </button>
        )}
      </div>

      {/* overflow-x-auto makes board horizontally scrollable on mobile;
          minmax(210px,1fr) keeps each column readable at any viewport width */}
      <div className="overflow-x-auto">
      <div
        className="grid gap-2 pb-2"
        style={{ gridTemplateColumns: `repeat(${PIPELINE_STAGES.length}, minmax(210px, 1fr))` }}
      >
        {PIPELINE_STAGES.map((stage) => {
          const list = byStage.get(stage.id) ?? [];
          const total = candidates.length;
          return (
            <StageColumn
              key={stage.id}
              stageId={stage.id}
              label={stage.label}
              subtitle={`${list.length} candidate${list.length !== 1 ? 's' : ''} in view`}
              candidates={list}
              totalInSystem={total}
              onOpen={openDrawer}
              onDelete={deleteCandidate}
            />
          );
        })}
      </div>
      </div>
      <DragOverlayCmp modifiers={[snapCenterToCursor]}>
        {activeCandidate ? (
          <div className="pointer-events-none w-[230px] scale-[1.02] rounded-lg border border-emerald-400/40 bg-[#151a23] p-4 shadow-2xl">
            <div className="font-medium text-neutral-50">{activeCandidate.name}</div>
            <div className="mt-2 text-[11px] uppercase tracking-[0.15em] text-neutral-400">
              {activeCandidate.position}
            </div>
          </div>
        ) : null}
      </DragOverlayCmp>
    </DndContext>
  );
}
