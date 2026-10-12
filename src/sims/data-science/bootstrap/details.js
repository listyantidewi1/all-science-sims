// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Apply non-parametric uncertainty estimation.',
      'Read 95% CI from the 2.5th–97.5th percentile of bootstrap means.',
      'Compare to the parametric formula s/√n.',
    ],
    id: [
      'Menerapkan estimasi ketakpastian non-parametrik.',
      'Membaca 95% CI dari persentil 2,5–97,5 rata-rata bootstrap.',
      'Membandingkan dengan rumus parametrik s/√n.',
    ],
  },  tryThis: {
    en: [
      'Sample size 10 — wide CI?',
      'Sample size 100 — does CI shrink as 1/√n?',
      "Compare bootstrap CI to s/√n — they should be similar.",
    ],
    id: [
      'Ukuran sampel 10 — CI lebar?',
      'Ukuran sampel 100 — apakah CI menyusut sebagai 1/√n?',
      'Bandingkan CI bootstrap dengan s/√n — seharusnya mirip.',
    ],
  },};
