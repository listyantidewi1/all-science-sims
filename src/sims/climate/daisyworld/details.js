// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'See emergent self-regulation: the daisies\' selfish growth produces a regulated planet.',
      'Watch albedo dynamically respond to temperature.',
      'Note the collapse: when luminosity exceeds a threshold, no biological feedback can save the planet.',
    ],
    id: [
      'Melihat regulasi-diri yang muncul: pertumbuhan egoistik bunga aster menghasilkan planet teregulasi.',
      'Mengamati albedo merespons suhu secara dinamis.',
      'Memperhatikan kolaps: bila luminositas melewati ambang, tidak ada umpan balik biologis yang bisa menyelamatkan planet.',
    ],
  },
  tryThis: {
    en: [
      'Slowly raise solar luminosity — temperature stays nearly flat over a wide band.',
      'Outside the daisies\' tolerance — no homeostasis, T tracks luminosity.',
      'Run with only one daisy species — regulation works only on one side of the temperature window.',
    ],
    id: [
      'Naikkan luminositas perlahan — suhu hampir datar di rentang lebar.',
      'Di luar toleransi bunga aster — tidak ada homeostasis, T mengikuti luminositas.',
      'Jalankan dengan satu spesies — regulasi hanya bekerja di satu sisi jendela suhu.',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'Daisyworld is a thought experiment published by Andrew Watson and James Lovelock in 1983 to show how life could regulate a planet\'s climate without any plan or purpose. The planet has no oceans or atmosphere, only bare ground and two kinds of daisy: white daisies with a high albedo of 0.75, which reflect most sunlight, and black daisies with a low albedo of 0.25, which absorb it. Bare ground sits in between at 0.5. Both species grow best at 22.5 °C, grow more slowly as the temperature moves away from that optimum, and cannot grow at all below 5 °C or above 40 °C. Each year a fixed fraction, 0.3, of the daisies die.',
        'The planet\'s temperature comes from an energy balance. Sunlight arriving at L × 917 W/m² is partly reflected, according to the planet\'s average albedo A, and the rest is absorbed and re-radiated as heat following the Stefan-Boltzmann law: σ T⁴ = L × 917 × (1 − A). A dark patch is a little warmer than the planetary average and a white patch a little cooler, and the growth of each species depends on its own local temperature. That small difference is the engine of the whole model: whichever colour of daisy is closer to its ideal temperature spreads faster, and as it spreads it changes the planet\'s albedo, which changes the temperature for everyone.',
        'The result is a negative feedback loop. If the Sun brightens, the planet warms, white daisies gain an edge over black ones, the average albedo rises, more sunlight is reflected and the warming is largely cancelled. If the Sun dims, black daisies win, albedo falls and the planet absorbs more. Over a wide range of luminosity the temperature stays close to the daisies\' comfort zone even though the bare-planet temperature, shown as the dashed line, climbs steadily. Beyond a critical brightness even an all-white planet is too hot, the daisies die, albedo snaps back to 0.5 and the temperature jumps to the bare value. Dimming the Sun again does not immediately bring them back, because seeds need a temperature already inside the growth window: the system shows hysteresis.',
        'The simulation integrates these equations step by step and plots temperature against luminosity as a trace. The luminosity slider sets L between 0.6 and 1.6 times today\'s value, and auto-sweep moves it slowly back and forth so you can watch the regulation band and the collapse. Disabling one species shows that each colour regulates on only one side of the window: black daisies alone can warm a cold planet but cannot cool a hot one. The model is a parable, not a climate model: it has no greenhouse gases, no seasons, no geography and no evolution, and the daisies are not trying to help the planet. Regulation emerges simply because each species grows where conditions suit it.',
      ],
      id: [
        'Daisyworld adalah eksperimen pikiran yang diterbitkan Andrew Watson dan James Lovelock pada 1983 untuk menunjukkan bagaimana kehidupan bisa mengatur iklim sebuah planet tanpa rencana atau tujuan apa pun. Planet ini tidak punya lautan atau atmosfer, hanya tanah kosong dan dua jenis bunga aster: aster putih dengan albedo tinggi 0,75, yang memantulkan sebagian besar sinar matahari, dan aster hitam dengan albedo rendah 0,25, yang menyerapnya. Tanah kosong berada di tengah dengan albedo 0,5. Kedua spesies tumbuh paling baik pada 22,5 °C, tumbuh lebih lambat saat suhu menjauh dari nilai optimum itu, dan sama sekali tidak bisa tumbuh di bawah 5 °C atau di atas 40 °C. Setiap tahun sebagian tetap, yaitu 0,3, dari bunga aster mati.',
        'Suhu planet berasal dari keseimbangan energi. Sinar matahari yang tiba sebesar L × 917 W/m² sebagian dipantulkan, sesuai albedo rata-rata planet A, dan sisanya diserap lalu dipancarkan kembali sebagai panas mengikuti hukum Stefan-Boltzmann: σ T⁴ = L × 917 × (1 − A). Petak gelap sedikit lebih hangat daripada rata-rata planet dan petak putih sedikit lebih dingin, dan pertumbuhan tiap spesies bergantung pada suhu lokalnya sendiri. Perbedaan kecil itulah mesin seluruh model: warna aster yang lebih dekat ke suhu idealnya menyebar lebih cepat, dan saat menyebar ia mengubah albedo planet, yang mengubah suhu bagi semua.',
        'Hasilnya adalah lingkar umpan balik negatif. Jika Matahari menjadi lebih terang, planet menghangat, aster putih lebih unggul daripada yang hitam, albedo rata-rata naik, lebih banyak sinar dipantulkan, dan pemanasan itu sebagian besar dibatalkan. Jika Matahari meredup, aster hitam menang, albedo turun, dan planet menyerap lebih banyak. Dalam rentang luminositas yang lebar, suhu tetap dekat dengan zona nyaman aster meskipun suhu planet kosong, yang ditampilkan sebagai garis putus-putus, terus naik. Melewati kecerahan kritis tertentu, planet yang serba putih pun terlalu panas, aster mati, albedo kembali ke 0,5, dan suhu melompat ke nilai planet kosong. Meredupkan Matahari lagi tidak serta-merta mengembalikan mereka, karena benih membutuhkan suhu yang sudah berada di dalam jendela pertumbuhan: sistem ini menunjukkan histeresis.',
        'Simulasi mengintegrasikan persamaan ini langkah demi langkah dan menggambar suhu terhadap luminositas sebagai jejak. Slider luminositas mengatur L antara 0,6 dan 1,6 kali nilai sekarang, dan sapuan otomatis menggerakkannya pelan bolak-balik agar kamu bisa mengamati pita regulasi dan keruntuhannya. Menonaktifkan satu spesies menunjukkan bahwa tiap warna hanya mengatur di satu sisi jendela: aster hitam saja bisa menghangatkan planet dingin tetapi tidak bisa mendinginkan planet panas. Model ini perumpamaan, bukan model iklim: tidak ada gas rumah kaca, musim, geografi, maupun evolusi, dan bunga aster tidak berusaha menolong planetnya. Regulasi muncul semata-mata karena tiap spesies tumbuh di tempat yang kondisinya cocok.',
      ],
    },
    figure: {
      caption: {
        en: 'The Daisyworld feedback loop for a brightening Sun. Warming favours white daisies, which raise the albedo and reflect more sunlight, which cools the planet and opposes the original change. A dimming Sun runs the loop the other way through black daisies. Inset: the growth-rate curve, zero outside 5 to 40 °C with a peak at 22.5 °C.',
        id: 'Lingkar umpan balik Daisyworld untuk Matahari yang menerang. Pemanasan menguntungkan aster putih, yang menaikkan albedo dan memantulkan lebih banyak sinar, sehingga planet mendingin dan perubahan awal dilawan. Matahari yang meredup menjalankan lingkar ke arah sebaliknya lewat aster hitam. Sisipan: kurva laju tumbuh, nol di luar 5 sampai 40 °C dengan puncak pada 22,5 °C.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Negative feedback loop between temperature, daisy colour and albedo', 'Lingkar umpan balik negatif antara suhu, warna aster, dan albedo')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.b{fill:none;stroke:currentColor;stroke-width:1.2;rx:6}.a{stroke:currentColor;stroke-width:1.6;fill:none}.k{font-size:10px}</style>
  <defs><marker id="ar" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="context-stroke"/></marker></defs>
  <rect x="120" y="10" width="140" height="24" class="b" stroke="#ef4444"/>
  <text x="130" y="27" fill="#ef4444">${L('Sun brightens (L rises)', 'Matahari menerang (L naik)')}</text>
  <line x1="190" y1="34" x2="262" y2="62" class="a" marker-end="url(#ar)"/>
  <rect x="240" y="62" width="110" height="24" class="b" stroke="#f59e0b"/>
  <text x="252" y="79" fill="#f59e0b">${L('planet warms', 'planet menghangat')}</text>
  <line x1="294" y1="86" x2="286" y2="116" class="a" marker-end="url(#ar)"/>
  <rect x="200" y="118" width="150" height="24" class="b"/>
  <text x="208" y="135">${L('white daisies out-grow black', 'aster putih mengalahkan hitam')}</text>
  <line x1="250" y1="142" x2="236" y2="172" class="a" marker-end="url(#ar)"/>
  <rect x="130" y="174" width="200" height="24" class="b" stroke="#10b981"/>
  <text x="138" y="191" fill="#10b981">${L('albedo rises: more light reflected', 'albedo naik: lebih banyak cahaya dipantulkan')}</text>
  <line x1="130" y1="178" x2="82" y2="126" class="a" marker-end="url(#ar)"/>
  <rect x="10" y="100" width="130" height="24" class="b" stroke="#3b82f6"/>
  <text x="18" y="117" fill="#3b82f6">${L('planet cools', 'planet mendingin')}</text>
  <line x1="140" y1="104" x2="238" y2="78" class="a" stroke-dasharray="5 3" marker-end="url(#ar)"/>
  <text x="14" y="56" class="k" font-weight="bold">${L('negative feedback:', 'umpan balik negatif:')}</text>
  <text x="14" y="70" class="k">${L('the response opposes the change', 'respons melawan perubahan')}</text>
  <text x="14" y="168" class="k" font-weight="bold">${L('daisy growth rate', 'laju tumbuh aster')}</text>
  <line x1="14" y1="228" x2="104" y2="228" stroke="currentColor" stroke-width="1"/>
  <path d="M20 228 Q 57 132 94 228" fill="none" stroke="#10b981" stroke-width="2"/>
  <line x1="57" y1="180" x2="57" y2="228" stroke="currentColor" stroke-width="1" opacity=".4" stroke-dasharray="3 3"/>
  <text x="16" y="238" class="k">5</text>
  <text x="46" y="238" class="k">22,5</text>
  <text x="84" y="238" class="k">40 °C</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Planetary temperature follows the energy balance σ T⁴ = L × 917 × (1 − A), so a higher albedo A means a cooler planet.',
        'Each daisy colour grows fastest where its own local temperature is near 22.5 °C, and dark patches run warmer than light ones.',
        'Warming favours white daisies and raises albedo; cooling favours black daisies and lowers it: a negative feedback that holds temperature nearly flat.',
        'Regulation has limits: outside roughly 5 to 40 °C nothing grows, and once the daisies die the planet jumps to its bare temperature.',
        'The daisies are not cooperating or planning; the regulation emerges from each species simply growing where conditions suit it.',
      ],
      id: [
        'Suhu planet mengikuti keseimbangan energi σ T⁴ = L × 917 × (1 − A), sehingga albedo A yang lebih tinggi berarti planet lebih dingin.',
        'Tiap warna aster tumbuh paling cepat ketika suhu lokalnya sendiri dekat 22,5 °C, dan petak gelap lebih hangat daripada petak terang.',
        'Pemanasan menguntungkan aster putih dan menaikkan albedo; pendinginan menguntungkan aster hitam dan menurunkannya: umpan balik negatif yang menjaga suhu hampir datar.',
        'Regulasi punya batas: di luar kira-kira 5 sampai 40 °C tidak ada yang tumbuh, dan begitu aster mati planet melompat ke suhu kosongnya.',
        'Bunga aster tidak bekerja sama atau berencana; regulasi muncul karena tiap spesies hanya tumbuh di tempat yang kondisinya cocok.',
      ],
    },
    vocabulary: {
      en: [
        ['Albedo', 'The fraction of incoming sunlight a surface reflects: 0.75 for white daisies, 0.25 for black ones, 0.5 for bare ground.'],
        ['Luminosity (L)', 'The Sun\'s brightness as a multiple of today\'s value; the sim sweeps it from 0.6 to 1.6.'],
        ['Stefan-Boltzmann law', 'A body radiates heat in proportion to the fourth power of its temperature: power per area = σ T⁴.'],
        ['Negative feedback', 'A loop in which the system\'s response opposes the original change, stabilizing it.'],
        ['Homeostasis', 'The holding of a variable, here planetary temperature, close to a set value despite outside pressure.'],
        ['Growth rate β(T)', 'The fraction of free ground a daisy species colonizes per unit time; a parabola peaking at 22.5 °C and zero outside 5 to 40 °C.'],
        ['Hysteresis', 'When the state of a system depends on its history: sweeping L up and then down does not retrace the same curve.'],
        ['Gaia hypothesis', 'Lovelock\'s idea that life and its environment form a self-regulating system; Daisyworld was built to show this is possible without purpose.'],
      ],
      id: [
        ['Albedo', 'Fraksi sinar matahari datang yang dipantulkan permukaan: 0,75 untuk aster putih, 0,25 untuk aster hitam, 0,5 untuk tanah kosong.'],
        ['Luminositas (L)', 'Kecerahan Matahari sebagai kelipatan nilai sekarang; sim menyapunya dari 0,6 sampai 1,6.'],
        ['Hukum Stefan-Boltzmann', 'Sebuah benda memancarkan panas sebanding dengan pangkat empat suhunya: daya per luas = σ T⁴.'],
        ['Umpan balik negatif', 'Lingkar di mana respons sistem melawan perubahan awal, sehingga menstabilkannya.'],
        ['Homeostasis', 'Terjaganya suatu variabel, di sini suhu planet, dekat nilai tertentu meskipun ada tekanan dari luar.'],
        ['Laju tumbuh β(T)', 'Fraksi tanah kosong yang dikolonisasi satu spesies aster per satuan waktu; parabola berpuncak pada 22,5 °C dan nol di luar 5 sampai 40 °C.'],
        ['Histeresis', 'Ketika keadaan sistem bergantung pada riwayatnya: menyapu L naik lalu turun tidak menelusuri kurva yang sama.'],
        ['Hipotesis Gaia', 'Gagasan Lovelock bahwa kehidupan dan lingkungannya membentuk sistem yang mengatur diri; Daisyworld dibuat untuk menunjukkan bahwa ini mungkin tanpa tujuan.'],
      ],
    },
    misconceptions: {
      en: [
        ['The daisies regulate the climate because it is good for them as a group.', 'No daisy "knows" anything. Each species just grows faster where its local temperature is near 22.5 °C. The regulation is a side effect of ordinary competition, which is the whole point of the parable.'],
        ['Black daisies warm the planet, so they are harmful.', 'When the Sun is dim, black daisies are what keep the planet warm enough for anything to grow. Each colour is useful on one side of the temperature window.'],
        ['Negative feedback means something bad is happening.', 'In systems science "negative" means the response opposes the change, which is stabilizing. Positive feedback, which amplifies change, is the destabilizing kind.'],
        ['Daisyworld proves that Earth\'s biosphere will always keep the climate comfortable.', 'It shows that regulation by life is possible, not guaranteed. The model also shows regulation failing abruptly once the forcing is too strong, and Earth\'s real climate involves many feedbacks, some of them amplifying.'],
      ],
      id: [
        ['Bunga aster mengatur iklim karena itu baik bagi mereka sebagai kelompok.', 'Tidak ada aster yang "tahu" apa pun. Tiap spesies hanya tumbuh lebih cepat ketika suhu lokalnya dekat 22,5 °C. Regulasi adalah efek samping dari persaingan biasa, dan itulah inti perumpamaannya.'],
        ['Aster hitam memanaskan planet, jadi mereka merugikan.', 'Saat Matahari redup, aster hitamlah yang menjaga planet cukup hangat agar sesuatu bisa tumbuh. Tiap warna berguna di satu sisi jendela suhu.'],
        ['Umpan balik negatif berarti sesuatu yang buruk sedang terjadi.', 'Dalam ilmu sistem, "negatif" berarti respons melawan perubahan, dan itu menstabilkan. Umpan balik positif, yang memperkuat perubahan, justru yang mendestabilkan.'],
        ['Daisyworld membuktikan bahwa biosfer Bumi akan selalu menjaga iklim tetap nyaman.', 'Model ini menunjukkan regulasi oleh kehidupan itu mungkin, bukan terjamin. Model juga menunjukkan regulasi gagal mendadak begitu dorongannya terlalu kuat, dan iklim Bumi yang sesungguhnya melibatkan banyak umpan balik, beberapa di antaranya memperkuat.'],
      ],
    },
    realWorld: {
      en: [
        'Snow and sea ice give Earth a real albedo feedback, but in the amplifying direction: warming melts ice, exposing dark ocean that absorbs more sunlight and warms further.',
        'Plankton-rich ocean water, forests and deserts all have different albedos, so living things really do change how much sunlight Earth absorbs.',
        'A thermostat is an engineered negative feedback: when the room overshoots the set temperature, the heater turns off, just as white daisies "turn off" some of the absorbed sunlight.',
        'The Sun has brightened by roughly 30% over Earth\'s history, yet liquid water has persisted for billions of years; Daisyworld was proposed as one way such long-term stability could arise.',
      ],
      id: [
        'Salju dan es laut memberi Bumi umpan balik albedo yang nyata, tetapi ke arah memperkuat: pemanasan melelehkan es, memaparkan laut gelap yang menyerap lebih banyak sinar dan makin memanas.',
        'Air laut kaya plankton, hutan, dan gurun semuanya punya albedo berbeda, jadi makhluk hidup memang mengubah seberapa banyak sinar matahari yang diserap Bumi.',
        'Termostat adalah umpan balik negatif buatan: saat ruangan melewati suhu yang ditetapkan, pemanas mati, sama seperti aster putih "mematikan" sebagian sinar yang diserap.',
        'Matahari telah menerang kira-kira 30% sepanjang sejarah Bumi, namun air cair bertahan selama miliaran tahun; Daisyworld diajukan sebagai salah satu cara kestabilan jangka panjang semacam itu bisa muncul.',
      ],
    },
    questions: {
      en: [
        { q: 'With L = 1 and no daisies, the planet\'s albedo is 0.5. Use σ T⁴ = L × 917 × (1 − A) with σ = 5.67 × 10⁻⁸ to find the bare-planet temperature.', a: 'T⁴ = 917 × 0.5 / 5.67 × 10⁻⁸ ≈ 8.09 × 10⁹, so T ≈ 300 K, about 27 °C. That is the dashed bare-planet line at L = 1; with both daisies present the sim settles a few degrees away from it, closer to 22.5 °C.' },
        { q: 'You disable white daisies and slowly raise L. Why does the planet\'s temperature now climb with the bare-planet line once it passes the comfortable zone?', a: 'Black daisies can only lower albedo, which warms the planet. That helps when the Sun is dim, but when it is bright there is no species that can raise albedo and cool things down. With nothing to oppose the warming, the black daisies die off and T follows the bare-planet curve.' },
        { q: 'After the collapse at high L, you sweep L back down to a value where daisies used to thrive, but the planet stays bare for a while. Explain this hysteresis.', a: 'Daisies can only grow when their local temperature is between 5 and 40 °C. Once the planet is bare its albedo is 0.5 and its temperature is the bare value, which at high L is above 40 °C. L must fall far enough for the bare temperature itself to re-enter the window before the surviving seeds can spread and restart the regulation, so the way down does not retrace the way up.' },
      ],
      id: [
        { q: 'Dengan L = 1 dan tanpa aster, albedo planet adalah 0,5. Gunakan σ T⁴ = L × 917 × (1 − A) dengan σ = 5,67 × 10⁻⁸ untuk mencari suhu planet kosong.', a: 'T⁴ = 917 × 0,5 / 5,67 × 10⁻⁸ ≈ 8,09 × 10⁹, sehingga T ≈ 300 K, sekitar 27 °C. Itulah garis putus-putus planet kosong pada L = 1; dengan kedua aster hadir, sim menetap beberapa derajat darinya, lebih dekat ke 22,5 °C.' },
        { q: 'Kamu menonaktifkan aster putih dan menaikkan L perlahan. Mengapa suhu planet kini naik mengikuti garis planet kosong begitu melewati zona nyaman?', a: 'Aster hitam hanya bisa menurunkan albedo, yang menghangatkan planet. Itu membantu saat Matahari redup, tetapi saat Matahari terang tidak ada spesies yang bisa menaikkan albedo dan mendinginkan. Tanpa ada yang melawan pemanasan, aster hitam mati dan T mengikuti kurva planet kosong.' },
        { q: 'Setelah keruntuhan pada L tinggi, kamu menurunkan L kembali ke nilai yang dulu membuat aster subur, tetapi planet tetap kosong untuk sementara. Jelaskan histeresis ini.', a: 'Aster hanya bisa tumbuh ketika suhu lokalnya antara 5 dan 40 °C. Begitu planet kosong, albedonya 0,5 dan suhunya adalah nilai planet kosong, yang pada L tinggi berada di atas 40 °C. L harus turun cukup jauh sampai suhu planet kosong itu sendiri kembali masuk jendela sebelum benih yang tersisa bisa menyebar dan memulai regulasi lagi, sehingga jalur turun tidak menelusuri jalur naik.' },
      ],
    },
  },
};
