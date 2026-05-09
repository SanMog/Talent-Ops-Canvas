export function TopNav() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0b0d10]/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4 lg:px-10">
        <a href="#" className="flex items-center gap-3 text-neutral-100">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-400/15 text-sm font-black text-emerald-200">
            T
          </span>
          <div className="leading-tight">
            <div className="text-sm font-semibold">TalentOps Canvas</div>
            <div className="text-[11px] text-neutral-500">Self-serve recruiting</div>
          </div>
        </a>
        <nav className="hidden items-center gap-7 text-sm text-neutral-300 md:flex">
          <a className="hover:text-white" href="#product">
            Why it matters
          </a>
          <a className="hover:text-white" href="#demo">
            Interactive demo
          </a>
          <a className="hover:text-white" href="#request">
            Team version
          </a>
        </nav>
        <div className="flex items-center gap-3">
          <a
            href="#demo"
            className="hidden rounded-full border border-white/15 px-4 py-2 text-sm text-neutral-100 transition hover:border-white/35 sm:inline-flex"
          >
            Try the demo
          </a>
          <a
            href="#request"
            className="rounded-full bg-emerald-400 px-4 py-2 text-sm font-semibold text-neutral-900 shadow-emerald-500/20 hover:bg-emerald-300"
          >
            Request demo
          </a>
        </div>
      </div>
    </header>
  );
}
