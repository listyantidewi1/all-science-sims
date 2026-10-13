// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'See replicator dynamics: strategies grow if they out-perform the average.',
      'Find the ESS (evolutionary stable strategy) ratio of hawks.',
      'See how raising the cost of fighting reduces hawks.',
    ],
    id: [
      'Melihat dinamika replicator: strategi tumbuh bila lebih baik dari rata-rata.',
      'Menemukan rasio ESS (strategi stabil evolusi) elang.',
      'Melihat bagaimana menaikkan biaya pertarungan menurunkan jumlah elang.',
    ],
  },
  tryThis: {
    en: [
      'Set V = 4, C = 6 — what fraction of hawks at equilibrium?',
      'Set C < V — does the population go all hawks?',
      'Start at 100% hawks — does it stay there?',
    ],
    id: [
      'Atur V = 4, C = 6 — berapa fraksi elang saat seimbang?',
      'Atur C < V — apakah populasi jadi 100% elang?',
      'Mulai dari 100% elang — apakah tetap di situ?',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'Why do animals that could fight to the death over food or mates so often settle for display and bluff? Maynard Smith and Price answered this in 1973 with a game. Two individuals meet over a resource worth V. A Hawk always fights; a Dove displays, and retreats if attacked. Hawk meets Dove: the hawk takes V and the dove gets 0. Two doves share, V/2 each. Two hawks fight, and the loser pays an injury cost C, so on average each gets (V − C)/2, which is negative when fighting is costlier than the prize is worth.',
        'Nobody in the model chooses a strategy; individuals are born hawks or doves and reproduce in proportion to their payoff. The simulation tracks the fraction of hawks, p, with the replicator equation: the rate of change of p equals p times (hawk payoff minus the population average payoff). A hawk\'s expected payoff is p(V − C)/2 + (1 − p)V, a dove\'s is (1 − p)V/2. Each frame the sim nudges p by this amount (scaled by the Speed slider), draws 100 circles coloured by strategy, and plots p over time against the dashed orange line marking the predicted equilibrium.',
        'When fighting is expensive (C greater than V), neither pure population is stable. Among all doves a lone hawk wins every contest, so hawks spread; among all hawks a lone dove avoids injury and does better than the fighters, so doves spread. The two payoffs are equal at p* = V/C, and the population settles there from either side. This is the evolutionarily stable strategy (ESS): once common, it cannot be invaded by the other strategy. With the defaults V = 4 and C = 6, the ESS is 2/3 hawks. If instead C is less than V, hawks always do better and the population goes to 100% hawks, since even a fight is worth it on average.',
        'The Resource value and Fight cost sliders change V and C and move the equilibrium instantly; Starting % hawks and Reset let you approach it from different sides. The model is simplified in several ways: payoffs are averages over random, well-mixed encounters, every individual plays a fixed pure strategy, there is no mutation (so a population of 100% hawks stays there, because there is no dove to copy), and the real continuum of strategies, such as fighting only when larger, is reduced to two. Because the sim draws exactly 100 circles, the display rounds p to the nearest 1%.',
      ],
      id: [
        'Mengapa hewan yang sanggup bertarung sampai mati demi makanan atau pasangan begitu sering cukup dengan pamer dan gertak? Maynard Smith dan Price menjawabnya pada 1973 dengan sebuah permainan. Dua individu bertemu memperebutkan sumber daya bernilai V. Elang selalu bertarung; Merpati hanya berunjuk diri, dan mundur jika diserang. Elang bertemu Merpati: elang mengambil V dan merpati mendapat 0. Dua merpati berbagi, V/2 masing-masing. Dua elang bertarung, dan yang kalah menanggung biaya cedera C, sehingga rata-rata masing-masing mendapat (V − C)/2, yang negatif jika bertarung lebih mahal daripada nilai hadiahnya.',
        'Tak ada yang memilih strategi dalam model ini; individu lahir sebagai elang atau merpati dan berkembang biak sebanding dengan hasilnya. Simulasi melacak fraksi elang, p, dengan persamaan replicator: laju perubahan p sama dengan p dikali (hasil elang dikurangi hasil rata-rata populasi). Hasil yang diharapkan seekor elang adalah p(V − C)/2 + (1 − p)V, seekor merpati (1 − p)V/2. Tiap frame, simulasi menggeser p sebesar nilai itu (diskalakan slider Speed), menggambar 100 lingkaran berwarna sesuai strategi, dan memplot p terhadap waktu bersama garis putus-putus oranye yang menandai kesetimbangan yang diprediksi.',
        'Ketika bertarung mahal (C lebih besar dari V), tidak ada populasi murni yang stabil. Di antara merpati semua, satu elang menang di setiap perebutan, jadi elang menyebar; di antara elang semua, satu merpati terhindar dari cedera dan lebih baik daripada para petarung, jadi merpati menyebar. Kedua hasil sama besar pada p* = V/C, dan populasi menetap di sana dari sisi mana pun. Inilah strategi stabil evolusioner (ESS): begitu umum, ia tidak bisa diinvasi strategi lain. Dengan pengaturan awal V = 4 dan C = 6, ESS-nya 2/3 elang. Jika sebaliknya C lebih kecil dari V, elang selalu lebih baik dan populasi menuju 100% elang, karena bertarung pun rata-rata sepadan.',
        'Slider Resource value dan Fight cost mengubah V dan C dan langsung menggeser kesetimbangan; Starting % hawks dan Reset memungkinkanmu mendekatinya dari sisi yang berbeda. Model ini disederhanakan dalam beberapa hal: hasil adalah rata-rata dari pertemuan acak yang tercampur sempurna, setiap individu memainkan satu strategi murni yang tetap, tidak ada mutasi (sehingga populasi 100% elang tetap di situ karena tak ada merpati yang bisa ditiru), dan rangkaian strategi nyata, seperti bertarung hanya jika lebih besar, diringkas menjadi dua saja. Karena simulasi menggambar tepat 100 lingkaran, tampilannya membulatkan p ke 1% terdekat.',
      ],
    },
    figure: {
      caption: {
        en: 'Left: payoffs to the row player for V = 4, C = 6. Right: expected payoff of a hawk (red) and a dove (blue) as the fraction of hawks p changes. Hawks do better when rare and worse when common; the lines cross at p* = V/C = 2/3, the ESS.',
        id: 'Kiri: hasil untuk pemain baris dengan V = 4, C = 6. Kanan: hasil yang diharapkan seekor elang (merah) dan merpati (biru) saat fraksi elang p berubah. Elang lebih baik ketika langka dan lebih buruk ketika umum; garis berpotongan di p* = V/C = 2/3, yaitu ESS.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Hawk-dove payoff matrix and payoff lines', 'Matriks hasil elang-merpati dan garis hasil')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.s{font-size:10px;opacity:.75}.g{fill:none;stroke:currentColor;stroke-width:1;opacity:.5}.c{fill:none;stroke:currentColor;stroke-width:1}</style>
  <text x="12" y="18" font-weight="bold">${L('Payoff to row player (V = 4, C = 6)', 'Hasil pemain baris (V = 4, C = 6)')}</text>
  <text x="70" y="44" class="s">${L('vs Hawk', 'vs Elang')}</text>
  <text x="124" y="44" class="s">${L('vs Dove', 'vs Merpati')}</text>
  <text x="12" y="76" fill="#ef4444">${L('Hawk', 'Elang')}</text>
  <text x="12" y="116" fill="#3b82f6">${L('Dove', 'Merpati')}</text>
  <rect x="60" y="54" width="56" height="36" class="c"/>
  <rect x="116" y="54" width="56" height="36" class="c"/>
  <rect x="60" y="90" width="56" height="36" class="c"/>
  <rect x="116" y="90" width="56" height="36" class="c"/>
  <text x="66" y="68" class="s">(V−C)/2</text>
  <text x="80" y="84" font-weight="bold">−1</text>
  <text x="134" y="68" class="s">V</text>
  <text x="140" y="84" font-weight="bold">4</text>
  <text x="80" y="104" class="s">0</text>
  <text x="84" y="120" font-weight="bold">0</text>
  <text x="134" y="104" class="s">V/2</text>
  <text x="140" y="120" font-weight="bold">2</text>
  <text x="12" y="150" class="s">${L('Hawk vs Hawk: (4 − 6)/2 = −1', 'Elang vs Elang: (4 − 6)/2 = −1')}</text>
  <text x="12" y="164" class="s">${L('fighting costs more than the prize', 'bertarung lebih mahal dari hadiahnya')}</text>
  <line x1="200" y1="200" x2="340" y2="200" class="g"/>
  <line x1="200" y1="60" x2="200" y2="200" class="g"/>
  <line x1="200" y1="172" x2="340" y2="172" class="g" stroke-dasharray="3 3"/>
  <text x="186" y="176" class="s">0</text>
  <text x="186" y="64" class="s">4</text>
  <text x="196" y="214" class="s">0</text>
  <text x="334" y="214" class="s">1</text>
  <text x="236" y="228" class="s">${L('fraction of hawks p', 'fraksi elang p')}</text>
  <line x1="200" y1="60" x2="340" y2="200" stroke="#ef4444" stroke-width="2.2"/>
  <line x1="200" y1="116" x2="340" y2="172" stroke="#3b82f6" stroke-width="2.2"/>
  <text x="206" y="56" fill="#ef4444" class="s">${L('hawk: 4 − 5p', 'elang: 4 − 5p')}</text>
  <text x="206" y="110" fill="#3b82f6" class="s">${L('dove: 2 − 2p', 'merpati: 2 − 2p')}</text>
  <line x1="293" y1="153" x2="293" y2="200" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="3 3"/>
  <circle cx="293" cy="153" r="4" fill="#f59e0b"/>
  <text x="262" y="214" fill="#f59e0b" class="s">p* = 2/3</text>
  <text x="300" y="146" fill="#f59e0b" class="s">ESS</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Hawk beats dove one on one, but two hawks injure each other, so a hawk\'s payoff falls as hawks become common.',
        'Replicator dynamics: a strategy spreads when its payoff is above the population average and shrinks when it is below.',
        'When C is greater than V, the population settles at a mixed equilibrium with a hawk fraction of V/C, the evolutionarily stable strategy.',
        'When C is less than or equal to V, fighting pays even against another hawk, and the population goes to all hawks.',
        'At the mixed ESS the average payoff is lower than in an all-dove population: evolution favours what cannot be invaded, not what is best for the group.',
      ],
      id: [
        'Elang mengalahkan merpati satu lawan satu, tetapi dua elang saling melukai, sehingga hasil seekor elang turun ketika elang menjadi umum.',
        'Dinamika replicator: sebuah strategi menyebar ketika hasilnya di atas rata-rata populasi dan menyusut ketika di bawahnya.',
        'Ketika C lebih besar dari V, populasi menetap pada kesetimbangan campuran dengan fraksi elang V/C, strategi stabil evolusioner.',
        'Ketika C lebih kecil atau sama dengan V, bertarung tetap untung bahkan melawan elang lain, dan populasi menuju semua elang.',
        'Pada ESS campuran, hasil rata-rata lebih rendah daripada populasi semua merpati: evolusi memihak yang tak bisa diinvasi, bukan yang terbaik bagi kelompok.',
      ],
    },
    vocabulary: {
      en: [
        ['Hawk', 'A strategy that always escalates to a fight and never backs down.'],
        ['Dove', 'A strategy that displays but retreats as soon as the opponent fights.'],
        ['Payoff matrix', 'A table giving each player\'s reward for every combination of strategies.'],
        ['Fitness', 'In evolutionary games, the payoff a strategy earns, which sets how fast it reproduces.'],
        ['Replicator dynamics', 'The rule that a strategy\'s share grows at a rate proportional to its payoff minus the population average payoff.'],
        ['Evolutionarily stable strategy (ESS)', 'A strategy (or mix) that, once adopted by almost everyone, cannot be displaced by a rare alternative.'],
        ['Mixed equilibrium', 'A stable state in which more than one strategy persists, each earning the same payoff.'],
        ['Frequency dependence', 'A payoff that depends on how common each strategy is in the population.'],
      ],
      id: [
        ['Elang (Hawk)', 'Strategi yang selalu meningkatkan konflik menjadi pertarungan dan tidak pernah mundur.'],
        ['Merpati (Dove)', 'Strategi yang berunjuk diri tetapi mundur begitu lawan bertarung.'],
        ['Matriks hasil', 'Tabel yang memuat imbalan tiap pemain untuk setiap kombinasi strategi.'],
        ['Kebugaran (fitness)', 'Dalam permainan evolusioner, hasil yang diperoleh sebuah strategi, yang menentukan seberapa cepat ia berkembang biak.'],
        ['Dinamika replicator', 'Aturan bahwa porsi sebuah strategi tumbuh dengan laju sebanding dengan hasilnya dikurangi hasil rata-rata populasi.'],
        ['Strategi stabil evolusioner (ESS)', 'Strategi (atau campuran) yang, begitu diadopsi hampir semua orang, tidak bisa digeser oleh alternatif yang langka.'],
        ['Kesetimbangan campuran', 'Keadaan stabil ketika lebih dari satu strategi bertahan, masing-masing memperoleh hasil yang sama.'],
        ['Kebergantungan frekuensi', 'Hasil yang bergantung pada seberapa umum tiap strategi dalam populasi.'],
      ],
    },
    misconceptions: {
      en: [
        ['The population ends up at the ESS because the best outcome for the species wins.', 'The ESS is not the best outcome for the group. With V = 4 and C = 6 an all-dove population would average 2 per contest, but at the ESS the average is only about 0.67. Evolution selects what cannot be invaded, not what is collectively best.'],
        ['Aggression always wins, so the population should become all hawks.', 'Only if fighting is cheap (C less than or equal to V). When injuries cost more than the prize, a hawk among many hawks is mostly fighting other hawks and losing, so doves gain ground.'],
        ['The individuals in the sim learn or decide to be hawks or doves.', 'Nobody decides anything. Each individual is a fixed type; the fractions change only because higher payoff means more offspring. The same mathematics also describes people imitating successful neighbours.'],
        ['Starting at 100% hawks, the population will move to the ESS.', 'It stays at 100%, because the replicator equation can only change the share of strategies that already exist. The all-hawk state is an unstable equilibrium: a single dove would spread, but the sim has no mutation to supply one.'],
      ],
      id: [
        ['Populasi berakhir di ESS karena hasil terbaik bagi spesies yang menang.', 'ESS bukan hasil terbaik bagi kelompok. Dengan V = 4 dan C = 6, populasi semua merpati rata-rata mendapat 2 per perebutan, tetapi di ESS rata-ratanya hanya sekitar 0,67. Evolusi memilih yang tidak bisa diinvasi, bukan yang terbaik secara kolektif.'],
        ['Agresi selalu menang, jadi populasi seharusnya menjadi semua elang.', 'Hanya jika bertarung murah (C lebih kecil atau sama dengan V). Ketika cedera lebih mahal daripada hadiahnya, seekor elang di antara banyak elang sebagian besar bertarung melawan elang lain dan merugi, sehingga merpati merebut tempat.'],
        ['Individu dalam simulasi belajar atau memutuskan menjadi elang atau merpati.', 'Tidak ada yang memutuskan apa pun. Setiap individu bertipe tetap; fraksinya berubah hanya karena hasil yang lebih tinggi berarti keturunan lebih banyak. Matematika yang sama juga menggambarkan orang yang meniru tetangga yang sukses.'],
        ['Jika mulai dari 100% elang, populasi akan bergerak ke ESS.', 'Ia tetap di 100%, karena persamaan replicator hanya bisa mengubah porsi strategi yang sudah ada. Keadaan semua elang adalah kesetimbangan tak stabil: satu merpati saja akan menyebar, tetapi simulasi tidak punya mutasi untuk memunculkannya.'],
      ],
    },
    realWorld: {
      en: [
        'Many animals, from deer to lizards, settle contests with displays and ritual fights; serious injury is rare because fighting all out costs more than the prize is worth.',
        'Side-blotched lizards have three male types that beat each other in a rock-paper-scissors cycle, a frequency-dependent game that keeps all three in the population.',
        'Price wars between companies follow the same logic: undercutting a cautious rival wins customers, but two aggressive firms both lose money.',
        'The hawk-dove game is also used to think about arms races and brinkmanship, where backing down is cheaper than a conflict both sides would lose.',
      ],
      id: [
        'Banyak hewan, dari rusa sampai kadal, menyelesaikan perebutan dengan unjuk diri dan pertarungan ritual; cedera serius jarang karena bertarung habis-habisan lebih mahal daripada nilai hadiahnya.',
        'Kadal side-blotched punya tiga tipe jantan yang saling mengalahkan dalam siklus gunting-batu-kertas, permainan bergantung frekuensi yang mempertahankan ketiganya dalam populasi.',
        'Perang harga antarperusahaan mengikuti logika yang sama: memotong harga pesaing yang berhati-hati merebut pelanggan, tetapi dua perusahaan yang agresif sama-sama rugi.',
        'Permainan elang-merpati juga dipakai untuk memikirkan perlombaan senjata dan politik tepi jurang, ketika mundur lebih murah daripada konflik yang merugikan kedua pihak.',
      ],
    },
    questions: {
      en: [
        { q: 'With V = 4 and C = 6, what fraction of hawks does the population settle at, and why there?', a: 'At p* = V/C = 4/6 ≈ 67%. A hawk expects 4 − 5p and a dove 2 − 2p; these are equal when 4 − 5p = 2 − 2p, i.e. p = 2/3. Below that hawks earn more and increase; above it doves earn more and increase.' },
        { q: 'Set V = 4 and C = 3. What happens to the population, and what does a hawk-hawk contest pay now?', a: 'The population goes to 100% hawks. Hawk-hawk now pays (4 − 3)/2 = +0.5, so even fighting another hawk is worth it on average, and a hawk out-earns a dove at every value of p.' },
        { q: 'An all-dove population earns the highest average payoff. Why is it not stable?', a: 'A single hawk among doves wins V = 4 in every contest, while each dove gets only V/2 = 2. The hawk therefore reproduces faster and hawks spread, even though the population average falls as they do. Group benefit does not protect a strategy from an individually profitable invader.' },
      ],
      id: [
        { q: 'Dengan V = 4 dan C = 6, pada fraksi elang berapa populasi menetap, dan mengapa di sana?', a: 'Pada p* = V/C = 4/6 ≈ 67%. Seekor elang mengharapkan 4 − 5p dan seekor merpati 2 − 2p; keduanya sama ketika 4 − 5p = 2 − 2p, yaitu p = 2/3. Di bawahnya elang memperoleh lebih banyak dan bertambah; di atasnya merpati memperoleh lebih banyak dan bertambah.' },
        { q: 'Atur V = 4 dan C = 3. Apa yang terjadi pada populasi, dan berapa hasil pertarungan elang-elang sekarang?', a: 'Populasi menuju 100% elang. Elang-elang kini menghasilkan (4 − 3)/2 = +0,5, jadi bertarung dengan elang lain pun rata-rata sepadan, dan elang mengalahkan merpati pada setiap nilai p.' },
        { q: 'Populasi semua merpati memperoleh hasil rata-rata tertinggi. Mengapa ia tidak stabil?', a: 'Satu elang di antara merpati memenangi V = 4 di setiap perebutan, sedangkan tiap merpati hanya mendapat V/2 = 2. Elang itu berkembang biak lebih cepat dan elang menyebar, meskipun rata-rata populasi turun karenanya. Keuntungan kelompok tidak melindungi sebuah strategi dari penyusup yang untung secara individu.' },
      ],
    },
  },
};
