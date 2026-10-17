// Long-form text for the sim page aside, kept out of manifest.js.
export default {
  objectives: {
    en: [
      'Count the total valence electrons of a molecule and distribute them as bonding pairs and lone pairs so that every atom satisfies the octet (or duet) rule.',
      'Compute formal charges (valence − lone electrons − bonds) and use them to choose the best of several valid Lewis structures.',
      'Recognise the common exceptions, incomplete octet (BF₃) and expanded octet (PCl₅, SO₂), and read the VSEPR shape from the electron domains on the central atom.',
    ],
    id: [
      'Menghitung total elektron valensi suatu molekul dan membagikannya sebagai pasangan ikatan dan pasangan bebas sehingga setiap atom memenuhi kaidah oktet (atau duplet).',
      'Menghitung muatan formal (valensi − elektron bebas − jumlah ikatan) dan menggunakannya untuk memilih struktur Lewis terbaik dari beberapa yang sah.',
      'Mengenali pengecualian yang umum, oktet tak lengkap (BF₃) dan oktet berkembang (PCl₅, SO₂), serta membaca bentuk VSEPR dari domain elektron pada atom pusat.',
    ],
  },
  tryThis: {
    en: [
      'Build H₂O with two single bonds and no lone pairs. "Used" reads 4/8 and O shows 4/8. Add lone pairs to O one at a time until both counters turn green.',
      'Build CO₂ with one single and one triple bond instead of two doubles. The structure is accepted as valid, but pink formal charges appear. Switch to two double bonds and watch them vanish.',
      'Build SO₂ both ways: S=O and S–O (S has an octet, two atoms carry formal charges) or S=O on both sides (S holds 10 electrons, all charges zero). Read the note under the molecule.',
      'Build PCl₅ and count the electrons around P. Then try to give P exactly 8: can you still connect all five Cl atoms?',
    ],
    id: [
      'Bangun H₂O dengan dua ikatan tunggal tanpa pasangan bebas. "Terpakai" menunjukkan 4/8 dan O menunjukkan 4/8. Tambahkan pasangan bebas pada O satu per satu sampai kedua penghitung menjadi hijau.',
      'Bangun CO₂ dengan satu ikatan tunggal dan satu rangkap tiga, bukan dua rangkap dua. Struktur diterima sebagai sah, tetapi muatan formal merah muda muncul. Ganti ke dua rangkap dua dan lihat muatan itu hilang.',
      'Bangun SO₂ dengan dua cara: S=O dan S–O (S oktet, dua atom bermuatan formal) atau S=O di kedua sisi (S menampung 10 elektron, semua muatan nol). Baca catatan di bawah molekul.',
      'Bangun PCl₅ dan hitung elektron di sekitar P. Lalu coba beri P tepat 8: masih bisakah kelima atom Cl terhubung?',
    ],
  },

  learn: {
    background: {
      en: [
        'A Lewis structure is a bookkeeping diagram for valence electrons. Each dot is one electron; a line between two atoms is a shared pair (two electrons), and a pair of dots on one atom is a lone pair. The recipe has four steps. (1) Add up the valence electrons: H has 1, B 3, C 4, N 5, O 6, F and Cl 7, S 6, P 5. For H₂O that is 6 + 2×1 = 8; for SO₂ it is 6 + 2×6 = 18. (2) Join the central atom (usually the least electronegative one that is not hydrogen) to each outer atom with a single bond. (3) Give the outer atoms lone pairs until each has 8 electrons (hydrogen stops at 2). (4) Put any leftover electrons on the central atom; if it still has fewer than 8, move a lone pair from an outer atom in to make a double or triple bond.',
        'The sim does this bookkeeping live. "Used" counts 2 electrons per bond pair and 2 per lone pair and must end exactly at the total; a badge under every atom shows its electron count and turns green when the rule for that atom is met. In CO₂ carbon needs two double bonds (4 bond pairs = 8 electrons) and each oxygen keeps two lone pairs; in N₂ the two atoms share three pairs and keep one lone pair each. Period-2 atoms (B to F) can never hold more than 8 electrons because they have only four orbitals in the valence shell (2s and three 2p).',
        'Sometimes several structures satisfy the counts. Formal charge decides between them: FC = (valence electrons) − (lone-pair electrons) − (number of bonds). Drawing CO₂ as O≡C–O gives one oxygen +1 and the other −1, while O=C=O gives all zeros, so the second is the better description; the sim marks the first as "valid, but formal charges are not minimal". In SO₂ the structure with S=O and S–O gives S a +1 and one O a −1 (and a second, equivalent structure with the double bond on the other oxygen is a resonance form); the structure with two S=O bonds has no formal charges but puts 10 electrons on sulfur. Both are taught, and the sim accepts both.',
        'Two kinds of exception are included. Boron in BF₃ is stable with only six electrons (an incomplete octet) because fluorine is too electronegative to share a second pair. Phosphorus in PCl₅ holds ten electrons (an expanded octet), which is allowed for period-3 atoms because they are larger and have 3d orbitals available. Finally, the number of electron domains on the central atom, bonded atoms plus lone pairs, fixes the shape by VSEPR: 4 domains with 0, 1 or 2 lone pairs give tetrahedral CH₄ (109.5°), trigonal pyramidal NH₃ (107°) and bent H₂O (104.5°); 2 domains give linear CO₂ (180°); 3 give trigonal planar BF₃ (120°) or bent SO₂; 5 give trigonal bipyramidal PCl₅.',
      ],
      id: [
        'Struktur Lewis adalah diagram pembukuan elektron valensi. Setiap titik adalah satu elektron; garis antara dua atom adalah pasangan yang dipakai bersama (dua elektron), dan sepasang titik pada satu atom adalah pasangan elektron bebas. Resepnya ada empat langkah. (1) Jumlahkan elektron valensi: H punya 1, B 3, C 4, N 5, O 6, F dan Cl 7, S 6, P 5. Untuk H₂O: 6 + 2×1 = 8; untuk SO₂: 6 + 2×6 = 18. (2) Hubungkan atom pusat (biasanya atom paling tidak elektronegatif selain hidrogen) ke tiap atom luar dengan ikatan tunggal. (3) Beri atom luar pasangan bebas sampai masing-masing memiliki 8 elektron (hidrogen berhenti di 2). (4) Letakkan sisa elektron pada atom pusat; jika masih kurang dari 8, pindahkan satu pasangan bebas dari atom luar untuk membentuk ikatan rangkap dua atau tiga.',
        'Simulasi melakukan pembukuan ini secara langsung. "Terpakai" menghitung 2 elektron per pasangan ikatan dan 2 per pasangan bebas, dan harus berakhir tepat pada totalnya; lencana di bawah tiap atom menunjukkan jumlah elektronnya dan menjadi hijau jika kaidah untuk atom itu terpenuhi. Dalam CO₂ karbon memerlukan dua ikatan rangkap dua (4 pasangan ikatan = 8 elektron) dan tiap oksigen menyimpan dua pasangan bebas; dalam N₂ kedua atom memakai bersama tiga pasangan dan masing-masing menyimpan satu pasangan bebas. Atom periode 2 (B sampai F) tidak pernah dapat menampung lebih dari 8 elektron karena hanya punya empat orbital di kulit valensi (2s dan tiga 2p).',
        'Terkadang beberapa struktur memenuhi hitungan. Muatan formal memutuskan di antaranya: MF = (elektron valensi) − (elektron pasangan bebas) − (jumlah ikatan). Menggambar CO₂ sebagai O≡C–O memberi satu oksigen +1 dan yang lain −1, sedangkan O=C=O memberi semua nol, sehingga yang kedua adalah gambaran yang lebih baik; simulasi menandai yang pertama sebagai "sah, tetapi muatan formal belum minimal". Dalam SO₂ struktur dengan S=O dan S–O memberi S muatan +1 dan satu O muatan −1 (dan struktur kedua yang setara dengan ikatan rangkap pada oksigen lainnya adalah bentuk resonansi); struktur dengan dua ikatan S=O tidak bermuatan formal tetapi menempatkan 10 elektron pada belerang. Keduanya diajarkan, dan simulasi menerima keduanya.',
        'Dua jenis pengecualian disertakan. Boron dalam BF₃ stabil dengan hanya enam elektron (oktet tak lengkap) karena fluorin terlalu elektronegatif untuk membagi pasangan kedua. Fosforus dalam PCl₅ menampung sepuluh elektron (oktet berkembang), yang dimungkinkan bagi atom periode 3 karena ukurannya lebih besar dan memiliki orbital 3d. Akhirnya, jumlah domain elektron pada atom pusat, yaitu atom terikat ditambah pasangan bebas, menentukan bentuk menurut VSEPR: 4 domain dengan 0, 1, atau 2 pasangan bebas memberi CH₄ tetrahedral (109,5°), NH₃ piramida segitiga (107°), dan H₂O bengkok (104,5°); 2 domain memberi CO₂ linear (180°); 3 memberi BF₃ segitiga datar (120°) atau SO₂ bengkok; 5 memberi PCl₅ bipiramida segitiga.',
      ],
    },
    figure: {
      caption: {
        en: 'Four finished Lewis structures with electron counts. H₂O: 8 electrons as 2 bond pairs + 2 lone pairs on O (bent, 104.5°). CO₂: 16 electrons as two double bonds + 2 lone pairs per O (linear). NH₃: 8 electrons, one lone pair on N (trigonal pyramidal). BF₃: 24 electrons, boron keeps only 6 (trigonal planar).',
        id: 'Empat struktur Lewis lengkap dengan hitungan elektron. H₂O: 8 elektron sebagai 2 pasangan ikatan + 2 pasangan bebas pada O (bengkok, 104,5°). CO₂: 16 elektron sebagai dua ikatan rangkap dua + 2 pasangan bebas per O (linear). NH₃: 8 elektron, satu pasangan bebas pada N (piramida segitiga). BF₃: 24 elektron, boron hanya menyimpan 6 (segitiga datar).',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        const pair = (x, y, dx, dy) => `<circle cx="${x - dx}" cy="${y - dy}" r="2.4" fill="#fde047"/><circle cx="${x + dx}" cy="${y + dy}" r="2.4" fill="#fde047"/>`;
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Lewis structures of water, carbon dioxide, ammonia and boron trifluoride', 'Struktur Lewis air, karbon dioksida, amonia, dan boron trifluorida')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.a{font:bold 14px system-ui,sans-serif;fill:currentColor;text-anchor:middle}.t{font:bold 12px system-ui,sans-serif;fill:currentColor;text-anchor:middle}.c{font:11px system-ui,sans-serif;fill:currentColor;text-anchor:middle}.b{stroke:currentColor;stroke-width:1.6}</style>
  <text x="90" y="18" class="t">H₂O · 8 e⁻</text>
  <text x="90" y="72" class="a">O</text>
  <text x="56" y="90" class="a">H</text><text x="124" y="90" class="a">H</text>
  <line x1="66" y1="84" x2="82" y2="74" class="b"/><line x1="114" y1="84" x2="98" y2="74" class="b"/>
  ${pair(78, 52, 4, -3)}${pair(102, 52, 4, 3)}
  <text x="90" y="112" class="c">${L('2 bond pairs + 2 lone pairs', '2 pasangan ikatan + 2 pasangan bebas')}</text>
  <text x="90" y="126" class="c">${L('bent, 104.5°', 'bengkok, 104,5°')}</text>
  <text x="270" y="18" class="t">CO₂ · 16 e⁻</text>
  <text x="228" y="72" class="a">O</text><text x="270" y="72" class="a">C</text><text x="312" y="72" class="a">O</text>
  <line x1="237" y1="64" x2="261" y2="64" class="b"/><line x1="237" y1="70" x2="261" y2="70" class="b"/>
  <line x1="279" y1="64" x2="303" y2="64" class="b"/><line x1="279" y1="70" x2="303" y2="70" class="b"/>
  ${pair(228, 52, 4, 0)}${pair(228, 82, 4, 0)}${pair(312, 52, 4, 0)}${pair(312, 82, 4, 0)}
  <text x="270" y="112" class="c">${L('4 bond pairs + 4 lone pairs', '4 pasangan ikatan + 4 pasangan bebas')}</text>
  <text x="270" y="126" class="c">${L('linear, 180°', 'linear, 180°')}</text>
  <text x="90" y="150" class="t">NH₃ · 8 e⁻</text>
  <text x="90" y="196" class="a">N</text>
  <text x="56" y="214" class="a">H</text><text x="124" y="214" class="a">H</text><text x="90" y="230" class="a">H</text>
  <line x1="66" y1="208" x2="82" y2="198" class="b"/><line x1="114" y1="208" x2="98" y2="198" class="b"/><line x1="90" y1="200" x2="90" y2="218" class="b"/>
  ${pair(90, 176, 4, 0)}
  <text x="150" y="196" class="c" style="text-anchor:start">${L('1 lone pair', '1 pasangan bebas')}</text>
  <text x="150" y="210" class="c" style="text-anchor:start">${L('pyramidal, 107°', 'piramida, 107°')}</text>
  <text x="270" y="150" class="t">BF₃ · 24 e⁻</text>
  <text x="270" y="196" class="a">B</text>
  <text x="236" y="214" class="a">F</text><text x="304" y="214" class="a">F</text><text x="270" y="170" class="a">F</text>
  <line x1="246" y1="208" x2="262" y2="198" class="b"/><line x1="294" y1="208" x2="278" y2="198" class="b"/><line x1="270" y1="182" x2="270" y2="172" class="b"/>
  ${pair(222, 204, 0, 4)}${pair(236, 226, 4, 0)}${pair(226, 192, 3, 3)}
  ${pair(318, 204, 0, 4)}${pair(304, 226, 4, 0)}${pair(314, 192, 3, -3)}
  ${pair(256, 164, 0, 4)}${pair(284, 164, 0, 4)}${pair(270, 154, 4, 0)}
  <text x="270" y="238" class="c">${L('B has only 6 e⁻ · planar, 120°', 'B hanya 6 e⁻ · datar, 120°')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Total valence electrons = sum over atoms (H 1, B 3, C 4, N 5, O 6, F/Cl 7, S 6, P 5); every structure must use exactly this number.',
        'Each bond line is a shared pair (2 electrons) and each lone pair is 2 electrons; bond pairs + lone pairs = total ÷ 2.',
        'Octet rule: C, N, O and F end with 8 electrons; hydrogen with 2. If the central atom is short, convert outer lone pairs into double or triple bonds.',
        'Formal charge = valence − lone-pair electrons − number of bonds. The best structure has formal charges as small as possible, with negative charge on the more electronegative atom.',
        'Exceptions: incomplete octet (B in BF₃ has 6) and expanded octet (P in PCl₅ has 10; S in SO₂ may have 10) — only period 3 and below can expand.',
        'Electron domains on the central atom (bonded atoms + lone pairs) set the VSEPR shape: 2 linear, 3 trigonal planar or bent, 4 tetrahedral, pyramidal or bent, 5 trigonal bipyramidal.',
      ],
      id: [
        'Total elektron valensi = jumlah seluruh atom (H 1, B 3, C 4, N 5, O 6, F/Cl 7, S 6, P 5); setiap struktur harus memakai tepat sejumlah ini.',
        'Setiap garis ikatan adalah pasangan bersama (2 elektron) dan setiap pasangan bebas adalah 2 elektron; pasangan ikatan + pasangan bebas = total ÷ 2.',
        'Kaidah oktet: C, N, O, dan F berakhir dengan 8 elektron; hidrogen dengan 2. Jika atom pusat kekurangan, ubah pasangan bebas atom luar menjadi ikatan rangkap dua atau tiga.',
        'Muatan formal = valensi − elektron pasangan bebas − jumlah ikatan. Struktur terbaik memiliki muatan formal sekecil mungkin, dengan muatan negatif pada atom yang lebih elektronegatif.',
        'Pengecualian: oktet tak lengkap (B dalam BF₃ punya 6) dan oktet berkembang (P dalam PCl₅ punya 10; S dalam SO₂ bisa 10) — hanya periode 3 ke bawah yang dapat berkembang.',
        'Domain elektron pada atom pusat (atom terikat + pasangan bebas) menentukan bentuk VSEPR: 2 linear, 3 segitiga datar atau bengkok, 4 tetrahedral, piramida, atau bengkok, 5 bipiramida segitiga.',
      ],
    },
    vocabulary: {
      en: [
        ['Valence electrons', 'Electrons in the outermost shell of an atom; the ones shown in a Lewis structure. Equal to the group number for main-group elements (group 13 → 3, group 17 → 7).'],
        ['Bonding pair', 'Two electrons shared between two atoms, drawn as a line. Two or three shared pairs make a double or triple bond.'],
        ['Lone pair', 'Two valence electrons on one atom that are not shared; drawn as a pair of dots.'],
        ['Octet rule', 'Atoms tend to gain, lose or share electrons until they have eight in the valence shell (two for hydrogen).'],
        ['Formal charge', 'The charge an atom would carry if bonding electrons were split equally: valence − lone electrons − bonds.'],
        ['Resonance', 'Two or more Lewis structures that differ only in where double bonds and lone pairs are placed; the real molecule is an average of them.'],
        ['Electron domain', 'A region of electron density around the central atom: one bonded atom (whatever the bond order) or one lone pair.'],
      ],
      id: [
        ['Elektron valensi', 'Elektron di kulit terluar atom; yang digambarkan dalam struktur Lewis. Sama dengan nomor golongan untuk unsur golongan utama (golongan 13 → 3, golongan 17 → 7).'],
        ['Pasangan ikatan', 'Dua elektron yang dipakai bersama oleh dua atom, digambar sebagai garis. Dua atau tiga pasangan bersama membentuk ikatan rangkap dua atau tiga.'],
        ['Pasangan elektron bebas', 'Dua elektron valensi pada satu atom yang tidak dipakai bersama; digambar sebagai sepasang titik.'],
        ['Kaidah oktet', 'Atom cenderung menerima, melepas, atau memakai bersama elektron sampai memiliki delapan elektron di kulit valensi (dua untuk hidrogen).'],
        ['Muatan formal', 'Muatan yang akan dimiliki atom jika elektron ikatan dibagi sama rata: valensi − elektron bebas − jumlah ikatan.'],
        ['Resonansi', 'Dua atau lebih struktur Lewis yang hanya berbeda pada letak ikatan rangkap dan pasangan bebas; molekul nyata adalah rata-ratanya.'],
        ['Domain elektron', 'Daerah kerapatan elektron di sekitar atom pusat: satu atom terikat (apa pun orde ikatannya) atau satu pasangan bebas.'],
      ],
    },
    misconceptions: {
      en: [
        ['A double bond counts as two electron domains in VSEPR.', 'It counts as one. All the electrons between the same two atoms occupy one region of space, which is why CO₂, with two double bonds and no lone pairs on carbon, is linear.'],
        ['Every atom in every stable molecule has exactly eight electrons.', 'Hydrogen stops at 2, boron in BF₃ is stable with 6, and period-3 atoms such as P in PCl₅ (10) and S in SF₆ (12) can exceed 8 because they have more orbitals available.'],
        ['If the electron count works out, the Lewis structure is the right one.', 'The count is necessary but not sufficient. O≡C–O uses 16 electrons and gives every atom an octet, yet O=C=O is the better structure because it has no formal charges.'],
        ['Lone pairs do not affect a molecule\'s shape.', 'They do: they are electron domains that repel the bonding pairs. CH₄, NH₃ and H₂O all have four domains, but the angle shrinks from 109.5° to 107° to 104.5° as lone pairs replace bonds.'],
      ],
      id: [
        ['Ikatan rangkap dua dihitung sebagai dua domain elektron dalam VSEPR.', 'Dihitung sebagai satu. Semua elektron di antara dua atom yang sama menempati satu daerah ruang, sehingga CO₂, dengan dua ikatan rangkap dan tanpa pasangan bebas pada karbon, berbentuk linear.'],
        ['Setiap atom dalam setiap molekul stabil memiliki tepat delapan elektron.', 'Hidrogen berhenti di 2, boron dalam BF₃ stabil dengan 6, dan atom periode 3 seperti P dalam PCl₅ (10) dan S dalam SF₆ (12) dapat melebihi 8 karena memiliki lebih banyak orbital.'],
        ['Jika hitungan elektronnya cocok, struktur Lewis itu sudah benar.', 'Hitungan itu perlu tetapi tidak cukup. O≡C–O memakai 16 elektron dan memberi setiap atom oktet, namun O=C=O adalah struktur yang lebih baik karena tidak bermuatan formal.'],
        ['Pasangan elektron bebas tidak memengaruhi bentuk molekul.', 'Memengaruhi: pasangan bebas adalah domain elektron yang menolak pasangan ikatan. CH₄, NH₃, dan H₂O semuanya punya empat domain, tetapi sudutnya menyusut dari 109,5° ke 107° ke 104,5° saat pasangan bebas menggantikan ikatan.'],
      ],
    },
    realWorld: {
      en: [
        'The two lone pairs on oxygen give water its bent shape and strong polarity, which is why water dissolves salts and forms hydrogen bonds; without them it would be a linear, non-polar gas like CO₂.',
        'The triple bond in N₂ (bond energy 945 kJ/mol) is why nitrogen gas is so unreactive and why fixing it into ammonia requires high pressure, 400–500 °C and an iron catalyst in the Haber process.',
        'Lone pairs on nitrogen make NH₃ a base: that pair can bond to H⁺ to form NH₄⁺. The same lone pair lets ammonia act as a ligand in metal complexes.',
        'BF₃, with its incomplete octet, is a strong Lewis acid used as a catalyst in making plastics and pharmaceuticals; it grabs an electron pair from other molecules to complete its octet.',
        'Chemists sketch Lewis structures before any calculation because they predict bond orders, polarity and reactive sites; the same rules are built into molecular-drawing software.',
      ],
      id: [
        'Dua pasangan bebas pada oksigen memberi air bentuk bengkok dan polaritas kuat, sehingga air melarutkan garam dan membentuk ikatan hidrogen; tanpa pasangan itu air akan menjadi gas linear nonpolar seperti CO₂.',
        'Ikatan rangkap tiga dalam N₂ (energi ikatan 945 kJ/mol) adalah alasan gas nitrogen sangat tidak reaktif dan mengapa mengubahnya menjadi amonia memerlukan tekanan tinggi, 400–500 °C, dan katalis besi dalam proses Haber.',
        'Pasangan bebas pada nitrogen menjadikan NH₃ basa: pasangan itu dapat berikatan dengan H⁺ membentuk NH₄⁺. Pasangan bebas yang sama memungkinkan amonia bertindak sebagai ligan dalam kompleks logam.',
        'BF₃, dengan oktetnya yang tak lengkap, adalah asam Lewis kuat yang dipakai sebagai katalis pembuatan plastik dan obat; ia merebut pasangan elektron dari molekul lain untuk melengkapi oktetnya.',
        'Kimiawan menggambar struktur Lewis sebelum perhitungan apa pun karena struktur ini memprediksi orde ikatan, polaritas, dan tempat reaktif; aturan yang sama tertanam dalam perangkat lunak penggambar molekul.',
      ],
    },
    questions: {
      en: [
        { q: 'How many valence electrons does NH₃ have, and how are they distributed in the correct structure?', a: '5 (N) + 3×1 (H) = 8 electrons. Three N–H bonding pairs use 6; the remaining 2 form one lone pair on nitrogen. N has 8, each H has 2.' },
        { q: 'A student draws CO₂ as O≡C–O with one lone pair on the triple-bonded O and three on the single-bonded O. Is the structure valid? Is it the best?', a: 'It is valid: 16 electrons used, every atom has an octet. But the formal charges are +1 on the triple-bonded O (6 − 2 − 3) and −1 on the other (6 − 6 − 1). O=C=O has zero formal charge on every atom and is the better structure.' },
        { q: 'In SO₂ drawn with one S=O and one S–O bond, calculate the formal charge on S. What does the alternative structure with two S=O bonds do to this charge, and what is the cost?', a: 'S has 1 lone pair and 3 bonds: FC = 6 − 2 − 3 = +1 (the single-bonded O is −1). With two S=O bonds S has 4 bonds and 1 lone pair: FC = 6 − 2 − 4 = 0, but S now holds 10 electrons, an expanded octet, which is acceptable for a period-3 atom.' },
        { q: 'CH₄, NH₃ and H₂O all have four electron domains on the central atom. Why are their shapes and bond angles different?', a: 'The domains are arranged tetrahedrally in all three, but the shape is named only from the atoms. CH₄ has 4 bonded atoms (tetrahedral, 109.5°), NH₃ has 3 atoms + 1 lone pair (trigonal pyramidal, 107°), H₂O has 2 atoms + 2 lone pairs (bent, 104.5°). Lone pairs repel more strongly than bonding pairs, so each extra lone pair squeezes the H–X–H angle a little smaller.' },
      ],
      id: [
        { q: 'Berapa elektron valensi NH₃, dan bagaimana sebarannya dalam struktur yang benar?', a: '5 (N) + 3×1 (H) = 8 elektron. Tiga pasangan ikatan N–H memakai 6; sisa 2 membentuk satu pasangan bebas pada nitrogen. N memiliki 8, tiap H memiliki 2.' },
        { q: 'Seorang siswa menggambar CO₂ sebagai O≡C–O dengan satu pasangan bebas pada O berikatan rangkap tiga dan tiga pada O berikatan tunggal. Apakah strukturnya sah? Apakah yang terbaik?', a: 'Sah: 16 elektron terpakai, tiap atom oktet. Namun muatan formalnya +1 pada O berikatan rangkap tiga (6 − 2 − 3) dan −1 pada O lainnya (6 − 6 − 1). O=C=O bermuatan formal nol pada setiap atom dan merupakan struktur yang lebih baik.' },
        { q: 'Dalam SO₂ yang digambar dengan satu ikatan S=O dan satu S–O, hitung muatan formal pada S. Apa pengaruh struktur alternatif dengan dua ikatan S=O terhadap muatan ini, dan apa harganya?', a: 'S memiliki 1 pasangan bebas dan 3 ikatan: MF = 6 − 2 − 3 = +1 (O berikatan tunggal −1). Dengan dua ikatan S=O, S memiliki 4 ikatan dan 1 pasangan bebas: MF = 6 − 2 − 4 = 0, tetapi S kini menampung 10 elektron, oktet berkembang, yang dapat diterima untuk atom periode 3.' },
        { q: 'CH₄, NH₃, dan H₂O semuanya memiliki empat domain elektron pada atom pusat. Mengapa bentuk dan sudut ikatannya berbeda?', a: 'Domainnya tersusun tetrahedral pada ketiganya, tetapi bentuk dinamai hanya dari atomnya. CH₄ memiliki 4 atom terikat (tetrahedral, 109,5°), NH₃ 3 atom + 1 pasangan bebas (piramida segitiga, 107°), H₂O 2 atom + 2 pasangan bebas (bengkok, 104,5°). Pasangan bebas menolak lebih kuat daripada pasangan ikatan, sehingga setiap tambahan pasangan bebas memperkecil sudut H–X–H sedikit.' },
      ],
    },
  },
};
