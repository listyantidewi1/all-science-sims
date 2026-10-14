// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Compute the 5-number summary: min, Q1, median, Q3, max.',
      'Read the IQR (Q3 − Q1) and the 1.5×IQR outlier rule.',
      'See how box plots compress a distribution into a quick visual summary.',
    ],
    id: [
      'Menghitung ringkasan 5-angka: min, Q1, median, Q3, max.',
      'Membaca IQR (Q3 − Q1) dan aturan pencilan 1,5×IQR.',
      'Memahami bagaimana plot kotak meringkas distribusi menjadi visual cepat.',
    ],
  },
  tryThis: {
    en: [
      'Symmetric data — box is centered, whiskers equal length.',
      'Skewed data — median sits left or right of center, whiskers asymmetric.',
      'Add an outlier — it sticks out as a dot beyond the whisker.',
    ],
    id: [
      'Data simetris — kotak terpusat, kumis sama panjang.',
      'Data condong — median di kiri/kanan tengah, kumis tak simetris.',
      'Tambah pencilan — muncul sebagai titik di luar kumis.',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'A long list of numbers is hard to take in at a glance, so statisticians summarise it. Sort the values from smallest to largest. The middle value is the median: half the data lie below it and half above. Now find the middle of the lower half, called the first quartile Q1, and the middle of the upper half, the third quartile Q3. Together with the minimum and maximum these make the five-number summary. Five numbers tell you where the centre is, how spread out the data are, and whether they lean to one side.',
        'The box plot, introduced by the statistician John Tukey in the 1970s, draws these five numbers. The box runs from Q1 to Q3, so it contains the middle half of the data, and its length is the interquartile range, IQR = Q3 − Q1. The line inside the box is the median. The whiskers reach out to the smallest and largest values that are not outliers. By the usual rule a value is an outlier if it lies more than 1.5 × IQR below Q1 or above Q3; such values are drawn as separate dots. The sim lets you change the 1.5 multiplier, which shows that the rule is a sensible convention rather than a law: a smaller multiplier flags more points, a larger one flags fewer.',
        'Type numbers into the box or pick a preset, and the plot, the dot plot underneath and the statistics panel update at once. The purple cross marks the mean, so you can compare it with the median: in the Skewed preset a few large values drag the mean well above the median, while the median barely moves. To find the quartiles the sim walks a quarter, a half and three quarters of the way along the sorted list, averaging two neighbours when the position falls between them. Many textbooks instead take the median of each half, which can give slightly different quartiles for the same data; both are accepted methods, so check which one your course uses.',
        'A box plot is a summary, and summaries hide things. The Bimodal preset has two separate clusters, yet its box plot looks like a single wide box; only the dot plot reveals the gap, which is why the sim shows both. The dots are jittered up and down at random so that equal values do not hide each other; their vertical position carries no information. Finally, an outlier is just a value that is far from the rest, not necessarily a mistake: it may be a typing error, or the most interesting measurement in the whole set.',
      ],
      id: [
        'Daftar bilangan yang panjang sulit dipahami sekilas, karena itu ahli statistik meringkasnya. Urutkan nilai dari terkecil ke terbesar. Nilai tengahnya adalah median: separuh data berada di bawahnya dan separuh di atasnya. Lalu cari nilai tengah dari separuh bawah, yang disebut kuartil pertama Q1, dan nilai tengah dari separuh atas, kuartil ketiga Q3. Bersama nilai minimum dan maksimum, kelimanya membentuk ringkasan lima angka. Lima angka ini memberi tahu di mana pusatnya, seberapa menyebar datanya, dan apakah data condong ke satu sisi.',
        'Plot kotak, yang diperkenalkan ahli statistik John Tukey pada tahun 1970-an, menggambar kelima angka itu. Kotaknya membentang dari Q1 sampai Q3, sehingga berisi separuh tengah data, dan panjangnya adalah jangkauan antarkuartil, IQR = Q3 − Q1. Garis di dalam kotak adalah median. Kumisnya menjulur ke nilai terkecil dan terbesar yang bukan pencilan. Menurut aturan yang lazim, suatu nilai disebut pencilan jika berada lebih dari 1,5 × IQR di bawah Q1 atau di atas Q3; nilai seperti itu digambar sebagai titik terpisah. Simulasi ini membolehkan Anda mengubah pengali 1,5, yang menunjukkan bahwa aturan itu adalah kesepakatan yang masuk akal, bukan hukum: pengali lebih kecil menandai lebih banyak titik, pengali lebih besar menandai lebih sedikit.',
        'Ketik bilangan ke dalam kotak atau pilih preset, dan plot, plot titik di bawahnya, serta panel statistik langsung terbarui. Tanda silang ungu menandai rata-rata, sehingga Anda bisa membandingkannya dengan median: pada preset Skewed beberapa nilai besar menarik rata-rata jauh di atas median, sementara median hampir tidak bergeser. Untuk menemukan kuartil, simulasi menelusuri seperempat, separuh, dan tiga perempat jalan sepanjang daftar terurut, dan merata-ratakan dua tetangga ketika posisinya jatuh di antara keduanya. Banyak buku pelajaran justru mengambil median tiap separuh, yang bisa memberi kuartil sedikit berbeda untuk data yang sama; keduanya metode yang diterima, jadi periksalah metode mana yang dipakai di kelas Anda.',
        'Plot kotak adalah ringkasan, dan ringkasan menyembunyikan sesuatu. Preset Bimodal memiliki dua kelompok terpisah, tetapi plot kotaknya tampak seperti satu kotak lebar; hanya plot titik yang memperlihatkan celahnya, dan karena itulah simulasi menampilkan keduanya. Titik-titik digoyang naik-turun secara acak agar nilai yang sama tidak saling menutupi; posisi vertikalnya tidak membawa informasi. Terakhir, pencilan hanyalah nilai yang jauh dari yang lain, bukan berarti pasti kesalahan: bisa jadi salah ketik, atau justru pengukuran paling menarik dalam seluruh data.',
      ],
    },
    figure: {
      caption: {
        en: 'A box plot and the sorted data it summarises. The box spans Q1 to Q3 (the middle half, length IQR), the line is the median, whiskers reach the furthest values inside the fences at 1.5 × IQR from the box, and a value beyond a fence is drawn as an outlier dot.',
        id: 'Plot kotak dan data terurut yang diringkasnya. Kotak membentang dari Q1 sampai Q3 (separuh tengah, panjang IQR), garisnya median, kumis mencapai nilai terjauh di dalam pagar 1,5 × IQR dari kotak, dan nilai di luar pagar digambar sebagai titik pencilan.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        const x = (v) => 30 + v * 3;
        const data = [22, 27, 31, 36, 40, 43, 46, 48, 52, 55, 58, 63, 70, 82, 96];
        const dots = data.map((v) => `<circle cx="${x(v)}" cy="60" r="4" fill="${v > 90 ? '#ef4444' : 'currentColor'}" opacity="${v > 90 ? 1 : 0.55}"/>`).join('');
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Box plot with its five-number summary and an outlier', 'Plot kotak dengan ringkasan lima angka dan sebuah pencilan')}">
  <style>text{font:12px system-ui,sans-serif;fill:currentColor}.s{font-size:10px}.ax{stroke:currentColor;stroke-width:1;opacity:.5}.bx{stroke:#3b82f6;stroke-width:2;fill:#3b82f6;fill-opacity:.2}.w{stroke:#3b82f6;stroke-width:2}.f{stroke:#ef4444;stroke-width:1;stroke-dasharray:4 3;opacity:.8}</style>
  <text x="30" y="20" font-weight="700">${L('Sorted data (n = 15)', 'Data terurut (n = 15)')}</text>
  <text x="30" y="40" class="s" opacity=".7">${L('each dot is one value', 'tiap titik satu nilai')}</text>
  ${dots}
  <text x="${x(96)}" y="48" text-anchor="middle" fill="#ef4444" class="s">${L('outlier', 'pencilan')}</text>
  <line x1="${x(40)}" y1="104" x2="${x(60)}" y2="104" class="w"/>
  <line x1="${x(22)}" y1="124" x2="${x(40)}" y2="124" class="w"/>
  <line x1="${x(22)}" y1="114" x2="${x(22)}" y2="134" class="w"/>
  <line x1="${x(60)}" y1="124" x2="${x(82)}" y2="124" class="w"/>
  <line x1="${x(82)}" y1="114" x2="${x(82)}" y2="134" class="w"/>
  <rect x="${x(40)}" y="104" width="${x(60) - x(40)}" height="40" class="bx"/>
  <line x1="${x(48)}" y1="104" x2="${x(48)}" y2="144" stroke="#f59e0b" stroke-width="3"/>
  <circle cx="${x(96)}" cy="124" r="5" fill="#ef4444"/>
  <line x1="${x(10)}" y1="96" x2="${x(10)}" y2="152" class="f"/>
  <line x1="${x(90)}" y1="96" x2="${x(90)}" y2="152" class="f"/>
  <text x="${x(10)}" y="92" text-anchor="middle" fill="#ef4444" class="s">Q1 − 1.5·IQR</text>
  <text x="${x(90)}" y="92" text-anchor="middle" fill="#ef4444" class="s">Q3 + 1.5·IQR</text>
  <line x1="30" y1="160" x2="340" y2="160" class="ax"/>
  ${[0, 20, 40, 60, 80, 100].map((v) => `<line x1="${x(v)}" y1="160" x2="${x(v)}" y2="165" class="ax"/><text x="${x(v)}" y="177" text-anchor="middle" class="s" opacity=".7">${v}</text>`).join('')}
  <text x="${x(22)}" y="196" text-anchor="middle" class="s">min</text>
  <text x="${x(22)}" y="208" text-anchor="middle" class="s" font-weight="700">22</text>
  <text x="${x(40)}" y="196" text-anchor="middle" fill="#3b82f6" class="s">Q1</text>
  <text x="${x(40)}" y="208" text-anchor="middle" fill="#3b82f6" class="s" font-weight="700">40</text>
  <text x="${x(48)}" y="196" text-anchor="middle" fill="#f59e0b" class="s">${L('median', 'median')}</text>
  <text x="${x(48)}" y="208" text-anchor="middle" fill="#f59e0b" class="s" font-weight="700">48</text>
  <text x="${x(60)}" y="196" text-anchor="middle" fill="#3b82f6" class="s">Q3</text>
  <text x="${x(60)}" y="208" text-anchor="middle" fill="#3b82f6" class="s" font-weight="700">60</text>
  <text x="${x(82)}" y="196" text-anchor="middle" class="s">${L('whisker end', 'ujung kumis')}</text>
  <text x="${x(82)}" y="208" text-anchor="middle" class="s" font-weight="700">82</text>
  <text x="30" y="232" class="s">${L('IQR = Q3 − Q1 = 20, so the fences are at 40 − 30 = 10 and 60 + 30 = 90; 96 lies outside.', 'IQR = Q3 − Q1 = 20, sehingga pagarnya di 40 − 30 = 10 dan 60 + 30 = 90; 96 berada di luar.')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'The five-number summary (minimum, Q1, median, Q3, maximum) describes the centre, spread and skew of a data set with just five values.',
        'The box holds the middle half of the data; its length, the IQR, is a measure of spread that outliers cannot distort.',
        'A value more than 1.5 × IQR beyond the box is called an outlier and plotted as a separate dot; the whiskers stop at the furthest non-outlier.',
        'The median is resistant to extreme values, while the mean is pulled toward them, so comparing the two reveals skew.',
        'A box plot hides the shape inside the box, such as two separate clusters, so look at the raw dots as well.',
      ],
      id: [
        'Ringkasan lima angka (minimum, Q1, median, Q3, maksimum) menggambarkan pusat, sebaran, dan kecondongan data hanya dengan lima nilai.',
        'Kotak berisi separuh tengah data; panjangnya, IQR, adalah ukuran sebaran yang tidak bisa diganggu pencilan.',
        'Nilai yang lebih dari 1,5 × IQR di luar kotak disebut pencilan dan digambar sebagai titik terpisah; kumis berhenti di nilai bukan-pencilan yang terjauh.',
        'Median tahan terhadap nilai ekstrem, sedangkan rata-rata tertarik ke arahnya, sehingga membandingkan keduanya memperlihatkan kecondongan.',
        'Plot kotak menyembunyikan bentuk di dalam kotak, misalnya dua kelompok terpisah, jadi perhatikan juga titik-titik data mentahnya.',
      ],
    },
    vocabulary: {
      en: [
        ['Median', 'The middle value of the sorted data; half the values are below it and half above.'],
        ['Quartiles (Q1, Q3)', 'The values one quarter and three quarters of the way through the sorted data; they enclose the middle half.'],
        ['Interquartile range (IQR)', 'Q3 − Q1, the length of the box; a measure of spread based on the middle half of the data.'],
        ['Whisker', 'The line from the box out to the smallest or largest value that is not an outlier.'],
        ['Outlier', 'A value more than 1.5 × IQR (or the chosen multiplier) below Q1 or above Q3.'],
        ['Fence', 'The cut-off at Q1 − 1.5 × IQR or Q3 + 1.5 × IQR beyond which values count as outliers.'],
        ['Skewed', 'A distribution with a longer tail on one side, which shows as unequal whiskers and a median off-centre in the box.'],
      ],
      id: [
        ['Median', 'Nilai tengah dari data terurut; separuh nilai berada di bawahnya dan separuh di atasnya.'],
        ['Kuartil (Q1, Q3)', 'Nilai pada seperempat dan tiga perempat jalan dalam data terurut; keduanya mengurung separuh tengah.'],
        ['Jangkauan antarkuartil (IQR)', 'Q3 − Q1, panjang kotak; ukuran sebaran berdasarkan separuh tengah data.'],
        ['Kumis', 'Garis dari kotak ke nilai terkecil atau terbesar yang bukan pencilan.'],
        ['Pencilan', 'Nilai yang lebih dari 1,5 × IQR (atau pengali yang dipilih) di bawah Q1 atau di atas Q3.'],
        ['Pagar', 'Batas pada Q1 − 1,5 × IQR atau Q3 + 1,5 × IQR; nilai di luarnya dihitung sebagai pencilan.'],
        ['Condong (skewed)', 'Distribusi dengan ekor lebih panjang di satu sisi, yang tampak sebagai kumis tak sama panjang dan median tidak di tengah kotak.'],
      ],
    },
    misconceptions: {
      en: [
        ['The whiskers always go to the minimum and maximum.', 'Only when there are no outliers. Otherwise each whisker stops at the most extreme value inside the fence, and the outliers are drawn as separate dots beyond it.'],
        ['A longer part of the box contains more data.', 'Each quarter of the box plot (whisker, half-box, half-box, whisker) holds about a quarter of the data. A long section means those values are spread out, not that there are more of them.'],
        ['An outlier is a wrong measurement that should be deleted.', 'The 1.5 × IQR rule only flags values that are unusually far from the rest. Some are errors, but many are real and important; investigate before removing anything.'],
        ['The median line is the average.', 'The median is the middle value; the mean is the arithmetic average, shown in the sim as a purple cross. They coincide only for roughly symmetric data.'],
      ],
      id: [
        ['Kumis selalu menjulur ke nilai minimum dan maksimum.', 'Hanya jika tidak ada pencilan. Jika ada, tiap kumis berhenti di nilai paling ekstrem di dalam pagar, dan pencilan digambar sebagai titik terpisah di luarnya.'],
        ['Bagian kotak yang lebih panjang berisi lebih banyak data.', 'Tiap perempat dari plot kotak (kumis, setengah kotak, setengah kotak, kumis) berisi sekitar seperempat data. Bagian yang panjang berarti nilainya tersebar, bukan jumlahnya lebih banyak.'],
        ['Pencilan adalah pengukuran yang salah dan harus dihapus.', 'Aturan 1,5 × IQR hanya menandai nilai yang luar biasa jauh dari yang lain. Sebagian memang kesalahan, tetapi banyak yang nyata dan penting; selidiki dulu sebelum menghapus apa pun.'],
        ['Garis median adalah rata-rata.', 'Median adalah nilai tengah; rata-rata adalah hasil pembagian jumlah dengan banyaknya data, ditampilkan di simulasi sebagai tanda silang ungu. Keduanya berimpit hanya untuk data yang kira-kira simetris.'],
      ],
    },
    realWorld: {
      en: [
        'Teachers compare test results of several classes with side-by-side box plots: the medians show which class scored higher, the boxes show which was more consistent.',
        'Weather services report temperature or rainfall as box plots by month, so a record-breaking day appears as an outlier dot.',
        'Doctors use percentile charts, which are quartiles and other percentiles of children\'s heights and weights, to check whether a child is growing typically.',
        'Quality inspectors in factories track part dimensions with box plots; a widening box or new outliers warn that a machine is drifting.',
      ],
      id: [
        'Guru membandingkan hasil ulangan beberapa kelas dengan plot kotak berdampingan: median menunjukkan kelas mana yang nilainya lebih tinggi, kotak menunjukkan kelas mana yang lebih konsisten.',
        'Badan meteorologi melaporkan suhu atau curah hujan sebagai plot kotak per bulan, sehingga hari yang memecahkan rekor tampak sebagai titik pencilan.',
        'Dokter memakai grafik persentil, yaitu kuartil dan persentil lain dari tinggi dan berat badan anak, untuk memeriksa apakah seorang anak tumbuh normal.',
        'Pemeriksa mutu di pabrik memantau ukuran komponen dengan plot kotak; kotak yang melebar atau pencilan baru memperingatkan bahwa mesin mulai menyimpang.',
      ],
    },
    questions: {
      en: [
        { q: 'Find the five-number summary and IQR of 3, 5, 6, 8, 9, 11, 12, 15, 20. Is 20 an outlier by the 1.5 × IQR rule?', a: 'The data are already sorted and n = 9. Median = 9 (the 5th value). Q1 = 6 and Q3 = 12 (a quarter and three quarters of the way along, which here land exactly on the 3rd and 7th values). Min = 3, max = 20, IQR = 12 − 6 = 6. Upper fence = 12 + 1.5 × 6 = 21, so 20 is inside the fence and is not an outlier; the upper whisker reaches 20.' },
        { q: 'Load the "With outliers" preset. Which values are flagged, and why does the mean differ from the median?', a: 'Q1 = 53.5, median = 57, Q3 = 60.5, so IQR = 7 and the upper fence is 60.5 + 10.5 = 71. The values 100 and 110 lie beyond it and are flagged; the upper whisker stops at 62. The mean is about 62.5, well above the median 57, because the two large values add a lot to the total but only count as two of the fifteen positions when finding the middle.' },
        { q: 'With the "Skewed" preset, slide the IQR multiplier from 1.5 up to 3. What happens to the outlier, and what does that tell you about the rule?', a: 'At 1.5 the fence is 31.5 + 1.5 × 17 = 57, so 78 is an outlier. At 3 the fence moves to 31.5 + 51 = 82.5 and 78 is no longer flagged; the whisker now extends to it. The data have not changed, only the threshold, which shows that "outlier" depends on a chosen convention and should always be reported with it.' },
      ],
      id: [
        { q: 'Tentukan ringkasan lima angka dan IQR dari 3, 5, 6, 8, 9, 11, 12, 15, 20. Apakah 20 pencilan menurut aturan 1,5 × IQR?', a: 'Data sudah terurut dan n = 9. Median = 9 (nilai ke-5). Q1 = 6 dan Q3 = 12 (seperempat dan tiga perempat jalan, yang di sini tepat jatuh pada nilai ke-3 dan ke-7). Min = 3, maks = 20, IQR = 12 − 6 = 6. Pagar atas = 12 + 1,5 × 6 = 21, sehingga 20 masih di dalam pagar dan bukan pencilan; kumis atas mencapai 20.' },
        { q: 'Muat preset "With outliers". Nilai mana yang ditandai, dan mengapa rata-rata berbeda dari median?', a: 'Q1 = 53,5, median = 57, Q3 = 60,5, sehingga IQR = 7 dan pagar atas 60,5 + 10,5 = 71. Nilai 100 dan 110 berada di luarnya dan ditandai; kumis atas berhenti di 62. Rata-ratanya sekitar 62,5, jauh di atas median 57, karena dua nilai besar itu menambah banyak pada jumlah total tetapi hanya terhitung sebagai dua dari lima belas posisi saat mencari nilai tengah.' },
        { q: 'Dengan preset "Skewed", geser pengali IQR dari 1,5 ke 3. Apa yang terjadi pada pencilan, dan apa artinya bagi aturan itu?', a: 'Pada 1,5 pagarnya 31,5 + 1,5 × 17 = 57, sehingga 78 adalah pencilan. Pada 3 pagarnya bergeser ke 31,5 + 51 = 82,5 dan 78 tidak lagi ditandai; kumis kini menjulur sampai ke sana. Datanya tidak berubah, hanya ambangnya, yang menunjukkan bahwa "pencilan" bergantung pada kesepakatan yang dipilih dan harus selalu dilaporkan bersama ambang itu.' },
      ],
    },
  },
};
