export default {
  id: 'snell',
  subject: 'physics',
  title: { en: "Snell's Law (Refraction)", id: 'Hukum Snell (Pembiasan)' },
  description: {
    en: 'A light ray crosses from one material to another. Drag the incoming ray and watch the refracted ray bend according to n₁ sin θ₁ = n₂ sin θ₂. Crank the angle past the critical value and total internal reflection appears.',
    id: 'Berkas cahaya melintasi dua medium. Seret berkas datang dan amati berkas bias membelok mengikuti n₁ sin θ₁ = n₂ sin θ₂. Naikkan sudut melewati nilai kritis dan pemantulan internal total muncul.',
  },
  objectives: {
    en: [
      'Apply n₁ sin θ₁ = n₂ sin θ₂.',
      'See light bending toward / away from normal as n changes.',
      'Identify the critical angle for total internal reflection.',
    ],
    id: [
      'Menerapkan n₁ sin θ₁ = n₂ sin θ₂.',
      'Melihat cahaya membelok mendekati / menjauhi normal saat n berubah.',
      'Mengenali sudut kritis untuk pemantulan internal total.',
    ],
  },
  tryThis: {
    en: [
      'Air → glass (n=1.5) — does light bend toward or away from normal?',
      'Glass → air, angle 50° — total internal reflection?',
      'Find the critical angle for water (n=1.33) → air.',
    ],
    id: [
      'Udara → kaca (n=1,5) — cahaya membelok ke arah atau menjauhi normal?',
      'Kaca → udara, sudut 50° — pemantulan internal total?',
      'Cari sudut kritis air (n=1,33) → udara.',
    ],
  },
  topics: ['optics', 'refraction'],
  load: () => import('./sim.js'),
};
