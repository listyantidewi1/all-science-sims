// Long-form text for the sim page aside, kept out of manifest.js.
export default {
  objectives: {
    en: [
      'Describe fermentation as microbes (yeast, bacteria or mould) breaking down sugar without oxygen to make products such as carbon dioxide, alcohol or lactic acid.',
      'Explain the bell-shaped effect of temperature: too cold and enzymes work slowly, too hot and they are destroyed, with a best temperature in between.',
      'Identify the microbe, the food and the product in tempe, yoghurt and bread as examples of conventional biotechnology.',
    ],
    id: [
      'Menggambarkan fermentasi sebagai mikroba (ragi, bakteri atau jamur) yang menguraikan gula tanpa oksigen menjadi produk seperti karbon dioksida, alkohol atau asam laktat.',
      'Menjelaskan pengaruh suhu yang berbentuk lonceng: terlalu dingin enzim bekerja lambat, terlalu panas enzim rusak, dengan suhu terbaik di antaranya.',
      'Mengenali mikroba, bahan makanan dan produknya pada tempe, yoghurt dan roti sebagai contoh bioteknologi konvensional.',
    ],
  },
  tryThis: {
    en: [
      'Set 20 g sugar and run the yeast flask at 10, 20, 30, 40, 50 and 60 °C. Record the balloon volume at 2 minutes each time and sketch the curve.',
      'At 35 °C try 2 g, 5 g, 10 g and 20 g of sugar. Does doubling the sugar double the gas after 2 minutes? What happens after 10 minutes with only 2 g?',
      'Switch to yoghurt. Watch the pH fall and find the temperature where it reaches 4.5 fastest. Is it the same as the yeast\'s favourite?',
      'Switch to tempe and set 45 °C. Why does the mould stop growing?',
    ],
    id: [
      'Atur gula 20 g dan jalankan labu ragi pada 10, 20, 30, 40, 50 dan 60 °C. Catat volume balon pada 2 menit tiap kali dan gambar kurvanya.',
      'Pada 35 °C coba gula 2 g, 5 g, 10 g dan 20 g. Apakah menggandakan gula menggandakan gasnya setelah 2 menit? Apa yang terjadi setelah 10 menit dengan hanya 2 g?',
      'Ganti ke yoghurt. Perhatikan pH turun dan cari suhu saat pH mencapai 4,5 paling cepat. Samakah dengan suhu kesukaan ragi?',
      'Ganti ke tempe dan atur 45 °C. Mengapa jamurnya berhenti tumbuh?',
    ],
  },

  learn: {
    background: {
      en: [
        'Fermentation is how microorganisms get energy from sugar when there is little or no oxygen. Yeast (a single-celled fungus, Saccharomyces cerevisiae) turns glucose into ethanol and carbon dioxide: C₆H₁₂O₆ → 2 C₂H₅OH + 2 CO₂. Every gram of sugar releases about 0.49 g of CO₂, which is roughly 270 mL of gas at room temperature, so a few grams of sugar can fill a balloon. Lactic acid bacteria (Lactobacillus) instead turn sugar into lactic acid, which lowers the pH and makes milk thicken into yoghurt. Moulds such as Rhizopus grow threads called mycelium through soybeans, digesting proteins and binding the beans into a firm cake of tempe. Humans have used these microbes for thousands of years, long before anyone knew they existed; this is conventional biotechnology.',
        'Microbes work with enzymes, and enzymes are sensitive to temperature. Below about 10 °C the molecules move slowly and reactions almost stop, which is why food keeps in a fridge. As the temperature rises the rate roughly doubles every 10 °C, until the enzymes reach their best temperature. Above that, heat shakes the protein chains out of shape (denaturation) and the rate crashes; near 60 °C yeast is killed. The result is a bell-shaped curve. In the simulation the yeast and bread presets peak near 35 °C, yoghurt bacteria near 42 °C, and tempe mould near 30 °C, close to real values.',
        'The amount of sugar matters in two ways. More sugar means the microbes have more to eat, so the rate is a little higher at first (the rate rises with sugar but levels off once the yeast is "saturated"). It also sets how long fermentation can continue: with only 2 g of sugar the flask stops bubbling after a few minutes because the food has run out, while with 20 g it carries on far longer. The simulation models the rate as r = r_max × f(T) × S/(S + 5 g), where S is the sugar left, and subtracts the sugar as it is used.',
        'Each preset shows a different product of the same basic idea. In bread dough the CO₂ cannot escape, so the gluten network traps the bubbles and the dough rises to about twice its size; baking then kills the yeast and evaporates the alcohol. In yoghurt the product is acid, measured as pH falling from 6.7 to about 4.5, where milk proteins clump together. In tempe there is no balloon at all: the measure of success is how completely the white mycelium covers the beans, which takes one to two days at 30 °C. Time runs faster in the simulation for these slower presets, so check the clock.',
      ],
      id: [
        'Fermentasi adalah cara mikroorganisme memperoleh energi dari gula ketika oksigen sedikit atau tidak ada. Ragi (fungi bersel satu, Saccharomyces cerevisiae) mengubah glukosa menjadi etanol dan karbon dioksida: C₆H₁₂O₆ → 2 C₂H₅OH + 2 CO₂. Setiap gram gula melepaskan sekitar 0,49 g CO₂, yaitu kira-kira 270 mL gas pada suhu ruang, sehingga beberapa gram gula saja bisa mengisi balon. Bakteri asam laktat (Lactobacillus) justru mengubah gula menjadi asam laktat, yang menurunkan pH dan membuat susu mengental menjadi yoghurt. Jamur seperti Rhizopus menumbuhkan benang bernama miselium menembus kedelai, mencerna protein dan mengikat biji-biji menjadi padatan tempe. Manusia telah memanfaatkan mikroba ini ribuan tahun, jauh sebelum ada yang tahu mereka ada; inilah bioteknologi konvensional.',
        'Mikroba bekerja dengan enzim, dan enzim peka terhadap suhu. Di bawah sekitar 10 °C molekul bergerak lambat dan reaksi hampir berhenti, itulah sebabnya makanan tahan di kulkas. Saat suhu naik, lajunya kira-kira berlipat dua setiap 10 °C, sampai enzim mencapai suhu terbaiknya. Di atas itu, panas mengacaukan bentuk rantai protein (denaturasi) dan lajunya anjlok; di dekat 60 °C ragi mati. Hasilnya adalah kurva berbentuk lonceng. Dalam simulasi, preset ragi dan roti memuncak di sekitar 35 °C, bakteri yoghurt sekitar 42 °C, dan jamur tempe sekitar 30 °C, mendekati nilai sebenarnya.',
        'Jumlah gula berpengaruh dalam dua hal. Lebih banyak gula berarti mikroba punya lebih banyak makanan, sehingga lajunya sedikit lebih tinggi di awal (laju naik dengan gula tetapi mendatar begitu ragi "jenuh"). Gula juga menentukan berapa lama fermentasi bisa berlangsung: dengan hanya 2 g gula, labu berhenti bergelembung setelah beberapa menit karena makanannya habis, sedangkan dengan 20 g berlangsung jauh lebih lama. Simulasi memodelkan laju sebagai r = r_maks × f(T) × S/(S + 5 g), dengan S gula yang tersisa, dan mengurangi gula seiring pemakaiannya.',
        'Setiap preset menunjukkan produk berbeda dari gagasan dasar yang sama. Dalam adonan roti, CO₂ tidak bisa keluar, sehingga jaringan gluten memerangkap gelembung dan adonan mengembang sekitar dua kali lipat; pemanggangan kemudian membunuh ragi dan menguapkan alkoholnya. Dalam yoghurt produknya adalah asam, diukur sebagai pH yang turun dari 6,7 ke sekitar 4,5, saat protein susu menggumpal. Pada tempe tidak ada balon sama sekali: ukuran keberhasilannya adalah seberapa penuh miselium putih menutupi kedelai, yang butuh satu sampai dua hari pada 30 °C. Waktu berjalan lebih cepat dalam simulasi untuk preset yang lambat ini, jadi perhatikan jamnya.',
      ],
    },
    figure: {
      caption: {
        en: 'Left: the rate of fermentation against temperature is a bell curve; cold slows the enzymes, heat above the optimum destroys them. Right: yeast turns each glucose molecule into two ethanol and two carbon dioxide molecules, and the CO₂ inflates the balloon.',
        id: 'Kiri: laju fermentasi terhadap suhu berbentuk kurva lonceng; dingin memperlambat enzim, panas di atas optimum merusaknya. Kanan: ragi mengubah tiap molekul glukosa menjadi dua etanol dan dua karbon dioksida, dan CO₂ menggembungkan balon.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        const pts = [];
        for (let i = 0; i <= 60; i++) {
          const T = i;                                   // 0..60 °C
          const f = Math.exp(-Math.pow((T - 35) / 10, 2)) * Math.min(1, Math.max(0, (58 - T) / 6));
          pts.push(`${(30 + (T / 60) * 150).toFixed(1)},${(150 - f * 110).toFixed(1)}`);
        }
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Fermentation rate versus temperature, and a yeast flask with balloon', 'Laju fermentasi terhadap suhu, dan labu ragi dengan balon')}">
  <style>text{font:10px system-ui,sans-serif;fill:currentColor}.ax{stroke:currentColor;stroke-width:1;opacity:.6;fill:none}</style>
  <path d="M30 150 L185 150 M30 150 L30 30" class="ax"/>
  <polyline points="${pts.join(' ')}" fill="none" stroke="#4ade80" stroke-width="2.2"/>
  <text x="30" y="165">0</text><text x="100" y="165">30</text><text x="170" y="165">60 °C</text>
  <text x="8" y="40" transform="rotate(-90 8 40)" text-anchor="end">${L('rate', 'laju')}</text>
  <line x1="117.5" y1="40" x2="117.5" y2="150" stroke="#4ade80" stroke-dasharray="3 3" opacity=".6"/>
  <text x="121" y="48" fill="#4ade80">${L('optimum ≈ 35 °C', 'optimum ≈ 35 °C')}</text>
  <text x="34" y="135" fill="#60a5fa">${L('cold: slow', 'dingin: lambat')}</text>
  <text x="140" y="120" fill="#f87171">${L('hot:', 'panas:')}</text>
  <text x="140" y="132" fill="#f87171">${L('enzymes', 'enzim')}</text>
  <text x="140" y="144" fill="#f87171">${L('destroyed', 'rusak')}</text>
  <text x="30" y="190">${L('rate ≈ doubles per 10 °C', 'laju ≈ 2× tiap 10 °C')}</text>
  <text x="30" y="202">${L('until the optimum', 'sampai optimum')}</text>
  <path d="M270 115 L270 150 L245 215 Q243 222 250 222 L310 222 Q317 222 315 215 L290 150 L290 115 Z" fill="none" stroke="currentColor" stroke-width="1.5"/>
  <path d="M252 195 L308 195 L315 215 Q317 222 310 222 L250 222 Q243 222 245 215 Z" fill="#fde68a" opacity=".7"/>
  <circle cx="262" cy="207" r="2.5" fill="#fff" opacity=".8"/><circle cx="285" cy="203" r="2" fill="#fff" opacity=".8"/><circle cx="298" cy="212" r="2.2" fill="#fff" opacity=".8"/>
  <circle cx="278" cy="178" r="1.6" fill="currentColor" opacity=".5"/><circle cx="283" cy="165" r="1.6" fill="currentColor" opacity=".5"/>
  <ellipse cx="280" cy="78" rx="36" ry="42" fill="#f472b6" opacity=".85"/>
  <path d="M270 115 Q280 108 290 115" fill="#f472b6"/>
  <text x="280" y="82" text-anchor="middle" fill="#fff" font-weight="bold">CO₂</text>
  <text x="222" y="236" text-anchor="start">${L('sugar → 2 ethanol + 2 CO₂', 'gula → 2 etanol + 2 CO₂')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Fermentation: microbes break down sugar without oxygen; yeast makes ethanol and CO₂, lactic acid bacteria make lactic acid.',
        'Each gram of sugar fermented by yeast gives about 0.49 g (roughly 270 mL) of CO₂; the balloon volume measures how much sugar has been used.',
        'Temperature has a bell-shaped effect: the rate roughly doubles per 10 °C up to the optimum (about 35 °C for yeast, 42 °C for yoghurt bacteria, 30 °C for tempe mould), then collapses as enzymes denature.',
        'More sugar raises the rate only a little, but it decides how long fermentation lasts before the food runs out.',
        'Tempe, yoghurt and bread are conventional biotechnology: a living microbe, a food and a useful product.',
      ],
      id: [
        'Fermentasi: mikroba menguraikan gula tanpa oksigen; ragi menghasilkan etanol dan CO₂, bakteri asam laktat menghasilkan asam laktat.',
        'Setiap gram gula yang difermentasi ragi menghasilkan sekitar 0,49 g (kira-kira 270 mL) CO₂; volume balon mengukur berapa banyak gula yang sudah terpakai.',
        'Suhu berpengaruh seperti lonceng: laju kira-kira berlipat dua tiap 10 °C sampai optimum (sekitar 35 °C untuk ragi, 42 °C untuk bakteri yoghurt, 30 °C untuk jamur tempe), lalu anjlok saat enzim terdenaturasi.',
        'Lebih banyak gula hanya sedikit menaikkan laju, tetapi menentukan berapa lama fermentasi berlangsung sebelum makanan habis.',
        'Tempe, yoghurt dan roti adalah bioteknologi konvensional: mikroba hidup, bahan makanan dan produk yang bermanfaat.',
      ],
    },
    vocabulary: {
      en: [
        ['Fermentation', 'Energy release from sugar by microbes without oxygen, producing CO₂ and ethanol or lactic acid.'],
        ['Yeast', 'A single-celled fungus (Saccharomyces) that ferments sugar to ethanol and carbon dioxide.'],
        ['Lactic acid bacteria', 'Bacteria such as Lactobacillus that turn sugar into lactic acid, souring and thickening milk.'],
        ['Mycelium', 'The network of fine white threads of a mould, which binds soybeans into tempe.'],
        ['Optimum temperature', 'The temperature at which an enzyme or microbe works fastest.'],
        ['Denaturation', 'Loss of an enzyme\'s shape, and therefore its function, caused by heat.'],
        ['Conventional biotechnology', 'Using whole living microbes, as people have for millennia, to make foods such as tempe, yoghurt and bread.'],
      ],
      id: [
        ['Fermentasi', 'Pelepasan energi dari gula oleh mikroba tanpa oksigen, menghasilkan CO₂ dan etanol atau asam laktat.'],
        ['Ragi', 'Fungi bersel satu (Saccharomyces) yang memfermentasi gula menjadi etanol dan karbon dioksida.'],
        ['Bakteri asam laktat', 'Bakteri seperti Lactobacillus yang mengubah gula menjadi asam laktat, mengasamkan dan mengentalkan susu.'],
        ['Miselium', 'Jaringan benang putih halus jamur, yang mengikat kedelai menjadi tempe.'],
        ['Suhu optimum', 'Suhu saat enzim atau mikroba bekerja paling cepat.'],
        ['Denaturasi', 'Hilangnya bentuk enzim, dan karenanya fungsinya, akibat panas.'],
        ['Bioteknologi konvensional', 'Pemanfaatan mikroba hidup utuh, seperti yang dilakukan manusia selama ribuan tahun, untuk membuat makanan seperti tempe, yoghurt dan roti.'],
      ],
    },
    misconceptions: {
      en: [
        ['Hotter is always faster for fermentation.', 'Only up to the optimum. Above about 40 °C yeast slows sharply and near 60 °C it dies, because its enzymes are denatured. The curve is a bell, not a straight line.'],
        ['The balloon inflates because of air from the yeast "breathing".', 'The gas is carbon dioxide produced chemically when yeast breaks down sugar. No oxygen is needed; this is anaerobic.'],
        ['Yeast, bacteria and mould are all the same kind of germ.', 'Yeast is a single-celled fungus, Lactobacillus is a bacterium, and the tempe mould is a multicellular fungus. They are different organisms with different products and optimum temperatures.'],
        ['More sugar always means a bigger balloon after 2 minutes.', 'Once the yeast is saturated, extra sugar barely changes the rate; it only lets the fermentation last longer before running out.'],
      ],
      id: [
        ['Semakin panas selalu semakin cepat untuk fermentasi.', 'Hanya sampai optimum. Di atas sekitar 40 °C ragi melambat tajam dan di dekat 60 °C ragi mati, karena enzimnya terdenaturasi. Kurvanya lonceng, bukan garis lurus.'],
        ['Balon menggembung karena udara dari ragi yang "bernapas".', 'Gasnya adalah karbon dioksida yang dihasilkan secara kimia saat ragi menguraikan gula. Tidak perlu oksigen; ini anaerob.'],
        ['Ragi, bakteri dan jamur adalah jenis kuman yang sama.', 'Ragi adalah fungi bersel satu, Lactobacillus adalah bakteri, dan jamur tempe adalah fungi multiseluler. Mereka organisme berbeda dengan produk dan suhu optimum yang berbeda.'],
        ['Lebih banyak gula selalu berarti balon lebih besar setelah 2 menit.', 'Begitu ragi jenuh, gula tambahan hampir tidak mengubah laju; gula hanya membuat fermentasi berlangsung lebih lama sebelum habis.'],
      ],
    },
    realWorld: {
      en: [
        'Indonesia makes millions of tempe cakes a day: soybeans wrapped in banana leaves or perforated plastic and kept at about 30 °C for 36 to 48 hours.',
        'Bakers prove dough in a warm place near 30 to 35 °C; a cold kitchen means a slow rise, and a hot oven kills the yeast once the loaf has set.',
        'Yoghurt makers hold milk at 42 to 45 °C for 4 to 8 hours; home yoghurt made in a cool room takes much longer to thicken.',
        'Bioethanol for fuel is made by yeast fermentation of sugar cane or corn, the same reaction as in the flask on an industrial scale.',
        'Kimchi, sauerkraut, tape singkong, kecap and cheese are all fermented foods, each relying on a particular microbe and temperature.',
      ],
      id: [
        'Indonesia membuat jutaan tempe setiap hari: kedelai dibungkus daun pisang atau plastik berlubang dan disimpan pada sekitar 30 °C selama 36 sampai 48 jam.',
        'Pembuat roti mengembangkan adonan di tempat hangat sekitar 30 sampai 35 °C; dapur dingin berarti pengembangan lambat, dan oven panas membunuh ragi setelah roti mengeras.',
        'Pembuat yoghurt menjaga susu pada 42 sampai 45 °C selama 4 sampai 8 jam; yoghurt rumahan di ruangan sejuk butuh waktu jauh lebih lama untuk mengental.',
        'Bioetanol untuk bahan bakar dibuat dengan fermentasi ragi dari tebu atau jagung, reaksi yang sama seperti dalam labu dalam skala industri.',
        'Kimchi, sauerkraut, tape singkong, kecap dan keju semuanya makanan fermentasi, masing-masing bergantung pada mikroba dan suhu tertentu.',
      ],
    },
    questions: {
      en: [
        { q: 'At 35 °C the balloon reaches 400 mL after 2 minutes. Estimate the volume you would expect at 25 °C and at 55 °C, and explain.', a: 'At 25 °C roughly half or less (about 150 to 200 mL): the rate roughly halves for every 10 °C drop. At 55 °C only a few millilitres, because the yeast enzymes are denatured; the bell curve falls steeply above 45 °C.' },
        { q: 'A flask with 2 g of sugar stops bubbling after about 8 minutes while one with 20 g keeps going. Why, and what is the largest volume of CO₂ 2 g of sugar can ever give?', a: 'The sugar runs out; fermentation needs food. 2 g of glucose gives at most about 0.98 g of CO₂, roughly 540 mL of gas, however long you wait.' },
        { q: 'Yoghurt bacteria prefer about 42 °C but tempe mould prefers about 30 °C. What would happen if you incubated tempe at 42 °C?', a: 'The Rhizopus mould grows poorly above about 37 °C and is damaged near 42 °C, so the mycelium would not cover the beans and the tempe would fail or spoil. Each microbe has its own optimum.' },
      ],
      id: [
        { q: 'Pada 35 °C balon mencapai 400 mL setelah 2 menit. Perkirakan volume yang kamu harapkan pada 25 °C dan 55 °C, dan jelaskan.', a: 'Pada 25 °C kira-kira setengah atau kurang (sekitar 150 sampai 200 mL): laju kira-kira menjadi setengah setiap turun 10 °C. Pada 55 °C hanya beberapa mililiter, karena enzim ragi terdenaturasi; kurva lonceng turun tajam di atas 45 °C.' },
        { q: 'Labu dengan 2 g gula berhenti bergelembung setelah sekitar 8 menit sedangkan labu dengan 20 g terus berjalan. Mengapa, dan berapa volume CO₂ terbesar yang bisa dihasilkan 2 g gula?', a: 'Gulanya habis; fermentasi butuh makanan. 2 g glukosa memberi paling banyak sekitar 0,98 g CO₂, kira-kira 540 mL gas, berapa lama pun kamu menunggu.' },
        { q: 'Bakteri yoghurt menyukai sekitar 42 °C tetapi jamur tempe menyukai sekitar 30 °C. Apa yang terjadi jika tempe diinkubasi pada 42 °C?', a: 'Jamur Rhizopus tumbuh buruk di atas sekitar 37 °C dan rusak di dekat 42 °C, sehingga miselium tidak menutupi kedelai dan tempe gagal atau busuk. Setiap mikroba punya optimum sendiri.' },
      ],
    },
  },
};
