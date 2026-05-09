export function ProductSections() {
  return (
    <section id="product" className="scroll-mt-28 border-t border-white/10 bg-black/20 px-6 py-16 lg:px-10">
      <div className="mx-auto max-w-6xl space-y-10">
        <div className="max-w-3xl space-y-3">
          <p className="text-[11px] uppercase tracking-[0.3em] text-emerald-200/85">Built for signal, not slog</p>
          <h2 className="text-3xl font-semibold tracking-tight text-neutral-50">
            The hiring cockpit your leaders can forward in Slack.
          </h2>
          <p className="text-neutral-400">
            One link replaces scattered spreadsheets and screenshot decks. Hiring managers touch the funnel directly,
            recruiters keep context, HR tracks compliance-ready history.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <article className="rounded-2xl border border-white/10 bg-[#12151f] p-6">
            <p className="text-[11px] uppercase tracking-[0.26em] text-emerald-200/85">Agents + humans</p>
            <h3 className="mt-2 text-xl font-semibold text-neutral-50">Operational clarity</h3>
            <p className="mt-3 text-sm text-neutral-400">
              Stage-aware metrics surface bottlenecks before they become excuses. Conversion and dwell time react the
              second a card moves.
            </p>
          </article>
          <article className="rounded-2xl border border-white/10 bg-[#12151f] p-6">
            <p className="text-[11px] uppercase tracking-[0.26em] text-emerald-200/85">Shareable default</p>
            <h3 className="mt-2 text-xl font-semibold text-neutral-50">Static-ready deploy</h3>
            <p className="mt-3 text-sm text-neutral-400">
              Ship behind any CDN or portal link. Persist locally today, swap in Supabase/Firestore tomorrow without
              redesigning UX.
            </p>
          </article>
          <article className="rounded-2xl border border-white/10 bg-[#12151f] p-6">
            <p className="text-[11px] uppercase tracking-[0.26em] text-emerald-200/85">Lead capture baked in</p>
            <h3 className="mt-2 text-xl font-semibold text-neutral-50">Roadmap-friendly</h3>
            <p className="mt-3 text-sm text-neutral-400">
              Form submissions store for prototyping; wire your webhook once you graduate from the shared demo link.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
