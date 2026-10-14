// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Connect the Niño-3.4 SST anomaly to the ENSO state.',
      'See the slope of the thermocline reverse between La Niña and El Niño.',
      'Connect Pacific oscillation to global rainfall: drought in some regions, floods in others.',
    ],
    id: [
      'Menghubungkan anomali SST Niño-3.4 dengan keadaan ENSO.',
      'Melihat kemiringan termoklin terbalik antara La Niña dan El Niño.',
      'Menghubungkan osilasi Pasifik dengan curah hujan global: kekeringan di sebagian, banjir di sebagian lain.',
    ],
  },  tryThis: {
    en: [
      'Strong La Niña — warm pool stacked west, drought in Peru, floods in Indonesia.',
      'Strong El Niño — warm water east, fish disappear off Peru, drought in Australia.',
      'Neutral — gentle east-west temperature gradient, balanced rains.',
    ],
    id: [
      'La Niña kuat — kolam hangat di barat, kekeringan di Peru, banjir di Indonesia.',
      'El Niño kuat — air hangat di timur, ikan menghilang di Peru, kekeringan di Australia.',
      'Netral — gradien suhu lembut, hujan seimbang.',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'In a normal year the trade winds blow steadily from east to west across the tropical Pacific. They drag sun-warmed surface water toward Indonesia, where it piles up as the "warm pool", about 28–30 °C and several hundred metres thick. Off the coast of Peru the warm layer is thin and cold water wells up from below, so the sea there is several degrees cooler and rich in nutrients. The boundary between warm surface water and the cold deep is the thermocline, and in a normal year it tilts: deep in the west, shallow in the east. The warm water in the west feeds towering rain clouds, the air rises there, flows east aloft and sinks over the cool eastern Pacific; this loop is the Walker circulation.',
        'Every few years the loop weakens. If the trade winds slacken, less warm water is pushed west, the warm pool spreads back toward South America, the eastern thermocline deepens and upwelling of cold water stops. A warmer east means a smaller east-west temperature difference, which weakens the winds further: a positive feedback, described by Jacob Bjerknes in the 1960s. This is El Niño. La Niña is the opposite swing: stronger trades, an even warmer west, an even colder east and a more steeply tilted thermocline. Together they form the El Niño–Southern Oscillation (ENSO), the largest year-to-year climate fluctuation on Earth, recurring irregularly every two to seven years.',
        'Scientists track ENSO with the Niño-3.4 index: the sea-surface temperature anomaly, the difference from the long-term average, in a box of the central Pacific between 5°N and 5°S and 170°W to 120°W. Anomalies above about +0.5 °C that last several months count as El Niño, below −0.5 °C as La Niña. The slider in this simulation is that index. Moving it toward El Niño flattens the thermocline, weakens the drawn trade-wind arrows and flips the rainfall anomaly markers: Indonesia and eastern Australia turn drier while Peru and the southern United States turn wetter. Moving it toward La Niña does the reverse, and all these responses are drawn in proportion to the index.',
        'The simulation is a sketch, not a forecast. The real ocean and atmosphere evolve over months, with slow waves travelling along the thermocline that eventually end each event; the sim has no time dimension at all and simply shows a snapshot for each index value. The rainfall effects are drawn as fixed signs that grow with the index, but in reality they depend on the season, on the exact pattern of warming and on other climate modes such as the Indian Ocean Dipole, so no two El Niños are alike. Nothing in the sim represents the global average temperature, although strong El Niño years are typically the warmest on record.',
      ],
      id: [
        'Pada tahun normal, angin pasat bertiup mantap dari timur ke barat melintasi Pasifik tropis. Angin ini menyeret air permukaan yang dihangatkan matahari ke arah Indonesia, tempat air menumpuk menjadi "kolam hangat" bersuhu sekitar 28–30 °C dan tebalnya beberapa ratus meter. Di lepas pantai Peru lapisan hangatnya tipis dan air dingin naik dari bawah, sehingga lautnya beberapa derajat lebih dingin dan kaya nutrien. Batas antara air permukaan hangat dan air dalam yang dingin disebut termoklin, dan pada tahun normal batas ini miring: dalam di barat, dangkal di timur. Air hangat di barat memberi makan awan hujan yang menjulang, udara naik di sana, mengalir ke timur di ketinggian dan turun di atas Pasifik timur yang sejuk; putaran ini disebut sirkulasi Walker.',
        'Setiap beberapa tahun putaran itu melemah. Jika angin pasat mengendur, lebih sedikit air hangat yang terdorong ke barat, kolam hangat menyebar kembali ke arah Amerika Selatan, termoklin di timur mendalam, dan naiknya air dingin berhenti. Timur yang lebih hangat berarti selisih suhu timur-barat mengecil, yang melemahkan angin lebih jauh lagi: sebuah umpan balik positif, yang diuraikan Jacob Bjerknes pada 1960-an. Inilah El Niño. La Niña adalah ayunan kebalikannya: angin pasat lebih kuat, barat makin hangat, timur makin dingin, dan termoklin miring lebih tajam. Keduanya membentuk El Niño–Osilasi Selatan (ENSO), fluktuasi iklim tahunan terbesar di Bumi, yang berulang tak teratur setiap dua sampai tujuh tahun.',
        'Para ilmuwan memantau ENSO dengan indeks Niño-3.4: anomali suhu permukaan laut, yaitu selisih dari rata-rata jangka panjang, di sebuah kotak di Pasifik tengah antara 5°U dan 5°S serta 170°B sampai 120°B. Anomali di atas sekitar +0,5 °C yang bertahan beberapa bulan dihitung sebagai El Niño, di bawah −0,5 °C sebagai La Niña. Slider dalam simulasi ini adalah indeks tersebut. Menggesernya ke arah El Niño mendatarkan termoklin, melemahkan panah angin pasat yang digambar, dan membalik penanda anomali hujan: Indonesia dan Australia timur menjadi lebih kering, sementara Peru dan Amerika Serikat bagian selatan menjadi lebih basah. Menggesernya ke arah La Niña melakukan kebalikannya, dan semua respons itu digambar sebanding dengan indeks.',
        'Simulasi ini adalah sketsa, bukan ramalan. Laut dan atmosfer sungguhan berubah selama berbulan-bulan, dengan gelombang lambat yang merambat di sepanjang termoklin dan akhirnya mengakhiri tiap peristiwa; simulasi ini tidak punya dimensi waktu sama sekali dan hanya menampilkan potret untuk tiap nilai indeks. Dampak hujan digambar sebagai tanda tetap yang membesar bersama indeks, padahal kenyataannya bergantung pada musim, pola pemanasan yang persis, dan mode iklim lain seperti Dipol Samudra Hindia, sehingga tidak ada dua El Niño yang sama. Tidak ada bagian simulasi yang mewakili suhu rata-rata global, meskipun tahun El Niño kuat biasanya menjadi tahun terpanas yang tercatat.',
      ],
    },
    figure: {
      caption: {
        en: 'Cross-section of the equatorial Pacific. Normal/La Niña: strong trades pile warm water in the west, the thermocline tilts, cold water upwells off Peru and rain falls over Indonesia. El Niño: trades weaken, warm water spreads east, the thermocline flattens and the rain moves with the warm water.',
        id: 'Penampang Pasifik khatulistiwa. Normal/La Niña: angin pasat kuat menumpuk air hangat di barat, termoklin miring, air dingin naik di lepas Peru, dan hujan turun di atas Indonesia. El Niño: angin pasat melemah, air hangat menyebar ke timur, termoklin mendatar, dan hujan ikut berpindah bersama air hangat.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        const panel = (x0, title, windLen, cloudX, thermo, upwell) => `
  <text x="${x0 + 80}" y="14" text-anchor="middle" class="b">${title}</text>
  <text x="${x0 + 2}" y="30" class="s">${L('Indonesia', 'Indonesia')}</text>
  <text x="${x0 + 158}" y="30" text-anchor="end" class="s">${L('Peru', 'Peru')}</text>
  <line x1="${x0 + 80 + windLen / 2}" y1="46" x2="${x0 + 80 - windLen / 2}" y2="46" class="f" stroke="currentColor" marker-end="url(#e)"/>
  <text x="${x0 + 80}" y="60" text-anchor="middle" class="s">${L('trade winds', 'angin pasat')}</text>
  <ellipse cx="${cloudX}" cy="40" rx="18" ry="8" fill="#8b5cf6" opacity=".55"/>
  <ellipse cx="${cloudX + 10}" cy="36" rx="12" ry="7" fill="#8b5cf6" opacity=".55"/>
  <line x1="${cloudX - 6}" y1="50" x2="${cloudX - 8}" y2="64" stroke="#3b82f6" stroke-width="1.5"/>
  <line x1="${cloudX + 4}" y1="50" x2="${cloudX + 2}" y2="64" stroke="#3b82f6" stroke-width="1.5"/>
  <rect x="${x0}" y="70" width="160" height="120" fill="#3b82f6" opacity=".35"/>
  <path d="M${x0} 70 L${x0 + 160} 70 ${thermo} Z" fill="#ef4444" opacity=".55"/>
  <path d="M${x0} 70 L${x0 + 160} 70 ${thermo} Z" fill="none" stroke="currentColor" stroke-width="1.2"/>
  ${upwell ? `<line x1="${x0 + 150}" y1="130" x2="${x0 + 150}" y2="84" class="f" stroke="#3b82f6" marker-end="url(#e)"/>` : ''}
  <text x="${x0 + 4}" y="186" class="s" fill="#3b82f6">${L('cold deep water', 'air dalam dingin')}</text>`;
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Pacific cross-section in normal and El Niño conditions', 'Penampang Pasifik pada kondisi normal dan El Niño')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.b{font-weight:700}.s{font-size:9.5px;opacity:.85}.f{stroke-width:2;fill:none}</style>
  <defs><marker id="e" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="context-stroke"/></marker></defs>
  ${panel(10, L('Normal / La Niña', 'Normal / La Niña'), 70, 40, `L${10 + 160} 84 L${10} 160`, true)}
  ${panel(190, 'El Niño', 26, 270, `L${190 + 160} 118 L${190} 128`, false)}
  <text x="92" y="130" text-anchor="middle" class="s">${L('warm pool', 'kolam hangat')}</text>
  <text x="270" y="100" text-anchor="middle" class="s">${L('warm water spreads east', 'air hangat menyebar ke timur')}</text>
  <text x="112" y="136" class="s" fill="#3b82f6" text-anchor="end">${L('upwelling', 'air naik')}</text>
  <text x="180" y="214" text-anchor="middle" class="s">${L('thermocline = boundary between warm and cold water', 'termoklin = batas antara air hangat dan dingin')}</text>
  <text x="180" y="232" text-anchor="middle" class="s">${L('rain follows the warmest water', 'hujan mengikuti air yang paling hangat')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Trade winds and the warm pool reinforce each other, so a small change in one can grow into a full El Niño or La Niña (the Bjerknes feedback).',
        'El Niño means an unusually warm eastern and central Pacific and a flatter thermocline; La Niña means the opposite.',
        'ENSO is measured by the Niño-3.4 sea-surface temperature anomaly, with roughly ±0.5 °C as the threshold.',
        'Tropical rain follows the warmest water, so El Niño brings drought to Indonesia and eastern Australia and heavy rain to Peru.',
        'ENSO recurs irregularly every two to seven years and shifts weather worldwide through changes in the atmospheric circulation.',
      ],
      id: [
        'Angin pasat dan kolam hangat saling menguatkan, sehingga perubahan kecil pada salah satunya bisa tumbuh menjadi El Niño atau La Niña penuh (umpan balik Bjerknes).',
        'El Niño berarti Pasifik timur dan tengah luar biasa hangat dengan termoklin lebih datar; La Niña berarti kebalikannya.',
        'ENSO diukur dengan anomali suhu permukaan laut Niño-3.4, dengan ambang sekitar ±0,5 °C.',
        'Hujan tropis mengikuti air yang paling hangat, sehingga El Niño membawa kekeringan ke Indonesia dan Australia timur serta hujan lebat ke Peru.',
        'ENSO berulang tak teratur setiap dua sampai tujuh tahun dan menggeser cuaca di seluruh dunia melalui perubahan sirkulasi atmosfer.',
      ],
    },
    vocabulary: {
      en: [
        ['Trade winds', 'Steady winds that blow from east to west across the tropical oceans.'],
        ['Thermocline', 'The layer where ocean temperature drops sharply, separating warm surface water from the cold deep.'],
        ['Upwelling', 'Cold, nutrient-rich deep water rising to the surface, as off the coast of Peru in normal years.'],
        ['Walker circulation', 'The east-west loop of rising air over the warm western Pacific and sinking air over the cool east.'],
        ['Sea-surface temperature anomaly', 'The difference between the measured sea-surface temperature and its long-term average for that place and month.'],
        ['Niño-3.4 index', 'The sea-surface temperature anomaly averaged over the central Pacific box 5°N–5°S, 170°W–120°W; the standard ENSO indicator.'],
        ['Teleconnection', 'A link between weather in distant regions carried by changes in the atmospheric circulation.'],
      ],
      id: [
        ['Angin pasat', 'Angin mantap yang bertiup dari timur ke barat melintasi samudra tropis.'],
        ['Termoklin', 'Lapisan tempat suhu laut turun tajam, memisahkan air permukaan hangat dari air dalam yang dingin.'],
        ['Upwelling (air naik)', 'Air dalam yang dingin dan kaya nutrien naik ke permukaan, seperti di lepas pantai Peru pada tahun normal.'],
        ['Sirkulasi Walker', 'Putaran timur-barat berupa udara naik di atas Pasifik barat yang hangat dan udara turun di atas timur yang sejuk.'],
        ['Anomali suhu permukaan laut', 'Selisih antara suhu permukaan laut terukur dan rata-rata jangka panjangnya untuk tempat dan bulan itu.'],
        ['Indeks Niño-3.4', 'Anomali suhu permukaan laut yang dirata-ratakan di kotak Pasifik tengah 5°U–5°S, 170°B–120°B; indikator standar ENSO.'],
        ['Telekoneksi', 'Keterkaitan cuaca antara wilayah yang berjauhan yang dibawa oleh perubahan sirkulasi atmosfer.'],
      ],
    },
    misconceptions: {
      en: [
        ['El Niño is a storm or a single weather event.', 'It is a months-long pattern of ocean and atmosphere across the whole tropical Pacific, not a storm. Its effects on weather are indirect and spread around the globe.'],
        ['El Niño is caused by global warming.', 'ENSO is a natural oscillation recorded for centuries, long before industrial emissions. Warming may change how often or how strongly it occurs, but it does not create it.'],
        ['El Niño means more rain everywhere.', 'It shifts rain rather than adding it: Peru and the southern United States get wetter while Indonesia, eastern Australia and parts of southern Africa get drier. La Niña reverses the pattern.'],
        ['The ocean warms first and the wind only responds.', 'Neither leads alone. Weaker winds let warm water spread east, and the warmer east weakens the winds further; the feedback runs in both directions, which is why small disturbances can grow.'],
      ],
      id: [
        ['El Niño adalah badai atau satu peristiwa cuaca.', 'El Niño adalah pola laut dan atmosfer berbulan-bulan di seluruh Pasifik tropis, bukan badai. Dampaknya pada cuaca bersifat tidak langsung dan tersebar ke seluruh dunia.'],
        ['El Niño disebabkan oleh pemanasan global.', 'ENSO adalah osilasi alami yang tercatat selama berabad-abad, jauh sebelum emisi industri. Pemanasan mungkin mengubah seberapa sering atau seberapa kuat kejadiannya, tetapi tidak menciptakannya.'],
        ['El Niño berarti lebih banyak hujan di mana-mana.', 'El Niño memindahkan hujan, bukan menambahnya: Peru dan Amerika Serikat selatan menjadi lebih basah, sementara Indonesia, Australia timur, dan sebagian Afrika selatan menjadi lebih kering. La Niña membalik polanya.'],
        ['Laut menghangat dulu dan angin hanya menanggapi.', 'Tidak ada yang memimpin sendirian. Angin yang lebih lemah membiarkan air hangat menyebar ke timur, dan timur yang lebih hangat melemahkan angin lebih jauh; umpan baliknya berjalan dua arah, itulah sebabnya gangguan kecil bisa membesar.'],
      ],
    },
    realWorld: {
      en: [
        'The 1997–98 and 2015–16 El Niño events brought severe drought and huge peatland and forest fires to Sumatra and Kalimantan, with smoke haze spreading across Southeast Asia.',
        'Peruvian fishers named the phenomenon: the warm water that arrives around Christmas (El Niño, "the boy child") shuts off upwelling and the anchovy catch collapses.',
        'Indonesia\'s meteorological agency (BMKG) and farmers watch ENSO forecasts to plan rice planting, because a developing El Niño often means a late and weak rainy season.',
        'Global average temperature spikes in El Niño years, such as 1998, 2016 and 2023–24, because the ocean releases stored heat to the atmosphere.',
      ],
      id: [
        'El Niño 1997–98 dan 2015–16 membawa kekeringan parah serta kebakaran gambut dan hutan besar di Sumatra dan Kalimantan, dengan asap kabut yang menyebar ke seluruh Asia Tenggara.',
        'Nelayan Peru yang memberi nama fenomena ini: air hangat yang datang sekitar Natal (El Niño, "anak lelaki") menghentikan upwelling dan tangkapan ikan teri runtuh.',
        'BMKG dan para petani di Indonesia memantau prakiraan ENSO untuk merencanakan tanam padi, karena El Niño yang sedang berkembang sering berarti musim hujan datang terlambat dan lebih lemah.',
        'Suhu rata-rata global melonjak pada tahun El Niño, seperti 1998, 2016, dan 2023–24, karena laut melepaskan panas yang tersimpan ke atmosfer.',
      ],
    },
    questions: {
      en: [
        { q: 'The Niño-3.4 anomaly is reported as +1.8 °C for five months in a row. What ENSO state is this, and what would you expect for the rainy season in Java?', a: 'A moderate-to-strong El Niño, well above the +0.5 °C threshold. Warm water and the rain clouds have shifted east, so Java would likely see a delayed onset and below-normal rainfall.' },
        { q: 'Explain, step by step, how a slight weakening of the trade winds can grow into a full El Niño.', a: 'Weaker winds push less warm water west, so the eastern Pacific warms and the thermocline there deepens, cutting off cold upwelling. A warmer east shrinks the east-west temperature contrast that drives the winds, so they weaken further, and the loop repeats until the warm water has spread across the basin.' },
        { q: 'Set the sim to strong La Niña and look at the thermocline. Why does a steeper thermocline mean a richer fishery off Peru?', a: 'In La Niña the thermocline is very shallow in the east, so the winds easily bring cold deep water to the surface. That water carries nutrients that feed plankton, and plankton feed the anchovies; in El Niño the deep warm layer blocks this supply.' },
      ],
      id: [
        { q: 'Anomali Niño-3.4 dilaporkan +1,8 °C selama lima bulan berturut-turut. Keadaan ENSO apa ini, dan apa yang kamu perkirakan untuk musim hujan di Jawa?', a: 'El Niño sedang sampai kuat, jauh di atas ambang +0,5 °C. Air hangat dan awan hujan bergeser ke timur, sehingga Jawa kemungkinan mengalami awal musim hujan yang terlambat dan curah hujan di bawah normal.' },
        { q: 'Jelaskan langkah demi langkah bagaimana sedikit melemahnya angin pasat bisa tumbuh menjadi El Niño penuh.', a: 'Angin yang lebih lemah mendorong lebih sedikit air hangat ke barat, sehingga Pasifik timur menghangat dan termoklin di sana mendalam, memutus naiknya air dingin. Timur yang lebih hangat memperkecil kontras suhu timur-barat yang menggerakkan angin, sehingga angin makin lemah, dan putaran ini berulang sampai air hangat menyebar di seluruh cekungan.' },
        { q: 'Atur simulasi ke La Niña kuat dan perhatikan termoklin. Mengapa termoklin yang lebih curam berarti perikanan yang lebih kaya di lepas pantai Peru?', a: 'Pada La Niña termoklin sangat dangkal di timur, sehingga angin dengan mudah mengangkat air dalam yang dingin ke permukaan. Air itu membawa nutrien yang memberi makan plankton, dan plankton memberi makan ikan teri; pada El Niño lapisan hangat yang tebal menghalangi pasokan ini.' },
      ],
    },
  },
};
