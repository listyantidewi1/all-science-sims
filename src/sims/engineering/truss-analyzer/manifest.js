export default {
  id: 'truss-analyzer',
  subject: 'engineering',
  title: { en: 'Truss Analyzer', id: 'Analisis Rangka Batang' },
  description: {
    en: 'A pin-jointed truss bridge under a moving load. Each member is colored by its internal force — red is tension, blue is compression. Drag the load car along the deck and watch the force pattern change. The internal forces come from method-of-joints equilibrium.',
    id: 'Rangka batang berhubung sendi yang menopang beban bergerak. Tiap batang diwarnai oleh gaya dalamnya — merah untuk tarik, biru untuk tekan. Geser beban di sepanjang dek dan lihat pola gaya berubah. Gaya dalam diperoleh dari kesetimbangan metode joint.',
  },
  objectives: {
    en: [
      'Identify zero-force members under specific loads.',
      'Connect tension/compression patterns to truss geometry.',
      'See where the most stressed member is — that is what limits the bridge.',
    ],
    id: [
      'Mengidentifikasi batang gaya-nol di beban tertentu.',
      'Menghubungkan pola tarik/tekan ke geometri rangka.',
      'Melihat batang paling tertekan — itu yang membatasi jembatan.',
    ],
  },
  tryThis: {
    en: [
      'Drag the load to mid-span — verticals carry the load, diagonals route it to the supports.',
      'Drag the load near a support — the far half of the bridge is barely stressed.',
      'Increase the load — colors deepen, the worst member is your weakest link.',
    ],
    id: [
      'Geser beban ke tengah bentang — batang vertikal menanggung beban, diagonal menyalurkannya ke tumpuan.',
      'Geser beban dekat tumpuan — separuh jembatan jauh dari beban hampir tidak tertekan.',
      'Naikkan beban — warna semakin pekat, batang terburuk adalah titik terlemah Anda.',
    ],
  },
  topics: ['statics', 'structural-analysis'],
  load: () => import('./sim.js'),
};
