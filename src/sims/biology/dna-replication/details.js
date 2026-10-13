// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Distinguish leading from lagging strand replication.',
      'Identify the role of helicase, primase, polymerase, ligase.',
      'See why replication is "semiconservative".',
    ],
    id: [
      'Membedakan replikasi untai pemimpin dan tertinggal.',
      'Mengenali peran helikase, primase, polimerase, ligase.',
      'Melihat mengapa replikasi bersifat "semikonservatif".',
    ],
  },
  tryThis: {
    en: [
      'Pause and identify both daughter strands — one is half-old, half-new.',
      'Speed it up — see Okazaki fragments accumulate then ligate.',
      'Try a longer template — does the lagging strand still keep up?',
    ],
    id: [
      'Jeda dan kenali kedua untai anak — satu setengah lama, setengah baru.',
      'Percepat — amati fragmen Okazaki menumpuk lalu disambung.',
      'Coba cetakan yang lebih panjang — apakah untai tertinggal tetap menyusul?',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'Before a cell divides it must copy its DNA so that each daughter gets a complete genome. The double helix makes this possible because the two strands are complementary: A always pairs with T and G with C, so each strand carries the information to rebuild the other. Replication is semiconservative: each new double helix keeps one original (parental) strand and gains one newly made strand. Meselson and Stahl demonstrated this in 1958 by labelling bacterial DNA with heavy nitrogen and following its density through generations.',
        'A team of enzymes does the work. Helicase unwinds the helix and breaks the hydrogen bonds between bases, opening a Y-shaped replication fork. DNA polymerase then adds nucleotides one at a time, matching each to the template base, but it has two strict limits: it can only extend an existing strand, never start one, and it can only add to the 3\' end, so every new strand grows in the 5\' to 3\' direction. Primase gets around the first limit by laying down a short RNA primer for polymerase to extend. Because the two parental strands run in opposite directions (they are antiparallel), the second limit splits the work in two. On one template the new strand can grow continuously toward the fork: the leading strand. On the other template the new strand must grow away from the fork, so it is made in short pieces called Okazaki fragments, each starting from its own primer. Later the primers are replaced with DNA and ligase seals the gaps between fragments.',
        'The simulation shows a 52-base-pair template. The purple triangle is the helicase at the fork, moving left to right; the base-pair rungs disappear as the strands separate. Along the top template the new leading strand (pale blocks) is laid down continuously. Along the bottom template the new lagging strand is laid down in fragments of six bases, the current one highlighted in yellow and the finished ones in pale colours, with orange ticks at the joins where ligase must act. The counter reports how many base pairs have been copied and how many fragments exist. "Speed" sets bases per second, "Step +1" copies one base, and "Reset" closes the helix again.',
        'The sim compresses a lot. Real Okazaki fragments are about 1,000 to 2,000 nucleotides in bacteria and 100 to 200 in eukaryotes, not six, and real polymerases run at roughly 1,000 nucleotides per second in E. coli and about 50 in human cells. The RNA primers, primase, single-strand binding proteins and the topoisomerase that relieves twisting are not drawn. For simplicity the fragments are filled in from left to right as the fork passes, whereas a real Okazaki fragment is synthesized away from the fork, from its primer back toward the previous fragment. Finally, real replication starts at origins in the middle of the DNA and proceeds in both directions with two forks, and in eukaryotes thousands of origins work at once.',
      ],
      id: [
        'Sebelum membelah, sel harus menyalin DNA-nya agar setiap sel anak menerima genom yang lengkap. Untai ganda memungkinkan ini karena kedua untainya saling komplementer: A selalu berpasangan dengan T dan G dengan C, sehingga tiap untai membawa informasi untuk membangun kembali pasangannya. Replikasi bersifat semikonservatif: setiap untai ganda baru mempertahankan satu untai asli (induk) dan mendapat satu untai yang baru dibuat. Meselson dan Stahl membuktikannya pada 1958 dengan menandai DNA bakteri memakai nitrogen berat dan mengikuti massa jenisnya dari generasi ke generasi.',
        'Sebuah tim enzim mengerjakannya. Helikase membuka pilinan heliks dan memutus ikatan hidrogen antarbasa, membentuk garpu replikasi berbentuk Y. DNA polimerase lalu menambahkan nukleotida satu per satu sesuai basa cetakan, tetapi ia punya dua batasan tegas: ia hanya bisa memperpanjang untai yang sudah ada, tidak bisa memulainya, dan hanya bisa menambah pada ujung 3\', sehingga setiap untai baru tumbuh ke arah 5\' ke 3\'. Primase mengatasi batasan pertama dengan meletakkan primer RNA pendek yang kemudian diperpanjang polimerase. Karena kedua untai induk berjalan berlawanan arah (antiparalel), batasan kedua membagi pekerjaan menjadi dua. Pada satu cetakan untai baru dapat tumbuh terus-menerus menuju garpu: untai pemimpin. Pada cetakan yang lain untai baru harus tumbuh menjauhi garpu, sehingga dibuat dalam potongan pendek yang disebut fragmen Okazaki, masing-masing dimulai dari primernya sendiri. Kemudian primer diganti dengan DNA dan ligase menyambung celah antarfragmen.',
        'Simulasi menampilkan cetakan sepanjang 52 pasangan basa. Segitiga ungu adalah helikase di garpu, bergerak dari kiri ke kanan; anak tangga pasangan basa menghilang saat untai terpisah. Sepanjang cetakan atas, untai pemimpin baru (balok pucat) diletakkan terus-menerus. Sepanjang cetakan bawah, untai tertinggal baru diletakkan dalam fragmen enam basa, yang sedang dibuat disorot kuning dan yang sudah selesai berwarna pucat, dengan tanda oranye pada sambungan tempat ligase harus bekerja. Penghitung melaporkan berapa pasangan basa yang sudah disalin dan berapa fragmen yang ada. "Speed" mengatur basa per detik, "Step +1" menyalin satu basa, dan "Reset" menutup kembali heliks.',
        'Simulasi ini memadatkan banyak hal. Fragmen Okazaki sungguhan panjangnya sekitar 1.000 sampai 2.000 nukleotida pada bakteri dan 100 sampai 200 pada eukariota, bukan enam, dan polimerase sungguhan bekerja kira-kira 1.000 nukleotida per detik pada E. coli dan sekitar 50 pada sel manusia. Primer RNA, primase, protein pengikat untai tunggal, dan topoisomerase yang melepaskan puntiran tidak digambar. Demi kesederhanaan, fragmen diisi dari kiri ke kanan mengikuti garpu, padahal fragmen Okazaki sungguhan disintesis menjauhi garpu, dari primernya kembali ke arah fragmen sebelumnya. Terakhir, replikasi sungguhan dimulai dari titik awal (origin) di tengah DNA dan berjalan ke dua arah dengan dua garpu, dan pada eukariota ribuan origin bekerja serentak.',
      ],
    },
    figure: {
      caption: {
        en: 'A replication fork moving to the right. The leading strand (green) grows continuously toward the fork. The lagging strand is built in Okazaki fragments (orange), each started by an RNA primer (purple) and growing away from the fork; ligase later seals the joins.',
        id: 'Garpu replikasi yang bergerak ke kanan. Untai pemimpin (hijau) tumbuh terus-menerus menuju garpu. Untai tertinggal dibangun dalam fragmen Okazaki (oranye), masing-masing dimulai oleh primer RNA (ungu) dan tumbuh menjauhi garpu; ligase kemudian menyambung sambungannya.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Replication fork with leading and lagging strands', 'Garpu replikasi dengan untai pemimpin dan tertinggal')}">
  <style>text{font:12px system-ui,sans-serif;fill:currentColor}.m{fill:none;stroke:currentColor;stroke-width:1.2;opacity:.45}.t{fill:none;stroke:currentColor;stroke-width:2.4}.n{fill:none;stroke-width:3.2;stroke-linecap:round}.s{font-size:10px;opacity:.75}</style>
  <path d="M20 70 L200 70 C230 70 240 105 262 112" class="t"/>
  <path d="M20 170 L200 170 C230 170 240 135 262 128" class="t"/>
  <line x1="262" y1="112" x2="345" y2="112" class="t"/>
  <line x1="262" y1="128" x2="345" y2="128" class="t"/>
  <g class="m">
    <line x1="275" y1="112" x2="275" y2="128"/><line x1="290" y1="112" x2="290" y2="128"/><line x1="305" y1="112" x2="305" y2="128"/><line x1="320" y1="112" x2="320" y2="128"/><line x1="335" y1="112" x2="335" y2="128"/>
  </g>
  <text x="284" y="100" class="s">${L('parental DNA', 'DNA induk')}</text>
  <text x="14" y="60" class="s">3'</text><text x="14" y="184" class="s">5'</text>
  <text x="200" y="60" class="s">${L('template', 'cetakan')}</text>
  <path d="M24 82 L196 82" class="n" stroke="#10b981" marker-end="url(#a)"/>
  <text x="26" y="96" class="s">5'</text><text x="60" y="96" fill="#10b981" class="s">${L('leading: continuous 5′→3′ toward fork', 'pemimpin: menerus 5′→3′ menuju garpu')}</text>
  <path d="M74 158 L30 158" class="n" stroke="#f59e0b" marker-end="url(#a)"/>
  <rect x="74" y="153" width="8" height="10" fill="#8b5cf6"/>
  <path d="M158 158 L94 158" class="n" stroke="#f59e0b" marker-end="url(#a)"/>
  <rect x="158" y="153" width="8" height="10" fill="#8b5cf6"/>
  <path d="M222 158 L178 158" class="n" stroke="#f59e0b" marker-end="url(#a)"/>
  <rect x="222" y="153" width="8" height="10" fill="#8b5cf6"/>
  <path d="M86 150 L88 158 L86 166" class="m" stroke="#ef4444" stroke-opacity="1" stroke-width="1.6"/>
  <text x="48" y="142" fill="#ef4444" class="s">${L('ligase seals gap', 'ligase menyambung')}</text>
  <text x="200" y="146" fill="#8b5cf6" class="s">${L('RNA primer', 'primer RNA')}</text>
  <text x="26" y="206" fill="#f59e0b" class="s">${L('lagging strand: Okazaki fragments, each 5′→3′ away from fork', 'untai tertinggal: fragmen Okazaki, tiap 5′→3′ menjauhi garpu')}</text>
  <circle cx="262" cy="120" r="11" fill="#3b82f6"/>
  <text x="236" y="222" fill="#3b82f6" class="s">${L('helicase unwinds', 'helikase membuka')}</text>
  <line x1="262" y1="131" x2="262" y2="212" class="m" stroke="#3b82f6" stroke-opacity="1" stroke-dasharray="3 3"/>
  <line x1="280" y1="40" x2="330" y2="40" class="m" stroke-opacity="1" marker-end="url(#a)"/>
  <text x="248" y="30" class="s">${L('fork moves this way', 'garpu bergerak ke sini')}</text>
  <text x="26" y="30" class="s">${L('each new helix = 1 old strand + 1 new strand', 'tiap heliks baru = 1 untai lama + 1 untai baru')}</text>
  <defs><marker id="a" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="context-stroke"/></marker></defs>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Replication is semiconservative: every new double helix contains one parental strand and one new strand.',
        'DNA polymerase can only add nucleotides to a 3\' end, so every new strand grows 5\' to 3\'.',
        'Because the parental strands are antiparallel, one new strand (leading) is made continuously and the other (lagging) in Okazaki fragments.',
        'Polymerase cannot start a strand, so primase lays an RNA primer first; the lagging strand needs a new primer for every fragment.',
        'Ligase joins the fragments, and proofreading plus repair bring the error rate down to roughly one mistake per billion base pairs.',
      ],
      id: [
        'Replikasi bersifat semikonservatif: setiap untai ganda baru mengandung satu untai induk dan satu untai baru.',
        'DNA polimerase hanya bisa menambahkan nukleotida pada ujung 3\', sehingga setiap untai baru tumbuh dari 5\' ke 3\'.',
        'Karena untai induk antiparalel, satu untai baru (pemimpin) dibuat terus-menerus dan yang lain (tertinggal) dalam fragmen Okazaki.',
        'Polimerase tidak bisa memulai untai, sehingga primase meletakkan primer RNA dahulu; untai tertinggal memerlukan primer baru untuk setiap fragmen.',
        'Ligase menyambung fragmen-fragmen itu, dan koreksi (proofreading) serta perbaikan menurunkan laju kesalahan hingga kira-kira satu kesalahan per miliar pasangan basa.',
      ],
    },
    vocabulary: {
      en: [
        ['Replication fork', 'The Y-shaped region where the double helix is being unwound and both new strands are being made.'],
        ['Helicase', 'The enzyme that unwinds the double helix by breaking the hydrogen bonds between base pairs.'],
        ['Primase', 'The enzyme that makes a short RNA primer, giving DNA polymerase a 3\' end to extend.'],
        ['DNA polymerase', 'The enzyme that adds complementary nucleotides to the 3\' end of a growing strand and proofreads its work.'],
        ['Leading strand', 'The new strand synthesized continuously in the same direction as the fork moves.'],
        ['Lagging strand', 'The new strand synthesized discontinuously, away from the fork, in Okazaki fragments.'],
        ['Okazaki fragment', 'A short stretch of new DNA on the lagging strand, later joined to its neighbours.'],
        ['Ligase', 'The enzyme that seals the sugar-phosphate backbone between adjacent fragments.'],
      ],
      id: [
        ['Garpu replikasi', 'Daerah berbentuk Y tempat untai ganda sedang dibuka dan kedua untai baru sedang dibuat.'],
        ['Helikase', 'Enzim yang membuka pilinan untai ganda dengan memutus ikatan hidrogen antarpasangan basa.'],
        ['Primase', 'Enzim yang membuat primer RNA pendek, memberi DNA polimerase ujung 3\' untuk diperpanjang.'],
        ['DNA polimerase', 'Enzim yang menambahkan nukleotida komplementer pada ujung 3\' untai yang sedang tumbuh dan memeriksa hasil kerjanya.'],
        ['Untai pemimpin (leading)', 'Untai baru yang disintesis terus-menerus searah dengan gerak garpu.'],
        ['Untai tertinggal (lagging)', 'Untai baru yang disintesis terputus-putus, menjauhi garpu, dalam fragmen Okazaki.'],
        ['Fragmen Okazaki', 'Potongan pendek DNA baru pada untai tertinggal, yang kemudian disambung dengan tetangganya.'],
        ['Ligase', 'Enzim yang menyambung tulang punggung gula-fosfat antara fragmen yang berdekatan.'],
      ],
    },
    misconceptions: {
      en: [
        ['DNA polymerase can start building a new strand on its own.', 'It cannot. It only extends a strand that already has a free 3\' end, which is why primase must first lay down an RNA primer on every strand and every Okazaki fragment.'],
        ['Both new strands are built in the same direction as the fork moves.', 'Only the leading strand is. The template strands are antiparallel and polymerase works only 5\' to 3\', so the lagging strand must be built backwards, away from the fork, in fragments.'],
        ['The original double helix stays intact and a completely new helix is made beside it.', 'That is the conservative model, which Meselson and Stahl ruled out. The parental strands separate and each becomes half of a new helix.'],
        ['Replication starts at one end of a chromosome and runs to the other end.', 'It starts at specific origins, often in the middle, and two forks move outward in opposite directions. Eukaryotic chromosomes use many origins at once; otherwise copying a human chromosome at 50 bases per second would take weeks.'],
      ],
      id: [
        ['DNA polimerase bisa mulai membangun untai baru sendiri.', 'Tidak bisa. Ia hanya memperpanjang untai yang sudah punya ujung 3\' bebas, itulah sebabnya primase harus dahulu meletakkan primer RNA pada setiap untai dan setiap fragmen Okazaki.'],
        ['Kedua untai baru dibangun searah dengan gerak garpu.', 'Hanya untai pemimpin yang begitu. Untai cetakan antiparalel dan polimerase hanya bekerja dari 5\' ke 3\', sehingga untai tertinggal harus dibangun mundur, menjauhi garpu, dalam fragmen-fragmen.'],
        ['Untai ganda asli tetap utuh dan heliks yang sepenuhnya baru dibuat di sampingnya.', 'Itu model konservatif, yang disingkirkan oleh Meselson dan Stahl. Untai induk berpisah dan masing-masing menjadi separuh dari heliks baru.'],
        ['Replikasi dimulai dari satu ujung kromosom dan berjalan ke ujung lainnya.', 'Replikasi dimulai dari titik awal (origin) tertentu, sering di tengah, dan dua garpu bergerak keluar ke arah berlawanan. Kromosom eukariota memakai banyak origin sekaligus; jika tidak, menyalin satu kromosom manusia dengan 50 basa per detik akan memakan waktu berminggu-minggu.'],
      ],
    },
    realWorld: {
      en: [
        'PCR, the technique behind DNA fingerprinting and COVID tests, copies DNA in a tube by using heat instead of helicase to separate the strands, a heat-stable polymerase, and synthetic primers.',
        'Chromosome ends (telomeres) shorten with each division because the final Okazaki fragment cannot be completed; telomerase, active in stem cells and most cancer cells, rebuilds them.',
        'Copying errors that escape proofreading become mutations; accumulated mutations in genes that control cell division are the root of cancer.',
        'Several antibiotics, such as ciprofloxacin, work by blocking the bacterial topoisomerase that relieves twisting ahead of the fork, so bacterial DNA cannot be replicated.',
      ],
      id: [
        'PCR, teknik di balik sidik jari DNA dan tes COVID, menyalin DNA dalam tabung dengan memakai panas alih-alih helikase untuk memisahkan untai, polimerase tahan panas, dan primer sintetis.',
        'Ujung kromosom (telomer) memendek pada setiap pembelahan karena fragmen Okazaki terakhir tidak bisa diselesaikan; telomerase, yang aktif pada sel punca dan kebanyakan sel kanker, membangunnya kembali.',
        'Kesalahan penyalinan yang lolos dari koreksi menjadi mutasi; tumpukan mutasi pada gen pengendali pembelahan sel adalah akar kanker.',
        'Beberapa antibiotik, seperti siprofloksasin, bekerja dengan memblokir topoisomerase bakteri yang melepaskan puntiran di depan garpu, sehingga DNA bakteri tidak bisa direplikasi.',
      ],
    },
    questions: {
      en: [
        { q: 'The sim\'s template is 52 base pairs long and Okazaki fragments are 6 bases each. How many complete fragments are made, how long is the last piece, and how many joins must ligase seal?', a: '52 ÷ 6 = 8 complete fragments with 4 bases left over as a final short piece. That gives 9 pieces and therefore 8 joins for ligase (one between each neighbouring pair). The leading strand, by contrast, needs no joins at all.' },
        { q: 'Why can\'t a cell simply make both new strands continuously, like the leading strand?', a: 'Because polymerase can only add to a 3\' end and the two template strands run in opposite directions. Along one template, growing 5\' to 3\' means following the fork; along the other it means moving away from the fork, so that strand can only be extended in short bursts as new template is exposed.' },
        { q: 'In the Meselson-Stahl experiment, bacteria grown with heavy nitrogen were switched to light nitrogen. After one round of replication all DNA had intermediate density; after two rounds half was intermediate and half light. Why does this rule out the conservative model?', a: 'A conservative model would keep the original heavy helix intact and build an all-light helix, so after one round there would be a heavy band and a light band, not a single intermediate band. Intermediate density means every helix had one heavy (old) strand and one light (new) strand, which is semiconservative replication.' },
      ],
      id: [
        { q: 'Cetakan di simulasi panjangnya 52 pasangan basa dan tiap fragmen Okazaki 6 basa. Berapa fragmen lengkap yang dibuat, berapa panjang potongan terakhir, dan berapa sambungan yang harus dirapatkan ligase?', a: '52 ÷ 6 = 8 fragmen lengkap dengan sisa 4 basa sebagai potongan pendek terakhir. Jadi ada 9 potongan dan karena itu 8 sambungan untuk ligase (satu di antara tiap pasangan tetangga). Sebaliknya, untai pemimpin sama sekali tidak memerlukan sambungan.' },
        { q: 'Mengapa sel tidak bisa membuat kedua untai baru secara terus-menerus seperti untai pemimpin?', a: 'Karena polimerase hanya bisa menambah pada ujung 3\' dan kedua untai cetakan berjalan berlawanan arah. Pada satu cetakan, tumbuh dari 5\' ke 3\' berarti mengikuti garpu; pada cetakan lain berarti menjauhi garpu, sehingga untai itu hanya bisa diperpanjang sedikit demi sedikit setiap kali cetakan baru tersingkap.' },
        { q: 'Dalam percobaan Meselson-Stahl, bakteri yang ditumbuhkan dengan nitrogen berat dipindahkan ke nitrogen ringan. Setelah satu putaran replikasi semua DNA bermassa jenis menengah; setelah dua putaran separuh menengah dan separuh ringan. Mengapa ini menyingkirkan model konservatif?', a: 'Model konservatif akan mempertahankan heliks berat asli tetap utuh dan membangun heliks yang seluruhnya ringan, sehingga setelah satu putaran akan ada pita berat dan pita ringan, bukan satu pita menengah. Massa jenis menengah berarti setiap heliks memiliki satu untai berat (lama) dan satu untai ringan (baru), yaitu replikasi semikonservatif.' },
      ],
    },
  },
};
