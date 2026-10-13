// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'See exponential blow-up of naive recursion.',
      'Watch memoization prune the call tree.',
      'Compare call counts: naive vs memoized vs iterative.',
    ],
    id: [
      'Melihat ledakan eksponensial rekursi naif.',
      'Mengamati memoisasi memangkas pohon panggilan.',
      'Membandingkan hitungan panggilan: naif vs memoisasi vs iteratif.',
    ],
  },  tryThis: {
    en: [
      'fib(10) naive — how many calls?',
      'Same n with memoization — how many?',
      "Try n = 30 naive vs memoized.",
    ],
    id: [
      'fib(10) naif — berapa panggilan?',
      'n yang sama dengan memoisasi — berapa?',
      'Coba n = 30 naif vs memoisasi.',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'The Fibonacci numbers are defined by their own recipe: fib(0) = 0, fib(1) = 1, and every later number is the sum of the two before it, fib(n) = fib(n − 1) + fib(n − 2), giving 0, 1, 1, 2, 3, 5, 8, 13, 21, … A recursive function copies that definition word for word: to compute fib(n) it calls itself for n − 1 and for n − 2 and adds the results, stopping at the base cases fib(1) and fib(0). The simulation draws every call as a circle labelled with its n; the two calls it makes hang beneath it, and the base cases are the leaves in yellow. The value of the root and the total number of calls are printed at the top.',
        'The naive version is correct but wasteful. fib(n) calls fib(n − 1) and fib(n − 2), but fib(n − 1) also calls fib(n − 2), so the same subproblem is solved again, and the duplication multiplies at every level: in the tree for fib(5), fib(3) is computed twice and fib(2) three times. The number of calls C(n) obeys C(n) = 1 + C(n − 1) + C(n − 2), which works out to 2·fib(n + 1) − 1: 25 calls for fib(6), 177 for fib(10), 465 for fib(12), about 2.7 million for fib(30) and 331 million for fib(40). Each step up in n multiplies the work by about 1.618, the golden ratio, so the naive algorithm is exponential, O(φⁿ), for a result that itself only needs a few digits.',
        'Memoization fixes this with a lookup table: before computing fib(k), check whether it was already computed, and if so return the stored value at once; otherwise compute it and store it. In memoized mode the simulation colours such instant answers green and draws no children beneath them, so the bushy tree collapses to a single spine with one green leaf hanging off each node. Every value fib(0) … fib(n) is now computed exactly once, so the work is O(n), at the price of O(n) memory for the table. Read the counters carefully: the "calls" number at the top counts every call including the green cache hits, so for n ≥ 2 it shows 2n − 1, while the summary row\'s "memoized = n + 1" counts only the distinct values actually computed, and "iterative = n" counts the loop steps of a bottom-up version that keeps just the last two numbers in two variables.',
        'Memoization (top-down, with a cache) and iteration (bottom-up, filling values from small to large) are the two faces of dynamic programming, and both rely on the problem having overlapping subproblems; recursion without repetition, such as binary search, gains nothing from a cache. The simulation keeps n at or below 12 so the tree stays legible (the naive tree for 12 already has 465 nodes), it rebuilds the tree every frame, and it does not show memory use or running time directly. Beyond the sim, there are even faster methods: a closed formula (Binet) and a matrix method that reaches fib(n) in O(log n) steps. Finally, the numbers themselves grow quickly: fib(78) is already about 8.9 × 10¹⁵, the largest Fibonacci number JavaScript can hold exactly in an ordinary number.',
      ],
      id: [
        'Bilangan Fibonacci didefinisikan oleh resepnya sendiri: fib(0) = 0, fib(1) = 1, dan setiap bilangan berikutnya adalah jumlah dua bilangan sebelumnya, fib(n) = fib(n − 1) + fib(n − 2), menghasilkan 0, 1, 1, 2, 3, 5, 8, 13, 21, … Fungsi rekursif meniru definisi itu kata demi kata: untuk menghitung fib(n) ia memanggil dirinya sendiri untuk n − 1 dan n − 2 lalu menjumlahkan hasilnya, berhenti pada kasus dasar fib(1) dan fib(0). Simulasi menggambar setiap panggilan sebagai lingkaran berlabel n; dua panggilan yang dibuatnya menggantung di bawahnya, dan kasus dasar menjadi daun berwarna kuning. Nilai akar dan jumlah total panggilan dicetak di bagian atas.',
        'Versi naif memang benar tetapi boros. fib(n) memanggil fib(n − 1) dan fib(n − 2), tetapi fib(n − 1) juga memanggil fib(n − 2), sehingga submasalah yang sama dihitung lagi, dan pengulangan itu berlipat di setiap tingkat: pada pohon fib(5), fib(3) dihitung dua kali dan fib(2) tiga kali. Jumlah panggilan C(n) memenuhi C(n) = 1 + C(n − 1) + C(n − 2), yang hasilnya 2·fib(n + 1) − 1: 25 panggilan untuk fib(6), 177 untuk fib(10), 465 untuk fib(12), sekitar 2,7 juta untuk fib(30), dan 331 juta untuk fib(40). Setiap kenaikan n mengalikan kerja sekitar 1,618, rasio emas, sehingga algoritma naif bersifat eksponensial, O(φⁿ), untuk hasil yang hanya butuh beberapa digit.',
        'Memoisasi memperbaikinya dengan tabel simpanan: sebelum menghitung fib(k), periksa apakah nilainya sudah pernah dihitung; jika ya, langsung kembalikan nilai tersimpan; jika belum, hitung lalu simpan. Pada mode memoisasi, simulasi mewarnai jawaban instan itu hijau dan tidak menggambar anak di bawahnya, sehingga pohon yang rimbun menyusut menjadi satu tulang punggung dengan satu daun hijau menggantung di tiap simpul. Setiap nilai fib(0) … fib(n) kini dihitung tepat sekali, sehingga kerjanya O(n), dengan harga memori O(n) untuk tabel. Baca penghitungnya dengan cermat: angka "calls" di atas menghitung setiap panggilan termasuk cache hit hijau, sehingga untuk n ≥ 2 ia menunjukkan 2n − 1, sedangkan "memoized = n + 1" pada baris ringkasan hanya menghitung nilai berbeda yang benar-benar dihitung, dan "iterative = n" menghitung langkah perulangan versi bawah-ke-atas yang hanya menyimpan dua bilangan terakhir dalam dua variabel.',
        'Memoisasi (atas-ke-bawah, dengan cache) dan iterasi (bawah-ke-atas, mengisi nilai dari kecil ke besar) adalah dua wajah pemrograman dinamis, dan keduanya mengandalkan adanya submasalah yang tumpang tindih; rekursi tanpa pengulangan, seperti pencarian biner, tidak mendapat apa-apa dari cache. Simulasi membatasi n paling besar 12 agar pohonnya tetap terbaca (pohon naif untuk 12 sudah berisi 465 simpul), membangun ulang pohon setiap frame, dan tidak menampilkan pemakaian memori atau waktu jalan secara langsung. Di luar simulasi, ada metode yang lebih cepat lagi: rumus tertutup (Binet) dan metode matriks yang mencapai fib(n) dalam O(log n) langkah. Terakhir, bilangannya sendiri tumbuh cepat: fib(78) sudah sekitar 8,9 × 10¹⁵, bilangan Fibonacci terbesar yang bisa disimpan JavaScript secara eksak dalam bilangan biasa.',
      ],
    },
    figure: {
      caption: {
        en: 'Left: the naive call tree for fib(5) has 15 calls; the dashed boxes show fib(3) being computed twice from scratch. Right: with memoization, every repeated call (green) is answered from the cache instantly, so only 6 distinct values are computed and the counter reads 9 calls.',
        id: 'Kiri: pohon panggilan naif untuk fib(5) berisi 15 panggilan; kotak putus-putus menunjukkan fib(3) dihitung dua kali dari awal. Kanan: dengan memoisasi, setiap panggilan berulang (hijau) dijawab seketika dari cache, sehingga hanya 6 nilai berbeda yang dihitung dan penghitung menunjukkan 9 panggilan.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        const node = (x, y, n, kind) => `<circle cx="${x}" cy="${y}" r="9" fill="${kind === 'hit' ? '#10b981' : kind === 'leaf' ? '#f59e0b' : '#3b82f6'}"/><text x="${x}" y="${y + 4}" text-anchor="middle" class="wt">${n}</text>`;
        const edge = (x1, y1, x2, y2) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="m"/>`;
        // naive tree: [x, y, n, kind, parentIndex]
        const N = [[140, 30, 5, 'in', -1], [88, 70, 4, 'in', 0], [193, 70, 3, 'in', 0], [58, 110, 3, 'in', 1], [118, 110, 2, 'in', 1], [172, 110, 2, 'in', 2], [213, 110, 1, 'leaf', 2], [38, 150, 2, 'in', 3], [78, 150, 1, 'leaf', 3], [105, 150, 1, 'leaf', 4], [132, 150, 0, 'leaf', 4], [159, 150, 1, 'leaf', 5], [186, 150, 0, 'leaf', 5], [24, 190, 1, 'leaf', 7], [51, 190, 0, 'leaf', 7]];
        const M = [[285, 30, 5, 'in', -1], [275, 70, 4, 'in', 0], [325, 70, 3, 'hit', 0], [265, 110, 3, 'in', 1], [315, 110, 2, 'hit', 1], [255, 150, 2, 'in', 3], [305, 150, 1, 'hit', 3], [242, 190, 1, 'leaf', 5], [268, 190, 0, 'leaf', 5]];
        const tree = (T) => T.filter((t) => t[4] >= 0).map((t) => edge(T[t[4]][0], T[t[4]][1], t[0], t[1])).join('') + T.map((t) => node(t[0], t[1], t[2], t[3])).join('');
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Call tree of fib(5), naive and memoized', 'Pohon panggilan fib(5), naif dan dengan memoisasi')}">
  <style>text{font:12px system-ui,sans-serif;fill:currentColor}.wt{fill:#fff;font-weight:700;font-size:10px;font-family:ui-monospace,monospace}.s{font-size:10px;opacity:.75}.m{fill:none;stroke:currentColor;stroke-width:1.2;opacity:.45}.d{fill:none;stroke:#ef4444;stroke-width:1.3;stroke-dasharray:4 3}</style>
  <text x="12" y="14" style="font-weight:700">${L('naive: 15 calls', 'naif: 15 panggilan')}</text>
  <text x="236" y="14" style="font-weight:700">${L('memoized', 'memoisasi')}</text>
  <rect x="12" y="96" width="80" height="108" rx="8" class="d"/>
  <rect x="147" y="56" width="80" height="108" rx="8" class="d"/>
  ${tree(N)}
  ${tree(M)}
  <text x="40" y="222" class="s" style="fill:#ef4444">${L('fib(3) solved twice', 'fib(3) dihitung dua kali')}</text>
  <text x="196" y="222" class="s" style="fill:#10b981">${L('green = answered from cache', 'hijau = dijawab dari cache')}</text>
  <text x="196" y="235" class="s">${L('9 calls, 6 values computed', '9 panggilan, 6 nilai dihitung')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Recursion that recomputes the same subproblems is exponentially slow: naive fib makes 2·fib(n + 1) − 1 calls, about 1.618 times more for each step in n.',
        'Memoization stores each result in a cache so every subproblem is solved once: O(n) calls instead of O(φⁿ).',
        'The call tree makes the waste visible: in fib(5) the subtree for fib(3) appears twice and fib(2) three times.',
        'Top-down memoization and bottom-up iteration are both dynamic programming; the iterative version also needs only O(1) memory.',
        'A cache trades memory for time; it helps only when subproblems overlap.',
      ],
      id: [
        'Rekursi yang menghitung ulang submasalah yang sama sangat lambat secara eksponensial: fib naif membuat 2·fib(n + 1) − 1 panggilan, sekitar 1,618 kali lebih banyak untuk tiap kenaikan n.',
        'Memoisasi menyimpan tiap hasil dalam cache sehingga setiap submasalah dihitung sekali: O(n) panggilan, bukan O(φⁿ).',
        'Pohon panggilan membuat pemborosan itu terlihat: pada fib(5) subpohon fib(3) muncul dua kali dan fib(2) tiga kali.',
        'Memoisasi atas-ke-bawah dan iterasi bawah-ke-atas sama-sama pemrograman dinamis; versi iteratif bahkan hanya butuh memori O(1).',
        'Cache menukar memori dengan waktu; ia hanya membantu bila submasalahnya tumpang tindih.',
      ],
    },
    vocabulary: {
      en: [
        ['Recursion', 'A function that solves a problem by calling itself on smaller inputs until it reaches a base case.'],
        ['Base case', 'An input the function answers directly without recursing; here fib(0) = 0 and fib(1) = 1.'],
        ['Call tree', 'A diagram with one node per function call and edges to the calls it makes.'],
        ['Memoization', 'Remembering the result of each call in a table so a repeated call is answered from the table.'],
        ['Cache hit', 'A call whose answer is already in the table; shown in green in the simulation.'],
        ['Dynamic programming', 'Solving a problem by combining solutions to overlapping subproblems, each computed once.'],
        ['Overlapping subproblems', 'The property that the same smaller problem is needed many times, which makes caching worthwhile.'],
        ['Golden ratio (φ ≈ 1.618)', 'The limit of the ratio between consecutive Fibonacci numbers, and the growth factor of the naive call count.'],
      ],
      id: [
        ['Rekursi', 'Fungsi yang memecahkan masalah dengan memanggil dirinya sendiri pada masukan yang lebih kecil sampai mencapai kasus dasar.'],
        ['Kasus dasar', 'Masukan yang dijawab fungsi secara langsung tanpa rekursi; di sini fib(0) = 0 dan fib(1) = 1.'],
        ['Pohon panggilan', 'Diagram dengan satu simpul per panggilan fungsi dan garis ke panggilan-panggilan yang dibuatnya.'],
        ['Memoisasi', 'Mengingat hasil tiap panggilan dalam tabel sehingga panggilan berulang dijawab dari tabel.'],
        ['Cache hit', 'Panggilan yang jawabannya sudah ada di tabel; ditampilkan hijau dalam simulasi.'],
        ['Pemrograman dinamis', 'Memecahkan masalah dengan menggabungkan solusi submasalah yang tumpang tindih, masing-masing dihitung sekali.'],
        ['Submasalah tumpang tindih', 'Sifat bahwa masalah kecil yang sama dibutuhkan berkali-kali, yang membuat cache berguna.'],
        ['Rasio emas (φ ≈ 1,618)', 'Limit perbandingan dua bilangan Fibonacci berurutan, sekaligus faktor pertumbuhan jumlah panggilan naif.'],
      ],
    },
    misconceptions: {
      en: [
        ['Recursion is always slow.', 'Recursion is slow only when it repeats work. Memoized recursion is as fast as a loop, and recursive binary search or merge sort are efficient because no subproblem is solved twice.'],
        ['Memoization changes the answer, or is an approximation.', 'The result is identical; the cache only avoids recomputing values that were already found.'],
        ['Naive fib(40) takes about 40 steps.', 'It makes 2·fib(41) − 1 = 331,160,281 calls. The depth of the tree is 40, but its width grows exponentially.'],
        ['The number of calls equals fib(n).', 'It is 2·fib(n + 1) − 1, about 3.2 times fib(n). For n = 10 the value is 55 but the naive call count is 177.'],
      ],
      id: [
        ['Rekursi selalu lambat.', 'Rekursi lambat hanya jika mengulang kerja. Rekursi dengan memoisasi secepat perulangan, dan pencarian biner atau merge sort rekursif efisien karena tidak ada submasalah yang dihitung dua kali.'],
        ['Memoisasi mengubah jawaban, atau hanya pendekatan.', 'Hasilnya identik; cache hanya menghindari penghitungan ulang nilai yang sudah ditemukan.'],
        ['fib(40) naif butuh sekitar 40 langkah.', 'Ia membuat 2·fib(41) − 1 = 331.160.281 panggilan. Kedalaman pohonnya 40, tetapi lebarnya tumbuh eksponensial.'],
        ['Jumlah panggilan sama dengan fib(n).', 'Jumlahnya 2·fib(n + 1) − 1, sekitar 3,2 kali fib(n). Untuk n = 10 nilainya 55 tetapi jumlah panggilan naifnya 177.'],
      ],
    },
    realWorld: {
      en: [
        'Spell checkers and DNA sequence alignment compute edit distances with dynamic programming tables, the same idea as memoized Fibonacci.',
        'Route planners and shortest-path algorithms reuse the best path to each intermediate point instead of re-exploring it.',
        'Web servers, databases and browsers cache the results of expensive requests so repeated requests are answered instantly.',
        'User-interface libraries memoize rendered components and computed values so that unchanged parts of a page are not rebuilt.',
      ],
      id: [
        'Pemeriksa ejaan dan penjajaran urutan DNA menghitung jarak edit dengan tabel pemrograman dinamis, gagasan yang sama dengan Fibonacci bermemoisasi.',
        'Perencana rute dan algoritma lintasan terpendek memakai ulang lintasan terbaik ke tiap titik antara, bukan menjelajahinya lagi.',
        'Server web, basis data, dan peramban menyimpan hasil permintaan yang mahal dalam cache agar permintaan berulang dijawab seketika.',
        'Pustaka antarmuka pengguna memoisasi komponen dan nilai hasil hitung agar bagian halaman yang tidak berubah tidak dibangun ulang.',
      ],
    },
    questions: {
      en: [
        { q: 'How many calls does naive fib(10) make, and what does the counter show in memoized mode for the same n?', a: 'Naive: 2·fib(11) − 1 = 2·89 − 1 = 177 calls. Memoized: the counter shows 2·10 − 1 = 19 calls, of which 9 are green cache hits; only the 11 values fib(0) … fib(10) are actually computed.' },
        { q: 'In naive mode, by roughly what factor does the call count grow when n increases by 1, and by 5? Why?', a: 'By about 1.618 per step, and 1.618⁵ ≈ 11 for five steps. The call count satisfies the same recurrence as the Fibonacci numbers, C(n) = 1 + C(n − 1) + C(n − 2), so it grows like the golden ratio to the power n.' },
        { q: 'Both the memoized and the iterative versions are O(n) in time. Why does the iterative one use less memory?', a: 'Memoization keeps a table of all n + 1 values plus a recursion stack n calls deep. The iterative loop only needs the previous two numbers at any moment, so its memory is constant, O(1).' },
      ],
      id: [
        { q: 'Berapa panggilan yang dibuat fib(10) naif, dan apa yang ditunjukkan penghitung pada mode memoisasi untuk n yang sama?', a: 'Naif: 2·fib(11) − 1 = 2·89 − 1 = 177 panggilan. Memoisasi: penghitung menunjukkan 2·10 − 1 = 19 panggilan, 9 di antaranya cache hit hijau; hanya 11 nilai fib(0) … fib(10) yang benar-benar dihitung.' },
        { q: 'Pada mode naif, kira-kira berapa kali jumlah panggilan bertambah ketika n naik 1, dan ketika naik 5? Mengapa?', a: 'Sekitar 1,618 kali per langkah, dan 1,618⁵ ≈ 11 kali untuk lima langkah. Jumlah panggilan memenuhi relasi rekurens yang sama dengan bilangan Fibonacci, C(n) = 1 + C(n − 1) + C(n − 2), sehingga tumbuh seperti rasio emas pangkat n.' },
        { q: 'Versi memoisasi dan versi iteratif sama-sama O(n) dalam waktu. Mengapa versi iteratif memakai memori lebih sedikit?', a: 'Memoisasi menyimpan tabel berisi semua n + 1 nilai ditambah tumpukan rekursi sedalam n panggilan. Perulangan iteratif hanya butuh dua bilangan sebelumnya pada tiap saat, sehingga memorinya konstan, O(1).' },
      ],
    },
  },
};
