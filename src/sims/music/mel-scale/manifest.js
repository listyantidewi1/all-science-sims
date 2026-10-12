export default {
  id: 'mel-scale',
  subject: 'music',
  title: { en: 'Pitch Perception (Mel Scale)', id: 'Persepsi Nada (Skala Mel)' },
  description: {
    en: 'Doubling a frequency below 500 Hz sounds like a much bigger jump than doubling above 5000 Hz. Human pitch perception is logarithmic at the high end — the mel scale captures this. Drag the slider linearly in mels and hear how the perceived "step size" stays constant even as the actual Hz grows nonlinearly.',
    id: 'Menggandakan frekuensi di bawah 500 Hz terdengar jauh lebih besar daripada menggandakan di atas 5000 Hz. Persepsi nada manusia bersifat logaritmik di nada tinggi — skala mel menangkap hal ini. Geser slider linear dalam mel dan dengar bagaimana "ukuran langkah" yang dirasakan tetap konstan meski Hz tumbuh tak-linear.',
  },
  details: () => import('./details.js'),
  topics: ['acoustics', 'psychoacoustics'],
  grade: [11, 12, 13],
  load: () => import('./sim.js'),
};
