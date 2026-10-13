// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Read approximate pH from an indicator color.',
      'Compare the working ranges of different indicators.',
      'Distinguish strong vs. weak acid/base behavior on the scale.',
    ],
    id: [
      'Membaca pH perkiraan dari warna indikator.',
      'Membandingkan rentang kerja indikator yang berbeda.',
      'Membedakan perilaku asam/basa kuat dan lemah pada skala.',
    ],
  },
  tryThis: {
    en: [
      'Set pH to 4.5 — which indicators clearly distinguish it from pH 6?',
      'Find an indicator that gives no useful information at pH 9.',
      'Match the color of household vinegar (pH ≈ 2.4).',
    ],
    id: [
      'Atur pH ke 4,5 — indikator mana yang jelas membedakannya dari pH 6?',
      'Cari indikator yang tidak memberi informasi berguna pada pH 9.',
      'Cocokkan warna cuka rumah tangga (pH ≈ 2,4).',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'Acids such as vinegar and lemon juice release hydrogen ions into water; bases such as soap and baking soda soak them up. The pH scale is a quick way to say how many hydrogen ions a solution contains. It runs from 0 (very acidic) through 7 (neutral, like pure water at room temperature) to 14 (very basic). The scale is compressed: each step of one pH unit means ten times more or fewer hydrogen ions, so pH 3 has a hundred times more than pH 5. You cannot safely taste or touch an unknown solution to find out, so chemists use indicators instead.',
        'An indicator is a coloured substance that can exist in two forms: one with an extra hydrogen ion attached and one without. In acid the attached form wins and shows one colour; in base the ion is pulled off and a different colour appears. The swap happens over a narrow transition range of about two pH units that is different for each indicator: methyl orange changes from red to yellow between pH 3.1 and 4.4, bromothymol blue from yellow to blue between 6.0 and 7.6, litmus from red to blue between roughly 4.5 and 8.3, and phenolphthalein from colourless to pink between 8.2 and 10. Universal indicator is a mixture of several dyes, so its colour shifts step by step across the whole scale.',
        'In the simulation you set the pH with the slider or pick a preset such as vinegar, coffee or bleach, and choose an indicator from the menu. The beaker shows the colour that indicator would have at that pH, blending between fixed colour stops inside the transition range and staying constant outside it. The label underneath calls the solution acidic below pH 6.5, basic above 7.5 and neutral in between. Try the same pH with each indicator to see that an indicator only tells you something near its own transition range: at pH 9, methyl orange and bromothymol blue are both stuck at their basic colour.',
        'Real indicators are a little more complicated. Their colours are approximate, and they look different in a thin test strip than in a full beaker. The sim also shows only pH, not concentration or strength: a dilute strong acid and a concentrated weak acid can have the same pH and look identical, even though they behave differently when mixed with other things. Adding a lot of indicator to a real sample changes its pH slightly, and the pH of pure water drifts with temperature. The household values in the presets are typical ones; real coffee, soap or bleach vary from brand to brand.',
      ],
      id: [
        'Asam seperti cuka dan air jeruk nipis melepaskan ion hidrogen ke dalam air; basa seperti sabun dan soda kue menyerapnya. Skala pH adalah cara cepat menyatakan seberapa banyak ion hidrogen di dalam suatu larutan. Skala ini berjalan dari 0 (sangat asam) lewat 7 (netral, seperti air murni pada suhu kamar) sampai 14 (sangat basa). Skalanya dipadatkan: setiap langkah satu satuan pH berarti ion hidrogen sepuluh kali lebih banyak atau lebih sedikit, sehingga pH 3 punya seratus kali lebih banyak daripada pH 5. Kamu tidak boleh mencicipi atau menyentuh larutan yang tidak dikenal untuk mengetahuinya, jadi para kimiawan memakai indikator.',
        'Indikator adalah zat berwarna yang bisa berada dalam dua bentuk: satu dengan ion hidrogen tambahan yang menempel dan satu tanpa ion itu. Dalam asam, bentuk yang menempel menang dan menampilkan satu warna; dalam basa, ionnya ditarik lepas dan muncul warna yang berbeda. Pertukaran ini terjadi dalam rentang perubahan yang sempit, sekitar dua satuan pH, dan berbeda untuk tiap indikator: metil jingga berubah dari merah ke kuning antara pH 3,1 dan 4,4, bromotimol biru dari kuning ke biru antara 6,0 dan 7,6, lakmus dari merah ke biru antara kira-kira 4,5 dan 8,3, dan fenolftalein dari tak berwarna ke merah muda antara 8,2 dan 10. Indikator universal adalah campuran beberapa zat warna, sehingga warnanya bergeser bertahap di seluruh skala.',
        'Di simulasi kamu mengatur pH dengan slider atau memilih contoh seperti cuka, kopi, atau pemutih, lalu memilih indikator dari menu. Gelas kimia menampilkan warna indikator itu pada pH tersebut, memadukan warna di antara titik-titik warna tetap dalam rentang perubahan dan tetap sama di luarnya. Label di bawahnya menyebut larutan asam di bawah pH 6,5, basa di atas 7,5, dan netral di antaranya. Coba pH yang sama dengan tiap indikator untuk melihat bahwa indikator hanya memberi informasi di dekat rentang perubahannya sendiri: pada pH 9, metil jingga dan bromotimol biru sama-sama terpaku pada warna basanya.',
        'Indikator sungguhan sedikit lebih rumit. Warnanya hanya perkiraan, dan tampak berbeda pada kertas uji tipis dibanding dalam gelas penuh. Simulasi juga hanya menampilkan pH, bukan konsentrasi atau kekuatan: asam kuat yang encer dan asam lemah yang pekat bisa memiliki pH sama dan tampak identik, meskipun berperilaku berbeda saat dicampur dengan zat lain. Menambahkan banyak indikator ke sampel nyata sedikit mengubah pH-nya, dan pH air murni bergeser mengikuti suhu. Nilai bahan rumah tangga pada tombol contoh adalah nilai khas; kopi, sabun, atau pemutih sungguhan berbeda dari merek ke merek.',
      ],
    },
    figure: {
      caption: {
        en: 'Each indicator has its own narrow transition range on the pH scale (shown as a fade between its two colours). Outside that range it is stuck at one colour and tells you only "below" or "above". Phenolphthalein is colourless in acid.',
        id: 'Tiap indikator punya rentang perubahan sempit sendiri pada skala pH (ditampilkan sebagai peralihan di antara dua warnanya). Di luar rentang itu warnanya tetap dan hanya memberi tahu "di bawah" atau "di atas". Fenolftalein tak berwarna dalam asam.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Transition ranges of common pH indicators', 'Rentang perubahan indikator pH yang umum')}">
  <style>text{font:12px system-ui,sans-serif;fill:currentColor}.m{fill:none;stroke:currentColor;stroke-width:1.2;opacity:.45}.s{font-size:10px;opacity:.8}.n{font-size:10px;font-weight:600}</style>
  <defs>
    <linearGradient id="ph"><stop offset="0" stop-color="#ef4444"/><stop offset=".5" stop-color="#10b981"/><stop offset="1" stop-color="#8b5cf6"/></linearGradient>
    <linearGradient id="g1"><stop offset="0" stop-color="#ef4444"/><stop offset="1" stop-color="#f59e0b"/></linearGradient>
    <linearGradient id="g2"><stop offset="0" stop-color="#f59e0b"/><stop offset="1" stop-color="#3b82f6"/></linearGradient>
    <linearGradient id="g3"><stop offset="0" stop-color="#ef4444"/><stop offset="1" stop-color="#3b82f6"/></linearGradient>
    <linearGradient id="g4"><stop offset="0" stop-color="#8b5cf6" stop-opacity="0"/><stop offset="1" stop-color="#8b5cf6"/></linearGradient>
  </defs>
  <text x="40" y="22" class="s">${L('acidic', 'asam')}</text>
  <text x="172" y="22" class="s">${L('neutral', 'netral')}</text>
  <text x="314" y="22" class="s">${L('basic', 'basa')}</text>
  <rect x="40" y="28" width="300" height="12" fill="url(#ph)"/>
  <line x1="190" y1="26" x2="190" y2="44" class="m"/>
  <text x="37" y="56" class="s">0</text><text x="80" y="56" class="s">2</text><text x="123" y="56" class="s">4</text><text x="166" y="56" class="s">6</text><text x="209" y="56" class="s">8</text><text x="251" y="56" class="s">10</text><text x="294" y="56" class="s">12</text><text x="334" y="56" class="s">14</text>
  <text x="40" y="76" class="n">${L('Methyl orange (3.1–4.4)', 'Metil jingga (3,1–4,4)')}</text>
  <rect x="40" y="80" width="66.4" height="8" fill="#ef4444"/><rect x="106.4" y="80" width="27.9" height="8" fill="url(#g1)"/><rect x="134.3" y="80" width="205.7" height="8" fill="#f59e0b"/>
  <text x="40" y="98" class="s">${L('red', 'merah')}</text><text x="300" y="98" class="s">${L('yellow', 'kuning')}</text>
  <text x="40" y="110" class="n">${L('Bromothymol blue (6.0–7.6)', 'Bromotimol biru (6,0–7,6)')}</text>
  <rect x="40" y="114" width="128.6" height="8" fill="#f59e0b"/><rect x="168.6" y="114" width="34.3" height="8" fill="url(#g2)"/><rect x="202.9" y="114" width="137.1" height="8" fill="#3b82f6"/>
  <text x="40" y="132" class="s">${L('yellow', 'kuning')}</text><text x="310" y="132" class="s">${L('blue', 'biru')}</text>
  <text x="40" y="144" class="n">${L('Litmus (about 4.5–8.3)', 'Lakmus (sekitar 4,5–8,3)')}</text>
  <rect x="40" y="148" width="96.4" height="8" fill="#ef4444"/><rect x="136.4" y="148" width="81.5" height="8" fill="url(#g3)"/><rect x="217.9" y="148" width="122.1" height="8" fill="#3b82f6"/>
  <text x="40" y="166" class="s">${L('red', 'merah')}</text><text x="310" y="166" class="s">${L('blue', 'biru')}</text>
  <text x="40" y="178" class="n">${L('Phenolphthalein (8.2–10)', 'Fenolftalein (8,2–10)')}</text>
  <rect x="40" y="182" width="175.7" height="8" class="m"/><rect x="215.7" y="182" width="38.6" height="8" fill="url(#g4)"/><rect x="254.3" y="182" width="85.7" height="8" fill="#8b5cf6"/>
  <text x="40" y="200" class="s">${L('colourless', 'tak berwarna')}</text><text x="310" y="200" class="s">${L('pink', 'merah muda')}</text>
  <text x="40" y="222" class="s">${L('The dye swaps colour when it loses or gains a hydrogen ion.', 'Zat warna berganti warna saat melepas atau menerima ion hidrogen.')}</text>
  <text x="40" y="236" class="s">${L('Universal indicator mixes several dyes to cover the whole scale.', 'Indikator universal mencampur beberapa zat warna untuk seluruh skala.')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'pH measures how acidic or basic a solution is: below 7 is acidic, 7 is neutral and above 7 is basic.',
        'Each pH step is a factor of ten in hydrogen ions, so small differences in pH mean big differences in acidity.',
        'An indicator is a dye that changes colour because its molecule gains or loses a hydrogen ion as the pH changes.',
        'Every indicator has its own transition range of about two pH units; outside that range its colour does not change.',
        'A universal indicator combines several dyes to give a different colour at almost every pH, which is why it is used for unknown samples.',
      ],
      id: [
        'pH mengukur seberapa asam atau basa suatu larutan: di bawah 7 asam, 7 netral, dan di atas 7 basa.',
        'Tiap langkah pH berarti ion hidrogen berubah sepuluh kali lipat, sehingga selisih pH yang kecil berarti perbedaan keasaman yang besar.',
        'Indikator adalah zat warna yang berubah warna karena molekulnya menerima atau melepas ion hidrogen saat pH berubah.',
        'Tiap indikator punya rentang perubahan sendiri sekitar dua satuan pH; di luar rentang itu warnanya tidak berubah.',
        'Indikator universal menggabungkan beberapa zat warna sehingga berwarna berbeda pada hampir setiap pH; itulah sebabnya dipakai untuk sampel yang tidak dikenal.',
      ],
    },
    vocabulary: {
      en: [
        ['Acid', 'A substance that releases hydrogen ions in water; acids taste sour and have pH below 7.'],
        ['Base', 'A substance that removes hydrogen ions from water; bases often feel slippery and have pH above 7. A base dissolved in water is also called an alkali.'],
        ['pH', 'A number from 0 to 14 describing the amount of hydrogen ions in a solution; lower means more acidic.'],
        ['Neutral', 'Neither acidic nor basic, pH 7, like pure water at room temperature.'],
        ['Indicator', 'A dye whose colour depends on pH, used to find out whether a solution is acidic or basic.'],
        ['Transition range', 'The span of pH values over which an indicator changes from one colour to the other.'],
        ['Litmus', 'A natural dye from lichens; litmus paper turns red in acid and blue in base.'],
      ],
      id: [
        ['Asam', 'Zat yang melepaskan ion hidrogen di dalam air; asam terasa masam dan pH-nya di bawah 7.'],
        ['Basa', 'Zat yang menghilangkan ion hidrogen dari air; basa sering terasa licin dan pH-nya di atas 7. Basa yang larut dalam air disebut juga alkali.'],
        ['pH', 'Angka dari 0 sampai 14 yang menggambarkan jumlah ion hidrogen dalam larutan; makin kecil berarti makin asam.'],
        ['Netral', 'Tidak asam dan tidak basa, pH 7, seperti air murni pada suhu kamar.'],
        ['Indikator', 'Zat warna yang warnanya bergantung pada pH, dipakai untuk mengetahui apakah larutan bersifat asam atau basa.'],
        ['Rentang perubahan', 'Selang nilai pH ketika indikator berubah dari satu warna ke warna lainnya.'],
        ['Lakmus', 'Zat warna alami dari lumut kerak; kertas lakmus menjadi merah dalam asam dan biru dalam basa.'],
      ],
    },
    misconceptions: {
      en: [
        ['pH 2 is only a little more acidic than pH 4.', 'It is a hundred times more acidic. Each step of one pH unit is a factor of ten in hydrogen ions, so two steps is 10 × 10.'],
        ['If an indicator does not change colour, the solution must be neutral.', 'It only means the pH is outside that indicator\'s transition range. Phenolphthalein is colourless at pH 2 and at pH 7 alike; you need a different indicator to tell them apart.'],
        ['Pure water always has pH exactly 7.', 'At 25 °C it does, but pH of pure water drops slightly as it warms. Tap water and rainwater are also usually a little away from 7 because of dissolved gases and minerals.'],
        ['The indicator is what makes the solution acidic or basic.', 'The indicator only reports the pH that is already there. A few drops are used precisely so that it changes the solution as little as possible.'],
      ],
      id: [
        ['pH 2 hanya sedikit lebih asam daripada pH 4.', 'pH 2 seratus kali lebih asam. Tiap langkah satu satuan pH berarti ion hidrogen berubah sepuluh kali, sehingga dua langkah berarti 10 × 10.'],
        ['Jika indikator tidak berubah warna, larutannya pasti netral.', 'Itu hanya berarti pH-nya berada di luar rentang perubahan indikator tersebut. Fenolftalein tak berwarna pada pH 2 maupun pH 7; perlu indikator lain untuk membedakannya.'],
        ['Air murni selalu ber-pH tepat 7.', 'Pada 25 °C memang begitu, tetapi pH air murni sedikit turun saat menghangat. Air keran dan air hujan juga biasanya sedikit menyimpang dari 7 karena gas dan mineral yang terlarut.'],
        ['Indikatorlah yang membuat larutan menjadi asam atau basa.', 'Indikator hanya melaporkan pH yang sudah ada. Hanya beberapa tetes yang dipakai justru agar larutan berubah sesedikit mungkin.'],
      ],
    },
    realWorld: {
      en: [
        'Red cabbage juice is a natural universal indicator: it turns red in vinegar, purple in water and green or yellow in soapy water, so you can test kitchen liquids at home.',
        'Swimming pool and aquarium test kits use indicator dyes to keep the water near pH 7.4, which is comfortable for eyes and safe for fish.',
        'Gardeners test soil pH because many plants are fussy about it; hydrangea flowers even turn blue in acidic soil and pink in basic soil.',
        'In titrations, chemists add a base to an acid drop by drop and use phenolphthalein\'s sudden colourless-to-pink change to spot the exact moment the acid is used up.',
      ],
      id: [
        'Air kubis merah adalah indikator universal alami: berubah merah dalam cuka, ungu dalam air, dan hijau atau kuning dalam air sabun, sehingga kamu bisa menguji cairan dapur di rumah.',
        'Alat uji kolam renang dan akuarium memakai zat warna indikator untuk menjaga air di sekitar pH 7,4, yang nyaman bagi mata dan aman bagi ikan.',
        'Petani dan pekebun menguji pH tanah karena banyak tanaman peka terhadapnya; bunga hortensia bahkan berwarna biru di tanah asam dan merah muda di tanah basa.',
        'Dalam titrasi, kimiawan menambahkan basa ke asam tetes demi tetes dan memakai perubahan mendadak fenolftalein dari tak berwarna ke merah muda untuk menandai saat asamnya tepat habis.',
      ],
    },
    questions: {
      en: [
        { q: 'A solution turns methyl orange yellow and leaves phenolphthalein colourless. What can you say about its pH?', a: 'It is above 4.4 (otherwise methyl orange would be red or orange) and below 8.2 (otherwise phenolphthalein would be pink). So the pH is somewhere between about 4.4 and 8.2: it could be weakly acidic, neutral or slightly basic. Bromothymol blue would narrow it down further.' },
        { q: 'Vinegar has pH 2.4 and lemon juice pH 2. Why can litmus not tell them apart, and what could?', a: 'Both are far below litmus\'s transition range (about 4.5 to 8.3), so litmus is simply red in both. A universal indicator, which changes colour gradually across the scale, or a pH meter, could tell the difference.' },
        { q: 'How many times more hydrogen ions does a solution of pH 3 contain than one of pH 5?', a: 'One hundred times. Each pH step is a factor of ten, and there are two steps between 5 and 3, so 10 × 10 = 100.' },
      ],
      id: [
        { q: 'Sebuah larutan mengubah metil jingga menjadi kuning dan membiarkan fenolftalein tak berwarna. Apa yang bisa kamu katakan tentang pH-nya?', a: 'pH-nya di atas 4,4 (jika tidak, metil jingga akan merah atau jingga) dan di bawah 8,2 (jika tidak, fenolftalein akan merah muda). Jadi pH-nya di antara sekitar 4,4 dan 8,2: bisa sedikit asam, netral, atau sedikit basa. Bromotimol biru dapat mempersempitnya lebih jauh.' },
        { q: 'Cuka ber-pH 2,4 dan air jeruk nipis ber-pH 2. Mengapa lakmus tidak bisa membedakannya, dan apa yang bisa?', a: 'Keduanya jauh di bawah rentang perubahan lakmus (sekitar 4,5 sampai 8,3), sehingga lakmus hanya merah pada keduanya. Indikator universal, yang warnanya berubah bertahap di seluruh skala, atau pH meter, dapat membedakannya.' },
        { q: 'Berapa kali lebih banyak ion hidrogen dalam larutan ber-pH 3 dibanding larutan ber-pH 5?', a: 'Seratus kali. Tiap langkah pH berarti faktor sepuluh, dan ada dua langkah antara 5 dan 3, sehingga 10 × 10 = 100.' },
      ],
    },
  },
};
