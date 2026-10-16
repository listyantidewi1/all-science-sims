// Long-form text for the sim page aside, kept out of manifest.js.
export default {
  objectives: {
    en: [
      'Describe uniform motion (GLB) and uniformly accelerated motion (GLBB) from the shapes of x–t and v–t graphs.',
      'Calculate velocity as the slope of a position–time graph, Δx/Δt, with units m/s.',
      'Find the distance travelled as the area under a velocity–time graph.',
    ],
    id: [
      'Mendeskripsikan gerak lurus beraturan (GLB) dan gerak lurus berubah beraturan (GLBB) dari bentuk grafik x–t dan v–t.',
      'Menghitung kecepatan sebagai kemiringan grafik posisi–waktu, Δx/Δt, dengan satuan m/s.',
      'Menentukan jarak yang ditempuh sebagai luas di bawah grafik kecepatan–waktu.',
    ],
  },
  tryThis: {
    en: [
      'Run "Constant speed 8 m/s" and check: after 10 s the shaded area should be 8 × 10 = 80 m. Is x also 80 m?',
      'Run "Speeding up" and mark A and B near the start, then near the end. Compare the two slopes with the speedometer.',
      'In manual mode, drive forward for 5 s, stop for 5 s, then drive backwards. What does each part look like on the x–t graph?',
      'Try Target 2: you must stay still for 6 s and then hold exactly 12 m/s. Can you beat 90%?',
    ],
    id: [
      'Jalankan "Kelajuan tetap 8 m/s" dan periksa: setelah 10 s luas arsiran seharusnya 8 × 10 = 80 m. Apakah x juga 80 m?',
      'Jalankan "Makin cepat" dan tandai A dan B dekat awal, lalu dekat akhir. Bandingkan kedua kemiringan dengan spidometer.',
      'Dalam mode manual, maju 5 s, berhenti 5 s, lalu mundur. Seperti apa tiap bagian pada grafik x–t?',
      'Coba Target 2: kamu harus diam 6 s lalu menjaga tepat 12 m/s. Bisa di atas 90%?',
    ],
  },

  learn: {
    background: {
      en: [
        'Motion along a straight line can be described completely by two graphs. The position–time (x–t) graph shows where the object is at each moment; the velocity–time (v–t) graph shows how fast, and in which direction, it is moving. The two are linked: the slope of the x–t graph at any moment is the velocity, v = Δx/Δt, and the area under the v–t graph between two times is the displacement, Δx = Σ v·Δt. In the sim the car\'s velocity comes from the slider or a preset, and both graphs are drawn from the same motion.',
        'Uniform motion (GLB, gerak lurus beraturan) means constant velocity. Its x–t graph is a straight line, steeper for faster motion, and its v–t graph is a flat horizontal line. A car at 8 m/s covers 8 m every second, so after 10 s it has moved 80 m: the slope of the x–t line is 80 m / 10 s = 8 m/s, and the area under the v–t line is 8 m/s × 10 s = 80 m. A horizontal x–t line means the car is at rest, v = 0.',
        'Uniformly accelerated motion (GLBB) means the velocity changes at a steady rate. The v–t graph is then a sloping straight line whose slope is the acceleration, a = Δv/Δt, and the x–t graph is a curve: bending upward when speeding up (each second covers more distance than the last) and flattening out when slowing down. The "speeding up" preset uses a = 1 m/s², so after 20 s the car is doing 20 m/s and has covered the triangle area ½ × 20 s × 20 m/s = 200 m.',
        'A negative velocity means the car is moving backwards: the x–t graph slopes downward and the v–t graph dips below zero, where the sim shades the area red because that displacement is negative. In the match-the-graph challenge only a target x–t curve is shown. To match it you have to read its slope and set the velocity slider to that value, which is exactly the skill the graphs are meant to build.',
      ],
      id: [
        'Gerak sepanjang garis lurus dapat dideskripsikan lengkap dengan dua grafik. Grafik posisi–waktu (x–t) menunjukkan di mana benda pada tiap saat; grafik kecepatan–waktu (v–t) menunjukkan seberapa cepat, dan ke arah mana, benda bergerak. Keduanya terhubung: kemiringan grafik x–t pada suatu saat adalah kecepatan, v = Δx/Δt, dan luas di bawah grafik v–t antara dua waktu adalah perpindahan, Δx = Σ v·Δt. Di simulasi, kecepatan mobil berasal dari slider atau pola, dan kedua grafik digambar dari gerak yang sama.',
        'Gerak lurus beraturan (GLB) berarti kecepatan tetap. Grafik x–t-nya garis lurus, lebih curam untuk gerak lebih cepat, dan grafik v–t-nya garis mendatar. Mobil dengan 8 m/s menempuh 8 m tiap sekon, sehingga setelah 10 s telah berpindah 80 m: kemiringan garis x–t adalah 80 m / 10 s = 8 m/s, dan luas di bawah garis v–t adalah 8 m/s × 10 s = 80 m. Garis x–t mendatar berarti mobil diam, v = 0.',
        'Gerak lurus berubah beraturan (GLBB) berarti kecepatan berubah dengan laju tetap. Grafik v–t-nya garis lurus miring dengan kemiringan sama dengan percepatan, a = Δv/Δt, dan grafik x–t-nya lengkung: melengkung ke atas saat makin cepat (tiap sekon menempuh jarak lebih besar daripada sebelumnya) dan mendatar saat melambat. Pola "makin cepat" memakai a = 1 m/s², sehingga setelah 20 s mobil bergerak 20 m/s dan telah menempuh luas segitiga ½ × 20 s × 20 m/s = 200 m.',
        'Kecepatan negatif berarti mobil bergerak mundur: grafik x–t menurun dan grafik v–t turun di bawah nol, dan simulasi mengarsir luasnya merah karena perpindahannya negatif. Dalam tantangan cocokkan grafik hanya kurva x–t target yang ditampilkan. Untuk mencocokkannya kamu harus membaca kemiringannya dan mengatur slider kecepatan ke nilai itu, dan itulah tepat keterampilan yang ingin dibangun oleh grafik ini.',
      ],
    },
    figure: {
      caption: {
        en: 'Three motions and their graphs. Constant speed: a straight x–t line and a flat v–t line; the area under v–t (shaded) equals the displacement. Speeding up: an x–t curve bending upward and a rising v–t line. At rest: a flat x–t line and v = 0.',
        id: 'Tiga gerak dan grafiknya. Kelajuan tetap: garis x–t lurus dan garis v–t mendatar; luas di bawah v–t (diarsir) sama dengan perpindahan. Makin cepat: kurva x–t melengkung ke atas dan garis v–t naik. Diam: garis x–t mendatar dan v = 0.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        const panel = (x, title, xt, vt, fill) => `
  <text x="${x + 50}" y="18" text-anchor="middle" class="t">${title}</text>
  <line x1="${x}" y1="100" x2="${x + 100}" y2="100" stroke="currentColor"/><line x1="${x}" y1="100" x2="${x}" y2="30" stroke="currentColor"/>
  <text x="${x - 6}" y="34" text-anchor="end">x</text><text x="${x + 100}" y="112" text-anchor="end">t</text>
  ${xt}
  <line x1="${x}" y1="210" x2="${x + 100}" y2="210" stroke="currentColor"/><line x1="${x}" y1="210" x2="${x}" y2="140" stroke="currentColor"/>
  <text x="${x - 6}" y="144" text-anchor="end">v</text><text x="${x + 100}" y="222" text-anchor="end">t</text>
  ${fill}
  ${vt}`;
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Position-time and velocity-time graphs for three motions', 'Grafik posisi-waktu dan kecepatan-waktu untuk tiga gerak')}">
  <style>text{font:9px system-ui,sans-serif;fill:currentColor}.t{font:10px system-ui,sans-serif;fill:currentColor}</style>
  ${panel(28, L('constant speed', 'kelajuan tetap'),
    '<line x1="28" y1="100" x2="128" y2="40" stroke="#34d399" stroke-width="2.5"/>',
    '<line x1="28" y1="170" x2="128" y2="170" stroke="#38bdf8" stroke-width="2.5"/>',
    '<rect x="28" y="170" width="100" height="40" fill="#38bdf8" opacity=".3"/>')}
  ${panel(148, L('speeding up', 'makin cepat'),
    '<path d="M148 100 Q 208 100 248 40" fill="none" stroke="#34d399" stroke-width="2.5"/>',
    '<line x1="148" y1="210" x2="248" y2="150" stroke="#38bdf8" stroke-width="2.5"/>',
    '<path d="M148 210 L248 210 L248 150 Z" fill="#38bdf8" opacity=".3"/>')}
  ${panel(268, L('at rest', 'diam'),
    '<line x1="268" y1="70" x2="368" y2="70" stroke="#34d399" stroke-width="2.5"/>',
    '<line x1="268" y1="210" x2="368" y2="210" stroke="#38bdf8" stroke-width="2.5"/>',
    '')}
  <text x="4" y="236" class="t">${L('slope of x–t = v;  area under v–t = Δx', 'kemiringan x–t = v;  luas di bawah v–t = Δx')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'The slope of a position–time graph is the velocity: v = Δx/Δt (m/s).',
        'The area under a velocity–time graph is the displacement: Δx = v·Δt for constant v, or the triangle/trapezium area when v changes.',
        'GLB (constant velocity): straight sloping x–t line, flat v–t line.',
        'GLBB (constant acceleration): curved x–t graph, straight sloping v–t line whose slope is a = Δv/Δt.',
        'A flat x–t line means at rest; a downward x–t slope or negative v means moving backwards.',
      ],
      id: [
        'Kemiringan grafik posisi–waktu adalah kecepatan: v = Δx/Δt (m/s).',
        'Luas di bawah grafik kecepatan–waktu adalah perpindahan: Δx = v·Δt untuk v tetap, atau luas segitiga/trapesium jika v berubah.',
        'GLB (kecepatan tetap): garis x–t lurus miring, garis v–t mendatar.',
        'GLBB (percepatan tetap): grafik x–t melengkung, garis v–t lurus miring dengan kemiringan a = Δv/Δt.',
        'Garis x–t mendatar berarti diam; kemiringan x–t menurun atau v negatif berarti bergerak mundur.',
      ],
    },
    vocabulary: {
      en: [
        ['Position (x)', 'Where an object is along the line, measured from a chosen origin, in metres.'],
        ['Displacement (Δx)', 'The change in position, final minus initial; it can be negative.'],
        ['Velocity (v)', 'The rate of change of position, including direction, in m/s; the slope of the x–t graph.'],
        ['Acceleration (a)', 'The rate of change of velocity, in m/s²; the slope of the v–t graph.'],
        ['GLB', 'Gerak lurus beraturan: straight-line motion at constant velocity.'],
        ['GLBB', 'Gerak lurus berubah beraturan: straight-line motion with constant acceleration.'],
      ],
      id: [
        ['Posisi (x)', 'Letak benda sepanjang garis, diukur dari titik acuan yang dipilih, dalam meter.'],
        ['Perpindahan (Δx)', 'Perubahan posisi, akhir dikurangi awal; bisa negatif.'],
        ['Kecepatan (v)', 'Laju perubahan posisi beserta arahnya, dalam m/s; kemiringan grafik x–t.'],
        ['Percepatan (a)', 'Laju perubahan kecepatan, dalam m/s²; kemiringan grafik v–t.'],
        ['GLB', 'Gerak lurus beraturan: gerak pada garis lurus dengan kecepatan tetap.'],
        ['GLBB', 'Gerak lurus berubah beraturan: gerak pada garis lurus dengan percepatan tetap.'],
      ],
    },
    misconceptions: {
      en: [
        ['The x–t graph is a picture of the road or the path of the car.', 'It is not. The car moves along a straight road; the graph plots position against time. A rising line means moving forward, not going uphill.'],
        ['A flat v–t line means the car is not moving.', 'A flat v–t line means constant velocity. The car is at rest only when the line sits on v = 0.'],
        ['Where two x–t graphs cross, the cars have the same speed.', 'They are at the same position at that moment. Same speed is where the slopes are equal, or where the v–t graphs cross.'],
        ['A curved x–t graph means the car is turning.', 'A curved x–t graph means the velocity is changing (acceleration). The road is still straight.'],
      ],
      id: [
        ['Grafik x–t adalah gambar jalan atau lintasan mobil.', 'Bukan. Mobil bergerak di jalan lurus; grafik memplot posisi terhadap waktu. Garis naik berarti bergerak maju, bukan mendaki.'],
        ['Garis v–t mendatar berarti mobil tidak bergerak.', 'Garis v–t mendatar berarti kecepatan tetap. Mobil diam hanya jika garisnya tepat di v = 0.'],
        ['Di tempat dua grafik x–t berpotongan, kedua mobil berkelajuan sama.', 'Di saat itu keduanya berada di posisi yang sama. Kelajuan sama terjadi saat kemiringannya sama, atau saat grafik v–t berpotongan.'],
        ['Grafik x–t yang melengkung berarti mobil berbelok.', 'Grafik x–t melengkung berarti kecepatannya berubah (percepatan). Jalannya tetap lurus.'],
      ],
    },
    realWorld: {
      en: [
        'GPS running apps draw exactly these graphs: pace against time, and distance against time, from your position every second.',
        'Train timetables are x–t graphs in disguise: the stations are positions and the times are the timetable entries.',
        'Speed cameras that measure average speed between two points use Δx/Δt, the slope of the x–t graph.',
        'A car\'s odometer accumulates the area under the v–t graph: it adds up speed × time all day long.',
      ],
      id: [
        'Aplikasi lari dengan GPS menggambar grafik seperti ini: pace terhadap waktu dan jarak terhadap waktu, dari posisimu tiap sekon.',
        'Jadwal kereta sebenarnya grafik x–t yang tersamar: stasiun adalah posisi dan jam adalah waktu.',
        'Kamera kecepatan rata-rata antara dua titik memakai Δx/Δt, kemiringan grafik x–t.',
        'Odometer mobil mengakumulasi luas di bawah grafik v–t: menjumlahkan kelajuan × waktu sepanjang hari.',
      ],
    },
    questions: {
      en: [
        { q: 'A car\'s x–t graph goes from x = 20 m at t = 2 s to x = 100 m at t = 12 s in a straight line. What is its velocity?', a: 'v = Δx/Δt = (100 − 20) m / (12 − 2) s = 80/10 = 8 m/s, constant because the line is straight.' },
        { q: 'A v–t graph is a horizontal line at 12 m/s from t = 6 s to t = 20 s. How far does the car travel in that time?', a: 'Area = 12 m/s × 14 s = 168 m.' },
        { q: 'A car speeds up uniformly from rest to 20 m/s in 20 s. Sketch its v–t graph and find the distance covered.', a: 'A straight line from (0, 0) to (20 s, 20 m/s). Distance = triangle area = ½ × 20 × 20 = 200 m.' },
        { q: 'Describe the motion shown by an x–t graph that rises, is flat for a while, then falls back to the starting position.', a: 'The car moves forward, stops, then drives back to where it started; its displacement is zero but the distance travelled is not.' },
      ],
      id: [
        { q: 'Grafik x–t sebuah mobil bergerak lurus dari x = 20 m pada t = 2 s ke x = 100 m pada t = 12 s. Berapa kecepatannya?', a: 'v = Δx/Δt = (100 − 20) m / (12 − 2) s = 80/10 = 8 m/s, tetap karena garisnya lurus.' },
        { q: 'Grafik v–t berupa garis mendatar di 12 m/s dari t = 6 s sampai t = 20 s. Berapa jarak yang ditempuh mobil pada selang itu?', a: 'Luas = 12 m/s × 14 s = 168 m.' },
        { q: 'Mobil dipercepat beraturan dari diam sampai 20 m/s dalam 20 s. Gambarkan grafik v–t-nya dan tentukan jarak yang ditempuh.', a: 'Garis lurus dari (0, 0) ke (20 s, 20 m/s). Jarak = luas segitiga = ½ × 20 × 20 = 200 m.' },
        { q: 'Deskripsikan gerak yang ditunjukkan grafik x–t yang naik, mendatar sebentar, lalu turun kembali ke posisi awal.', a: 'Mobil bergerak maju, berhenti, lalu kembali ke tempat semula; perpindahannya nol tetapi jarak tempuhnya tidak.' },
      ],
    },
  },
};
