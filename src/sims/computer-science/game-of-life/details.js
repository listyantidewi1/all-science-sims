// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Apply the survive/birth rules of B3/S23.',
      'Recognize iconic patterns: glider, blinker, beacon.',
      'See how local rules can produce global complexity.',
    ],
    id: [
      'Menerapkan aturan tetap-hidup/lahir B3/S23.',
      'Mengenali pola ikonik: glider, blinker, beacon.',
      'Melihat aturan lokal menghasilkan kompleksitas global.',
    ],
  },
  tryThis: {
    en: [
      'Place a glider — does it travel diagonally forever?',
      'Drop "random" twice — do you ever get the same outcome?',
      'Find a still life that doesn\'t change.',
    ],
    id: [
      'Letakkan glider — apakah ia bergerak diagonal selamanya?',
      'Klik "Random" dua kali — apakah hasilnya pernah sama?',
      'Cari pola "still life" yang tidak berubah.',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'The Game of Life, invented by the mathematician John Conway in 1970, is a cellular automaton: a grid of cells that are each either alive or dead, updated in steps called generations. Every cell looks at its eight neighbours (the cells touching it on the sides and corners) and counts how many are alive. A live cell with 2 or 3 live neighbours survives; with fewer it dies of loneliness, with more it dies of overcrowding. A dead cell with exactly 3 live neighbours becomes alive. That is the whole rule, often written B3/S23: born with 3, survive with 2 or 3.',
        'All cells are updated at the same time. The simulation first works out the fate of every cell from the current grid, then switches the whole grid at once, so a cell that is about to die still counts as a neighbour this generation. Nobody plays this game: once you have drawn the starting pattern, everything that follows is fixed by the rule. The same start always gives the same future, and yet the outcome is so rich that the only way to know what a pattern will do is to run it.',
        'The buttons give you three famous patterns. The blinker is three cells in a row that flips between horizontal and vertical every generation, an oscillator of period 2. The pulsar is a larger oscillator that repeats every 3 generations. The glider is five cells that rebuild themselves one cell diagonally further every 4 generations, so a shape appears to travel even though no cell ever moves. Random fills about a quarter of the grid and usually settles, after a few hundred generations, into a scattering of still lifes and small oscillators, with the occasional glider flying off.',
        'The real Game of Life is played on an infinite plane. This sim uses a 60 by 36 grid whose edges wrap around, so a glider leaving the right side re-enters on the left and may eventually collide with something it left behind. The speed slider only changes how many generations are computed per second, not the rule. Despite its simplicity, Life is known to be able to compute anything a computer can, which is why it remains a favourite example of how complexity can emerge from a very short list of local rules.',
      ],
      id: [
        'Game of Life, yang diciptakan matematikawan John Conway pada 1970, adalah otomata seluler: grid sel yang masing-masing hidup atau mati, diperbarui dalam langkah yang disebut generasi. Setiap sel melihat delapan tetangganya (sel yang menyentuhnya di sisi dan sudut) dan menghitung berapa yang hidup. Sel hidup dengan 2 atau 3 tetangga hidup bertahan; dengan lebih sedikit ia mati karena kesepian, dengan lebih banyak ia mati karena terlalu padat. Sel mati dengan tepat 3 tetangga hidup menjadi hidup. Itulah seluruh aturannya, sering ditulis B3/S23: lahir dengan 3, bertahan dengan 2 atau 3.',
        'Semua sel diperbarui bersamaan. Simulasi lebih dulu menentukan nasib setiap sel dari grid saat ini, lalu mengganti seluruh grid sekaligus, sehingga sel yang akan mati tetap dihitung sebagai tetangga pada generasi ini. Tidak ada yang memainkan permainan ini: begitu pola awal digambar, semua yang terjadi selanjutnya sudah ditentukan oleh aturan. Awal yang sama selalu memberi masa depan yang sama, namun hasilnya begitu kaya sehingga satu-satunya cara mengetahui perilaku sebuah pola adalah dengan menjalankannya.',
        'Tombol-tombolnya memberi tiga pola terkenal. Blinker adalah tiga sel sebaris yang berganti antara mendatar dan tegak setiap generasi, sebuah osilator berperiode 2. Pulsar adalah osilator lebih besar yang berulang setiap 3 generasi. Glider adalah lima sel yang membangun dirinya kembali satu sel lebih jauh secara diagonal setiap 4 generasi, sehingga bentuknya tampak bergerak meski tidak ada sel yang berpindah. Random mengisi sekitar seperempat grid dan biasanya, setelah beberapa ratus generasi, mengendap menjadi sebaran still life dan osilator kecil, dengan sesekali glider yang terbang pergi.',
        'Game of Life yang sebenarnya dimainkan pada bidang tak hingga. Simulasi ini memakai grid 60 kali 36 yang tepinya saling tersambung, sehingga glider yang keluar di sisi kanan masuk lagi dari kiri dan mungkin akhirnya menabrak sesuatu yang ditinggalkannya. Slider kecepatan hanya mengubah berapa generasi yang dihitung per detik, bukan aturannya. Meski sederhana, Life terbukti mampu menghitung apa pun yang bisa dihitung komputer, itulah sebabnya ia tetap menjadi contoh favorit bagaimana kompleksitas muncul dari daftar aturan lokal yang sangat pendek.',
      ],
    },
    figure: {
      caption: {
        en: 'Left: every cell counts its 8 neighbours. Right: the blinker. In generation 0 the middle cell has 2 neighbours and survives, the end cells have 1 and die, and the two dead cells above and below the middle each have exactly 3 and are born, giving a vertical blinker in generation 1.',
        id: 'Kiri: setiap sel menghitung 8 tetangganya. Kanan: blinker. Pada generasi 0 sel tengah punya 2 tetangga dan bertahan, sel ujung punya 1 dan mati, dan dua sel mati di atas dan di bawah sel tengah masing-masing punya tepat 3 sehingga lahir, menghasilkan blinker tegak pada generasi 1.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        const C = 22;
        const grid = (x0, y0, live, labels) => {
          let s = '';
          for (let y = 0; y < 3; y++) for (let x = 0; x < 3; x++) {
            const on = live.some(([a, b]) => a === x && b === y);
            s += `<rect x="${x0 + x * C}" y="${y0 + y * C}" width="${C}" height="${C}" class="c" fill="${on ? '#8b5cf6' : 'none'}"/>`;
            const lab = labels && labels[y][x];
            if (lab !== undefined && lab !== '') s += `<text x="${x0 + x * C + 11}" y="${y0 + y * C + 15}" text-anchor="middle" class="n" fill="${on ? '#fff' : 'currentColor'}">${lab}</text>`;
          }
          return s;
        };
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Life rule and the blinker', 'Aturan Life dan blinker')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.c{stroke:currentColor;stroke-width:1;stroke-opacity:.5}.n{font-size:10px}.t{font-weight:700}.s{font-size:10px;opacity:.75}</style>
  <text x="14" y="26" class="t">${L('8 neighbours', '8 tetangga')}</text>
  ${grid(20, 40, [[1, 1]], [['', '', ''], ['', '', ''], ['', '', '']])}
  <text x="31" y="55" text-anchor="middle" class="n" fill="#3b82f6">N</text><text x="53" y="55" text-anchor="middle" class="n" fill="#3b82f6">N</text><text x="75" y="55" text-anchor="middle" class="n" fill="#3b82f6">N</text>
  <text x="31" y="77" text-anchor="middle" class="n" fill="#3b82f6">N</text><text x="75" y="77" text-anchor="middle" class="n" fill="#3b82f6">N</text>
  <text x="31" y="99" text-anchor="middle" class="n" fill="#3b82f6">N</text><text x="53" y="99" text-anchor="middle" class="n" fill="#3b82f6">N</text><text x="75" y="99" text-anchor="middle" class="n" fill="#3b82f6">N</text>
  <text x="14" y="130" class="s">${L('live, 2 or 3 N: survives', 'hidup, 2 atau 3 N: bertahan')}</text>
  <text x="14" y="146" class="s">${L('live, other: dies', 'hidup, selain itu: mati')}</text>
  <text x="14" y="162" class="s">${L('dead, exactly 3 N: born', 'mati, tepat 3 N: lahir')}</text>
  <text x="150" y="26" class="t">${L('Blinker, generation 0', 'Blinker, generasi 0')}</text>
  ${grid(160, 40, [[0, 1], [1, 1], [2, 1]], [['2', '3', '2'], ['1', '2', '1'], ['2', '3', '2']])}
  <text x="150" y="130" class="t">${L('generation 1', 'generasi 1')}</text>
  ${grid(160, 144, [[1, 0], [1, 1], [1, 2]], null)}
  <path d="M236 106 L236 128" stroke="currentColor" stroke-width="1.5" fill="none" marker-end="url(#ar)"/>
  <text x="246" y="62" class="s" fill="#10b981">${L('3: born', '3: lahir')}</text>
  <text x="246" y="84" class="s" fill="#ef4444">${L('1: dies', '1: mati')}</text>
  <text x="246" y="100" class="s">${L('2: survives', '2: bertahan')}</text>
  <text x="246" y="176" class="s">${L('period 2: it flips back', 'periode 2: kembali lagi')}</text>
  <text x="246" y="190" class="s">${L('next generation', 'pada generasi berikutnya')}</text>
  <defs><marker id="ar" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="context-stroke"/></marker></defs>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Each cell follows one rule using only its 8 neighbours: a live cell survives with 2 or 3 live neighbours, a dead cell is born with exactly 3.',
        'All cells update at the same moment, so one generation is computed from a frozen copy of the previous one.',
        'The same starting pattern always produces the same future, yet the only way to find out what happens is to run it.',
        'Patterns like the glider appear to move, but no cell ever moves; cells die in one place and are born in another.',
        'Simple local rules can create still lifes, oscillators, travelling shapes and, in the full game, even working computers.',
      ],
      id: [
        'Setiap sel mengikuti satu aturan hanya dengan 8 tetangganya: sel hidup bertahan dengan 2 atau 3 tetangga hidup, sel mati lahir dengan tepat 3.',
        'Semua sel diperbarui pada saat yang sama, sehingga satu generasi dihitung dari salinan beku generasi sebelumnya.',
        'Pola awal yang sama selalu menghasilkan masa depan yang sama, tetapi satu-satunya cara mengetahui apa yang terjadi adalah menjalankannya.',
        'Pola seperti glider tampak bergerak, tetapi tidak ada sel yang berpindah; sel mati di satu tempat dan lahir di tempat lain.',
        'Aturan lokal sederhana bisa menciptakan still life, osilator, bentuk yang bergerak, dan dalam permainan lengkapnya bahkan komputer yang bekerja.',
      ],
    },
    vocabulary: {
      en: [
        ['Cellular automaton', 'A grid of cells that all change state at once according to a rule that depends only on neighbouring cells.'],
        ['Generation', 'One update of the whole grid; the counter in the corner shows how many have passed.'],
        ['Neighbourhood', 'The 8 cells surrounding a cell, including the diagonal ones (the Moore neighbourhood).'],
        ['Still life', 'A pattern that does not change from one generation to the next, such as a 2 by 2 block.'],
        ['Oscillator', 'A pattern that returns to its original shape after a fixed number of generations, its period.'],
        ['Glider', 'A five-cell pattern that reappears one cell further along a diagonal every 4 generations.'],
        ['Emergence', 'Large-scale behaviour, like moving shapes, that is not written in the rules but arises from them.'],
      ],
      id: [
        ['Otomata seluler', 'Grid sel yang semuanya berubah keadaan sekaligus menurut aturan yang hanya bergantung pada sel tetangga.'],
        ['Generasi', 'Satu pembaruan seluruh grid; penghitung di pojok menunjukkan berapa yang sudah berlalu.'],
        ['Lingkungan (neighbourhood)', '8 sel yang mengelilingi sebuah sel, termasuk yang diagonal (lingkungan Moore).'],
        ['Still life', 'Pola yang tidak berubah dari satu generasi ke generasi berikutnya, misalnya blok 2 kali 2.'],
        ['Osilator', 'Pola yang kembali ke bentuk semula setelah sejumlah generasi tertentu, yaitu periodenya.'],
        ['Glider', 'Pola lima sel yang muncul kembali satu sel lebih jauh di sepanjang diagonal setiap 4 generasi.'],
        ['Emergence', 'Perilaku skala besar, seperti bentuk yang bergerak, yang tidak tertulis dalam aturan tetapi muncul darinya.'],
      ],
    },
    misconceptions: {
      en: [
        ['The glider is a creature that moves across the grid.', 'No cell ever moves. Each generation some cells die and others are born, and the new arrangement happens to be the same shape shifted one step. Movement is an illusion created by the rule.'],
        ['Cells are updated one after another, so order matters.', 'All cells are updated simultaneously from the previous generation. The sim computes the whole next grid first and then swaps it in, so no cell sees a half-updated neighbour.'],
        ['Because the Random button gives a different picture every time, the game itself is random.', 'The only randomness is in the starting pattern. From any given grid the rule produces exactly one next grid; run the same start twice and you get identical futures.'],
        ['A random start always ends in total death or total chaos.', 'Most random fills calm down after a few hundred generations into a mix of still lifes, blinkers and other small oscillators, sometimes with a glider escaping.'],
      ],
      id: [
        ['Glider adalah makhluk yang bergerak melintasi grid.', 'Tidak ada sel yang berpindah. Setiap generasi beberapa sel mati dan yang lain lahir, dan susunan barunya kebetulan berbentuk sama tetapi bergeser satu langkah. Gerakannya adalah ilusi yang diciptakan aturan.'],
        ['Sel diperbarui satu demi satu, jadi urutannya berpengaruh.', 'Semua sel diperbarui serentak dari generasi sebelumnya. Simulasi menghitung seluruh grid berikutnya lebih dulu, lalu menukarnya, sehingga tidak ada sel yang melihat tetangga yang setengah diperbarui.'],
        ['Karena tombol Random memberi gambar berbeda setiap kali, permainannya sendiri acak.', 'Satu-satunya keacakan ada pada pola awal. Dari grid tertentu, aturan menghasilkan tepat satu grid berikutnya; jalankan awal yang sama dua kali dan masa depannya identik.'],
        ['Awal acak selalu berakhir dengan kematian total atau kekacauan total.', 'Kebanyakan isian acak mereda setelah beberapa ratus generasi menjadi campuran still life, blinker, dan osilator kecil lain, kadang dengan glider yang lolos pergi.'],
      ],
    },
    realWorld: {
      en: [
        'Cellular automata are used to model forest fires, the spread of diseases and the growth of cities, where each patch of land reacts only to its neighbours.',
        'Snowflakes and seashell patterns are studied with cellular automata, because local growth rules give their repeated shapes.',
        'Traffic engineers use one-dimensional cellular automata to reproduce how jams form on a motorway from simple following rules.',
        'The idea that a simple program can compute anything, demonstrated in Life, underlies how programmers think about what computers can and cannot do.',
      ],
      id: [
        'Otomata seluler dipakai untuk memodelkan kebakaran hutan, penyebaran penyakit, dan pertumbuhan kota, di mana setiap petak lahan hanya bereaksi terhadap tetangganya.',
        'Kepingan salju dan pola kerang dipelajari dengan otomata seluler, karena aturan tumbuh lokal menghasilkan bentuk berulangnya.',
        'Insinyur lalu lintas memakai otomata seluler satu dimensi untuk meniru bagaimana kemacetan terbentuk di jalan tol dari aturan mengikuti yang sederhana.',
        'Gagasan bahwa program sederhana dapat menghitung apa saja, yang diperlihatkan Life, mendasari cara pemrogram berpikir tentang apa yang bisa dan tidak bisa dilakukan komputer.',
      ],
    },
    questions: {
      en: [
        { q: 'A live cell has 4 live neighbours. What happens to it in the next generation, and why?', a: 'It dies. A live cell only survives with exactly 2 or 3 live neighbours; 4 counts as overcrowding. Note that the 4 neighbours themselves may survive or die depending on their own counts.' },
        { q: 'Why does a 2 by 2 block of live cells never change? Check both the live cells and the dead cells around it.', a: 'Each live cell in the block touches the other 3, so it has 3 neighbours and survives. Any dead cell next to the block touches at most 2 of its cells (the ones along its edge), so none has the 3 needed to be born. Nothing changes, so the block is a still life.' },
        { q: 'A glider advances one cell diagonally every 4 generations. On this 60-cell-wide grid, how many generations does it take to return to its starting column, and what might stop it from doing so?', a: 'About 240 generations (60 cells times 4 generations per cell), since the edges wrap around. It can be stopped if, while wrapping around, it runs into debris left on the grid, because a collision with other live cells usually destroys the glider.' },
      ],
      id: [
        { q: 'Sebuah sel hidup punya 4 tetangga hidup. Apa yang terjadi padanya di generasi berikutnya, dan mengapa?', a: 'Ia mati. Sel hidup hanya bertahan dengan tepat 2 atau 3 tetangga hidup; 4 dihitung terlalu padat. Perhatikan bahwa keempat tetangganya sendiri bisa bertahan atau mati, bergantung pada hitungan mereka masing-masing.' },
        { q: 'Mengapa blok 2 kali 2 sel hidup tidak pernah berubah? Periksa sel hidupnya maupun sel mati di sekitarnya.', a: 'Setiap sel hidup dalam blok menyentuh 3 sel lainnya, sehingga punya 3 tetangga dan bertahan. Sel mati mana pun di sebelah blok menyentuh paling banyak 2 selnya (yang ada di sepanjang sisinya), sehingga tidak ada yang mencapai 3 untuk lahir. Tidak ada yang berubah, jadi blok adalah still life.' },
        { q: 'Glider maju satu sel diagonal setiap 4 generasi. Pada grid selebar 60 sel ini, berapa generasi yang dibutuhkan untuk kembali ke kolom awalnya, dan apa yang bisa mencegahnya?', a: 'Sekitar 240 generasi (60 sel dikali 4 generasi per sel), karena tepinya saling tersambung. Ia bisa terhenti jika, saat memutar, menabrak sisa pola yang tertinggal di grid, karena tabrakan dengan sel hidup lain biasanya menghancurkan glider.' },
      ],
    },
  },
};
