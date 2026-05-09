import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { PIPELINE_STAGES } from '../constants/stages';
import { useRecruitingStore } from '../store/useRecruitingStore';
import type { Candidate, StageId } from '../types';

function emptyForm(): Pick<Candidate, 'name' | 'email' | 'position' | 'stageId' | 'notes' | 'tags'> {
  return {
    name: '',
    email: '',
    position: '',
    stageId: 'sourced',
    notes: '',
    tags: [],
  };
}

export function CandidateDrawer() {
  const drawerCandidateId = useRecruitingStore((s) => s.drawerCandidateId);
  const candidates = useRecruitingStore((s) => s.candidates);
  const openDrawer = useRecruitingStore((s) => s.openDrawer);
  const createCandidate = useRecruitingStore((s) => s.createCandidate);
  const updateCandidate = useRecruitingStore((s) => s.updateCandidate);
  const deleteCandidate = useRecruitingStore((s) => s.deleteCandidate);
  const moveCandidateToStage = useRecruitingStore((s) => s.moveCandidateToStage);

  const isCreate = drawerCandidateId === '__new';
  const candidate = useMemo(
    () => (!drawerCandidateId || isCreate ? undefined : candidates.find((c) => c.id === drawerCandidateId)),
    [candidates, drawerCandidateId, isCreate],
  );

  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (!drawerCandidateId) return;
    if (isCreate) {
      setForm(emptyForm());
      return;
    }
    if (!candidate) return;
    setForm({
      name: candidate.name,
      email: candidate.email,
      position: candidate.position,
      stageId: candidate.stageId,
      notes: candidate.notes,
      tags: candidate.tags,
    });
  }, [drawerCandidateId, isCreate, candidate]);

  if (!drawerCandidateId) return null;

  const title = isCreate ? 'New Candidate' : candidate?.name ?? 'Profile';

  const handleSave = () => {
    if (!form.name.trim() || !form.email.includes('@')) return;
    if (isCreate) {
      createCandidate({
        name: form.name.trim(),
        email: form.email.trim(),
        position: form.position.trim() || 'Role not specified',
        stageId: form.stageId,
        notes: form.notes.trim(),
        tags: form.tags,
      });
    } else if (candidate) {
      if (candidate.stageId !== form.stageId) {
        moveCandidateToStage(candidate.id, form.stageId);
      }

      const sameTags =
        candidate.tags.length === form.tags.length &&
        candidate.tags.every((t, i) => t === form.tags[i]);
      const profileChanged =
        candidate.name.trim() !== form.name.trim() ||
        candidate.email.trim() !== form.email.trim() ||
        candidate.position.trim() !== form.position.trim() ||
        candidate.notes.trim() !== form.notes.trim() ||
        !sameTags;

      if (profileChanged) {
        updateCandidate(candidate.id, {
          name: form.name.trim(),
          email: form.email.trim(),
          position: form.position.trim(),
          notes: form.notes.trim(),
          tags: form.tags,
        });
      }
    }
    openDrawer(null);
  };

  const handleDelete = () => {
    if (!candidate) return;
    if (typeof window !== 'undefined' && !window.confirm('Remove this candidate? This cannot be undone.')) return;
    deleteCandidate(candidate.id);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-stretch justify-end bg-black/55 backdrop-blur-sm">
      <div className="flex h-full w-full max-w-md flex-col border-l border-white/10 bg-[#0f1116] shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <div>
            <div className="text-[11px] uppercase tracking-[0.16em] text-neutral-500">Profile</div>
            <div className="text-lg font-semibold text-neutral-50">{title}</div>
          </div>
          <button
            type="button"
            onClick={() => openDrawer(null)}
            className="rounded-lg border border-white/10 px-3 py-1 text-sm text-neutral-300 hover:border-white/30"
          >
            Close
          </button>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto px-5 py-5">
          <Field label="Name">
            <input
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              className="w-full rounded-lg border border-white/10 bg-black/35 px-3 py-2 text-sm outline-none focus:border-emerald-400/55"
            />
          </Field>
          <Field label="Email">
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              className="w-full rounded-lg border border-white/10 bg-black/35 px-3 py-2 text-sm outline-none focus:border-emerald-400/55"
            />
          </Field>
          <Field label="Role">
            <input
              value={form.position}
              onChange={(e) => setForm((f) => ({ ...f, position: e.target.value }))}
              className="w-full rounded-lg border border-white/10 bg-black/35 px-3 py-2 text-sm outline-none focus:border-emerald-400/55"
            />
          </Field>
          <Field label="Stage">
            <select
              value={form.stageId}
              onChange={(e) => setForm((f) => ({ ...f, stageId: e.target.value as StageId }))}
              className="w-full rounded-lg border border-white/10 bg-black/35 px-3 py-2 text-sm outline-none focus:border-emerald-400/55"
            >
              {PIPELINE_STAGES.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Tags (comma-separated)">
            <input
              value={form.tags.join(', ')}
              onChange={(e) =>
                setForm((f) => ({
                  ...f,
                  tags: e.target.value
                    .split(',')
                    .map((t) => t.trim())
                    .filter(Boolean),
                }))
              }
              className="w-full rounded-lg border border-white/10 bg-black/35 px-3 py-2 text-sm outline-none focus:border-emerald-400/55"
            />
          </Field>
          <Field label="Notes">
            <textarea
              value={form.notes}
              onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
              rows={4}
              className="w-full rounded-lg border border-white/10 bg-black/35 px-3 py-2 text-sm outline-none focus:border-emerald-400/55"
            />
          </Field>
          {!isCreate && candidate && (
            <Field label="System info">
              <div className="rounded-lg border border-white/10 bg-black/35 px-3 py-3 text-[12px] text-neutral-500">
                <div>Created {new Date(candidate.createdAt).toLocaleDateString('en-US')}</div>
                <div>In current stage since {new Date(candidate.enteredStageAt).toLocaleString('en-US')}</div>
              </div>
            </Field>
          )}
        </div>

        <div className="flex items-center gap-3 border-t border-white/10 px-5 py-4">
          <button
            type="button"
            onClick={() => openDrawer(null)}
            className="flex-1 rounded-lg border border-white/10 px-3 py-2 text-sm hover:border-white/30"
          >
            Cancel
          </button>
          {!isCreate && candidate && (
            <button
              type="button"
              onClick={handleDelete}
              className="rounded-lg border border-rose-400/55 px-3 py-2 text-sm text-rose-200 hover:bg-rose-400/15"
            >
              Remove
            </button>
          )}
          <button
            type="button"
            onClick={handleSave}
            className="flex-1 rounded-lg bg-emerald-400 px-4 py-2 text-sm font-semibold text-neutral-900 hover:bg-emerald-300"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="block space-y-2 text-[12px] text-neutral-300">
      <div className="text-[11px] uppercase tracking-[0.18em] text-neutral-500">{label}</div>
      {children}
    </label>
  );
}
