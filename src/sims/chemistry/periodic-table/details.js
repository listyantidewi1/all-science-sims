// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Locate elements by group and period.',
      'Distinguish metals, metalloids, and nonmetals.',
      'Recognize trends across rows and down columns.',
    ],
    id: [
      'Menemukan unsur berdasarkan golongan dan periode.',
      'Membedakan logam, metaloid, dan nonlogam.',
      'Mengenali kecenderungan dalam baris dan kolom.',
    ],
  },
  tryThis: {
    en: [
      'Find the alkali metals — what do they have in common?',
      'Color by state — how many elements are liquid at room temperature?',
      'Locate the noble gases. What pattern do their atomic numbers follow?',
    ],
    id: [
      'Cari logam alkali — apa kesamaan di antara mereka?',
      'Warnai berdasarkan wujud — berapa unsur yang cair pada suhu kamar?',
      'Temukan gas mulia. Pola apa yang terlihat pada nomor atomnya?',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'Everything around you is built from about ninety naturally occurring elements, plus a couple of dozen made in laboratories, 118 in all. Each element is defined by its atomic number, the number of protons in its nucleus: hydrogen has 1, carbon 6, gold 79. In 1869 Dmitri Mendeleev noticed that when the known elements were listed in order of increasing atomic mass, similar properties came back at regular intervals. He arranged them in rows so that similar elements lined up in columns, boldly left gaps for elements nobody had found yet, and predicted their properties. The modern table keeps his idea but orders the elements by proton number.',
        'The rows are called periods and the columns are called groups. Moving one step to the right adds one proton and one electron, and across a whole period the electrons fill up one shell. Elements in the same group have the same number of electrons in their outer shell, and because chemistry is all about outer electrons they behave alike. Group 1, the alkali metals, are soft metals that react violently with water; group 17, the halogens, are reactive nonmetals; group 18, the noble gases, hardly react at all. Metals occupy the left and centre, nonmetals the upper right, and the metalloids form a staircase between them. The two detached rows at the bottom, the lanthanides and actinides, really belong in periods 6 and 7 but are pulled out to keep the table from being very wide.',
        'In the explorer, hover over or tap any element to see its symbol, name, atomic number, atomic mass, category and state at 25 °C, and use the menu to colour the table by category, by state or by period. Atomic masses are not whole numbers because most elements are mixtures of isotopes, atoms with the same number of protons but different numbers of neutrons; chlorine\'s 35.45 is the average of chlorine-35 and chlorine-37 weighted by how common they are. Colouring by state reveals how few gases there are (eleven), how many solids, and that only bromine and mercury are liquid at room temperature; for the heaviest artificial elements the state is listed as unknown because only a few atoms have ever been made.',
        'The table is a map, not a complete description. The explorer does not show electron arrangements, reactivity, atomic size or electronegativity as numbers; you infer them from position. The main trends are that atoms get smaller moving across a period and bigger moving down a group, metals in group 1 become more reactive going down, and nonmetals in group 17 become less reactive going down. Some placements are conventions: hydrogen sits above the alkali metals because it has one outer electron, even though it is a gas and a nonmetal, and the boundaries of the metalloid staircase differ a little from book to book.',
      ],
      id: [
        'Segala sesuatu di sekitarmu tersusun dari sekitar sembilan puluh unsur yang terdapat di alam, ditambah sekitar dua puluhan unsur buatan laboratorium, seluruhnya 118. Tiap unsur ditentukan oleh nomor atomnya, yaitu jumlah proton dalam intinya: hidrogen 1, karbon 6, emas 79. Pada 1869 Dmitri Mendeleev memperhatikan bahwa ketika unsur-unsur yang dikenal diurutkan menurut massa atom yang bertambah, sifat-sifat serupa muncul kembali secara berkala. Ia menyusunnya dalam baris sehingga unsur-unsur yang serupa berjajar dalam kolom, dengan berani mengosongkan tempat bagi unsur yang belum ditemukan, dan meramalkan sifat-sifatnya. Tabel modern mempertahankan gagasannya tetapi mengurutkan unsur menurut jumlah proton.',
        'Barisnya disebut periode dan kolomnya disebut golongan. Bergeser satu langkah ke kanan menambah satu proton dan satu elektron, dan sepanjang satu periode elektron mengisi penuh satu kulit. Unsur-unsur dalam golongan yang sama memiliki jumlah elektron kulit terluar yang sama, dan karena kimia berkaitan dengan elektron terluar, mereka berperilaku serupa. Golongan 1, logam alkali, adalah logam lunak yang bereaksi hebat dengan air; golongan 17, halogen, adalah nonlogam yang reaktif; golongan 18, gas mulia, hampir tidak bereaksi. Logam menempati bagian kiri dan tengah, nonlogam kanan atas, dan metaloid membentuk anak tangga di antaranya. Dua baris terpisah di bawah, lantanida dan aktinida, sesungguhnya termasuk periode 6 dan 7 tetapi dikeluarkan agar tabel tidak terlalu lebar.',
        'Di penjelajah ini, arahkan kursor atau ketuk unsur mana pun untuk melihat lambang, nama, nomor atom, massa atom, kategori, dan wujudnya pada 25 °C, dan gunakan menu untuk mewarnai tabel menurut kategori, wujud, atau periode. Massa atom bukan bilangan bulat karena sebagian besar unsur adalah campuran isotop, yaitu atom dengan jumlah proton sama tetapi jumlah neutron berbeda; massa klorin 35,45 adalah rata-rata klorin-35 dan klorin-37 yang ditimbang menurut kelimpahannya. Pewarnaan menurut wujud memperlihatkan betapa sedikit gas (sebelas), betapa banyak padatan, dan bahwa hanya bromin dan raksa yang cair pada suhu kamar; untuk unsur buatan terberat wujudnya ditulis tidak diketahui karena hanya beberapa atom yang pernah dibuat.',
        'Tabel ini adalah peta, bukan gambaran lengkap. Penjelajah tidak menampilkan susunan elektron, kereaktifan, ukuran atom, atau keelektronegatifan sebagai angka; kamu menyimpulkannya dari posisi. Kecenderungan utamanya: atom makin kecil bergerak ke kanan dalam satu periode dan makin besar bergerak ke bawah dalam satu golongan, logam golongan 1 makin reaktif ke bawah, dan nonlogam golongan 17 makin kurang reaktif ke bawah. Beberapa penempatan adalah kesepakatan: hidrogen diletakkan di atas logam alkali karena memiliki satu elektron terluar, meskipun ia gas dan nonlogam, dan batas anak tangga metaloid sedikit berbeda dari buku ke buku.',
      ],
    },
    figure: {
      caption: {
        en: 'The shape of the table. Each row (period) fills one electron shell; each column (group) shares the same number of outer electrons, so its elements behave alike. The staircase marks the metalloids between metals (left) and nonmetals (right).',
        id: 'Bentuk tabel. Tiap baris (periode) mengisi satu kulit elektron; tiap kolom (golongan) memiliki jumlah elektron terluar yang sama, sehingga unsur-unsurnya berperilaku serupa. Anak tangga menandai metaloid di antara logam (kiri) dan nonlogam (kanan).',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Layout of the periodic table', 'Tata letak tabel periodik')}">
  <style>text{font:12px system-ui,sans-serif;fill:currentColor}.m{fill:none;stroke:currentColor;stroke-width:1.2;opacity:.45}.s{font-size:9px;opacity:.85}.t{font-size:8px;opacity:.7}</style>
  <line x1="72" y1="38" x2="300" y2="38" class="m" marker-end="url(#g)"/>
  <text x="76" y="31" class="s">${L('across a period: +1 proton each step, same shell', 'sepanjang periode: +1 proton tiap langkah, kulit sama')}</text>
  <line x1="26" y1="66" x2="26" y2="162" class="m" marker-end="url(#g)"/>
  <text transform="rotate(-90 16 114)" x="16" y="114" class="s" text-anchor="middle">${L('down a group: +1 shell, similar chemistry', 'menuruni golongan: +1 kulit, sifat serupa')}</text>
  <text x="44" y="47" class="t">1</text><text x="313" y="47" class="t">18</text>
  <text x="31" y="62" class="t">1</text><text x="31" y="78" class="t">2</text><text x="31" y="94" class="t">3</text><text x="31" y="110" class="t">4</text><text x="31" y="126" class="t">5</text><text x="31" y="142" class="t">6</text><text x="31" y="158" class="t">7</text>
  <rect x="40" y="50" width="16" height="16" fill="#10b981"/>
  <text x="44" y="62" class="t">H</text>
  <rect x="312" y="50" width="16" height="16" fill="#8b5cf6"/>
  <rect x="40" y="66" width="16" height="96" fill="#ef4444"/>
  <rect x="56" y="66" width="16" height="96" fill="#f59e0b"/>
  <rect x="72" y="98" width="160" height="64" fill="#3b82f6"/>
  <text x="118" y="134" class="s">${L('transition metals', 'logam transisi')}</text>
  <rect x="232" y="66" width="64" height="96" fill="currentColor" opacity=".12"/>
  <rect x="296" y="66" width="16" height="80" fill="#10b981"/>
  <rect x="296" y="146" width="16" height="16" fill="currentColor" opacity=".12"/>
  <rect x="312" y="66" width="16" height="96" fill="#8b5cf6"/>
  <path d="M232 66 L232 82 L248 82 L248 98 L264 98 L264 114 L280 114 L280 130 L296 130 L296 146" fill="none" stroke="currentColor" stroke-width="1.8" stroke-dasharray="3 2"/>
  <text x="252" y="78" class="s">${L('nonmetals', 'nonlogam')}</text>
  <text x="236" y="158" class="s">${L('metalloids ↑', 'metaloid ↑')}</text>
  <text x="76" y="92" class="s">${L('metals: left and centre', 'logam: kiri dan tengah')}</text>
  <rect x="72" y="175" width="224" height="16" fill="currentColor" opacity=".25"/>
  <rect x="72" y="191" width="224" height="16" fill="currentColor" opacity=".16"/>
  <text x="130" y="187" class="s">${L('lanthanides (period 6)', 'lantanida (periode 6)')}</text>
  <text x="134" y="203" class="s">${L('actinides (period 7)', 'aktinida (periode 7)')}</text>
  <rect x="40" y="217" width="8" height="8" fill="#ef4444"/><text x="52" y="225" class="s">${L('alkali', 'alkali')}</text>
  <rect x="92" y="217" width="8" height="8" fill="#f59e0b"/><text x="104" y="225" class="s">${L('alkaline earth', 'alkali tanah')}</text>
  <rect x="176" y="217" width="8" height="8" fill="#3b82f6"/><text x="188" y="225" class="s">${L('transition', 'transisi')}</text>
  <rect x="240" y="217" width="8" height="8" fill="#10b981"/><text x="252" y="225" class="s">${L('halogens, H', 'halogen, H')}</text>
  <rect x="306" y="217" width="8" height="8" fill="#8b5cf6"/><text x="318" y="225" class="s">${L('noble', 'mulia')}</text>
  <defs><marker id="g" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="context-stroke"/></marker></defs>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Elements are ordered by atomic number, the number of protons, and each element has a unique one.',
        'Elements in the same group have the same number of outer electrons and therefore similar chemical behaviour.',
        'Each period corresponds to filling one electron shell, so period number tells you how many shells an atom has.',
        'Metals sit on the left and centre, nonmetals on the upper right, and metalloids along the staircase between them.',
        'Properties change in regular trends: atoms shrink across a period and grow down a group, and reactivity changes predictably within a group.',
      ],
      id: [
        'Unsur diurutkan menurut nomor atom, yaitu jumlah proton, dan tiap unsur memiliki nomor yang unik.',
        'Unsur-unsur dalam golongan yang sama memiliki jumlah elektron terluar yang sama sehingga perilaku kimianya serupa.',
        'Tiap periode sesuai dengan pengisian satu kulit elektron, sehingga nomor periode memberi tahu berapa kulit yang dimiliki atom.',
        'Logam berada di kiri dan tengah, nonlogam di kanan atas, dan metaloid di sepanjang anak tangga di antaranya.',
        'Sifat berubah mengikuti kecenderungan teratur: atom mengecil ke kanan dalam periode dan membesar ke bawah dalam golongan, dan kereaktifan berubah secara teratur dalam satu golongan.',
      ],
    },
    vocabulary: {
      en: [
        ['Atomic number (Z)', 'The number of protons in an atom\'s nucleus; it identifies the element and sets its place in the table.'],
        ['Atomic mass', 'The average mass of an element\'s atoms, in atomic mass units, weighted over its natural isotopes.'],
        ['Isotopes', 'Atoms of the same element with different numbers of neutrons, such as carbon-12 and carbon-14.'],
        ['Period', 'A horizontal row; all elements in a period have the same number of electron shells.'],
        ['Group', 'A vertical column; elements in a group have the same number of outer electrons and similar properties.'],
        ['Metalloid', 'An element such as silicon or arsenic with properties between metals and nonmetals, found along the staircase line.'],
        ['Noble gas', 'A group 18 element with a full outer shell, which makes it almost completely unreactive.'],
      ],
      id: [
        ['Nomor atom (Z)', 'Jumlah proton dalam inti atom; menentukan jenis unsur dan tempatnya di tabel.'],
        ['Massa atom', 'Massa rata-rata atom suatu unsur, dalam satuan massa atom, ditimbang menurut isotop alaminya.'],
        ['Isotop', 'Atom-atom unsur yang sama dengan jumlah neutron berbeda, misalnya karbon-12 dan karbon-14.'],
        ['Periode', 'Baris mendatar; semua unsur dalam satu periode memiliki jumlah kulit elektron yang sama.'],
        ['Golongan', 'Kolom tegak; unsur-unsur dalam satu golongan memiliki jumlah elektron terluar yang sama dan sifat yang serupa.'],
        ['Metaloid', 'Unsur seperti silikon atau arsen dengan sifat di antara logam dan nonlogam, terletak di sepanjang garis anak tangga.'],
        ['Gas mulia', 'Unsur golongan 18 dengan kulit terluar penuh, yang membuatnya hampir sama sekali tidak reaktif.'],
      ],
    },
    misconceptions: {
      en: [
        ['The elements are arranged in order of atomic mass.', 'They are arranged by atomic number (protons). Mass usually increases too, but not always: tellurium (52) is heavier than iodine (53), and the table keeps iodine with the other halogens.'],
        ['Elements next to each other in a row have similar properties.', 'Neighbours in a row can be very different: sodium is a soft reactive metal and the next element, magnesium, is a much harder one; a few steps further, chlorine is a poisonous gas. Similar properties run down the columns.'],
        ['Most elements are gases or liquids.', 'The great majority are solid metals. At room temperature only eleven elements are gases and only two, bromine and mercury, are liquids.'],
        ['The lanthanides and actinides are outside the real table.', 'They belong to periods 6 and 7, between groups 2 and 3. They are drawn below only to save space; some posters show the full 32-column version.'],
      ],
      id: [
        ['Unsur-unsur disusun menurut urutan massa atom.', 'Unsur disusun menurut nomor atom (jumlah proton). Massa biasanya ikut bertambah, tetapi tidak selalu: telurium (52) lebih berat daripada iodin (53), dan tabel tetap menempatkan iodin bersama halogen lainnya.'],
        ['Unsur yang bersebelahan dalam satu baris sifatnya serupa.', 'Tetangga dalam satu baris bisa sangat berbeda: natrium adalah logam lunak yang reaktif dan unsur berikutnya, magnesium, jauh lebih keras; beberapa langkah lagi, klorin adalah gas beracun. Sifat yang serupa justru menurun di kolom.'],
        ['Sebagian besar unsur berwujud gas atau cair.', 'Sebagian besar justru logam padat. Pada suhu kamar hanya sebelas unsur berwujud gas dan hanya dua, bromin dan raksa, yang cair.'],
        ['Lantanida dan aktinida berada di luar tabel yang sebenarnya.', 'Keduanya termasuk periode 6 dan 7, di antara golongan 2 dan 3. Keduanya digambar di bawah hanya untuk menghemat tempat; beberapa poster menampilkan versi lengkap 32 kolom.'],
      ],
    },
    realWorld: {
      en: [
        'Table salt is sodium chloride: a group 1 metal that gives away one electron paired with a group 17 nonmetal that takes one, which is why the two groups combine so readily.',
        'Silicon, a metalloid on the staircase, conducts electricity just well enough to be controlled, which is what makes computer chips and solar cells possible.',
        'Helium, neon and argon are used in balloons, signs and light bulbs precisely because, as noble gases, they refuse to react with anything.',
        'Mendeleev\'s gaps were filled by gallium (1875) and germanium (1886), whose properties matched his predictions closely and convinced chemists the table was real.',
      ],
      id: [
        'Garam dapur adalah natrium klorida: logam golongan 1 yang melepaskan satu elektron berpasangan dengan nonlogam golongan 17 yang menerimanya; itulah sebabnya kedua golongan ini begitu mudah bersenyawa.',
        'Silikon, metaloid di anak tangga, menghantarkan listrik secukupnya untuk bisa dikendalikan, dan inilah yang memungkinkan cip komputer dan sel surya.',
        'Helium, neon, dan argon dipakai untuk balon, papan reklame, dan bola lampu justru karena, sebagai gas mulia, mereka menolak bereaksi dengan apa pun.',
        'Tempat kosong Mendeleev diisi oleh galium (1875) dan germanium (1886), yang sifatnya sangat cocok dengan ramalannya dan meyakinkan para kimiawan bahwa tabel itu nyata.',
      ],
    },
    questions: {
      en: [
        { q: 'Which element is in period 3, group 2? How many electron shells does it have and how many outer electrons?', a: 'Magnesium (Mg, atomic number 12). Period 3 means three electron shells, and group 2 means two electrons in the outer shell, which is why it behaves like calcium directly below it.' },
        { q: 'Chlorine\'s atomic mass is 35.45, not a whole number. Why?', a: 'Natural chlorine is a mixture of two isotopes: about three quarters is chlorine-35 and one quarter is chlorine-37. The atomic mass is the weighted average, which lands between the two at 35.45.' },
        { q: 'Sodium and potassium both fizz violently in water. Where are they in the table, and which do you expect to be more reactive?', a: 'Both are in group 1, the alkali metals, with a single easily lost outer electron. Potassium is one period lower, so its outer electron is farther from the nucleus and more weakly held, making potassium the more reactive of the two.' },
      ],
      id: [
        { q: 'Unsur apa yang berada di periode 3, golongan 2? Berapa kulit elektronnya dan berapa elektron terluarnya?', a: 'Magnesium (Mg, nomor atom 12). Periode 3 berarti tiga kulit elektron, dan golongan 2 berarti dua elektron di kulit terluar; itulah sebabnya ia berperilaku seperti kalsium yang tepat di bawahnya.' },
        { q: 'Massa atom klorin adalah 35,45, bukan bilangan bulat. Mengapa?', a: 'Klorin alami adalah campuran dua isotop: sekitar tiga perempat klorin-35 dan seperempat klorin-37. Massa atomnya adalah rata-rata tertimbang, yang jatuh di antara keduanya pada 35,45.' },
        { q: 'Natrium dan kalium sama-sama berdesis hebat dalam air. Di mana keduanya dalam tabel, dan mana yang kamu duga lebih reaktif?', a: 'Keduanya berada di golongan 1, logam alkali, dengan satu elektron terluar yang mudah lepas. Kalium berada satu periode lebih bawah, sehingga elektron terluarnya lebih jauh dari inti dan lebih lemah terikat; kalium pun lebih reaktif.' },
      ],
    },
  },
};
