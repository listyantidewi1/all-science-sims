export default {
  id: 'doppler-audio',
  subject: 'music',
  title: { en: 'Doppler Effect (Audio)', id: 'Efek Doppler (Audio)' },
  description: {
    en: 'A siren moves past a stationary listener. As it approaches, frequencies are pulled higher; as it recedes, lower. Click Play to hear the actual pitch shift in real time as the source races back and forth across the canvas — the classic ambulance-pass-by demonstration.',
    id: 'Sirene bergerak melewati pendengar diam. Saat mendekat, frekuensi tertarik lebih tinggi; saat menjauh, lebih rendah. Klik Play untuk mendengar pergeseran nada nyata saat sumber meluncur bolak-balik di kanvas — peragaan ambulans-melintas klasik.',
  },
  objectives: {
    en: [
      'Apply f_observed = f_source · (c) / (c − v_source) when approaching.',
      'Hear the symmetric drop as the source passes.',
      'Connect the audio shift to the visual position.',
    ],
    id: [
      'Menerapkan f_diamati = f_sumber · (c) / (c − v_sumber) saat mendekat.',
      'Mendengar penurunan simetris saat sumber lewat.',
      'Menghubungkan pergeseran audio dengan posisi visual.',
    ],
  },
  tryThis: {
    en: [
      'Slow source — barely perceptible shift.',
      'Fast source (200 m/s) — dramatic pitch swing.',
      'Stationary — no Doppler, just the source frequency.',
    ],
    id: [
      'Sumber lambat — pergeseran nyaris tak terlihat.',
      'Sumber cepat (200 m/s) — perubahan nada dramatis.',
      'Diam — tanpa Doppler, hanya frekuensi sumber.',
    ],
  },
  topics: ['acoustics', 'waves'],
  load: () => import('./sim.js'),
};
