// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Connect coefficients to graph features (intercepts, turning points).',
      'Compare polynomials, exponentials, and trig functions side by side.',
      'Predict end behavior from leading term.',
    ],
    id: [
      'Menghubungkan koefisien dengan ciri grafik (titik potong, titik balik).',
      'Membandingkan polinomial, eksponensial, dan trigonometri.',
      'Memprediksi perilaku ujung dari suku pemimpin.',
    ],
  },  tryThis: {
    en: [
      'Set a=1, b=0, c=−4, d=0 — find the three roots.',
      'Switch to sine; double the frequency — what happens?',
      'Toggle to e^x — does anything cross y=0?',
    ],
    id: [
      'Atur a=1, b=0, c=−4, d=0 — temukan tiga akarnya.',
      'Beralih ke sinus; gandakan frekuensi — apa yang terjadi?',
      'Beralih ke e^x — apakah ada yang memotong y=0?',
    ],
  },
  // "Learn" section: the mathematics behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'A function is a rule that turns each input x into exactly one output y = f(x). Its graph is the set of all points (x, f(x)), so reading a graph is reading the rule: where the curve crosses the x-axis the output is zero (a root), where it crosses the y-axis you see f(0), and where it turns around the output stops growing and starts shrinking. The plotter draws the graph for x between −6 and 6 and shows the formula at the top, so every slider move changes a number in the formula and a shape on the screen at the same time.',
        'For the polynomial families the sliders are the coefficients. In the quadratic ax² + bx + c, the sign of a decides whether the parabola opens upward or downward, a larger |a| makes it narrower, and c is the y-intercept because f(0) = c. In the cubic ax³ + bx² + cx + d the leading term ax³ takes over for large |x|: with a positive, the curve falls on the far left and rises on the far right, and a cubic always crosses the x-axis at least once. The default a = 1, b = 0, c = −4, d = 0 gives f(x) = x³ − 4x = x(x − 2)(x + 2), which is why you see roots at −2, 0 and 2.',
        'For the sine and cosine families the sliders are labelled A, ω, φ and d to match the formula A·sin(ωx + φ) + d. A is the amplitude (half the height of the wave), ω controls how many waves fit in a given width (the period is 2π/ω, so doubling ω halves the period), φ slides the wave left or right, and d lifts the whole wave up or down. For a·e^(bx) + d the sign of b decides growth or decay, and the curve never reaches the line y = d: that line is a horizontal asymptote, which is why e^x alone never crosses y = 0. The logarithm a·ln(x) + d is only defined for x greater than 0, so the plotter leaves the left half empty.',
        'The plotter is a viewing window, not a complete picture. It only shows x from −6 to 6 and y from −6 to 6, so a parabola that opens upward still rises forever even though the curve leaves the window, and a very fast exponential looks almost vertical. Points are sampled 600 times across the width and joined with straight pieces, which looks smooth but can miss an extremely thin spike. Coefficients move in steps of 0.1 (0.05 for the exponent), so some exact values, such as roots at irrational numbers, can only be approximated.',
      ],
      id: [
        'Fungsi adalah aturan yang mengubah setiap masukan x menjadi tepat satu keluaran y = f(x). Grafiknya adalah kumpulan semua titik (x, f(x)), sehingga membaca grafik berarti membaca aturannya: di tempat kurva memotong sumbu-x keluarannya nol (akar), di tempat kurva memotong sumbu-y kamu melihat f(0), dan di tempat kurva berbalik arah keluarannya berhenti naik dan mulai turun. Penggambar ini melukis grafik untuk x antara −6 dan 6 dan menampilkan rumusnya di bagian atas, jadi setiap geseran slider mengubah sebuah angka di rumus dan sebuah bentuk di layar secara bersamaan.',
        'Untuk keluarga polinomial, slider-nya adalah koefisien. Pada fungsi kuadrat ax² + bx + c, tanda a menentukan parabola membuka ke atas atau ke bawah, |a| yang lebih besar membuatnya lebih sempit, dan c adalah titik potong sumbu-y karena f(0) = c. Pada fungsi kubik ax³ + bx² + cx + d, suku pemimpin ax³ mendominasi untuk |x| besar: dengan a positif, kurva turun di ujung kiri dan naik di ujung kanan, dan kubik selalu memotong sumbu-x paling sedikit sekali. Nilai awal a = 1, b = 0, c = −4, d = 0 memberi f(x) = x³ − 4x = x(x − 2)(x + 2), itulah sebabnya akar-akarnya terlihat di −2, 0, dan 2.',
        'Untuk keluarga sinus dan kosinus, slider-nya diberi label A, ω, φ, dan d agar sesuai dengan rumus A·sin(ωx + φ) + d. A adalah amplitudo (setengah tinggi gelombang), ω mengatur berapa banyak gelombang yang muat dalam lebar tertentu (periodenya 2π/ω, jadi menggandakan ω membuat periode setengahnya), φ menggeser gelombang ke kiri atau kanan, dan d mengangkat seluruh gelombang ke atas atau ke bawah. Untuk a·e^(bx) + d, tanda b menentukan pertumbuhan atau peluruhan, dan kurva tidak pernah menyentuh garis y = d: garis itu adalah asimtot mendatar, sehingga e^x saja tidak pernah memotong y = 0. Logaritma a·ln(x) + d hanya terdefinisi untuk x lebih besar dari 0, jadi penggambar mengosongkan sisi kiri.',
        'Penggambar ini adalah jendela pandang, bukan gambaran lengkap. Ia hanya menampilkan x dari −6 sampai 6 dan y dari −6 sampai 6, sehingga parabola yang membuka ke atas tetap naik selamanya meskipun kurvanya keluar dari jendela, dan eksponensial yang sangat cepat tampak hampir tegak. Titik dicuplik 600 kali sepanjang lebar lalu disambung dengan garis lurus, yang terlihat mulus tetapi bisa melewatkan lonjakan yang sangat tipis. Koefisien bergerak dalam langkah 0,1 (0,05 untuk pangkat eksponen), jadi beberapa nilai eksak, misalnya akar pada bilangan irasional, hanya bisa didekati.',
      ],
    },
    figure: {
      caption: {
        en: 'The default cubic f(x) = x³ − 4x. Roots (red) are where f(x) = 0; turning points (amber) are where the curve changes from rising to falling. With a positive, the ends go down on the left and up on the right.',
        id: 'Kubik awal f(x) = x³ − 4x. Akar (merah) adalah tempat f(x) = 0; titik balik (kuning) adalah tempat kurva berubah dari naik ke turun. Dengan a positif, ujung kiri turun dan ujung kanan naik.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Features of a cubic graph', 'Ciri-ciri grafik kubik')}">
  <style>text{font:12px system-ui,sans-serif;fill:currentColor}.m{fill:none;stroke:currentColor;stroke-width:1.2;opacity:.45}.s{font-size:10px;opacity:.7}</style>
  <line x1="30" y1="120" x2="330" y2="120" class="m"/>
  <line x1="180" y1="12" x2="180" y2="228" class="m"/>
  <text x="318" y="134" class="s">x</text>
  <text x="186" y="20" class="s">y</text>
  <text x="80" y="134" class="s">−2</text>
  <text x="270" y="134" class="s">2</text>
  <clipPath id="w"><rect x="30" y="12" width="300" height="216"/></clipPath>
  <path d="M58.7 239.6 L68 190.4 L77.3 150.8 L86.7 120 L96 97.2 L105.3 81.6 L114.7 72.4 L124 68.8 L133.3 70 L142.7 75.2 L152 83.6 L161.3 94.4 L170.7 106.8 L180 120 L189.3 133.2 L198.7 145.6 L208 156.4 L217.3 164.8 L226.7 170 L236 171.2 L245.3 167.6 L254.7 158.4 L264 142.8 L273.3 120 L282.7 89.2 L292 49.6 L301.3 0.4" fill="none" stroke="#3b82f6" stroke-width="2.5" stroke-linejoin="round" clip-path="url(#w)"/>
  <circle cx="86.7" cy="120" r="4.5" fill="#ef4444"/>
  <circle cx="180" cy="120" r="4.5" fill="#ef4444"/>
  <circle cx="273.3" cy="120" r="4.5" fill="#ef4444"/>
  <text x="200" y="112" fill="#ef4444">${L('roots: f(x) = 0', 'akar: f(x) = 0')}</text>
  <circle cx="126.1" cy="68.7" r="4.5" fill="#f59e0b"/>
  <circle cx="233.9" cy="171.3" r="4.5" fill="#f59e0b"/>
  <text x="40" y="60" fill="#f59e0b">${L('turning point', 'titik balik')}</text>
  <text x="222" y="190" fill="#f59e0b">${L('turning point', 'titik balik')}</text>
  <text x="34" y="226" fill="#10b981" class="s">${L('left end: down (a greater than 0)', 'ujung kiri: turun (a lebih dari 0)')}</text>
  <text x="206" y="34" fill="#10b981" class="s">${L('right end: up', 'ujung kanan: naik')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'A root is an x where f(x) = 0, so it is where the graph crosses or touches the x-axis.',
        'The constant term is the y-intercept, because every other term vanishes at x = 0.',
        'For large |x| the highest-power term controls the shape, so its sign and degree fix the end behaviour.',
        'In A·sin(ωx + φ) + d, A sets the height, ω the number of waves (period 2π/ω), φ the horizontal shift and d the vertical shift.',
        'An exponential a·e^(bx) + d approaches the line y = d but never reaches it; the logarithm exists only for x greater than 0.',
      ],
      id: [
        'Akar adalah nilai x dengan f(x) = 0, yaitu tempat grafik memotong atau menyentuh sumbu-x.',
        'Suku konstanta adalah titik potong sumbu-y, karena semua suku lain bernilai nol saat x = 0.',
        'Untuk |x| besar suku berpangkat tertinggi menguasai bentuk grafik, jadi tanda dan derajatnya menentukan perilaku ujung.',
        'Pada A·sin(ωx + φ) + d, A mengatur tinggi, ω jumlah gelombang (periode 2π/ω), φ pergeseran mendatar, dan d pergeseran tegak.',
        'Eksponensial a·e^(bx) + d mendekati garis y = d tetapi tidak pernah menyentuhnya; logaritma hanya ada untuk x lebih dari 0.',
      ],
    },
    vocabulary: {
      en: [
        ['Coefficient', 'A number multiplying a term, such as the a in ax². Changing it stretches, flips or shifts the graph.'],
        ['Root (zero)', 'An input x for which f(x) = 0; graphically, a crossing of the x-axis.'],
        ['Intercept', 'Where the graph meets an axis: the y-intercept is f(0), the x-intercepts are the roots.'],
        ['Turning point', 'A point where the graph changes from rising to falling (a local maximum) or from falling to rising (a local minimum).'],
        ['End behaviour', 'What the graph does as x becomes very large or very negative; for polynomials it is decided by the leading term.'],
        ['Amplitude', 'For a sine or cosine wave, the distance from the midline to a peak: the A in A·sin(ωx + φ).'],
        ['Period', 'The width of one full wave; for sin(ωx) it equals 2π/ω.'],
        ['Asymptote', 'A line the graph gets ever closer to without reaching, such as y = d for a·e^(bx) + d.'],
      ],
      id: [
        ['Koefisien', 'Bilangan yang mengalikan sebuah suku, misalnya a pada ax². Mengubahnya meregangkan, membalik, atau menggeser grafik.'],
        ['Akar (pembuat nol)', 'Masukan x yang membuat f(x) = 0; pada grafik, perpotongan dengan sumbu-x.'],
        ['Titik potong', 'Tempat grafik bertemu sumbu: titik potong sumbu-y adalah f(0), titik potong sumbu-x adalah akar-akarnya.'],
        ['Titik balik', 'Titik tempat grafik berubah dari naik ke turun (maksimum lokal) atau dari turun ke naik (minimum lokal).'],
        ['Perilaku ujung', 'Apa yang dilakukan grafik ketika x sangat besar atau sangat negatif; untuk polinomial ditentukan oleh suku pemimpin.'],
        ['Amplitudo', 'Untuk gelombang sinus atau kosinus, jarak dari garis tengah ke puncak: A pada A·sin(ωx + φ).'],
        ['Periode', 'Lebar satu gelombang penuh; untuk sin(ωx) nilainya 2π/ω.'],
        ['Asimtot', 'Garis yang semakin didekati grafik tanpa pernah dicapai, misalnya y = d untuk a·e^(bx) + d.'],
      ],
    },
    misconceptions: {
      en: [
        ['A bigger a in ax² makes the parabola wider.', 'It makes it narrower. A larger a multiplies every output by more, so the curve climbs faster away from the vertex. Values of a between 0 and 1 make it wider.'],
        ['A cubic always has three roots.', 'A real cubic always has at least one real root but may have only one, as x³ + x shows. Three real roots appear only when the curve dips back across the axis, as in x³ − 4x.'],
        ['Increasing the frequency slider makes the sine wave taller.', 'Frequency (ω) changes how many waves fit in the window, not their height. Height is controlled by the amplitude A.'],
        ['The exponential e^x eventually reaches zero on the left.', 'It gets closer and closer to zero but is never zero; y = 0 is an asymptote. On the screen the curve merges with the axis, which hides this.'],
      ],
      id: [
        ['Nilai a yang lebih besar pada ax² membuat parabola lebih lebar.', 'Justru lebih sempit. Nilai a yang lebih besar mengalikan setiap keluaran dengan lebih banyak, sehingga kurva menanjak lebih cepat menjauhi puncak. Nilai a antara 0 dan 1 membuatnya lebih lebar.'],
        ['Fungsi kubik selalu punya tiga akar.', 'Kubik real selalu punya paling sedikit satu akar real, tetapi bisa hanya satu, seperti pada x³ + x. Tiga akar real muncul hanya jika kurva turun kembali memotong sumbu, seperti pada x³ − 4x.'],
        ['Menaikkan slider frekuensi membuat gelombang sinus lebih tinggi.', 'Frekuensi (ω) mengubah jumlah gelombang yang muat di jendela, bukan tingginya. Tinggi diatur oleh amplitudo A.'],
        ['Eksponensial e^x akhirnya mencapai nol di sisi kiri.', 'Ia semakin dekat ke nol tetapi tidak pernah nol; y = 0 adalah asimtot. Di layar kurva menyatu dengan sumbu, dan itu menyembunyikan fakta ini.'],
      ],
    },
    realWorld: {
      en: [
        'The height of a thrown ball over time follows a downward-opening parabola; the roots are the launch and landing times.',
        'Sound and alternating current are sine waves: pitch and mains frequency are the ω slider, loudness and voltage are the amplitude A.',
        'Bacterial growth, compound interest and radioactive decay all follow a·e^(bx) + d, with b positive for growth and negative for decay.',
        'The decibel scale for loudness and the pH scale for acidity are logarithmic, which is why a·ln(x) grows so slowly for large x.',
      ],
      id: [
        'Ketinggian bola yang dilempar terhadap waktu mengikuti parabola yang membuka ke bawah; akar-akarnya adalah saat lempar dan saat mendarat.',
        'Bunyi dan arus bolak-balik adalah gelombang sinus: nada dan frekuensi listrik PLN adalah slider ω, kenyaringan dan tegangan adalah amplitudo A.',
        'Pertumbuhan bakteri, bunga majemuk, dan peluruhan radioaktif semuanya mengikuti a·e^(bx) + d, dengan b positif untuk pertumbuhan dan negatif untuk peluruhan.',
        'Skala desibel untuk kenyaringan dan skala pH untuk keasaman bersifat logaritmik, itulah sebabnya a·ln(x) tumbuh begitu lambat untuk x besar.',
      ],
    },
    questions: {
      en: [
        { q: 'With the cubic set to a = 1, b = 0, c = −4, d = 0, the roots are −2, 0 and 2. If you now raise d to 1, how many roots do you expect and why?', a: 'Still three. Raising d lifts the whole curve by 1, so the roots move but the curve still has a peak above the axis and a trough below it (the peak is at about 3.08 before lifting, the trough at about −3.08). All three crossings survive; they just shift slightly.' },
        { q: 'A sine wave is set to A = 2, ω = 1, φ = 0, d = 0. What is its period, and what happens to the period when ω is set to 2?', a: 'The period is 2π/ω = 2π ≈ 6.28, so about one full wave fits in the window from −6 to 6. With ω = 2 the period halves to π ≈ 3.14, so about four waves fit. The amplitude stays 2.' },
        { q: 'Why does the graph of a·e^(bx) + d with a = 1, b = 1, d = 0 never cross the x-axis, while the cubic always does?', a: 'e^x is positive for every x, so the output can get very close to 0 on the left but never equals or crosses it: y = 0 is an asymptote. A cubic with positive a goes to very negative values on the left and very positive values on the right, so somewhere in between it must pass through zero.' },
      ],
      id: [
        { q: 'Dengan kubik diatur ke a = 1, b = 0, c = −4, d = 0, akarnya adalah −2, 0, dan 2. Jika d dinaikkan menjadi 1, berapa akar yang kamu harapkan dan mengapa?', a: 'Tetap tiga. Menaikkan d mengangkat seluruh kurva sebesar 1, sehingga akarnya bergeser tetapi kurva masih punya puncak di atas sumbu dan lembah di bawahnya (puncak sekitar 3,08 sebelum diangkat, lembah sekitar −3,08). Ketiga perpotongan tetap ada, hanya bergeser sedikit.' },
        { q: 'Gelombang sinus diatur ke A = 2, ω = 1, φ = 0, d = 0. Berapa periodenya, dan apa yang terjadi pada periode jika ω diatur ke 2?', a: 'Periodenya 2π/ω = 2π ≈ 6,28, jadi sekitar satu gelombang penuh muat di jendela dari −6 sampai 6. Dengan ω = 2 periodenya menjadi setengah, π ≈ 3,14, jadi sekitar empat gelombang muat. Amplitudonya tetap 2.' },
        { q: 'Mengapa grafik a·e^(bx) + d dengan a = 1, b = 1, d = 0 tidak pernah memotong sumbu-x, sedangkan kubik selalu memotongnya?', a: 'e^x positif untuk setiap x, sehingga keluarannya bisa sangat dekat ke 0 di sisi kiri tetapi tidak pernah sama dengan atau melewati 0: y = 0 adalah asimtot. Kubik dengan a positif bernilai sangat negatif di kiri dan sangat positif di kanan, jadi di antaranya ia pasti melewati nol.' },
      ],
    },
  },
};
