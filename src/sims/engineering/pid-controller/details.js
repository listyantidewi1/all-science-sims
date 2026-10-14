// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Feel the role of each gain: P pulls toward, I eliminates steady-state error, D damps overshoot.',
      'Recognize the classic failure modes: oscillation, slow rise, steady-state offset.',
      'Find a stable balance — the Ziegler-Nichols intuition lives here.',
    ],
    id: [
      'Merasakan peran tiap penguat: P menarik ke sasaran, I menghilangkan kesalahan tunak, D meredam overshoot.',
      'Mengenali mode kegagalan klasik: osilasi, naik lambat, offset tunak.',
      'Menemukan keseimbangan stabil — intuisi Ziegler-Nichols ada di sini.',
    ],
  },
  tryThis: {
    en: [
      'Kp only — system reaches near setpoint but with steady-state offset.',
      'Add Ki — offset disappears but overshoot grows.',
      'Add Kd — overshoot tames; response speeds up.',
      'Crank Kp very high — oscillation appears at the natural frequency.',
    ],
    id: [
      'Kp saja — sistem mendekati setpoint tetapi dengan offset tunak.',
      'Tambah Ki — offset hilang tetapi overshoot membesar.',
      'Tambah Kd — overshoot teredam; respon lebih cepat.',
      'Naikkan Kp sangat tinggi — muncul osilasi pada frekuensi alami.',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'A feedback controller measures the output of a system, compares it with the value you want (the setpoint), and adjusts its input to shrink the difference. That difference, e = setpoint − y, is the error. A PID controller computes its output u from three views of the error: a proportional term Kp·e that reacts to the error right now, an integral term Ki·∫e dt that reacts to the error accumulated over time, and a derivative term Kd·de/dt that reacts to how fast the error is changing. The sum u = Kp·e + Ki·∫e dt + Kd·de/dt is sent to the system, usually called the plant.',
        'The plant in this simulation is first-order: τ·dy/dt = −y + u. Left alone with a constant input, y drifts toward u along an exponential curve with time constant τ, like the temperature of a heater, the speed of a motor or the level in a tank. The green trace is y, the purple trace is the control effort u (drawn at 0.3 scale) and the dashed line is the setpoint. With a proportional term alone, the loop settles where the plant\'s need for input is met by what the error can produce: y = Kp·setpoint/(1 + Kp), leaving a steady-state error of setpoint/(1 + Kp). Larger Kp shrinks the error and speeds the response but never removes the offset, because u is only nonzero while e is nonzero.',
        'The integral term fixes that: as long as any error remains, ∫e dt keeps growing and pushes u upward until the error is exactly zero. The price is memory. The integral keeps rising while y is still climbing, so u is too large when y arrives at the setpoint, and y overshoots; the closed loop is now second-order and can oscillate. Raising Ki makes the overshoot larger and the oscillation faster; raising Kp, in this plant, actually adds damping. The derivative term responds to change. In a first-order plant it mainly produces a sharp kick when the setpoint jumps (the error changes instantly) and otherwise acts like extra inertia; its ability to damp oscillation shows up most clearly in plants with momentum, such as a motor positioning a load, which this sim does not model. The disturbance button knocks y down by 0.5 so you can watch the loop recover.',
        'Real control loops add complications the sim leaves out. Sensors are noisy, and the derivative term amplifies noise, so real controllers filter it or apply it to y rather than e. Actuators saturate: a heater cannot deliver negative power, a valve cannot open beyond fully open, and an integral that keeps winding up against a saturated actuator causes large overshoot (integral windup). Most plants have more lag or higher order than this one, and there a large Kp alone does cause oscillation and even instability; a pure first-order plant with P control cannot oscillate, so any oscillation you see here comes from the integral term. The lab panel records overshoot, settling time to within 2% and steady-state error so you can tune methodically.',
      ],
      id: [
        'Pengendali umpan balik mengukur keluaran sebuah sistem, membandingkannya dengan nilai yang diinginkan (setpoint), lalu menyesuaikan masukannya untuk memperkecil selisihnya. Selisih itu, e = setpoint − y, disebut galat. Pengendali PID menghitung keluarannya u dari tiga sudut pandang terhadap galat: suku proporsional Kp·e yang bereaksi pada galat saat ini, suku integral Ki·∫e dt yang bereaksi pada galat yang terakumulasi sepanjang waktu, dan suku derivatif Kd·de/dt yang bereaksi pada seberapa cepat galat berubah. Jumlahnya, u = Kp·e + Ki·∫e dt + Kd·de/dt, dikirim ke sistem, yang biasa disebut plant.',
        'Plant pada simulasi ini berorde satu: τ·dy/dt = −y + u. Jika dibiarkan dengan masukan konstan, y bergerak menuju u mengikuti kurva eksponensial dengan konstanta waktu τ, seperti suhu pemanas, kecepatan motor, atau ketinggian air dalam tangki. Garis hijau adalah y, garis ungu adalah upaya kendali u (digambar dengan skala 0,3), dan garis putus-putus adalah setpoint. Dengan suku proporsional saja, lup berhenti di titik ketika kebutuhan masukan plant terpenuhi oleh apa yang bisa dihasilkan galat: y = Kp·setpoint/(1 + Kp), menyisakan galat keadaan tunak sebesar setpoint/(1 + Kp). Kp yang lebih besar memperkecil galat dan mempercepat respons tetapi tidak pernah menghilangkan offset itu, karena u hanya tak nol selama e tak nol.',
        'Suku integral memperbaikinya: selama masih ada galat, ∫e dt terus bertambah dan mendorong u naik sampai galat tepat nol. Harganya adalah ingatan. Integral terus naik selagi y masih menanjak, sehingga u sudah terlalu besar ketika y tiba di setpoint, dan y melampaui sasaran (overshoot); lup tertutup kini berorde dua dan dapat berosilasi. Menaikkan Ki membuat overshoot lebih besar dan osilasi lebih cepat; menaikkan Kp, pada plant ini, justru menambah redaman. Suku derivatif merespons perubahan. Pada plant orde satu, suku ini terutama menghasilkan sentakan tajam saat setpoint melompat (galat berubah seketika) dan selebihnya berperilaku seperti inersia tambahan; kemampuannya meredam osilasi paling jelas terlihat pada plant yang punya momentum, seperti motor yang memposisikan beban, yang tidak dimodelkan simulasi ini. Tombol gangguan menjatuhkan y sebesar 0,5 agar kamu dapat mengamati lup pulih.',
        'Lup kendali sungguhan menambahkan kerumitan yang diabaikan simulasi. Sensor berderau, dan suku derivatif memperkuat derau, sehingga pengendali nyata menyaringnya atau menerapkannya pada y, bukan pada e. Aktuator punya batas: pemanas tidak bisa memberi daya negatif, katup tidak bisa terbuka melebihi penuh, dan integral yang terus menggulung melawan aktuator yang jenuh menyebabkan overshoot besar (integral windup). Kebanyakan plant memiliki lebih banyak keterlambatan atau orde lebih tinggi daripada yang ini, dan di sana Kp besar saja memang menyebabkan osilasi bahkan ketidakstabilan; plant orde satu murni dengan kendali P tidak dapat berosilasi, sehingga osilasi apa pun yang kamu lihat di sini berasal dari suku integral. Panel lab mencatat overshoot, waktu penetapan dalam batas 2%, dan galat keadaan tunak agar kamu bisa menyetel secara sistematis.',
      ],
    },
    figure: {
      caption: {
        en: 'The feedback loop. The measured output y is subtracted from the setpoint to form the error e; the P, I and D terms each act on e and their sum u drives the plant. In this sim the plant is first-order: τ·dy/dt = −y + u.',
        id: 'Lup umpan balik. Keluaran terukur y dikurangkan dari setpoint untuk membentuk galat e; suku P, I, dan D masing-masing bekerja pada e dan jumlahnya u menggerakkan plant. Pada simulasi ini plant berorde satu: τ·dy/dt = −y + u.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('PID feedback loop block diagram', 'Diagram blok lup umpan balik PID')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.w{stroke:currentColor;stroke-width:1.4;fill:none}.b{fill:none;stroke-width:1.8}.s{font-size:10px}</style>
  <text x="4" y="96">${L('setpoint', 'setpoint')}</text>
  <line x1="8" y1="100" x2="44" y2="100" class="w" marker-end="url(#a)"/>
  <circle cx="58" cy="100" r="11" class="w"/>
  <text x="54" y="104" class="s">Σ</text>
  <text x="40" y="92" class="s">+</text>
  <text x="62" y="124" class="s">−</text>
  <line x1="69" y1="100" x2="92" y2="100" class="w"/>
  <text x="74" y="94" class="s">e</text>
  <line x1="92" y1="63" x2="92" y2="137" class="w"/>
  <line x1="92" y1="63" x2="106" y2="63" class="w" marker-end="url(#a)"/>
  <line x1="92" y1="100" x2="106" y2="100" class="w" marker-end="url(#a)"/>
  <line x1="92" y1="137" x2="106" y2="137" class="w" marker-end="url(#a)"/>
  <rect x="110" y="50" width="66" height="26" rx="4" class="b" stroke="#3b82f6"/>
  <text x="116" y="67" class="s" fill="#3b82f6">P: Kp·e</text>
  <rect x="110" y="87" width="66" height="26" rx="4" class="b" stroke="#10b981"/>
  <text x="116" y="104" class="s" fill="#10b981">I: Ki·∫e dt</text>
  <rect x="110" y="124" width="66" height="26" rx="4" class="b" stroke="#f59e0b"/>
  <text x="116" y="141" class="s" fill="#f59e0b">D: Kd·de/dt</text>
  <line x1="176" y1="63" x2="190" y2="63" class="w"/>
  <line x1="176" y1="100" x2="190" y2="100" class="w"/>
  <line x1="176" y1="137" x2="190" y2="137" class="w"/>
  <line x1="190" y1="63" x2="190" y2="137" class="w"/>
  <line x1="190" y1="100" x2="202" y2="100" class="w" marker-end="url(#a)"/>
  <circle cx="216" cy="100" r="11" class="w"/>
  <text x="212" y="104" class="s">Σ</text>
  <line x1="227" y1="100" x2="244" y2="100" class="w" marker-end="url(#a)"/>
  <text x="230" y="94" class="s">u</text>
  <rect x="248" y="82" width="84" height="36" rx="4" class="b" stroke="#8b5cf6"/>
  <text x="254" y="97" class="s" fill="#8b5cf6">${L('plant', 'plant')}</text>
  <text x="254" y="111" class="s" fill="#8b5cf6">τ·dy/dt = −y + u</text>
  <line x1="332" y1="100" x2="352" y2="100" class="w" marker-end="url(#a)"/>
  <text x="340" y="94" class="s">y</text>
  <circle cx="342" cy="100" r="2.5" fill="currentColor"/>
  <path d="M342 100 L342 180 L58 180 L58 115" class="w" marker-end="url(#a)"/>
  <text x="150" y="196" class="s">${L('feedback: the measured y returns to the comparator', 'umpan balik: y yang terukur kembali ke pembanding')}</text>
  <text x="8" y="222" class="s">${L('error e = setpoint − y;   u = Kp·e + Ki·∫e dt + Kd·de/dt', 'galat e = setpoint − y;   u = Kp·e + Ki·∫e dt + Kd·de/dt')}</text>
  <text x="8" y="236" class="s" opacity=".75">${L('P-only steady state: y = Kp·setpoint / (1 + Kp)', 'Keadaan tunak hanya-P: y = Kp·setpoint / (1 + Kp)')}</text>
  <defs><marker id="a" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="context-stroke"/></marker></defs>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'A PID controller acts on the error e = setpoint − y through three terms: proportional (now), integral (past) and derivative (rate of change).',
        'Proportional control alone leaves a steady-state offset of setpoint/(1 + Kp) on this plant, because it can only produce output while an error exists.',
        'The integral term removes the offset but adds memory, which causes overshoot and, if Ki is large, oscillation.',
        'The derivative term reacts to change; it kicks when the setpoint jumps and matters most in plants with momentum, which this first-order plant lacks.',
        'Tuning is a trade-off between speed, overshoot and steadiness; the lab measures overshoot, settling time and steady-state error to make the trade-off visible.',
      ],
      id: [
        'Pengendali PID bekerja pada galat e = setpoint − y lewat tiga suku: proporsional (saat ini), integral (masa lalu), dan derivatif (laju perubahan).',
        'Kendali proporsional saja menyisakan offset keadaan tunak sebesar setpoint/(1 + Kp) pada plant ini, karena ia hanya bisa menghasilkan keluaran selama ada galat.',
        'Suku integral menghilangkan offset tetapi menambah ingatan, yang menyebabkan overshoot dan, jika Ki besar, osilasi.',
        'Suku derivatif bereaksi pada perubahan; ia menyentak saat setpoint melompat dan paling berarti pada plant yang punya momentum, yang tidak dimiliki plant orde satu ini.',
        'Penyetelan adalah pertukaran antara kecepatan, overshoot, dan kemantapan; lab mengukur overshoot, waktu penetapan, dan galat keadaan tunak agar pertukaran itu terlihat.',
      ],
    },
    vocabulary: {
      en: [
        ['Setpoint', 'The value you want the output to reach and hold.'],
        ['Error (e)', 'Setpoint minus measured output; the quantity the controller tries to drive to zero.'],
        ['Plant', 'The system being controlled; here a first-order system with time constant τ.'],
        ['Time constant (τ)', 'The time a first-order system takes to cover about 63% of the way to its final value after a step input.'],
        ['Gain (Kp, Ki, Kd)', 'The multipliers that set how strongly each term of the controller responds.'],
        ['Steady-state error', 'The error that remains after all transients have died away.'],
        ['Overshoot', 'How far the output goes past the setpoint before settling, usually given as a percentage of the setpoint.'],
        ['Settling time', 'The time after which the output stays within a small band (here 2%) around the setpoint.'],
      ],
      id: [
        ['Setpoint', 'Nilai yang kamu inginkan untuk dicapai dan dipertahankan oleh keluaran.'],
        ['Galat (e)', 'Setpoint dikurangi keluaran terukur; besaran yang coba dinolkan oleh pengendali.'],
        ['Plant', 'Sistem yang dikendalikan; di sini sistem orde satu dengan konstanta waktu τ.'],
        ['Konstanta waktu (τ)', 'Waktu yang dibutuhkan sistem orde satu untuk menempuh sekitar 63% jalan menuju nilai akhirnya setelah masukan tangga.'],
        ['Penguatan (Kp, Ki, Kd)', 'Pengali yang menentukan seberapa kuat tiap suku pengendali merespons.'],
        ['Galat keadaan tunak', 'Galat yang tersisa setelah semua gejolak peralihan mereda.'],
        ['Overshoot', 'Seberapa jauh keluaran melewati setpoint sebelum menetap, biasanya dinyatakan sebagai persentase setpoint.'],
        ['Waktu penetapan', 'Waktu setelah mana keluaran tetap berada dalam pita sempit (di sini 2%) di sekitar setpoint.'],
      ],
    },
    misconceptions: {
      en: [
        ['If Kp is large enough, proportional control alone will reach the setpoint.', 'It gets closer but never arrives: the steady-state error is setpoint/(1 + Kp), which shrinks but is never zero. Only an integral term can hold a nonzero output with zero error.'],
        ['More gain is always faster and therefore better.', 'Faster is not the only goal. Large Ki causes overshoot and oscillation, and in real plants with lag a large Kp can make the loop unstable. Good tuning balances speed against overshoot and robustness.'],
        ['The integral term stops acting once the error is zero.', 'Its output stays at whatever value it has accumulated, which is exactly what holds the plant at the setpoint. It stops changing, not acting; that stored value is what the proportional term alone could never supply.'],
        ['The derivative term always reduces overshoot.', 'It damps oscillation in systems with momentum, but on this first-order plant it mainly adds a kick at setpoint changes and behaves like extra inertia. It also amplifies measurement noise, which is why many industrial loops run as PI only.'],
      ],
      id: [
        ['Jika Kp cukup besar, kendali proporsional saja akan mencapai setpoint.', 'Ia mendekat tetapi tidak pernah tiba: galat keadaan tunaknya setpoint/(1 + Kp), yang mengecil tetapi tidak pernah nol. Hanya suku integral yang dapat mempertahankan keluaran tak nol saat galat nol.'],
        ['Penguatan lebih besar selalu lebih cepat dan karena itu lebih baik.', 'Cepat bukan satu-satunya tujuan. Ki besar menyebabkan overshoot dan osilasi, dan pada plant nyata yang punya keterlambatan, Kp besar dapat membuat lup tidak stabil. Penyetelan yang baik menyeimbangkan kecepatan dengan overshoot dan ketahanan.'],
        ['Suku integral berhenti bekerja begitu galat nol.', 'Keluarannya tetap pada nilai yang sudah terakumulasi, dan justru itulah yang menahan plant di setpoint. Ia berhenti berubah, bukan berhenti bekerja; nilai tersimpan itulah yang tidak pernah bisa disediakan suku proporsional sendiri.'],
        ['Suku derivatif selalu mengurangi overshoot.', 'Ia meredam osilasi pada sistem yang punya momentum, tetapi pada plant orde satu ini ia terutama menambah sentakan saat setpoint berubah dan berperilaku seperti inersia tambahan. Ia juga memperkuat derau pengukuran, dan karena itu banyak lup industri hanya memakai PI.'],
      ],
    },
    realWorld: {
      en: [
        'A car\'s cruise control is a feedback loop: the error between the set speed and the actual speed adjusts the throttle, and the integral term is what holds the speed exactly on a long hill.',
        'Thermostats in ovens, 3D-printer hot ends and incubators use PID to reach a temperature quickly without overshooting and burning the contents.',
        'Drones keep level by running PID loops on their tilt angles hundreds of times per second, adjusting each motor\'s speed; poorly tuned gains make a drone wobble visibly.',
        'Chemical plants and water-treatment works run thousands of PID loops on flows, levels and pressures; most are PI rather than PID because derivative action amplifies sensor noise.',
      ],
      id: [
        'Cruise control pada mobil adalah lup umpan balik: galat antara kecepatan yang diatur dan kecepatan sebenarnya menyesuaikan bukaan gas, dan suku integral-lah yang menahan kecepatan tepat di nilainya pada tanjakan panjang.',
        'Termostat pada oven, ujung panas printer 3D, dan inkubator memakai PID untuk mencapai suhu dengan cepat tanpa overshoot yang bisa membakar isinya.',
        'Drone menjaga posisi datar dengan menjalankan lup PID pada sudut kemiringannya ratusan kali per detik, menyesuaikan kecepatan tiap motor; penguatan yang buruk membuat drone bergoyang terlihat jelas.',
        'Pabrik kimia dan instalasi pengolahan air menjalankan ribuan lup PID untuk aliran, ketinggian, dan tekanan; sebagian besar berupa PI, bukan PID, karena aksi derivatif memperkuat derau sensor.',
      ],
    },
    questions: {
      en: [
        { q: 'Set Ki = 0 and Kd = 0, Kp = 4 and the setpoint to 1. Where does y settle, and what is the steady-state error?', a: 'At steady state dy/dt = 0, so y = u = Kp(1 − y). Solving, y = Kp/(1 + Kp) = 4/5 = 0.8, with an error of 0.2. Raising Kp to 9 would give y = 0.9: closer, but still short.' },
        { q: 'Adding an integral term removes that offset. Explain why, and why the response can then overshoot.', a: 'The integral of the error keeps growing as long as any error remains, so u keeps rising until e is exactly zero; it then holds the value the plant needs. But the integral is still growing while y is approaching the setpoint, so u is already too large when y gets there, and y keeps rising past it. The closed loop has become second-order, so it can overshoot and oscillate.' },
        { q: 'After the loop has settled, press "Disturbance kick". Describe what each term does in the moments that follow.', a: 'The kick drops y by 0.5, so e jumps to 0.5. The P term immediately adds Kp × 0.5 to u; the D term produces a brief spike because e changed abruptly; the I term begins accumulating the new error and rises steadily. As y climbs back, P and D fade, and the integral ends up slightly above where it started, holding y exactly at the setpoint again. With Ki = 0 the plant would still recover, but only to the old offset value.' },
      ],
      id: [
        { q: 'Atur Ki = 0 dan Kd = 0, Kp = 4, dan setpoint 1. Di mana y menetap, dan berapa galat keadaan tunaknya?', a: 'Pada keadaan tunak dy/dt = 0, sehingga y = u = Kp(1 − y). Penyelesaiannya y = Kp/(1 + Kp) = 4/5 = 0,8, dengan galat 0,2. Menaikkan Kp ke 9 memberi y = 0,9: lebih dekat, tetapi tetap kurang.' },
        { q: 'Menambahkan suku integral menghilangkan offset itu. Jelaskan mengapa, dan mengapa responsnya kemudian bisa overshoot.', a: 'Integral galat terus bertambah selama masih ada galat, sehingga u terus naik sampai e tepat nol; setelah itu ia menahan nilai yang dibutuhkan plant. Namun integral masih bertambah selagi y mendekati setpoint, sehingga u sudah terlalu besar ketika y tiba di sana, dan y terus naik melewatinya. Lup tertutup telah menjadi orde dua, sehingga dapat overshoot dan berosilasi.' },
        { q: 'Setelah lup menetap, tekan "Disturbance kick". Uraikan apa yang dilakukan tiap suku pada saat-saat berikutnya.', a: 'Sentakan menjatuhkan y sebesar 0,5, sehingga e melompat ke 0,5. Suku P segera menambahkan Kp × 0,5 ke u; suku D menghasilkan lonjakan singkat karena e berubah mendadak; suku I mulai mengakumulasi galat baru dan naik perlahan. Saat y kembali naik, P dan D memudar, dan integral berakhir sedikit di atas nilai awalnya, menahan y tepat di setpoint lagi. Dengan Ki = 0 plant tetap pulih, tetapi hanya ke nilai offset yang lama.' },
      ],
    },
  },
};
