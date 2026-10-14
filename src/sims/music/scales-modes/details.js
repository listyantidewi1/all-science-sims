// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Connect a scale\'s interval pattern to its emotional flavor.',
      'Recognize that the same notes shift between modes by changing the root.',
      'Hear pentatonic vs heptatonic scales side by side.',
    ],
    id: [
      'Menghubungkan pola interval suatu tangga nada dengan rasanya.',
      'Mengenali nada yang sama berpindah antar mode dengan mengubah dasar.',
      'Mendengar pentatonik vs heptatonik bersebelahan.',
    ],
  },
  tryThis: {
    en: [
      'C major — bright, "happy" sound.',
      'A natural minor — same white keys, different feel.',
      'C blues — only 6 notes including the flat-5 "blue" note.',
    ],
    id: [
      'C mayor — cerah, terdengar "ceria".',
      'A minor natural — tuts putih sama, terasa berbeda.',
      'C blues — hanya 6 nada termasuk "blue note" flat-5.',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'A piano has twelve different notes before the pattern repeats. From one key to the very next key, black or white, is a semitone, the smallest step in Western music. After twelve semitones you reach a note with the same name an octave higher; its sound wave vibrates exactly twice as fast, which is why the two notes sound "the same but higher". A scale is a chosen set of notes from those twelve, picked by following a recipe of steps. The major scale\'s recipe is 2-2-1-2-2-2-1 semitones (whole, whole, half, whole, whole, whole, half), and these seven steps add up to twelve, so the recipe lands exactly on the octave.',
        'The simulation applies the recipe for you. Choose a root note, the note the scale starts from and comes home to, and a scale or mode; the keyboard lights the notes that belong, with the root in gold, and shows the step pattern at the top. Because the recipe is the same in every key, D major uses exactly the same steps as C major but starts on D, which is why it needs two black keys while C major needs none. Click a lit key to hear it, or play the whole scale in order over two octaves.',
        'A mode is what you get when you keep the same set of notes but choose a different one as home. The white keys from C to C are the major scale (also called Ionian); the same white keys from A to A are the natural minor scale (Aeolian); from D to D they are Dorian, from G to G Mixolydian. Nothing about the notes has changed, yet the melodies feel different because the ear measures every note against the root. Pentatonic scales keep only five notes and leave out the semitone steps, so almost any two of their notes sound good together. The blues scale is a minor pentatonic with one extra note, the "blue note" a semitone below the fifth, which gives it its bending, bluesy colour.',
        'The simulation keeps things simple. Every note is tuned in equal temperament, the modern piano standard where each semitone is the same size; many traditions, including Javanese and Balinese gamelan, use tunings that do not fit these twelve keys at all. The sim plays one note at a time with a plain electronic tone, so it shows the notes of a scale but not the chords, rhythms or melodies that give real music its character. And the words "happy" and "sad" for major and minor are tendencies learned from the music around us, not rules: plenty of lively dance tunes are in minor keys.',
      ],
      id: [
        'Piano punya dua belas nada yang berbeda sebelum polanya berulang. Dari satu tuts ke tuts berikutnya, hitam maupun putih, disebut setengah nada (semitone), langkah terkecil dalam musik Barat. Setelah dua belas setengah nada kamu sampai pada nada bernama sama satu oktaf lebih tinggi; gelombang bunyinya bergetar tepat dua kali lebih cepat, itulah sebabnya kedua nada terdengar "sama tetapi lebih tinggi". Tangga nada adalah sekumpulan nada yang dipilih dari dua belas itu dengan mengikuti resep langkah. Resep tangga nada mayor adalah 2-2-1-2-2-2-1 setengah nada (satu, satu, setengah, satu, satu, satu, setengah), dan ketujuh langkah ini berjumlah dua belas, sehingga resepnya mendarat tepat di oktaf.',
        'Simulasi menerapkan resep itu untukmu. Pilih nada dasar, yaitu nada tempat tangga nada mulai dan pulang, lalu pilih tangga nada atau mode; keyboard menyalakan nada-nada yang termasuk, dengan nada dasar berwarna emas, dan menampilkan pola langkahnya di bagian atas. Karena resepnya sama di setiap kunci, D mayor memakai langkah yang persis sama dengan C mayor tetapi mulai dari D, itulah sebabnya ia butuh dua tuts hitam sementara C mayor tidak butuh sama sekali. Klik tuts yang menyala untuk mendengarnya, atau mainkan seluruh tangga nada berurutan sepanjang dua oktaf.',
        'Mode adalah yang kamu dapat jika mempertahankan kumpulan nada yang sama tetapi memilih nada lain sebagai rumah. Tuts putih dari C ke C adalah tangga nada mayor (disebut juga Ionian); tuts putih yang sama dari A ke A adalah tangga nada minor natural (Aeolian); dari D ke D disebut Dorian, dari G ke G Mixolydian. Nadanya sama sekali tidak berubah, tetapi melodinya terasa berbeda karena telinga mengukur setiap nada terhadap nada dasarnya. Tangga nada pentatonik hanya memakai lima nada dan membuang langkah setengah nada, sehingga hampir semua pasangan nadanya enak didengar bersama. Tangga nada blues adalah pentatonik minor dengan satu nada tambahan, "blue note" setengah nada di bawah nada kelima, yang memberi warna blues yang melengkung.',
        'Simulasi ini dibuat sederhana. Setiap nada disetel dalam temperamen sama (equal temperament), standar piano modern yang membuat tiap setengah nada berukuran sama; banyak tradisi, termasuk gamelan Jawa dan Bali, memakai laras yang sama sekali tidak cocok dengan dua belas tuts ini. Simulasi membunyikan satu nada pada satu waktu dengan bunyi elektronik polos, sehingga ia menunjukkan nada-nada tangga nada tetapi tidak menunjukkan akor, irama, atau melodi yang memberi karakter pada musik sungguhan. Dan kata "ceria" dan "sedih" untuk mayor dan minor adalah kecenderungan yang kita pelajari dari musik di sekitar kita, bukan aturan: banyak lagu dansa yang riang ditulis dalam kunci minor.',
      ],
    },
    figure: {
      caption: {
        en: 'One octave of the keyboard with the C major scale lit. Each neighbouring key is one semitone apart; the major recipe skips a key (2) five times and moves to the next key (1) twice, adding up to 12 semitones.',
        id: 'Satu oktaf keyboard dengan tangga nada C mayor menyala. Tuts yang bertetangga berjarak satu setengah nada; resep mayor melompati satu tuts (2) lima kali dan bergerak ke tuts berikutnya (1) dua kali, totalnya 12 setengah nada.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        const whites = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
        const blackAfter = [0, 1, 3, 4, 5];
        let keys = '';
        whites.forEach((n, i) => {
          const x = 40 + i * 40;
          const fill = i === 0 ? '#f59e0b' : '#10b981';
          keys += `<rect x="${x}" y="40" width="39" height="120" fill="${fill}" fill-opacity=".55" stroke="currentColor" stroke-width="1"/>`;
          keys += `<text x="${x + 19.5}" y="152" text-anchor="middle">${n}</text>`;
        });
        blackAfter.forEach((i) => {
          keys += `<rect x="${40 + i * 40 + 27}" y="40" width="25" height="74" fill="currentColor" stroke="currentColor" stroke-width="1"/>`;
        });
        const steps = [2, 2, 1, 2, 2, 2, 1];
        let stepTxt = '';
        steps.forEach((s, i) => {
          const x = 40 + i * 40 + 40;
          stepTxt += `<line x1="${x - 20}" y1="178" x2="${x + 20}" y2="178" stroke="${s === 2 ? '#3b82f6' : '#ef4444'}" stroke-width="2"/>`;
          stepTxt += `<text x="${x}" y="194" text-anchor="middle" fill="${s === 2 ? '#3b82f6' : '#ef4444'}">${s}</text>`;
        });
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Piano octave showing the C major scale', 'Satu oktaf piano dengan tangga nada C mayor')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}</style>
  <rect x="320" y="40" width="39" height="120" fill="#f59e0b" fill-opacity=".55" stroke="currentColor" stroke-width="1"/>
  <text x="339.5" y="152" text-anchor="middle">C</text>
  ${keys}
  ${stepTxt}
  <text x="40" y="24" fill="#f59e0b">${L('root (home note)', 'nada dasar (rumah)')}</text>
  <text x="200" y="24">${L('one octave = 12 semitones', 'satu oktaf = 12 setengah nada')}</text>
  <text x="40" y="216" fill="#3b82f6">2 = ${L('whole step (skip a key)', 'satu nada (lompati satu tuts)')}</text>
  <text x="40" y="232" fill="#ef4444">1 = ${L('half step (next key)', 'setengah nada (tuts berikutnya)')}</text>
  <text x="236" y="232">${L('black keys: not in C major', 'tuts hitam: bukan C mayor')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'There are twelve notes in an octave, one semitone apart; a scale is a chosen subset built from a recipe of steps.',
        'The major recipe is 2-2-1-2-2-2-1 semitones; starting it on a different root gives the same kind of scale with different notes.',
        'A mode uses the same notes as another scale but a different home note, so C major and A natural minor light the same keys.',
        'Pentatonic scales have five notes and no semitone steps; the blues scale adds one extra "blue note" to the minor pentatonic.',
        'The feeling of a scale comes from how each note sits relative to the root, not from the keys being black or white.',
      ],
      id: [
        'Ada dua belas nada dalam satu oktaf, berjarak satu setengah nada; tangga nada adalah pilihan sebagian nada yang dibangun dari resep langkah.',
        'Resep mayor adalah 2-2-1-2-2-2-1 setengah nada; memulainya dari nada dasar lain memberi tangga nada sejenis dengan nada yang berbeda.',
        'Mode memakai nada yang sama dengan tangga nada lain tetapi dengan nada rumah yang berbeda, sehingga C mayor dan A minor natural menyalakan tuts yang sama.',
        'Tangga nada pentatonik punya lima nada tanpa langkah setengah nada; tangga nada blues menambahkan satu "blue note" pada pentatonik minor.',
        'Rasa sebuah tangga nada berasal dari letak tiap nada terhadap nada dasarnya, bukan dari tuts yang hitam atau putih.',
      ],
    },
    vocabulary: {
      en: [
        ['Semitone (half step)', 'The distance from one key to the very next key on the keyboard; the smallest step in Western music.'],
        ['Whole tone (whole step)', 'Two semitones: skip one key.'],
        ['Octave', 'The distance of twelve semitones; the higher note vibrates twice as fast and has the same letter name.'],
        ['Root (tonic)', 'The home note a scale starts from and resolves to; gold on the simulation\'s keyboard.'],
        ['Scale', 'An ordered set of notes chosen from the twelve by a fixed pattern of steps.'],
        ['Mode', 'A scale made by starting the same set of notes on a different root, such as Dorian or Mixolydian.'],
        ['Pentatonic', 'A five-note scale; the major pentatonic is the major scale without its 4th and 7th notes.'],
        ['Blue note', 'The flattened fifth added to the minor pentatonic to make the blues scale.'],
      ],
      id: [
        ['Setengah nada (semitone)', 'Jarak dari satu tuts ke tuts berikutnya di keyboard; langkah terkecil dalam musik Barat.'],
        ['Satu nada (whole tone)', 'Dua setengah nada: lompati satu tuts.'],
        ['Oktaf', 'Jarak dua belas setengah nada; nada yang lebih tinggi bergetar dua kali lebih cepat dan punya nama huruf yang sama.'],
        ['Nada dasar (tonik)', 'Nada rumah tempat tangga nada mulai dan kembali; berwarna emas di keyboard simulasi.'],
        ['Tangga nada', 'Kumpulan nada berurutan yang dipilih dari dua belas nada dengan pola langkah tertentu.'],
        ['Mode', 'Tangga nada yang dibuat dengan memulai kumpulan nada yang sama dari nada dasar berbeda, misalnya Dorian atau Mixolydian.'],
        ['Pentatonik', 'Tangga nada lima nada; pentatonik mayor adalah tangga nada mayor tanpa nada ke-4 dan ke-7.'],
        ['Blue note', 'Nada kelima yang diturunkan setengah nada, ditambahkan pada pentatonik minor untuk membentuk tangga nada blues.'],
      ],
    },
    misconceptions: {
      en: [
        ['Black keys are special "extra" notes that normal scales avoid.', 'Black and white are only a layout. Every major scale except C major needs black keys: D major uses F♯ and C♯, and F♯ major uses six of them. All twelve notes are equally real.'],
        ['Major always sounds happy and minor always sounds sad.', 'These are habits of listening, not laws. Many fast, cheerful folk and dance tunes are in minor keys, and slow major-key songs can be very sad. The mood comes from tempo, rhythm and words as much as from the scale.'],
        ['C major and A minor are the same scale because they use the same keys.', 'They share notes but not a home. In C major the ear hears C as the resting point; in A minor it hears A. Changing the root changes which notes feel tense and which feel settled, so the melodies feel quite different.'],
        ['C♯ and D♭ are two different notes.', 'On a piano they are the same key and, in equal temperament, exactly the same pitch. The two names describe the note\'s role in a particular scale; the simulation labels every black key with its sharp name.'],
      ],
      id: [
        ['Tuts hitam adalah nada "tambahan" istimewa yang dihindari tangga nada biasa.', 'Hitam dan putih hanyalah tata letak. Setiap tangga nada mayor selain C mayor butuh tuts hitam: D mayor memakai F♯ dan C♯, dan F♯ mayor memakai enam tuts hitam. Kedua belas nada sama nyatanya.'],
        ['Mayor selalu terdengar ceria dan minor selalu terdengar sedih.', 'Itu kebiasaan mendengar, bukan hukum. Banyak lagu rakyat dan lagu dansa yang cepat dan riang berada dalam kunci minor, dan lagu mayor yang lambat bisa sangat sedih. Suasana datang dari tempo, irama, dan lirik sama besarnya dengan dari tangga nada.'],
        ['C mayor dan A minor adalah tangga nada yang sama karena memakai tuts yang sama.', 'Keduanya berbagi nada tetapi tidak berbagi rumah. Dalam C mayor telinga mendengar C sebagai titik istirahat; dalam A minor telinga mendengar A. Mengubah nada dasar mengubah nada mana yang terasa tegang dan mana yang terasa tenang, sehingga melodinya terasa sangat berbeda.'],
        ['C♯ dan D♭ adalah dua nada yang berbeda.', 'Di piano keduanya tuts yang sama dan, dalam temperamen sama, tinggi nadanya persis sama. Dua nama itu menjelaskan peran nada dalam tangga nada tertentu; simulasi memberi label setiap tuts hitam dengan nama kresnya.'],
      ],
    },
    realWorld: {
      en: [
        'Many children\'s songs, folk songs and lullabies around the world use pentatonic scales, which is one reason they are easy to sing and to improvise on.',
        'Blues, rock and jazz guitarists lean on the minor pentatonic and blues scales for solos, bending into the blue note for expression.',
        'Javanese and Balinese gamelan use their own five-note (slendro) and seven-note (pelog) tunings, a reminder that the piano\'s twelve equal semitones are one system among many.',
        'Film and game composers pick modes deliberately: Lydian for wonder, Dorian or Aeolian for ancient or folk moods, harmonic or Hungarian minor for dramatic, exotic scenes.',
      ],
      id: [
        'Banyak lagu anak, lagu daerah, dan lagu pengantar tidur di seluruh dunia memakai tangga nada pentatonik, salah satu alasan lagu-lagu itu mudah dinyanyikan dan diimprovisasi.',
        'Gitaris blues, rock, dan jazz mengandalkan pentatonik minor dan tangga nada blues untuk solo, membengkokkan nada menuju blue note untuk ekspresi.',
        'Gamelan Jawa dan Bali memakai laras lima nada (slendro) dan tujuh nada (pelog) tersendiri, pengingat bahwa dua belas setengah nada piano yang sama besar hanyalah satu sistem di antara banyak sistem.',
        'Komponis film dan gim memilih mode dengan sengaja: Lydian untuk rasa takjub, Dorian atau Aeolian untuk suasana kuno atau rakyat, harmonik atau Hungarian minor untuk adegan dramatis dan eksotis.',
      ],
    },
    questions: {
      en: [
        { q: 'Use the major recipe 2-2-1-2-2-2-1 to work out the notes of D major. Which keys will light up?', a: 'Start on D and count semitones: D, up 2 to E, up 2 to F♯, up 1 to G, up 2 to A, up 2 to B, up 2 to C♯, up 1 back to D. Two black keys (F♯ and C♯) light up, the rest are white.' },
        { q: 'Set the root to C with Major, then change to root A with Natural minor. Why do exactly the same keys light up?', a: 'Natural minor (Aeolian) is the major scale\'s notes started from its sixth note. A is the sixth note of C major, so A natural minor contains the white keys A B C D E F G: the same seven notes, with A as home instead of C. The step pattern reads 2-1-2-2-1-2-2, which is the major pattern rotated.' },
        { q: 'In C blues the keyboard lights six keys. Which one is the "blue note", and how does it relate to the C minor pentatonic?', a: 'C minor pentatonic is C, E♭, F, G, B♭ (steps 3-2-2-3-2). The blues scale adds F♯ (shown with its sharp name, also called G♭), a semitone below the fifth note G. That flattened fifth is the blue note, and it is the only key that lights in C blues but not in C pentatonic minor.' },
      ],
      id: [
        { q: 'Pakai resep mayor 2-2-1-2-2-2-1 untuk menentukan nada-nada D mayor. Tuts mana yang akan menyala?', a: 'Mulai dari D dan hitung setengah nada: D, naik 2 ke E, naik 2 ke F♯, naik 1 ke G, naik 2 ke A, naik 2 ke B, naik 2 ke C♯, naik 1 kembali ke D. Dua tuts hitam (F♯ dan C♯) menyala, sisanya putih.' },
        { q: 'Atur nada dasar C dengan Major, lalu ganti ke nada dasar A dengan Natural minor. Mengapa tuts yang menyala persis sama?', a: 'Minor natural (Aeolian) adalah nada-nada tangga nada mayor yang dimulai dari nada keenamnya. A adalah nada keenam C mayor, sehingga A minor natural berisi tuts putih A B C D E F G: tujuh nada yang sama, dengan A sebagai rumah menggantikan C. Pola langkahnya terbaca 2-1-2-2-1-2-2, yaitu pola mayor yang diputar.' },
        { q: 'Dalam C blues keyboard menyalakan enam tuts. Mana yang merupakan "blue note", dan bagaimana hubungannya dengan C pentatonik minor?', a: 'C pentatonik minor adalah C, E♭, F, G, B♭ (langkah 3-2-2-3-2). Tangga nada blues menambahkan F♯ (ditampilkan dengan nama kresnya, disebut juga G♭), setengah nada di bawah nada kelima G. Nada kelima yang diturunkan itulah blue note, dan itu satu-satunya tuts yang menyala di C blues tetapi tidak di C pentatonik minor.' },
      ],
    },
  },
};
