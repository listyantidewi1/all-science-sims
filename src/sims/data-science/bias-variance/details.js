// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Distinguish underfitting from overfitting visually.',
      'Read training error vs (true) test error as a function of model complexity.',
      'Pick a model degree that minimizes expected error.',
    ],
    id: [
      'Membedakan underfitting dan overfitting secara visual.',
      'Membaca galat latih vs galat uji (sejati) sebagai fungsi kompleksitas model.',
      'Memilih derajat model yang meminimalkan galat ekspektasi.',
    ],
  },
  tryThis: {
    en: [
      'Set degree to 1 — does the line miss the curve?',
      'Set degree to 12 — does it wiggle through every point?',
      'Resample noise — does the high-degree fit jump around?',
    ],
    id: [
      'Atur derajat ke 1 — apakah garisnya melenceng dari kurva?',
      'Atur derajat ke 12 — apakah garisnya melilit setiap titik?',
      'Resample derau — apakah model tinggi-derajat berubah-ubah?',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'In supervised learning we fit a model to a sample of noisy data and then ask how well it predicts new data it has never seen. The expected error on new data splits into three parts: bias², variance and irreducible noise. Bias is the systematic error of a model too simple to represent the truth, the same mistake on every sample. Variance is how much the fitted model would change if we drew a different random sample of the same size; a flexible model follows the noise in its particular sample and so changes a lot. Noise is the scatter in the data itself, which no model can remove. Making a model more flexible lowers bias but raises variance, and the best model sits where their sum is smallest.',
        'The simulation hides a true curve, f(x) = sin x + 0.3x (green), and generates n training points by adding Gaussian noise of standard deviation σ to it. It then fits a polynomial of the chosen degree by least squares, solving the normal equations, and draws the result in pink. Two numbers are reported. Train MSE is the mean squared distance from the fitted curve to the yellow training points. "Test MSE" here is the mean squared distance from the fitted curve to the true curve on an 80-point grid; because the sim knows the true function it can measure bias² + variance directly without noise. In real life you never know f, so you estimate test error on held-out data, and that estimate would be higher by about σ².',
        'Slide the degree. At 0 or 1 the fit is a flat or straight line that cannot bend with the sine wave: both errors are high and stay high, the signature of underfitting. Around degree 3 to 5 the pink curve tracks the green one and test MSE is near its minimum. Push the degree to 10 and beyond and the curve starts threading through individual points and swinging wildly between them, especially near the edges: train MSE keeps falling toward zero while test MSE climbs, the signature of overfitting. Now press Resample noise several times: the low-degree fit barely moves, the high-degree fit lurches, and that visible instability is variance. More training points shrink the variance and shift the best degree upward; more noise does the opposite. The verdict label is a fixed rule on the degree alone (1 or below is underfitting, 8 or above is overfitting), not a judgement computed from the errors.',
        'Some limits to keep in mind. Fitting high-degree polynomials through the normal equations is numerically fragile, so at degrees above about 10 the coefficients can blow up and the curve may leave the screen, and when the degree reaches or exceeds the number of points the system has no unique solution and the sim falls back to a flat zero line. The sim uses only polynomials and no regularisation, which in practice is the main tool for taming variance. And it compares against the true function, a luxury that real projects replace with a validation set or cross-validation.',
      ],
      id: [
        'Dalam pembelajaran terawasi kita mencocokkan model pada sampel data yang berderau, lalu bertanya seberapa baik model itu memprediksi data baru yang belum pernah dilihatnya. Galat ekspektasi pada data baru terbagi menjadi tiga bagian: bias², varian, dan derau yang tak tereduksi. Bias adalah galat sistematis dari model yang terlalu sederhana untuk mewakili kebenaran, kesalahan yang sama pada setiap sampel. Varian adalah seberapa besar model hasil fit akan berubah jika kita mengambil sampel acak lain dengan ukuran sama; model yang fleksibel mengikuti derau pada sampelnya sendiri sehingga banyak berubah. Derau adalah sebaran dalam data itu sendiri, yang tidak bisa dihilangkan model mana pun. Membuat model lebih fleksibel menurunkan bias tetapi menaikkan varian, dan model terbaik berada di tempat jumlah keduanya paling kecil.',
        'Simulasi ini menyembunyikan kurva sejati, f(x) = sin x + 0,3x (hijau), dan menghasilkan n titik latih dengan menambahkan derau Gaussian bersimpangan baku σ padanya. Ia lalu mencocokkan polinomial berderajat pilihanmu dengan kuadrat terkecil, menyelesaikan persamaan normal, dan menggambar hasilnya dengan warna merah muda. Dua angka dilaporkan. Train MSE adalah rata-rata kuadrat jarak dari kurva hasil fit ke titik-titik latih kuning. "Test MSE" di sini adalah rata-rata kuadrat jarak dari kurva hasil fit ke kurva sejati pada kisi 80 titik; karena simulasi mengetahui fungsi sejatinya, ia bisa mengukur bias² + varian secara langsung tanpa derau. Dalam kehidupan nyata kamu tidak pernah tahu f, sehingga galat uji ditaksir pada data yang disisihkan, dan taksiran itu akan lebih tinggi sekitar σ².',
        'Geser derajatnya. Pada 0 atau 1, hasil fit berupa garis datar atau lurus yang tidak bisa melengkung mengikuti gelombang sinus: kedua galat tinggi dan tetap tinggi, tanda underfitting. Di sekitar derajat 3 sampai 5 kurva merah muda mengikuti kurva hijau dan test MSE berada dekat minimumnya. Dorong derajat ke 10 ke atas dan kurva mulai menyusup melewati titik-titik satu per satu serta berayun liar di antaranya, terutama di tepi: train MSE terus turun menuju nol sementara test MSE naik, tanda overfitting. Sekarang tekan Resample noise beberapa kali: fit berderajat rendah hampir tidak bergerak, fit berderajat tinggi terlempar-lempar, dan ketidakstabilan yang terlihat itulah varian. Lebih banyak titik latih memperkecil varian dan menggeser derajat terbaik ke atas; lebih banyak derau memberi efek sebaliknya. Label penilaian hanyalah aturan tetap berdasarkan derajat saja (1 ke bawah underfitting, 8 ke atas overfitting), bukan penilaian yang dihitung dari galatnya.',
        'Beberapa batasan perlu diingat. Mencocokkan polinomial berderajat tinggi lewat persamaan normal rapuh secara numerik, sehingga pada derajat di atas sekitar 10 koefisiennya bisa meledak dan kurva mungkin keluar layar, dan ketika derajat mencapai atau melampaui jumlah titik, sistemnya tidak punya solusi unik dan simulasi kembali ke garis nol yang datar. Simulasi hanya memakai polinomial dan tanpa regularisasi, padahal dalam praktik regularisasi adalah alat utama untuk menjinakkan varian. Dan ia membandingkan dengan fungsi sejati, kemewahan yang pada proyek nyata digantikan oleh set validasi atau validasi silang.',
      ],
    },
    figure: {
      caption: {
        en: 'Error against model complexity. Bias² falls and variance rises as the model gets more flexible; their sum plus noise is the test error, with a minimum at moderate complexity. Training error alone keeps falling, so it cannot locate the sweet spot.',
        id: 'Galat terhadap kompleksitas model. Bias² turun dan varian naik saat model makin fleksibel; jumlah keduanya ditambah derau adalah galat uji, dengan minimum pada kompleksitas sedang. Galat latih saja terus turun, sehingga tidak bisa menunjukkan titik terbaik.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        const X = (c) => 40 + c * 290, Y = (e) => 200 - e * 150;
        const bias = (c) => 0.9 * Math.exp(-5 * c), vari = (c) => 0.03 + 0.55 * c * c * c, noise = 0.12;
        const train = (c) => Math.max(0.005, 0.9 * Math.exp(-5 * c) + noise * (1 - c));
        const curve = (f) => { let d = ''; for (let i = 0; i <= 40; i++) { const c = i / 40; d += (i === 0 ? 'M' : 'L') + X(c).toFixed(1) + ' ' + Y(f(c)).toFixed(1) + ' '; } return d; };
        let best = 0, bestV = 9;
        for (let i = 0; i <= 100; i++) { const c = i / 100, v = bias(c) + vari(c) + noise; if (v < bestV) { bestV = v; best = c; } }
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Bias, variance and total error against model complexity', 'Bias, varian, dan galat total terhadap kompleksitas model')}">
  <style>text{font:12px system-ui,sans-serif;fill:currentColor}.m{fill:none;stroke:currentColor;stroke-width:1.2;opacity:.5}.s{font-size:10px}.b{font-weight:600}</style>
  <line x1="40" y1="200" x2="330" y2="200" class="m"/>
  <line x1="40" y1="200" x2="40" y2="30" class="m"/>
  <text x="130" y="218" class="s">${L('model complexity (polynomial degree) →', 'kompleksitas model (derajat polinomial) →')}</text>
  <text x="14" y="120" class="s" transform="rotate(-90 14 120)">${L('error', 'galat')}</text>
  <line x1="40" y1="${Y(noise)}" x2="330" y2="${Y(noise)}" stroke="currentColor" stroke-width="1" stroke-dasharray="3 3" opacity=".5"/>
  <text x="258" y="${Y(noise) - 4}" class="s">${L('noise (irreducible)', 'derau (tak tereduksi)')}</text>
  <path d="${curve(bias)}" fill="none" stroke="#f59e0b" stroke-width="2"/>
  <path d="${curve(vari)}" fill="none" stroke="#8b5cf6" stroke-width="2"/>
  <path d="${curve((c) => bias(c) + vari(c) + noise)}" fill="none" stroke="#ef4444" stroke-width="2.6"/>
  <path d="${curve(train)}" fill="none" stroke="#3b82f6" stroke-width="2" stroke-dasharray="5 3"/>
  <line x1="${X(best).toFixed(1)}" y1="${Y(bestV).toFixed(1)}" x2="${X(best).toFixed(1)}" y2="200" stroke="#10b981" stroke-width="1.5" stroke-dasharray="3 2"/>
  <circle cx="${X(best).toFixed(1)}" cy="${Y(bestV).toFixed(1)}" r="4.5" fill="#10b981"/>
  <text x="${(X(best) - 30).toFixed(1)}" y="${(Y(bestV) - 10).toFixed(1)}" class="s b" fill="#10b981">${L('best degree', 'derajat terbaik')}</text>
  <text x="52" y="46" class="s b" fill="#f59e0b">bias²</text>
  <text x="290" y="${(Y(vari(1)) - 6).toFixed(1)}" class="s b" fill="#8b5cf6">${L('variance', 'varian')}</text>
  <text x="230" y="${(Y(bias(0.65) + vari(0.65) + noise) - 10).toFixed(1)}" class="s b" fill="#ef4444">${L('test error', 'galat uji')}</text>
  <text x="200" y="${(Y(train(0.55)) + 14).toFixed(1)}" class="s b" fill="#3b82f6">${L('training error', 'galat latih')}</text>
  <text x="44" y="${Y(0) - 6}" class="s" opacity=".7">${L('underfit', 'underfit')}</text>
  <text x="285" y="${Y(0) - 6}" class="s" opacity=".7">${L('overfit', 'overfit')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Expected test error = bias² + variance + irreducible noise; model complexity trades the first term against the second.',
        'A model that is too simple underfits: it misses the true pattern on every sample, and both training and test error stay high.',
        'A model that is too flexible overfits: training error approaches zero while test error rises, because the model has memorised the noise.',
        'Variance shows up as instability: resample the noise and an overfit model changes shape, an underfit one does not.',
        'More training data lowers variance and lets you afford a more complex model; more noise does the reverse.',
      ],
      id: [
        'Galat uji ekspektasi = bias² + varian + derau tak tereduksi; kompleksitas model menukar suku pertama dengan suku kedua.',
        'Model yang terlalu sederhana underfit: ia melewatkan pola sejati pada setiap sampel, dan galat latih maupun uji tetap tinggi.',
        'Model yang terlalu fleksibel overfit: galat latih mendekati nol sementara galat uji naik, karena model telah menghafal deraunya.',
        'Varian tampak sebagai ketidakstabilan: ambil ulang deraunya dan model yang overfit berubah bentuk, model yang underfit tidak.',
        'Lebih banyak data latih menurunkan varian dan memungkinkan model yang lebih kompleks; lebih banyak derau memberi efek sebaliknya.',
      ],
    },
    vocabulary: {
      en: [
        ['Bias', 'The systematic error of a model whose form cannot represent the true relationship, averaged over all possible training samples.'],
        ['Variance', 'How much the fitted model varies from one random training sample to another.'],
        ['Irreducible noise', 'The random scatter in the data itself, σ² here, which no model can predict.'],
        ['Underfitting', 'A model too simple for the data: high bias, high training and test error.'],
        ['Overfitting', 'A model so flexible that it fits the noise: low training error but high test error.'],
        ['Mean squared error (MSE)', 'The average of the squared differences between predictions and targets.'],
        ['Polynomial degree', 'The highest power of x in the model; the sim uses it as the measure of model complexity.'],
        ['Least squares', 'Choosing the coefficients that minimise the sum of squared residuals on the training points.'],
      ],
      id: [
        ['Bias', 'Galat sistematis dari model yang bentuknya tidak mampu mewakili hubungan sejati, dirata-ratakan atas semua sampel latih yang mungkin.'],
        ['Varian', 'Seberapa besar model hasil fit berubah dari satu sampel latih acak ke sampel lainnya.'],
        ['Derau tak tereduksi', 'Sebaran acak dalam data itu sendiri, di sini σ², yang tidak bisa diprediksi model mana pun.'],
        ['Underfitting', 'Model yang terlalu sederhana untuk datanya: bias tinggi, galat latih dan uji tinggi.'],
        ['Overfitting', 'Model yang begitu fleksibel sampai mencocokkan deraunya: galat latih rendah tetapi galat uji tinggi.'],
        ['Galat kuadrat rata-rata (MSE)', 'Rata-rata kuadrat selisih antara prediksi dan nilai target.'],
        ['Derajat polinomial', 'Pangkat tertinggi x dalam model; simulasi memakainya sebagai ukuran kompleksitas model.'],
        ['Kuadrat terkecil', 'Memilih koefisien yang meminimalkan jumlah kuadrat residu pada titik-titik latih.'],
      ],
    },
    misconceptions: {
      en: [
        ['The model with the lowest training error is the best model.', 'Training error always falls as complexity grows, reaching zero when the polynomial can pass through every point. The model that predicts new data best is the one with the lowest test error, which is usually of moderate complexity.'],
        ['More flexible models are always better because they can represent anything.', 'Being able to represent the truth is not enough; the model must also be pinned down by the data. With 15 noisy points a degree-12 polynomial has more freedom than the data can constrain, so it fits the noise.'],
        ['A perfect fit through every point means we have found the true function.', 'It means we have fitted the noise too. Press Resample noise: a new sample gives a completely different "perfect" curve, while the true function has not changed at all.'],
        ['Collecting more data fixes underfitting.', 'More data reduces variance, not bias. A straight line will miss the sine curve no matter how many points you give it; to fix underfitting you need a more flexible model.'],
      ],
      id: [
        ['Model dengan galat latih terendah adalah model terbaik.', 'Galat latih selalu turun saat kompleksitas naik, mencapai nol ketika polinomialnya bisa melewati setiap titik. Model yang paling baik memprediksi data baru adalah yang galat ujinya terendah, yang biasanya berkompleksitas sedang.'],
        ['Model yang lebih fleksibel selalu lebih baik karena bisa mewakili apa saja.', 'Mampu mewakili kebenaran tidak cukup; model juga harus bisa dipaku oleh datanya. Dengan 15 titik berderau, polinomial derajat 12 punya kebebasan lebih besar daripada yang bisa dikendalikan data, sehingga ia mencocokkan deraunya.'],
        ['Fit sempurna yang melewati setiap titik berarti kita telah menemukan fungsi sejatinya.', 'Itu berarti kita juga telah mencocokkan deraunya. Tekan Resample noise: sampel baru memberi kurva "sempurna" yang sama sekali berbeda, padahal fungsi sejatinya tidak berubah sama sekali.'],
        ['Mengumpulkan lebih banyak data memperbaiki underfitting.', 'Lebih banyak data mengurangi varian, bukan bias. Garis lurus akan tetap melewatkan kurva sinus berapa pun titik yang kamu berikan; untuk memperbaiki underfitting kamu perlu model yang lebih fleksibel.'],
      ],
    },
    realWorld: {
      en: [
        'Weather and climate models are validated on past years they were not trained on, because a model that reproduces its training period perfectly may forecast badly.',
        'Medical risk scores built on one hospital\'s patients often perform worse at another hospital; the drop is overfitting to the first hospital\'s particular population.',
        'Neural networks with millions of parameters are kept from overfitting by regularisation, early stopping and large data sets, all of which are ways of controlling variance.',
        'Choosing how many terms to keep in a polynomial trend line in a spreadsheet is this exact trade-off: a higher-order trend line fits the history better and extrapolates worse.',
      ],
      id: [
        'Model cuaca dan iklim divalidasi pada tahun-tahun lampau yang tidak dipakai saat pelatihan, karena model yang mereproduksi periode latihnya dengan sempurna bisa saja meramal dengan buruk.',
        'Skor risiko medis yang dibangun dari pasien satu rumah sakit sering berkinerja lebih buruk di rumah sakit lain; penurunan itu adalah overfitting terhadap populasi khusus rumah sakit pertama.',
        'Jaringan saraf dengan jutaan parameter dijaga dari overfitting dengan regularisasi, penghentian dini, dan data yang besar, yang semuanya adalah cara mengendalikan varian.',
        'Memilih berapa suku yang dipakai pada garis tren polinomial di spreadsheet adalah trade-off yang persis sama: garis tren berorde lebih tinggi lebih cocok dengan data lampau tetapi lebih buruk saat diekstrapolasi.',
      ],
    },
    questions: {
      en: [
        { q: 'With 15 training points you set the degree to 14. What training MSE do you expect, and what happens to the test MSE?', a: 'Training MSE is essentially zero: a degree-14 polynomial has 15 coefficients and can pass exactly through 15 points. Test MSE becomes large, because between and beyond the points the curve swings far from the true function. Zero training error here is a symptom of overfitting, not of success.' },
        { q: 'At degree 0 the fit is a horizontal line at the mean of the y values. Which of the three error components dominates, and why does resampling the noise barely change the fit?', a: 'Bias dominates: a flat line cannot follow sin x + 0.3x, so it is wrong in the same way on every sample. Variance is tiny because the mean of 15 points changes only slightly between samples, so the line barely moves when you resample.' },
        { q: 'You double the number of training points from 15 to 30, keeping the noise fixed. Which error component shrinks, and should the best degree go up or down?', a: 'Variance shrinks, because each coefficient is now estimated from more data and follows the noise less. Bias at any given degree is unchanged. Since the variance penalty for extra flexibility is smaller, the degree that minimises test error moves up.' },
      ],
      id: [
        { q: 'Dengan 15 titik latih kamu mengatur derajat ke 14. Berapa train MSE yang kamu harapkan, dan apa yang terjadi pada test MSE?', a: 'Train MSE pada dasarnya nol: polinomial derajat 14 punya 15 koefisien dan bisa melewati tepat 15 titik. Test MSE menjadi besar, karena di antara dan di luar titik-titik itu kurvanya berayun jauh dari fungsi sejati. Galat latih nol di sini adalah gejala overfitting, bukan keberhasilan.' },
        { q: 'Pada derajat 0 hasil fit adalah garis mendatar pada rata-rata nilai y. Komponen galat mana yang mendominasi, dan mengapa mengambil ulang derau hampir tidak mengubah fit-nya?', a: 'Bias mendominasi: garis datar tidak bisa mengikuti sin x + 0,3x, sehingga salah dengan cara yang sama pada setiap sampel. Variannya kecil karena rata-rata 15 titik hanya berubah sedikit antarsampel, sehingga garisnya hampir tidak bergerak saat diambil ulang.' },
        { q: 'Kamu menggandakan jumlah titik latih dari 15 ke 30 dengan derau tetap. Komponen galat mana yang menyusut, dan apakah derajat terbaik naik atau turun?', a: 'Varian menyusut, karena setiap koefisien kini ditaksir dari lebih banyak data dan lebih sedikit mengikuti derau. Bias pada derajat tertentu tidak berubah. Karena hukuman varian untuk fleksibilitas tambahan lebih kecil, derajat yang meminimalkan galat uji bergeser naik.' },
      ],
    },
  },
};
