export default {
  id: 'operant-conditioning',
  subject: 'psychology',
  title: { en: 'Operant Conditioning', id: 'Pengondisian Operan' },
  description: {
    en: 'A Skinner box with a lever, a food dispenser and a hungry rat. Choose a reinforcement schedule — fixed ratio, variable ratio, fixed interval or variable interval — then press the lever yourself or let the simulated rat work. A cumulative-response record draws the classic signatures: the post-reinforcement pause and run of FR, the steady high rate of VR, and the scallop of FI.',
    id: 'Kotak Skinner dengan tuas, pemberi makanan, dan tikus yang lapar. Pilih jadwal penguatan — rasio tetap, rasio variabel, interval tetap, atau interval variabel — lalu tekan tuasnya sendiri atau biarkan tikus simulasi bekerja. Rekaman respons kumulatif menggambar pola klasik: jeda pasca-penguatan dan lari pada FR, laju tinggi yang stabil pada VR, dan lengkung scallop pada FI.',
  },
  details: () => import('./details.js'),
  topics: ['learning', 'behaviorism'],
  grade: [10, 11, 12],
  hasLab: true,
  load: () => import('./sim.js'),
};
