// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Apply Arrhenius: k = A exp(−Eₐ/RT).',
      'See that catalysts lower Eₐ but leave ΔH alone.',
      'Doubling temperature roughly multiplies rate by ~2 per 10°C.',
    ],
    id: [
      'Menerapkan Arrhenius: k = A exp(−Eₐ/RT).',
      'Melihat katalis menurunkan Eₐ tetapi tidak mengubah ΔH.',
      'Naikkan suhu — laju kira-kira ×2 per 10°C.',
    ],
  },  tryThis: {
    en: [
      'High Eₐ — slow rate. Add catalyst → rate jumps an order of magnitude.',
      'Crank temperature — Arrhenius rate climbs steeply.',
      'Endothermic ΔH — products higher than reactants; barrier still applies.',
    ],
    id: [
      'Eₐ tinggi — laju lambat. Tambah katalis → laju naik satu orde.',
      'Naikkan suhu — laju Arrhenius naik tajam.',
      'ΔH endotermik — produk lebih tinggi dari pereaksi; penghalang tetap berlaku.',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'For a chemical reaction to happen, molecules must collide with enough energy to stretch and break existing bonds before new ones can form. The minimum energy needed is the activation energy, Eₐ, and the strained, half-rearranged arrangement at the top of the energy hill is the transition state. At any temperature, molecular energies are spread out, and only a small fraction of collisions carry at least Eₐ. That fraction is given by the Boltzmann factor exp(−Eₐ/RT), which is why the rate constant follows the Arrhenius equation k = A exp(−Eₐ/RT), where R = 8.314 J/(mol·K), T is the absolute temperature and A (the pre-exponential factor) counts how often collisions happen in the right orientation.',
        'The simulation draws the energy profile of a one-step reaction: a reactant plateau on the left, a peak, and a product plateau on the right. Drag the peak, or move the Eₐ slider (10 to 200 kJ/mol), to raise or lower the barrier. Drag the product plateau, or move the ΔH slider (−80 to +80 kJ/mol), to set the enthalpy change: products below reactants means an exothermic reaction (ΔH negative, heat released), products above means endothermic. The temperature slider runs from 200 to 800 K, and the header reports k with A fixed at 10¹⁰ s⁻¹. Notice that ΔH does not appear in the Arrhenius equation at all: how fast a reaction goes depends on the height of the hill, not on where it ends.',
        'Switching on the catalyst lowers the effective Eₐ by 30 kJ/mol in this model (never below 5 kJ/mol), and a dashed grey curve keeps the original barrier for comparison. A catalyst provides a different pathway, with a lower transition state, that the reactants can take; it is consumed in one step and regenerated in another, so it is not used up. Because the reactant and product energies are untouched, ΔH stays exactly the same, and the reverse reaction is speeded up by the same factor as the forward one. The effect is huge: at 298 K, lowering Eₐ by 30 kJ/mol multiplies k by exp(30000/(8.314 × 298)) ≈ 1.8 × 10⁵. The familiar rule that a rise of 10 °C roughly doubles the rate holds for Eₐ near 50 kJ/mol around room temperature.',
        'The model is deliberately simple. It treats the reaction as a single elementary step with a fixed A, although A actually varies slowly with temperature and the catalyst would normally change it too. It reports a rate constant, not a rate: the actual rate also depends on concentrations, which the sim does not include. There is no reverse reaction or equilibrium, no entropy or Gibbs energy, and the smooth hill is just a drawn curve, not a calculated reaction coordinate. The 30 kJ/mol catalyst saving is a representative number, not a property of any particular catalyst.',
      ],
      id: [
        'Agar reaksi kimia berlangsung, molekul harus bertumbukan dengan energi yang cukup untuk meregangkan dan memutus ikatan lama sebelum ikatan baru terbentuk. Energi minimum yang dibutuhkan disebut energi aktivasi, Eₐ, dan susunan tegang setengah-terbentuk di puncak bukit energi disebut keadaan transisi. Pada suhu berapa pun, energi molekul tersebar, dan hanya sebagian kecil tumbukan yang membawa energi sekurang-kurangnya Eₐ. Fraksi itu diberikan oleh faktor Boltzmann exp(−Eₐ/RT), sehingga tetapan laju mengikuti persamaan Arrhenius k = A exp(−Eₐ/RT), dengan R = 8,314 J/(mol·K), T suhu mutlak, dan A (faktor pra-eksponensial) menyatakan seberapa sering tumbukan terjadi dengan orientasi yang tepat.',
        'Simulasi menggambar profil energi reaksi satu tahap: dataran pereaksi di kiri, puncak, dan dataran produk di kanan. Seret puncaknya, atau geser slider Eₐ (10 sampai 200 kJ/mol), untuk menaikkan atau menurunkan penghalang. Seret dataran produk, atau geser slider ΔH (−80 sampai +80 kJ/mol), untuk mengatur perubahan entalpi: produk di bawah pereaksi berarti reaksi eksotermik (ΔH negatif, melepas kalor), produk di atas berarti endotermik. Slider suhu berjalan dari 200 sampai 800 K, dan panel atas menampilkan k dengan A ditetapkan 10¹⁰ s⁻¹. Perhatikan bahwa ΔH sama sekali tidak muncul dalam persamaan Arrhenius: seberapa cepat reaksi berjalan bergantung pada tinggi bukitnya, bukan pada tempat berakhirnya.',
        'Mengaktifkan katalis menurunkan Eₐ efektif sebesar 30 kJ/mol dalam model ini (tidak pernah di bawah 5 kJ/mol), dan kurva abu-abu putus-putus mempertahankan penghalang semula sebagai pembanding. Katalis menyediakan jalur lain dengan keadaan transisi yang lebih rendah; katalis dipakai pada satu tahap dan dihasilkan kembali pada tahap lain, sehingga tidak habis. Karena energi pereaksi dan produk tidak tersentuh, ΔH tetap sama persis, dan reaksi balik dipercepat dengan faktor yang sama seperti reaksi maju. Pengaruhnya sangat besar: pada 298 K, menurunkan Eₐ sebesar 30 kJ/mol melipatgandakan k sebesar exp(30000/(8,314 × 298)) ≈ 1,8 × 10⁵. Aturan praktis bahwa kenaikan 10 °C kira-kira menggandakan laju berlaku untuk Eₐ sekitar 50 kJ/mol di sekitar suhu kamar.',
        'Modelnya sengaja dibuat sederhana. Reaksi dianggap satu tahap elementer dengan A tetap, padahal A sebenarnya berubah perlahan terhadap suhu dan biasanya juga diubah oleh katalis. Yang dilaporkan adalah tetapan laju, bukan laju: laju sesungguhnya juga bergantung pada konsentrasi, yang tidak ada dalam simulasi. Tidak ada reaksi balik atau kesetimbangan, tidak ada entropi atau energi Gibbs, dan bukit mulus itu hanya kurva gambar, bukan koordinat reaksi hasil perhitungan. Penurunan 30 kJ/mol oleh katalis hanyalah angka perwakilan, bukan sifat katalis tertentu.',
      ],
    },
    figure: {
      caption: {
        en: 'Energy profile of an exothermic reaction. The catalyst (green) lowers the barrier from Eₐ to Eₐ(cat); the product level, and therefore ΔH, is unchanged.',
        id: 'Profil energi reaksi eksotermik. Katalis (hijau) menurunkan penghalang dari Eₐ menjadi Eₐ(kat); tingkat produk, dan karenanya ΔH, tidak berubah.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Reaction energy profile with and without catalyst', 'Profil energi reaksi dengan dan tanpa katalis')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.ax{stroke:currentColor;stroke-width:1.2;opacity:.6}.g{stroke:currentColor;stroke-width:1;opacity:.35}.c{fill:none;stroke-width:2.5}.s{font-size:9px}</style>
  <line x1="36" y1="20" x2="36" y2="212" class="ax"/>
  <line x1="36" y1="212" x2="345" y2="212" class="ax"/>
  <path d="M36 20 L32 28 L40 28 z" fill="currentColor" opacity=".6"/>
  <path d="M345 212 L337 208 L337 216 z" fill="currentColor" opacity=".6"/>
  <text x="42" y="30">${L('Energy', 'Energi')}</text>
  <text x="230" y="228">${L('Reaction progress →', 'Jalannya reaksi →')}</text>
  <path d="M50 120 H100 C140 120 150 40 190 40 C230 40 240 160 280 160 H330" class="c" stroke="currentColor" stroke-dasharray="5 4" opacity=".55"/>
  <path d="M50 120 H100 C140 120 150 82 190 82 C230 82 240 160 280 160 H330" class="c" stroke="#10b981"/>
  <line x1="100" y1="120" x2="330" y2="120" class="g" stroke-dasharray="2 3"/>
  <line x1="190" y1="40" x2="262" y2="40" class="g" stroke-dasharray="2 3"/>
  <line x1="190" y1="82" x2="262" y2="82" class="g" stroke-dasharray="2 3"/>
  <line x1="236" y1="120" x2="236" y2="44" stroke="#ef4444" stroke-width="2"/>
  <path d="M231 50 L236 41 L241 50 z" fill="#ef4444"/>
  <text x="206" y="66" fill="#ef4444" class="s">Eₐ</text>
  <line x1="258" y1="120" x2="258" y2="86" stroke="#10b981" stroke-width="2"/>
  <path d="M253 92 L258 83 L263 92 z" fill="#10b981"/>
  <text x="262" y="105" fill="#10b981" class="s">Eₐ(${L('cat', 'kat')})</text>
  <line x1="305" y1="120" x2="305" y2="156" stroke="#8b5cf6" stroke-width="2"/>
  <path d="M300 150 L305 159 L310 150 z" fill="#8b5cf6"/>
  <text x="309" y="142" fill="#8b5cf6" class="s">ΔH</text>
  <text x="50" y="112">${L('Reactants', 'Pereaksi')}</text>
  <text x="280" y="176">${L('Products', 'Produk')}</text>
  <text x="120" y="34" class="s" opacity=".8">${L('transition state (no catalyst)', 'keadaan transisi (tanpa katalis)')}</text>
  <text x="128" y="100" fill="#10b981" class="s">${L('with catalyst', 'dengan katalis')}</text>
  <text x="50" y="196" class="s" opacity=".8">${L('Only Eₐ changes; ΔH is fixed by start and end levels.', 'Hanya Eₐ yang berubah; ΔH ditentukan tingkat awal dan akhir.')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'A reaction only proceeds when colliding molecules have at least the activation energy Eₐ to reach the transition state.',
        'The Arrhenius equation k = A exp(−Eₐ/RT) says the rate constant grows exponentially as Eₐ falls or T rises.',
        'Rate depends on the height of the barrier, not on ΔH; an exothermic reaction can still be very slow.',
        'A catalyst offers a lower-energy pathway, cutting Eₐ while leaving ΔH and the final yield unchanged.',
        'Near room temperature, with Eₐ around 50 kJ/mol, a 10 °C rise roughly doubles the rate.',
      ],
      id: [
        'Reaksi hanya berlangsung jika molekul yang bertumbukan memiliki energi sekurang-kurangnya sebesar energi aktivasi Eₐ untuk mencapai keadaan transisi.',
        'Persamaan Arrhenius k = A exp(−Eₐ/RT) menyatakan tetapan laju naik secara eksponensial ketika Eₐ turun atau T naik.',
        'Laju bergantung pada tinggi penghalang, bukan pada ΔH; reaksi eksotermik pun bisa sangat lambat.',
        'Katalis menyediakan jalur berenergi lebih rendah, memangkas Eₐ tanpa mengubah ΔH dan hasil akhir.',
        'Di sekitar suhu kamar, dengan Eₐ sekitar 50 kJ/mol, kenaikan 10 °C kira-kira menggandakan laju.',
      ],
    },
    vocabulary: {
      en: [
        ['Activation energy (Eₐ)', 'The minimum energy colliding molecules need for a reaction to occur; the height of the hill from reactants to the transition state.'],
        ['Transition state', 'The highest-energy, short-lived arrangement of atoms partway between reactants and products.'],
        ['Rate constant (k)', 'The proportionality constant linking concentrations to reaction rate; it depends on temperature and Eₐ, not on concentration.'],
        ['Arrhenius equation', 'k = A exp(−Eₐ/RT): how the rate constant depends on activation energy and absolute temperature.'],
        ['Enthalpy change (ΔH)', 'Energy of products minus energy of reactants; negative for exothermic, positive for endothermic reactions.'],
        ['Catalyst', 'A substance that speeds up a reaction by providing a pathway with lower Eₐ and is regenerated, so it is not used up.'],
        ['Pre-exponential factor (A)', 'The frequency of collisions with the right orientation; fixed at 10¹⁰ s⁻¹ in this sim.'],
      ],
      id: [
        ['Energi aktivasi (Eₐ)', 'Energi minimum yang dibutuhkan molekul yang bertumbukan agar reaksi terjadi; tinggi bukit dari pereaksi ke keadaan transisi.'],
        ['Keadaan transisi', 'Susunan atom berenergi tertinggi dan berumur sangat singkat di tengah jalan antara pereaksi dan produk.'],
        ['Tetapan laju (k)', 'Tetapan kesebandingan yang menghubungkan konsentrasi dengan laju reaksi; bergantung pada suhu dan Eₐ, bukan pada konsentrasi.'],
        ['Persamaan Arrhenius', 'k = A exp(−Eₐ/RT): hubungan tetapan laju dengan energi aktivasi dan suhu mutlak.'],
        ['Perubahan entalpi (ΔH)', 'Energi produk dikurangi energi pereaksi; negatif untuk reaksi eksotermik, positif untuk endotermik.'],
        ['Katalis', 'Zat yang mempercepat reaksi dengan menyediakan jalur ber-Eₐ lebih rendah dan terbentuk kembali, sehingga tidak habis.'],
        ['Faktor pra-eksponensial (A)', 'Frekuensi tumbukan dengan orientasi yang tepat; ditetapkan 10¹⁰ s⁻¹ dalam simulasi ini.'],
      ],
    },
    misconceptions: {
      en: [
        ['A catalyst makes more product.', 'A catalyst only changes how fast equilibrium is reached. It lowers the barrier for both the forward and the reverse reaction equally, so the final mixture is the same, just arrived at sooner.'],
        ['Exothermic reactions are always fast because they release energy.', 'Speed is set by Eₐ, not ΔH. Burning wood releases a lot of energy, yet a log sits safely in air until a match supplies enough energy to get over the barrier.'],
        ['Heating speeds a reaction up mainly because molecules collide more often.', 'Collision frequency rises only slightly (roughly with the square root of T). The big effect is that a much larger fraction of collisions now has energy above Eₐ, which is what the exponential factor describes.'],
        ['A catalyst takes no part in the reaction.', 'It does take part: it bonds to reactants and forms intermediates. But it is released again at the end, so a small amount can process an enormous number of molecules.'],
      ],
      id: [
        ['Katalis membuat produk menjadi lebih banyak.', 'Katalis hanya mengubah seberapa cepat kesetimbangan tercapai. Ia menurunkan penghalang reaksi maju dan reaksi balik dengan besar yang sama, sehingga campuran akhirnya sama, hanya tercapai lebih cepat.'],
        ['Reaksi eksotermik selalu cepat karena melepaskan energi.', 'Kecepatan ditentukan oleh Eₐ, bukan ΔH. Pembakaran kayu melepaskan banyak energi, tetapi sebatang kayu tetap aman di udara sampai korek api memberi energi yang cukup untuk melewati penghalang.'],
        ['Pemanasan mempercepat reaksi terutama karena molekul lebih sering bertumbukan.', 'Frekuensi tumbukan hanya naik sedikit (kira-kira sebanding dengan akar kuadrat T). Pengaruh besarnya adalah fraksi tumbukan yang berenergi di atas Eₐ menjadi jauh lebih besar, dan itulah yang digambarkan faktor eksponensial.'],
        ['Katalis tidak ikut bereaksi.', 'Katalis ikut bereaksi: ia berikatan dengan pereaksi dan membentuk zat antara. Namun di akhir ia dilepaskan kembali, sehingga sedikit katalis bisa memproses molekul dalam jumlah sangat besar.'],
      ],
    },
    realWorld: {
      en: [
        'Catalytic converters in car exhausts use platinum, palladium and rhodium to turn carbon monoxide and nitrogen oxides into less harmful gases at speeds that would be impossible without them.',
        'Enzymes are biological catalysts: they lower Eₐ so dramatically that digestion and respiration run at body temperature, 37 °C.',
        'The Haber process makes ammonia for fertiliser over an iron catalyst; without it, nitrogen\'s triple bond gives a barrier far too high for a useful rate.',
        'A refrigerator slows food spoilage because the chemical reactions involved obey Arrhenius: dropping from 25 °C to 4 °C cuts their rates several-fold.',
      ],
      id: [
        'Catalytic converter pada knalpot mobil memakai platina, paladium, dan rodium untuk mengubah karbon monoksida dan oksida nitrogen menjadi gas yang kurang berbahaya dengan laju yang tidak mungkin tercapai tanpanya.',
        'Enzim adalah katalis biologis: enzim menurunkan Eₐ begitu drastis sehingga pencernaan dan respirasi berjalan pada suhu tubuh, 37 °C.',
        'Proses Haber menghasilkan amonia untuk pupuk dengan katalis besi; tanpanya, ikatan rangkap tiga nitrogen memberi penghalang yang terlalu tinggi untuk laju yang berguna.',
        'Lemari es memperlambat pembusukan makanan karena reaksi kimia yang terlibat mengikuti Arrhenius: turun dari 25 °C ke 4 °C memangkas lajunya beberapa kali lipat.',
      ],
    },
    questions: {
      en: [
        { q: 'With Eₐ = 50 kJ/mol, by what factor does k change when T rises from 298 K to 308 K?', a: 'k₂/k₁ = exp[(Eₐ/R)(1/T₁ − 1/T₂)] = exp[(50000/8.314)(1/298 − 1/308)] = exp(6014 × 1.09 × 10⁻⁴) = exp(0.655) ≈ 1.9. That is the "doubling per 10 °C" rule of thumb, and you can confirm it by reading k off the sim at both temperatures.' },
        { q: 'A reaction has Eₐ = 60 kJ/mol and ΔH = +40 kJ/mol (endothermic). What is the activation energy of the reverse reaction?', a: 'The reverse reaction starts at the product level and must climb to the same transition state, so Eₐ(reverse) = Eₐ(forward) − ΔH = 60 − 40 = 20 kJ/mol. For an endothermic reaction the reverse barrier is always smaller. Set these values in the sim and read the two heights off the diagram.' },
        { q: 'You turn on the catalyst. Does the displayed ΔH change, and should it?', a: 'No, and it should not. ΔH is the difference between the product and reactant energy levels, which the catalyst does not touch; it only lowers the peak between them. The dashed curve shows the old barrier and the new green curve ends at exactly the same product level.' },
      ],
      id: [
        { q: 'Dengan Eₐ = 50 kJ/mol, berapa kali k berubah ketika T naik dari 298 K ke 308 K?', a: 'k₂/k₁ = exp[(Eₐ/R)(1/T₁ − 1/T₂)] = exp[(50000/8,314)(1/298 − 1/308)] = exp(6014 × 1,09 × 10⁻⁴) = exp(0,655) ≈ 1,9. Itulah aturan praktis "menggandakan tiap 10 °C", dan kamu bisa memastikannya dengan membaca k di simulasi pada kedua suhu.' },
        { q: 'Suatu reaksi memiliki Eₐ = 60 kJ/mol dan ΔH = +40 kJ/mol (endotermik). Berapa energi aktivasi reaksi baliknya?', a: 'Reaksi balik berangkat dari tingkat produk dan harus mendaki ke keadaan transisi yang sama, jadi Eₐ(balik) = Eₐ(maju) − ΔH = 60 − 40 = 20 kJ/mol. Untuk reaksi endotermik, penghalang baliknya selalu lebih kecil. Atur nilai ini di simulasi dan bacalah kedua tingginya pada diagram.' },
        { q: 'Kamu mengaktifkan katalis. Apakah ΔH yang ditampilkan berubah, dan haruskah berubah?', a: 'Tidak, dan memang tidak seharusnya. ΔH adalah selisih tingkat energi produk dan pereaksi, yang tidak disentuh katalis; katalis hanya menurunkan puncak di antara keduanya. Kurva putus-putus menunjukkan penghalang lama dan kurva hijau yang baru berakhir tepat di tingkat produk yang sama.' },
      ],
    },
  },
};
