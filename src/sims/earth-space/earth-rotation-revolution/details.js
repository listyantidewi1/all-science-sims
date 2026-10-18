// Long-form text for the sim page aside, kept out of manifest.js.
export default {
  objectives: {
    en: [
      'Explain that the Earth spins once on its axis in 24 hours (rotation) and that this makes day and night.',
      'Explain that the Earth travels once around the Sun in about 365 days (revolution) and that this makes a year.',
      'Compare the length of a day and a year on Earth and on Mars.',
    ],
    id: [
      'Menjelaskan bahwa Bumi berputar pada porosnya satu kali dalam 24 jam (rotasi) dan hal ini menyebabkan siang dan malam.',
      'Menjelaskan bahwa Bumi mengelilingi Matahari satu kali dalam sekitar 365 hari (revolusi) dan hal ini menyebabkan tahun.',
      'Membandingkan panjang hari dan tahun di Bumi dan di Mars.',
    ],
  },
  tryThis: {
    en: [
      'In the Spinning view, watch the city. When does it move into the dark half? What time does its clock show?',
      'Press "1 day". How many times did the Earth spin? How far did it move around the Sun?',
      'Switch to the Orbiting view and press "1 month" twelve times. Where is the Earth now?',
      'Choose Mars. Press "1 year" and count how many Earth days went by.',
    ],
    id: [
      'Di tampilan Berputar, perhatikan kotanya. Kapan kota itu masuk ke bagian gelap? Jam berapa yang ditunjukkan jamnya?',
      'Tekan "1 hari". Berapa kali Bumi berputar? Seberapa jauh Bumi bergerak mengelilingi Matahari?',
      'Pindah ke tampilan Mengorbit dan tekan "1 bulan" dua belas kali. Di mana Bumi sekarang?',
      'Pilih Mars. Tekan "1 tahun" dan hitung berapa hari Bumi yang berlalu.',
    ],
  },

  learn: {
    background: {
      en: [
        'The Earth is always moving in two ways at the same time. First, it spins around an imaginary line through the North and South Poles called its axis. One full spin takes 24 hours, and we call it one day. This spinning is called rotation. Second, the Earth travels in a huge, almost circular path around the Sun. One full trip takes about 365 days, and we call it one year. This travelling is called revolution, and the path is called an orbit.',
        'Rotation is what gives us day and night. The Sun lights up only the half of the Earth that faces it. As the Earth spins, your town turns into the sunlight (morning), passes through the middle of the bright side (noon), turns away into the dark (evening) and crosses the middle of the dark side (midnight). The Sun does not really rise and set; it is the ground under your feet that is turning.',
        'Revolution is what gives us the year. In the Orbiting view the Earth creeps around the Sun while the day counter climbs. After 365 days it is back where it started and the counter shows one year. Because 365 is not a whole number of spins exactly (it is about 365 and a quarter), we add one extra day every four years: a leap year.',
        'Other planets do the same two things at different speeds. Mars spins almost as fast as the Earth, so a Mars day is about 24 hours and 40 minutes. But Mars is farther from the Sun and has a much bigger orbit, so a Mars year lasts 687 Earth days, almost two Earth years. Use the planet buttons to compare them.',
      ],
      id: [
        'Bumi selalu bergerak dengan dua cara sekaligus. Pertama, Bumi berputar pada garis khayal yang menembus Kutub Utara dan Kutub Selatan yang disebut poros. Satu putaran penuh membutuhkan 24 jam, dan kita menyebutnya satu hari. Perputaran ini disebut rotasi. Kedua, Bumi bergerak dalam lintasan yang sangat besar dan hampir berbentuk lingkaran mengelilingi Matahari. Satu kali keliling membutuhkan sekitar 365 hari, dan kita menyebutnya satu tahun. Perjalanan ini disebut revolusi, dan lintasannya disebut orbit.',
        'Rotasi memberi kita siang dan malam. Matahari hanya menerangi setengah Bumi yang menghadapnya. Saat Bumi berputar, kotamu berputar masuk ke sinar Matahari (pagi), melewati tengah sisi terang (siang), berputar menjauh ke bagian gelap (sore) dan melewati tengah sisi gelap (tengah malam). Matahari tidak benar-benar terbit dan terbenam; tanah di bawah kakimu yang berputar.',
        'Revolusi memberi kita tahun. Di tampilan Mengorbit, Bumi merayap mengelilingi Matahari sementara penghitung hari naik. Setelah 365 hari Bumi kembali ke tempat semula dan penghitung menunjukkan satu tahun. Karena 365 bukan jumlah putaran yang tepat (sebenarnya sekitar 365 seperempat), kita menambahkan satu hari ekstra setiap empat tahun: tahun kabisat.',
        'Planet lain melakukan dua hal yang sama dengan kecepatan berbeda. Mars berputar hampir secepat Bumi, sehingga satu hari Mars sekitar 24 jam 40 menit. Tetapi Mars lebih jauh dari Matahari dan orbitnya jauh lebih besar, sehingga satu tahun Mars berlangsung 687 hari Bumi, hampir dua tahun Bumi. Gunakan tombol planet untuk membandingkannya.',
      ],
    },
    figure: {
      caption: {
        en: 'Left: the Earth spins on its axis once every 24 hours; the half facing the Sun has day, the other half has night. Right: the Earth travels around the Sun once every 365 days, making a year.',
        id: 'Kiri: Bumi berputar pada porosnya satu kali setiap 24 jam; setengah yang menghadap Matahari mengalami siang, setengah lainnya malam. Kanan: Bumi mengelilingi Matahari satu kali setiap 365 hari, membentuk satu tahun.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Earth rotating on its axis and revolving around the Sun', 'Bumi berotasi pada porosnya dan berevolusi mengelilingi Matahari')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor;text-anchor:middle}.m{fill:none;stroke:currentColor;stroke-width:1.2;opacity:.5}</style>
  <defs>
    <marker id="arw" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="currentColor"/></marker>
    <clipPath id="cEarth"><circle cx="90" cy="120" r="44"/></clipPath>
  </defs>
  <circle cx="90" cy="120" r="44" fill="#3b82f6"/>
  <g clip-path="url(#cEarth)">
    <ellipse cx="72" cy="105" rx="16" ry="10" fill="#22c55e"/>
    <ellipse cx="100" cy="135" rx="18" ry="9" fill="#22c55e"/>
    <rect x="90" y="76" width="44" height="88" fill="#0f172a" opacity="0.6"/>
  </g>
  <line x1="90" y1="64" x2="90" y2="176" class="m" stroke-dasharray="4 3"/>
  <text x="90" y="58">${L('axis', 'poros')}</text>
  <path d="M60 170 A44 44 0 0 0 120 170" fill="none" stroke="currentColor" stroke-width="1.5" marker-end="url(#arw)"/>
  <text x="90" y="192">${L('spins: 24 hours = 1 day', 'berputar: 24 jam = 1 hari')}</text>
  <text x="40" y="100" font-size="10">${L('day', 'siang')}</text>
  <text x="140" y="100" font-size="10">${L('night', 'malam')}</text>
  <path d="M8 90 L40 110 M8 120 L40 120 M8 150 L40 130" stroke="#f59e0b" stroke-width="2"/>
  <text x="18" y="80" fill="#f59e0b" font-size="10">${L('sunlight', 'sinar')}</text>
  <circle cx="270" cy="120" r="14" fill="#f59e0b"/>
  <circle cx="270" cy="120" r="56" class="m" stroke-dasharray="3 3"/>
  <circle cx="326" cy="120" r="6" fill="#3b82f6"/>
  <path d="M322 70 A56 56 0 0 0 232 90" fill="none" stroke="currentColor" stroke-width="1.5" marker-end="url(#arw)"/>
  <text x="270" y="192">${L('orbits: 365 days = 1 year', 'mengorbit: 365 hari = 1 tahun')}</text>
  <text x="270" y="146" font-size="9">${L('Sun', 'Matahari')}</text>
  <text x="90" y="30" font-weight="bold">${L('ROTATION', 'ROTASI')}</text>
  <text x="270" y="30" font-weight="bold">${L('REVOLUTION', 'REVOLUSI')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Rotation: the Earth spins once on its axis every 24 hours. This makes day and night.',
        'Only the half of the Earth facing the Sun is lit. Your town turns into the light and out of it every day.',
        'Revolution: the Earth travels once around the Sun every 365 days. This makes a year.',
        'The Earth does both at once: it spins about 365 times during one trip around the Sun.',
        'Other planets spin and orbit too, but at different speeds: a Mars year is 687 Earth days.',
      ],
      id: [
        'Rotasi: Bumi berputar pada porosnya satu kali setiap 24 jam. Ini menyebabkan siang dan malam.',
        'Hanya setengah Bumi yang menghadap Matahari yang terang. Kotamu berputar masuk dan keluar dari cahaya setiap hari.',
        'Revolusi: Bumi mengelilingi Matahari satu kali setiap 365 hari. Ini menyebabkan tahun.',
        'Bumi melakukan keduanya sekaligus: Bumi berputar sekitar 365 kali selama satu kali mengelilingi Matahari.',
        'Planet lain juga berputar dan mengorbit, tetapi dengan kecepatan berbeda: satu tahun Mars adalah 687 hari Bumi.',
      ],
    },
    vocabulary: {
      en: [
        ['Rotation', 'Spinning around on the spot, like a top. The Earth rotates once every 24 hours.'],
        ['Axis', 'The imaginary line through the North and South Poles that the Earth spins around.'],
        ['Revolution', 'Travelling all the way around something. The Earth revolves around the Sun once a year.'],
        ['Orbit', 'The path a planet follows around the Sun.'],
        ['Day', 'The time for one full spin of the Earth: 24 hours.'],
        ['Year', 'The time for one full trip around the Sun: about 365 days.'],
      ],
      id: [
        ['Rotasi', 'Berputar di tempat, seperti gasing. Bumi berotasi satu kali setiap 24 jam.'],
        ['Poros', 'Garis khayal yang menembus Kutub Utara dan Kutub Selatan, tempat Bumi berputar.'],
        ['Revolusi', 'Bergerak mengelilingi sesuatu sampai kembali ke awal. Bumi berevolusi mengelilingi Matahari satu kali setahun.'],
        ['Orbit', 'Lintasan yang dilalui planet mengelilingi Matahari.'],
        ['Hari', 'Waktu untuk satu putaran penuh Bumi: 24 jam.'],
        ['Tahun', 'Waktu untuk satu kali keliling Matahari: sekitar 365 hari.'],
      ],
    },
    misconceptions: {
      en: [
        ['The Sun moves across the sky because it travels around the Earth.', 'The Sun seems to move because the Earth is spinning under it. In the sim the Sun stays still while the city turns toward and away from it.'],
        ['Night happens because the Earth moves far away from the Sun.', 'The Earth stays almost the same distance from the Sun all year. Night is simply the time when your side of the Earth faces away from the Sun.'],
        ['One spin of the Earth takes a year.', 'One spin takes a day (24 hours). It is the trip around the Sun that takes a year (365 days). Press "1 year" and watch how many times the Earth spins.'],
      ],
      id: [
        ['Matahari bergerak melintasi langit karena Matahari mengelilingi Bumi.', 'Matahari tampak bergerak karena Bumi berputar di bawahnya. Di simulasi, Matahari tetap diam sementara kota berputar menghadap dan menjauhinya.'],
        ['Malam terjadi karena Bumi bergerak jauh dari Matahari.', 'Jarak Bumi ke Matahari hampir sama sepanjang tahun. Malam hanyalah saat sisi Bumi tempatmu berada membelakangi Matahari.'],
        ['Satu putaran Bumi membutuhkan satu tahun.', 'Satu putaran membutuhkan satu hari (24 jam). Perjalanan mengelilingi Matahari-lah yang membutuhkan satu tahun (365 hari). Tekan "1 tahun" dan lihat berapa kali Bumi berputar.'],
      ],
    },
    realWorld: {
      en: [
        'When it is noon in Jakarta it is still early morning in London, because London has not yet turned to face the Sun.',
        'Your birthday comes once a year because the Earth has made one full trip around the Sun since the last one.',
        'A leap year adds 29 February every four years to make up for the extra quarter day in each orbit.',
        'Astronauts on the Space Station see 16 sunrises a day because they orbit the Earth every 90 minutes.',
      ],
      id: [
        'Ketika di Jakarta tengah hari, di London masih pagi-pagi sekali, karena London belum berputar menghadap Matahari.',
        'Ulang tahunmu datang sekali setahun karena Bumi telah menyelesaikan satu kali keliling Matahari sejak ulang tahun sebelumnya.',
        'Tahun kabisat menambahkan tanggal 29 Februari setiap empat tahun untuk menutupi seperempat hari ekstra dalam setiap orbit.',
        'Astronaut di Stasiun Luar Angkasa melihat 16 kali matahari terbit sehari karena mereka mengorbit Bumi setiap 90 menit.',
      ],
    },
    questions: {
      en: [
        { q: 'The city clock shows 18:00. Where is the city on the Earth: facing the Sun, facing away, or on the edge between light and dark?', a: 'On the edge, moving from the light into the dark. That is sunset. At 06:00 it is on the other edge, moving into the light: sunrise.' },
        { q: 'How many times does the Earth spin during one trip around the Sun?', a: 'About 365 times, one spin for every day of the year.' },
        { q: 'A Mars year is 687 Earth days. If you are 10 years old on Earth, about how many Mars years old are you?', a: 'About 5 Mars years, because a Mars year is almost twice as long as an Earth year (10 × 365 ÷ 687 ≈ 5.3).' },
      ],
      id: [
        { q: 'Jam kota menunjukkan pukul 18.00. Di mana kota itu berada di Bumi: menghadap Matahari, membelakangi, atau di tepi antara terang dan gelap?', a: 'Di tepi, bergerak dari terang ke gelap. Itulah matahari terbenam. Pada pukul 06.00 kota berada di tepi lainnya, bergerak masuk ke terang: matahari terbit.' },
        { q: 'Berapa kali Bumi berputar selama satu kali mengelilingi Matahari?', a: 'Sekitar 365 kali, satu putaran untuk setiap hari dalam setahun.' },
        { q: 'Satu tahun Mars adalah 687 hari Bumi. Jika umurmu 10 tahun di Bumi, berapa kira-kira umurmu dalam tahun Mars?', a: 'Sekitar 5 tahun Mars, karena satu tahun Mars hampir dua kali lebih panjang daripada tahun Bumi (10 × 365 ÷ 687 ≈ 5,3).' },
      ],
    },
  },
};
