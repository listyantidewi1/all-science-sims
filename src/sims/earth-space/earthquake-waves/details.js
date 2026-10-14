// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Explain why P waves reach a station before S waves.',
      'Use the S−P time gap to work out the distance to the epicentre.',
      'Locate an epicentre by drawing three circles around three stations.',
    ],
    id: [
      'Menjelaskan mengapa gelombang P tiba di stasiun lebih dulu daripada gelombang S.',
      'Menggunakan selisih waktu S−P untuk menghitung jarak ke episentrum.',
      'Menentukan letak episentrum dengan menggambar tiga lingkaran di sekitar tiga stasiun.',
    ],
  },
  tryThis: {
    en: [
      'Put the quake right next to station A. Which station has the biggest S−P gap? Why?',
      'Turn on mystery mode, press Quake, then drag each circle until all three cross at one point.',
      'Why are two circles not enough to find the epicentre? Where could the quake still be?',
    ],
    id: [
      'Letakkan gempa tepat di samping stasiun A. Stasiun mana yang selisih S−P-nya paling besar? Mengapa?',
      'Nyalakan mode misteri, tekan Gempa, lalu geser tiap lingkaran sampai ketiganya berpotongan di satu titik.',
      'Mengapa dua lingkaran tidak cukup untuk menemukan episentrum? Di mana saja gempa itu masih mungkin berada?',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'An earthquake happens when rock along a fault suddenly slips. The energy released spreads out through the Earth as seismic waves. Two kinds travel through the body of the Earth. P waves (primary waves) push and pull the rock back and forth along the direction they travel, like a sound wave, and they are the fastest; they pass through solids and liquids. S waves (secondary waves) shake the rock from side to side, they travel at roughly half the speed of P waves, and they can only pass through solids. Both start at the same instant, so the farther a seismograph is from the quake, the longer the S wave lags behind the P wave, in the same way that thunder lags further behind lightning the farther away the storm is.',
        'The simulation uses a flat map 600 km by 400 km and simple round speeds: P waves at 8 km/s and S waves at 4 km/s. Click the map to place the quake and press Quake: two rings spread out, and the three stations A, B and C each draw a seismogram showing a small P wiggle followed by a larger S wiggle. Because the S wave takes exactly twice as long as the P wave to cover any distance, the gap between the two arrivals equals the P wave travel time, so the distance in kilometres is simply 8 times the S−P gap in seconds. Many school labs use this same rule of thumb for real seismograms. The playback speed slider only changes how fast you watch; it does not change the physics.',
        'One station tells you how far away the quake was, but not in which direction: the epicentre could be anywhere on a circle of that radius around the station. A second circle crosses the first at two points, and a third circle picks out the right one. The Locate button draws the three circles for you; in mystery mode the epicentre is hidden and you drag each circle to the distance you read off the seismograms until all three cross at one point. This method is usually called triangulation.',
        'The model leaves out a lot. It treats the quake as happening at the surface, while real earthquakes start at a focus 10 to 700 km underground and the epicentre is the point directly above it. It uses constant wave speeds, but in the real Earth speeds increase with depth so wave paths curve. It does not show surface waves, which arrive after the S waves and cause most of the shaking damage, and the wiggles on the traces are only a sketch of what real seismograms look like.',
      ],
      id: [
        'Gempa bumi terjadi ketika batuan di sepanjang patahan tiba-tiba bergeser. Energi yang dilepaskan menyebar ke seluruh Bumi sebagai gelombang seismik. Dua jenis gelombang merambat melalui bagian dalam Bumi. Gelombang P (gelombang primer) mendorong dan menarik batuan maju-mundur searah rambatnya, seperti gelombang bunyi, dan merupakan yang tercepat; gelombang ini melewati zat padat maupun cair. Gelombang S (gelombang sekunder) menggoyang batuan ke samping, kecepatannya kira-kira separuh gelombang P, dan hanya bisa melewati zat padat. Keduanya berangkat pada saat yang sama, sehingga makin jauh seismograf dari gempa, makin lama gelombang S tertinggal di belakang gelombang P, sama seperti guntur yang makin tertinggal di belakang kilat ketika badai makin jauh.',
        'Simulasi ini memakai peta datar berukuran 600 km kali 400 km dan kecepatan bulat yang sederhana: gelombang P 8 km/s dan gelombang S 4 km/s. Klik peta untuk meletakkan gempa dan tekan Gempa: dua lingkaran menyebar, dan ketiga stasiun A, B, dan C masing-masing menggambar seismogram berupa goyangan P kecil yang diikuti goyangan S yang lebih besar. Karena gelombang S membutuhkan waktu tepat dua kali gelombang P untuk menempuh jarak apa pun, selisih antara kedua kedatangan itu sama dengan waktu tempuh gelombang P, sehingga jarak dalam kilometer adalah 8 dikali selisih S−P dalam sekon. Banyak praktikum sekolah memakai aturan praktis yang sama untuk seismogram sungguhan. Slider kecepatan putar hanya mengubah seberapa cepat kamu menonton; fisikanya tidak berubah.',
        'Satu stasiun memberi tahu seberapa jauh gempa itu, tetapi tidak ke arah mana: episentrumnya bisa berada di mana saja pada lingkaran berjari-jari jarak itu di sekeliling stasiun. Lingkaran kedua memotong lingkaran pertama di dua titik, dan lingkaran ketiga memilih titik yang benar. Tombol Temukan menggambar ketiga lingkaran untukmu; dalam mode misteri episentrum disembunyikan dan kamu menggeser tiap lingkaran ke jarak yang kamu baca dari seismogram sampai ketiganya berpotongan di satu titik. Metode ini biasanya disebut triangulasi.',
        'Model ini mengabaikan banyak hal. Gempa dianggap terjadi di permukaan, padahal gempa sungguhan bermula di fokus (hiposentrum) sedalam 10 sampai 700 km di bawah tanah dan episentrum adalah titik tepat di atasnya. Kecepatan gelombang dibuat tetap, padahal di Bumi sebenarnya kecepatan bertambah dengan kedalaman sehingga lintasan gelombang melengkung. Gelombang permukaan, yang tiba setelah gelombang S dan menyebabkan sebagian besar kerusakan akibat guncangan, tidak ditampilkan, dan goyangan pada rekaman hanyalah sketsa dari bentuk seismogram sungguhan.',
      ],
    },
    figure: {
      caption: {
        en: 'P waves (blue ring) spread twice as fast as S waves (red ring). Station A has already felt the P wave but not the S wave. The gap between the two arrivals on its seismogram gives its distance: 8 km/s times the gap in seconds.',
        id: 'Gelombang P (lingkaran biru) menyebar dua kali lebih cepat daripada gelombang S (lingkaran merah). Stasiun A sudah merasakan gelombang P tetapi belum gelombang S. Selisih kedua kedatangan pada seismogramnya memberi jaraknya: 8 km/s dikali selisih dalam sekon.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('P and S wave rings reaching three stations, with a seismogram', 'Lingkaran gelombang P dan S mencapai tiga stasiun, dengan seismogram')}">
  <style>text{font:12px system-ui,sans-serif;fill:currentColor}.m{fill:none;stroke:currentColor;stroke-width:1.2;opacity:.45}.s{font-size:10px}.st{fill:currentColor}</style>
  <rect x="6" y="6" width="226" height="200" rx="4" class="m"/>
  <circle cx="120" cy="106" r="92" fill="none" stroke="#3b82f6" stroke-width="2"/>
  <circle cx="120" cy="106" r="46" fill="none" stroke="#ef4444" stroke-width="2"/>
  <path d="M120 96 L123 103 L130 104 L125 109 L126 116 L120 113 L114 116 L115 109 L110 104 L117 103 Z" fill="#f59e0b"/>
  <text x="128" y="94" class="s">${L('epicentre', 'episentrum')}</text>
  <text x="196" y="40" class="s" fill="#3b82f6">P 8 km/s</text>
  <text x="150" y="150" class="s" fill="#ef4444">S 4 km/s</text>
  <path d="M60 170 L70 186 L50 186 Z" class="st"/><text x="40" y="198" class="s">A</text>
  <path d="M200 150 L210 166 L190 166 Z" class="st"/><text x="214" y="166" class="s">B</text>
  <path d="M120 22 L130 38 L110 38 Z" class="st"/><text x="134" y="34" class="s">C</text>
  <line x1="120" y1="106" x2="60" y2="170" class="m" stroke-dasharray="3 3"/>
  <text x="68" y="140" class="s">${L('distance', 'jarak')}</text>
  <text x="246" y="30" class="s">${L('Seismogram, station A', 'Seismogram, stasiun A')}</text>
  <rect x="244" y="36" width="110" height="110" rx="4" class="m"/>
  <path d="M248 92 L266 92 L269 86 L272 98 L275 88 L278 95 L281 90 L284 93 L296 92 L298 70 L302 116 L306 74 L310 110 L314 80 L318 102 L322 86 L326 96 L330 90 L336 92 L350 92" fill="none" stroke="currentColor" stroke-width="1.4"/>
  <text x="258" y="80" class="s" fill="#3b82f6">P</text>
  <text x="298" y="64" class="s" fill="#ef4444">S</text>
  <path d="M266 124 L266 136 M266 130 L296 130 M296 124 L296 136" fill="none" stroke="#8b5cf6" stroke-width="2"/>
  <text x="281" y="142" text-anchor="middle" class="s" fill="#8b5cf6">${L('S−P gap', 'selisih S−P')}</text>
  <text x="299" y="166" text-anchor="middle" class="s">${L('distance = 8 km/s × gap', 'jarak = 8 km/s × selisih')}</text>
  <text x="299" y="182" text-anchor="middle" class="s">${L('farther station = bigger gap', 'stasiun lebih jauh = selisih lebih besar')}</text>
  <text x="120" y="228" text-anchor="middle" class="s">${L('three circles cross at the epicentre', 'tiga lingkaran berpotongan di episentrum')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'P waves are compressional and travel fastest; S waves are shear waves and travel at roughly half the speed.',
        'Both waves leave the focus together, so the S−P time gap grows with distance from the quake.',
        'With P at 8 km/s and S at 4 km/s, the distance to the quake is 8 times the S−P gap in seconds.',
        'One distance gives a circle of possible positions; three circles cross at a single point, the epicentre.',
        'The sim ignores depth, changing wave speeds and surface waves, so real locating is harder but uses the same idea.',
      ],
      id: [
        'Gelombang P adalah gelombang longitudinal dan merambat paling cepat; gelombang S adalah gelombang geser dan merambat kira-kira separuh kecepatannya.',
        'Kedua gelombang berangkat bersamaan dari fokus, sehingga selisih waktu S−P bertambah seiring jarak dari gempa.',
        'Dengan P 8 km/s dan S 4 km/s, jarak ke gempa adalah 8 dikali selisih S−P dalam sekon.',
        'Satu jarak memberi satu lingkaran kemungkinan posisi; tiga lingkaran berpotongan di satu titik, yaitu episentrum.',
        'Simulasi ini mengabaikan kedalaman, perubahan kecepatan gelombang, dan gelombang permukaan, sehingga penentuan lokasi sungguhan lebih sulit tetapi memakai gagasan yang sama.',
      ],
    },
    vocabulary: {
      en: [
        ['Focus (hypocentre)', 'The point underground where the rock first slips and the seismic waves start.'],
        ['Epicentre', 'The point on the surface directly above the focus. It is what the circles locate.'],
        ['P wave', 'Primary wave: a push-pull (compressional) wave, the fastest seismic wave, able to pass through solids and liquids.'],
        ['S wave', 'Secondary wave: a side-to-side (shear) wave, slower than P, able to pass only through solids.'],
        ['Seismograph', 'An instrument that records ground shaking; its record is called a seismogram.'],
        ['S−P gap', 'The time between the arrival of the P wave and the arrival of the S wave at one station.'],
        ['Triangulation', 'Finding a position from its distances to three known points, by drawing three circles.'],
      ],
      id: [
        ['Fokus (hiposentrum)', 'Titik di bawah tanah tempat batuan pertama kali bergeser dan gelombang seismik bermula.'],
        ['Episentrum', 'Titik di permukaan tepat di atas fokus. Inilah yang ditemukan oleh ketiga lingkaran.'],
        ['Gelombang P', 'Gelombang primer: gelombang dorong-tarik (longitudinal), gelombang seismik tercepat, mampu melewati zat padat dan cair.'],
        ['Gelombang S', 'Gelombang sekunder: gelombang goyang ke samping (geser), lebih lambat dari P, hanya bisa melewati zat padat.'],
        ['Seismograf', 'Alat yang merekam guncangan tanah; rekamannya disebut seismogram.'],
        ['Selisih S−P', 'Waktu antara kedatangan gelombang P dan kedatangan gelombang S di satu stasiun.'],
        ['Triangulasi', 'Menentukan posisi dari jaraknya ke tiga titik yang diketahui, dengan menggambar tiga lingkaran.'],
      ],
    },
    misconceptions: {
      en: [
        ['The epicentre is the place where the earthquake happens.', 'The quake starts at the focus, which can be hundreds of kilometres underground. The epicentre is only the surface point above it; the sim merges the two by treating the quake as happening at the surface.'],
        ['A bigger S−P gap means a bigger earthquake.', 'The gap only tells you distance. A gap of 30 seconds means the quake was about 240 km away, whether it was tiny or huge. Size (magnitude) is judged from how large the wiggles are, which this sim does not measure.'],
        ['Two stations are enough to locate a quake.', 'Two circles cross at two points, so there are two possible epicentres. You need the third circle to decide between them.'],
        ['The first wave to arrive is the most dangerous.', 'The P wave arrives first but shakes the ground least. The S wave shakes harder, and the surface waves that follow usually do the most damage. Early-warning systems use the gentle P wave to warn people before the strong shaking arrives.'],
      ],
      id: [
        ['Episentrum adalah tempat gempa itu terjadi.', 'Gempa bermula di fokus, yang bisa berada ratusan kilometer di bawah tanah. Episentrum hanyalah titik permukaan di atasnya; simulasi menggabungkan keduanya dengan menganggap gempa terjadi di permukaan.'],
        ['Selisih S−P yang lebih besar berarti gempa yang lebih besar.', 'Selisih itu hanya memberi tahu jarak. Selisih 30 sekon berarti gempa berada sekitar 240 km jauhnya, baik gempanya kecil maupun besar. Kekuatan (magnitudo) dinilai dari seberapa besar goyangannya, yang tidak diukur oleh simulasi ini.'],
        ['Dua stasiun sudah cukup untuk menemukan lokasi gempa.', 'Dua lingkaran berpotongan di dua titik, sehingga ada dua kemungkinan episentrum. Lingkaran ketiga diperlukan untuk memilih salah satunya.'],
        ['Gelombang yang tiba pertama adalah yang paling berbahaya.', 'Gelombang P tiba pertama tetapi mengguncang tanah paling lemah. Gelombang S mengguncang lebih keras, dan gelombang permukaan yang menyusul biasanya menyebabkan kerusakan terbesar. Sistem peringatan dini memakai gelombang P yang lembut untuk memperingatkan orang sebelum guncangan kuat tiba.'],
      ],
    },
    realWorld: {
      en: [
        'Indonesia sits where several tectonic plates meet, and the national agency BMKG runs hundreds of seismographs that locate quakes within minutes using exactly this S−P idea, then decides whether to issue a tsunami warning.',
        'Earthquake early-warning systems in Japan, Mexico and California detect the P wave and send phone alerts a few seconds before the stronger S and surface waves arrive, enough time to stop trains and take cover.',
        'Because S waves cannot pass through liquids, there is an S-wave "shadow zone" on the far side of the Earth from any quake, which is how geologists discovered that the Earth\'s outer core is liquid.',
        'Apollo astronauts left seismometers on the Moon; the arrival times of moonquake waves revealed the thickness of the lunar crust.',
      ],
      id: [
        'Indonesia terletak di pertemuan beberapa lempeng tektonik, dan BMKG mengoperasikan ratusan seismograf yang menentukan lokasi gempa dalam hitungan menit dengan gagasan S−P yang sama persis, lalu memutuskan apakah perlu mengeluarkan peringatan tsunami.',
        'Sistem peringatan dini gempa di Jepang, Meksiko, dan California mendeteksi gelombang P dan mengirim peringatan ke ponsel beberapa detik sebelum gelombang S dan gelombang permukaan yang lebih kuat tiba, cukup untuk menghentikan kereta dan berlindung.',
        'Karena gelombang S tidak bisa melewati zat cair, ada "zona bayangan" gelombang S di sisi Bumi yang berseberangan dengan gempa; dari sinilah para ahli geologi menemukan bahwa inti luar Bumi bersifat cair.',
        'Para astronaut Apollo meninggalkan seismometer di Bulan; waktu kedatangan gelombang gempa bulan mengungkapkan ketebalan kerak Bulan.',
      ],
    },
    questions: {
      en: [
        { q: 'Station B records the P wave at 20 s and the S wave at 40 s. How far away is the quake?', a: 'The S−P gap is 20 s, so the distance is 8 km/s × 20 s = 160 km. Check: a P wave at 8 km/s needs 20 s to cover 160 km, and an S wave at 4 km/s needs 40 s, which matches both arrival times.' },
        { q: 'You place the quake right beside station A. Which station shows the largest S−P gap, and why?', a: 'The station farthest from the quake. Station A, almost on top of the quake, gets both waves nearly together, so its gap is almost zero. The farther the waves travel, the more the slower S wave falls behind, so the most distant station (B or C, depending on exactly where you clicked) has the biggest gap.' },
        { q: 'In mystery mode you draw circles around A and B and they cross at two points. Why does the third circle around C settle the question?', a: 'Each circle is the set of all points at the right distance from one station. Two circles generally meet at two points, and the quake could be at either. The third circle passes through only one of those two points, so that point must be the epicentre.' },
      ],
      id: [
        { q: 'Stasiun B merekam gelombang P pada 20 s dan gelombang S pada 40 s. Berapa jauh gempanya?', a: 'Selisih S−P adalah 20 s, jadi jaraknya 8 km/s × 20 s = 160 km. Periksa: gelombang P berkecepatan 8 km/s butuh 20 s untuk menempuh 160 km, dan gelombang S berkecepatan 4 km/s butuh 40 s, cocok dengan kedua waktu kedatangan.' },
        { q: 'Kamu meletakkan gempa tepat di samping stasiun A. Stasiun mana yang menunjukkan selisih S−P terbesar, dan mengapa?', a: 'Stasiun yang paling jauh dari gempa. Stasiun A, yang hampir tepat di atas gempa, menerima kedua gelombang hampir bersamaan, sehingga selisihnya hampir nol. Makin jauh gelombang merambat, makin tertinggal gelombang S yang lebih lambat, sehingga stasiun terjauh (B atau C, tergantung tepatnya di mana kamu mengklik) memiliki selisih terbesar.' },
        { q: 'Dalam mode misteri kamu menggambar lingkaran di sekitar A dan B dan keduanya berpotongan di dua titik. Mengapa lingkaran ketiga di sekitar C menyelesaikan persoalan?', a: 'Setiap lingkaran adalah himpunan semua titik yang berjarak tepat dari satu stasiun. Dua lingkaran umumnya bertemu di dua titik, dan gempa bisa berada di salah satunya. Lingkaran ketiga hanya melewati satu dari kedua titik itu, sehingga titik itulah episentrumnya.' },
      ],
    },
  },
};
