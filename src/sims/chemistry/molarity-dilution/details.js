export default {
  objectives: {
    en: [
      'Calculate molarity from mass, molar mass and volume using n = m/Mr and M = n/V.',
      'Predict how the molarity changes when the same mass is dissolved in a different volume.',
      'Use M₁V₁ = M₂V₂ to plan a dilution and explain why the number of moles stays the same.',
    ],
    id: [
      'Menghitung molaritas dari massa, massa molar, dan volume dengan n = m/Mr dan M = n/V.',
      'Memprediksi perubahan molaritas jika massa yang sama dilarutkan dalam volume yang berbeda.',
      'Menggunakan M₁V₁ = M₂V₂ untuk merancang pengenceran dan menjelaskan mengapa jumlah mol tidak berubah.',
    ],
  },
  tryThis: {
    en: [
      'Set 5.85 g of NaCl in 1000 mL. What is M? Now keep the mass and pick the 250 mL flask — M should be exactly 4× bigger.',
      'Switch to CuSO₄ and raise the mass slowly. At what molarity does the blue become hard to see through?',
      'Make a 1.00 mol/L CuSO₄ stock (how many grams in 500 mL?). Pipette 25 mL into 250 mL and compare the colour of the two flasks.',
      'Keep piling on NaCl until the "Saturated" warning appears. Why does M stop rising?',
    ],
    id: [
      'Atur 5,85 g NaCl dalam 1000 mL. Berapa M? Pertahankan massa dan pilih labu 250 mL — M seharusnya tepat 4× lebih besar.',
      'Ganti ke CuSO₄ dan naikkan massa perlahan. Pada molaritas berapa warna biru mulai sulit ditembus pandang?',
      'Buat larutan induk CuSO₄ 1,00 mol/L (berapa gram dalam 500 mL?). Pipet 25 mL ke labu 250 mL dan bandingkan warna kedua labu.',
      'Terus tambah NaCl sampai peringatan "Jenuh" muncul. Mengapa M berhenti naik?',
    ],
  },

  learn: {
    background: {
      en: [
        'Chemists need a way to say how much substance is in a given amount of solution, because reactions happen between particles, not between grams or millilitres. Molarity (symbol M, unit mol/L or mol dm⁻³) is the number of moles of solute dissolved in one litre of solution: M = n/V. The moles come from the mass you weigh out and the molar mass from the periodic table, n = m/Mr. For example 5.85 g of NaCl (Mr = 58.44 g/mol) is 0.100 mol; dissolved and made up to 1.000 L it gives a 0.100 mol/L solution.',
        'A volumetric flask is the tool for this. It has a single calibration mark on its narrow neck, so filling exactly to the mark gives a known total volume (100, 250, 500 or 1000 mL in this simulation) with a precision of about 0.1%. Notice that V is the volume of the whole solution, not the volume of water you add: the solute itself takes up a little space, which is why you dissolve first and then top up to the mark.',
        'Diluting means adding solvent to a measured portion of a stock solution. A pipette removes V₁ of stock containing n = M₁V₁ moles of solute; those moles are then spread through a larger volume V₂, so the new molarity is M₂ = M₁V₁/V₂. The product MV is simply the number of moles, so the rule is often written as M₁V₁ = M₂V₂. The simulation tracks the molarity continuously as water is added, and you can see the colour of a copper(II) sulfate solution fade exactly as the formula predicts.',
        'Colour intensity is a real, measurable sign of concentration: the Beer–Lambert law says absorbance is proportional to molarity, which is how a colorimeter measures unknown concentrations. For colourless solutes such as NaCl or glucose the simulation shows the dissolved particles as dots whose density is proportional to M. There is also an upper limit: at 20 °C only about 360 g of NaCl or 200 g of CuSO₄ dissolve per litre of water, and beyond that the solution is saturated and extra solid simply sits on the bottom.',
      ],
      id: [
        'Kimiawan perlu cara menyatakan berapa banyak zat dalam sejumlah larutan, karena reaksi terjadi antarpartikel, bukan antargram atau antarmililiter. Molaritas (lambang M, satuan mol/L atau mol dm⁻³) adalah jumlah mol zat terlarut dalam satu liter larutan: M = n/V. Jumlah mol diperoleh dari massa yang ditimbang dan massa molar dari tabel periodik, n = m/Mr. Contoh: 5,85 g NaCl (Mr = 58,44 g/mol) adalah 0,100 mol; jika dilarutkan dan ditepatkan sampai 1,000 L, diperoleh larutan 0,100 mol/L.',
        'Labu ukur adalah alat untuk itu. Labu ini memiliki satu tanda batas pada lehernya yang sempit, sehingga mengisi tepat sampai tanda memberikan volume total yang pasti (100, 250, 500, atau 1000 mL dalam simulasi ini) dengan ketelitian sekitar 0,1%. Perhatikan bahwa V adalah volume seluruh larutan, bukan volume air yang ditambahkan: zat terlarut juga menempati ruang, karena itu zat dilarutkan dulu baru ditepatkan sampai tanda batas.',
        'Mengencerkan berarti menambahkan pelarut ke sebagian larutan induk yang telah diukur. Pipet mengambil V₁ larutan induk yang mengandung n = M₁V₁ mol zat terlarut; mol itu lalu tersebar dalam volume yang lebih besar V₂, sehingga molaritas baru adalah M₂ = M₁V₁/V₂. Hasil kali MV adalah jumlah mol, sehingga aturan ini sering ditulis M₁V₁ = M₂V₂. Simulasi menghitung molaritas terus-menerus saat air ditambahkan, dan kamu dapat melihat warna larutan tembaga(II) sulfat memudar tepat seperti prediksi rumus.',
        'Kepekatan warna adalah tanda konsentrasi yang nyata dan terukur: hukum Beer–Lambert menyatakan absorbansi sebanding dengan molaritas, dan itulah cara kolorimeter mengukur konsentrasi yang belum diketahui. Untuk zat terlarut tak berwarna seperti NaCl atau glukosa, simulasi menampilkan partikel terlarut sebagai titik dengan kerapatan yang sebanding dengan M. Ada juga batas atas: pada 20 °C hanya sekitar 360 g NaCl atau 200 g CuSO₄ yang larut per liter air; lebih dari itu larutan jenuh dan padatan sisa mengendap di dasar.',
      ],
    },
    figure: {
      caption: {
        en: 'Dilution: the pipette takes M₁V₁ moles out of the stock; filling the second flask to V₂ spreads the same moles through more solvent, so M₂ = M₁V₁/V₂.',
        id: 'Pengenceran: pipet mengambil M₁V₁ mol dari larutan induk; mengisi labu kedua sampai V₂ menyebarkan mol yang sama dalam pelarut yang lebih banyak, sehingga M₂ = M₁V₁/V₂.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        const flask = (cx, s, fill, dots) => {
          const a = s * 0.21;
          const bc = 200 - s * 0.88;
          const dy = Math.sqrt(s * s - a * a).toFixed(1);
          const neckTop = (bc - Number(dy) - s * 1.3).toFixed(1);
          const path = `M${cx - a} ${neckTop} L${cx - a} ${(bc - Number(dy)).toFixed(1)} A${s} ${s} 0 1 0 ${(cx - s * 0.475).toFixed(1)} ${(bc + s * 0.88).toFixed(1)} L${(cx + s * 0.475).toFixed(1)} ${(bc + s * 0.88).toFixed(1)} A${s} ${s} 0 1 0 ${cx + a} ${(bc - Number(dy)).toFixed(1)} L${cx + a} ${neckTop} Z`;
          const markY = (Number(neckTop) + s * 0.45).toFixed(1);
          return `<clipPath id="c${cx}"><path d="${path}"/></clipPath>
  <rect x="${cx - s}" y="${markY}" width="${2 * s}" height="${200 - Number(markY)}" fill="#3b82f6" opacity="${fill}" clip-path="url(#c${cx})"/>
  ${dots}
  <path d="${path}" fill="none" stroke="currentColor" stroke-width="1.6"/>
  <line x1="${cx - a - 5}" y1="${markY}" x2="${cx + a + 5}" y2="${markY}" stroke="currentColor" stroke-width="1.4"/>`;
        };
        const dotsA = [[62, 160], [78, 175], [95, 162], [70, 188], [88, 150], [104, 182], [80, 140], [60, 176], [98, 148], [72, 160]]
          .map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2.6" fill="currentColor"/>`).join('');
        const dotsB = [[268, 180], [300, 165], [285, 192]]
          .map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2.6" fill="currentColor"/>`).join('');
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Dilution of a stock solution', 'Pengenceran larutan induk')}">
  <style>text{font:12px system-ui,sans-serif;fill:currentColor}.s{font-size:10.5px;opacity:.8}</style>
  ${flask(82, 42, 0.75, dotsA)}
  ${flask(284, 52, 0.25, dotsB)}
  <rect x="176" y="40" width="8" height="120" fill="none" stroke="currentColor" stroke-width="1.4"/>
  <rect x="177" y="100" width="6" height="59" fill="#3b82f6" opacity=".75"/>
  <circle cx="180" cy="32" r="9" fill="currentColor" opacity=".6"/>
  <path d="M120 100 L168 100" stroke="currentColor" stroke-width="1.4" marker-end="url(#ar)"/>
  <path d="M192 100 L228 100" stroke="currentColor" stroke-width="1.4" marker-end="url(#ar)"/>
  <text x="82" y="222" text-anchor="middle">M₁, V₁</text>
  <text x="284" y="222" text-anchor="middle">M₂ = M₁V₁ / V₂</text>
  <text x="180" y="180" text-anchor="middle" class="s">n = M₁V₁</text>
  <text x="180" y="18" text-anchor="middle">${L('moles do not change', 'jumlah mol tidak berubah')}</text>
  <text x="284" y="60" text-anchor="middle" class="s">+ ${L('water to the mark', 'air sampai tanda batas')}</text>
  <defs><marker id="ar" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="currentColor"/></marker></defs>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Molarity is moles of solute per litre of solution: M = n/V, with V in litres.',
        'Moles come from mass: n = m/Mr. Doubling the mass doubles M; doubling the volume halves it.',
        'The volume in M = n/V is the final volume of the whole solution, read at the mark of a volumetric flask.',
        'Dilution adds solvent, not solute, so the moles are conserved: M₁V₁ = M₂V₂.',
        'Colour intensity and particle density both scale with molarity; a solution cannot be made more concentrated than its solubility limit.',
      ],
      id: [
        'Molaritas adalah mol zat terlarut per liter larutan: M = n/V, dengan V dalam liter.',
        'Jumlah mol berasal dari massa: n = m/Mr. Menggandakan massa menggandakan M; menggandakan volume membagi dua M.',
        'Volume dalam M = n/V adalah volume akhir seluruh larutan, dibaca pada tanda batas labu ukur.',
        'Pengenceran menambah pelarut, bukan zat terlarut, sehingga jumlah mol kekal: M₁V₁ = M₂V₂.',
        'Kepekatan warna dan kerapatan partikel keduanya sebanding dengan molaritas; larutan tidak dapat dibuat lebih pekat daripada batas kelarutannya.',
      ],
    },
    vocabulary: {
      en: [
        ['Molarity (M)', 'Moles of solute per litre of solution, mol/L (also written mol dm⁻³ or simply M).'],
        ['Molar mass (Mr)', 'Mass of one mole of a substance in g/mol, found by adding atomic masses from the periodic table.'],
        ['Volumetric flask', 'A flask with one calibration mark on its neck, used to prepare a precisely known volume of solution.'],
        ['Stock solution', 'A concentrated solution of known molarity from which more dilute solutions are made.'],
        ['Dilution', 'Adding solvent to a solution so the same moles of solute occupy a larger volume, lowering the molarity.'],
        ['Saturated solution', 'A solution holding the maximum mass of solute that can dissolve at that temperature; extra solid stays undissolved.'],
      ],
      id: [
        ['Molaritas (M)', 'Jumlah mol zat terlarut per liter larutan, mol/L (juga ditulis mol dm⁻³ atau cukup M).'],
        ['Massa molar (Mr)', 'Massa satu mol zat dalam g/mol, diperoleh dengan menjumlahkan massa atom dari tabel periodik.'],
        ['Labu ukur', 'Labu dengan satu tanda batas pada lehernya, dipakai untuk membuat larutan dengan volume yang diketahui secara tepat.'],
        ['Larutan induk', 'Larutan pekat dengan molaritas yang diketahui, sumber untuk membuat larutan yang lebih encer.'],
        ['Pengenceran', 'Penambahan pelarut sehingga mol zat terlarut yang sama menempati volume lebih besar dan molaritasnya turun.'],
        ['Larutan jenuh', 'Larutan yang mengandung massa zat terlarut maksimum yang dapat larut pada suhu itu; padatan lebih tetap tak larut.'],
      ],
    },
    misconceptions: {
      en: [
        ['Adding 1 L of water to a 1 mol/L solution always gives 0.5 mol/L.', 'Only if you started with exactly 1 L. The new molarity is M₁V₁ divided by the new total volume, so 250 mL of 1 mol/L plus 1 L of water gives 0.2 mol/L, not 0.5.'],
        ['Diluting a solution removes some of the solute.', 'Dilution only adds solvent. Every mole of solute is still there; it is just spread through more liquid, so the concentration falls.'],
        ['The volume in M = n/V is the volume of water you poured in.', 'It is the final volume of the solution. The solute occupies space too, so you dissolve first and then fill to the mark; otherwise the solution would be slightly too dilute.'],
        ['Equal masses of different solutes give equal molarities.', 'Moles depend on molar mass. 10 g of NaCl is 0.171 mol but 10 g of glucose is only 0.056 mol, so the NaCl solution is three times as concentrated.'],
      ],
      id: [
        ['Menambahkan 1 L air ke larutan 1 mol/L selalu menghasilkan 0,5 mol/L.', 'Hanya jika volume awalnya tepat 1 L. Molaritas baru adalah M₁V₁ dibagi volume total baru, sehingga 250 mL larutan 1 mol/L ditambah 1 L air menghasilkan 0,2 mol/L, bukan 0,5.'],
        ['Mengencerkan larutan membuang sebagian zat terlarut.', 'Pengenceran hanya menambah pelarut. Setiap mol zat terlarut masih ada; hanya tersebar dalam cairan yang lebih banyak sehingga konsentrasinya turun.'],
        ['Volume dalam M = n/V adalah volume air yang dituangkan.', 'Itu adalah volume akhir larutan. Zat terlarut juga menempati ruang, karena itu dilarutkan dulu lalu ditepatkan sampai tanda batas; jika tidak, larutannya sedikit terlalu encer.'],
        ['Massa yang sama dari zat terlarut yang berbeda memberi molaritas yang sama.', 'Jumlah mol bergantung pada massa molar. 10 g NaCl adalah 0,171 mol, tetapi 10 g glukosa hanya 0,056 mol, sehingga larutan NaCl tiga kali lebih pekat.'],
      ],
    },
    realWorld: {
      en: [
        'Hospital saline is 0.9% NaCl, about 0.154 mol/L, chosen to match the concentration of dissolved particles in blood.',
        'Glucose drips are often 5% (about 0.28 mol/L); pharmacists prepare them by dilution from concentrated stock using M₁V₁ = M₂V₂.',
        'Swimming-pool and aquarium test kits compare the colour of a treated water sample against a chart: deeper colour means higher concentration.',
        'Concentrated laboratory acids (hydrochloric acid is about 12 mol/L) are always diluted by adding acid to water, never the reverse, to control the heat released.',
        'Copper(II) sulfate solutions of controlled molarity are sprayed on vines and in fish ponds; too concentrated and they are toxic to the plants or fish they are meant to protect.',
      ],
      id: [
        'Cairan infus garam fisiologis adalah NaCl 0,9%, sekitar 0,154 mol/L, dipilih agar sesuai dengan konsentrasi partikel terlarut dalam darah.',
        'Infus glukosa biasanya 5% (sekitar 0,28 mol/L); apoteker membuatnya dengan mengencerkan larutan induk pekat memakai M₁V₁ = M₂V₂.',
        'Alat uji air kolam renang dan akuarium membandingkan warna sampel air yang diberi reagen dengan bagan warna: warna lebih pekat berarti konsentrasi lebih tinggi.',
        'Asam pekat laboratorium (asam klorida sekitar 12 mol/L) selalu diencerkan dengan menambahkan asam ke air, bukan sebaliknya, untuk mengendalikan panas yang dilepaskan.',
        'Larutan tembaga(II) sulfat dengan molaritas terkontrol disemprotkan pada tanaman anggur dan kolam ikan; jika terlalu pekat justru meracuni tanaman atau ikan yang ingin dilindungi.',
      ],
    },
    questions: {
      en: [
        { q: 'What mass of CuSO₄ (Mr = 159.61 g/mol) is needed to make 500 mL of a 0.200 mol/L solution?', a: 'n = M × V = 0.200 × 0.500 = 0.100 mol; m = n × Mr = 0.100 × 159.61 = 15.96 g.' },
        { q: 'You pipette 20 mL of 2.0 mol/L NaCl into a 250 mL volumetric flask and fill to the mark. What is M₂, and how many moles are in the flask?', a: 'M₂ = M₁V₁/V₂ = 2.0 × 20/250 = 0.16 mol/L. Moles = 2.0 × 0.020 = 0.040 mol, the same before and after dilution.' },
        { q: 'Two flasks hold 0.10 mol/L CuSO₄; one is 100 mL and one is 1000 mL. Which is a deeper blue?', a: 'Neither: they have the same molarity, so the same colour intensity per centimetre of liquid. The larger flask simply contains ten times as many moles.' },
        { q: 'Why does the simulation stop increasing M once the mass of NaCl exceeds 360 g per litre?', a: 'The solution is saturated. Water at 20 °C can dissolve only about 360 g of NaCl per litre; extra salt stays as solid and does not add to the concentration of dissolved ions.' },
      ],
      id: [
        { q: 'Berapa massa CuSO₄ (Mr = 159,61 g/mol) yang diperlukan untuk membuat 500 mL larutan 0,200 mol/L?', a: 'n = M × V = 0,200 × 0,500 = 0,100 mol; m = n × Mr = 0,100 × 159,61 = 15,96 g.' },
        { q: 'Kamu memipet 20 mL NaCl 2,0 mol/L ke labu ukur 250 mL dan mengisinya sampai tanda batas. Berapa M₂, dan berapa mol dalam labu?', a: 'M₂ = M₁V₁/V₂ = 2,0 × 20/250 = 0,16 mol/L. Jumlah mol = 2,0 × 0,020 = 0,040 mol, sama sebelum dan sesudah pengenceran.' },
        { q: 'Dua labu berisi CuSO₄ 0,10 mol/L; satu 100 mL dan satu 1000 mL. Mana yang birunya lebih pekat?', a: 'Tidak ada yang lebih pekat: molaritasnya sama, sehingga kepekatan warna per sentimeter cairan juga sama. Labu yang lebih besar hanya mengandung sepuluh kali lebih banyak mol.' },
        { q: 'Mengapa simulasi berhenti menaikkan M setelah massa NaCl melebihi 360 g per liter?', a: 'Larutannya jenuh. Air pada 20 °C hanya dapat melarutkan sekitar 360 g NaCl per liter; garam tambahan tetap padat dan tidak menambah konsentrasi ion terlarut.' },
      ],
    },
  },
};
