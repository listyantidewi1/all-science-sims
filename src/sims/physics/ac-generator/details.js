// Long-form text for the AC Generator sim (Fase F, grade 12).
export default {
  objectives: {
    en: [
      'Write the flux through a rotating coil as Φ = NBA cos ωt and use Faraday\'s law ε = −dΦ/dt to obtain ε = NBAω sin ωt.',
      'Predict how the peak EMF ε₀ = NBAω changes with the number of turns, field strength, coil area and rotation frequency, and relate ε_rms = ε₀/√2 to it.',
      'Explain why the EMF is largest when the flux is zero, and how a commutator converts the alternating output into pulsing direct current.',
    ],
    id: [
      'Menuliskan fluks melalui kumparan berputar sebagai Φ = NBA cos ωt dan menggunakan hukum Faraday ε = −dΦ/dt untuk memperoleh ε = NBAω sin ωt.',
      'Memprediksi perubahan GGL puncak ε₀ = NBAω terhadap jumlah lilitan, kuat medan, luas kumparan, dan frekuensi putaran, serta mengaitkan ε_rms = ε₀/√2 dengannya.',
      'Menjelaskan mengapa GGL terbesar terjadi saat fluks nol, dan bagaimana komutator mengubah keluaran bolak-balik menjadi arus searah berdenyut.',
    ],
  },
  tryThis: {
    en: [
      'Set N = 100, B = 0.10 T, A = 100 cm², f = 50 Hz. Check that the peak EMF is 31.4 V. Double N: the peak doubles. Double f: the peak doubles AND the wave is squeezed.',
      'Watch the two graphs together: whenever Φ passes through zero (coil edge-on to the field) the EMF is at its peak, and when Φ is maximum the EMF is zero.',
      'Lower f to 1 Hz and watch the bulb: it flashes twice per rotation, because brightness depends on |ε|, not on its sign.',
      'Switch on the commutator. The negative halves of the EMF flip upward: pulsing DC, as in a DC dynamo or a bicycle lamp generator.',
    ],
    id: [
      'Atur N = 100, B = 0,10 T, A = 100 cm², f = 50 Hz. Periksa bahwa GGL puncak 31,4 V. Gandakan N: puncaknya dua kali lipat. Gandakan f: puncaknya dua kali lipat DAN gelombangnya memadat.',
      'Amati kedua grafik bersamaan: setiap kali Φ melewati nol (kumparan sejajar medan) GGL mencapai puncak, dan saat Φ maksimum GGL nol.',
      'Turunkan f ke 1 Hz dan amati lampu: ia berkedip dua kali per putaran, karena kecerahan bergantung pada |ε|, bukan tandanya.',
      'Nyalakan komutator. Bagian negatif GGL dibalik ke atas: DC berdenyut, seperti pada dinamo DC atau generator lampu sepeda.',
    ],
  },

  learn: {
    background: {
      en: [
        'A generator turns mechanical motion into electrical energy using Faraday\'s law of induction: an EMF is induced in a coil whenever the magnetic flux through it changes, ε = −N dΦ/dt. The flux through one turn of a flat coil of area A in a uniform field B is Φ = BA cos θ, where θ is the angle between the field and the normal to the coil. In a generator the coil is rotated at constant angular speed ω = 2πf, so θ = ωt and the flux through N turns oscillates: Φ_total = NBA cos ωt. The maximum flux NBA occurs when the coil face is perpendicular to the field.',
        'Differentiating gives the induced EMF ε = −dΦ_total/dt = NBAω sin ωt. It is a sine wave with peak value ε₀ = NBAω, so the voltage grows with more turns, a stronger magnet, a bigger coil or faster rotation. Notice the quarter-cycle shift: the EMF is largest when the flux is zero, because that is when the flux is changing fastest, and zero when the flux is maximum, because the flux is momentarily not changing at all. The sim draws Φ(t) and ε(t) one above the other so you can see this phase relation directly.',
        'The numbers matter. A school coil with N = 100 turns, A = 100 cm² = 0.010 m², B = 0.10 T spun at 50 Hz (ω = 314 rad/s) gives ε₀ = 100 × 0.10 × 0.010 × 314 = 31.4 V. The effective (rms) value, which decides the heating in a resistor, is ε_rms = ε₀/√2 = 22.2 V. Mains electricity in Indonesia is 220 V rms at 50 Hz, so its peak is 311 V. Power-station generators use electromagnets of about 1 T, many turns and large areas, and are driven at exactly 50 rotations per second (or 3000 rpm) to keep the grid frequency fixed.',
        'The rotating coil must be connected to the outside circuit without the wires twisting. Slip rings are two metal rings on the axle, one for each end of the coil, touched by fixed carbon brushes; they deliver the alternating EMF unchanged. A commutator is a single ring split into two halves: every half turn the brushes swap which half they touch, exactly when the EMF changes sign, so the output is always the same polarity, ε_out = |NBAω sin ωt|. This is pulsing DC, used in simple dynamos; smoothing it needs capacitors or many coils at different angles. Reversing the idea, feeding current into a commutator machine makes it a DC motor.',
      ],
      id: [
        'Generator mengubah gerak mekanik menjadi energi listrik berdasarkan hukum induksi Faraday: GGL terinduksi dalam kumparan setiap kali fluks magnet yang menembusnya berubah, ε = −N dΦ/dt. Fluks melalui satu lilitan kumparan datar berluas A dalam medan seragam B adalah Φ = BA cos θ, dengan θ sudut antara medan dan garis normal kumparan. Pada generator, kumparan diputar dengan kecepatan sudut tetap ω = 2πf, sehingga θ = ωt dan fluks melalui N lilitan berosilasi: Φ_total = NBA cos ωt. Fluks maksimum NBA terjadi ketika bidang kumparan tegak lurus medan.',
        'Menurunkan terhadap waktu memberikan GGL induksi ε = −dΦ_total/dt = NBAω sin ωt. Ini gelombang sinus dengan nilai puncak ε₀ = NBAω, sehingga tegangan bertambah dengan lebih banyak lilitan, magnet lebih kuat, kumparan lebih besar, atau putaran lebih cepat. Perhatikan pergeseran seperempat siklus: GGL terbesar saat fluks nol, karena saat itulah fluks berubah paling cepat, dan nol saat fluks maksimum, karena sesaat fluks tidak berubah. Simulasi menggambar Φ(t) dan ε(t) bersusun agar hubungan fase ini terlihat langsung.',
        'Angkanya penting. Kumparan sekolah dengan N = 100 lilitan, A = 100 cm² = 0,010 m², B = 0,10 T yang diputar 50 Hz (ω = 314 rad/s) menghasilkan ε₀ = 100 × 0,10 × 0,010 × 314 = 31,4 V. Nilai efektif (rms), yang menentukan pemanasan pada resistor, adalah ε_rms = ε₀/√2 = 22,2 V. Listrik PLN di Indonesia 220 V rms pada 50 Hz, sehingga puncaknya 311 V. Generator pembangkit listrik memakai elektromagnet sekitar 1 T, banyak lilitan dan luas besar, dan diputar tepat 50 putaran per detik (3000 rpm) untuk menjaga frekuensi jaringan tetap.',
        'Kumparan yang berputar harus terhubung ke rangkaian luar tanpa kabel terpilin. Cincin geser adalah dua cincin logam pada poros, satu untuk tiap ujung kumparan, yang disentuh sikat karbon diam; cincin ini menyalurkan GGL bolak-balik tanpa perubahan. Komutator adalah satu cincin yang dibelah dua: setiap setengah putaran sikat bertukar belahan yang disentuhnya, tepat saat GGL berganti tanda, sehingga keluaran selalu berpolaritas sama, ε_out = |NBAω sin ωt|. Inilah DC berdenyut yang dipakai dinamo sederhana; meratakannya memerlukan kapasitor atau banyak kumparan pada sudut berbeda. Jika dibalik, mengalirkan arus ke mesin berkomutator menjadikannya motor DC.',
      ],
    },
    figure: {
      caption: {
        en: 'Flux Φ = NBA cos ωt (top) and EMF ε = NBAω sin ωt (bottom) over one rotation. The EMF peaks when the flux crosses zero, where the coil is edge-on to the field and the flux changes fastest.',
        id: 'Fluks Φ = NBA cos ωt (atas) dan GGL ε = NBAω sin ωt (bawah) selama satu putaran. GGL mencapai puncak saat fluks melewati nol, ketika kumparan sejajar medan dan fluks berubah paling cepat.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        const cosPts = [], sinPts = [];
        for (let i = 0; i <= 60; i++) {
          const x = 60 + i * 4.5, th = i / 60 * 2 * Math.PI;
          cosPts.push(`${x.toFixed(1)},${(70 - 40 * Math.cos(th)).toFixed(1)}`);
          sinPts.push(`${x.toFixed(1)},${(170 - 40 * Math.sin(th)).toFixed(1)}`);
        }
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Flux and EMF of a rotating coil', 'Fluks dan GGL kumparan berputar')}">
  <style>text{font:12px system-ui,sans-serif;fill:currentColor}.ax{stroke:currentColor;stroke-width:1.2;fill:none;opacity:.6}</style>
  <line x1="60" y1="70" x2="330" y2="70" class="ax"/>
  <line x1="60" y1="170" x2="330" y2="170" class="ax"/>
  <line x1="60" y1="25" x2="60" y2="215" class="ax"/>
  <polyline points="${cosPts.join(' ')}" fill="none" stroke="#38bdf8" stroke-width="2.2"/>
  <polyline points="${sinPts.join(' ')}" fill="none" stroke="#fbbf24" stroke-width="2.2"/>
  <line x1="127.5" y1="25" x2="127.5" y2="215" class="ax" stroke-dasharray="3 3"/>
  <line x1="262.5" y1="25" x2="262.5" y2="215" class="ax" stroke-dasharray="3 3"/>
  <text x="8" y="40" style="fill:#38bdf8">Φ</text>
  <text x="8" y="140" style="fill:#fbbf24">ε</text>
  <text x="66" y="24">Φ = NBA cos ωt</text>
  <text x="66" y="124">ε = NBAω sin ωt</text>
  <text x="300" y="60">NBA</text>
  <text x="296" y="160">NBAω</text>
  <text x="112" y="230">T/4</text>
  <text x="180" y="230">T/2</text>
  <text x="246" y="230">3T/4</text>
  <text x="318" y="230">T</text>
  <rect x="100" y="40" width="4" height="60" fill="currentColor" opacity=".35"/>
  <rect x="235" y="40" width="4" height="60" fill="currentColor" opacity=".35"/>
  <rect x="138" y="72" width="4" height="14" fill="currentColor" opacity=".35"/>
  <text x="104" y="112" font-size="10" opacity=".8">${L('edge-on', 'sejajar')}</text>
  <text x="140" y="96" font-size="10" opacity=".8">${L('face-on', 'tegak lurus')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Flux through a rotating coil: Φ = NBA cos ωt, with ω = 2πf; it is maximum (NBA) when the coil faces the field.',
        'Faraday\'s law gives ε = −dΦ/dt = NBAω sin ωt: a sine wave shifted a quarter cycle from the flux.',
        'Peak EMF ε₀ = NBAω: doubling N, B, A or f doubles the peak voltage; doubling f also doubles the frequency of the output.',
        'ε_rms = ε₀/√2 is the equivalent steady voltage for heating; 220 V mains has a peak of about 311 V.',
        'Slip rings deliver AC; a split-ring commutator reverses the connections every half turn and gives pulsing DC, |ε|.',
      ],
      id: [
        'Fluks melalui kumparan berputar: Φ = NBA cos ωt, dengan ω = 2πf; maksimum (NBA) saat kumparan menghadap medan.',
        'Hukum Faraday memberi ε = −dΦ/dt = NBAω sin ωt: gelombang sinus yang bergeser seperempat siklus dari fluks.',
        'GGL puncak ε₀ = NBAω: menggandakan N, B, A, atau f menggandakan tegangan puncak; menggandakan f juga menggandakan frekuensi keluaran.',
        'ε_rms = ε₀/√2 adalah tegangan tetap yang setara untuk pemanasan; listrik 220 V memiliki puncak sekitar 311 V.',
        'Cincin geser menyalurkan AC; komutator cincin belah membalik sambungan tiap setengah putaran dan menghasilkan DC berdenyut, |ε|.',
      ],
    },
    vocabulary: {
      en: [
        ['Magnetic flux (Φ)', 'The amount of field passing through a surface, Φ = BA cos θ, measured in webers (1 Wb = 1 T·m²).'],
        ['Faraday\'s law', 'The induced EMF equals minus the rate of change of flux: ε = −N dΦ/dt.'],
        ['EMF (ε)', 'Electromotive force: the voltage a source can supply, in volts.'],
        ['Angular frequency (ω)', 'ω = 2πf, in rad/s; one rotation per second is 6.28 rad/s.'],
        ['rms value', 'Root-mean-square: for a sine wave ε_rms = ε₀/√2 ≈ 0.707 ε₀.'],
        ['Slip rings and brushes', 'Rings on the axle and fixed contacts that connect a rotating coil to a stationary circuit.'],
        ['Commutator', 'A split ring that swaps the coil connections every half turn, making the output one-directional.'],
      ],
      id: [
        ['Fluks magnet (Φ)', 'Banyaknya medan yang menembus suatu permukaan, Φ = BA cos θ, dalam weber (1 Wb = 1 T·m²).'],
        ['Hukum Faraday', 'GGL induksi sama dengan negatif laju perubahan fluks: ε = −N dΦ/dt.'],
        ['GGL (ε)', 'Gaya gerak listrik: tegangan yang dapat diberikan sumber, dalam volt.'],
        ['Frekuensi sudut (ω)', 'ω = 2πf, dalam rad/s; satu putaran per sekon sama dengan 6,28 rad/s.'],
        ['Nilai rms', 'Akar rata-rata kuadrat: untuk gelombang sinus ε_rms = ε₀/√2 ≈ 0,707 ε₀.'],
        ['Cincin geser dan sikat', 'Cincin pada poros dan kontak diam yang menghubungkan kumparan berputar dengan rangkaian diam.'],
        ['Komutator', 'Cincin belah yang menukar sambungan kumparan tiap setengah putaran, sehingga keluaran searah.'],
      ],
    },
    misconceptions: {
      en: [
        ['The EMF is biggest when the most flux passes through the coil.', 'The EMF depends on how fast the flux changes, not on how much there is. At maximum flux the rate of change is zero, so the EMF is zero.'],
        ['Spinning the coil faster only makes the voltage change more often.', 'It also raises the peak voltage, because ε₀ = NBAω grows with ω. Doubling f doubles both the frequency and the amplitude.'],
        ['A commutator makes smooth, steady DC.', 'A single-coil commutator gives pulsing DC that still drops to zero twice per turn; smoothing needs filters or many coils.'],
      ],
      id: [
        ['GGL terbesar saat fluks yang menembus kumparan paling banyak.', 'GGL bergantung pada seberapa cepat fluks berubah, bukan pada banyaknya. Saat fluks maksimum laju perubahannya nol, sehingga GGL nol.'],
        ['Memutar kumparan lebih cepat hanya membuat tegangan berubah lebih sering.', 'Itu juga menaikkan tegangan puncak, karena ε₀ = NBAω bertambah dengan ω. Menggandakan f menggandakan frekuensi sekaligus amplitudo.'],
        ['Komutator menghasilkan DC yang halus dan tetap.', 'Komutator satu kumparan menghasilkan DC berdenyut yang masih turun ke nol dua kali per putaran; meratakannya memerlukan filter atau banyak kumparan.'],
      ],
    },
    realWorld: {
      en: [
        'Every power station, whether coal, gas, hydro, nuclear or wind, ends in a generator spinning at a fixed frequency: 50 Hz in Indonesia and Europe, 60 Hz in the Americas.',
        'A bicycle dynamo is a small generator; pedalling faster makes the lamp brighter because ε₀ ∝ ω.',
        'Hand-crank torches and shake-to-charge flashlights use the same induction principle at a few hertz.',
        'Regenerative braking in electric cars and trains runs the motor backwards as a generator, feeding energy to the battery or the grid.',
      ],
      id: [
        'Setiap pembangkit listrik, baik batu bara, gas, air, nuklir, maupun angin, berakhir pada generator yang berputar dengan frekuensi tetap: 50 Hz di Indonesia dan Eropa, 60 Hz di Amerika.',
        'Dinamo sepeda adalah generator kecil; mengayuh lebih cepat membuat lampu lebih terang karena ε₀ ∝ ω.',
        'Senter engkol tangan dan senter kocok memakai prinsip induksi yang sama pada beberapa hertz.',
        'Pengereman regeneratif pada mobil dan kereta listrik menjalankan motor terbalik sebagai generator, mengalirkan energi ke baterai atau jaringan.',
      ],
    },
    questions: {
      en: [
        { q: 'A coil of 200 turns and area 50 cm² rotates at 60 Hz in a 0.20 T field. Find the peak and rms EMF.', a: 'ω = 2π × 60 = 377 rad/s. ε₀ = NBAω = 200 × 0.20 × 0.0050 × 377 = 75.4 V. ε_rms = 75.4/√2 = 53.3 V.' },
        { q: 'At what position of the coil is the induced EMF zero, and why?', a: 'When the coil faces the field (θ = 0° or 180°), the flux is at a maximum or minimum and momentarily not changing, so dΦ/dt = 0 and ε = 0.' },
        { q: 'You want to double the peak voltage of a generator without changing the coil or the magnet. What can you do, and what else changes?', a: 'Double the rotation frequency. The peak doubles because ε₀ ∝ ω, but the output frequency also doubles, from 50 Hz to 100 Hz for example.' },
      ],
      id: [
        { q: 'Kumparan 200 lilitan berluas 50 cm² berputar 60 Hz dalam medan 0,20 T. Tentukan GGL puncak dan rms.', a: 'ω = 2π × 60 = 377 rad/s. ε₀ = NBAω = 200 × 0,20 × 0,0050 × 377 = 75,4 V. ε_rms = 75,4/√2 = 53,3 V.' },
        { q: 'Pada posisi kumparan yang mana GGL induksi nol, dan mengapa?', a: 'Saat kumparan menghadap medan (θ = 0° atau 180°), fluks berada di maksimum atau minimum dan sesaat tidak berubah, sehingga dΦ/dt = 0 dan ε = 0.' },
        { q: 'Kamu ingin menggandakan tegangan puncak generator tanpa mengubah kumparan atau magnet. Apa yang bisa dilakukan, dan apa lagi yang berubah?', a: 'Gandakan frekuensi putaran. Puncaknya menjadi dua kali karena ε₀ ∝ ω, tetapi frekuensi keluaran juga menjadi dua kali, misalnya dari 50 Hz ke 100 Hz.' },
      ],
    },
  },
};
