// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Apply the row-by-column rule.',
      'See dimension compatibility (m×n) · (n×p) = (m×p).',
      'Recognize matrix multiplication is NOT commutative.',
    ],
    id: [
      'Menerapkan aturan baris-kali-kolom.',
      'Melihat kompatibilitas dimensi (m×n) · (n×p) = (m×p).',
      'Mengenali perkalian matriks TIDAK komutatif.',
    ],
  },  tryThis: {
    en: [
      'Set both to identity matrices — what is C?',
      'Multiply by a 90° rotation matrix — see vectors rotated.',
      'Try AB vs BA — are they equal?',
    ],
    id: [
      'Atur keduanya jadi matriks identitas — berapa C?',
      'Kalikan dengan matriks rotasi 90° — lihat vektor berputar.',
      'Coba AB vs BA — apakah sama?',
    ],
  },

  // "Learn" section: the mathematics behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'A matrix is a rectangular grid of numbers, and multiplying two matrices is not done entry by entry. To get the entry of C = A·B in row i and column j, you take row i of A and column j of B, multiply them pairwise, and add the products. For 3×3 matrices that is C[i][j] = A[i][0]·B[0][j] + A[i][1]·B[1][j] + A[i][2]·B[2][j]. Each entry of the product is therefore a dot product of one row with one column, and the whole product takes nine such dot products.',
        'The simulation keeps A and B fixed at 3×3 so that every cell of C is computable. Type any integers into A and B and C updates immediately; click a cell of C and the sim highlights the row of A (blue) and the column of B (pink) that produced it, writing out the three products and their sum below. The buttons give useful special cases: the identity matrix leaves the other factor unchanged, the "90° rotation" matrix turns any (x, y) vector a quarter turn anticlockwise while leaving z alone, and "Randomize" gives small integers to practise with. Note that the sim labels rows and columns from 0, so its C[0][1] is the first-row, second-column entry a textbook would call c₁₂.',
        'The rule looks strange until you see what it is for. A matrix represents a linear transformation, a rule that sends every vector to a new vector, and the product A·B represents doing B first and then A. The row-times-column recipe is exactly what makes the composition of two transformations come out right. This is also why order matters: rotating and then stretching is not the same as stretching and then rotating, so in general A·B ≠ B·A. Swap the entries of A and B in the sim and compare.',
        'Because A and B are both 3×3, the sim cannot show the general size rule: an m×n matrix can only multiply an n×p matrix, since each row of A must be as long as each column of B, and the result is m×p. It also uses integers only, and does not draw the geometric effect of a transformation; the rotation button is best understood by multiplying the rotation matrix by a matrix whose columns are vectors and reading off the rotated columns.',
      ],
      id: [
        'Matriks adalah susunan bilangan berbentuk persegi panjang, dan mengalikan dua matriks tidak dilakukan entri demi entri. Untuk mendapatkan entri C = A·B pada baris i dan kolom j, ambil baris i dari A dan kolom j dari B, kalikan berpasangan, lalu jumlahkan hasil kalinya. Untuk matriks 3×3 rumusnya C[i][j] = A[i][0]·B[0][j] + A[i][1]·B[1][j] + A[i][2]·B[2][j]. Setiap entri hasil kali adalah hasil kali titik satu baris dengan satu kolom, dan seluruh hasil kali memerlukan sembilan hasil kali titik seperti itu.',
        'Simulasi ini menetapkan A dan B berukuran 3×3 agar setiap sel C dapat dihitung. Ketik bilangan bulat apa pun ke A dan B, maka C langsung diperbarui; klik sebuah sel C dan sim menyorot baris A (biru) dan kolom B (merah muda) yang menghasilkannya, lalu menuliskan tiga hasil kali beserta jumlahnya di bawah. Tombol-tombolnya memberi kasus khusus yang berguna: matriks identitas tidak mengubah faktor yang lain, matriks "rotasi 90°" memutar vektor (x, y) seperempat putaran berlawanan arah jarum jam dengan z tetap, dan "Randomize" memberi bilangan bulat kecil untuk latihan. Perhatikan bahwa sim memberi nomor baris dan kolom mulai dari 0, sehingga C[0][1] di sim adalah entri baris pertama kolom kedua yang di buku teks ditulis c₁₂.',
        'Aturan ini terasa aneh sampai kamu melihat gunanya. Matriks mewakili transformasi linear, yaitu aturan yang memetakan setiap vektor ke vektor baru, dan hasil kali A·B mewakili melakukan B dulu lalu A. Resep baris-kali-kolom adalah tepat yang membuat komposisi dua transformasi menjadi benar. Inilah juga sebabnya urutan penting: memutar lalu meregangkan tidak sama dengan meregangkan lalu memutar, sehingga pada umumnya A·B ≠ B·A. Tukar isi A dan B di sim lalu bandingkan.',
        'Karena A dan B sama-sama 3×3, sim tidak bisa menunjukkan aturan ukuran yang umum: matriks m×n hanya bisa mengalikan matriks n×p, karena setiap baris A harus sepanjang setiap kolom B, dan hasilnya berukuran m×p. Sim juga hanya memakai bilangan bulat, dan tidak menggambar efek geometris sebuah transformasi; tombol rotasi paling mudah dipahami dengan mengalikan matriks rotasi dengan matriks yang kolom-kolomnya adalah vektor, lalu membaca kolom-kolom hasil putarannya.',
      ],
    },
    figure: {
      caption: {
        en: 'A worked 2×2 product. The highlighted entry of C comes from row 1 of A (blue) and column 2 of B (red): 1·6 + 2·8 = 22. Every other entry is found the same way with its own row and column.',
        id: 'Contoh hasil kali 2×2. Entri C yang disorot berasal dari baris 1 matriks A (biru) dan kolom 2 matriks B (merah): 1·6 + 2·8 = 22. Setiap entri lain dicari dengan cara yang sama memakai baris dan kolomnya sendiri.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Row times column rule for a 2 by 2 matrix product', 'Aturan baris kali kolom untuk hasil kali matriks 2 kali 2')}">
  <style>text{font:15px ui-monospace,monospace;fill:currentColor;text-anchor:middle}.k{fill:none;stroke:currentColor;stroke-width:1.6}.s{font:11px system-ui,sans-serif;text-anchor:start}.o{font:20px system-ui,sans-serif}</style>
  <rect x="38" y="60" width="64" height="26" fill="#3b82f6" opacity=".3" rx="4"/>
  <rect x="172" y="56" width="28" height="64" fill="#ef4444" opacity=".3" rx="4"/>
  <rect x="278" y="60" width="28" height="26" fill="#f59e0b" opacity=".4" rx="4"/>
  <path d="M40 52 L32 52 L32 124 L40 124" class="k"/><path d="M100 52 L108 52 L108 124 L100 124" class="k"/>
  <text x="54" y="79">1</text><text x="86" y="79">2</text>
  <text x="54" y="111">3</text><text x="86" y="111">4</text>
  <text x="70" y="40" class="s" text-anchor="middle">A</text>
  <text x="124" y="95" class="o">×</text>
  <path d="M148 52 L140 52 L140 124 L148 124" class="k"/><path d="M208 52 L216 52 L216 124 L208 124" class="k"/>
  <text x="162" y="79">5</text><text x="186" y="79">6</text>
  <text x="162" y="111">7</text><text x="186" y="111">8</text>
  <text x="178" y="40" class="s" text-anchor="middle">B</text>
  <text x="236" y="95" class="o">=</text>
  <path d="M258 52 L250 52 L250 124 L258 124" class="k"/><path d="M322 52 L330 52 L330 124 L322 124" class="k"/>
  <text x="270" y="79">19</text><text x="292" y="79" fill="#f59e0b">22</text>
  <text x="270" y="111">43</text><text x="292" y="111">50</text>
  <text x="290" y="40" class="s" text-anchor="middle">C = A·B</text>
  <text x="70" y="140" class="s" fill="#3b82f6" text-anchor="middle">${L('row 1 of A', 'baris 1 dari A')}</text>
  <text x="186" y="140" class="s" fill="#ef4444" text-anchor="middle">${L('column 2 of B', 'kolom 2 dari B')}</text>
  <text x="180" y="178" class="s" text-anchor="middle">${L('C (row 1, col 2) = (row 1 of A) · (column 2 of B)', 'C (baris 1, kolom 2) = (baris 1 dari A) · (kolom 2 dari B)')}</text>
  <text x="180" y="206">= 1·6 + 2·8 = 6 + 16 = <tspan fill="#f59e0b">22</tspan></text>
  <text x="180" y="232" class="s" text-anchor="middle" opacity=".7">${L('The sim uses 3×3, so each sum has three terms.', 'Sim memakai 3×3, jadi tiap jumlah punya tiga suku.')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Entry (i, j) of A·B is the dot product of row i of A with column j of B: multiply matching entries and add.',
        'The product only exists when the number of columns of A equals the number of rows of B; an m×n times an n×p gives an m×p.',
        'Matrix multiplication is not commutative: A·B and B·A are usually different matrices.',
        'The identity matrix I plays the role of the number 1: A·I = I·A = A.',
        'A·B represents doing transformation B first and then A, which is why the row-times-column rule and the order both matter.',
      ],
      id: [
        'Entri (i, j) dari A·B adalah hasil kali titik baris i dari A dengan kolom j dari B: kalikan entri yang berpasangan lalu jumlahkan.',
        'Hasil kali hanya ada jika banyaknya kolom A sama dengan banyaknya baris B; m×n dikali n×p menghasilkan m×p.',
        'Perkalian matriks tidak komutatif: A·B dan B·A biasanya matriks yang berbeda.',
        'Matriks identitas I berperan seperti bilangan 1: A·I = I·A = A.',
        'A·B mewakili melakukan transformasi B dulu lalu A, itulah sebabnya aturan baris-kali-kolom dan urutannya sama-sama penting.',
      ],
    },
    vocabulary: {
      en: [
        ['Matrix', 'A rectangular array of numbers arranged in rows and columns; an m×n matrix has m rows and n columns.'],
        ['Entry', 'One number in a matrix, located by its row index and column index.'],
        ['Dot product', 'The sum of the pairwise products of two equal-length lists of numbers; each entry of a matrix product is one dot product.'],
        ['Identity matrix (I)', 'A square matrix with 1s on the main diagonal and 0s elsewhere; multiplying by it changes nothing.'],
        ['Commutative', 'An operation is commutative when the order does not matter, as with ordinary multiplication; matrix multiplication is not.'],
        ['Linear transformation', 'A rule that maps vectors to vectors while preserving addition and scaling; every such rule can be written as a matrix.'],
        ['Rotation matrix', 'A matrix that turns every vector by a fixed angle without changing its length; the sim\'s example turns the x-y plane by 90°.'],
      ],
      id: [
        ['Matriks', 'Susunan bilangan berbentuk persegi panjang dalam baris dan kolom; matriks m×n punya m baris dan n kolom.'],
        ['Entri', 'Satu bilangan dalam matriks, ditentukan oleh indeks baris dan indeks kolomnya.'],
        ['Hasil kali titik', 'Jumlah hasil kali berpasangan dari dua daftar bilangan yang sama panjang; setiap entri hasil kali matriks adalah satu hasil kali titik.'],
        ['Matriks identitas (I)', 'Matriks persegi dengan angka 1 pada diagonal utama dan 0 di tempat lain; mengalikan dengannya tidak mengubah apa pun.'],
        ['Komutatif', 'Suatu operasi komutatif jika urutannya tidak penting, seperti perkalian bilangan biasa; perkalian matriks tidak komutatif.'],
        ['Transformasi linear', 'Aturan yang memetakan vektor ke vektor dengan mempertahankan penjumlahan dan perkalian skalar; setiap aturan seperti itu dapat ditulis sebagai matriks.'],
        ['Matriks rotasi', 'Matriks yang memutar setiap vektor dengan sudut tetap tanpa mengubah panjangnya; contoh di sim memutar bidang x-y sebesar 90°.'],
      ],
    },
    misconceptions: {
      en: [
        ['You multiply matrices by multiplying matching entries, like adding them.', 'Entry-by-entry multiplication exists but is not matrix multiplication. The product entry (i, j) mixes a whole row of A with a whole column of B. Click any cell of C in the sim to see the three terms involved.'],
        ['A·B is always the same as B·A.', 'Only in special cases. Set A to the rotation matrix and B to anything non-symmetric in the sim, then swap them: the products differ. Order encodes which transformation is applied first.'],
        ['If A·B is the zero matrix, then A or B must be the zero matrix.', 'Not for matrices. For example, a matrix with a single 1 in the top-right corner times itself gives all zeros. Matrices can be non-zero yet multiply to zero.'],
        ['Any two matrices can be multiplied.', 'The inner dimensions must match: a row of A needs exactly as many entries as a column of B. A 2×3 times a 2×3 is undefined, while a 2×3 times a 3×2 is a 2×2.'],
      ],
      id: [
        ['Mengalikan matriks berarti mengalikan entri yang berpasangan, seperti pada penjumlahan.', 'Perkalian entri demi entri memang ada tetapi bukan perkalian matriks. Entri hasil kali (i, j) mencampur seluruh baris A dengan seluruh kolom B. Klik sel mana pun di C pada sim untuk melihat tiga suku yang terlibat.'],
        ['A·B selalu sama dengan B·A.', 'Hanya pada kasus khusus. Atur A ke matriks rotasi dan B ke matriks apa pun yang tidak simetris di sim, lalu tukar keduanya: hasil kalinya berbeda. Urutan menyandikan transformasi mana yang dilakukan lebih dulu.'],
        ['Jika A·B adalah matriks nol, maka A atau B pasti matriks nol.', 'Tidak berlaku untuk matriks. Misalnya, matriks dengan satu angka 1 di pojok kanan atas dikalikan dirinya sendiri menghasilkan semua nol. Matriks bisa tak nol tetapi hasil kalinya nol.'],
        ['Dua matriks mana pun bisa dikalikan.', 'Dimensi dalamnya harus cocok: satu baris A harus punya tepat sebanyak entri satu kolom B. 2×3 dikali 2×3 tidak terdefinisi, sedangkan 2×3 dikali 3×2 menghasilkan 2×2.'],
      ],
    },
    realWorld: {
      en: [
        'Computer graphics rotate, scale and move every point of a 3D model by multiplying its coordinates by 4×4 matrices; a game applies millions of these products per frame.',
        'Neural networks are built mostly from matrix multiplications: each layer multiplies its input by a weight matrix, and GPUs are designed to do this fast.',
        'Google\'s original PageRank ranked web pages using repeated multiplication by a huge matrix of link probabilities.',
        'Engineers solve systems of many simultaneous equations, from bridge stresses to electrical circuits, by writing them as a single matrix equation.',
      ],
      id: [
        'Grafika komputer memutar, menskalakan, dan memindahkan setiap titik model 3D dengan mengalikan koordinatnya dengan matriks 4×4; sebuah gim melakukan jutaan perkalian seperti ini per bingkai.',
        'Jaringan saraf tiruan sebagian besar tersusun dari perkalian matriks: setiap lapisan mengalikan masukannya dengan matriks bobot, dan GPU dirancang untuk melakukannya dengan cepat.',
        'PageRank asli dari Google mengurutkan halaman web dengan perkalian berulang oleh matriks raksasa berisi peluang tautan.',
        'Insinyur menyelesaikan sistem banyak persamaan sekaligus, dari tegangan pada jembatan hingga rangkaian listrik, dengan menuliskannya sebagai satu persamaan matriks.',
      ],
    },
    questions: {
      en: [
        { q: 'With the sim\'s default A = [[1,2,0],[0,1,0],[3,0,1]] and B = [[2,0,1],[0,2,0],[0,1,1]], compute the entry in row 0, column 2 of C by hand and check it against the sim.', a: 'Row 0 of A is (1, 2, 0) and column 2 of B is (1, 0, 1). The dot product is 1·1 + 2·0 + 0·1 = 1, so C[0][2] = 1. Clicking that cell in the sim shows exactly these three terms.' },
        { q: 'A is 2×3 and B is 3×4. What size is A·B, and does B·A exist?', a: 'A·B is 2×4: the inner dimensions (3 and 3) match and the outer ones give the shape. B·A does not exist, because B has 4 columns but A has only 2 rows, so a row of B cannot be dotted with a column of A.' },
        { q: 'Apply the sim\'s 90° rotation matrix R = [[0,−1,0],[1,0,0],[0,0,1]] to the vector (1, 0, 0) written as a column. What do you get, and why does that make sense?', a: 'R·(1,0,0) picks out the first column of R, which is (0, 1, 0). The vector pointing along x now points along y: a quarter turn anticlockwise in the x-y plane, with z untouched, exactly what a 90° rotation about the z-axis should do.' },
      ],
      id: [
        { q: 'Dengan A = [[1,2,0],[0,1,0],[3,0,1]] dan B = [[2,0,1],[0,2,0],[0,1,1]] bawaan sim, hitung entri baris 0 kolom 2 dari C dengan tangan dan periksa di sim.', a: 'Baris 0 dari A adalah (1, 2, 0) dan kolom 2 dari B adalah (1, 0, 1). Hasil kali titiknya 1·1 + 2·0 + 0·1 = 1, jadi C[0][2] = 1. Mengklik sel itu di sim menampilkan tepat ketiga suku ini.' },
        { q: 'A berukuran 2×3 dan B berukuran 3×4. Berapa ukuran A·B, dan apakah B·A ada?', a: 'A·B berukuran 2×4: dimensi dalamnya (3 dan 3) cocok dan dimensi luarnya memberi bentuk hasil. B·A tidak ada, karena B punya 4 kolom sedangkan A hanya punya 2 baris, sehingga baris B tidak bisa dikalikan titik dengan kolom A.' },
        { q: 'Terapkan matriks rotasi 90° dari sim, R = [[0,−1,0],[1,0,0],[0,0,1]], pada vektor (1, 0, 0) yang ditulis sebagai kolom. Apa hasilnya, dan mengapa itu masuk akal?', a: 'R·(1,0,0) mengambil kolom pertama R, yaitu (0, 1, 0). Vektor yang semula mengarah sepanjang x kini mengarah sepanjang y: seperempat putaran berlawanan arah jarum jam di bidang x-y dengan z tetap, persis yang seharusnya dilakukan rotasi 90° terhadap sumbu z.' },
      ],
    },
  },
};
