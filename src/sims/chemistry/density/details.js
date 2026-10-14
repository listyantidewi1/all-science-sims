// Long-form text for the sim page aside (lazy-loaded).
export default {
  objectives: {
    en: [
      'Measure mass with a balance and volume by water displacement.',
      'Calculate density using density = mass ÷ volume.',
      'Predict whether an object floats or sinks by comparing its density to the liquid.',
    ],
    id: [
      'Mengukur massa dengan timbangan dan volume dengan cara pemindahan air.',
      'Menghitung massa jenis dengan rumus massa jenis = massa ÷ volume.',
      'Memprediksi benda terapung atau tenggelam dengan membandingkan massa jenisnya dengan cairan.',
    ],
  },
  tryThis: {
    en: [
      'Measure the iron and the aluminium block. Which has more mass? Which has the higher density?',
      'Drop the ice block into the column. Why does it float on water but sink in oil?',
      'Find the density of the mystery block, then guess what it is made of before pressing Reveal.',
    ],
    id: [
      'Ukur balok besi dan aluminium. Mana yang massanya lebih besar? Mana yang massa jenisnya lebih tinggi?',
      'Jatuhkan balok es ke kolom. Mengapa es terapung di air tetapi tenggelam di minyak?',
      'Cari massa jenis balok misteri, lalu tebak bahannya sebelum menekan Ungkap.',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'Pick up a block of iron and a block of aluminium of the same size and the iron feels about three times heavier. The difference is density: how much mass is packed into each cubic centimetre. Density equals mass divided by volume, and it is a property of the material, not of the piece. A gold ring and a gold bar both have a density of 19.3 g/cm³. Water is the handy reference at 1.00 g/cm³. Any object less dense than the liquid it is placed in floats, because it can push aside its own weight of liquid before it is fully under; anything denser sinks.',
        'The sim gives you eight blocks and the two tools a chemist would use. Drag a block onto the balance and it reads the mass in grams. Drag it into the measuring cylinder, which starts with 50 cm³ of water, and the level rises by exactly the block\'s volume, so volume equals the new reading minus 50. Blocks that would float are held under the water by a thin rod so the whole block counts. Once both numbers are known the readout does the division and tells you whether the block will float or sink in water. The mystery block is copper, glass, rubber or wax, chosen at random each time you reset.',
        'The density column holds three liquids that do not mix: oil at 0.90 g/cm³ on top, water at 1.00 below it and honey at 1.42 at the bottom. A block drops through any liquid less dense than itself and stops at the first liquid that is denser, floating at the boundary with part of it in each layer. The sim works that out exactly: ice at 0.92 sinks through the oil and floats on the water with about a fifth of it below the boundary, plastic at 1.20 sinks through the water and rests on the honey, and iron and gold go straight to the bottom. Cork at 0.24 floats on the oil itself with only about a quarter of it under.',
        'Everything here is idealised. The blocks are perfect cubes of one pure material, the balance is exact to 0.1 g and the cylinder reads the volume perfectly, while a real cylinder is read to the nearest 1 cm³ at the bottom of the curved water surface. Temperature is ignored, so the ice never melts and the water never changes density. The three liquids are treated as never mixing, although honey slowly dissolves in water. The very small upward push of the air on each block is ignored too.',
      ],
      id: [
        'Angkat sebuah balok besi dan sebuah balok aluminium berukuran sama, dan besi terasa sekitar tiga kali lebih berat. Perbedaannya ada pada massa jenis: berapa banyak massa yang terkemas dalam tiap sentimeter kubik. Massa jenis sama dengan massa dibagi volume, dan ini adalah sifat bahan, bukan sifat potongannya. Cincin emas dan batangan emas sama-sama bermassa jenis 19,3 g/cm³. Air menjadi acuan yang praktis pada 1,00 g/cm³. Benda apa pun yang massa jenisnya lebih kecil daripada cairan tempatnya berada akan terapung, karena ia bisa menyingkirkan cairan seberat dirinya sebelum tenggelam sepenuhnya; yang lebih padat akan tenggelam.',
        'Sim ini memberimu delapan balok dan dua alat yang dipakai ahli kimia. Seret balok ke timbangan dan massanya terbaca dalam gram. Seret ke gelas ukur, yang awalnya berisi 50 cm³ air, dan permukaannya naik tepat sebesar volume balok, sehingga volume sama dengan bacaan baru dikurangi 50. Balok yang seharusnya terapung ditahan di bawah air oleh batang tipis supaya seluruh baloknya terhitung. Setelah kedua angka diketahui, panel bacaan melakukan pembagian dan memberitahu apakah balok akan terapung atau tenggelam di air. Balok misteri adalah tembaga, kaca, karet, atau lilin, dipilih acak tiap kali kamu mengatur ulang.',
        'Kolom massa jenis berisi tiga cairan yang tidak bercampur: minyak 0,90 g/cm³ di atas, air 1,00 di bawahnya, dan madu 1,42 di dasar. Balok turun melewati cairan apa pun yang massa jenisnya lebih kecil daripada dirinya dan berhenti pada cairan pertama yang lebih padat, terapung di batas dengan sebagian di tiap lapisan. Sim menghitungnya dengan tepat: es 0,92 tenggelam melewati minyak dan terapung di air dengan sekitar seperlima bagian di bawah batas, plastik 1,20 tenggelam melewati air dan bertumpu di madu, sedangkan besi dan emas langsung ke dasar. Gabus 0,24 terapung di minyak dengan hanya sekitar seperempat bagian terendam.',
        'Semua di sini diidealkan. Baloknya kubus sempurna dari satu bahan murni, timbangannya tepat sampai 0,1 g, dan gelas ukur membaca volume dengan sempurna, padahal gelas ukur sungguhan dibaca ke 1 cm³ terdekat di dasar permukaan air yang melengkung. Suhu diabaikan, sehingga es tidak pernah mencair dan massa jenis air tidak pernah berubah. Ketiga cairan dianggap tidak pernah bercampur, walau madu perlahan larut dalam air. Dorongan ke atas yang sangat kecil dari udara pada tiap balok juga diabaikan.',
      ],
    },
    figure: {
      caption: {
        en: 'Left: blocks settle in the column where the liquid below is denser than they are. Right: dropping a block into the cylinder raises the water by the block\'s volume; dividing the mass by that volume gives the density.',
        id: 'Kiri: balok berhenti di kolom pada tempat cairan di bawahnya lebih padat daripada balok. Kanan: memasukkan balok ke gelas ukur menaikkan air sebesar volume balok; massa dibagi volume itu menghasilkan massa jenis.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Density column and volume by displacement', 'Kolom massa jenis dan volume dengan pemindahan air')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.o{fill:none;stroke:currentColor;stroke-width:1.5;opacity:.6}.k{stroke:currentColor;stroke-width:.8;opacity:.6}</style>
  <rect x="30" y="20" width="80" height="64" fill="#f59e0b" opacity=".25"/>
  <rect x="30" y="84" width="80" height="72" fill="#3b82f6" opacity=".3"/>
  <rect x="30" y="156" width="80" height="64" fill="#f59e0b" opacity=".6"/>
  <path d="M30 20 L30 220 L110 220 L110 20" class="o"/>
  <text x="116" y="36" font-size="10">${L('oil 0.90', 'minyak 0,90')}</text>
  <text x="116" y="124" font-size="10">${L('water 1.00', 'air 1,00')}</text>
  <text x="116" y="192" font-size="10">${L('honey 1.42', 'madu 1,42')}</text>
  <rect x="38" y="7" width="18" height="18" fill="#10b981" class="k"/>
  <text x="26" y="20" text-anchor="end" font-size="10">${L('cork 0.24', 'gabus 0,24')}</text>
  <rect x="66" y="70" width="18" height="18" fill="currentColor" opacity=".35" class="k"/>
  <text x="26" y="83" text-anchor="end" font-size="10">${L('ice 0.92', 'es 0,92')}</text>
  <rect x="46" y="147" width="18" height="18" fill="#ef4444" class="k"/>
  <text x="26" y="160" text-anchor="end" font-size="10">${L('plastic 1.20', 'plastik 1,20')}</text>
  <rect x="76" y="200" width="18" height="18" fill="#8b5cf6" class="k"/>
  <text x="26" y="213" text-anchor="end" font-size="10">${L('iron 7.90', 'besi 7,90')}</text>
  <text x="70" y="234" text-anchor="middle" font-size="10">${L('density column (g/cm³)', 'kolom massa jenis (g/cm³)')}</text>
  <rect x="190" y="120" width="30" height="40" fill="#3b82f6" opacity=".35"/>
  <path d="M190 40 L190 160 L220 160 L220 40" class="o"/>
  <text x="205" y="32" text-anchor="middle" font-size="10">50 cm³</text>
  <rect x="265" y="96" width="30" height="64" fill="#3b82f6" opacity=".35"/>
  <path d="M265 40 L265 160 L295 160 L295 40" class="o"/>
  <rect x="273" y="144" width="14" height="14" fill="#f59e0b" class="k"/>
  <text x="280" y="32" text-anchor="middle" font-size="10">80 cm³</text>
  <line x1="226" y1="100" x2="258" y2="100" stroke="currentColor" stroke-width="2" marker-end="url(#da)"/>
  <line x1="300" y1="96" x2="312" y2="96" class="k"/><line x1="300" y1="120" x2="312" y2="120" class="k"/>
  <text x="316" y="112" font-size="10">+30</text>
  <text x="250" y="180" text-anchor="middle" font-size="10">${L('volume = 80 − 50 = 30 cm³', 'volume = 80 − 50 = 30 cm³')}</text>
  <text x="250" y="196" text-anchor="middle" font-size="10">${L('mass from balance = 15.0 g', 'massa dari timbangan = 15,0 g')}</text>
  <text x="250" y="214" text-anchor="middle" font-weight="bold">${L('density = 15.0 ÷ 30 = 0.50 g/cm³', 'massa jenis = 15,0 ÷ 30 = 0,50 g/cm³')}</text>
  <text x="250" y="230" text-anchor="middle" font-size="10" fill="#10b981">${L('0.50 is less than 1.00, so wood floats on water', '0,50 kurang dari 1,00, jadi kayu terapung di air')}</text>
  <defs><marker id="da" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="context-stroke"/></marker></defs>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Density is mass divided by volume: how much matter is packed into each cubic centimetre.',
        'Density is a property of the material, so a chip of iron and a bar of iron have the same density.',
        'An object floats in a liquid that is denser than it and sinks in one that is less dense.',
        'The volume of an odd-shaped object is found by the water it pushes aside: new level minus old level.',
        'In a layered column a block stops where the liquid below is denser than it and the liquid above is less dense.',
      ],
      id: [
        'Massa jenis adalah massa dibagi volume: berapa banyak materi yang terkemas dalam tiap sentimeter kubik.',
        'Massa jenis adalah sifat bahan, jadi serpihan besi dan batangan besi punya massa jenis yang sama.',
        'Benda terapung di cairan yang lebih padat daripadanya dan tenggelam di cairan yang kurang padat.',
        'Volume benda berbentuk tak beraturan dicari dari air yang disingkirkannya: permukaan baru dikurangi permukaan lama.',
        'Di kolom berlapis, balok berhenti di tempat cairan di bawahnya lebih padat daripada balok dan cairan di atasnya kurang padat.',
      ],
    },
    vocabulary: {
      en: [
        ['Density', 'Mass per unit volume, here measured in grams per cubic centimetre (g/cm³).'],
        ['Mass', 'The amount of matter in an object, measured on a balance in grams.'],
        ['Volume', 'The amount of space an object takes up, in cubic centimetres (cm³); 1 cm³ of water has a mass of about 1 g.'],
        ['Displacement', 'Finding a volume from the rise in water level when an object is put under water.'],
        ['Upthrust', 'The upward push of a liquid on an object in it, equal to the weight of liquid the object pushes aside.'],
        ['Float / sink', 'An object floats when its density is less than the liquid\'s and sinks when it is greater.'],
      ],
      id: [
        ['Massa jenis', 'Massa per satuan volume, di sini diukur dalam gram per sentimeter kubik (g/cm³).'],
        ['Massa', 'Jumlah materi dalam suatu benda, diukur dengan timbangan dalam gram.'],
        ['Volume', 'Besar ruang yang ditempati benda, dalam sentimeter kubik (cm³); 1 cm³ air bermassa sekitar 1 g.'],
        ['Pemindahan air', 'Mencari volume dari kenaikan permukaan air saat benda dimasukkan ke dalam air.'],
        ['Gaya apung', 'Dorongan ke atas dari cairan pada benda di dalamnya, sama dengan berat cairan yang disingkirkan benda itu.'],
        ['Terapung / tenggelam', 'Benda terapung saat massa jenisnya lebih kecil daripada cairan dan tenggelam saat lebih besar.'],
      ],
    },
    misconceptions: {
      en: [
        ['Heavy things sink and light things float.', 'A gold ring of 5 g sinks while a 50 kg log floats. What matters is density, not mass: the ring is 19 times denser than water, the log about half as dense.'],
        ['Cutting a block in half halves its density.', 'Each half has half the mass and half the volume, so mass ÷ volume is unchanged. Density describes the material, not the amount.'],
        ['Ice floats because it is cold.', 'Ice floats because it is less dense than liquid water: water expands as it freezes, so ice is 0.92 g/cm³. A cold piece of iron still sinks.'],
        ['Anything that floats on water floats on every liquid.', 'The ice block floats on water but sinks in oil, because oil at 0.90 is less dense than ice at 0.92. Floating is always a comparison with the particular liquid.'],
      ],
      id: [
        ['Benda berat tenggelam dan benda ringan terapung.', 'Cincin emas 5 g tenggelam sedangkan gelondongan kayu 50 kg terapung. Yang menentukan adalah massa jenis, bukan massa: cincin itu 19 kali lebih padat daripada air, gelondongan kayu sekitar setengahnya.'],
        ['Memotong balok menjadi dua membuat massa jenisnya setengah.', 'Tiap potongan punya setengah massa dan setengah volume, sehingga massa ÷ volume tidak berubah. Massa jenis menggambarkan bahannya, bukan jumlahnya.'],
        ['Es terapung karena dingin.', 'Es terapung karena massa jenisnya lebih kecil daripada air cair: air memuai saat membeku, sehingga es 0,92 g/cm³. Sepotong besi yang dingin tetap tenggelam.'],
        ['Benda yang terapung di air pasti terapung di semua cairan.', 'Balok es terapung di air tetapi tenggelam di minyak, karena minyak 0,90 kurang padat daripada es 0,92. Terapung selalu merupakan perbandingan dengan cairan tertentu.'],
      ],
    },
    realWorld: {
      en: [
        'A steel ship floats because it is mostly hollow: the average density of the hull plus the air inside is far below that of seawater.',
        'Spilled oil floats on the sea in a thin layer, just as the oil sits on the water in the column, which is why booms can skim it off the surface.',
        'An egg sinks in fresh water but floats in very salty water, because dissolving salt raises the water\'s density above the egg\'s.',
        'Jewellers and recyclers check metals by measuring density exactly as in this sim: a "gold" bar that reads 8.9 g/cm³ is copper.',
      ],
      id: [
        'Kapal baja terapung karena sebagian besar isinya rongga: massa jenis rata-rata lambung beserta udara di dalamnya jauh di bawah massa jenis air laut.',
        'Minyak yang tumpah terapung di laut sebagai lapisan tipis, sama seperti minyak di atas air pada kolom, itulah sebabnya penghalang apung bisa menyapunya dari permukaan.',
        'Telur tenggelam di air tawar tetapi terapung di air yang sangat asin, karena garam yang larut menaikkan massa jenis air melebihi massa jenis telur.',
        'Tukang emas dan pendaur ulang memeriksa logam dengan mengukur massa jenis persis seperti di sim ini: batangan "emas" yang terbaca 8,9 g/cm³ ternyata tembaga.',
      ],
    },
    questions: {
      en: [
        { q: 'The iron and aluminium blocks both have a volume of 20 cm³. What masses does the balance show, and what does that tell you about their densities?', a: 'Iron reads 158.0 g and aluminium 54.0 g. Same volume, so the heavier block is the denser one: 158 ÷ 20 = 7.90 g/cm³ for iron against 54 ÷ 20 = 2.70 g/cm³ for aluminium, almost three times denser.' },
        { q: 'The ice block has a mass of 46.0 g and a volume of 50 cm³. Where will it stop in the column, and why?', a: 'Its density is 46 ÷ 50 = 0.92 g/cm³. That is more than oil (0.90), so it sinks through the oil, but less than water (1.00), so it floats at the oil–water boundary with about four fifths of it in the water.' },
        { q: 'The mystery block reads 75.0 g on the balance and raises the water from 50 to 80 cm³. What is it, and where will it settle in the column?', a: 'Density = 75 ÷ 30 = 2.50 g/cm³, which matches glass (copper would be 8.96, rubber 1.10, wax 0.95). At 2.50 it is denser than honey (1.42), so it sinks to the very bottom.' },
      ],
      id: [
        { q: 'Balok besi dan aluminium sama-sama bervolume 20 cm³. Berapa massa yang ditunjukkan timbangan, dan apa artinya bagi massa jenis keduanya?', a: 'Besi terbaca 158,0 g dan aluminium 54,0 g. Volumenya sama, jadi balok yang lebih berat adalah yang lebih padat: 158 ÷ 20 = 7,90 g/cm³ untuk besi berbanding 54 ÷ 20 = 2,70 g/cm³ untuk aluminium, hampir tiga kali lebih padat.' },
        { q: 'Balok es bermassa 46,0 g dan bervolume 50 cm³. Di mana ia akan berhenti di kolom, dan mengapa?', a: 'Massa jenisnya 46 ÷ 50 = 0,92 g/cm³. Itu lebih besar daripada minyak (0,90), jadi es tenggelam melewati minyak, tetapi lebih kecil daripada air (1,00), jadi es terapung di batas minyak–air dengan sekitar empat perlima bagian di dalam air.' },
        { q: 'Balok misteri terbaca 75,0 g di timbangan dan menaikkan air dari 50 ke 80 cm³. Bahan apa itu, dan di mana ia akan berhenti di kolom?', a: 'Massa jenis = 75 ÷ 30 = 2,50 g/cm³, yang cocok dengan kaca (tembaga 8,96, karet 1,10, lilin 0,95). Pada 2,50 ia lebih padat daripada madu (1,42), jadi tenggelam sampai ke dasar.' },
      ],
    },
  },
};
