// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Recognize self-similarity at multiple scales.',
      'See how depth controls visual complexity exponentially.',
      'Connect a recursive function to its visual output.',
    ],
    id: [
      'Mengenali kemiripan diri pada banyak skala.',
      'Melihat bagaimana kedalaman mengendalikan kompleksitas visual secara eksponensial.',
      'Menghubungkan fungsi rekursif dengan output visualnya.',
    ],
  },
  tryThis: {
    en: [
      'Set depth = 0, then watch how each step adds detail.',
      'Switch to a fractal tree and bend the branch angle.',
      'Predict how many triangles appear at depth 6.',
    ],
    id: [
      'Atur kedalaman = 0, lalu amati bagaimana tiap langkah menambah detail.',
      'Beralih ke pohon fraktal dan ubah sudut cabang.',
      'Tebak banyak segitiga pada kedalaman 6.',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'A fractal is a shape made of smaller copies of itself. Zoom in on one corner of the Sierpinski triangle and you find the whole triangle again, and again inside that. This property is called self-similarity. Fractals are drawn with recursion: a set of instructions that includes the instruction "now do the same thing to each smaller part". Every recursive rule needs a stopping point, called the base case, otherwise it would go on forever. In the simulation the base case is the depth slider: at depth 0 the rule is applied zero times and you see only the starting shape.',
        'Each fractal here has its own rule. The Sierpinski triangle replaces a triangle by three half-size triangles in its corners, so the number of triangles triples at every level: 1, 3, 9, 27 and so on. The Koch curve replaces each straight segment by four segments one third as long, bent into a bump, so the snowflake has 3 segments at depth 0 and four times as many at each step. The fractal tree draws a trunk, then grows two branches from its tip, each turned by the branch angle and shortened by the length factor, and repeats from every branch tip. The Cantor set keeps only the left and right thirds of a bar, so the number of pieces doubles while each piece shrinks to a third.',
        'The depth slider is the number of times the rule is applied, and the Pieces counter shows how quickly the count grows. Because each level multiplies the count by a fixed number, the growth is exponential: a few extra steps turn a handful of shapes into thousands. The angle and length-factor sliders only affect the tree. A small angle gives a narrow, upright tree; a large angle spreads it flat; a length factor near 0.85 makes the branches shrink so slowly that the tree looks dense and bushy, while a factor near 0.4 makes it fizzle out quickly.',
        'The sim stops at depth 8, and for good reason. Beyond that the pieces become smaller than a screen pixel, and the number of pieces grows so fast that the computer would be drawing millions of shapes. A mathematical fractal has infinite depth and infinitely fine detail, so what you see is always an approximation. One surprising fact survives even in the approximation: the Koch snowflake\'s outline gets longer at every step without limit, while the area it encloses stays finite, because the bumps keep getting smaller.',
      ],
      id: [
        'Fraktal adalah bentuk yang tersusun dari salinan-salinan kecil dirinya sendiri. Perbesar satu sudut segitiga Sierpinski dan kamu menemukan seluruh segitiga itu lagi, dan lagi di dalamnya. Sifat ini disebut kemiripan diri. Fraktal digambar dengan rekursi: serangkaian perintah yang memuat perintah "sekarang lakukan hal yang sama pada tiap bagian yang lebih kecil". Setiap aturan rekursif butuh titik henti, yang disebut kasus dasar, karena jika tidak ia akan berjalan selamanya. Dalam simulasi, kasus dasarnya adalah slider kedalaman: pada kedalaman 0 aturan diterapkan nol kali dan kamu hanya melihat bentuk awal.',
        'Setiap fraktal di sini punya aturannya sendiri. Segitiga Sierpinski mengganti sebuah segitiga dengan tiga segitiga setengah ukuran di sudut-sudutnya, sehingga jumlah segitiga menjadi tiga kali lipat di setiap tingkat: 1, 3, 9, 27, dan seterusnya. Kurva Koch mengganti setiap ruas lurus dengan empat ruas sepertiga panjangnya yang ditekuk menjadi tonjolan, sehingga kepingan salju punya 3 ruas pada kedalaman 0 dan empat kali lipatnya di setiap langkah. Pohon fraktal menggambar batang, lalu menumbuhkan dua cabang dari ujungnya, masing-masing diputar sebesar sudut cabang dan diperpendek dengan faktor panjang, dan mengulanginya dari setiap ujung cabang. Himpunan Cantor hanya menyimpan sepertiga kiri dan kanan sebuah batang, sehingga jumlah potongan berlipat dua sementara setiap potongan menyusut menjadi sepertiga.',
        'Slider kedalaman adalah berapa kali aturan diterapkan, dan penghitung Pieces menunjukkan seberapa cepat jumlahnya bertambah. Karena setiap tingkat mengalikan jumlah dengan bilangan tetap, pertumbuhannya eksponensial: beberapa langkah tambahan mengubah segelintir bentuk menjadi ribuan. Slider sudut dan faktor panjang hanya memengaruhi pohon. Sudut kecil memberi pohon sempit dan tegak; sudut besar membuatnya melebar datar; faktor panjang mendekati 0,85 membuat cabang menyusut begitu lambat sehingga pohon tampak rapat dan rimbun, sedangkan faktor mendekati 0,4 membuatnya cepat menghilang.',
        'Simulasi berhenti pada kedalaman 8, dan ada alasannya. Lebih dari itu potongannya menjadi lebih kecil dari satu piksel layar, dan jumlahnya bertambah begitu cepat sehingga komputer harus menggambar jutaan bentuk. Fraktal matematis punya kedalaman tak hingga dan detail yang tak hingga halusnya, sehingga yang kamu lihat selalu hampiran. Satu fakta mengejutkan tetap berlaku bahkan pada hampiran ini: garis tepi kepingan salju Koch bertambah panjang di setiap langkah tanpa batas, sementara luas yang dilingkupinya tetap terbatas, karena tonjolannya terus mengecil.',
      ],
    },
    figure: {
      caption: {
        en: 'Top: the Sierpinski rule applied 0, 1 and 2 times; each level replaces every triangle by three half-size copies, so the count goes 1, 3, 9. Bottom: the Koch rule replaces one segment by four segments one third as long, so the line gets longer by a third at every step.',
        id: 'Atas: aturan Sierpinski diterapkan 0, 1, dan 2 kali; setiap tingkat mengganti tiap segitiga dengan tiga salinan setengah ukuran, sehingga jumlahnya 1, 3, 9. Bawah: aturan Koch mengganti satu ruas dengan empat ruas sepertiga panjangnya, sehingga garis bertambah panjang sepertiga di setiap langkah.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        const mid = (a, b) => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
        const tri = (p1, p2, p3, d) => {
          if (d === 0) return `<path d="M${p1[0]} ${p1[1]} L${p2[0]} ${p2[1]} L${p3[0]} ${p3[1]} Z" fill="#8b5cf6"/>`;
          const a = mid(p1, p2), b = mid(p2, p3), c = mid(p3, p1);
          return tri(p1, a, c, d - 1) + tri(a, p2, b, d - 1) + tri(c, b, p3, d - 1);
        };
        const sier = (x, d) => tri([x, 116], [x + 50, 116 - 86.6], [x + 100, 116], d);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Sierpinski and Koch construction rules', 'Aturan konstruksi Sierpinski dan Koch')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.t{font-weight:700}.s{font-size:10px;opacity:.75}.k{fill:none;stroke:currentColor;stroke-width:2}</style>
  ${sier(10, 0)}${sier(130, 1)}${sier(250, 2)}
  <text x="60" y="132" text-anchor="middle" class="t">${L('depth 0', 'kedalaman 0')}</text>
  <text x="180" y="132" text-anchor="middle" class="t">${L('depth 1', 'kedalaman 1')}</text>
  <text x="300" y="132" text-anchor="middle" class="t">${L('depth 2', 'kedalaman 2')}</text>
  <text x="60" y="146" text-anchor="middle" class="s">${L('1 triangle', '1 segitiga')}</text>
  <text x="180" y="146" text-anchor="middle" class="s">${L('3 triangles', '3 segitiga')}</text>
  <text x="300" y="146" text-anchor="middle" class="s">${L('9 triangles', '9 segitiga')}</text>
  <path d="M20 210 L140 210" class="k"/>
  <text x="80" y="228" text-anchor="middle" class="s">${L('1 segment, length 1', '1 ruas, panjang 1')}</text>
  <path d="M158 210 L186 210" stroke="currentColor" stroke-width="1.5" fill="none" marker-end="url(#ar)"/>
  <path d="M200 210 L240 210 L260 175.4 L280 210 L320 210" class="k" stroke="#10b981"/>
  <text x="260" y="228" text-anchor="middle" class="s">${L('4 segments, length 4/3', '4 ruas, panjang 4/3')}</text>
  <text x="20" y="178" class="t">${L('Koch rule', 'Aturan Koch')}</text>
  <defs><marker id="ar" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="context-stroke"/></marker></defs>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'A fractal is self-similar: its parts are smaller copies of the whole.',
        'Recursion means applying the same rule to every smaller part, and the depth slider is the base case that stops it.',
        'Each level multiplies the number of pieces by a fixed factor (3 for Sierpinski, 4 for Koch, 2 for the tree and Cantor set), so the count grows exponentially.',
        'The Koch snowflake has an outline that grows without limit while enclosing a finite area.',
        'What the screen shows is always a finite approximation; the true fractal has infinite detail.',
      ],
      id: [
        'Fraktal bersifat mirip diri: bagian-bagiannya adalah salinan kecil dari keseluruhannya.',
        'Rekursi berarti menerapkan aturan yang sama pada setiap bagian yang lebih kecil, dan slider kedalaman adalah kasus dasar yang menghentikannya.',
        'Setiap tingkat mengalikan jumlah potongan dengan faktor tetap (3 untuk Sierpinski, 4 untuk Koch, 2 untuk pohon dan himpunan Cantor), sehingga jumlahnya tumbuh eksponensial.',
        'Kepingan salju Koch punya garis tepi yang bertambah tanpa batas sambil melingkupi luas yang terbatas.',
        'Yang ditampilkan layar selalu hampiran terbatas; fraktal sesungguhnya memiliki detail tak hingga.',
      ],
    },
    vocabulary: {
      en: [
        ['Fractal', 'A shape that shows similar detail at every scale, built from smaller copies of itself.'],
        ['Self-similarity', 'The property that a part of a shape looks like the whole shape, only smaller.'],
        ['Recursion', 'Defining a process in terms of itself: a function that calls itself on smaller pieces.'],
        ['Base case', 'The condition that stops a recursion; here, reaching depth 0.'],
        ['Depth', 'How many times the replacement rule has been applied.'],
        ['Exponential growth', 'Growth by a fixed multiplier at each step, such as 1, 3, 9, 27.'],
        ['Koch curve', 'The curve made by repeatedly replacing each segment\'s middle third with two sides of a small triangle.'],
        ['Cantor set', 'What remains of a bar after repeatedly removing the middle third of every piece.'],
      ],
      id: [
        ['Fraktal', 'Bentuk yang memperlihatkan detail serupa pada setiap skala, tersusun dari salinan kecil dirinya.'],
        ['Kemiripan diri', 'Sifat bahwa sebagian bentuk tampak seperti bentuk keseluruhan, hanya lebih kecil.'],
        ['Rekursi', 'Mendefinisikan suatu proses dengan dirinya sendiri: fungsi yang memanggil dirinya pada bagian yang lebih kecil.'],
        ['Kasus dasar', 'Syarat yang menghentikan rekursi; di sini, mencapai kedalaman 0.'],
        ['Kedalaman', 'Berapa kali aturan penggantian sudah diterapkan.'],
        ['Pertumbuhan eksponensial', 'Pertumbuhan dengan pengali tetap di setiap langkah, seperti 1, 3, 9, 27.'],
        ['Kurva Koch', 'Kurva yang dibuat dengan berulang kali mengganti sepertiga tengah tiap ruas dengan dua sisi segitiga kecil.'],
        ['Himpunan Cantor', 'Sisa sebuah batang setelah sepertiga tengah dari setiap potongan dibuang berulang kali.'],
      ],
    },
    misconceptions: {
      en: [
        ['If you zoom in far enough, a fractal becomes a smooth line or a plain triangle.', 'A true fractal keeps the same detail at every magnification. Only the drawing on screen runs out of detail, because the sim stops at a finite depth and pixels have a finite size.'],
        ['The Koch snowflake must have an infinite area because its outline is infinitely long.', 'Its area is finite: the snowflake always fits inside the circle around the starting triangle. Length and area behave differently because each new bump adds a lot of edge but very little area.'],
        ['Recursion is just a loop that repeats something.', 'A loop repeats the same step; recursion applies the rule to each smaller part, which branches: one triangle becomes three, each of which becomes three more. Without a base case it never ends.'],
        ['Doubling the depth doubles the detail.', 'Going from depth 3 to depth 6 in the Sierpinski triangle multiplies the count by 27 (from 27 to 729), not by 2, because every extra level multiplies by 3.'],
      ],
      id: [
        ['Jika diperbesar cukup jauh, fraktal menjadi garis mulus atau segitiga biasa.', 'Fraktal sejati mempertahankan detail yang sama pada setiap perbesaran. Hanya gambar di layar yang kehabisan detail, karena simulasi berhenti pada kedalaman terbatas dan piksel punya ukuran terbatas.'],
        ['Kepingan salju Koch pasti berluas tak hingga karena garis tepinya tak hingga panjangnya.', 'Luasnya terbatas: kepingan salju selalu muat di dalam lingkaran yang mengelilingi segitiga awal. Panjang dan luas berperilaku berbeda karena setiap tonjolan baru menambah banyak tepi tetapi sangat sedikit luas.'],
        ['Rekursi hanyalah perulangan yang mengulang sesuatu.', 'Perulangan mengulang langkah yang sama; rekursi menerapkan aturan pada setiap bagian yang lebih kecil, sehingga bercabang: satu segitiga menjadi tiga, dan masing-masing menjadi tiga lagi. Tanpa kasus dasar ia tidak pernah berakhir.'],
        ['Menggandakan kedalaman menggandakan detail.', 'Beranjak dari kedalaman 3 ke 6 pada segitiga Sierpinski mengalikan jumlahnya dengan 27 (dari 27 menjadi 729), bukan 2, karena setiap tingkat tambahan mengalikan dengan 3.'],
      ],
    },
    realWorld: {
      en: [
        'Coastlines, river networks, lightning, broccoli and the branching of lungs and blood vessels all show self-similar structure over several scales.',
        'Mobile phones use fractal-shaped antennas, which pack a long conductor into a small space so one antenna can handle several frequency bands.',
        'Video games and films generate mountains, clouds and trees with recursive rules instead of modelling every rock and leaf by hand.',
        'Doctors analyse the fractal branching of blood vessels in the retina to spot early signs of disease.',
      ],
      id: [
        'Garis pantai, jaringan sungai, kilat, brokoli, dan percabangan paru-paru serta pembuluh darah semuanya memperlihatkan struktur mirip diri pada beberapa skala.',
        'Ponsel memakai antena berbentuk fraktal, yang memadatkan konduktor panjang dalam ruang kecil sehingga satu antena bisa melayani beberapa pita frekuensi.',
        'Gim video dan film menghasilkan gunung, awan, dan pohon dengan aturan rekursif, bukan memodelkan tiap batu dan daun secara manual.',
        'Dokter menganalisis percabangan fraktal pembuluh darah di retina untuk menemukan tanda awal penyakit.',
      ],
    },
    questions: {
      en: [
        { q: 'How many small triangles does the Sierpinski triangle have at depth 4? Explain how you worked it out.', a: '81. The count triples at each level: depth 0 has 1, then 3, 9, 27, and 81 at depth 4. In other words, 3 multiplied by itself 4 times.' },
        { q: 'Each Koch step replaces a segment by four segments one third as long. If the starting triangle\'s outline has length 3, what is the length after one step and after two steps? What happens as the depth keeps growing?', a: 'After one step it is 3 times 4/3 = 4; after two steps it is 4 times 4/3, about 5.33. Every step multiplies the length by 4/3, so it keeps growing without any limit, even though the shape stays inside the same small region.' },
        { q: 'Why does the tree stop growing when you set the depth to 3, and what would happen to a recursive program with no such stopping rule?', a: 'Depth is the base case: each branch is drawn with a depth one less than its parent, and when it reaches 0 the rule stops. Without a base case the program would keep calling itself on smaller and smaller branches forever and never finish drawing.' },
      ],
      id: [
        { q: 'Berapa banyak segitiga kecil pada segitiga Sierpinski kedalaman 4? Jelaskan cara menghitungnya.', a: '81. Jumlahnya menjadi tiga kali lipat di setiap tingkat: kedalaman 0 ada 1, lalu 3, 9, 27, dan 81 pada kedalaman 4. Dengan kata lain, 3 dikalikan dirinya sendiri 4 kali.' },
        { q: 'Setiap langkah Koch mengganti satu ruas dengan empat ruas sepertiga panjangnya. Jika garis tepi segitiga awal panjangnya 3, berapa panjangnya setelah satu langkah dan setelah dua langkah? Apa yang terjadi jika kedalaman terus bertambah?', a: 'Setelah satu langkah panjangnya 3 kali 4/3 = 4; setelah dua langkah 4 kali 4/3, sekitar 5,33. Setiap langkah mengalikan panjang dengan 4/3, sehingga terus bertambah tanpa batas, meskipun bentuknya tetap berada di dalam daerah kecil yang sama.' },
        { q: 'Mengapa pohon berhenti tumbuh ketika kedalaman diatur ke 3, dan apa yang terjadi pada program rekursif tanpa aturan henti seperti itu?', a: 'Kedalaman adalah kasus dasar: setiap cabang digambar dengan kedalaman satu lebih kecil dari induknya, dan ketika mencapai 0 aturan berhenti. Tanpa kasus dasar, program akan terus memanggil dirinya pada cabang yang semakin kecil selamanya dan tidak pernah selesai menggambar.' },
      ],
    },
  },
};
