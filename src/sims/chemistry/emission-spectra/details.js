// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Connect a line spectrum to atomic energy levels (E = hf).',
      'Apply the Rydberg formula for hydrogen: 1/λ = R (1/n₁² − 1/n₂²).',
      'Recognize the same spectral fingerprint in starlight identifies that element.',
    ],
    id: [
      'Menghubungkan spektrum garis dengan tingkat energi atom (E = hf).',
      'Menerapkan rumus Rydberg untuk hidrogen: 1/λ = R (1/n₁² − 1/n₂²).',
      'Mengenali sidik jari spektral di cahaya bintang mengidentifikasi unsurnya.',
    ],
  },  tryThis: {
    en: [
      'Hydrogen — Balmer series (red, cyan, blue-violet, violet) is visible.',
      'Sodium — bright doublet at 589 nm gives streetlights their orange-yellow glow.',
      'Mercury — used in fluorescent tubes, with strong UV that excites the white phosphor.',
    ],
    id: [
      'Hidrogen — deret Balmer (merah, sian, biru-ungu, ungu) terlihat.',
      'Natrium — dublet terang di 589 nm memberi lampu jalan cahaya kuning-oranye.',
      'Merkuri — di tabung fluoresen, UV kuat yang merangsang fosfor putih.',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'A hot solid, such as a light-bulb filament, glows with a continuous rainbow of colours. A thin gas that is heated or carries an electric current behaves very differently: it shines only at a handful of sharply defined wavelengths. Spread that light with a prism or a diffraction grating and you see a few bright lines on a dark background. This line spectrum is different for every element, which is why it is called the fingerprint of the atom.',
        'The lines exist because the electrons in an atom can only have certain energies, called energy levels. An electron that has been kicked up to a higher level soon drops back down, and the energy it loses leaves as a single photon: E(photon) = E(upper) − E(lower) = hf = hc/λ. Because the levels are fixed, only certain energy differences, and so only certain wavelengths, are possible. For hydrogen the levels follow E(n) = −13.6 eV / n², and the drops that end on n = 2 (the Balmer series) give the four visible lines: 656 nm (from n = 3), 486 nm (n = 4), 434 nm (n = 5) and 410 nm (n = 6). The Rydberg formula 1/λ = R (1/n₁² − 1/n₂²), with R = 1.097 × 10⁷ m⁻¹, predicts them all.',
        'The simulation lets you choose one of five gases: hydrogen, helium, neon, sodium or mercury. It draws the element\'s most prominent lines on a wavelength axis running from 200 nm (ultraviolet) through the visible band to 800 nm (near infrared); the height of each bar is a rough guide to its relative brightness, and hovering shows the wavelength. The sim uses a table of measured wavelengths rather than calculating them from energy levels, so hydrogen is the one element whose lines you can check yourself with the Rydberg formula. Atoms with more electrons have many more levels and therefore many more lines, which is why neon and mercury look so different from hydrogen.',
        'Keep the simplifications in mind. Only the brightest lines are shown; a real neon discharge has dozens. The relative intensities are approximate and in real lamps depend on temperature, pressure and how the gas is excited. Real lines have a small width, while here they are drawn as thin bars, and the two sodium D lines at 589.0 and 589.6 nm are so close that they almost merge. Lines below about 380 nm or above about 750 nm, such as mercury\'s strong 254 nm line, are plotted but would be invisible to your eye. The sim also shows only emission; the same element absorbs exactly the same wavelengths, producing dark lines in the spectrum of a star.',
      ],
      id: [
        'Benda padat yang panas, seperti filamen bola lampu, berpijar dengan warna pelangi yang sambung-menyambung. Gas tipis yang dipanaskan atau dialiri listrik berperilaku sangat berbeda: ia hanya bercahaya pada beberapa panjang gelombang yang tajam. Uraikan cahayanya dengan prisma atau kisi difraksi, dan yang tampak hanyalah beberapa garis terang di atas latar gelap. Spektrum garis ini berbeda untuk setiap unsur, sehingga disebut sidik jari atom.',
        'Garis-garis itu muncul karena elektron dalam atom hanya boleh memiliki energi tertentu, yang disebut tingkat energi. Elektron yang terdorong ke tingkat lebih tinggi akan segera turun kembali, dan energi yang dilepaskannya keluar sebagai satu foton: E(foton) = E(atas) − E(bawah) = hf = hc/λ. Karena tingkat energinya tetap, hanya selisih energi tertentu, dan berarti hanya panjang gelombang tertentu, yang mungkin terjadi. Untuk hidrogen, tingkat energinya mengikuti E(n) = −13,6 eV / n², dan transisi yang berakhir di n = 2 (deret Balmer) menghasilkan empat garis tampak: 656 nm (dari n = 3), 486 nm (n = 4), 434 nm (n = 5), dan 410 nm (n = 6). Rumus Rydberg 1/λ = R (1/n₁² − 1/n₂²), dengan R = 1,097 × 10⁷ m⁻¹, memprediksi semuanya.',
        'Simulasi ini membiarkanmu memilih satu dari lima gas: hidrogen, helium, neon, natrium, atau merkuri. Garis-garis paling menonjol dari unsur itu digambar pada sumbu panjang gelombang dari 200 nm (ultraviolet) melewati daerah tampak sampai 800 nm (inframerah dekat); tinggi tiap batang adalah perkiraan kasar kecerahan relatifnya, dan mengarahkan pointer akan menampilkan panjang gelombangnya. Simulasi memakai tabel panjang gelombang hasil pengukuran, bukan menghitungnya dari tingkat energi, sehingga hidrogen adalah satu-satunya unsur yang garisnya bisa kamu periksa sendiri dengan rumus Rydberg. Atom dengan lebih banyak elektron memiliki jauh lebih banyak tingkat energi dan karenanya lebih banyak garis; itulah sebabnya neon dan merkuri tampak sangat berbeda dari hidrogen.',
        'Ingat beberapa penyederhanaannya. Hanya garis paling terang yang ditampilkan; tabung neon sungguhan memiliki puluhan garis. Intensitas relatifnya hanya perkiraan, dan pada lampu nyata bergantung pada suhu, tekanan, dan cara gas dieksitasi. Garis sungguhan memiliki lebar kecil, sedangkan di sini digambar sebagai batang tipis, dan dua garis D natrium di 589,0 dan 589,6 nm begitu berdekatan sehingga hampir menyatu. Garis di bawah sekitar 380 nm atau di atas sekitar 750 nm, seperti garis kuat merkuri di 254 nm, tetap digambar tetapi tidak akan terlihat oleh mata. Simulasi juga hanya menampilkan emisi; unsur yang sama menyerap tepat pada panjang gelombang yang sama, menghasilkan garis gelap pada spektrum bintang.',
      ],
    },
    figure: {
      caption: {
        en: 'Hydrogen energy levels (not to scale). Each drop onto n = 2 releases one photon whose energy equals the gap, so each gives one Balmer line of a fixed wavelength.',
        id: 'Tingkat energi hidrogen (tidak berskala). Tiap penurunan ke n = 2 melepaskan satu foton yang energinya sama dengan selisih tingkat, sehingga menghasilkan satu garis Balmer dengan panjang gelombang tetap.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Hydrogen energy levels and Balmer lines', 'Tingkat energi hidrogen dan garis Balmer')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.lv{stroke:currentColor;stroke-width:1.5}.s{font-size:9px;opacity:.75}.t{stroke-width:2.2}</style>
  <line x1="30" y1="40" x2="230" y2="40" class="lv" stroke-dasharray="3 3" opacity=".5"/>
  <text x="236" y="44" class="s">n = ∞  (0 eV)</text>
  <line x1="30" y1="64" x2="230" y2="64" class="lv"/>
  <text x="236" y="68" class="s">n = 5  −0${L('.', ',')}54 eV</text>
  <line x1="30" y1="80" x2="230" y2="80" class="lv"/>
  <text x="236" y="84" class="s">n = 4  −0${L('.', ',')}85 eV</text>
  <line x1="30" y1="102" x2="230" y2="102" class="lv"/>
  <text x="236" y="106" class="s">n = 3  −1${L('.', ',')}51 eV</text>
  <line x1="30" y1="142" x2="230" y2="142" class="lv"/>
  <text x="236" y="146" class="s">n = 2  −3${L('.', ',')}40 eV</text>
  <line x1="30" y1="196" x2="230" y2="196" class="lv"/>
  <text x="236" y="200" class="s">n = 1  −13${L('.', ',')}6 eV (${L('ground', 'dasar')})</text>
  <line x1="110" y1="102" x2="110" y2="138" class="t" stroke="#ef4444"/>
  <path d="M105 132 L110 141 L115 132 z" fill="#ef4444"/>
  <text x="80" y="124" fill="#ef4444" class="s">656 nm</text>
  <line x1="150" y1="80" x2="150" y2="138" class="t" stroke="#3b82f6"/>
  <path d="M145 132 L150 141 L155 132 z" fill="#3b82f6"/>
  <text x="153" y="112" fill="#3b82f6" class="s">486 nm</text>
  <line x1="195" y1="64" x2="195" y2="138" class="t" stroke="#8b5cf6"/>
  <path d="M190 132 L195 141 L200 132 z" fill="#8b5cf6"/>
  <text x="198" y="96" fill="#8b5cf6" class="s">434 nm</text>
  <text x="30" y="30">${L('Electron drops → photon leaves', 'Elektron turun → foton keluar')}</text>
  <text x="120" y="170" class="s" text-anchor="middle">${L('E(photon) = E(upper) − E(lower) = hc/λ', 'E(foton) = E(atas) − E(bawah) = hc/λ')}</text>
  <rect x="40" y="214" width="280" height="18" fill="none" stroke="currentColor" opacity=".5"/>
  <rect x="276" y="214" width="3" height="18" fill="#ef4444"/>
  <rect x="118" y="214" width="3" height="18" fill="#3b82f6"/>
  <rect x="70" y="214" width="3" height="18" fill="#8b5cf6"/>
  <rect x="48" y="214" width="2" height="18" fill="#8b5cf6" opacity=".6"/>
  <text x="40" y="211" class="s">400 nm</text>
  <text x="292" y="211" class="s">700 nm</text>
  <text x="140" y="211" class="s">${L('Balmer lines as seen in the sim', 'Garis Balmer seperti di simulasi')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Atoms emit light only at specific wavelengths because their electrons can only sit at specific energy levels.',
        'One photon carries exactly the energy difference between two levels: E = hf = hc/λ, so a bigger drop means a shorter wavelength.',
        'Every element has its own set of levels and therefore its own unique line spectrum.',
        'For hydrogen, the Rydberg formula predicts every line; the Balmer series (ending on n = 2) is the visible part.',
        'Brightness of a line tells you how many atoms make that transition, not how energetic the photon is.',
      ],
      id: [
        'Atom memancarkan cahaya hanya pada panjang gelombang tertentu karena elektronnya hanya boleh berada pada tingkat energi tertentu.',
        'Satu foton membawa tepat selisih energi antara dua tingkat: E = hf = hc/λ, jadi penurunan lebih besar berarti panjang gelombang lebih pendek.',
        'Setiap unsur memiliki susunan tingkat energi sendiri, dan karenanya spektrum garis yang unik.',
        'Untuk hidrogen, rumus Rydberg memprediksi semua garisnya; deret Balmer (berakhir di n = 2) adalah bagian yang tampak.',
        'Kecerahan garis menunjukkan berapa banyak atom yang melakukan transisi itu, bukan seberapa besar energi fotonnya.',
      ],
    },
    vocabulary: {
      en: [
        ['Line spectrum', 'Light made of a few separate wavelengths, seen as bright lines when spread out by a prism or grating.'],
        ['Energy level', 'One of the fixed energies an electron in an atom is allowed to have; labelled n = 1, 2, 3, … in hydrogen.'],
        ['Ground state', 'The lowest energy level (n = 1); an atom in a higher level is in an excited state.'],
        ['Photon', 'A packet of light energy; its energy is E = hf = hc/λ.'],
        ['Wavelength (λ)', 'The distance between successive wave crests, measured here in nanometres (1 nm = 10⁻⁹ m); it sets the colour.'],
        ['Balmer series', 'The hydrogen lines produced by electrons falling to n = 2; four of them are visible.'],
        ['Rydberg constant (R)', 'R = 1.097 × 10⁷ m⁻¹, the constant in the hydrogen line formula 1/λ = R (1/n₁² − 1/n₂²).'],
        ['Spectroscopy', 'Identifying substances and measuring their properties by analysing the light they emit or absorb.'],
      ],
      id: [
        ['Spektrum garis', 'Cahaya yang terdiri dari beberapa panjang gelombang terpisah, tampak sebagai garis-garis terang ketika diuraikan prisma atau kisi.'],
        ['Tingkat energi', 'Salah satu energi tetap yang boleh dimiliki elektron dalam atom; pada hidrogen diberi label n = 1, 2, 3, ….'],
        ['Keadaan dasar', 'Tingkat energi terendah (n = 1); atom yang berada di tingkat lebih tinggi disebut tereksitasi.'],
        ['Foton', 'Paket energi cahaya; energinya E = hf = hc/λ.'],
        ['Panjang gelombang (λ)', 'Jarak antara dua puncak gelombang berurutan, di sini diukur dalam nanometer (1 nm = 10⁻⁹ m); menentukan warna.'],
        ['Deret Balmer', 'Garis-garis hidrogen yang dihasilkan elektron yang turun ke n = 2; empat di antaranya tampak oleh mata.'],
        ['Konstanta Rydberg (R)', 'R = 1,097 × 10⁷ m⁻¹, konstanta dalam rumus garis hidrogen 1/λ = R (1/n₁² − 1/n₂²).'],
        ['Spektroskopi', 'Mengenali zat dan mengukur sifatnya dengan menganalisis cahaya yang dipancarkan atau diserapnya.'],
      ],
    },
    misconceptions: {
      en: [
        ['An electron gives off light continuously while it circles the nucleus.', 'Light is emitted only at the moment an electron jumps from a higher level to a lower one. While it stays in a level, no light is emitted at all; that is why the spectrum is lines and not a smear.'],
        ['A brighter line means a higher-energy photon.', 'Brightness depends on how many atoms make that particular jump each second. Photon energy depends only on the wavelength: the violet 410 nm line carries more energy per photon than the red 656 nm line, even though the red line is brighter.'],
        ['Heating the gas more will shift its lines to new colours.', 'The wavelengths are fixed by the element\'s energy levels and do not move. Higher temperature changes which lines are strong, because more atoms reach the higher levels, but not where the lines are.'],
        ['Hydrogen has only the four lines shown.', 'Those are the visible Balmer lines. Drops to n = 1 (Lyman series) are in the ultraviolet and drops to n = 3 (Paschen series) are in the infrared; the sim\'s axis simply does not reach them.'],
      ],
      id: [
        ['Elektron terus-menerus memancarkan cahaya saat mengelilingi inti.', 'Cahaya hanya dipancarkan pada saat elektron melompat dari tingkat tinggi ke tingkat yang lebih rendah. Selama berada di satu tingkat, tidak ada cahaya yang dipancarkan; itulah sebabnya spektrumnya berupa garis, bukan pita menyambung.'],
        ['Garis yang lebih terang berarti fotonnya berenergi lebih tinggi.', 'Kecerahan bergantung pada berapa banyak atom yang melakukan lompatan itu tiap detik. Energi foton hanya bergantung pada panjang gelombang: garis ungu 410 nm membawa energi per foton lebih besar daripada garis merah 656 nm, meskipun garis merahnya lebih terang.'],
        ['Memanaskan gas lebih kuat akan menggeser garisnya ke warna lain.', 'Panjang gelombang ditentukan oleh tingkat energi unsur dan tidak bergeser. Suhu yang lebih tinggi mengubah garis mana yang kuat, karena lebih banyak atom mencapai tingkat tinggi, tetapi tidak mengubah posisi garisnya.'],
        ['Hidrogen hanya memiliki empat garis yang ditampilkan.', 'Itu hanya garis Balmer yang tampak. Penurunan ke n = 1 (deret Lyman) berada di ultraviolet dan penurunan ke n = 3 (deret Paschen) di inframerah; sumbu simulasi memang tidak menjangkaunya.'],
      ],
    },
    realWorld: {
      en: [
        'Helium was discovered in 1868 as an unknown yellow line in the spectrum of the Sun, decades before it was isolated on Earth; its name comes from helios, the Greek word for Sun.',
        'Low-pressure sodium streetlights glow orange-yellow because almost all their light is the 589 nm sodium doublet.',
        'Fluorescent tubes contain mercury vapour: its strong 254 nm ultraviolet line is absorbed by the white phosphor coating, which re-emits visible light.',
        'Astronomers identify the elements in stars and galaxies from their spectral lines, and measure how fast they move from how far the lines are shifted (the Doppler effect).',
      ],
      id: [
        'Helium ditemukan pada 1868 sebagai garis kuning tak dikenal dalam spektrum Matahari, puluhan tahun sebelum berhasil diisolasi di Bumi; namanya berasal dari helios, kata Yunani untuk Matahari.',
        'Lampu jalan natrium bertekanan rendah berpendar kuning-oranye karena hampir semua cahayanya berasal dari dublet natrium 589 nm.',
        'Tabung lampu fluoresen berisi uap merkuri: garis ultraviolet kuatnya di 254 nm diserap oleh lapisan fosfor putih, yang kemudian memancarkan cahaya tampak.',
        'Astronom mengenali unsur-unsur di bintang dan galaksi dari garis spektrumnya, dan mengukur kecepatan geraknya dari seberapa jauh garis itu bergeser (efek Doppler).',
      ],
    },
    questions: {
      en: [
        { q: 'Use the Rydberg formula to find the wavelength of the hydrogen transition from n = 3 to n = 2, and compare it with the sim.', a: '1/λ = 1.097 × 10⁷ × (1/2² − 1/3²) = 1.097 × 10⁷ × (0.250 − 0.111) = 1.52 × 10⁶ m⁻¹, so λ = 6.56 × 10⁻⁷ m = 656 nm. That is the red Hα line, the brightest hydrogen line in the sim.' },
        { q: 'The 486 nm hydrogen line comes from the n = 4 → 2 drop. Show that its photon energy matches the gap between those levels.', a: 'E(4) = −13.6/16 = −0.85 eV and E(2) = −13.6/4 = −3.40 eV, so the gap is 2.55 eV. A 486 nm photon has E = hc/λ = (1240 eV·nm)/486 nm = 2.55 eV. They agree, which is exactly why the line sits at 486 nm.' },
        { q: 'Mercury\'s strongest line in the sim is at 253.7 nm, yet a bare mercury lamp looks blue-green. Why?', a: '253.7 nm is in the ultraviolet (UV-C), so the eye cannot see it. The visible mercury lines at 436 nm (blue) and 546 nm (green) dominate what we see. In a fluorescent tube the UV line is put to work: a phosphor coating absorbs it and glows white.' },
      ],
      id: [
        { q: 'Gunakan rumus Rydberg untuk mencari panjang gelombang transisi hidrogen dari n = 3 ke n = 2, lalu bandingkan dengan simulasi.', a: '1/λ = 1,097 × 10⁷ × (1/2² − 1/3²) = 1,097 × 10⁷ × (0,250 − 0,111) = 1,52 × 10⁶ m⁻¹, sehingga λ = 6,56 × 10⁻⁷ m = 656 nm. Itulah garis merah Hα, garis hidrogen paling terang di simulasi.' },
        { q: 'Garis hidrogen 486 nm berasal dari penurunan n = 4 → 2. Tunjukkan bahwa energi fotonnya sesuai dengan selisih kedua tingkat itu.', a: 'E(4) = −13,6/16 = −0,85 eV dan E(2) = −13,6/4 = −3,40 eV, jadi selisihnya 2,55 eV. Foton 486 nm memiliki E = hc/λ = (1240 eV·nm)/486 nm = 2,55 eV. Keduanya cocok, dan itulah sebabnya garisnya tepat di 486 nm.' },
        { q: 'Garis merkuri terkuat di simulasi berada di 253,7 nm, tetapi lampu merkuri telanjang tampak biru-hijau. Mengapa?', a: '253,7 nm berada di ultraviolet (UV-C), sehingga tidak bisa dilihat mata. Yang kita lihat didominasi garis tampak merkuri di 436 nm (biru) dan 546 nm (hijau). Pada tabung fluoresen, garis UV itu justru dimanfaatkan: lapisan fosfor menyerapnya dan berpendar putih.' },
      ],
    },
  },
};
