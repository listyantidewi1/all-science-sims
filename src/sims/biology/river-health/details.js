// Long-form text for the sim page aside, kept out of manifest.js.
export default {
  objectives: {
    en: [
      'Describe how sewage, fertiliser runoff and factory waste each change dissolved oxygen, algae and fish along a river.',
      'Explain the oxygen sag: why oxygen is lowest some distance downstream of a sewage outlet, and how the river recovers.',
      'Use indicator insects (bioindicators) to judge water quality at a sampling station, and evaluate how much a treatment plant helps.',
    ],
    id: [
      'Menjelaskan bagaimana limbah rumah tangga, pupuk yang terbawa aliran, dan limbah pabrik masing-masing mengubah oksigen terlarut, alga, dan ikan di sepanjang sungai.',
      'Menjelaskan lengkung oksigen: mengapa oksigen paling rendah beberapa kilometer di hilir saluran limbah, dan bagaimana sungai pulih.',
      'Menggunakan serangga indikator (bioindikator) untuk menilai mutu air di sebuah stasiun pengambilan sampel, dan mengevaluasi seberapa besar instalasi pengolahan limbah membantu.',
    ],
  },
  tryThis: {
    en: [
      'Set only sewage to 100%. Find the point where dissolved oxygen is lowest. Is it at the village, or further downstream? Record DO and the fish count.',
      'Reset, then set only fertiliser to 100%. Where does the algae curve rise? Does oxygen fall right away or later?',
      'Set only factory waste to 100%. Oxygen stays high, yet the fish vanish. What killed them?',
      'Put every slider at 100%, then switch on the treatment plant. Which problem does it fix and which one remains?',
    ],
    id: [
      'Atur hanya limbah rumah tangga ke 100%. Temukan titik dengan oksigen terlarut terendah. Apakah di desa, atau lebih jauh di hilir? Catat DO dan jumlah ikan.',
      'Atur ulang, lalu atur hanya pupuk ke 100%. Di mana kurva alga naik? Apakah oksigen langsung turun atau belakangan?',
      'Atur hanya limbah pabrik ke 100%. Oksigen tetap tinggi, tetapi ikan menghilang. Apa yang membunuhnya?',
      'Letakkan semua slider di 100%, lalu nyalakan instalasi pengolahan limbah. Masalah mana yang teratasi dan mana yang tetap ada?',
    ],
  },

  learn: {
    background: {
      en: [
        'Fish, insect larvae and most other river animals breathe oxygen that is dissolved in the water. Clean, flowing water holds about 8 to 9 milligrams of oxygen per litre (mg/L) at tropical temperatures. Most fish are comfortable above 5 mg/L, struggle below 3 mg/L and die near 0. The river in this sim is 10 km long and flows from left to right past a village, a farm and a factory, and the chart underneath shows how oxygen, algae and fish change with distance.',
        'Untreated sewage is organic matter: food scraps, human waste, soap. Bacteria feed on it and use up oxygen as they do, so oxygen falls downstream of the outlet. The fall is not instant: the bacteria take time (and so distance, since the water is moving) to consume the waste, while the flowing surface keeps taking in oxygen from the air. The result is the oxygen sag: a dip that is deepest a few kilometres downstream and then slowly recovers. In the sim, 100% sewage drops oxygen from 8.5 mg/L to nearly zero around 5 to 6 km, and the river has only climbed back to about 2 mg/L by the end.',
        'Fertiliser washed off farmland is different. Nitrate and phosphate are not food for bacteria but for algae. Algae multiply into a green bloom; when they die, bacteria decompose them and oxygen falls, often far downstream of the farm. This chain of events is called eutrophication. Factory waste in the sim is modelled as a toxin: it does not use oxygen at all, so the oxygen curve stays high, yet fish and sensitive insects disappear. A single measurement of oxygen would miss this, which is why scientists also look at the animals living in the river.',
        'Indicator insects give a quick verdict. Stonefly and mayfly nymphs need clean, oxygen-rich water. Freshwater shrimp and caddisfly larvae tolerate mild pollution. Bloodworms (midge larvae with red haemoglobin) thrive where oxygen is low, and sludge worms survive almost anywhere. The treatment plant removes about 90% of the organic waste and toxins before they reach the river, but it cannot stop fertiliser running off the fields: that needs changes on the farm itself.',
      ],
      id: [
        'Ikan, larva serangga, dan sebagian besar hewan sungai lainnya bernapas dengan oksigen yang terlarut dalam air. Air bersih yang mengalir mengandung sekitar 8 sampai 9 miligram oksigen per liter (mg/L) pada suhu tropis. Sebagian besar ikan nyaman di atas 5 mg/L, kesulitan di bawah 3 mg/L, dan mati di dekat 0. Sungai dalam simulasi ini panjangnya 10 km dan mengalir dari kiri ke kanan melewati desa, sawah, dan pabrik, dan grafik di bawahnya menunjukkan perubahan oksigen, alga, dan ikan terhadap jarak.',
        'Limbah rumah tangga yang tidak diolah adalah bahan organik: sisa makanan, kotoran manusia, sabun. Bakteri memakannya dan menghabiskan oksigen saat melakukannya, sehingga oksigen turun di hilir saluran pembuangan. Penurunannya tidak seketika: bakteri butuh waktu (dan karena itu jarak, sebab airnya bergerak) untuk menguraikan limbah, sementara permukaan air yang mengalir terus menyerap oksigen dari udara. Hasilnya adalah lengkung oksigen: cekungan yang paling dalam beberapa kilometer di hilir lalu pulih perlahan. Dalam simulasi, limbah 100% menurunkan oksigen dari 8,5 mg/L ke hampir nol di sekitar 5 sampai 6 km, dan sungai baru kembali ke sekitar 2 mg/L di ujungnya.',
        'Pupuk yang tersapu dari lahan pertanian berbeda. Nitrat dan fosfat bukan makanan bakteri melainkan makanan alga. Alga berlipat ganda menjadi ledakan hijau; ketika mati, bakteri menguraikannya dan oksigen turun, sering kali jauh di hilir sawah. Rangkaian peristiwa ini disebut eutrofikasi. Limbah pabrik dalam simulasi dimodelkan sebagai racun: ia tidak memakai oksigen sama sekali, sehingga kurva oksigen tetap tinggi, namun ikan dan serangga peka menghilang. Satu kali pengukuran oksigen saja akan melewatkan ini, itulah sebabnya ilmuwan juga mengamati hewan yang hidup di sungai.',
        'Serangga indikator memberi penilaian cepat. Nimfa lalat batu dan lalat capung membutuhkan air bersih kaya oksigen. Udang air tawar dan larva ulat air tahan pencemaran ringan. Cacing darah (larva nyamuk-nyamukan dengan hemoglobin merah) subur di tempat beroksigen rendah, dan cacing lumpur bertahan hampir di mana saja. Instalasi pengolahan limbah menyingkirkan sekitar 90% limbah organik dan racun sebelum mencapai sungai, tetapi tidak dapat menghentikan pupuk yang terbawa dari sawah: itu memerlukan perubahan di lahan pertanian itu sendiri.',
      ],
    },
    figure: {
      caption: {
        en: 'The oxygen sag. Below a sewage outlet, bacteria consume oxygen faster than the surface can replace it, so oxygen dips to a minimum a few kilometres downstream and then recovers. The dashed line marks the 5 mg/L level most fish need.',
        id: 'Lengkung oksigen. Di hilir saluran limbah, bakteri menghabiskan oksigen lebih cepat daripada permukaan air menggantinya, sehingga oksigen turun ke titik terendah beberapa kilometer di hilir lalu pulih. Garis putus-putus menandai batas 5 mg/L yang dibutuhkan sebagian besar ikan.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        // DO profile: steady 8.5 until the outlet at x=100, decays to 1.5 at x=190, recovers to ~6.5 at x=330.
        const pts = [];
        for (let i = 0; i <= 60; i++) {
          const x = 30 + i * 5;
          let d;
          if (x <= 100) d = 8.5;
          else { const s = (x - 100) / 90; d = s <= 1 ? 8.5 - 7 * Math.sin(s * Math.PI / 2) : 1.5 + 5 * (1 - Math.exp(-(s - 1) * 1.6)); }
          const y = 190 - (d / 10) * 150;
          pts.push(`${x.toFixed(1)},${y.toFixed(1)}`);
        }
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Dissolved oxygen along a river below a sewage outlet', 'Oksigen terlarut di sepanjang sungai di hilir saluran limbah')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.ax{stroke:currentColor;stroke-width:1.2;fill:none}.g{stroke:currentColor;opacity:.3;stroke-dasharray:3 3}</style>
  <line x1="30" y1="190" x2="340" y2="190" class="ax"/><line x1="30" y1="30" x2="30" y2="190" class="ax"/>
  <text x="14" y="44">10</text><text x="20" y="118">5</text><text x="20" y="194">0</text>
  <text x="8" y="22">${L('oxygen (mg/L)', 'oksigen (mg/L)')}</text>
  <line x1="30" y1="115" x2="340" y2="115" class="g"/>
  <text x="250" y="110" fill="#f59e0b">${L('fish need > 5 mg/L', 'ikan butuh > 5 mg/L')}</text>
  <polyline points="${pts.join(' ')}" fill="none" stroke="#38bdf8" stroke-width="2.5"/>
  <line x1="100" y1="40" x2="100" y2="190" stroke="#ef4444" stroke-width="1.5" stroke-dasharray="4 3"/>
  <rect x="78" y="40" width="44" height="16" rx="3" fill="#ef4444"/><text x="100" y="52" text-anchor="middle" fill="#fff" style="font-size:10px">${L('sewage', 'limbah')}</text>
  <text x="196" y="182" text-anchor="middle" fill="#38bdf8">${L('lowest oxygen', 'oksigen terendah')}</text>
  <text x="290" y="70" fill="#10b981">${L('recovery', 'pemulihan')}</text>
  <text x="34" y="215">${L('upstream', 'hulu')}</text><text x="300" y="215">${L('downstream', 'hilir')}</text>
  <text x="140" y="232" text-anchor="middle">${L('distance along the river →', 'jarak sepanjang sungai →')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'River animals depend on dissolved oxygen; clean water holds about 8 to 9 mg/L and most fish need more than 5 mg/L.',
        'Sewage is food for bacteria, which consume oxygen; the result is an oxygen sag that is deepest a few kilometres downstream of the outlet.',
        'Fertiliser runoff feeds algae; the bloom and its decay lower oxygen further downstream (eutrophication).',
        'Toxic factory waste can kill fish and insects without lowering oxygen at all, so chemistry and living indicators must both be checked.',
        'Indicator insects reveal water quality: stonefly nymphs mean clean water, bloodworms and sludge worms mean low oxygen.',
        'A treatment plant removes most organic waste and toxins, but runoff from farmland must be reduced at the source.',
      ],
      id: [
        'Hewan sungai bergantung pada oksigen terlarut; air bersih mengandung sekitar 8 sampai 9 mg/L dan sebagian besar ikan butuh lebih dari 5 mg/L.',
        'Limbah rumah tangga adalah makanan bakteri yang menghabiskan oksigen; hasilnya lengkung oksigen yang paling dalam beberapa kilometer di hilir saluran pembuangan.',
        'Pupuk yang terbawa aliran memberi makan alga; ledakan alga dan pembusukannya menurunkan oksigen lebih jauh di hilir (eutrofikasi).',
        'Limbah pabrik beracun dapat membunuh ikan dan serangga tanpa menurunkan oksigen sama sekali, sehingga kimia air dan indikator hayati harus diperiksa keduanya.',
        'Serangga indikator mengungkap mutu air: nimfa lalat batu berarti air bersih, cacing darah dan cacing lumpur berarti oksigen rendah.',
        'Instalasi pengolahan limbah menyingkirkan sebagian besar limbah organik dan racun, tetapi aliran pupuk dari sawah harus dikurangi di sumbernya.',
      ],
    },
    vocabulary: {
      en: [
        ['Dissolved oxygen (DO)', 'Oxygen gas mixed into water, measured in mg/L; river animals breathe it through gills.'],
        ['Oxygen sag', 'The dip in dissolved oxygen downstream of an organic waste outlet, followed by slow recovery.'],
        ['Eutrophication', 'Over-enrichment of water with nutrients such as nitrate and phosphate, causing algal blooms and oxygen loss.'],
        ['Bioindicator', 'A living thing whose presence or absence tells you about the quality of its environment.'],
        ['Upstream / downstream', 'Towards the source of the river / in the direction the water flows.'],
        ['Sewage treatment plant', 'A facility that removes solids, organic matter and some chemicals from wastewater before it is released.'],
      ],
      id: [
        ['Oksigen terlarut (DO)', 'Gas oksigen yang bercampur dalam air, diukur dalam mg/L; hewan sungai menghirupnya lewat insang.'],
        ['Lengkung oksigen', 'Penurunan oksigen terlarut di hilir saluran limbah organik, diikuti pemulihan perlahan.'],
        ['Eutrofikasi', 'Pengayaan air secara berlebihan oleh nutrien seperti nitrat dan fosfat, yang menyebabkan ledakan alga dan hilangnya oksigen.'],
        ['Bioindikator', 'Makhluk hidup yang keberadaan atau ketiadaannya memberi tahu mutu lingkungannya.'],
        ['Hulu / hilir', 'Ke arah sumber sungai / searah aliran air.'],
        ['Instalasi pengolahan air limbah', 'Fasilitas yang menyingkirkan padatan, bahan organik, dan beberapa bahan kimia dari air limbah sebelum dibuang.'],
      ],
    },
    misconceptions: {
      en: [
        ['Pollution is worst right at the outlet.', 'For organic waste, oxygen is lowest some distance downstream, because bacteria take time to consume the waste while the water keeps flowing. The sim\'s minimum is 2 to 3 km below the village.'],
        ['If the oxygen reading is fine, the river is healthy.', 'Toxic waste kills fish without using oxygen. Set factory waste to 100%: oxygen stays near 8.5 mg/L while the fish and stoneflies disappear.'],
        ['More algae means a healthier river because algae make oxygen.', 'Algae do photosynthesise by day, but a dense bloom shades the water, respires at night and, when it dies, is decomposed by bacteria that drain oxygen. Blooms are a warning sign, not a good sign.'],
        ['A treatment plant solves every pollution problem.', 'It treats what flows through its pipes: sewage and factory effluent. Rain washing fertiliser off fields bypasses the plant completely.'],
      ],
      id: [
        ['Pencemaran paling parah tepat di saluran pembuangan.', 'Untuk limbah organik, oksigen paling rendah beberapa jarak di hilir, karena bakteri butuh waktu menguraikan limbah sementara air terus mengalir. Titik terendah dalam simulasi berada 2 sampai 3 km di hilir desa.'],
        ['Jika angka oksigen baik, sungai pasti sehat.', 'Limbah beracun membunuh ikan tanpa memakai oksigen. Atur limbah pabrik ke 100%: oksigen tetap sekitar 8,5 mg/L sementara ikan dan lalat batu menghilang.'],
        ['Lebih banyak alga berarti sungai lebih sehat karena alga menghasilkan oksigen.', 'Alga memang berfotosintesis di siang hari, tetapi ledakan alga yang pekat menaungi air, bernapas di malam hari, dan ketika mati diuraikan bakteri yang menguras oksigen. Ledakan alga adalah tanda peringatan, bukan tanda baik.'],
        ['Instalasi pengolahan limbah menyelesaikan semua masalah pencemaran.', 'Instalasi hanya mengolah yang mengalir lewat pipanya: limbah rumah tangga dan pabrik. Hujan yang menyapu pupuk dari sawah melewati instalasi sepenuhnya.'],
      ],
    },
    realWorld: {
      en: [
        'The Citarum in West Java receives sewage from millions of people and waste from hundreds of textile factories; long stretches have almost no dissolved oxygen and no fish.',
        'Monitoring teams in many countries collect river insects with a kick-net and score them to produce a biotic index of water quality.',
        'Fertiliser carried by the Mississippi creates a "dead zone" of low oxygen in the Gulf of Mexico every summer.',
        'The River Thames in London was declared biologically dead in 1957; sewage treatment brought back over 100 fish species.',
        'Village-scale communal wastewater systems (IPAL komunal) in Indonesia treat household sewage before it reaches rivers.',
      ],
      id: [
        'Sungai Citarum di Jawa Barat menerima limbah rumah tangga jutaan orang dan limbah ratusan pabrik tekstil; ruas yang panjang hampir tidak mengandung oksigen terlarut dan hampir tidak ada ikan.',
        'Tim pemantau di banyak negara mengumpulkan serangga sungai dengan jaring tendang dan memberi skor untuk menghasilkan indeks biotik mutu air.',
        'Pupuk yang terbawa Sungai Mississippi menciptakan "zona mati" beroksigen rendah di Teluk Meksiko setiap musim panas.',
        'Sungai Thames di London dinyatakan mati secara biologis pada 1957; pengolahan limbah mengembalikan lebih dari 100 spesies ikan.',
        'IPAL komunal skala desa di Indonesia mengolah limbah rumah tangga sebelum mencapai sungai.',
      ],
    },
    questions: {
      en: [
        { q: 'With sewage at 100%, station B (3.5 km) shows about 3.4 mg/L of oxygen but station C (7 km) shows almost zero. The sewage enters at 2.5 km. Why is the oxygen lower further away from the outlet?', a: 'Bacteria need time to consume the organic waste, and the water carries them downstream while they do it. Oxygen keeps falling as long as bacterial demand exceeds the oxygen the surface absorbs; the minimum lies where the two balance, a few kilometres downstream.' },
        { q: 'With only factory waste at 100%, which indicator insects are found at station D, and what does the oxygen chart show?', a: 'Only tolerant animals such as sludge worms remain, even though oxygen is still about 8.5 mg/L. The toxin, not oxygen, is the problem, which the chemistry alone would not reveal.' },
        { q: 'A town council switches on a treatment plant but farmers downstream still complain about green, smelly water. Explain using the sim.', a: 'The plant cuts sewage and factory waste by about 90%, so the oxygen sag disappears. Fertiliser runoff is not piped through the plant; it still feeds the algal bloom, whose decay lowers oxygen downstream. Reducing fertiliser use or planting buffer strips along the fields is needed.' },
      ],
      id: [
        { q: 'Dengan limbah rumah tangga 100%, stasiun B (3,5 km) menunjukkan oksigen sekitar 3,4 mg/L tetapi stasiun C (7 km) hampir nol. Limbah masuk di km 2,5. Mengapa oksigen lebih rendah di tempat yang lebih jauh dari saluran pembuangan?', a: 'Bakteri butuh waktu untuk menguraikan limbah organik, dan air membawa mereka ke hilir selama proses itu. Oksigen terus turun selama kebutuhan bakteri melebihi oksigen yang diserap permukaan; titik terendah berada di tempat keduanya seimbang, beberapa kilometer di hilir.' },
        { q: 'Dengan hanya limbah pabrik 100%, serangga indikator apa yang ditemukan di stasiun D, dan apa yang ditunjukkan grafik oksigen?', a: 'Hanya hewan yang tahan seperti cacing lumpur yang tersisa, padahal oksigen masih sekitar 8,5 mg/L. Racunlah masalahnya, bukan oksigen, yang tidak akan terungkap oleh pengukuran kimia saja.' },
        { q: 'Pemerintah kota menyalakan instalasi pengolahan limbah, tetapi petani di hilir masih mengeluhkan air hijau dan berbau. Jelaskan dengan simulasi.', a: 'Instalasi memotong limbah rumah tangga dan pabrik sekitar 90%, sehingga lengkung oksigen hilang. Aliran pupuk tidak melewati pipa instalasi; pupuk itu tetap memberi makan ledakan alga yang pembusukannya menurunkan oksigen di hilir. Perlu pengurangan pemakaian pupuk atau penanaman jalur penyangga di tepi sawah.' },
      ],
    },
  },
};
