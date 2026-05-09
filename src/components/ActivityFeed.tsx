import { useMemo } from 'react';
import { useRecruitingStore } from '../store/useRecruitingStore';

const kindTone: Record<string, string> = {
  move: 'border-sky-300/55 text-sky-100',
  create: 'border-emerald-300/55 text-emerald-100',
  update: 'border-amber-300/55 text-amber-100',
  delete: 'border-rose-300/55 text-rose-100',
};

function fmtTime(at: string) {
  try {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      day: 'numeric',
      month: 'short',
    }).format(new Date(at));
  } catch {
    return at;
  }
}

export function ActivityFeed() {
  const activities = useRecruitingStore((s) => s.activities);

  const items = useMemo(() => [...activities].reverse(), [activities]);

  return (
    <div className="rounded-xl border border-white/10 bg-[#0f1218]/90 p-4">
      <div className="mb-4 flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="text-[11px] uppercase tracking-[0.18em] text-neutral-500">Activity Feed</div>
          <div className="text-sm text-neutral-300">Recent actions by the HR team</div>
        </div>
      </div>
      <div className="column-scroll max-h-[240px] space-y-3 pr-2">
        {items.length === 0 && (
          <div className="text-[13px] text-neutral-500">No events yet — add a candidate to get started.</div>
        )}
        {items.map((a) => (
          <div
            key={a.id}
            className="flex gap-2 rounded-lg border border-white/10 bg-black/35 px-3 py-2 leading-snug"
          >
            <div className={`mt-0.5 shrink-0 self-start rounded-md border px-2 py-0.5 text-[10px] font-medium ${kindTone[a.kind]}`}>
              {a.kind.toUpperCase()}
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[13px] text-neutral-200">{a.message}</div>
              <div className="mt-1 text-[11px] text-neutral-600">{fmtTime(a.at)}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
