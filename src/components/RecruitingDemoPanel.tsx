import { ActivityFeed } from './ActivityFeed';
import { AnalyticsCharts } from './AnalyticsCharts';
import { MetricsStrip } from './MetricsStrip';
import { PipelineBoard } from './PipelineBoard';
import { Toolbar } from './Toolbar';

/**
 * Wrapped interactive recruiting workspace—embedded on the landing page as the live demo.
 */
export function RecruitingDemoPanel() {
  return (
    <section id="demo" className="scroll-mt-28 border-t border-white/10 px-6 py-12 lg:px-10 lg:py-14">
      <div className="mx-auto mb-10 max-w-6xl space-y-3">
        <div className="flex flex-wrap items-center gap-3">
          <p className="text-[11px] uppercase tracking-[0.3em] text-emerald-200/85">Interactive demo</p>
          <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-200">
            Drag live data
          </span>
          <span className="rounded-full border border-white/10 px-3 py-1 text-[11px] text-neutral-500">
            Local persistence · SaaS-ready
          </span>
        </div>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="max-w-3xl space-y-2">
            <h2 className="text-3xl font-semibold tracking-tight text-neutral-50">
              Move candidates. Watch funnel math update instantly.
            </h2>
            <p className="text-sm text-neutral-400">
              This is not a looping video—you are manipulating the recruiting board that ships with the product. Metrics,
              funnel charts, and activity history mirror every drag-and-drop gesture.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="rounded-full border border-white/15 bg-black/35 px-4 py-2 text-xs uppercase tracking-[0.16em] text-neutral-400 hover:border-white/35"
          >
            Back to hero
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-[1400px] overflow-x-clip rounded-3xl border border-white/12 bg-[#090b10] shadow-[0_30px_120px_rgba(0,0,0,0.55)]">
        <div className="border-b border-white/10 px-4 py-3 text-[11px] text-neutral-500 sm:px-6">
          <span className="text-neutral-400">Sandbox URL · </span>
          mirrors production layout after white-label pass
        </div>
        <div className="flex flex-col gap-6 px-4 py-6 sm:px-6 lg:gap-8 lg:px-10 lg:py-8">
          <MetricsStrip />
          <AnalyticsCharts />
          <div id="board"><Toolbar /></div>
          <PipelineBoard />
          <ActivityFeed />
        </div>
      </div>
    </section>
  );
}
