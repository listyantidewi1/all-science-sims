// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Define accuracy, precision, recall, and F1.',
      'Read a ROC curve and the meaning of AUC.',
      'See why the same classifier needs different thresholds in different applications.',
    ],
    id: [
      'Mendefinisikan akurasi, presisi, recall, dan F1.',
      'Membaca kurva ROC dan arti AUC.',
      'Melihat mengapa pengklasifikasi yang sama memerlukan ambang berbeda untuk aplikasi berbeda.',
    ],
  },
  tryThis: {
    en: [
      'Move the threshold low — high recall, low precision.',
      'Increase class overlap — what happens to AUC?',
      'Pick a threshold that maximizes F1.',
    ],
    id: [
      'Geser ambang rendah — recall tinggi, presisi rendah.',
      'Naikkan tumpang tindih kelas — apa yang terjadi pada AUC?',
      'Pilih ambang yang memaksimalkan F1.',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'Most classifiers do not output a yes or no directly. They output a score, and a threshold turns the score into a decision: score at or above the threshold means "positive". Comparing those decisions with the truth gives four counts, arranged in a confusion matrix: true positives (TP), false positives (FP), false negatives (FN) and true negatives (TN). Every popular metric is a ratio of these counts. Accuracy = (TP + TN) / all; precision = TP / (TP + FP), the share of flagged items that really are positive; recall (also called sensitivity or true positive rate, TPR) = TP / (TP + FN), the share of real positives that were caught; and the false positive rate FPR = FP / (FP + TN). F1 = 2·precision·recall / (precision + recall) is the harmonic mean, which is only high when both are high.',
        'The simulation draws 400 scores from two normal distributions with the same spread σ: negatives (blue) centred at 0.5 − separation/2 and positives (red) at 0.5 + separation/2. The white line is the threshold, and everything to its right is called positive. On the left histogram you can literally see the four regions: red bars right of the line are TP, red bars left of it are FN, blue bars right of it are FP. The right panel plots the ROC curve, which is the (FPR, TPR) pair for every possible threshold at once; the red dot is where the current threshold sits on that curve. AUC is the area under the curve: 0.5 is the dashed diagonal of pure guessing, 1.0 is perfect separation.',
        'Sliding the threshold left catches almost every positive (recall rises toward 1) but also sweeps in many negatives, so precision and FPR get worse; sliding it right does the reverse. That is the precision-recall trade-off, and no threshold escapes it: the dot just moves along the ROC curve. The class separation and spread sliders change how much the two bells overlap, and that changes the whole curve and AUC; what matters is the ratio separation/σ. The positive-fraction slider is different: it changes precision and accuracy but not TPR, FPR or AUC, because those are computed within each class. With only 10% positives, calling everything negative already gives 90% accuracy, which is why accuracy alone is a poor metric for rare classes.',
        'This is a deliberately tidy model. Real classifier scores are rarely perfect normal distributions with equal spread, and all metrics here are computed on the same 400 random samples, so they jitter when you press Resample; that jitter is sampling noise, not a change in the classifier. The sim also attaches no cost to mistakes. In practice the right threshold depends on what an error costs: a missed cancer (FN) is far worse than an extra scan (FP), while a spam filter should rarely bury a real email (FP), so the two applications place the threshold at opposite ends of the same curve.',
      ],
      id: [
        'Sebagian besar pengklasifikasi tidak langsung menjawab ya atau tidak. Ia mengeluarkan skor, dan sebuah ambang mengubah skor itu menjadi keputusan: skor yang sama atau lebih besar dari ambang berarti "positif". Membandingkan keputusan itu dengan kenyataan menghasilkan empat hitungan yang disusun dalam matriks konfusi: positif benar (TP), positif palsu (FP), negatif palsu (FN), dan negatif benar (TN). Semua metrik populer adalah perbandingan dari hitungan ini. Akurasi = (TP + TN) / semua; presisi = TP / (TP + FP), yaitu bagian dari yang ditandai positif yang benar-benar positif; recall (disebut juga sensitivitas atau laju positif benar, TPR) = TP / (TP + FN), yaitu bagian dari positif sejati yang berhasil ditangkap; dan laju positif palsu FPR = FP / (FP + TN). F1 = 2·presisi·recall / (presisi + recall) adalah rata-rata harmonik, yang hanya tinggi jika keduanya tinggi.',
        'Simulasi ini mengambil 400 skor dari dua distribusi normal dengan sebaran σ yang sama: negatif (biru) berpusat di 0,5 − pemisahan/2 dan positif (merah) di 0,5 + pemisahan/2. Garis putih adalah ambang, dan semua yang ada di kanannya disebut positif. Pada histogram kiri kamu bisa melihat langsung keempat daerahnya: batang merah di kanan garis adalah TP, batang merah di kirinya FN, batang biru di kanannya FP. Panel kanan menggambar kurva ROC, yaitu pasangan (FPR, TPR) untuk semua ambang yang mungkin sekaligus; titik merah menunjukkan posisi ambang saat ini pada kurva itu. AUC adalah luas di bawah kurva: 0,5 adalah garis putus-putus diagonal untuk tebakan murni, 1,0 adalah pemisahan sempurna.',
        'Menggeser ambang ke kiri menangkap hampir semua positif (recall mendekati 1) tetapi juga menyeret banyak negatif, sehingga presisi dan FPR memburuk; menggeser ke kanan memberi efek sebaliknya. Itulah trade-off presisi-recall, dan tidak ada ambang yang lolos darinya: titik merah hanya bergerak sepanjang kurva ROC. Slider pemisahan kelas dan sebaran mengubah seberapa besar kedua kurva bel tumpang tindih, dan itu mengubah seluruh kurva serta AUC; yang menentukan adalah rasio pemisahan/σ. Slider fraksi positif berbeda: ia mengubah presisi dan akurasi tetapi tidak mengubah TPR, FPR, atau AUC, karena ketiganya dihitung di dalam masing-masing kelas. Dengan hanya 10% positif, menyatakan semuanya negatif sudah memberi akurasi 90%; karena itu akurasi saja adalah metrik yang buruk untuk kelas yang langka.',
        'Ini model yang sengaja dibuat rapi. Skor pengklasifikasi sungguhan jarang berupa distribusi normal sempurna dengan sebaran sama, dan semua metrik di sini dihitung pada 400 sampel acak yang sama, sehingga nilainya bergetar saat kamu menekan Resample; getaran itu adalah derau pengambilan sampel, bukan perubahan pengklasifikasi. Simulasi juga tidak memberi biaya pada kesalahan. Dalam praktik, ambang yang tepat bergantung pada harga sebuah kesalahan: kanker yang terlewat (FN) jauh lebih buruk daripada satu pemindaian tambahan (FP), sedangkan filter spam seharusnya jarang menenggelamkan surel asli (FP), sehingga kedua aplikasi menempatkan ambang di ujung yang berlawanan dari kurva yang sama.',
      ],
    },
    figure: {
      caption: {
        en: 'Left: two overlapping score distributions cut by a threshold. The four regions are the confusion matrix. Right: moving the threshold slides the red point along the ROC curve; the curve itself only changes when the overlap changes.',
        id: 'Kiri: dua distribusi skor yang tumpang tindih dipotong oleh sebuah ambang. Keempat daerahnya adalah matriks konfusi. Kanan: menggeser ambang memindahkan titik merah di sepanjang kurva ROC; kurvanya sendiri hanya berubah jika tumpang tindihnya berubah.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        const erf = (z) => { const s = Math.sign(z), a = Math.abs(z), t = 1 / (1 + 0.3275911 * a); return s * (1 - (((((1.061405429 * t - 1.453152027) * t) + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-a * a)); };
        const Phi = (z) => 0.5 * (1 + erf(z / Math.SQRT2));
        const muN = 75, muP = 135, sd = 22, thr = 110;
        const bell = (mu) => { let d = ''; for (let x = 10; x <= 200; x += 5) { const y = 180 - 110 * Math.exp(-((x - mu) ** 2) / (2 * sd * sd)); d += (x === 10 ? 'M' : 'L') + x + ' ' + y.toFixed(1) + ' '; } return d; };
        const rx = (f) => 235 + f * 110, ry = (t) => 180 - t * 110;
        let roc = '';
        for (let t = 220; t >= -10; t -= 5) { const f = 1 - Phi((t - muN) / sd), p = 1 - Phi((t - muP) / sd); roc += (t === 220 ? 'M' : 'L') + rx(f).toFixed(1) + ' ' + ry(p).toFixed(1) + ' '; }
        const cf = 1 - Phi((thr - muN) / sd), cp = 1 - Phi((thr - muP) / sd);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Threshold on two score distributions and the ROC curve', 'Ambang pada dua distribusi skor dan kurva ROC')}">
  <style>text{font:12px system-ui,sans-serif;fill:currentColor}.m{fill:none;stroke:currentColor;stroke-width:1.2;opacity:.5}.s{font-size:10px}.b{font-weight:600}</style>
  <line x1="10" y1="180" x2="200" y2="180" class="m"/>
  <path d="${bell(muN)}" fill="#3b82f6" fill-opacity=".18" stroke="#3b82f6" stroke-width="2"/>
  <path d="${bell(muP)}" fill="#ef4444" fill-opacity=".18" stroke="#ef4444" stroke-width="2"/>
  <line x1="${thr}" y1="40" x2="${thr}" y2="190" stroke="currentColor" stroke-width="2" stroke-dasharray="5 3"/>
  <text x="${thr + 4}" y="36" class="s">${L('threshold', 'ambang')}</text>
  <text x="40" y="60" fill="#3b82f6" class="b">${L('negatives', 'negatif')}</text>
  <text x="140" y="60" fill="#ef4444" class="b">${L('positives', 'positif')}</text>
  <text x="60" y="172" fill="#3b82f6" class="s b">TN</text>
  <text x="113" y="172" fill="#3b82f6" class="s b">FP</text>
  <text x="90" y="150" fill="#ef4444" class="s b">FN</text>
  <text x="150" y="150" fill="#ef4444" class="s b">TP</text>
  <text x="10" y="200" class="s">${L('low score', 'skor rendah')}</text>
  <text x="150" y="200" class="s">${L('high score', 'skor tinggi')}</text>
  <text x="10" y="226" class="s">${L('precision = TP/(TP+FP)   recall = TP/(TP+FN)', 'presisi = TP/(TP+FP)   recall = TP/(TP+FN)')}</text>
  <rect x="235" y="70" width="110" height="110" class="m"/>
  <line x1="235" y1="180" x2="345" y2="70" class="m" stroke-dasharray="3 3"/>
  <path d="${roc}" fill="none" stroke="#10b981" stroke-width="2.2"/>
  <circle cx="${rx(cf).toFixed(1)}" cy="${ry(cp).toFixed(1)}" r="5" fill="#ef4444"/>
  <text x="262" y="196" class="s">FPR = FP/(FP+TN)</text>
  <text x="228" y="130" class="s" transform="rotate(-90 228 130)">TPR = recall</text>
  <text x="252" y="62" class="s b" fill="#10b981">ROC, AUC ≈ 0.97</text>
  <text x="300" y="150" class="s" opacity=".7">${L('guessing', 'menebak')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'A threshold turns scores into decisions, and every metric is a ratio of the four confusion-matrix counts it produces.',
        'Lowering the threshold raises recall but lowers precision; no single threshold maximises both.',
        'The ROC curve shows all thresholds at once, and AUC measures how separable the classes are regardless of threshold.',
        'Class imbalance changes accuracy and precision but not TPR, FPR or AUC, so accuracy alone can be badly misleading.',
        'The best threshold is not a property of the classifier; it depends on the cost of a false positive versus a false negative.',
      ],
      id: [
        'Ambang mengubah skor menjadi keputusan, dan setiap metrik adalah perbandingan dari empat hitungan matriks konfusi yang dihasilkannya.',
        'Menurunkan ambang menaikkan recall tetapi menurunkan presisi; tidak ada satu ambang yang memaksimalkan keduanya.',
        'Kurva ROC menampilkan semua ambang sekaligus, dan AUC mengukur seberapa terpisah kedua kelas tanpa bergantung pada ambang.',
        'Ketidakseimbangan kelas mengubah akurasi dan presisi tetapi tidak mengubah TPR, FPR, atau AUC, sehingga akurasi saja bisa sangat menyesatkan.',
        'Ambang terbaik bukan sifat pengklasifikasi; ia bergantung pada harga positif palsu dibanding negatif palsu.',
      ],
    },
    vocabulary: {
      en: [
        ['Threshold', 'The score value at which the decision flips from negative to positive.'],
        ['Confusion matrix', 'A 2×2 table of true positives, false positives, false negatives and true negatives.'],
        ['Precision', 'TP / (TP + FP): of everything flagged positive, the fraction that truly is positive.'],
        ['Recall (sensitivity, TPR)', 'TP / (TP + FN): of all true positives, the fraction the classifier caught.'],
        ['False positive rate (FPR)', 'FP / (FP + TN): the fraction of negatives wrongly flagged as positive; equals 1 − specificity.'],
        ['F1 score', 'The harmonic mean of precision and recall, 2PR / (P + R); it is low if either one is low.'],
        ['ROC curve', 'A plot of TPR against FPR for every possible threshold.'],
        ['AUC', 'Area under the ROC curve; the probability that a random positive scores higher than a random negative. 0.5 is guessing, 1 is perfect.'],
      ],
      id: [
        ['Ambang', 'Nilai skor tempat keputusan berubah dari negatif menjadi positif.'],
        ['Matriks konfusi', 'Tabel 2×2 berisi positif benar, positif palsu, negatif palsu, dan negatif benar.'],
        ['Presisi', 'TP / (TP + FP): dari semua yang ditandai positif, fraksi yang benar-benar positif.'],
        ['Recall (sensitivitas, TPR)', 'TP / (TP + FN): dari semua positif sejati, fraksi yang berhasil ditangkap pengklasifikasi.'],
        ['Laju positif palsu (FPR)', 'FP / (FP + TN): fraksi negatif yang salah ditandai positif; sama dengan 1 − spesifisitas.'],
        ['Skor F1', 'Rata-rata harmonik presisi dan recall, 2PR / (P + R); rendah jika salah satunya rendah.'],
        ['Kurva ROC', 'Grafik TPR terhadap FPR untuk semua ambang yang mungkin.'],
        ['AUC', 'Luas di bawah kurva ROC; peluang bahwa sebuah positif acak berskor lebih tinggi daripada sebuah negatif acak. 0,5 berarti menebak, 1 berarti sempurna.'],
      ],
    },
    misconceptions: {
      en: [
        ['High accuracy means a good classifier.', 'Not when classes are imbalanced. With 10% positives, a classifier that calls everything negative scores 90% accuracy while catching nobody. Precision, recall and AUC expose this; accuracy hides it.'],
        ['Moving the threshold improves the AUC.', 'The threshold only moves the red point along the ROC curve. AUC summarises the whole curve, so it changes only when the classes overlap more or less (separation or spread in the sim).'],
        ['There is one correct threshold for a classifier.', 'The best threshold depends on costs. A screening test wants high recall (few missed cases) and accepts low precision; a spam filter wants high precision and accepts lower recall.'],
        ['Precision and recall are the same thing viewed differently.', 'They divide the same TP by different totals. Precision asks "of those I flagged, how many were right?"; recall asks "of those that were really positive, how many did I find?"'],
      ],
      id: [
        ['Akurasi tinggi berarti pengklasifikasi bagus.', 'Tidak jika kelasnya tidak seimbang. Dengan 10% positif, pengklasifikasi yang menyatakan semuanya negatif mendapat akurasi 90% tanpa menangkap satu pun positif. Presisi, recall, dan AUC membongkar hal ini; akurasi menyembunyikannya.'],
        ['Menggeser ambang memperbaiki AUC.', 'Ambang hanya memindahkan titik merah di sepanjang kurva ROC. AUC merangkum seluruh kurva, sehingga hanya berubah jika kedua kelas lebih atau kurang tumpang tindih (pemisahan atau sebaran di simulasi).'],
        ['Ada satu ambang yang benar untuk sebuah pengklasifikasi.', 'Ambang terbaik bergantung pada biaya. Tes skrining menginginkan recall tinggi (sedikit kasus terlewat) dan menerima presisi rendah; filter spam menginginkan presisi tinggi dan menerima recall yang lebih rendah.'],
        ['Presisi dan recall adalah hal yang sama dilihat dari sudut berbeda.', 'Keduanya membagi TP yang sama dengan penyebut yang berbeda. Presisi bertanya "dari yang saya tandai, berapa yang benar?"; recall bertanya "dari yang benar-benar positif, berapa yang saya temukan?"'],
      ],
    },
    realWorld: {
      en: [
        'Medical screening tests are set to high recall: missing a disease is costly, so extra follow-up tests for false positives are accepted.',
        'Spam filters are tuned for high precision, because a real message lost in the spam folder is worse than one spam email getting through.',
        'Credit-card fraud detection deals with extreme imbalance, often fewer than 1 in 1,000 transactions, so teams report precision, recall and AUC, never plain accuracy.',
        'Airport security scanners are tuned toward recall; the long queues from false alarms are the price of a very low false negative rate.',
      ],
      id: [
        'Tes skrining medis diatur untuk recall tinggi: melewatkan penyakit sangat merugikan, sehingga pemeriksaan lanjutan ekstra untuk positif palsu bisa diterima.',
        'Filter spam disetel untuk presisi tinggi, karena pesan asli yang hilang di folder spam lebih buruk daripada satu surel spam yang lolos.',
        'Deteksi penipuan kartu kredit menghadapi ketidakseimbangan ekstrem, sering kali kurang dari 1 dari 1.000 transaksi, sehingga tim melaporkan presisi, recall, dan AUC, bukan akurasi polos.',
        'Pemindai keamanan bandara disetel ke arah recall; antrean panjang akibat alarm palsu adalah harga dari laju negatif palsu yang sangat rendah.',
      ],
    },
    questions: {
      en: [
        { q: 'A classifier produces TP = 90, FN = 10, FP = 30, TN = 270. Compute accuracy, precision, recall and F1.', a: 'Accuracy = (90 + 270) / 400 = 0.90. Precision = 90 / (90 + 30) = 0.75. Recall = 90 / (90 + 10) = 0.90. F1 = 2 × 0.75 × 0.90 / (0.75 + 0.90) = 1.35 / 1.65 ≈ 0.82.' },
        { q: 'Set the positive fraction to 0.10 and push the threshold far to the right so that nothing is called positive. What are the accuracy and recall, and why do they disagree so sharply?', a: 'Recall is 0 (no positive is caught) but accuracy is about 0.90, because the 90% negatives are all classified correctly. Accuracy is dominated by the majority class; recall looks only at the positives.' },
        { q: 'You keep the threshold fixed and increase class separation from 1.5 to 3.0. What happens to the ROC curve and the AUC, and what happens to the position of the red point?', a: 'The two bells overlap less, so for every threshold TPR goes up and FPR goes down: the curve bows further toward the top-left corner and AUC rises toward 1. The red point moves with the curve. AUC depends on the separation-to-spread ratio, not on where the threshold sits.' },
      ],
      id: [
        { q: 'Sebuah pengklasifikasi menghasilkan TP = 90, FN = 10, FP = 30, TN = 270. Hitung akurasi, presisi, recall, dan F1.', a: 'Akurasi = (90 + 270) / 400 = 0,90. Presisi = 90 / (90 + 30) = 0,75. Recall = 90 / (90 + 10) = 0,90. F1 = 2 × 0,75 × 0,90 / (0,75 + 0,90) = 1,35 / 1,65 ≈ 0,82.' },
        { q: 'Atur fraksi positif ke 0,10 dan geser ambang jauh ke kanan sehingga tidak ada yang dinyatakan positif. Berapa akurasi dan recall-nya, dan mengapa keduanya berbeda begitu tajam?', a: 'Recall-nya 0 (tidak ada positif yang tertangkap) tetapi akurasinya sekitar 0,90, karena 90% negatif semuanya diklasifikasikan dengan benar. Akurasi didominasi kelas mayoritas; recall hanya melihat kelas positif.' },
        { q: 'Kamu membiarkan ambang tetap dan menaikkan pemisahan kelas dari 1,5 ke 3,0. Apa yang terjadi pada kurva ROC dan AUC, dan apa yang terjadi pada posisi titik merah?', a: 'Kedua kurva bel lebih sedikit tumpang tindih, sehingga untuk setiap ambang TPR naik dan FPR turun: kurva melengkung lebih jauh ke pojok kiri atas dan AUC mendekati 1. Titik merah ikut bergerak bersama kurvanya. AUC bergantung pada rasio pemisahan terhadap sebaran, bukan pada letak ambang.' },
      ],
    },
  },
};
