// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Apply N(t) = N₀ · 2^(−t/T₁⁄₂).',
      'See randomness on individual atoms aggregate to a smooth curve.',
      'Read half-life from a decay graph.',
    ],
    id: [
      'Menerapkan N(t) = N₀ · 2^(−t/T₁⁄₂).',
      'Melihat keacakan tiap atom membentuk kurva halus saat digabung.',
      'Membaca waktu paruh dari grafik peluruhan.',
    ],
  },
  tryThis: {
    en: [
      'Start with 100 atoms — when do half remain?',
      'Compare 100 vs 1000 — which curve is smoother?',
      'Run several times — does the timing of any individual decay vary?',
    ],
    id: [
      'Mulai dengan 100 atom — kapan setengahnya tersisa?',
      'Bandingkan 100 vs 1000 — kurva mana yang lebih halus?',
      'Jalankan beberapa kali — apakah waktu peluruhan tiap atom berbeda?',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'Some atomic nuclei are unstable: sooner or later they rearrange themselves, emitting radiation and turning into a different nucleus. Nobody can say when a particular nucleus will do this. What is fixed is the probability: every nucleus of a given isotope has the same chance of decaying in the next second, no matter how old it is or what the temperature or chemical surroundings are. For a large sample this randomness produces a very regular pattern. The time for half the nuclei to decay is the half-life, T½, and it is the same whether you start with a gram or a tonne: after one half-life half remain, after two a quarter, after three an eighth, so N(t) = N₀ · (1/2)^(t/T½).',
        'The simulation plays this game atom by atom. Each frame, every surviving atom draws a random number and decays if it falls below the probability p = 1 − exp(−ln 2 · Δt / T½), which is exactly the chance of decaying in a time step Δt for a nucleus with the chosen half-life. A yellow dot turns grey when it decays. The green curve records how many are left, and the dashed blue curve is the smooth formula N₀ · (1/2)^(t/T½). Dashed vertical lines mark 1, 2, 3 … half-lives and the horizontal labels show N₀/2, N₀/4, N₀/8 so you can check the halving by eye.',
        'The N₀ slider sets how many atoms you start with, and it teaches the most important statistical lesson of the topic. With 20 atoms the green curve is a jagged staircase that can wander well away from the formula; with 1000 it hugs the dashed line. The law of large numbers is why the decay of a real sample, with 10²⁰ nuclei, is so smooth and predictable that it can be used as a clock. The half-life slider stretches or compresses the time axis; the sim covers 0.5 to 30 s, while real half-lives range from microseconds to billions of years, with identical mathematics. Hover over the graph to compare the theoretical and actual counts at any time.',
        'The sim ignores what the atoms turn into. In reality a decayed atom is a new nucleus, often of a different element, and that daughter may itself be radioactive and start its own decay with its own half-life, forming a chain. It also does not show the kind of radiation (alpha, beta or gamma) or the energy released, and it treats all atoms as the same isotope. Activity, the number of decays per second, is proportional to the number of atoms left (A = λN with λ = ln 2 / T½), so it halves every half-life too.',
      ],
      id: [
        'Beberapa inti atom tidak stabil: cepat atau lambat inti itu menata ulang dirinya, memancarkan radiasi, dan berubah menjadi inti yang lain. Tidak ada yang dapat mengatakan kapan satu inti tertentu akan melakukannya. Yang pasti adalah peluangnya: setiap inti dari isotop tertentu memiliki peluang yang sama untuk meluruh dalam sekon berikutnya, berapa pun umurnya dan bagaimanapun suhu atau lingkungan kimianya. Untuk sampel yang besar, keacakan ini menghasilkan pola yang sangat teratur. Waktu yang diperlukan agar separuh inti meluruh disebut waktu paruh, T½, dan nilainya sama baik kamu mulai dari satu gram maupun satu ton: setelah satu waktu paruh tersisa setengah, setelah dua tersisa seperempat, setelah tiga seperdelapan, sehingga N(t) = N₀ · (1/2)^(t/T½).',
        'Simulasi memainkan permainan ini atom demi atom. Setiap frame, tiap atom yang masih ada mengambil bilangan acak dan meluruh jika bilangan itu di bawah peluang p = 1 − exp(−ln 2 · Δt / T½), yang tepat merupakan peluang meluruh dalam selang Δt untuk inti dengan waktu paruh yang dipilih. Titik kuning berubah abu-abu saat meluruh. Kurva hijau mencatat berapa yang tersisa, dan kurva biru putus-putus adalah rumus mulus N₀ · (1/2)^(t/T½). Garis tegak putus-putus menandai 1, 2, 3 … waktu paruh dan label mendatar menunjukkan N₀/2, N₀/4, N₀/8 agar kamu dapat memeriksa pembagian dua itu dengan mata.',
        'Slider N₀ mengatur jumlah atom awal, dan inilah pelajaran statistik terpenting dari topik ini. Dengan 20 atom, kurva hijau berupa tangga bergerigi yang bisa menyimpang jauh dari rumus; dengan 1000 atom kurva itu menempel pada garis putus-putus. Hukum bilangan besar inilah sebabnya peluruhan sampel nyata, dengan 10²⁰ inti, begitu mulus dan dapat diramalkan sehingga bisa dipakai sebagai jam. Slider waktu paruh merentangkan atau memampatkan sumbu waktu; simulasi mencakup 0,5 sampai 30 s, sedangkan waktu paruh nyata berkisar dari mikrodetik sampai miliaran tahun, dengan matematika yang sama persis. Arahkan kursor ke grafik untuk membandingkan cacah teoretis dan cacah sebenarnya pada waktu mana pun.',
        'Simulasi mengabaikan menjadi apa atom-atom itu. Pada kenyataannya atom yang meluruh adalah inti baru, sering kali unsur yang berbeda, dan inti anak itu bisa saja radioaktif juga dan memulai peluruhannya sendiri dengan waktu paruhnya sendiri, membentuk deret. Simulasi juga tidak menampilkan jenis radiasi (alfa, beta, atau gama) maupun energi yang dilepaskan, dan memperlakukan semua atom sebagai isotop yang sama. Aktivitas, yaitu jumlah peluruhan per sekon, sebanding dengan jumlah atom yang tersisa (A = λN dengan λ = ln 2 / T½), sehingga juga berkurang setengah setiap waktu paruh.',
      ],
    },
    figure: {
      caption: {
        en: 'Exponential decay: the number of undecayed nuclei halves every half-life, so the curve never reaches zero in a fixed number of steps but keeps halving: N₀, N₀/2, N₀/4, N₀/8 … The same shape applies to any isotope; only the time scale changes.',
        id: 'Peluruhan eksponensial: jumlah inti yang belum meluruh berkurang setengah setiap waktu paruh, sehingga kurva tidak mencapai nol dalam jumlah langkah tertentu tetapi terus membagi dua: N₀, N₀/2, N₀/4, N₀/8 … Bentuk yang sama berlaku untuk isotop apa pun; hanya skala waktunya yang berubah.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Radioactive decay curve with half-lives marked', 'Kurva peluruhan radioaktif dengan tanda waktu paruh')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.ax{stroke:currentColor;stroke-width:1.2;fill:none}.g{stroke:#f59e0b;stroke-width:1;stroke-dasharray:4 3;opacity:.8}</style>
  <path d="M50 40 C72 86 96 112 120 120 C144 146 168 155 190 160 C214 173 236 178 260 180 C284 187 306 190 330 190" fill="none" stroke="#10b981" stroke-width="2.6"/>
  <line x1="50" y1="120" x2="120" y2="120" class="g"/><line x1="120" y1="120" x2="120" y2="200" class="g"/>
  <line x1="50" y1="160" x2="190" y2="160" class="g"/><line x1="190" y1="160" x2="190" y2="200" class="g"/>
  <line x1="50" y1="180" x2="260" y2="180" class="g"/><line x1="260" y1="180" x2="260" y2="200" class="g"/>
  <circle cx="50" cy="40" r="4" fill="#ef4444"/><circle cx="120" cy="120" r="4" fill="#ef4444"/>
  <circle cx="190" cy="160" r="4" fill="#ef4444"/><circle cx="260" cy="180" r="4" fill="#ef4444"/>
  <text x="46" y="44" text-anchor="end">N₀</text>
  <text x="46" y="124" text-anchor="end">N₀/2</text>
  <text x="46" y="164" text-anchor="end">N₀/4</text>
  <text x="46" y="184" text-anchor="end">N₀/8</text>
  <text x="120" y="214" text-anchor="middle">T½</text>
  <text x="190" y="214" text-anchor="middle">2T½</text>
  <text x="260" y="214" text-anchor="middle">3T½</text>
  <text x="50" y="214" text-anchor="middle">0</text>
  <text x="130" y="100" fill="#10b981">${L('half gone', 'setengah hilang')}</text>
  <text x="200" y="148" fill="#10b981">${L('half of that gone', 'setengah dari sisanya hilang')}</text>
  <text x="200" y="60">${L('each nucleus: same chance', 'tiap inti: peluang sama')}</text>
  <text x="200" y="74">${L('per second, whatever its age', 'per sekon, berapa pun umurnya')}</text>
  <text x="200" y="96" style="font-weight:bold">N = N₀ · (1/2)^(t/T½)</text>
  <line x1="50" y1="25" x2="50" y2="200" class="ax"/>
  <line x1="50" y1="200" x2="340" y2="200" class="ax" marker-end="url(#ar)"/>
  <text x="18" y="112" transform="rotate(-90 18 112)" text-anchor="middle">${L('nuclei remaining', 'inti tersisa')}</text>
  <text x="195" y="232" text-anchor="middle">${L('time', 'waktu')}</text>
  <defs><marker id="ar" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="context-stroke"/></marker></defs>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Decay is random for each nucleus but statistically predictable for a large sample.',
        'The half-life is the time for half of the remaining nuclei to decay; it is constant for an isotope and independent of the amount present.',
        'After n half-lives the fraction remaining is (1/2)^n: 1/2, 1/4, 1/8, 1/16 …',
        'The curve is smoother for larger samples, which is why real-world decay with huge numbers of atoms is so regular.',
        'Temperature, pressure and chemical bonding do not change a half-life; it is a property of the nucleus.',
      ],
      id: [
        'Peluruhan bersifat acak untuk tiap inti tetapi dapat diramalkan secara statistik untuk sampel besar.',
        'Waktu paruh adalah waktu agar separuh inti yang tersisa meluruh; nilainya tetap untuk suatu isotop dan tidak bergantung pada jumlah yang ada.',
        'Setelah n waktu paruh, fraksi yang tersisa adalah (1/2)^n: 1/2, 1/4, 1/8, 1/16 …',
        'Kurva lebih mulus untuk sampel yang lebih besar; itulah sebabnya peluruhan di dunia nyata dengan atom yang sangat banyak begitu teratur.',
        'Suhu, tekanan, dan ikatan kimia tidak mengubah waktu paruh; waktu paruh adalah sifat inti.',
      ],
    },
    vocabulary: {
      en: [
        ['Radioactive decay', 'The spontaneous change of an unstable nucleus into a different nucleus, with emission of radiation.'],
        ['Half-life (T½)', 'The time needed for half of a large number of identical nuclei to decay.'],
        ['Decay constant (λ)', 'The probability per unit time that one nucleus decays; λ = ln 2 / T½.'],
        ['Activity', 'The number of decays per second in a sample, measured in becquerels (Bq); A = λN.'],
        ['Exponential decay', 'A quantity that falls by the same fraction in each equal time interval, giving the curve N = N₀ · e^(−λt).'],
        ['Parent and daughter nuclide', 'The nucleus that decays and the nucleus it becomes; the daughter may itself be radioactive.'],
        ['Isotope', 'Atoms of the same element with different numbers of neutrons; some isotopes are stable and others radioactive.'],
      ],
      id: [
        ['Peluruhan radioaktif', 'Perubahan spontan inti tidak stabil menjadi inti lain, disertai pancaran radiasi.'],
        ['Waktu paruh (T½)', 'Waktu yang diperlukan agar separuh dari sejumlah besar inti identik meluruh.'],
        ['Tetapan peluruhan (λ)', 'Peluang per satuan waktu bahwa satu inti meluruh; λ = ln 2 / T½.'],
        ['Aktivitas', 'Jumlah peluruhan per sekon dalam sampel, diukur dalam becquerel (Bq); A = λN.'],
        ['Peluruhan eksponensial', 'Besaran yang berkurang dengan fraksi sama pada tiap selang waktu yang sama, menghasilkan kurva N = N₀ · e^(−λt).'],
        ['Nuklida induk dan anak', 'Inti yang meluruh dan inti hasil peluruhannya; inti anak bisa saja radioaktif juga.'],
        ['Isotop', 'Atom-atom unsur yang sama dengan jumlah neutron berbeda; sebagian isotop stabil dan sebagian radioaktif.'],
      ],
    },
    misconceptions: {
      en: [
        ['After two half-lives all of the sample has decayed.', 'After two half-lives a quarter remains, and after three an eighth. Halving never reaches zero in a fixed number of steps; in practice the sample is considered gone after about 10 half-lives, when less than 0.1% is left.'],
        ['A nucleus that has survived a long time is "due" to decay soon.', 'Decay has no memory. An atom that has survived five half-lives still has exactly a 50% chance of surviving the next one. Run the sim several times and watch which dots go first; it is different every time.'],
        ['Heating a sample, or putting it in a chemical compound, speeds up its decay.', 'Half-lives are properties of the nucleus and are unaffected by temperature, pressure or chemical bonding, which is why radioactive waste cannot be made harmless by burning or dissolving it.'],
        ['The half-life is half the time it takes for the sample to decay completely.', 'There is no fixed time for complete decay. The half-life is the time for any amount to halve, and it applies again and again to whatever remains.'],
      ],
      id: [
        ['Setelah dua waktu paruh, seluruh sampel sudah meluruh.', 'Setelah dua waktu paruh tersisa seperempat, dan setelah tiga seperdelapan. Pembagian dua tidak pernah mencapai nol dalam jumlah langkah tertentu; dalam praktik sampel dianggap habis setelah sekitar 10 waktu paruh, ketika tersisa kurang dari 0,1%.'],
        ['Inti yang sudah lama bertahan "sudah waktunya" meluruh segera.', 'Peluruhan tidak punya ingatan. Atom yang telah bertahan lima waktu paruh tetap memiliki peluang tepat 50% untuk bertahan pada waktu paruh berikutnya. Jalankan simulasi beberapa kali dan perhatikan titik mana yang lebih dulu meluruh; hasilnya berbeda setiap kali.'],
        ['Memanaskan sampel, atau memasukkannya ke dalam senyawa kimia, mempercepat peluruhannya.', 'Waktu paruh adalah sifat inti dan tidak dipengaruhi suhu, tekanan, atau ikatan kimia; itulah sebabnya limbah radioaktif tidak bisa dijadikan aman dengan membakar atau melarutkannya.'],
        ['Waktu paruh adalah separuh dari waktu yang diperlukan sampel untuk meluruh seluruhnya.', 'Tidak ada waktu tertentu untuk peluruhan sempurna. Waktu paruh adalah waktu bagi jumlah berapa pun untuk menjadi setengahnya, dan berlaku berulang-ulang pada apa pun yang tersisa.'],
      ],
    },
    realWorld: {
      en: [
        'Carbon-14 (half-life 5730 years) dating compares the ¹⁴C left in bone, wood or cloth with the amount in living tissue to date objects up to about 50 000 years old.',
        'Technetium-99m, with a half-life of about 6 hours, is injected for medical imaging: long enough for the scan, short enough to be almost gone by the next day.',
        'Household smoke detectors contain a speck of americium-241 (half-life about 432 years), so the source stays steady for the life of the device.',
        'Uranium-238 decays to lead with a half-life of about 4.5 billion years, which is how geologists dated the oldest Earth rocks and meteorites.',
      ],
      id: [
        'Penanggalan karbon-14 (waktu paruh 5730 tahun) membandingkan ¹⁴C yang tersisa dalam tulang, kayu, atau kain dengan kadarnya pada jaringan hidup untuk menentukan umur benda sampai sekitar 50.000 tahun.',
        'Teknesium-99m, dengan waktu paruh sekitar 6 jam, disuntikkan untuk pencitraan medis: cukup lama untuk pemindaian, cukup singkat sehingga hampir habis keesokan harinya.',
        'Detektor asap rumah tangga berisi sebutir kecil amerisium-241 (waktu paruh sekitar 432 tahun), sehingga sumbernya tetap stabil sepanjang umur alat.',
        'Uranium-238 meluruh menjadi timbal dengan waktu paruh sekitar 4,5 miliar tahun; dengan inilah ahli geologi menentukan umur batuan Bumi tertua dan meteorit.',
      ],
    },
    questions: {
      en: [
        { q: 'You start the sim with N₀ = 800 atoms and a half-life of 4 s. About how many atoms should remain after 12 s, and why only "about"?', a: '12 s is three half-lives, so N ≈ 800 × (1/2)³ = 100. The actual count will scatter around 100 (typically within about ±10) because each decay is random; with more atoms the relative scatter would be smaller.' },
        { q: 'A sample has 1/16 of its original ¹⁴C left. How many half-lives have passed, and how old is it if T½ = 5730 years?', a: '1/16 = (1/2)⁴, so four half-lives have passed. Age ≈ 4 × 5730 ≈ 22 900 years.' },
        { q: 'One particular atom in the sim has survived for five half-lives. What is the chance it survives the next half-life, and what does this say about predicting a single decay?', a: 'Exactly 50%, the same as for a brand-new atom. Decay is memoryless: the half-life describes the behaviour of a population, and no measurement can tell you when one specific nucleus will go.' },
      ],
      id: [
        { q: 'Kamu memulai simulasi dengan N₀ = 800 atom dan waktu paruh 4 s. Kira-kira berapa atom yang tersisa setelah 12 s, dan mengapa hanya "kira-kira"?', a: '12 s adalah tiga waktu paruh, sehingga N ≈ 800 × (1/2)³ = 100. Cacah sebenarnya akan tersebar di sekitar 100 (biasanya dalam kisaran ±10) karena setiap peluruhan bersifat acak; dengan lebih banyak atom sebaran relatifnya akan lebih kecil.' },
        { q: 'Sebuah sampel masih memiliki 1/16 dari ¹⁴C semula. Berapa waktu paruh telah berlalu, dan berapa umurnya jika T½ = 5730 tahun?', a: '1/16 = (1/2)⁴, sehingga empat waktu paruh telah berlalu. Umur ≈ 4 × 5730 ≈ 22.900 tahun.' },
        { q: 'Satu atom tertentu di simulasi telah bertahan lima waktu paruh. Berapa peluangnya bertahan pada waktu paruh berikutnya, dan apa artinya bagi peramalan satu peluruhan tunggal?', a: 'Tepat 50%, sama seperti atom yang baru. Peluruhan tidak punya ingatan: waktu paruh menggambarkan perilaku populasi, dan tidak ada pengukuran yang dapat memberi tahu kapan satu inti tertentu akan meluruh.' },
      ],
    },
  },
};
