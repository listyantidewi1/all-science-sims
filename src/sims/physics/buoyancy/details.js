// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Apply F_buoy = ρ_fluid · g · V_submerged.',
      'Predict floating vs sinking from density alone.',
      'Connect submerged depth to object density.',
    ],
    id: [
      'Menerapkan F_apung = ρ_fluida · g · V_tercelup.',
      'Memprediksi mengapung vs tenggelam hanya dari kerapatan.',
      'Mengaitkan kedalaman tercelup dengan kerapatan benda.',
    ],
  },
  tryThis: {
    en: [
      'Drop a block with density 0.5 — what fraction sticks out?',
      'Pick "ice in water" — does it float lower or higher than wood?',
      'Switch fluid to mercury — which solid metals float?',
    ],
    id: [
      'Jatuhkan balok dengan kerapatan 0,5 — bagian mana yang keluar?',
      'Pilih "es di air" — mengapung lebih rendah atau lebih tinggi dari kayu?',
      'Ganti fluida menjadi raksa — logam padat mana yang mengapung?',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'Push an empty bottle under water and you feel the water pushing it back up. That upward push is the buoyant force, and it exists because pressure in a fluid increases with depth: the water presses harder on the bottom of the bottle than on the top, so the net push is upward. Archimedes worked out its size more than two thousand years ago: the buoyant force equals the weight of the fluid that the object pushes aside. A block that is half under water is held up by a force equal to the weight of half a block\'s volume of water.',
        'Whether something floats therefore comes down to density, which is mass divided by volume. If the block is less dense than the fluid, it only needs to push aside a part of its own volume of fluid to balance its weight, so it sinks until exactly that much is under the surface and then floats. The fraction submerged equals the block\'s density divided by the fluid\'s density: wood of density 0.65 g/cm³ floats with 65% of its height under water. If the block is denser than the fluid, even fully submerged it cannot push aside enough fluid to balance its weight, so it sinks to the bottom. A block of equal density hovers at any depth.',
        'In the sim you choose a fluid, set the block\'s density with the slider or a preset, and drop it. The block speeds up under its weight, slows down as the buoyant force grows with the submerged depth, and bobs a little before settling where the two forces balance; a drag force from the fluid damps the bobbing. The readout gives the predicted percentage above the surface. The size slider shows something important: a bigger block of the same density floats at exactly the same fraction, because weight and buoyant force both grow with volume.',
        'The sim keeps things simple. The block is always a square, so the submerged fraction of its height equals the submerged fraction of its volume, which is not true for round or boat-shaped objects. It ignores surface tension, the fluid level rising when the block enters, water soaking into the material, and the air\'s own very small buoyant force. Hollow objects such as ships are not shown, but they follow the same rule: their average density, counting the air inside, is less than that of water.',
      ],
      id: [
        'Tekan botol kosong ke dalam air, maka kamu merasakan air mendorongnya kembali ke atas. Dorongan ke atas itu adalah gaya apung, dan ia ada karena tekanan di dalam fluida bertambah dengan kedalaman: air menekan dasar botol lebih kuat daripada bagian atasnya, sehingga dorongan bersihnya mengarah ke atas. Archimedes menemukan besarnya lebih dari dua ribu tahun lalu: gaya apung sama dengan berat fluida yang dipindahkan benda. Balok yang separuhnya di bawah air ditopang oleh gaya yang sama dengan berat air sebanyak setengah volume balok.',
        'Jadi, apakah suatu benda mengapung ditentukan oleh kerapatan (massa jenis), yaitu massa dibagi volume. Jika balok kurang rapat daripada fluida, balok hanya perlu memindahkan sebagian volume fluida untuk mengimbangi beratnya, sehingga balok turun sampai bagian sebesar itu berada di bawah permukaan lalu mengapung. Bagian yang tercelup sama dengan kerapatan balok dibagi kerapatan fluida: kayu dengan kerapatan 0,65 g/cm³ mengapung dengan 65% tingginya di bawah air. Jika balok lebih rapat daripada fluida, bahkan ketika tercelup seluruhnya ia tidak dapat memindahkan cukup fluida untuk mengimbangi beratnya, sehingga tenggelam ke dasar. Balok dengan kerapatan sama melayang di kedalaman mana pun.',
        'Di simulasi kamu memilih fluida, mengatur kerapatan balok dengan slider atau tombol preset, lalu menjatuhkannya. Balok bertambah cepat karena beratnya, melambat ketika gaya apung bertambah seiring bagian yang tercelup, dan sedikit naik-turun sebelum menetap di tempat kedua gaya seimbang; gaya hambat dari fluida meredam gerak naik-turun itu. Tampilan memberi persentase yang diprediksi berada di atas permukaan. Slider ukuran menunjukkan sesuatu yang penting: balok lebih besar dengan kerapatan sama mengapung pada bagian yang tepat sama, karena berat dan gaya apung sama-sama bertambah dengan volume.',
        'Simulasi ini membuat segalanya sederhana. Balok selalu berbentuk persegi, sehingga bagian tinggi yang tercelup sama dengan bagian volume yang tercelup, yang tidak berlaku untuk benda bundar atau berbentuk perahu. Simulasi mengabaikan tegangan permukaan, naiknya permukaan fluida saat balok masuk, air yang meresap ke bahan, dan gaya apung udara yang sangat kecil. Benda berongga seperti kapal tidak ditampilkan, tetapi mengikuti aturan yang sama: kerapatan rata-ratanya, termasuk udara di dalamnya, lebih kecil daripada kerapatan air.',
      ],
    },
    figure: {
      caption: {
        en: 'A floating block sinks until the buoyant force (weight of the displaced fluid, blue) equals its own weight (red). A block denser than the fluid cannot displace enough fluid even when fully under, so weight wins and it sinks.',
        id: 'Balok yang mengapung turun sampai gaya apung (berat fluida yang dipindahkan, biru) sama dengan beratnya sendiri (merah). Balok yang lebih rapat daripada fluida tidak dapat memindahkan cukup fluida meski tercelup seluruhnya, sehingga berat menang dan balok tenggelam.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Forces on a floating block and a sinking block', 'Gaya pada balok yang mengapung dan yang tenggelam')}">
  <style>text{font:12px system-ui,sans-serif;fill:currentColor}.m{fill:none;stroke:currentColor;stroke-width:1.2;opacity:.45}.f{stroke-width:2.6;fill:none}</style>
  <path d="M30 40 L30 222 L330 222 L330 40" fill="none" stroke="currentColor" stroke-width="2"/>
  <rect x="31" y="100" width="298" height="121" fill="#3b82f6" fill-opacity=".18"/>
  <line x1="31" y1="100" x2="329" y2="100" stroke="#3b82f6" stroke-width="1.5"/>
  <rect x="80" y="74" width="70" height="70" fill="#f59e0b" fill-opacity=".85"/>
  <rect x="80" y="100" width="70" height="44" fill="#3b82f6" fill-opacity=".25"/>
  <line x1="115" y1="109" x2="115" y2="42" class="f" stroke="#3b82f6" marker-end="url(#a)"/>
  <text x="122" y="52" fill="#3b82f6">${L('buoyant force', 'gaya apung')}</text>
  <line x1="115" y1="109" x2="115" y2="176" class="f" stroke="#ef4444" marker-end="url(#a)"/>
  <text x="122" y="178" fill="#ef4444">${L('weight', 'berat')}</text>
  <text x="40" y="200">${L('floats: forces balance', 'mengapung: gaya seimbang')}</text>
  <text x="40" y="214">${L('submerged part = ρ block / ρ fluid', 'bagian tercelup = ρ balok / ρ fluida')}</text>
  <rect x="205" y="140" width="56" height="56" fill="#8b5cf6" fill-opacity=".85"/>
  <line x1="233" y1="168" x2="233" y2="134" class="f" stroke="#3b82f6" marker-end="url(#a)"/>
  <line x1="233" y1="168" x2="233" y2="214" class="f" stroke="#ef4444" marker-end="url(#a)"/>
  <text x="268" y="150" fill="#3b82f6">${L('smaller', 'kecil')}</text>
  <text x="268" y="212" fill="#ef4444">${L('bigger', 'besar')}</text>
  <text x="184" y="116">${L('sinks: weight wins', 'tenggelam: berat menang')}</text>
  <text x="184" y="130">${L('(denser than fluid)', '(kerapatan lebih besar)')}</text>
  <text x="226" y="92" fill="#3b82f6">${L('fluid surface', 'permukaan fluida')}</text>
  <defs><marker id="a" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="context-stroke"/></marker></defs>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'The buoyant force on an object equals the weight of the fluid it pushes aside (Archimedes\' principle).',
        'Floating or sinking depends on density, not on weight or size: less dense than the fluid floats, denser sinks.',
        'A floating object sinks until the fraction submerged equals its density divided by the fluid\'s density.',
        'A bigger block of the same material floats at the same fraction, because weight and buoyant force grow together.',
        'Denser fluids hold objects up higher: the same block floats higher in salt water than in fresh water, and iron floats on mercury.',
      ],
      id: [
        'Gaya apung pada benda sama dengan berat fluida yang dipindahkannya (asas Archimedes).',
        'Mengapung atau tenggelam ditentukan oleh kerapatan, bukan berat atau ukuran: kurang rapat daripada fluida mengapung, lebih rapat tenggelam.',
        'Benda yang mengapung turun sampai bagian yang tercelup sama dengan kerapatannya dibagi kerapatan fluida.',
        'Balok lebih besar dari bahan yang sama mengapung pada bagian yang sama, karena berat dan gaya apung bertambah bersama.',
        'Fluida yang lebih rapat menopang benda lebih tinggi: balok yang sama mengapung lebih tinggi di air laut daripada di air tawar, dan besi mengapung di raksa.',
      ],
    },
    vocabulary: {
      en: [
        ['Buoyant force', 'The upward push a fluid gives to anything placed in it, caused by pressure being greater lower down.'],
        ['Density', 'Mass divided by volume; water is 1.00 g/cm³, so anything below 1.00 floats in it.'],
        ['Displaced fluid', 'The fluid pushed out of the way by the submerged part of an object; its weight equals the buoyant force.'],
        ['Archimedes\' principle', 'The rule that the buoyant force equals the weight of the displaced fluid.'],
        ['Submerged fraction', 'The part of a floating object below the surface, equal to object density divided by fluid density.'],
        ['Neutral buoyancy', 'The state of an object with exactly the fluid\'s density, which neither rises nor sinks.'],
        ['Weight', 'The downward pull of gravity on an object, equal to its mass times g.'],
      ],
      id: [
        ['Gaya apung', 'Dorongan ke atas yang diberikan fluida pada benda apa pun di dalamnya, akibat tekanan yang lebih besar di bagian bawah.'],
        ['Kerapatan (massa jenis)', 'Massa dibagi volume; air bernilai 1,00 g/cm³, sehingga benda dengan nilai di bawah 1,00 mengapung di air.'],
        ['Fluida yang dipindahkan', 'Fluida yang tersingkir oleh bagian benda yang tercelup; beratnya sama dengan gaya apung.'],
        ['Asas Archimedes', 'Aturan bahwa gaya apung sama dengan berat fluida yang dipindahkan.'],
        ['Bagian tercelup', 'Bagian benda mengapung yang berada di bawah permukaan, sama dengan kerapatan benda dibagi kerapatan fluida.'],
        ['Apung netral', 'Keadaan benda yang kerapatannya tepat sama dengan fluida, sehingga tidak naik maupun tenggelam.'],
        ['Berat', 'Tarikan gravitasi ke bawah pada benda, sama dengan massanya kali g.'],
      ],
    },
    misconceptions: {
      en: [
        ['Heavy things sink and light things float.', 'A steel ship weighing thousands of tonnes floats and a tiny pebble sinks. What matters is density compared with the fluid; the ship\'s average density, air included, is less than water\'s.'],
        ['A bigger block of the same wood will sink deeper.', 'It floats with exactly the same fraction under water. Doubling the size doubles both the weight and the fluid displaced, so the balance point is unchanged, as the size slider shows.'],
        ['The buoyant force only acts on things that float.', 'Everything in a fluid is pushed up, including objects on the bottom. A sunken stone feels lighter under water because the buoyant force takes some of its weight; it sinks because that force is smaller than the weight.'],
        ['Objects float because of the air trapped in them pulling them up.', 'Air does not pull. It lowers the object\'s average density, so the surrounding water, which is denser, pushes the object up more than gravity pulls it down.'],
      ],
      id: [
        ['Benda berat tenggelam dan benda ringan mengapung.', 'Kapal baja seberat ribuan ton mengapung dan kerikil kecil tenggelam. Yang penting adalah kerapatan dibanding fluida; kerapatan rata-rata kapal, termasuk udaranya, lebih kecil daripada air.'],
        ['Balok yang lebih besar dari kayu yang sama akan tenggelam lebih dalam.', 'Balok itu mengapung dengan bagian tercelup yang tepat sama. Menggandakan ukuran menggandakan berat dan fluida yang dipindahkan sekaligus, sehingga titik seimbangnya tidak berubah, seperti ditunjukkan slider ukuran.'],
        ['Gaya apung hanya bekerja pada benda yang mengapung.', 'Semua benda di dalam fluida didorong ke atas, termasuk benda di dasar. Batu yang tenggelam terasa lebih ringan di dalam air karena gaya apung menanggung sebagian beratnya; batu tenggelam karena gaya itu lebih kecil daripada beratnya.'],
        ['Benda mengapung karena udara yang terperangkap di dalamnya menariknya ke atas.', 'Udara tidak menarik. Udara menurunkan kerapatan rata-rata benda, sehingga air di sekitarnya, yang lebih rapat, mendorong benda ke atas lebih kuat daripada tarikan gravitasi ke bawah.'],
      ],
    },
    realWorld: {
      en: [
        'Icebergs float with about 90% of their volume under water, because ice (0.92 g/cm³) is only slightly less dense than sea water.',
        'Ships carry a Plimsoll line on the hull showing the safe loading depth; it has separate marks for fresh and salt water because the ship floats higher in the denser sea.',
        'Submarines dive and surface by letting water into or pumping it out of ballast tanks, changing their average density around that of sea water.',
        'Hot-air balloons and helium balloons float in air by the same rule: the gas inside is less dense than the surrounding air.',
      ],
      id: [
        'Gunung es mengapung dengan sekitar 90% volumenya di bawah air, karena es (0,92 g/cm³) hanya sedikit kurang rapat daripada air laut.',
        'Kapal memiliki garis Plimsoll di lambungnya yang menunjukkan kedalaman muatan yang aman; ada tanda terpisah untuk air tawar dan air laut karena kapal mengapung lebih tinggi di laut yang lebih rapat.',
        'Kapal selam menyelam dan muncul dengan memasukkan air ke tangki pemberat atau memompanya keluar, mengubah kerapatan rata-ratanya di sekitar kerapatan air laut.',
        'Balon udara panas dan balon helium mengapung di udara dengan aturan yang sama: gas di dalamnya kurang rapat daripada udara di sekitarnya.',
      ],
    },
    questions: {
      en: [
        { q: 'A wooden block of density 0.65 g/cm³ is dropped into water (1.00 g/cm³). What fraction of it ends up under the surface, and what fraction sticks out?', a: 'Submerged fraction = 0.65 / 1.00 = 0.65, so 65% is under water and 35% sticks out. Dropping it into salt water (1.03) gives 0.65 / 1.03 ≈ 0.63, so it floats a little higher.' },
        { q: 'Iron (7.87 g/cm³) sinks in water. What happens when you switch the fluid to mercury (13.6 g/cm³)?', a: 'It floats, because iron is less dense than mercury. The submerged fraction is 7.87 / 13.6 ≈ 0.58, so about 58% of the block is below the surface and 42% above. Gold (19.3) is denser than mercury, so it still sinks.' },
        { q: 'Your friend says a block twice as large will float lower in the water because it is heavier. Use the sim to test this and explain the result.', a: 'The bigger block floats at the same fraction. Its weight is doubled, but so is the volume of fluid it can displace for the same fraction submerged, so the buoyant force doubles too and the balance point is unchanged. Only density, not size, decides how deep a block floats.' },
      ],
      id: [
        { q: 'Balok kayu dengan kerapatan 0,65 g/cm³ dijatuhkan ke air (1,00 g/cm³). Berapa bagian yang berada di bawah permukaan, dan berapa yang menonjol keluar?', a: 'Bagian tercelup = 0,65 / 1,00 = 0,65, jadi 65% di bawah air dan 35% menonjol keluar. Jika dijatuhkan ke air laut (1,03) hasilnya 0,65 / 1,03 ≈ 0,63, sehingga balok mengapung sedikit lebih tinggi.' },
        { q: 'Besi (7,87 g/cm³) tenggelam di air. Apa yang terjadi jika fluida diganti menjadi raksa (13,6 g/cm³)?', a: 'Besi mengapung, karena kurang rapat daripada raksa. Bagian tercelupnya 7,87 / 13,6 ≈ 0,58, jadi sekitar 58% balok di bawah permukaan dan 42% di atasnya. Emas (19,3) lebih rapat daripada raksa, sehingga tetap tenggelam.' },
        { q: 'Temanmu berkata balok yang dua kali lebih besar akan mengapung lebih rendah karena lebih berat. Uji dengan simulasi dan jelaskan hasilnya.', a: 'Balok yang lebih besar mengapung pada bagian yang sama. Beratnya memang dua kali, tetapi volume fluida yang dapat dipindahkannya untuk bagian tercelup yang sama juga dua kali, sehingga gaya apung ikut menggandakan dan titik seimbangnya tidak berubah. Hanya kerapatan, bukan ukuran, yang menentukan seberapa dalam balok mengapung.' },
      ],
    },
  },
};
