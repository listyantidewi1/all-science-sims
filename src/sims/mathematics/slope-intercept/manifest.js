export default {
  id: 'slope-intercept',
  subject: 'mathematics',
  title: { en: 'Slope-Intercept y = mx + b', id: 'Bentuk Sumbu y = mx + b' },
  description: {
    en: 'Drag two points on the line and watch the slope m and y-intercept b update in real time. The "rise over run" triangle appears between the two points so the geometric meaning of slope is unmissable. Equation, slope formula, and a "find a point with given x" lookup are all live.',
    id: 'Tarik dua titik pada garis dan amati kemiringan m dan titik potong y b terbarui langsung. Segitiga "naik per turun" muncul di antara dua titik sehingga makna geometris kemiringan tidak terlewat. Persamaan, rumus kemiringan, dan pencarian "titik untuk x tertentu" hidup.',
  },
  objectives: {
    en: [
      'Compute slope m = Δy / Δx from two points.',
      'Read the y-intercept b — the y-value where the line crosses the y-axis.',
      'See special cases: m = 0 (horizontal), m undefined (vertical), b = 0 (passes origin).',
    ],
    id: [
      'Menghitung kemiringan m = Δy / Δx dari dua titik.',
      'Membaca titik potong y b — nilai y di mana garis memotong sumbu y.',
      'Melihat kasus khusus: m = 0 (horizontal), m tak terdefinisi (vertikal), b = 0 (melalui titik asal).',
    ],
  },
  tryThis: {
    en: [
      'Make a horizontal line — slope is zero.',
      'Make a steep line — slope grows quickly.',
      'Drop a point onto the y-axis — that is your b.',
    ],
    id: [
      'Buat garis horizontal — kemiringan nol.',
      'Buat garis curam — kemiringan tumbuh cepat.',
      'Letakkan titik di sumbu y — itulah b Anda.',
    ],
  },
  topics: ['algebra', 'graphs'],
  load: () => import('./sim.js'),
};
