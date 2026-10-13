// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Identify evaporation, condensation, precipitation, runoff.',
      'Connect solar input to total cycle throughput.',
      'See where water can be temporarily stored (clouds, snow, ground).',
    ],
    id: [
      'Mengenali evaporasi, kondensasi, presipitasi, aliran permukaan.',
      'Mengaitkan input matahari dengan throughput siklus total.',
      'Melihat di mana air dapat tersimpan sementara (awan, salju, tanah).',
    ],
  },  tryThis: {
    en: [
      'Crank up the sun — does evaporation explode?',
      'Cool the planet — does it stop raining?',
      'Watch the same particle make a full loop.',
    ],
    id: [
      'Naikkan matahari — apakah evaporasi meledak?',
      'Dinginkan planet — apakah hujan berhenti?',
      'Amati partikel yang sama menyelesaikan satu loop penuh.',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'Water on Earth is always on the move, going round and round in a big loop called the water cycle. The Sun warms the sea, lakes and wet ground. Some of the warm water turns into an invisible gas called water vapour and floats up into the air. This is evaporation. High up, the air is much colder, so the vapour turns back into tiny drops of liquid water. Millions of these drops together make a cloud. This is condensation.',
        'When the drops in a cloud grow big and heavy, they fall as rain, or as snow where it is very cold. This is precipitation. Rain that lands on hills and mountains flows downhill in streams and rivers back to the sea. This is runoff. Then the Sun warms the water again, and the loop starts over. The water you drink today has been round this loop many, many times.',
        'In the simulation every dot is a little bit of water. Blue dots are in the sea, small white dots are vapour rising, big white dots are cloud, light-blue dots are falling rain, and turquoise dots are water running off the land. The Solar intensity slider is the strength of the Sun: more Sun makes more dots evaporate every second, so the whole loop runs faster. Turn the Sun right down and nothing evaporates any more; the clouds rain out and the cycle stops. The Particles slider only changes how much water you are watching. The simulation leaves out wind, plants giving off water, water soaking into the ground, and snow and ice, which all matter in the real world.',
      ],
      id: [
        'Air di Bumi selalu bergerak, berputar terus dalam sebuah lingkaran besar yang disebut siklus air. Matahari menghangatkan laut, danau, dan tanah yang basah. Sebagian air yang hangat berubah menjadi gas tak terlihat yang disebut uap air dan melayang naik ke udara. Ini disebut penguapan. Jauh di atas, udara jauh lebih dingin, sehingga uap berubah kembali menjadi tetes-tetes air yang sangat kecil. Jutaan tetes itu bersama-sama membentuk awan. Ini disebut pengembunan.',
        'Ketika tetes-tetes di awan tumbuh besar dan berat, mereka jatuh sebagai hujan, atau sebagai salju di tempat yang sangat dingin. Ini disebut presipitasi. Hujan yang jatuh di bukit dan gunung mengalir turun lewat sungai kembali ke laut. Ini disebut aliran permukaan. Lalu Matahari menghangatkan air itu lagi, dan putarannya mulai dari awal. Air yang kamu minum hari ini sudah berkali-kali mengelilingi putaran ini.',
        'Dalam simulasi, setiap titik adalah sedikit air. Titik biru berada di laut, titik putih kecil adalah uap yang naik, titik putih besar adalah awan, titik biru muda adalah hujan yang jatuh, dan titik biru kehijauan adalah air yang mengalir dari daratan. Slider intensitas matahari adalah kekuatan Matahari: Matahari yang lebih kuat membuat lebih banyak titik menguap tiap detik, sehingga seluruh putaran berjalan lebih cepat. Kecilkan Matahari sampai habis, maka tidak ada lagi yang menguap; awan menghabiskan hujannya dan siklus berhenti. Slider partikel hanya mengubah seberapa banyak air yang kamu amati. Simulasi ini tidak memasukkan angin, tumbuhan yang melepaskan uap air, air yang meresap ke tanah, serta salju dan es, yang semuanya penting di dunia nyata.',
      ],
    },
    figure: {
      caption: {
        en: 'The Sun\'s heat lifts water out of the sea as vapour; cold air high up turns it into cloud; the drops fall as rain; and rivers carry the water back to the sea.',
        id: 'Panas Matahari mengangkat air dari laut sebagai uap; udara dingin di atas mengubahnya menjadi awan; tetes-tetesnya jatuh sebagai hujan; dan sungai membawa air itu kembali ke laut.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('The water cycle', 'Siklus air')}">
  <style>text{font:12px system-ui,sans-serif;fill:currentColor}.m{fill:none;stroke:currentColor;stroke-width:1.2;opacity:.45}.f{stroke-width:2.2;fill:none}.s{font-size:10px;opacity:.8}</style>
  <circle cx="320" cy="36" r="18" fill="#f59e0b" opacity=".9"/>
  <path d="M300 54 L250 100" class="f" stroke="#f59e0b" marker-end="url(#a)"/>
  <text x="252" y="76" class="s" fill="#f59e0b">${L('heat', 'panas')}</text>
  <rect x="0" y="170" width="360" height="70" fill="#3b82f6" opacity=".35"/>
  <path d="M150 170 L220 110 L290 170 Z" fill="#10b981" opacity=".6"/>
  <path d="M60 170 L60 176 M80 165 L80 176 M100 170 L100 176" class="m"/>
  <path d="M60 165 C70 140 60 120 70 92" class="f" stroke="#ef4444" stroke-dasharray="5 3" marker-end="url(#a)"/>
  <path d="M90 165 C100 140 90 120 100 92" class="f" stroke="#ef4444" stroke-dasharray="5 3" marker-end="url(#a)"/>
  <text x="104" y="140" fill="#ef4444">${L('evaporation', 'penguapan')}</text>
  <text x="104" y="153" class="s" fill="#ef4444">${L('liquid turns to vapour', 'cair menjadi uap')}</text>
  <path d="M60 80 a16 16 0 0 1 30 -10 a18 18 0 0 1 36 6 a14 14 0 0 1 -6 26 L66 102 a12 12 0 0 1 -6 -22 Z" fill="currentColor" opacity=".25"/>
  <path d="M120 70 L172 60" class="f" stroke="#8b5cf6" marker-end="url(#a)"/>
  <text x="128" y="52" fill="#8b5cf6">${L('condensation', 'pengembunan')}</text>
  <text x="128" y="34" class="s" fill="#8b5cf6">${L('vapour cools into drops: cloud', 'uap mendingin jadi tetes: awan')}</text>
  <path d="M176 76 a16 16 0 0 1 30 -10 a18 18 0 0 1 36 6 a14 14 0 0 1 -6 26 L182 98 a12 12 0 0 1 -6 -22 Z" fill="currentColor" opacity=".25"/>
  <path d="M200 104 L206 128 M216 104 L222 128 M232 104 L238 128" class="f" stroke="#3b82f6"/>
  <text x="246" y="120" fill="#3b82f6">${L('precipitation', 'presipitasi')}</text>
  <text x="246" y="133" class="s" fill="#3b82f6">${L('rain or snow', 'hujan atau salju')}</text>
  <path d="M214 132 C196 146 180 156 160 168" class="f" stroke="#10b981" marker-end="url(#a)"/>
  <text x="246" y="158" fill="#10b981">${L('runoff', 'aliran')}</text>
  <text x="246" y="171" class="s" fill="#10b981">${L('rivers back to the sea', 'sungai kembali ke laut')}</text>
  <text x="12" y="200">${L('sea', 'laut')}</text>
  <text x="300" y="214" class="s">${L('land', 'darat')}</text>
  <defs><marker id="a" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="context-stroke"/></marker></defs>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'The Sun\'s energy drives the water cycle: its heat makes water evaporate.',
        'Water changes form, from liquid to vapour to drops to rain, but it is the same water going round and round.',
        'Evaporation, condensation, precipitation and runoff are the four main steps of the cycle.',
        'More sunshine makes the cycle run faster; with no Sun it stops.',
        'Water can wait for a while in a cloud, on the ground or in the sea before it moves on.',
      ],
      id: [
        'Energi Matahari menggerakkan siklus air: panasnya membuat air menguap.',
        'Air berubah wujud, dari cair ke uap ke tetes ke hujan, tetapi airnya tetap sama dan berputar terus.',
        'Penguapan, pengembunan, presipitasi, dan aliran permukaan adalah empat langkah utama siklus air.',
        'Sinar Matahari yang lebih kuat membuat siklus berjalan lebih cepat; tanpa Matahari siklus berhenti.',
        'Air bisa menunggu sejenak di awan, di tanah, atau di laut sebelum bergerak lagi.',
      ],
    },
    vocabulary: {
      en: [
        ['Evaporation', 'When liquid water warms up and turns into water vapour, a gas you cannot see.'],
        ['Water vapour', 'Water in the form of a gas. It is invisible and mixed into the air around you.'],
        ['Condensation', 'When water vapour cools and turns back into tiny drops of liquid water.'],
        ['Cloud', 'Millions of tiny water drops or ice crystals floating together high in the air.'],
        ['Precipitation', 'Water falling from clouds as rain, snow or hail.'],
        ['Runoff', 'Rain water flowing downhill over the land, in streams and rivers, back to the sea.'],
      ],
      id: [
        ['Penguapan (evaporasi)', 'Saat air cair menghangat dan berubah menjadi uap air, gas yang tidak bisa kamu lihat.'],
        ['Uap air', 'Air dalam bentuk gas. Uap air tidak terlihat dan bercampur dengan udara di sekitarmu.'],
        ['Pengembunan (kondensasi)', 'Saat uap air mendingin dan berubah kembali menjadi tetes-tetes air yang sangat kecil.'],
        ['Awan', 'Jutaan tetes air atau kristal es yang sangat kecil yang melayang bersama tinggi di udara.'],
        ['Presipitasi', 'Air yang jatuh dari awan sebagai hujan, salju, atau es.'],
        ['Aliran permukaan', 'Air hujan yang mengalir menuruni daratan, lewat anak sungai dan sungai, kembali ke laut.'],
      ],
    },
    misconceptions: {
      en: [
        ['Clouds are made of water vapour.', 'Water vapour is an invisible gas. A cloud is made of tiny drops of liquid water or ice crystals, which is why you can see it. The vapour has already condensed.'],
        ['When a puddle dries up, the water is gone.', 'The water has not disappeared. It has evaporated into the air as vapour and will come back down later as rain somewhere else.'],
        ['All rain comes straight from the sea.', 'Most of it does, but water also evaporates from lakes, rivers, wet soil and plants. Vapour can travel a long way in the wind before it falls as rain.'],
      ],
      id: [
        ['Awan terbuat dari uap air.', 'Uap air adalah gas yang tidak terlihat. Awan terbuat dari tetes-tetes air atau kristal es yang sangat kecil, itulah sebabnya awan bisa kamu lihat. Uapnya sudah mengembun.'],
        ['Saat genangan air mengering, airnya hilang.', 'Airnya tidak hilang. Air itu menguap ke udara sebagai uap dan nanti akan turun lagi sebagai hujan di tempat lain.'],
        ['Semua hujan langsung berasal dari laut.', 'Sebagian besar memang begitu, tetapi air juga menguap dari danau, sungai, tanah basah, dan tumbuhan. Uap bisa terbawa angin sangat jauh sebelum turun sebagai hujan.'],
      ],
    },
    realWorld: {
      en: [
        'Wet clothes dry much faster on a hot sunny day than on a cool cloudy one, because more heat means more evaporation.',
        'Drops of dew on grass in the early morning, or water on the outside of a cold glass, are condensation: vapour from the air turning back into liquid on a cold surface.',
        'Indonesia\'s heavy rainy season comes from vapour that evaporates from the warm seas around the islands and condenses into huge clouds.',
        'Big rivers like the Kapuas and the Mahakam are runoff: they collect rain from a huge area and carry it back to the sea.',
      ],
      id: [
        'Pakaian basah mengering jauh lebih cepat pada hari yang panas dan cerah daripada hari yang sejuk dan berawan, karena lebih banyak panas berarti lebih banyak penguapan.',
        'Tetes embun di rumput pagi hari, atau air di luar gelas yang dingin, adalah pengembunan: uap dari udara berubah kembali menjadi cairan pada permukaan yang dingin.',
        'Musim hujan yang lebat di Indonesia berasal dari uap yang menguap dari laut hangat di sekitar kepulauan dan mengembun menjadi awan-awan raksasa.',
        'Sungai-sungai besar seperti Kapuas dan Mahakam adalah aliran permukaan: mereka mengumpulkan hujan dari wilayah yang sangat luas dan membawanya kembali ke laut.',
      ],
    },
    questions: {
      en: [
        { q: 'Why do wet clothes dry faster on a hot, sunny day?', a: 'The Sun\'s heat gives the water more energy, so more of it turns into vapour every minute. In the sim, turning up the Sun makes more blue dots turn white, which is the same idea.' },
        { q: 'What happens in the sim if you turn the Sun all the way down to 0%? Explain each step.', a: 'Nothing evaporates any more, so no new vapour rises. The clouds that are left still rain out, the rain runs back to the sea, and in the end every dot is blue and sitting in the sea. The cycle has stopped because it lost its energy source.' },
        { q: 'A raindrop lands on the mountain in the middle. Describe two different ways it can get back into the air.', a: 'It can run downhill to the sea and evaporate from there, or it can evaporate straight from the wet ground. In the sim, turquoise ground dots mostly flow back to the sea, but some turn white and rise directly.' },
      ],
      id: [
        { q: 'Mengapa pakaian basah lebih cepat kering pada hari yang panas dan cerah?', a: 'Panas Matahari memberi air lebih banyak energi, sehingga lebih banyak air berubah menjadi uap setiap menit. Dalam sim, menaikkan Matahari membuat lebih banyak titik biru berubah menjadi putih, idenya sama.' },
        { q: 'Apa yang terjadi di sim jika Matahari diturunkan sampai 0%? Jelaskan setiap langkahnya.', a: 'Tidak ada lagi yang menguap, jadi tidak ada uap baru yang naik. Awan yang masih ada tetap menjatuhkan hujan, hujan mengalir kembali ke laut, dan akhirnya semua titik berwarna biru dan berada di laut. Siklus berhenti karena kehilangan sumber energinya.' },
        { q: 'Setetes hujan jatuh di gunung yang ada di tengah. Jelaskan dua cara berbeda tetes itu bisa kembali ke udara.', a: 'Tetes itu bisa mengalir turun ke laut lalu menguap dari sana, atau bisa langsung menguap dari tanah yang basah. Dalam sim, titik biru kehijauan di daratan kebanyakan mengalir kembali ke laut, tetapi sebagian berubah putih dan langsung naik.' },
      ],
    },
  },
};
