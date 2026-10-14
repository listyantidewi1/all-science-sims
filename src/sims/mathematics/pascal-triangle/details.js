// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'See that C(n, k) = C(n−1, k−1) + C(n−1, k) is just "sum of two above".',
      'Connect path counting to combinations: each step left or right is a binary choice.',
      'Spot Sierpinski-like fractal in the parity (odd cells form a self-similar shape).',
    ],
    id: [
      'Melihat bahwa C(n, k) = C(n−1, k−1) + C(n−1, k) hanyalah "jumlah dua di atas".',
      'Menghubungkan pencacahan jalur dengan kombinasi: tiap langkah kiri/kanan adalah pilihan biner.',
      'Mengamati fraktal mirip Sierpinski di paritas (sel ganjil membentuk bentuk swa-mirip).',
    ],
  },  tryThis: {
    en: [
      'Click row 4, column 2 — count says 6 = C(4, 2).',
      'Toggle "show parity" — odd cells form a Sierpinski-style shape.',
      'Read the diagonals: 1\'s, counting numbers, triangular numbers, tetrahedral numbers...',
    ],
    id: [
      'Klik baris 4, kolom 2 — angkanya 6 = C(4, 2).',
      'Aktifkan "tampilkan paritas" — sel ganjil membentuk pola gaya Sierpinski.',
      'Baca diagonal: 1, bilangan asli, bilangan segitiga, bilangan tetrahedral…',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'Pascal\'s triangle is built from one rule. Start with a single 1 at the top. Every cell below is the sum of the two cells diagonally above it, and the cells on the edges, which have only one neighbour above, are always 1. Rows are numbered from 0 at the top, and positions within a row are numbered from 0 on the left, so the cell "row 4, position 2" is the 6 in the middle of the fifth row. The sim builds up to 20 rows this way; the numbers grow fast, reaching 184 756 in the middle of row 20.',
        'The triangle secretly counts paths. Imagine walking down from the top, taking one step at a time, either down-left or down-right. To reach position k in row n you must take exactly n steps, and exactly k of them must be right-steps. The number of ways to do that is the number of ways to choose which k of the n steps go right, written C(n, k) and read "n choose k". The sum rule follows at once: the last step into a cell came either from the cell above-left or from the cell above-right, so the paths into it are the paths into those two cells added together. Click any cell and the sim colours every cell that lies on at least one path from the apex and reports C(n, k).',
        'Because C(n, k) counts choices, the triangle shows up wherever we choose k things from n: how many ways to pick 2 students from 4 (6), how many ways to get 2 heads in 4 coin flips (6 out of 16), or the coefficients when (a + b)^n is multiplied out. Other patterns are waiting in the rows and diagonals: each row adds up to 2^n, each row reads the same backwards, the second diagonal holds the counting numbers and the third holds the triangular numbers 1, 3, 6, 10, 15. Switch on the parity toggle and the odd cells form the Sierpinski triangle, because odd + odd and even + even are both even, so the pattern of parities repeats itself at double size.',
        'Two details are easy to misread. The green highlight marks the union of cells visited by all paths to the selected cell, not the paths one by one, so the number of green cells is not the path count; the count is the number in the cell itself. And because rows start from 0, the row slider value is the number of rows, so the bottom row is row n = rows − 1.',
      ],
      id: [
        'Segitiga Pascal dibangun dari satu aturan. Mulai dengan satu angka 1 di puncak. Setiap sel di bawahnya adalah jumlah dua sel yang berada diagonal di atasnya, dan sel di tepi, yang hanya punya satu tetangga di atas, selalu bernilai 1. Baris dinomori dari 0 di puncak, dan posisi dalam satu baris dinomori dari 0 di kiri, sehingga sel "baris 4, posisi 2" adalah angka 6 di tengah baris kelima. Simulasi membangun sampai 20 baris dengan cara ini; angkanya tumbuh cepat, mencapai 184.756 di tengah baris 20.',
        'Segitiga ini diam-diam menghitung jalur. Bayangkan berjalan turun dari puncak, satu langkah tiap kali, ke kiri-bawah atau ke kanan-bawah. Untuk mencapai posisi k di baris n kamu harus melangkah tepat n kali, dan tepat k di antaranya harus langkah ke kanan. Banyaknya cara melakukan itu adalah banyaknya cara memilih k langkah mana dari n langkah yang ke kanan, ditulis C(n, k) dan dibaca "n pilih k". Aturan penjumlahan langsung mengikuti: langkah terakhir menuju sebuah sel datang dari sel kiri-atas atau sel kanan-atas, sehingga jalur menuju sel itu adalah jumlah jalur menuju kedua sel tersebut. Klik sel mana pun dan simulasi mewarnai setiap sel yang dilewati setidaknya satu jalur dari puncak, lalu menampilkan C(n, k).',
        'Karena C(n, k) menghitung pilihan, segitiga ini muncul di mana pun kita memilih k benda dari n: berapa cara memilih 2 siswa dari 4 (6), berapa cara mendapat 2 gambar dari 4 lemparan koin (6 dari 16), atau koefisien ketika (a + b)^n dijabarkan. Pola lain menunggu di baris dan diagonal: tiap baris berjumlah 2^n, tiap baris terbaca sama dari belakang, diagonal kedua berisi bilangan asli dan diagonal ketiga berisi bilangan segitiga 1, 3, 6, 10, 15. Nyalakan sakelar paritas dan sel-sel ganjil membentuk segitiga Sierpinski, karena ganjil + ganjil dan genap + genap sama-sama genap, sehingga pola paritasnya berulang dengan ukuran dua kali lipat.',
        'Dua hal mudah disalahbaca. Sorotan hijau menandai gabungan sel yang dilewati semua jalur menuju sel terpilih, bukan jalur satu per satu, sehingga banyaknya sel hijau bukan banyaknya jalur; banyaknya jalur adalah angka di dalam sel itu sendiri. Dan karena baris dimulai dari 0, nilai slider baris adalah banyaknya baris, sehingga baris paling bawah adalah baris n = jumlah baris − 1.',
      ],
    },
    figure: {
      caption: {
        en: 'Rows 0 to 4. Each cell is the sum of the two above it: 3 + 3 = 6. The 6 at row 4, position 2 is C(4, 2): there are 6 paths from the top that take exactly 2 right-steps out of 4. Each row sums to 2^n.',
        id: 'Baris 0 sampai 4. Tiap sel adalah jumlah dua sel di atasnya: 3 + 3 = 6. Angka 6 di baris 4, posisi 2 adalah C(4, 2): ada 6 jalur dari puncak yang tepat 2 dari 4 langkahnya ke kanan. Tiap baris berjumlah 2^n.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('First five rows of Pascal\'s triangle', 'Lima baris pertama segitiga Pascal')}">
  <style>text{font:12px system-ui,sans-serif;fill:currentColor}.c{fill:none;stroke:currentColor;stroke-width:1.3}.n{font-weight:bold;text-anchor:middle}.s{font-size:10px}.g{fill:none;stroke:#10b981;stroke-width:1.8}</style>
  <line x1="130" y1="145" x2="146" y2="169" class="g" marker-end="url(#a)"/>
  <line x1="170" y1="145" x2="154" y2="169" class="g" marker-end="url(#a)"/>
  <circle cx="150" cy="40" r="14" class="c"/><text x="150" y="44" class="n">1</text>
  <circle cx="130" cy="75" r="14" class="c"/><text x="130" y="79" class="n">1</text>
  <circle cx="170" cy="75" r="14" class="c"/><text x="170" y="79" class="n">1</text>
  <circle cx="110" cy="110" r="14" class="c"/><text x="110" y="114" class="n">1</text>
  <circle cx="150" cy="110" r="14" class="c"/><text x="150" y="114" class="n">2</text>
  <circle cx="190" cy="110" r="14" class="c"/><text x="190" y="114" class="n">1</text>
  <circle cx="90" cy="145" r="14" class="c"/><text x="90" y="149" class="n">1</text>
  <circle cx="130" cy="145" r="14" fill="none" stroke="#10b981" stroke-width="2"/><text x="130" y="149" class="n" fill="#10b981">3</text>
  <circle cx="170" cy="145" r="14" fill="none" stroke="#10b981" stroke-width="2"/><text x="170" y="149" class="n" fill="#10b981">3</text>
  <circle cx="210" cy="145" r="14" class="c"/><text x="210" y="149" class="n">1</text>
  <circle cx="70" cy="180" r="14" class="c"/><text x="70" y="184" class="n">1</text>
  <circle cx="110" cy="180" r="14" class="c"/><text x="110" y="184" class="n">4</text>
  <circle cx="150" cy="180" r="14" fill="#10b981"/><text x="150" y="184" class="n" fill="#fff">6</text>
  <circle cx="190" cy="180" r="14" class="c"/><text x="190" y="184" class="n">4</text>
  <circle cx="230" cy="180" r="14" class="c"/><text x="230" y="184" class="n">1</text>
  <text x="30" y="44" class="s">n = 0</text>
  <text x="30" y="79" class="s">n = 1</text>
  <text x="30" y="114" class="s">n = 2</text>
  <text x="30" y="149" class="s">n = 3</text>
  <text x="30" y="184" class="s">n = 4</text>
  <text x="300" y="24" text-anchor="middle" class="s">${L('row sum', 'jumlah baris')} = 2^n</text>
  <text x="300" y="44" text-anchor="middle" fill="#f59e0b" class="s">1</text>
  <text x="300" y="79" text-anchor="middle" fill="#f59e0b" class="s">2</text>
  <text x="300" y="114" text-anchor="middle" fill="#f59e0b" class="s">4</text>
  <text x="300" y="149" text-anchor="middle" fill="#f59e0b" class="s">8</text>
  <text x="300" y="184" text-anchor="middle" fill="#f59e0b" class="s">16</text>
  <text x="70" y="206" text-anchor="middle" class="s">k=0</text>
  <text x="110" y="206" text-anchor="middle" class="s">k=1</text>
  <text x="150" y="206" text-anchor="middle" fill="#10b981" class="s" font-weight="bold">k=2</text>
  <text x="190" y="206" text-anchor="middle" class="s">k=3</text>
  <text x="230" y="206" text-anchor="middle" class="s">k=4</text>
  <text x="180" y="228" text-anchor="middle" class="s" fill="#10b981">${L('3 + 3 = 6 = C(4, 2): 6 paths from the top, 6 ways to choose 2 of 4', '3 + 3 = 6 = C(4, 2): 6 jalur dari puncak, 6 cara memilih 2 dari 4')}</text>
  <defs><marker id="a" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="context-stroke"/></marker></defs>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Every cell is the sum of the two cells above it, and the edges are always 1.',
        'The cell at row n, position k equals C(n, k), the number of ways to choose k things from n.',
        'C(n, k) also counts the down-left/down-right paths from the apex to that cell, because reaching it takes exactly k right-steps out of n.',
        'Each row sums to 2^n and reads the same backwards: C(n, k) = C(n, n − k).',
        'Colouring the odd cells gives the Sierpinski triangle, because the parity of a sum depends only on the parities of its parts.',
      ],
      id: [
        'Setiap sel adalah jumlah dua sel di atasnya, dan sel tepi selalu 1.',
        'Sel di baris n, posisi k sama dengan C(n, k), banyaknya cara memilih k benda dari n.',
        'C(n, k) juga menghitung jalur kiri-bawah/kanan-bawah dari puncak ke sel itu, karena mencapainya butuh tepat k langkah ke kanan dari n langkah.',
        'Tiap baris berjumlah 2^n dan terbaca sama dari belakang: C(n, k) = C(n, n − k).',
        'Mewarnai sel ganjil menghasilkan segitiga Sierpinski, karena paritas suatu jumlah hanya bergantung pada paritas bagian-bagiannya.',
      ],
    },
    vocabulary: {
      en: [
        ['Row (n)', 'The horizontal level of the triangle, counted from 0 at the top; row n has n + 1 cells.'],
        ['Position (k)', 'The place of a cell within its row, counted from 0 on the left.'],
        ['Combination C(n, k)', 'The number of ways to choose k objects from n when order does not matter; also written "n choose k" or as a binomial coefficient.'],
        ['Recurrence', 'A rule that builds each value from earlier ones; here C(n, k) = C(n − 1, k − 1) + C(n − 1, k).'],
        ['Binomial expansion', 'Writing (a + b)^n as a sum; the coefficients are the entries of row n.'],
        ['Parity', 'Whether a number is odd or even.'],
        ['Sierpinski triangle', 'A fractal made of triangles inside triangles that appears when the odd cells are coloured.'],
        ['Triangular numbers', '1, 3, 6, 10, 15, …, the numbers of dots in growing triangles; they fill the third diagonal.'],
      ],
      id: [
        ['Baris (n)', 'Tingkat mendatar segitiga, dihitung dari 0 di puncak; baris n punya n + 1 sel.'],
        ['Posisi (k)', 'Letak sel dalam barisnya, dihitung dari 0 di kiri.'],
        ['Kombinasi C(n, k)', 'Banyaknya cara memilih k benda dari n ketika urutan tidak dipedulikan; dibaca "n pilih k" atau disebut koefisien binomial.'],
        ['Rekurensi', 'Aturan yang membangun tiap nilai dari nilai-nilai sebelumnya; di sini C(n, k) = C(n − 1, k − 1) + C(n − 1, k).'],
        ['Penjabaran binomial', 'Menuliskan (a + b)^n sebagai penjumlahan; koefisiennya adalah isi baris n.'],
        ['Paritas', 'Apakah suatu bilangan ganjil atau genap.'],
        ['Segitiga Sierpinski', 'Fraktal berupa segitiga di dalam segitiga yang muncul ketika sel-sel ganjil diwarnai.'],
        ['Bilangan segitiga', '1, 3, 6, 10, 15, …, banyaknya titik dalam segitiga yang membesar; mengisi diagonal ketiga.'],
      ],
    },
    misconceptions: {
      en: [
        ['The number of green cells is the number of paths.', 'The highlight shows every cell that any path passes through; paths overlap heavily. The number of paths is the value in the selected cell, C(n, k).'],
        ['C(n, k) counts arrangements, so order matters.', 'Order does not matter in a combination. Choosing steps 1 and 3 to go right is the same choice as choosing steps 3 and 1; that is why C(4, 2) is 6, not 12.'],
        ['Row 4 is the fourth row from the top.', 'Rows are numbered from 0, so row 4 is the fifth row: 1 4 6 4 1. This matches the n in C(n, k) and the exponent in (a + b)^n.'],
        ['The odd and even cells are scattered at random.', 'Parity follows the same sum rule as the numbers: odd + odd = even, odd + even = odd. That strict rule is what produces the self-repeating Sierpinski pattern.'],
      ],
      id: [
        ['Banyaknya sel hijau adalah banyaknya jalur.', 'Sorotan menunjukkan setiap sel yang dilewati jalur mana pun; jalur-jalur itu banyak saling tumpang tindih. Banyaknya jalur adalah nilai di sel terpilih, C(n, k).'],
        ['C(n, k) menghitung susunan, jadi urutan penting.', 'Urutan tidak penting dalam kombinasi. Memilih langkah 1 dan 3 ke kanan sama dengan memilih langkah 3 dan 1; itulah sebabnya C(4, 2) adalah 6, bukan 12.'],
        ['Baris 4 adalah baris keempat dari atas.', 'Baris dinomori dari 0, jadi baris 4 adalah baris kelima: 1 4 6 4 1. Ini sesuai dengan n pada C(n, k) dan pangkat pada (a + b)^n.'],
        ['Sel ganjil dan genap tersebar acak.', 'Paritas mengikuti aturan penjumlahan yang sama seperti angkanya: ganjil + ganjil = genap, ganjil + genap = ganjil. Aturan ketat inilah yang menghasilkan pola Sierpinski yang berulang.'],
      ],
    },
    realWorld: {
      en: [
        'Flip a fair coin 4 times: the chance of exactly 2 heads is C(4, 2)/2^4 = 6/16. Row n of the triangle divided by 2^n is the whole probability distribution for n flips.',
        'A Galton board (or the game plinko) drops balls through rows of pegs; the pile at the bottom follows the numbers in a row of Pascal\'s triangle.',
        'Choosing a team of 5 from a class of 30, or 6 lottery numbers from 49, is a combination: C(30, 5) = 142 506 and C(49, 6) = 13 983 816.',
        'On a city grid, the number of shortest routes that go 3 blocks east and 2 blocks north is C(5, 2) = 10, the same path-counting as in the triangle.',
      ],
      id: [
        'Lempar koin seimbang 4 kali: peluang tepat 2 gambar adalah C(4, 2)/2^4 = 6/16. Baris n segitiga dibagi 2^n adalah seluruh sebaran peluang untuk n lemparan.',
        'Papan Galton (atau permainan plinko) menjatuhkan bola melewati baris-baris pasak; tumpukan di bawah mengikuti angka-angka pada satu baris segitiga Pascal.',
        'Memilih tim 5 orang dari kelas berisi 30 siswa, atau 6 nomor undian dari 49, adalah kombinasi: C(30, 5) = 142.506 dan C(49, 6) = 13.983.816.',
        'Pada peta kota berpetak, banyaknya rute terpendek yang menempuh 3 blok ke timur dan 2 blok ke utara adalah C(5, 2) = 10, penghitungan jalur yang sama seperti di segitiga.',
      ],
    },
    questions: {
      en: [
        { q: 'Row 4 is 1 4 6 4 1. Write row 5 and check its sum.', a: 'Add neighbours: 1, 1+4 = 5, 4+6 = 10, 6+4 = 10, 4+1 = 5, 1. Row 5 is 1 5 10 10 5 1, and it sums to 32 = 2^5.' },
        { q: 'A delivery rider must go 3 blocks east and 2 blocks north on a grid. How many shortest routes are there, and where is that number in the triangle?', a: 'A route is 5 steps of which 2 are north, so there are C(5, 2) = 10 routes. That is row 5, position 2 of the triangle. Clicking that cell in the sim highlights the corresponding region and shows 10.' },
        { q: 'Turn on the parity toggle. Which rows have only their two end cells odd, and which rows are entirely odd?', a: 'Rows 2, 4, 8 and 16 have only the end 1s odd; rows 1, 3, 7 and 15 are all odd. A fully odd row is followed by a row whose interior sums are odd + odd = even, and below that the pattern restarts, which is why the Sierpinski triangle doubles in size at each power of 2.' },
      ],
      id: [
        { q: 'Baris 4 adalah 1 4 6 4 1. Tuliskan baris 5 dan periksa jumlahnya.', a: 'Jumlahkan yang bertetangga: 1, 1+4 = 5, 4+6 = 10, 6+4 = 10, 4+1 = 5, 1. Baris 5 adalah 1 5 10 10 5 1, dan jumlahnya 32 = 2^5.' },
        { q: 'Seorang kurir harus menempuh 3 blok ke timur dan 2 blok ke utara di kota berpetak. Berapa banyak rute terpendek, dan di mana angka itu berada di segitiga?', a: 'Satu rute terdiri atas 5 langkah dengan 2 di antaranya ke utara, jadi ada C(5, 2) = 10 rute. Itu adalah baris 5, posisi 2 di segitiga. Mengklik sel itu di simulasi menyorot daerah yang sesuai dan menampilkan 10.' },
        { q: 'Nyalakan sakelar paritas. Baris mana yang hanya kedua sel ujungnya ganjil, dan baris mana yang seluruhnya ganjil?', a: 'Baris 2, 4, 8, dan 16 hanya ganjil di kedua angka 1 di ujung; baris 1, 3, 7, dan 15 seluruhnya ganjil. Baris yang seluruhnya ganjil diikuti baris yang bagian dalamnya ganjil + ganjil = genap, dan di bawahnya pola dimulai lagi, itulah sebabnya segitiga Sierpinski menggandakan ukurannya pada tiap pangkat 2.' },
      ],
    },
  },
};
