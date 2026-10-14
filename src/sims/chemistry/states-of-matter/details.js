// Long-form text for the sim page aside, kept out of manifest.js.
export default {
  objectives: {
    en: [
      'Name the three states of matter and describe how the particles move in each.',
      'Explain that heating makes particles move more and cooling makes them move less.',
      'Observe that different materials melt and boil at different temperatures.',
    ],
    id: [
      'Menyebutkan tiga wujud zat dan menjelaskan gerak partikel pada masing-masing wujud.',
      'Menjelaskan bahwa pemanasan membuat partikel bergerak lebih cepat dan pendinginan membuatnya lebih lambat.',
      'Mengamati bahwa bahan yang berbeda meleleh dan mendidih pada suhu yang berbeda.',
    ],
  },
  tryThis: {
    en: [
      'Ask children to predict what the particles will do before pressing Heat. Then press it slowly, one step at a time.',
      'Cool water until it freezes. Ask: are the particles still moving at all? (They jiggle, but stay in place.)',
      'Switch to chocolate at room temperature. Why does it melt in a pocket but ice cream melts even faster?',
    ],
    id: [
      'Minta anak menebak apa yang akan dilakukan partikel sebelum menekan Panaskan. Lalu tekan perlahan, satu langkah demi satu langkah.',
      'Dinginkan air sampai membeku. Tanyakan: apakah partikelnya masih bergerak? (Bergetar, tetapi tetap di tempat.)',
      'Ganti ke cokelat pada suhu kamar. Mengapa cokelat meleleh di dalam kantong, tetapi es krim meleleh lebih cepat lagi?',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'Everything around you is made of tiny bits called particles. They are far too small to see, even with a school microscope. In a solid like ice, the particles sit in neat rows and only jiggle on the spot, so ice keeps its shape. In a liquid like water, the particles stay close together but slide past each other, so water pours and takes the shape of its cup. In a gas like steam, the particles fly around fast with lots of space between them, so steam spreads out to fill a whole room.',
        'In the sim, the box holds 36 particles. Press Heat to make them warmer and Cool to make them colder, or drag the slider. Watch the thermometer. When the red line passes the Freezing mark, the particles break out of their rows and start to flow: the solid has melted. When it passes the Boiling mark, they fly everywhere: the liquid has boiled. Cool them down and it happens backwards. The big word tells you the state. Try water, chocolate and candle wax and you will see each one has its own marks: ice melts at 0 degrees, chocolate at about 30 and candle wax at about 55.',
        'The sim keeps things simple. Real particles are much, much smaller, and a single drop of water holds more of them than you could count in a lifetime. In the sim the change happens all at once at one temperature, but a real ice cube takes time to melt, and it stays at 0 degrees the whole time it is melting. Real chocolate does not turn into a gas; if you heat it that much it burns and goes black. The sim pretends it does so that you can see all three states for every material.',
      ],
      id: [
        'Segala sesuatu di sekitarmu terbuat dari butiran kecil yang disebut partikel. Partikel terlalu kecil untuk dilihat, bahkan dengan mikroskop sekolah. Pada zat padat seperti es, partikel duduk dalam barisan rapi dan hanya bergetar di tempat, sehingga es mempertahankan bentuknya. Pada zat cair seperti air, partikel tetap berdekatan tetapi saling bergeser, sehingga air bisa dituang dan mengikuti bentuk gelasnya. Pada gas seperti uap, partikel terbang cepat dengan banyak ruang di antaranya, sehingga uap menyebar mengisi seluruh ruangan.',
        'Di sim ini, kotaknya berisi 36 partikel. Tekan Panaskan untuk membuatnya lebih hangat dan Dinginkan untuk membuatnya lebih dingin, atau geser slidernya. Perhatikan termometernya. Saat garis merah melewati tanda Beku, partikel keluar dari barisannya dan mulai mengalir: zat padatnya telah meleleh. Saat melewati tanda Didih, partikel terbang ke mana-mana: zat cairnya telah mendidih. Dinginkan lagi dan semuanya terjadi terbalik. Kata besar di atas memberitahu wujudnya. Coba air, cokelat, dan lilin, dan kamu akan melihat masing-masing punya tanda sendiri: es meleleh pada 0 derajat, cokelat pada sekitar 30, dan lilin pada sekitar 55.',
        'Sim ini dibuat sederhana. Partikel sungguhan jauh lebih kecil, dan setetes air saja berisi lebih banyak partikel daripada yang bisa kamu hitung seumur hidup. Di sim, perubahannya terjadi sekaligus pada satu suhu, tetapi es batu sungguhan butuh waktu untuk mencair, dan suhunya tetap 0 derajat selama mencair. Cokelat sungguhan tidak berubah menjadi gas; kalau dipanaskan sampai sepanas itu, cokelat gosong dan menjadi hitam. Sim berpura-pura cokelat bisa menjadi gas supaya kamu bisa melihat ketiga wujud untuk setiap bahan.',
      ],
    },
    figure: {
      caption: {
        en: 'The same particles in three states. Cold: they sit in rows and jiggle (solid). Warmer: they slide past each other (liquid). Hot: they fly around far apart (gas).',
        id: 'Partikel yang sama dalam tiga wujud. Dingin: duduk berbaris dan bergetar (padat). Lebih hangat: saling bergeser (cair). Panas: terbang berjauhan (gas).',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Particles in a solid, a liquid and a gas', 'Partikel pada zat padat, cair, dan gas')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.bx{fill:none;stroke:currentColor;stroke-width:2;opacity:.6}.p{fill:#3b82f6}.m{stroke:#3b82f6;stroke-width:1.5;opacity:.6}</style>
  <rect x="16" y="40" width="100" height="100" class="bx"/>
  <g class="p"><circle cx="33" cy="124" r="8"/><circle cx="53" cy="124" r="8"/><circle cx="73" cy="124" r="8"/><circle cx="93" cy="124" r="8"/><circle cx="33" cy="104" r="8"/><circle cx="53" cy="104" r="8"/><circle cx="73" cy="104" r="8"/><circle cx="93" cy="104" r="8"/><circle cx="33" cy="84" r="8"/><circle cx="53" cy="84" r="8"/><circle cx="73" cy="84" r="8"/><circle cx="93" cy="84" r="8"/></g>
  <text x="66" y="30" text-anchor="middle" font-weight="bold">${L('SOLID', 'PADAT')}</text>
  <text x="66" y="158" text-anchor="middle">${L('neat rows, jiggle', 'berbaris rapi, bergetar')}</text>
  <text x="66" y="172" text-anchor="middle" font-size="10">${L('keeps its shape (ice)', 'bentuknya tetap (es)')}</text>
  <rect x="130" y="40" width="100" height="100" class="bx"/>
  <g class="p"><circle cx="146" cy="126" r="8"/><circle cx="164" cy="122" r="8"/><circle cx="182" cy="127" r="8"/><circle cx="200" cy="123" r="8"/><circle cx="217" cy="127" r="8"/><circle cx="154" cy="107" r="8"/><circle cx="173" cy="104" r="8"/><circle cx="192" cy="108" r="8"/><circle cx="210" cy="105" r="8"/><circle cx="162" cy="89" r="8"/><circle cx="183" cy="90" r="8"/><circle cx="202" cy="88" r="8"/></g>
  <text x="180" y="30" text-anchor="middle" font-weight="bold">${L('LIQUID', 'CAIR')}</text>
  <text x="180" y="158" text-anchor="middle">${L('close, slide past', 'berdekatan, bergeser')}</text>
  <text x="180" y="172" text-anchor="middle" font-size="10">${L('pours, fills the bottom (water)', 'bisa dituang, mengisi dasar (air)')}</text>
  <rect x="244" y="40" width="100" height="100" class="bx"/>
  <g class="p"><circle cx="262" cy="60" r="8"/><circle cx="322" cy="70" r="8"/><circle cx="290" cy="92" r="8"/><circle cx="260" cy="118" r="8"/><circle cx="326" cy="124" r="8"/><circle cx="300" cy="56" r="8"/></g>
  <g class="m"><line x1="270" y1="66" x2="282" y2="76"/><line x1="314" y1="76" x2="302" y2="86"/><line x1="298" y1="98" x2="286" y2="110"/><line x1="268" y1="112" x2="278" y2="100"/><line x1="318" y1="118" x2="306" y2="108"/><line x1="308" y1="60" x2="320" y2="52"/></g>
  <text x="294" y="30" text-anchor="middle" font-weight="bold">GAS</text>
  <text x="294" y="158" text-anchor="middle">${L('far apart, fly fast', 'berjauhan, terbang cepat')}</text>
  <text x="294" y="172" text-anchor="middle" font-size="10">${L('fills the whole box (steam)', 'mengisi seluruh kotak (uap)')}</text>
  <rect x="30" y="196" width="100" height="12" fill="#3b82f6" opacity=".7"/>
  <rect x="130" y="196" width="100" height="12" fill="#f59e0b" opacity=".7"/>
  <rect x="230" y="196" width="100" height="12" fill="#ef4444" opacity=".7"/>
  <text x="30" y="226" fill="#3b82f6">${L('colder: less jiggle', 'lebih dingin: getaran kecil')}</text>
  <text x="330" y="226" text-anchor="end" fill="#ef4444">${L('hotter: more movement', 'lebih panas: gerak lebih besar')}</text>
  <text x="180" y="190" text-anchor="middle" font-size="10">${L('heat: particles move more; cool: particles move less', 'panaskan: partikel bergerak lebih; dinginkan: bergerak kurang')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Everything is made of tiny particles that are too small to see.',
        'In a solid the particles jiggle in rows, in a liquid they slide past each other, and in a gas they fly far apart.',
        'Heating makes the particles move more; cooling makes them move less.',
        'Each material melts and boils at its own temperature.',
        'The particles do not change when ice melts or water boils; only the way they move changes.',
      ],
      id: [
        'Segala sesuatu terbuat dari partikel kecil yang terlalu kecil untuk dilihat.',
        'Pada zat padat partikel bergetar dalam barisan, pada zat cair saling bergeser, dan pada gas terbang berjauhan.',
        'Memanaskan membuat partikel bergerak lebih; mendinginkan membuatnya bergerak kurang.',
        'Tiap bahan meleleh dan mendidih pada suhunya sendiri.',
        'Partikel tidak berubah saat es mencair atau air mendidih; yang berubah hanya cara geraknya.',
      ],
    },
    vocabulary: {
      en: [
        ['Particle', 'One of the tiny bits that everything is made of, far too small to see.'],
        ['Solid', 'A state where the particles stay in place and only jiggle, so the material keeps its shape.'],
        ['Liquid', 'A state where the particles slide past each other, so the material can be poured.'],
        ['Gas', 'A state where the particles fly around with lots of space between them and fill any container.'],
        ['Melting', 'A solid turning into a liquid when it gets warm enough.'],
      ],
      id: [
        ['Partikel', 'Salah satu butiran kecil penyusun segala sesuatu, terlalu kecil untuk dilihat.'],
        ['Padat', 'Wujud di mana partikel tetap di tempat dan hanya bergetar, sehingga bahan mempertahankan bentuknya.'],
        ['Cair', 'Wujud di mana partikel saling bergeser, sehingga bahan bisa dituang.'],
        ['Gas', 'Wujud di mana partikel terbang dengan banyak ruang di antaranya dan mengisi wadah apa pun.'],
        ['Meleleh', 'Zat padat berubah menjadi cair saat cukup hangat.'],
      ],
    },
    misconceptions: {
      en: [
        ['The particles in a solid do not move at all.', 'They do move. They jiggle on the spot, like people shivering in a queue. Cool the water to −20 in the sim and watch: the particles still wobble a little.'],
        ['When you heat something, the particles themselves get bigger or hotter.', 'The particles stay the same size. They just move faster and spread out more. Hot and cold are about how the particles move, not what they are made of.'],
        ['The white cloud above a kettle is steam.', 'Real steam is a gas and you cannot see it. The white cloud is tiny drops of liquid water that formed when the steam cooled in the air.'],
        ['Only water can melt and freeze.', 'Every material can, but at its own temperature. Chocolate melts at about 30 degrees, candle wax at about 55, and even iron melts if it gets hot enough.'],
      ],
      id: [
        ['Partikel pada zat padat tidak bergerak sama sekali.', 'Partikel tetap bergerak. Mereka bergetar di tempat, seperti orang yang menggigil dalam antrean. Dinginkan air sampai −20 di sim dan lihat: partikelnya masih bergoyang sedikit.'],
        ['Saat sesuatu dipanaskan, partikelnya sendiri membesar atau menjadi panas.', 'Partikel tetap sama ukurannya. Mereka hanya bergerak lebih cepat dan lebih menyebar. Panas dan dingin adalah soal bagaimana partikel bergerak, bukan dari apa partikel itu terbuat.'],
        ['Kepulan putih di atas ketel adalah uap.', 'Uap sungguhan adalah gas dan tidak bisa dilihat. Kepulan putih itu adalah tetes-tetes kecil air cair yang terbentuk saat uap mendingin di udara.'],
        ['Hanya air yang bisa meleleh dan membeku.', 'Semua bahan bisa, tetapi pada suhunya sendiri. Cokelat meleleh pada sekitar 30 derajat, lilin pada sekitar 55, dan bahkan besi meleleh kalau cukup panas.'],
      ],
    },
    realWorld: {
      en: [
        'An ice lolly melts in your hand because your hand is much warmer than 0 degrees, and the drips are the same water that was frozen.',
        'Chocolate goes soft in a pocket because your body is about 37 degrees, warmer than chocolate\'s melting point of about 30.',
        'Candle wax melts near the flame, runs down the side, and goes hard again as it cools, over and over.',
        'A puddle dries up in the sun because the water slowly turns into a gas and floats away into the air.',
      ],
      id: [
        'Es loli mencair di tanganmu karena tanganmu jauh lebih hangat daripada 0 derajat, dan tetesannya adalah air yang sama yang tadinya beku.',
        'Cokelat menjadi lembek di dalam kantong karena tubuhmu sekitar 37 derajat, lebih hangat daripada titik leleh cokelat yang sekitar 30.',
        'Lilin meleleh di dekat nyala api, mengalir ke sisi, dan mengeras lagi saat mendingin, berulang-ulang.',
        'Genangan air mengering di bawah matahari karena airnya perlahan berubah menjadi gas dan melayang ke udara.',
      ],
    },
    questions: {
      en: [
        { q: 'Pick Water and press Cool until the thermometer shows −10. What are the particles doing, and what does the big word say?', a: 'They sit in neat rows and jiggle on the spot without swapping places. The big word says SOLID, and the material name says Ice. They are still moving a little, but they stay where they are.' },
        { q: 'Start water at 20 degrees and press Heat one step at a time. At which temperature do the particles suddenly fly all over the box? What is this called?', a: 'When the thermometer passes 100 degrees, the Boiling mark. The particles stop staying at the bottom and spread through the whole box. The water has boiled and turned into a gas, steam.' },
        { q: 'Chocolate melts at about 30 degrees and candle wax at about 55. Your hand is about 37 degrees. Which one goes soft in your hand, and why?', a: 'The chocolate, because your hand is warmer than its melting mark, so its particles get enough energy to slide about. Candle wax needs 55 degrees, so it stays hard in your hand.' },
      ],
      id: [
        { q: 'Pilih Air dan tekan Dinginkan sampai termometer menunjukkan −10. Apa yang dilakukan partikel, dan apa kata besar yang muncul?', a: 'Partikel duduk dalam barisan rapi dan bergetar di tempat tanpa bertukar posisi. Kata besarnya PADAT, dan nama bahannya Es. Partikel masih bergerak sedikit, tetapi tetap di tempatnya.' },
        { q: 'Mulai dengan air pada 20 derajat dan tekan Panaskan satu langkah demi satu langkah. Pada suhu berapa partikel tiba-tiba terbang ke seluruh kotak? Apa nama peristiwa ini?', a: 'Saat termometer melewati 100 derajat, tanda Didih. Partikel tidak lagi berkumpul di dasar dan menyebar ke seluruh kotak. Airnya mendidih dan berubah menjadi gas, yaitu uap.' },
        { q: 'Cokelat meleleh pada sekitar 30 derajat dan lilin pada sekitar 55. Tanganmu sekitar 37 derajat. Mana yang menjadi lembek di tanganmu, dan mengapa?', a: 'Cokelat, karena tanganmu lebih hangat daripada tanda lelehnya, sehingga partikelnya mendapat cukup energi untuk saling bergeser. Lilin butuh 55 derajat, jadi tetap keras di tanganmu.' },
      ],
    },
  },
};
