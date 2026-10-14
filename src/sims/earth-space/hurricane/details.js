// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Identify the three ingredients: warm SST, Coriolis force, low wind shear.',
      'See why hurricanes don\'t form on the equator (Coriolis = 0).',
      'Connect SST to maximum sustainable intensity.',
    ],
    id: [
      'Mengenali tiga bahan: SST hangat, gaya Coriolis, geseran angin rendah.',
      'Melihat mengapa badai tropis tidak terbentuk di khatulistiwa (Coriolis = 0).',
      'Mengaitkan SST dengan intensitas maksimum yang dapat dipertahankan.',
    ],
  },  tryThis: {
    en: [
      'SST 28°C, low shear, lat 15° — Cat 4 hurricane?',
      'SST 24°C — does the storm dissipate?',
      'Latitude 0° (equator) — does it spin at all?',
    ],
    id: [
      'SST 28°C, geseran rendah, lintang 15° — badai Kat 4?',
      'SST 24°C — apakah badai bubar?',
      'Lintang 0° (khatulistiwa) — apakah berputar sama sekali?',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'A tropical cyclone (called a hurricane in the Atlantic, a typhoon in the north-west Pacific) is a giant heat engine running on warm sea water. Water evaporating from a warm ocean carries energy into the air as water vapour. When that moist air rises and cools, the vapour condenses into cloud and releases its latent heat, which warms the air column, makes it rise faster and lowers the pressure at the surface. More air is drawn in across the sea to replace it, picks up more vapour, and the storm feeds itself. Air spiralling inward speeds up as it approaches the centre, like a spinning skater pulling in her arms, which is why the strongest winds are packed into the eyewall around a calm, clear eye where air is sinking.',
        'Three ingredients are needed. First, a sea surface warmer than about 26.5 °C through a deep layer, because cooler water does not supply enough vapour and heat. Second, the Coriolis effect: Earth\'s rotation deflects moving air to the right in the northern hemisphere and to the left in the southern, which turns the inflow into a spiral. Coriolis is zero on the equator and grows with latitude (in proportion to the sine of the latitude), so cyclones almost never form within about 5° of the equator and they spin anticlockwise north of it and clockwise south of it. Third, low vertical wind shear: if the winds high up blow much faster or in a different direction than those near the surface, the storm\'s warm core is tilted and torn apart; shear above about 10 m/s is usually fatal.',
        'The sim turns these three ingredients into a maximum sustained wind speed. An empirical potential-intensity curve gives the strongest wind a sea surface at that temperature can support (about 58 m/s at 26.5 °C, 67 m/s at 28 °C, 84 m/s at 30 °C and 108 m/s at 32 °C). That is multiplied by a Coriolis factor that grows with latitude up to 15° and a shear factor that falls to zero at 16 m/s, with hard cut-offs below 26.5 °C and within 5° of the equator and a short ramp-up just above 26.5 °C. The wind speed is then placed on the Saffir–Simpson scale (Category 1 from 33 m/s, Category 5 from 70 m/s, with tropical depression and tropical storm below 33 m/s) and controls how fast the cloud bands rotate and how small the eye becomes. Moving the latitude slider across the equator flips the direction of spin.',
        'This is a steady-state cartoon, not a forecast model. A real storm takes days to organise from a pre-existing disturbance, needs humid air through the whole depth of the troposphere, cools the sea beneath it by stirring up deeper water, and weakens quickly over land or cold water; none of that is modelled, and the storm here responds instantly to the sliders. The category wind speeds are representative values on the Saffir–Simpson scale, not calculations, and the intensity formula is a plausible teaching rule rather than real atmospheric physics. Research models instead compute a maximum potential intensity from the sea temperature and the cold temperature of the outflow at the top of the storm.',
      ],
      id: [
        'Siklon tropis (disebut hurikan di Atlantik, topan di Pasifik barat laut) adalah mesin kalor raksasa yang berjalan dengan air laut hangat. Air yang menguap dari laut hangat membawa energi ke udara dalam bentuk uap air. Ketika udara lembap itu naik dan mendingin, uapnya mengembun menjadi awan dan melepaskan kalor latennya, yang menghangatkan kolom udara, membuatnya naik lebih cepat, dan menurunkan tekanan di permukaan. Lebih banyak udara tersedot masuk melintasi laut untuk menggantikannya, mengambil lebih banyak uap, dan badai pun memberi makan dirinya sendiri. Udara yang berpilin ke dalam bergerak makin cepat saat mendekati pusat, seperti pemain seluncur es yang menarik lengannya, dan itulah sebabnya angin terkuat terkumpul di dinding mata yang mengelilingi mata badai yang tenang dan cerah, tempat udara justru turun.',
        'Tiga bahan diperlukan. Pertama, permukaan laut yang lebih hangat dari sekitar 26,5 °C sampai lapisan yang dalam, karena air yang lebih dingin tidak memasok cukup uap dan kalor. Kedua, efek Coriolis: rotasi Bumi membelokkan udara yang bergerak ke kanan di belahan Bumi utara dan ke kiri di belahan selatan, sehingga aliran masuk berubah menjadi pilinan. Coriolis bernilai nol di khatulistiwa dan membesar seiring lintang (sebanding dengan sinus lintang), sehingga siklon hampir tidak pernah terbentuk dalam jarak sekitar 5° dari khatulistiwa, dan berputar berlawanan arah jarum jam di utara serta searah jarum jam di selatan. Ketiga, geseran angin vertikal yang rendah: jika angin di ketinggian bertiup jauh lebih cepat atau ke arah yang berbeda dari angin dekat permukaan, inti hangat badai akan miring dan tercabik; geseran di atas sekitar 10 m/s biasanya mematikan.',
        'Sim ini mengubah ketiga bahan itu menjadi kecepatan angin berkelanjutan maksimum. Kurva intensitas potensial empiris memberi angin terkuat yang dapat ditopang permukaan laut pada suhu itu (sekitar 58 m/s pada 26,5 °C, 67 m/s pada 28 °C, 84 m/s pada 30 °C, dan 108 m/s pada 32 °C). Nilai itu dikalikan dengan faktor Coriolis yang membesar seiring lintang sampai 15° dan faktor geseran yang turun ke nol pada 16 m/s, dengan batas tegas di bawah 26,5 °C dan dalam 5° dari khatulistiwa serta kenaikan singkat tepat di atas 26,5 °C. Kecepatan angin lalu ditempatkan pada skala Saffir–Simpson (Kategori 1 mulai 33 m/s, Kategori 5 mulai 70 m/s, dengan depresi tropis dan badai tropis di bawah 33 m/s) dan mengendalikan seberapa cepat pita awan berputar serta seberapa kecil mata badai. Menggeser slider lintang melewati khatulistiwa membalik arah putaran.',
        'Ini adalah gambaran kartun keadaan tunak, bukan model prakiraan. Badai sungguhan butuh beberapa hari untuk tertata dari gangguan yang sudah ada, memerlukan udara lembap di seluruh ketebalan troposfer, mendinginkan laut di bawahnya dengan mengaduk air yang lebih dalam, dan cepat melemah di atas daratan atau air dingin; semua itu tidak dimodelkan, dan badai di sini merespons slider seketika. Kecepatan angin tiap kategori adalah nilai perwakilan pada skala Saffir–Simpson, bukan hasil perhitungan, dan rumus intensitasnya adalah aturan pengajaran yang masuk akal, bukan fisika atmosfer sungguhan. Model penelitian justru menghitung intensitas potensial maksimum dari suhu laut dan suhu dingin aliran keluar di puncak badai.',
      ],
    },
    figure: {
      caption: {
        en: 'Cross-section of a tropical cyclone as a heat engine. Vapour from the warm sea condenses in the towering eyewall and releases latent heat; the warmed air rises and flows out at the top, surface air is drawn inward and set spinning by Coriolis, and dry air sinks in the calm eye.',
        id: 'Penampang siklon tropis sebagai mesin kalor. Uap dari laut hangat mengembun di dinding mata yang menjulang dan melepaskan kalor laten; udara yang menghangat naik dan mengalir keluar di puncak, udara permukaan tersedot ke dalam dan dipilin oleh Coriolis, dan udara kering turun di mata yang tenang.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Cross-section of a tropical cyclone', 'Penampang siklon tropis')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.m{fill:none;stroke:currentColor;stroke-width:1.2;opacity:.45}.f{stroke-width:2.2;fill:none}.s{font-size:9.5px;opacity:.85}.r{text-anchor:end}.c{text-anchor:middle}</style>
  <rect x="0" y="190" width="360" height="24" fill="#ef4444" opacity=".3"/>
  <text x="180" y="206" class="c s" fill="#ef4444">${L('warm sea, above 26.5 °C: evaporation supplies vapour and energy', 'laut hangat, di atas 26,5 °C: penguapan memasok uap dan energi')}</text>
  <path d="M122 190 L128 60 L160 60 L166 190 Z" fill="currentColor" opacity=".15"/>
  <path d="M194 190 L200 60 L232 60 L238 190 Z" fill="currentColor" opacity=".15"/>
  <path d="M144 184 L144 72" class="f" stroke="#ef4444" marker-end="url(#a)"/>
  <path d="M216 184 L216 72" class="f" stroke="#ef4444" marker-end="url(#a)"/>
  <path d="M180 70 L180 176" class="m" stroke-dasharray="4 4" marker-end="url(#a)"/>
  <text x="180" y="188" class="c">L</text>
  <text x="180" y="30" class="c">${L('eye: calm, sinking air', 'mata: tenang, udara turun')}</text>
  <text x="180" y="42" class="c s">${L('lowest pressure (L)', 'tekanan terendah (L)')}</text>
  <path d="M138 56 L92 46" class="f" stroke="#8b5cf6" marker-end="url(#a)"/>
  <path d="M222 56 L268 46" class="f" stroke="#8b5cf6" marker-end="url(#a)"/>
  <text x="86" y="40" class="r s" fill="#8b5cf6">${L('outflow', 'aliran keluar')}</text>
  <path d="M30 180 L116 180" class="f" stroke="#3b82f6" marker-end="url(#a)"/>
  <path d="M330 180 L244 180" class="f" stroke="#3b82f6" marker-end="url(#a)"/>
  <text x="30" y="172" class="s" fill="#3b82f6">${L('inflow', 'aliran masuk')}</text>
  <text x="330" y="172" class="r s" fill="#3b82f6">${L('inflow', 'aliran masuk')}</text>
  <text x="10" y="96" fill="#ef4444">${L('eyewall:', 'dinding mata:')}</text>
  <text x="10" y="109" class="s" fill="#ef4444">${L('warm moist air rises,', 'udara hangat lembap naik,')}</text>
  <text x="10" y="121" class="s" fill="#ef4444">${L('vapour condenses,', 'uap mengembun,')}</text>
  <text x="10" y="133" class="s" fill="#ef4444">${L('latent heat released:', 'kalor laten dilepas:')}</text>
  <text x="10" y="145" class="s" fill="#ef4444">${L('strongest winds, heaviest rain', 'angin terkuat, hujan terlebat')}</text>
  <path d="M252 84 L344 84" class="f" stroke="#f59e0b" marker-end="url(#a)"/>
  <text x="252" y="102" class="s" fill="#f59e0b">${L('wind shear: strong upper winds', 'geseran angin: angin atas kencang')}</text>
  <text x="252" y="114" class="s" fill="#f59e0b">${L('tilt the storm and tear it apart', 'memiringkan dan mencabik badai')}</text>
  <text x="180" y="232" class="c s">${L('Coriolis (zero at the equator) turns the inflow into a spiral: anticlockwise north, clockwise south', 'Coriolis (nol di khatulistiwa) memilin aliran masuk: berlawanan jarum jam di utara, searah di selatan')}</text>
  <defs><marker id="a" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="context-stroke"/></marker></defs>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Tropical cyclones are powered by latent heat: water evaporates from a warm sea and releases its energy when the vapour condenses in the storm\'s clouds.',
        'Three ingredients are needed: sea surface above about 26.5 °C, enough Coriolis effect, and low vertical wind shear.',
        'Coriolis is zero on the equator, so cyclones almost never form within 5° of it; they rotate anticlockwise in the northern hemisphere and clockwise in the southern.',
        'Wind shear tilts the storm\'s warm core and tears it apart, which is why strong upper-level winds prevent intensification.',
        'The eye is calm with sinking air and the lowest pressure; the strongest winds and heaviest rain are in the eyewall just outside it.',
      ],
      id: [
        'Siklon tropis digerakkan oleh kalor laten: air menguap dari laut hangat dan melepaskan energinya ketika uap mengembun di awan badai.',
        'Tiga bahan diperlukan: permukaan laut di atas sekitar 26,5 °C, efek Coriolis yang cukup, dan geseran angin vertikal yang rendah.',
        'Coriolis bernilai nol di khatulistiwa, sehingga siklon hampir tidak pernah terbentuk dalam 5° darinya; siklon berputar berlawanan arah jarum jam di belahan utara dan searah jarum jam di belahan selatan.',
        'Geseran angin memiringkan inti hangat badai dan mencabiknya, itulah sebabnya angin kencang di lapisan atas mencegah penguatan badai.',
        'Mata badai tenang dengan udara yang turun dan tekanan terendah; angin terkuat dan hujan terlebat berada di dinding mata tepat di luarnya.',
      ],
    },
    vocabulary: {
      en: [
        ['Sea surface temperature (SST)', 'The temperature of the top layer of the ocean; cyclones need about 26.5 °C or warmer.'],
        ['Coriolis effect', 'The apparent deflection of moving air caused by Earth\'s rotation: to the right in the northern hemisphere, to the left in the southern, and zero at the equator.'],
        ['Wind shear', 'The difference in wind speed or direction between low and high altitudes.'],
        ['Latent heat', 'Energy absorbed when water evaporates and released again when vapour condenses; the storm\'s fuel.'],
        ['Eye', 'The calm, often cloud-free centre of a cyclone, where air sinks and pressure is lowest.'],
        ['Eyewall', 'The ring of towering thunderstorms around the eye, home to the strongest winds and heaviest rain.'],
        ['Saffir–Simpson scale', 'The five-category scale that ranks hurricanes by sustained wind speed, from Category 1 (about 120 km/h) to Category 5 (above 250 km/h).'],
        ['Tropical depression / storm', 'The weaker stages of a developing cyclone, with sustained winds below about 63 km/h and 63–118 km/h respectively.'],
      ],
      id: [
        ['Suhu permukaan laut (SST)', 'Suhu lapisan teratas samudra; siklon membutuhkan sekitar 26,5 °C atau lebih hangat.'],
        ['Efek Coriolis', 'Pembelokan semu udara yang bergerak akibat rotasi Bumi: ke kanan di belahan Bumi utara, ke kiri di belahan selatan, dan nol di khatulistiwa.'],
        ['Geseran angin', 'Perbedaan kecepatan atau arah angin antara ketinggian rendah dan tinggi.'],
        ['Kalor laten', 'Energi yang diserap saat air menguap dan dilepaskan kembali saat uap mengembun; bahan bakar badai.'],
        ['Mata badai', 'Pusat siklon yang tenang dan sering tanpa awan, tempat udara turun dan tekanan paling rendah.'],
        ['Dinding mata', 'Cincin badai petir menjulang di sekeliling mata, tempat angin terkuat dan hujan terlebat.'],
        ['Skala Saffir–Simpson', 'Skala lima kategori yang memeringkat hurikan menurut kecepatan angin berkelanjutan, dari Kategori 1 (sekitar 120 km/jam) sampai Kategori 5 (di atas 250 km/jam).'],
        ['Depresi tropis / badai tropis', 'Tahap-tahap lebih lemah dari siklon yang sedang berkembang, dengan angin berkelanjutan masing-masing di bawah sekitar 63 km/jam dan 63–118 km/jam.'],
      ],
    },
    misconceptions: {
      en: [
        ['The Coriolis force is what spins a hurricane up to such high speeds.', 'Coriolis is a weak effect; its job is only to give the inflowing air a slight turn. Once air is moving inward with a little spin, conservation of angular momentum makes it rotate faster and faster as it approaches the centre, like a skater pulling in her arms.'],
        ['The eye is the most dangerous part of the storm.', 'The eye is calm, with light winds and often clear sky. The danger is the eyewall around it, and people in the eye are sometimes caught out when the far eyewall arrives with winds from the opposite direction.'],
        ['Hurricanes get their energy from the wind.', 'The energy comes from the ocean, through evaporation and the latent heat released when the vapour condenses. That is why storms weaken rapidly over land or cold water, where that supply is cut off.'],
        ['Bathtubs and sinks drain in opposite directions in the two hemispheres because of Coriolis.', 'At the scale of a sink the Coriolis effect is far too small to matter; the direction is set by how the water was poured and the shape of the basin. Coriolis only dominates for flows hundreds of kilometres across, like cyclones.'],
      ],
      id: [
        ['Gaya Coriolis-lah yang memutar hurikan sampai begitu kencang.', 'Coriolis adalah efek yang lemah; tugasnya hanya memberi sedikit belokan pada udara yang masuk. Begitu udara bergerak ke dalam dengan sedikit putaran, kekekalan momentum sudut membuatnya berputar makin cepat saat mendekati pusat, seperti pemain seluncur es yang menarik lengannya.'],
        ['Mata badai adalah bagian paling berbahaya.', 'Mata badai tenang, anginnya lemah dan langitnya sering cerah. Bahayanya ada di dinding mata di sekelilingnya, dan orang yang berada di mata badai kadang terjebak ketika dinding mata di sisi lain tiba dengan angin dari arah berlawanan.'],
        ['Hurikan mendapat energinya dari angin.', 'Energinya berasal dari samudra, lewat penguapan dan kalor laten yang dilepaskan saat uap mengembun. Itulah sebabnya badai cepat melemah di atas daratan atau air dingin, tempat pasokan itu terputus.'],
        ['Air di bak dan wastafel berputar berlawanan arah di kedua belahan Bumi karena Coriolis.', 'Pada skala wastafel efek Coriolis terlalu kecil untuk berarti; arahnya ditentukan oleh cara air dituang dan bentuk baknya. Coriolis hanya dominan untuk aliran selebar ratusan kilometer, seperti siklon.'],
      ],
    },
    realWorld: {
      en: [
        'Indonesia straddles the equator, so tropical cyclones rarely strike it directly; an exception was Cyclone Seroja in April 2021, which formed near 10°S and caused severe flooding in East Nusa Tenggara.',
        'Typhoon Haiyan (Philippines, 2013) and Hurricane Katrina (USA, 2005) show the damage a Category 5 storm can do, mostly through storm surge and flooding rather than wind alone.',
        'Forecasters watch sea surface temperature maps and wind-shear forecasts, the same two ingredients as the sliders, to predict whether a disturbance will strengthen.',
        'Warmer oceans raise the maximum intensity a storm can reach, which is one reason climate scientists expect a larger share of cyclones to reach the highest categories.',
      ],
      id: [
        'Indonesia terletak di sekitar khatulistiwa, sehingga siklon tropis jarang menghantamnya secara langsung; pengecualiannya adalah Siklon Seroja pada April 2021, yang terbentuk di dekat 10°LS dan menyebabkan banjir parah di Nusa Tenggara Timur.',
        'Topan Haiyan (Filipina, 2013) dan Hurikan Katrina (AS, 2005) menunjukkan kerusakan yang bisa ditimbulkan badai Kategori 5, sebagian besar lewat gelombang badai dan banjir, bukan angin semata.',
        'Peramal cuaca mengamati peta suhu permukaan laut dan prakiraan geseran angin, dua bahan yang sama dengan slider di sim, untuk memprediksi apakah suatu gangguan akan menguat.',
        'Samudra yang lebih hangat menaikkan intensitas maksimum yang bisa dicapai badai, salah satu alasan ilmuwan iklim memperkirakan makin banyak siklon yang mencapai kategori tertinggi.',
      ],
    },
    questions: {
      en: [
        { q: 'With SST 28 °C, latitude 15° and shear 5 m/s the sim reports a Category 2 hurricane with winds of about 46 m/s. Which single slider would raise the intensity most, and why?', a: 'The wind is the potential intensity for 28 °C, about 67 m/s, times a Coriolis factor of 15/15 = 1 and a shear factor of 1 − 5/16 ≈ 0.69. Latitude is already at full strength, so moving it changes nothing. Removing all shear gives the full 67 m/s, a Category 4. Raising SST to 32 °C lifts the potential to about 108 m/s, and 108 × 0.69 ≈ 74 m/s is a Category 5, so the sea-temperature slider helps most, with shear close behind.' },
        { q: 'Why does no tropical cyclone form on the equator, even over very warm water?', a: 'On the equator the Coriolis effect is zero, so air flowing toward a low-pressure centre goes straight in and fills it instead of spiralling around it. Without that spin the storm cannot organise. The sim mimics this by setting intensity to zero within 5° of the equator.' },
        { q: 'A strong hurricane crosses onto land and weakens within a day. Explain using the energy source of the storm.', a: 'The storm is fuelled by water vapour evaporating from a warm sea. Over land that supply stops, so condensation and latent-heat release in the eyewall fade, the warm core cools and pressure rises. Friction with the rough land surface also slows the winds. In the sim this is like dropping SST below 26.5 °C.' },
      ],
      id: [
        { q: 'Dengan SST 28 °C, lintang 15°, dan geseran 5 m/s, sim melaporkan hurikan Kategori 2 dengan angin sekitar 46 m/s. Slider mana yang paling besar menaikkan intensitas jika diubah sendiri, dan mengapa?', a: 'Anginnya adalah intensitas potensial untuk 28 °C, sekitar 67 m/s, dikali faktor Coriolis 15/15 = 1 dan faktor geseran 1 − 5/16 ≈ 0,69. Lintang sudah pada kekuatan penuh, sehingga mengubahnya tidak berpengaruh. Menghilangkan semua geseran memberi 67 m/s penuh, Kategori 4. Menaikkan SST ke 32 °C mengangkat potensial ke sekitar 108 m/s, dan 108 × 0,69 ≈ 74 m/s adalah Kategori 5, sehingga slider suhu laut paling membantu, disusul geseran.' },
        { q: 'Mengapa tidak ada siklon tropis yang terbentuk di khatulistiwa, bahkan di atas air yang sangat hangat?', a: 'Di khatulistiwa efek Coriolis nol, sehingga udara yang mengalir menuju pusat tekanan rendah langsung masuk dan mengisinya, bukan berpilin mengitarinya. Tanpa putaran itu badai tidak bisa tertata. Sim menirukan ini dengan menetapkan intensitas nol dalam 5° dari khatulistiwa.' },
        { q: 'Hurikan kuat melintas ke daratan dan melemah dalam sehari. Jelaskan dengan sumber energi badai.', a: 'Badai dijalankan oleh uap air yang menguap dari laut hangat. Di atas daratan pasokan itu berhenti, sehingga pengembunan dan pelepasan kalor laten di dinding mata memudar, inti hangat mendingin, dan tekanan naik. Gesekan dengan permukaan darat yang kasar juga memperlambat angin. Dalam sim ini seperti menurunkan SST di bawah 26,5 °C.' },
      ],
    },
  },
};
