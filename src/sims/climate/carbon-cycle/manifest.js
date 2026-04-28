export default {
  id: 'carbon-cycle',
  subject: 'climate',
  title: { en: 'Carbon Cycle', id: 'Siklus Karbon' },
  description: {
    en: 'Carbon flows between four reservoirs — atmosphere, surface ocean, deep ocean, and land biosphere — driven by photosynthesis, respiration, ocean exchange, and human emissions. Drag the emission rate and watch each pool evolve over a century. The atmospheric pool is what drives global temperature.',
    id: 'Karbon mengalir di antara empat reservoir — atmosfer, lautan permukaan, lautan dalam, dan biosfer darat — didorong oleh fotosintesis, respirasi, pertukaran laut, dan emisi manusia. Geser laju emisi dan amati tiap pool berevolusi selama seabad. Pool atmosfer mendorong suhu global.',
  },
  objectives: {
    en: [
      'See where emitted carbon ends up — most stays in the atmosphere on human timescales.',
      'Watch the ocean uptake lag emissions; the deep ocean is slow.',
      'Compare cutting emissions to half vs zero — the difference is the climate.',
    ],
    id: [
      'Melihat ke mana karbon yang dilepas berakhir — kebanyakan tetap di atmosfer dalam skala waktu manusia.',
      'Mengamati penyerapan laut tertinggal di belakang emisi; laut dalam lambat.',
      'Membandingkan pemotongan emisi setengah vs nol — selisihnya adalah iklim.',
    ],
  },
  tryThis: {
    en: [
      'Set emissions to "today" (~10 GtC/yr) — atmosphere keeps growing.',
      'Drop emissions to zero — atmosphere starts to fall (slowly) as ocean absorbs.',
      'Spike emissions then return to zero — atmosphere holds the bulge for decades.',
    ],
    id: [
      'Atur emisi ke "hari ini" (~10 GtC/thn) — atmosfer terus tumbuh.',
      'Turunkan emisi ke nol — atmosfer mulai turun (perlahan) karena diserap laut.',
      'Lonjakan emisi lalu kembalikan ke nol — atmosfer mempertahankan kelebihan selama dekade.',
    ],
  },
  topics: ['climate', 'biogeochemistry'],
  load: () => import('./sim.js'),
};
