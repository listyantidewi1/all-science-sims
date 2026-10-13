// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Apply E°_cell = E°_cathode − E°_anode.',
      'Identify oxidation (anode) and reduction (cathode).',
      'Connect electron flow direction to which metal is "more active".',
    ],
    id: [
      'Menerapkan E°_sel = E°_katoda − E°_anoda.',
      'Mengenali oksidasi (anoda) dan reduksi (katoda).',
      'Mengaitkan arah aliran elektron dengan logam mana yang lebih aktif.',
    ],
  },
  tryThis: {
    en: [
      'Zn anode + Cu cathode → 1.10 V (Daniell cell).',
      'Mg + Ag → big voltage; what is it?',
      'Same metal on both sides — voltage zero?',
    ],
    id: [
      'Anoda Zn + katoda Cu → 1,10 V (sel Daniell).',
      'Mg + Ag → tegangan besar; berapa?',
      'Logam sama di kedua sisi — tegangan nol?',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'A galvanic (voltaic) cell turns a spontaneous redox reaction into an electric current by keeping the two halves of the reaction apart. Each beaker is a half-cell: a strip of metal standing in a solution of its own ions. In the Daniell cell, zinc atoms at the left electrode give up electrons (oxidation, Zn → Zn²⁺ + 2e⁻) while copper ions at the right electrode take electrons (reduction, Cu²⁺ + 2e⁻ → Cu). The electrons cannot cross the solution, so they travel through the wire, and the LED in the sim glows as they pass.',
        'How hard each metal "pushes" electrons is measured by its standard reduction potential, E°, which is tabulated against the hydrogen electrode at 25 °C and 1 mol/L. A very negative E° (magnesium, −2.37 V) means the metal readily loses electrons; a positive E° (silver, +0.80 V) means its ions readily gain them. The electrode with the lower E° becomes the anode, the one with the higher E° becomes the cathode, and the cell voltage is simply the difference: E°_cell = E°_cathode − E°_anode. For Zn and Cu that gives 0.34 − (−0.76) = 1.10 V.',
        'The purple salt bridge is what lets the cell keep running. As Zn²⁺ ions appear at the anode and Cu²⁺ ions disappear at the cathode, charge would build up and stop the reaction within an instant; ions from the bridge drift into each beaker to neutralise that charge and complete the circuit. Notice that the bridge carries ions, never electrons. The two half-cell menus let you pair any two of nine metals; whichever has the lower E° is relabelled "Anode" and the electron dots reverse direction accordingly.',
        'The sim shows only the standard voltage, so it ignores several things a real battery experiences. Concentrations are assumed to be 1 mol/L; in reality the voltage shifts as ions are used up (the Nernst equation describes this), and it falls further when current flows because of internal resistance. Some listed metals, such as lithium and aluminium, cannot actually be used in water-based cells because they react with water or form an oxide skin. Finally, the cell never runs down here: a real zinc electrode is slowly eaten away until the battery dies.',
      ],
      id: [
        'Sel galvanik (sel volta) mengubah reaksi redoks spontan menjadi arus listrik dengan memisahkan kedua paruh reaksinya. Setiap gelas kimia adalah sebuah sel-setengah: lempeng logam yang tercelup dalam larutan ionnya sendiri. Pada sel Daniell, atom seng di elektrode kiri melepaskan elektron (oksidasi, Zn → Zn²⁺ + 2e⁻) sementara ion tembaga di elektrode kanan menerima elektron (reduksi, Cu²⁺ + 2e⁻ → Cu). Elektron tidak bisa menyeberangi larutan, sehingga mengalir lewat kawat, dan LED di simulasi menyala saat elektron melewatinya.',
        'Seberapa kuat tiap logam "mendorong" elektron dinyatakan oleh potensial reduksi standarnya, E°, yang ditabulasikan terhadap elektrode hidrogen pada 25 °C dan 1 mol/L. E° yang sangat negatif (magnesium, −2,37 V) berarti logam itu mudah melepas elektron; E° positif (perak, +0,80 V) berarti ionnya mudah menerima elektron. Elektrode dengan E° lebih rendah menjadi anoda, yang lebih tinggi menjadi katoda, dan tegangan sel adalah selisihnya: E°_sel = E°_katoda − E°_anoda. Untuk Zn dan Cu hasilnya 0,34 − (−0,76) = 1,10 V.',
        'Jembatan garam berwarna ungu itulah yang membuat sel bisa terus bekerja. Ketika ion Zn²⁺ bertambah di anoda dan ion Cu²⁺ berkurang di katoda, muatan akan menumpuk dan menghentikan reaksi dalam sekejap; ion dari jembatan garam berpindah ke tiap gelas untuk menetralkan muatan itu dan menutup rangkaian. Perhatikan bahwa jembatan garam menghantarkan ion, bukan elektron. Dua menu sel-setengah memungkinkanmu memasangkan dua dari sembilan logam; logam yang E°-nya lebih rendah otomatis diberi label "Anode" dan titik-titik elektron berbalik arah.',
        'Simulasi ini hanya menampilkan tegangan standar, sehingga mengabaikan beberapa hal yang dialami baterai sungguhan. Konsentrasi dianggap 1 mol/L; pada kenyataannya tegangan bergeser saat ion terpakai (dijelaskan oleh persamaan Nernst), dan turun lagi ketika arus mengalir karena hambatan dalam. Beberapa logam dalam daftar, seperti litium dan aluminium, sebenarnya tidak bisa dipakai dalam sel berbasis air karena bereaksi dengan air atau membentuk lapisan oksida. Terakhir, sel di sini tidak pernah habis: elektrode seng sungguhan perlahan terkikis sampai baterainya mati.',
      ],
    },
    figure: {
      caption: {
        en: 'In the Daniell cell zinc is oxidised at the anode and copper ions are reduced at the cathode. Electrons flow through the wire; ions flow through the salt bridge. E°_cell = 0.34 − (−0.76) = 1.10 V.',
        id: 'Pada sel Daniell, seng teroksidasi di anoda dan ion tembaga tereduksi di katoda. Elektron mengalir lewat kawat; ion mengalir lewat jembatan garam. E°_sel = 0,34 − (−0,76) = 1,10 V.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Daniell cell: electron and ion flow', 'Sel Daniell: aliran elektron dan ion')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.m{fill:none;stroke:currentColor;stroke-width:1.4}.s{font-size:10px}</style>
  <path d="M30 100 V210 H150 V100" class="m"/>
  <path d="M210 100 V210 H330 V100" class="m"/>
  <rect x="34" y="130" width="112" height="78" fill="#3b82f6" opacity=".15"/>
  <rect x="214" y="130" width="112" height="78" fill="#f59e0b" opacity=".15"/>
  <rect x="80" y="70" width="20" height="120" fill="#3b82f6" opacity=".8"/>
  <rect x="260" y="70" width="20" height="120" fill="#f59e0b" opacity=".9"/>
  <path d="M90 70 V30 H270 V70" class="m" stroke-width="2"/>
  <circle cx="180" cy="30" r="9" fill="#f59e0b" opacity=".9"/>
  <text x="172" y="20" class="s">LED</text>
  <line x1="110" y1="30" x2="150" y2="30" stroke="#3b82f6" stroke-width="3" marker-end="url(#a)"/>
  <line x1="210" y1="30" x2="250" y2="30" stroke="#3b82f6" stroke-width="3" marker-end="url(#a)"/>
  <text x="112" y="48" fill="#3b82f6">e⁻ ${L('through the wire', 'lewat kawat')}</text>
  <rect x="150" y="135" width="60" height="14" rx="7" fill="#8b5cf6" opacity=".7"/>
  <text x="138" y="128" fill="#8b5cf6" class="s">${L('salt bridge: ions', 'jembatan garam: ion')}</text>
  <text x="152" y="162" fill="#8b5cf6" class="s">← ${L('anions', 'anion')}</text>
  <text x="152" y="176" fill="#8b5cf6" class="s">${L('cations', 'kation')} →</text>
  <text x="40" y="62" fill="#3b82f6" font-weight="700">Zn ${L('anode (−)', 'anoda (−)')}</text>
  <text x="222" y="62" fill="#f59e0b" font-weight="700">Cu ${L('cathode (+)', 'katoda (+)')}</text>
  <text x="38" y="148" fill="#ef4444" class="s">Zn → Zn²⁺ + 2e⁻</text>
  <text x="38" y="162" class="s">${L('oxidation', 'oksidasi')}</text>
  <text x="38" y="180" class="s">E° = −0.76 V</text>
  <text x="218" y="148" fill="#10b981" class="s">Cu²⁺ + 2e⁻ → Cu</text>
  <text x="218" y="162" class="s">${L('reduction', 'reduksi')}</text>
  <text x="218" y="180" class="s">E° = +0.34 V</text>
  <text x="96" y="232" font-weight="700">E°${L('cell', 'sel')} = 0.34 − (−0.76) = 1.10 V</text>
  <defs><marker id="a" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="context-stroke"/></marker></defs>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Oxidation (loss of electrons) happens at the anode; reduction (gain of electrons) happens at the cathode.',
        'The metal with the lower standard reduction potential is the anode; electrons flow from it through the wire to the cathode.',
        'E°_cell = E°_cathode − E°_anode, and a positive value means the reaction runs on its own.',
        'The salt bridge completes the circuit with moving ions, so charge never piles up in either beaker.',
        'Standard potentials assume 1 mol/L solutions at 25 °C and no current; real voltages are a little lower.',
      ],
      id: [
        'Oksidasi (kehilangan elektron) terjadi di anoda; reduksi (menerima elektron) terjadi di katoda.',
        'Logam dengan potensial reduksi standar lebih rendah menjadi anoda; elektron mengalir darinya lewat kawat menuju katoda.',
        'E°_sel = E°_katoda − E°_anoda, dan nilai positif berarti reaksi berlangsung dengan sendirinya.',
        'Jembatan garam menutup rangkaian dengan ion yang bergerak, sehingga muatan tidak menumpuk di gelas mana pun.',
        'Potensial standar mengasumsikan larutan 1 mol/L pada 25 °C tanpa arus; tegangan sungguhan sedikit lebih rendah.',
      ],
    },
    vocabulary: {
      en: [
        ['Half-cell', 'One electrode in a solution of its own ions; where either oxidation or reduction takes place.'],
        ['Anode', 'The electrode where oxidation occurs; in a galvanic cell it is the negative terminal and the source of electrons.'],
        ['Cathode', 'The electrode where reduction occurs; the positive terminal of a galvanic cell.'],
        ['Standard reduction potential (E°)', 'The voltage of a half-cell measured against the standard hydrogen electrode under standard conditions.'],
        ['Salt bridge', 'A tube of electrolyte (often KNO₃ in gel) that lets ions move between the half-cells.'],
        ['Spontaneous reaction', 'A reaction that releases energy and proceeds without outside help; for a cell this means E°_cell is positive.'],
        ['Electrolysis', 'The reverse process, in which an external voltage forces a non-spontaneous redox reaction to happen.'],
      ],
      id: [
        ['Sel-setengah', 'Satu elektrode dalam larutan ionnya sendiri; tempat terjadinya oksidasi atau reduksi.'],
        ['Anoda', 'Elektrode tempat oksidasi terjadi; pada sel galvanik menjadi kutub negatif dan sumber elektron.'],
        ['Katoda', 'Elektrode tempat reduksi terjadi; kutub positif sel galvanik.'],
        ['Potensial reduksi standar (E°)', 'Tegangan sel-setengah yang diukur terhadap elektrode hidrogen standar pada keadaan standar.'],
        ['Jembatan garam', 'Tabung berisi elektrolit (sering KNO₃ dalam gel) yang membiarkan ion berpindah antar-sel-setengah.'],
        ['Reaksi spontan', 'Reaksi yang melepaskan energi dan berlangsung tanpa bantuan luar; pada sel berarti E°_sel positif.'],
        ['Elektrolisis', 'Proses kebalikannya, ketika tegangan dari luar memaksa reaksi redoks tak spontan terjadi.'],
      ],
    },
    misconceptions: {
      en: [
        ['Electrons travel through the salt bridge and the solution.', 'Electrons only move through the metal wire. Inside the solutions and the salt bridge the charge is carried by ions.'],
        ['The anode is always the positive terminal.', 'In a galvanic cell the anode is negative because electrons leave it. It is only in electrolysis that the anode is positive.'],
        ['A metal with a negative E° has a negative voltage, so it cannot power anything.', 'E° values are relative to hydrogen; only the difference between two electrodes matters. Magnesium (−2.37 V) paired with copper gives a healthy +2.71 V.'],
        ['A bigger piece of metal gives a bigger voltage.', 'The voltage depends on which metals are used, not how much. More metal only lets the cell deliver current for longer.'],
      ],
      id: [
        ['Elektron mengalir lewat jembatan garam dan larutan.', 'Elektron hanya bergerak lewat kawat logam. Di dalam larutan dan jembatan garam, muatan dibawa oleh ion.'],
        ['Anoda selalu kutub positif.', 'Pada sel galvanik anoda bermuatan negatif karena elektron keluar darinya. Anoda bermuatan positif hanya pada elektrolisis.'],
        ['Logam dengan E° negatif menghasilkan tegangan negatif, jadi tidak bisa menyalakan apa pun.', 'Nilai E° bersifat relatif terhadap hidrogen; yang penting hanyalah selisih antara dua elektrode. Magnesium (−2,37 V) yang dipasangkan dengan tembaga memberi +2,71 V.'],
        ['Potongan logam yang lebih besar memberi tegangan lebih besar.', 'Tegangan bergantung pada jenis logam yang dipakai, bukan jumlahnya. Logam yang lebih banyak hanya membuat sel bisa mengalirkan arus lebih lama.'],
      ],
    },
    realWorld: {
      en: [
        'An ordinary 1.5 V alkaline battery is a zinc–manganese dioxide cell; the zinc can is the anode and is slowly consumed as the battery discharges.',
        'Lithium-ion batteries in phones reach about 3.7 V per cell because lithium has an extremely negative potential, but they need water-free electrolytes to do so.',
        'Galvanised steel is coated with zinc on purpose: zinc has the lower potential, so it corrodes (is oxidised) first and protects the iron underneath.',
        'Ship hulls and pipelines are fitted with "sacrificial anodes" of magnesium or zinc that are replaced regularly, which is cheaper than replacing the steel.',
      ],
      id: [
        'Baterai alkalin 1,5 V biasa adalah sel seng–mangan dioksida; kaleng sengnya adalah anoda dan perlahan habis saat baterai dipakai.',
        'Baterai litium-ion di ponsel mencapai sekitar 3,7 V per sel karena potensial litium sangat negatif, tetapi membutuhkan elektrolit bebas air.',
        'Baja galvanis sengaja dilapisi seng: potensial seng lebih rendah, sehingga seng terkorosi (teroksidasi) lebih dulu dan melindungi besi di bawahnya.',
        'Lambung kapal dan pipa dipasangi "anoda tumbal" dari magnesium atau seng yang diganti secara berkala, yang lebih murah daripada mengganti bajanya.',
      ],
    },
    questions: {
      en: [
        { q: 'A cell uses iron (E° = −0.44 V) and silver (E° = +0.80 V). Which metal is the anode, and what is E°_cell?', a: 'Iron has the lower potential, so it is the anode and is oxidised. E°_cell = 0.80 − (−0.44) = 1.24 V.' },
        { q: 'You want a cell of about 2 V from the metals in the sim. Which pair would you choose?', a: 'Look for a difference close to 2 V: Mg (−2.37) with Pb (−0.13) gives 2.24 V, and Al (−1.66) with Cu (+0.34) gives 2.00 V exactly. Several pairs work; the voltage depends only on the difference.' },
        { q: 'In the Daniell cell, what happens to the mass of the zinc electrode and the copper electrode as the cell runs, and why?', a: 'The zinc electrode gets lighter because Zn atoms dissolve as Zn²⁺ ions. The copper electrode gets heavier because Cu²⁺ ions from the solution are deposited as copper metal.' },
      ],
      id: [
        { q: 'Sebuah sel memakai besi (E° = −0,44 V) dan perak (E° = +0,80 V). Logam mana yang menjadi anoda, dan berapa E°_sel?', a: 'Besi memiliki potensial lebih rendah, jadi besi menjadi anoda dan teroksidasi. E°_sel = 0,80 − (−0,44) = 1,24 V.' },
        { q: 'Kamu ingin sel bertegangan sekitar 2 V dari logam-logam di simulasi. Pasangan mana yang kamu pilih?', a: 'Cari selisih yang mendekati 2 V: Mg (−2,37) dengan Pb (−0,13) memberi 2,24 V, dan Al (−1,66) dengan Cu (+0,34) memberi tepat 2,00 V. Beberapa pasangan bisa; tegangan hanya bergantung pada selisihnya.' },
        { q: 'Pada sel Daniell, apa yang terjadi pada massa elektrode seng dan elektrode tembaga saat sel bekerja, dan mengapa?', a: 'Elektrode seng menjadi lebih ringan karena atom Zn larut sebagai ion Zn²⁺. Elektrode tembaga menjadi lebih berat karena ion Cu²⁺ dari larutan mengendap sebagai logam tembaga.' },
      ],
    },
  },
};
