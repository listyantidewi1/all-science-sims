export default {
  id: 'mel-scale',
  subject: 'music',
  title: { en: 'Pitch Perception (Mel Scale)', id: 'Persepsi Nada (Skala Mel)' },
  description: {
    en: 'Doubling a frequency below 500 Hz sounds like a much bigger jump than doubling above 5000 Hz. Human pitch perception is logarithmic at the high end — the mel scale captures this. Drag the slider linearly in mels and hear how the perceived "step size" stays constant even as the actual Hz grows nonlinearly.',
    id: 'Menggandakan frekuensi di bawah 500 Hz terdengar jauh lebih besar daripada menggandakan di atas 5000 Hz. Persepsi nada manusia bersifat logaritmik di nada tinggi — skala mel menangkap hal ini. Geser slider linear dalam mel dan dengar bagaimana "ukuran langkah" yang dirasakan tetap konstan meski Hz tumbuh tak-linear.',
  },
  objectives: {
    en: [
      'See the formula mel = 2595 · log₁₀(1 + f/700).',
      'Hear the same perceptual interval at low and high frequencies.',
      'Understand why the mel-frequency cepstral coefficients (MFCCs) underpin speech recognition.',
    ],
    id: [
      'Melihat rumus mel = 2595 · log₁₀(1 + f/700).',
      'Dengar interval persepsi yang sama di frekuensi rendah dan tinggi.',
      'Memahami mengapa MFCC menjadi landasan pengenalan ucapan.',
    ],
  },
  tryThis: {
    en: [
      'Slide from 100 → 200 Hz (one octave). Big perceived jump.',
      'Slide from 5000 → 10000 Hz (one octave). Smaller perceived jump.',
      'Use the mel slider in equal steps — every step sounds equally far apart.',
    ],
    id: [
      'Geser dari 100 → 200 Hz (satu oktaf). Lompatan persepsi besar.',
      'Geser dari 5000 → 10000 Hz (satu oktaf). Lompatan persepsi lebih kecil.',
      'Gunakan slider mel dengan langkah sama — tiap langkah terasa sama jauh.',
    ],
  },
  topics: ['acoustics', 'psychoacoustics'],
  load: () => import('./sim.js'),
};
