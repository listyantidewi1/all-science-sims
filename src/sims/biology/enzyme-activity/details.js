// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Read an optimum from a temperature/pH curve.',
      'Explain why enzymes lose activity outside their range.',
      'Predict why pepsin and trypsin work in different parts of the gut.',
    ],
    id: [
      'Membaca titik optimum dari kurva suhu/pH.',
      'Menjelaskan mengapa enzim kehilangan aktivitas di luar rentangnya.',
      'Memprediksi mengapa pepsin dan tripsin bekerja di bagian usus berbeda.',
    ],
  },
  tryThis: {
    en: [
      'Find pepsin\'s optimum pH — does it match the stomach (~2)?',
      'Heat past 50 °C — does any enzyme survive?',
      'Add an inhibitor — how does the curve change?',
    ],
    id: [
      'Temukan pH optimum pepsin — sesuai dengan lambung (~2)?',
      'Panaskan hingga di atas 50 °C — apakah ada enzim yang bertahan?',
      'Tambahkan inhibitor — bagaimana kurva berubah?',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'Enzymes are proteins that speed up chemical reactions in living things by millions of times without being used up. Each enzyme has an active site, a pocket whose shape and charges fit one particular substrate molecule; the substrate binds, the reaction happens, the product leaves and the enzyme is ready again. That shape is held in place only by weak bonds between parts of the folded protein chain, which is why enzymes are so sensitive to their surroundings. Change the temperature or the pH too far and the pocket deforms, the substrate no longer fits, and the reaction slows or stops.',
        'Temperature pulls in two directions. Warming makes molecules move faster, so substrate meets enzyme more often and the rate climbs. But above a certain point the vibrations break the weak bonds that hold the protein\'s shape: the enzyme denatures, unfolding permanently, and activity crashes. For most human enzymes this gives a peak near 37 °C and a steep fall above about 50 °C. pH acts on the charges of the amino acids in the active site. Each enzyme is tuned to the acidity of its workplace: pepsin digests protein in the stomach at pH about 2, while trypsin does the same job in the small intestine at pH about 8, and each is almost useless in the other\'s environment.',
        'The sim models activity as the product of three factors. A bell curve in temperature, centred on the optimum, is multiplied by a bell curve in pH centred on that enzyme\'s preferred pH, and then by a denaturation term that drops the rate to zero between 55 °C and 65 °C whatever the enzyme. The Inhibitor slider simply scales the remaining activity down, as an inhibitor molecule occupying the enzyme would. Choose an enzyme, drag the temperature and pH sliders (or the markers on the graphs) and read the percentage of maximum activity; the Compare toggle overlays the other enzymes so you can see how their pH optima differ while their temperature optima are the same.',
        'Real enzyme curves are not symmetric bell shapes, and this is the sim\'s main simplification. Cooling an enzyme slows it gradually and reversibly (a chilled enzyme recovers when warmed), while heating past the denaturation point destroys it for good, so the true curve rises slowly on the left and falls off a cliff on the right. The sim also leaves out substrate concentration, so it cannot show the saturation that enzymes display when every active site is busy, and it does not distinguish competitive inhibitors (which can be overcome by adding more substrate) from non-competitive ones. The four enzymes are drawn with textbook optima rather than measured curves, and enzymes from organisms living in hot springs or polar seas would need very different settings.',
      ],
      id: [
        'Enzim adalah protein yang mempercepat reaksi kimia dalam makhluk hidup hingga jutaan kali tanpa ikut habis. Setiap enzim memiliki sisi aktif, sebuah kantong yang bentuk dan muatannya cocok dengan satu molekul substrat tertentu; substrat menempel, reaksi terjadi, produk lepas, dan enzim siap bekerja lagi. Bentuk itu hanya dipertahankan oleh ikatan-ikatan lemah antarbagian rantai protein yang terlipat, dan itulah sebabnya enzim sangat peka terhadap lingkungannya. Ubah suhu atau pH terlalu jauh, kantongnya berubah bentuk, substrat tidak lagi cocok, dan reaksi melambat atau berhenti.',
        'Suhu menarik ke dua arah. Pemanasan membuat molekul bergerak lebih cepat, sehingga substrat lebih sering bertemu enzim dan lajunya naik. Namun di atas titik tertentu getaran memutus ikatan lemah yang menjaga bentuk protein: enzim terdenaturasi, terurai lipatannya secara permanen, dan aktivitasnya anjlok. Untuk kebanyakan enzim manusia ini memberi puncak di dekat 37 °C dan penurunan tajam di atas sekitar 50 °C. pH bekerja pada muatan asam amino di sisi aktif. Setiap enzim disetel untuk keasaman tempat kerjanya: pepsin mencerna protein di lambung pada pH sekitar 2, sedangkan tripsin mengerjakan tugas yang sama di usus halus pada pH sekitar 8, dan masing-masing hampir tak berguna di lingkungan yang lain.',
        'Simulasi memodelkan aktivitas sebagai hasil kali tiga faktor. Kurva lonceng terhadap suhu, berpusat pada optimum, dikalikan dengan kurva lonceng terhadap pH yang berpusat pada pH kesukaan enzim itu, lalu dikalikan dengan faktor denaturasi yang menurunkan laju ke nol antara 55 °C dan 65 °C untuk enzim apa pun. Slider Inhibitor hanya memperkecil aktivitas yang tersisa, seperti yang dilakukan molekul inhibitor yang menduduki enzim. Pilih enzim, seret slider suhu dan pH (atau penanda pada grafik) dan baca persentase aktivitas maksimumnya; tombol Compare menumpangkan enzim-enzim lain sehingga kamu bisa melihat bahwa pH optimumnya berbeda sementara suhu optimumnya sama.',
        'Kurva enzim sungguhan bukan lonceng yang simetris, dan inilah penyederhanaan utama simulasi. Mendinginkan enzim memperlambatnya secara bertahap dan dapat balik (enzim yang didinginkan pulih ketika dihangatkan), sedangkan memanaskan melewati titik denaturasi merusaknya untuk selamanya, sehingga kurva sebenarnya naik perlahan di kiri dan jatuh seperti tebing di kanan. Simulasi juga tidak menyertakan konsentrasi substrat, sehingga tidak dapat menunjukkan kejenuhan yang terjadi ketika semua sisi aktif sibuk, dan tidak membedakan inhibitor kompetitif (yang dapat diatasi dengan menambah substrat) dari inhibitor nonkompetitif. Keempat enzim digambar dengan optimum buku teks, bukan kurva hasil pengukuran, dan enzim dari organisme penghuni sumber air panas atau laut kutub akan membutuhkan pengaturan yang sangat berbeda.',
      ],
    },
    figure: {
      caption: {
        en: 'Activity curves from the sim\'s model. Left: warming speeds the reaction up to the 37 °C optimum, then denaturation above 55 °C destroys the enzyme\'s shape. Right: pepsin (stomach) peaks at pH 2 and trypsin (small intestine) at pH 8; each is nearly inactive in the other\'s environment.',
        id: 'Kurva aktivitas dari model simulasi. Kiri: pemanasan mempercepat reaksi sampai optimum 37 °C, lalu denaturasi di atas 55 °C merusak bentuk enzim. Kanan: pepsin (lambung) berpuncak pada pH 2 dan tripsin (usus halus) pada pH 8; masing-masing hampir tidak aktif di lingkungan yang lain.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Enzyme activity against temperature and pH', 'Aktivitas enzim terhadap suhu dan pH')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.s{font-size:10px}.m{fill:none;stroke:currentColor;stroke-width:1.2}</style>
  <text x="30" y="20" font-weight="700">${L('Temperature', 'Suhu')}</text>
  <line x1="30" y1="200" x2="170" y2="200" class="m"/>
  <line x1="30" y1="50" x2="30" y2="200" class="m"/>
  <rect x="107" y="50" width="14" height="150" fill="#ef4444" opacity=".12"/>
  <polyline fill="none" stroke="#3b82f6" stroke-width="2.4" points="30,200 52.4,199.9 58,198.5 60.8,195.8 63.6,190 66.4,178.9 69.2,160.5 72,134.9 74.8,105.3 77.6,78.4 80.4,62.2 83.2,62.2 86,78.4 88.8,105.3 91.6,134.9 94.4,160.5 97.2,178.9 100,190 102.8,195.8 105.6,198.5 108.4,199.6 114,200 170,200"/>
  <line x1="81.8" y1="62" x2="81.8" y2="200" stroke="#10b981" stroke-width="1.2" stroke-dasharray="3 3"/>
  <text x="70" y="214" class="s">37 °C</text>
  <text x="28" y="214" class="s">0</text>
  <text x="156" y="214" class="s">100</text>
  <text x="80" y="228" class="s">${L('temperature (°C)', 'suhu (°C)')}</text>
  <text x="34" y="80" class="s">${L('faster', 'lebih cepat')}</text>
  <text x="34" y="92" class="s">${L('collisions ↑', 'tumbukan ↑')}</text>
  <text x="104" y="40" fill="#ef4444" class="s">${L('denatures', 'denaturasi')}</text>
  <text x="104" y="52" fill="#ef4444" class="s">55–65 °C</text>
  <path d="M100 64 L112 64 L112 74" stroke="#ef4444" stroke-width="1.2" fill="none" marker-end="url(#a)"/>
  <text x="2" y="130" class="s" transform="rotate(-90 10 130)">${L('activity', 'aktivitas')}</text>
  <text x="200" y="20" font-weight="700">pH</text>
  <line x1="200" y1="200" x2="340" y2="200" class="m"/>
  <line x1="200" y1="50" x2="200" y2="200" class="m"/>
  <polyline fill="none" stroke="#ef4444" stroke-width="2.4" points="200,197.4 202.5,193.5 205,185.2 207.5,170.7 210,148.5 212.5,120.2 215,91 217.5,68.5 220,60 222.5,68.5 225,91 227.5,120.2 230,148.5 232.5,170.7 235,185.2 237.5,193.5 240,197.4 245,199.7 250,200 340,200"/>
  <polyline fill="none" stroke="#3b82f6" stroke-width="2.4" points="200,200 250,200 255,199.7 260,197.4 262.5,193.5 265,185.2 267.5,170.7 270,148.5 272.5,120.2 275,91 277.5,68.5 280,60 282.5,68.5 285,91 287.5,120.2 290,148.5 292.5,170.7 295,185.2 297.5,193.5 300,197.4 305,199.7 310,200 340,200"/>
  <text x="210" y="52" fill="#ef4444" class="s">${L('pepsin', 'pepsin')}</text>
  <text x="210" y="64" fill="#ef4444" class="s">${L('stomach, pH 2', 'lambung, pH 2')}</text>
  <text x="286" y="52" fill="#3b82f6" class="s">${L('trypsin', 'tripsin')}</text>
  <text x="286" y="64" fill="#3b82f6" class="s">${L('intestine, pH 8', 'usus, pH 8')}</text>
  <text x="198" y="214" class="s">0</text>
  <text x="216" y="214" class="s">2</text>
  <text x="266" y="214" class="s">7</text>
  <text x="276" y="214" class="s">8</text>
  <text x="330" y="214" class="s">14</text>
  <text x="300" y="228" class="s">pH</text>
  <text x="230" y="136" class="s">${L('wrong pH: active-site', 'pH keliru: muatan')}</text>
  <text x="230" y="148" class="s">${L('charges change, fit lost', 'sisi aktif berubah, tak cocok')}</text>
  <defs><marker id="a" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="context-stroke"/></marker></defs>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Enzymes speed up reactions by binding a specific substrate in an active site whose shape depends on the folded protein.',
        'Warming raises the rate by increasing collisions until the protein denatures, so every enzyme has a temperature optimum.',
        'pH changes the charges in the active site, and each enzyme is tuned to the pH of the place it works: pepsin near 2, trypsin near 8.',
        'Denaturation above about 50–60 °C is permanent for most enzymes; cooling only slows them and is reversible.',
        'Inhibitors lower activity by occupying or distorting the enzyme; the sim models this as a simple fractional reduction.',
      ],
      id: [
        'Enzim mempercepat reaksi dengan mengikat substrat tertentu pada sisi aktif yang bentuknya bergantung pada lipatan protein.',
        'Pemanasan menaikkan laju dengan memperbanyak tumbukan sampai protein terdenaturasi, sehingga setiap enzim punya suhu optimum.',
        'pH mengubah muatan di sisi aktif, dan setiap enzim disetel untuk pH tempat kerjanya: pepsin di dekat 2, tripsin di dekat 8.',
        'Denaturasi di atas sekitar 50–60 °C bersifat permanen bagi kebanyakan enzim; pendinginan hanya memperlambat dan dapat balik.',
        'Inhibitor menurunkan aktivitas dengan menduduki atau mengubah bentuk enzim; simulasi memodelkannya sebagai pengurangan fraksi sederhana.',
      ],
    },
    vocabulary: {
      en: [
        ['Enzyme', 'A protein catalyst that speeds up a specific biochemical reaction without being consumed.'],
        ['Substrate', 'The molecule an enzyme acts on; it binds in the active site and is converted to product.'],
        ['Active site', 'The pocket on an enzyme where the substrate fits; its shape and charge determine what the enzyme can bind.'],
        ['Optimum', 'The temperature or pH at which an enzyme works fastest.'],
        ['Denaturation', 'Loss of a protein\'s folded shape, usually caused by heat or extreme pH, which destroys its activity.'],
        ['Inhibitor', 'A molecule that reduces enzyme activity, either by blocking the active site (competitive) or by binding elsewhere and distorting it (non-competitive).'],
        ['Catalyst', 'A substance that lowers the activation energy of a reaction and so speeds it up, remaining unchanged at the end.'],
      ],
      id: [
        ['Enzim', 'Katalis protein yang mempercepat reaksi biokimia tertentu tanpa ikut habis.'],
        ['Substrat', 'Molekul yang digarap enzim; menempel pada sisi aktif dan diubah menjadi produk.'],
        ['Sisi aktif', 'Kantong pada enzim tempat substrat cocok menempel; bentuk dan muatannya menentukan apa yang dapat diikat enzim.'],
        ['Optimum', 'Suhu atau pH tempat enzim bekerja paling cepat.'],
        ['Denaturasi', 'Hilangnya bentuk lipatan protein, biasanya karena panas atau pH ekstrem, yang memusnahkan aktivitasnya.'],
        ['Inhibitor', 'Molekul yang menurunkan aktivitas enzim, dengan menyumbat sisi aktif (kompetitif) atau menempel di tempat lain dan mengubah bentuknya (nonkompetitif).'],
        ['Katalis', 'Zat yang menurunkan energi aktivasi reaksi sehingga mempercepatnya, dan tetap tidak berubah pada akhir reaksi.'],
      ],
    },
    misconceptions: {
      en: [
        ['Enzymes are used up in the reaction.', 'An enzyme releases its product and binds a new substrate, cycling thousands of times per second. Only its shape matters, and that is unchanged by the reaction.'],
        ['Cold denatures enzymes just as heat does.', 'Cold only slows molecular motion, and activity returns on warming. Heat beyond the optimum breaks the bonds that hold the fold and is usually permanent. The sim\'s symmetric curve does not show this difference.'],
        ['The optimum pH for all enzymes is 7, because that is neutral.', 'The optimum matches the enzyme\'s workplace. Pepsin works best around pH 2 in the stomach and would be inactive at pH 7; trypsin prefers the alkaline small intestine.'],
        ['Hotter is always faster for an enzyme reaction.', 'Only up to the optimum. Beyond it the enzyme denatures and the rate collapses, which is why a fever above about 41 °C is dangerous.'],
      ],
      id: [
        ['Enzim ikut habis dalam reaksi.', 'Enzim melepaskan produknya dan mengikat substrat baru, berputar ribuan kali per detik. Hanya bentuknya yang penting, dan bentuk itu tidak berubah oleh reaksi.'],
        ['Dingin mendenaturasi enzim seperti halnya panas.', 'Dingin hanya memperlambat gerak molekul, dan aktivitas pulih saat dihangatkan. Panas yang melampaui optimum memutus ikatan yang menjaga lipatan dan biasanya permanen. Kurva simetris di simulasi tidak menunjukkan perbedaan ini.'],
        ['pH optimum semua enzim adalah 7, karena itu netral.', 'Optimum menyesuaikan tempat kerja enzim. Pepsin bekerja paling baik sekitar pH 2 di lambung dan akan tidak aktif pada pH 7; tripsin menyukai usus halus yang basa.'],
        ['Semakin panas selalu semakin cepat untuk reaksi enzim.', 'Hanya sampai optimum. Di atasnya enzim terdenaturasi dan lajunya runtuh; itulah sebabnya demam di atas sekitar 41 °C berbahaya.'],
      ],
    },
    realWorld: {
      en: [
        'Biological washing powders contain protease and lipase enzymes, which is why they work in a cool wash but are wasted in a very hot one where the enzymes denature.',
        'Cooking an egg turns the clear white opaque because heat denatures its proteins; the same thing happens to enzymes above their optimum.',
        'The PCR test used to detect viruses relies on Taq polymerase, an enzyme from hot-spring bacteria that survives the 95 °C steps that would destroy human enzymes.',
        'Lactose-intolerant people lack enough lactase in the small intestine, so milk sugar passes undigested to the colon; lactase tablets supply the missing enzyme.',
      ],
      id: [
        'Deterjen biologis mengandung enzim protease dan lipase; itulah sebabnya deterjen ini bekerja pada cucian air dingin tetapi sia-sia pada air yang sangat panas yang mendenaturasi enzimnya.',
        'Memasak telur mengubah putih telur yang bening menjadi putih buram karena panas mendenaturasi proteinnya; hal yang sama terjadi pada enzim di atas optimumnya.',
        'Tes PCR untuk mendeteksi virus mengandalkan polimerase Taq, enzim dari bakteri sumber air panas yang bertahan pada tahap 95 °C yang akan merusak enzim manusia.',
        'Orang dengan intoleransi laktosa kekurangan laktase di usus halus, sehingga gula susu lewat tanpa tercerna ke usus besar; tablet laktase memasok enzim yang kurang itu.',
      ],
    },
    questions: {
      en: [
        { q: 'In the sim, set pepsin to 37 °C and pH 2, then change only the pH to 8. Roughly what happens to its activity, and what does this say about where pepsin works in the body?', a: 'Activity falls from 100% to essentially zero, because pH 8 is six units away from pepsin\'s optimum. Pepsin is built for the acidic stomach; when stomach contents pass into the alkaline small intestine, pepsin stops working and trypsin takes over.' },
        { q: 'Why does the temperature curve of every enzyme in the sim drop to zero between 55 °C and 65 °C even though their pH optima differ?', a: 'Because the sim applies one denaturation rule to all of them: above 55 °C the protein\'s shape is assumed to unravel, and the activity reaches zero at 65 °C regardless of pH. In reality the exact denaturation temperature varies between enzymes, but for most human enzymes it does lie in this range.' },
        { q: 'With the inhibitor slider at 0.50, what is the activity of an enzyme that would otherwise be at 80%, and how does a real competitive inhibitor differ from the sim\'s rule?', a: 'The sim multiplies by (1 − 0.50), so the activity becomes 40%. A real competitive inhibitor competes with substrate for the active site, so adding more substrate restores the rate; the sim has no substrate concentration, so its inhibition can never be overcome.' },
      ],
      id: [
        { q: 'Di simulasi, atur pepsin pada 37 °C dan pH 2, lalu ubah pH saja menjadi 8. Kira-kira apa yang terjadi pada aktivitasnya, dan apa artinya bagi tempat kerja pepsin di dalam tubuh?', a: 'Aktivitas turun dari 100% menjadi praktis nol, karena pH 8 berjarak enam satuan dari optimum pepsin. Pepsin dirancang untuk lambung yang asam; ketika isi lambung masuk ke usus halus yang basa, pepsin berhenti bekerja dan tripsin mengambil alih.' },
        { q: 'Mengapa kurva suhu setiap enzim di simulasi turun ke nol antara 55 °C dan 65 °C meskipun pH optimumnya berbeda?', a: 'Karena simulasi menerapkan satu aturan denaturasi untuk semuanya: di atas 55 °C bentuk protein dianggap terurai, dan aktivitas mencapai nol pada 65 °C apa pun pH-nya. Pada kenyataannya suhu denaturasi yang tepat berbeda antar-enzim, tetapi untuk kebanyakan enzim manusia memang berada dalam rentang ini.' },
        { q: 'Dengan slider inhibitor pada 0,50, berapa aktivitas enzim yang seharusnya 80%, dan bagaimana inhibitor kompetitif sungguhan berbeda dari aturan simulasi?', a: 'Simulasi mengalikan dengan (1 − 0,50), sehingga aktivitasnya menjadi 40%. Inhibitor kompetitif sungguhan bersaing dengan substrat memperebutkan sisi aktif, sehingga menambah substrat memulihkan lajunya; simulasi tidak punya konsentrasi substrat, sehingga inhibisinya tidak pernah bisa diatasi.' },
      ],
    },
  },
};
