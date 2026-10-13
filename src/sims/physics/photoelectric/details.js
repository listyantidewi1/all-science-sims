// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Apply KE_max = hf − φ (Einstein\'s equation).',
      'See that frequency, not intensity, determines whether emission happens.',
      'Identify the work function from the threshold frequency.',
    ],
    id: [
      'Menerapkan KE_max = hf − φ (persamaan Einstein).',
      'Melihat bahwa frekuensi, bukan intensitas, menentukan apakah emisi terjadi.',
      'Mengenali fungsi kerja dari frekuensi ambang.',
    ],
  },
  tryThis: {
    en: [
      'Below threshold — does intensity make any electrons fly?',
      'Just above — do they barely fly, or fly fast?',
      'Switch to cesium (low φ) — does threshold drop?',
    ],
    id: [
      'Di bawah ambang — apakah intensitas membuat elektron terbang?',
      'Tepat di atas — apakah hampir tidak terbang, atau terbang cepat?',
      'Beralih ke sesium (φ rendah) — apakah ambang turun?',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'Shine light on a clean metal surface and electrons can be knocked out of it. Classical wave theory predicted that brighter light, carrying more energy, should always eject electrons eventually, and should eject them faster. Experiments said otherwise: below a certain frequency no electrons appear however bright the light, while above it they appear instantly, even in dim light, and their maximum energy depends on the frequency alone. In 1905 Einstein explained this by treating light as a stream of packets, photons, each with energy E = hf, where h = 4.136 × 10⁻¹⁵ eV·s is Planck\'s constant. This explanation earned him the 1921 Nobel Prize in Physics.',
        'An electron absorbs one photon at a time, all or nothing. To escape the metal it must pay an energy toll, the work function φ, which depends on the metal: about 2.1 eV for cesium but 5.1 eV for gold. Whatever is left over becomes kinetic energy: KE_max = hf − φ. If hf is smaller than φ the electron simply cannot leave, so the threshold frequency is f₀ = φ/h. Brighter light means more photons per second, and therefore more electrons per second, but each photon still carries the same hf, so the energy of each electron does not change.',
        'In the simulation the lamp fires photons whose colour reflects their wavelength, from infrared through visible to ultraviolet (purple). The frequency slider sets hf; the intensity slider sets how many photons arrive per second; the metal menu sets φ. When a photon reaches the plate with hf above φ, the sim releases an electron whose drawn speed increases with KE_max. For sodium (φ = 2.36 eV) the threshold is 5.7 × 10¹⁴ Hz, green light; at 10 × 10¹⁴ Hz the photon energy is 4.14 eV and KE_max = 1.78 eV. Gold needs ultraviolet above 12.3 × 10¹⁴ Hz.',
        'The sim is a cartoon of the real experiment. It lets every photon above threshold release an electron, whereas in a real metal only a small fraction do, and it draws every electron with the maximum energy, whereas real electrons leave with a spread of energies from zero up to KE_max because many lose energy on their way to the surface. There is no collecting electrode or stopping voltage, which is how KE_max is actually measured in the lab, and the photon and electron speeds on screen are illustrative, not to scale. Work function values are typical ones; real surfaces vary with cleanliness and crystal structure.',
      ],
      id: [
        'Sinari permukaan logam yang bersih dengan cahaya, maka elektron dapat terlontar keluar. Teori gelombang klasik meramalkan bahwa cahaya yang lebih terang, yang membawa lebih banyak energi, pada akhirnya selalu bisa melontarkan elektron, dan melontarkannya lebih cepat. Percobaan berkata lain: di bawah frekuensi tertentu tidak ada elektron yang muncul seterang apa pun cahayanya, sedangkan di atasnya elektron muncul seketika, bahkan pada cahaya redup, dan energi maksimumnya hanya bergantung pada frekuensi. Pada 1905 Einstein menjelaskannya dengan memperlakukan cahaya sebagai aliran paket, foton, yang masing-masing berenergi E = hf, dengan h = 4,136 × 10⁻¹⁵ eV·s adalah tetapan Planck. Penjelasan ini menghadiahinya Nobel Fisika 1921.',
        'Sebuah elektron menyerap satu foton sekaligus, seluruhnya atau tidak sama sekali. Untuk lepas dari logam elektron harus membayar ongkos energi, yaitu fungsi kerja φ, yang bergantung pada jenis logam: sekitar 2,1 eV untuk sesium tetapi 5,1 eV untuk emas. Sisanya menjadi energi kinetik: KE_max = hf − φ. Jika hf lebih kecil daripada φ elektron sama sekali tidak bisa keluar, sehingga frekuensi ambangnya f₀ = φ/h. Cahaya lebih terang berarti lebih banyak foton per detik, dan karenanya lebih banyak elektron per detik, tetapi tiap foton tetap membawa hf yang sama, sehingga energi tiap elektron tidak berubah.',
        'Di simulasi, lampu memancarkan foton yang warnanya mencerminkan panjang gelombangnya, dari inframerah lewat cahaya tampak sampai ultraviolet (ungu). Slider frekuensi mengatur hf; slider intensitas mengatur berapa foton yang tiba per detik; menu logam mengatur φ. Ketika foton mencapai pelat dengan hf di atas φ, simulasi melepaskan elektron yang kecepatan gambarnya bertambah mengikuti KE_max. Untuk natrium (φ = 2,36 eV) ambangnya 5,7 × 10¹⁴ Hz, cahaya hijau; pada 10 × 10¹⁴ Hz energi foton 4,14 eV dan KE_max = 1,78 eV. Emas membutuhkan ultraviolet di atas 12,3 × 10¹⁴ Hz.',
        'Simulasi ini adalah kartun dari percobaan sungguhan. Ia membiarkan setiap foton di atas ambang melepaskan satu elektron, padahal pada logam nyata hanya sebagian kecil yang berhasil, dan ia menggambar setiap elektron dengan energi maksimum, padahal elektron nyata keluar dengan sebaran energi dari nol sampai KE_max karena banyak yang kehilangan energi dalam perjalanan ke permukaan. Tidak ada elektrode pengumpul maupun tegangan penghenti, yang di laboratorium justru menjadi cara mengukur KE_max, dan kecepatan foton serta elektron di layar hanya ilustrasi, bukan skala sebenarnya. Nilai fungsi kerja adalah nilai khas; permukaan nyata bervariasi menurut kebersihan dan struktur kristalnya.',
      ],
    },
    figure: {
      caption: {
        en: 'KE_max against frequency is a straight line of slope h that starts at the threshold f₀ = φ/h; extending it back to the axis gives −φ. Below f₀ no electrons escape at any intensity. A metal with a larger work function gives a parallel line shifted to the right.',
        id: 'KE_max terhadap frekuensi berupa garis lurus bergradien h yang mulai dari ambang f₀ = φ/h; memperpanjangnya ke belakang sampai sumbu memberi −φ. Di bawah f₀ tidak ada elektron yang lepas pada intensitas berapa pun. Logam dengan fungsi kerja lebih besar memberi garis sejajar yang bergeser ke kanan.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Maximum kinetic energy versus light frequency', 'Energi kinetik maksimum terhadap frekuensi cahaya')}">
  <style>text{font:12px system-ui,sans-serif;fill:currentColor}.m{fill:none;stroke:currentColor;stroke-width:1.2;opacity:.45}.l{stroke-width:2.4;fill:none}.s{font-size:10px;opacity:.8}</style>
  <rect x="61" y="30" width="89" height="130" fill="currentColor" opacity=".07"/>
  <text x="66" y="48" class="s">${L('no emission', 'tak ada emisi')}</text>
  <text x="66" y="61" class="s">${L('at any intensity', 'pada intensitas apa pun')}</text>
  <line x1="60" y1="30" x2="60" y2="222" class="m"/>
  <line x1="60" y1="160" x2="345" y2="160" class="m" marker-end="url(#p)"/>
  <text x="64" y="26" class="s">KE_max</text>
  <text x="336" y="176" class="s">f</text>
  <line x1="60" y1="210" x2="150" y2="160" class="m" stroke="#ef4444" stroke-dasharray="4 4"/>
  <line x1="150" y1="160" x2="330" y2="60" class="l" stroke="#ef4444"/>
  <circle cx="150" cy="160" r="4" fill="#ef4444"/>
  <text x="126" y="176" fill="#ef4444">f₀ = φ/h</text>
  <circle cx="60" cy="210" r="3" fill="#ef4444"/>
  <text x="36" y="214" fill="#ef4444">−φ</text>
  <text x="214" y="86" fill="#ef4444">KE_max = hf − φ</text>
  <line x1="240" y1="110" x2="276" y2="110" class="m" stroke="#ef4444"/>
  <line x1="276" y1="110" x2="276" y2="90" class="m" stroke="#ef4444"/>
  <text x="246" y="124" fill="#ef4444" class="s">${L('slope = h', 'gradien = h')}</text>
  <line x1="230" y1="160" x2="330" y2="104.4" class="l" stroke="#f59e0b" stroke-dasharray="6 3"/>
  <circle cx="230" cy="160" r="4" fill="#f59e0b"/>
  <text x="232" y="178" fill="#f59e0b" class="s">${L('larger φ (e.g. gold)', 'φ lebih besar (mis. emas)')}</text>
  <rect x="296" y="192" width="10" height="42" fill="currentColor" opacity=".35"/>
  <line x1="236" y1="208" x2="294" y2="214" class="l" stroke="#f59e0b" marker-end="url(#p)"/>
  <text x="246" y="200" fill="#f59e0b" class="s">${L('photon hf', 'foton hf')}</text>
  <circle cx="318" cy="206" r="4" fill="#3b82f6"/>
  <line x1="324" y1="206" x2="344" y2="200" class="l" stroke="#3b82f6" marker-end="url(#p)"/>
  <text x="310" y="228" fill="#3b82f6" class="s">e⁻ KE</text>
  <text x="70" y="236" class="s">${L('metal plate: electron pays φ to escape', 'pelat logam: elektron membayar φ untuk lepas')}</text>
  <defs><marker id="p" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="context-stroke"/></marker></defs>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Light is absorbed in packets called photons, each with energy E = hf; an electron takes one whole photon or nothing.',
        'An electron must spend the work function φ to leave the metal, so KE_max = hf − φ.',
        'Below the threshold frequency f₀ = φ/h no electrons are emitted, no matter how intense the light or how long it shines.',
        'Intensity controls how many electrons leave per second; frequency controls how much energy each one has.',
        'A graph of KE_max against f is a straight line whose slope is Planck\'s constant and whose intercept gives the work function.',
      ],
      id: [
        'Cahaya diserap dalam paket-paket yang disebut foton, masing-masing berenergi E = hf; sebuah elektron menerima satu foton utuh atau tidak sama sekali.',
        'Elektron harus mengeluarkan fungsi kerja φ untuk meninggalkan logam, sehingga KE_max = hf − φ.',
        'Di bawah frekuensi ambang f₀ = φ/h tidak ada elektron yang dipancarkan, seberapa kuat pun intensitas cahaya atau seberapa lama disinari.',
        'Intensitas mengatur berapa elektron yang keluar per detik; frekuensi mengatur berapa energi tiap elektron.',
        'Grafik KE_max terhadap f berupa garis lurus yang gradiennya tetapan Planck dan titik potongnya memberi fungsi kerja.',
      ],
    },
    vocabulary: {
      en: [
        ['Photon', 'A packet of light energy; the smallest amount of light of a given frequency, with energy E = hf.'],
        ['Planck\'s constant (h)', 'The constant linking a photon\'s energy to its frequency, 6.63 × 10⁻³⁴ J·s or 4.136 × 10⁻¹⁵ eV·s.'],
        ['Work function (φ)', 'The minimum energy needed to remove an electron from the surface of a particular metal, typically 2 to 5 eV.'],
        ['Threshold frequency (f₀)', 'The lowest light frequency that can eject electrons from a metal: f₀ = φ/h.'],
        ['Electronvolt (eV)', 'A convenient energy unit for atoms and electrons: 1 eV = 1.6 × 10⁻¹⁹ J.'],
        ['Intensity', 'The energy delivered per second per unit area; for light of one frequency it is proportional to the number of photons arriving per second.'],
        ['Stopping voltage', 'The reverse voltage that just stops the fastest electrons; it equals KE_max in electronvolts and is how the lab experiment measures KE_max.'],
      ],
      id: [
        ['Foton', 'Paket energi cahaya; jumlah cahaya terkecil pada frekuensi tertentu, dengan energi E = hf.'],
        ['Tetapan Planck (h)', 'Tetapan yang menghubungkan energi foton dengan frekuensinya, 6,63 × 10⁻³⁴ J·s atau 4,136 × 10⁻¹⁵ eV·s.'],
        ['Fungsi kerja (φ)', 'Energi minimum yang dibutuhkan untuk mengeluarkan elektron dari permukaan logam tertentu, biasanya 2 sampai 5 eV.'],
        ['Frekuensi ambang (f₀)', 'Frekuensi cahaya terendah yang dapat melontarkan elektron dari logam: f₀ = φ/h.'],
        ['Elektronvolt (eV)', 'Satuan energi yang praktis untuk atom dan elektron: 1 eV = 1,6 × 10⁻¹⁹ J.'],
        ['Intensitas', 'Energi yang disampaikan per detik per satuan luas; untuk cahaya satu frekuensi, sebanding dengan jumlah foton yang tiba per detik.'],
        ['Tegangan penghenti', 'Tegangan balik yang tepat menghentikan elektron tercepat; nilainya sama dengan KE_max dalam elektronvolt dan menjadi cara percobaan laboratorium mengukur KE_max.'],
      ],
    },
    misconceptions: {
      en: [
        ['Brighter light gives the electrons more energy.', 'It gives more electrons, not faster ones. Each electron absorbs a single photon, and a photon\'s energy depends only on frequency. In the sim, raising intensity below threshold still produces nothing.'],
        ['If you wait long enough, dim low-frequency light will eventually build up enough energy to eject an electron.', 'Electrons cannot store up energy from several photons in a normal photoelectric experiment. Each photon is absorbed on its own, so if hf < φ nothing happens, however long you wait.'],
        ['All emitted electrons have the energy hf − φ.', 'That is the maximum. Electrons that start deeper in the metal lose energy before reaching the surface and leave with less. The sim shows only the maximum.'],
        ['The threshold frequency is the same for every metal.', 'It depends on the work function: cesium emits with green light, while gold needs ultraviolet. Switching metals in the sim moves the threshold.'],
      ],
      id: [
        ['Cahaya lebih terang memberi elektron energi lebih besar.', 'Cahaya lebih terang memberi lebih banyak elektron, bukan elektron yang lebih cepat. Tiap elektron menyerap satu foton, dan energi foton hanya bergantung pada frekuensi. Di simulasi, menaikkan intensitas di bawah ambang tetap tidak menghasilkan apa-apa.'],
        ['Jika menunggu cukup lama, cahaya redup berfrekuensi rendah akhirnya mengumpulkan energi yang cukup untuk melontarkan elektron.', 'Pada percobaan fotolistrik biasa elektron tidak bisa menabung energi dari beberapa foton. Tiap foton diserap sendiri-sendiri, sehingga jika hf < φ tidak terjadi apa-apa, berapa lama pun kamu menunggu.'],
        ['Semua elektron yang dipancarkan berenergi hf − φ.', 'Itu nilai maksimumnya. Elektron yang berawal lebih dalam di logam kehilangan energi sebelum mencapai permukaan dan keluar dengan energi lebih kecil. Simulasi hanya menampilkan nilai maksimum.'],
        ['Frekuensi ambang sama untuk setiap logam.', 'Frekuensi ambang bergantung pada fungsi kerja: sesium memancarkan elektron dengan cahaya hijau, sedangkan emas membutuhkan ultraviolet. Mengganti logam di simulasi menggeser ambangnya.'],
      ],
    },
    realWorld: {
      en: [
        'Solar cells rely on photons freeing electrons inside a semiconductor; their efficiency is limited partly because photons below the material\'s threshold energy are wasted.',
        'Night-vision and photomultiplier tubes use low-work-function surfaces, often containing cesium, so that even faint light releases electrons that can then be amplified.',
        'Ultraviolet light causes sunburn and damages DNA while visible light does not, for the same reason: individual UV photons carry enough energy to break chemical bonds.',
        'Digital camera sensors count photons one by one; their noise in dim light comes from the random arrival of individual photons.',
      ],
      id: [
        'Sel surya mengandalkan foton yang membebaskan elektron di dalam semikonduktor; efisiensinya terbatas antara lain karena foton di bawah energi ambang bahan terbuang percuma.',
        'Alat penglihatan malam dan tabung fotopengganda memakai permukaan berfungsi kerja rendah, sering mengandung sesium, sehingga cahaya redup pun melepaskan elektron yang lalu dapat diperkuat.',
        'Sinar ultraviolet menyebabkan kulit terbakar dan merusak DNA sedangkan cahaya tampak tidak, dengan alasan yang sama: tiap foton UV membawa energi yang cukup untuk memutus ikatan kimia.',
        'Sensor kamera digital menghitung foton satu per satu; derau pada cahaya redup berasal dari kedatangan acak foton-foton tunggal.',
      ],
    },
    questions: {
      en: [
        { q: 'Light of frequency 8.0 × 10¹⁴ Hz falls on sodium (φ = 2.36 eV). What is the maximum kinetic energy of the emitted electrons?', a: 'hf = 4.136 × 10⁻¹⁵ × 8.0 × 10¹⁴ = 3.31 eV. KE_max = 3.31 − 2.36 = 0.95 eV. Try it in the sim: the readout should show about 0.95 eV.' },
        { q: 'What is the threshold frequency of gold (φ = 5.10 eV)? Is visible light (4 to 7.5 × 10¹⁴ Hz) enough?', a: 'f₀ = φ/h = 5.10/(4.136 × 10⁻¹⁵) = 1.23 × 10¹⁵ Hz = 12.3 × 10¹⁴ Hz, which is ultraviolet. No visible light can eject electrons from gold, however bright.' },
        { q: 'In the sim, set the frequency below threshold and turn the intensity to maximum. Explain, using photons, why nothing happens.', a: 'Higher intensity means more photons per second, but each one still has energy hf, which is less than φ. An electron absorbs photons one at a time, so no single absorption gives it enough energy to escape. Many weak photons do not add up to one strong one.' },
      ],
      id: [
        { q: 'Cahaya berfrekuensi 8,0 × 10¹⁴ Hz mengenai natrium (φ = 2,36 eV). Berapa energi kinetik maksimum elektron yang dipancarkan?', a: 'hf = 4,136 × 10⁻¹⁵ × 8,0 × 10¹⁴ = 3,31 eV. KE_max = 3,31 − 2,36 = 0,95 eV. Coba di simulasi: tampilan seharusnya menunjukkan sekitar 0,95 eV.' },
        { q: 'Berapa frekuensi ambang emas (φ = 5,10 eV)? Apakah cahaya tampak (4 sampai 7,5 × 10¹⁴ Hz) cukup?', a: 'f₀ = φ/h = 5,10/(4,136 × 10⁻¹⁵) = 1,23 × 10¹⁵ Hz = 12,3 × 10¹⁴ Hz, yaitu ultraviolet. Tidak ada cahaya tampak yang bisa melontarkan elektron dari emas, seterang apa pun.' },
        { q: 'Di simulasi, atur frekuensi di bawah ambang dan naikkan intensitas ke maksimum. Jelaskan dengan konsep foton mengapa tidak terjadi apa-apa.', a: 'Intensitas lebih tinggi berarti lebih banyak foton per detik, tetapi tiap foton tetap berenergi hf, yang lebih kecil daripada φ. Elektron menyerap foton satu per satu, sehingga tidak ada satu penyerapan pun yang memberinya energi cukup untuk lepas. Banyak foton lemah tidak bisa dijumlahkan menjadi satu foton kuat.' },
      ],
    },
  },
};
