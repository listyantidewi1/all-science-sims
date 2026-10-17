export default {
  id: 'reflex-arc',
  subject: 'biology',
  title: { en: 'Reflex Arc', id: 'Lengkung Refleks' },
  description: {
    en: 'Tap the knee or touch a hot plate and watch the impulse race from receptor to sensory neuron, through the spinal cord, down the motor neuron to the muscle, with a stopwatch counting the milliseconds. Compare the short reflex arc with the much longer conscious route through the brain, slow the conduction speed to that of an unmyelinated fibre, and test your own reaction time.',
    id: 'Ketuk lutut atau sentuh pelat panas dan lihat impuls melesat dari reseptor ke neuron sensorik, melewati sumsum tulang belakang, turun lewat neuron motorik ke otot, dengan stopwatch yang menghitung milidetik. Bandingkan lengkung refleks yang pendek dengan jalur sadar lewat otak yang jauh lebih panjang, perlambat kecepatan hantaran ke nilai serabut tanpa mielin, dan uji waktu reaksimu sendiri.',
  },
  topics: ['nervous system', 'reflex', 'neurons', 'homeostasis'],
  grade: [11, 12],
  hasLab: true,
  details: () => import('./details.js'),
  load: () => import('./sim.js'),
};
