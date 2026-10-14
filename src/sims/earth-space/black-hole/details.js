// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'See light bending — gravitational lensing.',
      'Recognize an Einstein ring when source, lens, and observer line up.',
      'Predict that a more massive black hole bends light more.',
    ],
    id: [
      'Melihat pembelokan cahaya — lensa gravitasi.',
      'Mengenali cincin Einstein saat sumber, lensa, dan pengamat segaris.',
      'Memprediksi bahwa lubang hitam lebih masif membelokkan cahaya lebih banyak.',
    ],
  },  tryThis: {
    en: [
      'Drag the star directly behind the black hole — see the ring.',
      'Increase mass — does the ring expand?',
      'Pass at an offset — see the asymmetric two-image lensing.',
    ],
    id: [
      'Seret bintang tepat di belakang lubang hitam — lihat cincinnya.',
      'Naikkan massa — apakah cincin membesar?',
      'Lewatkan dengan offset — amati dua bayangan tak simetris.',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'In general relativity mass curves spacetime, and light follows the curves. A light ray passing a mass M at closest distance b (the impact parameter) is bent through an angle α = 4GM/(c²b), twice what Newtonian gravity would give for a particle moving at c. The bending is largest for rays that pass closest, and it was first confirmed in 1919 when starlight grazing the Sun was found to shift by 1.75 arcseconds. Any mass does this: a star, a galaxy or a cluster of galaxies all act as gravitational lenses. A black hole is simply the most compact mass there is, so rays can pass very close to it and bend by large angles.',
        'The sim is a thin-lens model: the black hole sits at the centre, you are the observer, and the source star is far behind at angular offset β from the black hole (the dim grey dot you drag). Working out which rays reach your eye gives the lens equation β = θ − θE²/θ, whose two solutions θ± = (β ± √(β² + 4θE²))/2 are the two images (the yellow dots). One image lies outside the Einstein radius θE on the same side as the source, the other inside θE on the opposite side. The Einstein radius depends on the lens mass and the distances: θE = √(4GM/c² · D_LS/(D_L D_S)). When the source sits exactly behind the lens, β = 0, every direction around the lens is equivalent and the two images merge into a ring of radius θE: the Einstein ring.',
        'The mass slider sets both the black disc (the event horizon, which grows in proportion to the mass) and the Einstein radius (which grows with the square root of the mass); the starfield toggle shows background stars pushed outward from the black hole by a deflection that falls off as 1 over distance, the same 1/b law as α. Dot size hints at relative brightness: lensing preserves surface brightness, so a stretched image is a brighter image, and the closer the source gets to the axis the more the total light is amplified. The sim uses a simple proxy for this; the exact magnifications are μ± = 1/(1 − (θE/θ±)⁴).',
        'The thin-lens picture is excellent for a distant star far behind a black hole, but it is still a simplification. The horizon radius r_s = 2GM/c² scales with M while θE scales with √M, and the sim follows both laws: doubling the mass slider doubles the black disc but enlarges the ring only by √2 ≈ 1.41, so a very heavy lens has a ring that is relatively close to its horizon. The model also leaves out strong-field effects close to the horizon: the photon sphere at 1.5 r_s, the dark shadow of radius about 2.6 r_s photographed by the Event Horizon Telescope, and the infinite sequence of ever-fainter higher-order images. The glowing disc is decoration, and the source is kept at a fixed distance.',
      ],
      id: [
        'Dalam relativitas umum, massa melengkungkan ruang-waktu, dan cahaya mengikuti lengkungan itu. Seberkas cahaya yang melewati massa M pada jarak terdekat b (parameter tumbukan) dibelokkan sebesar sudut α = 4GM/(c²b), dua kali lipat prediksi gravitasi Newton untuk partikel yang bergerak dengan laju c. Pembelokan paling besar terjadi pada berkas yang lewat paling dekat, dan ini pertama kali dibuktikan pada 1919 ketika cahaya bintang yang menyerempet Matahari terukur bergeser 1,75 detik busur. Setiap massa melakukannya: bintang, galaksi, atau gugus galaksi semuanya bertindak sebagai lensa gravitasi. Lubang hitam hanyalah massa paling mampat yang ada, sehingga berkas cahaya bisa lewat sangat dekat dan membelok dengan sudut besar.',
        'Sim ini adalah model lensa tipis: lubang hitam berada di tengah, kamu adalah pengamat, dan bintang sumber berada jauh di belakang pada offset sudut β dari lubang hitam (titik abu-abu redup yang kamu seret). Menelusuri berkas mana yang sampai ke matamu menghasilkan persamaan lensa β = θ − θE²/θ, yang dua solusinya θ± = (β ± √(β² + 4θE²))/2 adalah dua bayangan (titik kuning). Satu bayangan berada di luar jari-jari Einstein θE pada sisi yang sama dengan sumber, yang lain di dalam θE pada sisi berlawanan. Jari-jari Einstein bergantung pada massa lensa dan jarak-jaraknya: θE = √(4GM/c² · D_LS/(D_L D_S)). Ketika sumber tepat di belakang lensa, β = 0, semua arah di sekeliling lensa setara dan kedua bayangan melebur menjadi cincin berjari-jari θE: cincin Einstein.',
        'Slider massa mengatur cakram hitam (horizon peristiwa, yang membesar sebanding dengan massa) sekaligus jari-jari Einstein (yang membesar sebanding akar kuadrat massa); tombol medan bintang menampilkan bintang latar yang terdorong menjauh dari lubang hitam oleh pembelokan yang mengecil sebanding dengan 1 per jarak, hukum 1/b yang sama dengan α. Ukuran titik menggambarkan kecerlangan relatif: pelensaan mempertahankan kecerlangan permukaan, sehingga bayangan yang teregang adalah bayangan yang lebih terang, dan makin dekat sumber ke sumbu makin besar total cahaya yang diperkuat. Sim memakai pendekatan sederhana untuk ini; perbesaran yang tepat adalah μ± = 1/(1 − (θE/θ±)⁴).',
        'Gambaran lensa tipis sangat baik untuk bintang jauh di belakang lubang hitam, tetapi tetap merupakan penyederhanaan. Jari-jari horizon r_s = 2GM/c² sebanding dengan M sedangkan θE sebanding dengan √M, dan sim mengikuti kedua hukum itu: menggandakan slider massa menggandakan cakram hitam tetapi hanya membesarkan cincin √2 ≈ 1,41 kali, sehingga lensa yang sangat berat memiliki cincin yang relatif dekat dengan horizonnya. Model ini juga mengabaikan efek medan kuat di dekat horizon: bola foton pada 1,5 r_s, bayangan gelap berjari-jari sekitar 2,6 r_s yang dipotret Event Horizon Telescope, dan deretan tak berhingga bayangan orde tinggi yang makin redup. Cakram bercahaya hanyalah hiasan, dan sumber dijaga pada jarak tetap.',
      ],
    },
    figure: {
      caption: {
        en: 'Side view of a point-mass lens. Two rays from the source reach the observer, one over and one under the lens, and the observer sees them as two images: one outside the Einstein radius θE on the source\'s side, one inside θE on the far side. The ray passing closer bends more.',
        id: 'Tampak samping lensa massa titik. Dua berkas dari sumber mencapai pengamat, satu lewat atas dan satu lewat bawah lensa, dan pengamat melihatnya sebagai dua bayangan: satu di luar jari-jari Einstein θE pada sisi sumber, satu di dalam θE pada sisi seberang. Berkas yang lewat lebih dekat membelok lebih tajam.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Ray paths in gravitational lensing', 'Lintasan cahaya pada pelensaan gravitasi')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.m{fill:none;stroke:currentColor;stroke-width:1.2;opacity:.45}.f{stroke-width:2;fill:none}.s{font-size:9.5px;opacity:.8}.r{text-anchor:end}</style>
  <line x1="28" y1="130" x2="340" y2="130" class="m" stroke-dasharray="2 4"/>
  <line x1="180" y1="60" x2="180" y2="196" class="m" stroke-dasharray="4 4"/>
  <text x="184" y="196" class="s">${L('lens plane', 'bidang lensa')}</text>
  <line x1="28" y1="130" x2="330" y2="112" class="m" stroke-dasharray="3 3"/>
  <line x1="28" y1="130" x2="330" y2="27" stroke="#f59e0b" stroke-width="1.2" stroke-dasharray="3 3" opacity=".7"/>
  <line x1="28" y1="130" x2="330" y2="210" stroke="#f59e0b" stroke-width="1.2" stroke-dasharray="3 3" opacity=".7"/>
  <path d="M330 112 L180 78 L28 130" class="f" stroke="#f59e0b" marker-end="url(#a)"/>
  <path d="M330 112 L180 170 L28 130" class="f" stroke="#f59e0b" marker-end="url(#a)"/>
  <circle cx="180" cy="130" r="10" fill="currentColor"/>
  <circle cx="180" cy="130" r="14" class="m"/>
  <line x1="180" y1="130" x2="180" y2="78" stroke="#8b5cf6" stroke-width="1.5"/>
  <text x="184" y="106" fill="#8b5cf6">b</text>
  <line x1="172" y1="176" x2="188" y2="176" stroke="#10b981" stroke-width="2"/>
  <line x1="172" y1="84" x2="188" y2="84" stroke="#10b981" stroke-width="2"/>
  <text x="192" y="180" fill="#10b981" class="s">θE</text>
  <circle cx="28" cy="130" r="4" fill="#3b82f6"/>
  <text x="10" y="150" fill="#3b82f6">${L('observer', 'pengamat')}</text>
  <circle cx="330" cy="112" r="5" fill="currentColor" opacity=".5"/>
  <text x="322" y="100" class="r s">${L('source, true position (angle β)', 'sumber, posisi sebenarnya (sudut β)')}</text>
  <circle cx="330" cy="27" r="6" fill="#f59e0b"/>
  <text x="320" y="22" class="r">${L('image 1: outside θE (angle θ+)', 'bayangan 1: di luar θE (sudut θ+)')}</text>
  <circle cx="330" cy="210" r="4" fill="#f59e0b"/>
  <text x="320" y="226" class="r">${L('image 2: inside θE, opposite side (θ−)', 'bayangan 2: di dalam θE, sisi seberang (θ−)')}</text>
  <text x="150" y="200" class="r">${L('lens, mass M', 'lensa, massa M')}</text>
  <text x="60" y="66" class="s">${L('deflection α = 4GM/(c²b): closer ray (smaller b) bends more', 'pembelokan α = 4GM/(c²b): berkas lebih dekat (b lebih kecil) membelok lebih tajam')}</text>
  <defs><marker id="a" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="context-stroke"/></marker></defs>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Light follows curved spacetime; a ray passing a mass M at distance b is deflected by α = 4GM/(c²b), so closer rays bend more.',
        'A point-mass lens produces two images of an off-axis source: one outside the Einstein radius on the source\'s side, one inside it on the opposite side.',
        'When source, lens and observer line up exactly, symmetry turns the two images into an Einstein ring of angular radius θE.',
        'θE grows with the square root of the lens mass, while the horizon grows in proportion to it, and lensing brightens the source because surface brightness is conserved while the images are enlarged.',
        'Every mass is a lens, not just black holes; galaxies and clusters produce arcs, rings and multiple quasar images.',
      ],
      id: [
        'Cahaya mengikuti ruang-waktu yang melengkung; berkas yang melewati massa M pada jarak b dibelokkan sebesar α = 4GM/(c²b), sehingga berkas yang lebih dekat membelok lebih tajam.',
        'Lensa massa titik menghasilkan dua bayangan dari sumber yang tidak segaris: satu di luar jari-jari Einstein pada sisi sumber, satu di dalamnya pada sisi berlawanan.',
        'Ketika sumber, lensa, dan pengamat tepat segaris, simetri mengubah kedua bayangan menjadi cincin Einstein berjari-jari sudut θE.',
        'θE bertambah sebanding akar kuadrat massa lensa, sedangkan horizon bertambah sebanding dengan massa, dan pelensaan membuat sumber tampak lebih terang karena kecerlangan permukaan dipertahankan sementara bayangan diperbesar.',
        'Setiap massa adalah lensa, bukan hanya lubang hitam; galaksi dan gugus galaksi menghasilkan busur, cincin, dan bayangan ganda kuasar.',
      ],
    },
    vocabulary: {
      en: [
        ['Gravitational lensing', 'The bending of light by the curved spacetime around a mass, which distorts, multiplies and brightens the images of background sources.'],
        ['Impact parameter (b)', 'The closest distance a light ray would pass from the lens if it travelled in a straight line.'],
        ['Einstein radius (θE)', 'The angular radius of the ring formed when a source is exactly behind a point lens; it sets the scale of all lensing effects.'],
        ['Einstein ring', 'The ring-shaped image produced when source, lens and observer are perfectly aligned.'],
        ['Lens equation', 'β = θ − α(θ): the true source direction equals the image direction minus the scaled deflection.'],
        ['Magnification', 'The ratio of an image\'s brightness to the unlensed brightness of the source; surface brightness is conserved, so bigger images are brighter.'],
        ['Event horizon', 'The surface of radius r_s = 2GM/c² around a black hole from inside which nothing, not even light, can escape.'],
        ['Thin-lens approximation', 'Treating all the bending as happening in one plane at the lens, valid when the lens is small compared with the distances involved.'],
      ],
      id: [
        ['Pelensaan gravitasi', 'Pembelokan cahaya oleh ruang-waktu yang melengkung di sekitar massa, yang mendistorsi, menggandakan, dan mencerahkan bayangan sumber di latar belakang.'],
        ['Parameter tumbukan (b)', 'Jarak terdekat yang akan dilewati berkas cahaya dari lensa jika berkas itu bergerak lurus.'],
        ['Jari-jari Einstein (θE)', 'Jari-jari sudut cincin yang terbentuk ketika sumber tepat di belakang lensa titik; menjadi skala bagi semua efek pelensaan.'],
        ['Cincin Einstein', 'Bayangan berbentuk cincin yang muncul ketika sumber, lensa, dan pengamat tepat segaris.'],
        ['Persamaan lensa', 'β = θ − α(θ): arah sumber sebenarnya sama dengan arah bayangan dikurangi pembelokan yang telah diskalakan.'],
        ['Perbesaran', 'Perbandingan kecerlangan bayangan dengan kecerlangan sumber tanpa lensa; kecerlangan permukaan dipertahankan, sehingga bayangan yang lebih besar lebih terang.'],
        ['Horizon peristiwa', 'Permukaan berjari-jari r_s = 2GM/c² di sekitar lubang hitam yang dari dalamnya tidak ada apa pun, termasuk cahaya, yang bisa lolos.'],
        ['Pendekatan lensa tipis', 'Menganggap semua pembelokan terjadi pada satu bidang di lensa, sah ketika lensa kecil dibandingkan jarak-jarak yang terlibat.'],
      ],
    },
    misconceptions: {
      en: [
        ['A black hole sucks in any light that comes near it.', 'Only rays with impact parameter below about 2.6 r_s are captured. Everything passing farther out is merely deflected, and the deflection shrinks as 1/b, so a black hole far away acts like any other mass of the same size.'],
        ['Lensing spreads the light out, so the source looks dimmer.', 'Gravitational lensing conserves surface brightness while enlarging the images, so the total light received increases. Microlensing surveys use exactly this brightening to detect planets around distant stars.'],
        ['Only exotic objects like black holes bend light.', 'All mass does. The Sun bends grazing starlight by 1.75 arcseconds, and galaxy clusters produce the giant arcs seen in deep-space images.'],
        ['An Einstein ring means the source itself is ring-shaped.', 'The source is an ordinary compact object. The ring is the lensed image of a point-like source that happens to sit exactly behind the lens.'],
      ],
      id: [
        ['Lubang hitam menyedot semua cahaya yang mendekatinya.', 'Hanya berkas dengan parameter tumbukan di bawah sekitar 2,6 r_s yang tertangkap. Semua yang lewat lebih jauh hanya dibelokkan, dan pembelokannya mengecil sebagai 1/b, sehingga lubang hitam yang jauh berperilaku seperti massa lain yang sama besarnya.'],
        ['Pelensaan menyebarkan cahaya, sehingga sumber tampak lebih redup.', 'Pelensaan gravitasi mempertahankan kecerlangan permukaan sambil memperbesar bayangan, sehingga total cahaya yang diterima bertambah. Survei pelensaan mikro memakai pencerahan ini untuk mendeteksi planet di sekitar bintang jauh.'],
        ['Hanya objek eksotis seperti lubang hitam yang membelokkan cahaya.', 'Semua massa melakukannya. Matahari membelokkan cahaya bintang yang menyerempetnya sebesar 1,75 detik busur, dan gugus galaksi menghasilkan busur raksasa yang terlihat pada citra ruang angkasa dalam.'],
        ['Cincin Einstein berarti sumbernya sendiri berbentuk cincin.', 'Sumbernya adalah objek mampat biasa. Cincin itu adalah bayangan terlensa dari sumber mirip titik yang kebetulan tepat berada di belakang lensa.'],
      ],
    },
    realWorld: {
      en: [
        'The 1919 solar eclipse expeditions measured starlight bent by the Sun by 1.75 arcseconds, the first confirmation of general relativity\'s prediction.',
        'The Einstein Cross (Q2237+0305) shows a single distant quasar as four images arranged around a foreground galaxy.',
        'Microlensing surveys watch millions of stars for the brief brightening caused by a passing star, and the small extra blips reveal planets orbiting the lensing star.',
        'The Event Horizon Telescope\'s 2019 image of M87* shows a bright ring around a dark shadow; the ring\'s size is set by light bending in the strong field close to the horizon.',
      ],
      id: [
        'Ekspedisi gerhana Matahari 1919 mengukur cahaya bintang yang dibelokkan Matahari sebesar 1,75 detik busur, bukti pertama bagi prediksi relativitas umum.',
        'Salib Einstein (Q2237+0305) menampilkan satu kuasar jauh sebagai empat bayangan yang tersusun mengitari galaksi di depannya.',
        'Survei pelensaan mikro mengawasi jutaan bintang untuk menangkap pencerahan singkat akibat bintang yang lewat, dan kedipan kecil tambahan di dalamnya mengungkap planet yang mengorbit bintang pelensa.',
        'Citra M87* dari Event Horizon Telescope tahun 2019 menampilkan cincin terang mengitari bayangan gelap; ukuran cincin ditentukan oleh pembelokan cahaya di medan kuat dekat horizon.',
      ],
    },
    questions: {
      en: [
        { q: 'The source is placed at β = θE. Where do the two images appear?', a: 'From θ± = (β ± √(β² + 4θE²))/2 with β = θE: θ+ = (1 + √5)/2 · θE ≈ 1.62 θE on the source\'s side, and θ− = (1 − √5)/2 · θE ≈ −0.62 θE, i.e. 0.62 θE on the opposite side, inside the Einstein radius.' },
        { q: 'Double the mass slider from 80 to 160 and compare the black disc with the Einstein ring. Which grows more, and why?', a: 'The horizon radius r_s = 2GM/c² doubles, from 40 to 80 units. But θE depends on √M, so the ring grows only by √2 ≈ 1.41 times, from 120 to about 170 units. The sim follows both laws, so the ring ends up relatively closer to the horizon for heavier lenses.' },
        { q: 'Why do the two images turn into a complete ring when the source is exactly behind the lens?', a: 'With β = 0 there is no preferred direction: the lens equation gives θ = ±θE in every plane through the axis, so the image lies at angular distance θE in all directions at once. Any slight offset breaks the symmetry and the ring splits back into two arcs, then two points.' },
      ],
      id: [
        { q: 'Sumber ditempatkan pada β = θE. Di mana kedua bayangan muncul?', a: 'Dari θ± = (β ± √(β² + 4θE²))/2 dengan β = θE: θ+ = (1 + √5)/2 · θE ≈ 1,62 θE pada sisi sumber, dan θ− = (1 − √5)/2 · θE ≈ −0,62 θE, yaitu 0,62 θE pada sisi berlawanan, di dalam jari-jari Einstein.' },
        { q: 'Gandakan slider massa dari 80 ke 160 dan bandingkan cakram hitam dengan cincin Einstein. Mana yang lebih membesar, dan mengapa?', a: 'Jari-jari horizon r_s = 2GM/c² menjadi dua kali lipat, dari 40 ke 80 satuan. Tetapi θE bergantung pada √M, sehingga cincin hanya membesar √2 ≈ 1,41 kali, dari 120 ke sekitar 170 satuan. Sim mengikuti kedua hukum itu, sehingga cincin menjadi relatif lebih dekat ke horizon untuk lensa yang lebih berat.' },
        { q: 'Mengapa kedua bayangan berubah menjadi cincin utuh ketika sumber tepat di belakang lensa?', a: 'Dengan β = 0 tidak ada arah yang istimewa: persamaan lensa memberi θ = ±θE pada setiap bidang yang melalui sumbu, sehingga bayangan berada pada jarak sudut θE ke semua arah sekaligus. Pergeseran sedikit saja memecah simetri itu dan cincin kembali terpisah menjadi dua busur, lalu dua titik.' },
      ],
    },
  },
};
