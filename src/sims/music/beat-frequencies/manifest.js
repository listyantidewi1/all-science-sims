export default {
  id: 'beat-frequencies',
  subject: 'music',
  title: { en: 'Beat Frequencies', id: 'Frekuensi Layangan' },
  description: {
    en: 'Two close pure tones — when added, they produce a slow amplitude beat at the difference frequency. Adjust the two pitches and watch the envelope wow in and out. Click Play to also hear it: musicians use this exact phenomenon to tune by ear.',
    id: 'Dua nada murni yang berdekatan — bila dijumlahkan, menghasilkan layangan amplitudo lambat pada frekuensi selisih. Atur kedua nada dan lihat amplop bergetar maju-mundur. Klik Play untuk juga mendengarnya: musisi menggunakan fenomena ini untuk menyetel telinga.',
  },
  objectives: {
    en: [
      'See that beat frequency = |f₁ − f₂|.',
      'Connect the visible envelope to the audible "wow-wow" rhythm.',
      'Why piano tuners listen for "no beats" — they are nulling the difference.',
    ],
    id: [
      'Melihat bahwa frekuensi layangan = |f₁ − f₂|.',
      'Menghubungkan amplop visual dengan ritme "wow-wow" yang terdengar.',
      'Mengapa penyetel piano mendengarkan "tanpa layangan" — mereka menihilkan selisih.',
    ],
  },
  tryThis: {
    en: [
      'Set f₁ = f₂ — beats vanish (perfect unison).',
      'Set f₂ = f₁ + 1 Hz — beat once per second.',
      'Set f₂ = f₁ + 10 Hz — beats become a buzz (above your detection rate).',
    ],
    id: [
      'Atur f₁ = f₂ — layangan hilang (unison sempurna).',
      'Atur f₂ = f₁ + 1 Hz — satu layangan per detik.',
      'Atur f₂ = f₁ + 10 Hz — layangan menjadi dengungan.',
    ],
  },
  topics: ['acoustics', 'waves'],
  load: () => import('./sim.js'),
};
