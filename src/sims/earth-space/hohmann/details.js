// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Compute Δv for each burn using vis-viva equation.',
      'See the half-ellipse transfer with the Sun (or Earth) at one focus.',
      'Predict transfer time = π · √(a³/μ) where a is semi-major.',
    ],
    id: [
      'Menghitung Δv tiap pembakaran dengan persamaan vis-viva.',
      'Melihat transfer setengah-elips dengan Matahari (atau Bumi) di salah satu fokus.',
      'Memprediksi waktu transfer = π · √(a³/μ) dengan a sumbu setengah-besar.',
    ],
  },  tryThis: {
    en: [
      'Earth (1 AU) → Mars (1.52 AU) — what is total Δv?',
      'Earth → Jupiter — much bigger Δv. Why?',
      'Try equal radii — Δv → 0?',
    ],
    id: [
      'Bumi (1 AU) → Mars (1,52 AU) — berapa total Δv?',
      'Bumi → Jupiter — Δv jauh lebih besar. Mengapa?',
      'Coba jari-jari sama — Δv → 0?',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'Changing orbit costs propellant, and rocket engineers measure that cost as Δv, the total change in speed the engine must deliver. Between two coplanar circular orbits around the same body, the cheapest two-burn route is the Hohmann transfer, published by Walter Hohmann in 1925: an ellipse that just touches both circles, with its periapsis on the inner orbit and its apoapsis on the outer one. Because the ellipse is tangent to both circles, each burn is applied along the direction of motion, which is the most efficient way to change orbital energy. The semi-major axis of the transfer ellipse is simply a = (r₁ + r₂)/2.',
        'The speeds come from the vis-viva equation, v² = μ(2/r − 1/a), where μ = GM of the central body. On a circle a = r, so v_c = √(μ/r). The first burn at r₁ raises the speed from √(μ/r₁) to √(μ(2/r₁ − 1/a)), stretching the orbit into the transfer ellipse. The spacecraft then coasts for exactly half an ellipse, which takes π√(a³/μ) by Kepler\'s third law, slowing all the way as it climbs. At r₂ it arrives moving slower than the local circular speed, so a second prograde burn, Δv₂ = √(μ/r₂) − √(μ(2/r₂ − 1/a)), circularises the orbit. For a transfer inward (Earth to Venus) both burns are retrograde: you slow down to fall inward, and slow down again on arrival because you are moving too fast.',
        'The sim works in canonical units with μ = 1 and distances in astronomical units. For the Sun that makes the speed unit √(μ/AU) ≈ 29.8 km/s, Earth\'s orbital speed, and the natural time unit 1/(2π) year ≈ 58 days. The sim computes the transfer time in these time units and then divides by 2π so the readout is in years: 0.71 years, about 259 days, for Earth to Mars. The r₁ and r₂ sliders set the two orbits (the LEO to GEO preset only reproduces the right radius ratio of 6.6, so its AU and year labels do not apply). The lab lets you tabulate Δv against r₂/r₁ and discover something odd: the total Δv rises, peaks near a ratio of 15.6, then falls again, because the first burn can never exceed the escape speed √2 − 1 ≈ 0.41 units while the circularising burn shrinks for very distant targets.',
        'This is a two-body, patched-together idealisation. Burns are treated as instantaneous, the orbits as perfect coplanar circles, and only the Sun\'s gravity counts. Real missions start deep in Earth\'s gravity well and must also pay to escape it, aim for where the target planet will be rather than where it is (Earth and Mars line up correctly only every 26 months), and often add plane changes because the planets\' orbits are tilted. Faster trajectories exist but cost more Δv, and the animation\'s timing is illustrative, not to scale.',
      ],
      id: [
        'Mengubah orbit membutuhkan propelan, dan insinyur roket mengukur biayanya sebagai Δv, total perubahan laju yang harus diberikan mesin. Antara dua orbit lingkaran sebidang mengitari benda yang sama, rute dua pembakaran yang paling hemat adalah transfer Hohmann, yang diterbitkan Walter Hohmann pada 1925: sebuah elips yang tepat menyinggung kedua lingkaran, dengan periapsis di orbit dalam dan apoapsis di orbit luar. Karena elips menyinggung kedua lingkaran, tiap pembakaran dilakukan searah gerak, cara paling efisien untuk mengubah energi orbit. Sumbu setengah-besar elips transfer adalah a = (r₁ + r₂)/2.',
        'Kecepatannya diperoleh dari persamaan vis-viva, v² = μ(2/r − 1/a), dengan μ = GM benda pusat. Pada lingkaran a = r, sehingga v_c = √(μ/r). Pembakaran pertama di r₁ menaikkan laju dari √(μ/r₁) menjadi √(μ(2/r₁ − 1/a)), meregangkan orbit menjadi elips transfer. Pesawat lalu meluncur bebas tepat setengah elips, yang memakan waktu π√(a³/μ) menurut hukum ketiga Kepler, sambil terus melambat saat menanjak. Di r₂ ia tiba dengan laju lebih rendah daripada laju lingkaran setempat, sehingga pembakaran prograde kedua, Δv₂ = √(μ/r₂) − √(μ(2/r₂ − 1/a)), membulatkan orbitnya. Untuk transfer ke dalam (Bumi ke Venus) kedua pembakaran bersifat retrograde: kamu memperlambat agar jatuh ke dalam, dan memperlambat lagi saat tiba karena bergerak terlalu cepat.',
        'Sim ini bekerja dalam satuan kanonik dengan μ = 1 dan jarak dalam satuan astronomi. Untuk Matahari, satuan lajunya √(μ/AU) ≈ 29,8 km/s, yaitu laju orbit Bumi, dan satuan waktu alaminya 1/(2π) tahun ≈ 58 hari. Sim menghitung waktu transfer dalam satuan waktu ini lalu membaginya dengan 2π sehingga tampilannya dalam tahun: 0,71 tahun, sekitar 259 hari, untuk Bumi ke Mars. Slider r₁ dan r₂ mengatur kedua orbit (preset LEO ke GEO hanya mereproduksi rasio jari-jari 6,6 yang benar, sehingga label AU dan tahunnya tidak berlaku). Lab memungkinkanmu menabelkan Δv terhadap r₂/r₁ dan menemukan hal aneh: total Δv naik, mencapai puncak di dekat rasio 15,6, lalu turun lagi, karena pembakaran pertama tidak pernah melebihi laju lepas √2 − 1 ≈ 0,41 satuan sementara pembakaran pembulat menyusut untuk target yang sangat jauh.',
        'Ini adalah idealisasi dua benda. Pembakaran dianggap sesaat, orbit dianggap lingkaran sempurna yang sebidang, dan hanya gravitasi Matahari yang dihitung. Misi sungguhan berangkat dari dalam sumur gravitasi Bumi dan harus membayar pula untuk lepas darinya, membidik tempat planet tujuan akan berada dan bukan tempatnya sekarang (Bumi dan Mars berada pada susunan yang tepat hanya setiap 26 bulan), dan sering menambahkan perubahan bidang karena orbit planet-planet miring. Lintasan yang lebih cepat memang ada tetapi menelan Δv lebih besar, dan pewaktuan animasi hanya ilustratif, bukan skala sebenarnya.',
      ],
    },
    figure: {
      caption: {
        en: 'A Hohmann transfer from r₁ to r₂. Burn 1 at periapsis raises the speed above circular and stretches the orbit into a half-ellipse; the craft slows as it climbs, so burn 2 at apoapsis adds the speed needed for the outer circle.',
        id: 'Transfer Hohmann dari r₁ ke r₂. Pembakaran 1 di periapsis menaikkan laju di atas laju lingkaran dan meregangkan orbit menjadi setengah elips; pesawat melambat saat menanjak, sehingga pembakaran 2 di apoapsis menambah laju yang diperlukan untuk lingkaran luar.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Geometry of a Hohmann transfer', 'Geometri transfer Hohmann')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.m{fill:none;stroke:currentColor;stroke-width:1.2;opacity:.45}.f{stroke-width:2.2;fill:none}.s{font-size:9.5px;opacity:.8}.r{text-anchor:end}</style>
  <circle cx="150" cy="120" r="45" fill="none" stroke="#3b82f6" stroke-width="1.6"/>
  <circle cx="150" cy="120" r="105" fill="none" stroke="#8b5cf6" stroke-width="1.6"/>
  <path d="M105 120 A75 68.7 0 0 0 255 120" class="m" stroke-dasharray="3 4"/>
  <path d="M105 120 A75 68.7 0 0 1 255 120" class="f" stroke="#f59e0b"/>
  <circle cx="150" cy="120" r="7" fill="#f59e0b"/>
  <text x="156" y="137" class="s">${L('Sun (focus)', 'Matahari (fokus)')}</text>
  <text x="166" y="96" fill="#3b82f6">r₁</text>
  <text x="236" y="212" fill="#8b5cf6">r₂</text>
  <circle cx="105" cy="120" r="4" fill="#10b981"/>
  <circle cx="255" cy="120" r="4" fill="#10b981"/>
  <path d="M100 120 L100 86" class="f" stroke="#3b82f6" marker-end="url(#a)"/>
  <path d="M110 120 L110 66" class="f" stroke="#f59e0b" marker-end="url(#a)"/>
  <text x="96" y="60" class="r s" fill="#3b82f6">${L('circular speed', 'laju lingkaran')}</text>
  <text x="96" y="48" class="r" fill="#f59e0b">${L('burn 1: Δv₁ speeds up', 'bakar 1: Δv₁ mempercepat')}</text>
  <path d="M250 120 L250 150" class="f" stroke="#f59e0b" marker-end="url(#a)"/>
  <path d="M260 120 L260 174" class="f" stroke="#8b5cf6" marker-end="url(#a)"/>
  <text x="266" y="152" class="s" fill="#f59e0b">${L('arrival speed', 'laju tiba')}</text>
  <text x="266" y="180" fill="#8b5cf6">${L('burn 2: Δv₂', 'bakar 2: Δv₂')}</text>
  <text x="266" y="192" class="s" fill="#8b5cf6">${L('to circular speed', 'ke laju lingkaran')}</text>
  <text x="128" y="34" fill="#f59e0b">${L('transfer half-ellipse', 'setengah elips transfer')}</text>
  <text x="10" y="232">a = (r₁ + r₂)/2,  t = π√(a³/μ),  v² = μ(2/r − 1/a)</text>
  <defs><marker id="a" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="context-stroke"/></marker></defs>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'The vis-viva equation v² = μ(2/r − 1/a) links a spacecraft\'s speed to its distance and the size of its orbit.',
        'A Hohmann transfer is the half-ellipse tangent to both circular orbits, with a = (r₁ + r₂)/2; it is the minimum-Δv two-burn route.',
        'Both burns are tangential: speed up at periapsis to raise the far side of the orbit, then speed up again at apoapsis to circularise (both slow down for an inward transfer).',
        'The trip takes half the ellipse\'s period, π√(a³/μ): about 259 days from Earth to Mars.',
        'Total Δv does not grow forever with distance; it peaks at r₂/r₁ ≈ 15.6, and a higher circular orbit is a slower one even though it holds more energy.',
      ],
      id: [
        'Persamaan vis-viva v² = μ(2/r − 1/a) menghubungkan laju pesawat dengan jaraknya dan ukuran orbitnya.',
        'Transfer Hohmann adalah setengah elips yang menyinggung kedua orbit lingkaran, dengan a = (r₁ + r₂)/2; inilah rute dua pembakaran dengan Δv minimum.',
        'Kedua pembakaran bersifat tangensial: mempercepat di periapsis untuk menaikkan sisi jauh orbit, lalu mempercepat lagi di apoapsis untuk membulatkan orbit (keduanya memperlambat untuk transfer ke dalam).',
        'Perjalanan memakan setengah periode elips, π√(a³/μ): sekitar 259 hari dari Bumi ke Mars.',
        'Total Δv tidak terus bertambah dengan jarak; puncaknya di r₂/r₁ ≈ 15,6, dan orbit lingkaran yang lebih tinggi justru lebih lambat walau energinya lebih besar.',
      ],
    },
    vocabulary: {
      en: [
        ['Δv (delta-v)', 'The change in velocity an engine must produce; the standard measure of the propellant cost of a manoeuvre.'],
        ['Vis-viva equation', 'v² = μ(2/r − 1/a): the speed at distance r on an orbit of semi-major axis a around a body with gravitational parameter μ.'],
        ['Standard gravitational parameter (μ)', 'GM of the central body; for the Sun about 1.327 × 10²⁰ m³/s². Setting μ = 1 defines canonical units.'],
        ['Periapsis / apoapsis', 'The closest and farthest points of an orbit (perihelion and aphelion for orbits around the Sun).'],
        ['Semi-major axis (a)', 'Half the longest diameter of an ellipse; it alone fixes the orbit\'s energy and period.'],
        ['Circularisation burn', 'A tangential burn at apoapsis or periapsis that turns an elliptical orbit into a circular one.'],
        ['Impulsive burn', 'The idealisation that a burn changes velocity instantly, with no change in position.'],
        ['Launch window', 'The period when the departure and target planets are correctly placed for a transfer; for Earth and Mars it recurs every 26 months.'],
      ],
      id: [
        ['Δv (delta-v)', 'Perubahan kecepatan yang harus dihasilkan mesin; ukuran baku biaya propelan sebuah manuver.'],
        ['Persamaan vis-viva', 'v² = μ(2/r − 1/a): laju pada jarak r di orbit bersumbu setengah-besar a mengitari benda dengan parameter gravitasi μ.'],
        ['Parameter gravitasi standar (μ)', 'GM benda pusat; untuk Matahari sekitar 1,327 × 10²⁰ m³/s². Menetapkan μ = 1 mendefinisikan satuan kanonik.'],
        ['Periapsis / apoapsis', 'Titik terdekat dan terjauh sebuah orbit (perihelion dan aphelion untuk orbit mengitari Matahari).'],
        ['Sumbu setengah-besar (a)', 'Setengah diameter terpanjang elips; nilai ini saja yang menentukan energi dan periode orbit.'],
        ['Pembakaran pembulatan', 'Pembakaran tangensial di apoapsis atau periapsis yang mengubah orbit elips menjadi lingkaran.'],
        ['Pembakaran impulsif', 'Idealisasi bahwa pembakaran mengubah kecepatan seketika, tanpa perubahan posisi.'],
        ['Jendela peluncuran', 'Kurun waktu ketika planet keberangkatan dan planet tujuan berada pada posisi yang tepat untuk transfer; untuk Bumi dan Mars berulang setiap 26 bulan.'],
      ],
    },
    misconceptions: {
      en: [
        ['To reach a higher orbit, point the rocket outward and thrust away from the Sun.', 'Thrusting along the direction of motion is far more efficient. A prograde burn raises the opposite side of the orbit; radial thrust mostly just distorts the orbit and wastes propellant.'],
        ['After the first burn the spacecraft keeps its new speed all the way to the target.', 'It slows continuously as it climbs, trading kinetic energy for potential energy. At apoapsis it is moving slower than the circular speed there, which is exactly why a second burn is needed.'],
        ['A spacecraft in a higher orbit moves faster.', 'It moves slower: v_c = √(μ/r) falls with radius. The higher orbit has more total energy, but that energy is stored as potential energy, not speed.'],
        ['Travelling to a more distant planet always needs more Δv.', 'Total Hohmann Δv peaks at a radius ratio of about 15.6 and then decreases, because the departure burn approaches escape speed while the circularising burn at a very distant, slow-moving target shrinks.'],
      ],
      id: [
        ['Untuk mencapai orbit lebih tinggi, arahkan roket ke luar dan dorong menjauhi Matahari.', 'Mendorong searah gerak jauh lebih efisien. Pembakaran prograde menaikkan sisi orbit yang berlawanan; dorongan radial sebagian besar hanya mengubah bentuk orbit dan memboroskan propelan.'],
        ['Setelah pembakaran pertama, pesawat mempertahankan laju barunya sampai ke tujuan.', 'Pesawat terus melambat saat menanjak, menukar energi kinetik dengan energi potensial. Di apoapsis lajunya lebih rendah daripada laju lingkaran di sana, dan itulah sebabnya pembakaran kedua diperlukan.'],
        ['Pesawat di orbit yang lebih tinggi bergerak lebih cepat.', 'Justru lebih lambat: v_c = √(μ/r) menurun dengan jari-jari. Orbit yang lebih tinggi memiliki energi total lebih besar, tetapi energi itu tersimpan sebagai energi potensial, bukan laju.'],
        ['Pergi ke planet yang lebih jauh selalu butuh Δv lebih besar.', 'Total Δv Hohmann mencapai puncak pada rasio jari-jari sekitar 15,6 lalu menurun, karena pembakaran keberangkatan mendekati laju lepas sementara pembakaran pembulatan di target yang sangat jauh dan lambat menyusut.'],
      ],
    },
    realWorld: {
      en: [
        'Mars missions follow near-Hohmann trajectories: NASA\'s Perseverance rover left Earth in July 2020 and landed in February 2021, about seven months later.',
        'Communications satellites are placed in an elliptical geostationary transfer orbit and then fire an engine at apogee to circularise at 35,786 km, which is exactly burn 2 of a Hohmann transfer.',
        'Because Earth and Mars align only every 26 months, Mars launches cluster into short windows; missing one means a two-year wait.',
        'Mission planners trade Δv against time: faster transfers to Mars are possible, but every extra kilometre per second of Δv means much more propellant and less payload.',
      ],
      id: [
        'Misi ke Mars mengikuti lintasan yang hampir Hohmann: wahana penjelajah Perseverance milik NASA meninggalkan Bumi pada Juli 2020 dan mendarat pada Februari 2021, sekitar tujuh bulan kemudian.',
        'Satelit komunikasi ditempatkan di orbit transfer geostasioner yang elips lalu menyalakan mesin di apogee untuk membulatkan orbit di 35.786 km, yang persis merupakan pembakaran 2 dari transfer Hohmann.',
        'Karena Bumi dan Mars hanya segaris setiap 26 bulan, peluncuran ke Mars berkumpul dalam jendela singkat; melewatkannya berarti menunggu dua tahun.',
        'Perencana misi menimbang Δv terhadap waktu: transfer ke Mars yang lebih cepat memang mungkin, tetapi setiap tambahan satu kilometer per detik Δv berarti jauh lebih banyak propelan dan lebih sedikit muatan.',
      ],
    },
    questions: {
      en: [
        { q: 'For Earth (1 AU) to Mars (1.52 AU) the sim reports Δv₁ = 0.0983 and Δv₂ = 0.0885 in units of √(μ/AU). Convert these to km/s and find the total.', a: 'The speed unit is Earth\'s orbital speed, 29.8 km/s. Δv₁ = 0.0983 × 29.8 ≈ 2.9 km/s and Δv₂ = 0.0885 × 29.8 ≈ 2.6 km/s, so the total is about 5.6 km/s. (A real mission also has to climb out of Earth\'s gravity well, which is not included here.)' },
        { q: 'Set the Earth to Venus preset. Both Δv values come out negative. What does that mean physically?', a: 'Negative means retrograde: the engine fires against the direction of motion. To fall inward from Earth\'s orbit you must slow down so that your perihelion drops to 0.72 AU. Arriving at Venus\'s distance you are moving faster than Venus\'s circular speed (you have been falling toward the Sun), so you must slow down again to stay there.' },
        { q: 'Compute the Earth to Mars transfer time in days from a = (1 + 1.52)/2 AU, and compare with the sim\'s readout.', a: 'In units where μ = 4π² AU³/yr², the half-period is π√(a³/μ) = ½ a^(3/2) years. With a = 1.26 AU, a^(3/2) ≈ 1.414, so t ≈ 0.71 yr ≈ 259 days. The sim shows 0.71 yr; internally it computes 4.44 in canonical units of 1/(2π) year and divides by 2π: 4.44/(2π) = 0.71 yr.' },
      ],
      id: [
        { q: 'Untuk Bumi (1 AU) ke Mars (1,52 AU) sim menampilkan Δv₁ = 0,0983 dan Δv₂ = 0,0885 dalam satuan √(μ/AU). Ubah ke km/s dan hitung totalnya.', a: 'Satuan lajunya adalah laju orbit Bumi, 29,8 km/s. Δv₁ = 0,0983 × 29,8 ≈ 2,9 km/s dan Δv₂ = 0,0885 × 29,8 ≈ 2,6 km/s, sehingga totalnya sekitar 5,6 km/s. (Misi sungguhan juga harus memanjat keluar dari sumur gravitasi Bumi, yang tidak dihitung di sini.)' },
        { q: 'Pilih preset Bumi ke Venus. Kedua nilai Δv keluar negatif. Apa arti fisisnya?', a: 'Negatif berarti retrograde: mesin menyala melawan arah gerak. Untuk jatuh ke dalam dari orbit Bumi kamu harus memperlambat agar perihelionmu turun ke 0,72 AU. Saat tiba di jarak Venus kamu bergerak lebih cepat daripada laju lingkaran Venus (kamu telah jatuh ke arah Matahari), sehingga harus memperlambat lagi agar tetap di sana.' },
        { q: 'Hitung waktu transfer Bumi ke Mars dalam hari dari a = (1 + 1,52)/2 AU, dan bandingkan dengan tampilan sim.', a: 'Dalam satuan dengan μ = 4π² AU³/tahun², setengah periodenya π√(a³/μ) = ½ a^(3/2) tahun. Dengan a = 1,26 AU, a^(3/2) ≈ 1,414, sehingga t ≈ 0,71 tahun ≈ 259 hari. Sim menampilkan 0,71 tahun; di dalamnya sim menghitung 4,44 dalam satuan kanonik 1/(2π) tahun lalu membaginya dengan 2π: 4,44/(2π) = 0,71 tahun.' },
      ],
    },
  },
};
