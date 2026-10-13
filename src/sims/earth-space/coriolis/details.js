// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Distinguish rotating-frame "force" from inertial straight-line motion.',
      'Predict deflection direction in northern (right) vs southern (left) hemisphere.',
      'Connect to weather patterns: cyclones spin opposite by hemisphere.',
    ],
    id: [
      'Membedakan "gaya" kerangka berputar dari gerak lurus inersia.',
      'Memprediksi arah pembelokan di belahan utara (kanan) vs selatan (kiri).',
      'Menghubungkan dengan pola cuaca: siklon berputar berlawanan tergantung belahan bumi.',
    ],
  },
  tryThis: {
    en: [
      'Throw from center to edge — does the ball curve in your view?',
      'Reverse rotation direction — does the deflection flip?',
      'Stop the disk — does the ball still curve?',
    ],
    id: [
      'Lempar dari tengah ke tepi — apakah bola membelok dari sudut pandang Anda?',
      'Balikkan arah putaran — apakah pembelokan ikut berbalik?',
      'Hentikan piringan — apakah bola masih membelok?',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'Newton\'s first law says that an object with no force on it moves in a straight line at constant speed. That is true in an inertial frame, one that is not accelerating or rotating. Stand on a spinning carousel, however, and your reference marks are turning underneath everything that moves. A ball rolled straight across the floor still travels in a straight line as seen from the ground, but in your rotating view it traces a curve, because the floor you measure against has turned while the ball was in flight. To describe motion in your own frame with Newton\'s laws you have to add fictitious forces: the centrifugal force, pointing outward, and the Coriolis force, which acts sideways on anything that moves.',
        'The simulation throws a ball from the centre of a disk toward a target painted on the rim. In the inertial (outside) view the ball\'s trail is a straight line and the target rotates away from it. In the rotating (on-disk) view the disk is held still, the target stays put, and the same ball appears to curve away and miss. Launching from the centre is a deliberate choice: at the axis the disk has no velocity, so the ball\'s initial velocity is the same in both frames and the only difference between the two pictures is the rotation of the reference. The ball\'s speed v and the disk\'s angular speed ω are the two controls, and reversing the sign of ω reverses the curve.',
        'In the rotating frame the Coriolis acceleration is a = 2ωv, directed perpendicular to the velocity, and it always deflects motion in the sense opposite to the rotation: on a disk turning counterclockwise (seen from above) a moving object veers to its right; on a clockwise disk it veers to its left. Earth is such a disk. Seen from above the North Pole the planet turns counterclockwise, so in the northern hemisphere winds and currents are deflected to the right, and in the southern hemisphere to the left. The effective rotation rate at latitude φ is Ω sin φ, where Ω = 7.3 × 10⁻⁵ rad/s is Earth\'s spin, so the Coriolis effect is strongest at the poles and vanishes at the equator.',
        'The sim is a flat disk, not a sphere, so it shows the mechanism without the sin φ dependence, and its rotation is thousands of times faster than Earth\'s so that the deflection is visible in seconds. It ignores friction, gravity and air resistance, and the ball keeps a constant speed. On the real Earth, 2Ωv is tiny: a ball thrown at 20 m/s is deflected by less than a millimetre over a few metres. Only motions that are large and long-lasting, such as winds blowing for hours across hundreds of kilometres, ocean currents and long-range projectiles, are noticeably steered by it. The famous claim that bathwater drains the opposite way in each hemisphere is false; the effect is far too weak compared with the shape of the sink and the way the water was moving.',
      ],
      id: [
        'Hukum pertama Newton menyatakan bahwa benda tanpa gaya bergerak lurus dengan kecepatan tetap. Itu benar dalam kerangka inersia, kerangka yang tidak dipercepat dan tidak berputar. Namun, berdirilah di atas komidi putar, maka tanda-tanda acuanmu berputar di bawah segala yang bergerak. Bola yang digelindingkan lurus melintasi lantai tetap bergerak lurus menurut pengamat di tanah, tetapi dalam pandanganmu yang berputar bola itu menempuh lintasan melengkung, karena lantai yang kamu pakai sebagai acuan telah berputar selama bola melaju. Untuk menjelaskan gerak dalam kerangkamu sendiri dengan hukum Newton, kamu harus menambahkan gaya fiktif: gaya sentrifugal yang mengarah ke luar, dan gaya Coriolis yang bekerja menyamping pada apa pun yang bergerak.',
        'Simulasi melempar bola dari pusat piringan ke arah target yang dilukis di tepinya. Dalam tampilan inersia (dari luar), jejak bola berupa garis lurus dan targetnya berputar menjauh. Dalam tampilan berputar (di atas piringan), piringan dibuat diam, target tetap di tempat, dan bola yang sama tampak melengkung menjauh dan meleset. Peluncuran dari pusat sengaja dipilih: di sumbu, piringan tidak memiliki kecepatan, sehingga kecepatan awal bola sama di kedua kerangka dan satu-satunya perbedaan antara kedua gambar adalah perputaran acuannya. Kecepatan bola v dan kecepatan sudut piringan ω adalah dua kontrolnya, dan membalik tanda ω membalik arah lengkungan.',
        'Dalam kerangka berputar, percepatan Coriolis adalah a = 2ωv, tegak lurus terhadap kecepatan, dan selalu membelokkan gerak berlawanan dengan arah putaran: di piringan yang berputar berlawanan arah jarum jam (dilihat dari atas) benda yang bergerak berbelok ke kanannya; di piringan yang searah jarum jam berbelok ke kiri. Bumi adalah piringan seperti itu. Dilihat dari atas Kutub Utara, planet ini berputar berlawanan arah jarum jam, sehingga di belahan utara angin dan arus dibelokkan ke kanan, dan di belahan selatan ke kiri. Laju putaran efektif pada lintang φ adalah Ω sin φ, dengan Ω = 7,3 × 10⁻⁵ rad/s adalah putaran Bumi, sehingga efek Coriolis paling kuat di kutub dan hilang di khatulistiwa.',
        'Simulasi berupa piringan datar, bukan bola, sehingga menunjukkan mekanismenya tanpa ketergantungan sin φ, dan putarannya ribuan kali lebih cepat dari Bumi agar pembelokan terlihat dalam hitungan detik. Gesekan, gravitasi, dan hambatan udara diabaikan, dan kecepatan bola tetap. Di Bumi sungguhan, 2Ωv sangat kecil: bola yang dilempar 20 m/s hanya dibelokkan kurang dari satu milimeter dalam jarak beberapa meter. Hanya gerakan yang besar dan berlangsung lama, seperti angin yang bertiup berjam-jam melintasi ratusan kilometer, arus laut, dan proyektil jarak jauh, yang terlihat jelas dibelokkan olehnya. Anggapan populer bahwa air bak mandi mengalir keluar dengan arah putaran berlawanan di tiap belahan bumi itu salah; efeknya terlalu lemah dibandingkan bentuk bak dan gerakan awal airnya.',
      ],
    },
    figure: {
      caption: {
        en: 'The same throw seen two ways. Left, from outside: the ball goes straight and the target on the rim rotates away. Right, riding on the disk: the target seems fixed and the ball seems pushed sideways by a Coriolis acceleration 2ωv, perpendicular to its velocity, opposite to the sense of rotation.',
        id: 'Lemparan yang sama dilihat dengan dua cara. Kiri, dari luar: bola bergerak lurus dan target di tepi berputar menjauh. Kanan, ikut berputar di atas piringan: target tampak diam dan bola tampak didorong menyamping oleh percepatan Coriolis 2ωv, tegak lurus kecepatannya, berlawanan dengan arah putaran.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Inertial and rotating views of a thrown ball', 'Tampilan inersia dan berputar dari bola yang dilempar')}">
  <style>text{font:12px system-ui,sans-serif;fill:currentColor}.m{fill:none;stroke:currentColor;stroke-width:1.2;opacity:.5}.f{stroke-width:2.4;fill:none}.s{font-size:10.5px}</style>
  <text x="90" y="18" text-anchor="middle">${L('inertial view (outside)', 'kerangka inersia (dari luar)')}</text>
  <text x="270" y="18" text-anchor="middle">${L('rotating view (on disk)', 'kerangka berputar (di piringan)')}</text>
  <circle cx="90" cy="125" r="70" fill="currentColor" opacity=".08"/>
  <circle cx="90" cy="125" r="70" class="m"/>
  <path d="M155 110 A70 70 0 0 0 135 75" class="f" stroke="#f59e0b" marker-end="url(#a)"/>
  <text x="152" y="70" fill="#f59e0b" class="s">ω</text>
  <line x1="90" y1="125" x2="90" y2="58" class="f" stroke="#3b82f6" marker-end="url(#a)"/>
  <circle cx="90" cy="55" r="7" fill="none" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="3 2"/>
  <circle cx="45" cy="71" r="7" fill="#f59e0b"/>
  <text x="36" y="60" class="s" fill="#f59e0b" text-anchor="end">${L('target now', 'target sekarang')}</text>
  <text x="100" y="50" class="s" fill="#f59e0b">${L('target at launch', 'target saat lempar')}</text>
  <circle cx="90" cy="125" r="3" fill="currentColor"/>
  <circle cx="270" cy="125" r="70" fill="currentColor" opacity=".08"/>
  <circle cx="270" cy="125" r="70" class="m"/>
  <circle cx="270" cy="55" r="7" fill="#f59e0b"/>
  <text x="280" y="50" class="s" fill="#f59e0b">${L('target (fixed)', 'target (diam)')}</text>
  <path d="M270 125 Q 290 95 318 70" class="f" stroke="#3b82f6"/>
  <circle cx="318" cy="70" r="6" fill="#3b82f6"/>
  <line x1="292" y1="96" x2="308" y2="77" class="f" stroke="#3b82f6" marker-end="url(#a)"/>
  <text x="300" y="104" fill="#3b82f6" class="s">v</text>
  <line x1="292" y1="96" x2="307" y2="109" class="f" stroke="#ef4444" marker-end="url(#a)"/>
  <text x="300" y="124" fill="#ef4444" class="s">a = 2ωv</text>
  <circle cx="270" cy="125" r="3" fill="currentColor"/>
  <text x="90" y="216" text-anchor="middle" class="s">${L('straight line; the target moved', 'garis lurus; targetnya yang bergeser')}</text>
  <text x="270" y="216" text-anchor="middle" class="s">${L('curved path; "Coriolis force"', 'lintasan melengkung; "gaya Coriolis"')}</text>
  <text x="180" y="234" text-anchor="middle" class="s" opacity=".7">${L('counterclockwise disk: deflection to the right of the motion', 'piringan berlawanan arah jarum jam: belok ke kanan arah gerak')}</text>
  <defs><marker id="a" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="context-stroke"/></marker></defs>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'In an inertial frame the ball moves in a straight line; the curve appears only when you measure against a rotating reference.',
        'The Coriolis acceleration is 2ωv, perpendicular to the velocity, and deflects motion opposite to the sense of rotation.',
        'On Earth this means deflection to the right in the northern hemisphere and to the left in the southern hemisphere.',
        'The effect scales with Ω sin φ: strongest at the poles, zero at the equator.',
        'Earth spins slowly, so only large, long-lasting motions such as winds and ocean currents are visibly affected.',
      ],
      id: [
        'Dalam kerangka inersia bola bergerak lurus; lengkungan hanya muncul ketika kamu mengukur terhadap acuan yang berputar.',
        'Percepatan Coriolis adalah 2ωv, tegak lurus kecepatan, dan membelokkan gerak berlawanan dengan arah putaran.',
        'Di Bumi ini berarti pembelokan ke kanan di belahan utara dan ke kiri di belahan selatan.',
        'Efeknya sebanding dengan Ω sin φ: paling kuat di kutub, nol di khatulistiwa.',
        'Bumi berputar lambat, sehingga hanya gerakan besar dan lama seperti angin dan arus laut yang terpengaruh secara nyata.',
      ],
    },
    vocabulary: {
      en: [
        ['Inertial frame', 'A reference frame that is not accelerating or rotating, in which Newton\'s laws hold without extra forces.'],
        ['Rotating frame', 'A reference frame that turns with a disk or planet; objects at rest in it are actually moving in circles.'],
        ['Fictitious (inertial) force', 'A force that must be added in a non-inertial frame to make Newton\'s laws work; it has no physical source such as a push or a pull.'],
        ['Coriolis acceleration', 'The sideways acceleration 2ωv seen in a rotating frame, perpendicular to the velocity.'],
        ['Centrifugal force', 'The outward fictitious force ω²r in a rotating frame; it is zero at the axis where the sim\'s ball starts.'],
        ['Angular speed (ω)', 'How fast a frame rotates, in radians per second; Earth\'s is 7.3 × 10⁻⁵ rad/s.'],
        ['Coriolis parameter (f)', 'The effective rotation rate on Earth, f = 2Ω sin φ, which sets the strength of the effect at latitude φ.'],
        ['Cyclone', 'A large rotating low-pressure system; it spins counterclockwise in the northern hemisphere and clockwise in the southern.'],
      ],
      id: [
        ['Kerangka inersia', 'Kerangka acuan yang tidak dipercepat dan tidak berputar, tempat hukum Newton berlaku tanpa gaya tambahan.'],
        ['Kerangka berputar', 'Kerangka acuan yang ikut berputar dengan piringan atau planet; benda yang diam di dalamnya sebenarnya bergerak melingkar.'],
        ['Gaya fiktif (gaya inersia)', 'Gaya yang harus ditambahkan dalam kerangka non-inersia agar hukum Newton berlaku; tidak punya sumber fisik seperti dorongan atau tarikan.'],
        ['Percepatan Coriolis', 'Percepatan menyamping 2ωv yang teramati dalam kerangka berputar, tegak lurus kecepatan.'],
        ['Gaya sentrifugal', 'Gaya fiktif ke luar ω²r dalam kerangka berputar; nilainya nol di sumbu, tempat bola di simulasi mulai bergerak.'],
        ['Kecepatan sudut (ω)', 'Seberapa cepat kerangka berputar, dalam radian per sekon; untuk Bumi 7,3 × 10⁻⁵ rad/s.'],
        ['Parameter Coriolis (f)', 'Laju putaran efektif di Bumi, f = 2Ω sin φ, yang menentukan kekuatan efek pada lintang φ.'],
        ['Siklon', 'Sistem tekanan rendah besar yang berputar; berlawanan arah jarum jam di belahan utara dan searah jarum jam di belahan selatan.'],
      ],
    },
    misconceptions: {
      en: [
        ['The Coriolis force is a real push on the ball.', 'Nothing touches the ball. In the inertial view it moves in a straight line with no sideways force at all. The "force" is a bookkeeping term that appears only because the observer\'s frame is rotating.'],
        ['Water in sinks and toilets drains the opposite way in the two hemispheres.', 'Earth\'s rotation is far too slow for that: the Coriolis acceleration on draining water is about ten thousand times smaller than the effects of the basin\'s shape and any residual swirl. The direction is set by the plumbing, not the hemisphere.'],
        ['The Coriolis effect is strongest at the equator because the ground moves fastest there.', 'It is zero at the equator. What matters is the rotation of the local horizontal plane about the vertical, which is Ω sin φ: fastest at the poles and absent at the equator. That is why tropical cyclones never form within about 5° of the equator.'],
        ['The ball curves because the disk pushes on it.', 'In the sim there is no friction, so the disk cannot push the ball. If the ball were sitting on a real rotating floor, friction would drag it along, but the curve in the rotating view appears even for a ball flying freely above the disk.'],
      ],
      id: [
        ['Gaya Coriolis adalah dorongan nyata pada bola.', 'Tidak ada yang menyentuh bola. Dalam tampilan inersia bola bergerak lurus tanpa gaya menyamping sama sekali. "Gaya" itu hanyalah suku pembukuan yang muncul karena kerangka pengamat berputar.'],
        ['Air di wastafel dan toilet mengalir keluar dengan arah putaran berlawanan di kedua belahan bumi.', 'Putaran Bumi terlalu lambat untuk itu: percepatan Coriolis pada air yang mengalir sekitar sepuluh ribu kali lebih kecil daripada pengaruh bentuk bak dan sisa putaran air. Arahnya ditentukan oleh bentuk saluran, bukan belahan bumi.'],
        ['Efek Coriolis paling kuat di khatulistiwa karena tanah bergerak paling cepat di sana.', 'Nilainya nol di khatulistiwa. Yang penting adalah putaran bidang mendatar setempat terhadap arah vertikal, yaitu Ω sin φ: paling cepat di kutub dan tidak ada di khatulistiwa. Itulah sebabnya siklon tropis tidak pernah terbentuk dalam jarak sekitar 5° dari khatulistiwa.'],
        ['Bola melengkung karena didorong oleh piringan.', 'Di simulasi tidak ada gesekan, sehingga piringan tidak bisa mendorong bola. Jika bola berada di lantai berputar sungguhan, gesekan akan menyeretnya, tetapi lengkungan dalam tampilan berputar tetap muncul bahkan untuk bola yang melayang bebas di atas piringan.'],
      ],
    },
    realWorld: {
      en: [
        'Air flowing into a low-pressure centre is deflected sideways, so storms spin counterclockwise in the northern hemisphere and clockwise in the southern; cyclones cannot form near the equator, which is why Indonesia is rarely struck directly by one.',
        'The trade winds blow from the north-east north of the equator and from the south-east south of it, because air moving toward the equator is deflected westward in both hemispheres.',
        'Long-range artillery in the First World War had to correct for Coriolis deflection: a shell fired 30 km in the northern hemisphere lands roughly a hundred metres to the right of its aim.',
        'Large ocean currents such as the Gulf Stream and the Kuroshio are steered by the Coriolis effect, forming great clockwise gyres in the northern oceans and counterclockwise gyres in the southern.',
      ],
      id: [
        'Udara yang mengalir ke pusat tekanan rendah dibelokkan menyamping, sehingga badai berputar berlawanan arah jarum jam di belahan utara dan searah jarum jam di belahan selatan; siklon tidak bisa terbentuk di dekat khatulistiwa, itulah sebabnya Indonesia jarang dihantam langsung oleh siklon.',
        'Angin pasat bertiup dari timur laut di utara khatulistiwa dan dari tenggara di selatannya, karena udara yang bergerak ke arah khatulistiwa dibelokkan ke barat di kedua belahan bumi.',
        'Artileri jarak jauh pada Perang Dunia Pertama harus mengoreksi pembelokan Coriolis: peluru yang ditembakkan sejauh 30 km di belahan utara mendarat sekitar seratus meter di sebelah kanan sasaran.',
        'Arus laut besar seperti Arus Teluk dan Kuroshio dikendalikan oleh efek Coriolis, membentuk pusaran raksasa searah jarum jam di samudra belahan utara dan berlawanan arah jarum jam di belahan selatan.',
      ],
    },
    questions: {
      en: [
        { q: 'The disk turns at ω = 0.6 rad/s and the ball takes 1.0 s to reach the rim. By what angle does it miss the target, and on which side?', a: 'While the ball flies, the disk turns through ωt = 0.6 × 1.0 = 0.6 rad, about 34°. The target has moved on by that angle, so in the rotating view the ball lands 34° behind the target, on the side opposite to the direction of rotation. Doubling the ball\'s speed halves the flight time and the miss.' },
        { q: 'A wind of 10 m/s blows at latitude 45°. Calculate its Coriolis acceleration and compare it with g.', a: 'a = 2Ω sin φ · v = 2 × 7.3 × 10⁻⁵ × 0.71 × 10 ≈ 1.0 × 10⁻³ m/s². That is about one ten-thousandth of g. It is negligible over seconds, but over the many hours a wind blows across hundreds of kilometres it turns the wind through tens of degrees, which is why weather maps show winds circling pressure systems.' },
        { q: 'Why do hurricanes in the northern hemisphere spin counterclockwise, and why do none form within about 5° of the equator?', a: 'Air rushes inward toward the low-pressure centre from all sides. In the northern hemisphere each inflowing parcel is deflected to its right, so the air misses the centre and circulates around it counterclockwise (clockwise in the south). Near the equator sin φ is almost zero, so there is no deflection to organise the inflow into a spin, and a cyclone cannot form.' },
      ],
      id: [
        { q: 'Piringan berputar dengan ω = 0,6 rad/s dan bola membutuhkan 1,0 s untuk mencapai tepi. Berapa sudut melesetnya dari target, dan di sisi mana?', a: 'Selama bola melaju, piringan berputar sebesar ωt = 0,6 × 1,0 = 0,6 rad, sekitar 34°. Target sudah bergeser sebesar sudut itu, sehingga dalam tampilan berputar bola mendarat 34° di belakang target, di sisi yang berlawanan dengan arah putaran. Menggandakan kecepatan bola memperpendek waktu terbang dan melesetnya menjadi setengah.' },
        { q: 'Angin 10 m/s bertiup pada lintang 45°. Hitung percepatan Coriolisnya dan bandingkan dengan g.', a: 'a = 2Ω sin φ · v = 2 × 7,3 × 10⁻⁵ × 0,71 × 10 ≈ 1,0 × 10⁻³ m/s². Itu sekitar sepersepuluh ribu dari g. Dapat diabaikan dalam hitungan detik, tetapi selama berjam-jam angin bertiup melintasi ratusan kilometer, arahnya berbelok puluhan derajat, itulah sebabnya peta cuaca menunjukkan angin yang berputar mengelilingi sistem tekanan.' },
        { q: 'Mengapa badai di belahan utara berputar berlawanan arah jarum jam, dan mengapa tidak ada yang terbentuk dalam jarak sekitar 5° dari khatulistiwa?', a: 'Udara mengalir masuk ke pusat tekanan rendah dari semua sisi. Di belahan utara setiap paket udara yang masuk dibelokkan ke kanannya, sehingga udara meleset dari pusat dan berputar mengelilinginya berlawanan arah jarum jam (searah jarum jam di selatan). Di dekat khatulistiwa sin φ hampir nol, sehingga tidak ada pembelokan yang menata aliran masuk menjadi putaran, dan siklon tidak dapat terbentuk.' },
      ],
    },
  },
};
