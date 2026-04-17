// ── Placement Year Stats ──────────────────────────────────────────────────────
// Stores year-wise total placement counts used by the homepage bar chart.
// Real backend: GET/POST/PATCH/DELETE /api/placement-year-stats
// Mock fallback (VITE_MOCK_AUTH=true): localStorage-backed store.

import { client } from './client';

export interface PlacementStat {
  id: number;
  year: string;        // e.g. "2025-26"
  count: number;
  is_covid: boolean;
  is_ongoing: boolean;
  sort_order: number;
}

// Payload for creating a new stat — sort_order is optional (backend auto-assigns max+1)
export type PlacementStatPayload = Omit<PlacementStat, 'id' | 'sort_order'> & { sort_order?: number };

// ── Mock (local dev only) ─────────────────────────────────────────────────────
const STORAGE_KEY = 'vcet_placement_stats';
const USE_MOCK = import.meta.env.DEV && import.meta.env.VITE_MOCK_AUTH === 'true';

const SEED_STATS: PlacementStat[] = [
  { id: 1, year: '2017-18', count: 299, is_covid: false, is_ongoing: false, sort_order: 1 },
  { id: 2, year: '2018-19', count: 320, is_covid: false, is_ongoing: false, sort_order: 2 },
  { id: 3, year: '2019-20', count: 263, is_covid: true,  is_ongoing: false, sort_order: 3 },
  { id: 4, year: '2020-21', count: 305, is_covid: true,  is_ongoing: false, sort_order: 4 },
  { id: 5, year: '2021-22', count: 257, is_covid: true,  is_ongoing: false, sort_order: 5 },
  { id: 6, year: '2022-23', count: 261, is_covid: false, is_ongoing: false, sort_order: 6 },
  { id: 7, year: '2023-24', count: 228, is_covid: false, is_ongoing: false, sort_order: 7 },
  { id: 8, year: '2024-25', count: 241, is_covid: false, is_ongoing: false, sort_order: 8 },
  { id: 9, year: '2025-26', count: 190, is_covid: false, is_ongoing: true,  sort_order: 9 },
];

let _nextId = 100;

function mockLoad(): PlacementStat[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as PlacementStat[];
  } catch { /* ignore */ }
  return SEED_STATS.map((s) => ({ ...s }));
}

function mockSave(data: PlacementStat[]) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch { /* ignore */ }
}

const mock = {
  list: (): Promise<PlacementStat[]> => Promise.resolve(mockLoad()),
  add: (entry: PlacementStatPayload): Promise<PlacementStat> => {
    const data = mockLoad();
    // Reject duplicate year labels (mirrors the backend unique constraint)
    if (data.some((s) => s.year === entry.year)) {
      return Promise.reject(new Error(`A stat for "${entry.year}" already exists.`));
    }
    const item: PlacementStat = {
      id: ++_nextId,
      sort_order: entry.sort_order ?? (Math.max(0, ...data.map((s) => s.sort_order)) + 1),
      ...entry,
    };
    data.push(item);
    mockSave(data);
    return Promise.resolve(item);
  },
  update: (id: number, patch: Partial<Omit<PlacementStat, 'id'>>): Promise<PlacementStat> => {
    const data = mockLoad();
    const idx = data.findIndex((s) => s.id === id);
    if (idx === -1) return Promise.reject(new Error(`Stat ${id} not found`));
    // Reject duplicate year (ignore the row itself)
    if (patch.year && data.some((s, i) => i !== idx && s.year === patch.year)) {
      return Promise.reject(new Error(`A stat for "${patch.year}" already exists.`));
    }
    data[idx] = { ...data[idx], ...patch };
    mockSave(data);
    return Promise.resolve(data[idx]);
  },
  remove: (id: number): Promise<void> => {
    mockSave(mockLoad().filter((s) => s.id !== id));
    return Promise.resolve();
  },
};

// ── Real API ──────────────────────────────────────────────────────────────────
const real = {
  list: (): Promise<PlacementStat[]> =>
    client.request<any>('/placement-year-stats').then((res) => {
      if (Array.isArray(res)) return res;
      if (res && Array.isArray(res.data)) return res.data;
      if (res && Array.isArray(res.stats)) return res.stats;
      return [];
    }),

  add: (entry: PlacementStatPayload): Promise<PlacementStat> =>
    client.request<{ stat: PlacementStat }>('/placement-year-stats', {
      method: 'POST',
      body: JSON.stringify(entry),
    }).then((r) => r.stat),

  update: (id: number, patch: Partial<Omit<PlacementStat, 'id'>>): Promise<PlacementStat> =>
    client.request<{ stat: PlacementStat }>(`/placement-year-stats/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(patch),
    }).then((r) => r.stat),

  remove: (id: number): Promise<void> =>
    client.request<void>(`/placement-year-stats/${id}`, { method: 'DELETE' }),
};

// ── Exported API (used by admin panel + homepage) ─────────────────────────────
export const placementStatsApi = USE_MOCK ? mock : real;

