// Long-form text for the Parallel-Plate Capacitor sim (Fase F, grades 11–12).
export default {
  objectives: {
    en: [
      'Calculate the capacitance of a parallel-plate capacitor with C = κε₀A/d, using ε₀ = 8.85 × 10⁻¹² F/m, and predict how C changes when A, d or the dielectric changes.',
      'Relate charge, voltage, field and energy: Q = CV, E = V/d and U = ½CV² = ½QV = Q²/(2C).',
      'Describe RC charging with V(t) = V₀(1 − e^(−t/RC)) and read the time constant τ = RC from a graph (63% of V₀ after one τ).',
    ],
    id: [
      'Menghitung kapasitansi kapasitor keping sejajar dengan C = κε₀A/d, memakai ε₀ = 8,85 × 10⁻¹² F/m, dan memprediksi perubahan C saat A, d, atau dielektrik diubah.',
      'Menghubungkan muatan, tegangan, medan, dan energi: Q = CV, E = V/d, dan U = ½CV² = ½QV = Q²/(2C).',
      'Menjelaskan pengisian RC dengan V(t) = V₀(1 − e^(−t/RC)) dan membaca tetapan waktu τ = RC dari grafik (63% dari V₀ setelah satu τ).',
    ],
  },
  tryThis: {
    en: [
      'Set A = 100 cm², d = 1.0 mm and air. Check that C ≈ 88.5 pF. Halve the gap: does C double?',
      'Keep A and d fixed and switch the dielectric from air to water (κ ≈ 80). C and Q jump 80 times, but the field lines do not change. Why?',
      'With 200 V across a 0.1 mm air gap, E = 2 × 10⁶ V/m. Raise the voltage past 300 V: the sim warns when E passes the 3 × 10⁶ V/m breakdown field of air.',
      'Switch on RC mode with R = 1 MΩ and C ≈ 88.5 pF. Read τ from the graph (where V reaches 63% of V₀) and compare it with R × C = 88.5 μs.',
    ],
    id: [
      'Atur A = 100 cm², d = 1,0 mm, dan udara. Periksa bahwa C ≈ 88,5 pF. Perkecil celah menjadi setengah: apakah C menjadi dua kali lipat?',
      'Pertahankan A dan d, lalu ganti dielektrik dari udara ke air (κ ≈ 80). C dan Q melonjak 80 kali, tetapi garis medannya tidak berubah. Mengapa?',
      'Dengan 200 V pada celah udara 0,1 mm, E = 2 × 10⁶ V/m. Naikkan tegangan melewati 300 V: simulasi memberi peringatan saat E melewati medan tembus udara 3 × 10⁶ V/m.',
      'Nyalakan mode RC dengan R = 1 MΩ dan C ≈ 88,5 pF. Baca τ dari grafik (saat V mencapai 63% dari V₀) dan bandingkan dengan R × C = 88,5 μs.',
    ],
  },

  learn: {
    background: {
      en: [
        'A capacitor stores charge and energy in an electric field. The simplest kind is two parallel metal plates of area A separated by a small gap d. Connected to a battery of voltage V, one plate collects +Q and the other −Q, and a nearly uniform field E = V/d fills the gap. The ratio of charge to voltage is the capacitance, C = Q/V, measured in farads (F). For parallel plates C = κε₀A/d, where ε₀ = 8.85 × 10⁻¹² F/m is the permittivity of free space and κ (kappa) is the relative permittivity, or dielectric constant, of whatever fills the gap: 1 for vacuum or air, about 3.7 for paper, 5 to 10 for glass, and about 80 for water.',
        'Typical school numbers are tiny. Two plates of 100 cm² (0.01 m²) separated by 1 mm of air give C = 8.85 × 10⁻¹² × 0.01 / 0.001 = 88.5 pF; at 100 V they hold Q = CV = 8.85 nC, about 5.5 × 10¹⁰ electrons. Doubling the area doubles C because there is twice as much room for charge; halving the gap doubles C because the attraction across the gap is stronger so more charge fits at the same voltage. A dielectric raises C by the factor κ: the field polarises its molecules, their surface charge partly cancels the field of the plates, and the battery pushes in κ times more charge to restore V.',
        'The stored energy is the work done moving charge against the growing voltage: U = ½QV = ½CV² = Q²/(2C). A 88.5 pF capacitor at 100 V holds only 0.44 μJ, which is why real capacitors use very thin dielectrics and huge rolled-up areas. The field cannot be increased without limit: air breaks down at about 3 × 10⁶ V/m (3 kV per mm) and a spark jumps across the gap. The sim shows the field strength and warns when the air limit is passed.',
        'A capacitor never charges instantly. Through a resistor R the charging current I = (V₀ − V)/R falls as the capacitor voltage V rises, so V approaches V₀ exponentially: V(t) = V₀(1 − e^(−t/RC)). The product τ = RC is the time constant: after one τ the capacitor reaches 63.2% of V₀, after 3τ it reaches 95%, and after 5τ it is within 1% of full. Discharging follows V = V₀e^(−t/RC). With R = 1 MΩ and C = 88.5 pF, τ = 88.5 μs; with a 1000 μF capacitor and 10 kΩ, τ = 10 s. The sim scales its clock so that one τ always takes about one second on screen, whatever its real value.',
      ],
      id: [
        'Kapasitor menyimpan muatan dan energi dalam medan listrik. Jenis paling sederhana adalah dua keping logam sejajar berluas A yang dipisahkan celah kecil d. Saat dihubungkan ke baterai bertegangan V, satu keping mengumpulkan +Q dan keping lain −Q, dan medan hampir seragam E = V/d mengisi celah. Perbandingan muatan terhadap tegangan disebut kapasitansi, C = Q/V, dalam satuan farad (F). Untuk keping sejajar C = κε₀A/d, dengan ε₀ = 8,85 × 10⁻¹² F/m adalah permitivitas ruang hampa dan κ (kappa) adalah permitivitas relatif, atau tetapan dielektrik, bahan pengisi celah: 1 untuk vakum atau udara, sekitar 3,7 untuk kertas, 5 sampai 10 untuk kaca, dan sekitar 80 untuk air.',
        'Angka khas di sekolah sangat kecil. Dua keping 100 cm² (0,01 m²) yang dipisahkan 1 mm udara menghasilkan C = 8,85 × 10⁻¹² × 0,01 / 0,001 = 88,5 pF; pada 100 V keduanya menyimpan Q = CV = 8,85 nC, sekitar 5,5 × 10¹⁰ elektron. Menggandakan luas menggandakan C karena ruang untuk muatan dua kali lebih banyak; mengecilkan celah menjadi setengah menggandakan C karena tarikan melintasi celah lebih kuat sehingga lebih banyak muatan muat pada tegangan yang sama. Dielektrik menaikkan C sebesar faktor κ: medan mempolarisasi molekulnya, muatan permukaannya sebagian meniadakan medan keping, dan baterai mendorong masuk κ kali lebih banyak muatan untuk memulihkan V.',
        'Energi tersimpan adalah usaha untuk memindahkan muatan melawan tegangan yang terus naik: U = ½QV = ½CV² = Q²/(2C). Kapasitor 88,5 pF pada 100 V hanya menyimpan 0,44 μJ, itulah sebabnya kapasitor nyata memakai dielektrik sangat tipis dan luas gulungan yang sangat besar. Medan tidak dapat diperbesar tanpa batas: udara tembus pada sekitar 3 × 10⁶ V/m (3 kV per mm) dan percikan melompati celah. Simulasi menampilkan kuat medan dan memberi peringatan saat batas udara dilewati.',
        'Kapasitor tidak pernah terisi seketika. Melalui resistor R, arus pengisian I = (V₀ − V)/R mengecil ketika tegangan kapasitor V naik, sehingga V mendekati V₀ secara eksponensial: V(t) = V₀(1 − e^(−t/RC)). Hasil kali τ = RC disebut tetapan waktu: setelah satu τ kapasitor mencapai 63,2% dari V₀, setelah 3τ mencapai 95%, dan setelah 5τ sudah dalam 1% dari penuh. Pengosongan mengikuti V = V₀e^(−t/RC). Dengan R = 1 MΩ dan C = 88,5 pF, τ = 88,5 μs; dengan kapasitor 1000 μF dan 10 kΩ, τ = 10 s. Simulasi menyesuaikan jamnya sehingga satu τ selalu memakan waktu sekitar satu detik di layar, berapa pun nilai sebenarnya.',
      ],
    },
    figure: {
      caption: {
        en: 'Left: plates of area A and gap d with dielectric κ; the field E = V/d is uniform between them. Right: RC charging curve V(t) = V₀(1 − e^(−t/RC)) reaches 63% of V₀ at t = τ = RC.',
        id: 'Kiri: keping berluas A dan celah d dengan dielektrik κ; medan E = V/d seragam di antaranya. Kanan: kurva pengisian RC V(t) = V₀(1 − e^(−t/RC)) mencapai 63% dari V₀ pada t = τ = RC.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        // charging curve points
        const pts = [];
        for (let i = 0; i <= 40; i++) {
          const x = i / 40 * 5;                 // in units of tau, 0..5
          const y = 1 - Math.exp(-x);
          pts.push(`${(220 + x * 26).toFixed(1)},${(200 - y * 130).toFixed(1)}`);
        }
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Parallel-plate capacitor and RC charging curve', 'Kapasitor keping sejajar dan kurva pengisian RC')}">
  <style>text{font:12px system-ui,sans-serif;fill:currentColor}.ax{stroke:currentColor;stroke-width:1.2;fill:none;opacity:.6}.fl{stroke:#f59e0b;stroke-width:1.5}</style>
  <defs><marker id="ar" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="context-stroke"/></marker></defs>
  <rect x="30" y="60" width="150" height="10" fill="#ef4444"/>
  <rect x="30" y="150" width="150" height="10" fill="#3b82f6"/>
  <rect x="30" y="70" width="150" height="80" fill="#10b981" opacity=".18"/>
  <text x="36" y="56" style="fill:#ef4444">+Q</text>
  <text x="36" y="176" style="fill:#3b82f6">−Q</text>
  <line x1="55" y1="74" x2="55" y2="140" class="fl" marker-end="url(#ar)"/>
  <line x1="85" y1="74" x2="85" y2="140" class="fl" marker-end="url(#ar)"/>
  <line x1="115" y1="74" x2="115" y2="140" class="fl" marker-end="url(#ar)"/>
  <line x1="145" y1="74" x2="145" y2="140" class="fl" marker-end="url(#ar)"/>
  <text x="150" y="115" style="fill:#f59e0b">E</text>
  <text x="70" y="115">κ</text>
  <line x1="190" y1="70" x2="190" y2="150" class="ax"/>
  <line x1="186" y1="70" x2="194" y2="70" class="ax"/>
  <line x1="186" y1="150" x2="194" y2="150" class="ax"/>
  <text x="197" y="114">d</text>
  <line x1="30" y1="44" x2="180" y2="44" class="ax"/>
  <text x="98" y="38">A</text>
  <text x="20" y="200">C = κε₀A/d</text>
  <text x="20" y="218">Q = CV · E = V/d · U = ½CV²</text>
  <line x1="220" y1="200" x2="220" y2="60" class="ax"/>
  <line x1="220" y1="200" x2="350" y2="200" class="ax"/>
  <polyline points="${pts.join(' ')}" fill="none" stroke="#38bdf8" stroke-width="2"/>
  <line x1="220" y1="70" x2="350" y2="70" class="ax" stroke-dasharray="3 3"/>
  <line x1="246" y1="200" x2="246" y2="117.8" class="ax" stroke-dasharray="3 3"/>
  <line x1="220" y1="117.8" x2="246" y2="117.8" class="ax" stroke-dasharray="3 3"/>
  <text x="300" y="66">V₀</text>
  <text x="242" y="214">τ</text>
  <text x="252" y="122">0,63 V₀</text>
  <text x="330" y="214">t</text>
  <text x="226" y="56">${L('charging', 'pengisian')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'C = κε₀A/d: capacitance grows with plate area and dielectric constant, and shrinks as the gap widens; ε₀ = 8.85 × 10⁻¹² F/m.',
        'Q = CV: at a fixed battery voltage, a larger capacitance stores more charge.',
        'The field between the plates is E = V/d; with the battery connected it does not depend on κ or A.',
        'Stored energy U = ½CV² = ½QV = Q²/(2C); it lives in the electric field between the plates.',
        'Charging through a resistor: V(t) = V₀(1 − e^(−t/RC)), with τ = RC the time to reach 63% of V₀; 5τ is effectively full.',
        'Air breaks down at about 3 × 10⁶ V/m, which limits how thin an air gap can be for a given voltage.',
      ],
      id: [
        'C = κε₀A/d: kapasitansi bertambah dengan luas keping dan tetapan dielektrik, dan berkurang saat celah melebar; ε₀ = 8,85 × 10⁻¹² F/m.',
        'Q = CV: pada tegangan baterai tetap, kapasitansi yang lebih besar menyimpan lebih banyak muatan.',
        'Medan di antara keping adalah E = V/d; saat baterai terhubung medan ini tidak bergantung pada κ atau A.',
        'Energi tersimpan U = ½CV² = ½QV = Q²/(2C); energi ini berada dalam medan listrik di antara keping.',
        'Pengisian melalui resistor: V(t) = V₀(1 − e^(−t/RC)), dengan τ = RC waktu untuk mencapai 63% dari V₀; 5τ praktis penuh.',
        'Udara tembus pada sekitar 3 × 10⁶ V/m, yang membatasi setipis apa celah udara untuk tegangan tertentu.',
      ],
    },
    vocabulary: {
      en: [
        ['Capacitance (C)', 'Charge stored per volt, C = Q/V; unit farad (F). Practical values are pF to mF.'],
        ['Permittivity of free space (ε₀)', '8.85 × 10⁻¹² F/m, the constant that sets how much charge a vacuum gap can hold per volt.'],
        ['Dielectric constant (κ)', 'The factor by which an insulating material between the plates multiplies the capacitance; κ = 1 for vacuum.'],
        ['Electric field (E)', 'Force per unit charge between the plates, E = V/d, in V/m (equivalently N/C).'],
        ['Time constant (τ)', 'τ = RC, the time for a charging capacitor to reach 63.2% of the final voltage, or a discharging one to fall to 36.8%.'],
        ['Dielectric breakdown', 'The field strength at which an insulator starts to conduct and a spark forms; about 3 × 10⁶ V/m for air.'],
      ],
      id: [
        ['Kapasitansi (C)', 'Muatan tersimpan per volt, C = Q/V; satuan farad (F). Nilai praktis berkisar pF sampai mF.'],
        ['Permitivitas ruang hampa (ε₀)', '8,85 × 10⁻¹² F/m, konstanta yang menentukan berapa muatan yang dapat ditampung celah vakum per volt.'],
        ['Tetapan dielektrik (κ)', 'Faktor pengali kapasitansi oleh bahan isolator di antara keping; κ = 1 untuk vakum.'],
        ['Medan listrik (E)', 'Gaya per satuan muatan di antara keping, E = V/d, dalam V/m (setara N/C).'],
        ['Tetapan waktu (τ)', 'τ = RC, waktu bagi kapasitor yang diisi untuk mencapai 63,2% tegangan akhir, atau yang dikosongkan untuk turun ke 36,8%.'],
        ['Tembus dielektrik', 'Kuat medan ketika isolator mulai menghantar dan percikan terbentuk; sekitar 3 × 10⁶ V/m untuk udara.'],
      ],
    },
    misconceptions: {
      en: [
        ['A capacitor stores charge the way a tank stores water, so the total charge on it is Q.', 'The plates carry +Q and −Q; the net charge is zero. What is stored is separated charge and the energy of the field between the plates.'],
        ['Putting in a dielectric makes the field between the plates stronger.', 'With the battery connected, E = V/d is fixed by the voltage and gap. The dielectric lets the plates hold κ times more charge at the same field.'],
        ['After one time constant the capacitor is fully charged.', 'After τ it is at 63% of V₀. It needs about 5τ to be within 1% of full; strictly it never quite reaches V₀.'],
        ['Doubling the voltage doubles the stored energy.', 'U = ½CV² is quadratic in V: doubling V quadruples the energy.'],
      ],
      id: [
        ['Kapasitor menyimpan muatan seperti tangki menyimpan air, jadi muatan totalnya Q.', 'Keping membawa +Q dan −Q; muatan totalnya nol. Yang tersimpan adalah muatan yang dipisahkan dan energi medan di antara keping.'],
        ['Memasukkan dielektrik membuat medan di antara keping lebih kuat.', 'Saat baterai terhubung, E = V/d ditetapkan oleh tegangan dan celah. Dielektrik membuat keping mampu menampung κ kali lebih banyak muatan pada medan yang sama.'],
        ['Setelah satu tetapan waktu kapasitor sudah terisi penuh.', 'Setelah τ baru mencapai 63% dari V₀. Diperlukan sekitar 5τ untuk berada dalam 1% dari penuh; secara ketat tidak pernah tepat mencapai V₀.'],
        ['Menggandakan tegangan menggandakan energi tersimpan.', 'U = ½CV² kuadratik dalam V: menggandakan V melipatempatkan energinya.'],
      ],
    },
    realWorld: {
      en: [
        'A camera flash charges a few-hundred-microfarad capacitor to about 300 V, storing roughly 10 J, then dumps it through the xenon tube in a millisecond.',
        'Touchscreens sense the extra capacitance your finger adds (a few picofarads) to a grid of electrodes under the glass.',
        'Defibrillators store 200–400 J in a capacitor and deliver it through the chest in about 10 ms.',
        'RC time constants set the timing of windscreen-wiper intervals, camera self-timers and the debounce circuits that stop keyboards registering double presses.',
        'Supercapacitors use electrode areas of thousands of square metres per gram and gaps of a few nanometres to reach thousands of farads.',
      ],
      id: [
        'Lampu kilat kamera mengisi kapasitor beberapa ratus mikrofarad sampai sekitar 300 V, menyimpan kira-kira 10 J, lalu melepaskannya melalui tabung xenon dalam satu milidetik.',
        'Layar sentuh mendeteksi tambahan kapasitansi dari jarimu (beberapa pikofarad) pada kisi elektrode di bawah kaca.',
        'Defibrilator menyimpan 200–400 J dalam kapasitor dan melepaskannya melalui dada dalam sekitar 10 ms.',
        'Tetapan waktu RC mengatur jeda penyapu kaca mobil, pewaktu otomatis kamera, dan rangkaian debounce yang mencegah keyboard mencatat tekanan ganda.',
        'Superkapasitor memakai luas elektrode ribuan meter persegi per gram dan celah beberapa nanometer untuk mencapai ribuan farad.',
      ],
    },
    questions: {
      en: [
        { q: 'A capacitor has plates of 200 cm² separated by 0.5 mm of paper (κ = 3.7). What is its capacitance?', a: 'C = κε₀A/d = 3.7 × 8.85 × 10⁻¹² × 0.020 / 0.0005 = 1.31 × 10⁻⁹ F ≈ 1.3 nF.' },
        { q: 'That capacitor is connected to 12 V. Find Q, E and U.', a: 'Q = CV = 1.31 × 10⁻⁹ × 12 = 15.7 nC; E = V/d = 12 / 0.0005 = 2.4 × 10⁴ V/m; U = ½CV² = 0.5 × 1.31 × 10⁻⁹ × 144 = 9.4 × 10⁻⁸ J.' },
        { q: 'A 100 μF capacitor charges through 47 kΩ from a 9 V supply. What is τ, and what is the voltage after 4.7 s?', a: 'τ = RC = 47 000 × 100 × 10⁻⁶ = 4.7 s. After one τ, V = 9 × (1 − e⁻¹) = 9 × 0.632 = 5.7 V.' },
      ],
      id: [
        { q: 'Sebuah kapasitor memiliki keping 200 cm² yang dipisahkan 0,5 mm kertas (κ = 3,7). Berapa kapasitansinya?', a: 'C = κε₀A/d = 3,7 × 8,85 × 10⁻¹² × 0,020 / 0,0005 = 1,31 × 10⁻⁹ F ≈ 1,3 nF.' },
        { q: 'Kapasitor itu dihubungkan ke 12 V. Tentukan Q, E, dan U.', a: 'Q = CV = 1,31 × 10⁻⁹ × 12 = 15,7 nC; E = V/d = 12 / 0,0005 = 2,4 × 10⁴ V/m; U = ½CV² = 0,5 × 1,31 × 10⁻⁹ × 144 = 9,4 × 10⁻⁸ J.' },
        { q: 'Kapasitor 100 μF diisi melalui 47 kΩ dari sumber 9 V. Berapa τ, dan berapa tegangannya setelah 4,7 s?', a: 'τ = RC = 47 000 × 100 × 10⁻⁶ = 4,7 s. Setelah satu τ, V = 9 × (1 − e⁻¹) = 9 × 0,632 = 5,7 V.' },
      ],
    },
  },
};
