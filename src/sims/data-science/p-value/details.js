// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Read p-value as the area in the tail beyond the observed statistic.',
      'Distinguish one-tailed vs two-tailed.',
      'See that "p < 0.05" means observed is in the α=0.05 rejection region.',
    ],
    id: [
      'Membaca p-value sebagai luas ekor di luar statistik teramati.',
      'Membedakan satu-arah vs dua-arah.',
      'Melihat bahwa "p < 0,05" berarti teramati di daerah penolakan α=0,05.',
    ],
  },
  tryThis: {
    en: [
      'z = 1.65 (one-tailed) — p ≈ 0.05.',
      'z = 1.96 (two-tailed) — p ≈ 0.05.',
      'z = 3 — p ≈ 0.001 (very strong evidence).',
    ],
    id: [
      'z = 1,65 (satu-arah) — p ≈ 0,05.',
      'z = 1,96 (dua-arah) — p ≈ 0,05.',
      'z = 3 — p ≈ 0,001 (bukti sangat kuat).',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'A hypothesis test starts by assuming the boring explanation. The null hypothesis H₀ says there is no effect: the new drug works no better than the old one, the coin is fair, the two classes have the same average. If H₀ were true, a summary of the data called the test statistic would follow a known probability distribution, the null distribution. Here the statistic is z, the observed result expressed in standard deviations away from what H₀ predicts, and its null distribution is the standard normal bell curve. The p-value answers one precise question: if H₀ were true, what is the probability of getting a statistic at least as extreme as the one observed? A small p-value means the data would be surprising under H₀, which is taken as evidence against it.',
        'Before looking at the data, the experimenter picks a significance level α, usually 0.05, and rejects H₀ if p < α. Equivalently, H₀ is rejected whenever the observed z falls in the rejection region, the outermost part of the null distribution whose total area is α. In the sim the red region is the rejection region and the yellow region is the p-value: drag the observed z and watch the yellow tail shrink as z moves outward. A one-tailed test asks only whether the effect is in one direction, here "greater than", so p is the area to the right of z and the critical value at α = 0.05 is 1.645. A two-tailed test counts a surprise in either direction, so p is the area beyond |z| in both tails, twice the one-tailed value, and the critical value moves out to 1.960. The sim\'s one-tailed option is right-tailed only, so a negative z gives p above 0.5 there.',
        'The p-value is widely misread, so it helps to list what it is not. It is not the probability that H₀ is true, and 1 − p is not the probability that the alternative is true; both are statements about hypotheses, whereas p is a statement about data assuming H₀. Failing to reject H₀ does not prove there is no effect; it may simply mean the study was too small to detect one. And "statistically significant" does not mean large or important: a tiny effect becomes significant with enough data. What α does guarantee is a long-run error rate: if H₀ is true and you test many times at α = 0.05, you will wrongly reject it about 5% of the time, a Type I error.',
        'The sim isolates the geometry of the test and leaves out everything else. It assumes the null distribution is exactly standard normal, which holds for a z-test when the population standard deviation is known or the sample is large; small samples with an estimated standard deviation use the t-distribution, whose heavier tails give larger p-values for the same statistic. There is no data, sample size, effect size or statistical power here, and the slider lets you move α freely, which no real analysis may do after seeing the result. The 0.05 threshold is itself a convention, not a law of nature, and good practice today reports the exact p-value, the effect size and a confidence interval rather than a bare "significant" or "not significant".',
      ],
      id: [
        'Uji hipotesis dimulai dengan mengasumsikan penjelasan yang paling membosankan. Hipotesis nol H₀ menyatakan tidak ada efek: obat baru tidak lebih baik dari yang lama, koinnya seimbang, kedua kelas memiliki rata-rata yang sama. Jika H₀ benar, suatu ringkasan data yang disebut statistik uji akan mengikuti distribusi peluang yang diketahui, yaitu distribusi nol. Di sini statistiknya adalah z, hasil teramati yang dinyatakan dalam banyaknya simpangan baku dari prediksi H₀, dan distribusi nolnya adalah kurva normal baku. P-value menjawab satu pertanyaan yang tepat: jika H₀ benar, berapa peluang mendapatkan statistik yang setidaknya seekstrem yang teramati? P-value yang kecil berarti data itu akan mengejutkan jika H₀ benar, dan ini dianggap sebagai bukti yang melawan H₀.',
        'Sebelum melihat data, peneliti memilih taraf signifikansi α, biasanya 0,05, dan menolak H₀ jika p < α. Setara dengan itu, H₀ ditolak setiap kali z teramati jatuh di daerah penolakan, bagian terluar distribusi nol yang luas totalnya α. Dalam simulasi, daerah merah adalah daerah penolakan dan daerah kuning adalah p-value: geser z teramati dan amati ekor kuning menyusut saat z bergerak ke luar. Uji satu-arah hanya menanyakan apakah efeknya pada satu arah, di sini "lebih besar dari", sehingga p adalah luas di sebelah kanan z dan nilai kritis pada α = 0,05 adalah 1,645. Uji dua-arah menghitung kejutan pada kedua arah, sehingga p adalah luas di luar |z| pada kedua ekor, dua kali nilai satu-arah, dan nilai kritisnya bergeser ke luar menjadi 1,960. Pilihan satu-arah pada simulasi hanya ekor kanan, sehingga z negatif memberi p di atas 0,5 di sana.',
        'P-value sangat sering salah dibaca, jadi berguna untuk mendaftar apa yang bukan p-value. Ia bukan peluang bahwa H₀ benar, dan 1 − p bukan peluang bahwa hipotesis alternatif benar; keduanya pernyataan tentang hipotesis, sedangkan p adalah pernyataan tentang data dengan mengasumsikan H₀. Gagal menolak H₀ tidak membuktikan tidak ada efek; mungkin saja penelitiannya terlalu kecil untuk mendeteksinya. Dan "signifikan secara statistik" tidak berarti besar atau penting: efek yang sangat kecil pun menjadi signifikan jika datanya cukup banyak. Yang dijamin α adalah laju kesalahan jangka panjang: jika H₀ benar dan Anda menguji berkali-kali pada α = 0,05, Anda akan salah menolaknya sekitar 5% dari waktu, yaitu kesalahan Tipe I.',
        'Simulasi ini mengisolasi geometri pengujian dan mengesampingkan hal lainnya. Ia mengasumsikan distribusi nol tepat normal baku, yang berlaku untuk uji z ketika simpangan baku populasi diketahui atau sampelnya besar; sampel kecil dengan simpangan baku yang ditaksir memakai distribusi t, yang ekornya lebih tebal sehingga memberi p-value lebih besar untuk statistik yang sama. Tidak ada data, ukuran sampel, ukuran efek, atau kuasa statistik di sini, dan slider membolehkan Anda menggeser α dengan bebas, yang tidak boleh dilakukan analisis sungguhan setelah melihat hasil. Ambang 0,05 itu sendiri adalah kesepakatan, bukan hukum alam, dan praktik yang baik saat ini melaporkan p-value yang tepat, ukuran efek, dan selang kepercayaan, bukan sekadar "signifikan" atau "tidak signifikan".',
      ],
    },
    figure: {
      caption: {
        en: 'The standard normal null distribution for a right-tailed test. The shaded tail beyond the observed z = 2.0 is the p-value (about 0.023). The dashed line at z = 1.645 marks the α = 0.05 critical value; everything to its right is the rejection region, so this result is significant. A two-tailed test would also count the mirror-image tail on the left, doubling p.',
        id: 'Distribusi nol normal baku untuk uji ekor kanan. Ekor berbayang di luar z teramati = 2,0 adalah p-value (sekitar 0,023). Garis putus-putus pada z = 1,645 menandai nilai kritis α = 0,05; semua di sebelah kanannya adalah daerah penolakan, sehingga hasil ini signifikan. Uji dua-arah juga akan menghitung ekor cermin di kiri, menggandakan p.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        const pdf = (z) => Math.exp(-0.5 * z * z) / Math.sqrt(2 * Math.PI);
        const X = (z) => 30 + ((z + 4) / 8) * 300;
        const Y = (p) => 170 - (p / 0.4) * 130;
        const pts = (a, b) => { const o = []; for (let i = 0; i <= 60; i++) { const z = a + (i / 60) * (b - a); o.push(`${X(z).toFixed(1)},${Y(pdf(z)).toFixed(1)}`); } return o.join(' '); };
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Null distribution with the p-value tail and the rejection region', 'Distribusi nol dengan ekor p-value dan daerah penolakan')}">
  <style>text{font:12px system-ui,sans-serif;fill:currentColor}.s{font-size:10px}.ax{stroke:currentColor;stroke-width:1;opacity:.5}</style>
  <text x="30" y="20" font-weight="700">${L('Null distribution of z if H₀ is true', 'Distribusi nol z jika H₀ benar')}</text>
  <polygon points="${X(1.645).toFixed(1)},170 ${pts(1.645, 4)} ${X(4).toFixed(1)},170" fill="#ef4444" opacity=".18"/>
  <polygon points="${X(2).toFixed(1)},170 ${pts(2, 4)} ${X(4).toFixed(1)},170" fill="#f59e0b" opacity=".6"/>
  <polyline points="${pts(-4, 4)}" fill="none" stroke="#3b82f6" stroke-width="2"/>
  <line x1="30" y1="170" x2="330" y2="170" class="ax"/>
  ${[-3, -2, -1, 0, 1, 2, 3].map((z) => `<line x1="${X(z)}" y1="170" x2="${X(z)}" y2="175" class="ax"/><text x="${X(z)}" y="188" text-anchor="middle" class="s" opacity=".7">${z}</text>`).join('')}
  <text x="330" y="188" text-anchor="end" class="s" opacity=".7">z</text>
  <line x1="${X(1.645).toFixed(1)}" y1="60" x2="${X(1.645).toFixed(1)}" y2="170" stroke="#ef4444" stroke-width="1.2" stroke-dasharray="4 3"/>
  <text x="${X(1.645).toFixed(1)}" y="52" text-anchor="middle" fill="#ef4444" class="s">${L('critical z = 1.645', 'z kritis = 1,645')}</text>
  <text x="${X(1.645).toFixed(1)}" y="40" text-anchor="middle" fill="#ef4444" class="s">${L('(α = 0.05, right tail)', '(α = 0,05, ekor kanan)')}</text>
  <circle cx="${X(2).toFixed(1)}" cy="${Y(pdf(2)).toFixed(1)}" r="5" fill="#f59e0b" stroke="currentColor" stroke-width="1"/>
  <line x1="${X(2).toFixed(1)}" y1="${Y(pdf(2)).toFixed(1)}" x2="${X(2).toFixed(1)}" y2="170" stroke="#f59e0b" stroke-width="1.2"/>
  <text x="${(X(2) + 6).toFixed(1)}" y="${(Y(pdf(2)) - 2).toFixed(1)}" fill="#f59e0b" class="s" font-weight="700">${L('observed z = 2.0', 'z teramati = 2,0')}</text>
  <line x1="${X(2.9).toFixed(1)}" y1="140" x2="${X(2.4).toFixed(1)}" y2="162" stroke="#f59e0b" stroke-width="1"/>
  <text x="${X(2.9).toFixed(1)}" y="136" text-anchor="middle" fill="#f59e0b" class="s">${L('p = area beyond z ≈ 0.023', 'p = luas di luar z ≈ 0,023')}</text>
  <text x="30" y="212" class="s">${L('p (0.023) < α (0.05): the observed z lies inside the rejection region, so reject H₀.', 'p (0,023) < α (0,05): z teramati berada di dalam daerah penolakan, jadi tolak H₀.')}</text>
  <text x="30" y="230" class="s" opacity=".7">${L('Two-tailed: shade both tails beyond ±2.0, p ≈ 0.046, critical z = ±1.960.', 'Dua-arah: bayangi kedua ekor di luar ±2,0, p ≈ 0,046, z kritis = ±1,960.')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'The p-value is the probability, assuming the null hypothesis is true, of a test statistic at least as extreme as the one observed: the area in the tail beyond z.',
        'Rejecting H₀ when p < α is the same as the observed statistic falling in the rejection region, whose total area is α.',
        'A two-tailed test counts surprises in both directions, so its p-value is twice the one-tailed value and its critical value is further out (1.960 instead of 1.645 at α = 0.05).',
        'The p-value is not the probability that H₀ is true, and a non-significant result is not proof of no effect.',
        'α is the long-run rate of false rejections when H₀ is true; it must be chosen before the data are seen.',
      ],
      id: [
        'P-value adalah peluang, dengan mengasumsikan hipotesis nol benar, mendapatkan statistik uji yang setidaknya seekstrem yang teramati: luas ekor di luar z.',
        'Menolak H₀ ketika p < α sama dengan statistik teramati jatuh di daerah penolakan, yang luas totalnya α.',
        'Uji dua-arah menghitung kejutan pada kedua arah, sehingga p-value-nya dua kali nilai satu-arah dan nilai kritisnya lebih jauh ke luar (1,960 alih-alih 1,645 pada α = 0,05).',
        'P-value bukan peluang bahwa H₀ benar, dan hasil yang tidak signifikan bukan bukti tidak adanya efek.',
        'α adalah laju penolakan keliru jangka panjang ketika H₀ benar; α harus dipilih sebelum data dilihat.',
      ],
    },
    vocabulary: {
      en: [
        ['Null hypothesis (H₀)', 'The default claim of no effect or no difference that the test tries to find evidence against.'],
        ['Test statistic', 'A single number computed from the data; here z, the result in standard deviations from what H₀ predicts.'],
        ['Null distribution', 'The probability distribution the test statistic would follow if H₀ were true; here the standard normal.'],
        ['p-value', 'The probability under H₀ of a statistic at least as extreme as the observed one.'],
        ['Significance level (α)', 'The threshold chosen in advance; H₀ is rejected when p < α.'],
        ['Rejection region', 'The set of statistic values, of total probability α under H₀, that lead to rejecting H₀.'],
        ['Critical value', 'The boundary of the rejection region, such as z = 1.645 (one-tailed) or ±1.960 (two-tailed) at α = 0.05.'],
        ['Type I error', 'Rejecting H₀ when it is actually true; its probability is α.'],
      ],
      id: [
        ['Hipotesis nol (H₀)', 'Klaim awal tidak ada efek atau tidak ada perbedaan yang berusaha dibantah oleh pengujian.'],
        ['Statistik uji', 'Satu bilangan yang dihitung dari data; di sini z, hasil dalam satuan simpangan baku dari prediksi H₀.'],
        ['Distribusi nol', 'Distribusi peluang yang akan diikuti statistik uji jika H₀ benar; di sini normal baku.'],
        ['P-value', 'Peluang di bawah H₀ mendapatkan statistik yang setidaknya seekstrem yang teramati.'],
        ['Taraf signifikansi (α)', 'Ambang yang dipilih sebelumnya; H₀ ditolak ketika p < α.'],
        ['Daerah penolakan', 'Himpunan nilai statistik, dengan peluang total α di bawah H₀, yang membuat H₀ ditolak.'],
        ['Nilai kritis', 'Batas daerah penolakan, misalnya z = 1,645 (satu-arah) atau ±1,960 (dua-arah) pada α = 0,05.'],
        ['Kesalahan Tipe I', 'Menolak H₀ padahal sebenarnya benar; peluangnya adalah α.'],
      ],
    },
    misconceptions: {
      en: [
        ['p = 0.03 means there is a 3% chance the null hypothesis is true.', 'No. The p-value assumes H₀ is true and asks how surprising the data are. It is a probability about data, not about hypotheses; turning it into a probability for H₀ requires extra information the test does not have.'],
        ['p = 0.20 proves there is no effect.', 'Failing to reject H₀ only means the data are compatible with no effect. The study may have been too small to detect a real effect; absence of evidence is not evidence of absence.'],
        ['A result with p < 0.05 is important, and one with p = 0.06 is worthless.', 'Significance depends on sample size as well as effect size: a trivial effect reaches p < 0.05 with enough data, and a large effect may miss it with little data. There is nothing special about 0.05, and 0.049 versus 0.051 is almost no difference in evidence.'],
        ['You can choose one-tailed after seeing which direction the result went.', 'That silently halves the p-value and doubles the Type I error rate. The direction, like α, must be fixed before looking at the data; otherwise a two-tailed test is the honest choice.'],
      ],
      id: [
        ['p = 0,03 berarti ada peluang 3% bahwa hipotesis nol benar.', 'Tidak. P-value mengasumsikan H₀ benar dan menanyakan seberapa mengejutkan datanya. Ia peluang tentang data, bukan tentang hipotesis; mengubahnya menjadi peluang untuk H₀ membutuhkan informasi tambahan yang tidak dimiliki pengujian.'],
        ['p = 0,20 membuktikan tidak ada efek.', 'Gagal menolak H₀ hanya berarti data sejalan dengan tidak adanya efek. Penelitiannya mungkin terlalu kecil untuk mendeteksi efek yang nyata; tidak adanya bukti bukanlah bukti ketiadaan.'],
        ['Hasil dengan p < 0,05 itu penting, dan hasil dengan p = 0,06 tidak bernilai.', 'Signifikansi bergantung pada ukuran sampel maupun ukuran efek: efek yang remeh mencapai p < 0,05 jika datanya cukup banyak, dan efek yang besar bisa melewatkannya jika datanya sedikit. Tidak ada yang istimewa pada 0,05, dan 0,049 berbanding 0,051 hampir tidak berbeda sebagai bukti.'],
        ['Kita boleh memilih satu-arah setelah melihat ke arah mana hasilnya.', 'Itu diam-diam membagi dua p-value dan menggandakan laju kesalahan Tipe I. Arahnya, seperti α, harus ditetapkan sebelum melihat data; jika tidak, uji dua-arah adalah pilihan yang jujur.'],
      ],
    },
    realWorld: {
      en: [
        'Drug regulators require clinical trials to pre-register their hypotheses, α and one- or two-tailed choice before any patient is enrolled, precisely to prevent moving the threshold after the fact.',
        'In particle physics the Higgs boson discovery was announced only at the "five sigma" level, z ≈ 5, a one-tailed p-value of about 3 in 10 million, because so many searches are run that 0.05 would produce false discoveries constantly.',
        'Website A/B tests compare two page designs with a z-test on conversion rates; checking the p-value repeatedly and stopping as soon as it dips below 0.05 inflates the false-positive rate, a common mistake.',
        'The reproducibility crisis in psychology and medicine is partly a story of p-values: many published findings with p just under 0.05 failed to replicate, prompting calls to report effect sizes and confidence intervals.',
      ],
      id: [
        'Regulator obat mewajibkan uji klinis mendaftarkan hipotesis, α, dan pilihan satu- atau dua-arahnya sebelum pasien pertama direkrut, justru untuk mencegah pemindahan ambang setelah hasil diketahui.',
        'Dalam fisika partikel penemuan boson Higgs diumumkan hanya pada taraf "lima sigma", z ≈ 5, p-value satu-arah sekitar 3 dalam 10 juta, karena begitu banyak pencarian dijalankan sehingga 0,05 akan terus-menerus menghasilkan penemuan palsu.',
        'Uji A/B pada situs web membandingkan dua rancangan halaman dengan uji z pada laju konversi; memeriksa p-value berulang kali dan berhenti begitu turun di bawah 0,05 menggelembungkan laju positif palsu, kesalahan yang umum.',
        'Krisis reproduksibilitas dalam psikologi dan kedokteran sebagian adalah kisah tentang p-value: banyak temuan terbit dengan p tepat di bawah 0,05 yang gagal direplikasi, mendorong seruan untuk melaporkan ukuran efek dan selang kepercayaan.',
      ],
    },
    questions: {
      en: [
        { q: 'A study reports z = 2.2. Find the one-tailed and two-tailed p-values (use Φ(2.2) ≈ 0.9861) and state the decision at α = 0.05 in each case.', a: 'One-tailed: p = 1 − Φ(2.2) ≈ 0.0139. Two-tailed: p = 2 × 0.0139 ≈ 0.0278. Both are below 0.05, so H₀ is rejected either way; equivalently, 2.2 exceeds both critical values, 1.645 and 1.960.' },
        { q: 'Another study reports z = 1.8 (Φ(1.8) ≈ 0.9641). Show that the conclusion at α = 0.05 depends on whether the test is one- or two-tailed, and explain why the choice must be made in advance.', a: 'One-tailed: p ≈ 0.0359 < 0.05, reject H₀. Two-tailed: p ≈ 0.0718 > 0.05, fail to reject. Since 1.8 lies between 1.645 and 1.960, the verdict flips with the tail choice. If a researcher could pick the tail after seeing the data, they could always choose the one that gives significance, which would double the real false-positive rate.' },
        { q: 'In the sim, set α to 0.01 with a two-tailed test. Roughly where does the critical value move, and what does this say about the trade-off in choosing α?', a: 'The rejection region shrinks to 0.005 in each tail and the critical value moves out to about ±2.576. A smaller α means fewer false rejections of a true H₀ (Type I errors) but also makes it harder to detect a real effect, raising the chance of missing one (a Type II error). Choosing α is a trade-off between the two kinds of mistake.' },
      ],
      id: [
        { q: 'Sebuah penelitian melaporkan z = 2,2. Tentukan p-value satu-arah dan dua-arah (gunakan Φ(2,2) ≈ 0,9861) dan nyatakan keputusannya pada α = 0,05 untuk masing-masing.', a: 'Satu-arah: p = 1 − Φ(2,2) ≈ 0,0139. Dua-arah: p = 2 × 0,0139 ≈ 0,0278. Keduanya di bawah 0,05, sehingga H₀ ditolak pada kedua kasus; setara dengan itu, 2,2 melebihi kedua nilai kritis, 1,645 dan 1,960.' },
        { q: 'Penelitian lain melaporkan z = 1,8 (Φ(1,8) ≈ 0,9641). Tunjukkan bahwa kesimpulan pada α = 0,05 bergantung pada satu- atau dua-arahnya pengujian, dan jelaskan mengapa pilihan itu harus dibuat sebelumnya.', a: 'Satu-arah: p ≈ 0,0359 < 0,05, tolak H₀. Dua-arah: p ≈ 0,0718 > 0,05, gagal menolak. Karena 1,8 berada di antara 1,645 dan 1,960, keputusannya berbalik tergantung pilihan ekor. Jika peneliti boleh memilih ekor setelah melihat data, ia selalu bisa memilih yang memberi signifikansi, yang akan menggandakan laju positif palsu sesungguhnya.' },
        { q: 'Dalam simulasi, atur α ke 0,01 dengan uji dua-arah. Kira-kira ke mana nilai kritis bergeser, dan apa artinya bagi pertimbangan dalam memilih α?', a: 'Daerah penolakan menyusut menjadi 0,005 pada tiap ekor dan nilai kritis bergeser ke luar menjadi sekitar ±2,576. α yang lebih kecil berarti lebih sedikit penolakan keliru terhadap H₀ yang benar (kesalahan Tipe I) tetapi juga mempersulit pendeteksian efek yang nyata, menaikkan peluang melewatkannya (kesalahan Tipe II). Memilih α adalah pertukaran antara kedua jenis kesalahan itu.' },
      ],
    },
  },
};
