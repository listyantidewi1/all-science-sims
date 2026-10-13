// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Apply f₀ = 1/(2π√(LC)).',
      'Compare reactances X_L = 2πfL and X_C = 1/(2πfC).',
      'See how the Q factor sharpens the resonant peak.',
    ],
    id: [
      'Menerapkan f₀ = 1/(2π√(LC)).',
      'Membandingkan reaktansi X_L = 2πfL dan X_C = 1/(2πfC).',
      'Melihat faktor Q menajamkan puncak resonansi.',
    ],
  },
  tryThis: {
    en: [
      'Find resonance — does current peak when X_L = X_C?',
      'Lower R — does the peak get sharper or wider?',
      'Double L — what happens to f₀?',
    ],
    id: [
      'Cari resonansi — apakah arus memuncak saat X_L = X_C?',
      'Turunkan R — apakah puncak menjadi lebih tajam atau lebih lebar?',
      'Gandakan L — apa yang terjadi pada f₀?',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'Connect a resistor, an inductor and a capacitor in series to an AC source and each part fights the current in its own way. The resistor opposes current at every frequency and turns electrical energy into heat. The inductor opposes changes in current, so its reactance X_L = 2πfL grows with frequency. The capacitor opposes changes in voltage, so its reactance X_C = 1/(2πfC) shrinks with frequency. Crucially, the voltages across L and C are half a cycle out of step with each other, so they partly cancel: the circuit only feels the difference X_L − X_C.',
        'The total opposition is the impedance Z = √(R² + (X_L − X_C)²), and the current amplitude is I = V/Z. At one special frequency the two reactances are equal and cancel completely, leaving Z = R, the smallest it can be, so the current is largest: I = V/R. Setting 2πfL = 1/(2πfC) gives the resonant frequency f₀ = 1/(2π√(LC)). The simulation plots I against frequency on a logarithmic axis, marks f₀ with a dashed line, and shows the current at the drive frequency you choose with a red dot; the animated dots in the circuit speed up as the current grows.',
        'The sliders show which quantities matter for what. L and C move the peak: quartering C doubles f₀, and so does quartering L, because of the square root. R does not move the peak at all; it only changes its height and width. The bandwidth, the frequency range over which the current stays above 1/√2 of its peak, is Δf = R/(2πL), and the quality factor Q = f₀/Δf = √(L/C)/R says how sharp the peak is. With the default values (R = 50 Ω, L = 50 mH, C = 10 µF) you get f₀ ≈ 225 Hz, Δf ≈ 159 Hz and Q ≈ 1.4; drop R to 5 Ω and Q climbs to about 14.',
        'The model is idealised. The inductor has no resistance of its own, the capacitor does not leak, and the source has no internal resistance, so a real circuit always has a lower Q than the formula predicts. The sim shows only the steady-state current amplitude: in a real circuit the oscillation takes a few cycles to build up after switching on, and the current also lags or leads the voltage by a phase angle that the sim does not display. Energy sloshes back and forth between the capacitor\'s electric field and the inductor\'s magnetic field; only the resistor removes it.',
      ],
      id: [
        'Hubungkan resistor, induktor, dan kapasitor secara seri ke sumber AC, maka tiap komponen melawan arus dengan caranya sendiri. Resistor menghambat arus pada setiap frekuensi dan mengubah energi listrik menjadi kalor. Induktor melawan perubahan arus, sehingga reaktansinya X_L = 2πfL membesar seiring frekuensi. Kapasitor melawan perubahan tegangan, sehingga reaktansinya X_C = 1/(2πfC) mengecil seiring frekuensi. Yang penting, tegangan pada L dan C berselisih setengah siklus satu sama lain, sehingga keduanya saling meniadakan sebagian: rangkaian hanya merasakan selisihnya, X_L − X_C.',
        'Hambatan totalnya adalah impedansi Z = √(R² + (X_L − X_C)²), dan amplitudo arusnya I = V/Z. Pada satu frekuensi istimewa kedua reaktansi sama besar dan saling meniadakan sepenuhnya, menyisakan Z = R, nilai terkecil yang mungkin, sehingga arus menjadi terbesar: I = V/R. Dari 2πfL = 1/(2πfC) diperoleh frekuensi resonansi f₀ = 1/(2π√(LC)). Simulasi menggambar I terhadap frekuensi pada sumbu logaritmik, menandai f₀ dengan garis putus-putus, dan menunjukkan arus pada frekuensi penggerak yang kamu pilih dengan titik merah; titik-titik yang bergerak di rangkaian makin cepat saat arus membesar.',
        'Slider-slider memperlihatkan besaran mana yang memengaruhi apa. L dan C menggeser puncak: memperempat C menggandakan f₀, begitu pula memperempat L, karena ada akar kuadrat. R sama sekali tidak menggeser puncak; R hanya mengubah tinggi dan lebarnya. Lebar pita, yaitu rentang frekuensi ketika arus tetap di atas 1/√2 dari puncaknya, adalah Δf = R/(2πL), dan faktor kualitas Q = f₀/Δf = √(L/C)/R menyatakan seberapa tajam puncaknya. Dengan nilai bawaan (R = 50 Ω, L = 50 mH, C = 10 µF) diperoleh f₀ ≈ 225 Hz, Δf ≈ 159 Hz, dan Q ≈ 1,4; turunkan R ke 5 Ω dan Q naik menjadi sekitar 14.',
        'Modelnya ideal. Induktor dianggap tanpa hambatan, kapasitor tidak bocor, dan sumber tidak punya hambatan dalam, sehingga rangkaian sungguhan selalu memiliki Q lebih rendah dari prediksi rumus. Simulasi hanya menampilkan amplitudo arus keadaan tunak: pada rangkaian nyata, osilasi butuh beberapa siklus untuk terbangun setelah dinyalakan, dan arus juga tertinggal atau mendahului tegangan dengan sudut fase yang tidak ditampilkan simulasi. Energi berpindah bolak-balik antara medan listrik kapasitor dan medan magnet induktor; hanya resistor yang membuangnya.',
      ],
    },
    figure: {
      caption: {
        en: 'Top: X_L rises with frequency while X_C falls; they are equal at f₀. Bottom: the current peaks at f₀, where Z = R. A smaller R gives a taller, narrower peak (higher Q).',
        id: 'Atas: X_L naik seiring frekuensi sedangkan X_C turun; keduanya sama di f₀. Bawah: arus memuncak di f₀, saat Z = R. R yang lebih kecil menghasilkan puncak yang lebih tinggi dan sempit (Q lebih besar).',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Reactances and current versus frequency', 'Reaktansi dan arus terhadap frekuensi')}">
  <style>text{font:12px system-ui,sans-serif;fill:currentColor}.m{fill:none;stroke:currentColor;stroke-width:1.2;opacity:.45}.c{stroke-width:2.2;fill:none}.s{font-size:10px;opacity:.8}</style>
  <line x1="40" y1="20" x2="40" y2="110" class="m"/>
  <line x1="40" y1="110" x2="340" y2="110" class="m" marker-end="url(#r)"/>
  <text x="18" y="30" class="s">X</text>
  <path d="M40 105 L300 30" class="c" stroke="#3b82f6"/>
  <text x="304" y="34" fill="#3b82f6" class="s">X_L = 2πfL</text>
  <path d="M50 22 Q110 66 340 100" class="c" stroke="#10b981"/>
  <text x="258" y="90" fill="#10b981" class="s">X_C = 1/(2πfC)</text>
  <circle cx="170" cy="67.5" r="4" fill="currentColor"/>
  <text x="178" y="64" class="s">X_L = X_C</text>
  <line x1="170" y1="20" x2="170" y2="222" class="m" stroke-dasharray="4 4"/>
  <line x1="40" y1="135" x2="40" y2="222" class="m"/>
  <line x1="40" y1="222" x2="340" y2="222" class="m" marker-end="url(#r)"/>
  <text x="18" y="145" class="s">I</text>
  <path d="M40 215 C150 212 160 140 170 140 C180 140 190 212 340 215" class="c" stroke="#ef4444"/>
  <path d="M40 212 C120 205 150 175 170 175 C190 175 220 205 340 212" class="c" stroke="#f59e0b"/>
  <text x="178" y="150" fill="#ef4444" class="s">${L('small R: I = V/R, high Q', 'R kecil: I = V/R, Q tinggi')}</text>
  <text x="196" y="186" fill="#f59e0b" class="s">${L('large R: low Q', 'R besar: Q rendah')}</text>
  <text x="160" y="236">f₀</text>
  <text x="300" y="236" class="s">${L('frequency f', 'frekuensi f')}</text>
  <defs><marker id="r" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="context-stroke"/></marker></defs>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Inductive reactance grows with frequency and capacitive reactance shrinks, and the two act in opposite directions, so they cancel at f₀ = 1/(2π√(LC)).',
        'At resonance the impedance drops to its minimum, Z = R, and the current reaches its maximum, I = V/R.',
        'Only L and C set the resonant frequency; R sets how tall and how sharp the peak is.',
        'The quality factor Q = √(L/C)/R = f₀/Δf measures sharpness: a high-Q circuit responds strongly to one frequency and ignores its neighbours.',
        'Below f₀ the circuit behaves mostly like a capacitor, above f₀ mostly like an inductor.',
      ],
      id: [
        'Reaktansi induktif membesar seiring frekuensi dan reaktansi kapasitif mengecil, dan keduanya bekerja berlawanan arah, sehingga saling meniadakan di f₀ = 1/(2π√(LC)).',
        'Pada resonansi impedansi turun ke nilai minimum, Z = R, dan arus mencapai nilai maksimum, I = V/R.',
        'Hanya L dan C yang menentukan frekuensi resonansi; R menentukan seberapa tinggi dan tajam puncaknya.',
        'Faktor kualitas Q = √(L/C)/R = f₀/Δf mengukur ketajaman: rangkaian ber-Q tinggi merespons kuat satu frekuensi dan mengabaikan frekuensi tetangganya.',
        'Di bawah f₀ rangkaian berperilaku lebih seperti kapasitor, di atas f₀ lebih seperti induktor.',
      ],
    },
    vocabulary: {
      en: [
        ['Reactance (X)', 'The opposition of an inductor or capacitor to AC, measured in ohms; unlike resistance it stores energy instead of dissipating it.'],
        ['Impedance (Z)', 'The total opposition of the circuit to AC, Z = √(R² + (X_L − X_C)²).'],
        ['Resonant frequency (f₀)', 'The frequency at which X_L = X_C, so the current is largest: f₀ = 1/(2π√(LC)).'],
        ['Bandwidth (Δf)', 'The width of the peak between the two frequencies where the current falls to 1/√2 of its maximum; Δf = R/(2πL).'],
        ['Quality factor (Q)', 'f₀ divided by the bandwidth; a dimensionless measure of how selective the circuit is.'],
        ['Phase', 'The timing offset between current and voltage; at resonance they are exactly in step.'],
      ],
      id: [
        ['Reaktansi (X)', 'Hambatan induktor atau kapasitor terhadap AC, dalam ohm; berbeda dengan resistansi, reaktansi menyimpan energi, bukan membuangnya.'],
        ['Impedansi (Z)', 'Hambatan total rangkaian terhadap AC, Z = √(R² + (X_L − X_C)²).'],
        ['Frekuensi resonansi (f₀)', 'Frekuensi ketika X_L = X_C, sehingga arus terbesar: f₀ = 1/(2π√(LC)).'],
        ['Lebar pita (Δf)', 'Lebar puncak di antara dua frekuensi ketika arus turun menjadi 1/√2 dari maksimumnya; Δf = R/(2πL).'],
        ['Faktor kualitas (Q)', 'f₀ dibagi lebar pita; ukuran tanpa satuan untuk seberapa selektif rangkaian.'],
        ['Fase', 'Selisih waktu antara arus dan tegangan; pada resonansi keduanya tepat seirama.'],
      ],
    },
    misconceptions: {
      en: [
        ['Increasing R shifts the resonant frequency.', 'It does not. f₀ depends only on L and C. R lowers the peak and widens it, but the peak stays at the same frequency.'],
        ['At resonance the inductor and capacitor carry no voltage.', 'Each carries a large voltage, Q times the source voltage, but the two are equal and opposite at every instant, so they cancel in the sum. The voltage across R alone equals the source voltage.'],
        ['Doubling L doubles the resonant frequency.', 'Doubling L lowers f₀ by a factor of √2, to about 0.71 of its value, because f₀ depends on 1/√(LC).'],
        ['A higher Q means more current at every frequency.', 'Only near f₀. Away from resonance a high-Q circuit actually passes less current, which is exactly what makes it selective.'],
      ],
      id: [
        ['Memperbesar R menggeser frekuensi resonansi.', 'Tidak. f₀ hanya bergantung pada L dan C. R menurunkan dan melebarkan puncak, tetapi puncaknya tetap pada frekuensi yang sama.'],
        ['Pada resonansi induktor dan kapasitor tidak bertegangan.', 'Masing-masing justru bertegangan besar, Q kali tegangan sumber, tetapi keduanya sama besar dan berlawanan setiap saat, sehingga saling meniadakan dalam jumlah. Tegangan pada R saja sama dengan tegangan sumber.'],
        ['Menggandakan L menggandakan frekuensi resonansi.', 'Menggandakan L menurunkan f₀ sebesar faktor √2, menjadi sekitar 0,71 kali nilainya, karena f₀ bergantung pada 1/√(LC).'],
        ['Q lebih tinggi berarti arus lebih besar pada setiap frekuensi.', 'Hanya di dekat f₀. Jauh dari resonansi, rangkaian ber-Q tinggi justru melewatkan arus lebih kecil, dan itulah yang membuatnya selektif.'],
      ],
    },
    realWorld: {
      en: [
        'A radio tuner is an LC circuit: turning the dial changes C (or L) so that f₀ matches one station\'s frequency, and all other stations are rejected.',
        'The coil and capacitor in a contactless payment card or metro ticket resonate at 13.56 MHz, so a reader can power and talk to the card without any battery.',
        'Induction cooktops drive a coil near its resonant frequency, typically 20 to 100 kHz, to push large currents through the coil efficiently.',
        'Engineers also fight resonance: a filter in a power supply is designed so that no unwanted frequency can build up a large current.',
      ],
      id: [
        'Tuner radio adalah rangkaian LC: memutar tombol mengubah C (atau L) sehingga f₀ cocok dengan frekuensi satu stasiun, dan semua stasiun lain ditolak.',
        'Kumparan dan kapasitor di kartu pembayaran nirkontak atau tiket kereta beresonansi pada 13,56 MHz, sehingga pembaca dapat memberi daya dan berkomunikasi dengan kartu tanpa baterai.',
        'Kompor induksi menggerakkan kumparan di dekat frekuensi resonansinya, biasanya 20 sampai 100 kHz, agar arus besar mengalir di kumparan secara efisien.',
        'Insinyur juga melawan resonansi: filter pada catu daya dirancang agar tidak ada frekuensi yang tak diinginkan dapat membangun arus besar.',
      ],
    },
    questions: {
      en: [
        { q: 'A circuit has L = 50 mH and C = 10 µF. What is its resonant frequency? What happens to f₀ if C is changed to 2.5 µF?', a: 'f₀ = 1/(2π√(0.05 × 1 × 10⁻⁵)) = 1/(2π × 7.07 × 10⁻⁴) ≈ 225 Hz. Quartering C multiplies f₀ by √4 = 2, so the new f₀ is about 450 Hz.' },
        { q: 'With R = 50 Ω, L = 50 mH and V = 5 V, what is the peak current, and what is the bandwidth?', a: 'At resonance Z = R, so I = 5/50 = 0.10 A = 100 mA. Bandwidth Δf = R/(2πL) = 50/(2π × 0.05) ≈ 159 Hz, giving Q = 225/159 ≈ 1.4.' },
        { q: 'You drive the circuit well above f₀ and the current is small. Which component is mainly responsible, and why?', a: 'The inductor. Above f₀, X_L = 2πfL is large while X_C = 1/(2πfC) is small, so X_L − X_C is large and positive and Z is dominated by the inductor. The circuit behaves like an inductor that chokes off high frequencies.' },
      ],
      id: [
        { q: 'Sebuah rangkaian memiliki L = 50 mH dan C = 10 µF. Berapa frekuensi resonansinya? Apa yang terjadi pada f₀ jika C diubah menjadi 2,5 µF?', a: 'f₀ = 1/(2π√(0,05 × 1 × 10⁻⁵)) = 1/(2π × 7,07 × 10⁻⁴) ≈ 225 Hz. Memperempat C mengalikan f₀ dengan √4 = 2, sehingga f₀ baru sekitar 450 Hz.' },
        { q: 'Dengan R = 50 Ω, L = 50 mH, dan V = 5 V, berapa arus puncak dan berapa lebar pitanya?', a: 'Pada resonansi Z = R, sehingga I = 5/50 = 0,10 A = 100 mA. Lebar pita Δf = R/(2πL) = 50/(2π × 0,05) ≈ 159 Hz, sehingga Q = 225/159 ≈ 1,4.' },
        { q: 'Kamu menggerakkan rangkaian jauh di atas f₀ dan arusnya kecil. Komponen mana yang paling bertanggung jawab, dan mengapa?', a: 'Induktor. Di atas f₀, X_L = 2πfL besar sedangkan X_C = 1/(2πfC) kecil, sehingga X_L − X_C besar dan positif dan Z didominasi induktor. Rangkaian berperilaku seperti induktor yang mencekik frekuensi tinggi.' },
      ],
    },
  },
};
