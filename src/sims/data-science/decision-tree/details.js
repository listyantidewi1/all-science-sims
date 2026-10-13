// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'See greedy splitting reduce Gini impurity step by step.',
      'Recognize axis-aligned decision boundaries.',
      'Watch overfitting at high depth (every point gets its own region).',
    ],
    id: [
      'Melihat pembagian serakah menurunkan ketakmurnian Gini langkah demi langkah.',
      'Mengenali batas keputusan yang sejajar sumbu.',
      'Mengamati overfitting pada kedalaman tinggi (setiap titik dapat region sendiri).',
    ],
  },
  tryThis: {
    en: [
      'Depth 1 — single split. How accurate?',
      'Depth 8 — nearly perfect on training. Overfit?',
      'Add noise to the data — depth 8 still overfits, but accuracy on the true function drops.',
    ],
    id: [
      'Kedalaman 1 — satu pembagian. Seberapa akurat?',
      'Kedalaman 8 — hampir sempurna untuk data latih. Overfit?',
      'Tambah derau pada data — kedalaman 8 tetap overfit, tapi akurasi pada fungsi sejatinya turun.',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'Classification means predicting a category from measurements. Here each point has two measurements, x and y, and belongs to one of two classes. A decision tree classifies the way a game of twenty questions does: it asks a sequence of yes/no questions, each about a single measurement, such as "is x less than 0.52?". Every question cuts the current region in two with a line parallel to an axis, so after several questions the plane is tiled into rectangles. Each rectangle is a leaf, and a leaf predicts whichever class holds the majority of its training points.',
        'To choose a question the tree needs a score for how mixed a group of points is. The sim uses Gini impurity: with p the fraction of class 1 in a group, Gini = 2p(1 − p). It is 0 when the group is pure and reaches its maximum of 0.5 at a 50/50 mix. For every candidate threshold, the midpoint between two neighbouring sorted values on x and then on y, the sim computes the impurity of the two children, weights each by its share of the points, and keeps the split with the lowest weighted impurity. It then repeats inside each child. This is a greedy algorithm: it takes the best split available right now and never revises it.',
        'The controls change the problem and the budget. The dataset selector offers two blobs, which a single split almost separates; the XOR four-corners pattern, where every possible first split leaves both children about half and half, so impurity barely drops until depth 2; and a circle inside a square, where axis-aligned cuts can only approximate the round boundary by a staircase. Max depth caps the number of questions on any path from the root, so a tree of depth d has at most 2 to the power d leaves. Splitting stops early when a node is pure or has fewer than two points. The readout shows the number of leaves and the training accuracy, the share of the plotted points the tree labels correctly.',
        'The sim reports only training accuracy, measured on the very points the tree was grown from, and that number is easy to fool. Give the tree enough depth and it will draw a tiny rectangle around every stray point until the training accuracy reads 100%, even though those slivers would mislabel new points landing nearby. That is overfitting, and without a held-out test set you have to judge it by eye: boundaries that follow the shape of the clusters generalize, boundaries that chase individual points do not. Real tree libraries limit leaf size, prune branches, or average many trees as a random forest. The sim rebuilds the whole tree from scratch every frame and breaks ties in impurity by taking the first candidate it meets, so two equally good splits can look arbitrary.',
      ],
      id: [
        'Klasifikasi berarti menebak kategori dari hasil pengukuran. Di sini tiap titik punya dua ukuran, x dan y, dan termasuk salah satu dari dua kelas. Pohon keputusan mengklasifikasi seperti permainan tebak-tebakan ya/tidak: ia mengajukan serangkaian pertanyaan, masing-masing tentang satu ukuran saja, misalnya "apakah x kurang dari 0,52?". Setiap pertanyaan memotong daerah yang sedang ditinjau menjadi dua dengan garis sejajar sumbu, sehingga setelah beberapa pertanyaan bidang terbagi menjadi persegi panjang. Tiap persegi panjang adalah daun, dan daun menebak kelas yang menjadi mayoritas titik latih di dalamnya.',
        'Untuk memilih pertanyaan, pohon butuh skor seberapa campur suatu kelompok titik. Simulasi memakai ketakmurnian Gini: jika p adalah pecahan kelas 1 di kelompok itu, Gini = 2p(1 − p). Nilainya 0 saat kelompok murni dan mencapai maksimum 0,5 pada campuran 50/50. Untuk tiap ambang calon, yaitu titik tengah antara dua nilai bertetangga yang sudah diurutkan pada x lalu pada y, simulasi menghitung ketakmurnian kedua anak, menimbangnya dengan porsi titik masing-masing, dan menyimpan pembagian dengan ketakmurnian tertimbang terendah. Lalu proses diulang di dalam tiap anak. Ini algoritme serakah: ia mengambil pembagian terbaik saat ini dan tidak pernah meninjaunya kembali.',
        'Kontrolnya mengubah soal dan anggarannya. Pilihan dataset menawarkan dua gumpalan, yang hampir terpisah dengan satu pembagian; pola XOR empat sudut, di mana setiap pembagian pertama yang mungkin menyisakan kedua anak kira-kira separuh-separuh sehingga ketakmurnian hampir tidak turun sampai kedalaman 2; dan lingkaran di dalam persegi, di mana potongan sejajar sumbu hanya bisa mendekati batas bulat dengan pola tangga. Kedalaman maksimum membatasi jumlah pertanyaan pada setiap jalur dari akar, sehingga pohon berkedalaman d punya paling banyak 2 pangkat d daun. Pembagian berhenti lebih awal jika simpul sudah murni atau berisi kurang dari dua titik. Tampilan menunjukkan jumlah daun dan akurasi latih, yaitu porsi titik yang digambar yang dilabeli pohon dengan benar.',
        'Simulasi hanya melaporkan akurasi latih, yang diukur pada titik-titik yang sama dengan yang dipakai menumbuhkan pohon, dan angka itu mudah ditipu. Beri pohon kedalaman yang cukup dan ia akan menggambar persegi panjang mungil di sekeliling setiap titik nyasar sampai akurasi latih terbaca 100%, padahal potongan sekecil itu akan salah melabeli titik baru yang mendarat di dekatnya. Itulah overfitting, dan tanpa data uji terpisah kamu harus menilainya dengan mata: batas yang mengikuti bentuk gerombolan akan menggeneralisasi, batas yang mengejar titik satu per satu tidak. Pustaka pohon sungguhan membatasi ukuran daun, memangkas cabang, atau merata-ratakan banyak pohon sebagai random forest. Simulasi membangun ulang seluruh pohon dari nol setiap frame dan memecahkan seri ketakmurnian dengan mengambil calon yang pertama ditemui, sehingga dua pembagian yang sama baiknya bisa tampak sewenang-wenang.',
      ],
    },
    figure: {
      caption: {
        en: 'Eight points, two classes. The root split x < 0.5 lowers the weighted Gini from 0.47 to 0.30 and makes the left leaf pure; a second split y < 0.5 on the right side makes every leaf pure. The boundary is two axis-aligned lines.',
        id: 'Delapan titik, dua kelas. Pembagian akar x < 0,5 menurunkan Gini tertimbang dari 0,47 ke 0,30 dan membuat daun kiri murni; pembagian kedua y < 0,5 di sisi kanan membuat semua daun murni. Batasnya berupa dua garis sejajar sumbu.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        const X = (v) => 20 + v * 160, Y = (v) => 200 - v * 160;
        const blue = [[0.2, 0.3], [0.3, 0.7], [0.15, 0.5], [0.7, 0.8], [0.85, 0.65]];
        const red = [[0.65, 0.2], [0.8, 0.35], [0.9, 0.15]];
        const pts = blue.map(([x, y]) => `<circle cx="${X(x)}" cy="${Y(y)}" r="5" fill="#3b82f6"/>`).join('')
          + red.map(([x, y]) => `<rect x="${X(x) - 5}" y="${Y(y) - 5}" width="10" height="10" fill="#ef4444"/>`).join('');
        const node = (x, y, w, txt, c) => `<rect x="${x - w / 2}" y="${y - 11}" width="${w}" height="22" rx="4" fill="none" stroke="${c}" stroke-width="1.5"/><text x="${x}" y="${y + 4}" text-anchor="middle">${txt}</text>`;
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('A decision tree splitting eight points', 'Pohon keputusan membagi delapan titik')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.m{fill:none;stroke:currentColor;stroke-width:1;opacity:.5}.s{font-size:10px;opacity:.75}</style>
  <rect x="100" y="40" width="80" height="80" fill="#3b82f6" opacity=".12"/>
  <rect x="100" y="120" width="80" height="80" fill="#ef4444" opacity=".12"/>
  <rect x="20" y="40" width="80" height="160" fill="#3b82f6" opacity=".12"/>
  <rect x="20" y="40" width="160" height="160" class="m"/>
  <line x1="100" y1="40" x2="100" y2="200" stroke="#f59e0b" stroke-width="2.5"/>
  <line x1="100" y1="120" x2="180" y2="120" stroke="#f59e0b" stroke-width="2.5"/>
  ${pts}
  <text x="96" y="214" text-anchor="middle" class="s">${L('x = 0.5', 'x = 0,5')}</text>
  <text x="186" y="124" class="s">${L('y = 0.5', 'y = 0,5')}</text>
  <text x="20" y="34" class="s">${L('root: 5 blue, 3 red, Gini 0.47', 'akar: 5 biru, 3 merah, Gini 0,47')}</text>
  <text x="20" y="232" class="s">${L('leaves pure: Gini 0', 'daun murni: Gini 0')}</text>
  ${node(285, 60, 66, L('x &lt; 0.5?', 'x &lt; 0,5?'), '#f59e0b')}
  <line x1="268" y1="71" x2="245" y2="108" class="m"/>
  <line x1="302" y1="71" x2="320" y2="108" class="m"/>
  <text x="238" y="94" class="s">${L('yes', 'ya')}</text>
  <text x="318" y="94" class="s">${L('no', 'tidak')}</text>
  ${node(240, 120, 60, L('blue (3)', 'biru (3)'), '#3b82f6')}
  ${node(320, 120, 66, L('y &lt; 0.5?', 'y &lt; 0,5?'), '#f59e0b')}
  <line x1="305" y1="131" x2="285" y2="168" class="m"/>
  <line x1="335" y1="131" x2="340" y2="168" class="m"/>
  ${node(280, 180, 56, L('red (3)', 'merah (3)'), '#ef4444')}
  ${node(336, 180, 46, L('blue (2)', 'biru (2)'), '#3b82f6')}
  <text x="212" y="214" class="s">${L('weighted Gini after split 1: 0.30', 'Gini tertimbang setelah pembagian 1: 0,30')}</text>
  <text x="212" y="228" class="s">${L('after split 2: 0.00', 'setelah pembagian 2: 0,00')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'A decision tree classifies by a chain of yes/no questions, each about one feature, so its boundaries are lines parallel to the axes.',
        'Gini impurity 2p(1 − p) measures how mixed a group is: 0 for a pure group, 0.5 for a 50/50 mix.',
        'Each split is chosen greedily to minimize the weighted impurity of its two children; earlier splits are never revisited.',
        'Max depth caps the number of questions; depth d allows up to 2 to the power d leaves.',
        'High training accuracy at large depth is a warning sign, not a success: a tree deep enough can memorize every training point.',
      ],
      id: [
        'Pohon keputusan mengklasifikasi lewat rantai pertanyaan ya/tidak, masing-masing tentang satu fitur, sehingga batasnya berupa garis sejajar sumbu.',
        'Ketakmurnian Gini 2p(1 − p) mengukur seberapa campur suatu kelompok: 0 untuk kelompok murni, 0,5 untuk campuran 50/50.',
        'Tiap pembagian dipilih secara serakah untuk meminimalkan ketakmurnian tertimbang kedua anaknya; pembagian sebelumnya tidak pernah ditinjau ulang.',
        'Kedalaman maksimum membatasi jumlah pertanyaan; kedalaman d membolehkan paling banyak 2 pangkat d daun.',
        'Akurasi latih tinggi pada kedalaman besar adalah tanda peringatan, bukan keberhasilan: pohon yang cukup dalam bisa menghafal setiap titik latih.',
      ],
    },
    vocabulary: {
      en: [
        ['Decision tree', 'A classifier that routes each point through a sequence of yes/no tests on single features until it reaches a leaf.'],
        ['Node and leaf', 'A node holds a test ("x < t?"); a leaf holds no test and predicts a class.'],
        ['Split (threshold)', 'The value t at which a node divides a feature into "less than" and "at least".'],
        ['Gini impurity', 'For two classes with class-1 fraction p, 2p(1 − p); the probability that two points drawn from the group disagree in class.'],
        ['Greedy algorithm', 'One that makes the locally best choice at each step without looking ahead or backtracking.'],
        ['Depth', 'The longest number of tests from the root to a leaf.'],
        ['Training accuracy', 'The fraction of the points used to build the model that the model labels correctly.'],
        ['Overfitting', 'Fitting the quirks of the training points so closely that predictions on new points get worse.'],
      ],
      id: [
        ['Pohon keputusan', 'Pengklasifikasi yang mengarahkan tiap titik melalui serangkaian uji ya/tidak pada satu fitur sampai mencapai daun.'],
        ['Simpul dan daun', 'Simpul berisi uji ("x < t?"); daun tidak berisi uji dan menebak suatu kelas.'],
        ['Pembagian (ambang)', 'Nilai t tempat sebuah simpul memisahkan fitur menjadi "kurang dari" dan "paling sedikit".'],
        ['Ketakmurnian Gini', 'Untuk dua kelas dengan pecahan kelas 1 sebesar p, nilainya 2p(1 − p); peluang dua titik yang diambil dari kelompok itu berbeda kelas.'],
        ['Algoritme serakah', 'Algoritme yang mengambil pilihan terbaik setempat pada tiap langkah tanpa melihat ke depan atau mundur.'],
        ['Kedalaman', 'Jumlah uji terbanyak dari akar sampai ke sebuah daun.'],
        ['Akurasi latih', 'Pecahan titik yang dipakai membangun model yang dilabeli model dengan benar.'],
        ['Overfitting', 'Mengikuti keanehan titik latih begitu ketat sehingga prediksi pada titik baru justru memburuk.'],
      ],
    },
    misconceptions: {
      en: [
        ['Higher training accuracy always means a better classifier.', 'Training accuracy can be pushed to 100% simply by adding depth, because the tree can isolate every point in its own box. What matters is accuracy on new points, which the sim does not measure; a shallower tree whose boundaries follow the clusters usually generalizes better.'],
        ['The greedy procedure finds the best possible tree.', 'It finds the best single split at each step, which is not the same thing. On the XOR four-corners data no first split reduces impurity much, yet two splits separate the classes perfectly; greedy search only gets there because it is allowed to continue.'],
        ['A decision tree can draw any boundary with a single cut.', 'Each cut is parallel to an axis. A diagonal or curved boundary, like the circle dataset, can only be approximated by a staircase of many small rectangles.'],
      ],
      id: [
        ['Akurasi latih yang lebih tinggi selalu berarti pengklasifikasi yang lebih baik.', 'Akurasi latih bisa didorong ke 100% hanya dengan menambah kedalaman, karena pohon bisa mengisolasi setiap titik di kotaknya sendiri. Yang penting adalah akurasi pada titik baru, yang tidak diukur simulasi; pohon yang lebih dangkal dengan batas yang mengikuti gerombolan biasanya menggeneralisasi lebih baik.'],
        ['Prosedur serakah menemukan pohon terbaik yang mungkin.', 'Ia menemukan pembagian tunggal terbaik pada tiap langkah, dan itu tidak sama. Pada data XOR empat sudut tidak ada pembagian pertama yang banyak menurunkan ketakmurnian, tetapi dua pembagian memisahkan kelas dengan sempurna; pencarian serakah sampai ke sana hanya karena dibolehkan melanjutkan.'],
        ['Pohon keputusan bisa menggambar batas apa pun dengan satu potongan.', 'Setiap potongan sejajar sumbu. Batas diagonal atau melengkung, seperti dataset lingkaran, hanya bisa didekati dengan pola tangga dari banyak persegi panjang kecil.'],
      ],
    },
    realWorld: {
      en: [
        'Medical triage flowcharts are decision trees: a few yes/no questions about symptoms route a patient to a level of care.',
        'Banks use tree-based models for credit decisions partly because each prediction can be explained as a short list of rules.',
        'Random forests and gradient-boosted trees, which combine hundreds of small trees, are among the most used methods for tabular data in industry and competitions.',
        'The dichotomous keys biologists use to identify plants and insects are hand-built decision trees, one feature per question.',
      ],
      id: [
        'Bagan alur triase medis adalah pohon keputusan: beberapa pertanyaan ya/tidak tentang gejala mengarahkan pasien ke tingkat perawatan tertentu.',
        'Bank memakai model berbasis pohon untuk keputusan kredit, antara lain karena setiap prediksi bisa dijelaskan sebagai daftar aturan yang pendek.',
        'Random forest dan gradient-boosted trees, yang menggabungkan ratusan pohon kecil, termasuk metode yang paling banyak dipakai untuk data tabel di industri dan kompetisi.',
        'Kunci determinasi yang dipakai ahli biologi untuk mengenali tumbuhan dan serangga adalah pohon keputusan buatan tangan, satu ciri per pertanyaan.',
      ],
    },
    questions: {
      en: [
        { q: 'A node contains 6 points of class 0 and 2 of class 1. What is its Gini impurity?', a: 'p = 2/8 = 0.25, so Gini = 2 × 0.25 × 0.75 = 0.375. A split that separated the two class-1 points from the rest would bring the weighted impurity down to 0.' },
        { q: 'On the XOR four-corners dataset, why does a tree of depth 1 score only about 50% training accuracy?', a: 'Any single axis-aligned cut puts two corners on each side, and those two corners always hold one blob of each class. Both leaves are therefore about 50/50, each predicts whichever class happens to be in the slight majority, and about half the points are wrong. A second level of splits fixes it, because inside each half a single cut now separates the two blobs.' },
        { q: 'With two blobs and 300 points, depth 2 gives 98% training accuracy and depth 10 gives 100%. Which tree would you expect to do better on new points, and why?', a: 'The depth-2 tree. The extra splits at depth 10 exist only to fence off the handful of points that fell in the overlap between the blobs. New points landing in that overlap are genuinely ambiguous, so the tiny boxes label them essentially at random, while the depth-2 boundary sits between the cluster centres where it belongs. The 2% gain is memorization, not learning.' },
      ],
      id: [
        { q: 'Sebuah simpul berisi 6 titik kelas 0 dan 2 titik kelas 1. Berapa ketakmurnian Gini-nya?', a: 'p = 2/8 = 0,25, jadi Gini = 2 × 0,25 × 0,75 = 0,375. Pembagian yang memisahkan kedua titik kelas 1 dari sisanya akan menurunkan ketakmurnian tertimbang menjadi 0.' },
        { q: 'Pada dataset XOR empat sudut, mengapa pohon berkedalaman 1 hanya mencapai akurasi latih sekitar 50%?', a: 'Potongan tunggal sejajar sumbu mana pun menempatkan dua sudut di tiap sisi, dan dua sudut itu selalu berisi satu gumpalan dari tiap kelas. Kedua daun karena itu kira-kira 50/50, masing-masing menebak kelas yang kebetulan sedikit lebih banyak, dan sekitar separuh titik salah. Tingkat pembagian kedua memperbaikinya, karena di dalam tiap separuh satu potongan kini memisahkan kedua gumpalan.' },
        { q: 'Dengan dua gumpalan dan 300 titik, kedalaman 2 memberi akurasi latih 98% dan kedalaman 10 memberi 100%. Pohon mana yang kamu duga lebih baik pada titik baru, dan mengapa?', a: 'Pohon kedalaman 2. Pembagian tambahan pada kedalaman 10 hanya ada untuk memagari segelintir titik yang jatuh di daerah tumpang tindih kedua gumpalan. Titik baru yang mendarat di daerah itu memang ambigu, sehingga kotak-kotak mungil melabelinya hampir secara acak, sedangkan batas kedalaman 2 berada di antara pusat gerombolan, tempat yang semestinya. Kenaikan 2% itu adalah hafalan, bukan belajar.' },
      ],
    },
  },
};
