// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Distinguish innovators from imitators in the adoption curve.',
      'See how p drives the early ramp; q drives the steepness.',
      'Predict peak adoption time from p and q.',
    ],
    id: [
      'Membedakan inovator dan peniru dalam kurva adopsi.',
      'Melihat p mendorong awal; q mendorong kecuraman.',
      'Memprediksi waktu puncak adopsi dari p dan q.',
    ],
  },
  tryThis: {
    en: [
      'p=0.03, q=0.4 (typical) — classic S-curve.',
      'p high, q low — steady linear adoption.',
      'p low, q high — slow start then explosion.',
    ],
    id: [
      'p=0,03, q=0,4 (umum) — kurva S klasik.',
      'p tinggi, q rendah — adopsi linear stabil.',
      'p rendah, q tinggi — awal lambat lalu ledakan.',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'When a new product, technology or habit spreads through a population, the cumulative number of adopters almost always traces an S-shaped curve: a slow start, a steep middle, and a levelling off as the market saturates. Frank Bass proposed in 1969 that this shape comes from two kinds of influence acting on the people who have not yet adopted. External influence (advertising, news, shops) converts a fixed fraction p of the remaining non-adopters per unit time; these are the innovators. Internal influence (seeing friends and neighbours use the product) converts remaining non-adopters at a rate proportional to the fraction who already have, q × N/M; these are the imitators.',
        'Putting the two together gives the Bass equation: dN/dt = (p + q·N/M) × (M − N), where N is the number of adopters so far and M is the total market. The simulation integrates this equation step by step (six small Euler sub-steps per frame) and draws two graphs: cumulative adopters N(t) on the left and the adoption rate dN/dt, the number of new adopters per unit time, on the right. The p slider sets the innovation coefficient, q the imitation coefficient, M the market size (which resets the run), and Speed only changes how fast simulated time passes.',
        'The rate curve rises and then falls because it is a product of two opposing quantities: the pool of people left to convert, M − N, shrinks, while the pull of imitation, q·N/M, grows. When q is larger than p the rate peaks at time t* = ln(q/p) ÷ (p + q), and at that moment the fraction adopted is (q − p) ÷ (2q), close to one half when imitation dominates. With the defaults p = 0.03 and q = 0.4 the peak comes at about t = 6 with roughly 46% of the market converted. A larger p shifts adoption earlier and fills in the slow start; a larger q makes the peak earlier and much taller. If q is not larger than p there is no peak at all: the rate is highest at the launch and decays steadily, which is what the Mass marketing preset shows.',
        'The model has real limits. It assumes a fixed market M known in advance, constant p and q, no price changes, no competing products, no repeat purchases and no one giving the product up, and it treats the population as one well-mixed group rather than a network. In practice p and q are estimated from the first few years of sales and the fit is often good, but forecasts made before the peak are sensitive to small errors. Studies across many consumer durables find typical values near p ≈ 0.03 and q ≈ 0.4, which is why these are the defaults.',
      ],
      id: [
        'Ketika produk, teknologi, atau kebiasaan baru menyebar dalam suatu populasi, jumlah kumulatif pengadopsi hampir selalu membentuk kurva S: awal yang lambat, bagian tengah yang curam, dan pendataran saat pasar jenuh. Frank Bass mengusulkan pada 1969 bahwa bentuk ini berasal dari dua jenis pengaruh yang bekerja pada orang yang belum mengadopsi. Pengaruh eksternal (iklan, berita, toko) mengubah fraksi tetap p dari sisa non-pengadopsi per satuan waktu; mereka adalah inovator. Pengaruh internal (melihat teman dan tetangga memakai produk) mengubah sisa non-pengadopsi dengan laju yang sebanding dengan fraksi yang sudah mengadopsi, q × N/M; mereka adalah peniru.',
        'Menggabungkan keduanya menghasilkan persamaan Bass: dN/dt = (p + q·N/M) × (M − N), dengan N jumlah pengadopsi sejauh ini dan M total pasar. Simulasi mengintegrasikan persamaan ini langkah demi langkah (enam sublangkah Euler kecil per frame) dan menggambar dua grafik: pengadopsi kumulatif N(t) di kiri dan laju adopsi dN/dt, jumlah pengadopsi baru per satuan waktu, di kanan. Slider p mengatur koefisien inovasi, q koefisien imitasi, M ukuran pasar (yang mengatur ulang jalannya simulasi), dan Speed hanya mengubah seberapa cepat waktu simulasi berjalan.',
        'Kurva laju naik lalu turun karena ia hasil kali dua besaran yang berlawanan: kumpulan orang yang masih bisa diubah, M − N, menyusut, sementara tarikan imitasi, q·N/M, membesar. Ketika q lebih besar dari p, laju mencapai puncak pada waktu t* = ln(q/p) ÷ (p + q), dan pada saat itu fraksi yang telah mengadopsi adalah (q − p) ÷ (2q), mendekati setengah ketika imitasi mendominasi. Dengan nilai awal p = 0,03 dan q = 0,4, puncak datang di sekitar t = 6 dengan kira-kira 46% pasar sudah terkonversi. p yang lebih besar menggeser adopsi lebih awal dan mengisi awal yang lambat; q yang lebih besar membuat puncak lebih awal dan jauh lebih tinggi. Jika q tidak lebih besar dari p, tidak ada puncak sama sekali: laju tertinggi terjadi saat peluncuran dan terus menurun, seperti yang ditunjukkan preset Mass marketing.',
        'Model ini punya batas yang nyata. Ia mengasumsikan pasar M tetap dan sudah diketahui sejak awal, p dan q konstan, tanpa perubahan harga, tanpa produk pesaing, tanpa pembelian ulang, tanpa yang berhenti memakai, dan memperlakukan populasi sebagai satu kelompok yang tercampur rata, bukan jaringan. Dalam praktiknya p dan q ditaksir dari penjualan beberapa tahun pertama dan kecocokannya sering baik, tetapi ramalan yang dibuat sebelum puncak peka terhadap kesalahan kecil. Studi pada banyak barang tahan lama menemukan nilai khas sekitar p ≈ 0,03 dan q ≈ 0,4; itulah sebabnya keduanya menjadi nilai awal.',
      ],
    },
    figure: {
      caption: {
        en: 'Bass model with p = 0.03, q = 0.4. Left: cumulative adopters trace an S-curve. Right: new adopters per unit time, split into innovators p(M − N) (blue) and imitators q(N/M)(M − N) (green). Imitation is tiny at first and dominates later; the total peaks at t* = ln(q/p)/(p + q) ≈ 6, when about 46% have adopted.',
        id: 'Model Bass dengan p = 0,03, q = 0,4. Kiri: pengadopsi kumulatif membentuk kurva S. Kanan: pengadopsi baru per satuan waktu, dipisah menjadi inovator p(M − N) (biru) dan peniru q(N/M)(M − N) (hijau). Imitasi sangat kecil di awal dan mendominasi kemudian; totalnya memuncak pada t* = ln(q/p)/(p + q) ≈ 6, ketika sekitar 46% telah mengadopsi.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        const p = 0.03, q = 0.4, T = 20, n = 80;
        const F = (t) => (1 - Math.exp(-(p + q) * t)) / (1 + (q / p) * Math.exp(-(p + q) * t));
        const pts = [];
        for (let i = 0; i <= n; i++) {
          const t = (T * i) / n, f = F(t);
          pts.push({ t, f, inn: p * (1 - f), imi: q * f * (1 - f) });
        }
        const tStar = Math.log(q / p) / (p + q);
        const rMax = Math.max(...pts.map((d) => d.inn + d.imi));
        const xL = (t) => (30 + (t / T) * 140).toFixed(1);
        const xR = (t) => (200 + (t / T) * 140).toFixed(1);
        const yS = (f) => (200 - f * 140).toFixed(1);
        const yR = (v) => (200 - (v / rMax) * 140).toFixed(1);
        const sPath = pts.map((d, i) => `${i ? 'L' : 'M'}${xL(d.t)} ${yS(d.f)}`).join(' ');
        const total = pts.map((d, i) => `${i ? 'L' : 'M'}${xR(d.t)} ${yR(d.inn + d.imi)}`).join(' ');
        const inn = pts.map((d, i) => `${i ? 'L' : 'M'}${xR(d.t)} ${yR(d.inn)}`).join(' ');
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Bass diffusion curves', 'Kurva difusi Bass')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.s{font-size:10px;opacity:.75}.g{fill:none;stroke:currentColor;stroke-width:1;opacity:.5}</style>
  <text x="30" y="18" font-weight="bold">${L('Cumulative adopters N/M', 'Pengadopsi kumulatif N/M')}</text>
  <line x1="30" y1="200" x2="170" y2="200" class="g"/>
  <line x1="30" y1="60" x2="30" y2="200" class="g"/>
  <line x1="27" y1="60" x2="170" y2="60" class="g" stroke-dasharray="3 3"/>
  <text x="8" y="64" class="s">100%</text>
  <text x="18" y="204" class="s">0</text>
  <text x="26" y="214" class="s">t = 0</text>
  <text x="152" y="214" class="s">t = 20</text>
  <path d="${sPath}" fill="none" stroke="#8b5cf6" stroke-width="2.5"/>
  <line x1="${xL(tStar)}" y1="${yS(F(tStar))}" x2="${xL(tStar)}" y2="200" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="3 3"/>
  <circle cx="${xL(tStar)}" cy="${yS(F(tStar))}" r="4" fill="#f59e0b"/>
  <text x="${(+xL(tStar) + 8).toFixed(1)}" y="${(+yS(F(tStar)) + 12).toFixed(1)}" fill="#f59e0b" class="s">${L('46% at t*', '46% pada t*')}</text>
  <text x="200" y="18" font-weight="bold">${L('New adopters per unit time', 'Pengadopsi baru per satuan waktu')}</text>
  <line x1="200" y1="200" x2="340" y2="200" class="g"/>
  <line x1="200" y1="60" x2="200" y2="200" class="g"/>
  <text x="196" y="214" class="s">t = 0</text>
  <text x="322" y="214" class="s">t = 20</text>
  <path d="${total} L340 200 L200 200 Z" fill="#10b981" opacity=".8"/>
  <path d="${inn} L340 200 L200 200 Z" fill="#3b82f6" opacity=".9"/>
  <line x1="${xR(tStar)}" y1="${yR(rMax)}" x2="${xR(tStar)}" y2="200" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="3 3"/>
  <circle cx="${xR(tStar)}" cy="${yR(rMax)}" r="4" fill="#f59e0b"/>
  <text x="${(+xR(tStar) + 8).toFixed(1)}" y="${(+yR(rMax) + 4).toFixed(1)}" fill="#f59e0b" class="s">t* ≈ ${tStar.toFixed(1)}</text>
  <text x="258" y="150" fill="#10b981" class="s">${L('imitators q(N/M)(M−N)', 'peniru q(N/M)(M−N)')}</text>
  <text x="206" y="194" fill="#3b82f6" class="s" font-weight="bold">${L('innovators p(M−N)', 'inovator p(M−N)')}</text>
  <text x="80" y="234" class="s">${L('peak time t* = ln(q/p) ÷ (p + q) = ln(13.3) ÷ 0.43', 'waktu puncak t* = ln(q/p) ÷ (p + q) = ln(13,3) ÷ 0,43')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Adoption is driven by two forces on non-adopters: external influence at rate p (innovators) and internal, word-of-mouth influence at rate q × N/M (imitators).',
        'The Bass equation dN/dt = (p + qN/M)(M − N) produces an S-shaped cumulative curve and a bell-shaped adoption-rate curve.',
        'The rate peaks because the remaining market M − N shrinks while the imitation pull qN/M grows; the peak is at t* = ln(q/p)/(p + q) when q is greater than p.',
        'Raising p fills in the slow start and brings adoption earlier; raising q makes the take-off sharper and the peak earlier and taller.',
        'When q is not larger than p there is no take-off: adoption is fastest at launch and declines from there.',
      ],
      id: [
        'Adopsi digerakkan oleh dua gaya pada non-pengadopsi: pengaruh eksternal dengan laju p (inovator) dan pengaruh internal dari mulut ke mulut dengan laju q × N/M (peniru).',
        'Persamaan Bass dN/dt = (p + qN/M)(M − N) menghasilkan kurva kumulatif berbentuk S dan kurva laju adopsi berbentuk bel.',
        'Laju memuncak karena sisa pasar M − N menyusut sementara tarikan imitasi qN/M membesar; puncaknya di t* = ln(q/p)/(p + q) ketika q lebih besar dari p.',
        'Menaikkan p mengisi awal yang lambat dan mempercepat adopsi; menaikkan q membuat lepas landas lebih tajam serta puncak lebih awal dan lebih tinggi.',
        'Ketika q tidak lebih besar dari p, tidak ada lepas landas: adopsi tercepat saat peluncuran dan menurun sejak itu.',
      ],
    },
    vocabulary: {
      en: [
        ['Diffusion of innovation', 'The process by which a new product, idea or practice spreads through a population over time.'],
        ['Market potential (M)', 'The total number of people who will eventually adopt; the ceiling of the S-curve.'],
        ['Coefficient of innovation (p)', 'The fraction of remaining non-adopters converted per unit time by external influence such as advertising.'],
        ['Coefficient of imitation (q)', 'The strength of internal influence: how strongly existing adopters pull in the rest.'],
        ['Innovators and imitators', 'Bass\'s names for adopters moved by external influence and by contact with earlier adopters, respectively.'],
        ['Cumulative adopters N(t)', 'The total number who have adopted by time t; its graph is the S-curve.'],
        ['Adoption rate dN/dt', 'New adopters per unit time; it rises to a peak and then falls.'],
        ['Saturation', 'The stage when almost everyone who will adopt has done so, so the rate of new adoption falls toward zero.'],
      ],
      id: [
        ['Difusi inovasi', 'Proses penyebaran produk, ide, atau praktik baru dalam suatu populasi seiring waktu.'],
        ['Potensi pasar (M)', 'Jumlah total orang yang pada akhirnya akan mengadopsi; batas atas kurva S.'],
        ['Koefisien inovasi (p)', 'Fraksi sisa non-pengadopsi yang terkonversi per satuan waktu oleh pengaruh eksternal seperti iklan.'],
        ['Koefisien imitasi (q)', 'Kekuatan pengaruh internal: seberapa kuat pengadopsi yang sudah ada menarik sisanya.'],
        ['Inovator dan peniru', 'Sebutan Bass untuk pengadopsi yang digerakkan pengaruh eksternal dan yang digerakkan kontak dengan pengadopsi sebelumnya.'],
        ['Pengadopsi kumulatif N(t)', 'Jumlah total yang telah mengadopsi sampai waktu t; grafiknya adalah kurva S.'],
        ['Laju adopsi dN/dt', 'Pengadopsi baru per satuan waktu; naik ke puncak lalu turun.'],
        ['Kejenuhan', 'Tahap ketika hampir semua yang akan mengadopsi sudah melakukannya, sehingga laju adopsi baru turun menuju nol.'],
      ],
    },
    misconceptions: {
      en: [
        ['A product that sells slowly in its first years is failing.', 'A low p with a high q looks exactly like this: almost nothing happens, then word of mouth takes over and sales explode. The Slow burner preset shows a launch that seems dead for a long time before taking off.'],
        ['The S-curve means growth is exponential.', 'Only the early part is roughly exponential. As the pool of non-adopters shrinks the growth slows and the curve flattens at M. Pure exponential growth would never level off.'],
        ['p and q are the percentages of innovators and imitators in the population.', 'They are rates per unit time, not population shares. p is the chance per unit time that a non-adopter is converted by external influence; q scales how strongly each unit of existing adoption converts the rest.'],
        ['Fitting the Bass model to early sales reliably predicts the final market size.', 'Before the peak, many different combinations of p, q and M fit the same early data, so forecasts of M are unreliable until adoption has clearly slowed. The model describes the shape well but is not a crystal ball.'],
      ],
      id: [
        ['Produk yang penjualannya lambat di tahun-tahun pertama berarti gagal.', 'p rendah dengan q tinggi tampak persis seperti ini: hampir tidak ada yang terjadi, lalu penyebaran dari mulut ke mulut mengambil alih dan penjualan meledak. Preset Slow burner menunjukkan peluncuran yang tampak mati lama sebelum lepas landas.'],
        ['Kurva S berarti pertumbuhannya eksponensial.', 'Hanya bagian awalnya yang kira-kira eksponensial. Saat kumpulan non-pengadopsi menyusut, pertumbuhan melambat dan kurva mendatar di M. Pertumbuhan eksponensial murni tidak akan pernah mendatar.'],
        ['p dan q adalah persentase inovator dan peniru dalam populasi.', 'Keduanya laju per satuan waktu, bukan porsi populasi. p adalah peluang per satuan waktu seorang non-pengadopsi terkonversi oleh pengaruh eksternal; q mengukur seberapa kuat tiap satuan adopsi yang ada mengonversi sisanya.'],
        ['Mencocokkan model Bass dengan penjualan awal secara andal meramalkan ukuran pasar akhir.', 'Sebelum puncak, banyak kombinasi p, q, dan M yang berbeda cocok dengan data awal yang sama, sehingga ramalan M tidak andal sampai adopsi jelas melambat. Model ini menggambarkan bentuknya dengan baik, tetapi bukan bola kristal.'],
      ],
    },
    realWorld: {
      en: [
        'Bass originally fitted the model to sales of consumer durables such as televisions, refrigerators and air conditioners in the United States, and it is still used in marketing to forecast new product sales.',
        'Mobile phones and later smartphones followed S-curves country by country; in Indonesia smartphones went from rare to widespread within roughly a decade.',
        'Rooftop solar panels and electric vehicles are tracked with diffusion models to plan grid capacity and charging networks.',
        'The same mathematics describes the spread of a rumour or a fashion: external sources start it, and contact with people who already follow it does the rest.',
      ],
      id: [
        'Bass mula-mula mencocokkan modelnya dengan penjualan barang tahan lama seperti televisi, lemari es, dan pendingin udara di Amerika Serikat, dan model ini masih dipakai dalam pemasaran untuk meramalkan penjualan produk baru.',
        'Telepon seluler dan kemudian ponsel pintar mengikuti kurva S di tiap negara; di Indonesia ponsel pintar berubah dari barang langka menjadi umum dalam kira-kira satu dekade.',
        'Panel surya atap dan kendaraan listrik dipantau dengan model difusi untuk merencanakan kapasitas jaringan listrik dan jaringan pengisian daya.',
        'Matematika yang sama menggambarkan penyebaran rumor atau mode: sumber eksternal memulainya, dan kontak dengan orang yang sudah mengikutinya menyelesaikan sisanya.',
      ],
    },
    questions: {
      en: [
        { q: 'For p = 0.01 and q = 0.5, when does adoption peak, and what fraction of the market has adopted at that moment?', a: 't* = ln(q/p) ÷ (p + q) = ln(50) ÷ 0.51 ≈ 3.91 ÷ 0.51 ≈ 7.7 time units. The fraction adopted at the peak is (q − p) ÷ (2q) = 0.49 ÷ 1.0 = 49%. Strong imitation puts the peak almost exactly at the halfway point.' },
        { q: 'The Mass marketing preset sets p = q = 0.05. Why does the adoption-rate graph show no bump?', a: 'With q/p = 1, ln(q/p) = 0, so the formula puts the peak at t = 0. The imitation term never grows faster than the shrinking pool of non-adopters, so the rate is highest at launch and simply decays. An S-curve needs word of mouth to outweigh external influence.' },
        { q: 'Two products both reach 1000 adopters eventually. Product A has high p and low q, product B low p and high q. How do their rate curves differ, and what does this mean for a company launching B?', a: 'A converts a steady share of the remaining market from day one, so its rate starts high and declines gently with no sharp peak. B barely moves at first because almost no one is there to imitate, then surges once a critical mass exists and peaks late and sharply. A company launching B must be patient through the quiet start, and seeding early adopters (raising effective p) shortens that wait.' },
      ],
      id: [
        { q: 'Untuk p = 0,01 dan q = 0,5, kapan adopsi memuncak, dan berapa fraksi pasar yang telah mengadopsi pada saat itu?', a: 't* = ln(q/p) ÷ (p + q) = ln(50) ÷ 0,51 ≈ 3,91 ÷ 0,51 ≈ 7,7 satuan waktu. Fraksi yang telah mengadopsi di puncak adalah (q − p) ÷ (2q) = 0,49 ÷ 1,0 = 49%. Imitasi yang kuat menempatkan puncak hampir tepat di titik tengah.' },
        { q: 'Preset Mass marketing mengatur p = q = 0,05. Mengapa grafik laju adopsi tidak menunjukkan tonjolan?', a: 'Dengan q/p = 1, ln(q/p) = 0, sehingga rumus menempatkan puncak di t = 0. Suku imitasi tidak pernah tumbuh lebih cepat daripada menyusutnya kumpulan non-pengadopsi, jadi laju tertinggi terjadi saat peluncuran dan terus menurun. Kurva S membutuhkan penyebaran dari mulut ke mulut yang melebihi pengaruh eksternal.' },
        { q: 'Dua produk pada akhirnya sama-sama mencapai 1000 pengadopsi. Produk A punya p tinggi dan q rendah, produk B p rendah dan q tinggi. Bagaimana kurva lajunya berbeda, dan apa artinya bagi perusahaan yang meluncurkan B?', a: 'A mengonversi porsi tetap dari sisa pasar sejak hari pertama, jadi lajunya mulai tinggi dan menurun landai tanpa puncak tajam. B hampir tidak bergerak di awal karena hampir tak ada yang bisa ditiru, lalu melonjak begitu massa kritis terbentuk dan memuncak terlambat dan tajam. Perusahaan yang meluncurkan B harus sabar melewati awal yang sepi, dan menanam pengadopsi awal (menaikkan p efektif) memperpendek penantian itu.' },
      ],
    },
  },
};
