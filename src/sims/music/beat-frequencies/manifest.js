export default {
  id: 'beat-frequencies',
  subject: 'music',
  title: { en: 'Beat Frequencies', id: 'Frekuensi Layangan' },
  description: {
    en: 'Two close pure tones — when added, they produce a slow amplitude beat at the difference frequency. Adjust the two pitches and watch the envelope wow in and out. Click Play to also hear it: musicians use this exact phenomenon to tune by ear.',
    id: 'Dua nada murni yang berdekatan — bila dijumlahkan, menghasilkan layangan amplitudo lambat pada frekuensi selisih. Atur kedua nada dan lihat amplop bergetar maju-mundur. Klik Play untuk juga mendengarnya: musisi menggunakan fenomena ini untuk menyetel telinga.',
  },
  details: () => import('./details.js'),
  topics: ['acoustics', 'waves'],
  load: () => import('./sim.js'),
};
