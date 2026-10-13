// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Apply η_Carnot = 1 − T_c / T_h.',
      'Identify isothermal and adiabatic legs on the P-V diagram.',
      'Connect cycle area to net work done per cycle.',
    ],
    id: [
      'Menerapkan η_Carnot = 1 − T_c / T_h.',
      'Mengenali kaki isotermal dan adiabatik pada diagram P-V.',
      'Mengaitkan luas siklus dengan kerja netto per siklus.',
    ],
  },
  tryThis: {
    en: [
      'T_h = T_c — efficiency 0?',
      'T_c = 0 K — efficiency 100% (impossible in practice).',
      'Real coal plant T_h ≈ 800 K, T_c ≈ 300 K — η_max?',
    ],
    id: [
      'T_h = T_c — efisiensi 0?',
      'T_c = 0 K — efisiensi 100% (mustahil dalam praktik).',
      'PLTU nyata T_h ≈ 800 K, T_c ≈ 300 K — η maks?',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'A heat engine takes in heat Q_h from something hot, turns part of it into work W, and must throw the rest, Q_c, into something cold. Its efficiency is η = W/Q_h = 1 − Q_c/Q_h. In 1824 Sadi Carnot asked what the best possible engine could do and found that the answer depends only on the two temperatures: no engine working between a hot reservoir at T_h and a cold one at T_c can beat η = 1 − T_c/T_h (temperatures in kelvin). This is one way of stating the second law of thermodynamics. Even a perfect engine must waste heat unless the cold side is at absolute zero.',
        'The Carnot cycle that achieves this limit has four legs, drawn on a pressure–volume diagram. From 1 to 2 the gas expands while touching the hot reservoir: its temperature stays at T_h, it absorbs Q_h and pushes the piston out (isothermal expansion, P falls as 1/V). From 2 to 3 it is insulated and keeps expanding, so it cools from T_h to T_c with no heat exchanged (adiabatic expansion, PV^γ constant, steeper than the isotherm). From 3 to 4 it is compressed while touching the cold reservoir, dumping Q_c at T_c. From 4 to 1 adiabatic compression warms it back to T_h. The area enclosed by the loop is the net work per cycle.',
        'The simulation computes this cycle for one mole of an ideal gas with γ = 1.4 (a diatomic gas such as air), using PV = nRT on the isotherms and TV^(γ−1) = constant on the adiabats. T_h and T_c change the efficiency and the vertical spread between the two isotherms. V₁ and V₂ set how far the gas expands at T_h, and so how much heat it takes in: Q_h = nRT_h ln(V₂/V₁). The work per cycle is then W = ηQ_h, which is why widening the ratio V₂/V₁ makes the loop\'s area grow even though the efficiency does not change at all. The other two volumes follow automatically: V₃/V₂ = V₄/V₁ = (T_h/T_c)^(1/(γ−1)).',
        'Every step in a Carnot cycle is reversible, which means infinitely slow and without friction, so a real Carnot engine would deliver zero power. Real engines run fast, have friction, lose heat through their walls and never reach the Carnot limit; power stations and car engines typically reach between one third and two thirds of it. The sim does not animate the piston or show the heat flows numerically, and it lets you drag T_c above T_h; the formula then gives a negative efficiency, which is not an engine at all but a cycle running backwards, like a refrigerator.',
      ],
      id: [
        'Mesin kalor menyerap kalor Q_h dari sesuatu yang panas, mengubah sebagiannya menjadi kerja W, dan harus membuang sisanya, Q_c, ke sesuatu yang dingin. Efisiensinya adalah η = W/Q_h = 1 − Q_c/Q_h. Pada 1824 Sadi Carnot bertanya apa yang bisa dicapai mesin terbaik yang mungkin, dan menemukan bahwa jawabannya hanya bergantung pada dua suhu: tidak ada mesin yang bekerja di antara reservoir panas bersuhu T_h dan reservoir dingin bersuhu T_c yang mampu melampaui η = 1 − T_c/T_h (suhu dalam kelvin). Ini salah satu cara menyatakan hukum kedua termodinamika. Mesin sempurna pun harus membuang kalor kecuali sisi dinginnya berada pada nol mutlak.',
        'Siklus Carnot yang mencapai batas ini terdiri dari empat kaki, digambar pada diagram tekanan–volume. Dari 1 ke 2 gas memuai sambil menyentuh reservoir panas: suhunya tetap T_h, gas menyerap Q_h dan mendorong piston keluar (pemuaian isotermal, P turun sebagai 1/V). Dari 2 ke 3 gas diisolasi dan terus memuai, sehingga mendingin dari T_h ke T_c tanpa pertukaran kalor (pemuaian adiabatik, PV^γ tetap, lebih curam daripada isoterm). Dari 3 ke 4 gas dimampatkan sambil menyentuh reservoir dingin, membuang Q_c pada T_c. Dari 4 ke 1 pemampatan adiabatik memanaskannya kembali ke T_h. Luas yang dilingkupi lintasan tertutup itu adalah kerja netto per siklus.',
        'Simulasi menghitung siklus ini untuk satu mol gas ideal dengan γ = 1,4 (gas diatomik seperti udara), memakai PV = nRT pada isoterm dan TV^(γ−1) = tetap pada adiabat. T_h dan T_c mengubah efisiensi dan jarak vertikal antara kedua isoterm. V₁ dan V₂ mengatur seberapa jauh gas memuai pada T_h, dan karenanya berapa kalor yang diserap: Q_h = nRT_h ln(V₂/V₁). Kerja per siklus adalah W = ηQ_h, itulah sebabnya memperbesar perbandingan V₂/V₁ memperluas area lintasan meski efisiensinya sama sekali tidak berubah. Dua volume lainnya mengikuti dengan sendirinya: V₃/V₂ = V₄/V₁ = (T_h/T_c)^(1/(γ−1)).',
        'Setiap langkah siklus Carnot bersifat reversibel, artinya sangat lambat dan tanpa gesekan, sehingga mesin Carnot sungguhan akan menghasilkan daya nol. Mesin nyata berjalan cepat, bergesekan, kehilangan kalor lewat dindingnya, dan tidak pernah mencapai batas Carnot; pembangkit listrik dan mesin mobil biasanya mencapai antara sepertiga dan dua pertiga batas itu. Simulasi tidak menganimasikan piston maupun menampilkan aliran kalor secara numerik, dan membolehkan T_c ditarik melewati T_h; rumusnya lalu memberi efisiensi negatif, yang bukan mesin sama sekali melainkan siklus yang berjalan terbalik, seperti kulkas.',
      ],
    },
    figure: {
      caption: {
        en: 'Schematic Carnot cycle on a P–V diagram (not to scale). Heat Q_h enters along the hot isotherm 1→2, heat Q_c leaves along the cold isotherm 3→4, and no heat flows on the adiabats. The shaded area is the net work W = Q_h − Q_c.',
        id: 'Skema siklus Carnot pada diagram P–V (tidak berskala). Kalor Q_h masuk sepanjang isoterm panas 1→2, kalor Q_c keluar sepanjang isoterm dingin 3→4, dan tidak ada kalor yang mengalir pada adiabat. Area berwarna adalah kerja netto W = Q_h − Q_c.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Carnot cycle on a pressure-volume diagram', 'Siklus Carnot pada diagram tekanan-volume')}">
  <style>text{font:12px system-ui,sans-serif;fill:currentColor}.m{fill:none;stroke:currentColor;stroke-width:1.2;opacity:.45}.c{stroke-width:2.4;fill:none}.s{font-size:10px;opacity:.8}</style>
  <line x1="40" y1="20" x2="40" y2="215" class="m" marker-end="url(#q)"/>
  <line x1="40" y1="215" x2="345" y2="215" class="m" marker-end="url(#q)"/>
  <text x="18" y="30">P</text>
  <text x="332" y="232">V</text>
  <path d="M90 50 Q125 95 190 100 Q230 160 310 170 Q230 180 160 150 Q120 125 90 50 Z" fill="#f59e0b" opacity=".22"/>
  <path d="M90 50 Q125 95 190 100" class="c" stroke="#ef4444"/>
  <path d="M190 100 Q230 160 310 170" class="c" stroke="currentColor" opacity=".6"/>
  <path d="M310 170 Q230 180 160 150" class="c" stroke="#3b82f6"/>
  <path d="M160 150 Q120 125 90 50" class="c" stroke="currentColor" opacity=".6"/>
  <circle cx="90" cy="50" r="4" fill="currentColor"/><text x="78" y="44">1</text>
  <circle cx="190" cy="100" r="4" fill="currentColor"/><text x="196" y="96">2</text>
  <circle cx="310" cy="170" r="4" fill="currentColor"/><text x="316" y="178">3</text>
  <circle cx="160" cy="150" r="4" fill="currentColor"/><text x="148" y="166">4</text>
  <text x="172" y="140" fill="#f59e0b" style="fill:#f59e0b">W = ${L('area', 'luas')}</text>
  <text x="150" y="80" fill="#ef4444" class="s">${L('isotherm T_h', 'isoterm T_h')}</text>
  <text x="236" y="198" fill="#3b82f6" class="s">${L('isotherm T_c', 'isoterm T_c')}</text>
  <text x="252" y="128" class="s">${L('adiabat', 'adiabat')}</text>
  <text x="80" y="118" class="s">${L('adiabat', 'adiabat')}</text>
  <line x1="112" y1="28" x2="128" y2="76" class="c" stroke="#ef4444" marker-end="url(#q)"/>
  <text x="118" y="24" fill="#ef4444">Q_h ${L('in', 'masuk')}</text>
  <line x1="236" y1="176" x2="250" y2="205" class="c" stroke="#3b82f6" marker-end="url(#q)"/>
  <text x="256" y="212" fill="#3b82f6">Q_c ${L('out', 'keluar')}</text>
  <text x="222" y="40" class="s">${L('1→2, 3→4: constant T', '1→2, 3→4: T tetap')}</text>
  <text x="222" y="54" class="s">${L('2→3, 4→1: no heat flow', '2→3, 4→1: tanpa aliran kalor')}</text>
  <text x="222" y="68" class="s">η = 1 − T_c/T_h</text>
  <defs><marker id="q" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="context-stroke"/></marker></defs>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Every heat engine must reject some heat to a cold reservoir; the Carnot efficiency 1 − T_c/T_h is the largest fraction of Q_h that can possibly become work.',
        'Efficiency depends only on the two reservoir temperatures in kelvin, not on the gas, the volumes or the size of the engine.',
        'On the P–V diagram the enclosed area is the net work per cycle, while the two isotherms are where heat enters and leaves.',
        'Adiabatic curves are steeper than isotherms because the gas cools as it expands, which lowers the pressure faster than 1/V.',
        'Widening the volume ratio V₂/V₁ makes the engine do more work per cycle without changing its efficiency.',
      ],
      id: [
        'Setiap mesin kalor harus membuang sebagian kalor ke reservoir dingin; efisiensi Carnot 1 − T_c/T_h adalah bagian terbesar dari Q_h yang mungkin menjadi kerja.',
        'Efisiensi hanya bergantung pada kedua suhu reservoir dalam kelvin, bukan pada jenis gas, volume, atau ukuran mesin.',
        'Pada diagram P–V, luas yang dilingkupi adalah kerja netto per siklus, sedangkan kedua isoterm adalah tempat kalor masuk dan keluar.',
        'Kurva adiabatik lebih curam daripada isoterm karena gas mendingin saat memuai, yang menurunkan tekanan lebih cepat daripada 1/V.',
        'Memperbesar perbandingan volume V₂/V₁ membuat mesin melakukan kerja lebih banyak per siklus tanpa mengubah efisiensinya.',
      ],
    },
    vocabulary: {
      en: [
        ['Heat engine', 'A device that runs in a cycle, taking heat from a hot source, doing work, and rejecting heat to a cold sink.'],
        ['Thermal efficiency (η)', 'Work output divided by heat input, η = W/Q_h; it is always less than 1.'],
        ['Isothermal process', 'A change at constant temperature; for an ideal gas PV stays constant and any heat absorbed becomes work.'],
        ['Adiabatic process', 'A change with no heat exchange; the gas cools when it expands and warms when it is compressed, with PV^γ constant.'],
        ['Reservoir', 'A body so large that its temperature does not change when heat flows in or out.'],
        ['Reversible process', 'An idealised, infinitely slow, frictionless change that could be run backwards exactly; it is the condition for reaching the Carnot limit.'],
        ['γ (gamma)', 'The ratio of a gas\'s heat capacities, about 1.4 for air; it sets how steep the adiabats are.'],
      ],
      id: [
        ['Mesin kalor', 'Alat yang bekerja dalam siklus, menyerap kalor dari sumber panas, melakukan kerja, dan membuang kalor ke tempat dingin.'],
        ['Efisiensi termal (η)', 'Kerja keluaran dibagi kalor masukan, η = W/Q_h; nilainya selalu kurang dari 1.'],
        ['Proses isotermal', 'Perubahan pada suhu tetap; untuk gas ideal PV tetap dan semua kalor yang diserap menjadi kerja.'],
        ['Proses adiabatik', 'Perubahan tanpa pertukaran kalor; gas mendingin saat memuai dan memanas saat dimampatkan, dengan PV^γ tetap.'],
        ['Reservoir', 'Benda yang begitu besar sehingga suhunya tidak berubah ketika kalor masuk atau keluar.'],
        ['Proses reversibel', 'Perubahan ideal yang sangat lambat dan tanpa gesekan sehingga bisa dijalankan mundur dengan tepat; syarat untuk mencapai batas Carnot.'],
        ['γ (gamma)', 'Perbandingan kapasitas kalor gas, sekitar 1,4 untuk udara; menentukan seberapa curam adiabat.'],
      ],
    },
    misconceptions: {
      en: [
        ['A well-designed engine could convert all its heat into work.', 'No engine can. Some heat must always be rejected to the cold side; the second law forbids 100% efficiency unless T_c = 0 K, which cannot be reached.'],
        ['Efficiency can be calculated with temperatures in °C.', 'Only kelvin works. 1 − 20/100 with Celsius values gives 80%, but the true Carnot efficiency between 100 °C and 20 °C is 1 − 293/373 ≈ 21%.'],
        ['A bigger loop on the P–V diagram means a more efficient engine.', 'A bigger loop means more work per cycle, but efficiency is work divided by heat input. In the sim, widening V₂/V₁ enlarges the loop while η stays fixed.'],
        ['The adiabatic legs are where the engine loses energy as heat.', 'No heat crosses the boundary on an adiabat at all. The heat Q_c that is rejected leaves during the cold isothermal compression 3→4.'],
      ],
      id: [
        ['Mesin yang dirancang dengan baik bisa mengubah seluruh kalornya menjadi kerja.', 'Tidak ada mesin yang bisa. Sebagian kalor selalu harus dibuang ke sisi dingin; hukum kedua melarang efisiensi 100% kecuali T_c = 0 K, yang tidak dapat dicapai.'],
        ['Efisiensi bisa dihitung dengan suhu dalam °C.', 'Hanya kelvin yang berlaku. 1 − 20/100 dengan nilai Celsius memberi 80%, padahal efisiensi Carnot sebenarnya antara 100 °C dan 20 °C adalah 1 − 293/373 ≈ 21%.'],
        ['Lintasan yang lebih besar pada diagram P–V berarti mesin lebih efisien.', 'Lintasan lebih besar berarti kerja per siklus lebih banyak, tetapi efisiensi adalah kerja dibagi kalor masukan. Di simulasi, memperbesar V₂/V₁ memperluas lintasan sementara η tetap.'],
        ['Kaki adiabatik adalah tempat mesin kehilangan energi sebagai kalor.', 'Pada adiabat sama sekali tidak ada kalor yang melintasi batas sistem. Kalor Q_c yang dibuang keluar saat pemampatan isotermal dingin 3→4.'],
      ],
    },
    realWorld: {
      en: [
        'A steam power plant with steam at about 800 K and cooling water at 300 K has a Carnot limit of about 62%; real plants reach roughly 35 to 45% because of friction, heat leaks and fast, irreversible processes.',
        'Car engines burn fuel at high temperature but still waste most of the energy as hot exhaust and radiator heat, which is why engine efficiency is typically 25 to 35%.',
        'Power stations are built next to rivers, lakes or the sea, and have giant cooling towers, because the second law obliges them to dump Q_c somewhere cold.',
        'Run backwards, a Carnot cycle is a refrigerator or heat pump: work is supplied to move heat from cold to hot, and the same temperature ratio sets its best possible performance.',
      ],
      id: [
        'Pembangkit listrik tenaga uap dengan uap sekitar 800 K dan air pendingin 300 K memiliki batas Carnot sekitar 62%; pembangkit nyata mencapai kira-kira 35 sampai 45% karena gesekan, kebocoran kalor, dan proses cepat yang tak reversibel.',
        'Mesin mobil membakar bahan bakar pada suhu tinggi tetapi tetap membuang sebagian besar energi sebagai gas buang panas dan kalor radiator, sehingga efisiensinya biasanya 25 sampai 35%.',
        'Pembangkit listrik dibangun di tepi sungai, danau, atau laut, dan memiliki menara pendingin raksasa, karena hukum kedua mewajibkan mereka membuang Q_c ke suatu tempat yang dingin.',
        'Dijalankan terbalik, siklus Carnot menjadi kulkas atau pompa kalor: kerja diberikan untuk memindahkan kalor dari dingin ke panas, dan perbandingan suhu yang sama menentukan kinerja terbaiknya.',
      ],
    },
    questions: {
      en: [
        { q: 'A Carnot engine runs between 600 K and 300 K. What is its efficiency? If it absorbs 1000 J per cycle, how much work does it do and how much heat does it reject?', a: 'η = 1 − 300/600 = 0.5, or 50%. Work W = 0.5 × 1000 = 500 J, and the rejected heat is Q_c = Q_h − W = 500 J.' },
        { q: 'Two changes are proposed for an engine with T_h = 500 K and T_c = 300 K: raise T_h by 100 K, or lower T_c by 100 K. Which improves the Carnot efficiency more?', a: 'Originally η = 1 − 300/500 = 40%. Raising T_h: 1 − 300/600 = 50%. Lowering T_c: 1 − 200/500 = 60%. Lowering the cold temperature helps more, because T_c appears in the numerator and a given change is a bigger fraction of the smaller temperature.' },
        { q: 'In the sim, increase V₂ while keeping both temperatures fixed. The shaded area grows but the efficiency readout does not move. Explain.', a: 'A larger V₂/V₁ means the gas absorbs more heat on the hot isotherm, Q_h = nRT_h ln(V₂/V₁), and so does more work per cycle. But it also rejects proportionally more heat on the cold isotherm, so the ratio W/Q_h, which is 1 − T_c/T_h, is unchanged.' },
      ],
      id: [
        { q: 'Mesin Carnot bekerja antara 600 K dan 300 K. Berapa efisiensinya? Jika mesin menyerap 1000 J per siklus, berapa kerja yang dilakukan dan berapa kalor yang dibuang?', a: 'η = 1 − 300/600 = 0,5, atau 50%. Kerja W = 0,5 × 1000 = 500 J, dan kalor yang dibuang Q_c = Q_h − W = 500 J.' },
        { q: 'Dua perubahan diusulkan untuk mesin dengan T_h = 500 K dan T_c = 300 K: menaikkan T_h sebesar 100 K, atau menurunkan T_c sebesar 100 K. Mana yang lebih meningkatkan efisiensi Carnot?', a: 'Awalnya η = 1 − 300/500 = 40%. Menaikkan T_h: 1 − 300/600 = 50%. Menurunkan T_c: 1 − 200/500 = 60%. Menurunkan suhu dingin lebih membantu, karena T_c berada di pembilang dan perubahan yang sama merupakan bagian yang lebih besar dari suhu yang lebih kecil.' },
        { q: 'Di simulasi, perbesar V₂ sambil menjaga kedua suhu tetap. Area berwarna membesar tetapi angka efisiensi tidak bergerak. Jelaskan.', a: 'V₂/V₁ yang lebih besar berarti gas menyerap lebih banyak kalor pada isoterm panas, Q_h = nRT_h ln(V₂/V₁), sehingga melakukan lebih banyak kerja per siklus. Tetapi gas juga membuang kalor yang lebih banyak secara sebanding pada isoterm dingin, sehingga perbandingan W/Q_h, yaitu 1 − T_c/T_h, tidak berubah.' },
      ],
    },
  },
};
