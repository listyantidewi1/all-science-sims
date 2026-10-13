// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Match hybridization to molecular geometry.',
      'Connect to common molecules: CH₄ (sp³), C₂H₄ (sp²), C₂H₂ (sp).',
      "See bond angles: 109.5°, 120°, 180°.",
    ],
    id: [
      'Mencocokkan hibridisasi dengan geometri molekul.',
      'Mengaitkan dengan molekul umum: CH₄ (sp³), C₂H₄ (sp²), C₂H₂ (sp).',
      'Melihat sudut ikatan: 109,5°, 120°, 180°.',
    ],
  },
  tryThis: {
    en: [
      'sp³ — methane CH₄ tetrahedral 109.5°.',
      'sp² — ethylene C₂H₄ planar 120° + π bond.',
      'sp — acetylene C₂H₂ linear 180° + 2 π bonds.',
    ],
    id: [
      'sp³ — metana CH₄ tetrahedral 109,5°.',
      'sp² — etilen C₂H₄ planar 120° + ikatan π.',
      'sp — asetilen C₂H₂ linear 180° + 2 ikatan π.',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'A carbon atom has four valence electrons in one 2s orbital and three 2p orbitals. If it bonded with those orbitals as they are, methane would have three bonds at 90° and one odd bond, yet experiment shows four identical C–H bonds at 109.5°. Hybridization is the model chemists use to explain this: the atomic orbitals mix into a new set of equivalent hybrid orbitals, and the number of orbitals that mix decides the shape. Mixing one s with three p orbitals gives four sp³ hybrids pointing to the corners of a tetrahedron, which is exactly the geometry of CH₄.',
        'If only two p orbitals join the s, the result is three sp² hybrids lying in a plane 120° apart, with the third p orbital left unchanged and standing perpendicular to the plane. In ethene, C₂H₄, each carbon uses its three sp² hybrids for sigma bonds (two to hydrogen, one to the other carbon) and the leftover p orbitals on the two carbons overlap sideways to form a pi bond. That pi bond is the second line of the double bond, and it is also why ethene is flat and cannot rotate about the C=C axis. With one s and one p you get two sp hybrids at 180°, leaving two unhybridized p orbitals that form the two pi bonds of a triple bond, as in ethyne, C₂H₂.',
        'The hybrid orbitals point as far from each other as possible because electron pairs repel, so the hybridization and the electron-pair geometry (VSEPR) always agree: four groups are tetrahedral, three trigonal planar, two linear. A useful shortcut is to count sigma bonds and lone pairs on the central atom: four means sp³, three sp², two sp. The same rule works beyond carbon, for example sp³ in NH₃ and H₂O (where lone pairs occupy some hybrids) and sp² in BF₃.',
        'The sim shows the central carbon, its hybrid orbitals as translucent lobes, and a plain atom at the end of each one; choose the hybridization from the menu and rotate the model to check the angles. It deliberately leaves out the unhybridized p orbitals and the pi bonds, the small back lobe each hybrid really has, and the lone-pair cases, so it shows geometry rather than the full electron picture. Remember too that hybridization is a mathematical description that fits the observed shapes, not a physical event that atoms undergo before bonding.',
      ],
      id: [
        'Atom karbon memiliki empat elektron valensi dalam satu orbital 2s dan tiga orbital 2p. Jika karbon berikatan dengan orbital-orbital itu apa adanya, metana akan memiliki tiga ikatan bersudut 90° dan satu ikatan yang berbeda, padahal percobaan menunjukkan empat ikatan C–H identik bersudut 109,5°. Hibridisasi adalah model yang dipakai kimiawan untuk menjelaskannya: orbital-orbital atom bercampur menjadi satu set orbital hibrid yang setara, dan jumlah orbital yang bercampur menentukan bentuknya. Mencampur satu s dengan tiga p menghasilkan empat hibrid sp³ yang mengarah ke sudut-sudut tetrahedron, persis geometri CH₄.',
        'Jika hanya dua orbital p yang bergabung dengan s, hasilnya tiga hibrid sp² yang terletak sebidang dengan sudut 120°, sementara orbital p ketiga dibiarkan tetap dan berdiri tegak lurus bidang itu. Pada etena, C₂H₄, tiap karbon memakai tiga hibrid sp²-nya untuk ikatan sigma (dua ke hidrogen, satu ke karbon lain) dan orbital p yang tersisa pada kedua karbon bertumpang-tindih dari samping membentuk ikatan pi. Ikatan pi itulah garis kedua pada ikatan rangkap dua, dan itu pula sebabnya etena datar dan tidak dapat berputar pada sumbu C=C. Dengan satu s dan satu p diperoleh dua hibrid sp bersudut 180°, menyisakan dua orbital p tak terhibridisasi yang membentuk dua ikatan pi pada ikatan rangkap tiga, seperti pada etuna, C₂H₂.',
        'Orbital hibrid saling menjauh sejauh mungkin karena pasangan elektron saling tolak, sehingga hibridisasi dan geometri pasangan elektron (VSEPR) selalu sejalan: empat kelompok tetrahedral, tiga trigonal planar, dua linear. Jalan pintas yang berguna: hitung ikatan sigma dan pasangan elektron bebas pada atom pusat; empat berarti sp³, tiga sp², dua sp. Aturan yang sama berlaku di luar karbon, misalnya sp³ pada NH₃ dan H₂O (pasangan bebas menempati sebagian hibrid) dan sp² pada BF₃.',
        'Simulasi menampilkan karbon pusat, orbital hibridnya sebagai cuping tembus pandang, dan satu atom polos di ujung masing-masing; pilih hibridisasi dari menu dan putar model untuk memeriksa sudutnya. Simulasi sengaja tidak menampilkan orbital p tak terhibridisasi dan ikatan pi, cuping belakang kecil yang sebenarnya dimiliki tiap hibrid, serta kasus pasangan elektron bebas, sehingga yang ditunjukkan adalah geometri, bukan gambaran elektron selengkapnya. Ingat pula bahwa hibridisasi adalah deskripsi matematis yang cocok dengan bentuk yang teramati, bukan peristiwa fisik yang dialami atom sebelum berikatan.',
      ],
    },
    figure: {
      caption: {
        en: 'Top: the geometry of each hybridization around a carbon atom. Bottom: which orbitals mix. Blue boxes are hybrid orbitals used for sigma bonds; purple boxes are p orbitals left unhybridized, each of which forms one pi bond.',
        id: 'Atas: geometri tiap hibridisasi di sekitar atom karbon. Bawah: orbital mana yang bercampur. Kotak biru adalah orbital hibrid untuk ikatan sigma; kotak ungu adalah orbital p yang tidak terhibridisasi, masing-masing membentuk satu ikatan pi.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        const box = (x, y, c) => `<rect x="${x}" y="${y}" width="16" height="12" rx="2" fill="${c}" opacity=".85"/>`;
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('sp3, sp2 and sp hybridization: geometry and orbital mixing', 'Hibridisasi sp3, sp2, dan sp: geometri dan pencampuran orbital')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.b{stroke:currentColor;stroke-width:2.2;fill:none}.s{font-size:10px}.t{font-weight:700}</style>
  <text x="34" y="20" class="t">sp³ · CH₄</text>
  <text x="152" y="20" class="t">sp² · C₂H₄</text>
  <text x="280" y="20" class="t">sp · C₂H₂</text>
  <path class="b" d="M60 78 V48 M60 78 L36 94 M60 78 L84 94"/>
  <path class="b" d="M60 78 L68 100" stroke-dasharray="3 3"/>
  <circle cx="60" cy="78" r="6" fill="#3b82f6"/>
  <text x="76" y="60" class="s">109.5°</text>
  <text x="22" y="118" class="s">${L('tetrahedral', 'tetrahedral')}</text>
  <path class="b" d="M180 78 V48 M180 78 L154 93 M180 78 L206 93"/>
  <circle cx="180" cy="78" r="6" fill="#3b82f6"/>
  <text x="192" y="68" class="s">120°</text>
  <line x1="180" y1="78" x2="180" y2="60" stroke="#8b5cf6" stroke-width="7" opacity=".45"/>
  <line x1="180" y1="78" x2="180" y2="96" stroke="#8b5cf6" stroke-width="7" opacity=".45"/>
  <text x="138" y="118" class="s">${L('trigonal planar + 1 π', 'trigonal planar + 1 π')}</text>
  <path class="b" d="M270 78 H330"/>
  <circle cx="300" cy="78" r="6" fill="#3b82f6"/>
  <text x="310" y="68" class="s">180°</text>
  <line x1="300" y1="60" x2="300" y2="96" stroke="#8b5cf6" stroke-width="7" opacity=".45"/>
  <line x1="286" y1="68" x2="314" y2="88" stroke="#8b5cf6" stroke-width="7" opacity=".3"/>
  <text x="264" y="118" class="s">${L('linear + 2 π', 'linear + 2 π')}</text>
  <text x="12" y="146" class="s">2s + 3×2p →</text>
  ${box(18, 154, '#3b82f6')}${box(38, 154, '#3b82f6')}${box(58, 154, '#3b82f6')}${box(78, 154, '#3b82f6')}
  <text x="18" y="180" class="s">4 sp³ · 4 σ</text>
  <text x="132" y="146" class="s">2s + 2×2p →</text>
  ${box(138, 154, '#3b82f6')}${box(158, 154, '#3b82f6')}${box(178, 154, '#3b82f6')}${box(204, 154, '#8b5cf6')}
  <text x="138" y="180" class="s">3 sp² · 3 σ</text>
  <text x="200" y="180" class="s" fill="#8b5cf6">1 p · 1 π</text>
  <text x="258" y="146" class="s">2s + 1×2p →</text>
  ${box(264, 154, '#3b82f6')}${box(284, 154, '#3b82f6')}${box(310, 154, '#8b5cf6')}${box(330, 154, '#8b5cf6')}
  <text x="262" y="180" class="s">2 sp · 2 σ</text>
  <text x="306" y="180" class="s" fill="#8b5cf6">2 p · 2 π</text>
  <rect x="18" y="200" width="12" height="10" rx="2" fill="#3b82f6"/>
  <text x="34" y="209" class="s">${L('hybrid orbital: forms a σ bond, sets the shape', 'orbital hibrid: membentuk ikatan σ, menentukan bentuk')}</text>
  <rect x="18" y="218" width="12" height="10" rx="2" fill="#8b5cf6"/>
  <text x="34" y="227" class="s">${L('unhybridized p: overlaps sideways to form a π bond', 'p tak terhibridisasi: tumpang-tindih menyamping membentuk ikatan π')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Hybrid orbitals are mixtures of one s orbital with one, two or three p orbitals; the count of hybrids equals the count of orbitals mixed.',
        'sp³ gives four hybrids at 109.5° (tetrahedral), sp² three at 120° (trigonal planar) and sp two at 180° (linear).',
        'Hybrids form sigma bonds and fix the shape; any p orbitals left over form pi bonds, which make up double and triple bonds.',
        'Count sigma bonds plus lone pairs on an atom: 4 → sp³, 3 → sp², 2 → sp.',
        'Hybridization is a model that explains observed shapes, consistent with VSEPR; it is not a process that happens before bonding.',
      ],
      id: [
        'Orbital hibrid adalah campuran satu orbital s dengan satu, dua, atau tiga orbital p; jumlah hibrid sama dengan jumlah orbital yang dicampur.',
        'sp³ memberi empat hibrid bersudut 109,5° (tetrahedral), sp² tiga bersudut 120° (trigonal planar), dan sp dua bersudut 180° (linear).',
        'Hibrid membentuk ikatan sigma dan menentukan bentuk; orbital p yang tersisa membentuk ikatan pi, yang menyusun ikatan rangkap dua dan tiga.',
        'Hitung ikatan sigma plus pasangan elektron bebas pada suatu atom: 4 → sp³, 3 → sp², 2 → sp.',
        'Hibridisasi adalah model yang menjelaskan bentuk yang teramati, sejalan dengan VSEPR; bukan proses yang terjadi sebelum berikatan.',
      ],
    },
    vocabulary: {
      en: [
        ['Atomic orbital', 'A region around a nucleus where an electron is likely to be found; s orbitals are spherical, p orbitals are dumbbell-shaped along x, y or z.'],
        ['Hybrid orbital', 'An orbital formed by mixing atomic orbitals on the same atom; sp, sp² and sp³ hybrids have one large lobe pointing toward a bonding partner.'],
        ['Sigma (σ) bond', 'A bond formed by head-on overlap along the line joining two nuclei; every single bond, and the first bond of any multiple bond, is sigma.'],
        ['Pi (π) bond', 'A bond formed by sideways overlap of parallel p orbitals above and below the bond axis; the extra bonds in double and triple bonds.'],
        ['Bond angle', 'The angle between two bonds sharing an atom: 109.5° in CH₄, 120° in C₂H₄, 180° in C₂H₂.'],
        ['Tetrahedral', 'Four groups arranged toward the corners of a tetrahedron, the shape that keeps four electron pairs farthest apart.'],
        ['VSEPR', 'Valence shell electron pair repulsion, the rule that electron pairs around an atom arrange themselves as far apart as possible.'],
      ],
      id: [
        ['Orbital atom', 'Daerah di sekitar inti tempat elektron kemungkinan besar berada; orbital s berbentuk bola, orbital p berbentuk balon kembar sepanjang sumbu x, y, atau z.'],
        ['Orbital hibrid', 'Orbital yang terbentuk dari pencampuran orbital-orbital atom pada atom yang sama; hibrid sp, sp², dan sp³ mempunyai satu cuping besar yang mengarah ke pasangan ikatannya.'],
        ['Ikatan sigma (σ)', 'Ikatan dari tumpang-tindih langsung sepanjang garis penghubung dua inti; setiap ikatan tunggal, dan ikatan pertama pada ikatan rangkap, adalah sigma.'],
        ['Ikatan pi (π)', 'Ikatan dari tumpang-tindih menyamping orbital p yang sejajar di atas dan di bawah sumbu ikatan; ikatan tambahan pada ikatan rangkap dua dan tiga.'],
        ['Sudut ikatan', 'Sudut antara dua ikatan yang berbagi satu atom: 109,5° pada CH₄, 120° pada C₂H₄, 180° pada C₂H₂.'],
        ['Tetrahedral', 'Empat kelompok yang tersusun mengarah ke sudut-sudut tetrahedron, bentuk yang menjaga empat pasangan elektron sejauh mungkin.'],
        ['VSEPR', 'Tolakan pasangan elektron kulit valensi, aturan bahwa pasangan elektron di sekitar atom menata diri sejauh mungkin satu sama lain.'],
      ],
    },
    misconceptions: {
      en: [
        ['The superscript in sp³ means three bonds.', 'It means three p orbitals were mixed with one s orbital, producing four hybrids. An sp³ carbon makes four sigma bonds, as in methane.'],
        ['A double bond is two identical bonds.', 'The two bonds are different: one sigma bond from head-on overlap of hybrids and one weaker pi bond from sideways overlap of p orbitals. That is why the pi bond breaks first in addition reactions.'],
        ['Hybridization happens first and then the atom bonds.', 'Hybridization is a mathematical way of describing the orbitals in the finished molecule. An isolated carbon atom is not sp³; the description only makes sense once the bonding partners are there.'],
        ['Hybridization only applies to carbon.', 'Any atom with four electron groups can be described as sp³: nitrogen in NH₃ and oxygen in H₂O are examples, with lone pairs occupying some of the hybrids and squeezing the bond angles below 109.5°.'],
      ],
      id: [
        ['Angka pangkat pada sp³ berarti tiga ikatan.', 'Angka itu berarti tiga orbital p dicampur dengan satu orbital s, menghasilkan empat hibrid. Karbon sp³ membentuk empat ikatan sigma, seperti pada metana.'],
        ['Ikatan rangkap dua adalah dua ikatan yang identik.', 'Kedua ikatan itu berbeda: satu ikatan sigma dari tumpang-tindih langsung orbital hibrid dan satu ikatan pi yang lebih lemah dari tumpang-tindih menyamping orbital p. Itulah sebabnya ikatan pi putus lebih dulu pada reaksi adisi.'],
        ['Hibridisasi terjadi dulu, baru atom berikatan.', 'Hibridisasi adalah cara matematis menggambarkan orbital dalam molekul yang sudah jadi. Atom karbon yang terisolasi bukan sp³; deskripsi itu baru bermakna setelah pasangan ikatannya ada.'],
        ['Hibridisasi hanya berlaku untuk karbon.', 'Atom apa pun dengan empat kelompok elektron dapat digambarkan sebagai sp³: nitrogen pada NH₃ dan oksigen pada H₂O adalah contohnya, dengan pasangan elektron bebas menempati sebagian hibrid dan menekan sudut ikatan di bawah 109,5°.'],
      ],
    },
    realWorld: {
      en: [
        'Diamond is a network of sp³ carbons bonded in all directions, which makes it the hardest natural material; graphite is sheets of sp² carbons whose delocalised pi electrons let it conduct electricity and slide as a lubricant.',
        'The flat, rigid sp² double bond in fats decides their shape: cis double bonds put a kink in unsaturated vegetable oils so they stay liquid, while straight saturated chains pack into solid butter.',
        'Benzene, graphene and carbon nanotubes are all sp² carbon; their pi systems absorb light and carry charge, which is why they appear in dyes, screens and sensors.',
        'The protein backbone is held flat at each amide group because the C–N bond has partial double-bond (sp²) character, a fact that underlies the folding of every protein.',
      ],
      id: [
        'Intan adalah jaringan karbon sp³ yang berikatan ke segala arah, sehingga menjadi bahan alami terkeras; grafit adalah lembaran karbon sp² yang elektron pi terdelokalisasinya membuatnya menghantar listrik dan licin sebagai pelumas.',
        'Ikatan rangkap sp² yang datar dan kaku pada lemak menentukan bentuknya: ikatan rangkap cis membuat tekukan pada minyak nabati tak jenuh sehingga tetap cair, sedangkan rantai jenuh yang lurus bertumpuk rapat menjadi mentega padat.',
        'Benzena, grafena, dan tabung nano karbon semuanya karbon sp²; sistem pi-nya menyerap cahaya dan membawa muatan, itulah sebabnya mereka muncul pada zat warna, layar, dan sensor.',
        'Rangka protein dijaga datar pada setiap gugus amida karena ikatan C–N memiliki sebagian sifat ikatan rangkap (sp²), fakta yang mendasari pelipatan setiap protein.',
      ],
    },
    questions: {
      en: [
        { q: 'Formaldehyde, H₂C=O, has a carbon bonded to two hydrogens and double-bonded to oxygen. What is the hybridization of the carbon and the approximate H–C–H angle?', a: 'The carbon has three sigma bonds (two C–H, one C–O) and no lone pairs, so it is sp² with angles near 120°. The second line of the C=O bond is a pi bond from the unhybridized p orbital.' },
        { q: 'How many sigma and how many pi bonds are there in ethyne, H–C≡C–H?', a: 'Three sigma bonds (two C–H and one C–C, all from sp hybrids) and two pi bonds (from the two unhybridized p orbitals on each carbon). Five bonds in total.' },
        { q: 'Water has four electron pairs around oxygen and is described as sp³, yet its bond angle is 104.5°, not 109.5°. Why?', a: 'Two of the four sp³ hybrids hold lone pairs. Lone pairs are held closer to the nucleus and repel more strongly than bonding pairs, so they push the two O–H bonds slightly closer together.' },
      ],
      id: [
        { q: 'Formaldehida, H₂C=O, memiliki karbon yang berikatan dengan dua hidrogen dan berikatan rangkap dua dengan oksigen. Apa hibridisasi karbonnya dan kira-kira berapa sudut H–C–H?', a: 'Karbon itu memiliki tiga ikatan sigma (dua C–H, satu C–O) dan tidak punya pasangan elektron bebas, jadi sp² dengan sudut sekitar 120°. Garis kedua pada ikatan C=O adalah ikatan pi dari orbital p yang tak terhibridisasi.' },
        { q: 'Berapa ikatan sigma dan berapa ikatan pi pada etuna, H–C≡C–H?', a: 'Tiga ikatan sigma (dua C–H dan satu C–C, semuanya dari hibrid sp) dan dua ikatan pi (dari dua orbital p tak terhibridisasi pada tiap karbon). Total lima ikatan.' },
        { q: 'Air memiliki empat pasangan elektron di sekitar oksigen dan digambarkan sebagai sp³, tetapi sudut ikatannya 104,5°, bukan 109,5°. Mengapa?', a: 'Dua dari empat hibrid sp³ ditempati pasangan elektron bebas. Pasangan bebas berada lebih dekat ke inti dan tolakannya lebih kuat daripada pasangan ikatan, sehingga mendorong kedua ikatan O–H sedikit lebih merapat.' },
      ],
    },
  },
};
