// Long-form text for the sim page (objectives, try-this prompts and the Learn block).
export default {
  objectives: {
    en: [
      'Explain assignment as "work out the right side, then store the result in the box on the left", and trace x = x + 1, swaps and an accumulator with memory boxes and a trace table.',
      'Name the type of a value (str, int, float, bool), predict the result or the error of mixing types, and convert with int(), float() and str(), knowing that input() always returns a str.',
      'Evaluate expressions in Python\'s order of operator priority, tell / // and % apart, format numbers with f-strings, and decide whether a variable name is valid.',
    ],
    id: [
      'Menjelaskan penugasan sebagai "hitung sisi kanan, lalu simpan hasilnya ke kotak di sebelah kiri", serta menelusuri x = x + 1, pertukaran nilai, dan akumulator dengan kotak memori dan tabel penelusuran.',
      'Menyebutkan tipe sebuah nilai (str, int, float, bool), menebak hasil atau error saat tipe dicampur, dan mengonversi dengan int(), float(), dan str(), dengan memahami bahwa input() selalu menghasilkan str.',
      'Menghitung ekspresi sesuai urutan prioritas operator Python, membedakan / // dan %, merapikan angka dengan f-string, dan menilai apakah sebuah nama variabel sah.',
    ],
  },
  tryThis: {
    en: [
      'In Memory boxes choose "Swap gone wrong" and predict a and b before pressing Step. At which line is the 3 lost? Then compare with "Swap with a temp box" and "a, b = b, a".',
      'Choose "input() gives text, int() converts" and change the input value to 17,5. Which line fails, and with which error? What should the user type instead?',
      'In Types, evaluate "5" + 3 and then the two suggested fixes. Then try int(79.9) and round(79.9): why are the answers different?',
      'In Operators, step through (math + physics + chem) / 3 and math + physics + chem / 3. At which step do they part ways? Then set a = -7 and b = 2 with the sliders of the / // % picture and explain why -7 // 2 is -4.',
    ],
    id: [
      'Di Kotak memori pilih "Tukar nilai yang salah (tanpa temp)" dan tebak isi a dan b sebelum menekan Langkah. Di baris mana angka 3 hilang? Lalu bandingkan dengan "Tukar nilai dengan kotak bantu temp" dan "a, b = b, a".',
      'Pilih "input() menghasilkan teks, int() mengubahnya" dan ganti nilai masukan menjadi 17,5. Baris mana yang gagal, dan dengan error apa? Apa yang seharusnya diketik pengguna?',
      'Di Tipe data, hitung "5" + 3 lalu kedua perbaikan yang disarankan. Kemudian coba int(79.9) dan round(79.9): mengapa hasilnya berbeda?',
      'Di Operator, telusuri (nilai_mtk + nilai_fisika + nilai_kimia) / 3 dan nilai_mtk + nilai_fisika + nilai_kimia / 3. Pada langkah ke berapa keduanya mulai berbeda? Lalu atur a = -7 dan b = 2 dengan penggeser pada gambar / // % dan jelaskan mengapa -7 // 2 bernilai -4.',
    ],
  },

  learn: {
    background: {
      en: [
        'A variable is a name for a place in memory that holds a value. It can be pictured as a labelled jar: the name is the label, the value is what is inside, and the type is the kind of thing inside. The sign = means assignment, not "equals": Python first works out the whole right side, then stores the result under the name on the left and the old value is gone. That is why x = x + 1 makes sense: read x (5), add 1, store 6 back in x. The Memory boxes tab animates exactly this, as in the "Manusia Variabel" class game: copies of values travel out of their boxes, the right side is reduced one operator at a time, and the result flies into its box while the old value drops out. The trace table underneath is the familiar paper trace table, filled in step by step.',
        'Python has dynamic typing: you never declare a type (there is no int umur = 17 as in Java or C); a value carries its type with it, and the same variable may later hold a value of another type. The four basic types are str (text in quotes, "Andi"), int (whole numbers, 17), float (numbers with a decimal point, 165.5) and bool (True or False). Some textbooks also list char; Python has no separate char type, because one character is simply a str of length 1. type(x) reports the type of the value in x. input() always returns a str, so input() + 1 is a TypeError and the usual pattern is int(input(...)) or float(input(...)). int() rejects text such as "7.5" or the Indonesian decimal comma "17,5" with a ValueError, and int(79.9) cuts the decimals off (79) instead of rounding.',
        'Operators are applied in a fixed order of priority: brackets, then ** (grouped from the right, so 2 ** 3 ** 2 = 2 ** 9 = 512), then a minus sign (so -2 ** 2 = -4), then * / // % from left to right, then + - from left to right, then comparisons, not, and, or. / always gives a float (10 / 5 = 2.0). // divides and rounds down to a whole number and % gives the remainder, so a == (a // b) * b + a % b always holds: 32 students in groups of 5 make 32 // 5 = 6 full groups with 32 % 5 = 2 left over. "Down" means toward minus infinity, so -7 // 2 = -4 and -7 % 2 = 1. An f-string formats a value for display without changing it: f"{rata:.2f}" turns 79.33333 into the text \'79.33\', while round(rata, 2) gives the float 79.33.',
        'Variable names follow fixed rules: only letters, digits and _, not starting with a digit, no spaces or symbols, and not one of Python\'s 35 keywords such as if, for, class or True. Python checks this itself with str.isidentifier() and the keyword list. Built-in function names such as print, input or list are allowed but hide the function: after print = 1, the next print("Halo") fails with TypeError: \'int\' object is not callable. Python style is lowercase_with_underscores (snake_case), and Nilai and nilai are two different variables. All code here runs in minipy, the Python 3.13 interpreter written for these sims, so values, types and error messages are the ones python3 prints; only an endless loop is cut off by the simulation after a fixed number of steps, where real Python would keep running. For functions, lists and frames see Python Step by Step; for whole programs as flowcharts see the Flowchart Runner.',
      ],
      id: [
        'Variabel adalah nama untuk sebuah tempat di memori yang menyimpan nilai. Variabel bisa diibaratkan toples berlabel: nama adalah labelnya, nilai adalah isinya, dan tipe adalah jenis isinya. Tanda = berarti penugasan, bukan "sama dengan": Python menghitung dulu seluruh sisi kanan, lalu menyimpan hasilnya pada nama di sebelah kiri dan nilai lamanya hilang. Itulah sebabnya x = x + 1 masuk akal: baca x (5), tambah 1, simpan 6 kembali ke x. Tab Kotak memori menganimasikan proses ini, seperti permainan kelas "Manusia Variabel": salinan nilai keluar dari kotaknya, sisi kanan dihitung satu operator demi satu operator, lalu hasilnya terbang ke kotaknya sementara nilai lama terjatuh keluar. Tabel penelusuran di bawahnya adalah tabel penelusuran yang biasa dibuat di kertas, terisi langkah demi langkah.',
        'Python memakai pengetikan dinamis: tipe tidak pernah dideklarasikan (tidak ada int umur = 17 seperti di Java atau C); nilai membawa tipenya sendiri, dan variabel yang sama nanti boleh berisi nilai bertipe lain. Empat tipe dasarnya adalah str (teks bertanda petik, "Andi"), int (bilangan bulat, 17), float (bilangan dengan titik desimal, 165.5), dan bool (True atau False). Sebagian buku juga menyebut char; Python tidak memiliki tipe char tersendiri, karena satu karakter hanyalah str dengan panjang 1. type(x) melaporkan tipe nilai di dalam x. input() selalu menghasilkan str, sehingga input() + 1 menimbulkan TypeError dan pola yang biasa dipakai adalah int(input(...)) atau float(input(...)). int() menolak teks seperti "7.5" atau koma desimal ala Indonesia "17,5" dengan ValueError, dan int(79.9) membuang bagian desimal (79), bukan membulatkannya.',
        'Operator dikerjakan menurut urutan prioritas yang tetap: tanda kurung, lalu ** (dikelompokkan dari kanan, jadi 2 ** 3 ** 2 = 2 ** 9 = 512), lalu tanda minus (jadi -2 ** 2 = -4), lalu * / // % dari kiri ke kanan, lalu + - dari kiri ke kanan, lalu perbandingan, not, and, or. / selalu menghasilkan float (10 / 5 = 2.0). // membagi lalu membulatkan ke bawah menjadi bilangan bulat dan % memberi sisa bagi, sehingga a == (a // b) * b + a % b selalu berlaku: 32 siswa dalam kelompok berisi 5 membentuk 32 // 5 = 6 kelompok penuh dengan sisa 32 % 5 = 2 siswa. "Ke bawah" berarti ke arah minus tak hingga, jadi -7 // 2 = -4 dan -7 % 2 = 1. f-string merapikan tampilan nilai tanpa mengubah nilainya: f"{rata:.2f}" mengubah 79.33333 menjadi teks \'79.33\', sedangkan round(rata, 2) menghasilkan float 79.33.',
        'Nama variabel mengikuti aturan yang tetap: hanya huruf, angka, dan _, tidak diawali angka, tanpa spasi atau simbol, dan bukan salah satu dari 35 kata kunci Python seperti if, for, class, atau True. Python sendiri memeriksanya dengan str.isidentifier() dan daftar kata kunci. Nama fungsi bawaan seperti print, input, atau list diizinkan tetapi menutupi fungsinya: setelah print = 1, perintah print("Halo") berikutnya gagal dengan TypeError: \'int\' object is not callable. Gaya Python adalah huruf_kecil_dengan_garis_bawah (snake_case), dan Nilai serta nilai adalah dua variabel berbeda. Semua kode di sini dijalankan oleh minipy, interpreter Python 3.13 yang dibuat untuk simulasi ini, sehingga nilai, tipe, dan pesan error sama dengan yang dicetak python3; hanya perulangan tanpa akhir yang dihentikan simulasi setelah sejumlah langkah, padahal Python sungguhan akan terus berjalan. Untuk fungsi, list, dan bingkai lihat Python Langkah demi Langkah; untuk program utuh sebagai diagram alir lihat Penjalan Diagram Alir.',
      ],
    },
    figure: {
      caption: {
        en: 'Top: x = x + 1 read from right to left: (1) read the 5 out of box x, (2) work out 5 + 1 = 6, (3) store 6 in x, overwriting the 5. Bottom: the four basic types as labelled boxes.',
        id: 'Atas: x = x + 1 dibaca dari kanan ke kiri: (1) baca 5 dari kotak x, (2) hitung 5 + 1 = 6, (3) simpan 6 ke x dan menimpa 5. Bawah: empat tipe data dasar sebagai kotak berlabel.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        const box = (x, y, w, name, val, type, col) => `
  <rect x="${x}" y="${y}" width="${w}" height="32" rx="6" fill="none" stroke="${col}" stroke-width="1.8"/>
  <rect x="${x + 6}" y="${y - 13}" width="${name.length * 7 + 10}" height="15" rx="4" fill="currentColor" fill-opacity=".1" stroke="currentColor" stroke-width="1"/>
  <text x="${x + 11}" y="${y - 2}" class="vtf-t">${name}</text>
  <text x="${x + w / 2}" y="${y + 21}" text-anchor="middle" class="vtf-v" style="fill:${col}">${val}</text>
  <text x="${x + 2}" y="${y + 47}" class="vtf-s" style="fill:${col}">${type}</text>`;
        const num = (cx, cy, n) => `<circle cx="${cx}" cy="${cy}" r="7" fill="none" stroke="currentColor" stroke-width="1.2"/><text x="${cx}" y="${cy + 4}" text-anchor="middle" class="vtf-k">${n}</text>`;
        const names = lang === 'id' ? ['nama', 'umur', 'tinggi', 'lulus'] : ['name', 'age', 'height', 'passed'];
        return `<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Memory boxes: x = x + 1 and the four basic types', 'Kotak memori: x = x + 1 dan empat tipe dasar')}">
  <style>text{font:12px system-ui,sans-serif;fill:currentColor}.vtf-m{font:600 15px ui-monospace,Menlo,monospace}.vtf-v{font:600 13px ui-monospace,Menlo,monospace}.vtf-t{font:700 10px ui-monospace,Menlo,monospace}.vtf-s{font:10px ui-monospace,Menlo,monospace}.vtf-n{font:11px system-ui,sans-serif}.vtf-k{font:700 9px system-ui,sans-serif}.vtf-a{fill:none;stroke:currentColor;stroke-width:1.4}</style>
  <text x="205" y="30" text-anchor="middle" class="vtf-m">x = x + 1</text>
  <rect x="30" y="56" width="70" height="38" rx="7" fill="none" stroke="#3b82f6" stroke-width="2"/>
  <rect x="37" y="43" width="20" height="15" rx="4" fill="currentColor" fill-opacity=".1" stroke="currentColor" stroke-width="1"/>
  <text x="43" y="54" class="vtf-t">x</text>
  <text x="65" y="81" text-anchor="middle" class="vtf-m" style="fill:#3b82f6">6</text>
  <text x="32" y="110" class="vtf-s">int · ${L('was', 'tadinya')} <tspan text-decoration="line-through">5</tspan></text>
  <path d="M100 62 Q 150 52 196 36" class="vtf-a"/>
  <path d="M196 36 L189.8 42.4 L187.1 34.8 z" fill="currentColor"/>
  ${num(110, 36, 1)}<text x="121" y="40" class="vtf-n">${L('read 5', 'baca 5')}</text>
  ${num(246, 62, 2)}<text x="257" y="66" class="vtf-v">5 + 1 → 6</text>
  <path d="M262 76 Q 190 112 103 84" class="vtf-a"/>
  <path d="M103 84 L111.8 82.6 L109.4 90.3 z" fill="currentColor"/>
  ${num(160, 108, 3)}<text x="171" y="112" class="vtf-n">${L('store 6 in x', 'simpan 6 ke x')}</text>
  <line x1="10" y1="128" x2="350" y2="128" stroke="currentColor" opacity=".25"/>
  ${box(14, 158, 72, names[0], '"Andi"', 'str', '#65a30d')}
  ${box(100, 158, 72, names[1], '17', 'int', '#3b82f6')}
  ${box(186, 158, 72, names[2], '165.5', 'float', '#0d9488')}
  ${box(272, 158, 72, names[3], 'True', 'bool', '#db2777')}
  <text x="180" y="230" text-anchor="middle" class="vtf-n">${L('the type belongs to the value inside the box', 'tipe melekat pada nilai di dalam kotak')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        '= means "store": work out the whole right side first, then put the result in the box named on the left; the old value is overwritten.',
        'y = x gives y the value x has at that moment; changing x later does not change y. A swap needs a temp box, or Python\'s a, b = b, a, which builds the pair on the right before any box changes.',
        'The type belongs to the value: str, int, float, bool. input() always returns a str, so convert with int() or float() before calculating; int() cuts decimals off, round() rounds.',
        'Priority: ( ), **, -x, * / // %, + -, comparisons, not, and, or. Equal priority goes left to right, except ** which groups from the right. / always gives a float.',
        'A valid name has only letters, digits and _, does not start with a digit and is not a keyword. Avoid the names of built-in functions such as print, input and list.',
      ],
      id: [
        '= berarti "simpan": hitung dulu seluruh sisi kanan, lalu masukkan hasilnya ke kotak yang namanya ada di kiri; nilai lama tertimpa.',
        'y = x memberi y nilai x pada saat itu; mengubah x sesudahnya tidak mengubah y. Menukar nilai butuh kotak bantu temp, atau cara Python a, b = b, a yang membuat pasangan di sisi kanan sebelum kotak mana pun berubah.',
        'Tipe melekat pada nilai: str, int, float, bool. input() selalu menghasilkan str, jadi ubah dengan int() atau float() sebelum menghitung; int() membuang desimal, round() membulatkan.',
        'Prioritas: ( ), **, -x, * / // %, + -, perbandingan, not, and, or. Prioritas yang sama dikerjakan dari kiri ke kanan, kecuali ** yang dikelompokkan dari kanan. / selalu menghasilkan float.',
        'Nama yang sah hanya berisi huruf, angka, dan _, tidak diawali angka, dan bukan kata kunci. Hindari nama fungsi bawaan seperti print, input, dan list.',
      ],
    },
    vocabulary: {
      en: [
        ['Variable', 'A name for a place in memory that holds a value; in this sim a labelled box.'],
        ['Assignment (=)', 'Storing the value of the right side under the name on the left, replacing the old value.'],
        ['Data type', 'The kind of a value, which decides what can be done with it: str, int, float, bool.'],
        ['Type conversion', 'Making a value of another type: int("17") → 17, float("7.5") → 7.5, str(80) → \'80\'.'],
        ['Operator precedence', 'The order of priority in which Python applies operators when there are no brackets.'],
        ['Floor division and modulus', '// gives the whole-number quotient rounded down; % gives the remainder.'],
        ['f-string', 'A string starting with f in which {expression:format} is replaced by the formatted value, such as {x:.2f}.'],
        ['Identifier / keyword', 'An identifier is a valid name; a keyword (if, for, class, True, …) is reserved by Python and cannot be a name.'],
      ],
      id: [
        ['Variabel', 'Nama untuk sebuah tempat di memori yang menyimpan nilai; di simulasi ini berupa kotak berlabel.'],
        ['Penugasan (=)', 'Menyimpan nilai sisi kanan pada nama di sebelah kiri, menggantikan nilai lamanya.'],
        ['Tipe data', 'Jenis sebuah nilai, yang menentukan apa yang bisa dilakukan dengannya: str, int, float, bool.'],
        ['Konversi tipe', 'Membuat nilai bertipe lain: int("17") → 17, float("7.5") → 7.5, str(80) → \'80\'.'],
        ['Prioritas operator', 'Urutan prioritas Python dalam mengerjakan operator bila tidak ada tanda kurung.'],
        ['Pembagian bulat dan modulus', '// memberi hasil bagi bilangan bulat yang dibulatkan ke bawah; % memberi sisa bagi.'],
        ['f-string', 'String berawalan f yang bagian {ekspresi:format}-nya diganti nilai yang sudah dirapikan, misalnya {x:.2f}.'],
        ['Identifier / kata kunci', 'Identifier adalah nama yang sah; kata kunci (if, for, class, True, …) dicadangkan Python dan tidak boleh menjadi nama.'],
      ],
    },
    misconceptions: {
      en: [
        ['x = x + 1 is impossible, because x can never equal x + 1.', '= is assignment, not equality. Python works out x + 1 with the old value and stores the result in x. Equality is tested with ==.'],
        ['After y = x, y follows x: when x changes, y changes too.', 'y gets the value x has at that moment. A later x = x + 1 gives x a new value and leaves y as it was.'],
        ['input() returns a number when the user types digits.', 'input() always returns a str: input() + 1 is a TypeError. Use int(input()) or float(input()).'],
        ['int() rounds, so int(79.9) is 80.', 'int() cuts the decimals off: int(79.9) is 79. round(79.9) gives 80.'],
        ['10 / 5 gives 2.', '/ always gives a float: 2.0. Use // when you want a whole number.'],
        ['print, input and list are keywords, so they cannot be variable names.', 'They are built-in functions, not keywords: Python accepts print = 1, but print() then stops working, so avoid them. Real keywords (if, for, class, True, …) give a SyntaxError.'],
      ],
      id: [
        ['x = x + 1 mustahil, karena x tidak mungkin sama dengan x + 1.', '= adalah penugasan, bukan kesamaan. Python menghitung x + 1 dengan nilai lama lalu menyimpan hasilnya ke x. Kesamaan diuji dengan ==.'],
        ['Setelah y = x, y mengikuti x: saat x berubah, y ikut berubah.', 'y mendapat nilai x pada saat itu. x = x + 1 sesudahnya memberi x nilai baru dan y tetap seperti semula.'],
        ['input() menghasilkan bilangan jika pengguna mengetik angka.', 'input() selalu menghasilkan str: input() + 1 menimbulkan TypeError. Gunakan int(input()) atau float(input()).'],
        ['int() membulatkan, jadi int(79.9) bernilai 80.', 'int() membuang bagian desimal: int(79.9) bernilai 79. round(79.9) menghasilkan 80.'],
        ['10 / 5 menghasilkan 2.', '/ selalu menghasilkan float: 2.0. Gunakan // jika menginginkan bilangan bulat.'],
        ['print, input, dan list adalah kata kunci, jadi tidak boleh menjadi nama variabel.', 'Ketiganya fungsi bawaan, bukan kata kunci: Python menerima print = 1, tetapi print() lalu tidak berfungsi, jadi hindari. Kata kunci sungguhan (if, for, class, True, …) menimbulkan SyntaxError.'],
      ],
    },
    realWorld: {
      en: [
        'A canteen or cooperative cash register keeps a running total with total = total + price: the accumulator pattern.',
        'Every field of a web form arrives as text. School information systems convert scores and dates with int(), float() or a date parser, and must handle "17,5" typed with a decimal comma.',
        'Spreadsheets also do * before +: =2+3*4 gives 14, and MOD(32, 5) gives 2 like 32 % 5. But not every rule is the same: a spreadsheet works out =-2^2 as 4, where Python gives -2 ** 2 = -4.',
        'Receipts and report cards format numbers with two decimals or thousands separators, like f"{total:,}" → \'60,000\' (Indonesian style writes 60.000).',
        'Style guides such as PEP 8 and code reviews insist on meaningful snake_case names, so that a team can read each other\'s programs.',
      ],
      id: [
        'Mesin kasir kantin atau koperasi menyimpan total berjalan dengan total = total + harga: pola akumulator.',
        'Setiap isian formulir web tiba sebagai teks. Sistem informasi sekolah mengubah nilai dan tanggal dengan int(), float(), atau pengurai tanggal, dan harus menangani "17,5" yang diketik dengan koma desimal.',
        'Lembar kerja (spreadsheet) juga mengerjakan * sebelum +: =2+3*4 menghasilkan 14, dan MOD(32; 5) menghasilkan 2 seperti 32 % 5. Namun tidak semua aturannya sama: spreadsheet menghitung =-2^2 sebagai 4, sedangkan Python memberi -2 ** 2 = -4.',
        'Struk belanja dan rapor merapikan angka dengan dua desimal atau pemisah ribuan, misalnya f"{total:,}" → \'60,000\' (gaya Indonesia menulis 60.000).',
        'Pedoman gaya seperti PEP 8 dan tinjauan kode menuntut nama snake_case yang bermakna, agar anggota tim bisa membaca program satu sama lain.',
      ],
    },
    questions: {
      en: [
        { q: 'a = 3 and b = 7, then a = b and b = a. What are a and b now, and why?', a: 'Both are 7. a = b overwrites the 3 before it was saved anywhere, so b = a copies the 7 back. Use temp = a first, or a, b = b, a.' },
        { q: 'Work out 2 + 3 * 4 ** 2 // 5 % 3 step by step.', a: '4 ** 2 = 16, then 3 * 16 = 48, 48 // 5 = 9, 9 % 3 = 0 (left to right at the same level), and 2 + 0 = 2.' },
        { q: 'umur = input("Umur: ") and the user types 17. What are type(umur) and umur * 2?', a: '<class \'str\'>, and umur * 2 is \'1717\' (the text repeated), not 34. Convert with int(umur) first.' },
        { q: 'Which of these names are valid: nilai1, 1nilai, rata rata, No_HP, class, _total?', a: 'nilai1, No_HP and _total are valid (No_HP only breaks the lowercase style convention). 1nilai starts with a digit, rata rata contains a space, and class is a keyword.' },
        { q: '32 students are put in groups of 5. Write the Python for the number of full groups and the students left over, and check the answer.', a: '32 // 5 = 6 full groups and 32 % 5 = 2 students left; check: 6 * 5 + 2 == 32 is True.' },
      ],
      id: [
        { q: 'a = 3 dan b = 7, lalu a = b dan b = a. Berapa isi a dan b sekarang, dan mengapa?', a: 'Keduanya 7. a = b menimpa angka 3 sebelum disimpan di mana pun, sehingga b = a menyalin 7 kembali. Gunakan temp = a terlebih dahulu, atau a, b = b, a.' },
        { q: 'Hitung 2 + 3 * 4 ** 2 // 5 % 3 langkah demi langkah.', a: '4 ** 2 = 16, lalu 3 * 16 = 48, 48 // 5 = 9, 9 % 3 = 0 (dari kiri ke kanan pada tingkat yang sama), dan 2 + 0 = 2.' },
        { q: 'umur = input("Umur: ") dan pengguna mengetik 17. Apa hasil type(umur) dan umur * 2?', a: '<class \'str\'>, dan umur * 2 menghasilkan \'1717\' (teks diulang), bukan 34. Ubah dulu dengan int(umur).' },
        { q: 'Manakah nama yang sah: nilai1, 1nilai, rata rata, No_HP, class, _total?', a: 'nilai1, No_HP, dan _total sah (No_HP hanya melanggar konvensi gaya huruf kecil). 1nilai diawali angka, rata rata berisi spasi, dan class adalah kata kunci.' },
        { q: '32 siswa dibagi ke kelompok berisi 5. Tulis kode Python untuk banyak kelompok penuh dan sisa siswa, lalu periksa jawabannya.', a: '32 // 5 = 6 kelompok penuh dan 32 % 5 = 2 siswa tersisa; periksa: 6 * 5 + 2 == 32 bernilai True.' },
      ],
    },
  },
};
