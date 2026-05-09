import type { StageId } from '../types';

export const PIPELINE_STAGES: readonly { id: StageId; label: string }[] = [
  { id: 'sourced', label: 'Sourcing' },
  { id: 'screened', label: 'Screening' },
  { id: 'phone', label: 'Phone Interview' },
  { id: 'onsite', label: 'Onsite Interview' },
  { id: 'offer', label: 'Offer Sent' },
  { id: 'hired', label: 'Hired' },
] as const;
