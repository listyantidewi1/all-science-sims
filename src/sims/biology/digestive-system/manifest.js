export default {
  id: 'digestive-system',
  subject: 'biology',
  title: { en: 'The Food Journey', id: 'Perjalanan Makanan' },
  description: {
    en: 'Press Eat and follow one bite of food through the body: the mouth chews it, the food pipe pushes it down, the stomach churns it with acid, the small intestine takes the good parts into the blood, the large intestine takes back water, and the rest goes out. Each organ lights up and tells you its job and how long the food stays there.',
    id: 'Tekan Makan dan ikuti satu gigitan makanan menembus tubuh: mulut mengunyahnya, kerongkongan mendorongnya turun, lambung mengaduknya dengan asam, usus halus mengambil zat baik ke dalam darah, usus besar menyerap kembali air, dan sisanya keluar. Setiap organ menyala dan memberitahumu tugasnya serta berapa lama makanan berada di sana.',
  },
  details: () => import('./details.js'),
  topics: ['human-body', 'digestion', 'organs'],
  grade: [4, 5, 6],
  hasLab: true,
  load: () => import('./sim.js'),
};
