import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js';
import { useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import { PIPELINE_STAGES } from '../constants/stages';
import { avgDaysCompletedSpellByStage, countsByStage } from '../lib/metrics';
import { useRecruitingStore } from '../store/useRecruitingStore';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
ChartJS.defaults.color = '#9aa3b2';
ChartJS.defaults.borderColor = 'rgba(255,255,255,0.08)';

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  indexAxis: 'y' as const,
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: '#0d1016',
      borderColor: 'rgba(255,255,255,0.12)',
      borderWidth: 1,
    },
  },
  scales: {
    x: {
      grid: { color: 'rgba(255,255,255,0.05)' },
      ticks: { color: '#8b929e' },
    },
    y: {
      grid: { display: false },
      ticks: { color: '#c5cbd6' },
    },
  },
};

export function AnalyticsCharts() {
  const candidates = useRecruitingStore((s) => s.candidates);

  const funnelData = useMemo(() => {
    const map = countsByStage(candidates);
    return {
      labels: PIPELINE_STAGES.map((s) => s.label),
      datasets: [
        {
          label: 'Candidates',
          data: PIPELINE_STAGES.map((s) => map.get(s.id) ?? 0),
          backgroundColor: PIPELINE_STAGES.map((_, i) =>
            i === PIPELINE_STAGES.length - 1 ? 'rgba(61,217,160,0.65)' : 'rgba(148,164,216,0.55)',
          ),
          borderRadius: 6,
        },
      ],
    };
  }, [candidates]);

  const dwellData = useMemo(() => {
    const averages = avgDaysCompletedSpellByStage(candidates);
    return {
      labels: PIPELINE_STAGES.map((s) => s.label),
      datasets: [
        {
          label: 'Avg. days per completed stage',
          data: PIPELINE_STAGES.map((s) => averages.get(s.id) ?? 0),
          backgroundColor: 'rgba(255,195,138,0.55)',
          borderRadius: 6,
        },
      ],
    };
  }, [candidates]);

  return (
    <div className="grid gap-3 lg:grid-cols-2">
      <div className="flex min-h-[320px] flex-col rounded-xl border border-white/10 bg-[#12151d] p-4">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <div className="text-[11px] uppercase tracking-[0.18em] text-neutral-500">Funnel</div>
            <div className="text-sm text-neutral-300">Candidate volume per stage</div>
          </div>
          <span className="rounded-full bg-white/10 px-2 py-1 text-[10px] uppercase text-neutral-300">
            live
          </span>
        </div>
        <div className="relative flex-1 min-h-[240px]">
          <Bar data={funnelData} options={{ ...chartOptions, plugins: { legend: { display: false } } }} />
        </div>
      </div>

      <div className="flex min-h-[320px] flex-col rounded-xl border border-white/10 bg-[#12151d] p-4">
        <div className="mb-4">
          <div className="text-[11px] uppercase tracking-[0.18em] text-neutral-500">Time in stage</div>
          <div className="text-sm text-neutral-300">
            Avg. over completed spells (after card moves)
          </div>
        </div>
        <div className="relative flex-1 min-h-[240px]">
          <Bar data={dwellData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
}
