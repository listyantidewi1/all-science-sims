// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Connect interval stacks to chord names: major = 4+3 semitones, minor = 3+4.',
      'Hear the emotional flavor of each chord quality.',
      'Build common 7th, sus, and add9 chords by adding more notes.',
    ],
    id: [
      'Menghubungkan tumpukan interval dengan nama akord: mayor = 4+3 semiton, minor = 3+4.',
      'Mendengar nuansa emosional tiap kualitas akord.',
      'Membangun akord 7th, sus, dan add9 umum dengan menambah nada.',
    ],
  },  tryThis: {
    en: [
      'Click C, E, G — that is C major.',
      'Click C, E♭, G — C minor.',
      'Click C, E, G, B♭ — C dominant 7 (the "blues" chord).',
    ],
    id: [
      'Klik C, E, G — itu C mayor.',
      'Klik C, E♭, G — C minor.',
      'Klik C, E, G, B♭ — C dominan 7 (akord "blues").',
    ],
  },

  // "Learn" section: the music theory behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'A piano keyboard repeats the same twelve notes over and over: C, C♯, D, D♯, E, F, F♯, G, G♯, A, A♯, B, then C again one octave higher. The step from any key to the very next key, black or white, is called a semitone. Two notes an octave apart sound so alike that they share a name, and the reason is physical: going up one octave doubles the frequency of the sound wave. Each semitone up multiplies the frequency by the same small amount, about 1.06, so twelve semitones multiply it by 2.',
        'A chord is three or more notes played at the same time. What gives a chord its character is not the names of the notes but the distances between them. Count semitones up from the lowest note, the root: 4 then 3 more gives a major chord, which most people hear as bright or happy. 3 then 4 gives a minor chord, often heard as sad or serious. 3 then 3 is a diminished chord, which sounds tense, and 4 then 4 is augmented, which sounds strange and unsettled. Start the same pattern from a different root and you get the same kind of chord in a new key, which is why there are twelve major chords and twelve minor chords.',
        'The simulation shows two octaves starting from middle C. Click keys to switch them on or off; the sim then looks at the distances from the lowest note you chose and names the chord if it matches one of its patterns. Adding a fourth note 10 semitones above the root turns a major chord into a dominant 7th, the restless sound used in blues and in the chord that leads back to the home key. Eleven semitones gives a major 7th, and replacing the third by the note 5 or 2 semitones above the root gives the open-sounding sus4 and sus2 chords. Press Play to hear the chord with a simple synthetic tone.',
        'The sim keeps a few things simple. It always treats the lowest sounding note as the root, so a C major chord played as E-G-C (an inversion) is not recognized even though musicians would still call it C major. Its tone is a plain electronic waveform, not a real piano, so the colour of the sound is different, though the pitches are the same. It only knows a short list of common chords, and tuning follows the standard equal-tempered keyboard where every semitone is exactly the same size.',
      ],
      id: [
        'Papan piano mengulang dua belas nada yang sama berkali-kali: C, C♯, D, D♯, E, F, F♯, G, G♯, A, A♯, B, lalu C lagi satu oktaf lebih tinggi. Langkah dari satu tuts ke tuts yang tepat berikutnya, hitam atau putih, disebut semiton. Dua nada yang berjarak satu oktaf terdengar sangat mirip sehingga memakai nama yang sama, dan alasannya bersifat fisika: naik satu oktaf berarti frekuensi gelombang bunyinya menjadi dua kali lipat. Setiap semiton ke atas mengalikan frekuensi dengan bilangan kecil yang sama, sekitar 1,06, sehingga dua belas semiton mengalikannya dengan 2.',
        'Akord adalah tiga nada atau lebih yang dibunyikan bersamaan. Yang memberi karakter pada akord bukan nama nadanya, melainkan jarak antarnada. Hitung semiton ke atas dari nada terendah, yaitu nada dasar: 4 lalu 3 lagi menghasilkan akord mayor, yang oleh banyak orang terdengar cerah atau gembira. 3 lalu 4 menghasilkan akord minor, yang sering terdengar sedih atau serius. 3 lalu 3 adalah akord diminished, yang terdengar tegang, dan 4 lalu 4 adalah augmented, yang terdengar aneh dan menggantung. Mulailah pola yang sama dari nada dasar lain dan kamu mendapat jenis akord yang sama di kunci baru; itulah sebabnya ada dua belas akord mayor dan dua belas akord minor.',
        'Simulasi menampilkan dua oktaf mulai dari C tengah. Klik tuts untuk menyalakan atau mematikannya; sim lalu melihat jarak dari nada terendah yang kamu pilih dan menyebutkan nama akordnya jika cocok dengan salah satu polanya. Menambah nada keempat 10 semiton di atas nada dasar mengubah akord mayor menjadi dominan 7, bunyi gelisah yang dipakai dalam blues dan dalam akord yang menuntun kembali ke kunci asal. Sebelas semiton menghasilkan mayor 7, dan mengganti nada ketiga dengan nada 5 atau 2 semiton di atas nada dasar menghasilkan akord sus4 dan sus2 yang terdengar terbuka. Tekan Play untuk mendengar akord dengan nada sintetis sederhana.',
        'Sim ini menyederhanakan beberapa hal. Nada terendah yang berbunyi selalu dianggap sebagai nada dasar, jadi akord C mayor yang dimainkan sebagai E-G-C (inversi) tidak dikenali meskipun musisi tetap menyebutnya C mayor. Suaranya berupa gelombang elektronik sederhana, bukan piano sungguhan, sehingga warna bunyinya berbeda walaupun nadanya sama. Sim hanya mengenal daftar pendek akord yang umum, dan penalaannya mengikuti papan nada bertemperamen sama yang standar, dengan setiap semiton berukuran persis sama.',
      ],
    },
    figure: {
      caption: {
        en: 'One octave of keys. Counting semitones from the root C: 4 up reaches E and 3 more reaches G, so C-E-G is a major chord. Lowering E by one semitone to E♭ makes the stack 3 + 4, a minor chord.',
        id: 'Satu oktaf tuts. Menghitung semiton dari nada dasar C: 4 ke atas sampai E dan 3 lagi sampai G, jadi C-E-G adalah akord mayor. Menurunkan E satu semiton menjadi E♭ membuat tumpukannya 3 + 4, akord minor.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('A C major chord on a keyboard strip', 'Akord C mayor pada papan nada')}">
  <style>text{font:12px system-ui,sans-serif;fill:currentColor}.w{fill:none;stroke:currentColor;stroke-width:1.2}.k{stroke:currentColor;stroke-width:1.2;fill:#3b82f6;opacity:.55}.b{fill:currentColor;opacity:.85}.n{font-size:11px;text-anchor:middle}.s{font-size:11px;text-anchor:middle;fill:#f59e0b}.br{fill:none;stroke:#f59e0b;stroke-width:1.5}</style>
  <rect x="30" y="70" width="36" height="110" class="k"/>
  <rect x="66" y="70" width="36" height="110" class="w"/>
  <rect x="102" y="70" width="36" height="110" class="k"/>
  <rect x="138" y="70" width="36" height="110" class="w"/>
  <rect x="174" y="70" width="36" height="110" class="k"/>
  <rect x="210" y="70" width="36" height="110" class="w"/>
  <rect x="246" y="70" width="36" height="110" class="w"/>
  <rect x="282" y="70" width="36" height="110" class="w"/>
  <rect x="55" y="70" width="22" height="68" class="b"/>
  <rect x="91" y="70" width="22" height="68" class="b"/>
  <rect x="163" y="70" width="22" height="68" class="b"/>
  <rect x="199" y="70" width="22" height="68" class="b"/>
  <rect x="235" y="70" width="22" height="68" class="b"/>
  <text x="48" y="196" class="n">C</text><text x="84" y="196" class="n">D</text><text x="120" y="196" class="n">E</text><text x="156" y="196" class="n">F</text><text x="192" y="196" class="n">G</text><text x="228" y="196" class="n">A</text><text x="264" y="196" class="n">B</text><text x="300" y="196" class="n">C</text>
  <text x="48" y="168" class="n" font-weight="bold">1</text><text x="120" y="168" class="n" font-weight="bold">3</text><text x="192" y="168" class="n" font-weight="bold">5</text>
  <path d="M48 62 L48 54 L120 54 L120 62" class="br"/>
  <text x="84" y="48" class="s">4 ${L('semitones', 'semiton')}</text>
  <path d="M120 62 L120 54 L192 54 L192 62" class="br"/>
  <text x="156" y="48" class="s">3 ${L('semitones', 'semiton')}</text>
  <text x="30" y="24" font-weight="bold">${L('C major = C + E + G', 'C mayor = C + E + G')}</text>
  <text x="30" y="216" opacity=".8">${L('major: 4 then 3  ·  minor: 3 then 4  ·  diminished: 3 then 3', 'mayor: 4 lalu 3  ·  minor: 3 lalu 4  ·  diminished: 3 lalu 3')}</text>
  <text x="30" y="234" opacity=".8">${L('one semitone = one key to the next, black or white', 'satu semiton = satu tuts ke tuts berikutnya, hitam atau putih')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'A semitone is the step from one key to the very next; twelve semitones make an octave, where the frequency doubles.',
        'A chord\'s quality comes from the semitone distances between its notes, not from the note names.',
        'Major stacks 4 + 3 semitones, minor stacks 3 + 4, diminished 3 + 3 and augmented 4 + 4.',
        'Adding a note 10 or 11 semitones above the root makes a 7th chord, which adds colour and tension.',
        'The same pattern from any root gives the same chord quality in a different key.',
      ],
      id: [
        'Semiton adalah langkah dari satu tuts ke tuts berikutnya; dua belas semiton membentuk satu oktaf, tempat frekuensi menjadi dua kali lipat.',
        'Kualitas akord berasal dari jarak semiton antarnadanya, bukan dari nama nadanya.',
        'Mayor menumpuk 4 + 3 semiton, minor 3 + 4, diminished 3 + 3, dan augmented 4 + 4.',
        'Menambah nada 10 atau 11 semiton di atas nada dasar menghasilkan akord 7, yang menambah warna dan ketegangan.',
        'Pola yang sama dari nada dasar mana pun menghasilkan kualitas akord yang sama di kunci yang berbeda.',
      ],
    },
    vocabulary: {
      en: [
        ['Semitone', 'The smallest step on the keyboard, from one key to the next (black or white).'],
        ['Octave', 'The distance of twelve semitones; the higher note has exactly twice the frequency.'],
        ['Root', 'The note a chord is built from and named after; in this sim, the lowest note you select.'],
        ['Interval', 'The distance between two notes, measured in semitones.'],
        ['Triad', 'A three-note chord made of a root, a third and a fifth.'],
        ['Major / minor', 'Chord qualities with a 4 + 3 or a 3 + 4 semitone stack; heard as bright or dark.'],
        ['Seventh chord', 'A triad plus a fourth note 10 or 11 semitones above the root.'],
        ['Inversion', 'The same chord with a note other than the root at the bottom; the sim does not recognize these.'],
      ],
      id: [
        ['Semiton', 'Langkah terkecil pada papan nada, dari satu tuts ke tuts berikutnya (hitam atau putih).'],
        ['Oktaf', 'Jarak dua belas semiton; nada yang lebih tinggi berfrekuensi tepat dua kali lipat.'],
        ['Nada dasar', 'Nada tempat akord dibangun dan dinamai; dalam sim ini, nada terendah yang kamu pilih.'],
        ['Interval', 'Jarak antara dua nada, diukur dalam semiton.'],
        ['Triad', 'Akord tiga nada yang terdiri atas nada dasar, terts, dan kuint.'],
        ['Mayor / minor', 'Kualitas akord dengan tumpukan 4 + 3 atau 3 + 4 semiton; terdengar cerah atau gelap.'],
        ['Akord septim', 'Triad ditambah nada keempat 10 atau 11 semiton di atas nada dasar.'],
        ['Inversi', 'Akord yang sama dengan nada selain nada dasar di posisi terbawah; sim ini tidak mengenalinya.'],
      ],
    },
    misconceptions: {
      en: [
        ['Black keys are special "sharp" notes that do not count as real steps.', 'Every key, black or white, is one semitone from its neighbour. E to F and B to C are semitones with no black key between, which is why counting keys, not colours, matters.'],
        ['A minor chord is just a major chord played lower or quieter.', 'Major and minor differ by one note: the middle note is one semitone lower in minor. Loudness and register do not change the chord quality.'],
        ['Chords only work on the white keys.', 'Any note can be a root. F♯ major is F♯-A♯-C♯, built with the same 4 + 3 pattern; it just uses more black keys.'],
        ['The names C, E, G are what make the chord C major.', 'The pattern of distances makes it major; the root C gives it the name. E-G♯-B is also major, and C-E♭-G, using two of the same letters, is minor.'],
      ],
      id: [
        ['Tuts hitam adalah nada "kres" istimewa yang tidak dihitung sebagai langkah sungguhan.', 'Setiap tuts, hitam atau putih, berjarak satu semiton dari tetangganya. E ke F dan B ke C adalah semiton tanpa tuts hitam di antaranya; itulah sebabnya yang dihitung adalah tutsnya, bukan warnanya.'],
        ['Akord minor hanyalah akord mayor yang dimainkan lebih rendah atau lebih pelan.', 'Mayor dan minor berbeda satu nada: nada tengahnya satu semiton lebih rendah pada minor. Kekerasan bunyi dan tinggi register tidak mengubah kualitas akord.'],
        ['Akord hanya bisa dibentuk dari tuts putih.', 'Nada apa pun bisa menjadi nada dasar. F♯ mayor adalah F♯-A♯-C♯, dibangun dengan pola 4 + 3 yang sama; hanya memakai lebih banyak tuts hitam.'],
        ['Nama C, E, G-lah yang membuat akord itu C mayor.', 'Pola jaraknya yang membuatnya mayor; nada dasar C yang memberi namanya. E-G♯-B juga mayor, dan C-E♭-G, dengan dua huruf yang sama, adalah minor.'],
      ],
    },
    realWorld: {
      en: [
        'Most pop and folk songs are built from a handful of major and minor chords; many famous songs use only four.',
        'Film composers switch from major to minor, or add diminished chords, to turn a cheerful scene tense or sad without changing the melody.',
        'Guitar chord shapes are the same semitone patterns laid out across strings instead of keys.',
        'Music apps and tuners that name a chord as you play it use the same idea the sim does: measure the intervals between the notes and look up the pattern.',
      ],
      id: [
        'Kebanyakan lagu pop dan daerah dibangun dari beberapa akord mayor dan minor saja; banyak lagu terkenal hanya memakai empat akord.',
        'Komposer film beralih dari mayor ke minor, atau menambahkan akord diminished, untuk mengubah adegan ceria menjadi tegang atau sedih tanpa mengganti melodinya.',
        'Bentuk akord gitar adalah pola semiton yang sama, hanya disusun pada senar dan bukan pada tuts.',
        'Aplikasi musik dan tuner yang menyebutkan nama akord saat kamu bermain memakai gagasan yang sama dengan sim: mengukur interval antarnada lalu mencocokkannya dengan pola.',
      ],
    },
    questions: {
      en: [
        { q: 'You click D, F♯ and A. What chord does the sim name, and why?', a: 'D major. From the root D, F♯ is 4 semitones up (D♯, E, F, F♯) and A is 3 more (G, G♯, A). The 4 + 3 stack is the major pattern.' },
        { q: 'Start with C major (C, E, G) and change one note to make it C minor. Which note moves and in which direction?', a: 'Move E down one semitone to E♭ (shown as D♯ on the keyboard). The stack becomes 3 + 4, which the sim names C minor; C and G stay where they are.' },
        { q: 'You click E, G and C (with E as the lowest note). The sim says there is no standard chord match. Is this really not a chord?', a: 'It is C major in an inversion: the same three notes with E at the bottom. The sim only counts intervals from the lowest note, so it gets 3 and 8 semitones, which is not in its list. Musicians would still call it C major.' },
      ],
      id: [
        { q: 'Kamu mengklik D, F♯, dan A. Akord apa yang disebutkan sim, dan mengapa?', a: 'D mayor. Dari nada dasar D, F♯ berjarak 4 semiton ke atas (D♯, E, F, F♯) dan A berjarak 3 lagi (G, G♯, A). Tumpukan 4 + 3 adalah pola mayor.' },
        { q: 'Mulai dari C mayor (C, E, G), ubah satu nada untuk menjadikannya C minor. Nada mana yang bergeser dan ke arah mana?', a: 'Geser E turun satu semiton menjadi E♭ (ditampilkan sebagai D♯ pada papan nada). Tumpukannya menjadi 3 + 4, yang disebut sim sebagai C minor; C dan G tetap di tempatnya.' },
        { q: 'Kamu mengklik E, G, dan C (dengan E sebagai nada terendah). Sim menyatakan tidak ada akord standar yang cocok. Apakah ini sungguh bukan akord?', a: 'Itu adalah C mayor dalam inversi: tiga nada yang sama dengan E di posisi terbawah. Sim hanya menghitung interval dari nada terendah, sehingga mendapat 3 dan 8 semiton, yang tidak ada dalam daftarnya. Musisi tetap menyebutnya C mayor.' },
      ],
    },
  },
};
