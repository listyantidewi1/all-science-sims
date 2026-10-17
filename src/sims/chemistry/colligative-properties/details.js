export default {
  objectives: {
    en: [
      'Calculate boiling-point elevation and freezing-point depression with ΔT = i·K·m and explain the role of the van ’t Hoff factor i.',
      'Use Raoult’s law and π = iMRT to find vapour-pressure lowering and osmotic pressure.',
      'Explain, using particles, why colligative properties depend on the number of dissolved particles and not on their identity.',
    ],
    id: [
      'Menghitung kenaikan titik didih dan penurunan titik beku dengan ΔT = i·K·m dan menjelaskan peran faktor van ’t Hoff i.',
      'Menggunakan hukum Raoult dan π = iMRT untuk menentukan penurunan tekanan uap dan tekanan osmotik.',
      'Menjelaskan, dengan model partikel, mengapa sifat koligatif bergantung pada jumlah partikel terlarut dan bukan pada jenisnya.',
    ],
  },
  tryThis: {
    en: [
      'Set 1.0 mol/kg sucrose, then 1.0 mol/kg NaCl, then CaCl₂. Watch ΔT_f jump from 1.86 K to 3.72 K to 5.58 K.',
      'Press the road-salt preset. How cold can the road get before the brine freezes?',
      'Raise the molality slowly and watch the dashed phase-diagram curves slide: the freezing line moves left much more than the boiling curve moves right. Why (K_f vs K_b)?',
      'Set m = 0.15 mol/kg NaCl at 37 °C: this is roughly blood plasma. Read π and compare with the 7.6 atm quoted for blood.',
    ],
    id: [
      'Atur sukrosa 1,0 mol/kg, lalu NaCl 1,0 mol/kg, lalu CaCl₂. Perhatikan ΔT_f melonjak dari 1,86 K ke 3,72 K ke 5,58 K.',
      'Tekan preset garam jalan. Seberapa dingin jalan boleh menjadi sebelum air garamnya membeku?',
      'Naikkan molalitas perlahan dan amati kurva putus-putus pada diagram fase bergeser: garis beku bergeser ke kiri jauh lebih besar daripada kurva didih ke kanan. Mengapa (K_f vs K_b)?',
      'Atur m = 0,15 mol/kg NaCl pada 37 °C: ini kira-kira plasma darah. Baca π dan bandingkan dengan 7,6 atm yang biasa disebut untuk darah.',
    ],
  },

  learn: {
    background: {
      en: [
        'Dissolve anything in water and four things happen to the water: its vapour pressure falls, it boils at a higher temperature, it freezes at a lower temperature, and it develops an osmotic pressure. These are the colligative properties (from Latin colligatus, "bound together"), and for dilute solutions they depend only on how many dissolved particles there are per kilogram of solvent, not on what the particles are. One mole of sucrose molecules and one mole of ethylene glycol molecules lower the freezing point by the same 1.86 K.',
        'The concentration unit is molality, m = moles of solute per kilogram of solvent, which unlike molarity does not change with temperature. For electrolytes each formula unit gives several particles, counted by the van ’t Hoff factor i: 1 for sugars, about 2 for NaCl (Na⁺ + Cl⁻) and about 3 for CaCl₂ (Ca²⁺ + 2Cl⁻). The working formulas are ΔT_b = i·K_b·m with K_b = 0.512 K·kg/mol for water, and ΔT_f = i·K_f·m with K_f = 1.86 K·kg/mol. Because K_f is 3.6 times K_b, the freezing point shifts much more than the boiling point, which is why salt is so effective on icy roads.',
        'Raoult’s law explains the vapour-pressure lowering: P = x_water·P°, where x_water is the mole fraction of water. Solute particles occupy part of the liquid surface and, more fundamentally, make the solution more disordered, so fewer water molecules escape per second. On a phase diagram the liquid–vapour curve drops, so 1 atm is reached only at a higher temperature (boiling-point elevation), and the solid–liquid line meets the lowered curve at a lower temperature (freezing-point depression). The sketch in the simulation is deliberately exaggerated: a real 1 mol/kg solution shifts the boiling point by only half a degree.',
        'Osmotic pressure is the colligative property with the largest numbers. If pure water and a solution are separated by a semipermeable membrane that lets water through but not solute, water flows into the solution until the extra hydrostatic pressure, π, stops the flow. The van ’t Hoff equation π = i·M·R·T looks like the ideal-gas law and, for dilute solutions where molarity ≈ molality, gives π ≈ 24.5 atm for 1 mol/L of sucrose at 25 °C, a column of water over 250 m high. Blood plasma has π ≈ 7.6 atm, which is why intravenous fluids must be isotonic (0.9% NaCl, about 0.15 mol/kg).',
      ],
      id: [
        'Larutkan apa pun dalam air dan empat hal terjadi pada air itu: tekanan uapnya turun, mendidih pada suhu lebih tinggi, membeku pada suhu lebih rendah, dan timbul tekanan osmotik. Inilah sifat koligatif (dari bahasa Latin colligatus, "terikat bersama"), dan untuk larutan encer sifat ini hanya bergantung pada jumlah partikel terlarut per kilogram pelarut, bukan pada jenis partikelnya. Satu mol molekul sukrosa dan satu mol molekul etilen glikol menurunkan titik beku dengan nilai yang sama, 1,86 K.',
        'Satuan konsentrasinya adalah molalitas, m = mol zat terlarut per kilogram pelarut, yang tidak seperti molaritas tidak berubah dengan suhu. Untuk elektrolit, setiap satuan rumus menghasilkan beberapa partikel, dihitung oleh faktor van ’t Hoff i: 1 untuk gula, sekitar 2 untuk NaCl (Na⁺ + Cl⁻), dan sekitar 3 untuk CaCl₂ (Ca²⁺ + 2Cl⁻). Rumus kerjanya ΔT_b = i·K_b·m dengan K_b = 0,512 K·kg/mol untuk air, dan ΔT_f = i·K_f·m dengan K_f = 1,86 K·kg/mol. Karena K_f adalah 3,6 kali K_b, titik beku bergeser jauh lebih besar daripada titik didih; itulah sebabnya garam sangat efektif di jalan yang membeku.',
        'Hukum Raoult menjelaskan penurunan tekanan uap: P = x_air·P°, dengan x_air fraksi mol air. Partikel zat terlarut menempati sebagian permukaan cairan dan, lebih mendasar lagi, membuat larutan lebih tidak teratur, sehingga lebih sedikit molekul air yang lepas tiap detik. Pada diagram fase, kurva cair–uap turun, sehingga 1 atm baru tercapai pada suhu lebih tinggi (kenaikan titik didih), dan garis padat–cair bertemu kurva yang turun itu pada suhu lebih rendah (penurunan titik beku). Sketsa dalam simulasi sengaja dilebih-lebihkan: larutan 1 mol/kg sesungguhnya hanya menggeser titik didih setengah derajat.',
        'Tekanan osmotik adalah sifat koligatif dengan angka terbesar. Jika air murni dan larutan dipisahkan membran semipermeabel yang meloloskan air tetapi tidak zat terlarut, air mengalir ke larutan sampai tekanan hidrostatik tambahan, π, menghentikan aliran. Persamaan van ’t Hoff π = i·M·R·T mirip hukum gas ideal dan, untuk larutan encer dengan molaritas ≈ molalitas, memberikan π ≈ 24,5 atm untuk sukrosa 1 mol/L pada 25 °C, setara kolom air lebih dari 250 m. Plasma darah memiliki π ≈ 7,6 atm; karena itu cairan infus harus isotonik (NaCl 0,9%, sekitar 0,15 mol/kg).',
      ],
    },
    figure: {
      caption: {
        en: 'Phase diagram of water (solid lines) and of an aqueous solution (dashed). The lowered vapour-pressure curve pushes the boiling point up by ΔT_b and the freezing point down by ΔT_f, widening the liquid range.',
        id: 'Diagram fase air (garis utuh) dan larutan berair (putus-putus). Kurva tekanan uap yang turun menggeser titik didih naik sebesar ΔT_b dan titik beku turun sebesar ΔT_f, melebarkan rentang cair.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Phase diagram with colligative shifts', 'Diagram fase dengan pergeseran koligatif')}">
  <style>text{font:12px system-ui,sans-serif;fill:currentColor}.s{font-size:10.5px;opacity:.8}.ax{stroke:currentColor;stroke-width:1;opacity:.6}.w{fill:none;stroke:currentColor;stroke-width:2}.sol{fill:none;stroke:#f59e0b;stroke-width:2;stroke-dasharray:6 4}</style>
  <line x1="40" y1="20" x2="40" y2="200" class="ax"/>
  <line x1="40" y1="200" x2="340" y2="200" class="ax"/>
  <text x="190" y="226" text-anchor="middle" class="s">${L('temperature →', 'suhu →')}</text>
  <text x="18" y="110" transform="rotate(-90 18 110)" text-anchor="middle" class="s">${L('pressure →', 'tekanan →')}</text>
  <line x1="40" y1="80" x2="340" y2="80" stroke="currentColor" stroke-width="1" stroke-dasharray="3 4" opacity=".6"/>
  <text x="44" y="75" class="s">1 atm</text>
  <path d="M60 190 Q110 175 130 160" class="w"/>
  <path d="M130 160 C180 130 220 100 262 40" class="w"/>
  <path d="M130 160 L118 25" class="w"/>
  <path d="M130 160 C190 150 240 110 290 40" class="sol"/>
  <path d="M100 166 L88 25" class="sol"/>
  <circle cx="128" cy="80" r="3.5" fill="currentColor"/>
  <circle cx="232" cy="80" r="3.5" fill="currentColor"/>
  <circle cx="96" cy="80" r="3.5" fill="#f59e0b"/>
  <circle cx="256" cy="80" r="3.5" fill="#f59e0b"/>
  <path d="M124 94 L100 94" stroke="#f59e0b" stroke-width="1.6" marker-end="url(#ar)"/>
  <path d="M236 94 L252 94" stroke="#f59e0b" stroke-width="1.6" marker-end="url(#ar)"/>
  <text x="112" y="110" text-anchor="middle" fill="#f59e0b">ΔT_f</text>
  <text x="244" y="110" text-anchor="middle" fill="#f59e0b">ΔT_b</text>
  <text x="70" y="60" class="s">${L('solid', 'padat')}</text>
  <text x="170" y="60" class="s">${L('liquid', 'cair')}</text>
  <text x="270" y="160" class="s">${L('vapour', 'uap')}</text>
  <text x="300" y="140" class="s" fill="#f59e0b">${L('solution', 'larutan')}</text>
  <text x="300" y="124" class="s">${L('pure water', 'air murni')}</text>
  <defs><marker id="ar" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="#f59e0b"/></marker></defs>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Colligative properties depend on the number of dissolved particles per kilogram of solvent, not on their chemical identity.',
        'Electrolytes count more than once: the van ’t Hoff factor i is about 2 for NaCl and 3 for CaCl₂, so they have 2–3 times the effect of a sugar at the same molality.',
        'ΔT_b = i·K_b·m and ΔT_f = i·K_f·m; for water K_b = 0.512 and K_f = 1.86 K·kg/mol, so freezing shifts 3.6 times more than boiling.',
        'Raoult’s law, P = x_solvent·P°, is the root cause: a lower vapour pressure means the liquid must be hotter to boil and can be colder before it freezes.',
        'Osmotic pressure π = i·M·R·T is large: 1 mol/L of particles gives about 24 atm at room temperature.',
        'Molality (mol/kg solvent) is used because it does not change when the solution expands or contracts with temperature.',
      ],
      id: [
        'Sifat koligatif bergantung pada jumlah partikel terlarut per kilogram pelarut, bukan pada identitas kimianya.',
        'Elektrolit dihitung lebih dari sekali: faktor van ’t Hoff i sekitar 2 untuk NaCl dan 3 untuk CaCl₂, sehingga efeknya 2–3 kali gula pada molalitas yang sama.',
        'ΔT_b = i·K_b·m dan ΔT_f = i·K_f·m; untuk air K_b = 0,512 dan K_f = 1,86 K·kg/mol, sehingga titik beku bergeser 3,6 kali lebih besar daripada titik didih.',
        'Hukum Raoult, P = x_pelarut·P°, adalah akar penyebabnya: tekanan uap yang lebih rendah berarti cairan harus lebih panas untuk mendidih dan boleh lebih dingin sebelum membeku.',
        'Tekanan osmotik π = i·M·R·T besar: 1 mol/L partikel memberikan sekitar 24 atm pada suhu kamar.',
        'Molalitas (mol/kg pelarut) dipakai karena tidak berubah ketika larutan memuai atau menyusut akibat suhu.',
      ],
    },
    vocabulary: {
      en: [
        ['Colligative property', 'A property of a solution that depends on the concentration of solute particles but not on their identity.'],
        ['Molality (m)', 'Moles of solute per kilogram of solvent, mol/kg.'],
        ['van ’t Hoff factor (i)', 'The number of particles each formula unit of solute produces in solution; 1 for non-electrolytes, ≈2 for NaCl, ≈3 for CaCl₂.'],
        ['Boiling-point elevation (ΔT_b)', 'The increase in boiling point caused by a solute: ΔT_b = i·K_b·m.'],
        ['Freezing-point depression (ΔT_f)', 'The decrease in freezing point caused by a solute: ΔT_f = i·K_f·m.'],
        ['Osmotic pressure (π)', 'The pressure that must be applied to a solution to stop solvent flowing into it through a semipermeable membrane; π = i·M·R·T.'],
        ['Semipermeable membrane', 'A barrier that lets solvent molecules pass but blocks solute particles.'],
      ],
      id: [
        ['Sifat koligatif', 'Sifat larutan yang bergantung pada konsentrasi partikel zat terlarut tetapi tidak pada identitasnya.'],
        ['Molalitas (m)', 'Mol zat terlarut per kilogram pelarut, mol/kg.'],
        ['Faktor van ’t Hoff (i)', 'Jumlah partikel yang dihasilkan setiap satuan rumus zat terlarut dalam larutan; 1 untuk nonelektrolit, ≈2 untuk NaCl, ≈3 untuk CaCl₂.'],
        ['Kenaikan titik didih (ΔT_b)', 'Kenaikan titik didih akibat zat terlarut: ΔT_b = i·K_b·m.'],
        ['Penurunan titik beku (ΔT_f)', 'Penurunan titik beku akibat zat terlarut: ΔT_f = i·K_f·m.'],
        ['Tekanan osmotik (π)', 'Tekanan yang harus diberikan pada larutan untuk menghentikan aliran pelarut ke dalamnya melalui membran semipermeabel; π = i·M·R·T.'],
        ['Membran semipermeabel', 'Penghalang yang meloloskan molekul pelarut tetapi menahan partikel zat terlarut.'],
      ],
    },
    misconceptions: {
      en: [
        ['Salt makes water boil faster.', 'Salt raises the boiling point, so salted water must get slightly hotter before it boils; a teaspoon in a pot changes it by less than 0.1 °C. Any faster cooking comes from the hotter water, not a faster boil.'],
        ['One mole of NaCl has the same effect as one mole of sugar.', 'NaCl dissociates into two ions, so one mole of NaCl gives about two moles of particles and roughly twice the freezing-point depression of one mole of sugar.'],
        ['In osmosis the solute moves through the membrane to even out the concentration.', 'The solute cannot cross. It is the solvent that moves, from the dilute side into the concentrated side, which dilutes the solution and raises its level.'],
        ['The i values of 2 and 3 are exact.', 'They are ideal limits. Ion pairing makes real values smaller, about 1.9 for 0.1 mol/kg NaCl and 2.7 for CaCl₂, and the deviation grows with concentration.'],
      ],
      id: [
        ['Garam membuat air mendidih lebih cepat.', 'Garam menaikkan titik didih, sehingga air bergaram harus sedikit lebih panas sebelum mendidih; satu sendok teh dalam panci mengubahnya kurang dari 0,1 °C. Masakan matang lebih cepat karena airnya lebih panas, bukan karena mendidih lebih cepat.'],
        ['Satu mol NaCl berefek sama dengan satu mol gula.', 'NaCl terurai menjadi dua ion, sehingga satu mol NaCl memberikan sekitar dua mol partikel dan kira-kira dua kali penurunan titik beku dari satu mol gula.'],
        ['Pada osmosis, zat terlarut berpindah melewati membran untuk menyamakan konsentrasi.', 'Zat terlarut tidak dapat melewati membran. Pelarutlah yang berpindah, dari sisi encer ke sisi pekat, sehingga larutan terencerkan dan permukaannya naik.'],
        ['Nilai i = 2 dan 3 itu eksak.', 'Itu batas ideal. Pembentukan pasangan ion membuat nilai nyata lebih kecil, sekitar 1,9 untuk NaCl 0,1 mol/kg dan 2,7 untuk CaCl₂, dan penyimpangannya bertambah dengan konsentrasi.'],
      ],
    },
    realWorld: {
      en: [
        'Road crews spread NaCl down to about −10 °C and switch to CaCl₂ for colder nights, because i ≈ 3 and its high solubility give a brine that stays liquid to about −50 °C.',
        'Engine antifreeze is ethylene glycol; a 50:50 mix with water (very far from dilute) protects to about −37 °C and also raises the boiling point to around 108 °C.',
        'Isotonic saline for intravenous drips is 0.9% NaCl so that its osmotic pressure matches blood cells; pure water would make red cells swell and burst.',
        'Reverse-osmosis desalination plants push seawater against membranes at 50–70 atm, well above its osmotic pressure of about 27 atm, to force fresh water out.',
        'Making ice cream with a salt–ice bath works because the brine can reach −20 °C, cold enough to freeze the sugary cream mixture, which itself freezes below 0 °C.',
      ],
      id: [
        'Petugas jalan menebar NaCl sampai sekitar −10 °C dan beralih ke CaCl₂ pada malam yang lebih dingin, karena i ≈ 3 dan kelarutannya tinggi menghasilkan air garam yang tetap cair sampai sekitar −50 °C.',
        'Antibeku mesin adalah etilen glikol; campuran 50:50 dengan air (sangat jauh dari encer) melindungi sampai sekitar −37 °C dan juga menaikkan titik didih ke sekitar 108 °C.',
        'Larutan garam isotonik untuk infus adalah NaCl 0,9% agar tekanan osmotiknya sama dengan sel darah; air murni akan membuat sel darah merah membengkak dan pecah.',
        'Instalasi desalinasi osmosis balik menekan air laut ke membran pada 50–70 atm, jauh di atas tekanan osmotiknya sekitar 27 atm, untuk memaksa air tawar keluar.',
        'Membuat es krim dengan rendaman es–garam berhasil karena air garamnya bisa mencapai −20 °C, cukup dingin untuk membekukan adonan krim bergula yang titik bekunya sendiri di bawah 0 °C.',
      ],
    },
    questions: {
      en: [
        { q: 'What is the freezing point of a solution of 58.5 g NaCl (1.00 mol) in 500 g of water? Take i = 2.', a: 'm = 1.00 mol / 0.500 kg = 2.00 mol/kg. ΔT_f = 2 × 1.86 × 2.00 = 7.44 K, so the solution freezes at about −7.4 °C.' },
        { q: 'A 0.10 mol/kg solution of an unknown salt freezes at −0.56 °C. How many ions does each formula unit release?', a: 'ΔT_f = 0.56 = i × 1.86 × 0.10, so i = 3.0. Each formula unit gives three particles, as in CaCl₂ or Na₂SO₄.' },
        { q: 'Estimate the osmotic pressure of 0.30 mol/L glucose at 37 °C and explain whether it is suitable for an intravenous drip.', a: 'π = 1 × 0.30 × 0.08206 × 310 = 7.6 atm, matching blood plasma. It is roughly isotonic, which is why 5% glucose (≈0.28 mol/L) is a standard IV fluid.' },
        { q: 'Why does the phase-diagram sketch show the freezing point moving much further than the boiling point for the same solution?', a: 'Because K_f (1.86 K·kg/mol) is 3.6 times K_b (0.512 K·kg/mol). Both shifts come from the same vapour-pressure lowering, but the solid–liquid boundary is far more sensitive to it than the liquid–vapour boundary.' },
      ],
      id: [
        { q: 'Berapa titik beku larutan 58,5 g NaCl (1,00 mol) dalam 500 g air? Ambil i = 2.', a: 'm = 1,00 mol / 0,500 kg = 2,00 mol/kg. ΔT_f = 2 × 1,86 × 2,00 = 7,44 K, sehingga larutan membeku pada sekitar −7,4 °C.' },
        { q: 'Larutan 0,10 mol/kg suatu garam tak dikenal membeku pada −0,56 °C. Berapa ion yang dilepaskan tiap satuan rumus?', a: 'ΔT_f = 0,56 = i × 1,86 × 0,10, sehingga i = 3,0. Tiap satuan rumus menghasilkan tiga partikel, seperti CaCl₂ atau Na₂SO₄.' },
        { q: 'Perkirakan tekanan osmotik glukosa 0,30 mol/L pada 37 °C dan jelaskan apakah cocok untuk infus.', a: 'π = 1 × 0,30 × 0,08206 × 310 = 7,6 atm, sama dengan plasma darah. Larutan ini kira-kira isotonik; itulah sebabnya glukosa 5% (≈0,28 mol/L) adalah cairan infus standar.' },
        { q: 'Mengapa sketsa diagram fase menunjukkan titik beku bergeser jauh lebih besar daripada titik didih untuk larutan yang sama?', a: 'Karena K_f (1,86 K·kg/mol) adalah 3,6 kali K_b (0,512 K·kg/mol). Kedua pergeseran berasal dari penurunan tekanan uap yang sama, tetapi batas padat–cair jauh lebih peka terhadapnya daripada batas cair–uap.' },
      ],
    },
  },
};
