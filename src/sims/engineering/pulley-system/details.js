// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Mechanical advantage = number of rope segments supporting the load.',
      'Force × distance is conserved: pulling 4 m at ¼ force lifts 1 m.',
      'Pulleys do not multiply work — only redistribute it.',
    ],
    id: [
      'Keuntungan mekanis = jumlah segmen tali yang menahan beban.',
      'Gaya × jarak kekal: menarik 4 m dengan ¼ gaya mengangkat 1 m.',
      'Katrol tidak melipatgandakan kerja — hanya mendistribusikannya.',
    ],
  },  tryThis: {
    en: [
      'Single fixed pulley — MA = 1, just changes direction.',
      'Block and tackle MA = 4 — pull 4 m to lift 1 m.',
      'Watch energy: input distance × force = output distance × weight.',
    ],
    id: [
      'Katrol tetap tunggal — MA = 1, hanya mengubah arah.',
      'Sistem MA = 4 — tarik 4 m untuk mengangkat 1 m.',
      'Perhatikan energi: jarak masuk × gaya = jarak keluar × berat.',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'A pulley is a wheel with a rope running over it. A single pulley fixed to the ceiling does not make a load any lighter: you still pull with a force equal to the weight. It only changes the direction of your pull, so you can lift a bucket upward by pulling downward, which is easier on your body. The useful trick starts when a pulley is attached to the load itself and moves with it.',
        'If the rope is tight and we ignore friction, the pull (tension) is the same everywhere along the rope. When two rope segments hang from a movable pulley, each one carries half the weight, so you only need to pull with half the force. With four segments holding the load, each carries a quarter. The number of rope segments holding up the load is the mechanical advantage, and in this simulation you choose it directly, from 1× to 6×. The effort force shown is the weight divided by that number.',
        'There is a price. When you drag the red grip and pull 1 m of rope through a 4× system, that metre is shared between the four segments, so the load rises only a quarter of a metre. Less force, but more rope. Multiply force by distance and you get the work done: the readouts W_in and W_out stay equal. A pulley does not give you energy for free; it lets you do the same job with a smaller force over a longer distance.',
        'The simulation is an ideal machine. The rope does not stretch, the pulleys have no weight and no friction, and the load weight slider sets the mass in kilograms, which the sim turns into a weight in newtons by multiplying by 9.8. In a real block and tackle, friction in the axles means you must pull a little harder than the ideal value, and the lower pulley adds its own weight to the load, so real mechanical advantage is always slightly less than the count of rope segments.',
      ],
      id: [
        'Katrol adalah roda yang dilewati seutas tali. Satu katrol yang dipasang tetap di langit-langit tidak membuat beban terasa lebih ringan: kamu tetap menarik dengan gaya sebesar berat beban. Katrol itu hanya mengubah arah tarikan, sehingga ember bisa naik ketika kamu menarik ke bawah, dan itu lebih nyaman bagi tubuh. Keuntungan yang sesungguhnya baru muncul ketika sebuah katrol dipasang pada beban dan ikut bergerak bersamanya.',
        'Jika tali tegang dan gesekan diabaikan, tarikan (tegangan) di sepanjang tali sama besar di mana-mana. Ketika dua segmen tali menggantung katrol bergerak, masing-masing menanggung setengah berat, sehingga kamu cukup menarik dengan setengah gaya. Dengan empat segmen yang menahan beban, tiap segmen menanggung seperempat. Jumlah segmen tali yang menahan beban inilah keuntungan mekanis, dan di simulasi ini kamu memilihnya langsung, dari 1× sampai 6×. Gaya kuasa yang ditampilkan adalah berat dibagi jumlah itu.',
        'Ada harganya. Saat kamu menyeret pegangan merah dan menarik 1 m tali pada sistem 4×, satu meter itu dibagi ke empat segmen, sehingga beban hanya naik seperempat meter. Gayanya lebih kecil, tetapi talinya lebih panjang. Kalikan gaya dengan jarak, hasilnya adalah usaha: angka W_in dan W_out di layar selalu sama. Katrol tidak memberi energi gratis; ia membiarkan kamu menyelesaikan pekerjaan yang sama dengan gaya lebih kecil tetapi jarak lebih jauh.',
        'Simulasi ini adalah mesin ideal. Talinya tidak mulur, katrolnya tidak punya berat dan tidak ada gesekan, dan slider berat beban mengatur massa dalam kilogram, yang diubah menjadi berat dalam newton dengan mengalikannya dengan 9,8. Pada sistem katrol sungguhan, gesekan di poros membuat kamu harus menarik sedikit lebih kuat daripada nilai ideal, dan katrol bawah menambah beratnya sendiri ke beban, sehingga keuntungan mekanis nyata selalu sedikit lebih kecil daripada jumlah segmen tali.',
      ],
    },
    figure: {
      caption: {
        en: 'A 2× block and tackle. Two rope segments (green, numbered) hold the movable pulley and the load, so each carries half the weight and the pull needed is W ÷ 2. The segment to the hand only redirects the rope. Pulling 2 m of rope raises the load 1 m.',
        id: 'Sistem katrol 2×. Dua segmen tali (hijau, bernomor) menahan katrol bergerak dan beban, sehingga masing-masing menanggung setengah berat dan tarikan yang dibutuhkan adalah W ÷ 2. Segmen ke tangan hanya membelokkan arah tali. Menarik 2 m tali menaikkan beban 1 m.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('A two-segment pulley system', 'Sistem katrol dua segmen')}">
  <style>text{font:12px system-ui,sans-serif;fill:currentColor}.m{fill:none;stroke:currentColor;stroke-width:1.2;opacity:.45}.r{fill:none;stroke-width:2.5;stroke-linecap:round}.w{fill:none;stroke:currentColor;stroke-width:1.6}</style>
  <line x1="40" y1="24" x2="250" y2="24" stroke="currentColor" stroke-width="3"/>
  <path d="M50 24 L44 14 M70 24 L64 14 M90 24 L84 14 M110 24 L104 14 M130 24 L124 14 M150 24 L144 14 M170 24 L164 14 M190 24 L184 14 M210 24 L204 14 M230 24 L224 14" class="m"/>
  <path d="M110 24 L110 130" class="r" stroke="#10b981"/>
  <path d="M110 130 A14 14 0 0 0 138 130" class="r" stroke="#f59e0b"/>
  <path d="M138 130 L138 40" class="r" stroke="#10b981"/>
  <path d="M138 40 A14 14 0 0 1 166 40" class="r" stroke="#f59e0b"/>
  <path d="M166 40 L166 150" class="r" stroke="#ef4444"/>
  <line x1="152" y1="24" x2="152" y2="40" class="w"/>
  <circle cx="152" cy="40" r="14" fill="none" stroke="currentColor" stroke-width="1.6"/>
  <circle cx="152" cy="40" r="3" fill="currentColor"/>
  <circle cx="124" cy="130" r="14" fill="none" stroke="currentColor" stroke-width="1.6"/>
  <circle cx="124" cy="130" r="3" fill="currentColor"/>
  <line x1="124" y1="144" x2="124" y2="160" class="w"/>
  <rect x="94" y="160" width="60" height="36" rx="3" fill="#3b82f6"/>
  <text x="124" y="183" text-anchor="middle" fill="#fff" font-weight="bold">W</text>
  <circle cx="166" cy="150" r="9" fill="#ef4444"/>
  <text x="96" y="80" text-anchor="middle" fill="#10b981" font-weight="bold">1</text>
  <text x="150" y="90" text-anchor="middle" fill="#10b981" font-weight="bold">2</text>
  <text x="180" y="154" fill="#ef4444">${L('pull = W ÷ 2', 'tarik = W ÷ 2')}</text>
  <text x="172" y="100" font-size="11">${L('fixed pulley', 'katrol tetap')}</text>
  <path d="M170 96 L158 56" class="m" marker-end="url(#a)"/>
  <text x="40" y="120" font-size="11">${L('movable', 'katrol')}</text>
  <text x="40" y="133" font-size="11">${L('pulley', 'bergerak')}</text>
  <path d="M76 127 L108 130" class="m" marker-end="url(#a)"/>
  <line x1="270" y1="60" x2="270" y2="200" class="m"/>
  <path d="M290 70 L290 130" stroke="#ef4444" stroke-width="2" fill="none" marker-end="url(#a)"/>
  <text x="298" y="104" fill="#ef4444">${L('rope 2 m', 'tali 2 m')}</text>
  <path d="M290 195 L290 165" stroke="#3b82f6" stroke-width="2" fill="none" marker-end="url(#a)"/>
  <text x="298" y="184" fill="#3b82f6">${L('load 1 m', 'beban 1 m')}</text>
  <text x="180" y="226">${L('2 segments hold the load → half the force', '2 segmen menahan beban → setengah gaya')}</text>
  <defs><marker id="a" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="context-stroke"/></marker></defs>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'A single fixed pulley changes the direction of your pull but not its size.',
        'The effort you need is the weight divided by the number of rope segments holding the load.',
        'What you save in force you pay for in rope: the load rises only 1/N of the distance you pull.',
        'Work in equals work out for an ideal pulley; no machine creates energy.',
        'Friction and the weight of the pulleys make real systems a little less helpful than the ideal count.',
      ],
      id: [
        'Satu katrol tetap mengubah arah tarikan, bukan besarnya.',
        'Gaya kuasa yang dibutuhkan adalah berat dibagi jumlah segmen tali yang menahan beban.',
        'Gaya yang kamu hemat dibayar dengan tali: beban hanya naik 1/N dari jarak yang kamu tarik.',
        'Usaha masuk sama dengan usaha keluar pada katrol ideal; tidak ada mesin yang menciptakan energi.',
        'Gesekan dan berat katrol membuat sistem nyata sedikit kurang membantu daripada hitungan idealnya.',
      ],
    },
    vocabulary: {
      en: [
        ['Pulley', 'A grooved wheel on an axle that a rope runs over, letting the rope change direction with little friction.'],
        ['Fixed pulley', 'A pulley attached to something that does not move, such as a ceiling or beam.'],
        ['Movable pulley', 'A pulley attached to the load, which rises together with it; this is what shares the weight between rope segments.'],
        ['Mechanical advantage', 'How many times a machine multiplies your force: load weight divided by effort force.'],
        ['Effort', 'The force you apply to the rope.'],
        ['Tension', 'The pulling force inside a stretched rope, the same all along an ideal rope.'],
        ['Work', 'Force multiplied by the distance moved in the direction of the force, measured in joules.'],
        ['Block and tackle', 'A set of fixed and movable pulleys threaded with one rope to give a large mechanical advantage.'],
      ],
      id: [
        ['Katrol', 'Roda beralur pada sebuah poros yang dilewati tali, sehingga arah tali bisa berubah dengan gesekan kecil.'],
        ['Katrol tetap', 'Katrol yang dipasang pada sesuatu yang tidak bergerak, misalnya langit-langit atau balok.'],
        ['Katrol bergerak', 'Katrol yang dipasang pada beban dan ikut naik bersamanya; inilah yang membagi berat ke beberapa segmen tali.'],
        ['Keuntungan mekanis', 'Berapa kali sebuah mesin melipatgandakan gayamu: berat beban dibagi gaya kuasa.'],
        ['Gaya kuasa', 'Gaya yang kamu berikan pada tali.'],
        ['Tegangan tali', 'Gaya tarik di dalam tali yang teregang, besarnya sama di sepanjang tali ideal.'],
        ['Usaha', 'Gaya dikali jarak perpindahan searah gaya, diukur dalam joule.'],
        ['Katrol majemuk', 'Gabungan katrol tetap dan katrol bergerak yang dirangkai satu tali untuk memberi keuntungan mekanis besar.'],
      ],
    },
    misconceptions: {
      en: [
        ['More pulleys always means less effort.', 'Only rope segments that pull up on the load count. A pulley that just redirects the rope, like the single fixed pulley at 1×, adds nothing to the mechanical advantage.'],
        ['A pulley lets you do less work.', 'The work is the same. You use a smaller force, but you pull the rope a longer distance, and force times distance comes out equal, as the W_in and W_out readouts show.'],
        ['The rope pulls harder on the load than on my hand.', 'In an ideal rope the tension is the same everywhere. The load feels a bigger total force only because several segments are pulling on it at once.'],
        ['Heavier loads need a different pulley to get the same advantage.', 'The mechanical advantage depends only on how the rope is threaded. Doubling the load doubles the effort, but the ratio of weight to effort stays the same.'],
      ],
      id: [
        ['Semakin banyak katrol, semakin kecil gaya yang dibutuhkan.', 'Yang dihitung hanya segmen tali yang menarik beban ke atas. Katrol yang hanya membelokkan tali, seperti katrol tetap tunggal pada 1×, tidak menambah keuntungan mekanis sama sekali.'],
        ['Katrol membuat kita melakukan usaha lebih sedikit.', 'Usahanya sama. Gaya yang dipakai lebih kecil, tetapi tali yang ditarik lebih panjang, dan gaya dikali jarak hasilnya tetap sama, seperti terlihat pada angka W_in dan W_out.'],
        ['Tali menarik beban lebih kuat daripada menarik tanganku.', 'Pada tali ideal tegangannya sama di mana-mana. Beban merasakan gaya total yang lebih besar hanya karena beberapa segmen menariknya sekaligus.'],
        ['Beban yang lebih berat butuh katrol berbeda agar keuntungannya sama.', 'Keuntungan mekanis hanya bergantung pada cara tali dirangkai. Menggandakan beban menggandakan gaya kuasa, tetapi perbandingan berat terhadap gaya kuasa tetap sama.'],
      ],
    },
    realWorld: {
      en: [
        'A flagpole uses a single fixed pulley: you pull down and the flag goes up, with no change in force.',
        'Construction cranes and ship hoists thread the cable several times between the hook block and the boom so that a modest motor can lift many tonnes.',
        'Sailors use block and tackle to tighten sails against the wind, trading a long haul on the rope for a small pull.',
        'Cable machines in a gym use pulleys to redirect the weight stack; some add a movable pulley so the handle feels half as heavy as the stack.',
      ],
      id: [
        'Tiang bendera memakai satu katrol tetap: kamu menarik ke bawah dan bendera naik, tanpa perubahan gaya.',
        'Derek bangunan dan kerekan kapal melilitkan kabel beberapa kali antara blok pengait dan lengan derek sehingga motor yang tidak terlalu besar bisa mengangkat berton-ton beban.',
        'Pelaut memakai katrol majemuk untuk menegangkan layar melawan angin, menukar tarikan tali yang panjang dengan gaya yang kecil.',
        'Alat kabel di pusat kebugaran memakai katrol untuk membelokkan arah tumpukan beban; sebagian menambah katrol bergerak sehingga pegangan terasa setengah dari berat tumpukannya.',
      ],
    },
    questions: {
      en: [
        { q: 'The load is 100 kg (weight about 980 N) and you choose 4×. How hard must you pull, and how much rope do you pull to lift the load 1 m?', a: 'About 245 N, because 980 N is shared by four rope segments. Each segment must shorten by 1 m for the load to rise 1 m, so you pull 4 m of rope.' },
        { q: 'With 2× you pull 2 m of rope but the load rises only 1 m. Where did the other metre go?', a: 'It was shared between the two segments holding the pulley. Both segments must get 1 m shorter for the movable pulley to rise 1 m, and together that is the 2 m you pulled. Nothing is lost; the distance is divided, just as the force is.' },
        { q: 'A friend says a 6× pulley gives you six times the energy. Is that right?', a: 'No. It gives one sixth of the force but needs six times the rope, so force times distance, the work, is unchanged. The W_in and W_out readouts stay equal at every setting.' },
      ],
      id: [
        { q: 'Beban 100 kg (berat sekitar 980 N) dan kamu memilih 4×. Seberapa kuat kamu harus menarik, dan berapa panjang tali yang ditarik untuk mengangkat beban 1 m?', a: 'Sekitar 245 N, karena 980 N dibagi ke empat segmen tali. Tiap segmen harus memendek 1 m agar beban naik 1 m, jadi kamu menarik 4 m tali.' },
        { q: 'Pada 2× kamu menarik 2 m tali tetapi beban hanya naik 1 m. Ke mana satu meter sisanya?', a: 'Terbagi ke dua segmen yang menahan katrol. Kedua segmen harus memendek 1 m agar katrol bergerak naik 1 m, dan jumlahnya tepat 2 m yang kamu tarik. Tidak ada yang hilang; jaraknya dibagi, sama seperti gayanya.' },
        { q: 'Seorang teman berkata katrol 6× memberi energi enam kali lipat. Benarkah?', a: 'Tidak. Katrol itu memberi gaya seperenam tetapi butuh tali enam kali lebih panjang, sehingga gaya dikali jarak, yaitu usaha, tidak berubah. Angka W_in dan W_out tetap sama pada setiap pengaturan.' },
      ],
    },
  },
};
