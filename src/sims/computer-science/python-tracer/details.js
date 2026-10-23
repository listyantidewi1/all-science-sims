// Long-form text for the sim page (objectives, try-this prompts and the Learn block).
export default {
  objectives: {
    en: [
      'Trace a Python program one step at a time and explain how each statement changes the variables in memory and the output.',
      'Predict the output of a short program before running it (PRIMM: Predict, Run, Investigate) and find the first line where the prediction went wrong.',
      'Use a trace table with boundary test data (80, 75, 74.9) to check branches, loops, lists, stacks, queues and function calls.',
    ],
    id: [
      'Menelusuri program Python langkah demi langkah dan menjelaskan bagaimana setiap pernyataan mengubah variabel di memori dan keluaran.',
      'Menebak keluaran program pendek sebelum menjalankannya (PRIMM: Predict, Run, Investigate) dan menemukan baris pertama tempat tebakan meleset.',
      'Memakai tabel penelusuran dengan data uji batas (80, 75, 74,9) untuk memeriksa percabangan, perulangan, list, stack, queue, dan pemanggilan fungsi.',
    ],
  },
  tryThis: {
    en: [
      'Choose program 5 (pass or fail) and click the test-data button 75. Turn on Predict mode, write the output you expect, then press "To end". Do the same with 74.9.',
      'In program 16 (guess the output: functions), step until change(a) is called and watch the new frame: does x = x * 2 inside the function change a in the global frame?',
      'In program 17 (class duty roster), step into add_student: two arrows point at one list. Which names show the new name after roster.append(name) runs?',
      'Edit program 9 so the loop reads range(1, n) instead of range(1, n + 1), run it with 5 and use the trace table to find the step where the loop stops too early.',
    ],
    id: [
      'Pilih program 5 (predikat kelulusan) dan klik tombol data uji 75. Nyalakan Mode tebak, tulis keluaran yang kamu perkirakan, lalu tekan "Ke akhir". Lakukan hal yang sama dengan 74.9.',
      'Di program 16 (tebak output: fungsi), jalankan langkah demi langkah sampai ubah(a) dipanggil dan amati bingkai barunya: apakah x = x * 2 di dalam fungsi mengubah a di bingkai global?',
      'Di program 17 (daftar piket kelas), masuk ke tambah_petugas: dua panah menunjuk satu list. Nama mana saja yang menampilkan petugas baru setelah daftar.append(nama) dijalankan?',
      'Ubah program 9 sehingga perulangannya range(1, n) alih-alih range(1, n + 1), jalankan dengan 5, lalu pakai tabel penelusuran untuk menemukan langkah tempat perulangan berhenti terlalu cepat.',
    ],
  },

  learn: {
    background: {
      en: [
        'A computer runs a program one statement at a time. Tracing means pausing after every statement to look at the state of the program: which line runs next, what every variable holds and what has been printed so far. On paper this is the trace table (tabel penelusuran); here the table fills itself in. One Step runs one statement (an assignment, a print, a def that creates a function), or one test of a header line such as if, elif, while, for, match or case, so "Sum 1 to n" with n = 5 takes 2n + 4 = 14 steps: two before the loop, six tests of the for header (five that enter the loop and one that ends it), five additions and the final print. The code runs in minipy, a JavaScript implementation of the Python 3.13 subset taught in SMA; every preset program prints exactly what python3 prints.',
        'The memory panel draws each variable as a labelled box. Numbers, text, True/False and None sit inside the box, coloured by type (int, float, str, bool, None): after score = float(input(...)) the box holds the float 80.0, and if you delete float( ) it holds the str \'80\' instead. (Strictly, Python stores every value as an object; numbers and strings cannot be changed in place, so drawing them inside the box behaves the same.) Lists, tuples, dictionaries and deques are objects drawn beside or below the frames, with numbered cells; the variable holds an arrow (a reference) to the object. When two names point at the same list, both arrows end at one object and its label lists both names. This is why the duty-roster functions change duty without returning anything: the parameter roster and the global name duty share one list.',
        'Every function call creates a new frame with its parameters and local variables; the frame with the amber border is the one running. When the function returns, its frame disappears, a note shows the value it returned and the calling line continues with that value. When an if, elif or while header runs, the sim works out the condition with the current values (when the condition calls no function of your own) and shows it in the note on the code panel and in the trace table, for example 74.9 >= 75 → False, which is the condition-check column of a trace table on paper.',
        'Predict mode supports the PRIMM cycle and the "Tebak Output" game: you write the output first, the box locks when the program starts, and at the end your prediction is compared line by line with the console, with the first difference highlighted. Values for input() come from the input box, one per line; when they run out the program waits for you to type in the console. A SyntaxError is reported before any line runs, because Python checks the whole file first; a runtime error stops the program at the failing line with the same traceback text python3 prints (without its ^^^ marker lines). A program that runs more than 5000 steps is stopped by the simulator, not by Python: look for a loop that never ends. For flowcharts of the same ideas see the Flowchart Runner sim, and for stacks and queues on their own see Stack vs Queue.',
      ],
      id: [
        'Komputer menjalankan program satu pernyataan demi satu pernyataan. Menelusuri (tracing) berarti berhenti setelah setiap pernyataan untuk melihat keadaan program: baris mana yang dijalankan berikutnya, isi setiap variabel, dan apa saja yang sudah dicetak. Di kertas, inilah tabel penelusuran; di sini tabel itu terisi sendiri. Satu Langkah menjalankan satu pernyataan (penugasan, print, atau def yang membuat fungsi), atau satu pengujian baris kepala seperti if, elif, while, for, match, atau case, sehingga "Jumlah 1 sampai n" dengan n = 5 membutuhkan 2n + 4 = 14 langkah: dua sebelum perulangan, enam pengujian kepala for (lima yang masuk ke perulangan dan satu yang mengakhirinya), lima penjumlahan, dan print terakhir. Kode dijalankan oleh minipy, implementasi JavaScript untuk bagian Python 3.13 yang diajarkan di SMA; setiap program contoh mencetak persis sama dengan python3.',
        'Panel memori menggambar setiap variabel sebagai kotak berlabel. Bilangan, teks, True/False, dan None berada di dalam kotak dan diberi warna sesuai tipenya (int, float, str, bool, None): setelah nilai = float(input(...)) kotaknya berisi float 80.0, dan jika float( ) dihapus kotaknya berisi str \'80\'. (Sebenarnya Python menyimpan setiap nilai sebagai objek; bilangan dan teks tidak bisa diubah di tempat, jadi menggambarnya di dalam kotak memberi hasil yang sama.) List, tuple, dictionary, dan deque adalah objek yang digambar di samping atau di bawah bingkai, dengan sel bernomor; variabelnya menyimpan panah (referensi) ke objek itu. Jika dua nama menunjuk list yang sama, kedua panah berakhir di satu objek dan labelnya mencantumkan kedua nama. Inilah sebabnya fungsi-fungsi daftar piket mengubah piket tanpa mengembalikan apa pun: parameter daftar dan nama global piket memakai satu list yang sama.',
        'Setiap pemanggilan fungsi membuat bingkai baru berisi parameter dan variabel lokalnya; bingkai dengan garis tepi kuning adalah yang sedang berjalan. Ketika fungsi selesai, bingkainya hilang, sebuah catatan menunjukkan nilai yang dikembalikan, dan baris pemanggil melanjutkan dengan nilai itu. Ketika kepala if, elif, atau while dijalankan, simulasi menghitung kondisinya dengan nilai saat itu (jika kondisinya tidak memanggil fungsi buatanmu sendiri) dan menampilkannya di catatan panel kode dan di tabel penelusuran, misalnya 74.9 >= 75 → False, yaitu kolom evaluasi kondisi pada tabel penelusuran di kertas.',
        'Mode tebak mendukung siklus PRIMM dan permainan "Tebak Output": kamu menulis keluaran lebih dulu, kotaknya terkunci saat program mulai, dan di akhir tebakanmu dibandingkan baris demi baris dengan konsol, dengan perbedaan pertama ditandai. Nilai untuk input() diambil dari kotak masukan, satu per baris; jika habis, program menunggu kamu mengetik di konsol. SyntaxError dilaporkan sebelum satu baris pun berjalan, karena Python memeriksa seluruh berkas lebih dulu; galat saat berjalan menghentikan program di baris yang gagal dengan teks traceback yang sama seperti python3 (tanpa baris penanda ^^^). Program yang berjalan lebih dari 5000 langkah dihentikan oleh simulasi, bukan oleh Python: carilah perulangan yang tidak pernah berhenti. Untuk diagram alir dari gagasan yang sama lihat simulasi Penjalan Diagram Alir, dan untuk stack dan queue secara khusus lihat Stack vs Queue.',
      ],
    },
    figure: {
      caption: {
        en: 'Two names, one list: the global name duty and the parameter roster both point at the same list object, so roster.append("Eko") inside add_student changes what duty shows. A number such as score is drawn directly inside its own box.',
        id: 'Dua nama, satu list: nama global piket dan parameter daftar sama-sama menunjuk objek list yang sama, sehingga daftar.append("Eko") di dalam tambah_petugas mengubah isi piket. Bilangan seperti nilai digambar langsung di dalam kotaknya sendiri.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Two variables referring to one list', 'Dua variabel yang menunjuk satu list')}">
  <style>text{font:12px system-ui,sans-serif;fill:currentColor}.m{font:12px ui-monospace,Menlo,monospace}.f{fill:none;stroke:currentColor;stroke-width:1.2;opacity:.55}.b{fill:none;stroke-width:1.6}.a{fill:none;stroke:currentColor;stroke-width:1.5}.s{font:8.5px ui-monospace,Menlo,monospace}.i{font:10px system-ui,sans-serif;opacity:.7}.n{font:11px system-ui,sans-serif}</style>
  <defs><marker id="ah" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="currentColor"/></marker></defs>
  <rect x="8" y="14" width="168" height="88" rx="8" class="f"/>
  <text x="18" y="32" font-weight="700">${L('Global frame', 'Bingkai global')}</text>
  <text x="62" y="58" text-anchor="end" class="m">${L('score', 'nilai')}</text>
  <rect x="70" y="45" width="40" height="20" rx="4" class="b" stroke="#3b82f6"/>
  <text x="90" y="59" text-anchor="middle" class="m" style="fill:#3b82f6">80</text>
  <text x="116" y="59" style="fill:#3b82f6">int</text>
  <text x="62" y="88" text-anchor="end" class="m">${L('duty', 'piket')}</text>
  <rect x="70" y="75" width="30" height="20" rx="4" class="b" stroke="#f97316"/>
  <circle cx="85" cy="85" r="4" fill="currentColor"/>
  <rect x="8" y="122" width="168" height="98" rx="8" class="f" stroke-dasharray="0"/>
  <text x="18" y="140" font-weight="700">${L('add_student()', 'tambah_petugas()')}</text>
  <text x="62" y="168" text-anchor="end" class="m">${L('roster', 'daftar')}</text>
  <rect x="70" y="155" width="30" height="20" rx="4" class="b" stroke="#f97316"/>
  <circle cx="85" cy="165" r="4" fill="currentColor"/>
  <text x="62" y="200" text-anchor="end" class="m">${L('name', 'nama')}</text>
  <rect x="70" y="187" width="52" height="20" rx="4" class="b" stroke="#16a34a"/>
  <text x="96" y="201" text-anchor="middle" class="m" style="fill:#16a34a">'Eko'</text>
  <text x="128" y="201" style="fill:#16a34a">str</text>
  <text x="182" y="106" style="fill:#f97316" font-weight="700">list</text>
  <text x="208" y="106" class="n">← ${L('duty, roster', 'piket, daftar')}</text>
  <rect x="182" y="112" width="34" height="34" class="b" stroke="#f97316"/>
  <rect x="216" y="112" width="34" height="34" class="b" stroke="#f97316"/>
  <rect x="250" y="112" width="34" height="34" class="b" stroke="#f97316"/>
  <rect x="284" y="112" width="34" height="34" class="b" stroke="#f97316"/>
  <rect x="318" y="112" width="34" height="34" class="b" stroke="#f97316"/>
  <text x="199" y="128" text-anchor="middle" class="s">'Andi'</text>
  <text x="233" y="128" text-anchor="middle" class="s">'Budi'</text>
  <text x="267" y="128" text-anchor="middle" class="s">'Cici'</text>
  <text x="301" y="128" text-anchor="middle" class="s">'Dina'</text>
  <text x="335" y="128" text-anchor="middle" class="s">'Eko'</text>
  <text x="199" y="142" text-anchor="middle" class="i">0</text>
  <text x="233" y="142" text-anchor="middle" class="i">1</text>
  <text x="267" y="142" text-anchor="middle" class="i">2</text>
  <text x="301" y="142" text-anchor="middle" class="i">3</text>
  <text x="335" y="142" text-anchor="middle" class="i">4</text>
  <path d="M89 85 C140 85 150 122 178 124" class="a" marker-end="url(#ah)"/>
  <path d="M89 165 C140 165 150 138 178 136" class="a" marker-end="url(#ah)"/>
  <text x="182" y="176" class="n">${L('one object,', 'satu objek,')}</text>
  <text x="182" y="191" class="n">${L('two names (aliases)', 'dua nama (alias)')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'A program runs one statement at a time from top to bottom; if/elif/else, match-case, loops and function calls change which line runs next.',
        'Assignment (=) stores a value: total = total + i first reads the old total, adds i, then replaces the old value.',
        'input() always gives a str; int() and float() convert it. Test conditions at the boundary: 75 passes score >= 75, 74.9 does not.',
        'A list is an object reached through a reference. Two names can share one list, and a function that changes a list it receives changes the caller\'s list.',
        'Each function call gets its own frame of local variables, which disappears when the function returns its value.',
        'Predicting the output first and comparing it line by line shows exactly which step your mental model got wrong.',
      ],
      id: [
        'Program berjalan satu pernyataan demi satu pernyataan dari atas ke bawah; if/elif/else, match-case, perulangan, dan pemanggilan fungsi mengubah baris mana yang dijalankan berikutnya.',
        'Penugasan (=) menyimpan nilai: total = total + i membaca total lama, menambahkan i, lalu mengganti nilai lama.',
        'input() selalu menghasilkan str; int() dan float() mengubahnya. Uji kondisi pada nilai batas: 75 lolos nilai >= 75, 74.9 tidak.',
        'List adalah objek yang dicapai lewat referensi. Dua nama bisa memakai satu list, dan fungsi yang mengubah list yang diterimanya ikut mengubah list milik pemanggil.',
        'Setiap pemanggilan fungsi mendapat bingkai variabel lokalnya sendiri, yang hilang ketika fungsi mengembalikan nilainya.',
        'Menebak keluaran lebih dulu lalu membandingkannya baris demi baris menunjukkan dengan tepat langkah mana yang keliru dalam pemahamanmu.',
      ],
    },
    vocabulary: {
      en: [
        ['Tracing', 'Following a program step by step and noting how the variables and the output change.'],
        ['Trace table', 'A table with one row per step: the line that ran, the variables that changed or the condition result, and the output.'],
        ['Step', 'One statement, or one test of a header line (if, elif, while, for, match, case, except).'],
        ['Variable', 'A name that refers to a value stored in memory.'],
        ['Frame', 'The variables of one function call; the global frame holds the main program\'s variables.'],
        ['Reference (alias)', 'An arrow from a name to an object; two names that refer to the same object are aliases.'],
        ['Boundary value', 'Test data exactly at the edge of a condition, such as 75 for score >= 75.'],
        ['Traceback', 'Python\'s error report: the line where the program stopped, then the error type and message.'],
      ],
      id: [
        ['Penelusuran (tracing)', 'Mengikuti program langkah demi langkah dan mencatat perubahan variabel dan keluaran.'],
        ['Tabel penelusuran', 'Tabel dengan satu baris per langkah: baris yang dijalankan, variabel yang berubah atau hasil kondisi, dan keluaran.'],
        ['Langkah', 'Satu pernyataan, atau satu pengujian baris kepala (if, elif, while, for, match, case, except).'],
        ['Variabel', 'Nama yang merujuk ke sebuah nilai yang disimpan di memori.'],
        ['Bingkai (frame)', 'Variabel-variabel milik satu pemanggilan fungsi; bingkai global menyimpan variabel program utama.'],
        ['Referensi (alias)', 'Panah dari sebuah nama ke sebuah objek; dua nama yang merujuk objek yang sama disebut alias.'],
        ['Nilai batas', 'Data uji yang tepat berada di tepi kondisi, misalnya 75 untuk nilai >= 75.'],
        ['Traceback', 'Laporan galat Python: baris tempat program berhenti, lalu jenis galat dan pesannya.'],
      ],
    },
    misconceptions: {
      en: [
        ['x = x + 1 is impossible, like an equation that has no solution.', 'In Python = means "store". Python works out the right-hand side with the old x, then puts the result into x. Watch the box change in the memory panel.'],
        ['After square = number * number, changing number also changes square.', 'A variable keeps the value computed at that moment, not the formula. square only changes when a line assigns to it again.'],
        ['b = a makes a copy of the list.', 'It makes a second name for the same list: both arrows end at one object, so a change through either name shows in both. a.copy() makes a real copy.'],
        ['input() returns a number when you type digits.', 'input() always returns a str: "80" + "5" is "805". Convert with int() or float() first, as the presets do.'],
        ['A function can change the caller\'s number by changing its parameter.', 'In change(a), x = x * 2 only changes the box x in the function\'s frame; a stays 5. A list is different only because append changes the one shared object.'],
      ],
      id: [
        ['x = x + 1 mustahil, seperti persamaan yang tidak punya penyelesaian.', 'Dalam Python, = berarti "simpan". Python menghitung ruas kanan dengan x yang lama, lalu menyimpan hasilnya ke x. Amati kotaknya berubah di panel memori.'],
        ['Setelah kuadrat = angka * angka, mengubah angka ikut mengubah kuadrat.', 'Variabel menyimpan nilai yang dihitung saat itu, bukan rumusnya. kuadrat hanya berubah ketika ada baris yang mengisinya lagi.'],
        ['b = a membuat salinan list.', 'Itu membuat nama kedua untuk list yang sama: kedua panah berakhir di satu objek, sehingga perubahan lewat nama mana pun terlihat di keduanya. a.copy() membuat salinan sungguhan.'],
        ['input() menghasilkan bilangan jika yang diketik angka.', 'input() selalu menghasilkan str: "80" + "5" menjadi "805". Ubah dulu dengan int() atau float(), seperti pada program contoh.'],
        ['Fungsi bisa mengubah bilangan milik pemanggil dengan mengubah parameternya.', 'Pada ubah(a), x = x * 2 hanya mengubah kotak x di bingkai fungsi; a tetap 5. List berbeda hanya karena append mengubah satu objek yang dipakai bersama.'],
      ],
    },
    realWorld: {
      en: [
        'The debuggers in Thonny, IDLE and VS Code let programmers step through code and inspect variables in the same way.',
        'Python Tutor, created by Philip Guo, made this picture of frames, objects and arrows popular for teaching programming.',
        'Software testers pick boundary values such as 75, 74.9 and 0 students on purpose, because bugs gather at the edges of conditions.',
        'The "Tebak Output" (guess the output) classroom game can be played on this page: Predict mode checks the guesses line by line. For the "Berburu Bug" game, see the Bug Hunt sim.',
      ],
      id: [
        'Debugger di Thonny, IDLE, dan VS Code memungkinkan pemrogram menjalankan kode langkah demi langkah dan memeriksa variabel dengan cara yang sama.',
        'Python Tutor, buatan Philip Guo, mempopulerkan gambar bingkai, objek, dan panah ini untuk pembelajaran pemrograman.',
        'Penguji perangkat lunak sengaja memilih nilai batas seperti 75, 74,9, dan 0 siswa, karena bug sering muncul di tepi kondisi.',
        'Permainan kelas "Tebak Output" bisa dimainkan di halaman ini: Mode tebak memeriksa tebakan baris demi baris. Untuk permainan "Berburu Bug", lihat simulasi Berburu Bug.',
      ],
    },
    questions: {
      en: [
        { q: 'In program 5 with the input 75, which branch runs? Why is 75 a better test value than 80?', a: 'score >= 75 is True for 75, so the result is PASS. 75 sits exactly on the boundary: if someone had written > instead of >=, 75 would expose the bug, while 80 passes either way.' },
        { q: '"Sum 1 to n" takes 14 steps for n = 5. How many steps for n = 10, and why?', a: '24 steps. There are 2 steps before the loop, n + 1 tests of the for header, n additions and 1 print: 2n + 4.' },
        { q: 'In "Guess the output: functions", what does print(a, b) show, and why does a not change?', a: '5 11. change(x) gets the value 5 in its own frame; x = x * 2 changes only that local x to 10, and return x + 1 sends back 11, which is stored in b.' },
        { q: 'The pocket-money report stops with ZeroDivisionError when there are 0 students. Which line fails, and how could you fix it?', a: 'Line 19, average = total_money / students, divides by 0. Check the count first, for example with if students > 0: before dividing, and print a message otherwise.' },
      ],
      id: [
        { q: 'Pada program 5 dengan masukan 75, cabang mana yang dijalankan? Mengapa 75 lebih baik sebagai data uji daripada 80?', a: 'nilai >= 75 bernilai True untuk 75, jadi predikatnya LULUS. 75 tepat berada di batas: jika seseorang menulis > alih-alih >=, nilai 75 akan memperlihatkan bug itu, sedangkan 80 tetap lulus.' },
        { q: '"Jumlah 1 sampai n" membutuhkan 14 langkah untuk n = 5. Berapa langkah untuk n = 10, dan mengapa?', a: '24 langkah. Ada 2 langkah sebelum perulangan, n + 1 pengujian kepala for, n penjumlahan, dan 1 print: 2n + 4.' },
        { q: 'Pada "Tebak output: fungsi", apa yang ditampilkan print(a, b), dan mengapa a tidak berubah?', a: '5 11. ubah(x) menerima nilai 5 di bingkainya sendiri; x = x * 2 hanya mengubah x lokal menjadi 10, dan return x + 1 mengirim kembali 11 yang disimpan di b.' },
        { q: 'Rekap uang saku berhenti dengan ZeroDivisionError jika jumlah siswa 0. Baris mana yang gagal, dan bagaimana memperbaikinya?', a: 'Baris 19, rata_rata = total_uang_saku / jumlah_siswa, membagi dengan 0. Periksa jumlahnya dulu, misalnya dengan if jumlah_siswa > 0: sebelum membagi, dan tampilkan pesan jika tidak.' },
      ],
    },
  },
};
