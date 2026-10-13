// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Apply the Aufbau filling order (1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p…).',
      "See Hund's rule fill parallel before pairing.",
      "See Pauli's principle: never more than two electrons per orbital.",
    ],
    id: [
      'Menerapkan urutan pengisian Aufbau (1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p…).',
      'Melihat aturan Hund mengisi sejajar sebelum berpasangan.',
      'Melihat asas Pauli: tidak lebih dari dua elektron per orbital.',
    ],
  },
  tryThis: {
    en: [
      'Build neon (Z=10) — what is the electron configuration?',
      'Add three electrons to a 2p set — do they pair up or spread out?',
      'Build iron (Z=26) — what subshell ends up half-filled?',
    ],
    id: [
      'Bangun neon (Z=10) — apa konfigurasi elektronnya?',
      'Tambahkan tiga elektron ke 2p — apakah mereka berpasangan atau menyebar?',
      'Bangun besi (Z=26) — subkulit mana yang setengah penuh?',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'Electrons in an atom live in orbitals, regions of space where an electron is likely to be found, each with a definite energy. Orbitals come in sets called subshells: an s subshell has one orbital, p has three, d has five and f has seven, and the Pauli exclusion principle allows at most two electrons per orbital, which must have opposite spins (drawn as ↑ and ↓). The ground state of an atom is the arrangement of lowest total energy, and the Aufbau principle (German for "building up") says you find it by adding electrons one at a time into the lowest-energy orbital that still has room.',
        'In a hydrogen atom all orbitals with the same n have the same energy, but in a many-electron atom the inner electrons shield the outer ones from the nucleus, and orbitals of higher l (p, d, f) are shielded more because they spend less time close to the nucleus. The result is the familiar order 1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p, which the diagonal rule reproduces: 4s is filled before 3d even though its principal quantum number is larger. Within a subshell, Hund\'s rule applies: electrons spread out one per orbital with parallel spins before any orbital receives a second electron, because electrons in separate orbitals repel each other less.',
        'The simulation applies these three rules strictly. Drag the Z slider or press a preset and it places Z electrons: for each subshell in the diagonal order it first puts one ↑ in each box, then adds ↓ to pair them, and moves on only when the subshell is full. The configuration string above the boxes is written in filling order. Try nitrogen (2p³, three unpaired electrons in three boxes), oxygen (2p⁴, the first pair appears), neon (every box full), and iron ([Ar] 4s² 3d⁶, four unpaired d electrons, the reason iron is so strongly magnetic). Count the boxes that hold a single arrow and you have the number of unpaired electrons.',
        'The strict rule has well-known exceptions that the sim does not model. Chromium (Z = 24) is really [Ar] 4s¹ 3d⁵ and copper (Z = 29) is [Ar] 4s¹ 3d¹⁰, because a half-filled or completely filled d subshell is especially stable and the 4s and 3d energies are very close; the sim instead shows 4s² 3d⁴ and 4s² 3d⁹ for those two presets. Textbooks usually write finished configurations with 3d before 4s (grouping by n), and when a transition metal forms an ion it is the 4s electrons that leave first. The sim also stops at krypton (Z = 36), shows only neutral atoms in their ground state, and draws the boxes without an energy scale.',
      ],
      id: [
        'Elektron dalam atom menempati orbital, yaitu daerah ruang tempat elektron paling mungkin ditemukan, masing-masing dengan energi tertentu. Orbital berkelompok dalam subkulit: subkulit s memiliki satu orbital, p tiga, d lima, dan f tujuh, dan asas larangan Pauli membolehkan paling banyak dua elektron per orbital, yang harus berspin berlawanan (digambar ↑ dan ↓). Keadaan dasar suatu atom adalah susunan dengan energi total terendah, dan asas Aufbau (bahasa Jerman untuk "membangun") menyatakan susunan itu diperoleh dengan menambahkan elektron satu per satu ke orbital berenergi terendah yang masih kosong.',
        'Pada atom hidrogen semua orbital dengan n sama berenergi sama, tetapi pada atom berelektron banyak elektron-elektron dalam menghalangi (menyaring) elektron luar dari inti, dan orbital dengan l lebih besar (p, d, f) tersaring lebih kuat karena lebih jarang berada dekat inti. Hasilnya adalah urutan yang dikenal: 1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p, yang direproduksi oleh aturan diagonal: 4s terisi sebelum 3d walaupun bilangan kuantum utamanya lebih besar. Di dalam satu subkulit berlaku aturan Hund: elektron menyebar satu per orbital dengan spin sejajar sebelum ada orbital yang menerima elektron kedua, karena elektron di orbital terpisah lebih sedikit saling menolak.',
        'Simulasi menerapkan ketiga aturan ini secara ketat. Geser slider Z atau tekan preset, dan simulasi menempatkan Z elektron: untuk setiap subkulit dalam urutan diagonal, ia lebih dulu meletakkan satu ↑ di setiap kotak, lalu menambahkan ↓ untuk memasangkannya, dan baru beralih setelah subkulit itu penuh. Deretan konfigurasi di atas kotak ditulis dalam urutan pengisian. Cobalah nitrogen (2p³, tiga elektron tak berpasangan di tiga kotak), oksigen (2p⁴, pasangan pertama muncul), neon (semua kotak penuh), dan besi ([Ar] 4s² 3d⁶, empat elektron d tak berpasangan, alasan besi begitu kuat magnetnya). Hitung kotak yang hanya berisi satu panah, dan kamu mendapat jumlah elektron tak berpasangan.',
        'Aturan ketat ini memiliki pengecualian terkenal yang tidak dimodelkan simulasi. Kromium (Z = 24) sebenarnya [Ar] 4s¹ 3d⁵ dan tembaga (Z = 29) [Ar] 4s¹ 3d¹⁰, karena subkulit d yang setengah penuh atau penuh sangat stabil dan energi 4s serta 3d sangat berdekatan; simulasi justru menampilkan 4s² 3d⁴ dan 4s² 3d⁹ untuk kedua preset itu. Buku teks biasanya menulis konfigurasi akhir dengan 3d sebelum 4s (dikelompokkan menurut n), dan ketika logam transisi membentuk ion, elektron 4s-lah yang lepas lebih dulu. Simulasi juga berhenti pada kripton (Z = 36), hanya menampilkan atom netral pada keadaan dasar, dan menggambar kotak tanpa skala energi.',
      ],
    },
    figure: {
      caption: {
        en: 'Orbital energy ladder for a many-electron atom, filled for nitrogen (Z = 7). Each box is one orbital and holds at most two electrons of opposite spin (Pauli). The three 2p electrons sit in separate boxes with parallel spins (Hund). Note that 4s lies below 3d, so it fills first.',
        id: 'Tangga energi orbital untuk atom berelektron banyak, diisi untuk nitrogen (Z = 7). Setiap kotak adalah satu orbital dan menampung paling banyak dua elektron berspin berlawanan (Pauli). Ketiga elektron 2p menempati kotak terpisah dengan spin sejajar (Hund). Perhatikan 4s berada di bawah 3d, sehingga terisi lebih dulu.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Orbital energy levels and filling order', 'Tingkat energi orbital dan urutan pengisian')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.bx{fill:none;stroke:currentColor;stroke-width:1.1}.lb{font:10px ui-monospace,monospace;fill:currentColor}.u{fill:#10b981;font-size:13px}.d{fill:#ef4444;font-size:13px}</style>
  <line x1="40" y1="215" x2="40" y2="30" stroke="currentColor" stroke-width="1.2" marker-end="url(#ar)"/>
  <text x="18" y="125" transform="rotate(-90 18 125)" text-anchor="middle">${L('energy', 'energi')}</text>
  <rect x="70" y="196" width="18" height="16" class="bx"/><text x="74" y="209" class="u">↑</text><text x="80" y="209" class="d">↓</text><text x="94" y="209" class="lb">1s</text>
  <rect x="70" y="160" width="18" height="16" class="bx"/><text x="74" y="173" class="u">↑</text><text x="80" y="173" class="d">↓</text><text x="94" y="173" class="lb">2s</text>
  <rect x="150" y="146" width="18" height="16" class="bx"/><rect x="170" y="146" width="18" height="16" class="bx"/><rect x="190" y="146" width="18" height="16" class="bx"/>
  <text x="156" y="159" class="u">↑</text><text x="176" y="159" class="u">↑</text><text x="196" y="159" class="u">↑</text><text x="214" y="159" class="lb">2p</text>
  <rect x="70" y="118" width="18" height="16" class="bx"/><text x="94" y="131" class="lb">3s</text>
  <rect x="150" y="104" width="18" height="16" class="bx"/><rect x="170" y="104" width="18" height="16" class="bx"/><rect x="190" y="104" width="18" height="16" class="bx"/><text x="214" y="117" class="lb">3p</text>
  <rect x="70" y="76" width="18" height="16" class="bx"/><text x="94" y="89" class="lb">4s</text>
  <rect x="250" y="62" width="18" height="16" class="bx"/><rect x="270" y="62" width="18" height="16" class="bx"/><rect x="290" y="62" width="18" height="16" class="bx"/><rect x="310" y="62" width="18" height="16" class="bx"/><rect x="330" y="62" width="18" height="16" class="bx"/>
  <text x="300" y="56" class="lb" text-anchor="middle">3d</text>
  <rect x="150" y="40" width="18" height="16" class="bx"/><rect x="170" y="40" width="18" height="16" class="bx"/><rect x="190" y="40" width="18" height="16" class="bx"/><text x="214" y="53" class="lb">4p</text>
  <path d="M90 84 L248 70" stroke="#f59e0b" stroke-width="1.2" stroke-dasharray="3 3" fill="none"/>
  <text x="110" y="66" fill="#f59e0b">${L('4s fills before 3d', '4s terisi sebelum 3d')}</text>
  <text x="240" y="130" fill="#10b981">${L('Hund: one per box,', 'Hund: satu per kotak,')}</text>
  <text x="240" y="143" fill="#10b981">${L('parallel spins first', 'spin sejajar dulu')}</text>
  <text x="240" y="175" fill="#ef4444">${L('Pauli: max 2 per box,', 'Pauli: maks. 2 per kotak,')}</text>
  <text x="240" y="188" fill="#ef4444">${L('opposite spins', 'spin berlawanan')}</text>
  <text x="240" y="212" style="font-weight:bold">N: 1s² 2s² 2p³</text>
  <text x="195" y="232" text-anchor="middle" opacity=".75">${L('s: 1 orbital · p: 3 · d: 5', 's: 1 orbital · p: 3 · d: 5')}</text>
  <defs><marker id="ar" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="context-stroke"/></marker></defs>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Electrons fill orbitals from lowest to highest energy: 1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p (Aufbau principle).',
        'Each orbital holds at most two electrons, and they must have opposite spins (Pauli exclusion principle).',
        'Within a subshell electrons occupy separate orbitals with parallel spins before pairing (Hund\'s rule).',
        'In many-electron atoms 4s is lower in energy than 3d, so potassium and calcium fill 4s before the transition metals fill 3d.',
        'The number of unpaired electrons, read from the boxes with a single arrow, controls an atom\'s magnetic behaviour.',
      ],
      id: [
        'Elektron mengisi orbital dari energi terendah ke tertinggi: 1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p (asas Aufbau).',
        'Setiap orbital menampung paling banyak dua elektron, dan keduanya harus berspin berlawanan (asas larangan Pauli).',
        'Di dalam satu subkulit, elektron menempati orbital terpisah dengan spin sejajar sebelum berpasangan (aturan Hund).',
        'Pada atom berelektron banyak, 4s berenergi lebih rendah daripada 3d, sehingga kalium dan kalsium mengisi 4s sebelum logam transisi mengisi 3d.',
        'Jumlah elektron tak berpasangan, dibaca dari kotak dengan satu panah, menentukan perilaku magnetik atom.',
      ],
    },
    vocabulary: {
      en: [
        ['Orbital', 'A region around the nucleus where an electron is likely to be found; it can hold up to two electrons.'],
        ['Subshell', 'A group of orbitals with the same n and l: s (1 orbital), p (3), d (5), f (7).'],
        ['Aufbau principle', 'The ground state is built by placing electrons in the lowest-energy orbitals available.'],
        ['Pauli exclusion principle', 'No two electrons in an atom can have the same set of quantum numbers, so an orbital holds at most two electrons with opposite spins.'],
        ['Hund\'s rule', 'For orbitals of equal energy, electrons occupy them singly with parallel spins before any is doubly occupied.'],
        ['Spin', 'An intrinsic property of the electron with two possible values, drawn as ↑ and ↓.'],
        ['Unpaired electron', 'An electron alone in its orbital; atoms with unpaired electrons are paramagnetic.'],
        ['Noble-gas shorthand', 'Writing the filled inner configuration as the preceding noble gas in brackets, for example [Ar] 4s² 3d⁶ for iron.'],
      ],
      id: [
        ['Orbital', 'Daerah di sekitar inti tempat elektron paling mungkin ditemukan; dapat menampung sampai dua elektron.'],
        ['Subkulit', 'Kelompok orbital dengan n dan l yang sama: s (1 orbital), p (3), d (5), f (7).'],
        ['Asas Aufbau', 'Keadaan dasar dibangun dengan menempatkan elektron di orbital berenergi terendah yang tersedia.'],
        ['Asas larangan Pauli', 'Tidak ada dua elektron dalam satu atom yang memiliki himpunan bilangan kuantum yang sama, sehingga satu orbital menampung paling banyak dua elektron berspin berlawanan.'],
        ['Aturan Hund', 'Untuk orbital berenergi sama, elektron menempatinya satu-satu dengan spin sejajar sebelum ada yang terisi dua.'],
        ['Spin', 'Sifat intrinsik elektron dengan dua nilai yang mungkin, digambar ↑ dan ↓.'],
        ['Elektron tak berpasangan', 'Elektron yang sendirian di orbitalnya; atom dengan elektron tak berpasangan bersifat paramagnetik.'],
        ['Singkatan gas mulia', 'Menulis konfigurasi bagian dalam yang penuh sebagai gas mulia sebelumnya dalam kurung siku, misalnya [Ar] 4s² 3d⁶ untuk besi.'],
      ],
    },
    misconceptions: {
      en: [
        ['3d must fill before 4s because 3 is smaller than 4.', 'Filling follows energy, not n alone. Shielding raises the 3d energy above 4s in neutral atoms, so potassium is [Ar] 4s¹, not [Ar] 3d¹. The sim shows 4s filling at Z = 19 and 20 before 3d starts at Z = 21.'],
        ['Electrons pair up as soon as a second one arrives in a subshell.', 'They spread out first. Nitrogen has three unpaired 2p electrons in three separate orbitals; pairing starts only with oxygen, the fourth 2p electron. Electrons in separate orbitals repel each other less.'],
        ['An orbital is a path the electron travels along.', 'An orbital is a probability distribution, a fuzzy region where the electron is likely to be found. The boxes in the sim stand for these regions and say nothing about motion.'],
        ['The diagonal rule gives the correct ground state for every element.', 'It is a very good guide but has exceptions. Chromium and copper each move one 4s electron into 3d to obtain a half-filled or filled d subshell, and the sim does not reproduce this.'],
      ],
      id: [
        ['3d harus terisi sebelum 4s karena 3 lebih kecil dari 4.', 'Pengisian mengikuti energi, bukan n saja. Penyaringan menaikkan energi 3d di atas 4s pada atom netral, sehingga kalium adalah [Ar] 4s¹, bukan [Ar] 3d¹. Simulasi menunjukkan 4s terisi pada Z = 19 dan 20 sebelum 3d mulai pada Z = 21.'],
        ['Elektron langsung berpasangan begitu elektron kedua tiba di suatu subkulit.', 'Elektron menyebar dulu. Nitrogen memiliki tiga elektron 2p tak berpasangan di tiga orbital terpisah; pemasangan baru mulai pada oksigen, elektron 2p keempat. Elektron di orbital terpisah lebih sedikit saling menolak.'],
        ['Orbital adalah lintasan yang dilalui elektron.', 'Orbital adalah distribusi kebolehjadian, daerah kabur tempat elektron paling mungkin ditemukan. Kotak-kotak di simulasi mewakili daerah ini dan tidak menyatakan apa pun tentang gerak.'],
        ['Aturan diagonal memberi keadaan dasar yang benar untuk setiap unsur.', 'Aturan ini panduan yang sangat baik tetapi punya pengecualian. Kromium dan tembaga masing-masing memindahkan satu elektron 4s ke 3d untuk memperoleh subkulit d setengah penuh atau penuh, dan simulasi tidak mereproduksinya.'],
      ],
    },
    realWorld: {
      en: [
        'Iron, cobalt and nickel are the familiar magnetic metals because their atoms carry several unpaired 3d electrons whose spins can line up.',
        'The blocks of the periodic table (s, p, d, f) are a map of the filling order: each row of the d block corresponds to one d subshell being filled.',
        'Transition-metal compounds are coloured (blue copper sulfate, purple permanganate) because their partly filled d subshells absorb visible light.',
        'The alkali metals are so reactive because each has a single s electron outside a noble-gas core, which is easily lost to give a +1 ion.',
      ],
      id: [
        'Besi, kobalt, dan nikel adalah logam magnetik yang kita kenal karena atomnya membawa beberapa elektron 3d tak berpasangan yang spinnya dapat tersusun searah.',
        'Blok-blok tabel periodik (s, p, d, f) adalah peta urutan pengisian: setiap baris blok d bersesuaian dengan satu subkulit d yang sedang diisi.',
        'Senyawa logam transisi berwarna (tembaga sulfat biru, permanganat ungu) karena subkulit d yang terisi sebagian menyerap cahaya tampak.',
        'Logam alkali sangat reaktif karena masing-masing memiliki satu elektron s di luar inti gas mulia, yang mudah lepas menghasilkan ion +1.',
      ],
    },
    questions: {
      en: [
        { q: 'Write the ground-state electron configuration of phosphorus (Z = 15) and state how many unpaired electrons it has.', a: '1s² 2s² 2p⁶ 3s² 3p³, or [Ne] 3s² 3p³. By Hund\'s rule the three 3p electrons occupy three separate orbitals with parallel spins, so phosphorus has three unpaired electrons.' },
        { q: 'Build iron (Z = 26) in the sim. How many unpaired electrons does it have, and which rule decides that number?', a: '[Ar] 4s² 3d⁶. The five 3d boxes first receive one ↑ each (Hund\'s rule), then the sixth electron pairs in the first box, leaving four boxes with a single arrow: four unpaired electrons.' },
        { q: 'Press the Cu preset (Z = 29). What configuration does the sim show, what is the real ground state, and why do they differ?', a: 'The sim shows [Ar] 4s² 3d⁹ by applying the diagonal rule strictly. The real configuration is [Ar] 4s¹ 3d¹⁰: the 4s and 3d energies are so close that completing the d subshell lowers the total energy more than keeping 4s full. Chromium (4s¹ 3d⁵) is the other common exception in this range.' },
      ],
      id: [
        { q: 'Tulis konfigurasi elektron keadaan dasar fosfor (Z = 15) dan sebutkan jumlah elektron tak berpasangannya.', a: '1s² 2s² 2p⁶ 3s² 3p³, atau [Ne] 3s² 3p³. Menurut aturan Hund, ketiga elektron 3p menempati tiga orbital terpisah dengan spin sejajar, sehingga fosfor memiliki tiga elektron tak berpasangan.' },
        { q: 'Bangun besi (Z = 26) di simulasi. Berapa elektron tak berpasangannya, dan aturan mana yang menentukan jumlah itu?', a: '[Ar] 4s² 3d⁶. Kelima kotak 3d lebih dulu menerima satu ↑ masing-masing (aturan Hund), lalu elektron keenam berpasangan di kotak pertama, menyisakan empat kotak dengan satu panah: empat elektron tak berpasangan.' },
        { q: 'Tekan preset Cu (Z = 29). Konfigurasi apa yang ditampilkan simulasi, apa keadaan dasar sebenarnya, dan mengapa berbeda?', a: 'Simulasi menampilkan [Ar] 4s² 3d⁹ karena menerapkan aturan diagonal secara ketat. Konfigurasi sebenarnya [Ar] 4s¹ 3d¹⁰: energi 4s dan 3d begitu dekat sehingga melengkapi subkulit d menurunkan energi total lebih besar daripada mempertahankan 4s penuh. Kromium (4s¹ 3d⁵) adalah pengecualian umum lainnya dalam rentang ini.' },
      ],
    },
  },
};
