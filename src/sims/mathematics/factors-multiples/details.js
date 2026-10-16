// Long-form text for the Factors and Multiples sim (grades 5-6).
export default {
  objectives: {
    en: [
      'List the multiples of a number and find the lowest common multiple (LCM, KPK) of two numbers from a number strip.',
      'List all the factors of a number and find the greatest common divisor (GCD, FPB) of two numbers from their shared factors.',
      'Break a number into prime factors with a factor tree.',
    ],
    id: [
      'Menyebutkan kelipatan sebuah bilangan dan menentukan kelipatan persekutuan terkecil (KPK) dua bilangan dari pita bilangan.',
      'Menyebutkan semua faktor sebuah bilangan dan menentukan faktor persekutuan terbesar (FPB) dua bilangan dari faktor yang sama.',
      'Menguraikan bilangan menjadi faktor prima dengan pohon faktor.',
    ],
  },
  tryThis: {
    en: [
      'Set the numbers to 4 and 6. Read the blue numbers, then the orange ones. Which number is the first to glow green?',
      'Set 5 and 7. Why is the GCD only 1? Where is the first green number?',
      'Set 12 and 24. Now one number is a multiple of the other. What are the GCD and LCM?',
      'Look at the two factor trees for 12 and 18. Which primes appear in both? Multiply them: do you get the GCD?',
    ],
    id: [
      'Atur bilangan ke 4 dan 6. Baca bilangan biru, lalu yang jingga. Bilangan mana yang pertama menyala hijau?',
      'Atur 5 dan 7. Mengapa FPB-nya hanya 1? Di mana bilangan hijau pertama?',
      'Atur 12 dan 24. Sekarang satu bilangan adalah kelipatan bilangan lainnya. Berapa FPB dan KPK-nya?',
      'Lihat kedua pohon faktor untuk 12 dan 18. Bilangan prima mana yang muncul di keduanya? Kalikan: apakah hasilnya FPB?',
    ],
  },

  learn: {
    background: {
      en: [
        'The multiples of a number are what you get when you count in steps of that number: the multiples of 4 are 4, 8, 12, 16, 20, 24 and so on, for ever. On the number strip the multiples of the first number are blue and the multiples of the second are orange. Some numbers are in both lists; these common multiples glow green. The first green number is the lowest common multiple, or LCM (in Indonesian, KPK). For 4 and 6 the LCM is 12.',
        'The factors of a number are the numbers that divide it exactly, with nothing left over. The factors of 12 are 1, 2, 3, 4, 6 and 12, because 12 can be shared equally into that many groups. Every number has 1 and itself as factors. Below the strip, the sim shows the factors of each number as tiles. Tiles that appear in both rows are common factors and turn green. The biggest green tile is the greatest common divisor, or GCD (in Indonesian, FPB). For 12 and 18 the common factors are 1, 2, 3 and 6, so the GCD is 6.',
        'A prime number has exactly two factors: 1 and itself. 2, 3, 5, 7, 11 and 13 are primes. Every other number bigger than 1 can be built by multiplying primes together, and the factor tree shows how: 12 splits into 2 × 6, and 6 splits into 2 × 3, so 12 = 2 × 2 × 3. The GCD is made from the primes the two trees share, and the LCM is made from all the primes of both trees, counted the most times they appear in either one.',
        'There is a neat check: first number × second number is always equal to GCD × LCM. For 6 and 8, 6 × 8 = 48 and 2 × 24 = 48. When the two numbers share no factor except 1, like 5 and 7, the GCD is 1 and the LCM is simply their product, 35. When one number is a multiple of the other, like 12 and 24, the smaller is the GCD and the larger is the LCM.',
      ],
      id: [
        'Kelipatan sebuah bilangan adalah hasil berhitung loncat dengan bilangan itu: kelipatan 4 adalah 4, 8, 12, 16, 20, 24 dan seterusnya, tanpa henti. Pada pita bilangan, kelipatan bilangan pertama berwarna biru dan kelipatan bilangan kedua berwarna jingga. Beberapa bilangan ada di kedua daftar; kelipatan persekutuan ini menyala hijau. Bilangan hijau yang pertama adalah kelipatan persekutuan terkecil, atau KPK. Untuk 4 dan 6, KPK-nya 12.',
        'Faktor sebuah bilangan adalah bilangan yang membaginya habis, tanpa sisa. Faktor dari 12 adalah 1, 2, 3, 4, 6 dan 12, karena 12 bisa dibagi rata ke dalam sebanyak itu kelompok. Setiap bilangan punya faktor 1 dan dirinya sendiri. Di bawah pita, simulasi menunjukkan faktor tiap bilangan sebagai ubin. Ubin yang muncul di kedua baris adalah faktor persekutuan dan berubah hijau. Ubin hijau terbesar adalah faktor persekutuan terbesar, atau FPB. Untuk 12 dan 18, faktor persekutuannya 1, 2, 3 dan 6, jadi FPB-nya 6.',
        'Bilangan prima punya tepat dua faktor: 1 dan dirinya sendiri. 2, 3, 5, 7, 11 dan 13 adalah bilangan prima. Setiap bilangan lain yang lebih dari 1 bisa dibentuk dengan mengalikan bilangan-bilangan prima, dan pohon faktor menunjukkan caranya: 12 dipecah menjadi 2 × 6, dan 6 dipecah menjadi 2 × 3, jadi 12 = 2 × 2 × 3. FPB dibentuk dari bilangan prima yang dimiliki kedua pohon, dan KPK dibentuk dari semua bilangan prima di kedua pohon, diambil sebanyak kemunculan terbanyaknya di salah satu pohon.',
        'Ada pemeriksaan yang rapi: bilangan pertama × bilangan kedua selalu sama dengan FPB × KPK. Untuk 6 dan 8, 6 × 8 = 48 dan 2 × 24 = 48. Jika kedua bilangan tidak punya faktor yang sama selain 1, seperti 5 dan 7, FPB-nya 1 dan KPK-nya adalah hasil kalinya, 35. Jika satu bilangan adalah kelipatan bilangan lainnya, seperti 12 dan 24, yang kecil adalah FPB dan yang besar adalah KPK.',
      ],
    },
    figure: {
      caption: {
        en: 'Top: the multiples of 4 (blue) and 6 (orange) on a strip from 1 to 24; 12 and 24 are in both lists, and 12, the first one, is the LCM. Bottom: the factors of 12 and 18; the shared factors are green and the biggest, 6, is the GCD.',
        id: 'Atas: kelipatan 4 (biru) dan 6 (jingga) pada pita 1 sampai 24; 12 dan 24 ada di kedua daftar, dan 12, yang pertama, adalah KPK. Bawah: faktor dari 12 dan 18; faktor yang sama berwarna hijau dan yang terbesar, 6, adalah FPB.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        let strip = '';
        const cw = 26, x0 = 24, y0 = 30;
        for (let n = 1; n <= 24; n++) {
          const c = (n - 1) % 12, r = Math.floor((n - 1) / 12);
          const x = x0 + c * cw, y = y0 + r * cw;
          const a = n % 4 === 0, b = n % 6 === 0;
          const fill = a && b ? '#34d399' : a ? '#38bdf8' : b ? '#fb923c' : 'none';
          const tc = fill === 'none' ? 'currentColor' : '#0b1220';
          strip += `<rect x="${x + 1}" y="${y + 1}" width="${cw - 2}" height="${cw - 2}" rx="3" fill="${fill}" stroke="currentColor" stroke-width=".6" opacity="${fill === 'none' ? 0.5 : 1}"/>`;
          strip += `<text x="${x + cw / 2}" y="${y + cw / 2 + 4}" class="n" style="fill:${tc}">${n}</text>`;
          if (n === 12) strip += `<rect x="${x - 1}" y="${y - 1}" width="${cw + 2}" height="${cw + 2}" rx="4" fill="none" stroke="#facc15" stroke-width="2.5"/>`;
        }
        const tiles = (list, common, g, y, color) => list.map((f, i) => {
          const x = 110 + i * 30;
          const isC = common.includes(f);
          return `<rect x="${x}" y="${y}" width="26" height="20" rx="4" fill="${isC ? '#34d399' : 'none'}" stroke="${f === g ? '#facc15' : color}" stroke-width="${f === g ? 2.5 : 1.2}"/><text x="${x + 13}" y="${y + 14}" class="n" style="fill:${isC ? '#0b1220' : 'currentColor'}">${f}</text>`;
        }).join('');
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Multiples of 4 and 6 on a number strip, and the factors of 12 and 18', 'Kelipatan 4 dan 6 pada pita bilangan, dan faktor dari 12 dan 18')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.n{font:bold 10px system-ui,sans-serif;text-anchor:middle}.t{font:bold 11px system-ui,sans-serif;fill:currentColor}</style>
  <rect x="24" y="8" width="10" height="10" fill="#38bdf8"/><text x="38" y="17">${L('multiples of 4', 'kelipatan 4')}</text>
  <rect x="130" y="8" width="10" height="10" fill="#fb923c"/><text x="144" y="17">${L('multiples of 6', 'kelipatan 6')}</text>
  <rect x="236" y="8" width="10" height="10" fill="#34d399"/><text x="250" y="17">${L('both', 'keduanya')}</text>
  ${strip}
  <text x="180" y="100" class="n" style="fill:#facc15;font-size:11px">${L('first number in both: 12 = LCM (KPK)', 'bilangan pertama di keduanya: 12 = KPK')}</text>
  <text x="24" y="138" class="t" style="fill:#38bdf8">${L('factors of 12', 'faktor 12')}</text>
  ${tiles([1, 2, 3, 4, 6, 12], [1, 2, 3, 6], 6, 124, '#38bdf8')}
  <text x="24" y="172" class="t" style="fill:#fb923c">${L('factors of 18', 'faktor 18')}</text>
  ${tiles([1, 2, 3, 6, 9, 18], [1, 2, 3, 6], 6, 158, '#fb923c')}
  <text x="180" y="206" class="n" style="fill:#facc15;font-size:11px">${L('biggest shared factor: 6 = GCD (FPB)', 'faktor persekutuan terbesar: 6 = FPB')}</text>
  <text x="180" y="226" class="n" style="fill:currentColor;font-size:10px">${L('check: 12 × 18 = 216 = 6 × 36 = GCD × LCM', 'cek: 12 × 18 = 216 = 6 × 36 = FPB × KPK')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Multiples of a number go on for ever: 4, 8, 12, 16, …',
        'The LCM (KPK) is the smallest number that is a multiple of both numbers.',
        'Factors divide a number exactly. Every number has 1 and itself as factors.',
        'The GCD (FPB) is the largest factor that both numbers share.',
        'A prime has exactly two factors. A factor tree breaks any number into primes.',
        'First number × second number = GCD × LCM.',
      ],
      id: [
        'Kelipatan sebuah bilangan tidak ada habisnya: 4, 8, 12, 16, …',
        'KPK adalah bilangan terkecil yang merupakan kelipatan kedua bilangan.',
        'Faktor membagi bilangan tanpa sisa. Setiap bilangan punya faktor 1 dan dirinya sendiri.',
        'FPB adalah faktor terbesar yang dimiliki kedua bilangan.',
        'Bilangan prima punya tepat dua faktor. Pohon faktor memecah bilangan apa pun menjadi bilangan prima.',
        'Bilangan pertama × bilangan kedua = FPB × KPK.',
      ],
    },
    vocabulary: {
      en: [
        ['Multiple', 'A number you reach by counting in steps of another number. 12 is a multiple of 4.'],
        ['Factor', 'A number that divides another number exactly. 4 is a factor of 12.'],
        ['LCM (KPK)', 'Lowest common multiple: the smallest number that is a multiple of both numbers.'],
        ['GCD (FPB)', 'Greatest common divisor: the biggest number that is a factor of both numbers.'],
        ['Prime number', 'A number bigger than 1 whose only factors are 1 and itself, such as 2, 3, 5, 7.'],
        ['Factor tree', 'A picture that splits a number into two factors again and again until only primes are left.'],
      ],
      id: [
        ['Kelipatan', 'Bilangan yang dicapai dengan berhitung loncat memakai bilangan lain. 12 adalah kelipatan 4.'],
        ['Faktor', 'Bilangan yang membagi bilangan lain tanpa sisa. 4 adalah faktor dari 12.'],
        ['KPK', 'Kelipatan persekutuan terkecil: bilangan terkecil yang merupakan kelipatan kedua bilangan.'],
        ['FPB', 'Faktor persekutuan terbesar: bilangan terbesar yang merupakan faktor kedua bilangan.'],
        ['Bilangan prima', 'Bilangan lebih dari 1 yang faktornya hanya 1 dan dirinya sendiri, seperti 2, 3, 5, 7.'],
        ['Pohon faktor', 'Gambar yang memecah bilangan menjadi dua faktor berulang-ulang sampai tersisa bilangan prima saja.'],
      ],
    },
    misconceptions: {
      en: [
        ['The LCM of two numbers is just the two numbers multiplied together.', 'Only when they share no factor except 1. For 4 and 6 the product is 24, but 12 is already a multiple of both, so the LCM is 12.'],
        ['Factors and multiples are the same thing.', 'They are opposites. The factors of 12 are small numbers that divide it (1, 2, 3, 4, 6, 12). The multiples of 12 are big numbers it divides into (12, 24, 36, …).'],
        ['1 is a prime number.', 'No. A prime needs exactly two factors, but 1 has only one factor, itself. The smallest prime is 2.'],
        ['Two numbers always share a factor bigger than 1.', 'Not always. 5 and 7, or 8 and 9, share only the factor 1. Their GCD is 1.'],
      ],
      id: [
        ['KPK dua bilangan adalah hasil kali kedua bilangan itu.', 'Hanya jika keduanya tidak punya faktor yang sama selain 1. Untuk 4 dan 6 hasil kalinya 24, tetapi 12 sudah merupakan kelipatan keduanya, jadi KPK-nya 12.'],
        ['Faktor dan kelipatan itu sama saja.', 'Keduanya berlawanan. Faktor dari 12 adalah bilangan kecil yang membaginya (1, 2, 3, 4, 6, 12). Kelipatan 12 adalah bilangan besar yang habis dibagi 12 (12, 24, 36, …).'],
        ['1 adalah bilangan prima.', 'Tidak. Bilangan prima harus punya tepat dua faktor, sedangkan 1 hanya punya satu faktor, yaitu dirinya sendiri. Bilangan prima terkecil adalah 2.'],
        ['Dua bilangan selalu punya faktor yang sama lebih dari 1.', 'Tidak selalu. 5 dan 7, atau 8 dan 9, hanya punya faktor 1 yang sama. FPB-nya 1.'],
      ],
    },
    realWorld: {
      en: [
        'Two buses leave the station every 6 minutes and every 8 minutes. They leave together again after the LCM, 24 minutes.',
        'Sharing 12 pencils and 18 erasers into identical gift bags: the GCD, 6, is the most bags you can fill with nothing left over.',
        'Hot dogs come in packs of 6 and buns in packs of 8. The LCM, 24, tells you the smallest number of each to buy so none is wasted.',
        'Cutting a 12 cm and an 18 cm ribbon into equal pieces with no waste: the longest piece is the GCD, 6 cm.',
      ],
      id: [
        'Dua bus berangkat dari terminal setiap 6 menit dan setiap 8 menit. Keduanya berangkat bersama lagi setelah KPK-nya, 24 menit.',
        'Membagi 12 pensil dan 18 penghapus ke dalam kantong hadiah yang sama isinya: FPB-nya, 6, adalah banyak kantong terbanyak tanpa ada yang tersisa.',
        'Sosis dijual per bungkus isi 6 dan roti per bungkus isi 8. KPK-nya, 24, memberi tahu jumlah terkecil yang harus dibeli agar tidak ada yang terbuang.',
        'Memotong pita 12 cm dan 18 cm menjadi potongan sama panjang tanpa sisa: potongan terpanjang adalah FPB-nya, 6 cm.',
      ],
    },
    questions: {
      en: [
        { q: 'What are the GCD and LCM of 8 and 12?', a: 'Factors of 8: 1, 2, 4, 8. Factors of 12: 1, 2, 3, 4, 6, 12. GCD = 4. Multiples of 8: 8, 16, 24, …; multiples of 12: 12, 24, …; LCM = 24. Check: 8 × 12 = 96 = 4 × 24.' },
        { q: 'A number has the factor tree 2 × 2 × 5. What is the number, and is 10 one of its factors?', a: 'The number is 20. Yes, 10 = 2 × 5 uses primes from the tree, so 10 is a factor (20 ÷ 10 = 2).' },
        { q: 'Two lights blink every 3 seconds and every 5 seconds. They blink together now. When do they next blink together?', a: 'After the LCM of 3 and 5, which is 15 seconds, because 3 and 5 share no factor except 1.' },
      ],
      id: [
        { q: 'Berapa FPB dan KPK dari 8 dan 12?', a: 'Faktor 8: 1, 2, 4, 8. Faktor 12: 1, 2, 3, 4, 6, 12. FPB = 4. Kelipatan 8: 8, 16, 24, …; kelipatan 12: 12, 24, …; KPK = 24. Cek: 8 × 12 = 96 = 4 × 24.' },
        { q: 'Sebuah bilangan punya pohon faktor 2 × 2 × 5. Berapa bilangannya, dan apakah 10 salah satu faktornya?', a: 'Bilangannya 20. Ya, 10 = 2 × 5 memakai bilangan prima dari pohon itu, jadi 10 adalah faktor (20 ÷ 10 = 2).' },
        { q: 'Dua lampu berkedip setiap 3 detik dan setiap 5 detik. Sekarang keduanya berkedip bersama. Kapan keduanya berkedip bersama lagi?', a: 'Setelah KPK dari 3 dan 5, yaitu 15 detik, karena 3 dan 5 tidak punya faktor yang sama selain 1.' },
      ],
    },
  },
};
