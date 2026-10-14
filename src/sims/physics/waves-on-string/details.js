// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Identify nodes and antinodes in a standing wave.',
      'Recognize resonant frequencies for fixed-fixed and fixed-free strings.',
      'Predict how tension changes wave speed and resonant frequency.',
    ],
    id: [
      'Mengidentifikasi simpul dan perut pada gelombang berdiri.',
      'Mengenali frekuensi resonansi pada tali ujung tetap-tetap dan tetap-bebas.',
      'Memprediksi bagaimana tegangan mengubah kecepatan gelombang dan frekuensi resonansi.',
    ],
  },
  tryThis: {
    en: [
      'Find the lowest frequency that gives a clean standing wave.',
      'Switch to a free end — does the lowest mode have a node there?',
      'Double the wave speed (which would take four times the tension) — what frequency now resonates the same mode?',
    ],
    id: [
      'Cari frekuensi terendah yang menghasilkan gelombang berdiri rapi.',
      'Ubah ke ujung bebas — apakah moda terendah memiliki simpul di sana?',
      'Gandakan kelajuan gelombang (yang membutuhkan empat kali tegangan) — pada frekuensi berapa moda yang sama beresonansi?',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'Wiggle one end of a stretched string and a wave runs along it at a speed v set by the string itself: v = √(T/μ), where T is the tension and μ the mass per unit length. Tighter or lighter strings carry waves faster. When the wave reaches the far end it reflects. At a fixed end the string cannot move, so the reflected wave comes back upside down; at a free end the string can move, and the wave reflects the same way up.',
        'If the end is driven continuously, waves travelling right and reflected waves travelling left overlap everywhere along the string. At most frequencies they add up to a muddle, but at special frequencies they reinforce each other and a standing wave appears: some points, the nodes, never move, while the antinodes between them swing with large amplitude. For a string fixed at both ends there must be a node at each end, so a whole number of half-wavelengths has to fit: L = n λ/2. Using v = f λ, the resonant frequencies are f_n = n v / (2L) for n = 1, 2, 3, …, all multiples of the fundamental f_1. With one end free, that end is an antinode, an odd number of quarter-wavelengths fits, and f_n = (2n − 1) v / (4L): only odd multiples of the fundamental.',
        'The simulation solves the one-dimensional wave equation for a string of length 1 (in its own units) divided into 200 pieces, driven by a small sinusoidal motion at the left end. The frequency slider sets the drive; the "wave speed" slider stands in for tension, since in a real string you would change v by tightening it (doubling the tension raises v by √2, not 2). The right-end selector switches between a fixed end (node) and a free end (antinode), and the readout prints the predicted fundamental: v/2L for fixed-fixed, v/4L for fixed-free. The envelope shading records the largest displacement reached at each point, which makes nodes and antinodes easy to see.',
        'The damping slider removes a little energy each step, standing in for air resistance and internal friction. Without damping, a resonant drive keeps adding energy and the amplitude grows for a long time; with damping the amplitude settles at a steady value where energy in equals energy out. The sim ignores the stiffness of real strings, assumes small amplitudes, and treats the driven end as almost fixed; it is not pitched to audible frequencies, which is why the resonances are at a few hertz rather than hundreds.',
      ],
      id: [
        'Goyangkan satu ujung tali yang teregang, maka gelombang merambat sepanjang tali dengan kelajuan v yang ditentukan oleh tali itu sendiri: v = √(T/μ), dengan T tegangan dan μ massa per satuan panjang. Tali yang lebih tegang atau lebih ringan merambatkan gelombang lebih cepat. Ketika gelombang mencapai ujung jauh, ia dipantulkan. Pada ujung tetap tali tidak bisa bergerak, sehingga gelombang pantul kembali dalam keadaan terbalik; pada ujung bebas tali bisa bergerak, dan gelombang dipantulkan tanpa terbalik.',
        'Jika ujung tali digetarkan terus-menerus, gelombang yang merambat ke kanan dan gelombang pantul yang merambat ke kiri saling tumpang tindih di sepanjang tali. Pada kebanyakan frekuensi hasilnya kacau, tetapi pada frekuensi-frekuensi khusus keduanya saling menguatkan dan muncul gelombang berdiri: beberapa titik, yaitu simpul, tidak pernah bergerak, sedangkan perut di antaranya berayun dengan amplitudo besar. Untuk tali yang terikat di kedua ujung harus ada simpul di tiap ujung, sehingga yang muat hanyalah bilangan bulat kali setengah panjang gelombang: L = n λ/2. Dengan v = f λ, frekuensi resonansinya f_n = n v / (2L) untuk n = 1, 2, 3, …, semuanya kelipatan frekuensi dasar f_1. Jika satu ujung bebas, ujung itu menjadi perut, yang muat adalah bilangan ganjil kali seperempat panjang gelombang, dan f_n = (2n − 1) v / (4L): hanya kelipatan ganjil frekuensi dasar.',
        'Simulasi ini menyelesaikan persamaan gelombang satu dimensi untuk tali sepanjang 1 (dalam satuannya sendiri) yang dibagi menjadi 200 potongan, digetarkan oleh gerak sinus kecil di ujung kiri. Slider frekuensi mengatur penggetar; slider "wave speed" mewakili tegangan, karena pada tali sungguhan v diubah dengan mengencangkan tali (menggandakan tegangan menaikkan v sebesar √2, bukan 2 kali). Pilihan ujung kanan beralih antara ujung tetap (simpul) dan ujung bebas (perut), dan tampilan mencetak frekuensi dasar yang diprediksi: v/2L untuk tetap-tetap, v/4L untuk tetap-bebas. Bayangan amplop merekam simpangan terbesar yang dicapai tiap titik, sehingga simpul dan perut mudah dilihat.',
        'Slider redaman membuang sedikit energi tiap langkah, mewakili hambatan udara dan gesekan dalam tali. Tanpa redaman, penggetar pada frekuensi resonansi terus menambah energi dan amplitudo membesar untuk waktu yang lama; dengan redaman amplitudo menetap pada nilai saat energi masuk sama dengan energi keluar. Simulasi mengabaikan kekakuan tali sungguhan, mengasumsikan amplitudo kecil, dan memperlakukan ujung yang digetarkan sebagai hampir tetap; frekuensinya tidak disetel ke rentang terdengar, itulah sebabnya resonansi terjadi pada beberapa hertz, bukan ratusan.',
      ],
    },
    figure: {
      caption: {
        en: 'Standing-wave modes. With both ends fixed, whole numbers of half-wavelengths fit (n = 1, 2, 3), so f_n = n v/2L. With the right end free, that end is an antinode and the lowest mode is a quarter-wavelength: f_1 = v/4L.',
        id: 'Moda gelombang berdiri. Dengan kedua ujung tetap, yang muat adalah bilangan bulat kali setengah panjang gelombang (n = 1, 2, 3), sehingga f_n = n v/2L. Dengan ujung kanan bebas, ujung itu menjadi perut dan moda terendah adalah seperempat panjang gelombang: f_1 = v/4L.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        const x0 = 60, w = 240, amp = 16;
        const wave = (y0, halfWaves, sign) => {
          const pts = [];
          for (let i = 0; i <= 48; i++) {
            const u = i / 48;
            pts.push(`${(x0 + u * w).toFixed(1)},${(y0 - sign * amp * Math.sin(Math.PI * halfWaves * u)).toFixed(1)}`);
          }
          return pts.join(' ');
        };
        const row = (y0, halfWaves, label) => `
  <line x1="${x0}" y1="${y0}" x2="${x0 + w}" y2="${y0}" class="m"/>
  <polyline points="${wave(y0, halfWaves, 1)}" fill="none" stroke="#3b82f6" stroke-width="2"/>
  <polyline points="${wave(y0, halfWaves, -1)}" fill="none" stroke="#3b82f6" stroke-width="1.2" stroke-dasharray="4 3" opacity=".6"/>
  <text x="8" y="${y0 + 4}">${label}</text>`;
        const nodes = (y0, halfWaves) => {
          let s = '';
          for (let k = 0; k <= halfWaves; k++) s += `<circle cx="${(x0 + (k / halfWaves) * w).toFixed(1)}" cy="${y0}" r="3" fill="#ef4444"/>`;
          return s;
        };
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Standing wave modes on a string', 'Moda gelombang berdiri pada tali')}">
  <style>text{font:12px system-ui,sans-serif;fill:currentColor}.m{fill:none;stroke:currentColor;stroke-width:1.2;opacity:.45}</style>
  <rect x="${x0 - 5}" y="22" width="5" height="150" fill="currentColor" opacity=".6"/>
  <rect x="${x0 + w}" y="22" width="5" height="150" fill="currentColor" opacity=".6"/>
  ${row(42, 1, 'n = 1')}${nodes(42, 1)}
  <text x="${x0 + w / 2 - 6}" y="20" fill="#10b981">A</text>
  ${row(98, 2, 'n = 2')}${nodes(98, 2)}
  ${row(154, 3, 'n = 3')}${nodes(154, 3)}
  <text x="${x0 + w + 12}" y="46">f_1</text>
  <text x="${x0 + w + 12}" y="102">2 f_1</text>
  <text x="${x0 + w + 12}" y="158">3 f_1</text>
  <rect x="${x0 - 5}" y="190" width="5" height="40" fill="currentColor" opacity=".6"/>
  <circle cx="${x0 + w + 4}" cy="212" r="5" fill="none" stroke="currentColor" stroke-width="1.5"/>
  <line x1="${x0}" y1="212" x2="${x0 + w}" y2="212" class="m"/>
  <polyline points="${wave(212, 0.5, 1)}" fill="none" stroke="#f59e0b" stroke-width="2"/>
  <polyline points="${wave(212, 0.5, -1)}" fill="none" stroke="#f59e0b" stroke-width="1.2" stroke-dasharray="4 3" opacity=".6"/>
  <circle cx="${x0}" cy="212" r="3" fill="#ef4444"/>
  <text x="8" y="216">${L('free', 'bebas')}</text>
  <text x="${x0 + w + 14}" y="216">v/4L</text>
  <text x="${x0 + 4}" y="186" fill="#ef4444">${L('N = node', 'N = simpul')}</text>
  <text x="${x0 + 100}" y="186" fill="#10b981">${L('A = antinode', 'A = perut')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Wave speed on a string is v = √(T/μ): more tension or a lighter string means faster waves.',
        'A standing wave is the sum of a wave and its reflection; nodes stay still, antinodes swing the most.',
        'Fixed ends must be nodes, so a fixed-fixed string resonates at f_n = n v/(2L), all multiples of the fundamental.',
        'A free end is an antinode, so a fixed-free string resonates only at odd multiples: f_n = (2n − 1) v/(4L).',
        'Damping limits how large a resonance grows but does not change the resonant frequencies noticeably.',
      ],
      id: [
        'Kelajuan gelombang pada tali adalah v = √(T/μ): tegangan lebih besar atau tali lebih ringan berarti gelombang lebih cepat.',
        'Gelombang berdiri adalah jumlah gelombang dan pantulannya; simpul tetap diam, perut berayun paling besar.',
        'Ujung tetap harus menjadi simpul, sehingga tali tetap-tetap beresonansi pada f_n = n v/(2L), semua kelipatan frekuensi dasar.',
        'Ujung bebas menjadi perut, sehingga tali tetap-bebas hanya beresonansi pada kelipatan ganjil: f_n = (2n − 1) v/(4L).',
        'Redaman membatasi seberapa besar resonansi tumbuh tetapi tidak mengubah frekuensi resonansi secara berarti.',
      ],
    },
    vocabulary: {
      en: [
        ['Standing wave', 'A wave pattern that oscillates in place, formed when a wave and its reflection overlap at a resonant frequency.'],
        ['Node', 'A point on the string that never moves; fixed ends are always nodes.'],
        ['Antinode', 'A point halfway between nodes where the string swings with the largest amplitude.'],
        ['Wavelength (λ)', 'The distance between two points that move in step, equal to twice the node-to-node distance.'],
        ['Resonance', 'The large response that builds up when the drive frequency matches one of the string\'s natural frequencies.'],
        ['Harmonic', 'One of the allowed standing-wave patterns; the n-th harmonic of a fixed-fixed string has n half-wavelengths.'],
        ['Wave speed (v)', 'How fast a disturbance travels along the string, v = √(T/μ); it is not the speed of the string itself.'],
        ['Damping', 'Loss of wave energy to friction and air, which keeps the amplitude at resonance finite.'],
      ],
      id: [
        ['Gelombang berdiri', 'Pola gelombang yang berosilasi di tempat, terbentuk ketika gelombang dan pantulannya tumpang tindih pada frekuensi resonansi.'],
        ['Simpul', 'Titik pada tali yang tidak pernah bergerak; ujung tetap selalu menjadi simpul.'],
        ['Perut', 'Titik di tengah antara dua simpul tempat tali berayun dengan amplitudo terbesar.'],
        ['Panjang gelombang (λ)', 'Jarak antara dua titik yang bergerak seirama, sama dengan dua kali jarak simpul ke simpul.'],
        ['Resonansi', 'Tanggapan besar yang terbangun ketika frekuensi penggetar sama dengan salah satu frekuensi alami tali.'],
        ['Harmonik', 'Salah satu pola gelombang berdiri yang diperbolehkan; harmonik ke-n tali tetap-tetap memuat n setengah panjang gelombang.'],
        ['Kelajuan gelombang (v)', 'Seberapa cepat gangguan merambat sepanjang tali, v = √(T/μ); bukan kelajuan gerak tali itu sendiri.'],
        ['Redaman', 'Hilangnya energi gelombang ke gesekan dan udara, yang menjaga amplitudo resonansi tetap terbatas.'],
      ],
    },
    misconceptions: {
      en: [
        ['A standing wave is not really a wave because nothing travels along the string.', 'It is the sum of two travelling waves moving in opposite directions. Energy does travel back and forth; the two waves simply cancel at the nodes and reinforce at the antinodes.'],
        ['A free end is a node because nothing holds it.', 'The opposite: a free end can move as far as it likes, so it is an antinode. That is why a fixed-free string has a quarter-wavelength fundamental and only odd harmonics.'],
        ['Doubling the tension doubles the wave speed and the pitch.', 'Speed goes as the square root of tension, so doubling T raises v and the resonant frequencies by a factor of about 1.41. To double the pitch you need four times the tension.'],
        ['The string vibrates at its own natural frequency no matter how you drive it.', 'A driven string moves at the drive frequency. It is only when the drive matches a natural frequency that the motion grows into a large, clean standing wave.'],
      ],
      id: [
        ['Gelombang berdiri bukan gelombang sungguhan karena tidak ada yang merambat di tali.', 'Ia adalah jumlah dua gelombang berjalan yang bergerak berlawanan arah. Energi tetap merambat bolak-balik; kedua gelombang hanya saling meniadakan di simpul dan saling menguatkan di perut.'],
        ['Ujung bebas adalah simpul karena tidak ada yang menahannya.', 'Justru sebaliknya: ujung bebas boleh bergerak sejauh apa pun, sehingga menjadi perut. Itulah sebabnya tali tetap-bebas punya frekuensi dasar seperempat panjang gelombang dan hanya harmonik ganjil.'],
        ['Menggandakan tegangan menggandakan kelajuan gelombang dan nadanya.', 'Kelajuan sebanding dengan akar kuadrat tegangan, sehingga menggandakan T menaikkan v dan frekuensi resonansi sekitar 1,41 kali. Untuk menggandakan nada diperlukan empat kali tegangan.'],
        ['Tali bergetar pada frekuensi alaminya sendiri bagaimanapun cara menggetarkannya.', 'Tali yang digetarkan bergerak pada frekuensi penggetar. Hanya ketika frekuensi penggetar sama dengan frekuensi alami, geraknya tumbuh menjadi gelombang berdiri yang besar dan rapi.'],
      ],
    },
    realWorld: {
      en: [
        'Guitar and violin strings are fixed at both ends; pressing a fret shortens L and raises every harmonic, while tuning pegs change the tension.',
        'Bass strings on a piano are wound with extra wire to increase μ, which lowers the wave speed and the pitch without making the string impossibly long.',
        'Air columns behave the same way: a flute open at both ends has all harmonics, while a clarinet, effectively closed at the reed, has mainly odd harmonics, like the fixed-free string.',
        'Engineers test bridges and aircraft wings for resonant modes, because a periodic push at a natural frequency can build up dangerously large vibrations.',
      ],
      id: [
        'Senar gitar dan biola terikat di kedua ujung; menekan fret memperpendek L dan menaikkan semua harmonik, sedangkan pemutar senar mengubah tegangan.',
        'Senar bass piano dililit kawat tambahan untuk memperbesar μ, yang menurunkan kelajuan gelombang dan nada tanpa membuat senar terlalu panjang.',
        'Kolom udara berperilaku sama: seruling yang terbuka di kedua ujung memiliki semua harmonik, sedangkan klarinet yang praktis tertutup di bagian lidahnya terutama memiliki harmonik ganjil, seperti tali tetap-bebas.',
        'Insinyur menguji moda resonansi jembatan dan sayap pesawat, karena dorongan berkala pada frekuensi alami dapat membangun getaran yang membahayakan.',
      ],
    },
    questions: {
      en: [
        { q: 'In the sim with wave speed set to 80, the readout shows a fundamental of 0.80 Hz for a fixed-fixed string. At what drive frequencies will you see the n = 2 and n = 3 patterns?', a: 'At 1.60 Hz and 2.40 Hz. For fixed ends f_n = n f_1, so the harmonics are whole-number multiples of 0.80 Hz.' },
        { q: 'Switch the right end to free, keeping wave speed 80. What are the first three resonant frequencies, and why is 0.80 Hz missing?', a: 'f_1 = v/4L = 0.40 Hz, then 1.20 Hz and 2.00 Hz. A fixed-free string needs a node at one end and an antinode at the other, so only odd numbers of quarter-wavelengths fit; 0.80 Hz would need a node at the free end, which is impossible.' },
        { q: 'A guitarist wants the open string to sound one octave higher (twice the frequency) without changing its length. By what factor must the tension increase?', a: 'Four times. Frequency is proportional to v = √(T/μ), so doubling f needs doubling v, which needs quadrupling T. In practice the string would snap, which is why octaves are played with frets instead.' },
      ],
      id: [
        { q: 'Di simulasi dengan kelajuan gelombang 80, tampilan menunjukkan frekuensi dasar 0,80 Hz untuk tali tetap-tetap. Pada frekuensi penggetar berapa pola n = 2 dan n = 3 akan terlihat?', a: 'Pada 1,60 Hz dan 2,40 Hz. Untuk ujung tetap f_n = n f_1, sehingga harmoniknya adalah kelipatan bilangan bulat dari 0,80 Hz.' },
        { q: 'Ubah ujung kanan menjadi bebas dengan kelajuan gelombang tetap 80. Berapa tiga frekuensi resonansi pertama, dan mengapa 0,80 Hz tidak muncul?', a: 'f_1 = v/4L = 0,40 Hz, lalu 1,20 Hz dan 2,00 Hz. Tali tetap-bebas butuh simpul di satu ujung dan perut di ujung lain, sehingga hanya bilangan ganjil kali seperempat panjang gelombang yang muat; 0,80 Hz memerlukan simpul di ujung bebas, yang tidak mungkin.' },
        { q: 'Seorang gitaris ingin senar terbuka berbunyi satu oktaf lebih tinggi (frekuensi dua kali) tanpa mengubah panjangnya. Berapa kali tegangan harus dinaikkan?', a: 'Empat kali. Frekuensi sebanding dengan v = √(T/μ), sehingga menggandakan f butuh menggandakan v, yang butuh melipatempatkan T. Dalam praktik senar akan putus, itulah sebabnya oktaf dimainkan dengan fret.' },
      ],
    },
  },
};
