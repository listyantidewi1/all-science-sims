// Long-form text for the PCR and Gel Electrophoresis sim (grade 12).
export default {
  objectives: {
    en: [
      'Describe the three temperature steps of a PCR cycle (denaturation ~94 °C, primer annealing ~55 °C, extension ~72 °C) and calculate the number of copies after n cycles as 2ⁿ.',
      'Explain why DNA fragments move towards the positive electrode and why migration distance decreases roughly linearly with log(fragment size), and use a DNA ladder to estimate an unknown fragment\'s size.',
      'Interpret a DNA profile: match a crime-scene sample to a suspect by comparing band patterns, and explain how a restriction enzyme can resolve two look-alike profiles.',
    ],
    id: [
      'Menjelaskan tiga tahap suhu siklus PCR (denaturasi ~94 °C, penempelan primer ~55 °C, pemanjangan ~72 °C) dan menghitung jumlah salinan setelah n siklus sebagai 2ⁿ.',
      'Menjelaskan mengapa fragmen DNA bergerak menuju elektrode positif dan mengapa jarak migrasi berkurang hampir linear terhadap log(ukuran fragmen), serta memakai tangga DNA untuk menaksir ukuran fragmen tak dikenal.',
      'Menafsirkan profil DNA: mencocokkan sampel TKP dengan tersangka lewat perbandingan pola pita, dan menjelaskan bagaimana enzim restriksi dapat memisahkan dua profil yang mirip.',
    ],
  },
  tryThis: {
    en: [
      'Set 10 PCR cycles and press Run PCR. How many copies result from one molecule? Then try 20 and 30 cycles. Does each extra cycle add the same number of copies?',
      'Run the gel at 100 V for 30 minutes, then for 60 minutes. Measure how far the 500 bp ladder band travels each time.',
      'Click the crime-scene bands and read their sizes from the ladder. Which suspects have the same pattern? Can you be sure?',
      'Switch on the restriction enzyme and run the gel again. Which suspect still matches the crime scene?',
    ],
    id: [
      'Atur 10 siklus PCR dan tekan Jalankan PCR. Berapa salinan yang dihasilkan dari satu molekul? Lalu coba 20 dan 30 siklus. Apakah setiap siklus tambahan menambah jumlah salinan yang sama?',
      'Jalankan gel pada 100 V selama 30 menit, lalu 60 menit. Ukur seberapa jauh pita tangga 500 bp bergerak tiap kali.',
      'Klik pita TKP dan baca ukurannya dari tangga. Tersangka mana yang berpola sama? Bisakah kamu yakin?',
      'Nyalakan enzim restriksi dan jalankan gel lagi. Tersangka mana yang masih cocok dengan TKP?',
    ],
  },

  learn: {
    background: {
      en: [
        'The polymerase chain reaction (PCR) makes millions of copies of a chosen stretch of DNA in a test tube. Each cycle has three steps controlled by temperature. At about 94 °C the hydrogen bonds between the strands break and the double helix denatures into two single strands. Cooling to about 50–60 °C lets two short synthetic primers anneal to the ends of the target sequence on each strand. Warming to 72 °C lets Taq polymerase, a heat-stable enzyme from a hot-spring bacterium, extend each primer by adding nucleotides, so every original strand becomes a double strand again. One molecule becomes 2, then 4, then 8: after n cycles there are 2ⁿ copies, so 30 cycles (about an hour) give over a billion (2³⁰ ≈ 1.07 × 10⁹). In real reactions the doubling slows after 25–35 cycles as primers and nucleotides run out.',
        'Gel electrophoresis separates DNA fragments by size. Samples are loaded into wells at one end of a slab of agarose gel, a porous jelly, and an electric field of typically 5–8 V per cm is applied. Every DNA fragment carries a negative charge on each phosphate group, so the charge-to-mass ratio is the same for all sizes and all fragments are pulled towards the positive electrode (anode) with the same force per unit length. What differs is how easily they thread through the pores: short fragments wriggle through quickly, long ones are held back. Over the useful range of a gel the distance travelled falls roughly in a straight line with the logarithm of fragment length, so a plot of log(size) against distance for the known fragments of a DNA ladder gives a calibration line from which unknown bands can be sized. Higher voltage or a longer run moves every band further in proportion.',
        'A DNA profile (fingerprint) compares the fragment sizes produced from a person\'s DNA at several highly variable regions. In the simulation each sample gives three bands. If the crime-scene sample and a suspect show bands at exactly the same distances, the profiles match at those regions. Two people can share a pattern by chance at a few regions, which is why real profiling uses 13–20 regions and quotes a match probability. The sim shows another way to add information: restriction enzymes cut DNA at specific short sequences (EcoRI cuts GAATTC), so two fragments of the same length but different sequence may be cut into different pieces. Profiles that look identical before cutting can separate afterwards.',
        'Reading a gel is quantitative work: measure each band\'s distance from the well with a ruler, look up or interpolate its size on the ladder calibration, and tabulate. The Lab panel asks you to record exactly this: the sample, the fragment sizes, the distance each migrated and whether it matches the crime scene.',
      ],
      id: [
        'Reaksi berantai polimerase (PCR) membuat jutaan salinan ruas DNA pilihan di dalam tabung. Setiap siklus memiliki tiga tahap yang dikendalikan suhu. Pada sekitar 94 °C ikatan hidrogen antar untai putus dan heliks ganda terdenaturasi menjadi dua untai tunggal. Pendinginan ke sekitar 50–60 °C memungkinkan dua primer sintetik pendek menempel pada ujung urutan target di tiap untai. Pemanasan ke 72 °C memungkinkan Taq polimerase, enzim tahan panas dari bakteri sumber air panas, memanjangkan tiap primer dengan menambahkan nukleotida, sehingga setiap untai asli kembali menjadi untai ganda. Satu molekul menjadi 2, lalu 4, lalu 8: setelah n siklus ada 2ⁿ salinan, sehingga 30 siklus (sekitar satu jam) menghasilkan lebih dari satu miliar (2³⁰ ≈ 1,07 × 10⁹). Pada reaksi nyata penggandaan melambat setelah 25–35 siklus karena primer dan nukleotida habis.',
        'Elektroforesis gel memisahkan fragmen DNA berdasarkan ukuran. Sampel dimasukkan ke sumur di salah satu ujung lempeng gel agarosa, jeli berpori, dan medan listrik biasanya 5–8 V per cm diberikan. Setiap fragmen DNA membawa muatan negatif pada tiap gugus fosfat, sehingga rasio muatan terhadap massa sama untuk semua ukuran dan semua fragmen ditarik menuju elektrode positif (anode) dengan gaya per satuan panjang yang sama. Yang berbeda adalah kemudahan menembus pori: fragmen pendek meliuk cepat, yang panjang tertahan. Pada rentang berguna sebuah gel, jarak tempuh turun hampir lurus terhadap logaritma panjang fragmen, sehingga grafik log(ukuran) terhadap jarak untuk fragmen tangga DNA yang diketahui memberi garis kalibrasi untuk menaksir ukuran pita tak dikenal. Tegangan lebih tinggi atau waktu lebih lama memindahkan tiap pita lebih jauh secara proporsional.',
        'Profil DNA (sidik jari DNA) membandingkan ukuran fragmen yang dihasilkan dari DNA seseorang pada beberapa daerah yang sangat bervariasi. Dalam simulasi tiap sampel memberi tiga pita. Jika sampel TKP dan seorang tersangka menunjukkan pita pada jarak yang persis sama, profilnya cocok pada daerah-daerah itu. Dua orang bisa kebetulan berpola sama pada beberapa daerah, itulah sebabnya profil sungguhan memakai 13–20 daerah dan menyebutkan peluang kecocokan. Simulasi menunjukkan cara lain menambah informasi: enzim restriksi memotong DNA pada urutan pendek tertentu (EcoRI memotong GAATTC), sehingga dua fragmen yang sama panjang tetapi berbeda urutan bisa terpotong menjadi potongan yang berbeda. Profil yang tampak identik sebelum dipotong dapat terpisah setelahnya.',
        'Membaca gel adalah kerja kuantitatif: ukur jarak tiap pita dari sumur dengan penggaris, cari atau interpolasi ukurannya pada kalibrasi tangga, dan tabulasikan. Panel Lab memintamu mencatat persis ini: sampel, ukuran fragmen, jarak migrasi masing-masing dan apakah cocok dengan TKP.',
      ],
    },
    figure: {
      caption: {
        en: 'Left: one PCR cycle doubles the DNA, so copies = 2ⁿ (1 → 2 → 4 → 8 …). Right: in a gel the negatively charged fragments move towards the positive electrode; distance travelled falls roughly linearly with log(size), so the ladder lets you size unknown bands.',
        id: 'Kiri: satu siklus PCR menggandakan DNA, sehingga salinan = 2ⁿ (1 → 2 → 4 → 8 …). Kanan: di dalam gel fragmen bermuatan negatif bergerak menuju elektrode positif; jarak tempuh turun hampir linear terhadap log(ukuran), sehingga tangga memungkinkanmu menaksir ukuran pita tak dikenal.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        const sizes = [3000, 2000, 1500, 1000, 700, 500, 300, 200, 100];
        const dist = (bp) => 60 * (Math.log10(5000) - Math.log10(bp)) / (Math.log10(5000) - Math.log10(100));
        const Y = (bp) => 40 + dist(bp) * 2.6;
        const ladder = sizes.map((bp) => `<rect x="226" y="${Y(bp).toFixed(1)}" width="22" height="3" fill="#facc15"/><text x="222" y="${(Y(bp) + 4).toFixed(1)}" text-anchor="end" class="s">${bp}</text>`).join('');
        const sample = [1450, 780, 320].map((bp) => `<rect x="262" y="${Y(bp).toFixed(1)}" width="22" height="3" fill="#facc15"/>`).join('');
        const pts = sizes.map((bp) => `${(300 + Math.log10(bp) * 0).toFixed(0)}`).join('');
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('PCR doubling and gel electrophoresis', 'Penggandaan PCR dan elektroforesis gel')}">
  <style>text{font:10px system-ui,sans-serif;fill:currentColor}.s{font:8px system-ui,sans-serif;fill:currentColor;opacity:.85}.d{stroke-width:2.2;fill:none}</style>
  <text x="90" y="16" text-anchor="middle">${L('PCR: copies = 2ⁿ', 'PCR: salinan = 2ⁿ')}</text>
  <path d="M40 40 C50 34 60 46 70 40 S90 34 100 40 S120 46 130 40" class="d" stroke="#38bdf8"/>
  <path d="M40 46 C50 52 60 40 70 46 S90 52 100 46 S120 40 130 46" class="d" stroke="#ec4899"/>
  <text x="140" y="46" class="s">1</text>
  <text x="90" y="64" text-anchor="middle" class="s">${L('94 °C denature → 55 °C anneal primers → 72 °C extend', '94 °C denaturasi → 55 °C tempel primer → 72 °C perpanjang')}</text>
  <path d="M30 80 C40 74 50 86 60 80 S80 74 90 80" class="d" stroke="#38bdf8"/><path d="M30 86 C40 92 50 80 60 86 S80 92 90 86" class="d" stroke="#22c55e"/>
  <path d="M100 80 C110 74 120 86 130 80 S150 74 160 80" class="d" stroke="#22c55e"/><path d="M100 86 C110 92 120 80 130 86 S150 92 160 86" class="d" stroke="#ec4899"/>
  <text x="170" y="86" class="s">2</text>
  <text x="90" y="110" text-anchor="middle" class="s">4 · 8 · 16 · … · 2³⁰ ≈ 1,07 × 10⁹</text>
  <line x1="30" y1="200" x2="170" y2="200" stroke="currentColor" stroke-width="1" opacity=".6"/>
  <line x1="30" y1="200" x2="30" y2="125" stroke="currentColor" stroke-width="1" opacity=".6"/>
  <path d="M30 199 L44 198 L58 196 L72 192 L86 184 L100 168 L114 136 L124 126" fill="none" stroke="#facc15" stroke-width="2"/>
  <text x="100" y="215" text-anchor="middle" class="s">${L('cycle number', 'nomor siklus')}</text>
  <text x="26" y="130" text-anchor="end" class="s">2³⁰</text><text x="26" y="200" text-anchor="end" class="s">1</text>
  <text x="60" y="140" class="s">${L('copies (exponential)', 'salinan (eksponensial)')}</text>
  <rect x="210" y="30" width="130" height="190" rx="6" fill="#1e293b" stroke="currentColor" stroke-width="1" opacity=".9"/>
  <rect x="226" y="34" width="22" height="5" fill="#0b1220"/><rect x="262" y="34" width="22" height="5" fill="#0b1220"/>
  <text x="237" y="28" text-anchor="middle" class="s">${L('ladder', 'tangga')}</text><text x="273" y="28" text-anchor="middle" class="s">${L('sample', 'sampel')}</text>
  ${ladder}
  ${sample}
  <text x="300" y="44" class="s">− ${L('well', 'sumur')}</text>
  <text x="300" y="214" class="s">+ ${L('anode', 'anode')}</text>
  <path d="M310 60 L310 190" stroke="currentColor" stroke-width="1.2" marker-end="url(#ar)" opacity=".7"/>
  <text x="314" y="128" class="s" transform="rotate(90 314 128)">${L('d ∝ −log(size)', 'd ∝ −log(ukuran)')}</text>
  <defs><marker id="ar" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto"><path d="M0 0 L7 3.5 L0 7 z" fill="currentColor"/></marker></defs>
  <text x="290" y="${(Y(320) + 4).toFixed(1)}" class="s">320 bp</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'PCR cycle: denature (94 °C) → anneal primers (55 °C) → extend with Taq polymerase (72 °C); each cycle doubles the DNA, so copies = 2ⁿ.',
        'Thirty cycles turn one molecule into about a billion copies, enough to analyse DNA from a single hair or drop of blood.',
        'DNA is negatively charged, so in a gel it moves towards the positive electrode; smaller fragments move faster through the agarose pores.',
        'Migration distance falls roughly linearly with log(fragment size); a DNA ladder of known sizes calibrates the gel so unknown bands can be sized.',
        'Distance also scales with voltage × time, so a run must be long enough to separate the bands but not so long that small fragments run off the gel.',
        'A DNA profile match means the same band pattern at every tested region; restriction enzymes or extra regions add discriminating power.',
      ],
      id: [
        'Siklus PCR: denaturasi (94 °C) → tempel primer (55 °C) → perpanjang dengan Taq polimerase (72 °C); tiap siklus menggandakan DNA, sehingga salinan = 2ⁿ.',
        'Tiga puluh siklus mengubah satu molekul menjadi sekitar satu miliar salinan, cukup untuk menganalisis DNA dari sehelai rambut atau setetes darah.',
        'DNA bermuatan negatif, sehingga di dalam gel bergerak menuju elektrode positif; fragmen lebih kecil bergerak lebih cepat melewati pori agarosa.',
        'Jarak migrasi turun hampir linear terhadap log(ukuran fragmen); tangga DNA berukuran diketahui mengalibrasi gel sehingga pita tak dikenal bisa ditaksir ukurannya.',
        'Jarak juga sebanding dengan tegangan × waktu, sehingga pemisahan harus cukup lama untuk memisahkan pita tetapi tidak sampai fragmen kecil keluar dari gel.',
        'Kecocokan profil DNA berarti pola pita yang sama pada setiap daerah yang diuji; enzim restriksi atau daerah tambahan menambah daya pembeda.',
      ],
    },
    vocabulary: {
      en: [
        ['PCR (polymerase chain reaction)', 'A cyclic laboratory method that copies a target DNA sequence exponentially using primers and a heat-stable polymerase.'],
        ['Primer', 'A short single-stranded DNA (about 20 bases) that binds to the start of the target and gives the polymerase a place to begin.'],
        ['Taq polymerase', 'A DNA polymerase from Thermus aquaticus that survives the 94 °C denaturation step.'],
        ['Agarose gel', 'A porous jelly through which DNA fragments are pulled by an electric field; smaller fragments pass more easily.'],
        ['DNA ladder', 'A mixture of fragments of known sizes run alongside samples to calibrate the gel.'],
        ['Base pair (bp)', 'The unit of DNA length; a 1000 bp fragment is 1 kb.'],
        ['Restriction enzyme', 'A bacterial enzyme that cuts DNA at a specific short sequence, for example EcoRI at GAATTC.'],
        ['DNA profile', 'The pattern of fragment sizes from highly variable regions of a person\'s DNA, used for identification.'],
      ],
      id: [
        ['PCR (reaksi berantai polimerase)', 'Metode laboratorium bersiklus yang menyalin urutan DNA target secara eksponensial memakai primer dan polimerase tahan panas.'],
        ['Primer', 'DNA untai tunggal pendek (sekitar 20 basa) yang menempel pada awal target dan memberi tempat mulai bagi polimerase.'],
        ['Taq polimerase', 'DNA polimerase dari Thermus aquaticus yang bertahan pada tahap denaturasi 94 °C.'],
        ['Gel agarosa', 'Jeli berpori yang dilewati fragmen DNA yang ditarik medan listrik; fragmen lebih kecil lewat lebih mudah.'],
        ['Tangga DNA', 'Campuran fragmen berukuran diketahui yang dijalankan di samping sampel untuk mengalibrasi gel.'],
        ['Pasangan basa (bp)', 'Satuan panjang DNA; fragmen 1000 bp adalah 1 kb.'],
        ['Enzim restriksi', 'Enzim bakteri yang memotong DNA pada urutan pendek tertentu, misalnya EcoRI pada GAATTC.'],
        ['Profil DNA', 'Pola ukuran fragmen dari daerah DNA seseorang yang sangat bervariasi, dipakai untuk identifikasi.'],
      ],
    },
    misconceptions: {
      en: [
        ['Larger DNA fragments move further because the field pulls them harder.', 'All fragments have the same charge per unit length, so the force per length is equal; large fragments move less because they are tangled by the gel pores. Small fragments travel furthest.'],
        ['Distance in a gel is proportional to fragment size.', 'It is roughly proportional to the logarithm of size: doubling the size does not halve the distance. That is why the ladder bands are unevenly spaced and a semi-log plot is used.'],
        ['Each PCR cycle adds the same number of copies.', 'Each cycle doubles the total: 1, 2, 4, 8 … The growth is exponential, which is why 30 cycles give about a billion copies rather than 30 or 60.'],
        ['Two samples with the same bands prove they come from the same person.', 'At a few regions different people can share a pattern by chance. Real profiling uses many regions and reports the probability of a chance match; the sim\'s restriction enzyme shows how extra information separates look-alikes.'],
      ],
      id: [
        ['Fragmen DNA yang lebih besar bergerak lebih jauh karena medan menariknya lebih kuat.', 'Semua fragmen memiliki muatan per satuan panjang yang sama, sehingga gaya per panjangnya setara; fragmen besar bergerak lebih sedikit karena tersangkut pori gel. Fragmen kecil bergerak paling jauh.'],
        ['Jarak dalam gel sebanding dengan ukuran fragmen.', 'Jarak kira-kira sebanding dengan logaritma ukuran: menggandakan ukuran tidak membagi dua jaraknya. Itulah sebabnya pita tangga berjarak tidak rata dan grafik semi-log dipakai.'],
        ['Setiap siklus PCR menambah jumlah salinan yang sama.', 'Setiap siklus menggandakan total: 1, 2, 4, 8 … Pertumbuhannya eksponensial, itulah sebabnya 30 siklus memberi sekitar satu miliar salinan, bukan 30 atau 60.'],
        ['Dua sampel dengan pita yang sama membuktikan berasal dari orang yang sama.', 'Pada beberapa daerah orang yang berbeda bisa kebetulan berpola sama. Profil sungguhan memakai banyak daerah dan melaporkan peluang kecocokan kebetulan; enzim restriksi di simulasi menunjukkan bagaimana informasi tambahan memisahkan yang mirip.'],
      ],
    },
    realWorld: {
      en: [
        'Forensic laboratories use PCR to amplify DNA from a single hair root or a few skin cells, then profile 20 or more variable regions to identify suspects or victims.',
        'PCR tests for viruses such as SARS-CoV-2 amplify a stretch of the viral genome; the cycle number at which the signal appears tells how much virus was present.',
        'Paternity tests compare a child\'s bands with those of both parents: every band in the child must come from one parent or the other.',
        'Restriction enzymes and gels are routine tools in genetic engineering for checking that a gene has been inserted into a plasmid correctly.',
        'Ancient-DNA studies have amplified and sequenced DNA from Neanderthal bones tens of thousands of years old.',
      ],
      id: [
        'Laboratorium forensik memakai PCR untuk memperbanyak DNA dari satu akar rambut atau beberapa sel kulit, lalu memprofilkan 20 atau lebih daerah variabel untuk mengidentifikasi tersangka atau korban.',
        'Tes PCR untuk virus seperti SARS-CoV-2 memperbanyak ruas genom virus; nomor siklus saat sinyal muncul menunjukkan seberapa banyak virus yang ada.',
        'Tes paternitas membandingkan pita anak dengan pita kedua orang tua: setiap pita pada anak harus berasal dari salah satu orang tua.',
        'Enzim restriksi dan gel adalah alat rutin rekayasa genetika untuk memeriksa bahwa sebuah gen telah disisipkan ke plasmid dengan benar.',
        'Studi DNA purba telah memperbanyak dan mengurutkan DNA dari tulang Neanderthal berumur puluhan ribu tahun.',
      ],
    },
    questions: {
      en: [
        { q: 'How many copies of a DNA target are produced from one molecule after 20 PCR cycles? How many more cycles are needed to pass one billion?', a: '2²⁰ = 1,048,576 copies (about a million). 2³⁰ ≈ 1.07 × 10⁹, so 10 more cycles are needed; each cycle doubles the total.' },
        { q: 'On a gel run at 100 V for 60 min the 1000 bp ladder band travelled 25 mm and the 100 bp band 60 mm. An unknown band travelled 42 mm. Estimate its size.', a: 'Distance is linear in log(size): 42 mm is (42 − 25)/(60 − 25) = 0.49 of the way from 1000 bp to 100 bp in log units, so log₁₀(size) = 3 − 0.49 = 2.51 and size ≈ 320 bp.' },
        { q: 'Two suspects give identical three-band profiles to the crime-scene sample before cutting, but after treatment with a restriction enzyme only one still matches. Explain.', a: 'Fragments of equal length can have different sequences. The enzyme cuts only where its recognition site occurs, so the suspect whose fragment contains the site gives two smaller pieces while the other\'s fragment stays whole. The crime-scene DNA is cut the same way as the true match.' },
      ],
      id: [
        { q: 'Berapa salinan target DNA yang dihasilkan dari satu molekul setelah 20 siklus PCR? Berapa siklus lagi yang diperlukan untuk melewati satu miliar?', a: '2²⁰ = 1.048.576 salinan (sekitar sejuta). 2³⁰ ≈ 1,07 × 10⁹, jadi diperlukan 10 siklus lagi; setiap siklus menggandakan total.' },
        { q: 'Pada gel yang dijalankan 100 V selama 60 menit, pita tangga 1000 bp bergerak 25 mm dan pita 100 bp 60 mm. Pita tak dikenal bergerak 42 mm. Taksir ukurannya.', a: 'Jarak linear terhadap log(ukuran): 42 mm adalah (42 − 25)/(60 − 25) = 0,49 bagian perjalanan dari 1000 bp ke 100 bp dalam satuan log, sehingga log₁₀(ukuran) = 3 − 0,49 = 2,51 dan ukuran ≈ 320 bp.' },
        { q: 'Dua tersangka memberi profil tiga pita yang identik dengan sampel TKP sebelum dipotong, tetapi setelah diberi enzim restriksi hanya satu yang masih cocok. Jelaskan.', a: 'Fragmen sepanjang sama bisa berbeda urutan. Enzim hanya memotong di tempat situs pengenalnya ada, sehingga tersangka yang fragmennya mengandung situs itu memberi dua potongan lebih kecil sementara fragmen tersangka lain tetap utuh. DNA TKP terpotong dengan cara yang sama seperti tersangka yang benar-benar cocok.' },
      ],
    },
  },
};
