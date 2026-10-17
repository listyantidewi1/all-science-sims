export default {
  id: 'packet-routing',
  subject: 'computer-science',
  title: { en: 'How the Internet Routes', id: 'Bagaimana Internet Mengirim Data' },
  description: {
    en: 'Send a message from a home or school PC to a web or video server across a small network of routers with link costs. Watch the message split into numbered packets that hop router to router along the cheapest path found by Dijkstra\'s algorithm, read any router\'s routing table, tap a link to break it and see traffic reroute, add random packet loss and retransmission, and follow the traceroute readout hop by hop.',
    id: 'Kirim pesan dari PC rumah atau sekolah ke server web atau video melewati jaringan kecil berisi router dengan biaya tautan. Lihat pesan dipecah menjadi paket bernomor yang melompat dari router ke router lewat jalur termurah hasil algoritma Dijkstra, baca tabel routing router mana pun, sentuh sebuah tautan untuk memutusnya dan lihat lalu lintas dialihkan, tambahkan kehilangan paket acak dan pengiriman ulang, lalu ikuti bacaan traceroute lompatan demi lompatan.',
  },
  topics: ['networks', 'routing', 'packets', 'internet', 'troubleshooting'],
  grade: [11, 12],
  hasLab: true,
  details: () => import('./details.js'),
  load: () => import('./sim.js'),
};
