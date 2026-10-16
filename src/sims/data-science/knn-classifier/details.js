// Long-form text for the sim page aside, kept out of manifest.js.
export default {
  objectives: {
    en: [
      'Explain how k-nearest neighbours classifies a new point by Euclidean distance and a majority vote among its k closest training points.',
      'Describe how the decision boundary changes with k, and link small k to overfitting and large k to underfitting.',
      'Use a train/test split to measure accuracy honestly and choose k from the test curve rather than the training curve.',
    ],
    id: [
      'Menjelaskan cara k-tetangga terdekat mengklasifikasi titik baru dengan jarak Euclid dan pemungutan suara mayoritas di antara k titik latih terdekatnya.',
      'Menjelaskan bagaimana batas keputusan berubah terhadap k, dan mengaitkan k kecil dengan overfitting serta k besar dengan underfitting.',
      'Menggunakan pembagian latih/uji untuk mengukur akurasi secara jujur dan memilih k dari kurva uji, bukan kurva latih.',
    ],
  },
  tryThis: {
    en: [
      'Set k = 1 on the overlapping dataset. Training accuracy reads 100%. Why? Now look at the test accuracy.',
      'Drag the query point onto a lone orange dot deep in blue territory. At what k does the vote flip?',
      'Choose the moons dataset and slide k from 1 to 15. Describe how the boundary shape changes.',
      'Press New sample several times at fixed k. How much does test accuracy wobble? What does that tell you about a single accuracy number?',
    ],
    id: [
      'Atur k = 1 pada dataset tumpang tindih. Akurasi latih terbaca 100%. Mengapa? Sekarang lihat akurasi ujinya.',
      'Geser titik kueri ke sebuah titik oranye yang sendirian di tengah wilayah biru. Pada k berapa suaranya berbalik?',
      'Pilih dataset bulan sabit dan geser k dari 1 ke 15. Jelaskan bagaimana bentuk batasnya berubah.',
      'Tekan Sampel baru beberapa kali pada k tetap. Seberapa besar akurasi uji bergoyang? Apa artinya bagi satu angka akurasi saja?',
    ],
  },

  learn: {
    background: {
      en: [
        'k-nearest neighbours (kNN) is the simplest classifier that actually works: it does no "training" at all beyond storing the labelled points. To classify a new point q it computes the Euclidean distance d = √((x₁−x₂)² + (y₁−y₂)²) to every stored point, keeps the k closest, and lets them vote. The majority label wins. With k = 1 the answer is simply the label of the single nearest point; with k = 15 it is the label held by at least 8 of the 15 nearest points. Odd k avoids ties in a two-class problem.',
        'The decision boundary is the set of places where the vote changes. The sim colours every cell of a grid by its predicted class, so you can see the boundary directly. For k = 1 the boundary is a jagged mosaic (a Voronoi tessellation) that wraps around every single point, including mislabelled or unlucky ones. As k grows the vote averages over a larger neighbourhood, the boundary smooths out, and isolated points stop mattering. Push k too far and the boundary ignores real structure: in the moons dataset the two crescents start to be cut by an almost straight line.',
        'To judge a classifier honestly you must test it on points it has never seen. The sim shuffles the data and keeps 70% as the training set (filled dots) and 30% as the test set (hollow dots). Accuracy = correct predictions ÷ total. Training accuracy at k = 1 is always 100%, because every training point is its own nearest neighbour; that number tells you nothing. The test accuracy is the honest one. The curve on the right plots both against k: the gap between them at small k is overfitting, and the drop in test accuracy at large k is underfitting. The best k is where the test curve peaks, and it differs between datasets.',
        'kNN has real weaknesses worth knowing. Prediction is slow because every query compares against the whole dataset (O(n) distances). Features on different scales must be normalised first, otherwise the feature with the biggest numbers dominates the distance. And in many dimensions "nearest" stops being meaningful, because all points become roughly equally far apart (the curse of dimensionality).',
      ],
      id: [
        'k-tetangga terdekat (kNN) adalah pengklasifikasi paling sederhana yang benar-benar bekerja: ia tidak melakukan "pelatihan" apa pun selain menyimpan titik-titik berlabel. Untuk mengklasifikasi titik baru q, ia menghitung jarak Euclid d = √((x₁−x₂)² + (y₁−y₂)²) ke setiap titik tersimpan, menyimpan k yang terdekat, dan membiarkan mereka memberi suara. Label mayoritas menang. Dengan k = 1 jawabannya hanyalah label satu titik terdekat; dengan k = 15 jawabannya adalah label yang dimiliki setidaknya 8 dari 15 titik terdekat. k ganjil menghindari suara seri pada masalah dua kelas.',
        'Batas keputusan adalah himpunan tempat di mana hasil suara berubah. Simulasi mewarnai setiap sel kisi menurut kelas prediksinya, sehingga kamu bisa melihat batasnya secara langsung. Untuk k = 1 batasnya berupa mosaik bergerigi (teselasi Voronoi) yang melingkupi setiap titik, termasuk titik yang salah label atau kebetulan menyimpang. Saat k bertambah, suara dirata-ratakan pada lingkungan yang lebih luas, batasnya menjadi mulus, dan titik-titik terpencil tidak lagi berpengaruh. Dorong k terlalu jauh dan batasnya mengabaikan struktur yang nyata: pada dataset bulan sabit, kedua lengkungan mulai dipotong oleh garis yang hampir lurus.',
        'Untuk menilai pengklasifikasi secara jujur, kamu harus mengujinya pada titik yang belum pernah dilihatnya. Simulasi mengocok data dan menyimpan 70% sebagai himpunan latih (titik terisi) dan 30% sebagai himpunan uji (titik berongga). Akurasi = prediksi benar ÷ total. Akurasi latih pada k = 1 selalu 100%, karena setiap titik latih adalah tetangga terdekat dirinya sendiri; angka itu tidak memberi tahu apa pun. Akurasi uji adalah yang jujur. Kurva di sebelah kanan memplot keduanya terhadap k: celah di antara keduanya pada k kecil adalah overfitting, dan penurunan akurasi uji pada k besar adalah underfitting. k terbaik berada di puncak kurva uji, dan nilainya berbeda antar dataset.',
        'kNN memiliki kelemahan nyata yang perlu diketahui. Prediksinya lambat karena setiap kueri dibandingkan dengan seluruh dataset (O(n) jarak). Ciri dengan skala berbeda harus dinormalisasi dulu, jika tidak ciri dengan angka terbesar mendominasi jarak. Dan dalam banyak dimensi, "terdekat" tidak lagi bermakna, karena semua titik menjadi hampir sama jauhnya (kutukan dimensionalitas).',
      ],
    },
    figure: {
      caption: {
        en: 'The same query point (star) with k = 1 and k = 7. With k = 1 the single nearest point, an orange outlier, decides the class. With k = 7 the vote is 5 blue to 2 orange and the outlier is overruled.',
        id: 'Titik kueri yang sama (bintang) dengan k = 1 dan k = 7. Dengan k = 1, satu titik terdekat, sebuah pencilan oranye, menentukan kelasnya. Dengan k = 7 suaranya 5 biru lawan 2 oranye dan pencilan itu kalah suara.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        const pts = [[-40, -30, 'b'], [-55, 10, 'b'], [-20, 45, 'b'], [35, -45, 'b'], [50, 20, 'b'], [10, -10, 'o'], [45, 50, 'o'], [-70, -60, 'b'], [75, -20, 'b'], [70, 65, 'o']];
        const panel = (cx, cy, k, r, title) => {
          let s = `<text x="${cx}" y="${cy - 100}" text-anchor="middle" style="font:bold 12px system-ui,sans-serif">${title}</text>`;
          s += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="currentColor" stroke-width="1" stroke-dasharray="4 3" opacity=".6"/>`;
          for (const [dx, dy, c] of pts) {
            const inside = Math.hypot(dx, dy) <= r + 0.5;
            s += `<circle cx="${cx + dx}" cy="${cy + dy}" r="6" fill="${c === 'b' ? '#3b82f6' : '#f97316'}" opacity="${inside ? 1 : 0.35}"/>`;
            if (inside) s += `<line x1="${cx}" y1="${cy}" x2="${cx + dx}" y2="${cy + dy}" stroke="currentColor" stroke-width="1" opacity=".5"/>`;
          }
          s += `<path d="M${cx} ${cy - 9} L${cx + 3} ${cy - 3} L${cx + 9} ${cy - 2} L${cx + 4} ${cy + 2} L${cx + 6} ${cy + 8} L${cx} ${cy + 5} L${cx - 6} ${cy + 8} L${cx - 4} ${cy + 2} L${cx - 9} ${cy - 2} L${cx - 3} ${cy - 3} Z" fill="#fff" stroke="currentColor" stroke-width="1"/>`;
          return s;
        };
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('kNN vote with k equal to 1 and k equal to 7', 'Pemungutan suara kNN dengan k sama dengan 1 dan k sama dengan 7')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}</style>
  ${panel(90, 125, 1, 15, 'k = 1')}
  ${panel(270, 125, 7, 62, 'k = 7')}
  <text x="90" y="226" text-anchor="middle" fill="#f97316">${L('vote 0 : 1 → orange', 'suara 0 : 1 → oranye')}</text>
  <text x="270" y="226" text-anchor="middle" fill="#3b82f6">${L('vote 5 : 2 → blue', 'suara 5 : 2 → biru')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'kNN stores the training data and classifies by a majority vote among the k nearest points (Euclidean distance).',
        'Small k gives a jagged boundary that follows every point: low bias, high variance, overfitting.',
        'Large k gives a smooth boundary that may ignore real structure: high bias, low variance, underfitting.',
        'Training accuracy at k = 1 is always 100% and is meaningless; only accuracy on held-out test data counts.',
        'Choose k where the test-accuracy curve peaks; the best k depends on the dataset and on how noisy it is.',
        'Distances only make sense if features are on comparable scales.',
      ],
      id: [
        'kNN menyimpan data latih dan mengklasifikasi dengan suara mayoritas di antara k titik terdekat (jarak Euclid).',
        'k kecil memberi batas bergerigi yang mengikuti setiap titik: bias rendah, variansi tinggi, overfitting.',
        'k besar memberi batas mulus yang bisa mengabaikan struktur nyata: bias tinggi, variansi rendah, underfitting.',
        'Akurasi latih pada k = 1 selalu 100% dan tidak bermakna; hanya akurasi pada data uji yang disisihkan yang berarti.',
        'Pilih k di puncak kurva akurasi uji; k terbaik bergantung pada dataset dan tingkat kebisingannya.',
        'Jarak hanya bermakna jika ciri-ciri berada pada skala yang sebanding.',
      ],
    },
    vocabulary: {
      en: [
        ['Euclidean distance', 'The straight-line distance between two points: √((x₁−x₂)² + (y₁−y₂)²).'],
        ['Decision boundary', 'The curve separating regions where the classifier predicts different classes.'],
        ['Train/test split', 'Dividing the labelled data into a part used to build the model and a held-out part used only to measure it.'],
        ['Accuracy', 'Number of correct predictions divided by the number of predictions, usually given as a percentage.'],
        ['Overfitting', 'A model that fits the training data, including its noise, so closely that it predicts new data badly.'],
        ['Underfitting', 'A model too simple to capture the real pattern, so it is wrong on training and test data alike.'],
        ['Hyperparameter', 'A setting chosen by the data scientist rather than learned from data, such as k.'],
      ],
      id: [
        ['Jarak Euclid', 'Jarak garis lurus antara dua titik: √((x₁−x₂)² + (y₁−y₂)²).'],
        ['Batas keputusan', 'Kurva yang memisahkan daerah tempat pengklasifikasi memprediksi kelas yang berbeda.'],
        ['Pembagian latih/uji', 'Membagi data berlabel menjadi bagian untuk membangun model dan bagian yang disisihkan hanya untuk mengukurnya.'],
        ['Akurasi', 'Jumlah prediksi benar dibagi jumlah prediksi, biasanya dalam persen.'],
        ['Overfitting', 'Model yang mengikuti data latih, termasuk kebisingannya, begitu ketat sehingga buruk memprediksi data baru.'],
        ['Underfitting', 'Model yang terlalu sederhana untuk menangkap pola nyata, sehingga salah pada data latih maupun data uji.'],
        ['Hiperparameter', 'Pengaturan yang dipilih oleh ilmuwan data, bukan dipelajari dari data, misalnya k.'],
      ],
    },
    misconceptions: {
      en: [
        ['100% training accuracy means the model is perfect.', 'At k = 1 every training point is its own nearest neighbour, so training accuracy is 100% by construction. Only test accuracy measures how well the model generalises.'],
        ['A bigger k is always safer.', 'Beyond the sweet spot a larger k blurs real structure. On the moons data, k = 15 starts to cut the crescents with a straight line and test accuracy falls.'],
        ['kNN "learns" a rule during training.', 'It learns nothing; it memorises. All the work happens at prediction time, which is why kNN is slow for large datasets.'],
      ],
      id: [
        ['Akurasi latih 100% berarti modelnya sempurna.', 'Pada k = 1 setiap titik latih adalah tetangga terdekat dirinya sendiri, jadi akurasi latih 100% secara otomatis. Hanya akurasi uji yang mengukur seberapa baik model menggeneralisasi.'],
        ['k yang lebih besar selalu lebih aman.', 'Melewati titik terbaiknya, k yang lebih besar mengaburkan struktur nyata. Pada data bulan sabit, k = 15 mulai memotong lengkungan dengan garis lurus dan akurasi uji turun.'],
        ['kNN "mempelajari" aturan saat pelatihan.', 'Ia tidak mempelajari apa pun; ia menghafal. Semua pekerjaan terjadi saat prediksi, itulah sebabnya kNN lambat untuk dataset besar.'],
      ],
    },
    realWorld: {
      en: [
        'Recommender systems ("people who bought this also bought…") find the k users most similar to you and vote on what to suggest.',
        'Handwritten digit recognition with kNN on the MNIST dataset reaches about 97% accuracy with k around 3 to 5.',
        'Medical diagnosis tools compare a new patient\'s measurements with the k most similar past patients.',
        'Land-use mapping from satellite images classifies each pixel by the labelled pixels with the most similar colour signature.',
      ],
      id: [
        'Sistem rekomendasi ("orang yang membeli ini juga membeli…") mencari k pengguna yang paling mirip denganmu dan memilih apa yang disarankan.',
        'Pengenalan angka tulisan tangan dengan kNN pada dataset MNIST mencapai akurasi sekitar 97% dengan k sekitar 3 sampai 5.',
        'Alat diagnosis medis membandingkan hasil pengukuran pasien baru dengan k pasien lama yang paling mirip.',
        'Pemetaan tata guna lahan dari citra satelit mengklasifikasi setiap piksel menurut piksel berlabel dengan tanda warna yang paling mirip.',
      ],
    },
    questions: {
      en: [
        { q: 'A query point has nearest neighbours with labels B, O, B, O, O, B, B (closest first). What does kNN predict for k = 1, k = 3 and k = 7?', a: 'k = 1: B (the nearest). k = 3: B, O, B → 2 B vs 1 O → B. k = 7: 4 B vs 3 O → B. Note that k = 5 would give 2 B vs 3 O → O, so the answer can flip with k.' },
        { q: 'On the overlapping dataset, training accuracy is 100% at k = 1 but test accuracy is about 75%. Which number should you report, and what is the gap called?', a: 'Report the test accuracy. The 25-point gap is overfitting: the k = 1 model memorised noise in the training points that does not repeat in new data.' },
        { q: 'Two features are height in centimetres (150–190) and shoe size (36–46). Why would kNN on raw values be a poor idea?', a: 'The height differences are several times larger than the shoe-size differences, so distance is almost entirely decided by height and shoe size is effectively ignored. Normalise each feature (for example to 0–1 or to z-scores) first.' },
      ],
      id: [
        { q: 'Sebuah titik kueri memiliki tetangga terdekat berlabel B, O, B, O, O, B, B (terdekat lebih dulu). Apa prediksi kNN untuk k = 1, k = 3 dan k = 7?', a: 'k = 1: B (yang terdekat). k = 3: B, O, B → 2 B lawan 1 O → B. k = 7: 4 B lawan 3 O → B. Perhatikan bahwa k = 5 memberi 2 B lawan 3 O → O, jadi jawabannya bisa berbalik tergantung k.' },
        { q: 'Pada dataset tumpang tindih, akurasi latih 100% pada k = 1 tetapi akurasi uji sekitar 75%. Angka mana yang harus dilaporkan, dan apa nama celahnya?', a: 'Laporkan akurasi uji. Celah 25 poin itu adalah overfitting: model k = 1 menghafal kebisingan pada titik latih yang tidak terulang pada data baru.' },
        { q: 'Dua ciri adalah tinggi badan dalam sentimeter (150–190) dan ukuran sepatu (36–46). Mengapa kNN pada nilai mentah adalah ide yang buruk?', a: 'Selisih tinggi badan beberapa kali lebih besar daripada selisih ukuran sepatu, sehingga jarak hampir sepenuhnya ditentukan oleh tinggi badan dan ukuran sepatu praktis diabaikan. Normalisasi setiap ciri dulu (misalnya ke 0–1 atau skor-z).' },
      ],
    },
  },
};
