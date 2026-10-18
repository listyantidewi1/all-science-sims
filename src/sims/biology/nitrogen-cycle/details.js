// Long-form text for the sim page aside, kept out of manifest.js.
export default {
  objectives: {
    en: [
      'Name the reservoirs of the nitrogen cycle and the five processes that move nitrogen between them: fixation, nitrification, assimilation, ammonification and denitrification, with the organisms responsible.',
      'Explain why atmospheric N₂ is unusable to most organisms and how legumes, free-living bacteria, lightning and the Haber process convert it into usable forms.',
      'Use pool sizes (kg N/ha) and flow rates (kg N/ha/yr) to predict how fertiliser, legume cover, rainfall and waterlogging change soil nitrate, runoff and the risk of eutrophication.',
    ],
    id: [
      'Menyebutkan cadangan dalam siklus nitrogen dan lima proses yang memindahkan nitrogen di antaranya: fiksasi, nitrifikasi, asimilasi, amonifikasi, dan denitrifikasi, beserta organisme yang berperan.',
      'Menjelaskan mengapa N₂ atmosfer tidak dapat dipakai sebagian besar organisme dan bagaimana legum, bakteri bebas, petir, dan proses Haber mengubahnya menjadi bentuk yang dapat dipakai.',
      'Menggunakan ukuran cadangan (kg N/ha) dan laju aliran (kg N/ha/tahun) untuk memprediksi bagaimana pupuk, tutupan legum, curah hujan, dan genangan air mengubah nitrat tanah, limpasan, dan risiko eutrofikasi.',
    ],
  },
  tryThis: {
    en: [
      'Start with no fertiliser and no legumes and let the system settle for a few years. How much nitrogen enters the field each year, and where does it come from?',
      'Raise fertiliser to 100, then 200, then 300 kg N/ha/yr, waiting for the pools to settle each time. Record nitrate runoff. Is runoff proportional to fertiliser?',
      'Set fertiliser back to 0 and raise legume cover to 50 %. Compare plant nitrogen and runoff with the 100 kg fertiliser run.',
      'With 200 kg fertiliser, switch on Waterlogged soil. Watch the denitrification arrow thicken and the runoff fall. Where did the nitrogen go?',
    ],
    id: [
      'Mulai tanpa pupuk dan tanpa legum dan biarkan sistem stabil beberapa tahun. Berapa nitrogen yang masuk ke lahan tiap tahun, dan dari mana asalnya?',
      'Naikkan pupuk ke 100, lalu 200, lalu 300 kg N/ha/tahun, tunggu cadangan stabil setiap kali. Rekam limpasan nitrat. Apakah limpasan sebanding dengan pupuk?',
      'Kembalikan pupuk ke 0 dan naikkan tutupan legum ke 50 %. Bandingkan nitrogen tumbuhan dan limpasan dengan percobaan pupuk 100 kg.',
      'Dengan pupuk 200 kg, nyalakan Waterlogged soil (tanah tergenang). Amati panah denitrifikasi menebal dan limpasan turun. Ke mana nitrogennya pergi?',
    ],
  },

  learn: {
    background: {
      en: [
        'Nitrogen is needed for every amino acid, protein and nucleotide, and the atmosphere is 78 % nitrogen gas. Yet N₂ is almost useless to living things because its triple bond (945 kJ/mol) is so hard to break. Only a few prokaryotes carry the enzyme nitrogenase that can do it: free-living soil bacteria such as Azotobacter, cyanobacteria in water and rice paddies, and Rhizobium living in the root nodules of legumes (beans, peanuts, soybean, Leucaena). A good soybean crop fixes 100–200 kg N per hectare per year; lightning adds only about 5 kg. Since 1913 the Haber–Bosch process has fixed nitrogen industrially to make fertiliser, and humans now fix more nitrogen than all natural processes combined.',
        'Once in the soil, nitrogen cycles between forms. Decomposers (bacteria and fungi) break down dead leaves, dead animals, faeces and urea and release ammonium, NH₄⁺ (ammonification or mineralisation). Nitrifying bacteria oxidise ammonium to nitrite and then nitrate: Nitrosomonas does NH₄⁺ → NO₂⁻ and Nitrobacter does NO₂⁻ → NO₃⁻ (nitrification), which needs oxygen. Plants absorb both ammonium and nitrate through their roots and build them into proteins (assimilation); animals obtain nitrogen only by eating plants or other animals. In the simulation each pool is measured in kg of nitrogen per hectare and each arrow in kg N per hectare per year; the arrow thickness and the number of moving dots are proportional to the flow.',
        'Nitrogen leaves the soil in two main ways. In waterlogged, oxygen-poor soil, denitrifying bacteria such as Pseudomonas use nitrate instead of oxygen for respiration and return N₂ (and some N₂O, a greenhouse gas) to the air. Nitrate is also very soluble and carries a negative charge, so clay particles do not hold it; rain washes it down past the roots (leaching) and into rivers and lakes. In the sim the leaching rate is proportional to the nitrate pool and to rainfall, so heavy fertiliser plus heavy rain gives the largest losses: typically 20–40 % of applied fertiliser nitrogen never reaches the crop.',
        'Nitrate that reaches water fertilises algae. The resulting bloom blocks light, and when the algae die their decomposition uses up dissolved oxygen, killing fish: this is eutrophication. The simulation turns runoff into an algal-bloom risk, from low below 10 kg N/ha/yr to severe above 80. Compare the strategies: splitting fertiliser into smaller doses, growing legumes instead of buying fertiliser, planting cover crops that keep taking up nitrate, and keeping buffer strips of vegetation along streams.',
      ],
      id: [
        'Nitrogen dibutuhkan untuk setiap asam amino, protein, dan nukleotida, dan atmosfer mengandung 78 % gas nitrogen. Namun N₂ hampir tidak berguna bagi makhluk hidup karena ikatan rangkap tiganya (945 kJ/mol) sangat sulit diputus. Hanya sedikit prokariota yang memiliki enzim nitrogenase untuk melakukannya: bakteri tanah bebas seperti Azotobacter, sianobakteri di air dan sawah, serta Rhizobium yang hidup di bintil akar legum (kacang-kacangan, kacang tanah, kedelai, lamtoro). Tanaman kedelai yang baik memfiksasi 100–200 kg N per hektar per tahun; petir hanya menambah sekitar 5 kg. Sejak 1913 proses Haber–Bosch memfiksasi nitrogen secara industri untuk membuat pupuk, dan kini manusia memfiksasi lebih banyak nitrogen daripada seluruh proses alami bersama-sama.',
        'Setelah berada di tanah, nitrogen berputar di antara berbagai bentuk. Pengurai (bakteri dan jamur) merombak daun mati, hewan mati, feses, dan urea lalu melepaskan amonium, NH₄⁺ (amonifikasi atau mineralisasi). Bakteri nitrifikasi mengoksidasi amonium menjadi nitrit lalu nitrat: Nitrosomonas melakukan NH₄⁺ → NO₂⁻ dan Nitrobacter melakukan NO₂⁻ → NO₃⁻ (nitrifikasi), yang membutuhkan oksigen. Tumbuhan menyerap amonium maupun nitrat melalui akar dan merakitnya menjadi protein (asimilasi); hewan memperoleh nitrogen hanya dengan memakan tumbuhan atau hewan lain. Dalam simulasi setiap cadangan diukur dalam kg nitrogen per hektar dan setiap panah dalam kg N per hektar per tahun; ketebalan panah dan jumlah titik yang bergerak sebanding dengan alirannya.',
        'Nitrogen meninggalkan tanah dengan dua cara utama. Di tanah tergenang yang miskin oksigen, bakteri denitrifikasi seperti Pseudomonas memakai nitrat sebagai pengganti oksigen untuk respirasi dan mengembalikan N₂ (dan sebagian N₂O, gas rumah kaca) ke udara. Nitrat juga sangat larut dan bermuatan negatif sehingga partikel lempung tidak menahannya; hujan membilasnya melewati akar (pelindian) ke sungai dan danau. Dalam simulasi laju pelindian sebanding dengan cadangan nitrat dan curah hujan, sehingga pupuk berat ditambah hujan lebat memberi kehilangan terbesar: biasanya 20–40 % nitrogen pupuk tidak pernah sampai ke tanaman.',
        'Nitrat yang mencapai perairan menyuburkan alga. Ledakan alga menghalangi cahaya, dan ketika alga mati pembusukannya menghabiskan oksigen terlarut sehingga ikan mati: inilah eutrofikasi. Simulasi mengubah limpasan menjadi risiko ledakan alga, dari rendah di bawah 10 kg N/ha/tahun hingga parah di atas 80. Bandingkan strateginya: membagi pupuk menjadi dosis kecil, menanam legum alih-alih membeli pupuk, menanam tanaman penutup yang terus menyerap nitrat, dan mempertahankan jalur penyangga vegetasi di sepanjang sungai.',
      ],
    },
    figure: {
      caption: {
        en: 'The nitrogen cycle with typical flows for a farmed field in kg N per hectare per year. Fixation (legume root nodules, free-living bacteria, lightning) and fertiliser bring nitrogen in; nitrification turns ammonium into nitrate; plants assimilate both; decomposers return ammonium by ammonification; denitrification and nitrate leaching remove nitrogen again.',
        id: 'Siklus nitrogen dengan aliran tipikal lahan pertanian dalam kg N per hektar per tahun. Fiksasi (bintil akar legum, bakteri bebas, petir) dan pupuk memasukkan nitrogen; nitrifikasi mengubah amonium menjadi nitrat; tumbuhan mengasimilasi keduanya; pengurai mengembalikan amonium melalui amonifikasi; denitrifikasi dan pelindian nitrat mengeluarkan nitrogen kembali.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        const box = (x, y, w, h, fill, t1, t2) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="6" fill="${fill}" stroke="currentColor" stroke-width="1"/><text x="${x + w / 2}" y="${y + (t2 ? 13 : 17)}" text-anchor="middle" class="b">${t1}</text>${t2 ? `<text x="${x + w / 2}" y="${y + 25}" text-anchor="middle" class="s">${t2}</text>` : ''}`;
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Nitrogen cycle reservoirs and flows', 'Cadangan dan aliran siklus nitrogen')}">
  <style>text{font:9px system-ui,sans-serif;fill:currentColor}.b{font:bold 10px system-ui,sans-serif;fill:currentColor}.s{font:8px system-ui,sans-serif;fill:currentColor}.a{fill:none;stroke-width:1.6}</style>
  <defs><marker id="nc-m" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 z" fill="currentColor"/></marker></defs>
  ${box(90, 6, 180, 28, 'rgba(56,189,248,0.18)', L('Atmosphere N₂ (78 %)', 'Atmosfer N₂ (78 %)'), L('triple bond, 945 kJ/mol', 'ikatan rangkap tiga, 945 kJ/mol'))}
  ${box(20, 96, 86, 34, 'rgba(16,185,129,0.2)', L('Plants', 'Tumbuhan'), L('proteins, DNA', 'protein, DNA'))}
  ${box(236, 96, 90, 34, 'rgba(244,114,182,0.2)', L('Animals', 'Hewan'), L('eat plants', 'makan tumbuhan'))}
  ${box(236, 150, 90, 34, 'rgba(180,83,9,0.3)', L('Decomposers', 'Pengurai'), L('dead matter, urea', 'bahan mati, urea'))}
  ${box(20, 186, 86, 34, 'rgba(245,158,11,0.22)', 'NH₄⁺', L('soil ammonium', 'amonium tanah'))}
  ${box(130, 186, 86, 34, 'rgba(139,92,246,0.22)', 'NO₃⁻', L('soil nitrate', 'nitrat tanah'))}
  <path d="M110 34 C80 60 70 70 63 94" class="a" stroke="#10b981" marker-end="url(#nc-m)"/>
  <text x="14" y="62" fill="#10b981">${L('fixation: Rhizobium', 'fiksasi: Rhizobium')}</text><text x="14" y="72" fill="#10b981">${L('in legume nodules 100–200', 'di bintil legum 100–200')}</text>
  <path d="M200 34 C190 100 180 150 176 184" class="a" stroke="#facc15" stroke-dasharray="4 3" marker-end="url(#nc-m)"/>
  <text x="196" y="90" fill="#facc15">${L('lightning ≈ 5', 'petir ≈ 5')}</text>
  <path d="M240 34 C300 60 310 70 300 94" class="a" stroke="#38bdf8" marker-end="url(#nc-m)"/>
  <text x="292" y="60" fill="#38bdf8">${L('Haber: fertiliser', 'Haber: pupuk')}</text><text x="292" y="70" fill="#38bdf8">${L('0–300 → NH₄⁺', '0–300 → NH₄⁺')}</text>
  <path d="M300 94 C340 60 345 170 330 186 L218 200" class="a" stroke="#38bdf8" stroke-dasharray="3 3"/>
  <path d="M106 203 L128 203" class="a" stroke="#f59e0b" marker-end="url(#nc-m)"/>
  <text x="90" y="232" fill="#f59e0b">${L('nitrification: Nitrosomonas, Nitrobacter (needs O₂)', 'nitrifikasi: Nitrosomonas, Nitrobacter (perlu O₂)')}</text>
  <path d="M56 186 L60 132" class="a" stroke="#22d3ee" marker-end="url(#nc-m)"/>
  <path d="M160 186 C150 160 100 150 90 132" class="a" stroke="#22d3ee" marker-end="url(#nc-m)"/>
  <text x="96" y="160" fill="#22d3ee">${L('assimilation', 'asimilasi')}</text>
  <path d="M106 108 L234 108" class="a" stroke="#f472b6" marker-end="url(#nc-m)"/>
  <text x="140" y="104" fill="#f472b6">${L('eating', 'makan')}</text>
  <path d="M281 130 L281 148" class="a" stroke="#b45309" marker-end="url(#nc-m)"/>
  <path d="M90 130 C150 140 200 150 234 160" class="a" stroke="#b45309" marker-end="url(#nc-m)"/>
  <text x="150" y="130" fill="#b45309">${L('death, litter, waste', 'mati, serasah, kotoran')}</text>
  <path d="M236 176 C170 180 120 176 108 192" class="a" stroke="#b45309" marker-end="url(#nc-m)"/>
  <text x="120" y="172" fill="#b45309">${L('ammonification', 'amonifikasi')}</text>
  <path d="M150 186 C140 120 130 60 150 36" class="a" stroke="#a78bfa" marker-end="url(#nc-m)"/>
  <text x="100" y="80" fill="#a78bfa">${L('denitrification', 'denitrifikasi')}</text><text x="100" y="90" fill="#a78bfa">${L('Pseudomonas, wet soil', 'Pseudomonas, tanah basah')}</text>
  <path d="M216 210 L250 222 L340 222" class="a" stroke="#ef4444" marker-end="url(#nc-m)"/>
  <text x="252" y="216" fill="#ef4444">${L('leaching → river, algal bloom', 'pelindian → sungai, ledakan alga')}</text>
  <text x="8" y="14" class="s">kg N / ha / yr</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'N₂ makes up 78 % of the air but is inert; only nitrogenase-carrying prokaryotes (Rhizobium in legume nodules, Azotobacter, cyanobacteria), lightning and the Haber process can fix it into ammonium or nitrate.',
        'Nitrification (NH₄⁺ → NO₂⁻ → NO₃⁻) is carried out by aerobic bacteria such as Nitrosomonas and Nitrobacter; it is the step that makes the soil nitrogen mobile.',
        'Plants assimilate ammonium and nitrate into amino acids; animals get nitrogen only by eating; decomposers return it as ammonium by ammonification.',
        'Denitrification by anaerobic bacteria (Pseudomonas) in waterlogged soil returns N₂ and N₂O to the atmosphere, closing the cycle but also losing fertiliser.',
        'Nitrate is soluble and not held by soil particles, so leaching is roughly proportional to the nitrate pool and to rainfall; 20–40 % of fertiliser N is typically lost this way.',
        'Nitrate reaching lakes and rivers drives eutrophication: algal blooms, oxygen depletion and fish kills. Legumes, split fertiliser doses, cover crops and buffer strips reduce it.',
      ],
      id: [
        'N₂ menyusun 78 % udara tetapi lembam; hanya prokariota pembawa nitrogenase (Rhizobium di bintil legum, Azotobacter, sianobakteri), petir, dan proses Haber yang dapat memfiksasinya menjadi amonium atau nitrat.',
        'Nitrifikasi (NH₄⁺ → NO₂⁻ → NO₃⁻) dilakukan bakteri aerob seperti Nitrosomonas dan Nitrobacter; tahap inilah yang membuat nitrogen tanah menjadi mudah bergerak.',
        'Tumbuhan mengasimilasi amonium dan nitrat menjadi asam amino; hewan memperoleh nitrogen hanya dengan makan; pengurai mengembalikannya sebagai amonium melalui amonifikasi.',
        'Denitrifikasi oleh bakteri anaerob (Pseudomonas) di tanah tergenang mengembalikan N₂ dan N₂O ke atmosfer, menutup siklus tetapi juga menghilangkan pupuk.',
        'Nitrat larut dan tidak ditahan partikel tanah, sehingga pelindian kira-kira sebanding dengan cadangan nitrat dan curah hujan; 20–40 % N pupuk biasanya hilang dengan cara ini.',
        'Nitrat yang mencapai danau dan sungai memicu eutrofikasi: ledakan alga, kehabisan oksigen, dan kematian ikan. Legum, dosis pupuk bertahap, tanaman penutup, dan jalur penyangga menguranginya.',
      ],
    },
    vocabulary: {
      en: [
        ['Nitrogen fixation', 'Conversion of N₂ gas into ammonia or ammonium, by nitrogenase in bacteria, by lightning, or industrially by the Haber–Bosch process.'],
        ['Nitrification', 'Oxidation of ammonium to nitrite (Nitrosomonas) and then to nitrate (Nitrobacter); needs oxygen.'],
        ['Assimilation', 'Uptake of ammonium or nitrate by plant roots and its incorporation into amino acids and nucleotides.'],
        ['Ammonification', 'Release of ammonium from dead organic matter, faeces and urea by decomposer bacteria and fungi.'],
        ['Denitrification', 'Reduction of nitrate to N₂ (and N₂O) by anaerobic bacteria such as Pseudomonas in waterlogged soil.'],
        ['Leaching', 'Loss of dissolved nitrate from soil as rainwater drains through it into groundwater and rivers.'],
        ['Eutrophication', 'Nutrient enrichment of water that causes algal blooms, oxygen depletion and fish deaths.'],
        ['Legume', 'A plant of the bean family whose root nodules house nitrogen-fixing Rhizobium bacteria.'],
      ],
      id: [
        ['Fiksasi nitrogen', 'Pengubahan gas N₂ menjadi amonia atau amonium, oleh nitrogenase dalam bakteri, oleh petir, atau secara industri melalui proses Haber–Bosch.'],
        ['Nitrifikasi', 'Oksidasi amonium menjadi nitrit (Nitrosomonas) lalu menjadi nitrat (Nitrobacter); membutuhkan oksigen.'],
        ['Asimilasi', 'Penyerapan amonium atau nitrat oleh akar tumbuhan dan penggabungannya ke dalam asam amino dan nukleotida.'],
        ['Amonifikasi', 'Pelepasan amonium dari bahan organik mati, feses, dan urea oleh bakteri dan jamur pengurai.'],
        ['Denitrifikasi', 'Reduksi nitrat menjadi N₂ (dan N₂O) oleh bakteri anaerob seperti Pseudomonas di tanah tergenang.'],
        ['Pelindian', 'Hilangnya nitrat terlarut dari tanah ketika air hujan meresap melewatinya ke air tanah dan sungai.'],
        ['Eutrofikasi', 'Pengayaan nutrien perairan yang menyebabkan ledakan alga, kehabisan oksigen, dan kematian ikan.'],
        ['Legum', 'Tumbuhan suku kacang-kacangan yang bintil akarnya dihuni bakteri pemfiksasi nitrogen Rhizobium.'],
      ],
    },
    misconceptions: {
      en: [
        ['Plants get their nitrogen straight from the air, like carbon dioxide.', 'Leaves cannot use N₂. Plants absorb only dissolved ammonium and nitrate through their roots; even legumes rely on Rhizobium bacteria in their nodules to fix the N₂ for them.'],
        ['More fertiliser always means a bigger crop.', 'Uptake saturates. In the sim the plant pool levels off while nitrate and runoff keep rising, so extra fertiliser is mostly leached or denitrified and ends up as pollution and wasted money.'],
        ['Bacteria in the soil are harmful.', 'The nitrogen cycle depends on bacteria at every step: fixers, nitrifiers, decomposers and denitrifiers. Without them no nitrogen would reach plants and dead matter would never be recycled.'],
        ['Denitrification is just a loss, so a farmer should always prevent it.', 'Denitrification does lose fertiliser, but it is also how ecosystems return nitrogen to the air and how constructed wetlands clean nitrate from waste water before it reaches rivers.'],
      ],
      id: [
        ['Tumbuhan mendapat nitrogen langsung dari udara, seperti karbon dioksida.', 'Daun tidak dapat memakai N₂. Tumbuhan hanya menyerap amonium dan nitrat terlarut melalui akar; legum pun bergantung pada bakteri Rhizobium di bintilnya untuk memfiksasi N₂.'],
        ['Lebih banyak pupuk selalu berarti hasil panen lebih besar.', 'Penyerapan mencapai titik jenuh. Dalam simulasi cadangan tumbuhan mendatar sementara nitrat dan limpasan terus naik, sehingga pupuk tambahan sebagian besar terlindi atau terdenitrifikasi dan berakhir sebagai polusi serta uang yang terbuang.'],
        ['Bakteri di tanah itu berbahaya.', 'Siklus nitrogen bergantung pada bakteri di setiap tahap: pemfiksasi, penitrifikasi, pengurai, dan pendenitrifikasi. Tanpa mereka nitrogen tidak akan sampai ke tumbuhan dan bahan mati tidak pernah didaur ulang.'],
        ['Denitrifikasi hanya kerugian, jadi petani harus selalu mencegahnya.', 'Denitrifikasi memang menghilangkan pupuk, tetapi juga cara ekosistem mengembalikan nitrogen ke udara dan cara lahan basah buatan membersihkan nitrat dari air limbah sebelum mencapai sungai.'],
      ],
    },
    realWorld: {
      en: [
        'Indonesian rice farmers plant Azolla (a water fern hosting nitrogen-fixing cyanobacteria) and rotate rice with soybean or peanuts to add 50–150 kg N/ha without buying fertiliser.',
        'Fertiliser runoff from the Mississippi basin creates a summer “dead zone” of oxygen-poor water in the Gulf of Mexico that can exceed 15 000 km².',
        'Lake Toba, Lake Maninjau and Jakarta Bay all suffer recurring algal blooms linked to nitrogen and phosphorus from farms, fish cages and sewage.',
        'The Haber–Bosch process uses about 1–2 % of the world’s energy and feeds roughly half of humanity; nitrogen fertiliser is why global grain yields tripled after 1950.',
        'Nitrous oxide (N₂O) released during denitrification is a greenhouse gas about 270 times stronger than CO₂ per kilogram and the main cause of ozone depletion today.',
      ],
      id: [
        'Petani padi Indonesia menanam Azolla (paku air yang menampung sianobakteri pemfiksasi nitrogen) dan merotasi padi dengan kedelai atau kacang tanah untuk menambah 50–150 kg N/ha tanpa membeli pupuk.',
        'Limpasan pupuk dari cekungan Mississippi menciptakan “zona mati” musim panas berair miskin oksigen di Teluk Meksiko yang dapat melebihi 15.000 km².',
        'Danau Toba, Danau Maninjau, dan Teluk Jakarta semuanya mengalami ledakan alga berulang yang terkait nitrogen dan fosfor dari pertanian, keramba ikan, dan limbah domestik.',
        'Proses Haber–Bosch memakai sekitar 1–2 % energi dunia dan memberi makan kira-kira separuh umat manusia; pupuk nitrogen adalah alasan hasil biji-bijian global berlipat tiga setelah 1950.',
        'Dinitrogen oksida (N₂O) yang dilepaskan saat denitrifikasi adalah gas rumah kaca sekitar 270 kali lebih kuat daripada CO₂ per kilogram dan penyebab utama penipisan ozon saat ini.',
      ],
    },
    questions: {
      en: [
        { q: 'A farmer applies 200 kg N/ha of fertiliser and once steady, the sim reports about 69 kg N/ha/yr of nitrate runoff and 42 kg N/ha/yr of denitrification. What percentage of the fertiliser reaches neither crop nor soil store, and which two processes are responsible?', a: '(69 + 42)/200 ≈ 55 % is lost. Leaching of soluble nitrate by rainfall and denitrification to N₂ by anaerobic bacteria are responsible; only the rest is available to be assimilated or stored in soil organic matter.' },
        { q: 'Why does switching on “Waterlogged soil” reduce nitrate runoff but also reduce plant nitrogen?', a: 'Waterlogging removes oxygen, so denitrifying bacteria convert nitrate to N₂ gas much faster. Less nitrate is left to leach, but also less to assimilate, so the plant pool falls. Nitrification, which needs oxygen, is also slowed in reality.' },
        { q: 'Explain, step by step, how nitrogen in a dead leaf can end up in a protein in a rabbit.', a: 'Decomposers break the leaf down and release ammonium (ammonification). Nitrifying bacteria convert ammonium to nitrate. A grass plant absorbs the nitrate and builds amino acids and proteins (assimilation). The rabbit eats the grass and digests the proteins into amino acids, which it uses to build its own proteins.' },
        { q: 'Compare growing a legume cover crop with applying 100 kg N/ha of fertiliser in the sim. Which gives the lower runoff for a similar plant nitrogen pool, and why?', a: 'The legume. Rhizobium delivers fixed nitrogen directly into the plant (fixation → plants), so it does not pass through the soil nitrate pool first. Fertiliser enters as ammonium, is nitrified to nitrate and sits in the soil where rain can leach it before roots take it up.' },
      ],
      id: [
        { q: 'Seorang petani memberi pupuk 200 kg N/ha dan setelah stabil simulasi melaporkan limpasan nitrat sekitar 69 kg N/ha/tahun serta denitrifikasi 42 kg N/ha/tahun. Berapa persen pupuk yang tidak sampai ke tanaman maupun cadangan tanah, dan dua proses apa yang bertanggung jawab?', a: '(69 + 42)/200 ≈ 55 % hilang. Pelindian nitrat terlarut oleh hujan dan denitrifikasi menjadi N₂ oleh bakteri anaerob yang bertanggung jawab; sisanya saja yang tersedia untuk diasimilasi atau disimpan dalam bahan organik tanah.' },
        { q: 'Mengapa menyalakan “Waterlogged soil” mengurangi limpasan nitrat tetapi juga mengurangi nitrogen tumbuhan?', a: 'Genangan menghilangkan oksigen, sehingga bakteri denitrifikasi mengubah nitrat menjadi gas N₂ jauh lebih cepat. Nitrat yang tersisa untuk terlindi lebih sedikit, tetapi yang tersedia untuk diasimilasi juga lebih sedikit, sehingga cadangan tumbuhan turun. Nitrifikasi, yang perlu oksigen, dalam kenyataan juga melambat.' },
        { q: 'Jelaskan tahap demi tahap bagaimana nitrogen dalam daun mati dapat berakhir dalam protein seekor kelinci.', a: 'Pengurai merombak daun dan melepaskan amonium (amonifikasi). Bakteri nitrifikasi mengubah amonium menjadi nitrat. Rumput menyerap nitrat dan membangun asam amino serta protein (asimilasi). Kelinci memakan rumput dan mencerna proteinnya menjadi asam amino yang dipakai untuk membangun proteinnya sendiri.' },
        { q: 'Bandingkan menanam tanaman penutup legum dengan memberi pupuk 100 kg N/ha dalam simulasi. Mana yang memberi limpasan lebih rendah untuk cadangan nitrogen tumbuhan yang serupa, dan mengapa?', a: 'Legum. Rhizobium menyalurkan nitrogen terfiksasi langsung ke tumbuhan (fiksasi → tumbuhan), sehingga tidak melewati cadangan nitrat tanah dulu. Pupuk masuk sebagai amonium, dinitrifikasi menjadi nitrat, dan berada di tanah tempat hujan dapat melindinya sebelum akar menyerapnya.' },
      ],
    },
  },
};
