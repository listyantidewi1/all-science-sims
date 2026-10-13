// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Apply RSA: c = m^e mod n; m = c^d mod n.',
      'See why factoring n is the hard problem.',
      "Connect public key (e, n) and private key (d, n).",
    ],
    id: [
      'Menerapkan RSA: c = m^e mod n; m = c^d mod n.',
      'Melihat mengapa memfaktorkan n adalah masalah yang sulit.',
      'Mengaitkan kunci publik (e, n) dan kunci privat (d, n).',
    ],
  },  tryThis: {
    en: [
      'p=11, q=13 — encrypt m=42, then decrypt.',
      'Try to factor n by hand — for small p,q it\'s easy.',
      'Pick a different e — does d still exist?',
    ],
    id: [
      'p=11, q=13 — enkripsi m=42, lalu dekripsi.',
      'Coba faktorkan n secara manual — untuk p,q kecil, mudah.',
      'Pilih e berbeda — apakah d tetap ada?',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'For most of history, two people could only exchange secret messages if they had already agreed on a secret key, which had to be delivered in person or by courier. Public-key cryptography removes that requirement. Think of a padlock: anyone can snap it shut on a box, but only the owner of the key can open it. In RSA (published by Rivest, Shamir and Adleman in 1977) the padlock is the public key (e, n), which can be posted anywhere, and the key is the private key (d, n). Encryption raises the message m to the power e modulo n, giving c = m^e mod n; decryption raises c to the power d modulo n and recovers m. It works because d is chosen so that e·d leaves remainder 1 when divided by φ(n), and a theorem of Euler then guarantees that m^(e·d) mod n = m for every message m smaller than n.',
        'The simulation walks through key generation exactly as a textbook does. Choose two distinct primes p and q and multiply them: n = p·q. Compute φ(n) = (p − 1)(q − 1), the count of numbers below n that share no factor with n. Pick a public exponent e that is coprime with φ(n), and find its inverse d = e⁻¹ mod φ(n) with the extended Euclidean algorithm. With the defaults p = 11, q = 13 you get n = 143, φ(n) = 120, e = 7 and d = 103, because 7 × 103 = 721 = 6 × 120 + 1. Encrypting m = 42 gives 42^7 mod 143 = 81, and 81^103 mod 143 = 42 comes back out. The simulation computes these huge powers by square-and-multiply, reducing modulo n at every step so the numbers never grow large; real implementations do the same with 600-digit numbers.',
        'The security rests on an asymmetry. Everything an eavesdropper sees is e, n and c. To compute d they need φ(n), and to compute φ(n) they need p and q: they must factor n. Multiplying 11 by 13 is instant and factoring 143 is easy, but for an n with about 617 digits (2048 bits) no known classical method finishes in any useful time, while the legitimate owner, who kept p and q, finds d immediately. This is called a trapdoor one-way function. Two controls need care: if you drag the e slider to a value that shares a factor with φ(n), such as e = 9 with φ = 120, no inverse exists, so the simulation quietly replaces e with the smallest valid odd exponent and shows the replacement in the readout. And the message must be smaller than n: the simulation reduces m modulo n first, so with small primes a large m is silently changed, and what comes back is m mod n, not your original number.',
        'This is deliberately a toy. Real RSA uses primes of hundreds of digits, and it never encrypts a raw number: the message is padded with random bytes (a scheme called OAEP) because "textbook" RSA, as here, is insecure in several ways, for example the same message always produces the same ciphertext, and a small message with a small e can be undone by taking an ordinary root. Because RSA is slow, it is used to protect a short symmetric key or to sign a hash, while the bulk data is encrypted with a fast cipher such as AES. Note also that the simulation lets you pick p = q; RSA requires distinct primes, and with p = q the formula φ(n) = (p − 1)(q − 1) is wrong (the correct value is p(p − 1)), so decryption fails. Signatures, which swap the roles of d and e, are not shown.',
      ],
      id: [
        'Selama sebagian besar sejarah, dua orang hanya bisa bertukar pesan rahasia jika sudah menyepakati kunci rahasia lebih dulu, yang harus diantar langsung atau lewat kurir. Kriptografi kunci publik menghapus syarat itu. Bayangkan gembok: siapa pun bisa mengunci gembok pada sebuah kotak, tetapi hanya pemilik anak kuncinya yang bisa membukanya. Pada RSA (dipublikasikan oleh Rivest, Shamir, dan Adleman pada 1977) gemboknya adalah kunci publik (e, n), yang boleh dipasang di mana saja, dan anak kuncinya adalah kunci privat (d, n). Enkripsi memangkatkan pesan m dengan e modulo n, menghasilkan c = m^e mod n; dekripsi memangkatkan c dengan d modulo n dan memulihkan m. Ini berhasil karena d dipilih agar e·d bersisa 1 ketika dibagi φ(n), dan sebuah teorema Euler kemudian menjamin m^(e·d) mod n = m untuk setiap pesan m yang lebih kecil dari n.',
        'Simulasi menelusuri pembangkitan kunci persis seperti buku teks. Pilih dua bilangan prima berbeda p dan q lalu kalikan: n = p·q. Hitung φ(n) = (p − 1)(q − 1), banyaknya bilangan di bawah n yang tidak berbagi faktor dengan n. Pilih eksponen publik e yang koprima dengan φ(n), dan cari inversnya d = e⁻¹ mod φ(n) dengan algoritma Euclid yang diperluas. Dengan nilai bawaan p = 11, q = 13 diperoleh n = 143, φ(n) = 120, e = 7, dan d = 103, karena 7 × 103 = 721 = 6 × 120 + 1. Mengenkripsi m = 42 menghasilkan 42^7 mod 143 = 81, dan 81^103 mod 143 = 42 muncul kembali. Simulasi menghitung pangkat raksasa ini dengan square-and-multiply, mengambil sisa modulo n di setiap langkah agar bilangannya tidak pernah membesar; implementasi sungguhan melakukan hal yang sama dengan bilangan 600 digit.',
        'Keamanannya bertumpu pada ketidaksimetrisan. Semua yang dilihat penyadap hanyalah e, n, dan c. Untuk menghitung d ia butuh φ(n), dan untuk menghitung φ(n) ia butuh p dan q: ia harus memfaktorkan n. Mengalikan 11 dengan 13 itu seketika dan memfaktorkan 143 itu mudah, tetapi untuk n sekitar 617 digit (2048 bit) tidak ada metode klasik yang diketahui dapat selesai dalam waktu yang berguna, sementara pemilik sah, yang menyimpan p dan q, menemukan d seketika. Ini disebut fungsi satu-arah dengan pintu rahasia (trapdoor). Dua kontrol perlu diperhatikan: jika kamu menggeser slider e ke nilai yang berbagi faktor dengan φ(n), misalnya e = 9 dengan φ = 120, inversnya tidak ada, sehingga simulasi diam-diam mengganti e dengan eksponen ganjil valid terkecil dan menampilkan penggantinya di panel bacaan. Dan pesan harus lebih kecil dari n: simulasi mengambil sisa m modulo n lebih dulu, sehingga dengan prima kecil, m yang besar diam-diam berubah, dan yang kembali adalah m mod n, bukan bilangan asalmu.',
        'Ini sengaja dibuat sebagai mainan. RSA sungguhan memakai prima ratusan digit, dan tidak pernah mengenkripsi bilangan mentah: pesan ditambah byte acak (skema bernama OAEP) karena RSA "buku teks", seperti di sini, tidak aman dalam beberapa hal, misalnya pesan yang sama selalu menghasilkan teks sandi yang sama, dan pesan kecil dengan e kecil bisa dibalik dengan mengambil akar biasa. Karena RSA lambat, ia dipakai untuk melindungi kunci simetris yang pendek atau menandatangani hash, sedangkan data utamanya dienkripsi dengan sandi cepat seperti AES. Perhatikan juga bahwa simulasi membolehkan p = q; RSA mensyaratkan prima yang berbeda, dan dengan p = q rumus φ(n) = (p − 1)(q − 1) menjadi salah (nilai benarnya p(p − 1)), sehingga dekripsi gagal. Tanda tangan digital, yang menukar peran d dan e, tidak ditampilkan.',
      ],
    },
    figure: {
      caption: {
        en: 'The worked example from the simulation. The public key (7, 143) locks the message; only the private exponent 103, derived from the secret factors 11 and 13, unlocks it. An eavesdropper sees 7, 143 and 81 and would have to factor 143 to find 103.',
        id: 'Contoh dari simulasi. Kunci publik (7, 143) mengunci pesan; hanya eksponen privat 103, yang diturunkan dari faktor rahasia 11 dan 13, yang membukanya. Penyadap melihat 7, 143, dan 81 dan harus memfaktorkan 143 untuk menemukan 103.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('RSA key generation, encryption and decryption', 'Pembangkitan kunci, enkripsi, dan dekripsi RSA')}">
  <style>text{font:12px system-ui,sans-serif;fill:currentColor}.s{font-size:10px;opacity:.75}.k{font-size:11px;font-weight:700}.m{fill:none;stroke:currentColor;stroke-width:1.2;opacity:.45}.a{stroke-width:2;fill:none}.mono{font-family:ui-monospace,monospace;font-size:11px}</style>
  <rect x="10" y="6" width="340" height="82" rx="8" class="m"/>
  <text x="20" y="22" class="k">${L('Key generation (kept secret)', 'Pembangkitan kunci (dirahasiakan)')}</text>
  <text x="20" y="40" class="mono">p = 11, q = 13 → n = p·q = 143</text>
  <text x="20" y="57" class="mono">φ(n) = (p−1)(q−1) = 120 → e = 7, gcd(7, 120) = 1</text>
  <text x="20" y="74" class="mono">d = 7⁻¹ mod 120 = 103 (7·103 = 721 = 6·120 + 1)</text>
  <rect x="20" y="96" width="150" height="34" rx="6" fill="#3b82f6"/>
  <text x="95" y="110" text-anchor="middle" class="k" style="fill:#fff">${L('public key', 'kunci publik')}</text>
  <text x="95" y="124" text-anchor="middle" class="k" style="fill:#fff">(e, n) = (7, 143)</text>
  <rect x="190" y="96" width="150" height="34" rx="6" fill="#ef4444"/>
  <text x="265" y="110" text-anchor="middle" class="k" style="fill:#fff">${L('private key', 'kunci privat')}</text>
  <text x="265" y="124" text-anchor="middle" class="k" style="fill:#fff">(d, n) = (103, 143)</text>
  <rect x="14" y="146" width="64" height="40" rx="6" class="m"/>
  <text x="46" y="162" text-anchor="middle" class="s">${L('message', 'pesan')}</text>
  <text x="46" y="179" text-anchor="middle" class="k">m = 42</text>
  <path d="M80 166 L144 166" class="a" stroke="#3b82f6" marker-end="url(#r)"/>
  <text x="114" y="156" text-anchor="middle" class="s" style="fill:#3b82f6">42⁷ mod 143</text>
  <rect x="148" y="146" width="64" height="40" rx="6" class="m"/>
  <text x="180" y="162" text-anchor="middle" class="s">${L('ciphertext', 'teks sandi')}</text>
  <text x="180" y="179" text-anchor="middle" class="k">c = 81</text>
  <path d="M214 166 L278 166" class="a" stroke="#ef4444" marker-end="url(#r)"/>
  <text x="246" y="156" text-anchor="middle" class="s" style="fill:#ef4444">81¹⁰³ mod 143</text>
  <rect x="282" y="146" width="64" height="40" rx="6" class="m"/>
  <text x="314" y="162" text-anchor="middle" class="s">${L('recovered', 'dipulihkan')}</text>
  <text x="314" y="179" text-anchor="middle" class="k">m = 42</text>
  <text x="14" y="202" class="s" style="fill:#3b82f6">${L('anyone can encrypt', 'siapa pun bisa mengenkripsi')}</text>
  <text x="346" y="202" text-anchor="end" class="s" style="fill:#ef4444">${L('only the key owner can decrypt', 'hanya pemilik kunci bisa membuka')}</text>
  <text x="180" y="221" text-anchor="middle" class="s" style="fill:#f59e0b">${L('an eavesdropper sees e = 7, n = 143, c = 81', 'penyadap melihat e = 7, n = 143, c = 81')}</text>
  <text x="180" y="234" text-anchor="middle" class="s" style="fill:#f59e0b">${L('and must factor n = 11 × 13 to find d', 'dan harus memfaktorkan n = 11 × 13 untuk menemukan d')}</text>
  <defs><marker id="r" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="context-stroke"/></marker></defs>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'RSA uses a public key (e, n) that anyone may use to encrypt and a private key (d, n) that only its owner can use to decrypt.',
        'The keys fit together because e·d ≡ 1 (mod φ(n)), so (m^e)^d = m^(e·d) ≡ m (mod n) for every message m below n.',
        'n = p·q is public, but φ(n) = (p − 1)(q − 1) needs the factors p and q; the secrecy rests on factoring large numbers being infeasible.',
        'Modular exponentiation by square-and-multiply is fast even for 600-digit numbers, while its reverse, factoring, is not.',
        'The message must be smaller than n, and real systems pad messages and use RSA mainly to protect short symmetric keys.',
      ],
      id: [
        'RSA memakai kunci publik (e, n) yang boleh dipakai siapa pun untuk mengenkripsi dan kunci privat (d, n) yang hanya bisa dipakai pemiliknya untuk mendekripsi.',
        'Kedua kunci saling cocok karena e·d ≡ 1 (mod φ(n)), sehingga (m^e)^d = m^(e·d) ≡ m (mod n) untuk setiap pesan m di bawah n.',
        'n = p·q bersifat publik, tetapi φ(n) = (p − 1)(q − 1) membutuhkan faktor p dan q; kerahasiaannya bertumpu pada mustahilnya memfaktorkan bilangan besar.',
        'Pemangkatan modular dengan square-and-multiply cepat bahkan untuk bilangan 600 digit, sedangkan kebalikannya, pemfaktoran, tidak.',
        'Pesan harus lebih kecil dari n, dan sistem sungguhan menambahkan padding pada pesan serta memakai RSA terutama untuk melindungi kunci simetris yang pendek.',
      ],
    },
    vocabulary: {
      en: [
        ['Prime', 'A whole number greater than 1 whose only divisors are 1 and itself; RSA needs two large distinct primes.'],
        ['Modulus (n)', 'The product p·q; all encryption and decryption arithmetic is done with remainders after dividing by n.'],
        ['Euler\'s totient φ(n)', 'The number of integers from 1 to n that share no factor with n; for n = p·q it equals (p − 1)(q − 1).'],
        ['Coprime', 'Two numbers whose greatest common divisor is 1; e must be coprime with φ(n).'],
        ['Modular inverse', 'The number d such that e·d leaves remainder 1 when divided by φ(n), found with the extended Euclidean algorithm.'],
        ['Public key / private key', 'The pair (e, n) that anyone may use to encrypt, and the pair (d, n) kept secret for decrypting.'],
        ['Modular exponentiation', 'Computing m^e mod n efficiently by repeated squaring and reducing at each step.'],
        ['Trapdoor one-way function', 'A function easy to compute but hard to reverse unless you know a secret, here the factors of n.'],
      ],
      id: [
        ['Bilangan prima', 'Bilangan bulat lebih dari 1 yang hanya habis dibagi 1 dan dirinya sendiri; RSA butuh dua prima besar yang berbeda.'],
        ['Modulus (n)', 'Hasil kali p·q; semua perhitungan enkripsi dan dekripsi dilakukan dengan sisa pembagian oleh n.'],
        ['Totient Euler φ(n)', 'Banyaknya bilangan bulat dari 1 sampai n yang tidak berbagi faktor dengan n; untuk n = p·q nilainya (p − 1)(q − 1).'],
        ['Koprima', 'Dua bilangan yang faktor persekutuan terbesarnya 1; e harus koprima dengan φ(n).'],
        ['Invers modular', 'Bilangan d sedemikian sehingga e·d bersisa 1 ketika dibagi φ(n), ditemukan dengan algoritma Euclid yang diperluas.'],
        ['Kunci publik / kunci privat', 'Pasangan (e, n) yang boleh dipakai siapa pun untuk mengenkripsi, dan pasangan (d, n) yang dirahasiakan untuk mendekripsi.'],
        ['Pemangkatan modular', 'Menghitung m^e mod n secara efisien dengan pengkuadratan berulang dan mengambil sisa di tiap langkah.'],
        ['Fungsi satu-arah berpintu rahasia', 'Fungsi yang mudah dihitung tetapi sulit dibalik kecuali kamu tahu rahasianya, di sini faktor-faktor n.'],
      ],
    },
    misconceptions: {
      en: [
        ['The public key must be kept secret too.', 'It is meant to be public: anyone needs it to send you a message. Only d, together with p, q and φ(n), must stay secret.'],
        ['A longer message just needs a bigger exponent.', 'The message must be a number smaller than n, whatever e is. Long data is handled by encrypting a short symmetric key with RSA and the data with that key.'],
        ['Any odd number works as e.', 'e must be coprime with φ(n). With φ = 120, e = 9 shares the factor 3 and has no inverse; the simulation silently swaps it for a valid exponent.'],
        ['A computer could just try every prime to factor n.', 'A 2048-bit n has prime factors of about 300 digits each; there are more candidates than atoms in the observable universe, and even the best known factoring algorithms are far too slow at that size.'],
      ],
      id: [
        ['Kunci publik juga harus dirahasiakan.', 'Kunci publik memang untuk disebarkan: siapa pun membutuhkannya untuk mengirimimu pesan. Hanya d, beserta p, q, dan φ(n), yang harus tetap rahasia.'],
        ['Pesan yang lebih panjang hanya butuh eksponen yang lebih besar.', 'Pesan harus berupa bilangan yang lebih kecil dari n, berapa pun e-nya. Data panjang ditangani dengan mengenkripsi kunci simetris pendek memakai RSA dan mengenkripsi datanya dengan kunci itu.'],
        ['Bilangan ganjil apa pun bisa dipakai sebagai e.', 'e harus koprima dengan φ(n). Dengan φ = 120, e = 9 berbagi faktor 3 dan tidak punya invers; simulasi diam-diam menggantinya dengan eksponen yang valid.'],
        ['Komputer bisa saja mencoba semua bilangan prima untuk memfaktorkan n.', 'n 2048-bit memiliki faktor prima sekitar 300 digit masing-masing; kandidatnya lebih banyak daripada atom di alam semesta teramati, dan algoritma pemfaktoran terbaik yang diketahui pun masih jauh terlalu lambat pada ukuran itu.'],
      ],
    },
    realWorld: {
      en: [
        'HTTPS certificates: a website proves its identity with a signature that browsers verify using the site\'s public key.',
        'Software updates and electronic documents are digitally signed with the private key so anyone can check they were not altered.',
        'SSH and VPN logins use key pairs instead of passwords; the private key never leaves your computer.',
        'A large quantum computer running Shor\'s algorithm could factor n efficiently, which is why post-quantum cryptography is being deployed now.',
      ],
      id: [
        'Sertifikat HTTPS: sebuah situs web membuktikan identitasnya dengan tanda tangan yang diverifikasi peramban memakai kunci publik situs itu.',
        'Pembaruan perangkat lunak dan dokumen elektronik ditandatangani secara digital dengan kunci privat agar siapa pun bisa memeriksa bahwa isinya tidak diubah.',
        'Login SSH dan VPN memakai pasangan kunci alih-alih kata sandi; kunci privat tidak pernah meninggalkan komputermu.',
        'Komputer kuantum besar yang menjalankan algoritma Shor dapat memfaktorkan n secara efisien, itulah sebabnya kriptografi pascakuantum mulai diterapkan sekarang.',
      ],
    },
    questions: {
      en: [
        { q: 'With p = 11, q = 13 and e = 7, check that d = 103 is correct, then compute the ciphertext of m = 42 by hand.', a: '7 × 103 = 721 = 6 × 120 + 1, so e·d ≡ 1 (mod 120). For the power: 42² = 1764 ≡ 48 (mod 143); 42⁴ ≡ 48² = 2304 ≡ 16; so 42⁷ = 42⁴ · 42² · 42 ≡ 16 × 48 × 42 = 32,256 ≡ 81 (mod 143). The ciphertext is 81.' },
        { q: 'An eavesdropper knows e = 7, n = 143 and c = 81. What stops them from simply computing d?', a: 'd is the inverse of e modulo φ(n), and φ(143) = 120 can only be found from the factors 11 and 13. For 143 that is trivial, which is why this is a toy; for a 617-digit n, factoring is beyond any known classical computation.' },
        { q: 'You set p = 5, q = 7 (so n = 35) and m = 42. What does the simulation actually encrypt, and what is the lesson?', a: 'It encrypts 42 mod 35 = 7 and "recovers" 7, not 42. A message must be smaller than n, so real RSA uses an enormous n and encodes and pads the data to fit below it.' },
      ],
      id: [
        { q: 'Dengan p = 11, q = 13, dan e = 7, periksa bahwa d = 103 benar, lalu hitung teks sandi dari m = 42 secara manual.', a: '7 × 103 = 721 = 6 × 120 + 1, jadi e·d ≡ 1 (mod 120). Untuk pangkatnya: 42² = 1764 ≡ 48 (mod 143); 42⁴ ≡ 48² = 2304 ≡ 16; jadi 42⁷ = 42⁴ · 42² · 42 ≡ 16 × 48 × 42 = 32.256 ≡ 81 (mod 143). Teks sandinya 81.' },
        { q: 'Seorang penyadap tahu e = 7, n = 143, dan c = 81. Apa yang mencegahnya langsung menghitung d?', a: 'd adalah invers e modulo φ(n), dan φ(143) = 120 hanya bisa ditemukan dari faktor 11 dan 13. Untuk 143 itu sepele, itulah sebabnya ini mainan; untuk n 617 digit, pemfaktoran berada di luar jangkauan komputasi klasik mana pun yang diketahui.' },
        { q: 'Kamu mengatur p = 5, q = 7 (sehingga n = 35) dan m = 42. Apa yang sebenarnya dienkripsi simulasi, dan apa pelajarannya?', a: 'Ia mengenkripsi 42 mod 35 = 7 dan "memulihkan" 7, bukan 42. Pesan harus lebih kecil dari n, sehingga RSA sungguhan memakai n yang sangat besar serta mengodekan dan memberi padding pada data agar muat di bawahnya.' },
      ],
    },
  },
};
