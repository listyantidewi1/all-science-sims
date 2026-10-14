// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Compute cutoff frequency f_c = 1 / (2πRC).',
      'Read gain in dB and phase shift from the Bode plot.',
      'See how higher frequencies are progressively attenuated.',
    ],
    id: [
      'Menghitung frekuensi cutoff f_c = 1 / (2πRC).',
      'Membaca penguatan dB dan pergeseran fasa dari plot Bode.',
      'Melihat frekuensi tinggi diredam secara progresif.',
    ],
  },  tryThis: {
    en: [
      'R = 1kΩ, C = 1μF → f_c ≈ 159 Hz.',
      'Drive at 10× cutoff — output shrinks by ~20 dB (×0.1) and lags 84°.',
      'Drive at f_c — output is at —3 dB, 45° behind.',
    ],
    id: [
      'R = 1kΩ, C = 1μF → f_c ≈ 159 Hz.',
      'Berikan input di 10× cutoff — output mengecil ~20 dB dan terlambat 84°.',
      'Berikan input di f_c — output di —3 dB, terlambat 45°.',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'An RC low-pass filter is a resistor R in series with a capacitor C, with the input voltage applied across the pair and the output taken across the capacitor. It works as a frequency-dependent voltage divider. A capacitor opposes alternating current with a reactance X_C = 1/(2πfC) that shrinks as frequency rises. At low frequency X_C is huge compared with R, so almost all of the input appears across C and the signal passes. At high frequency X_C is tiny, most of the voltage drops across R, and the output fades away.',
        'Treating the circuit with complex impedances gives the transfer function H = 1/(1 + j·2πfRC). Its magnitude is |H| = 1/√(1 + (f/f_c)²) and its phase is −arctan(f/f_c), where f_c = 1/(2πRC) is the cutoff frequency. At f = f_c the output amplitude is 1/√2 ≈ 0.707 of the input, which is −3.01 dB, and the output lags by 45°. Far above f_c the gain falls by 20 dB for every tenfold increase in frequency, the classic −20 dB/decade roll-off of a first-order filter.',
        'The simulation computes exactly these formulas. The R and C sliders set f_c, which is marked on the Bode plot; notice that doubling either one halves f_c, because only the product RC matters. The drive-frequency slider (or dragging across the plot) picks one test frequency, and the lower panel draws four periods of the input sine wave together with the output, scaled by |H| and shifted by the phase lag, so you can see the amplitude shrink and the lag grow as you push the frequency past f_c. Hovering over the plot reads gain and phase at any frequency.',
        'This is an idealised steady-state picture. The components are perfect: the source has zero output resistance, nothing loads the capacitor, and the capacitor has no leakage or series resistance. The sim also shows only the settled response to a single pure sine wave; it does not show the transient charging that happens when a signal is first switched on, which is governed by the time constant τ = RC (note that f_c = 1/(2πτ)). Real signals are mixtures of frequencies, and the filter treats each component separately according to this same curve.',
      ],
      id: [
        'Tapis lolos-rendah RC terdiri atas resistor R yang dirangkai seri dengan kapasitor C; tegangan masukan diberikan pada pasangan itu dan keluaran diambil dari kapasitor. Rangkaian ini bekerja sebagai pembagi tegangan yang bergantung frekuensi. Kapasitor menghambat arus bolak-balik dengan reaktansi X_C = 1/(2πfC) yang mengecil ketika frekuensi naik. Pada frekuensi rendah X_C jauh lebih besar daripada R, sehingga hampir seluruh tegangan masukan muncul pada C dan sinyal diloloskan. Pada frekuensi tinggi X_C sangat kecil, sebagian besar tegangan jatuh pada R, dan keluaran meredup.',
        'Analisis dengan impedansi kompleks menghasilkan fungsi alih H = 1/(1 + j·2πfRC). Besarnya |H| = 1/√(1 + (f/f_c)²) dan fasanya −arctan(f/f_c), dengan f_c = 1/(2πRC) sebagai frekuensi cutoff. Pada f = f_c amplitudo keluaran adalah 1/√2 ≈ 0,707 kali masukan, yaitu −3,01 dB, dan keluaran terlambat 45°. Jauh di atas f_c, penguatan turun 20 dB setiap frekuensi dikalikan sepuluh, yaitu roll-off −20 dB/dekade yang khas untuk tapis orde satu.',
        'Simulasi ini menghitung rumus-rumus itu secara persis. Slider R dan C menentukan f_c, yang ditandai pada plot Bode; perhatikan bahwa menggandakan salah satunya membagi dua f_c, karena yang berpengaruh hanya hasil kali RC. Slider frekuensi penggerak (atau menyeret kursor di atas plot) memilih satu frekuensi uji, dan panel bawah menggambar empat periode gelombang sinus masukan bersama keluarannya, yang diskalakan dengan |H| dan digeser sebesar keterlambatan fasa, sehingga kamu bisa melihat amplitudo menyusut dan keterlambatan bertambah saat frekuensi melewati f_c. Mengarahkan kursor ke plot menampilkan penguatan dan fasa pada frekuensi mana pun.',
        'Ini gambaran ideal dalam keadaan tunak. Komponennya sempurna: sumber tidak punya hambatan keluaran, tidak ada beban pada kapasitor, dan kapasitor tidak bocor atau punya hambatan seri. Simulasi juga hanya menampilkan tanggapan yang sudah mapan terhadap satu gelombang sinus murni; ia tidak menampilkan proses pengisian transien saat sinyal baru dinyalakan, yang diatur oleh konstanta waktu τ = RC (perhatikan f_c = 1/(2πτ)). Sinyal nyata adalah campuran banyak frekuensi, dan tapis memperlakukan tiap komponen secara terpisah mengikuti kurva yang sama ini.',
      ],
    },
    figure: {
      caption: {
        en: 'Left: the output is taken across the capacitor, whose reactance falls with frequency. Right: the gain curve is flat below f_c, passes −3 dB (0.707×) at f_c, then falls 20 dB per decade.',
        id: 'Kiri: keluaran diambil dari kapasitor, yang reaktansinya turun seiring frekuensi. Kanan: kurva penguatan datar di bawah f_c, melewati −3 dB (0,707×) pada f_c, lalu turun 20 dB per dekade.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('RC low-pass circuit and its frequency response', 'Rangkaian RC lolos-rendah dan tanggapan frekuensinya')}">
  <style>text{font:12px system-ui,sans-serif;fill:currentColor}.w{fill:none;stroke:currentColor;stroke-width:1.6}.m{fill:none;stroke:currentColor;stroke-width:1.2;opacity:.45}.s{font-size:10px}</style>
  <circle cx="30" cy="110" r="14" class="w"/>
  <text x="30" y="115" text-anchor="middle">~</text>
  <path d="M30 96 L30 70 L60 70" class="w"/>
  <path d="M60 70 L65 62 L75 78 L85 62 L95 78 L105 62 L115 78 L120 70 L150 70" class="w" stroke="#3b82f6"/>
  <text x="90" y="54" text-anchor="middle" fill="#3b82f6" font-weight="bold">R</text>
  <path d="M150 70 L150 102 M138 102 L162 102 M138 112 L162 112 M150 112 L150 150" class="w" stroke="#10b981"/>
  <text x="128" y="112" text-anchor="end" fill="#10b981" font-weight="bold">C</text>
  <path d="M150 150 L30 150 L30 124" class="w"/>
  <circle cx="150" cy="70" r="2.5" fill="currentColor"/>
  <circle cx="150" cy="150" r="2.5" fill="currentColor"/>
  <path d="M150 70 L176 70 M150 150 L176 150" class="w"/>
  <circle cx="178" cy="70" r="2.5" class="w"/>
  <circle cx="178" cy="150" r="2.5" class="w"/>
  <text x="178" y="115" text-anchor="middle" class="s">V_out</text>
  <text x="4" y="70" class="s">V_in</text>
  <text x="14" y="176" class="s">${L('X_C = 1/(2πfC) falls as f rises', 'X_C = 1/(2πfC) turun saat f naik')}</text>
  <line x1="195" y1="50" x2="195" y2="190" class="w"/>
  <line x1="195" y1="190" x2="348" y2="190" class="w"/>
  <line x1="195" y1="60" x2="345" y2="60" class="m" stroke-dasharray="3 3"/>
  <line x1="195" y1="120" x2="345" y2="120" class="m" stroke-dasharray="3 3"/>
  <line x1="195" y1="180" x2="345" y2="180" class="m" stroke-dasharray="3 3"/>
  <text x="192" y="64" text-anchor="end" class="s">0 dB</text>
  <text x="192" y="124" text-anchor="end" class="s">−20</text>
  <text x="192" y="184" text-anchor="end" class="s">−40</text>
  <path d="M200 60 L235 60 L252 61 L260 63 L270 69 L280 81 L287 90 L294 102 L305 120 L322 148 L340 180" fill="none" stroke="#10b981" stroke-width="2.5"/>
  <line x1="270" y1="60" x2="270" y2="190" stroke="#f59e0b" stroke-width="1.2" stroke-dasharray="4 3"/>
  <circle cx="270" cy="69" r="4" fill="#ef4444"/>
  <text x="276" y="74" fill="#ef4444" class="s">−3 dB, −45°</text>
  <text x="235" y="204" text-anchor="middle" class="s">${L('0.1 f_c', '0,1 f_c')}</text>
  <text x="270" y="204" text-anchor="middle" class="s" fill="#f59e0b" font-weight="bold">f_c</text>
  <text x="305" y="204" text-anchor="middle" class="s">10 f_c</text>
  <text x="330" y="138" text-anchor="end" fill="#10b981" class="s">−20 dB/${L('decade', 'dekade')}</text>
  <text x="272" y="222" text-anchor="middle" class="s">${L('frequency (log scale)', 'frekuensi (skala log)')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'The filter is a voltage divider whose capacitor reactance X_C = 1/(2πfC) shrinks as frequency rises, so high frequencies are attenuated.',
        'The cutoff frequency f_c = 1/(2πRC) depends only on the product RC; doubling R or C halves f_c.',
        'At f_c the output is 0.707 of the input (−3 dB, half the power) and lags by 45°.',
        'Above f_c the gain falls 20 dB per decade, and the phase lag approaches 90°.',
        'Attenuation is gradual, not a sharp wall: a first-order filter never fully blocks a frequency.',
      ],
      id: [
        'Tapis ini adalah pembagi tegangan yang reaktansi kapasitornya X_C = 1/(2πfC) mengecil saat frekuensi naik, sehingga frekuensi tinggi diredam.',
        'Frekuensi cutoff f_c = 1/(2πRC) hanya bergantung pada hasil kali RC; menggandakan R atau C membagi dua f_c.',
        'Pada f_c keluaran 0,707 kali masukan (−3 dB, setengah daya) dan terlambat 45°.',
        'Di atas f_c penguatan turun 20 dB per dekade, dan keterlambatan fasa mendekati 90°.',
        'Peredaman terjadi bertahap, bukan seperti tembok: tapis orde satu tidak pernah memblokir satu frekuensi sepenuhnya.',
      ],
    },
    vocabulary: {
      en: [
        ['Cutoff frequency (f_c)', 'The frequency at which the output has dropped to 1/√2 of the input, −3 dB; equal to 1/(2πRC) for an RC filter.'],
        ['Decibel (dB)', 'A logarithmic measure of gain: 20·log10 of the amplitude ratio. −20 dB means 0.1×, −40 dB means 0.01×.'],
        ['Bode plot', 'A graph of gain in dB and phase in degrees against frequency on a logarithmic axis.'],
        ['Reactance (X_C)', 'The opposition a capacitor presents to alternating current, 1/(2πfC), in ohms; it falls as frequency rises.'],
        ['Phase shift', 'How far the output sine wave is displaced in time relative to the input, in degrees of one cycle; negative means lagging.'],
        ['Time constant (τ = RC)', 'How long the capacitor takes to charge to 63% of a step input; related to cutoff by f_c = 1/(2πτ).'],
        ['Roll-off', 'The steady slope of the gain curve above cutoff, −20 dB per decade for a first-order filter.'],
        ['Transfer function', 'The ratio of output to input as a function of frequency, H(f) = 1/(1 + j·2πfRC) here.'],
      ],
      id: [
        ['Frekuensi cutoff (f_c)', 'Frekuensi ketika keluaran turun menjadi 1/√2 kali masukan, yaitu −3 dB; untuk tapis RC sama dengan 1/(2πRC).'],
        ['Desibel (dB)', 'Ukuran logaritmik penguatan: 20·log10 dari rasio amplitudo. −20 dB berarti 0,1 kali, −40 dB berarti 0,01 kali.'],
        ['Plot Bode', 'Grafik penguatan dalam dB dan fasa dalam derajat terhadap frekuensi pada sumbu logaritmik.'],
        ['Reaktansi (X_C)', 'Hambatan kapasitor terhadap arus bolak-balik, 1/(2πfC), dalam ohm; nilainya turun saat frekuensi naik.'],
        ['Pergeseran fasa', 'Seberapa jauh gelombang sinus keluaran bergeser waktu relatif terhadap masukan, dalam derajat dari satu siklus; negatif berarti terlambat.'],
        ['Konstanta waktu (τ = RC)', 'Waktu yang dibutuhkan kapasitor untuk terisi sampai 63% dari masukan tangga; berkaitan dengan cutoff lewat f_c = 1/(2πτ).'],
        ['Roll-off', 'Kemiringan tetap kurva penguatan di atas cutoff, −20 dB per dekade untuk tapis orde satu.'],
        ['Fungsi alih', 'Rasio keluaran terhadap masukan sebagai fungsi frekuensi, di sini H(f) = 1/(1 + j·2πfRC).'],
      ],
    },
    misconceptions: {
      en: [
        ['Everything above f_c is blocked and everything below passes untouched.', 'The transition is gradual. At f_c the output is still 70.7% of the input, at 2f_c it is 45%, and even at 0.5f_c it is already down to 89%. A sharp cutoff needs a higher-order filter.'],
        ['−3 dB means the signal is 3% weaker.', 'Decibels are logarithmic. −3 dB is an amplitude ratio of 0.707, which is half the power; −20 dB is one tenth of the amplitude.'],
        ['The phase shift is a fixed time delay.', 'The lag is a fraction of a cycle that depends on frequency: 45° at f_c, approaching 90° far above it. The time delay it represents is phase/(360°·f), so it also changes with frequency.'],
        ['A bigger capacitor lets more signal through.', 'A larger C lowers the reactance and lowers f_c, so more of the signal is attenuated. Bigger C means a stronger low-pass effect, not a weaker one.'],
      ],
      id: [
        ['Semua frekuensi di atas f_c diblokir dan semua di bawahnya lolos utuh.', 'Peralihannya bertahap. Pada f_c keluaran masih 70,7% dari masukan, pada 2f_c tinggal 45%, dan pada 0,5f_c pun sudah turun ke 89%. Cutoff yang tajam memerlukan tapis orde lebih tinggi.'],
        ['−3 dB berarti sinyal melemah 3%.', 'Desibel bersifat logaritmik. −3 dB adalah rasio amplitudo 0,707, yaitu setengah daya; −20 dB berarti sepersepuluh amplitudo.'],
        ['Pergeseran fasa adalah tunda waktu yang tetap.', 'Keterlambatannya adalah pecahan dari satu siklus yang bergantung pada frekuensi: 45° pada f_c, mendekati 90° jauh di atasnya. Tunda waktu yang setara adalah fasa/(360°·f), sehingga ikut berubah dengan frekuensi.'],
        ['Kapasitor yang lebih besar meloloskan lebih banyak sinyal.', 'C yang lebih besar menurunkan reaktansi dan menurunkan f_c, sehingga lebih banyak sinyal diredam. C besar berarti efek lolos-rendah lebih kuat, bukan lebih lemah.'],
      ],
    },
    realWorld: {
      en: [
        'The bass and treble controls on an amplifier, and the crossover inside a loudspeaker, are RC-type filters that steer low frequencies to the woofer and high ones to the tweeter.',
        'Before a microcontroller samples a sensor, an RC anti-aliasing filter removes frequencies above half the sampling rate so they cannot masquerade as lower ones.',
        'A microcontroller can fake an analog voltage by switching a pin on and off rapidly (PWM); an RC low-pass smooths the pulses into a steady average level.',
        'Power supplies use RC and LC filters to smooth the ripple left over after rectifying AC into DC.',
      ],
      id: [
        'Kontrol bass dan treble pada amplifier, serta crossover di dalam pengeras suara, adalah tapis jenis RC yang mengarahkan frekuensi rendah ke woofer dan frekuensi tinggi ke tweeter.',
        'Sebelum mikrokontroler mencuplik sensor, tapis anti-aliasing RC membuang frekuensi di atas setengah laju cuplik agar tidak menyamar sebagai frekuensi yang lebih rendah.',
        'Mikrokontroler bisa meniru tegangan analog dengan menyalakan dan mematikan pin dengan cepat (PWM); tapis lolos-rendah RC menghaluskan pulsa itu menjadi tegangan rata-rata yang stabil.',
        'Catu daya memakai tapis RC dan LC untuk menghaluskan riak yang tersisa setelah arus AC disearahkan menjadi DC.',
      ],
    },
    questions: {
      en: [
        { q: 'R = 10 kΩ and C = 100 nF. What is the cutoff frequency?', a: 'f_c = 1/(2πRC) = 1/(2π × 10⁴ × 10⁻⁷) = 1/(2π × 10⁻³) ≈ 159 Hz. It is the same as for 1 kΩ and 1 µF, because the product RC is the same (1 ms).' },
        { q: 'The drive frequency is set to 3 f_c. Predict the gain in dB and the phase shift before checking the readout.', a: '|H| = 1/√(1 + 3²) = 1/√10 ≈ 0.316, which is 20·log10(0.316) ≈ −10 dB. The phase is −arctan(3) ≈ −71.6°, so the output lags by about a fifth of a cycle.' },
        { q: 'Why does the output sine wave lag behind the input rather than lead it?', a: 'The output is the capacitor voltage, and a capacitor\'s voltage can only change by charging through R. The current must flow first and the voltage builds up afterwards, so the capacitor voltage peaks after the input peaks. The faster the input changes, the less the capacitor can keep up, so the lag grows toward 90° at high frequency.' },
      ],
      id: [
        { q: 'R = 10 kΩ dan C = 100 nF. Berapa frekuensi cutoff-nya?', a: 'f_c = 1/(2πRC) = 1/(2π × 10⁴ × 10⁻⁷) = 1/(2π × 10⁻³) ≈ 159 Hz. Sama dengan untuk 1 kΩ dan 1 µF, karena hasil kali RC-nya sama (1 ms).' },
        { q: 'Frekuensi penggerak diatur ke 3 f_c. Perkirakan penguatan dalam dB dan pergeseran fasanya sebelum melihat pembacaan.', a: '|H| = 1/√(1 + 3²) = 1/√10 ≈ 0,316, yaitu 20·log10(0,316) ≈ −10 dB. Fasanya −arctan(3) ≈ −71,6°, sehingga keluaran terlambat sekitar seperlima siklus.' },
        { q: 'Mengapa gelombang keluaran terlambat terhadap masukan, bukan mendahuluinya?', a: 'Keluarannya adalah tegangan kapasitor, dan tegangan kapasitor hanya bisa berubah dengan mengisi muatan melalui R. Arus harus mengalir dulu dan tegangan baru menyusul, sehingga puncak tegangan kapasitor terjadi setelah puncak masukan. Semakin cepat masukan berubah, semakin kapasitor tertinggal, sehingga keterlambatan mendekati 90° pada frekuensi tinggi.' },
      ],
    },
  },
};
