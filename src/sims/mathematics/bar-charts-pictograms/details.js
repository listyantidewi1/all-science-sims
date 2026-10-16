// Long-form text for the sim page aside, kept out of manifest.js.
export default {
  objectives: {
    en: [
      'Collect data from a simple survey and record it with tally marks in groups of five.',
      'Show the same data as a pictogram and as a bar chart, and read a key where one picture stands for one or two votes.',
      'Answer questions from a graph: which is most, which is least, and how many more one group has than another.',
    ],
    id: [
      'Mengumpulkan data dari survei sederhana dan mencatatnya dengan turus dalam kelompok lima.',
      'Menampilkan data yang sama sebagai piktogram dan diagram batang, dan membaca keterangan ketika satu gambar mewakili satu atau dua suara.',
      'Menjawab pertanyaan dari diagram: mana yang paling banyak, mana yang paling sedikit, dan berapa lebih banyak satu kelompok daripada yang lain.',
    ],
  },
  tryThis: {
    en: [
      'Ask everyone in your class their favourite fruit and tap a vote for each answer. Which bar is tallest?',
      'Add votes until one group has 7. Look at the tally marks: how are the 7 strokes grouped?',
      'Turn on "1 picture = 2 votes". What happens to a group with an odd number of votes?',
      'Press Ask me a question and answer it from the bar chart only. Then check with the tally.',
    ],
    id: [
      'Tanyai semua teman sekelasmu buah kesukaannya dan ketuk satu suara untuk tiap jawaban. Batang mana yang paling tinggi?',
      'Tambahkan suara sampai satu kelompok berjumlah 7. Lihat turusnya: bagaimana 7 garis itu dikelompokkan?',
      'Nyalakan "1 gambar = 2 suara". Apa yang terjadi pada kelompok dengan jumlah suara ganjil?',
      'Tekan Beri aku pertanyaan dan jawab hanya dari diagram batangnya. Lalu periksa dengan turusnya.',
    ],
  },

  learn: {
    background: {
      en: [
        'When we want to find something out, such as the favourite fruit in our class, we ask everyone and collect the answers. The answers are called data. Counting with tally marks is a quick way to record data as it comes in: one stroke for each vote, and every fifth stroke drawn across the four before it. Groups of five are easy to count: 5, 10, 15, and then add the extra strokes.',
        'A pictogram shows the data with small pictures. Each row is one answer, and each picture stands for a certain number of votes. The key tells you how many. If one apple means one vote, you just count the apples. If one apple means two votes, you count the apples and double it, and a half apple means one vote. Pictures keep the graph short when there are lots of votes.',
        'A bar chart shows the same data with bars. The height of each bar tells you how many votes, and you read it off the numbered axis on the side. Bar charts make comparing easy: the tallest bar is the most popular answer and the shortest bar is the least popular. To find how many more votes one answer has than another, read both heights and subtract, or count the squares between the tops of the two bars.',
        'In this sim, every tap adds one vote to the tally, the pictogram and the bar chart at the same time. They are three pictures of exactly the same data, so they always agree. A good graph has a title, labels for each group and a key or a numbered axis, so that someone who was not in the room can still read it.',
      ],
      id: [
        'Ketika kita ingin mengetahui sesuatu, misalnya buah kesukaan di kelas kita, kita bertanya kepada semua orang dan mengumpulkan jawabannya. Jawaban-jawaban itu disebut data. Mencatat dengan turus adalah cara cepat merekam data saat masuk: satu garis untuk tiap suara, dan garis kelima digambar menyilang empat garis sebelumnya. Kelompok lima mudah dihitung: 5, 10, 15, lalu tambahkan garis sisanya.',
        'Piktogram menampilkan data dengan gambar-gambar kecil. Setiap baris adalah satu jawaban, dan setiap gambar mewakili sejumlah suara tertentu. Keterangan memberi tahu berapa banyak. Jika satu apel berarti satu suara, kamu cukup menghitung apelnya. Jika satu apel berarti dua suara, kamu menghitung apelnya lalu menggandakannya, dan setengah apel berarti satu suara. Gambar membuat diagram tetap pendek ketika suaranya banyak.',
        'Diagram batang menampilkan data yang sama dengan batang. Tinggi setiap batang menunjukkan banyak suara, dan kamu membacanya dari sumbu berangka di samping. Diagram batang memudahkan perbandingan: batang tertinggi adalah jawaban paling populer dan batang terpendek paling tidak populer. Untuk mencari berapa lebih banyak suara satu jawaban daripada yang lain, baca kedua tingginya lalu kurangkan, atau hitung kotak di antara puncak kedua batang.',
        'Di simulasi ini, setiap ketukan menambah satu suara ke turus, piktogram dan diagram batang sekaligus. Ketiganya adalah tiga gambaran dari data yang sama persis, jadi selalu cocok. Diagram yang baik mempunyai judul, label untuk tiap kelompok dan keterangan atau sumbu berangka, sehingga orang yang tidak ada di ruangan tetap bisa membacanya.',
      ],
    },
    figure: {
      caption: {
        en: 'The same survey three ways. Tally: 7 votes for apples are drawn as a group of five and two more. Pictogram: one apple stands for 2 votes, so 7 is three and a half apples. Bar chart: the apple bar reaches 7 on the axis; apples have 3 more votes than bananas.',
        id: 'Survei yang sama dengan tiga cara. Turus: 7 suara untuk apel digambar sebagai satu kelompok lima dan dua lagi. Piktogram: satu apel mewakili 2 suara, jadi 7 adalah tiga setengah apel. Diagram batang: batang apel mencapai 7 pada sumbu; apel mendapat 3 suara lebih banyak daripada pisang.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        const data = [
          { en: 'Apple', id: 'Apel', n: 7, col: '#ef4444' },
          { en: 'Banana', id: 'Pisang', n: 4, col: '#facc15' },
          { en: 'Orange', id: 'Jeruk', n: 2, col: '#f97316' },
        ];
        // tally marks
        const tally = (x, y, n) => {
          let out = '';
          let k = 0;
          for (let g = 0; g < Math.floor(n / 5); g++) {
            for (let i = 0; i < 4; i++) out += `<line x1="${x + k * 5 + i * 5}" y1="${y - 10}" x2="${x + k * 5 + i * 5}" y2="${y + 2}" stroke="currentColor" stroke-width="1.6"/>`;
            out += `<line x1="${x + k * 5 - 3}" y1="${y + 1}" x2="${x + k * 5 + 18}" y2="${y - 9}" stroke="currentColor" stroke-width="1.6"/>`;
            k += 5;
          }
          for (let i = 0; i < n % 5; i++) out += `<line x1="${x + k * 5 + i * 5}" y1="${y - 10}" x2="${x + k * 5 + i * 5}" y2="${y + 2}" stroke="currentColor" stroke-width="1.6"/>`;
          return out;
        };
        const icons = (x, y, n, col) => {
          let out = '';
          const full = Math.floor(n / 2), half = n % 2;
          for (let i = 0; i < full; i++) out += `<circle cx="${x + i * 14}" cy="${y}" r="5.5" fill="${col}"/>`;
          if (half) out += `<path d="M${x + full * 14} ${y - 5.5} A5.5 5.5 0 0 0 ${x + full * 14} ${y + 5.5} Z" fill="${col}"/>`;
          return out;
        };
        let rows = '';
        data.forEach((d, i) => {
          const y = 52 + i * 26;
          rows += `<text x="12" y="${y}">${L(d.en, d.id)}</text>${tally(62, y, d.n)}<text x="110" y="${y}" class="s">${d.n}</text>`;
          rows += `<text x="140" y="${y}">${L(d.en, d.id)}</text>${icons(192, y - 4, d.n, d.col)}`;
        });
        // bar chart
        const bx = 262, by0 = 130, bh = 90;
        let bars = `<line x1="${bx}" y1="${by0}" x2="${bx + 90}" y2="${by0}" stroke="currentColor" stroke-width="1.2"/><line x1="${bx}" y1="${by0}" x2="${bx}" y2="${by0 - bh}" stroke="currentColor" stroke-width="1.2"/>`;
        for (let v = 0; v <= 8; v += 2) bars += `<text x="${bx - 4}" y="${by0 - (v / 8) * bh + 3}" text-anchor="end" style="font-size:9px">${v}</text><line x1="${bx - 2}" y1="${by0 - (v / 8) * bh}" x2="${bx}" y2="${by0 - (v / 8) * bh}" stroke="currentColor"/>`;
        data.forEach((d, i) => {
          const h = (d.n / 8) * bh;
          bars += `<rect x="${bx + 8 + i * 28}" y="${by0 - h}" width="20" height="${h}" fill="${d.col}"/><text x="${bx + 18 + i * 28}" y="${by0 + 11}" text-anchor="middle" style="font-size:9px">${L(d.en, d.id)}</text>`;
        });
        bars += `<line x1="${bx + 30}" y1="${by0 - (7 / 8) * bh}" x2="${bx + 60}" y2="${by0 - (7 / 8) * bh}" stroke="#22c55e" stroke-dasharray="3 2"/><line x1="${bx + 60}" y1="${by0 - (7 / 8) * bh}" x2="${bx + 60}" y2="${by0 - (4 / 8) * bh}" stroke="#22c55e" stroke-width="2"/><text x="${bx + 64}" y="${by0 - (5.5 / 8) * bh + 3}" fill="#22c55e" style="font-size:9px">+3</text>`;
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Tally marks, a pictogram and a bar chart of the same fruit survey', 'Turus, piktogram dan diagram batang dari survei buah yang sama')}">
  <style>text{font:10px system-ui,sans-serif;fill:currentColor}.s{font:bold 11px system-ui,sans-serif;fill:currentColor}.t{font:bold 11px system-ui,sans-serif;fill:currentColor}</style>
  <text x="12" y="22" class="t">${L('Tally', 'Turus')}</text>
  <text x="140" y="22" class="t">${L('Pictogram', 'Piktogram')}</text>
  <text x="262" y="22" class="t">${L('Bar chart', 'Diagram batang')}</text>
  ${rows}
  <circle cx="146" cy="128" r="5.5" fill="#94a3b8"/><text x="156" y="132">= ${L('2 votes', '2 suara')}</text>
  ${bars}
  <text x="180" y="170" text-anchor="middle" class="s">${L('Most: apple (7). Least: orange (2).', 'Terbanyak: apel (7). Tersedikit: jeruk (2).')}</text>
  <text x="180" y="188" text-anchor="middle">${L('How many more apple than banana? 7 − 4 = 3', 'Berapa lebih banyak apel daripada pisang? 7 − 4 = 3')}</text>
  <text x="180" y="212" text-anchor="middle">${L('Three pictures, one set of data: 7 + 4 + 2 = 13 children', 'Tiga gambaran, satu data: 7 + 4 + 2 = 13 anak')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Data is the set of answers we collect; tally marks in fives make it quick to record and count.',
        'A pictogram uses pictures for votes, and its key says how many votes each picture means.',
        'A bar chart uses bar heights, read against a numbered axis.',
        'Tallest bar = most popular; shortest bar = least popular.',
        '"How many more" means subtract the smaller count from the bigger one.',
        'A good graph has a title, labels and a key or axis.',
      ],
      id: [
        'Data adalah kumpulan jawaban yang kita kumpulkan; turus dalam kelompok lima membuatnya cepat dicatat dan dihitung.',
        'Piktogram memakai gambar untuk suara, dan keterangannya menyebut berapa suara yang diwakili tiap gambar.',
        'Diagram batang memakai tinggi batang, dibaca terhadap sumbu berangka.',
        'Batang tertinggi = paling populer; batang terpendek = paling tidak populer.',
        '"Berapa lebih banyak" berarti kurangkan jumlah yang kecil dari jumlah yang besar.',
        'Diagram yang baik mempunyai judul, label dan keterangan atau sumbu.',
      ],
    },
    vocabulary: {
      en: [
        ['Data', 'Facts or answers that we collect, such as everyone\'s favourite fruit.'],
        ['Tally marks', 'Strokes used to count: four strokes and a fifth drawn across make a group of five.'],
        ['Pictogram', 'A graph that uses pictures, where each picture stands for a set number of votes.'],
        ['Key', 'The note on a pictogram that says how many votes one picture means.'],
        ['Bar chart', 'A graph that uses bars; a taller bar means more.'],
        ['Axis', 'The numbered line beside a bar chart that you read the heights from.'],
      ],
      id: [
        ['Data', 'Fakta atau jawaban yang kita kumpulkan, misalnya buah kesukaan setiap orang.'],
        ['Turus', 'Garis-garis untuk menghitung: empat garis dan garis kelima menyilang membentuk kelompok lima.'],
        ['Piktogram', 'Diagram yang memakai gambar, dengan setiap gambar mewakili sejumlah suara tertentu.'],
        ['Keterangan', 'Catatan pada piktogram yang menyebut berapa suara yang diwakili satu gambar.'],
        ['Diagram batang', 'Diagram yang memakai batang; batang yang lebih tinggi berarti lebih banyak.'],
        ['Sumbu', 'Garis berangka di samping diagram batang tempat kamu membaca tinggi batang.'],
      ],
    },
    misconceptions: {
      en: [
        ['A longer row of pictures always means more votes.', 'Only if the key is the same. If one picture means 2 votes, three pictures (6 votes) beat five pictures that mean 1 vote each (5 votes). Always read the key first.'],
        ['The widest bar is the biggest.', 'Bars in a bar chart are all the same width. Only the height (or length) shows how many.'],
        ['"How many more apples than bananas?" is answered by the apple count.', 'It is the difference. If apples have 7 and bananas have 4, the answer is 7 − 4 = 3, not 7.'],
      ],
      id: [
        ['Baris gambar yang lebih panjang selalu berarti suara lebih banyak.', 'Hanya jika keterangannya sama. Jika satu gambar berarti 2 suara, tiga gambar (6 suara) mengalahkan lima gambar yang masing-masing berarti 1 suara (5 suara). Selalu baca keterangannya dahulu.'],
        ['Batang yang paling lebar adalah yang paling besar.', 'Semua batang pada diagram batang sama lebarnya. Hanya tinggi (atau panjang) yang menunjukkan banyaknya.'],
        ['"Berapa lebih banyak apel daripada pisang?" dijawab dengan jumlah apel.', 'Jawabannya adalah selisihnya. Jika apel 7 dan pisang 4, jawabannya 7 − 4 = 3, bukan 7.'],
      ],
    },
    realWorld: {
      en: [
        'Class votes for a trip, a book or a game are decided by counting tallies.',
        'Weather charts in the classroom use a picture for each sunny, cloudy or rainy day in the month.',
        'Shops look at bar charts of what sold most each week to decide what to order.',
        'Election results on television are shown as bar charts so everyone can see who got the most votes.',
      ],
      id: [
        'Pemilihan di kelas untuk tujuan wisata, buku atau permainan diputuskan dengan menghitung turus.',
        'Papan cuaca di kelas memakai satu gambar untuk setiap hari cerah, berawan atau hujan dalam sebulan.',
        'Toko melihat diagram batang barang yang paling laku tiap minggu untuk memutuskan apa yang dipesan.',
        'Hasil pemilihan umum di televisi ditampilkan sebagai diagram batang agar semua orang bisa melihat siapa yang mendapat suara terbanyak.',
      ],
    },
    questions: {
      en: [
        { q: 'A tally shows two groups of five and three extra strokes. How many votes is that?', a: '13. Two groups of five are 10, and 3 more make 13.' },
        { q: 'In a pictogram one picture means 2 votes. A row shows 4 pictures and a half. How many votes?', a: '9. Four pictures are 8 votes, and the half picture is 1 more.' },
        { q: 'The cat bar reaches 6 and the fish bar reaches 2. How many more children chose cats than fish?', a: '4 more, because 6 − 2 = 4.' },
      ],
      id: [
        { q: 'Sebuah turus menunjukkan dua kelompok lima dan tiga garis tambahan. Berapa suara itu?', a: '13. Dua kelompok lima adalah 10, dan 3 lagi menjadi 13.' },
        { q: 'Pada sebuah piktogram satu gambar berarti 2 suara. Satu baris menunjukkan 4 gambar dan setengah. Berapa suaranya?', a: '9. Empat gambar adalah 8 suara, dan setengah gambar adalah 1 lagi.' },
        { q: 'Batang kucing mencapai 6 dan batang ikan mencapai 2. Berapa lebih banyak anak yang memilih kucing daripada ikan?', a: '4 lebih banyak, karena 6 − 2 = 4.' },
      ],
    },
  },
};
