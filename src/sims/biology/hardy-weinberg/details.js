// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Predict genotype frequencies from p² + 2pq + q² = 1.',
      'Distinguish equilibrium from drift in small populations.',
      'See how selection alters allele frequency over generations.',
    ],
    id: [
      'Memprediksi frekuensi genotipe dari p² + 2pq + q² = 1.',
      'Membedakan kesetimbangan dari hanyut pada populasi kecil.',
      'Melihat seleksi mengubah frekuensi alel antar generasi.',
    ],
  },
  tryThis: {
    en: [
      'Set N = 50, run a few times — does p drift?',
      'Lower aa fitness to 0.5 — does p climb?',
      'Run with N = 1000 and zero selection — proportions stable?',
    ],
    id: [
      'Atur N = 50, jalankan beberapa kali — apakah p berfluktuasi?',
      'Turunkan kebugaran aa ke 0,5 — apakah p naik?',
      'Jalankan dengan N = 1000 dan tanpa seleksi — proporsi stabil?',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'Consider one gene with two alleles, A and a, in a population of diploid organisms. If a fraction p of all gene copies are A and q = 1 − p are a, and individuals mate at random, then an offspring receives an A from each parent with probability p × p = p². The chance of being Aa is 2pq (A from the mother and a from the father, or the reverse) and aa is q². The Hardy-Weinberg principle says that in a large population with random mating and no selection, mutation or migration, the allele frequencies p and q never change, and the genotype frequencies settle at p², 2pq and q² after a single generation. It is the "nothing is happening" baseline against which evolutionary change is measured.',
        'The simulation keeps a population of N diploid individuals, each coloured by genotype. Every generation, each of the N offspring is made by picking two parents at random with probability proportional to their fitness and taking one allele at random from each; this is equivalent to drawing from a gene pool in which every individual\'s alleles are weighted by its fitness. Drawing at random from a finite pool is like tossing a coin a finite number of times: the result wobbles around the expected value. That wobble is genetic drift. The smaller N, the larger the wobble, and sooner or later one allele is lost and the other is "fixed" at a frequency of 1. The graph on the right tracks the AA, Aa and aa frequencies and the allele frequency p (green) over the last 200 generations.',
        'The fitness sliders give each genotype a relative reproductive weight, where 1 means the reference. Lowering the fitness of aa below 1 means aa individuals contribute fewer alleles, so q falls over time; notice that it falls fast at first and then crawls, because when q is small almost all a alleles are hidden inside heterozygotes that are not selected against. Giving Aa the highest fitness (heterozygote advantage) keeps both alleles in the population at a stable intermediate p. "Initial p" and "Population size N" restart the run; "Generations / sec", "Step" and "Auto-evolve" control the pace.',
        'The model is deliberately minimal. There is no mutation, so an allele that is lost never returns; there is no migration; generations do not overlap; and sexes are not tracked. Fitness acts only through the chance of being chosen as a parent, so a fitness of 0 is fully lethal: that genotype leaves no offspring, and if every individual has fitness 0 the population goes extinct. Real populations also have many genes and many alleles per gene, mating that is not perfectly random, and population sizes that change over time.',
      ],
      id: [
        'Bayangkan satu gen dengan dua alel, A dan a, dalam populasi organisme diploid. Jika sebagian p dari semua salinan gen adalah A dan q = 1 − p adalah a, dan individu kawin secara acak, maka seorang anak menerima A dari kedua orang tuanya dengan peluang p × p = p². Peluang bergenotipe Aa adalah 2pq (A dari ibu dan a dari ayah, atau sebaliknya) dan aa adalah q². Prinsip Hardy-Weinberg menyatakan bahwa dalam populasi besar dengan perkawinan acak tanpa seleksi, mutasi, atau migrasi, frekuensi alel p dan q tidak pernah berubah, dan frekuensi genotipe menetap pada p², 2pq, dan q² hanya dalam satu generasi. Inilah garis dasar "tidak terjadi apa-apa" yang menjadi pembanding bagi perubahan evolusi.',
        'Simulasi memelihara populasi N individu diploid, masing-masing diwarnai menurut genotipenya. Setiap generasi, setiap dari N anak dibuat dengan memilih dua orang tua secara acak dengan peluang sebanding dengan kebugarannya dan mengambil satu alel secara acak dari masing-masing; ini setara dengan mengambil dari kolam gen tempat alel setiap individu diberi bobot sesuai kebugarannya. Mengambil secara acak dari kolam yang terbatas mirip melempar koin sejumlah terbatas kali: hasilnya bergoyang di sekitar nilai yang diharapkan. Goyangan itulah hanyutan genetik. Semakin kecil N, semakin besar goyangannya, dan cepat atau lambat satu alel hilang sementara alel lainnya "terfiksasi" pada frekuensi 1. Grafik di kanan melacak frekuensi AA, Aa, aa, dan frekuensi alel p (hijau) selama 200 generasi terakhir.',
        'Slider kebugaran memberi tiap genotipe bobot reproduksi relatif, dengan 1 sebagai acuan. Menurunkan kebugaran aa di bawah 1 berarti individu aa menyumbang lebih sedikit alel, sehingga q turun seiring waktu; perhatikan bahwa penurunannya cepat di awal lalu merayap, karena ketika q kecil hampir semua alel a tersembunyi di dalam heterozigot yang tidak terseleksi. Memberi Aa kebugaran tertinggi (keunggulan heterozigot) mempertahankan kedua alel pada nilai p tengah yang stabil. "Initial p" dan "Population size N" memulai ulang simulasi; "Generations / sec", "Step", dan "Auto-evolve" mengatur temponya.',
        'Model ini sengaja dibuat minimal. Tidak ada mutasi, sehingga alel yang hilang tidak pernah kembali; tidak ada migrasi; generasi tidak tumpang tindih; dan jenis kelamin tidak dilacak. Kebugaran hanya bekerja lewat peluang terpilih sebagai orang tua, sehingga kebugaran 0 benar-benar letal: genotipe itu tidak meninggalkan keturunan, dan jika semua individu berkebugaran 0 populasi akan punah. Populasi nyata juga memiliki banyak gen dan banyak alel per gen, perkawinan yang tidak sepenuhnya acak, serta ukuran populasi yang berubah dari waktu ke waktu.',
      ],
    },
    figure: {
      caption: {
        en: 'Random union of gametes drawn as areas: a square of side 1 split at p gives AA = p², Aa = 2pq (two rectangles) and aa = q². Shown for p = 0.7: 0.49, 0.42 and 0.09.',
        id: 'Penggabungan acak gamet digambar sebagai luas: bujur sangkar bersisi 1 yang dibagi pada p menghasilkan AA = p², Aa = 2pq (dua persegi panjang), dan aa = q². Ditampilkan untuk p = 0,7: 0,49, 0,42, dan 0,09.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        const d = lang === 'id' ? ',' : '.'; // decimal separator
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Hardy-Weinberg genotype frequencies as areas', 'Frekuensi genotipe Hardy-Weinberg sebagai luas')}">
  <style>text{font:12px system-ui,sans-serif;fill:currentColor}.m{fill:none;stroke:currentColor;stroke-width:1.2;opacity:.45}.s{font-size:10px;opacity:.75}.b{font-weight:600}</style>
  <rect x="40" y="40" width="112" height="112" fill="#3b82f6" fill-opacity=".45"/>
  <rect x="152" y="40" width="48" height="112" fill="#8b5cf6" fill-opacity=".45"/>
  <rect x="40" y="152" width="112" height="48" fill="#8b5cf6" fill-opacity=".45"/>
  <rect x="152" y="152" width="48" height="48" fill="#ef4444" fill-opacity=".45"/>
  <rect x="40" y="40" width="160" height="160" class="m"/>
  <line x1="152" y1="40" x2="152" y2="200" class="m"/>
  <line x1="40" y1="152" x2="200" y2="152" class="m"/>
  <text x="80" y="92" class="b">AA</text><text x="76" y="108" class="s">p² = 0${d}49</text>
  <text x="166" y="92" class="b">Aa</text><text x="160" y="108" class="s">pq</text>
  <text x="80" y="172" class="b">Aa</text><text x="76" y="188" class="s">pq</text>
  <text x="166" y="172" class="b">aa</text><text x="160" y="188" class="s">q²</text>
  <text x="80" y="30" class="s">A (p = 0${d}7)</text>
  <text x="158" y="30" class="s">a (q = 0${d}3)</text>
  <text x="48" y="216" class="s">${L('gametes from one parent', 'gamet dari satu induk')}</text>
  <text x="14" y="200" class="s" transform="rotate(-90 14 200)">${L('gametes from the other parent', 'gamet dari induk lain')}</text>
  <text x="222" y="60" class="b">p + q = 1</text>
  <text x="222" y="84" class="b">p² + 2pq + q² = 1</text>
  <text x="222" y="116" fill="#3b82f6">AA = p² = 0${d}49</text>
  <text x="222" y="136" fill="#8b5cf6">Aa = 2pq = 0${d}42</text>
  <text x="222" y="156" fill="#ef4444">aa = q² = 0${d}09</text>
  <text x="222" y="186" class="s">${L('p next generation', 'p generasi berikut')}</text>
  <text x="222" y="200" class="s">= p² + ½·2pq = p</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Hardy-Weinberg is a null model: if nothing acts on a gene, p and q stay constant and genotypes sit at p², 2pq, q².',
        'Dominance says nothing about frequency; a dominant allele does not spread just because it is dominant.',
        'Genetic drift is sampling error in a finite population; its strength scales roughly with 1/N, so small populations fix or lose alleles quickly.',
        'Selection against a recessive phenotype slows down as q shrinks, because rare recessive alleles hide in heterozygotes.',
        'Heterozygote advantage maintains both alleles at a stable intermediate frequency.',
      ],
      id: [
        'Hardy-Weinberg adalah model nol: jika tidak ada yang bekerja pada suatu gen, p dan q tetap konstan dan genotipe berada pada p², 2pq, q².',
        'Dominansi tidak mengatakan apa pun tentang frekuensi; alel dominan tidak menyebar hanya karena ia dominan.',
        'Hanyutan genetik adalah galat pencuplikan pada populasi terbatas; kekuatannya kira-kira sebanding dengan 1/N, sehingga populasi kecil cepat memfiksasi atau kehilangan alel.',
        'Seleksi terhadap fenotipe resesif melambat ketika q mengecil, karena alel resesif yang langka bersembunyi di dalam heterozigot.',
        'Keunggulan heterozigot mempertahankan kedua alel pada frekuensi tengah yang stabil.',
      ],
    },
    vocabulary: {
      en: [
        ['Allele frequency (p, q)', 'The fraction of all gene copies in a population that are a particular allele; p + q = 1 for two alleles.'],
        ['Genotype frequency', 'The fraction of individuals that are AA, Aa or aa; under Hardy-Weinberg these are p², 2pq and q².'],
        ['Random mating', 'Every individual is equally likely to mate with any other, so gametes combine at random.'],
        ['Genetic drift', 'Random change in allele frequency from one generation to the next caused by chance sampling in a finite population.'],
        ['Fixation', 'An allele reaching a frequency of 1, so that every individual carries only that allele.'],
        ['Relative fitness', 'The average reproductive contribution of a genotype compared with a reference genotype set to 1.'],
        ['Heterozygote advantage', 'A situation in which Aa individuals have higher fitness than both AA and aa, which keeps both alleles in the population.'],
        ['Null model', 'A baseline that describes what happens when no process of interest is acting; deviations from it reveal that something is acting.'],
      ],
      id: [
        ['Frekuensi alel (p, q)', 'Bagian dari seluruh salinan gen dalam populasi yang berupa alel tertentu; p + q = 1 untuk dua alel.'],
        ['Frekuensi genotipe', 'Bagian individu yang bergenotipe AA, Aa, atau aa; menurut Hardy-Weinberg nilainya p², 2pq, dan q².'],
        ['Perkawinan acak', 'Setiap individu berpeluang sama untuk kawin dengan individu mana pun, sehingga gamet bergabung secara acak.'],
        ['Hanyutan genetik', 'Perubahan acak frekuensi alel dari satu generasi ke generasi berikutnya akibat pencuplikan kebetulan pada populasi terbatas.'],
        ['Fiksasi', 'Suatu alel mencapai frekuensi 1, sehingga setiap individu hanya membawa alel itu.'],
        ['Kebugaran relatif', 'Rata-rata sumbangan reproduksi suatu genotipe dibandingkan genotipe acuan yang diberi nilai 1.'],
        ['Keunggulan heterozigot', 'Keadaan ketika individu Aa memiliki kebugaran lebih tinggi daripada AA maupun aa, sehingga kedua alel tetap bertahan dalam populasi.'],
        ['Model nol', 'Garis dasar yang menggambarkan apa yang terjadi jika tidak ada proses yang bekerja; penyimpangan darinya menunjukkan ada sesuatu yang bekerja.'],
      ],
    },
    misconceptions: {
      en: [
        ['Dominant alleles become more common over the generations simply because they are dominant.', 'Dominance only describes which phenotype a heterozygote shows. Run the simulation with equal fitness and p = 0.2: the dominant allele A stays near 0.2 forever, apart from drift.'],
        ['Selection will quickly eliminate a harmful recessive allele.', 'It removes it quickly only while q is large. Once q is small, nearly all a alleles sit in Aa carriers with normal fitness, so the decline becomes extremely slow; q² = 0.01 means only 1 in 100 individuals is exposed to selection while 18 in 100 carry the allele.'],
        ['Genetic drift only happens in tiny populations.', 'Drift happens in every finite population; it is just weaker in large ones. With N = 1000 the lines still jitter, but they rarely wander far from the start in 200 generations.'],
        ['A population in Hardy-Weinberg equilibrium is not evolving, so Hardy-Weinberg is useless for studying evolution.', 'Its value is as a yardstick. When observed genotype frequencies differ from p², 2pq, q², or when p changes over time, one of the assumptions is being violated, and that points to selection, drift, migration, mutation or non-random mating.'],
      ],
      id: [
        ['Alel dominan menjadi lebih umum dari generasi ke generasi hanya karena ia dominan.', 'Dominansi hanya menggambarkan fenotipe mana yang ditampilkan heterozigot. Jalankan simulasi dengan kebugaran sama dan p = 0,2: alel dominan A tetap di sekitar 0,2 selamanya, kecuali karena hanyutan.'],
        ['Seleksi akan cepat melenyapkan alel resesif yang merugikan.', 'Seleksi menyingkirkannya dengan cepat hanya selama q besar. Setelah q kecil, hampir semua alel a berada pada pembawa Aa yang kebugarannya normal, sehingga penurunannya menjadi sangat lambat; q² = 0,01 berarti hanya 1 dari 100 individu yang terpapar seleksi, sementara 18 dari 100 membawa alel itu.'],
        ['Hanyutan genetik hanya terjadi pada populasi yang sangat kecil.', 'Hanyutan terjadi pada setiap populasi terbatas; hanya saja lebih lemah pada populasi besar. Dengan N = 1000 garisnya masih bergetar, tetapi jarang menjauh dari nilai awal dalam 200 generasi.'],
        ['Populasi dalam kesetimbangan Hardy-Weinberg tidak berevolusi, jadi Hardy-Weinberg tidak berguna untuk mempelajari evolusi.', 'Nilainya adalah sebagai tolok ukur. Ketika frekuensi genotipe yang diamati berbeda dari p², 2pq, q², atau ketika p berubah seiring waktu, salah satu asumsinya dilanggar, dan itu menunjuk pada seleksi, hanyutan, migrasi, mutasi, atau perkawinan tak acak.'],
      ],
    },
    realWorld: {
      en: [
        'Cystic fibrosis affects about 1 in 2,500 newborns of European ancestry; from q² = 1/2500, q ≈ 0.02 and the carrier frequency 2pq ≈ 0.04, so about 1 person in 25 carries the allele without knowing it.',
        'The sickle-cell allele stays common in regions with malaria because heterozygotes are partly protected from malaria while having few symptoms: heterozygote advantage in action.',
        'Island and zoo populations lose genetic variety through drift and founder effects; conservation programmes exchange individuals between populations to counter this.',
        'Forensic DNA matching uses Hardy-Weinberg proportions to calculate how rare a particular genotype combination is in the population.',
      ],
      id: [
        'Fibrosis kistik menyerang sekitar 1 dari 2.500 bayi baru lahir keturunan Eropa; dari q² = 1/2500, q ≈ 0,02 dan frekuensi pembawa 2pq ≈ 0,04, sehingga sekitar 1 dari 25 orang membawa alel itu tanpa menyadarinya.',
        'Alel sel sabit tetap umum di daerah bermalaria karena heterozigot sebagian terlindung dari malaria dengan gejala yang ringan: keunggulan heterozigot dalam praktik.',
        'Populasi di pulau dan di kebun binatang kehilangan keragaman genetik lewat hanyutan dan efek pendiri; program konservasi menukar individu antarpopulasi untuk melawannya.',
        'Pencocokan DNA forensik memakai proporsi Hardy-Weinberg untuk menghitung seberapa langka kombinasi genotipe tertentu dalam populasi.',
      ],
    },
    questions: {
      en: [
        { q: 'In a population in Hardy-Weinberg equilibrium, 9% of individuals show the recessive phenotype aa. What are q, p, and the frequency of heterozygotes?', a: 'q² = 0.09 so q = 0.3 and p = 0.7. Heterozygotes are 2pq = 2 × 0.7 × 0.3 = 0.42, so 42% of the population carries one copy of a, far more than the 9% who show the trait.' },
        { q: 'You set the fitness of aa to 0.5 and leave AA and Aa at 1. Why does p rise quickly at first and then almost stop rising?', a: 'Selection only "sees" the a allele in aa individuals, whose frequency is q². When q is 0.5, a quarter of the population is aa and selection is strong. When q has fallen to 0.1, only 1% of individuals are aa while 18% are Aa carriers that reproduce normally, so the allele is removed very slowly.' },
        { q: 'With N = 20 and all fitness values equal, p usually ends at exactly 0 or 1 within a few dozen generations. Why, and will it ever move again?', a: 'With only 40 gene copies, random sampling makes p jump by large steps each generation, so it soon hits 0 or 1 by chance. That is drift leading to fixation. In this model there is no mutation or migration, so once an allele is lost it never returns, and p stays fixed.' },
      ],
      id: [
        { q: 'Dalam populasi yang berada dalam kesetimbangan Hardy-Weinberg, 9% individu menunjukkan fenotipe resesif aa. Berapa q, p, dan frekuensi heterozigotnya?', a: 'q² = 0,09 sehingga q = 0,3 dan p = 0,7. Heterozigot adalah 2pq = 2 × 0,7 × 0,3 = 0,42, jadi 42% populasi membawa satu salinan a, jauh lebih banyak daripada 9% yang menampakkan sifat itu.' },
        { q: 'Kamu mengatur kebugaran aa ke 0,5 dan membiarkan AA dan Aa pada 1. Mengapa p naik cepat di awal lalu hampir berhenti naik?', a: 'Seleksi hanya "melihat" alel a pada individu aa, yang frekuensinya q². Saat q = 0,5, seperempat populasi adalah aa dan seleksi kuat. Saat q sudah turun ke 0,1, hanya 1% individu yang aa sedangkan 18% adalah pembawa Aa yang bereproduksi normal, sehingga alel itu disingkirkan sangat lambat.' },
        { q: 'Dengan N = 20 dan semua nilai kebugaran sama, p biasanya berakhir tepat di 0 atau 1 dalam beberapa puluh generasi. Mengapa, dan apakah p akan bergerak lagi?', a: 'Dengan hanya 40 salinan gen, pencuplikan acak membuat p melompat dengan langkah besar setiap generasi, sehingga cepat menyentuh 0 atau 1 secara kebetulan. Itulah hanyutan yang berujung pada fiksasi. Dalam model ini tidak ada mutasi atau migrasi, sehingga alel yang sudah hilang tidak pernah kembali, dan p tetap terfiksasi.' },
      ],
    },
  },
};
