// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Tell the coding strand from the template strand, and match template bases to their RNA complements (A→U, T→A, C→G, G→C).',
      'Read the codon table to translate mRNA into amino acids.',
      'Identify start (AUG) and stop codons in a sequence.',
    ],
    id: [
      'Membedakan untai pengode dari untai cetakan, dan memasangkan basa cetakan dengan komplemen RNA-nya (A→U, T→A, C→G, G→C).',
      'Membaca tabel kodon untuk menerjemahkan mRNA menjadi asam amino.',
      'Mengenali kodon mulai (AUG) dan kodon henti pada urutan.',
    ],
  },
  tryThis: {
    en: [
      'Insert a single base into the middle — what happens to all downstream codons?',
      'Find a stop codon — what amino acids does it correspond to?',
      'Edit the first ATG into ATC — does translation still start? Where does it start in the insulin example, which has a second ATG?',
    ],
    id: [
      'Sisipkan satu basa di tengah — apa yang terjadi pada kodon-kodon setelahnya?',
      'Cari kodon henti — asam amino apa yang terkait?',
      'Ubah ATG pertama menjadi ATC — apakah translasi tetap dimulai? Di mana translasi dimulai pada contoh insulin, yang punya ATG kedua?',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'A gene is a stretch of DNA that spells out a protein, but DNA never leaves the nucleus and ribosomes cannot read it directly. The cell therefore works in two steps. In transcription, the enzyme RNA polymerase moves along one strand of the gene, the template strand, and builds a messenger RNA (mRNA) copy by pairing each template base with its complement: A pairs with U (RNA uses uracil instead of thymine), T with A, G with C and C with G. In translation, a ribosome reads the mRNA three bases at a time; each triplet, or codon, specifies one amino acid, and the amino acids are linked in order into a polypeptide chain, which folds into a protein.',
        'The genetic code has 64 codons for 20 amino acids plus three stop signals (UAA, UAG, UGA), so most amino acids are encoded by more than one codon; the code is said to be degenerate. AUG codes for methionine and also serves as the start codon, so nearly every new protein begins with Met. Because the ribosome reads non-overlapping triplets, the reading frame matters enormously: inserting or deleting one base shifts every codon downstream, usually scrambling the rest of the protein and producing an early stop. Changing one base within a codon (a point mutation) alters at most one amino acid, and because of degeneracy may change nothing at all.',
        'In the sim you type the coding (sense) strand of a gene, written 5\' to 3\'. The program shows the template strand beneath it as the complement (read 3\' to 5\'); RNA polymerase, the amber cursor, pairs each template base with its RNA complement, left to right, as fast as the Bases per second slider allows, so the mRNA that appears has the same sequence as the coding strand with U in place of T. The ribosome then scans the mRNA for the first AUG, reads codons in frame from there, and looks each one up in the built-in codon table until a stop codon ends the chain. Use Step, the scrub slider, or click any base to park the polymerase at a chosen position and watch how a partial codon is not yet translated.',
        'Several things are simplified. Real transcription begins only at a promoter and runs past the stop codon into untranslated regions, whereas the sim transcribes exactly the bases you type. The sim does follow the real direction: the template is read 3\' to 5\' so that the mRNA grows 5\' to 3\', and the mRNA ends up matching the coding strand (with U for T), which is why the coding strand, not the template, is the one that reads ATG at the start. In eukaryotic cells the mRNA is also capped, tailed and spliced to remove introns before it leaves the nucleus, and translation needs transfer RNAs to carry each amino acid in. None of that machinery is shown, so the sim is a map of the information flow rather than of the molecules.',
      ],
      id: [
        'Gen adalah ruas DNA yang mengeja suatu protein, tetapi DNA tidak pernah meninggalkan nukleus dan ribosom tidak dapat membacanya secara langsung. Karena itu sel bekerja dalam dua tahap. Pada transkripsi, enzim RNA polimerase bergerak sepanjang satu untai gen, yaitu untai cetakan, dan membangun salinan RNA duta (mRNA) dengan memasangkan tiap basa cetakan dengan komplemennya: A berpasangan dengan U (RNA memakai urasil, bukan timin), T dengan A, G dengan C, dan C dengan G. Pada translasi, ribosom membaca mRNA tiga basa sekaligus; setiap triplet, atau kodon, menentukan satu asam amino, dan asam-asam amino itu dirangkai berurutan menjadi rantai polipeptida, yang melipat menjadi protein.',
        'Kode genetik memiliki 64 kodon untuk 20 asam amino plus tiga sinyal henti (UAA, UAG, UGA), sehingga kebanyakan asam amino dikodekan oleh lebih dari satu kodon; kode ini disebut degeneratif. AUG mengodekan metionin dan sekaligus berperan sebagai kodon mulai, sehingga hampir setiap protein baru diawali Met. Karena ribosom membaca triplet yang tidak saling tumpang-tindih, bingkai baca sangat menentukan: menyisipkan atau menghapus satu basa menggeser semua kodon di hilirnya, biasanya mengacaukan sisa protein dan memunculkan kodon henti lebih awal. Mengubah satu basa dalam satu kodon (mutasi titik) paling banyak mengubah satu asam amino, dan karena degenerasi mungkin tidak mengubah apa pun.',
        'Di simulasi kamu mengetik untai pengode (sense) suatu gen, ditulis 5\' ke 3\'. Program menampilkan untai cetakan di bawahnya sebagai komplemennya (dibaca 3\' ke 5\'); RNA polimerase, kursor kuning, memasangkan tiap basa cetakan dengan komplemen RNA-nya, dari kiri ke kanan, secepat yang diizinkan slider Bases per second, sehingga mRNA yang muncul berurutan sama dengan untai pengode dengan U menggantikan T. Ribosom kemudian memindai mRNA mencari AUG pertama, membaca kodon dalam bingkai dari titik itu, dan mencari setiap kodon dalam tabel kodon bawaan sampai kodon henti mengakhiri rantai. Gunakan Step, slider penggeser, atau klik basa mana pun untuk memarkir polimerase di posisi tertentu dan perhatikan bahwa kodon yang belum lengkap belum ditranslasi.',
        'Beberapa hal disederhanakan. Transkripsi sungguhan hanya dimulai pada promotor dan berlanjut melewati kodon henti ke daerah yang tidak ditranslasi, sedangkan simulasi mentranskripsi tepat basa-basa yang kamu ketik. Simulasi mengikuti arah yang sebenarnya: untai cetakan dibaca 3\' ke 5\' sehingga mRNA tumbuh 5\' ke 3\', dan mRNA akhirnya berurutan sama dengan untai pengode (dengan U menggantikan T); itulah sebabnya untai pengode, bukan untai cetakan, yang berbunyi ATG di awal. Pada sel eukariot mRNA juga diberi tudung, ekor, dan disambung untuk membuang intron sebelum keluar dari nukleus, dan translasi membutuhkan RNA transfer untuk membawa tiap asam amino. Semua perangkat itu tidak ditampilkan, jadi simulasi ini peta aliran informasi, bukan gambaran molekulnya.',
      ],
    },
    figure: {
      caption: {
        en: 'Information flows from DNA to protein. RNA polymerase pairs each template base with its RNA complement (A→U, T→A, G→C, C→G); the ribosome then reads the mRNA in non-overlapping triplets. Here the coding strand ATG GCC TAA has the template TAC CGG ATT, which gives the mRNA AUG GCC UAA: start/Met, Ala, stop.',
        id: 'Informasi mengalir dari DNA ke protein. RNA polimerase memasangkan tiap basa cetakan dengan komplemen RNA-nya (A→U, T→A, G→C, C→G); ribosom kemudian membaca mRNA dalam triplet yang tidak tumpang-tindih. Di sini untai pengode ATG GCC TAA memiliki cetakan TAC CGG ATT, yang menghasilkan mRNA AUG GCC UAA: mulai/Met, Ala, henti.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        const col = { A: '#ef4444', T: '#3b82f6', G: '#10b981', C: '#f59e0b', U: '#8b5cf6' };
        const row = (seq, y) => [...seq].map((b, i) => `<rect x="${66 + i * 26}" y="${y}" width="22" height="22" rx="4" fill="${col[b]}" opacity=".85"/><text x="${77 + i * 26}" y="${y + 16}" text-anchor="middle" fill="#fff" font-weight="700">${b}</text>`).join('');
        return `
<svg viewBox="0 0 360 270" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Transcription of a DNA gene to mRNA and translation to amino acids', 'Transkripsi gen DNA menjadi mRNA dan translasi menjadi asam amino')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.s{font-size:10px}.m{fill:none;stroke:currentColor;stroke-width:1.4}</style>
  <text x="8" y="14" class="s" font-weight="700">DNA</text>
  <text x="8" y="26" class="s">${L('coding 5\'→3\'', 'pengode 5\'→3\'')}</text>
  ${row('ATGGCCTAA', 6)}
  <text x="8" y="56" class="s">${L('template 3\'→5\'', 'cetakan 3\'→5\'')}</text>
  ${row('TACCGGATT', 44)}
  <rect x="140" y="40" width="30" height="30" rx="6" fill="none" stroke="#f59e0b" stroke-width="2.5"/>
  <text x="176" y="82" fill="#f59e0b" class="s">RNA ${L('polymerase reads the template', 'polimerase membaca cetakan')} →</text>
  <path d="M77 72 L77 98 M181 72 L181 98 M285 72 L285 98" class="m" stroke-dasharray="3 3" opacity=".6"/>
  <text x="300" y="102" class="s">A→U  T→A</text>
  <text x="300" y="114" class="s">G→C  C→G</text>
  <text x="8" y="114" class="s" font-weight="700">mRNA</text>
  ${row('AUGGCCUAA', 104)}
  <path d="M66 134 h74 M144 134 h74 M222 134 h74" stroke="currentColor" stroke-width="2"/>
  <text x="90" y="148" class="s">${L('codon 1', 'kodon 1')}</text>
  <text x="168" y="148" class="s">${L('codon 2', 'kodon 2')}</text>
  <text x="246" y="148" class="s">${L('codon 3', 'kodon 3')}</text>
  <path d="M103 152 L103 170 M181 152 L181 170 M259 152 L259 170" class="m" marker-end="url(#a)"/>
  <text x="8" y="188" class="s" font-weight="700">${L('protein', 'protein')}</text>
  <rect x="72" y="174" width="62" height="24" rx="12" fill="#8b5cf6" opacity=".85"/><text x="103" y="191" text-anchor="middle" fill="#fff" font-weight="700">Met</text>
  <rect x="150" y="174" width="62" height="24" rx="12" fill="#8b5cf6" opacity=".85"/><text x="181" y="191" text-anchor="middle" fill="#fff" font-weight="700">Ala</text>
  <rect x="228" y="174" width="62" height="24" rx="12" fill="none" stroke="#ef4444" stroke-width="2"/><text x="259" y="191" text-anchor="middle" fill="#ef4444" font-weight="700">STOP</text>
  <line x1="134" y1="186" x2="150" y2="186" stroke="#8b5cf6" stroke-width="3"/>
  <text x="66" y="214" class="s">AUG = ${L('start codon and Met', 'kodon mulai dan Met')}</text>
  <text x="206" y="214" class="s">UAA = ${L('stop: chain released', 'henti: rantai dilepas')}</text>
  <text x="66" y="232" class="s">${L('mRNA = coding strand with U for T; ribosome reads 3 bases at a time from the first AUG', 'mRNA = untai pengode dengan U menggantikan T; ribosom membaca 3 basa sekaligus dari AUG pertama')}</text>
  <text x="66" y="246" class="s">${L('shifting the frame by 1 base changes every codon after it', 'menggeser bingkai 1 basa mengubah semua kodon berikutnya')}</text>
  <text x="66" y="260" class="s">${L('transcription: nucleus · translation: ribosome in the cytoplasm', 'transkripsi: nukleus · translasi: ribosom di sitoplasma')}</text>
  <defs><marker id="a" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="context-stroke"/></marker></defs>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Transcription copies a gene\'s template strand into mRNA by complementary base pairing, with U in place of T.',
        'Translation reads the mRNA in codons of three bases; each codon specifies one amino acid or a stop.',
        'AUG is the start codon (methionine); UAA, UAG and UGA are stop codons that end the chain.',
        'The code is degenerate: 64 codons encode 20 amino acids, so many base changes are silent.',
        'Inserting or deleting a base shifts the reading frame and changes every codon downstream.',
      ],
      id: [
        'Transkripsi menyalin untai cetakan gen menjadi mRNA melalui pemasangan basa komplementer, dengan U menggantikan T.',
        'Translasi membaca mRNA dalam kodon berisi tiga basa; setiap kodon menentukan satu asam amino atau sinyal henti.',
        'AUG adalah kodon mulai (metionin); UAA, UAG, dan UGA adalah kodon henti yang mengakhiri rantai.',
        'Kode bersifat degeneratif: 64 kodon mengodekan 20 asam amino, sehingga banyak perubahan basa bersifat diam.',
        'Menyisipkan atau menghapus satu basa menggeser bingkai baca dan mengubah semua kodon di hilirnya.',
      ],
    },
    vocabulary: {
      en: [
        ['Template strand', 'The DNA strand that RNA polymerase reads; the mRNA is its complement.'],
        ['Coding strand', 'The other DNA strand, whose sequence matches the mRNA except that T replaces U.'],
        ['mRNA (messenger RNA)', 'The single-stranded RNA copy of a gene that carries the instructions to the ribosome.'],
        ['Codon', 'A group of three mRNA bases that specifies one amino acid or a stop signal.'],
        ['Reading frame', 'The way a sequence is divided into consecutive triplets, fixed by where translation starts.'],
        ['Frameshift mutation', 'An insertion or deletion of bases (not a multiple of three) that shifts the reading frame.'],
        ['Point mutation', 'A change of a single base; it may be silent, change one amino acid (missense) or create a stop (nonsense).'],
        ['Polypeptide', 'A chain of amino acids joined by peptide bonds; one or more polypeptides fold into a protein.'],
      ],
      id: [
        ['Untai cetakan', 'Untai DNA yang dibaca RNA polimerase; mRNA adalah komplemennya.'],
        ['Untai pengode', 'Untai DNA yang lain, yang urutannya sama dengan mRNA kecuali T menggantikan U.'],
        ['mRNA (RNA duta)', 'Salinan RNA untai tunggal dari suatu gen yang membawa instruksi ke ribosom.'],
        ['Kodon', 'Kelompok tiga basa mRNA yang menentukan satu asam amino atau sinyal henti.'],
        ['Bingkai baca', 'Cara urutan dibagi menjadi triplet-triplet berurutan, yang ditentukan oleh titik awal translasi.'],
        ['Mutasi pergeseran bingkai', 'Penyisipan atau penghapusan basa (bukan kelipatan tiga) yang menggeser bingkai baca.'],
        ['Mutasi titik', 'Perubahan satu basa; bisa diam, mengubah satu asam amino (missense), atau menciptakan kodon henti (nonsense).'],
        ['Polipeptida', 'Rantai asam amino yang disambung ikatan peptida; satu atau lebih polipeptida melipat menjadi protein.'],
      ],
    },
    misconceptions: {
      en: [
        ['The mRNA is an identical copy of the DNA.', 'It is the complement of the template strand, built by base pairing, and it uses U instead of T. Only when compared with the coding strand does it look like a copy.'],
        ['Each base codes for one amino acid.', 'It takes three bases to specify one amino acid. With only four bases, single bases could code for just four amino acids and pairs for sixteen; triplets give 64, enough for 20 amino acids plus stops.'],
        ['Any mutation changes the protein.', 'Many do not. Because several codons share one amino acid, a change in the third base of a codon is often silent, as GCC to GCA (both alanine) shows.'],
        ['Stop codons code for a special "stop" amino acid.', 'They code for no amino acid at all. When the ribosome reaches one, no tRNA matches it and release factors free the finished chain.'],
      ],
      id: [
        ['mRNA adalah salinan identik dari DNA.', 'mRNA adalah komplemen untai cetakan, dibangun lewat pemasangan basa, dan memakai U sebagai pengganti T. Hanya jika dibandingkan dengan untai pengode ia tampak seperti salinan.'],
        ['Setiap basa mengodekan satu asam amino.', 'Dibutuhkan tiga basa untuk menentukan satu asam amino. Dengan hanya empat basa, basa tunggal hanya bisa mengodekan empat asam amino dan pasangan basa enam belas; triplet memberi 64, cukup untuk 20 asam amino plus sinyal henti.'],
        ['Setiap mutasi mengubah protein.', 'Banyak yang tidak. Karena beberapa kodon berbagi satu asam amino, perubahan pada basa ketiga suatu kodon sering kali diam, seperti GCC menjadi GCA (keduanya alanin).'],
        ['Kodon henti mengodekan asam amino "henti" yang khusus.', 'Kodon henti tidak mengodekan asam amino apa pun. Ketika ribosom mencapainya, tidak ada tRNA yang cocok dan faktor pelepas membebaskan rantai yang sudah jadi.'],
      ],
    },
    realWorld: {
      en: [
        'Sickle-cell disease is caused by a single point mutation in the haemoglobin gene that changes one codon from GAG (glutamate) to GTG (valine) in the DNA.',
        'mRNA vaccines work by handing cells a ready-made mRNA so that ribosomes translate a viral protein the immune system can learn to recognise.',
        'Many antibiotics, such as tetracycline and erythromycin, kill bacteria by jamming their ribosomes, which differ enough from ours to be targeted safely.',
        'Insulin for diabetes is made by inserting the human insulin gene into bacteria or yeast, whose cells transcribe and translate it using the same genetic code.',
      ],
      id: [
        'Penyakit sel sabit disebabkan oleh satu mutasi titik pada gen hemoglobin yang mengubah satu kodon dari GAG (glutamat) menjadi GTG (valin) pada DNA.',
        'Vaksin mRNA bekerja dengan memberikan mRNA siap pakai kepada sel sehingga ribosom mentranslasi protein virus yang dapat dipelajari dan dikenali sistem imun.',
        'Banyak antibiotik, seperti tetrasiklin dan eritromisin, membunuh bakteri dengan mengganjal ribosomnya, yang cukup berbeda dari ribosom kita sehingga aman dijadikan sasaran.',
        'Insulin untuk diabetes dibuat dengan menyisipkan gen insulin manusia ke dalam bakteri atau ragi, yang selnya mentranskripsi dan mentranslasinya memakai kode genetik yang sama.',
      ],
    },
    questions: {
      en: [
        { q: 'A coding strand reads ATG TTT CCG TAG. What is the template strand, what is the mRNA, and what polypeptide does the sim produce?', a: 'The template is the complement, TAC AAA GGC ATC (read 3\' to 5\'). RNA polymerase pairs each template base with its RNA complement (T→A, A→U, C→G, G→C), giving AUG UUU CCG UAG, which is the coding strand with U for T. Translation gives Met, Phe, Pro, then UAG is a stop codon, so the chain is Met-Phe-Pro.' },
        { q: 'In the strand above, one extra G is typed after the first codon, giving ATG GTT TCC GTA G. What happens to the protein?', a: 'The reading frame shifts. The mRNA becomes AUG GUU UCC GUA G..., translating to Met-Val-Ser-Val with an incomplete final codon and no stop: every amino acid after the first is different. This is a frameshift mutation.' },
        { q: 'A point mutation changes the mRNA codon GCC to GCU. Does the protein change? What if GCC changed to UCC?', a: 'GCC and GCU both code for alanine, so the first change is silent. UCC codes for serine, so the second change swaps one amino acid, a missense mutation.' },
      ],
      id: [
        { q: 'Sebuah untai pengode berbunyi ATG TTT CCG TAG. Apa untai cetakannya, apa mRNA-nya, dan polipeptida apa yang dihasilkan simulasi?', a: 'Untai cetakan adalah komplemennya, TAC AAA GGC ATC (dibaca 3\' ke 5\'). RNA polimerase memasangkan tiap basa cetakan dengan komplemen RNA-nya (T→A, A→U, C→G, G→C), menghasilkan AUG UUU CCG UAG, yaitu untai pengode dengan U menggantikan T. Translasi memberi Met, Phe, Pro, lalu UAG adalah kodon henti, sehingga rantainya Met-Phe-Pro.' },
        { q: 'Pada untai di atas, satu G tambahan diketik setelah kodon pertama, menjadi ATG GTT TCC GTA G. Apa yang terjadi pada proteinnya?', a: 'Bingkai bacanya bergeser. mRNA menjadi AUG GUU UCC GUA G..., yang ditranslasi menjadi Met-Val-Ser-Val dengan kodon terakhir tidak lengkap dan tanpa kodon henti: setiap asam amino setelah yang pertama berubah. Inilah mutasi pergeseran bingkai.' },
        { q: 'Mutasi titik mengubah kodon mRNA GCC menjadi GCU. Apakah proteinnya berubah? Bagaimana jika GCC berubah menjadi UCC?', a: 'GCC dan GCU sama-sama mengodekan alanin, jadi perubahan pertama bersifat diam. UCC mengodekan serin, jadi perubahan kedua menukar satu asam amino, suatu mutasi missense.' },
      ],
    },
  },
};
