// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Distinguish first-price from second-price (Vickrey) auctions.',
      'See bidders shade bids in first-price auctions.',
      "Verify that revenue equivalence roughly holds in expectation.",
    ],
    id: [
      'Membedakan lelang harga pertama dari harga kedua (Vickrey).',
      'Melihat penawar menahan tawaran pada lelang harga pertama.',
      'Memverifikasi bahwa kesetaraan pendapatan kira-kira berlaku di harapan.',
    ],
  },  tryThis: {
    en: [
      'N=2 bidders — average revenue should match in both formats.',
      'N=10 — does first-price approach valuation?',
      'Try truth-telling in first-price — does it win less revenue?',
    ],
    id: [
      'N=2 penawar — pendapatan rata-rata sama di kedua format.',
      'N=10 — apakah harga pertama mendekati nilai sejati?',
      'Coba jujur di harga pertama — apakah pendapatan turun?',
    ],
  },};
