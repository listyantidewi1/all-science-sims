// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'See the 2^N − 1 lower bound: 3 disks → 7 moves, 4 disks → 15, 5 disks → 31.',
      'Watch the recursive structure: solving N reduces to solving N−1 twice.',
      'Build intuition for divide-and-conquer thinking.',
    ],
    id: [
      'Melihat batas bawah 2^N − 1: 3 cakram → 7 langkah, 4 → 15, 5 → 31.',
      'Mengamati struktur rekursif: menyelesaikan N berarti menyelesaikan N−1 dua kali.',
      'Membangun intuisi pemikiran bagi-dan-taklukkan.',
    ],
  },
  tryThis: {
    en: [
      'Try 3 disks by hand — see if you can do it in 7 moves.',
      'Crank to 6 disks — auto-solve takes 63 moves.',
      'Compare your move count to the optimum 2^N − 1.',
    ],
    id: [
      'Coba 3 cakram sendiri — bisa Anda 7 langkah?',
      'Naikkan ke 6 cakram — auto-solve 63 langkah.',
      'Bandingkan jumlah langkah Anda dengan optimum 2^N − 1.',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'The Tower of Hanoi is a puzzle invented by the French mathematician Édouard Lucas in 1883. Three pegs stand in a row, and a stack of disks of different sizes sits on the first peg, largest at the bottom. The goal is to move the whole stack to the last peg following two rules: move only one disk at a time, taking the top disk from a peg, and never place a larger disk on top of a smaller one. With two disks it is easy. With three it takes some thought, and with eight most people get lost, yet the puzzle has a beautiful solution that works for any number of disks.',
        'The trick is to think about the biggest disk. It can only move to the last peg when the last peg is empty and every other disk is parked on the middle peg. So to move N disks from A to C, you must first move the N − 1 smaller disks from A to B, then move the big disk from A to C, and finally move the N − 1 smaller disks from B to C. Each of those smaller jobs is the same puzzle again with one disk fewer, which is why computer scientists call the solution recursive: the method calls on itself. Counting the moves gives a simple rule: the moves for N disks equal twice the moves for N − 1 disks, plus one. Starting from 1 move for one disk, this produces 1, 3, 7, 15, 31, 63, 127 and 255, each number one less than the next power of two. No shortcut exists, because the big disk has to move at least once, and all the other disks must be cleared off before and stacked back on after.',
        'In the sim, click a peg to pick up its top disk, then click another peg to drop it; a move that would put a larger disk on a smaller one is simply refused and not counted. The header compares your move count with the optimum, and the disk slider goes from 2 to 8. Auto-solve plays the recursive plan at one move every 0.38 seconds, so you can watch the smaller towers being built and rebuilt. It plans from the starting position with every disk on peg A, so press Reset before using it if you have already moved disks. The sim uses only three pegs, which is the classic version; with four pegs far fewer moves are needed, and finding the exact minimum there is a much harder question.',
      ],
      id: [
        'Menara Hanoi adalah teka-teki yang diciptakan matematikawan Prancis Édouard Lucas pada tahun 1883. Tiga pasak berdiri berjajar, dan setumpuk cakram dengan ukuran berbeda berada di pasak pertama, yang terbesar di bawah. Tujuannya memindahkan seluruh tumpukan ke pasak terakhir dengan dua aturan: pindahkan hanya satu cakram pada satu waktu, dengan mengambil cakram teratas dari sebuah pasak, dan jangan pernah meletakkan cakram yang lebih besar di atas yang lebih kecil. Dengan dua cakram ini mudah. Dengan tiga cakram perlu sedikit berpikir, dan dengan delapan kebanyakan orang tersesat, tetapi teka-teki ini memiliki penyelesaian indah yang berlaku untuk berapa pun jumlah cakram.',
        'Kuncinya adalah memikirkan cakram terbesar. Cakram itu hanya bisa pindah ke pasak terakhir ketika pasak terakhir kosong dan semua cakram lain diparkir di pasak tengah. Jadi untuk memindahkan N cakram dari A ke C, Anda harus terlebih dahulu memindahkan N − 1 cakram yang lebih kecil dari A ke B, lalu memindahkan cakram besar dari A ke C, dan akhirnya memindahkan N − 1 cakram kecil itu dari B ke C. Tiap pekerjaan kecil itu adalah teka-teki yang sama dengan satu cakram lebih sedikit, dan karena itulah ilmuwan komputer menyebut penyelesaiannya rekursif: metodenya memanggil dirinya sendiri. Menghitung langkahnya memberi aturan sederhana: jumlah langkah untuk N cakram sama dengan dua kali langkah untuk N − 1 cakram, ditambah satu. Mulai dari 1 langkah untuk satu cakram, ini menghasilkan 1, 3, 7, 15, 31, 63, 127, dan 255, masing-masing satu kurang dari pangkat dua berikutnya. Tidak ada jalan pintas, karena cakram besar harus pindah paling sedikit sekali, dan semua cakram lain harus disingkirkan sebelumnya dan ditumpuk kembali sesudahnya.',
        'Dalam simulasi, klik sebuah pasak untuk mengangkat cakram teratasnya, lalu klik pasak lain untuk meletakkannya; langkah yang akan menaruh cakram besar di atas cakram kecil ditolak begitu saja dan tidak dihitung. Bagian atas membandingkan jumlah langkah Anda dengan nilai optimum, dan slider cakram berkisar dari 2 sampai 8. Auto-solve memainkan rencana rekursif dengan satu langkah tiap 0,38 detik, sehingga Anda bisa menyaksikan menara-menara kecil dibangun dan dibangun ulang. Ia merencanakan dari posisi awal dengan semua cakram di pasak A, jadi tekan Reset sebelum memakainya jika Anda sudah memindahkan cakram. Simulasi ini hanya memakai tiga pasak, yaitu versi klasiknya; dengan empat pasak dibutuhkan jauh lebih sedikit langkah, dan menemukan jumlah minimum pastinya adalah pertanyaan yang jauh lebih sulit.',
      ],
    },
    figure: {
      caption: {
        en: 'Three disks in three stages: park the two small disks on B (3 moves), move the big disk to C (1 move), then bring the two small disks onto it (3 moves). Total 3 + 1 + 3 = 7. Each "park two disks" stage is itself the two-disk puzzle.',
        id: 'Tiga cakram dalam tiga tahap: parkir dua cakram kecil di B (3 langkah), pindahkan cakram besar ke C (1 langkah), lalu bawa dua cakram kecil ke atasnya (3 langkah). Total 3 + 1 + 3 = 7. Tiap tahap "parkir dua cakram" adalah teka-teki dua cakram itu sendiri.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        const col = { 1: '#3b82f6', 2: '#10b981', 3: '#8b5cf6' };
        const panel = (x0, pegs, title) => {
          let s = `<rect x="${x0}" y="70" width="84" height="4" fill="currentColor" opacity=".5"/>`;
          pegs.forEach((stack, p) => {
            const px = x0 + 14 + p * 28;
            s += `<rect x="${px - 1}" y="38" width="2" height="32" fill="currentColor" opacity=".5"/>`;
            stack.forEach((d, i) => { s += `<rect x="${px - 3 - d * 4}" y="${62 - i * 8}" width="${6 + d * 8}" height="7" rx="2" fill="${col[d]}"/>`; });
            s += `<text x="${px}" y="84" text-anchor="middle" class="s">${'ABC'[p]}</text>`;
          });
          return s + `<text x="${x0 + 42}" y="100" text-anchor="middle" class="s">${title}</text>`;
        };
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Solving the three-disk Tower of Hanoi in three stages', 'Menyelesaikan Menara Hanoi tiga cakram dalam tiga tahap')}">
  <style>text{font:12px system-ui,sans-serif;fill:currentColor}.s{font-size:10px}.e{fill:none;stroke:currentColor;stroke-width:1.2}</style>
  <text x="8" y="20" font-weight="700">${L('Move 3 disks from A to C', 'Pindahkan 3 cakram dari A ke C')}</text>
  ${panel(8, [[3, 2, 1], [], []], L('start', 'awal'))}
  ${panel(96, [[3], [2, 1], []], L('3 moves', '3 langkah'))}
  ${panel(184, [[], [2, 1], [3]], L('1 move', '1 langkah'))}
  ${panel(272, [[], [], [3, 2, 1]], L('3 moves', '3 langkah'))}
  <line x1="88" y1="56" x2="96" y2="56" class="e"/>
  <line x1="176" y1="56" x2="184" y2="56" class="e"/>
  <line x1="264" y1="56" x2="272" y2="56" class="e"/>
  <text x="138" y="116" text-anchor="middle" fill="#10b981" class="s">${L('small disks → B', 'cakram kecil → B')}</text>
  <text x="226" y="116" text-anchor="middle" fill="#8b5cf6" class="s">${L('big disk → C', 'cakram besar → C')}</text>
  <text x="314" y="116" text-anchor="middle" fill="#10b981" class="s">${L('small disks → C', 'cakram kecil → C')}</text>
  <text x="180" y="142" text-anchor="middle" font-weight="700">3 + 1 + 3 = 7</text>
  <text x="8" y="170" font-weight="700" class="s">${L('moves for N disks = 2 × (moves for N − 1) + 1', 'langkah untuk N cakram = 2 × (langkah untuk N − 1) + 1')}</text>
  <line x1="8" y1="180" x2="352" y2="180" stroke="currentColor" stroke-width="1" opacity=".35"/>
  <text x="8" y="198" class="s">${L('disks', 'cakram')}</text>
  <text x="8" y="218" class="s">${L('moves', 'langkah')}</text>
  ${[1, 2, 3, 4, 5, 6, 7, 8].map((n, i) => `<text x="${80 + i * 38}" y="198" text-anchor="middle" class="s">${n}</text><text x="${80 + i * 38}" y="218" text-anchor="middle" font-weight="700" fill="#f59e0b" class="s">${2 ** n - 1}</text>`).join('')}
  <text x="180" y="236" text-anchor="middle" class="s" opacity=".7">${L('each number is one less than the next power of two', 'tiap bilangan satu kurang dari pangkat dua berikutnya')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'To move N disks, move the N − 1 smaller disks aside, move the biggest disk, then move the N − 1 disks back on top.',
        'Because the method uses itself on a smaller tower, it is called recursive, and it works for any number of disks.',
        'The fewest moves for N disks is twice the fewest for N − 1 plus one: 1, 3, 7, 15, 31, 63..., always one less than a power of two.',
        'Adding one disk doubles the work, so the puzzle quickly becomes enormous: 8 disks take 255 moves, 20 disks over a million.',
        'Breaking a big problem into smaller copies of itself is called divide and conquer and is one of the main tools of computer science.',
      ],
      id: [
        'Untuk memindahkan N cakram, singkirkan N − 1 cakram yang lebih kecil, pindahkan cakram terbesar, lalu kembalikan N − 1 cakram ke atasnya.',
        'Karena metodenya memakai dirinya sendiri pada menara yang lebih kecil, ia disebut rekursif, dan berlaku untuk berapa pun jumlah cakram.',
        'Langkah tersedikit untuk N cakram adalah dua kali langkah tersedikit untuk N − 1 ditambah satu: 1, 3, 7, 15, 31, 63..., selalu satu kurang dari pangkat dua.',
        'Menambah satu cakram menggandakan pekerjaan, sehingga teka-teki ini cepat menjadi raksasa: 8 cakram butuh 255 langkah, 20 cakram lebih dari sejuta.',
        'Memecah masalah besar menjadi salinan-salinan kecil dari dirinya disebut bagi-dan-taklukkan dan merupakan salah satu alat utama ilmu komputer.',
      ],
    },
    vocabulary: {
      en: [
        ['Peg', 'One of the three posts the disks are stacked on, labelled A, B and C in the sim.'],
        ['Legal move', 'Taking the top disk of one peg and placing it on a peg whose top disk is larger, or which is empty.'],
        ['Recursion', 'Solving a problem by using the same method on smaller versions of the same problem.'],
        ['Base case', 'The smallest version that needs no further splitting: moving one disk takes exactly one move.'],
        ['Optimal solution', 'A way of solving the puzzle with the fewest possible moves.'],
        ['Power of two', 'A number made by multiplying 2 by itself: 2, 4, 8, 16, 32... The Hanoi move counts are each one less than one of these.'],
        ['Divide and conquer', 'A problem-solving strategy that splits a task into smaller tasks, solves them, and combines the results.'],
      ],
      id: [
        ['Pasak', 'Salah satu dari tiga tiang tempat cakram ditumpuk, berlabel A, B, dan C dalam simulasi.'],
        ['Langkah sah', 'Mengambil cakram teratas dari satu pasak dan meletakkannya di pasak yang cakram teratasnya lebih besar, atau yang kosong.'],
        ['Rekursi', 'Menyelesaikan masalah dengan memakai metode yang sama pada versi yang lebih kecil dari masalah itu.'],
        ['Kasus dasar', 'Versi terkecil yang tidak perlu dipecah lagi: memindahkan satu cakram butuh tepat satu langkah.'],
        ['Penyelesaian optimal', 'Cara menyelesaikan teka-teki dengan langkah sesedikit mungkin.'],
        ['Pangkat dua', 'Bilangan yang dibuat dengan mengalikan 2 dengan dirinya sendiri: 2, 4, 8, 16, 32... Jumlah langkah Hanoi masing-masing satu kurang dari salah satu bilangan ini.'],
        ['Bagi-dan-taklukkan', 'Strategi pemecahan masalah yang membagi tugas menjadi tugas-tugas kecil, menyelesaikannya, lalu menggabungkan hasilnya.'],
      ],
    },
    misconceptions: {
      en: [
        ['Adding one more disk adds just a few more moves.', 'It doubles the work and adds one: 4 disks need 15 moves, 5 need 31, 6 need 63. Growth like this, where each step multiplies, is called exponential and quickly becomes huge.'],
        ['The fastest way is to move the biggest disk as early as possible.', 'The biggest disk can only move once everything above it has been moved to the middle peg, so getting it to C early is the most work of all. The recursive plan moves it exactly once, in the middle of the solution.'],
        ['A smart person could find a shortcut with fewer than 7 moves for 3 disks.', 'No. The big disk must move at least once, the two small disks must be fully out of the way before that (at least 3 moves) and fully back on top after (at least 3 more). Seven is the proven minimum.'],
      ],
      id: [
        ['Menambah satu cakram hanya menambah beberapa langkah.', 'Ia menggandakan pekerjaan dan menambah satu: 4 cakram butuh 15 langkah, 5 butuh 31, 6 butuh 63. Pertumbuhan seperti ini, yang tiap tahapnya mengalikan, disebut eksponensial dan cepat menjadi sangat besar.'],
        ['Cara tercepat adalah memindahkan cakram terbesar sedini mungkin.', 'Cakram terbesar hanya bisa pindah setelah semua cakram di atasnya dipindahkan ke pasak tengah, sehingga membawanya ke C lebih awal justru paling banyak pekerjaannya. Rencana rekursif memindahkannya tepat sekali, di tengah penyelesaian.'],
        ['Orang yang pintar bisa menemukan jalan pintas kurang dari 7 langkah untuk 3 cakram.', 'Tidak. Cakram besar harus pindah paling sedikit sekali, dua cakram kecil harus sepenuhnya menyingkir sebelumnya (paling sedikit 3 langkah) dan sepenuhnya kembali ke atasnya sesudahnya (paling sedikit 3 lagi). Tujuh adalah minimum yang terbukti.'],
      ],
    },
    realWorld: {
      en: [
        'The legend attached to the puzzle says monks are moving 64 golden disks; at one move per second the 2^64 − 1 moves would take about 585 billion years.',
        'Programmers use the same recursive idea to sort lists, search folders full of sub-folders, and draw fractal pictures.',
        'Psychologists use the Tower of Hanoi to study planning, because solving it well means thinking several moves ahead.',
        'Backup systems rotate storage tapes in a Hanoi pattern, so that recent backups are kept often and older ones less often.',
      ],
      id: [
        'Legenda yang melekat pada teka-teki ini bercerita tentang para biksu yang memindahkan 64 cakram emas; dengan satu langkah per detik, 2^64 − 1 langkah akan memakan waktu sekitar 585 miliar tahun.',
        'Pemrogram memakai gagasan rekursif yang sama untuk mengurutkan daftar, menelusuri folder yang penuh subfolder, dan menggambar pola fraktal.',
        'Psikolog memakai Menara Hanoi untuk mempelajari kemampuan merencana, karena menyelesaikannya dengan baik berarti berpikir beberapa langkah ke depan.',
        'Sistem cadangan data memutar pita penyimpanan dengan pola Hanoi, sehingga cadangan terbaru disimpan sering dan yang lebih lama lebih jarang.',
      ],
    },
    questions: {
      en: [
        { q: 'Moving 5 disks takes 31 moves. Without using a power, work out how many moves 6 disks and 7 disks take.', a: 'Each extra disk doubles the count and adds one. 6 disks: 2 × 31 + 1 = 63. 7 disks: 2 × 63 + 1 = 127. Check against the pattern: 63 = 64 − 1 and 127 = 128 − 1.' },
        { q: 'To move 4 disks from A to C, where must the 3 smaller disks be just before the biggest disk moves, and how many moves did it take to get them there?', a: 'All three must be stacked on peg B, leaving C empty for the big disk. Getting them there is the 3-disk puzzle, so it takes 7 moves. Then 1 move for the big disk and 7 more to bring the three disks onto C: 7 + 1 + 7 = 15.' },
        { q: 'You solved 3 disks by hand in 11 moves. Is that optimal? What probably went wrong?', a: 'No, the optimum is 7. Eleven moves means four wasted moves; most likely a small disk was moved back and forth, or the two small disks were parked on C instead of B, so the big disk could not move and they had to be moved again.' },
      ],
      id: [
        { q: 'Memindahkan 5 cakram butuh 31 langkah. Tanpa memakai pangkat, hitung berapa langkah untuk 6 cakram dan 7 cakram.', a: 'Tiap cakram tambahan menggandakan jumlahnya dan menambah satu. 6 cakram: 2 × 31 + 1 = 63. 7 cakram: 2 × 63 + 1 = 127. Periksa dengan polanya: 63 = 64 − 1 dan 127 = 128 − 1.' },
        { q: 'Untuk memindahkan 4 cakram dari A ke C, di mana 3 cakram kecil harus berada tepat sebelum cakram terbesar pindah, dan berapa langkah untuk membawanya ke sana?', a: 'Ketiganya harus tertumpuk di pasak B, sehingga C kosong untuk cakram besar. Membawanya ke sana adalah teka-teki 3 cakram, jadi butuh 7 langkah. Lalu 1 langkah untuk cakram besar dan 7 langkah lagi untuk membawa ketiga cakram ke C: 7 + 1 + 7 = 15.' },
        { q: 'Anda menyelesaikan 3 cakram sendiri dalam 11 langkah. Apakah itu optimal? Apa yang mungkin keliru?', a: 'Tidak, optimumnya 7. Sebelas langkah berarti ada empat langkah terbuang; kemungkinan besar sebuah cakram kecil dipindah bolak-balik, atau kedua cakram kecil diparkir di C alih-alih B, sehingga cakram besar tidak bisa pindah dan keduanya harus dipindahkan lagi.' },
      ],
    },
  },
};
