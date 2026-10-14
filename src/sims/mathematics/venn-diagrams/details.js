// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Identify the seven regions of a 3-set Venn diagram.',
      'Connect set-builder notation to the visual region.',
      'Apply De Morgan\'s laws and inclusion-exclusion.',
    ],
    id: [
      'Mengidentifikasi tujuh wilayah pada diagram Venn 3-himpunan.',
      'Menghubungkan notasi set-builder dengan wilayah visual.',
      'Menerapkan hukum De Morgan dan inklusi-eksklusi.',
    ],
  },  tryThis: {
    en: [
      'A ∪ B ∪ C — the entire colored region.',
      'A ∩ B ∩ C — only the central petal.',
      'A − (B ∪ C) — the part of A that overlaps neither.',
    ],
    id: [
      'A ∪ B ∪ C — seluruh area berwarna.',
      'A ∩ B ∩ C — hanya kelopak tengah.',
      'A − (B ∪ C) — bagian A yang tidak tumpang tindih.',
    ],
  },

  // "Learn" section: the mathematics behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'A set is a collection of things, called its elements, and a Venn diagram is a picture of sets. Everything we are talking about lives in a rectangle called the universal set U; each set is a circle inside it. A point inside circle A stands for an element of A, a point outside stands for an element that is not in A. Where two circles overlap, the elements belong to both sets at once, and where no circle reaches, the element is in none of them.',
        'With three sets there are eight possible "in or out" combinations: in A only, in A and B but not C, in all three, in none, and so on. That gives seven regions inside the circles plus the background, and every element of U lands in exactly one of them. The simulation uses U = {1, 2, …, 12} and two ready-made choices of sets, for example A = multiples of 2, B = multiples of 3, C = numbers greater than 5. It writes each number in its region, so you can check the picture against the rule: 6 is even, a multiple of 3 and greater than 5, so it sits in the centre.',
        'The Operation menu colours the elements of a new set built from A, B and C. The union A ∪ B contains everything in A or in B (or both); the intersection A ∩ B only what is in both; the difference A − B keeps the elements of A that are not in B; the symmetric difference A △ B keeps what is in exactly one of them; and the complement Aᶜ is everything in U outside A. Switching between operations shows that each one is simply a particular choice of regions, which is why Venn diagrams are so good for checking set identities such as De Morgan\'s law (A ∪ B)ᶜ = Aᶜ ∩ Bᶜ.',
        'Counting elements also becomes visible. The region counts add up, so |A ∪ B| = |A| + |B| − |A ∩ B|: adding |A| and |B| counts the overlap twice, and subtracting it once fixes that. The sim keeps a few things simple: U has only twelve elements, the sets come from fixed rules rather than ones you type, and the highlight is painted with a coarse grid of squares, so the edges of a shaded region look slightly ragged. Some regions can be empty for a given rule; an empty region is still a region, it just has no elements in it.',
      ],
      id: [
        'Himpunan adalah kumpulan benda, yang disebut anggotanya, dan diagram Venn adalah gambar dari himpunan. Semua yang kita bicarakan berada dalam sebuah persegi panjang yang disebut himpunan semesta U; tiap himpunan digambar sebagai lingkaran di dalamnya. Titik di dalam lingkaran A mewakili anggota A, titik di luarnya mewakili sesuatu yang bukan anggota A. Di tempat dua lingkaran bertumpang tindih, anggotanya termasuk kedua himpunan sekaligus, dan di tempat yang tidak dijangkau lingkaran mana pun, anggotanya tidak termasuk himpunan mana pun.',
        'Dengan tiga himpunan ada delapan kemungkinan kombinasi "masuk atau tidak": hanya di A, di A dan B tetapi tidak di C, di ketiganya, di tidak satu pun, dan seterusnya. Itu menghasilkan tujuh daerah di dalam lingkaran ditambah latar, dan setiap anggota U jatuh tepat di satu daerah. Simulasi memakai U = {1, 2, …, 12} dan dua pilihan himpunan yang sudah disiapkan, misalnya A = kelipatan 2, B = kelipatan 3, C = bilangan lebih dari 5. Tiap bilangan dituliskan di daerahnya, jadi kamu bisa mencocokkan gambar dengan aturannya: 6 genap, kelipatan 3, dan lebih dari 5, sehingga ia berada di tengah.',
        'Menu Operation mewarnai anggota himpunan baru yang dibentuk dari A, B, dan C. Gabungan A ∪ B berisi semua yang ada di A atau di B (atau keduanya); irisan A ∩ B hanya yang ada di keduanya; selisih A − B menyimpan anggota A yang tidak ada di B; selisih simetris A △ B menyimpan yang ada di tepat salah satunya; dan komplemen Aᶜ adalah semua anggota U di luar A. Berpindah-pindah operasi memperlihatkan bahwa tiap operasi hanyalah pilihan daerah tertentu, dan itulah sebabnya diagram Venn sangat berguna untuk memeriksa identitas himpunan seperti hukum De Morgan (A ∪ B)ᶜ = Aᶜ ∩ Bᶜ.',
        'Menghitung anggota juga menjadi terlihat. Banyak anggota tiap daerah dijumlahkan, sehingga |A ∪ B| = |A| + |B| − |A ∩ B|: menjumlahkan |A| dan |B| menghitung irisan dua kali, dan mengurangkannya sekali memperbaiki hal itu. Sim ini menyederhanakan beberapa hal: U hanya punya dua belas anggota, himpunan berasal dari aturan yang sudah ditentukan dan bukan yang kamu ketik sendiri, dan sorotan digambar dengan kisi kotak yang kasar sehingga tepi daerah yang diarsir terlihat sedikit bergerigi. Beberapa daerah bisa kosong untuk aturan tertentu; daerah kosong tetap daerah, hanya saja tidak ada anggotanya.',
      ],
    },
    figure: {
      caption: {
        en: 'Three sets inside the universal set U make eight regions. The shaded lens is A ∩ B; the part of it that also lies inside C is A ∩ B ∩ C, the centre of the diagram.',
        id: 'Tiga himpunan di dalam himpunan semesta U membentuk delapan daerah. Daerah yang diarsir adalah A ∩ B; bagian yang juga berada di dalam C adalah A ∩ B ∩ C, pusat diagram.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Venn diagram of three sets with the intersection of A and B shaded', 'Diagram Venn tiga himpunan dengan irisan A dan B diarsir')}">
  <style>text{font:12px system-ui,sans-serif;fill:currentColor}.s{fill:none;stroke-width:2}.u{fill:none;stroke:currentColor;stroke-width:1.2;opacity:.6}.r{font-size:10px;opacity:.75}</style>
  <defs><clipPath id="ca"><circle cx="135" cy="100" r="58"/></clipPath></defs>
  <rect x="30" y="22" width="300" height="200" rx="4" class="u"/>
  <text x="38" y="38">U</text>
  <circle cx="195" cy="100" r="58" fill="#f59e0b" opacity=".45" clip-path="url(#ca)"/>
  <circle cx="135" cy="100" r="58" class="s" stroke="#3b82f6"/>
  <circle cx="195" cy="100" r="58" class="s" stroke="#10b981"/>
  <circle cx="165" cy="150" r="58" class="s" stroke="#8b5cf6"/>
  <text x="86" y="52" fill="#3b82f6" font-weight="bold">A</text>
  <text x="236" y="52" fill="#10b981" font-weight="bold">B</text>
  <text x="160" y="222" fill="#8b5cf6" font-weight="bold">C</text>
  <text x="96" y="104" class="r">${L('A only', 'hanya A')}</text>
  <text x="212" y="104" class="r">${L('B only', 'hanya B')}</text>
  <text x="146" y="196" class="r">${L('C only', 'hanya C')}</text>
  <text x="152" y="82" class="r">A ∩ B</text>
  <circle cx="165" cy="118" r="3" fill="currentColor"/>
  <line x1="165" y1="118" x2="262" y2="160" stroke="currentColor" stroke-width="1" opacity=".6"/>
  <text x="266" y="164" class="r">A ∩ B ∩ C</text>
  <text x="246" y="204" class="r">${L('outside: in none', 'luar: tidak di mana pun')}</text>
  <text x="38" y="236" class="r">${L('every element lands in exactly one of the 8 regions', 'setiap anggota jatuh tepat di satu dari 8 daerah')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Three overlapping sets divide the universal set into eight regions, and every element belongs to exactly one of them.',
        'Union (∪) means "in at least one", intersection (∩) means "in all", and difference (−) means "in the first but not the second".',
        'The complement Aᶜ is everything in U that is not in A, so A and Aᶜ together make up all of U.',
        'De Morgan\'s laws, (A ∪ B)ᶜ = Aᶜ ∩ Bᶜ and (A ∩ B)ᶜ = Aᶜ ∪ Bᶜ, can be checked by comparing shaded regions.',
        'Inclusion-exclusion, |A ∪ B| = |A| + |B| − |A ∩ B|, corrects for counting the overlap twice.',
      ],
      id: [
        'Tiga himpunan yang bertumpang tindih membagi himpunan semesta menjadi delapan daerah, dan setiap anggota termasuk tepat di satu daerah.',
        'Gabungan (∪) berarti "ada di sedikitnya satu", irisan (∩) berarti "ada di semua", dan selisih (−) berarti "ada di yang pertama tetapi tidak di yang kedua".',
        'Komplemen Aᶜ adalah semua anggota U yang tidak ada di A, sehingga A dan Aᶜ bersama-sama membentuk seluruh U.',
        'Hukum De Morgan, (A ∪ B)ᶜ = Aᶜ ∩ Bᶜ dan (A ∩ B)ᶜ = Aᶜ ∪ Bᶜ, bisa diperiksa dengan membandingkan daerah yang diarsir.',
        'Inklusi-eksklusi, |A ∪ B| = |A| + |B| − |A ∩ B|, mengoreksi irisan yang terhitung dua kali.',
      ],
    },
    vocabulary: {
      en: [
        ['Set', 'A collection of distinct objects, called elements; written with braces, such as {2, 4, 6}.'],
        ['Universal set (U)', 'The set of everything under discussion; drawn as the rectangle around the circles.'],
        ['Union (A ∪ B)', 'The set of elements that are in A, in B, or in both.'],
        ['Intersection (A ∩ B)', 'The set of elements that are in both A and B.'],
        ['Difference (A − B)', 'The elements of A that are not in B.'],
        ['Symmetric difference (A △ B)', 'The elements in exactly one of A and B, not both.'],
        ['Complement (Aᶜ)', 'All elements of U that are not in A.'],
        ['Empty set (∅)', 'The set with no elements; a region of the diagram can be empty.'],
      ],
      id: [
        ['Himpunan', 'Kumpulan objek yang berbeda-beda, disebut anggota; ditulis dengan kurung kurawal, misalnya {2, 4, 6}.'],
        ['Himpunan semesta (U)', 'Himpunan semua hal yang dibicarakan; digambar sebagai persegi panjang di sekeliling lingkaran.'],
        ['Gabungan (A ∪ B)', 'Himpunan anggota yang ada di A, di B, atau di keduanya.'],
        ['Irisan (A ∩ B)', 'Himpunan anggota yang ada di A dan juga di B.'],
        ['Selisih (A − B)', 'Anggota A yang tidak ada di B.'],
        ['Selisih simetris (A △ B)', 'Anggota yang ada di tepat salah satu dari A dan B, bukan keduanya.'],
        ['Komplemen (Aᶜ)', 'Semua anggota U yang tidak ada di A.'],
        ['Himpunan kosong (∅)', 'Himpunan tanpa anggota; suatu daerah pada diagram bisa saja kosong.'],
      ],
    },
    misconceptions: {
      en: [
        ['"A or B" means you have to choose one, so A ∪ B leaves out the overlap.', 'In mathematics "or" is inclusive. A ∪ B contains the overlap too; the set that leaves it out is the symmetric difference A △ B.'],
        ['The complement of A ∩ B is Aᶜ ∩ Bᶜ.', 'It is Aᶜ ∪ Bᶜ. Not being in both means missing at least one of them. Shade both expressions in the sim and compare: the regions differ.'],
        ['|A ∪ B| is just |A| + |B|.', 'Only if A and B share nothing. Otherwise the overlap is counted twice, so |A ∪ B| = |A| + |B| − |A ∩ B|.'],
        ['Every region in a Venn diagram must contain something.', 'The regions show what is possible, not what happens. In the first preset no number is a multiple of 2 and 3 yet 5 or less, so that region is empty.'],
      ],
      id: [
        ['"A atau B" berarti harus memilih salah satu, jadi A ∪ B tidak memuat irisan.', 'Dalam matematika "atau" bersifat inklusif. A ∪ B memuat irisan juga; himpunan yang membuangnya adalah selisih simetris A △ B.'],
        ['Komplemen dari A ∩ B adalah Aᶜ ∩ Bᶜ.', 'Yang benar Aᶜ ∪ Bᶜ. Tidak berada di keduanya berarti tidak ada di sedikitnya salah satunya. Arsir kedua ekspresi di sim dan bandingkan: daerahnya berbeda.'],
        ['|A ∪ B| sama saja dengan |A| + |B|.', 'Hanya jika A dan B tidak berbagi anggota. Jika tidak, irisannya terhitung dua kali, sehingga |A ∪ B| = |A| + |B| − |A ∩ B|.'],
        ['Setiap daerah pada diagram Venn harus berisi sesuatu.', 'Daerah menunjukkan apa yang mungkin, bukan apa yang terjadi. Pada preset pertama tidak ada bilangan kelipatan 2 dan 3 yang sekaligus 5 atau kurang, jadi daerah itu kosong.'],
      ],
    },
    realWorld: {
      en: [
        'Database and search queries combine conditions with AND, OR and NOT, which are exactly intersection, union and complement.',
        'Blood groups: the A and B antigens form two overlapping sets, giving the four types A, B, AB and O (neither).',
        'Survey analysis uses inclusion-exclusion to find how many people like at least one of several products without double counting.',
        'Probability of events uses the same picture: P(A or B) = P(A) + P(B) − P(A and B).',
      ],
      id: [
        'Kueri basis data dan pencarian menggabungkan syarat dengan AND, OR, dan NOT, yang persis sama dengan irisan, gabungan, dan komplemen.',
        'Golongan darah: antigen A dan B membentuk dua himpunan yang bertumpang tindih, menghasilkan empat golongan A, B, AB, dan O (tidak keduanya).',
        'Analisis survei memakai inklusi-eksklusi untuk mencari berapa orang yang menyukai sedikitnya satu dari beberapa produk tanpa menghitung ganda.',
        'Peluang kejadian memakai gambar yang sama: P(A atau B) = P(A) + P(B) − P(A dan B).',
      ],
    },
    questions: {
      en: [
        { q: 'In the first preset (A = multiples of 2, B = multiples of 3, C = greater than 5), which numbers are in A ∩ B ∩ C, and which region is empty?', a: 'A ∩ B ∩ C = {6, 12}: both are even, multiples of 3 and greater than 5. The region "in A and B but not C" is empty, because every common multiple of 2 and 3 up to 12 is already greater than 5.' },
        { q: 'Using the same preset, count |A|, |B| and |A ∩ B|, then use inclusion-exclusion to find |A ∪ B|. Check it against the diagram.', a: '|A| = 6 (2, 4, 6, 8, 10, 12), |B| = 4 (3, 6, 9, 12) and |A ∩ B| = 2 (6, 12), so |A ∪ B| = 6 + 4 − 2 = 8. The highlighted A ∪ B region indeed shows eight numbers.' },
        { q: 'Select A − (B ∪ C). Describe the region in words and list its elements in the first preset.', a: 'It is the part of A that is outside both B and C: numbers that are even, not multiples of 3, and not greater than 5. That leaves {2, 4}.' },
      ],
      id: [
        { q: 'Pada preset pertama (A = kelipatan 2, B = kelipatan 3, C = lebih dari 5), bilangan mana saja yang ada di A ∩ B ∩ C, dan daerah mana yang kosong?', a: 'A ∩ B ∩ C = {6, 12}: keduanya genap, kelipatan 3, dan lebih dari 5. Daerah "di A dan B tetapi tidak di C" kosong, karena setiap kelipatan persekutuan 2 dan 3 sampai 12 sudah lebih dari 5.' },
        { q: 'Dengan preset yang sama, hitung |A|, |B|, dan |A ∩ B|, lalu gunakan inklusi-eksklusi untuk mencari |A ∪ B|. Cocokkan dengan diagram.', a: '|A| = 6 (2, 4, 6, 8, 10, 12), |B| = 4 (3, 6, 9, 12), dan |A ∩ B| = 2 (6, 12), jadi |A ∪ B| = 6 + 4 − 2 = 8. Daerah A ∪ B yang disorot memang menampilkan delapan bilangan.' },
        { q: 'Pilih A − (B ∪ C). Jelaskan daerahnya dengan kata-kata dan sebutkan anggotanya pada preset pertama.', a: 'Itu bagian A yang berada di luar B maupun C: bilangan genap, bukan kelipatan 3, dan tidak lebih dari 5. Yang tersisa adalah {2, 4}.' },
      ],
    },
  },
};
