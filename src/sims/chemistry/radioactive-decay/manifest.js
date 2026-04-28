export default {
  id: 'radioactive-decay',
  subject: 'chemistry',
  title: { en: 'Radioactive Decay & Half-Life', id: 'Peluruhan Radioaktif & Waktu Paruh' },
  description: {
    en: 'Start with a fresh sample of unstable atoms. Each frame, every atom has the same tiny chance of decaying. Watch the population halve every half-life — exponential decay built atom by atom.',
    id: 'Mulai dengan sampel atom tidak stabil yang segar. Setiap frame, setiap atom memiliki peluang kecil yang sama untuk meluruh. Amati populasi berkurang separuh setiap waktu paruh — peluruhan eksponensial yang dibangun atom demi atom.',
  },
  objectives: {
    en: [
      'Apply N(t) = N₀ · 2^(−t/T₁⁄₂).',
      'See randomness on individual atoms aggregate to a smooth curve.',
      'Read half-life from a decay graph.',
    ],
    id: [
      'Menerapkan N(t) = N₀ · 2^(−t/T₁⁄₂).',
      'Melihat keacakan tiap atom membentuk kurva halus saat digabung.',
      'Membaca waktu paruh dari grafik peluruhan.',
    ],
  },
  tryThis: {
    en: [
      'Start with 100 atoms — when do half remain?',
      'Compare 100 vs 1000 — which curve is smoother?',
      'Run several times — does the timing of any individual decay vary?',
    ],
    id: [
      'Mulai dengan 100 atom — kapan setengahnya tersisa?',
      'Bandingkan 100 vs 1000 — kurva mana yang lebih halus?',
      'Jalankan beberapa kali — apakah waktu peluruhan tiap atom berbeda?',
    ],
  },
  topics: ['nuclear', 'kinetics'],
  load: () => import('./sim.js'),
};
