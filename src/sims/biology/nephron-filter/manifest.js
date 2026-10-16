export default {
  id: 'nephron-filter',
  subject: 'biology',
  title: { en: 'The Kidney Filter', id: 'Penyaring Ginjal' },
  description: {
    en: 'Follow water, glucose, salt and urea through a single nephron: filtered out of the blood in the glomerulus, reabsorbed along the tubule, and what is left leaves as urine. Change how much water you drink and your blood glucose, switch the hormone ADH on and off, and watch the volume, colour and contents of the urine respond. A preset shows why glucose appears in the urine of an untreated diabetic.',
    id: 'Ikuti air, glukosa, garam, dan urea melewati satu nefron: disaring keluar dari darah di glomerulus, diserap kembali di sepanjang tubulus, dan sisanya keluar sebagai urine. Ubah banyaknya air yang kamu minum dan kadar glukosa darahmu, nyalakan dan matikan hormon ADH, lalu amati volume, warna, dan isi urine berubah. Sebuah prasetel menunjukkan mengapa glukosa muncul dalam urine penderita diabetes yang tidak diobati.',
  },
  topics: ['excretory system', 'kidney', 'nephron', 'osmoregulation', 'homeostasis', 'diabetes'],
  grade: [8, 9, 10, 11],
  hasLab: true,
  details: () => import('./details.js'),
  load: () => import('./sim.js'),
};
