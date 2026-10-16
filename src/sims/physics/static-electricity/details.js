// Long-form text for the sim page aside, kept out of manifest.js.
export default {
  objectives: {
    en: [
      'Explain charging by friction as the transfer of electrons, so that one object becomes negative and the other equally positive.',
      'Predict whether two charged objects attract or repel from the signs of their charges, and explain why a charged object attracts neutral paper.',
      'Describe how an electroscope detects charge and how a conductor can be charged by induction using a ground connection.',
    ],
    id: [
      'Menjelaskan pemuatan dengan gesekan sebagai perpindahan elektron, sehingga satu benda menjadi negatif dan benda lainnya positif dengan jumlah yang sama.',
      'Memprediksi apakah dua benda bermuatan saling tarik atau saling tolak dari tanda muatannya, dan menjelaskan mengapa benda bermuatan menarik kertas yang netral.',
      'Menggambarkan cara elektroskop mendeteksi muatan dan cara konduktor dimuati secara induksi dengan bantuan sambungan ke tanah.',
    ],
  },
  tryThis: {
    en: [
      'Rub the balloon five times, then drag it slowly towards the electroscope. Watch the leaf angle grow as the distance shrinks.',
      'Switch to the glass rod, rub it and bring it near the hanging ball. Change the ball\'s charge sign: when does it swing away?',
      'Charge by induction: connect the ground wire, hold the balloon next to the metal sphere, disconnect the wire, then move the balloon away. What charge is left on the sphere?',
      'Repeat the induction steps but move the balloon away before disconnecting the wire. Why is the sphere neutral this time?',
    ],
    id: [
      'Gosok balon lima kali, lalu geser perlahan ke arah elektroskop. Perhatikan sudut daun membesar saat jaraknya mengecil.',
      'Ganti ke batang kaca, gosok, dan dekatkan ke bola gantung. Ubah tanda muatan bola: kapan bola berayun menjauh?',
      'Pemuatan induksi: sambungkan kabel tanah, dekatkan balon ke bola logam, lepaskan kabel, lalu jauhkan balon. Muatan apa yang tersisa di bola?',
      'Ulangi langkah induksi, tetapi jauhkan balon sebelum kabel dilepas. Mengapa bolanya netral kali ini?',
    ],
  },

  learn: {
    background: {
      en: [
        'Every atom contains positive protons in its nucleus and negative electrons around it. Normally the numbers balance and the object is neutral. Protons are locked in the nucleus, but outer electrons can be pulled off by rubbing. When a rubber balloon is rubbed on wool, the rubber grips electrons more strongly, so electrons move from the wool to the balloon: the balloon becomes negative and the wool positive by exactly the same amount. Rubbing a glass rod with silk goes the other way: glass loses electrons and becomes positive while the silk becomes negative. Charge is never created or destroyed, only moved. In the simulation each rub transfers one "unit" of charge, roughly a few billion electrons in a real experiment.',
        'Like charges repel and opposite charges attract, and the force grows quickly as the objects get closer (Coulomb\'s law: halving the distance makes the force four times bigger). An electroscope uses this: charge brought near its metal plate pushes like charges down into the two thin leaves, which then repel each other and swing apart. The bigger the charge, or the closer it is, the wider the angle. Notice that the electroscope shows how much charge is near but not its sign.',
        'A charged object also attracts neutral things such as paper bits. The electric field of the charged balloon pulls the paper\'s electrons slightly towards the balloon (if the balloon is positive) or pushes them away (if negative). The nearer side of the paper then has the opposite charge and is attracted more strongly than the farther side is repelled, so light paper leaps up and sticks. This is why both the negative balloon and the positive glass rod attract paper.',
        'The metal sphere on an insulating stand shows charging by induction. Metal has electrons that can move freely. Bring a negative balloon close and the sphere\'s electrons flee to the far side, leaving the near side positive. If a wire connects the sphere to the ground, those pushed-away electrons escape into the Earth. Disconnect the wire first, then remove the balloon, and the sphere is left with a net positive charge, opposite to the balloon, without ever touching it. If you remove the balloon while the wire is still connected, electrons flow back and the sphere is neutral again.',
      ],
      id: [
        'Setiap atom berisi proton positif di intinya dan elektron negatif di sekelilingnya. Biasanya jumlahnya seimbang sehingga benda netral. Proton terkunci di dalam inti, tetapi elektron terluar dapat ditarik lepas dengan menggosok. Ketika balon karet digosok pada wol, karet menggenggam elektron lebih kuat, sehingga elektron berpindah dari wol ke balon: balon menjadi negatif dan wol menjadi positif dengan jumlah yang sama persis. Menggosok batang kaca dengan sutra berlaku sebaliknya: kaca kehilangan elektron dan menjadi positif, sedangkan sutra menjadi negatif. Muatan tidak pernah diciptakan atau dimusnahkan, hanya dipindahkan. Dalam simulasi, setiap gosokan memindahkan satu "satuan" muatan, kira-kira beberapa miliar elektron pada percobaan sungguhan.',
        'Muatan sejenis saling tolak dan muatan berlawanan saling tarik, dan gayanya bertambah cepat ketika benda makin dekat (hukum Coulomb: memperpendek jarak menjadi setengahnya membuat gaya empat kali lebih besar). Elektroskop memanfaatkan hal ini: muatan yang didekatkan ke pelat logamnya mendorong muatan sejenis turun ke dua daun tipis, yang lalu saling tolak dan membuka. Makin besar muatannya, atau makin dekat, makin lebar sudutnya. Perhatikan bahwa elektroskop menunjukkan seberapa besar muatan yang mendekat, tetapi tidak menunjukkan tandanya.',
        'Benda bermuatan juga menarik benda netral seperti potongan kertas. Medan listrik balon bermuatan menarik elektron kertas sedikit mendekat (jika balon positif) atau mendorongnya menjauh (jika balon negatif). Sisi kertas yang lebih dekat lalu bermuatan berlawanan dan ditarik lebih kuat daripada sisi yang lebih jauh ditolak, sehingga kertas yang ringan melompat dan menempel. Inilah sebabnya balon negatif maupun batang kaca positif sama-sama menarik kertas.',
        'Bola logam di atas penyangga isolator menunjukkan pemuatan secara induksi. Logam memiliki elektron yang bebas bergerak. Dekatkan balon negatif, maka elektron bola lari ke sisi jauh dan sisi dekat menjadi positif. Jika sebuah kabel menghubungkan bola ke tanah, elektron yang terdorong itu kabur ke Bumi. Lepaskan kabel dulu, baru jauhkan balon, maka bola tertinggal dengan muatan positif bersih, berlawanan dengan balon, tanpa pernah bersentuhan. Jika balon dijauhkan saat kabel masih tersambung, elektron mengalir kembali dan bola netral lagi.',
      ],
    },
    figure: {
      caption: {
        en: 'Left: rubbing moves electrons from wool to balloon, so the balloon ends negative and the wool equally positive. Right: a negative balloon near a grounded metal sphere pushes electrons out through the wire; cutting the wire and then removing the balloon leaves the sphere positive.',
        id: 'Kiri: menggosok memindahkan elektron dari wol ke balon, sehingga balon menjadi negatif dan wol positif dengan jumlah yang sama. Kanan: balon negatif di dekat bola logam yang dibumikan mendorong elektron keluar lewat kabel; memutus kabel lalu menjauhkan balon meninggalkan bola bermuatan positif.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('Charging by friction and by induction', 'Pemuatan dengan gesekan dan dengan induksi')}">
  <style>text{font:10px system-ui,sans-serif;fill:currentColor}.n{font:bold 11px system-ui,sans-serif;fill:#60a5fa}.p{font:bold 11px system-ui,sans-serif;fill:#f87171}.w{fill:none;stroke:currentColor;stroke-width:1.3}</style>
  <defs><marker id="ar" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto"><path d="M0 0 L7 3.5 L0 7 z" fill="#60a5fa"/></marker></defs>
  <text x="12" y="16" font-weight="bold">${L('1. Friction', '1. Gesekan')}</text>
  <ellipse cx="60" cy="70" rx="26" ry="34" fill="#f472b6" opacity=".85"/>
  <path d="M60 104 L56 112 L64 112 Z" fill="#f472b6"/>
  <text x="48" y="60" class="n">−</text><text x="64" y="76" class="n">−</text><text x="52" y="90" class="n">−</text><text x="68" y="56" class="n">−</text>
  <rect x="112" y="46" width="52" height="50" rx="6" fill="#fde68a" opacity=".85"/>
  <text x="120" y="62" class="p">+</text><text x="140" y="74" class="p">+</text><text x="124" y="88" class="p">+</text><text x="150" y="58" class="p">+</text>
  <path d="M118 112 L94 112" class="w" stroke="#60a5fa" stroke-width="2" marker-end="url(#ar)"/>
  <text x="100" y="128" class="n">e⁻</text>
  <text x="22" y="150">${L('balloon −', 'balon −')}</text>
  <text x="112" y="150">${L('wool +', 'wol +')}</text>
  <text x="12" y="172">${L('Electrons move; total charge stays 0.', 'Elektron pindah; muatan total tetap 0.')}</text>

  <text x="200" y="16" font-weight="bold">${L('2. Induction', '2. Induksi')}</text>
  <ellipse cx="222" cy="78" rx="18" ry="24" fill="#f472b6" opacity=".85"/>
  <text x="212" y="74" class="n">−</text><text x="226" y="88" class="n">−</text><text x="224" y="64" class="n">−</text>
  <circle cx="290" cy="80" r="30" fill="none" stroke="currentColor" stroke-width="1.5"/>
  <text x="264" y="72" class="p">+</text><text x="266" y="92" class="p">+</text><text x="270" y="82" class="p">+</text>
  <text x="306" y="78" class="n">−</text><text x="304" y="94" class="n">−</text>
  <rect x="286" y="110" width="8" height="26" fill="#a16207"/>
  <path d="M312 102 L330 120 L330 150 M322 150 L338 150 M325 155 L335 155 M328 160 L332 160" class="w"/>
  <path d="M316 110 L326 122" stroke="#60a5fa" stroke-width="2" marker-end="url(#ar)"/>
  <text x="200" y="128">${L('ground wire on:', 'kabel tanah tersambung:')}</text>
  <text x="200" y="140">${L('electrons leave', 'elektron pergi')}</text>
  <circle cx="290" cy="200" r="26" fill="none" stroke="currentColor" stroke-width="1.5"/>
  <text x="270" y="196" class="p">+</text><text x="286" y="188" class="p">+</text><text x="302" y="198" class="p">+</text><text x="282" y="212" class="p">+</text><text x="298" y="214" class="p">+</text>
  <text x="200" y="196">${L('wire off, balloon', 'kabel lepas, balon')}</text>
  <text x="200" y="208">${L('removed: sphere +', 'dijauhkan: bola +')}</text>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Rubbing transfers electrons; the object that gains them becomes negative and the other becomes equally positive. Total charge is conserved.',
        'Like charges repel, opposite charges attract, and the force increases sharply as the distance decreases.',
        'An electroscope\'s leaves open wider for more charge or a closer charge, but do not reveal the sign.',
        'A charged object attracts neutral insulators like paper by polarising them: the near side gets the opposite charge.',
        'Charging by induction: bring a charge near a grounded conductor, disconnect the ground, then remove the charge; the conductor keeps the opposite charge.',
      ],
      id: [
        'Menggosok memindahkan elektron; benda yang menerimanya menjadi negatif dan benda lainnya positif dengan jumlah sama. Muatan total kekal.',
        'Muatan sejenis saling tolak, muatan berlawanan saling tarik, dan gayanya meningkat tajam saat jarak berkurang.',
        'Daun elektroskop membuka lebih lebar untuk muatan lebih besar atau lebih dekat, tetapi tidak menunjukkan tandanya.',
        'Benda bermuatan menarik isolator netral seperti kertas dengan memolarisasinya: sisi dekat mendapat muatan berlawanan.',
        'Pemuatan induksi: dekatkan muatan ke konduktor yang dibumikan, putus sambungan tanah, lalu jauhkan muatan; konduktor menyimpan muatan berlawanan.',
      ],
    },
    vocabulary: {
      en: [
        ['Electron', 'A negatively charged particle in the outer part of an atom that can be moved by rubbing or along a conductor.'],
        ['Electroscope', 'An instrument with two thin metal leaves that spread apart when charge is brought near its plate.'],
        ['Conductor', 'A material, such as metal, in which electrons move freely.'],
        ['Insulator', 'A material, such as rubber, glass or plastic, in which charge stays where it is put.'],
        ['Induction', 'Charging a conductor without touching it, by bringing a charge nearby and letting like charges escape to ground.'],
        ['Grounding (earthing)', 'Connecting a conductor to the Earth so that charge can flow to or from it.'],
      ],
      id: [
        ['Elektron', 'Partikel bermuatan negatif di bagian luar atom yang dapat dipindahkan dengan menggosok atau melalui konduktor.'],
        ['Elektroskop', 'Alat dengan dua daun logam tipis yang membuka ketika muatan didekatkan ke pelatnya.'],
        ['Konduktor', 'Bahan, seperti logam, yang elektronnya bebas bergerak.'],
        ['Isolator', 'Bahan, seperti karet, kaca atau plastik, yang muatannya tetap di tempat ia diletakkan.'],
        ['Induksi', 'Memuati konduktor tanpa menyentuhnya, dengan mendekatkan muatan dan membiarkan muatan sejenis kabur ke tanah.'],
        ['Pembumian', 'Menghubungkan konduktor ke Bumi sehingga muatan dapat mengalir ke atau dari konduktor itu.'],
      ],
    },
    misconceptions: {
      en: [
        ['Rubbing creates charge.', 'Rubbing only separates charge that was already there. The balloon gains exactly the electrons the wool loses, so the total charge is still zero.'],
        ['Protons move too, so a positive object has gained protons.', 'Protons are locked in the nucleus. A positively charged object has lost electrons, not gained protons.'],
        ['A charged object only attracts objects with the opposite charge.', 'It also attracts neutral objects such as paper, dust and hair by polarising them. Only another charge of the same sign is repelled.'],
        ['The electroscope tells you whether the charge is positive or negative.', 'The leaves repel each other whatever the sign. To find the sign you need a reference charge of known sign.'],
      ],
      id: [
        ['Menggosok menciptakan muatan.', 'Menggosok hanya memisahkan muatan yang sudah ada. Balon menerima elektron tepat sebanyak yang hilang dari wol, sehingga muatan totalnya tetap nol.'],
        ['Proton juga berpindah, jadi benda positif telah menerima proton.', 'Proton terkunci di inti atom. Benda bermuatan positif kehilangan elektron, bukan menerima proton.'],
        ['Benda bermuatan hanya menarik benda bermuatan berlawanan.', 'Benda bermuatan juga menarik benda netral seperti kertas, debu dan rambut dengan memolarisasinya. Hanya muatan sejenis yang ditolak.'],
        ['Elektroskop memberi tahu apakah muatannya positif atau negatif.', 'Daunnya saling tolak apa pun tandanya. Untuk mengetahui tanda, diperlukan muatan pembanding yang tandanya sudah diketahui.'],
      ],
    },
    realWorld: {
      en: [
        'Lightning is a giant static discharge: friction between ice particles in a cloud separates charge until the air breaks down.',
        'Fuel trucks and aircraft are grounded with a cable before refuelling so that static charge cannot cause a spark.',
        'Photocopiers and laser printers use a charged drum that attracts toner powder by electrostatic attraction.',
        'Electrostatic precipitators in factory chimneys charge smoke particles and collect them on oppositely charged plates.',
        'Cling film, a comb lifting hair and the crackle when taking off a synthetic jumper are all everyday charging by friction.',
      ],
      id: [
        'Petir adalah pelepasan listrik statis raksasa: gesekan partikel es di awan memisahkan muatan sampai udara tak sanggup menahannya.',
        'Truk bahan bakar dan pesawat dibumikan dengan kabel sebelum pengisian agar muatan statis tidak menimbulkan percikan.',
        'Mesin fotokopi dan printer laser memakai drum bermuatan yang menarik serbuk toner dengan gaya elektrostatis.',
        'Pengendap elektrostatis di cerobong pabrik memuati partikel asap dan mengumpulkannya pada pelat bermuatan berlawanan.',
        'Plastik pembungkus yang lengket, sisir yang menarik rambut, dan bunyi gemeretak saat melepas sweter sintetis adalah pemuatan gesekan sehari-hari.',
      ],
    },
    questions: {
      en: [
        { q: 'A balloon is rubbed on wool and gains 6 units of negative charge. What is the charge on the wool, and why?', a: '+6 units. The electrons that made the balloon negative came from the wool, so the wool is missing exactly 6 units of negative charge. Charge is conserved.' },
        { q: 'The electroscope leaves open to 30° when the balloon is 10 cm away. Roughly what happens to the angle at 5 cm, and would a positive rod of the same charge give a different angle?', a: 'The angle grows a lot (the force roughly quadruples when the distance halves), though the leaf angle is not exactly proportional to force. A positive rod of equal size gives the same angle because the leaves repel each other whatever the sign.' },
        { q: 'You hold a negative balloon near a metal sphere connected to ground, then take the balloon away, and only then disconnect the wire. What is the sphere\'s charge?', a: 'Zero. While the wire was connected, the electrons that had been pushed to ground flowed back as soon as the balloon left. The wire must be disconnected before the balloon is removed.' },
      ],
      id: [
        { q: 'Balon digosok pada wol dan menerima 6 satuan muatan negatif. Berapa muatan wol, dan mengapa?', a: '+6 satuan. Elektron yang membuat balon negatif berasal dari wol, sehingga wol kekurangan tepat 6 satuan muatan negatif. Muatan kekal.' },
        { q: 'Daun elektroskop membuka 30° ketika balon berjarak 10 cm. Kira-kira apa yang terjadi pada sudut itu di jarak 5 cm, dan apakah batang positif dengan muatan yang sama memberi sudut berbeda?', a: 'Sudutnya bertambah besar (gayanya sekitar empat kali lipat ketika jarak menjadi setengah), meskipun sudut daun tidak tepat sebanding dengan gaya. Batang positif dengan muatan sama memberi sudut yang sama karena daun saling tolak apa pun tandanya.' },
        { q: 'Kamu mendekatkan balon negatif ke bola logam yang tersambung ke tanah, lalu menjauhkan balon, dan baru kemudian melepas kabelnya. Berapa muatan bola?', a: 'Nol. Selama kabel tersambung, elektron yang tadinya terdorong ke tanah mengalir kembali begitu balon dijauhkan. Kabel harus dilepas sebelum balon dijauhkan.' },
      ],
    },
  },
};
