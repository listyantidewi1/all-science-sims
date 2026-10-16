export default {
  id: 'multiplication-arrays',
  subject: 'mathematics',
  title: { en: 'Multiplication Arrays', id: 'Larik Perkalian' },
  description: {
    en: 'Build a rectangle of dots with the rows and columns sliders and see the multiplication fact it shows, like 6 × 4 = 24. Turn the array round to see that 4 × 6 is the same. Split it into two smaller arrays, share the dots into equal rows to divide, and press Factors to find every rectangle that holds exactly that many dots.',
    id: 'Susun persegi panjang dari titik-titik dengan penggeser baris dan kolom dan lihat fakta perkalian yang ditunjukkannya, seperti 6 × 4 = 24. Putar lariknya untuk melihat bahwa 4 × 6 sama saja. Pecah menjadi dua larik yang lebih kecil, bagikan titik-titiknya ke baris yang sama banyak untuk membagi, dan tekan Faktor untuk menemukan setiap persegi panjang yang memuat tepat sebanyak itu titik.',
  },
  topics: ['multiplication', 'division', 'factors'],
  grade: [3, 4],
  hasLab: true,
  details: () => import('./details.js'),
  load: () => import('./sim.js'),
};
