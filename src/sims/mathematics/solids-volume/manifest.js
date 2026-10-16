export default {
  id: 'solids-volume',
  subject: 'mathematics',
  title: { en: 'Surface Area and Volume', id: 'Luas Permukaan dan Volume Bangun Ruang' },
  description: {
    en: 'Pick a solid: a box, a triangular prism, a cylinder, a sphere, a square pyramid or a cone. Set its dimensions with sliders, spin the 3-D wireframe by dragging, and read the volume and surface area with every step of the formula filled in. Switch to the net view to see the solid unfolded into flat faces, each labelled with its area.',
    id: 'Pilih bangun ruang: balok, prisma segitiga, tabung, bola, limas persegi, atau kerucut. Atur ukurannya dengan penggeser, putar rangka 3-D dengan menyeret, dan baca volume serta luas permukaannya dengan setiap langkah rumus yang terisi angka. Beralih ke tampilan jaring-jaring untuk melihat bangun itu dibuka menjadi bidang-bidang datar, masing-masing berlabel luasnya.',
  },
  topics: ['geometry', 'solids', 'volume', 'surface area'],
  grade: [8, 9],
  hasLab: true,
  details: () => import('./details.js'),
  load: () => import('./sim.js'),
};
