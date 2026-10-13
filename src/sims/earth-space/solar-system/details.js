// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Compare orbital periods across the solar system.',
      'Recognize that distance from the Sun strongly affects orbital period.',
      "Use a model to estimate planet positions at a given time.",
    ],
    id: [
      'Membandingkan periode orbit antar planet di tata surya.',
      'Mengenali bahwa jarak dari Matahari sangat memengaruhi periode orbit.',
      'Menggunakan model untuk memperkirakan posisi planet pada waktu tertentu.',
    ],
  },
  tryThis: {
    en: [
      'How many Mercury orbits fit into one Earth year?',
      'Set time to 165 years — where is Neptune relative to where it started?',
      'Pause and try to predict Mars\' position 6 months later.',
    ],
    id: [
      'Berapa kali Merkurius mengorbit dalam satu tahun Bumi?',
      'Atur waktu ke 165 tahun — di mana Neptunus dibanding posisi awalnya?',
      'Jeda lalu prediksikan posisi Mars 6 bulan kemudian.',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'The Sun is by far the heaviest thing in the solar system, and its gravity holds all eight planets in orbit around it. A planet is always being pulled toward the Sun, but it is also moving sideways, so instead of falling in it keeps circling. Close to the Sun the pull is strong, so a planet must move fast to stay in orbit; far away the pull is weak and the planet moves slowly. Mercury, the closest planet, races around in 88 days, while Neptune, the farthest, takes almost 165 years for a single lap.',
        'In this model every planet moves on a perfect circle at a steady speed, and the time it takes for one lap is its real orbital period: 0.24 years for Mercury, 1 year for Earth, 11.9 years for Jupiter and 164.8 years for Neptune. Real distances are too spread out to fit on a screen, because Neptune is 30 times farther from the Sun than Earth is. The sim squeezes the spacing (it uses the square root of the distance), so the order of the planets is right but the gaps between them are not to scale. All the planets also start lined up on one side, which never happens in the real sky.',
        'The speed slider sets how many simulated years pass each second, and the readout shows the time since you pressed Reset. Turn on the orbit circles to compare sizes, and use Pause to freeze the picture and predict where a planet will be. There is a tidy rule hiding in the numbers, discovered by Johannes Kepler: for any planet, the period multiplied by itself equals the distance multiplied by itself twice (in Earth years and Earth distances). Jupiter is 5.2 Earth distances out; 5.2 × 5.2 × 5.2 is about 141, and the square root of 141 is 11.9, which is exactly Jupiter\'s period in years.',
        'The sim leaves out a lot. Real orbits are slightly stretched ovals, so a planet moves a little faster when it is nearer the Sun. The orbits are not all in exactly the same flat plane. The Sun and planets are drawn far too large compared with the distances between them, and the moons, asteroids, comets and dwarf planets are not shown at all. Even so, the main idea is correct: the farther a planet is from the Sun, the slower it moves and the longer its year.',
      ],
      id: [
        'Matahari adalah benda terberat di tata surya, dan gravitasinya menahan kedelapan planet agar tetap mengorbit. Planet selalu ditarik ke arah Matahari, tetapi juga bergerak menyamping, sehingga alih-alih jatuh ia terus berputar mengelilingi Matahari. Di dekat Matahari tarikannya kuat, sehingga planet harus bergerak cepat agar tetap di orbitnya; jauh dari Matahari tarikannya lemah dan planet bergerak lambat. Merkurius, planet terdekat, menyelesaikan satu putaran dalam 88 hari, sedangkan Neptunus, planet terjauh, membutuhkan hampir 165 tahun untuk satu putaran.',
        'Dalam model ini setiap planet bergerak pada lingkaran sempurna dengan kecepatan tetap, dan waktu satu putarannya adalah periode orbit sungguhan: 0,24 tahun untuk Merkurius, 1 tahun untuk Bumi, 11,9 tahun untuk Jupiter, dan 164,8 tahun untuk Neptunus. Jarak sungguhan terlalu lebar untuk muat di layar, karena Neptunus 30 kali lebih jauh dari Matahari dibanding Bumi. Simulasi memadatkan jaraknya (memakai akar kuadrat jarak), sehingga urutan planet benar tetapi jarak antarplanet tidak sesuai skala. Semua planet juga mulai dalam satu garis di satu sisi, sesuatu yang tidak pernah terjadi di langit sungguhan.',
        'Slider kecepatan mengatur berapa tahun simulasi yang berlalu setiap detik, dan angka di layar menunjukkan waktu sejak kamu menekan Reset. Nyalakan lingkaran orbit untuk membandingkan ukurannya, dan gunakan Jeda untuk membekukan gambar lalu menebak posisi planet berikutnya. Ada aturan rapi yang tersembunyi di angka-angka ini, yang ditemukan Johannes Kepler: untuk planet mana pun, periode dikalikan dirinya sendiri sama dengan jarak dikalikan dirinya sendiri dua kali (dalam tahun Bumi dan jarak Bumi). Jupiter berjarak 5,2 jarak Bumi; 5,2 × 5,2 × 5,2 kira-kira 141, dan akar kuadrat dari 141 adalah 11,9, tepat periode Jupiter dalam tahun.',
        'Simulasi ini mengabaikan banyak hal. Orbit sungguhan berbentuk oval yang sedikit lonjong, sehingga planet bergerak sedikit lebih cepat ketika lebih dekat ke Matahari. Orbit-orbitnya juga tidak persis sebidang. Matahari dan planet digambar jauh terlalu besar dibanding jarak di antara mereka, dan bulan, asteroid, komet, serta planet katai tidak ditampilkan sama sekali. Meski begitu gagasan utamanya benar: semakin jauh planet dari Matahari, semakin lambat geraknya dan semakin panjang tahunnya.',
      ],
    },
    figure: {
      caption: {
        en: 'The Sun\'s pull (red) is strong close in and weak far out, so an inner planet must move fast (long blue arrow) while an outer planet crawls. That is why a year on Mercury is short and a year on Neptune is very long.',
        id: 'Tarikan Matahari (merah) kuat di dekat dan lemah di jauh, sehingga planet dalam harus bergerak cepat (panah biru panjang) sementara planet luar merayap. Itulah sebabnya setahun di Merkurius singkat dan setahun di Neptunus sangat panjang.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Inner planets move fast, outer planets move slowly', 'Planet dalam bergerak cepat, planet luar bergerak lambat')}">
  <style>text{font:12px system-ui,sans-serif;fill:currentColor}.m{fill:none;stroke:currentColor;stroke-width:1.2;opacity:.4}.f{stroke-width:2.4;fill:none}.s{font-size:11px}</style>
  <circle cx="120" cy="125" r="45" class="m"/>
  <circle cx="120" cy="125" r="105" class="m"/>
  <circle cx="120" cy="125" r="16" fill="#f59e0b"/>
  <text x="120" y="160" text-anchor="middle" class="s">${L('Sun', 'Matahari')}</text>
  <circle cx="165" cy="125" r="5" fill="#3b82f6"/>
  <line x1="165" y1="125" x2="165" y2="78" class="f" stroke="#3b82f6" marker-end="url(#a)"/>
  <line x1="165" y1="125" x2="139" y2="125" class="f" stroke="#ef4444" marker-end="url(#a)"/>
  <text x="172" y="88" fill="#3b82f6" class="s">${L('close: fast', 'dekat: cepat')}</text>
  <circle cx="172" cy="34" r="6" fill="#8b5cf6"/>
  <line x1="172" y1="34" x2="190" y2="44" class="f" stroke="#3b82f6" marker-end="url(#a)"/>
  <line x1="172" y1="34" x2="165" y2="46" class="f" stroke="#ef4444" marker-end="url(#a)"/>
  <text x="200" y="38" fill="#3b82f6" class="s">${L('far: slow', 'jauh: lambat')}</text>
  <text x="240" y="110" fill="#3b82f6" class="s">${L('blue = speed', 'biru = kecepatan')}</text>
  <text x="240" y="126" fill="#ef4444" class="s">${L('red = pull of the Sun', 'merah = tarikan Matahari')}</text>
  <text x="240" y="160" class="s">${L('Mercury: 88 days', 'Merkurius: 88 hari')}</text>
  <text x="240" y="176" class="s">${L('Earth: 1 year', 'Bumi: 1 tahun')}</text>
  <text x="240" y="192" class="s">${L('Jupiter: 12 years', 'Jupiter: 12 tahun')}</text>
  <text x="240" y="208" class="s">${L('Neptune: 165 years', 'Neptunus: 165 tahun')}</text>
  <text x="18" y="232" class="s" opacity=".7">${L('distances not to scale', 'jarak tidak sesuai skala')}</text>
  <defs><marker id="a" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="context-stroke"/></marker></defs>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'The Sun\'s gravity keeps every planet in orbit; the planet\'s sideways motion stops it from falling in.',
        'The farther a planet is from the Sun, the weaker the pull, the slower it moves and the longer its year.',
        'Mercury completes about four orbits in one Earth year; Neptune needs about 165 Earth years for one.',
        'Kepler\'s rule links the two: the period squared equals the distance cubed, when both are measured in Earth units.',
        'The sim uses circles and squeezed distances; real orbits are slightly oval and much more spread out.',
      ],
      id: [
        'Gravitasi Matahari menjaga setiap planet tetap mengorbit; gerak menyamping planet mencegahnya jatuh ke Matahari.',
        'Semakin jauh planet dari Matahari, semakin lemah tarikannya, semakin lambat geraknya, dan semakin panjang tahunnya.',
        'Merkurius menyelesaikan sekitar empat orbit dalam satu tahun Bumi; Neptunus butuh sekitar 165 tahun Bumi untuk satu orbit.',
        'Aturan Kepler menghubungkan keduanya: periode dikuadratkan sama dengan jarak dipangkatkan tiga, jika keduanya diukur dalam satuan Bumi.',
        'Simulasi memakai lingkaran dan jarak yang dipadatkan; orbit sungguhan sedikit oval dan jauh lebih renggang.',
      ],
    },
    vocabulary: {
      en: [
        ['Orbit', 'The path a planet follows around the Sun.'],
        ['Orbital period', 'The time a planet takes to go once around the Sun; for Earth this is one year.'],
        ['Astronomical unit (AU)', 'The average distance from Earth to the Sun, about 150 million kilometres; Neptune is at 30 AU.'],
        ['Gravity', 'The pull between masses; the Sun\'s gravity is what bends each planet\'s path into an orbit.'],
        ['Inner planets', 'Mercury, Venus, Earth and Mars: small, rocky and fast-moving.'],
        ['Outer planets', 'Jupiter, Saturn, Uranus and Neptune: large, mostly gas and ice, and slow-moving.'],
        ['Orrery', 'A mechanical or digital model that shows the planets moving around the Sun.'],
      ],
      id: [
        ['Orbit', 'Lintasan yang dilalui planet mengelilingi Matahari.'],
        ['Periode orbit', 'Waktu yang dibutuhkan planet untuk satu kali mengelilingi Matahari; untuk Bumi satu tahun.'],
        ['Satuan astronomi (SA)', 'Jarak rata-rata Bumi ke Matahari, sekitar 150 juta kilometer; Neptunus berada pada 30 SA.'],
        ['Gravitasi', 'Tarikan antara benda bermassa; gravitasi Matahari-lah yang membelokkan lintasan planet menjadi orbit.'],
        ['Planet dalam', 'Merkurius, Venus, Bumi, dan Mars: kecil, berbatu, dan bergerak cepat.'],
        ['Planet luar', 'Jupiter, Saturnus, Uranus, dan Neptunus: besar, sebagian besar gas dan es, dan bergerak lambat.'],
        ['Orrery', 'Model mekanis atau digital yang memperlihatkan planet-planet bergerak mengelilingi Matahari.'],
      ],
    },
    misconceptions: {
      en: [
        ['The planets are usually lined up in a row, like in the picture.', 'They almost never are. Each planet moves at its own speed, so they are scattered all around the Sun. The sim only starts them in a line so you can time their laps.'],
        ['Bigger planets orbit more slowly because they are heavier.', 'A planet\'s speed depends on its distance from the Sun, not its mass. Jupiter is slow because it is far out; a pebble at the same distance would orbit at exactly the same speed.'],
        ['The gaps between the planets look about equal.', 'The sim squeezes the spacing to fit the screen. In reality the gap between Neptune and Uranus alone is wider than the whole distance from the Sun to Saturn.'],
      ],
      id: [
        ['Planet-planet biasanya berjajar dalam satu garis seperti di gambar.', 'Hampir tidak pernah. Setiap planet bergerak dengan kecepatannya sendiri, sehingga mereka tersebar di sekeliling Matahari. Simulasi hanya memulainya segaris supaya kamu bisa menghitung waktu putarannya.'],
        ['Planet yang lebih besar mengorbit lebih lambat karena lebih berat.', 'Kecepatan planet bergantung pada jaraknya dari Matahari, bukan massanya. Jupiter lambat karena jauh; sebuah kerikil pada jarak yang sama akan mengorbit dengan kecepatan yang persis sama.'],
        ['Jarak antarplanet terlihat kira-kira sama.', 'Simulasi memadatkan jaraknya agar muat di layar. Kenyataannya, jarak antara Neptunus dan Uranus saja lebih lebar daripada seluruh jarak dari Matahari ke Saturnus.'],
      ],
    },
    realWorld: {
      en: [
        'Space probes must be launched when the planets are in the right positions: a trip to Mars is only possible about every 26 months, when Earth is about to overtake Mars.',
        'Jupiter and Saturn appear to meet in the sky roughly every 20 years, because fast Jupiter laps slow Saturn; their close meeting in December 2020 was called the "Great Conjunction".',
        'Neptune was discovered in 1846 and completed its first full orbit since then only in 2011, 165 years later.',
        'Mercury\'s 88-day year means that someone living there would celebrate more than four birthdays for every one on Earth.',
      ],
      id: [
        'Wahana antariksa harus diluncurkan saat posisi planet tepat: perjalanan ke Mars hanya mungkin sekitar setiap 26 bulan, ketika Bumi hampir menyusul Mars.',
        'Jupiter dan Saturnus tampak bertemu di langit kira-kira setiap 20 tahun, karena Jupiter yang cepat menyusul Saturnus yang lambat; pertemuan dekat mereka pada Desember 2020 disebut "Konjungsi Agung".',
        'Neptunus ditemukan pada 1846 dan baru menyelesaikan satu orbit penuh sejak saat itu pada 2011, 165 tahun kemudian.',
        'Tahun Merkurius yang hanya 88 hari berarti orang yang tinggal di sana akan berulang tahun lebih dari empat kali untuk setiap satu ulang tahun di Bumi.',
      ],
    },
    questions: {
      en: [
        { q: 'About how many times does Mercury go around the Sun while Earth goes around once?', a: 'About four times. Mercury\'s period is 0.24 years, and 1 ÷ 0.24 is a little more than 4. Run the sim for exactly one year and count Mercury\'s laps to check.' },
        { q: 'Press Reset, then let the sim run for 12 years. Where will Jupiter be compared with where it started? Where will Earth be?', a: 'Jupiter will be almost exactly back at its starting point, because its period is 11.9 years. Earth will also be back at its start, having made 12 full laps in the same time.' },
        { q: 'A new planet is found 4 times farther from the Sun than Earth. Use Kepler\'s rule to find how long its year is.', a: '4 × 4 × 4 = 64, and the number that multiplied by itself gives 64 is 8, so its year is 8 Earth years. It sits between Mars (1.9 years) and Jupiter (11.9 years), which makes sense for a planet between their orbits.' },
      ],
      id: [
        { q: 'Kira-kira berapa kali Merkurius mengelilingi Matahari selama Bumi mengelilingi Matahari satu kali?', a: 'Sekitar empat kali. Periode Merkurius 0,24 tahun, dan 1 ÷ 0,24 sedikit lebih dari 4. Jalankan simulasi tepat satu tahun dan hitung putaran Merkurius untuk memeriksanya.' },
        { q: 'Tekan Reset, lalu biarkan simulasi berjalan 12 tahun. Di mana Jupiter dibandingkan posisi awalnya? Di mana Bumi?', a: 'Jupiter hampir tepat kembali ke titik awalnya, karena periodenya 11,9 tahun. Bumi juga kembali ke titik awal, setelah menyelesaikan 12 putaran penuh dalam waktu yang sama.' },
        { q: 'Sebuah planet baru ditemukan 4 kali lebih jauh dari Matahari dibanding Bumi. Gunakan aturan Kepler untuk mencari panjang tahunnya.', a: '4 × 4 × 4 = 64, dan bilangan yang jika dikalikan dirinya sendiri menghasilkan 64 adalah 8, jadi tahunnya 8 tahun Bumi. Planet itu berada di antara Mars (1,9 tahun) dan Jupiter (11,9 tahun), yang masuk akal untuk planet di antara orbit keduanya.' },
      ],
    },
  },
};
