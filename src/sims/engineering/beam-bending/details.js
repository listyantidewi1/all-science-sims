// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'See where the maximum bending moment lives for any load position.',
      'Connect the moment diagram to the deflected shape (M = EI·d²w/dx²).',
      'Predict the failure point: it is where |M| is largest.',
    ],
    id: [
      'Melihat di mana momen lentur maksimum untuk setiap posisi beban.',
      'Menghubungkan diagram momen dengan bentuk lendutan (M = EI·d²w/dx²).',
      'Memprediksi titik kegagalan: di tempat |M| terbesar.',
    ],
  },
  tryThis: {
    en: [
      'Center the load — moment diagram is symmetric and triangular.',
      'Move the load to one quarter span — find where deflection peaks (it is NOT under the load).',
      'Increase load magnitude — diagrams scale linearly.',
    ],
    id: [
      'Posisikan beban di tengah — diagram momen simetris dan segitiga.',
      'Geser beban ke seperempat bentang — cari titik lendutan terbesar (BUKAN di bawah beban).',
      'Naikkan besar beban — diagram berskala linear.',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'Rest a beam on two supports and push down on it, and the supports push back with reactions that keep the whole beam in equilibrium. Inside the beam, every imaginary cross-section must also be in equilibrium with the piece of beam on either side of it, and that requires two internal actions: a shear force V, the net vertical force the section transmits, and a bending moment M, the turning effect it transmits. For a single point load P at distance a from the left support on a span L, the reactions are R_A = P(L − a)/L and R_B = Pa/L: the nearer support carries more. The left support in the sim is a pin and the right one a roller, so there is no horizontal reaction to worry about.',
        'The shear diagram is a step: V equals R_A everywhere left of the load, then drops by P to −R_B everywhere right of it. The moment diagram is a triangle, rising linearly from zero at the left support to a peak directly under the load, M_max = P·a·(L − a)/L, and falling linearly back to zero at the right support. The two are linked by V = dM/dx, which is why the moment peaks exactly where the shear changes sign. The deflection w comes from Euler–Bernoulli beam theory, EI·d²w/dx² = M: the curvature at every point is proportional to the moment there and inversely proportional to the flexural rigidity EI. Integrating twice with the supports held at zero deflection gives the curve the sim draws.',
        'The sliders set the span L, the load position a, the load P and the stiffness EI, and the button recentres the load. Doubling P doubles all three diagrams, because everything is linear. Doubling L doubles the maximum moment but, for a centred load, multiplies the mid-span deflection w_max = PL³/(48EI) by eight. EI changes only the deflection curve, never V or M, because those come from equilibrium alone. Notice too that for an off-centre load the deepest point of the deflection curve is not under the load; it lies between the load and mid-span, because the long side of the beam has more length over which to curve.',
        'The model is linear and elastic, valid for deflections that are small compared with the span. It ignores the beam\'s own weight, deformation due to shear (a good approximation for slender beams), and the possibility that the beam cracks or yields. EI lumps together the material (Young\'s modulus E) and the cross-section shape (second moment of area I), so the sim cannot tell you the stress in the beam or whether it would fail; that needs σ = My/I with the actual section. The three diagrams are each auto-scaled to fill their panel, so compare values by hovering rather than by comparing heights across panels.',
      ],
      id: [
        'Letakkan sebuah balok di atas dua tumpuan dan tekan ke bawah, maka tumpuan akan mendorong balik dengan reaksi yang menjaga seluruh balok setimbang. Di dalam balok, setiap penampang khayal juga harus setimbang dengan potongan balok di kedua sisinya, dan itu membutuhkan dua aksi dalam: gaya geser V, yaitu gaya tegak neto yang diteruskan penampang, dan momen lentur M, yaitu efek putar yang diteruskannya. Untuk satu beban titik P pada jarak a dari tumpuan kiri pada bentang L, reaksinya adalah R_A = P(L − a)/L dan R_B = Pa/L: tumpuan yang lebih dekat memikul lebih banyak. Tumpuan kiri pada simulasi berupa sendi dan yang kanan berupa rol, sehingga tidak ada reaksi mendatar yang perlu dipikirkan.',
        'Diagram geser berbentuk tangga: V sama dengan R_A di seluruh bagian kiri beban, lalu turun sebesar P menjadi −R_B di seluruh bagian kanannya. Diagram momen berbentuk segitiga, naik linear dari nol di tumpuan kiri ke puncak tepat di bawah beban, M_maks = P·a·(L − a)/L, lalu turun linear kembali ke nol di tumpuan kanan. Keduanya terkait oleh V = dM/dx, dan karena itulah momen mencapai puncak tepat di tempat gaya geser berganti tanda. Lendutan w berasal dari teori balok Euler–Bernoulli, EI·d²w/dx² = M: kelengkungan di setiap titik sebanding dengan momen di titik itu dan berbanding terbalik dengan kekakuan lentur EI. Mengintegralkan dua kali dengan lendutan nol di kedua tumpuan menghasilkan kurva yang digambar simulasi.',
        'Slider mengatur bentang L, posisi beban a, beban P, dan kekakuan EI, dan tombol mengembalikan beban ke tengah. Menggandakan P menggandakan ketiga diagram, karena semuanya linear. Menggandakan L menggandakan momen maksimum tetapi, untuk beban di tengah, melipatgandakan lendutan tengah bentang w_maks = PL³/(48EI) menjadi delapan kali. EI hanya mengubah kurva lendutan, tidak pernah V atau M, karena keduanya berasal dari kesetimbangan saja. Perhatikan juga bahwa untuk beban yang tidak di tengah, titik terdalam kurva lendutan bukan di bawah beban; ia berada di antara beban dan tengah bentang, karena sisi balok yang lebih panjang punya lebih banyak panjang untuk melengkung.',
        'Model ini linear dan elastis, berlaku untuk lendutan yang kecil dibandingkan bentang. Model mengabaikan berat balok sendiri, deformasi akibat geser (pendekatan yang baik untuk balok langsing), dan kemungkinan balok retak atau luluh. EI menggabungkan material (modulus Young E) dan bentuk penampang (momen inersia luas I), sehingga simulasi tidak dapat memberi tahu tegangan dalam balok atau apakah balok akan gagal; untuk itu diperlukan σ = My/I dengan penampang yang sebenarnya. Ketiga diagram masing-masing diskalakan otomatis agar memenuhi panelnya, jadi bandingkan nilai dengan mengarahkan kursor, bukan dengan membandingkan tinggi antar panel.',
      ],
    },
    figure: {
      caption: {
        en: 'A point load P at distance a from the left support. The shear V is constant on each side of the load and jumps by P under it; the bending moment M rises linearly to its peak P·a·b/L under the load. Since V = dM/dx, the moment peaks where the shear crosses zero.',
        id: 'Beban titik P pada jarak a dari tumpuan kiri. Gaya geser V konstan di tiap sisi beban dan melompat sebesar P di bawahnya; momen lentur M naik linear ke puncaknya P·a·b/L di bawah beban. Karena V = dM/dx, momen mencapai puncak di tempat gaya geser melewati nol.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Beam with point load, shear and moment diagrams', 'Balok dengan beban titik, diagram geser dan momen')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.m{fill:none;stroke:currentColor;stroke-width:1;opacity:.45}.f{stroke-width:2;fill:none}.s{font-size:10px}</style>
  <rect x="40" y="36" width="280" height="8" fill="currentColor" opacity=".55"/>
  <path d="M40 44 L30 60 L50 60 z" fill="currentColor" opacity=".7"/>
  <circle cx="320" cy="51" r="6" fill="currentColor" opacity=".7"/>
  <line x1="306" y1="58" x2="334" y2="58" class="m"/>
  <line x1="140" y1="8" x2="140" y2="33" class="f" stroke="#ef4444" marker-end="url(#a)"/>
  <text x="146" y="22" fill="#ef4444">P</text>
  <line x1="40" y1="26" x2="134" y2="26" class="m"/>
  <line x1="40" y1="22" x2="40" y2="30" class="m"/><line x1="134" y1="22" x2="134" y2="30" class="m"/>
  <text x="82" y="22" class="s">a</text>
  <line x1="146" y1="26" x2="320" y2="26" class="m"/>
  <line x1="320" y1="22" x2="320" y2="30" class="m"/>
  <text x="222" y="22" class="s">b = L − a</text>
  <line x1="40" y1="90" x2="40" y2="64" class="f" stroke="#10b981" marker-end="url(#a)"/>
  <text x="46" y="88" fill="#10b981" class="s">R_A = P·b/L</text>
  <line x1="320" y1="90" x2="320" y2="64" class="f" stroke="#10b981" marker-end="url(#a)"/>
  <text x="250" y="88" fill="#10b981" class="s">R_B = P·a/L</text>
  <text x="12" y="118" fill="#3b82f6">V</text>
  <line x1="40" y1="124" x2="320" y2="124" class="m"/>
  <path d="M40 124 L40 98 L140 98 L140 138 L320 138 L320 124" fill="#3b82f6" fill-opacity=".2" stroke="#3b82f6" stroke-width="2"/>
  <text x="60" y="94" fill="#3b82f6" class="s">+R_A</text>
  <text x="250" y="152" fill="#3b82f6" class="s">−R_B</text>
  <text x="200" y="110" class="s" opacity=".7">${L('jump = P under the load', 'lompatan = P di bawah beban')}</text>
  <text x="12" y="184" fill="#8b5cf6">M</text>
  <line x1="40" y1="206" x2="320" y2="206" class="m"/>
  <path d="M40 206 L140 164 L320 206 z" fill="#8b5cf6" fill-opacity=".2" stroke="#8b5cf6" stroke-width="2"/>
  <line x1="140" y1="164" x2="140" y2="206" class="m" stroke-dasharray="3 3"/>
  <text x="148" y="170" fill="#8b5cf6" class="s">M_max = P·a·b / L</text>
  <text x="40" y="230" class="s">${L('V = dM/dx: M peaks where V crosses zero; w″ = M/EI gives the deflection', 'V = dM/dx: M maksimum saat V melewati nol; w″ = M/EI memberi lendutan')}</text>
  <defs><marker id="a" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="context-stroke"/></marker></defs>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Reactions follow from equilibrium: R_A = P(L − a)/L and R_B = Pa/L, so the nearer support carries more.',
        'For a single point load the shear is a step and the moment is a triangle peaking under the load at M_max = P·a·(L − a)/L.',
        'Shear and moment are linked by V = dM/dx; the moment is largest where the shear passes through zero.',
        'Deflection follows EI·w″ = M: it depends on the stiffness EI and grows with L³, while V and M do not depend on EI at all.',
        'The deepest point of the deflected beam is under the load only when the load is centred; otherwise it lies between the load and mid-span.',
      ],
      id: [
        'Reaksi mengikuti kesetimbangan: R_A = P(L − a)/L dan R_B = Pa/L, sehingga tumpuan yang lebih dekat memikul lebih banyak.',
        'Untuk satu beban titik, gaya geser berbentuk tangga dan momen berbentuk segitiga dengan puncak di bawah beban sebesar M_maks = P·a·(L − a)/L.',
        'Geser dan momen terkait oleh V = dM/dx; momen terbesar berada di tempat gaya geser melewati nol.',
        'Lendutan mengikuti EI·w″ = M: bergantung pada kekakuan EI dan tumbuh sebanding L³, sedangkan V dan M sama sekali tidak bergantung pada EI.',
        'Titik terdalam balok yang melendut berada di bawah beban hanya jika beban di tengah; jika tidak, titik itu berada di antara beban dan tengah bentang.',
      ],
    },
    vocabulary: {
      en: [
        ['Simply supported beam', 'A beam resting on a pin at one end and a roller at the other, free to rotate at both supports.'],
        ['Reaction', 'The upward force a support exerts to balance the load.'],
        ['Shear force (V)', 'The internal vertical force a cross-section transmits; equal to the sum of vertical forces on one side of the cut.'],
        ['Bending moment (M)', 'The internal turning effect a cross-section transmits; it is what makes the beam curve.'],
        ['Flexural rigidity (EI)', 'The product of Young\'s modulus E (material stiffness) and the second moment of area I (shape); larger EI means less bending for the same moment.'],
        ['Deflection (w)', 'The vertical displacement of the beam\'s axis from its unloaded position.'],
        ['Euler–Bernoulli beam theory', 'The classical model in which curvature is proportional to bending moment, EI·w″ = M, valid for slender beams with small deflections.'],
      ],
      id: [
        ['Balok tumpuan sederhana', 'Balok yang bertumpu pada sendi di satu ujung dan rol di ujung lain, bebas berputar di kedua tumpuan.'],
        ['Reaksi tumpuan', 'Gaya ke atas yang diberikan tumpuan untuk mengimbangi beban.'],
        ['Gaya geser (V)', 'Gaya tegak dalam yang diteruskan sebuah penampang; sama dengan jumlah gaya tegak di satu sisi potongan.'],
        ['Momen lentur (M)', 'Efek putar dalam yang diteruskan sebuah penampang; inilah yang membuat balok melengkung.'],
        ['Kekakuan lentur (EI)', 'Hasil kali modulus Young E (kekakuan material) dan momen inersia luas I (bentuk penampang); EI lebih besar berarti lengkungan lebih kecil untuk momen yang sama.'],
        ['Lendutan (w)', 'Perpindahan tegak sumbu balok dari posisinya saat tak berbeban.'],
        ['Teori balok Euler–Bernoulli', 'Model klasik dengan kelengkungan sebanding momen lentur, EI·w″ = M, berlaku untuk balok langsing dengan lendutan kecil.'],
      ],
    },
    misconceptions: {
      en: [
        ['A stiffer beam (larger EI) carries a smaller bending moment.', 'For a statically determinate beam the moment comes from equilibrium alone, so it is the same whatever the beam is made of. Stiffness only changes how much the beam deflects under that moment.'],
        ['The beam bends most directly under the load.', 'The curvature is greatest under the load, because the moment is largest there, but the deflection is a double integral of the curvature. For an off-centre load the lowest point lies between the load and mid-span.'],
        ['Doubling the span doubles the deflection.', 'The moment doubles, but the deflection of a centred load grows as L³, so it becomes eight times larger. Long spans are hard to keep stiff, which is why deep beams and trusses are used.'],
        ['The shear force is zero where the load is applied.', 'The shear jumps by P at the load, from +R_A to −R_B; it passes through zero there but is not zero on either side. For a distributed load the shear changes gradually and crosses zero where the moment peaks.'],
      ],
      id: [
        ['Balok yang lebih kaku (EI lebih besar) memikul momen lentur yang lebih kecil.', 'Untuk balok statis tertentu, momen berasal dari kesetimbangan saja, sehingga sama apa pun bahan baloknya. Kekakuan hanya mengubah seberapa besar balok melendut akibat momen itu.'],
        ['Balok melendut paling besar tepat di bawah beban.', 'Kelengkungannya memang terbesar di bawah beban, karena momennya terbesar di sana, tetapi lendutan adalah integral ganda dari kelengkungan. Untuk beban yang tidak di tengah, titik terendah berada di antara beban dan tengah bentang.'],
        ['Menggandakan bentang menggandakan lendutan.', 'Momennya berlipat dua, tetapi lendutan beban di tengah tumbuh sebanding L³, sehingga menjadi delapan kali lebih besar. Bentang panjang sulit dijaga kaku, dan karena itulah balok tinggi dan rangka batang digunakan.'],
        ['Gaya geser nol di tempat beban bekerja.', 'Gaya geser melompat sebesar P di beban, dari +R_A ke −R_B; ia melewati nol di sana tetapi tidak nol di kedua sisinya. Untuk beban terbagi, gaya geser berubah bertahap dan melewati nol di tempat momen maksimum.'],
      ],
    },
    realWorld: {
      en: [
        'A floor joist, a bridge girder and a diving board are all beams; the diving board shows the deflection curve especially clearly when someone stands at the end.',
        'Highway bridge designers slide a truck\'s axle loads along the span, exactly as the sim does, to find the largest moment any section will ever see.',
        'The I-beam shape exists because of EI: putting most of the material far from the centre raises I enormously for the same weight, which cuts deflection and stress.',
        'A crane\'s lifting capacity falls as the load moves farther out along the boom, because the bending moment grows with the lever arm.',
      ],
      id: [
        'Balok lantai, gelagar jembatan, dan papan loncat indah semuanya adalah balok; papan loncat memperlihatkan kurva lendutan dengan sangat jelas ketika seseorang berdiri di ujungnya.',
        'Perancang jembatan jalan raya menggeser beban gandar truk di sepanjang bentang, persis seperti simulasi, untuk menemukan momen terbesar yang akan dialami setiap penampang.',
        'Bentuk balok I ada karena EI: menempatkan sebagian besar material jauh dari pusat menaikkan I secara besar-besaran untuk berat yang sama, sehingga mengurangi lendutan dan tegangan.',
        'Kapasitas angkat derek menurun saat beban bergerak semakin jauh di sepanjang lengannya, karena momen lentur tumbuh bersama lengan tuas.',
      ],
    },
    questions: {
      en: [
        { q: 'With the default settings (L = 6 m, P = 10 kN, EI = 5000 kN·m²) the load is centred. Find the reactions, the maximum moment and the mid-span deflection.', a: 'By symmetry R_A = R_B = 5 kN. M_max = PL/4 = 10 × 6 / 4 = 15 kN·m under the load. w_max = PL³/(48EI) = 10 × 216 / (48 × 5000) = 2160 / 240000 = 0.009 m, or 9 mm downward.' },
        { q: 'Move the load to a = 1.5 m (one quarter of the span). What are the reactions now, where is the maximum moment, and how large is it?', a: 'R_A = P(L − a)/L = 10 × 4.5 / 6 = 7.5 kN and R_B = 10 × 1.5 / 6 = 2.5 kN; the nearer support takes more. The moment still peaks under the load: M_max = R_A × a = 7.5 × 1.5 = 11.25 kN·m, smaller than the centred value of 15 kN·m.' },
        { q: 'You raise EI from 5000 to 50000 kN·m². Which of the three diagrams change, and why?', a: 'Only the deflection changes, shrinking by a factor of ten. V and M are set by equilibrium with the supports, so they do not depend on what the beam is made of; EI only enters through EI·w″ = M, which converts the moment into curvature and then into deflection.' },
      ],
      id: [
        { q: 'Dengan pengaturan bawaan (L = 6 m, P = 10 kN, EI = 5000 kN·m²) beban berada di tengah. Tentukan reaksi, momen maksimum, dan lendutan tengah bentang.', a: 'Karena simetri R_A = R_B = 5 kN. M_maks = PL/4 = 10 × 6 / 4 = 15 kN·m di bawah beban. w_maks = PL³/(48EI) = 10 × 216 / (48 × 5000) = 2160 / 240000 = 0,009 m, atau 9 mm ke bawah.' },
        { q: 'Geser beban ke a = 1,5 m (seperempat bentang). Berapa reaksinya sekarang, di mana momen maksimum, dan seberapa besar?', a: 'R_A = P(L − a)/L = 10 × 4,5 / 6 = 7,5 kN dan R_B = 10 × 1,5 / 6 = 2,5 kN; tumpuan yang lebih dekat memikul lebih banyak. Momen tetap maksimum di bawah beban: M_maks = R_A × a = 7,5 × 1,5 = 11,25 kN·m, lebih kecil daripada nilai 15 kN·m saat beban di tengah.' },
        { q: 'Kamu menaikkan EI dari 5000 ke 50000 kN·m². Diagram mana yang berubah, dan mengapa?', a: 'Hanya lendutan yang berubah, mengecil sepuluh kali. V dan M ditentukan oleh kesetimbangan dengan tumpuan, sehingga tidak bergantung pada bahan balok; EI hanya masuk lewat EI·w″ = M, yang mengubah momen menjadi kelengkungan lalu menjadi lendutan.' },
      ],
    },
  },
};
