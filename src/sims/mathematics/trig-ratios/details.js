// Long-form text for the sim page aside, kept out of manifest.js.
export default {
  objectives: {
    en: [
      'Name the opposite, adjacent and hypotenuse of a right triangle relative to a chosen acute angle, and define sin θ, cos θ and tan θ as ratios of those sides.',
      'Explain why the ratios depend only on the angle and not on the size of the triangle, and recall the exact values for 30°, 45° and 60°.',
      'Use the tangent ratio to find an inaccessible height from a measured distance and angle of elevation, as with a clinometer.',
    ],
    id: [
      'Menamai sisi depan, sisi samping dan sisi miring segitiga siku-siku relatif terhadap sudut lancip yang dipilih, dan mendefinisikan sin θ, cos θ dan tan θ sebagai perbandingan sisi-sisi itu.',
      'Menjelaskan mengapa perbandingan itu hanya bergantung pada sudut dan bukan pada ukuran segitiga, serta mengingat nilai eksak untuk 30°, 45° dan 60°.',
      'Menggunakan perbandingan tangen untuk menentukan tinggi yang tidak dapat dijangkau dari jarak dan sudut elevasi yang diukur, seperti dengan klinometer.',
    ],
  },
  tryThis: {
    en: [
      'Drag vertex B up and down and watch sin θ and tan θ. Which one can grow past 1, and which can never reach 1? Why?',
      'Let the angle snap to 45°. Read the two legs: why must they be equal, and why is the hypotenuse exactly √2 times a leg?',
      'Set θ at A to 30°, then switch "Angle θ at vertex" to B. The triangle has not moved, but every label changes. Compare sin 30° with cos 60°.',
      'In clinometer mode, keep the tree the same height by moving closer and dragging the tree top: as d halves, what happens to θ and to tan θ?',
    ],
    id: [
      'Seret titik B ke atas dan ke bawah lalu amati sin θ dan tan θ. Mana yang bisa melebihi 1, dan mana yang tidak pernah mencapai 1? Mengapa?',
      'Biarkan sudut terkunci di 45°. Baca kedua kaki segitiga: mengapa keduanya harus sama, dan mengapa sisi miringnya tepat √2 kali kaki?',
      'Atur θ di A ke 30°, lalu ganti "Angle θ at vertex" ke B. Segitiganya tidak bergerak, tetapi semua label berubah. Bandingkan sin 30° dengan cos 60°.',
      'Pada mode klinometer, pertahankan tinggi pohon dengan mendekat dan menyeret puncak pohon: ketika d menjadi separuh, apa yang terjadi pada θ dan tan θ?',
    ],
  },

  learn: {
    background: {
      en: [
        'In a right triangle the longest side, opposite the right angle, is the hypotenuse. The other two sides are named relative to the acute angle θ you are looking at: the side across from θ is the opposite and the side next to θ (that is not the hypotenuse) is the adjacent. Change the angle you are looking at and the two legs swap names, which the sim shows when you switch θ from vertex A to vertex B. The three basic trigonometric ratios are sin θ = opposite/hypotenuse, cos θ = adjacent/hypotenuse and tan θ = opposite/adjacent, often remembered as "soh-cah-toa" or, in Indonesian, "sin = de/mi, cos = sa/mi, tan = de/sa".',
        'These ratios are properties of the angle, not of the particular triangle. Any two right triangles with the same acute angle are similar, so all their sides are in the same proportion and every ratio of two sides is the same. In the sim, dragging vertex A to make the triangle larger while the angle stays at 30° changes all three side lengths but leaves sin, cos and tan exactly where they were. This is what makes it possible to tabulate sin, cos and tan once for every angle and then use them on any triangle, from a drawing on paper to a mountain.',
        'Three angles have ratios you can write exactly. Cutting an equilateral triangle of side 2 in half gives a 30°-60°-90° triangle with sides 1, √3 and 2, so sin 30° = 1/2, cos 30° = √3/2, tan 30° = √3/3, and at 60° sine and cosine swap: sin 60° = √3/2, cos 60° = 1/2, tan 60° = √3. A square of side 1 cut along its diagonal gives a 45°-45°-90° triangle with hypotenuse √2, so sin 45° = cos 45° = √2/2 ≈ 0.707 and tan 45° = 1. The snap option in the sim lands on these angles and prints the exact forms beside the decimals. Because the two acute angles add to 90°, sin θ = cos(90° − θ) always, and the Pythagorean theorem gives sin²θ + cos²θ = 1 for every θ.',
        'A clinometer is a simple tool for measuring an angle of elevation: the angle between the horizontal and your line of sight to the top of an object. If you stand d metres from a tree and sight its top at angle θ, the horizontal distance d is the adjacent side and the rise of the treetop above your eye is the opposite side, so rise = d·tan θ and the tree height is eye height + d·tan θ. From 20 m away at 35° the rise is 20·0.700 ≈ 14.0 m, so a person with eyes 1.6 m above the ground finds the tree about 15.6 m tall. The sim lets you move the observer and the treetop to see that a closer observer must look up more steeply, and that at 45° the rise equals the distance.',
      ],
      id: [
        'Pada segitiga siku-siku, sisi terpanjang yang berhadapan dengan sudut siku-siku disebut sisi miring. Dua sisi lainnya dinamai relatif terhadap sudut lancip θ yang kamu tinjau: sisi di seberang θ adalah sisi depan dan sisi di sebelah θ (yang bukan sisi miring) adalah sisi samping. Ganti sudut yang ditinjau, maka kedua kaki bertukar nama; simulasi memperlihatkannya ketika kamu mengganti θ dari titik A ke titik B. Tiga perbandingan trigonometri dasar adalah sin θ = depan/miring, cos θ = samping/miring dan tan θ = depan/samping, yang sering diingat sebagai "sin = de/mi, cos = sa/mi, tan = de/sa".',
        'Perbandingan ini adalah sifat dari sudut, bukan dari segitiga tertentu. Dua segitiga siku-siku dengan sudut lancip yang sama pasti sebangun, sehingga semua sisinya sebanding dan setiap perbandingan dua sisinya sama. Di simulasi, menyeret titik A untuk memperbesar segitiga sementara sudut tetap 30° mengubah ketiga panjang sisi tetapi sin, cos dan tan tetap di nilai yang sama. Inilah yang memungkinkan sin, cos dan tan ditabelkan sekali untuk setiap sudut lalu dipakai pada segitiga apa pun, dari gambar di kertas sampai gunung.',
        'Tiga sudut memiliki perbandingan yang dapat ditulis eksak. Membelah segitiga sama sisi bersisi 2 menjadi dua memberi segitiga 30°-60°-90° dengan sisi 1, √3 dan 2, sehingga sin 30° = 1/2, cos 30° = √3/2, tan 30° = √3/3, dan pada 60° sinus dan kosinus bertukar: sin 60° = √3/2, cos 60° = 1/2, tan 60° = √3. Persegi bersisi 1 yang dipotong sepanjang diagonalnya memberi segitiga 45°-45°-90° dengan sisi miring √2, sehingga sin 45° = cos 45° = √2/2 ≈ 0,707 dan tan 45° = 1. Pilihan kunci di simulasi mendarat pada sudut-sudut ini dan menuliskan bentuk eksaknya di samping desimal. Karena dua sudut lancip berjumlah 90°, selalu berlaku sin θ = cos(90° − θ), dan teorema Pythagoras memberi sin²θ + cos²θ = 1 untuk setiap θ.',
        'Klinometer adalah alat sederhana untuk mengukur sudut elevasi: sudut antara garis horizontal dan garis pandangmu ke puncak suatu benda. Jika kamu berdiri d meter dari pohon dan memandang puncaknya pada sudut θ, jarak mendatar d adalah sisi samping dan kenaikan puncak di atas matamu adalah sisi depan, sehingga kenaikan = d·tan θ dan tinggi pohon = tinggi mata + d·tan θ. Dari jarak 20 m pada 35°, kenaikannya 20·0,700 ≈ 14,0 m, sehingga orang dengan mata 1,6 m di atas tanah mendapati pohon setinggi sekitar 15,6 m. Simulasi membiarkanmu memindahkan pengamat dan puncak pohon untuk melihat bahwa pengamat yang lebih dekat harus mendongak lebih curam, dan bahwa pada 45° kenaikan sama dengan jarak.',
      ],
    },
    figure: {
      caption: {
        en: 'Left: the sides of a right triangle named for the angle θ at A, with the three ratios. Right: the two special triangles, half an equilateral triangle (30°-60°-90°, sides 1, √3, 2) and half a unit square (45°-45°-90°, sides 1, 1, √2), from which the exact values come.',
        id: 'Kiri: sisi-sisi segitiga siku-siku yang dinamai untuk sudut θ di A, beserta tiga perbandingannya. Kanan: dua segitiga istimewa, setengah segitiga sama sisi (30°-60°-90°, sisi 1, √3, 2) dan setengah persegi satuan (45°-45°-90°, sisi 1, 1, √2), asal nilai-nilai eksak.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Right triangle with opposite, adjacent and hypotenuse, and the two special triangles', 'Segitiga siku-siku dengan sisi depan, samping dan miring, serta dua segitiga istimewa')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.s{font:9px ui-monospace,monospace;fill:currentColor}.b{font:bold 11px system-ui,sans-serif}</style>
  <polygon points="20,150 170,150 170,50" fill="currentColor" opacity="0.06"/>
  <line x1="20" y1="150" x2="170" y2="150" stroke="#38bdf8" stroke-width="3"/>
  <line x1="170" y1="150" x2="170" y2="50" stroke="#f472b6" stroke-width="3"/>
  <line x1="20" y1="150" x2="170" y2="50" stroke="#fbbf24" stroke-width="3"/>
  <polyline points="158,150 158,138 170,138" fill="none" stroke="currentColor" stroke-width="1.2" opacity="0.7"/>
  <path d="M52 150 A32 32 0 0 0 48.4 131.1" fill="none" stroke="#34d399" stroke-width="2"/>
  <text x="56" y="140" fill="#34d399" class="b">θ</text>
  <text x="14" y="164" class="b">A</text><text x="174" y="164" class="b">C</text><text x="174" y="48" class="b">B</text>
  <text x="95" y="166" text-anchor="middle" fill="#38bdf8" class="b">${L('adjacent', 'samping')}</text>
  <text x="176" y="104" fill="#f472b6" class="b">${L('opposite', 'depan')}</text>
  <text x="82" y="88" fill="#fbbf24" class="b" transform="rotate(-33.7 82 88)">${L('hypotenuse', 'miring')}</text>
  <text x="20" y="190" class="s">sin θ = <tspan fill="#f472b6">${L('opp', 'de')}</tspan>/<tspan fill="#fbbf24">${L('hyp', 'mi')}</tspan></text>
  <text x="20" y="206" class="s">cos θ = <tspan fill="#38bdf8">${L('adj', 'sa')}</tspan>/<tspan fill="#fbbf24">${L('hyp', 'mi')}</tspan></text>
  <text x="20" y="222" class="s">tan θ = <tspan fill="#f472b6">${L('opp', 'de')}</tspan>/<tspan fill="#38bdf8">${L('adj', 'sa')}</tspan></text>
  <polygon points="230,120 290,120 290,16.1" fill="none" stroke="currentColor" stroke-width="1.5"/>
  <polyline points="282,120 282,112 290,112" fill="none" stroke="currentColor" stroke-width="1" opacity="0.7"/>
  <text x="260" y="134" text-anchor="middle" class="s">1</text>
  <text x="296" y="72" class="s">√3</text>
  <text x="246" y="62" class="s">2</text>
  <text x="248" y="114" class="s" fill="#34d399">60°</text>
  <text x="272" y="36" class="s" fill="#34d399">30°</text>
  <text x="268" y="152" text-anchor="middle" class="s">sin 30° = 1/2, cos 30° = √3/2</text>
  <polygon points="236,230 296,230 296,170" fill="none" stroke="currentColor" stroke-width="1.5"/>
  <polyline points="288,230 288,222 296,222" fill="none" stroke="currentColor" stroke-width="1" opacity="0.7"/>
  <text x="266" y="240" text-anchor="middle" class="s">1</text>
  <text x="300" y="203" class="s">1</text>
  <text x="252" y="196" class="s">√2</text>
  <text x="248" y="226" class="s" fill="#34d399">45°</text>
  <text x="330" y="203" class="s">tan 45° = 1</text>
  <text x="330" y="217" class="s">sin 45° = √2/2</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'The hypotenuse is always the side opposite the right angle; opposite and adjacent are named relative to the chosen acute angle and swap when the angle changes.',
        'sin θ = opposite/hypotenuse, cos θ = adjacent/hypotenuse, tan θ = opposite/adjacent.',
        'The ratios depend only on θ: similar triangles have equal ratios, so scaling a triangle changes its sides but not sin, cos or tan.',
        'Exact values: sin 30° = cos 60° = 1/2, sin 60° = cos 30° = √3/2, sin 45° = cos 45° = √2/2, tan 30° = √3/3, tan 45° = 1, tan 60° = √3.',
        'For an acute angle, sin and cos are between 0 and 1 (the hypotenuse is the longest side), but tan can be any positive number. Also sin²θ + cos²θ = 1 and tan θ = sin θ/cos θ.',
        'Height from a clinometer: height = eye height + distance × tan(angle of elevation).',
      ],
      id: [
        'Sisi miring selalu sisi di hadapan sudut siku-siku; sisi depan dan sisi samping dinamai relatif terhadap sudut lancip yang dipilih dan bertukar bila sudutnya diganti.',
        'sin θ = depan/miring, cos θ = samping/miring, tan θ = depan/samping.',
        'Perbandingan hanya bergantung pada θ: segitiga sebangun memiliki perbandingan yang sama, sehingga memperbesar segitiga mengubah sisinya tetapi tidak mengubah sin, cos atau tan.',
        'Nilai eksak: sin 30° = cos 60° = 1/2, sin 60° = cos 30° = √3/2, sin 45° = cos 45° = √2/2, tan 30° = √3/3, tan 45° = 1, tan 60° = √3.',
        'Untuk sudut lancip, sin dan cos bernilai antara 0 dan 1 (sisi miring adalah sisi terpanjang), tetapi tan dapat bernilai positif berapa pun. Juga sin²θ + cos²θ = 1 dan tan θ = sin θ/cos θ.',
        'Tinggi dari klinometer: tinggi = tinggi mata + jarak × tan(sudut elevasi).',
      ],
    },
    vocabulary: {
      en: [
        ['Hypotenuse', 'The longest side of a right triangle, opposite the right angle.'],
        ['Opposite side', 'The leg across from the acute angle being considered.'],
        ['Adjacent side', 'The leg next to the acute angle being considered (the other leg).'],
        ['Sine, cosine, tangent', 'The ratios opposite/hypotenuse, adjacent/hypotenuse and opposite/adjacent for an acute angle of a right triangle.'],
        ['Special angles', '30°, 45° and 60°, whose trigonometric ratios can be written exactly with square roots.'],
        ['Angle of elevation', 'The angle between the horizontal and the line of sight upward to an object; measured with a clinometer.'],
      ],
      id: [
        ['Sisi miring (hipotenusa)', 'Sisi terpanjang segitiga siku-siku, berhadapan dengan sudut siku-siku.'],
        ['Sisi depan', 'Kaki segitiga yang berhadapan dengan sudut lancip yang ditinjau.'],
        ['Sisi samping', 'Kaki segitiga yang bersebelahan dengan sudut lancip yang ditinjau (kaki yang lain).'],
        ['Sinus, kosinus, tangen', 'Perbandingan depan/miring, samping/miring dan depan/samping untuk sudut lancip segitiga siku-siku.'],
        ['Sudut istimewa', '30°, 45° dan 60°, yang perbandingan trigonometrinya dapat ditulis eksak dengan bentuk akar.'],
        ['Sudut elevasi', 'Sudut antara garis horizontal dan garis pandang ke atas menuju suatu benda; diukur dengan klinometer.'],
      ],
    },
    misconceptions: {
      en: [
        ['A bigger triangle has bigger sine and cosine.', 'No. Enlarging a triangle without changing its angles multiplies every side by the same factor, which cancels in each ratio. In the sim, dragging A outward at a fixed 30° leaves sin θ = 0.500 unchanged.'],
        ['The opposite side is always the vertical one.', 'Opposite and adjacent are defined relative to the angle, not to the page. Switch θ to vertex B in the sim and the vertical leg becomes the adjacent side.'],
        ['sin 60° is twice sin 30°.', 'sin 30° = 0.5 but sin 60° = √3/2 ≈ 0.866, not 1. Sine is not proportional to the angle; doubling an angle does not double its sine.'],
        ['tan θ, like sin and cos, must be at most 1.', 'tan θ = opposite/adjacent and the opposite leg can be much longer than the adjacent one. tan 60° = √3 ≈ 1.73 and tan 80° ≈ 5.67; only sin and cos are bounded by the hypotenuse.'],
      ],
      id: [
        ['Segitiga yang lebih besar memiliki sinus dan kosinus yang lebih besar.', 'Tidak. Memperbesar segitiga tanpa mengubah sudutnya mengalikan setiap sisi dengan faktor yang sama, yang saling tercoret dalam perbandingan. Di simulasi, menyeret A ke luar pada 30° tetap memberi sin θ = 0,500.'],
        ['Sisi depan selalu sisi yang tegak.', 'Sisi depan dan samping ditentukan relatif terhadap sudut, bukan terhadap halaman. Ganti θ ke titik B di simulasi dan kaki yang tegak menjadi sisi samping.'],
        ['sin 60° adalah dua kali sin 30°.', 'sin 30° = 0,5 tetapi sin 60° = √3/2 ≈ 0,866, bukan 1. Sinus tidak sebanding dengan sudut; menggandakan sudut tidak menggandakan sinusnya.'],
        ['tan θ, seperti sin dan cos, paling besar 1.', 'tan θ = depan/samping dan sisi depan bisa jauh lebih panjang daripada sisi samping. tan 60° = √3 ≈ 1,73 dan tan 80° ≈ 5,67; hanya sin dan cos yang dibatasi oleh sisi miring.'],
      ],
    },
    realWorld: {
      en: [
        'Surveyors and foresters measure the height of buildings and trees with a clinometer and a tape measure, exactly as in the sim\'s application mode.',
        'A wheelchair ramp with slope 1:12 rises 1 unit for every 12 along, so its angle satisfies tan θ = 1/12, about 4.8°.',
        'Pilots use the glide-slope angle (about 3°) and distance to the runway to know how high they should be: height = distance × tan 3°.',
        'Roof trusses, ladders against walls and guy-wires on masts are all right triangles whose lengths and angles are set with sin, cos and tan.',
        'GPS, computer graphics and physics all rest on these same ratios, extended from acute angles to all angles on the unit circle.',
      ],
      id: [
        'Juru ukur dan rimbawan mengukur tinggi bangunan dan pohon dengan klinometer dan meteran, persis seperti mode aplikasi di simulasi.',
        'Jalur landai kursi roda dengan kemiringan 1:12 naik 1 satuan untuk setiap 12 satuan mendatar, sehingga sudutnya memenuhi tan θ = 1/12, sekitar 4,8°.',
        'Pilot menggunakan sudut lintasan luncur (sekitar 3°) dan jarak ke landasan untuk mengetahui ketinggian yang seharusnya: tinggi = jarak × tan 3°.',
        'Kuda-kuda atap, tangga yang disandarkan ke dinding dan kawat penahan tiang semuanya adalah segitiga siku-siku yang panjang dan sudutnya diatur dengan sin, cos dan tan.',
        'GPS, grafika komputer dan fisika semuanya bertumpu pada perbandingan yang sama ini, yang diperluas dari sudut lancip ke semua sudut pada lingkaran satuan.',
      ],
    },
    questions: {
      en: [
        { q: 'A right triangle has legs 6 and 8. For the angle opposite the side of length 6, find sin, cos and tan.', a: 'The hypotenuse is √(36 + 64) = 10. sin θ = 6/10 = 0.6, cos θ = 8/10 = 0.8, tan θ = 6/8 = 0.75. Check: 0.36 + 0.64 = 1.' },
        { q: 'Standing 20 m from a tree, you measure an angle of elevation of 35° with your eyes 1.6 m above the ground. How tall is the tree?', a: 'Rise = 20·tan 35° ≈ 20·0.700 = 14.0 m, so height ≈ 1.6 + 14.0 = 15.6 m.' },
        { q: 'Without a calculator, find the exact height of an equilateral triangle with side 10 cm.', a: 'Its altitude makes a 30°-60°-90° triangle with hypotenuse 10 and the 60° angle at the base, so height = 10·sin 60° = 10·√3/2 = 5√3 ≈ 8.66 cm.' },
        { q: 'Explain why sin θ = cos(90° − θ) for any acute angle θ of a right triangle.', a: 'The other acute angle is 90° − θ. The side opposite θ is the side adjacent to 90° − θ, and both share the same hypotenuse, so opposite/hypotenuse for θ equals adjacent/hypotenuse for 90° − θ.' },
      ],
      id: [
        { q: 'Segitiga siku-siku memiliki kaki 6 dan 8. Untuk sudut yang berhadapan dengan sisi 6, tentukan sin, cos dan tan.', a: 'Sisi miringnya √(36 + 64) = 10. sin θ = 6/10 = 0,6, cos θ = 8/10 = 0,8, tan θ = 6/8 = 0,75. Periksa: 0,36 + 0,64 = 1.' },
        { q: 'Berdiri 20 m dari sebuah pohon, kamu mengukur sudut elevasi 35° dengan mata 1,6 m di atas tanah. Berapa tinggi pohon?', a: 'Kenaikan = 20·tan 35° ≈ 20·0,700 = 14,0 m, sehingga tinggi ≈ 1,6 + 14,0 = 15,6 m.' },
        { q: 'Tanpa kalkulator, tentukan tinggi eksak segitiga sama sisi dengan sisi 10 cm.', a: 'Garis tingginya membentuk segitiga 30°-60°-90° dengan sisi miring 10 dan sudut 60° di alas, sehingga tinggi = 10·sin 60° = 10·√3/2 = 5√3 ≈ 8,66 cm.' },
        { q: 'Jelaskan mengapa sin θ = cos(90° − θ) untuk setiap sudut lancip θ pada segitiga siku-siku.', a: 'Sudut lancip lainnya adalah 90° − θ. Sisi di depan θ adalah sisi di samping 90° − θ, dan keduanya memiliki sisi miring yang sama, sehingga depan/miring untuk θ sama dengan samping/miring untuk 90° − θ.' },
      ],
    },
  },
};
