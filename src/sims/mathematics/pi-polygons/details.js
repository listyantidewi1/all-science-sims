// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Bracket π between two computable bounds.',
      'See convergence rate slow but reliable.',
      'Recognize an early example of the calculus idea of limits.',
    ],
    id: [
      'Mengapit π antara dua batas yang dapat dihitung.',
      'Melihat laju konvergensi yang lambat tapi andal.',
      'Mengenali contoh awal gagasan limit dalam kalkulus.',
    ],
  },  tryThis: {
    en: [
      'n=6 — what bracket? Compare with Archimedes (n=96).',
      'Pump n to 1000 — how many digits of π are stable?',
      'Watch outer perimeter approach from above, inner from below.',
    ],
    id: [
      'n=6 — apa batas atas-bawahnya? Bandingkan dengan Archimedes (n=96).',
      'Naikkan n ke 1000 — berapa digit π yang stabil?',
      'Amati keliling luar mendekati dari atas, dalam dari bawah.',
    ],
  },

  // "Learn" section: the mathematics behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'The number π is the ratio of any circle\'s circumference to its diameter. Measuring it with a tape is hopeless beyond two or three digits, so Archimedes found a way to trap π between two numbers he could calculate exactly. Draw a regular polygon inside a circle, with its corners on the circle: its perimeter is shorter than the circle, because each straight side is a shortcut compared with the curved arc. Draw a second regular polygon outside, with its sides just touching the circle: its perimeter is longer. The circle\'s circumference must lie between the two.',
        'The simulation draws a circle of radius 1 with an inscribed polygon (green) and a circumscribed polygon (red) of the same number of sides n. Half of each perimeter is an estimate of π, and the readout shows the inner estimate as a lower bound and the outer one as an upper bound. The slider changes n from 3 to 1000; the preset buttons follow Archimedes\' own doubling sequence 6, 12, 24, 48, 96, and 384. With a hexagon the bracket is 3.000 to 3.464. With 96 sides it is 3.1410 to 3.1427, so π = 3.14 is certain and the third decimal is nearly fixed.',
        'Why does more sides help? Each side of the inner polygon is a chord, and as n grows every chord hugs its arc more closely, so the gap between polygon and circle shrinks. In words, the inner estimate is n times the sine of (180° divided by n), and the outer estimate is n times the tangent of the same angle. The sim computes exactly these values. The gap closes roughly in proportion to 1 over n squared: doubling the number of sides cuts the error to about a quarter.',
        'Archimedes did not have a calculator or trigonometric tables. He started from a hexagon and found exact rules for going from n sides to 2n sides, carrying careful fractions through four doublings to reach 96 sides, which gave him 223/71 < π < 22/7. The sim uses floating-point arithmetic instead, so at n = 1000 the two bounds agree to about five decimals. This method shows the idea of a limit long before calculus: π is the one number that every bracket contains, however tight you make it.',
      ],
      id: [
        'Bilangan π adalah perbandingan keliling lingkaran dengan diameternya. Mengukurnya dengan meteran hanya memberi dua atau tiga angka, jadi Archimedes mencari cara menjepit π di antara dua bilangan yang bisa ia hitung dengan pasti. Gambar poligon beraturan di dalam lingkaran dengan titik sudut pada lingkaran: kelilingnya lebih pendek daripada lingkaran, karena setiap sisi lurus adalah jalan pintas dibandingkan busur lengkungnya. Gambar poligon beraturan kedua di luar, dengan sisi-sisi yang tepat menyinggung lingkaran: kelilingnya lebih panjang. Keliling lingkaran pasti berada di antara keduanya.',
        'Simulasi ini menggambar lingkaran berjari-jari 1 dengan poligon dalam (hijau) dan poligon luar (merah) yang jumlah sisinya sama, n. Setengah keliling masing-masing adalah taksiran π, dan panel angka menampilkan taksiran dalam sebagai batas bawah dan taksiran luar sebagai batas atas. Slider mengubah n dari 3 sampai 1000; tombol preset mengikuti urutan penggandaan Archimedes sendiri: 6, 12, 24, 48, 96, dan 384. Dengan segi enam, jepitannya 3,000 sampai 3,464. Dengan 96 sisi, jepitannya 3,1410 sampai 3,1427, sehingga π = 3,14 sudah pasti dan desimal ketiga hampir terkunci.',
        'Mengapa lebih banyak sisi membantu? Setiap sisi poligon dalam adalah tali busur, dan saat n bertambah setiap tali busur makin merapat ke busurnya, sehingga celah antara poligon dan lingkaran mengecil. Dalam kata-kata, taksiran dalam sama dengan n dikali sinus dari (180° dibagi n), dan taksiran luar sama dengan n dikali tangen sudut yang sama. Sim menghitung tepat nilai-nilai ini. Celahnya menutup kira-kira sebanding dengan 1 per n kuadrat: menggandakan jumlah sisi memangkas galat menjadi sekitar seperempatnya.',
        'Archimedes tidak punya kalkulator maupun tabel trigonometri. Ia mulai dari segi enam dan menemukan aturan pasti untuk beralih dari n sisi ke 2n sisi, membawa pecahan-pecahan yang teliti melalui empat kali penggandaan hingga 96 sisi, yang memberinya 223/71 < π < 22/7. Sim ini memakai aritmetika desimal komputer, sehingga pada n = 1000 kedua batas bersepakat sampai sekitar lima desimal. Metode ini menunjukkan gagasan limit jauh sebelum kalkulus ada: π adalah satu-satunya bilangan yang terkandung dalam setiap jepitan, seberapa pun rapatnya.',
      ],
    },
    figure: {
      caption: {
        en: 'A circle sandwiched between an inscribed hexagon (green, perimeter too short) and a circumscribed hexagon (red, too long). On the number line, the brackets for n = 6 and n = 12 both contain π, and the second is much tighter.',
        id: 'Lingkaran dijepit antara segi enam dalam (hijau, keliling terlalu pendek) dan segi enam luar (merah, terlalu panjang). Pada garis bilangan, jepitan untuk n = 6 dan n = 12 sama-sama memuat π, dan yang kedua jauh lebih rapat.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Inscribed and circumscribed hexagons bracket the circle', 'Segi enam dalam dan luar menjepit lingkaran')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.m{fill:none;stroke:currentColor;stroke-width:1.2;opacity:.45}.c{fill:none;stroke:currentColor;stroke-width:1.8}.p{stroke-width:2;fill:none}</style>
  <circle cx="110" cy="105" r="60" class="c"/>
  <polygon points="170,105 140,157 80,157 50,105 80,53 140,53" class="p" stroke="#10b981" fill="#10b981" fill-opacity="0.12"/>
  <polygon points="170,139.6 110,174.3 50,139.6 50,70.4 110,35.7 170,70.4" class="p" stroke="#ef4444"/>
  <line x1="110" y1="105" x2="170" y2="105" class="m"/>
  <text x="132" y="100" opacity=".8">r = 1</text>
  <text x="200" y="40" fill="#10b981">${L('inside (n = 6):', 'dalam (n = 6):')}</text>
  <text x="200" y="55" fill="#10b981">${L('half perimeter = 3.000', 'setengah keliling = 3,000')}</text>
  <text x="200" y="80" fill="#ef4444">${L('outside (n = 6):', 'luar (n = 6):')}</text>
  <text x="200" y="95" fill="#ef4444">${L('half perimeter = 3.464', 'setengah keliling = 3,464')}</text>
  <text x="200" y="120">${L('so 3.000 ≤ π ≤ 3.464', 'jadi 3,000 ≤ π ≤ 3,464')}</text>
  <text x="200" y="145" opacity=".8">${L('n = 12: 3.106 ≤ π ≤ 3.215', 'n = 12: 3,106 ≤ π ≤ 3,215')}</text>
  <text x="200" y="160" opacity=".8">${L('n = 96: 3.1410 ≤ π ≤ 3.1427', 'n = 96: 3,1410 ≤ π ≤ 3,1427')}</text>
  <line x1="40" y1="210" x2="330" y2="210" stroke="currentColor" stroke-width="1.4"/>
  <line x1="60" y1="204" x2="60" y2="216" stroke="currentColor" stroke-width="1"/>
  <text x="52" y="230">${L('3.0', '3,0')}</text>
  <line x1="310" y1="204" x2="310" y2="216" stroke="currentColor" stroke-width="1"/>
  <text x="302" y="230">${L('3.5', '3,5')}</text>
  <line x1="60" y1="196" x2="292" y2="196" stroke="#f59e0b" stroke-width="2" opacity=".5"/>
  <line x1="60" y1="190" x2="60" y2="202" stroke="#10b981" stroke-width="3"/>
  <line x1="292" y1="190" x2="292" y2="202" stroke="#ef4444" stroke-width="3"/>
  <text x="270" y="188" opacity=".8">n = 6</text>
  <line x1="113" y1="186" x2="168" y2="186" stroke="#f59e0b" stroke-width="2" opacity=".5"/>
  <line x1="113" y1="181" x2="113" y2="191" stroke="#10b981" stroke-width="3"/>
  <line x1="168" y1="181" x2="168" y2="191" stroke="#ef4444" stroke-width="3"/>
  <text x="172" y="182" opacity=".8">n = 12</text>
  <line x1="131" y1="200" x2="131" y2="220" stroke="currentColor" stroke-width="2"/>
  <text x="127" y="233">π</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'An inscribed polygon is always shorter than the circle and a circumscribed one always longer, so the circle\'s circumference is trapped between them.',
        'Half of each polygon\'s perimeter (for a circle of radius 1) is an estimate of π; the inner one is a lower bound and the outer one an upper bound.',
        'More sides means the polygons hug the circle more closely and the bracket around π tightens.',
        'Doubling the number of sides cuts the error to roughly a quarter, so the method is slow but completely reliable.',
        'π is the one number inside every bracket; this is the idea of a limit.',
      ],
      id: [
        'Poligon dalam selalu lebih pendek daripada lingkaran dan poligon luar selalu lebih panjang, sehingga keliling lingkaran terjepit di antara keduanya.',
        'Setengah keliling tiap poligon (untuk lingkaran berjari-jari 1) adalah taksiran π; yang dalam menjadi batas bawah dan yang luar batas atas.',
        'Semakin banyak sisi, poligon makin merapat ke lingkaran dan jepitan di sekitar π makin sempit.',
        'Menggandakan jumlah sisi memangkas galat menjadi kira-kira seperempat, jadi metode ini lambat tetapi sepenuhnya dapat diandalkan.',
        'π adalah satu-satunya bilangan yang berada di dalam setiap jepitan; inilah gagasan limit.',
      ],
    },
    vocabulary: {
      en: [
        ['π (pi)', 'The ratio of a circle\'s circumference to its diameter, about 3.14159; the same for every circle.'],
        ['Regular polygon', 'A flat shape with all sides equal and all angles equal, such as an equilateral triangle, a square, or a regular hexagon.'],
        ['Inscribed polygon', 'A polygon drawn inside a circle with every corner on the circle.'],
        ['Circumscribed polygon', 'A polygon drawn outside a circle with every side touching the circle at one point.'],
        ['Perimeter', 'The total length of all the sides of a shape.'],
        ['Lower and upper bound', 'Numbers that a quantity cannot go below or above; together they form a bracket that contains the true value.'],
        ['Limit', 'The single value that a sequence of estimates closes in on as the number of steps grows without end.'],
      ],
      id: [
        ['π (pi)', 'Perbandingan keliling lingkaran dengan diameternya, sekitar 3,14159; sama untuk setiap lingkaran.'],
        ['Poligon beraturan', 'Bangun datar dengan semua sisi sama panjang dan semua sudut sama besar, seperti segitiga sama sisi, persegi, atau segi enam beraturan.'],
        ['Poligon dalam', 'Poligon yang digambar di dalam lingkaran dengan setiap titik sudutnya terletak pada lingkaran.'],
        ['Poligon luar', 'Poligon yang digambar di luar lingkaran dengan setiap sisinya menyinggung lingkaran di satu titik.'],
        ['Keliling', 'Panjang total semua sisi suatu bangun.'],
        ['Batas bawah dan batas atas', 'Bilangan yang tidak bisa dilewati ke bawah atau ke atas oleh suatu besaran; bersama-sama membentuk jepitan yang memuat nilai sebenarnya.'],
        ['Limit', 'Nilai tunggal yang didekati oleh barisan taksiran saat jumlah langkahnya bertambah tanpa henti.'],
      ],
    },
    misconceptions: {
      en: [
        ['π is exactly 22/7 or exactly 3.14.', 'Both are approximations. 22/7 ≈ 3.142857 is slightly too big (it was Archimedes\' upper bound), and 3.14 is slightly too small. π is irrational: its decimals never end and never repeat.'],
        ['If you use enough sides, the polygon becomes the circle and you get π exactly.', 'No finite polygon is a circle; every one leaves a tiny gap, so every estimate has some error. The method gives a bracket as tight as you like, and π is the limit the brackets close in on.'],
        ['The inner and outer estimates approach π at the same speed.', 'The outer estimate\'s error is about twice the inner one\'s for large n (the sim\'s readout shows this), which is why the midpoint of the bracket is not the best guess; a weighted average does better.'],
      ],
      id: [
        ['π tepat sama dengan 22/7 atau tepat 3,14.', 'Keduanya hanya pendekatan. 22/7 ≈ 3,142857 sedikit terlalu besar (ini batas atas Archimedes), dan 3,14 sedikit terlalu kecil. π adalah bilangan irasional: desimalnya tidak pernah berakhir dan tidak pernah berulang.'],
        ['Kalau sisinya cukup banyak, poligon menjadi lingkaran dan kita mendapat π dengan tepat.', 'Tidak ada poligon berhingga yang menjadi lingkaran; selalu ada celah kecil, sehingga setiap taksiran punya galat. Metode ini memberi jepitan serapat yang kita mau, dan π adalah limit yang didekati jepitan-jepitan itu.'],
        ['Taksiran dalam dan taksiran luar mendekati π dengan kecepatan yang sama.', 'Untuk n besar, galat taksiran luar kira-kira dua kali galat taksiran dalam (panel angka sim memperlihatkannya), sehingga titik tengah jepitan bukan tebakan terbaik; rata-rata berbobot lebih baik.'],
      ],
    },
    realWorld: {
      en: [
        'Computer graphics draw every circle as a polygon with many short sides; zoom in far enough on a drawn circle and you can sometimes see the corners.',
        'Engineers calculate the length of a curved road or pipe by adding up many short straight segments, exactly the inscribed-polygon idea.',
        'GPS apps measure the distance you ran by joining your position samples with straight lines, so they slightly underestimate a curvy route, just as the inner polygon does.',
        'The circumference of a wheel or a tin can is still worked out as π times the diameter, using the value this method pins down.',
      ],
      id: [
        'Grafika komputer menggambar setiap lingkaran sebagai poligon dengan banyak sisi pendek; perbesar cukup jauh dan kadang sudut-sudutnya terlihat.',
        'Insinyur menghitung panjang jalan atau pipa yang melengkung dengan menjumlahkan banyak ruas lurus pendek, persis gagasan poligon dalam.',
        'Aplikasi GPS mengukur jarak lari dengan menyambung titik-titik posisi dengan garis lurus, sehingga sedikit menaksir rendah rute yang berkelok, seperti poligon dalam.',
        'Keliling roda atau kaleng tetap dihitung sebagai π kali diameter, memakai nilai yang dipastikan oleh metode ini.',
      ],
    },
    questions: {
      en: [
        { q: 'With n = 6 the sim reports an inner estimate of exactly 3. Explain this without any trigonometry.', a: 'A regular hexagon inscribed in a circle of radius 1 is made of six equilateral triangles with side 1, so each side of the hexagon is 1 and its perimeter is 6. Half the perimeter is 3, which is the estimate of π.' },
        { q: 'At n = 6 the bracket is 3.000 to 3.464, a width of about 0.46. Roughly how wide should the bracket be at n = 12 and at n = 24?', a: 'Each doubling cuts the width to about a quarter: roughly 0.11 at n = 12 and 0.03 at n = 24. The sim gives 3.106 to 3.215 (width 0.11) and 3.1326 to 3.1597 (width 0.027), close to the prediction.' },
        { q: 'A student says the outer polygon is unnecessary because the inner one already gets closer and closer to π. What does the outer polygon add?', a: 'Without it you only know that π is bigger than your estimate; you have no idea how much bigger. The outer polygon gives an upper bound, so the two together tell you exactly how many digits are already certain.' },
      ],
      id: [
        { q: 'Dengan n = 6 sim melaporkan taksiran dalam tepat 3. Jelaskan tanpa trigonometri.', a: 'Segi enam beraturan di dalam lingkaran berjari-jari 1 tersusun dari enam segitiga sama sisi dengan sisi 1, sehingga setiap sisi segi enam panjangnya 1 dan kelilingnya 6. Setengah kelilingnya 3, itulah taksiran π.' },
        { q: 'Pada n = 6 jepitannya 3,000 sampai 3,464, lebarnya sekitar 0,46. Kira-kira berapa lebar jepitan pada n = 12 dan n = 24?', a: 'Setiap penggandaan memangkas lebar menjadi sekitar seperempat: kira-kira 0,11 pada n = 12 dan 0,03 pada n = 24. Sim memberi 3,106 sampai 3,215 (lebar 0,11) dan 3,1326 sampai 3,1597 (lebar 0,027), dekat dengan prediksi.' },
        { q: 'Seorang siswa berkata poligon luar tidak perlu karena poligon dalam sudah makin dekat ke π. Apa yang ditambahkan poligon luar?', a: 'Tanpa poligon luar kita hanya tahu π lebih besar dari taksiran kita, tanpa tahu seberapa besar. Poligon luar memberi batas atas, sehingga keduanya bersama-sama memberi tahu persis berapa digit yang sudah pasti.' },
      ],
    },
  },
};
