// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Explain diffusion of responsibility and why it lowers each individual\'s chance of helping.',
      'Distinguish the probability that one person helps from the probability that anyone helps.',
      'Compare a simulated model with the Darley & Latané (1968) findings.',
    ],
    id: [
      'Menjelaskan difusi tanggung jawab dan mengapa hal itu menurunkan peluang tiap individu menolong.',
      'Membedakan peluang satu orang menolong dari peluang ada siapa pun yang menolong.',
      'Membandingkan model simulasi dengan temuan Darley & Latané (1968).',
    ],
  },
  tryThis: {
    en: [
      'Set diffusion to 0 and run 200 trials — does the simulation match the naive expectation?',
      'Raise diffusion until the simulated curve passes near the three Darley & Latané points.',
      'Watch single trials at group size 6: how long does it take before anyone moves?',
    ],
    id: [
      'Atur difusi ke 0 dan jalankan 200 percobaan — apakah simulasi cocok dengan dugaan naif?',
      'Naikkan difusi sampai kurva simulasi melewati dekat tiga titik Darley & Latané.',
      'Amati percobaan tunggal pada ukuran kelompok 6: berapa lama sebelum ada yang bergerak?',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'Common sense says that a person in trouble is safer in a crowd: more people, more chances that someone will help. Social psychologists found the opposite. When several people witness the same emergency, each one feels less personally responsible, because the duty to act is shared out, or diffused, across the group. Everyone also watches everyone else, and if nobody moves, each person reads the stillness as a sign that nothing serious is happening.',
        'Darley and Latané (1968) tested this in the laboratory. Students sat in separate booths and talked over an intercom, believing they were in a discussion with one, two or five other people. Partway through, one voice (a recording) seemed to have a seizure and beg for help. Of the participants who thought they were the only witness, 85% went to help before the fit ended; with one other apparent witness, 62% did; with four others, only 31%. The people who did not help were not indifferent: they were visibly distressed, but kept waiting for someone else to act.',
        'The simulation runs the emergency as a probability game. Each bystander\'s chance of helping within the two-minute window is P(alone) × N^(−α), where N is the group size and α is the Diffusion of responsibility slider. With α = 0 every person is as willing as if alone, and the chance that at least one of N helps is the naive curve 1 − (1 − p)^N, which climbs toward 100%. With α above about 1, each extra bystander lowers everybody\'s individual probability so much that the chance anyone helps, 1 − (1 − p_N)^N, actually falls. The scene on the left plays single emergencies with the glance lines showing bystanders checking each other; the button runs 200 trials per group size and plots the results next to the three Darley and Latané points.',
        'The model captures the arithmetic of diffusion but leaves out much of the psychology. Real bystanders go through several steps (noticing, deciding it is an emergency, taking responsibility, knowing what to do), and group size can block any of them; the sim lumps all of that into a single number α. It also assumes bystanders decide independently and at a constant rate over time, ignores whether they know each other or know first aid, and ignores how a victim who clearly asks one person by name changes the outcome.',
      ],
      id: [
        'Akal sehat mengatakan orang yang dalam kesulitan lebih aman di tengah keramaian: makin banyak orang, makin besar peluang ada yang menolong. Psikolog sosial menemukan kebalikannya. Ketika beberapa orang menyaksikan keadaan darurat yang sama, masing-masing merasa kurang bertanggung jawab secara pribadi, karena kewajiban bertindak terbagi, atau terdifusi, ke seluruh kelompok. Setiap orang juga mengamati yang lain, dan jika tidak ada yang bergerak, tiap orang menafsirkan kediaman itu sebagai tanda tidak ada hal serius yang terjadi.',
        'Darley dan Latané (1968) menguji ini di laboratorium. Mahasiswa duduk di bilik terpisah dan berbicara lewat interkom, percaya bahwa mereka berdiskusi dengan satu, dua, atau lima orang lain. Di tengah diskusi, satu suara (rekaman) tampak mengalami kejang dan memohon pertolongan. Dari peserta yang mengira dirinya satu-satunya saksi, 85% pergi menolong sebelum kejang berakhir; dengan satu saksi lain, 62%; dengan empat saksi lain, hanya 31%. Mereka yang tidak menolong bukannya tidak peduli: mereka tampak sangat cemas, tetapi terus menunggu orang lain bertindak.',
        'Simulasi menjalankan keadaan darurat itu sebagai permainan peluang. Peluang tiap pengamat menolong dalam jendela dua menit adalah P(sendirian) × N^(−α), dengan N ukuran kelompok dan α slider Diffusion of responsibility. Dengan α = 0, setiap orang sama bersedianya seperti ketika sendirian, dan peluang setidaknya satu dari N orang menolong mengikuti kurva naif 1 − (1 − p)^N, yang menanjak menuju 100%. Dengan α di atas sekitar 1, setiap pengamat tambahan menurunkan peluang individu semua orang begitu besar sehingga peluang ada yang menolong, 1 − (1 − p_N)^N, justru turun. Adegan di kiri memainkan keadaan darurat satu per satu, dengan garis lirikan menunjukkan pengamat saling mengecek; tombolnya menjalankan 200 percobaan per ukuran kelompok dan memplot hasilnya di samping tiga titik Darley dan Latané.',
        'Model ini menangkap aritmetika difusi tetapi mengabaikan banyak sisi psikologisnya. Pengamat sungguhan melewati beberapa tahap (menyadari, memutuskan bahwa itu darurat, mengambil tanggung jawab, tahu apa yang harus dilakukan), dan ukuran kelompok bisa menghambat tahap mana pun; simulasi menggabungkan semuanya ke dalam satu angka α. Simulasi juga menganggap pengamat memutuskan secara independen dengan laju tetap sepanjang waktu, mengabaikan apakah mereka saling kenal atau bisa pertolongan pertama, dan mengabaikan bagaimana korban yang jelas-jelas meminta tolong kepada satu orang dengan menyebut namanya mengubah hasilnya.',
      ],
    },
    figure: {
      caption: {
        en: 'Probability that at least one bystander helps, against group size. The naive curve assumes each person is as willing as when alone; with diffusion of responsibility the individual chance falls so fast that the group chance drops too, matching the 85% / 62% / 31% data.',
        id: 'Peluang setidaknya satu pengamat menolong terhadap ukuran kelompok. Kurva naif menganggap tiap orang sama bersedianya seperti saat sendirian; dengan difusi tanggung jawab, peluang individu turun begitu cepat sehingga peluang kelompok ikut turun, sesuai data 85% / 62% / 31%.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Probability anyone helps versus group size', 'Peluang ada yang menolong terhadap ukuran kelompok')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.ax{stroke:currentColor;stroke-width:1.2;fill:none}.g{stroke:currentColor;stroke-width:.6;opacity:.3}.s{font-size:10px}</style>
  <rect x="50" y="20" width="280" height="170" class="ax"/>
  <line x1="50" y1="62.5" x2="330" y2="62.5" class="g"/>
  <line x1="50" y1="105" x2="330" y2="105" class="g"/>
  <line x1="50" y1="147.5" x2="330" y2="147.5" class="g"/>
  <text x="18" y="24" class="s">100%</text>
  <text x="24" y="66" class="s">75%</text>
  <text x="24" y="109" class="s">50%</text>
  <text x="24" y="151" class="s">25%</text>
  <text x="30" y="194" class="s">0%</text>
  <text x="66" y="206" class="s">1</text>
  <text x="106" y="206" class="s">2</text>
  <text x="146" y="206" class="s">3</text>
  <text x="186" y="206" class="s">4</text>
  <text x="226" y="206" class="s">5</text>
  <text x="266" y="206" class="s">6</text>
  <text x="306" y="206" class="s">7</text>
  <text x="120" y="224">${L('number of bystanders present', 'jumlah pengamat yang hadir')}</text>
  <polyline points="70,45.5 110,24 150,20.6 190,20.1 230,20 270,20 310,20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-dasharray="5 4" opacity=".6"/>
  <text x="200" y="38" class="s" opacity=".8">${L('naive: more people, more help', 'naif: makin ramai, makin tertolong')}</text>
  <polyline points="70,45.5 110,98 150,118 190,124 230,126 270,126 310,125" fill="none" stroke="#3b82f6" stroke-width="2.4"/>
  <text x="170" y="150" fill="#3b82f6">${L('diffusion model', 'model difusi')}</text>
  <polyline points="70,45.5 110,138 150,166 190,176 230,181 270,184 310,186" fill="none" stroke="#f59e0b" stroke-width="1.6" stroke-dasharray="2 3"/>
  <text x="196" y="176" fill="#f59e0b" class="s">${L('each person alone', 'tiap individu')}</text>
  <path d="M65 40 L75 51 M75 40 L65 51 M105 79 L115 90 M115 79 L105 90 M225 127 L235 138 M235 127 L225 138" stroke="#ef4444" stroke-width="2.2"/>
  <text x="246" y="112" fill="#ef4444" class="s">${L('Darley &amp; Latané 1968', 'Darley &amp; Latané 1968')}</text>
  <text x="258" y="124" fill="#ef4444" class="s">85% · 62% · 31%</text>
  <text x="14" y="120" class="s" transform="rotate(-90 14 120)">${L('P(anyone helps)', 'P(ada yang menolong)')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'The more bystanders present, the less likely any particular one of them is to help; this is diffusion of responsibility.',
        'If each person\'s chance falls faster than the group grows, the chance that anyone helps falls too, which is what Darley and Latané observed.',
        'Bystanders also use each other as a cue: if nobody reacts, everyone concludes the situation is not serious (pluralistic ignorance).',
        'In the sim, P(each helps) = P(alone) × N^(−α) and P(anyone) = 1 − (1 − P(each))^N; α = 0 recovers the naive curve.',
        'Non-helpers in these studies were anxious, not callous: the situation, not the person, produced the inaction.',
      ],
      id: [
        'Semakin banyak pengamat yang hadir, semakin kecil kemungkinan satu orang tertentu di antara mereka menolong; inilah difusi tanggung jawab.',
        'Jika peluang tiap orang turun lebih cepat daripada pertumbuhan kelompok, peluang ada yang menolong ikut turun, dan itulah yang diamati Darley dan Latané.',
        'Pengamat juga memakai satu sama lain sebagai petunjuk: jika tidak ada yang bereaksi, semua menyimpulkan situasinya tidak serius (ketidaktahuan pluralistik).',
        'Dalam simulasi, P(tiap orang menolong) = P(sendirian) × N^(−α) dan P(ada yang menolong) = 1 − (1 − P(tiap orang))^N; α = 0 mengembalikan kurva naif.',
        'Mereka yang tidak menolong dalam studi ini cemas, bukan tak berperasaan: situasinya, bukan orangnya, yang menghasilkan kediaman itu.',
      ],
    },
    vocabulary: {
      en: [
        ['Bystander effect', 'The finding that an individual is less likely to help a victim when other people are present.'],
        ['Diffusion of responsibility', 'The sense that the duty to act is shared among everyone present, so each person feels less obliged to act.'],
        ['Pluralistic ignorance', 'Everyone privately feels concerned but, seeing others stay calm, concludes that nothing is wrong.'],
        ['Confederate', 'A person working for the experimenter, such as the recorded voice having the seizure.'],
        ['Independent events', 'Events whose outcomes do not affect each other; the sim treats each bystander\'s decision this way.'],
        ['P(anyone helps)', 'The probability that at least one of N people helps: 1 minus the probability that all N fail to help.'],
        ['Prosocial behaviour', 'Voluntary action intended to benefit another person, such as helping in an emergency.'],
      ],
      id: [
        ['Efek pengamat', 'Temuan bahwa seseorang lebih kecil kemungkinannya menolong korban ketika ada orang lain yang hadir.'],
        ['Difusi tanggung jawab', 'Perasaan bahwa kewajiban bertindak terbagi di antara semua yang hadir, sehingga tiap orang merasa kurang wajib bertindak.'],
        ['Ketidaktahuan pluralistik', 'Semua orang diam-diam merasa khawatir, tetapi melihat yang lain tenang, menyimpulkan tidak ada yang salah.'],
        ['Konfederat', 'Orang yang bekerja untuk peneliti, seperti suara rekaman yang mengalami kejang.'],
        ['Peristiwa independen', 'Peristiwa yang hasilnya tidak saling memengaruhi; simulasi memperlakukan keputusan tiap pengamat seperti ini.'],
        ['P(ada yang menolong)', 'Peluang setidaknya satu dari N orang menolong: 1 dikurangi peluang semua N orang gagal menolong.'],
        ['Perilaku prososial', 'Tindakan sukarela yang dimaksudkan untuk menguntungkan orang lain, seperti menolong dalam keadaan darurat.'],
      ],
    },
    misconceptions: {
      en: [
        ['People in big groups do not help because city dwellers are cold and uncaring.', 'The effect appears in laboratory students, villagers and city residents alike. It is produced by the situation: the same person who helps instantly when alone hesitates in a group.'],
        ['If 85% of people help when alone, a group of five is almost certain to produce a helper.', 'That would be true only if each person stayed 85% willing. In the data only 31% of five-person groups produced any helper, because each person\'s own likelihood collapsed to a few percent.'],
        ['The bystanders simply did not notice or did not care.', 'In Darley and Latané\'s study the non-helpers were sweating, trembling and asking the experimenter afterwards whether the victim was all right. They were caught between wanting to help and believing someone else would.'],
        ['Once you know about the bystander effect, it no longer applies to you.', 'Knowing helps a little, mostly by prompting you to take responsibility deliberately, but the pull of a calm crowd still operates. Deciding in advance to act, or being singled out by name, works better than knowledge alone.'],
      ],
      id: [
        ['Orang di kelompok besar tidak menolong karena warga kota itu dingin dan tidak peduli.', 'Efek ini muncul pada mahasiswa di laboratorium, warga desa, dan warga kota sama saja. Penyebabnya adalah situasi: orang yang sama yang langsung menolong saat sendirian menjadi ragu di dalam kelompok.'],
        ['Jika 85% orang menolong saat sendirian, kelompok lima orang hampir pasti menghasilkan penolong.', 'Itu benar hanya jika tiap orang tetap 85% bersedia. Dalam data, hanya 31% kelompok lima orang yang menghasilkan penolong, karena kemungkinan tiap orang anjlok menjadi beberapa persen saja.'],
        ['Para pengamat hanya tidak menyadari atau tidak peduli.', 'Dalam studi Darley dan Latané, mereka yang tidak menolong berkeringat, gemetar, dan setelahnya bertanya kepada peneliti apakah korban baik-baik saja. Mereka terjepit antara ingin menolong dan percaya orang lain akan melakukannya.'],
        ['Kalau sudah tahu tentang efek pengamat, efek itu tidak lagi berlaku pada kita.', 'Mengetahuinya sedikit membantu, terutama dengan mendorong kita mengambil tanggung jawab secara sadar, tetapi tarikan kerumunan yang tenang tetap bekerja. Memutuskan lebih dulu untuk bertindak, atau ditunjuk langsung dengan nama, lebih efektif daripada pengetahuan saja.'],
      ],
    },
    realWorld: {
      en: [
        'First-aid courses teach rescuers to point at one person and say "You, call an ambulance", because a named person cannot diffuse the responsibility.',
        'Emergency guidance for victims is the mirror image: ask a specific person for help rather than shouting to the crowd.',
        'In group projects, a task assigned to "the team" often goes undone while a task assigned to a named student gets finished.',
        'Online, a message sent to a group chat of twenty often gets no reply, while the same question sent to one person is answered quickly.',
      ],
      id: [
        'Kursus pertolongan pertama mengajarkan penolong menunjuk satu orang dan berkata "Kamu, telepon ambulans", karena orang yang ditunjuk tidak dapat mendifusikan tanggung jawabnya.',
        'Saran bagi korban adalah cermin dari hal itu: minta tolong kepada satu orang tertentu, bukan berteriak kepada kerumunan.',
        'Dalam tugas kelompok, pekerjaan yang diserahkan kepada "tim" sering tidak dikerjakan, sementara pekerjaan yang diserahkan kepada siswa yang disebut namanya selesai.',
        'Di dunia maya, pesan yang dikirim ke grup berisi dua puluh orang sering tidak dibalas, sementara pertanyaan yang sama kepada satu orang cepat dijawab.',
      ],
    },
    questions: {
      en: [
        { q: 'With P(alone) = 0.85 and α = 1, what does the model predict for P(anyone helps) in a group of 5?', a: 'Each person\'s chance is 0.85 × 5^(−1) = 0.17. The chance that all five fail is (1 − 0.17)^5 = 0.83^5 ≈ 0.39, so P(anyone) ≈ 1 − 0.39 = 0.61, or 61%. Compare the naive prediction of 1 − 0.15^5, which is essentially 100%.' },
        { q: 'In Darley and Latané\'s five-person condition, 31% of groups produced a helper. Roughly what was each individual\'s chance of helping?', a: 'If each of the five helps independently with probability p, then 1 − (1 − p)^5 = 0.31, so (1 − p)^5 = 0.69 and 1 − p ≈ 0.93, giving p ≈ 0.07. Each individual went from 85% when alone to about 7% in a group of five, a twelve-fold drop.' },
        { q: 'Explain why the "naive" curve rises toward 100% while the diffusion curve falls, even though both start from the same 85% at N = 1.', a: 'The naive curve keeps each person at 85%, so adding people only adds chances for someone to help. The diffusion curve divides each person\'s willingness by N^α; when α is larger than about 1, the per-person probability falls faster than the number of people grows, so the combined chance 1 − (1 − p_N)^N shrinks. The data lie close to the falling curve, which is the evidence that responsibility really is diffused.' },
      ],
      id: [
        { q: 'Dengan P(sendirian) = 0,85 dan α = 1, berapa prediksi model untuk P(ada yang menolong) dalam kelompok 5 orang?', a: 'Peluang tiap orang adalah 0,85 × 5^(−1) = 0,17. Peluang kelimanya gagal adalah (1 − 0,17)^5 = 0,83^5 ≈ 0,39, sehingga P(ada yang menolong) ≈ 1 − 0,39 = 0,61, atau 61%. Bandingkan dengan prediksi naif 1 − 0,15^5, yang praktis 100%.' },
        { q: 'Pada kondisi lima orang dalam studi Darley dan Latané, 31% kelompok menghasilkan penolong. Kira-kira berapa peluang tiap individu untuk menolong?', a: 'Jika tiap dari lima orang menolong secara independen dengan peluang p, maka 1 − (1 − p)^5 = 0,31, sehingga (1 − p)^5 = 0,69 dan 1 − p ≈ 0,93, menghasilkan p ≈ 0,07. Tiap individu turun dari 85% saat sendirian menjadi sekitar 7% dalam kelompok lima orang, penurunan dua belas kali lipat.' },
        { q: 'Jelaskan mengapa kurva "naif" naik menuju 100% sementara kurva difusi turun, padahal keduanya berawal dari 85% yang sama pada N = 1.', a: 'Kurva naif mempertahankan tiap orang pada 85%, sehingga menambah orang hanya menambah kesempatan ada yang menolong. Kurva difusi membagi kesediaan tiap orang dengan N^α; jika α lebih besar dari sekitar 1, peluang per orang turun lebih cepat daripada pertambahan jumlah orang, sehingga peluang gabungan 1 − (1 − p_N)^N mengecil. Data terletak dekat kurva yang turun, dan itulah bukti bahwa tanggung jawab memang terdifusi.' },
      ],
    },
  },
};
