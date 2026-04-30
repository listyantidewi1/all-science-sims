export default {
  id: 'calorimetry',
  subject: 'chemistry',
  title: { en: 'Calorimetry', id: 'Kalorimetri' },
  description: {
    en: 'Drop a hot metal block into a cup of cool water and watch the temperatures equilibrate. Q = m·c·ΔT for both objects, with Q gained by the cool one equal to Q lost by the hot one. Compare specific heats — water\'s huge c is why it stabilizes climate and why metals heat your hand fast.',
    id: 'Jatuhkan balok logam panas ke dalam cangkir air dingin dan amati suhu menyamakan diri. Q = m·c·ΔT untuk kedua benda, dengan Q yang diperoleh dingin sama dengan Q yang dilepas panas. Bandingkan kalor jenis — c air yang besar adalah alasan air menstabilkan iklim dan logam memanaskan tangan Anda dengan cepat.',
  },
  objectives: {
    en: [
      'Apply m_h c_h (T_h − T_f) = m_c c_c (T_f − T_c) to find equilibrium temperature.',
      'Compare specific heats: water (4.18) vs metals (0.4–0.9) vs gases.',
      'See why "thermal mass" matters for buildings and oceans.',
    ],
    id: [
      'Menerapkan m_p c_p (T_p − T_f) = m_d c_d (T_f − T_d) untuk mencari suhu setimbang.',
      'Membandingkan kalor jenis: air (4,18) vs logam (0,4–0,9) vs gas.',
      'Memahami mengapa "massa termal" penting bagi bangunan dan lautan.',
    ],
  },
  tryThis: {
    en: [
      '100 g iron at 200°C into 200 g water at 20°C — water barely warms.',
      'Same iron into 20 g water — water boils much closer.',
      'Replace water with mercury (c ≈ 0.14) — equilibrium hugely shifted.',
    ],
    id: [
      '100 g besi 200°C ke 200 g air 20°C — air sedikit memanas.',
      'Besi yang sama ke 20 g air — air mendekati mendidih.',
      'Ganti air dengan raksa (c ≈ 0,14) — keseimbangan jauh bergeser.',
    ],
  },
  topics: ['thermodynamics'],
  hasLab: true,
  load: () => import('./sim.js'),
};
