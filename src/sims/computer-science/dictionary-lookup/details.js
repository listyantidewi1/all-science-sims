// Long-form text for the sim page (objectives, try-this prompts and the Learn block).
export default {
  objectives: {
    en: [
      'Store data as key–value pairs in a Python dictionary and use d[key], d[key] = value, del, pop(), get(), in, len() and for … in d.items() on everyday school examples (gradebook, attendance, canteen menu, club sign-ups).',
      'Predict when a lookup stops with KeyError and avoid it with get(key, default), an "in" check, or a Counter, which answers 0 for a missing key.',
      'Explain why searching a list of pairs takes up to n comparisons while a dictionary lookup checks about one slot: hash(key) picks the slot, so the cost hardly depends on the number of keys.',
    ],
    id: [
      'Menyimpan data sebagai pasangan kunci–nilai dalam dictionary Python dan memakai d[kunci], d[kunci] = nilai, del, pop(), get(), in, len(), dan for … in d.items() pada contoh-contoh sehari-hari di sekolah (daftar nilai, presensi, menu kantin, peminat ekskul).',
      'Memprediksi kapan pencarian berhenti dengan KeyError dan mencegahnya dengan get(kunci, nilai_bawaan), pemeriksaan "in", atau Counter, yang menjawab 0 untuk kunci yang tidak ada.',
      'Menjelaskan mengapa mencari di list pasangan membutuhkan sampai n perbandingan sedangkan pencarian di dictionary hanya memeriksa sekitar satu slot: hash(kunci) memilih slotnya, sehingga biayanya hampir tidak bergantung pada banyaknya kunci.',
    ],
  },
  tryThis: {
    en: [
      'On the Gradebook run d[k] with k = Citra, then with k = Zaki. Read the last line of the traceback in the console. Now run get() with Zaki and the default 0: what changes?',
      'Choose "Class of n students", set n = 36 and look up the last student, Laras. Compare the comparisons of the list of pairs with the slots the dict checked, record the row in the lab, then repeat for n = 6 and n = 12.',
      'On the Gradebook add Fajar with d[k] = v. The dict already had 5 keys in 8 slots: what happens to the table? Then run del d[k] on Budi and find the × left in its slot.',
      'Open "Example: counting club sign-ups" and step through the for loop. How does members.get(c, 0) + 1 count each club? Compare the result with Counter and most_common(1).',
    ],
    id: [
      'Pada Daftar nilai jalankan d[k] dengan k = Citra, lalu dengan k = Zaki. Baca baris terakhir traceback di konsol. Sekarang jalankan get() dengan Zaki dan nilai bawaan 0: apa yang berubah?',
      'Pilih "Kelas berisi n siswa", atur n = 36, lalu cari siswa terakhir, Laras. Bandingkan jumlah perbandingan list pasangan dengan slot yang diperiksa dict, catat barisnya di lab, lalu ulangi untuk n = 6 dan n = 12.',
      'Pada Daftar nilai tambahkan Fajar dengan d[k] = v. Dict sudah berisi 5 kunci dalam 8 slot: apa yang terjadi pada tabelnya? Lalu jalankan del d[k] untuk Budi dan temukan tanda × yang tertinggal di slotnya.',
      'Buka "Contoh: menghitung peminat ekskul" dan jalankan perulangan for langkah demi langkah. Bagaimana peminat.get(e, 0) + 1 menghitung setiap ekskul? Bandingkan hasilnya dengan Counter dan most_common(1).',
    ],
  },

  learn: {
    background: {
      en: [
        'A dictionary (dict) stores data as pairs: a key and its value, written {"Andi": 85, "Budi": 72}. You find a value by its key, not by a position number, just like a student card, where "Kelas" is the key and "X-A" the value. scores["Budi"] gives 72; scores["Dewi"] = 78 adds a new pair, or changes the value when "Dewi" is already a key, because keys are unique; del scores["Andi"] and scores.pop("Andi") remove a pair; len(scores) is the number of keys; "Andi" in scores checks the keys (not the values); and for name, score in scores.items() visits every pair in the order the keys were added (a guarantee since Python 3.7). Asking for a missing key with d[key] stops the program with KeyError, like harga["Hujan"] → KeyError: \'Hujan\'. d.get(key, default) returns the default instead (None when you give none), and collections.Counter answers 0.',
        'Why is a dict fast? Imagine the gradebook were a list of pairs [("Andi", 85), ("Budi", 72), …]. To find "Laras" Python would compare the keys from the front, one by one: 36 comparisons for the last of 36 students, and all n comparisons just to learn that a name is missing. A dict turns the key into a whole number with hash(key) and uses the remainder hash(key) % size to pick one slot of a table. CPython 3.13 starts with a table of 8 slots; each slot holds the number of an entry (#0, #1, … in insertion order), and the entries hold the keys and values in the order they were added. A lookup therefore computes the hash, jumps to its slot and compares one key. When two keys want the same slot (a collision), Python tries further slots in a fixed order computed from the hash until it finds the key or an empty slot, and an empty slot proves that the key is not there.',
        'To keep collisions rare the table is never more than 2/3 full: 8 slots take at most 5 keys, 16 take 10, 32 take 21 and 64 take 42. One more key makes Python build a bigger table, the smallest power of two that is at least 3 × the number of keys, and place every key again by its hash. That copy is rare, so on average adding a key still costs about one step. Deleting a key empties its entry and leaves a "deleted" marker in its slot, so that searches for other keys keep going past it; the emptied entry still counts towards the 2/3 limit until the next rebuild clears the markers away. A list of pairs pays up to n steps for the same jobs, which is why gradebooks, attendance lists, price lists and tallies are kept in dictionaries. Counting is so common that collections.Counter(list) does it in one call (like members[c] = members.get(c, 0) + 1 in a loop), and most_common(m) lists the m largest counts.',
        'In the sim every operation is a real line of Python run by minipy, with the same output and error messages as python3. The canvas replays each lookup twice: on the left the same pairs as a list, searched from index 0 (orange counter), on the right the dict as CPython lays it out: the hash, hash % size, the slots checked in order (numbered), the entry found, new keys stored as the next entry, tables growing from 8 to 16 to 32 slots, and × for deleted keys. The model follows CPython\'s own algorithm, but CPython gives str keys a random hash each time it starts (PYTHONHASHSEED), so their slot numbers here are one possible layout; an int key is its own hash (hash(24117) == 24117), so the NIS example lands exactly where python3 puts it. For other collision strategies see Hash Tables & Collisions; for index-based storage see Lists and Arrays.',
      ],
      id: [
        'Dictionary (dict) menyimpan data berpasangan: kunci dan nilainya, ditulis {"Andi": 85, "Budi": 72}. Kita mencari nilai berdasarkan kuncinya, bukan nomor urutnya, seperti kartu pelajar: "Kelas" adalah kunci dan "X-A" nilainya. nilai["Budi"] memberi 72; nilai["Dewi"] = 78 menambah pasangan baru, atau mengubah nilainya jika "Dewi" sudah menjadi kunci, karena kunci itu unik; del nilai["Andi"] dan nilai.pop("Andi") menghapus pasangan; len(nilai) adalah banyaknya kunci; "Andi" in nilai memeriksa kunci (bukan nilai); dan for nama, skor in nilai.items() mengunjungi setiap pasangan sesuai urutan kunci ditambahkan (dijamin sejak Python 3.7). Meminta kunci yang tidak ada dengan d[kunci] menghentikan program dengan KeyError, seperti harga["Hujan"] → KeyError: \'Hujan\'. d.get(kunci, nilai_bawaan) memberi nilai bawaan sebagai gantinya (None jika tidak diberikan), dan collections.Counter menjawab 0.',
        'Mengapa dict cepat? Bayangkan daftar nilai disimpan sebagai list pasangan [("Andi", 85), ("Budi", 72), …]. Untuk menemukan "Laras", Python harus membandingkan kunci dari depan satu per satu: 36 perbandingan untuk siswa terakhir dari 36 siswa, dan semua n perbandingan hanya untuk tahu bahwa sebuah nama tidak ada. Dict mengubah kunci menjadi bilangan bulat dengan hash(kunci) dan memakai sisa bagi hash(kunci) % ukuran untuk memilih satu slot tabel. CPython 3.13 memulai dengan tabel 8 slot; setiap slot menyimpan nomor sebuah entri (#0, #1, … sesuai urutan masuk), dan entri-entri menyimpan kunci dan nilai sesuai urutan ditambahkan. Jadi pencarian menghitung hash, melompat ke slotnya, dan membandingkan satu kunci. Jika dua kunci menginginkan slot yang sama (tumbukan), Python mencoba slot-slot berikutnya dalam urutan tetap yang dihitung dari hash sampai menemukan kuncinya atau slot kosong, dan slot kosong membuktikan bahwa kunci itu tidak ada.',
        'Agar tumbukan jarang terjadi, tabel tidak pernah lebih dari 2/3 penuh: 8 slot menampung paling banyak 5 kunci, 16 slot 10 kunci, 32 slot 21 kunci, dan 64 slot 42 kunci. Satu kunci tambahan membuat Python membangun tabel yang lebih besar, yaitu pangkat dua terkecil yang paling sedikit 3 × banyaknya kunci, lalu menempatkan ulang setiap kunci menurut hash-nya. Penyalinan itu jarang terjadi, jadi rata-rata menambah kunci tetap sekitar satu langkah. Menghapus kunci mengosongkan entrinya dan meninggalkan tanda "dihapus" di slotnya, agar pencarian kunci lain tetap berlanjut melewatinya; entri yang dikosongkan itu tetap dihitung dalam batas 2/3 sampai pembangunan ulang tabel berikutnya membersihkan tanda-tanda tersebut. List pasangan membayar sampai n langkah untuk pekerjaan yang sama; itulah sebabnya daftar nilai, presensi, daftar harga, dan rekap hitungan disimpan dalam dictionary. Menghitung begitu sering dilakukan sehingga collections.Counter(list) mengerjakannya dalam satu panggilan (sama seperti peminat[e] = peminat.get(e, 0) + 1 dalam perulangan), dan most_common(m) mendaftar m hitungan terbesar.',
        'Di simulasi ini setiap operasi adalah satu baris Python sungguhan yang dijalankan minipy, dengan keluaran dan pesan galat yang sama seperti python3. Kanvas memutar ulang setiap pencarian dua kali: di kiri pasangan yang sama sebagai list, dicari dari indeks 0 (penghitung oranye), di kanan dict seperti yang disusun CPython: hash, hash % ukuran, slot yang diperiksa secara berurutan (bernomor), entri yang ditemukan, kunci baru yang disimpan sebagai entri berikutnya, tabel yang membesar dari 8 ke 16 ke 32 slot, dan × untuk kunci yang dihapus. Modelnya mengikuti algoritma CPython sendiri, tetapi CPython memberi kunci str hash acak setiap kali dijalankan (PYTHONHASHSEED), sehingga nomor slotnya di sini hanyalah satu kemungkinan susunan; kunci int adalah hash-nya sendiri (hash(24117) == 24117), sehingga contoh NIS menempati slot yang persis sama seperti di python3. Untuk strategi tumbukan lain lihat Tabel Hash & Tumbukan; untuk penyimpanan berdasarkan indeks lihat List dan Array.',
      ],
    },
    figure: {
      caption: {
        en: 'Finding "Dewi" in the gradebook. Left: as a list of pairs Python compares the keys from the front, 4 comparisons here and all 5 for a missing name. Right: the dict computes hash(\'Dewi\') % 8, jumps to that slot and finds entry #3 after checking 1 slot; empty slots (dashed) would prove a key missing.',
        id: 'Mencari "Dewi" di daftar nilai. Kiri: sebagai list pasangan, Python membandingkan kunci dari depan, di sini 4 perbandingan dan semua 5 untuk nama yang tidak ada. Kanan: dict menghitung hash(\'Dewi\') % 8, melompat ke slot itu, dan menemukan entri #3 setelah memeriksa 1 slot; slot kosong (garis putus-putus) membuktikan sebuah kunci tidak ada.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        const pairs = [['Andi', 85], ['Budi', 72], ['Citra', 90], ['Dewi', 78], ['Eko', 66]];
        const rows = pairs.map(([k, v], i) => {
          const y = 34 + i * 27;
          const cls = i < 3 ? 'dlf-p' : i === 3 ? 'dlf-ok' : 'dlf-c';
          const mark = i < 3 ? `<text x="150" y="${y + 15}" class="dlf-x">≠</text>` : i === 3 ? `<text x="150" y="${y + 15}" class="dlf-y">=</text>` : '';
          return `<rect x="10" y="${y}" width="132" height="22" rx="4" class="${cls}"/><text x="18" y="${y + 15}" class="dlf-s">${i}</text><text x="80" y="${y + 15}" text-anchor="middle" class="dlf-m">('${k}', ${v})</text>${mark}`;
        }).join('');
        const slots = [['Citra', 2], ['Budi', 1], ['Eko', 4], ['Andi', 0], ['Dewi', 3], null, null, null];
        const cells = slots.map((s, i) => {
          const x = 186 + (i % 4) * 43;
          const y = 78 + Math.floor(i / 4) * 44;
          const cls = !s ? 'dlf-e' : i === 4 ? 'dlf-ok' : 'dlf-c';
          const body = s ? `<text x="${x + 20}" y="${y + 26}" text-anchor="middle" class="dlf-k">'${s[0]}'</text><text x="${x + 38}" y="${y + 10}" text-anchor="end" class="dlf-s">#${s[1]}</text>` : '';
          return `<rect x="${x}" y="${y}" width="40" height="38" rx="4" class="${cls}"/><text x="${x + 3}" y="${y + 10}" class="dlf-s">${i}</text>${body}`;
        }).join('');
        return `<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('A list of pairs searched from the front next to a dict that jumps to one slot', 'List pasangan yang dicari dari depan di samping dict yang melompat ke satu slot')}">
<style>text{font:11px system-ui,sans-serif;fill:currentColor}.dlf-t{font-weight:700;font-size:12px}.dlf-m{font:10px ui-monospace,Menlo,monospace}.dlf-k{font:8.5px ui-monospace,Menlo,monospace}.dlf-s{font-size:8.5px;opacity:.65}.dlf-c{fill:currentColor;fill-opacity:.06;stroke:currentColor;stroke-opacity:.45}.dlf-p{fill:currentColor;fill-opacity:.03;stroke:currentColor;stroke-opacity:.25}.dlf-e{fill:none;stroke:currentColor;stroke-opacity:.4;stroke-dasharray:3 3}.dlf-ok{fill:#10b981;fill-opacity:.18;stroke:#059669;stroke-width:1.6}.dlf-x{fill:#dc2626;font-weight:700}.dlf-y{fill:#059669;font-weight:700}.dlf-a{fill:none;stroke:#d97706;stroke-width:1.6}.dlf-h{fill:#d97706}</style>
<text x="10" y="20" class="dlf-t">${L('List of pairs', 'List pasangan')}</text>
${rows}
<text x="10" y="186" class="dlf-y">${L('4 comparisons', '4 perbandingan')}</text>
<text x="10" y="202">${L('a missing key: all n', 'kunci tidak ada: semua n')}</text>
<line x1="166" y1="12" x2="166" y2="228" stroke="currentColor" stroke-opacity=".2"/>
<text x="186" y="20" class="dlf-t">dict</text>
<text x="186" y="44" class="dlf-m">hash('Dewi') % 8 = 4</text>
<text x="186" y="60" class="dlf-s">${L('(one example: str hashes are random)', '(satu contoh: hash str diacak)')}</text>
${cells}
<path d="M 192 49 C 168 70 170 141 178 141" class="dlf-a"/>
<path d="M 185 141 l -8 -4 l 0 8 z" class="dlf-h"/>
<text x="186" y="186" class="dlf-y">${L('1 slot checked', '1 slot diperiksa')}</text>
<text x="186" y="202">${L('for any n: ≈ 1 step', 'untuk n berapa pun: ≈ 1 langkah')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'A dictionary maps unique keys to values: d[key] reads, d[key] = value adds a pair or changes its value, del d[key] and d.pop(key) remove it, and len(d) is the number of keys.',
        'd[key] with a missing key raises KeyError; d.get(key, default), key in d and Counter (which answers 0) are the safe ways to ask.',
        'Python finds a key by hashing it: hash(key) % size picks a slot, so a lookup checks about one slot however many keys there are, while a list of pairs needs up to n comparisons.',
        'A collision sends Python on to further slots, and the table grows (8 → 16 → 32 …) before it is more than 2/3 full, so lookups stay short.',
        'for key, value in d.items() gives the pairs in insertion order. Keys must be hashable (str, int, float, tuple): a list cannot be a key.',
      ],
      id: [
        'Dictionary memetakan kunci yang unik ke nilai: d[kunci] membaca, d[kunci] = nilai menambah pasangan atau mengubah nilainya, del d[kunci] dan d.pop(kunci) menghapusnya, dan len(d) adalah banyaknya kunci.',
        'd[kunci] dengan kunci yang tidak ada memunculkan KeyError; d.get(kunci, nilai_bawaan), kunci in d, dan Counter (yang menjawab 0) adalah cara bertanya yang aman.',
        'Python menemukan kunci dengan menghitung hash-nya: hash(kunci) % ukuran memilih satu slot, sehingga pencarian memeriksa sekitar satu slot berapa pun banyaknya kunci, sedangkan list pasangan membutuhkan sampai n perbandingan.',
        'Tumbukan membuat Python melanjutkan ke slot lain, dan tabel membesar (8 → 16 → 32 …) sebelum terisi lebih dari 2/3, sehingga pencarian tetap pendek.',
        'for kunci, nilai in d.items() memberikan pasangan sesuai urutan masuk. Kunci harus bisa di-hash (str, int, float, tuple): list tidak bisa menjadi kunci.',
      ],
    },
    vocabulary: {
      en: [
        ['dictionary (dict)', 'A collection of key–value pairs in curly braces { }; values are found by key.'],
        ['key', 'The unique label used to look a value up, e.g. "Budi" in scores["Budi"]. It must be hashable (str, int, float, tuple).'],
        ['value', 'The data stored with a key; it can be any type and can repeat.'],
        ['KeyError', 'The error d[key] raises when the key is not in the dictionary, e.g. KeyError: \'Zaki\'.'],
        ['hash', 'A whole number computed from a key by hash(key); equal keys always give equal hashes, so Python can jump to the right slot.'],
        ['slot (bucket)', 'One place in the dict\'s index table, chosen by hash(key) % size; it points to an entry or is empty.'],
        ['collision', 'Two keys wanting the same slot; Python then checks further slots in a fixed order.'],
        ['Counter', 'A dict from collections that counts things: Counter(list) gives each item\'s count, most_common(m) the m largest, and a missing key counts 0.'],
      ],
      id: [
        ['dictionary (dict)', 'Kumpulan pasangan kunci–nilai di dalam kurung kurawal { }; nilai dicari berdasarkan kunci.'],
        ['kunci (key)', 'Label unik untuk mencari nilai, misalnya "Budi" pada nilai["Budi"]. Harus bisa di-hash (str, int, float, tuple).'],
        ['nilai (value)', 'Data yang disimpan bersama sebuah kunci; boleh bertipe apa saja dan boleh berulang.'],
        ['KeyError', 'Galat yang dimunculkan d[kunci] jika kunci tidak ada di dictionary, misalnya KeyError: \'Zaki\'.'],
        ['hash', 'Bilangan bulat yang dihitung dari kunci dengan hash(kunci); kunci yang sama selalu memberi hash yang sama, sehingga Python bisa melompat ke slot yang tepat.'],
        ['slot (bucket)', 'Satu tempat di tabel indeks dict, dipilih oleh hash(kunci) % ukuran; berisi penunjuk ke entri atau kosong.'],
        ['tumbukan (collision)', 'Dua kunci menginginkan slot yang sama; Python lalu memeriksa slot-slot berikutnya dalam urutan tetap.'],
        ['Counter', 'Dict dari modul collections untuk menghitung: Counter(list) memberi hitungan setiap item, most_common(m) memberi m hitungan terbesar, dan kunci yang tidak ada bernilai 0.'],
      ],
    },
    misconceptions: {
      en: [
        ['d[key] gives None when the key is missing.', 'd[key] raises KeyError and stops the program. Only d.get(key) gives None (or the default you pass).'],
        ['"x in d" searches the values of a dictionary.', '"x in d" checks the keys only. To search the values use x in d.values(), which compares them one by one.'],
        ['A dictionary searches its keys one by one, like a list.', 'It hashes the key and jumps to one slot; only collisions add a few extra checks, and the table grows to keep them rare.'],
        ['Assigning d[key] = value twice with the same key stores two pairs.', 'Keys are unique: the second assignment replaces the value and the key keeps its place in the order.'],
        ['Dictionaries have no order.', 'Since Python 3.7 a dict keeps insertion order; a key that is deleted and added again moves to the end.'],
      ],
      id: [
        ['d[kunci] memberi None jika kuncinya tidak ada.', 'd[kunci] memunculkan KeyError dan menghentikan program. Hanya d.get(kunci) yang memberi None (atau nilai bawaan yang diberikan).'],
        ['"x in d" mencari di nilai-nilai dictionary.', '"x in d" hanya memeriksa kunci. Untuk mencari di nilai pakai x in d.values(), yang membandingkannya satu per satu.'],
        ['Dictionary memeriksa kuncinya satu per satu, seperti list.', 'Dictionary menghitung hash kunci lalu melompat ke satu slot; hanya tumbukan yang menambah sedikit pemeriksaan, dan tabelnya membesar agar tumbukan tetap jarang.'],
        ['Menulis d[kunci] = nilai dua kali dengan kunci yang sama menyimpan dua pasangan.', 'Kunci itu unik: penugasan kedua mengganti nilainya dan kunci tetap di posisinya dalam urutan.'],
        ['Dictionary tidak punya urutan.', 'Sejak Python 3.7 dict menjaga urutan masuk; kunci yang dihapus lalu ditambahkan lagi pindah ke akhir.'],
      ],
    },
    realWorld: {
      en: [
        'Report-card and gradebook systems map each student number (NIS) to scores, and attendance apps map names to Hadir, Sakit, Izin or Alpa.',
        'Contact lists, price lists and real dictionaries: look up a name or an item and get its number or meaning at once.',
        'Tallies such as OSIS election votes, survey answers or the most popular ekskul are counted with a dict or a Counter.',
        'Web apps exchange data as JSON objects, which become Python dicts, and caches and databases are built on key–value lookups. Python itself keeps every module\'s variables in a dict.',
      ],
      id: [
        'Sistem rapor dan daftar nilai memetakan setiap nomor induk siswa (NIS) ke nilainya, dan aplikasi presensi memetakan nama ke Hadir, Sakit, Izin, atau Alpa.',
        'Daftar kontak, daftar harga, dan kamus sungguhan: cari sebuah nama atau barang, langsung dapat nomor atau artinya.',
        'Rekap seperti suara pemilihan ketua OSIS, jawaban survei, atau ekskul yang paling diminati dihitung dengan dict atau Counter.',
        'Aplikasi web bertukar data sebagai objek JSON yang menjadi dict di Python, dan cache serta basis data dibangun di atas pencarian kunci–nilai. Python sendiri menyimpan variabel setiap modul di dalam dict.',
      ],
    },
    questions: {
      en: [
        { q: 'scores = {"Andi": 85, "Budi": 72}. What do scores.get("Citra"), scores.get("Citra", 0) and scores["Citra"] give?', a: 'None, then 0, then KeyError: \'Citra\', which stops the program.' },
        { q: 'A list of 1,000 students is stored as a list of pairs and as a dict. About how many steps does each need to find out that "Zaki" is not there?', a: 'The list of pairs compares all 1,000 pairs. The dict computes hash("Zaki"), checks about one slot (a few with collisions), finds it empty and stops: 1–2 steps.' },
        { q: 'Which of these can be dictionary keys: 24117, "X-A", (10, "A"), ["X", "A"]?', a: 'The int, the str and the tuple. A list can change, so it is unhashable: d[["X", "A"]] raises TypeError: unhashable type: \'list\'.' },
        { q: 'A dict has 8 slots and already holds 5 keys. What happens when a 6th key is added?', a: '8 slots may hold at most 5 keys (2/3), so Python builds a table of 16 slots (the smallest power of two ≥ 3 × 5 = 15), places the 5 keys again by their hash and then stores the new key.' },
        { q: 'members = {} and, for each club c in a list, members[c] = members.get(c, 0) + 1. Why get(c, 0) and not members[c] + 1?', a: 'The first time a club appears it is not a key yet, so members[c] would raise KeyError; get(c, 0) gives 0 and the club starts at 1. Counter(list) does the same counting in one call.' },
      ],
      id: [
        { q: 'nilai = {"Andi": 85, "Budi": 72}. Apa hasil nilai.get("Citra"), nilai.get("Citra", 0), dan nilai["Citra"]?', a: 'None, lalu 0, lalu KeyError: \'Citra\' yang menghentikan program.' },
        { q: 'Daftar 1.000 siswa disimpan sebagai list pasangan dan sebagai dict. Kira-kira berapa langkah yang dibutuhkan masing-masing untuk tahu bahwa "Zaki" tidak ada?', a: 'List pasangan membandingkan semua 1.000 pasangan. Dict menghitung hash("Zaki"), memeriksa sekitar satu slot (beberapa jika ada tumbukan), mendapatinya kosong, lalu berhenti: 1–2 langkah.' },
        { q: 'Mana yang boleh menjadi kunci dictionary: 24117, "X-A", (10, "A"), ["X", "A"]?', a: 'Int, str, dan tuple. List bisa berubah sehingga tidak bisa di-hash: d[["X", "A"]] memunculkan TypeError: unhashable type: \'list\'.' },
        { q: 'Sebuah dict punya 8 slot dan sudah berisi 5 kunci. Apa yang terjadi jika kunci ke-6 ditambahkan?', a: '8 slot hanya boleh berisi paling banyak 5 kunci (2/3), jadi Python membangun tabel 16 slot (pangkat dua terkecil ≥ 3 × 5 = 15), menempatkan ulang 5 kunci menurut hash-nya, lalu menyimpan kunci baru.' },
        { q: 'peminat = {} dan, untuk setiap ekskul e dalam sebuah list, peminat[e] = peminat.get(e, 0) + 1. Mengapa get(e, 0) dan bukan peminat[e] + 1?', a: 'Saat sebuah ekskul pertama kali muncul, ia belum menjadi kunci, sehingga peminat[e] akan memunculkan KeyError; get(e, 0) memberi 0 sehingga ekskul itu mulai dari 1. Counter(list) melakukan penghitungan yang sama dalam satu panggilan.' },
      ],
    },
  },
};
