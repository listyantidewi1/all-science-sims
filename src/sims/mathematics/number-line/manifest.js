export default {
  id: 'number-line',
  subject: 'mathematics',
  title: { en: 'Number Line Jumps', id: 'Lompat Garis Bilangan' },
  description: {
    en: 'Help the frog hop along a number line from 0 to 100. Press +1, +10, −1 or −10 and watch it jump. Can you land exactly on the target flag with the fewest jumps? Turn on "tens and ones" to see how a number like 47 is made of 4 tens and 7 ones.',
    id: 'Bantu si katak melompat di garis bilangan dari 0 sampai 100. Tekan +1, +10, −1 atau −10 dan lihat katak melompat. Bisakah kamu mendarat tepat di bendera sasaran dengan lompatan paling sedikit? Nyalakan "puluhan dan satuan" untuk melihat bahwa bilangan seperti 47 terdiri dari 4 puluhan dan 7 satuan.',
  },
  topics: ['arithmetic', 'number sense', 'place value'],
  grade: [1, 2, 3],
  hasLab: true,
  details: () => import('./details.js'),
  load: () => import('./sim.js'),
};
