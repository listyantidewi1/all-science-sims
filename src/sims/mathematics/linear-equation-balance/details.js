// Long-form text for the sim page aside, kept out of manifest.js.
export default {
  objectives: {
    en: [
      'Explain an equation as a balanced scale and solve linear equations in one variable by doing the same operation to both sides.',
      'Choose the moves that isolate x: remove equal numbers of units or x-bags from both pans, then share both pans into equal groups (divide).',
      'Describe what an inequality means on a tilted scale and show that adding, subtracting or dividing by a positive number keeps the tilt the same.',
    ],
    id: [
      'Menjelaskan persamaan sebagai timbangan yang seimbang dan menyelesaikan persamaan linear satu variabel dengan melakukan operasi yang sama pada kedua ruas.',
      'Memilih langkah yang mengisolasi x: mengambil beban satuan atau kantong x yang sama banyak dari kedua piringan, lalu membagi kedua piringan ke kelompok yang sama (membagi).',
      'Menjelaskan arti pertidaksamaan pada timbangan yang miring dan menunjukkan bahwa menambah, mengurangi atau membagi dengan bilangan positif tidak mengubah arah kemiringan.',
    ],
  },
  tryThis: {
    en: [
      'Load 3x + 2 = 11. Press "− 1 both sides" twice, then "÷ 3". Read the value of x from the scale and check it: 3 × 3 + 2 = 11.',
      'Load 2x + 5 = x + 9. Which move should come first, taking an x off both sides or taking a 1 off both sides? Try both orders — do you reach the same answer?',
      'Load 4x + 2 = 2x + 10 and press "÷ 2" straight away. Why is that allowed here, but not for 3x + 2 = 11?',
      'Load 2x + 3 < 11 and solve it. Which way does the scale tilt at the start, and does the tilt ever change while you solve?',
    ],
    id: [
      'Muat 3x + 2 = 11. Tekan "− 1 kedua sisi" dua kali, lalu "÷ 3". Baca nilai x dari timbangan dan periksa: 3 × 3 + 2 = 11.',
      'Muat 2x + 5 = x + 9. Langkah mana yang lebih dulu, mengambil x dari kedua sisi atau mengambil 1 dari kedua sisi? Coba kedua urutan — apakah hasilnya sama?',
      'Muat 4x + 2 = 2x + 10 dan langsung tekan "÷ 2". Mengapa itu boleh di sini, tetapi tidak untuk 3x + 2 = 11?',
      'Muat 2x + 3 < 11 dan selesaikan. Ke arah mana timbangan miring pada awalnya, dan apakah kemiringannya pernah berubah saat kamu menyelesaikannya?',
    ],
  },

  // "Learn" section: the mathematics behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'A linear equation in one variable, such as 3x + 2 = 11, says that two expressions have the same value. The letter x stands for a number we do not know yet. The scale makes this concrete: every purple bag hides the same number x of unit weights, every orange cube weighs 1, and the equals sign means the two pans weigh exactly the same, so the beam is level.',
        'Solving the equation means finding out what is in a bag. The rule is simple: whatever you do to one pan you must also do to the other, or the scale will tip and the sides will no longer be equal. Taking two unit cubes off both pans turns 3x + 2 = 11 into 3x = 9. Sharing both pans into three equal groups and keeping one group turns 3x = 9 into x = 3. Each move produces an equivalent equation, one with exactly the same solution, which is why the answer you reach is the answer to the original equation.',
        'When bags appear on both sides, as in 2x + 5 = x + 9, first take one bag off each pan to get x + 5 = 9, then remove five units to get x = 4. Dividing is only allowed when every count on both pans can be shared equally; the sim refuses to cut a bag or a cube in half, which is exactly the moment when a human solver would move to fractions instead.',
        'An inequality such as 2x + 3 < 11 is a tilted scale: the right pan is heavier. Taking the same weight off both pans or dividing both by a positive number leaves the heavier pan heavier, so the inequality sign does not change: 2x < 8, then x < 4. The answer is not a single number but every number less than 4. (Multiplying or dividing by a negative number would swap the pans and reverse the sign; the sim keeps to positive moves so the picture stays physical.)',
      ],
      id: [
        'Persamaan linear satu variabel, seperti 3x + 2 = 11, menyatakan bahwa dua ekspresi memiliki nilai yang sama. Huruf x mewakili bilangan yang belum kita ketahui. Timbangan membuatnya nyata: setiap kantong ungu menyembunyikan x beban satuan yang sama banyak, setiap kubus oranye beratnya 1, dan tanda sama dengan berarti kedua piringan sama berat sehingga lengan timbangan datar.',
        'Menyelesaikan persamaan berarti mencari isi sebuah kantong. Aturannya sederhana: apa pun yang kamu lakukan pada satu piringan harus juga dilakukan pada piringan lain, atau timbangan akan miring dan kedua ruas tidak lagi sama. Mengambil dua kubus satuan dari kedua piringan mengubah 3x + 2 = 11 menjadi 3x = 9. Membagi kedua piringan menjadi tiga kelompok sama dan menyimpan satu kelompok mengubah 3x = 9 menjadi x = 3. Setiap langkah menghasilkan persamaan yang ekuivalen, yaitu persamaan dengan penyelesaian yang persis sama, dan karena itulah jawaban yang kamu peroleh adalah jawaban persamaan semula.',
        'Jika kantong muncul di kedua ruas, seperti 2x + 5 = x + 9, ambil dulu satu kantong dari setiap piringan sehingga menjadi x + 5 = 9, lalu ambil lima satuan sehingga x = 4. Membagi hanya boleh dilakukan jika semua banyaknya benda di kedua piringan dapat dibagi rata; simulasi menolak memotong kantong atau kubus menjadi setengah, dan tepat di saat itulah penyelesai manusia akan beralih ke pecahan.',
        'Pertidaksamaan seperti 2x + 3 < 11 adalah timbangan yang miring: piringan kanan lebih berat. Mengambil beban yang sama dari kedua piringan atau membagi keduanya dengan bilangan positif tetap membuat piringan yang berat lebih berat, jadi tanda pertidaksamaan tidak berubah: 2x < 8, lalu x < 4. Jawabannya bukan satu bilangan, melainkan semua bilangan yang kurang dari 4. (Mengalikan atau membagi dengan bilangan negatif akan menukar piringan dan membalik tandanya; simulasi hanya memakai langkah positif agar gambarnya tetap fisik.)',
      ],
    },
    figure: {
      caption: {
        en: 'Solving 3x + 2 = 11 on the scale. Step 1: take two unit weights off both pans (3x = 9). Step 2: share both pans into three equal groups and keep one (x = 3). Each step keeps the beam level.',
        id: 'Menyelesaikan 3x + 2 = 11 pada timbangan. Langkah 1: ambil dua beban satuan dari kedua piringan (3x = 9). Langkah 2: bagi kedua piringan menjadi tiga kelompok sama dan simpan satu (x = 3). Setiap langkah menjaga lengan tetap datar.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        const bag = (x, y) => `<path d="M${x - 6} ${y + 7} Q${x - 8} ${y - 3} ${x - 2} ${y - 4} L${x - 2} ${y - 7} L${x + 2} ${y - 7} L${x + 2} ${y - 4} Q${x + 8} ${y - 3} ${x + 6} ${y + 7} Z" fill="#a855f7"/><text x="${x}" y="${y + 5}" text-anchor="middle" class="w">x</text>`;
        const cube = (x, y) => `<rect x="${x - 5}" y="${y - 4}" width="10" height="11" rx="1.5" fill="#f59e0b"/>`;
        const scale = (cx, y, left, right, label) => {
          let s = `<line x1="${cx - 48}" y1="${y}" x2="${cx + 48}" y2="${y}" class="bm"/><path d="M${cx - 6} ${y + 30} L${cx + 6} ${y + 30} L${cx} ${y} Z" fill="currentColor" opacity=".6"/>`;
          for (const [ex, items] of [[cx - 48, left], [cx + 48, right]]) {
            const py = y + 24;
            s += `<path d="M${ex} ${y} L${ex - 20} ${py} M${ex} ${y} L${ex + 20} ${py}" class="st"/><rect x="${ex - 24}" y="${py}" width="48" height="3" fill="currentColor" opacity=".7"/>`;
            items.forEach((it, i) => {
              const row = Math.floor(i / 4), col = i % 4, n = Math.min(4, items.length - row * 4);
              const x = ex - (n - 1) * 5.5 + col * 11, iy = py - 8 - row * 13;
              s += it === 'x' ? bag(x, iy) : cube(x, iy);
            });
          }
          s += `<text x="${cx}" y="${y + 48}" text-anchor="middle" class="b">${label}</text>`;
          return s;
        };
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Three balanced scales showing the steps of solving 3x + 2 = 11', 'Tiga timbangan seimbang yang menunjukkan langkah penyelesaian 3x + 2 = 11')}">
  <style>text{font:10px system-ui,sans-serif;fill:currentColor}.b{font:bold 11px system-ui,sans-serif;fill:currentColor}.w{font:bold 8px system-ui,sans-serif;fill:#fff}.bm{stroke:currentColor;stroke-width:2.5;stroke-linecap:round}.st{stroke:currentColor;stroke-width:1;fill:none;opacity:.6}.ar{stroke:#34d399;stroke-width:1.6;fill:none}</style>
  ${scale(70, 60, ['x', 'x', 'x', '1', '1'], ['1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1'], '3x + 2 = 11')}
  ${scale(290, 60, ['x', 'x', 'x'], ['1', '1', '1', '1', '1', '1', '1', '1', '1'], '3x = 9')}
  <path d="M135 70 L220 70" class="ar"/><path d="M214 65 L220 70 L214 75" class="ar"/>
  <text x="178" y="62" text-anchor="middle">${L('− 2 both sides', '− 2 kedua sisi')}</text>
  ${scale(180, 160, ['x'], ['1', '1', '1'], 'x = 3')}
  <path d="M290 118 Q300 150 230 162" class="ar"/><path d="M237 157 L230 162 L237 166" class="ar"/>
  <text x="300" y="150" text-anchor="middle">${L('÷ 3 both sides', '÷ 3 kedua sisi')}</text>
  <text x="180" y="230" text-anchor="middle">${L('same move on both pans → beam stays level → same solution', 'langkah sama di kedua piringan → lengan tetap datar → penyelesaian sama')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'An equation is a balance: the expressions on both sides have the same value, so the pans weigh the same.',
        'Doing the same thing to both sides (add, subtract, multiply or divide by the same non-zero number) gives an equivalent equation with the same solution.',
        'To solve, undo what was done to x in reverse order: remove the added units first, then divide by the number of bags.',
        'Check an answer by substituting it back: 3(3) + 2 = 11 is true, so x = 3 is correct.',
        'An inequality is a tilted balance; adding, subtracting, or dividing by a positive number keeps the same tilt, so the sign (< or >) stays the same.',
        'A linear equation in one variable has exactly one solution; a linear inequality has a whole range of solutions, such as x < 4.',
      ],
      id: [
        'Persamaan adalah timbangan: ekspresi di kedua ruas bernilai sama, sehingga piringannya sama berat.',
        'Melakukan hal yang sama pada kedua ruas (menambah, mengurangi, mengalikan atau membagi dengan bilangan bukan nol yang sama) menghasilkan persamaan ekuivalen dengan penyelesaian yang sama.',
        'Untuk menyelesaikan, batalkan apa yang dilakukan pada x dengan urutan terbalik: buang dulu satuan yang ditambahkan, lalu bagi dengan banyaknya kantong.',
        'Periksa jawaban dengan menyubstitusikannya kembali: 3(3) + 2 = 11 benar, jadi x = 3 tepat.',
        'Pertidaksamaan adalah timbangan yang miring; menambah, mengurangi, atau membagi dengan bilangan positif menjaga kemiringan yang sama, sehingga tandanya (< atau >) tidak berubah.',
        'Persamaan linear satu variabel memiliki tepat satu penyelesaian; pertidaksamaan linear memiliki rentang penyelesaian, misalnya x < 4.',
      ],
    },
    vocabulary: {
      en: [
        ['Variable', 'A letter, such as x, that stands for an unknown number. In the sim each bag hides the same number of units.'],
        ['Coefficient', 'The number multiplying the variable: in 3x + 2 the coefficient of x is 3 — three bags.'],
        ['Constant', 'A number on its own, like the 2 and the 11 in 3x + 2 = 11 — the loose unit weights.'],
        ['Equivalent equations', 'Equations with exactly the same solution, such as 3x + 2 = 11, 3x = 9 and x = 3.'],
        ['Inverse operation', 'The operation that undoes another: subtraction undoes addition, division undoes multiplication.'],
        ['Inequality', 'A statement that one expression is less than or greater than another, written with <, >, ≤ or ≥.'],
      ],
      id: [
        ['Variabel', 'Huruf, misalnya x, yang mewakili bilangan yang belum diketahui. Dalam simulasi setiap kantong menyembunyikan satuan yang sama banyak.'],
        ['Koefisien', 'Bilangan yang mengalikan variabel: pada 3x + 2 koefisien x adalah 3 — tiga kantong.'],
        ['Konstanta', 'Bilangan yang berdiri sendiri, seperti 2 dan 11 pada 3x + 2 = 11 — beban satuan yang lepas.'],
        ['Persamaan ekuivalen', 'Persamaan dengan penyelesaian yang persis sama, misalnya 3x + 2 = 11, 3x = 9 dan x = 3.'],
        ['Operasi kebalikan', 'Operasi yang membatalkan operasi lain: pengurangan membatalkan penjumlahan, pembagian membatalkan perkalian.'],
        ['Pertidaksamaan', 'Pernyataan bahwa satu ekspresi kurang dari atau lebih dari ekspresi lain, ditulis dengan <, >, ≤ atau ≥.'],
      ],
    },
    misconceptions: {
      en: [
        ['The equals sign means "write the answer here".', 'It means "both sides have the same value". 3x + 2 = 11 is a statement that is true only for the right x, not an instruction to compute.'],
        ['You can move a number across the equals sign and just change its sign, with no reason.', 'What is really happening is subtracting (or adding) the same amount on both sides. "Moving across" is a shortcut for that; the scale shows why it works.'],
        ['3x means 3 and x written next to each other, like 32 means thirty-two.', '3x means 3 × x: three bags, each holding x units. If x = 4 then 3x = 12, not 34.'],
        ['Dividing both sides of an inequality always flips the sign.', 'Only dividing or multiplying by a negative number flips it. Dividing 2x < 8 by 2 gives x < 4 with the sign unchanged.'],
      ],
      id: [
        ['Tanda sama dengan berarti "tulis jawabannya di sini".', 'Artinya "kedua ruas bernilai sama". 3x + 2 = 11 adalah pernyataan yang hanya benar untuk x yang tepat, bukan perintah untuk menghitung.'],
        ['Kamu bisa memindahkan bilangan melewati tanda sama dengan dan sekadar mengubah tandanya tanpa alasan.', 'Yang sebenarnya terjadi adalah mengurangkan (atau menambahkan) jumlah yang sama pada kedua ruas. "Pindah ruas" adalah jalan pintas untuk itu; timbangan menunjukkan alasannya.'],
        ['3x berarti 3 dan x yang ditulis berdampingan, seperti 32 berarti tiga puluh dua.', '3x berarti 3 × x: tiga kantong yang masing-masing berisi x satuan. Jika x = 4 maka 3x = 12, bukan 34.'],
        ['Membagi kedua ruas pertidaksamaan selalu membalik tandanya.', 'Hanya membagi atau mengalikan dengan bilangan negatif yang membaliknya. Membagi 2x < 8 dengan 2 menghasilkan x < 4 dengan tanda tetap.'],
      ],
    },
    realWorld: {
      en: [
        'Shopping: three identical notebooks and a 2-thousand-rupiah pen cost 11 thousand in total; 3x + 2 = 11 tells you the price of one notebook.',
        'Phone plans: a monthly fee plus a cost per gigabyte is a linear expression; setting it equal to a budget and solving tells you how much data you can afford.',
        'Cooking and chemistry: scaling a recipe or balancing a reaction uses the same idea of keeping both sides equal while you change them.',
        'Engineering: a real beam balance in a laboratory or market works exactly like the sim — the same mass added to both pans leaves it level.',
        'Inequalities set limits: a lift that carries at most 600 kg with a 70 kg operator gives 80n + 70 ≤ 600 for n passengers of 80 kg.',
      ],
      id: [
        'Berbelanja: tiga buku tulis yang sama dan sebuah pulpen seharga 2 ribu rupiah berjumlah 11 ribu; 3x + 2 = 11 memberi tahu harga satu buku tulis.',
        'Paket telepon: biaya bulanan ditambah biaya per gigabyte adalah ekspresi linear; menyamakannya dengan anggaran lalu menyelesaikannya memberi tahu berapa data yang mampu kamu beli.',
        'Memasak dan kimia: menggandakan resep atau menyetarakan reaksi memakai gagasan yang sama, yaitu menjaga kedua ruas tetap sama saat mengubahnya.',
        'Teknik: timbangan lengan sungguhan di laboratorium atau pasar bekerja persis seperti simulasi — massa yang sama ditambahkan pada kedua piringan membuatnya tetap datar.',
        'Pertidaksamaan menetapkan batas: lift yang mampu mengangkut paling banyak 600 kg dengan operator 70 kg memberi 80n + 70 ≤ 600 untuk n penumpang 80 kg.',
      ],
    },
    questions: {
      en: [
        { q: 'For 2x + 5 = x + 9, write the two moves that isolate x and the equation after each move.', a: 'Take one x off both sides: x + 5 = 9. Take five units off both sides: x = 4. Check: 2(4) + 5 = 13 and 4 + 9 = 13.' },
        { q: 'Why does the sim refuse "÷ 2" on 3x + 2 = 11, and what would a person do instead?', a: 'Three bags cannot be split into two equal groups, nor can 11 cubes. A person could still divide both sides by 2 but would get fractions: 1.5x + 1 = 5.5. It is easier to subtract 2 first and then divide by 3.' },
        { q: 'Start from 3x + 1 > x + 7. Which pan is heavier, and what is the solution?', a: 'The left pan is heavier (the beam tilts left). Take an x off both sides: 2x + 1 > 7. Take one unit off: 2x > 6. Divide by 2: x > 3. Any number greater than 3 works, for example x = 5 gives 16 > 12.' },
      ],
      id: [
        { q: 'Untuk 2x + 5 = x + 9, tulis dua langkah yang mengisolasi x dan persamaan setelah setiap langkah.', a: 'Ambil satu x dari kedua ruas: x + 5 = 9. Ambil lima satuan dari kedua ruas: x = 4. Periksa: 2(4) + 5 = 13 dan 4 + 9 = 13.' },
        { q: 'Mengapa simulasi menolak "÷ 2" pada 3x + 2 = 11, dan apa yang akan dilakukan orang sebagai gantinya?', a: 'Tiga kantong tidak bisa dibagi menjadi dua kelompok sama, begitu pula 11 kubus. Orang masih bisa membagi kedua ruas dengan 2 tetapi mendapat pecahan: 1,5x + 1 = 5,5. Lebih mudah mengurangi 2 terlebih dahulu lalu membagi dengan 3.' },
        { q: 'Mulai dari 3x + 1 > x + 7. Piringan mana yang lebih berat, dan apa penyelesaiannya?', a: 'Piringan kiri lebih berat (lengan miring ke kiri). Ambil satu x dari kedua ruas: 2x + 1 > 7. Ambil satu satuan: 2x > 6. Bagi dengan 2: x > 3. Setiap bilangan yang lebih besar dari 3 memenuhi, misalnya x = 5 memberi 16 > 12.' },
      ],
    },
  },
};
