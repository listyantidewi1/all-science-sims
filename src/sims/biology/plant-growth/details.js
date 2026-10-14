// Long-form text for the sim page aside, written for the teacher.
export default {
  objectives: {
    en: [
      'Name water and light as two things a plant needs to grow.',
      'Predict what happens with too little or too much water, or no light, and check by observing.',
      'Run a fair test: change one thing between the two pots and keep everything else the same.',
    ],
    id: [
      'Menyebutkan air dan cahaya sebagai dua hal yang dibutuhkan tumbuhan untuk tumbuh.',
      'Memprediksi apa yang terjadi jika air terlalu sedikit, terlalu banyak, atau tanpa cahaya, lalu mengecek dengan mengamati.',
      'Melakukan uji yang adil: ubah satu hal saja antara dua pot dan samakan yang lain.',
    ],
  },
  tryThis: {
    en: [
      'Give both pots sun, but give Pot A no water. Guess first: which one sprouts?',
      'Give both pots some water, but keep Pot B in the dark. Press Next day ten times. What happens?',
      'Find the best mix of water and light. Record the height after 10 days in the lab table.',
    ],
    id: [
      'Beri kedua pot sinar matahari, tapi Pot A tanpa air. Tebak dulu: mana yang tumbuh?',
      'Beri kedua pot sedikit air, tapi Pot B di tempat gelap. Tekan Hari berikutnya sepuluh kali. Apa yang terjadi?',
      'Cari campuran air dan cahaya terbaik. Catat tinggi setelah 10 hari di tabel lab.',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'A seed is a tiny plant packed in a box with its own lunch. It waits in the soil until it gets water. Water wakes the seed up, it swells, and a root pushes down while a shoot pushes up. The shoot does not need light to start, because the seed is still eating its packed lunch. But soon the lunch runs out. From then on the plant makes its own food in its green leaves, and to do that it needs light. A plant kept in the dark grows pale and thin and then dies.',
        'In the sim you choose how much water and how much light each pot gets. Press Next day and the sim adds one day. With no water, the seed never sprouts. With some water and sun, it sprouts after two days and grows about 2 cm a day. The ruler shows its height and the words under the pot say if it is healthy, wilted or dead. Shade slows it down. Lots of water looks kind but after a few days the roots sit in soggy soil and cannot get air, so the plant wilts. In the dark the leaves turn pale yellow, and after a few days the plant gives up. A healthy plant that reaches 20 cm grows a flower.',
        'The two pots let you do a fair test. Change only one thing, like the water, and keep the light the same, so you know what made the difference. The sim keeps things simple on purpose. Real plants also need warmth, air and good soil, and real seeds are not all the same; a few may not sprout even with perfect care. Real plants do not grow the same amount every day either. The rules in the sim are a tidy version of what gardeners see.',
      ],
      id: [
        'Biji adalah tumbuhan kecil yang terbungkus dalam kotak bersama bekal makanannya. Ia menunggu di dalam tanah sampai mendapat air. Air membangunkan biji, biji mengembang, lalu akar mendorong ke bawah dan tunas mendorong ke atas. Tunas belum butuh cahaya untuk mulai, karena biji masih memakan bekalnya. Tetapi bekalnya segera habis. Sejak itu tumbuhan membuat makanannya sendiri di daun yang hijau, dan untuk itu ia butuh cahaya. Tumbuhan yang ditaruh di tempat gelap tumbuh pucat dan kurus, lalu mati.',
        'Di sim ini kamu memilih berapa banyak air dan cahaya untuk tiap pot. Tekan Hari berikutnya dan sim menambah satu hari. Tanpa air, biji tidak pernah bertunas. Dengan sedikit air dan sinar matahari, biji bertunas setelah dua hari dan tumbuh sekitar 2 cm sehari. Penggaris menunjukkan tingginya dan tulisan di bawah pot mengatakan apakah tanaman sehat, layu, atau mati. Tempat teduh membuatnya lebih lambat. Air yang banyak tampak baik, tetapi setelah beberapa hari akarnya terendam tanah yang becek dan tidak bisa mendapat udara, sehingga tanaman layu. Di tempat gelap daunnya menjadi kuning pucat, dan setelah beberapa hari tanaman menyerah. Tanaman sehat yang mencapai 20 cm akan berbunga.',
        'Dua pot membuatmu bisa melakukan uji yang adil. Ubah satu hal saja, misalnya air, dan samakan cahayanya, supaya kamu tahu apa yang membuat perbedaan. Sim ini sengaja dibuat sederhana. Tumbuhan sungguhan juga butuh kehangatan, udara, dan tanah yang baik, dan biji sungguhan tidak semuanya sama; beberapa mungkin tidak bertunas walau dirawat dengan sempurna. Tumbuhan sungguhan juga tidak tumbuh dengan jumlah yang sama setiap hari. Aturan di sim adalah versi rapi dari yang dilihat para tukang kebun.',
      ],
    },
    figure: {
      caption: {
        en: 'What a plant needs. Water goes in through the roots. Light is caught by the green leaves to make food. Too much water or no light makes the plant wilt.',
        id: 'Yang dibutuhkan tumbuhan. Air masuk lewat akar. Cahaya ditangkap daun hijau untuk membuat makanan. Air terlalu banyak atau tanpa cahaya membuat tumbuhan layu.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('A healthy plant and what it needs, next to a wilted one', 'Tumbuhan sehat dan kebutuhannya, di samping yang layu')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.p{fill:none;stroke:currentColor;stroke-width:1.5;opacity:.6}.st{fill:none;stroke:#10b981;stroke-width:4;stroke-linecap:round}.lf{fill:#10b981}.a{stroke-width:2.5;fill:none}</style>
  <text x="110" y="18" text-anchor="middle" font-weight="bold">${L('Water + light = healthy', 'Air + cahaya = sehat')}</text>
  <circle cx="40" cy="48" r="14" fill="#f59e0b"/>
  <line x1="60" y1="56" x2="92" y2="84" class="a" stroke="#f59e0b" marker-end="url(#pa)"/>
  <line x1="56" y1="70" x2="86" y2="104" class="a" stroke="#f59e0b" marker-end="url(#pa)"/>
  <text x="18" y="80" fill="#f59e0b">${L('light', 'cahaya')}</text>
  <path d="M80 170 L140 170 L132 210 L88 210 Z" class="p"/>
  <rect x="84" y="166" width="52" height="8" fill="currentColor" opacity=".35"/>
  <path d="M110 166 L110 70" class="st"/>
  <ellipse cx="96" cy="130" rx="14" ry="6" class="lf" transform="rotate(-30 96 130)"/>
  <ellipse cx="124" cy="110" rx="14" ry="6" class="lf" transform="rotate(30 124 110)"/>
  <ellipse cx="97" cy="92" rx="12" ry="5" class="lf" transform="rotate(-30 97 92)"/>
  <circle cx="110" cy="64" r="8" fill="#ef4444"/>
  <path d="M110 174 L110 196 M110 180 L98 194 M110 180 L122 196" stroke="#f59e0b" stroke-width="2" fill="none" opacity=".8"/>
  <text x="150" y="196" fill="#f59e0b" font-size="10">${L('roots', 'akar')}</text>
  <path d="M40 150 Q44 142 48 150 Q48 158 44 158 Q40 158 40 150 Z" fill="#3b82f6"/>
  <path d="M52 162 Q56 154 60 162 Q60 170 56 170 Q52 170 52 162 Z" fill="#3b82f6"/>
  <line x1="62" y1="176" x2="86" y2="190" class="a" stroke="#3b82f6" marker-end="url(#pa)"/>
  <text x="14" y="184" fill="#3b82f6">${L('water', 'air')}</text>
  <text x="110" y="228" text-anchor="middle" font-size="10">${L('leaves use light to make food', 'daun memakai cahaya untuk membuat makanan')}</text>
  <text x="270" y="18" text-anchor="middle" font-weight="bold">${L('No light or soggy soil = wilted', 'Tanpa cahaya atau tanah becek = layu')}</text>
  <path d="M240 170 L300 170 L292 210 L248 210 Z" class="p"/>
  <rect x="244" y="166" width="52" height="8" fill="#3b82f6" opacity=".5"/>
  <path d="M270 166 Q270 110 300 100 Q318 96 322 112" fill="none" stroke="#f59e0b" stroke-width="4" stroke-linecap="round" opacity=".8"/>
  <ellipse cx="262" cy="134" rx="12" ry="5" fill="#f59e0b" opacity=".7" transform="rotate(40 262 134)"/>
  <ellipse cx="296" cy="106" rx="12" ry="5" fill="#f59e0b" opacity=".7" transform="rotate(60 296 106)"/>
  <ellipse cx="322" cy="124" rx="10" ry="4" fill="#f59e0b" opacity=".7" transform="rotate(80 322 124)"/>
  <text x="270" y="60" text-anchor="middle" font-size="10">${L('dark: leaves go pale yellow', 'gelap: daun menjadi kuning pucat')}</text>
  <text x="270" y="228" text-anchor="middle" font-size="10">${L('too much water: roots cannot get air', 'air terlalu banyak: akar tidak dapat udara')}</text>
  <defs><marker id="pa" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="context-stroke"/></marker></defs>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'A seed needs water to sprout, and the young plant needs light to keep growing.',
        'Green leaves use light to make the plant\'s food, so a plant in the dark goes pale and dies.',
        'Too much water is bad too: soggy soil stops the roots from getting air.',
        'In a fair test you change only one thing and keep everything else the same.',
      ],
      id: [
        'Biji butuh air untuk bertunas, dan tumbuhan muda butuh cahaya untuk terus tumbuh.',
        'Daun hijau memakai cahaya untuk membuat makanan tumbuhan, jadi tumbuhan di tempat gelap menjadi pucat dan mati.',
        'Air yang terlalu banyak juga buruk: tanah yang becek membuat akar tidak bisa mendapat udara.',
        'Dalam uji yang adil, kamu mengubah satu hal saja dan menyamakan yang lain.',
      ],
    },
    vocabulary: {
      en: [
        ['Seed', 'A tiny plant with its own food, packed in a hard coat, waiting to grow.'],
        ['Sprout', 'When a seed opens and a small shoot and root come out.'],
        ['Wilted', 'Drooping and floppy, because the plant is not healthy.'],
        ['Shade', 'A place that gets some light but not full sun.'],
        ['Fair test', 'A test where you change only one thing, so you know what caused the difference.'],
      ],
      id: [
        ['Biji', 'Tumbuhan kecil dengan bekal makanannya sendiri, terbungkus kulit keras, menunggu untuk tumbuh.'],
        ['Bertunas', 'Saat biji terbuka dan tunas kecil serta akar keluar.'],
        ['Layu', 'Terkulai dan lemas, karena tumbuhan tidak sehat.'],
        ['Teduh', 'Tempat yang mendapat sedikit cahaya tetapi bukan sinar matahari penuh.'],
        ['Uji yang adil', 'Uji di mana kamu mengubah satu hal saja, supaya tahu apa penyebab perbedaannya.'],
      ],
    },
    misconceptions: {
      en: [
        ['More water is always better for a plant.', 'Plants need the right amount. In the sim, Lots of water makes the plant wilt after a few days, because roots in soggy soil cannot get the air they need.'],
        ['A seed needs light to sprout.', 'Most seeds sprout in the dark, under the soil, using the food stored inside them. In the sim a seed in the dark still sprouts; it is the young plant that needs light to keep going.'],
        ['Plants get their food from the soil.', 'Plants take water from the soil, but they make their food themselves in their leaves using light. That is why no light means no food.'],
      ],
      id: [
        ['Semakin banyak air selalu lebih baik untuk tumbuhan.', 'Tumbuhan butuh jumlah yang pas. Di sim, air Banyak membuat tanaman layu setelah beberapa hari, karena akar di tanah becek tidak bisa mendapat udara yang dibutuhkannya.'],
        ['Biji butuh cahaya untuk bertunas.', 'Kebanyakan biji bertunas di tempat gelap, di bawah tanah, memakai makanan yang tersimpan di dalamnya. Di sim, biji di tempat gelap tetap bertunas; tumbuhan mudalah yang butuh cahaya untuk terus hidup.'],
        ['Tumbuhan mendapat makanan dari tanah.', 'Tumbuhan mengambil air dari tanah, tetapi membuat makanannya sendiri di daun dengan bantuan cahaya. Itulah sebabnya tanpa cahaya berarti tanpa makanan.'],
      ],
    },
    realWorld: {
      en: [
        'Farmers plant rice at the start of the rainy season so the seeds get the water they need to sprout.',
        'House plants lean towards the window because they grow towards the light.',
        'Bean sprouts sold in markets are grown in the dark on purpose, which is why they are pale and soft.',
        'Grass under a tent or a toy left on the lawn turns yellow in a few days, just like the plant in the dark pot.',
      ],
      id: [
        'Petani menanam padi di awal musim hujan supaya bijinya mendapat air yang dibutuhkan untuk bertunas.',
        'Tanaman di dalam rumah condong ke jendela karena tumbuh ke arah cahaya.',
        'Tauge yang dijual di pasar sengaja ditumbuhkan di tempat gelap, itulah sebabnya warnanya pucat dan lembut.',
        'Rumput di bawah tenda atau mainan yang ditinggal di halaman menguning dalam beberapa hari, sama seperti tanaman di pot yang gelap.',
      ],
    },
    questions: {
      en: [
        { q: 'Give Pot A no water and Pot B some water, both in the sun. Press Next day five times. What do you see, and why?', a: 'Pot A still shows a seed and Pot B has a small green plant. A seed needs water to wake up and sprout, so without water nothing happens at all.' },
        { q: 'Give Pot B some water but keep it in the dark. What happens in the first two days, and what happens after about a week?', a: 'It sprouts after two days, just like a plant in the sun, because the seed uses the food stored inside it. But its leaves are pale, it grows slowly, and after a few days it wilts and dies, because without light it cannot make any new food.' },
        { q: 'You want to find out if shade is worse than sun. What should you set for the two pots so it is a fair test?', a: 'Give both pots the same water, Some, and change only the light: Sun for one and Shade for the other. Then any difference in height must be because of the light.' },
      ],
      id: [
        { q: 'Beri Pot A tanpa air dan Pot B sedikit air, keduanya di bawah sinar matahari. Tekan Hari berikutnya lima kali. Apa yang kamu lihat, dan mengapa?', a: 'Pot A masih menampilkan biji dan Pot B sudah punya tanaman hijau kecil. Biji butuh air untuk bangun dan bertunas, jadi tanpa air tidak terjadi apa-apa.' },
        { q: 'Beri Pot B sedikit air tetapi taruh di tempat gelap. Apa yang terjadi dalam dua hari pertama, dan apa yang terjadi setelah sekitar seminggu?', a: 'Biji bertunas setelah dua hari, sama seperti tanaman di bawah sinar matahari, karena biji memakai makanan yang tersimpan di dalamnya. Tetapi daunnya pucat, tumbuhnya lambat, dan setelah beberapa hari tanaman layu dan mati, karena tanpa cahaya ia tidak bisa membuat makanan baru.' },
        { q: 'Kamu ingin tahu apakah tempat teduh lebih buruk daripada sinar matahari. Bagaimana pengaturan kedua pot supaya ujinya adil?', a: 'Beri kedua pot air yang sama, Sedikit, dan ubah cahayanya saja: Matahari untuk satu pot dan Teduh untuk pot lainnya. Dengan begitu, perbedaan tinggi pasti disebabkan oleh cahaya.' },
      ],
    },
  },
};
