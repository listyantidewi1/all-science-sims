// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Identify the four main atmospheric layers from temperature.',
      'See pressure drop exponentially with altitude.',
      'Locate the ozone layer, jet stream, and ISS.',
    ],
    id: [
      'Mengenali empat lapisan utama atmosfer dari suhu.',
      'Melihat tekanan turun eksponensial terhadap ketinggian.',
      'Menemukan lapisan ozon, jet stream, dan ISS.',
    ],
  },  tryThis: {
    en: [
      'Probe at 12 km — what layer? Pressure?',
      "Find Mt Everest, the ozone layer, the ISS — what altitudes?",
      'Where is the temperature actually warmest?',
    ],
    id: [
      'Probe di 12 km — lapisan apa? Tekanan?',
      'Cari G. Everest, lapisan ozon, ISS — pada ketinggian berapa?',
      'Di mana suhunya paling tinggi sebenarnya?',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'The atmosphere is a thin skin of gas held to Earth by gravity: half of all the air lies below 5.5 km, and 99% lies below about 30 km. Because gravity pulls the air down, the air near the ground is squeezed by the weight of everything above it, so pressure and density are highest at the surface and drop quickly with height. The drop is not steady but exponential: in the sim\'s model the pressure halves roughly every 5 km, so at 11 km, where airliners cruise, it is about a fifth of its sea-level value, and at 35 km, where weather balloons burst, it is under 1%.',
        'Temperature does something more surprising: as you climb it falls, then rises, then falls, then rises again, and those reversals mark the layers. In the troposphere (the lowest 12 km or so) the air is heated from below by the sunlit ground, so it cools with height at about 6.5 °C per kilometre; all clouds and weather live here. In the stratosphere, up to about 50 km, the ozone layer absorbs ultraviolet sunlight and warms the air, so the temperature rises with height. In the mesosphere, up to about 85 km, there is little ozone and the air cools again to around −90 °C, the coldest point in the whole atmosphere. In the thermosphere the extremely thin gas absorbs X-rays and extreme ultraviolet from the Sun and reaches hundreds or even thousands of degrees, yet it would not feel hot: there are so few molecules that they carry almost no heat.',
        'The sim uses a simplified version of the US Standard Atmosphere. Temperature is built from straight-line segments with the real lapse rates and turning points, while pressure and density each fall exponentially with a fixed scale height (7 km for pressure, 8.5 km for density). Drag the probe or move the slider to read the values at any altitude, and use the landmark buttons to jump to Everest, a cruising airliner, the ozone peak, weather balloons, the auroras and the International Space Station. The height axis is deliberately compressed so the busy first few kilometres get as much room as the hundreds of kilometres above.',
        'Real air is messier than this. Temperatures and pressures vary with latitude, season and weather; the tropopause sits near 17 km over the tropics (including Indonesia) but only about 9 km over the poles. The true scale height changes with temperature, so pressure does not fall at exactly one rate. The thermosphere\'s temperature depends strongly on solar activity and levels off at high altitude, whereas the sim keeps it rising in a straight line. There is no humidity, no wind and no cloud in the model, and the lines between layers are sharper than in nature.',
      ],
      id: [
        'Atmosfer adalah selubung gas tipis yang ditahan Bumi oleh gravitasi: separuh dari seluruh udara berada di bawah 5,5 km, dan 99% berada di bawah sekitar 30 km. Karena gravitasi menarik udara ke bawah, udara dekat permukaan tertekan oleh berat semua udara di atasnya, sehingga tekanan dan kerapatan paling tinggi di permukaan dan turun cepat seiring ketinggian. Penurunannya tidak tetap melainkan eksponensial: dalam model sim ini tekanan berkurang setengahnya kira-kira setiap 5 km, sehingga pada 11 km, tempat pesawat jet terbang, tekanannya sekitar seperlima nilai di permukaan laut, dan pada 35 km, tempat balon cuaca pecah, tekanannya di bawah 1%.',
        'Suhu berperilaku lebih mengejutkan: saat kamu naik, suhu turun, lalu naik, lalu turun, lalu naik lagi, dan titik-titik balik inilah yang menandai lapisan. Di troposfer (sekitar 12 km terbawah) udara dipanaskan dari bawah oleh permukaan tanah yang disinari Matahari, sehingga suhu turun sekitar 6,5 °C tiap kilometer; semua awan dan cuaca ada di sini. Di stratosfer, sampai sekitar 50 km, lapisan ozon menyerap sinar ultraviolet Matahari dan menghangatkan udara, sehingga suhu naik seiring ketinggian. Di mesosfer, sampai sekitar 85 km, ozon hampir tidak ada dan udara mendingin lagi sampai sekitar −90 °C, titik terdingin di seluruh atmosfer. Di termosfer, gas yang sangat tipis menyerap sinar-X dan ultraviolet ekstrem dari Matahari dan mencapai ratusan bahkan ribuan derajat, tetapi tidak akan terasa panas: molekulnya begitu sedikit sehingga hampir tidak membawa kalor.',
        'Sim ini memakai versi sederhana dari Atmosfer Standar AS. Suhu disusun dari ruas-ruas garis lurus dengan laju penurunan dan titik balik yang sesungguhnya, sedangkan tekanan dan kerapatan masing-masing turun secara eksponensial dengan tinggi skala tetap (7 km untuk tekanan, 8,5 km untuk kerapatan). Seret probe atau geser slider untuk membaca nilai pada ketinggian mana pun, dan gunakan tombol penanda untuk melompat ke Everest, pesawat jet, puncak lapisan ozon, balon cuaca, aurora, dan Stasiun Antariksa Internasional. Sumbu ketinggian sengaja dimampatkan agar beberapa kilometer pertama yang padat kejadian mendapat ruang sebanyak ratusan kilometer di atasnya.',
        'Udara sungguhan lebih rumit dari ini. Suhu dan tekanan berubah menurut lintang, musim, dan cuaca; tropopause berada di dekat 17 km di atas daerah tropis (termasuk Indonesia) tetapi hanya sekitar 9 km di atas kutub. Tinggi skala sebenarnya berubah dengan suhu, sehingga tekanan tidak turun dengan laju yang persis sama. Suhu termosfer sangat bergantung pada aktivitas Matahari dan mendatar di ketinggian besar, sedangkan sim ini terus menaikkannya dalam garis lurus. Tidak ada kelembapan, angin, atau awan dalam model ini, dan batas antarlapisan dibuat lebih tegas daripada di alam.',
      ],
    },
    figure: {
      caption: {
        en: 'Temperature (red) zig-zags with height, and each turning point is a layer boundary. Pressure (blue, dashed) simply falls exponentially, halving about every 5 km. Altitude axis compressed.',
        id: 'Suhu (merah) berkelok-kelok seiring ketinggian, dan setiap titik baliknya adalah batas lapisan. Tekanan (biru, putus-putus) hanya turun secara eksponensial, berkurang setengah kira-kira tiap 5 km. Sumbu ketinggian dimampatkan.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Temperature and pressure against altitude', 'Suhu dan tekanan terhadap ketinggian')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.m{fill:none;stroke:currentColor;stroke-width:1.2;opacity:.45}.f{stroke-width:2.2;fill:none}.s{font-size:9.5px;opacity:.8}.r{text-anchor:end}</style>
  <rect x="50" y="165" width="250" height="35" fill="#3b82f6" opacity=".12"/>
  <rect x="50" y="120" width="250" height="45" fill="#8b5cf6" opacity=".12"/>
  <rect x="50" y="85" width="250" height="35" fill="#10b981" opacity=".12"/>
  <rect x="50" y="30" width="250" height="55" fill="#f59e0b" opacity=".12"/>
  <line x1="50" y1="30" x2="50" y2="200" class="m"/>
  <line x1="50" y1="200" x2="300" y2="200" class="m"/>
  <text x="46" y="204" class="r s">0</text>
  <text x="46" y="169" class="r s">12</text>
  <text x="46" y="124" class="r s">50</text>
  <text x="46" y="89" class="r s">85 km</text>
  <text transform="rotate(-90 14 120)" x="14" y="120" class="s" text-anchor="middle">${L('altitude (compressed)', 'ketinggian (dimampatkan)')}</text>
  <path d="M300 200 C230 192 140 178 95 165 L64 155 L54 144 L50 120 L50 30" class="f" stroke="#3b82f6" stroke-dasharray="5 3"/>
  <path d="M201 200 L107 165 L107 155 L178 120 L68 85 L68 61 L230 30" class="f" stroke="#ef4444"/>
  <text x="296" y="178" class="r">${L('troposphere 0–12 km', 'troposfer 0–12 km')}</text>
  <text x="56" y="194" class="s" fill="#ef4444">${L('warmed by the ground', 'dipanaskan dari tanah')}</text>
  <text x="296" y="131" class="r">${L('stratosphere 12–50 km', 'stratosfer 12–50 km')}</text>
  <text x="296" y="143" class="r s" fill="#ef4444">${L('ozone absorbs UV: warmer', 'ozon menyerap UV: menghangat')}</text>
  <text x="296" y="99" class="r">${L('mesosphere 50–85 km', 'mesosfer 50–85 km')}</text>
  <text x="296" y="111" class="r s" fill="#ef4444">${L('coldest, about −90 °C', 'terdingin, sekitar −90 °C')}</text>
  <text x="296" y="48" class="r">${L('thermosphere above 85 km', 'termosfer di atas 85 km')}</text>
  <text x="296" y="60" class="r s" fill="#ef4444">${L('thin gas absorbs X-rays, UV', 'gas tipis menyerap sinar-X, UV')}</text>
  <text x="50" y="216" fill="#ef4444">${L('temperature: colder to the left', 'suhu: makin dingin ke kiri')}</text>
  <text x="300" y="216" class="r" fill="#3b82f6">${L('pressure: high at right', 'tekanan: tinggi di kanan')}</text>
  <text x="50" y="232" class="s">${L('red: temperature. blue dashed: pressure as a fraction of sea level', 'merah: suhu. biru putus-putus: tekanan sebagai pecahan dari permukaan laut')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Pressure and density fall exponentially with altitude; about half of the air is below 5.5 km.',
        'The temperature profile reverses direction three times, and those reversals (tropopause, stratopause, mesopause) define the four main layers.',
        'The troposphere is heated from below by the ground, the stratosphere from within by ozone absorbing ultraviolet, and the thermosphere by X-rays and extreme ultraviolet.',
        'Thermosphere air is "hot" by temperature but carries almost no heat, because it is extremely thin.',
        'Weather, clouds and airliners belong to the troposphere; the ozone layer to the stratosphere; meteors to the mesosphere; auroras and the ISS to the thermosphere.',
      ],
      id: [
        'Tekanan dan kerapatan turun secara eksponensial seiring ketinggian; sekitar separuh udara berada di bawah 5,5 km.',
        'Profil suhu berbalik arah tiga kali, dan titik-titik balik itu (tropopause, stratopause, mesopause) menentukan empat lapisan utama.',
        'Troposfer dipanaskan dari bawah oleh permukaan tanah, stratosfer dari dalam oleh ozon yang menyerap ultraviolet, dan termosfer oleh sinar-X dan ultraviolet ekstrem.',
        'Udara termosfer "panas" menurut suhunya tetapi hampir tidak membawa kalor, karena sangat tipis.',
        'Cuaca, awan, dan pesawat jet berada di troposfer; lapisan ozon di stratosfer; meteor di mesosfer; aurora dan ISS di termosfer.',
      ],
    },
    vocabulary: {
      en: [
        ['Troposphere', 'The lowest layer, about 0–12 km, where temperature falls with height and all weather happens.'],
        ['Stratosphere', 'The layer from about 12 to 50 km, containing the ozone layer, where temperature rises with height.'],
        ['Mesosphere', 'The layer from about 50 to 85 km, where temperature falls again to its lowest value; most meteors burn up here.'],
        ['Thermosphere', 'The very thin layer above about 85 km where temperature rises steeply; auroras and the ISS are here.'],
        ['Tropopause', 'The boundary between troposphere and stratosphere, where the temperature stops falling.'],
        ['Lapse rate', 'How fast temperature falls with height; about 6.5 °C per kilometre in the troposphere.'],
        ['Scale height', 'The height over which pressure falls by a factor of e (about 2.7); roughly 7 km for Earth\'s air.'],
        ['Ozone layer', 'A region of the stratosphere, peaking near 20–25 km, where ozone molecules absorb most of the Sun\'s harmful ultraviolet.'],
      ],
      id: [
        ['Troposfer', 'Lapisan terbawah, sekitar 0–12 km, tempat suhu turun seiring ketinggian dan semua cuaca terjadi.'],
        ['Stratosfer', 'Lapisan dari sekitar 12 sampai 50 km, berisi lapisan ozon, tempat suhu naik seiring ketinggian.'],
        ['Mesosfer', 'Lapisan dari sekitar 50 sampai 85 km, tempat suhu turun lagi ke nilai terendahnya; kebanyakan meteor terbakar di sini.'],
        ['Termosfer', 'Lapisan sangat tipis di atas sekitar 85 km tempat suhu naik tajam; aurora dan ISS berada di sini.'],
        ['Tropopause', 'Batas antara troposfer dan stratosfer, tempat suhu berhenti turun.'],
        ['Laju penurunan suhu', 'Seberapa cepat suhu turun seiring ketinggian; sekitar 6,5 °C per kilometer di troposfer.'],
        ['Tinggi skala', 'Ketinggian yang membuat tekanan turun sebesar faktor e (sekitar 2,7); kira-kira 7 km untuk udara Bumi.'],
        ['Lapisan ozon', 'Daerah di stratosfer, paling pekat di sekitar 20–25 km, tempat molekul ozon menyerap sebagian besar ultraviolet berbahaya dari Matahari.'],
      ],
    },
    misconceptions: {
      en: [
        ['Higher up is closer to the Sun, so it should be warmer.', 'A few kilometres make no difference to a Sun 150 million kilometres away. The troposphere is warmed from below by the ground, so it gets colder as you climb, which is why mountain tops have snow.'],
        ['The atmosphere has a sharp edge where space begins.', 'The air just thins out gradually. The 100 km "Kármán line" is a convention; the ISS at 400 km still feels enough drag that it must be boosted regularly.'],
        ['A thermosphere temperature of over 1,000 °C would instantly burn a satellite.', 'Temperature measures how fast molecules move, but there are so few molecules up there that they transfer almost no heat. Spacecraft heating happens during re-entry lower down, where the air is dense enough to compress and rub.'],
        ['The ozone layer is a thick blanket of pure ozone.', 'Even at its peak, ozone is only a few molecules in every million. Brought to surface pressure, the entire ozone layer would be about 3 mm thick, yet that is enough to absorb most harmful ultraviolet.'],
      ],
      id: [
        ['Makin tinggi berarti makin dekat ke Matahari, jadi seharusnya lebih hangat.', 'Beberapa kilometer tidak berarti apa-apa bagi Matahari yang jaraknya 150 juta kilometer. Troposfer dipanaskan dari bawah oleh permukaan tanah, sehingga makin dingin saat kamu naik; itulah sebabnya puncak gunung bersalju.'],
        ['Atmosfer punya tepi yang tegas tempat ruang angkasa dimulai.', 'Udara hanya menipis secara bertahap. "Garis Kármán" di 100 km hanyalah kesepakatan; ISS di 400 km masih merasakan hambatan udara yang cukup sehingga harus didorong naik secara berkala.'],
        ['Suhu termosfer lebih dari 1.000 °C akan langsung membakar satelit.', 'Suhu mengukur seberapa cepat molekul bergerak, tetapi molekul di sana begitu sedikit sehingga hampir tidak memindahkan kalor. Pemanasan wahana antariksa terjadi saat masuk kembali di ketinggian yang lebih rendah, tempat udara cukup rapat untuk termampatkan dan bergesekan.'],
        ['Lapisan ozon adalah selimut tebal berisi ozon murni.', 'Bahkan di puncaknya, ozon hanya beberapa molekul dari setiap satu juta molekul udara. Jika dibawa ke tekanan permukaan, seluruh lapisan ozon hanya setebal sekitar 3 mm, tetapi itu cukup untuk menyerap sebagian besar ultraviolet berbahaya.'],
      ],
    },
    realWorld: {
      en: [
        'Climbers on Everest (8.85 km) breathe air with only about a third of sea-level pressure, which is why most carry oxygen.',
        'Airliners cruising at 11 km fly in air at roughly −55 °C and a fifth of normal pressure, so the cabin must be pressurised and heated.',
        'Weather balloons expand as the pressure drops and finally burst at around 35 km, in the middle of the stratosphere.',
        'Shooting stars are grains of dust burning up at 80–100 km in the mesosphere, and auroras glow at 100–300 km in the thermosphere.',
      ],
      id: [
        'Pendaki di Everest (8,85 km) menghirup udara dengan tekanan hanya sekitar sepertiga tekanan permukaan laut, karena itu kebanyakan membawa tabung oksigen.',
        'Pesawat jet yang terbang di 11 km berada di udara bersuhu sekitar −55 °C dengan tekanan seperlima normal, sehingga kabinnya harus diberi tekanan dan dihangatkan.',
        'Balon cuaca mengembang saat tekanan turun dan akhirnya pecah di sekitar 35 km, di tengah stratosfer.',
        'Bintang jatuh adalah butiran debu yang terbakar di 80–100 km di mesosfer, dan aurora bercahaya di 100–300 km di termosfer.',
      ],
    },
    questions: {
      en: [
        { q: 'Sea-level pressure is about 101 kPa. Using the rule that pressure halves roughly every 5 km, estimate the pressure at 15 km. Then check with the probe.', a: 'Three halvings: 101 → 50 → 25 → 12.6 kPa, so roughly 13 kPa, about one eighth of sea level. The sim\'s exponential model gives 11.9 kPa at 15 km, close to the estimate.' },
        { q: 'Why does temperature rise with height in the stratosphere when it falls with height in the troposphere?', a: 'The troposphere is heated from below by the warm ground, so the air farthest from the ground is coldest. The stratosphere has its own heat source inside it: ozone molecules absorb ultraviolet sunlight and warm the air around them, and that heating is strongest in the upper stratosphere, so it gets warmer as you go up.' },
        { q: 'The probe at 5 km reads −17.5 °C. Show how the model gets that number from the surface temperature of 15 °C.', a: 'The tropospheric lapse rate is 6.5 °C per km. Five kilometres of climbing cools the air by 5 × 6.5 = 32.5 °C, and 15 − 32.5 = −17.5 °C.' },
      ],
      id: [
        { q: 'Tekanan di permukaan laut sekitar 101 kPa. Dengan aturan bahwa tekanan berkurang setengah kira-kira tiap 5 km, perkirakan tekanan di 15 km. Lalu periksa dengan probe.', a: 'Tiga kali setengah: 101 → 50 → 25 → 12,6 kPa, jadi kira-kira 13 kPa, sekitar seperdelapan tekanan permukaan laut. Model eksponensial sim memberi 11,9 kPa di 15 km, dekat dengan perkiraan.' },
        { q: 'Mengapa suhu naik seiring ketinggian di stratosfer, padahal di troposfer suhu turun seiring ketinggian?', a: 'Troposfer dipanaskan dari bawah oleh permukaan tanah yang hangat, sehingga udara yang paling jauh dari tanah paling dingin. Stratosfer punya sumber panas sendiri di dalamnya: molekul ozon menyerap sinar ultraviolet Matahari dan menghangatkan udara di sekitarnya, dan pemanasan itu paling kuat di stratosfer bagian atas, sehingga makin ke atas makin hangat.' },
        { q: 'Probe di 5 km menunjukkan −17,5 °C. Tunjukkan bagaimana model mendapat angka itu dari suhu permukaan 15 °C.', a: 'Laju penurunan suhu troposfer adalah 6,5 °C per km. Naik lima kilometer mendinginkan udara sebesar 5 × 6,5 = 32,5 °C, dan 15 − 32,5 = −17,5 °C.' },
      ],
    },
  },
};
