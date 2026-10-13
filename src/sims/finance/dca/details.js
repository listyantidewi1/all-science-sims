// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Compare lump-sum vs DCA returns in many random scenarios.',
      'See that DCA wins in flat or declining markets, lump-sum wins in rising ones.',
      'Recognize the math: lump-sum has more time in the market.',
    ],
    id: [
      'Membandingkan return lump-sum vs DCA dalam banyak skenario acak.',
      'Melihat DCA menang di pasar mendatar/turun, lump-sum menang di pasar naik.',
      'Mengenali fakta: lump-sum memiliki lebih banyak waktu di pasar.',
    ],
  },
  tryThis: {
    en: [
      'Positive drift, low vol — does lump sum win most rounds?',
      'Negative drift — does DCA win?',
      'High volatility — does DCA win more often than the means suggest?',
    ],
    id: [
      'Drift positif, vol rendah — apakah lump sum menang di banyak putaran?',
      'Drift negatif — apakah DCA menang?',
      'Volatilitas tinggi — apakah DCA menang lebih sering dari yang diduga?',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'Suppose you have $12,000 to put into a stock fund. You could buy everything today (a lump sum) or buy in equal monthly instalments, say $1,000 a month for a year, which is called dollar-cost averaging (DCA). With DCA the same $1,000 buys more shares when the price is low and fewer when it is high, so your average cost per share is the harmonic mean of the purchase prices, which is always at or below their ordinary average. The catch is that money waiting its turn is not invested, so in a market that tends to rise, the instalments buy at prices that are on average higher than today\'s.',
        'The simulation cannot know the future, so it generates many possible futures at random. Each price path starts at 100 and each month is multiplied by exp((μ − σ²/2)/12 + σ√(1/12) × z), where z is a standard normal random number; this is the geometric Brownian motion used throughout finance. The drift μ is the expected growth rate per year and the volatility σ is how wildly returns scatter around it. For every path the sim computes the final value of the lump sum (all shares bought at month 0) and of DCA (an equal amount bought at the price of each month from 0 to the spread length), both valued at the horizon. The histogram shows lump minus DCA across all 200 paths: blue bars are paths where the lump sum ended ahead, pink where DCA did, and the box reports the averages and how often each won.',
        'Each control changes the trade-off in a predictable way. A positive drift favours the lump sum, because the instalments sit idle while prices tend upward; a negative drift favours DCA, because later purchases are cheaper on average. Higher volatility widens the histogram in both directions and pulls the win fraction toward 50% even when the average difference stays in favour of one side, which is why the number of wins and the average gap can tell different stories. A longer DCA spread keeps more money out of the market for longer, so it enlarges whatever advantage the drift gives. The horizon mostly scales the picture, since after the last instalment both portfolios ride the same price path.',
        'The model leaves out a great deal. Uninvested cash earns nothing, there are no fees, taxes or dividends, and the monthly returns are independent draws with a constant μ and σ, so there are no crashes that cluster, no trends and no mean reversion. With 200 runs the win percentage jitters by a few points every time you press Resimulate; that randomness is part of the lesson. The sim compares two mechanical rules on an assumed random model, so it illustrates the structure of the decision, expected value against the spread of outcomes, rather than telling anyone what to do with real money. Keep the DCA spread no longer than the horizon so that every instalment has a price to buy at.',
      ],
      id: [
        'Misalkan kamu punya $12.000 untuk ditempatkan di reksa dana saham. Kamu bisa membeli semuanya hari ini (lump sum) atau membeli secara bertahap dalam jumlah tetap tiap bulan, misalnya $1.000 per bulan selama setahun, yang disebut dollar-cost averaging (DCA). Dengan DCA, $1.000 yang sama membeli lebih banyak unit saat harga rendah dan lebih sedikit saat harga tinggi, sehingga biaya rata-rata per unit adalah rata-rata harmonik harga pembelian, yang selalu sama dengan atau di bawah rata-rata biasanya. Kelemahannya, uang yang menunggu giliran tidak diinvestasikan, sehingga di pasar yang cenderung naik, cicilan membeli pada harga yang rata-rata lebih tinggi daripada harga hari ini.',
        'Simulasi tidak bisa mengetahui masa depan, jadi ia membangkitkan banyak kemungkinan masa depan secara acak. Setiap lintasan harga mulai dari 100 dan tiap bulan dikalikan exp((μ − σ²/2)/12 + σ√(1/12) × z), dengan z bilangan acak normal standar; ini adalah gerak Brown geometrik yang dipakai di seluruh ilmu keuangan. Drift μ adalah laju pertumbuhan harapan per tahun dan volatilitas σ adalah seberapa liar return tersebar di sekitarnya. Untuk setiap lintasan, simulasi menghitung nilai akhir lump sum (semua unit dibeli di bulan 0) dan DCA (jumlah sama dibeli pada harga tiap bulan dari 0 sampai panjang sebaran), keduanya dinilai pada horizon. Histogram menunjukkan lump dikurangi DCA untuk 200 lintasan: batang biru adalah lintasan di mana lump sum berakhir di depan, merah muda di mana DCA menang, dan kotak melaporkan rata-rata serta seberapa sering masing-masing menang.',
        'Tiap kontrol mengubah pertukaran ini dengan cara yang bisa diduga. Drift positif menguntungkan lump sum, karena cicilan menganggur sementara harga cenderung naik; drift negatif menguntungkan DCA, karena pembelian belakangan rata-rata lebih murah. Volatilitas lebih tinggi melebarkan histogram ke dua arah dan menarik persentase menang ke arah 50% walaupun selisih rata-ratanya tetap berpihak ke satu sisi, itulah sebabnya jumlah menang dan selisih rata-rata bisa bercerita berbeda. Sebaran DCA yang lebih panjang menahan lebih banyak uang di luar pasar lebih lama, sehingga memperbesar keunggulan apa pun yang diberikan drift. Horizon sebagian besar hanya menskalakan gambar, karena setelah cicilan terakhir kedua portofolio menumpang lintasan harga yang sama.',
        'Model ini mengabaikan banyak hal. Uang yang belum diinvestasikan tidak berbunga, tidak ada biaya, pajak, atau dividen, dan return bulanan adalah undian saling bebas dengan μ dan σ tetap, sehingga tidak ada kejatuhan yang berkelompok, tidak ada tren, dan tidak ada pembalikan ke rata-rata. Dengan 200 putaran, persentase menang bergeser beberapa poin setiap kali tombol Resimulate ditekan; keacakan itu bagian dari pelajarannya. Simulasi membandingkan dua aturan mekanis pada model acak yang diasumsikan, jadi ia menggambarkan struktur keputusan, nilai harapan melawan sebaran hasil, bukan memberi tahu siapa pun apa yang harus dilakukan dengan uang sungguhan. Jaga agar sebaran DCA tidak lebih panjang daripada horizon supaya setiap cicilan punya harga untuk membeli.',
      ],
    },
    figure: {
      caption: {
        en: 'One price path over 12 months. The lump sum buys everything at 100 (blue square). DCA buys a fixed amount each month (green dots, sized by the shares bought), so the dip buys more shares and the average cost ends at about 98.5. On a path that rises from the start, the dots would all sit above 100 and the lump sum would win.',
        id: 'Satu lintasan harga selama 12 bulan. Lump sum membeli semuanya di harga 100 (kotak biru). DCA membeli jumlah tetap tiap bulan (titik hijau, ukurannya menurut unit yang dibeli), sehingga saat harga turun lebih banyak unit terbeli dan biaya rata-ratanya sekitar 98,5. Pada lintasan yang naik sejak awal, semua titik akan berada di atas 100 dan lump sum menang.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('DCA purchases along a price path compared with a single lump-sum purchase', 'Pembelian DCA sepanjang lintasan harga dibandingkan satu pembelian lump sum')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.ax{stroke:currentColor;stroke-width:1;fill:none;opacity:.6}.s{font-size:10px;opacity:.75}.p{fill:none;stroke:currentColor;stroke-width:1.8;opacity:.8;stroke-linejoin:round}.d{fill:#10b981;opacity:.85}</style>
  <line x1="40" y1="40" x2="40" y2="200" class="ax"/>
  <line x1="40" y1="200" x2="320" y2="200" class="ax"/>
  <text x="14" y="128" class="s">100</text>
  <text x="18" y="54" class="s">120</text>
  <text x="18" y="203" class="s">80</text>
  <text x="36" y="214" class="s">0</text>
  <text x="172" y="214" class="s">6</text>
  <text x="310" y="214" class="s">12</text>
  <text x="240" y="230" class="s">${L('month', 'bulan')} →</text>
  <path d="M40 125 L63 140 L87 162.5 L110 181 L133 170 L157 147.5 L180 129 L203 110 L227 121 L250 95 L273 80 L297 69 L320 57.5" class="p"/>
  <line x1="40" y1="125" x2="320" y2="125" stroke="#3b82f6" stroke-width="1.2" stroke-dasharray="4 3"/>
  <line x1="40" y1="130.6" x2="320" y2="130.6" stroke="#10b981" stroke-width="1.2" stroke-dasharray="4 3"/>
  <circle cx="63" cy="140" r="5" class="d"/>
  <circle cx="87" cy="162.5" r="5.8" class="d"/>
  <circle cx="110" cy="181" r="6.4" class="d"/>
  <circle cx="133" cy="170" r="6" class="d"/>
  <circle cx="157" cy="147.5" r="5.2" class="d"/>
  <circle cx="180" cy="129" r="4.6" class="d"/>
  <circle cx="203" cy="110" r="4" class="d"/>
  <circle cx="227" cy="121" r="4.4" class="d"/>
  <circle cx="250" cy="95" r="3.5" class="d"/>
  <circle cx="273" cy="80" r="3" class="d"/>
  <circle cx="297" cy="69" r="2.6" class="d"/>
  <circle cx="40" cy="125" r="4.5" class="d"/>
  <rect x="33" y="118" width="14" height="14" fill="#3b82f6" opacity=".9"/>
  <text x="48" y="112" fill="#3b82f6">${L('lump sum: all shares at 100', 'lump sum: semua unit di harga 100')}</text>
  <text x="190" y="148" fill="#10b981">${L('DCA average cost ≈ 98.5', 'biaya rata-rata DCA ≈ 98,5')}</text>
  <text x="96" y="196" fill="#10b981" class="s">${L('cheaper months buy more shares', 'bulan murah membeli lebih banyak unit')}</text>
  <text x="44" y="36" class="s">${L('price', 'harga')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'A lump sum puts all the money to work at once; DCA spreads purchases over time and so keeps part of the money out of the market for a while.',
        'DCA\'s average cost per share is the harmonic mean of the purchase prices, which is at or below their ordinary average.',
        'With positive drift the lump sum has the higher expected value, because waiting cash misses expected growth; with negative drift DCA comes out ahead.',
        'Volatility widens the spread of outcomes and pulls the win fraction toward 50%, so how often a strategy wins and how much it wins on average are different questions.',
        'The result is a probability distribution, not a single number: rerunning the 200 paths changes the win percentage by a few points.',
      ],
      id: [
        'Lump sum mengerahkan seluruh uang sekaligus; DCA menyebar pembelian seiring waktu sehingga sebagian uang berada di luar pasar untuk sementara.',
        'Biaya rata-rata per unit pada DCA adalah rata-rata harmonik harga pembelian, yang sama dengan atau di bawah rata-rata biasanya.',
        'Dengan drift positif, lump sum punya nilai harapan lebih tinggi, karena uang yang menunggu melewatkan pertumbuhan yang diharapkan; dengan drift negatif DCA yang unggul.',
        'Volatilitas melebarkan sebaran hasil dan menarik persentase menang ke arah 50%, sehingga seberapa sering suatu strategi menang dan seberapa besar rata-rata menangnya adalah dua pertanyaan berbeda.',
        'Hasilnya adalah distribusi peluang, bukan satu angka: menjalankan ulang 200 lintasan mengubah persentase menang beberapa poin.',
      ],
    },
    vocabulary: {
      en: [
        ['Dollar-cost averaging (DCA)', 'Investing a fixed amount of money at regular intervals regardless of the price.'],
        ['Lump sum', 'Investing the entire amount at a single moment.'],
        ['Drift (μ)', 'The expected growth rate of the price per year in the random model.'],
        ['Volatility (σ)', 'The standard deviation of yearly returns; a measure of how widely prices swing.'],
        ['Geometric Brownian motion', 'A random-walk model in which each period multiplies the price by a random factor, so prices stay positive and percentage changes are independent.'],
        ['Harmonic mean', 'The average cost per share when equal amounts of money are spent at different prices: n divided by the sum of 1/price.'],
        ['Monte Carlo simulation', 'Estimating the distribution of an outcome by generating many random scenarios and recording the result of each.'],
        ['Horizon', 'The month at which both strategies are valued and compared.'],
      ],
      id: [
        ['Dollar-cost averaging (DCA)', 'Menginvestasikan sejumlah uang tetap pada interval teratur tanpa memperhatikan harga.'],
        ['Lump sum', 'Menginvestasikan seluruh jumlah pada satu saat.'],
        ['Drift (μ)', 'Laju pertumbuhan harga yang diharapkan per tahun dalam model acak.'],
        ['Volatilitas (σ)', 'Simpangan baku return tahunan; ukuran seberapa lebar harga berayun.'],
        ['Gerak Brown geometrik', 'Model jalan acak yang tiap periodenya mengalikan harga dengan faktor acak, sehingga harga tetap positif dan perubahan persentasenya saling bebas.'],
        ['Rata-rata harmonik', 'Biaya rata-rata per unit saat jumlah uang yang sama dibelanjakan pada harga berbeda: n dibagi jumlah 1/harga.'],
        ['Simulasi Monte Carlo', 'Menaksir distribusi suatu hasil dengan membangkitkan banyak skenario acak dan mencatat hasil masing-masing.'],
        ['Horizon', 'Bulan ketika kedua strategi dinilai dan dibandingkan.'],
      ],
    },
    misconceptions: {
      en: [
        ['DCA raises your expected return.', 'It does not. When the drift is positive, cash waiting for its turn misses expected growth, so DCA\'s expected final value is lower. What DCA reduces is the spread of outcomes, in particular the chance of investing everything just before a fall.'],
        ['Because DCA\'s average cost is below the average price, it must beat the lump sum.', 'The harmonic-mean advantage is relative to the average of the prices DCA paid, not relative to the lump sum\'s single starting price. If prices rise steadily, every DCA purchase is dearer than the lump sum\'s.'],
        ['If one strategy wins 60% of the time, it is 60% better.', 'Win frequency and average margin are different measures. The histogram can show one side winning more often while the other side wins by larger amounts; look at both the averages and the win count.'],
        ['The simulation shows what the market will do.', 'It draws random paths from an assumed model with the μ and σ you set. It explores consequences of assumptions; it does not forecast.'],
      ],
      id: [
        ['DCA menaikkan return harapanmu.', 'Tidak. Saat drift positif, uang yang menunggu giliran melewatkan pertumbuhan yang diharapkan, sehingga nilai akhir harapan DCA lebih rendah. Yang dikurangi DCA adalah sebaran hasil, khususnya peluang menginvestasikan semuanya tepat sebelum harga jatuh.'],
        ['Karena biaya rata-rata DCA di bawah harga rata-rata, DCA pasti mengalahkan lump sum.', 'Keunggulan rata-rata harmonik itu relatif terhadap rata-rata harga yang dibayar DCA, bukan terhadap harga awal tunggal lump sum. Jika harga naik terus, setiap pembelian DCA lebih mahal daripada pembelian lump sum.'],
        ['Jika satu strategi menang 60% waktu, ia 60% lebih baik.', 'Frekuensi menang dan selisih rata-rata adalah ukuran yang berbeda. Histogram bisa menunjukkan satu sisi menang lebih sering sementara sisi lain menang dengan jumlah lebih besar; lihat rata-rata dan jumlah menang sekaligus.'],
        ['Simulasi menunjukkan apa yang akan dilakukan pasar.', 'Ia menarik lintasan acak dari model yang diasumsikan dengan μ dan σ yang kamu atur. Ia menjelajahi konsekuensi asumsi; ia tidak meramal.'],
      ],
    },
    realWorld: {
      en: [
        'Anyone who invests part of each salary into a pension or a mutual fund is dollar-cost averaging by necessity, because the money arrives monthly rather than all at once.',
        'The lump-sum question arises for real when someone receives an inheritance, a bonus or an insurance payout and must decide how quickly to invest it.',
        'Studies using long histories of stock-market data have typically found the lump sum finishing ahead in roughly two-thirds of periods, in line with what the sim shows at a positive drift.',
        'Monte Carlo simulation of random price paths, exactly the method used here, is how pension funds and financial planners estimate the range of possible outcomes of a savings plan.',
      ],
      id: [
        'Siapa pun yang menyisihkan sebagian gaji tiap bulan ke dana pensiun atau reksa dana sedang melakukan dollar-cost averaging karena keadaan, sebab uangnya datang bulanan, bukan sekaligus.',
        'Pertanyaan lump sum muncul sungguhan ketika seseorang menerima warisan, bonus, atau pembayaran asuransi dan harus memutuskan seberapa cepat menginvestasikannya.',
        'Kajian dengan sejarah panjang data pasar saham umumnya menemukan lump sum berakhir di depan pada sekitar dua pertiga periode, sejalan dengan yang ditunjukkan simulasi pada drift positif.',
        'Simulasi Monte Carlo lintasan harga acak, persis metode yang dipakai di sini, adalah cara dana pensiun dan perencana keuangan menaksir rentang kemungkinan hasil suatu rencana menabung.',
      ],
    },
    questions: {
      en: [
        { q: 'A price goes 100, 80, 60 over three months and you invest $100 at each of those prices. What is your average cost per share, and how does it compare with a lump sum of $300 at 100?', a: 'Shares bought: 100/100 + 100/80 + 100/60 = 1 + 1.25 + 1.667 = 3.917 shares, so the average cost is 300 / 3.917 ≈ $76.6 per share (the harmonic mean), well below the arithmetic average of 80. The lump sum bought only 3 shares at 100, so in this falling market DCA holds about 31% more shares.' },
        { q: 'With μ = 8% a year, a 12-month DCA spread and a 24-month horizon, roughly how large is the expected gap between the two strategies?', a: 'The lump sum\'s $12,000 is expected to grow for 24 months: 12,000 × e^(0.08 × 2) ≈ $14,080. Each DCA instalment is invested k months late, so on average the money misses about 5.5 months of growth, giving roughly 12,000 × e^(0.08 × 18.5/12) ≈ $13,580. The expected gap is about $500, or 3.5%, which is what the averages in the sim settle near.' },
        { q: 'Why does raising the volatility pull the lump sum\'s win fraction toward 50% even though its average advantage stays positive?', a: 'The difference between the two final values equals a drift part, which favours the lump sum, plus a random part that scales with σ. When σ is large the random part dominates, so the sign of the difference becomes nearly a coin flip, while the average of many paths still shows the drift advantage. Win frequency and mean difference measure different things.' },
      ],
      id: [
        { q: 'Harga bergerak 100, 80, 60 selama tiga bulan dan kamu menginvestasikan $100 pada tiap harga itu. Berapa biaya rata-rata per unit, dan bagaimana dibandingkan lump sum $300 di harga 100?', a: 'Unit yang dibeli: 100/100 + 100/80 + 100/60 = 1 + 1,25 + 1,667 = 3,917 unit, sehingga biaya rata-ratanya 300 / 3,917 ≈ $76,6 per unit (rata-rata harmonik), jauh di bawah rata-rata aritmetika 80. Lump sum hanya membeli 3 unit di harga 100, jadi di pasar yang turun ini DCA memegang sekitar 31% lebih banyak unit.' },
        { q: 'Dengan μ = 8% per tahun, sebaran DCA 12 bulan, dan horizon 24 bulan, kira-kira seberapa besar selisih harapan antara kedua strategi?', a: '$12.000 milik lump sum diharapkan tumbuh selama 24 bulan: 12.000 × e^(0,08 × 2) ≈ $14.080. Tiap cicilan DCA diinvestasikan k bulan lebih lambat, sehingga rata-rata uangnya melewatkan sekitar 5,5 bulan pertumbuhan, menghasilkan kira-kira 12.000 × e^(0,08 × 18,5/12) ≈ $13.580. Selisih harapannya sekitar $500, atau 3,5%, mendekati angka rata-rata yang muncul di simulasi.' },
        { q: 'Mengapa menaikkan volatilitas menarik persentase menang lump sum ke arah 50% padahal keunggulan rata-ratanya tetap positif?', a: 'Selisih kedua nilai akhir sama dengan bagian drift, yang menguntungkan lump sum, ditambah bagian acak yang membesar bersama σ. Saat σ besar, bagian acak mendominasi, sehingga tanda selisihnya hampir seperti lempar koin, sementara rata-rata banyak lintasan masih menunjukkan keunggulan drift. Frekuensi menang dan selisih rata-rata mengukur hal yang berbeda.' },
      ],
    },
  },
};
