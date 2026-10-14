// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Series resistance: R_total = R₁ + R₂ + R₃.',
      'Parallel resistance: 1/R_total = 1/R₁ + 1/R₂ + 1/R₃.',
      'See voltage divide in series, current divide in parallel.',
    ],
    id: [
      'Resistansi seri: R_total = R₁ + R₂ + R₃.',
      'Resistansi paralel: 1/R_total = 1/R₁ + 1/R₂ + 1/R₃.',
      'Melihat tegangan terbagi di seri, arus terbagi di paralel.',
    ],
  },  tryThis: {
    en: [
      'Series, all 3 same — bulbs share voltage equally; remove one → all dark.',
      'Parallel, all 3 same — each bulb at full brightness; remove one → others unchanged.',
      'Mix bulb resistances in series — the one with highest R drops the most voltage.',
    ],
    id: [
      'Seri, ketiganya sama — bohlam berbagi tegangan sama; cabut satu → semua gelap.',
      'Paralel, ketiganya sama — tiap bohlam terang penuh; cabut satu → yang lain tak berubah.',
      'Campur R bohlam di seri — yang R tertinggi turun tegangan terbanyak.',
    ],
  },

  // "Learn" section: the physics behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'An electric circuit is a closed loop that lets charge flow from one terminal of a battery, through the components, and back to the other terminal. The battery provides the voltage, a kind of electrical push measured in volts; the current is how much charge passes a point each second, measured in amperes (the sim shows milliamperes, mA). Each bulb resists the flow, and its resistance in ohms (Ω) tells you how hard it is to push current through it. Ohm\'s law links the three: current = voltage ÷ resistance, or I = V / R.',
        'In a series circuit the bulbs sit one after another on a single path, so the same current passes through every bulb and the battery\'s voltage is shared out among them. The resistances simply add up, R_total = R1 + R2 + R3, and the bulb with the largest resistance takes the largest share of the voltage. Because the current is the same everywhere, that bulb also receives the most power, P = I²·R, so in series the highest-resistance bulb is the brightest. Switch one bulb off and the loop is broken: there is no path at all, the current is zero and every bulb goes dark.',
        'In a parallel circuit each bulb has its own branch connected directly across the battery, so every bulb gets the full battery voltage and the current splits between the branches. Each branch draws I = V / R on its own, and the total current is the sum, which is why adding branches lowers the combined resistance: 1 / R_total = 1 / R1 + 1 / R2 + 1 / R3. Here the lowest-resistance bulb draws the most current and is the brightest, since P = V² / R. Switching one bulb off removes only its branch; the others do not notice.',
        'The simulation lets you choose series or parallel, set each bulb\'s resistance from 1 to 100 Ω and the battery from 1 to 24 V, and toggle any bulb out of the circuit. The table lists the total resistance and current and each bulb\'s voltage, current and power. The model is deliberately simple: the battery is ideal with no internal resistance, the wires have zero resistance, and each bulb is a fixed resistor, whereas a real filament\'s resistance rises several-fold as it heats up. The drawn glow reaches full brightness at a small power, so for most settings the bulbs look equally bright; compare the power numbers in the table instead.',
      ],
      id: [
        'Rangkaian listrik adalah lintasan tertutup yang membiarkan muatan mengalir dari satu kutub baterai, melewati komponen, dan kembali ke kutub lainnya. Baterai menyediakan tegangan, semacam dorongan listrik yang diukur dalam volt; arus adalah banyaknya muatan yang melewati suatu titik tiap detik, diukur dalam ampere (sim menampilkan miliampere, mA). Setiap bohlam menghambat aliran, dan hambatannya dalam ohm (Ω) menyatakan seberapa sulit mendorong arus melewatinya. Hukum Ohm menghubungkan ketiganya: arus = tegangan ÷ hambatan, atau I = V / R.',
        'Dalam rangkaian seri bohlam-bohlam tersusun berurutan pada satu lintasan, sehingga arus yang sama melewati setiap bohlam dan tegangan baterai dibagi di antara mereka. Hambatannya langsung dijumlahkan, R_total = R1 + R2 + R3, dan bohlam dengan hambatan terbesar mendapat bagian tegangan terbesar. Karena arusnya sama di mana-mana, bohlam itu juga menerima daya terbesar, P = I²·R, jadi pada rangkaian seri bohlam berhambatan tertinggi menyala paling terang. Matikan satu bohlam dan lintasannya terputus: tidak ada jalur sama sekali, arus menjadi nol dan semua bohlam padam.',
        'Dalam rangkaian paralel setiap bohlam memiliki cabang sendiri yang terhubung langsung ke baterai, sehingga setiap bohlam mendapat tegangan baterai penuh dan arus terbagi di antara cabang. Tiap cabang menarik I = V / R sendiri-sendiri, dan arus total adalah jumlahnya; itulah sebabnya menambah cabang menurunkan hambatan gabungan: 1 / R_total = 1 / R1 + 1 / R2 + 1 / R3. Di sini bohlam berhambatan terendah menarik arus terbesar dan menyala paling terang, karena P = V² / R. Mematikan satu bohlam hanya menghilangkan cabangnya; yang lain tidak terpengaruh.',
        'Simulasi membolehkan kamu memilih seri atau paralel, mengatur hambatan tiap bohlam dari 1 sampai 100 Ω dan baterai dari 1 sampai 24 V, serta mengeluarkan bohlam mana pun dari rangkaian. Tabel menampilkan hambatan dan arus total serta tegangan, arus, dan daya tiap bohlam. Modelnya sengaja dibuat sederhana: baterai ideal tanpa hambatan dalam, kawat tanpa hambatan, dan setiap bohlam adalah resistor tetap, sedangkan hambatan filamen sungguhan naik beberapa kali lipat saat memanas. Cahaya yang digambar mencapai terang penuh pada daya yang kecil, sehingga pada kebanyakan pengaturan bohlam terlihat sama terangnya; bandingkan angka daya di tabel saja.',
      ],
    },
    figure: {
      caption: {
        en: 'Series (left): one path, so the same current I passes every bulb and the battery voltage is split between them. Parallel (right): each bulb sits directly across the battery, gets the full voltage, and draws its own share of the current.',
        id: 'Seri (kiri): satu lintasan, sehingga arus I yang sama melewati setiap bohlam dan tegangan baterai terbagi di antara mereka. Paralel (kanan): setiap bohlam terhubung langsung ke baterai, mendapat tegangan penuh, dan menarik bagian arusnya sendiri.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Series versus parallel circuits', 'Rangkaian seri dan paralel')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.w{fill:none;stroke:currentColor;stroke-width:1.8}.b{fill:none;stroke:#f59e0b;stroke-width:2}.bat{stroke:currentColor;stroke-width:3}.t{font-size:10px;opacity:.8}.c{stroke:#3b82f6;stroke-width:2;fill:none}</style>
  <text x="20" y="22" font-weight="bold">${L('Series', 'Seri')}</text>
  <path d="M30 70 L60 70 M80 70 L100 70 M120 70 L140 70 M160 70 L180 70 L180 150 L30 150 L30 118 M30 102 L30 70" class="w"/>
  <path d="M22 106 L38 106 M26 114 L34 114" class="bat"/>
  <circle cx="70" cy="70" r="10" class="b"/><path d="M64 64 L76 76 M76 64 L64 76" class="b"/>
  <circle cx="110" cy="70" r="10" class="b"/><path d="M104 64 L116 76 M116 64 L104 76" class="b"/>
  <circle cx="150" cy="70" r="10" class="b"/><path d="M144 64 L156 76 M156 64 L144 76" class="b"/>
  <line x1="130" y1="150" x2="90" y2="150" class="c" marker-end="url(#a)"/>
  <line x1="180" y1="90" x2="180" y2="130" class="c" marker-end="url(#a)"/>
  <text x="60" y="166" class="t" fill="#3b82f6">I ${L('same everywhere', 'sama di mana-mana')}</text>
  <text x="20" y="190" class="t">R_total = R1 + R2 + R3</text>
  <text x="20" y="204" class="t">${L('voltage is shared out', 'tegangan dibagi')}</text>
  <text x="20" y="218" class="t">${L('one bulb out → all dark', 'satu bohlam lepas → semua padam')}</text>
  <text x="200" y="22" font-weight="bold">${L('Parallel', 'Paralel')}</text>
  <path d="M212 56 L212 84 M220 62 L220 78 M212 70 L200 70 L200 150 L340 150 M220 70 L340 70" class="w"/>
  <path d="M250 70 L250 98 M250 122 L250 150 M290 70 L290 98 M290 122 L290 150 M330 70 L330 98 M330 122 L330 150" class="w"/>
  <circle cx="250" cy="110" r="10" class="b"/><path d="M244 104 L256 116 M256 104 L244 116" class="b"/>
  <circle cx="290" cy="110" r="10" class="b"/><path d="M284 104 L296 116 M296 104 L284 116" class="b"/>
  <circle cx="330" cy="110" r="10" class="b"/><path d="M324 104 L336 116 M336 104 L324 116" class="b"/>
  <line x1="238" y1="80" x2="238" y2="98" class="c" marker-end="url(#a)"/><line x1="278" y1="80" x2="278" y2="98" class="c" marker-end="url(#a)"/><line x1="318" y1="80" x2="318" y2="98" class="c" marker-end="url(#a)"/>
  <text x="226" y="166" class="t" fill="#3b82f6">${L('current splits between branches', 'arus terbagi ke cabang')}</text>
  <text x="200" y="190" class="t">1/R_total = 1/R1 + 1/R2 + 1/R3</text>
  <text x="200" y="204" class="t">${L('each bulb gets the full V', 'tiap bohlam dapat V penuh')}</text>
  <text x="200" y="218" class="t">${L('one bulb out → others unchanged', 'satu bohlam lepas → lainnya tetap')}</text>
  <defs><marker id="a" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="context-stroke"/></marker></defs>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Ohm\'s law, I = V / R, links the current through a component to the voltage across it and its resistance.',
        'In series there is one path: the same current flows through every bulb, the voltages add up to the battery voltage, and resistances add.',
        'In parallel each branch has the full battery voltage, the branch currents add up to the total, and the combined resistance is smaller than any single branch.',
        'Brightness follows power: P = I²·R = V²/R, so the largest-R bulb is brightest in series but the smallest-R bulb is brightest in parallel.',
        'Removing a series bulb breaks the only path and stops all current; removing a parallel bulb leaves the other branches untouched.',
      ],
      id: [
        'Hukum Ohm, I = V / R, menghubungkan arus yang melewati suatu komponen dengan tegangan padanya dan hambatannya.',
        'Pada rangkaian seri hanya ada satu lintasan: arus yang sama mengalir melalui setiap bohlam, tegangan-tegangannya berjumlah sama dengan tegangan baterai, dan hambatan dijumlahkan.',
        'Pada rangkaian paralel setiap cabang mendapat tegangan baterai penuh, arus cabang berjumlah sama dengan arus total, dan hambatan gabungan lebih kecil daripada cabang mana pun.',
        'Terang bohlam mengikuti daya: P = I²·R = V²/R, jadi bohlam ber-R terbesar paling terang pada seri, tetapi bohlam ber-R terkecil paling terang pada paralel.',
        'Melepas bohlam seri memutus satu-satunya lintasan dan menghentikan semua arus; melepas bohlam paralel tidak mengubah cabang yang lain.',
      ],
    },
    vocabulary: {
      en: [
        ['Voltage (V)', 'The electrical "push" between two points, measured in volts; the battery sets the total voltage available.'],
        ['Current (I)', 'The rate of flow of charge, in amperes (A); the sim shows milliamperes, 1 A = 1000 mA.'],
        ['Resistance (R)', 'How strongly a component opposes current, in ohms (Ω); higher R means less current for the same voltage.'],
        ['Ohm\'s law', 'V = I·R: the voltage across a resistor equals current times resistance.'],
        ['Series', 'Components connected end to end so that the same current passes through each in turn.'],
        ['Parallel', 'Components connected side by side between the same two points, so each has the same voltage.'],
        ['Power (P)', 'The rate at which a bulb converts electrical energy to light and heat, in watts: P = V·I.'],
        ['Open circuit', 'A broken path with infinite resistance; no current can flow.'],
      ],
      id: [
        ['Tegangan (V)', '"Dorongan" listrik antara dua titik, diukur dalam volt; baterai menentukan tegangan total yang tersedia.'],
        ['Arus (I)', 'Laju aliran muatan, dalam ampere (A); sim menampilkan miliampere, 1 A = 1000 mA.'],
        ['Hambatan (R)', 'Seberapa kuat suatu komponen melawan arus, dalam ohm (Ω); R lebih besar berarti arus lebih kecil pada tegangan yang sama.'],
        ['Hukum Ohm', 'V = I·R: tegangan pada resistor sama dengan arus kali hambatan.'],
        ['Seri', 'Komponen yang disambung ujung ke ujung sehingga arus yang sama melewati masing-masing secara bergiliran.'],
        ['Paralel', 'Komponen yang disambung berdampingan di antara dua titik yang sama, sehingga tegangannya sama.'],
        ['Daya (P)', 'Laju bohlam mengubah energi listrik menjadi cahaya dan panas, dalam watt: P = V·I.'],
        ['Rangkaian terbuka', 'Lintasan yang terputus dengan hambatan tak hingga; arus tidak bisa mengalir.'],
      ],
    },
    misconceptions: {
      en: [
        ['Current gets used up as it passes through each bulb, so the last bulb in series is dimmest.', 'Current is the same at every point in a series loop; charge is not consumed. What the bulbs use up is energy, which shows as a voltage drop across each one.'],
        ['The battery always pushes out the same current.', 'A battery sets the voltage; the circuit\'s resistance decides the current. The sim shows 200 mA for the default series circuit but 2200 mA for the same bulbs in parallel.'],
        ['Adding more bulbs always adds more resistance.', 'In series yes, but in parallel each new branch gives the current another route, so the total resistance falls and the battery supplies more current.'],
        ['The bulb with the highest resistance is always the dimmest.', 'In parallel it is, since P = V²/R with the same V. In series the current is the same for all, so P = I²·R makes the highest-resistance bulb the brightest.'],
      ],
      id: [
        ['Arus habis terpakai saat melewati tiap bohlam, jadi bohlam terakhir pada seri paling redup.', 'Arus sama di setiap titik pada rangkaian seri; muatan tidak dikonsumsi. Yang dipakai bohlam adalah energi, yang tampak sebagai penurunan tegangan pada masing-masing bohlam.'],
        ['Baterai selalu mengeluarkan arus yang sama.', 'Baterai menetapkan tegangan; hambatan rangkaianlah yang menentukan arus. Sim menampilkan 200 mA untuk rangkaian seri bawaan tetapi 2200 mA untuk bohlam yang sama dalam paralel.'],
        ['Menambah bohlam selalu menambah hambatan.', 'Pada seri ya, tetapi pada paralel setiap cabang baru memberi arus jalur tambahan, sehingga hambatan total turun dan baterai memasok arus lebih besar.'],
        ['Bohlam dengan hambatan tertinggi selalu paling redup.', 'Pada paralel memang demikian, karena P = V²/R dengan V yang sama. Pada seri arusnya sama untuk semua, sehingga P = I²·R membuat bohlam berhambatan tertinggi justru paling terang.'],
      ],
    },
    realWorld: {
      en: [
        'Old-style Christmas lights were wired in series, so one burnt-out bulb switched off the whole string; modern strings use parallel sections or bulbs with internal shunts.',
        'Household outlets are wired in parallel, which is why every appliance gets the same 230 V (or 120 V) and switching one off does not affect the others.',
        'A car\'s headlights are in parallel so that one failing does not darken the other, while the fuse protecting them is in series so it can cut the whole branch.',
        'Phone and laptop batteries combine cells in series to raise the voltage and in parallel to raise the current and capacity.',
      ],
      id: [
        'Lampu hias lama dirangkai seri, sehingga satu bohlam putus memadamkan seluruh untaian; untaian modern memakai bagian-bagian paralel atau bohlam dengan jalur pintas internal.',
        'Stopkontak rumah dirangkai paralel, sehingga setiap alat mendapat 220 V yang sama dan mematikan satu alat tidak memengaruhi yang lain.',
        'Lampu depan mobil dirangkai paralel agar satu yang rusak tidak memadamkan yang lain, sedangkan sekring pelindungnya dirangkai seri agar bisa memutus seluruh cabang.',
        'Baterai ponsel dan laptop menggabungkan sel secara seri untuk menaikkan tegangan dan secara paralel untuk menaikkan arus dan kapasitas.',
      ],
    },
    questions: {
      en: [
        { q: 'With the default series circuit (12 V; 10, 20 and 30 Ω), what current flows and what voltage does each bulb get?', a: 'R_total = 60 Ω, so I = 12 / 60 = 0.2 A = 200 mA. The voltages are I·R: 2 V, 4 V and 6 V, which add up to 12 V. The 30 Ω bulb gets the most voltage and the most power (1.2 W).' },
        { q: 'Switch the same three bulbs to parallel. Which bulb is brightest now, and what is the total current?', a: 'Each bulb has 12 V, so the currents are 1.2 A, 0.6 A and 0.4 A, total 2.2 A (2200 mA). The 10 Ω bulb draws the most current and has the most power, 14.4 W, so it is brightest; the order is reversed compared with series.' },
        { q: 'In series mode you toggle bulb 2 off and all three go dark, but in parallel mode only bulb 2 goes dark. Explain using the idea of a path for the current.', a: 'In series there is a single loop, so removing any bulb leaves a gap and no complete path: the current is zero everywhere. In parallel each bulb has its own branch across the battery, so removing one branch leaves the other two complete paths unchanged.' },
      ],
      id: [
        { q: 'Dengan rangkaian seri bawaan (12 V; 10, 20, dan 30 Ω), berapa arus yang mengalir dan berapa tegangan tiap bohlam?', a: 'R_total = 60 Ω, jadi I = 12 / 60 = 0,2 A = 200 mA. Tegangannya I·R: 2 V, 4 V, dan 6 V, yang berjumlah 12 V. Bohlam 30 Ω mendapat tegangan terbesar dan daya terbesar (1,2 W).' },
        { q: 'Ubah ketiga bohlam yang sama ke paralel. Bohlam mana yang paling terang sekarang, dan berapa arus totalnya?', a: 'Setiap bohlam mendapat 12 V, jadi arusnya 1,2 A, 0,6 A, dan 0,4 A, total 2,2 A (2200 mA). Bohlam 10 Ω menarik arus terbesar dan berdaya terbesar, 14,4 W, sehingga paling terang; urutannya terbalik dibandingkan seri.' },
        { q: 'Pada mode seri kamu mematikan bohlam 2 dan ketiganya padam, tetapi pada mode paralel hanya bohlam 2 yang padam. Jelaskan dengan gagasan lintasan arus.', a: 'Pada seri hanya ada satu lintasan, sehingga melepas bohlam mana pun meninggalkan celah dan tidak ada lintasan lengkap: arus nol di mana-mana. Pada paralel setiap bohlam punya cabang sendiri ke baterai, sehingga melepas satu cabang membiarkan dua lintasan lengkap lainnya tidak berubah.' },
      ],
    },
  },
};
