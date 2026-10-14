// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Apply Henderson-Hasselbalch: pH = pKa + log([A⁻]/[HA]).',
      'See pH ≈ pKa when [A⁻] = [HA] (the half-equivalence point).',
      'Watch buffer capacity collapse outside the ratio range 0.1–10.',
    ],
    id: [
      'Menerapkan Henderson-Hasselbalch: pH = pKa + log([A⁻]/[HA]).',
      'Melihat pH ≈ pKa saat [A⁻] = [HA] (titik setengah-ekuivalen).',
      'Melihat kapasitas penyangga runtuh di luar rasio 0,1–10.',
    ],
  },
  tryThis: {
    en: [
      'Equal [HA] and [A⁻] — does pH equal pKa?',
      'Add 0.01 M strong base — how much does pH shift?',
      'Set ratio to 100:1 — is it still buffering?',
    ],
    id: [
      '[HA] = [A⁻] — apakah pH = pKa?',
      'Tambah 0,01 M basa kuat — seberapa besar pH bergeser?',
      'Atur rasio 100:1 — apakah masih bersifat penyangga?',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'Add a few drops of strong acid to pure water and the pH plunges by several units. Add the same drops to a buffer and the pH barely moves. A buffer is a solution containing a weak acid HA together with a good supply of its conjugate base A⁻ (for example acetic acid and acetate). The pair works as a sponge for H⁺ and OH⁻: added H⁺ is captured by A⁻ to make more HA, and added OH⁻ is neutralised by HA to make more A⁻ and water. The strong acid or base is converted into weak acid or weak base, which affects the pH far less.',
        'The pH of the mixture follows from the acid-dissociation equilibrium HA ⇌ H⁺ + A⁻ with constant Ka. Rearranging and taking logarithms gives the Henderson–Hasselbalch equation, pH = pKa + log([A⁻]/[HA]), where pKa = −log Ka. The equation says two things: the pKa sets the centre of the buffer, and the ratio of base to acid sets how far above or below that centre the pH sits. When the two concentrations are equal the logarithm is zero and pH = pKa; a ratio of 10:1 gives pH = pKa + 1 and 1:10 gives pKa − 1.',
        'The sliders feed this chemistry directly. [HA] and [A⁻] set the starting amounts, the pKa slider (or the acetate, phosphate and ammonia presets) moves the whole curve up or down, and the two "added" sliders do the stoichiometry: each mole of strong acid converts one mole of A⁻ into HA, and each mole of strong base does the reverse. The graph on the right plots pH against amount added, so you can see the flat buffer region around pKa and the steep walls where one component runs out. Doubling both concentrations keeps the pH the same but widens the flat region: that is buffer capacity.',
        'This is a deliberately simplified model. Rather than applying the Henderson–Hasselbalch equation blindly, the sim solves the full acid–base equilibrium (the Ka expression, the charge balance and the self-ionisation of water), so inside the buffer range it reproduces Henderson–Hasselbalch, and once the added strong acid or base exceeds the component it reacts with, the pH is set by the excess strong acid or base and runs smoothly down towards 0 or up towards 14, as in a real beaker. It still ignores the volume of the added solution (no dilution: all amounts are in mol per litre of the same solution), activity effects at high concentration, and the temperature dependence of pKa.',
      ],
      id: [
        'Teteskan sedikit asam kuat ke air murni, pH-nya anjlok beberapa satuan. Teteskan jumlah yang sama ke larutan penyangga, pH-nya hampir tidak bergeser. Larutan penyangga (bufer) mengandung asam lemah HA bersama persediaan basa konjugatnya A⁻ (misalnya asam asetat dan asetat). Pasangan ini bekerja seperti spons bagi H⁺ dan OH⁻: H⁺ yang ditambahkan ditangkap A⁻ menjadi HA, dan OH⁻ yang ditambahkan dinetralkan HA menjadi A⁻ dan air. Asam atau basa kuat diubah menjadi asam atau basa lemah, yang pengaruhnya terhadap pH jauh lebih kecil.',
        'pH campuran mengikuti kesetimbangan disosiasi asam HA ⇌ H⁺ + A⁻ dengan tetapan Ka. Setelah disusun ulang dan dilogaritmakan, diperoleh persamaan Henderson–Hasselbalch, pH = pKa + log([A⁻]/[HA]), dengan pKa = −log Ka. Persamaan ini menyatakan dua hal: pKa menentukan pusat penyangga, dan rasio basa terhadap asam menentukan seberapa jauh pH berada di atas atau di bawah pusat itu. Ketika kedua konsentrasi sama, logaritmanya nol dan pH = pKa; rasio 10:1 memberi pH = pKa + 1 dan 1:10 memberi pKa − 1.',
        'Slider-slider di simulasi langsung menggerakkan kimia ini. [HA] dan [A⁻] mengatur jumlah awal, slider pKa (atau tombol asetat, fosfat, dan amonia) menggeser seluruh kurva ke atas atau ke bawah, dan dua slider "added" melakukan stoikiometrinya: setiap mol asam kuat mengubah satu mol A⁻ menjadi HA, dan setiap mol basa kuat melakukan kebalikannya. Grafik di kanan memplot pH terhadap jumlah yang ditambahkan, sehingga kamu bisa melihat daerah datar penyangga di sekitar pKa dan dinding curam saat salah satu komponen habis. Menggandakan kedua konsentrasi tidak mengubah pH tetapi melebarkan daerah datar: itulah kapasitas penyangga.',
        'Ini model yang sengaja disederhanakan. Alih-alih menerapkan persamaan Henderson–Hasselbalch begitu saja, simulasi menyelesaikan kesetimbangan asam–basa secara lengkap (persamaan Ka, kesetimbangan muatan, dan swa-ionisasi air), sehingga di dalam rentang penyangga hasilnya sama dengan Henderson–Hasselbalch, dan begitu asam atau basa kuat yang ditambahkan melebihi komponen yang bereaksi dengannya, pH ditentukan oleh kelebihan asam atau basa kuat itu dan bergerak mulus turun menuju 0 atau naik menuju 14, seperti di gelas kimia sungguhan. Simulasi masih mengabaikan volume larutan yang ditambahkan (tanpa pengenceran: semua jumlah dalam mol per liter larutan yang sama), efek aktivitas pada konsentrasi tinggi, dan ketergantungan pKa pada suhu.',
      ],
    },
    figure: {
      caption: {
        en: 'pH of a 0.1 M / 0.1 M buffer as strong acid (left) or strong base (right) is added. The curve is flat near pKa, where the [A⁻]/[HA] ratio stays between 0.1 and 10, and climbs steeply once one component is almost used up; beyond that the excess strong acid or base sets the pH.',
        id: 'pH penyangga 0,1 M / 0,1 M saat asam kuat (kiri) atau basa kuat (kanan) ditambahkan. Kurva datar di dekat pKa, saat rasio [A⁻]/[HA] tetap di antara 0,1 dan 10, lalu menanjak curam begitu salah satu komponen hampir habis; setelah itu kelebihan asam atau basa kuat yang menentukan pH.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Buffer curve: pH against strong acid or base added', 'Kurva penyangga: pH terhadap asam atau basa kuat yang ditambahkan')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.m{fill:none;stroke:currentColor;stroke-width:1.2}.s{font-size:10px}</style>
  <rect x="40" y="87" width="280" height="56" fill="#10b981" opacity=".12"/>
  <line x1="40" y1="30" x2="40" y2="200" class="m"/>
  <line x1="40" y1="200" x2="320" y2="200" class="m"/>
  <line x1="180" y1="30" x2="180" y2="200" class="m" stroke-dasharray="3 3" opacity=".5"/>
  <line x1="40" y1="115" x2="320" y2="115" stroke="#10b981" stroke-width="1.4" stroke-dasharray="4 3"/>
  <line x1="36" y1="87" x2="44" y2="87" class="m"/>
  <line x1="36" y1="143" x2="44" y2="143" class="m"/>
  <text x="2" y="91" class="s">pKa+1</text>
  <text x="2" y="147" class="s">pKa−1</text>
  <text x="14" y="119" fill="#10b981" font-weight="700">pKa</text>
  <text x="26" y="24">pH</text>
  <polyline fill="none" stroke="#3b82f6" stroke-width="2.4" points="40.7,188.7 44.2,166.5 47.7,158.9 51.1,154.2 54.6,150.7 61.6,145.5 68.6,141.8 75.5,138.7 82.5,136.2 89.5,133.9 96.4,131.9 103.4,130.1 110.4,128.4 117.3,126.9 124.3,125.4 131.2,123.9 138.2,122.6 145.2,121.3 152.1,120 159.1,118.7 166.1,117.5 173,116.2 180,115 187,113.8 193.9,112.5 200.9,111.3 207.9,110 214.8,108.7 221.8,107.4 228.8,106.1 235.7,104.6 242.7,103.1 249.7,101.6 256.6,99.9 263.6,98.1 270.5,96.1 277.5,93.8 284.5,91.3 291.4,88.2 298.4,84.5 305.4,79.3 308.9,75.8 312.3,71.1 315.8,63.5 319.3,41.3"/>
  <circle cx="180" cy="115" r="5" fill="#ef4444"/>
  <text x="188" y="108" fill="#ef4444" class="s">[A⁻] = [HA]</text>
  <circle cx="306" cy="78" r="3.5" fill="#f59e0b"/>
  <text x="236" y="70" fill="#f59e0b" class="s">${L('ratio 10 : 1', 'rasio 10 : 1')}</text>
  <circle cx="54" cy="151" r="3.5" fill="#f59e0b"/>
  <text x="58" y="166" fill="#f59e0b" class="s">${L('ratio 1 : 10', 'rasio 1 : 10')}</text>
  <text x="188" y="138" fill="#10b981" class="s">${L('buffer region: pH within pKa ± 1', 'daerah penyangga: pH dalam pKa ± 1')}</text>
  <text x="44" y="214" class="s">← ${L('strong acid added', 'asam kuat ditambahkan')}</text>
  <text x="210" y="214" class="s">${L('strong base added', 'basa kuat ditambahkan')} →</text>
  <text x="150" y="232" class="s">${L('0 added', '0 ditambahkan')}</text>
  <text x="44" y="40" class="s">${L('steep: HA almost gone', 'curam: HA hampir habis')}</text>
  <text x="222" y="190" class="s">${L('steep: A⁻ almost gone', 'curam: A⁻ hampir habis')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'A buffer is a weak acid plus its conjugate base; together they soak up added H⁺ or OH⁻ by converting strong acid or base into weak acid or base.',
        'pH = pKa + log([A⁻]/[HA]): the pKa sets the centre and the base-to-acid ratio sets the offset.',
        'When [A⁻] = [HA] the pH equals the pKa, and this is where the buffer resists change best.',
        'A buffer works well only within about one pH unit of its pKa, where the ratio lies between 0.1 and 10.',
        'Buffer capacity grows with concentration: more HA and A⁻ can absorb more acid or base before the ratio runs away.',
      ],
      id: [
        'Penyangga adalah asam lemah plus basa konjugatnya; bersama-sama mereka menyerap H⁺ atau OH⁻ tambahan dengan mengubah asam atau basa kuat menjadi asam atau basa lemah.',
        'pH = pKa + log([A⁻]/[HA]): pKa menentukan pusat, dan rasio basa terhadap asam menentukan pergeserannya.',
        'Saat [A⁻] = [HA], pH sama dengan pKa, dan di sinilah penyangga paling kuat menahan perubahan.',
        'Penyangga bekerja baik hanya dalam sekitar satu satuan pH dari pKa-nya, saat rasionya berada di antara 0,1 dan 10.',
        'Kapasitas penyangga bertambah dengan konsentrasi: lebih banyak HA dan A⁻ dapat menyerap lebih banyak asam atau basa sebelum rasionya lepas kendali.',
      ],
    },
    vocabulary: {
      en: [
        ['Buffer', 'A solution of a weak acid and its conjugate base (or a weak base and its conjugate acid) that resists changes in pH.'],
        ['Conjugate base (A⁻)', 'What is left after a weak acid HA gives up its proton; it can take the proton back.'],
        ['Ka and pKa', 'Ka is the acid-dissociation constant; pKa = −log Ka. A smaller pKa means a stronger weak acid.'],
        ['Henderson–Hasselbalch equation', 'pH = pKa + log([A⁻]/[HA]); the rearranged equilibrium expression that predicts a buffer\'s pH.'],
        ['Buffer capacity', 'The amount of strong acid or base a buffer can absorb before its pH changes by one unit; larger for more concentrated buffers.'],
        ['Buffer range', 'The pH interval, roughly pKa ± 1, over which the buffer works effectively.'],
        ['Strong acid / strong base', 'An acid or base that dissociates completely in water (HCl, NaOH), so every mole added reacts fully with the buffer.'],
      ],
      id: [
        ['Penyangga (bufer)', 'Larutan asam lemah dan basa konjugatnya (atau basa lemah dan asam konjugatnya) yang menahan perubahan pH.'],
        ['Basa konjugat (A⁻)', 'Sisa asam lemah HA setelah melepaskan protonnya; dapat mengambil kembali proton itu.'],
        ['Ka dan pKa', 'Ka adalah tetapan disosiasi asam; pKa = −log Ka. pKa yang lebih kecil berarti asam lemah yang lebih kuat.'],
        ['Persamaan Henderson–Hasselbalch', 'pH = pKa + log([A⁻]/[HA]); bentuk susun-ulang persamaan kesetimbangan yang memprediksi pH penyangga.'],
        ['Kapasitas penyangga', 'Jumlah asam atau basa kuat yang dapat diserap penyangga sebelum pH-nya berubah satu satuan; lebih besar untuk penyangga yang lebih pekat.'],
        ['Rentang penyangga', 'Selang pH, kira-kira pKa ± 1, tempat penyangga bekerja efektif.'],
        ['Asam kuat / basa kuat', 'Asam atau basa yang terdisosiasi sempurna dalam air (HCl, NaOH), sehingga setiap mol yang ditambahkan bereaksi penuh dengan penyangga.'],
      ],
    },
    misconceptions: {
      en: [
        ['A buffer keeps the pH exactly constant.', 'It only slows the change. Every addition of acid or base shifts the ratio and therefore the pH a little; the buffer fails altogether once one component is used up.'],
        ['A buffer always has pH 7.', 'A buffer\'s pH is close to the pKa of its acid. An acetate buffer sits near 4.75 and an ammonia buffer near 9.25; only pairs with pKa near 7, such as phosphate, buffer at neutral pH.'],
        ['Mixing a strong acid with a strong base makes a buffer.', 'It makes a salt and water with no weak acid–base pair left, so there is nothing to absorb further additions. A buffer needs a weak acid and its conjugate base.'],
        ['Diluting a buffer changes its pH a lot.', 'Dilution changes [HA] and [A⁻] by the same factor, so their ratio and the pH stay almost the same. What dilution does reduce is the buffer capacity.'],
      ],
      id: [
        ['Penyangga menjaga pH benar-benar tetap.', 'Penyangga hanya memperlambat perubahan. Setiap penambahan asam atau basa menggeser rasio dan karena itu pH sedikit; penyangga gagal sama sekali begitu salah satu komponennya habis.'],
        ['Penyangga selalu berpH 7.', 'pH penyangga dekat dengan pKa asamnya. Penyangga asetat berada di sekitar 4,75 dan penyangga amonia di sekitar 9,25; hanya pasangan dengan pKa dekat 7, seperti fosfat, yang menyangga pada pH netral.'],
        ['Mencampur asam kuat dengan basa kuat menghasilkan penyangga.', 'Yang terbentuk adalah garam dan air tanpa pasangan asam–basa lemah yang tersisa, jadi tidak ada yang menyerap penambahan berikutnya. Penyangga membutuhkan asam lemah dan basa konjugatnya.'],
        ['Mengencerkan penyangga mengubah pH-nya secara besar.', 'Pengenceran mengubah [HA] dan [A⁻] dengan faktor yang sama, sehingga rasio dan pH-nya hampir tidak berubah. Yang berkurang karena pengenceran adalah kapasitas penyangganya.'],
      ],
    },
    realWorld: {
      en: [
        'Blood is held at pH 7.35–7.45 mainly by the carbonic acid–bicarbonate buffer (H₂CO₃ / HCO₃⁻); breathing faster or slower adjusts the CO₂ side of the pair within minutes.',
        'Phosphate buffer (pKa 7.21) is the standard medium for biology labs because it keeps enzymes and cells near physiological pH.',
        'Aspirin and many other medicines are sold as "buffered" tablets so they dissolve without a sharp pH drop in the stomach lining.',
        'Lakes on limestone bedrock resist acid rain because dissolved bicarbonate buffers them; lakes on granite have little buffer and acidify quickly.',
      ],
      id: [
        'Darah dijaga pada pH 7,35–7,45 terutama oleh penyangga asam karbonat–bikarbonat (H₂CO₃ / HCO₃⁻); bernapas lebih cepat atau lebih lambat menyetel sisi CO₂ pasangan ini dalam hitungan menit.',
        'Penyangga fosfat (pKa 7,21) adalah medium standar di laboratorium biologi karena menjaga enzim dan sel di dekat pH fisiologis.',
        'Aspirin dan banyak obat lain dijual sebagai tablet "buffered" agar larut tanpa penurunan pH yang tajam di dinding lambung.',
        'Danau di atas batuan kapur tahan terhadap hujan asam karena bikarbonat terlarut menyangganya; danau di atas granit hampir tidak punya penyangga dan cepat mengasam.',
      ],
    },
    questions: {
      en: [
        { q: 'An acetate buffer (pKa 4.75) contains 0.10 M acetic acid and 0.10 M acetate. What is its pH, and what does it become after 0.05 M strong base is added?', a: 'Initially the ratio is 1, so pH = pKa = 4.75. The base converts 0.05 M HA into A⁻, giving [A⁻] = 0.15 and [HA] = 0.05, a ratio of 3. pH = 4.75 + log 3 = 4.75 + 0.48 = 5.23. A shift of about 0.5 for a large addition.' },
        { q: 'You need a buffer at pH 7.0. Which of the three presets (acetate 4.75, phosphate 7.21, ammonia 9.25) should you choose, and roughly what ratio of base to acid do you need?', a: 'Phosphate, because its pKa is within one unit of the target. From 7.0 = 7.21 + log(ratio), log(ratio) = −0.21, so the ratio is about 0.6: a little more acid than base.' },
        { q: 'Two buffers have the same pKa and the same 1:1 ratio, but one is 0.1 M and the other 1.0 M in each component. Which has the higher pH, and which resists added acid better?', a: 'They have the same pH, because the ratio is the same. The 1.0 M buffer resists better: adding 0.05 M acid changes its ratio from 1 to 0.95/1.05 (pH drops by about 0.04) but changes the 0.1 M buffer\'s ratio to 0.05/0.15 (pH drops by about 0.48).' },
      ],
      id: [
        { q: 'Penyangga asetat (pKa 4,75) berisi asam asetat 0,10 M dan asetat 0,10 M. Berapa pH-nya, dan menjadi berapa setelah ditambahkan basa kuat 0,05 M?', a: 'Awalnya rasionya 1, jadi pH = pKa = 4,75. Basa mengubah 0,05 M HA menjadi A⁻, sehingga [A⁻] = 0,15 dan [HA] = 0,05, rasio 3. pH = 4,75 + log 3 = 4,75 + 0,48 = 5,23. Pergeseran hanya sekitar 0,5 untuk penambahan yang cukup besar.' },
        { q: 'Kamu memerlukan penyangga pada pH 7,0. Dari tiga preset (asetat 4,75; fosfat 7,21; amonia 9,25), mana yang harus dipilih, dan kira-kira berapa rasio basa terhadap asam yang diperlukan?', a: 'Fosfat, karena pKa-nya berada dalam satu satuan dari pH target. Dari 7,0 = 7,21 + log(rasio), log(rasio) = −0,21, sehingga rasionya sekitar 0,6: asam sedikit lebih banyak daripada basa.' },
        { q: 'Dua penyangga mempunyai pKa yang sama dan rasio 1:1 yang sama, tetapi yang satu 0,1 M dan yang lain 1,0 M untuk tiap komponen. Mana yang pH-nya lebih tinggi, dan mana yang lebih tahan terhadap asam tambahan?', a: 'pH keduanya sama, karena rasionya sama. Penyangga 1,0 M lebih tahan: penambahan asam 0,05 M mengubah rasionya dari 1 menjadi 0,95/1,05 (pH turun sekitar 0,04), tetapi mengubah rasio penyangga 0,1 M menjadi 0,05/0,15 (pH turun sekitar 0,48).' },
      ],
    },
  },
};
