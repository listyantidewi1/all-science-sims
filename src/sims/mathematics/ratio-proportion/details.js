// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Write a mixture as a ratio and simplify it.',
      'Explain why 2 : 3 and 4 : 6 give exactly the same shade.',
      'Use a double number line to scale a recipe to a new total.',
    ],
    id: [
      'Menuliskan campuran sebagai rasio dan menyederhanakannya.',
      'Menjelaskan mengapa 2 : 3 dan 4 : 6 menghasilkan warna yang sama persis.',
      'Menggunakan garis bilangan ganda untuk mengubah skala resep ke jumlah total baru.',
    ],
  },
  tryThis: {
    en: [
      'Set 1 blue : 1 yellow, then press ×2 twice. Does the colour change? Does the total?',
      'Make 2 : 3. Now add one cup of each. Is the shade still the same? Check the simplified ratio.',
      'Press New challenge and find the answer using only the double number line.',
    ],
    id: [
      'Atur 1 biru : 1 kuning, lalu tekan ×2 dua kali. Apakah warnanya berubah? Apakah totalnya berubah?',
      'Buat 2 : 3. Sekarang tambahkan satu cangkir masing-masing. Apakah warnanya masih sama? Periksa rasio sederhananya.',
      'Tekan Tantangan baru dan temukan jawabannya hanya dengan garis bilangan ganda.',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'A ratio compares two amounts by multiplication rather than by difference. A paint recipe of 2 cups blue to 3 cups yellow is written 2 : 3, and it says there is one and a half times as much yellow as blue. The shade of green that comes out depends only on this comparison, not on how much paint you make. In the sim you set the two parts with the + and − counters, the cup on the left shows the mixed colour, and the bar model draws one square per cup so you can see the two parts side by side.',
        'Multiplying or dividing both parts by the same number keeps the ratio the same. The ×2, ×3, ÷2 and ÷3 buttons do exactly this, and the colour in the cup does not change: 2 : 3, 4 : 6 and 6 : 9 are equivalent ratios. Dividing by the largest number that goes into both parts gives the simplest form, which the sim prints next to your ratio. The double number line lines up all the equivalent recipes: the top line counts cups of blue, the bottom counts cups of yellow, and every vertical pair of numbers is the same shade. The row of swatches underneath proves it.',
        'Adding the same number to both parts is not the same thing. Going from 2 : 3 to 3 : 4 by adding one cup of each makes the mix bluer, because 3 out of 7 cups is a larger share than 2 out of 5. The sim also shows these part-to-whole fractions under the cup, so you can compare the part-to-part ratio 2 : 3 with the fraction 2/5 of the mix that is blue. The challenge asks you to make a given shade with a new total number of cups: divide the total by the sum of the simplest parts to get the multiplier, then multiply each part by it.',
        'The sim keeps to whole cups between 1 and 24 for each part, so a scale button only works when both parts stay whole numbers; otherwise it tells you so. The colour blending is a simple visual mix made for the screen, not a physical model of pigments, so treat the shade as a picture of the ratio rather than a prediction of real paint. The juice mode uses exactly the same mathematics with concentrate and water.',
      ],
      id: [
        'Rasio membandingkan dua jumlah dengan perkalian, bukan dengan selisih. Resep cat 2 cangkir biru untuk 3 cangkir kuning ditulis 2 : 3, dan artinya kuningnya satu setengah kali biru. Warna hijau yang dihasilkan hanya bergantung pada perbandingan ini, bukan pada banyaknya cat yang dibuat. Di simulasi kamu mengatur kedua bagian dengan penghitung + dan −, cangkir di kiri menampilkan warna campuran, dan model batang menggambar satu kotak per cangkir supaya kedua bagian terlihat berdampingan.',
        'Mengalikan atau membagi kedua bagian dengan bilangan yang sama menjaga rasionya tetap. Tombol ×2, ×3, ÷2, dan ÷3 melakukan persis itu, dan warna di cangkir tidak berubah: 2 : 3, 4 : 6, dan 6 : 9 adalah rasio senilai. Membagi dengan bilangan terbesar yang membagi habis kedua bagian menghasilkan bentuk paling sederhana, yang dicetak simulasi di samping rasiomu. Garis bilangan ganda menjajarkan semua resep yang senilai: garis atas menghitung cangkir biru, garis bawah menghitung cangkir kuning, dan setiap pasangan angka yang segaris tegak menghasilkan warna yang sama. Deretan contoh warna di bawahnya membuktikannya.',
        'Menambahkan bilangan yang sama ke kedua bagian bukanlah hal yang sama. Beralih dari 2 : 3 ke 3 : 4 dengan menambah satu cangkir masing-masing membuat campuran lebih biru, karena 3 dari 7 cangkir adalah bagian yang lebih besar daripada 2 dari 5. Simulasi juga menampilkan pecahan bagian-terhadap-keseluruhan ini di bawah cangkir, sehingga kamu bisa membandingkan rasio bagian-ke-bagian 2 : 3 dengan pecahan 2/5 dari campuran yang berwarna biru. Tantangan memintamu membuat warna tertentu dengan jumlah total cangkir yang baru: bagi totalnya dengan jumlah bagian-bagian sederhana untuk mendapat pengalinya, lalu kalikan tiap bagian dengan pengali itu.',
        'Simulasi membatasi diri pada cangkir utuh antara 1 dan 24 untuk tiap bagian, sehingga tombol skala hanya bekerja jika kedua bagian tetap bilangan bulat; jika tidak, simulasi memberitahumu. Pencampuran warnanya adalah perpaduan visual sederhana untuk layar, bukan model fisika pigmen, jadi anggap warnanya sebagai gambaran rasio, bukan ramalan cat sungguhan. Mode jus memakai matematika yang persis sama dengan sari buah dan air.',
      ],
    },
    figure: {
      caption: {
        en: 'A double number line for 2 : 3. Each step adds 2 cups of blue and 3 cups of yellow, so every vertical pair (2 and 3, 4 and 6, 6 and 9, ...) is the same shade. To make 15 cups, read down from the total 15: 6 blue and 9 yellow.',
        id: 'Garis bilangan ganda untuk 2 : 3. Tiap langkah menambah 2 cangkir biru dan 3 cangkir kuning, sehingga setiap pasangan segaris (2 dan 3, 4 dan 6, 6 dan 9, ...) warnanya sama. Untuk membuat 15 cangkir, baca dari total 15: 6 biru dan 9 kuning.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Double number line for the ratio 2 to 3', 'Garis bilangan ganda untuk rasio 2 banding 3')}">
  <style>text{font:12px system-ui,sans-serif;fill:currentColor}.s{font-size:10px}.t{stroke-width:2}.m{stroke:currentColor;stroke-width:1;opacity:.4;stroke-dasharray:3 3}</style>
  <rect x="40" y="26" width="24" height="24" fill="#3b82f6"/>
  <rect x="66" y="26" width="24" height="24" fill="#3b82f6"/>
  <rect x="92" y="26" width="24" height="24" fill="#f59e0b"/>
  <rect x="118" y="26" width="24" height="24" fill="#f59e0b"/>
  <rect x="144" y="26" width="24" height="24" fill="#f59e0b"/>
  <text x="180" y="44" font-weight="bold">2 : 3</text>
  <text x="222" y="44" class="s">${L('2 blue for every 3 yellow', '2 biru untuk setiap 3 kuning')}</text>
  <text x="44" y="114" text-anchor="end" fill="#3b82f6" class="s" font-weight="bold">${L('blue', 'biru')}</text>
  <text x="44" y="164" text-anchor="end" fill="#f59e0b" class="s" font-weight="bold">${L('yellow', 'kuning')}</text>
  <line x1="50" y1="110" x2="335" y2="110" stroke="#3b82f6" class="t"/>
  <line x1="50" y1="160" x2="335" y2="160" stroke="#f59e0b" class="t"/>
  <path d="M50 104 V116 M106 104 V116 M162 104 V116 M218 104 V116 M274 104 V116 M330 104 V116" stroke="#3b82f6" class="t"/>
  <path d="M50 154 V166 M106 154 V166 M162 154 V166 M218 154 V166 M274 154 V166 M330 154 V166" stroke="#f59e0b" class="t"/>
  <path d="M50 116 V154 M106 116 V154 M162 116 V154 M274 116 V154 M330 116 V154" class="m"/>
  <line x1="218" y1="116" x2="218" y2="154" stroke="#10b981" stroke-width="2"/>
  <text x="50" y="98" text-anchor="middle" class="s">0</text>
  <text x="106" y="98" text-anchor="middle" class="s">2</text>
  <text x="162" y="98" text-anchor="middle" class="s">4</text>
  <text x="218" y="98" text-anchor="middle" fill="#10b981" font-weight="bold">6</text>
  <text x="274" y="98" text-anchor="middle" class="s">8</text>
  <text x="330" y="98" text-anchor="middle" class="s">10</text>
  <text x="50" y="180" text-anchor="middle" class="s">0</text>
  <text x="106" y="180" text-anchor="middle" class="s">3</text>
  <text x="162" y="180" text-anchor="middle" class="s">6</text>
  <text x="218" y="180" text-anchor="middle" fill="#10b981" font-weight="bold">9</text>
  <text x="274" y="180" text-anchor="middle" class="s">12</text>
  <text x="330" y="180" text-anchor="middle" class="s">15</text>
  <text x="106" y="139" text-anchor="middle" class="s" opacity=".7">×1</text>
  <text x="162" y="139" text-anchor="middle" class="s" opacity=".7">×2</text>
  <text x="218" y="139" text-anchor="middle" fill="#10b981" class="s" font-weight="bold">×3</text>
  <text x="274" y="139" text-anchor="middle" class="s" opacity=".7">×4</text>
  <text x="330" y="139" text-anchor="middle" class="s" opacity=".7">×5</text>
  <text x="44" y="202" text-anchor="end" class="s">total</text>
  <text x="50" y="202" text-anchor="middle" class="s">0</text>
  <text x="106" y="202" text-anchor="middle" class="s">5</text>
  <text x="162" y="202" text-anchor="middle" class="s">10</text>
  <text x="218" y="202" text-anchor="middle" fill="#10b981" class="s" font-weight="bold">15</text>
  <text x="274" y="202" text-anchor="middle" class="s">20</text>
  <text x="330" y="202" text-anchor="middle" class="s">25</text>
  <text x="190" y="228" text-anchor="middle" class="s">${L('15 cups → 15 ÷ 5 = 3, so 2×3 = 6 blue and 3×3 = 9 yellow: still 2 : 3', '15 cangkir → 15 ÷ 5 = 3, jadi 2×3 = 6 biru dan 3×3 = 9 kuning: tetap 2 : 3')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'A ratio compares two parts by multiplication: 2 : 3 means there is 1.5 times as much of the second as the first.',
        'Multiplying or dividing both parts by the same number gives an equivalent ratio and the same shade.',
        'Adding the same amount to both parts changes the ratio, because it changes each part\'s share of the whole.',
        'A double number line shows every equivalent ratio as a vertical pair; the totals go up in steps of the sum of the parts.',
        'To scale a recipe to a new total, divide the total by the sum of the simplest parts and multiply each part by that number.',
      ],
      id: [
        'Rasio membandingkan dua bagian dengan perkalian: 2 : 3 berarti bagian kedua 1,5 kali bagian pertama.',
        'Mengalikan atau membagi kedua bagian dengan bilangan yang sama menghasilkan rasio senilai dan warna yang sama.',
        'Menambahkan jumlah yang sama ke kedua bagian mengubah rasio, karena mengubah porsi tiap bagian terhadap keseluruhan.',
        'Garis bilangan ganda menampilkan setiap rasio senilai sebagai pasangan segaris; totalnya naik dengan langkah sebesar jumlah kedua bagian.',
        'Untuk mengubah skala resep ke total baru, bagi total dengan jumlah bagian-bagian sederhana lalu kalikan tiap bagian dengan bilangan itu.',
      ],
    },
    vocabulary: {
      en: [
        ['Ratio', 'A comparison of two quantities by multiplication, written a : b.'],
        ['Equivalent ratios', 'Ratios that describe the same mixture, such as 2 : 3, 4 : 6 and 6 : 9.'],
        ['Simplest form', 'The equivalent ratio with the smallest whole numbers, found by dividing both parts by their greatest common factor.'],
        ['Proportion', 'A statement that two ratios are equal, such as 2 : 3 = 6 : 9.'],
        ['Part-to-part ratio', 'Comparing one ingredient with another, like blue to yellow.'],
        ['Part-to-whole fraction', 'Comparing one ingredient with the total mixture, like 2/5 of the mix being blue.'],
        ['Double number line', 'Two number lines placed one above the other so that aligned numbers always have the same ratio.'],
        ['Scale factor', 'The number both parts are multiplied by to make a larger or smaller batch.'],
      ],
      id: [
        ['Rasio', 'Perbandingan dua besaran dengan perkalian, ditulis a : b.'],
        ['Rasio senilai', 'Rasio-rasio yang menggambarkan campuran yang sama, seperti 2 : 3, 4 : 6, dan 6 : 9.'],
        ['Bentuk paling sederhana', 'Rasio senilai dengan bilangan bulat terkecil, didapat dengan membagi kedua bagian dengan faktor persekutuan terbesarnya.'],
        ['Proporsi (perbandingan senilai)', 'Pernyataan bahwa dua rasio sama, seperti 2 : 3 = 6 : 9.'],
        ['Rasio bagian-ke-bagian', 'Membandingkan satu bahan dengan bahan lain, seperti biru terhadap kuning.'],
        ['Pecahan bagian-terhadap-keseluruhan', 'Membandingkan satu bahan dengan seluruh campuran, seperti 2/5 campuran yang berwarna biru.'],
        ['Garis bilangan ganda', 'Dua garis bilangan yang diletakkan bertumpuk sehingga angka yang segaris selalu punya rasio yang sama.'],
        ['Faktor skala', 'Bilangan pengali kedua bagian untuk membuat takaran yang lebih besar atau lebih kecil.'],
      ],
    },
    misconceptions: {
      en: [
        ['Adding one cup of each keeps the shade the same, because the difference stays the same.', 'Ratios are about multiplication, not difference. 2 : 3 has 1.5 times as much yellow; 3 : 4 has only 1.33 times as much, so the mix turns bluer. Try it and watch the cup.'],
        ['2 : 3 means 2/3 of the mix is blue.', '2 : 3 compares blue with yellow. The share of the whole is 2 out of 2 + 3 = 5 cups, so 2/5 of the mix is blue and 3/5 is yellow.'],
        ['Doubling the recipe makes the green twice as strong.', 'Doubling both parts gives twice as much paint of exactly the same shade. The ratio, and therefore the colour, is unchanged.'],
        ['4 : 6 is a different recipe from 2 : 3.', 'They are equivalent: divide both parts of 4 : 6 by 2 and you get 2 : 3. The sim shows the same simplified ratio and the same swatch for both.'],
      ],
      id: [
        ['Menambah satu cangkir masing-masing menjaga warnanya sama, karena selisihnya tetap.', 'Rasio soal perkalian, bukan selisih. 2 : 3 punya kuning 1,5 kali biru; 3 : 4 hanya 1,33 kali, sehingga campuran menjadi lebih biru. Coba dan perhatikan cangkirnya.'],
        ['2 : 3 berarti 2/3 campuran berwarna biru.', '2 : 3 membandingkan biru dengan kuning. Porsinya terhadap keseluruhan adalah 2 dari 2 + 3 = 5 cangkir, jadi 2/5 campuran biru dan 3/5 kuning.'],
        ['Menggandakan resep membuat hijaunya dua kali lebih pekat.', 'Menggandakan kedua bagian menghasilkan cat dua kali lebih banyak dengan warna yang persis sama. Rasionya, dan karena itu warnanya, tidak berubah.'],
        ['4 : 6 adalah resep yang berbeda dari 2 : 3.', 'Keduanya senilai: bagi kedua bagian 4 : 6 dengan 2 dan kamu mendapat 2 : 3. Simulasi menampilkan rasio sederhana dan contoh warna yang sama untuk keduanya.'],
      ],
    },
    realWorld: {
      en: [
        'Cooking: a rice recipe of 1 cup rice to 2 cups water can be scaled to any number of guests by keeping the 1 : 2 ratio.',
        'Mixing concrete: builders use ratios such as 1 : 2 : 3 for cement, sand and gravel so that every batch has the same strength.',
        'Maps and models: a scale of 1 : 50 000 means 1 cm on the map is 50 000 cm, or 500 m, on the ground.',
        'Medicine doses and fuel mixtures for two-stroke engines (for example 1 : 25 oil to petrol) must keep an exact ratio to be safe.',
      ],
      id: [
        'Memasak: resep nasi 1 cangkir beras untuk 2 cangkir air bisa diubah skalanya untuk berapa pun tamu dengan menjaga rasio 1 : 2.',
        'Mengaduk beton: tukang memakai rasio seperti 1 : 2 : 3 untuk semen, pasir, dan kerikil agar setiap adukan sama kuatnya.',
        'Peta dan maket: skala 1 : 50.000 berarti 1 cm di peta sama dengan 50.000 cm, atau 500 m, di lapangan.',
        'Dosis obat dan campuran bahan bakar mesin dua tak (misalnya 1 : 25 oli terhadap bensin) harus menjaga rasio yang tepat agar aman.',
      ],
    },
    questions: {
      en: [
        { q: 'You want 15 cups of the 2 : 3 green. How many cups of blue and yellow do you need?', a: 'One batch of 2 : 3 is 5 cups, and 15 ÷ 5 = 3 batches. So 2 × 3 = 6 cups blue and 3 × 3 = 9 cups yellow. Check: 6 + 9 = 15 and 6 : 9 simplifies to 2 : 3.' },
        { q: 'Is 4 : 6 the same shade as 2 : 3? Is 3 : 4 the same shade as 2 : 3?', a: '4 : 6 is the same: divide both by 2 to get 2 : 3. 3 : 4 is not: 3/7 of that mix is blue, while 2/5 of the 2 : 3 mix is blue, and 3/7 is larger, so 3 : 4 is bluer.' },
        { q: 'In juice mode the recipe is 1 concentrate : 4 water. With 2 cups of concentrate, how much water, and how much juice in total?', a: 'Scale factor 2, so 4 × 2 = 8 cups of water. The total is 2 + 8 = 10 cups, and the concentrate makes up 1/5 of the drink, the same as in the 1 : 4 recipe.' },
      ],
      id: [
        { q: 'Kamu ingin 15 cangkir hijau 2 : 3. Berapa cangkir biru dan kuning yang dibutuhkan?', a: 'Satu takaran 2 : 3 adalah 5 cangkir, dan 15 ÷ 5 = 3 takaran. Jadi 2 × 3 = 6 cangkir biru dan 3 × 3 = 9 cangkir kuning. Periksa: 6 + 9 = 15 dan 6 : 9 disederhanakan menjadi 2 : 3.' },
        { q: 'Apakah 4 : 6 warnanya sama dengan 2 : 3? Apakah 3 : 4 warnanya sama dengan 2 : 3?', a: '4 : 6 sama: bagi keduanya dengan 2 dan dapat 2 : 3. 3 : 4 tidak: 3/7 campuran itu biru, sedangkan 2/5 campuran 2 : 3 biru, dan 3/7 lebih besar, jadi 3 : 4 lebih biru.' },
        { q: 'Pada mode jus resepnya 1 sari buah : 4 air. Dengan 2 cangkir sari buah, berapa air, dan berapa total jusnya?', a: 'Faktor skalanya 2, jadi 4 × 2 = 8 cangkir air. Totalnya 2 + 8 = 10 cangkir, dan sari buah membentuk 1/5 minuman, sama seperti pada resep 1 : 4.' },
      ],
    },
  },
};
