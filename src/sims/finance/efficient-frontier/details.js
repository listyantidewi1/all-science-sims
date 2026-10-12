// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Compute portfolio return = w·μ.',
      'Compute portfolio risk = √(w² σ_a² + (1-w)² σ_b² + 2w(1-w)·ρ σ_aσ_b).',
      'See diversification reduce risk when ρ < 1.',
    ],
    id: [
      'Menghitung return portofolio = w·μ.',
      'Menghitung risiko portofolio = √(w² σ_a² + (1-w)² σ_b² + 2w(1-w)·ρ σ_aσ_b).',
      'Melihat diversifikasi menurunkan risiko saat ρ < 1.',
    ],
  },  tryThis: {
    en: [
      'ρ = +1 — does the frontier become a straight line?',
      'ρ = −1 — can you find a zero-risk mix?',
      'Drag weight to find the minimum-variance portfolio.',
    ],
    id: [
      'ρ = +1 — apakah frontier menjadi garis lurus?',
      'ρ = −1 — bisakah Anda menemukan campuran tanpa risiko?',
      'Geser bobot untuk menemukan portofolio variansi minimum.',
    ],
  },};
