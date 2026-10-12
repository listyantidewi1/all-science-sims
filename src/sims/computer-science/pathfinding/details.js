// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Distinguish uninformed (BFS) from informed (A*) search.',
      'Predict how a heuristic prunes the search space.',
      'Identify scenarios where heuristics give little advantage.',
    ],
    id: [
      'Membedakan pencarian tanpa informasi (BFS) dan dengan informasi (A*).',
      'Memprediksi bagaimana heuristik memangkas ruang pencarian.',
      'Mengenali skenario saat heuristik tidak banyak membantu.',
    ],
  },  tryThis: {
    en: [
      'Place a wall maze between start and goal — compare cells visited.',
      'Move the goal directly behind a wall — does A* still help?',
      'Switch the algorithm mid-search to compare frontiers.',
    ],
    id: [
      'Buat labirin dinding antara titik awal dan tujuan — bandingkan jumlah sel yang dikunjungi.',
      'Pindahkan tujuan tepat di balik dinding — apakah A* masih membantu?',
      'Ganti algoritma di tengah pencarian untuk membandingkan frontir.',
    ],
  },};
