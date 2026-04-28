export default {
  id: 'bass-diffusion',
  subject: 'social-science',
  title: { en: 'Bass Diffusion of Innovation', id: 'Difusi Inovasi Bass' },
  description: {
    en: 'How does a new product, idea, or behavior spread? The Bass model splits adoption into innovators (driven by external p) and imitators (driven by internal q × installed base). The result is a classic S-curve — the shape of every viral uptake curve.',
    id: 'Bagaimana produk, ide, atau perilaku baru menyebar? Model Bass membagi adopsi menjadi inovator (didorong p eksternal) dan peniru (didorong q × basis terpasang). Hasilnya adalah kurva S klasik — bentuk setiap kurva adopsi viral.',
  },
  objectives: {
    en: [
      'Distinguish innovators from imitators in the adoption curve.',
      'See how p drives the early ramp; q drives the steepness.',
      'Predict peak adoption time from p and q.',
    ],
    id: [
      'Membedakan inovator dan peniru dalam kurva adopsi.',
      'Melihat p mendorong awal; q mendorong kecuraman.',
      'Memprediksi waktu puncak adopsi dari p dan q.',
    ],
  },
  tryThis: {
    en: [
      'p=0.03, q=0.4 (typical) — classic S-curve.',
      'p high, q low — steady linear adoption.',
      'p low, q high — slow start then explosion.',
    ],
    id: [
      'p=0,03, q=0,4 (umum) — kurva S klasik.',
      'p tinggi, q rendah — adopsi linear stabil.',
      'p rendah, q tinggi — awal lambat lalu ledakan.',
    ],
  },
  topics: ['marketing', 'diffusion'],
  load: () => import('./sim.js'),
};
