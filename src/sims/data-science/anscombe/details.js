// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'See that summary statistics can hide structure.',
      'Identify outliers and nonlinearities only visible from the plot.',
      'Adopt the habit of always making a scatter plot first.',
    ],
    id: [
      'Menyadari bahwa statistik ringkasan dapat menyembunyikan struktur.',
      'Mengenali pencilan dan ketaklinearan yang hanya tampak dari grafik.',
      'Membangun kebiasaan selalu membuat scatter plot terlebih dahulu.',
    ],
  },
  tryThis: {
    en: [
      'Read the four sets of stats — are they identical?',
      'Now look at the plots — which one looks like a clean line?',
      'Drag a point in any panel — does its line jump or stay put?',
    ],
    id: [
      'Bacalah empat kumpulan statistik — apakah identik?',
      'Sekarang lihat grafiknya — mana yang seperti garis bersih?',
      'Seret titik di panel mana pun — apakah garisnya melompat atau tetap?',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'In 1973 the statistician Francis Anscombe published four small data sets, each with 11 pairs of (x, y) values, built so that their usual summary numbers agree almost exactly: mean of x = 9.0, mean of y = 7.50, variance of x = 11.0, variance of y ≈ 4.12, correlation r ≈ 0.816, and the same least-squares line y = 3.00 + 0.500x. Anyone reading only the table of statistics would conclude the four sets are practically the same. The scatter plots say otherwise, and that contrast is the entire point of the quartet.',
        'The simulation draws the four sets side by side with their fitted lines and live statistics. Dataset 1 is what the numbers suggest: a roughly linear relationship with ordinary scatter, so a straight line is a reasonable model. Dataset 2 is a smooth curve with no noise at all; a line is the wrong model, yet r is still 0.82 because r only measures how well a straight line does, not whether a curve would do better. Dataset 3 is a perfect straight line of slope about 0.35 plus a single outlier at (13, 12.74) that tilts the fitted line up to slope 0.5. Dataset 4 has ten points all at x = 8 and one point at x = 19; that lone point decides the slope entirely, and without it there would be no slope to fit.',
        'Why do the statistics fail to notice? The mean, the variance, r and the least-squares slope are all sums over the data in which each point contributes according to its squared distance from the centre. They are blind to the order or pattern of the points and extremely sensitive to a few far-away points, which is exactly the opposite of what your eyes do. Try it: drag the lone point in dataset 4 and watch the whole line pivot around x = 8, or drag the outlier in dataset 3 down onto the line and watch r climb toward 1. Dragging any single point in dataset 2 cannot make the straight line describe the curve.',
        'The sim computes the variances with n − 1 in the denominator (the usual sample variance) and shows the statistics to two or three decimals; the original four sets agree only to about that precision, not perfectly. Points can be dragged within 0 to 20 in x and 0 to 14 in y. What the sim does not show is the standard next step, a residual plot of the vertical distances from each point to the line: for dataset 2 the residuals form a clear arch, for dataset 3 one residual stands alone, and those pictures catch what the summary table missed.',
      ],
      id: [
        'Pada tahun 1973 ahli statistik Francis Anscombe menerbitkan empat kumpulan data kecil, masing-masing berisi 11 pasangan nilai (x, y), yang dibuat agar angka-angka ringkasannya hampir sama persis: rata-rata x = 9,0, rata-rata y = 7,50, varian x = 11,0, varian y ≈ 4,12, korelasi r ≈ 0,816, dan garis kuadrat terkecil yang sama, y = 3,00 + 0,500x. Siapa pun yang hanya membaca tabel statistiknya akan menyimpulkan keempat kumpulan itu praktis sama. Scatter plot-nya berkata lain, dan kontras itulah inti dari kuartet ini.',
        'Simulasi ini menggambar keempat kumpulan data berdampingan dengan garis regresinya dan statistik yang diperbarui langsung. Dataset 1 sesuai dengan yang disiratkan angkanya: hubungan yang kira-kira linear dengan sebaran wajar, sehingga garis lurus adalah model yang masuk akal. Dataset 2 adalah kurva mulus tanpa derau sama sekali; garis lurus adalah model yang salah, tetapi r tetap 0,82 karena r hanya mengukur seberapa baik garis lurus bekerja, bukan apakah kurva akan lebih baik. Dataset 3 adalah garis lurus sempurna dengan kemiringan sekitar 0,35 ditambah satu pencilan di (13; 12,74) yang memiringkan garis hasil fit menjadi 0,5. Dataset 4 memiliki sepuluh titik yang semuanya di x = 8 dan satu titik di x = 19; titik tunggal itu sepenuhnya menentukan kemiringan, dan tanpanya tidak ada kemiringan yang bisa dihitung.',
        'Mengapa statistik gagal menyadarinya? Rata-rata, varian, r, dan kemiringan kuadrat terkecil semuanya adalah penjumlahan atas data yang setiap titiknya menyumbang menurut kuadrat jaraknya dari pusat. Semuanya buta terhadap urutan atau pola titik dan sangat peka terhadap beberapa titik yang jauh, kebalikan dari apa yang dilakukan matamu. Coba: seret titik tunggal di dataset 4 dan lihat seluruh garis berputar di sekitar x = 8, atau seret pencilan di dataset 3 turun ke garis dan lihat r naik mendekati 1. Menyeret satu titik mana pun di dataset 2 tidak akan membuat garis lurus menggambarkan kurva itu.',
        'Simulasi menghitung varian dengan penyebut n − 1 (varian sampel yang lazim) dan menampilkan statistik dengan dua atau tiga desimal; keempat kumpulan aslinya hanya sama sampai sekitar ketelitian itu, tidak sempurna. Titik bisa diseret dalam rentang 0 sampai 20 untuk x dan 0 sampai 14 untuk y. Yang tidak ditampilkan simulasi adalah langkah lanjutan yang baku, yaitu plot residu, jarak vertikal dari setiap titik ke garis: untuk dataset 2 residunya membentuk lengkungan yang jelas, untuk dataset 3 satu residu berdiri sendiri, dan gambar-gambar itu menangkap apa yang terlewat oleh tabel ringkasan.',
      ],
    },
    figure: {
      caption: {
        en: 'The four Anscombe sets, each with the same fitted line y = 3 + 0.5x and the same r ≈ 0.82. Only a plot reveals the curve in set 2, the outlier in set 3 and the single high-leverage point in set 4.',
        id: 'Keempat kumpulan data Anscombe, masing-masing dengan garis regresi yang sama y = 3 + 0,5x dan r ≈ 0,82 yang sama. Hanya grafik yang mengungkap kurva di set 2, pencilan di set 3, dan satu titik berpengaruh besar di set 4.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        const Q = [
          [[10, 8.04], [8, 6.95], [13, 7.58], [9, 8.81], [11, 8.33], [14, 9.96], [6, 7.24], [4, 4.26], [12, 10.84], [7, 4.82], [5, 5.68]],
          [[10, 9.14], [8, 8.14], [13, 8.74], [9, 8.77], [11, 9.26], [14, 8.10], [6, 6.13], [4, 3.10], [12, 9.13], [7, 7.26], [5, 4.74]],
          [[10, 7.46], [8, 6.77], [13, 12.74], [9, 7.11], [11, 7.81], [14, 8.84], [6, 6.08], [4, 5.39], [12, 8.15], [7, 6.42], [5, 5.73]],
          [[8, 6.58], [8, 5.76], [8, 7.71], [8, 8.84], [8, 8.47], [8, 7.04], [8, 5.25], [19, 12.50], [8, 5.56], [8, 7.91], [8, 6.89]],
        ];
        const notes = [L('linear + noise', 'linear + derau'), L('a curve, not a line', 'kurva, bukan garis'), L('line + one outlier', 'garis + satu pencilan'), L('one point sets the slope', 'satu titik menentukan kemiringan')];
        const flag = [[], [], [[13, 12.74]], [[19, 12.50]]];
        const panel = (i) => {
          const px0 = 10 + (i % 2) * 180, py0 = 22 + Math.floor(i / 2) * 105, w = 160, h = 80;
          const X = (x) => px0 + (x / 20) * w, Y = (y) => py0 + h - (y / 14) * h;
          const pts = Q[i].map(([x, y]) => `<circle cx="${X(x).toFixed(1)}" cy="${Y(y).toFixed(1)}" r="3" fill="${flag[i].some(([a, b]) => a === x && b === y) ? '#ef4444' : '#3b82f6'}"/>`).join('');
          return `<rect x="${px0}" y="${py0}" width="${w}" height="${h}" class="m"/>
  <line x1="${X(0)}" y1="${Y(3).toFixed(1)}" x2="${X(20)}" y2="${Y(13).toFixed(1)}" stroke="#10b981" stroke-width="1.6"/>
  ${pts}
  <text x="${px0 + 4}" y="${py0 - 5}" class="s b">${L('Set', 'Set')} ${i + 1}: <tspan font-weight="400">${notes[i]}</tspan></text>`;
        };
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('The four Anscombe data sets with their shared regression line', 'Keempat kumpulan data Anscombe dengan garis regresi bersama')}">
  <style>text{font:12px system-ui,sans-serif;fill:currentColor}.m{fill:none;stroke:currentColor;stroke-width:1;opacity:.45}.s{font-size:10px}.b{font-weight:600}</style>
  ${panel(0)}
  ${panel(1)}
  ${panel(2)}
  ${panel(3)}
  <text x="10" y="230" class="s">${L('All four: x̄ = 9.0, ȳ = 7.50, r = 0.82, line y = 3.00 + 0.50x', 'Keempatnya: x̄ = 9,0, ȳ = 7,50, r = 0,82, garis y = 3,00 + 0,50x')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Four data sets can share the same means, variances, correlation and regression line yet have completely different shapes.',
        'The correlation r measures only how well a straight line fits; it cannot tell a true line from a curve.',
        'Least-squares statistics weight points by squared distance, so one far-away point can set the slope on its own.',
        'Summary statistics are a lossy compression of the data; plotting first is how you find out what they threw away.',
      ],
      id: [
        'Empat kumpulan data bisa memiliki rata-rata, varian, korelasi, dan garis regresi yang sama tetapi bentuknya sama sekali berbeda.',
        'Korelasi r hanya mengukur seberapa cocok garis lurus; ia tidak bisa membedakan garis sejati dari kurva.',
        'Statistik kuadrat terkecil memberi bobot pada titik menurut kuadrat jaraknya, sehingga satu titik yang jauh bisa menentukan kemiringan sendirian.',
        'Statistik ringkasan adalah pemampatan data yang kehilangan informasi; menggambar grafik dulu adalah cara mengetahui apa yang terbuang.',
      ],
    },
    vocabulary: {
      en: [
        ['Summary statistic', 'A single number that describes a data set, such as a mean, variance or correlation.'],
        ['Correlation coefficient r', 'A number between −1 and 1 measuring the strength and direction of a linear relationship between x and y.'],
        ['Least-squares regression line', 'The straight line that minimises the sum of squared vertical distances from the points to the line.'],
        ['Residual', 'The vertical distance from a data point to the fitted line; residual plots reveal patterns the line missed.'],
        ['Outlier', 'A point far from the pattern of the other points, like the high point in dataset 3.'],
        ['Leverage', 'How strongly a point can tilt the regression line; points with unusual x values, like x = 19 in dataset 4, have high leverage.'],
        ['Variance', 'The average squared distance of values from their mean; the sim divides by n − 1.'],
      ],
      id: [
        ['Statistik ringkasan', 'Satu angka yang menggambarkan sebuah kumpulan data, misalnya rata-rata, varian, atau korelasi.'],
        ['Koefisien korelasi r', 'Bilangan antara −1 dan 1 yang mengukur kekuatan dan arah hubungan linear antara x dan y.'],
        ['Garis regresi kuadrat terkecil', 'Garis lurus yang meminimalkan jumlah kuadrat jarak vertikal dari titik-titik ke garis.'],
        ['Residu', 'Jarak vertikal dari sebuah titik data ke garis hasil fit; plot residu mengungkap pola yang terlewat oleh garis.'],
        ['Pencilan', 'Titik yang jauh dari pola titik-titik lainnya, seperti titik tinggi di dataset 3.'],
        ['Leverage (daya ungkit)', 'Seberapa kuat sebuah titik bisa memiringkan garis regresi; titik dengan nilai x yang tidak biasa, seperti x = 19 di dataset 4, berdaya ungkit tinggi.'],
        ['Varian', 'Rata-rata kuadrat jarak nilai-nilai dari rata-ratanya; simulasi membaginya dengan n − 1.'],
      ],
    },
    misconceptions: {
      en: [
        ['r = 0.82 means a straight line fits the data well.', 'It means the data has a fairly strong linear component. Dataset 2 has r = 0.82 and is a perfect curve that no straight line describes; the residual plot, not r, tells you whether the line is the right model.'],
        ['With 11 points, one point cannot matter much.', 'In dataset 4 a single point determines the slope completely, and in dataset 3 one point changes the slope from 0.35 to 0.50. Least-squares fits weight points by squared distance, so distant points dominate.'],
        ['If two data sets have the same statistics, they are basically the same data.', 'The statistics are a few numbers summarising 22 numbers; many different data sets compress to the same summary. Anscombe built four; later researchers built dozens, including one shaped like a dinosaur.'],
      ],
      id: [
        ['r = 0,82 berarti garis lurus cocok dengan datanya.', 'Artinya data memiliki komponen linear yang cukup kuat. Dataset 2 memiliki r = 0,82 dan merupakan kurva sempurna yang tidak bisa digambarkan garis lurus mana pun; plot residu, bukan r, yang memberi tahu apakah garis adalah model yang tepat.'],
        ['Dengan 11 titik, satu titik tidak mungkin berpengaruh banyak.', 'Di dataset 4 satu titik menentukan kemiringan sepenuhnya, dan di dataset 3 satu titik mengubah kemiringan dari 0,35 menjadi 0,50. Fit kuadrat terkecil memberi bobot menurut kuadrat jarak, sehingga titik yang jauh mendominasi.'],
        ['Jika dua kumpulan data memiliki statistik yang sama, datanya pada dasarnya sama.', 'Statistik hanyalah beberapa angka yang merangkum 22 angka; banyak kumpulan data berbeda yang terpampat ke ringkasan yang sama. Anscombe membuat empat; peneliti kemudian membuat puluhan, termasuk satu yang berbentuk dinosaurus.'],
      ],
    },
    realWorld: {
      en: [
        'The "Datasaurus Dozen" (2017) extended Anscombe\'s idea to thirteen data sets with identical statistics, one of them a drawing of a dinosaur, and is now a standard teaching example.',
        'In a laboratory, plotting measurements before computing a trend line is how students notice that a reaction rate levels off (a curve) rather than growing in a straight line.',
        'Economists examining the link between two indicators often find that a single unusual year, like a financial crisis, is the point that creates or destroys the apparent correlation.',
        'Exploratory data analysis, the habit of plotting everything first, is the first chapter of every modern data-science workflow precisely because of examples like this.',
      ],
      id: [
        '"Datasaurus Dozen" (2017) memperluas gagasan Anscombe menjadi tiga belas kumpulan data dengan statistik identik, salah satunya berbentuk gambar dinosaurus, dan kini menjadi contoh pengajaran yang baku.',
        'Di laboratorium, menggambar grafik hasil pengukuran sebelum menghitung garis tren adalah cara siswa menyadari bahwa laju reaksi mendatar (kurva), bukan bertambah secara garis lurus.',
        'Ekonom yang meneliti kaitan dua indikator sering menemukan bahwa satu tahun yang tidak biasa, seperti krisis keuangan, adalah titik yang menciptakan atau menghancurkan korelasi yang tampak.',
        'Analisis data eksploratif, kebiasaan menggambar semuanya dulu, menjadi bab pertama setiap alur kerja sains data modern justru karena contoh-contoh seperti ini.',
      ],
    },
    questions: {
      en: [
        { q: 'In dataset 4, ten points share x = 8 and one point sits at x = 19. Why does dragging that one point up or down pivot the whole regression line, and what would happen to the slope if it were removed?', a: 'The slope is determined by how y changes as x changes. Ten points at the same x give no information about that, so the single point at x = 19 is the only thing that sets the slope: it has all the leverage. Remove it and the variance of x is zero, so no slope can be computed at all.' },
        { q: 'Dataset 2 is a smooth downward-opening curve with r = 0.82. If you plotted the residuals (point minus line) against x, what pattern would you see?', a: 'A clear arch: the line sits below the points in the middle of the x range (positive residuals) and above them at both ends (negative residuals). A good model leaves residuals scattered randomly around zero; a pattern means the model is wrong, even though r is high.' },
        { q: 'In dataset 3 you drag the outlier at (13, 12.74) down until it lies on the line through the other ten points. Roughly what happens to r and to the slope?', a: 'r rises from 0.82 to very nearly 1.00, because the remaining points lie almost exactly on a straight line. The slope drops from 0.50 to about 0.35, the slope of that underlying line; the single outlier had been tilting it upward.' },
      ],
      id: [
        { q: 'Di dataset 4, sepuluh titik berada di x = 8 dan satu titik di x = 19. Mengapa menyeret satu titik itu ke atas atau ke bawah memutar seluruh garis regresi, dan apa yang terjadi pada kemiringan jika titik itu dihapus?', a: 'Kemiringan ditentukan oleh bagaimana y berubah saat x berubah. Sepuluh titik pada x yang sama tidak memberi informasi apa pun tentang itu, sehingga satu titik di x = 19 adalah satu-satunya penentu kemiringan: ia memegang seluruh daya ungkit. Hapus titik itu dan varian x menjadi nol, sehingga kemiringan tidak bisa dihitung sama sekali.' },
        { q: 'Dataset 2 adalah kurva mulus yang membuka ke bawah dengan r = 0,82. Jika kamu menggambar residu (titik dikurangi garis) terhadap x, pola apa yang akan terlihat?', a: 'Sebuah lengkungan yang jelas: garis berada di bawah titik-titik di tengah rentang x (residu positif) dan di atasnya di kedua ujung (residu negatif). Model yang baik meninggalkan residu yang tersebar acak di sekitar nol; adanya pola berarti modelnya salah, meskipun r tinggi.' },
        { q: 'Di dataset 3 kamu menyeret pencilan di (13; 12,74) ke bawah sampai terletak pada garis yang melewati sepuluh titik lainnya. Kira-kira apa yang terjadi pada r dan kemiringan?', a: 'r naik dari 0,82 menjadi hampir 1,00, karena titik-titik yang tersisa terletak hampir tepat pada satu garis lurus. Kemiringan turun dari 0,50 ke sekitar 0,35, yaitu kemiringan garis dasarnya; satu pencilan itu tadinya memiringkannya ke atas.' },
      ],
    },
  },
};
