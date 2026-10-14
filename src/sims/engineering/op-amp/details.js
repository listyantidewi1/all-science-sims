// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'See where the inverting amplifier formula G = −R_f / R_in comes from.',
      'Watch the output saturate at the supply rails when the gain is too large.',
      'Understand why the inverting input is called the "virtual ground".',
    ],
    id: [
      'Melihat asal rumus penguat inverting G = −R_f / R_in.',
      'Mengamati output jenuh di rel suplai bila penguatan terlalu besar.',
      'Memahami mengapa input inverting disebut "virtual ground".',
    ],
  },
  tryThis: {
    en: [
      'R_f = R_in — gain −1 (just inverts).',
      'R_f = 10·R_in — clean ×10 inverting amplifier.',
      'Crank R_f very high — output clips at the supply rails (±15 V).',
    ],
    id: [
      'R_f = R_in — penguatan −1 (sekadar membalik).',
      'R_f = 10·R_in — penguat inverting ×10 yang bersih.',
      'Naikkan R_f sangat tinggi — output dipotong di rel suplai (±15 V).',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'An operational amplifier (op-amp) is a tiny integrated circuit that amplifies the voltage difference between its two inputs, labelled + (non-inverting) and − (inverting), by an enormous factor, typically 100,000 or more. On its own that gain is useless, because a few microvolts of difference would slam the output into the supply rails. The trick is negative feedback: a resistor R_f feeds part of the output back to the inverting input. If the output rises too far, the feedback pulls the − input up, which drives the output back down. The op-amp therefore does whatever is necessary to keep its two inputs at almost exactly the same voltage. Two "golden rules" summarise an ideal op-amp with feedback: no current flows into either input, and the output adjusts until V+ equals V−.',
        'In the inverting configuration the + input is grounded, so the second rule pins the − input at 0 V even though no wire connects it to ground: it is a virtual ground. The input signal drives a current V_in / R_in through R_in toward that node. By the first rule none of it can enter the op-amp, so all of it must continue through R_f to the output, which means V_out = 0 − (V_in / R_in) · R_f. The gain is G = V_out / V_in = −R_f / R_in, set by the two resistors alone and independent of the op-amp\'s own huge gain. The minus sign means the output is upside down: a positive input peak becomes a negative output peak, and a sine wave comes out shifted by half a cycle. A side effect is that the circuit\'s input resistance is just R_in, since the source sees R_in connected to a point held at 0 V.',
        'The sim lets you set R_in from 1 to 100 kΩ and R_f from 1 to 500 kΩ, change the amplitude and frequency of the input sine wave, and watch the input (blue) and output (green) traces together. Because the model is ideal, the output follows the formula perfectly until it hits the ±15 V supply rails. No amplifier can output more than it is powered with, so the sim clips the output flat at ±15 V and flags it in red. Clipping turns a sine wave into a flat-topped shape full of harmonics, which is exactly the distortion you hear when an audio amplifier is driven too hard. The preset ×100 uses R_in = 1 kΩ and R_f = 100 kΩ; with the default 1 V input that demands 100 V peaks and clips heavily.',
        'Real op-amps break the golden rules a little. Their gain falls with frequency (a 1 MHz gain-bandwidth product means a ×100 amplifier only works up to about 10 kHz), the output cannot change faster than the slew rate, the output typically stops a volt or two short of the rails unless the part is a rail-to-rail type, tiny input bias currents and an input offset voltage add small errors, and the output current is limited to tens of milliamps. The sim ignores all of these, which is appropriate for the slow, small signals shown here, but a designer must check each one against the datasheet.',
      ],
      id: [
        'Penguat operasional (op-amp) adalah rangkaian terpadu kecil yang memperkuat beda tegangan antara kedua inputnya, berlabel + (non-inverting) dan − (inverting), dengan faktor yang sangat besar, biasanya 100.000 atau lebih. Dengan sendirinya penguatan itu tidak berguna, karena beda beberapa mikrovolt saja akan membanting output ke rel suplai. Kuncinya adalah umpan balik negatif: sebuah resistor R_f mengembalikan sebagian output ke input inverting. Jika output naik terlalu jauh, umpan balik menarik input − ke atas, yang mendorong output kembali turun. Karena itu op-amp melakukan apa pun yang perlu untuk menjaga kedua inputnya pada tegangan yang hampir tepat sama. Dua "aturan emas" merangkum op-amp ideal dengan umpan balik: tidak ada arus yang mengalir ke kedua input, dan output menyesuaikan diri sampai V+ sama dengan V−.',
        'Dalam konfigurasi inverting, input + dihubungkan ke ground, sehingga aturan kedua menahan input − pada 0 V meskipun tidak ada kawat yang menghubungkannya ke ground: inilah virtual ground. Sinyal input mengalirkan arus V_in / R_in melalui R_in menuju simpul itu. Menurut aturan pertama tidak ada arus yang bisa masuk ke op-amp, sehingga seluruhnya harus berlanjut melalui R_f ke output, yang berarti V_out = 0 − (V_in / R_in) · R_f. Penguatannya G = V_out / V_in = −R_f / R_in, ditentukan oleh kedua resistor saja dan tidak bergantung pada penguatan raksasa op-amp itu sendiri. Tanda minus berarti output terbalik: puncak input positif menjadi puncak output negatif, dan gelombang sinus keluar bergeser setengah siklus. Efek sampingnya, resistansi input rangkaian hanyalah R_in, karena sumber melihat R_in terhubung ke titik yang ditahan pada 0 V.',
        'Simulasi ini membiarkanmu mengatur R_in dari 1 sampai 100 kΩ dan R_f dari 1 sampai 500 kΩ, mengubah amplitudo dan frekuensi gelombang sinus input, dan mengamati jejak input (biru) dan output (hijau) bersama-sama. Karena modelnya ideal, output mengikuti rumus dengan sempurna sampai menyentuh rel suplai ±15 V. Tidak ada penguat yang bisa mengeluarkan tegangan lebih besar daripada catu dayanya, sehingga simulasi memotong output rata pada ±15 V dan menandainya dengan merah. Pemotongan (clipping) mengubah gelombang sinus menjadi bentuk berpuncak rata yang penuh harmonik, persis distorsi yang kamu dengar ketika penguat audio didorong terlalu keras. Preset ×100 memakai R_in = 1 kΩ dan R_f = 100 kΩ; dengan input awal 1 V ia menuntut puncak 100 V dan terpotong parah.',
        'Op-amp sungguhan sedikit melanggar aturan emas. Penguatannya turun terhadap frekuensi (produk penguatan-lebar pita 1 MHz berarti penguat ×100 hanya bekerja sampai sekitar 10 kHz), output tidak bisa berubah lebih cepat daripada laju slew, output biasanya berhenti satu atau dua volt sebelum rel kecuali komponennya bertipe rail-to-rail, arus bias input yang kecil dan tegangan offset input menambah galat kecil, dan arus output dibatasi puluhan miliampere. Simulasi mengabaikan semuanya, yang wajar untuk sinyal lambat dan kecil yang ditampilkan di sini, tetapi perancang harus memeriksa tiap hal itu terhadap lembar data.',
      ],
    },
    figure: {
      caption: {
        en: 'The inverting amplifier. The + input is grounded, so feedback holds the − input at 0 V (virtual ground). The current V_in / R_in cannot enter the op-amp, so it all flows through R_f, giving V_out = −(R_f / R_in) · V_in.',
        id: 'Penguat inverting. Input + dihubungkan ke ground, sehingga umpan balik menahan input − pada 0 V (virtual ground). Arus V_in / R_in tidak bisa masuk ke op-amp, sehingga seluruhnya mengalir melalui R_f, menghasilkan V_out = −(R_f / R_in) · V_in.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Inverting op-amp amplifier schematic', 'Skema penguat inverting op-amp')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.w{fill:none;stroke:currentColor;stroke-width:1.6}.t{text-anchor:middle}.s{font-size:10px}</style>
  <circle cx="34" cy="120" r="12" class="w"/>
  <path d="M28 120 q3 -6 6 0 q3 6 6 0" class="w"/>
  <text x="34" y="146" class="t">V_in</text>
  <path d="M46 120 H70" class="w"/>
  <path d="M70 120 l5 -7 l10 14 l10 -14 l10 14 l10 -14 l10 14 l5 -7 H140" fill="none" stroke="#ef4444" stroke-width="2"/>
  <text x="105" y="104" class="t" fill="#ef4444">R_in</text>
  <circle cx="140" cy="120" r="3.5" fill="currentColor"/>
  <text x="130" y="160" class="t s">${L('virtual ground', 'virtual ground')}</text>
  <text x="130" y="172" class="t s">V− = 0 V</text>
  <path d="M140 120 H168" class="w"/>
  <path d="M168 90 L168 150 L232 120 Z" class="w"/>
  <text x="178" y="124" font-weight="700">−</text>
  <text x="178" y="146" font-weight="700">+</text>
  <path d="M150 142 H168 M150 142 V160 M142 160 H158 M145 165 H155 M148 170 H152" class="w"/>
  <path d="M232 120 H300" class="w"/>
  <circle cx="300" cy="120" r="3.5" fill="currentColor"/>
  <text x="318" y="124">V_out</text>
  <path d="M140 120 V60 H160 M280 60 H300 V120" class="w"/>
  <path d="M160 60 l5 -7 l10 14 l10 -14 l10 14 l10 -14 l10 14 l10 -14 l10 14 l10 -14 l10 14 l10 -14 l10 14 l5 -7" fill="none" stroke="#f59e0b" stroke-width="2"/>
  <text x="220" y="44" class="t" fill="#f59e0b">R_f</text>
  <path d="M84 134 H120" stroke="#3b82f6" stroke-width="2.2" marker-end="url(#a)"/>
  <text x="100" y="148" class="t s" fill="#3b82f6">I = V_in / R_in</text>
  <path d="M175 74 H255" stroke="#3b82f6" stroke-width="2.2" marker-end="url(#a)"/>
  <text x="215" y="88" class="t s" fill="#3b82f6">${L('same I (none enters op-amp)', 'I yang sama (tak ada yang masuk op-amp)')}</text>
  <text x="200" y="196" class="t" fill="#10b981">V_out = −(R_f / R_in) · V_in</text>
  <text x="200" y="214" class="t s">${L('output cannot exceed the ±15 V supply: it clips', 'output tidak bisa melebihi suplai ±15 V: terpotong')}</text>
  <text x="200" y="230" class="t s">${L('golden rules: no input current;  V+ = V−', 'aturan emas: tak ada arus input;  V+ = V−')}</text>
  <defs><marker id="a" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="context-stroke"/></marker></defs>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'An op-amp has enormous open-loop gain; negative feedback tames it so the closed-loop gain is set by external resistors.',
        'Golden rules for an ideal op-amp with feedback: no current flows into the inputs, and the output drives V+ and V− to be equal.',
        'With the + input grounded, the − input sits at 0 V without being connected to ground: the virtual ground.',
        'All the input current V_in / R_in flows on through R_f, so V_out = −(R_f / R_in) · V_in; the output is amplified and inverted.',
        'The output can never exceed the supply voltage; asking for more produces clipping, a flat-topped, distorted waveform.',
      ],
      id: [
        'Op-amp memiliki penguatan loop terbuka yang sangat besar; umpan balik negatif menjinakkannya sehingga penguatan loop tertutup ditentukan oleh resistor luar.',
        'Aturan emas op-amp ideal dengan umpan balik: tidak ada arus yang masuk ke input, dan output menggerakkan V+ dan V− hingga sama.',
        'Dengan input + ke ground, input − berada pada 0 V tanpa terhubung ke ground: inilah virtual ground.',
        'Seluruh arus input V_in / R_in mengalir terus melalui R_f, sehingga V_out = −(R_f / R_in) · V_in; output diperkuat dan dibalik.',
        'Output tidak pernah bisa melebihi tegangan suplai; meminta lebih menghasilkan clipping, bentuk gelombang berpuncak rata yang terdistorsi.',
      ],
    },
    vocabulary: {
      en: [
        ['Operational amplifier', 'A high-gain differential amplifier IC whose behaviour in a circuit is set almost entirely by the feedback network around it.'],
        ['Negative feedback', 'Returning part of the output to the inverting input so that any error drives the output back toward the correct value.'],
        ['Closed-loop gain', 'The overall gain of the amplifier with feedback applied: −R_f / R_in for the inverting configuration.'],
        ['Virtual ground', 'A node held at 0 V by feedback even though it is not wired to ground; the inverting input in this circuit.'],
        ['Inverting', 'Producing an output of opposite sign to the input, so a sine wave is shifted by half a cycle (180°).'],
        ['Saturation (clipping)', 'The output sticking at its maximum or minimum possible value, close to the supply rails, when the formula asks for more.'],
        ['Supply rails', 'The positive and negative power-supply voltages that bound the output, ±15 V in this sim.'],
        ['Input impedance', 'The resistance a signal source sees looking into the amplifier; equal to R_in for the inverting amplifier.'],
      ],
      id: [
        ['Penguat operasional', 'IC penguat diferensial berpenguatan tinggi yang perilakunya dalam rangkaian hampir seluruhnya ditentukan oleh jaringan umpan balik di sekitarnya.'],
        ['Umpan balik negatif', 'Mengembalikan sebagian output ke input inverting sehingga setiap galat mendorong output kembali ke nilai yang benar.'],
        ['Penguatan loop tertutup', 'Penguatan keseluruhan penguat dengan umpan balik terpasang: −R_f / R_in untuk konfigurasi inverting.'],
        ['Virtual ground', 'Simpul yang ditahan pada 0 V oleh umpan balik meskipun tidak dikawatkan ke ground; input inverting pada rangkaian ini.'],
        ['Inverting (membalik)', 'Menghasilkan output bertanda berlawanan dengan input, sehingga gelombang sinus bergeser setengah siklus (180°).'],
        ['Saturasi (clipping)', 'Output yang tertahan pada nilai maksimum atau minimumnya, dekat rel suplai, ketika rumus meminta lebih.'],
        ['Rel suplai', 'Tegangan catu daya positif dan negatif yang membatasi output, ±15 V dalam simulasi ini.'],
        ['Impedansi input', 'Resistansi yang dilihat sumber sinyal saat memandang ke dalam penguat; sama dengan R_in untuk penguat inverting.'],
      ],
    },
    misconceptions: {
      en: [
        ['The gain of the circuit depends on how good the op-amp is.', 'With enough open-loop gain, the closed-loop gain is set only by R_f / R_in. Swapping a 100,000-gain op-amp for a 1,000,000-gain one changes the result by a negligible amount; that insensitivity is the whole point of feedback.'],
        ['The inverting input is connected to ground.', 'It is not wired to ground; it is held at 0 V by the feedback action. Break the feedback resistor and the node is free to swing. Hence "virtual" ground.'],
        ['A bigger R_f always gives a bigger output.', 'Only until the output reaches the supply rails. Beyond that the peaks are clipped flat, the waveform is distorted, and the real gain for the peaks is less than the formula says.'],
        ['The sign in G = −R_f / R_in means the amplifier makes the signal smaller.', 'The minus sign only means the output is inverted. A gain of −10 makes the signal ten times larger and flips it upside down.'],
      ],
      id: [
        ['Penguatan rangkaian bergantung pada seberapa bagus op-amp-nya.', 'Dengan penguatan loop terbuka yang cukup besar, penguatan loop tertutup hanya ditentukan oleh R_f / R_in. Mengganti op-amp berpenguatan 100.000 dengan yang 1.000.000 mengubah hasil hanya sedikit sekali; ketidakpekaan itulah inti dari umpan balik.'],
        ['Input inverting terhubung ke ground.', 'Ia tidak dikawatkan ke ground; ia ditahan pada 0 V oleh kerja umpan balik. Putuskan resistor umpan balik dan simpul itu bebas berayun. Karena itu disebut ground "virtual".'],
        ['R_f yang lebih besar selalu memberi output lebih besar.', 'Hanya sampai output mencapai rel suplai. Setelah itu puncaknya terpotong rata, bentuk gelombangnya terdistorsi, dan penguatan nyata untuk puncaknya lebih kecil dari yang dikatakan rumus.'],
        ['Tanda minus pada G = −R_f / R_in berarti penguat memperkecil sinyal.', 'Tanda minus hanya berarti output dibalik. Penguatan −10 membuat sinyal sepuluh kali lebih besar dan membaliknya.'],
      ],
    },
    realWorld: {
      en: [
        'Audio mixers and guitar effect pedals use inverting op-amp stages to set gain with a volume pot in place of R_f; turning it past the point where the output hits the rails produces the deliberate distortion of an overdrive pedal.',
        'Sensor front ends for thermocouples, strain gauges and photodiodes use op-amp stages to scale microvolt or microamp signals up to the volts an analogue-to-digital converter needs.',
        'Active filters, integrators and summing amplifiers in analogue synthesisers and control systems are all small variations of this circuit with capacitors or extra input resistors added at the virtual-ground node.',
        'The 741 op-amp introduced in 1968 is still sold today; modern parts such as rail-to-rail CMOS op-amps run from a single 3.3 V supply inside phones and wearables.',
      ],
      id: [
        'Mixer audio dan pedal efek gitar memakai tahap op-amp inverting untuk mengatur penguatan dengan potensiometer volume menggantikan R_f; memutarnya melewati titik ketika output menyentuh rel menghasilkan distorsi yang disengaja pada pedal overdrive.',
        'Bagian depan sensor untuk termokopel, strain gauge, dan fotodioda memakai tahap op-amp untuk menaikkan sinyal mikrovolt atau mikroampere ke level volt yang dibutuhkan pengubah analog-ke-digital.',
        'Filter aktif, integrator, dan penguat penjumlah pada synthesizer analog dan sistem kendali semuanya adalah variasi kecil dari rangkaian ini dengan kapasitor atau resistor input tambahan di simpul virtual ground.',
        'Op-amp 741 yang diperkenalkan tahun 1968 masih dijual sampai sekarang; komponen modern seperti op-amp CMOS rail-to-rail berjalan dari satu catu 3,3 V di dalam ponsel dan perangkat yang dikenakan.',
      ],
    },
    questions: {
      en: [
        { q: 'R_in = 10 kΩ, R_f = 50 kΩ and the input is a 1 V peak sine wave. What is the output, and how does it look on the trace compared with the input?', a: 'G = −50/10 = −5, so the output is a 5 V peak sine wave. On the trace it is five times taller and upside down: when the blue input is at its positive peak, the green output is at −5 V, half a cycle out of step.' },
        { q: 'With R_in = 1 kΩ and R_f = 100 kΩ, what is the largest input peak that still gives an undistorted output on ±15 V supplies?', a: 'Gain is −100, so the output hits 15 V when the input reaches 0.15 V. Any input peak above 0.15 V (150 mV) drives the output into the rails and the peaks are clipped flat, which the sim flags in red.' },
        { q: 'Explain, using the golden rules, why the current through R_f must equal the current through R_in, and what that implies for V_out.', a: 'The feedback holds the − input at the same voltage as the grounded + input, 0 V, and the ideal op-amp draws no input current. So the current V_in / R_in arriving at the virtual-ground node has nowhere to go except through R_f. The voltage drop across R_f is therefore (V_in / R_in) · R_f, and since one end of R_f sits at 0 V, the other end, V_out, must be at −(R_f / R_in) · V_in.' },
      ],
      id: [
        { q: 'R_in = 10 kΩ, R_f = 50 kΩ dan inputnya gelombang sinus berpuncak 1 V. Berapa outputnya, dan bagaimana tampilannya pada jejak dibandingkan input?', a: 'G = −50/10 = −5, sehingga output adalah gelombang sinus berpuncak 5 V. Pada jejak ia lima kali lebih tinggi dan terbalik: ketika input biru berada di puncak positifnya, output hijau berada di −5 V, berselisih setengah siklus.' },
        { q: 'Dengan R_in = 1 kΩ dan R_f = 100 kΩ, berapa puncak input terbesar yang masih memberi output tanpa distorsi pada suplai ±15 V?', a: 'Penguatannya −100, sehingga output menyentuh 15 V ketika input mencapai 0,15 V. Puncak input di atas 0,15 V (150 mV) mendorong output ke rel dan puncaknya terpotong rata, yang ditandai simulasi dengan merah.' },
        { q: 'Jelaskan, dengan aturan emas, mengapa arus melalui R_f harus sama dengan arus melalui R_in, dan apa akibatnya bagi V_out.', a: 'Umpan balik menahan input − pada tegangan yang sama dengan input + yang di-ground, yaitu 0 V, dan op-amp ideal tidak menarik arus input. Jadi arus V_in / R_in yang tiba di simpul virtual ground tidak punya jalan lain selain melalui R_f. Jatuh tegangan pada R_f karena itu (V_in / R_in) · R_f, dan karena satu ujung R_f berada di 0 V, ujung lainnya, V_out, harus berada pada −(R_f / R_in) · V_in.' },
      ],
    },
  },
};
