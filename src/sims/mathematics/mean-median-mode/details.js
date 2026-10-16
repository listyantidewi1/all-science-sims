// Long-form text for the sim page aside, kept out of manifest.js.
export default {
  objectives: {
    en: [
      'Calculate the mean, median, mode and range of a small data set and read them off a dot plot.',
      'Explain why the mean is the balance point of the data and how an outlier pulls it, while the median and mode barely move.',
      'Compare two data sets using their centres and their spread, and choose the most suitable measure of centre.',
    ],
    id: [
      'Menghitung rerata, median, modus, dan jangkauan kumpulan data kecil serta membacanya dari diagram titik.',
      'Menjelaskan mengapa rerata adalah titik seimbang data dan bagaimana pencilan menariknya, sementara median dan modus hampir tidak bergerak.',
      'Membandingkan dua kumpulan data berdasarkan ukuran pemusatan dan sebarannya, serta memilih ukuran pemusatan yang paling sesuai.',
    ],
  },
  tryThis: {
    en: [
      'Load the "Quiz scores" data set. Before you look, predict the mean and median, then compare with the readout.',
      'Press "Add outlier". How far did the mean move? How far did the median move? Press it two more times.',
      'Drag one dot far to the left and watch the seesaw fulcrum follow it. Then drag the same dot back to where the median line is: does the median change?',
      'Turn on "Compare two groups" and load "Two classes". Both have the same mean, so which measure tells them apart?',
    ],
    id: [
      'Muat data "Nilai kuis". Sebelum melihat, tebak rerata dan mediannya, lalu bandingkan dengan tampilan.',
      'Tekan "Tambah pencilan". Seberapa jauh rerata bergeser? Seberapa jauh median bergeser? Tekan dua kali lagi.',
      'Seret satu titik jauh ke kiri dan amati penyangga jungkat-jungkit mengikutinya. Lalu seret titik yang sama kembali ke garis median: apakah mediannya berubah?',
      'Nyalakan "Bandingkan dua kelompok" dan muat "Dua kelas". Keduanya memiliki rerata yang sama, jadi ukuran mana yang membedakannya?',
    ],
  },

  learn: {
    background: {
      en: [
        'A dot plot shows every value in a data set as a dot above a number line; equal values stack up. From the plot you can read three different "middles". The mode is the value that appears most often: the tallest stack. The median is the middle value once the data are sorted: half the dots lie to its left and half to its right (with an even number of dots, the median is halfway between the two middle dots). The mean is the sum of all the values divided by how many there are, n.',
        'The mean has a physical meaning: if the number line were a seesaw and every dot weighed the same, the mean is exactly where you would put the fulcrum to make it balance. That is why the sim draws a triangle under the beam at the mean. Dots far from the fulcrum have a long lever arm, so one dot far out on one side can balance many dots close in on the other side. This is also why the mean is sensitive to outliers: an extreme value drags the balance point towards it, while the median only cares about the order of the values and the mode only about repeats.',
        'The range is the simplest measure of spread: the largest value minus the smallest. Like the mean, it is strongly affected by a single outlier. When you add an outlier in the sim, the panel reports how far each measure moved since the last change, so you can see the mean and range jump while the median and mode stay put or move by at most one position.',
        'Comparing two groups needs both a centre and a spread. Two classes can have the same mean but very different ranges; the one with the smaller range is more consistent. Choose the measure that fits the question: the mean uses every value and works well for roughly symmetric data; the median is better when the data are skewed or contain outliers (house prices, incomes); the mode is the only choice for categories (favourite colour) and is useful when you want the most common value (shoe size to stock).',
      ],
      id: [
        'Diagram titik menampilkan setiap nilai dalam kumpulan data sebagai titik di atas garis bilangan; nilai yang sama ditumpuk. Dari diagram ini kamu dapat membaca tiga macam "tengah". Modus adalah nilai yang paling sering muncul: tumpukan tertinggi. Median adalah nilai tengah setelah data diurutkan: separuh titik berada di kirinya dan separuh di kanannya (jika banyak data genap, median adalah titik tengah antara dua data di tengah). Rerata (mean) adalah jumlah semua nilai dibagi banyaknya data, n.',
        'Rerata memiliki makna fisik: jika garis bilangan adalah jungkat-jungkit dan setiap titik sama beratnya, rerata adalah tepat tempat kamu harus meletakkan penyangga agar seimbang. Itulah sebabnya simulasi menggambar segitiga di bawah papan pada posisi rerata. Titik yang jauh dari penyangga memiliki lengan yang panjang, sehingga satu titik yang jauh di satu sisi dapat mengimbangi banyak titik yang dekat di sisi lain. Ini juga alasan rerata peka terhadap pencilan: nilai ekstrem menarik titik seimbang ke arahnya, sedangkan median hanya peduli pada urutan nilai dan modus hanya pada pengulangan.',
        'Jangkauan adalah ukuran penyebaran paling sederhana: nilai terbesar dikurangi nilai terkecil. Seperti rerata, jangkauan sangat dipengaruhi oleh satu pencilan. Saat kamu menambahkan pencilan di simulasi, panel melaporkan seberapa jauh setiap ukuran bergeser sejak perubahan terakhir, sehingga kamu dapat melihat rerata dan jangkauan melonjak sementara median dan modus tetap atau hanya bergeser paling banyak satu posisi.',
        'Membandingkan dua kelompok memerlukan ukuran pemusatan dan ukuran penyebaran. Dua kelas dapat memiliki rerata yang sama tetapi jangkauan yang sangat berbeda; kelas dengan jangkauan lebih kecil lebih konsisten. Pilih ukuran yang sesuai dengan pertanyaan: rerata memakai semua nilai dan cocok untuk data yang kira-kira simetris; median lebih baik jika data miring atau mengandung pencilan (harga rumah, pendapatan); modus adalah satu-satunya pilihan untuk data kategori (warna kesukaan) dan berguna jika kamu ingin nilai yang paling umum (ukuran sepatu yang harus distok).',
      ],
    },
    figure: {
      caption: {
        en: 'A dot plot of 9 values. The mode is the tallest stack (12), the median is the 5th dot in order (12), and the mean (13.2) is the balance point of the seesaw. The single value at 22 pulls the mean to the right of the median.',
        id: 'Diagram titik dari 9 nilai. Modus adalah tumpukan tertinggi (12), median adalah titik ke-5 dalam urutan (12), dan rerata (13,2) adalah titik seimbang jungkat-jungkit. Satu nilai di 22 menarik rerata ke kanan median.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        // values: 9, 10, 12, 12, 12, 13, 14, 15, 22 → sum 119, mean 13.2 ≈ 13 (drawn at 13.2)
        const x = (v) => 30 + (v - 5) * 15;
        const dots = [[9, 0], [10, 0], [12, 0], [12, 1], [12, 2], [13, 0], [14, 0], [15, 0], [22, 0]];
        const circles = dots.map(([v, k]) => `<circle cx="${x(v)}" cy="${150 - 16 - k * 16}" r="7" fill="${v === 12 ? '#f59e0b' : '#38bdf8'}"/>`).join('');
        const ticks = [5, 10, 15, 20, 25].map((v) => `<line x1="${x(v)}" y1="150" x2="${x(v)}" y2="156" stroke="currentColor"/><text x="${x(v)}" y="170" text-anchor="middle">${v}</text>`).join('');
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Dot plot with mode, median and mean marked', 'Diagram titik dengan modus, median, dan rerata ditandai')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.s{font:10px system-ui,sans-serif}</style>
  <line x1="20" y1="150" x2="340" y2="150" stroke="currentColor" stroke-width="1.5"/>
  ${ticks}
  ${circles}
  <polygon points="${x(13.2)},162 ${x(13.2) - 9},178 ${x(13.2) + 9},178" fill="#ef4444"/>
  <text x="${x(13.2)}" y="192" text-anchor="middle" fill="#ef4444" class="s">${L('mean 13.2 = balance point', 'rerata 13,2 = titik seimbang')}</text>
  <line x1="${x(12)}" y1="60" x2="${x(12)}" y2="150" stroke="#a78bfa" stroke-width="2" stroke-dasharray="4 3"/>
  <text x="${x(12) - 6}" y="56" text-anchor="end" fill="#a78bfa" class="s">${L('median 12 (5th of 9)', 'median 12 (ke-5 dari 9)')}</text>
  <text x="${x(12) + 12}" y="92" fill="#f59e0b" class="s">${L('mode 12 (appears 3×)', 'modus 12 (muncul 3×)')}</text>
  <text x="${x(22)}" y="118" text-anchor="middle" fill="#38bdf8" class="s">${L('outlier', 'pencilan')}</text>
  <path d="M${x(9)} 214 L${x(22)} 214" stroke="currentColor" stroke-width="1"/>
  <path d="M${x(9)} 208 L${x(9)} 220 M${x(22)} 208 L${x(22)} 220" stroke="currentColor" stroke-width="1"/>
  <text x="${(x(9) + x(22)) / 2}" y="234" text-anchor="middle" class="s">${L('range = 22 − 9 = 13', 'jangkauan = 22 − 9 = 13')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Mean = sum of values ÷ n; it is the balance point of the dot plot.',
        'Median = the middle value of the sorted data; for even n, the average of the two middle values.',
        'Mode = the most frequent value; a data set can have no mode, one mode or several modes.',
        'Range = largest − smallest; it measures spread, not centre.',
        'An outlier moves the mean and the range a lot, but the median and mode very little.',
        'To compare two groups, compare a measure of centre and a measure of spread together.',
      ],
      id: [
        'Rerata = jumlah nilai ÷ n; rerata adalah titik seimbang diagram titik.',
        'Median = nilai tengah data terurut; untuk n genap, rata-rata dua nilai tengah.',
        'Modus = nilai yang paling sering muncul; data bisa tidak bermodus, bermodus satu, atau bermodus lebih dari satu.',
        'Jangkauan = nilai terbesar − nilai terkecil; mengukur penyebaran, bukan pemusatan.',
        'Pencilan menggeser rerata dan jangkauan dengan besar, tetapi median dan modus hanya sedikit.',
        'Untuk membandingkan dua kelompok, bandingkan ukuran pemusatan dan ukuran penyebaran bersama-sama.',
      ],
    },
    vocabulary: {
      en: [
        ['Mean (rerata)', 'The sum of all values divided by the number of values, n.'],
        ['Median', 'The middle value when the data are arranged in order.'],
        ['Mode (modus)', 'The value that occurs most often.'],
        ['Range (jangkauan)', 'The difference between the largest and the smallest value.'],
        ['Outlier (pencilan)', 'A value that lies far away from the rest of the data.'],
        ['Dot plot', 'A graph with one dot per data value above a number line, stacking equal values.'],
      ],
      id: [
        ['Rerata (mean)', 'Jumlah semua nilai dibagi banyaknya nilai, n.'],
        ['Median', 'Nilai tengah ketika data disusun berurutan.'],
        ['Modus', 'Nilai yang paling sering muncul.'],
        ['Jangkauan', 'Selisih antara nilai terbesar dan nilai terkecil.'],
        ['Pencilan', 'Nilai yang letaknya jauh dari data lainnya.'],
        ['Diagram titik', 'Grafik dengan satu titik untuk setiap nilai data di atas garis bilangan, nilai yang sama ditumpuk.'],
      ],
    },
    misconceptions: {
      en: [
        ['The median is the value in the middle of the number line, halfway between the smallest and the largest.', 'That is the midrange, not the median. The median is the middle dot when you count the dots in order. In the sim, drag the top dot far right: the midrange moves but the median does not.'],
        ['The mean must be one of the data values.', 'Not necessarily. The mean of 2, 3 and 6 is 11/3 ≈ 3.67, which is not in the list. The fulcrum can sit between dots.'],
        ['Adding a value above the mean always raises the median as well.', 'The median only moves if the new value changes which dot is in the middle, and then by at most one position. Adding 30 to the "Quiz scores" set moves the mean by about 1 but the median by only half a step.'],
        ['The mode is the biggest value.', 'The mode is the most common value, the tallest stack, which can be anywhere on the number line.'],
      ],
      id: [
        ['Median adalah nilai di tengah garis bilangan, di antara nilai terkecil dan terbesar.', 'Itu adalah titik tengah jangkauan, bukan median. Median adalah titik tengah ketika titik dihitung berurutan. Di simulasi, seret titik paling atas jauh ke kanan: titik tengah jangkauan berubah tetapi median tidak.'],
        ['Rerata harus merupakan salah satu nilai data.', 'Tidak selalu. Rerata dari 2, 3, dan 6 adalah 11/3 ≈ 3,67, yang tidak ada dalam daftar. Penyangga dapat berada di antara titik-titik.'],
        ['Menambahkan nilai di atas rerata selalu menaikkan median juga.', 'Median hanya bergeser jika nilai baru mengubah titik mana yang di tengah, dan paling banyak satu posisi. Menambahkan 30 ke data "Nilai kuis" menggeser rerata sekitar 1 tetapi median hanya setengah langkah.'],
        ['Modus adalah nilai terbesar.', 'Modus adalah nilai yang paling umum, tumpukan tertinggi, yang bisa berada di mana saja pada garis bilangan.'],
      ],
    },
    realWorld: {
      en: [
        'News reports quote the median house price or median income, because a few very rich households would drag the mean far above what a typical family experiences.',
        'A shoe shop stocks most pairs in the modal size, the one that sells most often, not in the mean size.',
        'Teachers compare two classes on the same test by looking at the mean or median score together with the range.',
        'Weather services report mean monthly temperature, but use the range (hottest minus coldest) to describe how variable a month was.',
        'Sports commentators use the mean (batting or scoring average) but also talk about consistency, which is about spread.',
      ],
      id: [
        'Berita mengutip harga rumah median atau pendapatan median, karena beberapa rumah tangga yang sangat kaya akan menarik rerata jauh di atas yang dialami keluarga biasa.',
        'Toko sepatu menyediakan paling banyak pasangan pada ukuran modus, ukuran yang paling sering terjual, bukan pada ukuran rerata.',
        'Guru membandingkan dua kelas pada tes yang sama dengan melihat rerata atau median nilai bersama jangkauannya.',
        'Layanan cuaca melaporkan suhu rerata bulanan, tetapi memakai jangkauan (terpanas dikurangi terdingin) untuk menggambarkan seberapa bervariasi bulan itu.',
        'Komentator olahraga memakai rerata (rata-rata skor) tetapi juga membicarakan konsistensi, yang berkaitan dengan penyebaran.',
      ],
    },
    questions: {
      en: [
        { q: 'The data are 4, 7, 7, 9, 13. Find the mean, median, mode and range.', a: 'Mean = 40/5 = 8; median = 7 (the 3rd of 5); mode = 7; range = 13 − 4 = 9.' },
        { q: 'A sixth value, 32, is added to the set above. What happens to each measure?', a: 'Mean becomes 72/6 = 12 (up by 4); median becomes (7 + 9)/2 = 8 (up by 1); mode stays 7; range becomes 32 − 4 = 28.' },
        { q: 'Two classes both have a mean score of 16.7. Class A has range 9 and class B has range 16. What can you say about them?', a: 'They are centred in the same place, but class B is more spread out: some students scored much higher and some much lower than in class A. Class A is more consistent.' },
        { q: 'Why does the sim draw the mean as a fulcrum under a seesaw?', a: 'Because the mean is the point where the total "pull" of the dots to the left equals the total pull of the dots to the right. Each dot pulls by its distance from the fulcrum, so a far-away outlier has a big effect.' },
      ],
      id: [
        { q: 'Data: 4, 7, 7, 9, 13. Tentukan rerata, median, modus, dan jangkauan.', a: 'Rerata = 40/5 = 8; median = 7 (data ke-3 dari 5); modus = 7; jangkauan = 13 − 4 = 9.' },
        { q: 'Nilai keenam, 32, ditambahkan ke data di atas. Apa yang terjadi pada setiap ukuran?', a: 'Rerata menjadi 72/6 = 12 (naik 4); median menjadi (7 + 9)/2 = 8 (naik 1); modus tetap 7; jangkauan menjadi 32 − 4 = 28.' },
        { q: 'Dua kelas memiliki rerata nilai yang sama, 16,7. Kelas A berjangkauan 9 dan kelas B berjangkauan 16. Apa yang dapat kamu katakan?', a: 'Keduanya berpusat di tempat yang sama, tetapi kelas B lebih tersebar: ada siswa yang nilainya jauh lebih tinggi dan ada yang jauh lebih rendah daripada di kelas A. Kelas A lebih konsisten.' },
        { q: 'Mengapa simulasi menggambar rerata sebagai penyangga di bawah jungkat-jungkit?', a: 'Karena rerata adalah titik tempat total "tarikan" titik-titik di kiri sama dengan total tarikan titik-titik di kanan. Setiap titik menarik sebesar jaraknya dari penyangga, sehingga pencilan yang jauh berpengaruh besar.' },
      ],
    },
  },
};
