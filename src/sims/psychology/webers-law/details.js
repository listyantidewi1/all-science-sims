// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Define the just-noticeable difference and explain how a staircase procedure measures it.',
      "State Weber's law ΔI = kI and interpret the Weber fraction k.",
      'Compare Weber fractions across stimulus dimensions (length vs area).',
    ],
    id: [
      'Mendefinisikan perbedaan yang baru terasa dan menjelaskan cara prosedur tangga mengukurnya.',
      'Menyatakan hukum Weber ΔI = kI dan menafsirkan pecahan Weber k.',
      'Membandingkan pecahan Weber antar dimensi stimulus (panjang vs luas).',
    ],
  },
  tryThis: {
    en: [
      'Answer 40 trials honestly, then read the fitted Weber fraction. Is JND proportional to size?',
      'Switch from lines to circles and run 40 more trials — is k larger or smaller for area?',
      'Use the simulated observer with k = 0.05 and 0.20 and compare the slopes of the fitted lines.',
    ],
    id: [
      'Jawab 40 percobaan dengan jujur, lalu baca pecahan Weber hasil kecocokan. Apakah JND sebanding dengan ukuran?',
      'Ganti dari garis ke lingkaran dan jalankan 40 percobaan lagi — apakah k lebih besar atau lebih kecil untuk luas?',
      'Gunakan pengamat simulasi dengan k = 0,05 dan 0,20 dan bandingkan kemiringan garis kecocokannya.',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'Hold a 100 g weight in one hand and a 105 g weight in the other and you can probably tell which is heavier. Hold 1000 g and 1005 g and you cannot, even though the difference is the same 5 g. The smallest difference you can detect is called the just-noticeable difference (JND, or difference threshold), and in the 1830s Ernst Heinrich Weber discovered that it is not a fixed amount: it grows in proportion to the size of the stimulus. Written as a formula, ΔI = k × I, where I is the intensity of the standard stimulus, ΔI is the JND and k is a constant for that kind of stimulus, the Weber fraction. Equivalently, ΔI / I = k: what matters is the ratio, not the difference.',
        'The Weber fraction says how sensitive we are to a given dimension. Textbook values are around 2% for lifted weight, about 8% for light intensity and only about 0.3% for the pitch of a tone, so we notice a 1 Hz change in a 300 Hz tone but need two lamps to differ by nearly a tenth before one looks brighter. Fechner later built on Weber\'s law to argue that the sensation we experience grows with the logarithm of the physical intensity, which is why sound is measured in decibels and star brightness in magnitudes.',
        'The simulation measures your own JND for line length or circle area at four standard sizes (40, 80, 120 and 160 units). On each trial two stimuli appear; one is the standard and the other is larger by the current ΔI, and you say which is bigger. An adaptive staircase then homes in on your threshold: after two correct answers in a row ΔI shrinks by 20%, after one wrong answer it grows by 25%. This "one-up, two-down" rule converges on the difference you get right about 71% of the time. Each change of direction is a reversal, and the JND estimate is the average of the last six reversal values. The four staircases are interleaved so you cannot predict which standard comes next, and the chart plots JND against I and fits a straight line through the origin; its slope is your Weber fraction k.',
        'Several things are simplified. Pressing Same counts as a wrong answer, which forces a choice and keeps the staircase moving. The simulated observer perceives each stimulus with random noise proportional to k × I, so it obeys Weber\'s law exactly by construction: auto-answering checks that the staircase recovers the k you set, not that the law is true. Real Weber fractions depart from a constant at very small intensities, where a fixed amount of sensory noise adds to the JND, and at extremes of the range; the fit through the origin assumes this does not happen. Finally, a JND built from a handful of reversals is noisy, so expect the dots to scatter around the line.',
      ],
      id: [
        'Pegang beban 100 g di satu tangan dan 105 g di tangan lain, kamu mungkin bisa menentukan mana yang lebih berat. Pegang 1000 g dan 1005 g, kamu tidak bisa, meskipun selisihnya sama-sama 5 g. Selisih terkecil yang bisa kamu deteksi disebut perbedaan yang baru terasa (JND, atau ambang beda), dan pada 1830-an Ernst Heinrich Weber menemukan bahwa nilainya bukan jumlah tetap: ia tumbuh sebanding dengan ukuran stimulus. Dalam rumus, ΔI = k × I, dengan I intensitas stimulus standar, ΔI adalah JND, dan k konstanta untuk jenis stimulus itu, yaitu pecahan Weber. Setara dengan itu, ΔI / I = k: yang penting adalah rasionya, bukan selisihnya.',
        'Pecahan Weber menyatakan seberapa peka kita terhadap suatu dimensi. Nilai buku teks sekitar 2% untuk beban yang diangkat, sekitar 8% untuk intensitas cahaya, dan hanya sekitar 0,3% untuk tinggi nada, sehingga kita menyadari perubahan 1 Hz pada nada 300 Hz tetapi dua lampu harus berbeda hampir sepersepuluh sebelum salah satunya terlihat lebih terang. Fechner kemudian membangun di atas hukum Weber untuk berargumen bahwa sensasi yang kita alami tumbuh mengikuti logaritma intensitas fisik, itulah mengapa bunyi diukur dalam desibel dan kecerlangan bintang dalam magnitudo.',
        'Simulasi mengukur JND-mu sendiri untuk panjang garis atau luas lingkaran pada empat ukuran standar (40, 80, 120, dan 160 satuan). Pada tiap percobaan muncul dua stimulus; satu adalah standar dan yang lain lebih besar sebesar ΔI saat itu, dan kamu menjawab mana yang lebih besar. Tangga adaptif lalu mendekati ambangmu: setelah dua jawaban benar berturut-turut ΔI menyusut 20%, setelah satu jawaban salah ΔI membesar 25%. Aturan "satu-naik, dua-turun" ini konvergen ke selisih yang kamu jawab benar sekitar 71% dari waktu. Setiap perubahan arah adalah pembalikan, dan perkiraan JND adalah rata-rata enam nilai pembalikan terakhir. Keempat tangga diselang-seling agar kamu tidak bisa menebak standar mana yang muncul berikutnya, dan grafik memplot JND terhadap I serta mencocokkan garis lurus melalui titik asal; kemiringannya adalah pecahan Weber k milikmu.',
        'Beberapa hal disederhanakan. Menekan Same dihitung sebagai jawaban salah, yang memaksa pilihan dan menjaga tangga tetap bergerak. Pengamat simulasi mempersepsi tiap stimulus dengan derau acak yang sebanding dengan k × I, sehingga ia mematuhi hukum Weber dengan sendirinya: menjawab otomatis hanya mengecek bahwa tangga memulihkan k yang kamu atur, bukan membuktikan hukumnya benar. Pecahan Weber sungguhan menyimpang dari konstanta pada intensitas yang sangat kecil, ketika derau sensorik yang tetap menambah JND, dan pada ujung-ujung rentang; kecocokan melalui titik asal mengasumsikan hal itu tidak terjadi. Terakhir, JND yang dibangun dari segelintir pembalikan itu berisik, jadi wajar jika titik-titiknya tersebar di sekitar garis.',
      ],
    },
    figure: {
      caption: {
        en: 'Weber\'s law: the just-noticeable difference ΔI grows in proportion to the standard I, so the points fall on a straight line through the origin with slope k. A 10% difference is just detectable whether the lines are short or long.',
        id: 'Hukum Weber: perbedaan yang baru terasa ΔI tumbuh sebanding dengan standar I, sehingga titik-titiknya jatuh pada garis lurus melalui titik asal dengan kemiringan k. Selisih 10% baru terdeteksi baik untuk garis pendek maupun panjang.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('JND against stimulus intensity with example line pairs', 'JND terhadap intensitas stimulus dengan contoh pasangan garis')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.s{font-size:10px}.ax{stroke:currentColor;stroke-width:1.2;fill:none}.g{stroke:currentColor;stroke-width:.6;opacity:.3}.ln{stroke:currentColor;stroke-width:3}</style>
  <rect x="50" y="36" width="180" height="154" class="ax"/>
  <line x1="50" y1="120" x2="230" y2="120" class="g"/>
  <line x1="140" y1="36" x2="140" y2="190" class="g"/>
  <text x="46" y="204" class="s">0</text>
  <text x="80" y="204" class="s">40</text>
  <text x="116" y="204" class="s">80</text>
  <text x="150" y="204" class="s">120</text>
  <text x="186" y="204" class="s">160</text>
  <text x="222" y="204" class="s">200</text>
  <text x="90" y="222">${L('standard intensity I', 'intensitas standar I')}</text>
  <text x="30" y="124" class="s">10</text>
  <text x="30" y="54" class="s">20</text>
  <text x="14" y="130" class="s" transform="rotate(-90 14 130)">${L('JND (ΔI)', 'JND (ΔI)')}</text>
  <line x1="50" y1="190" x2="230" y2="50" stroke="#3b82f6" stroke-width="2"/>
  <circle cx="86" cy="164.8" r="4.5" fill="#f59e0b"/>
  <circle cx="122" cy="131.2" r="4.5" fill="#f59e0b"/>
  <circle cx="158" cy="108.8" r="4.5" fill="#f59e0b"/>
  <circle cx="194" cy="75.2" r="4.5" fill="#f59e0b"/>
  <text x="56" y="50" fill="#3b82f6" font-weight="bold">ΔI = k · I</text>
  <text x="56" y="64" fill="#3b82f6" class="s">${L('slope k = 0.10', 'kemiringan k = 0,10')}</text>
  <text x="248" y="30" class="s" font-weight="bold">${L('same ratio, same JND', 'rasio sama, JND sama')}</text>
  <line x1="256" y1="56" x2="296" y2="56" class="ln"/>
  <line x1="256" y1="70" x2="300" y2="70" class="ln" stroke="#10b981"/>
  <text x="256" y="90" class="s">I = 40, ΔI = 4</text>
  <text x="256" y="102" class="s" fill="#10b981">${L('4 longer: just visible', '4 lebih panjang: baru terlihat')}</text>
  <line x1="256" y1="130" x2="336" y2="130" class="ln"/>
  <line x1="256" y1="144" x2="344" y2="144" class="ln" stroke="#10b981"/>
  <text x="256" y="164" class="s">I = 80, ΔI = 8</text>
  <text x="256" y="176" class="s" fill="#10b981">${L('needs 8 longer now', 'kini perlu 8 lebih panjang')}</text>
  <text x="256" y="196" class="s" fill="#ef4444">${L('4 longer here would', '4 lebih panjang di sini')}</text>
  <text x="256" y="208" class="s" fill="#ef4444">${L('not be noticed', 'tidak akan terasa')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'The just-noticeable difference is the smallest change in a stimulus that a person can detect reliably.',
        'Weber\'s law: the JND is a constant fraction of the standard, ΔI = k × I, so bigger stimuli need bigger changes to be noticed.',
        'The Weber fraction k differs between senses and dimensions; a smaller k means finer discrimination.',
        'A staircase procedure finds the threshold efficiently by shrinking the difference after correct answers and enlarging it after errors.',
        'Plotting JND against I gives a straight line through the origin whose slope is k; the sim fits this line to your four thresholds.',
      ],
      id: [
        'Perbedaan yang baru terasa adalah perubahan terkecil pada stimulus yang dapat dideteksi seseorang secara andal.',
        'Hukum Weber: JND adalah fraksi tetap dari standar, ΔI = k × I, sehingga stimulus yang lebih besar memerlukan perubahan lebih besar agar terasa.',
        'Pecahan Weber k berbeda antar indra dan dimensi; k yang lebih kecil berarti diskriminasi yang lebih halus.',
        'Prosedur tangga menemukan ambang secara efisien dengan memperkecil selisih setelah jawaban benar dan memperbesarnya setelah kesalahan.',
        'Memplot JND terhadap I menghasilkan garis lurus melalui titik asal dengan kemiringan k; simulasi mencocokkan garis ini dengan empat ambangmu.',
      ],
    },
    vocabulary: {
      en: [
        ['Psychophysics', 'The study of how physical stimulus intensity relates to the sensations it produces.'],
        ['Just-noticeable difference (JND)', 'The smallest difference between two stimuli that can be detected a set proportion of the time; also called the difference threshold.'],
        ['Weber\'s law', 'The rule that the JND is proportional to the standard intensity: ΔI = k × I.'],
        ['Weber fraction (k)', 'The constant ratio ΔI / I for a given sense; about 0.02 for weight and 0.08 for brightness.'],
        ['Standard stimulus', 'The fixed reference stimulus against which the comparison stimulus is judged.'],
        ['Staircase procedure', 'An adaptive method that adjusts the difference up after errors and down after correct answers to find the threshold.'],
        ['Reversal', 'A point where the staircase changes direction; thresholds are estimated by averaging reversal values.'],
        ['Fechner\'s law', 'The later proposal that perceived sensation grows with the logarithm of physical intensity, derived from Weber\'s law.'],
      ],
      id: [
        ['Psikofisika', 'Kajian tentang hubungan antara intensitas fisik stimulus dan sensasi yang ditimbulkannya.'],
        ['Perbedaan yang baru terasa (JND)', 'Selisih terkecil antara dua stimulus yang dapat dideteksi dengan proporsi tertentu; disebut juga ambang beda.'],
        ['Hukum Weber', 'Aturan bahwa JND sebanding dengan intensitas standar: ΔI = k × I.'],
        ['Pecahan Weber (k)', 'Rasio tetap ΔI / I untuk suatu indra; sekitar 0,02 untuk berat dan 0,08 untuk kecerlangan.'],
        ['Stimulus standar', 'Stimulus acuan tetap yang menjadi pembanding bagi stimulus perbandingan.'],
        ['Prosedur tangga', 'Metode adaptif yang menaikkan selisih setelah kesalahan dan menurunkannya setelah jawaban benar untuk menemukan ambang.'],
        ['Pembalikan', 'Titik ketika tangga berganti arah; ambang diperkirakan dengan merata-ratakan nilai-nilai pembalikan.'],
        ['Hukum Fechner', 'Usulan berikutnya bahwa sensasi yang dirasakan tumbuh mengikuti logaritma intensitas fisik, diturunkan dari hukum Weber.'],
      ],
    },
    misconceptions: {
      en: [
        ['If I can detect a 5 g difference at 100 g, I can detect 5 g at any weight.', 'Detection depends on the ratio. At 100 g, 5 g is 5%; at 1000 g it is only 0.5%, well below the roughly 2% Weber fraction for weight, so it goes unnoticed. You would need about 20 g.'],
        ['The JND is a sharp boundary: below it you never notice, above it you always do.', 'Detection is probabilistic. The JND is defined at a chosen performance level, here about 71% correct, and a slightly smaller difference is still detected sometimes, a slightly larger one is still missed sometimes.'],
        ['Weber\'s law holds exactly for every intensity.', 'It holds well over the middle of the range but fails near the absolute threshold, where a fixed amount of sensory noise makes the JND larger than k × I, and often at the very top of the range.'],
        ['If the simulated observer\'s points fall on a straight line, that proves Weber\'s law.', 'The simulated observer is programmed with noise proportional to I, so its straight line is built in. Only data from real observers, including you, can test the law.'],
      ],
      id: [
        ['Kalau bisa mendeteksi selisih 5 g pada 100 g, aku bisa mendeteksi 5 g pada berat apa pun.', 'Deteksi bergantung pada rasio. Pada 100 g, 5 g adalah 5%; pada 1000 g hanya 0,5%, jauh di bawah pecahan Weber sekitar 2% untuk berat, sehingga tidak terasa. Kamu butuh sekitar 20 g.'],
        ['JND adalah batas tegas: di bawahnya tidak pernah terasa, di atasnya selalu terasa.', 'Deteksi bersifat probabilistik. JND didefinisikan pada tingkat kinerja tertentu, di sini sekitar 71% benar, dan selisih yang sedikit lebih kecil masih kadang terdeteksi, yang sedikit lebih besar masih kadang terlewat.'],
        ['Hukum Weber berlaku persis untuk setiap intensitas.', 'Hukum ini berlaku baik di bagian tengah rentang tetapi gagal dekat ambang absolut, ketika derau sensorik yang tetap membuat JND lebih besar daripada k × I, dan sering kali di ujung atas rentang.'],
        ['Kalau titik-titik pengamat simulasi jatuh pada garis lurus, itu membuktikan hukum Weber.', 'Pengamat simulasi diprogram dengan derau yang sebanding dengan I, sehingga garis lurusnya sudah tertanam. Hanya data dari pengamat sungguhan, termasuk kamu, yang dapat menguji hukum itu.'],
      ],
    },
    realWorld: {
      en: [
        'Price perception follows Weber\'s law: a Rp 5,000 discount feels significant on a Rp 50,000 item but invisible on a Rp 5,000,000 phone, so shops quote percentages for expensive goods.',
        'Audio volume controls and the decibel scale are logarithmic because equal ratios of sound pressure, not equal differences, sound like equal steps in loudness.',
        'Food manufacturers can reduce sugar or salt by a few percent at a time without customers noticing, as long as each step stays below the Weber fraction for taste.',
        'Display and camera engineers use JND measurements to decide how many brightness levels a screen needs: steps smaller than one JND are wasted.',
      ],
      id: [
        'Persepsi harga mengikuti hukum Weber: diskon Rp5.000 terasa berarti pada barang Rp50.000 tetapi tak terlihat pada ponsel Rp5.000.000, sehingga toko memakai persentase untuk barang mahal.',
        'Pengatur volume audio dan skala desibel bersifat logaritmik karena rasio tekanan bunyi yang sama, bukan selisih yang sama, terdengar sebagai langkah kenyaringan yang sama.',
        'Produsen makanan dapat mengurangi gula atau garam beberapa persen sekaligus tanpa disadari pelanggan, selama tiap langkah tetap di bawah pecahan Weber untuk rasa.',
        'Insinyur layar dan kamera memakai pengukuran JND untuk menentukan berapa tingkat kecerlangan yang dibutuhkan layar: langkah yang lebih kecil dari satu JND hanya sia-sia.',
      ],
    },
    questions: {
      en: [
        { q: 'Your staircase finds a JND of 4 units at a standard of 40. If Weber\'s law holds, what JND should the staircase find at a standard of 160?', a: 'About 16 units. The Weber fraction is k = 4 / 40 = 0.10, and ΔI = k × I = 0.10 × 160 = 16. The difference needed to be noticed is four times larger because the standard is four times larger.' },
        { q: 'The four JND estimates come out as 3.6, 8.4, 11.6 and 16.4 at standards 40, 80, 120 and 160. What Weber fraction does the sim\'s line through the origin report?', a: 'The sim fits k = Σ(ΔI × I) / Σ(I²) = (144 + 672 + 1392 + 2624) / (1600 + 6400 + 14400 + 25600) = 4832 / 48000 ≈ 0.10. The individual ratios (0.09, 0.105, 0.097, 0.103) scatter around this value, which is normal for threshold estimates built from a few reversals.' },
        { q: 'Why does the staircase shrink ΔI only after two correct answers in a row, but enlarge it after a single error?', a: 'With two stimuli to choose from, a guess is right half the time, so one correct answer is weak evidence that the difference is visible, while one error is strong evidence that it is too small. Requiring two correct answers before making the task harder balances these, and the rule settles at the difference you get right about 71% of the time, which is the sim\'s definition of the JND.' },
      ],
      id: [
        { q: 'Tanggamu menemukan JND 4 satuan pada standar 40. Jika hukum Weber berlaku, berapa JND yang seharusnya ditemukan tangga pada standar 160?', a: 'Sekitar 16 satuan. Pecahan Weber-nya k = 4 / 40 = 0,10, dan ΔI = k × I = 0,10 × 160 = 16. Selisih yang diperlukan agar terasa empat kali lebih besar karena standarnya empat kali lebih besar.' },
        { q: 'Empat perkiraan JND keluar sebagai 3,6; 8,4; 11,6; dan 16,4 pada standar 40, 80, 120, dan 160. Berapa pecahan Weber yang dilaporkan garis simulasi melalui titik asal?', a: 'Simulasi mencocokkan k = Σ(ΔI × I) / Σ(I²) = (144 + 672 + 1392 + 2624) / (1600 + 6400 + 14400 + 25600) = 4832 / 48000 ≈ 0,10. Rasio individualnya (0,09; 0,105; 0,097; 0,103) tersebar di sekitar nilai ini, yang wajar untuk perkiraan ambang dari beberapa pembalikan saja.' },
        { q: 'Mengapa tangga memperkecil ΔI hanya setelah dua jawaban benar berturut-turut, tetapi memperbesarnya setelah satu kesalahan saja?', a: 'Dengan dua stimulus untuk dipilih, tebakan benar separuh dari waktu, sehingga satu jawaban benar adalah bukti lemah bahwa selisihnya terlihat, sementara satu kesalahan adalah bukti kuat bahwa selisihnya terlalu kecil. Mensyaratkan dua jawaban benar sebelum mempersulit tugas menyeimbangkan keduanya, dan aturan ini menetap pada selisih yang kamu jawab benar sekitar 71% dari waktu, yaitu definisi JND dalam simulasi.' },
      ],
    },
  },
};
