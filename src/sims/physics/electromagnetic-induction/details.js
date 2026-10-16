// Long-form text for the sim page aside, kept out of manifest.js.
export default {
  objectives: {
    en: [
      'Describe that a voltage (EMF) is induced in a coil only while the magnetic flux through it is changing, not when the magnet is at rest.',
      'State Faraday\'s law, EMF = −N·ΔΦ/Δt, and use it to predict how turns, magnet strength and speed change the peak voltage.',
      'Use Lenz\'s law to predict the direction of the induced current when the magnet enters, leaves or is flipped.',
    ],
    id: [
      'Menjelaskan bahwa tegangan (GGL) terinduksi dalam kumparan hanya ketika fluks magnet yang menembusnya berubah, bukan ketika magnet diam.',
      'Menyatakan hukum Faraday, GGL = −N·ΔΦ/Δt, dan menggunakannya untuk memprediksi pengaruh jumlah lilitan, kekuatan magnet dan kecepatan terhadap tegangan puncak.',
      'Menggunakan hukum Lenz untuk memprediksi arah arus induksi ketika magnet masuk, keluar atau dibalik.',
    ],
  },
  tryThis: {
    en: [
      'Drag the magnet slowly into the coil and stop in the middle. What does the needle do while you hold still?',
      'Turn on Auto-sweep at 0.3 m/s and note the peak EMF. Double the turns to 200: does the peak double?',
      'Keep 100 turns and double the speed instead. Compare the peak EMF and the width of the EMF pulse.',
      'Press Flip magnet and sweep again. Which way does the needle kick first now, and what happened to the flux graph?',
    ],
    id: [
      'Geser magnet perlahan ke dalam kumparan dan berhenti di tengah. Apa yang dilakukan jarum saat kamu diam?',
      'Nyalakan Sapuan otomatis pada 0,3 m/s dan catat GGL puncak. Gandakan lilitan menjadi 200: apakah puncaknya menjadi dua kali?',
      'Tetap 100 lilitan tetapi gandakan kecepatannya. Bandingkan GGL puncak dan lebar pulsa GGL.',
      'Tekan Balik magnet dan sapu lagi. Ke arah mana jarum menyimpang lebih dulu sekarang, dan apa yang terjadi pada grafik fluks?',
    ],
  },

  learn: {
    background: {
      en: [
        'In 1831 Michael Faraday discovered that moving a magnet near a coil of wire makes a current flow, with no battery anywhere. The key quantity is the magnetic flux Φ, which you can picture as the number of field lines passing through the coil: Φ = B·A for a field B perpendicular to a loop of area A, measured in webers (1 Wb = 1 T·m²). The flux is large when the magnet sits inside the coil and small when it is far away. The flux graph in the simulation is this bell-shaped curve traced out as the magnet moves.',
        'Faraday\'s law says the induced voltage, called the electromotive force or EMF, equals the rate of change of flux times the number of turns: EMF = −N·ΔΦ/Δt. A coil with 200 turns gives twice the EMF of a 100-turn coil for the same motion, because each turn is a little generator in series. Moving faster changes the flux in less time, so the EMF pulse becomes taller but narrower. A stronger magnet means more flux to change. When the magnet is stationary the flux is constant, ΔΦ = 0, and the EMF is zero no matter how strong the magnet is.',
        'The minus sign is Lenz\'s law: the induced current flows in the direction that opposes the change producing it. When the north pole approaches, the coil\'s own field makes its near face a north pole to push the magnet away; when the magnet leaves, the near face becomes a south pole to pull it back. That is why the needle kicks one way on entry and the opposite way on exit, and why the EMF graph has a positive lobe followed by a negative lobe (or the reverse when the magnet is flipped). Lenz\'s law is really energy conservation: the work you do against this opposing force is what becomes electrical energy.',
        'In the model the coil has an area of about 20 cm² (radius 2.5 cm) and the flux through one turn falls off with distance x from the coil centre as Φ₁ = B·A / (1 + (x/6 cm)²)^1.5, which is the shape of a bar magnet\'s field along its axis. The simulation calculates the EMF directly from this rule and the magnet\'s speed. For a 100-turn coil, a 0.2 T magnet and 0.5 m/s the peak EMF is about 0.3 V; a real school galvanometer would show this clearly.',
      ],
      id: [
        'Pada tahun 1831 Michael Faraday menemukan bahwa menggerakkan magnet di dekat kumparan kawat membuat arus mengalir, tanpa baterai sama sekali. Besaran kuncinya adalah fluks magnet Φ, yang dapat dibayangkan sebagai jumlah garis medan yang menembus kumparan: Φ = B·A untuk medan B yang tegak lurus pada lilitan berluas A, dalam satuan weber (1 Wb = 1 T·m²). Fluksnya besar ketika magnet berada di dalam kumparan dan kecil ketika jauh. Grafik fluks dalam simulasi adalah kurva berbentuk lonceng yang tergambar saat magnet bergerak.',
        'Hukum Faraday menyatakan tegangan induksi, disebut gaya gerak listrik atau GGL, sama dengan laju perubahan fluks dikalikan jumlah lilitan: GGL = −N·ΔΦ/Δt. Kumparan 200 lilitan memberi GGL dua kali kumparan 100 lilitan untuk gerakan yang sama, karena setiap lilitan adalah generator kecil yang tersusun seri. Bergerak lebih cepat mengubah fluks dalam waktu lebih singkat, sehingga pulsa GGL menjadi lebih tinggi tetapi lebih sempit. Magnet yang lebih kuat berarti lebih banyak fluks yang berubah. Ketika magnet diam, fluksnya tetap, ΔΦ = 0, dan GGL nol sekuat apa pun magnetnya.',
        'Tanda minus adalah hukum Lenz: arus induksi mengalir dalam arah yang melawan perubahan penyebabnya. Ketika kutub utara mendekat, medan kumparan sendiri membuat sisi dekatnya menjadi kutub utara untuk mendorong magnet menjauh; ketika magnet pergi, sisi dekat menjadi kutub selatan untuk menariknya kembali. Itulah sebabnya jarum menyimpang ke satu arah saat masuk dan ke arah berlawanan saat keluar, dan grafik GGL memiliki puncak positif lalu puncak negatif (atau sebaliknya jika magnet dibalik). Hukum Lenz sebenarnya adalah kekekalan energi: usaha yang kamu lakukan melawan gaya penolak inilah yang menjadi energi listrik.',
        'Dalam model ini kumparan berluas sekitar 20 cm² (jari-jari 2,5 cm) dan fluks yang menembus satu lilitan berkurang terhadap jarak x dari pusat kumparan sebagai Φ₁ = B·A / (1 + (x/6 cm)²)^1,5, yaitu bentuk medan magnet batang di sepanjang sumbunya. Simulasi menghitung GGL langsung dari aturan ini dan kecepatan magnet. Untuk kumparan 100 lilitan, magnet 0,2 T dan kecepatan 0,5 m/s, GGL puncaknya sekitar 0,3 V; galvanometer sekolah sungguhan akan menunjukkannya dengan jelas.',
      ],
    },
    figure: {
      caption: {
        en: 'Top: flux through the coil as the magnet passes, a bell curve peaking when the magnet is centred. Bottom: the induced EMF is minus the slope of the flux curve, so it is positive while flux rises, zero at the peak, and negative while flux falls. Faster motion gives a taller, narrower pulse.',
        id: 'Atas: fluks yang menembus kumparan saat magnet lewat, kurva lonceng yang memuncak ketika magnet di tengah. Bawah: GGL induksi adalah negatif dari kemiringan kurva fluks, sehingga positif saat fluks naik, nol di puncak, dan negatif saat fluks turun. Gerakan lebih cepat memberi pulsa lebih tinggi dan lebih sempit.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        // flux g(u) = (1+u^2)^-1.5, emf ~ -g'(u) = 3u(1+u^2)^-2.5, u from -3..3
        const pts = [];
        const emf = [];
        for (let i = 0; i <= 60; i++) {
          const u = -3 + (i / 60) * 6;
          const g = Math.pow(1 + u * u, -1.5);
          const e = 3 * u * Math.pow(1 + u * u, -2.5);
          const x = 40 + (i / 60) * 280;
          pts.push(`${x.toFixed(1)},${(100 - g * 70).toFixed(1)}`);
          emf.push(`${x.toFixed(1)},${(185 - e * 60 / 0.86).toFixed(1)}`);
        }
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Flux and induced EMF versus magnet position', 'Fluks dan GGL induksi terhadap posisi magnet')}">
  <style>text{font:10px system-ui,sans-serif;fill:currentColor}.ax{stroke:currentColor;stroke-width:1;opacity:.5;fill:none}</style>
  <path d="M40 100 L320 100 M40 30 L40 105" class="ax"/>
  <polyline points="${pts.join(' ')}" fill="none" stroke="#38bdf8" stroke-width="2"/>
  <text x="44" y="38" fill="#38bdf8">Φ ${L('(flux)', '(fluks)')}</text>
  <text x="180" y="112" text-anchor="middle">${L('magnet centred', 'magnet di tengah')}</text>
  <text x="300" y="112" text-anchor="end">x →</text>
  <path d="M40 185 L320 185 M40 125 L40 240" class="ax"/>
  <polyline points="${emf.join(' ')}" fill="none" stroke="#fbbf24" stroke-width="2"/>
  <text x="44" y="135" fill="#fbbf24">${L('EMF = −N·ΔΦ/Δt', 'GGL = −N·ΔΦ/Δt')}</text>
  <text x="120" y="150" fill="#fbbf24">${L('entering: +', 'masuk: +')}</text>
  <text x="200" y="232" fill="#fbbf24">${L('leaving: −', 'keluar: −')}</text>
  <line x1="180" y1="30" x2="180" y2="240" stroke="currentColor" stroke-dasharray="3 3" opacity=".4"/>
  <rect x="150" y="60" width="60" height="14" rx="3" fill="#ef4444" opacity=".8"/>
  <rect x="180" y="60" width="30" height="14" rx="3" fill="#3b82f6" opacity=".8"/>
  <text x="160" y="71" fill="#fff" font-weight="bold">S</text><text x="192" y="71" fill="#fff" font-weight="bold">N</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Magnetic flux Φ = B·A counts how much field passes through the coil; it peaks when the magnet is centred.',
        'EMF is induced only while the flux changes: EMF = −N·ΔΦ/Δt (Faraday\'s law). A stationary magnet gives zero.',
        'More turns, a stronger magnet or a faster movement all increase the peak EMF; doubling any one of them doubles it.',
        'Lenz\'s law: the induced current opposes the change, so the needle kicks opposite ways on entry and exit, and flipping the magnet flips both kicks.',
        'The area under the EMF pulse equals N times the total flux change, so a faster pass gives a taller but narrower pulse with the same area.',
      ],
      id: [
        'Fluks magnet Φ = B·A menghitung seberapa banyak medan menembus kumparan; puncaknya saat magnet di tengah.',
        'GGL terinduksi hanya saat fluks berubah: GGL = −N·ΔΦ/Δt (hukum Faraday). Magnet yang diam memberi nol.',
        'Lebih banyak lilitan, magnet lebih kuat atau gerakan lebih cepat semuanya memperbesar GGL puncak; menggandakan salah satunya menggandakan GGL.',
        'Hukum Lenz: arus induksi melawan perubahan, sehingga jarum menyimpang berlawanan arah saat masuk dan keluar, dan membalik magnet membalik kedua simpangan.',
        'Luas di bawah pulsa GGL sama dengan N kali perubahan fluks total, sehingga lintasan lebih cepat memberi pulsa lebih tinggi tetapi lebih sempit dengan luas yang sama.',
      ],
    },
    vocabulary: {
      en: [
        ['Magnetic flux (Φ)', 'The amount of magnetic field passing through a loop, Φ = B·A for a perpendicular field; unit weber (Wb).'],
        ['Electromotive force (EMF)', 'The voltage produced by a changing flux, measured in volts.'],
        ['Faraday\'s law', 'EMF = −N·ΔΦ/Δt: the induced voltage equals the number of turns times the rate of flux change.'],
        ['Lenz\'s law', 'The induced current flows so as to oppose the change in flux that caused it.'],
        ['Galvanometer', 'A sensitive meter whose needle deflects left or right in proportion to a small current.'],
        ['Turn', 'One complete loop of wire in a coil; N is the number of turns.'],
      ],
      id: [
        ['Fluks magnet (Φ)', 'Banyaknya medan magnet yang menembus sebuah lilitan, Φ = B·A untuk medan tegak lurus; satuannya weber (Wb).'],
        ['Gaya gerak listrik (GGL)', 'Tegangan yang dihasilkan oleh perubahan fluks, diukur dalam volt.'],
        ['Hukum Faraday', 'GGL = −N·ΔΦ/Δt: tegangan induksi sama dengan jumlah lilitan dikali laju perubahan fluks.'],
        ['Hukum Lenz', 'Arus induksi mengalir dalam arah yang melawan perubahan fluks penyebabnya.'],
        ['Galvanometer', 'Alat ukur peka yang jarumnya menyimpang ke kiri atau kanan sebanding dengan arus kecil.'],
        ['Lilitan', 'Satu putaran penuh kawat dalam kumparan; N adalah jumlah lilitan.'],
      ],
    },
    misconceptions: {
      en: [
        ['A strong magnet held inside a coil produces a current.', 'No. Only a changing flux induces EMF. A magnet at rest, however strong, gives zero; the needle returns to the centre as soon as you stop moving.'],
        ['The induced current always flows the same way.', 'It reverses when the flux change reverses: entering and leaving give opposite kicks, and so does flipping the magnet\'s poles.'],
        ['More turns make the flux bigger.', 'The flux through each turn is set by the magnet and the coil area. More turns multiply the EMF because each turn adds its own ΔΦ/Δt in series.'],
        ['Moving faster gives more total energy from one pass.', 'A faster pass gives a taller but shorter EMF pulse; the area under it (N·ΔΦ) is the same. The extra power comes from the shorter time, not from more flux.'],
      ],
      id: [
        ['Magnet kuat yang dipegang diam di dalam kumparan menghasilkan arus.', 'Tidak. Hanya fluks yang berubah yang menginduksi GGL. Magnet yang diam, sekuat apa pun, memberi nol; jarum kembali ke tengah begitu kamu berhenti bergerak.'],
        ['Arus induksi selalu mengalir ke arah yang sama.', 'Arus berbalik ketika perubahan fluks berbalik: masuk dan keluar memberi simpangan berlawanan, begitu juga membalik kutub magnet.'],
        ['Lebih banyak lilitan membuat fluksnya lebih besar.', 'Fluks tiap lilitan ditentukan oleh magnet dan luas kumparan. Lebih banyak lilitan melipatgandakan GGL karena tiap lilitan menambahkan ΔΦ/Δt-nya sendiri secara seri.'],
        ['Bergerak lebih cepat memberi lebih banyak energi total dari satu lintasan.', 'Lintasan lebih cepat memberi pulsa GGL lebih tinggi tetapi lebih singkat; luas di bawahnya (N·ΔΦ) sama. Daya ekstra berasal dari waktu yang lebih singkat, bukan dari fluks yang lebih banyak.'],
      ],
    },
    realWorld: {
      en: [
        'Power-station generators spin coils in magnetic fields (or magnets inside coils) to induce the alternating voltage that reaches every home.',
        'A bicycle dynamo lamp uses a small magnet turned by the wheel; pedal faster and the lamp gets brighter because the flux changes faster.',
        'Induction cooktops change the magnetic field thousands of times a second, inducing currents that heat the pan directly.',
        'Shake-to-charge torches move a magnet through a coil, exactly like this simulation, to charge a capacitor.',
        'Metal detectors and the magnetic strip readers on card machines sense the tiny EMFs induced by moving or changing fields.',
      ],
      id: [
        'Generator pembangkit listrik memutar kumparan dalam medan magnet (atau magnet di dalam kumparan) untuk menginduksi tegangan bolak-balik yang sampai ke setiap rumah.',
        'Lampu dinamo sepeda memakai magnet kecil yang diputar roda; kayuh lebih cepat maka lampu lebih terang karena fluks berubah lebih cepat.',
        'Kompor induksi mengubah medan magnet ribuan kali per detik, menginduksi arus yang memanaskan panci secara langsung.',
        'Senter kocok memindahkan magnet melewati kumparan, persis seperti simulasi ini, untuk mengisi kapasitor.',
        'Detektor logam dan pembaca pita magnetik pada mesin kartu merasakan GGL kecil yang diinduksi oleh medan yang bergerak atau berubah.',
      ],
    },
    questions: {
      en: [
        { q: 'A 100-turn coil gives a peak EMF of 0.30 V when a magnet passes at 0.5 m/s. Predict the peak for 300 turns at 1.0 m/s.', a: 'Tripling the turns triples the EMF and doubling the speed doubles it: 0.30 × 3 × 2 = 1.8 V.' },
        { q: 'The flux through a coil changes by 0.04 Wb in 0.2 s. What is the EMF in a 50-turn coil?', a: 'EMF = N·ΔΦ/Δt = 50 × 0.04 / 0.2 = 10 V (in magnitude).' },
        { q: 'The magnet enters the coil north pole first and the needle kicks right. What happens if the magnet is pulled back out, and if it is flipped and pushed in south pole first?', a: 'Pulling it out reverses the flux change, so the needle kicks left. Pushing it in south-first reverses the sign of the flux, so the needle kicks left on entry and right on exit.' },
      ],
      id: [
        { q: 'Kumparan 100 lilitan memberi GGL puncak 0,30 V ketika magnet lewat dengan kecepatan 0,5 m/s. Prediksi puncaknya untuk 300 lilitan pada 1,0 m/s.', a: 'Melipattigakan lilitan melipattigakan GGL dan menggandakan kecepatan menggandakannya: 0,30 × 3 × 2 = 1,8 V.' },
        { q: 'Fluks yang menembus kumparan berubah 0,04 Wb dalam 0,2 s. Berapa GGL pada kumparan 50 lilitan?', a: 'GGL = N·ΔΦ/Δt = 50 × 0,04 / 0,2 = 10 V (besarnya).' },
        { q: 'Magnet masuk kumparan dengan kutub utara di depan dan jarum menyimpang ke kanan. Apa yang terjadi jika magnet ditarik keluar lagi, dan jika magnet dibalik lalu didorong masuk dengan kutub selatan di depan?', a: 'Menariknya keluar membalik perubahan fluks, sehingga jarum menyimpang ke kiri. Mendorongnya masuk dengan kutub selatan di depan membalik tanda fluks, sehingga jarum menyimpang ke kiri saat masuk dan ke kanan saat keluar.' },
      ],
    },
  },
};
