// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'See the natural Chapman cycle: O₂ + UV → 2 O, then O + O₂ → O₃, then O₃ + UV → O₂ + O.',
      'Connect Cl atoms (from CFCs) to catalytic ozone loss.',
      'Understand why the Montreal Protocol (1987) banned CFCs and the layer is now slowly recovering.',
    ],
    id: [
      'Melihat siklus Chapman alami: O₂ + UV → 2 O, lalu O + O₂ → O₃, lalu O₃ + UV → O₂ + O.',
      'Menghubungkan atom Cl (dari CFC) dengan kehilangan ozon katalitik.',
      'Memahami mengapa Protokol Montreal (1987) melarang CFC dan lapisannya kini perlahan pulih.',
    ],
  },  tryThis: {
    en: [
      'CFC = 0 — natural Chapman steady state, O₃ ≈ 300 DU.',
      'CFC = 3 ppb (1990s peak) — Antarctic-style depletion, ~150 DU.',
      'Sweep CFC down to 0 — recovery curve over decades.',
    ],
    id: [
      'CFC = 0 — keadaan tunak Chapman alami, O₃ ≈ 300 DU.',
      'CFC = 3 ppb (puncak 1990-an) — pengurangan ala Antarktika, ~150 DU.',
      'Geser CFC turun ke 0 — kurva pemulihan dekade.',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'Ozone (O₃) is a molecule of three oxygen atoms. About 90% of it lives in the stratosphere, 15–35 km up, where it is made and destroyed continuously by sunlight in what is called the Chapman cycle. Short-wave ultraviolet light (below 242 nm) splits an ordinary oxygen molecule into two atoms, O₂ + UV → O + O; each atom then joins another O₂ to make ozone, O + O₂ → O₃. Ozone in turn absorbs UV of up to about 320 nm and falls apart, O₃ + UV → O₂ + O, and the atom is quickly recycled into new ozone. Only the slow reaction O + O₃ → 2 O₂ really removes ozone. The balance between production and loss leaves a thin layer that, if compressed to sea-level pressure, would be only about 3 mm thick: 300 Dobson units. Absorbing the UV is what makes this layer the planet\'s sunscreen.',
        'Chlorofluorocarbons (CFCs) were invented as safe, non-toxic refrigerants and propellants. Their very stability is the problem: they survive for 50–100 years, long enough to drift up into the stratosphere, where hard UV finally breaks them, for example CFCl₃ + UV → CFCl₂ + Cl. In 1974 Mario Molina and Sherwood Rowland showed what the freed chlorine atom does. It attacks ozone, Cl + O₃ → ClO + O₂, and the ClO then meets an oxygen atom, ClO + O → Cl + O₂. Add the two steps and the chlorine cancels out: the net effect is O + O₃ → 2 O₂, the natural loss reaction, but now running thousands of times faster. The chlorine is a catalyst, regenerated every cycle, and one atom can destroy on the order of 100,000 ozone molecules before it is finally locked into a reservoir compound such as HCl.',
        'The simulation keeps the chemistry at the level of a budget. Ozone production is fixed by the UV slider, and the loss rate is the natural Chapman loss multiplied by (1 + 0.6 × CFC), so the steady-state column is 300 DU × UV ÷ (1 + 0.6 × CFC); with 3 ppb of CFC that gives about 107 DU. The column relaxes toward that target over a few seconds, and the time axis of the history chart is simply seconds of simulation, not years, so the "recovery" you see is the shape of the response, not its real pace. The polar-vortex toggle triples the CFC effect to mimic Antarctic spring, where ice-cloud particles in the very cold vortex convert the chlorine reservoirs back into active chlorine, producing the ozone hole each September and October. The dashed 220 DU line is the conventional definition of a "hole".',
        'Much is simplified. Real ozone depends on altitude, latitude and season; nitrogen oxides and bromine run their own catalytic cycles; and the amount of active chlorine, not the CFC concentration itself, controls the loss. The CFC slider should therefore be read as a stand-in for the total chlorine loading of the stratosphere. The real recovery is slow because CFCs are still leaking out of old equipment and because of their long lifetimes: ozone over most of the world is expected to return to 1980 levels around 2040, over the Antarctic only around 2066.',
      ],
      id: [
        'Ozon (O₃) adalah molekul dari tiga atom oksigen. Sekitar 90% ozon berada di stratosfer, 15–35 km di atas permukaan, tempat ia terus-menerus dibuat dan dihancurkan oleh cahaya matahari dalam apa yang disebut siklus Chapman. Sinar ultraviolet gelombang pendek (di bawah 242 nm) memecah molekul oksigen biasa menjadi dua atom, O₂ + UV → O + O; tiap atom lalu bergabung dengan O₂ lain membentuk ozon, O + O₂ → O₃. Ozon pada gilirannya menyerap UV sampai sekitar 320 nm dan terurai, O₃ + UV → O₂ + O, dan atomnya segera didaur ulang menjadi ozon baru. Hanya reaksi lambat O + O₃ → 2 O₂ yang benar-benar menghilangkan ozon. Keseimbangan antara produksi dan kehilangan menyisakan lapisan tipis yang, jika dimampatkan ke tekanan permukaan laut, hanya setebal sekitar 3 mm: 300 satuan Dobson. Penyerapan UV inilah yang menjadikan lapisan itu tabir surya planet.',
        'Klorofluorokarbon (CFC) diciptakan sebagai zat pendingin dan propelan yang aman dan tidak beracun. Justru kestabilannya yang menjadi masalah: CFC bertahan 50–100 tahun, cukup lama untuk melayang naik ke stratosfer, tempat UV keras akhirnya memecahnya, misalnya CFCl₃ + UV → CFCl₂ + Cl. Pada 1974 Mario Molina dan Sherwood Rowland menunjukkan apa yang dilakukan atom klorin yang terbebas itu. Ia menyerang ozon, Cl + O₃ → ClO + O₂, lalu ClO bertemu atom oksigen, ClO + O → Cl + O₂. Jumlahkan kedua langkah dan klorinnya saling meniadakan: efek netonya adalah O + O₃ → 2 O₂, reaksi kehilangan alami, tetapi kini berjalan ribuan kali lebih cepat. Klorin adalah katalis, diregenerasi di setiap siklus, dan satu atom dapat menghancurkan sekitar 100.000 molekul ozon sebelum akhirnya terkunci dalam senyawa reservoir seperti HCl.',
        'Simulasi menjaga kimianya pada tingkat neraca. Produksi ozon ditentukan oleh slider UV, dan laju kehilangan adalah kehilangan Chapman alami dikali (1 + 0,6 × CFC), sehingga kolom keadaan tunaknya adalah 300 DU × UV ÷ (1 + 0,6 × CFC); dengan CFC 3 ppb hasilnya sekitar 107 DU. Kolom bergerak menuju target itu dalam beberapa detik, dan sumbu waktu grafik riwayat hanyalah detik simulasi, bukan tahun, sehingga "pemulihan" yang kamu lihat adalah bentuk responsnya, bukan kecepatan sebenarnya. Tombol vorteks kutub melipat-tigakan efek CFC untuk meniru musim semi Antarktika, ketika partikel awan es dalam vorteks yang sangat dingin mengubah reservoir klorin kembali menjadi klorin aktif, menghasilkan lubang ozon setiap September dan Oktober. Garis putus-putus 220 DU adalah definisi konvensional sebuah "lubang".',
        'Banyak hal disederhanakan. Ozon sungguhan bergantung pada ketinggian, lintang, dan musim; oksida nitrogen dan bromin menjalankan siklus katalitiknya sendiri; dan jumlah klorin aktif, bukan konsentrasi CFC itu sendiri, yang mengendalikan kehilangan. Slider CFC karena itu sebaiknya dibaca sebagai pengganti total muatan klorin di stratosfer. Pemulihan sebenarnya lambat karena CFC masih bocor dari peralatan lama dan karena masa hidupnya yang panjang: ozon di sebagian besar dunia diperkirakan kembali ke tingkat 1980 sekitar 2040, di atas Antarktika baru sekitar 2066.',
      ],
    },
    figure: {
      caption: {
        en: 'The chlorine catalytic cycle. UV frees a chlorine atom from a CFC molecule; the atom destroys an ozone molecule, becomes ClO, and is regenerated by an oxygen atom. The chlorine is unchanged after each loop, so one atom can repeat the cycle about 100,000 times.',
        id: 'Siklus katalitik klorin. UV membebaskan atom klorin dari molekul CFC; atom itu menghancurkan molekul ozon, menjadi ClO, dan diregenerasi oleh atom oksigen. Klorin tidak berubah setelah tiap putaran, sehingga satu atom dapat mengulang siklus sekitar 100.000 kali.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Catalytic destruction of ozone by chlorine', 'Penghancuran katalitik ozon oleh klorin')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.b{font-weight:700;font-size:13px}.s{font-size:9.5px;opacity:.85}.f{stroke-width:2;fill:none}</style>
  <defs><marker id="o" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="context-stroke"/></marker></defs>
  <rect x="14" y="20" width="84" height="34" rx="6" fill="#10b981" fill-opacity=".22" stroke="#10b981"/>
  <text x="56" y="34" text-anchor="middle" class="b">CFCl₃</text>
  <text x="56" y="48" text-anchor="middle" class="s">CFC-11</text>
  <path d="M30 4 L44 18" class="f" stroke="#f59e0b" marker-end="url(#o)"/>
  <text x="60" y="10" fill="#f59e0b" class="s">UV</text>
  <line x1="100" y1="37" x2="156" y2="37" class="f" stroke="#10b981" marker-end="url(#o)"/>
  <text x="128" y="30" text-anchor="middle" class="s">${L('releases', 'melepas')}</text>
  <circle cx="190" cy="40" r="22" fill="#8b5cf6" fill-opacity=".25" stroke="#8b5cf6" stroke-width="1.5"/>
  <text x="190" y="45" text-anchor="middle" class="b">Cl</text>
  <circle cx="190" cy="190" r="22" fill="#8b5cf6" fill-opacity=".25" stroke="#8b5cf6" stroke-width="1.5"/>
  <text x="190" y="195" text-anchor="middle" class="b">ClO</text>
  <path d="M208 54 Q262 115 208 176" class="f" stroke="currentColor" marker-end="url(#o)"/>
  <path d="M172 176 Q118 115 172 54" class="f" stroke="currentColor" marker-end="url(#o)"/>
  <line x1="300" y1="80" x2="248" y2="96" class="f" stroke="#3b82f6" marker-end="url(#o)"/>
  <text x="304" y="78" fill="#3b82f6" class="b">O₃</text>
  <text x="304" y="92" fill="#3b82f6" class="s">${L('ozone destroyed', 'ozon dihancurkan')}</text>
  <line x1="246" y1="138" x2="298" y2="156" class="f" stroke="#ef4444" marker-end="url(#o)"/>
  <text x="304" y="152" fill="#ef4444" class="b">O₂</text>
  <line x1="80" y1="156" x2="132" y2="138" class="f" stroke="#3b82f6" marker-end="url(#o)"/>
  <text x="76" y="152" text-anchor="end" fill="#3b82f6" class="b">O</text>
  <text x="76" y="166" text-anchor="end" fill="#3b82f6" class="s">${L('free oxygen atom', 'atom oksigen bebas')}</text>
  <line x1="134" y1="96" x2="82" y2="80" class="f" stroke="#ef4444" marker-end="url(#o)"/>
  <text x="76" y="78" text-anchor="end" fill="#ef4444" class="b">O₂</text>
  <text x="190" y="110" text-anchor="middle" class="s">Cl + O₃ → ClO + O₂</text>
  <text x="190" y="124" text-anchor="middle" class="s">ClO + O → Cl + O₂</text>
  <text x="190" y="140" text-anchor="middle" class="s">${L('net:', 'neto:')} O + O₃ → 2 O₂</text>
  <text x="190" y="230" text-anchor="middle" class="s">${L('Cl comes back unchanged: a catalyst, ~100 000 loops per atom', 'Cl kembali tak berubah: katalis, ~100.000 putaran per atom')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Stratospheric ozone is constantly made from O₂ by UV and destroyed again; the column we see is the balance between the two.',
        'A chlorine atom destroys ozone and is regenerated, so it acts as a catalyst and can repeat the cycle around 100,000 times.',
        'CFCs are harmless at ground level; the damage happens only after decades, when they reach the stratosphere and UV breaks them apart.',
        'The Antarctic ozone hole forms each spring because polar stratospheric clouds turn stored chlorine into its active form.',
        'The Montreal Protocol worked: chlorine is falling and the layer is recovering, but slowly, because CFCs persist for 50–100 years.',
      ],
      id: [
        'Ozon stratosfer terus-menerus dibuat dari O₂ oleh UV dan dihancurkan lagi; kolom yang kita lihat adalah keseimbangan keduanya.',
        'Atom klorin menghancurkan ozon dan diregenerasi, sehingga bertindak sebagai katalis dan dapat mengulang siklus sekitar 100.000 kali.',
        'CFC tidak berbahaya di permukaan tanah; kerusakan baru terjadi setelah berpuluh tahun, ketika CFC mencapai stratosfer dan dipecah UV.',
        'Lubang ozon Antarktika terbentuk setiap musim semi karena awan stratosfer kutub mengubah klorin tersimpan menjadi bentuk aktifnya.',
        'Protokol Montreal berhasil: klorin menurun dan lapisan ozon pulih, tetapi lambat, karena CFC bertahan 50–100 tahun.',
      ],
    },
    vocabulary: {
      en: [
        ['Ozone (O₃)', 'A molecule of three oxygen atoms; in the stratosphere it absorbs harmful UV, at ground level it is a pollutant.'],
        ['Chapman cycle', 'The set of sunlight-driven reactions that create and destroy ozone naturally in the stratosphere.'],
        ['Dobson unit (DU)', 'A measure of the ozone column: 100 DU equals a layer 1 mm thick at sea-level pressure. A normal column is about 300 DU.'],
        ['Catalyst', 'A substance that speeds up a reaction without being used up, so a small amount can have a large effect.'],
        ['CFC', 'Chlorofluorocarbon: a stable, chlorine-containing compound once used in refrigerators, aerosols and foams.'],
        ['Chlorine reservoir', 'A compound such as HCl or ClONO₂ that holds chlorine in an inactive form that does not attack ozone.'],
        ['Polar stratospheric cloud', 'An ice or nitric-acid cloud that forms in the very cold polar stratosphere and releases active chlorine from its reservoirs.'],
        ['Ozone hole', 'A region, usually over Antarctica in spring, where the ozone column falls below 220 DU.'],
      ],
      id: [
        ['Ozon (O₃)', 'Molekul dari tiga atom oksigen; di stratosfer ia menyerap UV berbahaya, di permukaan tanah ia adalah polutan.'],
        ['Siklus Chapman', 'Rangkaian reaksi yang digerakkan cahaya matahari yang membuat dan menghancurkan ozon secara alami di stratosfer.'],
        ['Satuan Dobson (DU)', 'Ukuran kolom ozon: 100 DU setara lapisan setebal 1 mm pada tekanan permukaan laut. Kolom normal sekitar 300 DU.'],
        ['Katalis', 'Zat yang mempercepat reaksi tanpa ikut habis, sehingga jumlah kecil dapat berefek besar.'],
        ['CFC', 'Klorofluorokarbon: senyawa stabil berklorin yang dulu dipakai di lemari es, aerosol, dan busa.'],
        ['Reservoir klorin', 'Senyawa seperti HCl atau ClONO₂ yang menyimpan klorin dalam bentuk tidak aktif yang tidak menyerang ozon.'],
        ['Awan stratosfer kutub', 'Awan es atau asam nitrat yang terbentuk di stratosfer kutub yang sangat dingin dan melepaskan klorin aktif dari reservoirnya.'],
        ['Lubang ozon', 'Wilayah, biasanya di atas Antarktika pada musim semi, tempat kolom ozon turun di bawah 220 DU.'],
      ],
    },
    misconceptions: {
      en: [
        ['The ozone hole causes global warming.', 'They are separate problems. The hole lets more UV reach the ground; warming is caused by greenhouse gases trapping infrared. CFCs happen to be strong greenhouse gases too, but ozone loss itself slightly cools the stratosphere.'],
        ['The ozone hole is an actual gap with no ozone at all.', 'It is a region where the column drops below 220 DU, roughly a third to half of normal. Ozone is strongly depleted at certain altitudes, not absent everywhere.'],
        ['CFCs are heavy, so they cannot rise to the stratosphere.', 'Air in the lower atmosphere is thoroughly mixed by weather regardless of molecular weight. CFCs are measured in the stratosphere in the amounts expected, and their breakdown products are seen there as well.'],
        ['Since CFCs were banned in 1987, the problem is over.', 'Production was phased out gradually, existing equipment still leaks, and CFC lifetimes are 50–100 years. Stratospheric chlorine peaked around 2000 and the Antarctic hole is not expected to close until the 2060s.'],
      ],
      id: [
        ['Lubang ozon menyebabkan pemanasan global.', 'Keduanya masalah yang terpisah. Lubang ozon membiarkan lebih banyak UV mencapai tanah; pemanasan disebabkan gas rumah kaca yang menjebak inframerah. CFC memang juga gas rumah kaca yang kuat, tetapi kehilangan ozon sendiri justru sedikit mendinginkan stratosfer.'],
        ['Lubang ozon adalah celah sungguhan tanpa ozon sama sekali.', 'Lubang ozon adalah wilayah dengan kolom di bawah 220 DU, kira-kira sepertiga sampai setengah dari normal. Ozon sangat berkurang pada ketinggian tertentu, bukan hilang di mana-mana.'],
        ['CFC berat, jadi tidak mungkin naik ke stratosfer.', 'Udara di atmosfer bawah teraduk rata oleh cuaca tanpa memandang berat molekul. CFC terukur di stratosfer dalam jumlah yang diperkirakan, dan hasil pemecahannya juga terlihat di sana.'],
        ['Karena CFC dilarang pada 1987, masalahnya sudah selesai.', 'Produksi dihentikan bertahap, peralatan lama masih bocor, dan masa hidup CFC 50–100 tahun. Klorin stratosfer mencapai puncak sekitar tahun 2000 dan lubang Antarktika diperkirakan baru menutup pada 2060-an.'],
      ],
    },
    realWorld: {
      en: [
        'British Antarctic Survey scientists led by Joseph Farman reported the Antarctic ozone hole in 1985, two years before the Montreal Protocol was signed by the world\'s governments.',
        'Molina, Rowland and Paul Crutzen shared the 1995 Nobel Prize in Chemistry for explaining how CFCs and nitrogen oxides destroy stratospheric ozone.',
        'Indonesia, on the equator, sits where the ozone column is naturally thinnest (around 250–270 DU) and the sun is overhead, which is one reason UV index values there are often extreme even without a "hole".',
        'The replacement gases, HCFCs and HFCs, spare the ozone layer but are potent greenhouse gases, so the 2016 Kigali Amendment now phases HFCs down as well.',
      ],
      id: [
        'Ilmuwan British Antarctic Survey yang dipimpin Joseph Farman melaporkan lubang ozon Antarktika pada 1985, dua tahun sebelum Protokol Montreal ditandatangani pemerintah negara-negara dunia.',
        'Molina, Rowland, dan Paul Crutzen berbagi Hadiah Nobel Kimia 1995 karena menjelaskan bagaimana CFC dan oksida nitrogen menghancurkan ozon stratosfer.',
        'Indonesia, di khatulistiwa, berada di tempat kolom ozon secara alami paling tipis (sekitar 250–270 DU) dan matahari tepat di atas kepala, salah satu alasan indeks UV di sana sering ekstrem meskipun tanpa "lubang".',
        'Gas pengganti, HCFC dan HFC, menyelamatkan lapisan ozon tetapi merupakan gas rumah kaca yang kuat, sehingga Amendemen Kigali 2016 kini juga menurunkan HFC secara bertahap.',
      ],
    },
    questions: {
      en: [
        { q: 'Write the two steps of the chlorine cycle and add them together. What is the net reaction, and why does this make chlorine a catalyst?', a: 'Cl + O₃ → ClO + O₂ and ClO + O → Cl + O₂. Adding them, Cl and ClO cancel, leaving O + O₃ → 2 O₂. Chlorine is consumed in the first step and returned in the second, so it is not used up and can repeat the cycle.' },
        { q: 'In the sim the steady-state column is 300 × UV ÷ (1 + 0.6 × CFC). What column do you get at CFC = 1.5 ppb (the "2024" preset) with normal UV, and with the polar-vortex toggle on?', a: 'Normal: 300 ÷ (1 + 0.9) ≈ 158 DU. Polar vortex triples the effect: 300 ÷ (1 + 2.7) ≈ 81 DU, well below the 220 DU hole threshold. This is why the hole still appears each spring even though chlorine is declining.' },
        { q: 'CFC production essentially ended in the 1990s, yet the ozone layer is not expected to fully recover until the 2060s. Give two reasons.', a: 'CFC molecules last 50–100 years, so those already in the air keep supplying chlorine for decades. Also, it takes years for gas released at the surface to reach the stratosphere, and old refrigerators and foams keep leaking their CFC content.' },
      ],
      id: [
        { q: 'Tuliskan dua langkah siklus klorin dan jumlahkan. Apa reaksi netonya, dan mengapa ini menjadikan klorin katalis?', a: 'Cl + O₃ → ClO + O₂ dan ClO + O → Cl + O₂. Jika dijumlahkan, Cl dan ClO saling meniadakan, menyisakan O + O₃ → 2 O₂. Klorin dipakai di langkah pertama dan dikembalikan di langkah kedua, sehingga tidak habis dan dapat mengulang siklus.' },
        { q: 'Dalam simulasi kolom keadaan tunaknya adalah 300 × UV ÷ (1 + 0,6 × CFC). Berapa kolom pada CFC = 1,5 ppb (preset "2024") dengan UV normal, dan dengan tombol vorteks kutub aktif?', a: 'Normal: 300 ÷ (1 + 0,9) ≈ 158 DU. Vorteks kutub melipat-tigakan efeknya: 300 ÷ (1 + 2,7) ≈ 81 DU, jauh di bawah ambang lubang 220 DU. Itulah sebabnya lubang masih muncul setiap musim semi meskipun klorin sedang menurun.' },
        { q: 'Produksi CFC praktis berakhir pada 1990-an, tetapi lapisan ozon diperkirakan baru pulih penuh pada 2060-an. Berikan dua alasan.', a: 'Molekul CFC bertahan 50–100 tahun, sehingga yang sudah ada di udara terus memasok klorin selama berpuluh tahun. Selain itu, gas yang dilepas di permukaan butuh bertahun-tahun untuk mencapai stratosfer, dan lemari es serta busa lama masih membocorkan kandungan CFC-nya.' },
      ],
    },
  },
};
