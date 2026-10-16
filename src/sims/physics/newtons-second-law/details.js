// Long-form text for the sim page aside, kept out of manifest.js.
export default {
  objectives: {
    en: [
      'State Newton\'s second law as a = F_net / m (or F_net = m·a) and use it with units N, kg and m/s².',
      'Read acceleration from a ticker tape (growing dot spacing) and from the slope of a velocity–time graph.',
      'Explain how friction reduces the net force, and why a cart may not move at all when the push is too small.',
    ],
    id: [
      'Menyatakan hukum II Newton sebagai a = F_net / m (atau F_net = m·a) dan memakainya dengan satuan N, kg dan m/s².',
      'Membaca percepatan dari pita ketik (jarak titik yang membesar) dan dari kemiringan grafik kecepatan–waktu.',
      'Menjelaskan bagaimana gesekan mengurangi gaya total, dan mengapa kereta bisa tidak bergerak sama sekali jika dorongan terlalu kecil.',
    ],
  },
  tryThis: {
    en: [
      'Friction off, m = 2 kg. Run with F = 10 N, then F = 20 N. Compare the dot spacing on the ticker tape.',
      'Keep F = 20 N and raise the mass to 8 kg. How much flatter is the v–t line?',
      'Turn friction on, set m = 5 kg and F = 8 N. Watch the arrows: why is F_net zero? Then raise F slowly.',
      'Press Pause halfway through a run and read v and t. Does v ÷ t equal the acceleration in the formula box?',
    ],
    id: [
      'Gesekan mati, m = 2 kg. Jalankan dengan F = 10 N, lalu F = 20 N. Bandingkan jarak titik pada pita ketik.',
      'Tahan F = 20 N dan naikkan massa ke 8 kg. Seberapa lebih landai garis v–t?',
      'Nyalakan gesekan, atur m = 5 kg dan F = 8 N. Perhatikan panahnya: mengapa F_net nol? Lalu naikkan F perlahan.',
      'Tekan Jeda di tengah jalan dan baca v dan t. Apakah v ÷ t sama dengan percepatan di kotak rumus?',
    ],
  },

  learn: {
    background: {
      en: [
        'A force is a push or a pull, measured in newtons (N). Forces change motion: a net force makes an object speed up, slow down or change direction. Acceleration is the rate at which velocity changes, a = Δv / Δt, measured in metres per second per second (m/s²). An acceleration of 2 m/s² means the speed grows by 2 m/s every second.',
        'Newton\'s second law links the two: the acceleration of an object is proportional to the net force on it and inversely proportional to its mass, a = F_net / m, often written F_net = m·a. Doubling the push doubles the acceleration; doubling the mass halves it. The sim\'s cart obeys exactly this rule, and the formula box shows the numbers: with F_net = 10 N and m = 2 kg, a = 5 m/s².',
        'The net force is the sum of all forces. Friction acts backwards along the track, so F_net = F − f. In the sim friction is modelled as f = μ·m·g with μ = 0.2: a 5 kg cart feels f = 0.2 × 5 × 9.8 = 9.8 N. If the push is smaller than that, static friction simply matches it and the cart stays still with F_net = 0. Once the push exceeds f, the leftover force accelerates the cart.',
        'Two tools let you measure acceleration like a physicist. The ticker tape prints a dot every 0.1 s; equal spacing means constant speed, growing spacing means acceleration, and the speed in any interval is Δx / 0.1 s. The velocity–time graph plots the speed at each tick; for constant acceleration it is a straight line whose slope Δv / Δt is the acceleration. Compare the measured slope with F_net / m: they should agree.',
      ],
      id: [
        'Gaya adalah dorongan atau tarikan, diukur dalam newton (N). Gaya mengubah gerak: gaya total membuat benda bertambah cepat, melambat atau berubah arah. Percepatan adalah laju perubahan kecepatan, a = Δv / Δt, diukur dalam meter per sekon per sekon (m/s²). Percepatan 2 m/s² berarti kelajuan bertambah 2 m/s tiap sekon.',
        'Hukum II Newton menghubungkan keduanya: percepatan benda sebanding dengan gaya total yang bekerja padanya dan berbanding terbalik dengan massanya, a = F_net / m, sering ditulis F_net = m·a. Menggandakan dorongan menggandakan percepatan; menggandakan massa membagi dua percepatan. Kereta di simulasi mengikuti aturan ini dengan tepat, dan kotak rumus menampilkan angkanya: dengan F_net = 10 N dan m = 2 kg, a = 5 m/s².',
        'Gaya total adalah jumlah semua gaya. Gesekan bekerja ke belakang sepanjang lintasan, sehingga F_net = F − f. Di simulasi gesekan dimodelkan sebagai f = μ·m·g dengan μ = 0,2: kereta 5 kg merasakan f = 0,2 × 5 × 9,8 = 9,8 N. Jika dorongan lebih kecil dari itu, gesekan statis mengimbanginya dan kereta tetap diam dengan F_net = 0. Begitu dorongan melebihi f, sisa gayanya mempercepat kereta.',
        'Dua alat memungkinkanmu mengukur percepatan seperti fisikawan. Pita ketik mencetak titik tiap 0,1 s; jarak yang sama berarti kelajuan tetap, jarak yang membesar berarti percepatan, dan kelajuan pada tiap selang adalah Δx / 0,1 s. Grafik kecepatan–waktu memplot kelajuan di tiap ketikan; untuk percepatan tetap grafiknya garis lurus dengan kemiringan Δv / Δt sama dengan percepatan. Bandingkan kemiringan terukur dengan F_net / m: keduanya seharusnya sama.',
      ],
    },
    figure: {
      caption: {
        en: 'Left: the forces on the cart; the applied force F forward and friction f backward give F_net = F − f, and a = F_net / m. Right: velocity–time graphs for the same force on a 2 kg cart (steep) and a 4 kg cart (half the slope); the slope Δv/Δt is the acceleration.',
        id: 'Kiri: gaya pada kereta; gaya dorong F ke depan dan gesekan f ke belakang memberi F_net = F − f, dan a = F_net / m. Kanan: grafik kecepatan–waktu untuk gaya yang sama pada kereta 2 kg (curam) dan 4 kg (setengah kemiringan); kemiringan Δv/Δt adalah percepatan.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Forces on a cart and velocity-time graphs', 'Gaya pada kereta dan grafik kecepatan-waktu')}">
  <style>text{font:10px system-ui,sans-serif;fill:currentColor}.k{font:11px ui-monospace,monospace;fill:currentColor}</style>
  <defs>
    <marker id="g" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto"><path d="M0 0 L7 3.5 L0 7 z" fill="#22c55e"/></marker>
    <marker id="o" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto"><path d="M0 0 L7 3.5 L0 7 z" fill="#f97316"/></marker>
    <marker id="y" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto"><path d="M0 0 L7 3.5 L0 7 z" fill="#fbbf24"/></marker>
  </defs>
  <line x1="10" y1="110" x2="170" y2="110" stroke="currentColor" stroke-width="2"/>
  <rect x="60" y="70" width="60" height="32" rx="5" fill="#3b82f6"/>
  <circle cx="75" cy="106" r="5" fill="#1e3a8a"/><circle cx="105" cy="106" r="5" fill="#1e3a8a"/>
  <text x="90" y="91" text-anchor="middle" fill="#fff">m</text>
  <line x1="120" y1="86" x2="166" y2="86" stroke="#22c55e" stroke-width="3" marker-end="url(#g)"/>
  <text x="128" y="78" fill="#22c55e">F</text>
  <line x1="60" y1="86" x2="38" y2="86" stroke="#f97316" stroke-width="3" marker-end="url(#o)"/>
  <text x="34" y="78" fill="#f97316">f</text>
  <line x1="90" y1="56" x2="124" y2="56" stroke="#fbbf24" stroke-width="2.5" marker-end="url(#y)"/>
  <text x="90" y="48" fill="#fbbf24">F_net = F − f</text>
  <text x="10" y="136" class="k">a = F_net / m</text>
  <text x="10" y="152" class="k">${L('e.g. 10 N / 2 kg = 5 m/s²', 'mis. 10 N / 2 kg = 5 m/s²')}</text>
  <text x="10" y="176">${L('ticker tape, a dot every 0.1 s:', 'pita ketik, satu titik tiap 0,1 s:')}</text>
  <line x1="10" y1="192" x2="170" y2="192" stroke="currentColor" opacity=".4"/>
  <circle cx="12" cy="192" r="2.5" fill="currentColor"/><circle cx="16" cy="192" r="2.5" fill="currentColor"/><circle cx="24" cy="192" r="2.5" fill="currentColor"/><circle cx="36" cy="192" r="2.5" fill="currentColor"/><circle cx="52" cy="192" r="2.5" fill="currentColor"/><circle cx="72" cy="192" r="2.5" fill="currentColor"/><circle cx="96" cy="192" r="2.5" fill="currentColor"/><circle cx="124" cy="192" r="2.5" fill="currentColor"/><circle cx="156" cy="192" r="2.5" fill="currentColor"/>
  <text x="10" y="212">${L('spacing grows: the cart accelerates', 'jarak membesar: kereta dipercepat')}</text>
  <line x1="210" y1="200" x2="350" y2="200" stroke="currentColor" stroke-width="1.2"/>
  <line x1="210" y1="200" x2="210" y2="40" stroke="currentColor" stroke-width="1.2"/>
  <text x="342" y="214">t (s)</text>
  <text x="196" y="36">v</text>
  <line x1="210" y1="200" x2="340" y2="50" stroke="#38bdf8" stroke-width="2.5"/>
  <line x1="210" y1="200" x2="340" y2="125" stroke="#a78bfa" stroke-width="2.5"/>
  <text x="300" y="60" fill="#38bdf8">m = 2 kg</text>
  <text x="300" y="150" fill="#a78bfa">m = 4 kg</text>
  <path d="M250 154 L290 154 L290 108" fill="none" stroke="#fbbf24" stroke-width="1.5"/>
  <text x="258" y="166" fill="#fbbf24">Δt</text>
  <text x="294" y="134" fill="#fbbf24">Δv</text>
  <text x="214" y="226" class="k">${L('slope Δv/Δt = a', 'kemiringan Δv/Δt = a')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Newton\'s second law: a = F_net / m, so F_net = m·a. Units: N = kg·m/s².',
        'Doubling the net force doubles the acceleration; doubling the mass halves it.',
        'Only the net force counts: F_net = F − f when friction f acts backwards.',
        'If the push is smaller than the maximum friction, the object does not move: F_net = 0 and a = 0.',
        'On a ticker tape, equal dot spacing means constant velocity; growing spacing means acceleration.',
        'On a velocity–time graph the slope Δv/Δt is the acceleration; a straight line means constant acceleration.',
      ],
      id: [
        'Hukum II Newton: a = F_net / m, sehingga F_net = m·a. Satuan: N = kg·m/s².',
        'Menggandakan gaya total menggandakan percepatan; menggandakan massa membagi dua percepatan.',
        'Hanya gaya total yang berpengaruh: F_net = F − f ketika gesekan f bekerja ke belakang.',
        'Jika dorongan lebih kecil daripada gesekan maksimum, benda tidak bergerak: F_net = 0 dan a = 0.',
        'Pada pita ketik, jarak titik yang sama berarti kecepatan tetap; jarak yang membesar berarti percepatan.',
        'Pada grafik kecepatan–waktu kemiringan Δv/Δt adalah percepatan; garis lurus berarti percepatan tetap.',
      ],
    },
    vocabulary: {
      en: [
        ['Force (F)', 'A push or pull on an object, measured in newtons (N).'],
        ['Net force (F_net)', 'The combined effect of all forces on an object, taking direction into account.'],
        ['Mass (m)', 'The amount of matter in an object and a measure of its inertia, in kilograms (kg).'],
        ['Acceleration (a)', 'The rate of change of velocity, a = Δv/Δt, in m/s².'],
        ['Friction (f)', 'A force that opposes sliding between two surfaces; modelled here as f = μ·m·g.'],
        ['Ticker tape', 'A paper strip marked by a timer at equal time intervals, so dot spacing shows speed.'],
      ],
      id: [
        ['Gaya (F)', 'Dorongan atau tarikan pada benda, diukur dalam newton (N).'],
        ['Gaya total (F_net)', 'Efek gabungan semua gaya pada benda, dengan memperhatikan arahnya.'],
        ['Massa (m)', 'Jumlah materi dalam benda dan ukuran inersianya, dalam kilogram (kg).'],
        ['Percepatan (a)', 'Laju perubahan kecepatan, a = Δv/Δt, dalam m/s².'],
        ['Gesekan (f)', 'Gaya yang melawan gerak luncur antara dua permukaan; di sini dimodelkan sebagai f = μ·m·g.'],
        ['Pita ketik', 'Pita kertas yang ditandai pewaktu pada selang waktu sama, sehingga jarak titik menunjukkan kelajuan.'],
      ],
    },
    misconceptions: {
      en: [
        ['A constant force gives a constant speed.', 'A constant net force gives a constant acceleration: the speed keeps increasing. Only when the net force is zero does the speed stay constant.'],
        ['A heavier cart is pushed harder by the same force.', 'The force is the same; what changes is the response. The same force gives a heavier cart a smaller acceleration, a = F/m.'],
        ['If the cart is not moving, there is no force on it.', 'There may be several forces that cancel. With friction on and a small push, F and f are equal and opposite, so F_net = 0.'],
        ['The slope of a velocity–time graph is the speed.', 'The height of the graph is the speed; its slope is the acceleration.'],
      ],
      id: [
        ['Gaya tetap menghasilkan kelajuan tetap.', 'Gaya total yang tetap menghasilkan percepatan tetap: kelajuan terus bertambah. Hanya jika gaya total nol kelajuan tetap.'],
        ['Kereta yang lebih berat didorong lebih kuat oleh gaya yang sama.', 'Gayanya sama; yang berubah adalah tanggapannya. Gaya yang sama memberi kereta yang lebih berat percepatan yang lebih kecil, a = F/m.'],
        ['Jika kereta tidak bergerak, tidak ada gaya padanya.', 'Mungkin ada beberapa gaya yang saling meniadakan. Dengan gesekan menyala dan dorongan kecil, F dan f sama besar berlawanan arah, sehingga F_net = 0.'],
        ['Kemiringan grafik kecepatan–waktu adalah kelajuan.', 'Tinggi grafik adalah kelajuan; kemiringannya adalah percepatan.'],
      ],
    },
    realWorld: {
      en: [
        'A loaded truck needs a much bigger engine force than an empty one to reach the same speed in the same time.',
        'Sprinters push hard on the starting blocks: a large force on a small mass gives a large acceleration.',
        'Rockets accelerate faster as they burn fuel, because the thrust stays about the same while the mass falls.',
        'Crash tests measure the deceleration of a car; seat belts and airbags spread the stopping force over a longer time to keep a small.',
      ],
      id: [
        'Truk bermuatan membutuhkan gaya mesin yang jauh lebih besar daripada truk kosong untuk mencapai kelajuan yang sama dalam waktu yang sama.',
        'Pelari cepat mendorong balok start dengan kuat: gaya besar pada massa kecil memberi percepatan besar.',
        'Roket makin cepat dipercepat saat bahan bakarnya terbakar, karena dorongannya hampir tetap sementara massanya berkurang.',
        'Uji tabrak mengukur perlambatan mobil; sabuk pengaman dan airbag menyebarkan gaya penghenti dalam waktu lebih lama agar a tetap kecil.',
      ],
    },
    questions: {
      en: [
        { q: 'A 4 kg cart is pushed with 20 N and there is no friction. What is its acceleration, and how fast is it moving after 2 s?', a: 'a = F/m = 20 N / 4 kg = 5 m/s². After 2 s, v = a·t = 10 m/s.' },
        { q: 'The same 20 N push is applied to a 4 kg cart with friction on (μ = 0.2). Find f, F_net and a.', a: 'f = μ·m·g = 0.2 × 4 × 9.8 = 7.84 N; F_net = 20 − 7.84 = 12.16 N; a = 12.16 / 4 ≈ 3.0 m/s².' },
        { q: 'On the ticker tape two neighbouring gaps are 0.30 m and 0.35 m. What is the acceleration?', a: 'Speeds are 3.0 m/s and 3.5 m/s in successive 0.1 s intervals, so a = Δv/Δt = 0.5 / 0.1 = 5 m/s².' },
        { q: 'Two carts have the same v–t graph but one has twice the mass. What can you say about the net forces?', a: 'Same slope means the same acceleration, so the heavier cart must have twice the net force (F_net = m·a).' },
      ],
      id: [
        { q: 'Kereta 4 kg didorong dengan 20 N tanpa gesekan. Berapa percepatannya, dan berapa kelajuannya setelah 2 s?', a: 'a = F/m = 20 N / 4 kg = 5 m/s². Setelah 2 s, v = a·t = 10 m/s.' },
        { q: 'Dorongan 20 N yang sama diberikan pada kereta 4 kg dengan gesekan menyala (μ = 0,2). Tentukan f, F_net dan a.', a: 'f = μ·m·g = 0,2 × 4 × 9,8 = 7,84 N; F_net = 20 − 7,84 = 12,16 N; a = 12,16 / 4 ≈ 3,0 m/s².' },
        { q: 'Pada pita ketik dua jarak titik yang berdekatan adalah 0,30 m dan 0,35 m. Berapa percepatannya?', a: 'Kelajuannya 3,0 m/s dan 3,5 m/s pada selang 0,1 s berurutan, sehingga a = Δv/Δt = 0,5 / 0,1 = 5 m/s².' },
        { q: 'Dua kereta mempunyai grafik v–t yang sama tetapi massanya berbeda dua kali. Apa yang bisa kamu simpulkan tentang gaya totalnya?', a: 'Kemiringan sama berarti percepatan sama, sehingga kereta yang lebih berat harus mendapat gaya total dua kali lebih besar (F_net = m·a).' },
      ],
    },
  },
};
