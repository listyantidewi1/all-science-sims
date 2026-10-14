// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Explain that an electric current in a coil makes a magnetic field.',
      'Describe three ways to make an electromagnet stronger: more turns, more current, an iron core.',
      'Show that an electromagnet can be switched off, unlike a bar magnet.',
    ],
    id: [
      'Menjelaskan bahwa arus listrik dalam kumparan menghasilkan medan magnet.',
      'Menyebutkan tiga cara memperkuat elektromagnet: lebih banyak lilitan, arus lebih besar, dan inti besi.',
      'Menunjukkan bahwa elektromagnet bisa dimatikan, tidak seperti magnet batang.',
    ],
  },
  tryThis: {
    en: [
      'Keep 1 cell and an air core. Slide the turns from 5 to 50 — how many clips can you lift?',
      'Now swap the core to iron without changing anything else. What happens to the clips?',
      'Flip the switch off. Where do the clips go, and what does the compass needle do?',
    ],
    id: [
      'Pakai 1 sel dan inti udara. Geser lilitan dari 5 ke 50 — berapa klip yang terangkat?',
      'Sekarang ganti inti menjadi besi tanpa mengubah yang lain. Apa yang terjadi pada klip?',
      'Matikan sakelar. Ke mana klip jatuh, dan apa yang dilakukan jarum kompas?',
    ],
  },

  // "Learn" section: the physics behind the sim, for students and teachers.
  learn: {
    background: {
      en: [
        'In 1820 Hans Christian Ørsted noticed that a compass needle twitched whenever he switched on a current in a nearby wire. That was the discovery that electricity and magnetism are linked: every electric current is surrounded by a magnetic field. Around a straight wire the field is weak and wraps in circles, but if you wind the wire into a coil, the fields of all the turns add up inside it and the coil behaves like a bar magnet, with a north pole at one end and a south pole at the other. Reverse the current and the poles swap.',
        'Three things make the field stronger. More turns of wire stack more field together. More current, which in the simulation means adding battery cells to push harder, makes each turn contribute more. And a core of a magnetic material such as iron placed inside the coil becomes magnetized by the coil\'s field and adds its own, much larger field on top; a soft iron core can multiply the strength hundreds of times in a real electromagnet. Air does nothing, so a hollow coil is the weakest arrangement.',
        'The sim shows a coil on a core, a battery pack, a switch, a compass and a pile of paper clips. The strength readout is simply turns × cells × a core factor (air 1, steel 5, iron 10), and the magnet lifts one clip for every 100 points. When the switch is on, moving dots show the current, field lines appear around the coil, the compass needle swings toward the nearer pole, and clips jump up to the core. Switch off and the current stops, the field vanishes and the clips fall; that on-off control is what makes an electromagnet more useful than a permanent magnet for many jobs.',
        'This is a cartoon of the real physics. Real field strength does grow with turns and current, but an iron core eventually saturates, so doubling the current no longer doubles the pull. Adding turns in a real coil also adds wire, which adds resistance and reduces the current a given battery can supply. The number of clips stands in for the pulling force but is only an illustration, the core factors for steel and iron are chosen for simplicity, and the sim ignores heating of the wire and the small magnetism a steel core keeps after the current stops.',
      ],
      id: [
        'Pada 1820 Hans Christian Ørsted memperhatikan bahwa jarum kompas bergerak setiap kali ia menyalakan arus pada kawat di dekatnya. Itulah penemuan bahwa listrik dan magnet saling berkaitan: setiap arus listrik dikelilingi medan magnet. Di sekitar kawat lurus medannya lemah dan melingkar, tetapi jika kawat digulung menjadi kumparan, medan dari semua lilitan saling menjumlah di dalamnya dan kumparan berperilaku seperti magnet batang, dengan kutub utara di satu ujung dan kutub selatan di ujung lain. Balik arah arusnya, kutubnya bertukar.',
        'Tiga hal membuat medan lebih kuat. Lilitan kawat yang lebih banyak menumpuk lebih banyak medan. Arus yang lebih besar, yang dalam simulasi berarti menambah sel baterai agar dorongannya lebih kuat, membuat setiap lilitan menyumbang lebih banyak. Dan inti dari bahan magnetik seperti besi yang diletakkan di dalam kumparan menjadi termagnetkan oleh medan kumparan dan menambahkan medannya sendiri yang jauh lebih besar; inti besi lunak bisa melipatgandakan kekuatan hingga ratusan kali pada elektromagnet sungguhan. Udara tidak berbuat apa-apa, sehingga kumparan kosong adalah susunan yang paling lemah.',
        'Sim menampilkan kumparan pada inti, satu paket baterai, sakelar, kompas, dan setumpuk klip kertas. Angka kekuatan hanyalah lilitan × sel × faktor inti (udara 1, baja 5, besi 10), dan magnet mengangkat satu klip untuk setiap 100 poin. Saat sakelar menyala, titik-titik bergerak menunjukkan arus, garis medan muncul di sekitar kumparan, jarum kompas berayun ke arah kutub terdekat, dan klip melompat ke inti. Matikan sakelar, arus berhenti, medan hilang, dan klip berjatuhan; kendali nyala-mati inilah yang membuat elektromagnet lebih berguna daripada magnet permanen untuk banyak keperluan.',
        'Ini adalah gambaran sederhana dari fisika sesungguhnya. Kekuatan medan nyata memang bertambah dengan lilitan dan arus, tetapi inti besi akhirnya jenuh, sehingga menggandakan arus tidak lagi menggandakan tarikan. Menambah lilitan pada kumparan sungguhan juga menambah panjang kawat, yang menambah hambatan dan mengurangi arus yang bisa dipasok baterai. Jumlah klip mewakili gaya tarik tetapi hanya sebagai ilustrasi, faktor inti untuk baja dan besi dipilih demi kesederhanaan, dan sim mengabaikan pemanasan kawat serta sedikit kemagnetan yang tersisa pada inti baja setelah arus berhenti.',
      ],
    },
    figure: {
      caption: {
        en: 'Current from the battery flows through the coil wound on an iron nail. The coil\'s field lines run through the core and loop back outside, like those of a bar magnet; the compass needle turns toward the nearer pole and the clips are pulled to the end of the core.',
        id: 'Arus dari baterai mengalir melalui kumparan yang dililitkan pada paku besi. Garis medan kumparan menembus inti dan melingkar kembali di luar, seperti pada magnet batang; jarum kompas berputar ke arah kutub terdekat dan klip tertarik ke ujung inti.',
      },
      svg: (lang) => {
        const L = (en, id) => (lang === 'id' ? id : en);
        return `
<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L('A coil around an iron nail with field lines, battery, switch and compass', 'Kumparan pada paku besi dengan garis medan, baterai, sakelar, dan kompas')}">
  <style>text{font:11px system-ui,sans-serif;fill:currentColor}.w{fill:none;stroke:#f59e0b;stroke-width:2}.fl{fill:none;stroke:#3b82f6;stroke-width:1.3;opacity:.8}.t{font-size:10px;opacity:.8}.k{fill:none;stroke:currentColor;stroke-width:1.5}</style>
  <ellipse cx="170" cy="100" rx="96" ry="40" class="fl"/>
  <ellipse cx="170" cy="100" rx="120" ry="62" class="fl"/>
  <path d="M160 38 L176 38" stroke="#3b82f6" stroke-width="1.3" marker-end="url(#a)"/>
  <path d="M160 162 L176 162" stroke="#3b82f6" stroke-width="1.3" marker-end="url(#a)"/>
  <rect x="100" y="90" width="130" height="20" fill="currentColor" opacity=".55"/>
  <path d="M230 90 L250 100 L230 110 Z" fill="currentColor" opacity=".55"/>
  <path d="M110 86 C104 100 104 114 110 114 M124 86 C118 100 118 114 124 114 M138 86 C132 100 132 114 138 114 M152 86 C146 100 146 114 152 114 M166 86 C160 100 160 114 166 114 M180 86 C174 100 174 114 180 114 M194 86 C188 100 188 114 194 114 M208 86 C202 100 202 114 208 114" class="w"/>
  <path d="M110 86 L112 86 L124 86 L138 86 L152 86 L166 86 L180 86 L194 86 L208 86" class="w" opacity=".5"/>
  <text x="90" y="104" fill="#3b82f6" font-weight="bold">N</text>
  <text x="254" y="104" fill="#3b82f6" font-weight="bold">S</text>
  <path d="M110 114 L110 170 L40 170 L40 150 M40 134 L40 60 L74 60 M96 60 L208 60 L208 86" class="w"/>
  <path d="M30 138 L50 138 M34 146 L46 146" stroke="currentColor" stroke-width="3"/>
  <text x="14" y="164" class="t">${L('cells', 'sel')}</text>
  <circle cx="74" cy="60" r="3" fill="currentColor"/><circle cx="96" cy="60" r="3" fill="currentColor"/>
  <line x1="74" y1="60" x2="96" y2="60" stroke="currentColor" stroke-width="2.5"/>
  <text x="60" y="50" class="t">${L('switch on', 'sakelar nyala')}</text>
  <circle cx="300" cy="80" r="22" class="k"/>
  <line x1="300" y1="80" x2="282" y2="86" stroke="#ef4444" stroke-width="3"/>
  <line x1="300" y1="80" x2="318" y2="74" stroke="currentColor" stroke-width="3" opacity=".6"/>
  <text x="300" y="64" class="t" text-anchor="middle">N</text>
  <text x="300" y="118" class="t" text-anchor="middle">${L('compass', 'kompas')}</text>
  <rect x="232" y="118" width="8" height="14" rx="4" class="k"/><rect x="243" y="120" width="8" height="14" rx="4" class="k"/><rect x="254" y="118" width="8" height="14" rx="4" class="k"/>
  <text x="248" y="146" class="t" text-anchor="middle">${L('clips', 'klip')}</text>
  <text x="20" y="200" class="t">${L('stronger with: more turns · more cells (more current) · an iron core', 'lebih kuat dengan: lebih banyak lilitan · lebih banyak sel (arus lebih besar) · inti besi')}</text>
  <text x="20" y="216" class="t">${L('switch off → no current → no field → clips fall', 'sakelar mati → tidak ada arus → tidak ada medan → klip jatuh')}</text>
  <text x="20" y="232" class="t">${L('field lines leave N and enter S, like a bar magnet', 'garis medan keluar dari N dan masuk ke S, seperti magnet batang')}</text>
  <defs><marker id="a" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="context-stroke"/></marker></defs>
</svg>`;
      },
    },
    keyIdeas: {
      en: [
        'Every electric current produces a magnetic field; winding the wire into a coil concentrates that field and gives it north and south poles.',
        'More turns and more current both make the field stronger.',
        'An iron core becomes magnetized by the coil and multiplies the strength many times; air adds nothing.',
        'Unlike a permanent magnet, an electromagnet can be switched off, reversed or adjusted at will.',
        'A compass needle lines up with the field, so it points toward the coil\'s nearer pole when the current flows.',
      ],
      id: [
        'Setiap arus listrik menghasilkan medan magnet; menggulung kawat menjadi kumparan memusatkan medan itu dan memberinya kutub utara dan selatan.',
        'Lebih banyak lilitan dan arus yang lebih besar sama-sama membuat medan lebih kuat.',
        'Inti besi termagnetkan oleh kumparan dan melipatgandakan kekuatan berkali-kali; udara tidak menambah apa pun.',
        'Berbeda dengan magnet permanen, elektromagnet bisa dimatikan, dibalik, atau diatur sesuka hati.',
        'Jarum kompas menyejajarkan diri dengan medan, sehingga menunjuk ke kutub kumparan yang terdekat saat arus mengalir.',
      ],
    },
    vocabulary: {
      en: [
        ['Electromagnet', 'A coil of wire that becomes a magnet while an electric current flows through it.'],
        ['Magnetic field', 'The region around a magnet or current where magnetic forces act; drawn with field lines from N to S.'],
        ['Coil (solenoid)', 'Wire wound into many loops; the fields of the loops add together inside it.'],
        ['Turn', 'One complete loop of wire in the coil; more turns give a stronger magnet.'],
        ['Core', 'The material inside the coil; iron is magnetized by the coil and greatly strengthens the field.'],
        ['Current', 'The flow of electric charge through the wire; in the sim, more battery cells means more current.'],
        ['Poles', 'The two ends of a magnet, north and south, where the field is strongest.'],
      ],
      id: [
        ['Elektromagnet', 'Kumparan kawat yang menjadi magnet selama arus listrik mengalir melaluinya.'],
        ['Medan magnet', 'Daerah di sekitar magnet atau arus tempat gaya magnet bekerja; digambar dengan garis medan dari N ke S.'],
        ['Kumparan (solenoida)', 'Kawat yang digulung menjadi banyak lingkaran; medan dari tiap lingkaran saling menjumlah di dalamnya.'],
        ['Lilitan', 'Satu lingkaran penuh kawat pada kumparan; lebih banyak lilitan memberi magnet yang lebih kuat.'],
        ['Inti', 'Bahan di dalam kumparan; besi termagnetkan oleh kumparan dan memperkuat medan dengan sangat besar.'],
        ['Arus', 'Aliran muatan listrik melalui kawat; dalam sim, lebih banyak sel baterai berarti arus lebih besar.'],
        ['Kutub', 'Dua ujung magnet, utara dan selatan, tempat medannya paling kuat.'],
      ],
    },
    misconceptions: {
      en: [
        ['The battery itself is magnetic and attracts the clips.', 'The battery only drives the current. The field comes from the current in the coil, which is why the clips fall the moment the switch opens even though the battery is still there.'],
        ['The iron core is a magnet that the coil just holds in place.', 'Unmagnetized iron does not attract clips on its own. The coil\'s field magnetizes it, and that induced magnetism is what multiplies the strength; remove the current and the soft iron loses almost all of it.'],
        ['A thicker or longer wire makes a stronger electromagnet by itself.', 'What matters is turns and current. Extra length that is not wound into turns adds resistance and actually lowers the current from a given battery.'],
        ['Electromagnets are weaker than "real" magnets.', 'Large electromagnets lift scrap cars and run MRI scanners; they are among the strongest magnets made. Their advantage is that they can be switched off.'],
      ],
      id: [
        ['Baterainya sendiri bersifat magnet dan menarik klip.', 'Baterai hanya menggerakkan arus. Medan berasal dari arus dalam kumparan; itulah sebabnya klip jatuh begitu sakelar terbuka meskipun baterainya masih ada.'],
        ['Inti besi adalah magnet yang hanya ditahan oleh kumparan.', 'Besi yang belum termagnetkan tidak menarik klip sendiri. Medan kumparan memagnetkannya, dan kemagnetan imbas itulah yang melipatgandakan kekuatan; hilangkan arus dan besi lunak kehilangan hampir semuanya.'],
        ['Kawat yang lebih tebal atau lebih panjang dengan sendirinya membuat elektromagnet lebih kuat.', 'Yang penting adalah lilitan dan arus. Panjang tambahan yang tidak digulung menjadi lilitan menambah hambatan dan justru menurunkan arus dari baterai yang sama.'],
        ['Elektromagnet lebih lemah daripada magnet "sungguhan".', 'Elektromagnet besar mengangkat mobil rongsokan dan menjalankan pemindai MRI; mereka termasuk magnet terkuat yang pernah dibuat. Keunggulannya adalah bisa dimatikan.'],
      ],
    },
    realWorld: {
      en: [
        'Scrapyard cranes use a huge electromagnet to pick up steel and drop it exactly where wanted simply by switching the current off.',
        'Electric door locks and relays use a small electromagnet to pull a latch or a switch when current flows.',
        'Loudspeakers, electric motors and doorbells all move things by switching or varying the current in a coil.',
        'MRI scanners in hospitals use enormous electromagnets, cooled so the coil has no resistance, to image the inside of the body.',
      ],
      id: [
        'Derek di tempat rongsokan memakai elektromagnet raksasa untuk mengangkat baja dan menjatuhkannya tepat di tempat yang diinginkan hanya dengan mematikan arus.',
        'Kunci pintu listrik dan relai memakai elektromagnet kecil untuk menarik grendel atau sakelar saat arus mengalir.',
        'Pengeras suara, motor listrik, dan bel pintu semuanya menggerakkan sesuatu dengan menyalakan atau mengubah arus dalam kumparan.',
        'Pemindai MRI di rumah sakit memakai elektromagnet yang sangat besar, didinginkan agar kumparannya tak berhambatan, untuk mencitrakan bagian dalam tubuh.',
      ],
    },
    questions: {
      en: [
        { q: 'With 1 cell and an air core, the sim lifts no clips even at 50 turns. Change one thing so that it lifts at least 5 clips, and explain your choice.', a: 'Switch the core to iron: the strength becomes 50 × 1 × 10 = 500, which lifts 5 clips. The iron core is magnetized by the coil and adds a much larger field of its own; turns and cells alone cannot get there with an air core (the most is 50 × 4 × 1 = 200, or 2 clips).' },
        { q: 'You double the number of turns from 20 to 40 with everything else fixed. What happens to the clip count, and would a real electromagnet behave exactly like this?', a: 'In the sim the strength doubles, so the clip count doubles (for example from 4 to 8 with 2 cells and iron). A real electromagnet gets stronger too, but not exactly double: the iron core can saturate, and the extra wire adds resistance, which lowers the current.' },
        { q: 'Why does the compass needle swing toward the coil only while the switch is on, and why does it point toward the coil\'s S end rather than its N end?', a: 'The field exists only while current flows, so the needle returns to geographic north when the switch opens. A compass needle\'s north-seeking end is attracted to a south pole, and the compass in the sim sits beside the coil\'s S end, so the red end turns toward it.' },
      ],
      id: [
        { q: 'Dengan 1 sel dan inti udara, sim tidak mengangkat klip walaupun lilitannya 50. Ubah satu hal agar terangkat sedikitnya 5 klip, dan jelaskan pilihanmu.', a: 'Ganti inti menjadi besi: kekuatannya menjadi 50 × 1 × 10 = 500, yang mengangkat 5 klip. Inti besi termagnetkan oleh kumparan dan menambahkan medannya sendiri yang jauh lebih besar; lilitan dan sel saja tidak bisa mencapainya dengan inti udara (paling banyak 50 × 4 × 1 = 200, atau 2 klip).' },
        { q: 'Kamu menggandakan lilitan dari 20 ke 40 dengan yang lain tetap. Apa yang terjadi pada jumlah klip, dan apakah elektromagnet sungguhan berperilaku persis seperti ini?', a: 'Dalam sim kekuatannya menjadi dua kali lipat, sehingga jumlah klip juga dua kali lipat (misalnya dari 4 ke 8 dengan 2 sel dan inti besi). Elektromagnet sungguhan juga menjadi lebih kuat, tetapi tidak persis dua kali: inti besi bisa jenuh, dan kawat tambahan menambah hambatan yang menurunkan arus.' },
        { q: 'Mengapa jarum kompas berayun ke arah kumparan hanya saat sakelar menyala, dan mengapa ia menunjuk ke ujung S kumparan, bukan ujung N-nya?', a: 'Medan hanya ada saat arus mengalir, sehingga jarum kembali ke utara geografis ketika sakelar terbuka. Ujung jarum kompas yang mencari utara tertarik ke kutub selatan, dan kompas dalam sim berada di samping ujung S kumparan, sehingga ujung merahnya berputar ke arah itu.' },
      ],
    },
  },
};
