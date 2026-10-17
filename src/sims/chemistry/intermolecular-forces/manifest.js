export default {
  id: 'intermolecular-forces',
  subject: 'chemistry',
  title: { en: 'Intermolecular Forces and Boiling Points', id: 'Gaya Antarmolekul dan Titik Didih' },
  description: {
    en: 'Choose a molecule (alkanes, hydrogen halides, water, ammonia, HF, methanol, CO₂, neon, argon) and heat it with a temperature slider. In the particle box the molecules cling together as a liquid until the temperature passes the real boiling point, then fly apart as a gas at the speed kinetic theory predicts. A chart of real boiling points shows the trends for the hydrides of groups 14–17, revealing why H₂O, HF and NH₃ sit far above the lines, and a second view plots boiling point against molar mass.',
    id: 'Pilih molekul (alkana, hidrogen halida, air, amonia, HF, metanol, CO₂, neon, argon) dan panaskan dengan slider suhu. Dalam kotak partikel, molekul saling melekat sebagai cairan sampai suhu melewati titik didih sebenarnya, lalu terbang terpisah sebagai gas dengan laju yang diprediksi teori kinetik. Grafik titik didih nyata menunjukkan kecenderungan hidrida golongan 14–17, mengungkap mengapa H₂O, HF, dan NH₃ berada jauh di atas garis, dan tampilan kedua memplot titik didih terhadap massa molar.',
  },
  topics: ['intermolecular-forces', 'hydrogen-bonding', 'boiling-point', 'kinetic-theory'],
  grade: [11],
  hasLab: true,
  details: () => import('./details.js'),
  load: () => import('./sim.js'),
};
