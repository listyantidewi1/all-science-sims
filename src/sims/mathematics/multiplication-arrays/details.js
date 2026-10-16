// Long-form text for the sim page aside, kept out of manifest.js.
export default {
  objectives: {
    en: [
      'Show a multiplication fact as an array of rows and columns and read it as rows × columns = total.',
      'Explain why 6 × 4 and 4 × 6 give the same answer, and why a product can be split into two smaller products.',
      'Use an array to divide by sharing into equal rows, and find all the factors of a number up to 100.',
    ],
    id: [
      'Menunjukkan fakta perkalian sebagai larik baris dan kolom dan membacanya sebagai baris × kolom = jumlah.',
      'Menjelaskan mengapa 6 × 4 dan 4 × 6 memberi hasil yang sama, dan mengapa hasil kali bisa dipecah menjadi dua hasil kali yang lebih kecil.',
      'Menggunakan larik untuk membagi dengan membagikan ke baris yang sama banyak, dan menemukan semua faktor suatu bilangan sampai 100.',
    ],
  },
  tryThis: {
    en: [
      'Set 6 rows and 4 columns. Count the dots. Now set 4 rows and 6 columns. Did the number of dots change?',
      'Choose Split and move the split line. Does the total ever change? Which split makes the two parts easiest to count?',
      'Choose Share. 24 dots shared into 6 rows: how many in each row? Change the rows and watch the division sentence.',
      'Choose Factors with 12 dots, then with 13 dots. Why does 13 only have one rectangle?',
    ],
    id: [
      'Atur 6 baris dan 4 kolom. Hitung titiknya. Sekarang atur 4 baris dan 6 kolom. Apakah banyaknya titik berubah?',
      'Pilih Pecah dan geser garis pemisahnya. Apakah jumlahnya pernah berubah? Pemisahan mana yang membuat kedua bagian paling mudah dihitung?',
      'Pilih Bagikan. 24 titik dibagikan ke 6 baris: berapa titik tiap baris? Ubah banyak barisnya dan perhatikan kalimat pembagiannya.',
      'Pilih Faktor dengan 12 titik, lalu dengan 13 titik. Mengapa 13 hanya punya satu persegi panjang?',
    ],
  },

  learn: {
    background: {
      en: [
        'An array is a neat rectangle of dots in rows and columns. If there are 6 rows and each row has 4 dots, there are 6 groups of 4, which we write as 6 × 4. Counting the dots gives 24, so 6 × 4 = 24. Multiplication is just a fast way of adding the same number again and again: 4 + 4 + 4 + 4 + 4 + 4 = 24.',
        'Turn the array on its side and the rows become columns. Now there are 4 rows of 6, which is 4 × 6. But not a single dot was added or taken away, so 4 × 6 must also be 24. This is true for every pair of numbers: you can swap them round and the product stays the same. Mathematicians call this the commutative property. It halves the number of times-table facts you need to learn.',
        'A big array can be cut into two smaller arrays. Cut 6 × 4 after the second column and you get 6 × 2 on the left and 6 × 2 on the right: 12 + 12 = 24. This is called the distributive property, and it is how we multiply big numbers: 6 × 14 is 6 × 10 plus 6 × 4. Division is the array backwards. If you have 24 dots and share them into 6 equal rows, each row gets 4, so 24 ÷ 6 = 4. The factors of a number are all the row counts that make a complete rectangle with no dots left over: 24 can be made as 1 × 24, 2 × 12, 3 × 8 and 4 × 6, so its factors are 1, 2, 3, 4, 6, 8, 12 and 24. A number like 13 that only makes a 1-row rectangle is called a prime number.',
      ],
      id: [
        'Larik adalah persegi panjang rapi dari titik-titik dalam baris dan kolom. Jika ada 6 baris dan tiap baris berisi 4 titik, berarti ada 6 kelompok berisi 4, yang kita tulis 6 × 4. Menghitung titiknya menghasilkan 24, jadi 6 × 4 = 24. Perkalian hanyalah cara cepat menjumlahkan bilangan yang sama berulang-ulang: 4 + 4 + 4 + 4 + 4 + 4 = 24.',
        'Putar lariknya ke samping, maka baris menjadi kolom. Sekarang ada 4 baris berisi 6, yaitu 4 × 6. Tetapi tidak ada satu titik pun yang ditambah atau diambil, jadi 4 × 6 pasti juga 24. Ini berlaku untuk setiap pasangan bilangan: kamu bisa menukar urutannya dan hasil kalinya tetap sama. Matematikawan menyebutnya sifat komutatif. Sifat ini memangkas setengah fakta perkalian yang perlu kamu hafal.',
        'Larik besar bisa dipotong menjadi dua larik yang lebih kecil. Potong 6 × 4 setelah kolom kedua, maka kamu mendapat 6 × 2 di kiri dan 6 × 2 di kanan: 12 + 12 = 24. Ini disebut sifat distributif, dan inilah cara kita mengalikan bilangan besar: 6 × 14 adalah 6 × 10 ditambah 6 × 4. Pembagian adalah larik yang dibalik. Jika kamu punya 24 titik dan membagikannya ke 6 baris yang sama banyak, tiap baris mendapat 4, jadi 24 ÷ 6 = 4. Faktor suatu bilangan adalah semua banyak baris yang membentuk persegi panjang utuh tanpa titik tersisa: 24 bisa dibuat sebagai 1 × 24, 2 × 12, 3 × 8 dan 4 × 6, jadi faktornya 1, 2, 3, 4, 6, 8, 12 dan 24. Bilangan seperti 13 yang hanya bisa membentuk persegi panjang 1 baris disebut bilangan prima.',
      ],
    },
    figure: {
      caption: {
        en: 'Left: 6 rows of 4 dots is 6 × 4 = 24; turned on its side it is 4 × 6 = 24, the same dots. Right: the same array split after 2 columns gives 6 × 2 + 6 × 2 = 12 + 12 = 24.',
        id: 'Kiri: 6 baris berisi 4 titik adalah 6 × 4 = 24; diputar ke samping menjadi 4 × 6 = 24, titik yang sama. Kanan: larik yang sama dipecah setelah 2 kolom menghasilkan 6 × 2 + 6 × 2 = 12 + 12 = 24.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        const dots = (x0, y0, rows, cols, gap, colFn) => {
          let out = '';
          for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) out += `<circle cx="${x0 + c * gap}" cy="${y0 + r * gap}" r="${gap * 0.32}" fill="${colFn ? colFn(r, c) : '#38bdf8'}"/>`;
          return out;
        };
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Arrays showing 6 times 4, 4 times 6, and 6 times 4 split into two parts', 'Larik yang menunjukkan 6 kali 4, 4 kali 6, dan 6 kali 4 yang dipecah menjadi dua bagian')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.s{font:bold 12px system-ui,sans-serif;fill:currentColor}</style>
  ${dots(22, 30, 6, 4, 14)}
  <text x="43" y="128" text-anchor="middle" class="s">6 × 4 = 24</text>
  <text x="43" y="142" text-anchor="middle">${L('6 rows of 4', '6 baris berisi 4')}</text>
  <text x="100" y="72" text-anchor="middle">↻</text>
  ${dots(122, 44, 4, 6, 14)}
  <text x="157" y="128" text-anchor="middle" class="s">4 × 6 = 24</text>
  <text x="157" y="142" text-anchor="middle">${L('4 rows of 6', '4 baris berisi 6')}</text>
  ${dots(236, 30, 6, 4, 14, (r, c) => (c < 2 ? '#f59e0b' : '#a855f7'))}
  <line x1="257" y1="20" x2="257" y2="110" stroke="currentColor" stroke-width="1.5" stroke-dasharray="4 3"/>
  <text x="243" y="128" text-anchor="middle" fill="#f59e0b" class="s">6 × 2</text>
  <text x="271" y="128" text-anchor="middle" fill="#a855f7" class="s">6 × 2</text>
  <text x="257" y="142" text-anchor="middle">12 + 12 = 24</text>
  <text x="180" y="178" text-anchor="middle" class="s">${L('Same dots, three ways to count them', 'Titik yang sama, tiga cara menghitungnya')}</text>
  <text x="180" y="200" text-anchor="middle">${L('24 ÷ 6 = 4: share 24 dots into 6 rows, 4 in each row', '24 ÷ 6 = 4: bagikan 24 titik ke 6 baris, 4 tiap baris')}</text>
  <text x="180" y="220" text-anchor="middle">${L('Factors of 24: 1, 2, 3, 4, 6, 8, 12, 24', 'Faktor 24: 1, 2, 3, 4, 6, 8, 12, 24')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'An array of r rows and c columns shows r × c, and the product is the number of dots.',
        'Swapping rows and columns does not change the number of dots: 6 × 4 = 4 × 6.',
        'An array can be split into two parts: 6 × 4 = 6 × 2 + 6 × 2.',
        'Division is sharing the dots into equal rows: 24 ÷ 6 = 4.',
        'The factors of a number are the row and column sizes of every rectangle with that many dots.',
        'A number that only makes a one-row rectangle is prime.',
      ],
      id: [
        'Larik dengan r baris dan c kolom menunjukkan r × c, dan hasil kalinya adalah banyaknya titik.',
        'Menukar baris dan kolom tidak mengubah banyak titik: 6 × 4 = 4 × 6.',
        'Larik bisa dipecah menjadi dua bagian: 6 × 4 = 6 × 2 + 6 × 2.',
        'Pembagian adalah membagikan titik ke baris yang sama banyak: 24 ÷ 6 = 4.',
        'Faktor suatu bilangan adalah ukuran baris dan kolom setiap persegi panjang dengan titik sebanyak itu.',
        'Bilangan yang hanya bisa membentuk persegi panjang satu baris adalah bilangan prima.',
      ],
    },
    vocabulary: {
      en: [
        ['Array', 'Dots arranged in equal rows and columns to make a rectangle.'],
        ['Product', 'The answer to a multiplication. In 6 × 4 = 24, the product is 24.'],
        ['Commutative', 'Swapping the two numbers in a multiplication gives the same product: 6 × 4 = 4 × 6.'],
        ['Distributive', 'Splitting one number into parts and multiplying each part: 6 × 4 = 6 × 2 + 6 × 2.'],
        ['Factor', 'A number that divides another exactly. 4 is a factor of 24 because 24 ÷ 4 = 6 with nothing left.'],
        ['Prime number', 'A number bigger than 1 whose only factors are 1 and itself, such as 13.'],
      ],
      id: [
        ['Larik', 'Titik-titik yang disusun dalam baris dan kolom yang sama banyak sehingga membentuk persegi panjang.'],
        ['Hasil kali', 'Jawaban sebuah perkalian. Pada 6 × 4 = 24, hasil kalinya adalah 24.'],
        ['Komutatif', 'Menukar dua bilangan dalam perkalian memberi hasil kali yang sama: 6 × 4 = 4 × 6.'],
        ['Distributif', 'Memecah satu bilangan menjadi bagian-bagian dan mengalikan tiap bagian: 6 × 4 = 6 × 2 + 6 × 2.'],
        ['Faktor', 'Bilangan yang membagi habis bilangan lain. 4 adalah faktor 24 karena 24 ÷ 4 = 6 tanpa sisa.'],
        ['Bilangan prima', 'Bilangan lebih dari 1 yang faktornya hanya 1 dan dirinya sendiri, misalnya 13.'],
      ],
    },
    misconceptions: {
      en: [
        ['6 × 4 and 4 × 6 are different problems with different answers.', 'They have the same answer, 24. The array shows why: turning the rectangle on its side does not add or remove any dots.'],
        ['Multiplying always makes a number bigger.', 'Not always. 1 × 7 = 7 stays the same, and 0 × 7 = 0. An array with 0 rows has no dots at all.'],
        ['A number with more dots always has more factors.', 'No. 24 has 8 factors but 29 has only 2, because 29 dots cannot be made into any rectangle except a single row.'],
        ['Dividing means splitting into two.', 'Dividing means splitting into equal groups, and there can be any number of groups. 24 ÷ 6 means 6 equal groups.'],
      ],
      id: [
        ['6 × 4 dan 4 × 6 adalah soal berbeda dengan jawaban berbeda.', 'Jawabannya sama, 24. Larik menunjukkan alasannya: memutar persegi panjang ke samping tidak menambah atau mengurangi titik.'],
        ['Mengalikan selalu membuat bilangan lebih besar.', 'Tidak selalu. 1 × 7 = 7 tetap sama, dan 0 × 7 = 0. Larik dengan 0 baris tidak punya titik sama sekali.'],
        ['Bilangan dengan titik lebih banyak selalu punya faktor lebih banyak.', 'Tidak. 24 punya 8 faktor tetapi 29 hanya punya 2, karena 29 titik tidak bisa dibentuk menjadi persegi panjang apa pun kecuali satu baris.'],
        ['Membagi berarti memecah menjadi dua.', 'Membagi berarti memecah menjadi kelompok yang sama banyak, dan banyak kelompoknya bisa berapa saja. 24 ÷ 6 berarti 6 kelompok sama banyak.'],
      ],
    },
    realWorld: {
      en: [
        'Egg trays, chocolate bars and tiled floors are arrays: count one row and one column, then multiply.',
        'Chairs in a classroom set out in 5 rows of 6 seat 30 children, and the teacher can see that at a glance.',
        'Sharing 24 sweets fairly between 6 friends is 24 ÷ 6; the array shows every friend gets 4.',
        'A photo of 1200 × 800 pixels is an array of nearly a million tiny dots.',
      ],
      id: [
        'Wadah telur, cokelat batangan dan lantai berubin adalah larik: hitung satu baris dan satu kolom, lalu kalikan.',
        'Kursi di kelas yang disusun 5 baris berisi 6 bisa menampung 30 anak, dan guru bisa melihatnya sekilas.',
        'Membagi 24 permen secara adil kepada 6 teman adalah 24 ÷ 6; larik menunjukkan setiap teman mendapat 4.',
        'Foto berukuran 1.200 × 800 piksel adalah larik dari hampir satu juta titik kecil.',
      ],
    },
    questions: {
      en: [
        { q: 'An array has 7 rows and 3 columns. Write two multiplication facts and the number of dots.', a: '7 × 3 = 21 and 3 × 7 = 21. There are 21 dots either way.' },
        { q: 'How could you split 8 × 7 to make it easier to work out in your head?', a: 'Split the 7 into 5 and 2: 8 × 5 = 40 and 8 × 2 = 16, so 8 × 7 = 56. Any split works, as long as the parts add up to 7.' },
        { q: 'Find all the rectangles with exactly 36 dots. What are the factors of 36?', a: '1 × 36, 2 × 18, 3 × 12, 4 × 9 and 6 × 6. The factors are 1, 2, 3, 4, 6, 9, 12, 18 and 36. Notice 6 × 6 is a square, so 6 only counts once.' },
      ],
      id: [
        { q: 'Sebuah larik punya 7 baris dan 3 kolom. Tulis dua fakta perkalian dan banyaknya titik.', a: '7 × 3 = 21 dan 3 × 7 = 21. Ada 21 titik dengan cara mana pun.' },
        { q: 'Bagaimana kamu memecah 8 × 7 agar lebih mudah dihitung di kepala?', a: 'Pecah 7 menjadi 5 dan 2: 8 × 5 = 40 dan 8 × 2 = 16, jadi 8 × 7 = 56. Pemecahan apa pun berhasil, asalkan bagian-bagiannya berjumlah 7.' },
        { q: 'Temukan semua persegi panjang dengan tepat 36 titik. Apa saja faktor 36?', a: '1 × 36, 2 × 18, 3 × 12, 4 × 9 dan 6 × 6. Faktornya 1, 2, 3, 4, 6, 9, 12, 18 dan 36. Perhatikan 6 × 6 adalah persegi, jadi 6 hanya dihitung sekali.' },
      ],
    },
  },
};
