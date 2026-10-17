// Long-form text for the Blood Sugar Control sim (grade 11–12).
export default {
  objectives: {
    en: [
      'Describe the negative-feedback loop that keeps blood glucose near 4–7 mmol/L: pancreatic β cells release insulin when glucose is high and α cells release glucagon when it is low.',
      'Explain the roles of the liver (glycogen storage and release) and body cells (glucose uptake) as the effectors of the loop, using measured peak values and recovery times.',
      'Predict what happens to blood glucose after a meal, exercise or an insulin injection in a healthy person and in a person with type 1 diabetes.',
    ],
    id: [
      'Menjelaskan lingkar umpan balik negatif yang menjaga glukosa darah sekitar 4–7 mmol/L: sel β pankreas melepaskan insulin saat glukosa tinggi dan sel α melepaskan glukagon saat rendah.',
      'Menjelaskan peran hati (penyimpanan dan pelepasan glikogen) dan sel tubuh (penyerapan glukosa) sebagai efektor lingkar itu, menggunakan nilai puncak dan waktu pulih yang terukur.',
      'Memprediksi perubahan glukosa darah setelah makan, olahraga atau suntikan insulin pada orang sehat dan pada penderita diabetes tipe 1.',
    ],
  },
  tryThis: {
    en: [
      'Eat a large meal and watch the insulin arrow light up. How high does glucose peak, and how many minutes until it is back under 7 mmol/L?',
      'Let the body fast and sleep through the night. Which hormone is active, and how fast does the liver glycogen bar fall?',
      'Turn on type 1 diabetes and eat a large meal. Then try the same meal with one insulin injection at the same time.',
      'With type 1 diabetes, inject insulin without eating. What happens, and why is this dangerous in real life?',
    ],
    id: [
      'Makan porsi besar dan lihat panah insulin menyala. Seberapa tinggi puncak glukosa, dan berapa menit sampai kembali di bawah 7 mmol/L?',
      'Biarkan tubuh berpuasa dan tidur semalaman. Hormon mana yang aktif, dan seberapa cepat batang glikogen hati turun?',
      'Nyalakan diabetes tipe 1 dan makan porsi besar. Lalu coba makanan yang sama dengan satu suntikan insulin pada saat yang sama.',
      'Dengan diabetes tipe 1, suntikkan insulin tanpa makan. Apa yang terjadi, dan mengapa ini berbahaya di dunia nyata?',
    ],
  },

  learn: {
    background: {
      en: [
        'Blood glucose is kept remarkably steady, normally between about 4 and 7 mmol/L (72–126 mg/dL), even though we eat in bursts and use glucose continuously. The brain alone burns about 120 g of glucose a day and cannot store it, so a fall below 3 mmol/L causes confusion and fainting, while prolonged values above 10 mmol/L damage blood vessels, nerves and kidneys. The control system is a classic negative-feedback loop: a change in glucose is detected by the pancreas, which releases a hormone that drives glucose back the other way.',
        'When glucose rises after a meal, β cells in the islets of Langerhans release insulin. Insulin makes muscle and fat cells insert extra glucose transporters into their membranes so they take up glucose faster, and it tells the liver to convert glucose into glycogen (glycogenesis) and to stop releasing glucose. Glucose therefore falls. When glucose drops, during fasting or exercise, α cells release glucagon instead. Glucagon makes the liver break glycogen down into glucose (glycogenolysis) and, when glycogen runs low, make new glucose from amino acids and lactate (gluconeogenesis). The liver can hold about 100 g of glycogen, enough for roughly a day of fasting, which is why the glycogen bar in the simulation falls overnight and refills after meals.',
        'The model follows a 15 L pool of body fluid: 1 g of glucose added to it raises the concentration by about 0.37 mmol/L. Carbohydrate from a meal leaves the stomach and is absorbed over 1–2 h, insulin and glucagon respond within minutes, and the result is the familiar curve: a peak of 6–8 mmol/L about 30–60 min after eating and a return to the fasting level within about 2 h. In type 1 diabetes the β cells have been destroyed by the immune system, so the insulin arrow never lights. After a meal glucose climbs past 10 mmol/L and stays high for hours, and the kidneys start to lose glucose into the urine. Injected insulin restores the missing signal, but it does not sense glucose: too large a dose, or a dose without food, drives glucose below 4 mmol/L (hypoglycaemia).',
        'Managing diabetes is therefore a matter of matching insulin doses to carbohydrate intake and activity, which is exactly what the Lab asks you to practise: record the glucose before each event, the peak or trough it causes, and how long it takes to get back into the 4–7 mmol/L band.',
      ],
      id: [
        'Glukosa darah dijaga sangat stabil, normalnya antara sekitar 4 dan 7 mmol/L (72–126 mg/dL), walaupun kita makan sesekali dan memakai glukosa terus-menerus. Otak saja membakar sekitar 120 g glukosa sehari dan tidak bisa menyimpannya, sehingga penurunan di bawah 3 mmol/L menyebabkan kebingungan dan pingsan, sementara nilai di atas 10 mmol/L yang berkepanjangan merusak pembuluh darah, saraf dan ginjal. Sistem kendalinya adalah lingkar umpan balik negatif klasik: perubahan glukosa dideteksi pankreas, yang melepaskan hormon yang mendorong glukosa kembali ke arah sebaliknya.',
        'Ketika glukosa naik setelah makan, sel β di pulau Langerhans melepaskan insulin. Insulin membuat sel otot dan lemak menyisipkan lebih banyak pengangkut glukosa ke membrannya sehingga menyerap glukosa lebih cepat, dan memberi tahu hati untuk mengubah glukosa menjadi glikogen (glikogenesis) serta berhenti melepaskan glukosa. Glukosa pun turun. Ketika glukosa turun, saat puasa atau olahraga, sel α melepaskan glukagon. Glukagon membuat hati memecah glikogen menjadi glukosa (glikogenolisis) dan, ketika glikogen menipis, membuat glukosa baru dari asam amino dan laktat (glukoneogenesis). Hati dapat menyimpan sekitar 100 g glikogen, cukup untuk kira-kira satu hari puasa, itulah sebabnya batang glikogen di simulasi turun semalaman dan terisi lagi setelah makan.',
        'Model ini mengikuti 15 L cairan tubuh: 1 g glukosa yang ditambahkan menaikkan konsentrasi sekitar 0,37 mmol/L. Karbohidrat dari makanan meninggalkan lambung dan diserap selama 1–2 jam, insulin dan glukagon merespons dalam hitungan menit, dan hasilnya kurva yang akrab: puncak 6–8 mmol/L sekitar 30–60 menit setelah makan dan kembali ke kadar puasa dalam sekitar 2 jam. Pada diabetes tipe 1 sel β telah dihancurkan sistem imun, sehingga panah insulin tidak pernah menyala. Setelah makan glukosa naik melewati 10 mmol/L dan tetap tinggi berjam-jam, dan ginjal mulai membuang glukosa ke urine. Insulin suntikan memulihkan sinyal yang hilang, tetapi tidak merasakan glukosa: dosis terlalu besar, atau dosis tanpa makan, mendorong glukosa di bawah 4 mmol/L (hipoglikemia).',
        'Mengelola diabetes karena itu adalah soal menyesuaikan dosis insulin dengan asupan karbohidrat dan aktivitas, persis yang diminta Lab untuk kamu latih: catat glukosa sebelum tiap peristiwa, puncak atau lembah yang ditimbulkannya, dan berapa lama sampai kembali ke pita 4–7 mmol/L.',
      ],
    },
    figure: {
      caption: {
        en: 'The negative-feedback loop. High glucose (above about 7 mmol/L) stimulates β cells to release insulin, which makes cells take up glucose and the liver store it as glycogen, so glucose falls. Low glucose (below about 4 mmol/L) stimulates α cells to release glucagon, which makes the liver release glucose from glycogen, so glucose rises.',
        id: 'Lingkar umpan balik negatif. Glukosa tinggi (di atas sekitar 7 mmol/L) merangsang sel β melepaskan insulin, yang membuat sel menyerap glukosa dan hati menyimpannya sebagai glikogen, sehingga glukosa turun. Glukosa rendah (di bawah sekitar 4 mmol/L) merangsang sel α melepaskan glukagon, yang membuat hati melepaskan glukosa dari glikogen, sehingga glukosa naik.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Insulin and glucagon feedback loop', 'Lingkar umpan balik insulin dan glukagon')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.s{font:9.5px system-ui,sans-serif;fill:currentColor;opacity:.85}.b{fill:none;stroke:currentColor;stroke-width:1.2}.f{fill:none;stroke-width:2;stroke-linecap:round}</style>
  <defs>
    <marker id="mi" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto"><path d="M0 0 L7 3.5 L0 7 z" fill="#38bdf8"/></marker>
    <marker id="mg" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto"><path d="M0 0 L7 3.5 L0 7 z" fill="#f59e0b"/></marker>
  </defs>
  <rect x="130" y="100" width="100" height="40" rx="8" fill="#22c55e" opacity=".2" stroke="#22c55e"/>
  <text x="180" y="117" text-anchor="middle">${L('Blood glucose', 'Glukosa darah')}</text>
  <text x="180" y="131" text-anchor="middle" class="s">${L('set point 4–7 mmol/L', 'titik acuan 4–7 mmol/L')}</text>
  <rect x="20" y="20" width="110" height="34" rx="6" class="b"/>
  <text x="75" y="34" text-anchor="middle">${L('Glucose HIGH', 'Glukosa TINGGI')}</text>
  <text x="75" y="47" text-anchor="middle" class="s">${L('after a meal', 'setelah makan')}</text>
  <rect x="230" y="20" width="110" height="34" rx="6" fill="#38bdf8" opacity=".2" stroke="#38bdf8"/>
  <text x="285" y="34" text-anchor="middle">${L('Pancreas β cells', 'Sel β pankreas')}</text>
  <text x="285" y="47" text-anchor="middle" class="s">${L('release INSULIN', 'melepaskan INSULIN')}</text>
  <path d="M130 37 L224 37" class="f" stroke="#38bdf8" marker-end="url(#mi)"/>
  <path d="M285 54 C285 80 250 90 232 100" class="f" stroke="#38bdf8" marker-end="url(#mi)"/>
  <text x="262" y="78" class="s" fill="#38bdf8">${L('cells take up glucose;', 'sel menyerap glukosa;')}</text>
  <text x="262" y="90" class="s" fill="#38bdf8">${L('liver: glucose → glycogen', 'hati: glukosa → glikogen')}</text>
  <text x="300" y="112" class="s" fill="#38bdf8">${L('glucose falls', 'glukosa turun')}</text>
  <path d="M130 108 C100 90 80 70 75 54" class="f" stroke="currentColor" opacity=".5" stroke-dasharray="3 3" marker-end="url(#mi)"/>
  <rect x="20" y="186" width="110" height="34" rx="6" class="b"/>
  <text x="75" y="200" text-anchor="middle">${L('Glucose LOW', 'Glukosa RENDAH')}</text>
  <text x="75" y="213" text-anchor="middle" class="s">${L('fasting, exercise', 'puasa, olahraga')}</text>
  <rect x="230" y="186" width="110" height="34" rx="6" fill="#f59e0b" opacity=".2" stroke="#f59e0b"/>
  <text x="285" y="200" text-anchor="middle">${L('Pancreas α cells', 'Sel α pankreas')}</text>
  <text x="285" y="213" text-anchor="middle" class="s">${L('release GLUCAGON', 'melepaskan GLUKAGON')}</text>
  <path d="M130 203 L224 203" class="f" stroke="#f59e0b" marker-end="url(#mg)"/>
  <path d="M285 186 C285 160 250 150 232 140" class="f" stroke="#f59e0b" marker-end="url(#mg)"/>
  <text x="262" y="158" class="s" fill="#f59e0b">${L('liver: glycogen → glucose', 'hati: glikogen → glukosa')}</text>
  <text x="300" y="132" class="s" fill="#f59e0b">${L('glucose rises', 'glukosa naik')}</text>
  <path d="M130 132 C100 150 80 170 75 186" class="f" stroke="currentColor" opacity=".5" stroke-dasharray="3 3" marker-end="url(#mg)"/>
  <text x="180" y="12" text-anchor="middle" class="s">${L('negative feedback: the response reverses the change', 'umpan balik negatif: respons membalikkan perubahan')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Normal blood glucose is about 4–7 mmol/L; the brain needs a steady supply and cannot store glucose.',
        'Insulin (from β cells) lowers glucose by increasing uptake into cells and converting glucose to glycogen in the liver.',
        'Glucagon (from α cells) raises glucose by making the liver break glycogen down and make new glucose.',
        'Because the response opposes the change, the loop is negative feedback; it overshoots slightly, which is why glucose oscillates around the set point.',
        'Liver glycogen (~100 g) is the overnight glucose reserve; it refills after meals and empties after about a day of fasting.',
        'In type 1 diabetes no insulin is made: glucose climbs above 10 mmol/L after meals, and injected insulin must be matched to food and exercise to avoid hypoglycaemia.',
      ],
      id: [
        'Glukosa darah normal sekitar 4–7 mmol/L; otak membutuhkan pasokan stabil dan tidak bisa menyimpan glukosa.',
        'Insulin (dari sel β) menurunkan glukosa dengan meningkatkan penyerapan ke sel dan mengubah glukosa menjadi glikogen di hati.',
        'Glukagon (dari sel α) menaikkan glukosa dengan membuat hati memecah glikogen dan membuat glukosa baru.',
        'Karena respons melawan perubahan, lingkar ini adalah umpan balik negatif; ia sedikit melampaui target, itulah sebabnya glukosa berosilasi di sekitar titik acuan.',
        'Glikogen hati (~100 g) adalah cadangan glukosa semalaman; terisi lagi setelah makan dan habis setelah sekitar satu hari puasa.',
        'Pada diabetes tipe 1 insulin tidak dibuat: glukosa naik di atas 10 mmol/L setelah makan, dan insulin suntikan harus disesuaikan dengan makanan dan olahraga agar tidak hipoglikemia.',
      ],
    },
    vocabulary: {
      en: [
        ['Homeostasis', 'Keeping internal conditions, such as blood glucose, within a narrow range despite external changes.'],
        ['Negative feedback', 'A control loop in which the response reduces the original change, returning the variable towards its set point.'],
        ['Insulin', 'Hormone from pancreatic β cells that lowers blood glucose by stimulating uptake and glycogen synthesis.'],
        ['Glucagon', 'Hormone from pancreatic α cells that raises blood glucose by stimulating glycogen breakdown and gluconeogenesis.'],
        ['Glycogen', 'A branched polymer of glucose stored in the liver and muscles; the liver\'s store is about 100 g.'],
        ['Hypoglycaemia', 'Blood glucose below about 4 mmol/L; causes shaking, confusion and, if severe, loss of consciousness.'],
        ['Type 1 diabetes', 'An autoimmune disease that destroys β cells, so no insulin is produced and it must be injected.'],
      ],
      id: [
        ['Homeostasis', 'Menjaga kondisi internal, seperti glukosa darah, dalam rentang sempit meski lingkungan berubah.'],
        ['Umpan balik negatif', 'Lingkar kendali ketika respons mengurangi perubahan awal, mengembalikan variabel ke titik acuannya.'],
        ['Insulin', 'Hormon dari sel β pankreas yang menurunkan glukosa darah dengan merangsang penyerapan dan sintesis glikogen.'],
        ['Glukagon', 'Hormon dari sel α pankreas yang menaikkan glukosa darah dengan merangsang pemecahan glikogen dan glukoneogenesis.'],
        ['Glikogen', 'Polimer bercabang dari glukosa yang disimpan di hati dan otot; simpanan hati sekitar 100 g.'],
        ['Hipoglikemia', 'Glukosa darah di bawah sekitar 4 mmol/L; menyebabkan gemetar, bingung dan, jika parah, hilang kesadaran.'],
        ['Diabetes tipe 1', 'Penyakit autoimun yang menghancurkan sel β, sehingga insulin tidak diproduksi dan harus disuntikkan.'],
      ],
    },
    misconceptions: {
      en: [
        ['Insulin is "the sugar hormone" and glucagon is unimportant.', 'Both are essential. Between meals and overnight glucagon keeps glucose from falling too low by releasing glucose from the liver; without it you would become hypoglycaemic while sleeping.'],
        ['Eating sugar causes diabetes.', 'Type 1 diabetes is an autoimmune destruction of β cells and is not caused by diet. Type 2 is linked to obesity and insulin resistance, in which cells respond poorly to insulin, not simply to eating sugar.'],
        ['For a person with diabetes, more insulin is always safer.', 'Too much insulin drives glucose below 4 mmol/L, which is immediately dangerous. The dose must match the carbohydrate eaten and the exercise done.'],
        ['Blood glucose stays exactly constant in a healthy person.', 'It rises to 6–8 mmol/L after meals and drifts to about 4–5 mmol/L when fasting. Homeostasis means a narrow range, not a fixed value.'],
      ],
      id: [
        ['Insulin adalah "hormon gula" dan glukagon tidak penting.', 'Keduanya penting. Di antara waktu makan dan semalaman glukagon mencegah glukosa turun terlalu rendah dengan melepaskan glukosa dari hati; tanpanya kamu akan hipoglikemia saat tidur.'],
        ['Makan gula menyebabkan diabetes.', 'Diabetes tipe 1 adalah penghancuran sel β oleh autoimun dan tidak disebabkan pola makan. Tipe 2 terkait obesitas dan resistansi insulin, ketika sel kurang merespons insulin, bukan sekadar makan gula.'],
        ['Bagi penderita diabetes, lebih banyak insulin selalu lebih aman.', 'Insulin berlebih mendorong glukosa di bawah 4 mmol/L, yang langsung berbahaya. Dosis harus sesuai karbohidrat yang dimakan dan olahraga yang dilakukan.'],
        ['Glukosa darah orang sehat tetap persis konstan.', 'Ia naik ke 6–8 mmol/L setelah makan dan turun ke sekitar 4–5 mmol/L saat puasa. Homeostasis berarti rentang sempit, bukan nilai tetap.'],
      ],
    },
    realWorld: {
      en: [
        'A fasting blood glucose of 7.0 mmol/L or more, or an HbA1c of 6.5% or more, is used to diagnose diabetes.',
        'People with type 1 diabetes count the carbohydrate in each meal and inject a matching dose of rapid-acting insulin, or wear a pump that does so automatically.',
        'Continuous glucose monitors draw exactly the kind of 24-hour trace shown in this simulation, with alarms when the value leaves the target band.',
        'Marathon runners "hit the wall" after about 30 km when liver and muscle glycogen are exhausted and glucose supply to the brain falls.',
        'Glucagon injection kits are carried by people with diabetes to treat severe hypoglycaemia when they cannot eat.',
      ],
      id: [
        'Glukosa darah puasa 7,0 mmol/L atau lebih, atau HbA1c 6,5% atau lebih, dipakai untuk mendiagnosis diabetes.',
        'Penderita diabetes tipe 1 menghitung karbohidrat tiap makanan dan menyuntikkan dosis insulin kerja cepat yang sesuai, atau memakai pompa yang melakukannya otomatis.',
        'Pemantau glukosa kontinu menggambar jejak 24 jam persis seperti yang ditampilkan simulasi ini, dengan alarm saat nilai keluar dari pita target.',
        'Pelari maraton "menabrak tembok" setelah sekitar 30 km ketika glikogen hati dan otot habis dan pasokan glukosa ke otak turun.',
        'Kit suntik glukagon dibawa penderita diabetes untuk mengatasi hipoglikemia berat saat mereka tidak bisa makan.',
      ],
    },
    questions: {
      en: [
        { q: 'A meal adds 60 g of glucose to a 15 L fluid pool. If none were removed, by how much would the concentration rise? (1 g glucose = 5.55 mmol.)', a: '60 g × 5.55 mmol/g = 333 mmol; 333 mmol / 15 L = 22 mmol/L. In reality the peak is only 1–3 mmol/L above fasting because insulin drives uptake and storage as fast as the glucose is absorbed.' },
        { q: 'In the simulation the glycogen bar falls from 100 g to about 25 g during a 16-hour fast while glucose stays near 5 mmol/L. What two processes keep glucose up, and which hormone drives them?', a: 'Glycogenolysis (breaking liver glycogen into glucose) and gluconeogenesis (making glucose from amino acids and lactate). Both are stimulated by glucagon from the α cells.' },
        { q: 'With type 1 diabetes switched on, a large meal sent glucose to about 13 mmol/L for three hours. Explain why, and what an injection at mealtime changes.', a: 'Without insulin, cells do not increase glucose uptake and the liver does not store glycogen, so absorbed glucose accumulates until slow insulin-independent uptake and urinary loss remove it. Injected insulin supplies the missing signal: uptake and storage switch on and the peak drops to about 6 mmol/L.' },
      ],
      id: [
        { q: 'Sebuah makanan menambahkan 60 g glukosa ke 15 L cairan tubuh. Jika tidak ada yang dibuang, berapa kenaikan konsentrasinya? (1 g glukosa = 5,55 mmol.)', a: '60 g × 5,55 mmol/g = 333 mmol; 333 mmol / 15 L = 22 mmol/L. Kenyataannya puncaknya hanya 1–3 mmol/L di atas kadar puasa karena insulin mendorong penyerapan dan penyimpanan secepat glukosa diserap.' },
        { q: 'Di simulasi batang glikogen turun dari 100 g ke sekitar 25 g selama puasa 16 jam sementara glukosa tetap sekitar 5 mmol/L. Dua proses apa yang menjaga glukosa, dan hormon mana yang mendorongnya?', a: 'Glikogenolisis (memecah glikogen hati menjadi glukosa) dan glukoneogenesis (membuat glukosa dari asam amino dan laktat). Keduanya dirangsang glukagon dari sel α.' },
        { q: 'Dengan diabetes tipe 1 menyala, makan porsi besar membuat glukosa sekitar 13 mmol/L selama tiga jam. Jelaskan mengapa, dan apa yang diubah suntikan saat makan.', a: 'Tanpa insulin, sel tidak meningkatkan penyerapan glukosa dan hati tidak menyimpan glikogen, sehingga glukosa yang diserap menumpuk sampai penyerapan lambat yang tak bergantung insulin dan pembuangan lewat urine mengeluarkannya. Insulin suntikan memasok sinyal yang hilang: penyerapan dan penyimpanan menyala dan puncaknya turun ke sekitar 6 mmol/L.' },
      ],
    },
  },
};
