// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Match a separation method to the kind of mixture it works on.',
      'Explain why filtering catches sand but not dissolved salt.',
      'Describe what distillation and chromatography are used for.',
    ],
    id: [
      'Memasangkan metode pemisahan dengan jenis campuran yang cocok.',
      'Menjelaskan mengapa penyaringan menahan pasir tetapi tidak garam yang terlarut.',
      'Menjelaskan kegunaan distilasi dan kromatografi.',
    ],
  },
  tryThis: {
    en: [
      'Try to filter salt water. Why does the salt go straight through the paper?',
      'Find two different methods that can get the sand out of sand and water.',
      'Which is the only method that separates the colours in ink? Why does it work?',
    ],
    id: [
      'Coba saring air garam. Mengapa garam langsung lolos dari kertas saring?',
      'Temukan dua metode berbeda yang bisa memisahkan pasir dari air.',
      'Metode apa satu-satunya yang memisahkan warna dalam tinta? Mengapa bisa?',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'A mixture is two or more substances jumbled together without being chemically joined, so each one keeps its own properties. Sand in water is still sand and water; salt dissolved in water is still salt and water, even though you cannot see the salt. That is the secret of separating mixtures: find a property in which the parts differ, then use it. Sand grains are big and salt particles are tiny, water boils at a lower temperature than salt, iron is magnetic and sand is not, and different dyes cling to paper by different amounts. Every method in this sim exploits one such difference.',
        'Choose one of six mixtures and one of six methods, then press Run and watch. Sand and water is an insoluble solid in a liquid. Salt water and sugar water are dissolved solids, with particles far too small to see or to catch. Ink is a mixture of dissolved dyes. Alcohol and water are two liquids mixed completely. Iron filings and sand are two dry solids. When the animation finishes, the panel says whether the method worked, what you end up with, and why. Many combinations give "nothing useful", and those failures are as instructive as the successes: they show you which property the method depends on.',
        'Filtration pours the mixture through paper with tiny holes; sand grains cannot fit through but water and anything dissolved in it pass straight through. Evaporation heats the mixture so the liquid turns to vapour and escapes, leaving a dissolved solid behind, but the liquid itself is lost. Distillation also boils the liquid, then cools the vapour in a condenser so it drips out as pure liquid and is kept; with two liquids, the one with the lower boiling point (alcohol at 78 °C) comes off before water at 100 °C. Chromatography puts a spot of ink on paper and lets water climb; each dye dissolves and sticks to the paper differently, so each travels a different distance and the colours spread apart. A magnet pulls out only magnetic iron. Decanting lets a solid settle and then pours the liquid off the top, a quick but imperfect method.',
        'The sim shows each method at its tidiest. Real filtration takes time, and very fine particles can slip through. Simple distillation of alcohol and water does not give pure alcohol: the two boil together to some extent, so the liquid that comes off is alcohol-rich but still contains water, and repeated or fractional distillation is needed to do better. Decanting always leaves some water with the sand, as the result text admits. The three ink dyes and the distances they travel are made up to illustrate the idea, and the animation always takes the same four seconds whatever the method.',
      ],
      id: [
        'Campuran adalah dua zat atau lebih yang bercampur tanpa bergabung secara kimia, sehingga masing-masing mempertahankan sifatnya sendiri. Pasir di dalam air tetap pasir dan air; garam yang larut dalam air tetap garam dan air, walau garamnya tidak terlihat. Itulah rahasia memisahkan campuran: cari sifat yang membedakan bagian-bagiannya, lalu manfaatkan. Butiran pasir besar dan partikel garam sangat kecil, air mendidih pada suhu lebih rendah daripada garam, besi magnetis dan pasir tidak, dan zat warna yang berbeda menempel pada kertas dengan kekuatan berbeda. Setiap metode di sim ini memanfaatkan satu perbedaan semacam itu.',
        'Pilih satu dari enam campuran dan satu dari enam metode, lalu tekan Jalankan dan amati. Pasir dan air adalah padatan tak larut dalam cairan. Air garam dan air gula adalah padatan terlarut, dengan partikel yang terlalu kecil untuk dilihat atau ditangkap. Tinta adalah campuran zat warna terlarut. Alkohol dan air adalah dua cairan yang bercampur sempurna. Serbuk besi dan pasir adalah dua padatan kering. Saat animasi selesai, panel memberitahu apakah metodenya berhasil, apa yang kamu dapatkan, dan mengapa. Banyak kombinasi memberi "tidak ada", dan kegagalan itu sama bermanfaatnya dengan keberhasilan: ia menunjukkan sifat apa yang diandalkan metode tersebut.',
        'Penyaringan menuangkan campuran melalui kertas berlubang sangat kecil; butiran pasir tidak bisa lolos tetapi air dan apa pun yang larut di dalamnya langsung menembus. Penguapan memanaskan campuran sehingga cairan menjadi uap dan lepas, meninggalkan padatan terlarut, tetapi cairannya hilang. Distilasi juga mendidihkan cairan, lalu mendinginkan uapnya di kondensor sehingga menetes keluar sebagai cairan murni dan tersimpan; dengan dua cairan, yang titik didihnya lebih rendah (alkohol pada 78 °C) keluar lebih dulu sebelum air pada 100 °C. Kromatografi menaruh setitik tinta pada kertas dan membiarkan air merambat naik; tiap zat warna larut dan menempel pada kertas secara berbeda, sehingga menempuh jarak yang berbeda dan warna-warnanya memisah. Magnet hanya menarik besi yang magnetis. Dekantasi membiarkan padatan mengendap lalu menuang cairan di atasnya, metode yang cepat tetapi tidak sempurna.',
        'Sim ini menampilkan tiap metode dalam versi paling rapinya. Penyaringan sungguhan butuh waktu, dan partikel yang sangat halus bisa lolos. Distilasi sederhana alkohol dan air tidak menghasilkan alkohol murni: keduanya ikut mendidih sampai taraf tertentu, sehingga cairan yang keluar kaya alkohol tetapi masih mengandung air, dan diperlukan distilasi berulang atau bertingkat untuk hasil lebih baik. Dekantasi selalu menyisakan sedikit air bersama pasir, seperti yang diakui teks hasilnya. Ketiga zat warna tinta dan jarak tempuhnya dibuat-buat untuk menggambarkan gagasannya, dan animasi selalu memakan empat detik yang sama apa pun metodenya.',
      ],
    },
    figure: {
      caption: {
        en: 'Left: filtration catches insoluble sand on the paper while water and dissolved salt pass through. Right: distillation boils the water off salt water and cools the vapour in a condenser, so pure water is collected and the salt stays in the flask.',
        id: 'Kiri: penyaringan menahan pasir yang tak larut di kertas sementara air dan garam terlarut lolos. Kanan: distilasi mendidihkan air dari air garam dan mendinginkan uapnya di kondensor, sehingga air murni tertampung dan garam tersisa di labu.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Filtration and distillation apparatus', 'Alat penyaringan dan distilasi')}">
  <style>text{font:10px system-ui,sans-serif;fill:currentColor}.g{fill:none;stroke:currentColor;stroke-width:1.5;opacity:.65}.wa{fill:#3b82f6;opacity:.35}.sd{fill:#f59e0b}.a{stroke-width:1.5;fill:none}</style>
  <text x="90" y="16" text-anchor="middle" font-weight="bold">${L('Filtration', 'Penyaringan')}</text>
  <path d="M50 40 L90 96 L130 40" class="g"/>
  <path d="M90 96 L90 126" class="g"/>
  <path d="M58 46 L90 92 L122 46 Z" fill="currentColor" opacity=".12"/>
  <path d="M68 60 L90 90 L112 60 Z" class="wa"/>
  <g class="sd"><circle cx="84" cy="80" r="2.5"/><circle cx="90" cy="86" r="2.5"/><circle cx="96" cy="80" r="2.5"/><circle cx="90" cy="74" r="2.5"/><circle cx="80" cy="72" r="2.5"/><circle cx="100" cy="72" r="2.5"/></g>
  <text x="134" y="56">${L('filter paper', 'kertas saring')}</text>
  <text x="134" y="68">${L('with tiny holes', 'berlubang kecil')}</text>
  <text x="134" y="86" fill="#f59e0b">${L('sand stays', 'pasir tertahan')}</text>
  <circle cx="90" cy="138" r="3" fill="#3b82f6"/><circle cx="90" cy="152" r="3" fill="#3b82f6"/>
  <rect x="62" y="186" width="56" height="30" class="wa"/>
  <path d="M60 160 L60 216 L120 216 L120 160" class="g"/>
  <text x="90" y="230" text-anchor="middle" fill="#3b82f6">${L('water (and dissolved salt) passes', 'air (dan garam terlarut) lolos')}</text>
  <text x="258" y="16" text-anchor="middle" font-weight="bold">${L('Distillation', 'Distilasi')}</text>
  <circle cx="210" cy="150" r="26" class="g"/>
  <path d="M190 160 A26 26 0 0 0 230 160 L230 150 L190 150 Z" class="wa"/>
  <g fill="currentColor" opacity=".7"><circle cx="202" cy="166" r="2"/><circle cx="212" cy="170" r="2"/><circle cx="220" cy="164" r="2"/></g>
  <path d="M210 124 L210 70 L250 70 L314 128 L314 160" class="g"/>
  <path d="M262 82 L300 116" stroke="#3b82f6" stroke-width="12" opacity=".4" fill="none"/>
  <path d="M262 82 L300 116" stroke="currentColor" stroke-width="1" opacity=".5" fill="none"/>
  <text x="304" y="78" text-anchor="middle">${L('condenser', 'kondensor')}</text>
  <text x="304" y="90" text-anchor="middle" fill="#3b82f6">${L('cold water', 'air dingin')}</text>
  <path d="M202 186 Q210 176 218 186 Q210 196 202 186 Z" fill="#ef4444"/>
  <path d="M206 186 Q210 180 214 186 Q210 191 206 186 Z" fill="#f59e0b"/>
  <text x="210" y="208" text-anchor="middle" fill="#ef4444">${L('heat', 'panas')}</text>
  <text x="160" y="150" text-anchor="middle">${L('salt water', 'air garam')}</text>
  <text x="160" y="162" text-anchor="middle">${L('boils', 'mendidih')}</text>
  <text x="236" y="112" fill="#3b82f6">${L('vapour', 'uap')}</text>
  <rect x="296" y="196" width="36" height="20" class="wa"/>
  <path d="M294 170 L294 216 L334 216 L334 170" class="g"/>
  <text x="314" y="230" text-anchor="middle" fill="#3b82f6">${L('pure water', 'air murni')}</text>
  <text x="258" y="200" text-anchor="middle" font-size="9">${L('salt stays in the flask', 'garam tersisa di labu')}</text>
  <line x1="150" y1="30" x2="150" y2="220" stroke="currentColor" stroke-width="1" opacity=".3" stroke-dasharray="4 4"/>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'The parts of a mixture are not chemically joined, so each keeps its own properties and can be separated by using one of them.',
        'Filtering catches insoluble solids because their grains are bigger than the holes; dissolved particles are too small and pass through.',
        'Evaporation keeps the dissolved solid but loses the liquid; distillation boils and then condenses the liquid so it is kept too.',
        'Two mixed liquids can be separated by distillation if they boil at different temperatures; the lower-boiling one comes off first.',
        'Chromatography separates dissolved colours because each dye travels a different distance up the paper.',
      ],
      id: [
        'Bagian-bagian campuran tidak bergabung secara kimia, sehingga masing-masing mempertahankan sifatnya dan bisa dipisahkan dengan memanfaatkan salah satu sifat itu.',
        'Penyaringan menahan padatan tak larut karena butirannya lebih besar daripada lubang kertas; partikel terlarut terlalu kecil dan lolos.',
        'Penguapan menyimpan padatan terlarut tetapi kehilangan cairannya; distilasi mendidihkan lalu mengembunkan cairan sehingga cairannya juga tersimpan.',
        'Dua cairan yang bercampur bisa dipisahkan dengan distilasi jika titik didihnya berbeda; yang titik didihnya lebih rendah keluar lebih dulu.',
        'Kromatografi memisahkan warna terlarut karena tiap zat warna menempuh jarak yang berbeda di atas kertas.',
      ],
    },
    vocabulary: {
      en: [
        ['Mixture', 'Two or more substances together but not chemically joined, so each keeps its own properties.'],
        ['Soluble / insoluble', 'A soluble substance dissolves in a liquid, like salt in water; an insoluble one does not, like sand.'],
        ['Solution', 'A liquid with a substance dissolved in it so completely that the mixture looks like one clear liquid.'],
        ['Residue and filtrate', 'The residue is what stays on the filter paper; the filtrate is the liquid that passes through.'],
        ['Condenser', 'A cooled tube in which vapour turns back into liquid during distillation.'],
        ['Boiling point', 'The temperature at which a liquid boils; alcohol boils at 78 °C and water at 100 °C.'],
        ['Chromatography', 'Separating dissolved substances by how far a solvent carries them along paper.'],
      ],
      id: [
        ['Campuran', 'Dua zat atau lebih yang bersama tetapi tidak bergabung secara kimia, sehingga masing-masing mempertahankan sifatnya.'],
        ['Larut / tak larut', 'Zat yang larut bercampur habis dalam cairan, seperti garam dalam air; zat tak larut tidak, seperti pasir.'],
        ['Larutan', 'Cairan dengan zat yang terlarut begitu sempurna sehingga campurannya tampak seperti satu cairan jernih.'],
        ['Residu dan filtrat', 'Residu adalah yang tertahan di kertas saring; filtrat adalah cairan yang lolos.'],
        ['Kondensor', 'Tabung yang didinginkan tempat uap berubah kembali menjadi cairan selama distilasi.'],
        ['Titik didih', 'Suhu saat cairan mendidih; alkohol mendidih pada 78 °C dan air pada 100 °C.'],
        ['Kromatografi', 'Memisahkan zat terlarut berdasarkan seberapa jauh pelarut membawanya di sepanjang kertas.'],
      ],
    },
    misconceptions: {
      en: [
        ['Salt disappears when it dissolves, so there is nothing left to separate.', 'The salt is still there, broken into particles too small to see. Evaporate or distil the water and the salt crystals reappear; taste the water and it is salty.'],
        ['Filter paper can clean anything out of water, including salt.', 'Filter paper only stops particles bigger than its holes. Dissolved salt or sugar passes straight through, which is why filtered seawater is still salty.'],
        ['Evaporation and distillation are the same thing.', 'Both boil the liquid away, but evaporation lets the vapour escape and keeps only the solid, while distillation cools the vapour in a condenser and keeps the liquid as well.'],
        ['The dyes in chromatography separate because heavier ones move more slowly.', 'The dyes separate because each dissolves in the water and clings to the paper by a different amount. A dye that dissolves well and clings little travels furthest, whatever its mass.'],
      ],
      id: [
        ['Garam hilang saat larut, jadi tidak ada lagi yang bisa dipisahkan.', 'Garamnya masih ada, terpecah menjadi partikel yang terlalu kecil untuk dilihat. Uapkan atau distilasi airnya dan kristal garam muncul kembali; cicipi airnya dan terasa asin.'],
        ['Kertas saring bisa membersihkan apa saja dari air, termasuk garam.', 'Kertas saring hanya menahan partikel yang lebih besar daripada lubangnya. Garam atau gula terlarut langsung lolos, itulah sebabnya air laut yang disaring tetap asin.'],
        ['Penguapan dan distilasi adalah hal yang sama.', 'Keduanya mendidihkan cairan, tetapi penguapan membiarkan uap lepas dan hanya menyimpan padatannya, sedangkan distilasi mendinginkan uap di kondensor dan menyimpan cairannya juga.'],
        ['Zat warna pada kromatografi memisah karena yang lebih berat bergerak lebih lambat.', 'Zat warna memisah karena masing-masing larut dalam air dan menempel pada kertas dengan kekuatan yang berbeda. Zat warna yang mudah larut dan sedikit menempel menempuh jarak terjauh, apa pun massanya.'],
      ],
    },
    realWorld: {
      en: [
        'Sea-salt farms, such as those on Madura, let seawater evaporate in shallow ponds under the sun and rake up the salt left behind.',
        'Water treatment plants filter river water through sand and gravel beds to remove mud, exactly as the filter paper removes sand.',
        'Ships and desert towns make drinking water from seawater by distillation and other methods, keeping the pure water and discarding the salt.',
        'Recycling plants pass crushed rubbish under strong magnets to pull out steel cans, leaving aluminium, glass and plastic behind.',
      ],
      id: [
        'Tambak garam, seperti di Madura, membiarkan air laut menguap di kolam dangkal di bawah matahari lalu mengumpulkan garam yang tertinggal.',
        'Instalasi pengolahan air menyaring air sungai melalui lapisan pasir dan kerikil untuk membuang lumpur, persis seperti kertas saring menahan pasir.',
        'Kapal dan kota di gurun membuat air minum dari air laut dengan distilasi dan metode lain, menyimpan air murninya dan membuang garamnya.',
        'Pabrik daur ulang melewatkan sampah yang dihancurkan di bawah magnet kuat untuk menarik kaleng baja, meninggalkan aluminium, kaca, dan plastik.',
      ],
    },
    questions: {
      en: [
        { q: 'Filtration separates sand from water but fails for salt water. What is different about the two mixtures?', a: 'Sand is insoluble: its grains stay whole and are far bigger than the holes in the paper, so they are trapped. Salt dissolves into particles far smaller than the holes, so they ride through with the water and the filtrate is still salty.' },
        { q: 'You want to get clean water back from salt water, not the salt. Which method do you choose, and why not evaporation?', a: 'Distillation. Both methods boil the water, but evaporation lets the vapour escape into the air, so you end with salt crystals and no water. Distillation cools the vapour in a condenser and collects it as pure liquid water, leaving the salt in the flask.' },
        { q: 'Alcohol and water cannot be filtered, evaporated or decanted apart. Which method works, what property does it use, and what does the sim leave out?', a: 'Distillation, using their different boiling points: alcohol boils at 78 °C and comes off before water at 100 °C. The sim shows a clean separation, but a real simple distillation gives alcohol that still contains some water, because the two boil together to some extent.' },
      ],
      id: [
        { q: 'Penyaringan memisahkan pasir dari air tetapi gagal untuk air garam. Apa yang berbeda pada kedua campuran itu?', a: 'Pasir tidak larut: butirannya tetap utuh dan jauh lebih besar daripada lubang kertas, sehingga tertahan. Garam larut menjadi partikel yang jauh lebih kecil daripada lubang, sehingga ikut lolos bersama air dan filtratnya tetap asin.' },
        { q: 'Kamu ingin mendapatkan kembali air bersih dari air garam, bukan garamnya. Metode mana yang kamu pilih, dan mengapa bukan penguapan?', a: 'Distilasi. Kedua metode mendidihkan air, tetapi penguapan membiarkan uap lepas ke udara, sehingga kamu hanya mendapat kristal garam tanpa air. Distilasi mendinginkan uap di kondensor dan menampungnya sebagai air cair murni, meninggalkan garam di labu.' },
        { q: 'Alkohol dan air tidak bisa dipisahkan dengan penyaringan, penguapan, atau dekantasi. Metode mana yang berhasil, sifat apa yang dipakai, dan apa yang diabaikan sim?', a: 'Distilasi, memakai titik didih yang berbeda: alkohol mendidih pada 78 °C dan keluar sebelum air pada 100 °C. Sim menunjukkan pemisahan yang bersih, tetapi distilasi sederhana sungguhan menghasilkan alkohol yang masih mengandung sedikit air, karena keduanya ikut mendidih sampai taraf tertentu.' },
      ],
    },
  },
};
