export default {
  id: 'carnot',
  subject: 'physics',
  title: { en: 'Carnot Heat Engine', id: 'Mesin Kalor Carnot' },
  description: {
    en: "The most efficient heat engine possible — drawn on a P-V diagram as four legs (two isotherms, two adiabats). Slide the hot and cold reservoir temperatures and watch the cycle's area (the work output) and the Carnot efficiency 1 − T_c / T_h update.",
    id: 'Mesin kalor paling efisien yang mungkin — digambar pada diagram P-V sebagai empat kaki (dua isoterm, dua adiabat). Atur suhu reservoir panas dan dingin, lalu amati luas siklus (kerja keluar) dan efisiensi Carnot 1 − T_c / T_h diperbarui.',
  },
  details: () => import('./details.js'),
  topics: ['thermodynamics', 'heat-engines'],
  grade: [11, 12, 13],
  hasLab: true,
  load: () => import('./sim.js'),
};
