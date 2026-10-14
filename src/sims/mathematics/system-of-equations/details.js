// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Solve a 2×2 system by inspection of its graph.',
      'Recognize the three solution cases from the slopes and intercepts.',
      'Connect the algebraic determinant to "lines parallel?" geometrically.',
    ],
    id: [
      'Menyelesaikan sistem 2×2 dengan inspeksi grafik.',
      'Mengenali tiga kasus solusi dari kemiringan dan titik potong.',
      'Menghubungkan determinan aljabar dengan "apakah sejajar?" secara geometris.',
    ],
  },  tryThis: {
    en: [
      'Two lines crossing — one unique solution (read off the intersection).',
      'Same slope, different intercept — parallel, no solution.',
      'Same slope AND same intercept — overlapping; infinite solutions.',
    ],
    id: [
      'Dua garis bersilang — satu solusi unik.',
      'Kemiringan sama, titik potong berbeda — sejajar, tanpa solusi.',
      'Kemiringan dan titik potong sama — bertumpang, tak hingga solusi.',
    ],
  },

  // "Learn" section: the mathematics behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'A linear equation in two variables, such as y = 2x + 1, has infinitely many solutions: every pair (x, y) that makes it true. If you plot all of them you get a straight line. A system of two linear equations asks for the pairs (x, y) that make both equations true at the same time. On the graph, that means a point that lies on both lines, so solving the system is the same as finding where the lines meet.',
        'The simulation writes each line in slope-intercept form, y = mx + b. The slope m says how steep the line is: m = 2 means y rises 2 for every 1 step in x, and a negative m means the line goes down to the right. The intercept b is where the line crosses the y-axis. The sliders change m and b for each line, and you can also grab the handle on a line and drag it; dragging turns the line about its y-intercept, so it changes the slope but not b.',
        'Two different lines can meet at most once, and the sim computes that point by setting the right-hand sides equal: m1·x + b1 = m2·x + b2, so x = (b2 − b1) / (m1 − m2) and y follows from either equation. The formula divides by m1 − m2, which is exactly the sign that something special happens when the slopes are equal. Equal slopes with different intercepts give parallel lines that never meet: no solution. Equal slopes and equal intercepts mean the two equations describe the same line, so every point on it is a solution: infinitely many. The sim labels each case under the equations.',
        'The sim keeps things simple in a few ways. It only shows lines that can be written as y = mx + b, so a vertical line like x = 4 cannot be made. The window runs from x = −10 to 10 and y = −8 to 8, so an intersection point can be off screen even though it exists. Slopes are set in steps of 0.05, so "parallel" means the two slopes are set to exactly the same slider value; two slopes that differ by a hair still cross, just very far away.',
      ],
      id: [
        'Persamaan linear dua variabel, misalnya y = 2x + 1, memiliki tak hingga banyak penyelesaian: setiap pasangan (x, y) yang membuatnya benar. Jika semua pasangan itu digambar, hasilnya adalah sebuah garis lurus. Sistem dua persamaan linear menanyakan pasangan (x, y) yang membuat kedua persamaan benar sekaligus. Pada grafik, itu berarti sebuah titik yang terletak pada kedua garis, sehingga menyelesaikan sistem sama dengan mencari tempat kedua garis bertemu.',
        'Simulasi ini menuliskan tiap garis dalam bentuk kemiringan-titik potong, y = mx + b. Kemiringan m menyatakan seberapa curam garis: m = 2 berarti y naik 2 untuk setiap 1 langkah x, dan m negatif berarti garis turun ke kanan. Titik potong b adalah tempat garis memotong sumbu y. Slider mengubah m dan b tiap garis, dan kamu juga bisa menyeret pegangan pada garis; menyeret memutar garis di sekitar titik potong sumbu y-nya, jadi kemiringan berubah tetapi b tetap.',
        'Dua garis yang berbeda paling banyak bertemu sekali, dan sim menghitung titik itu dengan menyamakan ruas kanan: m1·x + b1 = m2·x + b2, sehingga x = (b2 − b1) / (m1 − m2) dan y diperoleh dari salah satu persamaan. Rumus itu membagi dengan m1 − m2, dan itulah pertanda bahwa sesuatu yang istimewa terjadi ketika kemiringannya sama. Kemiringan sama dengan titik potong berbeda menghasilkan garis sejajar yang tidak pernah bertemu: tidak ada solusi. Kemiringan dan titik potong yang sama berarti kedua persamaan menggambarkan garis yang sama, sehingga setiap titik di garis itu adalah solusi: tak hingga banyak. Sim menuliskan kasus yang terjadi di bawah persamaan.',
        'Sim ini menyederhanakan beberapa hal. Ia hanya menampilkan garis yang bisa ditulis sebagai y = mx + b, jadi garis vertikal seperti x = 4 tidak bisa dibuat. Jendela grafik hanya mencakup x dari −10 sampai 10 dan y dari −8 sampai 8, sehingga titik potong bisa berada di luar layar meskipun ada. Kemiringan diatur dalam langkah 0,05, jadi "sejajar" berarti kedua kemiringan diatur ke nilai slider yang persis sama; dua kemiringan yang berbeda sedikit saja tetap berpotongan, hanya sangat jauh.',
      ],
    },
    figure: {
      caption: {
        en: 'Each line is the set of all (x, y) pairs that satisfy its equation. The one point on both lines, here (2, 3), satisfies both equations, so it is the solution of the system.',
        id: 'Setiap garis adalah himpunan semua pasangan (x, y) yang memenuhi persamaannya. Satu-satunya titik yang ada pada kedua garis, di sini (2, 3), memenuhi kedua persamaan, jadi itulah solusi sistem.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Two lines crossing at the solution', 'Dua garis berpotongan di titik solusi')}">
  <style>text{font:12px system-ui,sans-serif;fill:currentColor}.ax{stroke:currentColor;stroke-width:1.2;opacity:.6}.g{stroke:currentColor;stroke-width:.6;opacity:.15}.d{stroke:currentColor;stroke-width:1;stroke-dasharray:3 3;opacity:.6}</style>
  <line x1="30" y1="50" x2="330" y2="50" class="g"/><line x1="30" y1="90" x2="330" y2="90" class="g"/><line x1="30" y1="130" x2="330" y2="130" class="g"/><line x1="30" y1="210" x2="330" y2="210" class="g"/>
  <line x1="70" y1="20" x2="70" y2="230" class="g"/><line x1="110" y1="20" x2="110" y2="230" class="g"/><line x1="230" y1="20" x2="230" y2="230" class="g"/><line x1="270" y1="20" x2="270" y2="230" class="g"/><line x1="310" y1="20" x2="310" y2="230" class="g"/>
  <line x1="30" y1="170" x2="340" y2="170" class="ax" marker-end="url(#a)"/>
  <line x1="150" y1="230" x2="150" y2="14" class="ax" marker-end="url(#a)"/>
  <text x="330" y="186">x</text>
  <text x="156" y="24">y</text>
  <line x1="30" y1="190" x2="330" y2="40" stroke="#3b82f6" stroke-width="2.5"/>
  <text x="246" y="52" fill="#3b82f6">y = 0.5x + 2</text>
  <line x1="110" y1="30" x2="310" y2="230" stroke="#8b5cf6" stroke-width="2.5"/>
  <text x="248" y="222" fill="#8b5cf6">y = −x + 5</text>
  <line x1="190" y1="110" x2="190" y2="170" class="d"/>
  <line x1="190" y1="110" x2="150" y2="110" class="d"/>
  <text x="186" y="186">2</text>
  <text x="138" y="114">3</text>
  <circle cx="190" cy="110" r="6" fill="#f59e0b" stroke="currentColor" stroke-width="1.5"/>
  <text x="200" y="104" fill="#f59e0b">(2, 3)</text>
  <text x="34" y="234" opacity=".8">${L('solution = where both lines are true', 'solusi = tempat kedua garis benar')}</text>
  <defs><marker id="a" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="context-stroke"/></marker></defs>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'A solution of a system is a pair (x, y) that satisfies every equation at once; on the graph it is a point on every line.',
        'Two lines with different slopes cross exactly once, so the system has exactly one solution.',
        'Same slope but different intercepts means parallel lines and no solution.',
        'Same slope and same intercept means the equations describe one line, so there are infinitely many solutions.',
        'The intersection is found by setting the two expressions for y equal: m1·x + b1 = m2·x + b2.',
      ],
      id: [
        'Solusi sebuah sistem adalah pasangan (x, y) yang memenuhi semua persamaan sekaligus; pada grafik, itu adalah titik yang terletak pada semua garis.',
        'Dua garis dengan kemiringan berbeda berpotongan tepat sekali, jadi sistemnya memiliki tepat satu solusi.',
        'Kemiringan sama tetapi titik potong berbeda berarti garis sejajar dan tidak ada solusi.',
        'Kemiringan dan titik potong sama berarti kedua persamaan menggambarkan satu garis, jadi ada tak hingga banyak solusi.',
        'Titik potong dicari dengan menyamakan kedua ekspresi untuk y: m1·x + b1 = m2·x + b2.',
      ],
    },
    vocabulary: {
      en: [
        ['Linear equation', 'An equation whose graph is a straight line, such as y = mx + b.'],
        ['System of equations', 'Two or more equations that must be true at the same time.'],
        ['Slope (m)', 'How much y changes for each unit increase in x; the steepness of the line.'],
        ['y-intercept (b)', 'The value of y where the line crosses the y-axis, at x = 0.'],
        ['Intersection', 'The point where two lines cross; its coordinates solve the system.'],
        ['Parallel lines', 'Lines with the same slope but different intercepts; they never meet.'],
        ['Consistent / inconsistent', 'A system with at least one solution is consistent; one with no solution is inconsistent.'],
      ],
      id: [
        ['Persamaan linear', 'Persamaan yang grafiknya berupa garis lurus, misalnya y = mx + b.'],
        ['Sistem persamaan', 'Dua atau lebih persamaan yang harus benar pada saat yang sama.'],
        ['Kemiringan (m)', 'Seberapa besar y berubah untuk setiap kenaikan x sebesar satu satuan; kecuraman garis.'],
        ['Titik potong sumbu y (b)', 'Nilai y saat garis memotong sumbu y, yaitu ketika x = 0.'],
        ['Titik potong garis', 'Titik tempat dua garis bersilangan; koordinatnya adalah solusi sistem.'],
        ['Garis sejajar', 'Garis dengan kemiringan sama tetapi titik potong berbeda; keduanya tidak pernah bertemu.'],
        ['Konsisten / tidak konsisten', 'Sistem dengan sedikitnya satu solusi disebut konsisten; sistem tanpa solusi disebut tidak konsisten.'],
      ],
    },
    misconceptions: {
      en: [
        ['A system of two equations always has one answer.', 'Only when the slopes differ. Equal slopes give either no solution (parallel) or infinitely many (same line). The sim shows all three cases.'],
        ['If the lines do not cross on the screen, there is no solution.', 'The screen only shows a window. Two lines with slopes 1.00 and 1.05 cross, but far outside the window. Lines have no solution only if their slopes are exactly equal.'],
        ['Steeper lines give bigger solutions.', 'The solution depends on both lines together. Changing one line\'s slope moves the intersection, but which way depends on the other line too.'],
        ['The intersection point is where the lines cross the axes.', 'The intercepts are where each line meets an axis. The solution is where the two lines meet each other, which is usually somewhere else.'],
      ],
      id: [
        ['Sistem dua persamaan selalu punya satu jawaban.', 'Hanya jika kemiringannya berbeda. Kemiringan yang sama memberi tanpa solusi (sejajar) atau tak hingga banyak solusi (garis yang sama). Sim menunjukkan ketiga kasus itu.'],
        ['Jika garis tidak berpotongan di layar, berarti tidak ada solusi.', 'Layar hanya menampilkan sebagian bidang. Dua garis dengan kemiringan 1,00 dan 1,05 tetap berpotongan, tetapi jauh di luar jendela. Garis tidak punya solusi hanya jika kemiringannya persis sama.'],
        ['Garis yang lebih curam memberi solusi yang lebih besar.', 'Solusi bergantung pada kedua garis bersama-sama. Mengubah kemiringan satu garis memang menggeser titik potong, tetapi arahnya bergantung pada garis yang lain juga.'],
        ['Titik potong sistem adalah tempat garis memotong sumbu.', 'Titik potong sumbu adalah tempat tiap garis bertemu sumbu. Solusi sistem adalah tempat kedua garis bertemu satu sama lain, yang biasanya di tempat lain.'],
      ],
    },
    realWorld: {
      en: [
        'Break-even analysis: a cost line (fixed costs plus cost per item) and a revenue line (price per item) cross at the number of items where a business stops losing money.',
        'Choosing a phone plan: a plan with a high monthly fee but cheap data and a plan with a low fee but expensive data are two lines; their intersection is the usage where both cost the same.',
        'Two cars travelling on the same road from different starting points at different constant speeds meet where their distance-time lines cross.',
        'GPS receivers and surveyors solve systems of equations (with more unknowns) to pin down a position from several distance measurements.',
      ],
      id: [
        'Analisis titik impas: garis biaya (biaya tetap ditambah biaya per barang) dan garis pendapatan (harga per barang) berpotongan pada jumlah barang saat usaha berhenti merugi.',
        'Memilih paket data: paket dengan biaya bulanan tinggi tetapi kuota murah dan paket dengan biaya rendah tetapi kuota mahal adalah dua garis; perpotongannya adalah pemakaian saat keduanya berbiaya sama.',
        'Dua mobil yang melaju di jalan yang sama dari titik awal berbeda dengan kecepatan tetap yang berbeda akan bertemu di tempat garis jarak-waktunya berpotongan.',
        'Penerima GPS dan juru ukur menyelesaikan sistem persamaan (dengan lebih banyak variabel) untuk menentukan posisi dari beberapa pengukuran jarak.',
      ],
    },
    questions: {
      en: [
        { q: 'Line 1 is y = 2x − 1 and Line 2 is y = −x + 5. Where do they cross?', a: 'Set 2x − 1 = −x + 5, so 3x = 6 and x = 2. Then y = 2(2) − 1 = 3. The solution is (2, 3). Check in Line 2: −2 + 5 = 3.' },
        { q: 'You set both slopes to 0.50 and the intercepts to 1 and −1. The sim says "no solution". Why does changing an intercept not help?', a: 'Changing an intercept slides a line up or down without tilting it. Two lines with the same slope stay the same distance apart everywhere, so they never meet. Only changing a slope can make them cross.' },
        { q: 'With the "Same line" preset the sim says infinitely many solutions. Name two of them.', a: 'The preset is y = x + 2 for both lines, so any point on that line works, for example (0, 2) and (1, 3). Both equations are the same, so every point that satisfies one satisfies the other.' },
      ],
      id: [
        { q: 'Garis 1 adalah y = 2x − 1 dan Garis 2 adalah y = −x + 5. Di mana keduanya berpotongan?', a: 'Samakan 2x − 1 = −x + 5, sehingga 3x = 6 dan x = 2. Lalu y = 2(2) − 1 = 3. Solusinya (2, 3). Periksa di Garis 2: −2 + 5 = 3.' },
        { q: 'Kamu mengatur kedua kemiringan ke 0,50 dan titik potongnya ke 1 dan −1. Sim menulis "no solution". Mengapa mengubah titik potong tidak membantu?', a: 'Mengubah titik potong menggeser garis ke atas atau ke bawah tanpa memiringkannya. Dua garis dengan kemiringan sama berjarak tetap di mana-mana, jadi tidak pernah bertemu. Hanya mengubah kemiringan yang bisa membuat keduanya berpotongan.' },
        { q: 'Dengan preset "Same line" sim menyatakan tak hingga banyak solusi. Sebutkan dua di antaranya.', a: 'Preset itu memberi y = x + 2 untuk kedua garis, jadi semua titik pada garis itu memenuhi, misalnya (0, 2) dan (1, 3). Kedua persamaan sama, sehingga setiap titik yang memenuhi satu persamaan pasti memenuhi yang lain.' },
      ],
    },
  },
};
