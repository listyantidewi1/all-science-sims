// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Connect a/b to "a parts out of b equal pieces".',
      'Find common denominators when adding or comparing fractions.',
      'Convert improper fractions to mixed numbers (and back).',
    ],
    id: [
      'Menghubungkan a/b dengan "a bagian dari b potongan sama".',
      'Mencari penyebut sama saat menambah atau membandingkan pecahan.',
      'Mengonversi pecahan tak biasa ke bilangan campuran (dan sebaliknya).',
    ],
  },  tryThis: {
    en: [
      '1/2 + 1/3 — common denominator 6 → 3/6 + 2/6 = 5/6.',
      '7/4 — improper; equals 1¾.',
      'Compare 5/8 vs 3/5 — common denom 40, so 25/40 vs 24/40.',
    ],
    id: [
      '1/2 + 1/3 — penyebut sama 6 → 3/6 + 2/6 = 5/6.',
      '7/4 — tak biasa; setara dengan 1¾.',
      'Bandingkan 5/8 vs 3/5 — penyebut sama 40, jadi 25/40 vs 24/40.',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'A fraction is a way of talking about parts of a whole. The bottom number, the denominator, tells you how many equal pieces the whole has been cut into. The top number, the numerator, tells you how many of those pieces you have. So 3/4 means: cut something into 4 equal pieces and take 3 of them. The sim shows every fraction three ways at once: as slices of a pie, as a strip of a bar, and as a dot on a number line. Move the numerator or denominator slider and watch all three change together.',
        'You can only add or compare pieces that are the same size. Half a pizza and a third of a pizza are different-sized slices, so 1/2 + 1/3 is not 2/5. The trick is to cut both into smaller pieces that match. Both halves and thirds can be cut into sixths: 1/2 is the same as 3/6 and 1/3 is the same as 2/6. Now the pieces match and we can count them: 3 + 2 = 5 sixths. The sim does this for you. It finds the smallest denominator that works for both fractions, rewrites them, and then adds, subtracts or compares.',
        'When the answer comes out, the sim also simplifies it (2/4 becomes 1/2), writes it as a mixed number if it is bigger than one (7/4 becomes 1 3/4), and shows it as a decimal. A few things to notice: the pie and the bar can only show one whole, so when the numerator is bigger than the denominator they fill up completely and you should look at the number line, which goes from 0 to 4. The denominator slider only goes up to 20, and if you subtract a bigger fraction from a smaller one you get a negative answer.',
      ],
      id: [
        'Pecahan adalah cara membicarakan bagian dari sesuatu yang utuh. Angka bawah, yaitu penyebut, memberi tahu menjadi berapa potongan sama besar benda utuh itu dipotong. Angka atas, yaitu pembilang, memberi tahu berapa potongan yang kamu ambil. Jadi 3/4 berarti: potong sesuatu menjadi 4 bagian sama besar lalu ambil 3 bagian. Simulasi ini menampilkan setiap pecahan dengan tiga cara sekaligus: sebagai potongan pai, sebagai batang, dan sebagai titik pada garis bilangan. Geser slider pembilang atau penyebut dan lihat ketiganya berubah bersama.',
        'Kamu hanya bisa menjumlahkan atau membandingkan potongan yang ukurannya sama. Setengah pizza dan sepertiga pizza adalah potongan yang ukurannya berbeda, jadi 1/2 + 1/3 bukan 2/5. Caranya adalah memotong keduanya menjadi potongan lebih kecil yang cocok. Setengah dan sepertiga sama-sama bisa dipotong menjadi perenam: 1/2 sama dengan 3/6 dan 1/3 sama dengan 2/6. Sekarang potongannya cocok dan bisa dihitung: 3 + 2 = 5 perenam. Simulasi melakukannya untukmu. Ia mencari penyebut terkecil yang cocok untuk kedua pecahan, menuliskannya ulang, lalu menjumlahkan, mengurangkan, atau membandingkan.',
        'Ketika jawabannya keluar, simulasi juga menyederhanakannya (2/4 menjadi 1/2), menuliskannya sebagai bilangan campuran jika lebih dari satu (7/4 menjadi 1 3/4), dan menampilkannya sebagai desimal. Ada beberapa hal yang perlu diperhatikan: pai dan batang hanya bisa menampilkan satu benda utuh, jadi ketika pembilang lebih besar daripada penyebut keduanya terisi penuh dan kamu sebaiknya melihat garis bilangan, yang berjalan dari 0 sampai 4. Slider penyebut hanya sampai 20, dan jika kamu mengurangkan pecahan yang lebih besar dari yang lebih kecil, hasilnya negatif.',
      ],
    },
    figure: {
      caption: {
        en: 'Halves and thirds are different sizes, so cut both into sixths. Then 1/2 is 3 pieces and 1/3 is 2 pieces, and 3 + 2 = 5 sixths.',
        id: 'Setengah dan sepertiga ukurannya berbeda, jadi potong keduanya menjadi perenam. Lalu 1/2 adalah 3 potongan dan 1/3 adalah 2 potongan, dan 3 + 2 = 5 perenam.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Fraction bars showing 1/2 + 1/3 = 5/6', 'Batang pecahan yang menunjukkan 1/2 + 1/3 = 5/6')}">
  <style>text{font:12px system-ui,sans-serif;fill:currentColor}.o{fill:none;stroke:currentColor;stroke-width:1.4}.d{stroke:currentColor;stroke-width:1.2;fill:none}.s{font-size:11px}</style>
  <text x="180" y="14" text-anchor="middle" font-weight="bold">1/2 + 1/3 = ?</text>
  <rect x="40" y="24" width="120" height="22" fill="#3b82f6"/>
  <rect x="40" y="24" width="240" height="22" class="o"/>
  <path d="M160 24 V46" class="d"/>
  <text x="32" y="40" text-anchor="end" font-weight="bold">1/2</text>
  <text x="290" y="40" class="s">= 3/6</text>
  <rect x="40" y="56" width="80" height="22" fill="#f59e0b"/>
  <rect x="40" y="56" width="240" height="22" class="o"/>
  <path d="M120 56 V78 M200 56 V78" class="d"/>
  <text x="32" y="72" text-anchor="end" font-weight="bold">1/3</text>
  <text x="290" y="72" class="s">= 2/6</text>
  <text x="180" y="100" text-anchor="middle" class="s">${L('Cut both into sixths so every piece is the same size', 'Potong keduanya menjadi perenam agar semua potongan sama besar')}</text>
  <rect x="40" y="110" width="120" height="22" fill="#3b82f6"/>
  <rect x="40" y="110" width="240" height="22" class="o"/>
  <path d="M80 110 V132 M120 110 V132 M160 110 V132 M200 110 V132 M240 110 V132" class="d"/>
  <text x="290" y="126" class="s">3/6</text>
  <rect x="40" y="142" width="80" height="22" fill="#f59e0b"/>
  <rect x="40" y="142" width="240" height="22" class="o"/>
  <path d="M80 142 V164 M120 142 V164 M160 142 V164 M200 142 V164 M240 142 V164" class="d"/>
  <text x="290" y="158" class="s">+ 2/6</text>
  <path d="M40 174 H280" class="d" stroke-dasharray="3 3"/>
  <rect x="40" y="182" width="120" height="22" fill="#3b82f6"/>
  <rect x="160" y="182" width="80" height="22" fill="#f59e0b"/>
  <rect x="40" y="182" width="240" height="22" class="o"/>
  <path d="M80 182 V204 M120 182 V204 M160 182 V204 M200 182 V204 M240 182 V204" class="d"/>
  <text x="290" y="198" fill="#10b981" font-weight="bold">= 5/6</text>
  <text x="180" y="228" text-anchor="middle" class="s">${L('Same-size pieces can be counted together: 3 + 2 = 5 sixths', 'Potongan yang sama besar bisa dihitung bersama: 3 + 2 = 5 perenam')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'The denominator says how many equal pieces the whole is cut into; the numerator says how many pieces you take.',
        'Cutting every piece into smaller equal pieces does not change the amount: 1/2, 2/4 and 3/6 are the same.',
        'To add, subtract or compare fractions, first rewrite them with the same denominator so the pieces match.',
        'A fraction with a numerator bigger than its denominator is more than one whole and can be written as a mixed number.',
      ],
      id: [
        'Penyebut menyatakan menjadi berapa potongan sama besar benda utuh dipotong; pembilang menyatakan berapa potongan yang diambil.',
        'Memotong setiap potongan menjadi potongan lebih kecil yang sama besar tidak mengubah jumlahnya: 1/2, 2/4, dan 3/6 sama nilainya.',
        'Untuk menjumlahkan, mengurangkan, atau membandingkan pecahan, tuliskan dulu dengan penyebut yang sama supaya potongannya cocok.',
        'Pecahan dengan pembilang lebih besar daripada penyebut nilainya lebih dari satu dan bisa ditulis sebagai bilangan campuran.',
      ],
    },
    vocabulary: {
      en: [
        ['Numerator', 'The top number of a fraction: how many pieces you have.'],
        ['Denominator', 'The bottom number of a fraction: how many equal pieces make one whole.'],
        ['Equivalent fractions', 'Fractions that look different but show the same amount, like 1/2 and 3/6.'],
        ['Common denominator', 'A denominator that works for two fractions at once, so their pieces are the same size.'],
        ['Simplest form', 'A fraction whose numerator and denominator cannot both be divided by the same number any more, like 5/6.'],
        ['Improper fraction', 'A fraction whose numerator is bigger than its denominator, like 7/4; it is more than one whole.'],
        ['Mixed number', 'A whole number and a fraction together, like 1 3/4.'],
      ],
      id: [
        ['Pembilang', 'Angka atas pada pecahan: berapa potongan yang kamu punya.'],
        ['Penyebut', 'Angka bawah pada pecahan: berapa potongan sama besar yang membentuk satu benda utuh.'],
        ['Pecahan senilai', 'Pecahan yang tampak berbeda tetapi menunjukkan jumlah yang sama, seperti 1/2 dan 3/6.'],
        ['Penyebut sama', 'Penyebut yang cocok untuk dua pecahan sekaligus, sehingga potongannya sama besar.'],
        ['Bentuk paling sederhana', 'Pecahan yang pembilang dan penyebutnya tidak bisa lagi dibagi dengan bilangan yang sama, seperti 5/6.'],
        ['Pecahan tak biasa', 'Pecahan yang pembilangnya lebih besar daripada penyebutnya, seperti 7/4; nilainya lebih dari satu.'],
        ['Bilangan campuran', 'Bilangan bulat dan pecahan yang ditulis bersama, seperti 1 3/4.'],
      ],
    },
    misconceptions: {
      en: [
        ['A bigger denominator means a bigger fraction.', 'It is the other way round. Cutting a cake into 8 pieces makes each piece smaller than cutting it into 4, so 1/8 is less than 1/4. Try it with the bar in the sim.'],
        ['To add fractions, add the tops and add the bottoms.', 'That gives 1/2 + 1/3 = 2/5, which is less than 1/2 on its own, so it cannot be right. The pieces must be the same size first: 3/6 + 2/6 = 5/6.'],
        ['A fraction is always smaller than 1.', 'If the numerator is bigger than the denominator, the fraction is more than one whole. 7/4 is one whole and three quarters more; look at it on the number line.'],
        ['2/4 and 1/2 are different amounts.', 'They are the same amount cut differently. The pie, the bar and the number line all look identical for 2/4 and 1/2.'],
      ],
      id: [
        ['Penyebut yang lebih besar berarti pecahannya lebih besar.', 'Justru sebaliknya. Memotong kue menjadi 8 bagian membuat tiap bagian lebih kecil daripada memotongnya menjadi 4, jadi 1/8 lebih kecil daripada 1/4. Coba dengan batang di simulasi.'],
        ['Untuk menjumlahkan pecahan, jumlahkan angka atas dan jumlahkan angka bawah.', 'Itu memberi 1/2 + 1/3 = 2/5, yang lebih kecil daripada 1/2 saja, jadi pasti salah. Potongannya harus disamakan dulu: 3/6 + 2/6 = 5/6.'],
        ['Pecahan selalu lebih kecil dari 1.', 'Jika pembilang lebih besar daripada penyebut, pecahannya lebih dari satu benda utuh. 7/4 adalah satu utuh dan tiga perempat lagi; lihat di garis bilangan.'],
        ['2/4 dan 1/2 jumlahnya berbeda.', 'Keduanya jumlah yang sama dengan cara potong yang berbeda. Pai, batang, dan garis bilangan tampak persis sama untuk 2/4 dan 1/2.'],
      ],
    },
    realWorld: {
      en: [
        'Sharing a pizza: 8 slices among 4 friends is 2/8 each, which is the same as 1/4 of the pizza.',
        'Recipes use fractions of a cup; adding 1/2 cup and 1/4 cup of flour gives 3/4 cup, which you can check with measuring cups.',
        'Time is full of fractions: a quarter of an hour is 15 minutes, and half an hour is 30 minutes, because the hour is cut into 60 equal minutes.',
        'Rulers mark halves, quarters and eighths of a centimetre or an inch, so reading a length means reading a fraction.',
      ],
      id: [
        'Berbagi pizza: 8 potong untuk 4 teman berarti 2/8 tiap orang, yang sama dengan 1/4 pizza.',
        'Resep memakai pecahan cangkir; 1/2 cangkir ditambah 1/4 cangkir tepung menjadi 3/4 cangkir, dan bisa kamu cek dengan gelas ukur.',
        'Waktu penuh dengan pecahan: seperempat jam adalah 15 menit dan setengah jam adalah 30 menit, karena satu jam dipotong menjadi 60 menit yang sama besar.',
        'Penggaris menandai setengah, seperempat, dan seperdelapan sentimeter atau inci, jadi membaca panjang berarti membaca pecahan.',
      ],
    },
    questions: {
      en: [
        { q: 'What is 3/4 + 1/8?', a: 'Quarters can be cut into eighths: 3/4 = 6/8. Then 6/8 + 1/8 = 7/8. Set the sim to 3/4 and 1/8 with Add to check.' },
        { q: 'Which is bigger, 2/3 or 3/5?', a: 'Use fifteenths: 2/3 = 10/15 and 3/5 = 9/15. So 2/3 is bigger, by one fifteenth. The sim\'s Compare mode shows 10/15 > 9/15.' },
        { q: 'Write 9/4 as a mixed number and say where it sits on the number line.', a: '4 quarters make one whole, so 9 quarters is 2 wholes with 1 quarter left over: 2 1/4. On the number line it is just past 2, a quarter of the way to 3.' },
      ],
      id: [
        { q: 'Berapa 3/4 + 1/8?', a: 'Seperempat bisa dipotong menjadi seperdelapan: 3/4 = 6/8. Lalu 6/8 + 1/8 = 7/8. Atur simulasi ke 3/4 dan 1/8 dengan pilihan Add untuk memeriksa.' },
        { q: 'Mana yang lebih besar, 2/3 atau 3/5?', a: 'Pakai perlimabelas: 2/3 = 10/15 dan 3/5 = 9/15. Jadi 2/3 lebih besar, selisihnya satu perlimabelas. Mode Compare di simulasi menunjukkan 10/15 > 9/15.' },
        { q: 'Tulis 9/4 sebagai bilangan campuran dan sebutkan letaknya di garis bilangan.', a: '4 perempat membentuk satu utuh, jadi 9 perempat adalah 2 utuh dengan sisa 1 perempat: 2 1/4. Di garis bilangan letaknya sedikit lewat 2, seperempat jalan menuju 3.' },
      ],
    },
  },
};
