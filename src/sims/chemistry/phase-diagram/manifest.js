export default {
  id: 'phase-diagram',
  subject: 'chemistry',
  title: { en: 'Phase Diagram (Water)', id: 'Diagram Fasa (Air)' },
  description: {
    en: "Drag a marker around the pressure-temperature plane and watch a sample turn solid, liquid, or gas. The triple point and critical point — where phase boundaries do strange things — are right there on the plot.",
    id: 'Seret penanda di bidang tekanan-suhu dan amati sampel berubah jadi padat, cair, atau gas. Titik tripel dan titik kritis — tempat batas fasa berperilaku ganjil — terlihat langsung pada grafiknya.',
  },
  objectives: {
    en: [
      'Identify solid / liquid / gas regions on a P-T diagram.',
      'Locate the triple point and the critical point.',
      "Recognize water's anomalous melting curve (slope is negative).",
    ],
    id: [
      'Mengenali wilayah padat / cair / gas pada diagram P-T.',
      'Menemukan titik tripel dan titik kritis.',
      'Mengenali kurva leleh air yang anomali (kemiringan negatif).',
    ],
  },
  tryThis: {
    en: [
      'Cross the triple point — what state-changes happen?',
      'Heat past the critical point — is it still gas? Or supercritical?',
      "Drag along water's melting curve — what does the negative slope mean for ice skating?",
    ],
    id: [
      'Lewati titik tripel — perubahan fasa apa yang terjadi?',
      'Panaskan melebihi titik kritis — apakah masih gas? Atau superkritis?',
      'Geser di sepanjang kurva leleh air — apa arti kemiringan negatif itu untuk bermain ski es?',
    ],
  },
  topics: ['phases', 'thermodynamics'],
  load: () => import('./sim.js'),
};
