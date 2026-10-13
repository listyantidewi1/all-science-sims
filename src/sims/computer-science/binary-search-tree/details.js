// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Apply BST insert, search, and delete rules.',
      'Recognize how tree shape determines lookup cost.',
      'Identify pathological vs balanced insertion orders.',
    ],
    id: [
      'Menerapkan aturan sisip, cari, dan hapus pada BST.',
      'Mengenali bagaimana bentuk pohon menentukan biaya pencarian.',
      'Mengidentifikasi urutan penyisipan patologis vs seimbang.',
    ],
  },  tryThis: {
    en: [
      'Insert 1, 2, 3, 4, 5 in order — what shape is the tree?',
      'Insert the same numbers in order 3, 1, 4, 2, 5 — compare height.',
      'Delete the root — which node replaces it?',
    ],
    id: [
      'Sisipkan 1, 2, 3, 4, 5 berurutan — bagaimana bentuk pohonnya?',
      'Sisipkan angka yang sama dengan urutan 3, 1, 4, 2, 5 — bandingkan tingginya.',
      'Hapus akar — node mana yang menggantikannya?',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'A binary search tree (BST) stores values in nodes that each have up to two children, with one rule enforced everywhere: everything in a node\'s left subtree is smaller than the node, and everything in its right subtree is larger. That rule turns searching into a series of yes/no decisions. Starting at the root you compare the target with the node\'s value, go left if it is smaller or right if it is larger, and repeat until you find it or run out of tree. Every comparison discards an entire subtree, exactly as binary search on a sorted array discards half the remaining range, but a tree also allows cheap insertions and deletions, which an array does not. Walking the tree in order (left subtree, node, right subtree) visits the values in sorted order.',
        'Insertion follows the same search path until it falls off the tree, then attaches the new value as a leaf there; this sim silently ignores a value that is already present. Search highlights the nodes it visits one by one. Deletion has three cases. A leaf is simply removed. A node with one child is replaced by that child. A node with two children is replaced by its in-order successor, the smallest value in its right subtree, which is then deleted from where it was (it has at most one child, so that removal is easy). Deleting the root 50 of the starting tree, for example, pulls 60 up to take its place.',
        'Every operation walks one path from the root, so its cost is the length of that path, at most the height of the tree. A perfectly balanced tree of n nodes has height about log₂ n: a million values fit in a tree only 20 levels deep. But the shape depends entirely on insertion order. Insert 1, 2, 3, ... in sorted order and each new value is larger than everything before it, so it always goes right, producing a chain of height n that is no better than a linked list. The sim reports the node count and the height (counted in nodes, so a lone root has height 1), and the preset buttons let you compare sorted, balanced and random insertion orders; random orders typically give heights not much worse than the ideal.',
        'This is a plain BST with no self-balancing. Real-world implementations such as AVL trees and red-black trees perform small rotations after each insertion or deletion to guarantee a height of O(log n) whatever the input order; they are what sorted maps and sets in most programming languages use underneath. The sim also always chooses the in-order successor for two-child deletions (the predecessor would work just as well), handles only numbers, and spreads the drawing by in-order position, so the picture shows shape and depth faithfully but not the memory layout of a real tree.',
      ],
      id: [
        'Pohon pencarian biner (BST) menyimpan nilai dalam node yang masing-masing memiliki paling banyak dua anak, dengan satu aturan yang berlaku di mana-mana: semua yang berada di subpohon kiri sebuah node lebih kecil daripada node itu, dan semua di subpohon kanannya lebih besar. Aturan itu mengubah pencarian menjadi rangkaian keputusan ya/tidak. Mulai dari akar, kamu membandingkan target dengan nilai node, ke kiri jika lebih kecil atau ke kanan jika lebih besar, dan mengulanginya sampai menemukannya atau kehabisan pohon. Setiap perbandingan membuang seluruh subpohon, persis seperti pencarian biner pada array terurut membuang setengah rentang yang tersisa, tetapi pohon juga memungkinkan penyisipan dan penghapusan yang murah, yang tidak dimiliki array. Menelusuri pohon secara in-order (subpohon kiri, node, subpohon kanan) mengunjungi nilai-nilai dalam urutan terurut.',
        'Penyisipan mengikuti jalur pencarian yang sama sampai keluar dari pohon, lalu menempelkan nilai baru sebagai daun di sana; sim ini diam-diam mengabaikan nilai yang sudah ada. Pencarian menyorot node yang dikunjunginya satu per satu. Penghapusan memiliki tiga kasus. Daun cukup dihilangkan. Node dengan satu anak digantikan oleh anaknya itu. Node dengan dua anak digantikan oleh penerus in-order-nya, yaitu nilai terkecil di subpohon kanannya, yang kemudian dihapus dari tempat asalnya (ia memiliki paling banyak satu anak, sehingga penghapusan itu mudah). Menghapus akar 50 dari pohon awal, misalnya, menarik 60 naik untuk menggantikannya.',
        'Setiap operasi menelusuri satu jalur dari akar, sehingga biayanya adalah panjang jalur itu, paling banyak sama dengan tinggi pohon. Pohon yang seimbang sempurna dengan n node memiliki tinggi sekitar log₂ n: sejuta nilai muat dalam pohon yang hanya 20 tingkat. Namun bentuknya sepenuhnya bergantung pada urutan penyisipan. Sisipkan 1, 2, 3, ... secara terurut, maka setiap nilai baru lebih besar dari semua sebelumnya, sehingga selalu ke kanan, menghasilkan rantai setinggi n yang tidak lebih baik daripada senarai berantai. Sim menampilkan jumlah node dan tinggi (dihitung dalam node, sehingga akar tunggal bertinggi 1), dan tombol preset memungkinkanmu membandingkan urutan penyisipan terurut, seimbang, dan acak; urutan acak biasanya memberi tinggi yang tidak jauh lebih buruk dari ideal.',
        'Ini adalah BST polos tanpa penyeimbangan diri. Implementasi dunia nyata seperti pohon AVL dan pohon merah-hitam melakukan rotasi kecil setelah tiap penyisipan atau penghapusan untuk menjamin tinggi O(log n) apa pun urutan masukannya; keduanya adalah yang dipakai di balik map dan set terurut di kebanyakan bahasa pemrograman. Sim ini juga selalu memilih penerus in-order untuk penghapusan node berdua anak (pendahulunya juga sama sahnya), hanya menangani angka, dan menyebar gambar menurut posisi in-order, sehingga gambarnya menunjukkan bentuk dan kedalaman dengan tepat tetapi bukan tata letak memori pohon sungguhan.',
      ],
    },
    figure: {
      caption: {
        en: 'The same seven values inserted in two different orders. The balanced tree has height 3 and finds 7 in three steps; the sorted insertion order makes a chain of height 7 that needs seven steps, no better than a list. Orange marks the search path for 7.',
        id: 'Tujuh nilai yang sama disisipkan dalam dua urutan berbeda. Pohon seimbang bertinggi 3 dan menemukan 7 dalam tiga langkah; urutan penyisipan terurut menghasilkan rantai setinggi 7 yang butuh tujuh langkah, tidak lebih baik dari senarai. Jingga menandai jalur pencarian untuk 7.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Balanced versus degenerate binary search tree', 'Pohon pencarian biner seimbang dan merosot')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.m{fill:none;stroke:currentColor;stroke-width:1.2;opacity:.45}.e{stroke:currentColor;stroke-width:1.6;opacity:.6}.n{fill:#8b5cf6;opacity:.55}.h{fill:none;stroke:#f59e0b;stroke-width:2.5}.v{text-anchor:middle;font-weight:700}.s{font-size:9.5px;opacity:.85}.c{text-anchor:middle}</style>
  <line x1="90" y1="40" x2="50" y2="85" class="e"/><line x1="90" y1="40" x2="130" y2="85" class="e"/>
  <line x1="50" y1="85" x2="30" y2="130" class="e"/><line x1="50" y1="85" x2="70" y2="130" class="e"/>
  <line x1="130" y1="85" x2="110" y2="130" class="e"/><line x1="130" y1="85" x2="150" y2="130" class="e"/>
  <circle cx="90" cy="40" r="11" class="n"/><circle cx="90" cy="40" r="11" class="h"/><text x="90" y="44" class="v">4</text>
  <circle cx="50" cy="85" r="11" class="n"/><text x="50" y="89" class="v">2</text>
  <circle cx="130" cy="85" r="11" class="n"/><circle cx="130" cy="85" r="11" class="h"/><text x="130" y="89" class="v">6</text>
  <circle cx="30" cy="130" r="11" class="n"/><text x="30" y="134" class="v">1</text>
  <circle cx="70" cy="130" r="11" class="n"/><text x="70" y="134" class="v">3</text>
  <circle cx="110" cy="130" r="11" class="n"/><text x="110" y="134" class="v">5</text>
  <circle cx="150" cy="130" r="11" class="n"/><circle cx="150" cy="130" r="11" class="h"/><text x="150" y="134" class="v">7</text>
  <text x="8" y="56" class="s">${L('smaller: left', 'lebih kecil: kiri')}</text>
  <text x="118" y="56" class="s">${L('larger: right', 'lebih besar: kanan')}</text>
  <text x="90" y="160" class="c s">${L('insert 4, 2, 6, 1, 3, 5, 7', 'sisipkan 4, 2, 6, 1, 3, 5, 7')}</text>
  <text x="90" y="174" class="c">${L('height 3: find 7 in 3 steps', 'tinggi 3: temukan 7 dalam 3 langkah')}</text>
  <line x1="220" y1="30" x2="340" y2="192" class="e"/>
  <circle cx="220" cy="30" r="11" class="n"/><circle cx="220" cy="30" r="11" class="h"/><text x="220" y="34" class="v">1</text>
  <circle cx="240" cy="57" r="11" class="n"/><circle cx="240" cy="57" r="11" class="h"/><text x="240" y="61" class="v">2</text>
  <circle cx="260" cy="84" r="11" class="n"/><circle cx="260" cy="84" r="11" class="h"/><text x="260" y="88" class="v">3</text>
  <circle cx="280" cy="111" r="11" class="n"/><circle cx="280" cy="111" r="11" class="h"/><text x="280" y="115" class="v">4</text>
  <circle cx="300" cy="138" r="11" class="n"/><circle cx="300" cy="138" r="11" class="h"/><text x="300" y="142" class="v">5</text>
  <circle cx="320" cy="165" r="11" class="n"/><circle cx="320" cy="165" r="11" class="h"/><text x="320" y="169" class="v">6</text>
  <circle cx="340" cy="192" r="11" class="n"/><circle cx="340" cy="192" r="11" class="h"/><text x="340" y="196" class="v">7</text>
  <text x="270" y="216" class="c s">${L('insert 1, 2, 3, 4, 5, 6, 7', 'sisipkan 1, 2, 3, 4, 5, 6, 7')}</text>
  <text x="270" y="230" class="c">${L('height 7: find 7 in 7 steps', 'tinggi 7: temukan 7 dalam 7 langkah')}</text>
  <text x="8" y="204" class="s" fill="#f59e0b">${L('orange: nodes visited', 'jingga: node yang dikunjungi')}</text>
  <text x="8" y="216" class="s" fill="#f59e0b">${L('when searching for 7', 'saat mencari 7')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'The BST property, left subtree smaller and right subtree larger at every node, lets each comparison discard a whole subtree, and an in-order walk yields the values in sorted order.',
        'Search, insert and delete all follow a single root-to-leaf path, so their cost is proportional to the tree\'s height.',
        'A balanced tree of n nodes has height about log₂ n, while inserting values in sorted order produces a chain of height n.',
        'Deleting a node with two children replaces it with its in-order successor, the smallest value in its right subtree.',
        'Self-balancing trees such as AVL and red-black trees use rotations to keep the height O(log n) regardless of insertion order.',
      ],
      id: [
        'Sifat BST, subpohon kiri lebih kecil dan subpohon kanan lebih besar pada setiap node, membuat tiap perbandingan membuang satu subpohon utuh, dan penelusuran in-order menghasilkan nilai dalam urutan terurut.',
        'Pencarian, penyisipan, dan penghapusan semuanya mengikuti satu jalur dari akar ke daun, sehingga biayanya sebanding dengan tinggi pohon.',
        'Pohon seimbang dengan n node bertinggi sekitar log₂ n, sedangkan menyisipkan nilai dalam urutan terurut menghasilkan rantai setinggi n.',
        'Menghapus node berdua anak menggantinya dengan penerus in-order, yaitu nilai terkecil di subpohon kanannya.',
        'Pohon penyeimbang diri seperti pohon AVL dan merah-hitam memakai rotasi untuk menjaga tinggi tetap O(log n) apa pun urutan penyisipannya.',
      ],
    },
    vocabulary: {
      en: [
        ['Node', 'One element of the tree, holding a value and links to up to two children.'],
        ['Root / leaf', 'The root is the topmost node where every operation starts; a leaf is a node with no children.'],
        ['Subtree', 'A node together with all of its descendants, itself a valid BST.'],
        ['Height', 'The number of nodes on the longest path from the root down to a leaf; the sim counts a single node as height 1.'],
        ['In-order traversal', 'Visiting the left subtree, then the node, then the right subtree, which lists a BST\'s values in ascending order.'],
        ['In-order successor', 'The next larger value after a node: the smallest value in its right subtree, used to replace a deleted node with two children.'],
        ['Balanced tree', 'A tree whose left and right subtrees have nearly equal heights everywhere, giving height about log₂ n.'],
        ['Degenerate tree', 'A tree in which every node has at most one child, forming a chain of height n with list-like performance.'],
      ],
      id: [
        ['Node', 'Satu elemen pohon, menyimpan sebuah nilai dan tautan ke paling banyak dua anak.'],
        ['Akar / daun', 'Akar adalah node teratas tempat setiap operasi dimulai; daun adalah node tanpa anak.'],
        ['Subpohon', 'Sebuah node beserta semua keturunannya, yang dengan sendirinya merupakan BST yang sah.'],
        ['Tinggi', 'Jumlah node pada jalur terpanjang dari akar ke daun; sim menghitung node tunggal sebagai tinggi 1.'],
        ['Penelusuran in-order', 'Mengunjungi subpohon kiri, lalu node, lalu subpohon kanan, yang mendaftar nilai-nilai BST dalam urutan menaik.'],
        ['Penerus in-order', 'Nilai yang lebih besar berikutnya setelah sebuah node: nilai terkecil di subpohon kanannya, dipakai untuk menggantikan node berdua anak yang dihapus.'],
        ['Pohon seimbang', 'Pohon yang subpohon kiri dan kanannya hampir sama tinggi di semua tempat, sehingga tingginya sekitar log₂ n.'],
        ['Pohon merosot', 'Pohon yang setiap node-nya memiliki paling banyak satu anak, membentuk rantai setinggi n dengan kinerja seperti senarai.'],
      ],
    },
    misconceptions: {
      en: [
        ['Searching a BST is always O(log n).', 'Only if the tree is balanced. Cost is proportional to height, and a plain BST built from sorted input has height n, so search degrades to O(n). Self-balancing variants exist precisely to fix this.'],
        ['The root is the smallest, or the middle, value.', 'In a plain BST the root is simply whichever value was inserted first. The smallest value is the leftmost node and the largest is the rightmost.'],
        ['Deleting a node removes its whole subtree.', 'Only that one value disappears. The tree is restructured by splicing out the node or replacing its value with the in-order successor, and every other value stays reachable.'],
        ['Any binary tree is a binary search tree.', 'A binary tree only limits each node to two children. A BST additionally requires the ordering rule at every node; a binary heap, for example, is a binary tree but not a BST.'],
      ],
      id: [
        ['Mencari di BST selalu O(log n).', 'Hanya jika pohonnya seimbang. Biaya sebanding dengan tinggi, dan BST polos yang dibangun dari masukan terurut bertinggi n, sehingga pencarian merosot menjadi O(n). Varian penyeimbang diri ada justru untuk memperbaiki hal ini.'],
        ['Akar adalah nilai terkecil, atau nilai tengah.', 'Pada BST polos, akar hanyalah nilai apa pun yang disisipkan pertama. Nilai terkecil adalah node paling kiri dan yang terbesar adalah node paling kanan.'],
        ['Menghapus sebuah node membuang seluruh subpohonnya.', 'Hanya satu nilai itu yang hilang. Pohon ditata ulang dengan melepas node tersebut atau mengganti nilainya dengan penerus in-order, dan semua nilai lain tetap bisa dijangkau.'],
        ['Setiap pohon biner adalah pohon pencarian biner.', 'Pohon biner hanya membatasi tiap node pada dua anak. BST juga mewajibkan aturan urutan pada setiap node; heap biner, misalnya, adalah pohon biner tetapi bukan BST.'],
      ],
    },
    realWorld: {
      en: [
        'Sorted containers such as C++\'s std::map and std::set and Java\'s TreeMap are implemented as red-black trees, self-balancing BSTs that guarantee O(log n) lookups.',
        'Database indexes use B-trees, a generalisation of the BST with many children per node, so that finding one record among billions takes only a handful of disk reads.',
        'The Linux kernel\'s process scheduler keeps runnable tasks in a red-black tree ordered by how much CPU time they have had, so picking the next task is a quick leftmost-node lookup.',
        'The degenerate-tree problem is real: feeding sorted data into a naive BST is a classic cause of mysteriously slow programs, and it is why libraries never ship unbalanced BSTs.',
      ],
      id: [
        'Wadah terurut seperti std::map dan std::set di C++ serta TreeMap di Java diimplementasikan sebagai pohon merah-hitam, BST penyeimbang diri yang menjamin pencarian O(log n).',
        'Indeks basis data memakai B-tree, perumuman BST dengan banyak anak per node, sehingga menemukan satu rekaman di antara miliaran hanya butuh beberapa kali pembacaan disk.',
        'Penjadwal proses kernel Linux menyimpan tugas yang siap jalan dalam pohon merah-hitam yang diurutkan menurut jumlah waktu CPU yang sudah dipakainya, sehingga memilih tugas berikutnya hanyalah pencarian cepat ke node paling kiri.',
        'Masalah pohon merosot itu nyata: memasukkan data terurut ke BST naif adalah penyebab klasik program yang tiba-tiba lambat, dan itulah sebabnya pustaka tidak pernah menyediakan BST tanpa penyeimbangan.',
      ],
    },
    questions: {
      en: [
        { q: 'The starting tree has root 50 with right subtree 70, 60, 80. Delete 50. Which value becomes the new root, and why?', a: '60. The root has two children, so it is replaced by its in-order successor: the smallest value in the right subtree. Going right to 70 and then as far left as possible reaches 60. The value 60 is then removed from its old position, and the tree remains a valid BST.' },
        { q: 'What is the smallest possible height of a BST holding one million values, and the largest? Explain.', a: 'A perfectly balanced tree has height ⌈log₂(1,000,001)⌉ = 20, because each level can hold twice as many nodes as the one above and 2²⁰ exceeds a million. The worst case is a chain of height 1,000,000, produced by inserting the values in sorted order. Search costs 20 steps in one case and up to a million in the other.' },
        { q: 'Insert 1 to 7 in sorted order, then clear and insert 4, 2, 6, 1, 3, 5, 7. How many comparisons does searching for 7 take in each tree?', a: 'Seven in the sorted-order tree, because each value went to the right of the previous one, producing a chain of height 7 that must be walked from 1 to 7. Three in the second tree, which has height 3: compare with 4, go right to 6, go right to 7. Same values, same data structure, very different cost.' },
      ],
      id: [
        { q: 'Pohon awal berakar 50 dengan subpohon kanan 70, 60, 80. Hapus 50. Nilai mana yang menjadi akar baru, dan mengapa?', a: '60. Akar memiliki dua anak, sehingga digantikan oleh penerus in-order-nya: nilai terkecil di subpohon kanan. Bergerak ke kanan ke 70 lalu ke kiri sejauh mungkin sampai ke 60. Nilai 60 kemudian dihapus dari posisi lamanya, dan pohon tetap menjadi BST yang sah.' },
        { q: 'Berapa tinggi terkecil yang mungkin bagi BST yang menyimpan satu juta nilai, dan berapa yang terbesar? Jelaskan.', a: 'Pohon yang seimbang sempurna bertinggi ⌈log₂(1.000.001)⌉ = 20, karena tiap tingkat dapat menampung dua kali lebih banyak node daripada tingkat di atasnya dan 2²⁰ melebihi satu juta. Kasus terburuknya adalah rantai setinggi 1.000.000, yang dihasilkan dengan menyisipkan nilai secara terurut. Pencarian butuh 20 langkah pada kasus pertama dan sampai sejuta langkah pada kasus kedua.' },
        { q: 'Sisipkan 1 sampai 7 secara terurut, lalu kosongkan dan sisipkan 4, 2, 6, 1, 3, 5, 7. Berapa perbandingan yang diperlukan untuk mencari 7 pada tiap pohon?', a: 'Tujuh pada pohon urutan terurut, karena tiap nilai pergi ke kanan nilai sebelumnya, menghasilkan rantai setinggi 7 yang harus ditelusuri dari 1 sampai 7. Tiga pada pohon kedua, yang bertinggi 3: bandingkan dengan 4, ke kanan ke 6, ke kanan ke 7. Nilai yang sama, struktur data yang sama, biaya yang sangat berbeda.' },
      ],
    },
  },
};
