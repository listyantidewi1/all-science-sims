export default {
  id: 'sea-level-rise',
  subject: 'climate',
  title: { en: 'Sea Level Rise', id: 'Kenaikan Permukaan Laut' },
  description: {
    en: 'A procedurally generated coastline. Drag the sea level slider and watch low-lying land flood as a percent of total land. The hypsometric curve in the corner shows what fraction of land sits below any chosen elevation. Most coastal cities live on a few meters of margin.',
    id: 'Garis pantai yang dibuat secara prosedural. Geser slider permukaan laut dan amati daratan rendah terendam sebagai persentase total daratan. Kurva hipsometrik di sudut menunjukkan fraksi daratan di bawah elevasi tertentu. Kebanyakan kota pesisir hidup pada margin beberapa meter.',
  },
  objectives: {
    en: [
      'Connect sea-level rise (m) to fractional land loss.',
      'Read the hypsometric curve: how much land is below 1m? 5m? 10m?',
      'Realize that even small rises can flood disproportionate areas in low-lying regions.',
    ],
    id: [
      'Menghubungkan kenaikan permukaan laut (m) dengan fraksi daratan yang hilang.',
      'Membaca kurva hipsometrik: berapa banyak daratan di bawah 1m? 5m? 10m?',
      'Menyadari bahwa kenaikan kecil pun dapat menggenangi area tak proporsional di wilayah rendah.',
    ],
  },
  tryThis: {
    en: [
      'Set sea level to +1 m — visualize today\'s "100-year flood" being normal.',
      'Set sea level to +5 m — substantial coastal areas are gone.',
      'Try the high-relief vs low-relief presets — geography matters enormously.',
    ],
    id: [
      'Atur permukaan laut +1 m — visualisasikan "banjir 100 tahun" hari ini menjadi normal.',
      'Atur permukaan laut +5 m — area pesisir signifikan hilang.',
      'Coba preset relief tinggi vs rendah — geografi sangat menentukan.',
    ],
  },
  topics: ['climate', 'geography'],
  load: () => import('./sim.js'),
};
