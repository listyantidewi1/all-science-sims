// Long-form text for the sim page (objectives, try-this prompts and the Learn block).
export default {
  objectives: {
    en: [
      'Explain def, parameters, arguments and return by tracing real calls, and tell a function that prints a result from one that returns it.',
      'Describe the call stack: every call pushes a frame with its parameters and local variables, every return pops it, and only the top frame runs.',
      'Trace function calls with a call table and predict return values, including nested calls, shared lists, local vs global variables and recursion.',
    ],
    id: [
      'Menjelaskan def, parameter, argumen, dan return dengan menelusuri pemanggilan nyata, serta membedakan fungsi yang mencetak hasil dari fungsi yang mengembalikannya.',
      'Menjelaskan tumpukan pemanggilan: setiap pemanggilan menaruh bingkai berisi parameter dan variabel lokalnya, setiap return mengambilnya kembali, dan hanya bingkai teratas yang berjalan.',
      'Menelusuri pemanggilan fungsi dengan tabel pemanggilan dan menebak nilai balik, termasuk pemanggilan bersarang, list yang dipakai bersama, variabel lokal dan global, serta rekursi.',
    ],
  },
  tryThis: {
    en: [
      'Program 2 (rectangle area): press Step until the first call. Which argument goes into which parameter? Keep stepping until the frame is popped: what replaces rectangle_area(120, 60) on line 5?',
      'Program 5 (a function calls a function): step to the deepest point. How many frames are on the stack, and at which line is each lower frame waiting? Then press Step out to finish the top call at once.',
      'Turn on "Predict return values" and choose program 11 (guess the output). Type what each call will return before it runs, especially the two calls in change(change(1)), and read your score at the end.',
      'Program 12 (factorial): predict the deepest stack for factorial(8), edit the call and check. Then delete the base case (lines 2 and 3) and press "To end": which error stops the program, and how many frames were on the stack?',
    ],
    id: [
      'Program 2 (luas persegi panjang): tekan Langkah sampai pemanggilan pertama. Argumen mana masuk ke parameter mana? Lanjutkan sampai bingkainya diambil: apa yang menggantikan luas_persegi_panjang(120, 60) di baris 5?',
      'Program 5 (fungsi memanggil fungsi): melangkahlah sampai titik terdalam. Berapa bingkai ada di tumpukan, dan di baris mana setiap bingkai di bawahnya menunggu? Lalu tekan Keluar untuk menyelesaikan pemanggilan teratas sekaligus.',
      'Nyalakan "Tebak nilai balik" dan pilih program 11 (tebak output). Ketik nilai balik setiap pemanggilan sebelum berjalan, terutama dua pemanggilan dalam ubah(ubah(1)), lalu baca skormu di akhir.',
      'Program 12 (faktorial): tebak tumpukan terdalam untuk faktorial(8), ubah pemanggilannya, lalu periksa. Kemudian hapus kasus dasarnya (baris 2 dan 3) dan tekan "Ke akhir": galat apa yang menghentikan program, dan berapa bingkai ada di tumpukan?',
    ],
  },

  learn: {
    background: {
      en: [
        'A function can be pictured as a machine that can be used again and again: it has a name, input holes (parameters), a process inside (the indented body under def) and an output (the return value). Writing def only builds the machine and stores its name; nothing inside runs until the function is called with arguments, such as greet("Andi"). The arguments are copied into the parameters in order, and a parameter with a default value (fee_per_day=1000) uses the default when the call leaves it out. return gives a value back and ends the function at once. A function that only prints (a "procedure") still returns something: None. That is why a = print_area(5, 3) leaves a = None, while b = calc_area(5, 3) gives b = 15 that can be used in b + 1.',
        'Python keeps track of calls with the call stack. Every call pushes a new frame on top: a box holding that call\'s parameters and local variables. Only the top frame runs; the frame below waits at the line that made the call. When return runs, the frame is popped, its local variables disappear, and the value replaces the call in the waiting line, so desk_area = rectangle_area(120, 60) becomes desk_area = 7200. The main program is the global frame at the bottom. A function can read a global variable, but assigning to a name anywhere in a function makes that name local for the whole function, so reading it first raises UnboundLocalError. Numbers and strings behave like copies: x = x * 2 inside change(x) leaves a = 5 in the caller. A list is passed as a reference to the same object, so roster.append(name) inside a function changes duty in the main program without any return (the Class duty roster program).',
        'In this sim the program runs in minipy, a JavaScript implementation of the Python 3.13 subset taught in SMA; every preset prints exactly what python3 prints. One Step is one statement, one call (a frame is pushed and arrows carry the arguments to the parameters) or one return (the frame is popped and the value travels back to the call site). Step over runs a whole call at once, Step out finishes the running function, and Back or the step slider replays earlier steps. The call table under the picture is a tracing table: one row per call with the parameters, the local variables and the return value. total_price(5000, 4, 10) returns 18000.0, not 18000, because / always gives a float. Predict mode stops at every call and checks your guess when the frame is popped.',
        'A function may call itself; this is recursion. factorial(5) calls factorial(4), which calls factorial(3), and so on until the base case n <= 1 returns 1. At the deepest point there are n + 1 = 6 frames (five calls plus the main program); then the frames are popped one by one and the values 1, 2, 6, 24 and 120 come back in that order. Without a base case the stack keeps growing until Python stops it at 1000 frames with RecursionError. For more recursion see the Tower of Hanoi and Recursive Fibonacci sims; for the stack as a data structure (LIFO, push and pop) see Stack vs Queue; to trace whole programs with memory boxes see Python Step by Step.',
      ],
      id: [
        'Fungsi dapat digambarkan sebagai mesin yang dapat dipakai berulang kali: punya nama, lubang masukan (parameter), proses di dalamnya (badan fungsi yang menjorok di bawah def), dan hasil keluaran (nilai balik). Menulis def hanya merakit mesin dan menyimpan namanya; isinya belum berjalan sampai fungsi dipanggil dengan argumen, misalnya sapa("Andi"). Argumen disalin ke parameter sesuai urutannya, dan parameter yang punya nilai bawaan (denda_per_hari=1000) memakai nilai itu bila pemanggilan tidak mengisinya. return mengembalikan sebuah nilai dan langsung mengakhiri fungsi. Fungsi yang hanya mencetak (sering disebut prosedur) tetap mengembalikan sesuatu, yaitu None. Itulah sebabnya a = cetak_luas(5, 3) membuat a = None, sedangkan b = hitung_luas(5, 3) menghasilkan b = 15 yang dapat dipakai dalam b + 1.',
        'Python mencatat pemanggilan dengan tumpukan pemanggilan (call stack). Setiap pemanggilan menaruh bingkai (frame) baru di puncak: kotak berisi parameter dan variabel lokal milik pemanggilan itu. Hanya bingkai teratas yang berjalan; bingkai di bawahnya menunggu di baris yang memanggil. Ketika return dijalankan, bingkai diambil dari tumpukan, variabel lokalnya hilang, dan nilainya menggantikan pemanggilan di baris yang menunggu, sehingga luas_meja = luas_persegi_panjang(120, 60) menjadi luas_meja = 7200. Program utama adalah bingkai global di dasar tumpukan. Fungsi boleh membaca variabel global, tetapi mengisi sebuah nama di bagian mana pun dalam fungsi membuat nama itu lokal untuk seluruh fungsi, sehingga membacanya lebih dulu menimbulkan UnboundLocalError. Bilangan dan teks berperilaku seperti salinan: x = x * 2 di dalam ubah(x) membiarkan a = 5 pada pemanggil. List dikirim sebagai rujukan ke objek yang sama, sehingga daftar.append(nama) di dalam fungsi mengubah piket di program utama tanpa return (program Daftar Piket Kelas).',
        'Dalam simulasi ini program dijalankan oleh minipy, implementasi JavaScript untuk bagian Python 3.13 yang diajarkan di SMA; setiap program contoh mencetak persis sama dengan python3. Satu Langkah adalah satu pernyataan, satu pemanggilan (bingkai ditaruh dan panah membawa argumen ke parameter), atau satu return (bingkai diambil dan nilainya kembali ke tempat pemanggilan). Lewati menjalankan seluruh pemanggilan sekaligus, Keluar menyelesaikan fungsi yang sedang berjalan, dan Mundur atau penggeser langkah memutar ulang langkah sebelumnya. Tabel pemanggilan di bawah gambar adalah tabel penelusuran: satu baris per pemanggilan berisi parameter, variabel lokal, dan nilai balik. hitung_total(5000, 4, 10) mengembalikan 18000.0, bukan 18000, karena operator / selalu menghasilkan float. Mode tebak berhenti di setiap pemanggilan dan memeriksa tebakanmu saat bingkainya diambil.',
        'Sebuah fungsi boleh memanggil dirinya sendiri; inilah rekursi. faktorial(5) memanggil faktorial(4), yang memanggil faktorial(3), dan seterusnya sampai kasus dasar n <= 1 mengembalikan 1. Di titik terdalam ada n + 1 = 6 bingkai (lima pemanggilan ditambah program utama); lalu bingkai diambil satu per satu dan nilai 1, 2, 6, 24, dan 120 kembali dengan urutan itu. Tanpa kasus dasar tumpukan terus tumbuh sampai Python menghentikannya di 1000 bingkai dengan RecursionError. Untuk rekursi lainnya lihat simulasi Menara Hanoi dan Fibonacci Rekursif; untuk stack sebagai struktur data (LIFO, push dan pop) lihat Stack vs Queue; untuk menelusuri program utuh dengan kotak memori lihat Python Langkah demi Langkah.',
      ],
    },
    figure: {
      caption: {
        en: 'The call stack of program 5 at its deepest point: print_report("Cici", 74.9) has called mastery_status(score). The call pushed a new frame and copied the argument 74.9 into the parameter score; when the top frame returns, it is popped and "Not yet mastered" goes back into the waiting line status = mastery_status(score).',
        id: 'Tumpukan pemanggilan program 5 di titik terdalam: cetak_rapor("Cici", 74.9) memanggil status_ketuntasan(nilai). Pemanggilan menaruh bingkai baru dan menyalin argumen 74.9 ke parameter nilai; ketika bingkai teratas selesai, bingkai itu diambil dan "Belum Tuntas" kembali ke baris yang menunggu, status = status_ketuntasan(nilai).',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        const top = L('mastery_status', 'status_ketuntasan');
        const mid = L('print_report', 'cetak_rapor');
        const p1 = L('name', 'nama');
        const p2 = L('score', 'nilai');
        const ret = L('"Not yet mastered"', '"Belum Tuntas"');
        return `<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Three frames on the call stack, with the argument copied into the parameter and the return value going back to the caller', 'Tiga bingkai di tumpukan pemanggilan, dengan argumen disalin ke parameter dan nilai balik kembali ke pemanggil')}">
  <style>text{font:12px system-ui,sans-serif;fill:currentColor}.fcsx-m{font:11.5px ui-monospace,Menlo,monospace}.fcsx-s{font:10.5px ui-monospace,Menlo,monospace}.fcsx-t{font:10px ui-monospace,Menlo,monospace}.fcsx-n{font:10.5px system-ui,sans-serif;opacity:.8}.fcsx-b{font-weight:700}.fcsx-f{fill:none;stroke:currentColor;stroke-width:1.2;opacity:.6}.fcsx-v{fill:none;stroke:#3b82f6;stroke-width:1.5}</style>
  <defs>
    <marker id="fcsx-fa" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="#d97706"/></marker>
    <marker id="fcsx-fg" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="#059669"/></marker>
  </defs>
  <rect x="8" y="8" width="196" height="68" rx="8" fill="none" stroke="#d97706" stroke-width="2.2"/>
  <text x="16" y="26" class="fcsx-m fcsx-b">${top}</text>
  <text x="196" y="26" text-anchor="end" class="fcsx-n">${L('runs', 'berjalan')}</text>
  <text x="64" y="48" text-anchor="end" class="fcsx-m">${p2}</text>
  <rect x="70" y="36" width="44" height="18" rx="4" class="fcsx-v"/>
  <text x="92" y="49" text-anchor="middle" class="fcsx-m">74.9</text>
  <text x="16" y="68" class="fcsx-s">return ${ret}</text>
  <rect x="8" y="86" width="196" height="72" rx="8" class="fcsx-f"/>
  <text x="16" y="104" class="fcsx-m fcsx-b">${mid}</text>
  <text x="196" y="104" text-anchor="end" class="fcsx-n">${L('waits', 'menunggu')}</text>
  <text x="64" y="126" text-anchor="end" class="fcsx-m">${p1}</text>
  <rect x="70" y="114" width="56" height="18" rx="4" class="fcsx-v"/>
  <text x="98" y="127" text-anchor="middle" class="fcsx-m">'Cici'</text>
  <text x="64" y="148" text-anchor="end" class="fcsx-m">${p2}</text>
  <rect x="70" y="136" width="44" height="18" rx="4" class="fcsx-v"/>
  <text x="92" y="149" text-anchor="middle" class="fcsx-m">74.9</text>
  <rect x="8" y="168" width="196" height="50" rx="8" class="fcsx-f"/>
  <text x="16" y="186" class="fcsx-b">${L('Main program', 'Program utama')}</text>
  <text x="196" y="186" text-anchor="end" class="fcsx-n">${L('waits', 'menunggu')}</text>
  <text x="16" y="207" class="fcsx-s">${mid}("Cici", 74.9)</text>
  <path d="M116 145 H 220 Q 232 145 232 133 V 57 Q 232 45 220 45 H 119" fill="none" stroke="#d97706" stroke-width="1.8" marker-end="url(#fcsx-fa)"/>
  <path d="M204 66 C 222 66 222 104 207 104" fill="none" stroke="#059669" stroke-width="1.8" stroke-dasharray="5 3" marker-end="url(#fcsx-fg)"/>
  <text x="242" y="24" class="fcsx-b">${L('1. call (push)', '1. panggil (push)')}</text>
  <text x="242" y="39" class="fcsx-s">74.9 → ${p2}</text>
  <text x="242" y="78" class="fcsx-b">2. return (pop)</text>
  <text x="242" y="93" class="fcsx-t">${ret}</text>
  <text x="242" y="107" class="fcsx-s">→ status</text>
  <text x="242" y="182" class="fcsx-n">${L('top: running', 'atas: berjalan')}</text>
  <text x="242" y="197" class="fcsx-n">${L('below: waiting', 'bawah: menunggu')}</text>
  <text x="242" y="212" class="fcsx-n">${L('bottom: global', 'dasar: global')}</text>
  <text x="106" y="234" text-anchor="middle" class="fcsx-n">${L('the newest frame is always on top (LIFO)', 'bingkai terbaru selalu di atas (LIFO)')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'def only defines a function; its body runs each time the function is called, and the arguments are copied into the parameters in order (a parameter with a default value uses it when the argument is left out).',
        'Each call pushes a frame with its own parameters and local variables; only the top frame runs, and the frames below wait at the line that made the call (last in, first out).',
        'return ends the function at once and its value replaces the call in the caller; a function without return gives back None, so print shows a result while return hands it back.',
        'Local variables disappear when their frame is popped. Assigning to a name inside a function makes it local for the whole function; read data through parameters and send results back with return.',
        'A list passed to a function is not copied: the parameter and the caller\'s variable point at one list, so append, remove and insert inside the function change it for the caller too.',
        'A recursive function calls itself with a smaller problem; factorial(n) needs n + 1 frames at the deepest point, and a missing base case ends in RecursionError.',
      ],
      id: [
        'def hanya mendefinisikan fungsi; badannya dijalankan setiap kali fungsi dipanggil, dan argumen disalin ke parameter sesuai urutan (parameter bernilai bawaan memakai nilai itu bila argumennya tidak diberikan).',
        'Setiap pemanggilan menaruh bingkai berisi parameter dan variabel lokalnya sendiri; hanya bingkai teratas yang berjalan, dan bingkai di bawahnya menunggu di baris yang memanggil (masuk terakhir, keluar pertama).',
        'return langsung mengakhiri fungsi dan nilainya menggantikan pemanggilan di baris pemanggil; fungsi tanpa return mengembalikan None, jadi print menampilkan hasil sedangkan return menyerahkannya kembali.',
        'Variabel lokal hilang saat bingkainya diambil. Mengisi sebuah nama di dalam fungsi membuatnya lokal untuk seluruh fungsi; kirim data lewat parameter dan kembalikan hasil dengan return.',
        'List yang dikirim ke fungsi tidak disalin: parameter dan variabel milik pemanggil menunjuk satu list yang sama, sehingga append, remove, dan insert di dalam fungsi juga mengubahnya bagi pemanggil.',
        'Fungsi rekursif memanggil dirinya sendiri dengan masalah yang lebih kecil; faktorial(n) membutuhkan n + 1 bingkai di titik terdalam, dan tanpa kasus dasar program berakhir dengan RecursionError.',
      ],
    },
    vocabulary: {
      en: [
        ['Function', 'A named block of code made with def that does one job and can be called many times.'],
        ['Parameter', 'A name in the def line that receives a value, e.g. length in def rectangle_area(length, width).'],
        ['Argument', 'The actual value sent in a call, e.g. 120 in rectangle_area(120, 60).'],
        ['Return value', 'The value a function gives back with return; it replaces the call in the caller. Without return it is None.'],
        ['Frame', 'The box Python makes for one call: its parameters, its local variables and the line it is running.'],
        ['Call stack', 'The pile of frames of the calls that have not finished yet; the newest is on top (last in, first out).'],
        ['Local / global variable', 'A local variable exists only inside one call\'s frame; a global variable belongs to the main program.'],
        ['Recursion, base case', 'A function that calls itself; the base case is the condition that stops the calls (n <= 1 in factorial).'],
      ],
      id: [
        ['Fungsi', 'Blok kode bernama yang dibuat dengan def, mengerjakan satu tugas, dan dapat dipanggil berkali-kali.'],
        ['Parameter', 'Nama di baris def yang menerima nilai, misalnya panjang pada def luas_persegi_panjang(panjang, lebar).'],
        ['Argumen', 'Nilai sesungguhnya yang dikirim saat pemanggilan, misalnya 120 pada luas_persegi_panjang(120, 60).'],
        ['Nilai balik', 'Nilai yang dikembalikan fungsi dengan return; nilai ini menggantikan pemanggilan di baris pemanggil. Tanpa return nilainya None.'],
        ['Bingkai (frame)', 'Kotak yang dibuat Python untuk satu pemanggilan: parameternya, variabel lokalnya, dan baris yang sedang dijalankan.'],
        ['Tumpukan pemanggilan (call stack)', 'Tumpukan bingkai dari pemanggilan yang belum selesai; yang terbaru di atas (masuk terakhir, keluar pertama).'],
        ['Variabel lokal / global', 'Variabel lokal hanya ada di dalam bingkai satu pemanggilan; variabel global milik program utama.'],
        ['Rekursi, kasus dasar', 'Fungsi yang memanggil dirinya sendiri; kasus dasar adalah kondisi yang menghentikan pemanggilan (n <= 1 pada faktorial).'],
      ],
    },
    misconceptions: {
      en: [
        ['Writing def runs the function.', 'def only stores the function under its name. The body runs when the function is called, once per call: three greet(...) lines give three greetings from one definition.'],
        ['print and return do the same thing.', 'print only shows text on the screen; the call still returns None. Only return hands a value back that can be stored or used in a calculation (a = print_area(5, 3) gives a = None).'],
        ['Changing a parameter changes the caller\'s variable.', 'Assigning to a parameter (x = x * 2) changes only the local name in the function\'s frame; a stays 5. Only changing a shared object in place, such as roster.append(name), is seen by the caller.'],
        ['A function can freely update a global variable by assigning to it.', 'An assignment inside a function makes the name local for the whole function, so team_score = team_score + 10 raises UnboundLocalError. Pass the value in as a parameter and return the new value.'],
        ['In recursion all the calls run at the same time.', 'Only the top frame runs. The other calls wait on the stack, each paused in the middle of its return line, and they finish one by one in the reverse order of the calls.'],
      ],
      id: [
        ['Menulis def berarti menjalankan fungsi.', 'def hanya menyimpan fungsi dengan namanya. Badan fungsi berjalan ketika fungsi dipanggil, sekali per pemanggilan: tiga baris sapa(...) menghasilkan tiga sapaan dari satu definisi.'],
        ['print dan return sama saja.', 'print hanya menampilkan teks di layar; pemanggilannya tetap mengembalikan None. Hanya return yang menyerahkan nilai yang dapat disimpan atau dipakai dalam hitungan (a = cetak_luas(5, 3) membuat a = None).'],
        ['Mengubah parameter mengubah variabel milik pemanggil.', 'Mengisi parameter (x = x * 2) hanya mengubah nama lokal di bingkai fungsi itu; a tetap 5. Hanya perubahan langsung pada objek yang dipakai bersama, misalnya daftar.append(nama), yang terlihat oleh pemanggil.'],
        ['Fungsi bebas mengubah variabel global dengan mengisinya.', 'Pengisian di dalam fungsi membuat nama itu lokal untuk seluruh fungsi, sehingga skor_tim = skor_tim + 10 menimbulkan UnboundLocalError. Kirim nilainya lewat parameter dan kembalikan nilai barunya.'],
        ['Pada rekursi semua pemanggilan berjalan bersamaan.', 'Hanya bingkai teratas yang berjalan. Pemanggilan lainnya menunggu di tumpukan, masing-masing berhenti di tengah baris return-nya, lalu selesai satu per satu dengan urutan terbalik dari urutan pemanggilan.'],
      ],
    },
    realWorld: {
      en: [
        'A Python traceback is a printout of the call stack at the moment of an error: "most recent call last" lists the frames from the main program up to the function that failed.',
        'Debuggers in Thonny, IDLE and VS Code show a call-stack panel with Step into, Step over and Step out buttons, the same moves as in this sim.',
        'Large programs are built from small functions so that each part can be tested on its own, fixed in one place and shared between team members.',
        'The processor keeps a stack in memory for return addresses and local data; very deep recursion fills it, which is why Python sets a recursion limit.',
      ],
      id: [
        'Traceback Python adalah cetakan tumpukan pemanggilan saat galat terjadi: "most recent call last" mencantumkan bingkai dari program utama sampai fungsi yang gagal.',
        'Debugger di Thonny, IDLE, dan VS Code menampilkan panel call stack dengan tombol Step into, Step over, dan Step out, sama seperti gerakan di simulasi ini.',
        'Program besar disusun dari fungsi-fungsi kecil agar setiap bagian dapat diuji sendiri, diperbaiki di satu tempat, dan dibagi di antara anggota tim.',
        'Prosesor menyimpan sebuah stack di memori untuk alamat kembali dan data lokal; rekursi yang sangat dalam memenuhinya, itulah sebabnya Python memasang batas rekursi.',
      ],
    },
    questions: {
      en: [
        { q: 'def change(x): x = x * 2; return x + 1. After a = 5 and b = change(a), what does print(a, b) show, and what is change(change(1))?', a: 'It shows 5 11: x = x * 2 changes only the local x in the frame of change, so a stays 5, and the call returns 10 + 1 = 11. In change(change(1)) the inner call runs first and returns 3; that 3 becomes the argument of the outer call, which returns 7. There are never more than two frames, because the inner frame is popped before the outer one is pushed.' },
        { q: 'Why does total_price(5000, 4, 10) return 18000.0 and not 18000?', a: 'subtotal = 5000 * 4 = 20000 is an int, but discount = 20000 * 10 / 100 = 2000.0 is a float because / always gives a float. int minus float is a float, so the return value is 18000.0.' },
        { q: 'How many calls does factorial(8) make, and how many frames are on the stack at the deepest point?', a: 'Eight calls: factorial(8) down to factorial(1). At the deepest point all eight wait on the stack together with the main program, so 9 frames, n + 1 in general. The return values come back in the order 1, 2, 6, 24, 120, 720, 5040, 40320.' },
        { q: 'In program 8, the function contains team_score = team_score + 10 and the program stops with UnboundLocalError. Why, and how should it be fixed?', a: 'Because team_score is assigned inside the function, Python treats it as a local variable for the whole function; the right-hand side reads that local before it has a value. Fix it by passing the score in and returning the result: def add_bonus(score): return score + 10, then team_score = add_bonus(team_score).' },
      ],
      id: [
        { q: 'def ubah(x): x = x * 2; return x + 1. Setelah a = 5 dan b = ubah(a), apa yang ditampilkan print(a, b), dan berapa nilai ubah(ubah(1))?', a: 'Tampil 5 11: x = x * 2 hanya mengubah x lokal di bingkai ubah, sehingga a tetap 5, dan pemanggilan mengembalikan 10 + 1 = 11. Pada ubah(ubah(1)) pemanggilan dalam berjalan lebih dulu dan mengembalikan 3; nilai 3 itu menjadi argumen pemanggilan luar, yang mengembalikan 7. Tidak pernah ada lebih dari dua bingkai, karena bingkai dalam sudah diambil sebelum bingkai luar ditaruh.' },
        { q: 'Mengapa hitung_total(5000, 4, 10) mengembalikan 18000.0, bukan 18000?', a: 'subtotal = 5000 * 4 = 20000 bertipe int, tetapi potongan = 20000 * 10 / 100 = 2000.0 bertipe float karena operator / selalu menghasilkan float. int dikurangi float menghasilkan float, sehingga nilai baliknya 18000.0.' },
        { q: 'Berapa kali faktorial(8) memanggil fungsi, dan berapa bingkai ada di tumpukan pada titik terdalam?', a: 'Delapan pemanggilan: faktorial(8) sampai faktorial(1). Di titik terdalam kedelapannya menunggu di tumpukan bersama program utama, jadi 9 bingkai, secara umum n + 1. Nilai balik kembali dengan urutan 1, 2, 6, 24, 120, 720, 5040, 40320.' },
        { q: 'Di program 8, fungsi berisi skor_tim = skor_tim + 10 dan program berhenti dengan UnboundLocalError. Mengapa, dan bagaimana memperbaikinya?', a: 'Karena skor_tim diisi di dalam fungsi, Python menganggapnya variabel lokal untuk seluruh fungsi; ruas kanan membaca variabel lokal itu sebelum ada nilainya. Perbaiki dengan mengirim skor lewat parameter dan mengembalikan hasilnya: def tambah_bonus(skor): return skor + 10, lalu skor_tim = tambah_bonus(skor_tim).' },
      ],
    },
  },
};
