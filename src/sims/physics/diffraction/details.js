// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Apply d sin θ = mλ for the maxima of multi-slit interference.',
      'See how slit width controls envelope, separation controls spacing.',
      'Recognize the single-slit diffraction sinc² pattern.',
    ],
    id: [
      'Menerapkan d sin θ = mλ untuk maksimum interferensi banyak-celah.',
      'Melihat bahwa lebar celah mengendalikan amplop, jarak celah mengendalikan rapatan pita.',
      'Mengenali pola sinc² difraksi celah tunggal.',
    ],
  },
  tryThis: {
    en: [
      'Use 1 slit very narrow — see the broad central peak.',
      'Use 2 slits — count fringes inside the envelope.',
      'Switch to red vs blue light — which spreads further?',
    ],
    id: [
      'Gunakan 1 celah sangat sempit — amati puncak pusat yang lebar.',
      'Gunakan 2 celah — hitung jumlah pita di dalam amplop.',
      'Beralih cahaya merah vs biru — mana yang melebar lebih jauh?',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'Light is a wave, and waves do two things that particles cannot: they bend around the edges of an opening (diffraction), and when two waves meet they add, crest on crest giving brightness and crest on trough giving darkness (interference). Shine a single colour of light through a narrow slit of width a and the light fans out instead of casting a sharp shadow. Along the direction θ where the path difference between the two edges of the slit is one wavelength, a sin θ = λ, waves from all parts of the slit cancel in pairs and the screen is dark. The central bright band is bounded by these first minima, so a narrower slit gives a wider band: the pattern is widest when the slit is comparable to λ.',
        'With two slits a distance d apart, the light from each slit spreads out and overlaps. At angles where the extra distance travelled from one slit equals a whole number of wavelengths, d sin θ = mλ, the two waves arrive in step and reinforce, producing bright fringes of order m = 0, ±1, ±2, …; halfway between them they arrive out of step and cancel. For small angles and a screen at distance L, neighbouring fringes are separated by Δy ≈ λL/d. Longer wavelengths and smaller separations spread the fringes out; a more distant screen magnifies the whole pattern without changing the angles.',
        'The two effects always act together. The slit separation d sets the fine fringe spacing, while the slit width a sets a broad envelope, the single-slit pattern, that dims the fringes far from the centre; where a fringe falls on an envelope minimum it goes missing. Adding more slits with the same d leaves the bright fringes where they were but makes them narrower and brighter, with faint secondary ripples between them; this is how a diffraction grating sorts light by wavelength so sharply. The simulation computes the standard far-field intensity, I = I0 [sin β / β]² [sin(Nα) / (N sin α)]² with β = πa sin θ/λ and α = πd sin θ/λ, and plots it as a curve beside the screen and as a brightness pattern on it.',
        'The sliders change N, a, d, λ and L directly, and the readout reports the predicted fringe spacing λL/d in millimetres. The model assumes coherent, single-wavelength light arriving as a plane wave, a screen far enough away that rays to any point are parallel (the Fraunhofer approximation), and perfectly sharp slit edges; the animated ripples are only a visual hint and the brightness pattern on the screen is schematic rather than to scale. Real patterns from white light smear into coloured bands because each wavelength has its own spacing.',
      ],
      id: [
        'Cahaya adalah gelombang, dan gelombang melakukan dua hal yang tidak dapat dilakukan partikel: membelok di sekitar tepi bukaan (difraksi), dan saat dua gelombang bertemu keduanya dijumlahkan, puncak bertemu puncak memberi terang dan puncak bertemu lembah memberi gelap (interferensi). Sinari celah sempit selebar a dengan cahaya satu warna, maka cahaya menyebar seperti kipas alih-alih membentuk bayangan tajam. Pada arah θ ketika selisih lintasan dari kedua tepi celah sama dengan satu panjang gelombang, a sin θ = λ, gelombang dari seluruh bagian celah saling meniadakan berpasangan dan layar menjadi gelap. Pita terang pusat dibatasi oleh minimum pertama ini, sehingga celah yang lebih sempit memberi pita yang lebih lebar: pola paling lebar ketika celah sebanding dengan λ.',
        'Dengan dua celah berjarak d, cahaya dari tiap celah menyebar dan saling tumpang tindih. Pada sudut-sudut ketika jarak tambahan yang ditempuh dari salah satu celah sama dengan bilangan bulat kali panjang gelombang, d sin θ = mλ, kedua gelombang tiba sefase dan saling menguatkan, menghasilkan pita terang orde m = 0, ±1, ±2, …; di tengah-tengah antara keduanya gelombang tiba berlawanan fase dan saling meniadakan. Untuk sudut kecil dan layar sejauh L, pita-pita berdekatan terpisah sejauh Δy ≈ λL/d. Panjang gelombang yang lebih besar dan jarak celah yang lebih kecil merenggangkan pita; layar yang lebih jauh memperbesar seluruh pola tanpa mengubah sudutnya.',
        'Kedua efek selalu bekerja bersama. Jarak celah d menentukan jarak pita yang halus, sedangkan lebar celah a menentukan amplop lebar, yaitu pola celah tunggal, yang meredupkan pita-pita yang jauh dari pusat; jika sebuah pita jatuh pada minimum amplop, pita itu hilang. Menambah jumlah celah dengan d yang sama membiarkan pita terang di tempatnya tetapi membuatnya lebih sempit dan lebih terang, dengan riak sekunder samar di antaranya; begitulah kisi difraksi memilah cahaya menurut panjang gelombang dengan sangat tajam. Simulasi menghitung intensitas medan jauh baku, I = I0 [sin β / β]² [sin(Nα) / (N sin α)]² dengan β = πa sin θ/λ dan α = πd sin θ/λ, lalu menggambarnya sebagai kurva di samping layar dan sebagai pola kecerahan pada layar.',
        'Slider mengubah N, a, d, λ, dan L secara langsung, dan tampilan melaporkan jarak pita yang diprediksi λL/d dalam milimeter. Model ini mengasumsikan cahaya koheren satu panjang gelombang yang tiba sebagai gelombang datar, layar yang cukup jauh sehingga sinar ke titik mana pun sejajar (pendekatan Fraunhofer), dan tepi celah yang tajam sempurna; riak animasinya hanya petunjuk visual dan pola kecerahan pada layar bersifat skematis, bukan berskala. Pola sesungguhnya dari cahaya putih melebur menjadi pita-pita berwarna karena tiap panjang gelombang punya jaraknya sendiri.',
      ],
    },
    figure: {
      caption: {
        en: 'Double-slit intensity on the screen. The fine fringes (blue) are set by the slit separation d, with spacing Δy ≈ λL/d. The broad envelope (dashed amber) is the single-slit pattern set by the slit width a; fringes that land on its zeros are missing.',
        id: 'Intensitas celah ganda pada layar. Pita-pita halus (biru) ditentukan oleh jarak celah d, dengan jarak Δy ≈ λL/d. Amplop lebar (kuning putus-putus) adalah pola celah tunggal yang ditentukan oleh lebar celah a; pita yang jatuh pada nol amplop menjadi hilang.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        const sinc2 = (b) => (Math.abs(b) < 1e-6 ? 1 : (Math.sin(b) / b) ** 2);
        const X = (u) => 180 + 160 * u, Y = (I) => 190 - 150 * I;
        const env = [], tot = [];
        for (let i = 0; i <= 240; i++) {
          const u = -1 + (2 * i) / 240;
          const beta = (Math.PI * u) / 0.7;
          const e = sinc2(beta);
          env.push(`${X(u).toFixed(1)},${Y(e).toFixed(1)}`);
          tot.push(`${X(u).toFixed(1)},${Y(e * Math.cos(4 * beta) ** 2).toFixed(1)}`);
        }
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Double-slit interference pattern with single-slit envelope', 'Pola interferensi celah ganda dengan amplop celah tunggal')}">
  <style>text{font:12px system-ui,sans-serif;fill:currentColor}.m{fill:none;stroke:currentColor;stroke-width:1.2;opacity:.45}</style>
  <line x1="20" y1="190" x2="340" y2="190" class="m"/>
  <line x1="180" y1="190" x2="180" y2="30" class="m" stroke-dasharray="3 3"/>
  <polyline points="${env.join(' ')}" fill="none" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="5 3"/>
  <polyline points="${tot.join(' ')}" fill="none" stroke="#3b82f6" stroke-width="2"/>
  <line x1="180" y1="22" x2="208" y2="22" stroke="#ef4444" stroke-width="2" marker-start="url(#b)" marker-end="url(#b)"/>
  <text x="212" y="26" fill="#ef4444">Δy = λL/d</text>
  <text x="22" y="48" fill="#f59e0b">${L('envelope: slit width a', 'amplop: lebar celah a')}</text>
  <text x="22" y="64" fill="#f59e0b">${L('first zero at sin θ = λ/a', 'nol pertama di sin θ = λ/a')}</text>
  <text x="224" y="80" fill="#3b82f6">${L('fringes: separation d', 'pita: jarak celah d')}</text>
  <text x="224" y="96" fill="#3b82f6">${L('bright at d sin θ = mλ', 'terang di d sin θ = mλ')}</text>
  <text x="177" y="208">0</text>
  <text x="203" y="208">1</text>
  <text x="231" y="208">2</text>
  <text x="259" y="208">3</text>
  <text x="150" y="208">−1</text>
  <text x="122" y="208">−2</text>
  <text x="94" y="208">−3</text>
  <text x="280" y="224" fill="#8b5cf6">${L('missing order', 'orde hilang')}</text>
  <line x1="292" y1="212" x2="292" y2="194" stroke="#8b5cf6" stroke-width="1.5" marker-end="url(#a)"/>
  <text x="22" y="228">${L('position on screen (order m)', 'posisi di layar (orde m)')}</text>
  <defs>
    <marker id="a" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="#8b5cf6"/></marker>
    <marker id="b" markerWidth="6" markerHeight="6" refX="3" refY="3"><circle cx="3" cy="3" r="2" fill="#ef4444"/></marker>
  </defs>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Waves spread out after passing through an opening, and the spreading is greater the narrower the opening compared with λ.',
        'Two slits give bright fringes where d sin θ = mλ, with spacing Δy ≈ λL/d on a distant screen.',
        'Slit width sets the broad envelope (dark at a sin θ = mλ); slit separation sets the fine fringe spacing inside it.',
        'More slits at the same spacing sharpen and brighten the fringes without moving them, which is the principle of the diffraction grating.',
        'Longer wavelengths spread more, so red light gives wider fringes and a wider central band than blue.',
      ],
      id: [
        'Gelombang menyebar setelah melewati bukaan, dan penyebarannya semakin besar jika bukaan semakin sempit dibanding λ.',
        'Dua celah memberi pita terang di tempat d sin θ = mλ, dengan jarak Δy ≈ λL/d pada layar yang jauh.',
        'Lebar celah menentukan amplop lebar (gelap di a sin θ = mλ); jarak celah menentukan jarak pita halus di dalamnya.',
        'Lebih banyak celah dengan jarak yang sama menajamkan dan mencerahkan pita tanpa menggesernya, inilah prinsip kisi difraksi.',
        'Panjang gelombang yang lebih besar menyebar lebih jauh, sehingga cahaya merah memberi pita lebih lebar dan pita pusat lebih lebar daripada biru.',
      ],
    },
    vocabulary: {
      en: [
        ['Diffraction', 'The spreading of a wave into the region behind an obstacle or beyond the edges of an opening.'],
        ['Interference', 'The adding of two or more waves: constructive when in step (bright), destructive when out of step (dark).'],
        ['Coherent', 'Having a fixed phase relationship, so that interference patterns stay steady; laser light is highly coherent.'],
        ['Path difference', 'The extra distance one wave travels compared with another; whole wavelengths give constructive interference.'],
        ['Fringe', 'One bright (or dark) band in an interference pattern.'],
        ['Order (m)', 'The whole number of wavelengths of path difference at a bright fringe; m = 0 is the central maximum.'],
        ['Envelope', 'The slowly varying single-slit intensity that caps the heights of the multi-slit fringes.'],
        ['Diffraction grating', 'A surface with many equally spaced slits or grooves, producing very sharp maxima at d sin θ = mλ.'],
      ],
      id: [
        ['Difraksi', 'Penyebaran gelombang ke daerah di belakang penghalang atau melewati tepi suatu bukaan.'],
        ['Interferensi', 'Penjumlahan dua gelombang atau lebih: konstruktif jika sefase (terang), destruktif jika berlawanan fase (gelap).'],
        ['Koheren', 'Memiliki hubungan fase yang tetap, sehingga pola interferensi tetap stabil; cahaya laser sangat koheren.'],
        ['Selisih lintasan', 'Jarak tambahan yang ditempuh satu gelombang dibanding gelombang lain; kelipatan bulat panjang gelombang memberi interferensi konstruktif.'],
        ['Pita (frinji)', 'Satu pita terang (atau gelap) dalam pola interferensi.'],
        ['Orde (m)', 'Bilangan bulat jumlah panjang gelombang selisih lintasan pada pita terang; m = 0 adalah maksimum pusat.'],
        ['Amplop', 'Intensitas celah tunggal yang berubah perlahan dan membatasi tinggi pita-pita banyak celah.'],
        ['Kisi difraksi', 'Permukaan dengan banyak celah atau goresan berjarak sama, menghasilkan maksimum sangat tajam di d sin θ = mλ.'],
      ],
    },
    misconceptions: {
      en: [
        ['A narrower slit gives a narrower, sharper line of light on the screen.', 'The opposite happens once the slit is small compared with the wavelength. The central band widens as the slit narrows, because sin θ = λ/a for the first dark fringe grows as a shrinks.'],
        ['Adding more slits produces more fringes.', 'With the same spacing d the bright fringes stay at the same angles. More slits make each fringe narrower and brighter, and add faint secondary maxima between them, but the main fringe positions do not change.'],
        ['The dark fringes are places where the light has been destroyed.', 'Energy is never destroyed, only redistributed. The light missing from the dark fringes appears in the bright ones, which are brighter than either slit alone would give.'],
        ['Interference only happens with lasers.', 'Any light shows it; lasers simply make it easy because they are coherent and single-coloured. Thin-film colours on soap bubbles and oil slicks are interference in ordinary daylight.'],
      ],
      id: [
        ['Celah yang lebih sempit memberi garis cahaya yang lebih sempit dan tajam di layar.', 'Yang terjadi justru sebaliknya begitu celah menjadi kecil dibanding panjang gelombang. Pita pusat melebar saat celah menyempit, karena sin θ = λ/a untuk pita gelap pertama bertambah ketika a mengecil.'],
        ['Menambah celah menghasilkan lebih banyak pita.', 'Dengan jarak d yang sama pita terang tetap pada sudut yang sama. Lebih banyak celah membuat tiap pita lebih sempit dan lebih terang, serta menambah maksimum sekunder samar di antaranya, tetapi posisi pita utama tidak berubah.'],
        ['Pita gelap adalah tempat cahaya dimusnahkan.', 'Energi tidak pernah dimusnahkan, hanya disebarkan ulang. Cahaya yang hilang dari pita gelap muncul di pita terang, yang lebih cerah daripada yang dihasilkan satu celah saja.'],
        ['Interferensi hanya terjadi dengan laser.', 'Semua cahaya menunjukkannya; laser hanya memudahkannya karena koheren dan satu warna. Warna-warni pada gelembung sabun dan tumpahan minyak adalah interferensi dalam cahaya siang biasa.'],
      ],
    },
    realWorld: {
      en: [
        'The rainbow sheen of a CD or DVD is a reflection grating: the closely spaced tracks send each wavelength off at its own angle.',
        'Spectrometers use diffraction gratings to split starlight or laboratory light into its wavelengths, revealing which elements are present.',
        'Diffraction limits how fine a detail a microscope or telescope can resolve, which is why electron microscopes use electrons with far shorter wavelengths than light.',
        'X-ray diffraction from the regular rows of atoms in a crystal revealed the structure of DNA and of thousands of minerals and proteins.',
      ],
      id: [
        'Kilau pelangi pada CD atau DVD adalah kisi pantul: jalur-jalur yang berjarak rapat mengirim tiap panjang gelombang ke sudutnya sendiri.',
        'Spektrometer memakai kisi difraksi untuk memecah cahaya bintang atau cahaya laboratorium menjadi panjang gelombangnya, mengungkap unsur apa yang ada.',
        'Difraksi membatasi sehalus apa detail yang dapat dipisahkan mikroskop atau teleskop, itulah sebabnya mikroskop elektron memakai elektron dengan panjang gelombang jauh lebih pendek daripada cahaya.',
        'Difraksi sinar-X dari barisan atom yang teratur dalam kristal mengungkap struktur DNA serta ribuan mineral dan protein.',
      ],
    },
    questions: {
      en: [
        { q: 'Two slits 200 µm apart are lit with 600 nm light and the screen is 1.0 m away. What is the fringe spacing?', a: 'Δy ≈ λL/d = (600 × 10⁻⁹ m × 1.0 m) / (200 × 10⁻⁶ m) = 3.0 × 10⁻³ m = 3.0 mm, which is what the sim\'s readout shows for these default settings. Halving d to 100 µm doubles it to 6.0 mm.' },
        { q: 'With a = 30 µm and d = 200 µm, how many bright fringes fit inside the central envelope (between the first single-slit minima)?', a: 'The envelope\'s first zero is at sin θ = λ/a, and fringes sit at sin θ = mλ/d, so the fringes inside satisfy |m| less than d/a = 200/30 ≈ 6.7. That gives m = 0, ±1, …, ±6: thirteen bright fringes. Making the slits narrower (smaller a) widens the envelope and lets more fringes in.' },
        { q: 'You switch from blue light (450 nm) to red (700 nm) without touching anything else. What happens to the fringe spacing and to the width of the central band?', a: 'Both grow by the factor 700/450 ≈ 1.56, because Δy = λL/d and sin θ₁ = λ/a are each proportional to λ. Red light diffracts and interferes at larger angles than blue; this is why the colours separate in a grating spectrum.' },
      ],
      id: [
        { q: 'Dua celah berjarak 200 µm disinari cahaya 600 nm dan layar berada 1,0 m jauhnya. Berapa jarak antarpita?', a: 'Δy ≈ λL/d = (600 × 10⁻⁹ m × 1,0 m) / (200 × 10⁻⁶ m) = 3,0 × 10⁻³ m = 3,0 mm, sesuai yang ditampilkan simulasi untuk pengaturan bawaan ini. Memperkecil d menjadi 100 µm menggandakannya menjadi 6,0 mm.' },
        { q: 'Dengan a = 30 µm dan d = 200 µm, berapa pita terang yang muat di dalam amplop pusat (di antara minimum celah tunggal pertama)?', a: 'Nol pertama amplop berada di sin θ = λ/a, dan pita-pita berada di sin θ = mλ/d, sehingga pita di dalamnya memenuhi |m| kurang dari d/a = 200/30 ≈ 6,7. Jadi m = 0, ±1, …, ±6: tiga belas pita terang. Mempersempit celah (a lebih kecil) melebarkan amplop dan memuat lebih banyak pita.' },
        { q: 'Kamu mengganti cahaya biru (450 nm) dengan merah (700 nm) tanpa mengubah yang lain. Apa yang terjadi pada jarak pita dan lebar pita pusat?', a: 'Keduanya bertambah dengan faktor 700/450 ≈ 1,56, karena Δy = λL/d dan sin θ₁ = λ/a masing-masing sebanding dengan λ. Cahaya merah berdifraksi dan berinterferensi pada sudut lebih besar daripada biru; itulah sebabnya warna-warna terpisah pada spektrum kisi.' },
      ],
    },
  },
};
