export default {
  id: 'sound-through-materials',
  subject: 'physics',
  title: { en: 'Sound Travels', id: 'Bunyi Merambat' },
  description: {
    en: 'Ring a bell and watch the sound travel to an ear 1 km away. Choose what is in between: air, water, a steel rod or an empty vacuum jar. A stopwatch shows how long the sound takes and a bar shows how loud it arrives. In a vacuum nothing arrives at all! Sliders for pitch and loudness change the shape of the drawn wave.',
    id: 'Bunyikan bel dan lihat bunyinya merambat ke telinga yang berjarak 1 km. Pilih apa yang ada di antaranya: udara, air, batang baja, atau tabung hampa udara. Stopwatch menunjukkan berapa lama bunyi sampai dan sebuah batang menunjukkan seberapa keras bunyi tiba. Dalam ruang hampa, tidak ada bunyi yang sampai! Penggeser nada dan kekerasan mengubah bentuk gelombang yang digambar.',
  },
  topics: ['sound', 'waves', 'materials', 'vibration'],
  grade: [5, 6],
  hasLab: true,
  details: () => import('./details.js'),
  load: () => import('./sim.js'),
};
