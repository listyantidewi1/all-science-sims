// Long-form text for the sim page aside, kept out of manifest.js.
export default {
  objectives: {
    en: [
      'Explain that solids expand when heated and contract when cooled, and that different materials expand by different amounts.',
      'Use ΔL = α·L·ΔT to calculate how much a rail, ball or strip changes length, with units.',
      'Explain everyday designs that allow for expansion: rail gaps, bridge joints, bimetal thermostats.',
    ],
    id: [
      'Menjelaskan bahwa zat padat memuai ketika dipanaskan dan menyusut ketika didinginkan, dan bahwa bahan yang berbeda memuai dengan besar yang berbeda.',
      'Menggunakan ΔL = α·L·ΔT untuk menghitung perubahan panjang rel, bola atau keping, beserta satuannya.',
      'Menjelaskan rancangan sehari-hari yang memberi ruang pemuaian: celah rel, sambungan jembatan, termostat bimetal.',
    ],
  },
  tryThis: {
    en: [
      'Rail scene: set the gap to 20 mm and heat the steel rail. At what temperature does it buckle? Now try aluminium.',
      'Keep the temperature fixed and move the rail length slider. Does ΔL change in proportion to L?',
      'Ring and ball: heat only the ball until it sticks, then turn on "Heat the ring too". Why does it pass again?',
      'Bimetal strip: find the temperature at which the thermostat contact opens. Cool it below 20 °C: which way does it bend?',
    ],
    id: [
      'Adegan rel: atur celah 20 mm dan panaskan rel baja. Pada suhu berapa rel melengkung? Sekarang coba aluminium.',
      'Tahan suhu tetap dan geser panjang rel. Apakah ΔL berubah sebanding dengan L?',
      'Cincin dan bola: panaskan bola saja sampai tersangkut, lalu nyalakan "Panaskan cincin juga". Mengapa bola lolos lagi?',
      'Keping bimetal: cari suhu saat kontak termostat terbuka. Dinginkan di bawah 20 °C: ke arah mana keping melengkung?',
    ],
  },

  learn: {
    background: {
      en: [
        'When a solid is heated, its particles vibrate more strongly and push each other slightly further apart, so the whole object grows a little in every direction. When it cools, the particles settle closer together and the object shrinks back. This is thermal expansion. The effect is small, far too small to see on a rail or a bridge with the naked eye, but the forces involved are enormous if the object is prevented from expanding.',
        'For a change in temperature ΔT, the change in length of a bar of original length L is ΔL = α·L·ΔT. The constant α is the linear expansion coefficient of the material, measured in "per °C". Steel has α ≈ 12×10⁻⁶ /°C, meaning each metre grows by 12 millionths of a metre (0.012 mm) for every degree. Aluminium (23×10⁻⁶ /°C) expands almost twice as much; the alloy invar (1.2×10⁻⁶ /°C) hardly expands at all. A 10 m steel rail heated by 100 °C grows by 12×10⁻⁶ × 10 × 100 = 0.012 m = 12 mm.',
        'The sim draws the rail\'s expansion 100 times larger than life so you can see it, but the number in the formula box is the real one. If the expansion is bigger than the gap left between the rail and its stop, the rail pushes against the stop and buckles. The ring-and-ball scene shows that a ball that just fits a ring at room temperature cannot pass once it has been heated, because its diameter is also a length that obeys ΔL = α·L·ΔT. Heating the ring as well widens the hole, and the ball passes again.',
        'A bimetal strip is two metals bonded together, here brass on one side and steel on the other. Heated by the same ΔT, the brass side grows more than the steel side, and the only way both layers can stay bonded is for the strip to curve toward the steel. The sim calculates the curvature as κ = 3(α_brass − α_steel)·ΔT / (2h), where h is the total thickness, and draws the bend to scale. Because the bending is much larger than the expansion itself, a bimetal strip is an excellent temperature switch: in the sim it opens a contact at about 170 °C.',
      ],
      id: [
        'Ketika zat padat dipanaskan, partikelnya bergetar lebih kuat dan saling mendorong sedikit lebih jauh, sehingga seluruh benda bertambah sedikit ke segala arah. Ketika didinginkan, partikel kembali merapat dan benda menyusut. Inilah pemuaian. Efeknya kecil, terlalu kecil untuk dilihat pada rel atau jembatan dengan mata telanjang, tetapi gayanya sangat besar jika benda dihalangi memuai.',
        'Untuk perubahan suhu ΔT, perubahan panjang batang berpanjang awal L adalah ΔL = α·L·ΔT. Tetapan α disebut koefisien muai panjang bahan, dengan satuan "per °C". Baja mempunyai α ≈ 12×10⁻⁶ /°C, artinya tiap meter bertambah 12 persejuta meter (0,012 mm) untuk setiap derajat. Aluminium (23×10⁻⁶ /°C) memuai hampir dua kali lebih banyak; paduan invar (1,2×10⁻⁶ /°C) hampir tidak memuai. Rel baja 10 m yang dipanaskan 100 °C bertambah 12×10⁻⁶ × 10 × 100 = 0,012 m = 12 mm.',
        'Simulasi menggambar pemuaian rel 100 kali lebih besar dari aslinya agar terlihat, tetapi angka di kotak rumus adalah angka sebenarnya. Jika pemuaian lebih besar daripada celah antara rel dan penahannya, rel mendorong penahan dan melengkung. Adegan cincin dan bola menunjukkan bahwa bola yang pas dengan cincin pada suhu kamar tidak bisa lewat setelah dipanaskan, karena diameternya juga sebuah panjang yang mengikuti ΔL = α·L·ΔT. Memanaskan cincin juga melebarkan lubangnya, dan bola lolos lagi.',
        'Keping bimetal adalah dua logam yang dilekatkan, di sini kuningan di satu sisi dan baja di sisi lain. Dipanaskan dengan ΔT yang sama, sisi kuningan memanjang lebih banyak daripada sisi baja, dan satu-satunya cara kedua lapisan tetap melekat adalah keping melengkung ke arah baja. Simulasi menghitung kelengkungan sebagai κ = 3(α_kuningan − α_baja)·ΔT / (2h), dengan h tebal total, dan menggambar lengkungan sesuai skala. Karena lengkungannya jauh lebih besar daripada pemuaian itu sendiri, keping bimetal menjadi sakelar suhu yang sangat baik: di simulasi, kontaknya terbuka pada sekitar 170 °C.',
      ],
    },
    figure: {
      caption: {
        en: 'Top: a rail of length L anchored at the left grows by ΔL = α·L·ΔT when heated; the gap must be wider than ΔL. Bottom: a bimetal strip at 20 °C is straight; when heated the brass layer lengthens more than the steel layer, so the strip bends toward the steel and can open a contact.',
        id: 'Atas: rel sepanjang L yang terpasang di kiri bertambah ΔL = α·L·ΔT saat dipanaskan; celah harus lebih lebar daripada ΔL. Bawah: keping bimetal pada 20 °C lurus; ketika dipanaskan lapisan kuningan memanjang lebih banyak daripada baja, sehingga keping melengkung ke arah baja dan dapat membuka kontak.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Rail expansion and a bending bimetal strip', 'Pemuaian rel dan keping bimetal yang melengkung')}">
  <style>text{font:10px system-ui,sans-serif;fill:currentColor}.t{font:11px system-ui,sans-serif;fill:currentColor}.k{font:11px ui-monospace,monospace;fill:currentColor}</style>
  <defs><marker id="ar" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto"><path d="M0 0 L7 3.5 L0 7 z" fill="#ef4444"/></marker></defs>
  <text x="14" y="18" class="t">${L('Rail at 20 °C and when hot (ΔL exaggerated)', 'Rel pada 20 °C dan ketika panas (ΔL dibesarkan)')}</text>
  <rect x="14" y="26" width="10" height="60" fill="currentColor" opacity=".5"/>
  <rect x="326" y="26" width="10" height="60" fill="currentColor" opacity=".5"/>
  <rect x="24" y="32" width="220" height="14" fill="#94a3b8"/>
  <text x="130" y="60" text-anchor="middle">L (20 °C)</text>
  <line x1="244" y1="28" x2="244" y2="92" stroke="#fbbf24" stroke-dasharray="3 2"/>
  <rect x="24" y="72" width="220" height="14" fill="#94a3b8"/>
  <rect x="244" y="72" width="60" height="14" fill="#ef4444" opacity=".85"/>
  <line x1="244" y1="100" x2="304" y2="100" stroke="#ef4444" stroke-width="2" marker-end="url(#ar)"/>
  <text x="256" y="112" fill="#ef4444">ΔL = α·L·ΔT</text>
  <text x="310" y="60" text-anchor="middle">${L('gap', 'celah')}</text>
  <text x="14" y="138" class="t">${L('Bimetal strip: brass (yellow) + steel (grey)', 'Keping bimetal: kuningan (kuning) + baja (abu-abu)')}</text>
  <rect x="14" y="146" width="12" height="80" fill="currentColor" opacity=".5"/>
  <rect x="26" y="176" width="150" height="7" fill="#94a3b8"/>
  <rect x="26" y="183" width="150" height="7" fill="#eab308"/>
  <text x="100" y="206" text-anchor="middle">20 °C</text>
  <rect x="190" y="146" width="12" height="80" fill="currentColor" opacity=".5"/>
  <path d="M202 176 Q 280 176 346 148 L 348 155 Q 282 183 202 183 Z" fill="#94a3b8"/>
  <path d="M202 183 Q 282 183 348 155 L 350 162 Q 284 190 202 190 Z" fill="#eab308"/>
  <line x1="202" y1="190" x2="350" y2="190" stroke="#fbbf24" stroke-dasharray="3 2"/>
  <line x1="356" y1="190" x2="356" y2="160" stroke="#ef4444" stroke-width="2" marker-end="url(#ar)"/>
  <text x="300" y="206" text-anchor="middle">${L('hot: bends toward steel', 'panas: melengkung ke baja')}</text>
  <text x="14" y="232" class="k">${L('steel α = 12×10⁻⁶ /°C   brass α = 19×10⁻⁶ /°C', 'baja α = 12×10⁻⁶ /°C   kuningan α = 19×10⁻⁶ /°C')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Solids expand when heated and contract when cooled; the change is small but the forces can be huge.',
        'ΔL = α·L·ΔT: the change in length is proportional to the original length and to the temperature change.',
        'α is a property of the material: aluminium 23, brass 19, copper 17, steel 12, glass 9, invar 1.2 (all ×10⁻⁶ /°C).',
        'Diameters expand too, which is why a heated ball no longer fits through a ring that is still cold.',
        'Two metals with different α bonded together bend when heated: the bimetal strip, used as a thermostat switch.',
        'Engineers leave expansion gaps in rails, bridges and pipes so that expansion does not cause buckling.',
      ],
      id: [
        'Zat padat memuai ketika dipanaskan dan menyusut ketika didinginkan; perubahannya kecil tetapi gayanya bisa sangat besar.',
        'ΔL = α·L·ΔT: perubahan panjang sebanding dengan panjang awal dan dengan perubahan suhu.',
        'α adalah sifat bahan: aluminium 23, kuningan 19, tembaga 17, baja 12, kaca 9, invar 1,2 (semuanya ×10⁻⁶ /°C).',
        'Diameter juga memuai, sehingga bola yang dipanaskan tidak lagi muat melewati cincin yang masih dingin.',
        'Dua logam dengan α berbeda yang dilekatkan akan melengkung ketika dipanaskan: keping bimetal, dipakai sebagai sakelar termostat.',
        'Insinyur menyisakan celah pemuaian pada rel, jembatan dan pipa agar pemuaian tidak menyebabkan lengkungan.',
      ],
    },
    vocabulary: {
      en: [
        ['Thermal expansion', 'The increase in size of an object when its temperature rises.'],
        ['Linear expansion coefficient (α)', 'The fraction by which a length grows for each 1 °C rise, in /°C; about 12×10⁻⁶ /°C for steel.'],
        ['ΔT', 'The change in temperature, final minus initial, in °C; negative when cooling.'],
        ['Expansion gap', 'A deliberate space left between rails, bridge sections or tiles so they can expand freely.'],
        ['Bimetal strip', 'Two bonded metals with different α that bend when heated; the heart of simple thermostats.'],
        ['Invar', 'An iron-nickel alloy with a very small α, used for precise instruments and measuring tapes.'],
      ],
      id: [
        ['Pemuaian', 'Bertambahnya ukuran benda ketika suhunya naik.'],
        ['Koefisien muai panjang (α)', 'Pecahan pertambahan panjang untuk tiap kenaikan 1 °C, dalam /°C; sekitar 12×10⁻⁶ /°C untuk baja.'],
        ['ΔT', 'Perubahan suhu, akhir dikurangi awal, dalam °C; negatif jika mendingin.'],
        ['Celah pemuaian', 'Ruang yang sengaja disisakan antara rel, bagian jembatan atau ubin agar bisa memuai dengan bebas.'],
        ['Keping bimetal', 'Dua logam berbeda α yang dilekatkan dan melengkung saat dipanaskan; inti dari termostat sederhana.'],
        ['Invar', 'Paduan besi-nikel dengan α sangat kecil, dipakai untuk alat presisi dan pita ukur.'],
      ],
    },
    misconceptions: {
      en: [
        ['Only the length of a bar changes; its width and holes stay the same.', 'Every dimension grows by the same fraction α·ΔT. A hole in a heated ring gets bigger, not smaller, which is why heating the ring lets the ball pass.'],
        ['The particles themselves get bigger when heated.', 'The particles stay the same size; they vibrate more and their average spacing increases, so the object as a whole grows.'],
        ['A small expansion means a small force, so a blocked rail just stops expanding.', 'If the rail cannot expand it pushes with enormous force, enough to bend steel rails sideways in a heat wave.'],
        ['A bimetal strip bends because one metal melts or softens.', 'Both metals stay solid. The strip bends only because one side lengthens more than the other and the two are glued together.'],
      ],
      id: [
        ['Hanya panjang batang yang berubah; lebar dan lubangnya tetap.', 'Setiap dimensi bertambah dengan pecahan yang sama, α·ΔT. Lubang pada cincin yang dipanaskan menjadi lebih besar, bukan lebih kecil, itulah sebabnya memanaskan cincin membuat bola lolos.'],
        ['Partikel itu sendiri membesar ketika dipanaskan.', 'Ukuran partikel tetap; partikel bergetar lebih kuat dan jarak rata-ratanya bertambah, sehingga benda secara keseluruhan membesar.'],
        ['Pemuaian kecil berarti gayanya kecil, jadi rel yang terhalang hanya berhenti memuai.', 'Jika rel tidak bisa memuai, rel mendorong dengan gaya sangat besar, cukup untuk melengkungkan rel baja ke samping saat gelombang panas.'],
        ['Keping bimetal melengkung karena salah satu logam meleleh atau melunak.', 'Kedua logam tetap padat. Keping melengkung hanya karena satu sisi memanjang lebih banyak daripada sisi lain dan keduanya melekat.'],
      ],
    },
    realWorld: {
      en: [
        'Railway tracks and bridges have expansion joints; on very hot days rails without enough room have buckled and derailed trains.',
        'Bimetal strips switch irons, kettles, car indicator flashers and old room thermostats on and off.',
        'A tight metal lid loosens under hot water because the lid expands more than the glass jar.',
        'Power lines sag more in summer than in winter because the long cables lengthen by many centimetres.',
        'Dentists use filling materials whose α matches teeth so the filling does not loosen with hot and cold drinks.',
      ],
      id: [
        'Rel kereta dan jembatan mempunyai sambungan pemuaian; pada hari yang sangat panas rel tanpa cukup ruang pernah melengkung dan menggelincirkan kereta.',
        'Keping bimetal menghidupkan dan mematikan setrika, ketel listrik, lampu sein mobil lama dan termostat ruangan lama.',
        'Tutup logam yang seret menjadi longgar di bawah air panas karena tutupnya memuai lebih banyak daripada botol kacanya.',
        'Kabel listrik lebih kendur di musim panas daripada musim dingin karena kabel panjang memanjang beberapa sentimeter.',
        'Dokter gigi memakai bahan tambal yang α-nya mirip gigi agar tambalan tidak longgar karena minuman panas dan dingin.',
      ],
    },
    questions: {
      en: [
        { q: 'A 10 m steel rail (α = 12×10⁻⁶ /°C) warms from 20 °C to 60 °C. How much longer does it get?', a: 'ΔL = α·L·ΔT = 12×10⁻⁶ × 10 m × 40 °C = 4.8×10⁻³ m = 4.8 mm.' },
        { q: 'The same temperature rise is applied to a 10 m aluminium rail (α = 23×10⁻⁶ /°C). Compare the two expansions.', a: 'ΔL = 23×10⁻⁶ × 10 × 40 = 9.2 mm, almost twice as much, because α is almost twice as big.' },
        { q: 'A 30.00 mm steel ball just fits a 30.02 mm ring. By how much must its temperature rise before it gets stuck?', a: 'It needs ΔD = 0.02 mm: ΔT = ΔD / (α·D) = 0.02 / (12×10⁻⁶ × 30) ≈ 56 °C, so about 76 °C.' },
        { q: 'A bimetal strip is cooled below room temperature. Which way does it bend?', a: 'The brass side shrinks more than the steel side, so the strip bends the other way, toward the brass.' },
      ],
      id: [
        { q: 'Rel baja 10 m (α = 12×10⁻⁶ /°C) menghangat dari 20 °C ke 60 °C. Berapa pertambahan panjangnya?', a: 'ΔL = α·L·ΔT = 12×10⁻⁶ × 10 m × 40 °C = 4,8×10⁻³ m = 4,8 mm.' },
        { q: 'Kenaikan suhu yang sama diberikan pada rel aluminium 10 m (α = 23×10⁻⁶ /°C). Bandingkan kedua pemuaiannya.', a: 'ΔL = 23×10⁻⁶ × 10 × 40 = 9,2 mm, hampir dua kali lipat, karena α-nya hampir dua kali lebih besar.' },
        { q: 'Bola baja 30,00 mm pas dengan cincin 30,02 mm. Berapa kenaikan suhu yang membuatnya tersangkut?', a: 'Dibutuhkan ΔD = 0,02 mm: ΔT = ΔD / (α·D) = 0,02 / (12×10⁻⁶ × 30) ≈ 56 °C, jadi sekitar 76 °C.' },
        { q: 'Keping bimetal didinginkan di bawah suhu kamar. Ke arah mana keping melengkung?', a: 'Sisi kuningan menyusut lebih banyak daripada sisi baja, sehingga keping melengkung ke arah sebaliknya, ke arah kuningan.' },
      ],
    },
  },
};
