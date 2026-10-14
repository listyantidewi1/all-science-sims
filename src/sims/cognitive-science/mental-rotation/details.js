// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Experience that mental rotation feels like real rotation (takes time).',
      'See the linear RT-vs-angle relationship across many trials.',
      'Recognize that mirror images cannot be rotated to match — different category.',
    ],
    id: [
      'Mengalami bahwa rotasi mental terasa seperti rotasi nyata (butuh waktu).',
      'Melihat hubungan linear RT vs sudut.',
      'Mengenali bahwa cermin tidak bisa diputar untuk cocok — kategori berbeda.',
    ],
  },  tryThis: {
    en: [
      'Run 20 trials — your RT correlates with the angle.',
      'Try mirror trials — also RT-vs-angle dependence.',
      'Compare to the typical 60–80°/s rotation rate.',
    ],
    id: [
      'Jalankan 20 percobaan — RT Anda berkorelasi dengan sudut.',
      'Coba percobaan cermin — juga ketergantungan RT-vs-sudut.',
      'Bandingkan dengan laju rotasi tipikal 60-80°/det.',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'Look at a letter R lying on its side and you can tell, after a moment, whether it is a normal R or a backwards one. That moment is the subject of one of the most influential experiments in cognitive psychology. In 1971 Roger Shepard and Jacqueline Metzler showed people pairs of drawings of three-dimensional block shapes and asked whether the two were the same object in different orientations or mirror images. Response time rose in a straight line with the angle between the two views, by roughly one second for every 60°, whether the rotation was in the picture plane or in depth. The simplest explanation is that people rotate a mental image of one shape until it lines up with the other, at a steady rate, and the larger the angle, the longer the rotation takes.',
        'Shortly afterwards Lynn Cooper and Shepard (1973) found the same pattern with rotated letters and digits judged as normal or mirror-reversed: response time grew with the angle from upright, peaking at 180°. Familiar characters are rotated much faster than Shepard and Metzler\'s unfamiliar blocks, several hundred degrees per second rather than 60°/s, but the linear rise is the same. The result matters because it suggests that at least some thinking uses analogue representations that preserve the spatial structure of the world, rather than only abstract descriptions. A mirror image can never be brought into register by rotation in the plane, which is why the task forces a rotation before the same-or-mirror decision can be made.',
        'The simulation reproduces the letter version. The left R is the reference; the right R is drawn at a random angle anywhere between −180° and +180° and, on half the trials, mirror-reversed before rotation. Press Same (rotated) or Mirror image; the time from when the pair appeared to your click is recorded and plotted against the absolute rotation angle, in blue for correct same responses, violet for correct mirror responses and red for errors. A new pair appears 0.8 s after each answer. With twenty or more trials you should see the points climb from left to right, approximately along a line: RT ≈ RT₀ + angle ÷ rotation rate, where RT₀ (typically 500–800 ms) is the time for encoding the shapes, deciding and moving the mouse.',
        'Keep the limits in mind. Your times include mouse movement and any hesitation, so single points scatter widely and only the trend over many trials is meaningful. There are no practice trials and no response deadline, and a few people learn to spot mirror images from a local feature of the R without rotating at all, which flattens their line. The sim uses planar rotation of a two-dimensional letter, not rotation in depth of a three-dimensional object, so your rate will be far above the 60°/s that the manifest quotes from Shepard and Metzler; rates well above 200°/s are normal for letters. Clockwise and anticlockwise rotations are pooled, which is reasonable because the two give the same times in the classic data.',
      ],
      id: [
        'Lihatlah huruf R yang terbaring miring dan setelah sesaat kamu bisa mengatakan apakah itu R normal atau R terbalik. Sesaat itulah yang menjadi pokok salah satu eksperimen paling berpengaruh dalam psikologi kognitif. Pada 1971 Roger Shepard dan Jacqueline Metzler menunjukkan kepada orang-orang pasangan gambar bentuk balok tiga dimensi dan menanyakan apakah keduanya adalah objek yang sama dalam orientasi berbeda atau bayangan cermin. Waktu respons naik secara garis lurus bersama sudut antara kedua pandangan, kira-kira satu detik untuk tiap 60°, baik rotasinya di bidang gambar maupun di kedalaman. Penjelasan paling sederhana adalah orang memutar citra mental salah satu bentuk sampai sejajar dengan yang lain, dengan laju tetap, dan makin besar sudutnya makin lama rotasinya.',
        'Tidak lama kemudian Lynn Cooper dan Shepard (1973) menemukan pola yang sama dengan huruf dan angka yang diputar lalu dinilai normal atau terbalik cermin: waktu respons bertambah bersama sudut dari posisi tegak, memuncak pada 180°. Karakter yang dikenal diputar jauh lebih cepat daripada balok asing Shepard dan Metzler, beberapa ratus derajat per detik dan bukan 60°/s, tetapi kenaikan linearnya sama. Hasil ini penting karena menunjukkan bahwa setidaknya sebagian pemikiran memakai representasi analog yang mempertahankan struktur ruang dunia, bukan hanya deskripsi abstrak. Bayangan cermin tidak pernah bisa disejajarkan dengan rotasi di bidang, itulah sebabnya tugas ini memaksa rotasi sebelum keputusan sama-atau-cermin dapat dibuat.',
        'Simulasi mereproduksi versi huruf. R di kiri adalah acuan; R di kanan digambar pada sudut acak di mana saja antara −180° dan +180° dan, pada setengah percobaan, dibalik cermin sebelum diputar. Tekan Same (rotated) atau Mirror image; waktu dari munculnya pasangan sampai klikmu dicatat dan diplot terhadap sudut rotasi mutlak, biru untuk respons sama yang benar, ungu untuk respons cermin yang benar, dan merah untuk kesalahan. Pasangan baru muncul 0,8 s setelah tiap jawaban. Dengan dua puluh percobaan atau lebih kamu seharusnya melihat titik-titik naik dari kiri ke kanan, kira-kira sepanjang garis: RT ≈ RT₀ + sudut ÷ laju rotasi, dengan RT₀ (biasanya 500–800 ms) adalah waktu untuk menyandikan bentuk, memutuskan, dan menggerakkan mouse.',
        'Ingat batasannya. Waktumu mencakup gerakan mouse dan keraguan apa pun, sehingga titik tunggal tersebar lebar dan hanya tren dari banyak percobaan yang bermakna. Tidak ada percobaan latihan dan tidak ada batas waktu respons, dan sebagian orang belajar mengenali bayangan cermin dari ciri lokal huruf R tanpa memutar sama sekali, yang mendatarkan garis mereka. Simulasi memakai rotasi bidang dari huruf dua dimensi, bukan rotasi kedalaman objek tiga dimensi, sehingga lajumu akan jauh di atas 60°/s yang dikutip manifest dari Shepard dan Metzler; laju jauh di atas 200°/s wajar untuk huruf. Rotasi searah dan berlawanan arah jarum jam digabung, yang masuk akal karena keduanya memberi waktu yang sama dalam data klasik.',
      ],
    },
    figure: {
      caption: {
        en: 'Response time rises linearly with the angle between the test shape and the upright reference, as if the shape were being turned at a constant rate. The intercept is the time needed for everything other than rotating; the slope is the inverse of the rotation rate. A mirror image stays mismatched at every angle.',
        id: 'Waktu respons naik secara linear bersama sudut antara bentuk uji dan acuan tegak, seolah bentuk itu diputar dengan laju tetap. Titik potongnya adalah waktu untuk segala hal selain memutar; kemiringannya adalah kebalikan laju rotasi. Bayangan cermin tetap tidak cocok pada sudut mana pun.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        const R = (x, y, angle, mirror, col) => `<path d="M-4 -10 L-4 10 M-4 -10 L2 -10 L4 -6 L2 -2 L-4 -2 M0 -2 L4 10" fill="none" stroke="${col}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" transform="translate(${x} ${y}) rotate(${angle})${mirror ? ' scale(-1 1)' : ''}"/>`;
        const pts = [[0, 182], [30, 170], [45, 168], [60, 158], [90, 148], [105, 138], [120, 134], [150, 118], [165, 112], [180, 102]];
        const dots = pts.map(([a, y], i) => `<circle cx="${50 + a / 180 * 260}" cy="${y + (i % 2 ? 4 : -4)}" r="3" fill="${i % 3 === 1 ? '#8b5cf6' : '#3b82f6'}"/>`).join('');
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Response time versus rotation angle', 'Waktu respons terhadap sudut rotasi')}">
  <style>text{font:10px system-ui,sans-serif;fill:currentColor}.b{font-weight:700;font-size:11px}.s{font-size:9px;opacity:.85}.ax{stroke:currentColor;stroke-width:1;opacity:.6}</style>
  <defs><marker id="mr" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="currentColor"/></marker></defs>
  <text x="180" y="14" text-anchor="middle" class="b">${L('Same or mirror? Response time vs rotation angle', 'Sama atau cermin? Waktu respons vs sudut rotasi')}</text>
  <line x1="50" y1="190" x2="320" y2="190" class="ax"/>
  <line x1="50" y1="190" x2="50" y2="40" class="ax"/>
  <line x1="50" y1="182" x2="310" y2="102" stroke="#f59e0b" stroke-width="2"/>
  ${dots}
  <line x1="50" y1="182" x2="50" y2="190" stroke="#10b981" stroke-width="3"/>
  <line x1="40" y1="182" x2="56" y2="182" stroke="#10b981" stroke-width="1" stroke-dasharray="2 2"/>
  <text x="56" y="178" fill="#10b981" class="s">RT₀: ${L('encode + decide + respond', 'sandikan + putuskan + respons')}</text>
  <line x1="200" y1="136" x2="260" y2="136" stroke="#ef4444" stroke-width="1" stroke-dasharray="2 2"/>
  <line x1="260" y1="136" x2="260" y2="118" stroke="#ef4444" stroke-width="1" stroke-dasharray="2 2"/>
  <text x="266" y="130" fill="#ef4444" class="s">${L('slope = 1 / rate', 'kemiringan = 1 / laju')}</text>
  <text x="34" y="60" text-anchor="middle" class="s" transform="rotate(-90 34 60)">RT</text>
  <text x="46" y="106" text-anchor="end" class="s">${L('long', 'lama')}</text>
  <text x="46" y="186" text-anchor="end" class="s">${L('short', 'singkat')}</text>
  ${R(50, 212, 0, false, 'currentColor')}
  ${R(115, 212, 45, false, 'currentColor')}
  ${R(180, 212, 90, false, 'currentColor')}
  ${R(245, 212, 135, false, 'currentColor')}
  ${R(310, 212, 180, false, 'currentColor')}
  <text x="50" y="234" text-anchor="middle" class="s">0°</text>
  <text x="115" y="234" text-anchor="middle" class="s">45°</text>
  <text x="180" y="234" text-anchor="middle" class="s">90°</text>
  <text x="245" y="234" text-anchor="middle" class="s">135°</text>
  <text x="310" y="234" text-anchor="middle" class="s">180°</text>
  <rect x="268" y="40" width="84" height="48" rx="5" fill="#8b5cf6" fill-opacity=".15" stroke="#8b5cf6" stroke-width="1"/>
  ${R(286, 64, 0, false, 'currentColor')}
  <text x="302" y="68" text-anchor="middle" class="s">vs</text>
  ${R(320, 64, 0, true, '#8b5cf6')}
  <text x="310" y="84" text-anchor="middle" fill="#8b5cf6" class="s">${L('mirror: never matches', 'cermin: tak pernah cocok')}</text>
  <text x="140" y="50" class="s">${L('blue = same, violet = mirror', 'biru = sama, ungu = cermin')}</text>
  <text x="140" y="62" class="s">${L('both climb with angle', 'keduanya naik bersama sudut')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Deciding whether a rotated shape matches a reference takes longer the further it is rotated, and the increase is close to linear.',
        'The linear law fits the idea that people rotate a mental image at a roughly constant rate until it lines up.',
        'The intercept of the RT-versus-angle line is the time for seeing, deciding and responding; the slope is the inverse of the rotation rate.',
        'A mirror image cannot be matched by any planar rotation, so mirror judgements also require rotating first and then detecting the mismatch.',
        'Familiar letters are rotated several times faster than unfamiliar three-dimensional shapes, but the shape of the law is the same.',
      ],
      id: [
        'Memutuskan apakah bentuk yang diputar cocok dengan acuan butuh waktu lebih lama makin jauh rotasinya, dan kenaikannya hampir linear.',
        'Hukum linear ini cocok dengan gagasan bahwa orang memutar citra mental dengan laju yang kira-kira tetap sampai sejajar.',
        'Titik potong garis RT terhadap sudut adalah waktu untuk melihat, memutuskan, dan merespons; kemiringannya adalah kebalikan laju rotasi.',
        'Bayangan cermin tidak bisa dicocokkan oleh rotasi bidang mana pun, sehingga penilaian cermin juga memerlukan rotasi dulu lalu mendeteksi ketidakcocokan.',
        'Huruf yang dikenal diputar beberapa kali lebih cepat daripada bentuk tiga dimensi yang asing, tetapi bentuk hukumnya sama.',
      ],
    },
    vocabulary: {
      en: [
        ['Mental rotation', 'Imagining an object turning in order to compare it with another view; its duration grows with the angle.'],
        ['Angular disparity', 'The angle between the orientations of the two shapes being compared, from 0° to 180°.'],
        ['Mirror image (enantiomorph)', 'A shape reflected about an axis; it cannot be made to coincide with the original by rotation in the plane.'],
        ['Response time (RT)', 'The time from the appearance of the stimulus to the response; here, from the pair appearing to your click.'],
        ['Intercept', 'The RT predicted at 0° rotation: the time needed for encoding, comparison and the motor response.'],
        ['Rotation rate', 'Degrees of mental rotation per second, equal to one over the slope of the RT-versus-angle line.'],
        ['Analogue representation', 'A mental representation that preserves the spatial or continuous structure of what it stands for, like a picture or a model.'],
      ],
      id: [
        ['Rotasi mental', 'Membayangkan sebuah objek berputar untuk membandingkannya dengan pandangan lain; lamanya bertambah bersama sudut.'],
        ['Disparitas sudut', 'Sudut antara orientasi dua bentuk yang dibandingkan, dari 0° sampai 180°.'],
        ['Bayangan cermin (enantiomorf)', 'Bentuk yang dicerminkan terhadap suatu sumbu; tidak bisa dibuat berimpit dengan aslinya melalui rotasi di bidang.'],
        ['Waktu respons (RT)', 'Waktu dari munculnya stimulus sampai respons; di sini, dari munculnya pasangan sampai klikmu.'],
        ['Titik potong', 'RT yang diprediksi pada rotasi 0°: waktu yang dibutuhkan untuk menyandikan, membandingkan, dan respons motorik.'],
        ['Laju rotasi', 'Derajat rotasi mental per detik, sama dengan satu per kemiringan garis RT terhadap sudut.'],
        ['Representasi analog', 'Representasi mental yang mempertahankan struktur ruang atau kontinu dari yang diwakilinya, seperti gambar atau model.'],
      ],
    },
    misconceptions: {
      en: [
        ['Recognising a rotated shape is instant; the brain just "knows" it.', 'The data say otherwise: a shape rotated 180° takes measurably longer to judge than an upright one, and the extra time grows steadily with angle, as if a real rotation were being performed.'],
        ['Mirror-image trials should be faster because the mismatch is obvious.', 'In the classic experiments mirror judgements take as long as, or slightly longer than, same judgements and show the same dependence on angle: people rotate first and only then notice that the shapes still do not match.'],
        ['The slope of the line tells you how fast someone perceives.', 'The slope reflects only the rotation stage. Perception, decision and the motor response are all in the intercept, which is why two people can share a slope but differ in overall speed.'],
        ['Everyone rotates at the famous 60° per second.', 'That figure is for unfamiliar three-dimensional block shapes. Letters are rotated several times faster, and rates vary between people and improve with practice.'],
      ],
      id: [
        ['Mengenali bentuk yang diputar itu seketika; otak langsung "tahu".', 'Datanya berkata lain: bentuk yang diputar 180° butuh waktu lebih lama secara terukur untuk dinilai dibanding yang tegak, dan waktu tambahannya bertambah mantap bersama sudut, seolah rotasi sungguhan sedang dilakukan.'],
        ['Percobaan bayangan cermin seharusnya lebih cepat karena ketidakcocokannya jelas.', 'Dalam eksperimen klasik penilaian cermin memakan waktu sama lama atau sedikit lebih lama daripada penilaian sama dan menunjukkan ketergantungan yang sama pada sudut: orang memutar dulu dan baru kemudian menyadari bentuknya tetap tidak cocok.'],
        ['Kemiringan garis memberi tahu seberapa cepat seseorang mempersepsi.', 'Kemiringan hanya mencerminkan tahap rotasi. Persepsi, keputusan, dan respons motorik semuanya ada di titik potong, itulah sebabnya dua orang bisa punya kemiringan sama tetapi berbeda kecepatan keseluruhan.'],
        ['Semua orang memutar dengan laju terkenal 60° per detik.', 'Angka itu untuk bentuk balok tiga dimensi yang asing. Huruf diputar beberapa kali lebih cepat, dan lajunya berbeda antar orang serta membaik dengan latihan.'],
      ],
    },
    realWorld: {
      en: [
        'Reading a map that is not aligned with your direction of travel requires mental rotation, which is why many navigation apps rotate the map to "heads-up" mode.',
        'Surgeons using laparoscopic cameras and pilots interpreting instrument displays routinely rotate mental images; mental-rotation tests are used in selection and training for both.',
        'Mental rotation tasks appear in spatial-ability tests for engineering and architecture, and practice, including with certain video games, measurably improves scores.',
        'Brain imaging shows parietal cortex and, for some people, motor areas active during mental rotation, consistent with the idea that imagining a rotation borrows machinery used for perceiving and producing real ones.',
      ],
      id: [
        'Membaca peta yang tidak sejajar dengan arah perjalananmu memerlukan rotasi mental, itulah sebabnya banyak aplikasi navigasi memutar peta ke mode "searah pandang".',
        'Ahli bedah yang memakai kamera laparoskopi dan pilot yang menafsirkan tampilan instrumen rutin memutar citra mental; tes rotasi mental dipakai dalam seleksi dan pelatihan keduanya.',
        'Tugas rotasi mental muncul dalam tes kemampuan spasial untuk teknik dan arsitektur, dan latihan, termasuk dengan gim video tertentu, terukur meningkatkan skornya.',
        'Pencitraan otak menunjukkan korteks parietal dan, pada sebagian orang, area motorik aktif selama rotasi mental, sejalan dengan gagasan bahwa membayangkan rotasi meminjam perangkat yang dipakai untuk mempersepsi dan melakukan rotasi nyata.',
      ],
    },
    questions: {
      en: [
        { q: 'Your plotted points run from about 700 ms at 0° to about 1,600 ms at 180°. Estimate your mental rotation rate and your intercept.', a: 'Slope = (1600 − 700) / 180 = 5 ms per degree, so the rate is 1000 / 5 = 200° per second. The intercept of about 700 ms is the time for encoding both shapes, deciding and clicking.' },
        { q: 'Shepard and Metzler found about one extra second per 60° of rotation for 3D block shapes. If a pair differs by 150°, what response time does that predict for a participant whose 0° time is 1.0 s, and why would your own times for the letter R be much shorter?', a: 'Slope ≈ 1 s / 60° ≈ 16.7 ms per degree, so 150° adds about 2.5 s: RT ≈ 3.5 s. Letters are familiar, two-dimensional and rotated in the picture plane, so people rotate them several times faster.' },
        { q: 'Why must a participant rotate the shape even on mirror trials, when the correct answer is that the shapes are different?', a: 'A mirror image at an unknown angle looks like it might be a rotated normal shape; nothing in the picture says "mirror" by itself. Only after bringing the test shape into alignment can the participant see that the parts still do not coincide, so mirror trials show the same rise of RT with angle.' },
      ],
      id: [
        { q: 'Titik-titik di grafikmu berjalan dari sekitar 700 ms pada 0° ke sekitar 1.600 ms pada 180°. Perkirakan laju rotasi mentalmu dan titik potongnya.', a: 'Kemiringan = (1600 − 700) / 180 = 5 ms per derajat, sehingga lajunya 1000 / 5 = 200° per detik. Titik potong sekitar 700 ms adalah waktu untuk menyandikan kedua bentuk, memutuskan, dan mengklik.' },
        { q: 'Shepard dan Metzler menemukan sekitar satu detik tambahan per 60° rotasi untuk bentuk balok 3D. Jika sepasang bentuk berbeda 150°, berapa waktu respons yang diprediksi untuk peserta dengan waktu 0° sebesar 1,0 s, dan mengapa waktumu sendiri untuk huruf R jauh lebih singkat?', a: 'Kemiringan ≈ 1 s / 60° ≈ 16,7 ms per derajat, sehingga 150° menambah sekitar 2,5 s: RT ≈ 3,5 s. Huruf itu dikenal, dua dimensi, dan diputar di bidang gambar, sehingga orang memutarnya beberapa kali lebih cepat.' },
        { q: 'Mengapa peserta tetap harus memutar bentuk pada percobaan cermin, padahal jawaban yang benar adalah bentuknya berbeda?', a: 'Bayangan cermin pada sudut yang tidak diketahui tampak seperti mungkin saja bentuk normal yang diputar; tidak ada bagian gambar yang dengan sendirinya mengatakan "cermin". Hanya setelah menyejajarkan bentuk uji, peserta dapat melihat bahwa bagian-bagiannya tetap tidak berimpit, sehingga percobaan cermin menunjukkan kenaikan RT yang sama bersama sudut.' },
      ],
    },
  },
};
