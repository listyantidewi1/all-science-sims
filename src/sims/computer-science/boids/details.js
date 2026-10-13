// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Connect three local rules to global flocking behavior.',
      'Recognize emergence: no leader, no global plan.',
      'Tune the rule weights and watch flocks dissolve or tighten.',
    ],
    id: [
      'Menghubungkan tiga aturan lokal dengan perilaku kawanan global.',
      'Mengenali emergence: tanpa pemimpin, tanpa rencana global.',
      'Atur bobot aturan dan amati kawanan bubar atau merapat.',
    ],
  },
  tryThis: {
    en: [
      'Set separation to 0 — do they pile up?',
      'Set alignment high, others low — what shape forms?',
      'Click the canvas to scatter the flock.',
    ],
    id: [
      'Atur separasi ke 0 — apakah mereka menumpuk?',
      'Atur penjajaran tinggi, lainnya rendah — bentuk apa muncul?',
      'Klik kanvas untuk mengacak kawanan.',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'A flock of starlings turns as if it were a single animal, yet no bird is in charge and no bird can see the whole flock. In the 1980s the computer graphics researcher Craig Reynolds showed that this behaviour can be reproduced with simulated creatures he called boids, each following three local rules. Separation: steer away from neighbours that are too close. Alignment: steer toward the average heading of nearby boids. Cohesion: steer toward the average position of nearby boids. Each boid only looks at the others within its neighbour radius and knows nothing else.',
        'The simulation applies these rules every frame to each boid. It finds all other boids within the neighbour radius, averages their velocities for alignment and their positions for cohesion, and for separation adds a push away from each neighbour closer than 40 percent of the radius, with a push that grows sharply as the gap shrinks. The three pushes are multiplied by the slider weights and added to the boid\'s velocity, the speed is capped at a maximum, and the position is updated. Boids that leave one edge of the canvas reappear at the opposite edge, and a click adds a sudden outward push from the cursor so you can see the flock re-form.',
        'The sliders let you take the rules apart. With separation at zero, boids overlap into dense knots because nothing keeps them apart. With alignment high and the others low, boids settle into parallel streams that drift together without clumping. With cohesion dominant, tight balls form that pulse as separation and cohesion fight. A larger neighbour radius means each boid averages over more of the flock, which usually merges small groups into fewer, larger ones. The number of boids slider changes how many agents there are, and because every boid checks every other boid, the work grows with the square of that number.',
        'This is a deliberately minimal model. Real birds have a limited field of view, react with a delay, avoid obstacles and predators, and fly in three dimensions, none of which the sim includes. There is also no randomness in the rules themselves: the only randomness is the starting positions and your clicks. The lesson is the one Reynolds drew: complex, coordinated group behaviour can emerge from simple individual rules with no leader and no shared plan, and that idea now runs through biology, robotics and animation.',
      ],
      id: [
        'Kawanan burung jalak berbelok seolah menjadi satu hewan, padahal tidak ada burung yang memimpin dan tidak ada burung yang bisa melihat seluruh kawanan. Pada 1980-an peneliti grafika komputer Craig Reynolds menunjukkan bahwa perilaku ini dapat ditiru dengan makhluk simulasi yang ia sebut boid, masing-masing mengikuti tiga aturan lokal. Separasi: menjauhi tetangga yang terlalu dekat. Penjajaran: mengarah ke arah rata-rata boid di sekitarnya. Kohesi: mengarah ke posisi rata-rata boid di sekitarnya. Setiap boid hanya melihat boid lain dalam radius tetangganya dan tidak tahu apa pun selain itu.',
        'Simulasi menerapkan aturan ini setiap frame pada setiap boid. Ia mencari semua boid lain dalam radius tetangga, merata-ratakan kecepatan mereka untuk penjajaran dan posisi mereka untuk kohesi, dan untuk separasi menambahkan dorongan menjauh dari setiap tetangga yang lebih dekat dari 40 persen radius, dengan dorongan yang membesar tajam saat jaraknya menyempit. Ketiga dorongan dikalikan bobot slider dan ditambahkan ke kecepatan boid, lajunya dibatasi pada nilai maksimum, lalu posisinya diperbarui. Boid yang keluar dari satu tepi kanvas muncul lagi di tepi seberang, dan satu klik menambahkan dorongan mendadak menjauhi kursor sehingga kamu bisa melihat kawanan terbentuk kembali.',
        'Slider memungkinkanmu membongkar aturan itu. Dengan separasi nol, boid saling tumpang tindih menjadi gumpalan padat karena tidak ada yang memisahkan mereka. Dengan penjajaran tinggi dan yang lain rendah, boid membentuk arus-arus sejajar yang hanyut bersama tanpa menggerombol. Dengan kohesi dominan, terbentuk bola-bola rapat yang berdenyut karena separasi dan kohesi saling melawan. Radius tetangga yang lebih besar berarti setiap boid merata-ratakan lebih banyak anggota kawanan, yang biasanya menggabungkan kelompok kecil menjadi kelompok yang lebih sedikit dan lebih besar. Slider jumlah boid mengubah berapa banyak agen, dan karena setiap boid memeriksa setiap boid lain, beban kerjanya tumbuh sebanding dengan kuadrat jumlah itu.',
        'Ini model yang sengaja dibuat minimal. Burung sungguhan punya medan pandang terbatas, bereaksi dengan jeda, menghindari rintangan dan pemangsa, dan terbang dalam tiga dimensi, yang semuanya tidak dimuat simulasi. Tidak ada pula keacakan dalam aturannya sendiri: satu-satunya keacakan adalah posisi awal dan klikmu. Pelajarannya sama dengan yang ditarik Reynolds: perilaku kelompok yang rumit dan terkoordinasi dapat muncul dari aturan individu yang sederhana tanpa pemimpin dan tanpa rencana bersama, dan gagasan itu kini mengalir dalam biologi, robotika, dan animasi.',
      ],
    },
    figure: {
      caption: {
        en: 'One boid (purple) and its neighbours inside the neighbour radius. Separation (red) pushes it away from the neighbour inside the inner zone, alignment (green) turns it toward the neighbours\' average heading, and cohesion (blue) pulls it toward their average position. The three are weighted by the sliders and added.',
        id: 'Satu boid (ungu) dan tetangganya di dalam radius tetangga. Separasi (merah) mendorongnya menjauhi tetangga di zona dalam, penjajaran (hijau) memutarnya ke arah rata-rata tetangga, dan kohesi (biru) menariknya ke posisi rata-rata mereka. Ketiganya diberi bobot oleh slider lalu dijumlahkan.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        const boid = (x, y, deg, fill) => `<polygon points="9,0 -6,5 -6,-5" fill="${fill}" transform="translate(${x} ${y}) rotate(${deg})"/>`;
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('The three boid steering rules', 'Tiga aturan kemudi boid')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.r{fill:none;stroke:currentColor;stroke-width:1;opacity:.45}.f{fill:none;stroke-width:2.4}.s{font-size:10px;opacity:.75}.t{font-weight:700}</style>
  <circle cx="150" cy="125" r="95" class="r" stroke-dasharray="5 4"/>
  <circle cx="150" cy="125" r="38" class="r" stroke-dasharray="2 3"/>
  <text x="150" y="24" text-anchor="middle" class="s">${L('neighbour radius', 'radius tetangga')}</text>
  <text x="150" y="98" text-anchor="middle" class="s">${L('separation zone', 'zona separasi')}</text>
  ${boid(150, 125, -20, '#8b5cf6')}
  ${boid(124, 112, -40, 'currentColor')}
  ${boid(205, 80, -45, 'currentColor')}
  ${boid(220, 140, -35, 'currentColor')}
  ${boid(190, 185, -50, 'currentColor')}
  ${boid(290, 60, 20, 'currentColor')}
  <circle cx="204" cy="135" r="3" fill="#3b82f6"/>
  <text x="211" y="150" class="s" fill="#3b82f6">${L('average position', 'posisi rata-rata')}</text>
  <line x1="150" y1="125" x2="190" y2="132" class="f" stroke="#3b82f6" marker-end="url(#a)"/>
  <line x1="150" y1="125" x2="176" y2="94" class="f" stroke="#10b981" marker-end="url(#a)"/>
  <line x1="150" y1="125" x2="180" y2="146" class="f" stroke="#ef4444" marker-end="url(#a)"/>
  <text x="14" y="200" class="t" fill="#ef4444">${L('separation', 'separasi')}</text>
  <text x="14" y="214" class="s">${L('away from the close neighbour', 'menjauhi tetangga yang dekat')}</text>
  <text x="130" y="200" class="t" fill="#10b981">${L('alignment', 'penjajaran')}</text>
  <text x="130" y="214" class="s">${L('match neighbours\' heading', 'samakan arah tetangga')}</text>
  <text x="250" y="200" class="t" fill="#3b82f6">${L('cohesion', 'kohesi')}</text>
  <text x="250" y="214" class="s">${L('toward their centre', 'menuju pusat mereka')}</text>
  <text x="14" y="234" class="s">${L('new velocity = old + weighted sum of the three, capped at max speed', 'kecepatan baru = lama + jumlah berbobot ketiganya, dibatasi laju maksimum')}</text>
  <text x="262" y="48" class="s">${L('outside: ignored', 'di luar: diabaikan')}</text>
  <defs><marker id="a" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="context-stroke"/></marker></defs>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Each boid follows three local rules: separate from close neighbours, align with nearby headings, and move toward the nearby centre.',
        'A boid only sees others within its neighbour radius; there is no leader and no view of the whole flock.',
        'The slider weights set how strongly each rule pulls, and changing them changes the shape of the flock.',
        'Flocking is emergent: the coordinated group pattern is not written anywhere in the rules.',
        'Every boid checks every other boid, so doubling the number of boids roughly quadruples the work.',
      ],
      id: [
        'Setiap boid mengikuti tiga aturan lokal: menjauhi tetangga yang dekat, menjajarkan diri dengan arah sekitarnya, dan bergerak menuju pusat di dekatnya.',
        'Boid hanya melihat boid lain dalam radius tetangganya; tidak ada pemimpin dan tidak ada pandangan atas seluruh kawanan.',
        'Bobot slider mengatur seberapa kuat tiap aturan menarik, dan mengubahnya mengubah bentuk kawanan.',
        'Pergerakan kawanan bersifat emergent: pola kelompok yang terkoordinasi tidak tertulis di mana pun dalam aturan.',
        'Setiap boid memeriksa setiap boid lain, sehingga menggandakan jumlah boid membuat beban kerja sekitar empat kali lipat.',
      ],
    },
    vocabulary: {
      en: [
        ['Boid', 'A simulated bird-like agent that moves according to local steering rules.'],
        ['Agent', 'An individual in a simulation that senses its surroundings and acts on its own rules.'],
        ['Separation', 'The rule that steers a boid away from neighbours that are too close, preventing collisions.'],
        ['Alignment', 'The rule that steers a boid toward the average velocity of its neighbours.'],
        ['Cohesion', 'The rule that steers a boid toward the average position of its neighbours.'],
        ['Neighbour radius', 'The distance within which other boids are noticed; everything farther away is ignored.'],
        ['Emergence', 'Group-level behaviour that arises from individual rules without being specified directly.'],
        ['Velocity', 'Speed together with direction; the rules change it a little each frame.'],
      ],
      id: [
        ['Boid', 'Agen simulasi mirip burung yang bergerak menurut aturan kemudi lokal.'],
        ['Agen', 'Individu dalam simulasi yang merasakan sekitarnya dan bertindak menurut aturannya sendiri.'],
        ['Separasi', 'Aturan yang mengarahkan boid menjauhi tetangga yang terlalu dekat, mencegah tabrakan.'],
        ['Penjajaran', 'Aturan yang mengarahkan boid menuju kecepatan rata-rata tetangganya.'],
        ['Kohesi', 'Aturan yang mengarahkan boid menuju posisi rata-rata tetangganya.'],
        ['Radius tetangga', 'Jarak di dalam mana boid lain diperhatikan; semua yang lebih jauh diabaikan.'],
        ['Emergence', 'Perilaku tingkat kelompok yang muncul dari aturan individu tanpa ditentukan secara langsung.'],
        ['Kecepatan', 'Laju beserta arahnya; aturan mengubahnya sedikit demi sedikit setiap frame.'],
      ],
    },
    misconceptions: {
      en: [
        ['The flock follows a leader bird.', 'No boid is special. Every boid runs the same three rules on its own neighbours; the apparent leaders at the front are simply boids that happen to be there and are themselves steered by those behind and beside them.'],
        ['The boids must be communicating or sharing a plan to move together.', 'They share nothing. Each boid only reads the positions and velocities of its neighbours, which in real animals corresponds to simply watching nearby flock-mates.'],
        ['Emergent behaviour means random behaviour.', 'The rules are fully deterministic. Emergence means the group pattern is not stated in the rules yet reliably arises from them; run the sim with the same settings and the same kind of flock forms every time.'],
        ['Flocking needs complicated intelligence.', 'Three simple arithmetic rules are enough. The complexity you see is in the interaction of many simple agents, not in any single one.'],
      ],
      id: [
        ['Kawanan mengikuti seekor burung pemimpin.', 'Tidak ada boid yang istimewa. Setiap boid menjalankan tiga aturan yang sama pada tetangganya sendiri; yang tampak memimpin di depan hanyalah boid yang kebetulan berada di sana dan juga dikemudikan oleh yang di belakang dan di sampingnya.'],
        ['Boid pasti berkomunikasi atau berbagi rencana agar bergerak bersama.', 'Mereka tidak berbagi apa pun. Setiap boid hanya membaca posisi dan kecepatan tetangganya, yang pada hewan sungguhan setara dengan sekadar mengamati teman kawanan di dekatnya.'],
        ['Perilaku emergent berarti perilaku acak.', 'Aturannya sepenuhnya deterministik. Emergent berarti pola kelompok tidak dinyatakan dalam aturan namun muncul darinya secara andal; jalankan simulasi dengan pengaturan yang sama dan kawanan sejenis terbentuk setiap kali.'],
        ['Pergerakan kawanan membutuhkan kecerdasan yang rumit.', 'Tiga aturan aritmetika sederhana sudah cukup. Kerumitan yang kamu lihat ada pada interaksi banyak agen sederhana, bukan pada satu agen pun.'],
      ],
    },
    realWorld: {
      en: [
        'Starling murmurations and schools of fish are studied with boid-like models, and field measurements show that each animal tracks only a handful of nearby neighbours.',
        'Film and game studios animate herds, crowds and swarms of bats or birds with boid rules instead of moving each creature by hand.',
        'Drone light shows and research swarms of robots use separation and cohesion rules so hundreds of units can fly together without a central controller.',
        'Crowd simulations for stadium and station design treat pedestrians as agents with local avoidance rules to predict where bottlenecks form.',
      ],
      id: [
        'Kawanan burung jalak dan gerombolan ikan dipelajari dengan model mirip boid, dan pengukuran lapangan menunjukkan setiap hewan hanya mengikuti segelintir tetangga terdekatnya.',
        'Studio film dan gim menganimasikan gerombolan, kerumunan, dan kawanan kelelawar atau burung dengan aturan boid, bukan menggerakkan setiap makhluk secara manual.',
        'Pertunjukan cahaya drone dan kawanan robot riset memakai aturan separasi dan kohesi agar ratusan unit dapat terbang bersama tanpa pengendali pusat.',
        'Simulasi kerumunan untuk perancangan stadion dan stasiun memperlakukan pejalan kaki sebagai agen dengan aturan menghindar lokal untuk memprediksi di mana penyempitan terjadi.',
      ],
    },
    questions: {
      en: [
        { q: 'Predict what happens when you set separation to 0 and leave the other two sliders at 1, then explain it using the rules.', a: 'Boids collapse into tight clumps that overlap. Cohesion keeps pulling each boid toward its neighbours\' centre and alignment matches their speeds, but nothing pushes them apart any more, so the only thing stopping total overlap is their slightly different velocities.' },
        { q: 'Why does increasing the neighbour radius tend to produce fewer, larger flocks?', a: 'With a larger radius each boid averages the positions and headings of more distant boids, so separate small groups start to feel each other\'s pull and align with each other. Their cohesion targets move toward a common centre and the groups merge. With a small radius, groups that drift apart lose contact and stay separate.' },
        { q: 'The sim checks every pair of boids each frame. With 80 boids, how many neighbour checks does one update make, and roughly how does that number change with 250 boids?', a: 'Each of the 80 boids checks the other 79, so 80 × 79 = 6,320 checks. With 250 boids it is 250 × 249 = 62,250, about ten times more for roughly three times as many boids, because the work grows with the square of the count.' },
      ],
      id: [
        { q: 'Prediksi apa yang terjadi ketika separasi diatur ke 0 dan dua slider lainnya dibiarkan 1, lalu jelaskan dengan aturannya.', a: 'Boid runtuh menjadi gumpalan rapat yang saling tumpang tindih. Kohesi terus menarik setiap boid ke pusat tetangganya dan penjajaran menyamakan kecepatan mereka, tetapi tidak ada lagi yang mendorong mereka berpisah, sehingga satu-satunya yang mencegah tumpang tindih total adalah kecepatan mereka yang sedikit berbeda.' },
        { q: 'Mengapa memperbesar radius tetangga cenderung menghasilkan kawanan yang lebih sedikit tetapi lebih besar?', a: 'Dengan radius lebih besar, setiap boid merata-ratakan posisi dan arah boid yang lebih jauh, sehingga kelompok-kelompok kecil yang terpisah mulai merasakan tarikan satu sama lain dan saling menjajarkan diri. Target kohesi mereka bergerak ke pusat bersama dan kelompok-kelompok itu melebur. Dengan radius kecil, kelompok yang hanyut menjauh kehilangan kontak dan tetap terpisah.' },
        { q: 'Simulasi memeriksa setiap pasangan boid setiap frame. Dengan 80 boid, berapa pemeriksaan tetangga dalam satu pembaruan, dan kira-kira bagaimana angka itu berubah dengan 250 boid?', a: 'Masing-masing dari 80 boid memeriksa 79 lainnya, jadi 80 × 79 = 6.320 pemeriksaan. Dengan 250 boid menjadi 250 × 249 = 62.250, sekitar sepuluh kali lebih banyak untuk jumlah boid kira-kira tiga kali lipat, karena beban kerja tumbuh sebanding dengan kuadrat jumlahnya.' },
      ],
    },
  },
};
