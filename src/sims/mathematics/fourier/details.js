// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'See that any periodic function is a sum of sines and cosines.',
      'Compare partial sums to the target with N terms.',
      'Recognize the Gibbs overshoot near discontinuities.',
    ],
    id: [
      'Melihat bahwa fungsi periodik apa pun adalah jumlah sinus dan kosinus.',
      'Membandingkan jumlah parsial dengan target untuk N suku.',
      'Mengenali overshoot Gibbs di dekat diskontinuitas.',
    ],
  },  tryThis: {
    en: [
      'Square wave with N=1 — just a single sine.',
      'N=20 — sharp edges with persistent ripple.',
      'Switch to triangle — does it converge faster (no jumps)?',
    ],
    id: [
      'Gelombang persegi dengan N=1 — hanya satu sinus.',
      'N=20 — tepi tajam dengan riak yang gigih.',
      'Beralih ke segitiga — apakah konvergensi lebih cepat (tanpa lompatan)?',
    ],
  },
  // "Learn" section: the mathematics behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'A sine wave is the simplest repeating signal, but most repeating signals are not sine waves: a square wave jumps between two values, a sawtooth climbs and drops. Fourier\'s discovery is that any reasonably well-behaved periodic function can be written as a sum of sine and cosine waves whose frequencies are whole-number multiples of the basic frequency. The multiples are called harmonics, and the numbers in front of them, the Fourier coefficients, say how much of each harmonic the signal contains. Adding only the first N harmonics gives a partial sum, an approximation that improves as N grows.',
        'For the square wave with period 2π that switches between −1 and 1, the series is (4/π)·(sin x + sin 3x/3 + sin 5x/5 + ...). Only odd harmonics appear, because the wave has a symmetry that even harmonics would break, and the coefficients fall off like 1/n. The sawtooth also has coefficients falling like 1/n, with every harmonic present. The triangle wave is continuous, with corners instead of jumps, and its coefficients fall much faster, like 1/n², so far fewer terms are needed for a good fit. In general, the smoother the function, the faster its coefficients shrink.',
        'In the simulation the gray curve is the target waveform and the thick blue curve is the partial sum with the number of harmonics set by the N slider. For the square wave only odd n contribute, so N = 1 and N = 2 look identical. The toggle shows faded copies of the individual harmonics that make up the partial sum, each drawn with its actual Fourier coefficient, so for the square and triangle waves only the odd harmonics appear and higher ones are visibly smaller. Watching the blue curve as N climbs from 1 to 50 shows how a stack of smooth waves builds a shape with nearly vertical edges.',
        'The ripple near each jump of the square wave never goes away. As N grows the ripple gets narrower and moves closer to the jump, but its height settles at about 9% of the size of the jump, so the partial sum overshoots to roughly 1.18 instead of 1. This is the Gibbs phenomenon, and it is unavoidable for any function with a discontinuity; the triangle wave, having no jumps, shows no overshoot. The simulation is limited to three fixed waveforms with period 2π and at most 50 harmonics, and the horizontal window spans two periods from −2π to 2π.',
      ],
      id: [
        'Gelombang sinus adalah sinyal berulang yang paling sederhana, tetapi kebanyakan sinyal berulang bukan sinus: gelombang persegi melompat antara dua nilai, gigi gergaji menanjak lalu jatuh. Penemuan Fourier: fungsi periodik apa pun yang cukup "baik" dapat ditulis sebagai jumlah gelombang sinus dan kosinus yang frekuensinya kelipatan bulat dari frekuensi dasar. Kelipatan itu disebut harmonik, dan bilangan di depannya, koefisien Fourier, menyatakan seberapa banyak tiap harmonik terkandung dalam sinyal. Menjumlahkan hanya N harmonik pertama menghasilkan jumlah parsial, pendekatan yang membaik saat N bertambah.',
        'Untuk gelombang persegi berperiode 2π yang berganti antara −1 dan 1, deretnya adalah (4/π)·(sin x + sin 3x/3 + sin 5x/5 + ...). Hanya harmonik ganjil yang muncul, karena gelombang ini punya simetri yang akan rusak oleh harmonik genap, dan koefisiennya mengecil seperti 1/n. Gigi gergaji juga berkoefisien yang mengecil seperti 1/n, dengan semua harmonik hadir. Gelombang segitiga bersifat kontinu, bersudut tetapi tanpa lompatan, dan koefisiennya mengecil jauh lebih cepat, seperti 1/n², sehingga jauh lebih sedikit suku yang dibutuhkan untuk kecocokan yang baik. Secara umum, semakin mulus fungsinya, semakin cepat koefisiennya menyusut.',
        'Dalam simulasi, kurva abu-abu adalah bentuk gelombang target dan kurva biru tebal adalah jumlah parsial dengan jumlah harmonik yang diatur slider N. Untuk gelombang persegi hanya n ganjil yang berperan, jadi N = 1 dan N = 2 tampak sama. Tombol toggle menampilkan salinan pudar tiap harmonik yang menyusun jumlah parsial, masing-masing digambar dengan koefisien Fourier sebenarnya, sehingga untuk gelombang persegi dan segitiga hanya harmonik ganjil yang muncul dan harmonik yang lebih tinggi tampak lebih kecil. Mengamati kurva biru saat N naik dari 1 ke 50 memperlihatkan bagaimana tumpukan gelombang mulus membangun bentuk dengan tepi yang hampir tegak.',
        'Riak di dekat tiap lompatan gelombang persegi tidak pernah hilang. Saat N bertambah riak itu menyempit dan bergeser mendekati lompatan, tetapi tingginya menetap sekitar 9% dari besar lompatan, sehingga jumlah parsial melampaui target hingga kira-kira 1,18, bukan 1. Inilah fenomena Gibbs, dan ini tak terhindarkan untuk fungsi apa pun yang punya diskontinuitas; gelombang segitiga, yang tidak melompat, tidak menunjukkan overshoot. Simulasi ini terbatas pada tiga bentuk gelombang tetap berperiode 2π dengan paling banyak 50 harmonik, dan jendela mendatarnya mencakup dua periode dari −2π sampai 2π.',
      ],
    },
    figure: {
      caption: {
        en: 'Building a square wave: the first three odd harmonics (4/π)·sin x, (4/π)·sin 3x/3 and (4/π)·sin 5x/5 (faded) add up to the blue partial sum, which already hugs the gray target and shows the overshoot near each jump.',
        id: 'Membangun gelombang persegi: tiga harmonik ganjil pertama (4/π)·sin x, (4/π)·sin 3x/3, dan (4/π)·sin 5x/5 (pudar) dijumlahkan menjadi jumlah parsial biru, yang sudah menempel pada target abu-abu dan menunjukkan overshoot di dekat tiap lompatan.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Sine harmonics adding up to a square wave', 'Harmonik sinus yang dijumlahkan menjadi gelombang persegi')}">
  <style>text{font:12px system-ui,sans-serif;fill:currentColor}.m{fill:none;stroke:currentColor;stroke-width:1.2;opacity:.45}.s{font-size:10px;opacity:.7}.h{fill:none;stroke-width:1.3;opacity:.55}</style>
  <line x1="20" y1="120" x2="340" y2="120" class="m"/>
  <line x1="180" y1="20" x2="180" y2="220" class="m"/>
  <text x="14" y="134" class="s">−π</text>
  <text x="330" y="134" class="s">π</text>
  <text x="184" y="31" class="s">x = 0</text>
  <path d="M20 179.4 L180 179.4 L180 60.6 L340 60.6" fill="none" stroke="currentColor" stroke-width="1.6" stroke-dasharray="5 4" opacity=".6"/>
  <text x="262" y="56" class="s">${L('target: square wave (+1 / −1)', 'target: gelombang persegi (+1 / −1)')}</text>
  <path d="M20 120 L30 134.7 L40 148.9 L50 162 L60 173.5 L70 182.9 L80 189.8 L90 194.1 L100 195.6 L110 194.1 L120 189.8 L130 182.9 L140 173.5 L150 162 L160 148.9 L170 134.7 L180 120 L190 105.3 L200 91.1 L210 78 L220 66.5 L230 57.1 L240 50.2 L250 45.9 L260 44.4 L270 45.9 L280 50.2 L290 57.1 L300 66.5 L310 78 L320 91.1 L330 105.3 L340 120" class="h" stroke="#10b981"/>
  <path d="M20 120 L26.7 129.6 L33.3 137.8 L40 143.3 L46.7 145.2 L53.3 143.3 L60 137.8 L66.7 129.6 L73.3 120 L80 110.4 L86.7 102.2 L93.3 96.7 L100 94.8 L106.7 96.7 L113.3 102.2 L120 110.4 L126.7 120 L133.3 129.6 L140 137.8 L146.7 143.3 L153.3 145.2 L160 143.3 L166.7 137.8 L173.3 129.6 L180 120 L186.7 110.4 L193.3 102.2 L200 96.7 L206.7 94.8 L213.3 96.7 L220 102.2 L226.7 110.4 L233.3 120 L240 129.6 L246.7 137.8 L253.3 143.3 L260 145.2 L266.7 143.3 L273.3 137.8 L280 129.6 L286.7 120 L293.3 110.4 L300 102.2 L306.7 96.7 L313.3 94.8 L320 96.7 L326.7 102.2 L333.3 110.4 L340 120" class="h" stroke="#f59e0b"/>
  <path d="M20 120 L25.3 127.6 L30.7 133.1 L36 135.1 L41.3 133.1 L46.7 127.6 L52 120 L57.3 112.4 L62.7 106.9 L68 104.9 L73.3 106.9 L78.7 112.4 L84 120 L89.3 127.6 L94.7 133.1 L100 135.1 L105.3 133.1 L110.7 127.6 L116 120 L121.3 112.4 L126.7 106.9 L132 104.9 L137.3 106.9 L142.7 112.4 L148 120 L153.3 127.6 L158.7 133.1 L164 135.1 L169.3 133.1 L174.7 127.6 L180 120 L185.3 112.4 L190.7 106.9 L196 104.9 L201.3 106.9 L206.7 112.4 L212 120 L217.3 127.6 L222.7 133.1 L228 135.1 L233.3 133.1 L238.7 127.6 L244 120 L249.3 112.4 L254.7 106.9 L260 104.9 L265.3 106.9 L270.7 112.4 L276 120 L281.3 127.6 L286.7 133.1 L292 135.1 L297.3 133.1 L302.7 127.6 L308 120 L313.3 112.4 L318.7 106.9 L324 104.9 L329.3 106.9 L334.7 112.4 L340 120" class="h" stroke="#8b5cf6"/>
  <path d="M20 120 L24 137.6 L28 154 L32 168 L36 178.9 L40 186.2 L44 189.9 L48 190.4 L52 188.4 L56 184.8 L60 180.6 L64 176.7 L68 173.8 L72 172.5 L76 172.7 L80 174.4 L84 177.1 L88 180.1 L92 182.9 L96 184.8 L100 185.5 L104 184.8 L108 182.9 L112 180.1 L116 177.1 L120 174.4 L124 172.7 L128 172.5 L132 173.8 L136 176.7 L140 180.6 L144 184.8 L148 188.4 L152 190.4 L156 189.9 L160 186.2 L164 178.9 L168 168 L172 154 L176 137.6 L180 120 L184 102.4 L188 86 L192 72 L196 61.1 L200 53.8 L204 50.1 L208 49.6 L212 51.6 L216 55.2 L220 59.4 L224 63.3 L228 66.2 L232 67.5 L236 67.3 L240 65.6 L244 62.9 L248 59.9 L252 57.1 L256 55.2 L260 54.5 L264 55.2 L268 57.1 L272 59.9 L276 62.9 L280 65.6 L284 67.3 L288 67.5 L292 66.2 L296 63.3 L300 59.4 L304 55.2 L308 51.6 L312 49.6 L316 50.1 L320 53.8 L324 61.1 L328 72 L332 86 L336 102.4 L340 120" fill="none" stroke="#3b82f6" stroke-width="2.4" stroke-linejoin="round"/>
  <text x="26" y="214" fill="#10b981" class="s">n = 1</text>
  <text x="60" y="214" fill="#f59e0b" class="s">n = 3</text>
  <text x="94" y="214" fill="#8b5cf6" class="s">n = 5</text>
  <text x="128" y="214" fill="#3b82f6" class="s">${L('sum of the three', 'jumlah ketiganya')}</text>
  <line x1="208" y1="49.6" x2="236" y2="40" stroke="#ef4444" stroke-width="1.2"/>
  <text x="238" y="38" fill="#ef4444" class="s">${L('Gibbs overshoot', 'overshoot Gibbs')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Any reasonably well-behaved periodic function is a sum of sines and cosines whose frequencies are whole-number multiples of the fundamental.',
        'The square wave needs only odd harmonics, with coefficients 4/(πn); the partial sum with N terms is the best fit using those frequencies.',
        'Smoother functions have faster-shrinking coefficients: 1/n for jumps (square, sawtooth), 1/n² for corners (triangle).',
        'Near a jump the partial sums overshoot by about 9% of the jump no matter how many terms are added; this is the Gibbs phenomenon.',
        'Adding more harmonics narrows the ripple and sharpens the edge, but cannot remove the overshoot.',
      ],
      id: [
        'Fungsi periodik apa pun yang cukup "baik" adalah jumlah sinus dan kosinus dengan frekuensi kelipatan bulat dari frekuensi dasar.',
        'Gelombang persegi hanya membutuhkan harmonik ganjil, dengan koefisien 4/(πn); jumlah parsial dengan N suku adalah kecocokan terbaik yang memakai frekuensi-frekuensi itu.',
        'Fungsi yang lebih mulus punya koefisien yang menyusut lebih cepat: 1/n untuk lompatan (persegi, gigi gergaji), 1/n² untuk sudut (segitiga).',
        'Di dekat lompatan, jumlah parsial melampaui target sekitar 9% dari besar lompatan berapa pun suku yang ditambahkan; inilah fenomena Gibbs.',
        'Menambah harmonik mempersempit riak dan menajamkan tepi, tetapi tidak dapat menghilangkan overshoot.',
      ],
    },
    vocabulary: {
      en: [
        ['Periodic function', 'A function that repeats itself after a fixed interval, the period; here the period is 2π.'],
        ['Harmonic', 'A sine or cosine whose frequency is a whole-number multiple n of the fundamental frequency.'],
        ['Fourier coefficient', 'The number multiplying each harmonic in the series; it measures how much of that frequency the signal contains.'],
        ['Partial sum', 'The sum of only the first N terms of the series, used as an approximation of the full function.'],
        ['Fundamental', 'The harmonic with n = 1, which has the same period as the whole signal.'],
        ['Gibbs phenomenon', 'The persistent overshoot of about 9% of the jump that partial sums show beside any discontinuity.'],
        ['Discontinuity', 'A point where the function jumps from one value to another, as the square wave does at every multiple of π.'],
      ],
      id: [
        ['Fungsi periodik', 'Fungsi yang mengulang dirinya setelah selang tetap, yaitu periode; di sini periodenya 2π.'],
        ['Harmonik', 'Sinus atau kosinus yang frekuensinya kelipatan bulat n dari frekuensi dasar.'],
        ['Koefisien Fourier', 'Bilangan yang mengalikan tiap harmonik dalam deret; mengukur seberapa banyak frekuensi itu terkandung dalam sinyal.'],
        ['Jumlah parsial', 'Jumlah dari hanya N suku pertama deret, dipakai sebagai pendekatan fungsi lengkapnya.'],
        ['Frekuensi dasar', 'Harmonik dengan n = 1, yang periodenya sama dengan periode seluruh sinyal.'],
        ['Fenomena Gibbs', 'Overshoot gigih sekitar 9% dari besar lompatan yang ditunjukkan jumlah parsial di samping setiap diskontinuitas.'],
        ['Diskontinuitas', 'Titik tempat fungsi melompat dari satu nilai ke nilai lain, seperti gelombang persegi di setiap kelipatan π.'],
      ],
    },
    misconceptions: {
      en: [
        ['With enough terms the ripple at the edges disappears completely.', 'The ripple gets narrower but its peak stays near 9% of the jump height. In the limit the series converges at every point except the jump itself, yet the overshoot never shrinks to zero.'],
        ['Every harmonic contributes to every waveform.', 'Symmetry can silence whole families of harmonics. The square and triangle waves here contain only odd harmonics; adding the even ones would do nothing.'],
        ['The series is only an approximation of the square wave.', 'The partial sums are approximations; the infinite series equals the square wave at every point where it is continuous, and gives the midpoint value 0 at the jumps.'],
        ['Setting N = 2 for the square wave adds a second harmonic.', 'The second harmonic has coefficient zero for the square wave, so N = 2 draws exactly the same curve as N = 1. The next change happens at N = 3.'],
      ],
      id: [
        ['Dengan suku yang cukup banyak, riak di tepi hilang sama sekali.', 'Riaknya menyempit, tetapi puncaknya tetap sekitar 9% dari tinggi lompatan. Dalam limit, deret konvergen di setiap titik kecuali di lompatan itu sendiri, namun overshoot tidak pernah menyusut ke nol.'],
        ['Setiap harmonik berkontribusi pada setiap bentuk gelombang.', 'Simetri dapat membuat seluruh keluarga harmonik lenyap. Gelombang persegi dan segitiga di sini hanya mengandung harmonik ganjil; menambahkan yang genap tidak berpengaruh apa pun.'],
        ['Deret ini hanya pendekatan gelombang persegi.', 'Jumlah parsialnya pendekatan; deret tak hingganya sama persis dengan gelombang persegi di setiap titik kontinu, dan memberi nilai tengah 0 di lompatan.'],
        ['Mengatur N = 2 untuk gelombang persegi menambahkan harmonik kedua.', 'Harmonik kedua berkoefisien nol untuk gelombang persegi, jadi N = 2 menggambar kurva yang persis sama dengan N = 1. Perubahan berikutnya terjadi pada N = 3.'],
      ],
    },
    realWorld: {
      en: [
        'A musical note from a violin and the same note from a flute share a fundamental but have different harmonic coefficients; that difference is what we hear as timbre.',
        'MP3 and JPEG compression keep the large Fourier-type coefficients and discard the small ones, which is why they shrink files with little visible or audible loss.',
        'Digital square-wave clock signals in electronics contain high harmonics, so wires carrying them can radiate interference at many times the clock frequency.',
        'Overshoot in sharpened digital images (ringing around edges) is the Gibbs phenomenon appearing in two dimensions.',
      ],
      id: [
        'Nada dari biola dan nada yang sama dari seruling berbagi frekuensi dasar tetapi berbeda koefisien harmoniknya; perbedaan itulah yang kita dengar sebagai warna bunyi.',
        'Kompresi MP3 dan JPEG menyimpan koefisien jenis Fourier yang besar dan membuang yang kecil, sehingga ukuran berkas mengecil dengan sedikit kehilangan yang terlihat atau terdengar.',
        'Sinyal clock gelombang persegi dalam elektronika digital mengandung harmonik tinggi, sehingga kabel yang membawanya dapat memancarkan gangguan pada frekuensi berkali-kali lipat frekuensi clock.',
        'Overshoot pada gambar digital yang ditajamkan (dering di sekitar tepi) adalah fenomena Gibbs yang muncul dalam dua dimensi.',
      ],
    },
    questions: {
      en: [
        { q: 'For the square wave, what is the coefficient of sin 7x, and about how large is it compared with the fundamental?', a: 'The series is (4/π)·sin(nx)/n for odd n, so the coefficient of sin 7x is 4/(7π) ≈ 0.18. The fundamental has 4/π ≈ 1.27, so the seventh harmonic is one seventh as large.' },
        { q: 'Why does the triangle wave look almost perfect at N = 9 while the square wave still has visible ripple at N = 50?', a: 'The triangle wave is continuous, so its coefficients fall like 1/n²: the ninth harmonic is already only 1/81 of the first. The square wave has jumps, its coefficients fall only like 1/n, and the Gibbs overshoot of about 9% remains beside each jump however many terms are used.' },
        { q: 'At the jump x = 0 the square wave target has no single value. What value does the partial sum take there, and why?', a: 'Every term sin(nx) is zero at x = 0, so every partial sum equals 0 there. That is the average of the two sides, −1 and +1, which is the value a Fourier series always converges to at a jump.' },
      ],
      id: [
        { q: 'Untuk gelombang persegi, berapa koefisien sin 7x, dan kira-kira seberapa besar dibandingkan frekuensi dasarnya?', a: 'Deretnya (4/π)·sin(nx)/n untuk n ganjil, jadi koefisien sin 7x adalah 4/(7π) ≈ 0,18. Frekuensi dasar berkoefisien 4/π ≈ 1,27, jadi harmonik ketujuh besarnya sepertujuhnya.' },
        { q: 'Mengapa gelombang segitiga tampak hampir sempurna pada N = 9 sementara gelombang persegi masih beriak pada N = 50?', a: 'Gelombang segitiga kontinu, jadi koefisiennya turun seperti 1/n²: harmonik kesembilan hanya 1/81 dari yang pertama. Gelombang persegi punya lompatan, koefisiennya turun hanya seperti 1/n, dan overshoot Gibbs sekitar 9% tetap ada di samping tiap lompatan berapa pun suku yang dipakai.' },
        { q: 'Di lompatan x = 0 target gelombang persegi tidak punya satu nilai. Berapa nilai jumlah parsial di sana, dan mengapa?', a: 'Setiap suku sin(nx) bernilai nol di x = 0, jadi setiap jumlah parsial sama dengan 0 di sana. Itu rata-rata kedua sisi, −1 dan +1, yaitu nilai yang selalu didekati deret Fourier di suatu lompatan.' },
      ],
    },
  },
};
