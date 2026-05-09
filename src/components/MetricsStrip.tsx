import { PIPELINE_STAGES } from '../constants/stages';
import { countsByStage, stageConversionRates } from '../lib/metrics';
import { useRecruitingStore } from '../store/useRecruitingStore';

function formatRate(value: number | null) {
  if (value === null) return '—';
  return `${Math.round(value * 100)}%`;
}

export function MetricsStrip() {
  const candidates = useRecruitingStore((s) => s.candidates);
  const rates = stageConversionRates(candidates);
  const counts = countsByStage(candidates);

  return (
    <div className="grid gap-3 md:grid-cols-3">
      <div className="rounded-xl border border-white/10 bg-white/5 p-4">
        <div className="text-[11px] uppercase tracking-[0.18em] text-neutral-500">Total in pipeline</div>
        <div className="mt-2 text-3xl font-semibold text-neutral-50">{candidates.length}</div>
        <div className="mt-1 text-[12px] text-neutral-500">Active cards across all stages</div>
      </div>
      <div className="rounded-xl border border-white/10 bg-white/5 p-4">
        <div className="text-[11px] uppercase tracking-[0.18em] text-neutral-500">Hired</div>
        <div className="mt-2 text-3xl font-semibold text-emerald-300">
          {counts.get('hired') ?? 0}
        </div>
        <div className="mt-1 text-[12px] text-neutral-500">Candidates at the Hired stage</div>
      </div>
      <div className="rounded-xl border border-white/10 bg-white/5 p-4">
        <div className="text-[11px] uppercase tracking-[0.18em] text-neutral-500">
          Stage conversion
        </div>
        <div className="mt-3 space-y-2 text-[12px] text-neutral-400">
          {PIPELINE_STAGES.slice(1).map((stage, idx) => {
            const prev = PIPELINE_STAGES[idx];
            const rate = rates.find((r) => r.stageId === stage.id)?.rate ?? null;
            return (
              <div key={stage.id} className="flex justify-between gap-4">
                <span className="truncate text-neutral-500">
                  {prev.label} → {stage.label}
                </span>
                <span className="shrink-0 font-mono text-neutral-200">{formatRate(rate)}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
