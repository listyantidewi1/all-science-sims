// Long-form text for the sim page aside, kept out of manifest.js.
export default {
  objectives: {
    en: [
      'Read and build numbers up to 10,000 using ones, tens, hundreds and thousands.',
      'Explain that ten blocks of one place always trade for one block of the next place.',
      'Compare two numbers by looking at the biggest place first and use the signs <, = and >.',
    ],
    id: [
      'Membaca dan menyusun bilangan sampai 10.000 dengan satuan, puluhan, ratusan dan ribuan.',
      'Menjelaskan bahwa sepuluh balok pada satu nilai tempat selalu ditukar dengan satu balok pada nilai tempat berikutnya.',
      'Membandingkan dua bilangan dengan melihat nilai tempat terbesar dahulu dan memakai tanda <, = dan >.',
    ],
  },
  tryThis: {
    en: [
      'Add nine ones. Now add one more. What happens to the cubes, and what does the number become?',
      'Build 2,345 with as few taps as you can. How many blocks of each kind did you need?',
      'Build 999 and then add one more one. Watch the trades happen one after another.',
      'Turn on Compare. Build 1,000 on one side and 999 on the other. Which has more blocks? Which is bigger?',
    ],
    id: [
      'Tambahkan sembilan satuan. Sekarang tambahkan satu lagi. Apa yang terjadi pada kubusnya, dan bilangannya menjadi berapa?',
      'Susun 2.345 dengan ketukan sesedikit mungkin. Berapa balok tiap jenis yang kamu perlukan?',
      'Susun 999 lalu tambahkan satu satuan lagi. Perhatikan penukaran terjadi berturut-turut.',
      'Nyalakan Bandingkan. Susun 1.000 di satu sisi dan 999 di sisi lain. Mana yang baloknya lebih banyak? Mana yang lebih besar?',
    ],
  },

  learn: {
    background: {
      en: [
        'Our numbers are built from only ten digits, 0 to 9, but we can write any number with them because of place value. Where a digit sits tells you what it is worth. In 2,345 the 2 is in the thousands place, so it means 2,000. The 3 means 300, the 4 means 40 and the 5 means 5. Reading from the right, each place is worth ten times the place before it: ones, tens, hundreds, thousands.',
        'The blocks make this visible. A one is a small cube. Ten small cubes lined up make a rod, which is a ten. Ten rods side by side make a flat square, which is a hundred. Ten flats stacked up make a big cube, which is a thousand. Every block is exactly ten of the block before it. That is why, in the sim, as soon as ten blocks gather in one column they slide across and become one block in the next column. This trade is what we do when we "carry" in addition.',
        'To compare two numbers, look at the biggest place first. 1,000 is bigger than 999 even though 999 uses many more blocks, because 1,000 has a thousand block and 999 has none. If the thousands are the same, look at the hundreds, and so on. The sim highlights the first place where the two numbers differ and shows the sign: < means "is smaller than", > means "is bigger than" and = means "is equal to". The open side of the sign always faces the bigger number.',
      ],
      id: [
        'Bilangan kita hanya dibangun dari sepuluh angka, 0 sampai 9, tetapi kita bisa menulis bilangan apa pun karena adanya nilai tempat. Letak sebuah angka menentukan nilainya. Pada 2.345, angka 2 berada di tempat ribuan, jadi nilainya 2.000. Angka 3 bernilai 300, angka 4 bernilai 40 dan angka 5 bernilai 5. Dibaca dari kanan, setiap tempat bernilai sepuluh kali tempat sebelumnya: satuan, puluhan, ratusan, ribuan.',
        'Balok membuat hal ini terlihat. Satu satuan adalah kubus kecil. Sepuluh kubus kecil yang berjajar membentuk batang, yaitu satu puluhan. Sepuluh batang yang berdampingan membentuk lempeng persegi, yaitu satu ratusan. Sepuluh lempeng yang ditumpuk membentuk kubus besar, yaitu satu ribuan. Setiap balok tepat sepuluh kali balok sebelumnya. Itulah sebabnya, di simulasi, begitu sepuluh balok berkumpul di satu kolom, mereka bergeser dan menjadi satu balok di kolom berikutnya. Penukaran ini adalah yang kita lakukan saat "menyimpan" dalam penjumlahan.',
        'Untuk membandingkan dua bilangan, lihat nilai tempat terbesar dahulu. 1.000 lebih besar daripada 999 walaupun 999 memakai jauh lebih banyak balok, karena 1.000 mempunyai balok ribuan dan 999 tidak. Jika ribuannya sama, lihat ratusannya, dan seterusnya. Simulasi menyorot nilai tempat pertama yang berbeda dan menampilkan tandanya: < berarti "lebih kecil dari", > berarti "lebih besar dari" dan = berarti "sama dengan". Sisi tanda yang terbuka selalu menghadap bilangan yang lebih besar.',
      ],
    },
    figure: {
      caption: {
        en: 'The four kinds of block. Each block is made of ten of the block to its right: ten ones make a ten, ten tens make a hundred, ten hundreds make a thousand. Below: 2,345 built from 2 thousands, 3 hundreds, 4 tens and 5 ones.',
        id: 'Empat jenis balok. Setiap balok terdiri dari sepuluh balok di sebelah kanannya: sepuluh satuan menjadi satu puluhan, sepuluh puluhan menjadi satu ratusan, sepuluh ratusan menjadi satu ribuan. Di bawah: 2.345 yang disusun dari 2 ribuan, 3 ratusan, 4 puluhan dan 5 satuan.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        const N = (en, id) => (lang === 'id' ? id : en);
        // flat (hundred): a 10x10 grid
        const grid = (x, y, s, col) => {
          let out = `<rect x="${x}" y="${y}" width="${s * 10}" height="${s * 10}" fill="${col}"/>`;
          for (let i = 1; i < 10; i++) out += `<line x1="${x + i * s}" y1="${y}" x2="${x + i * s}" y2="${y + s * 10}" stroke="#0b1220" stroke-width="0.5" opacity=".5"/><line x1="${x}" y1="${y + i * s}" x2="${x + s * 10}" y2="${y + i * s}" stroke="#0b1220" stroke-width="0.5" opacity=".5"/>`;
          return out;
        };
        const cube = (x, y, s, col) => `<rect x="${x}" y="${y}" width="${s}" height="${s}" fill="${col}"/><path d="M${x} ${y} l${s * 0.35} -${s * 0.35} h${s} l-${s * 0.35} ${s * 0.35} z" fill="${col}" opacity=".7"/><path d="M${x + s} ${y} l${s * 0.35} -${s * 0.35} v${s} l-${s * 0.35} ${s * 0.35} z" fill="${col}" opacity=".45"/>`;
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Ones, tens, hundreds and thousands blocks, and the number 2,345 built from them', 'Balok satuan, puluhan, ratusan dan ribuan, serta bilangan 2.345 yang disusun darinya')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.s{font:bold 13px system-ui,sans-serif;fill:currentColor}</style>
  ${cube(40, 50, 52, '#a855f7')}
  ${grid(130, 40, 5.2, '#3b82f6')}
  <rect x="215" y="40" width="7" height="52" fill="#f59e0b"/>
  <rect x="270" y="85" width="7" height="7" fill="#22c55e"/>
  <text x="66" y="118" text-anchor="middle">${L('thousand', 'ribuan')}</text><text x="66" y="131" text-anchor="middle" class="s">${N('1,000', '1.000')}</text>
  <text x="156" y="118" text-anchor="middle">${L('hundred', 'ratusan')}</text><text x="156" y="131" text-anchor="middle" class="s">100</text>
  <text x="218" y="118" text-anchor="middle">${L('ten', 'puluhan')}</text><text x="218" y="131" text-anchor="middle" class="s">10</text>
  <text x="273" y="118" text-anchor="middle">${L('one', 'satuan')}</text><text x="273" y="131" text-anchor="middle" class="s">1</text>
  <text x="112" y="70" text-anchor="middle">×10</text><text x="200" y="70" text-anchor="middle">×10</text><text x="248" y="70" text-anchor="middle">×10</text>
  <text x="112" y="82" text-anchor="middle">←</text><text x="200" y="82" text-anchor="middle">←</text><text x="248" y="82" text-anchor="middle">←</text>
  ${cube(30, 170, 30, '#a855f7')}${cube(66, 170, 30, '#a855f7')}
  ${grid(120, 170, 3, '#3b82f6')}${grid(154, 170, 3, '#3b82f6')}${grid(188, 170, 3, '#3b82f6')}
  <rect x="236" y="170" width="4" height="30" fill="#f59e0b"/><rect x="244" y="170" width="4" height="30" fill="#f59e0b"/><rect x="252" y="170" width="4" height="30" fill="#f59e0b"/><rect x="260" y="170" width="4" height="30" fill="#f59e0b"/>
  <rect x="285" y="196" width="4" height="4" fill="#22c55e"/><rect x="291" y="196" width="4" height="4" fill="#22c55e"/><rect x="297" y="196" width="4" height="4" fill="#22c55e"/><rect x="303" y="196" width="4" height="4" fill="#22c55e"/><rect x="309" y="196" width="4" height="4" fill="#22c55e"/>
  <text x="63" y="222" text-anchor="middle" class="s">2</text><text x="170" y="222" text-anchor="middle" class="s">3</text><text x="250" y="222" text-anchor="middle" class="s">4</text><text x="298" y="222" text-anchor="middle" class="s">5</text>
  <text x="180" y="156" text-anchor="middle" class="s">${N('2,345 = 2,000 + 300 + 40 + 5', '2.345 = 2.000 + 300 + 40 + 5')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'The place of a digit tells you its value: the 2 in 2,345 means 2,000.',
        'Each place is worth ten times the place to its right: ones, tens, hundreds, thousands.',
        'Ten blocks in one column always trade for one block in the next column.',
        'A number with fewer blocks can still be bigger: 1,000 beats 999.',
        'To compare numbers, look at the biggest place first; the sign opens towards the bigger number.',
      ],
      id: [
        'Tempat sebuah angka menentukan nilainya: angka 2 pada 2.345 bernilai 2.000.',
        'Setiap tempat bernilai sepuluh kali tempat di sebelah kanannya: satuan, puluhan, ratusan, ribuan.',
        'Sepuluh balok dalam satu kolom selalu ditukar dengan satu balok di kolom berikutnya.',
        'Bilangan dengan balok lebih sedikit bisa saja lebih besar: 1.000 mengalahkan 999.',
        'Untuk membandingkan bilangan, lihat nilai tempat terbesar dahulu; tanda terbuka ke arah bilangan yang lebih besar.',
      ],
    },
    vocabulary: {
      en: [
        ['Place value', 'The value of a digit because of where it sits in a number. In 45 the 4 is worth 40.'],
        ['Ones', 'The right-hand place. Shown as small cubes.'],
        ['Tens', 'The place to the left of the ones. One ten is a rod of ten small cubes.'],
        ['Hundreds', 'The next place. One hundred is a flat square of ten rods.'],
        ['Thousands', 'The next place. One thousand is a big cube of ten flats.'],
        ['Trade (regroup)', 'Swapping ten blocks of one kind for one block of the next kind, without changing the number.'],
      ],
      id: [
        ['Nilai tempat', 'Nilai sebuah angka karena letaknya dalam bilangan. Pada 45, angka 4 bernilai 40.'],
        ['Satuan', 'Tempat paling kanan. Digambarkan sebagai kubus kecil.'],
        ['Puluhan', 'Tempat di kiri satuan. Satu puluhan adalah batang dari sepuluh kubus kecil.'],
        ['Ratusan', 'Tempat berikutnya. Satu ratusan adalah lempeng persegi dari sepuluh batang.'],
        ['Ribuan', 'Tempat berikutnya. Satu ribuan adalah kubus besar dari sepuluh lempeng.'],
        ['Menukar (mengelompokkan ulang)', 'Menukar sepuluh balok satu jenis dengan satu balok jenis berikutnya tanpa mengubah bilangannya.'],
      ],
    },
    misconceptions: {
      en: [
        ['The number with more blocks is always bigger.', 'No. 999 uses 27 blocks and 1,000 uses just one, but 1,000 is bigger. What matters is the value of the blocks, not how many there are.'],
        ['In 2,045 the 0 does nothing, so you could leave it out.', 'The 0 holds the hundreds place open. Without it the number would read 245, which is much smaller. Zero is a place holder.'],
        ['The 4 in 2,345 means four.', 'It means four tens, which is 40. A digit on its own is just a symbol; its place gives it its value.'],
        ['When you trade ten ones for a ten, the number gets smaller because there are fewer blocks.', 'The number does not change at all. Ten ones and one ten are both worth exactly 10.'],
      ],
      id: [
        ['Bilangan dengan balok lebih banyak selalu lebih besar.', 'Tidak. 999 memakai 27 balok dan 1.000 hanya satu, tetapi 1.000 lebih besar. Yang penting adalah nilai baloknya, bukan banyaknya.'],
        ['Pada 2.045 angka 0 tidak berarti apa-apa, jadi boleh dihilangkan.', 'Angka 0 menjaga tempat ratusan tetap ada. Tanpa angka 0 bilangannya terbaca 245, jauh lebih kecil. Nol adalah penjaga tempat.'],
        ['Angka 4 pada 2.345 berarti empat.', 'Artinya empat puluhan, yaitu 40. Angka sendirian hanyalah lambang; tempatnya yang memberi nilai.'],
        ['Saat sepuluh satuan ditukar dengan satu puluhan, bilangannya mengecil karena baloknya lebih sedikit.', 'Bilangannya tidak berubah sama sekali. Sepuluh satuan dan satu puluhan sama-sama bernilai tepat 10.'],
      ],
    },
    realWorld: {
      en: [
        'Indonesian money works in places: ten Rp1.000 notes trade for one Rp10.000 note, and ten of those for one Rp100.000 note.',
        'A car\'s odometer rolls over like place value: when the ones wheel passes 9 it goes back to 0 and the tens wheel clicks forward.',
        'Prices in a shop, such as Rp2.345, are read place by place: two thousand three hundred forty-five rupiah.',
        'Ancient Romans had no zero and no place value, so writing 2,345 took them nine letters: MMCCCXLV.',
      ],
      id: [
        'Uang rupiah bekerja dengan nilai tempat: sepuluh lembar Rp1.000 ditukar dengan satu lembar Rp10.000, dan sepuluh lembar itu dengan satu lembar Rp100.000.',
        'Penunjuk jarak pada mobil berputar seperti nilai tempat: ketika roda satuan melewati 9, ia kembali ke 0 dan roda puluhan maju satu.',
        'Harga di toko, misalnya Rp2.345, dibaca tempat demi tempat: dua ribu tiga ratus empat puluh lima rupiah.',
        'Bangsa Romawi kuno tidak punya nol dan nilai tempat, sehingga menulis 2.345 memerlukan sembilan huruf: MMCCCXLV.',
      ],
    },
    questions: {
      en: [
        { q: 'You have 3 flats, 12 rods and 4 small cubes. What number is that after trading?', a: '424. Twelve rods are 120, so ten of them trade for one more flat: 4 flats, 2 rods, 4 cubes = 400 + 20 + 4 = 424.' },
        { q: 'Which is bigger, 3,099 or 3,100? Explain by looking at the places.', a: '3,100. The thousands are the same (3), so look at the hundreds: 1 hundred beats 0 hundreds. We never need to look at the 99.' },
        { q: 'How many ones blocks would you need to build 1,000 without any trading?', a: 'One thousand small cubes. That is why we trade: one big cube says the same thing with one block.' },
      ],
      id: [
        { q: 'Kamu punya 3 lempeng, 12 batang dan 4 kubus kecil. Setelah ditukar, bilangan apa itu?', a: '424. Dua belas batang bernilai 120, jadi sepuluh di antaranya ditukar dengan satu lempeng lagi: 4 lempeng, 2 batang, 4 kubus = 400 + 20 + 4 = 424.' },
        { q: 'Mana yang lebih besar, 3.099 atau 3.100? Jelaskan dengan melihat nilai tempatnya.', a: '3.100. Ribuannya sama (3), jadi lihat ratusannya: 1 ratusan mengalahkan 0 ratusan. Kita tidak perlu melihat angka 99.' },
        { q: 'Berapa balok satuan yang kamu perlukan untuk menyusun 1.000 tanpa menukar?', a: 'Seribu kubus kecil. Itulah gunanya menukar: satu kubus besar menyatakan hal yang sama dengan satu balok saja.' },
      ],
    },
  },
};
