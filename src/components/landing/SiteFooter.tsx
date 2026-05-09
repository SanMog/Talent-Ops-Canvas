export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 px-6 py-10 lg:px-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 text-sm text-neutral-400 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="font-semibold text-neutral-100">TalentOps Canvas</div>
          <p className="mt-2 max-w-xl">
            Prototype-ready recruiting workspace. Customize stages, SSO, ATS sync, audit trails—all behind the same
            product surface.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 text-neutral-400">
          <button
            type="button"
            className="hover:text-neutral-50"
            onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Try the demo
          </button>
          <span className="opacity-40">·</span>
          <a className="hover:text-neutral-50" href="#request">
            Request team access
          </a>
          <span className="opacity-40">·</span>
          <span>© {new Date().getFullYear()}</span>
        </div>
      </div>
      <div className="mx-auto mt-8 max-w-6xl border-t border-white/5 pt-6">
        <p className="text-[11px] uppercase tracking-[0.28em] text-neutral-600">
          Architected for Reliability by{' '}
          <span className="text-emerald-500/70">@SanMog</span>
        </p>
      </div>
    </footer>
  );
}
