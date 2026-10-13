// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Recognize that aggregating groups can reverse a relationship.',
      'Identify a confounding variable from the cluster shape.',
      'Argue why "always look at subgroups" is statistical hygiene.',
    ],
    id: [
      'Mengenali bahwa menggabungkan kelompok bisa membalik hubungan.',
      'Mengenali variabel pengganggu dari bentuk klaster.',
      'Berargumen mengapa "selalu lihat subkelompok" itu kebersihan statistik.',
    ],
  },
  tryThis: {
    en: [
      'Drag a group higher — does the global slope flip?',
      'Set all groups on top of each other — paradox vanishes?',
      'Spread groups along a diagonal — see classic Simpson reversal.',
    ],
    id: [
      'Geser satu kelompok lebih tinggi — apakah kemiringan global terbalik?',
      'Tumpuk semua kelompok di tempat yang sama — paradoks hilang?',
      'Sebarkan kelompok di sepanjang diagonal — saksikan pembalikan Simpson klasik.',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'Simpson\'s paradox is the situation where a relationship that holds inside every subgroup of a data set reverses when the subgroups are pooled together. Within each group, more x goes with more y; in the combined data, more x goes with less y. Nothing is wrong with the arithmetic. The reversal happens because a third variable, the group membership, is associated with both x and y at the same time: groups with high x happen to be groups with low y. Such a variable is called a confounder or lurking variable, and pooling the data lets it masquerade as a relationship between x and y.',
        'The simulation builds three groups (red, blue, green) of n points each. Every group has a centre you can drag, and inside each group the points follow the same within-group slope plus random scatter set by the spread slider. The coloured lines are least-squares fits inside each group; the dashed yellow line is the fit to all points together, ignoring colour. The readout shows all four slopes and flags a "Simpson reversal" when the sign of the pooled slope differs from the sign of the average within-group slope (and the pooled slope is not essentially zero).',
        'The pooled slope is a blend of two things: how y changes with x inside the groups, and how the group centres are arranged relative to each other. It is a weighted compromise between the within-group covariance and the between-centre covariance. Place the centres along a downward diagonal and the between-centre trend is strongly negative; if the centres are far apart compared with the spread, that trend dominates and the pooled slope turns negative even though every group slopes upward. Stack the centres and the between-centre part vanishes, so the pooled slope equals the within-group slope. Increasing the spread grows the within-group part and pulls the pooled line back toward the group lines.',
        'The sim cannot tell you which slope is the "right" one, and neither can any statistic. If group membership is a confounder, such as patient severity when comparing hospitals, the within-group answer is the honest one. If instead group membership is itself caused by x, the pooled answer may be what you want. Deciding requires knowing the causal story behind the data. The model is also simplified: all groups share one slope and one size, the scatter is Gaussian, and real data sets rarely divide into such clean clusters.',
      ],
      id: [
        'Paradoks Simpson adalah keadaan ketika sebuah hubungan yang berlaku di dalam setiap subkelompok data berbalik saat subkelompok-subkelompok itu digabungkan. Di dalam setiap kelompok, x yang lebih besar bersanding dengan y yang lebih besar; pada data gabungan, x yang lebih besar bersanding dengan y yang lebih kecil. Tidak ada yang salah dengan hitungannya. Pembalikan terjadi karena ada variabel ketiga, yaitu keanggotaan kelompok, yang berkaitan dengan x dan y sekaligus: kelompok dengan x tinggi kebetulan adalah kelompok dengan y rendah. Variabel seperti itu disebut variabel pengganggu (confounder), dan menggabungkan data membiarkannya menyamar sebagai hubungan antara x dan y.',
        'Simulasi ini membangun tiga kelompok (merah, biru, hijau) yang masing-masing berisi n titik. Setiap kelompok memiliki pusat yang bisa diseret, dan di dalam setiap kelompok titik-titiknya mengikuti kemiringan dalam-kelompok yang sama ditambah sebaran acak yang diatur oleh slider spread. Garis berwarna adalah fit kuadrat terkecil di dalam tiap kelompok; garis putus-putus kuning adalah fit untuk semua titik sekaligus tanpa memandang warna. Panel informasi menampilkan keempat kemiringan dan menandai "Simpson reversal" ketika tanda kemiringan gabungan berbeda dari tanda rata-rata kemiringan dalam-kelompok (dan kemiringan gabungannya tidak nyaris nol).',
        'Kemiringan gabungan adalah campuran dua hal: bagaimana y berubah terhadap x di dalam kelompok, dan bagaimana pusat-pusat kelompok tersusun satu terhadap yang lain. Ia adalah kompromi berbobot antara kovarians dalam-kelompok dan kovarians antar-pusat. Letakkan pusat-pusat di sepanjang diagonal yang menurun, maka tren antar-pusat sangat negatif; jika pusat-pusatnya berjauhan dibandingkan sebarannya, tren itu mendominasi dan kemiringan gabungan menjadi negatif meskipun setiap kelompok menanjak. Tumpuk pusat-pusatnya, maka bagian antar-pusat hilang dan kemiringan gabungan sama dengan kemiringan dalam-kelompok. Memperbesar sebaran memperbesar bagian dalam-kelompok dan menarik garis gabungan kembali mendekati garis-garis kelompok.',
        'Simulasi tidak bisa memberi tahu kemiringan mana yang "benar", dan statistik mana pun juga tidak bisa. Jika keanggotaan kelompok adalah pengganggu, misalnya tingkat keparahan pasien saat membandingkan rumah sakit, jawaban dalam-kelompok adalah yang jujur. Jika sebaliknya keanggotaan kelompok justru disebabkan oleh x, jawaban gabungan mungkin yang kamu inginkan. Memutuskannya butuh pengetahuan tentang cerita sebab-akibat di balik data. Modelnya juga disederhanakan: semua kelompok berbagi satu kemiringan dan satu ukuran, sebarannya Gaussian, dan data sungguhan jarang terbagi menjadi klaster yang serapi ini.',
      ],
    },
    figure: {
      caption: {
        en: 'Three groups, each with a positive within-group slope (solid lines). Because the group centres descend from left to right, the pooled fit (dashed) slopes downward: the sign flips.',
        id: 'Tiga kelompok, masing-masing dengan kemiringan dalam-kelompok positif (garis penuh). Karena pusat kelompok menurun dari kiri ke kanan, fit gabungan (putus-putus) menurun: tandanya terbalik.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        let seed = 7;
        const rnd = () => { seed = (seed * 1103515245 + 12345) % 2147483648; return seed / 2147483648 - 0.5; };
        const X = (x) => 30 + (x / 12) * 300, Y = (y) => 200 - (y / 12) * 180;
        const centres = [[2, 9], [6, 6], [10, 3]], cols = ['#ef4444', '#3b82f6', '#10b981'];
        const fit = (p) => { const n = p.length; let mx = 0, my = 0; for (const [x, y] of p) { mx += x / n; my += y / n; } let c = 0, v = 0; for (const [x, y] of p) { c += (x - mx) * (y - my); v += (x - mx) ** 2; } const m = c / v; return { m, b: my - m * mx }; };
        const line = (f, x1, x2, col, dash) => `<line x1="${X(x1).toFixed(1)}" y1="${Y(f.b + f.m * x1).toFixed(1)}" x2="${X(x2).toFixed(1)}" y2="${Y(f.b + f.m * x2).toFixed(1)}" stroke="${col}" stroke-width="2.2"${dash ? ' stroke-dasharray="6 4"' : ''}/>`;
        const all = []; let body = '';
        centres.forEach(([cx, cy], g) => {
          const pts = [];
          for (let i = 0; i < 14; i++) { const x = cx + rnd() * 2.4; const y = cy + 0.6 * (x - cx) + rnd() * 1.2; pts.push([x, y]); all.push([x, y]); }
          body += pts.map(([x, y]) => `<circle cx="${X(x).toFixed(1)}" cy="${Y(y).toFixed(1)}" r="3" fill="${cols[g]}"/>`).join('');
          body += line(fit(pts), cx - 1.8, cx + 1.8, cols[g], false);
        });
        const agg = fit(all);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Three groups with positive slopes and a negative pooled slope', 'Tiga kelompok berkemiringan positif dengan kemiringan gabungan negatif')}">
  <style>text{font:12px system-ui,sans-serif;fill:currentColor}.m{fill:none;stroke:currentColor;stroke-width:1.2;opacity:.5}.s{font-size:10px}.b{font-weight:600}</style>
  <rect x="30" y="20" width="300" height="180" class="m"/>
  ${body}
  ${line(agg, 0.5, 11.5, '#f59e0b', true)}
  <text x="150" y="216" class="s">x</text>
  <text x="14" y="112" class="s">y</text>
  <text x="40" y="36" class="b">${L('within each group: slope +0.6', 'di dalam tiap kelompok: kemiringan +0,6')}</text>
  <text x="170" y="190" class="b" fill="#f59e0b">${L('all together: slope', 'semua digabung: kemiringan')} ${agg.m.toFixed(1).replace('.', lang === 'id' ? ',' : '.')}</text>
  <text x="40" y="232" class="s">${L('Group membership is linked to both x and y: a confounder.', 'Keanggotaan kelompok terkait dengan x dan y sekaligus: variabel pengganggu.')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'A trend that holds within every subgroup can reverse when the subgroups are pooled.',
        'The reversal needs a third variable linked to both x and y; here it is group membership, and the arrangement of the group centres creates the opposite trend.',
        'The pooled slope is a weighted blend of the within-group slope and the slope through the group centres.',
        'Stacking the groups, or spreading the points far more than the centres, makes the paradox disappear.',
        'Which slope to trust depends on the causal story, not on the numbers: statistics alone cannot decide.',
      ],
      id: [
        'Tren yang berlaku di dalam setiap subkelompok bisa berbalik saat subkelompok-subkelompok itu digabung.',
        'Pembalikan membutuhkan variabel ketiga yang terkait dengan x dan y; di sini keanggotaan kelompok, dan susunan pusat-pusat kelompok menciptakan tren yang berlawanan.',
        'Kemiringan gabungan adalah campuran berbobot antara kemiringan dalam-kelompok dan kemiringan yang melalui pusat-pusat kelompok.',
        'Menumpuk kelompok, atau menyebarkan titik jauh lebih lebar daripada jarak pusat-pusatnya, membuat paradoks hilang.',
        'Kemiringan mana yang dipercaya bergantung pada cerita sebab-akibat, bukan pada angkanya: statistik saja tidak bisa memutuskan.',
      ],
    },
    vocabulary: {
      en: [
        ['Simpson\'s paradox', 'A reversal of a trend or association when data from several groups are combined.'],
        ['Confounding (lurking) variable', 'A variable associated with both x and y that creates or hides an apparent relationship between them.'],
        ['Aggregate (pooled) data', 'All observations combined into one data set, ignoring the groups they came from.'],
        ['Within-group slope', 'The regression slope computed using only the points from one group.'],
        ['Stratification', 'Splitting data into subgroups (strata) and analysing each separately, the standard defence against confounding.'],
        ['Regression slope', 'The change in y per unit change in x along the least-squares line.'],
        ['Causal structure', 'The real-world story of what influences what; it decides whether the pooled or the within-group analysis answers your question.'],
      ],
      id: [
        ['Paradoks Simpson', 'Pembalikan tren atau asosiasi ketika data dari beberapa kelompok digabungkan.'],
        ['Variabel pengganggu (confounder)', 'Variabel yang terkait dengan x dan y sekaligus sehingga menciptakan atau menyembunyikan hubungan semu di antara keduanya.'],
        ['Data gabungan (agregat)', 'Semua pengamatan digabung menjadi satu kumpulan data tanpa memandang kelompok asalnya.'],
        ['Kemiringan dalam-kelompok', 'Kemiringan regresi yang dihitung hanya dari titik-titik satu kelompok.'],
        ['Stratifikasi', 'Membagi data ke dalam subkelompok (strata) dan menganalisis masing-masing secara terpisah, pertahanan baku terhadap variabel pengganggu.'],
        ['Kemiringan regresi', 'Perubahan y per satuan perubahan x di sepanjang garis kuadrat terkecil.'],
        ['Struktur sebab-akibat', 'Cerita nyata tentang apa yang memengaruhi apa; ia menentukan apakah analisis gabungan atau dalam-kelompok yang menjawab pertanyaanmu.'],
      ],
    },
    misconceptions: {
      en: [
        ['The pooled result is more reliable because it uses more data.', 'More data reduces random error, but Simpson\'s paradox is not random error. Pooling mixes in the between-group trend, which can be a confounder\'s signature rather than a real relationship between x and y.'],
        ['The within-group result is always the correct one.', 'Not always. If the grouping variable is itself a consequence of x (a mediator), splitting by it removes part of the real effect. Which analysis is right depends on the causal story.'],
        ['Simpson\'s paradox is a rare mathematical curiosity.', 'It appears regularly in medicine, education and economics whenever groups differ in both the treatment and the outcome, which is why analysts routinely check subgroups.'],
      ],
      id: [
        ['Hasil gabungan lebih andal karena memakai lebih banyak data.', 'Lebih banyak data mengurangi galat acak, tetapi paradoks Simpson bukan galat acak. Menggabungkan data mencampurkan tren antar-kelompok, yang bisa merupakan jejak variabel pengganggu dan bukan hubungan nyata antara x dan y.'],
        ['Hasil dalam-kelompok selalu yang benar.', 'Tidak selalu. Jika variabel pengelompokan justru akibat dari x (sebuah mediator), memisahkan data menurutnya membuang sebagian efek yang nyata. Analisis mana yang benar bergantung pada cerita sebab-akibatnya.'],
        ['Paradoks Simpson hanyalah keanehan matematika yang langka.', 'Ia muncul rutin di kedokteran, pendidikan, dan ekonomi setiap kali kelompok-kelompok berbeda dalam perlakuan dan hasilnya sekaligus; itulah sebabnya analis rutin memeriksa subkelompok.'],
      ],
    },
    realWorld: {
      en: [
        'A 1973 study of graduate admissions at the University of California, Berkeley found women were admitted at a lower rate overall, yet within most individual departments their rate was equal or higher; women had applied more to the departments that were hardest to get into.',
        'A classic kidney-stone comparison showed one treatment with a better overall success rate, while the other treatment did better for both small and large stones separately, because it had been used on the harder, large-stone cases more often.',
        'A hospital that accepts the sickest patients can have a higher overall death rate than a small clinic while doing better in every severity category.',
        'When comparing countries\' vaccination data, pooling all ages can show a misleading pattern because older people are both more likely to be vaccinated and more likely to fall seriously ill; age-stratified figures tell the real story.',
      ],
      id: [
        'Studi tahun 1973 tentang penerimaan program pascasarjana di University of California, Berkeley menemukan perempuan diterima dengan laju lebih rendah secara keseluruhan, tetapi di sebagian besar departemen laju mereka setara atau lebih tinggi; perempuan lebih banyak mendaftar ke departemen yang paling sulit dimasuki.',
        'Perbandingan klasik pengobatan batu ginjal menunjukkan satu pengobatan dengan tingkat keberhasilan keseluruhan lebih baik, padahal pengobatan lainnya lebih baik untuk batu kecil maupun batu besar secara terpisah, karena lebih sering dipakai pada kasus batu besar yang lebih sulit.',
        'Rumah sakit yang menerima pasien paling parah bisa memiliki angka kematian keseluruhan lebih tinggi daripada klinik kecil, meskipun lebih baik di setiap kategori keparahan.',
        'Saat membandingkan data vaksinasi antarnegara, menggabungkan semua usia bisa menampilkan pola yang menyesatkan karena orang lanjut usia lebih mungkin divaksin sekaligus lebih mungkin sakit parah; angka yang dipisah menurut usia menunjukkan cerita sebenarnya.',
      ],
    },
    questions: {
      en: [
        { q: 'Two groups have centres at (2, 8) and (8, 2). Inside each group the slope is +0.6 and the spread is tiny. Estimate the pooled slope and explain its sign.', a: 'The line through the centres has slope (2 − 8) / (8 − 2) = −1. With almost no within-group spread, the pooled fit is dominated by the centres, so the pooled slope is close to −1: negative, even though both groups slope upward at +0.6.' },
        { q: 'Press "Stack groups" so all three centres coincide. Why does the reversal disappear even though nothing about the within-group slope changed?', a: 'With the centres on top of each other there is no between-group trend to blend in: group membership is no longer associated with x or y, so it is no longer a confounder. The pooled fit then sees one big cloud with the same slope as each group.' },
        { q: 'Hospital A has a higher overall death rate than hospital B, but a lower death rate for mild cases and a lower death rate for severe cases. Which hospital would you choose, and what is the confounder?', a: 'Hospital A. Severity is the confounder: A treats a larger share of severe patients, who die more often everywhere, which inflates its overall rate. Within each severity group, which is the comparison that matters to a patient, A does better.' },
      ],
      id: [
        { q: 'Dua kelompok berpusat di (2, 8) dan (8, 2). Di dalam tiap kelompok kemiringannya +0,6 dan sebarannya sangat kecil. Perkirakan kemiringan gabungan dan jelaskan tandanya.', a: 'Garis yang melalui kedua pusat berkemiringan (2 − 8) / (8 − 2) = −1. Dengan sebaran dalam-kelompok yang hampir nol, fit gabungan didominasi oleh pusat-pusatnya, sehingga kemiringan gabungan mendekati −1: negatif, meskipun kedua kelompok menanjak dengan +0,6.' },
        { q: 'Tekan "Stack groups" sehingga ketiga pusat berimpit. Mengapa pembalikan hilang padahal kemiringan dalam-kelompok tidak berubah?', a: 'Dengan pusat-pusat yang saling menumpuk tidak ada tren antar-kelompok yang ikut tercampur: keanggotaan kelompok tidak lagi terkait dengan x maupun y, sehingga bukan lagi pengganggu. Fit gabungan lalu melihat satu awan besar dengan kemiringan yang sama seperti tiap kelompok.' },
        { q: 'Rumah sakit A memiliki angka kematian keseluruhan lebih tinggi daripada rumah sakit B, tetapi angka kematian lebih rendah untuk kasus ringan dan juga lebih rendah untuk kasus parah. Rumah sakit mana yang kamu pilih, dan apa variabel pengganggunya?', a: 'Rumah sakit A. Tingkat keparahan adalah pengganggunya: A merawat lebih banyak pasien parah, yang di mana pun lebih sering meninggal, sehingga angka keseluruhannya membengkak. Di dalam tiap kelompok keparahan, yaitu perbandingan yang penting bagi pasien, A lebih baik.' },
      ],
    },
  },
};
