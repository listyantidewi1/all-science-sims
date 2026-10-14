// Long-form text for the sim page aside (lazy-loaded).
export default {
  objectives: {
    en: [
      'Describe how particles are arranged and move in a solid, a liquid and a gas.',
      'Explain that temperature is a measure of how fast particles move.',
      'Read a heating curve and explain why the temperature stays flat while a substance melts or boils.',
    ],
    id: [
      'Menjelaskan susunan dan gerak partikel pada zat padat, cair dan gas.',
      'Menjelaskan bahwa suhu adalah ukuran seberapa cepat partikel bergerak.',
      'Membaca kurva pemanasan dan menjelaskan mengapa suhu tetap datar saat zat meleleh atau mendidih.',
    ],
  },
  tryThis: {
    en: [
      'Push the piston in while the substance is a gas. What happens to the pressure reading?',
      'Press Heat and watch the heating curve. Where does the line go flat, and what is happening to the particles then?',
      'Switch to iron. How much hotter does it need to be before it melts compared with water?',
    ],
    id: [
      'Dorong piston ke dalam saat zat berwujud gas. Apa yang terjadi pada angka tekanan?',
      'Tekan Panaskan dan amati kurva pemanasan. Di mana garisnya mendatar, dan apa yang terjadi pada partikel saat itu?',
      'Ganti ke besi. Seberapa lebih panas yang diperlukan agar besi meleleh dibanding air?',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'Everything is made of particles far too small to see, and they never stop moving. Temperature is a measure of how fast they move on average. In a solid the particles are packed in a regular pattern and held by attractions to their neighbours, so they can only vibrate on the spot; that is why a solid keeps its shape. Warm it enough and the vibrations become strong enough to break the pattern: the particles stay touching but slide past one another, and the substance is a liquid that flows and takes the shape of its container. Heat it further and particles escape their neighbours altogether, flying in straight lines until they hit something. That is a gas, which spreads to fill any space it is given.',
        'The sim puts up to sixty particles in a box with a piston you can drag. Choose water, ethanol or iron and the sim uses that substance\'s real melting and boiling points: 0 °C and 100 °C for water, −114 °C and 78 °C for ethanol, 1538 °C and 2862 °C for iron. Dragging the temperature slider sets the temperature and the state instantly. Pressing Heat instead adds energy steadily and plots the heating curve, temperature against time. Watch the line: it climbs, then goes flat at the melting point while the solid turns to liquid, climbs again, and goes flat a second time at the boiling point. During the flat parts the energy you add is being used to pull particles away from their neighbours, not to speed them up, so the thermometer does not move until the change of state is complete.',
        'The pressure gauge counts how many times per second gas particles hit the walls, because that is what gas pressure is: countless tiny collisions. Push the piston in and the same particles have less room, so they reach a wall more often and the reading rises; this is Boyle\'s law in action, where halving the volume roughly doubles the pressure. Heating the gas makes the particles faster, so they hit more often and harder, and the reading rises too. Adding particles with the slider raises it for the same reason. Particle speed in the sim grows with the square root of the temperature measured from absolute zero, which is why the change from 100 °C to 200 °C is smaller than it might look.',
        'This is a cartoon of the real thing. Real matter has around a million million million million particles in a glass of water, moving in three dimensions and constantly colliding with each other; here a few dozen move in two dimensions and pass straight through one another. The sim has no attractive forces, so the liquid is simply confined to the bottom of the box rather than held together. Both flat parts of the heating curve last the same four seconds, whereas for real water boiling needs almost seven times as much energy as melting, so its plateau would be far longer. Pressure is in hits per second rather than pascals, and the particles look identical for all three substances even though an iron atom and a water molecule are very different.',
      ],
      id: [
        'Segala sesuatu terbuat dari partikel yang terlalu kecil untuk dilihat, dan partikel itu tidak pernah berhenti bergerak. Suhu adalah ukuran seberapa cepat rata-rata geraknya. Pada zat padat, partikel terkemas dalam pola teratur dan ditahan oleh tarikan tetangganya, sehingga hanya bisa bergetar di tempat; itulah sebabnya zat padat mempertahankan bentuknya. Panaskan cukup kuat dan getarannya menjadi cukup besar untuk merusak pola itu: partikel tetap bersentuhan tetapi saling bergeser, dan zat menjadi cair yang mengalir dan mengikuti bentuk wadahnya. Panaskan lebih lanjut dan partikel lepas sama sekali dari tetangganya, melesat lurus sampai menabrak sesuatu. Itulah gas, yang menyebar mengisi ruang apa pun yang tersedia.',
        'Sim ini menempatkan sampai enam puluh partikel dalam kotak dengan piston yang bisa kamu seret. Pilih air, etanol, atau besi dan sim memakai titik leleh dan titik didih zat itu yang sebenarnya: 0 °C dan 100 °C untuk air, −114 °C dan 78 °C untuk etanol, 1538 °C dan 2862 °C untuk besi. Menggeser slider suhu mengatur suhu dan wujud seketika. Menekan Panaskan justru menambahkan energi secara bertahap dan menggambar kurva pemanasan, suhu terhadap waktu. Perhatikan garisnya: naik, lalu mendatar di titik leleh saat padatan menjadi cairan, naik lagi, dan mendatar untuk kedua kalinya di titik didih. Selama bagian datar, energi yang kamu tambahkan dipakai untuk melepaskan partikel dari tetangganya, bukan untuk mempercepatnya, sehingga termometer tidak bergerak sampai perubahan wujud selesai.',
        'Pengukur tekanan menghitung berapa kali per sekon partikel gas menumbuk dinding, karena itulah tekanan gas: tumbukan kecil yang tak terhitung jumlahnya. Dorong piston ke dalam dan partikel yang sama punya ruang lebih sempit, sehingga lebih sering mencapai dinding dan angkanya naik; inilah hukum Boyle dalam praktik, di mana mengurangi volume menjadi setengah kira-kira menggandakan tekanan. Memanaskan gas membuat partikel lebih cepat, sehingga menumbuk lebih sering dan lebih keras, dan angkanya naik juga. Menambah partikel dengan slider menaikkannya karena alasan yang sama. Kecepatan partikel di sim bertambah mengikuti akar kuadrat suhu yang diukur dari nol mutlak, itulah sebabnya perubahan dari 100 °C ke 200 °C lebih kecil daripada yang terlihat.',
        'Ini adalah kartun dari kenyataan. Materi sungguhan punya sekitar sejuta triliun triliun partikel dalam segelas air, bergerak dalam tiga dimensi dan terus saling bertumbukan; di sini hanya beberapa lusin bergerak dalam dua dimensi dan saling menembus. Sim ini tidak punya gaya tarik, sehingga cairannya hanya dibatasi di dasar kotak, bukan saling mengikat. Kedua bagian datar kurva pemanasan berlangsung empat detik yang sama, padahal untuk air sungguhan mendidih membutuhkan energi hampir tujuh kali lebih banyak daripada meleleh, sehingga bagian datarnya akan jauh lebih panjang. Tekanan dinyatakan dalam tumbukan per sekon, bukan pascal, dan partikelnya tampak sama untuk ketiga zat walau atom besi dan molekul air sangat berbeda.',
      ],
    },
    figure: {
      caption: {
        en: 'Top: the same particles arranged as a solid, a liquid and a gas. Bottom: a heating curve goes flat at the melting and boiling points, because the added energy is separating particles rather than speeding them up.',
        id: 'Atas: partikel yang sama tersusun sebagai padat, cair, dan gas. Bawah: kurva pemanasan mendatar di titik leleh dan titik didih, karena energi yang ditambahkan dipakai memisahkan partikel, bukan mempercepatnya.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Particle arrangement in three states and a heating curve', 'Susunan partikel pada tiga wujud dan kurva pemanasan')}">
  <style>text{font:10px system-ui,sans-serif;fill:currentColor}.bx{fill:none;stroke:currentColor;stroke-width:1.5;opacity:.6}.p{fill:#3b82f6}.ax{stroke:currentColor;stroke-width:1.2;fill:none;opacity:.7}.v{stroke:#3b82f6;stroke-width:1.2;opacity:.7}</style>
  <rect x="20" y="22" width="90" height="72" class="bx"/>
  <g class="p"><circle cx="38" cy="40" r="6"/><circle cx="56" cy="40" r="6"/><circle cx="74" cy="40" r="6"/><circle cx="92" cy="40" r="6"/><circle cx="38" cy="58" r="6"/><circle cx="56" cy="58" r="6"/><circle cx="74" cy="58" r="6"/><circle cx="92" cy="58" r="6"/><circle cx="38" cy="76" r="6"/><circle cx="56" cy="76" r="6"/><circle cx="74" cy="76" r="6"/><circle cx="92" cy="76" r="6"/></g>
  <text x="65" y="106" text-anchor="middle" font-weight="bold">${L('solid', 'padat')}</text>
  <text x="65" y="118" text-anchor="middle">${L('fixed pattern, vibrate', 'pola tetap, bergetar')}</text>
  <rect x="135" y="22" width="90" height="72" class="bx"/>
  <g class="p"><circle cx="150" cy="84" r="6"/><circle cx="165" cy="80" r="6"/><circle cx="181" cy="85" r="6"/><circle cx="197" cy="81" r="6"/><circle cx="212" cy="85" r="6"/><circle cx="156" cy="70" r="6"/><circle cx="173" cy="67" r="6"/><circle cx="190" cy="71" r="6"/><circle cx="206" cy="68" r="6"/><circle cx="163" cy="56" r="6"/><circle cx="182" cy="54" r="6"/><circle cx="199" cy="57" r="6"/></g>
  <text x="180" y="106" text-anchor="middle" font-weight="bold">${L('liquid', 'cair')}</text>
  <text x="180" y="118" text-anchor="middle">${L('touching, slide past', 'bersentuhan, bergeser')}</text>
  <rect x="250" y="22" width="90" height="72" class="bx"/>
  <g class="p"><circle cx="265" cy="38" r="6"/><circle cx="300" cy="50" r="6"/><circle cx="325" cy="32" r="6"/><circle cx="272" cy="76" r="6"/><circle cx="312" cy="80" r="6"/><circle cx="290" cy="62" r="6"/></g>
  <g class="v"><line x1="271" y1="42" x2="283" y2="50"/><line x1="306" y1="47" x2="318" y2="40"/><line x1="320" y1="38" x2="312" y2="50"/><line x1="278" y1="72" x2="290" y2="64"/><line x1="306" y1="78" x2="294" y2="70"/><line x1="296" y1="58" x2="306" y2="50"/></g>
  <text x="295" y="106" text-anchor="middle" font-weight="bold">gas</text>
  <text x="295" y="118" text-anchor="middle">${L('far apart, fly freely', 'berjauhan, terbang bebas')}</text>
  <path d="M40 132 L40 226 L336 226" class="ax"/>
  <text x="188" y="238" text-anchor="middle">${L('time (heating steadily)', 'waktu (dipanaskan tetap)')}</text>
  <text x="34" y="180" text-anchor="end" transform="rotate(-90 34 180)">${L('temperature', 'suhu')}</text>
  <path d="M44 222 L92 192 L150 192 L204 154 L278 154 L330 134" fill="none" stroke="#ef4444" stroke-width="2.5" stroke-linejoin="round"/>
  <line x1="40" y1="192" x2="92" y2="192" stroke="#f59e0b" stroke-width="1" stroke-dasharray="3 3"/>
  <line x1="40" y1="154" x2="204" y2="154" stroke="#f59e0b" stroke-width="1" stroke-dasharray="3 3"/>
  <text x="121" y="186" text-anchor="middle" fill="#f59e0b">${L('melting: flat', 'meleleh: datar')}</text>
  <text x="241" y="148" text-anchor="middle" fill="#f59e0b">${L('boiling: flat', 'mendidih: datar')}</text>
  <text x="66" y="218" text-anchor="middle">${L('solid', 'padat')}</text>
  <text x="177" y="178" text-anchor="middle">${L('liquid', 'cair')}</text>
  <text x="306" y="150" text-anchor="middle">gas</text>
  <text x="44" y="200" text-anchor="end" fill="#f59e0b">${L('m.p.', 't. leleh')}</text>
  <text x="44" y="162" text-anchor="end" fill="#f59e0b">${L('b.p.', 't. didih')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Temperature measures how fast particles move on average: hotter means faster.',
        'Solids, liquids and gases are made of the same particles; only the arrangement and freedom of movement differ.',
        'While a substance melts or boils its temperature stays constant, because the added energy goes into separating particles, not speeding them up.',
        'Gas pressure is the drumming of particles on the walls; squeezing the gas into a smaller volume or heating it makes the hits more frequent and raises the pressure.',
        'Every pure substance has its own melting and boiling points, which depend on how strongly its particles attract one another.',
      ],
      id: [
        'Suhu mengukur seberapa cepat rata-rata partikel bergerak: lebih panas berarti lebih cepat.',
        'Padat, cair, dan gas terbuat dari partikel yang sama; yang berbeda hanya susunan dan kebebasan geraknya.',
        'Saat zat meleleh atau mendidih suhunya tetap, karena energi yang ditambahkan dipakai memisahkan partikel, bukan mempercepatnya.',
        'Tekanan gas adalah ketukan partikel pada dinding; memampatkan gas ke volume lebih kecil atau memanaskannya membuat tumbukan lebih sering dan menaikkan tekanan.',
        'Setiap zat murni punya titik leleh dan titik didih sendiri, yang bergantung pada seberapa kuat partikelnya saling menarik.',
      ],
    },
    vocabulary: {
      en: [
        ['Particle', 'The tiny unit a substance is made of: an atom or a molecule, far too small to see.'],
        ['Melting point', 'The temperature at which a solid turns to liquid; the same temperature at which the liquid freezes.'],
        ['Boiling point', 'The temperature at which a liquid turns to gas throughout, not just at its surface.'],
        ['Heating curve', 'A graph of temperature against time for a substance being heated steadily; flat parts mark changes of state.'],
        ['Latent heat', 'The energy taken in during melting or boiling that separates particles without raising the temperature.'],
        ['Pressure', 'The push of a gas on its container, caused by its particles hitting the walls; measured in the sim as hits per second.'],
        ['Absolute zero', 'The lowest possible temperature, −273 °C, at which particles would have the least possible motion.'],
      ],
      id: [
        ['Partikel', 'Satuan kecil penyusun zat: atom atau molekul, terlalu kecil untuk dilihat.'],
        ['Titik leleh', 'Suhu saat zat padat berubah menjadi cair; suhu yang sama saat cairan membeku.'],
        ['Titik didih', 'Suhu saat cairan berubah menjadi gas di seluruh bagiannya, bukan hanya di permukaan.'],
        ['Kurva pemanasan', 'Grafik suhu terhadap waktu untuk zat yang dipanaskan secara tetap; bagian datar menandai perubahan wujud.'],
        ['Kalor laten', 'Energi yang diserap selama meleleh atau mendidih untuk memisahkan partikel tanpa menaikkan suhu.'],
        ['Tekanan', 'Dorongan gas pada wadahnya, disebabkan partikel yang menumbuk dinding; di sim diukur sebagai tumbukan per sekon.'],
        ['Nol mutlak', 'Suhu terendah yang mungkin, −273 °C, saat gerak partikel sekecil mungkin.'],
      ],
    },
    misconceptions: {
      en: [
        ['Particles in a solid do not move.', 'They vibrate constantly around fixed positions, and the warmer the solid the harder they shake. Turn up the temperature slider below the melting point and watch the lattice jiggle more.'],
        ['When a substance is heated its particles get bigger or hotter.', 'The particles themselves do not change size or carry a temperature. They move faster and, in a liquid or gas, spread further apart. Temperature is a property of the whole crowd, not of one particle.'],
        ['The temperature keeps rising the whole time you heat water.', 'Once the water boils it stays at 100 °C until all of it has become steam. The heating curve shows the flat line; every joule is going into separating particles.'],
        ['Gas particles rise because they are light, and that is what fills the box.', 'Gas particles fly in every direction at hundreds of metres per second and fill the box because nothing holds them together. In the sim they bounce off the floor and ceiling equally.'],
      ],
      id: [
        ['Partikel pada zat padat tidak bergerak.', 'Partikel terus bergetar di sekitar posisi tetapnya, dan semakin hangat padatannya semakin kuat getarannya. Naikkan slider suhu di bawah titik leleh dan lihat kisi-kisinya bergetar lebih kuat.'],
        ['Saat zat dipanaskan, partikelnya membesar atau menjadi panas.', 'Partikel sendiri tidak berubah ukuran dan tidak menyimpan suhu. Partikel bergerak lebih cepat dan, pada cairan atau gas, menyebar lebih jauh. Suhu adalah sifat keseluruhan kerumunan, bukan sifat satu partikel.'],
        ['Suhu terus naik sepanjang air dipanaskan.', 'Begitu air mendidih, suhunya tetap 100 °C sampai semua air menjadi uap. Kurva pemanasan menunjukkan garis datarnya; setiap joule dipakai untuk memisahkan partikel.'],
        ['Partikel gas naik karena ringan, dan itulah yang mengisi kotak.', 'Partikel gas terbang ke segala arah dengan kecepatan ratusan meter per sekon dan mengisi kotak karena tidak ada yang mengikatnya. Di sim, partikel memantul dari lantai dan atap kotak sama banyaknya.'],
      ],
    },
    realWorld: {
      en: [
        'A pressure cooker traps the steam, so the pressure climbs and water boils at about 120 °C instead of 100 °C, cooking food faster.',
        'Pumping a bicycle tyre pushes more particles into the same space; the gauge rises for the same reason as the sim\'s hits-per-second counter.',
        'Aerosol cans warn against heat because warming the gas inside makes its particles hit the walls harder and more often, and the can may burst.',
        'Blast furnaces run above 1538 °C to melt iron, while ethanol thermometers are used in polar regions because ethanol stays liquid down to −114 °C.',
      ],
      id: [
        'Panci presto mengurung uapnya, sehingga tekanan naik dan air mendidih pada sekitar 120 °C, bukan 100 °C, dan makanan matang lebih cepat.',
        'Memompa ban sepeda mendorong lebih banyak partikel ke ruang yang sama; alat ukurnya naik karena alasan yang sama dengan penghitung tumbukan per sekon di sim.',
        'Kaleng aerosol mencantumkan peringatan terhadap panas karena memanaskan gas di dalamnya membuat partikel menumbuk dinding lebih keras dan lebih sering, dan kaleng bisa meledak.',
        'Tanur tinggi bekerja di atas 1538 °C untuk melelehkan besi, sedangkan termometer etanol dipakai di daerah kutub karena etanol tetap cair sampai −114 °C.',
      ],
    },
    questions: {
      en: [
        { q: 'With the substance as a gas, push the piston from 1000 cm³ to 500 cm³. What happens to the hits-per-second reading, and why?', a: 'It roughly doubles. The same number of particles at the same speed now have half the distance to cross between walls, so each one hits a wall about twice as often. Halving the volume doubles the pressure: Boyle\'s law.' },
        { q: 'Press Heat for water and watch the thermometer stop at 0 °C for a few seconds while the curve goes flat. Where is the energy going?', a: 'Into breaking the particles out of their fixed pattern. Until every particle has been freed from the solid, the added energy separates particles instead of making them faster, so the average speed, and therefore the temperature, does not change.' },
        { q: 'Water melts at 0 °C and iron at 1538 °C. The particles look the same in the sim, so what is really different about iron?', a: 'The attractions between iron atoms are far stronger than those between water molecules, so the atoms need far more energy, and a much higher temperature, before they can shake free. The sim does not model those forces; it simply uses each substance\'s real melting and boiling points.' },
      ],
      id: [
        { q: 'Saat zat berwujud gas, dorong piston dari 1000 cm³ ke 500 cm³. Apa yang terjadi pada angka tumbukan per sekon, dan mengapa?', a: 'Angkanya kira-kira menjadi dua kali lipat. Jumlah partikel yang sama dengan kecepatan yang sama kini hanya perlu menempuh setengah jarak antar dinding, sehingga tiap partikel menumbuk dinding sekitar dua kali lebih sering. Mengurangi volume menjadi setengah menggandakan tekanan: hukum Boyle.' },
        { q: 'Tekan Panaskan untuk air dan perhatikan termometer berhenti di 0 °C selama beberapa detik sementara kurvanya mendatar. Ke mana energinya pergi?', a: 'Untuk melepaskan partikel dari pola tetapnya. Sampai semua partikel terbebas dari padatan, energi yang ditambahkan memisahkan partikel, bukan mempercepatnya, sehingga kecepatan rata-rata, dan karena itu suhu, tidak berubah.' },
        { q: 'Air meleleh pada 0 °C dan besi pada 1538 °C. Partikelnya tampak sama di sim, jadi apa yang sebenarnya berbeda pada besi?', a: 'Tarikan antar atom besi jauh lebih kuat daripada tarikan antar molekul air, sehingga atom-atomnya butuh energi jauh lebih besar, dan suhu jauh lebih tinggi, sebelum bisa lepas. Sim tidak memodelkan gaya-gaya itu; sim hanya memakai titik leleh dan titik didih sebenarnya dari tiap zat.' },
      ],
    },
  },
};
