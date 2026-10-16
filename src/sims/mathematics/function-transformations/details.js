// Long-form text for the sim page aside, kept out of manifest.js.
export default {
  objectives: {
    en: [
      'Predict how each parameter in y = a·f(b(x − h)) + k moves or reshapes the graph of a parent function: vertical stretch and reflection (a), horizontal compression and reflection (b), horizontal shift (h) and vertical shift (k).',
      'Evaluate a composite function (f ∘ g)(x) = f(g(x)) graphically by tracing x → g(x) → f(g(x)), and explain why f ∘ g and g ∘ f are usually different.',
      'Decide with the horizontal-line test whether a function has an inverse function, sketch the inverse as a reflection in y = x, and restrict the domain when the test fails.',
    ],
    id: [
      'Memprediksi bagaimana setiap parameter pada y = a·f(b(x − h)) + k menggeser atau mengubah bentuk grafik fungsi induk: regangan dan pencerminan vertikal (a), pemampatan dan pencerminan horizontal (b), pergeseran horizontal (h) dan pergeseran vertikal (k).',
      'Menentukan nilai fungsi komposisi (f ∘ g)(x) = f(g(x)) secara grafis dengan melacak x → g(x) → f(g(x)), dan menjelaskan mengapa f ∘ g dan g ∘ f umumnya berbeda.',
      'Memutuskan dengan uji garis mendatar apakah suatu fungsi memiliki fungsi invers, menggambar inversnya sebagai pencerminan terhadap y = x, dan membatasi domain ketika uji itu gagal.',
    ],
  },
  tryThis: {
    en: [
      'Choose f(x) = x². Set a = 2, then a = −1. Which slider flips the graph upside down, and which one makes it narrower?',
      'Set h = 3 and watch the graph move right, not left. Then set b = 2: by how much does the x-coordinate of the dragged point change?',
      'Switch to composition. Pick g(x) = x² and f(x) = √x. Trace a negative x: what is f(g(x))? Now swap them: is g(f(x)) defined for negative x?',
      'Switch to inverse with f(x) = sin x. Drag the horizontal line until it crosses the curve more than once, then turn on Restrict domain and check again.',
    ],
    id: [
      'Pilih f(x) = x². Atur a = 2, lalu a = −1. Slider mana yang membalik grafik, dan mana yang membuatnya lebih sempit?',
      'Atur h = 3 dan perhatikan grafik bergeser ke kanan, bukan ke kiri. Lalu atur b = 2: seberapa besar koordinat x titik yang digeser berubah?',
      'Pindah ke mode komposisi. Pilih g(x) = x² dan f(x) = √x. Lacak x negatif: berapa f(g(x))? Sekarang tukar keduanya: apakah g(f(x)) terdefinisi untuk x negatif?',
      'Pindah ke mode invers dengan f(x) = sin x. Geser garis mendatar sampai memotong kurva lebih dari sekali, lalu nyalakan Batasi domain dan periksa lagi.',
    ],
  },

  learn: {
    background: {
      en: [
        'Every function in this sim starts from a parent graph: y = x², y = |x|, y = √x, y = 2ˣ, y = sin x or y = 1/x. The general transformed function is y = a·f(b(x − h)) + k. The two parameters outside f act on the output: a multiplies every y-value (a = 2 doubles heights, a = −1 flips the graph in the x-axis) and k adds a constant to every y-value (k = 3 lifts the graph 3 units). The two parameters inside f act on the input: the graph is shifted h units to the right, and compressed horizontally by a factor b (b = 2 squashes it to half its width, b = −1 flips it in the y-axis). Inside-the-bracket changes look backwards, because x − 3 means the input is 3 units "late", so the curve appears 3 units to the right.',
        'A point (x₀, f(x₀)) on the parent graph lands at (x₀/b + h, a·f(x₀) + k) on the transformed graph. The sim draws both the point and its image, so you can check the rule numerically. For example with f(x) = x², a = 0.5, b = 1, h = 2, k = 1 the point (2, 4) maps to (4, 3), and the whole parabola becomes y = 0.5(x − 2)² + 1 with vertex (2, 1).',
        'Composition applies one function to the output of another: (f ∘ g)(x) = f(g(x)). Graphically you read g(x) off the inner curve, carry that value across to the x-axis using the line y = x, and read f of it off the outer curve. The order matters: with g(x) = x² and f(x) = √x, f(g(x)) = √(x²) = |x| is defined everywhere, but g(f(x)) = (√x)² = x only exists for x ≥ 0. The domain of f ∘ g is the set of x in the domain of g for which g(x) lies in the domain of f.',
        'The inverse function f⁻¹ undoes f: if f(2) = 4 then f⁻¹(4) = 2, so its graph is the reflection of f in the line y = x. The reflection is only a function when no horizontal line crosses the original graph more than once — the horizontal-line test. The test passes for √x, 2ˣ and 1/x, but fails for x², |x| and sin x. Restricting the domain fixes this: on x ≥ 0 the parabola has the inverse √x, and on −π/2 ≤ x ≤ π/2 the sine curve has the inverse arcsin x.',
      ],
      id: [
        'Setiap fungsi di simulasi ini bermula dari grafik induk: y = x², y = |x|, y = √x, y = 2ˣ, y = sin x atau y = 1/x. Fungsi hasil transformasi umumnya adalah y = a·f(b(x − h)) + k. Dua parameter di luar f bekerja pada keluaran: a mengalikan setiap nilai y (a = 2 menggandakan tinggi, a = −1 membalik grafik terhadap sumbu x) dan k menambahkan konstanta ke setiap nilai y (k = 3 mengangkat grafik 3 satuan). Dua parameter di dalam f bekerja pada masukan: grafik bergeser h satuan ke kanan, dan dimampatkan secara horizontal dengan faktor b (b = 2 memampatkannya menjadi setengah lebar, b = −1 membaliknya terhadap sumbu y). Perubahan di dalam kurung tampak terbalik, karena x − 3 berarti masukannya "terlambat" 3 satuan, sehingga kurva tampak 3 satuan di kanan.',
        'Titik (x₀, f(x₀)) pada grafik induk jatuh di (x₀/b + h, a·f(x₀) + k) pada grafik hasil transformasi. Simulasi menggambar titik dan bayangannya, sehingga aturan itu bisa diperiksa secara numerik. Misalnya dengan f(x) = x², a = 0,5, b = 1, h = 2, k = 1 titik (2, 4) dipetakan ke (4, 3), dan seluruh parabola menjadi y = 0,5(x − 2)² + 1 dengan puncak (2, 1).',
        'Komposisi menerapkan satu fungsi pada keluaran fungsi lain: (f ∘ g)(x) = f(g(x)). Secara grafis, nilai g(x) dibaca dari kurva dalam, dibawa ke sumbu x melalui garis y = x, lalu nilai f-nya dibaca dari kurva luar. Urutan penting: dengan g(x) = x² dan f(x) = √x, f(g(x)) = √(x²) = |x| terdefinisi di mana-mana, tetapi g(f(x)) = (√x)² = x hanya ada untuk x ≥ 0. Domain f ∘ g adalah himpunan x dalam domain g yang membuat g(x) berada dalam domain f.',
        'Fungsi invers f⁻¹ membatalkan f: jika f(2) = 4 maka f⁻¹(4) = 2, sehingga grafiknya adalah pencerminan grafik f terhadap garis y = x. Hasil pencerminan itu hanya berupa fungsi jika tidak ada garis mendatar yang memotong grafik asal lebih dari sekali, inilah uji garis mendatar. Uji ini lolos untuk √x, 2ˣ dan 1/x, tetapi gagal untuk x², |x| dan sin x. Membatasi domain mengatasinya: pada x ≥ 0 parabola memiliki invers √x, dan pada −π/2 ≤ x ≤ π/2 kurva sinus memiliki invers arcsin x.',
      ],
    },
    figure: {
      caption: {
        en: 'The parent y = x² (dashed) and y = 0.5(x − 2)² + 1 (solid): a = 0.5 halves every height, h = 2 slides the graph right, k = 1 lifts it. The point P(2, 4) lands at P′(4, 3) = (2 + 2, 0.5·4 + 1).',
        id: 'Fungsi induk y = x² (putus-putus) dan y = 0,5(x − 2)² + 1 (tegas): a = 0,5 membagi dua setiap tinggi, h = 2 menggeser grafik ke kanan, k = 1 mengangkatnya. Titik P(2, 4) jatuh di P′(4, 3) = (2 + 2, 0,5·4 + 1).',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('A parabola and its transformed image with one point tracked', 'Sebuah parabola dan bayangannya hasil transformasi dengan satu titik yang dilacak')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.ax{stroke:currentColor;stroke-width:1.2;fill:none;opacity:.6}.g{stroke:currentColor;stroke-width:.6;opacity:.18}.par{fill:none;stroke:currentColor;stroke-width:1.6;stroke-dasharray:5 4;opacity:.7}.tr{fill:none;stroke:#f59e0b;stroke-width:2.4}.lbl{font:bold 11px system-ui,sans-serif}</style>
  <defs><marker id="ar" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto"><path d="M0 0 L7 3.5 L0 7 z" fill="#38bdf8"/></marker></defs>
  <line x1="40" y1="20" x2="40" y2="220" class="g"/><line x1="80" y1="20" x2="80" y2="220" class="g"/><line x1="160" y1="20" x2="160" y2="220" class="g"/><line x1="200" y1="20" x2="200" y2="220" class="g"/><line x1="240" y1="20" x2="240" y2="220" class="g"/>
  <line x1="20" y1="40" x2="250" y2="40" class="g"/><line x1="20" y1="80" x2="250" y2="80" class="g"/><line x1="20" y1="120" x2="250" y2="120" class="g"/><line x1="20" y1="160" x2="250" y2="160" class="g"/>
  <line x1="20" y1="200" x2="250" y2="200" class="ax"/><line x1="120" y1="20" x2="120" y2="225" class="ax"/>
  <text x="243" y="214">x</text><text x="124" y="30">y</text>
  <text x="156" y="214">2</text><text x="196" y="214">4</text><text x="106" y="124">4</text><text x="106" y="84">6</text>
  <path d="M80 120 Q120 280 160 120" class="par"/>
  <text x="62" y="112" opacity=".75">y = x²</text>
  <path d="M100 90 Q160 270 220 90" class="tr"/>
  <text x="196" y="80" fill="#f59e0b" class="lbl">y = 0.5(x−2)²+1</text>
  <line x1="160" y1="120" x2="194" y2="137" stroke="#38bdf8" stroke-width="1.8" marker-end="url(#ar)"/>
  <circle cx="160" cy="120" r="4" fill="currentColor"/><text x="146" y="112" class="lbl">P(2, 4)</text>
  <circle cx="200" cy="140" r="4" fill="#f59e0b"/><text x="206" y="152" fill="#f59e0b" class="lbl">P′(4, 3)</text>
  <circle cx="160" cy="180" r="3" fill="#f59e0b"/><text x="166" y="192" fill="#f59e0b">${L('vertex (2, 1)', 'puncak (2, 1)')}</text>
  <text x="258" y="60" class="lbl">a = 0.5</text><text x="258" y="74">${L('heights × ½', 'tinggi × ½')}</text>
  <text x="258" y="100" class="lbl">h = 2</text><text x="258" y="114">${L('right 2', 'kanan 2')}</text>
  <text x="258" y="140" class="lbl">k = 1</text><text x="258" y="154">${L('up 1', 'naik 1')}</text>
  <text x="258" y="184" class="lbl">(x₀, y₀) →</text><text x="258" y="198">(x₀/b + h,</text><text x="258" y="212">a·y₀ + k)</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Outside the function (a, k) changes outputs: a stretches vertically and reflects in the x-axis when negative; k shifts vertically.',
        'Inside the function (b, h) changes inputs and acts "backwards": x − h shifts right by h; bx compresses horizontally by a factor b and reflects in the y-axis when b < 0.',
        'A point (x₀, y₀) on the parent maps to (x₀/b + h, a·y₀ + k); the whole graph is just all such points.',
        '(f ∘ g)(x) = f(g(x)) is read inside-out; in general f ∘ g ≠ g ∘ f, and the domain of f ∘ g needs g(x) to lie in the domain of f.',
        'The graph of f⁻¹ is the reflection of f in y = x; it is a function only if f passes the horizontal-line test (f is one-to-one).',
        'Restricting the domain (x ≥ 0 for x², −π/2 ≤ x ≤ π/2 for sin x) turns a many-to-one function into a one-to-one function with an inverse.',
      ],
      id: [
        'Di luar fungsi (a, k) mengubah keluaran: a meregangkan secara vertikal dan mencerminkan terhadap sumbu x jika negatif; k menggeser secara vertikal.',
        'Di dalam fungsi (b, h) mengubah masukan dan bekerja "terbalik": x − h menggeser ke kanan sejauh h; bx memampatkan secara horizontal dengan faktor b dan mencerminkan terhadap sumbu y jika b < 0.',
        'Titik (x₀, y₀) pada fungsi induk dipetakan ke (x₀/b + h, a·y₀ + k); seluruh grafik hanyalah kumpulan semua titik seperti itu.',
        '(f ∘ g)(x) = f(g(x)) dibaca dari dalam ke luar; umumnya f ∘ g ≠ g ∘ f, dan domain f ∘ g mensyaratkan g(x) berada dalam domain f.',
        'Grafik f⁻¹ adalah pencerminan grafik f terhadap y = x; ia berupa fungsi hanya jika f lolos uji garis mendatar (f satu-satu).',
        'Membatasi domain (x ≥ 0 untuk x², −π/2 ≤ x ≤ π/2 untuk sin x) mengubah fungsi banyak-ke-satu menjadi fungsi satu-satu yang memiliki invers.',
      ],
    },
    vocabulary: {
      en: [
        ['Parent function', 'The simplest function in a family, such as y = x² or y = sin x, from which others are built by transformations.'],
        ['Vertical stretch', 'Multiplying every output by a factor a (|a| > 1 stretches, 0 < |a| < 1 compresses; a < 0 also reflects in the x-axis).'],
        ['Horizontal compression', 'Replacing x by bx; the graph becomes 1/|b| times as wide. A negative b also reflects in the y-axis.'],
        ['Translation', 'A slide without change of shape: h units horizontally (x − h) and k units vertically (+ k).'],
        ['Composite function', 'f ∘ g, defined by (f ∘ g)(x) = f(g(x)): apply g first, then f to the result.'],
        ['One-to-one function', 'A function in which different inputs always give different outputs, so each horizontal line meets the graph at most once.'],
        ['Inverse function', 'f⁻¹, the function that reverses f: f⁻¹(f(x)) = x. Its graph is the reflection of f in the line y = x.'],
      ],
      id: [
        ['Fungsi induk', 'Fungsi paling sederhana dalam suatu keluarga, seperti y = x² atau y = sin x, yang menjadi dasar fungsi lain melalui transformasi.'],
        ['Regangan vertikal', 'Mengalikan setiap keluaran dengan faktor a (|a| > 1 meregangkan, 0 < |a| < 1 memampatkan; a < 0 juga mencerminkan terhadap sumbu x).'],
        ['Pemampatan horizontal', 'Mengganti x dengan bx; grafik menjadi 1/|b| kali lebarnya. b negatif juga mencerminkan terhadap sumbu y.'],
        ['Translasi', 'Pergeseran tanpa perubahan bentuk: h satuan secara horizontal (x − h) dan k satuan secara vertikal (+ k).'],
        ['Fungsi komposisi', 'f ∘ g, didefinisikan oleh (f ∘ g)(x) = f(g(x)): terapkan g dulu, lalu f pada hasilnya.'],
        ['Fungsi satu-satu', 'Fungsi yang masukan berbeda selalu memberi keluaran berbeda, sehingga setiap garis mendatar memotong grafik paling banyak sekali.'],
        ['Fungsi invers', 'f⁻¹, fungsi yang membalikkan f: f⁻¹(f(x)) = x. Grafiknya adalah pencerminan grafik f terhadap garis y = x.'],
      ],
    },
    misconceptions: {
      en: [
        ['y = f(x − 3) moves the graph 3 units to the left, because of the minus sign.', 'It moves 3 units to the right. The new graph reaches the value f(0) when x − 3 = 0, that is at x = 3. Set h = 3 in the sim and watch.'],
        ['y = f(2x) is twice as wide as y = f(x).', 'It is half as wide: the input reaches any value twice as soon. A horizontal stretch by 2 needs b = ½, giving y = f(x/2).'],
        ['f(g(x)) and g(f(x)) are the same function.', 'Usually not. With f(x) = 2ˣ and g(x) = x², f(g(x)) = 2^(x²) but g(f(x)) = (2ˣ)² = 4ˣ. Only special pairs, such as a function and its inverse, commute.'],
        ['Every function has an inverse function; just reflect the graph in y = x.', 'The reflection always exists as a curve, but it is a function only if the original passes the horizontal-line test. The reflection of y = x² is x = y², a sideways parabola that gives two y-values for each x > 0.'],
        ['f⁻¹(x) means 1/f(x).', 'The superscript −1 on a function name means the inverse function, not a reciprocal. For f(x) = 2ˣ, f⁻¹(x) = log₂ x, while 1/f(x) = 2⁻ˣ.'],
      ],
      id: [
        ['y = f(x − 3) menggeser grafik 3 satuan ke kiri, karena tanda minus.', 'Grafik bergeser 3 satuan ke kanan. Grafik baru mencapai nilai f(0) ketika x − 3 = 0, yaitu di x = 3. Atur h = 3 di simulasi dan perhatikan.'],
        ['y = f(2x) dua kali lebih lebar daripada y = f(x).', 'Lebarnya menjadi setengah: masukan mencapai nilai apa pun dua kali lebih cepat. Regangan horizontal 2 kali memerlukan b = ½, yaitu y = f(x/2).'],
        ['f(g(x)) dan g(f(x)) adalah fungsi yang sama.', 'Umumnya tidak. Dengan f(x) = 2ˣ dan g(x) = x², f(g(x)) = 2^(x²) tetapi g(f(x)) = (2ˣ)² = 4ˣ. Hanya pasangan khusus, seperti fungsi dan inversnya, yang komutatif.'],
        ['Setiap fungsi punya fungsi invers; cukup cerminkan grafiknya terhadap y = x.', 'Hasil pencerminan selalu ada sebagai kurva, tetapi ia berupa fungsi hanya jika fungsi asal lolos uji garis mendatar. Pencerminan y = x² adalah x = y², parabola mendatar yang memberi dua nilai y untuk setiap x > 0.'],
        ['f⁻¹(x) berarti 1/f(x).', 'Pangkat −1 pada nama fungsi berarti fungsi invers, bukan kebalikan. Untuk f(x) = 2ˣ, f⁻¹(x) = log₂ x, sedangkan 1/f(x) = 2⁻ˣ.'],
      ],
    },
    realWorld: {
      en: [
        'Audio engineers transform a sound wave y = sin x: a is the volume, b changes the pitch (frequency), and h is a time delay or phase shift.',
        'Converting units is a composition: Fahrenheit → Celsius → Kelvin is K(C(F)); undoing it uses the inverse functions in reverse order.',
        'Image editors apply transformations to curves and pixel maps: scaling (a, b), translating (h, k) and flipping are exactly the four parameters in this sim.',
        'Decibels, pH and the Richter scale are logarithms, the inverses of exponential functions; every "log" button on a calculator is undoing a 10ˣ or eˣ.',
        'GPS receivers solve for position by inverting distance functions; the inverse exists only because the measurements are restricted to a one-to-one region.',
      ],
      id: [
        'Teknisi audio mentransformasi gelombang bunyi y = sin x: a adalah volume, b mengubah nada (frekuensi), dan h adalah tunda waktu atau pergeseran fase.',
        'Konversi satuan adalah komposisi: Fahrenheit → Celsius → Kelvin adalah K(C(F)); membatalkannya menggunakan fungsi invers dalam urutan terbalik.',
        'Penyunting gambar menerapkan transformasi pada kurva dan peta piksel: penskalaan (a, b), translasi (h, k) dan pembalikan persis adalah empat parameter di simulasi ini.',
        'Desibel, pH dan skala Richter adalah logaritma, invers dari fungsi eksponensial; setiap tombol "log" pada kalkulator membatalkan 10ˣ atau eˣ.',
        'Penerima GPS menghitung posisi dengan membalik fungsi jarak; inversnya ada hanya karena pengukuran dibatasi pada daerah yang satu-satu.',
      ],
    },
    questions: {
      en: [
        { q: 'The parent is f(x) = |x|. Write the equation of the graph after a vertical stretch by 3, a shift 2 units left and 1 unit down, and find where the vertex is.', a: 'y = 3|x + 2| − 1 (a = 3, h = −2, k = −1). The vertex of |x| is (0, 0), which maps to (0 + (−2), 3·0 − 1) = (−2, −1).' },
        { q: 'With f(x) = 2ˣ and g(x) = x − 3, compute (f ∘ g)(5) and (g ∘ f)(5). Are they equal?', a: '(f ∘ g)(5) = f(2) = 2² = 4. (g ∘ f)(5) = g(32) = 29. They are different, showing that composition is not commutative.' },
        { q: 'Does y = 1/x pass the horizontal-line test? What is its inverse, and what is special about it?', a: 'Yes: each horizontal line y = c (c ≠ 0) meets the curve exactly once, at x = 1/c. Solving y = 1/x for x gives x = 1/y, so f⁻¹(x) = 1/x; the function is its own inverse, and its graph is symmetric about y = x.' },
        { q: 'Why does the horizontal-line test fail for f(x) = sin x, and how is arcsin defined anyway?', a: 'Any line y = c with −1 < c < 1 crosses the sine wave infinitely many times, so sin x is not one-to-one. Restricting the domain to −π/2 ≤ x ≤ π/2 keeps exactly one crossing; arcsin is the inverse of that restricted function, with range −π/2 to π/2.' },
      ],
      id: [
        { q: 'Fungsi induknya f(x) = |x|. Tuliskan persamaan grafik setelah regangan vertikal 3 kali, pergeseran 2 satuan ke kiri dan 1 satuan ke bawah, lalu tentukan letak puncaknya.', a: 'y = 3|x + 2| − 1 (a = 3, h = −2, k = −1). Puncak |x| adalah (0, 0), yang dipetakan ke (0 + (−2), 3·0 − 1) = (−2, −1).' },
        { q: 'Dengan f(x) = 2ˣ dan g(x) = x − 3, hitung (f ∘ g)(5) dan (g ∘ f)(5). Apakah keduanya sama?', a: '(f ∘ g)(5) = f(2) = 2² = 4. (g ∘ f)(5) = g(32) = 29. Keduanya berbeda, menunjukkan komposisi tidak komutatif.' },
        { q: 'Apakah y = 1/x lolos uji garis mendatar? Apa inversnya, dan apa keistimewaannya?', a: 'Ya: setiap garis mendatar y = c (c ≠ 0) memotong kurva tepat sekali, di x = 1/c. Menyelesaikan y = 1/x untuk x memberi x = 1/y, sehingga f⁻¹(x) = 1/x; fungsi ini adalah invers dirinya sendiri, dan grafiknya simetris terhadap y = x.' },
        { q: 'Mengapa uji garis mendatar gagal untuk f(x) = sin x, dan bagaimana arcsin tetap bisa didefinisikan?', a: 'Setiap garis y = c dengan −1 < c < 1 memotong gelombang sinus tak hingga banyak kali, jadi sin x tidak satu-satu. Membatasi domain ke −π/2 ≤ x ≤ π/2 menyisakan tepat satu perpotongan; arcsin adalah invers dari fungsi terbatas itu, dengan daerah hasil −π/2 sampai π/2.' },
      ],
    },
  },
};
