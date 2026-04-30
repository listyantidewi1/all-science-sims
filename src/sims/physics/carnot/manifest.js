export default {
  id: 'carnot',
  subject: 'physics',
  title: { en: 'Carnot Heat Engine', id: 'Mesin Kalor Carnot' },
  description: {
    en: "The most efficient heat engine possible — drawn on a P-V diagram as four legs (two isotherms, two adiabats). Slide the hot and cold reservoir temperatures and watch the cycle's area (the work output) and the Carnot efficiency 1 − T_c / T_h update.",
    id: 'Mesin kalor paling efisien yang mungkin — digambar pada diagram P-V sebagai empat kaki (dua isoterm, dua adiabat). Atur suhu reservoir panas dan dingin, lalu amati luas siklus (kerja keluar) dan efisiensi Carnot 1 − T_c / T_h diperbarui.',
  },
  objectives: {
    en: [
      'Apply η_Carnot = 1 − T_c / T_h.',
      'Identify isothermal and adiabatic legs on the P-V diagram.',
      'Connect cycle area to net work done per cycle.',
    ],
    id: [
      'Menerapkan η_Carnot = 1 − T_c / T_h.',
      'Mengenali kaki isotermal dan adiabatik pada diagram P-V.',
      'Mengaitkan luas siklus dengan kerja netto per siklus.',
    ],
  },
  tryThis: {
    en: [
      'T_h = T_c — efficiency 0?',
      'T_c = 0 K — efficiency 100% (impossible in practice).',
      'Real coal plant T_h ≈ 800 K, T_c ≈ 300 K — η_max?',
    ],
    id: [
      'T_h = T_c — efisiensi 0?',
      'T_c = 0 K — efisiensi 100% (mustahil dalam praktik).',
      'PLTU nyata T_h ≈ 800 K, T_c ≈ 300 K — η maks?',
    ],
  },
  topics: ['thermodynamics', 'heat-engines'],
  hasLab: true,
  load: () => import('./sim.js'),
};
