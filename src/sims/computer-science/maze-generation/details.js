// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Distinguish DFS, Prim, and Wilson by texture.',
      'See that a perfect maze (no loops) is a spanning tree.',
      'Recognize how algorithm choice biases corridor length.',
    ],
    id: [
      'Membedakan DFS, Prim, dan Wilson dari teksturnya.',
      'Melihat bahwa labirin sempurna (tanpa loop) adalah pohon merentang.',
      'Mengenali bagaimana pilihan algoritma membias panjang koridor.',
    ],
  },
  tryThis: {
    en: [
      'Run DFS — note the long single corridors.',
      "Run Prim's — see balanced spread.",
      "Run Wilson's — slow start, perfectly unbiased.",
    ],
    id: [
      'Jalankan DFS — perhatikan koridor tunggal yang panjang.',
      'Jalankan Prim — amati penyebaran yang seimbang.',
      'Jalankan Wilson — mulai lambat, tetapi tak bias sempurna.',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'A maze on a grid is a graph problem in disguise. Think of each of the 30 by 20 = 600 cells as a node and of each wall between two neighbouring cells as a possible edge. Knocking a wall down adds that edge. A perfect maze is one in which every cell can be reached from every other by exactly one route: no loops and no sealed-off regions. In graph language that is a spanning tree, and a spanning tree on 600 nodes always has exactly 599 edges, so every perfect maze here is made by removing exactly 599 walls, whichever algorithm you choose. The algorithms differ only in which spanning tree they pick, and that choice gives each one a recognisable texture.',
        'Recursive backtracking is a randomised depth-first search. It starts in a corner, picks a random unvisited neighbour, carves through to it and keeps going. When it reaches a dead end with no unvisited neighbours it backs up along its path, one cell at a time, until it finds a cell with an unvisited neighbour and carves on from there. Because it always extends the current path as far as it can, it produces long winding corridors with few branches, which makes its mazes easy to recognise and, for a human, fairly easy to solve. The sim keeps the path on a stack rather than using true recursion, which is the same algorithm without the risk of running out of call depth.',
        'The randomised Prim\'s algorithm grows the maze outward from one cell like a crystal. It keeps a frontier list of unvisited cells that touch the visited region, repeatedly picks one at random, connects it to a random visited neighbour and adds its own neighbours to the frontier. Because growth happens anywhere on the boundary, corridors are short and the tree branches constantly, giving a bushy maze with many small dead ends and a radial look around the starting corner. This is the simplified version used for mazes, which chooses frontier cells uniformly instead of using edge weights as the textbook algorithm does; it is also known as the growing tree method.',
        'Wilson\'s algorithm is the slowest to start and the most interesting mathematically. One cell is marked as the tree; then a random walk is started from an unvisited cell and wanders, erasing any loop it makes, until it bumps into the tree, at which point the whole loop-erased path is added. New walks start until no cell remains. The orange trail in the sim is the current walk. Early walks take a long time because the tree is tiny, but later ones hit it almost immediately; to keep the animation moving, the sim advances an early walk by several moves per step and slows to single moves as the tree grows. Its remarkable property is that every possible spanning tree is equally likely, so Wilson\'s mazes carry no algorithmic bias at all; DFS mazes are far from uniform. The sim does not add an entrance, an exit or a solver; it only shows how the tree is built.',
      ],
      id: [
        'Labirin pada grid adalah persoalan graf yang menyamar. Bayangkan tiap-tiap dari 30 kali 20 = 600 sel sebagai simpul dan tiap dinding antara dua sel bertetangga sebagai calon sisi. Merobohkan dinding menambahkan sisi itu. Labirin sempurna adalah labirin yang setiap selnya dapat dicapai dari sel lain mana pun lewat tepat satu rute: tanpa loop dan tanpa daerah yang tersekat. Dalam bahasa graf itu adalah pohon merentang, dan pohon merentang pada 600 simpul selalu punya tepat 599 sisi, sehingga setiap labirin sempurna di sini dibuat dengan membuang tepat 599 dinding, algoritma apa pun yang kamu pilih. Algoritma hanya berbeda dalam pohon merentang mana yang dipilihnya, dan pilihan itu memberi tekstur yang khas pada masing-masing.',
        'Backtracking rekursif adalah depth-first search yang diacak. Ia mulai dari satu sudut, memilih tetangga acak yang belum dikunjungi, membobol dinding ke arahnya, dan terus berjalan. Ketika sampai di jalan buntu tanpa tetangga yang belum dikunjungi, ia mundur menyusuri jalurnya, satu sel demi satu, sampai menemukan sel yang masih punya tetangga belum dikunjungi dan melanjutkan dari sana. Karena selalu memperpanjang jalur saat ini sejauh mungkin, ia menghasilkan koridor panjang berkelok dengan sedikit cabang, yang membuat labirinnya mudah dikenali dan, bagi manusia, cukup mudah dipecahkan. Simulasi menyimpan jalur di sebuah stack, bukan dengan rekursi sungguhan, yang merupakan algoritma yang sama tanpa risiko kehabisan kedalaman pemanggilan.',
        'Algoritma Prim yang diacak menumbuhkan labirin ke luar dari satu sel seperti kristal. Ia menyimpan daftar frontir berisi sel belum dikunjungi yang menyentuh daerah yang sudah dikunjungi, berulang kali memilih satu secara acak, menyambungkannya ke tetangga acak yang sudah dikunjungi, dan menambahkan tetangga sel itu ke frontir. Karena pertumbuhan terjadi di mana saja pada batas, koridornya pendek dan pohonnya terus bercabang, memberi labirin yang rimbun dengan banyak jalan buntu kecil dan tampilan radial di sekitar sudut awal. Ini versi sederhana yang dipakai untuk labirin, yang memilih sel frontir secara seragam dan bukan memakai bobot sisi seperti algoritma di buku teks; ia juga dikenal sebagai metode growing tree.',
        'Algoritma Wilson paling lambat memulai dan paling menarik secara matematis. Satu sel ditandai sebagai pohon; lalu jalan acak dimulai dari sel yang belum dikunjungi dan berkeliaran, menghapus setiap loop yang dibuatnya, sampai menabrak pohon, dan saat itu seluruh jalur yang sudah dihapus loopnya ditambahkan. Jalan baru terus dimulai sampai tidak ada sel yang tersisa. Jejak oranye dalam simulasi adalah jalan yang sedang berlangsung. Jalan-jalan awal butuh waktu lama karena pohonnya masih kecil, tetapi jalan-jalan berikutnya menabraknya hampir seketika; agar animasi terus bergerak, simulasi memajukan jalan awal beberapa gerakan per langkah dan melambat menjadi satu gerakan saat pohon membesar. Sifat istimewanya adalah setiap pohon merentang yang mungkin berpeluang sama, sehingga labirin Wilson sama sekali tidak membawa bias algoritmik; labirin DFS jauh dari seragam. Simulasi tidak menambahkan pintu masuk, pintu keluar, atau pemecah; ia hanya menunjukkan bagaimana pohon dibangun.',
      ],
    },
    figure: {
      caption: {
        en: 'Left: a 3 by 3 maze carved by recursive backtracking; the numbers are the order in which cells were visited, and the path never had to back up. Right: the same maze as a graph. Nine cells joined by eight passages form a spanning tree, so there is exactly one route between any two cells and no loops.',
        id: 'Kiri: labirin 3 kali 3 yang dibobol dengan backtracking rekursif; angkanya adalah urutan kunjungan sel, dan jalurnya tidak pernah perlu mundur. Kanan: labirin yang sama sebagai graf. Sembilan sel yang dihubungkan delapan lorong membentuk pohon merentang, sehingga ada tepat satu rute antara dua sel mana pun dan tidak ada loop.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        const S = 40, x0 = 20, y0 = 50;
        // visit order (col,row): serpentine 1..9
        const order = [[0, 0], [1, 0], [2, 0], [2, 1], [1, 1], [0, 1], [0, 2], [1, 2], [2, 2]];
        let nums = '';
        order.forEach(([c, r], i) => { nums += `<text x="${x0 + c * S + S / 2}" y="${y0 + r * S + S / 2 + 4}" text-anchor="middle" class="n">${i + 1}</text>`; });
        // interior walls that remain: between row0/row1 at cols 0,1; between row1/row2 at cols 1,2
        const walls = `<path d="M${x0} ${y0 + S} H${x0 + 2 * S} M${x0 + S} ${y0 + 2 * S} H${x0 + 3 * S}" class="w"/>`;
        const gx = 210, gy = 50;
        let nodes = '', edges = '';
        for (let i = 0; i < order.length - 1; i++) {
          const [a, b] = [order[i], order[i + 1]];
          edges += `<line x1="${gx + a[0] * S + S / 2}" y1="${gy + a[1] * S + S / 2}" x2="${gx + b[0] * S + S / 2}" y2="${gy + b[1] * S + S / 2}" stroke="#10b981" stroke-width="3"/>`;
        }
        order.forEach(([c, r], i) => { nodes += `<circle cx="${gx + c * S + S / 2}" cy="${gy + r * S + S / 2}" r="9" fill="#3b82f6"/><text x="${gx + c * S + S / 2}" y="${gy + r * S + S / 2 + 4}" text-anchor="middle" class="n" fill="#fff">${i + 1}</text>`; });
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('A small maze and its spanning tree', 'Labirin kecil dan pohon merentangnya')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.w{fill:none;stroke:currentColor;stroke-width:3;stroke-linecap:square}.n{font-size:11px;font-weight:700}.t{font-weight:700}.s{font-size:10px;opacity:.75}</style>
  <text x="20" y="30" class="t">${L('Maze (DFS order)', 'Labirin (urutan DFS)')}</text>
  <rect x="${x0}" y="${y0}" width="${3 * S}" height="${3 * S}" class="w"/>
  ${walls}
  ${nums}
  <text x="210" y="30" class="t">${L('Same maze as a graph', 'Labirin yang sama sebagai graf')}</text>
  ${edges}
  ${nodes}
  <text x="20" y="196" class="s">${L('9 cells, 8 walls removed', '9 sel, 8 dinding dibuang')}</text>
  <text x="20" y="210" class="s">${L('long corridor: DFS signature', 'koridor panjang: ciri DFS')}</text>
  <text x="210" y="196" class="s">${L('9 nodes, 8 edges = spanning tree', '9 simpul, 8 sisi = pohon merentang')}</text>
  <text x="210" y="210" class="s">${L('one route between any two cells', 'satu rute antara dua sel mana pun')}</text>
  <text x="20" y="232" class="s">${L('n cells always need exactly n − 1 removed walls', 'n sel selalu butuh tepat n − 1 dinding yang dibuang')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'A perfect maze is a spanning tree of the grid graph: every cell reachable, exactly one route between any two cells, no loops.',
        'On n cells every perfect maze removes exactly n − 1 walls, so the algorithms differ only in which tree they choose.',
        'Depth-first search extends one path as far as possible before backing up, which makes long corridors and few branches.',
        'Randomised Prim\'s grows from a frontier anywhere on the boundary, making a bushy tree with many short dead ends.',
        'Wilson\'s loop-erased random walks produce every spanning tree with equal probability; the other two methods are biased.',
      ],
      id: [
        'Labirin sempurna adalah pohon merentang dari graf grid: semua sel dapat dicapai, tepat satu rute antara dua sel mana pun, tanpa loop.',
        'Pada n sel, setiap labirin sempurna membuang tepat n − 1 dinding, sehingga algoritma hanya berbeda dalam pohon mana yang dipilih.',
        'Depth-first search memperpanjang satu jalur sejauh mungkin sebelum mundur, yang menghasilkan koridor panjang dan sedikit cabang.',
        'Prim yang diacak tumbuh dari frontir di mana saja pada batas, menghasilkan pohon rimbun dengan banyak jalan buntu pendek.',
        'Jalan acak terhapus-loop milik Wilson menghasilkan setiap pohon merentang dengan peluang sama; dua metode lainnya bias.',
      ],
    },
    vocabulary: {
      en: [
        ['Perfect maze', 'A maze with no loops and no isolated areas, so exactly one path joins any two cells.'],
        ['Spanning tree', 'A set of edges that connects every node of a graph without forming any cycle; it has one edge fewer than the number of nodes.'],
        ['Depth-first search (DFS)', 'A traversal that follows one path as deep as it can before backtracking.'],
        ['Backtracking', 'Returning along the current path to the most recent cell that still has unexplored options.'],
        ['Stack', 'A last-in, first-out list; DFS pushes each new cell on it and pops when it hits a dead end.'],
        ['Frontier', 'In Prim\'s algorithm, the unvisited cells adjacent to the growing maze, from which the next cell is chosen.'],
        ['Loop-erased random walk', 'A random walk in which, whenever it revisits a cell, the loop it just made is removed; the core of Wilson\'s algorithm.'],
        ['Uniform spanning tree', 'A spanning tree chosen so that every possible spanning tree is equally likely.'],
      ],
      id: [
        ['Labirin sempurna', 'Labirin tanpa loop dan tanpa daerah terisolasi, sehingga tepat satu jalur menghubungkan dua sel mana pun.'],
        ['Pohon merentang', 'Himpunan sisi yang menghubungkan semua simpul graf tanpa membentuk siklus; jumlah sisinya satu lebih sedikit dari jumlah simpul.'],
        ['Depth-first search (DFS)', 'Penelusuran yang mengikuti satu jalur sedalam mungkin sebelum mundur.'],
        ['Backtracking', 'Kembali menyusuri jalur saat ini ke sel terakhir yang masih punya pilihan belum dijelajahi.'],
        ['Stack', 'Daftar masuk-terakhir keluar-pertama; DFS mendorong setiap sel baru ke dalamnya dan mengeluarkannya saat menemui jalan buntu.'],
        ['Frontir', 'Dalam algoritma Prim, sel belum dikunjungi yang bersebelahan dengan labirin yang tumbuh, tempat sel berikutnya dipilih.'],
        ['Jalan acak terhapus-loop', 'Jalan acak yang, setiap kali mengunjungi ulang sebuah sel, loop yang baru dibuatnya dihapus; inti algoritma Wilson.'],
        ['Pohon merentang seragam', 'Pohon merentang yang dipilih sehingga setiap pohon merentang yang mungkin berpeluang sama.'],
      ],
    },
    misconceptions: {
      en: [
        ['A good maze needs loops to be hard.', 'A perfect maze has no loops at all, yet can be very hard. Difficulty comes from long dead ends and misleading branches, which is exactly what the choice of algorithm controls.'],
        ['Because all three algorithms use random numbers, they produce the same kinds of maze.', 'They sample spanning trees very differently. DFS strongly favours trees with long corridors, Prim\'s favours bushy ones, and only Wilson\'s gives every tree the same chance.'],
        ['Backtracking means the algorithm made a mistake and is undoing it.', 'Backing up is a normal, planned part of DFS. The passages already carved stay; the algorithm simply returns to find the nearest cell that still has unvisited neighbours.'],
        ['Different algorithms remove different numbers of walls.', 'Every perfect maze on the same grid removes exactly the same number, one fewer than the number of cells (599 here). What differs is which walls.'],
      ],
      id: [
        ['Labirin yang bagus butuh loop agar sulit.', 'Labirin sempurna tidak punya loop sama sekali, tetapi bisa sangat sulit. Kesulitan datang dari jalan buntu yang panjang dan cabang yang menyesatkan, dan itulah yang dikendalikan oleh pilihan algoritma.'],
        ['Karena ketiga algoritma memakai bilangan acak, ketiganya menghasilkan jenis labirin yang sama.', 'Ketiganya mencuplik pohon merentang dengan cara sangat berbeda. DFS sangat menyukai pohon dengan koridor panjang, Prim menyukai yang rimbun, dan hanya Wilson yang memberi setiap pohon peluang yang sama.'],
        ['Backtracking berarti algoritma membuat kesalahan dan membatalkannya.', 'Mundur adalah bagian normal dan terencana dari DFS. Lorong yang sudah dibobol tetap ada; algoritma hanya kembali untuk mencari sel terdekat yang masih punya tetangga belum dikunjungi.'],
        ['Algoritma yang berbeda membuang jumlah dinding yang berbeda.', 'Setiap labirin sempurna pada grid yang sama membuang jumlah yang persis sama, satu lebih sedikit dari jumlah sel (599 di sini). Yang berbeda hanyalah dinding yang mana.'],
      ],
    },
    realWorld: {
      en: [
        'Roguelike and dungeon-crawler games generate their levels with maze algorithms, choosing DFS for winding caves or Prim-like growth for bushier layouts.',
        'Network switches run a spanning tree protocol to disable redundant links so that frames have exactly one path and never loop.',
        'Micromouse robotics competitions use perfect mazes, and the robots solve them with the same graph searches used to build them.',
        'Loop-erased random walks and uniform spanning trees are studied in statistical physics as models of random fractal structures.',
      ],
      id: [
        'Gim roguelike dan penjelajah ruang bawah tanah membangkitkan levelnya dengan algoritma labirin, memilih DFS untuk gua berkelok atau pertumbuhan ala Prim untuk tata letak yang lebih rimbun.',
        'Switch jaringan menjalankan protokol pohon merentang untuk menonaktifkan tautan berlebih sehingga frame punya tepat satu jalur dan tidak pernah berputar.',
        'Kompetisi robotika micromouse memakai labirin sempurna, dan robotnya memecahkannya dengan pencarian graf yang sama dengan yang dipakai untuk membangunnya.',
        'Jalan acak terhapus-loop dan pohon merentang seragam dipelajari dalam fisika statistik sebagai model struktur fraktal acak.',
      ],
    },
    questions: {
      en: [
        { q: 'The sim\'s grid is 30 by 20. How many walls does any perfect maze on it remove, and why does the algorithm not matter for this count?', a: '599. A perfect maze is a spanning tree on 600 cells, and a tree always has one edge fewer than it has nodes: each removed wall joins one new cell to the tree, and 599 joins are needed to connect all 600.' },
        { q: 'Explain, from the way the algorithm works, why recursive backtracking produces long corridors while Prim\'s produces many short dead ends.', a: 'DFS always continues from the cell it just carved, so a corridor keeps growing until it is boxed in; branches appear only when it backs up. Prim\'s picks the next cell at random from the whole frontier, so growth jumps around the boundary and each corridor is abandoned after a step or two in favour of another.' },
        { q: 'In Wilson\'s algorithm the first random walk often wanders for a long time while later walks finish almost instantly. Why, and why is the result still unbiased?', a: 'The walk ends only when it touches the tree, which is a single cell at first and most of the grid at the end, so early walks must search for a tiny target. Erasing loops as they form and adding the loop-erased path is exactly the procedure Wilson proved yields every spanning tree with equal probability, regardless of which cells the walks start from.' },
      ],
      id: [
        { q: 'Grid simulasi berukuran 30 kali 20. Berapa dinding yang dibuang labirin sempurna mana pun di atasnya, dan mengapa algoritma tidak memengaruhi jumlah ini?', a: '599. Labirin sempurna adalah pohon merentang pada 600 sel, dan pohon selalu punya sisi satu lebih sedikit daripada simpulnya: setiap dinding yang dibuang menyambungkan satu sel baru ke pohon, dan dibutuhkan 599 sambungan untuk menghubungkan ke-600 sel.' },
        { q: 'Jelaskan, dari cara kerja algoritmanya, mengapa backtracking rekursif menghasilkan koridor panjang sedangkan Prim menghasilkan banyak jalan buntu pendek.', a: 'DFS selalu melanjutkan dari sel yang baru dibobolnya, sehingga koridor terus memanjang sampai terkurung; cabang baru muncul hanya ketika ia mundur. Prim memilih sel berikutnya secara acak dari seluruh frontir, sehingga pertumbuhan melompat-lompat di sepanjang batas dan setiap koridor ditinggalkan setelah satu atau dua langkah demi koridor lain.' },
        { q: 'Pada algoritma Wilson, jalan acak pertama sering berkeliaran lama sedangkan jalan-jalan berikutnya selesai hampir seketika. Mengapa, dan mengapa hasilnya tetap tak bias?', a: 'Jalan berakhir hanya ketika menyentuh pohon, yang awalnya hanya satu sel dan pada akhirnya hampir seluruh grid, sehingga jalan-jalan awal harus mencari sasaran yang sangat kecil. Menghapus loop saat terbentuk dan menambahkan jalur yang sudah terhapus loopnya adalah tepat prosedur yang dibuktikan Wilson menghasilkan setiap pohon merentang dengan peluang sama, dari sel mana pun jalan itu dimulai.' },
      ],
    },
  },
};
