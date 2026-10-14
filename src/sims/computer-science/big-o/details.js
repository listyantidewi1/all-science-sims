// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Recognize the relative growth rates of common complexity classes.',
      'See why exponential and factorial are "intractable" past tiny n.',
      'Compare actual numerical values, not just shapes.',
    ],
    id: [
      'Mengenali laju pertumbuhan relatif kelas kompleksitas umum.',
      'Melihat mengapa eksponensial dan faktorial "intractable" untuk n kecil sekalipun.',
      'Membandingkan nilai numerik nyata, bukan sekadar bentuk.',
    ],
  },  tryThis: {
    en: [
      'n=20 — what is 2ⁿ vs n²?',
      'n=10 — what is n!?',
      'Set log scale — does it linearize the exponentials?',
    ],
    id: [
      'n=20 — berapa 2ⁿ vs n²?',
      'n=10 — berapa n!?',
      'Atur skala log — apakah eksponensial jadi linear?',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'Big-O notation describes how the amount of work an algorithm does grows as its input size n grows. It deliberately ignores constant factors and smaller terms: an algorithm that does 3n + 20 operations and one that does n operations are both O(n), because what matters for large inputs is the shape of the growth, not the exact count. Each class has typical examples: O(1) for reading one array element, O(log n) for binary search, O(n) for scanning a list, O(n log n) for good sorting algorithms such as merge sort, O(n²) for comparing every pair of items, O(2ⁿ) for trying every subset, and O(n!) for trying every ordering.',
        'The simulation plots the seven bare functions with a constant of 1, as if each counted operations directly. The "n max" slider sets how far the x-axis runs; "n (current)" picks one value and the legend prints each function there, so you can read exact numbers such as 2²⁰ = 1,048,576 against n² = 400. The log-scale toggle is the key control: on a linear axis the fast curves leave the chart almost immediately and everything else is squashed onto the floor, while on a log axis every gridline step means ten times more work. On that axis a polynomial such as n² bends over (its log is 2·log n), an exponential such as 2ⁿ becomes a straight line (its log is n·log 2), and n! still curves upward, because log n! grows like n·log n.',
        'The practical meaning is about doubling. When n doubles, n² grows 4 times, n log n a little more than 2 times, but 2ⁿ is squared (2^(2n) = (2ⁿ)²) and n! grows by a factor that itself keeps growing. If one operation takes a nanosecond, then at n = 30 an n log n algorithm finishes in about 150 ns, n² in under a microsecond, 2ⁿ (about 1.07 × 10⁹) in roughly one second, and n! (about 2.65 × 10³²) in about 8 × 10¹⁵ years, several hundred thousand times the age of the universe. This is why polynomial algorithms are called tractable and exponential or factorial ones intractable beyond small n.',
        'The chart has limits worth remembering. Big-O hides constants, so an O(n) method with a large constant can lose to an O(n²) one for small n; the curves here with constant 1 cannot show that. Big-O is an upper bound on growth, usually quoted for the worst case, and says nothing about memory, caches or how fast a particular computer is. The curves are plotted for non-integer n too, so the n! line is really a staircase between integers, and the legend rounds large values. The functions are models of algorithms, not measurements of any real program.',
      ],
      id: [
        'Notasi Big-O menggambarkan bagaimana jumlah kerja sebuah algoritma bertambah ketika ukuran masukannya n bertambah. Notasi ini sengaja mengabaikan faktor konstan dan suku-suku yang lebih kecil: algoritma yang melakukan 3n + 20 operasi dan yang melakukan n operasi sama-sama O(n), karena yang penting untuk masukan besar adalah bentuk pertumbuhannya, bukan hitungan persisnya. Tiap kelas punya contoh khas: O(1) untuk membaca satu elemen larik, O(log n) untuk pencarian biner, O(n) untuk menyapu sebuah daftar, O(n log n) untuk algoritma pengurutan yang baik seperti merge sort, O(n²) untuk membandingkan setiap pasangan data, O(2ⁿ) untuk mencoba setiap himpunan bagian, dan O(n!) untuk mencoba setiap urutan.',
        'Simulasi ini menggambar ketujuh fungsi secara langsung dengan konstanta 1, seolah masing-masing menghitung operasi secara langsung. Slider "n max" menentukan sejauh mana sumbu x berjalan; "n (current)" memilih satu nilai dan legenda mencetak nilai tiap fungsi di sana, sehingga kamu bisa membaca angka pasti seperti 2²⁰ = 1.048.576 dibandingkan n² = 400. Sakelar skala log adalah kontrol kuncinya: pada sumbu linear kurva-kurva cepat langsung keluar dari grafik dan yang lain terjepit di dasar, sedangkan pada sumbu log setiap garis kisi berarti kerja sepuluh kali lebih banyak. Pada sumbu itu polinomial seperti n² melengkung ke bawah (log-nya 2·log n), eksponensial seperti 2ⁿ menjadi garis lurus (log-nya n·log 2), dan n! tetap melengkung ke atas, karena log n! tumbuh seperti n·log n.',
        'Makna praktisnya soal penggandaan. Ketika n berlipat dua, n² tumbuh 4 kali, n log n sedikit lebih dari 2 kali, tetapi 2ⁿ dikuadratkan (2^(2n) = (2ⁿ)²) dan n! tumbuh dengan faktor yang terus membesar. Jika satu operasi memakan satu nanodetik, maka pada n = 30 algoritma n log n selesai dalam sekitar 150 ns, n² di bawah satu mikrodetik, 2ⁿ (sekitar 1,07 × 10⁹) dalam kira-kira satu detik, dan n! (sekitar 2,65 × 10³²) dalam sekitar 8 × 10¹⁵ tahun, beberapa ratus ribu kali umur alam semesta. Inilah sebabnya algoritma polinomial disebut tractable dan algoritma eksponensial atau faktorial disebut intractable di luar n yang kecil.',
        'Grafik ini punya batasan yang perlu diingat. Big-O menyembunyikan konstanta, sehingga metode O(n) dengan konstanta besar bisa kalah dari metode O(n²) untuk n kecil; kurva dengan konstanta 1 di sini tidak dapat menunjukkan itu. Big-O adalah batas atas pertumbuhan, biasanya untuk kasus terburuk, dan tidak mengatakan apa pun tentang memori, cache, atau kecepatan komputer tertentu. Kurva digambar juga untuk n bukan bilangan bulat, sehingga garis n! sebenarnya berbentuk tangga di antara bilangan bulat, dan legenda membulatkan nilai besar. Fungsi-fungsi ini adalah model algoritma, bukan hasil pengukuran program nyata.',
      ],
    },
    figure: {
      caption: {
        en: 'Operation counts on a log axis (each gridline is ×10). Dashed lines mark 10⁹ operations (one second at 1 ns each) and the age of the universe in seconds. 2ⁿ is a straight line; n! crosses the age of the universe before n = 20. The flat classes O(1) and O(log n) hug the axis and are omitted.',
        id: 'Jumlah operasi pada sumbu log (tiap garis kisi berarti ×10). Garis putus-putus menandai 10⁹ operasi (satu detik pada 1 ns per operasi) dan umur alam semesta dalam detik. 2ⁿ berupa garis lurus; n! melewati umur alam semesta sebelum n = 20. Kelas datar O(1) dan O(log n) menempel di sumbu dan tidak digambar.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        const X = (n) => 40 + n * 13.5, Y = (lg) => 215 - lg * 9.5;
        const fact = (n) => { let p = 1; for (let i = 2; i <= n; i++) p *= i; return p; };
        const line = (f, col) => `<polyline fill="none" stroke="${col}" stroke-width="2.2" points="${Array.from({ length: 20 }, (_, i) => i + 1).map((n) => `${X(n).toFixed(1)},${Y(Math.log10(Math.max(1, f(n)))).toFixed(1)}`).join(' ')}"/>`;
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Growth of complexity classes on a log scale', 'Pertumbuhan kelas kompleksitas pada skala log')}">
  <style>text{font:12px system-ui,sans-serif;fill:currentColor}.s{font-size:10px;opacity:.75}.m{fill:none;stroke:currentColor;stroke-width:1;opacity:.35}.lb{font-size:11px;font-weight:700}</style>
  <line x1="40" y1="25" x2="40" y2="215" class="m"/>
  <line x1="40" y1="215" x2="315" y2="215" class="m"/>
  ${[0, 5, 10, 15, 20].map((k) => `<line x1="37" y1="${Y(k)}" x2="40" y2="${Y(k)}" class="m"/><text x="34" y="${Y(k) + 4}" text-anchor="end" class="s">10${k === 0 ? '⁰' : k === 5 ? '⁵' : k === 10 ? '¹⁰' : k === 15 ? '¹⁵' : '²⁰'}</text>`).join('')}
  ${[5, 10, 15, 20].map((n) => `<line x1="${X(n)}" y1="215" x2="${X(n)}" y2="218" class="m"/><text x="${X(n)}" y="230" text-anchor="middle" class="s">${n}</text>`).join('')}
  <text x="358" y="230" text-anchor="end" class="s">n →</text>
  <line x1="40" y1="${Y(9)}" x2="315" y2="${Y(9)}" class="m" stroke-dasharray="4 4"/>
  <text x="44" y="${Y(9) - 3}" class="s">${L('10⁹ ops = 1 s at 1 ns each', '10⁹ operasi = 1 s pada 1 ns per operasi')}</text>
  <line x1="40" y1="${Y(17.6)}" x2="315" y2="${Y(17.6)}" class="m" stroke-dasharray="4 4"/>
  <text x="44" y="${Y(17.6) - 3}" class="s">${L('age of the universe in seconds (4 × 10¹⁷)', 'umur alam semesta dalam detik (4 × 10¹⁷)')}</text>
  ${line((n) => n, '#3b82f6')}
  ${line((n) => n * Math.log2(n), '#8b5cf6')}
  ${line((n) => n * n, '#10b981')}
  ${line((n) => Math.pow(2, n), '#f59e0b')}
  ${line(fact, '#ef4444')}
  <text x="320" y="${Y(Math.log10(fact(20))) + 4}" class="lb" style="fill:#ef4444">n!</text>
  <text x="320" y="${Y(Math.log10(Math.pow(2, 20))) + 4}" class="lb" style="fill:#f59e0b">2ⁿ</text>
  <text x="320" y="${Y(Math.log10(400)) - 2}" class="lb" style="fill:#10b981">n²</text>
  <text x="320" y="${Y(Math.log10(86.4)) + 7}" class="lb" style="fill:#8b5cf6">n log n</text>
  <text x="320" y="${Y(Math.log10(20)) + 14}" class="lb" style="fill:#3b82f6">n</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Big-O describes how the number of operations grows with n, ignoring constant factors and lower-order terms.',
        'For large n the classes rank 1, log n, n, n log n, n², 2ⁿ, n!, each eventually dwarfing the one before it.',
        'On a log scale an exponential is a straight line and a polynomial curves downward; factorial still curves upward.',
        'Polynomial algorithms are tractable; exponential and factorial ones become hopeless at a few dozen items (2³⁰ ≈ 10⁹, 30! ≈ 2.7 × 10³²).',
        'Big-O compares algorithms for large n; for small inputs hidden constants can decide which is actually faster.',
      ],
      id: [
        'Big-O menggambarkan bagaimana jumlah operasi bertambah terhadap n, dengan mengabaikan faktor konstan dan suku berorde lebih rendah.',
        'Untuk n besar kelas-kelasnya berurutan 1, log n, n, n log n, n², 2ⁿ, n!, dan masing-masing akhirnya jauh melampaui kelas sebelumnya.',
        'Pada skala log, eksponensial menjadi garis lurus dan polinomial melengkung ke bawah; faktorial tetap melengkung ke atas.',
        'Algoritma polinomial bersifat tractable; algoritma eksponensial dan faktorial menjadi tak tertangani pada beberapa puluh data saja (2³⁰ ≈ 10⁹, 30! ≈ 2,7 × 10³²).',
        'Big-O membandingkan algoritma untuk n besar; untuk masukan kecil, konstanta yang tersembunyi bisa menentukan mana yang sesungguhnya lebih cepat.',
      ],
    },
    vocabulary: {
      en: [
        ['Big-O notation', 'An upper bound on how an algorithm\'s operation count grows with input size, written O(f(n)).'],
        ['Input size (n)', 'The number of items the algorithm must process, such as the length of a list.'],
        ['Logarithm (log₂ n)', 'The number of times n can be halved before reaching 1; log₂ 1,000,000 ≈ 20.'],
        ['Polynomial time', 'Growth like n, n², n³: each doubling of n multiplies the work by a fixed factor.'],
        ['Exponential time', 'Growth like 2ⁿ: each extra item doubles the work.'],
        ['Factorial (n!)', 'The product 1 × 2 × … × n, the number of ways to order n items; 10! = 3,628,800.'],
        ['Tractable / intractable', 'Solvable in practice for realistic n (polynomial) versus hopeless beyond tiny n (exponential or worse).'],
        ['Asymptotic', 'Describing behaviour as n grows very large, which is what Big-O captures.'],
      ],
      id: [
        ['Notasi Big-O', 'Batas atas pertumbuhan jumlah operasi sebuah algoritma terhadap ukuran masukan, ditulis O(f(n)).'],
        ['Ukuran masukan (n)', 'Banyaknya data yang harus diproses algoritma, misalnya panjang sebuah daftar.'],
        ['Logaritma (log₂ n)', 'Berapa kali n dapat dibagi dua sebelum mencapai 1; log₂ 1.000.000 ≈ 20.'],
        ['Waktu polinomial', 'Pertumbuhan seperti n, n², n³: setiap penggandaan n mengalikan kerja dengan faktor tetap.'],
        ['Waktu eksponensial', 'Pertumbuhan seperti 2ⁿ: setiap tambahan satu data menggandakan kerja.'],
        ['Faktorial (n!)', 'Hasil kali 1 × 2 × … × n, banyaknya cara mengurutkan n data; 10! = 3.628.800.'],
        ['Tractable / intractable', 'Dapat diselesaikan dalam praktik untuk n yang realistis (polinomial) versus mustahil di luar n yang sangat kecil (eksponensial atau lebih buruk).'],
        ['Asimtotik', 'Menggambarkan perilaku ketika n menjadi sangat besar, yaitu yang ditangkap oleh Big-O.'],
      ],
    },
    misconceptions: {
      en: [
        ['O(n) means the algorithm takes n seconds, or exactly n steps.', 'Big-O gives only the growth shape. An O(n) algorithm may do 5n + 100 steps; the constants depend on the code and the machine and are deliberately left out.'],
        ['An O(n²) algorithm is always slower than an O(n log n) one.', 'Only for large enough n. For small arrays insertion sort (O(n²)) beats merge sort because its constant factor is tiny, which is why library sorts switch to it for short runs.'],
        ['2ⁿ and n! are about the same because both are huge.', 'n! grows far faster. At n = 20, 2ⁿ is about a million but n! is about 2.4 × 10¹⁸, a trillion times larger, and the gap keeps widening.'],
        ['On the log-scale chart 2ⁿ looks like a straight line, so it is not that bad.', 'The straight line hides that each gridline means ten times more work. The slope tells you the work multiplies by 2 for every extra item, which is exactly what makes it intractable.'],
      ],
      id: [
        ['O(n) berarti algoritmanya memakan n detik, atau tepat n langkah.', 'Big-O hanya memberi bentuk pertumbuhan. Algoritma O(n) bisa saja melakukan 5n + 100 langkah; konstantanya bergantung pada kode dan mesin, dan sengaja dihilangkan.'],
        ['Algoritma O(n²) selalu lebih lambat daripada algoritma O(n log n).', 'Hanya untuk n yang cukup besar. Untuk larik kecil insertion sort (O(n²)) mengalahkan merge sort karena faktor konstannya sangat kecil, itulah sebabnya pengurutan di pustaka beralih ke insertion sort untuk potongan pendek.'],
        ['2ⁿ dan n! kira-kira sama karena keduanya sangat besar.', 'n! tumbuh jauh lebih cepat. Pada n = 20, 2ⁿ sekitar satu juta tetapi n! sekitar 2,4 × 10¹⁸, satu triliun kali lebih besar, dan selisihnya terus melebar.'],
        ['Pada grafik skala log 2ⁿ tampak seperti garis lurus, jadi tidak seburuk itu.', 'Garis lurus itu menyembunyikan bahwa tiap garis kisi berarti kerja sepuluh kali lebih banyak. Kemiringannya menunjukkan kerja berlipat dua untuk setiap tambahan satu data, dan itulah yang membuatnya intractable.'],
      ],
    },
    realWorld: {
      en: [
        'Sorting a contact list or search results uses O(n log n) algorithms; an O(n²) sort on a million entries would take hours instead of a second.',
        'Database indexes are trees that find one row among billions in O(log n) steps, about 30 comparisons for a billion rows.',
        'Brute-forcing a password is exponential in its length: every extra character multiplies the attacker\'s work by the size of the alphabet.',
        'Visiting many cities in the shortest order (the travelling salesman problem) has n! possible routes, so planners rely on approximate heuristics rather than checking them all.',
      ],
      id: [
        'Mengurutkan daftar kontak atau hasil pencarian memakai algoritma O(n log n); pengurutan O(n²) pada satu juta entri akan memakan waktu berjam-jam, bukan sedetik.',
        'Indeks basis data berupa pohon yang menemukan satu baris di antara miliaran dalam O(log n) langkah, sekitar 30 perbandingan untuk satu miliar baris.',
        'Menebak kata sandi dengan brute force bersifat eksponensial terhadap panjangnya: setiap tambahan satu karakter mengalikan kerja penyerang dengan ukuran alfabet.',
        'Mengunjungi banyak kota dalam urutan terpendek (masalah travelling salesman) memiliki n! kemungkinan rute, sehingga perencana mengandalkan heuristik perkiraan, bukan memeriksa semuanya.',
      ],
    },
    questions: {
      en: [
        { q: 'When n doubles from 8 to 16, by what factor do n², 2ⁿ and n! grow?', a: 'n²: 64 → 256, a factor of 4. 2ⁿ: 256 → 65,536, a factor of 256 (the count is squared). n!: 40,320 → 20,922,789,888,000, a factor of 16 × 15 × … × 9 ≈ 5.2 × 10⁸.' },
        { q: 'If one operation takes 1 ns, how long do 2ⁿ and n! take at n = 30?', a: '2³⁰ ≈ 1.07 × 10⁹ operations ≈ 1.07 seconds. 30! ≈ 2.65 × 10³² operations ≈ 2.65 × 10²³ seconds ≈ 8 × 10¹⁵ years, roughly 600,000 times the age of the universe (1.4 × 10¹⁰ years).' },
        { q: 'A sorted list holds 1,000,000 names. About how many comparisons does binary search need, and linear search in the worst case? What happens to each if the list doubles?', a: 'Binary search halves the list each step: log₂(10⁶) ≈ 20 comparisons. Linear search may check all 10⁶. Doubling the list adds one comparison to binary search but doubles the linear search, which is the difference between O(log n) and O(n).' },
      ],
      id: [
        { q: 'Ketika n berlipat dua dari 8 menjadi 16, berapa kali n², 2ⁿ, dan n! bertambah?', a: 'n²: 64 → 256, faktor 4. 2ⁿ: 256 → 65.536, faktor 256 (hitungannya dikuadratkan). n!: 40.320 → 20.922.789.888.000, faktor 16 × 15 × … × 9 ≈ 5,2 × 10⁸.' },
        { q: 'Jika satu operasi memakan 1 ns, berapa lama 2ⁿ dan n! pada n = 30?', a: '2³⁰ ≈ 1,07 × 10⁹ operasi ≈ 1,07 detik. 30! ≈ 2,65 × 10³² operasi ≈ 2,65 × 10²³ detik ≈ 8 × 10¹⁵ tahun, kira-kira 600.000 kali umur alam semesta (1,4 × 10¹⁰ tahun).' },
        { q: 'Sebuah daftar terurut berisi 1.000.000 nama. Kira-kira berapa perbandingan yang dibutuhkan pencarian biner, dan pencarian linear pada kasus terburuk? Apa yang terjadi pada masing-masing jika daftarnya berlipat dua?', a: 'Pencarian biner membagi dua daftar tiap langkah: log₂(10⁶) ≈ 20 perbandingan. Pencarian linear bisa memeriksa semua 10⁶. Menggandakan daftar menambah satu perbandingan pada pencarian biner tetapi menggandakan pencarian linear; itulah perbedaan O(log n) dan O(n).' },
      ],
    },
  },
};
