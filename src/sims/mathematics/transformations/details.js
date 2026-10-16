// Long-form text for the sim page aside, kept out of manifest.js.
export default {
  objectives: {
    en: [
      'Describe a translation, reflection, rotation or dilation on the Cartesian plane and draw the image of a polygon under each one.',
      'Write the coordinate rule for each transformation, such as (x, y) → (x, −y) for reflection in the x-axis or (x, y) → (−y, x) for a 90° rotation about the origin.',
      'Decide which transformations preserve size and shape (congruence) and which only preserve shape (similarity), and identify an unknown transformation from a shape and its image.',
    ],
    id: [
      'Mendeskripsikan translasi, refleksi, rotasi atau dilatasi pada bidang Kartesius dan menggambar bayangan sebuah poligon oleh masing-masing transformasi.',
      'Menuliskan aturan koordinat setiap transformasi, misalnya (x, y) → (x, −y) untuk refleksi terhadap sumbu-x atau (x, y) → (−y, x) untuk rotasi 90° terhadap titik asal.',
      'Menentukan transformasi mana yang mempertahankan ukuran dan bentuk (kekongruenan) dan mana yang hanya mempertahankan bentuk (kesebangunan), serta mengenali transformasi yang tidak diketahui dari sebuah bangun dan bayangannya.',
    ],
  },
  tryThis: {
    en: [
      'Choose Reflection in the x-axis and read the coordinate list. Then switch to the y-axis and to y = x. Which coordinate changes each time?',
      'Choose Rotation 90° about the origin and watch A(1, 1) travel to A′(−1, 1). Now set 270°. Where does A go, and why is this the same as −90°?',
      'Choose Dilation with k = 2, then k = −1. Compare the k = −1 image with a 180° rotation about the origin — are they the same?',
      'Press "Find the transformation", study the green image, set the controls and press Check. Record vertices in the lab to help you.',
    ],
    id: [
      'Pilih Refleksi terhadap sumbu-x dan baca daftar koordinatnya. Lalu ganti ke sumbu-y dan ke y = x. Koordinat mana yang berubah setiap kali?',
      'Pilih Rotasi 90° terhadap titik asal dan perhatikan A(1, 1) berpindah ke A′(−1, 1). Sekarang atur 270°. Ke mana A pergi, dan mengapa ini sama dengan −90°?',
      'Pilih Dilatasi dengan k = 2, lalu k = −1. Bandingkan bayangan k = −1 dengan rotasi 180° terhadap titik asal — apakah sama?',
      'Tekan "Tebak transformasinya", amati bayangan hijau, atur kontrol lalu tekan Periksa. Catat titik-titik di lab untuk membantumu.',
    ],
  },

  // "Learn" section: the mathematics behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'A geometric transformation is a rule that moves every point of the plane to a new position. The original shape is called the object or pre-image, the result is its image, and image points are marked with a prime: A → A′. On the Cartesian plane each transformation can be written as a rule on coordinates, and the sim lists every vertex before and after so that you can read the rule off the numbers.',
        'A translation slides every point the same distance in the same direction: (x, y) → (x + dx, y + dy). A reflection flips the shape across a mirror line; reflecting in the x-axis gives (x, y) → (x, −y), in the y-axis (x, y) → (−x, y), and in the line y = x the coordinates swap, (x, y) → (y, x). A rotation turns the shape about a centre; measured anticlockwise about the origin, 90° gives (x, y) → (−y, x), 180° gives (−x, −y) and 270° gives (y, −x). To rotate about another centre, shift the centre to the origin, rotate, and shift back — the sim does this when you drag the pink centre point.',
        'Translations, reflections and rotations are isometries: lengths and angles are unchanged, so the image is congruent to the object. Translations and rotations also keep the orientation (A → B → C still runs the same way round), while a reflection reverses it, which is why a reflected shape looks like its mirror twin. A dilation with centre O and scale factor k is different: (x, y) → (kx, ky) multiplies every distance from O by |k|, so lengths scale by |k| and area by k². The image is similar to the object, and congruent only when |k| = 1. A negative k puts the image on the opposite side of the centre; k = −1 is the same as a 180° rotation.',
        'In the challenge the sim hides a transformation and shows only the pre-image and its image. Good detective questions are: Did the shape change size (dilation)? Is it a mirror image (reflection)? Has it turned (rotation)? Or did it just slide (translation)? Checking one or two vertex pairs, for example A(1, 1) → A′(−1, 1), is usually enough to pin down the exact rule.',
      ],
      id: [
        'Transformasi geometri adalah aturan yang memindahkan setiap titik bidang ke posisi baru. Bangun semula disebut objek atau prabayangan, hasilnya disebut bayangan, dan titik bayangan ditandai dengan tanda aksen: A → A′. Pada bidang Kartesius setiap transformasi dapat dituliskan sebagai aturan pada koordinat, dan simulasi mencantumkan setiap titik sudut sebelum dan sesudah sehingga aturannya dapat dibaca dari angka-angkanya.',
        'Translasi menggeser setiap titik dengan jarak dan arah yang sama: (x, y) → (x + dx, y + dy). Refleksi membalik bangun terhadap garis cermin; refleksi terhadap sumbu-x memberi (x, y) → (x, −y), terhadap sumbu-y (x, y) → (−x, y), dan terhadap garis y = x koordinatnya bertukar, (x, y) → (y, x). Rotasi memutar bangun terhadap sebuah pusat; diukur berlawanan arah jarum jam terhadap titik asal, 90° memberi (x, y) → (−y, x), 180° memberi (−x, −y) dan 270° memberi (y, −x). Untuk memutar terhadap pusat lain, geser pusat ke titik asal, putar, lalu geser kembali — simulasi melakukannya saat kamu menggeser titik pusat merah muda.',
        'Translasi, refleksi dan rotasi adalah isometri: panjang dan sudut tidak berubah, sehingga bayangan kongruen dengan objek. Translasi dan rotasi juga mempertahankan orientasi (A → B → C tetap searah), sedangkan refleksi membalikkannya, sehingga bangun hasil refleksi tampak seperti kembaran cerminnya. Dilatasi dengan pusat O dan faktor skala k berbeda: (x, y) → (kx, ky) mengalikan setiap jarak dari O dengan |k|, sehingga panjang berskala |k| dan luas berskala k². Bayangannya sebangun dengan objek, dan kongruen hanya jika |k| = 1. Nilai k negatif menempatkan bayangan di sisi seberang pusat; k = −1 sama dengan rotasi 180°.',
        'Dalam tantangan, simulasi menyembunyikan transformasinya dan hanya menampilkan prabayangan dan bayangannya. Pertanyaan detektif yang baik: Apakah ukurannya berubah (dilatasi)? Apakah ia bayangan cermin (refleksi)? Apakah ia berputar (rotasi)? Atau hanya bergeser (translasi)? Memeriksa satu atau dua pasang titik sudut, misalnya A(1, 1) → A′(−1, 1), biasanya cukup untuk menentukan aturan yang tepat.',
      ],
    },
    figure: {
      caption: {
        en: 'Triangle ABC with A(1, 1), B(4, 1), C(2, 3) and three of its images: reflected in the x-axis (orange, (x, y) → (x, −y)), rotated 90° anticlockwise about the origin (green, (x, y) → (−y, x)) and dilated by k = −1 (pink, (x, y) → (−x, −y), the same as a 180° rotation).',
        id: 'Segitiga ABC dengan A(1, 1), B(4, 1), C(2, 3) dan tiga bayangannya: direfleksikan terhadap sumbu-x (oranye, (x, y) → (x, −y)), dirotasikan 90° berlawanan arah jarum jam terhadap titik asal (hijau, (x, y) → (−y, x)) dan didilatasikan dengan k = −1 (merah muda, (x, y) → (−x, −y), sama dengan rotasi 180°).',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        const u = 22, ox = 150, oy = 120;
        const X = (x) => ox + x * u, Y = (y) => oy - y * u;
        const tri = (pts, col) => `<path d="M${pts.map((p) => `${X(p[0])} ${Y(p[1])}`).join(' L')} Z" fill="${col}" fill-opacity=".3" stroke="${col}" stroke-width="2"/>`;
        let gridLines = '';
        for (let i = -6; i <= 6; i++) {
          gridLines += `<line x1="${X(i)}" y1="${Y(-5)}" x2="${X(i)}" y2="${Y(5)}" class="g"/>`;
          if (i >= -5 && i <= 5) gridLines += `<line x1="${X(-6)}" y1="${Y(i)}" x2="${X(6)}" y2="${Y(i)}" class="g"/>`;
        }
        const A = [1, 1], B = [4, 1], C = [2, 3];
        const refl = (p) => [p[0], -p[1]], rot = (p) => [-p[1], p[0]], dil = (p) => [-p[0], -p[1]];
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('A triangle and its images under reflection, rotation and dilation', 'Sebuah segitiga dan bayangannya oleh refleksi, rotasi dan dilatasi')}">
  <style>text{font:10px system-ui,sans-serif;fill:currentColor}.b{font:bold 10px system-ui,sans-serif}.g{stroke:currentColor;stroke-width:.5;opacity:.18}.ax{stroke:currentColor;stroke-width:1.4}</style>
  ${gridLines}
  <line x1="${X(-6)}" y1="${Y(0)}" x2="${X(6)}" y2="${Y(0)}" class="ax"/>
  <line x1="${X(0)}" y1="${Y(-5)}" x2="${X(0)}" y2="${Y(5)}" class="ax"/>
  <text x="${X(6) - 8}" y="${Y(0) - 4}">x</text><text x="${X(0) + 4}" y="${Y(5) + 10}">y</text>
  <text x="${X(0) - 10}" y="${Y(0) + 11}">O</text>
  ${tri([A, B, C], '#60a5fa')}
  ${tri([A, B, C].map(refl), '#f59e0b')}
  ${tri([A, B, C].map(rot), '#34d399')}
  ${tri([A, B, C].map(dil), '#f472b6')}
  <text x="${X(1) - 4}" y="${Y(1) + 12}" class="b" fill="#93c5fd">A</text><text x="${X(4) + 3}" y="${Y(1) + 12}" class="b" fill="#93c5fd">B</text><text x="${X(2) - 2}" y="${Y(3) - 5}" class="b" fill="#93c5fd">C</text>
  <text x="${X(2) + 2}" y="${Y(-3) + 12}" fill="#f59e0b">C′(2, −3)</text>
  <text x="${X(-3) - 46}" y="${Y(2) + 4}" fill="#34d399">C′(−3, 2)</text>
  <text x="${X(-2) - 44}" y="${Y(-3) + 12}" fill="#f472b6">C′(−2, −3)</text>
  <text x="${X(-6)}" y="14" fill="#60a5fa" class="b">ABC: A(1,1) B(4,1) C(2,3)</text>
  <text x="${X(0) + 56}" y="${Y(-4) + 14}" fill="#f59e0b">${L('reflect in x-axis', 'refleksi sumbu-x')}: (x, y) → (x, −y)</text>
  <text x="${X(-6)}" y="${Y(4) - 6}" fill="#34d399">${L('rotate 90°', 'rotasi 90°')}: (x, y) → (−y, x)</text>
  <text x="${X(-6)}" y="${Y(-4) + 14}" fill="#f472b6">k = −1: (x, y) → (−x, −y)</text>
  <text x="180" y="236" text-anchor="middle">${L('reflection and rotation keep size (congruent); dilation scales lengths by |k|', 'refleksi dan rotasi menjaga ukuran (kongruen); dilatasi mengubah panjang dengan faktor |k|')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Translation: (x, y) → (x + dx, y + dy). Every point moves the same way, so the image is congruent and keeps its orientation.',
        'Reflection: in the x-axis (x, y) → (x, −y); in the y-axis (x, y) → (−x, y); in y = x (x, y) → (y, x). The image is congruent but its orientation is reversed.',
        'Rotation about the origin, anticlockwise: 90° gives (−y, x), 180° gives (−x, −y), 270° gives (y, −x). Clockwise angles are negative, so −90° = 270°.',
        'Dilation with centre O and factor k: (x, y) → (kx, ky). Lengths scale by |k|, areas by k²; the image is similar, not congruent (unless |k| = 1).',
        'Translations, reflections and rotations are isometries (rigid motions); a dilation is not, but it preserves angles and shape.',
        'Points on the mirror line, or at the centre of rotation or dilation, are fixed: they are their own image.',
      ],
      id: [
        'Translasi: (x, y) → (x + dx, y + dy). Setiap titik bergerak dengan cara yang sama, sehingga bayangan kongruen dan orientasinya tetap.',
        'Refleksi: terhadap sumbu-x (x, y) → (x, −y); terhadap sumbu-y (x, y) → (−x, y); terhadap y = x (x, y) → (y, x). Bayangan kongruen tetapi orientasinya terbalik.',
        'Rotasi terhadap titik asal, berlawanan arah jarum jam: 90° memberi (−y, x), 180° memberi (−x, −y), 270° memberi (y, −x). Sudut searah jarum jam bernilai negatif, jadi −90° = 270°.',
        'Dilatasi dengan pusat O dan faktor k: (x, y) → (kx, ky). Panjang berskala |k|, luas berskala k²; bayangannya sebangun, bukan kongruen (kecuali |k| = 1).',
        'Translasi, refleksi dan rotasi adalah isometri (gerak kaku); dilatasi bukan, tetapi ia mempertahankan sudut dan bentuk.',
        'Titik pada garis cermin, atau di pusat rotasi atau dilatasi, adalah titik tetap: bayangannya adalah dirinya sendiri.',
      ],
    },
    vocabulary: {
      en: [
        ['Pre-image and image', 'The original shape and the shape produced by the transformation; image points carry a prime, A′.'],
        ['Translation', 'A slide: every point moves by the same vector (dx, dy).'],
        ['Reflection', 'A flip across a mirror line; each point and its image are the same distance from the line on opposite sides.'],
        ['Rotation', 'A turn through a given angle about a fixed centre; anticlockwise angles are positive.'],
        ['Dilation', 'An enlargement or reduction from a centre by a scale factor k; distances from the centre are multiplied by k.'],
        ['Congruent', 'Having exactly the same size and shape; isometries produce congruent images.'],
        ['Similar', 'Having the same shape but possibly a different size; a dilation produces a similar image.'],
      ],
      id: [
        ['Prabayangan dan bayangan', 'Bangun semula dan bangun hasil transformasi; titik bayangan diberi tanda aksen, A′.'],
        ['Translasi', 'Pergeseran: setiap titik bergerak dengan vektor yang sama (dx, dy).'],
        ['Refleksi', 'Pencerminan terhadap garis cermin; setiap titik dan bayangannya berjarak sama dari garis di sisi yang berlawanan.'],
        ['Rotasi', 'Perputaran dengan sudut tertentu terhadap pusat tetap; sudut berlawanan arah jarum jam bernilai positif.'],
        ['Dilatasi', 'Perbesaran atau pengecilan dari sebuah pusat dengan faktor skala k; jarak dari pusat dikalikan k.'],
        ['Kongruen', 'Memiliki ukuran dan bentuk yang persis sama; isometri menghasilkan bayangan yang kongruen.'],
        ['Sebangun', 'Memiliki bentuk yang sama tetapi ukurannya boleh berbeda; dilatasi menghasilkan bayangan yang sebangun.'],
      ],
    },
    misconceptions: {
      en: [
        ['Reflecting in the x-axis changes the x-coordinate.', 'It changes the y-coordinate: the mirror is the x-axis, so points move vertically across it. (x, y) → (x, −y). Reflecting in the y-axis is what changes x.'],
        ['A rotation of 90° always means clockwise.', 'In mathematics positive angles are anticlockwise. A clockwise quarter turn is −90°, which has the same effect as 270° anticlockwise.'],
        ['A dilation with k = 2 doubles the area.', 'Lengths double, so the area becomes 2² = 4 times as big. In general area scales by k².'],
        ['Rotating about a point other than the origin uses the same rule (−y, x).', 'That rule only works about the origin. For another centre you must subtract the centre, rotate, then add it back; the sim shows this when you drag the pink centre.'],
      ],
      id: [
        ['Refleksi terhadap sumbu-x mengubah koordinat x.', 'Yang berubah adalah koordinat y: cerminnya adalah sumbu-x, sehingga titik bergerak secara vertikal melintasinya. (x, y) → (x, −y). Refleksi terhadap sumbu-y yang mengubah x.'],
        ['Rotasi 90° selalu berarti searah jarum jam.', 'Dalam matematika sudut positif berlawanan arah jarum jam. Seperempat putaran searah jarum jam adalah −90°, yang efeknya sama dengan 270° berlawanan arah jarum jam.'],
        ['Dilatasi dengan k = 2 menggandakan luas.', 'Panjang menjadi dua kali, sehingga luas menjadi 2² = 4 kali. Secara umum luas berskala k².'],
        ['Rotasi terhadap titik selain titik asal memakai aturan yang sama (−y, x).', 'Aturan itu hanya berlaku terhadap titik asal. Untuk pusat lain kamu harus mengurangkan pusat, memutar, lalu menambahkannya kembali; simulasi menunjukkannya saat kamu menggeser pusat merah muda.'],
      ],
    },
    realWorld: {
      en: [
        'Batik and tile patterns repeat a motif by translation, reflection and rotation; the symmetries of a pattern are exactly these transformations.',
        'Computer graphics and games move, flip, spin and zoom sprites using the same coordinate rules, usually written as matrices.',
        'Maps and architectural plans are dilations of the real world: a scale of 1 : 1000 is a dilation with k = 0.001.',
        'A mirror, a selfie camera\'s preview and the lettering on an ambulance bonnet are reflections; a clock hand and a Ferris wheel seat are rotations.',
        'Photocopiers enlarge or reduce documents by a scale factor, and a 141% setting doubles the area (√2 ≈ 1.41).',
      ],
      id: [
        'Pola batik dan ubin mengulang motif dengan translasi, refleksi dan rotasi; simetri sebuah pola adalah transformasi-transformasi ini.',
        'Grafika komputer dan gim menggerakkan, membalik, memutar dan memperbesar sprite dengan aturan koordinat yang sama, biasanya ditulis sebagai matriks.',
        'Peta dan denah bangunan adalah dilatasi dunia nyata: skala 1 : 1000 adalah dilatasi dengan k = 0,001.',
        'Cermin, pratinjau kamera depan dan tulisan pada kap ambulans adalah refleksi; jarum jam dan kursi kincir ria adalah rotasi.',
        'Mesin fotokopi memperbesar atau memperkecil dokumen dengan faktor skala, dan pengaturan 141% menggandakan luas (√2 ≈ 1,41).',
      ],
    },
    questions: {
      en: [
        { q: 'Triangle PQR has P(2, 1), Q(5, 1), R(3, 4). Write the images under (a) reflection in the y-axis, (b) rotation 90° anticlockwise about the origin, (c) translation by (−3, 2).', a: '(a) P′(−2, 1), Q′(−5, 1), R′(−3, 4). (b) (x, y) → (−y, x): P′(−1, 2), Q′(−1, 5), R′(−4, 3). (c) P′(−1, 3), Q′(2, 3), R′(0, 6).' },
        { q: 'In the challenge, A(1, 1) becomes A′(−2, −2) and B(4, 1) becomes B′(−8, −2). Which transformation is it, and how do you know it is not a rotation?', a: 'Every coordinate is multiplied by −2, so it is a dilation with k = −2 about the origin. It cannot be a rotation because the image is twice as large: AB = 3 but A′B′ = 6.' },
        { q: 'Explain why a dilation with k = −1 and a rotation of 180° about the origin give the same image, but a dilation with k = 2 followed by k = 0.5 brings a shape back to where it started.', a: 'Both k = −1 and 180° send (x, y) to (−x, −y), so the images coincide. Dilating by 2 and then by 0.5 multiplies coordinates by 2 × 0.5 = 1, which is the identity, so the shape returns to its original position.' },
      ],
      id: [
        { q: 'Segitiga PQR memiliki P(2, 1), Q(5, 1), R(3, 4). Tuliskan bayangannya oleh (a) refleksi terhadap sumbu-y, (b) rotasi 90° berlawanan arah jarum jam terhadap titik asal, (c) translasi sebesar (−3, 2).', a: '(a) P′(−2, 1), Q′(−5, 1), R′(−3, 4). (b) (x, y) → (−y, x): P′(−1, 2), Q′(−1, 5), R′(−4, 3). (c) P′(−1, 3), Q′(2, 3), R′(0, 6).' },
        { q: 'Dalam tantangan, A(1, 1) menjadi A′(−2, −2) dan B(4, 1) menjadi B′(−8, −2). Transformasi apa itu, dan bagaimana kamu tahu itu bukan rotasi?', a: 'Setiap koordinat dikalikan −2, jadi itu dilatasi dengan k = −2 terhadap titik asal. Tidak mungkin rotasi karena bayangannya dua kali lebih besar: AB = 3 tetapi A′B′ = 6.' },
        { q: 'Jelaskan mengapa dilatasi dengan k = −1 dan rotasi 180° terhadap titik asal memberi bayangan yang sama, tetapi dilatasi k = 2 yang dilanjutkan k = 0,5 mengembalikan bangun ke posisi semula.', a: 'Baik k = −1 maupun 180° memetakan (x, y) ke (−x, −y), sehingga bayangannya berimpit. Dilatasi 2 lalu 0,5 mengalikan koordinat dengan 2 × 0,5 = 1, yaitu identitas, sehingga bangun kembali ke posisi semula.' },
      ],
    },
  },
};
