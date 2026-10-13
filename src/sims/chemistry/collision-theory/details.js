// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Connect kinetic energy distribution to fraction able to react.',
      'Apply rate ∝ [A][B] · exp(−Eₐ/RT).',
      'Predict effects of catalysts (lower Eₐ).',
    ],
    id: [
      'Mengaitkan distribusi energi kinetik dengan fraksi yang mampu bereaksi.',
      'Menerapkan laju ∝ [A][B] · exp(−Eₐ/RT).',
      'Memprediksi efek katalis (menurunkan Eₐ).',
    ],
  },
  tryThis: {
    en: [
      'Double temperature — does the rate jump much more than 2x?',
      'Halve concentration — does rate roughly halve?',
      'Click "catalyst" to lower Eₐ — see rate spike.',
    ],
    id: [
      'Gandakan suhu — apakah laju melonjak jauh lebih dari 2x?',
      'Setengahkan konsentrasi — apakah laju kira-kira jadi setengah?',
      'Klik "katalis" untuk menurunkan Eₐ — amati laju melonjak.',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'For two molecules to react they must first meet, and meeting is not enough: the collision must be hard enough to break or rearrange existing bonds. Collision theory says the rate of a reaction equals the number of collisions per second multiplied by the fraction of those collisions that carry at least the activation energy Eₐ (and, for real molecules, that hit in the right orientation). Because molecular speeds are spread over a wide range, the Maxwell–Boltzmann distribution, only the fast tail of the population has enough energy, and that fraction is roughly exp(−Eₐ/RT). The Arrhenius equation k = A·exp(−Eₐ/RT) packages this: the pre-factor A counts collisions and the exponential counts the successful ones.',
        'The simulation builds a reaction from the particles up. Blue A and red B particles bounce around a two-dimensional box; their speeds are scaled so that the average kinetic energy is proportional to the temperature you set. Whenever an A touches a B, the sim compares the kinetic energy of their relative motion with Eₐ. If it is large enough the pair disappears and a green C particle is created at the meeting point; otherwise they simply bounce apart. The panel counts collisions and reactions and shows a running rate in reactions per second. To keep that rate readable, the sim quietly replaces each consumed A and B so their numbers stay at the slider values, like a reactor that is continuously fed with fresh reactants.',
        'The sliders map onto the factors in the rate law. Raising the number of A or B particles raises the collision frequency in proportion, so the rate is proportional to [A]·[B]: double both and the rate roughly quadruples. Raising the temperature does two things: the particles collide a little more often because they move faster, and, much more importantly, a far larger share of collisions clears the Eₐ threshold. That is why the rate climbs steeply with T rather than doubling when T doubles. The Eₐ slider sets the threshold directly, and the catalyst button halves it: a catalyst provides a different pathway with a lower barrier, so more of the same collisions succeed, without heating anything.',
        'The model is a cartoon of real kinetics. It is two-dimensional, uses a few dozen particles so the rate is noisy, and measures Eₐ in its own arbitrary energy units rather than kJ/mol. The speeds are set by rescaling rather than by a true Maxwell–Boltzmann distribution, so trends are right but a plot of ln(rate) against 1/T will not give an exact straight line. There is no orientation requirement, no reverse reaction, and the C particles are inert spectators. Even so, the central lesson is faithful: most collisions fail, temperature works mainly through the energetic tail, and a catalyst speeds things up by lowering the hurdle rather than by adding energy.',
      ],
      id: [
        'Agar dua molekul bereaksi, keduanya harus bertemu dulu, dan bertemu saja tidak cukup: tumbukannya harus cukup keras untuk memutus atau menata ulang ikatan yang ada. Teori tumbukan menyatakan laju reaksi sama dengan jumlah tumbukan per detik dikalikan fraksi tumbukan yang membawa energi setidaknya sebesar energi aktivasi Eₐ (dan, untuk molekul nyata, yang menumbuk dengan orientasi yang tepat). Karena kelajuan molekul tersebar dalam rentang lebar, yaitu distribusi Maxwell–Boltzmann, hanya ekor cepat dari populasi yang berenergi cukup, dan fraksi itu kira-kira exp(−Eₐ/RT). Persamaan Arrhenius k = A·exp(−Eₐ/RT) merangkumnya: faktor A menghitung tumbukan dan eksponensialnya menghitung tumbukan yang berhasil.',
        'Simulasi membangun reaksi dari partikel-partikelnya. Partikel A biru dan B merah memantul dalam kotak dua dimensi; kelajuannya diskalakan agar energi kinetik rata-rata sebanding dengan suhu yang kamu atur. Setiap kali A menyentuh B, simulasi membandingkan energi kinetik gerak relatif keduanya dengan Eₐ. Jika cukup besar, pasangan itu hilang dan partikel C hijau tercipta di titik pertemuan; jika tidak, keduanya hanya memantul. Panel menghitung tumbukan dan reaksi serta menampilkan laju berjalan dalam reaksi per detik. Agar laju itu mudah dibaca, simulasi diam-diam mengganti setiap A dan B yang terpakai sehingga jumlahnya tetap pada nilai slider, seperti reaktor yang terus diberi pereaksi segar.',
        'Slider-slider sesuai dengan faktor-faktor dalam hukum laju. Menambah jumlah partikel A atau B menaikkan frekuensi tumbukan secara proporsional, sehingga laju sebanding dengan [A]·[B]: gandakan keduanya dan laju kira-kira menjadi empat kali. Menaikkan suhu melakukan dua hal: partikel bertumbukan sedikit lebih sering karena bergerak lebih cepat, dan, jauh lebih penting, bagian tumbukan yang melampaui ambang Eₐ menjadi jauh lebih besar. Itulah sebabnya laju menanjak tajam terhadap T, bukan hanya berlipat dua saat T berlipat dua. Slider Eₐ mengatur ambang secara langsung, dan tombol katalis menyetengahkannya: katalis menyediakan jalur lain dengan penghalang lebih rendah, sehingga lebih banyak tumbukan yang sama berhasil, tanpa memanaskan apa pun.',
        'Model ini adalah kartun dari kinetika nyata. Ia dua dimensi, memakai beberapa puluh partikel sehingga lajunya berderau, dan mengukur Eₐ dalam satuan energi sembarang miliknya sendiri, bukan kJ/mol. Kelajuan diatur dengan penskalaan ulang, bukan distribusi Maxwell–Boltzmann sejati, sehingga kecenderungannya benar tetapi grafik ln(laju) terhadap 1/T tidak akan memberi garis lurus yang persis. Tidak ada syarat orientasi, tidak ada reaksi balik, dan partikel C hanya penonton yang inert. Meski demikian, pelajaran intinya tetap setia: sebagian besar tumbukan gagal, suhu bekerja terutama lewat ekor berenergi tinggi, dan katalis mempercepat reaksi dengan merendahkan rintangan, bukan dengan menambah energi.',
      ],
    },
    figure: {
      caption: {
        en: 'Distribution of collision energies at a low and a high temperature. Only collisions to the right of Eₐ (shaded) can react. Warming the sample broadens the curve and multiplies that shaded fraction; a catalyst moves the Eₐ line to the left instead, so more of the existing collisions count.',
        id: 'Distribusi energi tumbukan pada suhu rendah dan suhu tinggi. Hanya tumbukan di sebelah kanan Eₐ (daerah berarsir) yang dapat bereaksi. Memanaskan sampel melebarkan kurva dan melipatgandakan fraksi berarsir itu; katalis justru menggeser garis Eₐ ke kiri, sehingga lebih banyak tumbukan yang sudah ada ikut dihitung.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Energy distribution and activation energy', 'Distribusi energi dan energi aktivasi')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.ax{stroke:currentColor;stroke-width:1.2;fill:none}.c{fill:none;stroke-width:2.4}</style>
  <path d="M210 152 L250 167 L300 184 L340 192 L340 200 L210 200 Z" fill="#ef4444" opacity=".3"/>
  <path d="M210 190 L260 196 L340 200 L210 200 Z" fill="#3b82f6" opacity=".45"/>
  <path d="M40 200 C55 90 80 70 100 85 C130 115 170 170 340 199" class="c" stroke="#3b82f6"/>
  <path d="M40 200 C70 140 110 110 150 118 C200 130 260 170 340 192" class="c" stroke="#ef4444"/>
  <line x1="210" y1="40" x2="210" y2="200" stroke="currentColor" stroke-width="1.4" stroke-dasharray="5 3"/>
  <text x="214" y="52" style="font-weight:bold">Eₐ</text>
  <line x1="160" y1="60" x2="160" y2="200" stroke="#10b981" stroke-width="1.4" stroke-dasharray="5 3"/>
  <text x="112" y="58" fill="#10b981">${L('Eₐ with catalyst', 'Eₐ dengan katalis')}</text>
  <line x1="205" y1="66" x2="166" y2="66" stroke="#10b981" stroke-width="1.2" marker-end="url(#ar)"/>
  <text x="60" y="70" fill="#3b82f6" style="font-weight:bold">${L('low T', 'T rendah')}</text>
  <text x="150" y="108" fill="#ef4444" style="font-weight:bold">${L('high T', 'T tinggi')}</text>
  <text x="222" y="140" fill="#ef4444">${L('can react', 'dapat bereaksi')}</text>
  <text x="222" y="152" fill="#ef4444">(E ≥ Eₐ)</text>
  <line x1="40" y1="30" x2="40" y2="200" class="ax"/>
  <line x1="40" y1="200" x2="340" y2="200" class="ax" marker-end="url(#ar)"/>
  <text x="18" y="115" transform="rotate(-90 18 115)" text-anchor="middle">${L('number of collisions', 'jumlah tumbukan')}</text>
  <text x="190" y="218" text-anchor="middle">${L('collision energy', 'energi tumbukan')}</text>
  <text x="190" y="234" text-anchor="middle" opacity=".75">${L('same total area under both curves', 'luas total di bawah kedua kurva sama')}</text>
  <defs><marker id="ar" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="context-stroke"/></marker></defs>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'A reaction happens only when particles collide with at least the activation energy Eₐ (and, for real molecules, the right orientation).',
        'Rate is proportional to the collision frequency, which is proportional to [A]·[B] for a two-particle reaction.',
        'Temperature works mainly through the fraction of energetic collisions, exp(−Eₐ/RT), so the rate rises steeply with T.',
        'A catalyst lowers Eₐ by offering a different pathway; it is not consumed and does not add energy.',
        'Only a small fraction of collisions react; most particles simply bounce off each other.',
      ],
      id: [
        'Reaksi terjadi hanya ketika partikel bertumbukan dengan energi setidaknya sebesar energi aktivasi Eₐ (dan, untuk molekul nyata, dengan orientasi yang tepat).',
        'Laju sebanding dengan frekuensi tumbukan, yang sebanding dengan [A]·[B] untuk reaksi dua partikel.',
        'Suhu bekerja terutama melalui fraksi tumbukan berenergi tinggi, exp(−Eₐ/RT), sehingga laju naik tajam terhadap T.',
        'Katalis merendahkan Eₐ dengan menawarkan jalur lain; katalis tidak habis terpakai dan tidak menambah energi.',
        'Hanya sebagian kecil tumbukan yang bereaksi; kebanyakan partikel hanya saling memantul.',
      ],
    },
    vocabulary: {
      en: [
        ['Activation energy (Eₐ)', 'The minimum collision energy needed for a reaction to occur; the height of the energy barrier.'],
        ['Collision frequency', 'How many collisions happen per second; it grows with concentration and, more slowly, with temperature.'],
        ['Effective collision', 'A collision with enough energy and the right orientation to produce products.'],
        ['Maxwell–Boltzmann distribution', 'The spread of molecular kinetic energies at a given temperature; higher T broadens it and lengthens the high-energy tail.'],
        ['Arrhenius equation', 'k = A·exp(−Eₐ/RT), relating the rate constant to temperature and activation energy.'],
        ['Rate constant (k)', 'The proportionality constant in the rate law, rate = k[A][B]; it depends on temperature and Eₐ but not on concentration.'],
        ['Catalyst', 'A substance that speeds up a reaction by providing a pathway with lower Eₐ, while being regenerated at the end.'],
      ],
      id: [
        ['Energi aktivasi (Eₐ)', 'Energi tumbukan minimum yang diperlukan agar reaksi terjadi; tinggi penghalang energi.'],
        ['Frekuensi tumbukan', 'Banyaknya tumbukan per detik; bertambah seiring konsentrasi dan, lebih lambat, seiring suhu.'],
        ['Tumbukan efektif', 'Tumbukan dengan energi cukup dan orientasi tepat untuk menghasilkan produk.'],
        ['Distribusi Maxwell–Boltzmann', 'Sebaran energi kinetik molekul pada suhu tertentu; T lebih tinggi melebarkannya dan memanjangkan ekor berenergi tinggi.'],
        ['Persamaan Arrhenius', 'k = A·exp(−Eₐ/RT), yang menghubungkan tetapan laju dengan suhu dan energi aktivasi.'],
        ['Tetapan laju (k)', 'Tetapan kesebandingan dalam hukum laju, laju = k[A][B]; bergantung pada suhu dan Eₐ tetapi tidak pada konsentrasi.'],
        ['Katalis', 'Zat yang mempercepat reaksi dengan menyediakan jalur ber-Eₐ lebih rendah, dan terbentuk kembali di akhir reaksi.'],
      ],
    },
    misconceptions: {
      en: [
        ['Every collision between reactant particles leads to a reaction.', 'Watch the counters: collisions run far ahead of reactions. Most collisions are too gentle to cross Eₐ, and in real molecules many also hit at the wrong angle.'],
        ['Heating speeds up a reaction mainly because particles collide more often.', 'Collision frequency grows only with the square root of T, a few percent for a 10 K rise. The big effect is the exponential growth of the fraction of collisions with E ≥ Eₐ, which can double for the same 10 K.'],
        ['A catalyst gives the particles extra energy, or is used up in the reaction.', 'A catalyst lowers the barrier; the particles have exactly the same energies as before. It takes part in intermediate steps but is regenerated, so a little catalyst can process a great deal of reactant.'],
        ['Increasing concentration makes the particles more energetic.', 'Concentration changes how often particles meet, not how hard they hit. Energy per collision is set by temperature alone.'],
      ],
      id: [
        ['Setiap tumbukan antarpartikel pereaksi menghasilkan reaksi.', 'Perhatikan penghitungnya: tumbukan jauh lebih banyak daripada reaksi. Kebanyakan tumbukan terlalu lemah untuk melampaui Eₐ, dan pada molekul nyata banyak pula yang menumbuk dengan sudut yang salah.'],
        ['Pemanasan mempercepat reaksi terutama karena partikel lebih sering bertumbukan.', 'Frekuensi tumbukan hanya bertambah sebanding akar kuadrat T, beberapa persen untuk kenaikan 10 K. Efek besarnya adalah pertumbuhan eksponensial fraksi tumbukan dengan E ≥ Eₐ, yang bisa berlipat dua untuk kenaikan 10 K yang sama.'],
        ['Katalis memberi energi tambahan pada partikel, atau habis terpakai dalam reaksi.', 'Katalis merendahkan penghalang; energi partikel sama persis seperti sebelumnya. Katalis ikut dalam tahap-tahap antara tetapi terbentuk kembali, sehingga sedikit katalis dapat memproses pereaksi dalam jumlah besar.'],
        ['Menaikkan konsentrasi membuat partikel lebih berenergi.', 'Konsentrasi mengubah seberapa sering partikel bertemu, bukan seberapa keras tumbukannya. Energi per tumbukan ditentukan oleh suhu saja.'],
      ],
    },
    realWorld: {
      en: [
        'Refrigerators slow food spoilage because the chemical and bacterial reactions that cause it have activation energies; a typical reaction runs roughly half as fast for every 10 °C drop.',
        'Catalytic converters in cars use platinum, palladium and rhodium to lower the activation energy for converting CO and NOₓ into CO₂ and N₂ in the hot exhaust.',
        'Enzymes are biological catalysts that lower Eₐ so dramatically that reactions needing hours at high temperature in a lab happen in milliseconds at body temperature.',
        'Flour and coal dust explode in silos and mines because grinding a solid into fine particles multiplies the collisions between fuel and oxygen, the same effect as raising concentration.',
      ],
      id: [
        'Lemari es memperlambat pembusukan makanan karena reaksi kimia dan bakteri yang menyebabkannya memiliki energi aktivasi; reaksi pada umumnya berjalan kira-kira setengah kali lebih lambat untuk setiap penurunan 10 °C.',
        'Konverter katalitik pada mobil memakai platina, paladium, dan rodium untuk merendahkan energi aktivasi pengubahan CO dan NOₓ menjadi CO₂ dan N₂ dalam gas buang yang panas.',
        'Enzim adalah katalis biologis yang merendahkan Eₐ begitu drastis sehingga reaksi yang di laboratorium butuh berjam-jam pada suhu tinggi dapat terjadi dalam milidetik pada suhu tubuh.',
        'Debu tepung dan debu batu bara dapat meledak di silo dan tambang karena menggerus padatan menjadi partikel halus melipatgandakan tumbukan antara bahan bakar dan oksigen, efek yang sama dengan menaikkan konsentrasi.',
      ],
    },
    questions: {
      en: [
        { q: 'You double both the number of A particles and the number of B particles at the same temperature. By roughly what factor does the reaction rate change, and why?', a: 'About four times. Each A now meets twice as many B, and there are twice as many A doing the meeting, so the collision frequency, and with it the rate, is proportional to [A]·[B] = 2 × 2 = 4 times the original.' },
        { q: 'For a reaction with Eₐ = 50 kJ/mol, by what factor does exp(−Eₐ/RT) grow when the temperature rises from 300 K to 310 K? Average kinetic energy rises by only about 3%.', a: 'Ratio = exp[(Eₐ/R)(1/300 − 1/310)] = exp[(50 000 / 8.314) × 1.075 × 10⁻⁴] = exp(0.65) ≈ 1.9. The rate nearly doubles even though the average energy barely changes, because the number of particles in the high-energy tail is very sensitive to temperature.' },
        { q: 'When you press the catalyst button the rate jumps, but the collision counter keeps increasing at the same pace as before. Explain.', a: 'The catalyst halves Eₐ without changing temperature or concentration, so the particles move exactly as before and collide just as often. What changes is the fraction of those collisions that clear the lower threshold: more of the same collisions now react. That is what a catalyst does in real chemistry too.' },
      ],
      id: [
        { q: 'Kamu menggandakan jumlah partikel A dan jumlah partikel B pada suhu yang sama. Kira-kira berapa kali laju reaksi berubah, dan mengapa?', a: 'Sekitar empat kali. Setiap A kini bertemu dua kali lebih banyak B, dan jumlah A yang bertemu juga dua kali lipat, sehingga frekuensi tumbukan, dan dengannya laju, sebanding dengan [A]·[B] = 2 × 2 = 4 kali semula.' },
        { q: 'Untuk reaksi dengan Eₐ = 50 kJ/mol, berapa kali exp(−Eₐ/RT) bertambah ketika suhu naik dari 300 K ke 310 K? Energi kinetik rata-rata hanya naik sekitar 3%.', a: 'Rasio = exp[(Eₐ/R)(1/300 − 1/310)] = exp[(50.000 / 8,314) × 1,075 × 10⁻⁴] = exp(0,65) ≈ 1,9. Laju hampir berlipat dua walaupun energi rata-rata hampir tidak berubah, karena jumlah partikel di ekor berenergi tinggi sangat peka terhadap suhu.' },
        { q: 'Saat tombol katalis ditekan laju melonjak, tetapi penghitung tumbukan tetap bertambah dengan kecepatan yang sama seperti sebelumnya. Jelaskan.', a: 'Katalis menyetengahkan Eₐ tanpa mengubah suhu atau konsentrasi, sehingga partikel bergerak persis seperti sebelumnya dan bertumbukan sama seringnya. Yang berubah adalah fraksi tumbukan yang melampaui ambang yang lebih rendah: lebih banyak tumbukan yang sama kini bereaksi. Itulah yang dilakukan katalis dalam kimia nyata.' },
      ],
    },
  },
};
