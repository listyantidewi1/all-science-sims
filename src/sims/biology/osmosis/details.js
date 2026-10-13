// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Connect concentration difference to direction of water flow.',
      'Explain why a cell in pure water swells.',
      'Distinguish hypotonic, isotonic, and hypertonic environments.',
    ],
    id: [
      'Mengaitkan perbedaan konsentrasi dengan arah aliran air.',
      'Menjelaskan mengapa sel di dalam air murni mengembang.',
      'Membedakan lingkungan hipotonik, isotonik, dan hipertonik.',
    ],
  },
  tryThis: {
    en: [
      'Add salt to one side — which way does water flow?',
      'Make both sides equal — does net flow stop?',
      'Surround a cell with salty water — does it shrink or swell?',
    ],
    id: [
      'Tambah garam di satu sisi — ke arah mana air mengalir?',
      'Buat kedua sisi sama — apakah aliran neto berhenti?',
      'Kelilingi sel dengan air asin — apakah sel mengecil atau membesar?',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'Osmosis is the diffusion of water through a membrane that lets water molecules pass but blocks dissolved particles such as salt. Water molecules are always jiggling and bumping into the membrane from both sides. On the side with more water (and fewer solute particles), more water molecules hit the pores each second, so more of them cross. The result is a net flow of water from the dilute side to the concentrated side, even though individual molecules cross in both directions. No pulling or pushing is involved: it is only random motion plus unequal numbers.',
        'The simulation shows two compartments separated by a membrane with tiny pores. Small blue dots are water and larger yellow dots are salt. Salt can never cross, but each frame there is a chance that one water particle hops to the other side. That chance grows with the difference in "% solute", which here means the fraction of all particles on a side that are salt. The arrow shows the direction of net flow, and it disappears once both sides have the same percentage.',
        'The "Salt left" and "Salt right" sliders set how many solute particles each side holds, so they decide which side is hypertonic (saltier) and which is hypotonic. "Diffusion rate" changes how often water hops, like warming the water or using a more permeable membrane, but it does not change where the system ends up, only how fast it gets there. "Make isotonic" copies the salt count across, so with equal water the percentages match and the net flow stops.',
        'The model leaves things out. Real compartments change volume: the salty side gains water, its level rises, and the extra pressure eventually balances osmosis before the concentrations become equal. Here the volumes are fixed, so flow continues until the percentages match exactly. Real table salt also splits into two ions, which doubles its osmotic effect, and the percentages shown are particle fractions, not grams per litre. Living cells add one more factor: a membrane that can stretch and burst, or a stiff wall that resists swelling.',
      ],
      id: [
        'Osmosis adalah difusi air melalui membran yang bisa dilewati molekul air tetapi tidak oleh partikel terlarut seperti garam. Molekul air selalu bergerak acak dan menabrak membran dari kedua sisi. Di sisi yang airnya lebih banyak (dan zat terlarutnya lebih sedikit), lebih banyak molekul air mengenai pori setiap detik, sehingga lebih banyak pula yang menyeberang. Hasilnya adalah aliran neto air dari sisi encer ke sisi pekat, walaupun molekul tunggal menyeberang ke dua arah. Tidak ada yang menarik atau mendorong: semuanya hanya gerak acak dan jumlah yang tidak seimbang.',
        'Simulasi menampilkan dua kompartemen yang dipisahkan membran berpori halus. Titik biru kecil adalah air dan titik kuning yang lebih besar adalah garam. Garam tidak pernah bisa menyeberang, tetapi setiap frame ada peluang satu partikel air melompat ke sisi lain. Peluang itu bertambah seiring selisih "% solute", yaitu bagian dari seluruh partikel di satu sisi yang berupa garam. Panah menunjukkan arah aliran neto dan menghilang ketika kedua sisi memiliki persentase yang sama.',
        'Slider "Salt left" dan "Salt right" menentukan jumlah partikel terlarut di tiap sisi, sehingga menentukan sisi mana yang hipertonik (lebih asin) dan mana yang hipotonik. "Diffusion rate" mengubah seberapa sering air melompat, seperti menghangatkan air atau memakai membran yang lebih permeabel, tetapi tidak mengubah keadaan akhir, hanya kecepatan mencapainya. "Make isotonic" menyalin jumlah garam ke sisi lain, sehingga dengan jumlah air yang sama persentasenya cocok dan aliran neto berhenti.',
        'Model ini mengabaikan beberapa hal. Kompartemen sungguhan berubah volume: sisi asin menerima air, permukaannya naik, dan tekanan tambahan itu akhirnya mengimbangi osmosis sebelum konsentrasinya sama. Di sini volume tetap, sehingga aliran berlanjut sampai persentasenya tepat sama. Garam dapur sungguhan juga terurai menjadi dua ion, yang menggandakan efek osmotiknya, dan persentase yang ditampilkan adalah fraksi partikel, bukan gram per liter. Sel hidup menambah satu faktor lagi: membran yang bisa meregang lalu pecah, atau dinding kaku yang menahan pembengkakan.',
      ],
    },
    figure: {
      caption: {
        en: 'Water (blue) crosses the membrane in both directions, but more crosses from the side with fewer solute particles (yellow), so the net flow is toward the saltier side until both sides reach the same concentration.',
        id: 'Air (biru) menyeberangi membran ke dua arah, tetapi lebih banyak yang menyeberang dari sisi dengan partikel terlarut (kuning) lebih sedikit, sehingga aliran neto menuju sisi yang lebih asin sampai konsentrasi kedua sisi sama.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Osmosis across a semipermeable membrane', 'Osmosis melalui membran semipermeabel')}">
  <style>text{font:12px system-ui,sans-serif;fill:currentColor}.m{fill:none;stroke:currentColor;stroke-width:1.2;opacity:.45}.f{stroke-width:2.2;fill:none}.s{font-size:10px;opacity:.75}</style>
  <rect x="30" y="56" width="300" height="150" rx="6" class="m"/>
  <line x1="180" y1="56" x2="180" y2="206" stroke="currentColor" stroke-width="6" opacity=".35" stroke-dasharray="16 6"/>
  <text x="140" y="222" class="s">${L('membrane with pores', 'membran berpori')}</text>
  <g fill="#3b82f6">
    <circle cx="50" cy="80" r="3"/><circle cx="75" cy="110" r="3"/><circle cx="60" cy="150" r="3"/><circle cx="95" cy="90" r="3"/>
    <circle cx="110" cy="130" r="3"/><circle cx="85" cy="175" r="3"/><circle cx="130" cy="70" r="3"/><circle cx="140" cy="160" r="3"/>
    <circle cx="120" cy="190" r="3"/><circle cx="155" cy="120" r="3"/><circle cx="45" cy="195" r="3"/><circle cx="160" cy="185" r="3"/>
    <circle cx="70" cy="130" r="3"/><circle cx="150" cy="80" r="3"/>
    <circle cx="210" cy="95" r="3"/><circle cx="250" cy="150" r="3"/><circle cx="300" cy="80" r="3"/><circle cx="270" cy="190" r="3"/>
    <circle cx="225" cy="175" r="3"/><circle cx="310" cy="140" r="3"/>
  </g>
  <g fill="#f59e0b">
    <circle cx="100" cy="155" r="6"/><circle cx="60" cy="100" r="6"/>
    <circle cx="205" cy="130" r="6"/><circle cx="240" cy="80" r="6"/><circle cx="285" cy="110" r="6"/><circle cx="260" cy="170" r="6"/>
    <circle cx="315" cy="185" r="6"/><circle cx="230" cy="195" r="6"/><circle cx="300" cy="160" r="6"/>
  </g>
  <line x1="130" y1="38" x2="230" y2="38" class="f" stroke="#10b981" marker-end="url(#a)"/>
  <text x="112" y="24" fill="#10b981">${L('net water flow', 'aliran neto air')}</text>
  <text x="40" y="70" class="s">${L('hypotonic: less solute', 'hipotonik: solut sedikit')}</text>
  <text x="205" y="70" class="s">${L('hypertonic: more solute', 'hipertonik: solut banyak')}</text>
  <line x1="172" y1="118" x2="150" y2="110" class="m" stroke="#3b82f6" stroke-opacity="1" marker-end="url(#a)"/>
  <line x1="188" y1="140" x2="212" y2="146" class="m" stroke="#3b82f6" stroke-opacity="1" marker-end="url(#a)"/>
  <line x1="188" y1="98" x2="212" y2="104" class="m" stroke="#3b82f6" stroke-opacity="1" marker-end="url(#a)"/>
  <line x1="188" y1="170" x2="212" y2="176" class="m" stroke="#3b82f6" stroke-opacity="1" marker-end="url(#a)"/>
  <defs><marker id="a" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="context-stroke"/></marker></defs>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Water moves by osmosis from where solute is dilute to where it is concentrated, which is the same as moving down its own concentration gradient.',
        'Osmosis is passive: it needs no energy from the cell, only the random motion of molecules.',
        'Water crosses in both directions all the time; what changes is the net flow, which stops when both sides are isotonic.',
        'Hypotonic, isotonic and hypertonic are comparisons between two solutions, not properties of one solution alone.',
        'Changing the diffusion rate changes how fast equilibrium is reached, not where it is.',
      ],
      id: [
        'Air berpindah secara osmosis dari tempat zat terlarut encer ke tempat yang pekat, yang sama artinya dengan menuruni gradien konsentrasinya sendiri.',
        'Osmosis bersifat pasif: tidak memerlukan energi dari sel, hanya gerak acak molekul.',
        'Air menyeberang ke dua arah setiap saat; yang berubah adalah aliran netonya, yang berhenti ketika kedua sisi isotonik.',
        'Hipotonik, isotonik, dan hipertonik adalah perbandingan antara dua larutan, bukan sifat satu larutan saja.',
        'Mengubah laju difusi mengubah seberapa cepat kesetimbangan tercapai, bukan letak kesetimbangannya.',
      ],
    },
    vocabulary: {
      en: [
        ['Osmosis', 'The net movement of water across a semipermeable membrane from a dilute solution to a more concentrated one.'],
        ['Semipermeable membrane', 'A barrier with pores that let small molecules such as water through but hold back larger dissolved particles.'],
        ['Solute', 'The substance dissolved in a liquid, such as salt or sugar in water.'],
        ['Hypotonic', 'Having a lower solute concentration than the solution it is compared with; water flows out of it.'],
        ['Hypertonic', 'Having a higher solute concentration than the solution it is compared with; water flows into it.'],
        ['Isotonic', 'Two solutions with equal solute concentration, so there is no net water flow between them.'],
        ['Concentration gradient', 'A difference in concentration between two places; diffusion runs down the gradient.'],
      ],
      id: [
        ['Osmosis', 'Perpindahan neto air melintasi membran semipermeabel dari larutan encer ke larutan yang lebih pekat.'],
        ['Membran semipermeabel', 'Penghalang berpori yang meloloskan molekul kecil seperti air tetapi menahan partikel terlarut yang lebih besar.'],
        ['Zat terlarut (solut)', 'Zat yang larut dalam cairan, misalnya garam atau gula dalam air.'],
        ['Hipotonik', 'Memiliki konsentrasi zat terlarut lebih rendah daripada larutan pembandingnya; air mengalir keluar darinya.'],
        ['Hipertonik', 'Memiliki konsentrasi zat terlarut lebih tinggi daripada larutan pembandingnya; air mengalir masuk ke dalamnya.'],
        ['Isotonik', 'Dua larutan dengan konsentrasi zat terlarut sama, sehingga tidak ada aliran neto air di antaranya.'],
        ['Gradien konsentrasi', 'Perbedaan konsentrasi antara dua tempat; difusi berjalan menuruni gradien.'],
      ],
    },
    misconceptions: {
      en: [
        ['The salt pulls the water toward it.', 'Nothing pulls. Water molecules move randomly in both directions; the dilute side simply has more water molecules hitting the membrane, so more cross from that side.'],
        ['When the two sides are isotonic, water stops moving.', 'Water keeps crossing in both directions at equal rates. Only the net flow is zero, which is why the simulation still shows particles jiggling after the arrow disappears.'],
        ['Osmosis needs energy, like a pump.', 'Osmosis is passive diffusion. Cells spend energy on active transport of solutes, and water then follows those solutes by osmosis for free.'],
        ['A hypertonic solution has more water in it.', 'It is the other way round: hypertonic means more solute and so proportionally less water. Water flows into a hypertonic solution, not out of it.'],
      ],
      id: [
        ['Garam menarik air ke arahnya.', 'Tidak ada yang menarik. Molekul air bergerak acak ke dua arah; sisi encer hanya punya lebih banyak molekul air yang menabrak membran, sehingga lebih banyak yang menyeberang dari sisi itu.'],
        ['Saat kedua sisi isotonik, air berhenti bergerak.', 'Air terus menyeberang ke dua arah dengan laju sama. Hanya aliran netonya yang nol, itulah sebabnya simulasi masih menampilkan partikel bergetar setelah panah menghilang.'],
        ['Osmosis membutuhkan energi, seperti pompa.', 'Osmosis adalah difusi pasif. Sel mengeluarkan energi untuk transpor aktif zat terlarut, lalu air mengikuti zat terlarut itu secara osmosis tanpa biaya.'],
        ['Larutan hipertonik mengandung lebih banyak air.', 'Justru sebaliknya: hipertonik berarti zat terlarutnya lebih banyak sehingga airnya secara proporsional lebih sedikit. Air mengalir masuk ke larutan hipertonik, bukan keluar.'],
      ],
    },
    realWorld: {
      en: [
        'Red blood cells placed in pure water swell and burst, while in strong salt water they shrivel; that is why intravenous fluids are made isotonic, about 0.9% sodium chloride.',
        'Plants wilt when their cells lose water and turgor; watering a plant with salty water can draw water out of the roots instead of into them.',
        'Salting fish or sugaring fruit preserves food by pulling water out of bacteria and moulds, so they cannot grow.',
        'Cucumber slices sprinkled with salt turn watery within minutes because water leaves the cells by osmosis.',
      ],
      id: [
        'Sel darah merah yang dimasukkan ke air murni membengkak lalu pecah, sedangkan di air garam pekat mengerut; itulah sebabnya cairan infus dibuat isotonik, sekitar 0,9% natrium klorida.',
        'Tanaman layu ketika selnya kehilangan air dan tekanan turgor; menyiram tanaman dengan air asin bisa menarik air keluar dari akar, bukan masuk.',
        'Mengasinkan ikan atau menggulai buah mengawetkan makanan dengan menarik air keluar dari bakteri dan jamur sehingga mereka tidak bisa tumbuh.',
        'Irisan mentimun yang ditaburi garam menjadi berair dalam beberapa menit karena air keluar dari sel secara osmosis.',
      ],
    },
    questions: {
      en: [
        { q: 'The left side has 30 salt and 200 water; the right has 60 salt and 200 water. Which way does water flow, and roughly how much water is on each side when the net flow stops?', a: 'Left to right, because the right side starts at 60/260 ≈ 23% solute and the left at 30/230 ≈ 13%. Flow stops when the percentages match. Since the right has twice the salt, it must end with twice the water: about 133 on the left and 267 on the right (30/163 ≈ 60/327 ≈ 18%).' },
        { q: 'A red blood cell is dropped into pure water. Explain, using osmosis, why it swells and may burst.', a: 'The cytoplasm contains dissolved salts and proteins, so it is hypertonic compared with pure water. Water flows into the cell faster than it leaves, the cell swells, and because an animal cell has only a thin membrane and no wall, it can burst.' },
        { q: 'You set the "Diffusion rate" slider to its maximum. Does the final state change? What does change?', a: 'The final state is the same: water flows until both sides have the same solute percentage. Only the speed changes, so equilibrium is reached sooner. In real life, warmer water or a more permeable membrane does the same thing.' },
      ],
      id: [
        { q: 'Sisi kiri berisi 30 garam dan 200 air; sisi kanan 60 garam dan 200 air. Ke mana air mengalir, dan kira-kira berapa air di tiap sisi saat aliran neto berhenti?', a: 'Dari kiri ke kanan, karena sisi kanan mulai dengan 60/260 ≈ 23% solut dan sisi kiri 30/230 ≈ 13%. Aliran berhenti ketika persentasenya sama. Karena garam di kanan dua kali lipat, airnya juga harus berakhir dua kali lipat: sekitar 133 di kiri dan 267 di kanan (30/163 ≈ 60/327 ≈ 18%).' },
        { q: 'Sel darah merah dimasukkan ke air murni. Jelaskan dengan osmosis mengapa sel membengkak dan bisa pecah.', a: 'Sitoplasma mengandung garam dan protein terlarut, sehingga hipertonik dibandingkan air murni. Air masuk ke sel lebih cepat daripada keluar, sel membengkak, dan karena sel hewan hanya punya membran tipis tanpa dinding, sel bisa pecah.' },
        { q: 'Kamu mengatur slider "Diffusion rate" ke nilai maksimum. Apakah keadaan akhirnya berubah? Apa yang berubah?', a: 'Keadaan akhirnya sama: air mengalir sampai kedua sisi punya persentase solut yang sama. Hanya kecepatannya yang berubah, sehingga kesetimbangan tercapai lebih cepat. Dalam kehidupan nyata, air yang lebih hangat atau membran yang lebih permeabel memberi efek serupa.' },
      ],
    },
  },
};
