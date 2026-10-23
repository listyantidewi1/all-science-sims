// Long-form text for the sim page (objectives, try-this prompts and the Learn block).
export default {
  objectives: {
    en: [
      'Use 0-based and negative indices to read and change list items, and predict when Python stops with IndexError.',
      'Explain why insert(i, x), pop(i) and remove(x) move n − i or n − i − 1 items while lst[i], append(x) and pop() take one step, and count the cells read and moved by each operation.',
      'Use append, insert, pop, remove, index, sort, reverse, len, in, slicing and for loops on the example lists and programs, and read the IndexError and ValueError messages they can give.',
    ],
    id: [
      'Memakai indeks mulai 0 dan indeks negatif untuk membaca dan mengubah data list, serta memprediksi kapan Python berhenti dengan IndexError.',
      'Menjelaskan mengapa insert(i, x), pop(i), dan remove(x) menggeser n − i atau n − i − 1 data sedangkan lst[i], append(x), dan pop() cukup satu langkah, serta menghitung sel yang dibaca dan digeser oleh setiap operasi.',
      'Memakai append, insert, pop, remove, index, sort, reverse, len, in, slicing, dan perulangan for pada contoh-contoh list dan program, serta membaca pesan IndexError dan ValueError yang bisa muncul.',
    ],
  },
  tryThis: {
    en: [
      'Choose "Cinema seats A1–A5", pick insert() and run it with i = 1 and x = Budi: a new viewer must sit in A2. How many viewers shift? Then run append() with another name. How many shift now?',
      'Choose "Numbers 1 to n". For n = 4, 8, 12 and 16 run insert() with i = 0 and record each row in the lab. Do your dots land on the orange line of the chart?',
      'On the Playlist run [i] with i = -1, then with i = 4. Read the last line of the traceback in the console: which indices are valid for a list of 4 songs?',
      'Run remove() with x = Hujan, then run it again. Why does the second one stop with ValueError? Open Example 3 to see how "in" avoids it.',
    ],
    id: [
      'Pilih "Kursi bioskop A1–A5", pilih insert(), lalu jalankan dengan i = 1 dan x = Budi: penonton baru harus duduk di A2. Berapa penonton yang bergeser? Lalu jalankan append() dengan nama lain. Berapa yang bergeser sekarang?',
      'Pilih "Angka 1 sampai n". Untuk n = 4, 8, 12, dan 16 jalankan insert() dengan i = 0 lalu catat setiap baris di lab. Apakah titik-titikmu jatuh di garis oranye pada grafik?',
      'Pada Playlist jalankan [i] dengan i = -1, lalu dengan i = 4. Baca baris terakhir traceback di konsol: indeks mana saja yang sah untuk list berisi 4 lagu?',
      'Jalankan remove() dengan x = Hujan, lalu jalankan sekali lagi. Mengapa yang kedua berhenti dengan ValueError? Buka Contoh 3 untuk melihat cara "in" mencegahnya.',
    ],
  },

  learn: {
    background: {
      en: [
        'A list (called an array in many other languages) keeps its items in a row of numbered cells. The number is the index, and it starts at 0: in playlist = ["Laskar Pelangi", "Hujan", "Bintang di Surga", "Tentang Rindu"], playlist[0] is the first song and playlist[3] the last. Python also counts from the end with negative indices, so playlist[-1] is the last song and playlist[-4] the first; any other index stops the program with IndexError: list index out of range. Because the cells sit next to each other, Python can jump straight to any index, just as a cinema usher checks seat A3 without asking A1 and A2: reading lst[i] costs one cell whether the list has 4 items or 4 million. Python also stores the length with the list, so len() counts nothing.',
        'Changing the middle of the row is what costs work. To insert(i, x), Python must first make room: every item from index i to the end moves one cell to the right, starting with the last one, so n − i items move. pop(i), remove(x) and del lst[i] close the gap the other way and move the n − i − 1 items after the deleted one. At the end of the list nothing moves: append(x) and pop() take one step. (Python keeps a few spare cells at the end and occasionally copies the whole list into a bigger block, but on average append still costs a constant amount.) Filling a list of n items with insert(0, x) therefore costs 0 + 1 + … + (n − 1) = n(n − 1)/2 moves, which is 499,500 for 1,000 songs, while append needs none. The chart in the sim plots the cells moved by each operation you run against the length n before it.',
        'Searching is the other cost. x in lst, lst.index(x) and lst.remove(x) compare the items with == from index 0 until one matches, so they read up to n cells, and all n when x is missing; then index() and remove() stop with ValueError. Because == is used, 1, 1.0 and True count as equal. A slice lst[a:b] copies the items a, a + 1, …, b − 1 into a new list (the stop index is not included) and never raises IndexError, a for loop reads every cell once, and sort() rearranges the list itself with Timsort, which needs about n·log₂n comparisons for shuffled data and stops with TypeError if numbers and text are mixed.',
        'In the sim every operation is a real line of Python. Choosing an operation and pressing Run adds the statement to the program, minipy runs it (with the same output and the same error messages as python3; only its limit of 1,500 steps, which stops a loop that never ends, belongs to the sim), and the row of cells replays what happened inside the list: the amber pointer shows where Python is looking, cyan cells were read, orange cells moved, and the counters add up the cost of the statement. The example programs include a class duty list, daily scores, a co-op shopping basket, a numbered playlist, a modular playlist built from functions, an IndexError caught with try-except and the cinema seats. Queues are better served by collections.deque, because list.pop(0) moves n − 1 items (see the Stack vs Queue sim); compare growth rates in Big-O Comparison and sorting methods in Sorting Visualizer.',
      ],
      id: [
        'List (di banyak bahasa lain disebut array) menyimpan datanya dalam deretan sel bernomor. Nomor itu adalah indeks, dan dimulai dari 0: pada playlist = ["Laskar Pelangi", "Hujan", "Bintang di Surga", "Tentang Rindu"], playlist[0] adalah lagu pertama dan playlist[3] lagu terakhir. Python juga menghitung dari belakang dengan indeks negatif, sehingga playlist[-1] adalah lagu terakhir dan playlist[-4] lagu pertama; indeks lain menghentikan program dengan IndexError: list index out of range. Karena sel-selnya bersebelahan, Python bisa langsung menuju indeks mana pun, seperti petugas bioskop yang melihat kursi A3 tanpa bertanya ke A1 dan A2: membaca lst[i] hanya membaca satu sel, baik list berisi 4 data maupun 4 juta. Python juga menyimpan panjang list, sehingga len() tidak menghitung apa pun.',
        'Mengubah bagian tengah deretanlah yang membutuhkan kerja. Untuk insert(i, x), Python harus membuat tempat lebih dulu: setiap data dari indeks i sampai akhir bergeser satu sel ke kanan, dimulai dari yang paling belakang, sehingga n − i data bergeser. pop(i), remove(x), dan del lst[i] menutup celah ke arah sebaliknya dan menggeser n − i − 1 data di belakang data yang dihapus. Di ujung list tidak ada yang bergeser: append(x) dan pop() cukup satu langkah. (Python menyiapkan beberapa sel cadangan di ujung dan sesekali menyalin seluruh list ke tempat yang lebih besar, tetapi rata-rata append tetap berbiaya tetap.) Mengisi list n data dengan insert(0, x) karena itu membutuhkan 0 + 1 + … + (n − 1) = n(n − 1)/2 geseran, yaitu 499.500 untuk 1.000 lagu, sedangkan append tidak membutuhkan geseran sama sekali. Grafik di simulasi menggambar sel yang digeser oleh setiap operasi yang kamu jalankan terhadap panjang n sebelum operasi itu.',
        'Pencarian adalah biaya yang lain. x in lst, lst.index(x), dan lst.remove(x) membandingkan data dengan == mulai indeks 0 sampai ada yang cocok, sehingga membaca paling banyak n sel, dan semua n sel jika x tidak ada; lalu index() dan remove() berhenti dengan ValueError. Karena memakai ==, 1, 1.0, dan True dianggap sama. Slice lst[a:b] menyalin data a, a + 1, …, b − 1 ke list baru (indeks batas akhir tidak ikut) dan tidak pernah memunculkan IndexError, perulangan for membaca setiap sel sekali, dan sort() menata ulang list itu sendiri dengan Timsort, yang membutuhkan sekitar n·log₂n perbandingan untuk data acak dan berhenti dengan TypeError jika angka dan teks dicampur.',
        'Di simulasi ini setiap operasi adalah satu baris Python sungguhan. Memilih operasi lalu menekan Jalankan menambahkan pernyataannya ke program, minipy menjalankannya (dengan keluaran dan pesan galat yang sama seperti python3; hanya batas 1.500 langkah, yang menghentikan perulangan tanpa akhir, merupakan aturan simulasi ini sendiri), dan deretan sel memutar ulang apa yang terjadi di dalam list: penunjuk kuning menunjukkan tempat Python sedang melihat, sel sian sudah dibaca, sel oranye bergeser, dan penghitung menjumlahkan biaya pernyataan itu. Program contohnya meliputi daftar siswa piket, nilai harian, keranjang koperasi, playlist bernomor, playlist modular yang disusun dari fungsi, IndexError yang ditangkap dengan try-except, dan kursi bioskop. Antrean lebih cocok memakai collections.deque, karena list.pop(0) menggeser n − 1 data (lihat simulasi Stack vs Queue); bandingkan laju pertumbuhan di Perbandingan Big-O dan cara mengurutkan di Visualisasi Pengurutan.',
      ],
    },
    figure: {
      caption: {
        en: 'seats.insert(1, "Budi") on the cinema row: Dodo, Nia and Dea each move one seat to the right, the last one first (3 = n − i moves), and Budi takes seat A2 (index 1). Appending Sari afterwards would put her in the next free seat with no moves at all.',
        id: 'kursi.insert(1, "Budi") pada deretan kursi bioskop: Dodo, Nia, dan Dea masing-masing bergeser satu kursi ke kanan, mulai dari yang paling belakang (3 = n − i geseran), lalu Budi menempati kursi A2 (indeks 1). Menambahkan Sari dengan append sesudahnya akan menaruhnya di kursi kosong berikutnya tanpa geseran sama sekali.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        const xs = [44, 100, 156, 212, 268];
        const cell = (x, y, label, cls) => `<rect x="${x}" y="${y}" width="48" height="28" rx="5" class="lof-${cls}"/>${label ? `<text x="${x + 24}" y="${y + 18}" text-anchor="middle" class="lof-m">${label}</text>` : ''}`;
        const before = ['Rio', 'Dea', 'Nia', 'Dodo', ''];
        const after = ['Rio', 'Budi', 'Dea', 'Nia', 'Dodo'];
        const idx = xs.map((x, j) => `<text x="${x + 24}" y="40" text-anchor="middle" class="lof-s">${j}</text>`).join('');
        const seatsTop = xs.map((x, j) => `<text x="${x + 24}" y="86" text-anchor="middle" class="lof-s">A${j + 1}</text>`).join('');
        const seatsBot = xs.map((x, j) => `<text x="${x + 24}" y="182" text-anchor="middle" class="lof-s">A${j + 1}</text>`).join('');
        const rowA = before.map((v, j) => cell(xs[j], 46, v, v ? 'c' : 'e')).join('');
        const rowB = after.map((v, j) => cell(xs[j], 142, v, j === 1 ? 'n' : (j >= 2 ? 'o' : 'c'))).join('');
        const arrows = [3, 2, 1].map((j, k) => {
          const x1 = xs[j] + 36;
          const x2 = xs[j + 1] + 18;
          return `<path d="M${x1} 77 L${x2} 138" class="lof-a" marker-end="url(#lo-fa)"/><text x="${(x1 + x2) / 2 + 9}" y="112" class="lof-s" style="fill:#ea580c;opacity:1">${k + 1}</text>`;
        }).join('');
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Inserting Budi at index 1 shifts three viewers one seat to the right', 'Menyisipkan Budi di indeks 1 menggeser tiga penonton satu kursi ke kanan')}">
  <style>text{font:12px system-ui,sans-serif;fill:currentColor}.lof-m{font:12px ui-monospace,Menlo,monospace}.lof-s{font:10px system-ui,sans-serif;opacity:.75}.lof-c{fill:none;stroke:currentColor;stroke-width:1.3}.lof-e{fill:none;stroke:currentColor;stroke-width:1.2;stroke-dasharray:4 3;opacity:.55}.lof-o{fill:none;stroke:#ea580c;stroke-width:2}.lof-n{fill:none;stroke:#16a34a;stroke-width:2.2}.lof-a{fill:none;stroke:#ea580c;stroke-width:1.6}.lof-g{fill:none;stroke:#16a34a;stroke-width:1.6}</style>
  <defs>
    <marker id="lo-fa" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="#ea580c"/></marker>
    <marker id="lo-fg" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="#16a34a"/></marker>
  </defs>
  <text x="180" y="18" text-anchor="middle" class="lof-m" font-weight="700">${L('seats', 'kursi')}.insert(1, "Budi")</text>
  <text x="4" y="40" class="lof-s">${L('index', 'indeks')}</text>
  ${idx}
  ${rowA}
  ${seatsTop}
  ${arrows}
  <rect x="2" y="100" width="40" height="22" rx="5" class="lof-g"/>
  <text x="22" y="115" text-anchor="middle" class="lof-m">Budi</text>
  <path d="M42 116 L112 139" class="lof-g" marker-end="url(#lo-fg)"/>
  ${rowB}
  ${seatsBot}
  <text x="340" y="64" text-anchor="middle" class="lof-s">${L('before', 'sebelum')}</text>
  <text x="340" y="160" text-anchor="middle" class="lof-s">${L('after', 'sesudah')}</text>
  <text x="180" y="208" text-anchor="middle">${L('3 moves = n − i = 4 − 1 (the last one moves first)', '3 geseran = n − i = 4 − 1 (yang paling belakang lebih dulu)')}</text>
  <text x="180" y="228" text-anchor="middle" class="lof-s">${L('append("Sari") would use the empty seat: 0 moves', 'append("Sari") memakai kursi kosong: 0 geseran')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Indices run from 0 to n − 1; negative indices run from −n (the first item) to −1 (the last). Any other index gives IndexError: list index out of range.',
        'lst[i], lst[i] = x, len(lst), append(x) and pop() take one step however long the list is (constant time, O(1)).',
        'insert(i, x) moves n − i items and pop(i), remove(x) and del lst[i] move n − i − 1, so changing the front of a long list costs about n moves (linear time, O(n)).',
        'in, index() and remove() search from index 0 and may compare all n items; check with in before remove() to avoid ValueError.',
        'A slice lst[a:b] is a new list holding items a to b − 1 and never raises IndexError; sort() and reverse() change the list itself and return None.',
      ],
      id: [
        'Indeks berjalan dari 0 sampai n − 1; indeks negatif dari −n (data pertama) sampai −1 (data terakhir). Indeks lain memunculkan IndexError: list index out of range.',
        'lst[i], lst[i] = x, len(lst), append(x), dan pop() cukup satu langkah sepanjang apa pun list-nya (waktu tetap, O(1)).',
        'insert(i, x) menggeser n − i data, sedangkan pop(i), remove(x), dan del lst[i] menggeser n − i − 1, sehingga mengubah bagian depan list yang panjang membutuhkan sekitar n geseran (waktu linear, O(n)).',
        'in, index(), dan remove() mencari mulai indeks 0 dan bisa membandingkan semua n data; periksa dengan in sebelum remove() agar tidak terjadi ValueError.',
        'Slice lst[a:b] adalah list baru berisi data a sampai b − 1 dan tidak pernah memunculkan IndexError; sort() dan reverse() mengubah list itu sendiri dan mengembalikan None.',
      ],
    },
    vocabulary: {
      en: [
        ['index', 'The position number of an item in a list, starting at 0; negative indices count from the end (−1 is the last item).'],
        ['list / array', 'An ordered collection stored in a row of cells; a Python list can grow and shrink and may hold values of different types.'],
        ['append / insert', 'append(x) adds x after the last item; insert(i, x) puts x at index i and shifts the items from i onward one place right.'],
        ['pop / remove', 'pop(i) takes out and returns the item at index i (the last one without i); remove(x) deletes the first item equal to x.'],
        ['slice', 'lst[a:b], a new list with the items from index a up to but not including b.'],
        ['IndexError / ValueError', 'The errors for an index that does not exist (lst[9], pop from an empty list) and for a value that is not in the list (remove, index).'],
        ['O(1) and O(n)', 'Big-O labels for work that stays the same as the list grows (append) and work that grows in proportion to n (insert at the front, searching).'],
      ],
      id: [
        ['indeks', 'Nomor posisi sebuah data dalam list, dimulai dari 0; indeks negatif dihitung dari belakang (−1 adalah data terakhir).'],
        ['list / array', 'Kumpulan data berurutan yang disimpan dalam deretan sel; list Python bisa bertambah dan berkurang serta boleh berisi nilai dengan tipe berbeda.'],
        ['append / insert', 'append(x) menambah x setelah data terakhir; insert(i, x) menaruh x di indeks i dan menggeser data mulai indeks i satu tempat ke kanan.'],
        ['pop / remove', 'pop(i) mengambil dan mengembalikan data di indeks i (data terakhir jika tanpa i); remove(x) menghapus data pertama yang sama dengan x.'],
        ['slice (irisan)', 'lst[a:b], list baru berisi data dari indeks a sampai sebelum b.'],
        ['IndexError / ValueError', 'Galat untuk indeks yang tidak ada (lst[9], pop dari list kosong) dan untuk nilai yang tidak ada di list (remove, index).'],
        ['O(1) dan O(n)', 'Label Big-O untuk kerja yang tetap saat list memanjang (append) dan kerja yang tumbuh sebanding dengan n (insert di depan, pencarian).'],
      ],
    },
    misconceptions: {
      en: [
        ['The first item is at index 1.', 'Python counts from 0, so the first item is lst[0] and "position 2" for a person is index 1 for the computer. With positions that start at 1, as in the modular playlist example, write playlist.insert(position - 1, title).'],
        ['insert() is as quick as append().', 'append() moves nothing, but insert(i, x) moves every item from index i to the end. Inserting at the front of 1,000 songs moves all 1,000.'],
        ['insert(10, x) on a list of 4 items gives IndexError.', 'insert() never raises IndexError: an index past the end puts x at the end, and one before the start puts it at the front. Reading, assigning and pop() with a missing index do raise IndexError.'],
        ['x = lst.sort() gives the sorted list.', 'sort() sorts the list in place and returns None, so x becomes None. Use sorted(lst) when you want a new sorted list.'],
      ],
      id: [
        ['Data pertama ada di indeks 1.', 'Python menghitung dari 0, jadi data pertama adalah lst[0] dan "posisi 2" bagi manusia adalah indeks 1 bagi komputer. Jika posisi dimulai dari 1, seperti pada contoh playlist modular, tulis playlist.insert(posisi - 1, judul).'],
        ['insert() sama cepatnya dengan append().', 'append() tidak menggeser apa pun, tetapi insert(i, x) menggeser setiap data dari indeks i sampai akhir. Menyisipkan di depan 1.000 lagu menggeser 1.000 lagu.'],
        ['insert(10, x) pada list berisi 4 data memunculkan IndexError.', 'insert() tidak pernah memunculkan IndexError: indeks yang melewati ujung menaruh x di akhir, dan yang sebelum awal menaruhnya di depan. Membaca, mengisi, dan pop() dengan indeks yang tidak ada barulah memunculkan IndexError.'],
        ['x = lst.sort() menghasilkan list yang terurut.', 'sort() mengurutkan list di tempat dan mengembalikan None, sehingga x menjadi None. Pakai sorted(lst) jika ingin list baru yang terurut.'],
      ],
    },
    realWorld: {
      en: [
        'A music app\'s playlist is a list: "add to queue" appends, "play next" inserts near the front, and dragging a song moves it, which shifts the songs in between.',
        'Cinema and train booking systems keep seats in arrays so that seat A3 can be checked directly by its number.',
        'The Back button and Undo history work as a stack: append() to push and pop() to take the last action, both at the cheap end of the list.',
        'Programs that serve requests in order (printers, chat messages, school library queues) use collections.deque, because list.pop(0) would shift the whole waiting line every time.',
        'Leaderboards and rankings are lists that are sorted again whenever a score changes.',
      ],
      id: [
        'Playlist di aplikasi musik adalah list: "tambahkan ke antrean" memakai append, "putar berikutnya" menyisipkan di dekat depan, dan menyeret lagu memindahkannya sehingga lagu-lagu di antaranya bergeser.',
        'Sistem pemesanan bioskop dan kereta menyimpan kursi dalam array sehingga kursi A3 bisa diperiksa langsung lewat nomornya.',
        'Tombol Kembali dan riwayat Undo bekerja sebagai stack: append() untuk push dan pop() untuk mengambil aksi terakhir, keduanya di ujung list yang murah.',
        'Program yang melayani permintaan secara berurutan (printer, pesan chat, antrean perpustakaan sekolah) memakai collections.deque, karena list.pop(0) akan menggeser seluruh antrean setiap kali.',
        'Papan peringkat adalah list yang diurutkan ulang setiap kali ada nilai yang berubah.',
      ],
    },
    questions: {
      en: [
        { q: 'A list has 6 items. How many cells move for insert(0, x), insert(6, x) and pop(2)?', a: 'insert(0, x) moves all 6 items, insert(6, x) adds at the end and moves 0, and pop(2) moves the 3 items at indices 3, 4 and 5 (n − i − 1 = 6 − 2 − 1).' },
        { q: 'nilai = [80, 85, 90, 75]. What do nilai[-1], nilai[1:3] and nilai[4] give?', a: 'nilai[-1] is 75 (the last item), nilai[1:3] is the new list [85, 90] (index 3 is not included), and nilai[4] stops with IndexError: list index out of range because the valid indices are 0 to 3.' },
        { q: 'The playlist contains "Hujan" twice. What does playlist.remove("Hujan") do, and what happens if you call it three times?', a: 'Each call removes only the first "Hujan" it finds; the second call removes the other one, and the third stops with ValueError: list.remove(x): x not in list. Checking with if "Hujan" in playlist: first avoids the error.' },
        { q: 'Why is a queue usually built with collections.deque instead of a list with pop(0)?', a: 'pop(0) on a list shifts all the remaining n − 1 items one place left every time someone is served, while deque.popleft() takes the front item without moving the others.' },
      ],
      id: [
        { q: 'Sebuah list berisi 6 data. Berapa sel yang bergeser untuk insert(0, x), insert(6, x), dan pop(2)?', a: 'insert(0, x) menggeser semua 6 data, insert(6, x) menambah di akhir dan menggeser 0, dan pop(2) menggeser 3 data di indeks 3, 4, dan 5 (n − i − 1 = 6 − 2 − 1).' },
        { q: 'nilai = [80, 85, 90, 75]. Apa hasil nilai[-1], nilai[1:3], dan nilai[4]?', a: 'nilai[-1] adalah 75 (data terakhir), nilai[1:3] adalah list baru [85, 90] (indeks 3 tidak ikut), dan nilai[4] berhenti dengan IndexError: list index out of range karena indeks yang sah 0 sampai 3.' },
        { q: 'Playlist berisi "Hujan" dua kali. Apa yang dilakukan playlist.remove("Hujan"), dan apa yang terjadi jika dipanggil tiga kali?', a: 'Setiap pemanggilan hanya menghapus "Hujan" pertama yang ditemukan; pemanggilan kedua menghapus yang lain, dan yang ketiga berhenti dengan ValueError: list.remove(x): x not in list. Memeriksa dulu dengan if "Hujan" in playlist: mencegah galat itu.' },
        { q: 'Mengapa antrean biasanya dibuat dengan collections.deque, bukan list dengan pop(0)?', a: 'pop(0) pada list menggeser semua n − 1 data yang tersisa satu tempat ke kiri setiap kali ada yang dilayani, sedangkan deque.popleft() mengambil data paling depan tanpa menggeser yang lain.' },
      ],
    },
  },
};
