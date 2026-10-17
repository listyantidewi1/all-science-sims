export default {
  id: 'blackbody-radiation',
  subject: 'physics',
  title: { en: 'Blackbody Radiation', id: 'Radiasi Benda Hitam' },
  description: {
    en: 'Heat an ideal emitter from 300 K to 10 000 K and watch its Planck spectrum change shape: the peak slides to shorter wavelengths following Wien\'s law λ_max = b/T while the area under the curve, the radiated power per square metre σT⁴, explodes. Presets put the Sun, a light-bulb filament, the Earth and the star Sirius side by side, a visible-band overlay shows how much of each spectrum we can actually see, and a colour swatch shows the glow colour of the emitter.',
    id: 'Panaskan pemancar ideal dari 300 K hingga 10 000 K dan amati bentuk spektrum Planck-nya berubah: puncaknya bergeser ke panjang gelombang lebih pendek mengikuti hukum Wien λ_maks = b/T sementara luas di bawah kurva, daya yang dipancarkan per meter persegi σT⁴, meledak. Preset menyandingkan Matahari, filamen bola lampu, Bumi, dan bintang Sirius; lapisan pita tampak menunjukkan seberapa besar bagian spektrum yang benar-benar bisa kita lihat, dan contoh warna memperlihatkan warna pijar pemancarnya.',
  },
  topics: ['quantum physics', 'thermal radiation', 'Planck law', 'Wien law', 'Stefan–Boltzmann law'],
  grade: [12],
  hasLab: true,
  details: () => import('./details.js'),
  load: () => import('./sim.js'),
};
