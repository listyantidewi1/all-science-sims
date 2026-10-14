// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Connect the visual scatter to the numeric r.',
      'Understand that correlation does NOT imply causation.',
      'See the Anscombe-style fragility: one outlier can swing r dramatically.',
    ],
    id: [
      'Menghubungkan visual sebar dengan angka r.',
      'Memahami bahwa korelasi TIDAK berarti sebab-akibat.',
      'Melihat kerapuhan ala Anscombe: satu pencilan dapat menggoyang r secara dramatis.',
    ],
  },
  tryThis: {
    en: [
      'Drag points to a straight line — r approaches +1 or −1.',
      'Scatter randomly — r near 0.',
      'Add one point far from the rest — watch r jump even if the rest is unchanged.',
    ],
    id: [
      'Geser titik ke garis lurus — r mendekati +1 atau −1.',
      'Sebar acak — r dekat 0.',
      'Tambah satu titik jauh dari yang lain — amati r melompat meski yang lain tak berubah.',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'When you measure two things about each member of a group, such as the height and arm span of every student in a class, you can plot each member as one point with the first measurement along the x-axis and the second along the y-axis. This is a scatter plot, and its shape shows whether the two quantities are related. If tall students tend to have long arm spans, the cloud of points rises from left to right. The Pearson correlation coefficient r turns that impression into a single number between −1 and +1. The sign tells the direction: positive when y tends to increase with x, negative when it tends to decrease. The size tells how tightly the points hug a straight line: ±1 means they lie exactly on one, 0 means no linear tendency at all.',
        'To compute r, first find the mean of the x values and the mean of the y values; they mark the centre of the cloud. For each point, measure how far it is from the centre in x and in y and multiply the two distances. A point that is above average in both, or below average in both, gives a positive product; a point that is high in one and low in the other gives a negative product. Add the products up and divide by a scaling term so that the answer cannot exceed 1 in size: r = Σ(x − x̄)(y − ȳ) / √(Σ(x − x̄)² · Σ(y − ȳ)²). Because of that scaling, r has no units and does not change if you convert centimetres to inches or add a constant to every value. The sim also shows r², which is the fraction of the variation in y that a straight line through the cloud can account for.',
        'The sim starts with 30 points. Presets seed a positive trend, a negative trend, no relationship, or a curve; you can drag any point, click empty space to add one, and right-click to remove one, while r, r² and the best-fit line update live. The line is the least-squares regression line: of all straight lines, it is the one that makes the sum of the squared vertical distances from the points as small as possible. The coordinates are simply screen positions, which does not matter for r since it is unit-free. The colour of the r² readout is only a rough label the sim uses: green above |r| = 0.85, amber above 0.5, red below.',
        'Three warnings come with r. First, it measures only straight-line relationships: the Curve preset has a clear, strong pattern, yet r is close to zero because the points rise and then fall. Second, r is fragile. One point dragged far from the rest can swing it dramatically, as Francis Anscombe\'s famous quartet of data sets showed, so always look at the scatter plot and never trust r alone. Third, correlation is not causation: ice-cream sales and drowning deaths rise together every summer because both depend on hot weather, not because one causes the other. The sim deliberately leaves out significance tests and confidence intervals; with only a few points r can be large by pure chance.',
      ],
      id: [
        'Jika Anda mengukur dua hal pada setiap anggota suatu kelompok, misalnya tinggi badan dan rentang lengan setiap siswa di kelas, Anda bisa menggambar tiap anggota sebagai satu titik dengan pengukuran pertama pada sumbu x dan yang kedua pada sumbu y. Inilah diagram pencar, dan bentuknya menunjukkan apakah kedua besaran berhubungan. Jika siswa yang tinggi cenderung memiliki rentang lengan panjang, awan titik naik dari kiri ke kanan. Koefisien korelasi Pearson r mengubah kesan itu menjadi satu bilangan antara −1 dan +1. Tandanya menunjukkan arah: positif ketika y cenderung naik bersama x, negatif ketika cenderung turun. Besarnya menunjukkan seberapa rapat titik-titik mendekap garis lurus: ±1 berarti semuanya tepat pada satu garis, 0 berarti tidak ada kecenderungan linear sama sekali.',
        'Untuk menghitung r, pertama cari rata-rata nilai x dan rata-rata nilai y; keduanya menandai pusat awan. Untuk tiap titik, ukur jaraknya dari pusat dalam x dan dalam y, lalu kalikan kedua jarak itu. Titik yang di atas rata-rata pada keduanya, atau di bawah rata-rata pada keduanya, memberi hasil kali positif; titik yang tinggi pada satu dan rendah pada yang lain memberi hasil kali negatif. Jumlahkan semua hasil kali dan bagi dengan faktor penskalaan agar jawabannya tidak melebihi 1: r = Σ(x − x̄)(y − ȳ) / √(Σ(x − x̄)² · Σ(y − ȳ)²). Karena penskalaan itu, r tidak bersatuan dan tidak berubah jika Anda mengubah sentimeter ke inci atau menambahkan konstanta pada setiap nilai. Simulasi juga menampilkan r², yaitu bagian dari variasi y yang dapat dijelaskan oleh garis lurus melalui awan titik.',
        'Simulasi dimulai dengan 30 titik. Preset menghasilkan tren positif, tren negatif, tanpa hubungan, atau kurva; Anda bisa menggeser titik mana pun, mengklik ruang kosong untuk menambah titik, dan klik kanan untuk menghapusnya, sementara r, r², dan garis terbaik terbarui langsung. Garis itu adalah garis regresi kuadrat terkecil: dari semua garis lurus, inilah garis yang membuat jumlah kuadrat jarak vertikal dari titik-titik sekecil mungkin. Koordinatnya hanyalah posisi di layar, yang tidak berpengaruh pada r karena r tidak bersatuan. Warna pada tampilan r² hanyalah label kasar yang dipakai simulasi: hijau di atas |r| = 0,85, kuning di atas 0,5, merah di bawahnya.',
        'Ada tiga peringatan yang menyertai r. Pertama, r hanya mengukur hubungan garis lurus: preset Curve memiliki pola yang jelas dan kuat, tetapi r mendekati nol karena titik-titiknya naik lalu turun. Kedua, r rapuh. Satu titik yang digeser jauh dari yang lain dapat menggoyangnya secara dramatis, seperti ditunjukkan kuartet data terkenal dari Francis Anscombe, jadi selalu lihat diagram pencarnya dan jangan pernah memercayai r saja. Ketiga, korelasi bukan sebab-akibat: penjualan es krim dan kasus tenggelam naik bersama setiap musim panas karena keduanya bergantung pada cuaca panas, bukan karena yang satu menyebabkan yang lain. Simulasi ini sengaja tidak menyertakan uji signifikansi dan selang kepercayaan; dengan hanya beberapa titik, r bisa besar karena kebetulan semata.',
      ],
    },
    figure: {
      caption: {
        en: 'The same 12 x-values with different y-patterns. Strong positive and negative linear trends give r near ±1; a shapeless cloud gives r near 0. The arch is a clear relationship, yet r is also near 0, because r measures only straight-line association.',
        id: 'Nilai x yang sama (12 titik) dengan pola y berbeda. Tren linear positif dan negatif yang kuat memberi r dekat ±1; awan tak berbentuk memberi r dekat 0. Lengkungan adalah hubungan yang jelas, tetapi r juga dekat 0, karena r hanya mengukur keterkaitan garis lurus.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        const noise = [0.05, -0.08, 0.1, -0.04, 0.07, -0.1, 0.02, 0.09, -0.06, 0.03, -0.09, 0.06];
        const rnd = [0.7, 0.2, 0.9, 0.4, 0.1, 0.8, 0.3, 0.6, 0.95, 0.15, 0.5, 0.35];
        const panel = (x0, y0, title, color, fy) => {
          let s = `<rect x="${x0}" y="${y0}" width="150" height="86" rx="4" class="m"/><text x="${x0 + 75}" y="${y0 + 100}" text-anchor="middle" fill="${color}" font-weight="700" class="s">${title}</text>`;
          for (let i = 0; i < 12; i++) {
            const t = (i + 0.5) / 12;
            const v = Math.max(0.04, Math.min(0.96, fy(t, i)));
            s += `<circle cx="${(x0 + 8 + t * 134).toFixed(1)}" cy="${(y0 + 82 - v * 78).toFixed(1)}" r="3.2" fill="${color}"/>`;
          }
          return s;
        };
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Scatter plots with different correlation coefficients', 'Diagram pencar dengan koefisien korelasi berbeda')}">
  <style>text{font:12px system-ui,sans-serif;fill:currentColor}.s{font-size:10px}.m{fill:none;stroke:currentColor;stroke-width:1;opacity:.35}</style>
  ${panel(10, 8, 'r ≈ +0.95', '#10b981', (t, i) => t + noise[i])}
  ${panel(200, 8, 'r ≈ −0.95', '#ef4444', (t, i) => 1 - t + noise[i])}
  ${panel(10, 126, 'r ≈ 0', '#f59e0b', (t, i) => rnd[i])}
  ${panel(200, 126, L('r ≈ 0 (but related!)', 'r ≈ 0 (padahal berhubungan!)'), '#8b5cf6', (t, i) => Math.sin(t * Math.PI) * 0.9 + noise[i] * 0.4)}
  <line x1="18" y1="20" x2="152" y2="80" stroke="#10b981" stroke-width="1" stroke-dasharray="3 3" opacity=".6"/>
  <line x1="208" y1="80" x2="342" y2="20" stroke="#ef4444" stroke-width="1" stroke-dasharray="3 3" opacity=".6"/>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'The correlation coefficient r summarises a scatter plot with one number from −1 to +1: the sign gives the direction and the size gives the strength of the linear relationship.',
        'r is built from how each point sits relative to the centre of the cloud, and it has no units, so rescaling either variable leaves it unchanged.',
        'r² is the fraction of the variation in y that a straight line can account for.',
        'r measures only straight-line relationships; a curved pattern can be strong and still have r near 0.',
        'A single distant point can change r dramatically, and a strong correlation never by itself shows that one variable causes the other.',
      ],
      id: [
        'Koefisien korelasi r meringkas diagram pencar dengan satu bilangan dari −1 sampai +1: tandanya memberi arah dan besarnya memberi kekuatan hubungan linear.',
        'r dibangun dari posisi tiap titik relatif terhadap pusat awan, dan tidak bersatuan, sehingga mengubah skala salah satu variabel tidak mengubahnya.',
        'r² adalah bagian dari variasi y yang dapat dijelaskan oleh garis lurus.',
        'r hanya mengukur hubungan garis lurus; pola melengkung bisa kuat tetapi r-nya tetap dekat 0.',
        'Satu titik yang jauh dapat mengubah r secara dramatis, dan korelasi yang kuat tidak pernah dengan sendirinya menunjukkan bahwa satu variabel menyebabkan yang lain.',
      ],
    },
    vocabulary: {
      en: [
        ['Scatter plot', 'A graph in which each individual is one point, positioned by its two measured values.'],
        ['Pearson correlation coefficient (r)', 'A number from −1 to +1 measuring the direction and strength of a linear relationship between two variables.'],
        ['Positive / negative correlation', 'y tends to rise with x (r > 0), or to fall as x rises (r < 0).'],
        ['Coefficient of determination (r²)', 'The square of r; the proportion of the variation in y explained by the best-fit line.'],
        ['Least-squares line', 'The straight line that minimises the sum of the squared vertical distances from the points; the sim\'s best-fit line.'],
        ['Outlier', 'A point far from the rest of the cloud, which can have an outsized influence on r and on the line.'],
        ['Confounding variable', 'A third factor that affects both variables and so creates a correlation between them without any direct causal link.'],
      ],
      id: [
        ['Diagram pencar', 'Grafik yang tiap individunya adalah satu titik, diposisikan menurut dua nilai yang diukur.'],
        ['Koefisien korelasi Pearson (r)', 'Bilangan dari −1 sampai +1 yang mengukur arah dan kekuatan hubungan linear antara dua variabel.'],
        ['Korelasi positif / negatif', 'y cenderung naik bersama x (r > 0), atau turun saat x naik (r < 0).'],
        ['Koefisien determinasi (r²)', 'Kuadrat dari r; proporsi variasi y yang dijelaskan oleh garis terbaik.'],
        ['Garis kuadrat terkecil', 'Garis lurus yang meminimumkan jumlah kuadrat jarak vertikal dari titik-titik; garis terbaik pada simulasi.'],
        ['Pencilan', 'Titik yang jauh dari awan titik lainnya, yang dapat berpengaruh sangat besar pada r dan pada garis.'],
        ['Variabel perancu', 'Faktor ketiga yang memengaruhi kedua variabel sehingga menciptakan korelasi di antara keduanya tanpa hubungan sebab-akibat langsung.'],
      ],
    },
    misconceptions: {
      en: [
        ['A strong correlation means one variable causes the other.', 'Correlation only says the two move together. Both may be driven by a third factor, the causation may run the other way, or the match may be coincidence. Only a controlled experiment can establish cause.'],
        ['r = 0 means the variables are unrelated.', 'It means there is no straight-line tendency. The Curve preset shows a tight, obvious relationship with r near 0, because the trend rises and then falls.'],
        ['r = 0.8 is twice as strong as r = 0.4.', 'Not in terms of explained variation: r² is 0.64 versus 0.16, four times as much. The r scale is not linear in that sense.'],
        ['A steeper best-fit line means a stronger correlation.', 'Slope and correlation are different things. Points can lie perfectly on a gentle line (r = 1) or scatter widely around a steep one (small r). The slope also changes with units; r does not.'],
      ],
      id: [
        ['Korelasi yang kuat berarti satu variabel menyebabkan yang lain.', 'Korelasi hanya mengatakan keduanya bergerak bersama. Keduanya mungkin didorong faktor ketiga, sebab-akibatnya bisa berjalan sebaliknya, atau kecocokannya hanya kebetulan. Hanya eksperimen terkontrol yang dapat membuktikan sebab-akibat.'],
        ['r = 0 berarti kedua variabel tidak berhubungan.', 'Artinya tidak ada kecenderungan garis lurus. Preset Curve menunjukkan hubungan yang rapat dan jelas dengan r dekat 0, karena trennya naik lalu turun.'],
        ['r = 0,8 dua kali lebih kuat daripada r = 0,4.', 'Tidak dalam hal variasi yang dijelaskan: r² adalah 0,64 berbanding 0,16, empat kali lipat. Skala r tidak linear dalam pengertian itu.'],
        ['Garis terbaik yang lebih curam berarti korelasi lebih kuat.', 'Kemiringan dan korelasi adalah dua hal berbeda. Titik-titik bisa tepat berada pada garis yang landai (r = 1) atau tersebar luas di sekitar garis yang curam (r kecil). Kemiringan juga berubah dengan satuan; r tidak.'],
      ],
    },
    realWorld: {
      en: [
        'Doctors found a strong correlation between smoking and lung cancer long before the biological mechanism was understood; it took decades of further studies to establish causation.',
        'Weather forecasters and farmers use the correlation between sea-surface temperature patterns such as El Niño and regional rainfall to plan months ahead.',
        'Across primary-school children, shoe size correlates strongly with reading ability, not because big feet help reading but because both grow with age, a classic confounder.',
        'Investors measure correlations between assets: combining investments whose returns have low or negative correlation reduces the risk of the whole portfolio.',
      ],
      id: [
        'Dokter menemukan korelasi kuat antara merokok dan kanker paru jauh sebelum mekanisme biologisnya dipahami; dibutuhkan puluhan tahun penelitian lanjutan untuk membuktikan sebab-akibatnya.',
        'Peramal cuaca dan petani memakai korelasi antara pola suhu permukaan laut seperti El Niño dan curah hujan daerah untuk merencanakan berbulan-bulan ke depan.',
        'Pada anak-anak sekolah dasar, ukuran sepatu berkorelasi kuat dengan kemampuan membaca, bukan karena kaki besar membantu membaca, tetapi karena keduanya tumbuh seiring usia, contoh klasik variabel perancu.',
        'Investor mengukur korelasi antaraset: menggabungkan investasi yang imbal hasilnya berkorelasi rendah atau negatif mengurangi risiko keseluruhan portofolio.',
      ],
    },
    questions: {
      en: [
        { q: 'Five points lie at (1, 2), (2, 4), (3, 6), (4, 8) and (5, 10). What is r? What happens to r if every y-value is doubled, and if 10 is added to every y-value?', a: 'The points lie exactly on the line y = 2x, so r = +1. Doubling every y or adding 10 to every y moves the points but keeps them on a straight rising line, so r stays exactly +1. r depends on the pattern, not on the scale or position of the values.' },
        { q: 'A data set has r = 0.60. What proportion of the variation in y is explained by the best-fit line, and what would r = −0.60 mean?', a: 'r² = 0.36, so 36% of the variation in y is accounted for by the straight-line relationship with x, and 64% is not. r = −0.60 has exactly the same strength (r² = 0.36) but the opposite direction: y tends to decrease as x increases.' },
        { q: 'In the sim, load the Positive preset (r around 0.9) and then add a single point in the far top-left corner. Predict what happens to r and explain why.', a: 'r drops sharply, often below 0.6. The new point is far above average in y but far below average in x, so its product of deviations is large and negative, and because it is so far from the centre it outweighs many ordinary points. This fragility is why the scatter plot must always be inspected alongside r.' },
      ],
      id: [
        { q: 'Lima titik berada di (1, 2), (2, 4), (3, 6), (4, 8), dan (5, 10). Berapa r? Apa yang terjadi pada r jika setiap nilai y digandakan, dan jika setiap nilai y ditambah 10?', a: 'Titik-titik itu tepat berada pada garis y = 2x, sehingga r = +1. Menggandakan setiap y atau menambah 10 pada setiap y memindahkan titik tetapi tetap menjaganya pada garis lurus yang naik, sehingga r tetap persis +1. r bergantung pada polanya, bukan pada skala atau posisi nilai.' },
        { q: 'Suatu data memiliki r = 0,60. Berapa proporsi variasi y yang dijelaskan garis terbaik, dan apa arti r = −0,60?', a: 'r² = 0,36, sehingga 36% variasi y dijelaskan oleh hubungan garis lurus dengan x, dan 64% tidak. r = −0,60 memiliki kekuatan yang persis sama (r² = 0,36) tetapi arah berlawanan: y cenderung turun saat x naik.' },
        { q: 'Dalam simulasi, muat preset Positive (r sekitar 0,9) lalu tambahkan satu titik di pojok kiri atas yang jauh. Prediksikan apa yang terjadi pada r dan jelaskan mengapa.', a: 'r turun tajam, sering sampai di bawah 0,6. Titik baru itu jauh di atas rata-rata dalam y tetapi jauh di bawah rata-rata dalam x, sehingga hasil kali simpangannya besar dan negatif, dan karena sangat jauh dari pusat ia mengalahkan banyak titik biasa. Kerapuhan inilah alasan diagram pencar harus selalu diperiksa bersama r.' },
      ],
    },
  },
};
