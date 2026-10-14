// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'See selection pressure: antibiotic kills susceptibles, leaving resistants.',
      'Understand why incomplete treatment courses accelerate resistance.',
      'Connect mutation rate × population × selection to evolutionary timescales.',
    ],
    id: [
      'Melihat tekanan seleksi: antibiotik membunuh yang rentan, meninggalkan yang resisten.',
      'Memahami mengapa pengobatan tak tuntas mempercepat resistensi.',
      'Menghubungkan laju mutasi × populasi × seleksi dengan skala waktu evolusi.',
    ],
  },  tryThis: {
    en: [
      'No antibiotic — small resistant fraction stays small (mutation/drift balance).',
      'Apply antibiotic — susceptibles crash, resistants explode.',
      'Pulsed treatment — resistance evolves faster.',
    ],
    id: [
      'Tanpa antibiotik — fraksi resisten kecil tetap kecil (keseimbangan mutasi/drift).',
      'Berikan antibiotik — yang rentan runtuh, yang resisten meledak.',
      'Pengobatan pulsa — resistensi berevolusi lebih cepat.',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'Bacteria divide every 20 minutes or so, and every division copies the whole genome. Copying is not perfect: roughly one cell in a million to one in a billion carries a new mutation in any given gene. Most mutations do nothing useful, but a rare one changes the protein an antibiotic attacks, or builds a pump that throws the drug out of the cell. That cell is resistant. The key point is that the mutation happens by chance, before the antibiotic arrives. The antibiotic does not create resistance; it reveals and selects it.',
        'The simulation tracks two numbers: S, the susceptible bacteria, and R, the resistant ones. Both grow logistically in one dish with a carrying capacity K = 4000, so growth = r × N × (1 − (S + R) ÷ K) slows to zero as the dish fills. Each time a susceptible cell divides there is a small chance, set by the mutation-rate slider, that the daughter is resistant. Resistant cells pay a price for their extra machinery: they grow at a fraction of the normal rate (the fitness slider, 0.95 by default). The antibiotic toggle kills susceptible cells at the chosen kill rate per second and leaves resistant cells untouched.',
        'With the antibiotic off, new resistant mutants appear all the time but grow 5% more slowly than their neighbours, so the resistant fraction settles at a mutation–selection balance of roughly mutation rate ÷ fitness cost, about 0.0001 ÷ 0.05 = 0.2%. Switch the antibiotic on and the susceptible curve collapses within seconds. That empties the dish, the growth term 1 − N ÷ K jumps back towards 1, and the few resistant cells, no longer crowded out, double again and again until they fill the dish. Switch the antibiotic off and the susceptibles regrow, but the resistant cells do not die; they only compete. Every pulse of treatment therefore ratchets the resistant fraction higher than it was before.',
        'The model is deliberately simple. It uses smooth, continuous numbers, so a population can be 0.2 of a cell and can never go extinct by bad luck, which real small populations often do. There is no back-mutation to susceptibility, no sharing of resistance genes on plasmids between cells, no immune system helping to clear the infection, no drug concentration rising and falling between doses, and no fresh susceptible bacteria arriving from outside. Seconds in the sim stand for days of real infection. Treat it as a picture of selection at work, not a prediction for any particular patient.',
      ],
      id: [
        'Bakteri membelah sekitar setiap 20 menit, dan setiap pembelahan menyalin seluruh genomnya. Penyalinan ini tidak sempurna: kira-kira satu sel dari sejuta sampai satu dari semiliar membawa mutasi baru pada gen tertentu. Kebanyakan mutasi tidak berguna, tetapi ada yang mengubah protein sasaran antibiotik atau membuat pompa yang membuang obat keluar sel. Sel itu menjadi resisten. Intinya, mutasi terjadi secara kebetulan, sebelum antibiotik datang. Antibiotik tidak menciptakan resistensi; antibiotik hanya menyingkapkan dan menyeleksinya.',
        'Simulasi ini melacak dua angka: S, bakteri rentan, dan R, bakteri resisten. Keduanya tumbuh secara logistik dalam satu cawan dengan daya dukung K = 4000, sehingga pertumbuhan = r × N × (1 − (S + R) ÷ K) melambat ke nol saat cawan penuh. Setiap kali sel rentan membelah, ada peluang kecil, diatur oleh slider laju mutasi, bahwa sel anaknya resisten. Sel resisten membayar harga untuk perlengkapan tambahannya: mereka tumbuh pada sebagian laju normal (slider kebugaran, bawaan 0,95). Sakelar antibiotik membunuh sel rentan dengan laju bunuh yang dipilih per sekon dan tidak menyentuh sel resisten.',
        'Saat antibiotik mati, mutan resisten baru muncul terus-menerus tetapi tumbuh 5% lebih lambat daripada tetangganya, sehingga fraksi resisten menetap pada keseimbangan mutasi–seleksi sekitar laju mutasi ÷ biaya kebugaran, yakni 0,0001 ÷ 0,05 = 0,2%. Nyalakan antibiotik dan kurva sel rentan runtuh dalam hitungan detik. Cawan menjadi kosong, suku pertumbuhan 1 − N ÷ K melonjak kembali mendekati 1, dan sedikit sel resisten yang tidak lagi terdesak membelah berulang kali sampai memenuhi cawan. Matikan antibiotik dan sel rentan tumbuh lagi, tetapi sel resisten tidak mati; mereka hanya bersaing. Karena itu setiap pulsa pengobatan mendorong fraksi resisten lebih tinggi daripada sebelumnya.',
        'Modelnya sengaja dibuat sederhana. Ia memakai bilangan kontinu yang mulus, sehingga populasi bisa bernilai 0,2 sel dan tidak pernah punah karena nasib buruk, padahal populasi kecil sungguhan sering punah. Tidak ada mutasi balik menjadi rentan, tidak ada pertukaran gen resistensi lewat plasmid antar sel, tidak ada sistem imun yang membantu membersihkan infeksi, tidak ada konsentrasi obat yang naik-turun antar dosis, dan tidak ada bakteri rentan baru yang datang dari luar. Detik di simulasi mewakili hari-hari infeksi sungguhan. Anggap ini sebagai gambaran kerja seleksi, bukan ramalan untuk pasien tertentu.',
      ],
    },
    figure: {
      caption: {
        en: 'Selection in three steps: a rare resistant mutant (red) already exists; the antibiotic kills the susceptible cells (blue) but not the mutant; with the competition gone, the mutant\'s descendants fill the dish.',
        id: 'Seleksi dalam tiga langkah: mutan resisten yang jarang (merah) sudah ada; antibiotik membunuh sel rentan (biru) tetapi tidak membunuh mutan; tanpa pesaing, keturunan mutan memenuhi cawan.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Antibiotic selection for resistance', 'Seleksi resistensi oleh antibiotik')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.d{fill:none;stroke:currentColor;stroke-width:1.4;opacity:.6}.s{fill:#3b82f6}.r{fill:#ef4444}.x{fill:#3b82f6;opacity:.2}.a{stroke:currentColor;stroke-width:2;fill:none}</style>
  <circle cx="62" cy="95" r="44" class="d"/>
  <circle cx="180" cy="95" r="44" class="d"/>
  <circle cx="298" cy="95" r="44" class="d"/>
  <circle cx="180" cy="95" r="44" fill="#8b5cf6" opacity=".18"/>
  <g class="s"><circle cx="45" cy="80" r="4"/><circle cx="62" cy="70" r="4"/><circle cx="80" cy="82" r="4"/><circle cx="40" cy="100" r="4"/><circle cx="58" cy="95" r="4"/><circle cx="76" cy="100" r="4"/><circle cx="48" cy="118" r="4"/><circle cx="66" cy="112" r="4"/><circle cx="84" cy="118" r="4"/><circle cx="62" cy="128" r="4"/></g>
  <circle cx="70" cy="86" r="4" class="r"/>
  <g class="x"><circle cx="163" cy="80" r="4"/><circle cx="180" cy="70" r="4"/><circle cx="198" cy="82" r="4"/><circle cx="158" cy="100" r="4"/><circle cx="176" cy="95" r="4"/><circle cx="194" cy="100" r="4"/><circle cx="166" cy="118" r="4"/><circle cx="184" cy="112" r="4"/><circle cx="202" cy="118" r="4"/><circle cx="180" cy="128" r="4"/></g>
  <circle cx="188" cy="86" r="4" class="r"/>
  <g class="r"><circle cx="281" cy="80" r="4"/><circle cx="298" cy="70" r="4"/><circle cx="316" cy="82" r="4"/><circle cx="276" cy="100" r="4"/><circle cx="294" cy="95" r="4"/><circle cx="312" cy="100" r="4"/><circle cx="284" cy="118" r="4"/><circle cx="302" cy="112" r="4"/><circle cx="320" cy="118" r="4"/><circle cx="298" cy="128" r="4"/><circle cx="306" cy="86" r="4"/><circle cx="288" cy="64" r="4"/></g>
  <line x1="110" y1="95" x2="132" y2="95" class="a" marker-end="url(#ar)"/>
  <line x1="228" y1="95" x2="250" y2="95" class="a" marker-end="url(#ar)"/>
  <text x="62" y="156" text-anchor="middle">${L('1. before treatment', '1. sebelum pengobatan')}</text>
  <text x="62" y="170" text-anchor="middle" font-size="10">${L('1 mutant in thousands', '1 mutan di antara ribuan')}</text>
  <text x="180" y="156" text-anchor="middle">${L('2. antibiotic on', '2. antibiotik aktif')}</text>
  <text x="180" y="170" text-anchor="middle" font-size="10">${L('susceptibles die', 'yang rentan mati')}</text>
  <text x="298" y="156" text-anchor="middle">${L('3. days later', '3. beberapa hari kemudian')}</text>
  <text x="298" y="170" text-anchor="middle" font-size="10">${L('resistant fill the space', 'yang resisten mengisi ruang')}</text>
  <circle cx="30" cy="205" r="4" class="s"/><text x="40" y="209">${L('susceptible (S)', 'rentan (S)')}</text>
  <circle cx="150" cy="205" r="4" class="r"/><text x="160" y="209">${L('resistant (R)', 'resisten (R)')}</text>
  <rect x="250" y="199" width="12" height="12" fill="#8b5cf6" opacity=".4"/><text x="268" y="209">${L('antibiotic', 'antibiotik')}</text>
  <text x="180" y="230" text-anchor="middle" font-size="10">${L('growth = r × N × (1 − N ÷ K); only S are killed', 'pertumbuhan = r × N × (1 − N ÷ K); hanya S yang dibunuh')}</text>
  <defs><marker id="ar" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="context-stroke"/></marker></defs>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Antibiotics do not create resistance; random mutations create it and the antibiotic selects for it by killing everything else.',
        'Without the drug, the resistant fraction sits at a mutation–selection balance of about mutation rate ÷ fitness cost, which is tiny but never zero.',
        'Killing the susceptible cells removes competition, so resistant cells grow into the empty carrying capacity.',
        'Resistant cells usually grow a little more slowly, which is the only force that keeps them rare once the antibiotic is gone.',
        'A huge population times a small mutation rate makes a resistant mutant almost certain to exist somewhere in the infection.',
      ],
      id: [
        'Antibiotik tidak menciptakan resistensi; mutasi acak yang menciptakannya, dan antibiotik menyeleksinya dengan membunuh sel lainnya.',
        'Tanpa obat, fraksi resisten menetap pada keseimbangan mutasi–seleksi sekitar laju mutasi ÷ biaya kebugaran, sangat kecil tetapi tidak pernah nol.',
        'Membunuh sel rentan menghilangkan pesaing, sehingga sel resisten tumbuh mengisi daya dukung yang kosong.',
        'Sel resisten biasanya tumbuh sedikit lebih lambat, dan itulah satu-satunya gaya yang menjaganya tetap jarang setelah antibiotik hilang.',
        'Populasi yang sangat besar dikali laju mutasi yang kecil membuat mutan resisten hampir pasti ada di suatu tempat dalam infeksi.',
      ],
    },
    vocabulary: {
      en: [
        ['Mutation', 'A random change in DNA made during copying; in the sim, a fixed chance per susceptible division of producing a resistant daughter cell.'],
        ['Susceptible (S)', 'A bacterium the antibiotic can kill.'],
        ['Resistant (R)', 'A bacterium with a change that stops the antibiotic from working on it.'],
        ['Selection pressure', 'Any factor that lets some variants survive and reproduce better than others; here, the antibiotic.'],
        ['Fitness cost', 'The slower growth of resistant cells caused by maintaining their resistance machinery; the fitness slider sets it.'],
        ['Carrying capacity (K)', 'The largest population the dish can support; growth stops as S + R approaches K.'],
        ['Logistic growth', 'Growth that is fast when the population is small and slows to zero as it reaches the carrying capacity.'],
        ['Mutation–selection balance', 'The steady low level of a costly mutant kept up by new mutations and kept down by its slower growth.'],
      ],
      id: [
        ['Mutasi', 'Perubahan acak pada DNA yang terjadi saat penyalinan; di simulasi, peluang tetap per pembelahan sel rentan untuk menghasilkan sel anak resisten.'],
        ['Rentan (S)', 'Bakteri yang bisa dibunuh antibiotik.'],
        ['Resisten (R)', 'Bakteri dengan perubahan yang membuat antibiotik tidak lagi bekerja padanya.'],
        ['Tekanan seleksi', 'Faktor apa pun yang membuat sebagian varian bertahan dan berkembang biak lebih baik daripada yang lain; di sini, antibiotik.'],
        ['Biaya kebugaran', 'Pertumbuhan sel resisten yang lebih lambat karena harus memelihara perlengkapan resistensinya; diatur oleh slider kebugaran.'],
        ['Daya dukung (K)', 'Populasi terbesar yang bisa ditampung cawan; pertumbuhan berhenti saat S + R mendekati K.'],
        ['Pertumbuhan logistik', 'Pertumbuhan yang cepat saat populasi kecil dan melambat ke nol saat mendekati daya dukung.'],
        ['Keseimbangan mutasi–seleksi', 'Tingkat rendah yang stabil dari suatu mutan berbiaya, dijaga naik oleh mutasi baru dan dijaga turun oleh pertumbuhannya yang lebih lambat.'],
      ],
    },
    misconceptions: {
      en: [
        ['Bacteria become resistant because they get used to the antibiotic.', 'An individual bacterium does not learn or toughen up. Resistance is a chance mutation in one cell; the population changes because that cell\'s descendants survive while the others die.'],
        ['The antibiotic causes the resistance mutations.', 'Mutations happen during DNA copying whether or not the drug is present. The antibiotic only changes which cells survive. In the sim the mutation rate is the same with the toggle on or off.'],
        ['People become resistant to antibiotics.', 'Bacteria become resistant, not people. A person carrying resistant bacteria can pass them to others, which is why resistance is a public-health problem, not a personal one.'],
        ['A stronger drug or a higher dose always fixes the problem.', 'In the sim, a higher kill rate removes the susceptibles faster but does nothing to the resistant cells, so they take over sooner. Dose matters in real medicine, but no dose of this drug touches a fully resistant strain.'],
      ],
      id: [
        ['Bakteri menjadi resisten karena terbiasa dengan antibiotik.', 'Satu bakteri tidak belajar atau menjadi kebal. Resistensi adalah mutasi kebetulan pada satu sel; populasinya berubah karena keturunan sel itu bertahan sementara yang lain mati.'],
        ['Antibiotik yang menyebabkan mutasi resistensi.', 'Mutasi terjadi saat penyalinan DNA, ada atau tidak ada obat. Antibiotik hanya mengubah sel mana yang bertahan. Di simulasi, laju mutasi sama baik sakelar menyala maupun mati.'],
        ['Orang menjadi resisten terhadap antibiotik.', 'Yang resisten adalah bakterinya, bukan orangnya. Orang yang membawa bakteri resisten bisa menularkannya ke orang lain, karena itu resistensi adalah masalah kesehatan masyarakat, bukan masalah pribadi.'],
        ['Obat yang lebih kuat atau dosis lebih tinggi selalu menyelesaikan masalah.', 'Di simulasi, laju bunuh lebih tinggi menyingkirkan sel rentan lebih cepat tetapi tidak berpengaruh pada sel resisten, sehingga mereka justru lebih cepat mengambil alih. Dosis memang penting di dunia medis, tetapi tidak ada dosis obat ini yang menyentuh strain yang sepenuhnya resisten.'],
      ],
    },
    realWorld: {
      en: [
        'MRSA (methicillin-resistant Staphylococcus aureus) spread through hospitals within a few years of methicillin\'s introduction in 1959, exactly the selection sequence shown in the figure.',
        'Tuberculosis is treated with several antibiotics at once for six months or more, because a bacterium would need separate rare mutations to resist all of them at the same time.',
        'Antibiotics given routinely to farm animals create a constant selection pressure, and resistant strains have been traced from livestock into people.',
        'Antibiotics have no effect on viruses, so taking them for a cold or flu adds selection pressure on your gut bacteria for no benefit at all.',
      ],
      id: [
        'MRSA (Staphylococcus aureus resisten metisilin) menyebar di rumah sakit hanya beberapa tahun setelah metisilin diperkenalkan pada 1959, persis urutan seleksi yang ditunjukkan gambar.',
        'Tuberkulosis diobati dengan beberapa antibiotik sekaligus selama enam bulan atau lebih, karena satu bakteri perlu beberapa mutasi langka yang terpisah untuk melawan semuanya pada saat yang sama.',
        'Antibiotik yang rutin diberikan pada hewan ternak menciptakan tekanan seleksi terus-menerus, dan strain resisten telah terlacak berpindah dari ternak ke manusia.',
        'Antibiotik tidak berpengaruh pada virus, sehingga meminumnya untuk pilek atau flu hanya menambah tekanan seleksi pada bakteri usus tanpa manfaat apa pun.',
      ],
    },
    questions: {
      en: [
        { q: 'With the default settings and no antibiotic, the resistant fraction hovers near 0.2% and never reaches zero or climbs. Why?', a: 'New resistant mutants appear with every round of susceptible divisions (mutation rate 1 × 10^-4), but they grow 5% more slowly, so they are constantly out-competed. The two effects balance at roughly mutation rate ÷ cost = 0.0001 ÷ 0.05 = 0.002, or 0.2%.' },
        { q: 'Set resistant fitness to 1.00 and leave the antibiotic off. What should happen over a long run, and what would that mean after one course of treatment?', a: 'With no fitness cost nothing pushes the resistant fraction down, so it creeps upward as mutation keeps feeding it in one direction only. After a course of antibiotic drives R to the top, the susceptibles would never regain ground, because R now grows just as fast as S.' },
        { q: 'Turn the antibiotic on for about ten seconds, then off, and let the dish refill. Why does the resistant fraction not return to where it started?', a: 'The treatment killed susceptibles but left every resistant cell alive, and while the dish was empty those cells multiplied. When the drug stops, susceptibles regrow and compete, but the resistant cells are not removed, only slowed slightly by their 5% cost. The dish is shared, so the resistant fraction stays far higher, and each new pulse ratchets it higher still.' },
      ],
      id: [
        { q: 'Dengan pengaturan bawaan dan tanpa antibiotik, fraksi resisten bertahan di sekitar 0,2% dan tidak pernah mencapai nol atau naik. Mengapa?', a: 'Mutan resisten baru muncul pada setiap putaran pembelahan sel rentan (laju mutasi 1 × 10^-4), tetapi mereka tumbuh 5% lebih lambat sehingga terus kalah bersaing. Kedua efek ini seimbang pada kira-kira laju mutasi ÷ biaya = 0,0001 ÷ 0,05 = 0,002, atau 0,2%.' },
        { q: 'Atur kebugaran resisten ke 1,00 dan biarkan antibiotik mati. Apa yang seharusnya terjadi dalam jangka panjang, dan apa artinya setelah satu kali pengobatan?', a: 'Tanpa biaya kebugaran, tidak ada yang menekan fraksi resisten ke bawah, sehingga ia merayap naik karena mutasi terus menambahnya hanya ke satu arah. Setelah antibiotik mendorong R ke puncak, sel rentan tidak akan pernah merebut kembali tempatnya, karena R kini tumbuh sama cepatnya dengan S.' },
        { q: 'Nyalakan antibiotik sekitar sepuluh detik, lalu matikan, dan biarkan cawan terisi lagi. Mengapa fraksi resisten tidak kembali ke nilai awalnya?', a: 'Pengobatan membunuh sel rentan tetapi membiarkan semua sel resisten hidup, dan selama cawan kosong sel-sel itu berlipat ganda. Saat obat berhenti, sel rentan tumbuh lagi dan bersaing, tetapi sel resisten tidak disingkirkan, hanya diperlambat sedikit oleh biaya 5%-nya. Cawan dipakai bersama, sehingga fraksi resisten tetap jauh lebih tinggi, dan setiap pulsa baru mendorongnya makin tinggi.' },
      ],
    },
  },
};
