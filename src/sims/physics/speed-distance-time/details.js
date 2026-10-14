// Long-form text for the sim page aside (lazy-loaded).
export default {
  objectives: {
    en: [
      'Use speed = distance ÷ time to work out one quantity from the other two.',
      'Read distance and time from a distance–time graph and explain what its slope means.',
      'Recognise that a steady speed gives a straight line on a distance–time graph and a flat line on a speed–time graph.',
    ],
    id: [
      'Menggunakan kelajuan = jarak ÷ waktu untuk mencari satu besaran dari dua besaran lainnya.',
      'Membaca jarak dan waktu dari grafik jarak–waktu dan menjelaskan arti kemiringannya.',
      'Mengenali bahwa kelajuan tetap menghasilkan garis lurus pada grafik jarak–waktu dan garis datar pada grafik kelajuan–waktu.',
    ],
  },
  tryThis: {
    en: [
      'Set 10 m/s and start. How long does the car take to reach 200 m? Check with 200 ÷ 10.',
      'Turn on the race, give the slower car a 50 m head start. Who wins? Where do the two graph lines cross?',
      'Drag the cursor on the graph to 5 s. Read the distance, then divide by 5. Do you get the speed you set?',
    ],
    id: [
      'Atur 10 m/s dan mulai. Berapa lama mobil mencapai 200 m? Cek dengan 200 ÷ 10.',
      'Nyalakan balapan, beri mobil yang lebih lambat start awal 50 m. Siapa yang menang? Di mana kedua garis grafik berpotongan?',
      'Seret kursor di grafik ke 5 s. Baca jaraknya, lalu bagi dengan 5. Apakah hasilnya sama dengan kelajuan yang kamu atur?',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'Speed tells you how much distance something covers in each unit of time. A car moving at 10 metres per second gains 10 m of distance every second: 10 m after 1 s, 50 m after 5 s, 200 m after 20 s. That is the whole meaning of speed = distance ÷ time, and it can be turned round: distance = speed × time, and time = distance ÷ speed. In this sim the track is a straight 200 m road, the stopwatch starts when you press Start, and the panel shows the division with the live numbers filled in.',
        'The distance–time graph puts time along the bottom and distance up the side. A car at steady speed draws a straight line, because it adds the same distance in every second. The steeper the line, the faster the car: steepness, or slope, is distance ÷ time, which is the speed. A flat line would mean the car is standing still. The speed–time graph shows the same motion differently: a steady speed is a flat horizontal line, which drops to zero when the car reaches the finish and stops.',
        'Turn on the race and a second vehicle, B, can start part-way along the track with a head start. Its line on the distance–time graph starts higher up but has its own slope. If B is slower than A, A\'s steeper line eventually crosses B\'s: the crossing point is the moment and place where A overtakes. Drag the yellow cursor to read both distances at any time. For B the sim subtracts the head start before dividing, so its speed is worked out from the distance it actually travelled.',
        'The sim is deliberately simple. Each vehicle jumps to its full speed the instant you press Start and holds it exactly until it stops at 200 m; nothing speeds up gradually, slows down or turns. Real vehicles accelerate, so their distance–time lines curve at the start, and the sim\'s straight lines are the special case of constant speed. The numbers you record are also the only kind of average speed the sim can show, because the speed never changes while the car is moving.',
      ],
      id: [
        'Kelajuan menyatakan seberapa jauh jarak yang ditempuh suatu benda dalam tiap satuan waktu. Mobil yang melaju 10 meter per sekon bertambah jaraknya 10 m setiap sekon: 10 m setelah 1 s, 50 m setelah 5 s, 200 m setelah 20 s. Itulah seluruh makna kelajuan = jarak ÷ waktu, dan rumus ini bisa dibalik: jarak = kelajuan × waktu, dan waktu = jarak ÷ kelajuan. Di simulasi ini lintasannya jalan lurus sepanjang 200 m, stopwatch mulai berjalan saat kamu menekan Mulai, dan panel menampilkan pembagiannya dengan angka yang sebenarnya.',
        'Grafik jarak–waktu meletakkan waktu di sumbu mendatar dan jarak di sumbu tegak. Mobil dengan kelajuan tetap menggambar garis lurus, karena jaraknya bertambah sama besar setiap sekon. Makin curam garisnya, makin cepat mobilnya: kecuraman, atau kemiringan, adalah jarak ÷ waktu, yaitu kelajuan. Garis datar berarti mobil diam. Grafik kelajuan–waktu menampilkan gerak yang sama dengan cara berbeda: kelajuan tetap berupa garis mendatar, yang turun ke nol ketika mobil mencapai garis finis dan berhenti.',
        'Nyalakan balapan, maka kendaraan kedua, B, dapat mulai dari tengah lintasan dengan start awal. Garisnya pada grafik jarak–waktu mulai lebih tinggi tetapi dengan kemiringannya sendiri. Jika B lebih lambat daripada A, garis A yang lebih curam akhirnya memotong garis B: titik potong itu adalah saat dan tempat A menyusul. Seret kursor kuning untuk membaca kedua jarak pada waktu mana pun. Untuk B, simulasi mengurangkan start awal sebelum membagi, sehingga kelajuannya dihitung dari jarak yang benar-benar ditempuh.',
        'Simulasi ini sengaja dibuat sederhana. Tiap kendaraan langsung mencapai kelajuan penuh begitu kamu menekan Mulai dan mempertahankannya tepat sampai berhenti di 200 m; tidak ada yang bertambah cepat perlahan, melambat, atau berbelok. Kendaraan sungguhan mengalami percepatan, sehingga garis jarak–waktunya melengkung di awal, dan garis lurus di simulasi adalah kasus khusus kelajuan tetap. Angka yang kamu rekam juga satu-satunya jenis kelajuan rata-rata yang bisa ditampilkan simulasi, karena kelajuannya tidak pernah berubah selama mobil bergerak.',
      ],
    },
    figure: {
      caption: {
        en: 'Distance–time graph for two vehicles at steady speed. Each line is straight; its slope (rise ÷ run) is the speed, so A at 10 m/s is steeper than B at 5 m/s. B starts with a 60 m head start, and the lines cross where A overtakes B.',
        id: 'Grafik jarak–waktu untuk dua kendaraan dengan kelajuan tetap. Tiap garis lurus; kemiringannya (naik ÷ datar) adalah kelajuan, sehingga A dengan 10 m/s lebih curam daripada B dengan 5 m/s. B mulai dengan start awal 60 m, dan kedua garis berpotongan di tempat A menyusul B.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Distance-time graph with two straight lines', 'Grafik jarak-waktu dengan dua garis lurus')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.s{font-size:10px}.m{fill:none;stroke:currentColor;stroke-width:1.3}.g{fill:none;stroke:currentColor;stroke-width:1;opacity:.2}.l{fill:none;stroke-width:2.4}</style>
  <defs><marker id="ax2" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto"><path d="M0 0 L7 3.5 L0 7 z" fill="context-stroke"/></marker></defs>
  <path d="M50 200 L50 22" class="m" marker-end="url(#ax2)"/>
  <path d="M50 200 L345 200" class="m" marker-end="url(#ax2)"/>
  <text x="14" y="18">${L('distance (m)', 'jarak (m)')}</text>
  <text x="290" y="226">${L('time (s)', 'waktu (s)')}</text>
  <path d="M50 157.5 L330 157.5 M50 115 L330 115 M50 72.5 L330 72.5 M50 30 L330 30" class="g"/>
  <path d="M120 200 L120 30 M190 200 L190 30 M260 200 L260 30 M330 200 L330 30" class="g"/>
  <text x="30" y="161" class="s">50</text><text x="26" y="119" class="s">100</text><text x="26" y="76" class="s">150</text><text x="26" y="34" class="s">200</text>
  <text x="116" y="214" class="s">5</text><text x="184" y="214" class="s">10</text><text x="254" y="214" class="s">15</text><text x="324" y="214" class="s">20</text>
  <path d="M50 200 L330 30" class="l" stroke="#3b82f6"/>
  <text x="290" y="24" fill="#3b82f6" class="s">A: 10 m/s</text>
  <path d="M50 149 L330 64" class="l" stroke="#f59e0b"/>
  <text x="300" y="58" fill="#f59e0b" class="s">B: 5 m/s</text>
  <text x="54" y="144" fill="#f59e0b" class="s">${L('head start 60 m', 'start awal 60 m')}</text>
  <circle cx="218" cy="98" r="5" fill="#ef4444"/>
  <text x="226" y="94" fill="#ef4444" class="s">${L('A overtakes B', 'A menyusul B')}</text>
  <text x="226" y="106" fill="#ef4444" class="s">(12 s, 120 m)</text>
  <path d="M78 183 L162 183 L162 132" class="m" stroke="#10b981" stroke-dasharray="4 3"/>
  <text x="104" y="196" fill="#10b981" class="s">6 s</text>
  <text x="166" y="162" fill="#10b981" class="s">60 m</text>
  <text x="56" y="52" fill="#10b981" class="s">${L('slope = 60 m ÷ 6 s = 10 m/s = speed', 'kemiringan = 60 m ÷ 6 s = 10 m/s = kelajuan')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Speed = distance ÷ time; at 10 m/s a car covers 10 m in every second.',
        'The formula rearranges to distance = speed × time and time = distance ÷ speed.',
        'On a distance–time graph, steady speed is a straight line and its slope is the speed; a steeper line means a faster vehicle.',
        'On a speed–time graph, steady speed is a flat horizontal line.',
        'Where two distance–time lines cross, the vehicles are at the same place at the same time: one is overtaking the other.',
      ],
      id: [
        'Kelajuan = jarak ÷ waktu; pada 10 m/s mobil menempuh 10 m tiap sekon.',
        'Rumus itu dapat disusun ulang menjadi jarak = kelajuan × waktu dan waktu = jarak ÷ kelajuan.',
        'Pada grafik jarak–waktu, kelajuan tetap berupa garis lurus dan kemiringannya adalah kelajuan; garis lebih curam berarti kendaraan lebih cepat.',
        'Pada grafik kelajuan–waktu, kelajuan tetap berupa garis mendatar.',
        'Di tempat dua garis jarak–waktu berpotongan, kedua kendaraan berada di tempat yang sama pada waktu yang sama: yang satu sedang menyusul yang lain.',
      ],
    },
    vocabulary: {
      en: [
        ['Speed', 'The distance travelled in each unit of time, for example metres per second (m/s).'],
        ['Distance', 'How far something has travelled along its path, measured in metres here.'],
        ['Steady (constant) speed', 'Motion in which the same distance is covered in every equal interval of time.'],
        ['Distance–time graph', 'A graph with time along the bottom and distance up the side; its slope at any point is the speed.'],
        ['Slope (gradient)', 'How steep a line is: the rise divided by the run. On a distance–time graph this equals distance ÷ time.'],
        ['Head start', 'A distance one competitor is allowed to begin ahead of the starting line.'],
        ['Average speed', 'Total distance ÷ total time for a whole journey, even if the speed changed along the way.'],
      ],
      id: [
        ['Kelajuan', 'Jarak yang ditempuh dalam tiap satuan waktu, misalnya meter per sekon (m/s).'],
        ['Jarak', 'Seberapa jauh benda telah bergerak sepanjang lintasannya, di sini diukur dalam meter.'],
        ['Kelajuan tetap (konstan)', 'Gerak dengan jarak yang sama ditempuh dalam setiap selang waktu yang sama.'],
        ['Grafik jarak–waktu', 'Grafik dengan waktu di sumbu mendatar dan jarak di sumbu tegak; kemiringannya di titik mana pun adalah kelajuan.'],
        ['Kemiringan (gradien)', 'Seberapa curam suatu garis: kenaikan dibagi pergeseran mendatar. Pada grafik jarak–waktu nilainya sama dengan jarak ÷ waktu.'],
        ['Start awal', 'Jarak yang diberikan kepada seorang peserta untuk memulai di depan garis start.'],
        ['Kelajuan rata-rata', 'Jarak total ÷ waktu total untuk seluruh perjalanan, walaupun kelajuannya berubah di sepanjang jalan.'],
      ],
    },
    misconceptions: {
      en: [
        ['A line going up on a distance–time graph means the car is going uphill.', 'The graph is not a picture of the road. A rising line means the distance is increasing, that is, the car is moving forward. A flat line means it has stopped, not that the road is flat.'],
        ['Where the two lines cross, the two cars have the same speed.', 'Crossing lines mean the same distance at the same time: the cars are side by side. Their speeds are the slopes, which are different; the steeper one is overtaking.'],
        ['The higher line on the graph is the faster car.', 'Height shows how far the car has got, not how fast it is going. B with a head start can be higher for a while even though A\'s line is steeper and A is faster.'],
        ['Doubling the speed doubles the time to finish.', 'It halves it. Time = distance ÷ speed, so at 20 m/s the 200 m track takes 10 s instead of 20 s.'],
      ],
      id: [
        ['Garis yang naik pada grafik jarak–waktu berarti mobil sedang menanjak.', 'Grafik bukan gambar jalannya. Garis yang naik berarti jaraknya bertambah, yaitu mobil bergerak maju. Garis datar berarti mobil berhenti, bukan jalannya yang datar.'],
        ['Di tempat kedua garis berpotongan, kedua mobil mempunyai kelajuan yang sama.', 'Garis yang berpotongan berarti jarak yang sama pada waktu yang sama: kedua mobil sedang berdampingan. Kelajuannya adalah kemiringan garis, yang berbeda; yang lebih curam sedang menyusul.'],
        ['Garis yang lebih tinggi pada grafik adalah mobil yang lebih cepat.', 'Ketinggian menunjukkan seberapa jauh mobil sudah sampai, bukan seberapa cepat geraknya. B dengan start awal bisa lebih tinggi untuk sementara walaupun garis A lebih curam dan A lebih cepat.'],
        ['Menggandakan kelajuan menggandakan waktu untuk finis.', 'Justru menjadi setengahnya. Waktu = jarak ÷ kelajuan, jadi pada 20 m/s lintasan 200 m ditempuh dalam 10 s, bukan 20 s.'],
      ],
    },
    realWorld: {
      en: [
        'A 100 m sprinter finishing in 10 s has an average speed of 10 m/s, the default speed of car A in the sim.',
        'Road speed limits are speeds: 50 km/h means a car covers 50 km in one hour, which is about 14 m/s.',
        'Satellite navigation estimates your arrival time with time = distance ÷ speed, using the remaining distance and your current speed.',
        'Train timetables are distance–time graphs in disguise: railway planners draw each train as a line and check that lines for trains on the same track never cross.',
      ],
      id: [
        'Pelari 100 m yang finis dalam 10 s mempunyai kelajuan rata-rata 10 m/s, kelajuan awal mobil A di simulasi.',
        'Batas kecepatan di jalan adalah kelajuan: 50 km/jam berarti mobil menempuh 50 km dalam satu jam, sekitar 14 m/s.',
        'Navigasi satelit memperkirakan waktu tiba dengan waktu = jarak ÷ kelajuan, memakai sisa jarak dan kelajuanmu saat itu.',
        'Jadwal kereta sebenarnya adalah grafik jarak–waktu: perencana kereta menggambar tiap kereta sebagai garis dan memastikan garis untuk kereta di rel yang sama tidak pernah berpotongan.',
      ],
    },
    questions: {
      en: [
        { q: 'Car A is set to 8 m/s. How long will it take to finish the 200 m track, and what will the distance–time graph look like?', a: 'Time = distance ÷ speed = 200 ÷ 8 = 25 s. The graph is a straight line from the origin rising to 200 m at 25 s; its slope is 8 m/s. The speed–time graph is a flat line at 8 m/s that drops to zero at 25 s.' },
        { q: 'You pause at 6 s and the cursor shows A at 72 m. What speed was A set to, and how do you know?', a: '72 ÷ 6 = 12 m/s. Because the speed is steady, the distance at any moment divided by the time gives the same speed, and that is also the slope of the line on the graph.' },
        { q: 'In a race, A runs at 10 m/s and B at 5 m/s with a 60 m head start. When and where does A catch B?', a: 'A\'s distance is 10 × t and B\'s is 60 + 5 × t. They are equal when 10t = 60 + 5t, so t = 12 s, at 120 m. On the graph this is where the two lines cross; after that A is ahead and wins.' },
      ],
      id: [
        { q: 'Mobil A diatur pada 8 m/s. Berapa lama ia menyelesaikan lintasan 200 m, dan seperti apa grafik jarak–waktunya?', a: 'Waktu = jarak ÷ kelajuan = 200 ÷ 8 = 25 s. Grafiknya garis lurus dari titik asal yang naik sampai 200 m pada 25 s; kemiringannya 8 m/s. Grafik kelajuan–waktunya garis datar pada 8 m/s yang turun ke nol pada 25 s.' },
        { q: 'Kamu menjeda pada 6 s dan kursor menunjukkan A di 72 m. Berapa kelajuan A yang diatur, dan bagaimana kamu tahu?', a: '72 ÷ 6 = 12 m/s. Karena kelajuannya tetap, jarak pada saat mana pun dibagi waktunya memberi kelajuan yang sama, dan itu juga kemiringan garis pada grafik.' },
        { q: 'Dalam balapan, A melaju 10 m/s dan B 5 m/s dengan start awal 60 m. Kapan dan di mana A menyusul B?', a: 'Jarak A adalah 10 × t dan jarak B adalah 60 + 5 × t. Keduanya sama ketika 10t = 60 + 5t, sehingga t = 12 s, di 120 m. Pada grafik inilah tempat kedua garis berpotongan; setelah itu A di depan dan menang.' },
      ],
    },
  },
};
