/**
 * School levels. A sim's manifest carries `grade: [7, 8, 9]` (contiguous
 * grade numbers, 1–12 school, 13 = university). These helpers map that to
 * the bands shown in the UI and power the level filter on the home and
 * subject pages. The chosen filter persists on the device.
 */
import { tr, t } from '../i18n/index.js';
import { get as storeGet, set as storeSet } from './store.js';

export const LEVELS = [
  { id: 'primary',    min: 1,  max: 6,  name: { en: 'Primary',       id: 'SD' },               hint: { en: 'Grades 1–6',   id: 'Kelas 1–6' } },
  { id: 'middle',     min: 7,  max: 9,  name: { en: 'Middle school', id: 'SMP' },              hint: { en: 'Grades 7–9',   id: 'Kelas 7–9' } },
  { id: 'high',       min: 10, max: 12, name: { en: 'High school',   id: 'SMA' },              hint: { en: 'Grades 10–12', id: 'Kelas 10–12' } },
  { id: 'university', min: 13, max: 13, name: { en: 'University',    id: 'Perguruan tinggi' }, hint: { en: 'Beyond school', id: 'Setelah sekolah' } },
];
export const LEVEL_BY_ID = Object.fromEntries(LEVELS.map((l) => [l.id, l]));

export function gradeRange(sim) {
  const g = Array.isArray(sim?.grade) ? sim.grade.filter(Number.isFinite) : [];
  if (!g.length) return null;
  return { min: Math.min(...g), max: Math.max(...g) };
}

/** Level ids whose band intersects the sim's grade range. */
export function levelsOf(sim) {
  const r = gradeRange(sim);
  if (!r) return [];
  return LEVELS.filter((l) => r.min <= l.max && r.max >= l.min).map((l) => l.id);
}

export function simMatchesLevel(sim, levelId) {
  if (!levelId || levelId === 'all') return true;
  return levelsOf(sim).includes(levelId);
}

/** Short badge text, e.g. "Grades 7–9", "Grades 11–12 · University", "University". */
export function gradeLabel(sim) {
  const r = gradeRange(sim);
  if (!r) return '';
  const school = { min: r.min, max: Math.min(r.max, 12) };
  const parts = [];
  if (school.min <= 12) {
    parts.push(school.min === school.max
      ? t('level.grade', { n: school.min })
      : t('level.grades', { a: school.min, b: school.max }));
  }
  if (r.max >= 13) parts.push(tr(LEVEL_BY_ID.university.name));
  return parts.join(' · ');
}

// ---- persisted filter ------------------------------------------------
const KEY = 'level';
const listeners = new Set();

export function getLevelFilter() {
  const v = storeGet(KEY, 'all');
  return v === 'all' || LEVEL_BY_ID[v] ? v : 'all';
}

export function setLevelFilter(levelId) {
  const v = levelId === 'all' || LEVEL_BY_ID[levelId] ? levelId : 'all';
  storeSet(KEY, v);
  listeners.forEach((fn) => { try { fn(v); } catch {} });
}

export function onLevelFilterChange(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}
