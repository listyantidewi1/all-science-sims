// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Read AND, OR, XOR, NAND, NOR, NOT truth tables.',
      'Compose gates to build half-adders and full-adders.',
      'Predict an output from inputs without running the simulator.',
    ],
    id: [
      'Membaca tabel kebenaran AND, OR, XOR, NAND, NOR, NOT.',
      'Menyusun gerbang menjadi half-adder dan full-adder.',
      'Memprediksi output dari input tanpa menjalankan simulasi.',
    ],
  },
  tryThis: {
    en: [
      'Build XOR using only AND, OR, and NOT.',
      'Toggle inputs in a half-adder — verify the truth table.',
      'Find an input combo that gives the same output for AND and XOR.',
    ],
    id: [
      'Buat XOR hanya dengan AND, OR, dan NOT.',
      'Gerakkan input pada half-adder — verifikasi tabel kebenarannya.',
      'Cari kombinasi input yang menghasilkan output sama untuk AND dan XOR.',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'Inside every computer, information is carried as bits: a wire is either at a high voltage, which we call 1 or true, or a low voltage, which we call 0 or false. A logic gate is a tiny circuit that reads one or two of these bits and produces a new bit according to a fixed rule. AND outputs 1 only when both inputs are 1. OR outputs 1 when at least one input is 1. XOR (exclusive or) outputs 1 when the inputs are different. NOT flips a single bit. NAND, NOR and XNOR are simply AND, OR and XOR followed by a NOT, which is why their symbols carry a small circle at the output.',
        'A truth table lists every possible combination of inputs together with the output for each. With two inputs there are four rows, with three inputs there are eight, because each new input doubles the number of combinations. In the simulation the switches on the left set the inputs, every wire turns green when it carries a 1 and gray when it carries a 0, and the row of the truth table that matches the current inputs is highlighted. The Cycle button steps through all the rows automatically so you can watch the table come alive.',
        'Gates become useful when you connect them. The half-adder adds two one-bit numbers: an XOR gate produces the Sum bit and an AND gate produces the Carry bit, so 1 + 1 gives Sum 0 and Carry 1, which is the binary number 10, that is, two. The full-adder adds a third input, the carry coming in from a previous column, using two XORs, two ANDs and an OR. Chaining full-adders side by side is exactly how a processor adds long binary numbers. In the half-adder you can swap the gate types, which lets you see how quickly the circuit stops adding correctly when the wrong gate is used.',
        'This is an idealised model. Real gates take a few billionths of a second to respond and can glitch while signals settle; here every output updates instantly. Real voltages are never perfectly 0 or 1, but the digital design treats anything below one threshold as 0 and anything above another as 1, which is what makes computers so reliable. The sim also fixes the wiring of each circuit, so you can choose gate types but not draw your own connections, and the NOT gate is not among the choices for the two-input gates.',
      ],
      id: [
        'Di dalam setiap komputer, informasi dibawa sebagai bit: sebuah kabel bertegangan tinggi, yang kita sebut 1 atau benar, atau bertegangan rendah, yang kita sebut 0 atau salah. Gerbang logika adalah rangkaian kecil yang membaca satu atau dua bit ini dan menghasilkan bit baru menurut aturan tetap. AND menghasilkan 1 hanya jika kedua input bernilai 1. OR menghasilkan 1 jika paling sedikit satu input bernilai 1. XOR (exclusive or) menghasilkan 1 jika kedua input berbeda. NOT membalik satu bit. NAND, NOR, dan XNOR hanyalah AND, OR, dan XOR yang diikuti NOT, itulah sebabnya simbolnya membawa lingkaran kecil di keluaran.',
        'Tabel kebenaran mendaftar semua kemungkinan kombinasi input beserta output untuk masing-masing. Dengan dua input ada empat baris, dengan tiga input ada delapan, karena setiap input baru melipatgandakan jumlah kombinasi. Dalam simulasi, sakelar di kiri mengatur input, setiap kabel menjadi hijau saat membawa 1 dan abu-abu saat membawa 0, dan baris tabel kebenaran yang cocok dengan input saat ini disorot. Tombol Cycle menelusuri semua baris secara otomatis sehingga kamu bisa melihat tabel itu hidup.',
        'Gerbang menjadi berguna ketika dihubungkan. Half-adder menjumlahkan dua bilangan satu bit: gerbang XOR menghasilkan bit Sum dan gerbang AND menghasilkan bit Carry, sehingga 1 + 1 memberi Sum 0 dan Carry 1, yaitu bilangan biner 10, atau dua. Full-adder menambahkan input ketiga, yaitu carry yang masuk dari kolom sebelumnya, dengan dua XOR, dua AND, dan satu OR. Merangkai full-adder berjajar adalah cara prosesor menjumlahkan bilangan biner yang panjang. Pada half-adder kamu bisa menukar jenis gerbangnya, sehingga terlihat betapa cepat rangkaian berhenti menjumlahkan dengan benar jika gerbang yang salah dipakai.',
        'Ini adalah model yang diidealkan. Gerbang sungguhan butuh beberapa miliar sepersekian detik untuk merespons dan bisa berkedip sesaat sementara sinyal menetap; di sini setiap output berubah seketika. Tegangan sungguhan tidak pernah tepat 0 atau 1, tetapi rancangan digital memperlakukan apa pun di bawah satu ambang sebagai 0 dan di atas ambang lain sebagai 1, dan itulah yang membuat komputer begitu andal. Simulasi juga mengunci pengkabelan setiap rangkaian, sehingga kamu bisa memilih jenis gerbang tetapi tidak menggambar sambungan sendiri, dan gerbang NOT tidak termasuk pilihan untuk gerbang dua input.',
      ],
    },
    figure: {
      caption: {
        en: 'A half-adder. XOR gives the Sum bit (1 when the inputs differ) and AND gives the Carry bit (1 only for 1 + 1). The table lists all four input combinations; the last row shows that 1 + 1 = 10 in binary.',
        id: 'Half-adder. XOR memberi bit Sum (1 jika input berbeda) dan AND memberi bit Carry (1 hanya untuk 1 + 1). Tabel mendaftar keempat kombinasi input; baris terakhir menunjukkan 1 + 1 = 10 dalam biner.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        const rows = [[0, 0, 0, 0], [0, 1, 1, 0], [1, 0, 1, 0], [1, 1, 0, 1]];
        const table = rows.map((r, i) => {
          const y = 110 + i * 22;
          return `<text x="238" y="${y}" text-anchor="middle">${r[0]}</text><text x="266" y="${y}" text-anchor="middle">${r[1]}</text><text x="300" y="${y}" text-anchor="middle" fill="${r[2] ? '#10b981' : 'currentColor'}" opacity="${r[2] ? 1 : 0.5}">${r[2]}</text><text x="338" y="${y}" text-anchor="middle" fill="${r[3] ? '#10b981' : 'currentColor'}" opacity="${r[3] ? 1 : 0.5}">${r[3]}</text>`;
        }).join('');
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Half-adder circuit and truth table', 'Rangkaian half-adder dan tabel kebenaran')}">
  <style>text{font:12px system-ui,sans-serif;fill:currentColor}.w{fill:none;stroke:currentColor;stroke-width:2}.b{fill:none;stroke:currentColor;stroke-width:1.5}.t{font-weight:700}.s{font-size:10px;opacity:.7}</style>
  <rect x="14" y="56" width="28" height="22" rx="4" fill="#3b82f6"/>
  <text x="28" y="72" text-anchor="middle" class="t" fill="#fff">A</text>
  <rect x="14" y="146" width="28" height="22" rx="4" fill="#3b82f6"/>
  <text x="28" y="162" text-anchor="middle" class="t" fill="#fff">B</text>
  <path d="M42 67 H74 V80 H100" class="w"/>
  <path d="M42 157 H74 V100 H100" class="w"/>
  <path d="M52 67 V170 H100" class="w"/>
  <path d="M64 157 V190 H100" class="w"/>
  <circle cx="52" cy="67" r="3" fill="currentColor"/>
  <circle cx="64" cy="157" r="3" fill="currentColor"/>
  <path d="M96 72 Q110 90 96 108 Q130 108 150 90 Q130 72 96 72 Z" class="b"/>
  <path d="M90 72 Q104 90 90 108" class="b"/>
  <text x="112" y="94" class="t" font-size="11">XOR</text>
  <path d="M100 162 V198 H126 A18 18 0 0 0 126 162 Z" class="b"/>
  <text x="106" y="184" class="t" font-size="11">AND</text>
  <path d="M150 90 H178" class="w" stroke="#10b981"/>
  <path d="M144 180 H178" class="w" stroke="#10b981"/>
  <text x="182" y="94" fill="#10b981" class="t">Sum</text>
  <text x="182" y="184" fill="#10b981" class="t">Carry</text>
  <text x="14" y="30" class="t">${L('Half-adder: A + B', 'Half-adder: A + B')}</text>
  <text x="238" y="86" text-anchor="middle" class="t">A</text>
  <text x="266" y="86" text-anchor="middle" class="t">B</text>
  <text x="300" y="86" text-anchor="middle" class="t" fill="#10b981">Sum</text>
  <text x="338" y="86" text-anchor="middle" class="t" fill="#10b981">Carry</text>
  <line x1="226" y1="92" x2="352" y2="92" stroke="currentColor" stroke-opacity=".5"/>
  ${table}
  <text x="226" y="216" class="s">${L('Sum = A XOR B,  Carry = A AND B', 'Sum = A XOR B,  Carry = A AND B')}</text>
  <text x="226" y="230" class="s">${L('row 4: 1 + 1 = 10 (two)', 'baris 4: 1 + 1 = 10 (dua)')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'A bit is either 0 or 1, and a logic gate turns one or two input bits into one output bit by a fixed rule.',
        'A truth table lists every input combination; each extra input doubles the number of rows.',
        'NAND, NOR and XNOR are AND, OR and XOR with the output inverted, shown by the small circle on the symbol.',
        'A half-adder uses XOR for the sum and AND for the carry; chaining full-adders is how computers add long numbers.',
        'Digital circuits are reliable because any voltage is read as simply 0 or 1, with nothing in between.',
      ],
      id: [
        'Bit bernilai 0 atau 1, dan gerbang logika mengubah satu atau dua bit input menjadi satu bit output menurut aturan tetap.',
        'Tabel kebenaran mendaftar setiap kombinasi input; setiap input tambahan melipatgandakan jumlah baris.',
        'NAND, NOR, dan XNOR adalah AND, OR, dan XOR dengan output dibalik, ditandai lingkaran kecil pada simbolnya.',
        'Half-adder memakai XOR untuk sum dan AND untuk carry; merangkai full-adder adalah cara komputer menjumlahkan bilangan panjang.',
        'Rangkaian digital andal karena tegangan apa pun dibaca hanya sebagai 0 atau 1, tanpa nilai di antaranya.',
      ],
    },
    vocabulary: {
      en: [
        ['Bit', 'The smallest unit of digital information, with exactly two values: 0 (false) and 1 (true).'],
        ['Logic gate', 'A circuit that produces one output bit from its input bits according to a fixed rule.'],
        ['Truth table', 'A table listing the output for every possible combination of inputs.'],
        ['XOR (exclusive or)', 'A gate whose output is 1 only when its two inputs are different.'],
        ['Inverter (NOT)', 'A gate with one input that outputs the opposite bit.'],
        ['Half-adder', 'A circuit that adds two bits, giving a Sum bit and a Carry bit.'],
        ['Full-adder', 'A circuit that adds two bits plus an incoming carry, giving Sum and Carry-out.'],
        ['Carry', 'The bit passed to the next column when a sum is too big for one digit, as in 1 + 1 = 10.'],
      ],
      id: [
        ['Bit', 'Satuan terkecil informasi digital, dengan tepat dua nilai: 0 (salah) dan 1 (benar).'],
        ['Gerbang logika', 'Rangkaian yang menghasilkan satu bit output dari bit-bit inputnya menurut aturan tetap.'],
        ['Tabel kebenaran', 'Tabel yang mendaftar output untuk setiap kombinasi input yang mungkin.'],
        ['XOR (exclusive or)', 'Gerbang yang outputnya 1 hanya jika kedua inputnya berbeda.'],
        ['Inverter (NOT)', 'Gerbang berinput satu yang menghasilkan bit kebalikannya.'],
        ['Half-adder', 'Rangkaian yang menjumlahkan dua bit, menghasilkan bit Sum dan bit Carry.'],
        ['Full-adder', 'Rangkaian yang menjumlahkan dua bit ditambah carry masuk, menghasilkan Sum dan Carry-out.'],
        ['Carry', 'Bit yang diteruskan ke kolom berikutnya ketika hasil jumlah terlalu besar untuk satu digit, seperti pada 1 + 1 = 10.'],
      ],
    },
    misconceptions: {
      en: [
        ['OR means one or the other, but not both.', 'In logic, OR is inclusive: it outputs 1 when either input or both inputs are 1. The "one but not both" meaning is a different gate, XOR.'],
        ['In the half-adder, 1 + 1 should give 2, so the sim is wrong when it shows Sum = 0.', 'The answer is two, written in binary as 10: the Sum bit is 0 and the Carry bit is 1. Read the two outputs together as a two-digit binary number.'],
        ['A NAND gate is the same thing as a NOT gate.', 'NAND has two inputs and outputs 0 only when both are 1. It equals a NOT gate only if you tie both inputs to the same signal.'],
        ['Wires in a circuit carry numbers like 0.5.', 'Each wire carries a single bit. A real voltage might be anywhere, but the gate reads it as either 0 or 1, which is why the wires here are only ever green or gray.'],
      ],
      id: [
        ['OR berarti salah satu, tetapi tidak keduanya.', 'Dalam logika, OR bersifat inklusif: outputnya 1 jika salah satu atau kedua input bernilai 1. Makna "salah satu tetapi tidak keduanya" adalah gerbang lain, yaitu XOR.'],
        ['Pada half-adder, 1 + 1 seharusnya 2, jadi simulasi salah saat menampilkan Sum = 0.', 'Jawabannya memang dua, ditulis dalam biner sebagai 10: bit Sum adalah 0 dan bit Carry adalah 1. Bacalah kedua output bersama sebagai bilangan biner dua digit.'],
        ['Gerbang NAND sama saja dengan gerbang NOT.', 'NAND berinput dua dan menghasilkan 0 hanya jika keduanya 1. Ia setara NOT hanya jika kedua inputnya diberi sinyal yang sama.'],
        ['Kabel dalam rangkaian membawa angka seperti 0,5.', 'Setiap kabel membawa satu bit. Tegangan sungguhan bisa berapa pun, tetapi gerbang membacanya sebagai 0 atau 1 saja; itulah sebabnya kabel di sini hanya pernah hijau atau abu-abu.'],
      ],
    },
    realWorld: {
      en: [
        'The arithmetic unit of a processor contains chains of full-adders, so every calculation your phone does begins with circuits like the ones here.',
        'A staircase light that can be switched from upstairs or downstairs behaves like an XOR gate: flipping either switch changes the light.',
        'Safety interlocks work like AND gates: a microwave only runs when the door is closed and the start button is pressed.',
        'NAND gates are called universal because any other gate can be built from them, which is why they are the basic building block of many chips, including NAND flash memory.',
      ],
      id: [
        'Unit aritmetika prosesor berisi rangkaian full-adder berantai, sehingga setiap perhitungan di ponselmu dimulai dari rangkaian seperti yang ada di sini.',
        'Lampu tangga yang bisa dinyalakan dari atas maupun bawah berperilaku seperti gerbang XOR: membalik salah satu sakelar mengubah keadaan lampu.',
        'Pengaman interlock bekerja seperti gerbang AND: microwave hanya menyala jika pintu tertutup dan tombol start ditekan.',
        'Gerbang NAND disebut universal karena semua gerbang lain bisa dibangun darinya, sehingga ia menjadi bahan dasar banyak cip, termasuk memori flash NAND.',
      ],
    },
    questions: {
      en: [
        { q: 'In the full-adder, set A = 1, B = 1 and Cin = 1. Predict Sum and Cout before clicking, and explain the result as a binary number.', a: 'Sum = 1 and Cout = 1. Three ones add up to three, which is 11 in binary. Following the circuit: A XOR B = 0, then 0 XOR Cin = 1 for the Sum; A AND B = 1, so the OR gate outputs 1 for Cout.' },
        { q: 'Which single two-input gate outputs 1 exactly when its two inputs are different, and which gate outputs 1 exactly when they are the same?', a: 'XOR outputs 1 when the inputs differ (rows 01 and 10). XNOR is its inverse and outputs 1 when they are the same (rows 00 and 11).' },
        { q: 'The half-adder truth table has 4 rows and the full-adder table has 8. How many rows would a circuit with 5 inputs need, and why?', a: '32 rows. Each input can be 0 or 1 independently, so every added input doubles the number of combinations: 2, 4, 8, 16, 32.' },
      ],
      id: [
        { q: 'Pada full-adder, atur A = 1, B = 1, dan Cin = 1. Prediksi Sum dan Cout sebelum mengklik, lalu jelaskan hasilnya sebagai bilangan biner.', a: 'Sum = 1 dan Cout = 1. Tiga buah satu berjumlah tiga, yaitu 11 dalam biner. Mengikuti rangkaian: A XOR B = 0, lalu 0 XOR Cin = 1 untuk Sum; A AND B = 1, sehingga gerbang OR menghasilkan 1 untuk Cout.' },
        { q: 'Gerbang dua input mana yang menghasilkan 1 tepat ketika kedua inputnya berbeda, dan gerbang mana yang menghasilkan 1 tepat ketika keduanya sama?', a: 'XOR menghasilkan 1 jika input berbeda (baris 01 dan 10). XNOR adalah kebalikannya dan menghasilkan 1 jika keduanya sama (baris 00 dan 11).' },
        { q: 'Tabel kebenaran half-adder punya 4 baris dan tabel full-adder punya 8. Berapa baris yang dibutuhkan rangkaian dengan 5 input, dan mengapa?', a: '32 baris. Setiap input bisa 0 atau 1 secara bebas, sehingga setiap input tambahan melipatgandakan jumlah kombinasi: 2, 4, 8, 16, 32.' },
      ],
    },
  },
};
