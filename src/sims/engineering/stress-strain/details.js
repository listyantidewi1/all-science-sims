// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Identify the four stress regions: elastic, plastic, hardening, necking → fracture.',
      'Read Young\'s modulus E from the slope of the elastic region.',
      'See why brittle materials fracture without warning while ductile metals stretch first.',
    ],
    id: [
      'Mengidentifikasi empat daerah tegangan: elastik, plastik, pengerasan, leher → patah.',
      'Membaca modulus Young E dari kemiringan daerah elastik.',
      'Memahami mengapa material getas patah tanpa peringatan sedangkan logam ulet meregang dulu.',
    ],
  },  tryThis: {
    en: [
      'Steel — large yield strength, ductile. Drag past yield → permanent deformation persists when you release.',
      'Glass / ceramic — straight line, then snap. No yield warning.',
      'Polymer — long flat plastic region, low yield, big elongation.',
    ],
    id: [
      'Baja — kekuatan luluh besar, ulet. Geser melewati luluh → deformasi permanen tetap saat dilepas.',
      'Kaca / keramik — garis lurus, lalu patah. Tanpa peringatan luluh.',
      'Polimer — daerah plastik datar panjang, luluh rendah, perpanjangan besar.',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'To compare materials fairly, engineers do not talk about force and stretch but about stress and strain. Stress σ = F/A is the pulling force divided by the original cross-section of the specimen, in pascals (here megapascals, MPa). Strain ε = ΔL/L₀ is the extension divided by the original length, a pure number shown in the sim as a percentage. Because both quantities are normalised by size, a thin wire and a thick bar of the same material trace the same stress-strain curve in a tensile test.',
        'The curve has a story. At first stress and strain are proportional (Hooke\'s law, σ = E·ε); the slope E is Young\'s modulus, a measure of stiffness, and in this elastic region the specimen springs back completely when the load is removed. Past the yield strength σ_y the bonds between atoms slip permanently: this is plastic deformation, and the specimen will not return to its original length. For many metals the stress keeps rising as the metal strain-hardens, up to the ultimate tensile strength σ_u. After that a narrow neck forms, the cross-section shrinks locally, the load the specimen can carry falls, and it fractures.',
        'The sim models each material as a chain of straight segments with representative numbers: mild steel (E = 200 GPa, σ_y = 250 MPa, σ_u = 420 MPa, fracture near 20% strain), an aluminium alloy (E = 70 GPa, less ductile), glass (E = 70 GPa, which breaks at about 70 MPa and 0.1% strain with no plastic region at all) and an HDPE-like plastic (E = 0.8 GPa, yielding at 25 MPa but stretching to 100%). Drag horizontally across the chart or move the strain slider to load the specimen; the red dot walks along the curve and the drawing on the left stretches and necks. Press Release load to unload: below yield the strain returns to zero, beyond yield only the elastic part springs back and the rest stays as permanent set. Hover over the chart to read σ and ε at any point.',
        'Several simplifications are built in. Real curves are smooth, mild steel shows a flat yield plateau that the sim skips, and the numbers are order-of-magnitude values rather than data for a particular alloy. The sim plots engineering stress, which uses the original area; the true stress in the shrinking neck actually keeps rising right up to fracture. Unloading is drawn as a shortcut, removing the yield strain rather than the exact elastic recovery σ/E, so the permanent set shown is slightly larger than it would be in a lab. Temperature, loading speed and compression are not modelled.',
      ],
      id: [
        'Agar perbandingan antarmaterial adil, insinyur tidak berbicara tentang gaya dan perpanjangan, melainkan tegangan dan regangan. Tegangan σ = F/A adalah gaya tarik dibagi luas penampang awal spesimen, dalam pascal (di sini megapascal, MPa). Regangan ε = ΔL/L₀ adalah pertambahan panjang dibagi panjang awal, sebuah bilangan murni yang di simulasi ditampilkan sebagai persen. Karena keduanya dinormalkan terhadap ukuran, kawat tipis dan batang tebal dari material yang sama menghasilkan kurva tegangan-regangan yang sama dalam uji tarik.',
        'Kurva ini punya alur cerita. Mula-mula tegangan dan regangan sebanding (hukum Hooke, σ = E·ε); kemiringannya E adalah modulus Young, ukuran kekakuan, dan di daerah elastik ini spesimen kembali sepenuhnya ketika beban dilepas. Setelah melewati kekuatan luluh σ_y, ikatan antaratom tergelincir secara permanen: inilah deformasi plastik, dan spesimen tidak akan kembali ke panjang semula. Pada banyak logam tegangan terus naik karena logam mengalami pengerasan regangan, sampai mencapai kekuatan tarik maksimum σ_u. Setelah itu terbentuk leher yang sempit, penampang menyusut setempat, beban yang mampu ditahan spesimen turun, dan spesimen patah.',
        'Simulasi memodelkan tiap material sebagai rangkaian ruas garis lurus dengan angka yang representatif: baja lunak (E = 200 GPa, σ_y = 250 MPa, σ_u = 420 MPa, patah di sekitar regangan 20%), paduan aluminium (E = 70 GPa, kurang ulet), kaca (E = 70 GPa, patah pada sekitar 70 MPa dan regangan 0,1% tanpa daerah plastik sama sekali), dan plastik mirip HDPE (E = 0,8 GPa, luluh pada 25 MPa tetapi meregang sampai 100%). Seret mendatar di atas grafik atau geser slider regangan untuk membebani spesimen; titik merah berjalan sepanjang kurva dan gambar di kiri meregang lalu membentuk leher. Tekan Lepaskan beban untuk melepas: di bawah luluh regangan kembali ke nol, di atas luluh hanya bagian elastik yang kembali dan sisanya tinggal sebagai deformasi permanen. Arahkan kursor ke grafik untuk membaca σ dan ε di titik mana pun.',
        'Ada beberapa penyederhanaan. Kurva nyata mulus, baja lunak memperlihatkan dataran luluh yang dilewati simulasi, dan angkanya adalah nilai orde besaran, bukan data untuk paduan tertentu. Simulasi menggambar tegangan teknik, yang memakai luas awal; tegangan sebenarnya di leher yang menyusut justru terus naik sampai patah. Pelepasan beban digambar dengan jalan pintas, yaitu mengurangi regangan luluh, bukan pemulihan elastik yang tepat σ/E, sehingga deformasi permanen yang tampak sedikit lebih besar daripada di laboratorium. Suhu, kecepatan pembebanan, dan tekan tidak dimodelkan.',
      ],
    },
    figure: {
      caption: {
        en: 'A ductile metal: the linear elastic region (slope E) ends at the yield point; strain hardening lifts the stress to the ultimate tensile strength; necking lowers the engineering stress until fracture. Unloading (dashed) runs parallel to the elastic line and leaves a permanent set.',
        id: 'Logam ulet: daerah elastik linear (kemiringan E) berakhir di titik luluh; pengerasan regangan menaikkan tegangan sampai kekuatan tarik maksimum; pembentukan leher menurunkan tegangan teknik hingga patah. Pelepasan beban (putus-putus) sejajar garis elastik dan menyisakan deformasi permanen.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Stress-strain curve of a ductile metal', 'Kurva tegangan-regangan logam ulet')}">
  <style>text{font:12px system-ui,sans-serif;fill:currentColor}.m{fill:none;stroke:currentColor;stroke-width:1.2;opacity:.45}.c{fill:none;stroke-width:2.6;stroke-linejoin:round}.s{font-size:10px}</style>
  <line x1="40" y1="200" x2="345" y2="200" stroke="currentColor" stroke-width="1.6" marker-end="url(#a)"/>
  <line x1="40" y1="200" x2="40" y2="25" stroke="currentColor" stroke-width="1.6" marker-end="url(#a)"/>
  <text x="330" y="218" text-anchor="end">${L('strain ε', 'regangan ε')}</text>
  <text x="46" y="34">${L('stress σ', 'tegangan σ')}</text>
  <path d="M40 200 L90 110" class="c" stroke="#3b82f6"/>
  <path d="M90 110 L200 70" class="c" stroke="#10b981"/>
  <path d="M200 70 L300 95" class="c" stroke="#f59e0b"/>
  <path d="M150 88 L86 200" stroke="#8b5cf6" stroke-width="1.6" stroke-dasharray="5 4" fill="none" marker-end="url(#a)"/>
  <line x1="40" y1="110" x2="90" y2="110" class="m" stroke-dasharray="3 3"/>
  <line x1="90" y1="110" x2="90" y2="200" class="m" stroke-dasharray="3 3"/>
  <line x1="40" y1="70" x2="200" y2="70" class="m" stroke-dasharray="3 3"/>
  <circle cx="90" cy="110" r="4.5" fill="#3b82f6"/>
  <circle cx="200" cy="70" r="4.5" fill="#10b981"/>
  <path d="M294 89 L306 101 M306 89 L294 101" stroke="#ef4444" stroke-width="2.5"/>
  <text x="36" y="114" text-anchor="end" fill="#3b82f6" font-weight="bold">σ_y</text>
  <text x="36" y="74" text-anchor="end" fill="#10b981" font-weight="bold">σ_u</text>
  <text x="96" y="124" fill="#3b82f6" class="s">${L('yield point', 'titik luluh')}</text>
  <text x="200" y="60" text-anchor="middle" fill="#10b981" class="s">${L('ultimate strength (UTS)', 'kekuatan tarik maksimum')}</text>
  <text x="250" y="110" text-anchor="middle" fill="#f59e0b" class="s">${L('necking', 'leher')}</text>
  <text x="312" y="88" fill="#ef4444" class="s">${L('fracture', 'patah')}</text>
  <text x="58" y="150" fill="#3b82f6" class="s">${L('elastic', 'elastik')}</text>
  <text x="58" y="162" fill="#3b82f6" class="s">${L('slope = E', 'kemiringan = E')}</text>
  <text x="128" y="106" fill="#10b981" class="s">${L('strain hardening', 'pengerasan regangan')}</text>
  <text x="156" y="84" fill="#8b5cf6" class="s">${L('unload', 'lepas beban')}</text>
  <path d="M40 212 L86 212" stroke="#8b5cf6" stroke-width="1.4" fill="none"/>
  <path d="M40 208 L40 216 M86 208 L86 216" stroke="#8b5cf6" stroke-width="1.4"/>
  <text x="63" y="226" text-anchor="middle" fill="#8b5cf6" class="s">${L('permanent set', 'deformasi permanen')}</text>
  <text x="140" y="190" fill="#3b82f6" class="s">${L('springs back fully', 'kembali sepenuhnya')}</text>
  <text x="140" y="178" class="s">${L('← elastic | plastic →', '← elastik | plastik →')}</text>
  <defs><marker id="a" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="context-stroke"/></marker></defs>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Stress (force per original area) and strain (extension per original length) make the curve a property of the material, not of the specimen size.',
        'In the elastic region σ = E·ε; the slope E (Young\'s modulus) measures stiffness and the deformation is fully reversible.',
        'Beyond the yield strength, deformation is plastic: unloading follows a line parallel to the elastic slope and leaves a permanent set.',
        'The ultimate tensile strength is the peak of the engineering stress curve; after it the specimen necks and the load it can carry drops until fracture.',
        'Stiffness, strength and ductility are three different things: glass is as stiff as aluminium but breaks with no plastic deformation at all.',
      ],
      id: [
        'Tegangan (gaya per luas awal) dan regangan (perpanjangan per panjang awal) membuat kurva menjadi sifat material, bukan sifat ukuran spesimen.',
        'Di daerah elastik σ = E·ε; kemiringan E (modulus Young) mengukur kekakuan dan deformasinya sepenuhnya dapat kembali.',
        'Di atas kekuatan luluh deformasi bersifat plastik: pelepasan beban mengikuti garis sejajar kemiringan elastik dan menyisakan deformasi permanen.',
        'Kekuatan tarik maksimum adalah puncak kurva tegangan teknik; setelahnya spesimen membentuk leher dan beban yang mampu ditahannya turun sampai patah.',
        'Kekakuan, kekuatan, dan keuletan adalah tiga hal berbeda: kaca sekaku aluminium tetapi patah tanpa deformasi plastik sama sekali.',
      ],
    },
    vocabulary: {
      en: [
        ['Stress (σ)', 'Force divided by the original cross-sectional area, F/A, in pascals or MPa.'],
        ['Strain (ε)', 'Extension divided by original length, ΔL/L₀; dimensionless, often given as a percentage.'],
        ['Young\'s modulus (E)', 'The slope of the elastic region, σ/ε; a measure of stiffness. Steel is about 200 GPa, aluminium about 70 GPa.'],
        ['Elastic deformation', 'Deformation that disappears completely when the load is removed.'],
        ['Yield strength (σ_y)', 'The stress at which plastic (permanent) deformation begins.'],
        ['Plastic deformation', 'Permanent change of shape caused by planes of atoms sliding past each other.'],
        ['Ultimate tensile strength (σ_u)', 'The maximum engineering stress a material withstands before necking begins.'],
        ['Ductility', 'How much plastic strain a material can take before fracture; brittle materials have almost none.'],
      ],
      id: [
        ['Tegangan (σ)', 'Gaya dibagi luas penampang awal, F/A, dalam pascal atau MPa.'],
        ['Regangan (ε)', 'Perpanjangan dibagi panjang awal, ΔL/L₀; tak berdimensi, sering dinyatakan dalam persen.'],
        ['Modulus Young (E)', 'Kemiringan daerah elastik, σ/ε; ukuran kekakuan. Baja sekitar 200 GPa, aluminium sekitar 70 GPa.'],
        ['Deformasi elastik', 'Deformasi yang hilang seluruhnya ketika beban dilepas.'],
        ['Kekuatan luluh (σ_y)', 'Tegangan saat deformasi plastik (permanen) mulai terjadi.'],
        ['Deformasi plastik', 'Perubahan bentuk permanen akibat bidang-bidang atom saling bergeser.'],
        ['Kekuatan tarik maksimum (σ_u)', 'Tegangan teknik terbesar yang mampu ditahan material sebelum leher mulai terbentuk.'],
        ['Keuletan', 'Seberapa besar regangan plastik yang mampu ditahan material sebelum patah; material getas hampir tidak punya.'],
      ],
    },
    misconceptions: {
      en: [
        ['A stronger material is also a stiffer material.', 'Strength (yield or ultimate stress) and stiffness (E) are independent. In the sim the aluminium alloy yields at 280 MPa, above mild steel\'s 250 MPa, yet its E is only a third of steel\'s, so it stretches three times as much under the same stress.'],
        ['Once a part deforms plastically it is broken.', 'Plastic deformation is a permanent change of shape, not failure. Bending a paper clip, stamping a car panel and drawing wire all rely on controlled plastic deformation; fracture comes much later on the curve.'],
        ['The stress falls during necking because the material is getting weaker.', 'The engineering stress uses the original area. Inside the neck the real cross-section is shrinking, so the true stress on the remaining material keeps increasing until it fails.'],
        ['Brittle means weak.', 'Brittle means little or no plastic deformation before fracture. Glass and ceramics can carry high stress, especially in compression; the danger is that they give no warning before they snap.'],
      ],
      id: [
        ['Material yang lebih kuat pasti lebih kaku.', 'Kekuatan (tegangan luluh atau maksimum) dan kekakuan (E) tidak saling bergantung. Di simulasi, paduan aluminium luluh pada 280 MPa, di atas baja lunak yang 250 MPa, tetapi E-nya hanya sepertiga baja, sehingga ia meregang tiga kali lebih banyak pada tegangan yang sama.'],
        ['Komponen yang sudah berdeformasi plastik berarti rusak.', 'Deformasi plastik adalah perubahan bentuk permanen, bukan kegagalan. Membengkokkan penjepit kertas, mencetak panel mobil, dan menarik kawat semuanya memanfaatkan deformasi plastik yang terkendali; patah terjadi jauh kemudian pada kurva.'],
        ['Tegangan turun saat leher terbentuk karena materialnya melemah.', 'Tegangan teknik memakai luas awal. Di dalam leher penampang sebenarnya menyusut, sehingga tegangan sejati pada sisa material terus bertambah sampai gagal.'],
        ['Getas berarti lemah.', 'Getas berarti hampir tidak ada deformasi plastik sebelum patah. Kaca dan keramik mampu menahan tegangan tinggi, terutama tekan; bahayanya adalah mereka tidak memberi peringatan sebelum pecah.'],
      ],
    },
    realWorld: {
      en: [
        'Car crumple zones are designed to deform plastically in a crash, soaking up kinetic energy as the metal yields, while the passenger cell stays in its elastic range.',
        'Reinforcing bars for concrete are tensile-tested in certified labs; building codes specify minimum yield strength and minimum elongation at fracture so that a structure bends visibly before it fails.',
        'Engineers design parts to stay well below yield, dividing σ_y by a safety factor (often 1.5 to 3) to allow for overloads, flaws and fatigue.',
        'Sheet-metal stamping, wire drawing and forging deliberately push metal past yield to shape it; strain hardening then makes the finished part stronger than the raw stock.',
      ],
      id: [
        'Zona remuk mobil dirancang berdeformasi plastik saat tabrakan, menyerap energi kinetik ketika logamnya luluh, sementara kabin penumpang tetap berada di daerah elastik.',
        'Besi tulangan beton diuji tarik di laboratorium bersertifikat; peraturan bangunan menetapkan kekuatan luluh minimum dan perpanjangan minimum saat patah agar struktur melengkung terlihat dulu sebelum runtuh.',
        'Insinyur merancang komponen agar tetap jauh di bawah luluh, membagi σ_y dengan faktor keamanan (sering 1,5 sampai 3) untuk mengantisipasi beban lebih, cacat, dan kelelahan.',
        'Pencetakan pelat logam, penarikan kawat, dan penempaan dengan sengaja mendorong logam melewati luluh untuk membentuknya; pengerasan regangan lalu membuat produk jadi lebih kuat daripada bahan mentahnya.',
      ],
    },
    questions: {
      en: [
        { q: 'A mild steel rod carries a stress of 200 MPa. Using E = 200 GPa, what is its strain, and will it spring back when unloaded?', a: 'ε = σ/E = 200 MPa / 200 000 MPa = 0.001 = 0.1%. That is below the yield strain of 0.125% (250 MPa / 200 GPa), so the deformation is elastic and the rod returns to its original length.' },
        { q: 'You drag the steel specimen to 2% strain and press Release load. Roughly how much strain remains?', a: 'Only the elastic part recovers. At 2% strain the model gives about 384 MPa, so the exact recovery would be σ/E ≈ 0.19%; the sim uses the yield strain 0.15% as a shortcut. Either way about 1.8% stays as permanent plastic strain.' },
        { q: 'Why is a glass beam more dangerous than a steel beam of the same strength when overloaded?', a: 'Glass has no plastic region: its curve is a straight line to fracture at about 0.1% strain, so it breaks suddenly with no visible warning. Steel yields first and stretches by many percent, bending and sagging visibly before it fails, which gives time to notice the problem.' },
      ],
      id: [
        { q: 'Sebatang baja lunak menanggung tegangan 200 MPa. Dengan E = 200 GPa, berapa regangannya, dan apakah ia kembali ke bentuk semula saat beban dilepas?', a: 'ε = σ/E = 200 MPa / 200 000 MPa = 0,001 = 0,1%. Nilai itu di bawah regangan luluh 0,125% (250 MPa / 200 GPa), sehingga deformasinya elastik dan batang kembali ke panjang semula.' },
        { q: 'Kamu menyeret spesimen baja sampai regangan 2% lalu menekan Lepaskan beban. Kira-kira berapa regangan yang tersisa?', a: 'Hanya bagian elastik yang pulih. Pada regangan 2% model memberi sekitar 384 MPa, sehingga pemulihan tepatnya σ/E ≈ 0,19%; simulasi memakai regangan luluh 0,15% sebagai jalan pintas. Bagaimanapun, sekitar 1,8% tinggal sebagai regangan plastik permanen.' },
        { q: 'Mengapa balok kaca lebih berbahaya daripada balok baja berkekuatan sama ketika kelebihan beban?', a: 'Kaca tidak punya daerah plastik: kurvanya garis lurus sampai patah pada regangan sekitar 0,1%, sehingga pecah tiba-tiba tanpa tanda. Baja luluh dulu dan meregang beberapa persen, melengkung dan melendut terlihat sebelum gagal, sehingga ada waktu untuk menyadari masalahnya.' },
      ],
    },
  },
};
