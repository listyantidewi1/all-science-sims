export default {
  id: 'otto-cycle',
  subject: 'engineering',
  title: { en: 'Otto Cycle (4-stroke engine)', id: 'Siklus Otto (mesin 4-tak)' },
  description: {
    en: 'The thermodynamic cycle of a gasoline engine. Watch the piston move through intake, compression, power, and exhaust strokes synchronized with a live P-V diagram. Adjust the compression ratio and see efficiency rise — until you hit the knock limit.',
    id: 'Siklus termodinamika mesin bensin. Amati piston bergerak melalui isap, kompresi, kerja, dan buang yang tersinkron dengan diagram P-V langsung. Atur rasio kompresi dan lihat efisiensi naik — sampai Anda menabrak batas knock.',
  },
  objectives: {
    en: [
      'Trace the four strokes on a P-V diagram (Otto cycle).',
      'Apply η = 1 − 1/r^(γ−1) for ideal Otto efficiency.',
      'See why higher compression ratios give better efficiency (and demand premium fuel).',
    ],
    id: [
      'Menelusuri empat langkah pada diagram P-V (siklus Otto).',
      'Menerapkan η = 1 − 1/r^(γ−1) untuk efisiensi Otto ideal.',
      'Memahami mengapa rasio kompresi tinggi memberi efisiensi lebih baik (dan butuh bahan bakar premium).',
    ],
  },
  tryThis: {
    en: [
      'r = 8 — typical gasoline, η ≈ 56%.',
      'r = 14 — diesel-grade, η ≈ 65% but autoignition would knock pump gas.',
      'r = 4 — old engine, η ≈ 43%.',
    ],
    id: [
      'r = 8 — bensin tipikal, η ≈ 56%.',
      'r = 14 — kelas diesel, η ≈ 65% tapi auto-ignition akan knock bensin pompa.',
      'r = 4 — mesin tua, η ≈ 43%.',
    ],
  },
  topics: ['thermodynamics', 'engines'],
  load: () => import('./sim.js'),
};
