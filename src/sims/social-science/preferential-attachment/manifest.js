export default {
  id: 'preferential-attachment',
  subject: 'social-science',
  title: { en: 'Preferential Attachment Network', id: 'Jaringan Preferential Attachment' },
  description: {
    en: 'Watch a network grow: each new node connects to existing nodes with probability proportional to their popularity. The rich-get-richer process produces a power-law degree distribution — Barabási–Albert.',
    id: 'Amati jaringan tumbuh: setiap simpul baru terhubung ke simpul lama dengan probabilitas sebanding popularitasnya. Proses "yang kaya makin kaya" menghasilkan distribusi derajat power-law — Barabási–Albert.',
  },
  details: () => import('./details.js'),
  topics: ['networks', 'complex-systems'],
  load: () => import('./sim.js'),
};
