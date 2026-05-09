import { useMemo, useState } from 'react';
import { PIPELINE_STAGES } from '../constants/stages';
import { useRecruitingStore } from '../store/useRecruitingStore';
import type { StageId } from '../types';

export function Toolbar() {
  const createCandidate = useRecruitingStore((s) => s.createCandidate);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [position, setPosition] = useState('');
  const [stageId, setStageId] = useState<StageId>('sourced');

  const canSubmit = useMemo(() => name.trim().length > 1, [name]);

  const handleQuickAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    createCandidate({
      name: name.trim(),
      email: email.trim() || `${name.trim().toLowerCase().replace(/\s+/g, '.')}@—`,
      position: position.trim() || 'Role not specified',
      stageId,
      tags: [],
      notes: '',
    });
    setName('');
    setEmail('');
    setPosition('');
  };

  return (
    <form
      onSubmit={handleQuickAdd}
      className="flex flex-wrap items-center gap-2 rounded-xl border border-white/10 bg-white/5 p-3"
    >
      <span className="text-[11px] uppercase tracking-[0.14em] text-neutral-500">Add candidate</span>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name *"
        className="w-36 rounded-lg border border-white/10 bg-black/35 px-3 py-2 text-sm outline-none placeholder:text-neutral-600 focus:border-emerald-400/55"
      />
      <input
        value={email}
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="w-44 rounded-lg border border-white/10 bg-black/35 px-3 py-2 text-sm outline-none placeholder:text-neutral-600 focus:border-emerald-400/55"
      />
      <input
        value={position}
        onChange={(e) => setPosition(e.target.value)}
        placeholder="Role"
        className="w-32 rounded-lg border border-white/10 bg-black/35 px-3 py-2 text-sm outline-none placeholder:text-neutral-600 focus:border-emerald-400/55"
      />
      <select
        value={stageId}
        onChange={(e) => setStageId(e.target.value as StageId)}
        className="rounded-lg border border-white/10 bg-black/35 px-3 py-2 text-sm outline-none focus:border-emerald-400/55"
      >
        {PIPELINE_STAGES.map((s) => (
          <option key={s.id} value={s.id}>{s.label}</option>
        ))}
      </select>
      <button
        type="submit"
        disabled={!canSubmit}
        className="rounded-lg bg-emerald-400/85 px-4 py-2 text-sm font-semibold text-neutral-900 transition hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-40"
      >
        + Add
      </button>
    </form>
  );
}
