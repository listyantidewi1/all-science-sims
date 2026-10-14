// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Convert grams ↔ moles using molar mass.',
      'Identify the limiting reagent: the one with smallest "moles ÷ coefficient".',
      'Compute theoretical yield in grams of product.',
    ],
    id: [
      'Mengonversi gram ↔ mol dengan massa molar.',
      'Mengidentifikasi pereaksi pembatas: yang "mol ÷ koefisien" terkecil.',
      'Menghitung hasil teoretis produk dalam gram.',
    ],
  },
  tryThis: {
    en: [
      'Equal stoichiometric amounts — both run out together, no leftover.',
      'One reactant in excess — the other limits the yield.',
      'Try the burning-magnesium reaction (2 Mg + O₂ → 2 MgO).',
    ],
    id: [
      'Jumlah stoikiometrik sama — kedua habis bersama, tanpa sisa.',
      'Salah satu pereaksi berlebih — yang lain membatasi hasil.',
      'Coba reaksi pembakaran magnesium (2 Mg + O₂ → 2 MgO).',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'A balanced chemical equation is a recipe that counts particles, not grams. CH₄ + 2 O₂ → CO₂ + 2 H₂O says that one molecule of methane reacts with two molecules of oxygen. Because molecules cannot be counted one by one, chemists count them in moles: one mole is 6.022 × 10²³ particles, and the molar mass M (in g/mol) tells you how many grams one mole of a substance weighs. Dividing a mass by the molar mass, n = m / M, converts a quantity you can weigh into a number of particles you can compare with the equation.',
        'When the amounts you have do not match the recipe, one reactant runs out first. If you have ten slices of bread and three slices of cheese, you can only make three sandwiches: the cheese limits. In chemistry the test is to divide the moles of each reactant by its coefficient in the equation; the reactant with the smallest result is the limiting reagent. Every other reactant is in excess, and some of it is still there when the reaction stops. The amount of product is fixed entirely by the limiting reagent.',
        'The simulation does exactly this calculation. Choose a reaction and set the mass of each reactant with the sliders. The sim converts each mass to moles, computes moles ÷ coefficient, and marks the smallest value in red as the limiting reagent. Product moles are that smallest ratio multiplied by each product\'s coefficient, and product grams are moles × molar mass; this is the theoretical yield. The bar on each reactant card shows what fraction is consumed and what fraction is left over.',
        'The sim assumes the reaction goes to completion and nothing is lost, which is why it reports a theoretical yield. Real reactions may stop at equilibrium (the Haber process does), lose product during separation, or follow side reactions, so the actual yield is lower; chemists report percent yield = actual ÷ theoretical × 100%. The sim also ignores impurities, reaction speed, temperature and pressure: it tells you only the maximum mass of product the atoms allow.',
      ],
      id: [
        'Persamaan reaksi yang setara adalah resep yang menghitung partikel, bukan gram. CH₄ + 2 O₂ → CO₂ + 2 H₂O berarti satu molekul metana bereaksi dengan dua molekul oksigen. Karena molekul tidak bisa dihitung satu per satu, kimiawan menghitungnya dalam mol: satu mol berisi 6,022 × 10²³ partikel, dan massa molar M (dalam g/mol) menyatakan berapa gram massa satu mol zat. Membagi massa dengan massa molar, n = m / M, mengubah jumlah yang bisa ditimbang menjadi jumlah partikel yang bisa dibandingkan dengan persamaan reaksi.',
        'Jika jumlah yang kamu miliki tidak sesuai resep, salah satu pereaksi akan habis lebih dulu. Dengan sepuluh lembar roti dan tiga lembar keju, kamu hanya bisa membuat tiga roti isi: kejunya yang membatasi. Dalam kimia, caranya adalah membagi mol tiap pereaksi dengan koefisiennya dalam persamaan; pereaksi dengan hasil bagi terkecil adalah pereaksi pembatas. Pereaksi lainnya berlebih, dan sebagian masih tersisa ketika reaksi berhenti. Jumlah produk sepenuhnya ditentukan oleh pereaksi pembatas.',
        'Simulasi ini melakukan perhitungan tersebut. Pilih reaksi, lalu atur massa tiap pereaksi dengan slider. Simulasi mengubah tiap massa menjadi mol, menghitung mol ÷ koefisien, dan menandai nilai terkecil dengan warna merah sebagai pereaksi pembatas. Mol produk adalah rasio terkecil itu dikalikan koefisien tiap produk, dan gram produk adalah mol × massa molar; inilah hasil teoretis. Batang pada tiap kartu pereaksi menunjukkan bagian yang terpakai dan bagian yang tersisa.',
        'Simulasi menganggap reaksi berlangsung tuntas tanpa kehilangan apa pun, sehingga yang dilaporkan adalah hasil teoretis. Reaksi nyata bisa berhenti pada kesetimbangan (seperti proses Haber), kehilangan produk saat pemisahan, atau mengalami reaksi samping, sehingga hasil nyatanya lebih rendah; kimiawan melaporkan persen hasil = hasil nyata ÷ hasil teoretis × 100%. Simulasi juga mengabaikan kemurnian zat, laju reaksi, suhu, dan tekanan: ia hanya memberi tahu massa produk maksimum yang dimungkinkan oleh atom-atom yang ada.',
      ],
    },
    figure: {
      caption: {
        en: 'Worked example for the default setting: 10 g CH₄ and 30 g O₂. Each mass is converted to moles, divided by its coefficient, and the smaller value (O₂) sets the yield. Mass is conserved: 10 + 30 = 20.6 + 16.9 + 2.5.',
        id: 'Contoh untuk pengaturan awal: 10 g CH₄ dan 30 g O₂. Tiap massa diubah ke mol, dibagi koefisiennya, dan nilai yang lebih kecil (O₂) menentukan hasil. Massa kekal: 10 + 30 = 20,6 + 16,9 + 2,5.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        const d = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Mole-ratio worked example', 'Contoh perhitungan rasio mol')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.b{font-weight:700}.s{font-size:9.5px;opacity:.75}.box{fill:none;stroke:currentColor;stroke-width:1;opacity:.5}.ar{stroke:currentColor;stroke-width:1.2;fill:none;opacity:.6}</style>
  <text x="180" y="16" text-anchor="middle" class="b">CH₄ + 2 O₂ → CO₂ + 2 H₂O</text>
  <rect x="10" y="30" width="105" height="60" rx="6" class="box"/>
  <text x="62" y="46" text-anchor="middle" class="b" fill="#3b82f6">CH₄  10 g</text>
  <text x="62" y="62" text-anchor="middle">÷ 16.04 g/mol</text>
  <text x="62" y="80" text-anchor="middle">= ${d('0.623 mol', '0,623 mol')}</text>
  <rect x="10" y="150" width="105" height="60" rx="6" class="box" stroke="#ef4444" style="opacity:1"/>
  <text x="62" y="166" text-anchor="middle" class="b" fill="#10b981">O₂  30 g</text>
  <text x="62" y="182" text-anchor="middle">÷ 32.00 g/mol</text>
  <text x="62" y="200" text-anchor="middle">= ${d('0.938 mol', '0,938 mol')}</text>
  <path d="M115 60 L140 60" class="ar" marker-end="url(#m)"/>
  <path d="M115 180 L140 180" class="ar" marker-end="url(#m)"/>
  <text x="150" y="52" class="s">${L('÷ coefficient 1', '÷ koefisien 1')}</text>
  <text x="150" y="66" class="b">${d('0.623', '0,623')}</text>
  <text x="150" y="172" class="s">${L('÷ coefficient 2', '÷ koefisien 2')}</text>
  <text x="150" y="186" class="b" fill="#ef4444">${d('0.469', '0,469')}  ←</text>
  <text x="150" y="200" class="s" fill="#ef4444">${L('smallest: limiting', 'terkecil: pembatas')}</text>
  <text x="150" y="80" class="s" fill="#10b981">${L('leftover 0.155 mol = 2.5 g', 'sisa 0,155 mol = 2,5 g')}</text>
  <path d="M215 180 L240 180 L240 120 L255 120" class="ar" marker-end="url(#m)"/>
  <rect x="258" y="92" width="94" height="56" rx="6" class="box" stroke="#f59e0b" style="opacity:1"/>
  <text x="305" y="108" text-anchor="middle" class="b" fill="#f59e0b">CO₂</text>
  <text x="305" y="122" text-anchor="middle" class="s">1 × ${d('0.469', '0,469')} mol</text>
  <text x="305" y="138" text-anchor="middle">× 44.01 = ${d('20.6 g', '20,6 g')}</text>
  <rect x="258" y="158" width="94" height="56" rx="6" class="box" stroke="#8b5cf6" style="opacity:1"/>
  <text x="305" y="174" text-anchor="middle" class="b" fill="#8b5cf6">H₂O</text>
  <text x="305" y="188" text-anchor="middle" class="s">2 × ${d('0.469', '0,469')} mol</text>
  <text x="305" y="204" text-anchor="middle">× 18.02 = ${d('16.9 g', '16,9 g')}</text>
  <path d="M240 150 L240 186 L255 186" class="ar" marker-end="url(#m)"/>
  <text x="180" y="232" text-anchor="middle" class="s">${L('grams → moles → ÷ coefficient → smallest wins → × coefficient → × M → grams', 'gram → mol → ÷ koefisien → terkecil menang → × koefisien → × M → gram')}</text>
  <defs><marker id="m" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="context-stroke"/></marker></defs>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Coefficients in a balanced equation are ratios of moles (particles), never ratios of grams.',
        'Moles = mass ÷ molar mass; this conversion is the bridge between the balance and the equation.',
        'The limiting reagent is the one with the smallest value of moles ÷ coefficient, not the smallest mass or fewest moles.',
        'Theoretical yield is calculated from the limiting reagent alone; the excess reactant is partly left over.',
        'Mass is conserved: reactants consumed plus leftover excess equals reactants added, and consumed mass equals product mass.',
      ],
      id: [
        'Koefisien dalam persamaan setara adalah perbandingan mol (partikel), bukan perbandingan gram.',
        'Mol = massa ÷ massa molar; konversi ini adalah jembatan antara timbangan dan persamaan reaksi.',
        'Pereaksi pembatas adalah yang nilai mol ÷ koefisiennya terkecil, bukan yang massanya terkecil atau molnya paling sedikit.',
        'Hasil teoretis dihitung hanya dari pereaksi pembatas; pereaksi berlebih sebagian tersisa.',
        'Massa kekal: pereaksi yang terpakai ditambah sisa berlebih sama dengan pereaksi yang dimasukkan, dan massa yang terpakai sama dengan massa produk.',
      ],
    },
    vocabulary: {
      en: [
        ['Mole (mol)', 'The chemist\'s counting unit: 6.022 × 10²³ particles.'],
        ['Molar mass (M)', 'Mass of one mole of a substance, in g/mol; the sum of the atomic masses in the formula.'],
        ['Stoichiometric coefficient', 'The number in front of a formula in a balanced equation; it gives the mole ratio.'],
        ['Limiting reagent', 'The reactant that is used up first and therefore decides how much product can form.'],
        ['Excess reactant', 'A reactant that is present in more than the required amount; some remains after the reaction.'],
        ['Theoretical yield', 'The maximum mass of product predicted from the limiting reagent, assuming complete reaction.'],
        ['Percent yield', 'Actual yield ÷ theoretical yield × 100%; a measure of how efficient a real reaction was.'],
      ],
      id: [
        ['Mol', 'Satuan hitung kimiawan: 6,022 × 10²³ partikel.'],
        ['Massa molar (M)', 'Massa satu mol zat, dalam g/mol; jumlah massa atom dalam rumus kimianya.'],
        ['Koefisien stoikiometri', 'Angka di depan rumus dalam persamaan setara; menyatakan perbandingan mol.'],
        ['Pereaksi pembatas', 'Pereaksi yang habis lebih dulu sehingga menentukan banyaknya produk yang dapat terbentuk.'],
        ['Pereaksi berlebih', 'Pereaksi yang jumlahnya melebihi kebutuhan; sebagian tersisa setelah reaksi.'],
        ['Hasil teoretis', 'Massa produk maksimum yang diprediksi dari pereaksi pembatas, dengan anggapan reaksi tuntas.'],
        ['Persen hasil', 'Hasil nyata ÷ hasil teoretis × 100%; ukuran efisiensi reaksi yang sesungguhnya.'],
      ],
    },
    misconceptions: {
      en: [
        ['The reactant with the smaller mass is the limiting reagent.', 'Mass alone says nothing. In the default setting 30 g of O₂ is three times the mass of 10 g of CH₄, yet O₂ is limiting, because each CH₄ needs two O₂ and O₂ molecules are twice as heavy.'],
        ['The reactant with fewer moles is the limiting reagent.', 'You must divide by the coefficient first. In N₂ + 3 H₂ → 2 NH₃, 1 mol N₂ with 2 mol H₂ has more moles of H₂, but 2 ÷ 3 is smaller than 1 ÷ 1, so H₂ limits.'],
        ['The mass of product equals the total mass of reactants you put in.', 'Mass is conserved, but part of the excess reactant is left over unreacted. Product mass equals the mass of reactants actually consumed.'],
        ['Coefficients tell you how many grams to mix.', 'They give mole ratios. 2 Mg + O₂ needs 2 mol Mg (48.6 g) for 1 mol O₂ (32.0 g), nothing like a 2:1 ratio by mass.'],
      ],
      id: [
        ['Pereaksi dengan massa lebih kecil adalah pereaksi pembatas.', 'Massa saja tidak menentukan. Pada pengaturan awal, 30 g O₂ tiga kali massa 10 g CH₄, tetapi O₂ justru pembatas, karena tiap CH₄ membutuhkan dua O₂ dan molekul O₂ dua kali lebih berat.'],
        ['Pereaksi dengan mol lebih sedikit adalah pereaksi pembatas.', 'Harus dibagi koefisien dulu. Pada N₂ + 3 H₂ → 2 NH₃, 1 mol N₂ dengan 2 mol H₂ memiliki mol H₂ lebih banyak, tetapi 2 ÷ 3 lebih kecil daripada 1 ÷ 1, sehingga H₂ yang membatasi.'],
        ['Massa produk sama dengan total massa pereaksi yang dimasukkan.', 'Massa memang kekal, tetapi sebagian pereaksi berlebih tersisa tanpa bereaksi. Massa produk sama dengan massa pereaksi yang benar-benar terpakai.'],
        ['Koefisien menyatakan berapa gram yang harus dicampur.', 'Koefisien menyatakan perbandingan mol. 2 Mg + O₂ membutuhkan 2 mol Mg (48,6 g) untuk 1 mol O₂ (32,0 g), sama sekali bukan perbandingan massa 2:1.'],
      ],
    },
    realWorld: {
      en: [
        'A petrol engine is tuned to the stoichiometric air-fuel ratio of about 14.7 kg of air per kilogram of fuel; too little air leaves unburnt fuel, too much wastes power.',
        'In the Haber process, nitrogen and hydrogen are fed in the 1:3 mole ratio so that neither is wasted, and unreacted gas is recycled because the reaction does not go to completion.',
        'Pharmaceutical chemists deliberately make the cheap reagent the excess one, so that the expensive reagent is the limiting one and none of it is wasted.',
        'Car airbags inflate from a measured mass of sodium azide; stoichiometry fixes exactly how many litres of nitrogen gas it produces.',
      ],
      id: [
        'Mesin bensin disetel pada perbandingan udara-bahan bakar stoikiometrik sekitar 14,7 kg udara per kilogram bahan bakar; udara terlalu sedikit menyisakan bahan bakar tak terbakar, terlalu banyak membuang tenaga.',
        'Pada proses Haber, nitrogen dan hidrogen dimasukkan dengan perbandingan mol 1:3 agar tidak ada yang terbuang, dan gas yang belum bereaksi didaur ulang karena reaksinya tidak berlangsung tuntas.',
        'Kimiawan farmasi sengaja menjadikan pereaksi yang murah sebagai pereaksi berlebih, sehingga pereaksi yang mahal menjadi pembatas dan tidak ada yang terbuang.',
        'Kantung udara mobil mengembang dari massa natrium azida yang terukur; stoikiometri menentukan tepat berapa liter gas nitrogen yang dihasilkan.',
      ],
    },
    questions: {
      en: [
        { q: 'You set CH₄ = 10.0 g and O₂ = 10.0 g. Which reactant is limiting, and how many grams of CO₂ form?', a: 'CH₄: 10 ÷ 16.04 = 0.623 mol, ÷ 1 = 0.623. O₂: 10 ÷ 32.00 = 0.3125 mol, ÷ 2 = 0.156. O₂ is limiting. CO₂ moles = 1 × 0.156 = 0.156 mol, mass = 0.156 × 44.01 ≈ 6.9 g.' },
        { q: 'In the magnesium reaction you burn 24.3 g Mg (1.00 mol) in 32.0 g O₂ (1.00 mol). Which is limiting, how much MgO forms, and what is left over?', a: 'Mg: 1.00 ÷ 2 = 0.50; O₂: 1.00 ÷ 1 = 1.00, so Mg is limiting even though the moles are equal. MgO = 2 × 0.50 = 1.00 mol = 40.3 g. Only 0.50 mol O₂ (16.0 g) is consumed, so 16.0 g O₂ is left over. Check: 24.3 + 16.0 = 40.3 g.' },
        { q: 'Keep CH₄ at 10 g and slide O₂ from 10 g up to 60 g. Why does the CO₂ yield stop rising at a certain point, and where is that point?', a: 'While O₂ is limiting, more O₂ means more product. Once there is enough O₂ for all the CH₄, CH₄ becomes limiting and extra O₂ only adds to the leftover. That happens at 0.623 mol CH₄ × 2 × 32.00 g/mol ≈ 39.9 g of O₂, where the yield levels off at 0.623 × 44.01 ≈ 27.4 g CO₂.' },
      ],
      id: [
        { q: 'Kamu mengatur CH₄ = 10,0 g dan O₂ = 10,0 g. Pereaksi mana yang membatasi, dan berapa gram CO₂ yang terbentuk?', a: 'CH₄: 10 ÷ 16,04 = 0,623 mol, ÷ 1 = 0,623. O₂: 10 ÷ 32,00 = 0,3125 mol, ÷ 2 = 0,156. O₂ adalah pembatas. Mol CO₂ = 1 × 0,156 = 0,156 mol, massanya 0,156 × 44,01 ≈ 6,9 g.' },
        { q: 'Pada reaksi magnesium kamu membakar 24,3 g Mg (1,00 mol) dalam 32,0 g O₂ (1,00 mol). Mana yang membatasi, berapa MgO yang terbentuk, dan apa yang tersisa?', a: 'Mg: 1,00 ÷ 2 = 0,50; O₂: 1,00 ÷ 1 = 1,00, jadi Mg yang membatasi walaupun molnya sama. MgO = 2 × 0,50 = 1,00 mol = 40,3 g. Hanya 0,50 mol O₂ (16,0 g) yang terpakai, sehingga 16,0 g O₂ tersisa. Cek: 24,3 + 16,0 = 40,3 g.' },
        { q: 'Pertahankan CH₄ pada 10 g dan geser O₂ dari 10 g sampai 60 g. Mengapa hasil CO₂ berhenti naik pada titik tertentu, dan di mana titik itu?', a: 'Selama O₂ menjadi pembatas, lebih banyak O₂ berarti lebih banyak produk. Setelah O₂ cukup untuk semua CH₄, CH₄ menjadi pembatas dan O₂ tambahan hanya menambah sisa. Itu terjadi pada 0,623 mol CH₄ × 2 × 32,00 g/mol ≈ 39,9 g O₂, ketika hasil mendatar di 0,623 × 44,01 ≈ 27,4 g CO₂.' },
      ],
    },
  },
};
