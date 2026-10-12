export default {
  id: 'distributions',
  subject: 'data-science',
  title: { en: 'Distribution Explorer', id: 'Penjelajah Distribusi' },
  description: {
    en: 'Sample from normal, uniform, exponential, and binomial distributions and watch the histogram converge on the true PDF as you draw more samples.',
    id: 'Sampling dari distribusi normal, uniform, eksponensial, dan binomial lalu amati histogram menyatu menuju PDF sejati ketika sampel ditambahkan.',
  },
  details: () => import('./details.js'),
  topics: ['statistics', 'probability'],
  grade: [11, 12, 13],
  hasLab: true,
  load: () => import('./sim.js'),
};
