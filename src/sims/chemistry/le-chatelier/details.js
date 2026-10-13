// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Predict the direction of a shift after a stress.',
      'Apply the principle to exothermic vs endothermic reactions.',
      'Distinguish pressure effects when moles of gas differ on each side.',
    ],
    id: [
      'Memprediksi arah pergeseran setelah gangguan.',
      'Menerapkan asas pada reaksi eksotermik vs endotermik.',
      'Membedakan efek tekanan ketika jumlah mol gas berbeda di kedua sisi.',
    ],
  },
  tryThis: {
    en: [
      'Add reactant — does product concentration rise?',
      'Heat an exothermic reaction — which way does it shift?',
      'Increase pressure when products have more gas moles.',
    ],
    id: [
      'Tambahkan pereaksi — apakah konsentrasi produk naik?',
      'Panaskan reaksi eksotermik — ke arah mana pergeseran?',
      'Naikkan tekanan saat produk memiliki lebih banyak mol gas.',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'Many reactions run in both directions at once. Reactants form products while products turn back into reactants, and when the two rates become equal the mixture reaches dynamic equilibrium: the concentrations stop changing, even though both reactions are still running. The balance is described by the equilibrium constant K, the ratio of product concentrations to reactant concentrations, each raised to its coefficient (for N₂ + 3 H₂ ⇌ 2 NH₃, K = [NH₃]² / ([N₂][H₂]³)). The same ratio evaluated at any moment is the reaction quotient Q. If Q is less than K the forward reaction wins until Q climbs to K; if Q is greater, the reverse reaction wins.',
        'Le Chatelier\'s principle is a shortcut for predicting this: when a system at equilibrium is disturbed, it shifts in the direction that partly undoes the disturbance. The simulation makes the shortcut visible. Every frame it computes Q for the current bars, compares it with K at the current temperature, and moves the concentrations in stoichiometric ratios toward the side that brings Q back to K. The time series on the right records the bars, so you see a flat line, a jump when you disturb the system, and a relaxation to a new flat line.',
        'The three disturbances match the controls. The + buttons add 0.5 units of one species: adding a reactant makes Q smaller than K, so the system consumes some of what you added and makes more product, but the added species still ends higher than before. The temperature slider does not change the bars directly; it changes K, because heat behaves like a reactant in an endothermic reaction (K rises with T) and like a product in an exothermic one (K falls with T). The pressure slider models compressing a gas mixture: it multiplies every concentration by the same factor. For the Haber reaction, 4 moles of gas become 2, so compressing raises the denominator of Q more than the numerator, Q drops below K, and the system shifts toward ammonia, the side with fewer gas molecules.',
        'The model is qualitative. Temperature and pressure are relative numbers (1.0 = the starting state), K(T) follows a simple exponential sketch rather than the real reaction enthalpy, and the speed at which the bars settle is a fixed relaxation rate, so only the final positions are meaningful, not the time taken. Real systems also equilibrate faster when hot, and a catalyst would speed both directions equally without moving the equilibrium at all. Adding an inert gas at constant volume, which changes the total pressure but none of the concentrations, would cause no shift; the pressure slider here always compresses, so it always changes concentrations.',
      ],
      id: [
        'Banyak reaksi berlangsung dua arah sekaligus. Pereaksi membentuk produk sementara produk kembali menjadi pereaksi, dan ketika kedua laju itu sama, campuran mencapai kesetimbangan dinamis: konsentrasi berhenti berubah walaupun kedua reaksi tetap berjalan. Keseimbangan ini dinyatakan oleh tetapan kesetimbangan K, yaitu perbandingan konsentrasi produk terhadap pereaksi, masing-masing dipangkatkan koefisiennya (untuk N₂ + 3 H₂ ⇌ 2 NH₃, K = [NH₃]² / ([N₂][H₂]³)). Perbandingan yang sama bila dihitung pada saat sembarang disebut kuosien reaksi Q. Jika Q lebih kecil dari K, reaksi maju menang sampai Q naik ke K; jika Q lebih besar, reaksi balik yang menang.',
        'Asas Le Chatelier adalah jalan pintas untuk meramalkannya: bila sistem setimbang diganggu, sistem bergeser ke arah yang sebagian membatalkan gangguan itu. Simulasi membuat jalan pintas ini terlihat. Setiap frame simulasi menghitung Q dari batang-batang saat ini, membandingkannya dengan K pada suhu saat ini, lalu menggeser konsentrasi dengan perbandingan stoikiometri ke sisi yang mengembalikan Q ke K. Grafik waktu di kanan merekam batang-batang itu, sehingga kamu melihat garis datar, lonjakan saat sistem diganggu, dan relaksasi menuju garis datar yang baru.',
        'Tiga gangguan sesuai dengan kontrolnya. Tombol + menambahkan 0,5 satuan satu zat: menambah pereaksi membuat Q lebih kecil dari K, sehingga sistem menghabiskan sebagian tambahan itu dan membentuk lebih banyak produk, tetapi zat yang ditambahkan tetap berakhir lebih tinggi daripada semula. Slider suhu tidak mengubah batang secara langsung; ia mengubah K, karena kalor berperilaku seperti pereaksi pada reaksi endotermik (K naik dengan T) dan seperti produk pada reaksi eksotermik (K turun dengan T). Slider tekanan memodelkan pemampatan campuran gas: semua konsentrasi dikalikan faktor yang sama. Pada reaksi Haber, 4 mol gas menjadi 2, sehingga pemampatan menaikkan penyebut Q lebih besar daripada pembilangnya, Q jatuh di bawah K, dan sistem bergeser ke arah amonia, sisi dengan molekul gas lebih sedikit.',
        'Model ini bersifat kualitatif. Suhu dan tekanan adalah angka relatif (1,0 = keadaan awal), K(T) mengikuti sketsa eksponensial sederhana, bukan entalpi reaksi yang sesungguhnya, dan kecepatan batang menuju keadaan baru adalah laju relaksasi tetap, sehingga hanya posisi akhirnya yang bermakna, bukan waktu yang diperlukan. Sistem nyata juga mencapai kesetimbangan lebih cepat saat panas, dan katalis akan mempercepat kedua arah sama besar tanpa menggeser kesetimbangan sedikit pun. Menambahkan gas inert pada volume tetap, yang mengubah tekanan total tetapi tidak satu pun konsentrasi, tidak akan menyebabkan pergeseran; slider tekanan di sini selalu memampatkan, sehingga selalu mengubah konsentrasi.',
      ],
    },
    figure: {
      caption: {
        en: 'Concentrations against time for N₂ + 3 H₂ ⇌ 2 NH₃. At the dashed line extra N₂ is added, so Q falls below K. The system responds by consuming some N₂ and H₂ and making more NH₃ until Q equals K again; note that N₂ ends higher than it started.',
        id: 'Konsentrasi terhadap waktu untuk N₂ + 3 H₂ ⇌ 2 NH₃. Pada garis putus-putus, N₂ tambahan dimasukkan sehingga Q jatuh di bawah K. Sistem menanggapinya dengan menghabiskan sebagian N₂ dan H₂ serta membentuk lebih banyak NH₃ sampai Q kembali sama dengan K; perhatikan N₂ berakhir lebih tinggi daripada semula.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Equilibrium shift after adding a reactant', 'Pergeseran kesetimbangan setelah pereaksi ditambahkan')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.ax{stroke:currentColor;stroke-width:1.2;fill:none}.c{fill:none;stroke-width:2.4}</style>
  <line x1="40" y1="20" x2="40" y2="200" class="ax"/>
  <line x1="40" y1="200" x2="340" y2="200" class="ax"/>
  <line x1="150" y1="20" x2="150" y2="200" stroke="currentColor" stroke-width="1" stroke-dasharray="4 4" opacity=".6"/>
  <text x="155" y="32" style="font-weight:bold">${L('+ N₂ added', '+ N₂ ditambahkan')}</text>
  <text x="155" y="46" opacity=".8">Q &lt; K → ${L('shift right', 'geser ke kanan')}</text>
  <path d="M40 130 L150 130 L150 70 C180 82 210 90 240 90 L340 90" class="c" stroke="#ef4444"/>
  <path d="M40 100 L150 100 C180 110 210 115 240 115 L340 115" class="c" stroke="#f59e0b"/>
  <path d="M40 150 L150 150 C180 136 210 128 240 128 L340 128" class="c" stroke="#10b981"/>
  <text x="300" y="86" fill="#ef4444">N₂</text>
  <text x="300" y="111" fill="#f59e0b">H₂</text>
  <text x="300" y="142" fill="#10b981">NH₃</text>
  <line x1="60" y1="130" x2="60" y2="150" stroke="currentColor" stroke-width=".8" opacity=".5"/>
  <text x="46" y="170" opacity=".8">${L('old equilibrium', 'kesetimbangan lama')}</text>
  <text x="46" y="183" opacity=".8">Q = K</text>
  <text x="250" y="170" opacity=".8">${L('new equilibrium', 'kesetimbangan baru')}</text>
  <text x="250" y="183" opacity=".8">Q = K ${L('again', 'lagi')}</text>
  <line x1="130" y1="90" x2="146" y2="128" stroke="#ef4444" stroke-width="1" marker-end="url(#ar)"/>
  <text x="62" y="86" fill="#ef4444">${L('N₂ consumed, but still above old level', 'N₂ terpakai, tapi tetap di atas semula')}</text>
  <text x="18" y="110" transform="rotate(-90 18 110)" text-anchor="middle">${L('concentration', 'konsentrasi')}</text>
  <text x="190" y="222" text-anchor="middle">${L('time', 'waktu')}</text>
  <defs><marker id="ar" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="context-stroke"/></marker></defs>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'At equilibrium the forward and reverse reactions run at the same rate, so concentrations are constant but usually not equal.',
        'Q compared with K tells the direction: Q < K drives the forward reaction, Q > K drives the reverse one.',
        'Adding a species shifts the equilibrium away from that species, but only part of the addition is used up.',
        'Only temperature changes K: heating favours the endothermic direction, cooling favours the exothermic one.',
        'Compressing a gas mixture shifts the equilibrium toward the side with fewer moles of gas; if both sides have equal moles, pressure has no effect.',
      ],
      id: [
        'Pada kesetimbangan, reaksi maju dan balik berlangsung dengan laju yang sama, sehingga konsentrasi tetap tetapi biasanya tidak sama besar.',
        'Perbandingan Q dengan K menentukan arah: Q < K mendorong reaksi maju, Q > K mendorong reaksi balik.',
        'Menambahkan suatu zat menggeser kesetimbangan menjauhi zat itu, tetapi hanya sebagian tambahan yang terpakai.',
        'Hanya suhu yang mengubah K: pemanasan menguntungkan arah endotermik, pendinginan menguntungkan arah eksotermik.',
        'Memampatkan campuran gas menggeser kesetimbangan ke sisi dengan mol gas lebih sedikit; jika mol gas kedua sisi sama, tekanan tidak berpengaruh.',
      ],
    },
    vocabulary: {
      en: [
        ['Dynamic equilibrium', 'A state in which forward and reverse reactions continue at equal rates, so no net change is seen.'],
        ['Equilibrium constant (K)', 'The value of the product/reactant concentration ratio at equilibrium; it depends only on temperature.'],
        ['Reaction quotient (Q)', 'The same ratio as K but calculated from the concentrations at any moment, equilibrium or not.'],
        ['Le Chatelier\'s principle', 'A disturbed equilibrium shifts in the direction that partly counteracts the disturbance.'],
        ['Exothermic / endothermic', 'A reaction that releases heat (ΔH < 0) / absorbs heat (ΔH > 0) in the forward direction.'],
        ['Shift', 'A temporary net reaction in one direction that carries the system to a new equilibrium composition.'],
        ['Haber process', 'The industrial synthesis of ammonia, N₂ + 3 H₂ ⇌ 2 NH₃, exothermic and run under high pressure.'],
      ],
      id: [
        ['Kesetimbangan dinamis', 'Keadaan ketika reaksi maju dan balik terus berlangsung dengan laju sama, sehingga tidak tampak perubahan bersih.'],
        ['Tetapan kesetimbangan (K)', 'Nilai perbandingan konsentrasi produk/pereaksi pada kesetimbangan; hanya bergantung pada suhu.'],
        ['Kuosien reaksi (Q)', 'Perbandingan yang sama dengan K tetapi dihitung dari konsentrasi pada saat sembarang, setimbang atau tidak.'],
        ['Asas Le Chatelier', 'Kesetimbangan yang diganggu bergeser ke arah yang sebagian melawan gangguan tersebut.'],
        ['Eksotermik / endotermik', 'Reaksi yang melepas kalor (ΔH < 0) / menyerap kalor (ΔH > 0) pada arah maju.'],
        ['Pergeseran', 'Reaksi bersih sementara ke satu arah yang membawa sistem ke komposisi kesetimbangan baru.'],
        ['Proses Haber', 'Sintesis amonia skala industri, N₂ + 3 H₂ ⇌ 2 NH₃, eksotermik dan dijalankan pada tekanan tinggi.'],
      ],
    },
    misconceptions: {
      en: [
        ['At equilibrium the reaction has stopped.', 'Both reactions continue at full speed; they merely cancel. Isotope-labelling experiments show atoms still swapping between reactants and products at equilibrium.'],
        ['Equilibrium means the concentrations of reactants and products are equal.', 'It means the rates are equal. The concentrations can be very different; K = 0.5 or K = 1000 are both equilibria.'],
        ['Adding more reactant converts all of it into product, or the reactant returns to its original level.', 'Neither. Part of the addition is converted; at the new equilibrium the added reactant is higher than before and the product is higher too, with Q back at the same K.'],
        ['Raising the pressure always pushes a gas reaction to the right.', 'It pushes toward the side with fewer gas molecules. For 2 SO₂ + O₂ ⇌ 2 SO₃ that is the right, but for a reaction with more gas moles in the products it would be the left, and with equal moles there is no shift.'],
      ],
      id: [
        ['Pada kesetimbangan, reaksi sudah berhenti.', 'Kedua reaksi terus berjalan penuh; keduanya hanya saling meniadakan. Percobaan penandaan isotop menunjukkan atom masih bertukar antara pereaksi dan produk pada kesetimbangan.'],
        ['Kesetimbangan berarti konsentrasi pereaksi dan produk sama besar.', 'Yang sama adalah lajunya. Konsentrasinya bisa sangat berbeda; K = 0,5 dan K = 1000 sama-sama kesetimbangan.'],
        ['Menambah pereaksi mengubah semuanya menjadi produk, atau pereaksi kembali ke kadar semula.', 'Keduanya salah. Hanya sebagian tambahan yang diubah; pada kesetimbangan baru pereaksi yang ditambahkan lebih tinggi daripada semula dan produk juga lebih tinggi, dengan Q kembali ke K yang sama.'],
        ['Menaikkan tekanan selalu mendorong reaksi gas ke kanan.', 'Tekanan mendorong ke sisi dengan molekul gas lebih sedikit. Untuk 2 SO₂ + O₂ ⇌ 2 SO₃ itu ke kanan, tetapi untuk reaksi yang produknya bermol gas lebih banyak dorongannya ke kiri, dan bila molnya sama tidak ada pergeseran.'],
      ],
    },
    realWorld: {
      en: [
        'The Haber process makes ammonia for fertiliser at roughly 400–500 °C and 150–300 atm with an iron catalyst: high pressure for yield, moderate heat as a compromise between yield and speed.',
        'The Contact process for sulfuric acid oxidises SO₂ to SO₃ over a vanadium(V) oxide catalyst, again balancing an exothermic equilibrium against reaction rate.',
        'A fizzy drink goes flat when opened: releasing the pressure shifts CO₂(aq) ⇌ CO₂(g) toward the gas.',
        'At high altitude the body makes more haemoglobin because low oxygen pressure shifts the Hb + O₂ ⇌ HbO₂ equilibrium to the left.',
      ],
      id: [
        'Proses Haber membuat amonia untuk pupuk pada kira-kira 400–500 °C dan 150–300 atm dengan katalis besi: tekanan tinggi demi hasil, suhu sedang sebagai kompromi antara hasil dan kecepatan.',
        'Proses Kontak untuk asam sulfat mengoksidasi SO₂ menjadi SO₃ dengan katalis vanadium(V) oksida, sekali lagi menyeimbangkan kesetimbangan eksotermik dengan laju reaksi.',
        'Minuman bersoda kehilangan gasnya saat dibuka: pelepasan tekanan menggeser CO₂(aq) ⇌ CO₂(g) ke arah gas.',
        'Di dataran tinggi tubuh membuat lebih banyak hemoglobin karena tekanan oksigen yang rendah menggeser kesetimbangan Hb + O₂ ⇌ HbO₂ ke kiri.',
      ],
    },
    questions: {
      en: [
        { q: 'The Haber mixture is at equilibrium and you press + H₂. Predict what happens to each of [N₂], [H₂] and [NH₃] by the time the bars settle.', a: '[H₂] jumps up, then falls part of the way back but stays above its old value. [N₂] falls, because some of it reacts with the extra hydrogen. [NH₃] rises. The shift uses up only part of the added H₂; at the end Q equals K again.' },
        { q: 'For 2 SO₂ + O₂ ⇌ 2 SO₃ the gas is compressed so every concentration doubles. By what factor does Q change, and which way does the system shift?', a: 'Q = [SO₃]² / ([SO₂]²[O₂]). Doubling everything multiplies the top by 2² = 4 and the bottom by 2² × 2 = 8, so Q halves. Q is now below K, so the system shifts right, toward SO₃, the side with fewer gas molecules (3 → 2).' },
        { q: 'Heating the exothermic Haber reaction lowers the yield of ammonia, so why does industry run it hot (about 400–500 °C) instead of at room temperature?', a: 'K is largest at low temperature, but the reaction is then far too slow to be useful. A moderate temperature with an iron catalyst reaches equilibrium quickly, and high pressure plus removing ammonia as it forms recovers the yield. It is a trade-off between equilibrium (thermodynamics) and rate (kinetics).' },
      ],
      id: [
        { q: 'Campuran Haber sedang setimbang dan kamu menekan + H₂. Ramalkan apa yang terjadi pada [N₂], [H₂], dan [NH₃] saat batang-batang kembali tenang.', a: '[H₂] melonjak, lalu turun sebagian tetapi tetap di atas nilai lamanya. [N₂] turun, karena sebagian bereaksi dengan hidrogen tambahan. [NH₃] naik. Pergeseran hanya menghabiskan sebagian H₂ yang ditambahkan; pada akhirnya Q kembali sama dengan K.' },
        { q: 'Untuk 2 SO₂ + O₂ ⇌ 2 SO₃ gas dimampatkan sehingga setiap konsentrasi menjadi dua kali. Berapa kali Q berubah, dan ke arah mana sistem bergeser?', a: 'Q = [SO₃]² / ([SO₂]²[O₂]). Menggandakan semuanya mengalikan pembilang dengan 2² = 4 dan penyebut dengan 2² × 2 = 8, sehingga Q menjadi setengahnya. Q kini di bawah K, maka sistem bergeser ke kanan, ke arah SO₃, sisi dengan molekul gas lebih sedikit (3 → 2).' },
        { q: 'Memanaskan reaksi Haber yang eksotermik menurunkan hasil amonia, jadi mengapa industri menjalankannya pada suhu tinggi (sekitar 400–500 °C), bukan pada suhu kamar?', a: 'K paling besar pada suhu rendah, tetapi reaksinya jauh terlalu lambat untuk berguna. Suhu sedang dengan katalis besi mencapai kesetimbangan dengan cepat, dan tekanan tinggi serta pengambilan amonia begitu terbentuk mengembalikan hasilnya. Ini kompromi antara kesetimbangan (termodinamika) dan laju (kinetika).' },
      ],
    },
  },
};
