export default {
  objectives: {
    en: [
      'Identify the limiting reagent by comparing moles ÷ coefficient for each reactant.',
      'Calculate the moles and mass of product from the limiting reagent and the balanced equation.',
      'Distinguish theoretical yield, actual yield and percent yield.',
    ],
    id: [
      'Menentukan pereaksi pembatas dengan membandingkan mol ÷ koefisien tiap pereaksi.',
      'Menghitung mol dan massa produk dari pereaksi pembatas dan persamaan reaksi setara.',
      'Membedakan hasil teoretis, hasil nyata, dan persen hasil.',
    ],
  },
  tryThis: {
    en: [
      'Start with 3.0 mol H₂ and 1.0 mol O₂. Which bar is shorter? Press React and count the leftover particles.',
      'Find the exact mole ratio for each reaction so that nothing is left over (the bars become equal).',
      'In N₂ + 3H₂ → 2NH₃ keep N₂ fixed and sweep H₂ from 0 to 6 mol. Where does the product stop increasing?',
      'Set the yield slider to 70% and work out how many grams of product were "lost".',
    ],
    id: [
      'Mulai dengan 3,0 mol H₂ dan 1,0 mol O₂. Batang mana yang lebih pendek? Tekan Reaksikan dan hitung partikel yang tersisa.',
      'Temukan perbandingan mol yang tepat untuk tiap reaksi sehingga tidak ada yang tersisa (batang menjadi sama).',
      'Pada N₂ + 3H₂ → 2NH₃, pertahankan N₂ dan geser H₂ dari 0 sampai 6 mol. Di mana produk berhenti bertambah?',
      'Atur slider hasil ke 70% dan hitung berapa gram produk yang "hilang".',
    ],
  },

  learn: {
    background: {
      en: [
        'A balanced equation is a recipe. 2H₂ + O₂ → 2H₂O says that two moles of hydrogen react with exactly one mole of oxygen to give two moles of water. In a real flask the reactants are rarely mixed in that perfect ratio, so one of them is used up first and the reaction stops. That reactant is the limiting reagent; the other is in excess and some of it is left over, unreacted, at the end.',
        'To find the limiting reagent, divide the moles of each reactant by its coefficient in the balanced equation. The smallest quotient belongs to the limiting reagent, and that quotient is the number of "moles of reaction" that can occur. With 3.0 mol H₂ and 1.0 mol O₂: 3.0/2 = 1.5 for hydrogen but 1.0/1 = 1.0 for oxygen, so oxygen limits. One mole of reaction forms 2 × 1.0 = 2.0 mol H₂O and consumes 2 × 1.0 = 2.0 mol H₂, leaving 1.0 mol H₂ in excess.',
        'The theoretical yield is the mass of product predicted this way: moles of product × molar mass. For the example, 2.0 mol × 18.015 g/mol = 36.0 g of water. In the laboratory the actual yield is almost always smaller, because of side reactions, incomplete reaction, and product lost during filtering or transfer. The percent yield = actual ÷ theoretical × 100% describes how efficient the process was; the slider in the simulation lets you see how a 70% yield changes the grams collected without changing the stoichiometry.',
        'The simulation draws one particle for every 0.1 mol. When you press React, reactant particles disappear in the ratio of the coefficients and product particles appear in the right-hand box together with the excess. The two bars underneath show moles ÷ coefficient for each reactant; the shorter bar is always the limiting reagent, and when the bars are equal the mixture is stoichiometric and nothing is left over.',
      ],
      id: [
        'Persamaan reaksi setara adalah sebuah resep. 2H₂ + O₂ → 2H₂O menyatakan bahwa dua mol hidrogen bereaksi dengan tepat satu mol oksigen menghasilkan dua mol air. Dalam labu nyata, pereaksi jarang dicampur dalam perbandingan sempurna itu, sehingga salah satunya habis lebih dulu dan reaksi berhenti. Pereaksi itulah pereaksi pembatas; pereaksi lainnya berlebih dan sebagian tersisa, tidak bereaksi, pada akhir reaksi.',
        'Untuk menentukan pereaksi pembatas, bagilah mol tiap pereaksi dengan koefisiennya dalam persamaan setara. Hasil bagi terkecil milik pereaksi pembatas, dan hasil bagi itu adalah jumlah "mol reaksi" yang dapat berlangsung. Dengan 3,0 mol H₂ dan 1,0 mol O₂: 3,0/2 = 1,5 untuk hidrogen tetapi 1,0/1 = 1,0 untuk oksigen, sehingga oksigen menjadi pembatas. Satu mol reaksi membentuk 2 × 1,0 = 2,0 mol H₂O dan menghabiskan 2 × 1,0 = 2,0 mol H₂, menyisakan 1,0 mol H₂ berlebih.',
        'Hasil teoretis adalah massa produk yang diprediksi dengan cara ini: mol produk × massa molar. Untuk contoh di atas, 2,0 mol × 18,015 g/mol = 36,0 g air. Di laboratorium hasil nyata hampir selalu lebih kecil, karena reaksi samping, reaksi tidak tuntas, dan produk yang hilang saat penyaringan atau pemindahan. Persen hasil = nyata ÷ teoretis × 100% menggambarkan efisiensi proses; slider pada simulasi memperlihatkan bagaimana hasil 70% mengubah gram yang terkumpul tanpa mengubah stoikiometrinya.',
        'Simulasi menggambar satu partikel untuk setiap 0,1 mol. Saat kamu menekan Reaksikan, partikel pereaksi hilang sesuai perbandingan koefisien dan partikel produk muncul di kotak kanan bersama sisa pereaksi. Dua batang di bawahnya menunjukkan mol ÷ koefisien tiap pereaksi; batang yang lebih pendek selalu pereaksi pembatas, dan ketika kedua batang sama panjang, campurannya stoikiometris dan tidak ada yang tersisa.',
      ],
    },
    figure: {
      caption: {
        en: 'Three H₂ and one O₂ (3.0 mol and 1.0 mol): the equation needs 2 H₂ per O₂, so O₂ runs out first. Two H₂O form and one H₂ is left over.',
        id: 'Tiga H₂ dan satu O₂ (3,0 mol dan 1,0 mol): persamaan membutuhkan 2 H₂ per O₂, sehingga O₂ habis lebih dulu. Terbentuk dua H₂O dan satu H₂ tersisa.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        const H2 = (x, y) => `<circle cx="${x - 6}" cy="${y}" r="6" fill="currentColor" opacity=".85"/><circle cx="${x + 6}" cy="${y}" r="6" fill="currentColor" opacity=".85"/>`;
        const O2 = (x, y) => `<circle cx="${x - 9}" cy="${y}" r="9" fill="#ef4444"/><circle cx="${x + 9}" cy="${y}" r="9" fill="#ef4444"/>`;
        const H2O = (x, y) => `<circle cx="${x - 11}" cy="${y + 8}" r="6" fill="currentColor" opacity=".85"/><circle cx="${x + 11}" cy="${y + 8}" r="6" fill="currentColor" opacity=".85"/><circle cx="${x}" cy="${y}" r="9" fill="#ef4444"/>`;
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Limiting reagent particle picture', 'Gambar partikel pereaksi pembatas')}">
  <style>text{font:12px system-ui,sans-serif;fill:currentColor}.s{font-size:10.5px;opacity:.8}.b{fill:none;stroke:currentColor;stroke-width:1.4;opacity:.6}</style>
  <text x="180" y="20" text-anchor="middle" font-weight="bold">2H₂ + O₂ → 2H₂O</text>
  <rect x="14" y="40" width="140" height="120" rx="6" class="b"/>
  <rect x="206" y="40" width="140" height="120" rx="6" class="b"/>
  ${H2(45, 70)}${H2(110, 70)}${H2(45, 130)}
  ${O2(110, 130)}
  <path d="M164 100 L196 100" stroke="currentColor" stroke-width="2" marker-end="url(#ar)"/>
  ${H2O(240, 70)}${H2O(300, 70)}
  ${H2(240, 130)}
  <text x="84" y="178" text-anchor="middle" class="s">${L('before: 3 H₂, 1 O₂', 'sebelum: 3 H₂, 1 O₂')}</text>
  <text x="276" y="178" text-anchor="middle" class="s">${L('after: 2 H₂O + 1 H₂ excess', 'sesudah: 2 H₂O + 1 H₂ sisa')}</text>
  <text x="180" y="205" text-anchor="middle">H₂: 3.0/2 = 1.5    O₂: 1.0/1 = 1.0 ← ${L('limiting', 'pembatas')}</text>
  <text x="180" y="226" text-anchor="middle" class="s">${L('product = 1.0 mol reaction × 2 = 2.0 mol H₂O = 36.0 g', 'produk = 1,0 mol reaksi × 2 = 2,0 mol H₂O = 36,0 g')}</text>
  <defs><marker id="ar" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="currentColor"/></marker></defs>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'The limiting reagent is the reactant with the smallest value of moles ÷ coefficient; it is used up first and stops the reaction.',
        'All product amounts are calculated from the limiting reagent, never from the reactant in excess.',
        'Moles of product = (moles of limiting reagent ÷ its coefficient) × coefficient of product.',
        'Theoretical yield in grams = moles of product × molar mass; actual yield is what you really collect.',
        'Percent yield = actual ÷ theoretical × 100%, and is always ≤ 100% for a correctly identified product.',
        'Adding more of the excess reactant does not make more product; only more limiting reagent does.',
      ],
      id: [
        'Pereaksi pembatas adalah pereaksi dengan nilai mol ÷ koefisien terkecil; ia habis lebih dulu dan menghentikan reaksi.',
        'Semua jumlah produk dihitung dari pereaksi pembatas, tidak pernah dari pereaksi berlebih.',
        'Mol produk = (mol pereaksi pembatas ÷ koefisiennya) × koefisien produk.',
        'Hasil teoretis dalam gram = mol produk × massa molar; hasil nyata adalah yang benar-benar terkumpul.',
        'Persen hasil = nyata ÷ teoretis × 100%, dan selalu ≤ 100% untuk produk yang diidentifikasi dengan benar.',
        'Menambah pereaksi berlebih tidak menambah produk; hanya penambahan pereaksi pembatas yang bisa.',
      ],
    },
    vocabulary: {
      en: [
        ['Limiting reagent', 'The reactant that is completely consumed first and therefore determines how much product can form.'],
        ['Excess reagent', 'A reactant present in more than the stoichiometric amount; some of it remains after the reaction.'],
        ['Stoichiometric ratio', 'The mole ratio given by the coefficients of a balanced equation, e.g. 2:1:2 for 2H₂ + O₂ → 2H₂O.'],
        ['Theoretical yield', 'The maximum mass of product predicted from the limiting reagent and the balanced equation.'],
        ['Actual yield', 'The mass of product really obtained in an experiment.'],
        ['Percent yield', 'Actual yield divided by theoretical yield, times 100%.'],
      ],
      id: [
        ['Pereaksi pembatas', 'Pereaksi yang habis bereaksi lebih dulu dan karena itu menentukan berapa banyak produk yang dapat terbentuk.'],
        ['Pereaksi berlebih', 'Pereaksi yang jumlahnya melebihi jumlah stoikiometris; sebagian tersisa setelah reaksi.'],
        ['Perbandingan stoikiometris', 'Perbandingan mol sesuai koefisien persamaan setara, misalnya 2:1:2 untuk 2H₂ + O₂ → 2H₂O.'],
        ['Hasil teoretis', 'Massa produk maksimum yang diprediksi dari pereaksi pembatas dan persamaan setara.'],
        ['Hasil nyata', 'Massa produk yang benar-benar diperoleh dalam percobaan.'],
        ['Persen hasil', 'Hasil nyata dibagi hasil teoretis, dikali 100%.'],
      ],
    },
    misconceptions: {
      en: [
        ['The reactant with fewer moles is always the limiting reagent.', 'Not necessarily. 3.0 mol H₂ with 1.0 mol O₂ leaves hydrogen in excess, but 1.5 mol H₂ with 1.0 mol O₂ makes hydrogen the limiting reagent even though there is still more of it. You must divide by the coefficients first.'],
        ['The reactant with the smaller mass is limiting.', 'Mass says nothing until it is converted to moles. 32 g of O₂ is only 1 mol, while 4 g of H₂ is 2 mol: the mixture is exactly stoichiometric.'],
        ['A percent yield below 100% means the equation was wrong.', 'The balanced equation is still correct. Lower yields come from incomplete reaction, side products, and losses while handling the product.'],
      ],
      id: [
        ['Pereaksi dengan mol lebih sedikit selalu menjadi pereaksi pembatas.', 'Tidak selalu. 3,0 mol H₂ dengan 1,0 mol O₂ menyisakan hidrogen, tetapi 1,5 mol H₂ dengan 1,0 mol O₂ menjadikan hidrogen pembatas meskipun jumlahnya masih lebih banyak. Bagilah dulu dengan koefisiennya.'],
        ['Pereaksi dengan massa lebih kecil adalah pembatas.', 'Massa tidak berarti apa pun sebelum diubah ke mol. 32 g O₂ hanya 1 mol, sedangkan 4 g H₂ adalah 2 mol: campurannya tepat stoikiometris.'],
        ['Persen hasil di bawah 100% berarti persamaannya salah.', 'Persamaan setaranya tetap benar. Hasil yang lebih rendah berasal dari reaksi yang tidak tuntas, produk samping, dan kehilangan saat menangani produk.'],
      ],
    },
    realWorld: {
      en: [
        'Car engines run slightly fuel-lean so that oxygen is in excess and the fuel is the limiting reagent, which keeps unburnt hydrocarbons out of the exhaust.',
        'In the Haber process for ammonia, N₂ + 3H₂ → 2NH₃, unreacted gases are recycled because a single pass converts only about 15% of the mixture.',
        'Pharmaceutical factories use the most expensive reactant as the limiting reagent and cheaper ones in excess, so none of the costly material is wasted.',
        'Bakers face the same arithmetic: with 10 eggs and a recipe needing 2 eggs and 300 g flour per cake, the eggs limit you to 5 cakes no matter how much flour you have.',
      ],
      id: [
        'Mesin mobil dijalankan sedikit miskin bahan bakar sehingga oksigen berlebih dan bahan bakar menjadi pereaksi pembatas; ini mengurangi hidrokarbon tak terbakar di gas buang.',
        'Pada proses Haber untuk amonia, N₂ + 3H₂ → 2NH₃, gas yang belum bereaksi didaur ulang karena satu lintasan hanya mengubah sekitar 15% campuran.',
        'Pabrik farmasi menjadikan pereaksi termahal sebagai pereaksi pembatas dan yang lebih murah berlebih, sehingga bahan mahal tidak terbuang.',
        'Pembuat kue menghadapi hitungan yang sama: dengan 10 telur dan resep yang butuh 2 telur dan 300 g tepung per kue, telur membatasi kamu pada 5 kue berapa pun tepung yang tersedia.',
      ],
    },
    questions: {
      en: [
        { q: '4.0 mol N₂ and 9.0 mol H₂ react to form ammonia. Which is limiting, how many moles of NH₃ form, and how much N₂ is left?', a: 'N₂: 4.0/1 = 4.0; H₂: 9.0/3 = 3.0, so H₂ limits. NH₃ = 3.0 × 2 = 6.0 mol (102 g). N₂ used = 3.0 mol, so 1.0 mol N₂ is left.' },
        { q: '48.6 g of Mg (2.0 mol) burns in excess oxygen. What is the theoretical yield of MgO, and the percent yield if 68.5 g is collected?', a: '2Mg + O₂ → 2MgO gives 2.0 mol MgO = 2.0 × 40.30 = 80.6 g. Percent yield = 68.5/80.6 × 100% = 85%.' },
        { q: '1.0 mol CH₄ burns with 1.5 mol O₂. Why is the mass of CO₂ produced less than 44 g?', a: 'CH₄ needs 2 mol O₂ per mol; only 1.5 mol is available, so O₂ limits: 1.5/2 = 0.75 mol of reaction, giving 0.75 mol CO₂ = 33 g, with 0.25 mol CH₄ left unburnt.' },
      ],
      id: [
        { q: '4,0 mol N₂ dan 9,0 mol H₂ bereaksi membentuk amonia. Mana yang pembatas, berapa mol NH₃ terbentuk, dan berapa N₂ yang tersisa?', a: 'N₂: 4,0/1 = 4,0; H₂: 9,0/3 = 3,0, sehingga H₂ pembatas. NH₃ = 3,0 × 2 = 6,0 mol (102 g). N₂ terpakai = 3,0 mol, sehingga 1,0 mol N₂ tersisa.' },
        { q: '48,6 g Mg (2,0 mol) dibakar dalam oksigen berlebih. Berapa hasil teoretis MgO, dan berapa persen hasil jika terkumpul 68,5 g?', a: '2Mg + O₂ → 2MgO menghasilkan 2,0 mol MgO = 2,0 × 40,30 = 80,6 g. Persen hasil = 68,5/80,6 × 100% = 85%.' },
        { q: '1,0 mol CH₄ dibakar dengan 1,5 mol O₂. Mengapa massa CO₂ yang terbentuk kurang dari 44 g?', a: 'CH₄ membutuhkan 2 mol O₂ per mol; hanya tersedia 1,5 mol, sehingga O₂ pembatas: 1,5/2 = 0,75 mol reaksi, menghasilkan 0,75 mol CO₂ = 33 g, dengan 0,25 mol CH₄ tidak terbakar.' },
      ],
    },
  },
};
