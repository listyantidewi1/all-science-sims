// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Read the unusual axes of an HR diagram (T decreases rightward).',
      'Identify main-sequence vs giant vs dwarf populations.',
      'Predict a star\'s fate from its initial mass.',
    ],
    id: [
      'Membaca sumbu tidak biasa pada diagram HR (T berkurang ke kanan).',
      'Mengenali populasi deret utama vs raksasa vs katai.',
      'Memprediksi nasib sebuah bintang dari massa awalnya.',
    ],
  },
  tryThis: {
    en: [
      'Set mass to 1 M☉ — find the Sun on the main sequence.',
      'Increase mass to 10 M☉ — does the star get hotter and brighter?',
      'Watch a 1 M☉ star evolve to red giant then white dwarf.',
    ],
    id: [
      'Atur massa ke 1 M☉ — temukan Matahari di deret utama.',
      'Naikkan massa ke 10 M☉ — apakah bintang lebih panas dan lebih terang?',
      'Amati bintang 1 M☉ berevolusi menjadi raksasa merah lalu katai putih.',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'The Hertzsprung–Russell diagram plots two things we can measure for a star: its luminosity (total power output, on a logarithmic scale) against its surface temperature, with temperature running backwards so hot blue stars sit on the left and cool red stars on the right. The position encodes size as well, because luminosity depends on both temperature and radius: L = 4πR²σT⁴. Two stars with the same temperature but very different luminosities must differ in radius, so cool but very bright stars in the upper right are enormous, and hot but faint stars in the lower left are tiny. Around 90% of stars fall on a diagonal band called the main sequence, where they are fusing hydrogen into helium in their cores.',
        'The simulation draws the main sequence from a mass–luminosity relation, L = M^3.5 in solar units, and sets the surface temperature as T = 5778 K × L^(1/8). Mass is the master variable: a 10 M☉ star has L ≈ 3200 L☉ and T ≈ 15,800 K, while a 0.3 M☉ star has L ≈ 0.015 L☉ and T ≈ 3400 K. The same relation explains lifetimes. Fuel scales with M but burn rate with L ≈ M^3.5, so lifetime scales as M^−2.5: a 10 M☉ star exhausts its core hydrogen in about 30 million years, roughly 300 times faster than the Sun\'s 10 billion years. Massive stars are rare, brilliant and short-lived; the faint red dwarfs at the bottom of the band will outlive the present age of the universe many times over.',
        'The life-stage control moves the selected star off the main sequence along an illustrative path. When core hydrogen runs out, the core contracts and heats while the outer layers swell and cool, so the star moves up and to the right as a red giant (the sim multiplies L by 100 and halves T), then grows further during the asymptotic-giant or supergiant phase. What happens next depends on the initial mass. Below about 8 M☉ the star sheds its envelope as a planetary nebula and leaves a white dwarf, an Earth-sized core of carbon and oxygen that is very hot (the sim uses 25,000 K) but very faint (0.001 L☉), placing it in the lower left. Above 8 M☉ the core collapses in a supernova and leaves a neutron star or black hole.',
        'The sim\'s evolutionary multipliers are schematic rather than taken from stellar models. In reality massive stars move almost horizontally across the top of the diagram at nearly constant luminosity rather than brightening a hundredfold, and stars below about 0.5 M☉ will not leave the main sequence for far longer than the current age of the universe. The neutron star point is symbolic: real neutron stars have surface temperatures near a million kelvin and sit far outside any standard HR diagram. The catalogue stars use rounded literature values, and the single exponent 3.5 is itself an average; the true mass–luminosity exponent is about 2.3 for low-mass stars, near 4 around a solar mass and about 3 for the most massive.',
      ],
      id: [
        'Diagram Hertzsprung–Russell memplot dua besaran yang dapat kita ukur dari bintang: luminositas (daya total yang dipancarkan, dalam skala logaritma) terhadap suhu permukaan, dengan sumbu suhu terbalik sehingga bintang biru yang panas berada di kiri dan bintang merah yang dingin di kanan. Posisinya juga menyandikan ukuran, karena luminositas bergantung pada suhu sekaligus jari-jari: L = 4πR²σT⁴. Dua bintang dengan suhu sama tetapi luminositas sangat berbeda pasti berbeda jari-jarinya, sehingga bintang dingin tetapi sangat terang di kanan atas berukuran raksasa, dan bintang panas tetapi redup di kiri bawah berukuran mungil. Sekitar 90% bintang berada pada pita diagonal yang disebut deret utama, tempat mereka memfusikan hidrogen menjadi helium di intinya.',
        'Simulasi menggambar deret utama dari hubungan massa–luminositas, L = M^3,5 dalam satuan Matahari, dan menetapkan suhu permukaan sebagai T = 5778 K × L^(1/8). Massa adalah variabel utamanya: bintang 10 M☉ memiliki L ≈ 3200 L☉ dan T ≈ 15.800 K, sedangkan bintang 0,3 M☉ memiliki L ≈ 0,015 L☉ dan T ≈ 3400 K. Hubungan yang sama menjelaskan umur bintang. Bahan bakar sebanding dengan M tetapi laju pembakaran sebanding dengan L ≈ M^3,5, sehingga umur sebanding dengan M^−2,5: bintang 10 M☉ menghabiskan hidrogen intinya dalam sekitar 30 juta tahun, kira-kira 300 kali lebih cepat daripada Matahari yang 10 miliar tahun. Bintang masif itu langka, sangat terang, dan berumur pendek; katai merah redup di ujung bawah pita akan hidup jauh melampaui usia alam semesta saat ini.',
        'Kontrol tahap kehidupan memindahkan bintang terpilih keluar dari deret utama di sepanjang jalur ilustratif. Ketika hidrogen inti habis, inti menyusut dan memanas sementara lapisan luar mengembang dan mendingin, sehingga bintang bergerak ke kanan atas menjadi raksasa merah (simulasi mengalikan L dengan 100 dan membagi dua T), lalu membesar lagi pada fase raksasa asimtotik atau maharaksasa. Yang terjadi selanjutnya bergantung pada massa awal. Di bawah sekitar 8 M☉ bintang melepaskan selubungnya sebagai nebula planeter dan meninggalkan katai putih, inti karbon-oksigen seukuran Bumi yang sangat panas (simulasi memakai 25.000 K) tetapi sangat redup (0,001 L☉), sehingga berada di kiri bawah. Di atas 8 M☉ inti runtuh dalam supernova dan meninggalkan bintang neutron atau lubang hitam.',
        'Faktor pengali evolusi di simulasi bersifat skematis, bukan diambil dari model bintang. Kenyataannya bintang masif bergerak hampir mendatar melintasi bagian atas diagram dengan luminositas hampir tetap, bukan menjadi seratus kali lebih terang, dan bintang di bawah sekitar 0,5 M☉ tidak akan meninggalkan deret utama selama waktu yang jauh lebih lama dari usia alam semesta saat ini. Titik bintang neutron hanya simbolis: bintang neutron sungguhan bersuhu permukaan sekitar sejuta kelvin dan berada jauh di luar diagram HR baku. Bintang katalog memakai nilai literatur yang dibulatkan, dan eksponen tunggal 3,5 itu sendiri hanyalah rata-rata; eksponen massa–luminositas sesungguhnya sekitar 2,3 untuk bintang bermassa rendah, sekitar 4 di sekitar massa Matahari, dan sekitar 3 untuk yang paling masif.',
      ],
    },
    figure: {
      caption: {
        en: 'Sketch of the HR diagram. Temperature increases to the left. The main sequence (blue) runs from hot, luminous, massive stars to cool, faint red dwarfs. Dashed lines are constant radius from L = 4πR²σT⁴: giants in the upper right are huge, white dwarfs in the lower left are only about the size of Earth.',
        id: 'Sketsa diagram HR. Suhu bertambah ke kiri. Deret utama (biru) membentang dari bintang masif yang panas dan terang sampai katai merah yang dingin dan redup. Garis putus-putus adalah jari-jari tetap dari L = 4πR²σT⁴: raksasa di kanan atas berukuran sangat besar, katai putih di kiri bawah hanya seukuran Bumi.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Hertzsprung-Russell diagram sketch', 'Sketsa diagram Hertzsprung-Russell')}">
  <style>text{font:12px system-ui,sans-serif;fill:currentColor}.m{fill:none;stroke:currentColor;stroke-width:1;opacity:.45}.ax{stroke:currentColor;stroke-width:1.4;fill:none}.s{font-size:10.5px}.r{font-size:9.5px;opacity:.75}</style>
  <line x1="50" y1="20" x2="50" y2="205" class="ax"/>
  <line x1="50" y1="205" x2="340" y2="205" class="ax"/>
  <line x1="112" y1="20" x2="340" y2="76.6" class="m" stroke-dasharray="4 3"/>
  <line x1="50" y1="76.7" x2="340" y2="148.6" class="m" stroke-dasharray="4 3"/>
  <line x1="50" y1="148.7" x2="257" y2="200" class="m" stroke-dasharray="4 3"/>
  <text x="116" y="16" class="r">100 R☉</text>
  <text x="54" y="72" class="r">1 R☉</text>
  <text x="205" y="182" class="r">${L('0.01 R☉', '0,01 R☉')}</text>
  <line x1="70" y1="35" x2="346" y2="172" stroke="#3b82f6" stroke-width="10" opacity=".45" stroke-linecap="round"/>
  <ellipse cx="240" cy="38" rx="95" ry="10" fill="#8b5cf6" opacity=".4"/>
  <ellipse cx="300" cy="86" rx="32" ry="12" fill="#ef4444" opacity=".4"/>
  <ellipse cx="85" cy="172" rx="30" ry="9" fill="#10b981" opacity=".5"/>
  <circle cx="257" cy="128" r="4.5" fill="#f59e0b"/>
  <text x="264" y="140" class="s">${L('Sun', 'Matahari')}</text>
  <text x="195" y="30" class="s">${L('supergiants', 'maharaksasa')}</text>
  <text x="262" y="112" class="s" fill="#ef4444">${L('red giants', 'raksasa merah')}</text>
  <text x="56" y="194" class="s" fill="#10b981">${L('white dwarfs', 'katai putih')}</text>
  <text x="150" y="62" class="s" fill="#3b82f6">${L('main sequence', 'deret utama')}</text>
  <text x="300" y="196" class="s" fill="#3b82f6">${L('red dwarfs', 'katai merah')}</text>
  <text x="20" y="24" class="r">10⁶ L☉</text>
  <text x="26" y="132" class="r">1 L☉</text>
  <text x="14" y="204" class="r">10⁻⁴ L☉</text>
  <text x="50" y="220" class="s">30 000 K</text>
  <text x="340" y="220" class="s" text-anchor="end">3 000 K</text>
  <text x="195" y="220" class="s" text-anchor="middle">${L('surface temperature: cooler →', 'suhu permukaan: lebih dingin →')}</text>
  <text x="195" y="236" class="s" text-anchor="middle" opacity=".7">${L('← hotter, bluer', '← lebih panas, lebih biru')}</text>
  <text x="14" y="112" class="r" transform="rotate(-90 14 112)" text-anchor="middle">${L('luminosity (log)', 'luminositas (log)')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'The HR diagram plots luminosity against surface temperature, with temperature decreasing to the right.',
        'Because L = 4πR²σT⁴, a star\'s position also reveals its radius: upper right means huge, lower left means tiny.',
        'Main-sequence stars fuse hydrogen in their cores, and their position is set almost entirely by mass: L ≈ M^3.5.',
        'Lifetime scales roughly as M^−2.5, so massive stars live millions of years while red dwarfs live for trillions.',
        'Initial mass decides the ending: below about 8 M☉ a white dwarf; above it a supernova leaving a neutron star or black hole.',
      ],
      id: [
        'Diagram HR memplot luminositas terhadap suhu permukaan, dengan suhu berkurang ke kanan.',
        'Karena L = 4πR²σT⁴, posisi bintang juga mengungkap jari-jarinya: kanan atas berarti sangat besar, kiri bawah berarti mungil.',
        'Bintang deret utama memfusikan hidrogen di intinya, dan posisinya hampir sepenuhnya ditentukan oleh massa: L ≈ M^3,5.',
        'Umur bintang sebanding dengan kira-kira M^−2,5, sehingga bintang masif hidup jutaan tahun sementara katai merah hidup triliunan tahun.',
        'Massa awal menentukan akhirnya: di bawah sekitar 8 M☉ menjadi katai putih; di atasnya supernova yang meninggalkan bintang neutron atau lubang hitam.',
      ],
    },
    vocabulary: {
      en: [
        ['Luminosity (L)', 'The total power a star radiates, usually given in units of the Sun\'s luminosity, L☉ = 3.8 × 10²⁶ W.'],
        ['Surface (effective) temperature', 'The temperature of the star\'s visible surface, which sets its colour: about 5800 K for the Sun, over 30,000 K for blue stars, around 3000 K for red ones.'],
        ['Main sequence', 'The diagonal band where stars spend most of their lives fusing hydrogen to helium in their cores.'],
        ['Red giant', 'A star that has exhausted core hydrogen and swollen to tens or hundreds of solar radii while its surface cooled.'],
        ['White dwarf', 'The hot, Earth-sized, slowly cooling remnant core left by a star of less than about 8 solar masses.'],
        ['Supergiant', 'An extremely luminous evolved star of high mass, such as Betelgeuse or Rigel, destined to explode as a supernova.'],
        ['Mass–luminosity relation', 'For main-sequence stars, L is roughly proportional to M^3.5, so a small increase in mass gives a large increase in brightness.'],
        ['Stefan–Boltzmann law', 'The power radiated per unit area of a hot surface is σT⁴; for a sphere, L = 4πR²σT⁴.'],
      ],
      id: [
        ['Luminositas (L)', 'Daya total yang dipancarkan bintang, biasanya dinyatakan dalam satuan luminositas Matahari, L☉ = 3,8 × 10²⁶ W.'],
        ['Suhu permukaan (efektif)', 'Suhu permukaan bintang yang terlihat, yang menentukan warnanya: sekitar 5800 K untuk Matahari, di atas 30.000 K untuk bintang biru, sekitar 3000 K untuk bintang merah.'],
        ['Deret utama', 'Pita diagonal tempat bintang menghabiskan sebagian besar hidupnya memfusikan hidrogen menjadi helium di intinya.'],
        ['Raksasa merah', 'Bintang yang telah menghabiskan hidrogen intinya dan mengembang hingga puluhan atau ratusan jari-jari Matahari sementara permukaannya mendingin.'],
        ['Katai putih', 'Sisa inti yang panas, seukuran Bumi, dan mendingin perlahan, yang ditinggalkan bintang bermassa kurang dari sekitar 8 massa Matahari.'],
        ['Maharaksasa', 'Bintang masif yang telah berevolusi dan sangat terang, seperti Betelgeuse atau Rigel, yang akan meledak sebagai supernova.'],
        ['Hubungan massa–luminositas', 'Untuk bintang deret utama, L kira-kira sebanding dengan M^3,5, sehingga sedikit tambahan massa memberi tambahan kecerlangan yang besar.'],
        ['Hukum Stefan–Boltzmann', 'Daya yang dipancarkan per satuan luas permukaan panas adalah σT⁴; untuk bola, L = 4πR²σT⁴.'],
      ],
    },
    misconceptions: {
      en: [
        ['Stars move along the main sequence as they age.', 'A star stays at nearly the same main-sequence position for most of its life. The main sequence is a line-up of stars of different masses, not an evolutionary track; when a star does evolve, it leaves the band, moving up and to the right.'],
        ['Red stars are hotter than blue stars, because red means hot.', 'It is the reverse. A hotter surface radiates more of its light at shorter wavelengths, so the hottest stars are blue-white (over 30,000 K) and the coolest are red (around 3000 K). Think of a metal bar glowing red, then yellow, then white as it heats.'],
        ['A more massive star has more fuel, so it lives longer.', 'It burns its fuel far faster. Luminosity rises as about M^3.5, so a 10 M☉ star has 10 times the fuel but about 3000 times the power output, and lives only about 1/300 as long as the Sun.'],
        ['The Sun will explode as a supernova.', 'The Sun is far below the 8 M☉ threshold. In about 5 billion years it will become a red giant, shed its outer layers as a planetary nebula and settle down as a white dwarf.'],
      ],
      id: [
        ['Bintang bergerak di sepanjang deret utama saat menua.', 'Bintang bertahan di posisi deret utama yang hampir sama selama sebagian besar hidupnya. Deret utama adalah barisan bintang dengan massa berbeda, bukan jalur evolusi; ketika bintang berevolusi, ia meninggalkan pita itu dan bergerak ke kanan atas.'],
        ['Bintang merah lebih panas daripada bintang biru, karena merah berarti panas.', 'Justru sebaliknya. Permukaan yang lebih panas memancarkan lebih banyak cahayanya pada panjang gelombang pendek, sehingga bintang terpanas berwarna biru-putih (di atas 30.000 K) dan yang terdingin berwarna merah (sekitar 3000 K). Bayangkan batang logam yang berpijar merah, lalu kuning, lalu putih saat dipanaskan.'],
        ['Bintang yang lebih masif punya lebih banyak bahan bakar, jadi hidupnya lebih lama.', 'Bintang masif membakar bahan bakarnya jauh lebih cepat. Luminositas naik sekitar M^3,5, sehingga bintang 10 M☉ punya 10 kali bahan bakar tetapi sekitar 3000 kali daya pancar, dan hanya hidup sekitar 1/300 umur Matahari.'],
        ['Matahari akan meledak sebagai supernova.', 'Massa Matahari jauh di bawah ambang 8 M☉. Sekitar 5 miliar tahun lagi Matahari akan menjadi raksasa merah, melepaskan lapisan luarnya sebagai nebula planeter, dan berakhir sebagai katai putih.'],
      ],
    },
    realWorld: {
      en: [
        'Astronomers estimate the age of a star cluster from its HR diagram: the most massive stars leave the main sequence first, so the "turn-off point" where the band ends tells how old the cluster is.',
        'Sirius, the brightest star in the night sky, is a double: Sirius A is a hot main-sequence star twice the Sun\'s mass, and its companion Sirius B is a white dwarf as massive as the Sun but only the size of Earth.',
        'Betelgeuse, the red shoulder of Orion, is a supergiant of more than 10 solar masses that has already left the main sequence; it will end as a supernova visible in daylight.',
        'Red dwarfs make up about three quarters of all stars in the Milky Way, yet not one is visible to the naked eye, because they sit at the faint end of the main sequence.',
      ],
      id: [
        'Astronom memperkirakan usia gugus bintang dari diagram HR-nya: bintang paling masif meninggalkan deret utama lebih dulu, sehingga "titik belok" tempat pita berakhir memberi tahu usia gugus itu.',
        'Sirius, bintang paling terang di langit malam, adalah bintang ganda: Sirius A adalah bintang deret utama yang panas dengan massa dua kali Matahari, dan pasangannya, Sirius B, adalah katai putih yang massanya sebesar Matahari tetapi ukurannya hanya sebesar Bumi.',
        'Betelgeuse, bahu merah rasi Orion, adalah maharaksasa bermassa lebih dari 10 massa Matahari yang sudah meninggalkan deret utama; ia akan berakhir sebagai supernova yang terlihat di siang hari.',
        'Katai merah mencakup sekitar tiga perempat dari semua bintang di Bimasakti, tetapi tak satu pun terlihat dengan mata telanjang, karena berada di ujung redup deret utama.',
      ],
    },
    questions: {
      en: [
        { q: 'Using the sim\'s relations, what luminosity and surface temperature does a 10 M☉ main-sequence star have?', a: 'L = 10^3.5 ≈ 3160 L☉. T = 5778 K × 3160^(1/8) ≈ 5778 × 2.74 ≈ 15,800 K. The star sits far up and to the left of the Sun on the main sequence, in the blue-white region.' },
        { q: 'Betelgeuse has a surface temperature of about 3500 K, cooler than the Sun, yet a luminosity of about 10⁵ L☉. Estimate its radius in solar radii.', a: 'From L = 4πR²σT⁴, R/R☉ = √(L/L☉) × (T☉/T)² = √(10⁵) × (5778/3500)² ≈ 316 × 2.7 ≈ 860 R☉. Placed where the Sun is, Betelgeuse would extend beyond the orbit of Mars, consistent with its position in the upper right of the diagram.' },
        { q: 'A 10 M☉ star has ten times as much hydrogen as the Sun. Why does it run out of core fuel roughly 300 times sooner?', a: 'Its luminosity is about 10^3.5 ≈ 3160 times the Sun\'s, so it burns fuel 3160 times faster while having only 10 times as much. Lifetime is proportional to M/L = M^−2.5, giving 10^−2.5 ≈ 1/316 of the Sun\'s 10 billion years, or about 30 million years.' },
      ],
      id: [
        { q: 'Dengan hubungan yang dipakai simulasi, berapa luminositas dan suhu permukaan bintang deret utama bermassa 10 M☉?', a: 'L = 10^3,5 ≈ 3160 L☉. T = 5778 K × 3160^(1/8) ≈ 5778 × 2,74 ≈ 15.800 K. Bintang itu berada jauh di kiri atas Matahari pada deret utama, di daerah biru-putih.' },
        { q: 'Betelgeuse bersuhu permukaan sekitar 3500 K, lebih dingin dari Matahari, tetapi luminositasnya sekitar 10⁵ L☉. Perkirakan jari-jarinya dalam jari-jari Matahari.', a: 'Dari L = 4πR²σT⁴, R/R☉ = √(L/L☉) × (T☉/T)² = √(10⁵) × (5778/3500)² ≈ 316 × 2,7 ≈ 860 R☉. Jika diletakkan di posisi Matahari, Betelgeuse akan melampaui orbit Mars, sesuai dengan posisinya di kanan atas diagram.' },
        { q: 'Bintang 10 M☉ memiliki hidrogen sepuluh kali lebih banyak daripada Matahari. Mengapa bahan bakar intinya habis kira-kira 300 kali lebih cepat?', a: 'Luminositasnya sekitar 10^3,5 ≈ 3160 kali Matahari, sehingga ia membakar bahan bakar 3160 kali lebih cepat padahal hanya punya 10 kali lebih banyak. Umur sebanding dengan M/L = M^−2,5, menghasilkan 10^−2,5 ≈ 1/316 dari 10 miliar tahun umur Matahari, atau sekitar 30 juta tahun.' },
      ],
    },
  },
};
