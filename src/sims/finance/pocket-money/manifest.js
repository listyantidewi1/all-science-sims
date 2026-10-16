export default {
  id: 'pocket-money',
  subject: 'finance',
  title: { en: 'Pocket Money Planner', id: 'Uang Saku' },
  description: {
    en: 'You get pocket money every week. Some things on the list are needs, like a pencil or the bus fare, and some are wants, like a comic or ice cream. Tap each item to decide: buy it now, save it for later, or skip it. Whatever you do not spend goes into your savings jar. Watch the jar fill up towards something big, and see your change counted out in real rupiah notes and coins.',
    id: 'Kamu mendapat uang saku setiap minggu. Beberapa barang di daftar adalah kebutuhan, seperti pensil atau ongkos bus, dan beberapa adalah keinginan, seperti komik atau es krim. Ketuk tiap barang untuk memutuskan: beli sekarang, simpan untuk nanti, atau lewati. Uang yang tidak kamu belanjakan masuk ke celengan. Lihat celengan terisi menuju sesuatu yang besar, dan lihat uang kembalianmu dihitung dengan uang kertas dan koin rupiah sungguhan.',
  },
  topics: ['money', 'saving', 'needs and wants', 'budgeting'],
  grade: [3, 4, 5],
  hasLab: true,
  details: () => import('./details.js'),
  load: () => import('./sim.js'),
};
