// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Distinguish O(n²) from O(n log n) sorting visually.',
      'Identify each algorithm by its visual signature.',
      'Reason about how input size scales work performed.',
    ],
    id: [
      'Membedakan pengurutan O(n²) dan O(n log n) secara visual.',
      'Mengenali setiap algoritma dari pola visualnya.',
      'Menalar bagaimana ukuran input mempengaruhi jumlah operasi.',
    ],
  },  tryThis: {
    en: [
      'Run bubble sort and quicksort on size 60 and compare comparisons.',
      'Set Input order to Nearly sorted and watch insertion sort — it gets very fast.',
      'Predict which is faster on size 8: insertion or quicksort.',
    ],
    id: [
      'Jalankan bubble sort dan quicksort pada ukuran 60 lalu bandingkan jumlah perbandingannya.',
      'Atur Input order ke Nearly sorted dan amati insertion sort — kecepatannya meningkat tajam.',
      'Tebak mana yang lebih cepat pada ukuran 8: insertion atau quicksort.',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'Sorting means arranging a list in order, and it is one of the most studied problems in computer science because so much else depends on it: search results, leaderboards, databases and spreadsheets all sort constantly. Many different algorithms get the same sorted result, but they differ enormously in how much work they do. Computer scientists describe that work with big-O notation, which says how the number of basic steps grows as the input size n grows, ignoring constant factors. An O(n²) algorithm does roughly four times the work when n doubles; an O(n log n) algorithm does only a little more than twice as much.',
        'The three simple algorithms are all O(n²) because they repeatedly scan the unsorted part of the array. Bubble sort compares neighbours and swaps them when they are out of order, so the largest value "bubbles" to the end on each pass. Selection sort scans the remaining items for the smallest and swaps it into place; it always makes n(n − 1)/2 comparisons but at most n − 1 swaps. Insertion sort takes each new item and slides it leftward into the already sorted prefix, which makes it very fast on data that is nearly sorted. The two divide-and-conquer algorithms are much faster for large n. Merge sort halves the array, sorts each half, then merges them; it always takes about n log₂ n comparisons but needs a temporary array, which the sim counts as writes. Quick sort picks a pivot (here, the last element), partitions the array into items smaller and larger than the pivot, then recurses on each side; on average it needs about 1.39 n log₂ n comparisons and works in place, but with unlucky pivots it degrades to O(n²).',
        'The sim builds a random array of 8 to 100 values, lets you choose an algorithm and step speed, and runs the sort step by step. Bars being compared flash amber, bars known to be in their final place turn green, and the counters track comparisons, swaps and writes separately. The Lab panel lets you record the final counts for several sizes and plot them, so you can see the n² and n log n curves emerge from your own data.',
        'Remember what the counts do and do not tell you. They measure operations, not seconds: real running time also depends on memory access patterns and on constant factors that big-O hides, and for very small arrays a simple O(n²) algorithm can be the fastest choice. The Input order selector offers random, nearly sorted and reversed arrays (Shuffle makes a fresh one of the chosen kind), so you can trigger insertion sort\'s best case and the bad case of quick sort with last-element pivots, where a reversed or already sorted array makes it do O(n²) work. Production libraries combine ideas: they switch to insertion sort for tiny sub-arrays and choose pivots carefully to avoid the bad cases.',
      ],
      id: [
        'Mengurutkan berarti menyusun daftar menurut urutan, dan ini salah satu masalah yang paling banyak dipelajari dalam ilmu komputer karena begitu banyak hal lain bergantung padanya: hasil pencarian, papan peringkat, basis data, dan lembar kerja semuanya terus-menerus mengurutkan. Banyak algoritma berbeda menghasilkan urutan yang sama, tetapi jumlah kerjanya bisa sangat berbeda. Ilmuwan komputer menggambarkan kerja itu dengan notasi big-O, yang menyatakan bagaimana jumlah langkah dasar bertambah ketika ukuran masukan n bertambah, dengan mengabaikan faktor konstan. Algoritma O(n²) melakukan kira-kira empat kali kerja ketika n digandakan; algoritma O(n log n) hanya sedikit lebih dari dua kali.',
        'Ketiga algoritma sederhana semuanya O(n²) karena berulang kali menyapu bagian array yang belum terurut. Bubble sort membandingkan tetangga dan menukarnya jika urutannya salah, sehingga nilai terbesar "menggelembung" ke ujung pada tiap lintasan. Selection sort menyapu sisa item untuk mencari yang terkecil lalu menukarnya ke tempatnya; algoritma ini selalu melakukan n(n − 1)/2 perbandingan tetapi paling banyak n − 1 pertukaran. Insertion sort mengambil tiap item baru dan menggesernya ke kiri ke dalam awalan yang sudah terurut, sehingga sangat cepat pada data yang hampir terurut. Dua algoritma bagi-dan-taklukkan jauh lebih cepat untuk n besar. Merge sort membagi array menjadi dua, mengurutkan tiap bagian, lalu menggabungkannya; selalu butuh sekitar n log₂ n perbandingan tetapi memerlukan array sementara, yang dihitung sim sebagai penulisan. Quick sort memilih pivot (di sini, elemen terakhir), memartisi array menjadi item yang lebih kecil dan lebih besar dari pivot, lalu mengulang pada tiap sisi; rata-rata butuh sekitar 1,39 n log₂ n perbandingan dan bekerja di tempat, tetapi dengan pivot yang sial ia merosot menjadi O(n²).',
        'Sim ini membuat array acak berisi 8 sampai 100 nilai, membiarkanmu memilih algoritma dan kecepatan langkah, lalu menjalankan pengurutan langkah demi langkah. Batang yang sedang dibandingkan berkedip jingga, batang yang sudah pasti di posisi akhirnya berubah hijau, dan penghitung mencatat perbandingan, pertukaran, dan penulisan secara terpisah. Panel Lab memungkinkanmu mencatat hitungan akhir untuk beberapa ukuran dan memplotnya, sehingga kamu bisa melihat kurva n² dan n log n muncul dari datamu sendiri.',
        'Ingat apa yang dikatakan dan tidak dikatakan oleh hitungan itu. Hitungan mengukur operasi, bukan detik: waktu jalan sesungguhnya juga bergantung pada pola akses memori dan faktor konstan yang disembunyikan big-O, dan untuk array yang sangat kecil algoritma O(n²) sederhana bisa menjadi pilihan tercepat. Pemilih Input order menyediakan array acak, hampir terurut, dan terbalik (Shuffle membuat array baru dari jenis yang dipilih), sehingga kamu bisa memicu kasus terbaik insertion sort dan kasus buruk quick sort dengan pivot elemen terakhir, ketika array yang terbalik atau sudah terurut membuatnya melakukan kerja O(n²). Pustaka produksi menggabungkan berbagai ide: beralih ke insertion sort untuk sub-array mungil dan memilih pivot dengan hati-hati untuk menghindari kasus buruk.',
      ],
    },
    figure: {
      caption: {
        en: 'How the number of operations grows with array size n. The O(n²) curve (bubble, selection, insertion) shoots up, while the O(n log n) curve (merge, average quick sort) stays almost flat: at n = 80 that is about 3,160 comparisons against roughly 500.',
        id: 'Pertumbuhan jumlah operasi terhadap ukuran array n. Kurva O(n²) (bubble, selection, insertion) melesat naik, sedangkan kurva O(n log n) (merge, quick sort rata-rata) hampir datar: pada n = 80 sekitar 3.160 perbandingan berbanding kira-kira 500.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Growth of n squared versus n log n', 'Pertumbuhan n kuadrat dibandingkan n log n')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.m{fill:none;stroke:currentColor;stroke-width:1.2;opacity:.45}.f{stroke-width:2.4;fill:none}.s{font-size:9.5px;opacity:.85}.r{text-anchor:end}</style>
  <line x1="50" y1="30" x2="50" y2="200" class="m"/>
  <line x1="50" y1="200" x2="330" y2="200" class="m"/>
  <text x="50" y="213" class="s">0</text>
  <text x="190" y="213" class="s" text-anchor="middle">50</text>
  <text x="330" y="213" class="s" text-anchor="middle">100</text>
  <text x="330" y="226" class="r s">n (${L('array size', 'ukuran array')})</text>
  <text x="46" y="204" class="r s">0</text>
  <text x="46" y="119" class="r s">2,500</text>
  <text x="46" y="34" class="r s">5,000</text>
  <text transform="rotate(-90 12 120)" x="12" y="120" class="s" text-anchor="middle">${L('comparisons', 'perbandingan')}</text>
  <path d="M50 200 L78 198.5 L106 193.5 L134 185.2 L162 173.5 L190 158.4 L218 139.8 L246 117.9 L274 92.6 L302 63.8 L330 31.7" class="f" stroke="#ef4444"/>
  <path d="M50 200 L78 198.9 L106 197.1 L134 195 L162 192.8 L190 190.4 L218 188 L246 185.4 L274 182.8 L302 180.1 L330 177.4" class="f" stroke="#10b981"/>
  <line x1="274" y1="92.6" x2="274" y2="200" class="m" stroke-dasharray="3 3"/>
  <circle cx="274" cy="92.6" r="4" fill="#ef4444"/>
  <circle cx="274" cy="182.8" r="4" fill="#10b981"/>
  <text x="268" y="88" class="r s" fill="#ef4444">n = 80: 3,160</text>
  <text x="268" y="176" class="r s" fill="#10b981">n = 80: 506</text>
  <text x="58" y="62" fill="#ef4444">O(n²): bubble, selection, insertion</text>
  <text x="58" y="75" class="s" fill="#ef4444">n(n − 1)/2 ${L('comparisons', 'perbandingan')}</text>
  <text x="326" y="164" class="r" fill="#10b981">O(n log n): merge, quick (${L('average', 'rata-rata')})</text>
  <text x="50" y="238" class="s">${L('doubling n: about 4× the work for n², about 2.2× for n log n', 'menggandakan n: kerja sekitar 4× untuk n², sekitar 2,2× untuk n log n')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Big-O notation describes how the work grows with input size, not how many seconds a run takes.',
        'Bubble, selection and insertion sort are O(n²): doubling the array roughly quadruples the comparisons.',
        'Merge sort and (on average) quick sort are O(n log n): doubling the array little more than doubles the work, which is what makes sorting a million items practical.',
        'The best algorithm depends on the data and the constraints: insertion sort wins on tiny or nearly sorted arrays, merge sort is predictable but needs extra memory, quick sort is fast on average but has an O(n²) worst case.',
        'Comparisons and data movement are separate costs: selection sort makes very few swaps but just as many comparisons as bubble sort.',
      ],
      id: [
        'Notasi big-O menggambarkan bagaimana kerja bertambah dengan ukuran masukan, bukan berapa detik sebuah proses berjalan.',
        'Bubble, selection, dan insertion sort adalah O(n²): menggandakan array kira-kira melipatempatkan jumlah perbandingan.',
        'Merge sort dan (rata-rata) quick sort adalah O(n log n): menggandakan array hanya sedikit lebih dari menggandakan kerja, inilah yang membuat mengurutkan sejuta item menjadi praktis.',
        'Algoritma terbaik bergantung pada data dan batasannya: insertion sort menang pada array mungil atau hampir terurut, merge sort dapat diprediksi tetapi butuh memori tambahan, quick sort cepat rata-rata tetapi punya kasus terburuk O(n²).',
        'Perbandingan dan pemindahan data adalah biaya yang terpisah: selection sort melakukan sangat sedikit pertukaran tetapi perbandingannya sama banyak dengan bubble sort.',
      ],
    },
    vocabulary: {
      en: [
        ['Algorithm', 'A precise, step-by-step procedure for solving a problem, such as putting a list in order.'],
        ['Comparison', 'Checking which of two values is larger; the basic step counted when analysing sorting algorithms.'],
        ['Swap', 'Exchanging the positions of two elements in the array.'],
        ['Big-O notation', 'A way of describing how an algorithm\'s cost grows with input size n, keeping only the fastest-growing term and dropping constant factors.'],
        ['Divide and conquer', 'Solving a problem by splitting it into smaller pieces, solving those, and combining the results; the strategy behind merge sort and quick sort.'],
        ['Pivot', 'The element quick sort uses to split the array into smaller and larger parts.'],
        ['In-place', 'An algorithm that sorts within the original array using only a constant amount of extra memory, unlike merge sort.'],
        ['Worst case', 'The input that makes an algorithm do the most work; for quick sort with a last-element pivot, an already sorted array.'],
      ],
      id: [
        ['Algoritma', 'Prosedur langkah demi langkah yang tepat untuk memecahkan masalah, misalnya menyusun daftar menurut urutan.'],
        ['Perbandingan', 'Memeriksa mana dari dua nilai yang lebih besar; langkah dasar yang dihitung saat menganalisis algoritma pengurutan.'],
        ['Pertukaran (swap)', 'Menukar posisi dua elemen dalam array.'],
        ['Notasi big-O', 'Cara menggambarkan bagaimana biaya algoritma bertambah dengan ukuran masukan n, hanya menyimpan suku yang tumbuh paling cepat dan membuang faktor konstan.'],
        ['Bagi dan taklukkan', 'Memecahkan masalah dengan membaginya menjadi bagian-bagian kecil, menyelesaikannya, lalu menggabungkan hasilnya; strategi di balik merge sort dan quick sort.'],
        ['Pivot', 'Elemen yang dipakai quick sort untuk membagi array menjadi bagian yang lebih kecil dan lebih besar.'],
        ['Di tempat (in-place)', 'Algoritma yang mengurutkan di dalam array aslinya dengan memori tambahan yang tetap, tidak seperti merge sort.'],
        ['Kasus terburuk', 'Masukan yang membuat algoritma bekerja paling banyak; untuk quick sort dengan pivot elemen terakhir, array yang sudah terurut.'],
      ],
    },
    misconceptions: {
      en: [
        ['An O(n log n) algorithm is always faster than an O(n²) one.', 'Big-O describes growth for large n and hides constant factors. For a dozen items insertion sort usually beats quick sort, which is why real libraries switch to insertion sort for small sub-arrays.'],
        ['Fewer swaps means a faster algorithm.', 'Selection sort makes at most n − 1 swaps, yet it still performs n(n − 1)/2 comparisons, the same as bubble sort. Both kinds of operation cost time, and comparisons usually dominate.'],
        ['Quick sort is always quick.', 'With poorly chosen pivots, for example the last element of an already sorted array, quick sort does O(n²) work. Randomised or median-of-three pivots make the bad case extremely unlikely.'],
        ['Computers are so fast that algorithm choice does not matter.', 'For a billion items, n² is 10¹⁸ steps, roughly thirty years at a billion steps per second, while n log n is about 3 × 10¹⁰ steps, half a minute. At scale the algorithm matters far more than the hardware.'],
      ],
      id: [
        ['Algoritma O(n log n) selalu lebih cepat daripada yang O(n²).', 'Big-O menggambarkan pertumbuhan untuk n besar dan menyembunyikan faktor konstan. Untuk selusin item, insertion sort biasanya mengalahkan quick sort, itulah sebabnya pustaka sungguhan beralih ke insertion sort untuk sub-array kecil.'],
        ['Lebih sedikit pertukaran berarti algoritma lebih cepat.', 'Selection sort paling banyak melakukan n − 1 pertukaran, tetapi tetap melakukan n(n − 1)/2 perbandingan, sama seperti bubble sort. Kedua jenis operasi memakan waktu, dan perbandingan biasanya yang dominan.'],
        ['Quick sort selalu cepat.', 'Dengan pivot yang dipilih buruk, misalnya elemen terakhir dari array yang sudah terurut, quick sort melakukan kerja O(n²). Pivot acak atau median-dari-tiga membuat kasus buruk itu sangat kecil kemungkinannya.'],
        ['Komputer begitu cepat sehingga pilihan algoritma tidak penting.', 'Untuk satu miliar item, n² adalah 10¹⁸ langkah, kira-kira tiga puluh tahun pada satu miliar langkah per detik, sedangkan n log n sekitar 3 × 10¹⁰ langkah, setengah menit. Pada skala besar algoritma jauh lebih menentukan daripada perangkat kerasnya.'],
      ],
    },
    realWorld: {
      en: [
        'Python\'s built-in sort and Java\'s sort for objects use Timsort, a hybrid of merge sort and insertion sort that exploits runs of already ordered data.',
        'C++\'s standard sort is typically introsort: quick sort that switches to heap sort if the recursion gets too deep and to insertion sort for small pieces, avoiding the O(n²) trap.',
        'Databases sort and index millions of records so that a search returns in milliseconds; a poor algorithm would make even a simple query take minutes.',
        'Spreadsheets, music players and online shops sort by price, date or rating constantly; every "sort by" button runs one of these algorithms.',
      ],
      id: [
        'Fungsi sort bawaan Python dan sort untuk objek di Java memakai Timsort, gabungan merge sort dan insertion sort yang memanfaatkan deretan data yang sudah terurut.',
        'Sort standar C++ biasanya introsort: quick sort yang beralih ke heap sort jika rekursinya terlalu dalam dan ke insertion sort untuk bagian kecil, menghindari jebakan O(n²).',
        'Basis data mengurutkan dan mengindeks jutaan rekaman agar pencarian kembali dalam milidetik; algoritma yang buruk akan membuat kueri sederhana pun memakan waktu bermenit-menit.',
        'Lembar kerja, pemutar musik, dan toko daring terus-menerus mengurutkan menurut harga, tanggal, atau peringkat; setiap tombol "urutkan berdasarkan" menjalankan salah satu algoritma ini.',
      ],
    },
    questions: {
      en: [
        { q: 'Run bubble sort on arrays of size 30 and 60 and note the comparison counts. What values should you see, and what is their ratio?', a: 'This bubble sort always makes n(n − 1)/2 comparisons: 30 × 29 / 2 = 435 for n = 30 and 60 × 59 / 2 = 1,770 for n = 60. The ratio is about 4.1, close to the factor of 4 expected for O(n²).' },
        { q: 'Merge sort on 64 elements. How many writes should the sim count, and why?', a: 'Halving 64 repeatedly takes log₂ 64 = 6 levels, and at every level each of the 64 elements is written back once during merging, so the sim counts 64 × 6 = 384 writes. The comparison count is a little lower and varies with the data.' },
        { q: 'Why does selection sort make exactly the same number of comparisons on every array of a given size, while insertion sort\'s count changes from run to run?', a: 'Selection sort cannot know which remaining item is smallest without comparing against every one, so it always scans the whole unsorted part: n(n − 1)/2 comparisons regardless of order. Insertion sort stops sliding an item as soon as it finds its place, so nearly sorted data needs about n comparisons while reversed data needs about n²/2.' },
      ],
      id: [
        { q: 'Jalankan bubble sort pada array berukuran 30 dan 60 dan catat jumlah perbandingannya. Nilai apa yang seharusnya terlihat, dan berapa rasionya?', a: 'Bubble sort ini selalu melakukan n(n − 1)/2 perbandingan: 30 × 29 / 2 = 435 untuk n = 30 dan 60 × 59 / 2 = 1.770 untuk n = 60. Rasionya sekitar 4,1, dekat dengan faktor 4 yang diharapkan untuk O(n²).' },
        { q: 'Merge sort pada 64 elemen. Berapa penulisan yang seharusnya dihitung sim, dan mengapa?', a: 'Membagi dua 64 secara berulang memerlukan log₂ 64 = 6 tingkat, dan pada setiap tingkat masing-masing dari 64 elemen ditulis kembali sekali saat penggabungan, sehingga sim menghitung 64 × 6 = 384 penulisan. Jumlah perbandingannya sedikit lebih rendah dan berubah menurut datanya.' },
        { q: 'Mengapa selection sort melakukan jumlah perbandingan yang persis sama pada setiap array berukuran tertentu, sedangkan jumlah pada insertion sort berubah dari satu percobaan ke percobaan lain?', a: 'Selection sort tidak bisa mengetahui item sisa mana yang terkecil tanpa membandingkannya dengan semua item, sehingga selalu menyapu seluruh bagian yang belum terurut: n(n − 1)/2 perbandingan apa pun urutannya. Insertion sort berhenti menggeser sebuah item begitu menemukan tempatnya, sehingga data yang hampir terurut hanya butuh sekitar n perbandingan sedangkan data terbalik butuh sekitar n²/2.' },
      ],
    },
  },
};
