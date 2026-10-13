// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Distinguish how mean and median respond to outliers.',
      'Choose the right summary for skewed data.',
      'See standard deviation explode with one extreme value.',
    ],
    id: [
      'Membedakan reaksi rata-rata dan median terhadap pencilan.',
      'Memilih ringkasan yang tepat untuk data yang miring.',
      'Melihat simpangan baku meledak akibat satu nilai ekstrem.',
    ],
  },
  tryThis: {
    en: [
      'Drag one point far to the right — does the median change?',
      'Add three outliers — at what point does the median start moving?',
      'Compare mean and median for income-like data (one rich person, many poor).',
    ],
    id: [
      'Seret satu titik jauh ke kanan — apakah median berubah?',
      'Tambah tiga pencilan — pada titik berapa median mulai bergerak?',
      'Bandingkan rata-rata dan median untuk data mirip pendapatan (satu kaya, banyak miskin).',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'When we have a list of numbers, we often want one number that stands for the whole list. The two most common choices are the mean and the median. To get the mean, add all the values and divide by how many there are. To get the median, sort the values from smallest to largest and take the one in the middle (or the average of the two middle ones if the count is even). For a tidy, balanced set like 3, 4, 5, 5, 6, 6, 7, 8 the two agree: both are 5.5.',
        'The simulation shows your numbers as dots on a line from 0 to 100. The blue dashed line is the mean, the green dashed line is the median, and the light blue band around the mean shows the standard deviation, a measure of how spread out the values are. Drag a dot to change its value, click on empty space to add a dot, or right-click a dot to remove it. The buttons give you a balanced set, add one far-away value (an outlier at 95), or load an "income-like" set where most values are small and one is huge.',
        'Watch what happens when you drag one dot far to the right. The mean follows it, because the mean uses the size of every value: one value of 95 adds a lot to the total. The median hardly moves, because it only cares about which value sits in the middle of the sorted list; moving one dot to the far right changes the middle value by at most one position. The spread band grows a lot too, because the standard deviation measures how far values are from the mean, and the outlier is very far. For the balanced set plus an outlier at 95, the mean jumps from 5.5 to about 15.4 while the median only moves from 5.5 to 6.',
        'The sim uses very small data sets, which makes the effect easy to see, and it only allows values between 0 and 100. It does not decide for you what counts as an outlier; that is your judgement, and in real data an unusual value might be a typing mistake or a genuine, important observation. Statisticians have rules for flagging outliers, but the key lesson here is simpler: when data has a long tail on one side, report the median, and when you see an average, ask whether a few extreme values are pulling it.',
      ],
      id: [
        'Jika kita punya sederet angka, sering kali kita ingin satu angka yang mewakili seluruh deretan itu. Dua pilihan yang paling umum adalah rata-rata dan median. Untuk mendapatkan rata-rata, jumlahkan semua nilai lalu bagi dengan banyaknya nilai. Untuk mendapatkan median, urutkan nilai dari yang terkecil ke terbesar lalu ambil yang di tengah (atau rata-rata dua nilai tengah jika jumlahnya genap). Untuk data yang rapi dan seimbang seperti 3, 4, 5, 5, 6, 6, 7, 8 keduanya sama: 5,5.',
        'Simulasi ini menampilkan angka-angkamu sebagai titik pada garis dari 0 sampai 100. Garis putus-putus biru adalah rata-rata, garis putus-putus hijau adalah median, dan pita biru muda di sekitar rata-rata menunjukkan simpangan baku, yaitu ukuran seberapa tersebar nilai-nilainya. Seret titik untuk mengubah nilainya, klik ruang kosong untuk menambah titik, atau klik kanan sebuah titik untuk menghapusnya. Tombol-tombolnya memberi data seimbang, menambah satu nilai yang jauh (pencilan di 95), atau memuat data "mirip pendapatan" yang sebagian besar nilainya kecil dan satu nilainya sangat besar.',
        'Perhatikan apa yang terjadi saat kamu menyeret satu titik jauh ke kanan. Rata-rata ikut bergerak, karena rata-rata memakai besar setiap nilai: satu nilai 95 menambah banyak pada jumlah total. Median hampir tidak bergerak, karena ia hanya peduli nilai mana yang berada di tengah urutan; memindahkan satu titik ke ujung kanan hanya menggeser nilai tengah paling banyak satu posisi. Pita sebaran juga melebar banyak, karena simpangan baku mengukur seberapa jauh nilai-nilai dari rata-rata, dan pencilan itu sangat jauh. Untuk data seimbang ditambah pencilan di 95, rata-rata melonjak dari 5,5 ke sekitar 15,4, sedangkan median hanya bergeser dari 5,5 ke 6.',
        'Simulasi ini memakai data yang sangat kecil supaya efeknya mudah dilihat, dan hanya mengizinkan nilai antara 0 dan 100. Ia tidak memutuskan untukmu mana yang disebut pencilan; itu penilaianmu, dan pada data sungguhan nilai yang tidak biasa bisa berupa salah ketik atau pengamatan asli yang penting. Para ahli statistik punya aturan untuk menandai pencilan, tetapi pelajaran pokoknya lebih sederhana: jika data punya ekor panjang di satu sisi, laporkan median, dan jika kamu melihat sebuah "rata-rata", tanyakan apakah beberapa nilai ekstrem sedang menariknya.',
      ],
    },
    figure: {
      caption: {
        en: 'Five values: 10, 20, 30, 40, 50 have mean 30 and median 30. Move the 50 out to 100 and the mean jumps to 40, but the middle value is still 30.',
        id: 'Lima nilai: 10, 20, 30, 40, 50 memiliki rata-rata 30 dan median 30. Pindahkan 50 ke 100, rata-rata melonjak ke 40, tetapi nilai tengahnya tetap 30.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        const X = (v) => 30 + v * 3;
        const dots = (vals, y, hi) => vals.map((v) => `<circle cx="${X(v)}" cy="${y}" r="7" fill="${v === hi ? '#ef4444' : '#8b5cf6'}"/>`).join('');
        const ticks = (y) => [0, 25, 50, 75, 100].map((v) => `<line x1="${X(v)}" y1="${y - 4}" x2="${X(v)}" y2="${y + 4}" class="m"/><text x="${X(v) - 8}" y="${y + 18}" class="s">${v}</text>`).join('');
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Mean and median before and after an outlier', 'Rata-rata dan median sebelum dan sesudah ada pencilan')}">
  <style>text{font:12px system-ui,sans-serif;fill:currentColor}.m{fill:none;stroke:currentColor;stroke-width:1.2;opacity:.5}.s{font-size:10px;opacity:.8}.b{font-weight:600}</style>
  <text x="10" y="16" class="b">${L('Before: 10, 20, 30, 40, 50', 'Sebelum: 10, 20, 30, 40, 50')}</text>
  <line x1="${X(0)}" y1="75" x2="${X(100)}" y2="75" class="m"/>
  ${ticks(75)}
  ${dots([10, 20, 30, 40, 50], 75, -1)}
  <line x1="${X(30)}" y1="28" x2="${X(30)}" y2="62" stroke="#3b82f6" stroke-width="2.5"/>
  <text x="${X(30) + 6}" y="36" fill="#3b82f6" class="s b">${L('mean 30', 'rata-rata 30')}</text>
  <text x="${X(30) + 6}" y="50" fill="#10b981" class="s b">${L('median 30', 'median 30')}</text>
  <text x="10" y="126" class="b">${L('After: 10, 20, 30, 40, 100', 'Sesudah: 10, 20, 30, 40, 100')}</text>
  <line x1="${X(0)}" y1="185" x2="${X(100)}" y2="185" class="m"/>
  ${ticks(185)}
  ${dots([10, 20, 30, 40, 100], 185, 100)}
  <line x1="${X(30)}" y1="138" x2="${X(30)}" y2="172" stroke="#10b981" stroke-width="2.5"/>
  <line x1="${X(40)}" y1="138" x2="${X(40)}" y2="172" stroke="#3b82f6" stroke-width="2.5" stroke-dasharray="4 3"/>
  <text x="${X(40) + 6}" y="146" fill="#3b82f6" class="s b">${L('mean 40', 'rata-rata 40')}</text>
  <text x="${X(30) - 62}" y="146" fill="#10b981" class="s b">${L('median 30', 'median 30')}</text>
  <text x="${X(100) - 54}" y="160" fill="#ef4444" class="s b">${L('outlier', 'pencilan')}</text>
  <path d="M${X(30)} 156 L${X(40) - 4} 156" stroke="#3b82f6" stroke-width="1.5" marker-end="url(#a)" fill="none"/>
  <text x="10" y="226" class="s">${L('Total went up by 50, so the mean moved 50 ÷ 5 = 10. The middle value did not change.', 'Jumlah naik 50, jadi rata-rata bergeser 50 ÷ 5 = 10. Nilai tengahnya tidak berubah.')}</text>
  <defs><marker id="a" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="#3b82f6"/></marker></defs>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'The mean uses the size of every value, so one extreme value can drag it a long way.',
        'The median only depends on which value is in the middle, so it barely moves when one value becomes extreme.',
        'Standard deviation measures spread around the mean, so an outlier makes it jump as well.',
        'For data with a long tail on one side, such as incomes, the median describes a "typical" value better than the mean.',
        'The median does start to move once there are many outliers, because they change which value is in the middle.',
      ],
      id: [
        'Rata-rata memakai besar setiap nilai, sehingga satu nilai ekstrem bisa menariknya jauh.',
        'Median hanya bergantung pada nilai mana yang berada di tengah, sehingga hampir tidak bergerak saat satu nilai menjadi ekstrem.',
        'Simpangan baku mengukur sebaran di sekitar rata-rata, sehingga pencilan membuatnya melonjak juga.',
        'Untuk data berekor panjang di satu sisi, seperti pendapatan, median menggambarkan nilai "yang biasa" lebih baik daripada rata-rata.',
        'Median mulai bergerak jika pencilannya banyak, karena pencilan-pencilan itu mengubah nilai mana yang berada di tengah.',
      ],
    },
    vocabulary: {
      en: [
        ['Mean', 'The total of all values divided by how many values there are; often just called the average.'],
        ['Median', 'The middle value when the values are sorted; with an even count, the average of the two middle values.'],
        ['Outlier', 'A value that lies far away from the rest of the data.'],
        ['Spread', 'How far apart the values are; the sim shows it as a band around the mean.'],
        ['Standard deviation', 'A measure of spread based on how far each value is from the mean; the sim labels it with the Greek letter σ.'],
        ['Skewed data', 'Data with a long tail on one side, for example many small values and a few very large ones.'],
        ['Robust', 'A summary is robust if a few extreme values barely change it; the median is robust, the mean is not.'],
      ],
      id: [
        ['Rata-rata', 'Jumlah semua nilai dibagi banyaknya nilai; sering disebut rerata.'],
        ['Median', 'Nilai tengah setelah data diurutkan; jika jumlahnya genap, rata-rata dua nilai tengah.'],
        ['Pencilan', 'Nilai yang terletak jauh dari data lainnya.'],
        ['Sebaran', 'Seberapa berjauhan nilai-nilainya; simulasi menampilkannya sebagai pita di sekitar rata-rata.'],
        ['Simpangan baku', 'Ukuran sebaran berdasarkan jarak setiap nilai dari rata-rata; simulasi menandainya dengan huruf Yunani σ.'],
        ['Data miring', 'Data dengan ekor panjang di satu sisi, misalnya banyak nilai kecil dan beberapa nilai sangat besar.'],
        ['Kokoh (robust)', 'Sebuah ringkasan disebut kokoh jika beberapa nilai ekstrem hampir tidak mengubahnya; median kokoh, rata-rata tidak.'],
      ],
    },
    misconceptions: {
      en: [
        ['The average is always the "typical" value.', 'Not when the data is skewed. In the income-like set (nine values from 10 to 17 and one value of 95), the mean is 22, higher than nine of the ten values. The median, 14.5, is what a typical person actually has.'],
        ['The median is always better than the mean.', 'The median throws away information about how big the values are. For balanced data without outliers, the mean uses every value and is usually the better summary; that is why both exist.'],
        ['The median never changes when you add outliers.', 'It changes a little right away (adding 95 to the balanced set moves it from 5.5 to 6) and keeps moving as outliers pile up, because each one shifts which value is in the middle.'],
        ['An outlier is always a mistake and should be deleted.', 'Sometimes it is a typo, but often it is real and important: the one very tall student, the one record-breaking rainfall. Investigate it before deciding what to do with it.'],
      ],
      id: [
        ['Rata-rata selalu menunjukkan nilai "yang biasa".', 'Tidak jika datanya miring. Pada data mirip pendapatan (sembilan nilai dari 10 sampai 17 dan satu nilai 95), rata-ratanya 22, lebih tinggi daripada sembilan dari sepuluh nilai. Median, 14,5, adalah yang benar-benar dimiliki orang pada umumnya.'],
        ['Median selalu lebih baik daripada rata-rata.', 'Median membuang informasi tentang seberapa besar nilai-nilainya. Untuk data seimbang tanpa pencilan, rata-rata memakai setiap nilai dan biasanya menjadi ringkasan yang lebih baik; itulah sebabnya keduanya ada.'],
        ['Median tidak pernah berubah saat pencilan ditambahkan.', 'Median berubah sedikit sejak awal (menambahkan 95 pada data seimbang menggesernya dari 5,5 ke 6) dan terus bergerak saat pencilan bertambah, karena setiap pencilan menggeser nilai mana yang berada di tengah.'],
        ['Pencilan selalu salah dan harus dihapus.', 'Kadang memang salah ketik, tetapi sering kali nyata dan penting: satu siswa yang sangat tinggi, satu curah hujan yang memecahkan rekor. Selidiki dulu sebelum memutuskan apa yang dilakukan.'],
      ],
    },
    realWorld: {
      en: [
        'Governments report median household income rather than mean income, because a small number of very rich households would pull the mean far above what most families earn.',
        'If one student scores 0 on a test because they were absent, the class mean drops noticeably while the class median hardly changes.',
        'House prices in a town are usually summarised by the median, since a few mansions would make the mean look unaffordable for everyone.',
        'When a sensor glitches and records one impossible reading, averaging the data is thrown off, which is why many devices use a median filter to clean their signals.',
      ],
      id: [
        'Pemerintah melaporkan median pendapatan rumah tangga, bukan rata-ratanya, karena sejumlah kecil rumah tangga yang sangat kaya akan menarik rata-rata jauh di atas penghasilan kebanyakan keluarga.',
        'Jika satu siswa mendapat nilai 0 karena tidak hadir ujian, rata-rata kelas turun cukup terasa, sedangkan median kelas hampir tidak berubah.',
        'Harga rumah di sebuah kota biasanya dirangkum dengan median, karena beberapa rumah mewah akan membuat rata-ratanya tampak tak terjangkau bagi semua orang.',
        'Saat sebuah sensor bermasalah dan mencatat satu pembacaan yang mustahil, perhitungan rata-rata menjadi kacau; karena itu banyak perangkat memakai filter median untuk membersihkan sinyalnya.',
      ],
    },
    questions: {
      en: [
        { q: 'The balanced set is 3, 4, 5, 5, 6, 6, 7, 8. What are its mean and median?', a: 'Both are 5.5. The total is 44 and there are 8 values, so the mean is 44 ÷ 8 = 5.5. The two middle values of the sorted list are 5 and 6, so the median is (5 + 6) ÷ 2 = 5.5.' },
        { q: 'Now press "Add 1 outlier", which adds the value 95. What are the new mean and median, and why are they so different?', a: 'There are now 9 values with total 139, so the mean is 139 ÷ 9 ≈ 15.4. The median is the 5th value in the sorted list, which is 6. The mean changed a lot because 95 adds a great deal to the total; the median changed only a little because only the middle position matters.' },
        { q: 'A street has nine ordinary houses and one mansion. A newspaper wants one number for "what a house on this street costs". Which summary should it use, and why?', a: 'The median. The mansion would drag the mean far above the price of nine of the ten houses, so the mean would describe no real house. The median is one of the ordinary houses, which is what a typical buyer would pay.' },
      ],
      id: [
        { q: 'Data seimbangnya adalah 3, 4, 5, 5, 6, 6, 7, 8. Berapa rata-rata dan mediannya?', a: 'Keduanya 5,5. Jumlahnya 44 dan ada 8 nilai, sehingga rata-ratanya 44 ÷ 8 = 5,5. Dua nilai tengah dalam urutan adalah 5 dan 6, sehingga mediannya (5 + 6) ÷ 2 = 5,5.' },
        { q: 'Sekarang tekan "Add 1 outlier", yang menambahkan nilai 95. Berapa rata-rata dan median yang baru, dan mengapa keduanya begitu berbeda?', a: 'Kini ada 9 nilai dengan jumlah 139, sehingga rata-ratanya 139 ÷ 9 ≈ 15,4. Mediannya adalah nilai ke-5 dalam urutan, yaitu 6. Rata-rata berubah banyak karena 95 menambah jumlah total dengan besar; median hanya berubah sedikit karena yang penting hanya posisi tengahnya.' },
        { q: 'Sebuah jalan memiliki sembilan rumah biasa dan satu rumah mewah. Sebuah koran ingin satu angka untuk "harga rumah di jalan ini". Ringkasan mana yang sebaiknya dipakai, dan mengapa?', a: 'Median. Rumah mewah itu akan menarik rata-rata jauh di atas harga sembilan dari sepuluh rumah, sehingga rata-rata tidak menggambarkan rumah mana pun yang nyata. Median adalah salah satu rumah biasa, yaitu harga yang akan dibayar pembeli pada umumnya.' },
      ],
    },
  },
};
