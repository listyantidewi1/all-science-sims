// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Predict molecular geometry from steric number.',
      'Distinguish bond pairs from lone pairs in shape determination.',
      'Match a real molecule (H₂O, NH₃, CH₄, SF₆…) to its VSEPR class.',
    ],
    id: [
      'Memprediksi geometri molekul dari bilangan sterik.',
      'Membedakan pasangan ikatan dan pasangan bebas dalam menentukan bentuk.',
      'Mencocokkan molekul nyata (H₂O, NH₃, CH₄, SF₆…) dengan kelas VSEPR-nya.',
    ],
  },
  tryThis: {
    en: [
      'Set 4 bond pairs, 0 lone — what shape? (CH₄)',
      'Set 2 bond pairs, 2 lone — bent? (H₂O)',
      'Add lone pairs to a 5-domain molecule — trigonal bipyramidal becomes seesaw → T-shape → linear.',
    ],
    id: [
      'Atur 4 pasangan ikatan, 0 bebas — bentuknya? (CH₄)',
      'Atur 2 pasangan ikatan, 2 bebas — bentuk bengkok? (H₂O)',
      'Tambahkan pasangan bebas pada 5 domain — trigonal bipiramidal menjadi seesaw → T → linear.',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'Molecules are three-dimensional, and their shapes decide their properties: whether they are polar, how they pack into crystals, how they fit into an enzyme. The Valence Shell Electron Pair Repulsion (VSEPR) model predicts shape from a simple idea. Around a central atom, the groups of valence electrons (bonding pairs to other atoms and non-bonding lone pairs) all repel one another, so they spread out to be as far apart as possible. Two groups end up 180° apart (linear), three at 120° in a plane (trigonal planar), four point to the corners of a tetrahedron (109.5°), five form a trigonal bipyramid (120° in the equator, 90° to the poles), and six an octahedron (all 90°).',
        'The simulation counts electron domains, the steric number, as bonded atoms plus lone pairs. A double or triple bond counts as a single domain because all its electrons point toward the same atom. The domains are placed in the ideal arrangement for that number, and the lone pairs are then assigned to the positions where they cause the least repulsion: for five domains they take equatorial positions, where they have only two 90° neighbours instead of three, and for six domains two lone pairs sit opposite each other. The name of the shape describes only where the atoms are, which is why four domains can be tetrahedral (CH₄), trigonal pyramidal (NH₃) or bent (H₂O) depending on how many of them are lone pairs.',
        'Two sliders set the numbers of bonded atoms and lone pairs, with the total capped at six, and the presets jump to familiar molecules. Drag to rotate the model or let it spin; looking at a trigonal bipyramid from the side and then from the top is the quickest way to see why the equatorial and axial positions are different. The label reports the shape name and an example compound for each combination. Try walking a five-domain molecule from PCl₅ through SF₄ (seesaw) and ClF₃ (T-shaped) to XeF₂ (linear) while watching which positions empty out.',
        'The model is deliberately idealised. All bonds are drawn the same length and every angle is the perfect geometric value, but in real molecules lone pairs are held closer to the nucleus and push the bonds together: the H–N–H angle in ammonia is about 107°, and the H–O–H angle in water about 104.5°, not 109.5°. The sim does not know which atoms you are using, so it cannot say whether a given combination actually exists or whether the molecule is polar, and it stops at six domains (IF₇, with seven, is pentagonal bipyramidal). VSEPR itself is a predictive rule of thumb that works well for main-group compounds and less reliably for transition metals.',
      ],
      id: [
        'Molekul berbentuk tiga dimensi, dan bentuknya menentukan sifat-sifatnya: apakah polar, bagaimana tersusun dalam kristal, bagaimana pas masuk ke enzim. Model Tolakan Pasangan Elektron Kulit Valensi (VSEPR) meramalkan bentuk dari satu gagasan sederhana. Di sekeliling atom pusat, kelompok-kelompok elektron valensi (pasangan ikatan ke atom lain dan pasangan bebas yang tidak berikatan) saling menolak, sehingga menyebar sejauh mungkin. Dua kelompok berakhir 180° terpisah (linear), tiga pada 120° dalam satu bidang (trigonal planar), empat menunjuk ke sudut-sudut tetrahedron (109,5°), lima membentuk bipiramida trigonal (120° di ekuator, 90° ke kutub), dan enam membentuk oktahedron (semuanya 90°).',
        'Simulasi menghitung domain elektron, yaitu bilangan sterik, sebagai jumlah atom terikat ditambah pasangan bebas. Ikatan rangkap dua atau tiga dihitung sebagai satu domain karena semua elektronnya mengarah ke atom yang sama. Domain-domain ditempatkan dalam susunan ideal untuk jumlah itu, lalu pasangan bebas diberi posisi yang tolakannya paling kecil: untuk lima domain mereka mengambil posisi ekuatorial, dengan hanya dua tetangga 90° alih-alih tiga, dan untuk enam domain dua pasangan bebas duduk saling berseberangan. Nama bentuk hanya menggambarkan letak atom-atomnya, sehingga empat domain bisa tetrahedral (CH₄), piramida trigonal (NH₃), atau bengkok (H₂O) bergantung pada berapa di antaranya yang berupa pasangan bebas.',
        'Dua slider mengatur jumlah atom terikat dan pasangan bebas, dengan total dibatasi enam, dan tombol preset melompat ke molekul-molekul yang dikenal. Seret untuk memutar model atau biarkan berputar sendiri; melihat bipiramida trigonal dari samping lalu dari atas adalah cara tercepat memahami mengapa posisi ekuatorial dan aksial berbeda. Label menampilkan nama bentuk dan contoh senyawa untuk setiap kombinasi. Cobalah menelusuri molekul lima domain dari PCl₅ melalui SF₄ (jungkat-jungkit) dan ClF₃ (bentuk T) sampai XeF₂ (linear) sambil memperhatikan posisi mana yang dikosongkan.',
        'Model ini sengaja diidealkan. Semua ikatan digambar sama panjang dan setiap sudut adalah nilai geometri sempurna, tetapi pada molekul nyata pasangan bebas ditahan lebih dekat ke inti dan mendesak ikatan-ikatan merapat: sudut H–N–H pada amonia sekitar 107°, dan sudut H–O–H pada air sekitar 104,5°, bukan 109,5°. Simulasi tidak mengetahui atom apa yang kamu pakai, sehingga tidak dapat menyatakan apakah suatu kombinasi benar-benar ada atau apakah molekulnya polar, dan berhenti pada enam domain (IF₇, dengan tujuh domain, berbentuk bipiramida pentagonal). VSEPR sendiri adalah aturan praktis peramalan yang bekerja baik untuk senyawa golongan utama dan kurang andal untuk logam transisi.',
      ],
    },
    figure: {
      caption: {
        en: 'Three molecules with four electron domains. The domains always point roughly to the corners of a tetrahedron, but the shape is named after the atoms only. Lone pairs (amber) take up more room near the central atom and squeeze the bond angles below 109.5°.',
        id: 'Tiga molekul dengan empat domain elektron. Domain selalu mengarah kira-kira ke sudut-sudut tetrahedron, tetapi bentuknya dinamai berdasarkan atom saja. Pasangan bebas (jingga) memakan lebih banyak ruang di dekat atom pusat dan menekan sudut ikatan hingga di bawah 109,5°.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Methane, ammonia and water compared', 'Perbandingan metana, amonia, dan air')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.b{stroke:currentColor;stroke-width:2.4}.lp{fill:#f59e0b;opacity:.55}.ttl{font-weight:bold}</style>
  <text x="180" y="18" text-anchor="middle" class="ttl">${L('4 electron domains, 3 different shapes', '4 domain elektron, 3 bentuk berbeda')}</text>
  <line x1="60" y1="120" x2="60" y2="72" class="b"/><line x1="60" y1="120" x2="26" y2="150" class="b"/>
  <line x1="60" y1="120" x2="94" y2="150" class="b"/><line x1="60" y1="120" x2="60" y2="156" class="b" stroke-dasharray="3 3"/>
  <circle cx="60" cy="72" r="8" fill="#3b82f6"/><circle cx="26" cy="150" r="8" fill="#3b82f6"/>
  <circle cx="94" cy="150" r="8" fill="#3b82f6"/><circle cx="60" cy="156" r="7" fill="#3b82f6" opacity=".7"/>
  <circle cx="60" cy="120" r="12" fill="#10b981"/>
  <text x="60" y="186" text-anchor="middle" class="ttl">CH₄</text>
  <text x="60" y="200" text-anchor="middle">${L('tetrahedral', 'tetrahedral')}</text>
  <text x="60" y="214" text-anchor="middle">109.5°</text>
  <ellipse cx="180" cy="86" rx="16" ry="11" class="lp"/>
  <circle cx="176" cy="84" r="2.5" fill="#f59e0b"/><circle cx="184" cy="88" r="2.5" fill="#f59e0b"/>
  <line x1="180" y1="120" x2="148" y2="152" class="b"/><line x1="180" y1="120" x2="212" y2="152" class="b"/>
  <line x1="180" y1="120" x2="180" y2="158" class="b" stroke-dasharray="3 3"/>
  <circle cx="148" cy="152" r="8" fill="#3b82f6"/><circle cx="212" cy="152" r="8" fill="#3b82f6"/><circle cx="180" cy="158" r="7" fill="#3b82f6" opacity=".7"/>
  <circle cx="180" cy="120" r="12" fill="#10b981"/>
  <text x="180" y="186" text-anchor="middle" class="ttl">NH₃</text>
  <text x="180" y="200" text-anchor="middle">${L('trigonal pyramidal', 'piramida trigonal')}</text>
  <text x="180" y="214" text-anchor="middle">${L('about 107°', 'sekitar 107°')}</text>
  <ellipse cx="282" cy="90" rx="15" ry="10" transform="rotate(-25 282 90)" class="lp"/>
  <ellipse cx="318" cy="90" rx="15" ry="10" transform="rotate(25 318 90)" class="lp"/>
  <circle cx="278" cy="88" r="2.5" fill="#f59e0b"/><circle cx="286" cy="92" r="2.5" fill="#f59e0b"/>
  <circle cx="314" cy="92" r="2.5" fill="#f59e0b"/><circle cx="322" cy="88" r="2.5" fill="#f59e0b"/>
  <line x1="300" y1="120" x2="270" y2="154" class="b"/><line x1="300" y1="120" x2="330" y2="154" class="b"/>
  <circle cx="270" cy="154" r="8" fill="#3b82f6"/><circle cx="330" cy="154" r="8" fill="#3b82f6"/>
  <circle cx="300" cy="120" r="12" fill="#10b981"/>
  <text x="300" y="186" text-anchor="middle" class="ttl">H₂O</text>
  <text x="300" y="200" text-anchor="middle">${L('bent', 'bengkok')}</text>
  <text x="300" y="214" text-anchor="middle">${L('about 104.5°', 'sekitar 104,5°')}</text>
  <text x="180" y="234" text-anchor="middle" opacity=".75">${L('lone pairs push bonds closer together', 'pasangan bebas mendesak ikatan merapat')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Electron domains around a central atom arrange themselves to be as far apart as possible, because like charges repel.',
        'The number of domains (bonded atoms + lone pairs) fixes the arrangement: 2 linear, 3 trigonal planar, 4 tetrahedral, 5 trigonal bipyramidal, 6 octahedral.',
        'A multiple bond counts as one domain, so CO₂ with two double bonds is linear.',
        'Lone pairs occupy positions but are not named in the shape, so the same number of domains can give several molecular shapes.',
        'Lone pairs repel more strongly than bonding pairs, so they take the roomiest positions and compress the remaining bond angles.',
      ],
      id: [
        'Domain elektron di sekeliling atom pusat menata diri sejauh mungkin satu sama lain, karena muatan sejenis saling menolak.',
        'Jumlah domain (atom terikat + pasangan bebas) menentukan susunannya: 2 linear, 3 trigonal planar, 4 tetrahedral, 5 bipiramida trigonal, 6 oktahedral.',
        'Ikatan rangkap dihitung sebagai satu domain, sehingga CO₂ dengan dua ikatan rangkap berbentuk linear.',
        'Pasangan bebas menempati posisi tetapi tidak disebut dalam nama bentuk, sehingga jumlah domain yang sama dapat menghasilkan beberapa bentuk molekul.',
        'Pasangan bebas menolak lebih kuat daripada pasangan ikatan, sehingga mengambil posisi paling lega dan menekan sudut ikatan yang tersisa.',
      ],
    },
    vocabulary: {
      en: [
        ['VSEPR', 'Valence Shell Electron Pair Repulsion: the model that predicts molecular shape from the repulsion between electron domains.'],
        ['Electron domain', 'A region of electron density around the central atom: one bond (single, double or triple) or one lone pair.'],
        ['Steric number', 'The total number of electron domains on the central atom.'],
        ['Lone pair', 'A pair of valence electrons on the central atom that is not shared with another atom.'],
        ['Electron-domain geometry', 'The arrangement of all domains, including lone pairs (for example tetrahedral for H₂O).'],
        ['Molecular geometry', 'The arrangement of the atoms only, which is what the shape name describes (bent for H₂O).'],
        ['Axial and equatorial', 'In a trigonal bipyramid, the two positions along the axis (90° to the equator) and the three positions around the middle (120° apart).'],
        ['Bond angle', 'The angle between two bonds at the central atom, such as 104.5° in water.'],
      ],
      id: [
        ['VSEPR', 'Tolakan Pasangan Elektron Kulit Valensi: model yang meramalkan bentuk molekul dari tolakan antar-domain elektron.'],
        ['Domain elektron', 'Daerah kerapatan elektron di sekeliling atom pusat: satu ikatan (tunggal, rangkap dua, atau rangkap tiga) atau satu pasangan bebas.'],
        ['Bilangan sterik', 'Jumlah seluruh domain elektron pada atom pusat.'],
        ['Pasangan bebas', 'Sepasang elektron valensi pada atom pusat yang tidak dibagi dengan atom lain.'],
        ['Geometri domain elektron', 'Susunan semua domain, termasuk pasangan bebas (misalnya tetrahedral untuk H₂O).'],
        ['Geometri molekul', 'Susunan atom-atomnya saja, yang digambarkan oleh nama bentuk (bengkok untuk H₂O).'],
        ['Aksial dan ekuatorial', 'Pada bipiramida trigonal, dua posisi sepanjang sumbu (90° terhadap ekuator) dan tiga posisi di sekeliling tengah (berjarak 120°).'],
        ['Sudut ikatan', 'Sudut antara dua ikatan pada atom pusat, misalnya 104,5° pada air.'],
      ],
    },
    misconceptions: {
      en: [
        ['The shape depends only on how many atoms are attached.', 'CO₂ and H₂O both have three atoms, yet CO₂ is linear and H₂O is bent. The lone pairs on oxygen take up two of water\'s four domains, and they bend the molecule even though they are invisible in the formula.'],
        ['A double bond needs two domains because it has two pairs of electrons.', 'All the electrons in a multiple bond point toward the same atom, so they form one domain. That is why SO₂, with two bonded oxygens and one lone pair, is treated as three domains and is bent.'],
        ['Molecules are flat, like the drawings in textbooks.', 'Only two- and three-domain molecules are planar. Methane is a tetrahedron, and the dashed bond in the figure points toward you out of the page.'],
        ['Lone pairs do not matter for the angle because the shape is named without them.', 'They matter a great deal. A lone pair is held close to the nucleus and spreads out, so it pushes the bonds together: 109.5° in CH₄ becomes about 107° in NH₃ and about 104.5° in H₂O. The sim shows ideal angles and leaves this effect out.'],
      ],
      id: [
        ['Bentuk hanya bergantung pada jumlah atom yang terikat.', 'CO₂ dan H₂O sama-sama tiga atom, tetapi CO₂ linear dan H₂O bengkok. Pasangan bebas pada oksigen mengisi dua dari empat domain air, dan merekalah yang membengkokkan molekul walau tidak terlihat dalam rumus.'],
        ['Ikatan rangkap dua membutuhkan dua domain karena berisi dua pasang elektron.', 'Semua elektron dalam ikatan rangkap mengarah ke atom yang sama, sehingga membentuk satu domain. Itulah sebabnya SO₂, dengan dua oksigen terikat dan satu pasangan bebas, dianggap tiga domain dan berbentuk bengkok.'],
        ['Molekul itu datar, seperti gambar di buku pelajaran.', 'Hanya molekul dua dan tiga domain yang planar. Metana adalah tetrahedron, dan ikatan putus-putus pada gambar mengarah ke arahmu keluar dari halaman.'],
        ['Pasangan bebas tidak memengaruhi sudut karena bentuknya dinamai tanpa mereka.', 'Pengaruhnya besar. Pasangan bebas ditahan dekat inti dan menyebar, sehingga mendesak ikatan-ikatan merapat: 109,5° pada CH₄ menjadi sekitar 107° pada NH₃ dan sekitar 104,5° pada H₂O. Simulasi menampilkan sudut ideal dan mengabaikan efek ini.'],
      ],
    },
    realWorld: {
      en: [
        'Water is bent, so the two O–H dipoles do not cancel and water is polar; that polarity is why it dissolves salts and why ice floats on an open hydrogen-bonded lattice.',
        'Carbon dioxide is linear, so its two polar C=O bonds cancel and the molecule is non-polar; CO₂ therefore dissolves poorly in water compared with polar gases such as ammonia.',
        'Drug molecules must have the right three-dimensional shape to fit the pocket of a protein, so medicinal chemists reason about geometry before they synthesise anything.',
        'Sulfur hexafluoride\'s symmetrical octahedral shape makes it chemically inert and a dense, non-polar gas, used as an insulator in high-voltage switchgear.',
      ],
      id: [
        'Air berbentuk bengkok, sehingga kedua dipol O–H tidak saling meniadakan dan air bersifat polar; kepolaran inilah yang membuat air melarutkan garam dan membuat es terapung pada kisi ikatan hidrogen yang renggang.',
        'Karbon dioksida linear, sehingga kedua ikatan polar C=O saling meniadakan dan molekulnya nonpolar; karena itu CO₂ kurang larut dalam air dibandingkan gas polar seperti amonia.',
        'Molekul obat harus memiliki bentuk tiga dimensi yang tepat agar pas pada kantong protein, sehingga kimiawan medisinal memikirkan geometri sebelum menyintesis apa pun.',
        'Bentuk oktahedral yang simetris membuat belerang heksafluorida bersifat inert dan menjadi gas padat yang nonpolar, dipakai sebagai isolator pada perangkat sakelar tegangan tinggi.',
      ],
    },
    questions: {
      en: [
        { q: 'Sulfur has six valence electrons. In SF₄ it bonds to four fluorine atoms. How many lone pairs does it keep, what is the steric number, and what shape does the sim predict?', a: 'Four electrons are used in bonds, leaving two, which is one lone pair. Steric number = 4 + 1 = 5, so the domains form a trigonal bipyramid. The lone pair takes an equatorial position and the molecule is a seesaw (disphenoidal), as the sim shows for 4 bonds and 1 lone pair.' },
        { q: 'Why is CO₂ linear while SO₂ is bent, when both have one central atom and two oxygens?', a: 'Carbon in CO₂ has two double bonds and no lone pairs: two domains, 180° apart. Sulfur in SO₂ bonds to two oxygens and also keeps one lone pair: three domains in a trigonal planar arrangement, and with one position taken by the lone pair the atoms form a bent shape with an angle a little under 120°.' },
        { q: 'Xenon has eight valence electrons. Predict the shape of XeF₄ and explain where its lone pairs go.', a: 'Four electrons bond to four fluorines, leaving four electrons, which is two lone pairs. Six domains form an octahedron. The two lone pairs sit opposite each other (180° apart) to minimise their repulsion, so the four fluorines lie in one plane: square planar.' },
      ],
      id: [
        { q: 'Belerang memiliki enam elektron valensi. Dalam SF₄ ia berikatan dengan empat atom fluorin. Berapa pasangan bebas yang tersisa, berapa bilangan steriknya, dan bentuk apa yang diramalkan simulasi?', a: 'Empat elektron dipakai untuk ikatan, menyisakan dua, yaitu satu pasangan bebas. Bilangan sterik = 4 + 1 = 5, sehingga domainnya membentuk bipiramida trigonal. Pasangan bebas mengambil posisi ekuatorial dan molekulnya berbentuk jungkat-jungkit (seesaw), seperti ditampilkan simulasi untuk 4 ikatan dan 1 pasangan bebas.' },
        { q: 'Mengapa CO₂ linear sedangkan SO₂ bengkok, padahal keduanya memiliki satu atom pusat dan dua oksigen?', a: 'Karbon pada CO₂ memiliki dua ikatan rangkap dan tidak ada pasangan bebas: dua domain, berjarak 180°. Belerang pada SO₂ berikatan dengan dua oksigen dan juga menyimpan satu pasangan bebas: tiga domain dalam susunan trigonal planar, dan karena satu posisi ditempati pasangan bebas, atom-atomnya membentuk bentuk bengkok dengan sudut sedikit di bawah 120°.' },
        { q: 'Xenon memiliki delapan elektron valensi. Ramalkan bentuk XeF₄ dan jelaskan letak pasangan bebasnya.', a: 'Empat elektron berikatan dengan empat fluorin, menyisakan empat elektron, yaitu dua pasangan bebas. Enam domain membentuk oktahedron. Kedua pasangan bebas duduk saling berseberangan (180°) untuk meminimalkan tolakan, sehingga keempat fluorin berada pada satu bidang: bujur sangkar planar.' },
      ],
    },
  },
};
