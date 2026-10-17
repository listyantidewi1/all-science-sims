// Long-form text for the Reflex Arc sim (grade 11–12).
export default {
  objectives: {
    en: [
      'Trace the five parts of a reflex arc (receptor, sensory neuron, integration centre in the spinal cord, motor neuron, effector) and explain why the response does not need the brain.',
      'Calculate conduction time from distance and speed (t = d / v) and show how synaptic delay and myelination change the total reflex time.',
      'Compare the reflex time (tens of milliseconds) with a conscious reaction (about 200 ms) and explain the difference in terms of path length, number of synapses and brain processing.',
    ],
    id: [
      'Merunut lima bagian lengkung refleks (reseptor, neuron sensorik, pusat integrasi di sumsum tulang belakang, neuron motorik, efektor) dan menjelaskan mengapa responsnya tidak memerlukan otak.',
      'Menghitung waktu hantaran dari jarak dan kecepatan (t = d / v) dan menunjukkan bagaimana tundaan sinapsis dan mielinasi mengubah waktu refleks total.',
      'Membandingkan waktu refleks (puluhan milidetik) dengan reaksi sadar (sekitar 200 ms) dan menjelaskan perbedaannya dari panjang jalur, jumlah sinapsis dan pemrosesan di otak.',
    ],
  },
  tryThis: {
    en: [
      'Fire the knee-jerk reflex with both speeds at 80 m/s and read the stopwatch. Then press Unmyelinated (2 m/s) and fire again. Roughly how many times longer is the reflex?',
      'Keep the conscious route on and watch the second impulse climb to the brain. Note the time when the muscle twitches and the time when the "Ouch!" appears.',
      'Switch to the hot-plate scene. It has one more synapse (an interneuron). How much time does that extra synapse add?',
      'Run the reaction-time test five times. Is your best time closer to the reflex time or to the conscious-route time?',
    ],
    id: [
      'Picu refleks lutut dengan kedua kecepatan 80 m/s dan baca stopwatch. Lalu tekan Tanpa mielin (2 m/s) dan picu lagi. Kira-kira berapa kali lebih lama refleksnya?',
      'Biarkan jalur sadar menyala dan amati impuls kedua naik ke otak. Catat waktu saat otot berkedut dan waktu saat "Aduh!" muncul.',
      'Ganti ke adegan pelat panas. Jalurnya punya satu sinapsis tambahan (interneuron). Berapa waktu yang ditambahkan sinapsis ekstra itu?',
      'Jalankan tes waktu reaksi lima kali. Apakah waktu terbaikmu lebih dekat ke waktu refleks atau ke waktu jalur sadar?',
    ],
  },

  learn: {
    background: {
      en: [
        'A reflex is a fast, automatic response to a stimulus that is wired through the spinal cord (or brain stem) rather than through the thinking parts of the brain. The wiring is called a reflex arc and has five parts: a receptor that detects the stimulus, a sensory (afferent) neuron that carries the impulse into the spinal cord through the dorsal root, an integration centre in the grey matter of the cord, a motor (efferent) neuron that leaves through the ventral root, and an effector, usually a muscle, that produces the response. In the knee-jerk reflex the sensory neuron synapses directly on the motor neuron (one synapse, a monosynaptic reflex). In the withdrawal reflex from a hot plate an interneuron sits between them (two synapses, a polysynaptic reflex), which also lets the signal spread to other muscles and to the opposite leg.',
        'The time a reflex takes is simply the sum of its parts. Each neuron adds a conduction time t = d / v, where d is the length of the fibre and v is its conduction speed. Thick, myelinated fibres conduct at 70–120 m/s; thin, unmyelinated fibres only at 0.5–2 m/s. In the simulation the sensory and motor fibres of the leg are 0.6 m each, so at 80 m/s each one takes 0.6 / 80 = 0.0075 s = 7.5 ms. Every chemical synapse adds about 0.5–1 ms (the sim uses 0.7 ms) for the neurotransmitter to be released and to open channels on the next cell, and the neuromuscular junction adds about 1 ms more. The whole knee-jerk arc therefore takes about 17 ms in the model; measured values in people are 20–30 ms once muscle activation is included.',
        'The brain is informed as well, but later. A branch of the signal climbs the spinal cord to the brain (an extra 0.3–0.7 m), the brain takes roughly 100–200 ms to register the sensation and decide, and a command must then travel all the way back down and out along the motor neuron. That is why you feel the pain of a hot plate after your hand has already moved, and why a conscious reaction, such as pressing a button when a light turns green, takes about 200–250 ms even in an alert adult. The reaction-time test in the sim lets you measure this for yourself and compare it with the reflex stopwatch.',
        'Doctors use reflexes as a quick test of the nervous system. A slow or absent knee-jerk can point to damage in the lumbar nerves or to demyelinating disease, in which the insulating myelin is lost and conduction slows dramatically, exactly what the Unmyelinated preset shows.',
      ],
      id: [
        'Refleks adalah respons cepat dan otomatis terhadap rangsangan yang dirangkai lewat sumsum tulang belakang (atau batang otak), bukan lewat bagian otak yang berpikir. Rangkaiannya disebut lengkung refleks dan terdiri atas lima bagian: reseptor yang mendeteksi rangsangan, neuron sensorik (aferen) yang membawa impuls masuk ke sumsum tulang belakang lewat akar dorsal, pusat integrasi di substansi kelabu sumsum, neuron motorik (eferen) yang keluar lewat akar ventral, dan efektor, biasanya otot, yang menghasilkan respons. Pada refleks lutut neuron sensorik bersinapsis langsung dengan neuron motorik (satu sinapsis, refleks monosinaptik). Pada refleks tarik dari pelat panas ada interneuron di antara keduanya (dua sinapsis, refleks polisinaptik), yang juga memungkinkan sinyal menyebar ke otot lain dan ke tungkai sebelahnya.',
        'Waktu yang dibutuhkan refleks hanyalah jumlah dari bagian-bagiannya. Setiap neuron menambahkan waktu hantaran t = d / v, dengan d panjang serabut dan v kecepatan hantarannya. Serabut tebal bermielin menghantar pada 70–120 m/s; serabut tipis tanpa mielin hanya 0,5–2 m/s. Dalam simulasi, serabut sensorik dan motorik tungkai masing-masing 0,6 m, sehingga pada 80 m/s tiap serabut butuh 0,6 / 80 = 0,0075 s = 7,5 ms. Setiap sinapsis kimia menambah sekitar 0,5–1 ms (simulasi memakai 0,7 ms) untuk pelepasan neurotransmiter dan pembukaan kanal pada sel berikutnya, dan sambungan neuromuskular menambah sekitar 1 ms lagi. Seluruh lengkung refleks lutut karena itu memakan sekitar 17 ms dalam model; nilai terukur pada manusia 20–30 ms setelah aktivasi otot dihitung.',
        'Otak juga diberi tahu, tetapi belakangan. Cabang sinyal naik lewat sumsum tulang belakang ke otak (tambahan 0,3–0,7 m), otak butuh kira-kira 100–200 ms untuk menyadari sensasi dan memutuskan, lalu perintah harus kembali turun dan keluar lewat neuron motorik. Itulah sebabnya rasa sakit pelat panas baru terasa setelah tangan sudah bergerak, dan reaksi sadar, seperti menekan tombol saat lampu menjadi hijau, memakan 200–250 ms bahkan pada orang dewasa yang siaga. Tes waktu reaksi di simulasi memungkinkanmu mengukurnya sendiri dan membandingkannya dengan stopwatch refleks.',
        'Dokter memakai refleks sebagai tes cepat sistem saraf. Refleks lutut yang lambat atau hilang dapat menunjukkan kerusakan saraf lumbar atau penyakit demielinasi, ketika selubung mielin hilang dan hantaran melambat drastis, persis seperti yang ditunjukkan preset Tanpa mielin.',
      ],
    },
    figure: {
      caption: {
        en: 'A withdrawal reflex arc seen in a cross-section of the spinal cord. The stimulus is detected by a receptor in the skin; the sensory neuron (orange) enters through the dorsal root, synapses on an interneuron (purple) in the grey matter, which synapses on a motor neuron (blue) leaving through the ventral root to the muscle. A branch (dashed) carries the information up to the brain.',
        id: 'Lengkung refleks tarik dilihat pada penampang melintang sumsum tulang belakang. Rangsangan dideteksi reseptor di kulit; neuron sensorik (jingga) masuk lewat akar dorsal, bersinapsis dengan interneuron (ungu) di substansi kelabu, yang bersinapsis dengan neuron motorik (biru) yang keluar lewat akar ventral menuju otot. Sebuah cabang (putus-putus) membawa informasi naik ke otak.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Reflex arc through a spinal cord cross-section', 'Lengkung refleks melalui penampang sumsum tulang belakang')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.s{font:10px system-ui,sans-serif;fill:currentColor;opacity:.8}.m{fill:none;stroke:currentColor;stroke-width:1.2;opacity:.6}.n{fill:none;stroke-width:2.4;stroke-linecap:round;stroke-linejoin:round}</style>
  <defs>
    <marker id="ao" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto"><path d="M0 0 L7 3.5 L0 7 z" fill="#f59e0b"/></marker>
    <marker id="ab" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto"><path d="M0 0 L7 3.5 L0 7 z" fill="#38bdf8"/></marker>
    <marker id="ap" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto"><path d="M0 0 L7 3.5 L0 7 z" fill="#a78bfa"/></marker>
  </defs>
  <ellipse cx="100" cy="125" rx="78" ry="58" fill="none" stroke="currentColor" stroke-width="1.5"/>
  <path d="M100 85 C70 80 72 110 60 118 C48 126 48 150 70 158 C84 164 92 150 100 150 C108 150 116 164 130 158 C152 150 152 126 140 118 C128 110 130 80 100 85 Z" fill="currentColor" opacity=".15" stroke="currentColor" stroke-width="1"/>
  <text x="100" y="60" text-anchor="middle" class="s">${L('dorsal (back)', 'dorsal (punggung)')}</text>
  <text x="100" y="200" text-anchor="middle" class="s">${L('ventral (front)', 'ventral (depan)')}</text>
  <text x="18" y="128" class="s">${L('grey', 'substansi')}</text>
  <text x="18" y="140" class="s">${L('matter', 'kelabu')}</text>
  <rect x="268" y="56" width="70" height="36" rx="6" fill="#f59e0b" opacity=".25" stroke="#f59e0b"/>
  <text x="303" y="78" text-anchor="middle">${L('skin receptor', 'reseptor kulit')}</text>
  <path d="M296 96 L300 104 L293 104 Z" fill="#ef4444"/>
  <text x="330" y="112" text-anchor="end" class="s">${L('heat', 'panas')}</text>
  <rect x="268" y="150" width="70" height="36" rx="12" fill="#38bdf8" opacity=".25" stroke="#38bdf8"/>
  <text x="303" y="172" text-anchor="middle">${L('muscle', 'otot')}</text>
  <path d="M268 74 C220 74 180 70 160 92 C150 102 140 110 128 118" class="n" stroke="#f59e0b" marker-end="url(#ao)"/>
  <circle cx="182" cy="76" r="5" fill="#f59e0b"/>
  <text x="182" y="66" text-anchor="middle" class="s">${L('sensory neuron', 'neuron sensorik')}</text>
  <path d="M124 120 C110 126 98 130 92 138" class="n" stroke="#a78bfa" marker-end="url(#ap)"/>
  <circle cx="110" cy="128" r="4" fill="#a78bfa"/>
  <text x="126" y="140" class="s" fill="#a78bfa">${L('interneuron', 'interneuron')}</text>
  <path d="M90 142 C120 160 150 160 170 158 C200 155 230 168 268 168" class="n" stroke="#38bdf8" marker-end="url(#ab)"/>
  <circle cx="88" cy="142" r="5" fill="#38bdf8"/>
  <text x="178" y="185" class="s" fill="#38bdf8">${L('motor neuron', 'neuron motorik')}</text>
  <path d="M120 116 C116 90 108 50 104 20" fill="none" stroke="#a78bfa" stroke-width="1.6" stroke-dasharray="4 3" marker-end="url(#ap)"/>
  <text x="112" y="14" class="s">${L('to brain', 'ke otak')}</text>
  <text x="246" y="226" text-anchor="middle" class="s">${L('t = d / v for each neuron, + ~0.7 ms per synapse', 't = d / v untuk tiap neuron, + ~0,7 ms per sinapsis')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'A reflex arc has five parts: receptor, sensory neuron, integration centre (spinal cord), motor neuron, effector.',
        'Conduction time for each neuron is t = d / v; a 0.6 m fibre at 80 m/s takes 7.5 ms, but at 2 m/s it takes 300 ms.',
        'Myelin speeds conduction by letting the impulse jump between nodes (saltatory conduction), from about 1–2 m/s to 70–120 m/s.',
        'Each synapse adds about 0.5–1 ms; a polysynaptic reflex (withdrawal) is slightly slower than a monosynaptic one (knee-jerk).',
        'The conscious route through the brain is longer and includes 100–200 ms of processing, so a reflex (~20–30 ms) is roughly ten times faster than a reaction (~200–250 ms).',
      ],
      id: [
        'Lengkung refleks punya lima bagian: reseptor, neuron sensorik, pusat integrasi (sumsum tulang belakang), neuron motorik, efektor.',
        'Waktu hantaran tiap neuron adalah t = d / v; serabut 0,6 m pada 80 m/s butuh 7,5 ms, tetapi pada 2 m/s butuh 300 ms.',
        'Mielin mempercepat hantaran dengan membuat impuls melompat antar nodus (hantaran saltatorik), dari sekitar 1–2 m/s menjadi 70–120 m/s.',
        'Setiap sinapsis menambah sekitar 0,5–1 ms; refleks polisinaptik (tarik) sedikit lebih lambat daripada monosinaptik (lutut).',
        'Jalur sadar lewat otak lebih panjang dan mencakup 100–200 ms pemrosesan, sehingga refleks (~20–30 ms) kira-kira sepuluh kali lebih cepat daripada reaksi (~200–250 ms).',
      ],
    },
    vocabulary: {
      en: [
        ['Reflex arc', 'The pathway receptor → sensory neuron → spinal cord → motor neuron → effector that produces an automatic response.'],
        ['Receptor', 'A cell or nerve ending that converts a stimulus (stretch, heat, pressure) into nerve impulses.'],
        ['Effector', 'The muscle or gland that carries out the response.'],
        ['Interneuron', 'A short neuron inside the grey matter that links a sensory neuron to a motor neuron; present in polysynaptic reflexes.'],
        ['Synaptic delay', 'The 0.5–1 ms needed at each synapse for neurotransmitter to cross the gap and excite the next cell.'],
        ['Myelin', 'A fatty insulating sheath around an axon that greatly increases conduction speed.'],
        ['Conduction speed', 'Distance travelled by an impulse per second, 0.5–120 m/s depending on fibre diameter and myelination.'],
      ],
      id: [
        ['Lengkung refleks', 'Jalur reseptor → neuron sensorik → sumsum tulang belakang → neuron motorik → efektor yang menghasilkan respons otomatis.'],
        ['Reseptor', 'Sel atau ujung saraf yang mengubah rangsangan (regangan, panas, tekanan) menjadi impuls saraf.'],
        ['Efektor', 'Otot atau kelenjar yang melaksanakan respons.'],
        ['Interneuron', 'Neuron pendek di dalam substansi kelabu yang menghubungkan neuron sensorik dengan neuron motorik; ada pada refleks polisinaptik.'],
        ['Tundaan sinapsis', 'Waktu 0,5–1 ms yang diperlukan di tiap sinapsis agar neurotransmiter menyeberangi celah dan merangsang sel berikutnya.'],
        ['Mielin', 'Selubung lemak isolator di sekeliling akson yang sangat meningkatkan kecepatan hantaran.'],
        ['Kecepatan hantaran', 'Jarak yang ditempuh impuls per detik, 0,5–120 m/s bergantung pada diameter serabut dan mielinasi.'],
      ],
    },
    misconceptions: {
      en: [
        ['The brain decides to pull the hand away from the hot plate.', 'The withdrawal is completed by the spinal cord in about 30–50 ms. The brain only learns about it afterwards; the feeling of pain and the "Ouch!" come later.'],
        ['Nerve impulses travel at the speed of electricity.', 'An action potential is a wave of ion movement across the membrane, not an electric current along a wire. Even the fastest fibres manage only about 120 m/s, far slower than light or electricity in a cable.'],
        ['A reflex and a reaction time are the same thing.', 'A reaction (for example to a green light) requires the brain to perceive, decide and command, and takes 200–250 ms. A spinal reflex skips all of that and takes 20–50 ms.'],
        ['More synapses make a pathway more reliable, so they must make it faster too.', 'Each synapse adds delay (about 0.7 ms) and is a point where the signal can be modified or blocked. Speed comes from fewer synapses and from myelinated, large-diameter axons.'],
      ],
      id: [
        ['Otak yang memutuskan untuk menarik tangan dari pelat panas.', 'Gerakan tarik diselesaikan oleh sumsum tulang belakang dalam 30–50 ms. Otak baru tahu setelahnya; rasa sakit dan "Aduh!" datang belakangan.'],
        ['Impuls saraf merambat dengan kecepatan listrik.', 'Potensial aksi adalah gelombang pergerakan ion melintasi membran, bukan arus listrik di sepanjang kawat. Serabut tercepat pun hanya mencapai sekitar 120 m/s, jauh lebih lambat dari cahaya atau listrik di kabel.'],
        ['Refleks dan waktu reaksi adalah hal yang sama.', 'Reaksi (misalnya terhadap lampu hijau) memerlukan otak untuk mempersepsi, memutuskan dan memerintah, dan memakan 200–250 ms. Refleks spinal melewati semuanya dan hanya butuh 20–50 ms.'],
        ['Lebih banyak sinapsis membuat jalur lebih andal, jadi pasti lebih cepat juga.', 'Setiap sinapsis menambah tundaan (sekitar 0,7 ms) dan menjadi titik tempat sinyal bisa diubah atau dihambat. Kecepatan datang dari sinapsis yang lebih sedikit dan akson bermielin berdiameter besar.'],
      ],
    },
    realWorld: {
      en: [
        'Doctors tap the patellar tendon with a reflex hammer; a brisk kick 20–30 ms later shows that the L2–L4 spinal nerves and the muscle are intact.',
        'In multiple sclerosis the myelin of central nerve fibres is damaged, conduction slows or fails, and reflexes and coordination become abnormal.',
        'Sprinters cannot legally leave the blocks less than 100 ms after the gun, because a true reaction cannot be faster than that; a quicker start is counted as a false start.',
        'Goalkeepers and badminton players train so that some movements become almost automatic, shortening the brain-processing part of their reaction time.',
        'The blink reflex protects the eye from an approaching object in about 30–50 ms, long before you consciously see it.',
      ],
      id: [
        'Dokter mengetuk tendon patela dengan palu refleks; tendangan cepat 20–30 ms kemudian menunjukkan saraf spinal L2–L4 dan ototnya utuh.',
        'Pada multiple sclerosis mielin serabut saraf pusat rusak, hantaran melambat atau gagal, dan refleks serta koordinasi menjadi tidak normal.',
        'Pelari cepat tidak boleh meninggalkan balok start kurang dari 100 ms setelah pistol berbunyi, karena reaksi sejati tidak bisa lebih cepat dari itu; start yang lebih cepat dihitung sebagai start salah.',
        'Penjaga gawang dan pemain bulu tangkis berlatih agar beberapa gerakan menjadi hampir otomatis, memperpendek bagian pemrosesan otak dari waktu reaksinya.',
        'Refleks kedip melindungi mata dari benda yang mendekat dalam sekitar 30–50 ms, jauh sebelum kamu melihatnya secara sadar.',
      ],
    },
    questions: {
      en: [
        { q: 'A sensory neuron 0.8 m long conducts at 20 m/s and the motor neuron 0.8 m long conducts at 80 m/s. There are two synapses (0.7 ms each) and a 1 ms neuromuscular junction. How long does the reflex take?', a: 'Sensory: 0.8 / 20 = 0.040 s = 40 ms. Motor: 0.8 / 80 = 0.010 s = 10 ms. Synapses: 1.4 ms. Junction: 1 ms. Total ≈ 52 ms.' },
        { q: 'Why does the hot-plate reflex take slightly longer than the knee-jerk reflex in the sim when the speeds and distances are similar?', a: 'The withdrawal reflex is polysynaptic: an interneuron links the sensory and motor neurons, so there are two synaptic delays instead of one, adding about 0.7–1 ms.' },
        { q: 'Your reaction time in the test was 230 ms, yet the reflex stopwatch read 17 ms. Account for the extra 200 ms or so.', a: 'The reaction route is longer (signal up to the brain and back down the cord, about 1.4 m extra at 80 m/s ≈ 18 ms) and, far more important, the brain needs roughly 100–200 ms to perceive the light, decide and issue the command. The reflex arc skips the brain entirely.' },
      ],
      id: [
        { q: 'Neuron sensorik sepanjang 0,8 m menghantar pada 20 m/s dan neuron motorik sepanjang 0,8 m menghantar pada 80 m/s. Ada dua sinapsis (0,7 ms tiap) dan sambungan neuromuskular 1 ms. Berapa lama refleksnya?', a: 'Sensorik: 0,8 / 20 = 0,040 s = 40 ms. Motorik: 0,8 / 80 = 0,010 s = 10 ms. Sinapsis: 1,4 ms. Sambungan: 1 ms. Total ≈ 52 ms.' },
        { q: 'Mengapa refleks pelat panas sedikit lebih lama daripada refleks lutut di simulasi padahal kecepatan dan jaraknya serupa?', a: 'Refleks tarik bersifat polisinaptik: interneuron menghubungkan neuron sensorik dan motorik, sehingga ada dua tundaan sinapsis alih-alih satu, menambah sekitar 0,7–1 ms.' },
        { q: 'Waktu reaksimu dalam tes adalah 230 ms, tetapi stopwatch refleks menunjukkan 17 ms. Jelaskan dari mana tambahan sekitar 200 ms itu.', a: 'Jalur reaksi lebih panjang (sinyal naik ke otak dan turun lagi lewat sumsum, sekitar 1,4 m ekstra pada 80 m/s ≈ 18 ms) dan, yang jauh lebih penting, otak butuh kira-kira 100–200 ms untuk mempersepsi lampu, memutuskan dan mengeluarkan perintah. Lengkung refleks melewati otak sepenuhnya.' },
      ],
    },
  },
};
