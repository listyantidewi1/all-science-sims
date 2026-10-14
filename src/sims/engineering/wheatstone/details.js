// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Apply the balance condition R₁ R₄ = R₂ R₃.',
      'Measure an unknown resistor by adjusting a known one until the bridge balances.',
      'See why the bridge is sensitive — small changes near balance produce big galvanometer deflection.',
    ],
    id: [
      'Menerapkan kondisi seimbang R₁ R₄ = R₂ R₃.',
      'Mengukur resistor tak diketahui dengan mengatur yang diketahui sampai seimbang.',
      'Memahami mengapa jembatan sangat sensitif — perubahan kecil dekat seimbang menghasilkan defleksi besar.',
    ],
  },  tryThis: {
    en: [
      'All four R equal — perfectly balanced, galvanometer reads 0.',
      'Set R₁ = R₂ = R₃ = 100 Ω, then adjust R₄ to balance with an "unknown" R.',
      'Tiny imbalance — sensitive readout, useful for strain gauges.',
    ],
    id: [
      'Keempat R sama — seimbang sempurna, galvanometer 0.',
      'Atur R₁ = R₂ = R₃ = 100 Ω, lalu atur R₄ untuk menyeimbangkan dengan R "tak diketahui".',
      'Ketidakseimbangan kecil — bacaan sensitif, berguna untuk strain gauge.',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'A Wheatstone bridge is nothing more than two voltage dividers connected across the same battery. On the left, R₁ and R₂ in series split the battery voltage V, so point B sits at V_B = V·R₂/(R₁ + R₂). On the right, R₃ and R₄ do the same for point D: V_D = V·R₄/(R₃ + R₄). The galvanometer bridges B and D and responds to the difference V_g = V_B − V_D. When the two dividers split the voltage in the same proportion the difference is zero, the needle rests in the middle, and the bridge is said to be balanced.',
        'Setting V_B = V_D and rearranging gives the balance condition R₁/R₂ = R₃/R₄, or equivalently R₁·R₄ = R₂·R₃. The battery voltage cancels out completely, and so does any imperfection in the galvanometer, because all we ask of it is to show zero. That is what makes the bridge a null measurement: if three resistors are known and the fourth is unknown, you adjust a known one until the needle reads zero and compute the unknown from the ratio, with an accuracy limited only by the reference resistors. The Auto-balance button does exactly this, setting R₄ = R₂·R₃/R₁.',
        'In the simulation the four sliders set R₁ to R₄ between 1 Ω and 1000 Ω and a fifth sets the battery voltage. The readout shows V_B, V_D, their difference and the ratio R₁·R₄/(R₂·R₃), which equals 1 at balance; the needle swing is proportional to V_g and hits its stop at about ±2 V. Try an equal-arm bridge of four 100 Ω resistors at 9 V and nudge R₄ by 1 Ω: V_g changes by roughly 22 mV, a change you could never read from a single resistor measurement. Near balance V_g is almost exactly proportional to the small change in resistance, which is why bridges are the standard front end for strain gauges and resistance thermometers.',
        'The model is idealised. The galvanometer is treated as a perfect voltmeter that draws no current, so the readout is a voltage rather than a galvanometer current; a real meter has a finite resistance and draws a current equal to V_g divided by the bridge\'s Thévenin resistance plus its own. The battery has no internal resistance, the connecting wires have none, and the resistors are exact and do not warm up. None of these change the balance condition, which is what makes the bridge so robust, but they do change how large the off-balance deflection is.',
      ],
      id: [
        'Jembatan Wheatstone tidak lebih dari dua pembagi tegangan yang dipasang pada baterai yang sama. Di kiri, R₁ dan R₂ yang diseri membagi tegangan baterai V, sehingga titik B berada pada V_B = V·R₂/(R₁ + R₂). Di kanan, R₃ dan R₄ melakukan hal yang sama untuk titik D: V_D = V·R₄/(R₃ + R₄). Galvanometer menjembatani B dan D dan menanggapi selisihnya, V_g = V_B − V_D. Ketika kedua pembagi membagi tegangan dengan perbandingan yang sama, selisihnya nol, jarum diam di tengah, dan jembatan disebut seimbang.',
        'Menyamakan V_B = V_D lalu menyusun ulang menghasilkan syarat seimbang R₁/R₂ = R₃/R₄, atau setara dengan R₁·R₄ = R₂·R₃. Tegangan baterai hilang sepenuhnya dari persamaan, begitu pula ketidaksempurnaan galvanometer, karena kita hanya memintanya menunjukkan nol. Inilah yang membuat jembatan menjadi pengukuran nol: jika tiga resistor diketahui dan yang keempat tidak, kamu mengatur salah satu yang diketahui sampai jarum menunjuk nol, lalu menghitung yang tak diketahui dari perbandingannya, dengan ketelitian yang hanya dibatasi oleh resistor acuan. Tombol Auto-balance melakukan persis ini, mengatur R₄ = R₂·R₃/R₁.',
        'Di simulasi, empat slider mengatur R₁ sampai R₄ antara 1 Ω dan 1000 Ω dan slider kelima mengatur tegangan baterai. Tampilan menunjukkan V_B, V_D, selisihnya, dan rasio R₁·R₄/(R₂·R₃) yang bernilai 1 saat seimbang; simpangan jarum sebanding dengan V_g dan mentok pada sekitar ±2 V. Coba jembatan dengan empat resistor 100 Ω pada 9 V, lalu ubah R₄ sebesar 1 Ω: V_g berubah sekitar 22 mV, perubahan yang tak mungkin terbaca dari pengukuran satu resistor saja. Di dekat seimbang V_g hampir tepat sebanding dengan perubahan kecil hambatan, dan itulah sebabnya jembatan menjadi rangkaian depan standar untuk strain gauge dan termometer hambatan.',
        'Modelnya ideal. Galvanometer dianggap voltmeter sempurna yang tidak menarik arus, sehingga tampilannya adalah tegangan, bukan arus galvanometer; meter sungguhan punya hambatan berhingga dan menarik arus sebesar V_g dibagi hambatan Thévenin jembatan ditambah hambatannya sendiri. Baterai tidak punya hambatan dalam, kawat penghubung tidak berhambatan, dan resistor tepat nilainya serta tidak memanas. Semua ini tidak mengubah syarat seimbang, yang membuat jembatan begitu andal, tetapi memang mengubah seberapa besar simpangan saat tidak seimbang.',
      ],
    },
    figure: {
      caption: {
        en: 'Two voltage dividers share one battery. The galvanometer between B and D reads V_B − V_D, which is zero exactly when R₁/R₂ = R₃/R₄, whatever the battery voltage.',
        id: 'Dua pembagi tegangan memakai satu baterai. Galvanometer antara B dan D membaca V_B − V_D, yang bernilai nol tepat ketika R₁/R₂ = R₃/R₄, berapa pun tegangan baterainya.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Wheatstone bridge circuit', 'Rangkaian jembatan Wheatstone')}">
  <style>text{font:12px system-ui,sans-serif;fill:currentColor}.w{fill:none;stroke:currentColor;stroke-width:1.6}.s{font-size:10px}.r{stroke:currentColor;stroke-width:1}</style>
  <path d="M180 40 L95 125 L180 210 L265 125 Z" class="w"/>
  <rect x="-16" y="-6" width="32" height="12" transform="translate(137.5 82.5) rotate(-45)" fill="#ef4444" class="r"/>
  <rect x="-16" y="-6" width="32" height="12" transform="translate(137.5 167.5) rotate(45)" fill="#3b82f6" class="r"/>
  <rect x="-16" y="-6" width="32" height="12" transform="translate(222.5 82.5) rotate(45)" fill="#8b5cf6" class="r"/>
  <rect x="-16" y="-6" width="32" height="12" transform="translate(222.5 167.5) rotate(-45)" fill="#10b981" class="r"/>
  <text x="112" y="68" text-anchor="end" fill="#ef4444" font-weight="bold">R₁</text>
  <text x="112" y="190" text-anchor="end" fill="#3b82f6" font-weight="bold">R₂</text>
  <text x="248" y="68" fill="#8b5cf6" font-weight="bold">R₃</text>
  <text x="248" y="190" fill="#10b981" font-weight="bold">R₄</text>
  <path d="M95 125 H166 M194 125 H265" class="w"/>
  <circle cx="180" cy="125" r="14" class="w"/>
  <line x1="180" y1="125" x2="180" y2="114" stroke="#f59e0b" stroke-width="2"/>
  <text x="180" y="156" text-anchor="middle" fill="#f59e0b" class="s">G: V_B − V_D</text>
  <path d="M180 40 V18 H40 V118 M40 128 V232 H180 V210" class="w"/>
  <path d="M30 118 H50 M35 128 H45" stroke="currentColor" stroke-width="2.5"/>
  <text x="22" y="126" text-anchor="end" fill="#f59e0b" font-weight="bold">V</text>
  <circle cx="180" cy="40" r="3" fill="currentColor"/>
  <circle cx="95" cy="125" r="3" fill="currentColor"/>
  <circle cx="180" cy="210" r="3" fill="currentColor"/>
  <circle cx="265" cy="125" r="3" fill="currentColor"/>
  <text x="188" y="36" font-weight="bold">A</text>
  <text x="90" y="118" text-anchor="end" font-weight="bold">B</text>
  <text x="188" y="222" font-weight="bold">C</text>
  <text x="272" y="120" font-weight="bold">D</text>
  <text x="58" y="56" class="s">V_B = V·R₂/(R₁+R₂)</text>
  <text x="206" y="56" class="s">V_D = V·R₄/(R₃+R₄)</text>
  <text x="275" y="150" class="s">${L('balanced when', 'seimbang jika')}</text>
  <text x="275" y="164" class="s" font-weight="bold">R₁·R₄ = R₂·R₃</text>
  <text x="275" y="178" class="s">${L('then V_g = 0', 'maka V_g = 0')}</text>
  <text x="270" y="228" text-anchor="middle" class="s">${L('V cancels out of the balance condition', 'V hilang dari syarat seimbang')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'The bridge is two voltage dividers; the galvanometer compares their midpoint voltages V_B and V_D.',
        'Balance (V_g = 0) occurs when R₁/R₂ = R₃/R₄, equivalently R₁·R₄ = R₂·R₃.',
        'The balance condition does not contain the battery voltage, so the measurement is independent of the supply and of the meter\'s calibration.',
        'An unknown resistor is found by adjusting a known one until the needle reads zero: R_unknown = R₂·R₃/R₁.',
        'Near balance the output is proportional to a small resistance change, which makes bridges ideal for strain gauges and temperature sensors.',
      ],
      id: [
        'Jembatan adalah dua pembagi tegangan; galvanometer membandingkan tegangan titik tengahnya, V_B dan V_D.',
        'Seimbang (V_g = 0) terjadi ketika R₁/R₂ = R₃/R₄, atau setara R₁·R₄ = R₂·R₃.',
        'Syarat seimbang tidak mengandung tegangan baterai, sehingga pengukuran tidak bergantung pada catu daya maupun kalibrasi meter.',
        'Resistor tak diketahui dicari dengan mengatur resistor yang diketahui sampai jarum menunjuk nol: R_tak diketahui = R₂·R₃/R₁.',
        'Di dekat seimbang keluarannya sebanding dengan perubahan kecil hambatan, sehingga jembatan ideal untuk strain gauge dan sensor suhu.',
      ],
    },
    vocabulary: {
      en: [
        ['Wheatstone bridge', 'Four resistors in a diamond with a supply across one diagonal and a detector across the other, used to compare resistances precisely.'],
        ['Voltage divider', 'Two resistors in series; the voltage at their junction is the supply voltage times the fraction R_lower/(R_upper + R_lower).'],
        ['Balance (null) condition', 'The setting at which the detector reads zero, R₁·R₄ = R₂·R₃.'],
        ['Galvanometer', 'A sensitive meter whose needle deflects in proportion to a small current; here idealised as reading the voltage V_B − V_D.'],
        ['Null measurement', 'A method that adjusts a known quantity until a detector reads zero, so the result does not depend on the detector\'s accuracy or the supply.'],
        ['Sensitivity', 'How much the detector output changes per unit change in resistance; for an equal-arm bridge roughly V/(4R) volts per ohm near balance.'],
        ['Strain gauge', 'A thin resistive foil whose resistance changes by a fraction of a percent when stretched; read with a bridge.'],
      ],
      id: [
        ['Jembatan Wheatstone', 'Empat resistor dalam susunan belah ketupat dengan sumber pada satu diagonal dan detektor pada diagonal lainnya, untuk membandingkan hambatan secara teliti.'],
        ['Pembagi tegangan', 'Dua resistor seri; tegangan di titik sambungnya sama dengan tegangan sumber dikali pecahan R_bawah/(R_atas + R_bawah).'],
        ['Syarat seimbang (nol)', 'Pengaturan ketika detektor membaca nol, R₁·R₄ = R₂·R₃.'],
        ['Galvanometer', 'Meter peka yang jarumnya menyimpang sebanding dengan arus kecil; di sini diidealkan membaca tegangan V_B − V_D.'],
        ['Pengukuran nol', 'Metode yang mengatur besaran yang diketahui sampai detektor membaca nol, sehingga hasilnya tidak bergantung pada ketelitian detektor maupun sumber.'],
        ['Sensitivitas', 'Seberapa besar keluaran detektor berubah per satuan perubahan hambatan; untuk jembatan berlengan sama kira-kira V/(4R) volt per ohm di dekat seimbang.'],
        ['Strain gauge', 'Lembaran resistif tipis yang hambatannya berubah sepersekian persen ketika diregangkan; dibaca dengan jembatan.'],
      ],
    },
    misconceptions: {
      en: [
        ['At balance no current flows anywhere in the bridge.', 'Current flows through both arms, A→B→C and A→D→C, the whole time. Only the galvanometer branch between B and D carries no current, because B and D are at the same potential.'],
        ['The bridge is only balanced when all four resistors are equal.', 'Only the ratios must match: R₁/R₂ = R₃/R₄. Resistors of 100, 200, 300 and 600 Ω balance perfectly, as the ratio readout shows.'],
        ['Raising the battery voltage will unbalance the bridge.', 'V_B and V_D both scale with V, so their difference stays zero at balance. A higher voltage only makes any existing imbalance show up as a larger deflection.'],
        ['The galvanometer measures the current through the battery.', 'It sits between B and D and responds only to the potential difference between those two points, which is why it can read exactly zero while the battery delivers current.'],
      ],
      id: [
        ['Saat seimbang tidak ada arus yang mengalir di mana pun dalam jembatan.', 'Arus terus mengalir melalui kedua lengan, A→B→C dan A→D→C. Hanya cabang galvanometer antara B dan D yang tidak dialiri arus, karena B dan D berpotensial sama.'],
        ['Jembatan hanya seimbang jika keempat resistor sama besar.', 'Yang harus sama hanya perbandingannya: R₁/R₂ = R₃/R₄. Resistor 100, 200, 300, dan 600 Ω seimbang sempurna, seperti terlihat pada tampilan rasio.'],
        ['Menaikkan tegangan baterai akan membuat jembatan tidak seimbang.', 'V_B dan V_D sama-sama berskala dengan V, sehingga selisihnya tetap nol saat seimbang. Tegangan lebih tinggi hanya membuat ketidakseimbangan yang sudah ada tampak sebagai simpangan lebih besar.'],
        ['Galvanometer mengukur arus yang melewati baterai.', 'Ia berada di antara B dan D dan hanya menanggapi beda potensial kedua titik itu, sehingga bisa membaca tepat nol sementara baterai tetap mengalirkan arus.'],
      ],
    },
    realWorld: {
      en: [
        'Digital kitchen and bathroom scales contain a load cell: strain gauges glued to a metal beam and wired as a Wheatstone bridge, whose tiny off-balance voltage is proportional to the weight.',
        'Platinum resistance thermometers (RTDs) and thermistors are read with a bridge so that the small resistance change with temperature becomes a clean voltage signal.',
        'Silicon pressure sensors in cars, phones and medical monitors use four piezoresistors etched into a diaphragm, forming a bridge that unbalances as the diaphragm flexes.',
        'Telephone and power engineers used bridge methods (the Murray loop test) to find the distance to a fault in a buried cable from the ratio of resistances.',
      ],
      id: [
        'Timbangan dapur dan timbangan badan digital berisi load cell: strain gauge yang ditempel pada balok logam dan dirangkai sebagai jembatan Wheatstone, dengan tegangan ketidakseimbangan kecil yang sebanding dengan berat.',
        'Termometer hambatan platina (RTD) dan termistor dibaca dengan jembatan agar perubahan hambatan yang kecil terhadap suhu menjadi sinyal tegangan yang bersih.',
        'Sensor tekanan silikon pada mobil, ponsel, dan monitor medis memakai empat piezoresistor yang diukir pada diafragma, membentuk jembatan yang tidak seimbang ketika diafragma melentur.',
        'Teknisi telepon dan listrik memakai metode jembatan (uji loop Murray) untuk menemukan jarak ke titik gangguan pada kabel tertanam dari perbandingan hambatan.',
      ],
    },
    questions: {
      en: [
        { q: 'R₁ = 100 Ω, R₂ = 200 Ω and R₃ = 150 Ω. What value of R₄ balances the bridge?', a: 'From R₁·R₄ = R₂·R₃, R₄ = R₂·R₃/R₁ = 200 × 150 / 100 = 300 Ω. Check: R₁/R₂ = 0.5 and R₃/R₄ = 150/300 = 0.5.' },
        { q: 'All four resistors are 100 Ω and the battery is 9 V. R₄ drifts to 101 Ω. What does the galvanometer read?', a: 'V_B = 9 × 100/200 = 4.500 V. V_D = 9 × 101/201 ≈ 4.522 V. V_g = V_B − V_D ≈ −0.022 V, about −22 mV. A 1% change in one resistor gives a clear signal, and the sign tells you which way it changed.' },
        { q: 'The bridge is balanced at 9 V. You raise the battery to 24 V. Does the needle move? What would happen if the bridge were slightly off balance instead?', a: 'At balance the needle stays at zero, because V_B and V_D both scale with the battery voltage and remain equal. Off balance, the same resistance error produces a deflection 24/9 ≈ 2.7 times larger, so a higher supply increases sensitivity without changing the balance point.' },
      ],
      id: [
        { q: 'R₁ = 100 Ω, R₂ = 200 Ω, dan R₃ = 150 Ω. Berapa nilai R₄ agar jembatan seimbang?', a: 'Dari R₁·R₄ = R₂·R₃, R₄ = R₂·R₃/R₁ = 200 × 150 / 100 = 300 Ω. Periksa: R₁/R₂ = 0,5 dan R₃/R₄ = 150/300 = 0,5.' },
        { q: 'Keempat resistor 100 Ω dan baterai 9 V. R₄ bergeser menjadi 101 Ω. Berapa bacaan galvanometer?', a: 'V_B = 9 × 100/200 = 4,500 V. V_D = 9 × 101/201 ≈ 4,522 V. V_g = V_B − V_D ≈ −0,022 V, sekitar −22 mV. Perubahan 1% pada satu resistor memberi sinyal yang jelas, dan tandanya memberi tahu ke arah mana perubahannya.' },
        { q: 'Jembatan seimbang pada 9 V. Kamu menaikkan baterai ke 24 V. Apakah jarum bergerak? Apa yang terjadi jika jembatan sedikit tidak seimbang?', a: 'Saat seimbang jarum tetap di nol, karena V_B dan V_D sama-sama berskala dengan tegangan baterai dan tetap sama besar. Saat tidak seimbang, kesalahan hambatan yang sama menghasilkan simpangan 24/9 ≈ 2,7 kali lebih besar, sehingga tegangan lebih tinggi menaikkan sensitivitas tanpa mengubah titik seimbang.' },
      ],
    },
  },
};
