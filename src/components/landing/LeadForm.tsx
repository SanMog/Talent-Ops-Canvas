import { useState, type FormEvent } from 'react';

const STORAGE_KEY = 'hr-dashboard-leads:v1';
const FORMSPREE_URL = 'https://formspree.io/f/xykobklk';

type LeadPayload = {
  name: string;
  email: string;
  company: string;
  role: string;
  notes: string;
  at: string;
};

function appendLead(payload: LeadPayload) {
  try {
    const prev = localStorage.getItem(STORAGE_KEY);
    const list: LeadPayload[] = prev ? (JSON.parse(prev) as LeadPayload[]) : [];
    list.push(payload);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch { /* silent */ }
}

async function sendToFormspree(payload: Omit<LeadPayload, 'at'>): Promise<void> {
  if (!FORMSPREE_URL) return;
  await fetch(FORMSPREE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(payload),
  });
}

export function LeadForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [notes, setNotes] = useState('');
  const [sent, setSent] = useState(false);

  const canSubmit = name.trim().length > 1 && email.includes('@') && company.trim().length > 1;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    const payload = {
      name: name.trim(),
      email: email.trim(),
      company: company.trim(),
      role: role.trim(),
      notes: notes.trim(),
    };
    appendLead({ ...payload, at: new Date().toISOString() });
    void sendToFormspree(payload);
    setSent(true);
  };

  return (
    <section
      id="request"
      className="relative scroll-mt-28 border-t border-white/10 bg-black/30 px-6 py-16 lg:px-10"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_100%_10%,rgba(61,217,160,0.12),transparent_50%)]" />
      <div className="relative mx-auto grid max-w-5xl gap-10 lg:grid-cols-[1.1fr,0.9fr] lg:items-start">
        <div className="space-y-4">
          <p className="text-[11px] uppercase tracking-[0.3em] text-emerald-200/80">Request a team version</p>
          <h2 className="text-3xl font-semibold tracking-tight text-neutral-50">
            We’ll tailor it to your hiring flow in 1–3 days.
          </h2>
          <p className="text-base text-neutral-400">
            Ship a self-serve recruiting workspace your managers can open from a single link. Designed for HR,
            recruiters, and hiring managers who need clarity, not another bloated ATS.
          </p>
          <ul className="space-y-3 text-sm text-neutral-300">
            <li className="flex gap-3">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-300" />
              Pipeline stages, permissions, and dashboards matched to your workflow.
            </li>
            <li className="flex gap-3">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-300" />
              Optional SSO, audit trail, and ATS sync when you are ready to move off the demo.
            </li>
            <li className="flex gap-3">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-300" />
              API hooks for lead capture—this form already saves locally for prototyping.
            </li>
          </ul>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#0f1116] p-6 shadow-2xl">
          {sent ? (
            <div className="space-y-3 text-neutral-200">
              <p className="text-lg font-semibold text-emerald-200">Thanks—we’ll follow up shortly.</p>
              <p className="text-sm text-neutral-400">
                In production this routes to your CRM or webhook. For now it is stored in this browser&apos;s
                localStorage for prototyping.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-[11px] uppercase tracking-[0.16em] text-neutral-500">Name</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="mt-1 w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-neutral-100 outline-none ring-emerald-400/0 transition focus:border-emerald-400/50 focus:ring-2 focus:ring-emerald-400/30"
                />
              </div>
              <div>
                <label className="text-[11px] uppercase tracking-[0.16em] text-neutral-500">Work email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-1 w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-neutral-100 outline-none focus:border-emerald-400/50 focus:ring-2 focus:ring-emerald-400/30"
                />
              </div>
              <div>
                <label className="text-[11px] uppercase tracking-[0.16em] text-neutral-500">Company</label>
                <input
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  required
                  className="mt-1 w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-neutral-100 outline-none focus:border-emerald-400/50 focus:ring-2 focus:ring-emerald-400/30"
                />
              </div>
              <div>
                <label className="text-[11px] uppercase tracking-[0.16em] text-neutral-500">
                  Role (HR, Recruiter, Hiring manager)
                </label>
                <input
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-neutral-100 outline-none focus:border-emerald-400/50 focus:ring-2 focus:ring-emerald-400/30"
                />
              </div>
              <div>
                <label className="text-[11px] uppercase tracking-[0.16em] text-neutral-500">
                  What should we know?
                </label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-neutral-100 outline-none focus:border-emerald-400/50 focus:ring-2 focus:ring-emerald-400/30"
                />
              </div>
              <button
                type="submit"
                disabled={!canSubmit}
                className="w-full rounded-xl bg-emerald-400 px-4 py-3 text-sm font-semibold text-neutral-900 shadow-lg shadow-emerald-500/20 transition hover:-translate-y-[1px] hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Send request
              </button>
              <p className="text-[11px] text-neutral-500">
                By submitting, you agree to be contacted about a tailored workspace. No spam.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
