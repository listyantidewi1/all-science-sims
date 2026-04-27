export default {
  id: 'sir-epidemic',
  subject: 'social-science',
  title: { en: 'SIR Epidemic Model', id: 'Model Epidemi SIR' },
  description: {
    en: 'Susceptible, Infected, Recovered. Tune R₀ and recovery time and watch an outbreak spread, peak, and burn out. Add vaccination to bend the curve in real time.',
    id: 'Susceptible (rentan), Infected (terinfeksi), Recovered (sembuh). Atur R₀ dan waktu pemulihan, lalu amati wabah merebak, memuncak, dan padam. Tambahkan vaksinasi untuk membengkokkan kurva secara langsung.',
  },
  objectives: {
    en: [
      'Connect R₀ to whether an epidemic spreads or fizzles.',
      'Read the SIR curves: when does the peak happen?',
      'See how vaccination reduces peak and total infections.',
    ],
    id: [
      'Mengaitkan R₀ dengan apakah wabah menyebar atau mereda.',
      'Membaca kurva SIR: kapan puncaknya?',
      'Melihat vaksinasi menurunkan puncak dan total kasus.',
    ],
  },
  tryThis: {
    en: [
      'Set R₀ = 1 — does the epidemic still spread?',
      'Vaccinate 60% before start — what happens to the peak?',
      'Drop R₀ to 0.8 mid-outbreak — when does it stop spreading?',
    ],
    id: [
      'Atur R₀ = 1 — apakah wabah tetap menyebar?',
      'Vaksinasi 60% sebelum mulai — bagaimana puncaknya?',
      'Turunkan R₀ ke 0,8 di tengah wabah — kapan penyebaran berhenti?',
    ],
  },
  topics: ['epidemiology', 'public-health'],
  load: () => import('./sim.js'),
};
