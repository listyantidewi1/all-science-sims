// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Define slope and y-intercept geometrically.',
      'Use sum of squared residuals to compare two lines.',
      'Recognize that the least-squares line minimizes total squared error.',
    ],
    id: [
      'Mendefinisikan kemiringan dan titik potong-y secara geometris.',
      'Menggunakan jumlah kuadrat residu untuk membandingkan dua garis.',
      'Mengenali bahwa garis kuadrat terkecil meminimalkan total galat kuadrat.',
    ],
  },  tryThis: {
    en: [
      'Place 5 points along a clear line — match the best-fit line yourself.',
      'Add one wild outlier — how much does it pull the best-fit?',
      'Drag your line to a 1°-off match. How much higher is your error?',
    ],
    id: [
      'Tempatkan 5 titik di sepanjang garis yang jelas — cocokkan garis terbaiknya sendiri.',
      'Tambah satu pencilan ekstrem — seberapa besar pengaruhnya pada garis terbaik?',
      'Geser garis Anda hingga meleset 1° — berapa kenaikan galatnya?',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'Two measured quantities often move together: more hours of study tend to go with higher marks, taller people tend to have bigger feet. A straight line, y = m·x + b, is the simplest way to summarise such a trend. The slope m says how much y rises for each extra unit of x, and the intercept b is the value of y where the line crosses the y-axis, at x = 0. Fitting a line means choosing m and b. In the simulation you click to drop points, drag them around or right-click to remove them, and the two sliders set your own line, drawn in pink, while the green dashed line is the computer\'s best fit.',
        'To judge a line you need a score. For each point, the residual is the gap between the actual y and the y the line predicts at that x; the simulation draws these as vertical pink segments. Residuals above the line are positive and those below are negative, so instead of adding them directly we square each one, which makes every miss count and makes a big miss count much more than a small one, and then add the squares up. This total is the sum of squared residuals, SSR. The least-squares line, also called the best-fit line, is the one with the smallest possible SSR for the given points; your line\'s SSR can equal it, when you press "Match best fit", but can never go below it.',
        'The best-fit line has two useful properties. It always passes through the point (mean of x, mean of y), and its residuals add up to exactly zero. Its slope depends on how strongly y tends to move with x: for the five points in the figure the best line is y = 0.7x + 1.0, with SSR = 2.80, and any other line scores higher. Because residuals are squared, a single point far from the others, an outlier, pulls the line strongly: try adding one high point at the right edge and watch the green line tilt toward it. The "New random points" button scatters eight points around the hidden line y = 0.7x + 1.5 with noise added, so the best fit comes close to that line but does not land on it exactly, which is what estimating from noisy data always looks like.',
        'The model has limits worth knowing. It only fits straight lines, so a curved pattern will be summarised badly even if the SSR looks small. It measures vertical distances only, treating x as known and y as the quantity being predicted; swapping the axes gives a different line. With one point no line is defined, and with two the line passes through both with SSR = 0, which looks perfect but means nothing. A good fit does not show that x causes y, and predictions outside the range of the data (here 0 to 10) are guesses the data never tested.',
      ],
      id: [
        'Dua besaran yang diukur sering bergerak bersama: jam belajar yang lebih banyak cenderung disertai nilai yang lebih tinggi, orang yang lebih tinggi cenderung berkaki lebih besar. Garis lurus, y = m·x + b, adalah cara paling sederhana untuk merangkum kecenderungan seperti itu. Kemiringan m menyatakan seberapa besar y naik untuk setiap tambahan satu satuan x, dan titik potong b adalah nilai y saat garis memotong sumbu y, pada x = 0. Mencocokkan garis berarti memilih m dan b. Dalam simulasi kamu mengklik untuk menaruh titik, menyeretnya, atau mengklik kanan untuk menghapusnya, dan dua slider mengatur garismu sendiri yang digambar merah muda, sedangkan garis putus-putus hijau adalah garis terbaik hasil hitungan komputer.',
        'Untuk menilai sebuah garis kamu butuh skor. Untuk tiap titik, residu adalah selisih antara y sebenarnya dan y yang diprediksi garis pada x itu; simulasi menggambarnya sebagai ruas tegak berwarna merah muda. Residu di atas garis bernilai positif dan yang di bawah negatif, sehingga alih-alih dijumlahkan langsung, tiap residu dikuadratkan dulu, yang membuat setiap selisih dihitung dan selisih besar dihitung jauh lebih berat daripada yang kecil, lalu kuadrat-kuadratnya dijumlahkan. Total ini disebut jumlah kuadrat residu, SSR. Garis kuadrat terkecil, disebut juga garis terbaik, adalah garis dengan SSR sekecil mungkin untuk titik-titik yang diberikan; SSR garismu bisa menyamainya, saat kamu menekan "Match best fit", tetapi tidak pernah bisa lebih kecil.',
        'Garis terbaik punya dua sifat yang berguna. Ia selalu melewati titik (rata-rata x, rata-rata y), dan residu-residunya berjumlah tepat nol. Kemiringannya bergantung pada seberapa kuat y cenderung bergerak mengikuti x: untuk lima titik pada gambar, garis terbaiknya y = 0,7x + 1,0 dengan SSR = 2,80, dan garis lain mana pun skornya lebih tinggi. Karena residu dikuadratkan, satu titik yang jauh dari yang lain, pencilan, menarik garis dengan kuat: coba tambahkan satu titik tinggi di tepi kanan dan lihat garis hijau miring ke arahnya. Tombol "New random points" menebar delapan titik di sekitar garis tersembunyi y = 0,7x + 1,5 dengan derau, sehingga garis terbaik mendekati garis itu tetapi tidak tepat di atasnya; begitulah selalu rupanya menaksir dari data yang berderau.',
        'Model ini punya batasan yang perlu diketahui. Ia hanya mencocokkan garis lurus, sehingga pola melengkung akan dirangkum dengan buruk meski SSR-nya tampak kecil. Ia hanya mengukur jarak tegak, memperlakukan x sebagai diketahui dan y sebagai besaran yang diprediksi; menukar sumbu menghasilkan garis yang berbeda. Dengan satu titik tidak ada garis yang terdefinisi, dan dengan dua titik garis melewati keduanya dengan SSR = 0, yang tampak sempurna tetapi tidak berarti apa-apa. Kecocokan yang baik tidak menunjukkan bahwa x menyebabkan y, dan prediksi di luar rentang data (di sini 0 sampai 10) hanyalah tebakan yang tidak pernah diuji oleh data.',
      ],
    },
    figure: {
      caption: {
        en: 'Five points and their least-squares line y = 0.7x + 1.0. Each residual is the vertical gap from a point to the line; the shaded square shows one residual squared (1.1² = 1.21). The line passes through (mean x, mean y) = (3, 3.1), and the squares add up to SSR = 2.80, the smallest any line can achieve here.',
        id: 'Lima titik dan garis kuadrat terkecilnya y = 0,7x + 1,0. Tiap residu adalah jarak tegak dari titik ke garis; persegi yang diarsir menunjukkan satu residu yang dikuadratkan (1,1² = 1,21). Garis melewati (rata-rata x, rata-rata y) = (3, 3,1), dan jumlah kuadratnya SSR = 2,80, yang terkecil yang bisa dicapai garis mana pun di sini.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        const X = (x) => 40 + x * 46, Y = (y) => 212 - y * 30;
        const pts = [[1, 1], [2, 3.5], [3, 2.5], [4, 4.5], [5, 4]];
        const line = (x) => 0.7 * x + 1;
        const res = pts.map(([x, y]) => `<line x1="${X(x)}" y1="${Y(y)}" x2="${X(x)}" y2="${Y(line(x))}" stroke="#ef4444" stroke-width="2"/>`).join('');
        const dots = pts.map(([x, y]) => `<circle cx="${X(x)}" cy="${Y(y)}" r="4.5" fill="currentColor"/>`).join('');
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Residuals and the least-squares line', 'Residu dan garis kuadrat terkecil')}">
  <style>text{font:12px system-ui,sans-serif;fill:currentColor}.s{font-size:10px;opacity:.75}.m{fill:none;stroke:currentColor;stroke-width:1.2;opacity:.45}</style>
  <line x1="40" y1="212" x2="330" y2="212" class="m"/>
  <line x1="40" y1="212" x2="40" y2="30" class="m"/>
  ${[1, 2, 3, 4, 5, 6].map((x) => `<text x="${X(x)}" y="226" text-anchor="middle" class="s">${x}</text>`).join('')}
  ${[1, 2, 3, 4, 5].map((y) => `<text x="32" y="${Y(y) + 4}" text-anchor="end" class="s">${y}</text>`).join('')}
  <text x="330" y="226" text-anchor="end" class="s">x</text>
  <text x="46" y="38" class="s">y</text>
  <rect x="${X(2)}" y="${Y(3.5)}" width="33" height="33" fill="#ef4444" opacity="0.25"/>
  <text x="${X(2) - 6}" y="${Y(3.5) + 14}" text-anchor="end" class="s" style="fill:#ef4444">${L('residual 1.1', 'residu 1,1')}</text>
  <text x="${X(2) - 6}" y="${Y(3.5) + 27}" text-anchor="end" class="s" style="fill:#ef4444">${L('squared: 1.21', 'kuadrat: 1,21')}</text>
  ${res}
  <line x1="${X(0)}" y1="${Y(line(0))}" x2="${X(6)}" y2="${Y(line(6))}" stroke="#10b981" stroke-width="2.5"/>
  <text x="${X(5.2)}" y="${Y(line(5.2)) - 16}" text-anchor="middle" class="s" style="fill:#10b981;font-weight:700">${L('y = 0.7x + 1.0', 'y = 0,7x + 1,0')}</text>
  ${dots}
  <circle cx="${X(3)}" cy="${Y(3.1)}" r="7" fill="none" stroke="#f59e0b" stroke-width="2"/>
  <text x="${X(3) + 10}" y="${Y(3.1) + 22}" class="s" style="fill:#f59e0b">${L('(mean x, mean y) = (3, 3.1)', '(rata-rata x, rata-rata y) = (3; 3,1)')}</text>
  <text x="328" y="200" text-anchor="end" class="s">SSR = ${L('0.49 + 1.21 + 0.36 + 0.49 + 0.25 = 2.80', '0,49 + 1,21 + 0,36 + 0,49 + 0,25 = 2,80')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'A straight line y = m·x + b is described by its slope m and its intercept b.',
        'A residual is the vertical gap between a point and the line; squaring the residuals and adding them gives the SSR.',
        'The least-squares line is the one with the smallest SSR; no other line can do better on the same points.',
        'The best-fit line always passes through the point (mean of x, mean of y), and its residuals sum to zero.',
        'Because residuals are squared, a single outlier can swing the line a lot.',
      ],
      id: [
        'Garis lurus y = m·x + b ditentukan oleh kemiringan m dan titik potong b.',
        'Residu adalah jarak tegak antara titik dan garis; mengkuadratkan residu lalu menjumlahkannya menghasilkan SSR.',
        'Garis kuadrat terkecil adalah garis dengan SSR paling kecil; tidak ada garis lain yang bisa lebih baik untuk titik-titik yang sama.',
        'Garis terbaik selalu melewati titik (rata-rata x, rata-rata y), dan residu-residunya berjumlah nol.',
        'Karena residu dikuadratkan, satu pencilan saja bisa menggeser garis cukup jauh.',
      ],
    },
    vocabulary: {
      en: [
        ['Slope (m)', 'How much y changes for each one-unit increase in x; the steepness of the line.'],
        ['Intercept (b)', 'The value of y where the line crosses the y-axis, at x = 0.'],
        ['Residual', 'Actual y minus the y predicted by the line, for one point; positive above the line, negative below.'],
        ['Sum of squared residuals (SSR)', 'The total of all residuals squared; the score the simulation uses to compare lines.'],
        ['Least-squares line', 'The line with the smallest SSR for a set of points; also called the best-fit or regression line.'],
        ['Outlier', 'A point far from the pattern of the others, which can pull the fitted line strongly.'],
        ['Extrapolation', 'Using the line to predict y for x values outside the range of the data, which is risky.'],
      ],
      id: [
        ['Kemiringan (m)', 'Seberapa besar y berubah untuk setiap kenaikan satu satuan x; kecuraman garis.'],
        ['Titik potong (b)', 'Nilai y saat garis memotong sumbu y, pada x = 0.'],
        ['Residu', 'y sebenarnya dikurangi y yang diprediksi garis, untuk satu titik; positif di atas garis, negatif di bawah.'],
        ['Jumlah kuadrat residu (SSR)', 'Total semua residu yang dikuadratkan; skor yang dipakai simulasi untuk membandingkan garis.'],
        ['Garis kuadrat terkecil', 'Garis dengan SSR paling kecil untuk sekumpulan titik; disebut juga garis terbaik atau garis regresi.'],
        ['Pencilan', 'Titik yang jauh dari pola titik-titik lain, yang bisa menarik garis hasil kecocokan dengan kuat.'],
        ['Ekstrapolasi', 'Memakai garis untuk memprediksi y pada nilai x di luar rentang data, yang berisiko.'],
      ],
    },
    misconceptions: {
      en: [
        ['The best line is the one that passes through the most points.', 'The best line minimises the total squared gap to all points together. It often passes through none of them exactly.'],
        ['If the residuals add up to zero, the fit is perfect.', 'Every least-squares line has residuals that sum to zero, however poor the fit. That is exactly why the residuals are squared before adding: the SSR, not the plain sum, measures quality.'],
        ['A line that fits well proves that x causes y.', 'A fit only shows that the two quantities move together. Ice-cream sales and sunburns rise together because of summer, not because one causes the other.'],
        ['Joining the first and last points gives the best fit.', 'That line ignores every point in between. The least-squares line uses all the points and almost always has a lower SSR.'],
      ],
      id: [
        ['Garis terbaik adalah garis yang melewati titik paling banyak.', 'Garis terbaik meminimalkan total kuadrat jarak ke semua titik sekaligus. Sering kali ia tidak melewati satu pun titik secara tepat.'],
        ['Jika residu berjumlah nol, kecocokannya sempurna.', 'Setiap garis kuadrat terkecil memiliki residu yang berjumlah nol, seburuk apa pun kecocokannya. Justru itulah sebabnya residu dikuadratkan sebelum dijumlahkan: SSR, bukan jumlah biasa, yang mengukur mutu.'],
        ['Garis yang cocok dengan baik membuktikan x menyebabkan y.', 'Kecocokan hanya menunjukkan kedua besaran bergerak bersama. Penjualan es krim dan kulit terbakar matahari sama-sama naik karena musim panas, bukan karena satu menyebabkan yang lain.'],
        ['Menghubungkan titik pertama dan terakhir memberi garis terbaik.', 'Garis itu mengabaikan semua titik di antaranya. Garis kuadrat terkecil memakai semua titik dan hampir selalu memiliki SSR yang lebih rendah.'],
      ],
    },
    realWorld: {
      en: [
        'Estate agents estimate a house price from its floor area with a regression line fitted to recent sales.',
        'Calibrating an instrument: the readings of a cheap thermometer are plotted against a reference and the fitted line corrects future readings.',
        'Climate scientists fit trend lines to temperature records to report warming per decade.',
        'Coaches and doctors use growth and performance trend lines to compare a person with the expected pattern for their age.',
      ],
      id: [
        'Agen properti menaksir harga rumah dari luas lantainya dengan garis regresi yang dicocokkan pada penjualan terbaru.',
        'Kalibrasi alat ukur: bacaan termometer murah digambarkan terhadap bacaan acuan, dan garis hasil kecocokan mengoreksi bacaan berikutnya.',
        'Ilmuwan iklim mencocokkan garis tren pada catatan suhu untuk melaporkan pemanasan per dekade.',
        'Pelatih dan dokter memakai garis tren pertumbuhan dan performa untuk membandingkan seseorang dengan pola yang diharapkan pada usianya.',
      ],
    },
    questions: {
      en: [
        { q: 'The points (1,2), (2,3), (3,5), (4,6), (5,8) lie close to a line. Find the mean of x and the mean of y, then the best-fit slope and intercept.', a: 'Mean x = 3, mean y = 4.8. The slope is the total of (x − mean x) × (y − mean y), which is 15, divided by the total of (x − mean x)², which is 10, so m = 1.5. Since the line passes through (3, 4.8), b = 4.8 − 1.5 × 3 = 0.3. Best fit: y = 1.5x + 0.3, with SSR = 0.30.' },
        { q: 'Line A misses four points by 1 unit each. Line B passes through three points exactly and misses one by 2 units. Which has the lower SSR?', a: 'They are equal: A gives 1² + 1² + 1² + 1² = 4 and B gives 2² = 4. A single miss of 2 costs as much as four misses of 1, which is exactly why one outlier can dominate the fit.' },
        { q: 'Your points follow y ≈ 0.7x + 1.5. You add one point at (9, 9). Does the best-fit line change much, and why?', a: 'Yes, it tilts upward toward the new point. The point is far above the line, and because residuals are squared, leaving it with a residual of about 1.2 would cost about 1.44; moving the line reduces that cost while only slightly increasing the small residuals of the other points. Points far from the mean of x have the most leverage.' },
      ],
      id: [
        { q: 'Titik-titik (1,2), (2,3), (3,5), (4,6), (5,8) terletak dekat sebuah garis. Cari rata-rata x dan rata-rata y, lalu kemiringan dan titik potong garis terbaiknya.', a: 'Rata-rata x = 3, rata-rata y = 4,8. Kemiringannya adalah total (x − rata-rata x) × (y − rata-rata y), yaitu 15, dibagi total (x − rata-rata x)², yaitu 10, sehingga m = 1,5. Karena garis melewati (3; 4,8), b = 4,8 − 1,5 × 3 = 0,3. Garis terbaik: y = 1,5x + 0,3, dengan SSR = 0,30.' },
        { q: 'Garis A meleset dari empat titik masing-masing 1 satuan. Garis B tepat melewati tiga titik dan meleset 2 satuan dari satu titik. Mana yang SSR-nya lebih rendah?', a: 'Keduanya sama: A menghasilkan 1² + 1² + 1² + 1² = 4 dan B menghasilkan 2² = 4. Satu selisih sebesar 2 berbiaya sama dengan empat selisih sebesar 1, dan itulah sebabnya satu pencilan bisa mendominasi kecocokan.' },
        { q: 'Titik-titikmu mengikuti y ≈ 0,7x + 1,5. Kamu menambahkan satu titik di (9, 9). Apakah garis terbaik banyak berubah, dan mengapa?', a: 'Ya, garis miring ke atas menuju titik baru. Titik itu jauh di atas garis, dan karena residu dikuadratkan, membiarkannya dengan residu sekitar 1,2 berbiaya sekitar 1,44; menggeser garis mengurangi biaya itu sambil hanya sedikit menambah residu kecil titik-titik lain. Titik yang jauh dari rata-rata x punya pengungkit paling besar.' },
      ],
    },
  },
};
