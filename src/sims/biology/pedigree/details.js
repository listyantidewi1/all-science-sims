// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Read standard pedigree symbols (squares, circles, filled).',
      'Distinguish dominant from recessive patterns by skipped generations.',
      'Recognize X-linked inheritance: more males affected, no male-to-male.',
    ],
    id: [
      'Membaca simbol pedigri standar (kotak, lingkaran, terisi).',
      'Membedakan pola dominan dan resesif dari generasi yang terlewat.',
      'Mengenali pewarisan X-linked: lebih banyak pria terkena, tidak ada penurunan ayah-ke-anak laki-laki.',
    ],
  },
  tryThis: {
    en: [
      'Mark grandfather and one grandson — try X-linked recessive.',
      'Mark every generation — autosomal dominant?',
      'Skip a generation — must be recessive (carriers in middle).',
    ],
    id: [
      'Tandai kakek dan satu cucu laki-laki — coba X-linked resesif.',
      'Tandai setiap generasi — autosomal dominan?',
      'Lewati satu generasi — pasti resesif (carrier di tengah).',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'A pedigree is a family tree drawn the way geneticists draw it: squares are males, circles are females, a horizontal line joins a couple, and a vertical line drops to their children, who sit in the next row. A filled symbol means the person shows the trait. Because we usually cannot see genotypes directly, pedigree analysis works backwards: from who is affected and who is not, we ask which mode of inheritance could have produced that pattern, and just as importantly which modes could not.',
        'Each mode leaves a signature. An autosomal dominant trait appears in every generation and every affected person has an affected parent, because a single copy of the allele is enough to show it; males and females are affected equally. An autosomal recessive trait can skip generations: two unaffected carrier parents can have an affected child, and affected children often appear among siblings. X-linked recessive traits affect mostly males, who have only one X chromosome; the allele passes from carrier mothers to sons, and a father can never pass it to his son because a son gets the Y from his father. An affected daughter would need an affected father and a carrier mother. X-linked dominant traits are rare: an affected father passes the trait to all his daughters and none of his sons.',
        'The simulation shows one fixed three-generation family: two grandparents, their three children, two spouses who married in, and four grandchildren. Click any person to mark them affected or clear them. The panel on the right re-checks four modes with simple rules. For the dominant modes it asks whether every affected person who has parents in the chart also has an affected parent; people who married in count as founders who may have brought the allele with them. For autosomal recessive it only flags a problem when most descendants are affected, since recessive traits are usually sparse. For X-linked recessive it requires at least as many affected males as females, forbids an affected father having an affected son, requires every son of an affected mother to be affected, and requires an affected daughter to have an affected father. For X-linked dominant it additionally requires an affected father to pass the trait to every daughter and to no son (a son of an affected father is affected only if his mother is too). The preset buttons load a textbook pattern for each mode.',
        'These checks are rules of thumb rather than a full genetic analysis, so they can be fooled. They cannot see carriers, so an unaffected person who married in may silently bring the allele, and the autosomal recessive check is only a rough count. Real analysis also allows for new mutations, incomplete penetrance (carrying a dominant allele without showing it), traits that are mitochondrial or Y-linked, and unknown phenotypes. Finally, a small pedigree rarely proves one mode; several usually remain possible, and the honest conclusion is a list of what has been ruled out.',
      ],
      id: [
        'Pedigri adalah pohon keluarga yang digambar dengan cara ahli genetika: kotak untuk laki-laki, lingkaran untuk perempuan, garis mendatar menghubungkan pasangan, dan garis tegak turun ke anak-anak mereka di baris berikutnya. Simbol yang terisi berarti orang itu menampakkan sifat. Karena genotipe biasanya tidak bisa dilihat langsung, analisis pedigri bekerja mundur: dari siapa yang terkena dan siapa yang tidak, kita bertanya pola pewarisan mana yang mungkin menghasilkan pola itu, dan yang sama pentingnya, mana yang tidak mungkin.',
        'Setiap pola pewarisan meninggalkan ciri khas. Sifat autosomal dominan muncul di setiap generasi dan setiap orang yang terkena memiliki orang tua yang terkena, karena satu salinan alel saja cukup untuk menampakkannya; laki-laki dan perempuan terkena dalam jumlah seimbang. Sifat autosomal resesif bisa melompati generasi: dua orang tua pembawa yang tidak terkena bisa memiliki anak yang terkena, dan anak yang terkena sering muncul di antara saudara kandung. Sifat resesif terpaut-X kebanyakan menyerang laki-laki, yang hanya punya satu kromosom X; alel diturunkan dari ibu pembawa ke anak laki-laki, dan ayah tidak pernah bisa menurunkannya ke anak laki-lakinya karena anak laki-laki menerima Y dari ayah. Anak perempuan yang terkena memerlukan ayah yang terkena dan ibu pembawa. Sifat dominan terpaut-X jarang: ayah yang terkena menurunkan sifat ke semua anak perempuannya dan tidak ke satu pun anak laki-lakinya.',
        'Simulasi menampilkan satu keluarga tiga generasi yang tetap: dua kakek-nenek, tiga anak mereka, dua pasangan yang menikah masuk, dan empat cucu. Klik siapa pun untuk menandainya terkena atau menghapus tanda itu. Panel di kanan memeriksa ulang empat pola dengan aturan sederhana. Untuk pola dominan, ia memeriksa apakah setiap orang terkena yang orang tuanya ada di diagram juga memiliki orang tua yang terkena; orang yang menikah masuk dihitung sebagai pendiri yang mungkin membawa alel itu. Untuk autosomal resesif, ia hanya menandai masalah ketika sebagian besar keturunan terkena, karena sifat resesif biasanya jarang. Untuk resesif terpaut-X, ia mensyaratkan jumlah laki-laki terkena setidaknya sama dengan perempuan, melarang ayah terkena memiliki anak laki-laki yang terkena, mensyaratkan semua anak laki-laki dari ibu yang terkena ikut terkena, dan mensyaratkan anak perempuan yang terkena memiliki ayah yang terkena. Untuk dominan terpaut-X, ia juga mensyaratkan ayah yang terkena menurunkan sifat ke semua anak perempuan dan tidak ke anak laki-laki (anak laki-laki dari ayah terkena hanya terkena jika ibunya juga). Tombol praatur memuat pola buku teks untuk tiap pola pewarisan.',
        'Pemeriksaan ini adalah aturan praktis, bukan analisis genetik lengkap, sehingga bisa terkecoh. Pemeriksaan ini tidak bisa melihat pembawa, sehingga orang tak terkena yang menikah masuk mungkin diam-diam membawa alel itu, dan pemeriksaan autosomal resesif hanyalah hitungan kasar. Analisis sungguhan juga memperhitungkan mutasi baru, penetrasi tak lengkap (membawa alel dominan tanpa menampakkannya), sifat mitokondria atau terpaut-Y, dan fenotipe yang tidak diketahui. Terakhir, pedigri kecil jarang membuktikan satu pola; beberapa pola biasanya tetap mungkin, dan kesimpulan yang jujur adalah daftar pola yang sudah tersingkir.',
      ],
    },
    figure: {
      caption: {
        en: 'X-linked recessive pattern. The affected grandfather (filled square) passes his X to his daughter, who is an unaffected carrier (dot); she passes it to a son, who is affected. The allele never travels from a father to his son.',
        id: 'Pola resesif terpaut-X. Kakek yang terkena (kotak terisi) menurunkan X-nya ke anak perempuannya, yang menjadi pembawa tak terkena (titik); ia menurunkannya ke seorang anak laki-laki, yang terkena. Alel ini tidak pernah berpindah dari ayah ke anak laki-lakinya.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Three-generation pedigree of an X-linked recessive trait', 'Pedigri tiga generasi sifat resesif terpaut-X')}">
  <style>text{font:12px system-ui,sans-serif;fill:currentColor}.m{fill:none;stroke:currentColor;stroke-width:1.2;opacity:.45}.p{fill:none;stroke:currentColor;stroke-width:1.6}.s{font-size:10px;opacity:.75}.r{font-size:11px;opacity:.6}</style>
  <text x="6" y="44" class="r">I</text><text x="6" y="124" class="r">II</text><text x="6" y="204" class="r">III</text>
  <line x1="104" y1="40" x2="156" y2="40" class="p"/>
  <line x1="130" y1="40" x2="130" y2="80" class="p"/>
  <line x1="90" y1="80" x2="170" y2="80" class="p"/>
  <line x1="90" y1="80" x2="90" y2="106" class="p"/>
  <line x1="170" y1="80" x2="170" y2="106" class="p"/>
  <line x1="44" y1="120" x2="76" y2="120" class="p"/>
  <line x1="60" y1="120" x2="60" y2="160" class="p"/>
  <line x1="30" y1="160" x2="90" y2="160" class="p"/>
  <line x1="30" y1="160" x2="30" y2="186" class="p"/>
  <line x1="90" y1="160" x2="90" y2="186" class="p"/>
  <rect x="76" y="26" width="28" height="28" fill="#ef4444"/>
  <circle cx="170" cy="40" r="14" class="p"/>
  <rect x="16" y="106" width="28" height="28" class="p"/>
  <circle cx="90" cy="120" r="14" class="p"/><circle cx="90" cy="120" r="4" fill="#ef4444"/>
  <rect x="156" y="106" width="28" height="28" class="p"/>
  <rect x="16" y="186" width="28" height="28" fill="#ef4444"/>
  <circle cx="90" cy="200" r="14" class="p"/>
  <path d="M78 54 C62 76 66 94 80 108" fill="none" stroke="#ef4444" stroke-width="1.6" stroke-dasharray="3 3" marker-end="url(#a)"/>
  <path d="M80 132 C56 150 40 168 34 186" fill="none" stroke="#ef4444" stroke-width="1.6" stroke-dasharray="3 3" marker-end="url(#a)"/>
  <text x="52" y="86" class="s" fill="#ef4444">X</text>
  <text x="38" y="152" class="s" fill="#ef4444">X</text>
  <text x="112" y="18" class="s">${L('affected grandfather', 'kakek terkena')}</text>
  <text x="108" y="124" class="s">${L('carrier', 'pembawa')}</text>
  <text x="140" y="152" class="s">${L('his son receives Y,', 'anaknya menerima Y,')}</text>
  <text x="140" y="164" class="s">${L('never his X', 'bukan X-nya')}</text>
  <text x="10" y="230" class="s">${L('affected grandson', 'cucu laki-laki terkena')}</text>
  <text x="250" y="112" class="s">${L('legend', 'keterangan')}</text>
  <rect x="250" y="122" width="14" height="14" class="p"/><text x="270" y="134" class="s">${L('male', 'laki-laki')}</text>
  <circle cx="257" cy="153" r="7" class="p"/><text x="270" y="157" class="s">${L('female', 'perempuan')}</text>
  <rect x="250" y="168" width="14" height="14" fill="#ef4444"/><text x="270" y="180" class="s">${L('affected', 'terkena')}</text>
  <circle cx="257" cy="199" r="7" class="p"/><circle cx="257" cy="199" r="2.5" fill="#ef4444"/><text x="270" y="203" class="s">${L('carrier', 'pembawa')}</text>
  <defs><marker id="a" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="context-stroke"/></marker></defs>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'A pedigree lets you infer genotypes from phenotypes by applying the rules of Mendelian inheritance across generations.',
        'Autosomal dominant traits do not skip generations: every affected person has an affected parent, unless a new mutation occurred.',
        'Autosomal recessive traits can skip generations because unaffected carriers pass the allele on silently.',
        'X-linked recessive traits affect far more males than females and are never passed from father to son.',
        'A small pedigree usually rules modes out rather than proving one; several modes may remain consistent.',
      ],
      id: [
        'Pedigri memungkinkan kita menyimpulkan genotipe dari fenotipe dengan menerapkan aturan pewarisan Mendel lintas generasi.',
        'Sifat autosomal dominan tidak melompati generasi: setiap orang yang terkena memiliki orang tua yang terkena, kecuali terjadi mutasi baru.',
        'Sifat autosomal resesif bisa melompati generasi karena pembawa yang tidak terkena menurunkan alel secara diam-diam.',
        'Sifat resesif terpaut-X menyerang jauh lebih banyak laki-laki daripada perempuan dan tidak pernah diturunkan dari ayah ke anak laki-laki.',
        'Pedigri kecil biasanya menyingkirkan pola, bukan membuktikan satu pola; beberapa pola bisa tetap konsisten.',
      ],
    },
    vocabulary: {
      en: [
        ['Pedigree', 'A diagram of a family across generations showing sex, relationships and who shows a trait.'],
        ['Autosomal', 'Carried on one of the 22 pairs of non-sex chromosomes, so inheritance is the same for males and females.'],
        ['X-linked', 'Carried on the X chromosome; males have one X, females have two.'],
        ['Carrier', 'A person who has one copy of a recessive allele and does not show the trait but can pass it on.'],
        ['Dominant allele', 'An allele whose effect shows when only one copy is present.'],
        ['Recessive allele', 'An allele whose effect shows only when no dominant allele is present: two copies in females or on autosomes, one copy on the single X of a male.'],
        ['Hemizygous', 'Having only one copy of a gene, as males are for genes on the X chromosome.'],
        ['Consanguinity', 'Marriage between relatives, which raises the chance that both parents carry the same rare recessive allele.'],
      ],
      id: [
        ['Pedigri', 'Diagram sebuah keluarga lintas generasi yang menunjukkan jenis kelamin, hubungan, dan siapa yang menampakkan sifat.'],
        ['Autosomal', 'Terletak pada salah satu dari 22 pasang kromosom bukan-kelamin, sehingga pewarisannya sama untuk laki-laki dan perempuan.'],
        ['Terpaut-X', 'Terletak pada kromosom X; laki-laki memiliki satu X, perempuan memiliki dua.'],
        ['Pembawa (carrier)', 'Orang yang memiliki satu salinan alel resesif, tidak menampakkan sifatnya, tetapi bisa menurunkannya.'],
        ['Alel dominan', 'Alel yang efeknya tampak ketika hanya ada satu salinan.'],
        ['Alel resesif', 'Alel yang efeknya tampak hanya jika tidak ada alel dominan: dua salinan pada perempuan atau pada autosom, satu salinan pada satu-satunya X laki-laki.'],
        ['Hemizigot', 'Hanya memiliki satu salinan suatu gen, seperti laki-laki untuk gen pada kromosom X.'],
        ['Konsanguinitas', 'Pernikahan antarkerabat, yang menaikkan peluang kedua orang tua membawa alel resesif langka yang sama.'],
      ],
    },
    misconceptions: {
      en: [
        ['Dominant traits are the common ones and recessive traits are rare.', 'Dominance describes how an allele acts in a heterozygote, not how common it is. Huntington disease is dominant yet rare; having blue eyes is largely recessive yet common in some populations.'],
        ['If neither parent shows the trait, it cannot be inherited.', 'Two unaffected carriers of a recessive allele have a 1 in 4 chance of an affected child with each pregnancy. The trait skipped a generation but was inherited all along.'],
        ['Males can be silent carriers of X-linked recessive traits.', 'A male has only one X. If it carries the recessive allele there is no second X to mask it, so he is affected. Only females can be unaffected carriers of X-linked recessive alleles.'],
        ['If the pedigree is consistent with a mode, that mode is proven.', 'Consistency only means not ruled out. In this small family, a pattern of a few affected people is often consistent with three different modes at once; more relatives or a DNA test are needed to decide.'],
      ],
      id: [
        ['Sifat dominan adalah yang umum dan sifat resesif yang jarang.', 'Dominansi menggambarkan cara alel bekerja pada heterozigot, bukan seberapa umum alel itu. Penyakit Huntington bersifat dominan tetapi jarang; mata biru sebagian besar resesif tetapi umum pada beberapa populasi.'],
        ['Jika kedua orang tua tidak menampakkan sifat, sifat itu tidak mungkin diwariskan.', 'Dua pembawa alel resesif yang tidak terkena memiliki peluang 1 banding 4 untuk memiliki anak yang terkena pada setiap kehamilan. Sifat itu melompati satu generasi tetapi tetap diwariskan.'],
        ['Laki-laki bisa menjadi pembawa diam sifat resesif terpaut-X.', 'Laki-laki hanya punya satu X. Jika X itu membawa alel resesif, tidak ada X kedua yang menutupinya, sehingga ia terkena. Hanya perempuan yang bisa menjadi pembawa tak terkena alel resesif terpaut-X.'],
        ['Jika pedigri konsisten dengan suatu pola, pola itu terbukti.', 'Konsisten hanya berarti belum tersingkir. Dalam keluarga kecil ini, pola beberapa orang yang terkena sering konsisten dengan tiga pola sekaligus; diperlukan lebih banyak kerabat atau uji DNA untuk memutuskan.'],
      ],
    },
    realWorld: {
      en: [
        'Haemophilia, an X-linked recessive bleeding disorder, spread through several European royal families from Queen Victoria, a carrier, through her daughters to their sons.',
        'Red-green colour blindness is X-linked recessive and affects roughly 8% of males but well under 1% of females of European ancestry.',
        'Huntington disease is autosomal dominant: each child of an affected parent has a 50% chance of inheriting it, which pedigrees make immediately visible.',
        'Genetic counsellors draw pedigrees for families with cystic fibrosis or sickle-cell disease (both autosomal recessive) to estimate the risk for a future child.',
      ],
      id: [
        'Hemofilia, kelainan perdarahan resesif terpaut-X, menyebar ke beberapa keluarga kerajaan Eropa dari Ratu Victoria, seorang pembawa, melalui anak-anak perempuannya ke anak laki-laki mereka.',
        'Buta warna merah-hijau bersifat resesif terpaut-X dan menyerang kira-kira 8% laki-laki tetapi jauh di bawah 1% perempuan keturunan Eropa.',
        'Penyakit Huntington bersifat autosomal dominan: setiap anak dari orang tua yang terkena berpeluang 50% mewarisinya, dan pedigri membuatnya langsung terlihat.',
        'Konselor genetik menggambar pedigri untuk keluarga dengan fibrosis kistik atau penyakit sel sabit (keduanya autosomal resesif) guna memperkirakan risiko bagi anak berikutnya.',
      ],
    },
    questions: {
      en: [
        { q: 'Two unaffected parents have an affected son. Which inheritance modes are still possible, and which is ruled out?', a: 'Autosomal recessive (both parents are carriers) and X-linked recessive (the mother is a carrier) are both possible. Autosomal dominant and X-linked dominant are ruled out, because a dominant trait would have to show in at least one parent, barring a brand-new mutation.' },
        { q: 'An affected father has an affected son. Can the trait be X-linked? Explain using the chromosomes the son receives.', a: 'No. A son receives his father\'s Y chromosome and his X from his mother, so an X-linked allele cannot travel from father to son. The trait must be autosomal (or the son got the allele from his mother).' },
        { q: 'Load the "Try X-linked pattern" preset: P1, G2 and G4 are affected. Trace where each grandson\'s allele came from.', a: 'G2 is the son of C1, P1\'s daughter. C1 must have received P1\'s X with the allele, making her an obligate carrier, and passed it to G2. G4 is the son of C3, who is P1\'s son and received P1\'s Y, so C3 cannot carry the allele. G4\'s allele must have come from his mother S2, who married into the family as a carrier.' },
      ],
      id: [
        { q: 'Dua orang tua yang tidak terkena memiliki anak laki-laki yang terkena. Pola pewarisan mana yang masih mungkin, dan mana yang tersingkir?', a: 'Autosomal resesif (kedua orang tua pembawa) dan resesif terpaut-X (ibu pembawa) sama-sama mungkin. Autosomal dominan dan dominan terpaut-X tersingkir, karena sifat dominan harus tampak pada setidaknya satu orang tua, kecuali terjadi mutasi yang benar-benar baru.' },
        { q: 'Seorang ayah yang terkena memiliki anak laki-laki yang terkena. Mungkinkah sifat itu terpaut-X? Jelaskan dengan kromosom yang diterima anak laki-laki itu.', a: 'Tidak. Anak laki-laki menerima kromosom Y dari ayahnya dan X dari ibunya, sehingga alel terpaut-X tidak bisa berpindah dari ayah ke anak laki-laki. Sifat itu pasti autosomal (atau anak itu menerima alel dari ibunya).' },
        { q: 'Muat praatur "Try X-linked pattern": P1, G2, dan G4 terkena. Telusuri asal alel setiap cucu laki-laki.', a: 'G2 adalah anak C1, anak perempuan P1. C1 pasti menerima X P1 yang membawa alel itu, sehingga ia pembawa wajib, lalu menurunkannya ke G2. G4 adalah anak C3, anak laki-laki P1 yang menerima Y dari P1, sehingga C3 tidak bisa membawa alel itu. Alel G4 pasti berasal dari ibunya, S2, yang menikah masuk ke keluarga sebagai pembawa.' },
      ],
    },
  },
};
