export default {
  id: 'save-energy-home',
  subject: 'climate',
  title: { en: 'Energy Saver House', id: 'Rumah Hemat Energi' },
  description: {
    en: 'Look inside a house and switch its appliances on and off: lights, air conditioner, fan, TV, fridge and water heater. The electricity meter shows how many kilowatt-hours the house uses each day and what the bill costs each month in rupiah. Swap the bulbs for LEDs, put solar panels on the roof, and take the challenge: cut the bill in half without letting the food in the fridge spoil!',
    id: 'Lihat ke dalam sebuah rumah dan nyalakan atau matikan peralatannya: lampu, AC, kipas, TV, kulkas, dan pemanas air. Meteran listrik menunjukkan berapa kilowatt-jam yang dipakai rumah setiap hari dan berapa tagihan sebulan dalam rupiah. Ganti bohlam dengan LED, pasang panel surya di atap, dan ikuti tantangan: potong tagihan sampai setengahnya tanpa membuat makanan di kulkas basi!',
  },
  topics: ['energy saving', 'electricity', 'solar energy', 'renewable energy'],
  grade: [5, 6],
  hasLab: true,
  details: () => import('./details.js'),
  load: () => import('./sim.js'),
};
