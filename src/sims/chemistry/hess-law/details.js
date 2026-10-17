export default {
  objectives: {
    en: [
      "State Hess's law and use it to add the ΔH values of steps that lead from the same reactants to the same products.",
      'Reverse and combine thermochemical equations, changing the sign of ΔH when a step is reversed.',
      'Calculate ΔH°rxn from standard enthalpies of formation using ΣΔH°f(products) − ΣΔH°f(reactants) and read an enthalpy level diagram.',
    ],
    id: [
      'Menyatakan hukum Hess dan menggunakannya untuk menjumlahkan ΔH tahap-tahap yang berawal dari pereaksi yang sama menuju produk yang sama.',
      'Membalik dan menggabungkan persamaan termokimia, dengan mengubah tanda ΔH ketika suatu tahap dibalik.',
      'Menghitung ΔH°reaksi dari entalpi pembentukan standar dengan ΣΔH°f(produk) − ΣΔH°f(pereaksi) dan membaca diagram tingkat entalpi.',
    ],
  },
  tryThis: {
    en: [
      'Target C + O₂ → CO₂: drag in C + ½O₂ → CO and CO + ½O₂ → CO₂. Does the sum equal −393.5 kJ? What happens if you add the decoy step?',
      'Target C + 2H₂ → CH₄: add the methane combustion step and tap ⇄ to reverse it. Watch its arrow flip from orange (down) to blue (up).',
      'Target N₂ + 2O₂ → 2NO₂: build the path and explain why the overall reaction is endothermic even though one step is exothermic.',
      'Switch to the calculator and compare ΔH° for burning methane with burning ethanol. Which is more exothermic per mole?',
    ],
    id: [
      'Target C + O₂ → CO₂: seret C + ½O₂ → CO dan CO + ½O₂ → CO₂. Apakah jumlahnya −393,5 kJ? Apa yang terjadi jika tahap pengecoh ditambahkan?',
      'Target C + 2H₂ → CH₄: tambahkan tahap pembakaran metana dan ketuk ⇄ untuk membaliknya. Lihat panahnya berubah dari oranye (turun) menjadi biru (naik).',
      'Target N₂ + 2O₂ → 2NO₂: susun lintasannya dan jelaskan mengapa reaksi keseluruhan endoterm meskipun satu tahapnya eksoterm.',
      'Beralih ke kalkulator dan bandingkan ΔH° pembakaran metana dengan pembakaran etanol. Mana yang lebih eksoterm per mol?',
    ],
  },

  learn: {
    background: {
      en: [
        'Enthalpy, H, is the heat content of a system at constant pressure. We can never measure H itself, only changes in it: ΔH = H(products) − H(reactants). A negative ΔH means heat flows out to the surroundings (exothermic, drawn as a downward arrow on an enthalpy level diagram); a positive ΔH means heat is absorbed (endothermic, upward arrow). Burning one mole of carbon to CO₂ releases 393.5 kJ, so ΔH = −393.5 kJ.',
        "Hess's law (Germain Hess, 1840) states that ΔH for a reaction is the same whichever route is taken from reactants to products, because enthalpy depends only on the state of the system, not on its history. Carbon can burn straight to CO₂ (−393.5 kJ) or first to CO (−110.5 kJ) and then on to CO₂ (−283.0 kJ): the two-step total is −393.5 kJ, exactly the same. This lets chemists find ΔH for reactions that are impossible to measure directly, such as the formation of methane from carbon and hydrogen, by adding up reactions that can be measured in a calorimeter.",
        'Combining equations follows three rules. Reversing a step changes the sign of ΔH. Multiplying a step by a factor multiplies ΔH by the same factor. The species that appear on both sides of the combined steps cancel, and whatever remains must be the target equation. In the simulation each step is a card; dragging it into the pathway adds its ΔH, the ⇄ button reverses it, and the "net so far" line shows which species have not yet cancelled.',
        'The most systematic route goes through the elements. The standard enthalpy of formation ΔH°f is the ΔH when one mole of a compound forms from its elements in their standard states at 298 K and 1 bar; for an element in its standard state ΔH°f = 0 by definition. Imagine taking the reactants apart into elements (−ΣΔH°f of reactants) and reassembling the elements into products (+ΣΔH°f of products). Hess\'s law then gives ΔH°rxn = ΣΔH°f(products) − ΣΔH°f(reactants). For methane combustion: [−393.5 + 2(−285.8)] − [−74.8 + 0] = −890.3 kJ/mol.',
      ],
      id: [
        'Entalpi, H, adalah kandungan kalor suatu sistem pada tekanan tetap. Kita tidak pernah bisa mengukur H itu sendiri, hanya perubahannya: ΔH = H(produk) − H(pereaksi). ΔH negatif berarti kalor mengalir keluar ke lingkungan (eksoterm, digambar sebagai panah ke bawah pada diagram tingkat entalpi); ΔH positif berarti kalor diserap (endoterm, panah ke atas). Pembakaran satu mol karbon menjadi CO₂ melepaskan 393,5 kJ, sehingga ΔH = −393,5 kJ.',
        'Hukum Hess (Germain Hess, 1840) menyatakan bahwa ΔH suatu reaksi sama berapa pun jalur yang ditempuh dari pereaksi ke produk, karena entalpi hanya bergantung pada keadaan sistem, bukan pada riwayatnya. Karbon dapat terbakar langsung menjadi CO₂ (−393,5 kJ) atau lebih dulu menjadi CO (−110,5 kJ) lalu menjadi CO₂ (−283,0 kJ): jumlah dua tahap itu −393,5 kJ, tepat sama. Hal ini memungkinkan kimiawan menentukan ΔH reaksi yang tidak mungkin diukur langsung, seperti pembentukan metana dari karbon dan hidrogen, dengan menjumlahkan reaksi-reaksi yang dapat diukur dalam kalorimeter.',
        'Menggabungkan persamaan mengikuti tiga aturan. Membalik suatu tahap mengubah tanda ΔH. Mengalikan tahap dengan suatu faktor mengalikan ΔH dengan faktor yang sama. Spesi yang muncul di kedua ruas tahap-tahap gabungan saling meniadakan, dan yang tersisa harus menjadi persamaan target. Dalam simulasi, tiap tahap berupa kartu; menyeretnya ke lintasan menambahkan ΔH-nya, tombol ⇄ membaliknya, dan baris "hasil bersih" menunjukkan spesi mana yang belum saling meniadakan.',
        'Jalur yang paling sistematis melewati unsur-unsur. Entalpi pembentukan standar ΔH°f adalah ΔH ketika satu mol senyawa terbentuk dari unsur-unsurnya dalam keadaan standar pada 298 K dan 1 bar; untuk unsur dalam keadaan standar ΔH°f = 0 menurut definisi. Bayangkan pereaksi diurai menjadi unsur (−ΣΔH°f pereaksi) lalu unsur dirakit kembali menjadi produk (+ΣΔH°f produk). Hukum Hess memberikan ΔH°reaksi = ΣΔH°f(produk) − ΣΔH°f(pereaksi). Untuk pembakaran metana: [−393,5 + 2(−285,8)] − [−74,8 + 0] = −890,3 kJ/mol.',
      ],
    },
    figure: {
      caption: {
        en: 'Enthalpy level diagram for burning carbon. The direct route (dashed) and the two-step route via CO start and end at the same levels, so −110.5 + (−283.0) = −393.5 kJ.',
        id: 'Diagram tingkat entalpi pembakaran karbon. Rute langsung (putus-putus) dan rute dua tahap melalui CO berawal dan berakhir pada tingkat yang sama, sehingga −110,5 + (−283,0) = −393,5 kJ.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L("Hess's law enthalpy diagram", 'Diagram entalpi hukum Hess')}">
  <style>text{font:12px system-ui,sans-serif;fill:currentColor}.s{font-size:10.5px;opacity:.8}.lv{stroke:currentColor;stroke-width:2}</style>
  <line x1="40" y1="20" x2="40" y2="225" stroke="currentColor" stroke-width="1" opacity=".5"/>
  <text x="14" y="130" transform="rotate(-90 14 130)" text-anchor="middle" class="s">H (kJ)</text>
  <line x1="60" y1="50" x2="340" y2="50" class="lv"/>
  <text x="64" y="44">C(s) + O₂(g)      H = 0</text>
  <line x1="190" y1="106" x2="340" y2="106" class="lv" stroke="#fb923c"/>
  <text x="246" y="100" fill="#fb923c">CO(g) + ½O₂(g)</text>
  <line x1="60" y1="208" x2="340" y2="208" class="lv"/>
  <text x="64" y="226">CO₂(g)      H = −393.5</text>
  <path d="M110 50 L110 200" stroke="currentColor" stroke-width="2" stroke-dasharray="6 4" marker-end="url(#ar)"/>
  <text x="116" y="130" class="s">${L('direct', 'langsung')}</text>
  <text x="116" y="144">−393.5</text>
  <path d="M230 50 L230 98" stroke="#fb923c" stroke-width="2" marker-end="url(#ar)"/>
  <text x="236" y="80" fill="#fb923c">−110.5</text>
  <path d="M300 106 L300 200" stroke="#fb923c" stroke-width="2" marker-end="url(#ar)"/>
  <text x="306" y="160" fill="#fb923c">−283.0</text>
  <text x="200" y="20" text-anchor="middle">${L('same start, same end → same total ΔH', 'awal sama, akhir sama → ΔH total sama')}</text>
  <defs><marker id="ar" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="context-stroke"/></marker></defs>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'ΔH depends only on the initial and final states, not on the route: the sum of the step ΔH values equals the ΔH of the direct reaction.',
        'Reversing a thermochemical equation reverses the sign of ΔH; multiplying it by n multiplies ΔH by n.',
        'Species appearing on both sides of combined steps cancel; the steps are correct when the leftover equation is the target.',
        'ΔH°f of an element in its standard state is zero, so the elements form a common reference level for every compound.',
        'ΔH°rxn = ΣΔH°f(products) − ΣΔH°f(reactants), each ΔH°f multiplied by its coefficient.',
        'On an enthalpy level diagram, exothermic steps point down and endothermic steps point up; the overall sign is decided by where the final level sits relative to the start.',
      ],
      id: [
        'ΔH hanya bergantung pada keadaan awal dan akhir, bukan pada jalurnya: jumlah ΔH tahap-tahap sama dengan ΔH reaksi langsung.',
        'Membalik persamaan termokimia membalik tanda ΔH; mengalikannya dengan n mengalikan ΔH dengan n.',
        'Spesi yang muncul di kedua ruas tahap gabungan saling meniadakan; tahap-tahap benar jika persamaan sisanya adalah target.',
        'ΔH°f unsur dalam keadaan standar adalah nol, sehingga unsur-unsur menjadi tingkat acuan bersama bagi setiap senyawa.',
        'ΔH°reaksi = ΣΔH°f(produk) − ΣΔH°f(pereaksi), masing-masing ΔH°f dikalikan koefisiennya.',
        'Pada diagram tingkat entalpi, tahap eksoterm mengarah ke bawah dan endoterm ke atas; tanda keseluruhan ditentukan oleh posisi tingkat akhir terhadap awal.',
      ],
    },
    vocabulary: {
      en: [
        ['Enthalpy change (ΔH)', 'Heat absorbed or released by a reaction at constant pressure, in kJ (or kJ/mol of reaction as written).'],
        ['Exothermic / endothermic', 'A reaction that releases heat (ΔH < 0) / absorbs heat (ΔH > 0).'],
        ["Hess's law", 'The total enthalpy change of a reaction is independent of the pathway; step ΔH values add.'],
        ['Standard enthalpy of formation (ΔH°f)', 'ΔH when one mole of a compound forms from its elements in their standard states at 298 K and 1 bar.'],
        ['Standard state', 'The most stable form of a substance at 1 bar and a specified temperature, usually 298 K; e.g. graphite for carbon, O₂(g) for oxygen.'],
        ['Thermochemical equation', 'A balanced equation written together with its ΔH value and the physical states of all species.'],
      ],
      id: [
        ['Perubahan entalpi (ΔH)', 'Kalor yang diserap atau dilepaskan reaksi pada tekanan tetap, dalam kJ (atau kJ/mol reaksi seperti tertulis).'],
        ['Eksoterm / endoterm', 'Reaksi yang melepaskan kalor (ΔH < 0) / menyerap kalor (ΔH > 0).'],
        ['Hukum Hess', 'Perubahan entalpi total suatu reaksi tidak bergantung pada jalurnya; nilai ΔH tahap-tahap dijumlahkan.'],
        ['Entalpi pembentukan standar (ΔH°f)', 'ΔH ketika satu mol senyawa terbentuk dari unsur-unsurnya dalam keadaan standar pada 298 K dan 1 bar.'],
        ['Keadaan standar', 'Bentuk paling stabil suatu zat pada 1 bar dan suhu tertentu, biasanya 298 K; misalnya grafit untuk karbon, O₂(g) untuk oksigen.'],
        ['Persamaan termokimia', 'Persamaan setara yang ditulis bersama nilai ΔH dan wujud fisik semua spesi.'],
      ],
    },
    misconceptions: {
      en: [
        ['A two-step route releases more (or less) heat than the direct reaction.', 'The total is identical. Energy is conserved and enthalpy is a state function, so any route between the same start and end has the same ΔH.'],
        ['ΔH°f of oxygen gas is some large negative number because O₂ is stable.', 'By definition ΔH°f = 0 for every element in its standard state. Stability of compounds is measured relative to this zero.'],
        ['When you reverse an equation you keep ΔH but swap the reactants and products.', 'Reversing a reaction reverses the direction of heat flow, so the sign of ΔH must change: if combustion of CH₄ is −890.3 kJ, forming CH₄ + 2O₂ from CO₂ + 2H₂O is +890.3 kJ.'],
        ['The formula ΣΔH°f(products) − ΣΔH°f(reactants) ignores the coefficients.', 'Each ΔH°f must be multiplied by the number of moles in the balanced equation. For 2H₂O that means 2 × (−285.8) kJ, not −285.8 kJ.'],
      ],
      id: [
        ['Rute dua tahap melepaskan kalor lebih banyak (atau lebih sedikit) daripada reaksi langsung.', 'Totalnya identik. Energi kekal dan entalpi adalah fungsi keadaan, sehingga rute mana pun antara awal dan akhir yang sama memiliki ΔH yang sama.'],
        ['ΔH°f gas oksigen adalah bilangan negatif besar karena O₂ stabil.', 'Menurut definisi ΔH°f = 0 untuk setiap unsur dalam keadaan standarnya. Kestabilan senyawa diukur relatif terhadap nol ini.'],
        ['Saat persamaan dibalik, ΔH tetap tetapi pereaksi dan produk ditukar.', 'Membalik reaksi membalik arah aliran kalor, sehingga tanda ΔH harus berubah: jika pembakaran CH₄ adalah −890,3 kJ, pembentukan CH₄ + 2O₂ dari CO₂ + 2H₂O adalah +890,3 kJ.'],
        ['Rumus ΣΔH°f(produk) − ΣΔH°f(pereaksi) mengabaikan koefisien.', 'Setiap ΔH°f harus dikalikan jumlah mol dalam persamaan setara. Untuk 2H₂O berarti 2 × (−285,8) kJ, bukan −285,8 kJ.'],
      ],
    },
    realWorld: {
      en: [
        'Food calorie labels are computed by Hess-type bookkeeping: the heats of combustion of carbohydrate, fat and protein are added according to the composition instead of burning every product in a calorimeter.',
        'Rocket engineers compare propellants with ΔH°f tables: hydrogen plus oxygen (−285.8 kJ per mol of water) gives the highest energy per kilogram of any common fuel.',
        'Cement kilns decompose limestone, CaCO₃ → CaO + CO₂ (+178 kJ/mol), an endothermic step that makes cement one of the most energy-intensive industries.',
        'The enthalpy of formation of methane cannot be measured directly because carbon and hydrogen do not react cleanly; it was obtained by subtracting combustion enthalpies, exactly as in the CH₄ puzzle.',
      ],
      id: [
        'Label kalori makanan dihitung dengan pembukuan ala Hess: kalor pembakaran karbohidrat, lemak, dan protein dijumlahkan sesuai komposisi, tanpa membakar setiap produk dalam kalorimeter.',
        'Insinyur roket membandingkan propelan dengan tabel ΔH°f: hidrogen dan oksigen (−285,8 kJ per mol air) memberikan energi per kilogram tertinggi di antara bahan bakar umum.',
        'Tanur semen menguraikan batu kapur, CaCO₃ → CaO + CO₂ (+178 kJ/mol), tahap endoterm yang menjadikan semen salah satu industri paling boros energi.',
        'Entalpi pembentukan metana tidak dapat diukur langsung karena karbon dan hidrogen tidak bereaksi dengan bersih; nilainya diperoleh dengan mengurangkan entalpi pembakaran, tepat seperti pada teka-teki CH₄.',
      ],
    },
    questions: {
      en: [
        { q: 'Given C + O₂ → CO₂ (ΔH = −393.5 kJ) and CO + ½O₂ → CO₂ (ΔH = −283.0 kJ), find ΔH for C + ½O₂ → CO.', a: 'Reverse the second equation (+283.0 kJ) and add it to the first: C + O₂ + CO₂ → CO₂ + CO + ½O₂, which simplifies to C + ½O₂ → CO with ΔH = −393.5 + 283.0 = −110.5 kJ.' },
        { q: 'Use ΔH°f values (CaCO₃ −1206.9, CaO −635.1, CO₂ −393.5 kJ/mol) to find ΔH° for CaCO₃ → CaO + CO₂. Is the reaction exothermic?', a: 'ΔH° = [−635.1 + (−393.5)] − [−1206.9] = +178.3 kJ/mol. Positive, so it is endothermic: limestone must be heated strongly to decompose.' },
        { q: 'Why must water be written as H₂O(l), not H₂O(g), when using −285.8 kJ/mol as its enthalpy of formation?', a: 'The two states have different enthalpies: ΔH°f of H₂O(g) is −241.8 kJ/mol. The 44.0 kJ difference is the enthalpy of vaporisation, so mixing up the states gives a wrong ΔH°rxn.' },
      ],
      id: [
        { q: 'Diketahui C + O₂ → CO₂ (ΔH = −393,5 kJ) dan CO + ½O₂ → CO₂ (ΔH = −283,0 kJ), tentukan ΔH untuk C + ½O₂ → CO.', a: 'Balik persamaan kedua (+283,0 kJ) dan jumlahkan dengan yang pertama: C + O₂ + CO₂ → CO₂ + CO + ½O₂, yang disederhanakan menjadi C + ½O₂ → CO dengan ΔH = −393,5 + 283,0 = −110,5 kJ.' },
        { q: 'Gunakan nilai ΔH°f (CaCO₃ −1206,9, CaO −635,1, CO₂ −393,5 kJ/mol) untuk menentukan ΔH° reaksi CaCO₃ → CaO + CO₂. Apakah reaksinya eksoterm?', a: 'ΔH° = [−635,1 + (−393,5)] − [−1206,9] = +178,3 kJ/mol. Positif, berarti endoterm: batu kapur harus dipanaskan kuat agar terurai.' },
        { q: 'Mengapa air harus ditulis H₂O(l), bukan H₂O(g), ketika memakai −285,8 kJ/mol sebagai entalpi pembentukannya?', a: 'Kedua wujud memiliki entalpi berbeda: ΔH°f H₂O(g) adalah −241,8 kJ/mol. Selisih 44,0 kJ adalah entalpi penguapan, sehingga tertukar wujud memberikan ΔH°reaksi yang salah.' },
      ],
    },
  },
};
