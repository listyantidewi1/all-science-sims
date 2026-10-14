// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Connect sea-level rise (m) to fractional land loss.',
      'Read the hypsometric curve: how much land is below 1m? 5m? 10m?',
      'Realize that even small rises can flood disproportionate areas in low-lying regions.',
    ],
    id: [
      'Menghubungkan kenaikan permukaan laut (m) dengan fraksi daratan yang hilang.',
      'Membaca kurva hipsometrik: berapa banyak daratan di bawah 1m? 5m? 10m?',
      'Menyadari bahwa kenaikan kecil pun dapat menggenangi area tak proporsional di wilayah rendah.',
    ],
  },
  tryThis: {
    en: [
      'Set sea level to +1 m — visualize today\'s "100-year flood" being normal.',
      'Set sea level to +5 m — substantial coastal areas are gone.',
      'Try the high-relief vs low-relief presets — geography matters enormously.',
    ],
    id: [
      'Atur permukaan laut +1 m — visualisasikan "banjir 100 tahun" hari ini menjadi normal.',
      'Atur permukaan laut +5 m — area pesisir signifikan hilang.',
      'Coba preset relief tinggi vs rendah — geografi sangat menentukan.',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'The sea is rising for two main reasons. As the ocean warms, its water expands and takes up more room, and as glaciers and the ice sheets of Greenland and Antarctica melt, water that was stored on land flows into the sea. Together these have lifted the global sea level by roughly 20 cm since 1900, and the rise is currently a few millimetres per year and speeding up. A few millimetres sounds tiny, but it adds up, and it raises the starting point for every tide and storm surge.',
        'How much land a given rise swallows depends entirely on the shape of the coast. On a steep, rocky shore, raising the water one metre moves the shoreline only a step or two inland. On a flat river delta, the same metre can push the shoreline kilometres inland, because so much of the land sits barely above the sea. Geographers summarize this shape with a hypsometric curve: for every height, it shows what fraction of the land lies below that height. Where the curve is steep, little land is lost per metre; where it is nearly flat, a lot is.',
        'The simulation builds a random landscape from smoothed noise on a grid of 200 by 120 cells, each with an elevation in metres. Land is any cell at or above today\'s sea level. When you raise the sea-level slider, every land cell lower than the new level is counted as flooded, and the readout shows those cells as a percentage of the original land. The hypsometric curve on the right is computed from the same cells, and the dashed line on it marks the current sea level, so you can read the flooded fraction straight off the curve. The three coastal profiles stretch the same noise to different height ranges: the flat delta profile rises only to about 15 m, while the mountainous one climbs to about 150 m.',
        'Keep the model\'s limits in mind. The land is invented, not a real map; a cell counts as flooded as soon as it is below sea level, even if it is an inland hollow not connected to the sea; and the flooding is instant, with no erosion, sediment, tides, storms, groundwater or sinking land. There are also no dikes or pumps, which protect much of the Netherlands and Jakarta today. The slider runs to 50 m to let you explore the curve, but that is far beyond any projection for this century: scientists expect roughly 0.3 to 1 m of rise by 2100, depending on emissions, with more to follow over the centuries after.',
      ],
      id: [
        'Permukaan laut naik karena dua sebab utama. Saat lautan menghangat, airnya memuai dan memakan ruang lebih besar, dan saat gletser serta lapisan es Greenland dan Antarktika mencair, air yang tadinya tersimpan di daratan mengalir ke laut. Keduanya telah menaikkan permukaan laut global kira-kira 20 cm sejak 1900, dan saat ini kenaikannya beberapa milimeter per tahun dan semakin cepat. Beberapa milimeter terdengar kecil, tetapi terus menumpuk, dan menaikkan titik awal setiap pasang dan gelombang badai.',
        'Seberapa banyak daratan yang ditelan oleh kenaikan tertentu bergantung sepenuhnya pada bentuk pantai. Di pantai berbatu yang terjal, menaikkan air satu meter hanya memindahkan garis pantai satu atau dua langkah ke darat. Di delta sungai yang datar, satu meter yang sama bisa mendorong garis pantai berkilometer ke darat, karena begitu banyak daratan yang hanya sedikit di atas laut. Ahli geografi merangkum bentuk ini dengan kurva hipsometrik: untuk setiap ketinggian, kurva menunjukkan fraksi daratan yang berada di bawah ketinggian itu. Di bagian kurva yang curam, sedikit daratan hilang per meter; di bagian yang hampir datar, banyak yang hilang.',
        'Simulasi membangun bentang alam acak dari derau yang dihaluskan pada kisi 200 kali 120 sel, masing-masing dengan elevasi dalam meter. Daratan adalah sel yang berada pada atau di atas permukaan laut hari ini. Saat kamu menaikkan slider permukaan laut, setiap sel daratan yang lebih rendah dari level baru dihitung sebagai terendam, dan tampilan menunjukkan sel-sel itu sebagai persentase daratan semula. Kurva hipsometrik di kanan dihitung dari sel yang sama, dan garis putus-putus di atasnya menandai permukaan laut saat ini, jadi fraksi yang terendam bisa dibaca langsung dari kurva. Tiga profil pantai merentangkan derau yang sama ke rentang ketinggian berbeda: profil delta datar hanya mencapai sekitar 15 m, sedangkan profil pegunungan naik sampai sekitar 150 m.',
        'Ingat batas model ini. Daratannya rekaan, bukan peta sungguhan; sebuah sel dihitung terendam begitu berada di bawah permukaan laut, meskipun itu cekungan di pedalaman yang tidak terhubung ke laut; dan penggenangannya seketika, tanpa erosi, sedimen, pasang surut, badai, air tanah, atau penurunan tanah. Tidak ada pula tanggul atau pompa, yang hari ini melindungi sebagian besar Belanda dan Jakarta. Slider bisa sampai 50 m agar kamu dapat menjelajahi kurva, tetapi itu jauh melampaui proyeksi mana pun untuk abad ini: para ilmuwan memperkirakan kenaikan sekitar 0,3 sampai 1 m pada 2100, bergantung pada emisi, dan akan terus bertambah pada abad-abad berikutnya.',
      ],
    },
    figure: {
      caption: {
        en: 'The same 1 m rise, seen in cross-section. On a flat delta the shoreline jumps far inland and a wide strip of land is lost; on a steep coast it barely moves. The hypsometric curve captures this difference for a whole region.',
        id: 'Kenaikan 1 m yang sama, dilihat dalam penampang. Di delta datar garis pantai melompat jauh ke darat dan sebidang lebar daratan hilang; di pantai terjal garis pantai hampir tidak bergeser. Kurva hipsometrik merangkum perbedaan ini untuk seluruh wilayah.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Cross-sections of a flat and a steep coast under 1 m of sea-level rise', 'Penampang pantai datar dan terjal dengan kenaikan laut 1 m')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.g{fill:none;stroke:currentColor;stroke-width:1.8}.sea{fill:#3b82f6;opacity:.35}.up{fill:#3b82f6;opacity:.18}.new{fill:#ef4444;opacity:.5}.lv{stroke-width:1.4}</style>
  <text x="14" y="18" font-weight="bold">${L('Flat delta coast', 'Pantai delta datar')}</text>
  <polygon points="10,92 170,70 170,105 10,105" fill="currentColor" opacity=".12"/>
  <path d="M10 92 L170 70" class="g"/>
  <polygon points="10,79.5 100.9,79.5 10,92" class="sea"/>
  <rect x="10" y="70" width="90.9" height="9.5" class="up"/>
  <polygon points="100.9,79.5 100.9,70 170,70" class="new"/>
  <line x1="10" y1="79.5" x2="180" y2="79.5" stroke="#3b82f6" class="lv"/>
  <line x1="10" y1="70" x2="180" y2="70" stroke="#ef4444" class="lv" stroke-dasharray="4 3"/>
  <text x="104" y="64" fill="#ef4444">${L('wide strip lost', 'bidang lebar hilang')}</text>
  <text x="14" y="124" fill="#3b82f6">${L('solid line: sea today', 'garis penuh: laut hari ini')}</text>
  <text x="14" y="138" fill="#ef4444">${L('dashed line: sea +1 m', 'garis putus: laut +1 m')}</text>
  <text x="196" y="18" font-weight="bold">${L('Steep rocky coast', 'Pantai berbatu terjal')}</text>
  <polygon points="196,100 250,98 262,30 350,30 350,105 196,105" fill="currentColor" opacity=".12"/>
  <path d="M196 100 L250 98 L262 30 L350 30" class="g"/>
  <polygon points="196,79.5 253.3,79.5 250,98 196,100" class="sea"/>
  <rect x="196" y="70" width="57.3" height="9.5" class="up"/>
  <polygon points="253.3,79.5 253.3,70 254.9,70" class="new"/>
  <line x1="196" y1="79.5" x2="300" y2="79.5" stroke="#3b82f6" class="lv"/>
  <line x1="196" y1="70" x2="300" y2="70" stroke="#ef4444" class="lv" stroke-dasharray="4 3"/>
  <text x="262" y="60" fill="#ef4444">${L('shoreline barely moves', 'garis pantai hampir tetap')}</text>
  <text x="14" y="160" font-weight="bold">${L('Hypsometric curve', 'Kurva hipsometrik')}</text>
  <line x1="40" y1="230" x2="340" y2="230" stroke="currentColor" stroke-width="1.2"/>
  <line x1="40" y1="230" x2="40" y2="166" stroke="currentColor" stroke-width="1.2"/>
  <path d="M40 230 C 150 226, 290 220, 340 168" fill="none" stroke="#f59e0b" stroke-width="2.2"/>
  <path d="M40 230 C 50 185, 90 172, 340 168" fill="none" stroke="#10b981" stroke-width="2.2"/>
  <text x="120" y="212" fill="#f59e0b">${L('flat: most land is low', 'datar: hampir semua daratan rendah')}</text>
  <text x="130" y="186" fill="#10b981">${L('steep: little land is low', 'terjal: sedikit daratan rendah')}</text>
  <text x="130" y="240" font-size="10">${L('% of land below a given height', '% daratan di bawah ketinggian tertentu')}</text>
  <text x="2" y="200" transform="rotate(-90 12 200)" font-size="10">${L('height', 'tinggi')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Sea level rises because warm water expands and because melting land ice adds water to the ocean.',
        'The fraction of land lost to a given rise depends on the shape of the coast, not just on the rise itself.',
        'A hypsometric curve shows what fraction of land lies below each height; its slope near sea level tells you how vulnerable a region is.',
        'Flat deltas and islands can lose a large share of their land to the first metre or two of rise.',
        'The sim counts any land cell below the new sea level as flooded, instantly and without defences, so it shows exposure rather than a forecast.',
      ],
      id: [
        'Permukaan laut naik karena air hangat memuai dan karena es daratan yang mencair menambah air ke lautan.',
        'Fraksi daratan yang hilang akibat kenaikan tertentu bergantung pada bentuk pantai, bukan hanya pada besar kenaikannya.',
        'Kurva hipsometrik menunjukkan fraksi daratan di bawah setiap ketinggian; kemiringannya di dekat permukaan laut menunjukkan seberapa rawan suatu wilayah.',
        'Delta datar dan pulau-pulau rendah bisa kehilangan sebagian besar daratannya hanya karena satu atau dua meter kenaikan pertama.',
        'Sim menghitung setiap sel daratan di bawah permukaan laut baru sebagai terendam, seketika dan tanpa pertahanan, jadi yang ditampilkan adalah keterpaparan, bukan ramalan.',
      ],
    },
    vocabulary: {
      en: [
        ['Sea-level rise', 'The long-term increase in the average height of the ocean surface, measured in millimetres per year or metres by a given date.'],
        ['Thermal expansion', 'Water takes up more space as it warms; this accounts for a large share of the rise so far.'],
        ['Ice sheet', 'A continent-sized mass of ice, like those on Greenland and Antarctica, that raises the sea when it melts.'],
        ['Elevation', 'Height of the land above present mean sea level, in metres.'],
        ['Hypsometric curve', 'A graph showing, for each height, the fraction of land lying below that height.'],
        ['Delta', 'Flat, low land built from river sediment where a river meets the sea, such as the Ganges or Mekong deltas.'],
        ['Relief', 'How much the height of the land varies; high-relief coasts are steep, low-relief coasts are flat.'],
      ],
      id: [
        ['Kenaikan permukaan laut', 'Peningkatan jangka panjang tinggi rata-rata permukaan lautan, diukur dalam milimeter per tahun atau meter pada tahun tertentu.'],
        ['Pemuaian termal', 'Air memakan ruang lebih besar saat menghangat; ini menyumbang sebagian besar kenaikan sampai sekarang.'],
        ['Lapisan es', 'Massa es seluas benua, seperti di Greenland dan Antarktika, yang menaikkan laut ketika mencair.'],
        ['Elevasi', 'Ketinggian daratan di atas permukaan laut rata-rata saat ini, dalam meter.'],
        ['Kurva hipsometrik', 'Grafik yang menunjukkan, untuk setiap ketinggian, fraksi daratan yang berada di bawah ketinggian itu.'],
        ['Delta', 'Daratan rendah dan datar yang terbentuk dari endapan sungai di muara, seperti delta Gangga atau Mekong.'],
        ['Relief', 'Seberapa besar ketinggian daratan berubah-ubah; pantai relief tinggi terjal, pantai relief rendah datar.'],
      ],
    },
    misconceptions: {
      en: [
        ['Melting sea ice at the North Pole raises sea level.', 'Floating ice already displaces its own weight of water, so when it melts the level hardly changes. It is ice resting on land, in Greenland, Antarctica and mountain glaciers, that adds water to the sea.'],
        ['A one-metre rise means the shoreline moves one metre.', 'The shoreline moves inland until it meets land one metre higher. On a slope of 1 in 1000, typical of a delta, that is a kilometre away.'],
        ['Twice the rise floods twice the land.', 'Only if the hypsometric curve is a straight line, which it rarely is. On a flat coast the first metre may flood more than the next four together.'],
        ['Sea-level rise is only a far-future problem.', 'The roughly 20 cm already gained since 1900 is why high tides and storm surges reach further than they used to; the damage comes from the extremes sitting on a higher base.'],
      ],
      id: [
        ['Es laut yang mencair di Kutub Utara menaikkan permukaan laut.', 'Es terapung sudah memindahkan air seberat dirinya sendiri, jadi saat mencair permukaannya hampir tidak berubah. Es yang berada di daratan, di Greenland, Antarktika, dan gletser pegunungan, itulah yang menambah air ke laut.'],
        ['Kenaikan satu meter berarti garis pantai bergeser satu meter.', 'Garis pantai bergeser ke darat sampai menemui daratan yang satu meter lebih tinggi. Pada kemiringan 1 berbanding 1000, yang umum di delta, itu berarti satu kilometer.'],
        ['Kenaikan dua kali lipat merendam daratan dua kali lipat.', 'Hanya jika kurva hipsometriknya garis lurus, dan itu jarang terjadi. Di pantai datar, meter pertama bisa merendam lebih banyak daripada empat meter berikutnya digabungkan.'],
        ['Kenaikan permukaan laut hanya masalah masa depan yang jauh.', 'Kenaikan sekitar 20 cm sejak 1900 sudah membuat pasang tinggi dan gelombang badai menjangkau lebih jauh dari dulu; kerusakan datang dari kejadian ekstrem yang berpijak pada dasar yang lebih tinggi.'],
      ],
    },
    realWorld: {
      en: [
        'Bangladesh sits mostly on the low Ganges delta; a large share of its land and people lie within a few metres of sea level, which is what the "flat" profile imitates.',
        'Jakarta faces rising seas and sinking ground at the same time, so parts of the city flood regularly and a long sea wall is being built to protect the coast.',
        'The Netherlands has defended land below sea level for centuries with dikes and pumps, showing that protection is possible but costly and never finished.',
        'Low coral atolls such as those of the Maldives and Tuvalu rise only a few metres above the sea, so even modest rise threatens their fresh water and their land.',
      ],
      id: [
        'Bangladesh sebagian besar berada di delta Gangga yang rendah; banyak daratan dan penduduknya berada hanya beberapa meter di atas laut, dan inilah yang ditiru profil "datar".',
        'Jakarta menghadapi laut yang naik dan tanah yang turun sekaligus, sehingga sebagian kota rutin tergenang dan tanggul laut panjang sedang dibangun untuk melindungi pesisir.',
        'Belanda telah mempertahankan daratan di bawah permukaan laut selama berabad-abad dengan tanggul dan pompa, menunjukkan bahwa perlindungan itu mungkin tetapi mahal dan tak pernah selesai.',
        'Atol karang rendah seperti di Maladewa dan Tuvalu hanya beberapa meter di atas laut, sehingga kenaikan yang kecil pun mengancam air tawar dan daratan mereka.',
      ],
    },
    questions: {
      en: [
        { q: 'On the hypsometric curve you read that 12% of the land lies below 1 m and 30% lies below 3 m. If the sea rises from +1 m to +3 m, what extra fraction of land floods?', a: 'About 18%. The curve gives the cumulative fraction below each height, so the land between 1 m and 3 m is the difference, 30% minus 12%. The sim\'s readout would jump from 12% to 30% flooded.' },
        { q: 'Set the same +2 m rise on the flat and the mountainous profile. Why is the flooded percentage so different, even though the rise is identical?', a: 'The flat profile squeezes all its land into about 15 m of height, so a 2 m rise covers a big share of it; the mountainous profile spreads its land up to 150 m, so the same 2 m covers only a thin band. The flooded fraction depends on how much land sits in the first metres, which is what the hypsometric curve shows.' },
        { q: 'The slider goes to +50 m. Is that a realistic amount of sea-level rise for the year 2100?', a: 'No. Projections for 2100 are roughly 0.3 to 1 m depending on emissions. Melting all of Greenland would add about 7 m and all of Antarctica several tens of metres, but that would take many centuries. The high end of the slider is there to let you explore the shape of the curve, not as a forecast.' },
      ],
      id: [
        { q: 'Pada kurva hipsometrik terbaca 12% daratan berada di bawah 1 m dan 30% di bawah 3 m. Jika laut naik dari +1 m ke +3 m, berapa tambahan fraksi daratan yang terendam?', a: 'Sekitar 18%. Kurva memberi fraksi kumulatif di bawah setiap ketinggian, jadi daratan antara 1 m dan 3 m adalah selisihnya, 30% dikurangi 12%. Tampilan di sim akan melompat dari 12% ke 30% terendam.' },
        { q: 'Atur kenaikan +2 m yang sama pada profil datar dan profil pegunungan. Mengapa persentase yang terendam begitu berbeda padahal kenaikannya sama?', a: 'Profil datar memadatkan seluruh daratannya dalam ketinggian sekitar 15 m, sehingga kenaikan 2 m menutupi bagian yang besar; profil pegunungan menyebarkan daratannya sampai 150 m, sehingga 2 m yang sama hanya menutupi pita tipis. Fraksi yang terendam bergantung pada seberapa banyak daratan berada di meter-meter pertama, dan itulah yang ditunjukkan kurva hipsometrik.' },
        { q: 'Slider bisa sampai +50 m. Apakah itu jumlah kenaikan yang realistis untuk tahun 2100?', a: 'Tidak. Proyeksi untuk 2100 berkisar 0,3 sampai 1 m, bergantung pada emisi. Mencairnya seluruh Greenland menambah sekitar 7 m dan seluruh Antarktika beberapa puluh meter, tetapi itu memerlukan banyak abad. Ujung atas slider ada agar kamu bisa menjelajahi bentuk kurva, bukan sebagai ramalan.' },
      ],
    },
  },
};
