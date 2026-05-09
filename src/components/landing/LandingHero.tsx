export function LandingHero() {
  return (
    <section className="relative overflow-hidden border-b border-white/10 px-6 pb-16 pt-10 lg:px-10 lg:pb-20 lg:pt-16">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(61,217,160,0.16),transparent_40%),radial-gradient(circle_at_80%_-10%,rgba(120,150,255,0.12),transparent_45%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[length:100%_32px] opacity-30" />

      <div className="relative mx-auto flex max-w-6xl flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl space-y-6">
          <p className="text-[11px] uppercase tracking-[0.38em] text-emerald-200/90">Self-serve HR dashboard</p>
          <h1 className="text-4xl font-semibold leading-[1.08] tracking-tight text-neutral-50 sm:text-5xl">
            Your recruiting pipeline,
            <span className="bg-gradient-to-r from-emerald-200 to-sky-100 bg-clip-text text-transparent">
              {' '}
              live in one link.
            </span>
          </h1>
          <p className="text-lg text-neutral-300">
            A dark, focused workspace for HR, recruiters, and hiring managers. Drag candidates through your stages,
            watch conversion and time-in-stage update live, then forward the same link to leadership—no install
            required.
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() =>
                document.getElementById('board')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
              }
              className="rounded-xl bg-emerald-400 px-5 py-3 text-sm font-semibold text-neutral-950 shadow-lg shadow-emerald-500/25 transition hover:-translate-y-[1px] hover:bg-emerald-300"
            >
              Open Instant Demo (No signup)
            </button>
            <a
              href="#request"
              className="rounded-xl border border-white/15 bg-black/30 px-5 py-3 text-sm font-semibold text-neutral-100 transition hover:border-white/35 hover:bg-white/5"
            >
              Request a team version
            </a>
          </div>
          <div className="flex flex-wrap gap-4 text-sm text-neutral-400">
            <span className="rounded-full border border-white/10 px-3 py-1">Drag-and-drop funnel</span>
            <span className="rounded-full border border-white/10 px-3 py-1">Conversion + dwell time</span>
            <span className="rounded-full border border-white/10 px-3 py-1">Share-ready static host</span>
          </div>
        </div>

        <div className="w-full max-w-xl rounded-2xl border border-white/10 bg-gradient-to-b from-white/8 to-black/40 p-[1px] shadow-2xl">
          <div className="rounded-2xl bg-[#0b0d12] p-5">
            <div className="mb-4 flex items-center justify-between text-[12px] text-neutral-400">
              <span className="rounded-full border border-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.24em]">
                Live preview
              </span>
              <span>Browser-only · Zero setup</span>
            </div>
            <div className="space-y-3">
              <div className="rounded-xl border border-emerald-400/30 bg-emerald-400/5 p-4">
                <div className="text-sm font-semibold text-emerald-100">Pipeline health</div>
                <div className="mt-2 grid grid-cols-3 gap-3 text-center">
                  <MiniStat label="Open reqs" value="12" />
                  <MiniStat label="Offers" value="4" />
                  <MiniStat label="Hired" value="2" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm text-neutral-300">
                <CardBlurb
                  title="For recruiters"
                  body="Move candidates, log activity, keep leadership aligned without exports."
                />
                <CardBlurb
                  title="For hiring managers"
                  body="Glance at funnel risk, stage load, and aging before the weekly sync."
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-white/10 bg-black/30 px-3 py-2">
      <div className="text-xl font-semibold text-neutral-50">{value}</div>
      <div className="text-[11px] uppercase tracking-[0.14em] text-neutral-500">{label}</div>
    </div>
  );
}

function CardBlurb({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-black/30 p-4">
      <div className="text-sm font-semibold text-neutral-100">{title}</div>
      <p className="mt-2 text-[13px] leading-relaxed text-neutral-400">{body}</p>
    </div>
  );
}
