// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Apply a² + b² = c² for any right triangle.',
      'See the theorem as an area equation, not just a number.',
      'Recognize that it fails for non-right triangles.',
    ],
    id: [
      'Menerapkan a² + b² = c² untuk segitiga siku-siku mana pun.',
      'Melihat teorema sebagai persamaan luas, bukan sekadar angka.',
      'Mengenali bahwa rumus ini gagal untuk segitiga bukan siku-siku.',
    ],
  },  tryThis: {
    en: [
      'Make a 3-4-5 triangle — exact integer sides.',
      'Make a 5-12-13 triangle.',
      'Drag the right-angle vertex — the squares deform but always add up.',
    ],
    id: [
      'Buat segitiga 3-4-5 — sisi bilangan bulat.',
      'Buat segitiga 5-12-13.',
      'Geser titik sudut siku-siku — persegi berubah bentuk tapi selalu pas.',
    ],
  },
  // "Learn" section: the mathematics behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'A right triangle has one corner that is a perfect square corner, 90 degrees. The two sides that meet at that corner are called the legs, and the longest side, opposite the right angle, is the hypotenuse. The Pythagorean theorem says: if you draw a square on each side, the area of the square on the hypotenuse is exactly equal to the areas of the two smaller squares added together. In the simulation the yellow triangle has its right angle at the bottom-left, the pink and blue squares sit on the legs, and the green square sits on the hypotenuse.',
        'Drag the red dot at B to change the horizontal leg b, or the red dot at C to change the vertical leg a; both can go from 0.5 to 8 units. The simulation measures the hypotenuse, redraws all three squares, and prints the three areas: the two small areas always add up to the big one. For a = 3 and b = 4 the squares have areas 9 and 16, which add to 25, and 25 is the area of a square with side 5, so the hypotenuse is 5. That is the famous 3-4-5 triangle. The preset buttons load the shapes of the 3-4-5, 5-12-13 and 8-15-17 triangles, shrunk by one and a half times so they fit on the screen, so the numbers shown for 3-4-5 are 2, 2.67 and 3.33; the proportions are the same.',
        'The theorem works in reverse too: if the two small squares add up to the big square, the corner between the legs must be a right angle. This simulation always keeps the corner at A square, so it cannot show what happens for other triangles; for them the two small squares add up to more or less than the big one, and a different rule is needed. The drawing uses unit lengths with no particular unit, so the same picture works for centimetres, metres or kilometres.',
      ],
      id: [
        'Segitiga siku-siku punya satu sudut yang benar-benar siku, 90 derajat. Dua sisi yang bertemu di sudut itu disebut kaki, dan sisi terpanjang, yang berhadapan dengan sudut siku-siku, disebut sisi miring. Teorema Pythagoras berbunyi: jika kamu menggambar persegi pada setiap sisi, luas persegi pada sisi miring tepat sama dengan luas dua persegi yang lebih kecil dijumlahkan. Dalam simulasi, segitiga kuning bersudut siku-siku di kiri bawah, persegi merah muda dan biru berada pada kedua kaki, dan persegi hijau berada pada sisi miring.',
        'Seret titik merah di B untuk mengubah kaki mendatar b, atau titik merah di C untuk mengubah kaki tegak a; keduanya bisa dari 0,5 sampai 8 satuan. Simulasi mengukur sisi miring, menggambar ulang ketiga persegi, dan mencetak ketiga luasnya: dua luas kecil selalu berjumlah sama dengan luas besar. Untuk a = 3 dan b = 4 perseginya berluas 9 dan 16, yang berjumlah 25, dan 25 adalah luas persegi bersisi 5, jadi sisi miringnya 5. Itulah segitiga 3-4-5 yang terkenal. Tombol preset memuat bentuk segitiga 3-4-5, 5-12-13, dan 8-15-17 yang diperkecil satu setengah kali agar muat di layar, sehingga angka yang tampil untuk 3-4-5 adalah 2, 2,67, dan 3,33; perbandingannya tetap sama.',
        'Teorema ini juga berlaku sebaliknya: jika dua persegi kecil berjumlah sama dengan persegi besar, sudut di antara kedua kaki pasti siku-siku. Simulasi ini selalu menjaga sudut di A tetap siku, sehingga tidak bisa menunjukkan apa yang terjadi pada segitiga lain; pada segitiga lain dua persegi kecil berjumlah lebih besar atau lebih kecil dari persegi besar, dan dibutuhkan aturan yang berbeda. Gambar memakai panjang satuan tanpa satuan tertentu, jadi gambar yang sama berlaku untuk sentimeter, meter, atau kilometer.',
      ],
    },
    figure: {
      caption: {
        en: 'A 3-4-5 right triangle with a square on each side. Count the small squares: 9 on the side of length 3, 16 on the side of length 4, and 25 on the hypotenuse. 9 + 16 = 25.',
        id: 'Segitiga siku-siku 3-4-5 dengan persegi pada setiap sisinya. Hitung kotak kecilnya: 9 pada sisi sepanjang 3, 16 pada sisi sepanjang 4, dan 25 pada sisi miring. 9 + 16 = 25.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Squares on the three sides of a right triangle', 'Persegi pada ketiga sisi segitiga siku-siku')}">
  <style>text{font:12px system-ui,sans-serif;fill:currentColor}.g{stroke:currentColor;stroke-width:.8;opacity:.4}.b{font-weight:bold;font-size:14px}</style>
  <rect x="70" y="90" width="60" height="60" fill="#ef4444" fill-opacity=".3" stroke="#ef4444" stroke-width="1.5"/>
  <line x1="90" y1="90" x2="90" y2="150" class="g"/><line x1="110" y1="90" x2="110" y2="150" class="g"/>
  <line x1="70" y1="110" x2="130" y2="110" class="g"/><line x1="70" y1="130" x2="130" y2="130" class="g"/>
  <rect x="130" y="150" width="80" height="80" fill="#3b82f6" fill-opacity=".3" stroke="#3b82f6" stroke-width="1.5"/>
  <line x1="150" y1="150" x2="150" y2="230" class="g"/><line x1="170" y1="150" x2="170" y2="230" class="g"/><line x1="190" y1="150" x2="190" y2="230" class="g"/>
  <line x1="130" y1="170" x2="210" y2="170" class="g"/><line x1="130" y1="190" x2="210" y2="190" class="g"/><line x1="130" y1="210" x2="210" y2="210" class="g"/>
  <path d="M210 150 L130 90 L190 10 L270 70 Z" fill="#10b981" fill-opacity=".3" stroke="#10b981" stroke-width="1.5"/>
  <path d="M130 150 L210 150 L130 90 Z" fill="#f59e0b" fill-opacity=".5" stroke="#f59e0b" stroke-width="1.5"/>
  <path d="M130 140 L140 140 L140 150" fill="none" stroke="currentColor" stroke-width="1.2"/>
  <text x="96" y="124" class="b" fill="#ef4444">9</text>
  <text x="162" y="194" class="b" fill="#3b82f6">16</text>
  <text x="192" y="84" class="b" fill="#10b981">25</text>
  <text x="112" y="124" fill="#ef4444">a = 3</text>
  <text x="152" y="144" fill="#3b82f6">b = 4</text>
  <text x="178" y="112" fill="#f59e0b">c = 5</text>
  <text x="236" y="150" class="b">9 + 16 = 25</text>
  <text x="236" y="170">${L('square on a + square on b', 'persegi pada a + persegi pada b')}</text>
  <text x="236" y="184">${L('= square on c', '= persegi pada c')}</text>
  <text x="236" y="210">${L('so c = 5, because 5 × 5 = 25', 'jadi c = 5, karena 5 × 5 = 25')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'In a right triangle the square on the hypotenuse has the same area as the two squares on the legs put together.',
        'The hypotenuse is always the longest side, because its square must hold both of the smaller squares.',
        'Knowing any two sides of a right triangle lets you work out the third one.',
        'Some right triangles have whole-number sides, such as 3-4-5, 5-12-13 and 8-15-17; most do not.',
        'The rule only works when the angle between the two legs is exactly 90 degrees.',
      ],
      id: [
        'Pada segitiga siku-siku, persegi pada sisi miring luasnya sama dengan dua persegi pada kedua kaki digabungkan.',
        'Sisi miring selalu sisi terpanjang, karena perseginya harus memuat kedua persegi yang lebih kecil.',
        'Mengetahui dua sisi mana pun dari segitiga siku-siku memungkinkanmu menghitung sisi ketiga.',
        'Beberapa segitiga siku-siku bersisi bilangan bulat, misalnya 3-4-5, 5-12-13, dan 8-15-17; kebanyakan tidak.',
        'Aturan ini hanya berlaku jika sudut di antara kedua kaki tepat 90 derajat.',
      ],
    },
    vocabulary: {
      en: [
        ['Right angle', 'A square corner of exactly 90 degrees, marked with a small square in drawings.'],
        ['Right triangle', 'A triangle with one right angle.'],
        ['Legs', 'The two sides that meet at the right angle, called a and b here.'],
        ['Hypotenuse', 'The side opposite the right angle; the longest side, called c here.'],
        ['Area of a square', 'Side length times itself; a square with side 4 has area 16.'],
        ['Square root', 'The number that, multiplied by itself, gives a chosen number; the square root of 25 is 5.'],
        ['Pythagorean triple', 'Three whole numbers that are the sides of a right triangle, such as 3, 4, 5.'],
      ],
      id: [
        ['Sudut siku-siku', 'Sudut siku tepat 90 derajat, ditandai dengan kotak kecil pada gambar.'],
        ['Segitiga siku-siku', 'Segitiga dengan satu sudut siku-siku.'],
        ['Kaki', 'Dua sisi yang bertemu di sudut siku-siku, di sini disebut a dan b.'],
        ['Sisi miring (hipotenusa)', 'Sisi yang berhadapan dengan sudut siku-siku; sisi terpanjang, di sini disebut c.'],
        ['Luas persegi', 'Panjang sisi dikali dirinya sendiri; persegi bersisi 4 berluas 16.'],
        ['Akar kuadrat', 'Bilangan yang jika dikalikan dengan dirinya sendiri menghasilkan bilangan tertentu; akar kuadrat 25 adalah 5.'],
        ['Tripel Pythagoras', 'Tiga bilangan bulat yang menjadi sisi-sisi segitiga siku-siku, misalnya 3, 4, 5.'],
      ],
    },
    misconceptions: {
      en: [
        ['The two legs add up to the hypotenuse.', 'It is the squares (areas) that add up, not the lengths. For 3 and 4 the hypotenuse is 5, not 7; the straight path is always shorter than going around the corner.'],
        ['The rule works for every triangle.', 'Only for right triangles. If the corner is wider than 90 degrees the big square is larger than the two small ones together; if narrower, it is smaller.'],
        ['The hypotenuse is whichever side looks slanted.', 'It is the side opposite the right angle. Turn the triangle so the hypotenuse is flat and it is still the hypotenuse.'],
      ],
      id: [
        ['Kedua kaki dijumlahkan menjadi sisi miring.', 'Yang dijumlahkan adalah perseginya (luas), bukan panjangnya. Untuk 3 dan 4 sisi miringnya 5, bukan 7; jalan lurus selalu lebih pendek daripada memutari sudut.'],
        ['Aturan ini berlaku untuk semua segitiga.', 'Hanya untuk segitiga siku-siku. Jika sudutnya lebih lebar dari 90 derajat, persegi besar lebih luas dari gabungan dua persegi kecil; jika lebih sempit, lebih kecil.'],
        ['Sisi miring adalah sisi yang terlihat miring.', 'Sisi miring adalah sisi yang berhadapan dengan sudut siku-siku. Putar segitiga sampai sisi itu mendatar, ia tetap sisi miring.'],
      ],
    },
    realWorld: {
      en: [
        'Builders check that a wall corner is square by measuring 3 units along one wall, 4 along the other, and making sure the diagonal is exactly 5.',
        'A ladder leaning against a wall forms a right triangle with the ground, so you can work out how high it reaches from its length and its distance from the wall.',
        'Television and phone screens are sold by their diagonal, which is the hypotenuse of the screen\'s width and height.',
        'Map apps find the straight-line distance between two places from how far apart they are east-west and north-south.',
      ],
      id: [
        'Tukang bangunan memeriksa sudut dinding siku dengan mengukur 3 satuan di satu dinding, 4 di dinding lain, dan memastikan diagonalnya tepat 5.',
        'Tangga yang disandarkan ke dinding membentuk segitiga siku-siku dengan tanah, jadi tingginya bisa dihitung dari panjang tangga dan jaraknya dari dinding.',
        'Layar televisi dan ponsel dijual berdasarkan ukuran diagonalnya, yaitu sisi miring dari lebar dan tinggi layar.',
        'Aplikasi peta menemukan jarak garis lurus antara dua tempat dari seberapa jauh keduanya terpisah arah timur-barat dan utara-selatan.',
      ],
    },
    questions: {
      en: [
        { q: 'Set a = 6 and b = 8. What area does each square have, and how long is the hypotenuse?', a: 'The squares on the legs have areas 36 and 64. Together that is 100, so the square on the hypotenuse has area 100 and its side is 10. This is the 3-4-5 triangle doubled.' },
        { q: 'A right triangle has hypotenuse 13 and one leg 5. How long is the other leg?', a: 'The big square has area 169 and the known small square has area 25. The other small square must have area 169 − 25 = 144, and 12 × 12 = 144, so the other leg is 12.' },
        { q: 'Drag C until a = 4 while b stays 4. Is the hypotenuse exactly 6? Explain using the squares.', a: 'No. The two small squares have area 16 each, 32 in total, so the hypotenuse squared is 32. Since 5 × 5 = 25 and 6 × 6 = 36, the hypotenuse is between 5 and 6, about 5.66. The simulation shows c = 5.66.' },
      ],
      id: [
        { q: 'Atur a = 6 dan b = 8. Berapa luas setiap persegi, dan berapa panjang sisi miringnya?', a: 'Persegi pada kedua kaki berluas 36 dan 64. Jumlahnya 100, jadi persegi pada sisi miring berluas 100 dan sisinya 10. Ini segitiga 3-4-5 yang digandakan.' },
        { q: 'Sebuah segitiga siku-siku bersisi miring 13 dan salah satu kakinya 5. Berapa panjang kaki yang lain?', a: 'Persegi besar berluas 169 dan persegi kecil yang diketahui berluas 25. Persegi kecil lainnya harus berluas 169 − 25 = 144, dan 12 × 12 = 144, jadi kaki yang lain adalah 12.' },
        { q: 'Seret C sampai a = 4 sementara b tetap 4. Apakah sisi miringnya tepat 6? Jelaskan dengan persegi.', a: 'Tidak. Kedua persegi kecil berluas 16 masing-masing, total 32, jadi kuadrat sisi miringnya 32. Karena 5 × 5 = 25 dan 6 × 6 = 36, sisi miringnya antara 5 dan 6, sekitar 5,66. Simulasi menunjukkan c = 5,66.' },
      ],
    },
  },
};
