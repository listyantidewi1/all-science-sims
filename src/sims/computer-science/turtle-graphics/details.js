// Long-form text for the sim page (objectives, try-this prompts and the Learn block).
export default {
  objectives: {
    en: [
      'Write and run Python turtle programs that use sequence, for loops, nested loops and functions with parameters to draw shapes, and predict a drawing before running it.',
      'Explain why a turtle drawing a regular polygon with n sides turns by the exterior angle 360° / n, and why the total turning of a closed path is a whole number of full turns (a square 360°, a five-pointed star 720°).',
      'Trace a turtle program line by line, use coordinates with goto(x, y), and find logic errors in a drawing and runtime errors from Python\'s messages.',
    ],
    id: [
      'Menulis dan menjalankan program turtle Python yang memakai runtunan, perulangan for, perulangan bersarang, dan fungsi berparameter untuk menggambar bentuk, serta menebak gambarnya sebelum dijalankan.',
      'Menjelaskan mengapa kura-kura yang menggambar segi-n beraturan berbelok sebesar sudut luar 360° / n, dan mengapa total belokan pada lintasan tertutup selalu kelipatan putaran penuh (persegi 360°, bintang lima 720°).',
      'Menelusuri program turtle baris demi baris, memakai koordinat dengan goto(x, y), serta menemukan kesalahan logika pada gambar dan kesalahan saat berjalan (runtime error) dari pesan Python.',
    ],
  },
  tryThis: {
    en: [
      'Program 2 (regular polygon): before each run, predict the turning angle for n = 5, 8 and 12, then change n and check the console and the "total turning" readout. Which number never changes?',
      'Program 3 (find the bug): run it and look at the turn arcs. Change one number so that the turtle draws a closed triangle and the total turning becomes 360°.',
      'Program 5 (the flower of 36 circles): it is slow at real Python speed. Add t.speed(0) after line 3 and run again, then try range(18) with t.right(20). What stays the same?',
      'Make an error on purpose: change t.forward(120) to t.forwad(120), or t.color("green") to t.color("hijau"), press Run and read the last line of the message in the console.',
    ],
    id: [
      'Program 2 (segi-n beraturan): sebelum setiap kali menjalankan, tebak sudut belok untuk n = 5, 8, dan 12, lalu ubah n dan periksa konsol serta penghitung "total belokan". Bilangan mana yang tidak pernah berubah?',
      'Program 3 (cari bug): jalankan dan perhatikan busur belokannya. Ubah satu angka agar kura-kura menggambar segitiga tertutup dan total belokannya menjadi 360°.',
      'Program 5 (bunga 36 lingkaran): pada kecepatan Python asli gambarnya lambat. Tambahkan t.speed(0) setelah baris 3 lalu jalankan lagi, kemudian coba range(18) dengan t.right(20). Apa yang tetap sama?',
      'Buat kesalahan dengan sengaja: ubah t.forward(120) menjadi t.forwad(120), atau t.color("green") menjadi t.color("hijau"), tekan Jalankan, lalu baca baris terakhir pesan di konsol.',
    ],
  },

  learn: {
    background: {
      en: [
        'Turtle graphics come from the Logo language that Seymour Papert and colleagues designed for children in the late 1960s, and Python includes them in its standard library as the turtle module. A turtle has three things: a position (x, y) in a window whose centre is (0, 0), a heading in degrees (0 = east, counted anticlockwise, so 90 = north) and a pen that can be up or down, with a colour and a width. forward() and backward() move it along its heading, left() and right() change only the heading, and goto(x, y) jumps to a point, drawing a straight line when the pen is down.',
        'The geometry follows from walking. To draw a regular polygon with n sides the turtle turns at each corner by the exterior angle 360° / n, not by the interior angle 180° − 360° / n: a square needs left(90), a triangle left(120), a hexagon left(60). Whenever a turtle walks a closed path and ends with its starting heading, its total turning is a whole number of full turns: 360° for any convex polygon, 2 × 360° = 720° for the five-pointed star that turns 144° five times. circle(r) is really a polygon: turtle.py uses 1 + int(min(11 + r/6, 59)) short sides, so circle(60) has 22 chords.',
        'The turtle module does not run in Google Colab, because it needs its own window. In this sim the program runs in minipy, a JavaScript version of the Python taught in SMA, with a turtle module ported from CPython 3.13\'s turtle.py: positions, headings, distances and error messages are the same as in python3 (which is why a square can end at x = -0.00 or 1.4e-14 instead of 0: floating-point rounding). The program is run first and its moves are then animated at the turtle\'s own speed() (1 slowest, 10 fast, 0 fastest) times the speed slider; ×1 is about the speed of real Python. A position such as t.pos() works like the pair it is in python3 (x, y = t.pos(), t.pos()[0], t.pos() == (0, 0)); one small difference remains: isinstance(t.pos(), tuple) gives False here.',
        'Drawing with a turtle is a quick way to practise computational thinking: a loop turns a repeated sequence into one short block (4 × forward-and-turn), nested loops repeat a pattern of patterns, and a function with parameters names a shape once and reuses it, as in the house program. When a drawing looks wrong, the program has a logic error even though Python shows no message: compare the drawing with the plan and fix the line that disagrees.',
      ],
      id: [
        'Grafik turtle berasal dari bahasa Logo yang dirancang Seymour Papert dan rekan-rekannya untuk anak-anak pada akhir 1960-an, dan Python menyediakannya di pustaka standar sebagai modul turtle. Kura-kura punya tiga hal: posisi (x, y) di jendela yang pusatnya (0, 0), arah dalam derajat (0 = timur, dihitung berlawanan arah jarum jam, sehingga 90 = utara), dan pena yang dapat naik atau turun, dengan warna dan ketebalan. forward() dan backward() menggerakkannya menurut arahnya, left() dan right() hanya mengubah arah, dan goto(x, y) melompat ke suatu titik sambil menggambar garis lurus bila penanya turun.',
        'Geometrinya berasal dari berjalan. Untuk menggambar segi-n beraturan, kura-kura berbelok di setiap pojok sebesar sudut luar 360° / n, bukan sudut dalam 180° − 360° / n: persegi memerlukan left(90), segitiga left(120), segi enam left(60). Setiap kali kura-kura menempuh lintasan tertutup dan kembali ke arah semula, total belokannya adalah kelipatan putaran penuh: 360° untuk segi banyak cembung, 2 × 360° = 720° untuk bintang lima yang berbelok 144° lima kali. circle(r) sebenarnya segi banyak: turtle.py memakai 1 + int(min(11 + r/6, 59)) sisi pendek, sehingga circle(60) terdiri atas 22 tali busur.',
        'Modul turtle tidak berjalan di Google Colab, karena memerlukan jendelanya sendiri. Dalam simulasi ini program dijalankan oleh minipy, versi JavaScript dari Python yang diajarkan di SMA, dengan modul turtle yang diporting dari turtle.py CPython 3.13: posisi, arah, jarak, dan pesan error sama dengan python3 (itulah sebabnya persegi bisa berakhir di x = -0.00 atau 1.4e-14, bukan 0: pembulatan bilangan pecahan). Program dijalankan terlebih dahulu, lalu gerakannya dianimasikan dengan speed() milik kura-kura (1 paling lambat, 10 cepat, 0 tercepat) dikalikan penggeser kecepatan; ×1 kira-kira secepat Python asli. Posisi seperti t.pos() berperilaku seperti pasangan (tuple) di python3 (x, y = t.pos(), t.pos()[0], t.pos() == (0, 0)); masih ada satu perbedaan kecil: isinstance(t.pos(), tuple) di sini menghasilkan False.',
        'Menggambar dengan kura-kura adalah cara cepat berlatih berpikir komputasional: perulangan mengubah runtunan yang berulang menjadi satu blok pendek (4 × maju-lalu-belok), perulangan bersarang mengulang pola dari pola, dan fungsi berparameter memberi nama pada sebuah bentuk sekali lalu memakainya lagi, seperti pada program rumah. Bila gambarnya tampak salah, program mengandung kesalahan logika walaupun Python tidak menampilkan pesan apa pun: bandingkan gambar dengan rencananya lalu perbaiki baris yang tidak sesuai.',
      ],
    },
    figure: {
      caption: {
        en: 'A turtle turns by the exterior angle at every corner. Drawing a square it turns left 90° four times, 4 × 90° = 360° (one full turn); drawing a five-pointed star it turns right 144° five times, 5 × 144° = 720° (two full turns; blue arcs are left turns, orange arcs right turns, as in the simulation). The dashed lines show where the turtle would have gone without turning.',
        id: 'Kura-kura berbelok sebesar sudut luar di setiap pojok. Saat menggambar persegi ia berbelok kiri 90° sebanyak empat kali, 4 × 90° = 360° (satu putaran penuh); saat menggambar bintang lima ia berbelok kanan 144° sebanyak lima kali, 5 × 144° = 720° (dua putaran penuh; busur biru = belok kiri, busur oranye = belok kanan, seperti dalam simulasi). Garis putus-putus menunjukkan ke mana kura-kura akan pergi seandainya tidak berbelok.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        const corners = [
          { v: [132, 166], e: [154, 166], a: 'M147 166 A15 15 0 0 0 132 151', t: [152, 148] },
          { v: [132, 66], e: [132, 44], a: 'M132 51 A15 15 0 0 0 117 66', t: [112, 48] },
          { v: [32, 66], e: [10, 66], a: 'M17 66 A15 15 0 0 0 32 81', t: [12, 86] },
          { v: [32, 166], e: [32, 188], a: 'M32 181 A15 15 0 0 0 47 166', t: [53, 186] },
        ];
        const sq = corners.map((c) => `<line x1="${c.v[0]}" y1="${c.v[1]}" x2="${c.e[0]}" y2="${c.e[1]}" class="tgx-d"/><path d="${c.a}" class="tgx-a" marker-end="url(#tgx-h)"/><text x="${c.t[0]}" y="${c.t[1]}" text-anchor="middle" class="tgx-s">90°</text>`).join('');
        return `<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('A square drawn with four left turns of 90 degrees, total 360 degrees, and a five-pointed star drawn with five turns of 144 degrees, total 720 degrees', 'Persegi yang digambar dengan empat belokan kiri 90 derajat, total 360 derajat, dan bintang lima yang digambar dengan lima belokan 144 derajat, total 720 derajat')}">
  <style>text{font:12px system-ui,sans-serif;fill:currentColor}.tgx-s{font:600 11px system-ui,sans-serif;fill:#3b82f6}.tgx-b{font:600 12.5px system-ui,sans-serif}.tgx-p{fill:none;stroke:currentColor;stroke-width:2.2;stroke-linejoin:round}.tgx-d{stroke:currentColor;stroke-width:1.2;stroke-dasharray:3 3;opacity:.6}.tgx-a{fill:none;stroke:#3b82f6;stroke-width:2}.tgx-r{fill:none;stroke:#f97316;stroke-width:2}.tgx-rs{font:600 11px system-ui,sans-serif;fill:#f97316}</style>
  <defs><marker id="tgx-h" markerUnits="userSpaceOnUse" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="#3b82f6"/></marker><marker id="tgx-hr" markerUnits="userSpaceOnUse" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="#f97316"/></marker></defs>
  <text x="82" y="20" text-anchor="middle" class="tgx-b">${L('Square: left(90)', 'Persegi: left(90)')}</text>
  <polygon points="32,166 132,166 132,66 32,66" class="tgx-p"/>
  ${sq}
  <polygon points="32,166 22,161 25,166 22,171" fill="#16a34a"/>
  <text x="82" y="212" text-anchor="middle">4 × 90° = 360°</text>
  <text x="82" y="228" text-anchor="middle">= 1 ${L('full turn', 'putaran penuh')}</text>
  <text x="272" y="20" text-anchor="middle" class="tgx-b">${L('Star: right(144)', 'Bintang: right(144)')}</text>
  <polyline points="272,54 230.9,180.6 338.6,102.4 205.4,102.4 313.1,180.6 272,54" class="tgx-p"/>
  <line x1="272" y1="54" x2="280" y2="29.3" class="tgx-d"/>
  <path d="M276.9 38.8 A16 16 0 0 1 276.9 69.2" class="tgx-r" marker-end="url(#tgx-hr)"/>
  <text x="298" y="52" class="tgx-rs">144°</text>
  <text x="272" y="212" text-anchor="middle">5 × 144° = 720°</text>
  <text x="272" y="228" text-anchor="middle">= 2 ${L('full turns', 'putaran penuh')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'A turtle has a position (x, y), a heading and a pen. forward() and backward() move along the heading; left() and right() turn relative to the current heading; setheading() and goto() use absolute angles and coordinates.',
        'For a regular polygon with n sides the turtle turns by the exterior angle 360° / n at every corner; the interior angle is 180° − 360° / n.',
        'A closed path that ends with the starting heading has a total turning of a whole number of full turns: 360° for a convex polygon, 720° for the five-pointed star, 4680° for twelve squares turned 30° apart.',
        'Loops replace repeated lines (for i in range(4)), nested loops repeat a pattern of patterns, and functions with parameters (rectangle(width, height, colour)) let one definition draw many shapes.',
        'circle(r) draws a polygon with many short sides; circle(r, extent) draws an arc and circle(r, steps=6) a hexagon. begin_fill() ... end_fill() fills the path walked in between.',
        'Python turtle is exact floating-point geometry: after turning, positions such as 1.4210854715202004e-14 appear where 0 was expected, and Vec2D prints them rounded, as (-0.00,0.00).',
      ],
      id: [
        'Kura-kura punya posisi (x, y), arah, dan pena. forward() dan backward() bergerak menurut arah; left() dan right() berbelok relatif terhadap arah saat ini; setheading() dan goto() memakai sudut dan koordinat mutlak.',
        'Untuk segi-n beraturan, kura-kura berbelok sebesar sudut luar 360° / n di setiap pojok; sudut dalamnya 180° − 360° / n.',
        'Lintasan tertutup yang berakhir dengan arah semula memiliki total belokan berupa kelipatan putaran penuh: 360° untuk segi banyak cembung, 720° untuk bintang lima, 4680° untuk dua belas persegi yang diputar 30°.',
        'Perulangan menggantikan baris yang berulang (for i in range(4)), perulangan bersarang mengulang pola dari pola, dan fungsi berparameter (persegi_panjang(lebar, tinggi, warna)) membuat satu definisi dapat menggambar banyak bentuk.',
        'circle(r) menggambar segi banyak dengan banyak sisi pendek; circle(r, extent) menggambar busur dan circle(r, steps=6) segi enam. begin_fill() ... end_fill() mengisi lintasan yang ditempuh di antaranya.',
        'Turtle Python memakai geometri bilangan pecahan yang persis: setelah berbelok, muncul posisi seperti 1.4210854715202004e-14 padahal yang diharapkan 0, dan Vec2D mencetaknya dibulatkan, seperti (-0.00,0.00).',
      ],
    },
    vocabulary: {
      en: [
        ['turtle', 'An on-screen cursor with a position, a heading and a pen that leaves a line where it walks.'],
        ['heading', 'The direction the turtle faces, in degrees: 0 = east, 90 = north, 180 = west, 270 = south.'],
        ['pen up / pen down', 'penup() lets the turtle move without drawing; pendown() makes it draw again.'],
        ['exterior angle', 'The angle the turtle turns at a corner: 180° minus the interior angle of the shape.'],
        ['total turning', 'The sum of all turns (left positive, right negative); 360° for one trip round a convex shape.'],
        ['coordinates', 'A pair (x, y) giving a point; x grows to the right and y upwards from the centre (0, 0).'],
        ['logic error', 'A mistake that gives a wrong result without any error message, like turning 60° to draw a triangle.'],
      ],
      id: [
        ['turtle (kura-kura)', 'Penunjuk di layar yang punya posisi, arah, dan pena yang meninggalkan garis di jalur yang dilaluinya.'],
        ['arah (heading)', 'Arah hadap kura-kura dalam derajat: 0 = timur, 90 = utara, 180 = barat, 270 = selatan.'],
        ['pena naik / turun', 'penup() membuat kura-kura bergerak tanpa menggambar; pendown() membuatnya menggambar lagi.'],
        ['sudut luar', 'Sudut belok kura-kura di sebuah pojok: 180° dikurangi sudut dalam bangunnya.'],
        ['total belokan', 'Jumlah semua belokan (kiri positif, kanan negatif); 360° untuk sekali mengelilingi bangun cembung.'],
        ['koordinat', 'Pasangan (x, y) yang menunjukkan titik; x bertambah ke kanan dan y ke atas dari pusat (0, 0).'],
        ['kesalahan logika', 'Kesalahan yang menghasilkan hasil salah tanpa pesan error, seperti berbelok 60° untuk menggambar segitiga.'],
      ],
    },
    misconceptions: {
      en: [
        ['To draw a triangle the turtle turns 60°, the angle of the triangle.', 'The turtle turns by the exterior angle, 180° − 60° = 120°. Turning 60° three times (180° in total) draws half a hexagon that never closes.'],
        ['left(90) makes the turtle face the left side of the window.', 'left() and right() turn relative to the current heading. To face a fixed direction use setheading(): 0 east, 90 north, 180 west, 270 south.'],
        ['speed(0) is the slowest speed.', 'speed(1) is the slowest and speed(10) fast; speed(0) means "fastest": no animation of moves and turns.'],
        ['circle() draws a perfectly round curve.', 'It draws a regular polygon with many short sides (22 for circle(60)); steps= sets how many.'],
        ['A star turns 360° in total, like every closed shape.', 'Only simple (non-crossing) shapes turn 360°. The five-pointed star turns 5 × 144° = 720°, two full turns.'],
      ],
      id: [
        ['Untuk menggambar segitiga kura-kura berbelok 60°, yaitu sudut segitiga.', 'Kura-kura berbelok sebesar sudut luar, 180° − 60° = 120°. Berbelok 60° tiga kali (total 180°) menghasilkan setengah segi enam yang tidak pernah tertutup.'],
        ['left(90) membuat kura-kura menghadap ke sisi kiri jendela.', 'left() dan right() berbelok relatif terhadap arah saat ini. Untuk menghadap arah tertentu gunakan setheading(): 0 timur, 90 utara, 180 barat, 270 selatan.'],
        ['speed(0) adalah kecepatan paling lambat.', 'speed(1) paling lambat dan speed(10) cepat; speed(0) berarti "tercepat": gerak dan belokan tidak dianimasikan.'],
        ['circle() menggambar lengkungan yang benar-benar bulat.', 'circle() menggambar segi banyak beraturan dengan banyak sisi pendek (22 untuk circle(60)); steps= mengatur banyaknya.'],
        ['Bintang berbelok 360° secara total, seperti setiap bangun tertutup.', 'Hanya bangun sederhana (tanpa garis bersilangan) yang berbelok 360°. Bintang lima berbelok 5 × 144° = 720°, dua putaran penuh.'],
      ],
    },
    realWorld: {
      en: [
        'Pen plotters, laser cutters and CNC machines follow move-and-turn or go-to-point instructions (G-code) very much like turtle commands.',
        'Floor robots and robot vacuum cleaners navigate with "drive forward, turn by an angle" commands and track their heading the same way.',
        'Generative artists and designers use short loops of turtle-like rules to create patterns, mandalas and batik-like motifs.',
        'Logo and its turtle are still used in classrooms worldwide, and block-based tools such as Scratch have "move" and "turn" blocks taken from it.',
      ],
      id: [
        'Pen plotter, mesin pemotong laser, dan mesin CNC mengikuti instruksi maju-dan-belok atau menuju-titik (G-code) yang sangat mirip dengan perintah turtle.',
        'Robot lantai dan robot penyedot debu bernavigasi dengan perintah "maju, belok sebesar sudut tertentu" dan mencatat arahnya dengan cara yang sama.',
        'Seniman generatif dan desainer memakai perulangan pendek berisi aturan ala turtle untuk membuat pola, mandala, dan motif mirip batik.',
        'Logo dan kura-kuranya masih dipakai di kelas di seluruh dunia, dan alat berbasis blok seperti Scratch punya blok "gerak" dan "putar" yang berasal darinya.',
      ],
    },
    questions: {
      en: [
        { q: 'A turtle draws a regular octagon (8 sides). How many degrees must it turn at each corner, and what is the interior angle?', a: 'Turn 360° / 8 = 45° at each corner; the interior angle is 180° − 45° = 135°. The total turning is 8 × 45° = 360°.' },
        { q: 'A seven-pointed star is drawn with t.right(3 * 360 / 7) seven times. What is the total turning, and how many full turns is that?', a: 'Each turn is about 154.29°; 7 × 154.29° = 3 × 360° = 1080°, three full turns.' },
        { q: 'sisi = input("Sisi: ") followed by t.forward(sisi) stops with TypeError: can\'t multiply sequence by non-int of type \'float\'. Why, and how do you fix it?', a: 'input() always returns text (str), and the turtle multiplies its direction (floats) by the distance. Convert first: sisi = int(input("Sisi: ")).' },
        { q: 'How many straight sides does circle(60) draw, and why does the square-plus-flower program (program 5) end where it started?', a: '1 + int(min(11 + 60/6, 59)) = 22 sides. After each circle the turtle is back at its start, and the 36 turns of 10° add up to 360°, so it ends at the start with its starting heading.' },
      ],
      id: [
        { q: 'Kura-kura menggambar segi delapan beraturan. Berapa derajat ia harus berbelok di setiap pojok, dan berapa sudut dalamnya?', a: 'Berbelok 360° / 8 = 45° di setiap pojok; sudut dalamnya 180° − 45° = 135°. Total belokannya 8 × 45° = 360°.' },
        { q: 'Bintang tujuh digambar dengan t.right(3 * 360 / 7) sebanyak tujuh kali. Berapa total belokannya, dan berapa putaran penuh?', a: 'Setiap belokan sekitar 154,29°; 7 × 154,29° = 3 × 360° = 1080°, tiga putaran penuh.' },
        { q: 'sisi = input("Sisi: ") lalu t.forward(sisi) berhenti dengan TypeError: can\'t multiply sequence by non-int of type \'float\'. Mengapa, dan bagaimana memperbaikinya?', a: 'input() selalu menghasilkan teks (str), sedangkan kura-kura mengalikan arahnya (bilangan pecahan) dengan jarak. Ubah dulu: sisi = int(input("Sisi: ")).' },
        { q: 'Berapa sisi lurus yang digambar circle(60), dan mengapa program persegi-dan-bunga (program 5) berakhir di titik awalnya?', a: '1 + int(min(11 + 60/6, 59)) = 22 sisi. Setelah setiap lingkaran kura-kura kembali ke titik awalnya, dan 36 belokan 10° berjumlah 360°, sehingga ia berakhir di titik awal dengan arah semula.' },
      ],
    },
  },
};
