// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Apply the 2n² rule for shell capacity.',
      'Identify valence electrons from the outermost shell.',
      'Recognize stable noble-gas configurations.',
    ],
    id: [
      'Menerapkan aturan 2n² untuk kapasitas kulit.',
      'Mengenali elektron valensi dari kulit terluar.',
      'Mengenali konfigurasi gas mulia yang stabil.',
    ],
  },
  tryThis: {
    en: [
      'Compare Na (Z=11) and Cl (Z=17) — count valence electrons.',
      'Watch what happens at the noble gases (2, 10, 18, 36).',
      'Click an electron to highlight its shell.',
    ],
    id: [
      'Bandingkan Na (Z=11) dan Cl (Z=17) — hitung elektron valensi.',
      'Amati perubahan saat mencapai gas mulia (2, 10, 18, 36).',
      'Klik sebuah elektron untuk menyorot kulitnya.',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'An atom has a tiny, heavy nucleus made of protons and neutrons, surrounded by much lighter electrons. The number of protons is the atomic number Z, and a neutral atom has the same number of electrons. In 1913 Niels Bohr proposed that electrons cannot sit just anywhere: they occupy a set of allowed shells, each with its own fixed energy, with the innermost shell lowest in energy. An electron can jump between shells only by absorbing or giving out a packet of light of exactly the right energy, which explained why glowing hydrogen gas shines in a few sharp colours instead of a rainbow.',
        'The simulation fills the shells from the inside out as you raise Z, using the pattern taught in school chemistry: 2 electrons in the first shell, 8 in the second, then 8 in the third, then up to 18 in the fourth. The rule 2n² gives the greatest number of electrons a shell can ever hold (2, 8, 18, 32), but atoms do not fill shells to that maximum in order: once the third shell has 8 electrons, the next electron goes into the fourth shell, which is why potassium and calcium have 1 and 2 outer electrons. The electrons in the outermost shell are the valence electrons, shown in yellow, and they decide how the atom behaves chemically.',
        'Dragging the Z slider adds one proton to the nucleus and one electron to the outer shell at a time. Watch the valence count: it climbs 1, 2, 3 … 8, then a new shell opens and it starts again at 1. That repeating pattern is the origin of the columns of the periodic table. The presets let you compare sodium (2, 8, 1) with chlorine (2, 8, 7): sodium has one electron to give away and chlorine has room for exactly one, which is why they combine as NaCl. Helium, neon, argon and krypton (Z = 2, 10, 18, 36) have full outer shells and hardly react at all. The animation toggle only makes the picture move; it is not a claim that electrons really circle like planets.',
        'The Bohr model is a historical stepping stone, and the simulation inherits its limits. Real electrons are described by orbitals, fuzzy regions of probability grouped into subshells, not by neat rings, and the ring spacing and nucleus size here are nowhere near to scale: the nucleus is about a hundred thousand times smaller than the atom. The 2, 8, 8, 18 pattern matches real atoms only up to calcium (Z = 20). Beyond that the third shell goes on filling to 18 while the outer shell keeps 2 electrons, so iron is really 2, 8, 14, 2 (not 2, 8, 8, 8 as drawn) and krypton is 2, 8, 18, 8. Treat the sim as reliable for Z = 1 to 20 and as a sketch after that.',
      ],
      id: [
        'Atom memiliki inti yang sangat kecil dan berat, tersusun dari proton dan neutron, dikelilingi elektron yang jauh lebih ringan. Jumlah proton adalah nomor atom Z, dan atom netral memiliki jumlah elektron yang sama. Pada 1913 Niels Bohr mengusulkan bahwa elektron tidak boleh berada di sembarang tempat: elektron menempati sejumlah kulit yang diizinkan, masing-masing dengan energi tertentu, dan kulit terdalam energinya paling rendah. Elektron hanya bisa pindah kulit dengan menyerap atau memancarkan seberkas cahaya yang energinya tepat; inilah yang menjelaskan mengapa gas hidrogen yang berpijar memancarkan beberapa warna tajam, bukan pelangi.',
        'Simulasi mengisi kulit dari dalam ke luar saat Z dinaikkan, dengan pola yang diajarkan di sekolah: 2 elektron di kulit pertama, 8 di kulit kedua, lalu 8 di kulit ketiga, lalu sampai 18 di kulit keempat. Aturan 2n² memberi jumlah elektron terbanyak yang pernah bisa ditampung satu kulit (2, 8, 18, 32), tetapi atom tidak mengisi kulit sampai maksimum itu secara berurutan: begitu kulit ketiga berisi 8 elektron, elektron berikutnya masuk ke kulit keempat; itulah sebabnya kalium dan kalsium memiliki 1 dan 2 elektron terluar. Elektron di kulit terluar adalah elektron valensi, ditampilkan kuning, dan merekalah yang menentukan sifat kimia atom.',
        'Menggeser slider Z menambah satu proton di inti dan satu elektron di kulit terluar setiap kali. Perhatikan jumlah valensinya: naik 1, 2, 3 … 8, lalu kulit baru terbuka dan hitungannya mulai lagi dari 1. Pola berulang inilah asal-usul kolom-kolom tabel periodik. Tombol preset memudahkan membandingkan natrium (2, 8, 1) dengan klorin (2, 8, 7): natrium punya satu elektron untuk dilepas dan klorin punya tempat untuk tepat satu elektron, sehingga keduanya bergabung menjadi NaCl. Helium, neon, argon, dan kripton (Z = 2, 10, 18, 36) kulit terluarnya penuh dan hampir tidak bereaksi. Tombol animasi hanya membuat gambar bergerak; itu bukan berarti elektron sungguh mengitari inti seperti planet.',
        'Model Bohr adalah batu loncatan sejarah, dan simulasi ini mewarisi keterbatasannya. Elektron sesungguhnya digambarkan dengan orbital, daerah kebolehjadian yang kabur dan dikelompokkan dalam subkulit, bukan cincin rapi; jarak cincin dan ukuran inti di sini juga jauh dari skala sebenarnya: inti sekitar seratus ribu kali lebih kecil daripada atomnya. Pola 2, 8, 8, 18 cocok dengan atom sungguhan hanya sampai kalsium (Z = 20). Setelah itu kulit ketiga terus terisi sampai 18 sementara kulit terluar tetap 2 elektron, sehingga besi sebenarnya 2, 8, 14, 2 (bukan 2, 8, 8, 8 seperti digambar) dan kripton 2, 8, 18, 8. Anggap simulasi ini andal untuk Z = 1 sampai 20 dan hanya sketsa setelahnya.',
      ],
    },
    figure: {
      caption: {
        en: 'A sodium atom (Z = 11) in the Bohr model: 11 protons in the nucleus, 2 electrons in the first shell, 8 in the second, and 1 valence electron alone in the third. Shells further out have higher energy.',
        id: 'Atom natrium (Z = 11) dalam model Bohr: 11 proton di inti, 2 elektron di kulit pertama, 8 di kulit kedua, dan 1 elektron valensi sendirian di kulit ketiga. Kulit yang lebih luar energinya lebih tinggi.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Bohr model of a sodium atom', 'Model Bohr atom natrium')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.sh{fill:none;stroke:currentColor;stroke-width:1;opacity:.45}.e{fill:#3b82f6;stroke:currentColor;stroke-width:.6}</style>
  <circle cx="120" cy="120" r="30" class="sh"/>
  <circle cx="120" cy="120" r="60" class="sh"/>
  <circle cx="120" cy="120" r="95" class="sh"/>
  <circle cx="120" cy="120" r="14" fill="#ef4444"/>
  <text x="120" y="124" text-anchor="middle" fill="#fff" style="font-weight:bold">11+</text>
  <circle cx="150" cy="120" r="5" class="e"/><circle cx="90" cy="120" r="5" class="e"/>
  <circle cx="180" cy="120" r="5" class="e"/><circle cx="162.4" cy="162.4" r="5" class="e"/>
  <circle cx="120" cy="180" r="5" class="e"/><circle cx="77.6" cy="162.4" r="5" class="e"/>
  <circle cx="60" cy="120" r="5" class="e"/><circle cx="77.6" cy="77.6" r="5" class="e"/>
  <circle cx="120" cy="60" r="5" class="e"/><circle cx="162.4" cy="77.6" r="5" class="e"/>
  <circle cx="215" cy="120" r="6" fill="#f59e0b" stroke="currentColor" stroke-width=".6"/>
  <text x="110" y="152" fill="#3b82f6">n=1: 2</text>
  <text x="128" y="196" fill="#3b82f6">n=2: 8</text>
  <text x="196" y="106" fill="#f59e0b">n=3: 1</text>
  <text x="250" y="60" style="font-weight:bold">Na, Z = 11</text>
  <text x="250" y="80">${L('11 protons in nucleus', '11 proton di inti')}</text>
  <text x="250" y="96">${L('11 electrons: 2, 8, 1', '11 elektron: 2, 8, 1')}</text>
  <text x="250" y="124" fill="#f59e0b">${L('1 valence electron', '1 elektron valensi')}</text>
  <text x="250" y="140" fill="#f59e0b">${L('→ group 1, forms Na⁺', '→ golongan 1, membentuk Na⁺')}</text>
  <line x1="250" y1="200" x2="340" y2="200" stroke="currentColor" stroke-width="1.2" marker-end="url(#ar)"/>
  <text x="250" y="190">${L('energy increases outward', 'energi naik ke arah luar')}</text>
  <text x="250" y="222" opacity=".7">${L('not to scale', 'tidak sesuai skala')}</text>
  <defs><marker id="ar" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="context-stroke"/></marker></defs>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Electrons occupy shells of fixed energy around the nucleus; the shell closest to the nucleus is filled first.',
        'The sim fills shells as 2, 8, 8, 18; the 2n² rule gives the maximum capacity of each shell (2, 8, 18, 32), not the order in which atoms fill them.',
        'The electrons in the outermost shell are the valence electrons, and they decide how an element reacts.',
        'Elements in the same column of the periodic table have the same number of valence electrons, which is why they behave alike.',
        'Atoms with a full outer shell (the noble gases) are especially stable; other atoms gain, lose or share electrons to reach a full shell.',
      ],
      id: [
        'Elektron menempati kulit-kulit berenergi tetap di sekitar inti; kulit yang paling dekat dengan inti diisi lebih dulu.',
        'Simulasi mengisi kulit dengan pola 2, 8, 8, 18; aturan 2n² memberi kapasitas maksimum tiap kulit (2, 8, 18, 32), bukan urutan pengisiannya.',
        'Elektron di kulit terluar adalah elektron valensi, dan merekalah yang menentukan cara unsur bereaksi.',
        'Unsur-unsur dalam kolom yang sama pada tabel periodik memiliki jumlah elektron valensi yang sama, sehingga sifatnya mirip.',
        'Atom dengan kulit terluar penuh (gas mulia) sangat stabil; atom lain menerima, melepas, atau berbagi elektron untuk mencapai kulit penuh.',
      ],
    },
    vocabulary: {
      en: [
        ['Atomic number (Z)', 'The number of protons in the nucleus; in a neutral atom it is also the number of electrons.'],
        ['Shell (energy level)', 'One of the allowed distances from the nucleus where electrons can sit; labelled n = 1, 2, 3 … from the inside.'],
        ['Valence electrons', 'The electrons in the outermost occupied shell, which take part in chemical bonding.'],
        ['Noble gas', 'An element whose outer shell is full (He, Ne, Ar, Kr …); very unreactive.'],
        ['Ion', 'An atom that has lost or gained electrons, such as Na⁺ or Cl⁻, usually to reach a full outer shell.'],
        ['Electron configuration', 'The list of how many electrons sit in each shell, for example 2, 8, 1 for sodium.'],
      ],
      id: [
        ['Nomor atom (Z)', 'Jumlah proton di inti; pada atom netral juga sama dengan jumlah elektron.'],
        ['Kulit (tingkat energi)', 'Salah satu jarak dari inti yang diizinkan untuk ditempati elektron; diberi label n = 1, 2, 3 … dari dalam.'],
        ['Elektron valensi', 'Elektron di kulit terisi paling luar, yang ikut serta dalam ikatan kimia.'],
        ['Gas mulia', 'Unsur yang kulit terluarnya penuh (He, Ne, Ar, Kr …); sangat tidak reaktif.'],
        ['Ion', 'Atom yang kehilangan atau menerima elektron, misalnya Na⁺ atau Cl⁻, biasanya untuk mencapai kulit terluar penuh.'],
        ['Konfigurasi elektron', 'Daftar jumlah elektron di tiap kulit, misalnya 2, 8, 1 untuk natrium.'],
      ],
    },
    misconceptions: {
      en: [
        ['Electrons circle the nucleus on fixed tracks like planets around the Sun.', 'The rings are a model, not a photograph. Electrons are better described as clouds of probability (orbitals); the shells tell you their energy, not an exact path.'],
        ['The picture shows the real proportions of an atom.', 'Not even close. The nucleus is roughly 100 000 times smaller than the whole atom; drawn to scale it would be invisible, and the atom is almost entirely empty space.'],
        ['Each shell must be completely full before the next one starts.', 'The third shell can hold 18 electrons, yet after 8 the next electrons go into the fourth shell (potassium, calcium). Shells fill by energy, and the sim shows that 8-then-new-shell step.'],
        ['The valence electrons are all of the atom\'s electrons.', 'Only the outer shell counts. Chlorine has 17 electrons but 7 valence electrons; it is those 7 that make it behave like fluorine (which also has 7).'],
      ],
      id: [
        ['Elektron mengitari inti pada lintasan tetap seperti planet mengitari Matahari.', 'Cincin-cincin itu hanya model, bukan foto. Elektron lebih tepat digambarkan sebagai awan kebolehjadian (orbital); kulit menunjukkan energinya, bukan lintasan pastinya.'],
        ['Gambar ini menunjukkan perbandingan ukuran atom yang sesungguhnya.', 'Jauh sekali. Inti kira-kira 100.000 kali lebih kecil daripada seluruh atom; jika digambar sesuai skala, inti tidak akan terlihat, dan atom hampir seluruhnya ruang kosong.'],
        ['Setiap kulit harus penuh dulu sebelum kulit berikutnya mulai terisi.', 'Kulit ketiga bisa menampung 18 elektron, tetapi setelah 8 elektron berikutnya masuk ke kulit keempat (kalium, kalsium). Kulit terisi menurut energi, dan simulasi memperlihatkan langkah 8-lalu-kulit-baru itu.'],
        ['Elektron valensi adalah semua elektron atom.', 'Hanya kulit terluar yang dihitung. Klorin punya 17 elektron tetapi 7 elektron valensi; ketujuh elektron itulah yang membuatnya berperilaku seperti fluorin (yang juga punya 7).'],
      ],
    },
    realWorld: {
      en: [
        'Fireworks and flame tests get their colours from electrons jumping between shells: sodium gives yellow, copper gives blue-green, strontium gives red.',
        'Neon signs and sodium street lamps glow because electrons in the gas are kicked to higher shells and emit light of fixed colours when they fall back.',
        'Table salt forms because sodium (1 valence electron) hands one electron to chlorine (7 valence electrons), leaving both with full outer shells.',
        'Argon fills ordinary light bulbs and welding torches precisely because its full outer shell makes it refuse to react with the hot metal.',
      ],
      id: [
        'Kembang api dan uji nyala mendapat warnanya dari elektron yang melompat antarkulit: natrium memberi kuning, tembaga biru-hijau, stronsium merah.',
        'Lampu neon dan lampu jalan natrium menyala karena elektron dalam gas didorong ke kulit yang lebih tinggi lalu memancarkan cahaya berwarna tertentu saat kembali turun.',
        'Garam dapur terbentuk karena natrium (1 elektron valensi) menyerahkan satu elektron kepada klorin (7 elektron valensi), sehingga keduanya memiliki kulit terluar penuh.',
        'Argon dipakai mengisi bola lampu dan las karena kulit terluarnya yang penuh membuatnya tidak mau bereaksi dengan logam panas.',
      ],
    },
    questions: {
      en: [
        { q: 'Magnesium has Z = 12. Write its shell configuration, state how many valence electrons it has, and predict the charge of the ion it forms.', a: '2, 8, 2. It has 2 valence electrons. Losing both leaves the full 2, 8 arrangement of neon, so magnesium forms Mg²⁺.' },
        { q: 'Lithium (Z = 3), sodium (Z = 11) and potassium (Z = 19) all react violently with water. What do their Bohr diagrams have in common?', a: 'Each has exactly one electron in its outer shell (2, 1; 2, 8, 1; 2, 8, 8, 1). That lone, easily lost electron makes all three behave alike, which is why they sit in the same column of the periodic table.' },
        { q: 'An atom has the configuration 2, 8, 7. Which element is it, and why does it tend to gain one electron rather than lose seven?', a: 'Z = 2 + 8 + 7 = 17, so it is chlorine. Gaining one electron fills its outer shell (2, 8, 8, like argon) and forms Cl⁻; removing seven electrons would take far more energy.' },
      ],
      id: [
        { q: 'Magnesium memiliki Z = 12. Tulis konfigurasi kulitnya, sebutkan jumlah elektron valensinya, dan tebak muatan ion yang dibentuknya.', a: '2, 8, 2. Elektron valensinya 2. Melepas keduanya menyisakan susunan penuh 2, 8 seperti neon, sehingga magnesium membentuk Mg²⁺.' },
        { q: 'Litium (Z = 3), natrium (Z = 11), dan kalium (Z = 19) semuanya bereaksi hebat dengan air. Apa kesamaan diagram Bohr ketiganya?', a: 'Masing-masing punya tepat satu elektron di kulit terluar (2, 1; 2, 8, 1; 2, 8, 8, 1). Satu elektron yang mudah lepas itulah yang membuat ketiganya berperilaku serupa, sehingga mereka berada di kolom yang sama pada tabel periodik.' },
        { q: 'Sebuah atom berkonfigurasi 2, 8, 7. Unsur apakah itu, dan mengapa ia cenderung menerima satu elektron daripada melepas tujuh?', a: 'Z = 2 + 8 + 7 = 17, jadi klorin. Menerima satu elektron membuat kulit terluarnya penuh (2, 8, 8 seperti argon) dan membentuk Cl⁻; melepas tujuh elektron akan membutuhkan energi jauh lebih besar.' },
      ],
    },
  },
};
