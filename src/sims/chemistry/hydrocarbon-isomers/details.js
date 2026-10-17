// Long-form text for the sim page aside, kept out of manifest.js.
export default {
  objectives: {
    en: [
      'Derive the molecular formula of a hydrocarbon from its structure by giving every carbon four bonds and counting hydrogens, and recognise the general formulas CₙH₂ₙ₊₂ (alkanes), CₙH₂ₙ (alkenes) and CₙH₂ₙ₋₂ (alkynes).',
      'Name straight-chain and simply branched alkanes, alkenes and alkynes by IUPAC rules: root for chain length, suffix for bond type, lowest locants for the multiple bond and then for substituents.',
      'Explain structural isomerism and state how fast the number of alkane isomers grows (1, 1, 1, 2, 3, 5, 9, 18 for C₁ to C₈).',
    ],
    id: [
      'Menurunkan rumus molekul hidrokarbon dari strukturnya dengan memberi setiap karbon empat ikatan dan menghitung hidrogen, serta mengenali rumus umum CₙH₂ₙ₊₂ (alkana), CₙH₂ₙ (alkena), dan CₙH₂ₙ₋₂ (alkuna).',
      'Menamai alkana, alkena, dan alkuna rantai lurus dan bercabang sederhana menurut aturan IUPAC: akar untuk panjang rantai, akhiran untuk jenis ikatan, nomor terkecil untuk ikatan rangkap lalu untuk substituen.',
      'Menjelaskan isomer struktur dan menyebutkan seberapa cepat jumlah isomer alkana bertambah (1, 1, 1, 2, 3, 5, 9, 18 untuk C₁ sampai C₈).',
    ],
  },
  tryThis: {
    en: [
      'Build butane (4 carbons, single bonds), then click +CH₃ above C2. The formula stays C₄H₁₀ but the name becomes 2-methylpropane: two structural isomers.',
      'Build all five C₆H₁₄ isomers: hexane, 2-methylpentane, 3-methylpentane, 2,2-dimethylbutane, 2,3-dimethylbutane. Check each against the table.',
      'Make a 4-carbon chain and click the C3–C4 bond to a double bond. The name is but-1-ene, not but-3-ene: the sim numbers from the end nearest the double bond.',
      'Put a methyl on C2 of propane and then try to make the C1–C2 bond triple. The sim refuses: C2 would need five bonds. Why does a double bond work?',
    ],
    id: [
      'Bangun butana (4 karbon, ikatan tunggal), lalu klik +CH₃ di atas C2. Rumusnya tetap C₄H₁₀ tetapi namanya menjadi 2-metilpropana: dua isomer struktur.',
      'Bangun kelima isomer C₆H₁₄: heksana, 2-metilpentana, 3-metilpentana, 2,2-dimetilbutana, 2,3-dimetilbutana. Periksa masing-masing dengan tabel.',
      'Buat rantai 4 karbon dan klik ikatan C3–C4 menjadi rangkap dua. Namanya but-1-ena, bukan but-3-ena: simulasi menomori dari ujung yang terdekat dengan ikatan rangkap.',
      'Letakkan metil pada C2 propana lalu coba jadikan ikatan C1–C2 rangkap tiga. Simulasi menolak: C2 akan memerlukan lima ikatan. Mengapa rangkap dua masih bisa?',
    ],
  },

  learn: {
    background: {
      en: [
        'Carbon has four valence electrons and almost always makes exactly four bonds, to other carbons or to hydrogen. That single rule generates the whole family of hydrocarbons. In a chain joined only by single bonds, an end carbon carries three hydrogens (CH₃), a middle carbon two (CH₂), a carbon with one branch one (CH), and a carbon with two branches none. Adding up the hydrogens gives H = 2C + 2 for every such molecule, the alkane formula CₙH₂ₙ₊₂: CH₄, C₂H₆, C₃H₈, C₄H₁₀ and so on. Each double bond uses two bonding positions that would otherwise hold hydrogens, so an alkene with one double bond has CₙH₂ₙ and an alkyne with one triple bond has CₙH₂ₙ₋₂. The quantity (2C + 2 − H)/2 counts these "degrees of unsaturation" and the sim displays it.',
        'IUPAC names encode the structure. The root gives the length of the longest chain: meth (1), eth (2), prop (3), but (4), pent (5), hex (6), hept (7), oct (8). The suffix gives the bond type: -ane for all single bonds, -ene for a double bond, -yne for a triple bond, with a locant showing where the multiple bond starts (but-2-ene has its double bond between C2 and C3). Substituents such as methyl (CH₃) are listed in front with their position, and repeated groups take di-, tri-, tetra- (2,2-dimethylpropane). The chain is numbered from the end that gives the multiple bond the lowest number; if there is no multiple bond, from the end that gives the substituents the lowest numbers. The sim applies exactly these rules, so 4-carbon chain with CH₃ on C3 is renamed 2-methylbutane.',
        'Molecules with the same molecular formula but different connectivity are structural isomers, and they are different substances. Butane (b.p. −0.5 °C) and 2-methylpropane (b.p. −11.7 °C) are both C₄H₁₀. Branching lowers the boiling point because compact molecules have less surface contact and weaker dispersion forces; pentane boils at 36 °C, 2-methylbutane at 28 °C and 2,2-dimethylpropane at 9.5 °C. The number of alkane isomers grows explosively with chain length: 1, 1, 1, 2, 3, 5, 9, 18 for C₁ to C₈, then 35, 75, 159, and 366,319 for C₂₀. The sim\'s grid allows only methyl branches on an 8-carbon main chain, so it cannot build every isomer (3-ethylpentane, for example), but it can build all of them up to C₆.',
        'Unsaturated hydrocarbons have isomers of their own. The double bond in C₄H₈ can sit at C1 (but-1-ene), at C2 (but-2-ene) or on a branched skeleton (2-methylpropene): three structural isomers, and but-2-ene additionally exists as cis and trans forms that the flat grid cannot distinguish. The sim\'s isomer counts therefore apply to alkanes only. A carbon can never exceed four bonds, so the builder refuses, for example, a triple bond on a carbon that already carries a methyl branch and another chain neighbour.',
      ],
      id: [
        'Karbon memiliki empat elektron valensi dan hampir selalu membentuk tepat empat ikatan, dengan karbon lain atau dengan hidrogen. Satu aturan itu melahirkan seluruh keluarga hidrokarbon. Pada rantai yang hanya dihubungkan ikatan tunggal, karbon ujung mengikat tiga hidrogen (CH₃), karbon tengah dua (CH₂), karbon dengan satu cabang satu (CH), dan karbon dengan dua cabang tidak ada. Menjumlahkan hidrogen memberi H = 2C + 2 untuk setiap molekul seperti itu, rumus alkana CₙH₂ₙ₊₂: CH₄, C₂H₆, C₃H₈, C₄H₁₀, dan seterusnya. Setiap ikatan rangkap dua memakai dua posisi ikatan yang seharusnya untuk hidrogen, sehingga alkena dengan satu ikatan rangkap dua berumus CₙH₂ₙ dan alkuna dengan satu ikatan rangkap tiga berumus CₙH₂ₙ₋₂. Besaran (2C + 2 − H)/2 menghitung "derajat ketidakjenuhan" ini dan simulasi menampilkannya.',
        'Nama IUPAC mengodekan struktur. Akar kata menyatakan panjang rantai terpanjang: met (1), et (2), prop (3), but (4), pent (5), heks (6), hept (7), okt (8). Akhiran menyatakan jenis ikatan: -ana untuk semua ikatan tunggal, -ena untuk ikatan rangkap dua, -una untuk rangkap tiga, dengan nomor yang menunjukkan di mana ikatan rangkap dimulai (but-2-ena berikatan rangkap antara C2 dan C3). Substituen seperti metil (CH₃) dicantumkan di depan beserta posisinya, dan gugus yang berulang memakai di-, tri-, tetra- (2,2-dimetilpropana). Rantai dinomori dari ujung yang memberi ikatan rangkap nomor terkecil; jika tidak ada ikatan rangkap, dari ujung yang memberi substituen nomor terkecil. Simulasi menerapkan aturan ini persis, sehingga rantai 4 karbon dengan CH₃ pada C3 dinamai ulang 2-metilbutana.',
        'Molekul dengan rumus molekul sama tetapi keterhubungan berbeda adalah isomer struktur, dan keduanya zat yang berbeda. Butana (t.d. −0,5 °C) dan 2-metilpropana (t.d. −11,7 °C) sama-sama C₄H₁₀. Percabangan menurunkan titik didih karena molekul yang ringkas memiliki kontak permukaan lebih sedikit dan gaya dispersi lebih lemah; pentana mendidih pada 36 °C, 2-metilbutana pada 28 °C, dan 2,2-dimetilpropana pada 9,5 °C. Jumlah isomer alkana meledak seiring panjang rantai: 1, 1, 1, 2, 3, 5, 9, 18 untuk C₁ sampai C₈, lalu 35, 75, 159, dan 366.319 untuk C₂₀. Kisi simulasi hanya mengizinkan cabang metil pada rantai utama 8 karbon, sehingga tidak dapat membangun semua isomer (misalnya 3-etilpentana), tetapi dapat membangun semuanya hingga C₆.',
        'Hidrokarbon tak jenuh memiliki isomer tersendiri. Ikatan rangkap dalam C₄H₈ dapat berada di C1 (but-1-ena), di C2 (but-2-ena), atau pada kerangka bercabang (2-metilpropena): tiga isomer struktur, dan but-2-ena juga hadir sebagai bentuk cis dan trans yang tidak dapat dibedakan oleh kisi datar. Jumlah isomer di simulasi karenanya hanya berlaku untuk alkana. Karbon tidak pernah melebihi empat ikatan, sehingga pembangun menolak, misalnya, ikatan rangkap tiga pada karbon yang sudah membawa cabang metil dan satu tetangga rantai lagi.',
      ],
    },
    figure: {
      caption: {
        en: 'The three structural isomers of C₅H₁₂ drawn as condensed structures. Every carbon has four bonds; the hydrogens are what is left over. Branching shortens the longest chain (5 → 4 → 3 carbons) and lowers the boiling point from 36 °C to 9.5 °C.',
        id: 'Tiga isomer struktur C₅H₁₂ digambar sebagai struktur ringkas. Setiap karbon memiliki empat ikatan; hidrogen adalah sisanya. Percabangan memperpendek rantai terpanjang (5 → 4 → 3 karbon) dan menurunkan titik didih dari 36 °C menjadi 9,5 °C.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        const box = (x, y, t, c = 'currentColor') => `<rect x="${x - 17}" y="${y - 10}" width="34" height="20" rx="4" fill="none" stroke="${c}" stroke-width="1"/><text x="${x}" y="${y + 4}" class="c">${t}</text>`;
        const h = (x1, x2, y) => `<line x1="${x1 + 17}" y1="${y}" x2="${x2 - 17}" y2="${y}" class="b"/>`;
        const v = (x, y1, y2) => `<line x1="${x}" y1="${y1 + 10}" x2="${x}" y2="${y2 - 10}" class="b"/>`;
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Pentane, 2-methylbutane and 2,2-dimethylpropane', 'Pentana, 2-metilbutana, dan 2,2-dimetilpropana')}">
  <style>text{font:10px system-ui,sans-serif;fill:currentColor}.c{font:bold 10px system-ui,sans-serif;fill:currentColor;text-anchor:middle}.t{font:bold 11px system-ui,sans-serif;fill:currentColor;text-anchor:middle}.b{stroke:currentColor;stroke-width:1.6}.n{font:10px system-ui,sans-serif;fill:currentColor;text-anchor:middle;opacity:.75}</style>
  <text x="180" y="16" class="t">C₅H₁₂ · ${L('3 structural isomers', '3 isomer struktur')}</text>
  <text x="180" y="40" class="n">${L('pentane', 'pentana')} · ${L('b.p.', 't.d.')} 36 °C</text>
  ${box(80, 60, 'CH₃')}${box(130, 60, 'CH₂')}${box(180, 60, 'CH₂')}${box(230, 60, 'CH₂')}${box(280, 60, 'CH₃')}
  ${h(80, 130, 60)}${h(130, 180, 60)}${h(180, 230, 60)}${h(230, 280, 60)}
  <text x="90" y="110" class="n">${L('2-methylbutane', '2-metilbutana')} · 28 °C</text>
  ${box(40, 150, 'CH₃')}${box(90, 150, 'CH')}${box(140, 150, 'CH₂')}${box(190, 150, 'CH₃')}
  ${h(40, 90, 150)}${h(90, 140, 150)}${h(140, 190, 150)}
  ${box(90, 118, 'CH₃', '#fb923c')}${v(90, 118, 150)}
  <text x="280" y="110" class="n">2,2-${L('dimethylpropane', 'dimetilpropana')} · 9.5 °C</text>
  ${box(230, 150, 'CH₃')}${box(280, 150, 'C')}${box(330, 150, 'CH₃')}
  ${h(230, 280, 150)}${h(280, 330, 150)}
  ${box(280, 118, 'CH₃', '#fb923c')}${v(280, 118, 150)}
  ${box(280, 182, 'CH₃', '#fb923c')}${v(280, 150, 182)}
  <text x="180" y="222" class="n">${L('same formula, different connectivity → different boiling points', 'rumus sama, keterhubungan berbeda → titik didih berbeda')}</text>
  <text x="180" y="236" class="n">${L('orange boxes: methyl branches', 'kotak oranye: cabang metil')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Every carbon makes four bonds; hydrogens fill whatever is left, so the formula follows from the skeleton: H = 2C + 2 − 2(double bonds) − 4(triple bonds).',
        'General formulas: alkanes CₙH₂ₙ₊₂ (saturated), alkenes with one C=C CₙH₂ₙ, alkynes with one C≡C CₙH₂ₙ₋₂ (unsaturated).',
        'IUPAC name = substituent locants and names + root for the longest chain (meth…oct) + suffix -ane / -ene / -yne with the locant of the multiple bond.',
        'Number the chain so the multiple bond gets the lowest number first, then the substituents; repeated substituents use di-, tri-, tetra- and list every locant (2,2-dimethyl).',
        'Structural isomers share a formula but differ in connectivity; the alkane count rises 1, 1, 1, 2, 3, 5, 9, 18 from C₁ to C₈.',
        'Branching lowers the boiling point of isomers (pentane 36 °C, 2-methylbutane 28 °C, 2,2-dimethylpropane 9.5 °C) because compact molecules have weaker dispersion forces.',
      ],
      id: [
        'Setiap karbon membentuk empat ikatan; hidrogen mengisi sisanya, sehingga rumus mengikuti kerangka: H = 2C + 2 − 2(ikatan rangkap dua) − 4(ikatan rangkap tiga).',
        'Rumus umum: alkana CₙH₂ₙ₊₂ (jenuh), alkena dengan satu C=C CₙH₂ₙ, alkuna dengan satu C≡C CₙH₂ₙ₋₂ (tak jenuh).',
        'Nama IUPAC = nomor dan nama substituen + akar untuk rantai terpanjang (met…okt) + akhiran -ana / -ena / -una dengan nomor ikatan rangkap.',
        'Nomori rantai agar ikatan rangkap mendapat nomor terkecil dahulu, lalu substituen; substituen berulang memakai di-, tri-, tetra- dan menyebut setiap nomor (2,2-dimetil).',
        'Isomer struktur berumus sama tetapi keterhubungannya berbeda; jumlah alkana naik 1, 1, 1, 2, 3, 5, 9, 18 dari C₁ sampai C₈.',
        'Percabangan menurunkan titik didih isomer (pentana 36 °C, 2-metilbutana 28 °C, 2,2-dimetilpropana 9,5 °C) karena molekul yang ringkas memiliki gaya dispersi lebih lemah.',
      ],
    },
    vocabulary: {
      en: [
        ['Hydrocarbon', 'A compound containing only carbon and hydrogen.'],
        ['Alkane', 'A hydrocarbon with only single bonds; general formula CₙH₂ₙ₊₂; names end in -ane.'],
        ['Alkene / alkyne', 'Hydrocarbons containing a C=C double bond (-ene, CₙH₂ₙ) or a C≡C triple bond (-yne, CₙH₂ₙ₋₂).'],
        ['Saturated / unsaturated', 'Saturated molecules have the maximum number of hydrogens (only single bonds); unsaturated ones contain double or triple bonds and can add more hydrogen.'],
        ['Structural isomers', 'Compounds with the same molecular formula but a different order of connection between atoms.'],
        ['Locant', 'The number in a name that says which carbon carries a substituent or starts a multiple bond, e.g. the 2 in but-2-ene.'],
        ['Methyl group', 'A –CH₃ branch attached to a chain carbon; the simplest alkyl substituent.'],
      ],
      id: [
        ['Hidrokarbon', 'Senyawa yang hanya mengandung karbon dan hidrogen.'],
        ['Alkana', 'Hidrokarbon dengan ikatan tunggal saja; rumus umum CₙH₂ₙ₊₂; namanya berakhiran -ana.'],
        ['Alkena / alkuna', 'Hidrokarbon yang mengandung ikatan rangkap dua C=C (-ena, CₙH₂ₙ) atau ikatan rangkap tiga C≡C (-una, CₙH₂ₙ₋₂).'],
        ['Jenuh / tak jenuh', 'Molekul jenuh memiliki jumlah hidrogen maksimum (ikatan tunggal saja); molekul tak jenuh mengandung ikatan rangkap dua atau tiga dan dapat mengikat hidrogen tambahan.'],
        ['Isomer struktur', 'Senyawa dengan rumus molekul sama tetapi urutan sambungan antar atomnya berbeda.'],
        ['Nomor posisi (lokan)', 'Angka dalam nama yang menyatakan karbon mana yang membawa substituen atau memulai ikatan rangkap, misalnya 2 pada but-2-ena.'],
        ['Gugus metil', 'Cabang –CH₃ yang terikat pada karbon rantai; substituen alkil paling sederhana.'],
      ],
    },
    misconceptions: {
      en: [
        ['Isomers are just the same molecule drawn differently.', 'Rotating or redrawing a molecule does not make an isomer. 2-methylbutane written with the branch below the chain is still 2-methylbutane. Isomers differ in which atom is bonded to which, and they have different boiling points and densities.'],
        ['A methyl group on the first carbon makes a branched isomer.', 'A CH₃ on an end carbon simply extends the chain: "1-methylbutane" is pentane. That is why the sim only accepts branches on inner carbons.'],
        ['In but-2-ene the "2" means there are two double bonds.', 'The locant gives the position: the double bond starts at carbon 2. Two double bonds would be shown with di-, as in buta-1,3-diene.'],
        ['More carbon atoms always means more hydrogen atoms.', 'Not across classes: C₄H₆ (buta-1,3-diene) has fewer hydrogens than C₃H₈ (propane). Multiple bonds remove two hydrogens each.'],
      ],
      id: [
        ['Isomer hanyalah molekul yang sama yang digambar berbeda.', 'Memutar atau menggambar ulang molekul tidak membuat isomer. 2-metilbutana yang cabangnya ditulis di bawah rantai tetap 2-metilbutana. Isomer berbeda pada atom mana yang terikat dengan mana, dan titik didih serta massa jenisnya berbeda.'],
        ['Gugus metil pada karbon pertama membuat isomer bercabang.', 'CH₃ pada karbon ujung hanya memperpanjang rantai: "1-metilbutana" adalah pentana. Itulah sebabnya simulasi hanya menerima cabang pada karbon dalam.'],
        ['Pada but-2-ena angka "2" berarti ada dua ikatan rangkap.', 'Nomor itu menyatakan posisi: ikatan rangkap dimulai pada karbon 2. Dua ikatan rangkap ditunjukkan dengan di-, seperti pada buta-1,3-diena.'],
        ['Lebih banyak atom karbon selalu berarti lebih banyak atom hidrogen.', 'Tidak antar golongan: C₄H₆ (buta-1,3-diena) memiliki lebih sedikit hidrogen daripada C₃H₈ (propana). Setiap ikatan rangkap mengurangi dua hidrogen.'],
      ],
    },
    realWorld: {
      en: [
        'Petrol is rated by octane number: 2,2,4-trimethylpentane (iso-octane, C₈H₁₈) defines 100 because its highly branched shape burns smoothly, while straight-chain heptane defines 0.',
        'LPG is a mixture of propane (C₃H₈) and butane (C₄H₁₀); the isomer 2-methylpropane (isobutane) is the propellant in many aerosol cans and a refrigerant (R-600a).',
        'Ethene (C₂H₄), made by cracking the larger alkanes in crude oil, is the most-produced organic chemical on Earth and is polymerised into polyethylene for bags and bottles.',
        'Ethyne (acetylene, C₂H₂) burns with oxygen at about 3100 °C in welding torches; its triple bond stores a great deal of energy.',
        'Unsaturated fats contain C=C bonds in their hydrocarbon chains; hydrogenating them (adding H₂ across the double bonds) turns liquid oils into solid margarine.',
      ],
      id: [
        'Bensin dinilai dengan angka oktan: 2,2,4-trimetilpentana (iso-oktana, C₈H₁₈) menetapkan nilai 100 karena bentuknya yang sangat bercabang terbakar mulus, sedangkan heptana rantai lurus menetapkan 0.',
        'LPG adalah campuran propana (C₃H₈) dan butana (C₄H₁₀); isomernya 2-metilpropana (isobutana) adalah propelan di banyak kaleng aerosol dan refrigeran (R-600a).',
        'Etena (C₂H₄), dibuat dengan perengkahan alkana besar dalam minyak bumi, adalah bahan kimia organik yang paling banyak diproduksi di Bumi dan dipolimerisasi menjadi polietilena untuk kantong dan botol.',
        'Etuna (asetilena, C₂H₂) terbakar dengan oksigen pada sekitar 3100 °C dalam obor las; ikatan rangkap tiganya menyimpan banyak energi.',
        'Lemak tak jenuh mengandung ikatan C=C dalam rantai hidrokarbonnya; menghidrogenasinya (menambahkan H₂ pada ikatan rangkap) mengubah minyak cair menjadi margarin padat.',
      ],
    },
    questions: {
      en: [
        { q: 'A hydrocarbon has a 6-carbon chain with one C=C bond and no branches. Give its molecular formula and explain the count.', a: 'C₆H₁₂. An alkane C₆ would have 2(6) + 2 = 14 hydrogens; one double bond removes two, giving 12. This matches the alkene formula CₙH₂ₙ.' },
        { q: 'Name the molecule CH₃–CH(CH₃)–CH=CH₂ and explain the numbering.', a: '3-methylbut-1-ene. The longest chain has 4 carbons (but-). Numbering must give the double bond the lowest locant, so C1 is the CH₂ end: the double bond is C1=C2 and the methyl sits on C3. Numbering from the other end would give but-3-ene, which is not allowed.' },
        { q: 'Draw and name all structural isomers of C₅H₁₂. Which has the lowest boiling point and why?', a: 'Pentane (straight chain), 2-methylbutane (4-carbon chain, methyl on C2) and 2,2-dimethylpropane (3-carbon chain, two methyls on C2). 2,2-dimethylpropane boils lowest (9.5 °C vs 28 °C and 36 °C) because its near-spherical shape gives the least surface contact between molecules and hence the weakest dispersion forces.' },
        { q: 'Why does the builder refuse to place two methyl groups on a carbon that is part of a double bond?', a: 'That carbon would have 2 (double bond) + 1 (other chain neighbour) + 2 (methyls) = 5 bonds, but carbon can only make 4. In 2-methylbut-2-ene the double-bonded C2 has the double bond, one chain neighbour and one methyl: exactly four.' },
      ],
      id: [
        { q: 'Suatu hidrokarbon memiliki rantai 6 karbon dengan satu ikatan C=C dan tanpa cabang. Tuliskan rumus molekulnya dan jelaskan hitungannya.', a: 'C₆H₁₂. Alkana C₆ akan memiliki 2(6) + 2 = 14 hidrogen; satu ikatan rangkap dua mengurangi dua, menjadi 12. Ini sesuai rumus alkena CₙH₂ₙ.' },
        { q: 'Namai molekul CH₃–CH(CH₃)–CH=CH₂ dan jelaskan penomorannya.', a: '3-metilbut-1-ena. Rantai terpanjang memiliki 4 karbon (but-). Penomoran harus memberi ikatan rangkap nomor terkecil, sehingga C1 adalah ujung CH₂: ikatan rangkap pada C1=C2 dan metil pada C3. Menomori dari ujung lain akan memberi but-3-ena, yang tidak diperbolehkan.' },
        { q: 'Gambarkan dan namai semua isomer struktur C₅H₁₂. Mana yang titik didihnya paling rendah dan mengapa?', a: 'Pentana (rantai lurus), 2-metilbutana (rantai 4 karbon, metil pada C2), dan 2,2-dimetilpropana (rantai 3 karbon, dua metil pada C2). 2,2-dimetilpropana mendidih paling rendah (9,5 °C vs 28 °C dan 36 °C) karena bentuknya yang hampir bulat memberi kontak permukaan antarmolekul paling sedikit sehingga gaya dispersinya paling lemah.' },
        { q: 'Mengapa pembangun menolak menempatkan dua gugus metil pada karbon yang merupakan bagian dari ikatan rangkap dua?', a: 'Karbon itu akan memiliki 2 (ikatan rangkap) + 1 (tetangga rantai lain) + 2 (metil) = 5 ikatan, padahal karbon hanya dapat membentuk 4. Pada 2-metilbut-2-ena, C2 yang berikatan rangkap memiliki ikatan rangkap, satu tetangga rantai, dan satu metil: tepat empat.' },
      ],
    },
  },
};
