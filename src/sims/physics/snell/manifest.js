export default {
  id: 'snell',
  subject: 'physics',
  title: { en: "Snell's Law (Refraction)", id: 'Hukum Snell (Pembiasan)' },
  description: {
    en: 'A light ray crosses from one material to another. Drag the incoming ray and watch the refracted ray bend according to n₁ sin θ₁ = n₂ sin θ₂. Crank the angle past the critical value and total internal reflection appears.',
    id: 'Berkas cahaya melintasi dua medium. Seret berkas datang dan amati berkas bias membelok mengikuti n₁ sin θ₁ = n₂ sin θ₂. Naikkan sudut melewati nilai kritis dan pemantulan internal total muncul.',
  },
  details: () => import('./details.js'),
  topics: ['optics', 'refraction'],
  hasLab: true,
  load: () => import('./sim.js'),
};
