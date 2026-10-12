// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Apply S(t+dt) = S(t) · exp((μ−σ²/2)dt + σ√dt · Z).',
      'See how volatility widens the cone of possible outcomes.',
      'Recognize that ANY single path tells you very little.',
    ],
    id: [
      'Menerapkan S(t+dt) = S(t) · exp((μ−σ²/2)dt + σ√dt · Z).',
      'Melihat volatilitas memperlebar kerucut hasil yang mungkin.',
      'Mengenali bahwa SATU jalur tidak menceritakan banyak hal.',
    ],
  },  tryThis: {
    en: [
      'σ = 0 — what happens to the paths?',
      'High σ — note how some paths nearly halve and others double.',
      'Long horizon — does the fan widen as √T?',
    ],
    id: [
      'σ = 0 — apa yang terjadi pada jalurnya?',
      'σ tinggi — perhatikan beberapa jalur hampir setengah dan yang lain dua kali lipat.',
      'Horizon panjang — apakah kipas melebar seperti √T?',
    ],
  },};
