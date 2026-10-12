export default {
  id: 'buffer-ph',
  subject: 'chemistry',
  title: { en: 'Buffer pH (Henderson-Hasselbalch)', id: 'pH Penyangga (Henderson-Hasselbalch)' },
  description: {
    en: 'A weak acid plus its conjugate base resists pH change. Slide their concentrations and the pKa, and watch the buffer pH update via pH = pKa + log([A⁻]/[HA]). Add strong acid or base and see the buffer absorb the shock.',
    id: 'Asam lemah dan basa konjugatnya melawan perubahan pH. Atur konsentrasinya dan pKa, lalu amati pH penyangga diperbarui lewat pH = pKa + log([A⁻]/[HA]). Tambahkan asam atau basa kuat, dan lihat penyangga menyerap kejutannya.',
  },
  details: () => import('./details.js'),
  topics: ['acids', 'buffers'],
  load: () => import('./sim.js'),
};
