export default {
  id: 'buffer-ph',
  subject: 'chemistry',
  title: { en: 'Buffer pH (Henderson-Hasselbalch)', id: 'pH Penyangga (Henderson-Hasselbalch)' },
  description: {
    en: 'A weak acid plus its conjugate base resists pH change. Slide their concentrations and the pKa, and watch the buffer pH update via pH = pKa + log([A⁻]/[HA]). Add strong acid or base and see the buffer absorb the shock.',
    id: 'Asam lemah dan basa konjugatnya melawan perubahan pH. Atur konsentrasinya dan pKa, lalu amati pH penyangga diperbarui lewat pH = pKa + log([A⁻]/[HA]). Tambahkan asam atau basa kuat, dan lihat penyangga menyerap kejutannya.',
  },
  objectives: {
    en: [
      'Apply Henderson-Hasselbalch: pH = pKa + log([A⁻]/[HA]).',
      'See pH ≈ pKa when [A⁻] = [HA] (the half-equivalence point).',
      'Watch buffer capacity collapse outside the ratio range 0.1–10.',
    ],
    id: [
      'Menerapkan Henderson-Hasselbalch: pH = pKa + log([A⁻]/[HA]).',
      'Melihat pH ≈ pKa saat [A⁻] = [HA] (titik setengah-ekuivalen).',
      'Melihat kapasitas penyangga runtuh di luar rasio 0,1–10.',
    ],
  },
  tryThis: {
    en: [
      'Equal [HA] and [A⁻] — does pH equal pKa?',
      'Add 0.01 M strong base — how much does pH shift?',
      'Set ratio to 100:1 — is it still buffering?',
    ],
    id: [
      '[HA] = [A⁻] — apakah pH = pKa?',
      'Tambah 0,01 M basa kuat — seberapa besar pH bergeser?',
      'Atur rasio 100:1 — apakah masih bersifat penyangga?',
    ],
  },
  topics: ['acids', 'buffers'],
  load: () => import('./sim.js'),
};
