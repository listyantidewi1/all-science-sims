// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'See where the inverting amplifier formula G = −R_f / R_in comes from.',
      'Watch the output saturate at the supply rails when the gain is too large.',
      'Understand why the inverting input is called the "virtual ground".',
    ],
    id: [
      'Melihat asal rumus penguat inverting G = −R_f / R_in.',
      'Mengamati output jenuh di rel suplai bila penguatan terlalu besar.',
      'Memahami mengapa input inverting disebut "virtual ground".',
    ],
  },  tryThis: {
    en: [
      'R_f = R_in — gain −1 (just inverts).',
      'R_f = 10·R_in — clean ×10 inverting amplifier.',
      'Crank R_f very high — output clips at the supply rails (±15 V).',
    ],
    id: [
      'R_f = R_in — penguatan −1 (sekadar membalik).',
      'R_f = 10·R_in — penguat inverting ×10 yang bersih.',
      'Naikkan R_f sangat tinggi — output dipotong di rel suplai (±15 V).',
    ],
  },};
