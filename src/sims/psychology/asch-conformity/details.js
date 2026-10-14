// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'See the visual stimulus where the right answer is unambiguous.',
      'Notice the pull when a unanimous group says otherwise.',
      'Recognize: ~75% of people conformed at least once in the original study.',
    ],
    id: [
      'Melihat stimulus visual di mana jawaban benar jelas.',
      'Memperhatikan tarikan saat grup bulat berkata berbeda.',
      'Mengenali: ~75% orang setidaknya sekali konformitas dalam studi asli.',
    ],
  },
  tryThis: {
    en: [
      'Group of 1 confederate — easy to ignore.',
      'Group of 5 confederates all wrong — strong pressure to go along.',
      'One ally who answers correctly — pressure dissolves dramatically.',
    ],
    id: [
      'Grup 1 konfederasi — mudah diabaikan.',
      'Grup 5 konfederasi semua salah — tekanan kuat untuk ikut.',
      'Satu sekutu yang menjawab benar — tekanan runtuh drastis.',
    ],
  },

  // "Learn" section: the science behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'Conformity is changing what you say or do to match the people around you. Solomon Asch (1951) wanted to know whether a group could make people deny something they could see plainly. He showed a card with one target line and a second card with three comparison lines, only one of which matched the target. Alone, people answered correctly more than 99% of the time; the task is trivially easy.',
        'The trick was that only one person in each room was a real participant. The others were confederates, actors who had been told to give the same wrong answer out loud on 12 of the 18 trials, and the real participant answered after hearing them. Under that pressure participants went along with the wrong majority on about a third of the critical trials, roughly three quarters of them conformed at least once, and about a quarter never did. Afterwards most conformers said they knew the group was wrong but did not want to stand out; a few said they had started to doubt their own eyes.',
        'The simulation puts you in the participant\'s chair. Each trial shows a target line and lines A, B and C; the row of grey figures are the confederates, and every one of them announces the same wrong letter before you click. The Number of confederates slider sets the group size from 1 to 8, and the ally toggle adds one green figure who gives the correct answer. The header keeps a tally of how often you chose the confederates\' answer rather than the one you could see was right.',
        'Asch found that pressure rose quickly from one to three confederates and then levelled off: a group of three was about as persuasive as a group of eight. He also found that a single ally who answered honestly cut conformity to roughly a quarter of its usual level, because the participant was no longer alone against everyone. The sim only tracks your own choices, so it cannot reproduce group averages, and clicking a button in private is far less stressful than contradicting real people face to face, so expect your own conformity rate to be lower than Asch\'s participants\'.',
      ],
      id: [
        'Konformitas adalah mengubah apa yang kita katakan atau lakukan agar sesuai dengan orang-orang di sekitar kita. Solomon Asch (1951) ingin tahu apakah sebuah kelompok bisa membuat orang menyangkal sesuatu yang jelas terlihat. Ia menunjukkan satu kartu berisi garis target dan kartu kedua berisi tiga garis pembanding, hanya satu yang panjangnya sama dengan target. Sendirian, orang menjawab benar lebih dari 99% percobaan; tugasnya sangat mudah.',
        'Triknya, hanya satu orang di tiap ruangan yang merupakan peserta sungguhan. Yang lain adalah konfederat, pemeran yang diminta mengucapkan jawaban salah yang sama dengan lantang pada 12 dari 18 percobaan, dan peserta sungguhan menjawab setelah mendengar mereka. Di bawah tekanan itu, peserta mengikuti mayoritas yang salah pada sekitar sepertiga percobaan kritis, kira-kira tiga perempat dari mereka konform setidaknya sekali, dan sekitar seperempat tidak pernah. Setelahnya, kebanyakan yang konform mengaku tahu kelompoknya salah tetapi tidak ingin tampil berbeda; beberapa mengaku mulai meragukan mata mereka sendiri.',
        'Simulasi ini menempatkanmu di kursi peserta. Setiap percobaan menampilkan garis target dan garis A, B, dan C; deretan figur abu-abu adalah konfederat, dan semuanya mengumumkan huruf salah yang sama sebelum kamu mengklik. Slider Number of confederates mengatur ukuran kelompok dari 1 sampai 8, dan tombol ally menambahkan satu figur hijau yang menjawab benar. Bagian atas layar mencatat seberapa sering kamu memilih jawaban konfederat, bukan jawaban yang jelas kamu lihat benar.',
        'Asch menemukan tekanan naik cepat dari satu ke tiga konfederat lalu mendatar: kelompok beranggota tiga kira-kira sama persuasifnya dengan kelompok delapan. Ia juga menemukan satu sekutu yang menjawab jujur memangkas konformitas menjadi sekitar seperempat dari tingkat biasanya, karena peserta tidak lagi sendirian melawan semua orang. Simulasi hanya mencatat pilihanmu sendiri, sehingga tidak dapat mereproduksi rata-rata kelompok, dan mengklik tombol secara pribadi jauh kurang menegangkan daripada membantah orang sungguhan secara langsung, jadi wajar jika tingkat konformitasmu lebih rendah daripada peserta Asch.',
      ],
    },
    figure: {
      caption: {
        en: 'Asch\'s line task: the target on the left clearly matches line 2, yet every confederate says "3". Inset: conformity rose steeply up to about three confederates and then levelled off; one honest ally pulled it down sharply.',
        id: 'Tugas garis Asch: target di kiri jelas sama dengan garis 2, tetapi semua konfederat menjawab "3". Sisipan: konformitas naik tajam sampai sekitar tiga konfederat lalu mendatar; satu sekutu yang jujur menurunkannya drastis.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Asch line judgment card and conformity curve', 'Kartu penilaian garis Asch dan kurva konformitas')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.c{fill:none;stroke:currentColor;stroke-width:1.2;opacity:.5}.ln{stroke:currentColor;stroke-width:4}.s{font-size:10px}</style>
  <rect x="14" y="20" width="70" height="120" rx="4" class="c"/>
  <text x="26" y="36" class="s">${L('target', 'target')}</text>
  <line x1="49" y1="52" x2="49" y2="124" class="ln"/>
  <rect x="98" y="20" width="150" height="120" rx="4" class="c"/>
  <line x1="128" y1="80" x2="128" y2="124" class="ln"/>
  <line x1="173" y1="52" x2="173" y2="124" class="ln" stroke="#10b981"/>
  <line x1="218" y1="38" x2="218" y2="124" class="ln" stroke="#ef4444"/>
  <text x="124" y="136" class="s">1</text>
  <text x="169" y="136" class="s" fill="#10b981">2</text>
  <text x="214" y="136" class="s" fill="#ef4444">3</text>
  <text x="150" y="36" class="s" fill="#10b981">${L('= target', '= target')}</text>
  <circle cx="22" cy="168" r="8" fill="currentColor" opacity=".5"/>
  <circle cx="46" cy="168" r="8" fill="currentColor" opacity=".5"/>
  <circle cx="70" cy="168" r="8" fill="currentColor" opacity=".5"/>
  <circle cx="94" cy="168" r="8" fill="currentColor" opacity=".5"/>
  <circle cx="118" cy="168" r="8" fill="currentColor" opacity=".5"/>
  <text x="130" y="172" fill="#ef4444">${L('"3" "3" "3" "3" "3"', '"3" "3" "3" "3" "3"')}</text>
  <circle cx="22" cy="200" r="9" fill="#f59e0b"/>
  <text x="38" y="204">${L('you: 2 … or 3?', 'kamu: 2 … atau 3?')}</text>
  <rect x="262" y="28" width="90" height="100" class="c"/>
  <polyline points="262,124 274,112 286,76 298,66 310,62 322,62 334,61 346,60" fill="none" stroke="#8b5cf6" stroke-width="2"/>
  <circle cx="310" cy="112" r="3" fill="#10b981"/>
  <text x="296" y="140" class="s">${L('confederates', 'konfederat')}</text>
  <text x="262" y="20" class="s">${L('conformity', 'konformitas')}</text>
  <text x="318" y="110" class="s" fill="#10b981">${L('+ally', '+sekutu')}</text>
  <text x="252" y="80" class="s" fill="#8b5cf6" transform="rotate(-90 252 80)">${L('rate', 'tingkat')}</text>
  <text x="258" y="222" class="s">1  2  3  4  5  6  7  8</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'A unanimous group can make people give an answer they can see is wrong; about one third of critical-trial answers conformed in Asch\'s study.',
        'Most conformity in this task is normative: people know the right answer but do not want to stand out.',
        'Pressure grows with group size only up to about three people, then levels off.',
        'A single ally who disagrees with the majority breaks its unanimity and cuts conformity sharply.',
        'Answering privately (in writing, or alone at a screen) greatly reduces conformity, because the social cost of disagreeing disappears.',
      ],
      id: [
        'Kelompok yang bulat suara dapat membuat orang memberi jawaban yang jelas salah; sekitar sepertiga jawaban pada percobaan kritis dalam studi Asch adalah jawaban konform.',
        'Sebagian besar konformitas dalam tugas ini bersifat normatif: orang tahu jawaban yang benar, tetapi tidak ingin tampil berbeda.',
        'Tekanan bertambah dengan ukuran kelompok hanya sampai sekitar tiga orang, lalu mendatar.',
        'Satu sekutu yang tidak setuju dengan mayoritas memecah kebulatan suara dan memangkas konformitas secara tajam.',
        'Menjawab secara pribadi (tertulis, atau sendirian di depan layar) sangat mengurangi konformitas, karena ongkos sosial untuk berbeda pendapat hilang.',
      ],
    },
    vocabulary: {
      en: [
        ['Conformity', 'Adjusting one\'s behaviour or stated opinion to match a group.'],
        ['Confederate', 'A person who appears to be a participant but is secretly following the experimenter\'s script.'],
        ['Critical trial', 'A trial on which the confederates deliberately give the same wrong answer.'],
        ['Normative social influence', 'Going along with a group to be accepted or to avoid standing out, while privately disagreeing.'],
        ['Informational social influence', 'Going along with a group because you believe they know better, so your private belief changes too.'],
        ['Unanimity', 'Everyone in the group giving the same answer; breaking it with one dissenter weakens conformity greatly.'],
        ['Ally', 'A group member who gives the honest answer, giving the participant social support.'],
      ],
      id: [
        ['Konformitas', 'Menyesuaikan perilaku atau pendapat yang diucapkan agar sesuai dengan kelompok.'],
        ['Konfederat', 'Orang yang tampak seperti peserta tetapi diam-diam mengikuti skenario peneliti.'],
        ['Percobaan kritis', 'Percobaan ketika konfederat sengaja memberi jawaban salah yang sama.'],
        ['Pengaruh sosial normatif', 'Mengikuti kelompok agar diterima atau tidak tampil berbeda, sementara dalam hati tidak setuju.'],
        ['Pengaruh sosial informasional', 'Mengikuti kelompok karena percaya mereka lebih tahu, sehingga keyakinan pribadi pun berubah.'],
        ['Kebulatan suara', 'Semua anggota kelompok memberi jawaban yang sama; memecahnya dengan satu orang yang berbeda sangat melemahkan konformitas.'],
        ['Sekutu', 'Anggota kelompok yang memberi jawaban jujur, sehingga peserta mendapat dukungan sosial.'],
      ],
    },
    misconceptions: {
      en: [
        ['Asch showed that most people cannot tell which line matches.', 'Alone, participants were right over 99% of the time. The lines were deliberately easy; the error came from social pressure, not from perception.'],
        ['The bigger the group, the more people conform, without limit.', 'Conformity rose from one to three confederates and then flattened out. Fifteen confederates were not noticeably more persuasive than three.'],
        ['Conformers in the study really believed the group was right.', 'Most said afterwards that they knew the group was wrong and went along to avoid ridicule. Only a small minority reported genuinely doubting their perception.'],
        ['People who conform are weak; a strong person would never do it.', 'Three quarters of ordinary, intelligent participants conformed at least once. Situational pressure, not personality, is the main driver, which is exactly why the result was so surprising.'],
      ],
      id: [
        ['Asch menunjukkan kebanyakan orang tidak bisa membedakan garis mana yang sama.', 'Sendirian, peserta benar lebih dari 99% percobaan. Garisnya sengaja dibuat mudah; kesalahan berasal dari tekanan sosial, bukan dari persepsi.'],
        ['Semakin besar kelompok, semakin banyak orang konform, tanpa batas.', 'Konformitas naik dari satu ke tiga konfederat lalu mendatar. Lima belas konfederat tidak jauh lebih persuasif daripada tiga.'],
        ['Peserta yang konform benar-benar percaya kelompoknya benar.', 'Kebanyakan mengaku setelahnya bahwa mereka tahu kelompok salah dan ikut saja agar tidak ditertawakan. Hanya sedikit yang melaporkan benar-benar meragukan persepsinya.'],
        ['Orang yang konform itu lemah; orang berkarakter kuat tidak akan pernah melakukannya.', 'Tiga perempat peserta biasa yang cerdas konform setidaknya sekali. Tekanan situasi, bukan kepribadian, adalah pendorong utamanya, dan justru itulah yang membuat hasilnya begitu mengejutkan.'],
      ],
    },
    realWorld: {
      en: [
        'In a class discussion, a wrong answer that several confident students repeat is often accepted by the rest, which is why teachers ask students to write answers down first.',
        'Juries: a single juror who voices doubt makes it much easier for others to admit theirs, exactly like Asch\'s ally.',
        'Online, seeing that thousands of people liked or shared a post pulls our own judgment of it, even though the number tells us nothing about whether it is true.',
        'Safety culture: aviation and medicine train junior staff to speak up because a silent crew that goes along with a captain\'s error is a classic conformity failure.',
      ],
      id: [
        'Dalam diskusi kelas, jawaban salah yang diulang beberapa siswa yang percaya diri sering diterima siswa lain; karena itu guru meminta siswa menulis jawaban lebih dulu.',
        'Juri pengadilan: satu juri yang menyuarakan keraguan membuat yang lain jauh lebih mudah mengakui keraguannya, persis seperti sekutu dalam studi Asch.',
        'Di media sosial, melihat ribuan orang menyukai atau membagikan sebuah unggahan menarik penilaian kita sendiri, padahal angka itu tidak mengatakan apa pun tentang kebenarannya.',
        'Budaya keselamatan: penerbangan dan kedokteran melatih staf junior untuk berani bersuara, karena awak yang diam mengikuti kesalahan kapten adalah kegagalan konformitas yang klasik.',
      ],
    },
    questions: {
      en: [
        { q: 'A participant conformed on 4 of the 12 critical trials. Is that typical of Asch\'s results?', a: 'Yes. Across all participants about one third of critical-trial answers were conforming, and 4 of 12 is exactly one third. Individuals varied a lot, from never conforming (about a quarter of people) to conforming on nearly every trial.' },
        { q: 'Why does adding a single ally reduce conformity so much more than removing one confederate from a group of six?', a: 'Because the ally breaks the group\'s unanimity. Going from six to five confederates leaves the participant still alone against everyone, and pressure barely changes beyond three. With an ally the participant is no longer the only dissenter, so the social cost of saying the right answer drops sharply; Asch saw conformity fall to about a quarter of its usual level.' },
        { q: 'In the sim you are clicking alone at a screen. Would you expect your conformity rate to be higher or lower than Asch\'s participants\', and why?', a: 'Lower. Asch\'s effect depended on answering aloud in front of real people who could judge you. With private responses conformity dropped to a small fraction, and here nobody is present at all, so the pressure is mostly imagined. The sim shows the setup faithfully, but the social force has to come from your own imagination.' },
      ],
      id: [
        { q: 'Seorang peserta konform pada 4 dari 12 percobaan kritis. Apakah itu tipikal untuk hasil Asch?', a: 'Ya. Di seluruh peserta, sekitar sepertiga jawaban pada percobaan kritis adalah jawaban konform, dan 4 dari 12 tepat sepertiga. Antarindividu sangat bervariasi, dari tidak pernah konform (sekitar seperempat orang) sampai konform pada hampir setiap percobaan.' },
        { q: 'Mengapa menambahkan satu sekutu mengurangi konformitas jauh lebih banyak daripada mengurangi satu konfederat dari kelompok enam orang?', a: 'Karena sekutu memecah kebulatan suara kelompok. Dari enam ke lima konfederat, peserta tetap sendirian melawan semua orang, dan tekanan hampir tidak berubah di atas tiga orang. Dengan sekutu, peserta bukan lagi satu-satunya yang berbeda, sehingga ongkos sosial untuk menjawab benar turun tajam; Asch melihat konformitas turun menjadi sekitar seperempat dari tingkat biasanya.' },
        { q: 'Dalam simulasi kamu mengklik sendirian di depan layar. Apakah tingkat konformitasmu diperkirakan lebih tinggi atau lebih rendah daripada peserta Asch, dan mengapa?', a: 'Lebih rendah. Efek Asch bergantung pada menjawab dengan suara lantang di depan orang sungguhan yang bisa menilai kita. Dengan jawaban pribadi, konformitas turun menjadi sebagian kecil saja, dan di sini tidak ada siapa pun yang hadir, sehingga tekanannya sebagian besar hanya dibayangkan. Simulasi menampilkan rancangan percobaan dengan setia, tetapi kekuatan sosialnya harus datang dari imajinasimu sendiri.' },
      ],
    },
  },
};
