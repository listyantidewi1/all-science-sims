export default {
  id: 'preferential-attachment',
  subject: 'social-science',
  title: { en: 'Preferential Attachment Network', id: 'Jaringan Preferential Attachment' },
  description: {
    en: 'Watch a network grow: each new node connects to existing nodes with probability proportional to their popularity. The rich-get-richer process produces a power-law degree distribution — Barabási–Albert.',
    id: 'Amati jaringan tumbuh: setiap simpul baru terhubung ke simpul lama dengan probabilitas sebanding popularitasnya. Proses "yang kaya makin kaya" menghasilkan distribusi derajat power-law — Barabási–Albert.',
  },
  objectives: {
    en: [
      'See how local rules produce hubs with very high degree.',
      'Recognize a power-law in the degree histogram.',
      'Compare to a uniform random graph (no preferential attachment).',
    ],
    id: [
      'Melihat aturan lokal menghasilkan hub dengan derajat sangat tinggi.',
      'Mengenali power-law pada histogram derajat.',
      'Membandingkan dengan graf acak uniform (tanpa preferential attachment).',
    ],
  },
  tryThis: {
    en: [
      'Run preferential attachment to 200 nodes — find the biggest hub.',
      'Switch to uniform — does any node become a giant hub?',
      'Increase m (links per new node) — does diameter shrink?',
    ],
    id: [
      'Jalankan preferential attachment hingga 200 simpul — cari hub terbesar.',
      'Beralih ke uniform — apakah ada simpul yang jadi hub raksasa?',
      'Naikkan m (jumlah link per simpul baru) — apakah diameter mengecil?',
    ],
  },
  topics: ['networks', 'complex-systems'],
  load: () => import('./sim.js'),
};
