// Long-form text for the sim page aside, kept out of manifest.js.
export default {
  objectives: {
    en: [
      'Explain the bright and dark fringes of a double slit as constructive and destructive interference with path difference d·sin θ = mλ and (m + ½)λ.',
      'Use Δy = λL/d to predict fringe spacing and test it by measuring positions on the screen, then rearrange it to find λ from a measured Δy.',
      'Describe how the slit width sets a single-slit diffraction envelope that modulates the double-slit fringes and makes some orders disappear.',
    ],
    id: [
      'Menjelaskan pita terang dan gelap pada celah ganda sebagai interferensi konstruktif dan destruktif dengan beda lintasan d·sin θ = mλ dan (m + ½)λ.',
      'Menggunakan Δy = λL/d untuk memprediksi jarak antar pita dan mengujinya dengan mengukur posisi di layar, lalu menyusunnya ulang untuk mencari λ dari Δy yang terukur.',
      'Mendeskripsikan bagaimana lebar celah menentukan selubung difraksi celah tunggal yang memodulasi pita celah ganda dan menghilangkan beberapa orde.',
    ],
  },
  tryThis: {
    en: [
      'Set d = 0.50 mm, λ = 550 nm, L = 1.00 m. Drag the markers onto two neighbouring bright fringes: the spacing should be 1.10 mm. Then halve d and watch the spacing double.',
      'Keep everything fixed and slide the wavelength from 400 nm to 700 nm. Red fringes are wider apart than violet ones; this is why white light gives coloured edges.',
      'Make the slit width 100 μm with d = 0.50 mm. Every 5th bright fringe disappears, because d/a = 5 puts a diffraction minimum on top of it.',
      'Switch on white light. Only the central fringe is white. Count how many fringes you can distinguish before the colours smear together.',
    ],
    id: [
      'Atur d = 0,50 mm, λ = 550 nm, L = 1,00 m. Geser penanda ke dua pita terang yang berdekatan: jaraknya seharusnya 1,10 mm. Lalu perkecil d menjadi setengahnya dan amati jaraknya menjadi dua kali.',
      'Tahan semua tetap dan geser panjang gelombang dari 400 nm ke 700 nm. Pita merah lebih berjauhan daripada pita ungu; inilah sebabnya cahaya putih memberi tepi berwarna.',
      'Buat lebar celah 100 μm dengan d = 0,50 mm. Setiap pita terang ke-5 hilang, karena d/a = 5 menempatkan minimum difraksi tepat di atasnya.',
      'Nyalakan cahaya putih. Hanya pita pusat yang putih. Hitung berapa pita yang masih bisa dibedakan sebelum warnanya saling tumpang tindih.',
    ],
  },

  learn: {
    background: {
      en: [
        'In 1801 Thomas Young let sunlight pass through two narrow slits and saw a row of bright and dark bands on a screen. Particles could not do that: two openings should give two patches of light. Waves can, because the light spreading from each slit reaches a given point on the screen after travelling different distances. Where the path difference is a whole number of wavelengths, d·sin θ = mλ (m = 0, ±1, ±2, …), the crests arrive together and interfere constructively, giving a bright fringe. Where it is a half-integer number, d·sin θ = (m + ½)λ, crest meets trough and the point stays dark.',
        'When the screen is far away compared with the slit separation (L ≫ d) the angles are small and sin θ ≈ tan θ = y/L, so bright fringes sit at yₘ = mλL/d and neighbouring fringes are separated by Δy = λL/d. Typical school values show how fine the pattern is: λ = 550 nm, d = 0.50 mm and L = 1.0 m give Δy = (550 × 10⁻⁹ × 1.0)/(0.50 × 10⁻³) = 1.1 mm. Increasing L or λ widens the pattern; increasing d narrows it. Since λ is the only unknown in a typical experiment, measuring Δy with a ruler is a direct way to find the wavelength of light, which is far too small to measure in any other everyday way.',
        'Each slit also has a finite width a, so each one by itself produces a single-slit diffraction pattern. The intensity on the screen is the product of the two effects: I(y) = I₀ cos²(πdy/λL) · [sin β/β]², with β = πay/(λL). The cos² term gives the closely spaced double-slit fringes; the sinc² envelope dims them away from the centre and goes to zero at y = λL/a, 2λL/a, … If d/a is an integer, say 5, then the 5th, 10th, … double-slit maxima fall exactly on envelope zeros and are missing. The sim evaluates this formula for every pixel column of the screen and colours it by wavelength. With white light each wavelength makes its own pattern with its own Δy; they coincide only at the centre, so the central fringe is white and the others become rainbows that quickly overlap.',
      ],
      id: [
        'Pada 1801 Thomas Young melewatkan cahaya matahari melalui dua celah sempit dan melihat barisan pita terang dan gelap di layar. Partikel tidak bisa melakukan itu: dua lubang semestinya memberi dua bercak cahaya. Gelombang bisa, karena cahaya yang menyebar dari setiap celah mencapai suatu titik di layar setelah menempuh jarak yang berbeda. Di tempat beda lintasannya merupakan bilangan bulat kali panjang gelombang, d·sin θ = mλ (m = 0, ±1, ±2, …), puncak-puncak tiba bersamaan dan berinterferensi konstruktif, menghasilkan pita terang. Di tempat beda lintasannya setengah-bulat, d·sin θ = (m + ½)λ, puncak bertemu lembah dan titik itu tetap gelap.',
        'Ketika layar jauh dibandingkan jarak antar celah (L ≫ d), sudutnya kecil dan sin θ ≈ tan θ = y/L, sehingga pita terang berada di yₘ = mλL/d dan pita yang berdekatan terpisah sejauh Δy = λL/d. Nilai khas di sekolah memperlihatkan betapa halusnya pola ini: λ = 550 nm, d = 0,50 mm, dan L = 1,0 m memberi Δy = (550 × 10⁻⁹ × 1,0)/(0,50 × 10⁻³) = 1,1 mm. Memperbesar L atau λ melebarkan pola; memperbesar d menyempitkannya. Karena λ adalah satu-satunya yang tak diketahui dalam percobaan khas, mengukur Δy dengan mistar adalah cara langsung menemukan panjang gelombang cahaya, yang terlalu kecil untuk diukur dengan cara sehari-hari lainnya.',
        'Setiap celah juga memiliki lebar berhingga a, sehingga masing-masing celah sendiri menghasilkan pola difraksi celah tunggal. Intensitas di layar adalah hasil kali kedua efek: I(y) = I₀ cos²(πdy/λL) · [sin β/β]², dengan β = πay/(λL). Suku cos² memberi pita celah ganda yang rapat; selubung sinc² meredupkannya menjauhi pusat dan menjadi nol di y = λL/a, 2λL/a, … Jika d/a bilangan bulat, misalnya 5, maka maksimum celah ganda ke-5, ke-10, … jatuh tepat pada nol selubung dan menghilang. Simulasi menghitung rumus ini untuk setiap kolom piksel layar dan mewarnainya menurut panjang gelombang. Dengan cahaya putih, setiap panjang gelombang membuat polanya sendiri dengan Δy-nya sendiri; semuanya berimpit hanya di pusat, sehingga pita pusat berwarna putih dan pita lainnya menjadi pelangi yang cepat saling tumpang tindih.',
      ],
    },
    figure: {
      caption: {
        en: 'Geometry of the double slit. Light from S₁ and S₂ reaches point P with a path difference d·sin θ ≈ d·y/L. Bright fringes appear where this equals mλ, so neighbouring fringes are Δy = λL/d apart. The intensity on the right shows cos² fringes under a single-slit envelope.',
        id: 'Geometri celah ganda. Cahaya dari S₁ dan S₂ mencapai titik P dengan beda lintasan d·sin θ ≈ d·y/L. Pita terang muncul ketika beda ini sama dengan mλ, sehingga pita yang berdekatan berjarak Δy = λL/d. Intensitas di kanan memperlihatkan pita cos² di bawah selubung celah tunggal.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        // intensity curve drawn along the screen (vertical), x grows with intensity
        let path = '';
        const sx = 262, yc = 120, half = 100;
        for (let i = 0; i <= 120; i++) {
          const y = -half + (2 * half * i) / 120;
          const u = y / half; // normalised position
          const b = Math.PI * 1.1 * u;
          const env = Math.abs(b) < 1e-6 ? 1 : (Math.sin(b) / b) ** 2;
          const I = env * Math.cos(Math.PI * 5.5 * u) ** 2;
          const x = sx + 70 * Math.max(0, Math.min(1, I));
          path += (i ? 'L' : 'M') + x.toFixed(1) + ' ' + (yc + y).toFixed(1) + ' ';
        }
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Double-slit geometry and intensity pattern', 'Geometri celah ganda dan pola intensitas')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.s{font:10px system-ui,sans-serif;fill:currentColor;opacity:.85}.m{stroke:currentColor;stroke-width:1.2;opacity:.5;fill:none}.k{stroke:currentColor;stroke-width:3}.r{stroke:#f59e0b;stroke-width:1.4;fill:none}.c{stroke:#3b82f6;stroke-width:1.6;fill:none}</style>
  <line x1="60" y1="20" x2="60" y2="108" class="k"/>
  <line x1="60" y1="116" x2="60" y2="124" class="k"/>
  <line x1="60" y1="132" x2="60" y2="220" class="k"/>
  <text x="34" y="115" class="s">S₁</text><text x="34" y="133" class="s">S₂</text>
  <line x1="48" y1="112" x2="48" y2="128" class="m"/><text x="38" y="150" class="s">d</text>
  <line x1="60" y1="112" x2="250" y2="56" class="r"/>
  <line x1="60" y1="128" x2="250" y2="56" class="r"/>
  <line x1="60" y1="120" x2="250" y2="120" class="m" stroke-dasharray="4 4"/>
  <line x1="250" y1="16" x2="250" y2="224" class="k"/>
  <circle cx="250" cy="56" r="3" fill="#f59e0b"/><text x="236" y="50" class="s">P</text>
  <line x1="256" y1="56" x2="256" y2="120" class="m"/><text x="240" y="92" class="s">y</text>
  <line x1="60" y1="232" x2="250" y2="232" class="m"/><text x="150" y="228" text-anchor="middle" class="s">L</text>
  <text x="96" y="112" class="s">θ</text>
  <path d="${path}" class="c"/>
  <text x="262" y="236" class="s">I(y)</text>
  <text x="4" y="16">${L('path difference', 'beda lintasan')} d·sin θ = mλ</text>
  <text x="4" y="30">Δy = λL/d</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Bright fringe: path difference d·sin θ = mλ; dark fringe: d·sin θ = (m + ½)λ, with m = 0, ±1, ±2, …',
        'For small angles the fringes are equally spaced with Δy = λL/d; wider slit separation means narrower fringes.',
        'Longer wavelengths (red) give wider spacing than shorter ones (violet), so white light produces a white centre with coloured fringes on either side.',
        'The slit width a sets a single-slit envelope [sin β/β]² with zeros at y = λL/a; double-slit maxima that land on a zero are "missing orders" when d/a is an integer.',
        'Measuring Δy, L and d with ordinary instruments gives λ = Δy·d/L, a wavelength of a few hundred nanometres from millimetre-scale measurements.',
      ],
      id: [
        'Pita terang: beda lintasan d·sin θ = mλ; pita gelap: d·sin θ = (m + ½)λ, dengan m = 0, ±1, ±2, …',
        'Untuk sudut kecil pita berjarak sama dengan Δy = λL/d; jarak antar celah yang lebih lebar berarti pita yang lebih rapat.',
        'Panjang gelombang yang lebih panjang (merah) memberi jarak pita lebih lebar daripada yang pendek (ungu), sehingga cahaya putih menghasilkan pusat putih dengan pita berwarna di kedua sisinya.',
        'Lebar celah a menentukan selubung celah tunggal [sin β/β]² dengan nol di y = λL/a; maksimum celah ganda yang jatuh pada nol itu menjadi "orde hilang" ketika d/a bilangan bulat.',
        'Mengukur Δy, L, dan d dengan alat biasa memberi λ = Δy·d/L, panjang gelombang beberapa ratus nanometer dari pengukuran berskala milimeter.',
      ],
    },
    vocabulary: {
      en: [
        ['Interference', 'The superposition of two waves: constructive when crests coincide (brighter), destructive when a crest meets a trough (dark).'],
        ['Path difference', 'The difference in distance travelled from the two slits to a point on the screen, d·sin θ. It decides whether the waves arrive in phase.'],
        ['Fringe spacing Δy', 'The distance between neighbouring bright fringes on the screen, Δy = λL/d in the small-angle approximation.'],
        ['Order m', 'The integer labelling a bright fringe by how many wavelengths of path difference it corresponds to; m = 0 is the central maximum.'],
        ['Diffraction envelope', 'The single-slit intensity pattern [sin β/β]², β = πay/(λL), that limits how bright the higher-order fringes can be.'],
        ['Coherent light', 'Light whose waves keep a fixed phase relationship, such as a laser beam; needed for a stable interference pattern.'],
      ],
      id: [
        ['Interferensi', 'Superposisi dua gelombang: konstruktif ketika puncak berimpit (lebih terang), destruktif ketika puncak bertemu lembah (gelap).'],
        ['Beda lintasan', 'Selisih jarak yang ditempuh dari kedua celah ke suatu titik di layar, d·sin θ. Ini menentukan apakah gelombang tiba sefase.'],
        ['Jarak pita Δy', 'Jarak antara pita terang yang berdekatan di layar, Δy = λL/d dalam pendekatan sudut kecil.'],
        ['Orde m', 'Bilangan bulat yang melabeli pita terang berdasarkan berapa panjang gelombang beda lintasannya; m = 0 adalah maksimum pusat.'],
        ['Selubung difraksi', 'Pola intensitas celah tunggal [sin β/β]², β = πay/(λL), yang membatasi seberapa terang pita orde tinggi.'],
        ['Cahaya koheren', 'Cahaya yang gelombangnya mempertahankan hubungan fase tetap, seperti berkas laser; diperlukan agar pola interferensi stabil.'],
      ],
    },
    misconceptions: {
      en: [
        ['Moving the slits closer together squeezes the fringes closer together.', 'It is the opposite: Δy = λL/d, so a smaller d gives wider fringes. Narrow spacing between the slits spreads the pattern out.'],
        ['The dark fringes are places where no light arrived.', 'Light from both slits arrives there; the two waves cancel because they are half a wavelength out of step. Energy is not lost, it is redistributed into the bright fringes.'],
        ['All bright fringes have the same brightness.', 'Only in the idealised formula with infinitely narrow slits. Real slits have a width a, and the single-slit envelope makes the fringes fade away from the centre and can remove some orders entirely.'],
        ['Interference needs two separate light sources.', 'Two independent lamps have random relative phase and give no stable pattern. Young used one source split into two slits so the two waves stay coherent.'],
      ],
      id: [
        ['Mendekatkan kedua celah membuat pita-pita semakin rapat.', 'Justru sebaliknya: Δy = λL/d, sehingga d yang lebih kecil memberi pita yang lebih lebar. Jarak celah yang sempit menyebarkan pola.'],
        ['Pita gelap adalah tempat yang tidak dicapai cahaya.', 'Cahaya dari kedua celah tiba di sana; kedua gelombang saling meniadakan karena berselisih setengah panjang gelombang. Energi tidak hilang, tetapi disalurkan ulang ke pita terang.'],
        ['Semua pita terang sama terangnya.', 'Hanya pada rumus ideal dengan celah yang tak berhingga sempit. Celah nyata memiliki lebar a, dan selubung celah tunggal membuat pita meredup menjauhi pusat dan bahkan dapat menghilangkan beberapa orde.'],
        ['Interferensi memerlukan dua sumber cahaya terpisah.', 'Dua lampu yang bebas memiliki fase relatif acak dan tidak memberi pola yang stabil. Young memakai satu sumber yang dibelah oleh dua celah sehingga kedua gelombang tetap koheren.'],
      ],
    },
    realWorld: {
      en: [
        'A laser pointer through a double slit on a wall a few metres away gives millimetre fringes you can measure with a ruler to find λ ≈ 650 nm.',
        'The rainbow sheen of a CD or DVD is interference from thousands of regularly spaced tracks acting like many slits (a diffraction grating).',
        'Anti-reflective coatings on glasses and camera lenses use destructive interference between reflections from the two coating surfaces.',
        'The same experiment done with electrons, one at a time, still produces fringes, which is the central puzzle of quantum mechanics.',
        'Radio telescopes combine signals from widely separated dishes (interferometry) so the array acts like one dish as large as their separation d.',
      ],
      id: [
        'Pointer laser yang dilewatkan celah ganda ke dinding beberapa meter jauhnya memberi pita berukuran milimeter yang bisa diukur dengan mistar untuk menemukan λ ≈ 650 nm.',
        'Kilau pelangi pada CD atau DVD adalah interferensi dari ribuan jalur yang berjarak teratur yang berperan seperti banyak celah (kisi difraksi).',
        'Lapisan anti-pantul pada kacamata dan lensa kamera memanfaatkan interferensi destruktif antara pantulan dari dua permukaan lapisan.',
        'Percobaan yang sama dengan elektron, satu demi satu, tetap menghasilkan pita, dan itulah teka-teki utama mekanika kuantum.',
        'Teleskop radio menggabungkan sinyal dari piringan-piringan yang berjauhan (interferometri) sehingga susunannya bekerja seperti satu piringan sebesar jarak pisahnya d.',
      ],
    },
    questions: {
      en: [
        { q: 'Light of 633 nm falls on slits 0.25 mm apart and the screen is 2.0 m away. What is the fringe spacing?', a: 'Δy = λL/d = (633 × 10⁻⁹ × 2.0)/(0.25 × 10⁻³) = 5.1 × 10⁻³ m = 5.1 mm.' },
        { q: 'In a measurement the 3rd bright fringe is 6.6 mm from the centre with d = 0.40 mm and L = 1.6 m. Find λ.', a: 'y₃ = 3λL/d, so λ = y₃·d/(3L) = (6.6 × 10⁻³ × 0.40 × 10⁻³)/(3 × 1.6) = 5.5 × 10⁻⁷ m = 550 nm.' },
        { q: 'Slits of width 0.10 mm are 0.50 mm apart. Which double-slit orders are missing?', a: 'Envelope zeros are at sin θ = kλ/a and maxima at sin θ = mλ/d, so they coincide when m = k·d/a = 5k. Orders 5, 10, 15, … are missing.' },
        { q: 'Why does the white-light pattern show a white central fringe but coloured fringes elsewhere?', a: 'At y = 0 the path difference is zero for every wavelength, so all colours are bright together. At other positions each λ has its own Δy = λL/d, so red peaks farther out than violet and the colours separate.' },
      ],
      id: [
        { q: 'Cahaya 633 nm mengenai celah berjarak 0,25 mm dan layar berada 2,0 m. Berapakah jarak antar pita?', a: 'Δy = λL/d = (633 × 10⁻⁹ × 2,0)/(0,25 × 10⁻³) = 5,1 × 10⁻³ m = 5,1 mm.' },
        { q: 'Pada suatu pengukuran, pita terang ke-3 berada 6,6 mm dari pusat dengan d = 0,40 mm dan L = 1,6 m. Tentukan λ.', a: 'y₃ = 3λL/d, sehingga λ = y₃·d/(3L) = (6,6 × 10⁻³ × 0,40 × 10⁻³)/(3 × 1,6) = 5,5 × 10⁻⁷ m = 550 nm.' },
        { q: 'Celah selebar 0,10 mm berjarak 0,50 mm. Orde celah ganda mana yang hilang?', a: 'Nol selubung berada di sin θ = kλ/a dan maksimum di sin θ = mλ/d, sehingga berimpit ketika m = k·d/a = 5k. Orde 5, 10, 15, … hilang.' },
        { q: 'Mengapa pola cahaya putih memperlihatkan pita pusat putih tetapi pita berwarna di tempat lain?', a: 'Pada y = 0 beda lintasannya nol untuk setiap panjang gelombang, sehingga semua warna terang bersamaan. Di posisi lain setiap λ memiliki Δy = λL/d sendiri, sehingga merah memuncak lebih jauh daripada ungu dan warnanya terpisah.' },
      ],
    },
  },
};
