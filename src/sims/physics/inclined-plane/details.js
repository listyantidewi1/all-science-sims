// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Resolve gravity into parallel (mg sin θ) and perpendicular (mg cos θ) components.',
      'Find the angle at which the block first starts to slide: tan θ = μ_s.',
      'Compute acceleration when sliding: a = g(sin θ − μ_k cos θ).',
    ],
    id: [
      'Menguraikan gravitasi ke komponen sejajar (mg sin θ) dan tegak lurus (mg cos θ).',
      'Mencari sudut saat balok mulai meluncur: tan θ = μ_s.',
      'Menghitung percepatan saat meluncur: a = g(sin θ − μ_k cos θ).',
    ],
  },
  tryThis: {
    en: [
      'μ_s = 0.4 — block stays put until tan θ ≈ 21.8°.',
      'Frictionless — even tiny angle accelerates the block.',
      'μ_s > tan θ — block sticks regardless of mass.',
    ],
    id: [
      'μ_s = 0,4 — balok tetap diam sampai tan θ ≈ 21,8°.',
      'Tanpa gesekan — sudut sekecil apa pun memercepat balok.',
      'μ_s > tan θ — balok tetap diam, tak peduli massa.',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'A block resting on a ramp feels three forces: its weight mg pulling straight down, the normal force N from the surface pushing perpendicular to the ramp, and friction f acting along the surface. The trick that makes the problem easy is to split the weight into two components along axes tied to the ramp. The component mg sin θ points down the slope and tries to make the block slide; the component mg cos θ presses the block into the surface. Because nothing moves perpendicular to the ramp, N = mg cos θ.',
        'Whether the block slides depends on a contest between mg sin θ and the largest friction the surface can provide. Static friction adjusts itself to hold the block still, up to a maximum of μ_s N = μ_s mg cos θ. The block starts to slip when mg sin θ exceeds this, that is when sin θ ÷ cos θ = tan θ is bigger than μ_s. The mass cancels out: the slipping angle θ_s = arctan(μ_s) is the same for a 0.5 kg block and a 50 kg block, which you can confirm with the mass slider. The sim reports this threshold angle and shows the current state, stuck or sliding.',
        'Once the block is moving, friction switches to kinetic friction, which has a fixed size μ_k N and opposes the motion. Newton\'s second law along the slope then gives ma = mg sin θ − μ_k mg cos θ, so a = g(sin θ − μ_k cos θ), again independent of mass. The sim keeps μ_k no larger than μ_s, as for real surfaces, and this is why a block that has just started to slip speeds up rather than creeping: the friction holding it drops the moment it moves.',
        'The free-body diagram overlay draws mg, N and f to scale, with the friction arrow shrinking or growing as the angle changes while the block is stuck. The simulation uses the simplest textbook model: a rigid block, a uniform surface with constant coefficients, no air resistance, and friction that is either fully static or fully kinetic with nothing in between. Real contacts are messier, with coefficients that vary with speed and surface condition, but the model predicts the slip angle of everyday objects remarkably well.',
      ],
      id: [
        'Balok yang diam di bidang miring mengalami tiga gaya: beratnya mg yang menarik lurus ke bawah, gaya normal N dari permukaan yang mendorong tegak lurus bidang, dan gesekan f yang bekerja sepanjang permukaan. Kunci yang membuat soal ini mudah adalah mengurai berat menjadi dua komponen pada sumbu yang mengikuti bidang miring. Komponen mg sin θ mengarah menuruni bidang dan berusaha membuat balok meluncur; komponen mg cos θ menekan balok ke permukaan. Karena tidak ada gerak tegak lurus bidang, N = mg cos θ.',
        'Apakah balok meluncur bergantung pada perlombaan antara mg sin θ dan gesekan terbesar yang dapat diberikan permukaan. Gesekan statis menyesuaikan diri untuk menahan balok diam, sampai nilai maksimum μ_s N = μ_s mg cos θ. Balok mulai tergelincir ketika mg sin θ melebihi nilai itu, yaitu ketika sin θ ÷ cos θ = tan θ lebih besar daripada μ_s. Massanya saling meniadakan: sudut gelincir θ_s = arctan(μ_s) sama untuk balok 0,5 kg maupun 50 kg, dan ini bisa kamu buktikan dengan slider massa. Simulasi menampilkan sudut ambang ini dan keadaan balok saat itu, diam atau meluncur.',
        'Begitu balok bergerak, gesekan berganti menjadi gesekan kinetis yang besarnya tetap μ_k N dan melawan arah gerak. Hukum kedua Newton sepanjang bidang memberikan ma = mg sin θ − μ_k mg cos θ, sehingga a = g(sin θ − μ_k cos θ), yang juga tidak bergantung pada massa. Simulasi menjaga μ_k tidak lebih besar dari μ_s, seperti pada permukaan sungguhan, dan inilah sebabnya balok yang baru tergelincir langsung bertambah cepat alih-alih merayap: gesekan yang menahannya berkurang begitu balok bergerak.',
        'Lapisan diagram benda bebas menggambar mg, N dan f sesuai skala, dengan panah gesekan yang mengecil atau membesar saat sudut berubah selama balok masih diam. Simulasi memakai model buku teks yang paling sederhana: balok tegar, permukaan seragam dengan koefisien tetap, tanpa hambatan udara, dan gesekan yang sepenuhnya statis atau sepenuhnya kinetis tanpa keadaan antara. Kontak sungguhan lebih rumit, dengan koefisien yang berubah terhadap kelajuan dan kondisi permukaan, tetapi model ini memprediksi sudut gelincir benda sehari-hari dengan sangat baik.',
      ],
    },
    figure: {
      caption: {
        en: 'Free-body diagram of a block on a slope. The weight mg is split into mg sin θ along the slope and mg cos θ into it. The normal force balances mg cos θ, and friction f opposes mg sin θ. The block slips when tan θ exceeds μ_s.',
        id: 'Diagram benda bebas balok di bidang miring. Berat mg diurai menjadi mg sin θ sepanjang bidang dan mg cos θ ke dalam bidang. Gaya normal mengimbangi mg cos θ, dan gesekan f melawan mg sin θ. Balok tergelincir ketika tan θ melebihi μ_s.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Forces on a block resting on an inclined plane', 'Gaya-gaya pada balok yang diam di bidang miring')}">
  <style>text{font:12px system-ui,sans-serif;fill:currentColor}.s{font-size:10px}.m{fill:none;stroke:currentColor;stroke-width:1.3}.f{stroke-width:2.2;fill:none}.c{stroke-width:1.6;fill:none;stroke-dasharray:4 3}</style>
  <defs>
    <marker id="ar" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto"><path d="M0 0 L7 3.5 L0 7 z" fill="#ef4444"/></marker>
    <marker id="ag" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto"><path d="M0 0 L7 3.5 L0 7 z" fill="#10b981"/></marker>
    <marker id="ap" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto"><path d="M0 0 L7 3.5 L0 7 z" fill="#8b5cf6"/></marker>
    <marker id="ao" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto"><path d="M0 0 L7 3.5 L0 7 z" fill="#f59e0b"/></marker>
  </defs>
  <line x1="20" y1="200" x2="340" y2="200" class="m" opacity=".6"/>
  <path d="M40 200 L300 60 L300 200 Z" class="m"/>
  <path d="M70 200 A30 30 0 0 0 66.4 185.8" class="m" stroke="#f59e0b"/>
  <text x="76" y="194" fill="#f59e0b">θ</text>
  <rect x="150" y="100" width="40" height="30" fill="#3b82f6" transform="rotate(-28.3 170 130)"/>
  <circle cx="163" cy="117" r="2.5" fill="currentColor"/>
  <line x1="163" y1="117" x2="163" y2="187" class="f" stroke="#ef4444" marker-end="url(#ar)"/>
  <text x="169" y="190" fill="#ef4444">mg</text>
  <line x1="163" y1="117" x2="133.5" y2="62.4" class="f" stroke="#10b981" marker-end="url(#ag)"/>
  <text x="112" y="58" fill="#10b981">N = mg cos θ</text>
  <line x1="163" y1="117" x2="192" y2="101" class="f" stroke="#8b5cf6" marker-end="url(#ap)"/>
  <text x="196" y="96" fill="#8b5cf6">f</text>
  <line x1="163" y1="117" x2="134" y2="133" class="c" stroke="#f59e0b" marker-end="url(#ao)"/>
  <text x="68" y="146" fill="#f59e0b" class="s">mg sin θ</text>
  <line x1="163" y1="117" x2="192.5" y2="171.6" class="c" stroke="#f59e0b" marker-end="url(#ao)"/>
  <text x="198" y="178" fill="#f59e0b" class="s">mg cos θ</text>
  <text x="20" y="24" class="s">${L('at rest: f = mg sin θ, up to μ_s N', 'diam: f = mg sin θ, maksimum μ_s N')}</text>
  <text x="20" y="38" class="s">${L('sliding: f = μ_k N, a = g(sin θ − μ_k cos θ)', 'meluncur: f = μ_k N, a = g(sin θ − μ_k cos θ)')}</text>
  <text x="200" y="222" class="s">${L('slips when tan θ exceeds μ_s', 'tergelincir saat tan θ melebihi μ_s')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'On a slope, weight resolves into mg sin θ along the surface and mg cos θ perpendicular to it, so N = mg cos θ.',
        'Static friction adjusts to hold the block, up to a maximum of μ_s N; the block slips when tan θ exceeds μ_s.',
        'The slipping angle θ_s = arctan(μ_s) does not depend on the mass of the block.',
        'While sliding, friction is μ_k N and the acceleration is a = g(sin θ − μ_k cos θ), also independent of mass.',
        'Because μ_k is less than μ_s, a block that has just begun to slip accelerates instead of creeping.',
      ],
      id: [
        'Di bidang miring, berat terurai menjadi mg sin θ sepanjang permukaan dan mg cos θ tegak lurus permukaan, sehingga N = mg cos θ.',
        'Gesekan statis menyesuaikan diri untuk menahan balok, sampai maksimum μ_s N; balok tergelincir ketika tan θ melebihi μ_s.',
        'Sudut gelincir θ_s = arctan(μ_s) tidak bergantung pada massa balok.',
        'Saat meluncur, gesekannya μ_k N dan percepatannya a = g(sin θ − μ_k cos θ), juga tidak bergantung pada massa.',
        'Karena μ_k lebih kecil dari μ_s, balok yang baru mulai tergelincir langsung dipercepat, bukan merayap.',
      ],
    },
    vocabulary: {
      en: [
        ['Normal force (N)', 'The push from a surface on an object, always perpendicular to the surface; on a slope it equals mg cos θ.'],
        ['Static friction', 'Friction that stops surfaces from starting to slide. It takes whatever value is needed to hold the object, up to a maximum μ_s N.'],
        ['Kinetic friction', 'Friction between surfaces that are already sliding; roughly constant, equal to μ_k N, and directed against the motion.'],
        ['Coefficient of friction (μ)', 'A number without units describing how rough a pair of surfaces is; μ_s for the static case, μ_k for sliding, with μ_k ≤ μ_s.'],
        ['Resolving a force', 'Splitting one force into two perpendicular components that together have the same effect.'],
        ['Free-body diagram', 'A sketch showing an object alone with arrows for every force acting on it.'],
        ['Angle of repose', 'The steepest angle at which an object or a pile of material stays put, equal to arctan(μ_s).'],
      ],
      id: [
        ['Gaya normal (N)', 'Dorongan permukaan pada benda, selalu tegak lurus permukaan; di bidang miring besarnya mg cos θ.'],
        ['Gesekan statis', 'Gesekan yang mencegah permukaan mulai meluncur. Besarnya menyesuaikan kebutuhan untuk menahan benda, sampai maksimum μ_s N.'],
        ['Gesekan kinetis', 'Gesekan antara permukaan yang sudah meluncur; hampir tetap, sebesar μ_k N, dan berlawanan arah dengan gerak.'],
        ['Koefisien gesekan (μ)', 'Bilangan tanpa satuan yang menyatakan kekasaran sepasang permukaan; μ_s untuk keadaan diam, μ_k untuk meluncur, dengan μ_k ≤ μ_s.'],
        ['Menguraikan gaya', 'Memecah satu gaya menjadi dua komponen yang saling tegak lurus dan bersama-sama memberi pengaruh yang sama.'],
        ['Diagram benda bebas', 'Sketsa yang menampilkan benda secara terpisah dengan panah untuk setiap gaya yang bekerja padanya.'],
        ['Sudut diam (angle of repose)', 'Sudut paling curam yang masih membuat benda atau tumpukan bahan tetap diam, sama dengan arctan(μ_s).'],
      ],
    },
    misconceptions: {
      en: [
        ['A heavier block slides at a smaller angle because gravity pulls it harder.', 'Gravity pulls it harder, but it also presses it harder into the ramp, so friction grows in the same proportion. Mass cancels: the slip angle depends only on μ_s.'],
        ['The normal force always equals the weight.', 'Only on a horizontal surface. On a slope the surface supports just the perpendicular part of the weight, N = mg cos θ, which shrinks toward zero as the ramp becomes vertical.'],
        ['Static friction is always equal to μ_s N.', 'That is only its maximum. On a gentle slope static friction is exactly mg sin θ, just enough to balance the pull; the sim\'s friction arrow grows with angle until the limit is reached.'],
        ['Friction always acts opposite to the direction of gravity.', 'Friction acts along the surface, opposing the sliding or the tendency to slide. On a ramp it points up the slope, not straight up.'],
      ],
      id: [
        ['Balok yang lebih berat tergelincir pada sudut lebih kecil karena gravitasi menariknya lebih kuat.', 'Gravitasi memang menariknya lebih kuat, tetapi juga menekannya lebih kuat ke bidang, sehingga gesekan bertambah dengan perbandingan yang sama. Massa saling meniadakan: sudut gelincir hanya bergantung pada μ_s.'],
        ['Gaya normal selalu sama dengan berat.', 'Hanya pada permukaan mendatar. Di bidang miring permukaan hanya menopang bagian berat yang tegak lurus, N = mg cos θ, yang mengecil menuju nol saat bidang mendekati tegak.'],
        ['Gesekan statis selalu sebesar μ_s N.', 'Itu hanya nilai maksimumnya. Pada bidang yang landai gesekan statis tepat sebesar mg sin θ, pas untuk mengimbangi tarikan; panah gesekan di simulasi membesar seiring sudut sampai batasnya tercapai.'],
        ['Gesekan selalu berlawanan dengan arah gravitasi.', 'Gesekan bekerja sepanjang permukaan, melawan gerak meluncur atau kecenderungan meluncur. Di bidang miring arahnya menaiki bidang, bukan lurus ke atas.'],
      ],
    },
    realWorld: {
      en: [
        'Wheelchair ramps are built with gentle slopes (about 5°) so that a chair can be held still by friction and brakes without sliding.',
        'The angle at which a pile of sand or grain stops growing steeper is its angle of repose, set by the friction between the grains.',
        'Roof pitches in snowy regions are chosen so that snow slides off before it becomes dangerously heavy.',
        'Dump trucks tip their beds to about 45° or more because dry gravel has μ_s near 0.6 to 0.7 and must exceed its slip angle to pour out.',
      ],
      id: [
        'Jalur kursi roda dibuat landai (sekitar 5°) agar kursi dapat ditahan diam oleh gesekan dan rem tanpa meluncur.',
        'Sudut ketika tumpukan pasir atau biji-bijian berhenti bertambah curam adalah sudut diamnya, yang ditentukan oleh gesekan antarbutir.',
        'Kemiringan atap di daerah bersalju dipilih supaya salju meluncur turun sebelum menjadi terlalu berat dan membahayakan.',
        'Truk pengangkut memiringkan baknya sampai sekitar 45° atau lebih karena kerikil kering memiliki μ_s sekitar 0,6 sampai 0,7 dan harus melewati sudut gelincirnya agar tumpah keluar.',
      ],
    },
    questions: {
      en: [
        { q: 'With μ_s = 0.50, at what angle does the block start to slide? Does changing the mass from 5 kg to 40 kg move that angle?', a: 'At about 26.6°, since tan θ_s = μ_s gives θ_s = arctan(0.50). The mass makes no difference: both the pull down the slope and the maximum friction are proportional to mg, so it cancels out of the condition.' },
        { q: 'The ramp is at 30° and the block is sliding with μ_k = 0.25. What acceleration does the sim report?', a: 'a = g(sin 30° − 0.25 cos 30°) = 9.8 × (0.500 − 0.217) ≈ 2.8 m/s². Without friction it would be 4.9 m/s², so kinetic friction removes almost half the acceleration here.' },
        { q: 'Set θ = 10° with μ_s = 0.30. The friction arrow in the free-body diagram is shorter than the maximum static friction shown in the readout. Why?', a: 'Static friction only supplies what is needed. At 10° the pull down the slope is mg sin 10° ≈ 0.17 mg, while the maximum available is 0.30 × mg cos 10° ≈ 0.30 mg. Friction equals the smaller value, 0.17 mg, so the block stays at rest with friction to spare.' },
      ],
      id: [
        { q: 'Dengan μ_s = 0,50, pada sudut berapa balok mulai meluncur? Apakah mengubah massa dari 5 kg menjadi 40 kg menggeser sudut itu?', a: 'Pada sekitar 26,6°, karena tan θ_s = μ_s memberikan θ_s = arctan(0,50). Massa tidak berpengaruh: tarikan menuruni bidang dan gesekan maksimum sama-sama sebanding dengan mg, sehingga massa hilang dari syaratnya.' },
        { q: 'Bidang miring bersudut 30° dan balok meluncur dengan μ_k = 0,25. Berapa percepatan yang ditampilkan simulasi?', a: 'a = g(sin 30° − 0,25 cos 30°) = 9,8 × (0,500 − 0,217) ≈ 2,8 m/s². Tanpa gesekan nilainya 4,9 m/s², jadi gesekan kinetis di sini menghilangkan hampir setengah percepatannya.' },
        { q: 'Atur θ = 10° dengan μ_s = 0,30. Panah gesekan pada diagram benda bebas lebih pendek daripada gesekan statis maksimum yang tertulis di panel. Mengapa?', a: 'Gesekan statis hanya memberi sebesar yang diperlukan. Pada 10° tarikan menuruni bidang adalah mg sin 10° ≈ 0,17 mg, sedangkan maksimum yang tersedia 0,30 × mg cos 10° ≈ 0,30 mg. Gesekan sama dengan nilai yang lebih kecil, 0,17 mg, sehingga balok tetap diam dengan gesekan yang masih tersisa.' },
      ],
    },
  },
};
