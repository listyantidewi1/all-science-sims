export default {
  objectives: {
    en: [
      'Classify solutions as strong electrolytes, weak electrolytes or non-electrolytes from the brightness of a bulb and the current measured.',
      'Relate conductivity to the concentration of free ions and explain why molecular solutes such as sugar and ethanol do not conduct.',
      'Calculate the degree of ionisation α of a weak acid or base from its equilibrium constant and show that it rises as the solution is diluted.',
    ],
    id: [
      'Menggolongkan larutan sebagai elektrolit kuat, elektrolit lemah, atau nonelektrolit dari nyala lampu dan arus yang terukur.',
      'Menghubungkan daya hantar dengan konsentrasi ion bebas dan menjelaskan mengapa zat terlarut molekuler seperti gula dan etanol tidak menghantar.',
      'Menghitung derajat ionisasi α asam atau basa lemah dari tetapan kesetimbangannya dan menunjukkan bahwa α naik ketika larutan diencerkan.',
    ],
  },
  tryThis: {
    en: [
      'Keep c = 0.1 mol/L and step through all eight solutions. Which light the bulb brightly, which only dimly, and which not at all?',
      'Compare HCl and acetic acid at the same concentration. Both are acids: why is the current about 100 times smaller for acetic acid?',
      'For acetic acid, slide the concentration down from 1 to 0.001 mol/L and watch α. Does more ionisation mean more current?',
      'Switch to pure water and read the ammeter. Why does tap water in a real bathroom still conduct dangerously well?',
    ],
    id: [
      'Pertahankan c = 0,1 mol/L dan coba kedelapan larutan. Mana yang menyalakan lampu dengan terang, mana yang redup, dan mana yang tidak menyala?',
      'Bandingkan HCl dan asam asetat pada konsentrasi yang sama. Keduanya asam: mengapa arus pada asam asetat sekitar 100 kali lebih kecil?',
      'Untuk asam asetat, geser konsentrasi dari 1 ke 0,001 mol/L dan amati α. Apakah ionisasi yang lebih besar berarti arus lebih besar?',
      'Pilih air murni dan baca amperemeter. Mengapa air keran di kamar mandi sungguhan tetap menghantar listrik dengan berbahaya?',
    ],
  },

  learn: {
    background: {
      en: [
        'A solid metal conducts because its electrons are free to move. A liquid conducts only if it contains charged particles that can move: ions. When a conductivity tester is dipped into a solution, cations drift towards the negative electrode and anions towards the positive one, and this movement of charge is the current that lights the bulb. Pure water contains only about 10⁻⁷ mol/L of H⁺ and OH⁻ from its own autoionisation, so it is a very poor conductor (κ ≈ 5.5 × 10⁻⁸ S/cm).',
        'Ionic compounds such as NaCl, and strong acids and bases such as HCl and NaOH, separate completely into ions when they dissolve: the degree of ionisation α is 1 and they are strong electrolytes. Weak acids and bases such as acetic acid and ammonia reach an equilibrium in which only a small fraction of molecules is ionised; for CH₃COOH with K_a = 1.8 × 10⁻⁵ at 0.1 mol/L, α is only 0.013. They are weak electrolytes and give a dim glow. Molecular compounds such as sucrose and ethanol dissolve as whole neutral molecules, produce no ions, and are non-electrolytes: the bulb stays dark however concentrated the solution.',
        'The simulation models conductivity as κ = Λ°·α·c, where Λ° is the limiting molar conductivity of the dissolved ions (in S·cm²/mol) and c is the concentration in mol/cm³. The current through electrodes of area A at a separation d under a voltage V is I = κ·(A/d)·V. Doubling the concentration of a strong electrolyte roughly doubles the current. For a weak electrolyte the relationship is weaker: as c falls, α rises (Ostwald’s dilution law, K = cα²/(1 − α)), so the ion concentration α·c falls more slowly than c. In real solutions the molar conductivity also decreases slightly at high concentration because the ions hinder each other, an effect the simulation leaves out.',
        'Not all ions are equally good at carrying current. Λ° depends on how fast an ion moves in the electric field: H⁺ (350 S·cm²/mol) and OH⁻ (198) are far faster than Na⁺ (50) or Cl⁻ (76) because they hop between water molecules rather than pushing through them. This is why 1 mol/L HCl gives a bigger current than 1 mol/L NaCl even though both are fully ionised. The ammeter in the simulation uses a logarithmic scale so that the nanoamps of pure water and the amps of concentrated acid fit on one dial.',
      ],
      id: [
        'Logam padat menghantar karena elektronnya bebas bergerak. Cairan hanya menghantar jika mengandung partikel bermuatan yang dapat bergerak: ion. Ketika alat uji daya hantar dicelupkan ke dalam larutan, kation bergerak menuju elektrode negatif dan anion menuju elektrode positif, dan perpindahan muatan inilah arus yang menyalakan lampu. Air murni hanya mengandung sekitar 10⁻⁷ mol/L H⁺ dan OH⁻ dari autoionisasinya, sehingga menjadi penghantar yang sangat buruk (κ ≈ 5,5 × 10⁻⁸ S/cm).',
        'Senyawa ion seperti NaCl, serta asam dan basa kuat seperti HCl dan NaOH, terurai sempurna menjadi ion ketika melarut: derajat ionisasi α = 1 dan semuanya elektrolit kuat. Asam dan basa lemah seperti asam asetat dan amonia mencapai kesetimbangan dengan hanya sebagian kecil molekul yang terionisasi; untuk CH₃COOH dengan K_a = 1,8 × 10⁻⁵ pada 0,1 mol/L, α hanya 0,013. Keduanya elektrolit lemah dan memberikan nyala redup. Senyawa molekuler seperti sukrosa dan etanol melarut sebagai molekul netral utuh, tidak menghasilkan ion, dan merupakan nonelektrolit: lampu tetap mati seberapa pun pekat larutannya.',
        'Simulasi memodelkan daya hantar sebagai κ = Λ°·α·c, dengan Λ° hantaran molar batas ion-ion terlarut (dalam S·cm²/mol) dan c konsentrasi dalam mol/cm³. Arus melalui elektrode berluas A pada jarak d dengan tegangan V adalah I = κ·(A/d)·V. Menggandakan konsentrasi elektrolit kuat kira-kira menggandakan arus. Untuk elektrolit lemah hubungannya lebih lemah: saat c turun, α naik (hukum pengenceran Ostwald, K = cα²/(1 − α)), sehingga konsentrasi ion α·c turun lebih lambat daripada c. Dalam larutan nyata hantaran molar juga sedikit turun pada konsentrasi tinggi karena ion-ion saling menghambat, efek yang tidak dimasukkan dalam simulasi.',
        'Tidak semua ion sama baiknya dalam membawa arus. Λ° bergantung pada seberapa cepat ion bergerak dalam medan listrik: H⁺ (350 S·cm²/mol) dan OH⁻ (198) jauh lebih cepat daripada Na⁺ (50) atau Cl⁻ (76) karena keduanya melompat antarmolekul air, bukan mendesak di antaranya. Itulah sebabnya HCl 1 mol/L memberikan arus lebih besar daripada NaCl 1 mol/L meskipun keduanya terionisasi sempurna. Amperemeter dalam simulasi memakai skala logaritmik agar nanoampere air murni dan ampere asam pekat muat dalam satu dial.',
      ],
    },
    figure: {
      caption: {
        en: 'Three beakers at the same concentration: a strong electrolyte (all ions, bright bulb), a weak electrolyte (few ions among many molecules, dim bulb) and a non-electrolyte (molecules only, bulb off).',
        id: 'Tiga gelas kimia pada konsentrasi yang sama: elektrolit kuat (semua ion, lampu terang), elektrolit lemah (sedikit ion di antara banyak molekul, lampu redup), dan nonelektrolit (hanya molekul, lampu mati).',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        const ion = (x, y, neg) => `<circle cx="${x}" cy="${y}" r="5" fill="${neg ? '#4ade80' : '#f87171'}"/><text x="${x}" y="${y + 3.5}" text-anchor="middle" style="font-size:9px;fill:#0b1220">${neg ? '−' : '+'}</text>`;
        const mol = (x, y) => `<circle cx="${x}" cy="${y}" r="5.5" fill="#fde68a"/>`;
        const beaker = (x, glow, label, particles) => `
  <rect x="${x}" y="110" width="90" height="90" fill="none" stroke="currentColor" stroke-width="1.6"/>
  <line x1="${x}" y1="125" x2="${x + 90}" y2="125" stroke="currentColor" stroke-width="1" opacity=".4"/>
  <rect x="${x + 22}" y="95" width="5" height="80" fill="currentColor" opacity=".55"/>
  <rect x="${x + 63}" y="95" width="5" height="80" fill="currentColor" opacity=".55"/>
  <path d="M${x + 24.5} 95 L${x + 24.5} 70 L${x + 38} 70 M${x + 52} 70 L${x + 65.5} 70 L${x + 65.5} 95" fill="none" stroke="currentColor" stroke-width="1.4"/>
  ${glow > 0 ? `<circle cx="${x + 45}" cy="70" r="${12 + glow * 10}" fill="#fde047" opacity="${(0.25 * glow).toFixed(2)}"/>` : ''}
  <circle cx="${x + 45}" cy="70" r="8" fill="${glow > 0 ? '#fde047' : 'none'}" fill-opacity="${(0.3 + 0.7 * glow).toFixed(2)}" stroke="currentColor" stroke-width="1.4"/>
  ${particles}
  <text x="${x + 45}" y="222" text-anchor="middle" class="s">${label}</text>`;
        const strong = [[30, 140, 0], [55, 150, 1], [40, 175, 1], [70, 165, 0], [60, 190, 1], [35, 190, 0], [75, 140, 1], [50, 135, 0]].map(([dx, dy, n]) => ion(16 + dx, dy, n)).join('');
        const weak = [[30, 140], [55, 150], [40, 175], [70, 165], [60, 190], [35, 190], [75, 140]].map(([dx, dy]) => mol(136 + dx, dy)).join('') + ion(136 + 50, 135, 0) + ion(136 + 50, 183, 1);
        const non = [[30, 140], [55, 150], [40, 175], [70, 165], [60, 190], [35, 190], [75, 140], [50, 135]].map(([dx, dy]) => mol(256 + dx, dy)).join('');
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Strong, weak and non-electrolyte', 'Elektrolit kuat, lemah, dan nonelektrolit')}">
  <style>text{font:12px system-ui,sans-serif;fill:currentColor}.s{font-size:10.5px;opacity:.85}</style>
  <text x="180" y="18" text-anchor="middle">${L('same concentration, different numbers of ions', 'konsentrasi sama, jumlah ion berbeda')}</text>
  <text x="61" y="42" text-anchor="middle" class="s">α = 1</text>
  <text x="181" y="42" text-anchor="middle" class="s">α ≈ 0.01</text>
  <text x="301" y="42" text-anchor="middle" class="s">α = 0</text>
  ${beaker(16, 1, L('strong: NaCl, HCl, NaOH', 'kuat: NaCl, HCl, NaOH'), strong)}
  ${beaker(136, 0.35, L('weak: CH₃COOH, NH₃', 'lemah: CH₃COOH, NH₃'), weak)}
  ${beaker(256, 0, L('non: sugar, ethanol', 'non: gula, etanol'), non)}
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'A solution conducts electricity only if it contains mobile ions; neutral molecules carry no current.',
        'Strong electrolytes (ionic salts, strong acids and bases) are completely ionised, α = 1; weak electrolytes are only partly ionised, 0 < α ≪ 1; non-electrolytes have α = 0.',
        'Current is proportional to the ion concentration α·c and to how fast the ions move (their molar conductivity Λ°).',
        'For a weak electrolyte, α increases on dilution (Ostwald’s law K = cα²/(1 − α)), but the total ion concentration still falls.',
        'H⁺ and OH⁻ conduct far better than other ions, so acids and bases of equal concentration can give very different currents from salts.',
        'Pure water is a very poor conductor; the conductivity of tap water comes from dissolved minerals.',
      ],
      id: [
        'Larutan menghantar listrik hanya jika mengandung ion yang dapat bergerak; molekul netral tidak membawa arus.',
        'Elektrolit kuat (garam ion, asam dan basa kuat) terionisasi sempurna, α = 1; elektrolit lemah hanya terionisasi sebagian, 0 < α ≪ 1; nonelektrolit α = 0.',
        'Arus sebanding dengan konsentrasi ion α·c dan dengan kecepatan gerak ion (hantaran molarnya Λ°).',
        'Untuk elektrolit lemah, α bertambah saat diencerkan (hukum Ostwald K = cα²/(1 − α)), tetapi konsentrasi ion total tetap turun.',
        'H⁺ dan OH⁻ menghantar jauh lebih baik daripada ion lain, sehingga asam dan basa dengan konsentrasi yang sama dapat memberikan arus yang sangat berbeda dari garam.',
        'Air murni adalah penghantar yang sangat buruk; daya hantar air keran berasal dari mineral terlarut.',
      ],
    },
    vocabulary: {
      en: [
        ['Electrolyte', 'A substance whose aqueous solution conducts electricity because it contains ions.'],
        ['Non-electrolyte', 'A substance that dissolves as neutral molecules and whose solution does not conduct.'],
        ['Degree of ionisation (α)', 'The fraction of dissolved formula units that have separated into ions, from 0 to 1.'],
        ['Conductivity (κ)', 'The ability of a solution to carry current, in S/cm; proportional to the concentration and mobility of its ions.'],
        ['Molar conductivity (Λ)', 'Conductivity per mole of dissolved electrolyte, S·cm²/mol; its value at infinite dilution is Λ°.'],
        ['Ostwald’s dilution law', 'For a weak electrolyte K = cα²/(1 − α); as c decreases, α increases.'],
      ],
      id: [
        ['Elektrolit', 'Zat yang larutannya dalam air menghantar listrik karena mengandung ion.'],
        ['Nonelektrolit', 'Zat yang melarut sebagai molekul netral dan larutannya tidak menghantar.'],
        ['Derajat ionisasi (α)', 'Fraksi satuan rumus terlarut yang telah terurai menjadi ion, dari 0 sampai 1.'],
        ['Daya hantar (κ)', 'Kemampuan larutan membawa arus, dalam S/cm; sebanding dengan konsentrasi dan mobilitas ionnya.'],
        ['Hantaran molar (Λ)', 'Daya hantar per mol elektrolit terlarut, S·cm²/mol; nilainya pada pengenceran tak hingga adalah Λ°.'],
        ['Hukum pengenceran Ostwald', 'Untuk elektrolit lemah K = cα²/(1 − α); saat c berkurang, α bertambah.'],
      ],
    },
    misconceptions: {
      en: [
        ['Anything that dissolves in water makes it conduct.', 'Only solutes that produce ions do. Sugar and ethanol dissolve completely yet their solutions conduct no better than pure water.'],
        ['A weak electrolyte is a dilute solution of a strong one.', 'Weak and strong describe the degree of ionisation, not the concentration. Concentrated acetic acid is still a weak electrolyte; very dilute HCl is still a strong one.'],
        ['Electrons flow through the solution between the electrodes.', 'Inside the solution the charge is carried by ions moving in opposite directions. Electrons flow only in the metal wires and electrodes.'],
        ['Because α rises on dilution, a weak acid conducts better when diluted.', 'α rises but the total number of ions per litre, α·c, still falls, so the current decreases, just more slowly than for a strong electrolyte.'],
      ],
      id: [
        ['Apa pun yang larut dalam air membuatnya menghantar.', 'Hanya zat terlarut yang menghasilkan ion yang membuatnya menghantar. Gula dan etanol larut sempurna tetapi larutannya tidak lebih menghantar daripada air murni.'],
        ['Elektrolit lemah adalah larutan encer dari elektrolit kuat.', 'Lemah dan kuat menggambarkan derajat ionisasi, bukan konsentrasi. Asam asetat pekat tetap elektrolit lemah; HCl yang sangat encer tetap elektrolit kuat.'],
        ['Elektron mengalir melalui larutan di antara elektrode.', 'Di dalam larutan muatan dibawa oleh ion yang bergerak berlawanan arah. Elektron hanya mengalir dalam kawat logam dan elektrode.'],
        ['Karena α naik saat diencerkan, asam lemah menghantar lebih baik ketika diencerkan.', 'α naik tetapi jumlah ion total per liter, α·c, tetap turun, sehingga arus berkurang, hanya lebih lambat daripada pada elektrolit kuat.'],
      ],
    },
    realWorld: {
      en: [
        'Water-quality meters report total dissolved solids by measuring conductivity: drinking water is typically 50–500 µS/cm, seawater about 50 000 µS/cm.',
        'Electrical safety rules for bathrooms exist because tap water contains enough dissolved minerals to conduct, even though pure water barely does.',
        'Sports drinks and oral rehydration salts are called "electrolytes" because the Na⁺, K⁺ and Cl⁻ ions they contain are exactly what makes them conduct, and what nerves and muscles need.',
        'Car batteries use sulfuric acid, a strong electrolyte, so that large currents can flow; a hydrometer or conductivity check tells a mechanic how charged the battery is.',
        'Conductivity sensors in hydroponic farms monitor nutrient concentration continuously, since the fertiliser salts are all strong electrolytes.',
      ],
      id: [
        'Alat ukur kualitas air melaporkan zat padat terlarut total dengan mengukur daya hantar: air minum biasanya 50–500 µS/cm, air laut sekitar 50.000 µS/cm.',
        'Aturan keselamatan listrik di kamar mandi ada karena air keran mengandung cukup mineral terlarut untuk menghantar, meskipun air murni hampir tidak menghantar.',
        'Minuman olahraga dan garam rehidrasi oral disebut "elektrolit" karena ion Na⁺, K⁺, dan Cl⁻ di dalamnya tepat yang membuatnya menghantar, dan yang dibutuhkan saraf dan otot.',
        'Aki mobil memakai asam sulfat, elektrolit kuat, agar arus besar dapat mengalir; pengecekan hidrometer atau daya hantar memberi tahu mekanik seberapa penuh muatan aki.',
        'Sensor daya hantar di kebun hidroponik memantau konsentrasi nutrisi terus-menerus, karena garam pupuk semuanya elektrolit kuat.',
      ],
    },
    questions: {
      en: [
        { q: 'A 0.10 mol/L solution of acetic acid (K_a = 1.8 × 10⁻⁵) is tested. Estimate α and the H⁺ concentration.', a: 'Using K = cα² for small α: α = √(1.8 × 10⁻⁵ / 0.10) = 0.0134, so [H⁺] = α·c ≈ 1.3 × 10⁻³ mol/L. Only about 1 molecule in 75 is ionised.' },
        { q: '1.0 mol/L HCl and 1.0 mol/L NaCl both have α = 1. Why does HCl give roughly three times the current?', a: 'The current depends on ion mobility as well as number. H⁺ (Λ° ≈ 350 S·cm²/mol) moves about seven times faster than Na⁺ (≈50), so Λ° is 426 for HCl but only 126 for NaCl.' },
        { q: 'Sugar solution and salt solution look identical. Describe a quick test to tell them apart and explain the result at the particle level.', a: 'Dip a conductivity tester in each. The salt solution lights the bulb because NaCl separates into mobile Na⁺ and Cl⁻ ions; the sugar solution does not, because sucrose dissolves as neutral molecules that carry no charge.' },
        { q: 'When acetic acid is diluted tenfold, α increases about threefold. Does the current increase or decrease?', a: 'It decreases. The ion concentration is α·c: c drops by 10 while α rises only by about √10 ≈ 3.2, so α·c falls by a factor of about 3.' },
      ],
      id: [
        { q: 'Larutan asam asetat 0,10 mol/L (K_a = 1,8 × 10⁻⁵) diuji. Perkirakan α dan konsentrasi H⁺.', a: 'Dengan K = cα² untuk α kecil: α = √(1,8 × 10⁻⁵ / 0,10) = 0,0134, sehingga [H⁺] = α·c ≈ 1,3 × 10⁻³ mol/L. Hanya sekitar 1 dari 75 molekul yang terionisasi.' },
        { q: 'HCl 1,0 mol/L dan NaCl 1,0 mol/L keduanya memiliki α = 1. Mengapa HCl memberikan arus sekitar tiga kali lebih besar?', a: 'Arus bergantung pada mobilitas ion, bukan hanya jumlahnya. H⁺ (Λ° ≈ 350 S·cm²/mol) bergerak sekitar tujuh kali lebih cepat daripada Na⁺ (≈50), sehingga Λ° HCl 426 sedangkan NaCl hanya 126.' },
        { q: 'Larutan gula dan larutan garam tampak sama. Jelaskan uji cepat untuk membedakannya dan terangkan hasilnya pada tingkat partikel.', a: 'Celupkan alat uji daya hantar ke masing-masing. Larutan garam menyalakan lampu karena NaCl terurai menjadi ion Na⁺ dan Cl⁻ yang bergerak; larutan gula tidak, karena sukrosa melarut sebagai molekul netral yang tidak membawa muatan.' },
        { q: 'Ketika asam asetat diencerkan sepuluh kali, α naik sekitar tiga kali. Apakah arus naik atau turun?', a: 'Turun. Konsentrasi ion adalah α·c: c turun 10 kali sedangkan α hanya naik sekitar √10 ≈ 3,2 kali, sehingga α·c turun sekitar 3 kali.' },
      ],
    },
  },
};
