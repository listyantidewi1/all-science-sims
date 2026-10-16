// Long-form text for the sim page aside, kept out of manifest.js.
export default {
  objectives: {
    en: [
      'Sequence the five stages of the lytic cycle (attachment, injection, replication, assembly, lysis) and explain what happens to the host cell at each one.',
      'Compare the lysogenic cycle with the lytic cycle: how a prophage is carried silently through host divisions and what induction does.',
      'Use burst size and latent period to predict how fast a virus population grows, and identify which stage a given antiviral drug targets.',
    ],
    id: [
      'Mengurutkan lima tahap siklus litik (pelekatan, penyuntikan, replikasi, perakitan, lisis) dan menjelaskan apa yang terjadi pada sel inang di setiap tahap.',
      'Membandingkan siklus lisogenik dengan siklus litik: bagaimana profag dibawa secara diam-diam melalui pembelahan inang dan apa akibat induksi.',
      'Menggunakan ukuran ledakan (burst size) dan periode laten untuk memprediksi laju pertumbuhan populasi virus, serta mengenali tahap mana yang menjadi target obat antivirus.',
    ],
  },
  tryThis: {
    en: [
      'Run the lytic cycle on Auto with burst size 100 and time to lysis 25 min. Note the time at which free virions first exceed 1000 and when the host population crashes.',
      'Double the burst size to 200. Does the host population crash in half the time, or sooner than that? Record both runs in the lab.',
      'Switch to the lysogenic cycle and reset. How many host divisions happen before the first virions appear? Why do the host cells survive longer?',
      'Set "Antiviral blocks" to Assembly, then to Attachment. Which drug stops the population of free virions from rising at all, and which one still lets infected cells die?',
    ],
    id: [
      'Jalankan siklus litik dengan Auto, ukuran ledakan 100 dan waktu lisis 25 menit. Catat waktu saat virion bebas pertama kali melampaui 1000 dan saat populasi inang runtuh.',
      'Gandakan ukuran ledakan menjadi 200. Apakah populasi inang runtuh dalam separuh waktu, atau lebih cepat lagi? Rekam kedua percobaan di lab.',
      'Pindah ke siklus lisogenik dan reset. Berapa kali inang membelah sebelum virion pertama muncul? Mengapa sel inang bertahan lebih lama?',
      'Atur "Antiviral blocks" ke Assembly, lalu ke Attachment. Obat mana yang mencegah virion bebas bertambah sama sekali, dan mana yang tetap membiarkan sel terinfeksi mati?',
    ],
  },

  learn: {
    background: {
      en: [
        'A virus is not a cell. It is a package of genetic material (DNA or RNA) inside a protein coat, and it has no ribosomes, no metabolism and no way to copy itself on its own. To reproduce it must hijack a living cell. The bacteriophage T4 in this simulation is about 200 nm long and infects the bacterium Escherichia coli, which is roughly 2 µm long, so the drawing is not to scale. Phages are the most abundant biological entities on Earth: a millilitre of seawater holds around 10 million of them.',
        'In the lytic cycle the phage attaches to receptors on the cell wall with its tail fibres, injects its DNA, and the host’s own enzymes and ribosomes are redirected to copy the viral genome and build new heads and tails. The parts self-assemble, and the cell bursts (lyses). For T4 at 37 °C the whole cycle, called the latent period, takes about 25 minutes and releases a burst of 100 to 200 new virions. The simulation lets you set both numbers and shows a population panel: with a burst size B, each generation can multiply the free virus by up to B, so 10 virions become 1000 after one cycle and 100 000 after two, until the host cells run out.',
        'In the lysogenic cycle (phage lambda is the classic example) the injected DNA instead integrates into the host chromosome as a prophage. The cell is not harmed; it divides normally about every 30 minutes and every daughter cell inherits a copy. The prophage can stay silent for many generations until stress such as UV light or starvation triggers induction: the prophage excises itself and the cell enters the lytic cycle. In the population panel the lysogenic route shows a slow, delayed rise of free virus while the host population keeps growing.',
        'Antiviral drugs work by blocking one stage of a replication cycle, which is why the simulation lets you choose which step a drug hits. Entry inhibitors (such as maraviroc for HIV) block attachment, nucleoside analogues (such as acyclovir) block genome replication, protease inhibitors block assembly, and neuraminidase inhibitors (such as oseltamivir for influenza) block release. Antibiotics do nothing to viruses because viruses have no cell wall or ribosomes of their own to attack.',
      ],
      id: [
        'Virus bukan sel. Virus adalah paket materi genetik (DNA atau RNA) di dalam selubung protein, tanpa ribosom, tanpa metabolisme, dan tidak mampu menggandakan diri sendiri. Untuk berkembang biak virus harus membajak sel hidup. Bakteriofag T4 dalam simulasi ini panjangnya sekitar 200 nm dan menginfeksi bakteri Escherichia coli yang panjangnya kira-kira 2 µm, sehingga gambarnya tidak berskala. Fag adalah entitas biologis terbanyak di Bumi: satu mililiter air laut mengandung sekitar 10 juta fag.',
        'Dalam siklus litik, fag menempel pada reseptor di dinding sel dengan serabut ekornya, menyuntikkan DNA-nya, lalu enzim dan ribosom inang dialihkan untuk menyalin genom virus dan membangun kepala serta ekor baru. Bagian-bagian itu merakit diri sendiri dan sel pecah (lisis). Untuk T4 pada 37 °C seluruh siklus, yang disebut periode laten, memakan waktu sekitar 25 menit dan melepaskan ledakan 100 sampai 200 virion baru. Simulasi memungkinkanmu mengatur kedua angka itu dan menampilkan panel populasi: dengan ukuran ledakan B, tiap generasi dapat melipatgandakan virus bebas hingga B kali, sehingga 10 virion menjadi 1000 setelah satu siklus dan 100.000 setelah dua siklus, sampai sel inang habis.',
        'Dalam siklus lisogenik (fag lambda adalah contoh klasiknya) DNA yang disuntikkan justru berintegrasi ke kromosom inang sebagai profag. Sel tidak dirugikan; sel membelah normal kira-kira setiap 30 menit dan setiap sel anak mewarisi salinannya. Profag dapat tetap diam selama banyak generasi hingga stres seperti sinar UV atau kelaparan memicu induksi: profag memotong dirinya keluar dan sel memasuki siklus litik. Di panel populasi, jalur lisogenik memperlihatkan kenaikan virus bebas yang lambat dan tertunda sementara populasi inang terus bertambah.',
        'Obat antivirus bekerja dengan menghambat satu tahap siklus replikasi, karena itulah simulasi membiarkanmu memilih tahap mana yang dihambat obat. Penghambat masuk (seperti maraviroc untuk HIV) menghambat pelekatan, analog nukleosida (seperti asiklovir) menghambat replikasi genom, penghambat protease menghambat perakitan, dan penghambat neuraminidase (seperti oseltamivir untuk influenza) menghambat pelepasan. Antibiotik tidak berpengaruh pada virus karena virus tidak memiliki dinding sel atau ribosom sendiri untuk diserang.',
      ],
    },
    figure: {
      caption: {
        en: 'The two reproductive cycles of a temperate bacteriophage. Lytic (top row): attach, inject DNA, replicate genome, assemble capsids, lyse and release a burst of 100–200 virions after about 25 minutes. Lysogenic (bottom): the viral DNA integrates as a prophage, is copied with every host division, and induction (UV, stress) sends the cell back into the lytic route.',
        id: 'Dua siklus reproduksi bakteriofag temperat. Litik (baris atas): menempel, menyuntik DNA, replikasi genom, perakitan kapsid, lisis dan pelepasan 100–200 virion setelah sekitar 25 menit. Lisogenik (bawah): DNA virus berintegrasi sebagai profag, disalin pada setiap pembelahan inang, dan induksi (UV, stres) mengembalikan sel ke jalur litik.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        const cell = (x, y, w, h, extra = '') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${h / 2}" class="c"/>${extra}`;
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Lytic and lysogenic cycles of a bacteriophage', 'Siklus litik dan lisogenik bakteriofag')}">
  <style>text{font:10px system-ui,sans-serif;fill:currentColor}.h{font:bold 11px system-ui,sans-serif;fill:currentColor}.c{fill:none;stroke:currentColor;stroke-width:1.2}.v{fill:#8b5cf6}.d{stroke:#f59e0b;stroke-width:1.6;fill:none}.g{stroke:#10b981;stroke-width:1.4;fill:none}.ar{stroke:currentColor;stroke-width:1.2;fill:none}</style>
  <defs><marker id="vr-a" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto"><path d="M0 0 L7 3.5 L0 7 z" fill="currentColor"/></marker></defs>
  <text x="8" y="14" class="h">${L('Lytic cycle (~25 min, burst 100–200)', 'Siklus litik (~25 mnt, ledakan 100–200)')}</text>
  ${cell(10, 40, 52, 30, '<path d="M20 55 q8 -8 16 0 t16 0" class="g"/>')}
  <polygon points="36,22 42,26 42,33 36,37 30,33 30,26" class="v"/><line x1="36" y1="37" x2="36" y2="44" stroke="#8b5cf6" stroke-width="2"/>
  <text x="36" y="84" text-anchor="middle">${L('1 attach', '1 menempel')}</text>
  <line x1="66" y1="55" x2="78" y2="55" class="ar" marker-end="url(#vr-a)"/>
  ${cell(82, 40, 52, 30, '<path d="M92 55 q8 -8 16 0 t16 0" class="g"/><path d="M108 24 v22" class="d"/>')}
  <polygon points="108,12 114,16 114,22 108,25 102,22 102,16" fill="none" stroke="#8b5cf6" stroke-width="1.2"/>
  <text x="108" y="84" text-anchor="middle">${L('2 inject', '2 menyuntik')}</text>
  <line x1="138" y1="55" x2="150" y2="55" class="ar" marker-end="url(#vr-a)"/>
  ${cell(154, 40, 52, 30, '<path d="M162 48 h12 M162 55 h12 M162 62 h12 M184 48 h12 M184 55 h12 M184 62 h12" class="d"/>')}
  <text x="180" y="84" text-anchor="middle">${L('3 replicate', '3 replikasi')}</text>
  <line x1="210" y1="55" x2="222" y2="55" class="ar" marker-end="url(#vr-a)"/>
  ${cell(226, 40, 52, 30, '<polygon points="240,47 244,50 244,55 240,58 236,55 236,50" class="v"/><polygon points="256,47 260,50 260,55 256,58 252,55 252,50" class="v"/><polygon points="248,56 252,59 252,64 248,67 244,64 244,59" class="v"/>')}
  <text x="252" y="84" text-anchor="middle">${L('4 assemble', '4 perakitan')}</text>
  <line x1="282" y1="55" x2="294" y2="55" class="ar" marker-end="url(#vr-a)"/>
  <path d="M300 44 q10 -8 20 2 q14 -4 20 6 q-4 10 -16 14 q-12 4 -22 -2 q-6 -10 -2 -20 z" class="c" stroke-dasharray="3 2"/>
  <polygon points="310,30 314,33 314,38 310,41 306,38 306,33" class="v"/><polygon points="334,28 338,31 338,36 334,39 330,36 330,31" class="v"/><polygon points="346,60 350,63 350,68 346,71 342,68 342,63" class="v"/><polygon points="304,70 308,73 308,78 304,81 300,78 300,73" class="v"/>
  <text x="322" y="92" text-anchor="middle">${L('5 lyse: ×B', '5 lisis: ×B')}</text>
  <text x="8" y="124" class="h">${L('Lysogenic cycle (silent for many generations)', 'Siklus lisogenik (diam selama banyak generasi)')}</text>
  <path d="M108 72 C108 100 60 100 60 140" class="ar" marker-end="url(#vr-a)"/>
  ${cell(34, 144, 52, 30, '<path d="M44 159 q8 -8 16 0 t16 0" class="g"/><path d="M56 155 h8" class="d" stroke-width="3"/>')}
  <text x="60" y="190" text-anchor="middle">${L('integrate: prophage', 'integrasi: profag')}</text>
  <line x1="90" y1="159" x2="104" y2="159" class="ar" marker-end="url(#vr-a)"/>
  ${cell(108, 144, 40, 30, '<path d="M114 159 q6 -6 12 0 t12 0" class="g"/><path d="M124 155 h6" class="d" stroke-width="3"/>')}
  ${cell(152, 144, 40, 30, '<path d="M158 159 q6 -6 12 0 t12 0" class="g"/><path d="M168 155 h6" class="d" stroke-width="3"/>')}
  <text x="150" y="190" text-anchor="middle">${L('divide: every daughter carries it', 'membelah: setiap sel anak membawanya')}</text>
  <line x1="196" y1="159" x2="212" y2="159" class="ar" marker-end="url(#vr-a)"/>
  <path d="M232 128 l-6 12 h8 l-6 14" stroke="#fbbf24" stroke-width="2" fill="none"/>
  <text x="246" y="134" fill="#fbbf24">UV</text>
  ${cell(216, 144, 52, 30, '<path d="M226 159 q8 -8 16 0 t16 0" class="g"/><path d="M236 150 q6 -6 12 0" class="d"/>')}
  <text x="242" y="190" text-anchor="middle">${L('induce: excise', 'induksi: keluar')}</text>
  <path d="M272 150 C300 130 300 80 290 72" class="ar" marker-end="url(#vr-a)"/>
  <text x="296" y="130">${L('back to', 'kembali ke')}</text><text x="296" y="142">${L('lytic step 3', 'tahap litik 3')}</text>
  <line x1="12" y1="214" x2="28" y2="214" class="g"/><text x="32" y="218">${L('host chromosome', 'kromosom inang')}</text>
  <line x1="140" y1="214" x2="156" y2="214" class="d"/><text x="160" y="218">${L('viral DNA', 'DNA virus')}</text>
  <polygon points="236,209 240,212 240,217 236,220 232,217 232,212" class="v"/><text x="246" y="218">${L('capsid', 'kapsid')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Viruses are obligate intracellular parasites: they carry genetic instructions but must use a host cell’s ribosomes, enzymes and energy to reproduce.',
        'Lytic cycle: attach → inject → replicate → assemble → lyse. For phage T4 the latent period is about 25 min and the burst size 100–200 virions per cell.',
        'Virus numbers grow geometrically: after n lytic generations the free virus can rise by a factor of up to Bⁿ, which is why a culture of a billion bacteria can be cleared in a few hours.',
        'Lysogenic cycle: viral DNA integrates as a prophage and is copied by every host division (about every 30 min in E. coli) without killing the cell, until induction switches it to the lytic cycle.',
        'Each antiviral drug blocks one stage; blocking attachment protects uninfected cells, whereas blocking assembly or release stops new virions but does not save cells that are already infected.',
        'Antibiotics target bacterial structures (cell walls, ribosomes) that viruses do not have, so they never treat a viral infection.',
      ],
      id: [
        'Virus adalah parasit intraseluler obligat: virus membawa instruksi genetik tetapi harus memakai ribosom, enzim, dan energi sel inang untuk berkembang biak.',
        'Siklus litik: menempel → menyuntik → replikasi → perakitan → lisis. Untuk fag T4 periode laten sekitar 25 menit dan ukuran ledakan 100–200 virion per sel.',
        'Jumlah virus tumbuh secara geometris: setelah n generasi litik virus bebas dapat naik hingga faktor Bⁿ, itulah mengapa kultur satu miliar bakteri bisa habis dalam beberapa jam.',
        'Siklus lisogenik: DNA virus berintegrasi sebagai profag dan disalin pada setiap pembelahan inang (sekitar tiap 30 menit pada E. coli) tanpa membunuh sel, sampai induksi mengalihkannya ke siklus litik.',
        'Setiap obat antivirus menghambat satu tahap; menghambat pelekatan melindungi sel yang belum terinfeksi, sedangkan menghambat perakitan atau pelepasan menghentikan virion baru tetapi tidak menyelamatkan sel yang sudah terinfeksi.',
        'Antibiotik menyerang struktur bakteri (dinding sel, ribosom) yang tidak dimiliki virus, sehingga antibiotik tidak pernah menyembuhkan infeksi virus.',
      ],
    },
    vocabulary: {
      en: [
        ['Bacteriophage (phage)', 'A virus that infects bacteria. T4 and lambda, which infect E. coli, are the best-studied examples.'],
        ['Capsid', 'The protein coat that surrounds and protects the viral genome; in T4 it is an icosahedral head attached to a tail with fibres.'],
        ['Lytic cycle', 'The reproductive pathway in which the virus replicates immediately and bursts (lyses) the host cell to release new virions.'],
        ['Lysogenic cycle', 'The pathway in which viral DNA integrates into the host chromosome as a prophage and is copied with the host for many generations.'],
        ['Prophage', 'Viral DNA integrated into a bacterial chromosome, replicated passively each time the cell divides.'],
        ['Burst size', 'The number of new virions released when one infected cell lyses; about 100–200 for T4.'],
        ['Latent period', 'The time from infection to lysis; about 25 minutes for T4 at 37 °C.'],
        ['Induction', 'The switch from lysogeny to the lytic cycle, usually triggered by DNA damage such as UV light.'],
      ],
      id: [
        ['Bakteriofag (fag)', 'Virus yang menginfeksi bakteri. T4 dan lambda, yang menginfeksi E. coli, adalah contoh yang paling banyak dipelajari.'],
        ['Kapsid', 'Selubung protein yang mengelilingi dan melindungi genom virus; pada T4 berupa kepala ikosahedral yang tersambung ke ekor berserabut.'],
        ['Siklus litik', 'Jalur reproduksi ketika virus langsung bereplikasi dan memecahkan (melisiskan) sel inang untuk melepaskan virion baru.'],
        ['Siklus lisogenik', 'Jalur ketika DNA virus berintegrasi ke kromosom inang sebagai profag dan disalin bersama inang selama banyak generasi.'],
        ['Profag', 'DNA virus yang terintegrasi dalam kromosom bakteri, direplikasi secara pasif setiap kali sel membelah.'],
        ['Ukuran ledakan (burst size)', 'Jumlah virion baru yang dilepaskan ketika satu sel terinfeksi lisis; sekitar 100–200 untuk T4.'],
        ['Periode laten', 'Waktu dari infeksi sampai lisis; sekitar 25 menit untuk T4 pada 37 °C.'],
        ['Induksi', 'Peralihan dari lisogeni ke siklus litik, biasanya dipicu oleh kerusakan DNA seperti sinar UV.'],
      ],
    },
    misconceptions: {
      en: [
        ['Viruses are tiny cells.', 'A virus has no cytoplasm, membrane-bound organelles, ribosomes or metabolism. Outside a host it is an inert particle; it only "comes alive" by using a cell’s machinery.'],
        ['Antibiotics can cure a viral infection such as flu or COVID-19.', 'Antibiotics attack bacterial cell walls and ribosomes. Viruses have neither, so antibiotics are useless against them; only antivirals that block a replication stage, or vaccines, help.'],
        ['A virus grows and then divides like a bacterium.', 'Viruses never grow or divide. Genomes and coat proteins are made separately in the host and then self-assemble, so hundreds of virions appear at once in a burst rather than by doubling.'],
        ['Once a cell is infected it is always destroyed quickly.', 'In the lysogenic cycle the host cell survives and keeps dividing for many generations; the prophage only becomes destructive after induction.'],
      ],
      id: [
        ['Virus adalah sel yang sangat kecil.', 'Virus tidak mempunyai sitoplasma, organel bermembran, ribosom, atau metabolisme. Di luar inang virus hanyalah partikel lembam; virus hanya "hidup" dengan memakai perangkat sel.'],
        ['Antibiotik dapat menyembuhkan infeksi virus seperti flu atau COVID-19.', 'Antibiotik menyerang dinding sel dan ribosom bakteri. Virus tidak memiliki keduanya, sehingga antibiotik tidak berguna; hanya antivirus yang menghambat tahap replikasi, atau vaksin, yang membantu.'],
        ['Virus tumbuh lalu membelah seperti bakteri.', 'Virus tidak pernah tumbuh atau membelah. Genom dan protein selubung dibuat terpisah di dalam inang lalu merakit diri, sehingga ratusan virion muncul sekaligus dalam satu ledakan, bukan dengan penggandaan.'],
        ['Sel yang terinfeksi selalu cepat hancur.', 'Dalam siklus lisogenik sel inang bertahan dan terus membelah selama banyak generasi; profag baru merusak setelah induksi.'],
      ],
    },
    realWorld: {
      en: [
        'Phage therapy uses lytic bacteriophages to treat antibiotic-resistant infections; a phage cocktail saved a patient with a drug-resistant Acinetobacter infection in 2016.',
        'The cholera toxin gene is carried by a prophage (CTXφ): Vibrio cholerae only causes severe disease when it is lysogenic for this phage.',
        'Oseltamivir (Tamiflu) blocks the release stage of influenza, while acyclovir blocks the replication stage of herpes viruses: the same logic as the "antiviral blocks" selector.',
        'HIV integrates into human DNA as a provirus, the lysogenic strategy in a human host, which is why antiretroviral drugs control but cannot yet cure the infection.',
        'Dairy producers monitor phages closely because a lytic outbreak can wipe out the Lactococcus starter culture in a cheese vat within hours.',
      ],
      id: [
        'Terapi fag memakai bakteriofag litik untuk mengobati infeksi yang resisten antibiotik; koktail fag menyelamatkan pasien dengan infeksi Acinetobacter resisten obat pada 2016.',
        'Gen toksin kolera dibawa oleh profag (CTXφ): Vibrio cholerae hanya menyebabkan penyakit berat jika lisogenik terhadap fag ini.',
        'Oseltamivir (Tamiflu) menghambat tahap pelepasan virus influenza, sementara asiklovir menghambat tahap replikasi virus herpes: logika yang sama dengan pemilih "antiviral blocks".',
        'HIV berintegrasi ke DNA manusia sebagai provirus, strategi lisogenik pada inang manusia, sehingga obat antiretroviral mengendalikan tetapi belum dapat menyembuhkan infeksi.',
        'Produsen susu memantau fag dengan ketat karena wabah litik dapat memusnahkan kultur starter Lactococcus dalam tangki keju dalam hitungan jam.',
      ],
    },
    questions: {
      en: [
        { q: 'A culture starts with 10 virions and the burst size is 150. Assuming every virion infects a cell, how many free virions are there after two complete lytic cycles, and how long does that take for T4?', a: 'After one cycle 10 × 150 = 1500; after two, 1500 × 150 = 225 000 virions. With a 25 min latent period two cycles take about 50 minutes.' },
        { q: 'In the simulation the lysogenic run shows the host population still rising after 60 minutes, while the lytic run has crashed. Explain the difference.', a: 'In lysogeny the viral DNA integrates as a prophage and the cell is not lysed; it keeps dividing (every ~30 min) and passes the prophage on. Only occasional induction produces virions, so the hosts persist. In the lytic run every infected cell dies after ~25 min and releases a burst that infects the rest.' },
        { q: 'A drug blocks the assembly stage. Will the cells that are already infected survive? Will new cells be infected?', a: 'Infected cells still have their metabolism hijacked and generally die, but they release no infectious virions because capsids cannot assemble. Since no new virions appear, uninfected cells stop being infected once the existing free virus is used up.' },
        { q: 'Why does a doctor refuse to prescribe antibiotics for a viral sore throat?', a: 'Antibiotics act on bacterial cell walls, ribosomes or enzymes. A virus has none of these; it uses the human cell’s machinery. Antibiotics would not shorten the illness and would only promote antibiotic resistance.' },
      ],
      id: [
        { q: 'Sebuah kultur dimulai dengan 10 virion dan ukuran ledakan 150. Jika setiap virion menginfeksi satu sel, berapa virion bebas setelah dua siklus litik lengkap, dan berapa lama waktu yang dibutuhkan untuk T4?', a: 'Setelah satu siklus 10 × 150 = 1500; setelah dua siklus 1500 × 150 = 225.000 virion. Dengan periode laten 25 menit, dua siklus memakan waktu sekitar 50 menit.' },
        { q: 'Dalam simulasi, percobaan lisogenik menunjukkan populasi inang masih naik setelah 60 menit, sedangkan percobaan litik sudah runtuh. Jelaskan perbedaannya.', a: 'Pada lisogeni DNA virus berintegrasi sebagai profag dan sel tidak dilisiskan; sel terus membelah (tiap ~30 menit) dan mewariskan profag. Hanya induksi sesekali yang menghasilkan virion, sehingga inang bertahan. Pada percobaan litik setiap sel terinfeksi mati setelah ~25 menit dan melepaskan ledakan yang menginfeksi sisanya.' },
        { q: 'Suatu obat menghambat tahap perakitan. Apakah sel yang sudah terinfeksi akan selamat? Apakah sel baru akan terinfeksi?', a: 'Sel yang terinfeksi tetap dibajak metabolismenya dan umumnya mati, tetapi tidak melepaskan virion infektif karena kapsid tidak dapat dirakit. Karena tidak ada virion baru, sel yang belum terinfeksi berhenti terinfeksi setelah virus bebas yang ada habis terpakai.' },
        { q: 'Mengapa dokter menolak meresepkan antibiotik untuk radang tenggorokan akibat virus?', a: 'Antibiotik bekerja pada dinding sel, ribosom, atau enzim bakteri. Virus tidak memiliki semuanya; virus memakai perangkat sel manusia. Antibiotik tidak akan mempersingkat sakit dan hanya mendorong resistensi antibiotik.' },
      ],
    },
  },
};
