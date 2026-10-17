// Long-form text for the Von Neumann CPU sim page.
export default {
  objectives: {
    en: [
      'Name the parts of a Von Neumann computer (input, memory, CPU with control unit, ALU and registers, output) and describe what each does during one instruction.',
      'Explain the fetch–decode–execute cycle and trace the values of the program counter, instruction register and accumulator through a short machine-code program.',
      'Read an 8-bit machine word as opcode + operand, and explain why the same memory holds both instructions and data.',
    ],
    id: [
      'Menyebutkan bagian-bagian komputer Von Neumann (masukan, memori, CPU dengan unit kendali, ALU dan register, keluaran) dan menjelaskan tugas masing-masing selama satu instruksi.',
      'Menjelaskan siklus ambil–terjemahkan–jalankan dan menelusuri nilai pencacah program, register instruksi dan akumulator pada sebuah program kode mesin pendek.',
      'Membaca kata mesin 8-bit sebagai opcode + operan, dan menjelaskan mengapa memori yang sama menyimpan instruksi sekaligus data.',
    ],
  },
  tryThis: {
    en: [
      'Load "Add two numbers" with inputs 5 and 7. Press Step nine times and say, before each press, which phase comes next and which register will change.',
      'Load "Count down" with N = 3 and run it. Count the cycles. Then set N = 6: is the cycle count doubled?',
      'Load "Multiply" with a = 6, b = 4. Watch memory word 13 grow by 6 each loop. Then try a = 100, b = 3 and explain the output.',
      'Look at memory word 14 in the Multiply program. It holds the number 1 but reads as "HALT 1" in the mnemonic column. Why can the computer not tell the difference?',
    ],
    id: [
      'Muat "Jumlahkan dua bilangan" dengan masukan 5 dan 7. Tekan Langkah sembilan kali dan ucapkan, sebelum setiap tekanan, fase mana yang berikutnya dan register mana yang akan berubah.',
      'Muat "Hitung mundur" dengan N = 3 dan jalankan. Hitung siklusnya. Lalu atur N = 6: apakah jumlah siklusnya menjadi dua kali lipat?',
      'Muat "Perkalian" dengan a = 6, b = 4. Perhatikan kata memori 13 bertambah 6 setiap putaran. Lalu coba a = 100, b = 3 dan jelaskan keluarannya.',
      'Lihat kata memori 14 pada program Perkalian. Isinya angka 1 tetapi terbaca "HALT 1" di kolom mnemonik. Mengapa komputer tidak bisa membedakannya?',
    ],
  },

  learn: {
    background: {
      en: [
        'Almost every computer, from a washing-machine controller to a phone, follows the model John von Neumann described in 1945. Input devices bring data in, output devices send results out, and in between sit a memory and a central processing unit (CPU). The key idea is the stored program: instructions and data live together in the same memory, as numbers. The CPU contains a control unit, which decides what happens next, an arithmetic logic unit (ALU), which does the calculating, and a few very fast storage cells called registers. This sim has three registers: the program counter (PC) holds the address of the next instruction, the instruction register (IR) holds the instruction being carried out, and the accumulator (ACC) holds the number the ALU is working on.',
        'The CPU runs the same three-phase cycle forever. Fetch: the address in the PC is sent along the address bus to memory, the word stored there comes back along the data bus into the IR, and the PC is increased by one so it already points at the next instruction. Decode: the control unit splits the IR into an opcode (which operation) and an operand (which memory address). Execute: the operation happens, for example LOAD copies a memory word into the ACC, ADD adds a memory word to the ACC, STORE writes the ACC back to memory, JUMP overwrites the PC, and JZ (jump if zero) overwrites the PC only when the ACC is 0. One pass through fetch–decode–execute is one cycle; a real CPU at 3 GHz runs about three billion such cycles every second.',
        'In this toy machine every memory word is 8 bits: the top 4 bits are the opcode and the bottom 4 bits the operand, so there are 16 possible operations and 16 addresses (0–15). LOAD is opcode 1, so "LOAD 10" is stored as 0001 1010 = 26. A data word such as the number 1 is 0000 0001, which the mnemonic column reads as "HALT 1": memory does not know which words are instructions and which are data. Only the PC decides, by pointing at a word during fetch. Programs that run off the end of their code into data do strange things, which is exactly how many real software bugs and security exploits work.',
        'Loops are built from a counter in memory, a SUB to decrease it, and a JZ to leave when it reaches zero. The Multiply program has no multiply instruction at all: it adds a to a running total b times, which is why it needs 8 cycles per repetition and finishes in 8b + 5 cycles. Because the ACC is only 8 bits, results above 255 wrap around (256 becomes 0), a reminder that every real computer has a fixed word size and overflow is a real danger.',
      ],
      id: [
        'Hampir setiap komputer, dari pengendali mesin cuci sampai ponsel, mengikuti model yang dijelaskan John von Neumann pada 1945. Perangkat masukan membawa data masuk, perangkat keluaran mengirim hasil keluar, dan di antaranya ada memori dan unit pemroses pusat (CPU). Gagasan kuncinya adalah program tersimpan: instruksi dan data tinggal bersama di memori yang sama, sebagai angka. CPU berisi unit kendali, yang memutuskan apa yang terjadi berikutnya, unit aritmetika-logika (ALU), yang melakukan perhitungan, dan beberapa sel penyimpanan sangat cepat yang disebut register. Simulasi ini memiliki tiga register: pencacah program (PC) menyimpan alamat instruksi berikutnya, register instruksi (IR) menyimpan instruksi yang sedang dijalankan, dan akumulator (ACC) menyimpan bilangan yang sedang diolah ALU.',
        'CPU menjalankan siklus tiga fase yang sama terus-menerus. Ambil (fetch): alamat di PC dikirim lewat bus alamat ke memori, kata yang tersimpan di sana kembali lewat bus data ke IR, dan PC ditambah satu sehingga sudah menunjuk instruksi berikutnya. Terjemahkan (decode): unit kendali memecah IR menjadi opcode (operasi apa) dan operan (alamat memori mana). Jalankan (execute): operasinya terjadi, misalnya LOAD menyalin kata memori ke ACC, ADD menambahkan kata memori ke ACC, STORE menulis ACC kembali ke memori, JUMP menimpa PC, dan JZ (lompat jika nol) menimpa PC hanya jika ACC bernilai 0. Satu putaran ambil–terjemahkan–jalankan adalah satu siklus; CPU sungguhan pada 3 GHz menjalankan sekitar tiga miliar siklus seperti itu setiap detik.',
        'Pada mesin mainan ini setiap kata memori adalah 8 bit: 4 bit atas adalah opcode dan 4 bit bawah adalah operan, sehingga ada 16 kemungkinan operasi dan 16 alamat (0–15). LOAD adalah opcode 1, jadi "LOAD 10" disimpan sebagai 0001 1010 = 26. Kata data seperti angka 1 adalah 0000 0001, yang oleh kolom mnemonik dibaca sebagai "HALT 1": memori tidak tahu kata mana yang instruksi dan mana yang data. Hanya PC yang menentukan, dengan menunjuk sebuah kata saat fase ambil. Program yang berjalan melewati akhir kodenya masuk ke data akan berperilaku aneh, dan persis begitulah cara kerja banyak bug dan eksploitasi keamanan perangkat lunak sungguhan.',
        'Perulangan dibangun dari pencacah di memori, SUB untuk menguranginya, dan JZ untuk keluar saat mencapai nol. Program Perkalian sama sekali tidak punya instruksi kali: ia menambahkan a ke jumlah berjalan sebanyak b kali, itulah sebabnya ia butuh 8 siklus per pengulangan dan selesai dalam 8b + 5 siklus. Karena ACC hanya 8 bit, hasil di atas 255 berputar kembali (256 menjadi 0), pengingat bahwa setiap komputer sungguhan punya ukuran kata tetap dan overflow adalah bahaya nyata.',
      ],
    },
    figure: {
      caption: {
        en: 'The Von Neumann model: input and output devices, a memory holding both program and data, and a CPU with control unit, ALU and registers, joined by the address bus (which word?) and the data bus (what value?). The CPU repeats fetch → decode → execute.',
        id: 'Model Von Neumann: perangkat masukan dan keluaran, memori yang menyimpan program sekaligus data, dan CPU dengan unit kendali, ALU dan register, dihubungkan bus alamat (kata yang mana?) dan bus data (nilai apa?). CPU mengulang ambil → terjemahkan → jalankan.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Von Neumann architecture block diagram', 'Diagram blok arsitektur Von Neumann')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.s{fill:none;stroke:currentColor;stroke-width:1.4}.k{font:9.5px system-ui,sans-serif;fill:currentColor;opacity:.75}.m{font:9px ui-monospace,monospace;fill:currentColor}.c{text-anchor:middle}</style>
  <defs><marker id="va" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="currentColor"/></marker></defs>
  <rect x="10" y="90" width="52" height="34" rx="4" class="s"/><text x="36" y="104" class="c">${L('Input', 'Masukan')}</text><text x="36" y="117" class="c k">${L('keyboard', 'papan ketik')}</text>
  <rect x="298" y="90" width="52" height="34" rx="4" class="s"/><text x="324" y="104" class="c">${L('Output', 'Keluaran')}</text><text x="324" y="117" class="c k">${L('screen', 'layar')}</text>
  <rect x="80" y="30" width="130" height="150" rx="6" class="s"/><text x="145" y="46" class="c">CPU</text>
  <rect x="90" y="56" width="110" height="34" rx="3" class="s" stroke-dasharray="3 2"/><text x="145" y="70" class="c k">${L('Control unit', 'Unit kendali')}</text><text x="145" y="83" class="c m">PC  IR</text>
  <rect x="90" y="98" width="52" height="34" rx="3" class="s" stroke-dasharray="3 2"/><text x="116" y="112" class="c k">ALU</text><text x="116" y="125" class="c m">+ −</text>
  <rect x="148" y="98" width="52" height="34" rx="3" class="s" stroke-dasharray="3 2"/><text x="174" y="112" class="c k">${L('Register', 'Register')}</text><text x="174" y="125" class="c m">ACC</text>
  <path d="M100 150 L120 150" class="s" marker-end="url(#va)"/><text x="130" y="153" class="k">${L('fetch', 'ambil')}</text>
  <path d="M100 164 L120 164" class="s" marker-end="url(#va)"/><text x="130" y="167" class="k">${L('decode → execute → repeat', 'terjemahkan → jalankan → ulangi')}</text>
  <rect x="236" y="30" width="54" height="150" rx="6" class="s"/><text x="263" y="46" class="c">${L('Memory', 'Memori')}</text>
  <text x="263" y="62" class="c m">0: IN</text><text x="263" y="74" class="c m">1: STORE 10</text><text x="263" y="86" class="c m">2: IN</text><text x="263" y="98" class="c m">3: ADD 10</text><text x="263" y="110" class="c m">4: OUT</text><text x="263" y="122" class="c m">5: HALT</text>
  <text x="263" y="140" class="c m">…</text><text x="263" y="156" class="c m">10: 5</text><text x="263" y="170" class="c k">${L('program + data', 'program + data')}</text>
  <path d="M210 70 L236 70" class="s" stroke="#f59e0b" marker-end="url(#va)"/><text x="223" y="64" class="c k" fill="#f59e0b">${L('address', 'alamat')}</text>
  <path d="M236 120 L210 120" class="s" stroke="#22d3ee" marker-end="url(#va)"/><path d="M210 128 L236 128" class="s" stroke="#22d3ee" marker-end="url(#va)"/><text x="223" y="142" class="c k" fill="#22d3ee">${L('data', 'data')}</text>
  <path d="M62 107 L80 107" class="s" marker-end="url(#va)"/>
  <path d="M210 107 L298 107" class="s" marker-end="url(#va)" stroke-dasharray="2 3"/>
  <text x="180" y="212" class="c k">${L('stored program: instructions and data are both just numbers in memory', 'program tersimpan: instruksi dan data sama-sama hanya angka di memori')}</text>
  <text x="180" y="228" class="c m">LOAD 10 = 0001 1010 = 26</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Input → Process → Output: data comes in, the CPU transforms it using memory, results go out.',
        'The stored-program idea: instructions and data are numbers in the same memory; only the program counter decides which word is executed.',
        'Fetch (PC → address bus → memory → data bus → IR, PC + 1), Decode (split opcode and operand), Execute (do the operation). Repeat.',
        'The accumulator is the CPU\'s working register: LOAD fills it, ADD/SUB change it, STORE saves it, OUT shows it.',
        'Jumps (JUMP, JZ) change the PC and are how loops and decisions exist in machine code.',
        'A fixed word size (8 bits here) means a fixed range (0–255) and overflow when a result does not fit.',
      ],
      id: [
        'Masukan → Proses → Keluaran: data masuk, CPU mengubahnya dengan bantuan memori, hasilnya keluar.',
        'Gagasan program tersimpan: instruksi dan data adalah angka di memori yang sama; hanya pencacah program yang menentukan kata mana yang dijalankan.',
        'Ambil (PC → bus alamat → memori → bus data → IR, PC + 1), Terjemahkan (pisahkan opcode dan operan), Jalankan (lakukan operasinya). Ulangi.',
        'Akumulator adalah register kerja CPU: LOAD mengisinya, ADD/SUB mengubahnya, STORE menyimpannya, OUT menampilkannya.',
        'Lompatan (JUMP, JZ) mengubah PC dan merupakan cara perulangan dan percabangan ada dalam kode mesin.',
        'Ukuran kata tetap (8 bit di sini) berarti rentang tetap (0–255) dan overflow saat hasil tidak muat.',
      ],
    },
    vocabulary: {
      en: [
        ['CPU (central processing unit)', 'The part of the computer that fetches, decodes and executes instructions; it contains the control unit, the ALU and registers.'],
        ['Program counter (PC)', 'Register holding the memory address of the next instruction to fetch.'],
        ['Instruction register (IR)', 'Register holding the instruction currently being decoded and executed.'],
        ['Accumulator (ACC)', 'The register where arithmetic results are kept; most instructions read or write it.'],
        ['Opcode / operand', 'The two parts of a machine instruction: which operation to do, and which address it uses.'],
        ['Bus', 'A set of wires shared by components: the address bus carries which memory word, the data bus carries the value.'],
        ['Stored program', 'The principle that a program is stored in memory as numbers, just like data, and can be changed without rewiring.'],
      ],
      id: [
        ['CPU (unit pemroses pusat)', 'Bagian komputer yang mengambil, menerjemahkan dan menjalankan instruksi; berisi unit kendali, ALU dan register.'],
        ['Pencacah program (PC)', 'Register yang menyimpan alamat memori instruksi berikutnya yang akan diambil.'],
        ['Register instruksi (IR)', 'Register yang menyimpan instruksi yang sedang diterjemahkan dan dijalankan.'],
        ['Akumulator (ACC)', 'Register tempat hasil aritmetika disimpan; hampir semua instruksi membaca atau menulisnya.'],
        ['Opcode / operan', 'Dua bagian instruksi mesin: operasi apa yang dilakukan, dan alamat mana yang dipakai.'],
        ['Bus', 'Sekumpulan kawat yang dipakai bersama komponen: bus alamat membawa kata memori yang mana, bus data membawa nilainya.'],
        ['Program tersimpan', 'Prinsip bahwa program disimpan di memori sebagai angka, seperti data, dan dapat diubah tanpa mengubah kabel.'],
      ],
    },
    misconceptions: {
      en: [
        ['The CPU reads the whole program at once and "understands" it.', 'It only ever sees one instruction at a time, the word the PC points at, and does exactly that one thing before fetching the next.'],
        ['Memory knows which words are instructions and which are data.', 'It does not. Word 14 in the Multiply program is the number 1, but if the PC ever pointed at it the CPU would happily execute it as "HALT 1".'],
        ['The PC always goes 0, 1, 2, 3 ...', 'It increases by one during every fetch, but JUMP and JZ overwrite it, which is how the Count down program returns to address 2 again and again.'],
        ['A computer has a special instruction for everything, like multiply.', 'Simple CPUs have very few instructions; multiplication is built from repeated addition and a counter. Even modern CPUs build complex operations from simple steps.'],
      ],
      id: [
        ['CPU membaca seluruh program sekaligus dan "memahaminya".', 'CPU hanya melihat satu instruksi pada satu waktu, kata yang ditunjuk PC, dan melakukan tepat satu hal itu sebelum mengambil yang berikutnya.'],
        ['Memori tahu kata mana yang instruksi dan mana yang data.', 'Tidak. Kata 14 pada program Perkalian adalah angka 1, tetapi jika PC pernah menunjuknya CPU akan menjalankannya begitu saja sebagai "HALT 1".'],
        ['PC selalu berjalan 0, 1, 2, 3 ...', 'PC bertambah satu pada setiap fase ambil, tetapi JUMP dan JZ menimpanya, dan itulah cara program Hitung mundur kembali ke alamat 2 berulang kali.'],
        ['Komputer punya instruksi khusus untuk segala hal, seperti perkalian.', 'CPU sederhana punya sangat sedikit instruksi; perkalian dibangun dari penjumlahan berulang dan pencacah. Bahkan CPU modern membangun operasi rumit dari langkah-langkah sederhana.'],
      ],
    },
    realWorld: {
      en: [
        'A phone CPU runs the same fetch–decode–execute cycle as this toy, but with 64-bit words, billions of cycles per second and several cores working at once.',
        'Assembly language mnemonics such as LOAD, ADD and JZ are how programmers wrote software before compilers; compilers still translate Python or Java down to instructions like these.',
        'Buffer-overflow attacks work because instructions and data share memory: an attacker writes data that the PC is later tricked into executing.',
        'The Little Man Computer, used in many schools, is a 100-word version of this machine with the same accumulator design.',
        'Early computers like ENIAC had to be rewired to change programs; the stored-program EDSAC (1949) could simply load a new program into memory.',
      ],
      id: [
        'CPU ponsel menjalankan siklus ambil–terjemahkan–jalankan yang sama dengan mainan ini, tetapi dengan kata 64-bit, miliaran siklus per detik dan beberapa inti bekerja sekaligus.',
        'Mnemonik bahasa rakitan seperti LOAD, ADD dan JZ adalah cara pemrogram menulis perangkat lunak sebelum ada kompilator; kompilator masih menerjemahkan Python atau Java menjadi instruksi seperti ini.',
        'Serangan buffer overflow bekerja karena instruksi dan data berbagi memori: penyerang menulis data yang belakangan dijalankan karena PC ditipu.',
        'Little Man Computer, yang dipakai di banyak sekolah, adalah versi 100 kata dari mesin ini dengan rancangan akumulator yang sama.',
        'Komputer awal seperti ENIAC harus disambung ulang kabelnya untuk mengganti program; EDSAC (1949) dengan program tersimpan cukup memuat program baru ke memori.',
      ],
    },
    questions: {
      en: [
        { q: 'The memory word at address 3 is 0010 1010. Decode it: what instruction is it and what does it do?', a: 'Opcode 0010 = 2 = ADD, operand 1010 = 10. "ADD 10": add the contents of memory word 10 to the accumulator.' },
        { q: 'In "Add two numbers", how many cycles does the program take, and what is in the PC when the computer halts?', a: 'Six instructions, so six cycles (18 phases). HALT is at address 5; after fetching it the PC is 6, and it stays 6 because the machine stops.' },
        { q: 'The Multiply program takes 8b + 5 cycles for inputs a and b. Check this for b = 4, and explain where the "8" and the "5" come from.', a: '8 × 4 + 5 = 37 cycles. Each repetition of the loop runs 8 instructions (LOAD, JZ, SUB, STORE, LOAD, ADD, STORE, JUMP). The final pass only does LOAD and JZ (2) before jumping out, then LOAD, OUT, HALT (3): 2 + 3 = 5.' },
        { q: 'Why does Multiply with a = 100 and b = 3 output 44 instead of 300?', a: 'The accumulator holds 8 bits, so the largest value is 255. 300 − 256 = 44; the result overflowed and wrapped around.' },
      ],
      id: [
        { q: 'Kata memori di alamat 3 adalah 0010 1010. Terjemahkan: instruksi apa itu dan apa yang dilakukannya?', a: 'Opcode 0010 = 2 = ADD, operan 1010 = 10. "ADD 10": tambahkan isi kata memori 10 ke akumulator.' },
        { q: 'Pada "Jumlahkan dua bilangan", berapa siklus yang dibutuhkan program, dan apa isi PC saat komputer berhenti?', a: 'Enam instruksi, jadi enam siklus (18 fase). HALT ada di alamat 5; setelah diambil PC menjadi 6, dan tetap 6 karena mesin berhenti.' },
        { q: 'Program Perkalian butuh 8b + 5 siklus untuk masukan a dan b. Periksa untuk b = 4, dan jelaskan dari mana "8" dan "5" berasal.', a: '8 × 4 + 5 = 37 siklus. Setiap pengulangan menjalankan 8 instruksi (LOAD, JZ, SUB, STORE, LOAD, ADD, STORE, JUMP). Putaran terakhir hanya LOAD dan JZ (2) sebelum keluar, lalu LOAD, OUT, HALT (3): 2 + 3 = 5.' },
        { q: 'Mengapa Perkalian dengan a = 100 dan b = 3 mengeluarkan 44, bukan 300?', a: 'Akumulator hanya 8 bit, jadi nilai terbesarnya 255. 300 − 256 = 44; hasilnya overflow dan berputar kembali.' },
      ],
    },
  },
};
