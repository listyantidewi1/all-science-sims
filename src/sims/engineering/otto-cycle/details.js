// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Trace the four strokes on a P-V diagram (Otto cycle).',
      'Apply η = 1 − 1/r^(γ−1) for ideal Otto efficiency.',
      'See why higher compression ratios give better efficiency (and demand premium fuel).',
    ],
    id: [
      'Menelusuri empat langkah pada diagram P-V (siklus Otto).',
      'Menerapkan η = 1 − 1/r^(γ−1) untuk efisiensi Otto ideal.',
      'Memahami mengapa rasio kompresi tinggi memberi efisiensi lebih baik (dan butuh bahan bakar premium).',
    ],
  },
  tryThis: {
    en: [
      'r = 8 — typical gasoline, η ≈ 56%.',
      'r = 14 — diesel-grade, η ≈ 65% but autoignition would knock pump gas.',
      'r = 4 — old engine, η ≈ 43%.',
    ],
    id: [
      'r = 8 — bensin tipikal, η ≈ 56%.',
      'r = 14 — kelas diesel, η ≈ 65% tapi auto-ignition akan knock bensin pompa.',
      'r = 4 — mesin tua, η ≈ 43%.',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'A petrol engine turns the chemical energy of fuel into motion by repeating four strokes of a piston in a cylinder. Intake: the piston moves down and draws in a mixture of air and fuel vapour. Compression: the valves close and the piston moves up, squeezing the mixture into a small volume and heating it. Power: a spark ignites the mixture near the top, the pressure leaps up, and the hot gas pushes the piston down, doing work on the crankshaft. Exhaust: the piston rises again and pushes the burnt gas out. The crankshaft turns twice for each cycle, and only one of the four strokes delivers work; the flywheel and the other cylinders keep things turning in between.',
        'The Otto cycle is the idealised thermodynamic version of this. It replaces the real process with four textbook steps on a pressure-volume (P-V) diagram: 1 to 2, adiabatic compression, where P · V^γ stays constant and no heat is exchanged; 2 to 3, heat added at constant volume (the spark and near-instant burn at top dead centre); 3 to 4, adiabatic expansion, the power stroke; and 4 to 1, heat rejected at constant volume as the exhaust valve opens. The area enclosed by the loop is the net work per cycle. The sim draws this loop live, with the intake and exhaust strokes as a flat line at the bottom. Pressures are normalised to the intake pressure, so the compression corner sits at P2 = r^γ, and the heat input ratio slider T3/T2 sets how high the combustion spike at corner 3 reaches.',
        'For an ideal gas with constant γ (the ratio of specific heats, 1.4 for air), the efficiency of the Otto cycle comes out as η = 1 − 1 / r^(γ−1), where r = V_max / V_min is the compression ratio. Nothing else matters, not the speed, not the amount of fuel: at r = 8 the formula gives 56.5%, at r = 12 about 63%. Higher compression wins because the gas is hotter at ignition, so a larger share of the heat released ends up as expansion work rather than being thrown away in the exhaust. The catch is knock: compress a petrol-air mixture too far and it ignites by itself before the spark, hammering the piston. Pump petrol knocks above about r = 10 to 12, which is why the sim warns in red past r = 12 and why high-compression engines need high-octane fuel. Diesel engines escape the limit by compressing only air (r = 14 to 22) and injecting the fuel afterwards.',
        'Real engines fall far short of the ideal figure. Spark-ignition engines manage about 25 to 35% efficiency, because heat leaks into the cylinder walls, combustion takes time rather than happening instantly at top dead centre, the real gas mixture has a γ closer to 1.3 and it changes composition as it burns, friction and the pumping work of intake and exhaust eat into the output, and the exhaust gases leave hot. The sim includes none of these losses: the engine speed slider only changes how fast the animation runs, and the P-V loop is the same at 100 rpm as at 5000. Treat the ideal efficiency as a ceiling that shows which design choice, the compression ratio, pushes the ceiling higher.',
      ],
      id: [
        'Mesin bensin mengubah energi kimia bahan bakar menjadi gerak dengan mengulang empat langkah piston di dalam silinder. Isap: piston bergerak turun dan menarik campuran udara dan uap bahan bakar. Kompresi: katup menutup dan piston bergerak naik, memampatkan campuran ke volume kecil dan memanaskannya. Kerja (usaha): busi menyalakan campuran di dekat titik puncak, tekanan melonjak, dan gas panas mendorong piston turun, melakukan kerja pada poros engkol. Buang: piston naik lagi dan mendorong gas sisa pembakaran keluar. Poros engkol berputar dua kali untuk setiap siklus, dan hanya satu dari empat langkah yang menghasilkan kerja; roda gila dan silinder-silinder lain menjaga putaran di antaranya.',
        'Siklus Otto adalah versi termodinamika ideal dari proses ini. Ia mengganti proses nyata dengan empat langkah buku teks pada diagram tekanan-volume (P-V): 1 ke 2, kompresi adiabatik, ketika P · V^γ tetap dan tidak ada kalor yang dipertukarkan; 2 ke 3, kalor ditambahkan pada volume tetap (percikan busi dan pembakaran hampir seketika di titik mati atas); 3 ke 4, ekspansi adiabatik, langkah kerja; dan 4 ke 1, kalor dibuang pada volume tetap saat katup buang membuka. Luas yang dilingkupi lintasan tertutup itu adalah kerja neto per siklus. Simulasi menggambar lintasan ini secara langsung, dengan langkah isap dan buang sebagai garis datar di bagian bawah. Tekanan dinormalkan terhadap tekanan isap, sehingga sudut kompresi berada di P2 = r^γ, dan slider rasio kalor masuk T3/T2 menentukan seberapa tinggi lonjakan pembakaran di sudut 3.',
        'Untuk gas ideal dengan γ tetap (rasio kalor jenis, 1,4 untuk udara), efisiensi siklus Otto menjadi η = 1 − 1 / r^(γ−1), dengan r = V_maks / V_min adalah rasio kompresi. Tidak ada yang lain yang berpengaruh, bukan kecepatan, bukan jumlah bahan bakar: pada r = 8 rumus memberi 56,5%, pada r = 12 sekitar 63%. Kompresi yang lebih tinggi menang karena gas lebih panas saat penyalaan, sehingga bagian yang lebih besar dari kalor yang dilepaskan berakhir sebagai kerja ekspansi, bukan dibuang bersama gas sisa. Masalahnya adalah knocking: mampatkan campuran bensin-udara terlalu jauh dan ia menyala sendiri sebelum busi memercik, menghantam piston. Bensin pompa mengalami knocking di atas sekitar r = 10 sampai 12, itulah sebabnya simulasi memberi peringatan merah melewati r = 12 dan mesin berkompresi tinggi membutuhkan bahan bakar beroktan tinggi. Mesin diesel lolos dari batas itu dengan hanya memampatkan udara (r = 14 sampai 22) dan menyuntikkan bahan bakar sesudahnya.',
        'Mesin sungguhan jauh di bawah angka ideal. Mesin pengapian busi mencapai efisiensi sekitar 25 sampai 35%, karena kalor bocor ke dinding silinder, pembakaran membutuhkan waktu dan tidak terjadi seketika di titik mati atas, campuran gas sungguhan memiliki γ yang lebih dekat ke 1,3 dan komposisinya berubah saat terbakar, gesekan dan kerja pemompaan pada langkah isap dan buang menggerogoti keluaran, dan gas buang keluar dalam keadaan panas. Simulasi tidak memasukkan satu pun kerugian ini: slider kecepatan mesin hanya mengubah seberapa cepat animasi berjalan, dan lintasan P-V sama persis pada 100 rpm maupun 5000 rpm. Anggaplah efisiensi ideal sebagai batas atas yang menunjukkan pilihan rancangan mana, yaitu rasio kompresi, yang mendorong batas itu lebih tinggi.',
      ],
    },
    figure: {
      caption: {
        en: 'The ideal Otto cycle on a P-V diagram. 1→2 adiabatic compression, 2→3 heat added at constant volume (spark), 3→4 adiabatic expansion (power stroke), 4→1 heat rejected at constant volume. The enclosed area is the net work per cycle; intake and exhaust run along the bottom line.',
        id: 'Siklus Otto ideal pada diagram P-V. 1→2 kompresi adiabatik, 2→3 kalor ditambahkan pada volume tetap (busi), 3→4 ekspansi adiabatik (langkah kerja), 4→1 kalor dibuang pada volume tetap. Luas yang dilingkupi adalah kerja neto per siklus; isap dan buang berjalan di sepanjang garis bawah.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Otto cycle P-V diagram with four strokes', 'Diagram P-V siklus Otto dengan empat langkah')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.m{fill:none;stroke:currentColor;stroke-width:1.2;opacity:.45}.t{text-anchor:middle}.s{font-size:10px}.c{stroke-width:2.4;fill:none}</style>
  <path d="M46 16 V204 H346" fill="none" stroke="currentColor" stroke-width="1.5"/>
  <text x="30" y="20" class="t">P</text>
  <text x="346" y="220" class="t">V</text>
  <line x1="96" y1="204" x2="96" y2="24" class="m" stroke-dasharray="3 3"/>
  <line x1="300" y1="204" x2="300" y2="150" class="m" stroke-dasharray="3 3"/>
  <text x="96" y="222" class="t s">V_min</text>
  <text x="300" y="222" class="t s">V_max</text>
  <path d="M300 184 Q140 180 96 70" class="c" stroke="#f59e0b" marker-end="url(#a)"/>
  <path d="M96 70 V36" class="c" stroke="#ef4444" marker-end="url(#a)"/>
  <path d="M96 36 Q160 160 300 162" class="c" stroke="#10b981" marker-end="url(#a)"/>
  <path d="M300 162 V184" class="c" stroke="#3b82f6" marker-end="url(#a)"/>
  <path d="M96 184 H300" class="c" stroke="#3b82f6" stroke-dasharray="6 4" opacity=".6"/>
  <circle cx="300" cy="184" r="3.5" fill="currentColor"/><text x="310" y="188">1</text>
  <circle cx="96" cy="70" r="3.5" fill="currentColor"/><text x="82" y="74">2</text>
  <circle cx="96" cy="36" r="3.5" fill="currentColor"/><text x="82" y="40">3</text>
  <circle cx="300" cy="162" r="3.5" fill="currentColor"/><text x="310" y="160">4</text>
  <text x="200" y="196" class="t s" fill="#f59e0b">${L('1→2 compression (adiabatic)', '1→2 kompresi (adiabatik)')}</text>
  <text x="104" y="56" class="s" fill="#ef4444">${L('2→3 spark: heat in, V constant', '2→3 busi: kalor masuk, V tetap')}</text>
  <text x="172" y="96" class="s" fill="#10b981">${L('3→4 power stroke (adiabatic)', '3→4 langkah kerja (adiabatik)')}</text>
  <text x="246" y="140" class="s" fill="#3b82f6">${L('4→1 heat out', '4→1 kalor keluar')}</text>
  <text x="200" y="178" class="t s" fill="#3b82f6">${L('intake / exhaust', 'isap / buang')}</text>
  <text x="190" y="130" class="t s">${L('enclosed area = net work', 'luas tertutup = kerja neto')}</text>
  <text x="252" y="40" class="s">r = V_max / V_min</text>
  <text x="252" y="56" class="s">η = 1 − 1 / r^(γ−1)</text>
  <text x="252" y="72" class="s">${L('γ = 1.4 (air)', 'γ = 1,4 (udara)')}</text>
  <defs><marker id="a" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="context-stroke"/></marker></defs>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'A four-stroke engine repeats intake, compression, power and exhaust; only the power stroke delivers work.',
        'The ideal Otto cycle is two adiabatic strokes joined by two constant-volume heat exchanges, and the loop area on the P-V diagram is the net work.',
        'Ideal Otto efficiency depends only on the compression ratio: η = 1 − 1 / r^(γ−1), about 56% at r = 8.',
        'Higher compression raises efficiency, but petrol self-ignites (knocks) above roughly r = 10 to 12 unless high-octane fuel is used.',
        'Real engines reach only 25 to 35% because of heat loss, finite combustion time, friction and pumping losses, none of which the sim models.',
      ],
      id: [
        'Mesin empat langkah mengulang isap, kompresi, kerja, dan buang; hanya langkah kerja yang menghasilkan usaha.',
        'Siklus Otto ideal terdiri dari dua langkah adiabatik yang dihubungkan dua pertukaran kalor pada volume tetap, dan luas lintasan pada diagram P-V adalah kerja neto.',
        'Efisiensi Otto ideal hanya bergantung pada rasio kompresi: η = 1 − 1 / r^(γ−1), sekitar 56% pada r = 8.',
        'Kompresi yang lebih tinggi menaikkan efisiensi, tetapi bensin menyala sendiri (knocking) di atas kira-kira r = 10 sampai 12 kecuali dipakai bahan bakar beroktan tinggi.',
        'Mesin sungguhan hanya mencapai 25 sampai 35% karena kehilangan kalor, waktu pembakaran yang tidak seketika, gesekan, dan kerugian pemompaan, yang semuanya tidak dimodelkan simulasi.',
      ],
    },
    vocabulary: {
      en: [
        ['Compression ratio (r)', 'The cylinder volume with the piston at the bottom divided by the volume with the piston at the top, V_max / V_min.'],
        ['Adiabatic process', 'A change in which no heat enters or leaves the gas; for an ideal gas P · V^γ stays constant, so compressing it heats it.'],
        ['Isochoric (constant-volume) process', 'A change at fixed volume; here the near-instant combustion at top dead centre and the exhaust blow-down.'],
        ['Top dead centre (TDC)', 'The piston position closest to the cylinder head, where the volume is smallest and the spark fires.'],
        ['Thermal efficiency (η)', 'Net work out divided by heat in; the fraction of the fuel\'s heat that becomes useful work.'],
        ['Heat capacity ratio (γ)', 'c_p / c_v, about 1.4 for air; it sets how steeply pressure rises during adiabatic compression.'],
        ['Knock', 'Uncontrolled self-ignition of the fuel-air mixture before or apart from the spark, caused by too much compression heating; it damages engines.'],
        ['Octane rating', 'A measure of a petrol\'s resistance to knock; higher-octane fuel tolerates higher compression ratios.'],
      ],
      id: [
        ['Rasio kompresi (r)', 'Volume silinder saat piston di titik terbawah dibagi volume saat piston di titik teratas, V_maks / V_min.'],
        ['Proses adiabatik', 'Perubahan tanpa kalor yang masuk atau keluar dari gas; untuk gas ideal P · V^γ tetap, sehingga memampatkannya membuatnya panas.'],
        ['Proses isokorik (volume tetap)', 'Perubahan pada volume tetap; di sini pembakaran hampir seketika di titik mati atas dan pelepasan tekanan saat katup buang membuka.'],
        ['Titik mati atas (TMA)', 'Posisi piston paling dekat dengan kepala silinder, ketika volume paling kecil dan busi memercik.'],
        ['Efisiensi termal (η)', 'Kerja neto yang keluar dibagi kalor yang masuk; bagian kalor bahan bakar yang menjadi kerja berguna.'],
        ['Rasio kalor jenis (γ)', 'c_p / c_v, sekitar 1,4 untuk udara; menentukan seberapa curam tekanan naik selama kompresi adiabatik.'],
        ['Knocking', 'Penyalaan sendiri campuran bahan bakar-udara yang tak terkendali sebelum atau terlepas dari percikan busi, akibat pemanasan kompresi yang berlebihan; merusak mesin.'],
        ['Angka oktan', 'Ukuran ketahanan bensin terhadap knocking; bahan bakar beroktan lebih tinggi tahan terhadap rasio kompresi yang lebih tinggi.'],
      ],
    },
    misconceptions: {
      en: [
        ['Burning more fuel makes the engine more efficient.', 'More fuel means more power, not a bigger fraction of the heat turned into work. In the sim, raising the heat-input ratio makes the loop taller but leaves η unchanged; only r moves the efficiency.'],
        ['A real petrol engine is about 56% efficient, as the formula says.', 'That is the ideal ceiling. Real spark-ignition engines deliver 25 to 35%, with the rest lost as heat to the coolant and exhaust, friction and pumping work. The formula tells you the direction of improvement, not the actual number.'],
        ['Running the engine faster makes each cycle more efficient.', 'In the ideal cycle speed does not appear at all, and the sim\'s loop is identical at any rpm. In real engines speed mainly changes friction and heat-loss time; there is a best-efficiency speed, but it comes from those losses, not from the Otto cycle.'],
        ['Diesel engines are more efficient simply because diesel fuel contains more energy.', 'The main reason is the much higher compression ratio (14 to 22) that diesels can use without knock, because they compress only air and inject fuel afterwards. Higher r means higher ideal efficiency, exactly as the formula predicts.'],
      ],
      id: [
        ['Membakar lebih banyak bahan bakar membuat mesin lebih efisien.', 'Lebih banyak bahan bakar berarti lebih banyak daya, bukan bagian kalor yang lebih besar yang diubah menjadi kerja. Dalam simulasi, menaikkan rasio kalor masuk membuat lintasan lebih tinggi tetapi η tidak berubah; hanya r yang menggeser efisiensi.'],
        ['Mesin bensin sungguhan efisiensinya sekitar 56%, seperti kata rumus.', 'Itu batas atas ideal. Mesin pengapian busi sungguhan menghasilkan 25 sampai 35%, dan sisanya hilang sebagai kalor ke pendingin dan gas buang, gesekan, serta kerja pemompaan. Rumus memberi tahu arah perbaikan, bukan angka sebenarnya.'],
        ['Menjalankan mesin lebih cepat membuat tiap siklus lebih efisien.', 'Dalam siklus ideal kecepatan tidak muncul sama sekali, dan lintasan simulasi identik pada rpm berapa pun. Pada mesin sungguhan kecepatan terutama mengubah gesekan dan waktu kehilangan kalor; ada kecepatan dengan efisiensi terbaik, tetapi itu berasal dari kerugian-kerugian itu, bukan dari siklus Otto.'],
        ['Mesin diesel lebih efisien hanya karena bahan bakar diesel mengandung lebih banyak energi.', 'Alasan utamanya adalah rasio kompresi yang jauh lebih tinggi (14 sampai 22) yang bisa dipakai diesel tanpa knocking, karena ia hanya memampatkan udara dan menyuntikkan bahan bakar sesudahnya. r yang lebih tinggi berarti efisiensi ideal yang lebih tinggi, persis seperti prediksi rumus.'],
      ],
    },
    realWorld: {
      en: [
        'Most modern petrol cars use compression ratios of 10 to 12; some direct-injection engines reach 13 to 14 by cooling the charge with fuel spray, which is one reason new cars use less fuel than older ones.',
        'Motorcycle engines sold in Indonesia with r around 11 or more are specified for higher-octane fuel; using low-octane petrol in them can cause knock, so the engine computer retards the spark and power drops.',
        'Diesel trucks, ships and generators run at r = 14 to 22 and reach 40 to 45% efficiency, the highest of any common combustion engine.',
        'Formula 1 engines are limited by rules to r = 18 and reach about 50% thermal efficiency with the help of turbocharging and energy recovery, close to the practical limit for a piston engine.',
      ],
      id: [
        'Sebagian besar mobil bensin modern memakai rasio kompresi 10 sampai 12; beberapa mesin injeksi langsung mencapai 13 sampai 14 dengan mendinginkan campuran lewat semprotan bahan bakar, salah satu alasan mobil baru lebih hemat bahan bakar daripada mobil lama.',
        'Mesin sepeda motor yang dijual di Indonesia dengan r sekitar 11 atau lebih dispesifikasikan untuk bahan bakar beroktan lebih tinggi; memakai bensin beroktan rendah pada mesin itu bisa menimbulkan knocking, sehingga komputer mesin memundurkan waktu pengapian dan tenaga turun.',
        'Truk, kapal, dan generator diesel berjalan pada r = 14 sampai 22 dan mencapai efisiensi 40 sampai 45%, yang tertinggi di antara mesin pembakaran yang umum.',
        'Mesin Formula 1 dibatasi aturan pada r = 18 dan mencapai efisiensi termal sekitar 50% dengan bantuan turbocharger dan pemulihan energi, mendekati batas praktis mesin piston.',
      ],
    },
    questions: {
      en: [
        { q: 'Compute the ideal Otto efficiency at r = 6 and at r = 12 with γ = 1.4. By how many percentage points does doubling the compression ratio help?', a: 'At r = 6: η = 1 − 1/6^0.4 = 1 − 0.488 = 51.2%. At r = 12: η = 1 − 1/12^0.4 = 1 − 0.370 = 63.0%. Doubling r gains about 12 percentage points. The gain shrinks as r grows because the curve flattens, which the sim shows as you slide r upward.' },
        { q: 'Slide the heat-input ratio T3/T2 from 1.5 up to 4 while keeping r fixed. What changes on the P-V diagram, and what does not?', a: 'Corner 3 shoots upward and the whole power stroke runs at higher pressure, so the enclosed area (net work per cycle) grows: more fuel burnt per cycle gives more work. The efficiency readout does not change at all, because the ideal Otto efficiency depends only on r and γ; heat in and work out grow in the same proportion.' },
        { q: 'A tuner wants to raise a petrol engine from r = 9 to r = 14 for better efficiency. Using the sim, explain the gain and the problem.', a: 'The ideal efficiency rises from about 58% to about 65%, as the sim shows. But above r = 12 the sim warns that the engine is knock-prone: the compressed mixture gets hot enough to ignite before the spark, hammering the piston and potentially destroying the engine. It would need very high-octane fuel, or a diesel-style design that compresses only air.' },
      ],
      id: [
        { q: 'Hitung efisiensi Otto ideal pada r = 6 dan pada r = 12 dengan γ = 1,4. Berapa poin persen keuntungan dari menggandakan rasio kompresi?', a: 'Pada r = 6: η = 1 − 1/6^0,4 = 1 − 0,488 = 51,2%. Pada r = 12: η = 1 − 1/12^0,4 = 1 − 0,370 = 63,0%. Menggandakan r memberi sekitar 12 poin persen. Keuntungannya mengecil saat r membesar karena kurvanya mendatar, yang ditunjukkan simulasi saat kamu menggeser r ke atas.' },
        { q: 'Geser rasio kalor masuk T3/T2 dari 1,5 ke 4 sambil menjaga r tetap. Apa yang berubah pada diagram P-V, dan apa yang tidak?', a: 'Sudut 3 melesat ke atas dan seluruh langkah kerja berjalan pada tekanan lebih tinggi, sehingga luas yang dilingkupi (kerja neto per siklus) membesar: lebih banyak bahan bakar terbakar per siklus memberi lebih banyak kerja. Tampilan efisiensi sama sekali tidak berubah, karena efisiensi Otto ideal hanya bergantung pada r dan γ; kalor masuk dan kerja keluar bertambah dengan perbandingan yang sama.' },
        { q: 'Seorang tuner ingin menaikkan mesin bensin dari r = 9 ke r = 14 demi efisiensi lebih baik. Dengan simulasi, jelaskan keuntungan dan masalahnya.', a: 'Efisiensi ideal naik dari sekitar 58% ke sekitar 65%, seperti ditunjukkan simulasi. Tetapi di atas r = 12 simulasi memperingatkan bahwa mesin rawan knocking: campuran yang dimampatkan cukup panas untuk menyala sebelum busi memercik, menghantam piston dan berpotensi menghancurkan mesin. Dibutuhkan bahan bakar beroktan sangat tinggi, atau rancangan ala diesel yang hanya memampatkan udara.' },
      ],
    },
  },
};
