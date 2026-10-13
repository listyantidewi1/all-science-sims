// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'See that sampling distributions of the mean become roughly normal regardless of parent shape.',
      'Notice how variance shrinks as 1/n.',
      'Estimate when n is "large enough" for the CLT to look clean.',
    ],
    id: [
      'Melihat distribusi rata-rata sampel mendekati normal terlepas dari bentuk induknya.',
      'Mengamati varian menyusut sebanding 1/n.',
      'Memperkirakan kapan n "cukup besar" agar CLT terlihat rapi.',
    ],
  },  tryThis: {
    en: [
      'Set parent to bimodal and n=2 — does the mean histogram still look bimodal?',
      'Crank n to 30 with exponential — is it Gaussian-ish yet?',
      'Increase samples per second and watch the histogram converge fast.',
    ],
    id: [
      'Atur induk bimodal dan n=2 — apakah histogram rata-rata tetap bimodal?',
      'Naikkan n ke 30 dengan distribusi eksponensial — sudah seperti Gauss?',
      'Tingkatkan sampel per detik dan amati histogram menyatu cepat.',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'Take a random sample of n values from some population, compute their mean, and write it down. Repeat many times and the recorded means form a distribution of their own, the sampling distribution of the mean. The central limit theorem (CLT) says that, whatever shape the parent population has, provided its standard deviation σ is finite and the draws are independent, this distribution of means is centred on the population mean μ, has standard deviation σ/√n (the standard error), and becomes closer and closer to a normal bell curve as n grows. Averaging washes out the parent\'s quirks: a very large value in one draw is usually balanced by ordinary values in the others.',
        'The simulation shows both distributions side by side. The grey histogram on the left is a pile of raw draws from the parent you chose; the pink one on the right collects sample means for the chosen n. Each tick draws n values, averages them, and adds the result to the right-hand pile at the rate you set, or 100 at a time with the button. The green curve is a normal with the same mean and standard deviation as the collected means, drawn at half height as a shape guide. The parents are deliberately un-bell-like: Uniform (σ ≈ 0.289), Exponential with mean 0.5 (σ = 0.5, strongly skewed), Bimodal (two humps at about 0.15 and 0.75, σ ≈ 0.32), Skewed (the cube of a uniform value, piled up near zero) and Spike + uniform (85% of values close to 0.5, the rest anywhere).',
        'Three things are worth watching. With n = 1 the right-hand histogram is simply a copy of the parent. At n = 2 with the bimodal parent you see three humps, because a pair can be low-low, high-high or one of each, with the mixed case twice as likely; each extra n adds more combinations and the humps blur into a bell. The spread shrinks as 1/√n: halving the standard error needs four times the sample size, which the lab lets you check against σ/√n. How large n must be depends on the parent: means of uniform values look bell-shaped by n ≈ 5, while the exponential and the spike parents still show a tail at n = 10 and need n of 30 or more.',
        'A few limits apply. The simulation keeps at most 5,000 means, so the histogram always has some noise, and the exponential parent produces values above 1 that fall outside the left-hand chart (about 13% of draws). The green curve is fitted to the collected means rather than computed from σ/√n, so it will look like a decent fit even when the histogram is clearly skewed; judge the shape by its symmetry and tails. The parents here all have finite variance; the CLT does not hold for heavy-tailed distributions such as the Cauchy, whose sample means never settle, and it also requires the draws to be independent, which real data such as daily temperatures often are not.',
      ],
      id: [
        'Ambil sampel acak berisi n nilai dari suatu populasi, hitung rata-ratanya, dan catat. Ulangi berkali-kali, dan rata-rata yang tercatat membentuk distribusi tersendiri, yaitu distribusi sampling rata-rata. Teorema limit pusat (CLT) menyatakan bahwa, apa pun bentuk populasi induknya, asalkan simpangan bakunya σ berhingga dan pengambilannya saling bebas, distribusi rata-rata ini berpusat di rata-rata populasi μ, memiliki simpangan baku σ/√n (galat baku), dan semakin mendekati kurva lonceng normal seiring bertambahnya n. Merata-ratakan menghapus keanehan induknya: nilai yang sangat besar pada satu pengambilan biasanya diimbangi nilai-nilai biasa pada pengambilan lain.',
        'Simulasi menampilkan kedua distribusi berdampingan. Histogram abu-abu di kiri adalah tumpukan pengambilan mentah dari induk yang kamu pilih; histogram merah muda di kanan mengumpulkan rata-rata sampel untuk n yang dipilih. Setiap detak mengambil n nilai, merata-ratakannya, dan menambahkan hasilnya ke tumpukan kanan dengan laju yang kamu atur, atau 100 sekaligus dengan tombol. Kurva hijau adalah distribusi normal dengan rata-rata dan simpangan baku yang sama dengan rata-rata yang terkumpul, digambar setengah tinggi sebagai panduan bentuk. Induk-induknya sengaja tidak berbentuk lonceng: Uniform (σ ≈ 0,289), Eksponensial dengan rata-rata 0,5 (σ = 0,5, sangat menceng), Bimodal (dua punuk di sekitar 0,15 dan 0,75, σ ≈ 0,32), Skewed (pangkat tiga nilai uniform, menumpuk di dekat nol), dan Spike + uniform (85% nilai dekat 0,5, sisanya di mana saja).',
        'Tiga hal patut diamati. Dengan n = 1 histogram kanan hanyalah salinan induknya. Pada n = 2 dengan induk bimodal kamu melihat tiga punuk, karena sepasang nilai bisa rendah-rendah, tinggi-tinggi, atau campuran, dengan kasus campuran dua kali lebih mungkin; tiap tambahan n menambah kombinasi dan punuk-punuk itu melebur menjadi lonceng. Sebarannya menyusut seperti 1/√n: memperkecil galat baku menjadi separuh butuh ukuran sampel empat kali lipat, yang bisa kamu periksa di lab terhadap σ/√n. Seberapa besar n yang dibutuhkan bergantung pada induknya: rata-rata nilai uniform sudah tampak seperti lonceng pada n ≈ 5, sedangkan induk eksponensial dan spike masih menunjukkan ekor pada n = 10 dan butuh n sekitar 30 atau lebih.',
        'Ada beberapa batasan. Simulasi menyimpan paling banyak 5.000 rata-rata, sehingga histogram selalu sedikit berderau, dan induk eksponensial menghasilkan nilai di atas 1 yang jatuh di luar grafik kiri (sekitar 13% pengambilan). Kurva hijau dicocokkan pada rata-rata yang terkumpul, bukan dihitung dari σ/√n, sehingga akan tampak cukup cocok bahkan ketika histogramnya jelas menceng; nilailah bentuknya dari kesimetrisan dan ekornya. Semua induk di sini bervarians berhingga; CLT tidak berlaku untuk distribusi berekor berat seperti Cauchy, yang rata-rata sampelnya tidak pernah menetap, dan CLT juga mensyaratkan pengambilan yang saling bebas, yang sering tidak dipenuhi data nyata seperti suhu harian.',
      ],
    },
    figure: {
      caption: {
        en: 'Top: a skewed parent (exponential, mean 0.5, σ = 0.5). Bottom: the distribution of sample means for n = 5 and n = 30. Both are centred on μ, their widths are σ/√5 ≈ 0.22 and σ/√30 ≈ 0.09, and the larger n is both narrower and closer to a symmetric bell.',
        id: 'Atas: induk yang menceng (eksponensial, rata-rata 0,5, σ = 0,5). Bawah: distribusi rata-rata sampel untuk n = 5 dan n = 30. Keduanya berpusat di μ, lebarnya σ/√5 ≈ 0,22 dan σ/√30 ≈ 0,09, dan n yang lebih besar lebih sempit sekaligus lebih mendekati lonceng simetris.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        const X = (v) => 30 + v * 200;
        const curve = (f, base, scale, col, x0 = 0, x1 = 1.5) => `<polyline fill="none" stroke="${col}" stroke-width="2.2" points="${Array.from({ length: 91 }, (_, i) => { const v = x0 + (i / 90) * (x1 - x0); return `${X(v).toFixed(1)},${(base - f(v) * scale).toFixed(1)}`; }).join(' ')}"/>`;
        const normal = (mu, sd) => (v) => Math.exp(-0.5 * ((v - mu) / sd) ** 2) / (sd * Math.sqrt(2 * Math.PI));
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Sample means from a skewed parent become normal', 'Rata-rata sampel dari induk menceng menjadi normal')}">
  <style>text{font:12px system-ui,sans-serif;fill:currentColor}.s{font-size:10px;opacity:.75}.t{font-size:11px;font-weight:700}.m{fill:none;stroke:currentColor;stroke-width:1;opacity:.4}</style>
  <text x="30" y="14" class="t">${L('Parent: exponential, μ = 0.5, σ = 0.5', 'Induk: eksponensial, μ = 0,5, σ = 0,5')}</text>
  <line x1="30" y1="100" x2="330" y2="100" class="m"/>
  ${curve((v) => 2 * Math.exp(-2 * v), 100, 36, '#ef4444')}
  <text x="330" y="60" text-anchor="end" class="s" style="fill:#ef4444">${L('skewed: long tail to the right', 'menceng: ekor panjang ke kanan')}</text>
  <text x="30" y="128" class="t">${L('Means of n draws', 'Rata-rata dari n pengambilan')}</text>
  <line x1="30" y1="220" x2="330" y2="220" class="m"/>
  ${curve(normal(0.5, 0.2236), 220, 19.4, '#f59e0b')}
  ${curve(normal(0.5, 0.0913), 220, 19.4, '#3b82f6')}
  <line x1="${X(0.5)}" y1="22" x2="${X(0.5)}" y2="220" class="m" stroke-dasharray="4 4"/>
  <text x="${X(0.5) + 4}" y="110" class="s">${L('μ = 0.5', 'μ = 0,5')}</text>
  <text x="${X(0.5) + 4}" y="231" class="s">μ</text>
  <text x="${X(0.82)}" y="196" class="s" style="fill:#f59e0b">${L('n = 5, SD = σ/√5 ≈ 0.22', 'n = 5, SB = σ/√5 ≈ 0,22')}</text>
  <text x="${X(0.62)}" y="140" class="s" style="fill:#3b82f6">${L('n = 30, SD = σ/√30 ≈ 0.09', 'n = 30, SB = σ/√30 ≈ 0,09')}</text>
  <text x="30" y="231" class="s">0</text>
  <text x="${X(1.0)}" y="231" text-anchor="middle" class="s">1</text>
  <text x="330" y="231" text-anchor="end" class="s">${L('1.5', '1,5')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Means of random samples cluster around the population mean μ, whatever the parent distribution looks like.',
        'Their spread is the standard error σ/√n: quadrupling the sample size halves it.',
        'As n grows the distribution of sample means approaches a normal curve, even from uniform, skewed or bimodal parents.',
        'How large n must be depends on the parent: symmetric parents need only a few draws, strongly skewed ones need 30 or more.',
        'The CLT explains why the normal distribution appears so often: many measured quantities are sums or averages of many small effects.',
      ],
      id: [
        'Rata-rata sampel acak mengelompok di sekitar rata-rata populasi μ, seperti apa pun bentuk distribusi induknya.',
        'Sebarannya adalah galat baku σ/√n: melipatempatkan ukuran sampel memperkecilnya menjadi separuh.',
        'Seiring bertambahnya n, distribusi rata-rata sampel mendekati kurva normal, bahkan dari induk uniform, menceng, atau bimodal.',
        'Seberapa besar n yang dibutuhkan bergantung pada induknya: induk simetris cukup beberapa pengambilan, induk yang sangat menceng butuh 30 atau lebih.',
        'CLT menjelaskan mengapa distribusi normal begitu sering muncul: banyak besaran terukur merupakan jumlah atau rata-rata dari banyak pengaruh kecil.',
      ],
    },
    vocabulary: {
      en: [
        ['Parent (population) distribution', 'The distribution that individual values are drawn from; shown in the left-hand histogram.'],
        ['Sample', 'A set of n values drawn from the parent.'],
        ['Sample mean', 'The average of the n values in one sample; one entry in the right-hand histogram.'],
        ['Sampling distribution', 'The distribution of a statistic, here the mean, over many repeated samples.'],
        ['Standard error', 'The standard deviation of the sample mean, equal to σ/√n.'],
        ['Normal distribution', 'The symmetric bell curve described by a mean and a standard deviation.'],
        ['Skewness', 'Lopsidedness of a distribution; a long right tail means positive skew, as in the exponential.'],
        ['Independent and identically distributed', 'The condition that each draw comes from the same distribution and does not influence the others.'],
      ],
      id: [
        ['Distribusi induk (populasi)', 'Distribusi asal nilai-nilai tunggal diambil; ditampilkan pada histogram kiri.'],
        ['Sampel', 'Sekumpulan n nilai yang diambil dari induk.'],
        ['Rata-rata sampel', 'Rata-rata dari n nilai dalam satu sampel; satu entri pada histogram kanan.'],
        ['Distribusi sampling', 'Distribusi suatu statistik, di sini rata-rata, dari banyak sampel berulang.'],
        ['Galat baku', 'Simpangan baku dari rata-rata sampel, sama dengan σ/√n.'],
        ['Distribusi normal', 'Kurva lonceng simetris yang ditentukan oleh rata-rata dan simpangan baku.'],
        ['Kemencengan', 'Ketidaksimetrisan sebuah distribusi; ekor kanan yang panjang berarti menceng positif, seperti pada eksponensial.'],
        ['Saling bebas dan berdistribusi identik', 'Syarat bahwa setiap pengambilan berasal dari distribusi yang sama dan tidak memengaruhi pengambilan lain.'],
      ],
    },
    misconceptions: {
      en: [
        ['The CLT says data become normally distributed if you collect enough of them.', 'The raw data keep the parent\'s shape no matter how many you collect; the left-hand histogram never turns into a bell. It is the distribution of sample means that becomes normal.'],
        ['n = 30 is always enough.', 'It is a rule of thumb for moderately skewed parents. Means of uniform values look normal at n = 5, while the exponential or spike parents still show a visible tail at n = 30.'],
        ['Larger samples make the sample mean vary more, because there are more numbers involved.', 'The opposite: the standard error is σ/√n, so larger samples give means that cluster more tightly around μ.'],
        ['The CLT works for every distribution.', 'It needs a finite variance and independent draws. Heavy-tailed distributions such as the Cauchy have no finite variance, and their sample means never settle down.'],
      ],
      id: [
        ['CLT menyatakan data akan berdistribusi normal jika kamu mengumpulkan cukup banyak.', 'Data mentah tetap berbentuk seperti induknya berapa pun banyaknya; histogram kiri tidak pernah berubah menjadi lonceng. Distribusi rata-rata sampel-lah yang menjadi normal.'],
        ['n = 30 selalu cukup.', 'Itu aturan praktis untuk induk yang kemencengannya sedang. Rata-rata nilai uniform sudah tampak normal pada n = 5, sedangkan induk eksponensial atau spike masih menunjukkan ekor yang terlihat pada n = 30.'],
        ['Sampel yang lebih besar membuat rata-rata sampel lebih beragam, karena angkanya lebih banyak.', 'Justru sebaliknya: galat bakunya σ/√n, sehingga sampel yang lebih besar memberi rata-rata yang mengelompok lebih rapat di sekitar μ.'],
        ['CLT berlaku untuk semua distribusi.', 'CLT membutuhkan varians berhingga dan pengambilan yang saling bebas. Distribusi berekor berat seperti Cauchy tidak punya varians berhingga, dan rata-rata sampelnya tidak pernah menetap.'],
      ],
    },
    realWorld: {
      en: [
        'Opinion polls quote a margin of error of roughly 1/√n, about 3% for 1,000 respondents, which comes straight from the standard error of a mean.',
        'Averaging repeated measurements reduces random instrument noise by a factor of √n, which is why laboratories take many readings.',
        'Factory control charts track the mean of small samples taken from the line and flag trouble when it drifts beyond a few standard errors.',
        'A/B tests on websites compare the mean behaviour of two groups of users with normal-based confidence intervals, justified by the CLT.',
      ],
      id: [
        'Jajak pendapat mencantumkan margin galat kira-kira 1/√n, sekitar 3% untuk 1.000 responden, yang langsung berasal dari galat baku rata-rata.',
        'Merata-ratakan pengukuran berulang mengurangi derau acak alat sebesar faktor √n, itulah sebabnya laboratorium mengambil banyak bacaan.',
        'Peta kendali di pabrik memantau rata-rata sampel kecil yang diambil dari lini produksi dan memberi tanda bahaya saat rata-rata itu bergeser melampaui beberapa galat baku.',
        'Uji A/B di situs web membandingkan perilaku rata-rata dua kelompok pengguna dengan selang kepercayaan berbasis normal, yang dibenarkan oleh CLT.',
      ],
    },
    questions: {
      en: [
        { q: 'A parent has σ = 1. What is the standard deviation of the sample mean for n = 100, and what n would bring it down to 0.05?', a: 'σ/√n = 1/√100 = 0.1. For 0.05 you need √n = 20, so n = 400: halving the standard error takes four times the sample size.' },
        { q: 'With the bimodal parent and n = 2, the histogram of means shows three humps. Explain why, and what happens as n grows.', a: 'Each draw is low (near 0.15) or high (near 0.75) with equal chance. A pair is low-low with probability 1/4 (mean near 0.15), high-high with probability 1/4 (near 0.75), or mixed with probability 1/2 (near 0.45), so the middle hump is twice as tall. With larger n there are many more combinations of lows and highs, and the humps merge into a bell around 0.45.' },
        { q: 'For the exponential parent (mean 0.5, σ = 0.5) and n = 25, where is the histogram of means centred, how wide is it, and is it already symmetric?', a: 'Centred on 0.5 with standard error 0.5/√25 = 0.1. It is still slightly right-skewed: the skewness of a mean is the parent\'s skewness divided by √n, here 2/5 = 0.4, so a visible tail remains until n reaches roughly 30 to 50.' },
      ],
      id: [
        { q: 'Sebuah induk memiliki σ = 1. Berapa simpangan baku rata-rata sampel untuk n = 100, dan berapa n yang dibutuhkan agar turun menjadi 0,05?', a: 'σ/√n = 1/√100 = 0,1. Untuk 0,05 dibutuhkan √n = 20, jadi n = 400: memperkecil galat baku menjadi separuh butuh ukuran sampel empat kali lipat.' },
        { q: 'Dengan induk bimodal dan n = 2, histogram rata-rata menunjukkan tiga punuk. Jelaskan mengapa, dan apa yang terjadi saat n bertambah.', a: 'Setiap pengambilan bernilai rendah (sekitar 0,15) atau tinggi (sekitar 0,75) dengan peluang sama. Sepasang nilai bisa rendah-rendah dengan peluang 1/4 (rata-rata sekitar 0,15), tinggi-tinggi dengan peluang 1/4 (sekitar 0,75), atau campuran dengan peluang 1/2 (sekitar 0,45), sehingga punuk tengah dua kali lebih tinggi. Dengan n lebih besar ada jauh lebih banyak kombinasi rendah dan tinggi, dan punuk-punuk itu melebur menjadi lonceng di sekitar 0,45.' },
        { q: 'Untuk induk eksponensial (rata-rata 0,5, σ = 0,5) dan n = 25, di mana pusat histogram rata-rata, seberapa lebar, dan apakah sudah simetris?', a: 'Berpusat di 0,5 dengan galat baku 0,5/√25 = 0,1. Masih sedikit menceng ke kanan: kemencengan rata-rata adalah kemencengan induk dibagi √n, di sini 2/5 = 0,4, sehingga ekor yang terlihat tetap ada sampai n mencapai kira-kira 30 sampai 50.' },
      ],
    },
  },
};
