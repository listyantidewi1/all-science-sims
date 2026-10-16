// Long-form text for the sim page aside, kept out of manifest.js.
export default {
  objectives: {
    en: [
      'Place positive and negative integers on a number line and compare them (−7 is less than −2 because it is further left).',
      'Add and subtract integers using the walker rule: add = keep facing, subtract = turn around, negative number = walk backwards.',
      'Explain the sign rules for multiplying integers (same signs give a positive product, different signs give a negative product) as repeated jumps.',
    ],
    id: [
      'Meletakkan bilangan bulat positif dan negatif pada garis bilangan dan membandingkannya (−7 lebih kecil dari −2 karena letaknya lebih ke kiri).',
      'Menjumlahkan dan mengurangkan bilangan bulat dengan aturan pejalan: tambah = tetap menghadap, kurang = berbalik arah, bilangan negatif = berjalan mundur.',
      'Menjelaskan aturan tanda pada perkalian bilangan bulat (tanda sama hasilnya positif, tanda berbeda hasilnya negatif) sebagai lompatan berulang.',
    ],
  },
  tryThis: {
    en: [
      'Set a = 3, choose −, set b = −5 and press Go. Where does the walker end? Now compute 3 + 5. Why are the answers the same?',
      'Switch the view to Thermometer. Start at −4 °C and add 9. What is the new temperature? Then start at 2 °C and subtract 6.',
      'Switch to Bank balance. Start at −5 (a debt of 5 coins) and subtract −5. Why does "taking away a debt" make you richer?',
      'In Multiply mode set a = −3 and b = −2. Watch the turn-around and the jumps, then predict (−3) × 2 before trying it.',
    ],
    id: [
      'Atur a = 3, pilih −, atur b = −5 lalu tekan Jalan. Di mana si pejalan berhenti? Sekarang hitung 3 + 5. Mengapa hasilnya sama?',
      'Ganti tampilan ke Termometer. Mulai dari −4 °C dan tambahkan 9. Berapa suhu barunya? Lalu mulai dari 2 °C dan kurangi 6.',
      'Ganti ke Saldo bank. Mulai dari −5 (utang 5 koin) dan kurangi −5. Mengapa "mengambil utang" membuatmu lebih kaya?',
      'Pada mode Kali atur a = −3 dan b = −2. Perhatikan putar balik dan lompatannya, lalu tebak (−3) × 2 sebelum mencobanya.',
    ],
  },

  // "Learn" section: the mathematics behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'Integers are the whole numbers together with their negatives: …, −3, −2, −1, 0, 1, 2, 3, …. On a number line the negatives sit to the left of zero and the positives to the right. Moving right always makes a number bigger, so −2 is greater than −7 even though 7 is greater than 2. Zero is neither positive nor negative. Negative numbers describe quantities that go "below" a natural starting point: temperatures below freezing, floors below ground level, a bank balance that has gone into debt, or heights below sea level.',
        'The walker in this sim turns the rules for adding and subtracting into movements. The walker begins at the first number facing right (the positive direction). The operation decides which way to face: adding keeps the walker facing right, subtracting makes it turn around. The sign of the second number decides how to move: a positive number means walk forwards, a negative number means walk backwards. So 3 − (−5) means start at 3, turn around to face left, then walk 5 steps backwards — which carries the walker to the right, ending at 8. That is exactly why subtracting a negative is the same as adding its opposite: 3 − (−5) = 3 + 5.',
        'The thermometer and bank-balance views give the same moves a real-world meaning. On the thermometer, adding 9 to −4 °C means the temperature rises nine degrees to 5 °C. In the bank, a balance of −5 means you owe five coins; subtracting a debt of 5 (removing it) leaves you at 0, which is why "taking away a negative" makes the number larger.',
        'Multiplication is repeated addition, so 3 × 2 is two jumps of size 3 starting at 0. If the jump size is negative, each jump goes left: (−3) × 2 = −6. If the number of jumps is negative, the walker turns around before jumping, so (−3) × (−2) is two jumps of size 3 to the left, taken while facing left — which moves the walker right to +6. Two sign changes cancel out, which is the real reason behind the rule "negative times negative is positive".',
      ],
      id: [
        'Bilangan bulat adalah bilangan cacah bersama lawannya: …, −3, −2, −1, 0, 1, 2, 3, …. Pada garis bilangan, bilangan negatif berada di kiri nol dan bilangan positif di kanan. Bergerak ke kanan selalu membuat bilangan lebih besar, jadi −2 lebih besar dari −7 walaupun 7 lebih besar dari 2. Nol bukan positif maupun negatif. Bilangan negatif menggambarkan besaran yang berada "di bawah" titik awal yang wajar: suhu di bawah titik beku, lantai di bawah tanah, saldo bank yang berutang, atau ketinggian di bawah permukaan laut.',
        'Si pejalan dalam simulasi ini mengubah aturan penjumlahan dan pengurangan menjadi gerakan. Pejalan mulai di bilangan pertama sambil menghadap kanan (arah positif). Operasi menentukan arah hadap: menjumlahkan membuat pejalan tetap menghadap kanan, mengurangkan membuatnya berbalik. Tanda bilangan kedua menentukan cara bergerak: bilangan positif berarti maju, bilangan negatif berarti mundur. Jadi 3 − (−5) berarti mulai di 3, berbalik menghadap kiri, lalu mundur 5 langkah — yang membawa pejalan ke kanan dan berakhir di 8. Itulah sebabnya mengurangkan bilangan negatif sama dengan menjumlahkan lawannya: 3 − (−5) = 3 + 5.',
        'Tampilan termometer dan saldo bank memberi makna nyata pada gerakan yang sama. Pada termometer, menambahkan 9 pada −4 °C berarti suhu naik sembilan derajat menjadi 5 °C. Di bank, saldo −5 berarti kamu berutang lima koin; mengurangkan utang 5 (menghapusnya) membuat saldo menjadi 0, dan itulah mengapa "mengambil bilangan negatif" membuat bilangan menjadi lebih besar.',
        'Perkalian adalah penjumlahan berulang, jadi 3 × 2 adalah dua lompatan sepanjang 3 mulai dari 0. Jika panjang lompatan negatif, setiap lompatan menuju kiri: (−3) × 2 = −6. Jika banyak lompatan negatif, pejalan berbalik dulu sebelum melompat, sehingga (−3) × (−2) adalah dua lompatan sepanjang 3 ke kiri yang dilakukan sambil menghadap kiri — dan pejalan justru bergerak ke kanan sampai +6. Dua pembalikan tanda saling meniadakan, dan itulah alasan sebenarnya di balik aturan "negatif kali negatif sama dengan positif".',
      ],
    },
    figure: {
      caption: {
        en: 'Top: 3 − (−5) on the number line. The walker starts at 3, turns to face left (subtract), then walks 5 steps backwards and lands on 8. Bottom: (−3) × (−2) as two jumps of size 3; the negative number of jumps reverses the direction, so the walker ends at +6.',
        id: 'Atas: 3 − (−5) pada garis bilangan. Pejalan mulai di 3, berbalik menghadap kiri (kurang), lalu mundur 5 langkah dan mendarat di 8. Bawah: (−3) × (−2) sebagai dua lompatan sepanjang 3; banyak lompatan yang negatif membalik arah, sehingga pejalan berakhir di +6.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        const x = (v) => 180 + v * 15; // −10..10 → 30..330
        let ticks = '';
        for (let v = -10; v <= 10; v++) {
          const major = v % 5 === 0;
          ticks += `<line x1="${x(v)}" y1="${major ? 74 : 77}" x2="${x(v)}" y2="${major ? 86 : 83}" class="t"/>`;
          ticks += `<line x1="${x(v)}" y1="${major ? 184 : 187}" x2="${x(v)}" y2="${major ? 196 : 193}" class="t"/>`;
          if (major) ticks += `<text x="${x(v)}" y="100" text-anchor="middle">${v < 0 ? '−' + (-v) : v}</text><text x="${x(v)}" y="210" text-anchor="middle">${v < 0 ? '−' + (-v) : v}</text>`;
        }
        const hops = (y, from, size, n) => {
          let s = '';
          for (let k = 0; k < n; k++) {
            const a = x(from + k * size), b = x(from + (k + 1) * size), r = Math.abs(b - a) / 2;
            s += `<path d="M${a} ${y} A${r} ${r} 0 0 1 ${b} ${y}" class="h"/>`;
          }
          return s;
        };
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Walker model for subtracting a negative and for multiplying two negatives', 'Model pejalan untuk mengurangkan bilangan negatif dan mengalikan dua bilangan negatif')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.b{font:bold 12px system-ui,sans-serif;fill:currentColor}.t{stroke:currentColor;stroke-width:1;opacity:.7}.ax{stroke:currentColor;stroke-width:1.6}.h{fill:none;stroke:#34d399;stroke-width:2}</style>
  <text x="12" y="18" class="b">3 − (−5) = 8</text>
  <text x="12" y="34">${L('start at 3 · turn around · walk 5 backwards', 'mulai di 3 · berbalik · mundur 5 langkah')}</text>
  <line x1="22" y1="80" x2="338" y2="80" class="ax"/>
  <line x1="22" y1="190" x2="338" y2="190" class="ax"/>
  ${ticks}
  ${hops(78, 3, 1, 5)}
  <circle cx="${x(3)}" cy="60" r="5" fill="#fde68a"/>
  <path d="M${x(3) - 10} 50 L${x(3) - 22} 50 M${x(3) - 22} 50 L${x(3) - 17} 46 M${x(3) - 22} 50 L${x(3) - 17} 54" stroke="#f472b6" stroke-width="2" fill="none"/>
  <text x="${x(3) - 26}" y="54" text-anchor="end" fill="#f472b6">${L('faces left', 'menghadap kiri')}</text>
  <circle cx="${x(8)}" cy="78" r="4" fill="#34d399"/>
  <text x="${x(8)}" y="68" text-anchor="middle" fill="#34d399">8</text>
  <text x="12" y="128" class="b">(−3) × (−2) = 6</text>
  <text x="12" y="144">${L('from 0 · jump size 3 left · negative count: turn around · 2 jumps', 'dari 0 · lompatan 3 ke kiri · banyaknya negatif: berbalik · 2 lompatan')}</text>
  ${hops(188, 0, 3, 2)}
  <circle cx="${x(0)}" cy="170" r="5" fill="#fde68a"/>
  <circle cx="${x(6)}" cy="188" r="4" fill="#34d399"/>
  <text x="${x(6)}" y="178" text-anchor="middle" fill="#34d399">+6</text>
  <text x="180" y="232" text-anchor="middle">${L('two sign reversals cancel: the walker ends on the right', 'dua pembalikan tanda saling meniadakan: pejalan berakhir di kanan')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'On a number line, further right always means greater: −1 > −9, and every negative number is less than every positive number.',
        'Each integer has an opposite (additive inverse): 5 and −5 are the same distance from 0 and add to 0.',
        'Subtracting a number is the same as adding its opposite: a − b = a + (−b). Subtracting a negative therefore adds.',
        'The sign rule for multiplication: (+)(+) = +, (−)(−) = +, (+)(−) = −, (−)(+) = −. Two reversals cancel.',
        'Absolute value |a| is the distance from 0, so |−7| = 7. It tells you how many steps, not which way.',
      ],
      id: [
        'Pada garis bilangan, lebih ke kanan selalu berarti lebih besar: −1 > −9, dan setiap bilangan negatif lebih kecil dari setiap bilangan positif.',
        'Setiap bilangan bulat mempunyai lawan (invers penjumlahan): 5 dan −5 berjarak sama dari 0 dan jumlahnya 0.',
        'Mengurangkan suatu bilangan sama dengan menjumlahkan lawannya: a − b = a + (−b). Karena itu mengurangkan bilangan negatif berarti menambah.',
        'Aturan tanda perkalian: (+)(+) = +, (−)(−) = +, (+)(−) = −, (−)(+) = −. Dua pembalikan saling meniadakan.',
        'Nilai mutlak |a| adalah jarak dari 0, jadi |−7| = 7. Ia menyatakan banyaknya langkah, bukan arahnya.',
      ],
    },
    vocabulary: {
      en: [
        ['Integer', 'A whole number that can be positive, negative or zero: …, −2, −1, 0, 1, 2, ….'],
        ['Negative number', 'A number less than zero, written with a minus sign and placed to the left of 0 on the number line.'],
        ['Opposite (additive inverse)', 'The number the same distance from 0 on the other side; the opposite of 4 is −4, and 4 + (−4) = 0.'],
        ['Absolute value', 'The distance of a number from 0, ignoring its sign, written |a|; |−6| = 6.'],
        ['Number line', 'A straight line with 0 in the middle, positive numbers to the right and negative numbers to the left, equally spaced.'],
      ],
      id: [
        ['Bilangan bulat', 'Bilangan utuh yang bisa positif, negatif atau nol: …, −2, −1, 0, 1, 2, ….'],
        ['Bilangan negatif', 'Bilangan yang kurang dari nol, ditulis dengan tanda minus dan terletak di kiri 0 pada garis bilangan.'],
        ['Lawan (invers penjumlahan)', 'Bilangan yang berjarak sama dari 0 di sisi seberang; lawan dari 4 adalah −4, dan 4 + (−4) = 0.'],
        ['Nilai mutlak', 'Jarak suatu bilangan dari 0 tanpa memperhatikan tandanya, ditulis |a|; |−6| = 6.'],
        ['Garis bilangan', 'Garis lurus dengan 0 di tengah, bilangan positif di kanan dan bilangan negatif di kiri, dengan jarak yang sama.'],
      ],
    },
    misconceptions: {
      en: [
        ['−8 is bigger than −3 because 8 is bigger than 3.', 'Further left is smaller. −8 °C is colder than −3 °C and a debt of 8 is worse than a debt of 3, so −8 < −3.'],
        ['Subtracting always makes a number smaller.', 'Only when you subtract a positive number. 3 − (−5) = 8: taking away a debt or a cold spell leaves you higher than before.'],
        ['Two negatives always make a positive.', 'True for multiplying and dividing, not for adding: (−3) + (−5) = −8, which is still negative. Only subtracting a negative turns into adding.'],
        ['The minus sign in −5 and the subtraction sign in 7 − 5 are different things that cannot mix.', 'They are closely related: −5 is "the opposite of 5", and subtracting 5 means adding the opposite of 5. That is why a − b = a + (−b).'],
      ],
      id: [
        ['−8 lebih besar dari −3 karena 8 lebih besar dari 3.', 'Lebih ke kiri berarti lebih kecil. −8 °C lebih dingin dari −3 °C dan utang 8 lebih berat dari utang 3, jadi −8 < −3.'],
        ['Mengurangkan selalu membuat bilangan lebih kecil.', 'Hanya jika yang dikurangkan bilangan positif. 3 − (−5) = 8: menghapus utang atau menghilangkan hawa dingin membuatmu berada lebih tinggi dari sebelumnya.'],
        ['Dua negatif selalu menjadi positif.', 'Benar untuk perkalian dan pembagian, tidak untuk penjumlahan: (−3) + (−5) = −8, tetap negatif. Hanya mengurangkan bilangan negatif yang berubah menjadi menambah.'],
        ['Tanda minus pada −5 dan tanda kurang pada 7 − 5 adalah hal yang berbeda dan tidak boleh dicampur.', 'Keduanya sangat berkaitan: −5 adalah "lawan dari 5", dan mengurangkan 5 berarti menjumlahkan lawan dari 5. Itulah sebabnya a − b = a + (−b).'],
      ],
    },
    realWorld: {
      en: [
        'Weather reports: a night at −6 °C that warms by 10 °C reaches 4 °C; the change is an addition on the thermometer scale.',
        'Bank accounts and e-wallets: an overdrawn balance is negative, and paying off a debt (subtracting a negative) raises the balance.',
        'Elevators and buildings: basement levels are −1, −2 and so on; going from floor −2 to floor 3 is a change of 5 floors.',
        'Geography: the Dead Sea shore is about −430 m (below sea level), while Mount Everest is about +8849 m.',
        'Sports and games: golf scores under par and points lost in a quiz are recorded as negative numbers and added up like any other.',
      ],
      id: [
        'Laporan cuaca: malam bersuhu −6 °C yang menghangat 10 °C mencapai 4 °C; perubahan itu adalah penjumlahan pada skala termometer.',
        'Rekening bank dan dompet digital: saldo yang tertarik berlebih bernilai negatif, dan melunasi utang (mengurangkan bilangan negatif) menaikkan saldo.',
        'Lift dan gedung: lantai bawah tanah bernomor −1, −2 dan seterusnya; naik dari lantai −2 ke lantai 3 adalah perubahan 5 lantai.',
        'Geografi: tepi Laut Mati berada sekitar −430 m (di bawah permukaan laut), sedangkan Gunung Everest sekitar +8849 m.',
        'Olahraga dan permainan: skor golf di bawah par dan poin yang hilang dalam kuis dicatat sebagai bilangan negatif dan dijumlahkan seperti bilangan lain.',
      ],
    },
    questions: {
      en: [
        { q: 'The walker starts at −4, you choose subtract and b = −6. Describe the moves and give the answer.', a: 'Start at −4 facing right. Subtract: turn around to face left. −6 is negative: walk 6 steps backwards, which moves the walker to the right. It lands on 2, so −4 − (−6) = 2.' },
        { q: 'A diver is at −12 m and rises 7 m. Write the calculation and the new depth. Then explain what −12 + (−7) would mean instead.', a: '−12 + 7 = −5, so the diver is 5 m below the surface. −12 + (−7) = −19 would mean diving 7 m deeper.' },
        { q: 'Use the jump model to explain why (−4) × 3 = −12 but (−4) × (−3) = +12.', a: 'Both use three jumps of size 4 going left (because −4 is negative). For 3 jumps the walker faces right and lands on −12. For −3 jumps the walker turns around first; jumping "left" while facing left actually moves right, so it lands on +12.' },
      ],
      id: [
        { q: 'Pejalan mulai di −4, kamu memilih kurang dan b = −6. Uraikan gerakannya dan berikan hasilnya.', a: 'Mulai di −4 menghadap kanan. Kurang: berbalik menghadap kiri. −6 negatif: mundur 6 langkah, yang menggerakkan pejalan ke kanan. Ia mendarat di 2, jadi −4 − (−6) = 2.' },
        { q: 'Seorang penyelam berada di −12 m lalu naik 7 m. Tulis perhitungannya dan kedalaman barunya. Lalu jelaskan arti −12 + (−7).', a: '−12 + 7 = −5, jadi penyelam berada 5 m di bawah permukaan. −12 + (−7) = −19 berarti menyelam 7 m lebih dalam.' },
        { q: 'Gunakan model lompatan untuk menjelaskan mengapa (−4) × 3 = −12 tetapi (−4) × (−3) = +12.', a: 'Keduanya memakai tiga lompatan sepanjang 4 ke kiri (karena −4 negatif). Untuk 3 lompatan pejalan menghadap kanan dan mendarat di −12. Untuk −3 lompatan pejalan berbalik dulu; melompat "ke kiri" sambil menghadap kiri justru bergerak ke kanan, sehingga mendarat di +12.' },
      ],
    },
  },
};
