// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Name the organs of the digestive system in the order food passes through them.',
      'State one job for each organ: chewing, pushing, churning, absorbing food, absorbing water.',
      'Estimate how long food stays in each organ and add up the total time in the body.',
    ],
    id: [
      'Menyebutkan organ sistem pencernaan sesuai urutan yang dilewati makanan.',
      'Menyebutkan satu tugas tiap organ: mengunyah, mendorong, mengaduk, menyerap makanan, menyerap air.',
      'Memperkirakan berapa lama makanan berada di tiap organ dan menjumlahkan total waktunya di dalam tubuh.',
    ],
  },
  tryThis: {
    en: [
      'Before pressing Step, ask: where does the bite go next? Then check.',
      'Click each organ and read its job. Which organ takes the longest? Which is the quickest?',
      'Record every organ in the lab, then add the hours. Is the total more or less than one day?',
    ],
    id: [
      'Sebelum menekan Langkah, tanyakan: ke mana gigitan makanan selanjutnya? Lalu periksa.',
      'Klik tiap organ dan baca tugasnya. Organ mana yang paling lama? Mana yang paling cepat?',
      'Catat setiap organ di lab, lalu jumlahkan jamnya. Apakah totalnya lebih atau kurang dari satu hari?',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'Your body cannot use a sandwich the way it is. The food has to be broken into pieces so tiny that they can slip into your blood. Breaking food down like this is called digestion. It happens inside one long tube that starts at your mouth and ends at your bottom. In a grown-up the tube is about 9 metres long, longer than a car, and it is folded up neatly inside you.',
        'Press Eat and the bite starts its trip. In the mouth, teeth chop it and spit makes it soft and wet. The food pipe squeezes it down to the stomach in about ten seconds. The stomach is a stretchy bag that churns the food with acid for about three hours until it is like soup. Then the soup moves slowly through the small intestine, a long thin tube, for about five hours. Here the good parts of the food pass through the tube wall into the blood, which is why a red blood vessel is drawn next to it. What is left goes into the large intestine, which takes back water for about a day. The dry leftovers leave the body. Press Step to move on, or Play to watch the whole trip, and click any organ to read its job.',
        'The times are "about" times. A glass of juice travels much faster than a big meal with meat, and everyone is a little different. The sim shows one bite moving along as one lump, but real food spreads out and mixes with the meals before and after it. It also leaves out some helpers. The liver and the pancreas squirt juices into the small intestine that help break the food down, but they are not on the food\'s path, so they are not drawn here.',
      ],
      id: [
        'Tubuhmu tidak bisa memakai roti isi begitu saja. Makanan harus dipecah menjadi bagian-bagian yang sangat kecil supaya bisa masuk ke dalam darah. Memecah makanan seperti ini disebut pencernaan. Pencernaan terjadi di dalam satu saluran panjang yang mulai dari mulut dan berakhir di anus. Pada orang dewasa saluran ini panjangnya sekitar 9 meter, lebih panjang daripada sebuah mobil, dan terlipat rapi di dalam tubuh.',
        'Tekan Makan dan gigitan makanan mulai perjalanannya. Di mulut, gigi memotongnya dan air liur membuatnya lembut dan basah. Kerongkongan meremasnya turun ke lambung dalam waktu sekitar sepuluh detik. Lambung adalah kantong lentur yang mengaduk makanan dengan asam selama sekitar tiga jam sampai menjadi seperti bubur. Lalu bubur itu bergerak perlahan melewati usus halus, saluran panjang dan tipis, selama sekitar lima jam. Di sini zat-zat baik dari makanan menembus dinding usus masuk ke darah, itulah sebabnya ada pembuluh darah merah digambar di sebelahnya. Sisanya masuk ke usus besar, yang menyerap kembali air selama sekitar satu hari. Ampas yang kering keluar dari tubuh. Tekan Langkah untuk maju, atau Putar untuk menonton seluruh perjalanan, dan klik organ mana pun untuk membaca tugasnya.',
        'Waktu yang ditampilkan adalah waktu "kira-kira". Segelas jus bergerak jauh lebih cepat daripada makan besar dengan daging, dan tiap orang sedikit berbeda. Simulasi menunjukkan satu gigitan bergerak sebagai satu gumpalan, tetapi makanan sungguhan menyebar dan bercampur dengan makanan sebelum dan sesudahnya. Simulasi juga tidak menggambar beberapa pembantu. Hati dan pankreas menyemprotkan cairan ke usus halus untuk membantu memecah makanan, tetapi keduanya tidak berada di jalur makanan, jadi tidak digambar di sini.',
      ],
    },
    figure: {
      caption: {
        en: 'The food tube from top to bottom: mouth, food pipe, stomach, small intestine (where food goes into the blood) and large intestine (where water is taken back).',
        id: 'Saluran makanan dari atas ke bawah: mulut, kerongkongan, lambung, usus halus (tempat makanan masuk ke darah), dan usus besar (tempat air diserap kembali).',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('The digestive system with labelled organs', 'Sistem pencernaan dengan nama organ')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.b{fill:none;stroke:currentColor;stroke-width:1.5;opacity:.5}.t{fill:none;stroke-linecap:round;stroke-linejoin:round}.g{stroke:currentColor;stroke-width:1;opacity:.5;stroke-dasharray:3 3}</style>
  <circle cx="120" cy="26" r="18" class="b"/>
  <path d="M90 46 Q70 60 68 120 L68 210 Q68 226 84 226 L156 226 Q172 226 172 210 L172 120 Q170 60 150 46 Z" class="b"/>
  <ellipse cx="120" cy="30" rx="6" ry="2.5" fill="#ef4444"/>
  <path d="M120 44 L120 86 L128 96" class="t" stroke="#f59e0b" stroke-width="6"/>
  <ellipse cx="136" cy="110" rx="20" ry="15" fill="#ef4444" transform="rotate(-20 136 110)"/>
  <path d="M88 192 L88 128 L156 128 L156 196 L124 204" class="t" stroke="#10b981" stroke-width="10"/>
  <path d="M120 122 L104 134 L138 142 L102 152 L138 160 L104 168 L136 176 L118 184" class="t" stroke="#f59e0b" stroke-width="7"/>
  <line x1="82" y1="130" x2="82" y2="186" stroke="#3b82f6" stroke-width="3"/>
  <line x1="124" y1="204" x2="124" y2="222" class="t" stroke="currentColor" stroke-width="4" opacity=".5"/>
  <line x1="128" y1="30" x2="196" y2="30" class="g"/>
  <text x="200" y="34"><tspan fill="#ef4444">1 </tspan>${L('Mouth: teeth chew, spit softens', 'Mulut: gigi mengunyah, air liur melembutkan')}</text>
  <line x1="122" y1="66" x2="196" y2="66" class="g"/>
  <text x="200" y="70"><tspan fill="#f59e0b">2 </tspan>${L('Food pipe: squeezes food down', 'Kerongkongan: meremas makanan turun')}</text>
  <line x1="156" y1="108" x2="196" y2="100" class="g"/>
  <text x="200" y="104"><tspan fill="#ef4444">3 </tspan>${L('Stomach: churns with acid (3 h)', 'Lambung: mengaduk dengan asam (3 jam)')}</text>
  <line x1="140" y1="150" x2="196" y2="136" class="g"/>
  <text x="200" y="140"><tspan fill="#f59e0b">4 </tspan>${L('Small intestine: good parts', 'Usus halus: zat baik')}</text>
  <text x="212" y="153">${L('go into the blood (5 h)', 'masuk ke darah (5 jam)')}</text>
  <line x1="158" y1="180" x2="196" y2="176" class="g"/>
  <text x="200" y="180"><tspan fill="#10b981">5 </tspan>${L('Large intestine: takes back', 'Usus besar: menyerap kembali')}</text>
  <text x="212" y="193">${L('water (about 1 day)', 'air (sekitar 1 hari)')}</text>
  <line x1="128" y1="216" x2="196" y2="216" class="g"/>
  <text x="200" y="220">6 ${L('Out: leftovers leave the body', 'Keluar: ampas keluar dari tubuh')}</text>
  <text x="56" y="160" fill="#3b82f6" font-size="9" transform="rotate(-90 56 160)">${L('blood vessel', 'pembuluh darah')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Digestion breaks food into pieces so small they can pass into the blood.',
        'Food travels through one long tube, always in the same order: mouth, food pipe, stomach, small intestine, large intestine.',
        'Each organ has its own job: chewing, pushing, churning, taking in the good parts, taking back water.',
        'The small intestine is where most of the good parts of food go into the blood.',
        'The whole trip takes more than a day, and most of that time is spent in the large intestine.',
      ],
      id: [
        'Pencernaan memecah makanan menjadi bagian yang sangat kecil supaya bisa masuk ke darah.',
        'Makanan melewati satu saluran panjang, selalu dengan urutan yang sama: mulut, kerongkongan, lambung, usus halus, usus besar.',
        'Setiap organ punya tugas sendiri: mengunyah, mendorong, mengaduk, mengambil zat baik, menyerap kembali air.',
        'Usus halus adalah tempat sebagian besar zat baik dari makanan masuk ke darah.',
        'Seluruh perjalanan memakan waktu lebih dari satu hari, dan sebagian besar waktunya dihabiskan di usus besar.',
      ],
    },
    vocabulary: {
      en: [
        ['Digestion', 'Breaking food down into tiny pieces that the body can use.'],
        ['Saliva (spit)', 'The watery liquid in your mouth that makes food soft and starts to break it down.'],
        ['Stomach', 'A stretchy bag that churns food with acid until it is like soup.'],
        ['Small intestine', 'A long, thin, folded tube where the good parts of food go into the blood.'],
        ['Large intestine', 'A wider tube that takes water back out of the leftovers.'],
      ],
      id: [
        ['Pencernaan', 'Memecah makanan menjadi bagian-bagian sangat kecil yang bisa dipakai tubuh.'],
        ['Air liur (ludah)', 'Cairan encer di mulutmu yang membuat makanan lembut dan mulai memecahnya.'],
        ['Lambung', 'Kantong lentur yang mengaduk makanan dengan asam sampai menjadi seperti bubur.'],
        ['Usus halus', 'Saluran panjang, tipis, dan berlipat tempat zat baik dari makanan masuk ke darah.'],
        ['Usus besar', 'Saluran yang lebih lebar yang menyerap kembali air dari sisa makanan.'],
      ],
    },
    misconceptions: {
      en: [
        ['All the digesting happens in the stomach.', 'The stomach only churns and softens the food. Most of the breaking down and almost all of the taking in happen later, in the small intestine.'],
        ['The small intestine is small.', 'It is called small because it is thin, not short. In a grown-up it is about 6 metres long, much longer than the large intestine.'],
        ['Food falls down to the stomach because of gravity.', 'The food pipe squeezes food along with its muscles. That is why you can swallow lying down, and why astronauts can eat floating in space.'],
      ],
      id: [
        ['Semua pencernaan terjadi di lambung.', 'Lambung hanya mengaduk dan melembutkan makanan. Sebagian besar pemecahan dan hampir semua penyerapan terjadi setelahnya, di usus halus.'],
        ['Usus halus itu kecil.', 'Disebut halus karena tipis, bukan karena pendek. Pada orang dewasa panjangnya sekitar 6 meter, jauh lebih panjang daripada usus besar.'],
        ['Makanan jatuh ke lambung karena gravitasi.', 'Kerongkongan meremas makanan dengan ototnya. Itu sebabnya kamu bisa menelan sambil berbaring, dan astronaut bisa makan sambil melayang di luar angkasa.'],
      ],
    },
    realWorld: {
      en: [
        'Chewing well helps the stomach: small pieces have more surface for the acid to work on, so they turn into soup faster.',
        'If you eat sweetcorn, you may spot the yellow skins a day or two later. They are too tough to digest and show how long the trip takes.',
        'Drinking enough water helps the large intestine do its job, which is why not drinking enough can make you constipated.',
        'A cow chews its food, swallows it, and later brings it back up to chew again. Grass is so hard to digest that cows need extra stomach chambers.',
      ],
      id: [
        'Mengunyah dengan baik membantu lambung: potongan kecil punya permukaan lebih luas untuk dikerjakan asam, sehingga lebih cepat menjadi bubur.',
        'Kalau kamu makan jagung, kamu mungkin melihat kulit kuningnya satu atau dua hari kemudian. Kulit itu terlalu keras untuk dicerna dan menunjukkan berapa lama perjalanannya.',
        'Minum air yang cukup membantu usus besar bekerja, itulah sebabnya kurang minum bisa membuat sembelit.',
        'Sapi mengunyah makanannya, menelannya, lalu mengembalikannya ke mulut untuk dikunyah lagi. Rumput begitu sulit dicerna sehingga sapi membutuhkan ruang lambung tambahan.',
      ],
    },
    questions: {
      en: [
        { q: 'Which organ keeps the food the longest, and which is the quickest? What is each one doing in that time?', a: 'The large intestine keeps it longest, about a day, slowly taking water back out of the leftovers. The food pipe is the quickest, about ten seconds, because its only job is to squeeze the food down to the stomach.' },
        { q: 'Watch the clock as you press Step. What does it say when the bite enters the small intestine, and what does it say at the end? Is the whole trip more or less than one day?', a: 'It says about 3 hours when the food leaves the stomach, about 8 hours when it leaves the small intestine, and about 32 hours at the end. That is more than one day. Most of the time is spent in the large intestine.' },
        { q: 'The bite gets smaller and darker as it travels. Why?', a: 'Teeth and the stomach break it up, and the small intestine takes the good parts out into the blood. What is left is only the parts the body cannot use, with the water taken back by the large intestine.' },
      ],
      id: [
        { q: 'Organ mana yang menyimpan makanan paling lama, dan mana yang paling cepat? Apa yang dilakukan masing-masing selama waktu itu?', a: 'Usus besar menyimpannya paling lama, sekitar satu hari, perlahan menyerap kembali air dari sisa makanan. Kerongkongan paling cepat, sekitar sepuluh detik, karena tugasnya hanya meremas makanan turun ke lambung.' },
        { q: 'Perhatikan jam saat kamu menekan Langkah. Berapa angkanya saat gigitan masuk usus halus, dan berapa di akhir? Apakah seluruh perjalanan lebih atau kurang dari satu hari?', a: 'Angkanya sekitar 3 jam saat makanan meninggalkan lambung, sekitar 8 jam saat meninggalkan usus halus, dan sekitar 32 jam di akhir. Itu lebih dari satu hari. Sebagian besar waktunya dihabiskan di usus besar.' },
        { q: 'Gigitan makanan menjadi lebih kecil dan lebih gelap selama perjalanan. Mengapa?', a: 'Gigi dan lambung memecahnya, dan usus halus mengambil zat baiknya ke dalam darah. Yang tersisa hanya bagian yang tidak bisa dipakai tubuh, dengan airnya diserap kembali oleh usus besar.' },
      ],
    },
  },
};
