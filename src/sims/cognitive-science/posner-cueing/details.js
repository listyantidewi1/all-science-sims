// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Distinguish valid, invalid, and neutral cues and predict their effect on reaction time.',
      'Measure the validity effect (RT invalid − RT valid) as evidence of covert attention shifts.',
      'Explain why cue validity and the cue–target interval (SOA) change the size of the effect.',
    ],
    id: [
      'Membedakan isyarat valid, tidak valid, dan netral serta memprediksi efeknya pada waktu reaksi.',
      'Mengukur efek validitas (RT tidak valid − RT valid) sebagai bukti perpindahan atensi tersembunyi.',
      'Menjelaskan mengapa validitas isyarat dan jeda isyarat–target (SOA) mengubah besar efek.',
    ],
  },
  tryThis: {
    en: [
      'Run 30+ trials at 80% validity, SOA 300 ms — is RT valid < neutral < invalid?',
      'Drop validity to 50% — the cue is now uninformative; does the effect shrink?',
      'Set SOA to 100 ms, then 1000 ms. At which interval is the benefit biggest?',
    ],
    id: [
      'Jalankan 30+ percobaan pada validitas 80%, SOA 300 ms — apakah RT valid < netral < tidak valid?',
      'Turunkan validitas ke 50% — isyarat kini tidak informatif; apakah efeknya menyusut?',
      'Atur SOA ke 100 ms, lalu 1000 ms. Pada jeda mana manfaatnya paling besar?',
    ],
  },
};
