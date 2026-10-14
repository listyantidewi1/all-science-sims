// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Predict whether an everyday object floats or sinks, then test the prediction.',
      'Notice that shape matters: the same clay sinks as a lump but floats as a boat.',
      'Use the idea "light for its size floats, heavy for its size sinks" to explain results.',
    ],
    id: [
      'Menebak apakah benda sehari-hari terapung atau tenggelam, lalu menguji tebakan itu.',
      'Menyadari bahwa bentuk berpengaruh: tanah liat yang sama tenggelam sebagai gumpalan tetapi terapung sebagai perahu.',
      'Menggunakan gagasan "ringan untuk ukurannya terapung, berat untuk ukurannya tenggelam" untuk menjelaskan hasil.',
    ],
  },
  tryThis: {
    en: [
      'Test the clay lump, then the clay boat. Same clay — why is the answer different?',
      'Compare the two bottles. What is inside the one with the cap?',
      'Ask: is a big object always a sinker? Test the wooden block and the coin.',
    ],
    id: [
      'Uji gumpalan tanah liat, lalu perahu tanah liat. Tanah liatnya sama — mengapa hasilnya berbeda?',
      'Bandingkan kedua botol. Apa isi botol yang bertutup?',
      'Tanyakan: apakah benda besar selalu tenggelam? Uji balok kayu dan koin.',
    ],
  },

  // "Learn" section: the science behind the sim, for young students and their teachers.
  learn: {
    background: {
      en: [
        'When you put something in water, two things happen. The object pulls down because of its weight. The water pushes it up. If the water push is strong enough to hold the object, it floats. If the object is too heavy for the water to hold, it sinks. The water push depends on how much space the object takes up under the water. A big object gets a big push. A small object gets a small push.',
        'So the rule is: light for its size floats, heavy for its size sinks. A wooden block is big but light, so it floats. A coin is small but very heavy for its size, so it sinks. Shape matters too. A lump of clay sinks because it is heavy for its small size. The same clay spread out into a boat takes up much more space, so the water gives it a much bigger push and it floats. A bottle with a cap is full of air, which is very light, so it floats. Take the cap off and water fills the bottle, so it gets heavy and sinks.',
        'In this sim you pick an object from the shelf, guess Float or Sink, and drag it into the tank. The sim already knows what each object does in water. It does not measure them, and it does not show how deep each floating object sits. Real water is a little different: salty sea water pushes harder than tap water, so some things that sink in a pool float in the sea. Try all ten objects and count your right guesses.',
      ],
      id: [
        'Ketika kamu menaruh sesuatu di air, dua hal terjadi. Benda itu menarik ke bawah karena beratnya. Air mendorongnya ke atas. Jika dorongan air cukup kuat untuk menahan benda, benda itu terapung. Jika benda terlalu berat untuk ditahan air, benda itu tenggelam. Dorongan air bergantung pada seberapa banyak ruang yang dipakai benda di dalam air. Benda besar mendapat dorongan besar. Benda kecil mendapat dorongan kecil.',
        'Jadi aturannya: ringan untuk ukurannya terapung, berat untuk ukurannya tenggelam. Balok kayu itu besar tetapi ringan, jadi terapung. Koin itu kecil tetapi sangat berat untuk ukurannya, jadi tenggelam. Bentuk juga berpengaruh. Gumpalan tanah liat tenggelam karena berat untuk ukurannya yang kecil. Tanah liat yang sama jika dibentuk menjadi perahu memakai ruang yang jauh lebih besar, sehingga air memberi dorongan yang jauh lebih besar dan perahu itu terapung. Botol bertutup penuh dengan udara, yang sangat ringan, jadi terapung. Buka tutupnya, air masuk mengisi botol, botol menjadi berat dan tenggelam.',
        'Di sim ini kamu memilih benda dari rak, menebak Terapung atau Tenggelam, lalu menyeretnya ke dalam bak. Sim sudah tahu apa yang terjadi pada tiap benda di air. Sim tidak mengukurnya, dan tidak menunjukkan seberapa dalam tiap benda terapung. Air sungguhan sedikit berbeda: air laut yang asin mendorong lebih kuat daripada air keran, jadi beberapa benda yang tenggelam di kolam bisa terapung di laut. Coba kesepuluh benda dan hitung tebakanmu yang benar.',
      ],
    },
    figure: {
      caption: {
        en: 'The block floats: the water pushes it up as hard as its weight pulls it down. The stone sinks: it is heavy for its size, so its weight is bigger than the water push.',
        id: 'Balok terapung: air mendorongnya ke atas sekuat beratnya menarik ke bawah. Batu tenggelam: batu berat untuk ukurannya, jadi beratnya lebih besar daripada dorongan air.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('A floating block and a sinking stone with weight and water-push arrows', 'Balok terapung dan batu tenggelam dengan panah berat dan dorongan air')}">
  <style>text{font:12px system-ui,sans-serif;fill:currentColor}.tk{fill:none;stroke:currentColor;stroke-width:3}.f{stroke-width:3;fill:none}.t{font-size:11px}</style>
  <path d="M30 40 L30 210 L330 210 L330 40" class="tk"/>
  <rect x="32" y="80" width="296" height="128" fill="#3b82f6" opacity=".25"/>
  <path d="M32 80 Q50 74 68 80 T104 80 T140 80 T176 80 T212 80 T248 80 T284 80 T320 80 L328 80" fill="none" stroke="#3b82f6" stroke-width="2"/>
  <rect x="80" y="62" width="60" height="44" fill="#f59e0b" opacity=".9"/>
  <text x="110" y="56" text-anchor="middle" class="t" font-weight="bold">${L('wooden block: floats', 'balok kayu: terapung')}</text>
  <line x1="100" y1="110" x2="100" y2="150" class="f" stroke="#ef4444" marker-end="url(#a)"/>
  <text x="54" y="166" class="t" fill="#ef4444">${L('weight', 'berat')}</text>
  <line x1="120" y1="150" x2="120" y2="110" class="f" stroke="#10b981" marker-end="url(#a)"/>
  <text x="128" y="166" class="t" fill="#10b981">${L('water push', 'dorongan air')}</text>
  <text x="60" y="186" class="t">${L('same size → it floats', 'sama besar → terapung')}</text>
  <path d="M232 170 L242 148 L266 142 L286 156 L282 178 L256 190 L236 184 Z" fill="currentColor" opacity=".6"/>
  <text x="258" y="104" text-anchor="middle" class="t" font-weight="bold">${L('stone: sinks', 'batu: tenggelam')}</text>
  <line x1="248" y1="112" x2="248" y2="140" class="f" stroke="#10b981" marker-end="url(#a)"/>
  <text x="200" y="124" class="t" fill="#10b981">${L('small push', 'dorongan kecil')}</text>
  <line x1="300" y1="130" x2="300" y2="200" class="f" stroke="#ef4444" marker-end="url(#a)"/>
  <text x="304" y="170" class="t" fill="#ef4444">${L('big weight', 'berat besar')}</text>
  <text x="30" y="230" class="t">${L('light for its size floats · heavy for its size sinks', 'ringan untuk ukurannya terapung · berat untuk ukurannya tenggelam')}</text>
  <defs><marker id="a" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="context-stroke"/></marker></defs>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Water pushes up on everything put into it.',
        'An object floats when the water push can hold up its weight, and sinks when it cannot.',
        'Light for its size floats; heavy for its size sinks. Being big does not mean sinking.',
        'Shape matters: spreading the same clay into a boat makes it take up more space, so the water pushes harder and it floats.',
        'Air inside an object, like a capped bottle, makes it light for its size and helps it float.',
      ],
      id: [
        'Air mendorong ke atas semua benda yang dimasukkan ke dalamnya.',
        'Benda terapung ketika dorongan air bisa menahan beratnya, dan tenggelam ketika tidak bisa.',
        'Ringan untuk ukurannya terapung; berat untuk ukurannya tenggelam. Besar tidak berarti tenggelam.',
        'Bentuk berpengaruh: tanah liat yang sama jika dibentuk menjadi perahu memakai ruang lebih besar, sehingga air mendorong lebih kuat dan perahu terapung.',
        'Udara di dalam benda, seperti botol bertutup, membuatnya ringan untuk ukurannya dan membantunya terapung.',
      ],
    },
    vocabulary: {
      en: [
        ['Float', 'To stay at the top of the water instead of going to the bottom.'],
        ['Sink', 'To go down to the bottom of the water.'],
        ['Weight', 'How hard an object is pulled down; heavy things pull down more.'],
        ['Water push', 'The upward push that water gives to anything in it. Scientists call it upthrust.'],
        ['Hollow', 'Having empty space or air inside, like a capped bottle or a ping-pong ball.'],
      ],
      id: [
        ['Terapung', 'Tetap berada di atas air, tidak turun ke dasar.'],
        ['Tenggelam', 'Turun sampai ke dasar air.'],
        ['Berat', 'Seberapa kuat benda ditarik ke bawah; benda berat ditarik lebih kuat.'],
        ['Dorongan air', 'Dorongan ke atas yang diberikan air pada benda di dalamnya. Ilmuwan menyebutnya gaya apung.'],
        ['Berongga', 'Punya ruang kosong atau udara di dalamnya, seperti botol bertutup atau bola pingpong.'],
      ],
    },
    misconceptions: {
      en: [
        ['Big things sink and small things float.', 'The wooden block is big and floats; the coin is small and sinks. What matters is whether an object is heavy or light for its size, not how big it is.'],
        ['Heavy things always sink.', 'A big ship is very heavy, but it floats because it is hollow and takes up a huge amount of space, so the water push is huge too.'],
        ['Floating things are not being pulled down at all.', 'They are. Their weight pulls down, but the water push is just as strong, so they stay up.'],
      ],
      id: [
        ['Benda besar tenggelam dan benda kecil terapung.', 'Balok kayu itu besar dan terapung; koin itu kecil dan tenggelam. Yang penting adalah apakah benda berat atau ringan untuk ukurannya, bukan seberapa besar benda itu.'],
        ['Benda berat selalu tenggelam.', 'Kapal besar sangat berat, tetapi terapung karena berongga dan memakai ruang yang sangat besar, sehingga dorongan airnya juga sangat besar.'],
        ['Benda yang terapung tidak ditarik ke bawah sama sekali.', 'Ditarik. Beratnya menarik ke bawah, tetapi dorongan air sama kuatnya, jadi benda itu tetap di atas.'],
      ],
    },
    realWorld: {
      en: [
        'Steel ships float because they are hollow; a steel nail sinks because it is solid.',
        'Life jackets are filled with foam full of air, which makes you light for your size so you float.',
        'A submarine lets water into its tanks to get heavy and dive, then pushes the water out to float back up.',
        'In the sea, which is salty, you float more easily than in a swimming pool.',
      ],
      id: [
        'Kapal baja terapung karena berongga; paku baja tenggelam karena padat.',
        'Jaket pelampung diisi busa yang penuh udara, sehingga kamu menjadi ringan untuk ukuranmu dan terapung.',
        'Kapal selam memasukkan air ke tangkinya agar berat dan menyelam, lalu mendorong air itu keluar agar terapung kembali.',
        'Di laut, yang asin, kamu lebih mudah terapung daripada di kolam renang.',
      ],
    },
    questions: {
      en: [
        { q: 'Put the clay lump in the water, then the clay boat. What happens to each one? What is different about the boat?', a: 'The lump sinks and the boat floats. They are made of the same clay, but the boat is spread out and takes up much more space in the water, so the water pushes it up harder.' },
        { q: 'Watch the two bottles. Which one floats? What is inside it that helps?', a: 'The bottle with the cap floats because it is full of air, which is very light. The bottle with no cap fills up with water, gets heavy, and slowly sinks.' },
        { q: 'The wooden block is much bigger than the coin. Which one sinks? What does this tell you about big and small things?', a: 'The coin sinks and the block floats. Being big does not make something sink. The coin is heavy for its small size; the wood is light for its big size.' },
      ],
      id: [
        { q: 'Masukkan gumpalan tanah liat ke air, lalu perahu tanah liat. Apa yang terjadi pada masing-masing? Apa yang berbeda pada perahu?', a: 'Gumpalan tenggelam dan perahu terapung. Keduanya dari tanah liat yang sama, tetapi perahu dibentuk melebar dan memakai ruang yang jauh lebih besar di air, sehingga air mendorongnya ke atas lebih kuat.' },
        { q: 'Amati kedua botol. Mana yang terapung? Apa yang ada di dalamnya yang membantu?', a: 'Botol bertutup terapung karena penuh udara, yang sangat ringan. Botol tanpa tutup terisi air, menjadi berat, dan perlahan tenggelam.' },
        { q: 'Balok kayu jauh lebih besar daripada koin. Mana yang tenggelam? Apa yang bisa kamu simpulkan tentang benda besar dan kecil?', a: 'Koin tenggelam dan balok terapung. Besar tidak membuat benda tenggelam. Koin berat untuk ukurannya yang kecil; kayu ringan untuk ukurannya yang besar.' },
      ],
    },
  },
};
