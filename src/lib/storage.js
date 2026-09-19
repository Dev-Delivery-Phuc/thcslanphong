// Kho bộ câu hỏi của giáo viên (localStorage) + đồng bộ giữa các tab bằng useSyncExternalStore.
import { useSyncExternalStore } from 'react';
import { BUILTIN_SETS } from '@/content/questions/index.js';

const SETS_KEY = 'lp.sets.v1';
const BEST_KEY = 'lp.best.v1';
const listeners = new Set();
let cache = null;

const load = (key, fallback) => {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
};
const persist = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* hết dung lượng hoặc bị chặn: vẫn chạy bình thường trong phiên */
  }
};

const readSets = () => (cache ??= load(SETS_KEY, []));
const emit = () => listeners.forEach((l) => l());
const subscribe = (cb) => {
  listeners.add(cb);
  return () => listeners.delete(cb);
};

window.addEventListener('storage', (e) => {
  if (e.key === SETS_KEY) {
    cache = null;
    emit();
  }
});

export const useSavedSets = () => useSyncExternalStore(subscribe, readSets);

export function saveSet(set) {
  const list = readSets();
  const exists = list.some((s) => s.id === set.id);
  cache = exists ? list.map((s) => (s.id === set.id ? set : s)) : [set, ...list];
  persist(SETS_KEY, cache);
  emit();
}

export function deleteSet(id) {
  cache = readSets().filter((s) => s.id !== id);
  persist(SETS_KEY, cache);
  emit();
}

export const findSet = (id, saved = readSets()) =>
  BUILTIN_SETS.find((s) => s.id === id) ?? saved.find((s) => s.id === id) ?? null;

// Kỷ lục lưu theo bộ câu hỏi + số câu (chơi 5 câu và 20 câu không so sánh với nhau)
const bestKey = (setId, count) => `${setId}:${count}`;
export const getBest = (setId, count) => load(BEST_KEY, {})[bestKey(setId, count)] ?? 0;
export function recordBest(setId, count, score) {
  const all = load(BEST_KEY, {});
  const key = bestKey(setId, count);
  if (score <= (all[key] ?? 0)) return false;
  all[key] = score;
  persist(BEST_KEY, all);
  return true;
}

export const newId = () =>
  globalThis.crypto?.randomUUID?.().slice(0, 8) ?? Math.random().toString(36).slice(2, 10);
