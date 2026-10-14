// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'See lag introduced by larger windows.',
      'Compare moving-average vs EMA characteristics.',
      "Recognize a smoothing trade-off: noise rejection vs responsiveness.",
    ],
    id: [
      'Melihat lag yang diperkenalkan oleh jendela yang lebih besar.',
      'Membandingkan ciri rata-rata bergerak vs EMA.',
      'Mengenali trade-off penghalusan: penolakan derau vs responsivitas.',
    ],
  },
  tryThis: {
    en: [
      'Turn on Trailing moving average, then compare window 5 vs 20 — does lag increase?',
      'EMA α = 0.05 — very smooth but laggy?',
      'Add a step function — see how each smoother reacts.',
    ],
    id: [
      'Nyalakan rata-rata bergerak membuntut, lalu bandingkan jendela 5 vs 20 — apakah lag meningkat?',
      'EMA α = 0,05 — sangat halus tapi lag besar?',
      'Tambahkan fungsi langkah — amati reaksi tiap penghalus.',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'A time series is a list of measurements in time order: daily temperatures, hourly website visits, a sensor read 100 times a second. Real measurements are usually a smooth underlying signal plus noise that jumps around from one reading to the next. Smoothing tries to recover the signal by averaging each reading with its neighbours: the signal changes little between neighbours, so it survives the average, while independent noise partly cancels. Averaging w independent noisy values shrinks the noise by a factor of about 1/√w. The price is that anything in the signal sharper than the averaging span, a sudden step or a narrow peak, gets blurred too. That is the trade-off between noise rejection and responsiveness.',
        'The sim offers two smoothers. The moving average with window w replaces each point by the mean of the w nearest readings. The sim centres the window, using about half the readings before the point and half after, and shrinks it near the ends of the series. Because it looks both ways, it does not shift features in time, but it turns a step into a ramp w samples wide and lowers any peak narrower than w. The Trailing toggle switches it to a one-sided window of the last w readings, the version a live system can run: it smooths just as much, but every feature arrives about w/2 samples late. The exponential moving average (EMA) is a running update: new estimate = α × newest reading + (1 − α) × previous estimate, started at the first reading. Each reading\'s weight decays geometrically as it ages, so the EMA has an effective memory of roughly 2/α − 1 samples; α = 0.2 remembers about 9 readings. It uses only past values, so it could run live, but that is also why it lags: after a step it has covered only 63% of the jump after about 1/α samples.',
        'The underlying-signal selector chooses the hidden truth, drawn in yellow when the toggle is on. The sine plus trend shows peaks being shaved by the moving average and shifted right by the EMA. The step function is the cleanest test of blur versus lag. The random walk is a trap: the truth itself wanders randomly, so there is no smooth signal to recover, and every smoother simply trails it. Noise σ sets the size of the random scatter and "Resample noise" draws a new set of it, which is a good way to see which features are real and which are luck. The window and α sliders adjust the two smoothers independently.',
        'The sim simplifies in several ways. Its default centred moving average needs future readings, so it is an offline filter; the trailing option shows what a live filter of the same width gives up, a lag of about w/2 samples. There is no numeric error score, so you judge the fit by eye against the yellow truth. A Savitzky–Golay filter, which fits a small polynomial inside each window and keeps peak heights better than a plain mean, is not included. Both smoothers assume the noise is independent from reading to reading and roughly constant in size; noise that is itself correlated, like the random walk, is not removed by averaging.',
      ],
      id: [
        'Deret waktu adalah daftar pengukuran menurut urutan waktu: suhu harian, kunjungan situs per jam, sensor yang dibaca 100 kali per detik. Pengukuran nyata biasanya berupa sinyal dasar yang mulus ditambah derau yang melompat-lompat dari satu bacaan ke bacaan berikutnya. Penghalusan mencoba memulihkan sinyal dengan merata-ratakan tiap bacaan bersama tetangganya: sinyal hanya sedikit berubah antar-tetangga sehingga bertahan dalam rata-rata, sedangkan derau yang saling bebas sebagian saling meniadakan. Merata-ratakan w nilai berderau yang saling bebas mengecilkan derau dengan faktor sekitar 1/√w. Harganya, apa pun dalam sinyal yang lebih tajam daripada rentang rata-rata, seperti lonjakan mendadak atau puncak sempit, ikut kabur. Itulah pertukaran antara penolakan derau dan daya tanggap.',
        'Simulasi menyediakan dua penghalus. Rata-rata bergerak dengan jendela w mengganti tiap titik dengan rata-rata dari w bacaan terdekat. Simulasi memusatkan jendela, memakai sekitar separuh bacaan sebelum titik dan separuh sesudahnya, dan menyusutkannya di dekat ujung deret. Karena melihat ke dua arah, ia tidak menggeser fitur dalam waktu, tetapi mengubah langkah menjadi landaian selebar w sampel dan merendahkan puncak yang lebih sempit dari w. Sakelar membuntut (trailing) mengubahnya menjadi jendela satu sisi berisi w bacaan terakhir, versi yang bisa dijalankan sistem langsung: penghalusannya sama besar, tetapi setiap fitur tiba sekitar w/2 sampel terlambat. Rata-rata bergerak eksponensial (EMA) adalah pembaruan berjalan: taksiran baru = α × bacaan terbaru + (1 − α) × taksiran sebelumnya, dimulai dari bacaan pertama. Bobot tiap bacaan menyusut secara geometris seiring usianya, sehingga EMA punya ingatan efektif sekitar 2/α − 1 sampel; α = 0,2 mengingat sekitar 9 bacaan. EMA hanya memakai nilai lampau sehingga bisa dijalankan langsung, tetapi itu pula sebabnya ia tertinggal: setelah sebuah langkah, ia baru menempuh 63% lonjakan setelah sekitar 1/α sampel.',
        'Pilihan sinyal dasar menentukan kebenaran tersembunyi, yang digambar kuning saat sakelarnya menyala. Sinus plus tren memperlihatkan puncak yang dipangkas rata-rata bergerak dan digeser ke kanan oleh EMA. Fungsi langkah adalah uji paling bersih untuk membedakan kabur dan tertinggal. Jalan acak adalah jebakan: kebenarannya sendiri berkelana secara acak, sehingga tidak ada sinyal mulus yang bisa dipulihkan dan setiap penghalus hanya membuntutinya. Derau σ mengatur besar sebaran acak dan "Resample noise" menarik derau baru, cara yang baik untuk melihat fitur mana yang nyata dan mana yang kebetulan. Slider jendela dan α mengatur kedua penghalus secara terpisah.',
        'Simulasi menyederhanakan beberapa hal. Rata-rata bergerak terpusat bawaannya membutuhkan bacaan masa depan, jadi ini filter luring; pilihan membuntut memperlihatkan apa yang dikorbankan filter langsung dengan lebar yang sama, yaitu lag sekitar w/2 sampel. Tidak ada skor galat numerik, sehingga kecocokan dinilai dengan mata terhadap garis kuning. Filter Savitzky–Golay, yang mencocokkan polinomial kecil di dalam tiap jendela dan menjaga tinggi puncak lebih baik daripada rata-rata biasa, tidak disertakan. Kedua penghalus mengasumsikan derau saling bebas antar-bacaan dan ukurannya kira-kira tetap; derau yang berkorelasi dengan dirinya sendiri, seperti jalan acak, tidak hilang dengan dirata-ratakan.',
      ],
    },
    figure: {
      caption: {
        en: 'Response of the two smoothers to a clean step. The centred moving average (w = 20) blurs the step into a ramp but stays centred on it; the EMA (α = 0.2) reacts only after the step and reaches 63% of the jump about 5 samples later.',
        id: 'Respons kedua penghalus terhadap langkah bersih. Rata-rata bergerak terpusat (w = 20) mengaburkan langkah menjadi landaian tetapi tetap berpusat padanya; EMA (α = 0,2) baru bereaksi setelah langkah dan mencapai 63% lonjakan sekitar 5 sampel kemudian.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        const N = 100, step = 50, w = 20, alpha = 0.2;
        const truth = Array.from({ length: N }, (_, i) => (i < step ? -0.5 : 0.5));
        const X = (i) => 30 + (i / (N - 1)) * 300, Y = (v) => 120 - v * 110;
        const ma = truth.map((_, i) => {
          const lo = Math.max(0, i - w / 2), hi = Math.min(N, i + w / 2);
          let s = 0; for (let j = lo; j < hi; j++) s += truth[j]; return s / (hi - lo);
        });
        const ema = []; let s = truth[0];
        for (let i = 0; i < N; i++) { s = alpha * truth[i] + (1 - alpha) * s; ema.push(s); }
        const path = (arr) => arr.map((v, i) => `${i ? 'L' : 'M'}${X(i).toFixed(1)} ${Y(v).toFixed(1)}`).join(' ');
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Moving average and EMA response to a step', 'Respons rata-rata bergerak dan EMA terhadap langkah')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.m{fill:none;stroke:currentColor;stroke-width:1;opacity:.45}.s{font-size:10px;opacity:.8}</style>
  <line x1="30" y1="200" x2="330" y2="200" class="m"/>
  <line x1="30" y1="40" x2="30" y2="200" class="m"/>
  <text x="330" y="214" text-anchor="end" class="s">${L('time (samples)', 'waktu (sampel)')}</text>
  <path d="${path(truth)}" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="5 3" opacity=".7"/>
  <path d="${path(ma)}" fill="none" stroke="#3b82f6" stroke-width="2.5"/>
  <path d="${path(ema)}" fill="none" stroke="#ef4444" stroke-width="2.5"/>
  <line x1="${X(step - w / 2)}" y1="190" x2="${X(step + w / 2)}" y2="190" stroke="#3b82f6" stroke-width="1.5"/>
  <line x1="${X(step - w / 2)}" y1="185" x2="${X(step - w / 2)}" y2="195" stroke="#3b82f6" stroke-width="1.5"/>
  <line x1="${X(step + w / 2)}" y1="185" x2="${X(step + w / 2)}" y2="195" stroke="#3b82f6" stroke-width="1.5"/>
  <text x="${X(step)}" y="184" text-anchor="middle" class="s" fill="#3b82f6">w = 20</text>
  <line x1="${X(step)}" y1="${Y(0.5)}" x2="${X(step + 5)}" y2="${Y(0.5)}" stroke="#ef4444" stroke-width="1" stroke-dasharray="2 2"/>
  <line x1="${X(step + 5)}" y1="${Y(0.5)}" x2="${X(step + 5)}" y2="${Y(ema[step + 4])}" stroke="#ef4444" stroke-width="1" stroke-dasharray="2 2"/>
  <text x="${X(step + 7)}" y="${Y(0.5) + 24}" class="s" fill="#ef4444">${L('63% after 1/α = 5 samples', '63% setelah 1/α = 5 sampel')}</text>
  <text x="34" y="52" class="s">${L('true step (dashed)', 'langkah sejati (putus-putus)')}</text>
  <text x="34" y="66" class="s" fill="#3b82f6">${L('centred moving average: blur, no lag', 'rata-rata bergerak terpusat: kabur, tanpa lag')}</text>
  <text x="34" y="80" class="s" fill="#ef4444">${L('EMA: one-sided, lags behind', 'EMA: satu sisi, tertinggal')}</text>
  <text x="18" y="${Y(0.5) + 4}" text-anchor="end" class="s">${L('+0.5', '+0,5')}</text>
  <text x="18" y="${Y(-0.5) + 4}" text-anchor="end" class="s">${L('−0.5', '−0,5')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Smoothing trades noise for blur: averaging w independent readings cuts noise by about 1/√w but smears any feature narrower than w samples.',
        'A centred moving average does not shift features in time; a one-sided filter such as the EMA, or a trailing moving average, lags behind changes.',
        'The EMA update is: new estimate = α × newest reading + (1 − α) × previous estimate; smaller α means more smoothing and more lag.',
        'An EMA with factor α has an effective memory of about 2/α − 1 samples and covers 63% of a step after about 1/α samples.',
        'No smoother can recover a signal that is itself random, such as a random walk; it can only follow it late.',
      ],
      id: [
        'Penghalusan menukar derau dengan kekaburan: merata-ratakan w bacaan yang saling bebas memangkas derau sekitar 1/√w tetapi mengaburkan fitur yang lebih sempit dari w sampel.',
        'Rata-rata bergerak terpusat tidak menggeser fitur dalam waktu; filter satu sisi seperti EMA, atau rata-rata bergerak membuntut, tertinggal dari perubahan.',
        'Pembaruan EMA: taksiran baru = α × bacaan terbaru + (1 − α) × taksiran sebelumnya; α lebih kecil berarti lebih halus dan lebih tertinggal.',
        'EMA dengan faktor α punya ingatan efektif sekitar 2/α − 1 sampel dan menempuh 63% dari sebuah langkah setelah sekitar 1/α sampel.',
        'Tidak ada penghalus yang bisa memulihkan sinyal yang memang acak, seperti jalan acak; ia hanya bisa mengikutinya dengan terlambat.',
      ],
    },
    vocabulary: {
      en: [
        ['Time series', 'A sequence of measurements taken at successive, usually equally spaced, times.'],
        ['Noise', 'The random, unpredictable part of each reading that carries no information about the signal.'],
        ['Smoothing', 'Replacing each reading by a weighted average of nearby readings to reduce noise.'],
        ['Moving average (window w)', 'The mean of the w readings nearest to a point; centred if they lie on both sides, trailing if only before.'],
        ['Exponential moving average (EMA)', 'A running average in which older readings get geometrically smaller weights, controlled by α.'],
        ['Smoothing factor α', 'The share of the newest reading in the EMA, between 0 and 1; α = 1 means no smoothing at all.'],
        ['Lag', 'The delay between a change in the true signal and the same change appearing in the smoothed output.'],
        ['Random walk', 'A series whose next value is the current value plus a random step, so its own path is unpredictable.'],
      ],
      id: [
        ['Deret waktu', 'Urutan pengukuran yang diambil pada waktu-waktu berurutan, biasanya berjarak sama.'],
        ['Derau', 'Bagian acak dan tak terduga dari tiap bacaan yang tidak membawa informasi tentang sinyal.'],
        ['Penghalusan', 'Mengganti tiap bacaan dengan rata-rata berbobot dari bacaan di sekitarnya untuk mengurangi derau.'],
        ['Rata-rata bergerak (jendela w)', 'Rata-rata dari w bacaan terdekat ke suatu titik; terpusat jika berada di kedua sisi, membuntut jika hanya sebelumnya.'],
        ['Rata-rata bergerak eksponensial (EMA)', 'Rata-rata berjalan dengan bobot bacaan lama yang mengecil secara geometris, diatur oleh α.'],
        ['Faktor penghalusan α', 'Porsi bacaan terbaru dalam EMA, antara 0 dan 1; α = 1 berarti tidak ada penghalusan sama sekali.'],
        ['Lag', 'Jeda antara perubahan pada sinyal sejati dan munculnya perubahan yang sama pada keluaran yang dihaluskan.'],
        ['Jalan acak', 'Deret yang nilai berikutnya adalah nilai sekarang ditambah langkah acak, sehingga lintasannya sendiri tak terduga.'],
      ],
    },
    misconceptions: {
      en: [
        ['A bigger window is always better because it removes more noise.', 'It removes more noise but also more signal. A window wider than a peak flattens the peak, and a window wider than the gap between two features merges them. The right width depends on how fast the true signal changes.'],
        ['Smoothing recovers the true signal.', 'It produces an estimate that is less noisy but also blurred and, for one-sided filters, delayed. Toggle the true signal on and compare: the smoothed line never sits exactly on the yellow curve.'],
        ['A smaller α makes the EMA react faster.', 'The opposite. α is the weight of the newest reading, so a small α means the newest value barely moves the estimate: smoother output, slower reaction. α = 1 copies the raw data.'],
        ['Moving averages always lag.', 'Only trailing (one-sided) ones do. The sim\'s moving average is centred by default, which is why it stays on top of the step while the EMA trails behind; the cost is that a centred filter needs future readings, so it cannot run in real time. Switch on Trailing and it lags too.'],
      ],
      id: [
        ['Jendela yang lebih besar selalu lebih baik karena menghapus lebih banyak derau.', 'Ia menghapus lebih banyak derau tetapi juga lebih banyak sinyal. Jendela yang lebih lebar dari sebuah puncak akan meratakan puncak itu, dan jendela yang lebih lebar dari jarak dua fitur akan menggabungkannya. Lebar yang tepat bergantung pada seberapa cepat sinyal sejati berubah.'],
        ['Penghalusan memulihkan sinyal sejati.', 'Ia menghasilkan taksiran yang kurang berderau tetapi juga kabur dan, untuk filter satu sisi, terlambat. Nyalakan sinyal sejati dan bandingkan: garis halus tidak pernah tepat menempel pada kurva kuning.'],
        ['α yang lebih kecil membuat EMA bereaksi lebih cepat.', 'Justru sebaliknya. α adalah bobot bacaan terbaru, jadi α kecil berarti nilai terbaru hampir tidak menggeser taksiran: keluaran lebih halus, reaksi lebih lambat. α = 1 menyalin data mentah.'],
        ['Rata-rata bergerak selalu tertinggal.', 'Hanya yang membuntut (satu sisi) yang tertinggal. Rata-rata bergerak di simulasi ini terpusat secara bawaan, itulah sebabnya ia tetap di atas langkah sementara EMA membuntut di belakang; harganya, filter terpusat membutuhkan bacaan masa depan sehingga tidak bisa berjalan secara langsung. Nyalakan sakelar membuntut dan ia pun tertinggal.'],
      ],
    },
    realWorld: {
      en: [
        'Daily case counts in an epidemic are reported as 7-day moving averages to remove the weekday-weekend reporting cycle.',
        'Stock-market charts overlay 50-day and 200-day moving averages, and traders watch where the two cross.',
        'Operating systems and servers report CPU load and request latency as exponential moving averages, because an EMA needs only one stored number.',
        'Climate graphs show a 5- or 10-year running mean on top of noisy yearly temperature anomalies so the trend is visible.',
      ],
      id: [
        'Jumlah kasus harian dalam wabah dilaporkan sebagai rata-rata bergerak 7 hari untuk menghilangkan siklus pelaporan hari kerja dan akhir pekan.',
        'Grafik pasar saham menumpangkan rata-rata bergerak 50 hari dan 200 hari, dan pedagang memperhatikan titik persilangan keduanya.',
        'Sistem operasi dan server melaporkan beban CPU dan latensi permintaan sebagai rata-rata bergerak eksponensial, karena EMA hanya butuh satu angka yang disimpan.',
        'Grafik iklim menampilkan rata-rata berjalan 5 atau 10 tahun di atas anomali suhu tahunan yang berderau agar trennya terlihat.',
      ],
    },
    questions: {
      en: [
        { q: 'An EMA with α = 0.2 currently reads 10. The next reading is 20. What is the new EMA value, and what would it be with α = 0.05?', a: 'New EMA = 0.2 × 20 + 0.8 × 10 = 4 + 8 = 12. With α = 0.05: 0.05 × 20 + 0.95 × 10 = 1 + 9.5 = 10.5. The smaller α moves only a quarter as far toward the new reading, which is exactly why it is smoother and slower.' },
        { q: 'A flat signal has noise with σ = 1.0. Roughly how large is the noise left after a moving average with window 25, and what window would be needed to halve it again?', a: 'About 1/√25 = 0.2. Halving again to 0.1 needs √w = 10, so a window of 100 samples: four times the window for half the noise. This assumes the noise is independent from one reading to the next.' },
        { q: 'With the sine-plus-trend signal, the blue moving-average line sits on top of the yellow peaks but lower, while the red EMA line is about the right height but shifted right. Explain both effects.', a: 'The moving average is centred, so it does not shift in time, but it averages each peak with lower values on both sides, which shaves the peak. The EMA uses only past readings, so it responds after the signal has changed and its peaks arrive late; its height is less shaved because, for a slowly varying sine, the recent readings it weights most are still near the peak.' },
      ],
      id: [
        { q: 'Sebuah EMA dengan α = 0,2 saat ini bernilai 10. Bacaan berikutnya 20. Berapa nilai EMA yang baru, dan berapa jika α = 0,05?', a: 'EMA baru = 0,2 × 20 + 0,8 × 10 = 4 + 8 = 12. Dengan α = 0,05: 0,05 × 20 + 0,95 × 10 = 1 + 9,5 = 10,5. α yang lebih kecil hanya bergerak seperempatnya ke arah bacaan baru, dan itulah sebabnya ia lebih halus dan lebih lambat.' },
        { q: 'Sinyal datar punya derau σ = 1,0. Kira-kira berapa derau yang tersisa setelah rata-rata bergerak dengan jendela 25, dan jendela berapa yang diperlukan untuk membaginya dua lagi?', a: 'Sekitar 1/√25 = 0,2. Membaginya dua lagi menjadi 0,1 memerlukan √w = 10, jadi jendela 100 sampel: empat kali jendela untuk separuh derau. Ini mengasumsikan derau saling bebas dari satu bacaan ke bacaan berikutnya.' },
        { q: 'Pada sinyal sinus plus tren, garis biru rata-rata bergerak berada di atas puncak kuning tetapi lebih rendah, sedangkan garis merah EMA tingginya kira-kira pas tetapi bergeser ke kanan. Jelaskan kedua efek itu.', a: 'Rata-rata bergerak bersifat terpusat sehingga tidak bergeser dalam waktu, tetapi ia merata-ratakan tiap puncak dengan nilai yang lebih rendah di kedua sisinya, sehingga puncaknya terpangkas. EMA hanya memakai bacaan lampau sehingga merespons setelah sinyal berubah dan puncaknya datang terlambat; tingginya kurang terpangkas karena, untuk sinus yang berubah perlahan, bacaan terbaru yang bobotnya paling besar masih berada di dekat puncak.' },
      ],
    },
  },
};
