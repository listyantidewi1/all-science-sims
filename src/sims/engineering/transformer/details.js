// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Apply V₂/V₁ = N₂/N₁ for ideal transformers.',
      'Apply I₁ V₁ = I₂ V₂ (power conservation).',
      'See why high-voltage transmission and step-down distribution exist.',
    ],
    id: [
      'Menerapkan V₂/V₁ = N₂/N₁ untuk transformator ideal.',
      'Menerapkan I₁ V₁ = I₂ V₂ (kekekalan daya).',
      'Memahami mengapa transmisi tegangan tinggi dan distribusi step-down ada.',
    ],
  },  tryThis: {
    en: [
      'N₁ = 100, N₂ = 1000 — step up 10×.',
      'N₁ = 1000, N₂ = 50 — step down 20× (typical pole transformer).',
      'Equal — 1:1 isolation transformer.',
    ],
    id: [
      'N₁ = 100, N₂ = 1000 — step up 10×.',
      'N₁ = 1000, N₂ = 50 — step down 20× (transformator tiang tipikal).',
      'Sama — transformator isolasi 1:1.',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'A transformer is two coils of insulated wire wound on the same iron core, with no electrical connection between them. An alternating current in the primary coil produces a magnetic flux that changes direction fifty or sixty times a second, and the iron core guides almost all of that flux through the secondary coil. By Faraday\'s law of induction, a changing flux induces a voltage in every turn of wire it passes through. Since the same flux threads every turn of both coils, each turn receives the same induced voltage, so the voltage of a coil is simply proportional to its number of turns: V₂/V₁ = N₂/N₁.',
        'If the secondary has more turns than the primary the voltage is stepped up; fewer turns step it down. An ideal transformer has no losses, so the power delivered to the load must equal the power drawn from the source: V₁I₁ = V₂I₂. Whatever factor the voltage goes up by, the current goes down by the same factor, I₁/I₂ = N₂/N₁. A transformer trades voltage for current the way a lever trades force for distance; it never creates power.',
        'The simulation applies exactly these two rules. The N₁ and N₂ sliders set the turns ratio, the V₁ slider sets the peak primary voltage and the load R sets how much current the secondary delivers. From these it computes V₂ = V₁·N₂/N₁, then I₂ = V₂/R by Ohm\'s law, then the primary current I₁ = I₂·N₂/N₁ needed to supply that power. Notice that changing R changes both currents but leaves V₂ untouched, because in the ideal model the secondary voltage is fixed by the turns ratio alone. The lab panel reports average power as V·I/2 because the sliders give peak values of a sine wave.',
        'Real transformers are very efficient, often above 95%, but not ideal. Resistance in the windings wastes power as heat, some flux leaks out of the core instead of linking both coils, and the core itself loses energy to eddy currents and to being magnetised back and forth each cycle (hysteresis). A real primary also draws a small magnetising current even when no load is connected, whereas the sim shows I₁ = 0 for an infinite load. Most importantly, a transformer needs a changing flux: connected to a steady DC supply, the sim\'s formulas would not apply and a real transformer would simply overheat.',
      ],
      id: [
        'Transformator adalah dua kumparan kawat berisolasi yang dililitkan pada inti besi yang sama, tanpa sambungan listrik di antara keduanya. Arus bolak-balik pada kumparan primer menghasilkan fluks magnet yang berbalik arah lima puluh atau enam puluh kali tiap sekon, dan inti besi mengarahkan hampir seluruh fluks itu melewati kumparan sekunder. Menurut hukum induksi Faraday, fluks yang berubah menginduksi tegangan pada setiap lilitan kawat yang dilewatinya. Karena fluks yang sama menembus setiap lilitan di kedua kumparan, tiap lilitan mendapat tegangan induksi yang sama, sehingga tegangan sebuah kumparan sebanding dengan jumlah lilitannya: V₂/V₁ = N₂/N₁.',
        'Jika sekunder punya lebih banyak lilitan daripada primer, tegangan dinaikkan (step-up); lebih sedikit lilitan menurunkannya (step-down). Transformator ideal tidak punya rugi-rugi, sehingga daya yang diberikan ke beban harus sama dengan daya yang ditarik dari sumber: V₁I₁ = V₂I₂. Berapa pun kelipatan kenaikan tegangannya, arus turun dengan kelipatan yang sama, I₁/I₂ = N₂/N₁. Transformator menukar tegangan dengan arus seperti tuas menukar gaya dengan jarak; ia tidak pernah menciptakan daya.',
        'Simulasi menerapkan tepat kedua aturan itu. Slider N₁ dan N₂ mengatur rasio lilitan, slider V₁ mengatur tegangan puncak primer, dan beban R menentukan seberapa besar arus yang dialirkan sekunder. Dari sini dihitung V₂ = V₁·N₂/N₁, lalu I₂ = V₂/R menurut hukum Ohm, lalu arus primer I₁ = I₂·N₂/N₁ yang diperlukan untuk memasok daya itu. Perhatikan bahwa mengubah R mengubah kedua arus tetapi tidak mengubah V₂, karena dalam model ideal tegangan sekunder hanya ditentukan oleh rasio lilitan. Panel lab melaporkan daya rata-rata sebagai V·I/2 karena slider memberikan nilai puncak gelombang sinus.',
        'Transformator nyata sangat efisien, sering di atas 95%, tetapi tidak ideal. Hambatan kawat lilitan membuang daya sebagai panas, sebagian fluks bocor keluar inti dan tidak menembus kedua kumparan, dan inti sendiri kehilangan energi karena arus eddy dan karena dimagnetkan bolak-balik tiap siklus (histeresis). Primer nyata juga menarik arus magnetisasi kecil walau tidak ada beban terpasang, sedangkan simulasi menunjukkan I₁ = 0 untuk beban tak hingga. Yang terpenting, transformator memerlukan fluks yang berubah: jika dihubungkan ke sumber DC yang tetap, rumus di simulasi tidak berlaku dan transformator nyata hanya akan menjadi panas.',
      ],
    },
    figure: {
      caption: {
        en: 'The changing flux Φ set up by the primary runs around the iron core and threads every turn of the secondary. Each turn gets the same induced voltage, so with twice the turns the secondary gives twice the voltage and, for the same power, half the current.',
        id: 'Fluks Φ yang berubah, dibangkitkan oleh primer, mengalir mengitari inti besi dan menembus setiap lilitan sekunder. Tiap lilitan mendapat tegangan induksi yang sama, sehingga dengan lilitan dua kali lipat sekunder memberi tegangan dua kali lipat dan, untuk daya yang sama, arus setengahnya.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Two coils on an iron core with a 3 to 6 turns ratio', 'Dua kumparan pada inti besi dengan rasio lilitan 3 banding 6')}">
  <style>text{font:12px system-ui,sans-serif;fill:currentColor}.w{fill:none;stroke:currentColor;stroke-width:1.6}.s{font-size:10px}.t{fill:none;stroke-width:2.2}</style>
  <path d="M100 50 H260 V190 H100 Z M130 80 H230 V160 H130 Z" fill="currentColor" fill-opacity=".15" fill-rule="evenodd" stroke="currentColor" stroke-width="1.4"/>
  <path d="M115 65 H245 V175 H115 Z" fill="none" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="5 4"/>
  <path d="M165 65 L200 65" stroke="#f59e0b" stroke-width="1.5" fill="none" marker-end="url(#a)"/>
  <path d="M200 175 L165 175" stroke="#f59e0b" stroke-width="1.5" fill="none" marker-end="url(#a)"/>
  <text x="180" y="78" text-anchor="middle" fill="#f59e0b" class="s">Φ ${L('changing flux', 'fluks berubah')}</text>
  <ellipse cx="115" cy="95" rx="22" ry="8" class="t" stroke="#3b82f6"/>
  <ellipse cx="115" cy="120" rx="22" ry="8" class="t" stroke="#3b82f6"/>
  <ellipse cx="115" cy="145" rx="22" ry="8" class="t" stroke="#3b82f6"/>
  <ellipse cx="245" cy="85" rx="22" ry="7" class="t" stroke="#10b981"/>
  <ellipse cx="245" cy="97" rx="22" ry="7" class="t" stroke="#10b981"/>
  <ellipse cx="245" cy="109" rx="22" ry="7" class="t" stroke="#10b981"/>
  <ellipse cx="245" cy="121" rx="22" ry="7" class="t" stroke="#10b981"/>
  <ellipse cx="245" cy="133" rx="22" ry="7" class="t" stroke="#10b981"/>
  <ellipse cx="245" cy="145" rx="22" ry="7" class="t" stroke="#10b981"/>
  <path d="M93 95 H40 V108" class="w"/>
  <path d="M93 145 H40 V132" class="w"/>
  <circle cx="40" cy="120" r="12" class="w"/>
  <text x="40" y="125" text-anchor="middle">~</text>
  <text x="40" y="160" text-anchor="middle" fill="#3b82f6" font-weight="bold">V₁</text>
  <text x="115" y="212" text-anchor="middle" fill="#3b82f6" font-weight="bold">N₁ = 3</text>
  <text x="115" y="226" text-anchor="middle" fill="#3b82f6" class="s">${L('primary', 'primer')}</text>
  <path d="M267 85 H320 V100" class="w"/>
  <path d="M267 145 H320 V130" class="w"/>
  <path d="M320 100 L327 104 L313 110 L327 116 L313 122 L320 130" class="w"/>
  <text x="334" y="119" class="s">R</text>
  <text x="300" y="166" text-anchor="middle" fill="#10b981" font-weight="bold">V₂ = 2·V₁</text>
  <text x="300" y="181" text-anchor="middle" fill="#10b981" class="s">I₂ = I₁ / 2</text>
  <text x="245" y="212" text-anchor="middle" fill="#10b981" font-weight="bold">N₂ = 6</text>
  <text x="245" y="226" text-anchor="middle" fill="#10b981" class="s">${L('secondary', 'sekunder')}</text>
  <text x="180" y="40" text-anchor="middle" class="s">${L('iron core', 'inti besi')}</text>
  <text x="180" y="20" text-anchor="middle">${L('V₂ / V₁ = N₂ / N₁ = 6 / 3 = 2 (step-up)', 'V₂ / V₁ = N₂ / N₁ = 6 / 3 = 2 (step-up)')}</text>
  <defs><marker id="a" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="context-stroke"/></marker></defs>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'A changing magnetic flux in the shared core induces the same voltage in every turn, so V₂/V₁ = N₂/N₁.',
        'More secondary turns step the voltage up; fewer step it down.',
        'An ideal transformer conserves power, V₁I₁ = V₂I₂, so the current changes by the inverse of the voltage ratio.',
        'Transformers only work with alternating current, because only a changing flux induces a voltage.',
        'Transmitting at high voltage and low current cuts the I²R heating loss in the wires.',
      ],
      id: [
        'Fluks magnet yang berubah pada inti bersama menginduksi tegangan yang sama di tiap lilitan, sehingga V₂/V₁ = N₂/N₁.',
        'Lilitan sekunder yang lebih banyak menaikkan tegangan; yang lebih sedikit menurunkannya.',
        'Transformator ideal mengekalkan daya, V₁I₁ = V₂I₂, sehingga arus berubah dengan kebalikan rasio tegangan.',
        'Transformator hanya bekerja dengan arus bolak-balik, karena hanya fluks yang berubah yang menginduksi tegangan.',
        'Transmisi pada tegangan tinggi dan arus rendah memangkas rugi panas I²R di kawat.',
      ],
    },
    vocabulary: {
      en: [
        ['Primary coil', 'The winding connected to the AC source; its current sets up the flux in the core.'],
        ['Secondary coil', 'The winding connected to the load; the changing flux induces its output voltage.'],
        ['Turns ratio', 'N₂/N₁, the number of secondary turns divided by primary turns; equal to the voltage ratio of an ideal transformer.'],
        ['Magnetic flux (Φ)', 'A measure of how much magnetic field passes through a loop; its rate of change sets the induced voltage.'],
        ['Electromagnetic induction', 'Faraday\'s law: a voltage is induced in a coil equal to the number of turns times the rate of change of flux through it.'],
        ['Step-up / step-down', 'A transformer whose secondary voltage is higher / lower than its primary voltage.'],
        ['Ideal transformer', 'A model with no winding resistance, no leakage flux, no core losses and no magnetising current, so power in equals power out.'],
        ['Core losses', 'Energy wasted in the iron each cycle through eddy currents and hysteresis; reduced by laminating the core.'],
      ],
      id: [
        ['Kumparan primer', 'Lilitan yang terhubung ke sumber AC; arusnya membangkitkan fluks di inti.'],
        ['Kumparan sekunder', 'Lilitan yang terhubung ke beban; fluks yang berubah menginduksi tegangan keluarannya.'],
        ['Rasio lilitan', 'N₂/N₁, jumlah lilitan sekunder dibagi lilitan primer; sama dengan rasio tegangan transformator ideal.'],
        ['Fluks magnet (Φ)', 'Ukuran banyaknya medan magnet yang menembus sebuah loop; laju perubahannya menentukan tegangan induksi.'],
        ['Induksi elektromagnetik', 'Hukum Faraday: tegangan yang terinduksi pada kumparan sama dengan jumlah lilitan dikali laju perubahan fluks yang menembusnya.'],
        ['Step-up / step-down', 'Transformator dengan tegangan sekunder lebih tinggi / lebih rendah daripada tegangan primernya.'],
        ['Transformator ideal', 'Model tanpa hambatan lilitan, tanpa fluks bocor, tanpa rugi inti, dan tanpa arus magnetisasi, sehingga daya masuk sama dengan daya keluar.'],
        ['Rugi inti', 'Energi yang terbuang di besi tiap siklus melalui arus eddy dan histeresis; dikurangi dengan membuat inti berlapis-lapis.'],
      ],
    },
    misconceptions: {
      en: [
        ['A step-up transformer gives you more power.', 'It gives more voltage but proportionally less current. Power out can never exceed power in; in a real transformer it is a few percent less.'],
        ['The current is stepped up along with the voltage.', 'The current changes the opposite way. Stepping the voltage up ten times steps the current down ten times, so that V·I stays the same.'],
        ['A transformer can change a DC voltage too.', 'A steady current produces a steady flux, and a steady flux induces nothing. Transformers need AC (or at least a changing current); DC-to-DC converters first chop the DC into pulses before using a transformer.'],
        ['Electricity flows from the primary through the iron core to the secondary.', 'The two coils are electrically insulated from each other. Only magnetic flux links them, which is why a 1:1 transformer is used for isolation.'],
      ],
      id: [
        ['Transformator step-up memberi daya lebih besar.', 'Ia memberi tegangan lebih besar tetapi arus yang lebih kecil secara sebanding. Daya keluar tidak pernah melebihi daya masuk; pada transformator nyata justru beberapa persen lebih kecil.'],
        ['Arus ikut dinaikkan bersama tegangan.', 'Arus berubah ke arah sebaliknya. Menaikkan tegangan sepuluh kali menurunkan arus sepuluh kali, sehingga V·I tetap sama.'],
        ['Transformator juga bisa mengubah tegangan DC.', 'Arus tetap menghasilkan fluks tetap, dan fluks tetap tidak menginduksi apa-apa. Transformator memerlukan AC (atau setidaknya arus yang berubah); konverter DC-ke-DC lebih dulu mencacah DC menjadi pulsa sebelum memakai transformator.'],
        ['Listrik mengalir dari primer melalui inti besi ke sekunder.', 'Kedua kumparan terisolasi secara listrik satu sama lain. Hanya fluks magnet yang menghubungkan keduanya, itulah sebabnya transformator 1:1 dipakai untuk isolasi.'],
      ],
    },
    realWorld: {
      en: [
        'Power stations step voltage up to hundreds of kilovolts for long-distance transmission, then substations and pole-mounted transformers step it down in stages to the 220 V or 120 V used in homes.',
        'A phone charger contains a tiny transformer; it first converts mains AC to high-frequency pulses so that the transformer can be small and light.',
        'A microwave oven uses a step-up transformer to produce about 2 kV for the magnetron, while an arc welder uses a step-down transformer to deliver hundreds of amps at a low, safer voltage.',
        'Hospitals and electronics labs use 1:1 isolation transformers so that equipment is not directly connected to the mains, reducing shock hazards.',
      ],
      id: [
        'Pembangkit listrik menaikkan tegangan hingga ratusan kilovolt untuk transmisi jarak jauh, lalu gardu induk dan trafo tiang menurunkannya bertahap sampai 220 V yang dipakai di rumah.',
        'Pengisi daya ponsel berisi transformator mungil; ia lebih dulu mengubah AC jala-jala menjadi pulsa frekuensi tinggi supaya transformatornya bisa kecil dan ringan.',
        'Oven microwave memakai transformator step-up untuk menghasilkan sekitar 2 kV bagi magnetron, sedangkan mesin las busur memakai transformator step-down untuk mengalirkan ratusan amper pada tegangan rendah yang lebih aman.',
        'Rumah sakit dan laboratorium elektronika memakai transformator isolasi 1:1 agar peralatan tidak tersambung langsung ke jala-jala, sehingga risiko sengatan berkurang.',
      ],
    },
    questions: {
      en: [
        { q: 'A 120 V supply must power a 12 V appliance. The primary has 600 turns. How many secondary turns are needed, and if the appliance draws 2 A, what current flows in the primary?', a: 'N₂ = N₁·V₂/V₁ = 600 × 12/120 = 60 turns. Power is conserved: 12 V × 2 A = 24 W, so I₁ = 24 W / 120 V = 0.2 A, one tenth of the secondary current.' },
        { q: 'Set N₁ = 100, N₂ = 1000, V₁ = 120 V and R = 100 Ω. Predict V₂, I₂ and I₁ before reading them off.', a: 'V₂ = 120 × 1000/100 = 1200 V. I₂ = 1200/100 = 12 A. I₁ = I₂ × N₂/N₁ = 12 × 10 = 120 A. Check: 120 V × 120 A = 1200 V × 12 A = 14 400 (both the same peak power).' },
        { q: 'A town needs 1 MW of power. Why does the grid deliver it at 150 kV rather than 220 V?', a: 'At 220 V the current would be about 4500 A; at 150 kV it is under 7 A. Heating loss in the wires is I²R, so cutting the current by a factor of about 680 cuts the loss by about 460 000 times for the same cable. Transformers make this possible by stepping the voltage up at the source and down again near the consumer.' },
      ],
      id: [
        { q: 'Sumber 120 V harus memberi daya pada alat 12 V. Primer punya 600 lilitan. Berapa lilitan sekunder yang diperlukan, dan jika alat menarik 2 A, berapa arus di primer?', a: 'N₂ = N₁·V₂/V₁ = 600 × 12/120 = 60 lilitan. Daya kekal: 12 V × 2 A = 24 W, sehingga I₁ = 24 W / 120 V = 0,2 A, sepersepuluh arus sekunder.' },
        { q: 'Atur N₁ = 100, N₂ = 1000, V₁ = 120 V, dan R = 100 Ω. Perkirakan V₂, I₂, dan I₁ sebelum membacanya di layar.', a: 'V₂ = 120 × 1000/100 = 1200 V. I₂ = 1200/100 = 12 A. I₁ = I₂ × N₂/N₁ = 12 × 10 = 120 A. Periksa: 120 V × 120 A = 1200 V × 12 A = 14.400 (daya puncak yang sama di kedua sisi).' },
        { q: 'Sebuah kota memerlukan daya 1 MW. Mengapa jaringan listrik mengirimnya pada 150 kV, bukan 220 V?', a: 'Pada 220 V arusnya sekitar 4500 A; pada 150 kV kurang dari 7 A. Rugi panas di kawat adalah I²R, sehingga memperkecil arus sekitar 680 kali memangkas rugi sekitar 460.000 kali untuk kabel yang sama. Transformator memungkinkan ini dengan menaikkan tegangan di sumber dan menurunkannya lagi di dekat konsumen.' },
      ],
    },
  },
};
