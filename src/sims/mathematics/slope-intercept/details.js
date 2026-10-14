// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Compute slope m = Δy / Δx from two points.',
      'Read the y-intercept b — the y-value where the line crosses the y-axis.',
      'See special cases: m = 0 (horizontal), m undefined (vertical), b = 0 (passes origin).',
    ],
    id: [
      'Menghitung kemiringan m = Δy / Δx dari dua titik.',
      'Membaca titik potong y b — nilai y di mana garis memotong sumbu y.',
      'Melihat kasus khusus: m = 0 (horizontal), m tak terdefinisi (vertikal), b = 0 (melalui titik asal).',
    ],
  },  tryThis: {
    en: [
      'Make a horizontal line — slope is zero.',
      'Make a steep line — slope grows quickly.',
      'Drop a point onto the y-axis — that is your b.',
    ],
    id: [
      'Buat garis horizontal — kemiringan nol.',
      'Buat garis curam — kemiringan tumbuh cepat.',
      'Letakkan titik di sumbu y — itulah b Anda.',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'The slope of a line measures how steep it is: how much y goes up (the rise) for each unit that x goes along (the run). Pick any two points on the line, subtract their y-values to get the rise and their x-values to get the run, and divide: slope = rise ÷ run. Because a straight line has the same steepness everywhere, you get the same answer whichever two points you pick. A positive slope climbs from left to right, a negative slope falls, a slope of zero is a flat horizontal line, and a vertical line has no slope at all because its run is zero and you cannot divide by zero.',
        'Every non-vertical line can be written as y = mx + b. The number m is the slope, and b is the y-intercept: put x = 0 into the equation and you get y = b, so b is the height at which the line crosses the y-axis. Together they let you find the y-value for any x: start at b, then add m for every step of one unit to the right. The sim\'s hover readout does this calculation for whatever x you point at.',
        'In the sim you drag the two coloured points (they snap to quarter-unit positions) and the line through them redraws, with a dashed amber triangle showing the run along the bottom and the rise up the side, and a green dot marking b on the y-axis. The header prints the equation and the slope formula with your numbers in it. The two sliders are the other way round: set m and b directly, and the sim moves the points to x = −3 and x = 3 on the new line. Try dragging one point straight above the other to see the vertical case, which the sim reports as x = constant with m undefined.',
        'Because the chart window spans 20 units across and 14 units up, the picture is stretched: a slope of 1 does not look like a 45° line on screen. Always compute m from the coordinates, not from the angle you see. The snapping means every slope you can make is a fraction with a denominator dividing 4, and the readouts are rounded to three decimal places.',
      ],
      id: [
        'Kemiringan sebuah garis mengukur seberapa curam garis itu: seberapa banyak y naik (kenaikan) untuk setiap satu satuan x bergerak ke kanan (jarak datar). Ambil dua titik mana pun pada garis, kurangkan nilai y keduanya untuk mendapat kenaikan dan nilai x keduanya untuk mendapat jarak datar, lalu bagi: kemiringan = kenaikan ÷ jarak datar. Karena garis lurus kecuramannya sama di mana-mana, jawabannya sama titik mana pun yang kamu pilih. Kemiringan positif menanjak dari kiri ke kanan, kemiringan negatif menurun, kemiringan nol berarti garis mendatar, dan garis tegak tidak punya kemiringan karena jarak datarnya nol dan kita tidak bisa membagi dengan nol.',
        'Setiap garis yang tidak tegak bisa ditulis sebagai y = mx + b. Bilangan m adalah kemiringan, dan b adalah titik potong sumbu-y: masukkan x = 0 ke persamaan dan kamu mendapat y = b, jadi b adalah ketinggian tempat garis memotong sumbu-y. Keduanya memungkinkanmu mencari nilai y untuk x mana pun: mulai dari b, lalu tambahkan m untuk setiap langkah satu satuan ke kanan. Pembacaan kursor di simulasi melakukan perhitungan ini untuk x yang kamu tunjuk.',
        'Di simulasi kamu menyeret dua titik berwarna (titik-titik itu menempel ke posisi kelipatan seperempat satuan) dan garis yang melaluinya digambar ulang, dengan segitiga kuning putus-putus yang menunjukkan jarak datar di bawah dan kenaikan di sisi, serta titik hijau yang menandai b pada sumbu-y. Bagian atas mencetak persamaan dan rumus kemiringan dengan angka-angkamu. Kedua slider bekerja sebaliknya: atur m dan b langsung, dan simulasi memindahkan kedua titik ke x = −3 dan x = 3 pada garis yang baru. Coba seret satu titik tepat di atas titik lainnya untuk melihat kasus tegak, yang dilaporkan simulasi sebagai x = konstanta dengan m tak terdefinisi.',
        'Karena jendela grafik membentang 20 satuan mendatar dan 14 satuan tegak, gambarnya teregang: kemiringan 1 tidak tampak seperti garis 45° di layar. Selalu hitung m dari koordinat, bukan dari sudut yang terlihat. Penempelan ke seperempat satuan berarti setiap kemiringan yang bisa kamu buat adalah pecahan dengan penyebut yang membagi 4, dan angka yang ditampilkan dibulatkan ke tiga desimal.',
      ],
    },
    figure: {
      caption: {
        en: 'Between (−3, −1) and (3, 3) the line rises 4 while running 6, so m = 4/6 = 2/3. It crosses the y-axis at b = 1, giving y = (2/3)x + 1.',
        id: 'Antara (−3, −1) dan (3, 3) garis naik 4 sambil bergerak 6 ke kanan, jadi m = 4/6 = 2/3. Garis memotong sumbu-y di b = 1, sehingga y = (2/3)x + 1.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Slope as rise over run on a line', 'Kemiringan sebagai kenaikan per jarak datar pada sebuah garis')}">
  <style>text{font:12px system-ui,sans-serif;fill:currentColor}.ax{stroke:currentColor;stroke-width:1.4;fill:none}.s{font-size:10px}.g{stroke:currentColor;stroke-width:.6;opacity:.25;fill:none}</style>
  <path d="M40 24 V216 M68 24 V216 M96 24 V216 M124 24 V216 M152 24 V216 M208 24 V216 M236 24 V216 M264 24 V216 M292 24 V216 M320 24 V216" class="g"/>
  <path d="M40 24 H320 M40 48 H320 M40 72 H320 M40 96 H320 M40 144 H320 M40 168 H320 M40 192 H320 M40 216 H320" class="g"/>
  <line x1="32" y1="120" x2="332" y2="120" class="ax" marker-end="url(#a)"/>
  <line x1="180" y1="226" x2="180" y2="10" class="ax" marker-end="url(#a)"/>
  <text x="328" y="134" class="s">x</text>
  <text x="172" y="16" text-anchor="end" class="s">y</text>
  <line x1="40" y1="176" x2="320" y2="16" stroke="#3b82f6" stroke-width="2.5"/>
  <path d="M96 144 H264 V48" fill="none" stroke="#f59e0b" stroke-width="1.6" stroke-dasharray="5 3"/>
  <text x="180" y="160" text-anchor="middle" fill="#f59e0b" class="s" font-weight="bold">${L('run = 6', 'jarak datar = 6')}</text>
  <text x="270" y="100" fill="#f59e0b" class="s" font-weight="bold">${L('rise = 4', 'kenaikan = 4')}</text>
  <circle cx="96" cy="144" r="6" fill="#ef4444"/>
  <circle cx="264" cy="48" r="6" fill="#8b5cf6"/>
  <text x="90" y="160" text-anchor="end" fill="#ef4444" class="s">(−3, −1)</text>
  <text x="272" y="44" fill="#8b5cf6" class="s">(3, 3)</text>
  <circle cx="180" cy="96" r="5" fill="#10b981"/>
  <text x="172" y="92" text-anchor="end" fill="#10b981" class="s" font-weight="bold">b = 1</text>
  <text x="96" y="132" text-anchor="middle" class="s">−3</text>
  <text x="264" y="132" text-anchor="middle" class="s">3</text>
  <text x="176" y="52" text-anchor="end" class="s">3</text>
  <text x="176" y="148" text-anchor="end" class="s">−1</text>
  <text x="44" y="200" class="s" font-weight="bold">m = ${L('rise ÷ run', 'kenaikan ÷ jarak datar')} = 4 ÷ 6 = 2/3</text>
  <text x="44" y="214" class="s">y = (2/3)x + 1</text>
  <text x="44" y="228" class="s">${L('each step right adds 2/3 to y', 'tiap langkah ke kanan menambah 2/3 pada y')}</text>
  <defs><marker id="a" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="context-stroke"/></marker></defs>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Slope is rise divided by run: m = (y₂ − y₁) ÷ (x₂ − x₁) for any two points on the line.',
        'In y = mx + b, b is the y-value where the line crosses the y-axis, because x = 0 there.',
        'The slope is the same between any two points on a straight line; that is what makes it straight.',
        'Positive m climbs to the right, negative m falls, m = 0 is horizontal, and a vertical line has undefined slope.',
        'Slope is a rate: every step of 1 in x changes y by exactly m.',
      ],
      id: [
        'Kemiringan adalah kenaikan dibagi jarak datar: m = (y₂ − y₁) ÷ (x₂ − x₁) untuk dua titik mana pun pada garis.',
        'Pada y = mx + b, b adalah nilai y tempat garis memotong sumbu-y, karena di sana x = 0.',
        'Kemiringan sama antara dua titik mana pun pada garis lurus; itulah yang membuatnya lurus.',
        'm positif menanjak ke kanan, m negatif menurun, m = 0 mendatar, dan garis tegak kemiringannya tak terdefinisi.',
        'Kemiringan adalah laju: setiap langkah 1 pada x mengubah y tepat sebesar m.',
      ],
    },
    vocabulary: {
      en: [
        ['Slope (m)', 'The steepness of a line: change in y divided by change in x between two points.'],
        ['Rise', 'The vertical change between two points, y₂ − y₁; negative if the line goes down.'],
        ['Run', 'The horizontal change between two points, x₂ − x₁.'],
        ['y-intercept (b)', 'The y-coordinate of the point where the line crosses the y-axis, at (0, b).'],
        ['Slope-intercept form', 'The equation y = mx + b, which shows the slope and y-intercept directly.'],
        ['Linear function', 'A relationship whose graph is a straight line; y changes by the same amount for every unit of x.'],
        ['Undefined slope', 'What a vertical line has, because its run is zero and division by zero is impossible; it is written x = constant.'],
      ],
      id: [
        ['Kemiringan (m)', 'Kecuraman garis: perubahan y dibagi perubahan x antara dua titik.'],
        ['Kenaikan', 'Perubahan tegak antara dua titik, y₂ − y₁; negatif jika garis menurun.'],
        ['Jarak datar', 'Perubahan mendatar antara dua titik, x₂ − x₁.'],
        ['Titik potong sumbu-y (b)', 'Koordinat y dari titik tempat garis memotong sumbu-y, yaitu (0, b).'],
        ['Bentuk kemiringan-titik potong', 'Persamaan y = mx + b, yang langsung memperlihatkan kemiringan dan titik potong sumbu-y.'],
        ['Fungsi linear', 'Hubungan yang grafiknya garis lurus; y berubah sebesar jumlah yang sama untuk setiap satuan x.'],
        ['Kemiringan tak terdefinisi', 'Yang dimiliki garis tegak, karena jarak datarnya nol dan pembagian dengan nol tidak mungkin; ditulis x = konstanta.'],
      ],
    },
    misconceptions: {
      en: [
        ['A line that looks like 45° on the screen has slope 1.', 'Visual steepness depends on how the axes are scaled. The sim\'s window is 20 units wide but 14 tall, so slope 1 looks flatter than 45°. Always compute m from coordinates.'],
        ['b is where the line crosses the x-axis.', 'b is the y-intercept, the crossing of the y-axis at (0, b). The x-axis crossing is at x = −b/m, a different point.'],
        ['A vertical line has slope 0, or an infinitely large slope.', 'Slope 0 belongs to a horizontal line. A vertical line has a run of 0, so the slope is undefined and the line cannot be written as y = mx + b.'],
        ['The slope depends on which two points you choose.', 'On a straight line every pair of points gives the same ratio of rise to run. Drag either point along the line in the sim and m does not change.'],
      ],
      id: [
        ['Garis yang tampak 45° di layar punya kemiringan 1.', 'Kecuraman yang terlihat bergantung pada skala sumbu. Jendela simulasi lebarnya 20 satuan tetapi tingginya 14, jadi kemiringan 1 tampak lebih landai dari 45°. Selalu hitung m dari koordinat.'],
        ['b adalah tempat garis memotong sumbu-x.', 'b adalah titik potong sumbu-y, yaitu perpotongan dengan sumbu-y di (0, b). Perpotongan dengan sumbu-x berada di x = −b/m, titik yang berbeda.'],
        ['Garis tegak punya kemiringan 0, atau kemiringan tak hingga.', 'Kemiringan 0 milik garis mendatar. Garis tegak jarak datarnya 0, sehingga kemiringannya tak terdefinisi dan garis itu tidak bisa ditulis sebagai y = mx + b.'],
        ['Kemiringan bergantung pada dua titik mana yang dipilih.', 'Pada garis lurus setiap pasangan titik memberi perbandingan kenaikan terhadap jarak datar yang sama. Seret salah satu titik sepanjang garis di simulasi dan m tidak berubah.'],
      ],
    },
    realWorld: {
      en: [
        'A taxi fare is y = mx + b with b the flag-fall charge and m the price per kilometre; the intercept is what you pay before moving.',
        'Converting temperatures: F = 1.8C + 32 is a line with slope 1.8 and y-intercept 32.',
        'Road signs give the gradient of a hill as a percentage, which is rise over run times 100: a 10% grade rises 10 m for every 100 m along.',
        'On a distance-time graph of a car travelling at steady speed, the slope is the speed and the intercept is where the car started.',
      ],
      id: [
        'Tarif taksi berbentuk y = mx + b dengan b tarif buka pintu dan m harga per kilometer; titik potongnya adalah yang kamu bayar sebelum bergerak.',
        'Mengubah suhu: F = 1,8C + 32 adalah garis dengan kemiringan 1,8 dan titik potong sumbu-y 32.',
        'Rambu jalan menyatakan kecuraman tanjakan dalam persen, yaitu kenaikan per jarak datar dikali 100: tanjakan 10% naik 10 m untuk setiap 100 m jarak datar.',
        'Pada grafik jarak-waktu mobil yang melaju dengan kelajuan tetap, kemiringannya adalah kelajuan dan titik potongnya adalah posisi awal mobil.',
      ],
    },
    questions: {
      en: [
        { q: 'A line passes through (1, 2) and (4, 8). Find its slope and its equation.', a: 'm = (8 − 2) ÷ (4 − 1) = 6 ÷ 3 = 2. Then 2 = 2 × 1 + b gives b = 0, so y = 2x. The line passes through the origin.' },
        { q: 'For the line y = −0.5x + 3, what is y when x = 8, and where does the line cross the x-axis?', a: 'y = −0.5 × 8 + 3 = −4 + 3 = −1. It crosses the x-axis where y = 0: −0.5x + 3 = 0, so x = 6. The negative slope means the line falls as x increases.' },
        { q: 'Two lines have slopes 3 and 1/3. Describe how each changes y when x increases by 1, and which is steeper.', a: 'Slope 3 raises y by 3 for every step of 1 in x; slope 1/3 raises it by only a third, so you need 3 steps in x to rise 1. The line with slope 3 is steeper, whatever the screen makes them look like.' },
      ],
      id: [
        { q: 'Sebuah garis melalui (1, 2) dan (4, 8). Tentukan kemiringan dan persamaannya.', a: 'm = (8 − 2) ÷ (4 − 1) = 6 ÷ 3 = 2. Lalu 2 = 2 × 1 + b memberi b = 0, jadi y = 2x. Garis itu melalui titik asal.' },
        { q: 'Untuk garis y = −0,5x + 3, berapa y ketika x = 8, dan di mana garis memotong sumbu-x?', a: 'y = −0,5 × 8 + 3 = −4 + 3 = −1. Garis memotong sumbu-x saat y = 0: −0,5x + 3 = 0, jadi x = 6. Kemiringan negatif berarti garis menurun saat x bertambah.' },
        { q: 'Dua garis punya kemiringan 3 dan 1/3. Jelaskan bagaimana masing-masing mengubah y ketika x bertambah 1, dan mana yang lebih curam.', a: 'Kemiringan 3 menaikkan y sebesar 3 untuk setiap langkah 1 pada x; kemiringan 1/3 hanya menaikkannya sepertiga, jadi perlu 3 langkah pada x untuk naik 1. Garis dengan kemiringan 3 lebih curam, bagaimanapun tampilannya di layar.' },
      ],
    },
  },
};
