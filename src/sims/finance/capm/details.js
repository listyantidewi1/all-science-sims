// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      "Compute beta as cov(r_i, r_m) / var(r_m).",
      'Apply CAPM: E[r] = rᶠ + β · risk-premium.',
      "Distinguish defensive (β<1), neutral (β=1), aggressive (β>1) stocks.",
    ],
    id: [
      'Menghitung beta = cov(r_i, r_m) / var(r_m).',
      'Menerapkan CAPM: E[r] = rᶠ + β · premi-risiko.',
      'Membedakan saham defensif (β<1), netral (β=1), agresif (β>1).',
    ],
  },
  tryThis: {
    en: [
      'Set true β = 1.5 — does the regression find it back?',
      'Add lots of idiosyncratic noise — does β estimate get noisier?',
      'CAPM expected return for β = 0.5 with 8% market premium.',
    ],
    id: [
      'Atur β sejati = 1,5 — apakah regresi menemukannya kembali?',
      'Tambahkan banyak derau idiosinkratik — apakah estimasi β jadi berisik?',
      'Hitung return CAPM untuk β = 0,5 dengan premi pasar 8%.',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'Every share price moves for two kinds of reason. Some moves are shared with the whole market, when interest rates change, a recession looms or confidence returns; others are specific to the company, a product launch, a lawsuit, a change of chief executive. The company-specific part can be diluted almost to nothing by holding many different shares, because the good and bad surprises cancel out. The market-wide part cannot be diversified away: every share carries it. Beta measures how much of that undiversifiable market movement a share carries. A share with β = 1 moves with the market on average; β = 1.5 amplifies market swings by half; β = 0.5 damps them; β below zero would move against the market.',
        'The sim generates a stock and plots its monthly return against the market\'s. Each month the market return is drawn at random around a fixed mean, and the stock\'s return is built as rᶠ + β(rₘ − rᶠ) plus an independent random shock, the idiosyncratic noise. The pink line is the least-squares regression of stock return on market return, and its slope is the estimated beta, cov(rᵢ, rₘ) / var(rₘ). The dashed amber line has slope 1 for comparison. R² tells you what fraction of the stock\'s variance is explained by the market; the rest is company-specific noise. Finally the sim applies the Capital Asset Pricing Model, E[r] = rᶠ + β(E[rₘ] − rᶠ), to the estimated beta, using a fixed risk-free rate of 0.3% per month (3.6% a year) and a market premium of 0.5% per month (6% a year), annualised by simple multiplication.',
        'The controls let you separate the true relationship from the problem of measuring it. The true-beta slider tilts the cloud of points; the regression should recover the value approximately. The idiosyncratic-noise slider scatters the points further from the line without changing its true slope, so the estimate becomes less reliable and R² falls; with the default settings, β = 1.2, market volatility 5% and noise 4% per month, R² is around 0.69. The months slider sets the sample size: with only six months the estimate can be badly wrong, while with 240 months it settles close to the truth, because the standard error of a regression slope shrinks roughly as 1/√n. Press Resample to see how much the estimate jumps around with a fresh draw of the same underlying process.',
        'The CAPM is a model of what expected returns should be if investors hold diversified portfolios and only market risk is rewarded. Its central claim, that expected return rises in a straight line with beta (the security market line), is a benchmark rather than a law; real returns scatter around it, and other factors such as company size and value have been found to matter too. The sim\'s data obey the model exactly by construction, which real data never do. The α reported is the intercept of the regression of raw returns on raw returns; since the risk-free rate is not subtracted first, it equals rᶠ(1 − β) when the model holds, so it is slightly negative for β above 1 and slightly positive below, even though the simulated stock is priced exactly as CAPM says. Monthly returns are also treated as independent normal draws with constant volatility, which is a simplification of real markets.',
      ],
      id: [
        'Setiap harga saham bergerak karena dua macam alasan. Sebagian gerakan dialami bersama seluruh pasar, saat suku bunga berubah, resesi mengancam, atau kepercayaan pulih; sebagian lagi khusus bagi perusahaan, peluncuran produk, gugatan hukum, pergantian direktur utama. Bagian yang khusus perusahaan dapat diencerkan hampir sampai nol dengan memegang banyak saham berbeda, karena kejutan baik dan buruk saling meniadakan. Bagian yang menyeluruh pasar tidak bisa didiversifikasi: setiap saham membawanya. Beta mengukur seberapa besar gerakan pasar yang tak terdiversifikasi itu dibawa suatu saham. Saham dengan β = 1 bergerak rata-rata bersama pasar; β = 1,5 memperbesar ayunan pasar satu setengah kali; β = 0,5 meredamnya; β di bawah nol akan bergerak berlawanan dengan pasar.',
        'Simulasi membangkitkan sebuah saham dan memplot return bulanannya terhadap return pasar. Setiap bulan return pasar ditarik acak di sekitar rata-rata tetap, dan return saham dibangun sebagai rᶠ + β(rₘ − rᶠ) ditambah guncangan acak yang saling bebas, yaitu derau idiosinkratik. Garis merah muda adalah regresi kuadrat terkecil return saham terhadap return pasar, dan kemiringannya adalah beta taksiran, cov(rᵢ, rₘ) / var(rₘ). Garis putus-putus kuning berkemiringan 1 sebagai pembanding. R² memberi tahu berapa bagian varians saham yang dijelaskan pasar; sisanya derau khusus perusahaan. Terakhir, simulasi menerapkan Capital Asset Pricing Model, E[r] = rᶠ + β(E[rₘ] − rᶠ), pada beta taksiran, memakai suku bunga bebas risiko tetap 0,3% per bulan (3,6% per tahun) dan premi pasar 0,5% per bulan (6% per tahun), yang ditahunkan dengan perkalian sederhana.',
        'Kontrol memungkinkanmu memisahkan hubungan sejati dari masalah pengukurannya. Slider beta sejati memiringkan awan titik; regresi seharusnya menemukan kembali nilainya secara hampiran. Slider derau idiosinkratik menyebarkan titik lebih jauh dari garis tanpa mengubah kemiringan sejatinya, sehingga taksiran menjadi kurang andal dan R² turun; dengan pengaturan bawaan, β = 1,2, volatilitas pasar 5%, dan derau 4% per bulan, R² sekitar 0,69. Slider bulan mengatur ukuran sampel: dengan hanya enam bulan taksiran bisa sangat meleset, sedangkan dengan 240 bulan ia mendekati nilai sejati, karena galat baku kemiringan regresi menyusut kira-kira sebagai 1/√n. Tekan Resample untuk melihat seberapa jauh taksiran melompat dengan undian baru dari proses dasar yang sama.',
        'CAPM adalah model tentang berapa seharusnya return harapan jika investor memegang portofolio terdiversifikasi dan hanya risiko pasar yang diberi imbalan. Klaim utamanya, bahwa return harapan naik dalam garis lurus terhadap beta (security market line), adalah tolok ukur, bukan hukum; return sungguhan tersebar di sekitarnya, dan faktor lain seperti ukuran perusahaan dan nilai juga ditemukan berpengaruh. Data simulasi mematuhi model dengan tepat karena memang dibangun demikian, sesuatu yang tidak pernah terjadi pada data nyata. α yang dilaporkan adalah intersep regresi return mentah terhadap return mentah; karena suku bunga bebas risiko tidak dikurangkan dulu, nilainya sama dengan rᶠ(1 − β) saat model berlaku, sehingga sedikit negatif untuk β di atas 1 dan sedikit positif di bawahnya, walaupun saham simulasi dihargai persis seperti kata CAPM. Return bulanan juga diperlakukan sebagai undian normal saling bebas dengan volatilitas tetap, yang merupakan penyederhanaan pasar sungguhan.',
      ],
    },
    figure: {
      caption: {
        en: 'Monthly stock returns plotted against market returns. The fitted line\'s slope is beta, here about 1.5: the stock moves 1.5% for every 1% move in the market. The dashed line has slope 1 for comparison. The vertical scatter around the line is idiosyncratic risk, which diversification removes but beta does not capture.',
        id: 'Return bulanan saham diplot terhadap return pasar. Kemiringan garis regresi adalah beta, di sini sekitar 1,5: saham bergerak 1,5% untuk setiap gerakan 1% pasar. Garis putus-putus berkemiringan 1 sebagai pembanding. Sebaran vertikal di sekitar garis adalah risiko idiosinkratik, yang dihilangkan diversifikasi tetapi tidak ditangkap beta.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Scatter of stock versus market returns with a regression line whose slope is beta', 'Sebaran return saham terhadap return pasar dengan garis regresi yang kemiringannya adalah beta')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.ax{stroke:currentColor;stroke-width:1;fill:none;opacity:.6}.s{font-size:10px;opacity:.75}.pt{fill:#3b82f6;opacity:.85}</style>
  <line x1="50" y1="120" x2="330" y2="120" class="ax"/>
  <line x1="190" y1="30" x2="190" y2="210" class="ax"/>
  <text x="300" y="134" class="s">+10%</text>
  <text x="54" y="134" class="s">−10%</text>
  <text x="194" y="38" class="s">+15%</text>
  <text x="194" y="208" class="s">−15%</text>
  <text x="236" y="226" class="s">${L('market return rₘ', 'return pasar rₘ')} →</text>
  <text x="54" y="26" class="s">${L('stock return rᵢ', 'return saham rᵢ')}</text>
  <line x1="60" y1="175.7" x2="320" y2="64.3" stroke="#f59e0b" stroke-width="1.2" stroke-dasharray="5 3"/>
  <text x="262" y="92" fill="#f59e0b" class="s">${L('slope 1 (β = 1)', 'kemiringan 1 (β = 1)')}</text>
  <line x1="60" y1="203.6" x2="320" y2="36.4" stroke="#ef4444" stroke-width="2.4"/>
  <circle cx="78" cy="186" r="3.5" class="pt"/>
  <circle cx="106" cy="183" r="3.5" class="pt"/>
  <circle cx="120" cy="156" r="3.5" class="pt"/>
  <circle cx="148" cy="153" r="3.5" class="pt"/>
  <circle cx="162" cy="126" r="3.5" class="pt"/>
  <circle cx="176" cy="138" r="3.5" class="pt"/>
  <circle cx="190" cy="111" r="3.5" class="pt"/>
  <circle cx="204" cy="117" r="3.5" class="pt"/>
  <circle cx="218" cy="96" r="3.5" class="pt"/>
  <circle cx="232" cy="99" r="3.5" class="pt"/>
  <circle cx="246" cy="78" r="3.5" class="pt"/>
  <circle cx="274" cy="72" r="3.5" class="pt"/>
  <circle cx="288" cy="51" r="3.5" class="pt"/>
  <circle cx="302" cy="54" r="3.5" class="pt"/>
  <line x1="246" y1="78" x2="246" y2="84" stroke="#10b981" stroke-width="2"/>
  <line x1="106" y1="183" x2="106" y2="174" stroke="#10b981" stroke-width="2"/>
  <text x="60" y="60" fill="#ef4444">${L('fitted line, slope β ≈ 1.5', 'garis regresi, kemiringan β ≈ 1,5')}</text>
  <text x="60" y="72" class="s">β = cov(rᵢ, rₘ) / var(rₘ)</text>
  <text x="222" y="178" fill="#10b981" class="s">${L('gaps = idiosyncratic noise', 'celah = derau idiosinkratik')}</text>
  <path d="M250 150 L278 150 L278 108" fill="none" stroke="currentColor" stroke-width="1" opacity=".5"/>
  <text x="256" y="162" class="s">1%</text>
  <text x="282" y="132" class="s">1.5%</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Beta is the slope of stock returns against market returns: β = cov(rᵢ, rₘ) / var(rₘ), the share\'s sensitivity to market-wide moves.',
        'Company-specific (idiosyncratic) risk can be diversified away; market risk cannot, and beta measures how much of it a share carries.',
        'The CAPM says expected return rewards only market risk: E[r] = rᶠ + β(E[rₘ] − rᶠ), a straight line in β called the security market line.',
        'R² is the fraction of a stock\'s variance explained by the market; more idiosyncratic noise lowers R² without changing the true beta.',
        'A beta estimated from data is noisy: more months of observation tighten it, roughly in proportion to 1/√n.',
      ],
      id: [
        'Beta adalah kemiringan return saham terhadap return pasar: β = cov(rᵢ, rₘ) / var(rₘ), kepekaan saham terhadap gerakan seluruh pasar.',
        'Risiko khusus perusahaan (idiosinkratik) bisa didiversifikasi; risiko pasar tidak bisa, dan beta mengukur seberapa besar risiko itu dibawa suatu saham.',
        'CAPM menyatakan return harapan hanya mengimbali risiko pasar: E[r] = rᶠ + β(E[rₘ] − rᶠ), garis lurus dalam β yang disebut security market line.',
        'R² adalah bagian varians saham yang dijelaskan pasar; derau idiosinkratik yang lebih besar menurunkan R² tanpa mengubah beta sejati.',
        'Beta yang ditaksir dari data bersifat berisik: lebih banyak bulan pengamatan mempersempitnya, kira-kira sebanding dengan 1/√n.',
      ],
    },
    vocabulary: {
      en: [
        ['Beta (β)', 'The regression slope of a share\'s returns on the market\'s returns; β = 1 means it moves with the market on average.'],
        ['Market risk (systematic risk)', 'The part of a share\'s movement shared with the whole market, which diversification cannot remove.'],
        ['Idiosyncratic risk', 'The company-specific part of a share\'s movement, which averages out in a diversified portfolio.'],
        ['Risk-free rate (rᶠ)', 'The return on a safe asset such as a short-term government bill; 3.6% a year in the sim.'],
        ['Market risk premium', 'The expected excess return of the market over the risk-free rate, E[rₘ] − rᶠ; 6% a year in the sim.'],
        ['Security market line', 'The CAPM relation plotted with beta on the horizontal axis and expected return on the vertical: a straight line from rᶠ with slope equal to the market premium.'],
        ['R²', 'The share of a stock\'s return variance explained by the market; equal to the squared correlation between the two return series.'],
        ['Alpha (α)', 'The intercept of the return regression; in the sim it is measured on raw returns, so it equals rᶠ(1 − β) when CAPM holds exactly.'],
      ],
      id: [
        ['Beta (β)', 'Kemiringan regresi return saham terhadap return pasar; β = 1 berarti saham bergerak rata-rata bersama pasar.'],
        ['Risiko pasar (sistematis)', 'Bagian gerakan saham yang dialami bersama seluruh pasar, yang tidak bisa dihilangkan diversifikasi.'],
        ['Risiko idiosinkratik', 'Bagian gerakan saham yang khusus perusahaan, yang saling meniadakan dalam portofolio terdiversifikasi.'],
        ['Suku bunga bebas risiko (rᶠ)', 'Imbal hasil aset aman seperti surat utang pemerintah jangka pendek; 3,6% per tahun di simulasi.'],
        ['Premi risiko pasar', 'Kelebihan return harapan pasar di atas suku bunga bebas risiko, E[rₘ] − rᶠ; 6% per tahun di simulasi.'],
        ['Security market line', 'Hubungan CAPM yang diplot dengan beta pada sumbu mendatar dan return harapan pada sumbu tegak: garis lurus dari rᶠ dengan kemiringan sebesar premi pasar.'],
        ['R²', 'Bagian varians return saham yang dijelaskan pasar; sama dengan kuadrat korelasi antara kedua deret return.'],
        ['Alfa (α)', 'Intersep regresi return; di simulasi diukur pada return mentah, sehingga sama dengan rᶠ(1 − β) saat CAPM berlaku tepat.'],
      ],
    },
    misconceptions: {
      en: [
        ['Beta measures how risky a share is overall.', 'It measures only the market-related part. A share can have a low beta and still be wildly volatile if most of its movement is company-specific; raise the idiosyncratic noise in the sim and watch R² fall while beta stays near its true value.'],
        ['Doubling beta doubles the expected return.', 'It doubles only the risk premium, β(E[rₘ] − rᶠ). With rᶠ = 3.6% and a 6% premium, β = 1 gives 9.6% and β = 2 gives 15.6%, not 19.2%.'],
        ['A negative beta means the asset loses money on average.', 'It means the asset tends to move against the market. CAPM gives it an expected return below rᶠ, which investors accept because it acts as insurance when the market falls.'],
        ['The beta from a regression is the true beta.', 'It is an estimate with sampling error. In the sim, six months of data can give a beta far from the one you set; the estimate tightens as the number of months grows.'],
      ],
      id: [
        ['Beta mengukur seberapa berisiko suatu saham secara keseluruhan.', 'Beta hanya mengukur bagian yang terkait pasar. Saham bisa punya beta rendah tetapi sangat bergejolak jika sebagian besar gerakannya khusus perusahaan; naikkan derau idiosinkratik di simulasi dan lihat R² turun sementara beta tetap dekat nilai sejatinya.'],
        ['Menggandakan beta menggandakan return harapan.', 'Yang digandakan hanya premi risikonya, β(E[rₘ] − rᶠ). Dengan rᶠ = 3,6% dan premi 6%, β = 1 memberi 9,6% dan β = 2 memberi 15,6%, bukan 19,2%.'],
        ['Beta negatif berarti aset itu rata-rata merugi.', 'Artinya aset itu cenderung bergerak berlawanan dengan pasar. CAPM memberinya return harapan di bawah rᶠ, yang diterima investor karena ia berfungsi sebagai asuransi saat pasar jatuh.'],
        ['Beta dari regresi adalah beta sejati.', 'Itu taksiran dengan galat pengambilan sampel. Di simulasi, data enam bulan bisa memberi beta yang jauh dari yang kamu atur; taksiran menyempit saat jumlah bulan bertambah.'],
      ],
    },
    realWorld: {
      en: [
        'Financial data services publish betas for listed companies, usually estimated by exactly this regression over several years of monthly returns against a broad index such as the S&P 500 or Indonesia\'s IHSG.',
        'Companies use CAPM to set the discount rate for new projects: a higher beta means investors demand a higher return, so fewer projects clear the hurdle.',
        'Utilities and consumer-staples firms typically have betas below 1, while technology and cyclical firms are often above 1, matching the defensive and aggressive labels.',
        'William Sharpe shared the 1990 Nobel Memorial Prize in Economics for developing the CAPM, and the model remains the starting point of most corporate-finance courses.',
      ],
      id: [
        'Layanan data keuangan menerbitkan beta perusahaan tercatat, biasanya ditaksir dengan regresi seperti ini atas beberapa tahun return bulanan terhadap indeks luas seperti S&P 500 atau IHSG di Indonesia.',
        'Perusahaan memakai CAPM untuk menetapkan tingkat diskonto proyek baru: beta lebih tinggi berarti investor menuntut return lebih tinggi, sehingga lebih sedikit proyek yang melewati ambang.',
        'Perusahaan utilitas dan barang konsumsi pokok biasanya berbeta di bawah 1, sementara perusahaan teknologi dan siklikal sering di atas 1, sesuai label defensif dan agresif.',
        'William Sharpe berbagi Hadiah Nobel Ekonomi 1990 atas pengembangan CAPM, dan model ini tetap menjadi titik awal sebagian besar mata kuliah keuangan perusahaan.',
      ],
    },
    questions: {
      en: [
        { q: 'Using the sim\'s risk-free rate of 3.6% a year and market premium of 6% a year, what expected return does CAPM give a stock with β = 0.5? And with β = 1.5?', a: 'E[r] = 3.6% + 0.5 × 6% = 6.6% for β = 0.5, and 3.6% + 1.5 × 6% = 12.6% for β = 1.5. The premium scales with beta but the risk-free part does not, so the returns are not in a 1 : 3 ratio.' },
        { q: 'Over a sample, the covariance between a stock\'s and the market\'s monthly returns is 0.0030 and the variance of market returns is 0.0025. What is the stock\'s beta, and is it defensive or aggressive?', a: 'β = 0.0030 / 0.0025 = 1.2. It is above 1, so the stock is aggressive: it tends to move 1.2% for each 1% move in the market.' },
        { q: 'With true β = 1.2, market volatility 5% and idiosyncratic noise 4% per month, what R² should the regression show, and what happens to it if the noise rises to 10%?', a: 'Market-driven variance is (1.2 × 0.05)² = 0.0036 and noise variance is 0.04² = 0.0016, so R² ≈ 0.0036 / (0.0036 + 0.0016) ≈ 0.69. At 10% noise the noise variance is 0.01, giving R² ≈ 0.0036 / 0.0136 ≈ 0.26. The true beta is unchanged; only the share of movement explained by the market falls.' },
      ],
      id: [
        { q: 'Dengan suku bunga bebas risiko simulasi 3,6% per tahun dan premi pasar 6% per tahun, berapa return harapan CAPM untuk saham dengan β = 0,5? Dan dengan β = 1,5?', a: 'E[r] = 3,6% + 0,5 × 6% = 6,6% untuk β = 0,5, dan 3,6% + 1,5 × 6% = 12,6% untuk β = 1,5. Preminya berskala dengan beta tetapi bagian bebas risikonya tidak, sehingga perbandingan returnnya bukan 1 : 3.' },
        { q: 'Dalam suatu sampel, kovarians return bulanan saham dan pasar adalah 0,0030 dan varians return pasar 0,0025. Berapa beta saham itu, dan apakah defensif atau agresif?', a: 'β = 0,0030 / 0,0025 = 1,2. Nilainya di atas 1, jadi saham ini agresif: cenderung bergerak 1,2% untuk setiap gerakan 1% pasar.' },
        { q: 'Dengan β sejati = 1,2, volatilitas pasar 5%, dan derau idiosinkratik 4% per bulan, berapa R² yang seharusnya ditunjukkan regresi, dan apa yang terjadi jika derau naik ke 10%?', a: 'Varians yang digerakkan pasar adalah (1,2 × 0,05)² = 0,0036 dan varians derau 0,04² = 0,0016, sehingga R² ≈ 0,0036 / (0,0036 + 0,0016) ≈ 0,69. Pada derau 10% varians derau 0,01, memberi R² ≈ 0,0036 / 0,0136 ≈ 0,26. Beta sejatinya tidak berubah; hanya bagian gerakan yang dijelaskan pasar yang turun.' },
      ],
    },
  },
};
