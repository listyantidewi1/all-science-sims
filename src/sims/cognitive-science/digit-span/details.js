// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Measure your forward digit span (typically 7 ± 2).',
      'Measure backward span (typically 1–2 less than forward).',
      'See how chunking strategies extend effective capacity.',
    ],
    id: [
      'Mengukur digit span maju Anda (tipikal 7 ± 2).',
      'Mengukur span mundur (tipikal 1-2 kurang dari maju).',
      'Melihat strategi chunking memperpanjang kapasitas efektif.',
    ],
  },
  tryThis: {
    en: [
      'Forward — recall as shown.',
      'Backward — recall in reverse order.',
      'Group digits into pairs or triples — capacity expands.',
    ],
    id: [
      'Maju — ingat seperti ditampilkan.',
      'Mundur — ingat urutan terbalik.',
      'Kelompokkan digit menjadi pasangan atau triplet — kapasitas meluas.',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'Working memory is the small mental workspace where you hold information for a few seconds while you use it: a phone number someone just read out, the first half of a sentence while you hear the second half, or a running total while you add up a bill. It is different from long-term memory, which can hold an enormous amount for years. Working memory is tiny. If too much arrives at once, the earliest items are pushed out before you can use them.',
        'The digit span task is one of the oldest ways to measure this workspace. A list of random digits is presented one at a time, and you repeat it back. If you are right, the next list is one digit longer; the longest list you can repeat without error is your span. In 1956 George Miller summarised decades of such measurements as "the magical number seven, plus or minus two": most adults manage somewhere between five and nine items. Later work by Nelson Cowan (2001) argued that the true limit is closer to four when people are prevented from grouping items, and that seven is what you get when some grouping sneaks in.',
        'In the simulation each digit flashes on screen for the time set by the Flash duration slider, with a short 200 ms gap between digits, and then you type the sequence (or tap the number pad). In Forward mode you type the digits in the order shown; in Backward mode you type them in reverse, which forces you to hold the list and manipulate it at the same time, so backward span is usually one or two digits shorter. The Starting span slider sets the first list length, and every correct answer lengthens the next list by one, up to 12. The stats box records how many trials you got right and the longest list you ever recalled correctly.',
        'The sim is deliberately simple. A wrong answer does not shorten the next list, a single slip counts the whole trial as wrong, and only one trial is given per length, whereas clinical digit span tests give two lists per length and stop after two failures. It also cannot stop you from chunking: if you read 1, 9, 4, 5 as "1945" you have turned four items into one, which is exactly why memory experts can recall dozens of digits. The simulation measures what you do with the digits, not a fixed property of your brain.',
      ],
      id: [
        'Memori kerja adalah ruang kerja mental kecil tempat kamu menahan informasi selama beberapa detik sambil memakainya: nomor telepon yang baru dibacakan, paruh pertama kalimat sementara kamu mendengar paruh keduanya, atau jumlah sementara saat menghitung belanjaan. Ia berbeda dari memori jangka panjang, yang mampu menyimpan sangat banyak hal selama bertahun-tahun. Memori kerja sangat kecil. Kalau terlalu banyak informasi datang sekaligus, item yang paling awal terdesak keluar sebelum sempat dipakai.',
        'Tugas digit span adalah salah satu cara tertua untuk mengukur ruang kerja ini. Deretan angka acak ditampilkan satu per satu, lalu kamu mengulanginya. Jika benar, deretan berikutnya bertambah satu angka; deretan terpanjang yang bisa kamu ulang tanpa salah adalah span kamu. Pada 1956 George Miller merangkum puluhan tahun pengukuran seperti ini sebagai "angka ajaib tujuh, plus minus dua": kebanyakan orang dewasa mampu antara lima dan sembilan item. Penelitian Nelson Cowan (2001) kemudian berpendapat bahwa batas sebenarnya lebih dekat ke empat jika orang dicegah mengelompokkan item, dan tujuh adalah hasil ketika sedikit pengelompokan ikut terjadi.',
        'Dalam simulasi, setiap angka berkedip di layar selama waktu yang diatur slider Flash duration, dengan jeda singkat 200 ms di antara angka, lalu kamu mengetik urutannya (atau menekan papan angka). Pada mode Forward kamu mengetik angka sesuai urutan tampil; pada mode Backward kamu mengetiknya terbalik, sehingga kamu harus menahan deretan sekaligus mengolahnya, dan karena itu span mundur biasanya satu atau dua angka lebih pendek. Slider Starting span menentukan panjang deretan pertama, dan setiap jawaban benar menambah panjang deretan berikutnya satu angka, maksimal 12. Kotak statistik mencatat berapa percobaan yang benar dan deretan terpanjang yang pernah kamu ingat dengan tepat.',
        'Simulasi ini sengaja dibuat sederhana. Jawaban salah tidak memperpendek deretan berikutnya, satu kekeliruan saja membuat seluruh percobaan dihitung salah, dan hanya ada satu percobaan per panjang, sedangkan tes digit span klinis memberi dua deretan per panjang dan berhenti setelah dua kali gagal. Simulasi juga tidak bisa mencegah chunking: jika kamu membaca 1, 9, 4, 5 sebagai "1945", kamu sudah mengubah empat item menjadi satu, dan itulah sebabnya para ahli memori mampu mengingat puluhan angka. Simulasi mengukur apa yang kamu lakukan dengan angka-angka itu, bukan sifat tetap otakmu.',
      ],
    },
    figure: {
      caption: {
        en: 'Digits arrive one at a time into a workspace with only a handful of slots (about 7 ± 2). Once the slots are full, new digits push the oldest ones out. Grouping digits into chunks lets each slot hold more.',
        id: 'Angka masuk satu per satu ke ruang kerja yang hanya punya beberapa slot (sekitar 7 ± 2). Begitu slot penuh, angka baru mendesak angka tertua keluar. Mengelompokkan angka menjadi chunk membuat tiap slot memuat lebih banyak.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        const digits = ['3', '8', '1', '5', '9', '2', '7', '4', '6'];
        const stream = digits.map((d, i) => `<rect x="${22 + i * 34}" y="22" width="26" height="26" rx="4" class="m"/><text x="${35 + i * 34}" y="40" text-anchor="middle" font-weight="700">${d}</text>`).join('');
        const slots = [0, 1, 2, 3, 4, 5, 6].map((i) => `<rect x="${64 + i * 34}" y="96" width="28" height="28" rx="4" fill="none" stroke="#3b82f6" stroke-width="1.6"/>`).join('');
        const held = ['8', '1', '5', '9', '2', '7', '4'].map((d, i) => `<text x="${78 + i * 34}" y="116" text-anchor="middle" font-weight="700" fill="#3b82f6">${d}</text>`).join('');
        const chunks = [['19', '45'], ['08', '17'], ['20', '24']].map((c, i) => `<rect x="${64 + i * 72}" y="178" width="64" height="28" rx="4" fill="none" stroke="#10b981" stroke-width="1.6"/><text x="${96 + i * 72}" y="198" text-anchor="middle" font-weight="700" fill="#10b981">${c[0]}${c[1]}</text>`).join('');
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('A limited-capacity working-memory buffer', 'Penyangga memori kerja berkapasitas terbatas')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.m{fill:none;stroke:currentColor;stroke-width:1.2;opacity:.55}.s{font-size:10px;opacity:.75}</style>
  <text x="22" y="14" class="s">${L('digits shown one at a time', 'angka ditampilkan satu per satu')} →</text>
  ${stream}
  <path d="M190 54 L190 80" stroke="currentColor" stroke-width="1.4" fill="none" marker-end="url(#ds)"/>
  <text x="196" y="72" class="s">${L('into working memory', 'masuk ke memori kerja')}</text>
  ${slots}${held}
  <text x="28" y="116" fill="#ef4444" font-weight="700" opacity=".7">3</text>
  <path d="M58 110 L38 110" stroke="#ef4444" stroke-width="1.4" fill="none" marker-end="url(#dr)"/>
  <text x="22" y="140" class="s">${L('oldest digit pushed out', 'angka tertua terdesak keluar')}</text>
  <text x="302" y="116" class="s">7 ± 2</text>
  <text x="22" y="168" class="s">${L('chunking: 6 digits in 3 slots', 'chunking: 6 angka dalam 3 slot')}</text>
  ${chunks}
  <text x="290" y="198" class="s">${L('= 3 items', '= 3 item')}</text>
  <text x="22" y="230" class="s">${L('capacity is counted in chunks, not digits', 'kapasitas dihitung dalam chunk, bukan angka')}</text>
  <defs>
    <marker id="ds" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="currentColor"/></marker>
    <marker id="dr" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="#ef4444"/></marker>
  </defs>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Working memory holds only a handful of items at once, about 7 ± 2 for digits in most adults.',
        'Your span is the longest list you can repeat back without a single error.',
        'Backward span is usually shorter than forward span because you must hold and rearrange the list at the same time.',
        'Chunking turns several digits into one meaningful item, so the same number of slots holds more information.',
        'Span measures a strategy as much as a brain limit, which is why practice with chunking can raise it dramatically.',
      ],
      id: [
        'Memori kerja hanya menahan beberapa item sekaligus, sekitar 7 ± 2 untuk angka pada kebanyakan orang dewasa.',
        'Span kamu adalah deretan terpanjang yang bisa kamu ulang tanpa satu pun kesalahan.',
        'Span mundur biasanya lebih pendek daripada span maju karena kamu harus menahan dan menyusun ulang deretan sekaligus.',
        'Chunking mengubah beberapa angka menjadi satu item bermakna, sehingga jumlah slot yang sama memuat lebih banyak informasi.',
        'Span mengukur strategi sama besarnya dengan batas otak, karena itu latihan chunking bisa menaikkannya secara dramatis.',
      ],
    },
    vocabulary: {
      en: [
        ['Working memory', 'The limited mental workspace that holds and manipulates information for a few seconds while you use it.'],
        ['Digit span', 'The longest sequence of random digits a person can repeat back correctly.'],
        ['Forward span', 'Repeating the digits in the order they were presented.'],
        ['Backward span', 'Repeating the digits in reverse order; usually one or two digits shorter than forward span.'],
        ['Chunk', 'A group of items treated as a single unit in memory, such as "1945" instead of 1, 9, 4, 5.'],
        ['Rehearsal', 'Silently repeating items to keep them in working memory.'],
        ['Capacity', 'The maximum number of chunks working memory can hold at once.'],
      ],
      id: [
        ['Memori kerja', 'Ruang kerja mental terbatas yang menahan dan mengolah informasi selama beberapa detik saat kamu memakainya.'],
        ['Digit span', 'Deretan angka acak terpanjang yang bisa diulang seseorang dengan benar.'],
        ['Span maju', 'Mengulang angka sesuai urutan tampilnya.'],
        ['Span mundur', 'Mengulang angka dalam urutan terbalik; biasanya satu atau dua angka lebih pendek daripada span maju.'],
        ['Chunk', 'Sekelompok item yang diperlakukan sebagai satu satuan dalam memori, misalnya "1945" alih-alih 1, 9, 4, 5.'],
        ['Pengulangan (rehearsal)', 'Mengulang item dalam hati agar tetap berada di memori kerja.'],
        ['Kapasitas', 'Jumlah chunk maksimum yang dapat ditahan memori kerja sekaligus.'],
      ],
    },
    misconceptions: {
      en: [
        ['A short digit span means you have a bad memory.', 'Digit span measures only the brief working-memory workspace. Long-term memory, which stores facts, skills and events for years, is a separate system with a vastly larger capacity.'],
        ['The limit is exactly seven items.', 'Seven is an average with a wide range (5 to 9), and when grouping is prevented the limit is closer to four chunks. The size of a chunk depends on what you already know.'],
        ['Showing the digits more slowly always helps.', 'Slower presentation gives more time to rehearse, but it also gives earlier digits more time to fade. Beyond about one second per digit the gain is small.'],
      ],
      id: [
        ['Digit span yang pendek berarti daya ingatmu buruk.', 'Digit span hanya mengukur ruang kerja memori yang singkat. Memori jangka panjang, yang menyimpan fakta, keterampilan, dan peristiwa selama bertahun-tahun, adalah sistem terpisah dengan kapasitas jauh lebih besar.'],
        ['Batasnya tepat tujuh item.', 'Tujuh adalah rata-rata dengan rentang lebar (5 sampai 9), dan jika pengelompokan dicegah batasnya lebih dekat ke empat chunk. Ukuran sebuah chunk bergantung pada apa yang sudah kamu ketahui.'],
        ['Menampilkan angka lebih lambat selalu membantu.', 'Tampilan lebih lambat memberi lebih banyak waktu untuk mengulang, tetapi juga memberi angka-angka awal lebih banyak waktu untuk memudar. Di atas sekitar satu detik per angka, tambahannya kecil.'],
      ],
    },
    realWorld: {
      en: [
        'Phone numbers are printed in groups (0812-3456-7890) because a 12-digit string is far beyond span but three chunks of four are not.',
        'Digit span is part of standard intelligence and neuropsychology test batteries, where backward span is used as a quick check on attention and executive control.',
        'Air-traffic controllers and pilots read back instructions immediately because a clearance held in working memory is lost within seconds if not acted on or written down.',
        'A trained volunteer in a famous 1980 study extended his digit span from 7 to about 80 by recoding digit groups as running times, showing that chunking, not raw capacity, had changed.',
      ],
      id: [
        'Nomor telepon dicetak berkelompok (0812-3456-7890) karena deretan 12 angka jauh melampaui span, tetapi tiga chunk berisi empat angka tidak.',
        'Digit span menjadi bagian dari baterai tes inteligensi dan neuropsikologi standar; span mundur dipakai sebagai pemeriksaan cepat atensi dan kendali eksekutif.',
        'Pengatur lalu lintas udara dan pilot langsung mengulang instruksi yang diterima karena izin yang ditahan di memori kerja hilang dalam hitungan detik jika tidak segera dilakukan atau dicatat.',
        'Seorang relawan terlatih dalam studi terkenal tahun 1980 memperpanjang digit span-nya dari 7 menjadi sekitar 80 dengan mengodekan kelompok angka sebagai catatan waktu lari, membuktikan bahwa yang berubah adalah chunking, bukan kapasitas mentah.',
      ],
    },
    questions: {
      en: [
        { q: 'A student correctly recalls lists of 4, 5, 6 and 7 digits but fails at 8. What is her forward span, and what does the stats box show as "Max span achieved"?', a: 'Her span is 7, the longest list recalled without error. The stats box shows 7, because it records the longest correct trial, not the length of the failed one.' },
        { q: 'Why is backward span usually one or two digits shorter than forward span?', a: 'In the backward task you must hold the whole list and also reverse it before answering. The reversing work uses part of the same limited workspace, so fewer digits can be kept intact.' },
        { q: 'You are shown 2, 0, 2, 4, 1, 9, 4, 5. How could chunking let you recall all eight easily, and how many items would you actually be holding?', a: 'Read them as two years, 2024 and 1945. Then you hold only two meaningful items instead of eight digits, well inside the 7 ± 2 limit, and you can unpack each year back into its digits when typing.' },
      ],
      id: [
        { q: 'Seorang siswa mengingat dengan benar deretan 4, 5, 6, dan 7 angka tetapi gagal pada 8. Berapa span majunya, dan apa yang ditampilkan kotak statistik sebagai "Max span achieved"?', a: 'Span-nya 7, deretan terpanjang yang diingat tanpa salah. Kotak statistik menampilkan 7, karena yang dicatat adalah percobaan benar terpanjang, bukan panjang percobaan yang gagal.' },
        { q: 'Mengapa span mundur biasanya satu atau dua angka lebih pendek daripada span maju?', a: 'Pada tugas mundur kamu harus menahan seluruh deretan sekaligus membaliknya sebelum menjawab. Pekerjaan membalik itu memakai sebagian ruang kerja terbatas yang sama, sehingga lebih sedikit angka yang bisa tetap utuh.' },
        { q: 'Kamu ditunjukkan 2, 0, 2, 4, 1, 9, 4, 5. Bagaimana chunking membuatmu mudah mengingat kedelapan angka itu, dan berapa item yang sebenarnya kamu tahan?', a: 'Bacalah sebagai dua tahun, 2024 dan 1945. Kamu hanya menahan dua item bermakna, bukan delapan angka, jauh di dalam batas 7 ± 2, dan kamu bisa membongkar tiap tahun kembali menjadi angka-angkanya saat mengetik.' },
      ],
    },
  },
};
