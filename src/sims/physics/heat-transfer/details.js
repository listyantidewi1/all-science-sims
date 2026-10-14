// Long-form text for the sim page aside (lazy-loaded).
export default {
  objectives: {
    en: [
      'Name the three ways heat moves: conduction, convection and radiation.',
      'Compare how fast heat travels along rods of different materials.',
      'Explain why dark surfaces warm up faster than shiny surfaces in the sun.',
    ],
    id: [
      'Menyebutkan tiga cara perpindahan kalor: konduksi, konveksi dan radiasi.',
      'Membandingkan seberapa cepat kalor merambat pada batang dari bahan yang berbeda.',
      'Menjelaskan mengapa permukaan gelap lebih cepat panas daripada permukaan mengkilap di bawah sinar matahari.',
    ],
  },
  tryThis: {
    en: [
      'Heat a copper rod and a wood rod for 30 seconds each. How different is the far-end temperature?',
      'Drop dye into the beaker. Which way does it move above the heater, and which way at the sides?',
      'Turn the lamp brightness down. Does the black can still end up hotter than the shiny one?',
    ],
    id: [
      'Panaskan batang tembaga dan batang kayu masing-masing 30 detik. Seberapa beda suhu ujung jauhnya?',
      'Teteskan pewarna ke gelas kimia. Ke arah mana pewarna bergerak di atas pemanas, dan ke mana di sisi gelas?',
      'Kecilkan terang lampu. Apakah kaleng hitam tetap lebih panas daripada kaleng mengkilap?',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'Heat is energy on the move from a hotter object to a cooler one, and it keeps moving until both are at the same temperature. It travels in three ways. In conduction, heat passes through a material from particle to particle: particles at the hot end vibrate harder, jostle their neighbours, and the neighbours pass the energy on. In convection, a warm liquid or gas moves bodily and carries its heat with it. In radiation, heat travels as invisible infrared waves that need no material at all, which is how the Sun warms the Earth across empty space.',
        'The Conduction tab holds one end of a rod in a 300 °C flame and colours each small section by its temperature. The rod material sets how fast heat spreads along it: copper is an excellent conductor, steel a fair one, and glass and wood are poor conductors, also called insulators. Each section also leaks a little heat to the room air, so the far end of a wooden rod hardly warms at all. The speeds are only roughly in proportion to real materials, and glass and wood are made a little faster than in real life so that something visibly happens within a minute.',
        'The Convection tab heats the bottom of a beaker of water, drawn as many small blobs. Water that is warmed expands and becomes less dense, so the cooler, denser water around it pushes it upward; near the surface it cools again and sinks down the sides. This loop is a convection current, and the dye button marks a cluster of blobs so you can follow it round. Switching the heater off lets the current fade away. The thermometer shows the average temperature of the water near the top of the beaker.',
        'The Radiation tab shines a lamp on two cans. Both receive the same radiation, but the black can absorbs about 95% of it while the shiny can reflects most of it and absorbs only about 10%, so the black can warms much more. Both cans also lose heat to the room at the same rate, so each settles at a steady temperature where heat gained equals heat lost. The brightness slider sets how much radiation arrives. The sim lumps all heat loss into one simple cooling rate and ignores the air warming up around the cans.',
      ],
      id: [
        'Kalor adalah energi yang berpindah dari benda yang lebih panas ke benda yang lebih dingin, dan terus berpindah sampai suhu keduanya sama. Ada tiga cara perpindahannya. Pada konduksi, kalor merambat melalui bahan dari partikel ke partikel: partikel di ujung panas bergetar lebih kuat, menumbuk tetangganya, dan tetangga itu meneruskan energinya. Pada konveksi, zat cair atau gas yang hangat ikut bergerak dan membawa kalornya. Pada radiasi, kalor merambat sebagai gelombang inframerah yang tak terlihat dan tidak butuh zat perantara; begitulah Matahari menghangatkan Bumi melewati ruang hampa.',
        'Tab Konduksi menahan satu ujung batang di api bersuhu 300 °C dan mewarnai tiap bagian kecil batang sesuai suhunya. Bahan batang menentukan seberapa cepat kalor menyebar: tembaga penghantar yang sangat baik, baja cukup baik, sedangkan kaca dan kayu penghantar yang buruk, disebut juga isolator. Tiap bagian juga melepas sedikit kalor ke udara ruangan, sehingga ujung jauh batang kayu hampir tidak menghangat. Kecepatannya hanya kira-kira sebanding dengan bahan sungguhan; kaca dan kayu dibuat sedikit lebih cepat daripada aslinya supaya ada yang terlihat berubah dalam satu menit.',
        'Tab Konveksi memanaskan dasar gelas kimia berisi air, yang digambar sebagai banyak bulatan kecil. Air yang dipanaskan memuai dan massa jenisnya mengecil, sehingga air di sekitarnya yang lebih dingin dan lebih rapat mendorongnya ke atas; di dekat permukaan air itu mendingin lagi dan turun di sisi gelas. Putaran ini disebut arus konveksi, dan tombol pewarna menandai sekelompok bulatan supaya kamu bisa mengikutinya berputar. Jika pemanas dimatikan, arusnya perlahan hilang. Termometer menunjukkan suhu rata-rata air di dekat bagian atas gelas.',
        'Tab Radiasi menyorotkan lampu ke dua kaleng. Keduanya menerima radiasi yang sama, tetapi kaleng hitam menyerap sekitar 95% radiasi itu sedangkan kaleng mengkilap memantulkan sebagian besar dan hanya menyerap sekitar 10%, sehingga kaleng hitam jauh lebih cepat panas. Kedua kaleng juga melepas kalor ke ruangan dengan laju yang sama, sehingga masing-masing berhenti pada suhu tetap ketika kalor yang diterima sama dengan kalor yang hilang. Slider terang lampu mengatur banyaknya radiasi yang datang. Simulasi ini menyatukan semua kehilangan kalor menjadi satu laju pendinginan sederhana dan mengabaikan udara di sekitar kaleng yang ikut menghangat.',
      ],
    },
    figure: {
      caption: {
        en: 'Three ways heat moves. Conduction: energy passes along the rod from particle to particle. Convection: warm water rises, cool water sinks, forming a loop. Radiation: infrared waves cross empty space; a dark surface absorbs them, a shiny one reflects them.',
        id: 'Tiga cara kalor berpindah. Konduksi: energi merambat sepanjang batang dari partikel ke partikel. Konveksi: air hangat naik, air dingin turun, membentuk putaran. Radiasi: gelombang inframerah melintasi ruang kosong; permukaan gelap menyerapnya, permukaan mengkilap memantulkannya.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Conduction, convection and radiation side by side', 'Konduksi, konveksi dan radiasi berdampingan')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.t{font-weight:600;text-anchor:middle}.s{font-size:9.5px;text-anchor:middle}.m{fill:none;stroke:currentColor;stroke-width:1.4}.a{stroke-width:2;fill:none}</style>
  <defs>
    <marker id="hr" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto"><path d="M0 0 L7 3.5 L0 7 z" fill="#ef4444"/></marker>
    <marker id="hb" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto"><path d="M0 0 L7 3.5 L0 7 z" fill="#3b82f6"/></marker>
  </defs>
  <line x1="120" y1="30" x2="120" y2="215" class="m" opacity=".25" stroke-dasharray="3 4"/>
  <line x1="240" y1="30" x2="240" y2="215" class="m" opacity=".25" stroke-dasharray="3 4"/>
  <text x="60" y="22" class="t">${L('Conduction', 'Konduksi')}</text>
  <rect x="18" y="100" width="24" height="16" fill="#ef4444"/>
  <rect x="42" y="100" width="24" height="16" fill="#f59e0b"/>
  <rect x="66" y="100" width="24" height="16" fill="#f59e0b" opacity=".45"/>
  <rect x="90" y="100" width="18" height="16" fill="#3b82f6" opacity=".55"/>
  <rect x="18" y="100" width="90" height="16" class="m"/>
  <path d="M22 142 Q30 112 38 142 Q30 136 22 142" fill="#f59e0b"/>
  <path d="M26 142 Q30 124 34 142 Z" fill="#ef4444"/>
  <rect x="16" y="142" width="28" height="4" fill="currentColor" opacity=".6"/>
  <path d="M24 80 L96 80" class="a" stroke="#ef4444" marker-end="url(#hr)"/>
  <text x="60" y="70" class="s">${L('heat flows along the rod', 'kalor merambat di batang')}</text>
  <text x="60" y="170" class="s">${L('hot end to cold end,', 'ujung panas ke ujung dingin,')}</text>
  <text x="60" y="182" class="s">${L('particle to particle', 'dari partikel ke partikel')}</text>
  <text x="180" y="22" class="t">${L('Convection', 'Konveksi')}</text>
  <path d="M140 62 L140 150 L220 150 L220 62" class="m"/>
  <rect x="165" y="153" width="30" height="5" fill="#ef4444"/>
  <path d="M180 142 L180 82" class="a" stroke="#ef4444" marker-end="url(#hr)"/>
  <path d="M152 84 L152 140" class="a" stroke="#3b82f6" marker-end="url(#hb)"/>
  <path d="M208 84 L208 140" class="a" stroke="#3b82f6" marker-end="url(#hb)"/>
  <path d="M176 74 L156 74" class="a" stroke="#3b82f6" opacity=".7"/>
  <path d="M184 74 L204 74" class="a" stroke="#3b82f6" opacity=".7"/>
  <text x="180" y="170" class="s">${L('warm water rises,', 'air hangat naik,')}</text>
  <text x="180" y="182" class="s">${L('cool water sinks', 'air dingin turun')}</text>
  <text x="300" y="22" class="t">${L('Radiation', 'Radiasi')}</text>
  <circle cx="300" cy="52" r="10" fill="#f59e0b"/>
  <path d="M292 60 L274 98" class="a" stroke="#f59e0b" stroke-dasharray="4 3"/>
  <path d="M308 60 L326 98" class="a" stroke="#f59e0b" stroke-dasharray="4 3"/>
  <path d="M328 100 L350 76" class="a" stroke="#f59e0b" stroke-dasharray="4 3" opacity=".8"/>
  <rect x="260" y="100" width="24" height="42" fill="currentColor"/>
  <rect x="316" y="100" width="24" height="42" class="m"/>
  <text x="272" y="156" class="s">${L('black', 'hitam')}</text>
  <text x="328" y="156" class="s">${L('shiny', 'mengkilap')}</text>
  <text x="300" y="170" class="s">${L('waves need no material;', 'gelombang tanpa perantara;')}</text>
  <text x="300" y="182" class="s">${L('dark absorbs, shiny reflects', 'gelap menyerap, kilap memantulkan')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Heat always moves from the hotter object to the cooler one, never the other way by itself.',
        'Conduction passes energy from particle to particle through a material; metals do this fastest.',
        'Convection happens in liquids and gases: warm fluid rises because it is less dense, cool fluid sinks, and a current forms.',
        'Radiation carries heat as infrared waves through empty space; no particles are needed.',
        'Dark, dull surfaces absorb radiation well; light, shiny surfaces reflect it and stay cooler.',
      ],
      id: [
        'Kalor selalu berpindah dari benda yang lebih panas ke yang lebih dingin, tidak pernah sebaliknya dengan sendirinya.',
        'Konduksi meneruskan energi dari partikel ke partikel di dalam bahan; logam melakukannya paling cepat.',
        'Konveksi terjadi pada zat cair dan gas: fluida hangat naik karena massa jenisnya lebih kecil, fluida dingin turun, dan terbentuklah arus.',
        'Radiasi membawa kalor sebagai gelombang inframerah melalui ruang hampa; tidak perlu partikel.',
        'Permukaan gelap dan kusam menyerap radiasi dengan baik; permukaan terang dan mengkilap memantulkannya dan tetap lebih dingin.',
      ],
    },
    vocabulary: {
      en: [
        ['Heat', 'Energy that moves from a hotter object to a cooler one because of the temperature difference.'],
        ['Conduction', 'Heat transfer through a material by particles passing energy to their neighbours, without the material moving.'],
        ['Convection', 'Heat transfer by the movement of a warm liquid or gas, which carries energy with it.'],
        ['Radiation', 'Heat transfer by infrared waves, which can travel through empty space.'],
        ['Conductor', 'A material that lets heat pass through quickly, such as copper or steel.'],
        ['Insulator', 'A material that lets heat pass through only slowly, such as wood, glass or air.'],
        ['Convection current', 'The circular flow set up when warm fluid rises and cool fluid sinks to replace it.'],
      ],
      id: [
        ['Kalor', 'Energi yang berpindah dari benda yang lebih panas ke yang lebih dingin karena perbedaan suhu.'],
        ['Konduksi', 'Perpindahan kalor melalui bahan oleh partikel yang meneruskan energi ke tetangganya, tanpa bahannya ikut berpindah.'],
        ['Konveksi', 'Perpindahan kalor oleh gerakan zat cair atau gas yang hangat, yang membawa energinya.'],
        ['Radiasi', 'Perpindahan kalor oleh gelombang inframerah, yang dapat merambat melalui ruang hampa.'],
        ['Konduktor', 'Bahan yang meneruskan kalor dengan cepat, misalnya tembaga atau baja.'],
        ['Isolator', 'Bahan yang meneruskan kalor dengan lambat, misalnya kayu, kaca atau udara.'],
        ['Arus konveksi', 'Aliran berputar yang terbentuk ketika fluida hangat naik dan fluida dingin turun menggantikannya.'],
      ],
    },
    misconceptions: {
      en: [
        ['A metal spoon is colder than a wooden spoon in the same room.', 'Both are at room temperature. Metal feels colder because it conducts heat away from your hand much faster, so your skin cools quickly.'],
        ['Heat rises.', 'Hot liquid or gas rises, because it is less dense. Heat itself moves in any direction: conduction carries it downward through a pan base, and the Sun radiates heat down onto the ground.'],
        ['Cold flows into things and makes them cold.', 'There is no substance called cold. An object cools because heat flows out of it into something cooler.'],
        ['A shiny can gets just as hot in the sun as a black one; colour only matters for looks.', 'A shiny surface reflects most of the radiation that hits it, so it absorbs less and stays noticeably cooler. The sim shows the difference clearly.'],
      ],
      id: [
        ['Sendok logam lebih dingin daripada sendok kayu di ruangan yang sama.', 'Keduanya bersuhu ruang. Logam terasa lebih dingin karena menghantarkan kalor dari tanganmu jauh lebih cepat, sehingga kulitmu cepat mendingin.'],
        ['Kalor naik ke atas.', 'Yang naik adalah zat cair atau gas yang panas, karena massa jenisnya lebih kecil. Kalor sendiri berpindah ke segala arah: konduksi membawanya ke bawah melalui dasar panci, dan Matahari meradiasikan kalor ke bawah ke tanah.'],
        ['Dingin mengalir masuk ke benda dan membuatnya dingin.', 'Tidak ada zat yang bernama dingin. Benda mendingin karena kalor mengalir keluar darinya ke benda lain yang lebih dingin.'],
        ['Kaleng mengkilap sama panasnya dengan kaleng hitam di bawah sinar matahari; warna hanya soal penampilan.', 'Permukaan mengkilap memantulkan sebagian besar radiasi yang mengenainya, sehingga menyerap lebih sedikit dan tetap jauh lebih dingin. Simulasi menunjukkan selisihnya dengan jelas.'],
      ],
    },
    realWorld: {
      en: [
        'Cooking pans have metal bases to conduct heat quickly into the food, but plastic or wooden handles so the heat does not reach your hand.',
        'A room heater warms the air beside it, which rises; cooler air moves in to replace it, so a convection current slowly warms the whole room.',
        'Sea breezes form by convection: on a sunny afternoon the land heats faster than the sea, warm air rises over the land and cooler air flows in from the sea.',
        'Houses in hot climates are often painted white, and emergency blankets are shiny, so they reflect radiation instead of absorbing it.',
      ],
      id: [
        'Panci memiliki dasar logam agar kalor cepat merambat ke makanan, tetapi gagangnya dari plastik atau kayu supaya kalor tidak sampai ke tangan.',
        'Pemanas ruangan menghangatkan udara di sampingnya, yang lalu naik; udara yang lebih dingin masuk menggantikannya, sehingga arus konveksi perlahan menghangatkan seluruh ruangan.',
        'Angin laut terbentuk karena konveksi: pada siang yang terik daratan lebih cepat panas daripada laut, udara hangat naik di atas daratan dan udara yang lebih dingin mengalir masuk dari laut.',
        'Rumah di daerah panas sering dicat putih, dan selimut darurat dibuat mengkilap, supaya memantulkan radiasi dan tidak menyerapnya.',
      ],
    },
    questions: {
      en: [
        { q: 'After 20 seconds of heating, the far end of the copper rod is much hotter than the far end of the steel rod. Why?', a: 'Copper is a better conductor: its particles pass vibration energy to their neighbours much faster than steel does, so the heat reaches the far end sooner. Steel is still a conductor, just a slower one, and wood is slower still.' },
        { q: 'Why does the dye in the beaker travel upward in the middle but downward near the glass walls?', a: 'The heater is under the middle of the beaker. Water there warms, expands and becomes less dense, so the cooler water around it pushes it up. At the top it loses heat, becomes denser and sinks down the sides, completing the convection loop.' },
        { q: 'You turn the lamp brightness down to 50%. Will the black can still end up hotter than the shiny can?', a: 'Yes. Both cans now receive half as much radiation, but the black can still absorbs about 95% of what arrives and the shiny can only about 10%. Both final temperatures are lower, and the gap between them is smaller, but the order stays the same.' },
      ],
      id: [
        { q: 'Setelah 20 detik dipanaskan, ujung jauh batang tembaga jauh lebih panas daripada ujung jauh batang baja. Mengapa?', a: 'Tembaga penghantar yang lebih baik: partikelnya meneruskan energi getaran ke tetangganya jauh lebih cepat daripada baja, sehingga kalor lebih cepat sampai ke ujung jauh. Baja tetap konduktor, hanya lebih lambat, dan kayu lebih lambat lagi.' },
        { q: 'Mengapa pewarna di gelas kimia bergerak ke atas di bagian tengah tetapi ke bawah di dekat dinding gelas?', a: 'Pemanas berada di bawah bagian tengah gelas. Air di sana menghangat, memuai dan massa jenisnya mengecil, sehingga air di sekitarnya yang lebih dingin mendorongnya ke atas. Di bagian atas air itu melepas kalor, menjadi lebih rapat dan turun di sisi gelas, melengkapi putaran konveksi.' },
        { q: 'Kamu menurunkan terang lampu ke 50%. Apakah kaleng hitam tetap lebih panas daripada kaleng mengkilap?', a: 'Ya. Kedua kaleng kini menerima radiasi setengahnya, tetapi kaleng hitam tetap menyerap sekitar 95% dari yang datang dan kaleng mengkilap hanya sekitar 10%. Suhu akhir keduanya lebih rendah dan selisihnya lebih kecil, tetapi urutannya tetap sama.' },
      ],
    },
  },
};
