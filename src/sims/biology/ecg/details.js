// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Identify the P, QRS, and T waves on an ECG.',
      'Connect each wave to a phase of the cardiac cycle.',
      'See arrhythmias as deviations from the regular pattern.',
    ],
    id: [
      'Mengenali gelombang P, QRS, dan T pada EKG.',
      'Menghubungkan tiap gelombang dengan fase siklus jantung.',
      'Mengenali aritmia sebagai penyimpangan dari pola teratur.',
    ],
  },
  tryThis: {
    en: [
      'Tachycardia preset (160 bpm) — how do the waves change?',
      'Bradycardia preset (45 bpm) — what flattens out?',
      'Inject "missed beats" — what does it look like?',
    ],
    id: [
      'Praatur takikardia (160 bpm) — bagaimana gelombang berubah?',
      'Praatur bradikardia (45 bpm) — apa yang merata?',
      'Tambah "denyut hilang" — seperti apa tampilannya?',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'Every heartbeat starts as an electrical signal. The sinoatrial (SA) node in the wall of the right atrium fires on its own, and the wave of depolarization spreads across both atria, making them contract and producing the small P wave. The signal then pauses briefly at the atrioventricular (AV) node, which gives the ventricles time to fill, before racing down the bundle of His and the Purkinje fibres so that the thick ventricular walls depolarize almost together: the tall, sharp QRS complex. Ventricular contraction follows a fraction of a second later. Finally the ventricles repolarize, producing the rounded T wave; the atria repolarize too, but that small signal is hidden under the QRS. An electrocardiogram (ECG) records these voltages, about a millivolt in size, from electrodes on the skin.',
        'The simulation draws one fixed P-QRS-T shape for each beat and stretches it to fill the beat period, which is 60 divided by the heart rate in beats per minute. The trace scrolls through a six-second window, and the heart on the left squeezes during the QRS to show that contraction follows depolarization. Nothing is calculated about ion channels or conduction; the sim is a pattern generator that lets you connect the shape of the trace to the sequence of events in the heart.',
        'The "Heart rate" slider moves the beats closer together or further apart; the presets jump to resting, sleeping, sprinting and bradycardia values. The "Missed-beat probability" slider makes the heart occasionally skip the next beat, leaving a gap of two whole periods, which is a simple stand-in for a dropped beat. A real ECG reader estimates heart rate from the spacing of the R peaks and spots trouble when the spacing becomes irregular or a wave changes shape.',
        'Because the sim scales the whole waveform with the period, every wave gets narrower as the rate goes up. Real hearts do not quite behave like this: the QRS complex lasts about 0.08 to 0.10 s regardless of rate, the PR interval stays near 0.12 to 0.20 s, and the QT interval shortens with rate but less than proportionally; what shrinks most at high rates is the flat stretch between T and the next P, the time when the ventricles fill. The amplitudes here are in arbitrary units, there is only one "lead", and real arrhythmias such as atrial fibrillation, extra beats and heart block look different from a simple dropped beat.',
      ],
      id: [
        'Setiap denyut jantung bermula sebagai sinyal listrik. Nodus sinoatrial (SA) di dinding atrium kanan menyala dengan sendirinya, dan gelombang depolarisasi menyebar ke kedua atrium, membuatnya berkontraksi dan menghasilkan gelombang P yang kecil. Sinyal kemudian berhenti sejenak di nodus atrioventrikular (AV), yang memberi waktu bagi ventrikel untuk terisi, sebelum melesat menuruni berkas His dan serabut Purkinje sehingga dinding ventrikel yang tebal berdepolarisasi hampir serentak: kompleks QRS yang tinggi dan tajam. Kontraksi ventrikel menyusul sepersekian detik kemudian. Akhirnya ventrikel berepolarisasi, menghasilkan gelombang T yang membulat; atrium juga berepolarisasi, tetapi sinyal kecil itu tersembunyi di bawah QRS. Elektrokardiogram (EKG) merekam tegangan-tegangan ini, yang besarnya sekitar satu milivolt, dari elektrode di kulit.',
        'Simulasi menggambar satu bentuk P-QRS-T yang tetap untuk setiap denyut dan merentangkannya agar mengisi periode denyut, yaitu 60 dibagi denyut jantung per menit. Grafik bergulir dalam jendela enam detik, dan jantung di kiri meremas saat QRS untuk menunjukkan bahwa kontraksi mengikuti depolarisasi. Tidak ada perhitungan kanal ion atau konduksi; simulasi ini adalah pembangkit pola yang membantu kamu menghubungkan bentuk grafik dengan urutan kejadian di jantung.',
        'Slider "Heart rate" membuat denyut lebih rapat atau lebih renggang; praatur melompat ke nilai istirahat, tidur, sprint, dan bradikardia. Slider "Missed-beat probability" membuat jantung sesekali melewatkan denyut berikutnya, meninggalkan jeda dua periode penuh, sebagai pengganti sederhana untuk denyut yang hilang. Pembaca EKG sungguhan memperkirakan denyut jantung dari jarak puncak-puncak R dan mencurigai masalah ketika jaraknya menjadi tidak teratur atau bentuk gelombang berubah.',
        'Karena simulasi menskalakan seluruh bentuk gelombang dengan periode, setiap gelombang menyempit saat denyut naik. Jantung sungguhan tidak persis seperti itu: kompleks QRS berlangsung sekitar 0,08 sampai 0,10 s berapa pun denyutnya, interval PR tetap di sekitar 0,12 sampai 0,20 s, dan interval QT memendek seiring denyut tetapi tidak sebanding; yang paling menyusut pada denyut tinggi adalah bagian datar antara T dan P berikutnya, yaitu waktu ventrikel terisi. Amplitudo di sini dalam satuan sembarang, hanya ada satu "sadapan", dan aritmia sungguhan seperti fibrilasi atrium, denyut tambahan, dan blok jantung tampak berbeda dari sekadar denyut yang hilang.',
      ],
    },
    figure: {
      caption: {
        en: 'One heartbeat on an ECG. P: atria depolarize. PR segment: delay at the AV node. QRS: ventricles depolarize (contraction follows). T: ventricles repolarize. The R-R spacing gives the heart rate.',
        id: 'Satu denyut jantung pada EKG. P: atrium berdepolarisasi. Segmen PR: jeda di nodus AV. QRS: ventrikel berdepolarisasi (kontraksi menyusul). T: ventrikel berepolarisasi. Jarak R-R memberi denyut jantung.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Waves of one heartbeat on an ECG', 'Gelombang satu denyut jantung pada EKG')}">
  <style>text{font:12px system-ui,sans-serif;fill:currentColor}.m{fill:none;stroke:currentColor;stroke-width:1.2;opacity:.45}.f{stroke-width:2.2;fill:none}.s{font-size:10px;opacity:.75}.b{font-weight:600}</style>
  <g class="m" stroke-dasharray="2 4">
    <line x1="20" y1="60" x2="340" y2="60"/><line x1="20" y1="100" x2="340" y2="100"/><line x1="20" y1="180" x2="340" y2="180"/>
    <line x1="60" y1="30" x2="60" y2="190"/><line x1="120" y1="30" x2="120" y2="190"/><line x1="180" y1="30" x2="180" y2="190"/><line x1="240" y1="30" x2="240" y2="190"/><line x1="300" y1="30" x2="300" y2="190"/>
  </g>
  <path d="M20 140 L64 140 C70 126 84 126 90 140 L116 140 L121 148 L128 48 L135 160 L140 140 L172 140 C184 112 206 112 220 140 L340 140" class="f" stroke="#10b981"/>
  <text x="70" y="118" class="b" fill="#3b82f6">P</text>
  <text x="108" y="160" class="b" fill="#ef4444">Q</text>
  <text x="124" y="42" class="b" fill="#ef4444">R</text>
  <text x="138" y="174" class="b" fill="#ef4444">S</text>
  <text x="192" y="106" class="b" fill="#8b5cf6">T</text>
  <text x="26" y="30" class="s" fill="#3b82f6">${L('P: atria depolarize', 'P: atrium berdepolarisasi')}</text>
  <text x="26" y="42" class="s" fill="#3b82f6">${L('(atria contract)', '(atrium berkontraksi)')}</text>
  <text x="150" y="30" class="s" fill="#ef4444">${L('QRS: ventricles depolarize', 'QRS: ventrikel berdepolarisasi')}</text>
  <text x="150" y="42" class="s" fill="#ef4444">${L('(ventricles contract just after)', '(ventrikel berkontraksi sesaat kemudian)')}</text>
  <text x="226" y="86" class="s" fill="#8b5cf6">${L('T: ventricles repolarize', 'T: ventrikel berepolarisasi')}</text>
  <text x="226" y="98" class="s" fill="#8b5cf6">${L('(ventricles relax)', '(ventrikel relaksasi)')}</text>
  <line x1="64" y1="196" x2="118" y2="196" class="m" stroke="#f59e0b" stroke-opacity="1"/>
  <line x1="64" y1="192" x2="64" y2="200" class="m" stroke="#f59e0b" stroke-opacity="1"/><line x1="118" y1="192" x2="118" y2="200" class="m" stroke="#f59e0b" stroke-opacity="1"/>
  <text x="60" y="212" class="s" fill="#f59e0b">${L('PR interval: AV node delay', 'interval PR: jeda nodus AV')}</text>
  <line x1="118" y1="224" x2="220" y2="224" class="m" stroke="#f59e0b" stroke-opacity="1"/>
  <line x1="118" y1="220" x2="118" y2="228" class="m" stroke="#f59e0b" stroke-opacity="1"/><line x1="220" y1="220" x2="220" y2="228" class="m" stroke="#f59e0b" stroke-opacity="1"/>
  <text x="226" y="228" class="s" fill="#f59e0b">${L('QT interval', 'interval QT')}</text>
  <text x="240" y="160" class="s">${L('R-R spacing to next R', 'jarak R-R ke R berikut')}</text>
  <text x="240" y="172" class="s">${L('= 60 / heart rate', '= 60 / denyut jantung')}</text>
  <line x1="128" y1="48" x2="128" y2="30" class="m" stroke-dasharray="2 2"/>
  <defs><marker id="a" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="context-stroke"/></marker></defs>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'An ECG records the heart\'s electrical activity from the skin; mechanical contraction follows each electrical wave a little later.',
        'P is atrial depolarization, QRS is ventricular depolarization and T is ventricular repolarization.',
        'Heart rate equals 60 divided by the R-R interval in seconds, so closer R peaks mean a faster heart.',
        'A healthy rhythm is regular: each P is followed by a QRS and the R-R spacing is nearly constant; irregular spacing or missing waves point to an arrhythmia.',
        'At high heart rates the time between beats shrinks mostly in the resting (filling) phase, not in the QRS itself.',
      ],
      id: [
        'EKG merekam aktivitas listrik jantung dari kulit; kontraksi mekanis menyusul sedikit setelah tiap gelombang listrik.',
        'P adalah depolarisasi atrium, QRS adalah depolarisasi ventrikel, dan T adalah repolarisasi ventrikel.',
        'Denyut jantung sama dengan 60 dibagi interval R-R dalam detik, sehingga puncak R yang lebih rapat berarti jantung lebih cepat.',
        'Irama sehat bersifat teratur: setiap P diikuti QRS dan jarak R-R hampir tetap; jarak tak teratur atau gelombang yang hilang menandakan aritmia.',
        'Pada denyut jantung tinggi, waktu antar denyut menyusut terutama pada fase istirahat (pengisian), bukan pada QRS-nya.',
      ],
    },
    vocabulary: {
      en: [
        ['Electrocardiogram (ECG)', 'A recording of the heart\'s electrical activity over time, measured with electrodes on the skin.'],
        ['SA node', 'The sinoatrial node, a patch of self-firing cells in the right atrium that acts as the heart\'s natural pacemaker.'],
        ['AV node', 'The atrioventricular node, which delays the signal between atria and ventricles so the ventricles can fill before they contract.'],
        ['Depolarization', 'The electrical activation of heart muscle cells that triggers their contraction.'],
        ['Repolarization', 'The electrical recovery of heart muscle cells back to their resting state, ready for the next beat.'],
        ['QRS complex', 'The tall, sharp deflection produced when the ventricles depolarize.'],
        ['R-R interval', 'The time between two successive R peaks; one heartbeat.'],
        ['Bradycardia / tachycardia', 'A resting heart rate below about 60 bpm (bradycardia) or above about 100 bpm (tachycardia).'],
      ],
      id: [
        ['Elektrokardiogram (EKG)', 'Rekaman aktivitas listrik jantung terhadap waktu, diukur dengan elektrode di kulit.'],
        ['Nodus SA', 'Nodus sinoatrial, sekelompok sel yang menyala sendiri di atrium kanan dan bertindak sebagai pemacu alami jantung.'],
        ['Nodus AV', 'Nodus atrioventrikular, yang menunda sinyal antara atrium dan ventrikel agar ventrikel dapat terisi sebelum berkontraksi.'],
        ['Depolarisasi', 'Pengaktifan listrik sel otot jantung yang memicu kontraksinya.'],
        ['Repolarisasi', 'Pemulihan listrik sel otot jantung ke keadaan istirahat, siap untuk denyut berikutnya.'],
        ['Kompleks QRS', 'Simpangan tinggi dan tajam yang dihasilkan saat ventrikel berdepolarisasi.'],
        ['Interval R-R', 'Waktu antara dua puncak R berturut-turut; satu denyut jantung.'],
        ['Bradikardia / takikardia', 'Denyut jantung istirahat di bawah sekitar 60 bpm (bradikardia) atau di atas sekitar 100 bpm (takikardia).'],
      ],
    },
    misconceptions: {
      en: [
        ['The ECG shows blood flowing or the heart sound.', 'It shows only electrical activity. Blood flow and the "lub-dub" sounds are mechanical events that follow the electrical waves; they need other instruments to record.'],
        ['A wiggly ECG line means the heart is pumping; only a flat line is dangerous.', 'In ventricular fibrillation the line wiggles chaotically yet the heart pumps no blood at all. Electrical activity without effective contraction is possible and life-threatening.'],
        ['The T wave is the atria relaxing.', 'The T wave is the ventricles repolarizing. Atrial repolarization does happen, but its small signal is buried under the much larger QRS.'],
        ['A slow heart rate is always a sign of disease.', 'Trained endurance athletes often rest at 40 to 50 bpm because each beat pumps more blood. Bradycardia is a problem only when the body is not getting enough blood.'],
      ],
      id: [
        ['EKG menunjukkan aliran darah atau bunyi jantung.', 'EKG hanya menunjukkan aktivitas listrik. Aliran darah dan bunyi "lub-dub" adalah kejadian mekanis yang mengikuti gelombang listrik; merekamnya memerlukan alat lain.'],
        ['Garis EKG yang bergelombang berarti jantung memompa; hanya garis datar yang berbahaya.', 'Pada fibrilasi ventrikel garisnya bergelombang kacau tetapi jantung sama sekali tidak memompa darah. Aktivitas listrik tanpa kontraksi efektif bisa terjadi dan mengancam jiwa.'],
        ['Gelombang T adalah atrium yang berelaksasi.', 'Gelombang T adalah ventrikel yang berepolarisasi. Repolarisasi atrium memang terjadi, tetapi sinyal kecilnya tertimbun di bawah QRS yang jauh lebih besar.'],
        ['Denyut jantung lambat selalu tanda penyakit.', 'Atlet ketahanan terlatih sering beristirahat pada 40 sampai 50 bpm karena tiap denyut memompa lebih banyak darah. Bradikardia menjadi masalah hanya jika tubuh tidak mendapat cukup darah.'],
      ],
    },
    realWorld: {
      en: [
        'Smartwatches with a single-lead ECG can detect the irregular R-R spacing of atrial fibrillation, a common rhythm problem that raises stroke risk.',
        'Automated external defibrillators (AEDs) analyse the rhythm before deciding whether a shock is appropriate, which is why they tell bystanders to stand clear.',
        'A pacemaker is implanted when the SA node or AV node fails, taking over the job of timing the beats.',
        'During a heart attack the ST segment between QRS and T shifts up or down, which is one of the fastest ways doctors confirm the diagnosis.',
      ],
      id: [
        'Jam tangan pintar dengan EKG satu sadapan dapat mendeteksi jarak R-R yang tak teratur pada fibrilasi atrium, gangguan irama umum yang menaikkan risiko stroke.',
        'Defibrilator eksternal otomatis (AED) menganalisis irama sebelum memutuskan apakah kejutan listrik diperlukan, itulah sebabnya alat ini meminta orang di sekitar menjauh.',
        'Alat pacu jantung ditanam ketika nodus SA atau nodus AV gagal, mengambil alih tugas mengatur waktu denyut.',
        'Saat serangan jantung, segmen ST antara QRS dan T bergeser ke atas atau ke bawah, salah satu cara tercepat dokter memastikan diagnosis.',
      ],
    },
    questions: {
      en: [
        { q: 'On an ECG the R peaks are 0.8 s apart. What is the heart rate? What spacing would correspond to the "Sprint" preset of 170 bpm?', a: '60 / 0.8 = 75 beats per minute, a typical resting rate. At 170 bpm the spacing is 60 / 170 ≈ 0.35 s.' },
        { q: 'Why does the heart drawing squeeze during the QRS complex rather than during the P wave?', a: 'The QRS marks depolarization of the ventricles, the thick chambers that do most of the pumping, and ventricular contraction follows within a few hundredths of a second. The P wave triggers only the thin-walled atria, whose contraction is a small top-up before the ventricles fire.' },
        { q: 'In the sim every wave becomes narrower at 170 bpm. Which part of a real ECG actually shrinks the most at high heart rates, and why does that matter?', a: 'Mostly the flat stretch between the T wave and the next P wave, when the ventricles relax and fill; the QRS stays about 0.08 to 0.10 s. At very high rates filling time becomes so short that each beat pumps less blood, which is one reason extreme tachycardia is dangerous.' },
      ],
      id: [
        { q: 'Pada EKG, puncak-puncak R berjarak 0,8 s. Berapa denyut jantungnya? Berapa jarak yang sesuai dengan praatur "Sprint" 170 bpm?', a: '60 / 0,8 = 75 denyut per menit, denyut istirahat yang khas. Pada 170 bpm jaraknya 60 / 170 ≈ 0,35 s.' },
        { q: 'Mengapa gambar jantung meremas saat kompleks QRS, bukan saat gelombang P?', a: 'QRS menandai depolarisasi ventrikel, ruang berdinding tebal yang melakukan sebagian besar pemompaan, dan kontraksi ventrikel menyusul dalam beberapa perseratus detik. Gelombang P hanya memicu atrium yang berdinding tipis, yang kontraksinya hanya tambahan kecil sebelum ventrikel menyala.' },
        { q: 'Di simulasi, setiap gelombang menyempit pada 170 bpm. Bagian mana dari EKG sungguhan yang paling menyusut pada denyut tinggi, dan mengapa itu penting?', a: 'Terutama bagian datar antara gelombang T dan P berikutnya, saat ventrikel relaksasi dan terisi; QRS tetap sekitar 0,08 sampai 0,10 s. Pada denyut yang sangat tinggi, waktu pengisian menjadi begitu singkat sehingga tiap denyut memompa lebih sedikit darah, salah satu alasan takikardia ekstrem berbahaya.' },
      ],
    },
  },
};
