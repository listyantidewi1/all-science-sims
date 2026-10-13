// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Identify the three stages: glycolysis, Krebs, ETC.',
      'Count net ATP yield per stage.',
      'See where O₂ is consumed and CO₂ released.',
    ],
    id: [
      'Mengenali tiga tahap: glikolisis, Krebs, ETC.',
      'Menghitung hasil ATP neto per tahap.',
      'Melihat di mana O₂ dikonsumsi dan CO₂ dilepaskan.',
    ],
  },
  tryThis: {
    en: [
      'Step through and verify total ATP ≈ 30–32.',
      'Anaerobic only — how much ATP from glycolysis alone?',
      'Block ETC (no O₂) — what stops accumulating?',
    ],
    id: [
      'Telusuri dan verifikasi total ATP ≈ 30–32.',
      'Anaerob saja — berapa ATP hanya dari glikolisis?',
      'Hentikan ETC (tanpa O₂) — apa yang berhenti menumpuk?',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'Cells cannot use the energy in glucose directly; they must first transfer it into ATP, the molecule that powers muscle contraction, active transport and biosynthesis. Burning glucose in one go would release the energy as useless heat, so cellular respiration takes it apart in many small steps: C₆H₁₂O₆ + 6 O₂ → 6 CO₂ + 6 H₂O. Along the way, high-energy electrons are stripped from the glucose carbons and handed to the carriers NAD⁺ and FAD, making NADH and FADH₂, which deliver them to the final stage where most of the ATP is made.',
        'Glycolysis, in the cytoplasm, splits one glucose into two pyruvate molecules, investing 2 ATP and making 4, for a net gain of 2 ATP plus 2 NADH; it needs no oxygen. In the mitochondrion, pyruvate oxidation converts each pyruvate into acetyl-CoA, releasing 2 CO₂ and 2 NADH per glucose. The Krebs (citric acid) cycle then dismantles the two acetyl groups completely, releasing 4 more CO₂ and loading up 6 NADH, 2 FADH₂ and 2 ATP (made as GTP). Finally the electron transport chain in the inner mitochondrial membrane takes the electrons from 10 NADH and 2 FADH₂, uses their energy to pump H⁺ across the membrane, and lets the H⁺ flow back through ATP synthase, which spins to make ATP: this is chemiosmosis, or oxidative phosphorylation. Oxygen is the final electron acceptor, combining with electrons and H⁺ to form water.',
        'The simulation is a ledger rather than an animation of molecules. Use the "Stage" slider or "Next stage" to move through the four stages; each stage lists what goes in and what comes out, and the running totals show ATP, NADH, FADH₂, CO₂ released and O₂ used so far. Notice that NADH and FADH₂ build up through the first three stages and are then spent in the last one, that all 6 CO₂ appear before the electron transport chain, and that O₂ is used only at the very end. With the accounting of about 2.5 ATP per NADH and 1.5 per FADH₂, the chain yields about 26 to 28 ATP, for a total near 30 to 32 per glucose.',
        'The sim leaves out kinetics and regulation: real cells adjust the rate of each stage to demand, and the yield is not a fixed integer. Older textbooks quote 36 to 38 ATP; modern measurements of the proton pumping and the cost of moving ATP and NADH across the mitochondrial membrane give the lower figure used here. The sim also has no anaerobic branch: without oxygen the chain stops, NADH cannot be recycled to NAD⁺, and cells fall back on fermentation, which regenerates NAD⁺ from pyruvate (making lactate or ethanol and CO₂) so that glycolysis can continue at just 2 ATP per glucose. Fats and proteins can also feed into the pathway, which is not shown.',
      ],
      id: [
        'Sel tidak bisa langsung memakai energi dalam glukosa; energi itu harus dipindahkan dahulu ke ATP, molekul yang menggerakkan kontraksi otot, transpor aktif, dan biosintesis. Membakar glukosa sekaligus akan melepaskan energinya sebagai panas yang tidak berguna, sehingga respirasi sel membongkarnya dalam banyak langkah kecil: C₆H₁₂O₆ + 6 O₂ → 6 CO₂ + 6 H₂O. Di sepanjang jalan, elektron berenergi tinggi dilepaskan dari karbon glukosa dan diserahkan ke pembawa NAD⁺ dan FAD, menjadi NADH dan FADH₂, yang mengantarkannya ke tahap akhir tempat sebagian besar ATP dibuat.',
        'Glikolisis, di sitoplasma, memecah satu glukosa menjadi dua molekul piruvat, menanamkan 2 ATP dan menghasilkan 4, sehingga hasil netonya 2 ATP plus 2 NADH; tahap ini tidak memerlukan oksigen. Di mitokondria, oksidasi piruvat mengubah tiap piruvat menjadi asetil-KoA, melepaskan 2 CO₂ dan 2 NADH per glukosa. Siklus Krebs (asam sitrat) kemudian membongkar kedua gugus asetil itu sepenuhnya, melepaskan 4 CO₂ lagi dan memuat 6 NADH, 2 FADH₂, dan 2 ATP (dibuat sebagai GTP). Akhirnya rantai transpor elektron di membran dalam mitokondria mengambil elektron dari 10 NADH dan 2 FADH₂, memakai energinya untuk memompa H⁺ melintasi membran, dan membiarkan H⁺ mengalir balik lewat ATP sintase, yang berputar untuk membuat ATP: inilah kemiosmosis, atau fosforilasi oksidatif. Oksigen adalah penerima elektron terakhir, bergabung dengan elektron dan H⁺ membentuk air.',
        'Simulasi ini adalah buku besar, bukan animasi molekul. Gunakan slider "Stage" atau "Next stage" untuk bergerak melalui empat tahap; tiap tahap mencantumkan apa yang masuk dan apa yang keluar, dan total berjalan menunjukkan ATP, NADH, FADH₂, CO₂ yang dilepas, dan O₂ yang dipakai sejauh itu. Perhatikan bahwa NADH dan FADH₂ menumpuk melalui tiga tahap pertama lalu dibelanjakan pada tahap terakhir, bahwa seluruh 6 CO₂ muncul sebelum rantai transpor elektron, dan bahwa O₂ hanya dipakai di bagian paling akhir. Dengan perhitungan sekitar 2,5 ATP per NADH dan 1,5 per FADH₂, rantai menghasilkan sekitar 26 sampai 28 ATP, sehingga totalnya mendekati 30 sampai 32 per glukosa.',
        'Simulasi mengabaikan kinetika dan regulasi: sel sungguhan menyesuaikan laju tiap tahap dengan kebutuhan, dan hasilnya bukan bilangan bulat yang tetap. Buku teks lama menyebut 36 sampai 38 ATP; pengukuran modern terhadap pemompaan proton dan biaya memindahkan ATP dan NADH melintasi membran mitokondria memberi angka lebih rendah yang dipakai di sini. Simulasi juga tidak memiliki cabang anaerob: tanpa oksigen rantai berhenti, NADH tidak bisa didaur ulang menjadi NAD⁺, dan sel beralih ke fermentasi, yang meregenerasi NAD⁺ dari piruvat (menghasilkan laktat atau etanol dan CO₂) agar glikolisis dapat berlanjut dengan hanya 2 ATP per glukosa. Lemak dan protein juga bisa masuk ke jalur ini, yang tidak ditampilkan.',
      ],
    },
    figure: {
      caption: {
        en: 'Energy flow in aerobic respiration. Carbon leaves as CO₂ in the mitochondrion before the chain; electrons travel on NADH and FADH₂ to the electron transport chain, where O₂ accepts them and most of the ATP is made.',
        id: 'Aliran energi pada respirasi aerob. Karbon keluar sebagai CO₂ di mitokondria sebelum rantai; elektron berpindah lewat NADH dan FADH₂ ke rantai transpor elektron, tempat O₂ menerimanya dan sebagian besar ATP dibuat.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Stages of cellular respiration and their yields', 'Tahap-tahap respirasi sel dan hasilnya')}">
  <style>text{font:12px system-ui,sans-serif;fill:currentColor}.m{fill:none;stroke:currentColor;stroke-width:1.2;opacity:.45}.bx{fill:none;stroke:currentColor;stroke-width:1.4}.f{stroke-width:2;fill:none}.s{font-size:10px;opacity:.75}.b{font-size:11px;font-weight:600}</style>
  <rect x="112" y="60" width="240" height="172" rx="14" class="m" stroke-dasharray="5 4"/>
  <text x="122" y="226" class="s">${L('mitochondrion', 'mitokondria')}</text>
  <text x="8" y="20" class="b">${L('glucose', 'glukosa')}</text>
  <line x1="30" y1="26" x2="30" y2="48" class="m" stroke-opacity="1" marker-end="url(#a)"/>
  <rect x="8" y="52" width="92" height="44" rx="6" class="bx"/>
  <text x="14" y="70" class="b">${L('glycolysis', 'glikolisis')}</text>
  <text x="14" y="84" class="s">${L('cytoplasm · 2 ATP', 'sitoplasma · 2 ATP')}</text>
  <line x1="100" y1="74" x2="124" y2="74" class="m" stroke-opacity="1" marker-end="url(#a)"/>
  <text x="100" y="46" class="s">2 ${L('pyruvate', 'piruvat')}</text>
  <rect x="128" y="52" width="110" height="60" rx="6" class="bx"/>
  <text x="134" y="68" class="b">${L('pyruvate oxidation', 'oksidasi piruvat')}</text>
  <text x="134" y="84" class="b">+ ${L('Krebs cycle', 'siklus Krebs')}</text>
  <text x="134" y="100" class="s">${L('matrix · 2 ATP', 'matriks · 2 ATP')}</text>
  <line x1="183" y1="112" x2="183" y2="136" class="f" stroke="#f59e0b" marker-end="url(#a)"/>
  <text x="190" y="130" fill="#f59e0b" class="b">6 CO₂</text>
  <text x="190" y="142" fill="#f59e0b" class="s">${L('(2 + 4) out', '(2 + 4) keluar')}</text>
  <path d="M238 82 L300 82 L300 130 L250 156" class="f" stroke="#3b82f6" marker-end="url(#a)"/>
  <text x="246" y="76" fill="#3b82f6" class="s">10 NADH</text>
  <text x="246" y="104" fill="#3b82f6" class="s">+ 2 FADH₂</text>
  <text x="246" y="116" fill="#3b82f6" class="s">(e⁻ ${L('carriers', 'pembawa')})</text>
  <path d="M100 90 L116 90 L116 190 L132 190" class="f" stroke="#3b82f6" marker-end="url(#a)"/>
  <text x="66" y="194" fill="#3b82f6" class="s">2 NADH</text>
  <rect x="136" y="156" width="130" height="50" rx="6" class="bx"/>
  <text x="142" y="172" class="b">${L('electron transport', 'rantai transpor')}</text>
  <text x="142" y="186" class="b">${L('chain + ATP synthase', 'elektron + ATP sintase')}</text>
  <text x="142" y="200" class="s">${L('inner membrane · ~26 ATP', 'membran dalam · ~26 ATP')}</text>
  <line x1="310" y1="172" x2="268" y2="172" class="f" stroke="#ef4444" marker-end="url(#a)"/>
  <text x="314" y="176" fill="#ef4444" class="b">6 O₂</text>
  <line x1="268" y1="194" x2="310" y2="194" class="f" stroke="#10b981" marker-end="url(#a)"/>
  <text x="314" y="198" fill="#10b981" class="b">6 H₂O</text>
  <text x="8" y="120" class="b">${L('total ≈ 30 ATP', 'total ≈ 30 ATP')}</text>
  <text x="8" y="134" class="s">${L('per glucose', 'per glukosa')}</text>
  <text x="8" y="154" class="s">${L('without O₂: chain stops,', 'tanpa O₂: rantai berhenti,')}</text>
  <text x="8" y="166" class="s">${L('only 2 ATP (glycolysis)', 'hanya 2 ATP (glikolisis)')}</text>
  <defs><marker id="a" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="context-stroke"/></marker></defs>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Aerobic respiration yields about 30 to 32 ATP per glucose; glycolysis alone yields only 2.',
        'Most ATP is made by oxidative phosphorylation in the electron transport chain, powered by electrons delivered on NADH and FADH₂.',
        'Oxygen is used only at the end of the chain, as the final electron acceptor, and becomes water.',
        'All six CO₂ are released in the mitochondrion during pyruvate oxidation and the Krebs cycle; the carbon comes from glucose, not from O₂.',
        'Without oxygen the chain halts, NAD⁺ cannot be regenerated by the chain, and cells rely on fermentation to keep glycolysis going.',
      ],
      id: [
        'Respirasi aerob menghasilkan sekitar 30 sampai 32 ATP per glukosa; glikolisis saja hanya menghasilkan 2.',
        'Sebagian besar ATP dibuat lewat fosforilasi oksidatif di rantai transpor elektron, ditenagai elektron yang diantarkan NADH dan FADH₂.',
        'Oksigen hanya dipakai di ujung rantai, sebagai penerima elektron terakhir, dan menjadi air.',
        'Keenam CO₂ dilepaskan di mitokondria selama oksidasi piruvat dan siklus Krebs; karbonnya berasal dari glukosa, bukan dari O₂.',
        'Tanpa oksigen rantai berhenti, NAD⁺ tidak bisa diregenerasi oleh rantai, dan sel mengandalkan fermentasi agar glikolisis tetap berjalan.',
      ],
    },
    vocabulary: {
      en: [
        ['ATP', 'Adenosine triphosphate, the cell\'s immediate energy currency; energy is released when its terminal phosphate is transferred.'],
        ['NADH and FADH₂', 'Electron carriers that pick up high-energy electrons from glucose breakdown and deliver them to the electron transport chain.'],
        ['Glycolysis', 'The splitting of glucose into two pyruvate molecules in the cytoplasm, with a net gain of 2 ATP and 2 NADH; needs no oxygen.'],
        ['Krebs cycle', 'Also called the citric acid cycle; the series of reactions in the mitochondrial matrix that fully oxidises acetyl groups to CO₂.'],
        ['Electron transport chain', 'Protein complexes in the inner mitochondrial membrane that pass electrons to oxygen and pump H⁺ as they do so.'],
        ['Chemiosmosis', 'ATP production driven by H⁺ flowing back across a membrane through ATP synthase.'],
        ['Oxidative phosphorylation', 'Making ATP using the energy of electrons passed to oxygen; it accounts for most of respiration\'s ATP.'],
        ['Fermentation', 'Anaerobic regeneration of NAD⁺ from pyruvate (to lactate or ethanol), allowing glycolysis to continue without oxygen.'],
      ],
      id: [
        ['ATP', 'Adenosin trifosfat, mata uang energi langsung sel; energi dilepaskan ketika fosfat ujungnya dipindahkan.'],
        ['NADH dan FADH₂', 'Pembawa elektron yang mengambil elektron berenergi tinggi dari pemecahan glukosa dan mengantarkannya ke rantai transpor elektron.'],
        ['Glikolisis', 'Pemecahan glukosa menjadi dua molekul piruvat di sitoplasma, dengan hasil neto 2 ATP dan 2 NADH; tidak memerlukan oksigen.'],
        ['Siklus Krebs', 'Disebut juga siklus asam sitrat; rangkaian reaksi di matriks mitokondria yang mengoksidasi gugus asetil sepenuhnya menjadi CO₂.'],
        ['Rantai transpor elektron', 'Kompleks protein di membran dalam mitokondria yang meneruskan elektron ke oksigen dan memompa H⁺ saat melakukannya.'],
        ['Kemiosmosis', 'Pembuatan ATP yang digerakkan oleh H⁺ yang mengalir balik melintasi membran lewat ATP sintase.'],
        ['Fosforilasi oksidatif', 'Pembuatan ATP dengan energi elektron yang diteruskan ke oksigen; menyumbang sebagian besar ATP respirasi.'],
        ['Fermentasi', 'Regenerasi NAD⁺ secara anaerob dari piruvat (menjadi laktat atau etanol), yang memungkinkan glikolisis berlanjut tanpa oksigen.'],
      ],
    },
    misconceptions: {
      en: [
        ['The CO₂ we breathe out is made from the oxygen we breathe in.', 'The carbon in CO₂ comes from glucose, released in pyruvate oxidation and the Krebs cycle. The oxygen we inhale ends up in water at the end of the electron transport chain.'],
        ['Cellular respiration is the same as breathing.', 'Breathing moves air in and out of the lungs. Cellular respiration is the chemical process inside every cell that uses the oxygen delivered to make ATP; breathing exists to serve it.'],
        ['Most ATP is made in glycolysis or the Krebs cycle.', 'Those stages make only 2 ATP each. Around 26 to 28 of the roughly 30 ATP come from oxidative phosphorylation, powered by the NADH and FADH₂ the earlier stages produced.'],
        ['Without oxygen a cell makes no ATP at all.', 'Glycolysis still works without oxygen and yields 2 ATP per glucose, as long as fermentation recycles NAD⁺. That is how muscles keep going during a sprint and how yeast makes bread rise.'],
      ],
      id: [
        ['CO₂ yang kita hembuskan dibuat dari oksigen yang kita hirup.', 'Karbon dalam CO₂ berasal dari glukosa, dilepaskan pada oksidasi piruvat dan siklus Krebs. Oksigen yang kita hirup berakhir sebagai air di ujung rantai transpor elektron.'],
        ['Respirasi sel sama dengan bernapas.', 'Bernapas memindahkan udara keluar-masuk paru-paru. Respirasi sel adalah proses kimia di dalam setiap sel yang memakai oksigen yang diantarkan untuk membuat ATP; bernapas ada untuk melayaninya.'],
        ['Sebagian besar ATP dibuat pada glikolisis atau siklus Krebs.', 'Tahap-tahap itu hanya membuat 2 ATP masing-masing. Sekitar 26 sampai 28 dari kira-kira 30 ATP berasal dari fosforilasi oksidatif, ditenagai NADH dan FADH₂ yang dihasilkan tahap-tahap sebelumnya.'],
        ['Tanpa oksigen sel tidak membuat ATP sama sekali.', 'Glikolisis tetap berjalan tanpa oksigen dan menghasilkan 2 ATP per glukosa, selama fermentasi mendaur ulang NAD⁺. Begitulah otot tetap bekerja saat sprint dan ragi membuat roti mengembang.'],
      ],
    },
    realWorld: {
      en: [
        'During a sprint, muscles use oxygen faster than blood can deliver it, so they switch to fermentation and lactate builds up; the extra ATP from glycolysis alone is small, which is why a sprint cannot last.',
        'Cyanide is lethal because it blocks the last complex of the electron transport chain; oxygen is present but cannot accept electrons, and ATP production collapses.',
        'Yeast fermenting sugar without oxygen produces ethanol and CO₂, which is what makes bread dough rise and beer fizz.',
        'Measuring how much oxygen a person uses per minute (VO₂) tells exercise physiologists how fast their cells are respiring aerobically.',
      ],
      id: [
        'Saat sprint, otot memakai oksigen lebih cepat daripada yang bisa diantarkan darah, sehingga beralih ke fermentasi dan laktat menumpuk; tambahan ATP dari glikolisis saja kecil, itulah sebabnya sprint tidak bisa berlangsung lama.',
        'Sianida mematikan karena memblokir kompleks terakhir rantai transpor elektron; oksigen ada tetapi tidak bisa menerima elektron, dan produksi ATP runtuh.',
        'Ragi yang memfermentasi gula tanpa oksigen menghasilkan etanol dan CO₂, yang membuat adonan roti mengembang dan bir berbuih.',
        'Mengukur berapa banyak oksigen yang dipakai seseorang per menit (VO₂) memberi tahu fisiolog olahraga seberapa cepat sel-selnya berespirasi secara aerob.',
      ],
    },
    questions: {
      en: [
        { q: 'How many ATP does a cell gain from one glucose without oxygen, and roughly what fraction is that of the aerobic yield?', a: '2 ATP, from glycolysis, provided fermentation regenerates NAD⁺. That is about 2/30, or roughly one fifteenth, of the aerobic yield of about 30 ATP.' },
        { q: 'Step through the sim and note when CO₂ appears. Which stages release it, how many each, and why does none appear in glycolysis or the electron transport chain?', a: 'Pyruvate oxidation releases 2 CO₂ and the Krebs cycle 4, totalling the 6 carbons of glucose. Glycolysis only splits the 6-carbon sugar into two 3-carbon pyruvates without removing carbon, and the chain handles electrons and oxygen, not carbon.' },
        { q: 'The sim totals 30 ATP, yet some textbooks say 38. Where does the difference come from?', a: 'The older figure assumed 3 ATP per NADH and 2 per FADH₂. Measurements of proton pumping give closer to 2.5 and 1.5, so 10 NADH and 2 FADH₂ yield about 28 rather than 34. Moving the 2 cytoplasmic NADH into the mitochondrion can cost extra, which is why the sim\'s chain yields 26 and the modern range is 30 to 32.' },
      ],
      id: [
        { q: 'Berapa ATP yang diperoleh sel dari satu glukosa tanpa oksigen, dan kira-kira berapa bagian dari hasil aerobnya?', a: '2 ATP, dari glikolisis, asalkan fermentasi meregenerasi NAD⁺. Itu sekitar 2/30, atau kira-kira seperlima belas, dari hasil aerob sekitar 30 ATP.' },
        { q: 'Telusuri simulasi dan catat kapan CO₂ muncul. Tahap mana yang melepaskannya, berapa masing-masing, dan mengapa tidak ada yang muncul pada glikolisis atau rantai transpor elektron?', a: 'Oksidasi piruvat melepaskan 2 CO₂ dan siklus Krebs 4, berjumlah 6 karbon glukosa. Glikolisis hanya memecah gula 6-karbon menjadi dua piruvat 3-karbon tanpa melepas karbon, dan rantai menangani elektron dan oksigen, bukan karbon.' },
        { q: 'Simulasi menjumlahkan 30 ATP, padahal beberapa buku teks menyebut 38. Dari mana perbedaannya?', a: 'Angka lama mengasumsikan 3 ATP per NADH dan 2 per FADH₂. Pengukuran pemompaan proton memberi nilai lebih dekat ke 2,5 dan 1,5, sehingga 10 NADH dan 2 FADH₂ menghasilkan sekitar 28, bukan 34. Memindahkan 2 NADH sitoplasma ke dalam mitokondria bisa menambah biaya, itulah sebabnya rantai di simulasi menghasilkan 26 dan rentang modernnya 30 sampai 32.' },
      ],
    },
  },
};
