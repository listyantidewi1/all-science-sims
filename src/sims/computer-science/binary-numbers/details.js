// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Convert binary ↔ decimal by summing place values.',
      'See how doubling the bit-width quadruples (etc.) the maximum representable number.',
      'Connect binary to hexadecimal: 4 bits = one hex digit.',
    ],
    id: [
      'Mengonversi biner ↔ desimal dengan menjumlahkan nilai tempat.',
      'Melihat bagaimana menggandakan lebar bit melipatempatkan (dst.) angka maksimum.',
      'Menghubungkan biner dengan heksadesimal: 4 bit = satu digit heksa.',
    ],
  },
  tryThis: {
    en: [
      'Set 8 bits to 11111111 — value 255 = 2⁸ − 1.',
      'Toggle just bit 7 — value 128. Toggle bit 0 — adds 1.',
      'Switch to 16-bit and represent 1024 (one bit on at position 10).',
    ],
    id: [
      'Atur 8 bit ke 11111111 — nilai 255 = 2⁸ − 1.',
      'Aktifkan bit 7 saja — nilai 128. Aktifkan bit 0 — tambah 1.',
      'Beralih ke 16-bit dan representasikan 1024 (satu bit aktif di posisi 10).',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'The numbers we use every day are written in base ten. Each place is worth ten times the place to its right: ones, tens, hundreds, thousands. The number 347 means 3 hundreds, 4 tens and 7 ones. Computers do not use ten symbols, because their circuits work with switches that are either off or on. They write numbers in base two, called binary, with only the digits 0 and 1. Each place is worth twice the place to its right: 1, 2, 4, 8, 16, 32, 64, 128 and so on. A single binary digit is called a bit, and eight bits together make a byte.',
        'Reading a binary number is the same idea as reading a decimal one. Write the place values above the digits, then add up the place values that have a 1 under them. For example 0100 1101 has 1s under 64, 8, 4 and 1, so it is 64 + 8 + 4 + 1 = 77. Going the other way, to write 77 in binary, start from the biggest place value that fits: 64 fits (13 left), 32 and 16 do not, 8 fits (5 left), 4 fits (1 left), 2 does not, 1 fits. In the sim, every bit is a switch you can click; the place value is printed above it, and the decimal, hexadecimal and binary readings update at once, so you can check each step of the sum.',
        'The bit-width menu chooses how many switches you have: 4, 8, 16 or 32. With all switches on, every place value is added, and the total is always one less than the next place value: four bits give at most 15, eight bits give 255, sixteen bits give 65 535. Adding one more bit doubles the number of different values you can represent, so adding eight bits multiplies it by 256. The +1 button counts upward and shows the carry: 0111 + 1 becomes 1000, just as 0999 + 1 becomes 1000 in decimal. Press +1 at the maximum and the value wraps around to zero, because there is no ninth bit for the carry to go into. This is called overflow, and real programs must guard against it.',
        'Hexadecimal, or hex, is base sixteen, with digits 0 to 9 and then A to F for ten to fifteen. It is popular because one hex digit stands for exactly four bits: 0100 is 4 and 1101 is D, so 0100 1101 is written 4D. Hex is just a shorter way of writing the same bits, not a different number. The sim keeps things simple: it shows only whole numbers from zero upward and never negative numbers or fractions, which computers store using other schemes, and the decimal box simply clamps anything outside the range to the nearest limit.',
      ],
      id: [
        'Bilangan yang kita pakai sehari-hari ditulis dalam basis sepuluh. Tiap tempat bernilai sepuluh kali tempat di kanannya: satuan, puluhan, ratusan, ribuan. Bilangan 347 berarti 3 ratusan, 4 puluhan, dan 7 satuan. Komputer tidak memakai sepuluh lambang, karena rangkaiannya bekerja dengan sakelar yang hanya bisa mati atau hidup. Komputer menulis bilangan dalam basis dua, yang disebut biner, hanya dengan angka 0 dan 1. Tiap tempat bernilai dua kali tempat di kanannya: 1, 2, 4, 8, 16, 32, 64, 128, dan seterusnya. Satu angka biner disebut bit, dan delapan bit bersama membentuk satu byte.',
        'Membaca bilangan biner memakai gagasan yang sama dengan membaca bilangan desimal. Tulis nilai tempat di atas tiap angka, lalu jumlahkan nilai tempat yang di bawahnya ada angka 1. Misalnya 0100 1101 memiliki angka 1 di bawah 64, 8, 4, dan 1, sehingga nilainya 64 + 8 + 4 + 1 = 77. Sebaliknya, untuk menulis 77 dalam biner, mulailah dari nilai tempat terbesar yang muat: 64 muat (sisa 13), 32 dan 16 tidak, 8 muat (sisa 5), 4 muat (sisa 1), 2 tidak, 1 muat. Dalam simulasi, tiap bit adalah sakelar yang bisa diklik; nilai tempatnya tercetak di atasnya, dan pembacaan desimal, heksadesimal, dan biner langsung terbarui, sehingga Anda bisa memeriksa tiap langkah penjumlahan.',
        'Menu lebar bit memilih berapa banyak sakelar yang Anda punya: 4, 8, 16, atau 32. Dengan semua sakelar hidup, semua nilai tempat dijumlahkan, dan totalnya selalu satu kurang dari nilai tempat berikutnya: empat bit paling besar 15, delapan bit 255, enam belas bit 65.535. Menambah satu bit menggandakan banyaknya nilai berbeda yang bisa diwakili, sehingga menambah delapan bit mengalikannya dengan 256. Tombol +1 menghitung naik dan memperlihatkan proses menyimpan: 0111 + 1 menjadi 1000, sama seperti 0999 + 1 menjadi 1000 dalam desimal. Tekan +1 pada nilai maksimum dan nilainya berputar kembali ke nol, karena tidak ada bit kesembilan untuk menampung simpanan. Ini disebut overflow, dan program sungguhan harus berjaga-jaga terhadapnya.',
        'Heksadesimal, atau heksa, adalah basis enam belas, dengan angka 0 sampai 9 lalu A sampai F untuk sepuluh sampai lima belas. Heksa populer karena satu digit heksa mewakili tepat empat bit: 0100 adalah 4 dan 1101 adalah D, sehingga 0100 1101 ditulis 4D. Heksa hanyalah cara lebih ringkas menulis bit yang sama, bukan bilangan yang berbeda. Simulasi ini dibuat sederhana: ia hanya menampilkan bilangan bulat dari nol ke atas dan tidak pernah bilangan negatif atau pecahan, yang disimpan komputer dengan cara lain, dan kotak desimal hanya membatasi angka di luar jangkauan ke batas terdekat.',
      ],
    },
    figure: {
      caption: {
        en: 'Eight bits with their place values. Add the place values under each 1: 64 + 8 + 4 + 1 = 77. Grouping the bits in fours gives the hex digits 4 and D.',
        id: 'Delapan bit dengan nilai tempatnya. Jumlahkan nilai tempat di bawah tiap angka 1: 64 + 8 + 4 + 1 = 77. Mengelompokkan bit empat-empat memberi digit heksa 4 dan D.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        const bits = [0, 1, 0, 0, 1, 1, 0, 1];
        const cells = bits.map((b, i) => {
          const x = 20 + i * 40;
          const pv = 2 ** (7 - i);
          return `<text x="${x + 16}" y="52" text-anchor="middle" class="s">2^${7 - i}</text><text x="${x + 16}" y="68" text-anchor="middle" fill="#f59e0b" font-weight="700">${pv}</text><rect x="${x}" y="78" width="32" height="32" rx="4" fill="${b ? '#10b981' : 'none'}" stroke="currentColor" stroke-width="1.2" opacity="${b ? 1 : 0.6}"/><text x="${x + 16}" y="101" text-anchor="middle" font-size="18" font-weight="700" fill="${b ? '#fff' : 'currentColor'}">${b}</text><text x="${x + 16}" y="130" text-anchor="middle" class="s" fill="${b ? '#10b981' : 'currentColor'}" opacity="${b ? 1 : 0.35}">${b ? pv : '·'}</text>`;
        }).join('');
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Binary place values for the byte 01001101', 'Nilai tempat biner untuk byte 01001101')}">
  <style>text{font:12px system-ui,sans-serif;fill:currentColor}.s{font-size:10px;opacity:.7}.m{fill:none;stroke:currentColor;stroke-width:1;opacity:.35}</style>
  <text x="20" y="22" font-weight="700">${L('Each place is worth twice the one to its right', 'Tiap tempat bernilai dua kali tempat di kanannya')}</text>
  <text x="20" y="38" class="s">${L('place value', 'nilai tempat')}</text>
  ${cells}
  <text x="20" y="156" class="s">${L('add the values under each 1:', 'jumlahkan nilai di bawah tiap angka 1:')}</text>
  <text x="20" y="176" font-weight="700" fill="#10b981">64 + 8 + 4 + 1 = 77</text>
  <path d="M20 190 h152 v10 h-152 z" fill="#3b82f6" opacity=".18"/>
  <path d="M180 190 h152 v10 h-152 z" fill="#8b5cf6" opacity=".18"/>
  <text x="96" y="216" text-anchor="middle" class="s">0100 = 4</text>
  <text x="256" y="216" text-anchor="middle" class="s">1101 = 13 = D</text>
  <text x="20" y="236" class="s">${L('hex groups of 4 bits: 0x4D', 'kelompok heksa 4 bit: 0x4D')}</text>
  <text x="340" y="236" text-anchor="end" fill="#f59e0b" class="s">${L('max for 8 bits: 255', 'maks 8 bit: 255')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Binary uses only the digits 0 and 1, and each place is worth twice the place to its right.',
        'To read a binary number, add the place values that have a 1 under them.',
        'With all bits on, the value is one less than the next place value: 8 bits reach 255, 16 bits reach 65 535.',
        'Adding one bit doubles the number of values that can be represented.',
        'One hexadecimal digit stands for exactly four bits, so hex is a shorthand for binary, not a different number.',
      ],
      id: [
        'Biner hanya memakai angka 0 dan 1, dan tiap tempat bernilai dua kali tempat di kanannya.',
        'Untuk membaca bilangan biner, jumlahkan nilai tempat yang di bawahnya ada angka 1.',
        'Dengan semua bit hidup, nilainya satu kurang dari nilai tempat berikutnya: 8 bit mencapai 255, 16 bit mencapai 65.535.',
        'Menambah satu bit menggandakan banyaknya nilai yang dapat diwakili.',
        'Satu digit heksadesimal mewakili tepat empat bit, sehingga heksa adalah singkatan untuk biner, bukan bilangan yang berbeda.',
      ],
    },
    vocabulary: {
      en: [
        ['Bit', 'A single binary digit, either 0 or 1; the smallest unit of information in a computer.'],
        ['Byte', 'A group of eight bits, able to hold any whole number from 0 to 255.'],
        ['Place value', 'What a digit is worth because of its position: 1, 2, 4, 8, 16... in binary.'],
        ['Base (radix)', 'The number of different digits a number system uses: ten for decimal, two for binary, sixteen for hexadecimal.'],
        ['Most significant bit', 'The leftmost bit, with the largest place value; the rightmost is the least significant bit.'],
        ['Hexadecimal', 'Base sixteen, with digits 0–9 and A–F; each digit represents four bits.'],
        ['Overflow', 'What happens when a result needs more bits than are available; in the sim, +1 at the maximum wraps to 0.'],
      ],
      id: [
        ['Bit', 'Satu angka biner, 0 atau 1; satuan informasi terkecil dalam komputer.'],
        ['Byte', 'Kelompok delapan bit, yang dapat menyimpan bilangan bulat dari 0 sampai 255.'],
        ['Nilai tempat', 'Nilai sebuah angka karena posisinya: 1, 2, 4, 8, 16... dalam biner.'],
        ['Basis', 'Banyaknya angka berbeda yang dipakai suatu sistem bilangan: sepuluh untuk desimal, dua untuk biner, enam belas untuk heksadesimal.'],
        ['Bit paling berarti', 'Bit paling kiri, dengan nilai tempat terbesar; yang paling kanan adalah bit paling tidak berarti.'],
        ['Heksadesimal', 'Basis enam belas, dengan angka 0–9 dan A–F; tiap digit mewakili empat bit.'],
        ['Overflow', 'Yang terjadi ketika hasil membutuhkan lebih banyak bit daripada yang tersedia; dalam simulasi, +1 pada nilai maksimum berputar ke 0.'],
      ],
    },
    misconceptions: {
      en: [
        ['Binary 10 means ten.', 'Binary 10 has a 1 in the twos place and a 0 in the ones place, so it is two. The same digits mean different amounts in different bases, which is why people write 0b10 or say "one-zero in binary".'],
        ['Eight bits can hold 256 as the largest value.', 'Eight bits give 256 different patterns, but one of them is zero, so the largest value is 255. In general the maximum is one less than the next place value.'],
        ['A number with more digits is always bigger.', 'Only within the same base. Binary 1000 (eight) is smaller than decimal 9. Compare values, not digit counts, when the bases differ.'],
        ['Hexadecimal is a different kind of number that computers use instead of binary.', 'Hex is a compact way of writing the same bits for humans. 0x4D and 01001101 are the same pattern of switches; the computer only ever stores the bits.'],
      ],
      id: [
        ['Biner 10 berarti sepuluh.', 'Biner 10 memiliki angka 1 di tempat duaan dan 0 di tempat satuan, sehingga nilainya dua. Angka yang sama berarti jumlah yang berbeda dalam basis yang berbeda, karena itulah orang menulis 0b10 atau menyebut "satu-nol dalam biner".'],
        ['Delapan bit dapat menampung 256 sebagai nilai terbesar.', 'Delapan bit memberi 256 pola berbeda, tetapi salah satunya adalah nol, sehingga nilai terbesarnya 255. Secara umum nilai maksimum adalah satu kurang dari nilai tempat berikutnya.'],
        ['Bilangan dengan lebih banyak angka selalu lebih besar.', 'Hanya dalam basis yang sama. Biner 1000 (delapan) lebih kecil daripada desimal 9. Bandingkan nilainya, bukan banyaknya angka, bila basisnya berbeda.'],
        ['Heksadesimal adalah jenis bilangan lain yang dipakai komputer sebagai ganti biner.', 'Heksa adalah cara ringkas menulis bit yang sama untuk manusia. 0x4D dan 01001101 adalah pola sakelar yang sama; komputer hanya menyimpan bit-nya.'],
      ],
    },
    realWorld: {
      en: [
        'Screen colours are stored as three bytes, one each for red, green and blue, which is why web colours look like #3B82F6: each pair of hex digits is one byte from 0 to 255.',
        'Text is stored as numbers too: in the ASCII code the capital letter M is 77, or 01001101 in binary.',
        'An IPv4 internet address such as 192.168.1.1 is four bytes written in decimal, each between 0 and 255.',
        'Early video games stored scores or item counts in one byte, so counting past 255 wrapped back to 0, a real example of overflow.',
      ],
      id: [
        'Warna layar disimpan sebagai tiga byte, masing-masing untuk merah, hijau, dan biru, karena itulah warna web tampak seperti #3B82F6: tiap pasangan digit heksa adalah satu byte dari 0 sampai 255.',
        'Teks juga disimpan sebagai bilangan: dalam kode ASCII huruf kapital M adalah 77, atau 01001101 dalam biner.',
        'Alamat internet IPv4 seperti 192.168.1.1 adalah empat byte yang ditulis dalam desimal, masing-masing antara 0 dan 255.',
        'Permainan video lama menyimpan skor atau jumlah barang dalam satu byte, sehingga menghitung melewati 255 berputar kembali ke 0, contoh nyata overflow.',
      ],
    },
    questions: {
      en: [
        { q: 'What decimal value is the byte 1010 0110?', a: 'The 1s sit under 128, 32, 4 and 2, so the value is 128 + 32 + 4 + 2 = 166. In hex, 1010 is A and 0110 is 6, so it is 0xA6.' },
        { q: 'Write 45 in 8-bit binary. Which bits do you switch on?', a: '45 = 32 + 8 + 4 + 1, so switch on the bits with place values 32, 8, 4 and 1: 0010 1101. Check: 32 + 8 + 4 + 1 = 45.' },
        { q: 'In 8-bit mode the value shows 255 and you press +1. What happens and why? What would happen with 16 bits?', a: 'The value wraps to 0. Adding 1 to 1111 1111 should give 1 0000 0000, which needs nine bits; the ninth bit has nowhere to go, so only the eight zeros remain. This is overflow. With 16 bits, 255 + 1 is simply 256, or 0000 0001 0000 0000, because there is room for the carry.' },
      ],
      id: [
        { q: 'Berapa nilai desimal byte 1010 0110?', a: 'Angka 1 berada di bawah 128, 32, 4, dan 2, sehingga nilainya 128 + 32 + 4 + 2 = 166. Dalam heksa, 1010 adalah A dan 0110 adalah 6, sehingga ditulis 0xA6.' },
        { q: 'Tulis 45 dalam biner 8 bit. Bit mana yang Anda nyalakan?', a: '45 = 32 + 8 + 4 + 1, sehingga nyalakan bit dengan nilai tempat 32, 8, 4, dan 1: 0010 1101. Periksa: 32 + 8 + 4 + 1 = 45.' },
        { q: 'Pada mode 8 bit nilainya menunjukkan 255 dan Anda menekan +1. Apa yang terjadi dan mengapa? Apa yang terjadi pada 16 bit?', a: 'Nilainya berputar ke 0. Menambah 1 pada 1111 1111 seharusnya memberi 1 0000 0000, yang membutuhkan sembilan bit; bit kesembilan tidak punya tempat, sehingga hanya delapan angka nol yang tersisa. Inilah overflow. Dengan 16 bit, 255 + 1 cukup menjadi 256, atau 0000 0001 0000 0000, karena ada ruang untuk simpanannya.' },
      ],
    },
  },
};
