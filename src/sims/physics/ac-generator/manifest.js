export default {
  id: 'ac-generator',
  subject: 'physics',
  title: { en: 'AC Generator', id: 'Generator Arus Bolak-balik' },
  description: {
    en: 'Spin a rectangular coil between the poles of a magnet and watch the flux Φ = NBA cos ωt and the induced EMF ε = NBAω sin ωt drawn live, while a bulb on the slip rings flickers with |ε|. Change the number of turns, the field, the coil area and the rotation frequency to see what sets the peak voltage, then swap the slip rings for a commutator to turn the output into pulsing DC.',
    id: 'Putar kumparan persegi panjang di antara kutub magnet dan lihat fluks Φ = NBA cos ωt serta GGL induksi ε = NBAω sin ωt digambar langsung, sementara lampu pada cincin geser berkedip mengikuti |ε|. Ubah jumlah lilitan, medan, luas kumparan, dan frekuensi putaran untuk melihat apa yang menentukan tegangan puncak, lalu ganti cincin geser dengan komutator untuk mengubah keluaran menjadi DC berdenyut.',
  },
  topics: ['electromagnetic induction', 'Faraday\'s law', 'alternating current', 'generator'],
  grade: [12],
  hasLab: true,
  details: () => import('./details.js'),
  load: () => import('./sim.js'),
};
