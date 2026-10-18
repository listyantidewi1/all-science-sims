// Long-form text for the sim page aside, kept out of manifest.js.
export default {
  objectives: {
    en: [
      'Sort substances into those that dissolve in water (sugar, salt) and those that do not (sand, flour, oil).',
      'Show that warm water and stirring make a solid dissolve faster.',
      'Discover that water can only hold a certain amount of a solid: after that, no more will dissolve.',
    ],
    id: [
      'Mengelompokkan zat menjadi yang larut dalam air (gula, garam) dan yang tidak larut (pasir, tepung, minyak).',
      'Menunjukkan bahwa air hangat dan pengadukan membuat zat padat larut lebih cepat.',
      'Menemukan bahwa air hanya bisa menampung sejumlah tertentu zat padat: setelah itu, tidak ada lagi yang larut.',
    ],
  },
  tryThis: {
    en: [
      'Add one spoonful of sugar to cold water and do nothing. Count the seconds until it disappears.',
      'Empty the glass, make the water hot and add sugar again. Is it faster? Now press Stir! too.',
      'Try sand, flour and oil. Wait 10 seconds. Does anything disappear?',
      'Keep adding salt, one spoonful at a time. When does the water say it is full?',
    ],
    id: [
      'Tambahkan satu sendok gula ke air dingin dan jangan lakukan apa pun. Hitung detiknya sampai gula menghilang.',
      'Kosongkan gelas, buat airnya panas dan tambahkan gula lagi. Lebih cepat? Sekarang tekan Aduk! juga.',
      'Coba pasir, tepung dan minyak. Tunggu 10 detik. Apakah ada yang menghilang?',
      'Terus tambahkan garam, satu sendok demi satu sendok. Kapan airnya dinyatakan penuh?',
    ],
  },

  learn: {
    background: {
      en: [
        'When you put sugar in water and it seems to disappear, it has not gone away. The sugar has broken up into pieces far too small to see, and these pieces have spread out between the water particles. We say the sugar has dissolved and the mixture is called a solution. You can still taste the sugar, so you know it is still there.',
        'Not everything dissolves. Sand sinks to the bottom and stays there, however long you wait. Flour does not dissolve either: its tiny bits float around and make the water cloudy, and slowly sink. Oil does not mix with water at all; it floats on top in a separate layer. These are mixtures, but they are not solutions.',
        'Dissolving can be fast or slow. Warm water makes the water particles move faster, so they bump the sugar apart more quickly. Stirring also helps, because it carries dissolved sugar away and brings fresh water to the solid. In the sim, the timer shows how many seconds a spoonful takes to vanish, so you can compare cold and hot, still and stirred.',
        'Water can only hold so much. Keep adding sugar and at some point the extra sugar stays at the bottom no matter how long you stir. The solution is full, or saturated. Warm water can hold more sugar than cold water, which is why you can stir lots of sugar into hot tea. Salt is different: warm water holds only a little more salt than cold water.',
      ],
      id: [
        'Ketika kamu memasukkan gula ke dalam air dan gula tampak menghilang, gula itu tidak benar-benar hilang. Gula pecah menjadi bagian-bagian yang terlalu kecil untuk dilihat, dan bagian-bagian ini menyebar di antara partikel air. Kita katakan gula telah larut dan campurannya disebut larutan. Kamu masih bisa merasakan manisnya, jadi kamu tahu gula masih ada di sana.',
        'Tidak semua zat larut. Pasir tenggelam ke dasar dan tetap di sana, berapa lama pun kamu menunggu. Tepung juga tidak larut: butiran kecilnya mengambang dan membuat air keruh, lalu perlahan mengendap. Minyak sama sekali tidak bercampur dengan air; minyak mengapung di atas sebagai lapisan terpisah. Semua ini adalah campuran, tetapi bukan larutan.',
        'Melarut bisa cepat atau lambat. Air hangat membuat partikel air bergerak lebih cepat, sehingga mereka memecah gula lebih cepat. Mengaduk juga membantu, karena pengadukan membawa gula yang sudah larut menjauh dan mendatangkan air baru ke zat padat. Di simulasi ini, pencatat waktu menunjukkan berapa detik yang dibutuhkan sesendok zat untuk menghilang, sehingga kamu bisa membandingkan dingin dan panas, diam dan diaduk.',
        'Air hanya bisa menampung sejumlah tertentu. Terus tambahkan gula, dan pada suatu saat gula tambahan tetap tinggal di dasar berapa lama pun kamu mengaduk. Larutannya sudah penuh, atau jenuh. Air hangat bisa menampung lebih banyak gula daripada air dingin, itulah sebabnya kamu bisa mengaduk banyak gula ke dalam teh panas. Garam berbeda: air hangat hanya menampung sedikit lebih banyak garam daripada air dingin.',
      ],
    },
    figure: {
      caption: {
        en: 'Three glasses of water. Left: sugar has dissolved, its pieces are too small to see and spread everywhere. Middle: sand does not dissolve and sits on the bottom. Right: oil does not mix and floats on top.',
        id: 'Tiga gelas air. Kiri: gula telah larut, bagian-bagiannya terlalu kecil untuk dilihat dan menyebar ke mana-mana. Tengah: pasir tidak larut dan mengendap di dasar. Kanan: minyak tidak bercampur dan mengapung di atas.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        const glass = (x) => `<path d="M${x} 70 L${x + 8} 200 L${x + 72} 200 L${x + 80} 70" fill="none" stroke="currentColor" stroke-width="2"/>`;
        const water = (x, top) => `<path d="M${x + (top - 70) * 8 / 130} ${top} L${x + 8} 200 L${x + 72} 200 L${x + 80 - (top - 70) * 8 / 130} ${top} Z" fill="#38bdf8" opacity="0.3"/>`;
        let dots = '';
        const pts = [[30, 110], [55, 130], [42, 160], [70, 150], [36, 185], [66, 185], [52, 100], [60, 170], [28, 140], [74, 120]];
        for (const [dx, dy] of pts) dots += `<circle cx="${20 + dx}" cy="${dy}" r="1.6" fill="currentColor" opacity="0.55"/>`;
        let sand = '';
        for (let i = 0; i < 18; i++) sand += `<circle cx="${150 + (i % 6) * 10}" cy="${194 - Math.floor(i / 6) * 6}" r="3" fill="#b45309"/>`;
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Sugar dissolved, sand on the bottom, oil floating on top', 'Gula larut, pasir di dasar, minyak mengapung di atas')}">
  <style>text{font:12px system-ui,sans-serif;fill:currentColor;text-anchor:middle}</style>
  ${water(20, 90)}${glass(20)}${dots}
  ${water(140, 90)}${glass(140)}${sand}
  ${water(260, 100)}${glass(260)}
  <path d="M261 90 L262 102 L338 102 L339 90 Z" fill="#facc15" opacity="0.85"/>
  <text x="60" y="222">${L('sugar: dissolved', 'gula: larut')}</text>
  <text x="180" y="222">${L('sand: sinks', 'pasir: tenggelam')}</text>
  <text x="300" y="222">${L('oil: floats', 'minyak: mengapung')}</text>
  <text x="60" y="40">${L('a solution', 'larutan')}</text>
  <text x="240" y="40">${L('mixtures, not solutions', 'campuran, bukan larutan')}</text>
  <text x="60" y="58" font-size="10">${L('(clear, tastes sweet)', '(bening, terasa manis)')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Dissolving means a solid breaks into pieces too small to see and spreads through the water.',
        'A solid dissolved in water makes a solution; the solid is still there, even though you cannot see it.',
        'Sugar and salt dissolve in water. Sand, flour and oil do not.',
        'Warm water and stirring make a solid dissolve faster.',
        'Water can only hold a certain amount of a solid. When it is full (saturated), extra solid stays at the bottom.',
        'Warm water can hold much more sugar than cold water, but only a little more salt.',
      ],
      id: [
        'Melarut berarti zat padat pecah menjadi bagian yang terlalu kecil untuk dilihat dan menyebar di dalam air.',
        'Zat padat yang larut dalam air membentuk larutan; zat padat itu masih ada, walaupun tidak terlihat.',
        'Gula dan garam larut dalam air. Pasir, tepung dan minyak tidak larut.',
        'Air hangat dan pengadukan membuat zat padat larut lebih cepat.',
        'Air hanya bisa menampung sejumlah tertentu zat padat. Jika sudah penuh (jenuh), zat padat tambahan tetap di dasar.',
        'Air hangat bisa menampung jauh lebih banyak gula daripada air dingin, tetapi hanya sedikit lebih banyak garam.',
      ],
    },
    vocabulary: {
      en: [
        ['Dissolve', 'To break up into pieces too small to see and spread out through a liquid.'],
        ['Solution', 'A clear mixture made when something dissolves in a liquid, like sugar in water.'],
        ['Soluble', 'Able to dissolve. Sugar and salt are soluble in water.'],
        ['Insoluble', 'Not able to dissolve. Sand and oil are insoluble in water.'],
        ['Saturated', 'A solution that is full: it cannot dissolve any more of the solid.'],
        ['Mixture', 'Two or more things together that can still be separated, like sand and water.'],
      ],
      id: [
        ['Larut', 'Pecah menjadi bagian yang terlalu kecil untuk dilihat dan menyebar di dalam zat cair.'],
        ['Larutan', 'Campuran bening yang terbentuk ketika sesuatu larut dalam zat cair, seperti gula dalam air.'],
        ['Dapat larut', 'Bisa melarut. Gula dan garam dapat larut dalam air.'],
        ['Tidak larut', 'Tidak bisa melarut. Pasir dan minyak tidak larut dalam air.'],
        ['Jenuh', 'Larutan yang sudah penuh: tidak bisa melarutkan zat padat lagi.'],
        ['Campuran', 'Dua zat atau lebih yang bersama-sama tetapi masih bisa dipisahkan, seperti pasir dan air.'],
      ],
    },
    misconceptions: {
      en: [
        ['When sugar dissolves it disappears and is gone.', 'The sugar is still in the water, just in pieces too small to see. Taste the water, or let it dry out, and the sugar comes back.'],
        ['If something makes the water cloudy, it has dissolved.', 'Cloudy water means the bits are still big enough to block light, like flour. A real solution is clear. Flour will slowly settle to the bottom.'],
        ['You can keep dissolving sugar for ever if you stir long enough.', 'Stirring only makes dissolving faster. Once the water is saturated, stirring will not make any more sugar dissolve. Only warming the water helps.'],
        ['Stirring makes sugar melt.', 'Melting needs heat and happens without water, like ice turning to water. In the glass the sugar dissolves: it mixes into the water.'],
      ],
      id: [
        ['Ketika gula larut, gula menghilang dan lenyap.', 'Gula masih ada di dalam air, hanya dalam bagian yang terlalu kecil untuk dilihat. Cicipi airnya, atau biarkan airnya mengering, maka gula akan muncul kembali.'],
        ['Jika sesuatu membuat air keruh, zat itu telah larut.', 'Air keruh berarti butirannya masih cukup besar untuk menghalangi cahaya, seperti tepung. Larutan sejati bening. Tepung perlahan akan mengendap ke dasar.'],
        ['Kamu bisa terus melarutkan gula selamanya asal mengaduk cukup lama.', 'Mengaduk hanya membuat gula larut lebih cepat. Setelah airnya jenuh, mengaduk tidak akan melarutkan gula lagi. Hanya menghangatkan air yang membantu.'],
        ['Mengaduk membuat gula meleleh.', 'Meleleh membutuhkan panas dan terjadi tanpa air, seperti es menjadi air. Di dalam gelas gula melarut: gula bercampur ke dalam air.'],
      ],
    },
    realWorld: {
      en: [
        'Sugar dissolves faster in hot tea than in iced tea, and you can dissolve far more of it in the hot tea.',
        'Sea water is a solution of salt in water. When the water dries up in salt pans, the salt is left behind.',
        'Salad dressing separates into an oil layer and a vinegar layer because oil does not dissolve in water.',
        'Muddy river water is cloudy because soil does not dissolve; left in a jar, the soil settles to the bottom.',
      ],
      id: [
        'Gula larut lebih cepat dalam teh panas daripada teh es, dan kamu bisa melarutkan jauh lebih banyak gula dalam teh panas.',
        'Air laut adalah larutan garam dalam air. Ketika airnya menguap di tambak garam, garamnya tertinggal.',
        'Saus salad terpisah menjadi lapisan minyak dan lapisan cuka karena minyak tidak larut dalam air.',
        'Air sungai yang berlumpur keruh karena tanah tidak larut; jika didiamkan dalam toples, tanah mengendap ke dasar.',
      ],
    },
    questions: {
      en: [
        { q: 'You add a spoonful of sugar to cold water and it takes 8 seconds to vanish. What two things could you do to make it vanish faster?', a: 'Warm the water and stir it. Both make the water particles bump the sugar apart more quickly.' },
        { q: 'After three spoonfuls of salt, the fourth stays at the bottom even when you stir. What has happened?', a: 'The solution is saturated. The water is holding as much salt as it can, so the extra salt cannot dissolve.' },
        { q: 'Flour makes the water white and cloudy. Has it dissolved? How do you know?', a: 'No. A dissolved solid makes a clear solution. The cloudiness shows the flour bits are still big, and if you wait they settle to the bottom.' },
      ],
      id: [
        { q: 'Kamu menambahkan sesendok gula ke air dingin dan butuh 8 detik sampai gula menghilang. Dua hal apa yang bisa kamu lakukan agar lebih cepat?', a: 'Menghangatkan air dan mengaduknya. Keduanya membuat partikel air memecah gula lebih cepat.' },
        { q: 'Setelah tiga sendok garam, sendok keempat tetap tinggal di dasar walaupun diaduk. Apa yang terjadi?', a: 'Larutannya sudah jenuh. Air sudah menampung garam sebanyak yang ia bisa, sehingga garam tambahan tidak bisa larut.' },
        { q: 'Tepung membuat air menjadi putih dan keruh. Apakah tepung larut? Bagaimana kamu tahu?', a: 'Tidak. Zat padat yang larut membentuk larutan bening. Kekeruhan menunjukkan butiran tepung masih besar, dan jika ditunggu, tepung mengendap ke dasar.' },
      ],
    },
  },
};
