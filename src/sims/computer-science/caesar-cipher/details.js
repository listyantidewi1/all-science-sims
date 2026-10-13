// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Apply a fixed shift cipher to plaintext.',
      'See why a Caesar cipher is trivially breakable (only 25 keys).',
      'Use frequency to guess a shift without knowing it.',
    ],
    id: [
      'Menerapkan sandi geser tetap pada plaintext.',
      'Melihat mengapa sandi Caesar mudah dipecahkan (hanya 25 kunci).',
      'Menggunakan frekuensi huruf untuk menebak pergeseran.',
    ],
  },
  tryThis: {
    en: [
      "Encrypt 'HELLO' with shift 3.",
      'Brute-force "KHOOR" — find the shift.',
      'Look at letter frequencies — which shift gives English-looking text?',
    ],
    id: [
      "Enkripsi 'HALO' dengan pergeseran 3.",
      "Pecahkan 'KDOR' dengan brute-force — temukan pergeserannya.",
      'Amati frekuensi huruf — pergeseran mana yang menghasilkan teks yang mirip bahasa Inggris?',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'A cipher is a way of hiding a message so that only someone who knows the secret can read it. The Caesar cipher is one of the oldest. You pick a number, called the shift, and move every letter that many places along the alphabet. With a shift of 3, A becomes D, B becomes E and H becomes K. When you run past Z you wrap around to the start, so X becomes A and Z becomes C. The hidden message is called the ciphertext, and the original is the plaintext.',
        'In the simulation, the top wheel is the normal alphabet and the bottom wheel is the shifted one. Each letter you type is replaced by the letter directly below it. To decrypt, you shift back the same amount, which is why the slider also allows negative shifts. Letters keep their case, and spaces, numbers and punctuation are left exactly as they are. That is a weakness: an attacker can still see how long each word is.',
        'The biggest weakness is that there are very few secrets to choose from. Shift 0 changes nothing, and shift 26 brings every letter back to where it started, so there are only 25 shifts that really hide anything. The brute-force table at the bottom simply tries every shift; one row will suddenly read as real words. A smarter attacker counts letters: in English the most common letter is E and in Indonesian it is A, so the most common letter in a long ciphertext is probably one of those in disguise. Modern encryption fixes this by using keys with so many possibilities that trying them all would take longer than the age of the universe.',
      ],
      id: [
        'Sandi adalah cara menyembunyikan pesan agar hanya orang yang tahu rahasianya yang bisa membacanya. Sandi Caesar adalah salah satu yang tertua. Kamu memilih sebuah angka, yang disebut pergeseran, lalu memindahkan setiap huruf sejauh itu di sepanjang alfabet. Dengan pergeseran 3, A menjadi D, B menjadi E, dan H menjadi K. Jika kamu melewati Z, kamu memutar kembali ke awal, sehingga X menjadi A dan Z menjadi C. Pesan tersembunyi disebut ciphertext, dan pesan aslinya disebut plaintext.',
        'Dalam simulasi, roda atas adalah alfabet biasa dan roda bawah adalah alfabet yang digeser. Setiap huruf yang kamu ketik diganti dengan huruf tepat di bawahnya. Untuk mendekripsi, kamu menggeser balik sejauh yang sama, itulah sebabnya slider juga membolehkan pergeseran negatif. Huruf tetap dengan besar-kecilnya, dan spasi, angka, serta tanda baca dibiarkan apa adanya. Itu sebuah kelemahan: penyerang masih bisa melihat panjang setiap kata.',
        'Kelemahan terbesarnya adalah rahasia yang bisa dipilih sangat sedikit. Pergeseran 0 tidak mengubah apa pun, dan pergeseran 26 mengembalikan setiap huruf ke tempat semula, sehingga hanya ada 25 pergeseran yang benar-benar menyembunyikan sesuatu. Tabel brute-force di bagian bawah hanya mencoba setiap pergeseran; satu barisnya tiba-tiba terbaca sebagai kata yang sungguhan. Penyerang yang lebih cerdik menghitung huruf: dalam bahasa Inggris huruf yang paling sering muncul adalah E dan dalam bahasa Indonesia adalah A, sehingga huruf yang paling sering muncul dalam ciphertext yang panjang kemungkinan besar adalah salah satunya yang sedang menyamar. Enkripsi modern memperbaiki ini dengan kunci yang kemungkinannya begitu banyak sehingga mencoba semuanya butuh waktu lebih lama daripada umur alam semesta.',
      ],
    },
    figure: {
      caption: {
        en: 'Shift 3: each letter in the top row is replaced by the letter below it. H E L L O becomes K H O O R. At the end of the alphabet the shift wraps around, so X, Y and Z become A, B and C.',
        id: 'Pergeseran 3: setiap huruf di baris atas diganti dengan huruf di bawahnya. H A L O menjadi K D O R. Di ujung alfabet pergeseran memutar kembali, sehingga X, Y, dan Z menjadi A, B, dan C.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        const A = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const word = L('HELLO', 'HALO');
        const hi = new Set(word.split(''));
        let top = '', bot = '';
        for (let i = 0; i < 26; i++) {
          const x = 8 + i * 13.2;
          const c = A[i], s = A[(i + 3) % 26];
          const mark = hi.has(c);
          const wrap = i >= 23;
          top += `<rect x="${x}" y="70" width="12" height="18" rx="2" fill="${mark ? '#3b82f6' : 'none'}" class="b"/><text x="${x + 6}" y="83" text-anchor="middle" fill="${mark ? '#fff' : 'currentColor'}">${c}</text>`;
          bot += `<rect x="${x}" y="118" width="12" height="18" rx="2" fill="${mark ? '#3b82f6' : wrap ? '#f59e0b' : '#8b5cf6'}" fill-opacity="${mark || wrap ? 1 : 0.55}" class="b"/><text x="${x + 6}" y="131" text-anchor="middle" fill="${mark || wrap ? '#fff' : 'currentColor'}">${s}</text>`;
          if (mark || wrap) top += `<path d="M${x + 6} 90 L${x + 6} 114" stroke="${wrap && !mark ? '#f59e0b' : '#3b82f6'}" stroke-width="1.5" fill="none" marker-end="url(#ar)"/>`;
        }
        const enc = word.split('').map((c) => A[(A.indexOf(c) + 3) % 26]).join(' ');
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Caesar cipher with shift 3', 'Sandi Caesar dengan pergeseran 3')}">
  <style>text{font:10px ui-monospace,Menlo,monospace;fill:currentColor}.b{stroke:currentColor;stroke-width:.8;stroke-opacity:.5}.t{font:700 12px system-ui,sans-serif}.s{font:10px system-ui,sans-serif;opacity:.75}</style>
  <text x="8" y="30" class="t">${L('Shift 3', 'Pergeseran 3')}</text>
  <text x="8" y="60" class="s">${L('plain', 'asli')}</text>
  ${top}
  <text x="8" y="154" class="s">${L('cipher', 'sandi')}</text>
  ${bot}
  <text x="8" y="186" class="t">${word.split('').join(' ')}  →  <tspan fill="#3b82f6">${enc}</tspan></text>
  <text x="8" y="210" class="s" fill="#f59e0b">${L('X Y Z wrap around to A B C', 'X Y Z memutar kembali ke A B C')}</text>
  <text x="8" y="228" class="s">${L('To decrypt, shift back by 3.', 'Untuk mendekripsi, geser balik 3.')}</text>
  <defs><marker id="ar" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="context-stroke"/></marker></defs>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'A Caesar cipher moves every letter the same number of places along the alphabet, wrapping from Z back to A.',
        'The shift is the key: whoever knows it can decrypt by shifting back the same amount.',
        'There are only 25 useful shifts, so trying them all takes seconds.',
        'Letters appear with known frequencies in each language, which gives away the shift in long messages.',
        'Spaces and punctuation are not changed, so the word lengths of the message are visible.',
      ],
      id: [
        'Sandi Caesar memindahkan setiap huruf sejauh jumlah tempat yang sama di alfabet, memutar dari Z kembali ke A.',
        'Pergeseran adalah kuncinya: siapa pun yang mengetahuinya bisa mendekripsi dengan menggeser balik sejauh yang sama.',
        'Hanya ada 25 pergeseran yang berguna, sehingga mencoba semuanya hanya butuh beberapa detik.',
        'Huruf muncul dengan frekuensi yang sudah diketahui dalam setiap bahasa, dan itu membocorkan pergeseran pada pesan yang panjang.',
        'Spasi dan tanda baca tidak diubah, sehingga panjang kata dalam pesan tetap terlihat.',
      ],
    },
    vocabulary: {
      en: [
        ['Plaintext', 'The original, readable message.'],
        ['Ciphertext', 'The scrambled message after encryption.'],
        ['Encrypt', 'To turn plaintext into ciphertext using a key.'],
        ['Decrypt', 'To turn ciphertext back into plaintext.'],
        ['Key', 'The secret needed to encrypt and decrypt; for the Caesar cipher it is the shift number.'],
        ['Brute force', 'Breaking a cipher by trying every possible key.'],
        ['Frequency analysis', 'Guessing the key by counting how often each letter appears.'],
      ],
      id: [
        ['Plaintext', 'Pesan asli yang bisa dibaca.'],
        ['Ciphertext', 'Pesan yang sudah diacak setelah enkripsi.'],
        ['Enkripsi', 'Mengubah plaintext menjadi ciphertext dengan sebuah kunci.'],
        ['Dekripsi', 'Mengubah ciphertext kembali menjadi plaintext.'],
        ['Kunci', 'Rahasia yang dibutuhkan untuk mengenkripsi dan mendekripsi; pada sandi Caesar, kuncinya adalah angka pergeseran.'],
        ['Brute force', 'Memecahkan sandi dengan mencoba setiap kunci yang mungkin.'],
        ['Analisis frekuensi', 'Menebak kunci dengan menghitung seberapa sering setiap huruf muncul.'],
      ],
    },
    misconceptions: {
      en: [
        ['A bigger shift makes the message safer.', 'Every shift from 1 to 25 is equally weak. The brute-force table finds shift 24 just as quickly as shift 2.'],
        ['Shift 26 is a new, different key.', 'Shifting 26 places brings every letter back to itself, so it is the same as shift 0. Shift 29 is the same as shift 3, which is why there are only 25 useful keys.'],
        ['The cipher hides the whole message, including its shape.', 'Only letters change. Spaces, numbers and punctuation stay, so an attacker still sees how many words there are and how long each one is.'],
        ['Caesar ciphers are used to protect passwords and bank data today.', 'They are far too weak. Today they appear only in puzzles and games, or as ROT13 to hide spoilers; real security uses keys with enormous numbers of possibilities.'],
      ],
      id: [
        ['Pergeseran yang lebih besar membuat pesan lebih aman.', 'Setiap pergeseran dari 1 sampai 25 sama lemahnya. Tabel brute-force menemukan pergeseran 24 secepat menemukan pergeseran 2.'],
        ['Pergeseran 26 adalah kunci baru yang berbeda.', 'Menggeser 26 tempat mengembalikan setiap huruf ke dirinya sendiri, jadi sama dengan pergeseran 0. Pergeseran 29 sama dengan pergeseran 3, itulah sebabnya hanya ada 25 kunci yang berguna.'],
        ['Sandi menyembunyikan seluruh pesan, termasuk bentuknya.', 'Hanya huruf yang berubah. Spasi, angka, dan tanda baca tetap, sehingga penyerang masih melihat berapa banyak kata dan berapa panjang masing-masing.'],
        ['Sandi Caesar masih dipakai untuk melindungi kata sandi dan data bank saat ini.', 'Sandi ini terlalu lemah. Sekarang ia hanya muncul dalam teka-teki dan permainan, atau sebagai ROT13 untuk menyembunyikan bocoran cerita; keamanan sungguhan memakai kunci dengan kemungkinan yang sangat banyak.'],
      ],
    },
    realWorld: {
      en: [
        'Julius Caesar is reported to have protected military messages by shifting letters three places, which is how the cipher got its name.',
        'ROT13, a shift of 13, is still used on the internet to hide spoilers and puzzle answers, because applying it twice gives the original text back.',
        'Secret decoder rings and escape-room puzzles are Caesar ciphers, and cracking them by brute force is a first lesson in cryptography.',
        'Messaging apps and websites use modern encryption with keys that have more possibilities than there are atoms in the Earth, so brute force is hopeless.',
      ],
      id: [
        'Julius Caesar dilaporkan melindungi pesan militer dengan menggeser huruf tiga tempat, dan dari situlah nama sandi ini berasal.',
        'ROT13, pergeseran 13, masih dipakai di internet untuk menyembunyikan bocoran cerita dan jawaban teka-teki, karena menerapkannya dua kali mengembalikan teks aslinya.',
        'Cincin pemecah kode dan teka-teki escape room adalah sandi Caesar, dan memecahkannya dengan brute force menjadi pelajaran pertama kriptografi.',
        'Aplikasi pesan dan situs web memakai enkripsi modern dengan kunci yang kemungkinannya lebih banyak daripada jumlah atom di Bumi, sehingga brute force menjadi sia-sia.',
      ],
    },
    questions: {
      en: [
        { q: 'Encrypt the word CAT with a shift of 5. Show how you got each letter.', a: 'HFY. C moves 5 places to H, A moves 5 places to F, and T moves 5 places to Y (U, V, W, X, Y).' },
        { q: 'The ciphertext GRJ was made with shift 3. What is the plaintext?', a: 'DOG. Shift each letter back 3 places: G to D, R to O, J to G.' },
        { q: 'Why can a Caesar cipher always be broken by trying every shift, even if you know nothing about the message?', a: 'There are only 25 shifts that change the text. Trying them all gives 25 candidate messages, and only one of them reads as real words, so the attacker simply picks that row, exactly as the brute-force table does.' },
      ],
      id: [
        { q: 'Enkripsi kata IBU dengan pergeseran 5. Tunjukkan cara mendapatkan setiap huruf.', a: 'NGZ. I bergeser 5 tempat ke N, B bergeser 5 tempat ke G, dan U bergeser 5 tempat ke Z (V, W, X, Y, Z).' },
        { q: 'Ciphertext DBDP dibuat dengan pergeseran 3. Apa plaintext-nya?', a: 'AYAM. Geser setiap huruf mundur 3 tempat: D ke A, B ke Y (memutar lewat A dan Z), D ke A, P ke M.' },
        { q: 'Mengapa sandi Caesar selalu bisa dipecahkan dengan mencoba setiap pergeseran, meskipun kamu tidak tahu apa-apa tentang pesannya?', a: 'Hanya ada 25 pergeseran yang mengubah teks. Mencoba semuanya memberi 25 calon pesan, dan hanya satu yang terbaca sebagai kata sungguhan, sehingga penyerang cukup memilih baris itu, persis seperti yang dilakukan tabel brute-force.' },
      ],
    },
  },
};
