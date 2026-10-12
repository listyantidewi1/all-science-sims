// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'See how an irrelevant anchor pulls estimates toward itself.',
      'Notice that smarter or more-informed people are still affected (just less).',
      'Predict the bias for any anchor by linear interpolation toward the anchor.',
    ],
    id: [
      'Melihat bagaimana jangkar tak relevan menarik estimasi.',
      'Memperhatikan bahwa orang lebih cerdas/lebih banyak tahu tetap terpengaruh (hanya kurang).',
      'Memprediksi bias untuk jangkar apa pun dengan interpolasi linear.',
    ],
  },  tryThis: {
    en: [
      'Anchor at the true value — estimates cluster correctly.',
      'Anchor 10× too high — average estimate jumps maybe 30–50%.',
      'Crank "anchor strength" up — the population gets stuck on it.',
    ],
    id: [
      'Jangkar di nilai benar — estimasi terkumpul tepat.',
      'Jangkar 10× terlalu tinggi — rata-rata estimasi melompat 30-50%.',
      'Naikkan "kekuatan jangkar" — populasi terjebak di jangkar.',
    ],
  },};
