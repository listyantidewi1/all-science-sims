// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'See how an irrelevant anchor pulls estimates toward itself.',
      'Notice that smarter or more-informed people are still affected (just less).',
      'Predict the bias for any anchor by linear interpolation toward the anchor.',
    ],
    id: [
      'Melihat bagaimana jangkar tak relevan menarik estimasi.',
      'Memperhatikan bahwa orang lebih cerdas/lebih banyak tahu tetap terpengaruh (hanya kurang).',
      'Memprediksi bias untuk jangkar apa pun dengan interpolasi linear.',
    ],
  },
  tryThis: {
    en: [
      'Anchor at the true value — estimates cluster correctly.',
      'Anchor 10× too high — average estimate jumps maybe 30–50%.',
      'Crank "anchor strength" up — the population gets stuck on it.',
    ],
    id: [
      'Jangkar di nilai benar — estimasi terkumpul tepat.',
      'Jangkar 10× terlalu tinggi — rata-rata estimasi melompat 30-50%.',
      'Naikkan "kekuatan jangkar" — populasi terjebak di jangkar.',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'When people have to estimate a quantity they do not know exactly, such as the length of the Nile, they rarely start from nothing. They start from whatever number is already in front of them and adjust away from it. The trouble is that the adjustment is usually too small, so the final estimate stays biased toward the starting number, the anchor. This happens even when the anchor is obviously irrelevant, and even when people are told to ignore it.',
        'The classic demonstration is from Tversky and Kahneman (1974). Participants watched a wheel of fortune land on 10 or 65 and were then asked what percentage of United Nations members were African countries. Those who saw 10 gave a median estimate of 25%; those who saw 65 said 45%. A random number had moved the answer by 20 percentage points. Experts, including judges and estate agents, show the same pull when tested with their own professional judgments.',
        'The simulation builds a population of 200 imaginary people. Each person has a private guess that scatters around the true value, and the model mixes that guess with the anchor: the final estimate is a weighted average, on a logarithmic scale, of the private guess and the anchor, with the anchor weight set by the Anchor strength slider (s). Because estimates of big quantities spread out in ratios rather than fixed amounts, the sim works with logarithms, so the typical estimate becomes truth^(1 − s) × anchor^s. Dragging the orange anchor moves the whole histogram, and the red line shows the mean estimate.',
        'The model is a deliberate simplification. Real anchoring strength depends on how plausible the anchor is, how much the person knows, and how much time they take; the sim treats s as one fixed number for everyone. It also reports the arithmetic mean, which for a skewed, ratio-type distribution sits a few percent above the typical value, so even with the anchor exactly on the truth the readout shows a small positive bias. Setting strength to 0 shows what a population without anchoring would look like.',
      ],
      id: [
        'Ketika orang harus memperkirakan suatu besaran yang tidak mereka ketahui secara pasti, misalnya panjang Sungai Nil, mereka hampir tidak pernah memulai dari nol. Mereka berangkat dari angka apa pun yang sudah ada di depan mata lalu menyesuaikannya. Masalahnya, penyesuaian itu biasanya terlalu kecil, sehingga perkiraan akhir tetap condong ke angka awal, yaitu jangkar. Ini terjadi bahkan ketika jangkar jelas tidak relevan, dan bahkan ketika orang diminta mengabaikannya.',
        'Demonstrasi klasiknya berasal dari Tversky dan Kahneman (1974). Peserta melihat roda keberuntungan berhenti di angka 10 atau 65, lalu ditanya berapa persen anggota PBB yang merupakan negara Afrika. Mereka yang melihat 10 memberi perkiraan median 25%; yang melihat 65 menjawab 45%. Sebuah angka acak menggeser jawaban sebesar 20 poin persentase. Para ahli, termasuk hakim dan agen properti, menunjukkan tarikan yang sama saat diuji dengan penilaian profesional mereka sendiri.',
        'Simulasi ini membangun populasi 200 orang khayalan. Setiap orang punya tebakan pribadi yang menyebar di sekitar nilai sebenarnya, lalu model mencampur tebakan itu dengan jangkar: perkiraan akhir adalah rata-rata berbobot, pada skala logaritmik, antara tebakan pribadi dan jangkar, dengan bobot jangkar ditentukan slider Anchor strength (s). Karena perkiraan besaran yang besar menyebar dalam rasio, bukan dalam selisih tetap, simulasi bekerja dengan logaritma, sehingga perkiraan tipikal menjadi kebenaran^(1 − s) × jangkar^s. Menggeser jangkar oranye memindahkan seluruh histogram, dan garis merah menunjukkan rata-rata perkiraan.',
        'Model ini sengaja disederhanakan. Kekuatan penjangkaran yang sebenarnya bergantung pada seberapa masuk akal jangkarnya, seberapa banyak pengetahuan orang itu, dan seberapa lama ia berpikir; simulasi memperlakukan s sebagai satu angka tetap untuk semua orang. Simulasi juga menampilkan rata-rata aritmetika, yang untuk sebaran miring bertipe rasio terletak beberapa persen di atas nilai tipikal, sehingga bahkan saat jangkar tepat di nilai benar, pembacaan tetap menunjukkan bias positif kecil. Mengatur kekuatan ke 0 memperlihatkan seperti apa populasi tanpa penjangkaran.',
      ],
    },
    figure: {
      caption: {
        en: 'On a log-scale number line, the population\'s estimates (bars) are pulled from the true value toward the anchor. With strength s, the typical estimate moves a fraction s of the way: truth^(1 − s) × anchor^s.',
        id: 'Pada garis bilangan berskala log, perkiraan populasi (batang) tertarik dari nilai sebenarnya ke arah jangkar. Dengan kekuatan s, perkiraan tipikal bergeser sejauh fraksi s dari jaraknya: kebenaran^(1 − s) × jangkar^s.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Estimates shift toward the anchor', 'Perkiraan bergeser ke arah jangkar')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.m{fill:none;stroke:currentColor;stroke-width:1.2;opacity:.45}.b{fill:#ef4444;opacity:.55}</style>
  <line x1="30" y1="170" x2="330" y2="170" stroke="currentColor" stroke-width="1.5"/>
  <text x="30" y="188">${L('estimate (log scale)', 'perkiraan (skala log)')}</text>
  <rect x="110" y="160" width="9" height="8" class="b"/>
  <rect x="120" y="150" width="9" height="18" class="b"/>
  <rect x="130" y="134" width="9" height="34" class="b"/>
  <rect x="140" y="114" width="9" height="54" class="b"/>
  <rect x="150" y="100" width="9" height="68" class="b"/>
  <rect x="160" y="96" width="9" height="72" class="b"/>
  <rect x="170" y="108" width="9" height="60" class="b"/>
  <rect x="180" y="124" width="9" height="44" class="b"/>
  <rect x="190" y="142" width="9" height="26" class="b"/>
  <rect x="200" y="154" width="9" height="14" class="b"/>
  <rect x="210" y="162" width="9" height="6" class="b"/>
  <line x1="120" y1="40" x2="120" y2="170" stroke="#10b981" stroke-width="2"/>
  <text x="76" y="34" fill="#10b981">${L('true value', 'nilai sebenarnya')}</text>
  <line x1="270" y1="40" x2="270" y2="170" stroke="#f59e0b" stroke-width="2" stroke-dasharray="5 4"/>
  <text x="248" y="34" fill="#f59e0b">${L('anchor', 'jangkar')}</text>
  <line x1="165" y1="60" x2="165" y2="170" stroke="#ef4444" stroke-width="2"/>
  <text x="128" y="206" fill="#ef4444">${L('mean estimate', 'rata-rata perkiraan')}</text>
  <line x1="120" y1="62" x2="160" y2="62" stroke="currentColor" stroke-width="1.5" marker-end="url(#a)"/>
  <text x="112" y="78">${L('shift = s × gap', 'geser = s × jarak')}</text>
  <line x1="120" y1="222" x2="266" y2="222" class="m" stroke-dasharray="3 3"/>
  <text x="150" y="236">${L('gap between truth and anchor', 'jarak nilai benar ke jangkar')}</text>
  <defs><marker id="a" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="context-stroke"/></marker></defs>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'People estimate by starting from an available number and adjusting too little, so estimates stay biased toward the anchor.',
        'The anchor works even when it is random or irrelevant to the question.',
        'In the sim the typical estimate is truth^(1 − s) × anchor^s: strength s is the fraction of the way (in log terms) the population slides toward the anchor.',
        'Knowledge and expertise reduce anchoring but do not remove it.',
        'The bias is a property of how judgment works, not a sign of carelessness, which is why it is so hard to notice in yourself.',
      ],
      id: [
        'Orang memperkirakan dengan berangkat dari angka yang tersedia lalu menyesuaikan terlalu sedikit, sehingga perkiraan tetap condong ke jangkar.',
        'Jangkar tetap bekerja meski angkanya acak atau tidak relevan dengan pertanyaan.',
        'Dalam simulasi, perkiraan tipikal adalah kebenaran^(1 − s) × jangkar^s: kekuatan s adalah fraksi jarak (dalam skala log) yang ditempuh populasi menuju jangkar.',
        'Pengetahuan dan keahlian mengurangi penjangkaran, tetapi tidak menghilangkannya.',
        'Bias ini adalah sifat cara kerja penilaian, bukan tanda kecerobohan, sehingga sangat sulit disadari pada diri sendiri.',
      ],
    },
    vocabulary: {
      en: [
        ['Anchor', 'The starting number a person has in mind before estimating, whether or not it is relevant.'],
        ['Anchoring and adjustment', 'The heuristic of starting from an anchor and adjusting toward the answer, usually by too little.'],
        ['Heuristic', 'A mental shortcut that gives fast, usually good-enough judgments but produces predictable errors.'],
        ['Cognitive bias', 'A systematic, repeatable deviation of judgment from the correct or rational answer.'],
        ['Anchor strength (s)', 'In the sim, the weight given to the anchor: 0 means no anchoring, 0.9 means estimates nearly equal the anchor.'],
        ['Log scale', 'An axis on which equal distances mean equal ratios (×10, ×100), used because estimates of large quantities spread out in ratios.'],
        ['Median', 'The middle value of a set of estimates; less affected by a few extreme guesses than the mean.'],
      ],
      id: [
        ['Jangkar', 'Angka awal yang ada di benak seseorang sebelum memperkirakan, relevan atau tidak.'],
        ['Penjangkaran dan penyesuaian', 'Heuristik yang berangkat dari jangkar lalu menyesuaikan ke arah jawaban, biasanya terlalu sedikit.'],
        ['Heuristik', 'Jalan pintas mental yang memberi penilaian cepat dan biasanya cukup baik, tetapi menghasilkan kesalahan yang dapat diprediksi.'],
        ['Bias kognitif', 'Penyimpangan penilaian yang sistematis dan berulang dari jawaban yang benar atau rasional.'],
        ['Kekuatan jangkar (s)', 'Dalam simulasi, bobot yang diberikan pada jangkar: 0 berarti tanpa penjangkaran, 0,9 berarti perkiraan hampir sama dengan jangkar.'],
        ['Skala log', 'Sumbu dengan jarak yang sama berarti rasio yang sama (×10, ×100), dipakai karena perkiraan besaran besar menyebar dalam rasio.'],
        ['Median', 'Nilai tengah dari sekumpulan perkiraan; kurang terpengaruh oleh beberapa tebakan ekstrem dibanding rata-rata.'],
      ],
    },
    misconceptions: {
      en: [
        ['Anchoring only works if the anchor seems like a reasonable answer.', 'Even obviously random anchors, such as a wheel of fortune or the last digits of a phone number, shift estimates. Plausible anchors pull harder, but irrelevance does not switch the effect off.'],
        ['If you know about anchoring, you are immune to it.', 'Warning people about anchoring and telling them to ignore the number reduces the effect only slightly. The adjustment still stops too early.'],
        ['Experts are not anchored because they know the real answer.', 'When the quantity is uncertain, experts anchor too. Real-estate agents shown a high listing price valued the same house higher than agents shown a low one.'],
        ['The anchor just adds a fixed amount to everyone\'s guess.', 'The pull is proportional to the gap between the anchor and the person\'s own guess, which is why the sim models it as a fraction of the distance, not as a constant.'],
      ],
      id: [
        ['Penjangkaran hanya bekerja jika jangkarnya tampak seperti jawaban yang masuk akal.', 'Bahkan jangkar yang jelas acak, seperti roda keberuntungan atau digit terakhir nomor telepon, menggeser perkiraan. Jangkar yang masuk akal menarik lebih kuat, tetapi ketidakrelevanan tidak mematikan efeknya.'],
        ['Kalau sudah tahu tentang penjangkaran, kita kebal terhadapnya.', 'Memperingatkan orang tentang penjangkaran dan meminta mereka mengabaikan angka itu hanya sedikit mengurangi efeknya. Penyesuaian tetap berhenti terlalu dini.'],
        ['Para ahli tidak terjangkar karena mereka tahu jawaban sebenarnya.', 'Ketika besarannya tidak pasti, para ahli pun terjangkar. Agen properti yang diperlihatkan harga penawaran tinggi menilai rumah yang sama lebih mahal daripada agen yang melihat harga rendah.'],
        ['Jangkar hanya menambahkan jumlah tetap pada tebakan setiap orang.', 'Tarikannya sebanding dengan jarak antara jangkar dan tebakan orang itu sendiri, itulah sebabnya simulasi memodelkannya sebagai fraksi dari jarak, bukan sebagai konstanta.'],
      ],
    },
    realWorld: {
      en: [
        'Price tags: a "was Rp 500,000, now Rp 299,000" label anchors you on the old price so the new one feels like a bargain.',
        'Negotiation: the first offer in a salary or house negotiation anchors the whole discussion, which is why skilled negotiators try to make it.',
        'Courtrooms: in experiments, judges given a higher sentencing demand by the prosecutor handed down longer sentences for the same case.',
        'Restaurant menus often place a very expensive dish at the top so the other prices look moderate by comparison.',
      ],
      id: [
        'Label harga: tulisan "dulu Rp500.000, kini Rp299.000" menjangkarkan kita pada harga lama sehingga harga baru terasa murah.',
        'Negosiasi: tawaran pertama dalam negosiasi gaji atau rumah menjangkarkan seluruh pembicaraan, karena itu negosiator terampil berusaha mengajukannya lebih dulu.',
        'Ruang sidang: dalam eksperimen, hakim yang menerima tuntutan hukuman lebih tinggi dari penuntut menjatuhkan hukuman lebih lama untuk kasus yang sama.',
        'Menu restoran sering menaruh hidangan yang sangat mahal di bagian atas agar harga lainnya terlihat wajar.',
      ],
    },
    questions: {
      en: [
        { q: 'The true value is 1000, the anchor is 10 000 and anchor strength is 0.5. What typical estimate does the sim\'s model predict?', a: 'About 3160. The typical estimate is truth^(1 − s) × anchor^s = 1000^0.5 × 10000^0.5 = √(10 000 000) ≈ 3162, so the population lands halfway between the two on a log scale, about 3 times the truth.' },
        { q: 'In Tversky and Kahneman\'s wheel-of-fortune study, why were the participants not simply being lazy or careless?', a: 'They adjusted away from the anchor (25% is well above 10, 45% is well below 65), so they were clearly thinking about the question. The problem is that adjustment stops as soon as a value feels plausible, and that stopping point is still close to the anchor. The bias comes from the mechanism of judgment, not from lack of effort.' },
        { q: 'Set the anchor exactly on the true value and strength to 0.4. The readout still shows a bias of a few percent. Why?', a: 'The estimates spread out as ratios (a skewed, log-normal shape), and the arithmetic mean of such a distribution sits above its typical value. This small positive bias is a property of averaging skewed data, not an effect of the anchor; the median would sit at the truth.' },
      ],
      id: [
        { q: 'Nilai sebenarnya 1000, jangkar 10.000, dan kekuatan jangkar 0,5. Berapa perkiraan tipikal yang diprediksi model simulasi?', a: 'Sekitar 3160. Perkiraan tipikal adalah kebenaran^(1 − s) × jangkar^s = 1000^0,5 × 10000^0,5 = √(10.000.000) ≈ 3162, sehingga populasi mendarat di tengah-tengah keduanya pada skala log, sekitar 3 kali nilai sebenarnya.' },
        { q: 'Dalam studi roda keberuntungan Tversky dan Kahneman, mengapa peserta tidak bisa disebut sekadar malas atau ceroboh?', a: 'Mereka menyesuaikan menjauh dari jangkar (25% jauh di atas 10, 45% jauh di bawah 65), jadi mereka jelas memikirkan pertanyaannya. Masalahnya, penyesuaian berhenti begitu suatu nilai terasa masuk akal, dan titik berhenti itu masih dekat dengan jangkar. Biasnya berasal dari mekanisme penilaian, bukan dari kurangnya usaha.' },
        { q: 'Atur jangkar tepat di nilai sebenarnya dan kekuatan ke 0,4. Pembacaan tetap menunjukkan bias beberapa persen. Mengapa?', a: 'Perkiraan menyebar sebagai rasio (bentuk miring, log-normal), dan rata-rata aritmetika sebaran seperti itu terletak di atas nilai tipikalnya. Bias positif kecil ini adalah sifat dari merata-ratakan data miring, bukan efek jangkar; mediannya akan tepat di nilai sebenarnya.' },
      ],
    },
  },
};
