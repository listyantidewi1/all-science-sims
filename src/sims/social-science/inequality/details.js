// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Read income share at any population percentile.',
      'Connect Gini = 0 to equality and Gini = 1 to one-takes-all.',
      'Compare distribution shapes (uniform, exponential, Pareto).',
    ],
    id: [
      'Membaca pangsa pendapatan pada persentil populasi mana pun.',
      'Mengaitkan Gini = 0 dengan kesetaraan dan Gini = 1 dengan monopoli total.',
      'Membandingkan bentuk distribusi (uniform, eksponensial, Pareto).',
    ],
  },
  tryThis: {
    en: [
      'Switch from uniform to Pareto — does Gini jump?',
      'Drag any individual\'s income up — see the curve bend.',
      'How rich would the top 1% be at Gini = 0.6?',
    ],
    id: [
      'Beralih dari uniform ke Pareto — apakah Gini melonjak?',
      'Geser pendapatan satu individu naik — kurva ikut menekuk.',
      'Seberapa kaya 1% teratas pada Gini = 0,6?',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'To picture how income is shared, line everyone up from poorest to richest and ask, for the poorest x% of people, what share of all income they earn between them. Plotting that share against x gives the Lorenz curve, introduced by Max Lorenz in 1905. If everyone earned the same, the poorest 20% would earn 20% of the income, the poorest 50% would earn 50%, and the curve would be the straight diagonal, the line of equality. In any real population the poorest half earns less than half, so the curve sags below the diagonal, and the deeper the sag the more unequal the distribution. The Gini coefficient, proposed by Corrado Gini in 1912, turns that sag into one number: the area between the diagonal and the curve, divided by the whole triangle under the diagonal. Since that triangle has area 1/2, the Gini is simply twice the area between the curves. It is 0 for perfect equality and approaches 1 when a single person has everything.',
        'The sim draws a population of n incomes at random from a chosen distribution, sorts them and shows them as a bar chart from poorest to richest on the left. On the right it accumulates the sorted incomes to trace the Lorenz curve, shades the area between the curve and the diagonal, and computes the Gini from that area using trapezoids between the data points. It also reports two shares that newspapers often quote: how much of total income goes to the top 10% and how much to the bottom 50%. Reading the curve is the same as reading these shares: find 0.5 on the horizontal axis, go up to the curve, and the height is the bottom half\'s share of income.',
        'The distribution selector changes the shape of the population. Uniform spreads incomes evenly between 0 and 100 and gives a Gini of about 0.33. Exponential has many low incomes and a thin tail of high ones, with a Gini of about 0.5. Pareto is a power law: the probability of an income above some level falls as that level to the power −α, which produces a small number of very large incomes; its Gini is 1/(2α − 1), so α = 3 gives 0.2, α = 1.5 gives 0.5, and as α approaches 1 the Gini approaches 1. The α slider applies only to Pareto; lower α means a heavier tail and more inequality. Two classes places 70% of people between 20 and 50 and 30% between 200 and 400, a stylised society with no middle. Population size controls how many incomes are drawn: with few people the curve is jagged and the Gini noisy, and Resample draws a new population, which with a heavy-tailed Pareto can shift the Gini noticeably because one or two enormous incomes dominate the total.',
        'The sim works with random draws, not real data, and with individuals rather than households. Incomes are before tax and transfers, so it cannot show how redistribution moves a Lorenz curve. The Gini is a snapshot that compresses a whole curve into one number: two populations can share the same Gini while their Lorenz curves cross, with one being more unequal at the bottom and the other at the top, and the Gini says nothing about whether people move between positions over time. Finally, real wealth is far more unequally distributed than income, so published wealth Ginis are much higher than income Ginis for the same country. This version of the sim has no drag editing of individual incomes; switching distributions and resampling are the ways to change the curve.',
      ],
      id: [
        'Untuk menggambarkan bagaimana pendapatan dibagi, barisan semua orang dari termiskin sampai terkaya dan tanyakan, untuk x% orang termiskin, berapa bagian dari seluruh pendapatan yang mereka peroleh bersama. Menggambar bagian itu terhadap x menghasilkan kurva Lorenz, yang diperkenalkan Max Lorenz pada 1905. Jika semua orang berpendapatan sama, 20% termiskin akan memperoleh 20% pendapatan, 50% termiskin memperoleh 50%, dan kurvanya menjadi garis diagonal lurus, yaitu garis kesetaraan. Dalam populasi nyata mana pun, separuh termiskin memperoleh kurang dari separuh, sehingga kurva melengkung di bawah diagonal, dan semakin dalam lengkungannya semakin timpang distribusinya. Koefisien Gini, yang diusulkan Corrado Gini pada 1912, mengubah lengkungan itu menjadi satu angka: luas antara diagonal dan kurva, dibagi seluruh segitiga di bawah diagonal. Karena segitiga itu luasnya 1/2, Gini sama dengan dua kali luas di antara kedua kurva. Nilainya 0 untuk kesetaraan sempurna dan mendekati 1 ketika satu orang memiliki segalanya.',
        'Simulasi menarik populasi berisi n pendapatan secara acak dari distribusi yang dipilih, mengurutkannya, dan menampilkannya sebagai diagram batang dari termiskin ke terkaya di sebelah kiri. Di sebelah kanan ia menjumlahkan pendapatan yang terurut untuk menelusuri kurva Lorenz, mengarsir luas antara kurva dan diagonal, dan menghitung Gini dari luas itu dengan trapesium di antara titik-titik data. Ia juga melaporkan dua pangsa yang sering dikutip surat kabar: berapa bagian total pendapatan yang jatuh ke 10% teratas dan berapa ke 50% terbawah. Membaca kurva sama dengan membaca pangsa ini: cari 0,5 pada sumbu datar, naik ke kurva, dan tingginya adalah pangsa pendapatan separuh terbawah.',
        'Pilihan distribusi mengubah bentuk populasi. Uniform menyebar pendapatan merata antara 0 dan 100 dan memberi Gini sekitar 0,33. Eksponensial punya banyak pendapatan rendah dan ekor tipis pendapatan tinggi, dengan Gini sekitar 0,5. Pareto adalah hukum pangkat: peluang pendapatan di atas suatu tingkat turun sebanding dengan tingkat itu dipangkatkan −α, yang menghasilkan sejumlah kecil pendapatan sangat besar; Gini-nya 1/(2α − 1), sehingga α = 3 memberi 0,2, α = 1,5 memberi 0,5, dan saat α mendekati 1 Gini mendekati 1. Slider α hanya berlaku untuk Pareto; α lebih rendah berarti ekor lebih gemuk dan ketimpangan lebih besar. Dua kelas menempatkan 70% orang di antara 20 dan 50 dan 30% di antara 200 dan 400, masyarakat yang disederhanakan tanpa kelas menengah. Ukuran populasi mengatur berapa banyak pendapatan yang ditarik: dengan sedikit orang kurvanya bergerigi dan Gini-nya berderau, dan Resample menarik populasi baru, yang pada Pareto berekor gemuk bisa menggeser Gini cukup jauh karena satu atau dua pendapatan raksasa mendominasi totalnya.',
        'Simulasi bekerja dengan tarikan acak, bukan data nyata, dan dengan individu, bukan rumah tangga. Pendapatan dihitung sebelum pajak dan bantuan sosial, sehingga simulasi tidak bisa menunjukkan bagaimana redistribusi menggeser kurva Lorenz. Gini adalah potret sesaat yang memadatkan seluruh kurva menjadi satu angka: dua populasi bisa punya Gini yang sama sementara kurva Lorenz-nya berpotongan, yang satu lebih timpang di bagian bawah dan yang lain di bagian atas, dan Gini tidak mengatakan apa pun tentang apakah orang berpindah posisi dari waktu ke waktu. Terakhir, kekayaan nyata jauh lebih timpang daripada pendapatan, sehingga Gini kekayaan yang dipublikasikan jauh lebih tinggi daripada Gini pendapatan untuk negara yang sama. Versi simulasi ini tidak menyediakan penyuntingan pendapatan individu dengan menyeret; mengganti distribusi dan Resample adalah cara mengubah kurvanya.',
      ],
    },
    figure: {
      caption: {
        en: 'Lorenz curve for an exponential income distribution. The poorest 50% earn only about 15% of total income. The Gini coefficient is the shaded area A divided by the whole triangle A + B, which equals 2A; here it is 0.50.',
        id: 'Kurva Lorenz untuk distribusi pendapatan eksponensial. 50% termiskin hanya memperoleh sekitar 15% dari total pendapatan. Koefisien Gini adalah luas arsiran A dibagi seluruh segitiga A + B, yang sama dengan 2A; di sini nilainya 0,50.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        const r = (v) => Math.round(v * 10) / 10;
        const X = (p) => r(50 + p * 180), Y = (v) => r(210 - v * 180);
        const lor = (p) => (p >= 1 ? 1 : p + (1 - p) * Math.log(1 - p));
        const N = 40;
        const curve = Array.from({ length: N + 1 }, (_, i) => `${i ? 'L' : 'M'}${X(i / N)} ${Y(lor(i / N))}`).join(' ');
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Lorenz curve and Gini coefficient', 'Kurva Lorenz dan koefisien Gini')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.m{fill:none;stroke:currentColor;stroke-width:1;opacity:.45}.s{font-size:10px;opacity:.8}</style>
  <path d="${curve} L${X(0)} ${Y(0)} Z" fill="#ef4444" opacity=".22"/>
  <path d="${curve} L${X(1)} ${Y(0)} Z" fill="#3b82f6" opacity=".12"/>
  <rect x="${X(0)}" y="${Y(1)}" width="180" height="180" class="m"/>
  <line x1="${X(0)}" y1="${Y(0)}" x2="${X(1)}" y2="${Y(1)}" stroke="#10b981" stroke-width="2" stroke-dasharray="5 3"/>
  <path d="${curve}" fill="none" stroke="#ef4444" stroke-width="2.5"/>
  <text x="${X(0.42)}" y="${Y(0.52)}" text-anchor="middle" style="font-weight:700;font-size:14px" fill="#ef4444">A</text>
  <text x="${X(0.8)}" y="${Y(0.22)}" text-anchor="middle" style="font-weight:700;font-size:14px" fill="#3b82f6">B</text>
  <line x1="${X(0.5)}" y1="${Y(0)}" x2="${X(0.5)}" y2="${Y(lor(0.5))}" class="m" stroke-dasharray="3 3"/>
  <line x1="${X(0)}" y1="${Y(lor(0.5))}" x2="${X(0.5)}" y2="${Y(lor(0.5))}" class="m" stroke-dasharray="3 3"/>
  <circle cx="${X(0.5)}" cy="${Y(lor(0.5))}" r="4" fill="#f59e0b"/>
  <text x="${X(0.5)}" y="${Y(0) + 13}" text-anchor="middle" class="s">50%</text>
  <text x="${X(0) - 4}" y="${Y(lor(0.5)) + 4}" text-anchor="end" class="s">15%</text>
  <text x="${X(0) - 4}" y="${Y(1) + 4}" text-anchor="end" class="s">100%</text>
  <text x="${X(1)}" y="${Y(0) + 13}" text-anchor="end" class="s">100%</text>
  <text x="${X(0.5)}" y="${Y(0) + 26}" text-anchor="middle" class="s">${L('poorest share of population', 'bagian populasi termiskin')}</text>
  <text x="${X(0.08)}" y="${Y(1) - 8}" class="s">${L('share of total income', 'bagian dari total pendapatan')}</text>
  <text x="${X(0.55)}" y="${Y(0.93)}" class="s" fill="#10b981" transform="rotate(-45 ${X(0.55)} ${Y(0.93)})">${L('line of equality', 'garis kesetaraan')}</text>
  <text x="246" y="60" style="font-weight:600">Gini = A / (A + B) = 2A</text>
  <text x="246" y="78" class="s">${L('A + B = 1/2 always', 'A + B = 1/2 selalu')}</text>
  <text x="246" y="100" class="s">${L('Gini = 0: everyone equal,', 'Gini = 0: semua setara,')}</text>
  <text x="246" y="113" class="s">${L('curve on the diagonal', 'kurva di atas diagonal')}</text>
  <text x="246" y="135" class="s">${L('Gini → 1: one person has', 'Gini → 1: satu orang punya')}</text>
  <text x="246" y="148" class="s">${L('everything, curve hugs the', 'segalanya, kurva menempel')}</text>
  <text x="246" y="161" class="s">${L('bottom and right edges', 'tepi bawah dan kanan')}</text>
  <text x="246" y="186" style="font-weight:600" fill="#ef4444">${L('this curve: Gini = 0.50', 'kurva ini: Gini = 0,50')}</text>
  <text x="246" y="200" class="s">${L('bottom 50% earn 15%', '50% terbawah: 15%')}</text>
  <text x="246" y="213" class="s">${L('top 10% earn 33%', '10% teratas: 33%')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'The Lorenz curve plots the share of total income earned by the poorest x% of people against x; perfect equality is the diagonal.',
        'The Gini coefficient is twice the area between the diagonal and the Lorenz curve: 0 for complete equality, approaching 1 when one person has everything.',
        'Heavy-tailed distributions such as Pareto concentrate income in a few very large earners; for Pareto the Gini is 1/(2α − 1), so smaller α means more inequality.',
        'The Gini is scale-free: doubling everyone\'s income leaves it unchanged, because it measures relative shares, not amounts.',
        'One number cannot capture a whole curve: different Lorenz curves can have the same Gini, and the Gini says nothing about mobility over time.',
      ],
      id: [
        'Kurva Lorenz menggambar bagian total pendapatan yang diperoleh x% orang termiskin terhadap x; kesetaraan sempurna adalah diagonal.',
        'Koefisien Gini adalah dua kali luas antara diagonal dan kurva Lorenz: 0 untuk kesetaraan penuh, mendekati 1 ketika satu orang memiliki segalanya.',
        'Distribusi berekor gemuk seperti Pareto memusatkan pendapatan pada sedikit orang berpenghasilan sangat besar; untuk Pareto Gini-nya 1/(2α − 1), sehingga α lebih kecil berarti ketimpangan lebih besar.',
        'Gini bebas skala: menggandakan pendapatan semua orang tidak mengubahnya, karena yang diukur adalah bagian relatif, bukan jumlah.',
        'Satu angka tidak bisa menangkap seluruh kurva: kurva Lorenz yang berbeda bisa punya Gini yang sama, dan Gini tidak mengatakan apa pun tentang mobilitas dari waktu ke waktu.',
      ],
    },
    vocabulary: {
      en: [
        ['Lorenz curve', 'The cumulative share of income earned by the poorest fraction of the population, plotted against that fraction.'],
        ['Line of equality', 'The diagonal of the Lorenz diagram, where every fraction of the population earns the same fraction of income.'],
        ['Gini coefficient', 'Twice the area between the line of equality and the Lorenz curve; a number between 0 and 1.'],
        ['Income share', 'The fraction of total income received by a group, such as the top 10% or the bottom 50%.'],
        ['Percentile', 'The position of a person in the sorted population; the 90th percentile is richer than 90% of people.'],
        ['Pareto distribution (power law)', 'A distribution in which the chance of exceeding a level falls as a power of that level, producing a heavy tail of very high values.'],
        ['Heavy tail', 'A distribution in which rare, extremely large values carry a large share of the total.'],
        ['Trapezoid rule', 'Estimating the area under a curve by joining neighbouring data points with straight lines; how the sim computes the Gini.'],
      ],
      id: [
        ['Kurva Lorenz', 'Bagian kumulatif pendapatan yang diperoleh pecahan termiskin populasi, digambar terhadap pecahan itu.'],
        ['Garis kesetaraan', 'Diagonal diagram Lorenz, tempat setiap pecahan populasi memperoleh pecahan pendapatan yang sama.'],
        ['Koefisien Gini', 'Dua kali luas antara garis kesetaraan dan kurva Lorenz; sebuah bilangan antara 0 dan 1.'],
        ['Pangsa pendapatan', 'Pecahan total pendapatan yang diterima suatu kelompok, misalnya 10% teratas atau 50% terbawah.'],
        ['Persentil', 'Posisi seseorang dalam populasi yang terurut; persentil ke-90 lebih kaya daripada 90% orang.'],
        ['Distribusi Pareto (hukum pangkat)', 'Distribusi dengan peluang melampaui suatu tingkat yang turun sebagai pangkat dari tingkat itu, menghasilkan ekor gemuk berisi nilai-nilai sangat tinggi.'],
        ['Ekor gemuk', 'Distribusi yang nilai-nilai langkanya yang sangat besar membawa bagian besar dari total.'],
        ['Aturan trapesium', 'Menaksir luas di bawah kurva dengan menghubungkan titik-titik data bertetangga dengan garis lurus; cara simulasi menghitung Gini.'],
      ],
    },
    misconceptions: {
      en: [
        ['A Gini of 0.5 means the richest half has all the income.', 'No. The figure shows an exponential distribution with Gini 0.50 in which the bottom half still earns about 15% of income. The Gini is an area, not a share; each value is consistent with many different curves.'],
        ['If everyone\'s income doubles, inequality as measured by the Gini goes up.', 'The Gini is unchanged, because every share of the total stays the same. It measures relative dispersion. A rising Gini can occur while everyone is getting richer, and a falling Gini while everyone is getting poorer.'],
        ['The top 10% share and the Gini always move together.', 'Usually, but not necessarily. The Gini weighs the whole curve, so inequality can rise among the bottom 90% while the top share is unchanged, or the reverse. Compare the two readouts in the sim as you switch between Two classes and Pareto.'],
        ['A larger sample always gives a higher Gini for a Pareto population.', 'A larger sample gives a more accurate Gini, closer to 1/(2α − 1). Small samples tend to underestimate the inequality of heavy-tailed distributions because the rare very large incomes are often missing from the draw.'],
      ],
      id: [
        ['Gini 0,5 berarti separuh terkaya memiliki seluruh pendapatan.', 'Tidak. Gambar menunjukkan distribusi eksponensial dengan Gini 0,50 di mana separuh terbawah masih memperoleh sekitar 15% pendapatan. Gini adalah luas, bukan pangsa; setiap nilainya selaras dengan banyak kurva yang berbeda.'],
        ['Jika pendapatan semua orang berlipat dua, ketimpangan menurut Gini naik.', 'Gini tidak berubah, karena setiap bagian dari total tetap sama. Gini mengukur sebaran relatif. Gini bisa naik sementara semua orang semakin kaya, dan bisa turun sementara semua orang semakin miskin.'],
        ['Pangsa 10% teratas dan Gini selalu bergerak bersama.', 'Biasanya, tetapi tidak selalu. Gini menimbang seluruh kurva, sehingga ketimpangan bisa naik di antara 90% terbawah sementara pangsa teratas tidak berubah, atau sebaliknya. Bandingkan kedua angka di simulasi saat berganti antara Dua kelas dan Pareto.'],
        ['Sampel yang lebih besar selalu memberi Gini yang lebih tinggi untuk populasi Pareto.', 'Sampel yang lebih besar memberi Gini yang lebih akurat, lebih dekat ke 1/(2α − 1). Sampel kecil cenderung meremehkan ketimpangan distribusi berekor gemuk karena pendapatan sangat besar yang langka sering tidak ikut tertarik.'],
      ],
    },
    realWorld: {
      en: [
        'Statistics Indonesia (BPS) publishes the national Gini ratio for spending twice a year; in recent years it has been around 0.38 to 0.40.',
        'Among countries with reliable data, South Africa has one of the highest income Ginis, above 0.6, while several central and northern European countries sit below 0.30.',
        'Wealth is far more concentrated than income: wealth Ginis above 0.7 are common even in countries whose income Gini is near 0.3.',
        'Lorenz curves are also used outside economics, for example to show how unevenly rainfall is spread over the days of a year or how a few products account for most of a shop\'s sales.',
      ],
      id: [
        'Badan Pusat Statistik (BPS) menerbitkan rasio Gini pengeluaran nasional dua kali setahun; dalam beberapa tahun terakhir nilainya sekitar 0,38 sampai 0,40.',
        'Di antara negara dengan data yang andal, Afrika Selatan punya salah satu Gini pendapatan tertinggi, di atas 0,6, sementara beberapa negara Eropa tengah dan utara berada di bawah 0,30.',
        'Kekayaan jauh lebih terpusat daripada pendapatan: Gini kekayaan di atas 0,7 lazim bahkan di negara yang Gini pendapatannya sekitar 0,3.',
        'Kurva Lorenz juga dipakai di luar ekonomi, misalnya untuk menunjukkan betapa tidak meratanya curah hujan tersebar pada hari-hari dalam setahun atau bagaimana sedikit produk menyumbang sebagian besar penjualan sebuah toko.',
      ],
    },
    questions: {
      en: [
        { q: 'Four people earn 10, 20, 30 and 40. Find the Lorenz curve points and the Gini coefficient using the trapezoid method the sim uses.', a: 'Total income is 100. Sorted cumulative shares are 0.10, 0.30, 0.60 and 1.00 at population fractions 0.25, 0.50, 0.75 and 1.00. The area under the curve by trapezoids is 0.25 × [(0 + 0.1)/2 + (0.1 + 0.3)/2 + (0.3 + 0.6)/2 + (0.6 + 1)/2] = 0.25 × 1.5 = 0.375. Gini = 1 − 2 × 0.375 = 0.25.' },
        { q: 'Set the distribution to Pareto and move α from 3.0 to 1.5. What Gini does theory predict at each value, and why does the sim\'s number jump around when you press Resample at α = 1.5 but hardly at all for the uniform distribution?', a: 'Gini = 1/(2α − 1): 1/5 = 0.20 at α = 3 and 1/2 = 0.50 at α = 1.5. At low α the Pareto tail is heavy, so whether the sample happens to include one or two enormous incomes changes the total income, and with it every share, by a lot. Uniform incomes are bounded between 0 and 100, so no single draw can dominate and the sample Gini stays close to 0.33.' },
        { q: 'Two countries both report a Gini of 0.40. Must their income distributions be the same? Give a reason.', a: 'No. The Gini is a single area, and different Lorenz curves can enclose the same area. One country might have a large, poor bottom group and a modest top, the other a comfortable majority and a very rich elite; their curves would cross, with the first sagging more on the left and the second on the right, yet both could give 0.40. Looking at the bottom-50% and top-10% shares together tells you more than the Gini alone.' },
      ],
      id: [
        { q: 'Empat orang berpendapatan 10, 20, 30, dan 40. Tentukan titik-titik kurva Lorenz dan koefisien Gini dengan metode trapesium yang dipakai simulasi.', a: 'Total pendapatan 100. Bagian kumulatif terurutnya 0,10, 0,30, 0,60, dan 1,00 pada pecahan populasi 0,25, 0,50, 0,75, dan 1,00. Luas di bawah kurva dengan trapesium adalah 0,25 × [(0 + 0,1)/2 + (0,1 + 0,3)/2 + (0,3 + 0,6)/2 + (0,6 + 1)/2] = 0,25 × 1,5 = 0,375. Gini = 1 − 2 × 0,375 = 0,25.' },
        { q: 'Atur distribusi ke Pareto dan geser α dari 3,0 ke 1,5. Berapa Gini yang diprediksi teori pada tiap nilai, dan mengapa angka di simulasi melompat-lompat saat kamu menekan Resample pada α = 1,5 tetapi hampir tidak untuk distribusi uniform?', a: 'Gini = 1/(2α − 1): 1/5 = 0,20 pada α = 3 dan 1/2 = 0,50 pada α = 1,5. Pada α rendah ekor Pareto gemuk, sehingga apakah sampel kebetulan memuat satu atau dua pendapatan raksasa mengubah total pendapatan, dan dengan itu setiap pangsa, cukup besar. Pendapatan uniform terbatas antara 0 dan 100, sehingga tidak ada satu tarikan pun yang bisa mendominasi dan Gini sampel tetap dekat 0,33.' },
        { q: 'Dua negara sama-sama melaporkan Gini 0,40. Haruskah distribusi pendapatannya sama? Berikan alasannya.', a: 'Tidak. Gini adalah satu luas, dan kurva Lorenz yang berbeda bisa melingkupi luas yang sama. Satu negara mungkin punya kelompok bawah yang besar dan miskin dengan kelompok atas yang sedang, negara lain punya mayoritas yang berkecukupan dan elit yang sangat kaya; kurva keduanya akan berpotongan, yang pertama melengkung lebih dalam di kiri dan yang kedua di kanan, tetapi keduanya bisa memberi 0,40. Melihat pangsa 50% terbawah dan 10% teratas bersama-sama menceritakan lebih banyak daripada Gini saja.' },
      ],
    },
  },
};
