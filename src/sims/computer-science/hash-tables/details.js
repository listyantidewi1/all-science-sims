// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Read hash function output and bucket index = h(key) mod N.',
      'Distinguish chaining from open addressing.',
      'See lookup cost rise sharply as load factor approaches 1.',
    ],
    id: [
      'Membaca output fungsi hash dan indeks bucket = h(kunci) mod N.',
      'Membedakan chaining dari open addressing.',
      'Melihat biaya lookup melonjak saat load factor mendekati 1.',
    ],
  },  tryThis: {
    en: [
      'Insert names — watch buckets fill.',
      'Switch to open addressing and try to fill the table — what happens?',
      'Resize from 16 buckets to 4 — does collision rate explode?',
    ],
    id: [
      'Sisipkan nama — amati bucket terisi.',
      'Beralih ke open addressing dan coba isi penuh — apa yang terjadi?',
      'Ubah ukuran dari 16 ke 4 bucket — apakah tumbukan meledak?',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'Finding one record among millions by scanning them all is slow, and a sorted list still needs about log n steps. A hash table aims for a single step: a hash function turns any key (here, a string) into a number, and the remainder after dividing by the number of buckets N gives an index between 0 and N − 1. Insert and lookup both compute that index and go straight to the bucket, so on average the cost does not depend on how many items are stored. The simulation\'s hash function starts at 0 and, for each character, sets h = 31·h + character code, keeping 32 bits and taking the absolute value, the same recipe as Java\'s String.hashCode. It is deterministic: the same key always lands in the same bucket, which is exactly what makes lookup possible.',
        'With more keys than buckets, or simply by chance, two keys will share a bucket: a collision. The simulation offers the two classic remedies. Chaining gives every bucket a list; colliding keys are appended, and a lookup walks that list comparing keys. Open addressing with linear probing keeps one key per slot: if the home slot is taken, try the next slot, then the next, wrapping around at the end, and a lookup repeats the same walk until it finds the key or an empty slot. A probing table can fill completely: once all N slots are occupied the simulation gives up after N probes and the key is silently lost, so this scheme needs free space to work.',
        'The load factor α = items ÷ buckets measures how crowded the table is, and the readouts show its effect. With chaining the average chain length is α, and a successful lookup examines about 1 + α/2 entries, growing gently even past α = 1. With linear probing a successful search needs about ½(1 + 1/(1 − α)) probes: 1.5 at α = 0.5, 5.5 at α = 0.9, and unbounded as α approaches 1, because occupied slots merge into long runs (primary clustering) that every new key must walk through. The bucket slider changes N and therefore α, rebuilding an empty table; the method selector swaps the collision strategy; the preset inserts ten Indonesian names so you can compare quickly.',
        'The model is simplified in several ways. A real hash table stores key–value pairs and supports deletion, which in open addressing needs special "deleted" markers; here only keys are stored and nothing is removed. Real tables also resize themselves, doubling N and reinserting everything once α passes about 0.7, whereas here you resize by hand and the table empties. The cost formulas assume the hash spreads keys evenly, and real keys are lumpier: with 8 buckets, four of the ten sample names (Anna, Budi, Fitri, Hari) all hash to bucket 0. The "avg chain length" readout is simply α, not a count of the actual chains, which is why the lab\'s measured lookup cost can differ from the formula.',
      ],
      id: [
        'Mencari satu catatan di antara jutaan dengan memeriksa semuanya itu lambat, dan daftar terurut pun masih butuh sekitar log n langkah. Tabel hash mengincar satu langkah saja: fungsi hash mengubah kunci apa pun (di sini, sebuah string) menjadi bilangan, dan sisa pembagiannya dengan jumlah bucket N memberi indeks antara 0 dan N − 1. Penyisipan dan pencarian sama-sama menghitung indeks itu dan langsung menuju bucket-nya, sehingga rata-rata biayanya tidak bergantung pada jumlah data yang tersimpan. Fungsi hash simulasi ini mulai dari 0 dan, untuk tiap karakter, menetapkan h = 31·h + kode karakter, mempertahankan 32 bit dan mengambil nilai mutlaknya, resep yang sama dengan String.hashCode di Java. Fungsi ini deterministik: kunci yang sama selalu jatuh ke bucket yang sama, dan inilah yang membuat pencarian mungkin dilakukan.',
        'Jika kunci lebih banyak daripada bucket, atau sekadar karena kebetulan, dua kunci akan berbagi bucket: inilah tumbukan (collision). Simulasi menyediakan dua penanganan klasik. Chaining memberi setiap bucket sebuah daftar; kunci yang bertumbukan ditambahkan ke daftar, dan pencarian menyusuri daftar itu sambil membandingkan kunci. Open addressing dengan linear probing menyimpan satu kunci per slot: jika slot asalnya sudah terisi, coba slot berikutnya, lalu berikutnya lagi, berputar kembali ke awal di ujung tabel; pencarian mengulangi jalan yang sama sampai menemukan kunci atau slot kosong. Tabel probing bisa penuh sepenuhnya: begitu semua N slot terisi, simulasi menyerah setelah N percobaan dan kunci itu hilang begitu saja, jadi skema ini butuh ruang kosong agar bekerja.',
        'Load factor α = jumlah data ÷ jumlah bucket mengukur seberapa padat tabel, dan panel bacaan menunjukkan pengaruhnya. Pada chaining, panjang rantai rata-rata adalah α, dan pencarian yang berhasil memeriksa sekitar 1 + α/2 entri, bertambah perlahan bahkan setelah α melewati 1. Pada linear probing, pencarian yang berhasil butuh sekitar ½(1 + 1/(1 − α)) percobaan: 1,5 pada α = 0,5, 5,5 pada α = 0,9, dan tak terbatas saat α mendekati 1, karena slot-slot terisi menyatu menjadi deretan panjang (primary clustering) yang harus dilewati setiap kunci baru. Slider bucket mengubah N dan karenanya α, sambil membangun ulang tabel kosong; pemilih metode menukar strategi tumbukan; tombol preset menyisipkan sepuluh nama Indonesia agar perbandingan cepat dilakukan.',
        'Modelnya disederhanakan dalam beberapa hal. Tabel hash sungguhan menyimpan pasangan kunci–nilai dan mendukung penghapusan, yang pada open addressing membutuhkan penanda khusus "terhapus"; di sini hanya kunci yang disimpan dan tidak ada yang dihapus. Tabel sungguhan juga mengubah ukurannya sendiri, menggandakan N dan menyisipkan ulang semuanya begitu α melewati sekitar 0,7, sedangkan di sini kamu mengubah ukuran secara manual dan tabel menjadi kosong. Rumus biaya mengasumsikan hash menyebarkan kunci secara merata, padahal kunci nyata lebih menggumpal: dengan 8 bucket, empat dari sepuluh nama contoh (Anna, Budi, Fitri, Hari) semuanya jatuh ke bucket 0. Bacaan "avg chain length" sebenarnya hanyalah α, bukan hitungan rantai yang sesungguhnya, sehingga biaya pencarian terukur di lab bisa berbeda dari rumus.',
      ],
    },
    figure: {
      caption: {
        en: 'Four keys, 8 buckets. Anna and Budi both hash to bucket 0. Chaining (top) appends Budi to a list in bucket 0; linear probing (bottom) pushes Budi into slot 1, which then displaces Eko from its own home slot 1 into slot 2.',
        id: 'Empat kunci, 8 bucket. Anna dan Budi sama-sama di-hash ke bucket 0. Chaining (atas) menambahkan Budi ke daftar di bucket 0; linear probing (bawah) menggeser Budi ke slot 1, yang kemudian memaksa Eko pindah dari slot asalnya 1 ke slot 2.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        const cells = (y) => Array.from({ length: 8 }, (_, i) => `<rect x="${20 + i * 40}" y="${y}" width="36" height="26" rx="4" class="m"/><text x="${23 + i * 40}" y="${y + 9}" class="ix">[${i}]</text>`).join('');
        const key = (i, y, s, col) => `<rect x="${22 + i * 40}" y="${y}" width="32" height="14" rx="3" fill="${col}"/><text x="${38 + i * 40}" y="${y + 11}" text-anchor="middle" class="wt">${s}</text>`;
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Chaining versus linear probing', 'Chaining versus linear probing')}">
  <style>text{font:12px system-ui,sans-serif;fill:currentColor}.ix{font-size:8px;opacity:.6;font-family:ui-monospace,monospace}.wt{fill:#fff;font-weight:700;font-size:9px}.s{font-size:10px;opacity:.75}.m{fill:none;stroke:currentColor;stroke-width:1.2;opacity:.45}.p{fill:none;stroke:#ef4444;stroke-width:1.8}</style>
  <text x="20" y="12" class="s">Anna: 2 045 632 mod 8 = 0 · Budi: 2 081 848 mod 8 = 0</text>
  <text x="20" y="25" class="s">Eko: 69 737 mod 8 = 1 · Dewi: 2 126 643 mod 8 = 3</text>
  <text x="20" y="42" style="fill:#3b82f6;font-weight:700">${L('Chaining', 'Chaining')}</text>
  ${cells(48)}
  ${key(0, 58, 'Anna', '#3b82f6')}
  <line x1="38" y1="74" x2="38" y2="86" class="m"/>
  ${key(0, 86, 'Budi', '#3b82f6')}
  <text x="58" y="97" class="s">${L('← chained in bucket 0', '← dirantai di bucket 0')}</text>
  ${key(1, 58, 'Eko', '#3b82f6')}
  ${key(3, 58, 'Dewi', '#3b82f6')}
  <text x="20" y="118" style="fill:#8b5cf6;font-weight:700">${L('Linear probing', 'Linear probing')}</text>
  ${cells(140)}
  ${key(0, 150, 'Anna', '#8b5cf6')}
  ${key(1, 150, 'Budi', '#8b5cf6')}
  ${key(2, 150, 'Eko', '#8b5cf6')}
  ${key(3, 150, 'Dewi', '#8b5cf6')}
  <path d="M38 176 Q58 196 78 176" class="p" marker-end="url(#h)"/>
  <text x="34" y="204" class="s" style="fill:#ef4444">${L('Budi: 0 taken → 1', 'Budi: 0 terisi → 1')}</text>
  <path d="M78 136 Q98 120 118 136" class="p" marker-end="url(#h)"/>
  <text x="124" y="128" class="s" style="fill:#ef4444">${L('Eko: 1 taken → 2', 'Eko: 1 terisi → 2')}</text>
  <text x="20" y="220" class="s">${L('α = 4/8 = 0.5 · chaining lookup ≈ 1 + α/2 = 1.25', 'α = 4/8 = 0,5 · pencarian chaining ≈ 1 + α/2 = 1,25')}</text>
  <text x="20" y="234" class="s">${L('linear probing lookup ≈ ½(1 + 1/(1 − α)) = 1.5', 'pencarian linear probing ≈ ½(1 + 1/(1 − α)) = 1,5')}</text>
  <defs><marker id="h" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="context-stroke"/></marker></defs>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'A hash table turns a key into a bucket index with index = hash(key) mod N, so an average lookup costs the same whether the table holds ten items or ten million.',
        'Collisions are unavoidable; chaining stores colliding keys in a list per bucket, linear probing walks forward to the next free slot.',
        'The load factor α = items ÷ buckets drives the cost: about 1 + α/2 comparisons for chaining and about ½(1 + 1/(1 − α)) probes for linear probing.',
        'Open addressing stops working when the table is full (α = 1), so real implementations resize long before that, typically around α = 0.7.',
        'A good hash function spreads keys evenly; clumps such as four names in one bucket raise the real cost above the formula.',
      ],
      id: [
        'Tabel hash mengubah kunci menjadi indeks bucket dengan indeks = hash(kunci) mod N, sehingga pencarian rata-rata berbiaya sama baik tabel berisi sepuluh maupun sepuluh juta data.',
        'Tumbukan tak terhindarkan; chaining menyimpan kunci yang bertumbukan dalam daftar per bucket, linear probing berjalan maju ke slot kosong berikutnya.',
        'Load factor α = jumlah data ÷ jumlah bucket menentukan biaya: sekitar 1 + α/2 perbandingan untuk chaining dan sekitar ½(1 + 1/(1 − α)) percobaan untuk linear probing.',
        'Open addressing berhenti bekerja saat tabel penuh (α = 1), sehingga implementasi sungguhan mengubah ukuran jauh sebelum itu, biasanya sekitar α = 0,7.',
        'Fungsi hash yang baik menyebarkan kunci secara merata; gumpalan seperti empat nama dalam satu bucket menaikkan biaya nyata di atas rumus.',
      ],
    },
    vocabulary: {
      en: [
        ['Hash function', 'A deterministic rule that turns a key into a number; the same key always gives the same number.'],
        ['Bucket (slot)', 'One of the N positions in the table; the key\'s bucket is hash(key) mod N.'],
        ['Collision', 'Two different keys mapping to the same bucket.'],
        ['Chaining', 'Resolving collisions by keeping a list of keys in each bucket.'],
        ['Open addressing', 'Resolving collisions by storing the key in another slot of the same array.'],
        ['Linear probing', 'Open addressing that tries the next slot, then the next, wrapping around, until a free one appears.'],
        ['Load factor (α)', 'Items stored divided by number of buckets; the main predictor of lookup cost.'],
        ['Rehashing', 'Growing the table and reinserting every key with the new N, done automatically by real hash tables.'],
      ],
      id: [
        ['Fungsi hash', 'Aturan deterministik yang mengubah kunci menjadi bilangan; kunci yang sama selalu menghasilkan bilangan yang sama.'],
        ['Bucket (slot)', 'Salah satu dari N posisi dalam tabel; bucket sebuah kunci adalah hash(kunci) mod N.'],
        ['Tumbukan (collision)', 'Dua kunci berbeda yang dipetakan ke bucket yang sama.'],
        ['Chaining', 'Menangani tumbukan dengan menyimpan daftar kunci di setiap bucket.'],
        ['Open addressing', 'Menangani tumbukan dengan menyimpan kunci di slot lain dalam larik yang sama.'],
        ['Linear probing', 'Open addressing yang mencoba slot berikutnya, lalu berikutnya lagi, berputar ke awal, sampai menemukan slot kosong.'],
        ['Load factor (α)', 'Jumlah data tersimpan dibagi jumlah bucket; penentu utama biaya pencarian.'],
        ['Rehashing', 'Memperbesar tabel dan menyisipkan ulang setiap kunci dengan N yang baru, dilakukan otomatis oleh tabel hash sungguhan.'],
      ],
    },
    misconceptions: {
      en: [
        ['A hash function produces random numbers.', 'It only looks scrambled. It is a fixed calculation, so the same key always gives the same bucket; without that, nothing could ever be found again.'],
        ['Hash table lookup is always O(1).', 'It is O(1) on average, assuming a good hash function and a bounded load factor. If many keys collide the cost grows with the chain or probe length, up to O(n) in the worst case, which attackers have exploited by crafting colliding keys.'],
        ['More buckets is always better.', 'Empty buckets waste memory, and resizing costs time. Real tables aim for a load factor around 0.5 to 0.75 as a balance between speed and space.'],
        ['Chaining and probing behave the same.', 'Chaining degrades gently and still works past α = 1; linear probing is more memory-compact but its cost explodes near α = 1 and it cannot hold more keys than slots.'],
      ],
      id: [
        ['Fungsi hash menghasilkan bilangan acak.', 'Hasilnya hanya tampak acak. Fungsi hash adalah perhitungan tetap, sehingga kunci yang sama selalu menghasilkan bucket yang sama; tanpa itu, tidak ada yang bisa ditemukan kembali.'],
        ['Pencarian di tabel hash selalu O(1).', 'O(1) berlaku rata-rata, dengan asumsi fungsi hash baik dan load factor terbatas. Jika banyak kunci bertumbukan, biaya tumbuh mengikuti panjang rantai atau percobaan, hingga O(n) pada kasus terburuk, yang pernah dimanfaatkan penyerang dengan merancang kunci-kunci yang bertumbukan.'],
        ['Semakin banyak bucket selalu semakin baik.', 'Bucket kosong memboroskan memori, dan mengubah ukuran memakan waktu. Tabel sungguhan membidik load factor sekitar 0,5 sampai 0,75 sebagai keseimbangan antara kecepatan dan ruang.'],
        ['Chaining dan probing berperilaku sama.', 'Chaining menurun perlahan dan tetap bekerja setelah α melewati 1; linear probing lebih hemat memori, tetapi biayanya meledak di dekat α = 1 dan tidak bisa menampung kunci lebih banyak daripada slot.'],
      ],
    },
    realWorld: {
      en: [
        'Dictionaries and maps in programming languages (Python dict, Java HashMap, JavaScript Map) are hash tables; they are behind almost every "look up by name" operation in software.',
        'Compilers keep a symbol table of every variable and function name in a hash table so each reference is resolved in constant time.',
        'Caches such as a browser\'s visited-pages set or a web server\'s in-memory cache use hashing to answer "have I seen this before?" instantly.',
        'Spell checkers and spam filters hash words or signatures into tables to test membership against huge word lists.',
      ],
      id: [
        'Kamus dan map dalam bahasa pemrograman (dict di Python, HashMap di Java, Map di JavaScript) adalah tabel hash; mereka berada di balik hampir setiap operasi "cari berdasarkan nama" dalam perangkat lunak.',
        'Kompilator menyimpan tabel simbol berisi setiap nama variabel dan fungsi dalam tabel hash agar tiap rujukan diselesaikan dalam waktu konstan.',
        'Cache seperti daftar halaman yang pernah dikunjungi peramban atau cache memori server web memakai hashing untuk menjawab "pernahkah saya melihat ini?" secara instan.',
        'Pemeriksa ejaan dan penyaring spam meng-hash kata atau tanda tangan ke dalam tabel untuk menguji keanggotaan terhadap daftar kata yang sangat besar.',
      ],
    },
    questions: {
      en: [
        { q: 'You insert the ten sample names into 8 buckets with chaining. What is the load factor, what lookup cost does the formula predict, and what is the actual average if the chains have lengths 4, 2, 1, 1, 1, 1, 0, 0?', a: 'α = 10/8 = 1.25, so the formula predicts 1 + α/2 = 1.625 comparisons. Actual: the chain of 4 costs 1 + 2 + 3 + 4, the chain of 2 costs 1 + 2, and four singletons cost 1 each, total 17 over 10 keys = 1.7. Slightly worse than predicted because bucket 0 is overloaded.' },
        { q: 'Switch to linear probing with 8 buckets and insert the same ten names. What happens, and what does the probe formula say?', a: 'Only 8 keys fit; the ninth and tenth insertions find no empty slot after 8 probes and are dropped. At α = 1 the formula ½(1 + 1/(1 − α)) is infinite, which is why real probing tables resize at around α = 0.7.' },
        { q: 'Anna and Budi both hash to 0 and occupy slots 0 and 1 under linear probing. Eko hashes to 1. Where does it go, and why does this hurt later lookups?', a: 'Slot 1 is taken, so Eko probes to slot 2. Occupied slots 0, 1, 2 now form a run; any future key hashing anywhere into that run must walk to its end, and the run keeps growing. This primary clustering is why probing costs rise faster than the load factor alone suggests.' },
      ],
      id: [
        { q: 'Kamu menyisipkan sepuluh nama contoh ke 8 bucket dengan chaining. Berapa load factor-nya, berapa biaya pencarian menurut rumus, dan berapa rata-rata sebenarnya jika panjang rantainya 4, 2, 1, 1, 1, 1, 0, 0?', a: 'α = 10/8 = 1,25, sehingga rumus memprediksi 1 + α/2 = 1,625 perbandingan. Sebenarnya: rantai panjang 4 berbiaya 1 + 2 + 3 + 4, rantai panjang 2 berbiaya 1 + 2, dan empat rantai tunggal berbiaya 1 masing-masing, total 17 untuk 10 kunci = 1,7. Sedikit lebih buruk dari prediksi karena bucket 0 kelebihan muatan.' },
        { q: 'Beralih ke linear probing dengan 8 bucket dan sisipkan sepuluh nama yang sama. Apa yang terjadi, dan apa kata rumus percobaan?', a: 'Hanya 8 kunci yang muat; penyisipan kesembilan dan kesepuluh tidak menemukan slot kosong setelah 8 percobaan dan dibuang. Pada α = 1 rumus ½(1 + 1/(1 − α)) menjadi tak hingga, itulah sebabnya tabel probing sungguhan mengubah ukuran sekitar α = 0,7.' },
        { q: 'Anna dan Budi sama-sama di-hash ke 0 dan menempati slot 0 dan 1 pada linear probing. Eko di-hash ke 1. Ke mana ia pergi, dan mengapa ini merugikan pencarian berikutnya?', a: 'Slot 1 sudah terisi, sehingga Eko bergeser ke slot 2. Slot 0, 1, 2 yang terisi kini membentuk deretan; setiap kunci baru yang di-hash ke mana pun di deretan itu harus berjalan sampai ujungnya, dan deretan terus memanjang. Primary clustering inilah yang membuat biaya probing naik lebih cepat daripada yang disiratkan load factor saja.' },
      ],
    },
  },
};
