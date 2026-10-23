// Long-form text for the sim page (objectives, try-this prompts and the Learn block).
export default {
  objectives: {
    en: [
      'Write and run Python programs that keep class data in lists and draw line, bar, horizontal bar and scatter charts with matplotlib.pyplot, with a title, axis labels, a legend, grid lines and reference lines.',
      'Choose a chart that fits the question (a line for change over time, bars to compare categories, a scatter for the relation between two numbers) and read values, trends and unusual values from it.',
      'Compute and interpret the mean, median and mode with the statistics module, explain why one extreme value moves the mean but hardly the median, and fix charting programs from Python\'s error messages.',
    ],
    id: [
      'Menulis dan menjalankan program Python yang menyimpan data kelas dalam list dan menggambar grafik garis, batang, batang mendatar, dan diagram sebar dengan matplotlib.pyplot, lengkap dengan judul, label sumbu, legenda, garis kisi, dan garis acuan.',
      'Memilih grafik yang sesuai dengan pertanyaan (garis untuk perubahan dari waktu ke waktu, batang untuk membandingkan kategori, diagram sebar untuk hubungan dua bilangan) serta membaca nilai, tren, dan nilai yang tidak biasa darinya.',
      'Menghitung dan menafsirkan rata-rata, median, dan modus dengan modul statistics, menjelaskan mengapa satu nilai ekstrem menggeser rata-rata tetapi hampir tidak menggeser median, serta memperbaiki program grafik dari pesan galat Python.',
    ],
  },
  tryThis: {
    en: [
      'Program 1: before pressing Run, predict where the y axis starts and ends. Then run it and read the range in the window footer (68.75 to 96.25): the scores 70 to 95 plus a margin of 5% of the range on each side.',
      'Program 4 (class average): turn on "Show mean and median on the chart". Change Dewi\'s 45 to 75 in the code, run again and compare. Which statistic moves more, and by how much?',
      'Program 3 (two students): change "s--" to "r^:" and delete label="Ani", then run and look at Ani\'s line and at the legend: which name is missing? Put the label back and try plt.legend(loc="lower right").',
      'Program 10 (find the bug): read the ValueError, add the missing score and run again. Then make a mistake on purpose, such as colour="red" or marker="O", and read the last line of the message.',
    ],
    id: [
      'Program 1: sebelum menekan Jalankan, tebak di mana sumbu y dimulai dan berakhir. Lalu jalankan dan baca rentangnya di bagian bawah jendela (68.75 sampai 96.25): nilai 70 sampai 95 ditambah margin 5% dari rentangnya di setiap sisi.',
      'Program 4 (rata-rata kelas): nyalakan "Tampilkan rata-rata dan median pada grafik". Ubah nilai Dewi 45 menjadi 75 di kode, jalankan lagi, lalu bandingkan. Statistik mana yang bergeser lebih jauh, dan seberapa jauh?',
      'Program 3 (dua siswa): ubah "s--" menjadi "r^:" dan hapus label="Ani", lalu jalankan dan perhatikan garis Ani serta legendanya: nama siapa yang hilang? Kembalikan labelnya dan coba plt.legend(loc="lower right").',
      'Program 10 (cari bug): baca ValueError-nya, tambahkan nilai yang hilang, lalu jalankan lagi. Kemudian buat kesalahan dengan sengaja, misalnya colour="red" atau marker="O", dan baca baris terakhir pesannya.',
    ],
  },

  learn: {
    background: {
      en: [
        'A chart lets the eye see in a second what a column of numbers hides: which score is highest, whether the scores are rising, which club is most popular. In Python the usual tool is matplotlib, a third-party library (install it once with pip install matplotlib; Google Colab already has it). Its pyplot module works like a sketchbook: plt.plot(), plt.bar(), plt.barh() and plt.scatter() put data on the current figure, plt.title(), plt.xlabel(), plt.ylabel(), plt.legend() and plt.grid() decorate it, and plt.show() displays it. In a script plt.show() opens a window and waits until it is closed; after that the figure is gone, so the next plot starts a new Figure 1. Without plt.show() a script shows nothing (Colab and Jupyter display the chart at the end of the cell anyway).',
        'The chart should fit the question. A line chart shows change over time, such as Budi\'s scores from test 1 to test 5. A bar chart compares separate categories, such as the members of each club, and its bars always start at 0 so that their lengths can be compared fairly. A horizontal bar chart (barh) leaves room for long names such as school subjects. A scatter plot shows whether two numbers go together, such as hours of study and scores; the correlation r (statistics.correlation, from −1 to 1) measures how close the dots are to a straight line. When the x values are text, matplotlib places them at positions 0, 1, 2, … in the order given.',
        'Three numbers summarise a data set. The mean is the sum divided by the count; the median is the middle value of the sorted data (the mean of the two middle values when the count is even); the mode is the most frequent value, and statistics.mode returns the first one when several values tie. One very low or very high value pulls the mean towards it but hardly moves the median: in program 4 a single score of 45 brings the class mean down to 78.75 while the median stays at 83.0. statistics.mean keeps whole numbers whole when the mean is exact (83), whereas sum(...) / len(...) always gives a float (83.0).',
        'In this simulation the program runs in minipy, a JavaScript version of the Python taught in SMA, with a matplotlib.pyplot module that follows the rules of matplotlib 3.11: the colour cycle (C0 blue, C1 orange, …), axis ranges fitted to the data with 5% margins, tick marks at steps of 1, 2, 2.5 or 5 times a power of ten, the legend placed where it covers the least data, and the same error messages. These were checked against real matplotlib for every program. The chart is laid out a little tighter than a real window so that no label is cut off, and functions such as plt.pie() and plt.hist() are not drawn: they stop with a NotImplementedError that suggests another function.',
      ],
      id: [
        'Grafik membuat mata melihat dalam sedetik apa yang tersembunyi dalam deretan angka: nilai mana yang tertinggi, apakah nilainya naik, ekskul mana yang paling diminati. Di Python alat yang biasa dipakai adalah matplotlib, pustaka pihak ketiga (pasang sekali dengan pip install matplotlib; Google Colab sudah menyediakannya). Modul pyplot-nya bekerja seperti buku sketsa: plt.plot(), plt.bar(), plt.barh(), dan plt.scatter() menaruh data pada figure yang sedang aktif, plt.title(), plt.xlabel(), plt.ylabel(), plt.legend(), dan plt.grid() melengkapinya, lalu plt.show() menampilkannya. Pada skrip, plt.show() membuka jendela dan menunggu sampai jendela ditutup; setelah itu figure hilang, sehingga plot berikutnya memulai Figure 1 yang baru. Tanpa plt.show() skrip tidak menampilkan apa pun (Colab dan Jupyter tetap menampilkan grafik di akhir sel).',
        'Grafik harus sesuai dengan pertanyaannya. Grafik garis menunjukkan perubahan dari waktu ke waktu, misalnya nilai Budi dari ulangan 1 sampai ulangan 5. Grafik batang membandingkan kategori yang terpisah, misalnya peminat setiap ekskul, dan batangnya selalu mulai dari 0 agar panjangnya adil untuk dibandingkan. Grafik batang mendatar (barh) memberi ruang untuk nama panjang seperti nama mata pelajaran. Diagram sebar menunjukkan apakah dua bilangan berjalan bersama, misalnya jam belajar dan nilai; korelasi r (statistics.correlation, dari −1 sampai 1) mengukur seberapa dekat titik-titik dengan garis lurus. Bila nilai x berupa teks, matplotlib menaruhnya di posisi 0, 1, 2, … sesuai urutan.',
        'Tiga bilangan merangkum sekumpulan data. Rata-rata (mean) adalah jumlah dibagi banyak data; median adalah nilai tengah data yang sudah diurutkan (rata-rata dua nilai tengah bila banyak data genap); modus adalah nilai yang paling sering muncul, dan statistics.mode memberi yang pertama bila beberapa nilai sama seringnya. Satu nilai yang sangat rendah atau sangat tinggi menarik rata-rata ke arahnya tetapi hampir tidak menggeser median: pada program 4 satu nilai 45 menurunkan rata-rata kelas menjadi 78.75, sedangkan median tetap 83.0. statistics.mean mempertahankan bilangan bulat bila rata-ratanya tepat (83), sedangkan sum(...) / len(...) selalu menghasilkan float (83.0).',
        'Dalam simulasi ini program dijalankan oleh minipy, versi JavaScript dari Python yang diajarkan di SMA, dengan modul matplotlib.pyplot yang mengikuti aturan matplotlib 3.11: siklus warna (C0 biru, C1 oranye, …), rentang sumbu yang disesuaikan dengan data ditambah margin 5%, tanda sumbu pada kelipatan 1, 2, 2,5, atau 5 kali pangkat sepuluh, legenda yang ditaruh di tempat yang paling sedikit menutupi data, serta pesan galat yang sama. Semua ini sudah dicocokkan dengan matplotlib asli untuk setiap program. Tata letak grafik sedikit lebih rapat daripada jendela asli agar tidak ada label yang terpotong, dan fungsi seperti plt.pie() dan plt.hist() tidak digambar: keduanya berhenti dengan NotImplementedError yang menyarankan fungsi lain.',
      ],
    },
    figure: {
      caption: {
        en: 'The parts of a matplotlib chart and the pyplot call that makes each one. The y axis does not start at 0: matplotlib fits it to the scores (70 to 95) and adds a 5% margin. The dashed line is the mean of the five scores, 81, drawn with plt.axhline().',
        id: 'Bagian-bagian grafik matplotlib dan pemanggilan pyplot yang membuat masing-masing bagian. Sumbu y tidak mulai dari 0: matplotlib menyesuaikannya dengan nilai (70 sampai 95) dan menambahkan margin 5%. Garis putus-putus adalah rata-rata kelima nilai, 81, yang digambar dengan plt.axhline().',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        const scores = [70, 75, 85, 80, 95];
        const X = (i) => 72 + i * 40;
        const Y = (v) => +(186 - (v - 65) / 35 * 148).toFixed(1);
        const pts = scores.map((v, i) => `${X(i)},${Y(v)}`).join(' ');
        const dots = scores.map((v, i) => `<circle cx="${X(i)}" cy="${Y(v)}" r="3.5" class="cdx-p"/>`).join('');
        const yt = [70, 80, 90].map((v) => `<line x1="48" y1="${Y(v)}" x2="52" y2="${Y(v)}" class="cdx-ax"/><text x="45" y="${Y(v) + 4}" text-anchor="end">${v}</text>`).join('');
        const xt = scores.map((v, i) => `<line x1="${X(i)}" y1="186" x2="${X(i)}" y2="190" class="cdx-ax"/><text x="${X(i)}" y="202" text-anchor="middle">${L('T', 'U')}-${i + 1}</text>`).join('');
        const call = (x, y, text, anchor = 'start') => `<text x="${x}" y="${y}" text-anchor="${anchor}" class="cdx-c">${text}</text>`;
        const lead = (x1, y1, x2, y2) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="cdx-l"/>`;
        const ym = Y(81);
        return `<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('A line chart of five test scores with a title, axis labels, a legend and a dashed mean line, each part labelled with the pyplot call that makes it', 'Grafik garis lima nilai ulangan dengan judul, label sumbu, legenda, dan garis rata-rata putus-putus, setiap bagian diberi label pemanggilan pyplot yang membuatnya')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.cdx-ax{stroke:currentColor;stroke-width:1.2;fill:none}.cdx-ln{fill:none;stroke:#3b82f6;stroke-width:2;stroke-linejoin:round}.cdx-p{fill:#3b82f6}.cdx-m{stroke:#ef4444;stroke-width:1.6;stroke-dasharray:5 3}.cdx-c{font:600 10.5px ui-monospace,Menlo,Consolas,monospace;fill:#8b5cf6}.cdx-l{stroke:#8b5cf6;stroke-width:1;stroke-dasharray:2 2;opacity:.8}.cdx-t{font:600 12.5px system-ui,sans-serif}.cdx-lg{fill:none;stroke:currentColor;stroke-width:.8;opacity:.5}</style>
  <text x="150" y="26" text-anchor="middle" class="cdx-t">${L('Budi&#8217;s Maths Scores', 'Nilai Matematika Budi')}</text>
  <rect x="52" y="38" width="196" height="148" class="cdx-ax"/>
  ${yt}${xt}
  <line x1="52" y1="${ym}" x2="248" y2="${ym}" class="cdx-m"/>
  <polyline points="${pts}" class="cdx-ln"/>${dots}
  <rect x="58" y="44" width="80" height="36" rx="3" class="cdx-lg"/>
  <line x1="63" y1="55" x2="83" y2="55" class="cdx-ln"/><circle cx="73" cy="55" r="3" class="cdx-p"/><text x="88" y="59">Budi</text>
  <line x1="63" y1="71" x2="83" y2="71" class="cdx-m"/><text x="88" y="75">${L('mean', 'rata-rata')}</text>
  <text x="150" y="220" text-anchor="middle">${L('Test', 'Ulangan')}</text>
  <text transform="translate(17 112) rotate(-90)" text-anchor="middle">${L('Score', 'Nilai')}</text>
  ${call(262, 26, 'plt.title()')}${lead(258, 22, 224, 22)}
  ${call(262, 48, 'plt.plot()')}${lead(258, 45, 236, 57)}
  ${call(262, 80, 'plt.legend()')}${lead(258, 77, 139, 72)}
  ${call(262, ym + 4, 'plt.axhline()')}${lead(258, ym, 250, ym)}
  ${call(262, 220, 'plt.xlabel()')}${lead(258, 216, 176, 216)}
  ${call(4, 236, 'plt.ylabel()')}${lead(17, 226, 17, 132)}
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'pyplot builds a figure step by step: plot(), bar(), barh() and scatter() add data, title(), xlabel(), ylabel(), legend() and grid() decorate it, and show() displays it (and, in a script, closes it).',
        'Choose the chart for the question: a line for change over time, bars for comparing categories, a scatter for the relation between two numbers.',
        'The x list and the y list must have the same length: plot(x, y) with 6 and 5 values stops with ValueError: x and y must have same first dimension, but have shapes (6,) and (5,).',
        'The mean is pulled by extreme values, the median is not; the mode is the most frequent value and also works for text (the most popular club).',
        'matplotlib fits each axis to the data plus 5% margins and starts bars at 0. A y axis that does not start at 0 makes small differences look big, so always read the numbers on the axis; ylim() fixes the range.',
      ],
      id: [
        'pyplot membangun figure langkah demi langkah: plot(), bar(), barh(), dan scatter() menambahkan data, title(), xlabel(), ylabel(), legend(), dan grid() melengkapinya, lalu show() menampilkannya (dan, pada skrip, menutupnya).',
        'Pilih grafik sesuai pertanyaan: garis untuk perubahan dari waktu ke waktu, batang untuk membandingkan kategori, diagram sebar untuk hubungan dua bilangan.',
        'List x dan list y harus sama panjang: plot(x, y) dengan 6 dan 5 nilai berhenti dengan ValueError: x and y must have same first dimension, but have shapes (6,) and (5,).',
        'Rata-rata tertarik oleh nilai ekstrem, median tidak; modus adalah nilai yang paling sering muncul dan juga berlaku untuk teks (ekskul terfavorit).',
        'matplotlib menyesuaikan setiap sumbu dengan data ditambah margin 5% dan memulai batang dari 0. Sumbu y yang tidak mulai dari 0 membuat selisih kecil tampak besar, jadi selalu baca angka pada sumbu; ylim() menetapkan rentangnya.',
      ],
    },
    vocabulary: {
      en: [
        ['figure', 'The whole picture (the window). plt.figure() starts a new one; plt.show() displays the open figures.'],
        ['axes', 'The box with the data, the two axes, the ticks and the title. A figure made by pyplot usually has one.'],
        ['line chart', 'Points joined by lines, drawn with plt.plot(x, y); used for change over time.'],
        ['bar chart', 'Rectangles from 0 up to each value, drawn with plt.bar() (or plt.barh() lying down); used to compare categories.'],
        ['scatter plot', 'One dot for each pair (x, y), drawn with plt.scatter(); used to see whether two quantities are related.'],
        ['legend', 'The box that names each data set; it shows the label= texts when plt.legend() is called.'],
        ['tick', 'A small mark with a number or name on an axis; plt.xticks() and plt.yticks() choose them.'],
        ['mean, median, mode', 'Sum ÷ count; the middle value of the sorted data; the most frequent value (statistics.mean, median, mode).'],
        ['outlier', 'A value far from the others, such as one score of 45 in a class that mostly scored 75–92.'],
        ['correlation', 'A number r from −1 to 1 that tells how closely two quantities follow a straight line (statistics.correlation).'],
      ],
      id: [
        ['figure', 'Seluruh gambar (jendelanya). plt.figure() memulai figure baru; plt.show() menampilkan figure yang terbuka.'],
        ['axes', 'Kotak yang berisi data, kedua sumbu, tanda sumbu, dan judul. Figure buatan pyplot biasanya punya satu.'],
        ['grafik garis', 'Titik-titik yang dihubungkan garis, digambar dengan plt.plot(x, y); dipakai untuk perubahan dari waktu ke waktu.'],
        ['grafik batang', 'Persegi panjang dari 0 sampai setiap nilai, digambar dengan plt.bar() (atau plt.barh() yang mendatar); dipakai untuk membandingkan kategori.'],
        ['diagram sebar', 'Satu titik untuk setiap pasangan (x, y), digambar dengan plt.scatter(); dipakai untuk melihat apakah dua besaran berhubungan.'],
        ['legenda', 'Kotak yang menamai setiap kumpulan data; menampilkan teks label= ketika plt.legend() dipanggil.'],
        ['tanda sumbu (tick)', 'Tanda kecil berisi angka atau nama pada sumbu; plt.xticks() dan plt.yticks() memilihnya.'],
        ['rata-rata, median, modus', 'Jumlah ÷ banyak data; nilai tengah data yang sudah diurutkan; nilai yang paling sering muncul (statistics.mean, median, mode).'],
        ['pencilan (outlier)', 'Nilai yang jauh dari nilai lainnya, misalnya satu nilai 45 di kelas yang sebagian besar mendapat 75–92.'],
        ['korelasi', 'Bilangan r dari −1 sampai 1 yang menyatakan seberapa dekat dua besaran mengikuti garis lurus (statistics.correlation).'],
      ],
    },
    misconceptions: {
      en: [
        ['The chart appears as soon as plt.plot() runs.', 'plt.plot() only adds a line to the figure in memory. In a script the window opens at plt.show(); Colab and Jupyter show the figure at the end of the cell.'],
        ['The mean is always the typical score of the class.', 'One extreme value pulls the mean towards it. The median, the middle of the sorted scores, is a better "typical" value when there are outliers.'],
        ['A line that climbs steeply means a big improvement.', 'The steepness depends on the axis range. matplotlib zooms in on the data, so a rise from 80 to 85 can fill the whole chart; read the numbers on the y axis.'],
        ['statistics.mode() returns every most common value.', 'It returns only the first of the most common values; statistics.multimode() returns all of them.'],
      ],
      id: [
        ['Grafik langsung muncul begitu plt.plot() dijalankan.', 'plt.plot() hanya menambahkan garis ke figure di memori. Pada skrip, jendela terbuka saat plt.show(); Colab dan Jupyter menampilkan figure di akhir sel.'],
        ['Rata-rata selalu menggambarkan nilai khas kelas.', 'Satu nilai ekstrem menarik rata-rata ke arahnya. Median, nilai tengah dari nilai yang diurutkan, lebih tepat sebagai nilai "khas" bila ada pencilan.'],
        ['Garis yang naik curam berarti peningkatan besar.', 'Kecuraman bergantung pada rentang sumbu. matplotlib memperbesar tampilan ke rentang data, sehingga kenaikan dari 80 ke 85 bisa memenuhi seluruh grafik; baca angka pada sumbu y.'],
        ['statistics.mode() memberikan semua nilai yang paling sering muncul.', 'Fungsi itu hanya memberi yang pertama dari nilai-nilai yang paling sering muncul; statistics.multimode() memberi semuanya.'],
      ],
    },
    realWorld: {
      en: [
        'Teachers and homeroom teachers (wali kelas) chart test averages across a semester to see which topics need remedial lessons.',
        'The student council (OSIS) can turn a club or class-meeting survey into a bar chart in a few lines of Python.',
        'Badan Pusat Statistik (BPS) and BMKG publish data on population, school enrolment, rainfall and temperature that students can download and chart.',
        'Scientists, engineers and data journalists use matplotlib to plot measurements; it comes preinstalled in Google Colab.',
        'Health reports often show a moving average (a mean of the last 7 days) so that one unusual day does not hide the trend.',
      ],
      id: [
        'Guru dan wali kelas membuat grafik rata-rata ulangan selama satu semester untuk melihat materi mana yang perlu remedial.',
        'OSIS dapat mengubah survei ekskul atau class meeting menjadi grafik batang dengan beberapa baris Python.',
        'Badan Pusat Statistik (BPS) dan BMKG menerbitkan data penduduk, partisipasi sekolah, curah hujan, dan suhu yang dapat diunduh dan digrafikkan siswa.',
        'Ilmuwan, insinyur, dan jurnalis data memakai matplotlib untuk menggambar hasil pengukuran; matplotlib sudah terpasang di Google Colab.',
        'Laporan kesehatan sering menampilkan rata-rata bergerak (rata-rata 7 hari terakhir) agar satu hari yang tidak biasa tidak menutupi trennya.',
      ],
    },
    questions: {
      en: [
        { q: 'A group scored 60, 70, 70, 80 and 100. Find the mean, the median and the mode. Which of them changes if the 100 becomes 70?', a: 'Mean = 380 ÷ 5 = 76, median = 70, mode = 70. With 70 instead of 100 the mean drops to 350 ÷ 5 = 70, while the median and the mode stay 70: only the mean feels the extreme value.' },
        { q: 'plt.plot(["U-1", "U-2", "U-3"], [80, 85]) stops with an error. Which error, and how do you fix it?', a: 'ValueError: x and y must have same first dimension, but have shapes (3,) and (2,). There are three tests but only two scores: add the missing score so that both lists have three values.' },
        { q: 'Which chart would you choose for (a) the number of students in each club, (b) one student\'s scores over a semester, (c) the heights and shoe sizes of the class?', a: '(a) a bar chart, because the clubs are separate categories; (b) a line chart, because it shows change over time; (c) a scatter plot, because each student gives a pair of numbers and we want to see whether they are related.' },
        { q: 'Why does the bar chart of program 2 start at 0 while the line chart of program 1 starts at 68.75?', a: 'Bars show amounts by their length, so matplotlib keeps their base at 0 (a "sticky" edge). A line chart is fitted to its data: 70 to 95 is a range of 25, and 5% of 25 = 1.25 is added on each side, giving 68.75 to 96.25.' },
      ],
      id: [
        { q: 'Sekelompok siswa mendapat nilai 60, 70, 70, 80, dan 100. Tentukan rata-rata, median, dan modusnya. Mana yang berubah jika 100 diganti 70?', a: 'Rata-rata = 380 ÷ 5 = 76, median = 70, modus = 70. Dengan 70 sebagai pengganti 100, rata-rata turun menjadi 350 ÷ 5 = 70, sedangkan median dan modus tetap 70: hanya rata-rata yang terpengaruh nilai ekstrem.' },
        { q: 'plt.plot(["U-1", "U-2", "U-3"], [80, 85]) berhenti dengan galat. Galat apa, dan bagaimana memperbaikinya?', a: 'ValueError: x and y must have same first dimension, but have shapes (3,) and (2,). Ada tiga ulangan tetapi hanya dua nilai: tambahkan nilai yang hilang agar kedua list berisi tiga nilai.' },
        { q: 'Grafik apa yang kamu pilih untuk (a) banyak siswa di setiap ekskul, (b) nilai seorang siswa selama satu semester, (c) tinggi badan dan ukuran sepatu siswa sekelas?', a: '(a) grafik batang, karena ekskul adalah kategori yang terpisah; (b) grafik garis, karena menunjukkan perubahan dari waktu ke waktu; (c) diagram sebar, karena setiap siswa memberi sepasang bilangan dan kita ingin melihat apakah keduanya berhubungan.' },
        { q: 'Mengapa grafik batang pada program 2 mulai dari 0, sedangkan grafik garis pada program 1 mulai dari 68.75?', a: 'Batang menunjukkan besar nilai lewat panjangnya, jadi matplotlib mempertahankan alasnya di 0 (tepi "lengket"). Grafik garis disesuaikan dengan datanya: 70 sampai 95 adalah rentang 25, dan 5% dari 25 = 1,25 ditambahkan di setiap sisi, sehingga menjadi 68.75 sampai 96.25.' },
      ],
    },
  },
};
