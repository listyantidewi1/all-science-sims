export default {
  id: 'electrolysis',
  subject: 'chemistry',
  title: { en: 'Electrolysis of Water', id: 'Elektrolisis Air' },
  description: {
    en: 'Pass electric current through water and watch hydrogen bubble up at the cathode and oxygen at the anode in a 2:1 volume ratio. Faraday\'s laws connect total charge to moles of gas produced. Crank the current and you see the bubbles speed up; the math always agrees.',
    id: 'Alirkan arus listrik melalui air dan amati hidrogen menggelembung di katoda dan oksigen di anoda dalam rasio volume 2:1. Hukum Faraday menghubungkan muatan total dengan mol gas. Naikkan arus dan gelembung mempercepat; matematika selalu cocok.',
  },
  details: () => import('./details.js'),
  topics: ['electrochemistry'],
  hasLab: true,
  load: () => import('./sim.js'),
};
