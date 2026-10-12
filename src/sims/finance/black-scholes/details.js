// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Apply the Black-Scholes formula for European calls and puts.',
      'See how each input moves the price (the "Greeks").',
      "Distinguish payoff at expiry from time-value premium.",
    ],
    id: [
      'Menerapkan rumus Black-Scholes untuk call dan put Eropa.',
      'Melihat efek tiap input pada harga ("Greeks").',
      'Membedakan payoff saat jatuh tempo dari nilai waktu.',
    ],
  },  tryThis: {
    en: [
      'σ = 50% — does the call price soar?',
      'T → 0 — does the call collapse to max(S−K, 0)?',
      'S = K — at-the-money. What\'s the call worth?',
    ],
    id: [
      'σ = 50% — apakah harga call melonjak?',
      'T → 0 — apakah call runtuh ke max(S−K, 0)?',
      'S = K — at-the-money. Berapa nilai call-nya?',
    ],
  },};
