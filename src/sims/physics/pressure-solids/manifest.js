export default {
  id: 'pressure-solids',
  subject: 'physics',
  title: { en: 'Pressure: Pins and Snowshoes', id: 'Tekanan Zat Padat' },
  description: {
    en: 'Press the same weight into sand through a pin tip, a stiletto heel, a flat shoe or a snowshoe and watch how deep each one sinks. Sliders for force and contact area let you test the rule P = F/A, with the pressure shown in pascals and kilopascals and compared across all four objects at once.',
    id: 'Tekan berat yang sama ke pasir melalui ujung jarum, hak sepatu runcing, sepatu datar atau sepatu salju, lalu lihat seberapa dalam masing-masing tenggelam. Slider gaya dan luas bidang sentuh membantumu menguji aturan P = F/A, dengan tekanan ditampilkan dalam pascal dan kilopascal serta dibandingkan untuk keempat benda sekaligus.',
  },
  topics: ['pressure', 'force', 'area'],
  grade: [7, 8, 9],
  hasLab: true,
  details: () => import('./details.js'),
  load: () => import('./sim.js'),
};
