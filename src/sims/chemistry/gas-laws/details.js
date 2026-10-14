// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Relate temperature to average particle kinetic energy.',
      'See Boyle\'s law (P↑ as V↓) and Charles\'s law (V↑ as T↑) emerge.',
      'Predict the effect of changing each variable on pressure.',
    ],
    id: [
      'Mengaitkan suhu dengan energi kinetik rata-rata partikel.',
      'Melihat hukum Boyle (P↑ saat V↓) dan hukum Charles (V↑ saat T↑) muncul.',
      'Memprediksi efek perubahan tiap variabel terhadap tekanan.',
    ],
  },
  tryThis: {
    en: [
      'Halve the volume — does pressure roughly double?',
      'Double the temperature — by how much does pressure rise?',
      'Find a (T, V) combination that keeps pressure constant when n changes.',
    ],
    id: [
      'Setengahkan volume — apakah tekanan menjadi sekitar dua kali lipat?',
      'Gandakan suhu — berapa besar kenaikan tekanannya?',
      'Cari kombinasi (T, V) yang menjaga tekanan tetap saat n diubah.',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'A gas is an enormous number of tiny particles flying about at random, colliding with each other and with the walls of their container. Every time a particle hits a wall it bounces back, and the wall receives a small push. Pressure is the total of these pushes per second, spread over the area of the wall. Temperature, on the kinetic theory view, is a measure of how fast the particles move: the average kinetic energy of a particle is proportional to the absolute temperature, so the typical speed grows as √T. Pressure rises if particles hit the wall more often, which happens when there are more of them per unit volume or when they move faster, and it also rises if each hit is harder, which again happens when they move faster.',
        'Putting these together, P is proportional to (N/V) × speed × speed, that is to NT/V, which is the ideal gas law PV = nRT (or PV = NkT when counting particles). All the classic gas laws are special cases. Boyle\'s law: at fixed T and n, halving V doubles P. Charles\'s law: at fixed P, V grows in proportion to T. Gay-Lussac\'s law: at fixed V, P grows in proportion to T. Avogadro\'s law: at fixed T and P, V is proportional to n. In every case T must be in kelvin; going from 20 °C to 40 °C is not a doubling of temperature but a rise from 293 K to 313 K, about 7%.',
        'The simulation is a two-dimensional box. The particle slider sets n from 10 to 250, the temperature slider sets T from 100 to 800 K and rescales every particle\'s speed in proportion to √T, and the volume slider slides the right-hand wall in to as little as 30% of the full width. The pressure readout adds up the momentum the walls receive: every bounce hands its wall 2m|v⊥|, and the total per second is divided by the length of the walls and averaged over half-second windows, which is why it jitters. Particles pass through each other without colliding, so there is no exchange of energy between them and they all keep the same speed, unlike a real gas in which collisions produce a broad spread of speeds (the Maxwell–Boltzmann distribution).',
        'Because the readout measures momentum transfer rather than just counting hits, it captures the whole temperature effect. Doubling T in the sim makes the particles √2 ≈ 1.41 times faster, so they hit the walls 1.41× as often and each hit delivers 1.41× as much momentum; the product doubles the pressure, exactly as PV = nRT predicts. Tests of Boyle\'s law (changing V), Avogadro\'s law (changing n) and Gay-Lussac\'s law (changing T) all come out right, and the displayed PV/nT stays roughly constant apart from statistical jitter, which is larger when there are few particles. Real gases also depart from PV = nRT at very high pressure or very low temperature, when the particles\' own volume and their attractions for each other matter; for air at everyday conditions the ideal gas law is accurate to better than 1%.',
      ],
      id: [
        'Gas adalah sejumlah sangat besar partikel kecil yang beterbangan secara acak, saling bertumbukan dan menumbuk dinding wadahnya. Setiap kali partikel menumbuk dinding ia memantul kembali, dan dinding menerima dorongan kecil. Tekanan adalah jumlah dorongan ini per detik, dibagi luas dinding. Suhu, menurut teori kinetik, adalah ukuran seberapa cepat partikel bergerak: energi kinetik rata-rata partikel sebanding dengan suhu mutlak, sehingga laju khasnya bertambah sebagai √T. Tekanan naik jika partikel menumbuk dinding lebih sering, yang terjadi ketika jumlahnya per satuan volume lebih banyak atau ketika mereka bergerak lebih cepat, dan juga naik jika tiap tumbukan lebih keras, yang lagi-lagi terjadi ketika mereka bergerak lebih cepat.',
        'Menggabungkan semuanya, P sebanding dengan (N/V) × laju × laju, yaitu NT/V, dan inilah hukum gas ideal PV = nRT (atau PV = NkT jika menghitung partikel). Semua hukum gas klasik adalah kasus khususnya. Hukum Boyle: pada T dan n tetap, menyetengahkan V menggandakan P. Hukum Charles: pada P tetap, V bertambah sebanding dengan T. Hukum Gay-Lussac: pada V tetap, P bertambah sebanding dengan T. Hukum Avogadro: pada T dan P tetap, V sebanding dengan n. Dalam semua kasus T harus dalam kelvin; dari 20 °C ke 40 °C bukan penggandaan suhu, melainkan kenaikan dari 293 K ke 313 K, sekitar 7%.',
        'Simulasi ini berupa kotak dua dimensi. Slider partikel mengatur n dari 10 sampai 250, slider suhu mengatur T dari 100 sampai 800 K dan menskalakan ulang laju tiap partikel sebanding dengan √T, dan slider volume menggeser dinding kanan ke dalam hingga 30% dari lebar penuh. Angka tekanan yang ditampilkan menjumlahkan momentum yang diterima dinding: tiap pantulan memberi dindingnya 2m|v⊥|, dan jumlah per detiknya dibagi panjang dinding lalu dirata-ratakan tiap setengah detik, itulah sebabnya angkanya bergetar. Partikel saling menembus tanpa bertumbukan, sehingga tidak ada pertukaran energi di antara mereka dan semuanya mempertahankan laju yang sama, berbeda dengan gas nyata yang tumbukannya menghasilkan sebaran laju yang lebar (distribusi Maxwell–Boltzmann).',
        'Karena angka tekanan mengukur perpindahan momentum, bukan sekadar menghitung tumbukan, ia menangkap seluruh pengaruh suhu. Menggandakan T di simulasi membuat partikel √2 ≈ 1,41 kali lebih cepat, sehingga mereka menumbuk dinding 1,41 kali lebih sering dan tiap tumbukan memberi momentum 1,41 kali lebih besar; hasil kalinya menggandakan tekanan, persis seperti prediksi PV = nRT. Pengujian hukum Boyle (mengubah V), hukum Avogadro (mengubah n), dan hukum Gay-Lussac (mengubah T) semuanya memberi hasil yang benar, dan PV/nT yang ditampilkan tetap hampir konstan selain getaran statistik, yang lebih besar ketika partikelnya sedikit. Gas nyata juga menyimpang dari PV = nRT pada tekanan sangat tinggi atau suhu sangat rendah, ketika volume partikel sendiri dan tarik-menarik antarpartikel menjadi penting; untuk udara pada kondisi sehari-hari hukum gas ideal akurat hingga lebih baik dari 1%.',
      ],
    },
    figure: {
      caption: {
        en: 'Pressure is the push of countless particle collisions on the walls. Each bounce reverses the particle\'s momentum, handing the wall 2mv. More particles, a smaller box, or faster (hotter) particles all mean more push per second.',
        id: 'Tekanan adalah dorongan dari tumbukan partikel yang tak terhitung pada dinding. Tiap pantulan membalik momentum partikel, memberi dinding 2mv. Lebih banyak partikel, kotak lebih kecil, atau partikel lebih cepat (lebih panas) semuanya berarti dorongan per detik lebih besar.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Gas particles hitting the walls of a box', 'Partikel gas menumbuk dinding kotak')}">
  <style>text{font:12px system-ui,sans-serif;fill:currentColor}.m{fill:none;stroke:currentColor;stroke-width:1.2;opacity:.45}.v{stroke:#3b82f6;stroke-width:1.8;fill:none}.p{stroke:#ef4444;stroke-width:2.2;fill:none}.s{font-size:10px;opacity:.85}</style>
  <rect x="30" y="40" width="140" height="140" fill="none" stroke="currentColor" stroke-width="2"/>
  <circle cx="60" cy="70" r="4" fill="#3b82f6"/><line x1="60" y1="70" x2="76" y2="62" class="v" marker-end="url(#w)"/>
  <circle cx="120" cy="58" r="4" fill="#3b82f6"/><line x1="120" y1="58" x2="108" y2="74" class="v" marker-end="url(#w)"/>
  <circle cx="90" cy="120" r="4" fill="#3b82f6"/><line x1="90" y1="120" x2="104" y2="134" class="v" marker-end="url(#w)"/>
  <circle cx="150" cy="100" r="4" fill="#3b82f6"/><line x1="150" y1="100" x2="166" y2="100" class="v" marker-end="url(#w)"/>
  <circle cx="70" cy="165" r="4" fill="#3b82f6"/><line x1="70" y1="165" x2="58" y2="153" class="v" marker-end="url(#w)"/>
  <circle cx="138" cy="160" r="4" fill="#3b82f6"/><line x1="138" y1="160" x2="148" y2="174" class="v" marker-end="url(#w)"/>
  <circle cx="110" cy="92" r="4" fill="#3b82f6"/><line x1="110" y1="92" x2="96" y2="82" class="v" marker-end="url(#w)"/>
  <circle cx="45" cy="110" r="4" fill="#3b82f6"/><line x1="45" y1="110" x2="52" y2="126" class="v" marker-end="url(#w)"/>
  <line x1="172" y1="70" x2="188" y2="70" class="p" marker-end="url(#w)"/>
  <line x1="172" y1="110" x2="188" y2="110" class="p" marker-end="url(#w)"/>
  <line x1="172" y1="150" x2="188" y2="150" class="p" marker-end="url(#w)"/>
  <text x="194" y="114" fill="#ef4444">P</text>
  <text x="34" y="34" class="s">${L('N particles, volume V, temperature T', 'N partikel, volume V, suhu T')}</text>
  <line x1="330" y1="48" x2="330" y2="132" stroke="currentColor" stroke-width="3"/>
  <text x="300" y="42" class="s">${L('wall', 'dinding')}</text>
  <circle cx="280" cy="70" r="5" fill="#3b82f6"/><line x1="288" y1="70" x2="324" y2="70" class="v" marker-end="url(#w)"/>
  <text x="290" y="62" class="s">${L('before: +mv', 'sebelum: +mv')}</text>
  <circle cx="280" cy="112" r="5" fill="#3b82f6"/><line x1="324" y1="112" x2="290" y2="112" class="v" marker-end="url(#w)"/>
  <text x="290" y="128" class="s">${L('after: −mv', 'sesudah: −mv')}</text>
  <line x1="332" y1="91" x2="352" y2="91" class="p" marker-end="url(#w)"/>
  <text x="226" y="152" class="s">${L('each hit pushes', 'tiap tumbukan mendorong')}</text>
  <text x="226" y="165" class="s">${L('the wall by 2mv', 'dinding sebesar 2mv')}</text>
  <text x="30" y="200" class="s">${L('more particles (N↑): more hits per second → P↑', 'N naik: lebih banyak tumbukan tiap detik → P naik')}</text>
  <text x="30" y="215" class="s">${L('smaller volume (V↓): hits more often → P↑', 'V turun: tumbukan lebih sering → P naik')}</text>
  <text x="30" y="230" class="s">${L('hotter (T↑): more hits and harder hits → P↑', 'T naik: tumbukan lebih sering dan lebih keras → P naik')}</text>
  <defs><marker id="w" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="context-stroke"/></marker></defs>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Gas pressure is caused by particles colliding with the walls; it depends on how often they hit and how hard.',
        'Temperature in kelvin is proportional to the average kinetic energy of the particles, so particle speed grows as √T.',
        'PV = nRT ties pressure, volume, amount and temperature together; Boyle\'s, Charles\'s and Gay-Lussac\'s laws are each one slice of it.',
        'Halving the volume doubles the pressure at fixed T; doubling the kelvin temperature doubles the pressure at fixed V.',
        'The ideal gas model ignores particle size and attractions, which is fine for air at everyday conditions but fails near condensation.',
      ],
      id: [
        'Tekanan gas disebabkan oleh partikel yang menumbuk dinding; bergantung pada seberapa sering dan seberapa keras tumbukannya.',
        'Suhu dalam kelvin sebanding dengan energi kinetik rata-rata partikel, sehingga laju partikel bertambah sebagai √T.',
        'PV = nRT mengikat tekanan, volume, jumlah zat, dan suhu; hukum Boyle, Charles, dan Gay-Lussac masing-masing adalah satu irisannya.',
        'Menyetengahkan volume menggandakan tekanan pada T tetap; menggandakan suhu kelvin menggandakan tekanan pada V tetap.',
        'Model gas ideal mengabaikan ukuran partikel dan tarik-menarik antarpartikel; ini cukup baik untuk udara pada kondisi sehari-hari tetapi gagal di dekat kondisi pengembunan.',
      ],
    },
    vocabulary: {
      en: [
        ['Pressure (P)', 'Force per unit area on the walls, in pascals (1 Pa = 1 N/m²); it comes from particle collisions.'],
        ['Absolute temperature', 'Temperature measured in kelvin from absolute zero; 0 °C = 273.15 K. Gas laws only work with kelvin.'],
        ['Kinetic theory', 'The model of a gas as many small particles in constant random motion whose collisions explain pressure and temperature.'],
        ['Ideal gas', 'An imaginary gas of point particles with no attractions, which obeys PV = nRT exactly.'],
        ['Mole (n)', 'An amount of substance containing 6.02 × 10²³ particles; R = 8.314 J/(mol·K) is the gas constant per mole.'],
        ['Boyle\'s law', 'At constant temperature, pressure times volume is constant: PV = constant.'],
        ['Charles\'s law', 'At constant pressure, volume is proportional to absolute temperature.'],
        ['Root-mean-square speed', 'A typical particle speed, √(3kT/m) in three dimensions; it grows with √T and is lower for heavier molecules.'],
      ],
      id: [
        ['Tekanan (P)', 'Gaya per satuan luas pada dinding, dalam pascal (1 Pa = 1 N/m²); berasal dari tumbukan partikel.'],
        ['Suhu mutlak', 'Suhu yang diukur dalam kelvin dari nol mutlak; 0 °C = 273,15 K. Hukum gas hanya berlaku dengan kelvin.'],
        ['Teori kinetik', 'Model gas sebagai banyak partikel kecil yang terus bergerak acak, yang tumbukannya menjelaskan tekanan dan suhu.'],
        ['Gas ideal', 'Gas khayal berupa partikel titik tanpa tarik-menarik, yang mematuhi PV = nRT dengan tepat.'],
        ['Mol (n)', 'Jumlah zat yang mengandung 6,02 × 10²³ partikel; R = 8,314 J/(mol·K) adalah tetapan gas per mol.'],
        ['Hukum Boyle', 'Pada suhu tetap, tekanan kali volume bernilai tetap: PV = tetap.'],
        ['Hukum Charles', 'Pada tekanan tetap, volume sebanding dengan suhu mutlak.'],
        ['Laju akar kuadrat rata-rata', 'Laju khas partikel, √(3kT/m) dalam tiga dimensi; bertambah dengan √T dan lebih rendah untuk molekul yang lebih berat.'],
      ],
    },
    misconceptions: {
      en: [
        ['Heating a gas from 20 °C to 40 °C doubles its pressure.', 'Only kelvin temperatures can be doubled meaningfully. 20 °C is 293 K and 40 °C is 313 K, so the pressure rises by only about 7%. Doubling would need 586 K, about 313 °C.'],
        ['Gas particles are packed closely and push on each other to create pressure.', 'In a gas at ordinary pressure the particles are far apart, about ten times their own diameter, and spend almost all their time flying freely. Pressure comes from hits on the wall, not from particles squeezing each other.'],
        ['All the particles in a gas move at the same speed.', 'Real gas particles have a wide spread of speeds that is constantly reshuffled by collisions. The sim\'s particles do move at one speed, because they never collide with each other; this is one of its simplifications.'],
        ['Compressing a gas does not change its temperature.', 'Rapid compression makes a gas hotter, as in a bicycle pump or diesel engine, because the moving wall gives energy to the particles that hit it. The sim does not model this; its temperature is fixed by the slider alone.'],
      ],
      id: [
        ['Memanaskan gas dari 20 °C ke 40 °C menggandakan tekanannya.', 'Hanya suhu kelvin yang bermakna untuk digandakan. 20 °C adalah 293 K dan 40 °C adalah 313 K, sehingga tekanan hanya naik sekitar 7%. Penggandaan membutuhkan 586 K, sekitar 313 °C.'],
        ['Partikel gas tersusun rapat dan saling mendorong untuk menciptakan tekanan.', 'Dalam gas pada tekanan biasa partikelnya berjauhan, sekitar sepuluh kali diameternya sendiri, dan hampir seluruh waktunya melayang bebas. Tekanan berasal dari tumbukan pada dinding, bukan dari partikel yang saling menekan.'],
        ['Semua partikel dalam gas bergerak dengan laju yang sama.', 'Partikel gas nyata memiliki sebaran laju yang lebar dan terus diacak oleh tumbukan. Partikel di simulasi memang bergerak dengan satu laju, karena tidak pernah saling bertumbukan; ini salah satu penyederhanaannya.'],
        ['Memampatkan gas tidak mengubah suhunya.', 'Pemampatan cepat membuat gas lebih panas, seperti pada pompa sepeda atau mesin diesel, karena dinding yang bergerak memberi energi pada partikel yang menumbuknya. Simulasi tidak memodelkan ini; suhunya hanya ditentukan oleh slider.'],
      ],
    },
    realWorld: {
      en: [
        'Car tyre pressure rises on a hot day or after a long drive, because the air inside warms while its volume stays almost fixed (Gay-Lussac\'s law).',
        'Aerosol cans carry a warning not to heat or puncture them: the trapped gas\'s pressure climbs with temperature until the can can fail.',
        'Scuba divers must breathe out while ascending; air in the lungs expands as the surrounding pressure falls (Boyle\'s law), and holding it in can injure the lungs.',
        'A weather balloon is launched only partly inflated so that it has room to expand as it rises into thinner, lower-pressure air, growing several times in diameter.',
      ],
      id: [
        'Tekanan ban mobil naik pada hari panas atau setelah perjalanan jauh, karena udara di dalamnya menghangat sementara volumenya hampir tetap (hukum Gay-Lussac).',
        'Kaleng aerosol membawa peringatan agar tidak dipanaskan atau ditusuk: tekanan gas yang terperangkap naik seiring suhu hingga kaleng dapat pecah.',
        'Penyelam harus mengembuskan napas saat naik ke permukaan; udara di paru-paru memuai saat tekanan sekitar turun (hukum Boyle), dan menahannya dapat melukai paru-paru.',
        'Balon cuaca diluncurkan dalam keadaan hanya terisi sebagian agar ada ruang untuk memuai saat naik ke udara yang lebih tipis dan bertekanan lebih rendah, membesar beberapa kali diameternya.',
      ],
    },
    questions: {
      en: [
        { q: 'A gas occupies 2.0 L at 100 kPa. It is compressed to 0.5 L at constant temperature. What is the new pressure?', a: 'Boyle\'s law: P₁V₁ = P₂V₂, so P₂ = 100 × 2.0/0.5 = 400 kPa. The volume fell to a quarter, so the particles hit the walls four times as often.' },
        { q: 'A sealed rigid container holds gas at 150 kPa and 300 K. It is heated to 600 K. What is the pressure now? What would it be at 327 °C?', a: 'At fixed V, P is proportional to T in kelvin: P₂ = 150 × 600/300 = 300 kPa. 327 °C is 600 K, so that gives the same answer, 300 kPa. Note that 327 °C is not "twice" 27 °C in any useful sense; only the kelvin values can be compared as ratios.' },
        { q: 'In the sim, doubling T doubles the pressure readout, yet the particles only move √2 ≈ 1.41 times faster. Where does the other factor of 1.41 come from?', a: 'Pressure depends on how often the walls are hit and on how hard. Faster particles cross the box sooner, so they hit 1.41 times as often, and each hit transfers momentum 2mv, which is also 1.41 times larger. The product, 1.41 × 1.41 = 2, is the doubling the formula predicts; a readout that merely counted hits would miss the second factor.' },
      ],
      id: [
        { q: 'Sebuah gas menempati 2,0 L pada 100 kPa. Gas dimampatkan menjadi 0,5 L pada suhu tetap. Berapa tekanan barunya?', a: 'Hukum Boyle: P₁V₁ = P₂V₂, sehingga P₂ = 100 × 2,0/0,5 = 400 kPa. Volumenya menjadi seperempat, sehingga partikel menumbuk dinding empat kali lebih sering.' },
        { q: 'Wadah kaku tertutup berisi gas pada 150 kPa dan 300 K. Wadah dipanaskan sampai 600 K. Berapa tekanannya kini? Berapa pada 327 °C?', a: 'Pada V tetap, P sebanding dengan T dalam kelvin: P₂ = 150 × 600/300 = 300 kPa. 327 °C sama dengan 600 K, sehingga jawabannya sama, 300 kPa. Perhatikan bahwa 327 °C bukan "dua kali" 27 °C dalam arti apa pun yang berguna; hanya nilai kelvin yang bisa dibandingkan sebagai perbandingan.' },
        { q: 'Di simulasi, menggandakan T menggandakan angka tekanan, padahal partikel hanya bergerak √2 ≈ 1,41 kali lebih cepat. Dari mana faktor 1,41 yang satunya lagi?', a: 'Tekanan bergantung pada seberapa sering dinding ditumbuk dan seberapa keras. Partikel yang lebih cepat menyeberangi kotak lebih singkat, sehingga menumbuk 1,41 kali lebih sering, dan tiap tumbukan memindahkan momentum 2mv yang juga 1,41 kali lebih besar. Hasil kalinya, 1,41 × 1,41 = 2, adalah penggandaan yang diprediksi rumus; angka yang hanya menghitung tumbukan akan kehilangan faktor kedua itu.' },
      ],
    },
  },
};
