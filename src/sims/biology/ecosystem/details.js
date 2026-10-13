// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Connect individual rules to oscillating populations.',
      'Recognize that predator booms lag prey booms.',
      'Find conditions that lead to extinction.',
    ],
    id: [
      'Mengaitkan aturan individu dengan osilasi populasi.',
      'Mengenali bahwa lonjakan pemangsa mengikuti lonjakan mangsa.',
      'Menemukan kondisi yang berujung kepunahan.',
    ],
  },
  tryThis: {
    en: [
      'Drop fox energy gain — does the system collapse?',
      'Lower grass regrowth — what happens to rabbits?',
      'Crank predator reproduction high — who survives long-term?',
    ],
    id: [
      'Turunkan energi yang didapat rubah — apakah sistem runtuh?',
      'Turunkan laju tumbuh rumput — apa yang terjadi pada kelinci?',
      'Naikkan reproduksi rubah tinggi — siapa yang bertahan jangka panjang?',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'In a meadow, grass grows using sunlight, rabbits eat the grass, and foxes eat the rabbits. This is a food chain, and energy moves along it in one direction. Each link needs the one below it: no grass means no rabbits, and no rabbits means no foxes. The sim is a small world of this kind on a grid of 50 by 30 squares. Green squares are grass, pale dots are rabbits and red squares are foxes, and the graph in the corner counts how many rabbits and foxes are alive.',
        'Every animal in the sim follows a few simple rules. Each turn it moves one square in a random direction and loses one unit of energy, like getting hungry. A rabbit that lands on a grassy square eats it and gains energy, and the square turns bare until the grass regrows. A fox that lands on a rabbit eats it and gains a larger chunk of energy. An animal whose energy reaches zero dies, and an animal with plenty of energy splits in two, giving half its energy to its young. Nobody tells the populations what to do; the rise and fall of the graph comes only from these rules.',
        'Watch the two lines on the graph. When grass is plentiful the rabbits multiply fast. Lots of rabbits means easy meals for foxes, so a little later the fox line climbs too. Many foxes then eat the rabbits faster than they can breed, the rabbit line falls, and soon the hungry foxes start to die off. With fewer foxes the rabbits recover, and the cycle begins again. The fox peak always comes after the rabbit peak, because foxes can only increase once there are rabbits to eat. The sliders change the rules: faster grass regrowth feeds more rabbits, more energy per rabbit lets foxes survive longer between meals, and the two reproduction sliders set how much energy an animal needs before it can have young.',
        'This is a toy ecosystem, so it leaves a lot out. The animals wander at random instead of hunting or hiding, they have no age and never die of old age, every rabbit and fox is identical, there are no seasons or diseases, and the world has only three kinds of living thing. Because the rules include chance, two runs with the same settings never match exactly, and sometimes one species dies out just from bad luck. Even so, the same boom-and-bust pattern shows up in real predator and prey records, which is why ecologists use models like this one.',
      ],
      id: [
        'Di sebuah padang, rumput tumbuh memakai cahaya matahari, kelinci memakan rumput, dan rubah memakan kelinci. Inilah rantai makanan, dan energi bergerak sepanjang rantai itu dalam satu arah. Setiap mata rantai membutuhkan mata rantai di bawahnya: tanpa rumput tidak ada kelinci, dan tanpa kelinci tidak ada rubah. Simulasi ini adalah dunia kecil semacam itu pada kisi 50 kali 30 petak. Petak hijau adalah rumput, titik pucat adalah kelinci, dan kotak merah adalah rubah, sedangkan grafik di sudut menghitung berapa kelinci dan rubah yang hidup.',
        'Setiap hewan di simulasi mengikuti beberapa aturan sederhana. Tiap giliran ia bergerak satu petak ke arah acak dan kehilangan satu satuan energi, seperti menjadi lapar. Kelinci yang mendarat di petak berumput memakannya dan mendapat energi, dan petak itu menjadi gundul sampai rumputnya tumbuh lagi. Rubah yang mendarat di petak berisi kelinci memakannya dan mendapat energi yang lebih besar. Hewan yang energinya mencapai nol mati, dan hewan yang energinya berlimpah membelah menjadi dua, memberikan separuh energinya kepada anaknya. Tidak ada yang memberi perintah kepada populasi; naik-turunnya grafik hanya berasal dari aturan-aturan ini.',
        'Perhatikan dua garis pada grafik. Saat rumput melimpah, kelinci berkembang biak dengan cepat. Banyaknya kelinci berarti makanan mudah bagi rubah, sehingga sedikit kemudian garis rubah juga naik. Banyaknya rubah lalu memakan kelinci lebih cepat daripada kelinci beranak, garis kelinci turun, dan tak lama rubah yang kelaparan mulai mati. Dengan rubah yang lebih sedikit, kelinci pulih, dan siklus dimulai lagi. Puncak rubah selalu datang setelah puncak kelinci, karena rubah hanya bisa bertambah jika ada kelinci untuk dimakan. Slider mengubah aturannya: rumput yang tumbuh lebih cepat memberi makan lebih banyak kelinci, energi per kelinci yang lebih besar membuat rubah bertahan lebih lama di antara dua makan, dan dua slider reproduksi mengatur berapa energi yang dibutuhkan hewan sebelum bisa beranak.',
        'Ini ekosistem mainan, jadi banyak hal ditinggalkan. Hewan berkeliaran secara acak, bukan berburu atau bersembunyi, mereka tidak punya umur dan tidak pernah mati karena tua, setiap kelinci dan rubah identik, tidak ada musim atau penyakit, dan dunianya hanya punya tiga jenis makhluk hidup. Karena aturannya melibatkan kebetulan, dua simulasi dengan pengaturan yang sama tidak pernah persis sama, dan kadang satu spesies punah hanya karena nasib buruk. Meski begitu, pola naik-turun yang sama muncul pada catatan pemangsa dan mangsa sungguhan, dan itulah sebabnya ahli ekologi memakai model seperti ini.',
      ],
    },
    figure: {
      caption: {
        en: 'Top: energy flows one way along the food chain, and every animal spends energy just by living. Bottom: the fox population (red) rises and falls a little after the rabbit population (yellow), because foxes can only increase once there are many rabbits to eat.',
        id: 'Atas: energi mengalir satu arah sepanjang rantai makanan, dan setiap hewan menghabiskan energi hanya untuk hidup. Bawah: populasi rubah (merah) naik dan turun sedikit setelah populasi kelinci (kuning), karena rubah hanya bisa bertambah jika kelinci yang bisa dimakan sudah banyak.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Food chain energy flow and predator-prey population cycles', 'Aliran energi rantai makanan dan siklus populasi pemangsa-mangsa')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.s{font-size:10px}.m{fill:none;stroke:currentColor;stroke-width:1.4}</style>
  <circle cx="34" cy="34" r="12" fill="#f59e0b" opacity=".9"/>
  <text x="18" y="62" class="s">${L('sun', 'matahari')}</text>
  <path d="M50 34 L74 34" class="m" marker-end="url(#a)"/>
  <rect x="80" y="20" width="60" height="28" rx="6" fill="#10b981" opacity=".85"/>
  <text x="92" y="39" fill="#fff" font-weight="700">${L('grass', 'rumput')}</text>
  <path d="M144 34 L168 34" class="m" marker-end="url(#a)"/>
  <rect x="174" y="20" width="60" height="28" rx="6" fill="#f59e0b" opacity=".9"/>
  <text x="182" y="39" fill="#fff" font-weight="700">${L('rabbit', 'kelinci')}</text>
  <path d="M238 34 L262 34" class="m" marker-end="url(#a)"/>
  <rect x="268" y="20" width="60" height="28" rx="6" fill="#ef4444" opacity=".9"/>
  <text x="284" y="39" fill="#fff" font-weight="700">${L('fox', 'rubah')}</text>
  <text x="80" y="62" class="s">${L('regrows each turn', 'tumbuh lagi tiap giliran')}</text>
  <text x="166" y="62" class="s">${L('eats grass: +energy', 'makan rumput: +energi')}</text>
  <text x="262" y="62" class="s">${L('eats rabbit: +energy', 'makan kelinci: +energi')}</text>
  <text x="166" y="76" class="s">${L('−1 energy every turn', '−1 energi tiap giliran')}</text>
  <text x="262" y="76" class="s">${L('−1 energy every turn', '−1 energi tiap giliran')}</text>
  <line x1="30" y1="222" x2="330" y2="222" class="m"/>
  <line x1="30" y1="130" x2="30" y2="222" class="m"/>
  <polyline fill="none" stroke="#f59e0b" stroke-width="2.4" points="30,180 45,159.4 60,146.7 67.5,145 75,146.7 90,159.4 105,180 120,200.6 135,213.3 142.5,215 150,213.3 165,200.6 180,180 195,159.4 210,146.7 217.5,145 225,146.7 240,159.4 255,180 270,200.6 285,213.3 292.5,215 300,213.3 315,200.6 330,180"/>
  <polyline fill="none" stroke="#ef4444" stroke-width="2.4" points="30,210 45,205.2 60,192.7 75,177.3 90,164.8 105,160 120,164.8 135,177.3 150,192.7 165,205.2 180,210 195,205.2 210,192.7 225,177.3 240,164.8 255,160 270,164.8 285,177.3 300,192.7 315,205.2 330,210"/>
  <line x1="67.5" y1="140" x2="67.5" y2="150" stroke="#f59e0b" stroke-width="1.5"/>
  <line x1="105" y1="140" x2="105" y2="160" stroke="#ef4444" stroke-width="1.5"/>
  <path d="M69 142 L103 142" class="m" marker-end="url(#a)"/>
  <text x="112" y="146" class="s">${L('fox peak comes later', 'puncak rubah datang kemudian')}</text>
  <text x="200" y="128" fill="#f59e0b" class="s">${L('rabbits', 'kelinci')}</text>
  <text x="250" y="128" fill="#ef4444" class="s">${L('foxes', 'rubah')}</text>
  <text x="2" y="176" class="s" transform="rotate(-90 10 176)">${L('how many', 'jumlah')}</text>
  <text x="150" y="236" class="s">${L('time →', 'waktu →')}</text>
  <text x="112" y="100" class="s">${L('many rabbits → more foxes → fewer rabbits → fewer foxes → ...', 'banyak kelinci → rubah bertambah → kelinci berkurang → rubah berkurang → ...')}</text>
  <defs><marker id="a" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="context-stroke"/></marker></defs>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Energy flows one way along a food chain: from the sun to grass, to rabbits, to foxes.',
        'Every animal uses up energy just by living, so it must keep eating or it dies.',
        'Predator and prey numbers rise and fall in cycles, and the predator peak comes after the prey peak.',
        'Simple rules for each animal are enough to produce these population waves; nobody controls them from above.',
        'If food runs out or predators eat too fast, a species can die out, and the sim shows this happening by chance too.',
      ],
      id: [
        'Energi mengalir satu arah sepanjang rantai makanan: dari matahari ke rumput, ke kelinci, ke rubah.',
        'Setiap hewan menghabiskan energi hanya untuk hidup, sehingga harus terus makan atau mati.',
        'Jumlah pemangsa dan mangsa naik-turun dalam siklus, dan puncak pemangsa datang setelah puncak mangsa.',
        'Aturan sederhana untuk tiap hewan sudah cukup menghasilkan gelombang populasi ini; tidak ada yang mengendalikannya dari atas.',
        'Jika makanan habis atau pemangsa makan terlalu cepat, suatu spesies bisa punah, dan simulasi menunjukkan ini bisa terjadi karena kebetulan juga.',
      ],
    },
    vocabulary: {
      en: [
        ['Ecosystem', 'All the living things in an area together with their surroundings, such as soil, water and sunlight.'],
        ['Food chain', 'A line showing who eats whom, such as grass → rabbit → fox; the arrows point the way energy moves.'],
        ['Producer', 'A living thing that makes its own food from sunlight, such as grass.'],
        ['Consumer', 'An animal that gets its energy by eating other living things; rabbits are primary consumers and foxes are secondary consumers.'],
        ['Predator and prey', 'A predator is an animal that hunts and eats other animals (the fox); the animal it eats is the prey (the rabbit).'],
        ['Population', 'The number of one kind of living thing in an area, such as all the rabbits in the meadow.'],
        ['Carrying capacity', 'The largest population an area can feed for a long time.'],
        ['Extinction', 'When the last member of a species dies, so the population falls to zero and cannot recover.'],
      ],
      id: [
        ['Ekosistem', 'Semua makhluk hidup di suatu daerah bersama lingkungannya, seperti tanah, air, dan cahaya matahari.'],
        ['Rantai makanan', 'Garis yang menunjukkan siapa memakan siapa, misalnya rumput → kelinci → rubah; panahnya menunjukkan arah perpindahan energi.'],
        ['Produsen', 'Makhluk hidup yang membuat makanannya sendiri dari cahaya matahari, seperti rumput.'],
        ['Konsumen', 'Hewan yang mendapat energi dengan memakan makhluk hidup lain; kelinci adalah konsumen tingkat pertama dan rubah konsumen tingkat kedua.'],
        ['Pemangsa dan mangsa', 'Pemangsa adalah hewan yang memburu dan memakan hewan lain (rubah); hewan yang dimakannya adalah mangsa (kelinci).'],
        ['Populasi', 'Jumlah satu jenis makhluk hidup di suatu daerah, misalnya semua kelinci di padang.'],
        ['Daya dukung', 'Populasi terbesar yang dapat diberi makan oleh suatu daerah untuk waktu yang lama.'],
        ['Kepunahan', 'Ketika anggota terakhir suatu spesies mati, sehingga populasinya menjadi nol dan tidak bisa pulih.'],
      ],
    },
    misconceptions: {
      en: [
        ['More predators is always bad for the prey, so removing foxes would help the rabbits.', 'Without foxes the rabbits multiply until they strip the grass, and then they starve in huge numbers. Try a run with very low fox energy and watch what happens to the grass and rabbits.'],
        ['Populations stay steady unless something disturbs them.', 'Even with nothing changing from outside, predator and prey numbers naturally swing up and down, because each population reacts to the other with a delay.'],
        ['The top of the food chain gets the most energy.', 'Energy is lost at every step as animals move and keep warm. That is why there are far fewer foxes than rabbits, and far fewer rabbits than blades of grass.'],
        ['If the sim shows a species dying out, the settings must have been wrong.', 'Chance plays a part. With small populations a few unlucky turns can finish a species even when the settings would usually let it survive, just as in small real habitats.'],
      ],
      id: [
        ['Pemangsa yang lebih banyak selalu buruk bagi mangsa, jadi menyingkirkan rubah akan menolong kelinci.', 'Tanpa rubah, kelinci berkembang biak sampai menghabiskan rumput, lalu mati kelaparan dalam jumlah besar. Coba jalankan dengan energi rubah sangat rendah dan perhatikan apa yang terjadi pada rumput dan kelinci.'],
        ['Populasi tetap stabil kecuali ada gangguan.', 'Bahkan tanpa perubahan dari luar, jumlah pemangsa dan mangsa secara alami berayun naik-turun, karena tiap populasi menanggapi yang lain dengan jeda waktu.'],
        ['Puncak rantai makanan mendapat energi paling banyak.', 'Energi hilang di setiap langkah saat hewan bergerak dan menjaga kehangatan tubuh. Itulah sebabnya rubah jauh lebih sedikit daripada kelinci, dan kelinci jauh lebih sedikit daripada helai rumput.'],
        ['Jika simulasi menunjukkan suatu spesies punah, pengaturannya pasti salah.', 'Kebetulan ikut berperan. Pada populasi kecil, beberapa giliran yang sial bisa menghabisi suatu spesies meskipun pengaturannya biasanya memungkinkan ia bertahan, sama seperti di habitat kecil sungguhan.'],
      ],
    },
    realWorld: {
      en: [
        'Fur-trade records from the Hudson\'s Bay Company show snowshoe hare and lynx numbers in Canada rising and falling together in roughly ten-year cycles, with the lynx peak trailing the hare peak.',
        'When wolves were removed from Yellowstone National Park, elk numbers soared and young trees along rivers were eaten away; after wolves were brought back in 1995 the vegetation began to recover.',
        'Rabbits released in Australia in the 1800s had no natural predators there, multiplied into the hundreds of millions and stripped grazing land bare.',
        'Fishing quotas are set using predator-prey models like this one, so that enough fish are left to breed and the population does not crash.',
      ],
      id: [
        'Catatan perdagangan bulu dari Hudson\'s Bay Company menunjukkan jumlah kelinci salju dan lynx di Kanada naik-turun bersama dalam siklus sekitar sepuluh tahun, dengan puncak lynx menyusul puncak kelinci.',
        'Ketika serigala disingkirkan dari Taman Nasional Yellowstone, jumlah rusa elk melonjak dan pohon-pohon muda di tepi sungai habis dimakan; setelah serigala dikembalikan pada 1995, tumbuhannya mulai pulih.',
        'Kelinci yang dilepas di Australia pada tahun 1800-an tidak punya pemangsa alami di sana, berkembang biak hingga ratusan juta, dan menggunduli lahan penggembalaan.',
        'Kuota penangkapan ikan ditetapkan memakai model pemangsa-mangsa seperti ini, agar ikan yang tersisa cukup untuk berkembang biak dan populasinya tidak runtuh.',
      ],
    },
    questions: {
      en: [
        { q: 'On the graph, the rabbit line has just reached its highest point. What do you expect the fox line to do over the next few turns, and why?', a: 'It should keep rising for a while. With so many rabbits around, foxes find food easily, gain energy and reproduce. Only after the foxes have eaten many rabbits does the rabbit line fall, and then the fox line follows it down.' },
        { q: 'You set grass regrowth to almost zero. Predict what happens to the rabbits first, and then to the foxes.', a: 'The rabbits run out of food, lose one energy each turn without replacing it, and die off. Soon the foxes have nothing to eat and die out as well. Removing the bottom of the food chain eventually empties the whole chain.' },
        { q: 'A fox needs more than 30 energy to reproduce and gains 20 energy from each rabbit, losing 1 energy per turn. Roughly how many rabbits must a fox catch before it can have young, if it starts with 15 energy?', a: 'One rabbit takes it to about 35, which is above 30, so one catch is enough if it happens quickly. If the fox wanders for many turns without eating, it loses energy and may need a second rabbit, or starve first. This is why low fox energy gain in the sim often makes the foxes die out.' },
      ],
      id: [
        { q: 'Pada grafik, garis kelinci baru saja mencapai titik tertinggi. Menurutmu apa yang terjadi pada garis rubah dalam beberapa giliran berikutnya, dan mengapa?', a: 'Garis rubah akan terus naik untuk sementara. Dengan kelinci yang begitu banyak, rubah mudah mendapat makanan, memperoleh energi, dan beranak. Baru setelah rubah memakan banyak kelinci, garis kelinci turun, lalu garis rubah menyusul turun.' },
        { q: 'Kamu mengatur pertumbuhan rumput hampir nol. Prediksikan apa yang terjadi pada kelinci lebih dulu, lalu pada rubah.', a: 'Kelinci kehabisan makanan, kehilangan satu energi tiap giliran tanpa penggantinya, dan mati. Tak lama rubah tidak punya apa pun untuk dimakan dan ikut punah. Menghilangkan dasar rantai makanan akhirnya mengosongkan seluruh rantai.' },
        { q: 'Seekor rubah membutuhkan energi lebih dari 30 untuk beranak dan mendapat 20 energi dari tiap kelinci, sambil kehilangan 1 energi tiap giliran. Kira-kira berapa kelinci yang harus ditangkap rubah sebelum bisa beranak, jika energi awalnya 15?', a: 'Satu kelinci membawanya ke sekitar 35, di atas 30, jadi satu tangkapan sudah cukup jika terjadi dengan cepat. Jika rubah berkeliaran lama tanpa makan, energinya berkurang dan mungkin perlu kelinci kedua, atau mati kelaparan lebih dulu. Itulah sebabnya energi rubah yang rendah di simulasi sering membuat rubah punah.' },
      ],
    },
  },
};
