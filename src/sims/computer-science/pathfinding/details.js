// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Distinguish uninformed (BFS) from informed (A*) search.',
      'Predict how a heuristic prunes the search space.',
      'Identify scenarios where heuristics give little advantage.',
    ],
    id: [
      'Membedakan pencarian tanpa informasi (BFS) dan dengan informasi (A*).',
      'Memprediksi bagaimana heuristik memangkas ruang pencarian.',
      'Mengenali skenario saat heuristik tidak banyak membantu.',
    ],
  },
  tryThis: {
    en: [
      'Place a wall maze between start and goal — compare cells visited.',
      'Move the goal directly behind a wall — does A* still help?',
      'Switch the algorithm mid-search to compare frontiers.',
    ],
    id: [
      'Buat labirin dinding antara titik awal dan tujuan — bandingkan jumlah sel yang dikunjungi.',
      'Pindahkan tujuan tepat di balik dinding — apakah A* masih membantu?',
      'Ganti algoritma di tengah pencarian untuk membandingkan frontir.',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'Pathfinding asks a simple question: what is the shortest route from a start to a goal when some squares are blocked? The simulation turns a 30 by 18 grid of 540 cells into a graph. Every free cell is a node, and each node is joined to the free cells directly above, below, left and right of it. Walls are simply cells with no connections, and every move costs exactly one step. The green cell is the start and the red cell is the goal; you can drag both, and you can click or drag on empty cells to paint or erase walls.',
        'Breadth-first search (BFS) is the uninformed strategy. It keeps a queue of discovered cells, always takes the oldest one, and adds its unvisited neighbours to the back of the queue. Because cells are processed strictly in order of distance, the frontier spreads outward in rings, one step further each round, in every direction at once, including away from the goal. The first time the goal is reached, the path back through the recorded parents is guaranteed to be a shortest one, since every shorter path would have been found earlier. The cost is that BFS has no idea where the goal is, so it fills large regions that turn out to be useless.',
        'A* adds information. For each discovered cell it tracks g, the number of steps taken to reach it, and estimates the steps still needed with a heuristic h. The simulation uses the Manhattan distance, the horizontal plus vertical difference to the goal, and always expands the cell with the smallest f = g + h. On this grid Manhattan distance never overestimates the true remaining distance, so A* is admissible and also finds a shortest path. The difference is that cells leading away from the goal have a large h and sit unexpanded on the open list, so the blue visited region becomes a narrow band pointed at the goal. The header counts visited cells, meaning cells taken off the frontier and expanded (the same definition for both algorithms, so a cell that BFS has merely queued is not yet counted), and the length of the final path (in cells, including start and goal) so you can compare both algorithms on the same map.',
        'The sim keeps things simple on purpose. There are no diagonal moves and no terrain costs, so BFS already behaves like Dijkstra\'s algorithm, and the Manhattan heuristic is a perfect estimate only when nothing is in the way. The heuristic knows nothing about your walls: when the goal sits behind a U-shaped barrier, A* confidently heads straight for it, fills the pocket, and ends up visiting almost as many cells as BFS. Ties are common too, since many cells share the same f, and the sim does not break them cleverly. The speed slider only changes how fast the animation plays; it does not change what either algorithm does.',
      ],
      id: [
        'Pencarian jalur menjawab pertanyaan sederhana: rute terpendek dari titik awal ke tujuan ketika sebagian petak terhalang. Simulasi ini mengubah grid 30 kali 18 berisi 540 sel menjadi sebuah graf. Setiap sel kosong adalah simpul, dan tiap simpul terhubung dengan sel kosong tepat di atas, bawah, kiri, dan kanannya. Dinding hanyalah sel tanpa sambungan, dan setiap langkah berbiaya tepat satu. Sel hijau adalah titik awal dan sel merah adalah tujuan; keduanya bisa diseret, dan kamu bisa mengklik atau menyeret pada sel kosong untuk menggambar atau menghapus dinding.',
        'Breadth-first search (BFS) adalah strategi tanpa informasi. Ia menyimpan antrean sel yang sudah ditemukan, selalu mengambil yang paling lama, lalu menambahkan tetangga yang belum dikunjungi ke belakang antrean. Karena sel diproses urut berdasarkan jarak, frontirnya melebar seperti cincin, satu langkah lebih jauh setiap putaran, ke semua arah sekaligus, termasuk menjauhi tujuan. Saat tujuan pertama kali tercapai, jalur yang ditelusuri balik lewat catatan induknya dijamin merupakan jalur terpendek, karena setiap jalur yang lebih pendek pasti sudah ditemukan lebih dulu. Harganya, BFS sama sekali tidak tahu di mana tujuan berada, sehingga ia mengisi wilayah luas yang ternyata sia-sia.',
        'A* menambahkan informasi. Untuk setiap sel yang ditemukan, ia mencatat g, yaitu jumlah langkah yang sudah ditempuh, dan menaksir langkah yang masih diperlukan dengan sebuah heuristik h. Simulasi memakai jarak Manhattan, yaitu selisih mendatar ditambah selisih tegak ke tujuan, dan selalu mengembangkan sel dengan f = g + h terkecil. Pada grid ini jarak Manhattan tidak pernah menaksir lebih dari jarak sebenarnya, sehingga A* bersifat admissible dan juga menemukan jalur terpendek. Bedanya, sel yang menjauhi tujuan memiliki h besar dan hanya menunggu di daftar terbuka tanpa dikembangkan, sehingga wilayah biru yang dikunjungi menjadi pita sempit yang mengarah ke tujuan. Baris judul menghitung sel yang dikunjungi, yaitu sel yang sudah diambil dari frontir dan dikembangkan (definisi yang sama untuk kedua algoritma, sehingga sel yang baru diantrekan BFS belum ikut dihitung), dan panjang jalur akhir (dalam sel, termasuk awal dan tujuan) supaya kedua algoritma bisa dibandingkan pada peta yang sama.',
        'Simulasi ini sengaja dibuat sederhana. Tidak ada gerak diagonal dan tidak ada biaya medan, sehingga BFS sudah berperilaku seperti algoritma Dijkstra, dan heuristik Manhattan menjadi taksiran sempurna hanya jika tidak ada penghalang. Heuristik tidak tahu apa-apa tentang dindingmu: ketika tujuan berada di balik penghalang berbentuk U, A* dengan yakin menuju ke arahnya, mengisi kantong itu, dan akhirnya mengunjungi hampir sebanyak BFS. Seri nilai f juga sering terjadi karena banyak sel punya f yang sama, dan simulasi tidak memecah seri itu dengan cerdik. Slider kecepatan hanya mengubah laju animasi; ia tidak mengubah apa pun yang dilakukan kedua algoritma.',
      ],
    },
    figure: {
      caption: {
        en: 'The same 5 by 3 grid, start S and goal G three steps apart. BFS (left) processes cells in order of g, expanding in rings in every direction, and has discovered 13 cells when it reaches G. A* (right) expands only the four cells with the lowest f = g + h; cells with f = 5 are placed on the open list but never expanded.',
        id: 'Grid 5 kali 3 yang sama, awal S dan tujuan G berjarak tiga langkah. BFS (kiri) memproses sel urut menurut g, mengembang seperti cincin ke semua arah, dan sudah menemukan 13 sel saat mencapai G. A* (kanan) hanya mengembangkan empat sel dengan f = g + h terkecil; sel dengan f = 5 masuk daftar terbuka tetapi tidak pernah dikembangkan.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        const C = 30;
        // BFS distances from S=(1,1) to G=(4,1) on an open 5x3 grid.
        const g = [[2, 1, 2, 3, 4], [1, 0, 1, 2, 3], [2, 1, 2, 3, 4]];
        const bfsSeen = (x, y) => g[y][x] <= 3; // discovered by the time G (g=3) is dequeued
        const h = (x, y) => Math.abs(x - 4) + Math.abs(y - 1);
        const expanded = (x, y) => y === 1 && x >= 1; // A* only pops the f=3 cells
        const touched = (x, y) => expanded(x, y) || (y !== 1 && x >= 1) || (x === 0 && y === 1);
        let cells = '';
        for (let y = 0; y < 3; y++) {
          for (let x = 0; x < 5; x++) {
            const isS = x === 1 && y === 1, isG = x === 4 && y === 1;
            const fillL = isS ? '#10b981' : isG ? '#ef4444' : bfsSeen(x, y) ? '#3b82f6' : 'none';
            const fillR = isS ? '#10b981' : isG ? '#ef4444' : expanded(x, y) ? '#3b82f6' : 'none';
            const lx = 15 + x * C, rx = 195 + x * C, yy = 50 + y * C;
            cells += `<rect x="${lx}" y="${yy}" width="${C}" height="${C}" class="g" fill="${fillL}" fill-opacity="${isS || isG ? 0.9 : 0.35}"/>`;
            cells += `<text x="${lx + 15}" y="${yy + 19}" text-anchor="middle">${isS ? 'S' : isG ? 'G' : g[y][x]}</text>`;
            cells += `<rect x="${rx}" y="${yy}" width="${C}" height="${C}" class="g" fill="${fillR}" fill-opacity="${isS || isG ? 0.9 : 0.35}"/>`;
            const f = g[y][x] + h(x, y);
            cells += `<text x="${rx + 15}" y="${yy + 19}" text-anchor="middle" opacity="${expanded(x, y) || isS || isG ? 1 : touched(x, y) ? 0.55 : 0}">${isS ? 'S' : isG ? 'G' : f}</text>`;
          }
        }
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('BFS and A* on a small grid', 'BFS dan A* pada grid kecil')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.g{stroke:currentColor;stroke-width:1;stroke-opacity:.5}.t{font-weight:700}.s{font-size:10px;opacity:.75}</style>
  <text x="15" y="30" class="t">${L('BFS: g = steps from S', 'BFS: g = langkah dari S')}</text>
  <text x="195" y="30" class="t">${L('A*: f = g + h', 'A*: f = g + h')}</text>
  ${cells}
  <text x="15" y="162" class="s">${L('13 cells discovered, all directions', '13 sel ditemukan, ke semua arah')}</text>
  <text x="195" y="162" class="s">${L('4 cells expanded, straight at G', '4 sel dikembangkan, lurus ke G')}</text>
  <rect x="15" y="182" width="12" height="12" fill="#3b82f6" fill-opacity=".35" class="g"/>
  <text x="32" y="192" class="s">${L('visited', 'dikunjungi')}</text>
  <rect x="95" y="182" width="12" height="12" fill="#10b981" class="g"/>
  <text x="112" y="192" class="s">${L('start', 'awal')}</text>
  <rect x="160" y="182" width="12" height="12" fill="#ef4444" class="g"/>
  <text x="177" y="192" class="s">${L('goal', 'tujuan')}</text>
  <text x="15" y="222" class="s">${L('h = Manhattan distance = |dx| + |dy| to G', 'h = jarak Manhattan = |dx| + |dy| ke G')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'A grid becomes a graph: cells are nodes, moves between free neighbours are edges, and each move costs one step.',
        'BFS expands cells in order of distance from the start, so the first time it reaches the goal it has found a shortest path.',
        'A* orders cells by f = g + h, steps taken plus an estimate of steps left, and expands far fewer cells when the estimate is good.',
        'A heuristic that never overestimates (admissible), such as Manhattan distance on this grid, keeps A* optimal: both algorithms report the same path length.',
        'A heuristic cannot see walls, so when the goal is behind a barrier A* loses most of its advantage.',
      ],
      id: [
        'Grid menjadi graf: sel adalah simpul, perpindahan antar tetangga kosong adalah sisi, dan tiap perpindahan berbiaya satu langkah.',
        'BFS mengembangkan sel urut menurut jarak dari awal, sehingga saat pertama kali mencapai tujuan ia sudah menemukan jalur terpendek.',
        'A* mengurutkan sel menurut f = g + h, langkah yang ditempuh ditambah taksiran langkah tersisa, dan mengembangkan jauh lebih sedikit sel jika taksirannya bagus.',
        'Heuristik yang tidak pernah menaksir berlebih (admissible), seperti jarak Manhattan pada grid ini, menjaga A* tetap optimal: kedua algoritma melaporkan panjang jalur yang sama.',
        'Heuristik tidak bisa melihat dinding, sehingga ketika tujuan berada di balik penghalang, A* kehilangan sebagian besar keunggulannya.',
      ],
    },
    vocabulary: {
      en: [
        ['Graph', 'A set of nodes joined by edges; here the free cells and the moves between neighbouring cells.'],
        ['Frontier (open list)', 'The cells that have been discovered but not yet expanded; BFS stores it as a queue, A* as a set ordered by f.'],
        ['Breadth-first search', 'An uninformed search that expands cells in order of their distance from the start.'],
        ['Heuristic (h)', 'An estimate of the remaining cost to the goal, used to decide which cell to expand next.'],
        ['Manhattan distance', 'The horizontal plus vertical distance between two cells, the number of moves needed with no walls in the way.'],
        ['Admissible', 'A heuristic that never overestimates the true remaining cost; it guarantees A* returns a shortest path.'],
        ['g, h and f', 'g is the cost so far, h the estimated cost to go, and f = g + h the priority A* uses.'],
        ['Path reconstruction', 'Following the recorded parent of each cell backwards from the goal to the start to produce the route.'],
      ],
      id: [
        ['Graf', 'Himpunan simpul yang dihubungkan oleh sisi; di sini sel kosong dan perpindahan antar sel yang bertetangga.'],
        ['Frontir (daftar terbuka)', 'Sel yang sudah ditemukan tetapi belum dikembangkan; BFS menyimpannya sebagai antrean, A* sebagai himpunan yang diurutkan menurut f.'],
        ['Breadth-first search', 'Pencarian tanpa informasi yang mengembangkan sel urut menurut jaraknya dari titik awal.'],
        ['Heuristik (h)', 'Taksiran biaya tersisa menuju tujuan, dipakai untuk memilih sel mana yang dikembangkan berikutnya.'],
        ['Jarak Manhattan', 'Jarak mendatar ditambah jarak tegak antara dua sel, yaitu jumlah langkah yang dibutuhkan jika tidak ada dinding.'],
        ['Admissible', 'Heuristik yang tidak pernah menaksir lebih dari biaya tersisa sebenarnya; menjamin A* menghasilkan jalur terpendek.'],
        ['g, h, dan f', 'g adalah biaya yang sudah ditempuh, h taksiran biaya tersisa, dan f = g + h prioritas yang dipakai A*.'],
        ['Rekonstruksi jalur', 'Menelusuri catatan induk setiap sel mundur dari tujuan ke awal untuk membentuk rute.'],
      ],
    },
    misconceptions: {
      en: [
        ['A* finds a shorter path than BFS.', 'On this grid both find a path of the same, shortest length. A* wins on effort (cells visited), not on path quality, because its heuristic never overestimates.'],
        ['A heuristic always makes the search faster.', 'Only when it gives useful information. Behind a wall the Manhattan estimate is badly wrong, so A* explores the dead end just as BFS would.'],
        ['The algorithm sees the whole map and plans the route in one go.', 'Neither algorithm looks ahead. Both discover the grid one neighbour at a time; the heuristic is just a number computed from coordinates, with no knowledge of walls.'],
        ['The "Visited" count is the length of the path.', 'Visited counts every cell the search expanded, that is, took off its frontier and examined. The path is the much shorter yellow chain reconstructed from the goal back to the start.'],
      ],
      id: [
        ['A* menemukan jalur yang lebih pendek daripada BFS.', 'Pada grid ini keduanya menemukan jalur dengan panjang terpendek yang sama. A* unggul dalam usaha (jumlah sel yang dikunjungi), bukan dalam kualitas jalur, karena heuristiknya tidak pernah menaksir berlebih.'],
        ['Heuristik selalu membuat pencarian lebih cepat.', 'Hanya jika informasinya berguna. Di balik dinding, taksiran Manhattan sangat meleset, sehingga A* menjelajahi jalan buntu itu persis seperti BFS.'],
        ['Algoritma melihat seluruh peta dan merencanakan rute sekali jalan.', 'Keduanya tidak melihat ke depan. Keduanya menemukan grid satu tetangga demi satu; heuristik hanyalah angka yang dihitung dari koordinat, tanpa pengetahuan tentang dinding.'],
        ['Angka "Visited" adalah panjang jalur.', 'Visited menghitung setiap sel yang dikembangkan pencarian, yaitu diambil dari frontir dan diperiksa. Jalur adalah rantai kuning yang jauh lebih pendek, direkonstruksi dari tujuan mundur ke awal.'],
      ],
    },
    realWorld: {
      en: [
        'Map apps compute driving routes with A*-style searches on road graphs, using straight-line distance or precomputed travel times as the heuristic.',
        'Characters in video games use A* on a grid or navigation mesh to walk around obstacles toward the player.',
        'Warehouse robots and vacuum robots plan collision-free paths on an occupancy grid, exactly like the walls you paint here.',
        'BFS is used wherever every step costs the same: finding the fewest hops between two people in a social network, or the fewest moves in a sliding puzzle.',
      ],
      id: [
        'Aplikasi peta menghitung rute berkendara dengan pencarian ala A* pada graf jalan, memakai jarak garis lurus atau waktu tempuh yang sudah dihitung sebagai heuristik.',
        'Karakter dalam gim video memakai A* pada grid atau navigation mesh untuk berjalan mengitari rintangan menuju pemain.',
        'Robot gudang dan robot penyedot debu merencanakan jalur bebas tabrakan pada grid okupansi, persis seperti dinding yang kamu gambar di sini.',
        'BFS dipakai di mana pun setiap langkah berbiaya sama: mencari lompatan paling sedikit antara dua orang di jejaring sosial, atau gerakan paling sedikit dalam puzzle geser.',
      ],
    },
    questions: {
      en: [
        { q: 'The default start is at column 2, row 15 and the goal at column 27, row 2. What is the Manhattan heuristic at the start, and what does it tell you about the shortest path on an empty grid?', a: 'h = |27 − 2| + |2 − 15| = 25 + 13 = 38. With no walls, 38 moves is exactly the shortest path length, so the path will contain 39 cells including start and goal. Any wall on the way can only make the real path longer, never shorter, which is why Manhattan distance is admissible.' },
        { q: 'BFS never looks at the goal position while it searches. Why is the path it returns still a shortest one?', a: 'BFS processes cells strictly in order of their distance g from the start: all cells at distance 1, then all at distance 2, and so on. If the goal is first reached at distance d, no path of length less than d can exist, because every cell at a smaller distance was already processed without the goal appearing.' },
        { q: 'You put the goal inside a U-shaped wall whose opening faces away from the start. Predict how the visited counts of BFS and A* compare, and explain why.', a: 'They become similar. A* rushes toward the goal because h is small on the near side of the wall, fills the whole pocket in front of the wall, and only then expands cells with larger f around the barrier. The heuristic is computed from coordinates and ignores walls, so its guidance is misleading here.' },
      ],
      id: [
        { q: 'Titik awal bawaan ada di kolom 2, baris 15 dan tujuan di kolom 27, baris 2. Berapa heuristik Manhattan di titik awal, dan apa artinya bagi jalur terpendek pada grid kosong?', a: 'h = |27 − 2| + |2 − 15| = 25 + 13 = 38. Tanpa dinding, 38 langkah tepat merupakan panjang jalur terpendek, sehingga jalur berisi 39 sel termasuk awal dan tujuan. Dinding apa pun di tengah jalan hanya bisa membuat jalur sebenarnya lebih panjang, tidak pernah lebih pendek; itulah sebabnya jarak Manhattan bersifat admissible.' },
        { q: 'BFS tidak pernah melihat posisi tujuan selama mencari. Mengapa jalur yang dihasilkannya tetap jalur terpendek?', a: 'BFS memproses sel urut ketat menurut jarak g dari awal: semua sel berjarak 1, lalu semua berjarak 2, dan seterusnya. Jika tujuan pertama kali dicapai pada jarak d, tidak mungkin ada jalur yang panjangnya kurang dari d, karena semua sel dengan jarak lebih kecil sudah diproses tanpa menemukan tujuan.' },
        { q: 'Kamu meletakkan tujuan di dalam dinding berbentuk U yang bukaannya menghadap menjauhi titik awal. Prediksi perbandingan jumlah sel yang dikunjungi BFS dan A*, dan jelaskan alasannya.', a: 'Keduanya menjadi hampir sama. A* bergegas menuju tujuan karena h kecil di sisi dekat dinding, mengisi seluruh kantong di depan dinding, dan baru kemudian mengembangkan sel dengan f lebih besar untuk memutari penghalang. Heuristik dihitung dari koordinat dan mengabaikan dinding, sehingga arahannya menyesatkan di sini.' },
      ],
    },
  },
};
