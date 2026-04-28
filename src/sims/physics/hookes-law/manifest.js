export default {
  id: 'hookes-law',
  subject: 'physics',
  title: { en: "Hooke's Law", id: 'Hukum Hooke' },
  description: {
    en: 'Hang a weight on a spring; the spring stretches a distance proportional to the force. Drag the mass and watch the F-vs-x graph trace out the linear law F = kx. Compare three springs with different stiffnesses (soft, medium, stiff) on the same axes.',
    id: 'Gantungkan beban pada pegas; pegas memanjang sebanding dengan gaya. Geser massa dan amati grafik F-vs-x menelusuri hukum linear F = kx. Bandingkan tiga pegas dengan kekakuan berbeda (lunak, sedang, kaku) pada sumbu yang sama.',
  },
  objectives: {
    en: [
      'Verify F = kx empirically: each pull gives a proportional stretch.',
      'Read the spring constant k from the slope of the F-vs-x line.',
      'See the elastic limit: real springs are linear only up to a point.',
    ],
    id: [
      'Memverifikasi F = kx secara empiris: tiap tarikan memberi pemanjangan proporsional.',
      'Membaca konstanta pegas k dari kemiringan garis F-vs-x.',
      'Melihat batas elastis: pegas nyata bersifat linear hanya sampai titik tertentu.',
    ],
  },
  tryThis: {
    en: [
      'Add 1 kg to a soft spring (k = 20 N/m) — stretches ~49 cm.',
      'Add 1 kg to a stiff spring (k = 200 N/m) — stretches only ~5 cm.',
      'Drag past the elastic limit — the line bends.',
    ],
    id: [
      'Tambahkan 1 kg ke pegas lunak (k = 20 N/m) — meregang ~49 cm.',
      'Tambahkan 1 kg ke pegas kaku (k = 200 N/m) — meregang hanya ~5 cm.',
      'Geser melewati batas elastis — garis membengkok.',
    ],
  },
  topics: ['mechanics', 'forces'],
  load: () => import('./sim.js'),
};
