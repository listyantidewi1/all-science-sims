// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Read columns of a matrix as where the basis vectors land.',
      'Connect determinant to area scaling factor.',
      'Recognize rotations, shears, reflections, scalings.',
    ],
    id: [
      'Membaca kolom matriks sebagai tempat basis vektor mendarat.',
      'Mengaitkan determinan dengan faktor penskalaan luas.',
      'Mengenali rotasi, geseran, refleksi, dan penskalaan.',
    ],
  },  tryThis: {
    en: [
      'Drag e₁ to (0,1) and e₂ to (-1, 0) — what is this transformation?',
      'Make det = 0 — what happens to the grid?',
      'Make det negative — note the shape flip.',
    ],
    id: [
      'Seret e₁ ke (0,1) dan e₂ ke (-1, 0) — transformasi apa itu?',
      'Buat det = 0 — apa yang terjadi pada grid?',
      'Buat det negatif — perhatikan bentuk membalik.',
    ],
  },
  // "Learn" section: the mathematics behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'A linear transformation is a way of moving every point of the plane that keeps the origin fixed, keeps straight lines straight, and keeps evenly spaced grid lines evenly spaced. Because of those rules the whole transformation is pinned down by just two facts: where the unit vector e₁ = (1, 0) lands and where e₂ = (0, 1) lands. Any point (x, y) is x copies of e₁ plus y copies of e₂, so after the transformation it must be x copies of the new e₁ plus y copies of the new e₂. The simulation lets you drag those two landing points directly, and redraws the entire grid from them.',
        'A 2×2 matrix is simply a compact way of recording the two landing points: the first column is the image of e₁ and the second column is the image of e₂. The readout shows the matrix A updating as you drag, and a point is transformed by the rule (x, y) goes to x·(column 1) + y·(column 2), which is the usual matrix-vector multiplication written out. The preset buttons load famous matrices: Rotate 90° sends e₁ to (0, 1) and e₂ to (−1, 0); Reflect x flips e₂ to (0, −1); Shear x leaves e₁ alone and tilts e₂ to (1, 1); Scale 2× doubles both.',
        'The determinant det A = ad − bc, computed from the entries a, b in the top row and c, d in the bottom row, measures what the transformation does to area. The orange unit square has area 1 before the transformation; afterwards it is a parallelogram with sides equal to the two columns, and its area is |det A|. A determinant of 2 doubles every area, a determinant of 1 preserves area (rotations and shears both do this), and a determinant of 0 squashes the whole plane onto a line, as the Singular preset shows: both columns point the same way, so the grid collapses and the transformation cannot be undone.',
        'The sign of the determinant records orientation. If going from the first column to the second is still counterclockwise, as it is for e₁ to e₂, the determinant is positive; if the order has been reversed the determinant is negative and the shape has been flipped over like a reflection, which the readout flags. The simulation only shows transformations of the plane that fix the origin, so translations (sliding everything sideways) are not linear and cannot be made here, and the dragged columns are limited to the visible window of about ±5 units.',
      ],
      id: [
        'Transformasi linear adalah cara memindahkan setiap titik di bidang yang mempertahankan titik asal, menjaga garis lurus tetap lurus, dan menjaga garis grid yang berjarak sama tetap berjarak sama. Karena aturan itu, seluruh transformasi ditentukan hanya oleh dua fakta: ke mana vektor satuan e₁ = (1, 0) mendarat dan ke mana e₂ = (0, 1) mendarat. Titik mana pun (x, y) adalah x salinan e₁ ditambah y salinan e₂, sehingga setelah transformasi ia harus menjadi x salinan e₁ baru ditambah y salinan e₂ baru. Simulasi membiarkanmu menyeret kedua titik pendaratan itu secara langsung, lalu menggambar ulang seluruh grid dari keduanya.',
        'Matriks 2×2 hanyalah cara ringkas mencatat kedua titik pendaratan itu: kolom pertama adalah bayangan e₁ dan kolom kedua adalah bayangan e₂. Tampilan menunjukkan matriks A yang berubah saat kamu menyeret, dan sebuah titik ditransformasikan dengan aturan (x, y) menjadi x·(kolom 1) + y·(kolom 2), yaitu perkalian matriks-vektor biasa yang dituliskan panjang. Tombol preset memuat matriks-matriks terkenal: Rotate 90° mengirim e₁ ke (0, 1) dan e₂ ke (−1, 0); Reflect x membalik e₂ ke (0, −1); Shear x membiarkan e₁ dan memiringkan e₂ ke (1, 1); Scale 2× menggandakan keduanya.',
        'Determinan det A = ad − bc, dihitung dari entri a, b di baris atas dan c, d di baris bawah, mengukur apa yang dilakukan transformasi terhadap luas. Persegi satuan berwarna jingga berluas 1 sebelum transformasi; sesudahnya ia menjadi jajaran genjang yang sisinya sama dengan kedua kolom, dan luasnya |det A|. Determinan 2 menggandakan setiap luas, determinan 1 mempertahankan luas (rotasi dan geseran sama-sama begitu), dan determinan 0 memipihkan seluruh bidang menjadi satu garis, seperti ditunjukkan preset Singular: kedua kolom searah, sehingga grid runtuh dan transformasinya tidak dapat dibalik.',
        'Tanda determinan mencatat orientasi. Jika urutan dari kolom pertama ke kolom kedua masih berlawanan arah jarum jam, seperti dari e₁ ke e₂, determinannya positif; jika urutannya terbalik, determinannya negatif dan bentuknya telah dibalik seperti pencerminan, yang ditandai oleh tampilan. Simulasi hanya menampilkan transformasi bidang yang mempertahankan titik asal, sehingga translasi (menggeser semuanya ke samping) bukan transformasi linear dan tidak bisa dibuat di sini, dan kolom yang diseret terbatas pada jendela yang terlihat, sekitar ±5 satuan.',
      ],
    },
    figure: {
      caption: {
        en: 'The columns of A are where e₁ and e₂ land. Here A = [1.4 0.5; 0.4 1.2], so e₁ goes to (1.4, 0.4) and e₂ to (0.5, 1.2). The unit square becomes a parallelogram of area |det A| = 1.4·1.2 − 0.5·0.4 = 1.48.',
        id: 'Kolom-kolom A adalah tempat e₁ dan e₂ mendarat. Di sini A = [1,4 0,5; 0,4 1,2], jadi e₁ menuju (1,4, 0,4) dan e₂ menuju (0,5, 1,2). Persegi satuan menjadi jajaran genjang berluas |det A| = 1,4·1,2 − 0,5·0,4 = 1,48.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('A matrix maps the unit square to a parallelogram', 'Matriks memetakan persegi satuan ke jajaran genjang')}">
  <style>text{font:12px system-ui,sans-serif;fill:currentColor}.m{fill:none;stroke:currentColor;stroke-width:1.2;opacity:.45}.v{fill:none;stroke-width:2.6}.s{font-size:10px;opacity:.7}</style>
  <line x1="20" y1="170" x2="160" y2="170" class="m"/>
  <line x1="80" y1="60" x2="80" y2="215" class="m"/>
  <line x1="190" y1="170" x2="345" y2="170" class="m"/>
  <line x1="235" y1="60" x2="235" y2="215" class="m"/>
  <path d="M80 170 L125 170 L125 125 L80 125 Z" fill="#f59e0b" fill-opacity=".3" stroke="#f59e0b" stroke-width="1.4"/>
  <line x1="80" y1="170" x2="125" y2="170" class="v" stroke="#3b82f6" marker-end="url(#a)"/>
  <line x1="80" y1="170" x2="80" y2="125" class="v" stroke="#ef4444" marker-end="url(#a)"/>
  <text x="110" y="186" fill="#3b82f6">e₁ = (1, 0)</text>
  <text x="26" y="120" fill="#ef4444">e₂ = (0, 1)</text>
  <text x="90" y="154" class="s">${L('area 1', 'luas 1')}</text>
  <text x="40" y="40">${L('before', 'sebelum')}</text>
  <line x1="165" y1="120" x2="192" y2="120" stroke="currentColor" stroke-width="2" marker-end="url(#a)"/>
  <text x="166" y="112" class="s">A</text>
  <path d="M235 170 L298 152 L320.5 98 L257.5 116 Z" fill="#f59e0b" fill-opacity=".3" stroke="#f59e0b" stroke-width="1.4"/>
  <line x1="235" y1="170" x2="298" y2="152" class="v" stroke="#3b82f6" marker-end="url(#a)"/>
  <line x1="235" y1="170" x2="257.5" y2="116" class="v" stroke="#ef4444" marker-end="url(#a)"/>
  <text x="288" y="168" fill="#3b82f6">Ae₁ = (1.4, 0.4)</text>
  <text x="250" y="106" fill="#ef4444">Ae₂ = (0.5, 1.2)</text>
  <text x="258" y="142" class="s">${L('area 1.48', 'luas 1,48')}</text>
  <text x="236" y="40">${L('after', 'sesudah')}</text>
  <text x="196" y="212" class="s">A = [ 1.4  0.5 ]</text>
  <text x="196" y="224" class="s">    [ 0.4  1.2 ]</text>
  <text x="196" y="236" fill="#10b981" class="s">det A = 1.4·1.2 − 0.5·0.4 = 1.48</text>
  <text x="20" y="212" class="s">${L('column 1 = image of e₁', 'kolom 1 = bayangan e₁')}</text>
  <text x="20" y="224" class="s">${L('column 2 = image of e₂', 'kolom 2 = bayangan e₂')}</text>
  <defs><marker id="a" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="context-stroke"/></marker></defs>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'A linear transformation is completely determined by where e₁ and e₂ land, and those two images are the columns of its matrix.',
        'Transforming (x, y) means forming x·(column 1) + y·(column 2), which is matrix-vector multiplication.',
        'The absolute value of the determinant ad − bc is the factor by which every area is multiplied.',
        'A zero determinant collapses the plane onto a line (or a point) and the transformation has no inverse.',
        'A negative determinant means the orientation has been reversed: the transformation includes a reflection.',
      ],
      id: [
        'Transformasi linear ditentukan sepenuhnya oleh tempat e₁ dan e₂ mendarat, dan kedua bayangan itu adalah kolom-kolom matriksnya.',
        'Mentransformasikan (x, y) berarti membentuk x·(kolom 1) + y·(kolom 2), yaitu perkalian matriks-vektor.',
        'Nilai mutlak determinan ad − bc adalah faktor pengali setiap luas.',
        'Determinan nol meruntuhkan bidang menjadi sebuah garis (atau titik) dan transformasinya tidak punya invers.',
        'Determinan negatif berarti orientasinya terbalik: transformasi itu mengandung pencerminan.',
      ],
    },
    vocabulary: {
      en: [
        ['Linear transformation', 'A map of the plane that fixes the origin and keeps grid lines straight, parallel and evenly spaced.'],
        ['Basis vectors e₁, e₂', 'The unit vectors (1, 0) and (0, 1); every point is a combination of them.'],
        ['Matrix', 'A rectangular array of numbers; for a 2×2 matrix the columns are the images of e₁ and e₂.'],
        ['Determinant', 'For [a b; c d], the number ad − bc; its size is the area scaling factor and its sign tells whether orientation flipped.'],
        ['Singular matrix', 'A matrix with determinant 0, whose transformation squashes the plane and cannot be reversed.'],
        ['Shear', 'A transformation that slides each horizontal line sideways by an amount proportional to its height, keeping area the same.'],
        ['Orientation', 'The sense of rotation from the first column to the second: counterclockwise (positive) or clockwise (negative).'],
        ['Image', 'Where a point or shape ends up after the transformation.'],
      ],
      id: [
        ['Transformasi linear', 'Pemetaan bidang yang mempertahankan titik asal dan menjaga garis grid tetap lurus, sejajar, dan berjarak sama.'],
        ['Vektor basis e₁, e₂', 'Vektor satuan (1, 0) dan (0, 1); setiap titik adalah kombinasi keduanya.'],
        ['Matriks', 'Susunan bilangan berbentuk persegi panjang; untuk matriks 2×2 kolom-kolomnya adalah bayangan e₁ dan e₂.'],
        ['Determinan', 'Untuk [a b; c d], bilangan ad − bc; besarnya adalah faktor penskalaan luas dan tandanya menunjukkan apakah orientasi terbalik.'],
        ['Matriks singular', 'Matriks berdeterminan 0, yang transformasinya memipihkan bidang dan tidak dapat dibalik.'],
        ['Geseran (shear)', 'Transformasi yang menggeser tiap garis mendatar ke samping sebanding dengan ketinggiannya, dengan luas tetap.'],
        ['Orientasi', 'Arah putaran dari kolom pertama ke kolom kedua: berlawanan arah jarum jam (positif) atau searah (negatif).'],
        ['Bayangan', 'Tempat sebuah titik atau bentuk berakhir setelah transformasi.'],
      ],
    },
    misconceptions: {
      en: [
        ['The determinant is the length of the transformed vectors.', 'It is an area factor, not a length. Scale 2× doubles lengths but has determinant 4, because areas grow with the square of lengths.'],
        ['A negative determinant means the shape shrank.', 'The sign carries no size information; it says the shape was flipped over. Reflect x has determinant −1 and preserves every area exactly.'],
        ['Rows of the matrix tell you where the basis vectors go.', 'Columns do. Row 1 holds the x-coordinates of both images, so reading rows as vectors describes a different (transposed) transformation.'],
        ['Any movement of the plane, including sliding it sideways, is a linear transformation.', 'Sliding (translation) moves the origin, which a linear transformation never does. That is why the sim has no slider for it.'],
      ],
      id: [
        ['Determinan adalah panjang vektor hasil transformasi.', 'Determinan adalah faktor luas, bukan panjang. Scale 2× menggandakan panjang tetapi berdeterminan 4, karena luas bertambah sebanding dengan kuadrat panjang.'],
        ['Determinan negatif berarti bentuknya mengecil.', 'Tanda tidak membawa informasi ukuran; ia menyatakan bentuknya dibalik. Reflect x berdeterminan −1 dan mempertahankan setiap luas dengan tepat.'],
        ['Baris matriks menyatakan ke mana vektor basis pergi.', 'Kolomlah yang menyatakannya. Baris 1 memuat koordinat-x kedua bayangan, jadi membaca baris sebagai vektor menggambarkan transformasi lain (transposnya).'],
        ['Setiap perpindahan bidang, termasuk menggesernya ke samping, adalah transformasi linear.', 'Menggeser (translasi) memindahkan titik asal, yang tidak pernah dilakukan transformasi linear. Itulah sebabnya simulasi tidak punya slider untuknya.'],
      ],
    },
    realWorld: {
      en: [
        'Image editors rotate, stretch and skew pictures by applying a 2×2 matrix to every pixel position.',
        'Video games and 3D graphics cards multiply millions of vertex coordinates by matrices each frame to move cameras and objects.',
        'Mapmakers and GPS software convert between coordinate systems with linear transformations plus a shift.',
        'Robotics uses matrices to express how a joint rotation moves the robot\'s hand, and a zero determinant marks a singular pose where the arm loses a direction of motion.',
      ],
      id: [
        'Penyunting gambar memutar, meregangkan, dan memiringkan foto dengan menerapkan matriks 2×2 pada posisi setiap piksel.',
        'Gim video dan kartu grafis 3D mengalikan jutaan koordinat titik sudut dengan matriks tiap frame untuk menggerakkan kamera dan objek.',
        'Pembuat peta dan perangkat lunak GPS mengonversi antar sistem koordinat dengan transformasi linear ditambah pergeseran.',
        'Robotika memakai matriks untuk menyatakan bagaimana putaran sendi menggerakkan tangan robot, dan determinan nol menandai pose singular tempat lengan kehilangan satu arah gerak.',
      ],
    },
    questions: {
      en: [
        { q: 'Drag e₁ to (0, 1) and e₂ to (−1, 0). Write the matrix, compute its determinant, and name the transformation.', a: 'A = [0 −1; 1 0]. det A = 0·0 − (−1)·1 = 1, so areas and orientation are preserved. It sends (1, 0) to (0, 1) and (0, 1) to (−1, 0): a 90° counterclockwise rotation.' },
        { q: 'For the Shear x preset, e₁ = (1, 0) and e₂ = (1, 1). Where does the point (2, 3) land, and what is the area of the transformed unit square?', a: '(2, 3) goes to 2·(1, 0) + 3·(1, 1) = (5, 3). det A = 1·1 − 1·0 = 1, so the unit square becomes a parallelogram of area 1: a shear changes shape but not area.' },
        { q: 'The Singular preset sets both columns to (1, 1). Why does the whole grid collapse, and why can the transformation not be undone?', a: 'Every point (x, y) maps to x·(1, 1) + y·(1, 1) = (x + y)·(1, 1), which always lies on the line y = x. The determinant is 1·1 − 1·1 = 0. Many different inputs, such as (3, 0) and (0, 3), land on the same output, so there is no way to recover the input from the output.' },
      ],
      id: [
        { q: 'Seret e₁ ke (0, 1) dan e₂ ke (−1, 0). Tulis matriksnya, hitung determinannya, dan sebutkan nama transformasinya.', a: 'A = [0 −1; 1 0]. det A = 0·0 − (−1)·1 = 1, jadi luas dan orientasi dipertahankan. Ia mengirim (1, 0) ke (0, 1) dan (0, 1) ke (−1, 0): rotasi 90° berlawanan arah jarum jam.' },
        { q: 'Untuk preset Shear x, e₁ = (1, 0) dan e₂ = (1, 1). Ke mana titik (2, 3) mendarat, dan berapa luas persegi satuan hasil transformasi?', a: '(2, 3) menjadi 2·(1, 0) + 3·(1, 1) = (5, 3). det A = 1·1 − 1·0 = 1, jadi persegi satuan menjadi jajaran genjang berluas 1: geseran mengubah bentuk tetapi tidak mengubah luas.' },
        { q: 'Preset Singular mengatur kedua kolom menjadi (1, 1). Mengapa seluruh grid runtuh, dan mengapa transformasinya tidak dapat dibalik?', a: 'Setiap titik (x, y) dipetakan ke x·(1, 1) + y·(1, 1) = (x + y)·(1, 1), yang selalu terletak pada garis y = x. Determinannya 1·1 − 1·1 = 0. Banyak masukan berbeda, misalnya (3, 0) dan (0, 3), mendarat pada keluaran yang sama, sehingga tidak ada cara memulihkan masukan dari keluarannya.' },
      ],
    },
  },
};
