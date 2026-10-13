// Long-form text for the sim page. Kept out of manifest.js so the home page
// does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Use T = 2π√(L/g) to predict period for small angles.',
      'Identify which variables affect period and which do not.',
      'See where the small-angle approximation breaks down.',
    ],
    id: [
      'Menggunakan T = 2π√(L/g) untuk memprediksi periode pada sudut kecil.',
      'Mengenali variabel mana yang memengaruhi periode dan mana yang tidak.',
      'Melihat batas keberlakuan pendekatan sudut kecil.',
    ],
  },
  tryThis: {
    en: [
      'Double the length — does the period double?',
      'Set the angle to 80° — how off is the small-angle prediction?',
      'Set gravity to lunar (1.6 m/s²) — measure the new period.',
    ],
    id: [
      'Gandakan panjang tali — apakah periode juga ikut menggandakan?',
      'Atur sudut ke 80° — seberapa meleset prediksi sudut kecil?',
      'Atur gravitasi ke nilai bulan (1,6 m/s²) — ukur periode barunya.',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'A simple pendulum is a small mass (the bob) hanging from a light string of length L. Pull it to one side and let go: gravity pulls the bob down, but the string only lets it move along an arc, so the part of gravity that acts along the arc keeps dragging the bob back toward the lowest point. The bob overshoots, climbs the other side, slows, and comes back. One complete swing there and back is one period, T.',
        'For small swings (up to about 15°), the restoring pull is almost proportional to how far the bob has moved along the arc. Motion with a restoring force proportional to displacement is called simple harmonic motion, and its period has a famous result: T = 2π√(L/g). Only the length L and the strength of gravity g appear. The mass of the bob does not matter, because a heavier bob is pulled harder by gravity but is also harder to accelerate, and the two effects cancel exactly.',
        'For big swings the restoring pull grows more slowly than the displacement (it follows sin θ, not θ), so the bob takes a little longer to come back. At 45° the real period is about 4% longer than the small-angle formula predicts; at 90° it is about 18% longer. The simulation integrates the full equation of motion, so you can watch this difference appear as you turn the starting angle up.',
        'Real pendulums slowly lose energy to air resistance and friction at the pivot. The damping slider adds a drag force proportional to speed. Damping shrinks the swing but barely changes the period, which is exactly why pendulum clocks kept good time for three hundred years.',
      ],
      id: [
        'Bandul sederhana adalah sebuah massa kecil (bandul) yang tergantung pada tali ringan sepanjang L. Tarik ke satu sisi lalu lepaskan: gravitasi menarik bandul ke bawah, tetapi tali hanya membolehkan gerak sepanjang busur, sehingga komponen gravitasi yang searah busur terus menarik bandul kembali ke titik terendah. Bandul melewati titik itu, naik ke sisi lain, melambat, lalu kembali. Satu ayunan penuh bolak-balik disebut satu periode, T.',
        'Untuk ayunan kecil (sampai sekitar 15°), gaya pemulih hampir sebanding dengan jarak bandul dari titik terendah. Gerak dengan gaya pemulih yang sebanding dengan simpangan disebut gerak harmonik sederhana, dan periodenya mengikuti rumus terkenal T = 2π√(L/g). Hanya panjang L dan percepatan gravitasi g yang muncul. Massa bandul tidak berpengaruh, karena bandul yang lebih berat ditarik lebih kuat oleh gravitasi tetapi juga lebih sulit dipercepat, dan kedua efek itu saling meniadakan.',
        'Untuk ayunan besar, gaya pemulih bertambah lebih lambat daripada simpangannya (mengikuti sin θ, bukan θ), sehingga bandul butuh waktu sedikit lebih lama untuk kembali. Pada 45° periode sebenarnya sekitar 4% lebih panjang dari prediksi rumus sudut kecil; pada 90° sekitar 18% lebih panjang. Simulasi ini menghitung persamaan gerak lengkapnya, jadi kamu bisa melihat selisih itu muncul saat sudut awal diperbesar.',
        'Bandul sungguhan perlahan kehilangan energi karena hambatan udara dan gesekan di poros. Slider redaman menambahkan gaya hambat yang sebanding dengan kecepatan. Redaman memperkecil ayunan tetapi hampir tidak mengubah periode, dan itulah sebabnya jam bandul bisa menjaga waktu dengan baik selama tiga ratus tahun.',
      ],
    },
    figure: {
      caption: {
        en: 'Gravity (mg) splits into a part along the string, balanced by tension, and a part along the arc, mg·sin θ, which is the restoring force. For small θ, sin θ ≈ θ.',
        id: 'Gravitasi (mg) terurai menjadi komponen searah tali, yang diimbangi tegangan, dan komponen searah busur, mg·sin θ, yang menjadi gaya pemulih. Untuk θ kecil, sin θ ≈ θ.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Forces on a pendulum bob', 'Gaya pada bandul')}">
  <style>text{font:12px system-ui,sans-serif;fill:currentColor}.m{fill:none;stroke:currentColor;stroke-width:1.2;opacity:.45}.f{stroke-width:2.2;fill:none}</style>
  <line x1="180" y1="20" x2="180" y2="190" class="m" stroke-dasharray="4 4"/>
  <path d="M180 20 L249 160" stroke="currentColor" stroke-width="2" fill="none"/>
  <circle cx="180" cy="20" r="3" fill="currentColor"/>
  <circle cx="249" cy="160" r="12" fill="#3b82f6"/>
  <path d="M180 60 A40 40 0 0 1 197.8 54.6" class="m"/>
  <text x="200" y="50">θ</text>
  <line x1="249" y1="160" x2="249" y2="225" class="f" stroke="#ef4444" marker-end="url(#a)"/>
  <text x="254" y="222" fill="#ef4444">mg</text>
  <line x1="249" y1="160" x2="219" y2="221" class="f" stroke="#10b981" marker-end="url(#a)"/>
  <text x="166" y="232" fill="#10b981">mg·sin θ</text>
  <line x1="249" y1="160" x2="217" y2="96" class="f" stroke="#f59e0b" marker-end="url(#a)"/>
  <text x="222" y="90" fill="#f59e0b">${L('tension', 'tegangan')}</text>
  <path d="M120 190 A80 80 0 0 0 249 160" class="m"/>
  <text x="60" y="200">${L('arc of motion', 'busur gerak')}</text>
  <defs><marker id="a" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="context-stroke"/></marker></defs>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'The period depends only on length and gravity: T = 2π√(L/g) for small swings.',
        'Quadrupling the length doubles the period, because of the square root.',
        'Mass and (for small swings) amplitude do not change the period.',
        'For large angles the period grows, because the restoring force follows sin θ rather than θ.',
        'Damping shrinks the swing over time but leaves the period almost unchanged.',
      ],
      id: [
        'Periode hanya bergantung pada panjang dan gravitasi: T = 2π√(L/g) untuk ayunan kecil.',
        'Melipatempatkan panjang menggandakan periode, karena ada akar kuadrat.',
        'Massa dan (untuk ayunan kecil) amplitudo tidak mengubah periode.',
        'Untuk sudut besar periode bertambah, karena gaya pemulih mengikuti sin θ, bukan θ.',
        'Redaman memperkecil ayunan seiring waktu tetapi hampir tidak mengubah periode.',
      ],
    },
    vocabulary: {
      en: [
        ['Period (T)', 'Time for one complete swing, there and back, in seconds.'],
        ['Amplitude', 'The largest angle the pendulum reaches from the vertical.'],
        ['Restoring force', 'A force that always points back toward the equilibrium position.'],
        ['Simple harmonic motion', 'Motion in which the restoring force is proportional to the displacement; its period does not depend on amplitude.'],
        ['Small-angle approximation', 'Replacing sin θ by θ, accurate to within 1% for angles below about 14°.'],
        ['Damping', 'Loss of energy to friction or air resistance, which makes the swing die away.'],
      ],
      id: [
        ['Periode (T)', 'Waktu untuk satu ayunan penuh bolak-balik, dalam sekon.'],
        ['Amplitudo', 'Sudut terbesar yang dicapai bandul dari garis vertikal.'],
        ['Gaya pemulih', 'Gaya yang selalu mengarah kembali ke posisi setimbang.'],
        ['Gerak harmonik sederhana', 'Gerak dengan gaya pemulih yang sebanding dengan simpangan; periodenya tidak bergantung pada amplitudo.'],
        ['Pendekatan sudut kecil', 'Mengganti sin θ dengan θ, akurat dalam 1% untuk sudut di bawah sekitar 14°.'],
        ['Redaman', 'Hilangnya energi karena gesekan atau hambatan udara, yang membuat ayunan mengecil.'],
      ],
    },
    misconceptions: {
      en: [
        ['A heavier bob swings more slowly.', 'It does not. Gravity pulls a heavier bob harder, but it also has more inertia; the two cancel, so the period is the same.'],
        ['Pulling the pendulum back further makes it swing faster, so the period gets shorter.', 'The bob does move faster, but it also has further to travel. For small angles these cancel exactly; for large angles the period actually gets slightly longer.'],
        ['The period doubles when the length doubles.', 'The period grows with the square root of length. Doubling L makes T about 1.41 times longer; you need four times the length to double T.'],
      ],
      id: [
        ['Bandul yang lebih berat berayun lebih lambat.', 'Tidak. Gravitasi menarik bandul berat lebih kuat, tetapi inersianya juga lebih besar; keduanya saling meniadakan sehingga periodenya sama.'],
        ['Menarik bandul lebih jauh membuatnya berayun lebih cepat, jadi periodenya lebih pendek.', 'Bandul memang bergerak lebih cepat, tetapi jaraknya juga lebih jauh. Untuk sudut kecil keduanya saling meniadakan; untuk sudut besar periodenya justru sedikit lebih panjang.'],
        ['Periode menjadi dua kali lipat saat panjang digandakan.', 'Periode bertambah mengikuti akar kuadrat panjang. Menggandakan L membuat T sekitar 1,41 kali lebih panjang; perlu empat kali panjang untuk menggandakan T.'],
      ],
    },
    realWorld: {
      en: [
        'Pendulum clocks (1656 onward) used a one-metre pendulum, whose half-period is almost exactly one second.',
        'A child on a swing is a pendulum: pumping your legs adds energy, but the time per swing stays the same.',
        'Measuring the period of a pendulum of known length is a classic way to measure g, and shows why g is slightly smaller on mountains and at the equator.',
        'Foucault pendulums in science museums swing for hours; the slow turning of their swing plane shows the Earth rotating underneath.',
      ],
      id: [
        'Jam bandul (sejak 1656) memakai bandul sepanjang satu meter, yang setengah periodenya hampir tepat satu sekon.',
        'Anak di ayunan adalah bandul: mengayunkan kaki menambah energi, tetapi waktu tiap ayunan tetap sama.',
        'Mengukur periode bandul dengan panjang yang diketahui adalah cara klasik mengukur g, dan menunjukkan mengapa g sedikit lebih kecil di pegunungan dan di khatulistiwa.',
        'Bandul Foucault di museum sains berayun berjam-jam; perputaran perlahan bidang ayunannya menunjukkan Bumi berputar di bawahnya.',
      ],
    },
    questions: {
      en: [
        { q: 'A pendulum has a period of 2.0 s. What length would give a period of 4.0 s?', a: 'Four times the length. Period scales with √L, so doubling T needs 4× L (about 4 m instead of 1 m).' },
        { q: 'You take the same pendulum to the Moon, where g is about 1/6 of Earth\'s. Does the period get longer or shorter, and by roughly how much?', a: 'Longer, by a factor of √6 ≈ 2.45. Weaker gravity means a weaker restoring force, so each swing takes more time.' },
        { q: 'Why does the simulation\'s "Measured T" drift above the formula\'s prediction when you set the starting angle to 60°?', a: 'Because the small-angle approximation (sin θ ≈ θ) no longer holds. The real restoring force is weaker than the approximation assumes, so the swing takes longer: about 7% longer at 60°.' },
      ],
      id: [
        { q: 'Sebuah bandul berperiode 2,0 s. Berapa panjang yang menghasilkan periode 4,0 s?', a: 'Empat kali panjangnya. Periode sebanding dengan √L, jadi menggandakan T butuh 4× L (sekitar 4 m, bukan 1 m).' },
        { q: 'Bandul yang sama dibawa ke Bulan, dengan g sekitar 1/6 g Bumi. Periodenya lebih panjang atau lebih pendek, dan kira-kira berapa kali?', a: 'Lebih panjang, sekitar √6 ≈ 2,45 kali. Gravitasi yang lebih lemah berarti gaya pemulih lebih lemah, sehingga tiap ayunan butuh waktu lebih lama.' },
        { q: 'Mengapa "T terukur" di simulasi menjadi lebih besar dari prediksi rumus ketika sudut awal diatur ke 60°?', a: 'Karena pendekatan sudut kecil (sin θ ≈ θ) tidak lagi berlaku. Gaya pemulih sebenarnya lebih lemah dari yang diasumsikan, sehingga ayunan lebih lama: sekitar 7% lebih panjang pada 60°.' },
      ],
    },
  },
};
