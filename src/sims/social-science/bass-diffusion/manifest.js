export default {
  id: 'bass-diffusion',
  subject: 'social-science',
  title: { en: 'Bass Diffusion of Innovation', id: 'Difusi Inovasi Bass' },
  description: {
    en: 'How does a new product, idea, or behavior spread? The Bass model splits adoption into innovators (driven by external p) and imitators (driven by internal q × installed base). The result is a classic S-curve — the shape of every viral uptake curve.',
    id: 'Bagaimana produk, ide, atau perilaku baru menyebar? Model Bass membagi adopsi menjadi inovator (didorong p eksternal) dan peniru (didorong q × basis terpasang). Hasilnya adalah kurva S klasik — bentuk setiap kurva adopsi viral.',
  },
  details: () => import('./details.js'),
  topics: ['marketing', 'diffusion'],
  load: () => import('./sim.js'),
};
