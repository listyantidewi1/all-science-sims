// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Read Faraday\'s law n = It / (zF) where F = 96 485 C/mol.',
      'See the 2:1 H₂/O₂ ratio that makes water H₂O.',
      'Predict gas volume from current × time × electrode reaction.',
    ],
    id: [
      'Membaca hukum Faraday n = It / (zF) dengan F = 96 485 C/mol.',
      'Melihat rasio 2:1 H₂/O₂ yang membuat air H₂O.',
      'Memprediksi volume gas dari arus × waktu × reaksi elektroda.',
    ],
  },
  tryThis: {
    en: [
      '1 amp for 60 seconds — produces about 7 mL H₂ at STP.',
      'Double the current — bubbles double; volumes still in 2:1 ratio.',
      'Run for an hour mentally — calculate the H₂ volume from the formula.',
    ],
    id: [
      '1 ampere selama 60 detik — menghasilkan sekitar 7 mL H₂ pada STP.',
      'Gandakan arus — gelembung berlipat ganda; volume tetap rasio 2:1.',
      'Jalankan satu jam dalam pikiran — hitung volume H₂ dari rumus.',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'Water does not fall apart into hydrogen and oxygen on its own; the reaction 2 H₂O → 2 H₂ + O₂ needs an energy input. Electrolysis supplies that energy as electricity. Two electrodes dipped in the water are connected to a DC source. At the cathode, the negative electrode, electrons are pushed into the water and reduce it: 2 H₂O + 2 e⁻ → H₂ + 2 OH⁻. At the anode, the positive electrode, electrons are pulled out and water is oxidised: 2 H₂O → O₂ + 4 H⁺ + 4 e⁻. Hydrogen therefore appears at the negative electrode and oxygen at the positive one.',
        'Count the electrons and the famous 2:1 ratio falls out. Four electrons passing through the circuit make two H₂ molecules at the cathode but only one O₂ molecule at the anode, so hydrogen is produced at twice the rate of oxygen, exactly the 2:1 of the formula H₂O. Faraday\'s law makes this quantitative: the amount of substance produced is n = Q ÷ (zF) = It ÷ (zF), where I is the current, t the time, z the number of electrons per molecule (2 for H₂, 4 for O₂) and F = 96 485 C/mol is the charge carried by one mole of electrons. At STP each mole of gas occupies about 22.4 L, so 1 A for 60 s gives 60 C, n(H₂) = 60 ÷ (2 × 96 485) ≈ 3.1 × 10⁻⁴ mol ≈ 7.0 mL, and half as much O₂.',
        'The simulation sets the current directly with a slider and integrates the charge Q = I·t while it runs. It converts that charge to moles of each gas with Faraday\'s law and to millilitres at STP, filling the collection tubes from the top as gas displaces the water. The bubbles are a visual cue whose rate scales with the current; the numbers in the readout are the real model. Pause, change the current, and the tubes keep their 2:1 ratio whatever you do, because the ratio depends only on the electrons, not on the current.',
        'Several real-world details are left out. Pure water is a very poor conductor, so a real cell adds an electrolyte such as dilute sulfuric acid or sodium sulfate to carry the current; the sim simply assumes the current flows. The sim also ignores the voltage needed (at least 1.23 V in theory, more in practice because of overpotential), heating of the cell, gas dissolving in the water, and the fact that collected volumes depend on temperature and pressure. In a real experiment you would measure slightly less gas than the formula predicts.',
      ],
      id: [
        'Air tidak terurai sendiri menjadi hidrogen dan oksigen; reaksi 2 H₂O → 2 H₂ + O₂ membutuhkan masukan energi. Elektrolisis menyediakan energi itu dalam bentuk listrik. Dua elektroda yang dicelupkan ke air dihubungkan ke sumber arus searah. Di katoda, elektroda negatif, elektron didorong masuk ke air dan mereduksinya: 2 H₂O + 2 e⁻ → H₂ + 2 OH⁻. Di anoda, elektroda positif, elektron ditarik keluar dan air dioksidasi: 2 H₂O → O₂ + 4 H⁺ + 4 e⁻. Karena itu hidrogen muncul di elektroda negatif dan oksigen di elektroda positif.',
        'Hitung elektronnya, dan rasio 2:1 yang terkenal itu langsung muncul. Empat elektron yang melewati rangkaian menghasilkan dua molekul H₂ di katoda tetapi hanya satu molekul O₂ di anoda, sehingga hidrogen dihasilkan dua kali lebih cepat daripada oksigen, tepat sesuai rumus H₂O. Hukum Faraday membuatnya kuantitatif: jumlah zat yang dihasilkan adalah n = Q ÷ (zF) = It ÷ (zF), dengan I arus, t waktu, z jumlah elektron per molekul (2 untuk H₂, 4 untuk O₂), dan F = 96.485 C/mol adalah muatan satu mol elektron. Pada STP tiap mol gas menempati sekitar 22,4 L, jadi 1 A selama 60 s memberi 60 C, n(H₂) = 60 ÷ (2 × 96.485) ≈ 3,1 × 10⁻⁴ mol ≈ 7,0 mL, dan O₂ setengahnya.',
        'Simulasi mengatur arus langsung dengan slider dan menjumlahkan muatan Q = I·t selama berjalan. Muatan itu diubah menjadi mol tiap gas dengan hukum Faraday dan menjadi mililiter pada STP, mengisi tabung penampung dari atas saat gas mendesak air. Gelembung hanyalah petunjuk visual yang lajunya mengikuti arus; angka pada panel bacaan adalah model yang sesungguhnya. Hentikan, ubah arusnya, dan tabung tetap berada pada rasio 2:1 apa pun yang kamu lakukan, karena rasio itu hanya bergantung pada elektron, bukan pada arus.',
        'Beberapa detail dunia nyata tidak dimodelkan. Air murni adalah penghantar yang sangat buruk, sehingga sel nyata menambahkan elektrolit seperti asam sulfat encer atau natrium sulfat untuk membawa arus; simulasi hanya menganggap arus mengalir. Simulasi juga mengabaikan tegangan yang dibutuhkan (secara teori minimal 1,23 V, dalam praktik lebih besar karena potensial lebih), pemanasan sel, gas yang larut dalam air, dan kenyataan bahwa volume yang tertampung bergantung pada suhu dan tekanan. Dalam percobaan nyata kamu akan mengukur gas sedikit lebih sedikit daripada prediksi rumus.',
      ],
    },
    figure: {
      caption: {
        en: 'Electrons leave the battery into the cathode, where water is reduced to H₂; at the anode water is oxidised to O₂ and electrons return. Every 4 e⁻ give 2 H₂ and 1 O₂, so the hydrogen tube fills twice as fast.',
        id: 'Elektron keluar dari baterai menuju katoda, tempat air direduksi menjadi H₂; di anoda air dioksidasi menjadi O₂ dan elektron kembali. Tiap 4 e⁻ menghasilkan 2 H₂ dan 1 O₂, sehingga tabung hidrogen terisi dua kali lebih cepat.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Electrolysis cell with half-reactions', 'Sel elektrolisis dengan setengah reaksi')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.b{font-weight:700}.s{font-size:9.5px;opacity:.75}.m{fill:none;stroke:currentColor;stroke-width:1.5;opacity:.6}.w{stroke:currentColor;stroke-width:1.5;fill:none}</style>
  <path d="M40 90 L40 200 L320 200 L320 90" class="m"/>
  <rect x="42" y="120" width="276" height="78" fill="#3b82f6" opacity=".15"/>
  <text x="180" y="190" text-anchor="middle" class="s">${L('water + a little electrolyte', 'air + sedikit elektrolit')}</text>
  <rect x="90" y="70" width="40" height="110" rx="2" class="m"/>
  <rect x="92" y="72" width="36" height="64" fill="#3b82f6" opacity=".55"/>
  <text x="110" y="62" text-anchor="middle" class="b" fill="#3b82f6">H₂  (2 vol)</text>
  <rect x="230" y="70" width="40" height="110" rx="2" class="m"/>
  <rect x="232" y="72" width="36" height="32" fill="#f59e0b" opacity=".6"/>
  <text x="250" y="62" text-anchor="middle" class="b" fill="#f59e0b">O₂  (1 vol)</text>
  <rect x="107" y="150" width="6" height="48" fill="currentColor" opacity=".7"/>
  <rect x="247" y="150" width="6" height="48" fill="currentColor" opacity=".7"/>
  <text x="110" y="214" text-anchor="middle" class="b" fill="#3b82f6">${L('cathode (−)', 'katoda (−)')}</text>
  <text x="250" y="214" text-anchor="middle" class="b" fill="#ef4444">${L('anode (+)', 'anoda (+)')}</text>
  <text x="110" y="228" text-anchor="middle" class="s">2 H₂O + 2 e⁻ → H₂ + 2 OH⁻</text>
  <text x="250" y="228" text-anchor="middle" class="s">2 H₂O → O₂ + 4 H⁺ + 4 e⁻</text>
  <path d="M110 150 L110 24 L160 24" class="w"/>
  <path d="M250 150 L250 24 L200 24" class="w"/>
  <line x1="164" y1="14" x2="164" y2="34" stroke="currentColor" stroke-width="3"/>
  <line x1="172" y1="18" x2="172" y2="30" stroke="currentColor" stroke-width="2"/>
  <line x1="188" y1="14" x2="188" y2="34" stroke="currentColor" stroke-width="3"/>
  <line x1="196" y1="18" x2="196" y2="30" stroke="currentColor" stroke-width="2"/>
  <text x="180" y="10" text-anchor="middle" class="s">${L('DC source', 'sumber DC')}</text>
  <path d="M80 40 L80 110" stroke="#8b5cf6" stroke-width="2" fill="none" marker-end="url(#e)"/>
  <text x="48" y="80" class="s" fill="#8b5cf6">e⁻ ${L('in', 'masuk')}</text>
  <path d="M280 110 L280 40" stroke="#8b5cf6" stroke-width="2" fill="none" marker-end="url(#e)"/>
  <text x="286" y="80" class="s" fill="#8b5cf6">e⁻ ${L('out', 'keluar')}</text>
  <text x="180" y="150" text-anchor="middle" class="s">4 e⁻  →  2 H₂ + 1 O₂</text>
  <text x="180" y="164" text-anchor="middle" class="s">n = I·t ÷ (z·F)</text>
  <defs><marker id="e" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="context-stroke"/></marker></defs>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Electrolysis uses electrical energy to force a reaction that would not happen by itself.',
        'Reduction (gain of electrons) happens at the cathode, oxidation (loss of electrons) at the anode; in electrolysis the cathode is the negative electrode.',
        'Faraday\'s law, n = It ÷ (zF), links moles of product to the charge that has passed; doubling current or time doubles the gas.',
        'Hydrogen and oxygen form in a 2:1 mole and volume ratio because making O₂ takes 4 electrons while making H₂ takes 2.',
        'Gas volume at STP is moles × 22.4 L; the collected volume depends on temperature and pressure.',
      ],
      id: [
        'Elektrolisis memakai energi listrik untuk memaksa reaksi yang tidak akan terjadi dengan sendirinya.',
        'Reduksi (penerimaan elektron) terjadi di katoda, oksidasi (pelepasan elektron) di anoda; pada elektrolisis katoda adalah elektroda negatif.',
        'Hukum Faraday, n = It ÷ (zF), menghubungkan mol produk dengan muatan yang telah mengalir; menggandakan arus atau waktu menggandakan gas.',
        'Hidrogen dan oksigen terbentuk dengan perbandingan mol dan volume 2:1 karena membuat O₂ butuh 4 elektron sedangkan H₂ butuh 2.',
        'Volume gas pada STP adalah mol × 22,4 L; volume yang tertampung bergantung pada suhu dan tekanan.',
      ],
    },
    vocabulary: {
      en: [
        ['Electrolysis', 'Breaking a compound apart using an electric current.'],
        ['Cathode', 'The electrode where reduction occurs; in an electrolytic cell it is connected to the negative terminal.'],
        ['Anode', 'The electrode where oxidation occurs; in an electrolytic cell it is connected to the positive terminal.'],
        ['Half-reaction', 'The reduction or oxidation part of a redox reaction, written with the electrons shown.'],
        ['Faraday constant (F)', 'The charge of one mole of electrons, 96 485 C/mol.'],
        ['Charge (Q)', 'Current × time, in coulombs; 1 A flowing for 1 s moves 1 C.'],
        ['Electrolyte', 'A dissolved substance whose ions carry current through the liquid.'],
        ['STP', 'Standard temperature and pressure (0 °C, 1 atm), at which one mole of ideal gas occupies about 22.4 L.'],
      ],
      id: [
        ['Elektrolisis', 'Penguraian senyawa menggunakan arus listrik.'],
        ['Katoda', 'Elektroda tempat reduksi terjadi; pada sel elektrolisis terhubung ke kutub negatif.'],
        ['Anoda', 'Elektroda tempat oksidasi terjadi; pada sel elektrolisis terhubung ke kutub positif.'],
        ['Setengah reaksi', 'Bagian reduksi atau oksidasi dari reaksi redoks, ditulis dengan elektronnya.'],
        ['Tetapan Faraday (F)', 'Muatan satu mol elektron, 96.485 C/mol.'],
        ['Muatan (Q)', 'Arus × waktu, dalam coulomb; arus 1 A selama 1 s memindahkan 1 C.'],
        ['Elektrolit', 'Zat terlarut yang ion-ionnya membawa arus melalui cairan.'],
        ['STP', 'Suhu dan tekanan standar (0 °C, 1 atm), ketika satu mol gas ideal menempati sekitar 22,4 L.'],
      ],
    },
    misconceptions: {
      en: [
        ['Hydrogen forms at the positive electrode because hydrogen ions are positive.', 'Hydrogen forms where water gains electrons, which is the cathode, the negative electrode in electrolysis. Positive ions are attracted to the negative electrode, not the positive one.'],
        ['Electrons flow through the water from one electrode to the other.', 'Electrons travel only through the wires and the electrode surfaces. Inside the liquid the current is carried by ions moving in both directions; that is why pure water, with very few ions, hardly conducts.'],
        ['More voltage means proportionally more gas.', 'The amount of gas depends on the charge that passes, current × time. Voltage is needed to make the current flow, but once it does, Faraday\'s law counts only the electrons.'],
        ['Oxygen bubbles are smaller, so less oxygen is made.', 'Bubble size says nothing about amount. Half as many moles of O₂ form because each O₂ needs 4 electrons while each H₂ needs 2.'],
      ],
      id: [
        ['Hidrogen terbentuk di elektroda positif karena ion hidrogen bermuatan positif.', 'Hidrogen terbentuk di tempat air menerima elektron, yaitu katoda, elektroda negatif pada elektrolisis. Ion positif tertarik ke elektroda negatif, bukan ke yang positif.'],
        ['Elektron mengalir melalui air dari satu elektroda ke elektroda lainnya.', 'Elektron hanya bergerak melalui kawat dan permukaan elektroda. Di dalam cairan arus dibawa oleh ion yang bergerak ke dua arah; itulah sebabnya air murni, yang ionnya sangat sedikit, hampir tidak menghantarkan listrik.'],
        ['Tegangan lebih besar berarti gas lebih banyak secara sebanding.', 'Jumlah gas bergantung pada muatan yang mengalir, arus × waktu. Tegangan diperlukan agar arus mengalir, tetapi setelah mengalir, hukum Faraday hanya menghitung elektronnya.'],
        ['Gelembung oksigen lebih kecil, jadi oksigen yang dibuat lebih sedikit.', 'Ukuran gelembung tidak menunjukkan jumlah. Mol O₂ yang terbentuk memang setengahnya karena tiap O₂ membutuhkan 4 elektron sedangkan tiap H₂ membutuhkan 2.'],
      ],
    },
    realWorld: {
      en: [
        'Industrial electrolysers make "green" hydrogen from water using electricity from wind or solar; the hydrogen can later be burned or used in fuel cells.',
        'On the International Space Station, oxygen for the crew is produced by electrolysing water; the hydrogen is vented or recycled.',
        'Electroplating and copper refining use Faraday\'s law in reverse: the mass of metal deposited is set by current × time.',
        'The chlor-alkali industry electrolyses brine to make chlorine, hydrogen and sodium hydroxide, three of the most widely used industrial chemicals.',
      ],
      id: [
        'Elektroliser industri membuat hidrogen "hijau" dari air dengan listrik dari angin atau surya; hidrogennya bisa dibakar atau dipakai dalam sel bahan bakar.',
        'Di Stasiun Luar Angkasa Internasional, oksigen untuk awak dihasilkan dengan mengelektrolisis air; hidrogennya dibuang atau didaur ulang.',
        'Penyepuhan dan pemurnian tembaga memakai hukum Faraday secara terbalik: massa logam yang mengendap ditentukan oleh arus × waktu.',
        'Industri klor-alkali mengelektrolisis air garam untuk membuat klorin, hidrogen, dan natrium hidroksida, tiga bahan kimia industri yang paling banyak dipakai.',
      ],
    },
    questions: {
      en: [
        { q: 'You run the cell at 2.0 A for 5.0 minutes. How many moles and millilitres (at STP) of H₂ and O₂ are produced?', a: 'Q = 2.0 × 300 = 600 C. n(H₂) = 600 ÷ (2 × 96 485) ≈ 3.11 × 10⁻³ mol ≈ 69.6 mL. n(O₂) = 600 ÷ (4 × 96 485) ≈ 1.55 × 10⁻³ mol ≈ 34.8 mL, half the hydrogen.' },
        { q: 'Why does the hydrogen tube always fill exactly twice as fast as the oxygen tube, whatever current you choose?', a: 'Each H₂ needs 2 electrons and each O₂ needs 4. The same stream of electrons feeds both electrodes, so for every 4 electrons two H₂ and one O₂ form. The current only changes how fast the electrons arrive, not how they are shared.' },
        { q: 'Setup A runs 1.0 A for 120 s; setup B runs 4.0 A for 30 s. Which produces more hydrogen?', a: 'Neither: both pass 120 C of charge, so both make 120 ÷ (2 × 96 485) ≈ 6.2 × 10⁻⁴ mol H₂ (about 13.9 mL). Only the total charge matters, as the lab procedure checks with 1 A × 60 s against 2 A × 30 s.' },
      ],
      id: [
        { q: 'Kamu menjalankan sel pada 2,0 A selama 5,0 menit. Berapa mol dan mililiter (pada STP) H₂ dan O₂ yang dihasilkan?', a: 'Q = 2,0 × 300 = 600 C. n(H₂) = 600 ÷ (2 × 96.485) ≈ 3,11 × 10⁻³ mol ≈ 69,6 mL. n(O₂) = 600 ÷ (4 × 96.485) ≈ 1,55 × 10⁻³ mol ≈ 34,8 mL, setengah dari hidrogen.' },
        { q: 'Mengapa tabung hidrogen selalu terisi tepat dua kali lebih cepat daripada tabung oksigen, berapa pun arus yang kamu pilih?', a: 'Tiap H₂ membutuhkan 2 elektron dan tiap O₂ membutuhkan 4. Aliran elektron yang sama memberi makan kedua elektroda, sehingga untuk tiap 4 elektron terbentuk dua H₂ dan satu O₂. Arus hanya mengubah seberapa cepat elektron tiba, bukan cara pembagiannya.' },
        { q: 'Pengaturan A menjalankan 1,0 A selama 120 s; pengaturan B menjalankan 4,0 A selama 30 s. Mana yang menghasilkan hidrogen lebih banyak?', a: 'Tidak ada yang lebih banyak: keduanya mengalirkan muatan 120 C, sehingga keduanya membuat 120 ÷ (2 × 96.485) ≈ 6,2 × 10⁻⁴ mol H₂ (sekitar 13,9 mL). Hanya muatan total yang menentukan, seperti yang dicek prosedur lab dengan 1 A × 60 s dibandingkan 2 A × 30 s.' },
      ],
    },
  },
};
