// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Distinguish push/pop (stack) from enqueue/dequeue (queue).',
      'See LIFO vs FIFO in real time.',
      'Match each to common applications.',
    ],
    id: [
      'Membedakan push/pop (stack) dari enqueue/dequeue (queue).',
      'Melihat LIFO vs FIFO secara langsung.',
      'Mencocokkan keduanya dengan aplikasi nyata.',
    ],
  },  tryThis: {
    en: [
      'Push 1, 2, 3 to stack — pop them. What order?',
      'Enqueue 1, 2, 3 to queue — dequeue them. What order?',
      'Use a stack to reverse a string.',
    ],
    id: [
      'Push 1, 2, 3 ke stack — pop semuanya. Urutan apa?',
      'Enqueue 1, 2, 3 ke queue — dequeue semuanya. Urutan apa?',
      'Gunakan stack untuk membalik string.',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'A stack works like a pile of plates: you put a new plate on top and you take a plate from the top, so the last plate added is the first one removed. Computer scientists call this LIFO, last in, first out. A queue works like a line at a ticket counter: newcomers join at the back and people leave from the front, so the first to arrive is the first served, FIFO. Both are collections with strict rules about where items may enter and leave. Each offers just two main operations, add and remove, and neither lets you reach into the middle.',
        'In the simulation a counter hands out the numbers 1, 2, 3, … so you can always tell the order in which items arrived. Push places the next number on top of the stack, shown in blue with a "top" marker, and Pop removes that top item. Enqueue places the next number at the back of the queue (pink) and Dequeue removes the item at the front (green). "Push + Enqueue together" gives the same number to both structures at once, which makes the comparison vivid: after adding 1, 2, 3 to both, popping the stack gives 3, 2, 1 while dequeuing the queue gives 1, 2, 3.',
        'The choice between them is about which order a task needs. Stacks suit work that nests or must be undone in reverse: when a function calls another function, the computer pushes a record of where to return and pops it when the inner call finishes; undo history, the browser back button and checking that brackets match all use the same idea. Queues suit fairness and arrival order: print jobs, keystrokes waiting to be processed, tasks waiting for a processor, and messages between programs. In both structures adding and removing take the same small, fixed amount of time no matter how many items are stored, which is why they are so widely used.',
        'The simulation keeps things simple. It stores only numbers, while real stacks and queues hold anything from web pages to print jobs. Popping an empty stack or dequeuing an empty queue does nothing here, but in a real program that is an error called underflow that must be handled. There is no size limit here either; a real call stack has one, and exceeding it, for example through runaway recursion, produces the famous "stack overflow" error. Finally, the simulation removes the front of the queue by shifting every remaining item forward, which is fine for a demonstration, but real queues use a circular buffer or a linked list so the front can be removed instantly even when the queue is long.',
      ],
      id: [
        'Stack bekerja seperti tumpukan piring: piring baru ditaruh di atas dan piring diambil dari atas, sehingga piring yang terakhir ditambahkan adalah yang pertama diambil. Ilmuwan komputer menyebutnya LIFO, last in, first out. Queue (antrean) bekerja seperti antrean di loket tiket: pendatang baru bergabung di belakang dan orang keluar dari depan, sehingga yang pertama datang adalah yang pertama dilayani, FIFO. Keduanya adalah kumpulan data dengan aturan ketat tentang tempat data boleh masuk dan keluar. Masing-masing hanya menawarkan dua operasi utama, tambah dan hapus, dan tidak satu pun membolehkan kamu mengambil dari tengah.',
        'Dalam simulasi, sebuah penghitung membagikan angka 1, 2, 3, … sehingga kamu selalu tahu urutan kedatangan tiap item. Push menaruh angka berikutnya di puncak stack, ditandai biru dengan penanda "top", dan Pop mengambil item puncak itu. Enqueue menaruh angka berikutnya di belakang antrean (merah muda) dan Dequeue mengambil item di depan (hijau). "Push + Enqueue together" memberi angka yang sama ke kedua struktur sekaligus, sehingga perbandingannya jelas: setelah menambahkan 1, 2, 3 ke keduanya, pop pada stack menghasilkan 3, 2, 1 sedangkan dequeue pada antrean menghasilkan 1, 2, 3.',
        'Pemilihannya bergantung pada urutan yang dibutuhkan sebuah tugas. Stack cocok untuk pekerjaan yang bersarang atau harus dibatalkan dengan urutan terbalik: ketika sebuah fungsi memanggil fungsi lain, komputer melakukan push catatan tempat kembali dan pop ketika panggilan dalam selesai; riwayat undo, tombol kembali di peramban, dan pemeriksaan pasangan kurung memakai gagasan yang sama. Antrean cocok untuk keadilan dan urutan kedatangan: pekerjaan cetak, ketikan yang menunggu diproses, tugas yang menunggu prosesor, dan pesan antarprogram. Pada kedua struktur, menambah dan menghapus memakan waktu kecil yang tetap berapa pun banyaknya data, dan itulah sebabnya keduanya sangat luas dipakai.',
        'Simulasi ini menjaga segalanya sederhana. Ia hanya menyimpan angka, sementara stack dan antrean sungguhan menyimpan apa saja, dari halaman web sampai pekerjaan cetak. Melakukan pop pada stack kosong atau dequeue pada antrean kosong tidak berbuat apa-apa di sini, tetapi dalam program nyata itu adalah kesalahan yang disebut underflow dan harus ditangani. Di sini juga tidak ada batas ukuran; call stack sungguhan punya batas, dan melampauinya, misalnya karena rekursi tanpa henti, menghasilkan kesalahan terkenal "stack overflow". Terakhir, simulasi menghapus bagian depan antrean dengan menggeser semua item yang tersisa ke depan, yang tidak masalah untuk peragaan, tetapi antrean sungguhan memakai circular buffer atau linked list agar bagian depan bisa dihapus seketika walau antreannya panjang.',
      ],
    },
    figure: {
      caption: {
        en: 'The items 1, 2, 3 were added to both structures in that order. The stack adds and removes at the top, so they come out 3, 2, 1. The queue adds at the back and removes at the front, so they come out 1, 2, 3.',
        id: 'Item 1, 2, 3 ditambahkan ke kedua struktur dengan urutan itu. Stack menambah dan menghapus di puncak, sehingga keluarnya 3, 2, 1. Antrean menambah di belakang dan menghapus di depan, sehingga keluarnya 1, 2, 3.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        const item = (x, y, n, col) => (col
          ? `<rect x="${x}" y="${y}" width="44" height="26" rx="5" fill="${col}"/><text x="${x + 22}" y="${y + 18}" text-anchor="middle" class="wt">${n}</text>`
          : `<rect x="${x}" y="${y}" width="44" height="26" rx="5" class="m"/><text x="${x + 22}" y="${y + 18}" text-anchor="middle" style="font-weight:700;font-size:13px">${n}</text>`);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Stack (LIFO) and queue (FIFO)', 'Stack (LIFO) dan antrean (FIFO)')}">
  <style>text{font:12px system-ui,sans-serif;fill:currentColor}.wt{fill:#fff;font-weight:700;font-size:13px}.s{font-size:10px;opacity:.75}.m{fill:none;stroke:currentColor;stroke-width:1.5;opacity:.5}.a{stroke:currentColor;stroke-width:1.5;fill:none;opacity:.7}</style>
  <text x="60" y="18" text-anchor="middle" style="font-weight:700">${L('Stack · LIFO', 'Stack · LIFO')}</text>
  <path d="M30 190 L30 60 M98 190 L98 60 M30 190 L98 190" class="m"/>
  ${item(42, 160, 1, null)}
  ${item(42, 130, 2, null)}
  ${item(42, 100, 3, '#3b82f6')}
  <text x="104" y="118" class="s">← ${L('top', 'puncak')}</text>
  <path d="M50 42 L50 92" class="a" marker-end="url(#q)"/>
  <text x="34" y="36" class="s">push</text>
  <path d="M78 92 L78 42" class="a" marker-end="url(#q)"/>
  <text x="70" y="36" class="s">pop</text>
  <text x="60" y="212" text-anchor="middle" class="s">${L('comes out: 3, 2, 1', 'keluar: 3, 2, 1')}</text>
  <text x="256" y="18" text-anchor="middle" style="font-weight:700">${L('Queue · FIFO', 'Antrean · FIFO')}</text>
  <path d="M172 100 L346 100 M172 136 L346 136" class="m"/>
  ${item(182, 105, 1, '#10b981')}
  ${item(238, 105, 2, null)}
  ${item(294, 105, 3, '#8b5cf6')}
  <text x="204" y="92" text-anchor="middle" class="s" style="fill:#10b981">${L('front', 'depan')}</text>
  <text x="316" y="92" text-anchor="middle" class="s" style="fill:#8b5cf6">${L('back', 'belakang')}</text>
  <path d="M358 118 L342 118" class="a" marker-end="url(#q)"/>
  <text x="346" y="158" text-anchor="end" class="s">enqueue</text>
  <path d="M176 118 L158 118" class="a" marker-end="url(#q)"/>
  <text x="172" y="158" class="s">dequeue</text>
  <text x="256" y="212" text-anchor="middle" class="s">${L('comes out: 1, 2, 3', 'keluar: 1, 2, 3')}</text>
  <text x="180" y="232" text-anchor="middle" class="s">${L('same items in, different ends out', 'item masuk sama, ujung keluar berbeda')}</text>
  <defs><marker id="q" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="context-stroke"/></marker></defs>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'A stack adds and removes at the same end, the top: last in, first out.',
        'A queue adds at the back and removes at the front: first in, first out.',
        'The only difference is which end items leave from, yet that changes the order of everything that comes out.',
        'Both add and remove in a fixed, small amount of time, no matter how many items they hold.',
        'Stacks suit nested or "most recent first" tasks such as function calls and undo; queues suit "first come, first served" tasks such as print jobs.',
      ],
      id: [
        'Stack menambah dan menghapus di ujung yang sama, yaitu puncak: terakhir masuk, pertama keluar.',
        'Antrean menambah di belakang dan menghapus di depan: pertama masuk, pertama keluar.',
        'Satu-satunya perbedaan adalah dari ujung mana item keluar, tetapi itu mengubah urutan semua yang keluar.',
        'Keduanya menambah dan menghapus dalam waktu kecil yang tetap, berapa pun banyaknya item yang disimpan.',
        'Stack cocok untuk tugas bersarang atau "yang terbaru lebih dulu" seperti panggilan fungsi dan undo; antrean cocok untuk tugas "yang datang lebih dulu dilayani lebih dulu" seperti pekerjaan cetak.',
      ],
    },
    vocabulary: {
      en: [
        ['Stack', 'A collection where items are added to and removed from one end only, called the top.'],
        ['Queue', 'A collection where items are added at the back and removed from the front.'],
        ['Push / Pop', 'Adding an item to the top of a stack / removing the top item.'],
        ['Enqueue / Dequeue', 'Adding an item to the back of a queue / removing the front item.'],
        ['LIFO', 'Last in, first out: the order in which a stack releases its items.'],
        ['FIFO', 'First in, first out: the order in which a queue releases its items.'],
        ['Peek', 'Looking at the next item to be removed without removing it.'],
        ['Underflow', 'Trying to remove an item from an empty stack or queue, an error in real programs.'],
      ],
      id: [
        ['Stack', 'Kumpulan data yang item-nya ditambah dan dihapus hanya di satu ujung, yang disebut puncak (top).'],
        ['Antrean (queue)', 'Kumpulan data yang item-nya ditambah di belakang dan dihapus dari depan.'],
        ['Push / Pop', 'Menambahkan item ke puncak stack / menghapus item puncak.'],
        ['Enqueue / Dequeue', 'Menambahkan item ke belakang antrean / menghapus item terdepan.'],
        ['LIFO', 'Last in, first out: urutan stack mengeluarkan item-nya.'],
        ['FIFO', 'First in, first out: urutan antrean mengeluarkan item-nya.'],
        ['Peek', 'Melihat item yang akan dihapus berikutnya tanpa menghapusnya.'],
        ['Underflow', 'Mencoba menghapus item dari stack atau antrean yang kosong, sebuah kesalahan dalam program nyata.'],
      ],
    },
    misconceptions: {
      en: [
        ['Pop takes out the first item I added.', 'Pop removes the most recently added item, the one on top. To reach the first item you must pop everything above it first.'],
        ['You can take an item out of the middle if you need it.', 'Only the ends are accessible; that restriction is what makes these structures fast and predictable. Reaching a lower item in a stack means removing the ones above it.'],
        ['A queue keeps its items sorted by value.', 'A queue keeps arrival order, not size order. The number 9 enqueued first leaves before the number 1 enqueued later.'],
        ['A stack is faster than a queue, or the other way round.', 'Both add and remove in constant time. The choice is about the order you need, not about speed.'],
      ],
      id: [
        ['Pop mengeluarkan item pertama yang saya tambahkan.', 'Pop menghapus item yang paling baru ditambahkan, yang berada di puncak. Untuk mencapai item pertama kamu harus melakukan pop pada semua item di atasnya dulu.'],
        ['Kamu bisa mengambil item dari tengah kalau perlu.', 'Hanya ujung-ujungnya yang bisa diakses; pembatasan inilah yang membuat struktur ini cepat dan dapat diprediksi. Mencapai item yang lebih bawah di stack berarti menghapus item-item di atasnya.'],
        ['Antrean menjaga item-nya terurut menurut nilai.', 'Antrean menjaga urutan kedatangan, bukan urutan besar nilai. Angka 9 yang di-enqueue lebih dulu keluar sebelum angka 1 yang di-enqueue kemudian.'],
        ['Stack lebih cepat daripada antrean, atau sebaliknya.', 'Keduanya menambah dan menghapus dalam waktu konstan. Pilihannya soal urutan yang kamu butuhkan, bukan soal kecepatan.'],
      ],
    },
    realWorld: {
      en: [
        'Undo (Ctrl+Z) in editors keeps every change on a stack, so the most recent change is undone first.',
        'Every running program uses a call stack to remember where to return after each function call; infinite recursion fills it and crashes with a "stack overflow".',
        'Printers and online shops process jobs and orders from a queue, so whoever submitted first is served first.',
        'A code editor checks matching brackets with a stack: push each opening bracket, pop when the matching closing one arrives.',
      ],
      id: [
        'Undo (Ctrl+Z) di editor menyimpan setiap perubahan pada stack, sehingga perubahan terbaru dibatalkan lebih dulu.',
        'Setiap program yang berjalan memakai call stack untuk mengingat tempat kembali setelah tiap panggilan fungsi; rekursi tanpa henti memenuhinya dan program berhenti dengan kesalahan "stack overflow".',
        'Printer dan toko daring memproses pekerjaan dan pesanan dari antrean, sehingga yang mengirim lebih dulu dilayani lebih dulu.',
        'Editor kode memeriksa pasangan kurung dengan stack: push setiap kurung buka, pop ketika kurung tutup yang sepadan tiba.',
      ],
    },
    questions: {
      en: [
        { q: 'You push 1, 2, 3 onto a stack, pop once, push 4, then pop until it is empty. In what order do the numbers come out?', a: '3, then 4, 2, 1. The first pop removes 3 (the top). Pushing 4 puts it on top of 2, so the remaining pops give 4, 2, 1.' },
        { q: 'Which structure would you use to reverse the word STRESSED, and how?', a: 'A stack. Push the letters one by one, then pop them all: they come out in reverse, DESSERTS. A queue would return them in the same order they went in.' },
        { q: 'A print server receives jobs A, B, C and more keep arriving. Why does it use a queue, and what could go wrong with a stack?', a: 'A queue prints A first because it arrived first, which is fair and predictable. With a stack the newest job would always print first, so A could wait forever while new jobs keep arriving; this unfairness is called starvation.' },
      ],
      id: [
        { q: 'Kamu melakukan push 1, 2, 3 ke stack, pop sekali, push 4, lalu pop sampai kosong. Dalam urutan apa angka-angkanya keluar?', a: '3, lalu 4, 2, 1. Pop pertama menghapus 3 (puncak). Push 4 menaruhnya di atas 2, sehingga pop-pop berikutnya menghasilkan 4, 2, 1.' },
        { q: 'Struktur mana yang kamu pakai untuk membalik kata KASUR, dan bagaimana caranya?', a: 'Stack. Push huruf-hurufnya satu per satu, lalu pop semuanya: hurufnya keluar terbalik menjadi RUSAK. Antrean akan mengembalikannya dalam urutan yang sama seperti saat masuk.' },
        { q: 'Server cetak menerima pekerjaan A, B, C dan pekerjaan lain terus berdatangan. Mengapa ia memakai antrean, dan apa yang bisa salah jika memakai stack?', a: 'Antrean mencetak A lebih dulu karena A datang lebih dulu; adil dan dapat diprediksi. Dengan stack, pekerjaan terbaru selalu dicetak lebih dulu, sehingga A bisa menunggu selamanya selagi pekerjaan baru terus datang; ketidakadilan ini disebut starvation.' },
      ],
    },
  },
};
