// Long-form text for the sim page aside, kept out of manifest.js.
export default {
  objectives: {
    en: [
      'Derive time dilation Δt = γΔt₀ from a light clock using only the constancy of c and Pythagoras, and compute γ = 1/√(1 − v²/c²) for given speeds.',
      'Apply length contraction L = L₀/γ along the direction of motion and recognise that proper time and proper length are measured in the object\'s own rest frame.',
      'Use the muon experiment (10 km altitude, τ₀ = 2.2 μs) to show that time dilation in the ground frame and length contraction in the muon frame are two descriptions of the same fact.',
    ],
    id: [
      'Menurunkan dilatasi waktu Δt = γΔt₀ dari jam cahaya hanya dengan ketetapan c dan teorema Pythagoras, serta menghitung γ = 1/√(1 − v²/c²) untuk kecepatan tertentu.',
      'Menerapkan kontraksi panjang L = L₀/γ searah gerak dan mengenali bahwa waktu sejati dan panjang sejati diukur dalam kerangka diam benda itu sendiri.',
      'Menggunakan percobaan muon (ketinggian 10 km, τ₀ = 2,2 μs) untuk menunjukkan bahwa dilatasi waktu dalam kerangka tanah dan kontraksi panjang dalam kerangka muon adalah dua deskripsi dari fakta yang sama.',
    ],
  },
  tryThis: {
    en: [
      'Set v = 0.60c. γ should read exactly 1.25: one tick of the ship clock (10 ns of ship time) takes 12.5 ns of ground time, and the 10 m rod shrinks to 8.0 m.',
      'Slide v from 0 to 0.5c and watch how little γ changes (1.00 to 1.15). Then slide from 0.9c to 0.99c and watch it leap from 2.3 to 7.1.',
      'In the muon scenario at v = 0.99c, compare the two survival bars: about 11% of muons arrive with relativity, essentially none without.',
      'Find the speed at which the rod is contracted to half its proper length. It should be v = 0.866c, where γ = 2.',
    ],
    id: [
      'Atur v = 0,60c. γ seharusnya tepat 1,25: satu detak jam pesawat (10 ns waktu pesawat) memakan 12,5 ns waktu tanah, dan batang 10 m menyusut menjadi 8,0 m.',
      'Geser v dari 0 ke 0,5c dan perhatikan betapa sedikit γ berubah (1,00 ke 1,15). Lalu geser dari 0,9c ke 0,99c dan lihat lonjakannya dari 2,3 ke 7,1.',
      'Pada skenario muon di v = 0,99c, bandingkan dua batang kelangsungan hidup: sekitar 11% muon sampai dengan relativitas, hampir tidak ada tanpa relativitas.',
      'Cari kecepatan saat batang terkontraksi menjadi setengah panjang sejatinya. Seharusnya v = 0,866c, ketika γ = 2.',
    ],
  },

  learn: {
    background: {
      en: [
        'Einstein\'s special relativity rests on two postulates: the laws of physics are the same in every inertial frame, and the speed of light in vacuum, c = 3.00 × 10⁸ m/s, is the same for every observer regardless of how the source or observer moves. The second postulate seems harmless, but it forces time and length to depend on the observer. A light clock makes the consequence visible. Two mirrors a distance h apart face each other and a light pulse bounces between them; in the frame where the clock is at rest one tick, up and back, takes Δt₀ = 2h/c. With h = 1.5 m that is 10 ns.',
        'Now watch the same clock from the ground while it flies past at speed v. During one tick the clock moves a distance vΔt, so the light must travel along two diagonals, each of length √(h² + (vΔt/2)²), but still at speed c. Setting cΔt = 2√(h² + (vΔt/2)²) and solving gives Δt = Δt₀/√(1 − v²/c²) = γΔt₀. The Lorentz factor γ is always at least 1: at 0.1c it is 1.005, at 0.6c it is 1.25, at 0.866c it is 2, and at 0.99c it is 7.09. The moving clock really does tick more slowly as judged from the ground, and the effect is symmetric: the ship sees ground clocks run slow by the same factor. The time between two events measured in the frame where they happen at the same place is called the proper time Δt₀; every other frame measures a longer interval.',
        'Lengths along the direction of motion contract by the same factor: a rod of proper length L₀ (its length in its own rest frame) is measured to be L = L₀/γ by an observer it passes. A 10 m rod at 0.6c measures 8 m; at 0.99c only 1.41 m. Lengths perpendicular to the motion are unchanged, which is why the height h of the light clock could be used safely in the derivation. Everyday speeds give γ − 1 of about 10⁻¹² or less, so relativity hides from us, but GPS satellite clocks at 3.9 km/s must be corrected for it or positions would drift by kilometres per day.',
        'Cosmic rays striking the upper atmosphere create muons about 10 km up, moving at roughly 0.99c. A muon at rest decays with a mean lifetime of τ₀ = 2.2 μs, so without relativity it would travel only vτ₀ ≈ 650 m on average and about e⁻¹⁵ ≈ 10⁻⁷ of them would reach sea level. In fact a large fraction arrive. From the ground frame the explanation is time dilation: the muon\'s lifetime is stretched to γτ₀ ≈ 15.6 μs, long enough to cover 4.6 km on average, and the survival fraction is exp(−t/γτ₀) ≈ 11%. From the muon\'s frame the explanation is length contraction: the muon is at rest and the 10 km of atmosphere rushes past, contracted to 10 km/γ ≈ 1.4 km, which takes only 4.7 μs of the muon\'s own time. Both frames agree on what is observed, which is the whole point.',
      ],
      id: [
        'Relativitas khusus Einstein bertumpu pada dua postulat: hukum fisika sama dalam setiap kerangka inersial, dan laju cahaya di ruang hampa, c = 3,00 × 10⁸ m/s, sama bagi setiap pengamat tanpa peduli bagaimana sumber atau pengamat bergerak. Postulat kedua tampak tidak berbahaya, tetapi memaksa waktu dan panjang bergantung pada pengamat. Jam cahaya membuat akibatnya terlihat. Dua cermin berjarak h saling berhadapan dan sebuah pulsa cahaya memantul di antaranya; dalam kerangka tempat jam itu diam, satu detak, naik dan kembali, memerlukan Δt₀ = 2h/c. Dengan h = 1,5 m, itu sama dengan 10 ns.',
        'Sekarang amati jam yang sama dari tanah ketika ia melintas dengan kecepatan v. Selama satu detak, jam bergerak sejauh vΔt, sehingga cahaya harus menempuh dua diagonal, masing-masing sepanjang √(h² + (vΔt/2)²), tetapi tetap dengan laju c. Dengan menetapkan cΔt = 2√(h² + (vΔt/2)²) dan menyelesaikannya diperoleh Δt = Δt₀/√(1 − v²/c²) = γΔt₀. Faktor Lorentz γ selalu paling sedikit 1: pada 0,1c nilainya 1,005, pada 0,6c 1,25, pada 0,866c 2, dan pada 0,99c 7,09. Jam yang bergerak benar-benar berdetak lebih lambat menurut penilaian dari tanah, dan efeknya simetris: pesawat melihat jam di tanah berjalan lambat dengan faktor yang sama. Selang waktu antara dua peristiwa yang diukur dalam kerangka tempat keduanya terjadi di tempat yang sama disebut waktu sejati Δt₀; setiap kerangka lain mengukur selang yang lebih panjang.',
        'Panjang searah gerak menyusut dengan faktor yang sama: batang dengan panjang sejati L₀ (panjangnya dalam kerangka diamnya sendiri) diukur sebagai L = L₀/γ oleh pengamat yang dilewatinya. Batang 10 m pada 0,6c terukur 8 m; pada 0,99c hanya 1,41 m. Panjang tegak lurus gerak tidak berubah, itulah sebabnya tinggi h jam cahaya boleh dipakai dengan aman dalam penurunan tadi. Kecepatan sehari-hari memberi γ − 1 sekitar 10⁻¹² atau kurang, sehingga relativitas tersembunyi dari kita, tetapi jam satelit GPS pada 3,9 km/s harus dikoreksi karenanya atau posisi akan melenceng berkilometer per hari.',
        'Sinar kosmik yang menabrak atmosfer atas menciptakan muon pada ketinggian sekitar 10 km, bergerak dengan laju kira-kira 0,99c. Muon yang diam meluruh dengan umur rata-rata τ₀ = 2,2 μs, sehingga tanpa relativitas ia hanya akan menempuh vτ₀ ≈ 650 m rata-rata dan hanya sekitar e⁻¹⁵ ≈ 10⁻⁷ bagian yang akan mencapai permukaan laut. Kenyataannya sebagian besar sampai. Dari kerangka tanah penjelasannya adalah dilatasi waktu: umur muon memanjang menjadi γτ₀ ≈ 15,6 μs, cukup untuk menempuh 4,6 km rata-rata, dan fraksi yang bertahan adalah exp(−t/γτ₀) ≈ 11%. Dari kerangka muon penjelasannya adalah kontraksi panjang: muon diam dan 10 km atmosfer melesat melewatinya, terkontraksi menjadi 10 km/γ ≈ 1,4 km, yang hanya memerlukan 4,7 μs waktu muon sendiri. Kedua kerangka sepakat tentang apa yang diamati, dan itulah intinya.',
      ],
    },
    figure: {
      caption: {
        en: 'Left: in the ship frame the light pulse travels straight up and down, 2h per tick, so Δt₀ = 2h/c. Right: from the ground the clock moves vΔt during the tick and the light follows two diagonals of length cΔt/2 each. Pythagoras gives Δt = γΔt₀.',
        id: 'Kiri: dalam kerangka pesawat pulsa cahaya bergerak lurus naik-turun, 2h per detak, sehingga Δt₀ = 2h/c. Kanan: dari tanah jam bergerak vΔt selama satu detak dan cahaya mengikuti dua diagonal sepanjang cΔt/2 masing-masing. Pythagoras memberi Δt = γΔt₀.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Light clock in the ship frame and in the ground frame', 'Jam cahaya dalam kerangka pesawat dan kerangka tanah')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.s{font:10px system-ui,sans-serif;fill:currentColor;opacity:.85}.m{stroke:currentColor;stroke-width:1.2;opacity:.5;fill:none}.k{stroke:currentColor;stroke-width:3}.l{stroke:#fbbf24;stroke-width:2;fill:none}.a{stroke:#3b82f6;stroke-width:1.6;fill:none}</style>
  <text x="10" y="18">${L('ship frame', 'kerangka pesawat')}</text>
  <line x1="40" y1="40" x2="90" y2="40" class="k"/>
  <line x1="40" y1="160" x2="90" y2="160" class="k"/>
  <line x1="65" y1="156" x2="65" y2="44" class="l"/>
  <polygon points="65,44 61,52 69,52" fill="#fbbf24"/>
  <line x1="60" y1="152" x2="70" y2="152" class="l"/>
  <line x1="28" y1="40" x2="28" y2="160" class="m"/><text x="14" y="104" class="s">h</text>
  <text x="34" y="186">Δt₀ = 2h/c</text>
  <text x="34" y="202" class="s">h = 1.5 m → 10 ns</text>
  <text x="170" y="18">${L('ground frame', 'kerangka tanah')}</text>
  <line x1="150" y1="40" x2="200" y2="40" class="k" opacity=".35"/>
  <line x1="150" y1="160" x2="200" y2="160" class="k"/>
  <line x1="230" y1="40" x2="280" y2="40" class="k"/>
  <line x1="310" y1="160" x2="360" y2="160" class="k" opacity=".35"/>
  <line x1="175" y1="158" x2="255" y2="42" class="l"/>
  <line x1="255" y1="42" x2="335" y2="158" class="l"/>
  <polygon points="255,42 245,48 251,54" fill="#fbbf24"/>
  <line x1="175" y1="170" x2="335" y2="170" class="a"/>
  <polygon points="335,170 327,166 327,174" fill="#3b82f6"/>
  <text x="235" y="184" text-anchor="middle" class="s">vΔt</text>
  <line x1="255" y1="42" x2="255" y2="158" class="m" stroke-dasharray="3 3"/>
  <text x="258" y="104" class="s">h</text>
  <text x="188" y="92" class="s">cΔt/2</text>
  <text x="150" y="208">(cΔt/2)² = h² + (vΔt/2)²</text>
  <text x="150" y="226">Δt = Δt₀/√(1 − v²/c²) = γΔt₀</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'The speed of light c is the same in every inertial frame; this alone forces time and length to depend on the observer.',
        'Lorentz factor γ = 1/√(1 − v²/c²): 1.005 at 0.1c, 1.25 at 0.6c, 2 at 0.866c, 7.09 at 0.99c, growing without limit as v → c.',
        'Time dilation Δt = γΔt₀: a moving clock ticks slower; the proper time Δt₀ is measured in the clock\'s own rest frame.',
        'Length contraction L = L₀/γ applies only along the direction of motion; perpendicular lengths are unchanged.',
        'Muons made 10 km up reach the ground because their lifetime is dilated to γτ₀ (ground frame) or because the atmosphere is contracted to 10 km/γ (muon frame): same observation, two descriptions.',
        'Nothing with mass reaches c: as v → c, γ → ∞ and the energy required grows without bound.',
      ],
      id: [
        'Laju cahaya c sama dalam setiap kerangka inersial; ini saja memaksa waktu dan panjang bergantung pada pengamat.',
        'Faktor Lorentz γ = 1/√(1 − v²/c²): 1,005 pada 0,1c, 1,25 pada 0,6c, 2 pada 0,866c, 7,09 pada 0,99c, tumbuh tanpa batas ketika v → c.',
        'Dilatasi waktu Δt = γΔt₀: jam yang bergerak berdetak lebih lambat; waktu sejati Δt₀ diukur dalam kerangka diam jam itu sendiri.',
        'Kontraksi panjang L = L₀/γ hanya berlaku searah gerak; panjang tegak lurus tidak berubah.',
        'Muon yang tercipta 10 km di atas sampai ke tanah karena umurnya terdilatasi menjadi γτ₀ (kerangka tanah) atau karena atmosfer terkontraksi menjadi 10 km/γ (kerangka muon): pengamatan sama, dua deskripsi.',
        'Tidak ada benda bermassa yang mencapai c: ketika v → c, γ → ∞ dan energi yang diperlukan tumbuh tanpa batas.',
      ],
    },
    vocabulary: {
      en: [
        ['Inertial frame', 'A reference frame that is not accelerating; the laws of physics take the same form in all of them.'],
        ['Lorentz factor γ', 'γ = 1/√(1 − v²/c²), the factor by which moving clocks slow and moving lengths shrink. Equal to 1 at rest.'],
        ['Proper time Δt₀', 'The time between two events measured by a clock present at both events, i.e. in the frame where they occur at the same place. It is the shortest possible measured interval.'],
        ['Proper length L₀', 'The length of an object measured in its own rest frame. Any observer moving along the object measures L = L₀/γ.'],
        ['Time dilation', 'The observation that a clock moving relative to an observer ticks more slowly, Δt = γΔt₀.'],
        ['Muon', 'An unstable particle like a heavy electron (mass 207 mₑ) with a rest-frame mean lifetime of 2.2 μs, created by cosmic rays high in the atmosphere.'],
      ],
      id: [
        ['Kerangka inersial', 'Kerangka acuan yang tidak dipercepat; hukum fisika berbentuk sama dalam semua kerangka ini.'],
        ['Faktor Lorentz γ', 'γ = 1/√(1 − v²/c²), faktor yang memperlambat jam bergerak dan menyusutkan panjang yang bergerak. Bernilai 1 saat diam.'],
        ['Waktu sejati Δt₀', 'Selang waktu antara dua peristiwa yang diukur oleh jam yang hadir di kedua peristiwa, yaitu dalam kerangka tempat keduanya terjadi di tempat yang sama. Ini selang terukur yang paling pendek.'],
        ['Panjang sejati L₀', 'Panjang benda yang diukur dalam kerangka diamnya sendiri. Setiap pengamat yang bergerak searah benda mengukur L = L₀/γ.'],
        ['Dilatasi waktu', 'Pengamatan bahwa jam yang bergerak relatif terhadap pengamat berdetak lebih lambat, Δt = γΔt₀.'],
        ['Muon', 'Partikel tak stabil seperti elektron berat (massa 207 mₑ) dengan umur rata-rata 2,2 μs dalam kerangka diamnya, tercipta oleh sinar kosmik tinggi di atmosfer.'],
      ],
    },
    misconceptions: {
      en: [
        ['Time dilation is an illusion caused by light taking longer to reach the observer.', 'The signal-delay effect is corrected for in every measurement; what remains, Δt = γΔt₀, is a real difference in elapsed time. Muon counts on the ground and GPS clock corrections confirm it.'],
        ['The moving clock "knows" it is moving and runs slow.', 'Motion is relative. The ship sees ground clocks run slow by the same γ. Neither clock is faulty; the two frames simply slice spacetime differently.'],
        ['Objects contract in every direction when they move fast.', 'Only the length along the direction of motion contracts. The height of the light clock is unchanged, which is exactly what makes the derivation work.'],
        ['At half the speed of light, clocks run at half speed.', 'At 0.5c, γ = 1.155, so clocks run only about 13% slow. The dramatic effects appear only very close to c: γ = 2 needs 0.866c and γ = 7 needs 0.99c.'],
      ],
      id: [
        ['Dilatasi waktu hanyalah ilusi karena cahaya butuh waktu lebih lama mencapai pengamat.', 'Efek tunda sinyal sudah dikoreksi dalam setiap pengukuran; yang tersisa, Δt = γΔt₀, adalah perbedaan nyata waktu yang berlalu. Jumlah muon di tanah dan koreksi jam GPS membuktikannya.'],
        ['Jam yang bergerak "tahu" bahwa ia bergerak dan berjalan lambat.', 'Gerak itu relatif. Pesawat melihat jam di tanah berjalan lambat dengan γ yang sama. Tidak ada jam yang rusak; kedua kerangka hanya memotong ruang-waktu secara berbeda.'],
        ['Benda menyusut ke segala arah ketika bergerak cepat.', 'Hanya panjang searah gerak yang menyusut. Tinggi jam cahaya tidak berubah, dan justru itulah yang membuat penurunannya berhasil.'],
        ['Pada setengah laju cahaya, jam berjalan setengah kecepatan.', 'Pada 0,5c, γ = 1,155, sehingga jam hanya melambat sekitar 13%. Efek dramatis baru muncul sangat dekat c: γ = 2 memerlukan 0,866c dan γ = 7 memerlukan 0,99c.'],
      ],
    },
    realWorld: {
      en: [
        'GPS satellites move at about 3.9 km/s; their clocks lose 7 μs per day from time dilation (and gain 45 μs from general relativity). Without corrections, positions would drift by about 10 km per day.',
        'Muon detectors on mountaintops and at sea level measure survival fractions that match γτ₀, one of the earliest direct tests of time dilation (Rossi and Hall, 1941).',
        'Particle accelerators like the LHC run protons at γ ≈ 7000; the beam pipe magnets are designed around relativistic momentum, not Newton\'s.',
        'Unstable particles in accelerator beams travel much farther before decaying than their rest lifetimes allow, which is how physicists build beams of short-lived pions and kaons.',
        'Astronauts on the ISS (7.7 km/s) age about 0.01 s less per year than people on Earth from the speed effect alone.',
      ],
      id: [
        'Satelit GPS bergerak sekitar 3,9 km/s; jamnya kehilangan 7 μs per hari akibat dilatasi waktu (dan bertambah 45 μs dari relativitas umum). Tanpa koreksi, posisi akan melenceng sekitar 10 km per hari.',
        'Detektor muon di puncak gunung dan di permukaan laut mengukur fraksi kelangsungan hidup yang cocok dengan γτ₀, salah satu uji langsung dilatasi waktu paling awal (Rossi dan Hall, 1941).',
        'Akselerator partikel seperti LHC menjalankan proton pada γ ≈ 7000; magnet pipa berkasnya dirancang berdasarkan momentum relativistik, bukan Newton.',
        'Partikel tak stabil dalam berkas akselerator menempuh jarak jauh lebih panjang sebelum meluruh daripada yang diizinkan umur diamnya, dan dengan cara itulah fisikawan membangun berkas pion dan kaon berumur pendek.',
        'Astronaut di ISS (7,7 km/s) menua sekitar 0,01 s lebih sedikit per tahun dibanding orang di Bumi hanya dari efek kecepatan.',
      ],
    },
    questions: {
      en: [
        { q: 'A spaceship passes Earth at 0.80c. Its light clock ticks every 10 ns in the ship. What tick time do Earth observers measure, and how long does a 30 m ship appear?', a: 'γ = 1/√(1 − 0.64) = 1/0.6 = 1.667. Earth measures Δt = 1.667 × 10 ns = 16.7 ns per tick and a length L = 30/1.667 = 18 m.' },
        { q: 'A muon travels at 0.98c. What is its lifetime in the ground frame, and how far does it travel on average before decaying?', a: 'γ = 1/√(1 − 0.9604) = 5.03. Lifetime γτ₀ = 5.03 × 2.2 μs = 11.1 μs. Distance = vγτ₀ = 0.98 × 3.0 × 10⁸ × 11.1 × 10⁻⁶ ≈ 3.3 km.' },
        { q: 'At what speed does a clock run at exactly one third of its rest rate?', a: 'γ = 3, so 1 − v²/c² = 1/9, v²/c² = 8/9 and v = 0.943c.' },
        { q: 'Explain the muon result from the muon\'s own frame, where its lifetime is just 2.2 μs.', a: 'In the muon frame the atmosphere moves past at 0.99c and is contracted to 10 km/7.09 = 1.41 km. Covering 1.41 km at 0.99c takes 4.7 μs, only about 2 lifetimes, so e⁻²·¹ ≈ 11% survive, the same fraction the ground frame predicts.' },
      ],
      id: [
        { q: 'Sebuah pesawat melewati Bumi pada 0,80c. Jam cahayanya berdetak tiap 10 ns di pesawat. Berapa waktu detak yang diukur pengamat di Bumi, dan berapa panjang pesawat 30 m itu tampak?', a: 'γ = 1/√(1 − 0,64) = 1/0,6 = 1,667. Bumi mengukur Δt = 1,667 × 10 ns = 16,7 ns per detak dan panjang L = 30/1,667 = 18 m.' },
        { q: 'Sebuah muon bergerak pada 0,98c. Berapa umurnya dalam kerangka tanah, dan seberapa jauh rata-rata ia bergerak sebelum meluruh?', a: 'γ = 1/√(1 − 0,9604) = 5,03. Umur γτ₀ = 5,03 × 2,2 μs = 11,1 μs. Jarak = vγτ₀ = 0,98 × 3,0 × 10⁸ × 11,1 × 10⁻⁶ ≈ 3,3 km.' },
        { q: 'Pada kecepatan berapa jam berjalan tepat sepertiga laju diamnya?', a: 'γ = 3, sehingga 1 − v²/c² = 1/9, v²/c² = 8/9 dan v = 0,943c.' },
        { q: 'Jelaskan hasil muon dari kerangka muon sendiri, ketika umurnya hanya 2,2 μs.', a: 'Dalam kerangka muon, atmosfer bergerak melewatinya pada 0,99c dan terkontraksi menjadi 10 km/7,09 = 1,41 km. Menempuh 1,41 km pada 0,99c memerlukan 4,7 μs, hanya sekitar 2 kali umur, sehingga e⁻²·¹ ≈ 11% bertahan, fraksi yang sama dengan prediksi kerangka tanah.' },
      ],
    },
  },
};
