// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Recognize the shape of common distributions.',
      'Predict how mean and standard deviation change a normal\'s shape.',
      'See how sample size affects how close a histogram matches the true PDF.',
    ],
    id: [
      'Mengenali bentuk distribusi yang umum.',
      'Memprediksi pengaruh rata-rata dan simpangan baku terhadap bentuk distribusi normal.',
      'Melihat bagaimana ukuran sampel memengaruhi kedekatan histogram dengan PDF sejati.',
    ],
  },  tryThis: {
    en: [
      'Set σ = 0.1 vs σ = 2 — how does spread change?',
      'Switch to exponential — does the histogram peak match λ?',
      'Drop sample count to 50 — how noisy is the histogram?',
    ],
    id: [
      'Atur σ = 0,1 vs σ = 2 — bagaimana lebar distribusinya berubah?',
      'Beralih ke eksponensial — apakah puncak histogram sesuai λ?',
      'Turunkan jumlah sampel ke 50 — seberapa berisik histogramnya?',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'A probability distribution describes which values a random quantity can take and how likely each is. For a continuous quantity such as a height or a waiting time, the description is a probability density function (PDF): the probability of landing between two values is the area under the curve between them, and the whole area is 1. For a count, such as the number of heads in 20 coin flips, the description is a probability mass function, a bar for each possible outcome. The simulation draws random samples from the chosen distribution, sorts them into bins, and scales each bar to count ÷ (sample size × bin width), so the histogram has total area 1 and can be laid directly over the green theoretical curve.',
        'Four families are offered, each with its own parameters mapped to the sliders Param 1 and Param 2. Normal(μ, σ) is the symmetric bell: μ sets the centre and σ the width, with about 68% of values within one σ of μ and 95% within two. Uniform(a, b) is flat between a and b with height 1/(b − a). Exponential(λ) models waiting times between random events: its density starts at height λ at zero and decays, its mean and standard deviation are both 1/λ, and its peak is always at zero, never at the mean. Binomial(n, p) counts successes in n independent trials with success probability p; its mean is n·p, its standard deviation is √(n·p·(1 − p)), and it is symmetric only when p = 0.5. The simulation samples with the standard methods (Box–Muller for the normal, inverse transform for the exponential, and n simulated coin flips for the binomial).',
        'The sample-size and bin sliders show how estimation from data works. With 50 samples the histogram is jagged because each bar holds only a few values and chance dominates; with 50,000 it hugs the curve, since the relative noise in a bar shrinks roughly like 1 divided by the square root of its count. More bins give finer detail but fewer samples per bin and therefore more noise; fewer bins are smoother but coarser. Resample redraws a fresh set with the same settings: the curve stays put while the bars jitter, which is exactly the difference between a population and a sample. Hover over the chart to compare one bar\'s density with the value of the PDF there.',
        'The simulation has some limits. Only four families are included; real data often need others, such as the Poisson for counts of rare events. The exponential ignores Param 2. For the binomial, the Param 2 slider only reaches 5 even though the default n is 20, so touching that slider reduces n, and the integer bars are drawn on a slightly shifted grid, which makes them sit about 5% above and a little to the left of the curve. The lab\'s sample standard deviation divides by n rather than n − 1, a negligible difference at these sample sizes. None of this changes the central lesson: a histogram of enough samples converges to the distribution they came from.',
      ],
      id: [
        'Distribusi peluang menggambarkan nilai-nilai apa yang bisa diambil sebuah besaran acak dan seberapa besar kemungkinan masing-masing. Untuk besaran kontinu seperti tinggi badan atau waktu tunggu, gambarannya berupa fungsi kepadatan peluang (PDF): peluang jatuh di antara dua nilai adalah luas di bawah kurva di antara keduanya, dan luas totalnya 1. Untuk besaran cacahan, seperti banyaknya sisi gambar dalam 20 lemparan koin, gambarannya berupa fungsi massa peluang, satu batang untuk setiap hasil yang mungkin. Simulasi mengambil sampel acak dari distribusi yang dipilih, memilahnya ke dalam bin, dan menskalakan tiap batang menjadi cacah ÷ (ukuran sampel × lebar bin), sehingga histogram berluas total 1 dan bisa langsung ditumpangkan pada kurva teoretis hijau.',
        'Ada empat keluarga distribusi, masing-masing dengan parameter yang dipetakan ke slider Param 1 dan Param 2. Normal(μ, σ) adalah lonceng simetris: μ menentukan pusat dan σ lebarnya, dengan sekitar 68% nilai berada dalam jarak satu σ dari μ dan 95% dalam dua σ. Uniform(a, b) datar antara a dan b dengan tinggi 1/(b − a). Eksponensial(λ) memodelkan waktu tunggu antara kejadian acak: kepadatannya mulai dari tinggi λ di nol lalu meluruh, rata-rata dan simpangan bakunya sama-sama 1/λ, dan puncaknya selalu di nol, tidak pernah di rata-rata. Binomial(n, p) menghitung keberhasilan dalam n percobaan saling bebas dengan peluang keberhasilan p; rata-ratanya n·p, simpangan bakunya √(n·p·(1 − p)), dan bentuknya simetris hanya jika p = 0,5. Simulasi mengambil sampel dengan metode standar (Box–Muller untuk normal, transformasi invers untuk eksponensial, dan n lemparan koin tersimulasi untuk binomial).',
        'Slider ukuran sampel dan bin menunjukkan cara kerja penaksiran dari data. Dengan 50 sampel histogram bergerigi karena tiap batang hanya memuat beberapa nilai dan kebetulan mendominasi; dengan 50.000 sampel histogram merapat ke kurva, karena derau relatif sebuah batang menyusut kira-kira seperti 1 dibagi akar kuadrat cacahnya. Bin yang lebih banyak memberi detail lebih halus tetapi sampel per bin lebih sedikit sehingga lebih berderau; bin yang lebih sedikit lebih mulus tetapi lebih kasar. Resample mengambil ulang set baru dengan pengaturan yang sama: kurvanya diam sementara batang-batangnya bergoyang, dan itulah persis perbedaan antara populasi dan sampel. Arahkan kursor ke grafik untuk membandingkan kepadatan satu batang dengan nilai PDF di titik itu.',
        'Simulasi ini punya beberapa batasan. Hanya empat keluarga yang disertakan; data nyata sering membutuhkan yang lain, misalnya Poisson untuk cacahan kejadian langka. Distribusi eksponensial mengabaikan Param 2. Untuk binomial, slider Param 2 hanya mencapai 5 padahal n bawaannya 20, sehingga menyentuh slider itu akan mengecilkan n, dan batang-batang bilangan bulatnya digambar pada kisi yang sedikit bergeser, sehingga tampak sekitar 5% lebih tinggi dan sedikit ke kiri dari kurva. Simpangan baku sampel di lab membagi dengan n, bukan n − 1, perbedaan yang dapat diabaikan pada ukuran sampel sebesar ini. Semua itu tidak mengubah pelajaran utamanya: histogram dari sampel yang cukup banyak menyatu menuju distribusi asalnya.',
      ],
    },
    figure: {
      caption: {
        en: 'The four families with their key features marked. Normal: μ at the centre, 68% of the area within ±σ. Uniform: flat, height 1/(b − a). Exponential: starts at height λ and decays; its mean 1/λ lies to the right of the peak. Binomial: bars at each count, centred on n·p.',
        id: 'Empat keluarga distribusi dengan ciri utamanya. Normal: μ di pusat, 68% luas berada dalam ±σ. Uniform: datar, tinggi 1/(b − a). Eksponensial: mulai dari tinggi λ lalu meluruh; rata-ratanya 1/λ berada di kanan puncak. Binomial: batang pada tiap cacahan, berpusat di n·p.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        const poly = (f, x0, x1, px, py, w, h, scale, col) => `<polyline fill="none" stroke="${col}" stroke-width="2.2" points="${Array.from({ length: 61 }, (_, i) => { const x = x0 + (i / 60) * (x1 - x0); return `${(px + ((x - x0) / (x1 - x0)) * w).toFixed(1)},${(py + h - f(x) * scale).toFixed(1)}`; }).join(' ')}"/>`;
        const normal = (x) => Math.exp(-0.5 * x * x) / Math.sqrt(2 * Math.PI);
        const binom = [1, 10, 45, 120, 210, 252, 210, 120, 45, 10, 1];
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Four common probability distributions', 'Empat distribusi peluang yang umum')}">
  <style>text{font:12px system-ui,sans-serif;fill:currentColor}.s{font-size:9px;opacity:.75}.t{font-size:11px;font-weight:700}.m{fill:none;stroke:currentColor;stroke-width:1;opacity:.4}</style>
  <text x="12" y="14" class="t" style="fill:#3b82f6">Normal(μ, σ)</text>
  <line x1="12" y1="100" x2="172" y2="100" class="m"/>
  <path d="M${(92 - 22.86).toFixed(1)} 100 ${Array.from({ length: 21 }, (_, i) => { const x = -1 + i / 10; return `L${(92 + x * 22.86).toFixed(1)} ${(100 - normal(x) * 175).toFixed(1)}`; }).join(' ')} L${(92 + 22.86).toFixed(1)} 100 Z" fill="#3b82f6" opacity="0.25"/>
  ${poly(normal, -3.5, 3.5, 12, 20, 160, 80, 175, '#3b82f6')}
  <line x1="92" y1="30" x2="92" y2="100" class="m" stroke-dasharray="3 3"/>
  <text x="92" y="111" text-anchor="middle" class="s">μ</text>
  <text x="92" y="86" text-anchor="middle" class="s">68%</text>
  <text x="117" y="111" text-anchor="middle" class="s">μ+σ</text>
  <text x="188" y="14" class="t" style="fill:#10b981">Uniform(a, b)</text>
  <line x1="188" y1="100" x2="348" y2="100" class="m"/>
  <path d="M188 100 L218 100 L218 50 L318 50 L318 100 L348 100" fill="none" stroke="#10b981" stroke-width="2.2"/>
  <text x="218" y="111" text-anchor="middle" class="s">a</text>
  <text x="318" y="111" text-anchor="middle" class="s">b</text>
  <text x="268" y="44" text-anchor="middle" class="s">${L('height 1/(b − a)', 'tinggi 1/(b − a)')}</text>
  <text x="12" y="134" class="t" style="fill:#f59e0b">${L('Exponential(λ)', 'Eksponensial(λ)')}</text>
  <line x1="12" y1="220" x2="172" y2="220" class="m"/>
  ${poly((x) => Math.exp(-x), 0, 5, 12, 140, 160, 80, 76, '#f59e0b')}
  <text x="16" y="150" class="s">${L('height λ at 0', 'tinggi λ di 0')}</text>
  <line x1="44" y1="192" x2="44" y2="220" class="m" stroke-dasharray="3 3"/>
  <text x="44" y="231" text-anchor="middle" class="s">${L('mean 1/λ', 'rata-rata 1/λ')}</text>
  <text x="188" y="134" class="t" style="fill:#8b5cf6">${L('Binomial(n = 10, p = 0.5)', 'Binomial(n = 10, p = 0,5)')}</text>
  <line x1="188" y1="220" x2="348" y2="220" class="m"/>
  ${binom.map((c, k) => `<rect x="${194 + k * 14}" y="${(220 - (c / 252) * 72).toFixed(1)}" width="10" height="${((c / 252) * 72).toFixed(1)}" fill="#8b5cf6" opacity="0.85"/>`).join('')}
  <text x="199" y="231" text-anchor="middle" class="s">0</text>
  <text x="269" y="231" text-anchor="middle" class="s">5 = n·p</text>
  <text x="339" y="231" text-anchor="middle" class="s">10</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'The height of a PDF is not a probability; the area under it over an interval is, and the total area is 1.',
        'Each family has a characteristic shape: the normal is a symmetric bell set by μ and σ, the uniform is flat, the exponential peaks at zero and decays with mean 1/λ, the binomial is a set of bars centred on n·p.',
        'A histogram scaled as a density converges to the PDF as the sample size grows; the noise in each bar shrinks roughly like 1/√(count).',
        'The number of bins trades smoothness against detail; neither extreme shows the distribution well.',
        'Changing parameters moves or stretches a distribution but does not change its family\'s basic shape.',
      ],
      id: [
        'Tinggi PDF bukanlah peluang; luas di bawahnya pada suatu selang itulah peluangnya, dan luas totalnya 1.',
        'Tiap keluarga punya bentuk khas: normal adalah lonceng simetris yang diatur μ dan σ, uniform datar, eksponensial memuncak di nol lalu meluruh dengan rata-rata 1/λ, binomial berupa batang-batang yang berpusat di n·p.',
        'Histogram yang diskalakan sebagai kepadatan menyatu menuju PDF seiring bertambahnya ukuran sampel; derau tiap batang menyusut kira-kira seperti 1/√(cacah).',
        'Banyaknya bin menukar kemulusan dengan detail; kedua ekstremnya sama-sama tidak menampilkan distribusi dengan baik.',
        'Mengubah parameter menggeser atau merentangkan distribusi tetapi tidak mengubah bentuk dasar keluarganya.',
      ],
    },
    vocabulary: {
      en: [
        ['Random variable', 'A quantity whose value is determined by chance, such as one draw from a distribution.'],
        ['Probability density function (PDF)', 'The curve for a continuous variable whose area over an interval gives the probability of that interval.'],
        ['Probability mass function', 'For a discrete variable, the probability of each individual outcome; drawn as bars.'],
        ['Histogram', 'Bars showing how many sampled values fell into each bin; scaled here to have area 1.'],
        ['Parameter', 'A number that fixes one member of a family, such as μ and σ for the normal or λ for the exponential.'],
        ['Mean (μ)', 'The balance point of a distribution; the long-run average of its samples.'],
        ['Standard deviation (σ)', 'A measure of spread: the typical distance of a value from the mean.'],
        ['Sampling error', 'The chance difference between a sample histogram and the true distribution, which shrinks as more samples are drawn.'],
      ],
      id: [
        ['Peubah acak', 'Besaran yang nilainya ditentukan oleh kebetulan, misalnya satu pengambilan dari sebuah distribusi.'],
        ['Fungsi kepadatan peluang (PDF)', 'Kurva untuk peubah kontinu yang luasnya pada suatu selang memberi peluang selang itu.'],
        ['Fungsi massa peluang', 'Untuk peubah diskret, peluang tiap hasil tunggal; digambar sebagai batang.'],
        ['Histogram', 'Batang-batang yang menunjukkan berapa banyak nilai sampel jatuh di tiap bin; di sini diskalakan agar berluas 1.'],
        ['Parameter', 'Bilangan yang menentukan satu anggota keluarga distribusi, misalnya μ dan σ untuk normal atau λ untuk eksponensial.'],
        ['Rata-rata (μ)', 'Titik keseimbangan sebuah distribusi; rata-rata jangka panjang sampel-sampelnya.'],
        ['Simpangan baku (σ)', 'Ukuran sebaran: jarak khas sebuah nilai dari rata-rata.'],
        ['Galat sampling', 'Selisih kebetulan antara histogram sampel dan distribusi sebenarnya, yang menyusut seiring bertambahnya sampel.'],
      ],
    },
    misconceptions: {
      en: [
        ['The height of the curve at x is the probability of getting x.', 'For a continuous variable the probability of any exact value is zero; only areas are probabilities. The density can even exceed 1: a normal with σ = 0.1 peaks at about 4.'],
        ['Drawing more samples makes the histogram taller.', 'The histogram is scaled as a density, so more samples make it smoother and closer to the curve, not taller.'],
        ['Everything is normally distributed.', 'Waiting times are exponential, counts are binomial or Poisson, incomes are strongly skewed. The normal is common but far from universal.'],
        ['An exponential distribution peaks at its mean.', 'Its peak is always at zero. The mean 1/λ lies to the right of the peak, and the median ln 2/λ ≈ 0.69/λ is smaller than the mean because of the long right tail.'],
      ],
      id: [
        ['Tinggi kurva di x adalah peluang mendapatkan x.', 'Untuk peubah kontinu peluang satu nilai persis adalah nol; hanya luas yang merupakan peluang. Kepadatan bahkan bisa melebihi 1: normal dengan σ = 0,1 memuncak sekitar 4.'],
        ['Mengambil lebih banyak sampel membuat histogram lebih tinggi.', 'Histogram diskalakan sebagai kepadatan, sehingga sampel yang lebih banyak membuatnya lebih mulus dan lebih dekat ke kurva, bukan lebih tinggi.'],
        ['Semua hal berdistribusi normal.', 'Waktu tunggu bersifat eksponensial, cacahan bersifat binomial atau Poisson, pendapatan sangat menceng. Distribusi normal memang umum tetapi jauh dari universal.'],
        ['Distribusi eksponensial memuncak di rata-ratanya.', 'Puncaknya selalu di nol. Rata-rata 1/λ berada di kanan puncak, dan mediannya ln 2/λ ≈ 0,69/λ lebih kecil dari rata-rata karena ekor kanannya yang panjang.'],
      ],
    },
    realWorld: {
      en: [
        'Measurement errors and adult heights are close to normal, which is why instrument tolerances are quoted in multiples of σ.',
        'The time between radioactive decays, between calls to a help desk or between buses arriving at random is exponential.',
        'The number of defective items in a batch, or of correct guesses on a multiple-choice test, follows a binomial distribution.',
        'Random number generators and lotteries aim for a uniform distribution so that every outcome is equally likely.',
      ],
      id: [
        'Galat pengukuran dan tinggi badan orang dewasa mendekati normal, itulah sebabnya toleransi alat ukur dinyatakan dalam kelipatan σ.',
        'Waktu antara peluruhan radioaktif, antara panggilan ke pusat bantuan, atau antara bus yang datang secara acak bersifat eksponensial.',
        'Banyaknya barang cacat dalam satu batch, atau tebakan benar pada ujian pilihan ganda, mengikuti distribusi binomial.',
        'Pembangkit bilangan acak dan undian mengincar distribusi uniform agar setiap hasil sama mungkinnya.',
      ],
    },
    questions: {
      en: [
        { q: 'For an exponential distribution with λ = 2, what are the theoretical mean and standard deviation, and how high is the curve at x = 0?', a: 'Mean = SD = 1/λ = 0.5. The density at zero equals λ, so the curve starts at height 2 and decays from there.' },
        { q: 'Compare a normal with σ = 0.1 and one with σ = 2. How high is each peak, and why?', a: 'The peak height is 1/(σ√(2π)) ≈ 0.399/σ, so about 3.99 for σ = 0.1 and 0.20 for σ = 2. The area must stay 1, so a narrower curve has to be taller.' },
        { q: 'For Binomial(n = 20, p = 0.5), what are the mean and standard deviation, and roughly what fraction of samples land between 8 and 12 inclusive?', a: 'Mean = 20 × 0.5 = 10 and SD = √(20 × 0.5 × 0.5) = √5 ≈ 2.24. The band 8 to 12 is about ±1.1 SD around the mean, so roughly 74% of samples; the exact binomial probability is 0.737.' },
      ],
      id: [
        { q: 'Untuk distribusi eksponensial dengan λ = 2, berapa rata-rata dan simpangan baku teoretisnya, dan seberapa tinggi kurva di x = 0?', a: 'Rata-rata = SB = 1/λ = 0,5. Kepadatan di nol sama dengan λ, sehingga kurva mulai dari tinggi 2 lalu meluruh.' },
        { q: 'Bandingkan distribusi normal dengan σ = 0,1 dan σ = 2. Seberapa tinggi puncak masing-masing, dan mengapa?', a: 'Tinggi puncaknya 1/(σ√(2π)) ≈ 0,399/σ, jadi sekitar 3,99 untuk σ = 0,1 dan 0,20 untuk σ = 2. Luasnya harus tetap 1, sehingga kurva yang lebih sempit harus lebih tinggi.' },
        { q: 'Untuk Binomial(n = 20, p = 0,5), berapa rata-rata dan simpangan bakunya, dan kira-kira berapa bagian sampel yang jatuh antara 8 dan 12 (termasuk keduanya)?', a: 'Rata-rata = 20 × 0,5 = 10 dan SB = √(20 × 0,5 × 0,5) = √5 ≈ 2,24. Rentang 8 sampai 12 kira-kira ±1,1 SB di sekitar rata-rata, jadi sekitar 74% sampel; peluang binomial eksaknya 0,737.' },
      ],
    },
  },
};
