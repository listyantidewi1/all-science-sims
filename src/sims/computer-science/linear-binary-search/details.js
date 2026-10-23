// Long-form text for the sim page (objectives, try-this prompts and the Learn block).
export default {
  objectives: {
    en: [
      'Trace linear search and binary search on the same list: name the card each comparison looks at and give the values of i, or of low, mid and high, after it.',
      'Compare the two algorithms by counting comparisons, and explain why the worst case is n comparisons for linear search but only ⌊log₂ n⌋ + 1 for binary search.',
      'Explain why binary search needs sorted data, and translate both algorithms between pseudocode (READ, WHILE … DO, IF … THEN … ELSE, ←, DIV) and Python (input(), while, if / elif / else, =, //).',
    ],
    id: [
      'Menelusuri pencarian linear dan pencarian biner pada daftar yang sama: menyebutkan kartu yang dilihat setiap perbandingan dan nilai i, atau kiri, tengah, dan kanan, sesudahnya.',
      'Membandingkan kedua algoritma dengan menghitung perbandingan, serta menjelaskan mengapa kasus terburuk pencarian linear adalah n perbandingan sedangkan pencarian biner hanya ⌊log₂ n⌋ + 1.',
      'Menjelaskan mengapa pencarian biner membutuhkan data yang urut, serta menerjemahkan kedua algoritma antara pseudocode (READ, WHILE … DO, IF … THEN … ELSE, ←, DIV) dan Python (input(), while, if / elif / else, =, //).',
    ],
  },
  tryThis: {
    en: [
      'Keep the scenario "Find Putri among 16 names". Before pressing Play, predict how many comparisons each search needs. Then press Step again and again: which names does binary search look at, and why exactly those?',
      'Choose "Numbers 1–99", then for n = 8, 16, 32 and 64 press "Last card" and "End" and record each row in the lab. What happens to the binary column every time n doubles? Do your dots sit on the chart lines?',
      'Choose the scenario "Trap: binary search, unsorted names" and step until binary search gives up. Which card did it miss, and in which comparison was that card thrown away? Press "Sort the cards" and search again.',
      'Press "First card": which search wins now, and by how much? Switch "Show as" to Pseudocode and find the line that stops linear search as soon as the target is found.',
    ],
    id: [
      'Biarkan skenario "Cari Putri di antara 16 nama". Sebelum menekan Putar, tebak berapa perbandingan yang dibutuhkan setiap pencarian. Lalu tekan Langkah berulang kali: nama mana saja yang dilihat pencarian biner, dan mengapa tepat nama-nama itu?',
      'Pilih "Angka 1–99", lalu untuk n = 8, 16, 32, dan 64 tekan "Kartu terakhir" dan "Akhir", kemudian catat setiap baris di lab. Apa yang terjadi pada kolom biner setiap kali n menjadi dua kali lipat? Apakah titik-titikmu jatuh di garis grafik?',
      'Pilih skenario "Jebakan: biner pada nama tidak urut" lalu jalankan langkah demi langkah sampai pencarian biner menyerah. Kartu mana yang terlewat, dan pada perbandingan ke berapa kartu itu dibuang? Tekan "Urutkan kartu" lalu cari lagi.',
      'Tekan "Kartu pertama": pencarian mana yang menang sekarang, dan selisih berapa? Ubah "Tampilkan" ke Pseudocode lalu temukan baris yang menghentikan pencarian linear begitu target ditemukan.',
    ],
  },

  learn: {
    background: {
      en: [
        'Searching means finding where a value sits in a list, or learning that it is not there. Linear (sequential) search does it the obvious way: start at index 0 and compare each card with the target, i = 0, 1, 2 …, until one matches or the list runs out. It works on any list, sorted or not, and it is what Python does for x in lst and lst.index(x). If the target is at index k the search needs k + 1 comparisons, so the best case is 1 (the first card) and the worst case is n (the last card, or a target that is missing).',
        'Binary search uses the order of a sorted list. It keeps two indexes, low and high, around the part that can still hold the target, and looks at the middle card mid = (low + high) // 2. If that card is the target, it is done. If it is smaller, every card to its left is smaller too, so the whole left part is dropped: low = mid + 1. If it is larger, the right part is dropped: high = mid − 1. When low passes high nothing is left and the target is not in the list. Each comparison halves what is left (64 → 32 → 16 → 8 → 4 → 2 → 1), so the worst case is ⌊log₂ n⌋ + 1 comparisons: 7 for 64 cards, 20 for a million, 29 for everyone in Indonesia. Doubling n adds just one comparison.',
        'The price is the condition: the data must be sorted. On unsorted cards the rule "smaller, so go right" is simply false, and binary search can throw away the half that holds the target and report "not found" for a card that is there (in the sim, Rio at index 0 of the registration list). Sorting also costs work (see the Sorting Visualizer sim), so binary search pays off when a list is sorted once and searched many times, like a dictionary, a contact list or the NIS list of a school. For a short list or a single search, linear search is simpler and quite good enough. This is what comparing algorithms means: count the steps for the same input, look at the best and the worst case, and weigh the strengths and limits of each solution.',
        'In the sim both algorithms are real Python programs run by the built-in interpreter (they print exactly what python3 prints), and each Step makes one comparison in each program, so binary search usually finishes long before linear search. The highlighted line is the comparison just made; the pseudocode version matches the Python line by line: READ ↔ input(), ← ↔ =, WHILE … DO ↔ while …:, ELSE IF ↔ elif, DIV ↔ //. The chart shows both worst cases as n grows; the Big-O Comparison and Binary Search Tree sims take the idea further.',
      ],
      id: [
        'Mencari berarti menemukan letak sebuah nilai di dalam daftar, atau mengetahui bahwa nilai itu tidak ada. Pencarian linear (sekuensial) melakukannya dengan cara yang paling jelas: mulai dari indeks 0 dan bandingkan setiap kartu dengan target, i = 0, 1, 2 …, sampai ada yang cocok atau daftarnya habis. Cara ini berlaku untuk daftar apa pun, urut maupun tidak, dan inilah yang dilakukan Python untuk x in lst dan lst.index(x). Jika target ada di indeks k, pencarian butuh k + 1 perbandingan, sehingga kasus terbaiknya 1 (kartu pertama) dan kasus terburuknya n (kartu terakhir, atau target yang tidak ada).',
        'Pencarian biner memanfaatkan urutan pada daftar yang sudah urut. Ia menyimpan dua indeks, kiri dan kanan, yang mengapit bagian yang masih mungkin berisi target, lalu melihat kartu tengah: tengah = (kiri + kanan) // 2. Jika kartu itu adalah target, selesai. Jika lebih kecil, semua kartu di sebelah kirinya juga lebih kecil, sehingga seluruh bagian kiri dibuang: kiri = tengah + 1. Jika lebih besar, bagian kanan yang dibuang: kanan = tengah − 1. Ketika kiri melewati kanan, tidak ada yang tersisa dan target tidak ada di daftar. Setiap perbandingan membagi dua sisa data (64 → 32 → 16 → 8 → 4 → 2 → 1), sehingga kasus terburuknya ⌊log₂ n⌋ + 1 perbandingan: 7 untuk 64 kartu, 20 untuk sejuta, 29 untuk seluruh penduduk Indonesia. Menggandakan n hanya menambah satu perbandingan.',
        'Harganya adalah syarat: data harus urut. Pada kartu yang tidak urut, aturan "lebih kecil, jadi ke kanan" tidak benar, sehingga pencarian biner bisa membuang separuh yang berisi target dan menyatakan "tidak ada" untuk kartu yang sebenarnya ada (di simulasi: Rio di indeks 0 pada daftar urutan mendaftar). Mengurutkan juga butuh kerja (lihat simulasi Visualisasi Pengurutan), jadi pencarian biner menguntungkan bila daftar diurutkan sekali lalu dicari berkali-kali, seperti kamus, daftar kontak, atau daftar NIS sekolah. Untuk daftar pendek atau pencarian sekali saja, pencarian linear lebih sederhana dan sudah cukup. Inilah yang dimaksud dengan membandingkan algoritma: hitung langkahnya untuk masukan yang sama, lihat kasus terbaik dan terburuk, lalu timbang kelebihan dan keterbatasan setiap solusi.',
        'Di simulasi ini kedua algoritma adalah program Python sungguhan yang dijalankan interpreter bawaan (keluarannya persis seperti python3), dan setiap Langkah melakukan satu perbandingan di masing-masing program, sehingga pencarian biner biasanya selesai jauh sebelum pencarian linear. Baris yang disorot adalah perbandingan yang baru dilakukan; versi pseudocode sepadan baris demi baris dengan Python: READ ↔ input(), ← ↔ =, WHILE … DO ↔ while …:, ELSE IF ↔ elif, DIV ↔ //. Grafik menunjukkan kedua kasus terburuk ketika n bertambah; simulasi Perbandingan Big-O dan Pohon Pencarian Biner melanjutkan gagasan ini.',
      ],
    },
    figure: {
      caption: {
        en: 'Binary search for Putri in the 16 sorted names of the sim. Each comparison looks at the middle of the part that is left (amber) and drops the other half (grey): 16 → 8 → 4 → 1 cards, 4 comparisons. Linear search needs 13, because Putri is at index 12.',
        id: 'Pencarian biner untuk Putri pada 16 nama urut di simulasi. Setiap perbandingan melihat bagian tengah dari sisa data (kuning) dan membuang separuh lainnya (abu-abu): 16 → 8 → 4 → 1 kartu, 4 perbandingan. Pencarian linear butuh 13, karena Putri ada di indeks 12.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        const lo = L('low', 'kiri');
        const hi = L('high', 'kanan');
        const md = L('mid', 'tengah');
        // the four probes of the sim's default search (names sorted A-Z, target Putri)
        const rows = [
          { lo: 0, hi: 15, mid: 7, txt: `#1  ${md} = 7: 'Fajar' &lt; 'Putri' → ${lo} = 8` },
          { lo: 8, hi: 15, mid: 11, txt: `#2  ${md} = 11: 'Nia' &lt; 'Putri' → ${lo} = 12` },
          { lo: 12, hi: 15, mid: 13, txt: `#3  ${md} = 13: 'Rio' &gt; 'Putri' → ${hi} = 12` },
          { lo: 12, hi: 12, mid: 12, txt: `#4  ${md} = 12: 'Putri' = 'Putri' ✓` },
        ];
        const x0 = 28;
        const w = 20;
        let body = '';
        rows.forEach((r, j) => {
          const y = 16 + j * 52;
          for (let k = 0; k < 16; k++) {
            const x = x0 + k * w;
            const inRange = k >= r.lo && k <= r.hi;
            const cls = k === r.mid ? (j === 3 ? 'lbf-hit' : 'lbf-mid') : inRange ? 'lbf-in' : 'lbf-out';
            body += `<rect x="${x}" y="${y}" width="${w - 2}" height="20" rx="3" class="${cls}"/>`;
            body += `<text x="${x + (w - 2) / 2}" y="${y + 14}" text-anchor="middle" class="lbf-i${inRange ? '' : ' lbf-dim'}">${k}</text>`;
          }
          body += `<text x="${x0}" y="${y + 35}" class="lbf-t">${r.txt}</text>`;
        });
        return `<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Binary search halving 16 sorted cards in four comparisons', 'Pencarian biner membagi dua 16 kartu urut dalam empat perbandingan')}">
<style>text{font:12px system-ui,sans-serif;fill:currentColor}.lbf-i{font-size:9px}.lbf-dim{opacity:.4}.lbf-t{font-size:11px}
.lbf-in{fill:none;stroke:currentColor;stroke-width:1.2}.lbf-out{fill:currentColor;fill-opacity:.08;stroke:currentColor;stroke-opacity:.25}
.lbf-mid{fill:#f59e0b;fill-opacity:.45;stroke:#d97706;stroke-width:2}.lbf-hit{fill:#10b981;fill-opacity:.45;stroke:#059669;stroke-width:2}</style>
${body}
<text x="${x0}" y="232" class="lbf-t">${L('Binary: 4 comparisons. Linear: 13 (indexes 0 to 12).', 'Biner: 4 perbandingan. Linear: 13 (indeks 0 sampai 12).')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Linear search compares the items one by one from index 0: best case 1 comparison, worst case n (the target is last or missing). It works on any list.',
        'Binary search compares the target with the middle item, mid = (low + high) // 2, of the part that is left, and keeps only the half that can still hold it by moving low or high.',
        'Every comparison halves the part that is left, so binary search needs at most ⌊log₂ n⌋ + 1 comparisons: 7 for 64 items, 20 for a million. Doubling n adds only one.',
        'Binary search is only correct on sorted data. On unsorted data it can report "not found" for an item that is in the list.',
        'Comparing algorithms means counting their steps on the same input, looking at best and worst cases, and weighing strengths against limits: binary search is fast but needs sorted data; linear search is slower but works on anything.',
      ],
      id: [
        'Pencarian linear membandingkan data satu per satu mulai indeks 0: kasus terbaik 1 perbandingan, kasus terburuk n (target paling belakang atau tidak ada). Cara ini berlaku untuk daftar apa pun.',
        'Pencarian biner membandingkan target dengan data tengah, tengah = (kiri + kanan) // 2, dari bagian yang tersisa, lalu hanya menyimpan separuh yang masih mungkin berisi target dengan menggeser kiri atau kanan.',
        'Setiap perbandingan membagi dua bagian yang tersisa, sehingga pencarian biner butuh paling banyak ⌊log₂ n⌋ + 1 perbandingan: 7 untuk 64 data, 20 untuk sejuta. Menggandakan n hanya menambah satu.',
        'Pencarian biner hanya benar pada data yang urut. Pada data yang tidak urut, ia bisa menyatakan "tidak ada" untuk data yang sebenarnya ada di daftar.',
        'Membandingkan algoritma berarti menghitung langkahnya pada masukan yang sama, melihat kasus terbaik dan terburuk, serta menimbang kelebihan dan keterbatasan: pencarian biner cepat tetapi butuh data urut; pencarian linear lebih lambat tetapi berlaku untuk data apa saja.',
      ],
    },
    vocabulary: {
      en: [
        ['Linear (sequential) search', 'Checking the items of a list one after another from the front until the target is found or the list ends.'],
        ['Binary search', 'Searching a sorted list by comparing the target with the middle item and keeping only the half that can still contain it.'],
        ['Comparison', 'One check of a list item against the target (equal? smaller? larger?). The sim counts these to compare the two algorithms.'],
        ['low, high, mid (kiri, kanan, tengah)', 'The indexes binary search uses: low and high mark the part still possible, mid = (low + high) // 2 is the item checked next.'],
        ['Best case / worst case', 'The fewest and the most steps an algorithm can need for a list of size n, e.g. 1 and n for linear search.'],
        ['log₂ n', 'How many times n can be halved before 1 is left; ⌊log₂ n⌋ + 1 is the worst case of binary search (⌊ ⌋ = round down).'],
        ['Sorted', 'In order from small to large (or A to Z), the condition binary search depends on.'],
      ],
      id: [
        ['Pencarian linear (sekuensial)', 'Memeriksa data dalam daftar satu per satu dari depan sampai target ditemukan atau daftarnya habis.'],
        ['Pencarian biner (binary search)', 'Mencari pada daftar yang urut dengan membandingkan target dengan data tengah, lalu hanya menyimpan separuh yang masih mungkin berisi target.'],
        ['Perbandingan', 'Satu kali pemeriksaan sebuah data terhadap target (sama? lebih kecil? lebih besar?). Simulasi menghitungnya untuk membandingkan kedua algoritma.'],
        ['kiri, kanan, tengah (low, high, mid)', 'Indeks yang dipakai pencarian biner: kiri dan kanan menandai bagian yang masih mungkin, tengah = (kiri + kanan) // 2 adalah data yang diperiksa berikutnya.'],
        ['Kasus terbaik / kasus terburuk', 'Langkah paling sedikit dan paling banyak yang mungkin dibutuhkan algoritma untuk daftar berukuran n, misalnya 1 dan n pada pencarian linear.'],
        ['log₂ n', 'Berapa kali n bisa dibagi dua sampai tersisa 1; ⌊log₂ n⌋ + 1 adalah kasus terburuk pencarian biner (⌊ ⌋ = dibulatkan ke bawah).'],
        ['Urut (terurut)', 'Tersusun dari kecil ke besar (atau A sampai Z), syarat yang diandalkan pencarian biner.'],
      ],
    },
    misconceptions: {
      en: [
        ['Binary search is always faster than linear search.', 'Not for every target. If the target is the first card, linear search needs 1 comparison and binary search up to ⌊log₂ n⌋ + 1. Binary search wins in the worst case and on average for long lists.'],
        ['Binary search works on any list.', 'Only on sorted data. On an unsorted list it may drop the half that holds the target and answer "not found" for an item that is there.'],
        ['Twice as many items means twice as many comparisons for binary search too.', 'Doubling n adds only one comparison to binary search (32 cards: 6, 64 cards: 7). Only linear search doubles.'],
        ['Binary search cuts the list into new, smaller lists.', 'Nothing is copied or deleted: the program only moves the two indexes low and high. The cards stay where they are.'],
      ],
      id: [
        ['Pencarian biner selalu lebih cepat daripada pencarian linear.', 'Tidak untuk setiap target. Jika target adalah kartu pertama, pencarian linear cukup 1 perbandingan sedangkan pencarian biner sampai ⌊log₂ n⌋ + 1. Pencarian biner unggul pada kasus terburuk dan rata-rata untuk daftar yang panjang.'],
        ['Pencarian biner berlaku untuk daftar apa pun.', 'Hanya untuk data yang urut. Pada daftar yang tidak urut, ia bisa membuang separuh yang berisi target dan menjawab "tidak ada" untuk data yang sebenarnya ada.'],
        ['Data dua kali lebih banyak berarti perbandingan pencarian biner juga dua kali lipat.', 'Menggandakan n hanya menambah satu perbandingan pada pencarian biner (32 kartu: 6, 64 kartu: 7). Hanya pencarian linear yang menjadi dua kali lipat.'],
        ['Pencarian biner memotong daftar menjadi daftar-daftar baru yang lebih kecil.', 'Tidak ada yang disalin atau dihapus: program hanya menggeser dua indeks, kiri dan kanan. Kartu-kartunya tetap di tempat.'],
      ],
    },
    realWorld: {
      en: [
        'Looking up a word in a printed dictionary such as KBBI: you open it near the middle and decide which half to keep, never page by page from the start.',
        'Finding a record by NIS or NIK in a sorted database: even with 280 million records, binary search needs at most 29 comparisons.',
        'The "guess my number from 1 to 100" game: always guessing the middle needs at most 7 guesses.',
        'Contact lists, library catalogues and school lists are kept sorted precisely so that they can be searched quickly.',
        'In Python, x in lst and lst.index(x) are linear searches; the bisect module does binary search on sorted lists.',
      ],
      id: [
        'Mencari kata di kamus cetak seperti KBBI: kita membukanya di sekitar tengah lalu memilih separuh mana yang disimpan, tidak pernah halaman demi halaman dari awal.',
        'Mencari data berdasarkan NIS atau NIK di basis data yang urut: walaupun ada 280 juta data, pencarian biner butuh paling banyak 29 perbandingan.',
        'Permainan "tebak angka 1 sampai 100": selalu menebak angka tengah butuh paling banyak 7 tebakan.',
        'Daftar kontak, katalog perpustakaan, dan daftar siswa disimpan urut justru agar bisa dicari dengan cepat.',
        'Di Python, x in lst dan lst.index(x) adalah pencarian linear; modul bisect melakukan pencarian biner pada list yang urut.',
      ],
    },
    questions: {
      en: [
        { q: 'A sorted list has 100 names. What is the largest number of comparisons linear search can need? And binary search?', a: 'Linear search: 100 (the last name or a missing name). Binary search: ⌊log₂ 100⌋ + 1 = 6 + 1 = 7, because 2⁶ = 64 ≤ 100 < 128 = 2⁷.' },
        { q: 'During a binary search low = 8 and high = 15. Which index is checked next? If that card is larger than the target, what are low and high afterwards?', a: 'mid = (8 + 15) // 2 = 11. The card is too big, so everything from index 11 on is dropped: high = mid − 1 = 10 and low stays 8. Indexes 8, 9 and 10 are left.' },
        { q: 'Why can binary search say "not in the list" for a name that is in an unsorted list?', a: 'When the middle card is smaller than the target, binary search assumes every card to its left is smaller too and drops them. In an unsorted list that is not true, so the target may be in the dropped half; once dropped, it is never looked at again.' },
        { q: 'A list of 1,000 students is searched only once. Is it worth sorting it first so that binary search can be used?', a: 'No. One linear search needs at most 1,000 comparisons, while even a good sorting method needs roughly n log₂ n ≈ 10,000. Sorting pays off when the same list is searched many times.' },
      ],
      id: [
        { q: 'Sebuah daftar urut berisi 100 nama. Berapa perbandingan paling banyak yang dibutuhkan pencarian linear? Dan pencarian biner?', a: 'Pencarian linear: 100 (nama terakhir atau nama yang tidak ada). Pencarian biner: ⌊log₂ 100⌋ + 1 = 6 + 1 = 7, karena 2⁶ = 64 ≤ 100 < 128 = 2⁷.' },
        { q: 'Dalam pencarian biner, kiri = 8 dan kanan = 15. Indeks mana yang diperiksa berikutnya? Jika kartu itu lebih besar daripada target, berapa kiri dan kanan sesudahnya?', a: 'tengah = (8 + 15) // 2 = 11. Kartunya terlalu besar, jadi semua mulai indeks 11 dibuang: kanan = tengah − 1 = 10 dan kiri tetap 8. Yang tersisa indeks 8, 9, dan 10.' },
        { q: 'Mengapa pencarian biner bisa menyatakan "tidak ada di daftar" untuk nama yang ada di daftar yang tidak urut?', a: 'Ketika kartu tengah lebih kecil daripada target, pencarian biner menganggap semua kartu di kirinya juga lebih kecil lalu membuangnya. Pada daftar yang tidak urut hal itu tidak benar, sehingga target bisa berada di bagian yang dibuang; sekali dibuang, bagian itu tidak pernah dilihat lagi.' },
        { q: 'Daftar 1.000 siswa hanya dicari satu kali. Apakah perlu diurutkan dulu agar bisa memakai pencarian biner?', a: 'Tidak. Satu pencarian linear butuh paling banyak 1.000 perbandingan, sedangkan cara mengurutkan yang baik pun butuh sekitar n log₂ n ≈ 10.000. Mengurutkan baru menguntungkan bila daftar yang sama dicari berkali-kali.' },
      ],
    },
  },
};
