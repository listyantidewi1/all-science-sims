export default {
  id: 'doppler-audio',
  subject: 'music',
  title: { en: 'Doppler Effect (Audio)', id: 'Efek Doppler (Audio)' },
  description: {
    en: 'A siren moves past a stationary listener. As it approaches, frequencies are pulled higher; as it recedes, lower. Click Play to hear the actual pitch shift in real time as the source races back and forth across the canvas — the classic ambulance-pass-by demonstration.',
    id: 'Sirene bergerak melewati pendengar diam. Saat mendekat, frekuensi tertarik lebih tinggi; saat menjauh, lebih rendah. Klik Play untuk mendengar pergeseran nada nyata saat sumber meluncur bolak-balik di kanvas — peragaan ambulans-melintas klasik.',
  },
  details: () => import('./details.js'),
  topics: ['acoustics', 'waves'],
  load: () => import('./sim.js'),
};
