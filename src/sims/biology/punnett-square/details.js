// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Construct a Punnett square from parent genotypes.',
      'Read genotype and phenotype ratios from the square.',
      'Predict outcomes of monohybrid and dihybrid crosses.',
    ],
    id: [
      'Menyusun diagram Punnett dari genotipe induk.',
      'Membaca rasio genotipe dan fenotipe dari diagram.',
      'Memprediksi hasil persilangan monohibrid dan dihibrid.',
    ],
  },
  tryThis: {
    en: [
      'Cross Aa × Aa — verify the classic 3:1 phenotype ratio.',
      'Switch to dihybrid (AaBb × AaBb) — find the 9:3:3:1 ratio.',
      'What cross guarantees only homozygous recessive offspring?',
    ],
    id: [
      'Silangkan Aa × Aa — verifikasi rasio fenotipe klasik 3:1.',
      'Beralih ke dihibrid (AaBb × AaBb) — temukan rasio 9:3:3:1.',
      'Persilangan mana yang menjamin keturunan homozigot resesif saja?',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'Most of your cells carry two copies of every gene, one inherited from each parent. The different versions of a gene are called alleles, and a Punnett square is a bookkeeping tool for working out which combinations of alleles the children of two parents can receive, and how often. In the sim the alleles are written as letters: a capital letter (A) is the dominant allele and a lowercase letter (a) is the recessive one. A parent written Aa carries one of each and is called heterozygous; AA and aa are homozygous.',
        'When a parent makes egg or sperm cells, the two copies of each gene separate, so each gamete carries just one allele. This is Mendel\'s law of segregation, and it is why the sim writes the gametes along the top and side of the square: an Aa parent gives A to half its gametes and a to the other half. Each box in the grid pairs one gamete from each parent, and every box is equally likely. For Aa × Aa the four boxes read AA, Aa, Aa, aa, so the genotype ratio is 1:2:1. Because A masks a, three of the four show the dominant trait and one the recessive, the famous 3:1 phenotype ratio.',
        'Switching to the dihybrid mode adds a second gene, B, assumed to be on a different chromosome. Mendel\'s law of independent assortment says the two genes are shuffled separately, so an AaBb parent makes four kinds of gamete (AB, Ab, aB, ab) in equal numbers, and the square grows to 4 × 4 = 16 boxes. Counting the phenotypes gives 9 showing both dominant traits, 3 and 3 showing one each, and 1 showing both recessive traits: 9:3:3:1. The sim fills the boxes and tallies the ratios automatically, and the lab panel lets you record predictions for different parent pairs.',
        'The square predicts probabilities, not guaranteed outcomes. A real family of four children from Aa × Aa parents will not always contain exactly one with the recessive trait, just as four coin tosses are not always two heads and two tails; the ratios appear only when many offspring are counted. The sim also assumes complete dominance, two alleles per gene, genes on separate chromosomes, and no influence from the environment. Many real traits, such as human height or skin colour, involve many genes and do not follow these simple ratios.',
      ],
      id: [
        'Sebagian besar sel tubuhmu membawa dua salinan setiap gen, satu diwarisi dari masing-masing orang tua. Versi-versi gen yang berbeda disebut alel, dan diagram Punnett adalah alat pencatatan untuk mencari kombinasi alel apa saja yang dapat diterima anak dari dua induk, dan seberapa sering. Di simulasi, alel ditulis sebagai huruf: huruf kapital (A) adalah alel dominan dan huruf kecil (a) adalah alel resesif. Induk yang ditulis Aa membawa satu dari masing-masing dan disebut heterozigot; AA dan aa disebut homozigot.',
        'Saat induk membentuk sel telur atau sperma, dua salinan tiap gen berpisah, sehingga setiap gamet hanya membawa satu alel. Inilah hukum segregasi Mendel, dan itulah sebabnya simulasi menuliskan gamet di sisi atas dan sisi kiri diagram: induk Aa memberi A ke separuh gametnya dan a ke separuh lainnya. Setiap kotak pada kisi memasangkan satu gamet dari tiap induk, dan setiap kotak berpeluang sama. Untuk Aa × Aa keempat kotaknya terbaca AA, Aa, Aa, aa, sehingga rasio genotipenya 1:2:1. Karena A menutupi a, tiga dari empat menampilkan sifat dominan dan satu sifat resesif: rasio fenotipe 3:1 yang terkenal.',
        'Beralih ke mode dihibrid menambahkan gen kedua, B, yang dianggap berada di kromosom berbeda. Hukum pemilahan bebas Mendel menyatakan kedua gen dikocok secara terpisah, sehingga induk AaBb membentuk empat jenis gamet (AB, Ab, aB, ab) dalam jumlah sama, dan diagram membesar menjadi 4 × 4 = 16 kotak. Menghitung fenotipenya memberi 9 yang menampilkan kedua sifat dominan, 3 dan 3 yang menampilkan salah satu, dan 1 yang menampilkan kedua sifat resesif: 9:3:3:1. Simulasi mengisi kotak dan menghitung rasionya secara otomatis, dan panel lab memungkinkanmu mencatat prediksi untuk berbagai pasangan induk.',
        'Diagram ini memprediksi peluang, bukan hasil yang pasti. Keluarga sungguhan dengan empat anak dari induk Aa × Aa tidak selalu punya tepat satu anak bersifat resesif, sama seperti empat lemparan koin tidak selalu dua gambar dan dua angka; rasionya baru tampak jika keturunan yang dihitung banyak. Simulasi juga mengasumsikan dominansi penuh, dua alel per gen, gen pada kromosom terpisah, dan tanpa pengaruh lingkungan. Banyak sifat nyata, seperti tinggi badan atau warna kulit manusia, melibatkan banyak gen dan tidak mengikuti rasio sederhana ini.',
      ],
    },
    figure: {
      caption: {
        en: 'Aa × Aa. Each parent passes on one allele per gamete (segregation). Every box is one equally likely combination: genotypes 1 AA : 2 Aa : 1 aa, and because A masks a, phenotypes 3 dominant : 1 recessive.',
        id: 'Aa × Aa. Setiap induk mewariskan satu alel per gamet (segregasi). Setiap kotak adalah satu kombinasi yang berpeluang sama: genotipe 1 AA : 2 Aa : 1 aa, dan karena A menutupi a, fenotipe 3 dominan : 1 resesif.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Punnett square for Aa crossed with Aa', 'Diagram Punnett untuk Aa disilangkan dengan Aa')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.g{font:700 15px ui-monospace,monospace;fill:currentColor}.s{font-size:10px}.m{fill:none;stroke:currentColor;stroke-width:1.2}</style>
  <text x="86" y="18" font-weight="700">${L('Parent 1: Aa', 'Induk 1: Aa')}</text>
  <text x="2" y="110" font-weight="700" transform="rotate(-90 12 150)">${L('Parent 2: Aa', 'Induk 2: Aa')}</text>
  <line x1="130" y1="24" x2="110" y2="40" class="m" marker-end="url(#a)"/>
  <line x1="150" y1="24" x2="170" y2="40" class="m" marker-end="url(#a)"/>
  <rect x="80" y="44" width="60" height="26" rx="4" fill="#3b82f6" opacity=".85"/><text x="104" y="63" class="g" fill="#fff">A</text>
  <rect x="150" y="44" width="60" height="26" rx="4" fill="#3b82f6" opacity=".85"/><text x="175" y="63" class="g" fill="#fff">a</text>
  <rect x="34" y="80" width="36" height="52" rx="4" fill="#3b82f6" opacity=".85"/><text x="46" y="111" class="g" fill="#fff">A</text>
  <rect x="34" y="142" width="36" height="52" rx="4" fill="#3b82f6" opacity=".85"/><text x="47" y="173" class="g" fill="#fff">a</text>
  <rect x="80" y="80" width="60" height="52" rx="4" fill="#8b5cf6" opacity=".8"/><text x="98" y="111" class="g" fill="#fff">AA</text>
  <rect x="150" y="80" width="60" height="52" rx="4" fill="#8b5cf6" opacity=".8"/><text x="169" y="111" class="g" fill="#fff">Aa</text>
  <rect x="80" y="142" width="60" height="52" rx="4" fill="#8b5cf6" opacity=".8"/><text x="99" y="173" class="g" fill="#fff">Aa</text>
  <rect x="150" y="142" width="60" height="52" rx="4" fill="#f59e0b" opacity=".9"/><text x="170" y="173" class="g" fill="#fff">aa</text>
  <text x="80" y="212" class="s">${L('each box = 1/4 of offspring', 'tiap kotak = 1/4 keturunan')}</text>
  <text x="226" y="60" font-weight="700">${L('Genotypes', 'Genotipe')}</text>
  <text x="226" y="76" class="s">1 AA : 2 Aa : 1 aa</text>
  <text x="226" y="90" class="s">${L('(25% : 50% : 25%)', '(25% : 50% : 25%)')}</text>
  <text x="226" y="120" font-weight="700">${L('Phenotypes', 'Fenotipe')}</text>
  <rect x="226" y="128" width="12" height="12" rx="2" fill="#8b5cf6"/>
  <text x="243" y="138" class="s">${L('3 dominant (A_)', '3 dominan (A_)')}</text>
  <rect x="226" y="146" width="12" height="12" rx="2" fill="#f59e0b"/>
  <text x="243" y="156" class="s">${L('1 recessive (aa)', '1 resesif (aa)')}</text>
  <text x="226" y="178" class="s">${L('Aa looks the same as AA', 'Aa tampak sama dengan AA')}</text>
  <text x="226" y="192" class="s">${L('because A masks a.', 'karena A menutupi a.')}</text>
  <text x="226" y="222" class="s">${L('Ratios are probabilities;', 'Rasio adalah peluang;')}</text>
  <text x="226" y="234" class="s">${L('real families scatter around them.', 'keluarga nyata tersebar di sekitarnya.')}</text>
  <defs><marker id="a" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="context-stroke"/></marker></defs>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Each parent passes on only one of its two alleles for a gene to each gamete (segregation).',
        'A Punnett square lists every gamete combination; each box is equally likely, so counting boxes gives the expected ratios.',
        'Aa × Aa gives genotypes 1:2:1 and, with complete dominance, phenotypes 3:1.',
        'For two genes on different chromosomes the alleles are shuffled independently, and AaBb × AaBb gives 9:3:3:1.',
        'The ratios are probabilities for a large number of offspring, not a guarantee for any one family.',
      ],
      id: [
        'Setiap induk hanya mewariskan satu dari dua alelnya untuk suatu gen ke tiap gamet (segregasi).',
        'Diagram Punnett mendaftar setiap kombinasi gamet; setiap kotak berpeluang sama, sehingga menghitung kotak memberi rasio yang diharapkan.',
        'Aa × Aa memberi genotipe 1:2:1 dan, dengan dominansi penuh, fenotipe 3:1.',
        'Untuk dua gen pada kromosom berbeda, alel dikocok secara bebas, dan AaBb × AaBb memberi 9:3:3:1.',
        'Rasio itu adalah peluang untuk keturunan dalam jumlah besar, bukan jaminan bagi satu keluarga.',
      ],
    },
    vocabulary: {
      en: [
        ['Gene', 'A section of DNA that carries the instructions for one trait or protein.'],
        ['Allele', 'One version of a gene; written as a letter such as A or a.'],
        ['Genotype', 'The pair of alleles an individual carries, such as AA, Aa or aa.'],
        ['Phenotype', 'The trait you can actually observe, such as purple or white flowers.'],
        ['Dominant / recessive', 'A dominant allele shows its trait with one copy; a recessive trait appears only when both copies are recessive (aa).'],
        ['Homozygous / heterozygous', 'Two identical alleles (AA or aa) versus two different ones (Aa).'],
        ['Gamete', 'An egg or sperm cell, carrying one allele of each gene.'],
        ['Test cross', 'Crossing an unknown individual with a homozygous recessive (aa) to reveal its genotype from the offspring.'],
      ],
      id: [
        ['Gen', 'Bagian DNA yang membawa instruksi untuk satu sifat atau protein.'],
        ['Alel', 'Satu versi dari suatu gen; ditulis sebagai huruf seperti A atau a.'],
        ['Genotipe', 'Pasangan alel yang dibawa individu, seperti AA, Aa, atau aa.'],
        ['Fenotipe', 'Sifat yang benar-benar dapat diamati, seperti bunga ungu atau putih.'],
        ['Dominan / resesif', 'Alel dominan menampakkan sifatnya dengan satu salinan; sifat resesif baru tampak jika kedua salinannya resesif (aa).'],
        ['Homozigot / heterozigot', 'Dua alel identik (AA atau aa) berbanding dua alel berbeda (Aa).'],
        ['Gamet', 'Sel telur atau sperma, yang membawa satu alel dari tiap gen.'],
        ['Uji silang', 'Menyilangkan individu yang belum diketahui dengan homozigot resesif (aa) untuk mengungkap genotipenya dari keturunannya.'],
      ],
    },
    misconceptions: {
      en: [
        ['Dominant means more common or stronger.', 'Dominant only means the allele shows its trait when paired with a recessive one. Some dominant alleles are rare (polydactyly, extra fingers, is dominant) and dominance says nothing about health or strength.'],
        ['If two parents have four children, exactly one will show the recessive trait.', 'The 3:1 ratio is a probability: each child independently has a 1 in 4 chance. Four children could all show the dominant trait, or two could be recessive.'],
        ['A recessive trait can be lost from a family.', 'The allele can hide in heterozygous carriers (Aa) for many generations and reappear whenever two carriers have a child together.'],
        ['The Punnett square shows what will happen in one pregnancy.', 'It shows all possible outcomes and their chances. A single child receives just one of the boxes, chosen at random.'],
      ],
      id: [
        ['Dominan berarti lebih umum atau lebih kuat.', 'Dominan hanya berarti alel itu menampakkan sifatnya ketika berpasangan dengan alel resesif. Beberapa alel dominan justru jarang (polidaktili, jari tambahan, bersifat dominan) dan dominansi tidak berkaitan dengan kesehatan atau kekuatan.'],
        ['Jika dua orang tua punya empat anak, tepat satu anak akan menampakkan sifat resesif.', 'Rasio 3:1 adalah peluang: setiap anak secara independen berpeluang 1 dari 4. Keempat anak bisa saja semuanya bersifat dominan, atau dua di antaranya resesif.'],
        ['Sifat resesif bisa hilang dari sebuah keluarga.', 'Alelnya dapat tersembunyi pada pembawa heterozigot (Aa) selama banyak generasi dan muncul kembali ketika dua pembawa mempunyai anak bersama.'],
        ['Diagram Punnett menunjukkan apa yang akan terjadi pada satu kehamilan.', 'Diagram menunjukkan semua hasil yang mungkin beserta peluangnya. Satu anak hanya menerima satu kotak, yang terpilih secara acak.'],
      ],
    },
    realWorld: {
      en: [
        'Gregor Mendel worked out these ratios in the 1860s by counting tens of thousands of pea plants, for traits such as round or wrinkled seeds and purple or white flowers.',
        'Genetic counsellors use Punnett squares to tell carrier parents that each child has a 1 in 4 chance of inheriting a recessive condition such as cystic fibrosis or thalassaemia.',
        'Plant and animal breeders use test crosses to find out whether a prize animal or plant is purebred (homozygous) or a carrier (heterozygous) before using it as a parent.',
        'Blood groups A, B, AB and O are inherited through a single gene with three alleles, and a Punnett square predicts which groups a couple\'s children can have.',
      ],
      id: [
        'Gregor Mendel menemukan rasio-rasio ini pada tahun 1860-an dengan menghitung puluhan ribu tanaman kacang ercis, untuk sifat seperti biji bulat atau keriput dan bunga ungu atau putih.',
        'Konselor genetik memakai diagram Punnett untuk menjelaskan kepada orang tua pembawa bahwa setiap anak berpeluang 1 dari 4 mewarisi kelainan resesif seperti fibrosis kistik atau talasemia.',
        'Pemulia tanaman dan hewan memakai uji silang untuk mengetahui apakah hewan atau tanaman unggul bersifat galur murni (homozigot) atau pembawa (heterozigot) sebelum dijadikan induk.',
        'Golongan darah A, B, AB, dan O diwariskan lewat satu gen dengan tiga alel, dan diagram Punnett memprediksi golongan apa saja yang mungkin dimiliki anak dari sepasang orang tua.',
      ],
    },
    questions: {
      en: [
        { q: 'A purple-flowered pea plant (Pp) is crossed with a white-flowered one (pp). What fraction of the offspring are expected to be white?', a: 'Half. The gametes are P or p from the first parent and only p from the second, giving Pp, Pp, pp, pp. Two of the four boxes are pp (white), so 1/2 or 50%.' },
        { q: 'Two parents both show the dominant trait, yet they have a child with the recessive trait. What must the parents\' genotypes be?', a: 'Both must be heterozygous (Aa). A child with aa needs an a from each parent, and a parent showing the dominant trait with an a to give must be Aa.' },
        { q: 'In the dihybrid cross AaBb × AaBb, what fraction of offspring show the dominant trait for A but the recessive trait for B?', a: '3/16. Treat the genes separately: 3/4 show dominant A and 1/4 show recessive bb; 3/4 × 1/4 = 3/16, which matches the "3" for A_bb in the 9:3:3:1 ratio.' },
      ],
      id: [
        { q: 'Tanaman ercis berbunga ungu (Pp) disilangkan dengan yang berbunga putih (pp). Berapa bagian keturunan yang diharapkan berbunga putih?', a: 'Setengahnya. Gamet dari induk pertama adalah P atau p dan dari induk kedua hanya p, menghasilkan Pp, Pp, pp, pp. Dua dari empat kotak adalah pp (putih), jadi 1/2 atau 50%.' },
        { q: 'Dua orang tua sama-sama menampakkan sifat dominan, tetapi mempunyai anak bersifat resesif. Apa genotipe kedua orang tua itu?', a: 'Keduanya pasti heterozigot (Aa). Anak aa membutuhkan satu a dari tiap orang tua, dan orang tua yang bersifat dominan tetapi bisa memberi a pastilah Aa.' },
        { q: 'Pada persilangan dihibrid AaBb × AaBb, berapa bagian keturunan yang menampakkan sifat dominan untuk A tetapi resesif untuk B?', a: '3/16. Tinjau tiap gen secara terpisah: 3/4 menampakkan A dominan dan 1/4 menampakkan bb resesif; 3/4 × 1/4 = 3/16, sesuai angka "3" untuk A_bb pada rasio 9:3:3:1.' },
      ],
    },
  },
};
