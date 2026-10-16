// Long-form text for the sim page aside, kept out of manifest.js.
export default {
  objectives: {
    en: [
      'Calculate the volume of prisms, cylinders, pyramids, cones and spheres from their dimensions and explain where each formula comes from.',
      'Use a net to find the surface area of a solid as the sum of the areas of its faces.',
      'Predict how volume and surface area change when a dimension is doubled, and check the prediction with the sim.',
    ],
    id: [
      'Menghitung volume prisma, tabung, limas, kerucut, dan bola dari ukurannya serta menjelaskan asal setiap rumus.',
      'Menggunakan jaring-jaring untuk menentukan luas permukaan bangun ruang sebagai jumlah luas sisi-sisinya.',
      'Memprediksi perubahan volume dan luas permukaan ketika satu ukuran digandakan, lalu memeriksanya dengan simulasi.',
    ],
  },
  tryThis: {
    en: [
      'Choose the cylinder and the cone, give both the same radius and height, and compare their volumes. What fraction is the cone?',
      'Set the box to 4 × 4 × 4 cm, then double every side to 8 × 8 × 8 cm. How many times bigger is the surface area? The volume?',
      'Open the net of the square pyramid. Drag the height slider and watch the triangles grow: which length in the formula is changing?',
      'Set the sphere and the cylinder to r = 5 cm and the cylinder height to 10 cm (so the sphere just fits inside). Compare the two volumes: is it 2/3?',
    ],
    id: [
      'Pilih tabung dan kerucut, beri keduanya jari-jari dan tinggi yang sama, lalu bandingkan volumenya. Berapa bagian volume kerucut?',
      'Atur balok menjadi 4 × 4 × 4 cm, lalu gandakan setiap sisinya menjadi 8 × 8 × 8 cm. Berapa kali lebih besar luas permukaannya? Volumenya?',
      'Buka jaring-jaring limas persegi. Geser penggeser tinggi dan amati segitiganya membesar: panjang mana dalam rumus yang berubah?',
      'Atur bola dan tabung dengan r = 5 cm dan tinggi tabung 10 cm (bola tepat masuk ke tabung). Bandingkan kedua volume: apakah 2/3?',
    ],
  },

  learn: {
    background: {
      en: [
        'A solid takes up space; its volume measures how much, in cubic units such as cm³. A solid also has a skin; its surface area measures how much material you would need to cover it, in square units such as cm². For every prism (a solid with the same cross-section all the way through, including a box and a cylinder) the volume is the area of the base times the height: V = A_base × h. A box with sides l, w, h has V = l·w·h, a triangular prism has V = ½·b·t·L, and a cylinder has V = πr²h.',
        'A pyramid or a cone is a prism that tapers to a point, and it holds exactly one third of the matching prism or cylinder: V = ⅓ A_base × h. You can check this in the sim by giving a cone and a cylinder the same radius and height. A sphere of radius r has V = (4/3)πr³ and surface area A = 4πr²; a sphere that just fits inside a cylinder (height 2r) has exactly two thirds of the cylinder\'s volume, a result Archimedes was proud enough of to put on his tomb.',
        'Surface area is easiest to see with a net: cut the solid along some edges and unfold it flat. A box unfolds into six rectangles, a cylinder into two circles and a rectangle whose width is the circumference 2πr, a square pyramid into a square and four triangles of slant height ℓ, and a cone into a circle and a sector of radius ℓ. Adding up the face areas gives the surface area. The slant height ℓ, not the vertical height h, appears in the area of pyramids and cones, and Pythagoras links them: ℓ² = h² + r² for a cone and ℓ² = h² + (s/2)² for a square pyramid. A sphere has no net: it cannot be flattened without stretching, which is why maps of the Earth are always distorted.',
        'Lengths, areas and volumes scale differently. If every dimension of a solid is multiplied by k, every area is multiplied by k² and the volume by k³. Doubling a cube\'s side makes its surface area 4 times and its volume 8 times larger. The sim shows the formula with the current numbers substituted, so you can follow each step of the calculation and see which dimension each factor belongs to.',
      ],
      id: [
        'Bangun ruang menempati ruang; volumenya mengukur seberapa banyak, dalam satuan kubik seperti cm³. Bangun ruang juga memiliki kulit; luas permukaannya mengukur berapa bahan yang dibutuhkan untuk menutupinya, dalam satuan persegi seperti cm². Untuk setiap prisma (bangun dengan penampang yang sama di sepanjang tingginya, termasuk balok dan tabung) volume adalah luas alas kali tinggi: V = L_alas × t. Balok bersisi p, l, t memiliki V = p·l·t, prisma segitiga V = ½·a·t·L, dan tabung V = πr²t.',
        'Limas atau kerucut adalah prisma yang mengecil ke satu titik, dan isinya tepat sepertiga prisma atau tabung pasangannya: V = ⅓ L_alas × t. Kamu dapat memeriksanya di simulasi dengan memberi kerucut dan tabung jari-jari dan tinggi yang sama. Bola berjari-jari r memiliki V = (4/3)πr³ dan luas permukaan A = 4πr²; bola yang tepat masuk dalam tabung (tinggi 2r) memiliki tepat dua pertiga volume tabung, hasil yang begitu dibanggakan Archimedes sehingga diukir di makamnya.',
        'Luas permukaan paling mudah dilihat dengan jaring-jaring: potong bangun ruang di beberapa rusuknya dan buka hingga datar. Balok terbuka menjadi enam persegi panjang, tabung menjadi dua lingkaran dan sebuah persegi panjang yang lebarnya sama dengan keliling 2πr, limas persegi menjadi sebuah persegi dan empat segitiga dengan tinggi sisi miring ℓ, dan kerucut menjadi sebuah lingkaran dan sebuah juring berjari-jari ℓ. Menjumlahkan luas sisi-sisinya menghasilkan luas permukaan. Tinggi sisi miring ℓ, bukan tinggi tegak t, yang muncul dalam luas limas dan kerucut, dan Pythagoras menghubungkannya: ℓ² = t² + r² untuk kerucut dan ℓ² = t² + (s/2)² untuk limas persegi. Bola tidak memiliki jaring-jaring: bola tidak dapat dibuka menjadi datar tanpa meregang, itulah sebabnya peta Bumi selalu terdistorsi.',
        'Panjang, luas, dan volume berubah dengan skala yang berbeda. Jika setiap ukuran bangun dikalikan k, setiap luas dikalikan k² dan volume dikalikan k³. Menggandakan sisi kubus membuat luas permukaannya 4 kali dan volumenya 8 kali lebih besar. Simulasi menampilkan rumus dengan angka saat ini sudah disubstitusikan, sehingga kamu dapat mengikuti setiap langkah perhitungan dan melihat ukuran mana yang menjadi tiap faktor.',
      ],
    },
    figure: {
      caption: {
        en: 'Left: a cylinder (r, h) and its net: two circles and a rectangle of width 2πr, so A = 2πr² + 2πrh. Right: a cone with the same base holds one third of the cylinder; its net is a circle plus a sector of radius ℓ = √(r² + h²).',
        id: 'Kiri: tabung (r, t) dan jaring-jaringnya: dua lingkaran dan sebuah persegi panjang selebar 2πr, sehingga A = 2πr² + 2πrt. Kanan: kerucut dengan alas yang sama berisi sepertiga tabung; jaring-jaringnya adalah lingkaran dan juring berjari-jari ℓ = √(r² + t²).',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Cylinder and cone with their nets and formulas', 'Tabung dan kerucut dengan jaring-jaring dan rumusnya')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.s{font:10px system-ui,sans-serif;fill:currentColor}.w{fill:none;stroke:currentColor;stroke-width:1.4}.d{fill:none;stroke:currentColor;stroke-width:1;stroke-dasharray:3 3;opacity:.6}</style>
  <ellipse cx="50" cy="30" rx="26" ry="9" class="w"/>
  <path d="M24 30 L24 90 M76 30 L76 90" class="w"/>
  <path d="M24 90 A26 9 0 0 0 76 90" class="w"/>
  <path d="M24 90 A26 9 0 0 1 76 90" class="d"/>
  <line x1="50" y1="30" x2="76" y2="30" stroke="#f59e0b" stroke-width="1.5"/>
  <text x="58" y="26" fill="#f59e0b" class="s">r</text>
  <text x="80" y="64" class="s">h</text>
  <circle cx="135" cy="36" r="14" fill="rgba(56,189,248,0.25)" stroke="#38bdf8" stroke-width="1.2"/>
  <rect x="91" y="52" width="88" height="48" fill="rgba(56,189,248,0.25)" stroke="#38bdf8" stroke-width="1.2"/>
  <circle cx="135" cy="116" r="14" fill="rgba(56,189,248,0.25)" stroke="#38bdf8" stroke-width="1.2"/>
  <text x="135" y="80" text-anchor="middle" class="s">2πr × h</text>
  <text x="20" y="150" class="s">V = πr²h</text>
  <text x="20" y="166" class="s">A = 2πr² + 2πrh</text>
  <path d="M250 24 L222 100 M250 24 L278 100" class="w"/>
  <path d="M222 100 A28 9 0 0 0 278 100" class="w"/>
  <path d="M222 100 A28 9 0 0 1 278 100" class="d"/>
  <line x1="250" y1="24" x2="250" y2="100" class="d"/>
  <line x1="250" y1="100" x2="278" y2="100" stroke="#f59e0b" stroke-width="1.5"/>
  <text x="253" y="66" class="s">h</text>
  <text x="262" y="112" fill="#f59e0b" class="s">r</text>
  <text x="268" y="60" class="s">ℓ</text>
  <path d="M330 22 L302 94 A75 75 0 0 0 358 94 Z" fill="rgba(167,139,250,0.25)" stroke="#a78bfa" stroke-width="1.2"/>
  <circle cx="330" cy="118" r="18" fill="rgba(167,139,250,0.25)" stroke="#a78bfa" stroke-width="1.2"/>
  <text x="200" y="150" class="s">V = ⅓πr²h</text>
  <text x="200" y="166" class="s">A = πr² + πrℓ,  ℓ = √(r² + h²)</text>
  <text x="20" y="200" class="s">${L('prism or cylinder: V = base area × h', 'prisma atau tabung: V = luas alas × t')}</text>
  <text x="20" y="216" class="s">${L('pyramid or cone: V = ⅓ × base area × h', 'limas atau kerucut: V = ⅓ × luas alas × t')}</text>
  <text x="20" y="232" class="s">${L('sphere: V = 4⁄3 πr³,  A = 4πr²', 'bola: V = 4⁄3 πr³,  A = 4πr²')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Prism and cylinder: V = base area × height; the base can be a rectangle, a triangle or a circle.',
        'Pyramid and cone: V = ⅓ × base area × height, one third of the matching prism or cylinder.',
        'Sphere: V = (4/3)πr³ and A = 4πr²; it has no flat net.',
        'Surface area is the sum of the face areas, which is what a net shows.',
        'Slant height ℓ, found with Pythagoras, is used for the side area of pyramids and cones; vertical height h is used for volume.',
        'Scaling every length by k multiplies areas by k² and volumes by k³.',
      ],
      id: [
        'Prisma dan tabung: V = luas alas × tinggi; alasnya bisa persegi panjang, segitiga, atau lingkaran.',
        'Limas dan kerucut: V = ⅓ × luas alas × tinggi, sepertiga prisma atau tabung pasangannya.',
        'Bola: V = (4/3)πr³ dan A = 4πr²; bola tidak memiliki jaring-jaring datar.',
        'Luas permukaan adalah jumlah luas sisi-sisi, dan itulah yang ditunjukkan jaring-jaring.',
        'Tinggi sisi miring ℓ, dicari dengan Pythagoras, dipakai untuk luas selimut limas dan kerucut; tinggi tegak t dipakai untuk volume.',
        'Mengalikan setiap panjang dengan k mengalikan luas dengan k² dan volume dengan k³.',
      ],
    },
    vocabulary: {
      en: [
        ['Volume', 'The amount of space a solid occupies, measured in cubic units (cm³).'],
        ['Surface area', 'The total area of all the faces or the curved surface of a solid, in square units (cm²).'],
        ['Net (jaring-jaring)', 'A flat pattern of faces that folds up into the solid.'],
        ['Prism', 'A solid with two identical parallel bases and the same cross-section throughout; a cylinder is a prism with a circular base.'],
        ['Pyramid / cone', 'A solid with one base and sides that meet at an apex; a cone has a circular base.'],
        ['Slant height ℓ', 'The distance from the apex of a cone or pyramid to the edge of its base, measured along the surface.'],
      ],
      id: [
        ['Volume', 'Banyaknya ruang yang ditempati bangun ruang, dalam satuan kubik (cm³).'],
        ['Luas permukaan', 'Jumlah luas semua sisi atau selimut bangun ruang, dalam satuan persegi (cm²).'],
        ['Jaring-jaring', 'Pola datar dari sisi-sisi yang dapat dilipat menjadi bangun ruang.'],
        ['Prisma', 'Bangun dengan dua alas sejajar yang identik dan penampang sama di sepanjang tingginya; tabung adalah prisma beralas lingkaran.'],
        ['Limas / kerucut', 'Bangun dengan satu alas dan sisi-sisi yang bertemu di satu titik puncak; kerucut beralas lingkaran.'],
        ['Tinggi sisi miring ℓ', 'Jarak dari puncak kerucut atau limas ke tepi alasnya, diukur sepanjang permukaan.'],
      ],
    },
    misconceptions: {
      en: [
        ['Doubling the size of a solid doubles its volume.', 'Doubling every length multiplies the volume by 2³ = 8 and the surface area by 2² = 4. Try the 4 cm and 8 cm cubes in the sim.'],
        ['The area of the side of a cone is πrh, using the vertical height.', 'The curved surface uses the slant height: πrℓ with ℓ = √(r² + h²). The net shows the sector has radius ℓ, not h.'],
        ['A solid with a bigger surface area always has a bigger volume.', 'Not necessarily. A long thin box can have a larger surface area but a smaller volume than a cube. Compare 1 × 1 × 10 cm (A = 42, V = 10) with 2 × 2 × 2 cm (A = 24, V = 8), then 2.2 × 2.2 × 2.2 cm (A ≈ 29, V ≈ 10.6).'],
        ['The volume of a cone is half that of the cylinder around it.', 'It is one third. Set equal r and h in the sim and compare: the cone is always exactly 1/3 of the cylinder.'],
      ],
      id: [
        ['Menggandakan ukuran bangun ruang menggandakan volumenya.', 'Menggandakan setiap panjang mengalikan volume dengan 2³ = 8 dan luas permukaan dengan 2² = 4. Coba kubus 4 cm dan 8 cm di simulasi.'],
        ['Luas selimut kerucut adalah πrt, memakai tinggi tegak.', 'Selimut memakai tinggi sisi miring: πrℓ dengan ℓ = √(r² + t²). Jaring-jaring menunjukkan juringnya berjari-jari ℓ, bukan t.'],
        ['Bangun dengan luas permukaan lebih besar selalu bervolume lebih besar.', 'Tidak selalu. Balok panjang dan tipis bisa berluas permukaan lebih besar tetapi bervolume lebih kecil daripada kubus. Bandingkan 1 × 1 × 10 cm (A = 42, V = 10) dengan 2 × 2 × 2 cm (A = 24, V = 8), lalu 2,2 × 2,2 × 2,2 cm (A ≈ 29, V ≈ 10,6).'],
        ['Volume kerucut adalah setengah volume tabung di sekelilingnya.', 'Sepertiga. Atur r dan t yang sama di simulasi dan bandingkan: kerucut selalu tepat 1/3 tabung.'],
      ],
    },
    realWorld: {
      en: [
        'Drink cans are cylinders: makers choose r and h to hold 330 mL while using as little aluminium (surface area) as possible.',
        'Cardboard boxes are designed from their nets; a flat net is printed, cut and folded, and its area is the amount of cardboard needed.',
        'Ice-cream cones, tents and traffic cones are cones; paint or fabric needed depends on the curved surface area πrℓ.',
        'Water tanks and grain silos are cylinders topped with cones or hemispheres, and their capacity is found with these formulas.',
        'Planets are near-spheres: the Earth\'s radius of 6 371 km gives a surface area of about 510 million km².',
      ],
      id: [
        'Kaleng minuman adalah tabung: produsen memilih r dan t agar menampung 330 mL dengan aluminium (luas permukaan) sesedikit mungkin.',
        'Kardus dirancang dari jaring-jaringnya; jaring-jaring datar dicetak, dipotong, dan dilipat, dan luasnya adalah jumlah kardus yang dibutuhkan.',
        'Cone es krim, tenda, dan kerucut lalu lintas adalah kerucut; cat atau kain yang dibutuhkan bergantung pada luas selimut πrℓ.',
        'Tangki air dan silo gandum adalah tabung beratap kerucut atau setengah bola, dan kapasitasnya dihitung dengan rumus-rumus ini.',
        'Planet hampir berbentuk bola: jari-jari Bumi 6.371 km memberi luas permukaan sekitar 510 juta km².',
      ],
    },
    questions: {
      en: [
        { q: 'A cylinder has r = 3 cm and h = 10 cm. Find its volume and surface area (use π ≈ 3.14).', a: 'V = πr²h = 3.14 × 9 × 10 ≈ 282.6 cm³. A = 2πr² + 2πrh = 2 × 3.14 × 9 + 2 × 3.14 × 3 × 10 = 56.5 + 188.4 ≈ 244.9 cm².' },
        { q: 'A cone has r = 3 cm and h = 4 cm. What is its slant height, and what is its total surface area?', a: 'ℓ = √(3² + 4²) = 5 cm. A = πr² + πrℓ = 9π + 15π = 24π ≈ 75.4 cm². Its volume is ⅓ × 9π × 4 = 12π ≈ 37.7 cm³.' },
        { q: 'A cube has edge 4 cm. The edge is doubled to 8 cm. By what factor do the surface area and the volume grow?', a: 'Surface area goes from 6 × 16 = 96 cm² to 6 × 64 = 384 cm², 4 times larger (2²). Volume goes from 64 cm³ to 512 cm³, 8 times larger (2³).' },
        { q: 'Why does the net of a cylinder have a rectangle of width 2πr?', a: 'The curved side unrolls into a rectangle. Its height is the cylinder\'s height h, and its width is the distance around the circle, the circumference 2πr. So the curved area is 2πr × h.' },
      ],
      id: [
        { q: 'Sebuah tabung memiliki r = 3 cm dan t = 10 cm. Tentukan volume dan luas permukaannya (π ≈ 3,14).', a: 'V = πr²t = 3,14 × 9 × 10 ≈ 282,6 cm³. A = 2πr² + 2πrt = 2 × 3,14 × 9 + 2 × 3,14 × 3 × 10 = 56,5 + 188,4 ≈ 244,9 cm².' },
        { q: 'Sebuah kerucut memiliki r = 3 cm dan t = 4 cm. Berapa tinggi sisi miringnya, dan berapa luas permukaan totalnya?', a: 'ℓ = √(3² + 4²) = 5 cm. A = πr² + πrℓ = 9π + 15π = 24π ≈ 75,4 cm². Volumenya ⅓ × 9π × 4 = 12π ≈ 37,7 cm³.' },
        { q: 'Kubus bersisi 4 cm. Sisinya digandakan menjadi 8 cm. Berapa kali luas permukaan dan volumenya bertambah?', a: 'Luas permukaan dari 6 × 16 = 96 cm² menjadi 6 × 64 = 384 cm², 4 kali lebih besar (2²). Volume dari 64 cm³ menjadi 512 cm³, 8 kali lebih besar (2³).' },
        { q: 'Mengapa jaring-jaring tabung memiliki persegi panjang selebar 2πr?', a: 'Selimut tabung terbuka menjadi persegi panjang. Tingginya adalah tinggi tabung t, dan lebarnya adalah jarak mengelilingi lingkaran, yaitu keliling 2πr. Jadi luas selimut adalah 2πr × t.' },
      ],
    },
  },
};
