// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Apply vector addition: tip-to-tail and parallelogram rule.',
      'Compute dot product = |a||b|cos θ.',
      'See when two vectors are perpendicular (dot = 0).',
    ],
    id: [
      'Menerapkan penjumlahan vektor: kepala-ke-ekor dan jajaran genjang.',
      'Menghitung perkalian titik = |a||b|cos θ.',
      'Melihat kapan dua vektor saling tegak lurus (titik = 0).',
    ],
  },  tryThis: {
    en: [
      'Make a · b = 0 — what angle is that?',
      'Make a parallel to b — what is the angle? The dot product?',
      'Drag b to the same direction as a, same length — what is a − b?',
    ],
    id: [
      'Buat a · b = 0 — sudut berapa itu?',
      'Sejajarkan a dengan b — berapa sudutnya? Perkalian titiknya?',
      'Seret b ke arah yang sama dengan a dan panjang sama — berapa a − b?',
    ],
  },
  // "Learn" section: the mathematics behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'A vector is a quantity with both a size and a direction, drawn as an arrow. In the plane it can be written with two components, a = (aₓ, aᵧ), which say how far it reaches to the right and upward. Its length, or magnitude, follows from Pythagoras: |a| = √(aₓ² + aᵧ²). The simulation draws two vectors a (blue) and b (pink) from the origin; dragging an arrowhead changes that vector\'s components, and the panel in the corner recomputes everything from them.',
        'To add vectors you add their components: a + b = (aₓ + bₓ, aᵧ + bᵧ). Geometrically this is the tip-to-tail rule: slide b so it starts at the tip of a, and the sum runs from the origin to the tip of the moved b. The dashed lines in the simulation complete the parallelogram with sides a and b, and the green sum arrow is its diagonal, which is the same construction seen from both sides. The difference a − b is a plus the reverse of b, so it is the arrow that would take you from the tip of b to the tip of a, drawn here from the origin.',
        'The dot product multiplies matching components and adds them: a · b = aₓbₓ + aᵧbᵧ. The remarkable fact is that this equals |a||b|cos θ, where θ is the angle between the arrows, so the sim can report the angle by computing cos θ = (a · b)/(|a||b|). The dot product is positive when the vectors point broadly the same way, zero when they are perpendicular, and negative when they point broadly opposite ways. The Make perpendicular button rotates b to (−aᵧ, aₓ), which is a turned by 90°, so the dot product drops to exactly 0. The purple arrow is the projection of a onto b: the shadow a casts on the line of b, with length (a · b)/|b|.',
        'The panel also shows the z-component of the cross product, aₓbᵧ − aᵧbₓ. In two dimensions this single number is the signed area of the parallelogram: positive when turning from a to b is counterclockwise, negative when it is clockwise, and zero when the vectors are parallel. The simulation works in the plane only, so the full three-dimensional cross product vector is not shown, and the grid has no units: the squares are simply one unit apart, so you can think of them as metres, newtons or anything else.',
      ],
      id: [
        'Vektor adalah besaran yang punya ukuran dan arah, digambar sebagai panah. Di bidang ia dapat ditulis dengan dua komponen, a = (aₓ, aᵧ), yang menyatakan seberapa jauh ia menjangkau ke kanan dan ke atas. Panjangnya, atau besarnya, mengikuti Pythagoras: |a| = √(aₓ² + aᵧ²). Simulasi menggambar dua vektor a (biru) dan b (merah muda) dari titik asal; menyeret ujung panah mengubah komponen vektor itu, dan panel di sudut menghitung ulang semuanya dari komponen tersebut.',
        'Untuk menjumlahkan vektor, jumlahkan komponennya: a + b = (aₓ + bₓ, aᵧ + bᵧ). Secara geometris ini adalah aturan ekor-ke-kepala: geser b sehingga berpangkal di ujung a, dan jumlahnya membentang dari titik asal ke ujung b yang dipindahkan. Garis putus-putus dalam simulasi melengkapi jajaran genjang bersisi a dan b, dan panah jumlah berwarna hijau adalah diagonalnya, yaitu konstruksi yang sama dilihat dari kedua sisi. Selisih a − b adalah a ditambah kebalikan b, jadi ia adalah panah yang membawa dari ujung b ke ujung a, di sini digambar dari titik asal.',
        'Perkalian titik mengalikan komponen yang sepadan lalu menjumlahkannya: a · b = aₓbₓ + aᵧbᵧ. Fakta menariknya, hasil ini sama dengan |a||b|cos θ, dengan θ sudut antara kedua panah, sehingga simulasi bisa melaporkan sudut dengan menghitung cos θ = (a · b)/(|a||b|). Perkalian titik positif ketika kedua vektor secara umum searah, nol ketika saling tegak lurus, dan negatif ketika secara umum berlawanan arah. Tombol Make perpendicular memutar b menjadi (−aᵧ, aₓ), yaitu a yang diputar 90°, sehingga perkalian titiknya tepat 0. Panah ungu adalah proyeksi a pada b: bayangan a pada garis b, dengan panjang (a · b)/|b|.',
        'Panel juga menampilkan komponen-z perkalian silang, aₓbᵧ − aᵧbₓ. Dalam dua dimensi bilangan tunggal ini adalah luas bertanda jajaran genjang: positif ketika putaran dari a ke b berlawanan arah jarum jam, negatif ketika searah jarum jam, dan nol ketika kedua vektor sejajar. Simulasi hanya bekerja di bidang, sehingga vektor perkalian silang tiga dimensi yang lengkap tidak ditampilkan, dan grid tidak bersatuan: kotak-kotaknya hanya berjarak satu satuan, jadi kamu bebas menganggapnya meter, newton, atau apa pun.',
      ],
    },
    figure: {
      caption: {
        en: 'a = (4, 1) and b = (1, 3). The sum a + b = (5, 4) is the diagonal of the parallelogram; the angle θ between them satisfies cos θ = (a · b)/(|a||b|) = 7/(√17·√10) ≈ 0.54, so θ ≈ 57.5°; the purple arrow is the projection of a onto b.',
        id: 'a = (4, 1) dan b = (1, 3). Jumlah a + b = (5, 4) adalah diagonal jajaran genjang; sudut θ di antara keduanya memenuhi cos θ = (a · b)/(|a||b|) = 7/(√17·√10) ≈ 0,54, jadi θ ≈ 57,5°; panah ungu adalah proyeksi a pada b.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Vector sum, angle and projection', 'Jumlah vektor, sudut, dan proyeksi')}">
  <style>text{font:12px system-ui,sans-serif;fill:currentColor}.m{fill:none;stroke:currentColor;stroke-width:1.2;opacity:.45}.v{fill:none;stroke-width:2.6}.s{font-size:10px;opacity:.7}</style>
  <line x1="20" y1="200" x2="340" y2="200" class="m"/>
  <line x1="60" y1="20" x2="60" y2="230" class="m"/>
  <line x1="204" y1="164" x2="240" y2="56" class="m" stroke-dasharray="4 4"/>
  <line x1="96" y1="92" x2="240" y2="56" class="m" stroke-dasharray="4 4"/>
  <text x="150" y="84" class="s">${L('b slid to the tip of a', 'b digeser ke ujung a')}</text>
  <line x1="60" y1="200" x2="240" y2="56" class="v" stroke="#10b981" marker-end="url(#a)"/>
  <text x="236" y="46" fill="#10b981">a + b = (5, 4)</text>
  <line x1="60" y1="200" x2="204" y2="164" class="v" stroke="#3b82f6" marker-end="url(#a)"/>
  <text x="208" y="178" fill="#3b82f6">a = (4, 1)</text>
  <line x1="60" y1="200" x2="96" y2="92" class="v" stroke="#ef4444" marker-end="url(#a)"/>
  <text x="100" y="98" fill="#ef4444">b = (1, 3)</text>
  <line x1="204" y1="164" x2="85.2" y2="124.4" stroke="#8b5cf6" stroke-width="1.2" stroke-dasharray="3 3"/>
  <line x1="60" y1="200" x2="85.2" y2="124.4" class="v" stroke="#8b5cf6" marker-end="url(#a)"/>
  <text x="22" y="118" fill="#8b5cf6" class="s">${L('projection of a onto b', 'proyeksi a pada b')}</text>
  <text x="22" y="131" fill="#8b5cf6" class="s">${L('length (a · b)/|b| ≈ 2.21', 'panjang (a · b)/|b| ≈ 2,21')}</text>
  <path d="M89.1 192.7 A30 30 0 0 0 69.5 171.5" fill="none" stroke="#f59e0b" stroke-width="1.6"/>
  <text x="92" y="180" fill="#f59e0b">θ ≈ 57.5°</text>
  <text x="250" y="212" class="s">a · b = 4·1 + 1·3 = 7</text>
  <text x="250" y="226" class="s">|a| = √17, |b| = √10</text>
  <defs><marker id="a" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="context-stroke"/></marker></defs>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Vectors add component by component, which is the same as placing them tip to tail or taking the diagonal of their parallelogram.',
        'The magnitude of (x, y) is √(x² + y²), a direct use of the Pythagorean theorem.',
        'The dot product aₓbₓ + aᵧbᵧ equals |a||b|cos θ, so it measures how much two vectors point the same way.',
        'Perpendicular vectors have a dot product of exactly zero; parallel vectors have |a · b| = |a||b|.',
        'In the plane, aₓbᵧ − aᵧbₓ is the signed area of the parallelogram spanned by a and b.',
      ],
      id: [
        'Vektor dijumlahkan komponen demi komponen, yang sama dengan menyusunnya ekor-ke-kepala atau mengambil diagonal jajaran genjangnya.',
        'Besar vektor (x, y) adalah √(x² + y²), penerapan langsung teorema Pythagoras.',
        'Perkalian titik aₓbₓ + aᵧbᵧ sama dengan |a||b|cos θ, jadi ia mengukur seberapa searah dua vektor.',
        'Vektor yang saling tegak lurus berperkalian titik tepat nol; vektor sejajar memenuhi |a · b| = |a||b|.',
        'Di bidang, aₓbᵧ − aᵧbₓ adalah luas bertanda jajaran genjang yang dibentangkan a dan b.',
      ],
    },
    vocabulary: {
      en: [
        ['Vector', 'A quantity with magnitude and direction, written as components (x, y) and drawn as an arrow.'],
        ['Magnitude |a|', 'The length of the arrow, √(aₓ² + aᵧ²).'],
        ['Components', 'The horizontal and vertical parts of a vector; the numbers you add when adding vectors.'],
        ['Resultant', 'The single vector equal to the sum of two or more vectors.'],
        ['Dot (scalar) product', 'a · b = aₓbₓ + aᵧbᵧ = |a||b|cos θ; a number, not a vector.'],
        ['Projection', 'The component of one vector along the direction of another, like a shadow cast onto that line.'],
        ['Perpendicular (orthogonal)', 'At right angles; for vectors, equivalent to a dot product of zero.'],
        ['Cross product (z-component)', 'aₓbᵧ − aᵧbₓ, the signed area of the parallelogram formed by a and b.'],
      ],
      id: [
        ['Vektor', 'Besaran yang punya besar dan arah, ditulis sebagai komponen (x, y) dan digambar sebagai panah.'],
        ['Besar |a|', 'Panjang panah, √(aₓ² + aᵧ²).'],
        ['Komponen', 'Bagian mendatar dan tegak dari sebuah vektor; bilangan yang dijumlahkan saat menjumlahkan vektor.'],
        ['Resultan', 'Vektor tunggal yang sama dengan jumlah dua vektor atau lebih.'],
        ['Perkalian titik (skalar)', 'a · b = aₓbₓ + aᵧbᵧ = |a||b|cos θ; hasilnya bilangan, bukan vektor.'],
        ['Proyeksi', 'Komponen sebuah vektor sepanjang arah vektor lain, seperti bayangan yang jatuh pada garis itu.'],
        ['Tegak lurus (ortogonal)', 'Membentuk sudut siku-siku; untuk vektor, setara dengan perkalian titik nol.'],
        ['Perkalian silang (komponen-z)', 'aₓbᵧ − aᵧbₓ, luas bertanda jajaran genjang yang dibentuk a dan b.'],
      ],
    },
    misconceptions: {
      en: [
        ['The length of a + b is |a| + |b|.', 'Only when the vectors point the same way. In general |a + b| is shorter, down to |a| − |b| when they point opposite ways; the triangle formed by a, b and a + b shows why.'],
        ['The dot product is a vector.', 'It is a single number. Multiplying matching components and adding gives a scalar; that is why it is also called the scalar product.'],
        ['A negative dot product means a mistake was made.', 'It means the angle between the vectors is greater than 90°, so they point broadly in opposite directions. The sim shows this whenever you drag b behind a.'],
        ['Two vectors are the same only if they start at the same point.', 'A vector is defined by its components alone. Moving b to the tip of a in the tip-to-tail construction does not change b.'],
      ],
      id: [
        ['Panjang a + b sama dengan |a| + |b|.', 'Hanya jika kedua vektor searah. Umumnya |a + b| lebih pendek, hingga |a| − |b| ketika keduanya berlawanan arah; segitiga yang dibentuk a, b, dan a + b menunjukkan alasannya.'],
        ['Perkalian titik adalah vektor.', 'Hasilnya satu bilangan. Mengalikan komponen yang sepadan lalu menjumlahkannya memberi skalar; itulah sebabnya disebut juga perkalian skalar.'],
        ['Perkalian titik negatif berarti ada kesalahan.', 'Itu berarti sudut antara kedua vektor lebih dari 90°, jadi keduanya secara umum berlawanan arah. Simulasi menunjukkannya setiap kali kamu menyeret b ke belakang a.'],
        ['Dua vektor sama hanya jika berpangkal di titik yang sama.', 'Vektor ditentukan oleh komponennya saja. Memindahkan b ke ujung a dalam konstruksi ekor-ke-kepala tidak mengubah b.'],
      ],
    },
    realWorld: {
      en: [
        'A boat heading across a river adds its own velocity to the current\'s velocity; the resultant is the actual path, exactly the parallelogram in the sim.',
        'Work done by a force is the dot product of force and displacement, F · d; pushing perpendicular to the motion does no work.',
        'Flight computers add wind vectors to airspeed vectors to find ground speed and heading corrections.',
        'Computer graphics uses dot products between light direction and surface direction to decide how bright each pixel should be.',
      ],
      id: [
        'Perahu yang menyeberangi sungai menjumlahkan kecepatannya sendiri dengan kecepatan arus; resultannya adalah lintasan sebenarnya, persis jajaran genjang dalam simulasi.',
        'Usaha yang dilakukan gaya adalah perkalian titik gaya dan perpindahan, F · d; mendorong tegak lurus terhadap arah gerak tidak menghasilkan usaha.',
        'Komputer penerbangan menjumlahkan vektor angin dengan vektor kecepatan udara untuk menemukan kecepatan terhadap tanah dan koreksi arah.',
        'Grafika komputer memakai perkalian titik antara arah cahaya dan arah permukaan untuk menentukan seberapa terang tiap piksel.',
      ],
    },
    questions: {
      en: [
        { q: 'Set a = (3, 1) and b = (1, 2), the sim\'s starting values. Compute a + b, a · b and the angle between them, then compare with the readout.', a: 'a + b = (4, 3), with length 5. a · b = 3·1 + 1·2 = 5. |a| = √10 ≈ 3.16 and |b| = √5 ≈ 2.24, so cos θ = 5/(3.16 × 2.24) ≈ 0.707, giving θ = 45°.' },
        { q: 'Press Make perpendicular with a = (3, 1). What does b become, and why is the dot product then zero?', a: 'b becomes (−1, 3). The dot product is 3·(−1) + 1·3 = −3 + 3 = 0. Swapping the components and negating one rotates a vector by 90°, and cos 90° = 0.' },
        { q: 'Without changing their directions, you double the length of both a and b. What happens to the dot product and to the angle between them?', a: 'The dot product becomes four times larger, because each component of each vector doubled and the dot product multiplies one component from each. The angle does not change, since cos θ = (a · b)/(|a||b|) and the denominator also grows by a factor of four.' },
      ],
      id: [
        { q: 'Atur a = (3, 1) dan b = (1, 2), nilai awal simulasi. Hitung a + b, a · b, dan sudut di antara keduanya, lalu bandingkan dengan tampilan.', a: 'a + b = (4, 3), dengan panjang 5. a · b = 3·1 + 1·2 = 5. |a| = √10 ≈ 3,16 dan |b| = √5 ≈ 2,24, jadi cos θ = 5/(3,16 × 2,24) ≈ 0,707, sehingga θ = 45°.' },
        { q: 'Tekan Make perpendicular dengan a = (3, 1). Menjadi apa b, dan mengapa perkalian titiknya lalu nol?', a: 'b menjadi (−1, 3). Perkalian titiknya 3·(−1) + 1·3 = −3 + 3 = 0. Menukar komponen dan menegatifkan salah satunya memutar vektor sebesar 90°, dan cos 90° = 0.' },
        { q: 'Tanpa mengubah arahnya, kamu menggandakan panjang a dan b. Apa yang terjadi pada perkalian titik dan pada sudut di antara keduanya?', a: 'Perkalian titik menjadi empat kali lebih besar, karena tiap komponen tiap vektor digandakan dan perkalian titik mengalikan satu komponen dari masing-masing. Sudutnya tidak berubah, karena cos θ = (a · b)/(|a||b|) dan penyebutnya juga bertambah empat kali.' },
      ],
    },
  },
};
