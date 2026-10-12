// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Define the just-noticeable difference and explain how a staircase procedure measures it.',
      "State Weber's law ΔI = kI and interpret the Weber fraction k.",
      'Compare Weber fractions across stimulus dimensions (length vs area).',
    ],
    id: [
      'Mendefinisikan perbedaan yang baru terasa dan menjelaskan cara prosedur tangga mengukurnya.',
      'Menyatakan hukum Weber ΔI = kI dan menafsirkan pecahan Weber k.',
      'Membandingkan pecahan Weber antar dimensi stimulus (panjang vs luas).',
    ],
  },
  tryThis: {
    en: [
      'Answer 40 trials honestly, then read the fitted Weber fraction. Is JND proportional to size?',
      'Switch from lines to circles and run 40 more trials — is k larger or smaller for area?',
      'Use the simulated observer with k = 0.05 and 0.20 and compare the slopes of the fitted lines.',
    ],
    id: [
      'Jawab 40 percobaan dengan jujur, lalu baca pecahan Weber hasil kecocokan. Apakah JND sebanding dengan ukuran?',
      'Ganti dari garis ke lingkaran dan jalankan 40 percobaan lagi — apakah k lebih besar atau lebih kecil untuk luas?',
      'Gunakan pengamat simulasi dengan k = 0,05 dan 0,20 dan bandingkan kemiringan garis kecocokannya.',
    ],
  },
};
