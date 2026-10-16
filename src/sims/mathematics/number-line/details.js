// Long-form text for the sim page aside, kept out of manifest.js.
export default {
  objectives: {
    en: [
      'Count forwards and backwards on a number line from 0 to 100 in ones and in tens.',
      'Add and subtract by jumping: a jump of 10 moves one big step, a jump of 1 moves one small step.',
      'Break a two-digit number into tens and ones, for example 47 = 40 + 7.',
    ],
    id: [
      'Membilang maju dan mundur pada garis bilangan 0 sampai 100 secara satuan dan puluhan.',
      'Menjumlahkan dan mengurangkan dengan melompat: lompatan 10 adalah satu langkah besar, lompatan 1 adalah satu langkah kecil.',
      'Mengurai bilangan dua angka menjadi puluhan dan satuan, misalnya 47 = 40 + 7.',
    ],
  },
  tryThis: {
    en: [
      'Start at 0 and press +10 four times. Where is the frog? Now press +1 seven times. What number did you make?',
      'Press New target. Before you jump, say how many +10 and +1 jumps you need. Then test your plan.',
      'Jump to 53, then press −10. Did the ones digit change? Try −1 and look again.',
      'Turn on Tens and ones. Jump around and watch the blocks: when does a new long rod appear?',
    ],
    id: [
      'Mulai dari 0 dan tekan +10 empat kali. Di mana kataknya? Lalu tekan +1 tujuh kali. Bilangan apa yang kamu buat?',
      'Tekan Sasaran baru. Sebelum melompat, katakan berapa lompatan +10 dan +1 yang kamu perlukan. Lalu uji rencanamu.',
      'Lompat ke 53, lalu tekan −10. Apakah angka satuannya berubah? Coba −1 dan lihat lagi.',
      'Nyalakan Puluhan dan satuan. Melompatlah ke mana saja dan perhatikan baloknya: kapan batang panjang baru muncul?',
    ],
  },

  learn: {
    background: {
      en: [
        'A number line is a straight line with numbers written in order. 0 is at the left end and 100 is at the right end. Every small mark is one more than the mark before it. Bigger numbers are always further to the right, so you can see at a glance that 62 is more than 48.',
        'The frog shows how adding and taking away work. Pressing +1 makes the frog hop one small step to the right. Pressing +10 makes it hop one big step to the right, past ten small marks at once. Pressing −1 and −10 hop to the left. Jumping is faster than counting one by one: to go from 23 to 53 you only need three big jumps of 10.',
        'Every number from 10 to 99 has two digits. The left digit says how many tens, and the right digit says how many ones. The number 47 means 4 tens and 7 ones, so 47 = 40 + 7. When you turn on "tens and ones", the sim draws each ten as a long rod and each one as a small cube. Watch what happens at 49 + 1: ten small cubes become one new rod, and the number becomes 50.',
      ],
      id: [
        'Garis bilangan adalah garis lurus dengan bilangan yang ditulis berurutan. 0 ada di ujung kiri dan 100 di ujung kanan. Setiap garis kecil nilainya satu lebih banyak daripada garis sebelumnya. Bilangan yang lebih besar selalu berada lebih ke kanan, jadi kamu bisa langsung melihat bahwa 62 lebih banyak daripada 48.',
        'Si katak menunjukkan cara kerja penjumlahan dan pengurangan. Menekan +1 membuat katak melompat satu langkah kecil ke kanan. Menekan +10 membuatnya melompat satu langkah besar ke kanan, melewati sepuluh garis kecil sekaligus. Menekan −1 dan −10 membuatnya melompat ke kiri. Melompat lebih cepat daripada membilang satu-satu: dari 23 ke 53 cukup tiga lompatan besar 10.',
        'Setiap bilangan dari 10 sampai 99 mempunyai dua angka. Angka kiri menunjukkan banyaknya puluhan, dan angka kanan menunjukkan banyaknya satuan. Bilangan 47 berarti 4 puluhan dan 7 satuan, jadi 47 = 40 + 7. Saat kamu menyalakan "puluhan dan satuan", simulasi menggambar setiap puluhan sebagai batang panjang dan setiap satuan sebagai kubus kecil. Perhatikan yang terjadi pada 49 + 1: sepuluh kubus kecil menjadi satu batang baru, dan bilangannya menjadi 50.',
      ],
    },
    figure: {
      caption: {
        en: 'The frog starts at 23. Three big jumps of +10 land on 53, then two small jumps of +1 land on 55. Below: 55 is 5 tens (rods) and 5 ones (cubes), so 55 = 50 + 5.',
        id: 'Katak mulai dari 23. Tiga lompatan besar +10 mendarat di 53, lalu dua lompatan kecil +1 mendarat di 55. Di bawah: 55 adalah 5 puluhan (batang) dan 5 satuan (kubus), jadi 55 = 50 + 5.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        const x = (n) => 20 + n * 3.2;              // 0..100 maps to 20..340
        const ticks = [];
        for (let n = 0; n <= 100; n += 10) ticks.push(`<line x1="${x(n)}" y1="104" x2="${x(n)}" y2="116" class="m"/><text x="${x(n)}" y="132" text-anchor="middle">${n}</text>`);
        const arc = (a, b, h, col) => `<path d="M${x(a)} 108 Q${(x(a) + x(b)) / 2} ${108 - h} ${x(b)} 108" fill="none" stroke="${col}" stroke-width="2"/>`;
        const rods = [];
        for (let i = 0; i < 5; i++) rods.push(`<rect x="${40 + i * 18}" y="160" width="12" height="60" rx="2" fill="#f59e0b"/>`);
        const cubes = [];
        for (let i = 0; i < 5; i++) cubes.push(`<rect x="${150 + i * 16}" y="208" width="12" height="12" rx="2" fill="#22c55e"/>`);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Frog jumping on a number line and the tens and ones of 55', 'Katak melompat di garis bilangan dan puluhan serta satuan dari 55')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.m{stroke:currentColor;stroke-width:1.2}.s{font:bold 12px system-ui,sans-serif;fill:currentColor}</style>
  <line x1="${x(0)}" y1="110" x2="${x(100)}" y2="110" class="m"/>
  ${ticks.join('')}
  ${arc(23, 33, 40, '#f59e0b')}${arc(33, 43, 40, '#f59e0b')}${arc(43, 53, 40, '#f59e0b')}
  ${arc(53, 54, 14, '#22c55e')}${arc(54, 55, 14, '#22c55e')}
  <text x="${x(38)}" y="58" text-anchor="middle" fill="#f59e0b">+10 +10 +10</text>
  <text x="${x(54)}" y="88" text-anchor="middle" fill="#22c55e">+1 +1</text>
  <circle cx="${x(23)}" cy="98" r="7" fill="#22c55e"/><text x="${x(23)}" y="86" text-anchor="middle" class="s">23</text>
  <circle cx="${x(55)}" cy="98" r="7" fill="#22c55e"/><text x="${x(55)}" y="86" text-anchor="middle" class="s">55</text>
  ${rods.join('')}
  ${cubes.join('')}
  <text x="76" y="236" text-anchor="middle">${L('5 tens = 50', '5 puluhan = 50')}</text>
  <text x="188" y="236" text-anchor="middle">${L('5 ones = 5', '5 satuan = 5')}</text>
  <text x="300" y="195" text-anchor="middle" class="s">55 = 50 + 5</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'On a number line, numbers to the right are bigger and numbers to the left are smaller.',
        '+1 is one small step; +10 is one big step over ten small marks.',
        'Adding moves the frog to the right; taking away moves it to the left.',
        'A two-digit number is made of tens and ones: 47 = 40 + 7.',
        'Jumping in tens first and then in ones is a fast way to add and subtract.',
      ],
      id: [
        'Pada garis bilangan, bilangan di sebelah kanan lebih besar dan di sebelah kiri lebih kecil.',
        '+1 adalah satu langkah kecil; +10 adalah satu langkah besar melewati sepuluh garis kecil.',
        'Menjumlahkan menggerakkan katak ke kanan; mengurangkan menggerakkannya ke kiri.',
        'Bilangan dua angka terdiri dari puluhan dan satuan: 47 = 40 + 7.',
        'Melompat puluhan dahulu lalu satuan adalah cara cepat menjumlahkan dan mengurangkan.',
      ],
    },
    vocabulary: {
      en: [
        ['Number line', 'A straight line with numbers written in order, used to show counting, adding and taking away.'],
        ['Jump', 'One move of the frog. A jump of 10 passes ten marks; a jump of 1 passes one mark.'],
        ['Tens', 'Groups of ten. In 47 there are 4 tens, which is 40.'],
        ['Ones', 'Single units left over after making tens. In 47 there are 7 ones.'],
        ['Target', 'The number with the flag that the frog is trying to land on.'],
      ],
      id: [
        ['Garis bilangan', 'Garis lurus dengan bilangan yang ditulis berurutan, dipakai untuk menunjukkan membilang, menjumlahkan dan mengurangkan.'],
        ['Lompatan', 'Satu gerakan katak. Lompatan 10 melewati sepuluh garis; lompatan 1 melewati satu garis.'],
        ['Puluhan', 'Kelompok sepuluh. Dalam 47 ada 4 puluhan, yaitu 40.'],
        ['Satuan', 'Satu-satuan yang tersisa setelah membentuk puluhan. Dalam 47 ada 7 satuan.'],
        ['Sasaran', 'Bilangan dengan bendera yang harus didarati katak.'],
      ],
    },
    misconceptions: {
      en: [
        ['The numbers on the line are just labels; the gaps between them do not matter.', 'The gaps matter a lot. Every gap between two neighbouring marks is exactly one. That is why a jump of 10 always covers the same distance wherever you start.'],
        ['The 4 in 47 means four.', 'The 4 in 47 means four tens, which is 40. Only the 7 means seven ones. So 47 is 40 + 7, not 4 + 7.'],
        ['Taking away 10 changes the ones digit.', 'Taking away 10 only changes the tens digit. 53 − 10 = 43: the 3 stays, the 5 becomes a 4.'],
      ],
      id: [
        ['Bilangan pada garis hanya label; jarak di antaranya tidak penting.', 'Jaraknya sangat penting. Setiap jarak antara dua garis yang bersebelahan tepat bernilai satu. Itulah sebabnya lompatan 10 selalu sama panjangnya dari mana pun kamu mulai.'],
        ['Angka 4 pada 47 berarti empat.', 'Angka 4 pada 47 berarti empat puluhan, yaitu 40. Hanya angka 7 yang berarti tujuh satuan. Jadi 47 adalah 40 + 7, bukan 4 + 7.'],
        ['Mengurangi 10 mengubah angka satuan.', 'Mengurangi 10 hanya mengubah angka puluhan. 53 − 10 = 43: angka 3 tetap, angka 5 menjadi 4.'],
      ],
    },
    realWorld: {
      en: [
        'A ruler is a number line: the centimetre marks are the ones, and the longer marks every 10 cm are the tens.',
        'House numbers along a street go up like a number line, so you can tell which way to walk to find number 58.',
        'Counting money in Rp10.000 notes and Rp1.000 notes is jumping in tens and ones.',
        'The page numbers in a book let you jump forward ten pages at a time to find your place.',
      ],
      id: [
        'Penggaris adalah garis bilangan: garis sentimeter adalah satuan, dan garis yang lebih panjang setiap 10 cm adalah puluhan.',
        'Nomor rumah di sepanjang jalan bertambah seperti garis bilangan, sehingga kamu tahu harus berjalan ke arah mana untuk mencari nomor 58.',
        'Menghitung uang dengan lembaran Rp10.000 dan Rp1.000 sama dengan melompat puluhan dan satuan.',
        'Nomor halaman buku memungkinkanmu melompat sepuluh halaman sekaligus untuk menemukan halamanmu.',
      ],
    },
    questions: {
      en: [
        { q: 'The frog is at 36. You press +10 twice and +1 three times. Where does it land?', a: 'At 59. Two jumps of 10 take it to 56, and three jumps of 1 take it to 59.' },
        { q: 'The frog is at 72 and the target is 45. What is the shortest way to get there?', a: 'Press −10 twice to reach 52, then −1 seven times to reach 45. That is 9 jumps. (You could also press −10 three times to 42 and then +1 three times: only 6 jumps!)' },
        { q: 'Turn on tens and ones and jump to 80. How many rods and how many cubes do you see? Why?', a: '8 rods and 0 cubes. 80 is 8 tens and no ones, so 80 = 80 + 0.' },
      ],
      id: [
        { q: 'Katak berada di 36. Kamu menekan +10 dua kali dan +1 tiga kali. Di mana katak mendarat?', a: 'Di 59. Dua lompatan 10 membawanya ke 56, dan tiga lompatan 1 membawanya ke 59.' },
        { q: 'Katak berada di 72 dan sasarannya 45. Bagaimana cara tercepat sampai di sana?', a: 'Tekan −10 dua kali sampai 52, lalu −1 tujuh kali sampai 45. Itu 9 lompatan. (Kamu juga bisa menekan −10 tiga kali sampai 42 lalu +1 tiga kali: hanya 6 lompatan!)' },
        { q: 'Nyalakan puluhan dan satuan lalu lompat ke 80. Berapa batang dan berapa kubus yang kamu lihat? Mengapa?', a: '8 batang dan 0 kubus. 80 adalah 8 puluhan tanpa satuan, jadi 80 = 80 + 0.' },
      ],
    },
  },
};
