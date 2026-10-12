export default {
  id: 'gear-ratios',
  subject: 'engineering',
  title: { en: 'Gear Train Ratios', id: 'Rasio Roda Gigi' },
  description: {
    en: 'Three meshed gears in a row. Drag the input RPM dial and watch the output spin — bigger gears turn slower but produce more torque, the iron law of mechanical power transmission. Tooth counts trade speed for force at every stage.',
    id: 'Tiga roda gigi yang bersinggungan. Geser RPM masukan dan amati keluaran berputar — roda gigi lebih besar berputar lebih lambat tapi menghasilkan torsi lebih besar, hukum besi transmisi daya mekanis. Jumlah gigi menukar kecepatan dengan gaya di tiap tahap.',
  },
  details: () => import('./details.js'),
  topics: ['mechanics', 'machines'],
  hasLab: true,
  load: () => import('./sim.js'),
};
