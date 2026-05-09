# TalentOps Canvas 🚀

> **The hiring cockpit your leadership can forward in Slack.**
> A dark, focused workspace to replace messy spreadsheets.

Live, shareable, zero-setup — built for recruiting leaders who want real pipeline clarity without the overhead of a full ATS.

---

## Core Features

| Feature | Description |
|---|---|
| **Drag-and-Drop Pipeline** | Move candidates across stages with full DnD-kit precision. Cards snap to cursor, columns highlight on hover. |
| **Live Funnel Metrics** | Conversion rates per stage update in real time as you move candidates through the pipeline. |
| **Stage-Time Analytics** | Chart.js-powered bar charts tracking how long candidates sit in each stage — spot bottlenecks instantly. |
| **Zero-Setup Demo** | Loads with 15 seeded candidates on first visit. No account, no backend, no friction. |

---

## Tech Stack

- **React 18** — component-driven UI with `memo` and `useMemo` throughout
- **Vite** — sub-second HMR, production builds under 200ms
- **TypeScript** — strict types across all components, store, and data layer
- **Tailwind CSS** — utility-first dark design system with emerald accent
- **DnD-kit** — `@dnd-kit/core` with `DragOverlay`, `PointerSensor`, and a custom `snapCenterToCursor` modifier
- **Zustand** — `persist` middleware for state survival across page reloads
- **Chart.js + react-chartjs-2** — funnel and time-in-stage visualisations

---

## Run Locally

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) — the demo loads instantly with no backend required.

### Optional — contact form email delivery

Create `.env.local` and add your [Formspree](https://formspree.io) endpoint:

```env
VITE_FORMSPREE_URL=https://formspree.io/f/your_form_id
```

---

## Project Structure

```
src/
├── components/
│   ├── PipelineBoard.tsx      # DnD orchestrator, grid layout, filter bar
│   ├── StageColumn.tsx        # Droppable column with isOver highlight
│   ├── CandidateCard.tsx      # Draggable card with inline delete
│   ├── CandidateDrawer.tsx    # Full candidate edit panel
│   ├── Toolbar.tsx            # Quick-add form
│   ├── MetricsStrip.tsx       # KPI strip (pipeline count, hires, conversion)
│   ├── AnalyticsCharts.tsx    # Funnel + time-in-stage charts
│   ├── ActivityFeed.tsx       # Chronological event log
│   └── landing/               # Hero, contact form, footer
├── store/
│   └── useRecruitingStore.ts  # Zustand store (candidates, stages, activity)
├── constants/
│   └── stages.ts              # Pipeline stage definitions
├── data/
│   └── seed.ts                # Demo data (15 US-market candidates)
└── types.ts                   # Shared TypeScript interfaces
```

---

## Deploy

```bash
npm run build
```

Upload the `dist/` folder to [Netlify](https://netlify.com), [Vercel](https://vercel.com), or any static host. No server required.

---

<p align="center">
  Architected for Reliability by <strong>Alexander Mogilin</strong>
</p>
