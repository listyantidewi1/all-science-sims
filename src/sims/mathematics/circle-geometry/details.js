// Long-form text for the sim page aside, kept out of manifest.js.
export default {
  objectives: {
    en: [
      'Explain why the circumference of every circle is about 3.14 times its diameter and use C = 2πr (or πd) to calculate it.',
      'Calculate the area of a circle with A = πr² and explain why doubling the radius makes the area four times bigger.',
      'Find an arc length and a sector area as the fraction θ/360 of the circumference and of the area.',
    ],
    id: [
      'Menjelaskan mengapa keliling setiap lingkaran sekitar 3,14 kali diameternya dan menggunakan K = 2πr (atau πd) untuk menghitungnya.',
      'Menghitung luas lingkaran dengan L = πr² dan menjelaskan mengapa menggandakan jari-jari membuat luasnya empat kali lebih besar.',
      'Menentukan panjang busur dan luas juring sebagai pecahan θ/360 dari keliling dan dari luas.',
    ],
  },
  tryThis: {
    en: [
      'Press "Unroll the circumference" with r = 3, then again with r = 8. Count the diameters that fit along the unrolled line each time. What stays the same?',
      'Set r = 5 and drag the rim handle to 90°, 180° and 270°. Compare each arc length with the full circumference, 31.4.',
      'Double the radius from 4 to 8 while keeping θ = 60°. Did the arc length double? Did the sector area double, or do more?',
      'Switch the value of π between exact, 3.14 and 22/7 for r = 7. Which approximation gives the neatest numbers here, and how far off is it?',
    ],
    id: [
      'Tekan "Bentangkan keliling" dengan r = 3, lalu lagi dengan r = 8. Hitung berapa diameter yang muat di sepanjang garis bentangan setiap kali. Apa yang tetap sama?',
      'Atur r = 5 dan geser pegangan di tepi ke 90°, 180° dan 270°. Bandingkan setiap panjang busur dengan keliling penuh, 31,4.',
      'Gandakan jari-jari dari 4 ke 8 sambil mempertahankan θ = 60°. Apakah panjang busur menjadi dua kali? Apakah luas juring menjadi dua kali, atau lebih?',
      'Ganti nilai π antara eksak, 3,14 dan 22/7 untuk r = 7. Pendekatan mana yang memberi angka paling rapi di sini, dan seberapa jauh selisihnya?',
    ],
  },

  // "Learn" section: the mathematics behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'A circle is the set of all points at the same distance, the radius r, from a centre. The diameter d = 2r runs straight across through the centre. The distance all the way around the rim is the circumference C. If you roll any circle along a line for exactly one turn, the distance it covers is its circumference, and it is always a little more than three diameters: C ÷ d = 3.14159… for every circle, no matter how big. This constant ratio is π (pi). The Unroll button in the sim performs exactly this experiment, and 3.14 or 22/7 are the approximations used in most school calculations.',
        'Because C ÷ d = π, the circumference is C = πd = 2πr. The area of the disc is A = πr². One way to see why: cut the disc into many thin sectors and lay them alternately point-up and point-down; they form a shape close to a rectangle of height r and width half the circumference, πr, so the area is πr × r = πr². Notice that r is squared: a circle with twice the radius has four times the area but only twice the circumference.',
        'A central angle θ is an angle whose vertex is the centre. It cuts the circle into a sector (the pizza slice) bounded by an arc of the rim. Since the whole rim corresponds to 360°, the sector takes the fraction θ/360 of everything: arc length = (θ/360) × 2πr and sector area = (θ/360) × πr². A 90° angle gives a quarter of the circumference and a quarter of the area; 180° gives a semicircle, half of each.',
        'In the sim the blue readouts belong to the whole circle and the orange ones to the sector. The radius slider changes the size of the circle; dragging the point on the rim changes θ in steps of 5°. The lab table lets you record r, θ, the arc length and the sector area so that you can test, for example, that the arc length is proportional to both θ and r while the sector area is proportional to θ and to r².',
      ],
      id: [
        'Lingkaran adalah himpunan semua titik yang berjarak sama, yaitu jari-jari r, dari sebuah pusat. Diameter d = 2r melintang lurus melalui pusat. Jarak mengitari tepi disebut keliling K. Jika lingkaran apa pun digelindingkan di sepanjang garis tepat satu putaran, jarak yang ditempuh adalah kelilingnya, dan selalu sedikit lebih dari tiga diameter: K ÷ d = 3,14159… untuk setiap lingkaran, seberapa pun besarnya. Rasio tetap ini adalah π (pi). Tombol Bentangkan dalam simulasi melakukan percobaan ini, dan 3,14 atau 22/7 adalah pendekatan yang dipakai di sebagian besar perhitungan sekolah.',
        'Karena K ÷ d = π, keliling adalah K = πd = 2πr. Luas cakram adalah L = πr². Salah satu cara melihatnya: potong cakram menjadi banyak juring tipis dan susun bergantian ujung ke atas dan ke bawah; bentuknya mendekati persegi panjang dengan tinggi r dan lebar setengah keliling, πr, sehingga luasnya πr × r = πr². Perhatikan r dikuadratkan: lingkaran dengan jari-jari dua kali lipat memiliki luas empat kali lipat tetapi keliling hanya dua kali lipat.',
        'Sudut pusat θ adalah sudut yang titik sudutnya di pusat. Ia memotong lingkaran menjadi juring (potongan pizza) yang dibatasi busur pada tepi. Karena seluruh tepi berpadanan dengan 360°, juring mengambil pecahan θ/360 dari semuanya: panjang busur = (θ/360) × 2πr dan luas juring = (θ/360) × πr². Sudut 90° memberi seperempat keliling dan seperempat luas; 180° memberi setengah lingkaran, setengah dari masing-masing.',
        'Dalam simulasi, bacaan biru milik seluruh lingkaran dan bacaan oranye milik juring. Slider jari-jari mengubah ukuran lingkaran; menggeser titik di tepi mengubah θ dengan langkah 5°. Tabel lab memungkinkanmu mencatat r, θ, panjang busur dan luas juring sehingga kamu dapat menguji, misalnya, bahwa panjang busur sebanding dengan θ dan r sedangkan luas juring sebanding dengan θ dan r².',
      ],
    },
    figure: {
      caption: {
        en: 'Left: a circle with radius r, diameter d, a central angle θ, the arc it cuts off (orange) and the sector inside it. Right: one full roll of the circle covers 3 diameters and a little more — the extra 0.14d is why C ÷ d = π ≈ 3.14.',
        id: 'Kiri: lingkaran dengan jari-jari r, diameter d, sudut pusat θ, busur yang dipotongnya (oranye) dan juring di dalamnya. Kanan: satu gelindingan penuh menempuh 3 diameter dan sedikit lebih — kelebihan 0,14d itulah sebabnya K ÷ d = π ≈ 3,14.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        const cx = 90, cy = 110, R = 62;
        const th = 110 * Math.PI / 180;
        const ex = (cx + R * Math.cos(th)).toFixed(1), ey = (cy - R * Math.sin(th)).toFixed(1);
        const d = 36, x0 = 190, yg = 170;
        const C = (Math.PI * d).toFixed(1);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Parts of a circle and the unrolled circumference compared with the diameter', 'Bagian-bagian lingkaran dan keliling yang dibentangkan dibandingkan dengan diameter')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.b{font:bold 11px system-ui,sans-serif;fill:currentColor}.c{fill:none;stroke:#60a5fa;stroke-width:2}.m{stroke:currentColor;stroke-width:1.2;fill:none;opacity:.7}.t{stroke:#60a5fa;stroke-width:1.5}</style>
  <path d="M${cx} ${cy} L${cx + R} ${cy} A${R} ${R} 0 0 0 ${ex} ${ey} Z" fill="#f59e0b" opacity=".3"/>
  <circle cx="${cx}" cy="${cy}" r="${R}" class="c"/>
  <path d="M${cx + R} ${cy} A${R} ${R} 0 0 0 ${ex} ${ey}" fill="none" stroke="#f59e0b" stroke-width="4"/>
  <line x1="${cx}" y1="${cy}" x2="${cx + R}" y2="${cy}" stroke="#fde68a" stroke-width="1.5"/>
  <line x1="${cx}" y1="${cy}" x2="${ex}" y2="${ey}" stroke="#fde68a" stroke-width="1.5"/>
  <line x1="${cx - R}" y1="${cy}" x2="${cx}" y2="${cy}" class="m" stroke-dasharray="3 3"/>
  <path d="M${cx + 18} ${cy} A18 18 0 0 0 ${(cx + 18 * Math.cos(th)).toFixed(1)} ${(cy - 18 * Math.sin(th)).toFixed(1)}" fill="none" stroke="#fbbf24" stroke-width="1.5"/>
  <circle cx="${cx}" cy="${cy}" r="2.5" fill="currentColor"/>
  <text x="${cx + 28}" y="${cy + 14}">r</text>
  <text x="${cx - 40}" y="${cy + 14}" opacity=".8">d = 2r</text>
  <text x="${cx + 14}" y="${cy - 20}" fill="#fbbf24">θ</text>
  <text x="${cx + 40}" y="${cy - 52}" fill="#f59e0b" class="b">${L('arc', 'busur')}</text>
  <text x="${cx + 22}" y="${cy - 34}" fill="#f59e0b">${L('sector', 'juring')}</text>
  <text x="${cx}" y="${cy + R + 22}" text-anchor="middle">C = 2πr</text>
  <text x="${cx}" y="${cy + R + 37}" text-anchor="middle">A = πr²</text>
  <text x="${cx}" y="${cy + R + 52}" text-anchor="middle" fill="#f59e0b">${L('arc', 'busur')} = θ/360 · C,  ${L('sector', 'juring')} = θ/360 · A</text>
  <circle cx="${x0 + d / 2}" cy="${yg - d / 2}" r="${d / 2}" class="c"/>
  <line x1="${x0}" y1="${yg - d / 2}" x2="${x0 + d}" y2="${yg - d / 2}" class="t"/>
  <text x="${x0 + d / 2}" y="${yg - d / 2 - 5}" text-anchor="middle" fill="#93c5fd">d</text>
  <circle cx="${x0 + d / 2}" cy="${yg}" r="3" fill="#f472b6"/>
  <path d="M${x0 + d / 2 + 24} ${yg - d - 6} A${d / 2 + 6} ${d / 2 + 6} 0 0 1 ${x0 + d / 2 + 30} ${yg - 10}" fill="none" stroke="currentColor" stroke-width="1" opacity=".6"/>
  <path d="M${x0 + d / 2 + 26} ${yg - 10} L${x0 + d / 2 + 32} ${yg - 11} L${x0 + d / 2 + 29} ${yg - 16}" fill="none" stroke="currentColor" stroke-width="1" opacity=".6"/>
  <line x1="${x0 + d / 2}" y1="${yg + 14}" x2="${x0 + d / 2 + 113.1}" y2="${yg + 14}" stroke="#f472b6" stroke-width="4"/>
  ${[0, 1, 2, 3].map((k) => `<line x1="${x0 + d / 2 + k * d}" y1="${yg + 17}" x2="${x0 + d / 2 + k * d}" y2="${yg + 26}" class="t"/>`).join('')}
  <line x1="${x0 + d / 2 + 113.1}" y1="${yg + 17}" x2="${x0 + d / 2 + 113.1}" y2="${yg + 26}" stroke="#f472b6" stroke-width="1.5"/>
  ${[1, 2, 3].map((k) => `<text x="${x0 + d / 2 + k * d - d / 2}" y="${yg + 38}" text-anchor="middle" fill="#93c5fd">${k}d</text>`).join('')}
  <text x="${x0 + d / 2 + 3 * d + 7}" y="${yg + 38}" text-anchor="middle" fill="#f9a8d4" font-size="9">0.14d</text>
  <text x="${x0 + d / 2 + 56}" y="${yg + 56}" text-anchor="middle" class="b">C = πd ≈ 3.14 d</text>
  <text x="${x0 + d / 2 + 56}" y="${yg + 70}" text-anchor="middle" opacity=".8">${L(`one turn: d = ${d} → C ≈ ${C}`, `satu putaran: d = ${d} → K ≈ ${C.replace('.', ',')}`)}</text>
  <text x="${x0 + 60}" y="40" text-anchor="middle" class="b">${L('Unrolling one turn', 'Membentangkan satu putaran')}</text>
  <text x="${x0 + 60}" y="56" text-anchor="middle" opacity=".8">${L('the pink line is the rim laid flat', 'garis merah muda adalah tepi yang diratakan')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'π is the ratio circumference ÷ diameter, about 3.14159, and it is the same for every circle.',
        'Circumference C = 2πr = πd; area A = πr². The circumference grows in proportion to r, the area in proportion to r².',
        'A central angle θ cuts off the fraction θ/360 of the circle: arc = (θ/360) · 2πr and sector area = (θ/360) · πr².',
        'Lengths such as C and arc length are measured in cm or m; areas such as A and sector area are measured in cm² or m².',
        '3.14 and 22/7 are approximations of π; 22/7 is handy when r is a multiple of 7, but neither is exact.',
      ],
      id: [
        'π adalah rasio keliling ÷ diameter, sekitar 3,14159, dan nilainya sama untuk setiap lingkaran.',
        'Keliling K = 2πr = πd; luas L = πr². Keliling bertambah sebanding dengan r, luas sebanding dengan r².',
        'Sudut pusat θ memotong pecahan θ/360 dari lingkaran: busur = (θ/360) · 2πr dan luas juring = (θ/360) · πr².',
        'Panjang seperti K dan panjang busur diukur dalam cm atau m; luas seperti L dan luas juring diukur dalam cm² atau m².',
        '3,14 dan 22/7 adalah pendekatan π; 22/7 praktis jika r kelipatan 7, tetapi keduanya tidak eksak.',
      ],
    },
    vocabulary: {
      en: [
        ['Radius (r)', 'The distance from the centre of a circle to any point on its rim.'],
        ['Diameter (d)', 'A line straight across the circle through the centre; d = 2r.'],
        ['Circumference (C)', 'The distance all the way around a circle; C = 2πr.'],
        ['Pi (π)', 'The constant ratio C ÷ d ≈ 3.14159, the same for every circle.'],
        ['Central angle', 'An angle with its vertex at the centre of the circle, measured in degrees out of 360.'],
        ['Arc', 'A part of the rim between two points; its length is a fraction θ/360 of the circumference.'],
        ['Sector', 'A pizza-slice region bounded by two radii and an arc; its area is θ/360 of the circle area.'],
      ],
      id: [
        ['Jari-jari (r)', 'Jarak dari pusat lingkaran ke titik mana pun pada tepinya.'],
        ['Diameter (d)', 'Garis lurus melintasi lingkaran melalui pusat; d = 2r.'],
        ['Keliling (K)', 'Jarak mengitari seluruh lingkaran; K = 2πr.'],
        ['Pi (π)', 'Rasio tetap K ÷ d ≈ 3,14159, sama untuk setiap lingkaran.'],
        ['Sudut pusat', 'Sudut yang titik sudutnya di pusat lingkaran, diukur dalam derajat dari 360.'],
        ['Busur', 'Bagian tepi di antara dua titik; panjangnya adalah pecahan θ/360 dari keliling.'],
        ['Juring', 'Daerah seperti potongan pizza yang dibatasi dua jari-jari dan sebuah busur; luasnya θ/360 dari luas lingkaran.'],
      ],
    },
    misconceptions: {
      en: [
        ['π equals 3.14 (or 22/7) exactly.', 'Both are approximations. π = 3.14159265…; its decimals never end or repeat. The Unroll animation uses the true value, which is why the pink line is slightly longer than 3.14 diameters would suggest at high zoom.'],
        ['Doubling the radius doubles the area.', 'Area depends on r², so doubling r multiplies the area by 4. Only the circumference doubles. Check with r = 4 and r = 8 in the sim.'],
        ['πr² means (πr)².', 'Only the radius is squared: π × r × r. For r = 5, πr² ≈ 78.5, while (πr)² ≈ 246.7.'],
        ['An arc length is measured in degrees.', 'The angle is in degrees; the arc length is a distance in cm or m. A 90° arc on a big circle is longer than a 90° arc on a small one.'],
      ],
      id: [
        ['π sama dengan 3,14 (atau 22/7) secara eksak.', 'Keduanya pendekatan. π = 3,14159265…; desimalnya tidak pernah berakhir atau berulang. Animasi Bentangkan memakai nilai sebenarnya, sehingga garis merah muda sedikit lebih panjang daripada 3,14 diameter jika diperbesar.'],
        ['Menggandakan jari-jari menggandakan luas.', 'Luas bergantung pada r², jadi menggandakan r mengalikan luas dengan 4. Hanya keliling yang menjadi dua kali. Periksa dengan r = 4 dan r = 8 dalam simulasi.'],
        ['πr² berarti (πr)².', 'Hanya jari-jari yang dikuadratkan: π × r × r. Untuk r = 5, πr² ≈ 78,5, sedangkan (πr)² ≈ 246,7.'],
        ['Panjang busur diukur dalam derajat.', 'Sudutnya dalam derajat; panjang busur adalah jarak dalam cm atau m. Busur 90° pada lingkaran besar lebih panjang daripada busur 90° pada lingkaran kecil.'],
      ],
    },
    realWorld: {
      en: [
        'Bicycle odometers count wheel turns and multiply by the circumference to measure distance; a 70 cm wheel covers about 2.2 m per turn.',
        'Pizza pricing: a 30 cm pizza has 2.25 times the area of a 20 cm pizza, not 1.5 times — because area grows with r².',
        'Windscreen wipers sweep a sector; the cleaned area is (θ/360) × π(R² − r²) between the long and short radii.',
        'Running tracks: the curved parts of a 400 m track are semicircles, so lanes further out are longer and starts are staggered.',
        'Pie charts: each slice is a sector whose angle is the category\'s share of 360°.',
      ],
      id: [
        'Odometer sepeda menghitung putaran roda dan mengalikannya dengan keliling untuk mengukur jarak; roda 70 cm menempuh sekitar 2,2 m per putaran.',
        'Harga pizza: pizza 30 cm luasnya 2,25 kali pizza 20 cm, bukan 1,5 kali — karena luas bertambah dengan r².',
        'Wiper kaca mobil menyapu sebuah juring; daerah yang dibersihkan adalah (θ/360) × π(R² − r²) di antara jari-jari panjang dan pendek.',
        'Lintasan lari: bagian lengkung lintasan 400 m berbentuk setengah lingkaran, sehingga lintasan luar lebih panjang dan garis start dibuat berjenjang.',
        'Diagram lingkaran: setiap potongan adalah juring yang sudutnya adalah bagian kategori itu dari 360°.',
      ],
    },
    questions: {
      en: [
        { q: 'A circle has radius 7 cm. Using π ≈ 22/7, find its circumference and area, then find the arc length for a 90° central angle.', a: 'C = 2 × 22/7 × 7 = 44 cm; A = 22/7 × 49 = 154 cm²; arc = 90/360 × 44 = 11 cm (and the sector area is 154/4 = 38.5 cm²).' },
        { q: 'Explain, using the Unroll animation, why C ÷ d is the same for a circle with r = 2 and one with r = 9.', a: 'For both circles one roll lays down three diameters plus the same extra fraction, 0.14 of a diameter. Scaling a circle up scales the rim and the diameter by the same factor, so their ratio, π, cannot change.' },
        { q: 'With θ fixed at 120°, the radius is doubled. By what factor do the arc length and the sector area change? Why are the factors different?', a: 'The arc length doubles (it is proportional to r), but the sector area is multiplied by 4 (it is proportional to r²). A length scales with one factor of r, an area with two.' },
      ],
      id: [
        { q: 'Sebuah lingkaran berjari-jari 7 cm. Dengan π ≈ 22/7, tentukan keliling dan luasnya, lalu tentukan panjang busur untuk sudut pusat 90°.', a: 'K = 2 × 22/7 × 7 = 44 cm; L = 22/7 × 49 = 154 cm²; busur = 90/360 × 44 = 11 cm (dan luas juringnya 154/4 = 38,5 cm²).' },
        { q: 'Jelaskan, dengan animasi Bentangkan, mengapa K ÷ d sama untuk lingkaran dengan r = 2 dan lingkaran dengan r = 9.', a: 'Untuk kedua lingkaran, satu gelindingan membentangkan tiga diameter ditambah pecahan tambahan yang sama, 0,14 diameter. Memperbesar lingkaran memperbesar tepi dan diameter dengan faktor yang sama, sehingga rasionya, π, tidak dapat berubah.' },
        { q: 'Dengan θ tetap 120°, jari-jari digandakan. Dengan faktor berapa panjang busur dan luas juring berubah? Mengapa faktornya berbeda?', a: 'Panjang busur menjadi dua kali (sebanding dengan r), tetapi luas juring dikalikan 4 (sebanding dengan r²). Panjang berskala dengan satu faktor r, luas dengan dua.' },
      ],
    },
  },
};
