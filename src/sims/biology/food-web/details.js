// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Identify trophic levels: producer, primary consumer, secondary consumer, top predator, decomposer.',
      'Predict cascade effects: removing one species often shifts populations several levels away.',
      'Recognize that real food webs are NOT linear chains — they branch and intertwine.',
    ],
    id: [
      'Mengidentifikasi tingkat trofik: produsen, konsumen primer, sekunder, pemangsa puncak, pengurai.',
      'Memprediksi efek kaskade: menghilangkan satu spesies sering menggeser populasi beberapa tingkat jauh.',
      'Mengenali bahwa jaring makanan nyata BUKAN rantai linear — bercabang dan berjalin.',
    ],
  },
  tryThis: {
    en: [
      'Remove the wolf — deer population spikes, vegetation crashes.',
      'Remove the grass — every layer above it collapses.',
      'Build your own simple chain by removing arrows.',
    ],
    id: [
      'Hilangkan serigala — populasi rusa melonjak, vegetasi runtuh.',
      'Hilangkan rumput — semua lapisan di atasnya runtuh.',
      'Bangun rantai sederhana sendiri dengan menghapus panah.',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'Every living thing needs energy, and almost all of that energy starts as sunlight. Plants are producers: they use sunlight, water and air to make their own food. Animals cannot do this, so they are consumers. Rabbits, deer and mice eat plants, so they are herbivores, or primary consumers. Foxes and snakes eat those animals, and the wolf eats foxes and deer, so they are carnivores higher up. Fungi and bacteria are decomposers: they break down dead plants and animals and return the nutrients to the soil for plants to use again.',
        'A food chain shows one path, such as grass → rabbit → fox. But most animals eat more than one thing, so the chains join into a food web. In this sim each arrow is drawn from the eater to its food, for example from the fox to the rabbit, meaning "fox eats rabbit". Many textbooks draw the arrow the other way, from the food to the eater, to show where the energy goes, so check which way your book uses. You can drag the animals around, and click two of them to add or remove an arrow between them.',
        'In the sim a living thing survives only while at least one of its food arrows still points to something alive. If all of its food disappears, it is marked extinct, and then the animals that depended on it may go extinct too. One change can ripple up through the web; this is called a cascade. The sim only tracks alive or extinct, not how many animals there are. In nature, losing a predator usually makes its prey become more numerous, and then the plants get overeaten; the sim cannot show that. It also ignores seasons, migration, and the fact that real animals can switch to new foods.',
      ],
      id: [
        'Setiap makhluk hidup membutuhkan energi, dan hampir semua energi itu berawal dari sinar matahari. Tumbuhan adalah produsen: tumbuhan memakai sinar matahari, air, dan udara untuk membuat makanannya sendiri. Hewan tidak bisa melakukannya, jadi hewan adalah konsumen. Kelinci, rusa, dan tikus memakan tumbuhan, sehingga disebut herbivora, atau konsumen primer. Rubah dan ular memakan hewan-hewan itu, dan serigala memakan rubah dan rusa, sehingga mereka adalah karnivora di tingkat yang lebih tinggi. Jamur dan bakteri adalah pengurai: mereka menguraikan tumbuhan dan hewan yang mati dan mengembalikan zat haranya ke tanah untuk dipakai tumbuhan lagi.',
        'Rantai makanan menunjukkan satu jalur, misalnya rumput → kelinci → rubah. Namun kebanyakan hewan memakan lebih dari satu jenis makanan, sehingga rantai-rantai itu bergabung menjadi jaring makanan. Dalam simulasi ini tiap panah digambar dari pemakan ke makanannya, misalnya dari rubah ke kelinci, yang berarti "rubah memakan kelinci". Banyak buku pelajaran menggambar panahnya terbalik, dari makanan ke pemakannya, untuk menunjukkan ke mana energi mengalir, jadi periksa arah yang dipakai bukumu. Kamu bisa menggeser hewan-hewannya, dan mengklik dua di antaranya untuk menambah atau menghapus panah di antara keduanya.',
        'Dalam simulasi, makhluk hidup bertahan hanya selama setidaknya satu panah makanannya masih menunjuk ke sesuatu yang hidup. Jika semua makanannya hilang, ia ditandai punah, dan hewan yang bergantung padanya bisa ikut punah. Satu perubahan bisa merambat ke seluruh jaring; ini disebut kaskade. Simulasi hanya mencatat hidup atau punah, bukan berapa jumlah hewannya. Di alam, hilangnya pemangsa biasanya membuat mangsanya bertambah banyak, lalu tumbuhan habis dimakan; simulasi tidak bisa menunjukkan itu. Simulasi juga mengabaikan musim, migrasi, dan kenyataan bahwa hewan sungguhan bisa beralih ke makanan baru.',
      ],
    },
    figure: {
      caption: {
        en: 'An energy pyramid for the grassland. Only about a tenth of the energy at each level is passed on to the next, so there must be far more grass than rabbits and far more rabbits than wolves. Decomposers return nutrients from every level to the soil.',
        id: 'Piramida energi padang rumput. Hanya sekitar sepersepuluh energi di tiap tingkat yang diteruskan ke tingkat berikutnya, sehingga rumput harus jauh lebih banyak daripada kelinci, dan kelinci jauh lebih banyak daripada serigala. Pengurai mengembalikan zat hara dari setiap tingkat ke tanah.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Energy pyramid of a grassland food web', 'Piramida energi jaring makanan padang rumput')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.b{font-weight:700}.s{font-size:9.5px;opacity:.75}.ar{stroke:currentColor;stroke-width:1.2;fill:none;opacity:.6}</style>
  <circle cx="40" cy="40" r="16" fill="#f59e0b" opacity=".85"/>
  <text x="40" y="70" text-anchor="middle" class="s">${L('sunlight', 'sinar matahari')}</text>
  <path d="M58 48 L92 190" class="ar" stroke="#f59e0b" marker-end="url(#a)"/>
  <polygon points="80,200 280,200 250,160 110,160" fill="#10b981" opacity=".55"/>
  <text x="180" y="184" text-anchor="middle" class="b">${L('producers: grass, tree', 'produsen: rumput, pohon')}</text>
  <polygon points="110,156 250,156 225,116 135,116" fill="#3b82f6" opacity=".55"/>
  <text x="180" y="140" text-anchor="middle" class="b">${L('herbivores: rabbit, deer, mouse', 'herbivora: kelinci, rusa, tikus')}</text>
  <polygon points="135,112 225,112 205,72 155,72" fill="#f59e0b" opacity=".6"/>
  <text x="180" y="96" text-anchor="middle" class="b">${L('carnivores: fox, snake', 'karnivora: rubah, ular')}</text>
  <polygon points="155,68 205,68 190,38 170,38" fill="#ef4444" opacity=".7"/>
  <text x="180" y="30" text-anchor="middle" class="b">${L('top predator: wolf', 'pemangsa puncak: serigala')}</text>
  <text x="290" y="182" class="s">100 ${L('units of energy', 'satuan energi')}</text>
  <text x="258" y="138" class="s">${L('about 10', 'sekitar 10')}</text>
  <text x="232" y="94" class="s">${L('about 1', 'sekitar 1')}</text>
  <text x="212" y="54" class="s">${L('about 0.1', 'sekitar 0,1')}</text>
  <path d="M232 128 L246 128" class="ar"/>
  <path d="M212 84 L228 84" class="ar"/>
  <path d="M196 48 L208 48" class="ar"/>
  <path d="M283 190 L283 150" class="ar"/>
  <path d="M283 190 L283 110" class="ar"/>
  <text x="298" y="126" class="s">${L('energy goes up,', 'energi naik,')}</text>
  <text x="298" y="138" class="s">${L('most is lost', 'sebagian besar')}</text>
  <text x="298" y="150" class="s">${L('as heat', 'hilang jadi panas')}</text>
  <circle cx="60" cy="214" r="14" fill="#8b5cf6" opacity=".7"/>
  <text x="60" y="236" text-anchor="middle" class="s">${L('decomposers', 'pengurai')}</text>
  <path d="M100 226 C180 236 260 236 300 222" class="ar" stroke="#8b5cf6"/>
  <path d="M90 222 L76 218" class="ar" stroke="#8b5cf6" marker-end="url(#a)"/>
  <text x="200" y="222" text-anchor="middle" class="s" fill="#8b5cf6">${L('dead matter from every level → nutrients back to soil', 'sisa mati dari tiap tingkat → zat hara kembali ke tanah')}</text>
  <defs><marker id="a" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="context-stroke"/></marker></defs>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Producers (plants) make food from sunlight; consumers get energy by eating other living things.',
        'A food web is many food chains joined together, because most animals eat more than one kind of food.',
        'Energy is lost at every step, so there is much less energy, and far fewer animals, at the top of the web than at the bottom.',
        'Removing one species can affect species far away in the web; this is a cascade.',
        'Decomposers recycle nutrients from dead material back to the soil so plants can grow again.',
      ],
      id: [
        'Produsen (tumbuhan) membuat makanan dari sinar matahari; konsumen mendapat energi dengan memakan makhluk hidup lain.',
        'Jaring makanan adalah banyak rantai makanan yang saling bergabung, karena kebanyakan hewan memakan lebih dari satu jenis makanan.',
        'Energi hilang pada setiap langkah, sehingga energi dan jumlah hewan di puncak jaring jauh lebih sedikit daripada di dasarnya.',
        'Menghilangkan satu spesies bisa memengaruhi spesies yang jauh di dalam jaring; ini disebut kaskade.',
        'Pengurai mendaur ulang zat hara dari bahan mati kembali ke tanah agar tumbuhan dapat tumbuh lagi.',
      ],
    },
    vocabulary: {
      en: [
        ['Producer', 'A living thing, usually a plant, that makes its own food using sunlight.'],
        ['Consumer', 'An animal that gets its energy by eating other living things.'],
        ['Herbivore', 'An animal that eats plants, such as a rabbit or a deer.'],
        ['Carnivore', 'An animal that eats other animals, such as a fox or a snake.'],
        ['Decomposer', 'A living thing such as a fungus or bacterium that breaks down dead material.'],
        ['Food chain', 'A single line showing who eats whom, such as grass → rabbit → fox.'],
        ['Food web', 'Many food chains linked together in one picture.'],
        ['Extinct', 'When a species has no living members left.'],
      ],
      id: [
        ['Produsen', 'Makhluk hidup, biasanya tumbuhan, yang membuat makanannya sendiri dengan sinar matahari.'],
        ['Konsumen', 'Hewan yang mendapat energi dengan memakan makhluk hidup lain.'],
        ['Herbivora', 'Hewan pemakan tumbuhan, seperti kelinci atau rusa.'],
        ['Karnivora', 'Hewan pemakan hewan lain, seperti rubah atau ular.'],
        ['Pengurai', 'Makhluk hidup seperti jamur atau bakteri yang menguraikan bahan mati.'],
        ['Rantai makanan', 'Satu garis yang menunjukkan siapa memakan siapa, seperti rumput → kelinci → rubah.'],
        ['Jaring makanan', 'Banyak rantai makanan yang saling terhubung dalam satu gambar.'],
        ['Punah', 'Keadaan ketika suatu spesies tidak lagi memiliki anggota yang hidup.'],
      ],
    },
    misconceptions: {
      en: [
        ['The top predator is the most important animal, so there should be the most of them.', 'There are always the fewest top predators. Most of the energy at each level is used up or lost as heat, so only a little is left for the level above.'],
        ['Plants get their food from the soil.', 'Plants make their own food from sunlight, water and carbon dioxide from the air. Soil gives them water and minerals, but not food energy.'],
        ['Removing a species only affects the animals that eat it.', 'It also affects what it ate. Without wolves, deer become more numerous and eat more plants, and other animals that need those plants suffer. Effects travel both up and down the web.'],
        ['The arrow in a food web shows which animal is bigger or stronger.', 'The arrow shows who eats whom, or where the energy goes. In this sim it points from the eater to its food; in many books it points from the food to the eater.'],
      ],
      id: [
        ['Pemangsa puncak adalah hewan terpenting, jadi jumlahnya seharusnya paling banyak.', 'Pemangsa puncak selalu paling sedikit. Sebagian besar energi di tiap tingkat habis terpakai atau hilang sebagai panas, sehingga hanya sedikit yang tersisa untuk tingkat di atasnya.'],
        ['Tumbuhan mendapat makanan dari tanah.', 'Tumbuhan membuat makanannya sendiri dari sinar matahari, air, dan karbon dioksida dari udara. Tanah memberi air dan mineral, tetapi bukan energi makanan.'],
        ['Menghilangkan satu spesies hanya memengaruhi hewan yang memakannya.', 'Ia juga memengaruhi apa yang dimakannya. Tanpa serigala, rusa bertambah banyak dan memakan lebih banyak tumbuhan, dan hewan lain yang membutuhkan tumbuhan itu ikut menderita. Pengaruhnya merambat ke atas dan ke bawah jaring.'],
        ['Panah pada jaring makanan menunjukkan hewan mana yang lebih besar atau lebih kuat.', 'Panah menunjukkan siapa memakan siapa, atau ke mana energi mengalir. Dalam simulasi ini panah mengarah dari pemakan ke makanannya; di banyak buku panah mengarah dari makanan ke pemakannya.'],
      ],
    },
    realWorld: {
      en: [
        'When wolves were brought back to Yellowstone National Park in 1995, elk changed their grazing habits and willow and aspen trees along the rivers began to recover.',
        'Sea otters eat sea urchins; where otters were hunted out, urchins multiplied and ate whole kelp forests down to bare rock.',
        'In rice fields, snakes and owls eat rats; when farmers kill the snakes, rat numbers rise and more rice is lost.',
        'A compost heap is a decomposer at work: worms, fungi and bacteria turn kitchen scraps into soil nutrients.',
      ],
      id: [
        'Ketika serigala dikembalikan ke Taman Nasional Yellowstone pada 1995, rusa elk mengubah kebiasaan merumputnya dan pohon willow serta aspen di tepi sungai mulai pulih.',
        'Berang-berang laut memakan bulu babi; di tempat berang-berang habis diburu, bulu babi berkembang biak dan memakan hutan rumput laut sampai tersisa batu gundul.',
        'Di sawah, ular dan burung hantu memakan tikus; ketika petani membunuh ular, jumlah tikus naik dan padi yang hilang semakin banyak.',
        'Tumpukan kompos adalah pengurai yang sedang bekerja: cacing, jamur, dan bakteri mengubah sisa dapur menjadi zat hara tanah.',
      ],
    },
    questions: {
      en: [
        { q: 'In the sim, which animals would go extinct if the grass disappeared? Follow the arrows.', a: 'Rabbit and mouse eat only grass, so they go extinct. Deer survives because it also eats the tree. Fox and snake eat only rabbit and mouse, so they go extinct next. The wolf survives on deer. One missing plant removes four animals.' },
        { q: 'Why are there many more rabbits than wolves in a grassland?', a: 'Each step up the web passes on only about a tenth of the energy. Rabbits live on plants, which have lots of energy; wolves live on animals that live on animals, so very little energy reaches them, and only a few wolves can be fed.' },
        { q: 'What do decomposers do, and what would happen to the grassland without them?', a: 'They break down dead plants and animals and return nutrients to the soil. Without them, dead material would pile up, the nutrients would stay locked inside it, and the soil would become too poor for grass and trees to grow well.' },
      ],
      id: [
        { q: 'Dalam simulasi, hewan apa yang akan punah jika rumput hilang? Ikuti panahnya.', a: 'Kelinci dan tikus hanya makan rumput, jadi keduanya punah. Rusa bertahan karena juga makan pohon. Rubah dan ular hanya makan kelinci dan tikus, jadi keduanya punah berikutnya. Serigala bertahan dengan memakan rusa. Satu tumbuhan yang hilang menghapus empat hewan.' },
        { q: 'Mengapa kelinci jauh lebih banyak daripada serigala di padang rumput?', a: 'Setiap langkah naik dalam jaring hanya meneruskan sekitar sepersepuluh energi. Kelinci hidup dari tumbuhan, yang energinya banyak; serigala hidup dari hewan yang hidup dari hewan, sehingga energi yang sampai ke serigala sangat sedikit, dan hanya beberapa serigala yang bisa diberi makan.' },
        { q: 'Apa yang dilakukan pengurai, dan apa yang terjadi pada padang rumput tanpa mereka?', a: 'Pengurai menguraikan tumbuhan dan hewan yang mati dan mengembalikan zat hara ke tanah. Tanpa mereka, bahan mati akan menumpuk, zat haranya tetap terkunci di dalamnya, dan tanah menjadi terlalu miskin untuk rumput dan pohon tumbuh dengan baik.' },
      ],
    },
  },
};
