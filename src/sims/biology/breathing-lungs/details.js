// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Explain how the diaphragm moving down makes the chest bigger, lowers the pressure and pulls air in.',
      'Match each part of the bell-jar model to the real body: jar, balloons, tube, rubber sheet.',
      'Describe what happens in an alveolus: oxygen goes into the blood, carbon dioxide comes out.',
    ],
    id: [
      'Menjelaskan bagaimana diafragma yang turun memperbesar rongga dada, menurunkan tekanan, dan menarik udara masuk.',
      'Memasangkan setiap bagian model toples dengan tubuh sungguhan: toples, balon, pipa, lembar karet.',
      'Menjelaskan yang terjadi di alveolus: oksigen masuk ke darah, karbon dioksida keluar.',
    ],
  },
  tryThis: {
    en: [
      'Drag the rubber sheet down slowly. Which changes first: the volume, the pressure, or the air flow?',
      'Switch from rest to running. How many more breaths per minute? How much more air per breath?',
      'Watch the alveolus while running. Do the oxygen dots move faster? Why would the body need that?',
    ],
    id: [
      'Tarik lembar karet ke bawah perlahan. Mana yang berubah lebih dulu: volume, tekanan, atau aliran udara?',
      'Ganti dari istirahat ke berlari. Berapa tambahan napas per menit? Berapa tambahan udara per napas?',
      'Lihat alveolus saat berlari. Apakah titik oksigen bergerak lebih cepat? Mengapa tubuh membutuhkannya?',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'Breathing is a story about pressure. The lungs have no muscles of their own, so they cannot pull air in. Instead, the diaphragm, a dome-shaped sheet of muscle under the lungs, contracts and flattens, and muscles between the ribs lift the ribcage up and out. The chest becomes bigger. The air already inside now has more room, so its pressure falls below the pressure of the air outside, and air is pushed in through the nose, down the windpipe and into the lungs until the two pressures are equal. When the diaphragm relaxes it domes upward again, the stretched lungs spring back, the chest gets smaller, the pressure inside rises above the outside and air flows out.',
        'The bell-jar model on the left shows the same idea with everyday objects. The glass jar is the ribcage, the Y-shaped tube is the windpipe splitting into two bronchi, the two balloons are the lungs and the rubber sheet across the bottom is the diaphragm. Drag the sheet down and the space inside the jar grows, so the balloons fill; let it up and they shrink. The real chest next to it moves in step so you can match each part. The readout tells you in words whether the chest volume is big or small, whether the pressure is lower or higher than outside, and whether air is flowing in or out.',
        'The activity selector changes two numbers that the body adjusts automatically. Resting, you take about 15 breaths a minute and each one moves about 500 mL of air. Walking raises both, and running in the sim uses 40 breaths a minute of 2000 mL each. The readout multiplies them: air per minute equals breaths per minute times air per breath, so resting moves 7.5 L a minute while running moves 80 L. Working muscles need far more oxygen and make far more carbon dioxide, and the alveolus close-up shows why that matters: oxygen dots cross from the air sac into the blood, which turns from blue to red as it picks them up, while carbon dioxide dots cross the other way to be breathed out.',
        'The model leaves things out. The jar is rigid, so the model has no rib muscles, while the real chest uses both the diaphragm and the ribs. Breathing in the sim follows a smooth, perfectly regular rhythm, and pressure is described in words because the real difference is tiny, only about one percent of atmospheric pressure. The activity numbers are typical round values, not measurements of any one person. The alveolus shows a handful of dots standing in for billions of molecules, and the blood colours are a code: real blood low in oxygen is dark red, not blue.',
      ],
      id: [
        'Bernapas adalah cerita tentang tekanan. Paru-paru tidak punya otot sendiri, sehingga tidak bisa menarik udara masuk. Yang bekerja adalah diafragma, selembar otot berbentuk kubah di bawah paru-paru, yang berkontraksi dan mendatar, dibantu otot di antara tulang rusuk yang mengangkat rongga dada ke atas dan ke luar. Rongga dada menjadi lebih besar. Udara yang sudah ada di dalam kini punya ruang lebih luas, sehingga tekanannya turun di bawah tekanan udara luar, dan udara terdorong masuk lewat hidung, turun melalui tenggorokan, ke dalam paru-paru sampai kedua tekanan sama. Saat diafragma mengendur, ia kembali melengkung ke atas, paru-paru yang teregang menyusut kembali, rongga dada mengecil, tekanan di dalam naik melebihi tekanan luar, dan udara mengalir keluar.',
        'Model toples di sebelah kiri menunjukkan gagasan yang sama dengan benda sehari-hari. Toples kaca adalah rongga dada, pipa berbentuk Y adalah tenggorokan yang bercabang menjadi dua bronkus, dua balon adalah paru-paru, dan lembar karet di bagian bawah adalah diafragma. Tarik lembar karet ke bawah dan ruang di dalam toples membesar, sehingga balon terisi; lepaskan dan balon mengempis. Dada sungguhan di sebelahnya bergerak serempak supaya kamu bisa memasangkan tiap bagian. Panel bacaan memberitahu dengan kata-kata apakah volume dada besar atau kecil, apakah tekanan lebih rendah atau lebih tinggi daripada di luar, dan apakah udara mengalir masuk atau keluar.',
        'Pemilih aktivitas mengubah dua angka yang diatur tubuh secara otomatis. Saat istirahat, kamu bernapas sekitar 15 kali per menit dan tiap napas memindahkan sekitar 500 mL udara. Berjalan menaikkan keduanya, dan berlari di simulasi memakai 40 napas per menit dengan 2000 mL tiap napas. Panel bacaan mengalikannya: udara per menit sama dengan napas per menit dikali udara per napas, sehingga istirahat memindahkan 7,5 L per menit sedangkan berlari memindahkan 80 L. Otot yang bekerja membutuhkan jauh lebih banyak oksigen dan menghasilkan jauh lebih banyak karbon dioksida, dan tampilan alveolus menunjukkan mengapa itu penting: titik oksigen menyeberang dari kantong udara ke darah, yang berubah dari biru ke merah saat menyerapnya, sementara titik karbon dioksida menyeberang ke arah sebaliknya untuk dihembuskan.',
        'Model ini mengabaikan beberapa hal. Toplesnya kaku, jadi model tidak punya otot rusuk, padahal dada sungguhan memakai diafragma dan tulang rusuk sekaligus. Napas di simulasi mengikuti irama yang mulus dan teratur sempurna, dan tekanan dijelaskan dengan kata-kata karena selisih sebenarnya sangat kecil, hanya sekitar satu persen dari tekanan atmosfer. Angka aktivitasnya adalah nilai bulat yang umum, bukan hasil pengukuran satu orang tertentu. Alveolus hanya menampilkan beberapa titik yang mewakili miliaran molekul, dan warna darahnya adalah kode: darah sungguhan yang miskin oksigen berwarna merah tua, bukan biru.',
      ],
    },
    figure: {
      caption: {
        en: 'Breathing in: the diaphragm contracts and flattens, the chest volume grows, the pressure inside falls and air flows in. Breathing out: the diaphragm relaxes into a dome, the volume shrinks, the pressure rises and air flows out.',
        id: 'Menarik napas: diafragma berkontraksi dan mendatar, volume dada membesar, tekanan di dalam turun, dan udara masuk. Menghembuskan napas: diafragma mengendur menjadi kubah, volume mengecil, tekanan naik, dan udara keluar.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Diaphragm positions when breathing in and out', 'Posisi diafragma saat menarik dan menghembuskan napas')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.c{fill:none;stroke:currentColor;stroke-width:1.5;opacity:.6}.lu{fill:#3b82f6;opacity:.35;stroke:#3b82f6;stroke-width:1.5}.di{fill:none;stroke:#f59e0b;stroke-width:4;stroke-linecap:round}.a{stroke-width:3;fill:none}</style>
  <text x="90" y="16" text-anchor="middle" font-weight="bold">${L('Breathing in', 'Menarik napas')}</text>
  <ellipse cx="90" cy="110" rx="62" ry="70" class="c"/>
  <line x1="90" y1="24" x2="90" y2="70" stroke="currentColor" stroke-width="5" opacity=".6"/>
  <path d="M90 70 L66 86 M90 70 L114 86" stroke="currentColor" stroke-width="4" opacity=".6" fill="none"/>
  <ellipse cx="64" cy="118" rx="24" ry="40" class="lu"/>
  <ellipse cx="116" cy="118" rx="24" ry="40" class="lu"/>
  <path d="M34 160 Q90 170 146 160" class="di"/>
  <line x1="90" y1="178" x2="90" y2="196" class="a" stroke="#f59e0b" marker-end="url(#m)"/>
  <line x1="108" y1="30" x2="108" y2="56" class="a" stroke="#10b981" marker-end="url(#m)"/>
  <text x="114" y="46" fill="#10b981">${L('air in', 'udara masuk')}</text>
  <text x="90" y="214" text-anchor="middle" font-size="10">${L('diaphragm down: volume up', 'diafragma turun: volume naik')}</text>
  <text x="90" y="228" text-anchor="middle" font-size="10">${L('pressure inside falls below outside', 'tekanan di dalam turun di bawah luar')}</text>
  <text x="270" y="16" text-anchor="middle" font-weight="bold">${L('Breathing out', 'Menghembuskan napas')}</text>
  <ellipse cx="270" cy="110" rx="54" ry="64" class="c"/>
  <line x1="270" y1="24" x2="270" y2="70" stroke="currentColor" stroke-width="5" opacity=".6"/>
  <path d="M270 70 L250 84 M270 70 L290 84" stroke="currentColor" stroke-width="4" opacity=".6" fill="none"/>
  <ellipse cx="248" cy="110" rx="19" ry="30" class="lu"/>
  <ellipse cx="292" cy="110" rx="19" ry="30" class="lu"/>
  <path d="M220 160 Q270 112 320 160" class="di"/>
  <line x1="270" y1="172" x2="270" y2="152" class="a" stroke="#f59e0b" marker-end="url(#m)"/>
  <line x1="288" y1="56" x2="288" y2="30" class="a" stroke="#ef4444" marker-end="url(#m)"/>
  <text x="294" y="46" fill="#ef4444">${L('air out', 'udara keluar')}</text>
  <text x="270" y="214" text-anchor="middle" font-size="10">${L('diaphragm domes up: volume down', 'diafragma melengkung naik: volume turun')}</text>
  <text x="270" y="228" text-anchor="middle" font-size="10">${L('pressure inside rises above outside', 'tekanan di dalam naik di atas luar')}</text>
  <text x="180" y="186" text-anchor="middle" fill="#f59e0b" font-size="10">${L('diaphragm', 'diafragma')}</text>
  <text x="180" y="110" text-anchor="middle" fill="#3b82f6" font-size="10">${L('lungs', 'paru-paru')}</text>
  <defs><marker id="m" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="context-stroke"/></marker></defs>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Air moves because of a pressure difference: in when the pressure in the lungs is lower than outside, out when it is higher.',
        'The diaphragm contracting and flattening makes the chest bigger; the lungs themselves have no muscles.',
        'Breathing out at rest is mostly passive: the diaphragm relaxes and the stretched lungs spring back.',
        'Air per minute equals breaths per minute times air per breath, and exercise raises both.',
        'In the alveoli, oxygen passes into the blood and carbon dioxide passes out, each moving from where it is more concentrated to where it is less.',
      ],
      id: [
        'Udara bergerak karena beda tekanan: masuk saat tekanan di paru-paru lebih rendah daripada di luar, keluar saat lebih tinggi.',
        'Diafragma yang berkontraksi dan mendatar membuat rongga dada lebih besar; paru-paru sendiri tidak punya otot.',
        'Menghembuskan napas saat istirahat sebagian besar pasif: diafragma mengendur dan paru-paru yang teregang menyusut kembali.',
        'Udara per menit sama dengan napas per menit dikali udara per napas, dan olahraga menaikkan keduanya.',
        'Di alveolus, oksigen masuk ke darah dan karbon dioksida keluar, masing-masing bergerak dari tempat yang lebih pekat ke tempat yang kurang pekat.',
      ],
    },
    vocabulary: {
      en: [
        ['Diaphragm', 'The dome-shaped sheet of muscle under the lungs; it flattens to breathe in and relaxes upward to breathe out.'],
        ['Windpipe (trachea)', 'The tube that carries air from the throat down to the lungs, where it splits into two bronchi; the Y tube in the model.'],
        ['Alveolus', 'One of millions of tiny air sacs in the lungs where oxygen and carbon dioxide swap between air and blood.'],
        ['Air per breath (tidal volume)', 'The amount of air moved in one normal breath, about 500 mL at rest.'],
        ['Breathing rate', 'The number of breaths taken per minute, about 12 to 20 at rest.'],
        ['Air pressure', 'The push of air on its surroundings; air flows from higher pressure to lower pressure.'],
        ['Gas exchange', 'Oxygen moving into the blood and carbon dioxide moving out of it across the thin wall of an alveolus.'],
      ],
      id: [
        ['Diafragma', 'Lembar otot berbentuk kubah di bawah paru-paru; mendatar saat menarik napas dan mengendur ke atas saat menghembuskan napas.'],
        ['Tenggorokan (trakea)', 'Saluran yang membawa udara dari kerongkongan turun ke paru-paru, lalu bercabang menjadi dua bronkus; pipa Y pada model.'],
        ['Alveolus', 'Satu dari jutaan kantong udara kecil di paru-paru tempat oksigen dan karbon dioksida bertukar antara udara dan darah.'],
        ['Udara per napas (volume tidal)', 'Jumlah udara yang dipindahkan dalam satu napas normal, sekitar 500 mL saat istirahat.'],
        ['Laju napas', 'Jumlah napas per menit, sekitar 12 sampai 20 saat istirahat.'],
        ['Tekanan udara', 'Dorongan udara pada sekitarnya; udara mengalir dari tekanan tinggi ke tekanan rendah.'],
        ['Pertukaran gas', 'Oksigen berpindah ke dalam darah dan karbon dioksida berpindah keluar melewati dinding tipis alveolus.'],
      ],
    },
    misconceptions: {
      en: [
        ['The lungs suck air in by themselves.', 'Lungs have no muscle. The diaphragm and rib muscles make the chest bigger, the pressure inside drops, and the higher pressure outside pushes air in.'],
        ['The diaphragm moves up when you breathe in.', 'It moves down. Contracting flattens the dome and pulls it towards the belly, which is why your stomach pushes out slightly when you take a deep breath.'],
        ['We breathe in oxygen and breathe out carbon dioxide.', 'We breathe in air that is about 21% oxygen and 0.04% carbon dioxide, and breathe out air that is still about 16% oxygen and about 4% carbon dioxide. Only a fraction of the oxygen is taken up on each breath.'],
        ['Breathing and respiration are the same thing.', 'Breathing is the movement of air in and out of the lungs. Respiration is the chemical process in every cell that uses oxygen to release energy from food and produces carbon dioxide. Breathing supplies respiration.'],
      ],
      id: [
        ['Paru-paru menyedot udara masuk dengan sendirinya.', 'Paru-paru tidak punya otot. Diafragma dan otot rusuk memperbesar rongga dada, tekanan di dalam turun, dan tekanan luar yang lebih tinggi mendorong udara masuk.'],
        ['Diafragma bergerak ke atas saat menarik napas.', 'Diafragma bergerak ke bawah. Kontraksi mendatarkan kubahnya dan menariknya ke arah perut, itulah sebabnya perutmu sedikit menonjol saat menarik napas dalam.'],
        ['Kita menghirup oksigen dan menghembuskan karbon dioksida.', 'Kita menghirup udara yang sekitar 21% oksigen dan 0,04% karbon dioksida, dan menghembuskan udara yang masih sekitar 16% oksigen dan sekitar 4% karbon dioksida. Hanya sebagian oksigen yang diambil pada tiap napas.'],
        ['Bernapas dan respirasi adalah hal yang sama.', 'Bernapas adalah gerakan udara masuk dan keluar paru-paru. Respirasi adalah proses kimia di setiap sel yang memakai oksigen untuk melepaskan energi dari makanan dan menghasilkan karbon dioksida. Bernapas memasok respirasi.'],
      ],
    },
    realWorld: {
      en: [
        'The iron lung used for polio patients in the 1950s was a bell-jar model in reverse: a pump lowered the pressure around the patient\'s chest so air was pushed into the lungs.',
        'A hiccup is a sudden, involuntary contraction of the diaphragm followed by the vocal cords snapping shut, which makes the sound.',
        'At high altitude the outside air pressure is lower and each breath brings in fewer oxygen molecules, so climbers breathe faster and deeper, just like switching to a higher activity in the sim.',
        'A spirometer in a clinic measures the air per breath and the total a person can blow out; asthma and smoking damage show up as smaller or slower volumes.',
      ],
      id: [
        'Paru-paru besi yang dipakai pasien polio pada 1950-an adalah model toples terbalik: pompa menurunkan tekanan di sekitar dada pasien sehingga udara terdorong masuk ke paru-paru.',
        'Cegukan adalah kontraksi diafragma yang tiba-tiba dan tak disengaja, diikuti pita suara yang menutup mendadak, dan itulah yang menimbulkan bunyinya.',
        'Di dataran tinggi tekanan udara luar lebih rendah dan tiap napas membawa lebih sedikit molekul oksigen, sehingga pendaki bernapas lebih cepat dan lebih dalam, seperti berpindah ke aktivitas yang lebih berat di simulasi.',
        'Spirometer di klinik mengukur udara per napas dan total udara yang bisa dihembuskan seseorang; asma dan kerusakan akibat rokok tampak sebagai volume yang lebih kecil atau lebih lambat.',
      ],
    },
    questions: {
      en: [
        { q: 'Drag the rubber sheet down very slowly. In what order do the volume, the pressure and the air flow change, and why that order?', a: 'Volume first, because moving the sheet directly makes the space bigger. The pressure falls a moment later because the same air now fills more space. Air then flows in because of that pressure difference. The sim shows the readout flipping to "lower than outside" and "air IN" as soon as the sheet starts moving.' },
        { q: 'Compare Resting with Running. Running takes fewer than three times as many breaths, so why does it move more than ten times as much air per minute?', a: 'Because both numbers go up. Breaths rise from 15 to 40 a minute (under 3 times) and each breath grows from 500 mL to 2000 mL (4 times). Air per minute is their product: 15 × 500 = 7500 mL against 40 × 2000 = 80 000 mL, about 10.7 times more.' },
        { q: 'The "Air in lungs" reading never falls below 2500 mL, even at the end of a breath out. What does that tell you about the lungs?', a: 'The lungs never empty completely. After a normal breath out about 2.5 L stays behind, keeping the alveoli open so gas exchange continues between breaths. Each breath only swaps a part of the air, which is why breathed-out air still contains plenty of oxygen.' },
      ],
      id: [
        { q: 'Tarik lembar karet ke bawah dengan sangat perlahan. Dalam urutan apa volume, tekanan, dan aliran udara berubah, dan mengapa urutannya begitu?', a: 'Volume lebih dulu, karena menggerakkan lembar karet langsung memperbesar ruang. Tekanan turun sesaat kemudian karena udara yang sama kini mengisi ruang yang lebih luas. Lalu udara mengalir masuk karena beda tekanan itu. Simulasi menunjukkan panel berubah menjadi "lebih rendah dari luar" dan "udara MASUK" begitu lembar karet mulai bergerak.' },
        { q: 'Bandingkan Istirahat dengan Berlari. Berlari napasnya kurang dari tiga kali lebih banyak, jadi mengapa udara per menitnya lebih dari sepuluh kali lipat?', a: 'Karena kedua angkanya naik. Napas naik dari 15 ke 40 per menit (kurang dari 3 kali) dan tiap napas membesar dari 500 mL ke 2000 mL (4 kali). Udara per menit adalah hasil kalinya: 15 × 500 = 7500 mL berbanding 40 × 2000 = 80.000 mL, sekitar 10,7 kali lebih banyak.' },
        { q: 'Bacaan "Udara di paru-paru" tidak pernah turun di bawah 2500 mL, bahkan di akhir hembusan napas. Apa artinya bagi paru-paru?', a: 'Paru-paru tidak pernah kosong sepenuhnya. Setelah hembusan normal, sekitar 2,5 L tetap tinggal, menjaga alveolus tetap terbuka sehingga pertukaran gas berlanjut di antara napas. Tiap napas hanya menukar sebagian udara, itulah sebabnya udara yang dihembuskan masih mengandung banyak oksigen.' },
      ],
    },
  },
};
