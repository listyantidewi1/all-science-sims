// Long-form text for the sim page aside, kept out of manifest.js.
export default {
  objectives: {
    en: [
      'Use a dichotomous key (a chain of yes/no questions) to identify an unknown organism from a group of twelve.',
      'Explain why good key questions are about clear, observable features that split a group into two parts.',
      'Build a key of your own and compare how many steps it takes to reach each organism.',
    ],
    id: [
      'Menggunakan kunci determinasi (rangkaian pertanyaan ya/tidak) untuk mengidentifikasi makhluk hidup yang belum dikenal dari kelompok berisi dua belas makhluk.',
      'Menjelaskan mengapa pertanyaan kunci yang baik berkaitan dengan ciri yang jelas dan dapat diamati, serta membagi kelompok menjadi dua bagian.',
      'Membangun kunci determinasi sendiri dan membandingkan berapa langkah yang dibutuhkan untuk mencapai tiap makhluk hidup.',
    ],
  },
  tryThis: {
    en: [
      'In Identify mode, press New mystery and answer the questions. How many steps did it take? Record it in the lab, then try five more organisms.',
      'Turn on the fact card when you are unsure: it lists the features you cannot see in a drawing, such as feeding young with milk.',
      'In Build mode, start with "Does it have a backbone?" and finish the key. Then rebuild it starting with "Does it have wings?" instead. Which key has the shortest longest path?',
      'Try asking "Does it have eight legs?" to the whole group of twelve. It only separates the spider. Why is that a weak first question?',
    ],
    id: [
      'Pada mode Identifikasi, tekan Misteri baru dan jawab pertanyaannya. Berapa langkah yang dibutuhkan? Catat di lab, lalu coba lima makhluk lainnya.',
      'Nyalakan kartu fakta jika ragu: kartu itu mencantumkan ciri yang tidak terlihat pada gambar, misalnya menyusui anaknya.',
      'Pada mode Bangun, mulailah dengan "Apakah ia punya tulang belakang?" dan selesaikan kuncinya. Lalu bangun ulang dengan pertanyaan awal "Apakah ia punya sayap?". Kunci mana yang jalur terpanjangnya paling pendek?',
      'Coba tanyakan "Apakah kakinya delapan?" kepada seluruh kelompok dua belas. Pertanyaan itu hanya memisahkan laba-laba. Mengapa itu pertanyaan awal yang lemah?',
    ],
  },

  learn: {
    background: {
      en: [
        'There are millions of kinds of living things, so biologists sort them into groups that share features: animals with a backbone (vertebrates) and without (invertebrates), vertebrates with feathers (birds), with fur that feed their young milk (mammals), with dry scales (reptiles), with gills and fins (fish), and with smooth moist skin that live partly in water (amphibians). Plants are green and make their own food by photosynthesis; fungi such as mushrooms do not, and spread by spores.',
        'A dichotomous key is a tool for identifying an organism using these features. "Dichotomous" means "split in two": every question has exactly two answers, yes or no, and each answer sends you to the next question or to a name. Because every step throws away part of the group, even a big group shrinks quickly: one question can halve twelve organisms to six, a second to three, and a third or fourth to one.',
        'In Identify mode the sim uses a fixed key written by a biologist. You look at the mystery organism, answer each question honestly, and the grey-out shows which candidates have been eliminated. If the key lands on the wrong name, one of your answers did not match the organism, and the sim tells you which one to look at again. In Build mode you choose the questions yourself. The sim shows how each question splits the current group, so you can see that a question like "Does it have eight legs?" removes only the spider, while "Does it have a backbone?" splits the twelve into six and six.',
        'Good keys ask about features that are easy to observe and do not change: number of legs, feathers, scales, a backbone. Poor keys ask about size, colour or where you found the organism, because a young animal, a rare colour form or an escaped pet would send you down the wrong branch.',
      ],
      id: [
        'Ada jutaan jenis makhluk hidup, sehingga ahli biologi mengelompokkannya berdasarkan ciri yang sama: hewan bertulang belakang (vertebrata) dan tidak bertulang belakang (invertebrata), vertebrata berbulu (burung), berambut dan menyusui anaknya (mamalia), bersisik kering (reptil), berinsang dan bersirip (ikan), serta berkulit lembap licin dan hidup sebagian di air (amfibi). Tumbuhan berwarna hijau dan membuat makanannya sendiri melalui fotosintesis; jamur seperti cendawan tidak, dan menyebar dengan spora.',
        'Kunci determinasi (kunci dikotom) adalah alat untuk mengidentifikasi makhluk hidup menggunakan ciri-ciri itu. "Dikotom" berarti "terbagi dua": setiap pertanyaan punya tepat dua jawaban, ya atau tidak, dan setiap jawaban mengarahkanmu ke pertanyaan berikutnya atau ke sebuah nama. Karena setiap langkah membuang sebagian kelompok, kelompok besar pun cepat menyusut: satu pertanyaan bisa membagi dua belas makhluk menjadi enam, pertanyaan kedua menjadi tiga, dan pertanyaan ketiga atau keempat menjadi satu.',
        'Pada mode Identifikasi, simulasi memakai kunci tetap yang disusun ahli biologi. Kamu mengamati makhluk misterius, menjawab setiap pertanyaan dengan jujur, dan kandidat yang tersisih berubah pudar. Jika kunci berakhir pada nama yang salah, berarti salah satu jawabanmu tidak sesuai dengan makhluk itu, dan simulasi memberi tahu pertanyaan mana yang perlu dilihat lagi. Pada mode Bangun kamu sendiri yang memilih pertanyaan. Simulasi menunjukkan bagaimana tiap pertanyaan membagi kelompok saat itu, sehingga terlihat bahwa pertanyaan seperti "Apakah kakinya delapan?" hanya memisahkan laba-laba, sedangkan "Apakah ia punya tulang belakang?" membagi dua belas menjadi enam dan enam.',
        'Kunci yang baik menanyakan ciri yang mudah diamati dan tidak berubah: jumlah kaki, bulu, sisik, tulang belakang. Kunci yang buruk menanyakan ukuran, warna, atau tempat makhluk itu ditemukan, karena hewan muda, warna yang langka, atau hewan peliharaan yang lepas akan membawamu ke cabang yang salah.',
      ],
    },
    figure: {
      caption: {
        en: 'Part of a dichotomous key. Each question has two branches. Following "backbone? yes → feathers? no → milk? yes → water? no" reaches the cat in four steps.',
        id: 'Sebagian kunci determinasi. Setiap pertanyaan punya dua cabang. Mengikuti "tulang belakang? ya → bulu? tidak → menyusui? ya → di air? tidak" sampai ke kucing dalam empat langkah.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        const box = (x, y, w, t, cls = '') => `<rect x="${x - w / 2}" y="${y - 11}" width="${w}" height="22" rx="5" class="b ${cls}"/><text x="${x}" y="${y + 4}" text-anchor="middle">${t}</text>`;
        const line = (x1, y1, x2, y2, lbl, lx, ly, hi) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="${hi ? 'hi' : 'ln'}"/><text x="${lx}" y="${ly}" text-anchor="middle" class="s">${lbl}</text>`;
        const Y = L('yes', 'ya'), N = L('no', 'tidak');
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('A dichotomous key tree with yes/no branches', 'Pohon kunci determinasi dengan cabang ya/tidak')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.s{font-size:9px;opacity:.75}.b{fill:none;stroke:currentColor;stroke-width:1.2}.q{stroke:#3b82f6}.leaf{stroke:#10b981}.ln{stroke:currentColor;stroke-width:1.1;opacity:.5}.hi{stroke:#f59e0b;stroke-width:2.4}</style>
  ${box(180, 22, 110, L('backbone?', 'tulang belakang?'), 'q')}
  ${line(180, 33, 90, 62, N, 125, 44, false)}
  ${line(180, 33, 270, 62, Y, 235, 44, true)}
  ${box(90, 73, 90, L('legs?', 'punya kaki?'), 'q')}
  ${box(270, 73, 90, L('feathers?', 'berbulu?'), 'q')}
  ${line(90, 84, 45, 118, N, 58, 98, false)}
  ${line(90, 84, 135, 118, Y, 122, 98, false)}
  ${box(45, 129, 70, L('earthworm', 'cacing tanah'), 'leaf')}
  ${box(135, 129, 80, L('six legs?', 'enam kaki?'), 'q')}
  ${line(135, 140, 105, 176, N, 110, 155, false)}
  ${line(135, 140, 165, 176, Y, 160, 155, false)}
  ${box(105, 187, 60, L('spider', 'laba-laba'), 'leaf')}
  ${box(170, 187, 68, L('butterfly', 'kupu-kupu'), 'leaf')}
  ${line(270, 84, 320, 118, Y, 305, 98, false)}
  ${line(270, 84, 240, 118, N, 245, 98, true)}
  ${box(322, 129, 66, L('sparrow', 'burung gereja'), 'leaf')}
  ${box(240, 129, 76, L('milk?', 'menyusui?'), 'q')}
  ${line(240, 140, 215, 176, N, 220, 155, false)}
  ${line(240, 140, 275, 176, Y, 268, 155, true)}
  ${box(215, 187, 70, L('scales?', 'bersisik?'), 'q')}
  ${box(290, 187, 80, L('lives in water?', 'hidup di air?'), 'q')}
  ${line(290, 198, 260, 226, N, 265, 213, true)}
  ${line(290, 198, 325, 226, Y, 318, 213, false)}
  ${box(258, 232, 50, L('cat', 'kucing'), 'leaf')}
  ${box(330, 232, 56, L('dolphin', 'lumba-lumba'), 'leaf')}
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Living things are classified into groups by shared features such as a backbone, feathers, fur, scales, or the ability to make food from sunlight.',
        'A dichotomous key is a chain of yes/no questions; each answer eliminates part of the group until one organism is left.',
        'The best questions split the remaining group as evenly as possible, so the key reaches an answer in few steps.',
        'Questions should be about features that are easy to observe and do not change with age, season or where the organism lives.',
        'Several different keys can identify the same set of organisms; they differ in how many steps each path takes.',
      ],
      id: [
        'Makhluk hidup diklasifikasikan ke dalam kelompok berdasarkan ciri yang sama seperti tulang belakang, bulu, rambut, sisik, atau kemampuan membuat makanan dari cahaya matahari.',
        'Kunci determinasi adalah rangkaian pertanyaan ya/tidak; setiap jawaban menyisihkan sebagian kelompok sampai tersisa satu makhluk.',
        'Pertanyaan terbaik membagi kelompok yang tersisa sesama rata mungkin, sehingga kunci mencapai jawaban dalam sedikit langkah.',
        'Pertanyaan sebaiknya tentang ciri yang mudah diamati dan tidak berubah karena umur, musim, atau tempat hidup makhluk itu.',
        'Beberapa kunci yang berbeda dapat mengidentifikasi kumpulan makhluk yang sama; perbedaannya pada jumlah langkah tiap jalur.',
      ],
    },
    vocabulary: {
      en: [
        ['Classification', 'Sorting living things into groups according to the features they share.'],
        ['Dichotomous key', 'A series of paired choices (yes/no) used to identify an organism step by step.'],
        ['Vertebrate', 'An animal with a backbone: fish, amphibians, reptiles, birds and mammals.'],
        ['Invertebrate', 'An animal without a backbone, such as insects, spiders and worms.'],
        ['Mammal', 'A vertebrate with hair or fur that feeds its young with milk; dolphins are mammals even though they live in the sea.'],
        ['Spore', 'A tiny reproductive cell released by fungi and ferns; it is not a seed.'],
      ],
      id: [
        ['Klasifikasi', 'Mengelompokkan makhluk hidup menurut ciri-ciri yang sama.'],
        ['Kunci determinasi', 'Rangkaian pilihan berpasangan (ya/tidak) yang dipakai untuk mengidentifikasi makhluk hidup langkah demi langkah.'],
        ['Vertebrata', 'Hewan bertulang belakang: ikan, amfibi, reptil, burung, dan mamalia.'],
        ['Invertebrata', 'Hewan tanpa tulang belakang, misalnya serangga, laba-laba, dan cacing.'],
        ['Mamalia', 'Vertebrata berambut yang menyusui anaknya; lumba-lumba adalah mamalia meskipun hidup di laut.'],
        ['Spora', 'Sel perkembangbiakan yang sangat kecil yang dilepaskan jamur dan paku-pakuan; spora bukan biji.'],
      ],
    },
    misconceptions: {
      en: [
        ['A dolphin lives in the sea, so it is a fish.', 'Dolphins breathe air with lungs, are warm-blooded and feed their young milk, so they are mammals. In the key, "lives in water?" is only asked after "feeds young with milk?" has already separated mammals from fish.'],
        ['A spider is an insect.', 'Insects have six legs and usually wings; spiders have eight legs and no wings. "Exactly six legs?" is the question that separates them.'],
        ['A mushroom is a plant because it grows out of the ground.', 'Mushrooms are fungi. They are not green, do not use sunlight to make food, and absorb food from decaying material instead.'],
        ['Any question works in a key as long as the answer is yes or no.', 'A question that no organism (or every organism) in the group answers "yes" to does not split the group at all, so it wastes a step. The sim refuses such a split in Build mode.'],
      ],
      id: [
        ['Lumba-lumba hidup di laut, jadi ia ikan.', 'Lumba-lumba bernapas dengan paru-paru, berdarah panas, dan menyusui anaknya, jadi ia mamalia. Dalam kunci, "hidup di air?" baru ditanyakan setelah "menyusui anaknya?" memisahkan mamalia dari ikan.'],
        ['Laba-laba adalah serangga.', 'Serangga berkaki enam dan biasanya bersayap; laba-laba berkaki delapan dan tidak bersayap. "Tepat enam kaki?" adalah pertanyaan yang memisahkan keduanya.'],
        ['Jamur adalah tumbuhan karena tumbuh dari tanah.', 'Jamur termasuk fungi. Ia tidak hijau, tidak memakai cahaya matahari untuk membuat makanan, dan menyerap makanan dari bahan yang membusuk.'],
        ['Pertanyaan apa pun bisa dipakai dalam kunci asalkan jawabannya ya atau tidak.', 'Pertanyaan yang dijawab "ya" oleh tidak satu pun (atau oleh semua) makhluk dalam kelompok tidak membagi kelompok sama sekali, sehingga membuang satu langkah. Simulasi menolak pembagian seperti itu pada mode Bangun.'],
      ],
    },
    realWorld: {
      en: [
        'Field guides for birds, insects and trees are built as dichotomous keys so that anyone can name a species without memorising thousands of pictures.',
        'Quarantine officers at ports use keys to identify pests found in shipments of fruit and timber.',
        'Doctors and laboratory staff use key-like flow charts to identify bacteria from test results (Gram stain, shape, growth on different media).',
        'The guessing game "Twenty Questions" works like a key: each good yes/no question halves what remains.',
      ],
      id: [
        'Buku panduan lapangan untuk burung, serangga, dan pohon disusun sebagai kunci determinasi agar siapa pun dapat menamai spesies tanpa menghafal ribuan gambar.',
        'Petugas karantina di pelabuhan memakai kunci untuk mengidentifikasi hama yang ditemukan pada kiriman buah dan kayu.',
        'Dokter dan petugas laboratorium memakai bagan alir mirip kunci untuk mengidentifikasi bakteri dari hasil uji (pewarnaan Gram, bentuk, pertumbuhan pada media berbeda).',
        'Permainan tebak-tebakan "Dua Puluh Pertanyaan" bekerja seperti kunci: setiap pertanyaan ya/tidak yang baik memangkas setengah kemungkinan yang tersisa.',
      ],
    },
    questions: {
      en: [
        { q: 'The mystery organism has a backbone, no feathers, does not feed its young milk, and has no scales. What is it, and which group does it belong to?', a: 'The frog, an amphibian. Among the six vertebrates, only the frog has neither feathers, nor fur and milk, nor scales; its skin is smooth and moist.' },
        { q: 'A pupil builds a key that starts with "Does it have eight legs?". Why does the sim show one group of 1 and one group of 11?', a: 'Only the spider has eight legs, so the question separates one organism and leaves eleven together. It is a legal question but a weak first step; a question that splits twelve into six and six gets to answers faster.' },
        { q: 'Why can a key use the question "Does it make flowers and fruit?" to separate the mango tree from the fern, but not "Is it green?"', a: 'Both the mango tree and the fern are green and photosynthesise, so "green?" does not separate them. Only the mango tree makes flowers, fruit and seeds; the fern reproduces with spores.' },
      ],
      id: [
        { q: 'Makhluk misterius punya tulang belakang, tidak berbulu, tidak menyusui anaknya, dan tidak bersisik. Makhluk apa itu, dan termasuk kelompok apa?', a: 'Katak, seekor amfibi. Di antara enam vertebrata, hanya katak yang tidak berbulu, tidak berambut dan menyusui, serta tidak bersisik; kulitnya licin dan lembap.' },
        { q: 'Seorang siswa membangun kunci yang dimulai dengan "Apakah kakinya delapan?". Mengapa simulasi menunjukkan satu kelompok berisi 1 dan satu kelompok berisi 11?', a: 'Hanya laba-laba yang berkaki delapan, sehingga pertanyaan itu memisahkan satu makhluk dan menyisakan sebelas bersama-sama. Pertanyaan itu sah tetapi langkah awal yang lemah; pertanyaan yang membagi dua belas menjadi enam dan enam lebih cepat sampai ke jawaban.' },
        { q: 'Mengapa kunci dapat memakai pertanyaan "Apakah ia berbunga dan berbuah?" untuk memisahkan pohon mangga dari paku-pakuan, tetapi tidak bisa memakai "Apakah ia hijau?"', a: 'Pohon mangga dan paku-pakuan sama-sama hijau dan berfotosintesis, jadi "hijau?" tidak memisahkan keduanya. Hanya pohon mangga yang berbunga, berbuah, dan berbiji; paku-pakuan berkembang biak dengan spora.' },
      ],
    },
  },
};
