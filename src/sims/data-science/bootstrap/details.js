// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Apply non-parametric uncertainty estimation.',
      'Read 95% CI from the 2.5th–97.5th percentile of bootstrap means.',
      'Compare to the parametric formula s/√n.',
    ],
    id: [
      'Menerapkan estimasi ketakpastian non-parametrik.',
      'Membaca 95% CI dari persentil 2,5–97,5 rata-rata bootstrap.',
      'Membandingkan dengan rumus parametrik s/√n.',
    ],
  },
  tryThis: {
    en: [
      'Sample size 10 — wide CI?',
      'Sample size 100 — does CI shrink as 1/√n?',
      "Compare bootstrap CI to s/√n — they should be similar.",
    ],
    id: [
      'Ukuran sampel 10 — CI lebar?',
      'Ukuran sampel 100 — apakah CI menyusut sebagai 1/√n?',
      'Bandingkan CI bootstrap dengan s/√n — seharusnya mirip.',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'Suppose you measure 30 people and get a sample mean of 5.1. If you measured a different 30 people you would get a slightly different mean. The question every statistician asks is: how different? The spread of the sample mean across all the samples you could have taken is called its sampling distribution, and its width tells you how much to trust a single estimate. Usually we only have one sample, so we cannot see that spread directly.',
        'The bootstrap (Efron, 1979) gets around this with a trick: treat the sample itself as a stand-in for the population. Draw n values from the sample with replacement, so some values appear twice or more and others not at all, and compute the mean of that resample. Repeat B times. The spread of these B bootstrap means mimics the spread of the sample mean itself. The simulation sorts the bootstrap means and reads off the 2.5th and 97.5th percentiles; the interval between them is the percentile bootstrap 95% confidence interval, shown as two yellow lines on the histogram.',
        'The sliders control two very different things. Sample size n and true σ change the real uncertainty: the interval width shrinks roughly like 1/√n and grows in proportion to σ. The number of bootstrap iterations B only changes how smoothly that width is estimated: B = 100 gives a jagged histogram and a slightly wobbly interval, B = 10 000 gives a smooth one, but the width itself stays about the same. Likewise "New random sample" draws a fresh sample from the population, so the interval jumps, while "Re-bootstrap" reuses the same sample and the interval barely moves. For comparison the sim prints the textbook standard error s/√n and its ±1.96 margin.',
        'The sim draws the population from a normal distribution, which is exactly the case where the formula s/√n already works, so here the two intervals agree closely. The bootstrap earns its keep when the statistic is a median, a ratio or a correlation, or when the data are skewed and no formula is available. It is not magic: a biased or tiny sample stays biased or tiny, and resampling five values can only ever produce a limited set of means. The percentile interval used here is the simplest of several bootstrap intervals; it covers the true mean close to, but not exactly, 95% of the time.',
      ],
      id: [
        'Misalkan kamu mengukur 30 orang dan mendapat rata-rata sampel 5,1. Kalau kamu mengukur 30 orang yang lain, rata-ratanya akan sedikit berbeda. Pertanyaan yang selalu diajukan statistikawan: seberapa berbeda? Sebaran rata-rata sampel dari semua sampel yang mungkin kamu ambil disebut distribusi sampling, dan lebarnya menunjukkan seberapa jauh satu taksiran bisa dipercaya. Biasanya kita hanya punya satu sampel, sehingga sebaran itu tidak bisa dilihat langsung.',
        'Bootstrap (Efron, 1979) mengakalinya dengan satu trik: perlakukan sampel itu sendiri sebagai pengganti populasi. Ambil n nilai dari sampel dengan pengembalian, sehingga sebagian nilai muncul dua kali atau lebih dan sebagian lain tidak muncul sama sekali, lalu hitung rata-rata resampel itu. Ulangi B kali. Sebaran B rata-rata bootstrap ini meniru sebaran rata-rata sampel yang sebenarnya. Simulasi mengurutkan rata-rata bootstrap dan membaca persentil ke-2,5 dan ke-97,5; selang di antara keduanya adalah interval kepercayaan 95% bootstrap persentil, yang digambar sebagai dua garis kuning pada histogram.',
        'Slider di sini mengatur dua hal yang sangat berbeda. Ukuran sampel n dan σ sejati mengubah ketakpastian yang sebenarnya: lebar interval menyusut kira-kira sebanding dengan 1/√n dan membesar sebanding dengan σ. Jumlah iterasi bootstrap B hanya mengubah seberapa mulus lebar itu ditaksir: B = 100 memberi histogram bergerigi dan interval yang agak goyah, B = 10.000 memberi histogram mulus, tetapi lebarnya kurang lebih sama. Begitu pula tombol "New random sample" menarik sampel baru dari populasi sehingga intervalnya melompat, sedangkan "Re-bootstrap" memakai sampel yang sama sehingga intervalnya hampir tidak bergeser. Sebagai pembanding, simulasi menampilkan galat baku buku teks s/√n beserta margin ±1,96-nya.',
        'Simulasi mengambil populasi dari distribusi normal, yaitu kasus di mana rumus s/√n memang sudah berfungsi, sehingga di sini kedua interval hampir sama. Bootstrap benar-benar berguna ketika statistiknya berupa median, rasio, atau korelasi, atau ketika data menjulur dan tidak ada rumusnya. Bootstrap bukan sihir: sampel yang bias atau terlalu kecil tetap bias atau kecil, dan meresampel lima nilai hanya bisa menghasilkan sekumpulan rata-rata yang terbatas. Interval persentil yang dipakai di sini adalah yang paling sederhana di antara beberapa jenis interval bootstrap; interval ini mencakup rata-rata sejati mendekati, tetapi tidak persis, 95% dari waktu.',
      ],
    },
    figure: {
      caption: {
        en: 'One sample of five values is resampled with replacement; each resample has its own mean. After thousands of resamples the means pile up into a histogram, and the middle 95% of them is the bootstrap confidence interval.',
        id: 'Satu sampel berisi lima nilai diresampel dengan pengembalian; tiap resampel punya rata-ratanya sendiri. Setelah ribuan resampel, rata-rata itu menumpuk menjadi histogram, dan 95% bagian tengahnya adalah interval kepercayaan bootstrap.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        const box = (x, y, v, c) => `<rect x="${x}" y="${y}" width="20" height="16" rx="3" fill="${c}" opacity=".85"/><text x="${x + 10}" y="${y + 12}" text-anchor="middle" fill="#fff" style="font-size:10px">${v}</text>`;
        const row = (y, vals, c) => vals.map((v, i) => box(16 + i * 24, y, v, c)).join('');
        const heights = [2, 4, 7, 12, 19, 27, 34, 38, 36, 30, 22, 15, 9, 5, 3, 1];
        const bars = heights.map((h, i) => `<rect x="${180 + i * 10}" y="${228 - h * 2}" width="9" height="${h * 2}" fill="#10b981" opacity=".8"/>`).join('');
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('How bootstrap resampling builds a confidence interval', 'Cara resampling bootstrap membangun interval kepercayaan')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.m{fill:none;stroke:currentColor;stroke-width:1;opacity:.45}.s{font-size:10px;opacity:.75}</style>
  <text x="16" y="14" style="font-weight:600">${L('Original sample (n = 5)', 'Sampel asli (n = 5)')}</text>
  ${row(20, [2, 4, 5, 7, 9], '#3b82f6')}
  <text x="142" y="33" class="s">${L('mean 5.4', 'rata-rata 5,4')}</text>
  <path d="M70 40 L70 52" class="m" marker-end="url(#a)"/>
  <text x="80" y="50" class="s">${L('draw 5 with replacement', 'ambil 5 dengan pengembalian')}</text>
  ${row(58, [4, 4, 5, 9, 9], '#8b5cf6')}<text x="142" y="71" class="s">${L('mean 6.2', 'rata-rata 6,2')}</text>
  ${row(82, [2, 2, 5, 7, 9], '#8b5cf6')}<text x="142" y="95" class="s">${L('mean 5.0', 'rata-rata 5,0')}</text>
  ${row(106, [2, 5, 7, 7, 9], '#8b5cf6')}<text x="142" y="119" class="s">${L('mean 6.0', 'rata-rata 6,0')}</text>
  <text x="16" y="140" class="s">${L('… repeat B = 2000 times', '… ulangi B = 2000 kali')}</text>
  <path d="M60 150 L60 170 L172 170" class="m" marker-end="url(#a)"/>
  <text x="180" y="150" style="font-weight:600">${L('Histogram of bootstrap means', 'Histogram rata-rata bootstrap')}</text>
  ${bars}
  <line x1="180" y1="228" x2="340" y2="228" class="m"/>
  <line x1="207" y1="156" x2="207" y2="230" stroke="#f59e0b" stroke-width="2"/>
  <line x1="320" y1="156" x2="320" y2="230" stroke="#f59e0b" stroke-width="2"/>
  <text x="196" y="238" class="s" fill="#f59e0b">${L('2.5%', '2,5%')}</text>
  <text x="305" y="238" class="s" fill="#f59e0b">${L('97.5%', '97,5%')}</text>
  <path d="M209 162 L318 162" stroke="#f59e0b" stroke-width="1.2" marker-end="url(#b)" marker-start="url(#b)"/>
  <text x="263" y="172" text-anchor="middle" class="s" fill="#f59e0b">95% CI</text>
  <defs><marker id="a" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="currentColor" opacity=".6"/></marker><marker id="b" markerWidth="6" markerHeight="6" refX="3" refY="3"><circle cx="3" cy="3" r="2" fill="#f59e0b"/></marker></defs>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'A statistic computed from one sample has its own spread, the sampling distribution, which we usually cannot observe directly.',
        'Resampling the sample with replacement imitates drawing new samples from the population, so the spread of bootstrap means estimates the spread of the sample mean.',
        'The percentile bootstrap 95% CI runs from the 2.5th to the 97.5th percentile of the bootstrap means.',
        'More data (larger n) narrows the interval by about 1/√n; more resamples (larger B) only smooths the estimate of that width.',
        'For a mean from roughly normal data the bootstrap CI and the formula x̄ ± 1.96·s/√n agree; the bootstrap matters most when no formula exists.',
      ],
      id: [
        'Statistik yang dihitung dari satu sampel punya sebarannya sendiri, yaitu distribusi sampling, yang biasanya tidak bisa kita amati langsung.',
        'Meresampel sampel dengan pengembalian meniru pengambilan sampel baru dari populasi, sehingga sebaran rata-rata bootstrap menaksir sebaran rata-rata sampel.',
        'CI 95% bootstrap persentil membentang dari persentil ke-2,5 sampai ke-97,5 rata-rata bootstrap.',
        'Lebih banyak data (n besar) mempersempit interval sekitar 1/√n; lebih banyak resampel (B besar) hanya memperhalus taksiran lebar itu.',
        'Untuk rata-rata dari data yang kira-kira normal, CI bootstrap dan rumus x̄ ± 1,96·s/√n sepakat; bootstrap paling berguna ketika rumusnya tidak ada.',
      ],
    },
    vocabulary: {
      en: [
        ['Sampling distribution', 'The distribution a statistic (such as the mean) would have across all possible samples of the same size.'],
        ['Resampling with replacement', 'Drawing values one at a time from the sample and putting each back before the next draw, so repeats are allowed.'],
        ['Bootstrap mean', 'The mean of one resample; the sim computes B of them.'],
        ['Standard error (SE)', 'The standard deviation of the sampling distribution of a statistic; for the mean, estimated by s/√n.'],
        ['Percentile interval', 'A confidence interval whose ends are percentiles of the bootstrap distribution, here the 2.5th and 97.5th.'],
        ['Confidence interval (CI)', 'A range built from the data that, over many repetitions of the whole procedure, contains the true value a stated fraction of the time (here 95%).'],
        ['Non-parametric', 'Making no assumption about the shape of the population distribution.'],
      ],
      id: [
        ['Distribusi sampling', 'Distribusi yang akan dimiliki suatu statistik (misalnya rata-rata) di antara semua sampel yang mungkin dengan ukuran yang sama.'],
        ['Resampling dengan pengembalian', 'Mengambil nilai satu per satu dari sampel dan mengembalikannya sebelum pengambilan berikutnya, sehingga nilai boleh terulang.'],
        ['Rata-rata bootstrap', 'Rata-rata dari satu resampel; simulasi menghitung B buah.'],
        ['Galat baku (SE)', 'Simpangan baku dari distribusi sampling suatu statistik; untuk rata-rata ditaksir dengan s/√n.'],
        ['Interval persentil', 'Interval kepercayaan yang ujung-ujungnya adalah persentil distribusi bootstrap, di sini persentil ke-2,5 dan ke-97,5.'],
        ['Interval kepercayaan (CI)', 'Rentang yang dibangun dari data dan, jika seluruh prosedur diulang banyak kali, memuat nilai sejati dengan frekuensi tertentu (di sini 95%).'],
        ['Non-parametrik', 'Tidak mengasumsikan bentuk distribusi populasi.'],
      ],
    },
    misconceptions: {
      en: [
        ['Running more bootstrap iterations makes the confidence interval narrower.', 'No. B only controls how precisely you estimate the interval; its width is set by the sample size n and the spread of the data. To narrow the interval you need more real data.'],
        ['A 95% CI means there is a 95% chance the true mean lies inside this particular interval.', 'The true mean is fixed; it is the interval that varies from sample to sample. 95% refers to how often intervals built this way capture the truth. Press "New random sample" repeatedly and notice that roughly 1 in 20 intervals misses µ.'],
        ['Bootstrapping creates new information out of the same data.', 'It does not. Resampling only reveals how variable the sample already is. A sample that is small, biased or unrepresentative gives a misleading interval no matter how many resamples you run.'],
        ['The bootstrap CI must be centred exactly on the sample mean.', 'Not necessarily. For skewed statistics the percentile interval can be asymmetric, which is one of its advantages over the symmetric ±1.96·SE formula.'],
      ],
      id: [
        ['Menjalankan lebih banyak iterasi bootstrap membuat interval kepercayaan lebih sempit.', 'Tidak. B hanya menentukan seberapa teliti interval itu ditaksir; lebarnya ditentukan oleh ukuran sampel n dan sebaran data. Untuk mempersempit interval kamu perlu lebih banyak data sungguhan.'],
        ['CI 95% berarti ada peluang 95% rata-rata sejati berada di dalam interval yang ini.', 'Rata-rata sejati bersifat tetap; yang berubah dari sampel ke sampel adalah intervalnya. Angka 95% menyatakan seberapa sering interval yang dibuat dengan cara ini menangkap nilai sejati. Tekan "New random sample" berulang kali dan perhatikan sekitar 1 dari 20 interval tidak memuat µ.'],
        ['Bootstrap menciptakan informasi baru dari data yang sama.', 'Tidak. Resampling hanya memperlihatkan seberapa bervariasi sampel yang sudah ada. Sampel yang kecil, bias, atau tidak representatif tetap memberi interval yang menyesatkan berapa pun resampel yang dijalankan.'],
        ['CI bootstrap harus tepat berpusat di rata-rata sampel.', 'Tidak selalu. Untuk statistik yang menjulur, interval persentil bisa tidak simetris, dan itu justru salah satu kelebihannya dibanding rumus ±1,96·SE yang simetris.'],
      ],
    },
    realWorld: {
      en: [
        'Clinical trials report bootstrap confidence intervals for quantities like median survival time, for which no simple formula exists.',
        'Machine-learning practitioners bootstrap a test set to put error bars on a model\'s accuracy instead of quoting a single number.',
        'Ecologists bootstrap a season\'s count data to estimate uncertainty in species-richness or population-density estimates.',
        'Polling and survey analysts use resampling to attach margins of error to complex estimates such as ratios between subgroups.',
      ],
      id: [
        'Uji klinis melaporkan interval kepercayaan bootstrap untuk besaran seperti median waktu bertahan hidup, yang tidak punya rumus sederhana.',
        'Praktisi pembelajaran mesin melakukan bootstrap pada data uji untuk memberi rentang galat pada akurasi model, bukan sekadar satu angka.',
        'Ahli ekologi melakukan bootstrap pada data cacah satu musim untuk menaksir ketakpastian kekayaan spesies atau kepadatan populasi.',
        'Analis survei dan jajak pendapat memakai resampling untuk memberi margin galat pada taksiran yang rumit, misalnya rasio antar-subkelompok.',
      ],
    },
    questions: {
      en: [
        { q: 'You take a sample of n = 100 from a population with σ = 5. What is the standard error of the mean, and roughly what half-width should the 95% CI have?', a: 'SE = σ/√n = 5/10 = 0.5. The 95% half-width is about 1.96 × 0.5 ≈ 1.0, so the interval should span roughly x̄ − 1.0 to x̄ + 1.0. Set σ = 5 and n = 100 in the sim and the bootstrap interval should be about 2 units wide.' },
        { q: 'Why does pressing "Re-bootstrap" barely move the yellow lines, while "New random sample" can move them a lot?', a: '"Re-bootstrap" reuses the same 30 data points; only the random choice of resamples changes, which with B = 2000 is a tiny effect. "New random sample" draws 30 different values from the population, so the sample mean and spread themselves change, and the interval follows them. The first is Monte Carlo noise; the second is real sampling variability.' },
        { q: 'With n = 25 the bootstrap CI is about 1.6 units wide. Approximately how wide will it be with n = 100, and why?', a: 'About 0.8 units. The width scales with 1/√n, and √(100/25) = 2, so quadrupling the sample halves the width. To halve it again you would need n = 400.' },
      ],
      id: [
        { q: 'Kamu mengambil sampel n = 100 dari populasi dengan σ = 5. Berapa galat baku rata-ratanya, dan kira-kira berapa setengah lebar CI 95%-nya?', a: 'SE = σ/√n = 5/10 = 0,5. Setengah lebar 95% sekitar 1,96 × 0,5 ≈ 1,0, jadi intervalnya kira-kira dari x̄ − 1,0 sampai x̄ + 1,0. Atur σ = 5 dan n = 100 di simulasi; interval bootstrap seharusnya selebar sekitar 2 satuan.' },
        { q: 'Mengapa menekan "Re-bootstrap" hampir tidak menggeser garis kuning, sedangkan "New random sample" bisa menggesernya cukup jauh?', a: '"Re-bootstrap" memakai 30 titik data yang sama; yang berubah hanya pilihan acak resampelnya, dan dengan B = 2000 efeknya sangat kecil. "New random sample" menarik 30 nilai baru dari populasi, sehingga rata-rata dan sebaran sampelnya ikut berubah dan intervalnya mengikuti. Yang pertama adalah derau Monte Carlo; yang kedua adalah variabilitas sampling yang sesungguhnya.' },
        { q: 'Dengan n = 25 CI bootstrap lebarnya sekitar 1,6 satuan. Kira-kira berapa lebarnya dengan n = 100, dan mengapa?', a: 'Sekitar 0,8 satuan. Lebarnya sebanding dengan 1/√n, dan √(100/25) = 2, jadi melipatempatkan sampel membagi dua lebarnya. Untuk membaginya dua lagi kamu butuh n = 400.' },
      ],
    },
  },
};
