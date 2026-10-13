// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Apply S(t+dt) = S(t) · exp((μ−σ²/2)dt + σ√dt · Z).',
      'See how volatility widens the cone of possible outcomes.',
      'Recognize that ANY single path tells you very little.',
    ],
    id: [
      'Menerapkan S(t+dt) = S(t) · exp((μ−σ²/2)dt + σ√dt · Z).',
      'Melihat volatilitas memperlebar kerucut hasil yang mungkin.',
      'Mengenali bahwa SATU jalur tidak menceritakan banyak hal.',
    ],
  },  tryThis: {
    en: [
      'σ = 0 — what happens to the paths?',
      'High σ — note how some paths nearly halve and others double.',
      'Long horizon — does the fan widen as √T?',
    ],
    id: [
      'σ = 0 — apa yang terjadi pada jalurnya?',
      'σ tinggi — perhatikan beberapa jalur hampir setengah dan yang lain dua kali lipat.',
      'Horizon panjang — apakah kipas melebar seperti √T?',
    ],
  },

  // "Learn" section: the mathematics behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'Nobody can predict tomorrow\'s share price, but the size of a typical daily move can be described statistically. The standard textbook model, geometric Brownian motion (GBM), says that each small step the price changes by a random percentage: a steady average tendency, the drift μ, plus a random shock whose size is set by the volatility σ. Because the changes are percentages, the price can never go negative and large prices make larger absolute moves. Over a step of length dt the sim updates S by S · exp((μ − σ²/2)·dt + σ·√dt·Z), where Z is a standard normal random number, which is the exact solution of the GBM equation rather than an approximation.',
        'The simulation draws many independent paths at once, each with 252 steps per year (the number of trading days), starting from S₀ = $100. The sliders set the annual drift (−20% to +30%), the annual volatility (0 to 80%), the horizon in years and the number of paths; the sliders change the parameters, but new paths are only drawn when you press Resimulate. The dashed line marks the starting price, and the readout summarises the final values across all paths: mean, standard deviation, minimum and maximum. The lab panel records the final distribution so you can compare settings.',
        'Two patterns are worth watching for. First, the fan widens with time like √t, so a horizon four times longer gives a spread only twice as wide per unit of price, yet in absolute terms the long-run range is enormous. Second, the final prices are not symmetric: the distribution is lognormal, with a long tail of very high values and a floor at zero. As a result the mean final price, S₀·e^(μt), sits above the median, S₀·e^((μ − σ²/2)t), and a typical path ends below the average. With μ = 8%, σ = 20% and 5 years, the median is about $135 while the mean is about $149; raising σ pushes the median down even though the mean does not change.',
        'GBM is a model, not a description of real markets. Real returns have fatter tails (crashes happen far more often than a normal distribution predicts), volatility changes over time and clusters, and prices jump at news. The sim also ignores dividends, trading costs and inflation, and the drift is simply whatever you set it to: the model says nothing about what μ should be for any real asset. Its lesson is about the shape of uncertainty, not about which investments to choose.',
      ],
      id: [
        'Tak seorang pun bisa meramalkan harga saham besok, tetapi besarnya pergerakan harian yang khas bisa digambarkan secara statistik. Model standar buku teks, gerak Brown geometrik (GBM), menyatakan bahwa pada setiap langkah kecil harga berubah dengan persentase acak: kecenderungan rata-rata yang tetap, yaitu drift μ, ditambah guncangan acak yang ukurannya ditentukan volatilitas σ. Karena perubahannya berupa persentase, harga tidak pernah negatif dan harga yang besar membuat pergerakan absolut yang lebih besar. Pada langkah selama dt sim memperbarui S dengan S · exp((μ − σ²/2)·dt + σ·√dt·Z), dengan Z bilangan acak normal baku; ini solusi eksak persamaan GBM, bukan hampiran.',
        'Simulasi ini menggambar banyak jalur yang saling bebas sekaligus, masing-masing 252 langkah per tahun (jumlah hari perdagangan), mulai dari S₀ = $100. Slider mengatur drift tahunan (−20% sampai +30%), volatilitas tahunan (0 sampai 80%), horizon dalam tahun, dan jumlah jalur; slider mengubah parameter, tetapi jalur baru hanya digambar saat kamu menekan Resimulate. Garis putus-putus menandai harga awal, dan panel angka merangkum nilai akhir semua jalur: rata-rata, simpangan baku, minimum, dan maksimum. Panel lab mencatat distribusi akhirnya agar kamu bisa membandingkan pengaturan.',
        'Ada dua pola yang patut diperhatikan. Pertama, kipas melebar dengan waktu seperti √t, sehingga horizon empat kali lebih panjang hanya memberi sebaran dua kali lebih lebar per satuan harga, tetapi secara absolut rentang jangka panjangnya sangat besar. Kedua, harga akhir tidak simetris: distribusinya lognormal, dengan ekor panjang berisi nilai-nilai sangat tinggi dan batas bawah di nol. Akibatnya harga akhir rata-rata, S₀·e^(μt), berada di atas median, S₀·e^((μ − σ²/2)t), dan jalur yang khas berakhir di bawah rata-rata. Dengan μ = 8%, σ = 20%, dan 5 tahun, mediannya sekitar $135 sedangkan rata-ratanya sekitar $149; menaikkan σ menekan median turun walaupun rata-ratanya tidak berubah.',
        'GBM adalah model, bukan gambaran pasar nyata. Imbal hasil nyata punya ekor yang lebih gemuk (kejatuhan terjadi jauh lebih sering daripada prediksi distribusi normal), volatilitas berubah dari waktu ke waktu dan bergerombol, dan harga melompat saat ada berita. Sim juga mengabaikan dividen, biaya transaksi, dan inflasi, dan drift-nya hanyalah nilai yang kamu atur: model ini tidak mengatakan apa pun tentang berapa seharusnya μ untuk aset nyata mana pun. Pelajarannya tentang bentuk ketidakpastian, bukan tentang investasi mana yang harus dipilih.',
      ],
    },
    figure: {
      caption: {
        en: 'Three sample GBM paths from $100 with μ = 8% and σ = 20%. The shaded band (median × e^(±σ√t)) widens like √t and is wider above than below; the dashed median line rises more slowly than the mean because of the −σ²/2 term.',
        id: 'Tiga contoh jalur GBM dari $100 dengan μ = 8% dan σ = 20%. Pita berbayang (median × e^(±σ√t)) melebar seperti √t dan lebih lebar ke atas daripada ke bawah; garis median putus-putus naik lebih lambat daripada rata-rata karena suku −σ²/2.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('A fan of random stock price paths widening over time', 'Kipas jalur harga saham acak yang melebar seiring waktu')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.ax{fill:none;stroke:currentColor;stroke-width:1.4}.m{stroke:currentColor;stroke-width:1;opacity:.35}.p{fill:none;stroke-width:1.6}</style>
  <path d="M50 176 L106 149.3 L162 131.4 L218 113.6 L274 95.4 L330 76 L330 188.3 L274 189.3 L218 189.8 L162 189.5 L106 187.8 Z" fill="#8b5cf6" opacity=".18"/>
  <line x1="50" y1="30" x2="50" y2="210" class="ax"/>
  <line x1="50" y1="210" x2="330" y2="210" class="ax"/>
  <line x1="50" y1="176" x2="330" y2="176" class="m" stroke-dasharray="3 3"/>
  <text x="14" y="180">$100</text>
  <text x="14" y="90">$200</text>
  <line x1="50" y1="86" x2="330" y2="86" class="m" stroke-dasharray="3 3"/>
  <text x="46" y="226">0</text><text x="102" y="226">1</text><text x="158" y="226">2</text><text x="214" y="226">3</text><text x="270" y="226">4</text><text x="326" y="226">5</text>
  <text x="160" y="238" opacity=".7">${L('years', 'tahun')}</text>
  <polyline points="50,176 78,170 106,178 134,160 162,150 190,158 218,138 246,128 274,140 302,118 330,108" class="p" stroke="#3b82f6"/>
  <polyline points="50,176 78,180 106,186 134,178 162,190 190,184 218,192 246,186 274,196 302,190 330,194" class="p" stroke="#ef4444"/>
  <polyline points="50,176 78,172 106,166 134,172 162,160 190,166 218,156 246,162 274,150 302,156 330,146" class="p" stroke="#10b981"/>
  <path d="M50 176 L106 170.4 L162 164.6 L218 158.3 L274 151.6 L330 144.5" fill="none" stroke="#f59e0b" stroke-width="2" stroke-dasharray="6 3"/>
  <text x="258" y="142" fill="#f59e0b">${L('median ≈ $135', 'median ≈ $135')}</text>
  <text x="196" y="70" fill="#8b5cf6">${L('band widens like √t', 'pita melebar seperti √t')}</text>
  <text x="60" y="24" opacity=".8">μ = 8%, σ = 20%, S₀ = $100</text>
  <text x="60" y="38" opacity=".8">${L('mean after 5 years ≈ $149', 'rata-rata setelah 5 tahun ≈ $149')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'GBM changes the price by a random percentage each step: a steady drift μ plus a normal shock scaled by the volatility σ.',
        'The spread of possible prices grows like σ√t, so uncertainty accumulates with time but more slowly than time itself.',
        'Final prices are lognormal: skewed to the right, never negative, with the mean above the median.',
        'A single simulated path tells you almost nothing; only the whole fan reveals the range of outcomes.',
        'Higher volatility lowers the median outcome even when the mean is unchanged, because of the −σ²/2 term.',
      ],
      id: [
        'GBM mengubah harga dengan persentase acak pada tiap langkah: drift μ yang tetap ditambah guncangan normal yang diskalakan oleh volatilitas σ.',
        'Sebaran harga yang mungkin tumbuh seperti σ√t, sehingga ketidakpastian menumpuk seiring waktu tetapi lebih lambat daripada waktu itu sendiri.',
        'Harga akhir berdistribusi lognormal: menjulur ke kanan, tidak pernah negatif, dengan rata-rata di atas median.',
        'Satu jalur simulasi hampir tidak memberi informasi; hanya seluruh kipas yang memperlihatkan rentang hasilnya.',
        'Volatilitas yang lebih tinggi menurunkan hasil median walaupun rata-ratanya tidak berubah, karena suku −σ²/2.',
      ],
    },
    vocabulary: {
      en: [
        ['Random walk', 'A path built from a sequence of random steps, each independent of the ones before.'],
        ['Geometric Brownian motion (GBM)', 'A random walk in which each step multiplies the price by a random factor, so changes are percentages rather than fixed amounts.'],
        ['Drift (μ)', 'The average rate of growth per year built into the model, before random shocks.'],
        ['Volatility (σ)', 'The standard deviation of yearly percentage returns; it sets the size of the random shocks.'],
        ['Lognormal distribution', 'The distribution of a quantity whose logarithm is normally distributed; GBM prices at any future time follow it.'],
        ['Median', 'The middle outcome: half the paths finish above it and half below. For GBM it is S₀·e^((μ − σ²/2)t).'],
        ['Monte Carlo simulation', 'Estimating a distribution of outcomes by running many random trials, which is what the sim does with its paths.'],
      ],
      id: [
        ['Jalan acak', 'Jalur yang tersusun dari barisan langkah acak, masing-masing bebas dari langkah sebelumnya.'],
        ['Gerak Brown geometrik (GBM)', 'Jalan acak yang setiap langkahnya mengalikan harga dengan faktor acak, sehingga perubahannya berupa persentase, bukan jumlah tetap.'],
        ['Drift (μ)', 'Laju pertumbuhan rata-rata per tahun yang tertanam dalam model, sebelum guncangan acak.'],
        ['Volatilitas (σ)', 'Simpangan baku imbal hasil persentase tahunan; menentukan ukuran guncangan acak.'],
        ['Distribusi lognormal', 'Distribusi suatu besaran yang logaritmanya berdistribusi normal; harga GBM pada waktu mendatang mana pun mengikutinya.'],
        ['Median', 'Hasil tengah: separuh jalur berakhir di atasnya dan separuh di bawahnya. Untuk GBM nilainya S₀·e^((μ − σ²/2)t).'],
        ['Simulasi Monte Carlo', 'Menaksir distribusi hasil dengan menjalankan banyak percobaan acak, seperti yang dilakukan sim dengan jalur-jalurnya.'],
      ],
    },
    misconceptions: {
      en: [
        ['With a positive drift, the price is bound to end higher than it started.', 'Drift only shifts the odds. With μ = 8% and σ = 20% over one year, roughly 38% of paths still finish below the starting price. Press Resimulate a few times and count them.'],
        ['The average path is the typical path.', 'The mean final price is pulled up by a few very high paths. The typical (median) outcome is lower, by the factor e^(−σ²t/2), and with high volatility most paths end below the mean.'],
        ['A path that has fallen for several steps is due for a rebound.', 'Each step is independent of the past; the model has no memory. A path that has fallen is simply starting its next step from a lower price.'],
        ['Volatility only adds risk around the same average outcome.', 'Volatility also lowers the median because of the −σ²/2 term. Set σ to 60% in the sim: the mean stays at S₀·e^(μt) but most paths finish far below it.'],
      ],
      id: [
        ['Dengan drift positif, harga pasti berakhir lebih tinggi daripada awalnya.', 'Drift hanya menggeser peluang. Dengan μ = 8% dan σ = 20% selama satu tahun, sekitar 38% jalur masih berakhir di bawah harga awal. Tekan Resimulate beberapa kali dan hitung sendiri.'],
        ['Jalur rata-rata adalah jalur yang khas.', 'Harga akhir rata-rata ditarik ke atas oleh beberapa jalur yang sangat tinggi. Hasil yang khas (median) lebih rendah, dengan faktor e^(−σ²t/2), dan pada volatilitas tinggi kebanyakan jalur berakhir di bawah rata-rata.'],
        ['Jalur yang sudah turun beberapa langkah pasti akan segera berbalik naik.', 'Setiap langkah bebas dari masa lalu; model ini tidak punya ingatan. Jalur yang telah turun hanya memulai langkah berikutnya dari harga yang lebih rendah.'],
        ['Volatilitas hanya menambah risiko di sekitar hasil rata-rata yang sama.', 'Volatilitas juga menurunkan median karena suku −σ²/2. Atur σ ke 60% di sim: rata-ratanya tetap S₀·e^(μt) tetapi kebanyakan jalur berakhir jauh di bawahnya.'],
      ],
    },
    realWorld: {
      en: [
        'The Black–Scholes option-pricing formula assumes the underlying share follows GBM; the model is still the starting point for pricing derivatives.',
        'Pension and retirement planners run thousands of simulated paths to estimate the chance that savings last a lifetime, rather than relying on one average forecast.',
        'Risk managers at banks use Monte Carlo fans like this one to estimate how much a portfolio could lose in a bad month.',
        'The same mathematics describes pollen grains jiggling in water, which is where the name Brownian motion comes from.',
      ],
      id: [
        'Rumus penetapan harga opsi Black–Scholes mengasumsikan saham acuan mengikuti GBM; model ini masih menjadi titik awal penetapan harga derivatif.',
        'Perencana dana pensiun menjalankan ribuan jalur simulasi untuk menaksir peluang tabungan cukup seumur hidup, bukan mengandalkan satu ramalan rata-rata.',
        'Pengelola risiko di bank memakai kipas Monte Carlo seperti ini untuk menaksir seberapa besar kerugian portofolio pada bulan yang buruk.',
        'Matematika yang sama menggambarkan butiran serbuk sari yang bergetar di air, asal nama gerak Brown.',
      ],
    },
    questions: {
      en: [
        { q: 'With μ = 10%, σ = 20% and a 10-year horizon, what are the median and mean final prices from $100?', a: 'Median = 100·e^((0.10 − 0.02)·10) = 100·e^0.8 ≈ $223. Mean = 100·e^(0.10·10) = 100·e^1 ≈ $272. Roughly two thirds of paths end between 100·e^(0.8 ± 0.2·√10), i.e. about $118 and $419.' },
        { q: 'You set σ = 0 and press Resimulate. What do the paths look like, and what final value do they reach after 5 years at μ = 8%?', a: 'All paths collapse onto one smooth exponential curve, because the random term vanishes. The final value is 100·e^(0.08·5) = 100·e^0.4 ≈ $149, growing by a steady 8% per year compounded continuously.' },
        { q: 'Doubling the horizon from 5 to 20 years quadruples the time. By what factor does the width of the fan (in log-price terms) grow, and why?', a: 'By a factor of 2, because the standard deviation of the log price is σ√t and √4 = 2. In the sim the spread in dollars grows by more than this, since the band is also carried upward by the drift and the lognormal tail stretches the top of the fan.' },
      ],
      id: [
        { q: 'Dengan μ = 10%, σ = 20%, dan horizon 10 tahun, berapa median dan rata-rata harga akhir dari $100?', a: 'Median = 100·e^((0,10 − 0,02)·10) = 100·e^0,8 ≈ $223. Rata-rata = 100·e^(0,10·10) = 100·e^1 ≈ $272. Kira-kira dua pertiga jalur berakhir di antara 100·e^(0,8 ± 0,2·√10), yaitu sekitar $118 dan $419.' },
        { q: 'Kamu mengatur σ = 0 dan menekan Resimulate. Seperti apa jalurnya, dan nilai akhir berapa yang dicapai setelah 5 tahun pada μ = 8%?', a: 'Semua jalur menyatu pada satu kurva eksponensial yang mulus, karena suku acaknya hilang. Nilai akhirnya 100·e^(0,08·5) = 100·e^0,4 ≈ $149, tumbuh tetap 8% per tahun secara majemuk kontinu.' },
        { q: 'Menggandakan horizon dari 5 ke 20 tahun melipatempatkan waktu. Berapa kali lebar kipas (dalam log harga) bertambah, dan mengapa?', a: 'Dua kali, karena simpangan baku log harga adalah σ√t dan √4 = 2. Di sim sebaran dalam dolar bertambah lebih dari itu, karena pita juga terangkat oleh drift dan ekor lognormal meregangkan bagian atas kipas.' },
      ],
    },
  },
};
